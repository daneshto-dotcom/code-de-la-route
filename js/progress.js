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
            const dayAttempts = attempts.filter(a => new Date(a.timestamp).toDateString() === dateStr);
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
