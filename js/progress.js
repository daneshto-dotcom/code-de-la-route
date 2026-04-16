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

        // Readiness score (B11)
        const readiness = Storage.getReadinessScore();
        const readinessEl = document.getElementById('progress-readiness');
        if (readinessEl) {
            readinessEl.textContent = readiness !== null ? readiness : '--';
            if (readiness !== null) {
                readinessEl.style.color = readiness >= 85 ? 'var(--success)'
                    : readiness >= 70 ? 'var(--warning)' : 'var(--text)';
            }
        }

        // Compute exam topic trends (shared between mastery + exam sections)
        this._examTopicTrends = this._computeExamTopicTrends(exams);

        // Focus Areas (B03 v1 — top of screen, action-oriented)
        this.renderFocusAreas();

        // Visual Dashboard charts (B15)
        this.renderCharts(mastery, exams);

        // Mastery list (with exam trend indicators)
        this.renderMasteryList(mastery);

        // Exam history (with topic heatmap + recommendations)
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

    // === VISUAL DASHBOARD CHARTS (B15) ===
    // Chart.js instances (destroyed on re-render to prevent memory leaks)
    _radarChart: null,
    _trendChart: null,

    renderCharts(mastery, exams) {
        if (typeof Chart === 'undefined') return; // Chart.js not loaded yet

        this._renderRadarChart(mastery);
        this._renderExamTrendChart(exams);
    },

    _renderRadarChart(mastery) {
        const canvas = document.getElementById('chart-topic-radar');
        if (!canvas) return;

        // Destroy previous instance
        if (this._radarChart) { this._radarChart.destroy(); this._radarChart = null; }

        // Sort alphabetically for consistent radar shape
        const sorted = [...mastery].sort((a, b) => (a.nameEn || '').localeCompare(b.nameEn || ''));
        // Shorten long labels for mobile readability
        const labels = sorted.map(t => {
            const name = t.nameEn || t.topic;
            if (name.length > 14) return name.replace(' & ', ' & \n').substring(0, 20);
            return name;
        });
        const data = sorted.map(t => t.accuracy);
        const attempts = sorted.map(t => t.totalAttempts);

        // Color based on accuracy
        const bgColors = data.map(acc =>
            acc >= 80 ? 'rgba(76, 175, 80, 0.25)' :
            acc >= 50 ? 'rgba(255, 152, 0, 0.25)' :
            'rgba(229, 115, 115, 0.25)'
        );
        const borderColors = data.map(acc =>
            acc >= 80 ? 'rgba(76, 175, 80, 0.8)' :
            acc >= 50 ? 'rgba(255, 152, 0, 0.8)' :
            'rgba(229, 115, 115, 0.8)'
        );

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
            (document.documentElement.getAttribute('data-theme') === 'auto' &&
             window.matchMedia('(prefers-color-scheme: dark)').matches);
        const gridColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
        const labelColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';

        this._radarChart = new Chart(canvas, {
            type: 'radar',
            data: {
                labels,
                datasets: [{
                    label: 'Accuracy %',
                    data,
                    backgroundColor: 'rgba(46, 89, 132, 0.2)',
                    borderColor: 'rgba(46, 89, 132, 0.8)',
                    borderWidth: 2,
                    pointBackgroundColor: borderColors,
                    pointBorderColor: borderColors,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => {
                                const i = ctx.dataIndex;
                                return `${ctx.raw}% (${attempts[i]} attempts)`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 25,
                            color: labelColor,
                            backdropColor: 'transparent',
                            font: { size: 10 }
                        },
                        pointLabels: {
                            color: labelColor,
                            font: { size: 11 }
                        },
                        grid: { color: gridColor },
                        angleLines: { color: gridColor }
                    }
                }
            }
        });
    },

    _renderExamTrendChart(exams) {
        const canvas = document.getElementById('chart-exam-trend');
        const emptyMsg = document.getElementById('chart-exam-empty');
        if (!canvas) return;

        // Destroy previous instance
        if (this._trendChart) { this._trendChart.destroy(); this._trendChart = null; }

        if (exams.length < 2) {
            canvas.style.display = 'none';
            if (emptyMsg) emptyMsg.classList.remove('hidden');
            return;
        }
        canvas.style.display = '';
        if (emptyMsg) emptyMsg.classList.add('hidden');

        const recent = [...exams].slice(-10);
        const labels = recent.map(e => {
            const d = new Date(e.timestamp);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        const scores = recent.map(e => Math.round((e.correctCount / e.totalQuestions) * 100));
        const passThreshold = Math.round((typeof EXAM_PASS_THRESHOLD !== 'undefined' ? EXAM_PASS_THRESHOLD : 35) / 40 * 100);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
            (document.documentElement.getAttribute('data-theme') === 'auto' &&
             window.matchMedia('(prefers-color-scheme: dark)').matches);
        const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
        const labelColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';

        this._trendChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Score %',
                        data: scores,
                        borderColor: 'rgba(46, 89, 132, 0.9)',
                        backgroundColor: 'rgba(46, 89, 132, 0.15)',
                        fill: true,
                        tension: 0.3,
                        borderWidth: 2.5,
                        pointBackgroundColor: scores.map(s => s >= passThreshold ? '#4CAF50' : '#E57373'),
                        pointBorderColor: scores.map(s => s >= passThreshold ? '#4CAF50' : '#E57373'),
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Pass threshold',
                        data: Array(labels.length).fill(passThreshold),
                        borderColor: 'rgba(76, 175, 80, 0.5)',
                        borderWidth: 1.5,
                        borderDash: [6, 4],
                        pointRadius: 0,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => {
                                if (ctx.datasetIndex === 1) return `Pass: ${passThreshold}%`;
                                const exam = recent[ctx.dataIndex];
                                return `${exam.correctCount}/${exam.totalQuestions} (${ctx.raw}%)`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: labelColor, stepSize: 25, font: { size: 10 } },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { color: labelColor, font: { size: 10 } },
                        grid: { display: false }
                    }
                }
            }
        });
    },

    // === FOCUS AREAS (B03 v2 — S43) ===
    // Action-oriented weakness dashboard. Topic-first (prominent) + Qs collapsible.
    // v2 adds: window slider (7/30/90/all), percentile bands, CSV export, session dedupe.
    renderFocusAreas() {
        const container = document.getElementById('focus-areas-section');
        if (!container) return;

        const windowDays = Storage.getFocusAreasWindow();
        let focus;
        try {
            focus = Storage.getFocusAreasV2(windowDays);
        } catch (e) {
            console.error('Focus Areas render failed:', e);
            container.innerHTML = '';
            return;
        }
        const MIN_ATTEMPTS_FOR_SIGNAL = 20;

        // Window chips — always rendered so user can switch even from empty state.
        const chipsHtml = this._renderFocusWindowChips(windowDays);

        // Empty state per window
        if (focus.totalAttempts < MIN_ATTEMPTS_FOR_SIGNAL) {
            const needed = MIN_ATTEMPTS_FOR_SIGNAL - focus.totalAttempts;
            const windowLabel = windowDays === 'all' ? 'all time' : `last ${windowDays} days`;
            container.innerHTML = `
                <div class="focus-areas-card focus-empty">
                    <div class="focus-header">
                        <h3>🎯 Focus Areas</h3>
                        ${chipsHtml}
                    </div>
                    <p class="focus-empty-msg">Insufficient data for ${windowLabel} — need ${needed} more practice attempt${needed === 1 ? '' : 's'} in this window.</p>
                    <p class="focus-empty-detail">Try a wider window above, or keep practicing to unlock personalized focus recommendations.</p>
                </div>
            `;
            this._wireFocusWindowChips(container);
            return;
        }

        // Build weak-topics cards (prominent)
        let topicsHtml = '';
        if (focus.weakTopics.length > 0) {
            topicsHtml = '<div class="focus-topics-list">' + focus.weakTopics.map(t => {
                const topic = ETG_TOPICS.find(x => x.id === t.topic);
                const pct = Math.round(t.accuracy * 100);
                const icon = topic?.icon || '📚';
                const name = topic?.nameEn || t.topic;
                const nameFr = topic?.nameFr || '';
                const color = pct < 50 ? 'var(--danger)' : pct < 70 ? 'var(--warning)' : 'var(--success)';
                return `
                    <div class="focus-topic-card" data-topic="${t.topic}" tabindex="0" role="button" aria-label="Practice ${name}">
                        <div class="focus-topic-header">
                            <span class="focus-topic-icon">${icon}</span>
                            <div class="focus-topic-name">
                                <div>${name}</div>
                                <div class="focus-topic-name-fr">${nameFr}</div>
                            </div>
                        </div>
                        <div class="focus-topic-stats">
                            <div class="focus-topic-accuracy" style="color: ${color};">${pct}%</div>
                            <div class="focus-topic-attempts">${t.attempts} attempts</div>
                        </div>
                        <button class="btn btn-primary btn-sm focus-topic-btn" data-topic="${t.topic}">Practice this topic →</button>
                    </div>
                `;
            }).join('') + '</div>';
        } else {
            topicsHtml = '<p class="focus-empty-msg">No weak topics detected — all topics at similar accuracy. Keep practicing!</p>';
        }

        // Build missed-Qs collapsible
        let missedHtml = '';
        if (focus.mostMissed.length > 0) {
            const rows = focus.mostMissed.map(m => {
                const pct = Math.round(m.errorRate * 100);
                const topic = ETG_TOPICS.find(x => x.id === m.topic);
                const topicIcon = topic?.icon || '📚';
                // Short hash for privacy-minded listing
                const shortId = m.questionId.length > 12 ? m.questionId.substring(0, 12) : m.questionId;
                return `
                    <li class="focus-missed-row" data-qid="${m.questionId}" tabindex="0" role="button">
                        <span class="focus-missed-icon">${topicIcon}</span>
                        <span class="focus-missed-id">${shortId}</span>
                        <span class="focus-missed-stats">${m.wrongs}/${m.attempts} wrong (${pct}%)</span>
                    </li>
                `;
            }).join('');
            missedHtml = `
                <details class="focus-missed-details">
                    <summary>Questions to review (${focus.mostMissed.length})</summary>
                    <ul class="focus-missed-list">${rows}</ul>
                </details>
            `;
        }

        const avgTimeHtml = focus.avgResponseMs
            ? `<span class="focus-avg-time">Avg response: ${(focus.avgResponseMs / 1000).toFixed(1)}s</span>`
            : '';
        const windowLabel = windowDays === 'all' ? 'all time' : `last ${windowDays} days`;
        const dedupeSuffix = focus.rawAttempts > focus.totalAttempts
            ? ` <span class="focus-dedupe-note" title="Same question attempted multiple times in one session counted once">(${focus.rawAttempts - focus.totalAttempts} retry dup${focus.rawAttempts - focus.totalAttempts === 1 ? '' : 's'} deduped)</span>`
            : '';

        // Band signals (B03 v2) — fast-wrong, slow-correct, slow-wrong
        const bandsHtml = this._renderFocusBands(focus.bands);

        container.innerHTML = `
            <div class="focus-areas-card">
                <div class="focus-header">
                    <h3>🎯 Focus Areas</h3>
                    ${chipsHtml}
                </div>
                <div class="focus-meta-row">
                    <span class="focus-data-note">Based on ${windowLabel} · ${focus.totalAttempts} attempts${dedupeSuffix} ${avgTimeHtml}</span>
                    <button class="btn btn-ghost btn-sm focus-csv-btn" aria-label="Export focus areas as CSV">📊 CSV</button>
                </div>
                ${topicsHtml}
                ${bandsHtml}
                ${missedHtml}
            </div>
        `;

        // Wire up window chips
        this._wireFocusWindowChips(container);

        // Wire up topic practice buttons — launch focus session (B04)
        container.querySelectorAll('.focus-topic-btn, .focus-topic-card').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                Practice.startSession('focus', { count: 20 });
                App.navigate('practice');
            });
        });

        // Wire up missed-Q clicks → show explanation modal
        container.querySelectorAll('.focus-missed-row').forEach(row => {
            row.addEventListener('click', () => {
                const qid = row.dataset.qid;
                this.showQuestionReviewModal(qid);
            });
        });

        // Wire up band rows → show explanation modal if question
        container.querySelectorAll('.focus-band-row[data-qid]').forEach(row => {
            row.addEventListener('click', () => this.showQuestionReviewModal(row.dataset.qid));
        });

        // CSV export
        const csvBtn = container.querySelector('.focus-csv-btn');
        if (csvBtn) {
            csvBtn.addEventListener('click', () => {
                const csv = Storage.exportFocusAreasCSV(windowDays);
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const stamp = new Date().toISOString().slice(0, 10);
                a.href = url;
                a.download = `focus-areas-${windowDays === 'all' ? 'all' : windowDays + 'd'}-${stamp}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                if (typeof showToast === 'function') showToast('CSV exported.', 'success');
            });
        }
    },

    // Window chip rail — 7 / 30 / 90 / all
    _renderFocusWindowChips(active) {
        const options = [
            { v: 7, label: '7d' },
            { v: 30, label: '30d' },
            { v: 90, label: '90d' },
            { v: 'all', label: 'All' }
        ];
        return `<div class="focus-window-chips" role="tablist" aria-label="Focus window">${options.map(o => {
            const isActive = o.v === active;
            return `<button class="focus-chip${isActive ? ' is-active' : ''}" data-window="${o.v}" role="tab" aria-selected="${isActive}">${o.label}</button>`;
        }).join('')}</div>`;
    },

    _wireFocusWindowChips(container) {
        container.querySelectorAll('.focus-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const v = chip.dataset.window;
                const parsed = v === 'all' ? 'all' : parseInt(v, 10);
                Storage.setFocusAreasWindow(parsed);
                this.renderFocusAreas();
            });
        });
    },

    // Band signal cards — fast-wrong (misread), slow-correct (hesitant mastery), slow-wrong (struggle)
    _renderFocusBands(bands) {
        if (!bands || !bands.counts || bands.counts.totalClassified === 0) return '';
        const cards = [];
        if (bands.counts.fastWrong > 0) {
            cards.push(this._renderBandCard(
                '⚡❌', 'Fast but wrong', bands.counts.fastWrong,
                'Answered quickly then missed — likely misreading the question.',
                'band-fast-wrong', bands.fastWrong
            ));
        }
        if (bands.counts.slowCorrect > 0) {
            cards.push(this._renderBandCard(
                '🐢✅', 'Slow but correct', bands.counts.slowCorrect,
                'You know these — just slow to commit. Review to build confidence.',
                'band-slow-correct', bands.slowCorrect
            ));
        }
        if (bands.counts.slowWrong > 0) {
            cards.push(this._renderBandCard(
                '🐢❌', 'Slow and wrong', bands.counts.slowWrong,
                'Genuine knowledge gaps — drill the underlying topic.',
                'band-slow-wrong', bands.slowWrong
            ));
        }
        if (cards.length === 0) return '';
        return `<div class="focus-bands">${cards.join('')}</div>`;
    },

    _renderBandCard(icon, title, count, tip, cssClass, samples) {
        const rows = (samples || []).slice(0, 3).map(s => {
            const topic = ETG_TOPICS.find(t => t.id === s.topic);
            const shortId = s.questionId && s.questionId.length > 10 ? s.questionId.substring(0, 10) : (s.questionId || '');
            const secs = s.responseMs ? (s.responseMs / 1000).toFixed(1) + 's' : '';
            return `<li class="focus-band-row" data-qid="${s.questionId}" tabindex="0" role="button">
                <span>${topic?.icon || '📚'} ${shortId}</span>
                <span class="focus-band-time">${secs}</span>
            </li>`;
        }).join('');
        return `<div class="focus-band-card ${cssClass}">
            <div class="focus-band-header">
                <span class="focus-band-icon">${icon}</span>
                <span class="focus-band-title">${title}</span>
                <span class="focus-band-count">${count}</span>
            </div>
            <p class="focus-band-tip">${tip}</p>
            ${rows ? `<ul class="focus-band-list">${rows}</ul>` : ''}
        </div>`;
    },

    // Show a modal with the full question, correct answer, explanation,
    // and a "Drill topic" CTA. Pedagogy-first per Gemini council synthesis.
    showQuestionReviewModal(questionId) {
        const q = QUESTION_BANK.find(x => x.id === questionId);
        if (!q) return;
        const topic = ETG_TOPICS.find(t => t.id === q.topic);
        const correctLetters = q.correctAnswers.join(', ');
        const correctTexts = q.correctAnswers.map(letter => {
            const opt = q.options[letter];
            return opt ? `<strong>${letter})</strong> ${opt.fr}` : letter;
        }).join('<br>');

        const modal = document.getElementById('focus-review-modal');
        if (!modal) return;
        modal.querySelector('.review-topic').innerHTML = `${topic?.icon || ''} ${topic?.nameEn || q.topic}`;
        modal.querySelector('.review-question').textContent = q.questionFr;
        modal.querySelector('.review-question-en').textContent = q.questionEn || '';
        modal.querySelector('.review-correct').innerHTML = correctTexts;
        modal.querySelector('.review-explanation').textContent = q.explanationFr || '';
        modal.querySelector('.review-explanation-en').textContent = q.explanationEn || '';
        const drillBtn = modal.querySelector('.review-drill-btn');
        drillBtn.onclick = () => {
            modal.classList.add('hidden');
            const count = getQuestionsByTopic(q.topic).length;
            Practice.startSession('drill', { topicFilter: q.topic, count: Math.min(count, 15) });
        };
        modal.classList.remove('hidden');
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
                    ${this._getTrendArrow(topic.id || topic.topic)}
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

        list.innerHTML = this.renderExamTrend(exams) + this.renderExamTopicHeatmap();

        // Wire drill links on recommendation cards
        list.querySelectorAll('.exam-rec-decline[data-topic]').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const topicId = card.dataset.topic;
                const count = getQuestionsByTopic(topicId).length;
                Practice.startSession('drill', { topicFilter: topicId, count: Math.min(count, 15) });
                App.navigate('practice');
            });
        });

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
    },

    // === EXAM TOPIC ANALYTICS ===

    // Compute per-topic accuracy for each exam (shared state)
    _computeExamTopicTrends(exams) {
        // Filter exams that have per-question results (guard against old format)
        const valid = exams.filter(e => Array.isArray(e.results) && e.results.length > 0);
        if (valid.length < 2) return null;

        const recent = valid.slice(-5);
        const topicData = {}; // topicId -> [{correct, total, date}]

        for (const exam of recent) {
            const date = new Date(exam.timestamp);
            const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const perTopic = {};
            for (const r of exam.results) {
                if (!r.topic) continue;
                if (!perTopic[r.topic]) perTopic[r.topic] = { correct: 0, total: 0 };
                perTopic[r.topic].total++;
                if (r.correct) perTopic[r.topic].correct++;
            }
            for (const topicId of ETG_TOPICS.map(t => t.id)) {
                if (!topicData[topicId]) topicData[topicId] = [];
                const d = perTopic[topicId];
                topicData[topicId].push({
                    correct: d ? d.correct : 0,
                    total: d ? d.total : 0,
                    date: dateLabel
                });
            }
        }

        return { topicData, examCount: recent.length, dates: recent.map(e => new Date(e.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })) };
    },

    // Trend arrow for mastery list
    _getTrendArrow(topicId) {
        if (!this._examTopicTrends) return '';
        const data = this._examTopicTrends.topicData[topicId];
        if (!data || data.length < 2) return '';

        // Compare latest exam to average of prior exams
        const latest = data[data.length - 1];
        const prior = data.slice(0, -1);
        if (latest.total === 0) return '';

        const latestAcc = latest.total > 0 ? latest.correct / latest.total : 0;
        let priorTotal = 0, priorCorrect = 0;
        for (const p of prior) { priorTotal += p.total; priorCorrect += p.correct; }
        if (priorTotal === 0) return '';

        const priorAcc = priorCorrect / priorTotal;
        const diff = latestAcc - priorAcc;

        if (diff > 0.1) return '<span class="exam-trend-arrow trend-up" title="Improving in exams">&#x25B2;</span>';
        if (diff < -0.1) return '<span class="exam-trend-arrow trend-down" title="Declining in exams">&#x25BC;</span>';
        return '<span class="exam-trend-arrow trend-stable" title="Stable in exams">&#x25B6;</span>';
    },

    // Render per-topic heatmap table after exam trend chart
    renderExamTopicHeatmap() {
        if (!this._examTopicTrends) {
            return '<p class="empty-state">Take 2+ exams with the current app to see per-topic trends.</p>';
        }

        const { topicData, dates } = this._examTopicTrends;

        // Header row
        let html = '<div class="exam-topic-heatmap-wrapper"><table class="exam-topic-heatmap">';
        html += '<thead><tr><th class="heatmap-topic-th">Topic</th>';
        for (const d of dates) {
            html += `<th class="heatmap-date-th">${d}</th>`;
        }
        html += '</tr></thead><tbody>';

        // One row per topic
        for (const topic of ETG_TOPICS) {
            const data = topicData[topic.id] || [];
            html += `<tr><td class="heatmap-topic-cell">${topic.icon} ${topic.nameEn}</td>`;
            for (const d of data) {
                if (d.total === 0) {
                    html += '<td class="heatmap-cell heatmap-none">—</td>';
                } else {
                    const acc = Math.round((d.correct / d.total) * 100);
                    const cls = acc >= 80 ? 'heatmap-good' : acc >= 50 ? 'heatmap-mid' : 'heatmap-low';
                    html += `<td class="heatmap-cell ${cls}" title="${acc}%">${d.correct}/${d.total}</td>`;
                }
            }
            html += '</tr>';
        }

        html += '</tbody></table></div>';

        // Recommendations
        html += this._renderExamRecommendations();

        return html;
    },

    // Actionable recommendations based on exam topic trends
    _renderExamRecommendations() {
        if (!this._examTopicTrends) return '';

        const { topicData } = this._examTopicTrends;
        const improving = [];
        const declining = [];

        for (const topic of ETG_TOPICS) {
            const data = topicData[topic.id];
            if (!data || data.length < 2) continue;

            const latest = data[data.length - 1];
            const prior = data.slice(0, -1);
            if (latest.total === 0) continue;

            const latestAcc = Math.round((latest.correct / latest.total) * 100);
            let priorTotal = 0, priorCorrect = 0;
            for (const p of prior) { priorTotal += p.total; priorCorrect += p.correct; }
            if (priorTotal === 0) continue;
            const priorAcc = Math.round((priorCorrect / priorTotal) * 100);

            const diff = latestAcc - priorAcc;
            if (diff >= 15) improving.push({ topic, latestAcc, priorAcc, diff });
            else if (diff <= -15) declining.push({ topic, latestAcc, priorAcc, diff: Math.abs(diff) });
        }

        if (improving.length === 0 && declining.length === 0) return '';

        let html = '<div class="exam-recommendations">';

        // Show declining first (actionable)
        declining.sort((a, b) => b.diff - a.diff);
        for (const d of declining.slice(0, 2)) {
            html += `<div class="exam-rec-card exam-rec-decline" data-topic="${d.topic.id}">
                <span class="exam-rec-icon">&#x25BC;</span>
                <div class="exam-rec-text">
                    <strong>Focus on ${d.topic.nameEn}</strong>
                    <span>Dropped from ${d.priorAcc}% to ${d.latestAcc}%</span>
                </div>
                <span class="exam-rec-action">Drill</span>
            </div>`;
        }

        // Then improving (encouragement)
        improving.sort((a, b) => b.diff - a.diff);
        for (const d of improving.slice(0, 1)) {
            html += `<div class="exam-rec-card exam-rec-improve">
                <span class="exam-rec-icon">&#x25B2;</span>
                <div class="exam-rec-text">
                    <strong>${d.topic.nameEn} improving!</strong>
                    <span>Up from ${d.priorAcc}% to ${d.latestAcc}%</span>
                </div>
            </div>`;
        }

        html += '</div>';
        return html;
    }
};
