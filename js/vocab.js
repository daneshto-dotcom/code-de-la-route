/* ============================================
   Vocabulary Flashcards & Road Signs Quiz
   Learn screen — two modes in one tab
   ============================================ */

const Vocab = {
    // === STATE ===
    mode: 'vocab', // 'vocab' or 'signs'
    deck: [],
    currentIndex: 0,
    revealed: false,
    signChoices: [],
    signCorrect: null,
    signAnswered: false,
    stats: { seen: 0, known: 0, learning: 0 },

    // === INIT ===
    init() {
        this.setupModeToggle();
        this.setupGestures();
    },

    // === VOCABULARY EXTRACTION ===
    getAllVocab() {
        const vocabMap = new Map();
        for (const q of QUESTION_BANK) {
            if (!q.vocabulary) continue;
            for (const v of q.vocabulary) {
                const key = v.wordFr.toLowerCase();
                if (!vocabMap.has(key)) {
                    vocabMap.set(key, {
                        wordFr: v.wordFr,
                        wordEn: v.wordEn,
                        definition: v.definition || '',
                        topic: q.topic,
                        questionId: q.id
                    });
                }
            }
        }
        return Array.from(vocabMap.values());
    },

    // === VOCAB MEMORY (persisted) ===
    getMemory() {
        return JSON.parse(localStorage.getItem('fdtta_vocab_memory') || '{}');
    },

    saveMemory(memory) {
        localStorage.setItem('fdtta_vocab_memory', JSON.stringify(memory));
    },

    markWord(wordFr, status) {
        const memory = this.getMemory();
        const key = wordFr.toLowerCase();
        memory[key] = {
            status, // 'known' or 'learning'
            lastSeen: Date.now(),
            timesReviewed: (memory[key]?.timesReviewed || 0) + 1
        };
        this.saveMemory(memory);
    },

    // === SIGN PROGRESS ===
    getSignProgress() {
        return JSON.parse(localStorage.getItem('fdtta_sign_progress') || '{}');
    },

    saveSignProgress(progress) {
        localStorage.setItem('fdtta_sign_progress', JSON.stringify(progress));
    },

    markSign(signId, correct) {
        const progress = this.getSignProgress();
        if (!progress[signId]) {
            progress[signId] = { correct: 0, total: 0, mastered: false };
        }
        progress[signId].total++;
        if (correct) progress[signId].correct++;
        // Mastered after 3 correct in a row (simplified)
        if (correct && progress[signId].correct >= 3) {
            progress[signId].mastered = true;
        }
        this.saveSignProgress(progress);
    },

    // === MODE TOGGLE ===
    setupModeToggle() {
        document.getElementById('vocab-mode-btn')?.addEventListener('click', () => {
            this.mode = 'vocab';
            this.render();
        });
        document.getElementById('signs-mode-btn')?.addEventListener('click', () => {
            this.mode = 'signs';
            this.render();
        });
    },

    // === MAIN RENDER ===
    render() {
        // Update mode toggle
        document.getElementById('vocab-mode-btn')?.classList.toggle('active', this.mode === 'vocab');
        document.getElementById('signs-mode-btn')?.classList.toggle('active', this.mode === 'signs');

        if (this.mode === 'vocab') {
            this.renderVocabMode();
        } else {
            this.renderSignsMode();
        }
    },

    // === VOCABULARY MODE ===
    renderVocabMode() {
        const container = document.getElementById('vocab-content');
        const allVocab = this.getAllVocab();
        const memory = this.getMemory();

        // Stats
        const knownCount = Object.values(memory).filter(m => m.status === 'known').length;
        const learningCount = Object.values(memory).filter(m => m.status === 'learning').length;
        const totalCount = allVocab.length;
        const unseenCount = totalCount - knownCount - learningCount;

        // Build deck: learning first, then unseen, then known (for review)
        this.deck = [];
        const learning = allVocab.filter(v => memory[v.wordFr.toLowerCase()]?.status === 'learning');
        const unseen = allVocab.filter(v => !memory[v.wordFr.toLowerCase()]);
        const known = allVocab.filter(v => memory[v.wordFr.toLowerCase()]?.status === 'known');

        // Shuffle each group
        this.deck = [...shuffle(learning), ...shuffle(unseen), ...shuffle(known)];
        this.currentIndex = 0;
        this.revealed = false;

        container.innerHTML = `
            <div class="vocab-stats-bar">
                <div class="vocab-stat">
                    <span class="vocab-stat-num vocab-known">${knownCount}</span>
                    <span class="vocab-stat-label">Known</span>
                </div>
                <div class="vocab-stat">
                    <span class="vocab-stat-num vocab-learning">${learningCount}</span>
                    <span class="vocab-stat-label">Learning</span>
                </div>
                <div class="vocab-stat">
                    <span class="vocab-stat-num vocab-unseen">${unseenCount}</span>
                    <span class="vocab-stat-label">New</span>
                </div>
                <div class="vocab-stat">
                    <span class="vocab-stat-num">${totalCount}</span>
                    <span class="vocab-stat-label">Total</span>
                </div>
            </div>
            <div class="vocab-progress-bar">
                <div class="vocab-progress-fill" style="width: ${totalCount > 0 ? Math.round((knownCount / totalCount) * 100) : 0}%"></div>
            </div>
            ${this.deck.length > 0 ? `
                <div class="vocab-card-area">
                    <div class="vocab-counter">${this.currentIndex + 1} / ${this.deck.length}</div>
                    <div class="vocab-flashcard" id="vocab-flashcard">
                        ${this.renderFlashcard(this.deck[0])}
                    </div>
                    <div class="vocab-actions" id="vocab-actions">
                        <button class="btn vocab-btn vocab-btn-reveal" id="vocab-reveal-btn">Tap to reveal</button>
                    </div>
                </div>
            ` : `
                <div class="empty-state">
                    <p>No vocabulary words found in the question bank.</p>
                </div>
            `}
        `;

        this.wireVocabEvents();
    },

    renderFlashcard(word) {
        if (!word) return '<div class="empty-state">All done!</div>';
        const memory = this.getMemory();
        const status = memory[word.wordFr.toLowerCase()]?.status;
        const statusBadge = status === 'known' ? '<span class="vocab-badge known">Known</span>' :
                           status === 'learning' ? '<span class="vocab-badge learning">Learning</span>' : '';
        const topic = ETG_TOPICS.find(t => t.id === word.topic);

        return `
            <div class="vocab-front ${this.revealed ? 'flipped' : ''}">
                <div class="vocab-topic-tag">${topic?.icon || ''} ${topic?.nameFr || ''}</div>
                ${statusBadge}
                <div class="vocab-word-fr">${word.wordFr}</div>
                <div class="vocab-hint">Tap to see translation</div>
            </div>
            <div class="vocab-back ${this.revealed ? 'visible' : ''}">
                <div class="vocab-word-fr">${word.wordFr}</div>
                <div class="vocab-word-en">${word.wordEn}</div>
                ${word.definition ? `<div class="vocab-definition">${word.definition}</div>` : ''}
            </div>
        `;
    },

    wireVocabEvents() {
        const card = document.getElementById('vocab-flashcard');
        const revealBtn = document.getElementById('vocab-reveal-btn');
        const actions = document.getElementById('vocab-actions');

        if (!card || !revealBtn) return;

        const reveal = () => {
            if (this.revealed) return;
            this.revealed = true;
            card.innerHTML = this.renderFlashcard(this.deck[this.currentIndex]);
            card.classList.add('revealed');

            actions.innerHTML = `
                <button class="btn vocab-btn vocab-btn-learning" id="vocab-learning-btn">Still learning</button>
                <button class="btn vocab-btn vocab-btn-known" id="vocab-known-btn">I know this!</button>
            `;

            document.getElementById('vocab-learning-btn').addEventListener('click', () => this.rateWord('learning'));
            document.getElementById('vocab-known-btn').addEventListener('click', () => this.rateWord('known'));
        };

        card.addEventListener('click', reveal);
        revealBtn.addEventListener('click', reveal);
    },

    rateWord(status) {
        const word = this.deck[this.currentIndex];
        if (!word) return;

        this.markWord(word.wordFr, status);
        this.currentIndex++;
        this.revealed = false;

        const card = document.getElementById('vocab-flashcard');
        const actions = document.getElementById('vocab-actions');
        const counter = document.querySelector('.vocab-counter');

        if (this.currentIndex >= this.deck.length) {
            // Deck complete — re-render with updated stats
            this.renderVocabMode();
            return;
        }

        // Update counter
        if (counter) counter.textContent = `${this.currentIndex + 1} / ${this.deck.length}`;

        // Animate card transition
        card.classList.remove('revealed');
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = 'fadeInUp 0.3s ease';
        card.innerHTML = this.renderFlashcard(this.deck[this.currentIndex]);

        actions.innerHTML = `
            <button class="btn vocab-btn vocab-btn-reveal" id="vocab-reveal-btn">Tap to reveal</button>
        `;
        this.wireVocabEvents();
    },

    // === ROAD SIGNS MODE ===
    renderSignsMode() {
        const container = document.getElementById('vocab-content');
        const allSignIds = Object.keys(RoadSigns.signs);
        const progress = this.getSignProgress();

        const masteredCount = Object.values(progress).filter(p => p.mastered).length;
        const totalSigns = allSignIds.length;

        // Pick a random sign, prioritizing unmastered
        const unmastered = allSignIds.filter(id => !progress[id]?.mastered);
        const signPool = unmastered.length > 0 ? unmastered : allSignIds;
        const targetSign = signPool[Math.floor(Math.random() * signPool.length)];

        // Generate 4 choices (1 correct + 3 wrong)
        const wrongPool = allSignIds.filter(id => id !== targetSign);
        const wrongChoices = shuffle(wrongPool).slice(0, 3);
        const choices = shuffle([targetSign, ...wrongChoices]);

        this.signCorrect = targetSign;
        this.signChoices = choices;
        this.signAnswered = false;

        container.innerHTML = `
            <div class="vocab-stats-bar">
                <div class="vocab-stat">
                    <span class="vocab-stat-num vocab-known">${masteredCount}</span>
                    <span class="vocab-stat-label">Mastered</span>
                </div>
                <div class="vocab-stat">
                    <span class="vocab-stat-num vocab-unseen">${totalSigns - masteredCount}</span>
                    <span class="vocab-stat-label">Remaining</span>
                </div>
                <div class="vocab-stat">
                    <span class="vocab-stat-num">${totalSigns}</span>
                    <span class="vocab-stat-label">Total Signs</span>
                </div>
            </div>
            <div class="vocab-progress-bar">
                <div class="vocab-progress-fill" style="width: ${totalSigns > 0 ? Math.round((masteredCount / totalSigns) * 100) : 0}%"></div>
            </div>
            <div class="signs-quiz-area">
                <div class="signs-prompt">What does this sign mean?</div>
                <div class="signs-display" id="signs-display"></div>
                <div class="signs-choices" id="signs-choices">
                    ${choices.map(id => `
                        <button class="signs-choice-btn" data-sign="${id}">
                            ${RoadSigns.labels[id] || id}
                        </button>
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-lg signs-next-btn hidden" id="signs-next-btn">Next Sign</button>
            </div>
        `;

        // Render the target sign SVG
        const display = document.getElementById('signs-display');
        const svg = RoadSigns.get(targetSign);
        if (svg) {
            display.innerHTML = `<div class="signs-svg-display">${svg}</div>`;
        }

        // Wire choice buttons
        document.querySelectorAll('.signs-choice-btn').forEach(btn => {
            btn.addEventListener('click', () => this.answerSign(btn.dataset.sign));
        });

        document.getElementById('signs-next-btn').addEventListener('click', () => this.renderSignsMode());
    },

    answerSign(chosenId) {
        if (this.signAnswered) return;
        this.signAnswered = true;

        const correct = chosenId === this.signCorrect;
        this.markSign(this.signCorrect, correct);

        // Highlight answers
        document.querySelectorAll('.signs-choice-btn').forEach(btn => {
            btn.classList.add('locked');
            if (btn.dataset.sign === this.signCorrect) {
                btn.classList.add('correct');
            } else if (btn.dataset.sign === chosenId && !correct) {
                btn.classList.add('incorrect');
            }
        });

        // Haptic
        if (navigator.vibrate) {
            navigator.vibrate(correct ? 30 : [50, 30, 50]);
        }

        // Show next button
        document.getElementById('signs-next-btn').classList.remove('hidden');
    },

    // === TOUCH GESTURES ===
    setupGestures() {
        // Swipe left/right on flashcard for quick rating
        let startX = 0;
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.vocab-flashcard')) {
                startX = e.touches[0].clientX;
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!e.target.closest('.vocab-flashcard') || !this.revealed) return;
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            if (Math.abs(diff) > 80) {
                this.rateWord(diff > 0 ? 'known' : 'learning');
            }
        }, { passive: true });
    }
};

// === HELPER: Shuffle array ===
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
