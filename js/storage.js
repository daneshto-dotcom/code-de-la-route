/* ============================================
   Local Storage Manager
   All progress persisted in localStorage
   ============================================ */

const Storage = {
    KEYS: {
        ATTEMPTS: 'fdtta_attempts',
        TOPIC_MASTERY: 'fdtta_topic_mastery',
        EXAM_RESULTS: 'fdtta_exam_results',
        SETTINGS: 'fdtta_settings',
        FIRST_LAUNCH: 'fdtta_first_launch_complete',
        REVIEW_SCHEDULE: 'fdtta_review_schedule',
        BOOKMARKS: 'fdtta_bookmarks',
        STUDY_STREAK: 'fdtta_study_streak',
        LAST_STUDY_DATE: 'fdtta_last_study_date',
        VOCAB_MEMORY: 'fdtta_vocab_memory',
        DIAGNOSTIC_RESULT: 'fdtta_diagnostic_result',
        SIGN_PROGRESS: 'fdtta_sign_progress'
    },

    MAX_ATTEMPTS: 5000, // prune beyond this to prevent quota exhaustion

    // Safe localStorage write — catches QuotaExceededError
    _safeSet(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                // Try to free space by pruning old attempts
                this._pruneAttempts();
                try {
                    localStorage.setItem(key, value);
                    return true;
                } catch (e2) {
                    console.error('localStorage full even after pruning:', e2);
                    if (typeof showToast === 'function') {
                        showToast('Storage full — some data may not be saved.', 'error');
                    }
                    return false;
                }
            }
            console.error('localStorage write failed:', e);
            return false;
        }
    },

    _pruneAttempts() {
        const attempts = this.getAttempts();
        if (attempts.length > 1000) {
            // Keep only the most recent 1000 attempts
            const pruned = attempts.slice(-1000);
            try {
                localStorage.setItem(this.KEYS.ATTEMPTS, JSON.stringify(pruned));
            } catch (e) { /* last resort fallback */ }
        }
    },

    // === ATTEMPTS ===
    getAttempts() {
        return JSON.parse(localStorage.getItem(this.KEYS.ATTEMPTS) || '[]');
    },

    saveAttempt(attempt) {
        const attempts = this.getAttempts();
        attempts.push({
            ...attempt,
            timestamp: Date.now()
        });
        // Prune if exceeding max to prevent unbounded growth
        if (attempts.length > this.MAX_ATTEMPTS) {
            attempts.splice(0, attempts.length - this.MAX_ATTEMPTS);
        }
        this._safeSet(this.KEYS.ATTEMPTS, JSON.stringify(attempts));
        this.updateTopicMastery(attempt.topic, attempt.isCorrect);
        this.updateStreak();
        return attempts;
    },

    getAttemptsByQuestion(questionId) {
        return this.getAttempts().filter(a => a.questionId === questionId);
    },

    getAttemptsByTopic(topicId) {
        return this.getAttempts().filter(a => a.topic === topicId);
    },

    getRecentAttempts(count = 50) {
        const attempts = this.getAttempts();
        return attempts.slice(-count);
    },

    // === TOPIC MASTERY ===
    getTopicMastery() {
        const stored = JSON.parse(localStorage.getItem(this.KEYS.TOPIC_MASTERY) || '{}');
        // Ensure all topics exist
        const mastery = {};
        for (const topic of ETG_TOPICS) {
            mastery[topic.id] = stored[topic.id] || {
                topic: topic.id,
                totalAttempts: 0,
                correctAttempts: 0,
                accuracy: 0,
                lastPracticedAt: null,
                recentResults: [] // rolling last 50
            };
        }
        return mastery;
    },

    updateTopicMastery(topicId, isCorrect) {
        const mastery = this.getTopicMastery();
        const tm = mastery[topicId];
        tm.totalAttempts++;
        if (isCorrect) tm.correctAttempts++;
        tm.recentResults.push(isCorrect ? 1 : 0);
        if (tm.recentResults.length > 50) tm.recentResults.shift();
        // Calculate rolling accuracy
        const sum = tm.recentResults.reduce((a, b) => a + b, 0);
        tm.accuracy = Math.round((sum / tm.recentResults.length) * 100);
        tm.lastPracticedAt = Date.now();
        this._safeSet(this.KEYS.TOPIC_MASTERY, JSON.stringify(mastery));
    },

    getTopicMasteryArray() {
        const mastery = this.getTopicMastery();
        return ETG_TOPICS.map(topic => ({
            ...topic,
            ...mastery[topic.id]
        }));
    },

    // === REVIEW SCHEDULE (Spaced Repetition) ===
    getReviewSchedule() {
        return JSON.parse(localStorage.getItem(this.KEYS.REVIEW_SCHEDULE) || '{}');
    },

    scheduleForReview(questionId, isCorrect, confidence) {
        const schedule = this.getReviewSchedule();
        const now = Date.now();
        const HOUR = 3600000;
        const DAY = 86400000;

        if (!schedule[questionId]) {
            // First time wrong or guessed-correct
            if (!isCorrect || confidence === 1) {
                schedule[questionId] = {
                    nextReviewAt: now + 4 * HOUR,
                    intervalHours: 4,
                    easeFactor: 2.5,
                    consecutiveCorrect: 0,
                    totalReviews: 0,
                    status: 'active'
                };
            }
        } else {
            const entry = schedule[questionId];
            entry.totalReviews++;

            if (isCorrect && confidence >= 2) {
                entry.consecutiveCorrect++;
                if (entry.consecutiveCorrect === 1) {
                    entry.intervalHours = 24;
                } else if (entry.consecutiveCorrect === 2) {
                    entry.intervalHours = 72;
                } else {
                    entry.intervalHours = entry.intervalHours * entry.easeFactor;
                }
                entry.easeFactor = Math.max(1.3, entry.easeFactor + 0.1);
                entry.nextReviewAt = now + entry.intervalHours * HOUR;

                // Graduation check
                if (entry.consecutiveCorrect >= 4 && entry.intervalHours >= 336 && entry.totalReviews >= 5) {
                    entry.status = 'graduated';
                }
            } else {
                // Wrong or guessed
                entry.consecutiveCorrect = 0;
                entry.intervalHours = 4;
                entry.easeFactor = Math.max(1.3, entry.easeFactor - 0.2);
                entry.nextReviewAt = now + 4 * HOUR;
                if (entry.status === 'graduated') {
                    entry.status = 'active';
                    entry.easeFactor = Math.max(1.3, entry.easeFactor - 0.3);
                }
            }
        }

        this._safeSet(this.KEYS.REVIEW_SCHEDULE, JSON.stringify(schedule));
    },

    getDueReviews() {
        const schedule = this.getReviewSchedule();
        const now = Date.now();
        return Object.entries(schedule)
            .filter(([_, entry]) => entry.status === 'active' && entry.nextReviewAt <= now)
            .map(([questionId, entry]) => ({ questionId, ...entry }));
    },

    getActiveReviewCount() {
        const schedule = this.getReviewSchedule();
        return Object.values(schedule).filter(e => e.status === 'active').length;
    },

    // === EXAM RESULTS ===
    getExamResults() {
        return JSON.parse(localStorage.getItem(this.KEYS.EXAM_RESULTS) || '[]');
    },

    saveExamResult(result) {
        const results = this.getExamResults();
        results.push({
            ...result,
            timestamp: Date.now()
        });
        this._safeSet(this.KEYS.EXAM_RESULTS, JSON.stringify(results));
    },

    // === BOOKMARKS ===
    getBookmarks() {
        return JSON.parse(localStorage.getItem(this.KEYS.BOOKMARKS) || '[]');
    },

    toggleBookmark(questionId) {
        const bookmarks = this.getBookmarks();
        const idx = bookmarks.indexOf(questionId);
        if (idx >= 0) {
            bookmarks.splice(idx, 1);
        } else {
            bookmarks.push(questionId);
        }
        this._safeSet(this.KEYS.BOOKMARKS, JSON.stringify(bookmarks));
        return bookmarks.includes(questionId);
    },

    isBookmarked(questionId) {
        return this.getBookmarks().includes(questionId);
    },

    // === STUDY STREAK ===
    updateStreak() {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem(this.KEYS.LAST_STUDY_DATE);
        let streak = parseInt(localStorage.getItem(this.KEYS.STUDY_STREAK) || '0');

        if (lastDate === today) return streak; // Already studied today

        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastDate === yesterday) {
            streak++;
        } else if (lastDate !== today) {
            streak = 1; // Reset streak
        }

        this._safeSet(this.KEYS.STUDY_STREAK, streak.toString());
        this._safeSet(this.KEYS.LAST_STUDY_DATE, today);
        return streak;
    },

    getStreak() {
        const lastDate = localStorage.getItem(this.KEYS.LAST_STUDY_DATE);
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (!lastDate || (lastDate !== today && lastDate !== yesterday)) {
            return 0;
        }
        return parseInt(localStorage.getItem(this.KEYS.STUDY_STREAK) || '0');
    },

    // === SETTINGS ===
    getSettings() {
        return JSON.parse(localStorage.getItem(this.KEYS.SETTINGS) || JSON.stringify({
            showEnglish: true,
            ttsEnabled: true,
            ttsSpeed: 1.0,
            examDate: null,
            confidenceEnabled: true
        }));
    },

    saveSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        this._safeSet(this.KEYS.SETTINGS, JSON.stringify(settings));
    },

    isFirstLaunch() {
        return !localStorage.getItem(this.KEYS.FIRST_LAUNCH);
    },

    completeFirstLaunch() {
        this._safeSet(this.KEYS.FIRST_LAUNCH, 'true');
    },

    // === DIAGNOSTIC ===
    getDiagnosticResult() {
        return JSON.parse(localStorage.getItem(this.KEYS.DIAGNOSTIC_RESULT) || 'null');
    },

    saveDiagnosticResult(result) {
        this._safeSet(this.KEYS.DIAGNOSTIC_RESULT, JSON.stringify({
            ...result,
            timestamp: Date.now()
        }));
    },

    hasDiagnostic() {
        return localStorage.getItem(this.KEYS.DIAGNOSTIC_RESULT) !== null;
    },

    // === READINESS SCORE ===
    getReadinessScore() {
        const mastery = this.getTopicMasteryArray();
        const attempts = this.getAttempts();
        const exams = this.getExamResults();
        const reviews = this.getReviewSchedule();

        if (attempts.length < 20) return null; // Not enough data

        // 40% Topic Mastery: % of topics at Competent+ (accuracy >= 70%)
        const competentTopics = mastery.filter(t => t.accuracy >= 70 && t.totalAttempts >= 5).length;
        const topicScore = (competentTopics / 10) * 100;

        // 30% Exam Performance
        let examScore = 0;
        if (exams.length > 0) {
            const recentExams = exams.slice(-3);
            const avgScore = recentExams.reduce((sum, e) => sum + e.correctCount, 0) / recentExams.length;
            examScore = (avgScore / EXAM_TOTAL_QUESTIONS) * 100;
        }

        // 20% Mistake Clearance
        const totalReviewed = Object.keys(reviews).length;
        const graduated = Object.values(reviews).filter(r => r.status === 'graduated').length;
        const clearanceScore = totalReviewed > 0 ? (graduated / totalReviewed) * 100 : 50;

        // 10% Coverage
        const attempted = new Set(attempts.map(a => a.questionId)).size;
        const coverageScore = Math.min(100, (attempted / QUESTION_BANK.length) * 100);

        // Composite
        let score;
        if (exams.length === 0) {
            // No exams yet — redistribute exam weight
            score = (topicScore * 0.55) + (clearanceScore * 0.3) + (coverageScore * 0.15);
        } else {
            score = (topicScore * 0.4) + (examScore * 0.3) + (clearanceScore * 0.2) + (coverageScore * 0.1);
        }

        return Math.round(Math.min(100, Math.max(0, score)));
    },

    // === OVERALL STATS ===
    getOverallStats() {
        const attempts = this.getAttempts();
        const correct = attempts.filter(a => a.isCorrect).length;
        return {
            total: attempts.length,
            correct,
            accuracy: attempts.length > 0 ? Math.round((correct / attempts.length) * 100) : 0,
            streak: this.getStreak(),
            exams: this.getExamResults().length,
            reviewsDue: this.getDueReviews().length,
            activeReviews: this.getActiveReviewCount()
        };
    },

    // === DATA EXPORT / IMPORT ===
    exportData() {
        const data = {
            version: 2,
            exportDate: new Date().toISOString(),
            attempts: this.getAttempts(),
            topicMastery: this.getTopicMastery(),
            examResults: this.getExamResults(),
            reviewSchedule: this.getReviewSchedule(),
            bookmarks: this.getBookmarks(),
            settings: this.getSettings(),
            streak: this.getStreak(),
            lastStudyDate: localStorage.getItem(this.KEYS.LAST_STUDY_DATE),
            diagnosticResult: this.getDiagnosticResult(),
            signProgress: JSON.parse(localStorage.getItem(this.KEYS.SIGN_PROGRESS) || '{}'),
            vocabMemory: JSON.parse(localStorage.getItem(this.KEYS.VOCAB_MEMORY) || '{}')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code-de-la-route-backup-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.version !== 1 && data.version !== 2) throw new Error('Incompatible backup version');
            if (data.attempts) this._safeSet(this.KEYS.ATTEMPTS, JSON.stringify(data.attempts));
            if (data.topicMastery) this._safeSet(this.KEYS.TOPIC_MASTERY, JSON.stringify(data.topicMastery));
            if (data.examResults) this._safeSet(this.KEYS.EXAM_RESULTS, JSON.stringify(data.examResults));
            if (data.reviewSchedule) this._safeSet(this.KEYS.REVIEW_SCHEDULE, JSON.stringify(data.reviewSchedule));
            if (data.bookmarks) this._safeSet(this.KEYS.BOOKMARKS, JSON.stringify(data.bookmarks));
            if (data.settings) this._safeSet(this.KEYS.SETTINGS, JSON.stringify(data.settings));
            if (data.streak) this._safeSet(this.KEYS.STUDY_STREAK, data.streak.toString());
            if (data.lastStudyDate) this._safeSet(this.KEYS.LAST_STUDY_DATE, data.lastStudyDate);
            if (data.diagnosticResult) this._safeSet(this.KEYS.DIAGNOSTIC_RESULT, JSON.stringify(data.diagnosticResult));
            if (data.signProgress) this._safeSet(this.KEYS.SIGN_PROGRESS, JSON.stringify(data.signProgress));
            if (data.vocabMemory) this._safeSet(this.KEYS.VOCAB_MEMORY, JSON.stringify(data.vocabMemory));
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    },

    resetAll() {
        Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
    }
};
