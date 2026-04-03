/* ============================================
   Practice Session Engine
   Handles question flow, multi-answer, scoring
   ============================================ */

const Practice = {
    currentQuestion: null,
    selectedAnswers: [],
    answered: false,
    sessionQuestions: [],
    sessionIndex: 0,
    sessionCorrect: 0,
    sessionType: 'practice', // 'practice', 'review', 'drill', 'exam'
    topicFilter: null,
    timerInterval: null,
    timerSeconds: 0,
    onTimerExpired: null,
    retryQueue: [],      // wrong questions re-queued with English
    isRetry: false,       // current question is a retry

    startSession(type = 'practice', options = {}) {
        this.sessionType = type;
        this.sessionIndex = 0;
        this.sessionCorrect = 0;
        this.topicFilter = options.topicFilter || null;
        this.answered = false;
        this.selectedAnswers = [];
        this.retryQueue = [];
        this.isRetry = false;
        this.sessionStartTime = Date.now();

        // Select questions based on type
        const count = options.count || 10;
        switch (type) {
            case 'quick10':
                this.sessionQuestions = getAdaptiveQuestions(10);
                break;
            case 'weakspots':
                this.sessionQuestions = getWeakTopicQuestions(10, Storage.getTopicMasteryArray());
                break;
            case 'review':
                const dueReviews = Storage.getDueReviews();
                this.sessionQuestions = dueReviews
                    .map(r => getQuestionById(r.questionId))
                    .filter(Boolean)
                    .slice(0, 20);
                if (this.sessionQuestions.length === 0) {
                    this.sessionQuestions = getRandomQuestions(10);
                }
                break;
            case 'drill':
                if (this.topicFilter) {
                    const topicQs = getQuestionsByTopic(this.topicFilter);
                    this.sessionQuestions = [...topicQs].sort(() => Math.random() - 0.5).slice(0, count);
                } else {
                    this.sessionQuestions = getRandomQuestions(count);
                }
                break;
            default:
                this.sessionQuestions = getAdaptiveQuestions(count);
        }

        if (this.sessionQuestions.length === 0) {
            this.sessionQuestions = getRandomQuestions(10);
        }

        this.loadQuestion();
    },

    loadQuestion() {
        // Check if we should insert a retry question (every 3 new questions)
        if (this.retryQueue.length > 0 && this.sessionIndex > 0 && this.sessionIndex % 3 === 0) {
            this.currentQuestion = this.retryQueue.shift();
            this.isRetry = true;
        } else if (this.sessionIndex >= this.sessionQuestions.length) {
            // No more new questions — drain retry queue
            if (this.retryQueue.length > 0) {
                this.currentQuestion = this.retryQueue.shift();
                this.isRetry = true;
            } else {
                this.endSession();
                return;
            }
        } else {
            this.currentQuestion = this.sessionQuestions[this.sessionIndex];
            this.isRetry = false;
        }

        this.selectedAnswers = [];
        this.answered = false;
        this.renderQuestion();
    },

    renderQuestion() {
        const q = this.currentQuestion;
        const settings = Storage.getSettings();

        // Update progress
        document.getElementById('practice-count').textContent =
            `${this.sessionIndex + 1} / ${this.sessionQuestions.length}`;
        document.getElementById('practice-accuracy').textContent =
            this.sessionIndex > 0 ? `${Math.round((this.sessionCorrect / this.sessionIndex) * 100)}% correct` : '';

        // Topic badge
        const topic = ETG_TOPICS.find(t => t.id === q.topic);
        document.getElementById('question-topic').textContent = `${topic?.icon || ''} ${topic?.nameEn || q.topic}`;

        // Multi-answer badge
        const multiBadge = document.getElementById('multi-badge');
        if (q.answerCount > 1) {
            multiBadge.classList.remove('hidden');
        } else {
            multiBadge.classList.add('hidden');
        }

        // Road sign images
        const signContainer = document.getElementById('question-signs');
        if (q.signs && q.signs.length > 0) {
            RoadSigns.render(q.signs, signContainer);
        } else {
            signContainer.classList.add('hidden');
            signContainer.innerHTML = '';
        }

        // Question text — show English on retry, French-only on first attempt
        document.getElementById('question-fr').textContent = q.questionFr;
        const enEl = document.getElementById('question-en');
        enEl.textContent = q.questionEn;
        enEl.style.display = this.isRetry ? 'block' : 'none';

        // Retry banner
        const existingBanner = document.querySelector('.retry-banner');
        if (existingBanner) existingBanner.remove();
        if (this.isRetry) {
            const banner = document.createElement('div');
            banner.className = 'retry-banner';
            banner.textContent = 'Retry — you got this wrong before. English shown to help.';
            document.getElementById('question-card').prepend(banner);
        }

        // Answer options — show English on retry
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';
        optionsContainer.classList.add('stagger-enter');

        const letters = ['A', 'B', 'C', 'D'];
        for (const letter of letters) {
            const option = q.options[letter];
            if (!option) continue;

            const tile = document.createElement('div');
            tile.className = 'answer-tile';
            tile.dataset.letter = letter;
            tile.innerHTML = `
                <div class="answer-letter">${letter}</div>
                <div class="answer-content">
                    <div class="answer-text-fr">${option.fr}</div>
                    ${this.isRetry ? `<div class="answer-text-en">${option.en}</div>` : ''}
                </div>
                <div class="answer-indicator"></div>
            `;
            tile.addEventListener('click', () => this.selectAnswer(letter));
            optionsContainer.appendChild(tile);
        }

        // Confirm button
        const confirmBtn = document.getElementById('confirm-btn');
        confirmBtn.classList.add('hidden');
        confirmBtn.onclick = () => this.submitAnswer();

        // Hide explanation
        document.getElementById('explanation-panel').classList.add('hidden');

        // TTS: auto-read question
        if (settings.ttsEnabled) {
            setTimeout(() => TTS.speakQuestion(q), 300);
        }

        // TTS replay button
        const ttsBtn = document.getElementById('tts-play-btn');
        if (ttsBtn) {
            ttsBtn.onclick = () => TTS.speakQuestion(q);
        }

        // Animate card entrance
        document.getElementById('question-card').style.animation = 'fadeInUp 0.3s ease';

        // Keyboard shortcuts — register ONCE, not per question
        if (!this._keyHandlerRegistered) {
            this._keyHandler = (e) => {
                if (App.currentView !== 'practice') return;
                const key = e.key.toUpperCase();
                if (['A', 'B', 'C', 'D'].includes(key) && !this.answered) {
                    this.selectAnswer(key);
                } else if (e.key === 'Enter' && !this.answered) {
                    const confirmBtn = document.getElementById('confirm-btn');
                    if (confirmBtn && !confirmBtn.classList.contains('hidden')) {
                        this.submitAnswer();
                    }
                } else if ((e.key === ' ' || e.key === 'Enter') && this.answered) {
                    e.preventDefault();
                    const nextBtn = document.getElementById('next-question-btn');
                    if (nextBtn && !nextBtn.classList.contains('hidden')) nextBtn.click();
                }
            };
            document.addEventListener('keydown', this._keyHandler);
            this._keyHandlerRegistered = true;
        }
    },

    selectAnswer(letter) {
        if (this.answered) return;

        const q = this.currentQuestion;

        if (q.answerCount === 1) {
            // Single answer: select and submit immediately
            this.selectedAnswers = [letter];
            this.highlightSelected();
            setTimeout(() => this.submitAnswer(), 200);
        } else {
            // Multi-answer: toggle selection
            const idx = this.selectedAnswers.indexOf(letter);
            if (idx >= 0) {
                this.selectedAnswers.splice(idx, 1);
            } else {
                this.selectedAnswers.push(letter);
            }
            this.highlightSelected();

            // Show confirm button when at least 1 answer selected
            const confirmBtn = document.getElementById('confirm-btn');
            if (this.selectedAnswers.length >= 1) {
                confirmBtn.classList.remove('hidden');
                confirmBtn.style.animation = 'fadeInUp 0.2s ease';
                // Scroll confirm button into view on mobile
                setTimeout(() => confirmBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            } else {
                confirmBtn.classList.add('hidden');
            }
        }
    },

    highlightSelected() {
        document.querySelectorAll('.answer-tile').forEach(tile => {
            const letter = tile.dataset.letter;
            if (this.selectedAnswers.includes(letter)) {
                tile.classList.add('selected');
            } else {
                tile.classList.remove('selected');
            }
        });
    },

    submitAnswer() {
        if (this.answered || this.selectedAnswers.length === 0) return;
        this.answered = true;

        const q = this.currentQuestion;
        const correct = this.selectedAnswers.sort().join(',') === [...q.correctAnswers].sort().join(',');

        if (correct) this.sessionCorrect++;

        // Queue wrong questions for retry (not in exam mode, not already a retry)
        if (!correct && this.sessionType !== 'exam' && !this.isRetry) {
            this.retryQueue.push(q);
        }

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(correct ? 30 : [50, 30, 50]);
        }

        // Show answer feedback
        this.showAnswerFeedback(correct);

        // Record attempt
        const attempt = {
            questionId: q.id,
            topic: q.topic,
            selectedAnswers: [...this.selectedAnswers],
            isCorrect: correct,
            confidence: null,
            sessionType: this.sessionType
        };

        // Check if confidence rating enabled
        const settings = Storage.getSettings();
        if (settings.confidenceEnabled && this.sessionType !== 'exam') {
            this.showConfidenceRating(attempt);
        } else {
            this.recordAttempt(attempt);
        }

        // Clear timer if running
        this.stopTimer();

        // Hide confirm button
        document.getElementById('confirm-btn').classList.add('hidden');
    },

    showAnswerFeedback(correct) {
        document.querySelectorAll('.answer-tile').forEach(tile => {
            const letter = tile.dataset.letter;
            tile.classList.add('locked');

            if (this.currentQuestion.correctAnswers.includes(letter)) {
                if (this.selectedAnswers.includes(letter)) {
                    tile.classList.add('correct');
                    tile.querySelector('.answer-indicator').textContent = '✓';
                } else {
                    // Correct answer user missed (multi-answer)
                    tile.classList.add('missed');
                    tile.querySelector('.answer-indicator').textContent = '○';
                }
            } else if (this.selectedAnswers.includes(letter)) {
                tile.classList.add('incorrect');
                tile.querySelector('.answer-indicator').textContent = '✗';
            }
        });

        // Scroll question card into view so feedback is visible on mobile
        const card = document.getElementById('question-card');
        if (card) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    },

    showConfidenceRating(attempt) {
        const modal = document.getElementById('confidence-modal');
        modal.classList.remove('hidden');

        // Auto-dismiss after 3 seconds
        const timeout = setTimeout(() => {
            modal.classList.add('hidden');
            this.recordAttempt(attempt);
        }, 3000);

        document.querySelectorAll('.confidence-chip').forEach(chip => {
            chip.onclick = () => {
                clearTimeout(timeout);
                attempt.confidence = parseInt(chip.dataset.confidence);
                modal.classList.add('hidden');
                this.recordAttempt(attempt);
            };
        });
    },

    recordAttempt(attempt) {
        Storage.saveAttempt(attempt);

        // Schedule for review if wrong or guessed
        if (!attempt.isCorrect || attempt.confidence === 1) {
            Storage.scheduleForReview(attempt.questionId, attempt.isCorrect, attempt.confidence);
        } else if (attempt.confidence >= 2) {
            Storage.scheduleForReview(attempt.questionId, attempt.isCorrect, attempt.confidence);
        }

        // Show explanation (not in exam mode)
        if (this.sessionType !== 'exam') {
            setTimeout(() => this.showExplanation(attempt.isCorrect), 400);
        }
    },

    showExplanation(correct) {
        const q = this.currentQuestion;
        const panel = document.getElementById('explanation-panel');
        const settings = Storage.getSettings();

        // Verdict
        const verdict = document.getElementById('verdict');
        if (correct) {
            verdict.className = 'verdict correct';
            verdict.innerHTML = '✓ Correct!';
        } else {
            const correctLetters = q.correctAnswers.join(', ');
            verdict.className = 'verdict incorrect';
            verdict.innerHTML = `✗ Incorrect — Correct answer: ${correctLetters}`;
        }

        // Explanation
        document.getElementById('explanation-en').textContent = q.explanationEn;
        document.getElementById('explanation-fr').textContent = q.explanationFr;
        document.getElementById('explanation-fr-section').style.display = 'block';

        // Trap note
        const trapSection = document.getElementById('trap-section');
        if (q.trapNote) {
            trapSection.classList.remove('hidden');
            document.getElementById('trap-note').textContent = q.trapNote;
        } else {
            trapSection.classList.add('hidden');
        }

        // Distractor note (for wrong answer)
        const distractorSection = document.getElementById('distractor-section');
        if (!correct && q.distractorNotes) {
            const wrongAnswers = this.selectedAnswers.filter(a => !q.correctAnswers.includes(a));
            const notes = wrongAnswers.map(a => q.distractorNotes[a]).filter(Boolean);
            if (notes.length > 0) {
                distractorSection.classList.remove('hidden');
                document.getElementById('distractor-note').textContent = notes.join(' ');
            } else {
                distractorSection.classList.add('hidden');
            }
        } else {
            distractorSection.classList.add('hidden');
        }

        // Vocabulary
        const vocabSection = document.getElementById('vocab-section');
        const vocabList = document.getElementById('vocab-list');
        if (q.vocabulary && q.vocabulary.length > 0) {
            vocabSection.classList.remove('hidden');
            vocabList.innerHTML = q.vocabulary.map(v => `
                <div class="vocab-item">
                    <span class="vocab-fr">${v.wordFr}</span>
                    <span class="vocab-en">${v.wordEn}</span>
                </div>
            `).join('');
        } else {
            vocabSection.classList.add('hidden');
        }

        // Bookmark button
        const flagBtn = document.getElementById('flag-btn');
        flagBtn.textContent = Storage.isBookmarked(q.id) ? '🔖 Bookmarked' : '🔖 Bookmark';
        flagBtn.onclick = () => {
            const bookmarked = Storage.toggleBookmark(q.id);
            flagBtn.textContent = bookmarked ? '🔖 Bookmarked' : '🔖 Bookmark';
            showToast(bookmarked ? 'Bookmarked!' : 'Bookmark removed');
        };

        // Ask Dani button
        const askTutorBtn = document.getElementById('ask-tutor-btn');
        if (askTutorBtn) {
            askTutorBtn.onclick = () => {
                Tutor.askAboutQuestion(q, correct);
            };
        }

        // Next button — only advance index for non-retry questions
        document.getElementById('next-question-btn').onclick = () => {
            if (!this.isRetry) {
                this.sessionIndex++;
            }
            this.loadQuestion();
        };

        panel.classList.remove('hidden');

        // Auto-scroll to explanation panel so "Next Question" is visible on mobile
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Fallback: directly scroll the content area container
            const contentArea = document.getElementById('content-area');
            if (contentArea) contentArea.scrollTop = contentArea.scrollHeight;
        }, 150);
    },

    endSession() {
        // Remove keyboard handler
        if (this._keyHandlerRegistered) {
            document.removeEventListener('keydown', this._keyHandler);
            this._keyHandlerRegistered = false;
        }

        const total = this.sessionQuestions.length;
        if (total === 0) {
            App.navigate('home');
            return;
        }

        const accuracy = Math.round((this.sessionCorrect / total) * 100);
        const durationSecs = Math.round((Date.now() - (this.sessionStartTime || Date.now())) / 1000);
        const mins = Math.floor(durationSecs / 60);
        const secs = durationSecs % 60;
        const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

        // Build per-topic stats from this session's attempts
        const recentAttempts = Storage.getAttempts().slice(-(total + this.retryQueue.length));
        const topicStats = {};
        for (const a of recentAttempts) {
            if (!topicStats[a.topic]) topicStats[a.topic] = { correct: 0, total: 0 };
            topicStats[a.topic].total++;
            if (a.isCorrect) topicStats[a.topic].correct++;
        }

        // Build summary HTML
        const panel = document.getElementById('explanation-panel');
        panel.classList.remove('hidden');

        const verdict = document.getElementById('verdict');
        if (accuracy >= 85) {
            verdict.className = 'verdict correct';
            verdict.innerHTML = `Session complete! ${this.sessionCorrect}/${total} (${accuracy}%)`;
        } else if (accuracy >= 60) {
            verdict.className = 'verdict';
            verdict.innerHTML = `Session complete! ${this.sessionCorrect}/${total} (${accuracy}%)`;
        } else {
            verdict.className = 'verdict incorrect';
            verdict.innerHTML = `Session complete! ${this.sessionCorrect}/${total} (${accuracy}%)`;
        }

        // Enhanced summary with time and topic breakdown
        let summaryHtml = `<div class="session-summary">`;
        summaryHtml += `<div class="summary-stat"><span class="summary-label">Time</span><span class="summary-value">${timeStr}</span></div>`;
        summaryHtml += `<div class="summary-stat"><span class="summary-label">Speed</span><span class="summary-value">${total > 0 ? Math.round(durationSecs / total) : 0}s/question</span></div>`;
        summaryHtml += `</div>`;
        summaryHtml += `<strong>Topic Breakdown:</strong><br>`;

        for (const [topicId, data] of Object.entries(topicStats)) {
            const topic = ETG_TOPICS.find(t => t.id === topicId);
            const pct = Math.round((data.correct / data.total) * 100);
            const emoji = pct >= 80 ? '✓' : pct >= 50 ? '~' : '✗';
            summaryHtml += `${emoji} ${topic?.icon || ''} ${topic?.nameEn || topicId}: ${data.correct}/${data.total}<br>`;
        }

        document.getElementById('explanation-en').innerHTML = summaryHtml;
        document.getElementById('explanation-fr').textContent = '';
        document.getElementById('explanation-fr-section').style.display = 'none';
        document.getElementById('trap-section').classList.add('hidden');
        document.getElementById('distractor-section').classList.add('hidden');
        document.getElementById('vocab-section').classList.add('hidden');

        // Repurpose buttons
        document.getElementById('next-question-btn').textContent = 'Back to Home';
        document.getElementById('next-question-btn').onclick = () => {
            document.getElementById('next-question-btn').textContent = 'Next Question';
            App.navigate('home');
        };
        document.getElementById('flag-btn').classList.add('hidden');
        document.getElementById('ask-tutor-btn')?.classList.add('hidden');
    },

    // === TIMER (for exam mode) ===
    startTimer(seconds, onExpired) {
        this.stopTimer();
        this.timerSeconds = seconds;
        this.onTimerExpired = onExpired;

        const timerBar = document.getElementById('timer-bar');
        const timerFill = document.getElementById('timer-fill');
        const timerText = document.getElementById('timer-text');
        timerBar.classList.remove('hidden');

        const startTime = Date.now();
        const totalMs = seconds * 1000;

        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, totalMs - elapsed);
            const percent = (remaining / totalMs) * 100;
            const secs = Math.ceil(remaining / 1000);

            timerFill.style.width = `${percent}%`;
            timerText.textContent = `${secs}s`;

            // Color changes
            timerFill.className = 'timer-fill';
            if (secs <= 5) {
                timerFill.classList.add('danger');
                if (secs <= 3) timerText.classList.add('timer-pulse');
            } else if (secs <= 10) {
                timerFill.classList.add('warning');
            }

            if (remaining <= 0) {
                this.stopTimer();
                if (this.onTimerExpired) this.onTimerExpired();
            }
        }, 100);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        document.getElementById('timer-bar')?.classList.add('hidden');
        document.getElementById('timer-text')?.classList.remove('timer-pulse');
    }
};
