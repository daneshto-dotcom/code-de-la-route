/* ============================================
   Content Sync — Versioned Question Updates
   Checks for new question packs without redeploying
   ============================================ */

const ContentSync = {
    // Current embedded content version
    CONTENT_VERSION: 3,

    // Storage key for supplemental questions
    STORAGE_KEY: 'fdtta_supplemental_questions',
    VERSION_KEY: 'fdtta_content_version',

    // CDN manifest URL (GitHub Pages raw JSON)
    MANIFEST_URL: null, // Set via settings or auto-detect

    init() {
        // Load any previously synced supplemental questions into the bank
        this._loadSupplemental();

        // Check for updates on app start (non-blocking)
        this.checkForUpdates();
    },

    _getManifestUrl() {
        if (this.MANIFEST_URL) return this.MANIFEST_URL;
        // Auto-detect from current origin
        const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
        return `${base}/content-manifest.json`;
    },

    _loadSupplemental() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (!stored) return;

            const data = JSON.parse(stored);
            if (!Array.isArray(data.questions)) return;

            // Add to QUESTION_BANK if not already present
            const existingIds = new Set(QUESTION_BANK.map(q => q.id));
            let added = 0;
            for (const q of data.questions) {
                if (!existingIds.has(q.id)) {
                    QUESTION_BANK.push(q);
                    existingIds.add(q.id);
                    added++;
                }
            }
            if (added > 0) {
                console.log(`[ContentSync] Loaded ${added} supplemental questions from cache`);
            }
        } catch (e) {
            console.warn('[ContentSync] Failed to load supplemental questions:', e);
        }
    },

    async checkForUpdates() {
        try {
            const url = this._getManifestUrl();
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(url, {
                signal: controller.signal,
                cache: 'no-cache'
            });
            clearTimeout(timeoutId);

            if (!response.ok) return; // Manifest doesn't exist yet — that's fine

            const manifest = await response.json();
            const currentVersion = parseInt(localStorage.getItem(this.VERSION_KEY) || '0');

            if (manifest.version > currentVersion && manifest.questionsUrl) {
                await this._downloadQuestions(manifest);
            }
        } catch (e) {
            // Silently fail — offline or manifest not deployed yet
            if (e.name !== 'AbortError') {
                console.log('[ContentSync] Update check skipped:', e.message);
            }
        }
    },

    async _downloadQuestions(manifest) {
        try {
            const response = await fetch(manifest.questionsUrl, { cache: 'no-cache' });
            if (!response.ok) return;

            const data = await response.json();
            if (!Array.isArray(data.questions)) return;

            // Validate question structure
            const valid = data.questions.filter(q =>
                q.id && q.topic && q.questionFr && q.questionEn &&
                q.options && q.correctAnswers && q.explanationFr && q.explanationEn
            );

            if (valid.length === 0) return;

            // Store supplemental questions
            Storage._safeSet(this.STORAGE_KEY, JSON.stringify({
                version: manifest.version,
                downloadedAt: Date.now(),
                questions: valid
            }));
            Storage._safeSet(this.VERSION_KEY, manifest.version.toString());

            // Add to live bank
            const existingIds = new Set(QUESTION_BANK.map(q => q.id));
            let added = 0;
            for (const q of valid) {
                if (!existingIds.has(q.id)) {
                    QUESTION_BANK.push(q);
                    existingIds.add(q.id);
                    added++;
                }
            }

            if (added > 0) {
                console.log(`[ContentSync] Downloaded ${added} new questions (v${manifest.version})`);
                showToast(`${added} new questions added!`, 'success');
            }
        } catch (e) {
            console.warn('[ContentSync] Download failed:', e);
        }
    },

    // Get sync status for settings UI
    getStatus() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (!stored) {
                return { synced: false, embeddedVersion: this.CONTENT_VERSION, supplementalCount: 0 };
            }
            const data = JSON.parse(stored);
            return {
                synced: true,
                embeddedVersion: this.CONTENT_VERSION,
                supplementalVersion: data.version,
                supplementalCount: data.questions?.length || 0,
                downloadedAt: data.downloadedAt
            };
        } catch (e) {
            return { synced: false, embeddedVersion: this.CONTENT_VERSION, supplementalCount: 0 };
        }
    }
};
