# Boot Snapshot (auto-generated at handoff)
Generated: 2026-05-21 | Session: S94 closed → S95 next

## Next Steps (S95+ priorities)

**Daniel-decision items (read AUDIT.md §"Open questions" — Pass-2 section):**
1. **Tick architecture disposition** — `src/core/tick-loop.ts` (1028 LOC, zero callers) + `src/core/state-machines.ts` (1151 LOC, only `MAX_COMBAT_ENTITIES_PER_ZONE = 3` has live consumer). WIRE into gateway OR DELETE both (~2,179 LOC recovery). Findings `sha256:8c1c45fe65f4442f` + `sha256:c26a3863ea926a23`.
2. **TODO.md vs BACKLOG.md** — consolidate (recommended: delete TODO.md, migrate any live items into BACKLOG.md). Pass-1 finding `sha256:0b23134f3c8375fd`.
3. **Ticket /checkout auth posture** — current default is public + per-IP rate-limit 5/min (preserves gift UX). Revisit if abuse appears. Finding `sha256:ef08a815d94d1264`.

**Deferred from Pass-1 (HYPERTROPHY tests — large refactors):**
4. **gateway.ts handler-extraction + test suite** — finding `sha256:ded37c9ef203b378`. Audit recommends `tests/gateway-handlers.test.ts` covering 10 message types.
5. **festival-admin.ts mutation tests** — finding `sha256:576a62eda76f4eab`. Top-5 mutation paths.
6. **emergent-templates.ts content-generation tests** — finding `sha256:6aecf4d5b8e8c161`. Per-template field-presence + reward-bounds.

**Park-track (deferred this session, original S94 priorities):**
7. **Daniel verify-on-wake S91+S92+S93-P2** (USER-ACTION: hard-refresh + screenshots).
8. **Bug-review dashboard** — admin.html section reading event-log.db rows (~15K).
9. **Live concurrent smoke test execution** (~3K) — fill template at `docs/CONCURRENT_SMOKE_TEST_S93.md`.
10. **Un-park doc + final integration verify** (~5K) — wake-up procedure for 1-month hiatus.

## Blockers

- None code-blocking — Daniel's audit pivot consumed S94. Park-track work resumes after Daniel triages the tick-architecture decision.

## Pending Backlog (only `- [ ]` items from BACKLOG.md — 11 total)

- [ ] Higher-res Chateau photos (needs source files from Daniel)
- [ ] fog-strip.webp integration (generated in S51, not wired to map edges)
- [ ] Fallback sprite improvement (deferred — rare edge case)
- [ ] Sprite atlas packing (deferred — 27 PNGs manageable)
- [ ] **S74 deferred**: apple-touch-icon-180.png asset file
- [ ] **S74 deferred**: 12-screenshot viewport matrix
- [ ] **S74 deferred**: Veo cutscene prototype
- [ ] **S74 deferred**: T14 runtime event sim
- [ ] **S75 protocol**: Full-file diffs in CHECK prompts
- [ ] **S75 protocol**: Convergence scan in PDR R1
- [ ] **S80 deferred**: TTS pipeline end-to-end manual QA

Plus all Pass-2 OPEN_QUESTIONS items (above) which are also in AUDIT.md.

## Recent Reflexion (S94)

- S94-AUDIT #audit-protocol: knip without entry-point config is unreliable noise — false-positive rate 157→5 after config block. Configure knip BEFORE trusting file-level claims.
- S94-REMEDIATION #pass-2-reveals: Pass-2 can RECLASSIFY Pass-1 findings, not just verify them. tick-loop.ts + state-machines.ts were Pass-1 HYPERTROPHY; Pass-2 per-export audit revealed they're unwired dead architecture (zero callers).
- S94-REMEDIATION #bash #windows-cwd: bash tool CWD is sticky AND parent dir has unrelated package.json (CNC project nested). `npm install` against wrong package.json cost ~3K tokens to revert. Always prefix Bash with full `cd <abs-path>` or `npm --prefix <abs-path>`.
- S94-REMEDIATION #design-default: When user says 'be thorough' without round-tripping, picking defensible defaults + flagging in commit messages saves ~5K tokens vs AskUserQuestion. Pass-2 confirmed all this session's defaults.

## Current State

- Branch: **master** (pushed to origin at `cf4a70c`; parent `legacy-of-the-realm` at `d8e4a8e`)
- Working tree: clean (modulo session-summary.md hook artifact)
- Tests: simulation 670/670 GREEN, 4 new audit suites 28/28 GREEN, no regressions
- npm audit: 4 LOW (dev-only @lhci/cli chain; HIGH + MOD all cleared)
- Game server: should be checked — was up port 3000 before this session
- Public URL: https://legacyoftherealm.com (cloudflared from S93)
- Audit artifacts: `Game/founding-realm/AUDIT.md` (Pass 1 + 2) + `findings.1.json` + `findings.2.json`
