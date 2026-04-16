#!/usr/bin/env node
/**
 * inject-s41.js — Injects S41 new multi-answer questions into questions.js
 * Inserts before the closing "];" of QUESTION_BANK
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QS_PATH = path.join(ROOT, 'js', 'questions.js');
const NEW_QS = require('./s41-new-questions.js');

console.log(`Injecting ${NEW_QS.length} new questions into questions.js...`);

// Read current file
let content = fs.readFileSync(QS_PATH, 'utf8');

// Find the closing "];" of QUESTION_BANK
const marker = '\n];';
const idx = content.indexOf(marker);
if (idx === -1) {
    console.error('ERROR: Could not find QUESTION_BANK closing "];". Aborting.');
    process.exit(1);
}

// Format each question as JS (matching existing style)
function formatQuestion(q) {
    let lines = [];
    lines.push('    {');
    lines.push(`        id: "${q.id}", topic: "${q.topic}", difficulty: ${q.difficulty},`);
    lines.push(`        questionFr: "${esc(q.questionFr)}",`);
    lines.push(`        questionEn: "${esc(q.questionEn)}",`);
    lines.push('        options: {');
    for (const [key, val] of Object.entries(q.options)) {
        lines.push(`            ${key}: { fr: "${esc(val.fr)}", en: "${esc(val.en)}" },`);
    }
    lines.push('        },');
    lines.push(`        correctAnswers: [${q.correctAnswers.map(a => `"${a}"`).join(',')}], answerCount: ${q.answerCount},`);
    lines.push(`        explanationFr: "${esc(q.explanationFr)}",`);
    lines.push(`        explanationEn: "${esc(q.explanationEn)}"`);
    lines.push('    }');
    return lines.join('\n');
}

function esc(s) {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// Build injection block
const block = '\n    // === S41: Multi-Answer Push to 50% (79 questions) ===\n' +
    NEW_QS.map(q => formatQuestion(q)).join(',\n') + ',';

// Insert before the closing "];""
content = content.slice(0, idx) + ',' + block + '\n' + content.slice(idx);

// Update header count
content = content.replace(
    /Question Bank — \d+ Bilingual Questions/,
    `Question Bank — ${1294 + NEW_QS.length} Bilingual Questions`
);

fs.writeFileSync(QS_PATH, content, 'utf8');
console.log(`Done! Injected ${NEW_QS.length} questions. New total in header: ${1294 + NEW_QS.length}`);
