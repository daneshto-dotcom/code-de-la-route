/* ============================================
   Main App Controller
   Navigation, initialization, home screen
   ============================================ */

const App = {
    currentView: 'home',

    init() {
        // Show splash screen
        setTimeout(() => {
            // Init TTS
            TTS.init();

            // Check first launch
            if (Storage.isFirstLaunch()) {
                this.showOnboarding();
            } else {
                this.showMainApp();
            }
        }, 1200);

        // Setup navigation
        this.setupNavigation();
        this.setupSettings();
        this.setupExamView();

        // Init vocab/learn
        Vocab.init();

        // Init tutor chat
        Tutor.init();

        // Listen for service worker update notifications
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data?.type === 'SW_UPDATED') {
                    showToast('App updated! Refresh for latest version.', 'success');
                }
            });
        }
    },

    showOnboarding() {
        document.getElementById('splash-screen').classList.remove('active');
        document.getElementById('onboarding-screen').classList.add('active');

        let currentPage = 0;
        const pages = document.querySelectorAll('.onboarding-page');
        const dots = document.querySelectorAll('.dot');
        const nextBtn = document.getElementById('onboarding-next');
        const skipBtn = document.getElementById('onboarding-skip');

        const showPage = (index) => {
            pages.forEach(p => p.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            pages[index].classList.add('active');
            dots[index].classList.add('active');
            currentPage = index;

            if (index === pages.length - 1) {
                nextBtn.textContent = "Let's Go!";
                skipBtn.style.display = 'none';
            } else {
                nextBtn.textContent = 'Continue';
                skipBtn.style.display = 'block';
            }
        };

        nextBtn.addEventListener('click', () => {
            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            } else {
                // Launch diagnostic assessment instead of going straight to main app
                document.getElementById('onboarding-screen').classList.remove('active');
                Diagnostic.start();
            }
        });

        skipBtn.addEventListener('click', () => {
            // Launch diagnostic even if onboarding is skipped
            document.getElementById('onboarding-screen').classList.remove('active');
            Diagnostic.start();
        });

        // TTS test button
        document.getElementById('tts-test-btn').addEventListener('click', () => {
            TTS.testFrench();
            document.getElementById('tts-status').textContent = TTS.hasFrenchVoice() ?
                '✓ French voice detected!' : 'French voice not found — TTS may not work on this device.';
        });
    },

    showMainApp() {
        document.getElementById('splash-screen').classList.remove('active');
        document.getElementById('onboarding-screen').classList.remove('active');
        document.getElementById('main-app').classList.add('active');
        this.navigate('home');
    },

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.navigate(view);
            });
        });

        // Preset cards
        document.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', () => {
                const preset = card.dataset.preset;
                switch (preset) {
                    case 'quick10':
                        Practice.startSession('quick10');
                        this.navigate('practice');
                        break;
                    case 'weakspots':
                        Practice.startSession('weakspots');
                        this.navigate('practice');
                        break;
                    case 'review':
                        Practice.startSession('review');
                        this.navigate('practice');
                        break;
                    case 'exam':
                        this.navigate('exam');
                        break;
                }
            });
        });

        // End session button
        document.getElementById('end-session-btn').addEventListener('click', () => {
            Practice.endSession();
        });
    },

    navigate(viewName) {
        // Don't navigate away from exam while active
        if (Exam.active && viewName !== 'exam') {
            if (!confirm('Leave the exam? Your progress will be lost.')) return;
            Exam.active = false;
            Exam.stopExamTimer();
        }

        this.currentView = viewName;
        TTS.stop();

        // Update views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            targetView.classList.add('view-enter');
            setTimeout(() => targetView.classList.remove('view-enter'), 300);
        }

        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            const isActive = item.dataset.view === viewName;
            item.classList.toggle('active', isActive);
            item.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update header
        const titles = {
            home: 'Code de la Route',
            practice: 'Practice',
            vocab: 'Vocabulaire',
            exam: 'Mock Exam',
            progress: 'Progress',
            settings: 'Settings'
        };
        document.getElementById('header-title').textContent = titles[viewName] || 'Code de la Route';

        // Refresh view data
        switch (viewName) {
            case 'home':
                this.renderHome();
                break;
            case 'progress':
                Progress.render();
                break;
            case 'settings':
                this.loadSettings();
                break;
            case 'vocab':
                Vocab.render();
                break;
            case 'exam':
                Exam.resetExamView();
                break;
        }
    },

    renderHome() {
        // Greeting
        const hour = new Date().getHours();
        let greeting = 'Bonjour!';
        if (hour >= 17) greeting = 'Bonsoir!';
        else if (hour < 5) greeting = 'Bonne nuit!';
        document.getElementById('greeting-text').textContent = greeting;
        document.getElementById('greeting-date').textContent =
            new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        // Readiness score
        const readiness = Storage.getReadinessScore();
        if (readiness !== null) {
            const ring = document.getElementById('readiness-ring');
            const circumference = 2 * Math.PI * 52;
            ring.style.strokeDashoffset = circumference * (1 - readiness / 100);

            document.getElementById('readiness-value').textContent = `${readiness}%`;

            let label, detail;
            if (readiness >= 90) { label = 'Ready for the exam!'; detail = 'You are well prepared. Book your date!'; }
            else if (readiness >= 80) { label = 'Almost there!'; detail = 'Polish your weak spots and you\'re ready.'; }
            else if (readiness >= 70) { label = 'Good progress!'; detail = 'Keep practicing — you\'re building confidence.'; }
            else if (readiness >= 50) { label = 'Keep going!'; detail = 'Practice daily to improve your score.'; }
            else { label = 'Building foundations'; detail = 'Every question makes you stronger!'; }

            document.getElementById('readiness-label').textContent = label;
            document.getElementById('readiness-detail').textContent = detail;
        }

        // Exam countdown + cramming mode
        const settings = Storage.getSettings();
        const countdownCard = document.getElementById('exam-countdown-card');
        if (settings.examDate) {
            const examDate = new Date(settings.examDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysLeft = Math.ceil((examDate - today) / 86400000);

            if (daysLeft >= 0) {
                countdownCard.classList.remove('hidden');
                document.getElementById('countdown-days').textContent = daysLeft;

                // Cramming mode: <7 days to exam
                const countdownLabel = document.querySelector('.countdown-label');
                countdownCard.classList.remove('cramming'); // reset before re-evaluating
                if (daysLeft <= 0) {
                    countdownLabel.textContent = "Exam day! Bonne chance!";
                    countdownCard.classList.add('cramming');
                } else if (daysLeft <= 3) {
                    countdownLabel.textContent = `${daysLeft} day${daysLeft > 1 ? 's' : ''} — Focus on weak spots!`;
                    countdownCard.classList.add('cramming');
                } else if (daysLeft <= 7) {
                    countdownLabel.textContent = `${daysLeft} days — Cramming mode active`;
                    countdownCard.classList.add('cramming');
                } else {
                    countdownLabel.textContent = 'days until exam';
                }
            } else {
                countdownCard.classList.add('hidden');
            }
        } else {
            countdownCard.classList.add('hidden');
        }

        const examDateBtn = document.getElementById('set-exam-date-btn');
        if (examDateBtn) examDateBtn.onclick = () => this.navigate('settings');

        // Review count
        const dueReviews = Storage.getDueReviews().length;
        document.getElementById('review-count').textContent =
            dueReviews > 0 ? `${dueReviews} due` : 'Mistakes';

        // Bookmarked questions
        const bookmarks = Storage.getBookmarks();
        const bookmarkSection = document.getElementById('bookmark-section');
        if (bookmarks.length > 0) {
            bookmarkSection.classList.remove('hidden');
            document.getElementById('bookmark-count').textContent = `${bookmarks.length} saved`;
            document.getElementById('bookmark-drill-card').onclick = () => {
                const bookmarkedQuestions = bookmarks.map(id => getQuestionById(id)).filter(Boolean);
                if (bookmarkedQuestions.length > 0) {
                    Practice.sessionType = 'review';
                    Practice.sessionQuestions = bookmarkedQuestions;
                    Practice.sessionIndex = 0;
                    Practice.sessionCorrect = 0;
                    Practice.answered = false;
                    Practice.selectedAnswers = [];
                    App.navigate('practice');
                    Practice.loadQuestion();
                }
            };
        } else {
            bookmarkSection.classList.add('hidden');
        }

        // Topic list (weak topics)
        this.renderTopicList();

        // Stats
        const stats = Storage.getOverallStats();
        document.getElementById('stat-total').textContent = stats.total;
        document.getElementById('stat-accuracy').textContent = `${stats.accuracy}%`;
        document.getElementById('stat-streak').textContent = stats.streak;

        // Coverage: unique questions seen / total questions
        const uniqueSeen = new Set(Storage.getAttempts().map(a => a.questionId)).size;
        const coveragePct = QUESTION_BANK.length > 0 ? Math.round((uniqueSeen / QUESTION_BANK.length) * 100) : 0;
        document.getElementById('stat-coverage').textContent = `${coveragePct}%`;

        // Graduated reviews
        const reviewSchedule = Storage.getReviewSchedule();
        const graduated = Object.values(reviewSchedule).filter(r => r.status === 'graduated').length;
        document.getElementById('stat-graduated').textContent = graduated;
    },

    renderTopicList() {
        const list = document.getElementById('topic-list');
        list.innerHTML = '';

        const mastery = Storage.getTopicMasteryArray();
        // Sort: weakest first, but show all
        mastery.sort((a, b) => a.accuracy - b.accuracy);

        // Show top 5 weakest or least practiced
        const shown = mastery.slice(0, 5);

        for (const topic of shown) {
            const level = getMasteryLevel(topic.accuracy, topic.totalAttempts);
            const item = document.createElement('div');
            item.className = 'topic-item';
            item.innerHTML = `
                <div class="topic-mastery-bar" style="background: ${level.color};">
                    ${topic.icon}
                </div>
                <div class="topic-info">
                    <div class="topic-name-fr">${topic.nameFr}</div>
                    <div class="topic-name-en">${topic.nameEn}</div>
                </div>
                <div class="topic-accuracy">${topic.totalAttempts > 0 ? topic.accuracy + '%' : '—'}</div>
            `;
            item.addEventListener('click', () => {
                Practice.startSession('drill', { topicFilter: topic.id, count: 10 });
                this.navigate('practice');
            });
            list.appendChild(item);
        }
    },

    setupExamView() {
        document.getElementById('start-exam-btn').addEventListener('click', () => {
            Exam.start('exam');
        });

        document.getElementById('start-practice-exam-btn').addEventListener('click', () => {
            Exam.start('practice');
        });
    },

    setupSettings() {
        const settings = Storage.getSettings();

        // Show English toggle
        const showEnglish = document.getElementById('setting-show-english');
        showEnglish.checked = settings.showEnglish;
        showEnglish.addEventListener('change', () => {
            Storage.saveSetting('showEnglish', showEnglish.checked);
        });

        // TTS toggle
        const tts = document.getElementById('setting-tts');
        tts.checked = settings.ttsEnabled;
        tts.addEventListener('change', () => {
            Storage.saveSetting('ttsEnabled', tts.checked);
        });

        // TTS Speed
        const ttsSpeed = document.getElementById('setting-tts-speed');
        ttsSpeed.value = settings.ttsSpeed?.toString() || '1.0';
        ttsSpeed.addEventListener('change', () => {
            Storage.saveSetting('ttsSpeed', parseFloat(ttsSpeed.value));
        });

        // Exam date
        const examDate = document.getElementById('setting-exam-date');
        if (settings.examDate) examDate.value = settings.examDate;
        examDate.addEventListener('change', () => {
            Storage.saveSetting('examDate', examDate.value || null);
            showToast('Exam date updated!');
        });

        // Confidence toggle
        const confidence = document.getElementById('setting-confidence');
        confidence.checked = settings.confidenceEnabled;
        confidence.addEventListener('change', () => {
            Storage.saveSetting('confidenceEnabled', confidence.checked);
        });

        // Tutor endpoint
        const tutorEndpoint = document.getElementById('setting-tutor-endpoint');
        tutorEndpoint.value = settings.tutorEndpoint || '';
        tutorEndpoint.addEventListener('change', () => {
            Storage.saveSetting('tutorEndpoint', tutorEndpoint.value || null);
            Tutor.ENDPOINT = tutorEndpoint.value || null;
            showToast('Tutor endpoint updated!');
        });

        // Export
        document.getElementById('export-data-btn').addEventListener('click', () => {
            Storage.exportData();
            showToast('Data exported!', 'success');
        });

        // Import
        document.getElementById('import-data-btn').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });

        document.getElementById('import-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (confirm('This will replace your current progress. Continue?')) {
                    const success = Storage.importData(ev.target.result);
                    showToast(success ? 'Data imported!' : 'Import failed — invalid file', success ? 'success' : 'error');
                }
            };
            reader.readAsText(file);
        });

        // Retake Diagnostic
        document.getElementById('retake-diagnostic-btn').addEventListener('click', () => {
            if (confirm('This will re-run the 15-question diagnostic assessment. Your previous diagnostic result will be replaced. Continue?')) {
                // Clear previous diagnostic result
                localStorage.removeItem(Storage.KEYS.DIAGNOSTIC_RESULT);
                // Hide main app, start diagnostic
                document.getElementById('main-app').classList.remove('active');
                document.getElementById('diagnostic-screen').classList.add('active');
                document.getElementById('diag-questions').classList.remove('hidden');
                document.getElementById('diag-results').classList.add('hidden');
                Diagnostic.start();
            }
        });

        // Reset
        document.getElementById('reset-data-btn').addEventListener('click', () => {
            if (confirm('This will delete ALL your progress. Are you sure?')) {
                if (confirm('Really? This cannot be undone.')) {
                    Storage.resetAll();
                    showToast('All progress reset.');
                    this.navigate('home');
                }
            }
        });
    },

    loadSettings() {
        const settings = Storage.getSettings();
        document.getElementById('setting-show-english').checked = settings.showEnglish;
        document.getElementById('setting-tts').checked = settings.ttsEnabled;
        document.getElementById('setting-tts-speed').value = settings.ttsSpeed?.toString() || '1.0';
        document.getElementById('setting-exam-date').value = settings.examDate || '';
        document.getElementById('setting-confidence').checked = settings.confidenceEnabled;
        document.getElementById('setting-tutor-endpoint').value = settings.tutorEndpoint || '';
    }
};

// === TOAST HELPER ===
function showToast(message, type = '') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// === SERVICE WORKER REGISTRATION ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => {
                // Check for updates
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated') {
                            showToast('App updated! Refresh for latest version.', 'success');
                        }
                    });
                });
            })
            .catch(() => {});
    });
}

// === GLOBAL ERROR BOUNDARY ===
window.addEventListener('error', (event) => {
    console.error('App error:', event.error);
    // Only show toast if app is initialized (showToast exists)
    if (typeof showToast === 'function') {
        showToast('Something went wrong. Try refreshing the page.', 'error');
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise:', event.reason);
    // Prevent unhandled promise rejection noise for non-critical errors
    if (event.reason?.name === 'AbortError') {
        event.preventDefault(); // AbortController timeouts are expected
    }
});

// === OFFLINE DETECTION ===
window.addEventListener('online', () => {
    showToast('Back online!', 'success');
});

window.addEventListener('offline', () => {
    showToast('You are offline. Progress is saved locally.');
});
