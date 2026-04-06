#!/usr/bin/env node
/**
 * build-questions.js — Generates js/questions.js from data/questions.json
 *
 * Usage: node scripts/build-questions.js
 *
 * The canonical question data lives in data/questions.json.
 * This script wraps it into the runtime JS file that the app loads
 * via a synchronous <script> tag.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'data', 'questions.json');
const JS_PATH = path.join(ROOT, 'js', 'questions.js');

// Read and validate
const raw = fs.readFileSync(JSON_PATH, 'utf8');
const questions = JSON.parse(raw);

if (!Array.isArray(questions) || questions.length === 0) {
    console.error('ERROR: questions.json is empty or not an array');
    process.exit(1);
}

// Validate every question has required fields
const required = ['id', 'topic', 'difficulty', 'questionFr', 'questionEn', 'options', 'correctAnswers', 'answerCount', 'explanationFr', 'explanationEn'];
const errors = [];
for (const q of questions) {
    for (const field of required) {
        if (q[field] === undefined) {
            errors.push(`Question ${q.id || '(no id)'}: missing field "${field}"`);
        }
    }
}
if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach(e => console.error('  -', e));
    process.exit(1);
}

// Format a JS value with proper indentation (unquoted keys for readability)
function formatValue(val, indent) {
    if (val === null || val === undefined) return 'null';
    if (typeof val === 'string') {
        const escaped = val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
        return `"${escaped}"`;
    }
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (Array.isArray(val)) {
        if (val.length === 0) return '[]';
        if (val.every(v => typeof v === 'string' || typeof v === 'number')) {
            return '[' + val.map(v => formatValue(v, indent)).join(', ') + ']';
        }
        const items = val.map(v => indent + '    ' + formatValue(v, indent + '    '));
        return '[\n' + items.join(',\n') + '\n' + indent + ']';
    }
    if (typeof val === 'object') {
        const keys = Object.keys(val);
        if (keys.length === 0) return '{}';
        const allSimple = keys.every(k => typeof val[k] === 'string' || typeof val[k] === 'number' || typeof val[k] === 'boolean');
        if (allSimple && keys.length <= 3) {
            return '{ ' + keys.map(k => `${k}: ${formatValue(val[k], indent)}`).join(', ') + ' }';
        }
        const entries = keys.map(k => indent + '    ' + `${k}: ${formatValue(val[k], indent + '    ')}`);
        return '{\n' + entries.join(',\n') + '\n' + indent + '}';
    }
    return String(val);
}

function formatQuestion(q) {
    const indent = '        ';
    const lines = [];
    const fieldOrder = ['id', 'topic', 'difficulty', 'signs', 'scenario', 'media',
        'questionFr', 'questionEn', 'options', 'correctAnswers', 'answerCount',
        'explanationFr', 'explanationEn', 'trapNote', 'distractorNotes', 'vocabulary'];

    for (const key of fieldOrder) {
        if (q[key] !== undefined) {
            lines.push(`${indent}${key}: ${formatValue(q[key], indent)}`);
        }
    }
    for (const key of Object.keys(q)) {
        if (!fieldOrder.includes(key)) {
            lines.push(`${indent}${key}: ${formatValue(q[key], indent)}`);
        }
    }
    return '    {\n' + lines.join(',\n') + '\n    }';
}

// Group questions by topic for readability
const topics = {};
for (const q of questions) {
    if (!topics[q.topic]) topics[q.topic] = [];
    topics[q.topic].push(q);
}

const topicLabels = {
    'circulation': 'CIRCULATION (Traffic Rules)',
    'signalisation': 'SIGNALISATION (Signs & Signals)',
    'intersection': 'INTERSECTION (Junctions & Priority)',
    'priorite': 'PRIORITE (Right of Way)',
    'croisement': 'CROISEMENT (Passing & Crossing)',
    'depassement': 'DEPASSEMENT (Overtaking)',
    'arret_stationnement': 'ARRET & STATIONNEMENT (Stopping & Parking)',
    'visibilite_eclairage': 'VISIBILITE & ECLAIRAGE (Visibility & Lighting)',
    'tunnels_passages_niveau': 'TUNNELS & PASSAGES A NIVEAU (Tunnels & Level Crossings)',
    'notions_diverses': 'NOTIONS DIVERSES (General Knowledge)'
};

const header = `/* ============================================
   Question Bank — ${questions.length} Bilingual Questions
   All 10 ETG themes, multi-answer support
   Based on French Code de la route public law
   ============================================

   QUESTION SCHEMA:
   {
     id: string,                    // unique ID e.g. 'circ-001'
     topic: string,                 // ETG topic ID
     difficulty: 1|2|3,             // 1=easy, 2=medium, 3=hard
     signs?: string[],              // road sign IDs to display
     scenario?: string,             // intersection scenario ID
     media?: {                      // (OPTIONAL) photo/image for exam-style questions
       type: 'image',               //   media type
       url: string,                 //   path or URL to image (SW-cached)
       alt: string                  //   accessibility description
     },
     questionFr: string,            // question text in French
     questionEn: string,            // question text in English
     options: { A: {fr,en}, ... },  // 2-4 answer options
     correctAnswers: string[],      // e.g. ["A","C"]
     answerCount: number,           // number of correct answers
     explanationFr: string,         // explanation in French
     explanationEn: string,         // explanation in English
     trapNote?: string,             // common mistake warning
     distractorNotes?: {A?:..},     // per-wrong-answer explanations
     vocabulary?: [{wordFr,wordEn,definition?}]
   }

   *** AUTO-GENERATED — DO NOT EDIT ***
   *** Edit data/questions.json instead, then run: node scripts/build-questions.js ***
   ============================================ */
`;

let questionEntries = [];
for (const [topic, qs] of Object.entries(topics)) {
    const label = topicLabels[topic] || topic.toUpperCase();
    questionEntries.push(`    // === ${label} ===`);
    for (const q of qs) {
        questionEntries.push(formatQuestion(q));
    }
}

const helpers = `
// Helper functions
function getQuestionsByTopic(topicId) {
    return QUESTION_BANK.filter(q => q.topic === topicId);
}

function getQuestionById(id) {
    return QUESTION_BANK.find(q => q.id === id);
}

function getRandomQuestions(count, exclude = []) {
    const available = QUESTION_BANK.filter(q => !exclude.includes(q.id));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function getWeakTopicQuestions(count, topicMastery) {
    // Sort topics by weakness (lowest accuracy first)
    const sorted = [...topicMastery].sort((a, b) => a.accuracy - b.accuracy);
    const weakTopics = sorted.slice(0, 3).map(t => t.topic);
    const questions = QUESTION_BANK.filter(q => weakTopics.includes(q.topic));
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function getExamQuestions() {
    // Select 40 questions matching official exam distribution
    const selected = [];
    for (const topic of ETG_TOPICS) {
        const topicQuestions = getQuestionsByTopic(topic.id);
        const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
        const needed = topic.examWeight;
        const taken = shuffled.slice(0, needed);
        selected.push(...taken);
    }
    while (selected.length < EXAM_TOTAL_QUESTIONS) {
        const remaining = QUESTION_BANK.filter(q => !selected.includes(q));
        if (remaining.length === 0) break;
        const rand = remaining[Math.floor(Math.random() * remaining.length)];
        selected.push(rand);
    }
    return selected.sort(() => Math.random() - 0.5);
}

/* ============================================
   Adaptive Question Selection Algorithm
   Smart weighting: reviews > weak > recently-wrong > unseen > random
   ============================================ */
function getAdaptiveQuestions(count = 10) {
    const selected = [];
    const usedIds = new Set();
    const attempts = Storage.getAttempts();
    const mastery = Storage.getTopicMasteryArray();
    const attemptedIds = new Set(attempts.map(a => a.questionId));

    // Build per-question accuracy map from recent attempts
    const questionAccuracy = {};
    for (const a of attempts) {
        if (!questionAccuracy[a.questionId]) questionAccuracy[a.questionId] = { correct: 0, total: 0 };
        questionAccuracy[a.questionId].total++;
        if (a.isCorrect) questionAccuracy[a.questionId].correct++;
    }

    // Slot allocation: 25% reviews, 30% weak topics, 15% recently-wrong, 15% unseen, 15% random
    const reviewSlots = Math.round(count * 0.25);
    const weakSlots = Math.round(count * 0.30);
    const recentWrongSlots = Math.round(count * 0.15);
    const unseenSlots = Math.round(count * 0.15);

    function fillBucket(pool, maxSlots) {
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        let added = 0;
        for (const q of shuffled) {
            if (added >= maxSlots) break;
            if (!usedIds.has(q.id)) {
                selected.push(q);
                usedIds.add(q.id);
                added++;
            }
        }
        return added;
    }

    // 1. Due reviews first (highest priority)
    const dueReviews = Storage.getDueReviews();
    const reviewPool = dueReviews.map(r => getQuestionById(r.questionId)).filter(Boolean);
    const reviewFilled = fillBucket(reviewPool, reviewSlots);

    // 2. Weak topic questions (topics with lowest accuracy, at least some attempts)
    const sortedTopics = [...mastery].sort((a, b) => {
        const aScore = a.totalAttempts > 0 ? a.accuracy : 50;
        const bScore = b.totalAttempts > 0 ? b.accuracy : 50;
        return aScore - bScore;
    });
    const weakTopicIds = sortedTopics.slice(0, 4).map(t => t.id || t.topic);
    const weakPool = QUESTION_BANK.filter(q => weakTopicIds.includes(q.topic));
    const weakFilled = fillBucket(weakPool, weakSlots);

    // 3. Recently-wrong questions (answered wrong in last 100 attempts, not yet in SR review)
    const recentAttempts = attempts.slice(-100);
    const recentWrongIds = new Set();
    for (let i = recentAttempts.length - 1; i >= 0; i--) {
        if (!recentAttempts[i].isCorrect) recentWrongIds.add(recentAttempts[i].questionId);
    }
    const recentWrongPool = [...recentWrongIds]
        .map(id => getQuestionById(id))
        .filter(Boolean);
    const recentWrongFilled = fillBucket(recentWrongPool, recentWrongSlots);

    // 4. Unseen questions (never attempted — coverage gaps)
    const unseenPool = QUESTION_BANK.filter(q => !attemptedIds.has(q.id));
    const unseenFilled = fillBucket(unseenPool, unseenSlots);

    // 5. Random fill for all remaining slots (including unfilled from other buckets)
    const needed = count - selected.length;
    const remainingPool = QUESTION_BANK.filter(q => !usedIds.has(q.id));
    fillBucket(remainingPool, needed);

    // Final fill if still short (shouldn't happen with 540 questions)
    while (selected.length < count) {
        const remaining = QUESTION_BANK.filter(q => !usedIds.has(q.id));
        if (remaining.length === 0) break;
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        selected.push(pick);
        usedIds.add(pick.id);
    }

    return selected.sort(() => Math.random() - 0.5);
}

/* ============================================
   Smart Weak Spots Selection
   Targets weakest 3 topics, prefers low-accuracy questions
   ============================================ */
function getWeakSpotQuestions(count = 10) {
    const mastery = Storage.getTopicMasteryArray();
    const attempts = Storage.getAttempts();
    const usedIds = new Set();
    const selected = [];

    // Sort by weakness: lowest accuracy first (only topics with attempts)
    const practiced = mastery.filter(t => t.totalAttempts > 0);
    if (practiced.length === 0) return getRandomQuestions(count);

    practiced.sort((a, b) => a.accuracy - b.accuracy);
    const weakest3 = practiced.slice(0, 3);

    // Build per-question accuracy
    const questionAcc = {};
    for (const a of attempts) {
        if (!questionAcc[a.questionId]) questionAcc[a.questionId] = { correct: 0, total: 0 };
        questionAcc[a.questionId].total++;
        if (a.isCorrect) questionAcc[a.questionId].correct++;
    }

    // Get questions from weakest topics, sorted by individual question difficulty
    const pool = QUESTION_BANK
        .filter(q => weakest3.some(t => (t.id || t.topic) === q.topic))
        .map(q => {
            const acc = questionAcc[q.id];
            const score = acc ? acc.correct / acc.total : 0.5;
            return { q, score };
        })
        .sort((a, b) => a.score - b.score);

    for (const { q } of pool) {
        if (selected.length >= count) break;
        if (!usedIds.has(q.id)) {
            selected.push(q);
            usedIds.add(q.id);
        }
    }

    while (selected.length < count) {
        const remaining = QUESTION_BANK.filter(q => !usedIds.has(q.id));
        if (remaining.length === 0) break;
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        selected.push(pick);
        usedIds.add(pick.id);
    }

    return selected.sort(() => Math.random() - 0.5);
}
`;

const output = header + '\nconst QUESTION_BANK = [\n' + questionEntries.join(',\n') + '\n];\n' + helpers;

fs.writeFileSync(JS_PATH, output, 'utf8');

console.log(`Generated js/questions.js`);
console.log(`  Questions: ${questions.length}`);
console.log(`  Topics: ${Object.keys(topics).length}`);
console.log(`  File size: ${(Buffer.byteLength(output) / 1024).toFixed(1)} KB`);

// Update content-manifest.json
const MANIFEST_PATH = path.join(ROOT, 'content-manifest.json');
let manifest = { version: 0 };
try { manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')); } catch (e) {}
manifest.version = (manifest.version || 0) + 1;
manifest.questionsUrl = './data/questions.json';
manifest.questionCount = questions.length;
manifest.lastUpdated = new Date().toISOString().slice(0, 10);
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`  Manifest: v${manifest.version} (${manifest.questionCount} questions)`);
