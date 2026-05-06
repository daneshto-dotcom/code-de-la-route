/* ============================================
   Bug Reporter — S49-P6
   Floating "Report a bug" button + modal that POSTs to a Google Apps
   Script Web App (user-deployed). Optional html2canvas screenshot.
   Offline reports queue in IndexedDB and retry on next online event.
   ============================================ */

const APP_VERSION = 'S49';
const QUEUE_DB_NAME = 'fdtta-bug-queue';
const QUEUE_STORE = 'reports';
const HTML2CANVAS_CDN = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';

const BugReporter = {
    _modal: null,
    _fab: null,
    _html2canvasReady: false,
    _html2canvasLoading: null,

    init() {
        this._fab = document.getElementById('bug-report-fab');
        this._modal = document.getElementById('bug-report-modal');
        if (!this._fab || !this._modal) {
            console.warn('BugReporter: FAB or modal element missing in DOM');
            return;
        }
        this._fab.addEventListener('click', () => this.show());
        this._modal.querySelector('.bug-report-close')?.addEventListener('click', () => this.hide());
        this._modal.querySelector('.bug-report-cancel')?.addEventListener('click', () => this.hide());
        this._modal.querySelector('.bug-report-submit')?.addEventListener('click', () => this.submit());
        this._modal.addEventListener('click', (e) => {
            if (e.target === this._modal) this.hide();
        });
        window.addEventListener('online', () => this.flushQueue());
        if (navigator.onLine) setTimeout(() => this.flushQueue(), 3000);
    },

    show() {
        if (!this._modal) return;
        const ctx = this._captureContext();
        this._modal.querySelector('.bug-report-context-screen').textContent = ctx.screen;
        this._modal.querySelector('.bug-report-context-question').textContent = ctx.question_id || '(none)';
        this._modal.querySelector('.bug-report-context-version').textContent = ctx.app_version;
        this._modal.querySelector('#bug-report-description').value = '';
        this._modal.querySelector('#bug-report-severity').value = 'Bug';
        this._modal.querySelector('#bug-report-screenshot').checked = true;
        this._modal.querySelector('#bug-report-status').textContent = '';
        this._modal.classList.remove('hidden');
        setTimeout(() => this._modal.querySelector('#bug-report-description').focus(), 50);
    },

    hide() {
        if (this._modal) this._modal.classList.add('hidden');
    },

    _captureContext() {
        const screen = document.querySelector('.page:not(.hidden)')?.id || 'unknown';
        let question_id = '';
        try {
            if (typeof Practice !== 'undefined' && Practice.sessionQuestions && Practice.sessionQuestions[Practice.sessionIndex]) {
                question_id = Practice.sessionQuestions[Practice.sessionIndex].id;
            } else if (typeof Exam !== 'undefined' && Exam.questions && Exam.questions[Exam.currentIndex]) {
                question_id = Exam.questions[Exam.currentIndex].id;
            }
        } catch (e) { /* best effort */ }
        return {
            screen,
            question_id,
            app_version: APP_VERSION,
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
    },

    async _ensureHtml2Canvas() {
        if (this._html2canvasReady) return true;
        if (this._html2canvasLoading) return this._html2canvasLoading;
        this._html2canvasLoading = new Promise((resolve) => {
            const s = document.createElement('script');
            s.src = HTML2CANVAS_CDN;
            s.onload = () => { this._html2canvasReady = true; resolve(true); };
            s.onerror = () => { resolve(false); };
            document.head.appendChild(s);
        });
        return this._html2canvasLoading;
    },

    async _captureScreenshot() {
        const ok = await this._ensureHtml2Canvas();
        if (!ok || typeof html2canvas !== 'function') return null;
        try {
            const canvas = await html2canvas(document.body, {
                useCORS: true,
                logging: false,
                scale: 0.6,
                ignoreElements: (el) => el.id === 'bug-report-modal' || el.id === 'bug-report-fab'
            });
            return canvas.toDataURL('image/png', 0.7);
        } catch (e) {
            console.warn('Screenshot capture failed:', e);
            return null;
        }
    },

    async submit() {
        const status = this._modal.querySelector('#bug-report-status');
        const submitBtn = this._modal.querySelector('.bug-report-submit');
        const description = this._modal.querySelector('#bug-report-description').value.trim();
        const severity = this._modal.querySelector('#bug-report-severity').value;
        const includeScreenshot = this._modal.querySelector('#bug-report-screenshot').checked;
        const contact = this._modal.querySelector('#bug-report-contact').value.trim();

        if (!description) {
            status.textContent = 'Please describe the bug.';
            status.className = 'bug-report-status err';
            return;
        }
        const endpoint = this._getEndpoint();
        if (!endpoint) {
            status.textContent = 'Bug reporter not configured. Settings → Bug reporter endpoint.';
            status.className = 'bug-report-status err';
            return;
        }

        submitBtn.disabled = true;
        status.textContent = includeScreenshot ? 'Capturing screenshot…' : 'Sending…';
        status.className = 'bug-report-status info';

        const ctx = this._captureContext();
        const payload = {
            ...ctx,
            severity,
            description,
            contact,
            screenshot_base64: null
        };

        if (includeScreenshot) {
            payload.screenshot_base64 = await this._captureScreenshot();
            status.textContent = 'Sending…';
        }

        try {
            const result = await this._postReport(endpoint, payload);
            if (result && result.ok) {
                status.textContent = 'Bug report sent. Thank you!';
                status.className = 'bug-report-status ok';
                if (typeof showToast === 'function') showToast('Bug report sent');
                setTimeout(() => this.hide(), 1200);
            } else {
                throw new Error(result?.error || 'Server returned not-ok');
            }
        } catch (e) {
            await this._enqueue(endpoint, payload);
            status.textContent = 'Offline — queued. Will send when online.';
            status.className = 'bug-report-status info';
            if (typeof showToast === 'function') showToast('Bug report queued (offline)');
            setTimeout(() => this.hide(), 1500);
        } finally {
            submitBtn.disabled = false;
        }
    },

    _getEndpoint() {
        try {
            return Storage.getSettings().bugReporterEndpoint || null;
        } catch (e) { return null; }
    },

    async _postReport(endpoint, payload) {
        const resp = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(payload)
        });
        return await resp.json();
    },

    _openDB() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(QUEUE_DB_NAME, 1);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(QUEUE_STORE)) {
                    db.createObjectStore(QUEUE_STORE, { keyPath: 'id', autoIncrement: true });
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },

    async _enqueue(endpoint, payload) {
        try {
            const db = await this._openDB();
            const tx = db.transaction(QUEUE_STORE, 'readwrite');
            tx.objectStore(QUEUE_STORE).add({ endpoint, payload, queued_at: Date.now() });
            return new Promise(r => tx.oncomplete = r);
        } catch (e) { console.warn('Queue write failed:', e); }
    },

    async flushQueue() {
        if (!navigator.onLine) return;
        try {
            const db = await this._openDB();
            const tx = db.transaction(QUEUE_STORE, 'readwrite');
            const store = tx.objectStore(QUEUE_STORE);
            const items = await new Promise(r => {
                const req = store.getAll();
                req.onsuccess = () => r(req.result || []);
                req.onerror = () => r([]);
            });
            for (const item of items) {
                try {
                    const result = await this._postReport(item.endpoint, item.payload);
                    if (result && result.ok) {
                        await new Promise(r => {
                            const dreq = store.delete(item.id);
                            dreq.onsuccess = r; dreq.onerror = r;
                        });
                    }
                } catch (e) { /* leave in queue, retry next time */ }
            }
        } catch (e) { /* silent — best effort */ }
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BugReporter.init());
} else {
    BugReporter.init();
}
