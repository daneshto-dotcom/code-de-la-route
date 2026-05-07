/* ============================================
   Bug Reporter — S50 (Google Forms backend)
   Floating "Report a bug" button + modal that POSTs to a Google Form's
   /formResponse endpoint. Severity/contact/auto-context are bundled into
   one text blob and submitted as the form's single paragraph field.
   Offline reports queue in IndexedDB and retry on next online event.
   ============================================ */

const APP_VERSION = 'S50';
const QUEUE_DB_NAME = 'fdtta-bug-queue';
const QUEUE_STORE = 'reports';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfMkKaSlduvn4OrXxZOQnT8rfRfrIkFyWplwPGC6a2rzuS-Vw/formResponse';
const FORM_ENTRY = 'entry.1141707440';

const BugReporter = {
    _modal: null,
    _fab: null,

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

    _buildBlob({ ctx, severity, description, contact }) {
        const meta = `[Q: ${ctx.question_id || 'none'} | screen: ${ctx.screen} | sev: ${severity} | v: ${ctx.app_version}${contact ? ' | from: ' + contact : ''}]`;
        return `${meta}\n${description}\n\nUA: ${ctx.user_agent}\nTS: ${ctx.timestamp}`;
    },

    async submit() {
        const status = this._modal.querySelector('#bug-report-status');
        const submitBtn = this._modal.querySelector('.bug-report-submit');
        const description = this._modal.querySelector('#bug-report-description').value.trim();
        const severity = this._modal.querySelector('#bug-report-severity').value;
        const contact = this._modal.querySelector('#bug-report-contact').value.trim();

        if (!description) {
            status.textContent = 'Please describe the bug.';
            status.className = 'bug-report-status err';
            return;
        }

        submitBtn.disabled = true;
        status.textContent = 'Sending…';
        status.className = 'bug-report-status info';

        const ctx = this._captureContext();
        const blob = this._buildBlob({ ctx, severity, description, contact });

        try {
            await this._postReport(blob);
            status.textContent = 'Bug report sent. Thank you!';
            status.className = 'bug-report-status ok';
            if (typeof showToast === 'function') showToast('Bug report sent');
            setTimeout(() => this.hide(), 1200);
        } catch (e) {
            await this._enqueue(blob);
            status.textContent = 'Offline — queued. Will send when online.';
            status.className = 'bug-report-status info';
            if (typeof showToast === 'function') showToast('Bug report queued (offline)');
            setTimeout(() => this.hide(), 1500);
        } finally {
            submitBtn.disabled = false;
        }
    },

    async _postReport(blob) {
        const body = new URLSearchParams();
        body.append(FORM_ENTRY, blob);
        await fetch(FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
        });
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

    async _enqueue(blob) {
        try {
            const db = await this._openDB();
            const tx = db.transaction(QUEUE_STORE, 'readwrite');
            tx.objectStore(QUEUE_STORE).add({ blob, queued_at: Date.now() });
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
                    await this._postReport(item.blob);
                    await new Promise(r => {
                        const dreq = store.delete(item.id);
                        dreq.onsuccess = r; dreq.onerror = r;
                    });
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
