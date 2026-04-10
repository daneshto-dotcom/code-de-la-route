/* ============================================
   Service Worker — Offline Support
   ============================================ */

const CACHE_NAME = 'code-de-la-route-v45';

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
    './assets/audio/vocab/retroviseur.mp3',
    // Batch 2: 55 new words (Session 21)
    './assets/audio/vocab/arret.mp3',
    './assets/audio/vocab/voie.mp3',
    './assets/audio/vocab/panne.mp3',
    './assets/audio/vocab/stationnement.mp3',
    './assets/audio/vocab/panneau.mp3',
    './assets/audio/vocab/pieton.mp3',
    './assets/audio/vocab/obligation.mp3',
    './assets/audio/vocab/depasser.mp3',
    './assets/audio/vocab/intersection.mp3',
    './assets/audio/vocab/signalisation.mp3',
    './assets/audio/vocab/klaxonner.mp3',
    './assets/audio/vocab/ralentir.mp3',
    './assets/audio/vocab/interdiction.mp3',
    './assets/audio/vocab/secours.mp3',
    './assets/audio/vocab/visibilite.mp3',
    './assets/audio/vocab/croisement.mp3',
    './assets/audio/vocab/barriere.mp3',
    './assets/audio/vocab/stationner.mp3',
    './assets/audio/vocab/cycliste.mp3',
    './assets/audio/vocab/assurance.mp3',
    './assets/audio/vocab/clignotant.mp3',
    './assets/audio/vocab/zone-30.mp3',
    './assets/audio/vocab/permis-de-conduire.mp3',
    './assets/audio/vocab/en-agglomeration.mp3',
    './assets/audio/vocab/ceder-le-passage.mp3',
    './assets/audio/vocab/franchir.mp3',
    './assets/audio/vocab/tramway.mp3',
    './assets/audio/vocab/poids-lourd.mp3',
    './assets/audio/vocab/feu-rouge.mp3',
    './assets/audio/vocab/convoi.mp3',
    './assets/audio/vocab/reculer.mp3',
    './assets/audio/vocab/feux-de-brouillard.mp3',
    './assets/audio/vocab/carte-grise.mp3',
    './assets/audio/vocab/proteger.mp3',
    './assets/audio/vocab/route-prioritaire.mp3',
    './assets/audio/vocab/hors-agglomeration.mp3',
    './assets/audio/vocab/secourir.mp3',
    './assets/audio/vocab/peage.mp3',
    './assets/audio/vocab/fatigue.mp3',
    './assets/audio/vocab/sens-unique.mp3',
    './assets/audio/vocab/demi-tour.mp3',
    './assets/audio/vocab/distance-laterale.mp3',
    './assets/audio/vocab/manoeuvre.mp3',
    './assets/audio/vocab/remorque.mp3',
    './assets/audio/vocab/zone-de-rencontre.mp3',
    './assets/audio/vocab/incendie.mp3',
    './assets/audio/vocab/accotement.mp3',
    './assets/audio/vocab/giratoire.mp3',
    './assets/audio/vocab/contravention.mp3',
    './assets/audio/vocab/immatriculation.mp3',
    './assets/audio/vocab/priorite-absolue.mp3',
    './assets/audio/vocab/limitation-de-vitesse.mp3',
    './assets/audio/vocab/zigzag.mp3',
    './assets/audio/vocab/vehicule-prioritaire.mp3',
    './assets/audio/vocab/bande-d-arret-d-urgence.mp3',
    // Batch 3: 50 new words (Session 21b)
    './assets/audio/vocab/par-la-droite.mp3',
    './assets/audio/vocab/par-la-gauche.mp3',
    './assets/audio/vocab/alerter.mp3',
    './assets/audio/vocab/panneau-rond.mp3',
    './assets/audio/vocab/voie-de-gauche.mp3',
    './assets/audio/vocab/faire-demi-tour.mp3',
    './assets/audio/vocab/stationnement-payant.mp3',
    './assets/audio/vocab/triangulaire.mp3',
    './assets/audio/vocab/cote-droit.mp3',
    './assets/audio/vocab/eclaire.mp3',
    './assets/audio/vocab/cote.mp3',
    './assets/audio/vocab/bord-rouge.mp3',
    './assets/audio/vocab/ligne-jaune.mp3',
    './assets/audio/vocab/bus-scolaire.mp3',
    './assets/audio/vocab/zone-de-travaux.mp3',
    './assets/audio/vocab/voie-de-droite.mp3',
    './assets/audio/vocab/taux-d-alcool.mp3',
    './assets/audio/vocab/alternat.mp3',
    './assets/audio/vocab/gyrophare.mp3',
    './assets/audio/vocab/impasse.mp3',
    './assets/audio/vocab/voie-publique.mp3',
    './assets/audio/vocab/signalisation-temporaire.mp3',
    './assets/audio/vocab/route-nationale.mp3',
    './assets/audio/vocab/double-file.mp3',
    './assets/audio/vocab/frein-a-main.mp3',
    './assets/audio/vocab/sirene.mp3',
    './assets/audio/vocab/sens-de-circulation.mp3',
    './assets/audio/vocab/voie-reservee.mp3',
    './assets/audio/vocab/delit.mp3',
    './assets/audio/vocab/periode-probatoire.mp3',
    './assets/audio/vocab/voie-du-milieu.mp3',
    './assets/audio/vocab/attestation-d-assurance.mp3',
    './assets/audio/vocab/numero-d-urgence.mp3',
    './assets/audio/vocab/losange.mp3',
    './assets/audio/vocab/feu-orange.mp3',
    './assets/audio/vocab/signalisation-permanente.mp3',
    './assets/audio/vocab/horodateur.mp3',
    './assets/audio/vocab/zone-bleue.mp3',
    './assets/audio/vocab/temps-de-pluie.mp3',
    './assets/audio/vocab/alcoolemie.mp3',
    './assets/audio/vocab/descendant.mp3',
    './assets/audio/vocab/passage-etroit.mp3',
    './assets/audio/vocab/route-etroite.mp3',
    './assets/audio/vocab/pression-des-pneus.mp3',
    './assets/audio/vocab/disque-de-stationnement.mp3',
    './assets/audio/vocab/suspension-du-permis.mp3',
    './assets/audio/vocab/exces-de-vitesse.mp3',
    './assets/audio/vocab/chevron.mp3',
    './assets/audio/vocab/disque-a.mp3',
    './assets/audio/vocab/fond-bleu.mp3',
    // Batch 4: 50 new words (Session 22)
    './assets/audio/vocab/usager-vulnerable.mp3',
    './assets/audio/vocab/panneau-d-obligation.mp3',
    './assets/audio/vocab/panneau-de-danger.mp3',
    './assets/audio/vocab/se-rabattre.mp3',
    './assets/audio/vocab/en-amont.mp3',
    './assets/audio/vocab/voie-ferree.mp3',
    './assets/audio/vocab/issue-de-secours.mp3',
    './assets/audio/vocab/stage-de-sensibilisation.mp3',
    './assets/audio/vocab/gilet-de-haute-visibilite.mp3',
    './assets/audio/vocab/feu-orange-clignotant.mp3',
    './assets/audio/vocab/route-de-montagne.mp3',
    './assets/audio/vocab/panneau-directionnel.mp3',
    './assets/audio/vocab/somnolence.mp3',
    './assets/audio/vocab/borne-de-recharge.mp3',
    './assets/audio/vocab/sens-de-la-circulation.mp3',
    './assets/audio/vocab/vehicule-electrique.mp3',
    './assets/audio/vocab/passage-pietons.mp3',
    './assets/audio/vocab/s-engager.mp3',
    './assets/audio/vocab/permis-a-points.mp3',
    './assets/audio/vocab/telephone-tenu-en-main.mp3',
    './assets/audio/vocab/depassement-par-la-droite.mp3',
    './assets/audio/vocab/sommet-de-cote.mp3',
    './assets/audio/vocab/virage-sans-visibilite.mp3',
    './assets/audio/vocab/consommation-de-carburant.mp3',
    './assets/audio/vocab/frein-moteur.mp3',
    './assets/audio/vocab/vignette-crit-air.mp3',
    './assets/audio/vocab/agent-de-police.mp3',
    './assets/audio/vocab/arret-complet.mp3',
    './assets/audio/vocab/ligne-d-arret.mp3',
    './assets/audio/vocab/retrecissement-de-chaussee.mp3',
    './assets/audio/vocab/panneau-de-direction.mp3',
    './assets/audio/vocab/route-departementale.mp3',
    './assets/audio/vocab/voie-de-deceleration.mp3',
    './assets/audio/vocab/panneau-d-interdiction.mp3',
    './assets/audio/vocab/cle-sur-le-contact.mp3',
    './assets/audio/vocab/feux-rouges-clignotants.mp3',
    './assets/audio/vocab/sortie-de-secours.mp3',
    './assets/audio/vocab/pause.mp3',
    './assets/audio/vocab/pictogramme.mp3',
    './assets/audio/vocab/arrete-municipal.mp3',
    './assets/audio/vocab/bouche-d-incendie.mp3',
    './assets/audio/vocab/braquer-les-roues.mp3',
    './assets/audio/vocab/carte-mobilite-inclusion.mp3',
    './assets/audio/vocab/place-handicapee.mp3',
    './assets/audio/vocab/stationnement-tres-genant.mp3',
    './assets/audio/vocab/autobus-scolaire.mp3',
    './assets/audio/vocab/canne-blanche.mp3',
    './assets/audio/vocab/mise-en-fourriere.mp3',
    './assets/audio/vocab/contre-visite.mp3',
    './assets/audio/vocab/deviation.mp3',
    // Sign images (Imagen 4 compressed WebP)
    './assets/images/signs/stop-sign.webp',
    './assets/images/signs/yield-sign.webp',
    './assets/images/signs/no-entry-sign.webp',
    './assets/images/signs/speed-limit-50.webp',
    './assets/images/signs/no-overtaking-sign.webp',
    './assets/images/signs/pedestrian-crossing-sign.webp',
    './assets/images/signs/priority-road-sign.webp',
    // Batch 2: 8 new signs (Session 22)
    './assets/images/signs/one-way-sign.webp',
    './assets/images/signs/no-parking-sign.webp',
    './assets/images/signs/mandatory-direction-sign.webp',
    './assets/images/signs/roundabout-sign.webp',
    './assets/images/signs/no-u-turn-sign.webp',
    './assets/images/signs/road-narrows-sign.webp',
    './assets/images/signs/no-stopping-sign.webp',
    './assets/images/signs/end-priority-road-sign.webp'
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
