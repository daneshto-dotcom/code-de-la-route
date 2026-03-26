/* ============================================
   Text-to-Speech Service
   French pronunciation support
   ============================================ */

const TTS = {
    synth: window.speechSynthesis,
    frenchVoice: null,
    speaking: false,

    init() {
        // Wait for voices to load
        if (this.synth.getVoices().length > 0) {
            this.findFrenchVoice();
        }
        this.synth.onvoiceschanged = () => this.findFrenchVoice();
    },

    findFrenchVoice() {
        const voices = this.synth.getVoices();
        // Prefer French voices
        this.frenchVoice = voices.find(v => v.lang === 'fr-FR' && v.localService) ||
                           voices.find(v => v.lang === 'fr-FR') ||
                           voices.find(v => v.lang.startsWith('fr')) ||
                           null;
    },

    speak(text, lang = 'fr-FR') {
        if (!Storage.getSettings().ttsEnabled) return;

        this.stop();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = parseFloat(Storage.getSettings().ttsSpeed) || 1.0;
        utterance.pitch = 1.0;

        if (lang === 'fr-FR' && this.frenchVoice) {
            utterance.voice = this.frenchVoice;
        }

        utterance.onstart = () => {
            this.speaking = true;
            document.getElementById('tts-play-btn')?.classList.add('speaking');
        };

        utterance.onend = () => {
            this.speaking = false;
            document.getElementById('tts-play-btn')?.classList.remove('speaking');
        };

        utterance.onerror = () => {
            this.speaking = false;
            document.getElementById('tts-play-btn')?.classList.remove('speaking');
        };

        this.synth.speak(utterance);
    },

    speakQuestion(question) {
        this.speak(question.questionFr, 'fr-FR');
    },

    speakOption(text) {
        this.speak(text, 'fr-FR');
    },

    stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        this.speaking = false;
        document.getElementById('tts-play-btn')?.classList.remove('speaking');
    },

    testFrench() {
        this.speak("Bienvenue ! Cette application va vous aider à préparer le Code de la route.", 'fr-FR');
    },

    isAvailable() {
        return 'speechSynthesis' in window;
    },

    hasFrenchVoice() {
        return this.frenchVoice !== null;
    }
};
