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
    activeTopic: null, // null = all topics

    // === SRS CONSTANTS ===
    SRS_INITIAL_INTERVAL: 4,       // hours for "learning"
    SRS_KNOWN_INTERVAL: 24,        // hours for first "known"
    SRS_INITIAL_EASE: 2.5,
    SRS_MIN_EASE: 1.3,
    SRS_MAX_INTERVAL_DAYS: 30,

    // === INIT ===
    init() {
        this.setupModeToggle();
        this.setupGestures();
    },

    // === VOCABULARY EXTRACTION ===
    getAllVocab() {
        // Use pre-built VOCAB_DATA if available (from js/vocab-data.js)
        if (typeof VOCAB_DATA !== 'undefined' && VOCAB_DATA.length > 0) {
            return VOCAB_DATA.slice();
        }
        // Fallback: extract from QUESTION_BANK at runtime
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
        return JSON.parse(localStorage.getItem(Storage.KEYS.VOCAB_MEMORY) || '{}');
    },

    saveMemory(memory) {
        Storage._safeSet(Storage.KEYS.VOCAB_MEMORY, JSON.stringify(memory));
    },

    markWord(wordFr, status) {
        const memory = this.getMemory();
        const key = wordFr.toLowerCase();
        const prev = memory[key] || {};
        const ease = prev.easeFactor || this.SRS_INITIAL_EASE;

        let newInterval, newEase;
        if (status === 'learning') {
            newInterval = this.SRS_INITIAL_INTERVAL;
            newEase = Math.max(this.SRS_MIN_EASE, ease - 0.2);
        } else {
            // "known" — increase interval
            const prevInterval = prev.interval || this.SRS_KNOWN_INTERVAL;
            newInterval = Math.min(prevInterval * ease, this.SRS_MAX_INTERVAL_DAYS * 24);
            newEase = Math.min(ease + 0.1, 3.0);
        }

        memory[key] = {
            status,
            lastSeen: Date.now(),
            timesReviewed: (prev.timesReviewed || 0) + 1,
            interval: newInterval,
            easeFactor: newEase,
            nextReview: Date.now() + (newInterval * 3600000)
        };
        this.saveMemory(memory);
    },

    isDue(memEntry) {
        if (!memEntry || !memEntry.nextReview) return true;
        return Date.now() >= memEntry.nextReview;
    },

    getReviewLabel(memEntry) {
        if (!memEntry || !memEntry.nextReview) return null;
        const diff = memEntry.nextReview - Date.now();
        if (diff <= 0) return 'Due';
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return `${Math.ceil(diff / 60000)}m`;
        if (hours < 24) return `${hours}h`;
        return `${Math.floor(hours / 24)}d`;
    },

    // === SIGN PROGRESS ===
    getSignProgress() {
        return JSON.parse(localStorage.getItem(Storage.KEYS.SIGN_PROGRESS) || '{}');
    },

    saveSignProgress(progress) {
        Storage._safeSet(Storage.KEYS.SIGN_PROGRESS, JSON.stringify(progress));
    },

    markSign(signId, correct) {
        const progress = this.getSignProgress();
        if (!progress[signId]) {
            progress[signId] = { streak: 0, total: 0, mastered: false };
        }
        progress[signId].total++;
        if (correct) {
            progress[signId].streak++;
        } else {
            progress[signId].streak = 0; // reset on wrong answer
        }
        // Mastered after 3 correct in a row
        if (progress[signId].streak >= 3) {
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

    // === TOPIC FILTER ===
    renderTopicFilter() {
        const allChip = `<button class="topic-chip ${this.activeTopic === null ? 'active' : ''}" data-topic="all">All</button>`;
        const topicChips = ETG_TOPICS.map(t =>
            `<button class="topic-chip ${this.activeTopic === t.id ? 'active' : ''}" data-topic="${t.id}">${t.icon} ${t.nameFr.split(' ').slice(0, 2).join(' ')}</button>`
        ).join('');
        return `<div class="topic-filter-bar">${allChip}${topicChips}</div>`;
    },

    wireTopicFilter() {
        document.querySelectorAll('.topic-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const topic = chip.dataset.topic;
                this.activeTopic = topic === 'all' ? null : topic;
                this.renderVocabMode();
            });
        });
    },

    // === VOCABULARY MODE ===
    renderVocabMode() {
        const container = document.getElementById('vocab-content');
        let allVocab = this.getAllVocab();
        const memory = this.getMemory();

        // Apply topic filter
        if (this.activeTopic) {
            allVocab = allVocab.filter(v => v.topic === this.activeTopic);
        }

        // Stats (filtered)
        const knownCount = allVocab.filter(v => memory[v.wordFr.toLowerCase()]?.status === 'known').length;
        const learningCount = allVocab.filter(v => memory[v.wordFr.toLowerCase()]?.status === 'learning').length;
        const totalCount = allVocab.length;
        const unseenCount = totalCount - knownCount - learningCount;
        const dueCount = allVocab.filter(v => this.isDue(memory[v.wordFr.toLowerCase()])).length;

        // SRS deck ordering: due first (oldest-due-first), then unseen, then not-yet-due
        const now = Date.now();
        const due = allVocab.filter(v => {
            const m = memory[v.wordFr.toLowerCase()];
            return m && this.isDue(m);
        }).sort((a, b) => {
            const ma = memory[a.wordFr.toLowerCase()];
            const mb = memory[b.wordFr.toLowerCase()];
            return (ma.nextReview || 0) - (mb.nextReview || 0);
        });
        const unseen = shuffle(allVocab.filter(v => !memory[v.wordFr.toLowerCase()]));
        const notDue = allVocab.filter(v => {
            const m = memory[v.wordFr.toLowerCase()];
            return m && !this.isDue(m);
        });

        this.deck = [...due, ...unseen, ...notDue];
        this.currentIndex = 0;
        this.revealed = false;

        container.innerHTML = `
            ${this.renderTopicFilter()}
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
                    <span class="vocab-stat-num vocab-due">${dueCount}</span>
                    <span class="vocab-stat-label">Due</span>
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
                    <p>No vocabulary words found${this.activeTopic ? ' for this topic' : ''}.</p>
                </div>
            `}
        `;

        this.wireTopicFilter();
        this.wireVocabEvents();
    },

    renderFlashcard(word) {
        if (!word) return '<div class="empty-state">All done!</div>';
        const memory = this.getMemory();
        const memEntry = memory[word.wordFr.toLowerCase()];
        const status = memEntry?.status;
        const statusBadge = status === 'known' ? '<span class="vocab-badge known">Known</span>' :
                           status === 'learning' ? '<span class="vocab-badge learning">Learning</span>' : '';
        const topic = ETG_TOPICS.find(t => t.id === word.topic);

        // SRS review badge
        let reviewBadge = '';
        if (memEntry) {
            const label = this.getReviewLabel(memEntry);
            if (label === 'Due') {
                reviewBadge = '<span class="vocab-badge due">Due</span>';
            } else if (label) {
                reviewBadge = `<span class="vocab-badge review">Review in ${label}</span>`;
            }
        }

        return `
            <div class="vocab-front ${this.revealed ? 'flipped' : ''}">
                <div class="vocab-topic-tag">${topic?.icon || ''} ${topic?.nameFr || ''}</div>
                <div class="vocab-badges-row">${statusBadge}${reviewBadge}</div>
                <div class="vocab-word-fr">${word.wordFr}${typeof VocabAudio !== 'undefined' && VocabAudio.hasAudio(word.wordFr) ? ' <button class="vocab-pronounce-btn" data-word="' + word.wordFr.replace(/"/g, '&quot;') + '" title="Hear pronunciation" aria-label="Pronounce">&#128264;</button>' : ''}</div>
                <div class="vocab-hint">Tap to see translation</div>
            </div>
            <div class="vocab-back ${this.revealed ? 'visible' : ''}">
                <div class="vocab-word-fr">${word.wordFr}${typeof VocabAudio !== 'undefined' && VocabAudio.hasAudio(word.wordFr) ? ' <button class="vocab-pronounce-btn" data-word="' + word.wordFr.replace(/"/g, '&quot;') + '" title="Hear pronunciation" aria-label="Pronounce">&#128264;</button>' : ''}</div>
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
            this.wirePronounceButtons();
        };

        card.addEventListener('click', (e) => {
            if (e.target.closest('.vocab-pronounce-btn')) return; // don't reveal on pronounce click
            reveal();
        });
        revealBtn.addEventListener('click', reveal);

        // Wire pronunciation buttons
        this.wirePronounceButtons();
    },

    wirePronounceButtons() {
        document.querySelectorAll('.vocab-pronounce-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const word = btn.dataset.word;
                if (typeof VocabAudio !== 'undefined') {
                    VocabAudio.play(word);
                }
            });
        });
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
