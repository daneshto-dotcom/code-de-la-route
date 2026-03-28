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

    start(mode = 'exam') {
        this.mode = mode;
        this.questions = getExamQuestions();
        this.currentIndex = 0;
        this.correctCount = 0;
        this.results = [];
        this.startTime = Date.now();
        this.active = true;

        // Switch views
        document.getElementById('exam-intro').classList.add('hidden');
        document.getElementById('exam-active').classList.remove('hidden');
        document.getElementById('exam-results').classList.add('hidden');

        // Setup exam UI inside exam-active
        this.setupExamUI();
        this.loadExamQuestion();
    },

    setupExamUI() {
        const container = document.getElementById('exam-active');
        container.innerHTML = `
            <div class="practice-header">
                <div class="session-progress">
                    <span id="exam-count">1 / 40</span>
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
                    } else {
                        confirmBtn.classList.add('hidden');
                    }
                }
            });
            optionsContainer.appendChild(tile);
        }

        // Confirm button hidden
        document.getElementById('exam-confirm-btn').classList.add('hidden');

        // TTS in exam mode
        if (settings.ttsEnabled) {
            TTS.speakQuestion(q);
        }

        // Start 20-second timer
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

        // Record result
        this.results.push({
            questionId: question.id,
            topic: question.topic,
            selected,
            correct,
        });

        // Record attempt
        Storage.saveAttempt({
            questionId: question.id,
            topic: question.topic,
            selectedAnswers: selected,
            isCorrect: correct,
            confidence: null,
            sessionType: 'exam'
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
            this.currentIndex++;
            document.getElementById('exam-confirm-btn').classList.add('hidden');
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

    showResults() {
        this.active = false;
        TTS.stop();
        this.stopExamTimer();

        const duration = Math.round((Date.now() - this.startTime) / 1000);
        const passed = this.correctCount >= EXAM_PASS_THRESHOLD;

        // Save exam result
        Storage.saveExamResult({
            correctCount: this.correctCount,
            totalQuestions: this.questions.length,
            passed,
            durationSeconds: duration,
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
