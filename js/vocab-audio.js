/* ============================================
   Vocabulary Audio — Pronunciation Manifest
   50 key driving terms with TTS audio
   Generated via GCP Chirp 3 HD (fr-FR)
   ============================================ */

const VOCAB_AUDIO = {
  "agglomération": "assets/audio/vocab/agglomeration.mp3",
  "priorité à droite": "assets/audio/vocab/priorite-a-droite.mp3",
  "cédez le passage": "assets/audio/vocab/cedez-le-passage.mp3",
  "cedez le passage": "assets/audio/vocab/cedez-le-passage.mp3",
  "feu tricolore": "assets/audio/vocab/feu-tricolore.mp3",
  "rond-point": "assets/audio/vocab/rond-point.mp3",
  "dépassement": "assets/audio/vocab/depassement.mp3",
  "depassement": "assets/audio/vocab/depassement.mp3",
  "ligne continue": "assets/audio/vocab/ligne-continue.mp3",
  "ligne discontinue": "assets/audio/vocab/ligne-discontinue.mp3",
  "sens interdit": "assets/audio/vocab/sens-interdit.mp3",
  "stationnement interdit": "assets/audio/vocab/stationnement-interdit.mp3",
  "arrêt interdit": "assets/audio/vocab/arret-interdit.mp3",
  "arret interdit": "assets/audio/vocab/arret-interdit.mp3",
  "passage piéton": "assets/audio/vocab/passage-pieton.mp3",
  "passage pieton": "assets/audio/vocab/passage-pieton.mp3",
  "piste cyclable": "assets/audio/vocab/piste-cyclable.mp3",
  "voie de circulation": "assets/audio/vocab/voie-de-circulation.mp3",
  "vitesse maximale": "assets/audio/vocab/vitesse-maximale.mp3",
  "distance de sécurité": "assets/audio/vocab/distance-de-securite.mp3",
  "distance de securite": "assets/audio/vocab/distance-de-securite.mp3",
  "distance de freinage": "assets/audio/vocab/distance-de-freinage.mp3",
  "freinage d'urgence": "assets/audio/vocab/freinage-d-urgence.mp3",
  "aquaplaning": "assets/audio/vocab/aquaplaning.mp3",
  "verglas": "assets/audio/vocab/verglas.mp3",
  "brouillard": "assets/audio/vocab/brouillard.mp3",
  "feux de croisement": "assets/audio/vocab/feux-de-croisement.mp3",
  "feux de route": "assets/audio/vocab/feux-de-route.mp3",
  "feux de détresse": "assets/audio/vocab/feux-de-detresse.mp3",
  "feux de detresse": "assets/audio/vocab/feux-de-detresse.mp3",
  "feux de position": "assets/audio/vocab/feux-de-position.mp3",
  "ceinture de sécurité": "assets/audio/vocab/ceinture-de-securite.mp3",
  "ceinture de securite": "assets/audio/vocab/ceinture-de-securite.mp3",
  "permis probatoire": "assets/audio/vocab/permis-probatoire.mp3",
  "contrôle technique": "assets/audio/vocab/controle-technique.mp3",
  "controle technique": "assets/audio/vocab/controle-technique.mp3",
  "constat amiable": "assets/audio/vocab/constat-amiable.mp3",
  "taux d'alcoolémie": "assets/audio/vocab/taux-d-alcoolemie.mp3",
  "taux d'alcoolemie": "assets/audio/vocab/taux-d-alcoolemie.mp3",
  "éthylotest": "assets/audio/vocab/ethylotest.mp3",
  "ethylotest": "assets/audio/vocab/ethylotest.mp3",
  "gilet réfléchissant": "assets/audio/vocab/gilet-reflechissant.mp3",
  "gilet reflechissant": "assets/audio/vocab/gilet-reflechissant.mp3",
  "triangle de présignalisation": "assets/audio/vocab/triangle-de-presignalisation.mp3",
  "triangle de presignalisation": "assets/audio/vocab/triangle-de-presignalisation.mp3",
  "passage à niveau": "assets/audio/vocab/passage-a-niveau.mp3",
  "passage a niveau": "assets/audio/vocab/passage-a-niveau.mp3",
  "tunnel": "assets/audio/vocab/tunnel.mp3",
  "autoroute": "assets/audio/vocab/autoroute.mp3",
  "chaussée": "assets/audio/vocab/chaussee.mp3",
  "chaussee": "assets/audio/vocab/chaussee.mp3",
  "trottoir": "assets/audio/vocab/trottoir.mp3",
  "carrefour": "assets/audio/vocab/carrefour.mp3",
  "virage": "assets/audio/vocab/virage.mp3",
  "ralentisseur": "assets/audio/vocab/ralentisseur.mp3",
  "panneau de signalisation": "assets/audio/vocab/panneau-de-signalisation.mp3",
  "amende": "assets/audio/vocab/amende.mp3",
  "retrait de points": "assets/audio/vocab/retrait-de-points.mp3",
  "conduite accompagnée": "assets/audio/vocab/conduite-accompagnee.mp3",
  "conduite accompagnee": "assets/audio/vocab/conduite-accompagnee.mp3",
  "éco-conduite": "assets/audio/vocab/eco-conduite.mp3",
  "eco-conduite": "assets/audio/vocab/eco-conduite.mp3",
  "angle mort": "assets/audio/vocab/angle-mort.mp3",
  "champ de vision": "assets/audio/vocab/champ-de-vision.mp3",
  "klaxon": "assets/audio/vocab/klaxon.mp3",
  "rétroviseur": "assets/audio/vocab/retroviseur.mp3",
  "retroviseur": "assets/audio/vocab/retroviseur.mp3"
};

// Audio player singleton
const VocabAudio = {
  _audio: null,
  _cache: {},

  hasAudio(wordFr) {
    const key = wordFr.toLowerCase();
    return key in VOCAB_AUDIO;
  },

  play(wordFr) {
    const key = wordFr.toLowerCase();
    const path = VOCAB_AUDIO[key];
    if (!path) return false;

    if (this._audio) {
      this._audio.pause();
      this._audio.currentTime = 0;
    }

    if (this._cache[path]) {
      this._audio = this._cache[path];
    } else {
      this._audio = new Audio(path);
      this._cache[path] = this._audio;
    }

    this._audio.play().catch(() => {
      // Silently fail if audio can't play (e.g., no user interaction yet)
    });
    return true;
  }
};
