/* ============================================
   Daily Challenges
   One challenge per day, deterministic from date
   ============================================ */

const Challenges = {
    // Get or generate today's challenge
    getToday() {
        let challenge = Storage.getDailyChallenge();
        if (challenge) return challenge;

        // Generate new challenge from date seed
        challenge = this._generate();
        Storage.saveDailyChallenge(challenge);
        return challenge;
    },

    _generate() {
        const today = new Date().toISOString().slice(0, 10);
        // Simple hash from date string for deterministic selection
        let seed = 0;
        for (let i = 0; i < today.length; i++) {
            seed = ((seed << 5) - seed + today.charCodeAt(i)) | 0;
        }
        seed = Math.abs(seed);

        const typeIndex = seed % CHALLENGE_TYPES.length;
        const type = CHALLENGE_TYPES[typeIndex];

        let desc = type.desc;
        let topicId = null;

        // If challenge needs a topic, pick one deterministically
        if (type.track === 'correct_topic_today') {
            const topicIndex = (seed >> 4) % ETG_TOPICS.length;
            const topic = ETG_TOPICS[topicIndex];
            desc = desc.replace('{topic}', topic.nameEn);
            topicId = topic.id;
        }

        return {
            date: today,
            typeId: type.id,
            desc: desc,
            target: type.target,
            track: type.track,
            topicId: topicId,
            progress: 0,
            completed: false
        };
    },

    // Update challenge progress — called after practice/exam/vocab actions
    updateProgress() {
        const challenge = this.getToday();
        if (challenge.completed) return challenge;

        const today = new Date().toISOString().slice(0, 10);
        const attempts = Storage.getAttempts();
        const todayAttempts = attempts.filter(a => {
            if (!a.timestamp) return false;
            return new Date(a.timestamp).toISOString().slice(0, 10) === today;
        });

        let progress = 0;

        switch (challenge.track) {
            case 'attempts_today':
                progress = todayAttempts.length;
                break;

            case 'correct_topic_today':
                progress = todayAttempts.filter(a => a.isCorrect && a.topic === challenge.topicId).length;
                break;

            case 'vocab_today': {
                // Count vocab reviews done today from vocab memory timestamps
                const vocab = JSON.parse(localStorage.getItem('fdtta_vocab_memory') || '{}');
                progress = Object.values(vocab).filter(v => {
                    if (!v.lastReviewed) return false;
                    return new Date(v.lastReviewed).toISOString().slice(0, 10) === today;
                }).length;
                break;
            }

            case 'exams_today': {
                const exams = Storage.getExamResults();
                progress = exams.filter(e => {
                    return new Date(e.timestamp).toISOString().slice(0, 10) === today;
                }).length;
                break;
            }

            case 'accuracy_today': {
                if (todayAttempts.length >= 10) {
                    const correct = todayAttempts.filter(a => a.isCorrect).length;
                    progress = Math.round((correct / todayAttempts.length) * 100);
                }
                break;
            }

            case 'streak_extended':
                progress = Storage.getStreak() > 0 ? 1 : 0;
                break;

            case 'timed_correct_today': {
                // Check speed records from today
                const records = JSON.parse(localStorage.getItem('fdtta_speed_records') || '[]');
                const todayRecords = records.filter(r => r.date && r.date.slice(0, 10) === today);
                progress = todayRecords.reduce((max, r) => Math.max(max, r.correct), 0);
                break;
            }
        }

        challenge.progress = progress;

        const wasCompleted = challenge.completed;
        challenge.completed = progress >= challenge.target;
        Storage.saveDailyChallenge(challenge);

        // Show celebration on first completion
        if (challenge.completed && !wasCompleted) {
            this._showCompletion(challenge);
        }

        return challenge;
    },

    _showCompletion(challenge) {
        showToast(`Challenge complete: ${challenge.desc}`, 'success');
    },

    // Render challenge card for home view
    renderCard() {
        const challenge = this.getToday();
        const pct = Math.min(100, Math.round((challenge.progress / challenge.target) * 100));
        const isComplete = challenge.completed;

        return `
            <div class="challenge-card ${isComplete ? 'challenge-complete' : ''}">
                <div class="challenge-header">
                    <span class="challenge-label">Daily Challenge</span>
                    ${isComplete ? '<span class="challenge-badge">Done!</span>' : ''}
                </div>
                <div class="challenge-desc">${challenge.desc}</div>
                <div class="challenge-progress-row">
                    <div class="challenge-progress-bar">
                        <div class="challenge-progress-fill" style="width: ${pct}%"></div>
                    </div>
                    <span class="challenge-progress-text">${challenge.progress}/${challenge.target}</span>
                </div>
            </div>`;
    }
};
