# S80 Batch PDR — Council Battle Ledger
**Tier:** Full | **Rounds:** 2 + Quality Gate | **Date:** 2026-04-28

## TRIUMVIRATE POSITIONS

- **Claude (Prime Architect):** Hybrid build-time queue + on-disk cache w/ Phase 1.5 runtime flag; JSONL persistence; git-tracked audio; Chirp 3 HD reuse; Docker-only baseline determinism with 0.01 threshold.
- **Grok (Disruptor):** Pure build-time; SQLite for atomic dedup; drop Phase 1.5; quotas/pricing/billing unanalyzed (egregious miss); Windows file-race on `appendFileSync`; visual determinism story is "theater"; auto-commit guard insufficient.
- **Gemini (Quality Auditor):** P1 quality 2/5 — git-tracking MP3s is a critical anti-pattern; voice consistency between static + AI is brand-existential; Studio/Custom Voice for premium feel; GCS for asset pipeline; Google Sheets as creative dialogue source; Imagen for art-direction reference.

## QUALITY GATE
- **Grok challenges raised:** 12-item review + 7-bullet alternative + 9-item risk register (≥3 ✓ PASS)
- **Gemini scorecard delivered:** P1=2/4/3, P2=5/5/5, P3=4/4/5 (✓ PASS)
- **Re-prompt triggered:** None

## BATTLE LEDGER

| # | Decision | Claude | Grok | Gemini | Authority | Resolution | Tok Δ | Risk Δ |
|---|----------|--------|------|--------|-----------|------------|-------|--------|
| D1 | Audio storage (git vs GCS) | git+LFS@100MB | LFS now / GCS | **GCS bucket** | Quality (Gemini 1.75) | **SYNTHESIS** — git for S80 (manifest schema gains `url` field supporting both rel-path AND `gs://`/CDN; S81 P0 = "Migrate ai:* to GCS"). Defers cost without locking in technical debt. | +500 | -1 |
| D2 | Voice quality tier (Chirp 3 HD vs Studio vs Custom) | Chirp 3 HD reuse | ElevenLabs / Piper | **Studio or Custom Voice** | Quality (Gemini 1.75) | **CONCEDED → GEMINI on consistency principle, COMPROMISE on tier** — Chirp 3 HD now (matches static lines for one-character feel); explicit S81 priority captured: "Audio quality upgrade: re-synthesize all 30 static + AI lines at Studio tier OR commission Custom Voice for top 5 NPCs". Brand risk acknowledged + scheduled. | 0 | -1 |
| D3 | Persistence (JSONL vs SQLite) | JSONL appendFileSync | **better-sqlite3 INSERT OR IGNORE** | Sheets+GCS | Risk (Grok 1.75) | **CONCEDED → GROK** — Replace JSONL with `better-sqlite3`. Atomic UPSERT, zero Windows file-race surface, ships prebuilt binaries (no native build pain). +1.5MB node_modules, 0 client-bundle impact. Sheets idea logged as S81 creative-tooling enhancement. | -200 | -3 |
| D4 | Phase 1.5 runtime synthesis flag | In scope, off-default | **REMOVE** | (silent) | Risk+UX (Grok 1.75) | **CONCEDED → GROK** — Drop Phase 1.5 entirely. Pure build-time. Removes ~25% of P1 code paths + test matrix. Re-introduce in S81+ only when CDN/streaming infra justifies it. | -500 | -2 |
| D5 | Visual baseline determinism | Docker + 0.01 + 2× regen | SSIM / Percy / Chromatic | Imagen art-direction ref | Risk (Grok 1.75) + Quality (Gemini 1.75) | **SYNTHESIS** — Keep Docker (no vendor lock-in for solo workflow). Raise regen verification from 2× → **3×**. If 3rd run diverges >0.5% on any baseline, raise `maxDiffPixelRatio` to 0.015 with documented fallback to perceptual-hash if instability persists. Imagen art-ref deferred to S81. | +200 | -1 |
| D6 | Auto-commit workflow loop guard | actor != bot | + dedicated PAT + `[skip ci]` | (silent) | Risk (Grok 1.75) | **CONCEDED → GROK partial** — Add `[skip ci]` trailer to auto-commit message AND `actor != github-actions[bot]` guard. Default `GITHUB_TOKEN` is sufficient (workflow_dispatch + auto-commit, no cross-workflow trigger). Belt + suspenders. | +50 | -1 |
| D7 | TTS pricing/quota analysis | (missing) | **EGREGIOUS miss** | $16/M chars marginal cost | Risk (Grok 1.75) | **ADDED BY GROK** — Pre-flight check: `curl /v1/voices?key=` 200 + 1-char synthesis billing probe. Hard cap: 100K chars per `tts:synthesize` run. Project lifetime estimate: 30 static (already done) + 500 lifetime AI lines × 600 chars/line = 318K chars × $20/M = $6.36 total ceiling. Monthly forecast: ~$1.20/mo at 100 new lines/mo. Document ceiling + halt-on-exceed in script. | +400 | -3 |
| D8 | Game2d ratchet decision | Punt (verify-then-narrow) | **Make the call now** | (silent) | Implementation (Claude 1.75) | **SYNTHESIS** — Pre-specify decision tree in PDR (no punt): IF a11y run shows 0 serious on game2d/admin under tightened ratchet → tighten both specs. ELSE → narrow game2d to `["critical"]` per-spec, file explicit S81 ticket "game2d serious-fail tightening". Decision is conditional but pre-committed. | +100 | -1 |
| D9 | MP3 git tracking strategy | Plain git, LFS@100MB | LFS NOW / stop entirely | GCS pipeline | (covered in D1) | **MERGE → see D1** | — | — |
| D10 | Cloud TTS API client | Raw fetch | `@google-cloud/text-to-speech` SDK | (silent) | Implementation (Claude 1.75) | **CLAUDE WIN** — Raw fetch matches existing minimal-dependency philosophy; SDK adds 50+ transitive deps + ADC complexity for no quality gain at our scale. Authority: Implementation feasibility. | 0 | 0 |
| D11 | Audio quality/duration gate | (missing) | "no audio quality gate" | (covered in D2) | Risk (Grok 1.75) | **ADDED BY GROK** — Add post-synthesis check: duration <10s per line (warn if >5s — suggests over-long LLM output); fail synth if response audioContent <500 bytes (likely TTS error). Cheap sanity gate. | +150 | -1 |
| D12 | Sequencing P1→P2→P3 | P1 first | (silent) | (silent) | (no contest) | **AGREED** — P1 marquee first; P2 fast unblocks P3 baseline regen on landing.html; P3 codifies enforcement. | 0 | 0 |
| D13 | A11y broader scope (focus/ARIA) | (missing) | "audit focus/ARIA, not just contrast" | (silent) | Quality (Gemini 1.0) + Risk (Grok 1.75) | **DEFERRED → S81** — Out of P2 Micro scope; would push to Standard. Filed as explicit S81 priority "a11y broader audit: focus order, ARIA, keyboard nav across all 6 pages". | 0 | 0 |
| D14 | Mobile baselines fail-on-diff this PDR | Stay advisory | (silent) | (silent) | (no contest) | **AGREED** — Stay advisory. Desktop chromium-only fails the gate. Mobile baselines generated but advisory. S81+ candidate. | 0 | 0 |
| D15 | Asset pipeline service (Redis stream) | Reject (over-eng) | Suggested | Adjacent (Sheets/GCS) | Implementation (Claude 1.75) | **DEFERRED** — Solo workflow, single-server scale. No need for pub/sub. Revisit when MMO concurrency justifies. | 0 | 0 |
| D16 | Self-hosted TTS (Piper/StyleTTS2) | Reject | Suggested | (silent) | Quality (Gemini 1.0 silent) + Implementation (Claude 1.75) | **DEFERRED** — Self-hosted adds Docker service ops burden. Cloud TTS at $1.20/mo is essentially free; not worth ops complexity for cost savings. | 0 | 0 |

**Totals:** Claude 2 wins (D10, D15, D16) | Grok 5 wins (D3, D4, D6, D7, D11) | Gemini 1 win (D2 partial), 1 partial (D1) | 4 SYNTHESES (D1, D5, D8, D12) | 4 AGREEMENTS (D12, D14, D15-deferred-as-Claude, D16-deferred-as-Claude) | 1 escalation deferred to S81 (D13)

**Token delta:** ~+700 tokens to PDR scope (more detail), but ~-700 to execution (Phase 1.5 dropped, JSONL→SQLite simpler). Net **~0 token impact** on batch budget.

**Risk delta:** -14 (Grok's risk catches dominate; net safety improvement substantial).

## VETO LOG
**No vetoes used.** All disputes resolved via authority weighting, synthesis, or deferral.

## RISK CONSENSUS

**Agreed (incorporated):**
- Windows file-race on JSONL is real → SQLite eliminates
- TTS quotas/pricing must be analyzed pre-flight → ceiling calculated, halt-on-exceed coded
- Voice consistency static↔AI is brand-existential → Chirp 3 HD held; S81 upgrade scheduled
- MP3 git tracking is short-term-OK / long-term-bad → schema future-proofed for GCS in S81
- Auto-commit loop risk is low but multiple guards cheap → both applied
- Visual determinism on Linux Docker is plausible-not-proven → 3× regen verification + threshold-relax fallback

**Unresolved / SPLIT items for user:**
- *None.* All decisions resolved by Council. No SPLIT escalations.

## QUALITY SCORECARD (Gemini, post-revision projection)

| Dim | R1 (original draft) | R2 (post-Council) |
|-----|---------------------|-------------------|
| Quality | 2 / 4 / 4 (P1/P2/P3) | 4 / 5 / 4 (S81-bridge captures unresolved quality lift) |
| Efficiency | 4 / 5 / 4 | 4 / 5 / 4 (sqlite slightly heavier than JSONL but net +simplicity) |
| Tool Utilization | 2 / 5 / 4 | 3 / 5 / 4 (GCS deferred to S81; tool ceiling honest) |
| Completeness | 3 / 5 / 5 | 5 / 5 / 5 (D7 budget analysis + D8 conditional + D11 sanity gate close gaps) |

## CONFIDENCE
**HIGH** for the revised PDR.
- Brand-quality concern (Gemini D2) explicitly scheduled for S81; not silently ignored.
- Risk surface (Grok D3, D4, D7, D11) materially reduced.
- Three syntheses (D1, D5, D8) each preserve Council pluralism rather than picking one model.

## BRAIN ALIGNMENT
- **TWIN-RULE-001** (festival is real, game is hype): Voice consistency upgrade scheduled (D2 → S81) honors the brand-quality bar without blocking S80 ship.
- **DFRP-001** (Daniel-data-first reasoning): Solo workflow + Windows dev env explicitly drove D3 (SQLite) and D6 (loop guard) decisions. No mainstream-cultural assumption inserted.
