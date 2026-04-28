═══════════════════════════════════════════════════════════
HANDOFF SUMMARY — Legacy of the Realm
Generated: 2026-04-28
Session: S80 — Cloud TTS pipeline + a11y serious-fail + Linux visual baselines (3/3 SHIP, Full-tier Council)
═══════════════════════════════════════════════════════════

## PROJECT
- Name: Legacy of the Realm (Founding Realm submodule)
- Working directory: C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm
- Git branch: main (parent) / master (submodule)
- Latest commit: f2b54f9 (parent) / 8f94892 (submodule)
- Tech stack: Node.js + TypeScript + Phaser 3 + WebSocket + Postgres + better-sqlite3 (NEW S80)
- Codebase: ~50K lines TS/JS across submodule + parent

## CURRENT STATE
- Build: tsc clean, esbuild bundle 285.5kb (gate <300KB, unchanged)
- Tests: **633 GREEN** (608 sim + 8 tts-queue NEW + 4 a11y tightened + 13 visual fail-on-diff)
- Deployment: local-only (port 3000), VPS deploy still blocked on Daniel
- Server: DOWN at session end (was DOWN at start; not needed for build-time TTS work)

## SESSION COST
- Council R1: Grok 1 call (~$0.05 grok-4.20-0309-reasoning), Gemini 1 call (~$0.02 gemini-2.5-pro)
- Total LLM API spend: ~$0.07
- Routed Claude tokens: ~125K UI counter (YELLOW range)
- Cumulative log: ~/.claude/usage-log.csv

## THIS SESSION'S WORK

**Council Full-tier deliberation (PLAN phase):**
- 16 Battle Ledger decisions: 14 revisions (87.5% disruption adoption); 0 vetoes; 0 SPLIT
- Wins distribution: Claude 3 (D10/D15/D16), Grok 5 (D3/D4/D6/D7/D11), Gemini 1+ partial (D2/D1)
- 4 SYNTHESES (D1/D5/D8/D12); 4 deferrals to S81+
- PRIME-AUDIT (Rule 20) added 2 gaps: R14 mobile-baseline-rot, R15 CI-determinism

**P1 — Cloud TTS pipeline (Standard, ~28K) — SHIP:**
- New `src/modules/npc/tts-queue.ts` (SQLite via better-sqlite3 v11.10, WAL mode, INSERT OR IGNORE atomic dedup, manifest-bootstrap-as-completed)
- New `src/modules/npc/npc-tts-config.ts` (per-NPC voice config + neural2 fallback)
- New `scripts/tts-synthesize.js` (Cloud TTS REST, raw fetch, concurrency 4, exp-backoff 429/503, abort 401/403, 100K char/run cap, sanity gates: <500 bytes reject, >10s fail, >5s warn, atomic manifest patch via tmp+rename)
- New `scripts/tts-queue-status.js` (status reporter; exit 1 if pending >7 days)
- Wired `crafting.ts:197` post-`computeAILineId` (non-fatal try/catch)
- `.env.example` documents `GOOGLE_CLOUD_API_KEY` with vault pointer
- `.gitignore` excludes `data/tts-queue.db` + WAL/SHM sidecars
- 8/8 new tests in `tests/tts-queue.test.ts`
- Pre-flight verified: 1568 Chirp3-HD voices live; lifetime cost ceiling $6.36
- Submodule: 97546cc, Parent: 8b73c5a

**P2 — A11y ratchet tighten + 8 landing.html contrast fixes (Micro, ~5K) — SHIP:**
- 8 colors lifted from 1.1–1.7:1 → 5.9–12.4:1 (all WCAG AA ≥4.5:1)
- Sites: .sub-motto, .auth-sub, .auth-toggle, .fest-sub, .server-info, .pillar p, input::placeholder, footer p (8th surfaced by tightened-ratchet probe; research agent missed)
- `tests/a11y/landing.spec.ts:24` `["critical"]` → `["critical","serious"]`
- `tests/a11y/game2d.spec.ts:31` ALSO tightened (Council D8 conditional satisfied — game2d/admin probe showed 0 serious)
- 4/4 a11y tests GREEN under tightened ratchet
- Submodule: 9b5e129, Parent: c33f2fb

**P3 — Linux visual baselines + Pass C-2 fail-on-diff (Standard, ~20K) — SHIP:**
- New `scripts/regen-visual-baselines.sh` (Docker `mcr.microsoft.com/playwright:v1.59.1-jammy`, MSYS_NO_PATHCONV=1, persistent volume `lotr-linux-node-modules`, --ignore-scripts skips better-sqlite3 native build under container's Node 24)
- New `.github/workflows/visual-baseline.yml` (workflow_dispatch, Step 1 regen + Step 2 inline smoke-verify per PRIME-AUDIT R15 + Step 3 auto-commit; loop guards: actor != bot AND `[skip ci]` trailer)
- 13 Linux baselines committed (~4.4MB): 4 landing × viewports + 3 festival × devices + 6 game2d/admin
- 3× Docker determinism check: bit-identical PNGs across runs (sha256 diff = 0). Threshold-relax fallback NOT triggered.
- `ci.yml` Pass C-2 `continue-on-error: true → false` (gate is now strict)
- `.gitignore` un-ignored `tests/visual/*-snapshots/` (with restoration comment)
- Smoke verify (without --update-snapshots): 13/13 PASS
- Submodule: 8f94892, Parent: f2b54f9

## OPEN ISSUES
- Brand-quality follow-on (Council D2): AI lines use Chirp 3 HD (matches static) — Studio voice / Custom Voice upgrade is S81 P0 (~$1K+ training, Daniel budget approval needed)
- ai_*.mp3 files will live in git through S80; GCS migration is S81 P0 (manifest schema already future-proofed via `url` field)
- Mobile baselines (iPhone 13 / iPad Pro 11) stay advisory; rot guard via R14 + S81 P1 callback after 30 days desktop stability
- TTS pipeline never run end-to-end against real LLM emit (`scripts/tts-synthesize.js` is mocked in tests; manual QA gate during first AI dialogue play)
- session-state.json was stale from S66 at boot — now rewritten fresh for S80 (3 priorities, all pdr_approved=true)

## BLOCKED ON
- VPS deploy (Hetzner) — Daniel-action
- SUBMODULE_PAT — Daniel-action (gates parent CI full-gate)
- BigQuery dataset + service account — Daniel-action
- `.env` population from CREDENTIALS_VAULT.json `google_cloud_api` block — Daniel-action (TTS won't run without this)

## NEXT STEPS (priority order — S81)

**Immediate (top of S81 batch):**
1. **Audio quality upgrade** (Standard, P0) — Studio voice / Custom Voice for AI lines. Brand-quality is the festival's load-bearing claim. Daniel budget approval gates Custom Voice.
2. **GCS migration for `ai:*` audio** (Standard, P0) — `gs://legacy-of-the-realm-audio` bucket; manifest `url` field swap; signed URLs for client.

**Short-term:**
3. **Embedding-based intent normalization** (Standard, S79 R1 alt) — depends on real `ai:*` data from S80 P1
4. **Customize-panel a11y** (Standard, deferred from S79 P3) — needs authenticated WebSocket fixture
5. **Mobile baselines fail-on-diff** (Micro, Council D14 callback) — after 30 days desktop stability

**Medium-term:**
6. **Broader a11y audit** (Standard, D13 callback) — focus, ARIA, keyboard nav across 6 pages
7. **VPS Node 20 verification** (Micro, blocked) — when VPS lands

## CHANGED FILES (this session)

Submodule (Game/founding-realm):
- src/modules/npc/tts-queue.ts (NEW, +175)
- src/modules/npc/npc-tts-config.ts (NEW, +60)
- src/networking/handlers/crafting.ts (+22 enqueue wire)
- scripts/tts-synthesize.js (NEW, +210)
- scripts/tts-queue-status.js (NEW, +45)
- scripts/regen-visual-baselines.sh (NEW, +60)
- tests/tts-queue.test.ts (NEW, +175)
- public/landing.html (8 color edits + 8 audit comments)
- tests/a11y/landing.spec.ts (ratchet + comment)
- tests/a11y/game2d.spec.ts (ratchet + comment)
- .github/workflows/ci.yml (Pass C-2 strict + comments)
- .github/workflows/visual-baseline.yml (NEW, +75)
- .env.example (GOOGLE_CLOUD_API_KEY + comment)
- .gitignore (data/tts-queue.db, un-ignore visual snapshots)
- package.json (better-sqlite3 ^11.10 + 3 npm scripts)
- 13 visual PNG baselines under tests/visual/*-snapshots/

Parent (Legacy of the Realm):
- 3 submodule pointer bumps (P1, P2, P3)
- .claude/plans/S80_BATCH_PDR.md + .claude/plans-archive/2026-04-28_*
- .claude/plans/S80_BATCH_BATTLE_LEDGER.md + archive copy
- .claude/plans/S80_BATCH_PDR_DRAFT.md
- reflexion_log.md (S80 entries appended; S73 block pruned, archived in handoffs)
- boot-snapshot.md (regenerated for S81 boot)
- HANDOFF_2026_04_28_SESSION80.md (this file)
- .handoff-archive/HANDOFF_2026_04_27_SESSION79.md

## SESSION PIPELINE REPORT
Pipeline: Session PDCA v2 | Priorities: 3/3 complete | ~125K/150K (YELLOW)
- P1  Cloud TTS pipeline             — completed — ~28K — 8b73c5a/97546cc — SHIP (Council Full)
- P2  a11y serious-fail + 8 fixes    — completed — ~5K  — c33f2fb/9b5e129 — SHIP
- P3  Linux baselines + Pass C-2     — completed — ~20K — f2b54f9/8f94892 — SHIP

## REFLEXION ENTRIES (this session — full set in reflexion_log.md)
- P1 #worked: SQLite (INSERT OR IGNORE + WAL + manifest bootstrap-as-completed) eliminated Windows file-race entirely
- P1 #worked: Council D7 explicit cost ceiling closed an egregious unanalyzed quota gap
- P2 #scope: Research-agent enumeration missed footer color (8th violation); ratchet tightening must run test FIRST to discover violations
- P3 #worked: Linux Docker baselines are bit-stable across 3 runs (Grok's "theater" worry empirically wrong on this image)
- P3 #fix: Container Node 24 + better-sqlite3 v11 → `npm ci --ignore-scripts`; MSYS_NO_PATHCONV=1 for Git Bash docker
- SESSION #council: 87.5% disruption adoption; 0 vetoes; PRIME-AUDIT added 2 real gaps the Council didn't surface
- SESSION #meta: 3/3 SHIP. $0.07 Council. 633 tests GREEN. Bundle unchanged.

## CARRY-FORWARD PRIORITIES
None — 3/3 complete. S81 will draft fresh batch from boot-snapshot Next Steps (Audio quality + GCS migration are the marquee S81 P0 items per Council D2/D1).

═══════════════════════════════════════════════════════════
