/* ============================================
   Mock Exam Engine
   40 questions, 20-second timer, exam simulation
   ============================================ */

const Exam = {
    questions: [],
    currentIndex: 0,
    correctCount: 0,
    results: [], // per-question results
    mode: 'exam', // 'exam' (French only) or 'practice' (with English)
    startTime: null,
    active: false,
    _answered: false, // guard against double submission
    _overallTimer: null,
    _overallRemaining: 0, // seconds left on overall timer
    _questionStartTime: null, // tracks per-question time
    _timeExpired: false, // true if overall timer ran out

    start(mode = 'exam') {
        this.mode = mode;
        this.questions = getExamQuestions();
        this.currentIndex = 0;
        this.correctCount = 0;
        this.results = [];
        this.startTime = Date.now();
        this.active = true;
        this._overallRemaining = EXAM_TOTAL_TIME;
        this._timeExpired = false;

        // Switch views
        document.getElementById('exam-intro').classList.add('hidden');
        document.getElementById('exam-active').classList.remove('hidden');
        document.getElementById('exam-results').classList.add('hidden');

        // Setup exam UI inside exam-active
        this.setupExamUI();
        this.startOverallTimer();
        this.loadExamQuestion();
    },

    setupExamUI() {
        const container = document.getElementById('exam-active');
        container.innerHTML = `
            <div class="practice-header">
                <div class="session-progress">
                    <span id="exam-count">1 / 40</span>
                    <span id="exam-overall-timer" class="overall-timer">30:00</span>
                    <span id="exam-score-live"></span>
                </div>
                <button class="btn btn-text btn-sm" id="quit-exam-btn">Quit</button>
            </div>
            <div class="timer-bar" id="exam-timer-bar">
                <div class="timer-fill" id="exam-timer-fill"></div>
                <span class="timer-text" id="exam-timer-text">20s</span>
            </div>
            <div class="question-card card" id="exam-question-card">
                <div class="question-badges">
                    <span class="topic-badge" id="exam-topic"></span>
                    <span class="multi-badge hidden" id="exam-multi-badge">Plusieurs réponses possibles</span>
                </div>
                <div class="sign-container hidden" id="exam-signs"></div>
                <div class="media-container hidden" id="exam-media"></div>
                <div class="question-text-fr" id="exam-question-fr"></div>
                <div class="question-text-en" id="exam-question-en"></div>
            </div>
            <div class="answer-options" id="exam-options"></div>
            <button class="btn btn-primary btn-lg btn-confirm hidden" id="exam-confirm-btn">Confirm</button>
        `;

        document.getElementById('quit-exam-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to quit the exam?')) {
                this.active = false;
                this.stopExamTimer();
                this.stopOverallTimer();
                App.navigate('home');
                this.resetExamView();
            }
        });
    },

    loadExamQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const q = this.questions[this.currentIndex];
        const settings = Storage.getSettings();
        const showEn = this.mode === 'practice' && settings.showEnglish;

        // Update counter
        document.getElementById('exam-count').textContent = `${this.currentIndex + 1} / ${this.questions.length}`;

        // Topic badge
        const topic = ETG_TOPICS.find(t => t.id === q.topic);
        document.getElementById('exam-topic').textContent = `${topic?.icon || ''} ${topic?.nameEn || ''}`;

        // Multi-answer badge
        const multiBadge = document.getElementById('exam-multi-badge');
        if (q.answerCount > 1) {
            multiBadge.classList.remove('hidden');
        } else {
            multiBadge.classList.add('hidden');
        }

        // Road sign images
        const signContainer = document.getElementById('exam-signs');
        if (q.signs && q.signs.length > 0) {
            RoadSigns.render(q.signs, signContainer);
        } else {
            signContainer.classList.add('hidden');
            signContainer.innerHTML = '';
        }

        // Media (photo-based questions)
        const examMedia = document.getElementById('exam-media');
        if (examMedia) {
            if (q.media && q.media.type === 'image' && q.media.url) {
                examMedia.innerHTML = `<img src="${q.media.url}" alt="${q.media.alt || ''}" class="question-media-img" loading="lazy">`;
                examMedia.classList.remove('hidden');
            } else {
                examMedia.classList.add('hidden');
                examMedia.innerHTML = '';
            }
        }

        // Question text
        document.getElementById('exam-question-fr').textContent = q.questionFr;
        const enEl = document.getElementById('exam-question-en');
        enEl.textContent = showEn ? q.questionEn : '';
        enEl.style.display = showEn ? 'block' : 'none';

        // Options
        const optionsContainer = document.getElementById('exam-options');
        optionsContainer.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];
        let examSelected = [];
        this._answered = false;

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
                    ${showEn ? `<div class="answer-text-en">${option.en}</div>` : ''}
                </div>
                <div class="answer-indicator"></div>
            `;
            tile.addEventListener('click', () => {
                if (tile.classList.contains('locked') || this._answered) return;

                if (q.answerCount === 1) {
                    this._answered = true;
                    examSelected = [letter];
                    document.querySelectorAll('#exam-options .answer-tile').forEach(t => t.classList.remove('selected'));
                    tile.classList.add('selected');
                    setTimeout(() => this.submitExamAnswer(q, examSelected), 200);
                } else {
                    const idx = examSelected.indexOf(letter);
                    if (idx >= 0) {
                        examSelected.splice(idx, 1);
                        tile.classList.remove('selected');
                    } else {
                        examSelected.push(letter);
                        tile.classList.add('selected');
                    }

                    const confirmBtn = document.getElementById('exam-confirm-btn');
                    if (examSelected.length >= 1) {
                        confirmBtn.classList.remove('hidden');
                        confirmBtn.onclick = () => this.submitExamAnswer(q, examSelected);
                        // Scroll confirm button into view on mobile
                        setTimeout(() => confirmBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
                    } else {
                        confirmBtn.classList.add('hidden');
                    }
                }
            });
            optionsContainer.appendChild(tile);
        }

        // Confirm button hidden
        document.getElementById('exam-confirm-btn').classList.add('hidden');

        // Track per-question start time
        this._questionStartTime = Date.now();

        // TTS in exam mode
        if (settings.ttsEnabled) {
            TTS.speakQuestion(q);
        }

        // Start per-question timer
        this.startExamTimer(() => {
            // Timer expired — guard against double submission
            if (this._answered) return;
            this._answered = true;
            if (examSelected.length > 0) {
                this.submitExamAnswer(q, examSelected);
            } else {
                this.submitExamAnswer(q, []); // No answer = incorrect
            }
        });

        // Animate
        document.getElementById('exam-question-card').style.animation = 'fadeInUp 0.25s ease';
    },

    submitExamAnswer(question, selected) {
        this._answered = true;
        this.stopExamTimer();

        const correct = selected.sort().join(',') === [...question.correctAnswers].sort().join(',');
        if (correct) this.correctCount++;

        // Brief feedback
        document.querySelectorAll('#exam-options .answer-tile').forEach(tile => {
            tile.classList.add('locked');
            const letter = tile.dataset.letter;
            if (question.correctAnswers.includes(letter)) {
                tile.classList.add('correct');
            } else if (selected.includes(letter)) {
                tile.classList.add('incorrect');
            }
        });

        // Record result with per-question time
        const timeTaken = this._questionStartTime ? Math.round((Date.now() - this._questionStartTime) / 1000) : 0;
        this.results.push({
            questionId: question.id,
            topic: question.topic,
            selected,
            correct,
            timeTaken,
        });

        // Record attempt
        Storage.saveAttempt({
            questionId: question.id,
            topic: question.topic,
            selectedAnswers: selected,
            isCorrect: correct,
            confidence: null,
            sessionType: 'exam',
            responseMs: this._questionStartTime ? (Date.now() - this._questionStartTime) : null
        });

        // If wrong, schedule for review
        if (!correct) {
            Storage.scheduleForReview(question.id, false, null);
        }

        // Update live score
        document.getElementById('exam-score-live').textContent =
            `${this.correctCount}/${this.currentIndex + 1}`;

        // Next question after brief delay
        setTimeout(() => {
            if (!this.active) return;
            this.currentIndex++;
            document.getElementById('exam-confirm-btn')?.classList.add('hidden');
            this.loadExamQuestion();
        }, 800);
    },

    startExamTimer(onExpired) {
        this.stopExamTimer();
        const timerFill = document.getElementById('exam-timer-fill');
        const timerText = document.getElementById('exam-timer-text');
        const timerBar = document.getElementById('exam-timer-bar');
        if (!timerBar) return;

        timerBar.style.display = 'block';
        const startTime = Date.now();
        const totalMs = EXAM_TIMER_SECONDS * 1000;

        this._examTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, totalMs - elapsed);
            const percent = (remaining / totalMs) * 100;
            const secs = Math.ceil(remaining / 1000);

            timerFill.style.width = `${percent}%`;
            timerText.textContent = `${secs}s`;

            timerFill.className = 'timer-fill';
            if (secs <= 5) timerFill.classList.add('danger');
            else if (secs <= 10) timerFill.classList.add('warning');

            if (remaining <= 0) {
                this.stopExamTimer();
                onExpired();
            }
        }, 100);
    },

    stopExamTimer() {
        if (this._examTimer) {
            clearInterval(this._examTimer);
            this._examTimer = null;
        }
    },

    startOverallTimer() {
        this.stopOverallTimer();
        const timerEl = document.getElementById('exam-overall-timer');
        if (!timerEl) return;

        this._overallTimer = setInterval(() => {
            this._overallRemaining--;
            const mins = Math.floor(this._overallRemaining / 60);
            const secs = this._overallRemaining % 60;
            timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

            // Color warnings
            timerEl.classList.remove('timer-warning', 'timer-danger');
            if (this._overallRemaining <= 120) timerEl.classList.add('timer-danger');
            else if (this._overallRemaining <= 300) timerEl.classList.add('timer-warning');

            if (this._overallRemaining <= 0) {
                this.onOverallTimeUp();
            }
        }, 1000);
    },

    stopOverallTimer() {
        if (this._overallTimer) {
            clearInterval(this._overallTimer);
            this._overallTimer = null;
        }
    },

    onOverallTimeUp() {
        this.stopOverallTimer();
        this.stopExamTimer();
        this._timeExpired = true;

        // Auto-submit current question if unanswered
        if (!this._answered && this.currentIndex < this.questions.length) {
            this._answered = true;
            const q = this.questions[this.currentIndex];
            const selected = [];
            document.querySelectorAll('#exam-options .answer-tile.selected').forEach(t => selected.push(t.dataset.letter));
            const timeTaken = this._questionStartTime ? Math.round((Date.now() - this._questionStartTime) / 1000) : 0;
            const correct = selected.sort().join(',') === [...q.correctAnswers].sort().join(',');
            if (correct) this.correctCount++;
            this.results.push({ questionId: q.id, topic: q.topic, selected, correct, timeTaken });
            Storage.saveAttempt({ questionId: q.id, topic: q.topic, selectedAnswers: selected, isCorrect: correct, confidence: null, sessionType: 'exam', responseMs: this._questionStartTime ? (Date.now() - this._questionStartTime) : null });
            if (!correct) Storage.scheduleForReview(q.id, false, null);
            this.currentIndex++;
        }

        // Mark all remaining questions as unanswered/incorrect
        while (this.currentIndex < this.questions.length) {
            const q = this.questions[this.currentIndex];
            this.results.push({ questionId: q.id, topic: q.topic, selected: [], correct: false, timeTaken: 0 });
            Storage.saveAttempt({ questionId: q.id, topic: q.topic, selectedAnswers: [], isCorrect: false, confidence: null, sessionType: 'exam', responseMs: null });
            Storage.scheduleForReview(q.id, false, null);
            this.currentIndex++;
        }

        this.showResults();
    },

    showResults() {
        this.active = false;
        TTS.stop();
        this.stopExamTimer();
        this.stopOverallTimer();

        const duration = Math.round((Date.now() - this.startTime) / 1000);
        const passed = this.correctCount >= EXAM_PASS_THRESHOLD;

        // Save exam result
        Storage.saveExamResult({
            correctCount: this.correctCount,
            totalQuestions: this.questions.length,
            passed,
            durationSeconds: duration,
            timeExpired: this._timeExpired,
            results: this.results
        });

        // Show results view
        document.getElementById('exam-active').classList.add('hidden');
        const resultsDiv = document.getElementById('exam-results');
        resultsDiv.classList.remove('hidden');

        // Score ring animation
        const ring = document.getElementById('results-ring');
        const circumference = 2 * Math.PI * 70;
        const pct = this.correctCount / this.questions.length;
        setTimeout(() => {
            ring.style.strokeDashoffset = circumference * (1 - pct);
            ring.style.stroke = passed ? 'var(--success)' : 'var(--error)';
        }, 100);

        document.getElementById('results-score').textContent = `${this.correctCount}/${this.questions.length}`;

        const verdict = document.getElementById('results-verdict');
        if (passed) {
            verdict.className = 'results-verdict pass';
            verdict.textContent = '🎉 PASSED!';
        } else {
            verdict.className = 'results-verdict fail';
            verdict.textContent = 'Not yet — keep practicing!';
        }

        // Context
        const context = document.getElementById('results-context');
        if (passed) {
            context.textContent = `National pass rate: ${NATIONAL_PASS_RATE}% — You're performing great!`;
        } else {
            context.textContent = `You need ${EXAM_PASS_THRESHOLD} to pass. Review your mistakes and try again!`;
        }

        // Topic breakdown
        const topicsDiv = document.getElementById('results-topics');
        topicsDiv.innerHTML = '';
        const topicResults = {};
        this.results.forEach(r => {
            if (!topicResults[r.topic]) topicResults[r.topic] = { correct: 0, total: 0 };
            topicResults[r.topic].total++;
            if (r.correct) topicResults[r.topic].correct++;
        });

        for (const [topicId, data] of Object.entries(topicResults)) {
            const topic = ETG_TOPICS.find(t => t.id === topicId);
            const pct = data.total > 0 ? data.correct / data.total : 0;
            const cls = pct >= 1 ? 'good' : pct >= 0.75 ? 'medium' : 'bad';
            const item = document.createElement('div');
            item.className = `result-topic-item ${cls}`;
            item.innerHTML = `
                <span>${topic?.icon || ''} ${topic?.nameEn || topicId}</span>
                <strong>${data.correct}/${data.total}</strong>
            `;
            topicsDiv.appendChild(item);
        }

        // Time analytics
        const answeredResults = this.results.filter(r => r.timeTaken > 0);
        const avgTime = answeredResults.length > 0
            ? Math.round(answeredResults.reduce((sum, r) => sum + r.timeTaken, 0) / answeredResults.length)
            : 0;
        const durationMins = Math.floor(duration / 60);
        const durationSecs = duration % 60;
        const timeAnalytics = document.createElement('div');
        timeAnalytics.className = 'time-analytics';
        timeAnalytics.innerHTML = `
            <h3>⏱ Temps</h3>
            <div class="time-stats">
                <div class="time-stat">
                    <span class="time-stat-value">${durationMins}:${durationSecs.toString().padStart(2, '0')}</span>
                    <span class="time-stat-label">Durée totale</span>
                </div>
                <div class="time-stat">
                    <span class="time-stat-value">${avgTime}s</span>
                    <span class="time-stat-label">Moyenne / question</span>
                </div>
                <div class="time-stat">
                    <span class="time-stat-value ${this._timeExpired ? 'timer-danger' : ''}">${this._timeExpired ? 'Expiré' : `${Math.floor(this._overallRemaining / 60)}:${(this._overallRemaining % 60).toString().padStart(2, '0')}`}</span>
                    <span class="time-stat-label">${this._timeExpired ? 'Temps écoulé' : 'Temps restant'}</span>
                </div>
            </div>
        `;
        topicsDiv.after(timeAnalytics);

        // Wire buttons
        document.getElementById('review-exam-mistakes-btn').onclick = () => {
            const wrongIds = this.results.filter(r => !r.correct).map(r => r.questionId);
            if (wrongIds.length > 0) {
                Practice.sessionType = 'review';
                Practice.sessionQuestions = wrongIds.map(id => getQuestionById(id)).filter(Boolean);
                Practice.sessionIndex = 0;
                Practice.sessionCorrect = 0;
                App.navigate('practice');
                Practice.loadQuestion();
            } else {
                showToast('No mistakes to review! Perfect score!', 'success');
            }
        };

        document.getElementById('new-exam-btn').onclick = () => {
            this.resetExamView();
        };

        document.getElementById('exam-home-btn').onclick = () => {
            this.resetExamView();
            App.navigate('home');
        };
    },

    resetExamView() {
        document.getElementById('exam-intro').classList.remove('hidden');
        document.getElementById('exam-active').classList.add('hidden');
        document.getElementById('exam-results').classList.add('hidden');
    }
};
