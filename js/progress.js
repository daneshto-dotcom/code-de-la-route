/* ============================================
   Progress & Mastery Dashboard
   ============================================ */

const Progress = {
    render() {
        const stats = Storage.getOverallStats();
        const mastery = Storage.getTopicMasteryArray();
        const exams = Storage.getExamResults();

        // Header stats
        document.getElementById('progress-total').textContent = stats.total;
        document.getElementById('progress-accuracy').textContent = `${stats.accuracy}%`;
        document.getElementById('progress-exams').textContent = exams.length;

        // Mastery list
        this.renderMasteryList(mastery);

        // Exam history
        this.renderExamHistory(exams);

        // Spaced repetition analytics
        this.renderSRAnalytics();

        // Study activity (last 7 days)
        this.renderStudyActivity();
    },

    renderMasteryList(mastery) {
        const list = document.getElementById('mastery-list');
        list.innerHTML = '';

        mastery.sort((a, b) => a.accuracy - b.accuracy); // Weakest first

        for (const topic of mastery) {
            const level = getMasteryLevel(topic.accuracy, topic.totalAttempts);
            const color = level.color;

            const item = document.createElement('div');
            item.className = 'mastery-item';
            item.innerHTML = `
                <div class="mastery-icon">
                    <span>${topic.icon}</span>
                </div>
                <div class="mastery-info">
                    <div class="mastery-name">${topic.nameEn}</div>
                    <div class="mastery-name-fr">${topic.nameFr}</div>
                    <div class="mastery-bar-container">
                        <div class="mastery-bar-fill" style="width: ${topic.accuracy}%; background: ${color};"></div>
                    </div>
                </div>
                <div class="mastery-score">
                    <div class="mastery-accuracy" style="color: ${color};">${topic.accuracy}%</div>
                    <span class="mastery-level-badge ${level.id}">${level.label}</span>
                </div>
            `;

            // Click to drill
            const topicQuestionCount = getQuestionsByTopic(topic.id || topic.topic).length;
            item.style.cursor = 'pointer';
            item.title = `${topicQuestionCount} questions — click to drill`;
            item.addEventListener('click', () => {
                Practice.startSession('drill', { topicFilter: topic.id || topic.topic, count: topicQuestionCount });
                App.navigate('practice');
            });

            list.appendChild(item);
        }
    },

    renderExamHistory(exams) {
        const list = document.getElementById('exam-history-list');
        if (exams.length === 0) {
            list.innerHTML = '<p class="empty-state">No mock exams taken yet. Take one to track your progress!</p>';
            return;
        }

        list.innerHTML = '';
        [...exams].reverse().forEach((exam) => {
            const passed = exam.passed;
            const date = new Date(exam.timestamp);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const item = document.createElement('div');
            item.className = 'exam-history-item';
            item.innerHTML = `
                <div>
                    <div class="exam-history-score ${passed ? 'pass' : 'fail'}">${exam.correctCount}/${exam.totalQuestions}</div>
                    <div class="exam-history-date">${dateStr} at ${timeStr}</div>
                </div>
                <div class="exam-history-verdict">
                    <span class="exam-badge ${passed ? 'pass' : 'fail'}">
                        ${passed ? 'PASSED' : 'FAILED'}
                    </span>
                </div>
            `;
            list.appendChild(item);
        });
    },

    renderSRAnalytics() {
        const schedule = Storage.getReviewSchedule();
        const entries = Object.entries(schedule);
        const now = Date.now();

        let active = 0, graduated = 0, due = 0;
        const stuckQuestions = []; // questions with 5+ reviews but not graduating

        for (const [qId, entry] of entries) {
            if (entry.status === 'graduated') {
                graduated++;
            } else {
                active++;
                if (entry.nextReviewAt <= now) due++;
                // "Stuck" = 5+ reviews, still active, low consecutive correct
                if (entry.totalReviews >= 5 && entry.consecutiveCorrect < 2) {
                    stuckQuestions.push({ id: qId, reviews: entry.totalReviews, consecutive: entry.consecutiveCorrect });
                }
            }
        }

        const total = active + graduated;

        // Update stat numbers
        document.getElementById('sr-active').textContent = active;
        document.getElementById('sr-graduated').textContent = graduated;
        document.getElementById('sr-due').textContent = due;

        // Progress bar: graduated (green) | active (blue) | empty (grey)
        const bar = document.getElementById('sr-progress-bar');
        if (total > 0) {
            const gradPct = Math.round((graduated / total) * 100);
            const actPct = Math.round((active / total) * 100);
            bar.innerHTML = `
                <div class="sr-bar-track">
                    <div class="sr-bar-graduated" style="width: ${gradPct}%"></div>
                    <div class="sr-bar-active" style="width: ${actPct}%"></div>
                </div>
                <div class="sr-bar-label">${graduated} of ${total} questions graduated (${gradPct}%)</div>
            `;
        } else {
            bar.innerHTML = `<div class="sr-bar-label">No questions in review yet. Start practicing!</div>`;
        }

        // Stuck questions list
        const stuckList = document.getElementById('sr-stuck-list');
        if (stuckQuestions.length > 0) {
            stuckQuestions.sort((a, b) => b.reviews - a.reviews);
            const shown = stuckQuestions.slice(0, 5);
            stuckList.innerHTML = `
                <div class="sr-stuck-header">Needs extra practice (${stuckQuestions.length} stuck)</div>
                ${shown.map(sq => {
                    const q = getQuestionById(sq.id);
                    if (!q) return '';
                    const topic = ETG_TOPICS.find(t => t.id === q.topic);
                    return `<div class="sr-stuck-item" data-qid="${sq.id}">
                        <span class="sr-stuck-topic">${topic?.icon || ''}</span>
                        <span class="sr-stuck-text">${q.questionFr.substring(0, 60)}${q.questionFr.length > 60 ? '...' : ''}</span>
                        <span class="sr-stuck-badge">${sq.reviews} tries</span>
                    </div>`;
                }).join('')}
            `;
            // Click to practice stuck questions
            stuckList.querySelectorAll('.sr-stuck-item').forEach(item => {
                item.addEventListener('click', () => {
                    const q = getQuestionById(item.dataset.qid);
                    if (q) {
                        Practice.sessionType = 'review';
                        Practice.sessionQuestions = stuckQuestions.map(sq => getQuestionById(sq.id)).filter(Boolean);
                        Practice.sessionIndex = 0;
                        Practice.sessionCorrect = 0;
                        Practice.answered = false;
                        Practice.selectedAnswers = [];
                        App.navigate('practice');
                        Practice.loadQuestion();
                    }
                });
            });
        } else if (total > 0) {
            stuckList.innerHTML = `<div class="sr-stuck-header sr-no-stuck">No stuck questions — great progress!</div>`;
        } else {
            stuckList.innerHTML = '';
        }
    },

    renderStudyActivity() {
        const container = document.getElementById('study-activity');
        if (!container) return;

        const attempts = Storage.getAttempts();
        const now = new Date();
        const days = [];

        // Build last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toDateString();
            const dayAttempts = attempts.filter(a => a.timestamp && new Date(a.timestamp).toDateString() === dateStr);
            const correct = dayAttempts.filter(a => a.isCorrect).length;
            days.push({
                label: d.toLocaleDateString('en-US', { weekday: 'short' }),
                total: dayAttempts.length,
                correct,
                isToday: i === 0
            });
        }

        const maxCount = Math.max(...days.map(d => d.total), 1);

        container.innerHTML = days.map(d => `
            <div class="activity-day ${d.isToday ? 'today' : ''}">
                <div class="activity-bar-wrapper">
                    <div class="activity-bar" style="height: ${(d.total / maxCount) * 100}%;">
                        <div class="activity-bar-correct" style="height: ${d.total > 0 ? (d.correct / d.total) * 100 : 0}%;"></div>
                    </div>
                </div>
                <div class="activity-label">${d.label}</div>
                <div class="activity-count">${d.total}</div>
            </div>
        `).join('');
    }
};
