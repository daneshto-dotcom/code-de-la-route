/* ============================================
   Tutor Chat Integration
   Connects to Cloudflare Worker backend
   ============================================ */

const Tutor = {
    DEFAULT_ENDPOINT: 'https://code-de-la-route-tutor.saras-fdtta.workers.dev',
    ENDPOINT: null,
    conversationHistory: [],
    isOpen: false,
    isLoading: false,

    init() {
        // Load saved endpoint from settings or use default
        const settings = Storage.getSettings();
        this.ENDPOINT = settings.tutorEndpoint || this.DEFAULT_ENDPOINT;

        // Create chat UI (hidden by default)
        this.createChatUI();

        // Wire FAB button
        document.getElementById('tutor-fab')?.addEventListener('click', () => this.toggle());
    },

    isAvailable() {
        return this.ENDPOINT !== null && this.ENDPOINT !== '';
    },

    createChatUI() {
        // Create FAB (floating action button)
        const fab = document.createElement('button');
        fab.id = 'tutor-fab';
        fab.className = 'tutor-fab';
        fab.innerHTML = '💬';
        fab.title = 'Ask Dani (AI Tutor)';
        document.body.appendChild(fab);

        // Create chat panel
        const panel = document.createElement('div');
        panel.id = 'tutor-panel';
        panel.className = 'tutor-panel hidden';
        panel.innerHTML = `
            <div class="tutor-header">
                <div class="tutor-avatar">🎓</div>
                <div class="tutor-title">
                    <strong>Dani</strong>
                    <span>Your Driving Tutor</span>
                </div>
                <button class="tutor-close" id="tutor-close">&times;</button>
            </div>
            <div class="tutor-messages" id="tutor-messages">
                <div class="tutor-msg tutor-msg-bot">
                    <p>Salut! I'm Dani, your driving theory tutor. Ask me anything about the Code de la route!</p>
                </div>
            </div>
            <div class="tutor-input-area">
                <input type="text" id="tutor-input" placeholder="Ask about a question or topic..." autocomplete="off">
                <button class="tutor-send" id="tutor-send">→</button>
            </div>
            <div class="tutor-offline-msg hidden" id="tutor-offline-msg">
                Tutor not configured yet. Set the endpoint in Settings.
            </div>
        `;
        document.body.appendChild(panel);

        // Wire events
        document.getElementById('tutor-close').addEventListener('click', () => this.toggle());
        document.getElementById('tutor-send').addEventListener('click', () => this.sendMessage());
        document.getElementById('tutor-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    },

    toggle() {
        this.isOpen = !this.isOpen;
        const panel = document.getElementById('tutor-panel');
        const fab = document.getElementById('tutor-fab');

        if (this.isOpen) {
            panel.classList.remove('hidden');
            fab.classList.add('active');

            // Show offline message if not configured
            const offlineMsg = document.getElementById('tutor-offline-msg');
            if (!this.isAvailable()) {
                offlineMsg.classList.remove('hidden');
            } else {
                offlineMsg.classList.add('hidden');
            }

            // Focus input
            setTimeout(() => document.getElementById('tutor-input').focus(), 200);
        } else {
            panel.classList.add('hidden');
            fab.classList.remove('active');
        }
    },

    async sendMessage() {
        const input = document.getElementById('tutor-input');
        const text = input.value.trim();
        if (!text || this.isLoading) return;

        input.value = '';

        // Add user message to UI
        this.addMessage(text, 'user');

        // Add to conversation history
        this.conversationHistory.push({ role: 'user', content: text });

        if (!this.isAvailable()) {
            this.addMessage("I'm not connected yet. Ask Daniel to set up the tutor endpoint in Settings!", 'bot');
            return;
        }

        // Show loading
        this.isLoading = true;
        const loadingId = this.addMessage('...', 'bot', true);

        try {
            // Build context from current practice state
            const context = {};
            if (Practice.currentQuestion) {
                context.question = Practice.currentQuestion;
                context.userAnswer = Practice.selectedAnswers.join(', ');
                context.isCorrect = Practice.answered ?
                    Practice.selectedAnswers.sort().join(',') === [...Practice.currentQuestion.correctAnswers].sort().join(',') : null;
            }

            // Add weak topics
            const mastery = Storage.getTopicMasteryArray();
            const weak = mastery.filter(t => t.accuracy < 60 && t.totalAttempts > 0).map(t => t.nameEn);
            if (weak.length > 0) {
                context.topicMastery = weak.join(', ');
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch(this.ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: this.conversationHistory,
                    context,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            // Remove loading message
            this.removeMessage(loadingId);

            if (response.ok && data.message) {
                this.addMessage(data.message, 'bot');
                this.conversationHistory.push({ role: 'assistant', content: data.message });
            } else {
                this.addMessage(data.error || 'Something went wrong. Try again!', 'bot');
            }

        } catch (err) {
            this.removeMessage(loadingId);
            if (err.name === 'AbortError') {
                this.addMessage('Request timed out. The tutor took too long to respond. Try again!', 'bot');
            } else {
                this.addMessage('Connection error. Check your internet and try again.', 'bot');
            }
        }

        this.isLoading = false;

        // Keep history manageable
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }
    },

    addMessage(text, sender, isLoading = false) {
        const container = document.getElementById('tutor-messages');
        const msg = document.createElement('div');
        const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        msg.id = id;
        msg.className = `tutor-msg tutor-msg-${sender}${isLoading ? ' loading' : ''}`;
        msg.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
        return id;
    },

    removeMessage(id) {
        document.getElementById(id)?.remove();
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Quick-ask from explanation panel
    askAboutQuestion(question, isCorrect) {
        if (!this.isOpen) this.toggle();

        const prompt = isCorrect
            ? `Can you explain more about why ${question.correctAnswers.join(', ')} is correct for: "${question.questionEn}"?`
            : `I got this wrong: "${question.questionEn}" — Can you help me understand?`;

        document.getElementById('tutor-input').value = prompt;
        this.sendMessage();
    }
};
