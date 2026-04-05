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

        // Achievements
        this.renderAchievements();

        // Spaced repetition analytics
        this.renderSRAnalytics();

        // Study activity (last 7 days)
        this.renderStudyActivity();
    },

    renderAchievements() {
        const container = document.getElementById('achievements-section');
        if (!container) return;
        container.innerHTML = Achievements.renderSection();
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

        list.innerHTML = this.renderExamTrend(exams);
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

        const activityMap = Storage.getDailyActivityMap(30);
        const streak = Storage.getStreak();
        const bestStreak = Storage.getBestStreak();
        const totalDays = Storage.getTotalPracticeDays();

        // Streak stats row
        const statsHtml = `
            <div class="streak-stats">
                <div class="streak-stat">
                    <div class="streak-stat-value">${streak}</div>
                    <div class="streak-stat-label">Current Streak</div>
                </div>
                <div class="streak-stat">
                    <div class="streak-stat-value">${bestStreak}</div>
                    <div class="streak-stat-label">Best Streak</div>
                </div>
                <div class="streak-stat">
                    <div class="streak-stat-value">${totalDays}</div>
                    <div class="streak-stat-label">Total Days</div>
                </div>
            </div>`;

        // 30-day calendar grid with accuracy overlay
        const dates = Object.keys(activityMap);
        const cellsHtml = dates.map(dateStr => {
            const d = activityMap[dateStr];
            const date = new Date(dateStr);
            const dayNum = date.getDate();
            const isToday = dateStr === new Date().toDateString();
            let level = 0;
            if (d.total >= 16) level = 3;
            else if (d.total >= 6) level = 2;
            else if (d.total >= 1) level = 1;

            // Accuracy border
            let accClass = '';
            if (d.total > 0) {
                const acc = Math.round((d.correct / d.total) * 100);
                accClass = acc >= 80 ? ' cal-acc-good' : acc >= 50 ? ' cal-acc-mid' : ' cal-acc-low';
            }
            const accPct = d.total > 0 ? Math.round((d.correct / d.total) * 100) + '%' : '';
            const tooltip = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${d.total} questions (${d.correct} correct)${accPct ? ' — ' + accPct : ''}`;

            return `<div class="cal-cell cal-level-${level}${accClass}${isToday ? ' cal-today' : ''}" title="${tooltip}"><span class="cal-day">${dayNum}</span></div>`;
        }).join('');

        const legendHtml = `
            <div class="cal-legend">
                <span class="cal-legend-label">Less</span>
                <div class="cal-cell cal-level-0 cal-legend-cell"></div>
                <div class="cal-cell cal-level-1 cal-legend-cell"></div>
                <div class="cal-cell cal-level-2 cal-legend-cell"></div>
                <div class="cal-cell cal-level-3 cal-legend-cell"></div>
                <span class="cal-legend-label">More</span>
                <span class="cal-legend-sep">|</span>
                <span class="cal-legend-label">Accuracy:</span>
                <div class="cal-cell cal-acc-good cal-legend-cell"></div>
                <div class="cal-cell cal-acc-mid cal-legend-cell"></div>
                <div class="cal-cell cal-acc-low cal-legend-cell"></div>
            </div>`;

        // Weekly accuracy trend (4 weeks)
        const weeklyTrendHtml = this.renderWeeklyTrend(activityMap);

        container.innerHTML = statsHtml +
            `<div class="cal-grid">${cellsHtml}</div>` +
            legendHtml + weeklyTrendHtml;
    },

    renderWeeklyTrend(activityMap) {
        const dates = Object.keys(activityMap);
        const weeks = [[], [], [], []];
        // Split 28 most recent days into 4 weeks
        const recent = dates.slice(-28);
        recent.forEach((d, i) => weeks[Math.floor(i / 7)].push(activityMap[d]));

        const weekData = weeks.map((days, i) => {
            let total = 0, correct = 0;
            days.forEach(d => { total += d.total; correct += d.correct; });
            const acc = total > 0 ? Math.round((correct / total) * 100) : 0;
            return { label: `W${i + 1}`, acc, total };
        });

        // Only show if there's any activity
        if (weekData.every(w => w.total === 0)) return '';

        const bars = weekData.map(w => {
            const colorClass = w.total === 0 ? 'trend-empty' : w.acc >= 80 ? 'trend-good' : w.acc >= 50 ? 'trend-mid' : 'trend-low';
            return `<div class="trend-col">
                <div class="trend-bar-wrapper">
                    <div class="trend-bar ${colorClass}" style="height: ${Math.max(w.acc, 4)}%"></div>
                </div>
                <div class="trend-val">${w.total > 0 ? w.acc + '%' : '—'}</div>
                <div class="trend-label">${w.label}</div>
            </div>`;
        }).join('');

        return `<div class="weekly-trend">
            <div class="trend-title">Weekly Accuracy</div>
            <div class="trend-chart">${bars}</div>
        </div>`;
    },

    renderExamTrend(exams) {
        if (exams.length < 2) return '';
        const recent = [...exams].slice(-5);
        const maxScore = 40;
        const passLine = (EXAM_PASS_THRESHOLD / maxScore) * 100;

        const bars = recent.map((exam, i) => {
            const pct = Math.round((exam.correctCount / maxScore) * 100);
            const passed = exam.passed;
            const date = new Date(exam.timestamp);
            const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return `<div class="exam-trend-col">
                <div class="exam-trend-bar-wrapper">
                    <div class="exam-trend-bar ${passed ? 'exam-trend-pass' : 'exam-trend-fail'}" style="height: ${pct}%"></div>
                </div>
                <div class="exam-trend-score">${exam.correctCount}</div>
                <div class="exam-trend-date">${label}</div>
            </div>`;
        }).join('');

        return `<div class="exam-trend">
            <div class="exam-trend-chart">
                <div class="exam-trend-pass-line" style="bottom: ${passLine}%" title="Pass: ${EXAM_PASS_THRESHOLD}/${maxScore}"></div>
                ${bars}
            </div>
        </div>`;
    }
};
