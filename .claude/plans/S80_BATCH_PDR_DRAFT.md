# S80 BATCH PDR — Vertex TTS + a11y Tighten + Linux Visual Baseline

**Tier:** Full (projected ~55K — Standard×2 + Micro batched; "highest tier" rule)
**Deliberation:** 3-way Council (Claude + Grok + Gemini), 2 rounds + quality gate, Battle Ledger
**Execution mode:** Sequential (P1 → P2 → P3) on user-batched approval
**Source:** S79 boot-snapshot.md + handoff Next Steps; S79 Council C6 deferral

---

## OBJECTIVE

Three coherent quality investments coordinated as one batch so the cross-priority dependencies (audio gen → contrast tightening → visual gate enforcement) land in one session:

1. **P1 — Generative voice for AI NPC dialogue.** Close the loop opened by S79 P2: `ai:{npcId}:{contentId}` lineIds are computed and emitted but currently silent because no manifest entry exists. Pipeline must produce real MP3s from real LLM-emitted dialogue.
2. **P2 — Tighten the a11y ratchet to fail on `serious`.** Currently `FAIL_SEVERITIES = ["critical"]` lets all known landing.html color-contrast violations through. Fix the underlying CSS, then flip the gate.
3. **P3 — Linux visual baselines + Pass C-2 enforcement.** Snapshots are gitignored due to Windows/Linux render drift. Generate deterministic baselines in a Playwright Docker container, commit them, flip Pass C-2 from `continue-on-error: true` → `false`.

---

## SCOPE

### P1 — Vertex (Cloud) TTS pipeline (Standard, ~30K)

**Strategy:** Hybrid build-time queue + on-disk MP3 cache. (Rejected: pure runtime synthesis, lazy-on-demand client request — see ALTERNATIVES.)

**In scope:**
- New `Game/founding-realm/scripts/tts-synthesize.js` — Node script that:
  - Reads `data/tts-queue.jsonl` (one JSON per line: `{npcId, lineId, text, intent, emotion, voice, speakingRate, ts}`)
  - For each entry where the manifest has no audio file, calls Cloud Text-to-Speech REST API: `POST https://texttospeech.googleapis.com/v1/text:synthesize?key=$GOOGLE_CLOUD_API_KEY` with `{input:{text}, voice:{languageCode:'en-US', name:voice}, audioConfig:{audioEncoding:'MP3', speakingRate}}`
  - Decodes base64 `audioContent` → writes `public/assets/audio/npc-voices/{npcId}/{lineId-sanitized}.mp3`
  - Patches `voice-manifest.json` v2 entries
  - Concurrency: max 4 parallel requests; retry-with-backoff on 429/503; abort on 401/403 (key issue) with clear error
  - Idempotent: skips lineIds already present in manifest with valid MP3 on disk

- New `Game/founding-realm/src/modules/npc/tts-queue.ts` — server-side append-only logger:
  - `enqueueAILine(entry)` writes one JSON line to `data/tts-queue.jsonl` (atomic append, dedup by lineId via in-memory Set bootstrapped from existing manifest at startup)
  - Called from `crafting.ts:197` post-`computeAILineId` only when manifest has no entry

- Wire into `crafting.ts` — after `computeAILineId(text, intent, npcId)` produces the `ai:*` lineId:
  - If `voiceManifest[`${npcId}:${lineId}`]` exists → behave as today (client plays cached MP3)
  - Else → `enqueueAILine({...})`, emit lineId anyway (client tolerates miss → text-only display per S79 P1 design)

- Reuse `npc-tts-config.ts` (Chirp 3 HD voices + speakingRate) — same per-NPC voice as static manifest. Pin voice names: `en-US-Chirp3-HD-{Charon|Kore|Fenrir|Aoede|Puck|...}`. Add neural2 fallback (`en-US-Neural2-D` etc.) per-NPC for graceful degradation if Chirp deprecates.

- New env var `GOOGLE_CLOUD_API_KEY` in `.env.example` with comment pointing to `BRAIN/infrastructure/CREDENTIALS_VAULT.json` `google_cloud_api` block. `.env` (real) populated by Daniel during pre-flight.

- New npm scripts:
  - `tts:synthesize` → run `scripts/tts-synthesize.js`
  - `tts:queue:status` → print queue length + missing-MP3 count, exit 1 if stale

- Tests: `tests/tts-queue.test.ts` (append idempotency, JSONL roundtrip, dedup against manifest), `tests/tts-synthesize.test.ts` (mocked fetch — verify request shape, MP3 write path, manifest patch)

**Phase 1.5 (in scope, off by default):**
- Runtime synthesis flag `TTS_RUNTIME_ENABLE=1` — when set, server synchronously synthesizes on first emit (3–5s latency). Off in production by default; available for local dev / future CDN-caching workflow.

**Out of scope (S81+):**
- Emotion → SSML prosody mapping (emotion field stays metadata-only this session).
- GCS bucket persistence (audio stays git-tracked; revisit if repo bloat exceeds 50MB).
- Vertex AI Gemini-Audio multimodal generation (Cloud TTS w/ Chirp 3 HD is the API; "Vertex" in handoff is colloquial).
- Audio quality A/B against human-recorded static lines beyond manual sample of 5 lines.

### P2 — Ratchet tighten + landing.html contrast fix (Micro, ~5K)

**In scope:**
- Fix 7 color tokens in `Game/founding-realm/public/landing.html` `<style>` block (all in inline `<style>`; no external CSS):
  - `.sub-motto` (line 67): `#6a6558` → `#cdc5b3` on `#060810` body bg
  - `.fest-sub` (line 144): `#5a5a52` → `#b8a89c` on `rgba(26,21,14,.6)`
  - `.server-info` (line 165): `#5a5a52` → `#c4b5a8` on `rgba(20,16,10,.92)`
  - `.auth-sub` (line 102): `#6a6558` → `#c4b5a8` on `rgba(26,21,14,.88)`
  - `.pillar p` (line 190): `#8a8678` → `#a89c8f` on `rgba(26,21,14,.7)`
  - `.auth-toggle` (line 123): `#6a6558` → `#c4b5a8` on `rgba(26,21,14,.88)`
  - `input::placeholder` (line 111): `#6a5e4a` → `#9a8e7a` on `rgba(20,16,10,.8)`
- Each new color verified ≥4.5:1 (normal text) or ≥3:1 (large text ≥18pt) against actual blended bg using WCAG contrast formula.
- Tighten ratchet at `tests/a11y/landing.spec.ts:24`: `FAIL_SEVERITIES = ["critical","serious"]`
- Run a11y suite to verify 0 critical + 0 serious on landing.html
- **Verify game2d/admin under tightened ratchet** at `tests/a11y/game2d.spec.ts:29`. If they fail:
  - Narrow to landing-only by leaving `game2d.spec.ts:29` at `["critical"]` (per-spec const)
  - Document in P2 commit body why game2d ratchet stayed loose; create S81 tracker entry

**Out of scope:**
- festival.html / festival-fr.html / festival-admin.html (same palette but no a11y test coverage yet — S81)
- WCAG AAA (7:1) — AA is the gate
- Visual regen of landing.html screenshot baseline (handled in P3 batch baseline regen)

### P3 — Linux visual baseline generator + Pass C-2 enforcement (Standard, ~20K)

**In scope:**
- New `Game/founding-realm/scripts/regen-visual-baselines.sh`:
  - Spins up `mcr.microsoft.com/playwright:v1.59-jammy` Docker container
  - Mounts repo as `/app` (read-write for `tests/visual/` only)
  - Inside: `npm ci --no-audit --prefer-offline && npx playwright test tests/visual --update-snapshots --project=chromium-desktop`
  - Sets `DISABLE_AI=1`, `NODE_ENV=test`
  - Documented to be run locally on Daniel's box (Docker Desktop available) OR via CI workflow
- New `.github/workflows/visual-baseline.yml`:
  - `workflow_dispatch` trigger (manual, optionally `branch` input)
  - Runs `mcr.microsoft.com/playwright:v1.59-jammy` directly as `container:` image (no nested Docker needed)
  - Runs same npx command as script
  - Commits `tests/visual/**/*.png` back to triggering branch
  - Loop guard: `if: github.actor != 'github-actions[bot]'` on triggering condition
  - Uses default `GITHUB_TOKEN` with `permissions: contents: write`
- Update `.gitignore` lines 16–20: remove `tests/visual/*-snapshots/` ignore now that baselines are committed. Keep a comment explaining the prior pattern + when to re-add it.
- Initial baseline commit: run `regen-visual-baselines.sh` locally OR trigger workflow once during P3 execution. Commit 13 PNGs (~2MB total estimated).
- Flip `Game/founding-realm/.github/workflows/ci.yml:210` (or wherever `continue-on-error: true` is set on Pass C-2): change to `continue-on-error: false`. Visual gate now fails the build on any diff > 1%.
- **Determinism validation:** run baseline regen 2× before flipping the gate. If 2 runs diverge >0.5% on any baseline, raise `maxDiffPixelRatio` from 0.01 → 0.015 instead of flipping the gate; document the relaxation.

**Out of scope:**
- Mobile-device baselines for fail-on-diff (iPhone 13 / iPad Pro 11 stay advisory). Only `chromium-desktop` enforced.
- Per-PR auto-baseline updates via `[ci update-baselines]` commit trailer (S81; needs branch-protection bypass design)
- Visual diff comments on PRs (Playwright HTML report artifact upload from existing job is sufficient)
- Migrating off `mcr.microsoft.com/playwright` to a custom-built image

---

## CONSTRAINTS

- Solo workflow: parent commits to `main`, submodule commits to `master`. No feature branches.
- All 625 existing tests (608 sim + 4 a11y + 13 visual) remain GREEN through every commit. Regressions block ship.
- Bundle gate <300KB (currently 285.5KB) — TTS work is server-side; client bundle MUST NOT grow.
- Token budget GREEN <80K. Stop & /handoff at 130K (YELLOW→RED transition).
- `GOOGLE_CLOUD_API_KEY` loaded from `BRAIN/infrastructure/CREDENTIALS_VAULT.json` `google_cloud_api` block at boot. Never hardcoded; never committed in `.env` or any source file.
- New `ai:*` MP3s obey existing convention `public/assets/audio/npc-voices/{npcId}/{filename}.mp3`. Filename sanitization: `${lineId}` → replace `:` with `_` (lineId already lowercase + safe chars).
- CI runs Ubuntu latest with Node 20 (S79 engines pin); Docker image `mcr.microsoft.com/playwright:v1.59-jammy` is the contract.
- a11y ratchet tightening must remain reversible in 1 commit (single `FAIL_SEVERITIES` const change).

---

## ASSUMPTIONS

| # | Assumption | Verification |
|---|-----------|--------------|
| A1 | Cloud Text-to-Speech REST API is enabled + billed on `project-d87cb793-3f56-4dd8-bb5` | Pre-flight: `curl 'https://texttospeech.googleapis.com/v1/voices?key=$KEY'` expect 200 |
| A2 | Chirp 3 HD voice IDs (Charon/Kore/Fenrir/Aoede/Puck) still served | Same pre-flight `/v1/voices` returns each name |
| A3 | `mcr.microsoft.com/playwright:v1.59-jammy` Linux rendering is bit-stable across runs | Validate by 2× regen pre-flip |
| A4 | `GITHUB_TOKEN` default permissions allow auto-commit on workflow-triggered branches | Test on disposable branch first |
| A5 | TTS queue volume sub-linear in player count (~20 lines per (npcId, intent) pair before clustering) | Monitor queue size after 1 week of real play; intent normalization (S81) will cap |
| A6 | Tightening serious-fail will not cascade-fail game2d/admin specs after landing fixes | Run full a11y suite during P2 |
| A7 | Cloud TTS API key from CREDENTIALS_VAULT loaded into `.env` won't leak in logs | Code review checklist; audit logger calls don't print process.env |
| A8 | Generated audio quality from Chirp 3 HD matches static manifest tone (same voices used) | Manual A/B on 5 sample lines before bulk synthesis |

---

## RISKS

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R1 | TTS quota burn / runaway cost from runtime synthesis loop | Med | High ($) | Build-time only by default; runtime flag opt-in; rate-limit at 60 req/min in synth script |
| R2 | Chirp 3 HD voice deprecation breaks generation pipeline | Low | Med | Pin voice ID in npc-tts-config; provide neural2 fallback per NPC; pre-flight `/v1/voices` check fails fast |
| R3 | Generated AI line audio diverges in tone/quality from human-recorded static lines | Med | Med | Manual A/B sample 5 lines before bulk; if quality gap, gate AI line audio behind player setting `voiceAILinesEnabled=false` default |
| R4 | Docker baselines flaky across container restarts (sub-pixel font drift) | Med | High | Run 2× pre-flip; if >0.5% diff between runs on any baseline, raise threshold to 0.015 instead of flipping |
| R5 | Tightened a11y ratchet cascade-fails game2d/admin specs | Med | Med | Per-spec FAIL_SEVERITIES const; landing-only fallback documented in P2 SCOPE |
| R6 | CREDENTIALS_VAULT load fails on CI (no vault access by design) | High | Low | TTS synthesis runs locally + dedicated CI workflow uses GH Secret `GOOGLE_CLOUD_API_KEY`; main CI never reads vault |
| R7 | `ai:*` MP3 commits bloat git history | Med | Low | Plain git for now (≤30 entries × ~20KB = 600KB); migrate to git-LFS at >100MB threshold |
| R8 | Auto-commit visual workflow loops (commits trigger itself) | Low | High | `if: github.actor != 'github-actions[bot]'` on trigger condition; commit message `[skip ci]` trailer as belt-and-suspenders |
| R9 | tts-queue.jsonl corruption from concurrent appends | Low | Med | fs.appendFileSync (line-atomic on POSIX/Windows ≤4KB); recovery: parse JSONL line-by-line, drop malformed lines on read |
| R10 | Vertex API billing pre-flight reveals account not enabled | Low | High | If pre-flight fails: pause P1, escalate to Daniel, proceed with P2+P3 only |

---

## ALTERNATIVES (for council deliberation)

### P1 alternatives
- **Alt-A (rejected):** Pure runtime synthesis on every emit (Strategy 2 from research brief). Simpler, but 3–5s perceived latency every new line. Worse UX than build-time queue with text-only fallback.
- **Alt-B (rejected):** Lazy-on-demand client request (Strategy 3). Client posts to `/api/synthesize-voice` on cache miss. Rejected: thundering-herd if 2 clients hit same fresh lineId; server-side dedupe via build queue is cleaner.
- **Alt-C (rejected for now):** Vertex AI Gemini-Audio (newer, multimodal native generation). Higher quality potential but Preview-tier API stability risk. Recommend Cloud TTS w/ Chirp 3 HD; revisit Gemini Audio post-GA.
- **Alt-D (defer trigger):** Skip P1 entirely until intent normalization (S81) caps the line space. Rejected: chicken-and-egg — intent clustering needs real `ai:*` audio data to know which lines are worth keeping.

### P2 alternatives
- **Alt-A (rejected):** Tighten ratchet first, fix violations as they fire (TDD-style). Rejected — known violations means CI breaks immediately on first commit; we already know what to fix.
- **Alt-B (rejected):** Per-spec ratchet with allowlist file (`axe-allowlist.json` for festival/admin). Rejected — allowlists rot; explicit per-spec const is more honest about scope.
- **Alt-C (defer):** Move ratchet tightening to S81 after fixing more pages. Rejected — keeping known SERIOUS in main is technical debt; the PDR research says only 5–7 minimal CSS changes needed.

### P3 alternatives
- **Alt-A (rejected):** Playwright `update-snapshots: 'on-first-failure'` mode + auto-commit. Too magical; explicit workflow_dispatch is auditable.
- **Alt-B (rejected):** Run baseline regen on macOS runners. Rejected — Linux CI is the enforcement target; matching env matters more than matching dev OS.
- **Alt-C (rejected):** Skip P3 entirely; keep visual gate advisory permanently. Rejected — Pass C-2 was built for enforcement; advisory-permanently is sunk-cost waste.
- **Alt-D (defer):** Generate baselines in current CI matrix run (no new workflow), commit via PR. Rejected — couples baseline regen to general CI; pollutes commit history; explicit dispatch is cleaner.

---

## TESTING

### P1 verification
- **Unit:** `tests/tts-queue.test.ts` — append idempotency (3 calls same lineId → 1 entry), JSONL roundtrip (write → read → parse), dedup against existing manifest entries (2 lineIds in manifest → not enqueued)
- **Integration:** `tests/tts-synthesize.test.ts` — mock global `fetch` → assert request URL/body/headers shape, response decode, MP3 write path matches `public/assets/audio/npc-voices/{npcId}/{filename}.mp3`, manifest patch round-trips through JSON parse, error paths (401, 429, 503) handled
- **Manual:** sync-trigger 3 ai:* lines from real Anthropic emit_dialogue output (use `DISABLE_AI=0` + ANTHROPIC_API_KEY), verify MP3 plays in browser, A/B against static lines on tone/pace
- **CI:** `npm run tts:queue:status` exits 0 if queue empty after `tts:synthesize` run
- **Pre-flight:** `curl 'https://texttospeech.googleapis.com/v1/voices?key=...' | jq '.voices[] | select(.name | startswith("en-US-Chirp3-HD"))'` returns ≥5 voices

### P2 verification
- `npx playwright test tests/a11y --project=chromium-desktop` → 0 critical AND 0 serious on landing.html
- Verify game2d.html + admin.html still pass under tightened ratchet (else narrow per SCOPE clause)
- Lighthouse a11y score ≥ 95 on landing.html (sanity check, not gate)
- Visual regression on landing.html (4 baselines from Pass C-1) must still pass — color tokens are minor visual change, will need baseline regen as part of P3

### P3 verification
- First local Docker run: `bash scripts/regen-visual-baselines.sh` produces 13 PNGs in `tests/visual/*-snapshots/` directories
- Second local run: identical bytes (or ≤0.1% diff per baseline)
- CI: trigger `visual-baseline.yml` via workflow_dispatch on a sandbox branch; verify auto-commit lands; verify Pass C-2 against committed baselines passes
- Negative case: introduce 1px CSS shift in landing.html; verify Pass C-2 fails (gate works)
- Confirm `ci.yml` Pass C-2 line shows `continue-on-error: false` after flip

### Cross-priority
- After P2: regen 4 landing baselines (run `regen-visual-baselines.sh` after P2 commit)
- Final: full CI dry-run (push to staging branch, observe all jobs green)

---

## ROLLBACK

### P1 rollback (atomic per commit)
- `git revert <p1-submodule-sha>` removes scripts + tts-queue.ts + crafting.ts wiring + manifest changes
- Audio files: separate `git rm Game/founding-realm/public/assets/audio/npc-voices/*/ai_*.mp3` (filename pattern `ai_<contentId>.mp3` makes them findable)
- Client tolerates missing manifest entries (S79 P1 design); no crash on revert
- `.env`: revert removes `GOOGLE_CLOUD_API_KEY` line from `.env.example`

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

P1 → P2 → P3 (sequential; no parallel sub-batches)

**Rationale for order:**
- P1 is the marquee Council-deferred item; highest user value; needs full attention first while context is fresh
- P2 is fast (~5K) and unblocks P3's landing.html visual baseline (color changes need rebaselining)
- P3 is the cleanup that codifies enforcement; benefits from P2's CSS settled before regen

**Per-priority pipeline:**
1. Pre-flight checks → 2. Implementation → 3. Tests local green → 4. Submodule commit + push → 5. Parent submodule pointer bump + push → 6. RALPH:PATROL on output → 7. Reflexion entry → 8. Move to next

**Council CHECK phase per priority (Full tier):** Triumvirate (RALPH + GROK-ANALYST + GEMINI-AUDITOR) on each delivered priority. PRIME-AUDIT before user-facing summary.

---

## OPEN QUESTIONS FOR COUNCIL

1. **P1:** Is hybrid build-time+runtime-flag the right strategy, or should we go pure build-time (simpler) or commit to runtime as the long-term direction?
2. **P1:** Should `ai_*.mp3` files live in git, GCS, or a hybrid (git for first 100, GCS thereafter)? Repo-bloat vs. ops-complexity tradeoff.
3. **P1:** Is the dedup-on-startup in-memory Set acceptable, or should we use a SQLite manifest cache?
4. **P2:** Should we tighten game2d ratchet too, or only landing in this PDR? (Lean: only landing if game2d passes "for free"; defer if cascade.)
5. **P3:** Is `maxDiffPixelRatio` 0.01 the right enforcement threshold, or should we start at 0.015 (looser) and tighten later?
6. **P3:** Should mobile baselines (iPhone 13, iPad Pro 11) flip to fail-on-diff in this PDR or stay advisory?
7. **Sequencing:** Is P1 → P2 → P3 correct, or is P2 → P3 → P1 (low-risk first) better given P1 carries the most surface area?
