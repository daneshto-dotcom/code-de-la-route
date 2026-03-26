/* ============================================
   Official ETG Topics & Constants
   ============================================ */

const ETG_TOPICS = [
    { id: 'circulation', nameFr: 'La circulation routière', nameEn: 'Traffic Rules', icon: '🚦', examWeight: 5 },
    { id: 'conducteur', nameFr: 'Le conducteur', nameEn: 'The Driver', icon: '🧑', examWeight: 5 },
    { id: 'route', nameFr: 'La route', nameEn: 'The Road', icon: '🛣️', examWeight: 4 },
    { id: 'autres_usagers', nameFr: 'Les autres usagers', nameEn: 'Other Road Users', icon: '🚶', examWeight: 4 },
    { id: 'priorite', nameFr: 'Règles de priorité', nameEn: 'Priority Rules', icon: '⚠️', examWeight: 5 },
    { id: 'croisement_depassement', nameFr: 'Croisement et dépassement', nameEn: 'Meeting & Overtaking', icon: '🔀', examWeight: 4 },
    { id: 'arret_stationnement', nameFr: "L'arrêt et le stationnement", nameEn: 'Stopping & Parking', icon: '🅿️', examWeight: 3 },
    { id: 'tunnels_passages_niveau', nameFr: 'Tunnels et passages à niveau', nameEn: 'Tunnels & Level Crossings', icon: '🚇', examWeight: 2 },
    { id: 'signalisation', nameFr: 'Signalisation', nameEn: 'Road Signs & Signals', icon: '🪧', examWeight: 5 },
    { id: 'notions_diverses', nameFr: 'Notions diverses', nameEn: 'Miscellaneous', icon: '📋', examWeight: 3 }
];

const MASTERY_LEVELS = [
    { id: 'novice', label: 'Novice', minAccuracy: 0, minAttempts: 0, color: '#E57373' },
    { id: 'learning', label: 'Learning', minAccuracy: 50, minAttempts: 5, color: '#FF9800' },
    { id: 'competent', label: 'Competent', minAccuracy: 70, minAttempts: 15, color: '#FDD835' },
    { id: 'proficient', label: 'Proficient', minAccuracy: 85, minAttempts: 25, color: '#42A5F5' },
    { id: 'mastered', label: 'Mastered', minAccuracy: 95, minAttempts: 40, color: '#4CAF50' }
];

function getMasteryLevel(accuracy, attempts) {
    if (attempts < 5 || accuracy < 50) return MASTERY_LEVELS[0];
    if (accuracy < 70) return MASTERY_LEVELS[1];
    if (accuracy < 85) return MASTERY_LEVELS[2];
    if (accuracy < 95 || attempts < 40) return MASTERY_LEVELS[3];
    return MASTERY_LEVELS[4];
}

function getMasteryColor(accuracy, attempts) {
    return getMasteryLevel(accuracy, attempts).color;
}

const EXAM_PASS_THRESHOLD = 35;
const EXAM_TOTAL_QUESTIONS = 40;
const EXAM_TIMER_SECONDS = 20;
const NATIONAL_PASS_RATE = 50.7;
