# S80 BATCH PDR — Cloud TTS + a11y Tighten + Linux Visual Baseline
## (Council-Revised, Post-R2 Synthesis)

**Tier:** Full | **Deliberation:** 3-way Council, 2 rounds + quality gate, Battle Ledger applied
**Battle Ledger:** `.claude/plans/S80_BATCH_BATTLE_LEDGER.md` (16 decisions resolved, 0 vetoes, 0 SPLIT)
**Execution mode:** Sequential P1 → P2 → P3 on user-batched approval
**Source:** S79 boot-snapshot.md + handoff Next Steps; Council R1 disruption rate 14/16 = 87.5%; Round 2 synthesis 2026-04-28

---

## OBJECTIVE

Three priorities batched because of cross-priority dependencies (audio → contrast → visual gate enforcement) — landing in one session reduces re-baseline churn:

1. **P1 — Generative voice for AI NPC dialogue.** Close S79 P2's loop: `ai:{npcId}:{contentId}` lineIds compute and emit but currently silent. Build pipeline produces deterministic MP3s for any LLM-emitted dialogue.
2. **P2 — Tighten a11y ratchet to fail on `serious`.** Ratchet is currently critical-only (`tests/a11y/landing.spec.ts:24`); fix 7 known landing.html color-contrast violations, then flip the gate.
3. **P3 — Linux visual baselines + Pass C-2 enforcement.** Snapshots gitignored due to Win/Linux render drift. Generate deterministic baselines via `mcr.microsoft.com/playwright:v1.59-jammy`; flip Pass C-2 from `continue-on-error: true` → `false`.

---

## SCOPE

### P1 — Cloud TTS pipeline (Standard, ~28K post-synthesis)

**Strategy:** Pure build-time queue + atomic SQLite persistence. (Phase 1.5 runtime flag dropped per Council D4.)

#### In scope

**P1.1 — Persistence layer (SQLite, replaces JSONL)**
- New `Game/founding-realm/src/modules/npc/tts-queue.ts` — exports `enqueueAILine(entry)` and `getQueueStatus()`.
- Backed by `better-sqlite3` (~1.5MB node_modules, prebuilt binaries — no native build pain on Windows). Single file `data/tts-queue.db` (WAL mode for concurrent read).
- Schema: `CREATE TABLE IF NOT EXISTS queue (lineId TEXT PRIMARY KEY, npcId TEXT, text TEXT, intent TEXT, emotion TEXT, voice TEXT, speakingRate REAL, ts INTEGER NOT NULL, status TEXT DEFAULT 'pending')`.
- `enqueueAILine` uses `INSERT OR IGNORE` — atomic dedup, zero file-race surface, guaranteed safe under concurrent server + script access.
- Initial bootstrap: import existing manifest entries with `status='completed'` so dedup against historic synthesis is instant.

**P1.2 — Synthesis script**
- New `Game/founding-realm/scripts/tts-synthesize.js` — reads pending entries from `data/tts-queue.db`.
- For each: `POST https://texttospeech.googleapis.com/v1/text:synthesize?key=$GOOGLE_CLOUD_API_KEY` with `{input:{text}, voice:{languageCode:'en-US', name:voice}, audioConfig:{audioEncoding:'MP3', speakingRate}}`.
- **API client: raw `fetch`** (Council D10 — Claude wins; SDK adds 50+ deps for no scale-justified value).
- Concurrency: max 4 parallel; exponential backoff on 429/503 (1s, 2s, 4s, abandon); abort on 401/403 with clear vault-pointer error message.
- **Sanity gates (Council D11):**
  - Reject response if `audioContent` < 500 bytes (likely TTS API error masquerading as success)
  - Decode MP3 duration; warn if > 5s, fail if > 10s (suggests pathological LLM output)
- **Pricing/quota gate (Council D7):**
  - Pre-flight: `GET /v1/voices?key=...` — must return 200 with ≥5 Chirp 3 HD voices.
  - Per-run hard cap: 100K characters total. Aborts cleanly with stderr summary if exceeded.
  - Rate limit: 60 requests/minute (well below default 1000/min Cloud TTS limit).
- On success: write MP3 to `public/assets/audio/npc-voices/{npcId}/ai_{contentId}.mp3` (where `contentId = lineId.split(':')[2]`); UPSERT manifest entry; mark queue row `status='completed'`.
- Atomic manifest update: read → patch → `writeFileSync` to tmp + `renameSync` (atomic on POSIX + Windows ≥ Vista).

**P1.3 — Manifest schema future-proofing (Council D1 SYNTHESIS)**
- Add `url` field to manifest entries: relative path (`/assets/audio/npc-voices/...`) for git-tracked, OR `gs://`/CDN URL for future GCS migration.
- Existing 30 entries stay path-based; new `ai_*.mp3` entries also path-based for S80.
- S81 P0 ticket pre-filed: "Migrate ai:* audio to GCS bucket" — schema already supports it; only deployment work remains.

**P1.4 — Server wiring**
- Modify `Game/founding-realm/src/networking/handlers/crafting.ts:197` (post-`computeAILineId`):
  - Check manifest in-memory: `if (voiceManifest[`${npcId}:${lineId}`]) {emit lineId}` else `{enqueueAILine({...}); emit lineId anyway}` (client tolerates miss → text-only display per S79 P1 design).
  - No client-bundle change.

**P1.5 — Voice config & npm scripts**
- Reuse `npc-tts-config.ts` (per-NPC Chirp 3 HD voice + speakingRate). **Pin voice IDs** as static strings: `en-US-Chirp3-HD-Charon`, etc.
- Add `neural2Fallback` field per NPC config (e.g. `en-US-Neural2-D` for male, `en-US-Neural2-F` for female). Synthesis script falls back automatically if Chirp 3 voice returns 400 (deprecation signal).
- New env var `GOOGLE_CLOUD_API_KEY` in `.env.example` with comment pointing to `BRAIN/infrastructure/CREDENTIALS_VAULT.json` `google_cloud_api` block. `.env` populated by Daniel during pre-flight.
- New npm scripts:
  - `tts:synthesize` → run `scripts/tts-synthesize.js`
  - `tts:queue:status` → print pending/completed/failed counts; exit 1 if any pending older than 7 days

**P1.6 — Tests**
- `tests/tts-queue.test.ts` — INSERT OR IGNORE idempotency (3 calls same lineId → 1 row), dedup against pre-populated `completed` rows (manifest bootstrap), schema migration safety (re-run CREATE TABLE IF NOT EXISTS).
- `tests/tts-synthesize.test.ts` — mocked `fetch` → request URL/body shape, response decode, MP3 write path, manifest patch JSON-roundtrip, error paths (401, 429 retry, 503 retry-then-fail), char-cap halt, 500-byte sanity reject.

#### Out of scope (Council-deferred to S81)
- **D2 (S81 P0):** Audio quality upgrade — re-synthesize all 30 static + AI lines at Studio voice tier ($16/M chars vs $20/M Chirp 3 HD — actually Studio is *cheaper*; verify pricing) OR commission Vertex AI Custom Voice for top 5 NPCs (~$1K+ training, requires Daniel approval).
- **D1 (S81 P0):** Migrate `ai:*` MP3s from git to `gs://legacy-of-the-realm-audio` GCS bucket. Schema already supports it.
- **D13 (S81):** Broader a11y audit — focus order, ARIA, keyboard nav across all 6 HTML pages.
- **D15 (S81+):** Redis pub/sub asset pipeline (only if MMO concurrency justifies).
- **D16 (S81+):** Self-hosted Piper/StyleTTS2 (only if Cloud TTS cost exceeds $50/mo).
- **Phase 1.5 (dropped per D4):** Runtime synthesis flag `TTS_RUNTIME_ENABLE`. Re-introduce only when CDN/streaming infra justifies sub-3s latency.
- **Sheets-as-script-source (D2 creative):** Logged as S82+ creative-tooling enhancement.
- **Imagen art-direction reference (D5 creative):** Logged as S82+ visual-QA enhancement.
- Emotion → SSML prosody mapping (S81+).

### P2 — A11y ratchet tighten + landing.html contrast fix (Micro, ~5K)

**In scope:**
- Fix 7 colors in `Game/founding-realm/public/landing.html` `<style>` block (all inline; no external CSS):

  | Line | Selector | From | To | Bg ref | Computed AA ratio |
  |------|----------|------|-----|--------|-------------------|
  | 67 | `.sub-motto` | `#6a6558` | `#cdc5b3` | `#060810` | ~12.4:1 ✓ |
  | 102 | `.auth-sub` | `#6a6558` | `#c4b5a8` | `rgba(26,21,14,.88)` blended ≈ `#1a1410` | ~9.6:1 ✓ |
  | 111 | `input::placeholder` | `#6a5e4a` | `#9a8e7a` | `rgba(20,16,10,.8)` blended ≈ `#14100a` | ~5.9:1 ✓ |
  | 123 | `.auth-toggle` | `#6a6558` | `#c4b5a8` | `rgba(26,21,14,.88)` ≈ `#1a1410` | ~9.6:1 ✓ |
  | 144 | `.fest-sub` | `#5a5a52` | `#b8a89c` | `rgba(26,21,14,.6)` over body bg ≈ `#170d09` | ~7.8:1 ✓ |
  | 165 | `.server-info` | `#5a5a52` | `#c4b5a8` | `rgba(20,16,10,.92)` ≈ `#14100a` | ~9.5:1 ✓ |
  | 190 | `.pillar p` | `#8a8678` | `#a89c8f` | `rgba(26,21,14,.7)` | ~6.4:1 ✓ |

- All targets ≥ WCAG AA (4.5:1 normal). Verify each with WCAG contrast calculator post-edit (use webaim.org/resources/contrastchecker on the actual blended bg).
- Tighten ratchet at `tests/a11y/landing.spec.ts:24`: `const FAIL_SEVERITIES: Severity[] = ["critical", "serious"];`

**Game2d ratchet decision tree (Council D8 — pre-committed, not punted):**
- After landing.html fixes ship + a11y suite re-runs: if `tests/a11y/game2d.spec.ts` (game2d + admin specs) shows 0 serious violations under tightened ratchet → **also tighten game2d.spec.ts:29 to `["critical", "serious"]`** (single ratchet).
- Else: leave `game2d.spec.ts:29` at `["critical"]` (per-spec const), file S81 ticket "game2d serious-fail tightening" with the discovered violations enumerated. Document in P2 commit body.

**Out of scope:**
- festival.html / festival-fr.html / festival-admin.html (same palette; no a11y test coverage yet — S81)
- Focus order, ARIA, keyboard nav (S81 — Council D13)
- WCAG AAA (7:1) — AA is the gate

### P3 — Linux visual baseline generator + Pass C-2 enforcement (Standard, ~20K)

**In scope:**
- New `Game/founding-realm/scripts/regen-visual-baselines.sh`:
  - Spins up `mcr.microsoft.com/playwright:v1.59-jammy` Docker container
  - Mounts repo as `/app` (RW for `tests/visual/` only; RO elsewhere via individual mounts)
  - Inside: `npm ci --no-audit --prefer-offline && npx playwright test tests/visual --update-snapshots --project=chromium-desktop`
  - Sets `DISABLE_AI=1`, `NODE_ENV=test`
  - Runnable locally on Daniel's Win+Docker box AND inside CI workflow
- New `.github/workflows/visual-baseline.yml`:
  - `workflow_dispatch` trigger (manual; optional `branch` input)
  - Runs `mcr.microsoft.com/playwright:v1.59-jammy` directly as `container:` image (no nested Docker)
  - Step 1: `npx playwright test tests/visual --update-snapshots --project=chromium-desktop` (generates baselines)
  - **Step 2 (PRIME-AUDIT add):** `npx playwright test tests/visual --project=chromium-desktop` (smoke-runs Pass C-2 against just-generated baselines — must pass before commit). Catches non-determinism between baseline-generation pass and verification pass within the same container instance.
  - Step 3: Auto-commit `tests/visual/**/*.png` on Step-2 success only.
  - **Permissions:** `contents: write`
  - **Loop guards (Council D6 — both):**
    - Job condition: `if: github.actor != 'github-actions[bot]'`
    - Auto-commit message includes `[skip ci]` trailer
  - Default `GITHUB_TOKEN` (no PAT — workflow_dispatch + commit doesn't cross trigger boundaries)
- Update `.gitignore` lines 16–20: remove `tests/visual/*-snapshots/` ignore; keep comment block explaining when to re-add (e.g. "if Linux Docker baselines prove unstable, re-add and revert below").
- **Initial baseline commit:** run `regen-visual-baselines.sh` locally OR trigger workflow once during P3 execution. Commit 13 PNGs (~2MB est).
- Flip `Game/founding-realm/.github/workflows/ci.yml:210` (Pass C-2 visual job): `continue-on-error: true` → `false`. Visual gate now fails the build on any diff > 1%.

**Determinism validation (Council D5 — raised from 2× to 3×):**
- Run `regen-visual-baselines.sh` **3×** before flipping the gate (was: 2×).
- Diff each pair: if any baseline diverges > 0.5% across runs → **escalation path:**
  - First fallback: raise `maxDiffPixelRatio` from 0.01 → 0.015 in `playwright.config.ts:17`; document the relaxation in commit body.
  - Second fallback: skip the gate flip; file S81 ticket "Investigate Linux baseline determinism (Phaser canvas / font hinting / WebGL)"; ship P3 as scripts-only, no enforcement change.

**Out of scope:**
- Mobile-device baseline fail-on-diff (iPhone 13 / iPad Pro 11) — stay advisory (Council D14). **PRIME-AUDIT note:** S81 P1 callback pre-filed to tighten mobile after 30 days desktop stability; surfaces R14 rot risk.
- Per-PR auto-baseline updates via `[ci update-baselines]` trailer (S81+).
- Visual diff PR comments — Playwright HTML report artifact upload from existing job is sufficient.
- Migrating off `mcr.microsoft.com/playwright` to custom-built image.
- GCS-hosted baselines (Council D5 creative — S82+).

---

## CONSTRAINTS

- Solo workflow: parent commits to `main`, submodule commits to `master`. No feature branches.
- All 625 existing tests (608 sim + 4 a11y + 13 visual) remain GREEN through every commit. Regressions block ship.
- Bundle gate <300KB (currently 285.5KB) — TTS work is server-side; client bundle MUST NOT grow.
- Token budget GREEN <80K. Stop & /handoff at 130K (YELLOW→RED transition).
- `GOOGLE_CLOUD_API_KEY` loaded from `BRAIN/infrastructure/CREDENTIALS_VAULT.json` `google_cloud_api` block at boot. Never hardcoded; never committed in `.env` or any source file.
- New `ai_*.mp3` filename: `ai_{contentId}.mp3` (no colons in filename — `:` reserved for path separator on Windows).
- CI runs Ubuntu latest with Node 20 (S79 engines pin); Docker image `mcr.microsoft.com/playwright:v1.59-jammy` is the contract.
- a11y ratchet tightening must remain reversible in 1 commit (single `FAIL_SEVERITIES` const change per spec).
- TTS char budget: 100K chars per `tts:synthesize` run (hard cap). Monthly forecast ~$1.20 at 100 new lines/mo.

---

## ASSUMPTIONS

| # | Assumption | Verification |
|---|-----------|--------------|
| A1 | Cloud Text-to-Speech REST API enabled + billed on `project-d87cb793-3f56-4dd8-bb5` | Pre-flight: `curl -fsS 'https://texttospeech.googleapis.com/v1/voices?key=$KEY' \| jq '.voices \| length'` returns ≥100 |
| A2 | Chirp 3 HD voice IDs (Charon/Kore/Fenrir/Aoede/Puck/...) still served | Same pre-flight `/v1/voices` returns each name |
| A3 | `mcr.microsoft.com/playwright:v1.59-jammy` Linux rendering bit-stable across runs | Validate by 3× regen pre-flip; >0.5% triggers fallback path |
| A4 | `GITHUB_TOKEN` default `permissions: contents: write` allows auto-commit on workflow-triggered branches | Test on `s80-baseline-test` throwaway branch first |
| A5 | TTS queue volume sub-linear in player count (~20 lines per (npcId, intent) pair before clustering caps it) | Monitor SQLite row count after 1 week of real play; intent normalization (S81) caps |
| A6 | Tightening serious-fail will not cascade-fail game2d/admin specs after landing.html fixes | Decision tree pre-committed (D8) — runs full a11y suite during P2 |
| A7 | Cloud TTS API key loaded from CREDENTIALS_VAULT into `.env` won't leak in logs | Code review: synthesis script never logs `process.env.GOOGLE_CLOUD_API_KEY`; only "[redacted]" markers |
| A8 | Generated AI line audio matches static manifest tone (same Chirp 3 HD voices) | Manual A/B on 5 sample lines before bulk synthesis; **brand-quality concern explicitly logged for S81 upgrade** (Council D2) |
| A9 | `better-sqlite3` ships prebuilt Windows binaries for Node 20 | Verified: package.json publishes `prebuilds/win32-x64/`; npm install does no native build |
| A10 | Cloud TTS pricing for Chirp 3 HD ~$20/M chars (Studio tier) — verify in pre-flight | Check via tiny test synthesis + GCP billing console; lifetime project ceiling $6.36 at projected volumes |

---

## RISKS

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R1 | TTS quota burn / runaway cost | Med | Med ($) | 100K char hard cap per run + 60 req/min rate limit + S81 budget alerting if spend >$10/mo |
| R2 | Chirp 3 HD voice deprecation breaks generation | Low | Med | Pin voice IDs; neural2 fallback per NPC; pre-flight `/v1/voices` fails fast |
| R3 | Generated AI audio diverges from static (tone/quality) | Med | High brand | Same Chirp 3 HD voices as static; manual A/B 5 lines; **S81 P0 upgrade ticket pre-filed** (Council D2) |
| R4 | Docker baselines flaky across runs (font drift / Phaser canvas / WebGL timing) | Med | High | 3× regen verification + threshold-relax fallback (0.01 → 0.015) + skip-flip escalation (Council D5) |
| R5 | a11y ratchet tightening cascade-fails game2d/admin | Med | Med | Conditional decision tree pre-committed (Council D8); per-spec narrowing as fallback |
| R6 | CREDENTIALS_VAULT load fails on CI (no vault access) | High | Low | TTS synthesis runs locally + dedicated CI workflow uses GH Secret `GOOGLE_CLOUD_API_KEY`; main CI never reads vault |
| R7 | `ai:*` MP3 commits bloat git history | Med | Low | S80: plain git (300+ entries × 20KB = 6MB max); **schema future-proofs GCS migration in S81** (Council D1) |
| R8 | Auto-commit workflow self-loop | Low | High | `actor != github-actions[bot]` job-level guard + `[skip ci]` commit message trailer (Council D6) |
| R9 | ~~JSONL concurrent corruption~~ → ELIMINATED | — | — | SQLite `INSERT OR IGNORE` + WAL mode is fully concurrent-safe (Council D3) |
| R10 | Vertex API billing not enabled at pre-flight | Low | High | If `/v1/voices` 200 + 1-char synthesis works → green light; else escalate to Daniel, proceed with P2+P3 only |
| R11 | TTS response is empty / 500-byte error masquerading as success | Med | Med | Sanity gate: reject `audioContent < 500 bytes`; reject duration `>10s` (Council D11) |
| R12 | Brand quality (AI voice sounds robotic next to human static lines) | Med | High brand | Voice consistency held (same Chirp 3 HD); explicit S81 P0 = Studio voice / Custom Voice upgrade (Council D2) |
| R13 | better-sqlite3 native binary fails on Windows | Low | Med | Prebuilt binaries verified; fallback: switch to sql.js (pure JS, slower but no native) |
| R14 | Mobile baselines rot under advisory-permanent (Council D14 silent agreement) | Med | Low | S81 P1 ticket pre-filed: "Tighten iPhone 13 + iPad Pro 11 baselines to fail-on-diff once desktop has 30 days stability". Until then, mobile diffs surface in workflow logs (advisory) — review post-flip CI runs weekly. |
| R15 | CI baseline regen produces baselines that differ from local 3× verified set | Med | Med | PRIME-AUDIT add: visual-baseline.yml runs Step-1 (regen) + Step-2 (smoke verify) inline. If Step-2 fails, no commit happens; surface failure in workflow logs for manual investigation. |

---

## TESTING

### P1 verification

**Unit:** `tests/tts-queue.test.ts`
- INSERT OR IGNORE idempotency (3 inserts same lineId → 1 row)
- Bootstrap dedup against existing manifest entries (2 lineIds in manifest → not enqueued)
- Schema CREATE IF NOT EXISTS safe re-run (no DROP)
- WAL mode concurrent read safety (server reading while script writes)

**Integration:** `tests/tts-synthesize.test.ts`
- Mock global `fetch` → assert request URL/body/headers shape per Cloud TTS contract
- Response base64 decode → MP3 write path matches `public/assets/audio/npc-voices/{npcId}/ai_{contentId}.mp3`
- Manifest patch JSON-roundtrip (no schema corruption on partial state)
- Error paths: 401 (abort + clear vault-pointer message), 429 (retry w/ backoff), 503 (retry-then-fail), char-cap halt
- Sanity gates: audioContent < 500 bytes → fail with "TTS error masquerade"; duration > 10s → fail; > 5s → warn

**Manual QA:**
- Pre-flight: `npm run tts:queue:status` (empty queue) + `curl ... /v1/voices?key=$KEY` (200 + Chirp 3 HD names)
- Inject 3 ai:* lines from real Anthropic emit_dialogue output (set `DISABLE_AI=0` + `ANTHROPIC_API_KEY`), play in browser, A/B on tone/pace vs static
- Brand check: do AI lines feel like the same character as static lines? (acceptance threshold: pass)

**CI:** `npm run tts:queue:status` exits 0 if queue is empty after `tts:synthesize` run (or if 0 pending older than 7 days)

### P2 verification
- `npx playwright test tests/a11y --project=chromium-desktop` → 0 critical AND 0 serious on landing.html
- D8 decision tree:
  - Run game2d.spec.ts under tightened ratchet
  - If 0 serious → tighten game2d.spec.ts:29 too (commit message documents)
  - Else → leave at `["critical"]`, file S81 ticket with enumerated violations
- Lighthouse a11y score ≥ 95 on landing.html (sanity, not gate)
- Visual diff on landing.html (4 baselines): minor color change → re-baseline as part of P3

### P3 verification
- Local: `bash scripts/regen-visual-baselines.sh` produces 13 PNGs in `tests/visual/*-snapshots/`
- Determinism: 3× run; pixel-diff each pair; if any baseline > 0.5% drift across runs → escalation path
- CI: trigger `visual-baseline.yml` via workflow_dispatch on throwaway branch `s80-baseline-test`; verify auto-commit lands; verify Pass C-2 against committed baselines passes
- Negative: introduce 1px CSS shift in landing.html on throwaway branch; verify Pass C-2 fails (gate works)
- Confirm `ci.yml` Pass C-2 line shows `continue-on-error: false` after flip
- Loop-guard test: workflow auto-commits on `s80-baseline-test`; verify NO follow-up workflow run triggered (actor guard works)

### Cross-priority sequencing
- After P2 lands: regen 4 landing baselines (run `regen-visual-baselines.sh` post-P2 commit, before P3 commits enforce-flip)
- Final: full CI dry-run (push to staging branch, observe all jobs green; specifically Pass C-2 enforcing)

---

## ROLLBACK

### P1 rollback (per-commit atomic)
- `git revert <p1-submodule-sha>` removes scripts + tts-queue.ts + crafting.ts wiring + manifest changes + .env.example line
- Audio files: `git rm Game/founding-realm/public/assets/audio/npc-voices/*/ai_*.mp3` (filename pattern `ai_*.mp3` is grep-able)
- SQLite db: `rm Game/founding-realm/data/tts-queue.db` (no schema migration of static manifest required — bootstrap is idempotent)
- Client tolerates missing manifest entries (S79 P1 design); no crash

### P2 rollback
- Single `git revert` undoes ratchet const + landing color changes atomically (one commit)
- No data migration; safe revert any time

### P3 rollback (two-stage)
1. Flip `ci.yml` Pass C-2 back to `continue-on-error: true`
2. Re-add `tests/visual/*-snapshots/` to `.gitignore`, `git rm -r tests/visual/*-snapshots/`
- Workflow `visual-baseline.yml` can stay dormant or be deleted — harmless either way
- If gate flip causes false positives in subsequent commits, the manual revert above unblocks while we tune `maxDiffPixelRatio`

---

## EXECUTION ORDER

**P1 → P2 → P3** (Council D12 AGREED)

**Per-priority pipeline:**
1. Pre-flight check (P1: vault key + `/v1/voices` 200; P2: read landing.html confirm color values; P3: Docker available locally)
2. Implementation (commits to submodule master)
3. Tests local green (full suite — sim + a11y + visual)
4. Submodule commit + push
5. Parent submodule pointer bump + commit + push
6. RALPH:PATROL on output (lightweight CHECK)
7. Reflexion entry to in-memory cross-session log
8. Print: `[ZERO] Priority N complete. API: Grok N calls ($X.XX), Gemini N calls ($X.XX).`
9. Move to next priority

**Council CHECK phase per priority (Full tier):** Triumvirate (RALPH + GROK-ANALYST + GEMINI-AUDITOR) on each delivered priority. PRIME-AUDIT before user-facing summary.

---

## OPEN QUESTIONS (post-Council; for user)

All R1 open questions resolved by Council. Two residual items for user awareness:

1. **Brand-quality upgrade timing (Council D2):** Studio voices / Custom Voice training is S81 P0. Estimate: $1K+ Custom Voice training cost. Daniel approval needed pre-S81 for budget commitment. Acknowledged or want to address in S80?
2. **Cloud TTS pricing variance:** Chirp 3 HD pricing assumed at $20/M chars (Studio tier). Will verify pre-flight; if pricing is different by >2x, escalate before bulk synthesis. Acceptable?

---

## SUCCESS METRICS

- P1: AI lineId emitted by LLM emit_dialogue → audible MP3 plays for player within 1 cycle of `npm run tts:synthesize`. Static-vs-AI tone consistency rated "same character" by Daniel on 5-line manual A/B.
- P2: 0 critical AND 0 serious axe violations on landing.html. game2d.spec.ts ratchet decision pre-committed and acted on.
- P3: Pass C-2 visual gate is `continue-on-error: false` AND a 1px CSS test-shift triggers a CI fail (gate proven).

**Batch:** 625+ tests GREEN through completion. Bundle <290KB (300KB gate). Token budget ≤80K (GREEN). 0 SPLIT escalations to user during execution.
