/* ============================================
   Diagnostic Assessment Engine
   15-question baseline test on first launch
   Covers all 10 ETG topics, sets initial mastery
   ============================================ */

const Diagnostic = {
    questions: [],
    currentIndex: 0,
    results: [],
    active: false,

    buildQuestionSet() {
        // Select 15 questions: at least 1 per topic, extras from weighted topics
        const selected = [];
        const topicPool = {};

        // Group all questions by topic
        for (const topic of ETG_TOPICS) {
            topicPool[topic.id] = QUESTION_BANK.filter(q => q.topic === topic.id);
        }

        // Phase 1: 1 question per topic (10 questions, preferring difficulty 1-2)
        for (const topic of ETG_TOPICS) {
            const pool = [...topicPool[topic.id]].sort((a, b) => a.difficulty - b.difficulty);
            const easy = pool.filter(q => q.difficulty <= 2);
            const pick = easy.length > 0
                ? easy[Math.floor(Math.random() * easy.length)]
                : pool[Math.floor(Math.random() * pool.length)];
            if (pick) {
                selected.push(pick);
                topicPool[topic.id] = topicPool[topic.id].filter(q => q.id !== pick.id);
            }
        }

        // Phase 2: 5 more from high-weight topics (circulation, conducteur, priorite, signalisation)
        const highWeight = ['circulation', 'conducteur', 'priorite', 'signalisation', 'route'];
        let extra = 0;
        for (const topicId of highWeight) {
            if (extra >= 5) break;
            const remaining = topicPool[topicId].filter(q => !selected.find(s => s.id === q.id));
            if (remaining.length > 0) {
                const pick = remaining[Math.floor(Math.random() * remaining.length)];
                selected.push(pick);
                extra++;
            }
        }

        // Fill any shortfall from random pool
        while (selected.length < 15) {
            const remaining = QUESTION_BANK.filter(q => !selected.find(s => s.id === q.id));
            if (remaining.length === 0) break;
            selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
        }

        return selected.sort(() => Math.random() - 0.5);
    },

    start() {
        this.questions = this.buildQuestionSet();
        this.currentIndex = 0;
        this.results = [];
        this.active = true;

        // Show diagnostic view
        document.getElementById('diagnostic-screen').classList.add('active');
        document.getElementById('onboarding-screen').classList.remove('active');
        document.getElementById('diag-total').textContent = this.questions.length;

        this.loadQuestion();
    },

    loadQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.finish();
            return;
        }

        const q = this.questions[this.currentIndex];
        this.currentSelected = [];

        // Progress
        document.getElementById('diag-current').textContent = this.currentIndex + 1;
        const pct = ((this.currentIndex) / this.questions.length) * 100;
        document.getElementById('diag-progress-fill').style.width = `${pct}%`;

        // Topic
        const topic = ETG_TOPICS.find(t => t.id === q.topic);
        document.getElementById('diag-topic').textContent = `${topic?.icon || ''} ${topic?.nameEn || q.topic}`;

        // Multi-answer badge
        const multiBadge = document.getElementById('diag-multi-badge');
        if (q.answerCount > 1) {
            multiBadge.classList.remove('hidden');
        } else {
            multiBadge.classList.add('hidden');
        }

        // Road sign images
        const signContainer = document.getElementById('diag-signs');
        if (q.signs && q.signs.length > 0) {
            RoadSigns.render(q.signs, signContainer);
        } else {
            signContainer.classList.add('hidden');
            signContainer.innerHTML = '';
        }

        // Question text — French only during diagnostic
        document.getElementById('diag-question-fr').textContent = q.questionFr;
        document.getElementById('diag-question-en').textContent = '';
        document.getElementById('diag-question-en').style.display = 'none';

        // Options — French only
        const optionsContainer = document.getElementById('diag-options');
        optionsContainer.innerHTML = '';
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
                </div>
                <div class="answer-indicator"></div>
            `;
            tile.addEventListener('click', () => this.selectAnswer(letter, q));
            optionsContainer.appendChild(tile);
        }

        // Hide confirm button
        document.getElementById('diag-confirm-btn').classList.add('hidden');

        // Animate
        document.getElementById('diag-question-card').style.animation = 'fadeInUp 0.3s ease';
    },

    selectAnswer(letter, q) {
        if (this.answered) return;

        if (q.answerCount === 1) {
            this.answered = true; // guard against double-tap during 200ms delay
            this.currentSelected = [letter];
            this.highlightSelected();
            setTimeout(() => this.submitAnswer(q), 200);
        } else {
            const idx = this.currentSelected.indexOf(letter);
            if (idx >= 0) {
                this.currentSelected.splice(idx, 1);
            } else {
                this.currentSelected.push(letter);
            }
            this.highlightSelected();

            // Show confirm button when at least 1 answer selected
            const confirmBtn = document.getElementById('diag-confirm-btn');
            if (this.currentSelected.length >= 1) {
                confirmBtn.classList.remove('hidden');
                confirmBtn.onclick = () => this.submitAnswer(q);
                // Scroll confirm button into view on mobile
                setTimeout(() => confirmBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            } else {
                confirmBtn.classList.add('hidden');
            }
        }
    },

    highlightSelected() {
        document.querySelectorAll('#diag-options .answer-tile').forEach(tile => {
            tile.classList.toggle('selected', this.currentSelected.includes(tile.dataset.letter));
        });
    },

    submitAnswer(q) {
        this.answered = true;
        const correct = this.currentSelected.sort().join(',') === [...q.correctAnswers].sort().join(',');

        // Brief visual feedback
        document.querySelectorAll('#diag-options .answer-tile').forEach(tile => {
            tile.classList.add('locked');
            const letter = tile.dataset.letter;
            if (q.correctAnswers.includes(letter)) {
                tile.classList.add('correct');
                tile.querySelector('.answer-indicator').textContent = '✓';
            } else if (this.currentSelected.includes(letter)) {
                tile.classList.add('incorrect');
                tile.querySelector('.answer-indicator').textContent = '✗';
            }
        });

        // Record
        this.results.push({
            questionId: q.id,
            topic: q.topic,
            correct,
            difficulty: q.difficulty
        });

        // Record attempt in storage
        Storage.saveAttempt({
            questionId: q.id,
            topic: q.topic,
            selectedAnswers: [...this.currentSelected],
            isCorrect: correct,
            confidence: null,
            sessionType: 'diagnostic'
        });

        // If wrong, schedule for review
        if (!correct) {
            Storage.scheduleForReview(q.id, false, null);
        }

        // Next after brief delay
        setTimeout(() => {
            this.answered = false;
            this.currentIndex++;
            this.loadQuestion();
        }, 800);
    },

    finish() {
        this.active = false;

        // Calculate per-topic results
        const topicResults = {};
        for (const r of this.results) {
            if (!topicResults[r.topic]) topicResults[r.topic] = { correct: 0, total: 0 };
            topicResults[r.topic].total++;
            if (r.correct) topicResults[r.topic].correct++;
        }

        const totalCorrect = this.results.filter(r => r.correct).length;
        const totalPct = Math.round((totalCorrect / this.results.length) * 100);

        // Store diagnostic result
        Storage.saveDiagnosticResult({
            totalCorrect,
            totalQuestions: this.results.length,
            accuracy: totalPct,
            topicResults,
            results: this.results
        });

        // Show results screen
        document.getElementById('diag-questions').classList.add('hidden');
        const resultsDiv = document.getElementById('diag-results');
        resultsDiv.classList.remove('hidden');

        // Score
        document.getElementById('diag-score').textContent = `${totalCorrect}/${this.results.length}`;
        document.getElementById('diag-pct').textContent = `${totalPct}%`;

        // Verdict
        const verdict = document.getElementById('diag-verdict');
        if (totalPct >= 80) {
            verdict.textContent = 'Great start! You have a strong foundation.';
            verdict.className = 'diag-verdict good';
        } else if (totalPct >= 60) {
            verdict.textContent = 'Good base! Some areas need attention.';
            verdict.className = 'diag-verdict medium';
        } else {
            verdict.textContent = 'Let\'s build from here! Practice will make perfect.';
            verdict.className = 'diag-verdict needs-work';
        }

        // Topic breakdown
        const topicsDiv = document.getElementById('diag-topic-results');
        topicsDiv.innerHTML = '';
        for (const topic of ETG_TOPICS) {
            const data = topicResults[topic.id];
            if (!data) continue;
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const cls = pct >= 80 ? 'good' : pct >= 50 ? 'medium' : 'bad';
            const item = document.createElement('div');
            item.className = `diag-topic-row ${cls}`;
            item.innerHTML = `
                <span>${topic.icon} ${topic.nameEn}</span>
                <strong>${data.correct}/${data.total}</strong>
            `;
            topicsDiv.appendChild(item);
        }

        // Wire continue button
        document.getElementById('diag-continue-btn').onclick = () => {
            document.getElementById('diagnostic-screen').classList.remove('active');
            Storage.completeFirstLaunch();
            App.showMainApp();
        };
    }
};
