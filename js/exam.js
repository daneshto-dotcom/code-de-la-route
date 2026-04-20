/* ============================================
   Mock Exam Engine
   40 questions, 20-second timer, exam simulation
   B21 Final Countdown Mode (S46): examMode='daily-mock' runs a 20Q
   mini-mock weighted on weak areas with qualitative bands (no numeric %).
   ============================================ */

// B21 Final Countdown Mode constants
const DAILY_MOCK_QUESTIONS = 20;
const DAILY_MOCK_TIME = 660; // 11 minutes (10 + 1 buffer for final-Q pacing — GROK-ANALYST MED)
// Qualitative band thresholds (Council C6 Gemini — no "Urgent" red):
//   ≥80% correct → On Track (green)
//   60-79%      → Needs Focus (amber)
//   <60%        → Critical Focus (amber-deep)
const DAILY_MOCK_BAND_GOOD = 0.80;
const DAILY_MOCK_BAND_MEDIUM = 0.60;

const Exam = {
    questions: [],
    currentIndex: 0,
    correctCount: 0,
    results: [], // per-question results
    mode: 'exam', // 'exam' (French only), 'practice' (with English), 'daily-mock' (B21 Final Countdown)
    startTime: null,
    active: false,
    _dailyMockLowDataFlag: false,  // B21: flag when attempt-history is cold-start
    _dailyMockTier: null,          // B21: 'weak-heavy' | 'mixed' | 'cold-start'
    _answered: false, // guard against double submission
    _overallTimer: null,
    _overallRemaining: 0, // seconds left on overall timer
    _questionStartTime: null, // tracks per-question time
    _timeExpired: false, // true if overall timer ran out
    // B22 — Exam Day Simulator (S44)
    _sessionSeed: null,          // base seed for deterministic answer shuffling
    _shuffleCache: {},           // questionId -> {letters, correctAnswers} remapped
    _blurEvents: [],             // visibility-change log for integrity signal
    _visibilityHandler: null,
    _popstateHandler: null,
    _beforeunloadHandler: null,
    _navLocked: false,
    // B22 chunk 2 (S45) — refresh-resume persistence + strict-viewport restoration
    _SESSION_KEY: 'fdtta-exam-active-v1',
    _STALE_MS: 150 * 60 * 1000,  // 2.5h hard-cutoff: older persisted exams are auto-discarded
    _savedViewport: null,         // original viewport meta content (restored on exit)
    _persistTimer: null,

    start(mode = 'exam') {
        this.mode = mode;
        // B21 Final Countdown Mode — daily mock branches on question builder + timer
        if (mode === 'daily-mock') {
            const pool = getDailyMockQuestions(DAILY_MOCK_QUESTIONS);
            this.questions = pool.questions;
            this._dailyMockLowDataFlag = pool.lowDataFlag;
            this._dailyMockTier = pool.tier;
            this._overallRemaining = DAILY_MOCK_TIME;
        } else {
            this.questions = getExamQuestions();
            this._dailyMockLowDataFlag = false;
            this._dailyMockTier = null;
            this._overallRemaining = EXAM_TOTAL_TIME;
        }
        this.currentIndex = 0;
        this.correctCount = 0;
        this.results = [];
        this.startTime = Date.now();
        this.active = true;
        this._timeExpired = false;
        // B22 — seed this exam session; seed format: "<mode>-<timestamp>-<random>"
        this._sessionSeed = `${mode}-${this.startTime}-${Math.floor(Math.random() * 1e9)}`;
        this._shuffleCache = {};
        this._blurEvents = [];

        // Switch views
        document.getElementById('exam-intro').classList.add('hidden');
        document.getElementById('exam-active').classList.remove('hidden');
        document.getElementById('exam-results').classList.add('hidden');

        // B22 — strict mode: lock navigation + start visibility tracking
        this._lockNavigation();
        this._attachVisibilityTracker();
        // B22 chunk 2 (S45) — strict viewport + persistence loop
        this._applyStrictViewport();
        this._clearPersistedState(); // fresh session overrides any stale remnant

        // Setup exam UI inside exam-active
        this.setupExamUI();
        this.startOverallTimer();
        this.loadExamQuestion();
        this._persistState();
        this._startPersistLoop();
    },

    // B22 — Deterministic seeded PRNG (xmur3 + mulberry32)
    // Guarantees same shuffle if user refreshes mid-exam
    _seededRandom(seedStr) {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < seedStr.length; i++) {
            h ^= seedStr.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        let state = h >>> 0;
        return function () {
            state |= 0; state = (state + 0x6D2B79F5) | 0;
            let t = Math.imul(state ^ (state >>> 15), 1 | state);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    },

    // B22 — Shuffle A/B/C/D tile order deterministically per (session, question).
    // Returns {order: ['C','A','D','B']}. Original correctAnswers stay authoritative for grading.
    // KNOWN LIMITATION (chunk 1): full mid-exam refresh-resume not implemented — in-memory state
    //   (currentIndex, correctCount, _sessionSeed, _shuffleCache) is lost on page refresh.
    //   The seeded shuffle is chunk-2-ready (would produce same order IF state persists).
    //   Fix deferred to B22 chunk 2 (GROK-ANALYST G3).
    // KNOWN LIMITATION (chunk 1): iOS PWA back-swipe can race pushState — council accepted this
    //   as chunk-1 ship. Robust fix needs PWA display-mode:standalone + history trap (GROK-ANALYST G4).
    _getShuffleMap(question) {
        const qid = question.id;
        if (this._shuffleCache[qid]) return this._shuffleCache[qid];
        const letters = ['A', 'B', 'C', 'D'].filter(L => question.options[L]);
        const rng = this._seededRandom(`${this._sessionSeed}:${qid}`);
        // Fisher-Yates on copy
        const shuffled = [...letters];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const map = { order: shuffled };
        this._shuffleCache[qid] = map;
        return map;
    },

    // B22 — Navigation lock: push history state, warn on back/forward + beforeunload.
    _lockNavigation() {
        if (this._navLocked) return;
        try { history.pushState({ examActive: true }, '', location.href); } catch (_) { /* no-op for file:// */ }
        this._popstateHandler = (e) => {
            if (!this.active) return;
            // Re-push to block back-navigation; ask user to confirm quit via Quit button instead.
            try { history.pushState({ examActive: true }, '', location.href); } catch (_) {}
            showToast('Use the Quit button to exit the exam (back-button locked in strict mode).', 'warning');
        };
        this._beforeunloadHandler = (e) => {
            if (!this.active) return;
            e.preventDefault();
            e.returnValue = ''; // Required for some browsers to show the dialog
            return '';
        };
        window.addEventListener('popstate', this._popstateHandler);
        window.addEventListener('beforeunload', this._beforeunloadHandler);
        this._navLocked = true;
    },

    _unlockNavigation() {
        if (!this._navLocked) return;
        if (this._popstateHandler) window.removeEventListener('popstate', this._popstateHandler);
        if (this._beforeunloadHandler) window.removeEventListener('beforeunload', this._beforeunloadHandler);
        this._popstateHandler = null;
        this._beforeunloadHandler = null;
        this._navLocked = false;
    },

    // B22 — Page Visibility tracking: log blur/focus events as integrity signal.
    // Does NOT pause timer (council wanted real-exam feel — you can't pause the real thing).
    // Bounded at 100 entries to protect localStorage quota (GROK-ANALYST G5).
    _BLUR_EVENTS_MAX: 100,
    _attachVisibilityTracker() {
        if (this._visibilityHandler) return;
        this._visibilityHandler = () => {
            if (!this.active) return;
            if (this._blurEvents.length >= this._BLUR_EVENTS_MAX) {
                this._blurEvents.shift(); // drop oldest — keep most recent 100
            }
            this._blurEvents.push({
                at: Date.now(),
                state: document.visibilityState,
                questionIndex: this.currentIndex
            });
        };
        document.addEventListener('visibilitychange', this._visibilityHandler);
    },

    _detachVisibilityTracker() {
        if (this._visibilityHandler) {
            document.removeEventListener('visibilitychange', this._visibilityHandler);
            this._visibilityHandler = null;
        }
    },

    // B22 chunk 2 (S45) — Refresh-resume persistence.
    // Persists minimum viable state to sessionStorage so a mid-exam page refresh restores session.
    // Stored: sessionSeed + shuffle cache + currentIndex + startTime + overallRemaining + results.
    // On load, App.init calls Exam.tryResume() which offers the user a resume dialog.
    _persistState() {
        if (!this.active) return;
        try {
            const payload = {
                v: 1,
                at: Date.now(),
                mode: this.mode,
                sessionSeed: this._sessionSeed,
                shuffleCache: this._shuffleCache,
                currentIndex: this.currentIndex,
                correctCount: this.correctCount,
                results: this.results,
                startTime: this.startTime,
                overallRemaining: this._overallRemaining,
                blurEvents: this._blurEvents,
                questionIds: this.questions.map(q => q.id)
            };
            sessionStorage.setItem(this._SESSION_KEY, JSON.stringify(payload));
        } catch (e) {
            // sessionStorage quota exceeded or disabled — non-fatal
            console.warn('[Exam] persist failed:', e && e.message);
        }
    },

    _clearPersistedState() {
        try { sessionStorage.removeItem(this._SESSION_KEY); } catch (_) {}
        if (this._persistTimer) {
            clearInterval(this._persistTimer);
            this._persistTimer = null;
        }
    },

    _readPersistedState() {
        try {
            const raw = sessionStorage.getItem(this._SESSION_KEY);
            if (!raw) return null;
            const p = JSON.parse(raw);
            if (!p || p.v !== 1) return null;
            // Hard cutoff — stale persisted exams auto-discarded
            if (!p.at || (Date.now() - p.at) > this._STALE_MS) {
                this._clearPersistedState();
                return null;
            }
            return p;
        } catch (_) {
            this._clearPersistedState();
            return null;
        }
    },

    // Called from App.init on page load — detect active persisted exam and offer resume.
    // Returns true if resume happened (caller should not navigate to default view).
    tryResume() {
        const p = this._readPersistedState();
        if (!p) return false;
        const answered = p.currentIndex || 0;
        const total = (p.questionIds && p.questionIds.length) || 0;
        if (total === 0 || answered >= total) {
            this._clearPersistedState();
            return false;
        }
        const mins = Math.floor((p.overallRemaining || 0) / 60);
        const secs = (p.overallRemaining || 0) % 60;
        const proceed = confirm(
            `Resume your exam in progress?\n\n` +
            `Question ${answered + 1} of ${total}\n` +
            `Time remaining: ${mins}:${secs.toString().padStart(2, '0')}\n\n` +
            `OK = Resume · Cancel = Discard and start fresh`
        );
        if (!proceed) {
            this._clearPersistedState();
            return false;
        }
        // Restore state
        this.questions = p.questionIds.map(id => getQuestionById(id)).filter(Boolean);
        if (this.questions.length !== total) {
            // Data drift (question bank changed) — can't safely resume
            this._clearPersistedState();
            return false;
        }
        this.mode = p.mode || 'exam';
        this.currentIndex = p.currentIndex || 0;
        this.correctCount = p.correctCount || 0;
        this.results = p.results || [];
        this._sessionSeed = p.sessionSeed;
        this._shuffleCache = p.shuffleCache || {};
        this.startTime = p.startTime || Date.now();
        this._overallRemaining = Math.max(0, p.overallRemaining || 0);
        this._blurEvents = p.blurEvents || [];
        this._timeExpired = false;
        this.active = true;

        // Re-enter exam view
        App.navigate('exam');
        document.getElementById('exam-intro').classList.add('hidden');
        document.getElementById('exam-active').classList.remove('hidden');
        document.getElementById('exam-results').classList.add('hidden');

        // Re-engage strict-mode locks + viewport
        this._lockNavigation();
        this._attachVisibilityTracker();
        this._applyStrictViewport();

        this.setupExamUI();
        this.startOverallTimer();
        this.loadExamQuestion();
        this._startPersistLoop();
        return true;
    },

    _startPersistLoop() {
        if (this._persistTimer) return;
        // Persist every 10s while exam active — cheap and bounds data-loss window
        this._persistTimer = setInterval(() => this._persistState(), 10000);
    },

    // B22 chunk 2 (S45) — Strict mobile viewport.
    // Disables pinch-zoom during exam (matches official strict-mode UX).
    // Restores user's original viewport on exit.
    _applyStrictViewport() {
        try {
            const meta = document.querySelector('meta[name="viewport"]');
            if (!meta) return;
            this._savedViewport = meta.getAttribute('content');
            meta.setAttribute('content',
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
            document.body.classList.add('exam-strict-mode');
        } catch (_) { /* non-fatal */ }
    },

    _releaseStrictViewport() {
        try {
            const meta = document.querySelector('meta[name="viewport"]');
            if (meta && this._savedViewport) {
                meta.setAttribute('content', this._savedViewport);
            }
            this._savedViewport = null;
            document.body.classList.remove('exam-strict-mode');
        } catch (_) { /* non-fatal */ }
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
                // B22 — release strict-mode locks before navigating away
                this._unlockNavigation();
                this._detachVisibilityTracker();
                // B22 chunk 2 — release viewport + clear persistence
                this._releaseStrictViewport();
                this._clearPersistedState();
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
        // B22 — deterministic shuffle: `letters` = original letters in shuffled order (for grading),
        // `displayLabels` = A/B/C/D in visual order (what user sees).
        const shuffleMap = this._getShuffleMap(q);
        const letters = shuffleMap.order;
        const displayLabels = ['A', 'B', 'C', 'D'];
        let examSelected = [];
        this._answered = false;

        // B14 — multi-answer UX: checkbox-style tiles + "Select N" prompt
        const isMulti = q.answerCount > 1;
        optionsContainer.classList.toggle('multi-mode', isMulti);
        optionsContainer.setAttribute('role', isMulti ? 'group' : 'radiogroup');
        let promptEl = document.getElementById('exam-multi-answer-prompt');
        if (!promptEl) {
            promptEl = document.createElement('div');
            promptEl.id = 'exam-multi-answer-prompt';
            promptEl.className = 'multi-answer-prompt';
            optionsContainer.parentElement.insertBefore(promptEl, optionsContainer);
        }
        if (isMulti) {
            promptEl.innerHTML = `<strong>Sélectionnez ${q.answerCount} réponses</strong> <span class="prompt-en">(Select ${q.answerCount} answers)</span>`;
            promptEl.classList.remove('hidden');
        } else {
            promptEl.classList.add('hidden');
            promptEl.innerHTML = '';
        }

        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];            // B22 — ORIGINAL letter (used for grading)
            const displayLabel = displayLabels[i]; // B22 — VISUAL label shown to user (A/B/C/D by position)
            const option = q.options[letter];
            if (!option) continue;

            const tile = document.createElement('div');
            tile.className = 'answer-tile' + (isMulti ? ' multi' : '');
            tile.dataset.letter = letter;          // original letter for correctness check
            tile.dataset.display = displayLabel;   // B22 — display label for CSS/debug
            tile.setAttribute('role', isMulti ? 'checkbox' : 'radio');
            tile.setAttribute('aria-checked', 'false');
            tile.setAttribute('tabindex', '0');
            tile.setAttribute('aria-label',
                `${isMulti ? 'Checkbox' : 'Option'} ${displayLabel}: ${option.fr}`);
            tile.innerHTML = `
                <div class="answer-letter">${displayLabel}</div>
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
        // B22 chunk 2 — persist the "time-up" snapshot so showResults can still fire cleanly
        // (showResults will clear persistence once results are rendered)
        this._persistState();

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
        // B22 — release strict-mode locks; tracker detached before debrief render
        this._unlockNavigation();
        this._detachVisibilityTracker();
        // B22 chunk 2 (S45) — release viewport + clear persistence (exam finished cleanly)
        this._releaseStrictViewport();
        this._clearPersistedState();

        const duration = Math.round((Date.now() - this.startTime) / 1000);
        const isDailyMock = this.mode === 'daily-mock';
        const pct = this.questions.length > 0 ? this.correctCount / this.questions.length : 0;
        const passed = !isDailyMock && this.correctCount >= EXAM_PASS_THRESHOLD;
        // B21 qualitative band (daily-mock only). Per Council C6, no numerical % surfaced.
        const band = this._computeBand(pct);

        // B22 — count tab-blur events (state==='hidden' markers; focus events excluded)
        const blurCount = (this._blurEvents || []).filter(e => e.state === 'hidden').length;

        if (isDailyMock) {
            // B21 — persist daily-mock result (first-of-day counts for band tracking)
            const todayExisting = Storage.getDailyMockForToday();
            if (!todayExisting) {
                // First mock today → record; retakes are allowed but not overwrite
                Storage.saveDailyMock({
                    correct: this.correctCount,
                    total: this.questions.length,
                    band: band.label,
                    lowDataFlag: this._dailyMockLowDataFlag
                });
            }
        } else {
            // Regular mock / practice exam save path (unchanged from B22)
            Storage.saveExamResult({
                correctCount: this.correctCount,
                totalQuestions: this.questions.length,
                passed,
                durationSeconds: duration,
                timeExpired: this._timeExpired,
                results: this.results,
                // B22 integrity
                sessionSeed: this._sessionSeed,
                blurCount: blurCount,
                blurEvents: this._blurEvents
            });
        }

        // Show results view
        document.getElementById('exam-active').classList.add('hidden');
        const resultsDiv = document.getElementById('exam-results');
        resultsDiv.classList.remove('hidden');

        // Score ring animation
        const ring = document.getElementById('results-ring');
        const circumference = 2 * Math.PI * 70;
        setTimeout(() => {
            ring.style.strokeDashoffset = circumference * (1 - pct);
            if (isDailyMock) {
                // B21: amber/green bands (NO red per Council C6 — "Critical Focus" uses amber-deep)
                ring.style.stroke = band.ringColor;
            } else {
                ring.style.stroke = passed ? 'var(--success)' : 'var(--error)';
            }
        }, 100);

        document.getElementById('results-score').textContent = `${this.correctCount}/${this.questions.length}`;

        const verdict = document.getElementById('results-verdict');
        if (isDailyMock) {
            // B21: band label, no pass/fail verdict
            verdict.className = `results-verdict ${band.cssClass}`;
            verdict.textContent = `${band.icon} ${band.label}`;
        } else if (passed) {
            verdict.className = 'results-verdict pass';
            verdict.textContent = '🎉 PASSED!';
        } else {
            verdict.className = 'results-verdict fail';
            verdict.textContent = 'Not yet — keep practicing!';
        }

        // Context
        const context = document.getElementById('results-context');
        if (isDailyMock) {
            // B21: actionable per-band CTA (Gemini C6 pedagogy-refinement)
            // GROK-ANALYST bonus: surface tier label so user trusts the adaptivity
            const tierLabel = {
                'cold-start': 'Random sampling — build more practice data to unlock weak-area targeting.',
                'mixed': 'Mixed sampling (50% weak / 50% random) — adaptivity engaging.',
                'weak-heavy': 'Weak-area-weighted (80% targeted) — fully adaptive.'
            }[this._dailyMockTier] || '';
            if (this._dailyMockLowDataFlag) {
                context.textContent = `${band.cta} (${tierLabel})`;
            } else {
                context.textContent = tierLabel ? `${band.cta} ${tierLabel}` : band.cta;
            }
        } else if (passed) {
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

        // B22 — Integrity badge: tab-blur count during strict-mode exam
        const integrityDiv = document.createElement('div');
        integrityDiv.className = 'exam-integrity-section' + (blurCount > 0 ? ' integrity-flagged' : '');
        if (blurCount === 0) {
            integrityDiv.innerHTML = `
                <h3>🛡️ Integrity</h3>
                <p class="integrity-clean">No distractions detected — strict mode passed. ✓</p>
            `;
        } else {
            integrityDiv.innerHTML = `
                <h3>🛡️ Focus Interruptions</h3>
                <p class="integrity-flagged-text">
                    You switched away from the exam tab <strong>${blurCount}</strong> time${blurCount > 1 ? 's' : ''}.
                    The real exam has no tabs — building focus now pays off on test day.
                </p>
            `;
        }
        timeAnalytics.after(integrityDiv);

        // B22 chunk 2 (S45) — Stress markers: per-question responseMs z-score within session.
        // Requires ≥8 samples before flagging (Council C2 QUALITY); flag z > 2.0 (softer than initial
        // 1.5 to reduce false positives from legit network/device variance). Language is softened.
        const timed = this.results.filter(r => typeof r.timeTaken === 'number' && r.timeTaken > 0);
        if (timed.length >= 8) {
            const times = timed.map(r => r.timeTaken);
            const mean = times.reduce((a, b) => a + b, 0) / times.length;
            const variance = times.reduce((a, b) => a + (b - mean) * (b - mean), 0) / times.length;
            const std = Math.sqrt(variance);
            const Z_THRESHOLD = 2.0;
            const stressed = std > 0
                ? timed.filter(r => ((r.timeTaken - mean) / std) > Z_THRESHOLD)
                : [];
            if (stressed.length > 0) {
                const stressDiv = document.createElement('div');
                stressDiv.className = 'exam-stress-section';
                stressDiv.innerHTML = `
                    <h3>⏳ Hesitation Markers</h3>
                    <p class="stress-intro-text">
                        <strong>${stressed.length} question${stressed.length > 1 ? 's' : ''} took notably longer</strong>
                        than your session average (${Math.round(mean)}s avg, threshold ${Z_THRESHOLD}σ).
                        Normal — or a signal to revisit?
                    </p>
                    <button class="btn btn-secondary btn-sm" id="stress-review-btn">Review these in drills</button>
                `;
                integrityDiv.after(stressDiv);
                // CTA: drop user into drill mode pre-filtered to these Q IDs (Gemini C4)
                const stressBtn = stressDiv.querySelector('#stress-review-btn');
                if (stressBtn) {
                    stressBtn.addEventListener('click', () => {
                        const hesitatedIds = stressed.map(r => r.questionId);
                        try {
                            Practice.sessionType = 'review';
                            Practice.sessionQuestions = hesitatedIds
                                .map(id => getQuestionById(id))
                                .filter(Boolean);
                            Practice.sessionIndex = 0;
                            Practice.sessionCorrect = 0;
                            App.navigate('practice');
                            Practice.loadQuestion();
                        } catch (e) {
                            console.warn('[Exam] stress-review CTA failed:', e && e.message);
                        }
                    });
                }
            }
        }

        // Readiness score (B11)
        const readiness = Storage.getReadinessScore();
        if (readiness !== null) {
            let readinessLabel, readinessClass;
            if (readiness >= 85) { readinessLabel = "You're ready!"; readinessClass = 'readiness-high'; }
            else if (readiness >= 70) { readinessLabel = 'Almost ready!'; readinessClass = 'readiness-mid'; }
            else if (readiness >= 40) { readinessLabel = 'Getting closer!'; readinessClass = 'readiness-low'; }
            else { readinessLabel = 'Keep practicing!'; readinessClass = 'readiness-low'; }

            const readinessDiv = document.createElement('div');
            readinessDiv.className = 'exam-readiness-section';
            readinessDiv.innerHTML = `
                <h3>📊 Exam Readiness</h3>
                <div class="readiness-display ${readinessClass}">
                    <span class="readiness-number">${readiness}</span>
                    <span class="readiness-out-of">/ 100</span>
                </div>
                <p class="readiness-label">${readinessLabel}</p>
            `;
            timeAnalytics.after(readinessDiv);
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
            if (isDailyMock) {
                // B21: from daily-mock results, a "New Exam" press goes home (not back to intro)
                App.navigate('home');
            }
        };
        // B21: adjust button label for daily-mock so "New Exam" reads as "Another Mock"
        const newBtn = document.getElementById('new-exam-btn');
        if (newBtn) {
            newBtn.textContent = isDailyMock ? 'Done' : 'New Exam';
        }

        document.getElementById('exam-home-btn').onclick = () => {
            this.resetExamView();
            App.navigate('home');
        };
    },

    resetExamView() {
        // B22 — defensive: ensure locks are released (covers edge cases where showResults didn't run)
        this._unlockNavigation();
        this._detachVisibilityTracker();
        // B22 chunk 2 — defensive viewport/persistence release
        this._releaseStrictViewport();
        this._clearPersistedState();
        document.getElementById('exam-intro').classList.remove('hidden');
        document.getElementById('exam-active').classList.add('hidden');
        document.getElementById('exam-results').classList.add('hidden');
    },

    // B21 — qualitative band computation (Council C6: no "Urgent" red; amber-deep for bottom).
    //   ≥80%  → On Track       (green)
    //   60-79% → Needs Focus    (amber)
    //   <60%  → Critical Focus  (amber-deep)
    _computeBand(pct) {
        if (pct >= DAILY_MOCK_BAND_GOOD) {
            return {
                label: 'On Track',
                icon: '🎯',
                cssClass: 'band-good',
                ringColor: 'var(--success)',
                cta: 'Great session — keep the daily rhythm. Review any missed questions below.'
            };
        }
        if (pct >= DAILY_MOCK_BAND_MEDIUM) {
            return {
                label: 'Needs Focus',
                icon: '📍',
                cssClass: 'band-medium',
                ringColor: 'var(--warning, #e5a442)',
                cta: 'Solid base — tighten a few areas. Tap "Review Mistakes" to drill today\'s gaps.'
            };
        }
        return {
            label: 'Critical Focus',
            icon: '🔍',
            cssClass: 'band-attention',
            ringColor: 'var(--warning-deep, #c76a2e)',
            cta: 'High-impact practice zone. Review today\'s mistakes, then retry a short drill. You\'ve got time — focused work compounds.'
        };
    }
};
