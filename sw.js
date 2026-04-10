/* ============================================
   Service Worker — Offline Support
   ============================================ */

const CACHE_NAME = 'code-de-la-route-v33';

// Use relative paths so caching works on GitHub Pages subdirectory (/code-de-la-route/)
const URLS_TO_CACHE = [
    './',
    './index.html',
    './css/styles.css',
    './css/components.css',
    './css/animations.css',
    './js/data.js',
    './js/signs.js',
    './js/intersections.js',
    './js/knowledge.js',
    './js/questions.js',
    './js/storage.js',
    './js/tts.js',
    './js/diagnostic.js',
    './js/practice.js',
    './js/exam.js',
    './js/progress.js',
    './js/vocab-data.js',
    './js/vocab-audio.js',
    './js/vocab.js',
    './js/achievements.js',
    './js/challenges.js',
    './js/content-sync.js',
    './js/notifications.js',
    './js/tutor.js',
    './js/app.js',
    './manifest.json',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/audio/vocab/agglomeration.mp3',
    './assets/audio/vocab/priorite-a-droite.mp3',
    './assets/audio/vocab/cedez-le-passage.mp3',
    './assets/audio/vocab/feu-tricolore.mp3',
    './assets/audio/vocab/rond-point.mp3',
    './assets/audio/vocab/depassement.mp3',
    './assets/audio/vocab/ligne-continue.mp3',
    './assets/audio/vocab/ligne-discontinue.mp3',
    './assets/audio/vocab/sens-interdit.mp3',
    './assets/audio/vocab/stationnement-interdit.mp3',
    './assets/audio/vocab/arret-interdit.mp3',
    './assets/audio/vocab/passage-pieton.mp3',
    './assets/audio/vocab/piste-cyclable.mp3',
    './assets/audio/vocab/voie-de-circulation.mp3',
    './assets/audio/vocab/vitesse-maximale.mp3',
    './assets/audio/vocab/distance-de-securite.mp3',
    './assets/audio/vocab/distance-de-freinage.mp3',
    './assets/audio/vocab/freinage-d-urgence.mp3',
    './assets/audio/vocab/aquaplaning.mp3',
    './assets/audio/vocab/verglas.mp3',
    './assets/audio/vocab/brouillard.mp3',
    './assets/audio/vocab/feux-de-croisement.mp3',
    './assets/audio/vocab/feux-de-route.mp3',
    './assets/audio/vocab/feux-de-detresse.mp3',
    './assets/audio/vocab/feux-de-position.mp3',
    './assets/audio/vocab/ceinture-de-securite.mp3',
    './assets/audio/vocab/permis-probatoire.mp3',
    './assets/audio/vocab/controle-technique.mp3',
    './assets/audio/vocab/constat-amiable.mp3',
    './assets/audio/vocab/taux-d-alcoolemie.mp3',
    './assets/audio/vocab/ethylotest.mp3',
    './assets/audio/vocab/gilet-reflechissant.mp3',
    './assets/audio/vocab/triangle-de-presignalisation.mp3',
    './assets/audio/vocab/passage-a-niveau.mp3',
    './assets/audio/vocab/tunnel.mp3',
    './assets/audio/vocab/autoroute.mp3',
    './assets/audio/vocab/chaussee.mp3',
    './assets/audio/vocab/trottoir.mp3',
    './assets/audio/vocab/carrefour.mp3',
    './assets/audio/vocab/virage.mp3',
    './assets/audio/vocab/ralentisseur.mp3',
    './assets/audio/vocab/panneau-de-signalisation.mp3',
    './assets/audio/vocab/amende.mp3',
    './assets/audio/vocab/retrait-de-points.mp3',
    './assets/audio/vocab/conduite-accompagnee.mp3',
    './assets/audio/vocab/eco-conduite.mp3',
    './assets/audio/vocab/angle-mort.mp3',
    './assets/audio/vocab/champ-de-vision.mp3',
    './assets/audio/vocab/klaxon.mp3',
    './assets/audio/vocab/retroviseur.mp3'
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

// Fetch — stale-while-revalidate for app assets, network-first for API calls
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

    // Stale-while-revalidate: serve from cache immediately, update cache in background
    // This ensures users always see the app fast BUT get updates on next visit
    event.respondWith(
        caches.open(CACHE_NAME).then(cache =>
            cache.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => cachedResponse);

                return cachedResponse || fetchPromise;
            })
        )
    );
});
