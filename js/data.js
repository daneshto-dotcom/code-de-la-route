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
const EXAM_TIMER_SECONDS = 25;
const EXAM_TOTAL_TIME = 1800; // 30 minutes in seconds
const NATIONAL_PASS_RATE = 50.7;

/* ============================================
   Achievements & Gamification
   ============================================ */

const ACHIEVEMENTS = [
    // Streak achievements
    { id: 'streak_3', title: 'Getting Started', desc: '3-day study streak', icon: '🔥', category: 'streak', trigger: 'streak', value: 3 },
    { id: 'streak_7', title: 'Week Warrior', desc: '7-day study streak', icon: '🔥', category: 'streak', trigger: 'streak', value: 7 },
    { id: 'streak_14', title: 'Fortnight Focus', desc: '14-day study streak', icon: '🔥', category: 'streak', trigger: 'streak', value: 14 },
    { id: 'streak_30', title: 'Monthly Master', desc: '30-day study streak', icon: '🔥', category: 'streak', trigger: 'streak', value: 30 },

    // Practice achievements
    { id: 'first_question', title: 'First Steps', desc: 'Answer your first question', icon: '👣', category: 'practice', trigger: 'attempts', value: 1 },
    { id: 'questions_100', title: 'Century', desc: 'Answer 100 questions', icon: '💯', category: 'practice', trigger: 'attempts', value: 100 },
    { id: 'questions_500', title: 'Dedicated', desc: 'Answer 500 questions', icon: '📚', category: 'practice', trigger: 'attempts', value: 500 },
    { id: 'perfect_topic', title: 'Topic Ace', desc: '100% accuracy on any topic (10+ attempts)', icon: '🎯', category: 'practice', trigger: 'perfect_topic', value: 10 },

    // Exam achievements
    { id: 'first_exam', title: 'Exam Debut', desc: 'Complete your first mock exam', icon: '📝', category: 'exam', trigger: 'exams', value: 1 },
    { id: 'first_pass', title: 'Passed!', desc: 'Pass a mock exam (35/40)', icon: '🎉', category: 'exam', trigger: 'exam_pass', value: 1 },
    { id: 'three_passes', title: 'Consistent', desc: 'Pass 3 mock exams', icon: '🏆', category: 'exam', trigger: 'exam_pass', value: 3 },
    { id: 'perfect_exam', title: 'Perfect Score', desc: 'Score 40/40 on a mock exam', icon: '👑', category: 'exam', trigger: 'perfect_exam', value: 1 },

    // Mastery achievements
    { id: 'first_mastery', title: 'First Mastery', desc: 'Master any topic (95%+, 40+ attempts)', icon: '⭐', category: 'mastery', trigger: 'topics_mastered', value: 1 },
    { id: 'five_mastery', title: 'Halfway There', desc: 'Master 5 topics', icon: '⭐', category: 'mastery', trigger: 'topics_mastered', value: 5 },
    { id: 'all_mastery', title: 'Complete Mastery', desc: 'Master all 10 topics', icon: '🌟', category: 'mastery', trigger: 'topics_mastered', value: 10 },
    { id: 'vocab_100', title: 'Word Learner', desc: 'Learn 100 vocabulary words', icon: '📖', category: 'mastery', trigger: 'vocab_learned', value: 100 },
    { id: 'vocab_all', title: 'Lexicon Complete', desc: 'Learn all vocabulary words', icon: '🏅', category: 'mastery', trigger: 'vocab_all', value: 1 }
];

const CHALLENGE_TYPES = [
    { id: 'answer_10', desc: 'Answer 10 questions today', target: 10, track: 'attempts_today' },
    { id: 'correct_5_topic', desc: 'Get 5 correct in {topic}', target: 5, track: 'correct_topic_today' },
    { id: 'vocab_10', desc: 'Review 10 vocabulary words', target: 10, track: 'vocab_today' },
    { id: 'exam_complete', desc: 'Complete a mock exam', target: 1, track: 'exams_today' },
    { id: 'accuracy_80', desc: 'Maintain 80%+ accuracy today (min 10 Qs)', target: 80, track: 'accuracy_today' },
    { id: 'streak_extend', desc: 'Extend your study streak', target: 1, track: 'streak_extended' }
];

const STREAK_MILESTONES = [3, 7, 14, 30];

const STREAK_MESSAGES = {
    3: { title: 'Hat Trick!', msg: '3 days in a row — building a habit!' },
    7: { title: 'Week Warrior!', msg: '7 days strong — you\'re on fire!' },
    14: { title: 'Two Weeks!', msg: '14 days — discipline like this will get you through the exam!' },
    30: { title: 'Monthly Master!', msg: '30 days — incredible dedication, Sara!' }
};
