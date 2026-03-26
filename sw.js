/* ============================================
   Service Worker — Offline Support
   ============================================ */

const CACHE_NAME = 'code-de-la-route-v3';

// Use relative paths so caching works on GitHub Pages subdirectory (/code-de-la-route/)
const URLS_TO_CACHE = [
    './',
    './index.html',
    './css/styles.css',
    './css/components.css',
    './css/animations.css',
    './js/data.js',
    './js/questions.js',
    './js/storage.js',
    './js/tts.js',
    './js/diagnostic.js',
    './js/practice.js',
    './js/exam.js',
    './js/progress.js',
    './js/tutor.js',
    './js/app.js',
    './manifest.json'
];

// Install — cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch — cache-first strategy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => caches.match('./index.html'))
    );
});
