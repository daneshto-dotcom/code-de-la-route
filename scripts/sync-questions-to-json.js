#!/usr/bin/env node
/**
 * sync-questions-to-json.js — Extracts QUESTION_BANK from js/questions.js
 * and writes the canonical data/questions.json.
 *
 * This reconciles the split where questions.js had 1394 entries
 * but questions.json only had 1094.
 *
 * Usage: node scripts/sync-questions-to-json.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JS_PATH = path.join(ROOT, 'js', 'questions.js');
const JSON_PATH = path.join(ROOT, 'data', 'questions.json');

console.log('Syncing questions.js → questions.json...');

// Read the JS file and create a temp module that exports QUESTION_BANK
const content = fs.readFileSync(JS_PATH, 'utf8');

// Stub out globals referenced in helper functions
const stubs = `
const ETG_TOPICS = [];
const EXAM_TOTAL_QUESTIONS = 40;
const Storage = { getAttempts: () => [], getTopicMasteryArray: () => [], getDueReviews: () => [] };
`;

const tmpPath = path.join(ROOT, 'scripts', '_tmp_qbank.js');
fs.writeFileSync(tmpPath, stubs + content + '\nmodule.exports = QUESTION_BANK;\n');

let questions;
try {
    questions = require(tmpPath);
} catch (e) {
    console.error('ERROR: Failed to load QUESTION_BANK:', e.message);
    process.exit(1);
} finally {
    fs.unlinkSync(tmpPath);
}

if (!Array.isArray(questions)) {
    console.error('ERROR: QUESTION_BANK is not an array');
    process.exit(1);
}

// Filter out any undefined/null entries (can happen from trailing commas or parse artifacts)
const rawLen = questions.length;
const filtered = questions.filter(q => q != null && typeof q === 'object' && q.id);
if (filtered.length < rawLen) {
    console.log(`  Filtered out ${rawLen - filtered.length} null/invalid entries (${rawLen} → ${filtered.length})`);
}
questions = filtered;

// Validate
const required = ['id', 'topic', 'difficulty', 'questionFr', 'questionEn', 'options', 'correctAnswers', 'answerCount', 'explanationFr', 'explanationEn'];
const errors = [];
const ids = new Set();
for (const q of questions) {
    for (const f of required) {
        if (q[f] === undefined) errors.push(`${q.id || '?'}: missing ${f}`);
    }
    if (ids.has(q.id)) errors.push(`DUPLICATE: ${q.id}`);
    ids.add(q.id);
}

if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach(e => console.error('  -', e));
    process.exit(1);
}

// Write JSON
const jsonStr = JSON.stringify(questions, null, 2);
fs.writeFileSync(JSON_PATH, jsonStr, 'utf8');

const sizeKB = (Buffer.byteLength(jsonStr) / 1024).toFixed(1);
console.log(`Written: data/questions.json`);
console.log(`  Questions: ${questions.length}`);
console.log(`  Size: ${sizeKB} KB`);
console.log(`  Unique IDs: ${ids.size}`);

// Count topics
const topics = {};
let multi = 0;
for (const q of questions) {
    topics[q.topic] = (topics[q.topic] || 0) + 1;
    if (q.answerCount > 1) multi++;
}
console.log(`  Topics: ${Object.keys(topics).length}`);
console.log(`  Multi-answer: ${multi} (${(100 * multi / questions.length).toFixed(1)}%)`);
console.log(`  With media: ${questions.filter(q => q.media).length}`);

console.log('\nNow run: node scripts/build-questions.js to verify roundtrip');
