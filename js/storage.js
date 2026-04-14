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
        SIGN_PROGRESS: 'fdtta_sign_progress',
        BEST_STREAK: 'fdtta_best_streak',
        ACHIEVEMENTS: 'fdtta_achievements',
        DAILY_CHALLENGE: 'fdtta_daily_challenge',
        STREAK_FREEZES: 'fdtta_streak_freezes',
        CUSTOM_PRACTICE: 'fdtta_custom_practice',
        USER_RATING: 'fdtta_user_rating',
        QUESTION_DIFFICULTY: 'fdtta_question_difficulty'
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
        // Trigger gamification checks (if modules loaded)
        if (typeof Achievements !== 'undefined') Achievements.checkAll();
        if (typeof Challenges !== 'undefined') Challenges.updateProgress();
        // Recalculate smart notification timers (streak status may have changed)
        if (typeof Notifications !== 'undefined') Notifications.scheduleSmartReminders();
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

    // === FOCUS AREAS (B03 analytics v1) ===
    // Most-missed questions: aggregate attempts, rank by errorRate desc
    // sinceMs defaults to 30 days. minAttempts filters one-offs.
    getMostMissedQuestions(limit = 10, minAttempts = 2, sinceMs = 90 * 86400000) {
        const cutoff = Date.now() - sinceMs;
        const attempts = this.getAttempts().filter(a => (a.timestamp || 0) >= cutoff && a.sessionType !== 'exam');
        const byQ = {};
        for (const a of attempts) {
            if (!a.questionId) continue;
            if (!byQ[a.questionId]) byQ[a.questionId] = { questionId: a.questionId, topic: a.topic, attempts: 0, wrongs: 0 };
            byQ[a.questionId].attempts++;
            if (!a.isCorrect) byQ[a.questionId].wrongs++;
        }
        const list = Object.values(byQ)
            .filter(r => r.attempts >= minAttempts && r.wrongs > 0)
            .map(r => ({
                ...r,
                errorRate: r.attempts > 0 ? r.wrongs / r.attempts : 0
            }))
            .sort((a, b) => b.errorRate - a.errorRate || b.attempts - a.attempts);
        return list.slice(0, limit);
    },

    // Weakest topics: topics with lowest accuracy, filtered by minAttempts
    getWeakestTopics(n = 3, minAttempts = 5, sinceMs = 90 * 86400000) {
        const cutoff = Date.now() - sinceMs;
        const attempts = this.getAttempts().filter(a => (a.timestamp || 0) >= cutoff && a.sessionType !== 'exam');
        const byTopic = {};
        for (const a of attempts) {
            if (!a.topic) continue;
            if (!byTopic[a.topic]) byTopic[a.topic] = { topic: a.topic, attempts: 0, correct: 0 };
            byTopic[a.topic].attempts++;
            if (a.isCorrect) byTopic[a.topic].correct++;
        }
        const list = Object.values(byTopic)
            .filter(r => r.attempts >= minAttempts)
            .map(r => ({
                ...r,
                accuracy: r.attempts > 0 ? r.correct / r.attempts : 0
            }))
            .sort((a, b) => a.accuracy - b.accuracy);
        return list.slice(0, n);
    },

    // Combined API for future B04 adaptive practice consumer
    getFocusAreas(sinceMs = 90 * 86400000) {
        const cutoff = Date.now() - sinceMs;
        const attempts = this.getAttempts().filter(a => (a.timestamp || 0) >= cutoff && a.sessionType !== 'exam');
        const withMs = attempts.filter(a => typeof a.responseMs === 'number' && a.responseMs > 0);
        const avgResponseMs = withMs.length > 0
            ? Math.round(withMs.reduce((s, a) => s + a.responseMs, 0) / withMs.length)
            : null;
        return {
            version: 1,
            totalAttempts: attempts.length,
            weakTopics: this.getWeakestTopics(3, 5, sinceMs),
            mostMissed: this.getMostMissedQuestions(10, 2, sinceMs),
            avgResponseMs: avgResponseMs,
            sinceMs: sinceMs
        };
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

    // === ELO DIFFICULTY SYSTEM ===
    getUserRating() {
        return parseFloat(localStorage.getItem(this.KEYS.USER_RATING) || '1500');
    },

    _setUserRating(rating) {
        this._safeSet(this.KEYS.USER_RATING, Math.round(rating).toString());
    },

    getQuestionDifficulty() {
        return JSON.parse(localStorage.getItem(this.KEYS.QUESTION_DIFFICULTY) || '{}');
    },

    getQuestionDifficultyRating(questionId) {
        const diff = this.getQuestionDifficulty();
        return diff[questionId] || 1500;
    },

    _updateElo(questionId, isCorrect, responseMs) {
        const userRating = this.getUserRating();
        const diff = this.getQuestionDifficulty();
        const qRating = diff[questionId] || 1500;
        const qReviews = (diff[questionId + '_n'] || 0);

        // K-factor: decays from 32 to 16 after 20 reviews
        const K = qReviews < 20 ? 32 : 16;

        // Expected score (probability user answers correctly)
        const expected = 1 / (1 + Math.pow(10, (qRating - userRating) / 400));

        const actual = isCorrect ? 1 : 0;
        const delta = K * (actual - expected);

        // Update user rating
        this._setUserRating(userRating + delta);

        // Update question difficulty (inverse: if user got it right, question gets easier)
        diff[questionId] = Math.max(800, Math.min(2200, qRating - delta));
        diff[questionId + '_n'] = qReviews + 1;
        this._safeSet(this.KEYS.QUESTION_DIFFICULTY, JSON.stringify(diff));

        return { userRating: userRating + delta, qRating: diff[questionId], expected };
    },

    // === REVIEW SCHEDULE (ELO-Enhanced Spaced Repetition) ===
    getReviewSchedule() {
        return JSON.parse(localStorage.getItem(this.KEYS.REVIEW_SCHEDULE) || '{}');
    },

    scheduleForReview(questionId, isCorrect, confidence, responseMs) {
        const schedule = this.getReviewSchedule();
        const now = Date.now();
        const HOUR = 3600000;
        const MIN_INTERVAL = 1;    // 1 hour minimum
        const MAX_INTERVAL = 720;  // 30 days maximum

        // Update ELO ratings
        this._updateElo(questionId, isCorrect, responseMs);
        const qDifficulty = this.getQuestionDifficultyRating(questionId);

        // Difficulty multiplier: harder questions (>1600) get shorter intervals
        const diffMultiplier = qDifficulty > 1600 ? 0.8 :
                               qDifficulty < 1400 ? 1.2 : 1.0;

        // Response time weight for ease adjustment
        // Slow correct = less confident = smaller ease bump
        const rtWeight = responseMs > 0 ? Math.max(0.5, Math.min(1.5, 8000 / responseMs)) : 1.0;

        if (!schedule[questionId]) {
            if (!isCorrect || confidence === 1) {
                schedule[questionId] = {
                    nextReviewAt: now + 4 * HOUR,
                    intervalHours: 4,
                    easeFactor: 2.5,
                    consecutiveCorrect: 0,
                    totalReviews: 0,
                    status: 'active',
                    schemaVersion: 2
                };
            }
        } else {
            const entry = schedule[questionId];
            entry.totalReviews++;
            if (!entry.schemaVersion) entry.schemaVersion = 2;

            if (isCorrect && confidence >= 2) {
                entry.consecutiveCorrect++;
                if (entry.consecutiveCorrect === 1) {
                    entry.intervalHours = 24 * diffMultiplier;
                } else if (entry.consecutiveCorrect === 2) {
                    entry.intervalHours = 72 * diffMultiplier;
                } else {
                    entry.intervalHours = entry.intervalHours * entry.easeFactor * diffMultiplier;
                }
                // Ease bump weighted by response time
                entry.easeFactor = Math.max(1.3, entry.easeFactor + 0.1 * rtWeight);

                // Clamp interval
                entry.intervalHours = Math.max(MIN_INTERVAL, Math.min(MAX_INTERVAL, entry.intervalHours));
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
        // Trigger gamification checks (if modules loaded)
        if (typeof Achievements !== 'undefined') Achievements.checkAll();
        if (typeof Challenges !== 'undefined') Challenges.updateProgress();
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
        // Update best streak if current exceeds it
        const best = parseInt(localStorage.getItem(this.KEYS.BEST_STREAK) || '0');
        if (streak > best) {
            this._safeSet(this.KEYS.BEST_STREAK, streak.toString());
        }
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

    getBestStreak() {
        return parseInt(localStorage.getItem(this.KEYS.BEST_STREAK) || '0');
    },

    // Build a map of date -> attempt count for the last N days
    getDailyActivityMap(days = 30) {
        const attempts = this.getAttempts();
        const map = {};
        const now = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            map[d.toDateString()] = { total: 0, correct: 0 };
        }
        for (const a of attempts) {
            if (!a.timestamp) continue;
            const key = new Date(a.timestamp).toDateString();
            if (map[key]) {
                map[key].total++;
                if (a.isCorrect) map[key].correct++;
            }
        }
        return map;
    },

    getTotalPracticeDays() {
        const attempts = this.getAttempts();
        const days = new Set();
        for (const a of attempts) {
            if (a.timestamp) days.add(new Date(a.timestamp).toDateString());
        }
        return days.size;
    },

    // === SETTINGS ===
    getSettings() {
        return JSON.parse(localStorage.getItem(this.KEYS.SETTINGS) || JSON.stringify({
            showEnglish: true,
            ttsEnabled: true,
            ttsSpeed: 1.0,
            examDate: null,
            confidenceEnabled: true,
            practiceTimerEnabled: false,
            practiceTimerSeconds: 20
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

    // === ACHIEVEMENTS ===
    getAchievements() {
        return JSON.parse(localStorage.getItem(this.KEYS.ACHIEVEMENTS) || '{}');
    },

    unlockAchievement(id) {
        const achievements = this.getAchievements();
        if (achievements[id]) return false; // Already unlocked
        achievements[id] = { unlockedAt: Date.now(), notified: false };
        this._safeSet(this.KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
        return true;
    },

    isAchievementUnlocked(id) {
        return !!this.getAchievements()[id];
    },

    markAchievementNotified(id) {
        const achievements = this.getAchievements();
        if (achievements[id]) {
            achievements[id].notified = true;
            this._safeSet(this.KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
        }
    },

    getUnlockedCount() {
        return Object.keys(this.getAchievements()).length;
    },

    // === DAILY CHALLENGE ===
    getDailyChallenge() {
        const stored = JSON.parse(localStorage.getItem(this.KEYS.DAILY_CHALLENGE) || 'null');
        const today = new Date().toISOString().slice(0, 10);
        if (stored && stored.date === today) return stored;
        return null; // Expired or not set
    },

    saveDailyChallenge(challenge) {
        this._safeSet(this.KEYS.DAILY_CHALLENGE, JSON.stringify(challenge));
    },

    // === STREAK FREEZES ===
    getStreakFreezes() {
        return parseInt(localStorage.getItem(this.KEYS.STREAK_FREEZES) || '0');
    },

    addStreakFreeze() {
        const current = this.getStreakFreezes();
        if (current < 2) {
            this._safeSet(this.KEYS.STREAK_FREEZES, (current + 1).toString());
        }
    },

    useStreakFreeze() {
        const current = this.getStreakFreezes();
        if (current > 0) {
            this._safeSet(this.KEYS.STREAK_FREEZES, (current - 1).toString());
            return true;
        }
        return false;
    },

    // === CUSTOM PRACTICE PREFERENCES ===
    getCustomPracticePrefs() {
        return JSON.parse(localStorage.getItem(this.KEYS.CUSTOM_PRACTICE) || 'null');
    },

    saveCustomPracticePrefs(prefs) {
        this._safeSet(this.KEYS.CUSTOM_PRACTICE, JSON.stringify(prefs));
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
            bestStreak: this.getBestStreak(),
            lastStudyDate: localStorage.getItem(this.KEYS.LAST_STUDY_DATE),
            diagnosticResult: this.getDiagnosticResult(),
            signProgress: JSON.parse(localStorage.getItem(this.KEYS.SIGN_PROGRESS) || '{}'),
            vocabMemory: JSON.parse(localStorage.getItem(this.KEYS.VOCAB_MEMORY) || '{}'),
            achievements: this.getAchievements(),
            dailyChallenge: this.getDailyChallenge(),
            streakFreezes: this.getStreakFreezes()
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
            if (data.bestStreak) this._safeSet(this.KEYS.BEST_STREAK, data.bestStreak.toString());
            if (data.lastStudyDate) this._safeSet(this.KEYS.LAST_STUDY_DATE, data.lastStudyDate);
            if (data.diagnosticResult) this._safeSet(this.KEYS.DIAGNOSTIC_RESULT, JSON.stringify(data.diagnosticResult));
            if (data.signProgress) this._safeSet(this.KEYS.SIGN_PROGRESS, JSON.stringify(data.signProgress));
            if (data.vocabMemory) this._safeSet(this.KEYS.VOCAB_MEMORY, JSON.stringify(data.vocabMemory));
            if (data.achievements) this._safeSet(this.KEYS.ACHIEVEMENTS, JSON.stringify(data.achievements));
            if (data.dailyChallenge) this._safeSet(this.KEYS.DAILY_CHALLENGE, JSON.stringify(data.dailyChallenge));
            if (data.streakFreezes) this._safeSet(this.KEYS.STREAK_FREEZES, data.streakFreezes.toString());
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
