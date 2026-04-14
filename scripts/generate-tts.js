/**
 * Batch TTS Generator — GCP Text-to-Speech (Chirp 3 HD, fr-FR)
 * Generates missing vocab audio files for FDTTA.
 *
 * Usage:
 *   node scripts/generate-tts.js              # Generate missing audio
 *   node scripts/generate-tts.js --dry-run    # List missing words only
 *   node scripts/generate-tts.js --manifest   # Regenerate manifest only
 *
 * Requires: GOOGLE_CLOUD_API_KEY env var.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// --- Config ---
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;
if (!API_KEY && !process.argv.includes('--manifest') && !process.argv.includes('--dry-run')) {
  console.error('Error: GOOGLE_CLOUD_API_KEY env var required for generation.');
  process.exit(1);
}
const VOICE = { languageCode: 'fr-FR', name: 'fr-FR-Chirp3-HD-Charon' };
const AUDIO_CONFIG = { audioEncoding: 'MP3', speakingRate: 0.95 };
const AUDIO_DIR = path.join(__dirname, '..', 'assets', 'audio', 'vocab');
const VOCAB_JSON = path.join(__dirname, '..', 'data', 'vocab.json');
const MANIFEST_FILE = path.join(__dirname, '..', 'js', 'vocab-audio.js');
const MIN_DELAY_MS = 120;
const MAX_RETRIES = 3;

const DRY_RUN = process.argv.includes('--dry-run');
const MANIFEST_ONLY = process.argv.includes('--manifest');

// --- Accent normalization ---
function normalizeToFilename(word) {
  return word
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[''\u2019]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// --- Load vocab ---
function loadVocab() {
  const raw = JSON.parse(fs.readFileSync(VOCAB_JSON, 'utf8'));
  const seen = new Set();
  const words = [];
  for (const entry of raw) {
    const key = entry.wordFr.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      words.push(key);
    }
  }
  return words;
}

// --- Scan existing audio ---
function getExistingAudio() {
  return new Set(
    fs.readdirSync(AUDIO_DIR)
      .filter(f => f.endsWith('.mp3'))
      .map(f => f.replace('.mp3', ''))
  );
}

// --- Find missing words ---
function findMissing(words, existing) {
  return words.filter(w => !existing.has(normalizeToFilename(w)));
}

// --- GCP TTS API call ---
function synthesize(text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      input: { text },
      voice: VOICE,
      audioConfig: AUDIO_CONFIG
    });

    const options = {
      hostname: 'texttospeech.googleapis.com',
      path: `/v1/text:synthesize?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            resolve(Buffer.from(json.audioContent, 'base64'));
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        } else if (res.statusCode === 429) {
          reject(new Error('RATE_LIMIT'));
        } else {
          reject(new Error(`API ${res.statusCode}: ${data.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// --- Generate one word with retries + backoff ---
async function generateWord(word, index, total) {
  const filename = normalizeToFilename(word);
  const filepath = path.join(AUDIO_DIR, `${filename}.mp3`);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const audio = await synthesize(word);
      fs.writeFileSync(filepath, audio);
      const sizeKB = (audio.length / 1024).toFixed(1);
      console.log(`[${index + 1}/${total}] OK "${word}" -> ${filename}.mp3 (${sizeKB}KB)`);

      if (audio.length < 2000) console.warn(`  WARNING: SMALL FILE ${sizeKB}KB`);
      if (audio.length > 50000) console.warn(`  WARNING: LARGE FILE ${sizeKB}KB`);

      return { word, filename, size: audio.length, ok: true };
    } catch (err) {
      if (err.message === 'RATE_LIMIT') {
        const backoff = MIN_DELAY_MS * Math.pow(2, attempt);
        console.log(`  Rate limited, backoff ${backoff}ms (${attempt}/${MAX_RETRIES})`);
        await sleep(backoff);
      } else {
        console.error(`  FAIL "${word}" attempt ${attempt}: ${err.message}`);
        if (attempt === MAX_RETRIES) return { word, filename, ok: false, error: err.message };
        await sleep(MIN_DELAY_MS * attempt);
      }
    }
  }
}

// --- Generate manifest file ---
function generateManifest(words, existing) {
  const entries = [];

  for (const word of words) {
    const filename = normalizeToFilename(word);
    const mp3Path = `assets/audio/vocab/${filename}.mp3`;

    if (!existing.has(filename)) continue;

    entries.push([word, mp3Path]);

    const stripped = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (stripped !== word) {
      entries.push([stripped, mp3Path]);
    }
  }

  entries.sort((a, b) => a[0].localeCompare(b[0], 'fr'));

  const lines = entries.map(([key, val]) =>
    `  ${JSON.stringify(key)}: ${JSON.stringify(val)}`
  );

  const uniqueFiles = new Set(entries.map(([, v]) => v));

  const content = `/* ============================================
   Vocabulary Audio — Pronunciation Manifest
   ${uniqueFiles.size} audio files, ${entries.length} manifest entries
   Generated via GCP Chirp 3 HD (fr-FR)
   Auto-generated by scripts/generate-tts.js
   ============================================ */

const VOCAB_AUDIO = {
${lines.join(',\n')}
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

    this._audio.play().catch(() => {});
    return true;
  }
};
`;

  fs.writeFileSync(MANIFEST_FILE, content, 'utf8');
  console.log(`Manifest: ${entries.length} entries (${uniqueFiles.size} files, ${words.length} words)`);
}

// --- Main ---
async function main() {
  console.log('=== FDTTA Vocab TTS Generator ===\n');

  const words = loadVocab();
  console.log(`Vocab: ${words.length} unique words`);

  const existing = getExistingAudio();
  console.log(`Existing audio: ${existing.size} files`);

  if (MANIFEST_ONLY) {
    console.log('\n--manifest: regenerating manifest only\n');
    generateManifest(words, existing);
    return;
  }

  const missing = findMissing(words, existing);
  console.log(`Missing: ${missing.length} words\n`);

  if (missing.length === 0) {
    console.log('All words have audio! Regenerating manifest...');
    generateManifest(words, getExistingAudio());
    return;
  }

  if (DRY_RUN) {
    console.log('--dry-run: listing missing words\n');
    missing.forEach((w, i) => console.log(`  ${i + 1}. "${w}" -> ${normalizeToFilename(w)}.mp3`));
    console.log(`\nWould generate ${missing.length} files (~$${(missing.length * 0.0004).toFixed(2)} est)`);
    return;
  }

  console.log(`Generating ${missing.length} audio files...\n`);
  const results = [];
  for (let i = 0; i < missing.length; i++) {
    const result = await generateWord(missing[i], i, missing.length);
    results.push(result);
    if (i < missing.length - 1) await sleep(MIN_DELAY_MS);
  }

  const ok = results.filter(r => r.ok);
  const failed = results.filter(r => !r.ok);
  const totalSize = ok.reduce((sum, r) => sum + r.size, 0);

  console.log(`\n=== Summary ===`);
  console.log(`Generated: ${ok.length}/${missing.length}`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);

  if (failed.length > 0) {
    console.log(`\nFailed (${failed.length}):`);
    failed.forEach(r => console.log(`  FAIL "${r.word}": ${r.error}`));
  }

  const small = ok.filter(r => r.size < 2000);
  const large = ok.filter(r => r.size > 50000);
  if (small.length) console.log(`\nWARN: ${small.length} files under 2KB`);
  if (large.length) console.log(`WARN: ${large.length} files over 50KB`);

  console.log('\nRegenerating manifest...');
  generateManifest(words, getExistingAudio());

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
