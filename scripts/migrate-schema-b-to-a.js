#!/usr/bin/env node
/**
 * migrate-schema-b-to-a.js — S49-P2: Schema B to Schema A migration
 *
 * Sara reported "blank answer options" on ~48 questions. Root cause:
 * mixed schemas in data/questions.json. Schema A (1398 Qs) is what
 * renderers (exam.js, practice.js, diagnostic.js, progress.js) expect.
 * Schema B (48 Qs) was imported by an earlier batch script with a
 * different structure that the renderers cannot read.
 *
 * Schema A:  options: { A:{fr,en}, B:{fr,en}, ... }
 * Schema B:  options: [ {letter,text,textEn}, ... ]
 *
 * This script transforms Schema B to Schema A in-place, idempotently.
 * Run once after this commit; subsequent runs are no-ops.
 *
 * Usage: node scripts/migrate-schema-b-to-a.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'data', 'questions.json');
const DRY = process.argv.includes('--dry-run');

const raw = fs.readFileSync(JSON_PATH, 'utf8');
const questions = JSON.parse(raw);

let migrated = 0;
let skippedA = 0;
const errors = [];

for (const q of questions) {
    if (!q.options) {
        errors.push(`${q.id}: no options field`);
        continue;
    }
    if (!Array.isArray(q.options)) {
        skippedA++;
        continue;
    }

    const newOptions = {};
    for (const opt of q.options) {
        if (!opt.letter || !'ABCD'.includes(opt.letter)) {
            errors.push(`${q.id}: invalid letter "${opt.letter}"`);
            continue;
        }
        if (newOptions[opt.letter]) {
            errors.push(`${q.id}: duplicate letter ${opt.letter}`);
            continue;
        }
        newOptions[opt.letter] = {
            fr: opt.text || '',
            en: opt.textEn || ''
        };
    }

    const sortedKeys = Object.keys(newOptions).sort();
    const sortedOptions = {};
    for (const k of sortedKeys) sortedOptions[k] = newOptions[k];

    if (Array.isArray(q.correctAnswers)) {
        for (const letter of q.correctAnswers) {
            if (!sortedOptions[letter]) {
                errors.push(`${q.id}: correctAnswer "${letter}" not in migrated options`);
            }
        }
    } else {
        errors.push(`${q.id}: correctAnswers not an array`);
    }

    q.options = sortedOptions;
    migrated++;
}

console.log(`Schema B questions migrated: ${migrated}`);
console.log(`Schema A questions left unchanged: ${skippedA}`);
console.log(`Total questions: ${questions.length}`);

if (errors.length) {
    console.error(`\nERRORS (${errors.length}):`);
    errors.forEach(e => console.error('  -', e));
    process.exit(1);
}

if (DRY) {
    console.log('\nDRY RUN — no changes written');
    process.exit(0);
}

const out = JSON.stringify(questions, null, 2) + '\n';
fs.writeFileSync(JSON_PATH, out);
console.log(`\nWrote ${JSON_PATH}`);
console.log('Next: node scripts/build-questions.js to regenerate JS mirror');
