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
                <div style="text-align: center; min-width: 32px;">
                    <span style="font-size: 20px;">${topic.icon}</span>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 600; font-size: 13px; margin-bottom: 2px;">${topic.nameEn}</div>
                    <div style="font-size: 11px; color: var(--text-tertiary);">${topic.nameFr}</div>
                    <div class="mastery-bar-container" style="margin-top: 4px;">
                        <div class="mastery-bar-fill" style="width: ${topic.accuracy}%; background: ${color};"></div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="mastery-accuracy" style="color: ${color};">${topic.accuracy}%</div>
                    <span class="mastery-level-badge ${level.id}">${level.label}</span>
                </div>
            `;

            // Click to drill — full topic
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
        // Show most recent first
        [...exams].reverse().forEach((exam, i) => {
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
                <div style="text-align: right;">
                    <span style="padding: 3px 10px; border-radius: 10px; font-size: 12px; font-weight: 600;
                        background: ${passed ? 'var(--success-light)' : 'var(--error-light)'};
                        color: ${passed ? 'var(--success-dark)' : 'var(--error-dark)'};">
                        ${passed ? 'PASSED' : 'FAILED'}
                    </span>
                </div>
            `;
            list.appendChild(item);
        });
    }
};
