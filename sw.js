/* ============================================
   Service Worker — Offline Support
   ============================================ */

const CACHE_NAME = 'code-de-la-route-v6';

// Use relative paths so caching works on GitHub Pages subdirectory (/code-de-la-route/)
const URLS_TO_CACHE = [
    './',
    './index.html',
    './css/styles.css',
    './css/components.css',
    './css/animations.css',
    './js/data.js',
    './js/signs.js',
    './js/questions.js',
    './js/storage.js',
    './js/tts.js',
    './js/diagnostic.js',
    './js/practice.js',
    './js/exam.js',
    './js/progress.js',
    './js/vocab.js',
    './js/tutor.js',
    './js/app.js',
    './manifest.json',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png'
];

// Install — cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate — clean old caches and notify clients of update
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => {
            // Notify all clients that a new version is available
            self.clients.matchAll().then(clients => {
                clients.forEach(client => client.postMessage({ type: 'SW_UPDATED', version: CACHE_NAME }));
            });
            return self.clients.claim();
        })
    );
});

// Fetch — cache-first for app assets, network-first for API calls
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Network-first for tutor API calls
    if (url.hostname.includes('workers.dev')) {
        event.respondWith(
            fetch(event.request).catch(() =>
                new Response(JSON.stringify({ error: 'You are offline. The tutor is not available without internet.' }), {
                    headers: { 'Content-Type': 'application/json' }
                })
            )
        );
        return;
    }

    // Cache-first for everything else
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => caches.match('./index.html'))
    );
});
