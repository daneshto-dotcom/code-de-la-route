#!/usr/bin/env node
/**
 * inject-s42.js — Adds S42 multi-answer questions to questions.json, then rebuilds questions.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'data', 'questions.json');
const NEW_QS = require('./s42-final-multi.js');

console.log(`Adding ${NEW_QS.length} questions to questions.json...`);

const existing = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const existingIds = new Set(existing.map(q => q.id));

// Check for duplicates
const dupes = NEW_QS.filter(q => existingIds.has(q.id));
if (dupes.length > 0) {
    console.error('DUPLICATE IDs:', dupes.map(q => q.id).join(', '));
    process.exit(1);
}

// Append
const merged = [...existing, ...NEW_QS];
fs.writeFileSync(JSON_PATH, JSON.stringify(merged, null, 2), 'utf8');
console.log(`questions.json: ${existing.length} → ${merged.length}`);

// Rebuild questions.js
console.log('\nRebuilding questions.js...');
execSync('node scripts/build-questions.js', { cwd: ROOT, stdio: 'inherit' });

console.log('\nDone!');
