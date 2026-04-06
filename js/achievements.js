/* ============================================
   Achievements System
   Checks conditions, unlocks badges, renders UI
   ============================================ */

const Achievements = {
    // Check all achievement conditions — called after practice, exam, vocab actions
    checkAll() {
        const newlyUnlocked = [];

        for (const achievement of ACHIEVEMENTS) {
            if (Storage.isAchievementUnlocked(achievement.id)) continue;

            if (this._checkCondition(achievement)) {
                Storage.unlockAchievement(achievement.id);
                newlyUnlocked.push(achievement);
            }
        }

        // Show toast for each new unlock
        for (const a of newlyUnlocked) {
            this._showUnlockToast(a);
        }

        // Check streak milestones for confetti
        const streak = Storage.getStreak();
        if (STREAK_MILESTONES.includes(streak)) {
            const msg = STREAK_MESSAGES[streak];
            if (msg && !sessionStorage.getItem(`streak_celebrated_${streak}`)) {
                sessionStorage.setItem(`streak_celebrated_${streak}`, 'true');
                this._showConfetti(msg.title, msg.msg);
            }
        }

        // Award streak freeze at 7-day milestone
        if (streak > 0 && streak % 7 === 0) {
            const freezeKey = `freeze_awarded_${streak}`;
            if (!sessionStorage.getItem(freezeKey)) {
                sessionStorage.setItem(freezeKey, 'true');
                Storage.addStreakFreeze();
                showToast('Earned a streak freeze! (max 2)', 'success');
            }
        }

        return newlyUnlocked;
    },

    _checkCondition(achievement) {
        switch (achievement.trigger) {
            case 'streak':
                return Storage.getStreak() >= achievement.value;

            case 'attempts':
                return Storage.getAttempts().length >= achievement.value;

            case 'perfect_topic': {
                const mastery = Storage.getTopicMasteryArray();
                return mastery.some(t => t.accuracy === 100 && t.totalAttempts >= achievement.value);
            }

            case 'exams':
                return Storage.getExamResults().length >= achievement.value;

            case 'exam_pass': {
                const passCount = Storage.getExamResults().filter(e => e.passed).length;
                return passCount >= achievement.value;
            }

            case 'perfect_exam':
                return Storage.getExamResults().some(e => e.correctCount === EXAM_TOTAL_QUESTIONS);

            case 'topics_mastered': {
                const mastery = Storage.getTopicMasteryArray();
                const masteredCount = mastery.filter(t =>
                    getMasteryLevel(t.accuracy, t.totalAttempts).id === 'mastered'
                ).length;
                return masteredCount >= achievement.value;
            }

            case 'vocab_learned': {
                const vocab = JSON.parse(localStorage.getItem('fdtta_vocab_memory') || '{}');
                const knownCount = Object.values(vocab).filter(v => v.status === 'known').length;
                return knownCount >= achievement.value;
            }

            case 'vocab_all': {
                const vocab = JSON.parse(localStorage.getItem('fdtta_vocab_memory') || '{}');
                const knownCount = Object.values(vocab).filter(v => v.status === 'known').length;
                // Approximate total vocab count
                return knownCount > 0 && typeof VOCAB_DATA !== 'undefined' &&
                    knownCount >= VOCAB_DATA.length;
            }

            case 'media_attempted': {
                const attempts = Storage.getAttempts();
                const mediaIds = new Set(QUESTION_BANK.filter(q => q.media).map(q => q.id));
                const mediaAttempted = new Set(attempts.filter(a => mediaIds.has(a.questionId)).map(a => a.questionId));
                return mediaAttempted.size >= achievement.value;
            }

            case 'speed_session': {
                // Check if any practice session had 10+ correct in under 3 minutes
                const speedRecords = JSON.parse(localStorage.getItem('fdtta_speed_records') || '[]');
                return speedRecords.some(r => r.correct >= 10 && r.durationSec <= 180);
            }

            default:
                return false;
        }
    },

    _showUnlockToast(achievement) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast achievement-toast success';
        toast.innerHTML = `<span class="achievement-toast-icon">${achievement.icon}</span> <strong>${achievement.title}</strong> unlocked!`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
        Storage.markAchievementNotified(achievement.id);
    },

    _showConfetti(title, message) {
        // Create confetti overlay
        const overlay = document.createElement('div');
        overlay.className = 'confetti-overlay';
        overlay.innerHTML = `
            <div class="confetti-content">
                <div class="confetti-title">${title}</div>
                <div class="confetti-message">${message}</div>
            </div>
            <div class="confetti-particles"></div>
        `;

        // Generate particles
        const particles = overlay.querySelector('.confetti-particles');
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'confetti-particle';
            p.style.left = `${Math.random() * 100}%`;
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.animationDelay = `${Math.random() * 0.5}s`;
            p.style.animationDuration = `${1.5 + Math.random()}s`;
            particles.appendChild(p);
        }

        document.body.appendChild(overlay);
        // Auto-dismiss
        setTimeout(() => overlay.classList.add('confetti-fade'), 2500);
        setTimeout(() => overlay.remove(), 3000);
        overlay.addEventListener('click', () => {
            overlay.classList.add('confetti-fade');
            setTimeout(() => overlay.remove(), 500);
        });
    },

    // Render achievements grid for progress view
    renderSection() {
        const unlocked = Storage.getAchievements();
        const total = ACHIEVEMENTS.length;
        const unlockedCount = Object.keys(unlocked).length;

        const categories = ['streak', 'practice', 'exam', 'mastery'];
        const categoryLabels = { streak: 'Streak', practice: 'Practice', exam: 'Exams', mastery: 'Mastery' };

        let html = `
            <div class="achievements-header">
                <span class="achievements-count">${unlockedCount} / ${total}</span>
                <div class="achievements-progress-bar">
                    <div class="achievements-progress-fill" style="width: ${Math.round((unlockedCount / total) * 100)}%"></div>
                </div>
            </div>`;

        for (const cat of categories) {
            const catAchievements = ACHIEVEMENTS.filter(a => a.category === cat);
            html += `<div class="achievement-category-label">${categoryLabels[cat]}</div>`;
            html += '<div class="achievement-grid">';
            for (const a of catAchievements) {
                const isUnlocked = !!unlocked[a.id];
                const date = isUnlocked ? new Date(unlocked[a.id].unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
                html += `
                    <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" title="${a.desc}">
                        <div class="achievement-icon">${isUnlocked ? a.icon : '🔒'}</div>
                        <div class="achievement-title">${a.title}</div>
                        <div class="achievement-desc">${a.desc}</div>
                        ${isUnlocked ? `<div class="achievement-date">${date}</div>` : ''}
                    </div>`;
            }
            html += '</div>';
        }

        return html;
    }
};
