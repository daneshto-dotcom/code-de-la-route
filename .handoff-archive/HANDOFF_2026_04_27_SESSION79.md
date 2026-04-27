═══════════════════════════════════════════════════════════
HANDOFF SUMMARY — Legacy of the Realm
Generated: 2026-04-27
Session: S79 — Voice pipeline + CI hardening (5/5 SHIP, full-tier Council)
═══════════════════════════════════════════════════════════

## PROJECT
- Name: Legacy of the Realm (Founding Realm submodule)
- Working directory: C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm
- Git branch: main (parent) / master (submodule)
- Latest commit: 991e138 (parent) / c4281d2 (submodule)
- Tech stack: Node.js + TypeScript + Phaser 3 + WebSocket + Postgres
- Codebase: ~50K lines TS/JS across submodule + parent

## CURRENT STATE
- Build: tsc clean, esbuild bundle 285.5kb (gate <300kb)
- Tests: 608 simulation + 4 a11y + 13 visual = 625 GREEN
- Deployment: local-only (port 3000), VPS deploy blocked on Daniel
- Server: UP at http://localhost:3000

## SESSION COST
- Model split: 8 haiku / 0 sonnet / 1 opus tracked (incomplete — counter file shows partial run)
- Estimated routed cost: ~$0.083 (LLM API) + $0.13 Council (Grok+Gemini) = ~$0.21
- Baseline (all-Opus): ~$0.675 + $0.13 = ~$0.81
- Savings: ~$0.60 (~74%)
- Council spend: Grok 3 calls $0.05 + Gemini 2 calls $0.08
- Cumulative log: ~/.claude/usage-log.csv

## THIS SESSION'S WORK

**Council Full-tier deliberation (PLAN phase):**
- 7 Battle Ledger decisions: 5 CONCEDED, 1 AGREED, 1 DEFERRED. 0 vetoes
- C1 (Grok win): free-form intent/emotion labels, NOT enum
- C2 (Claude+Gemini win 2.75 vs 1.0): full delete after audit, not narrowed fallback
- C3 (unanimous): batch P3+P4 + Playwright devices API
- C4 (Gemini+Claude win): Node engine >=20.0.0
- C5 (Grok win): base62(SHA256)[:12] for contentId
- C6 (DEFERRED): Vertex TTS pipeline → S80
- C7 (Claude win): sequential P5→P1→P2→P3→P4 execution

**P5 — Resend SDK + Node engine review (Micro):**
- Pinned `engines.node": ">=20.0.0"` in package.json
- Verified email.ts API surface vs Resend v6.10.0 dist/index.d.cts (unchanged)
- Submodule: 124e091, Parent: 9e93b0e

**P1 — Remove v1 text-hash voice fallback (Micro):**
- Audit gate PASS: TALK_NPC routes only through handleTalkNPC (crafting.ts:179)
- Removed: _voiceTextIndex, _voiceHashIndex, _rebuildIndices, v1 fallback block, dead diagnostic fields
- New lookupVoiceFile is O(1) by `${npcId}:${lineId}` only
- Bundle -0.4kb, Tests 588/588 (+3 S79 P1 assertions)
- Submodule: 0709bd0, Parent: c1945bc

**P2 — AI lineId via Anthropic tool-calling (Standard):**
- New `src/modules/npc/ai-line-id.ts`: SHA-256 + base62(12) → `ai:{npcId}:{contentId}`
- ai-brain.ts: AIDialogueResult + emit_dialogue tool-call parser, free-form labels
- crafting.ts: threads aiIntent/aiEmotion through ACTION_RESULT, computes lineId for AI lines
- 12 suggested intent values + 11 suggested emotion values; LLM may deviate
- Triumvirate CHECK: Gemini 5/5/5/5, Grok PASS (4 non-blocking → 3 polish patches applied)
- Tests 608/608 (+20 S79 P2)
- Submodule: fac153f, Parent: c45cbcd

**P3 — CI Pass B-2 a11y (Standard, scope-amended):**
- playwright.config.ts: array webServer (static :4321 + live :3000)
- New tests/a11y/game2d.spec.ts: 3 tests (game2d + admin axe-canvas-excluded + keyboard-nav)
- SCOPE AMENDMENT: customize.html doesn't exist (panel inside game2d.html). Substituted admin.html
- Customize panel a11y deferred to S80 (needs authenticated WebSocket fixture)
- 4/4 a11y specs green locally
- Submodule: 2a7c72c, Parent: 47c4c2d

**P4 — CI Pass C-2 visual matrix (Standard):**
- New tests/visual/festival.screenshot.spec.ts (3 device baselines)
- New tests/visual/game2d.screenshot.spec.ts (game2d + admin × 3 = 6)
- Council C3 + Grok ADD: Playwright `devices` API (iPhone 13, iPad Pro 11, Desktop Chrome) instead of arbitrary viewports
- Total visual coverage: 13 baselines (4 Pass C-1 + 9 Pass C-2)
- .gitignore: tests/visual/*-snapshots/ — Linux-CI regenerates on first [ci visual] (advisory)
- 13/13 visual specs passed locally
- Submodule: 9c7bb0a, Parent: b383614

## OPEN ISSUES
- color-contrast SERIOUS on landing.html (deferred — pre-S79 follow-up; ratchet still critical-only)
- Linux baseline generation pending (visual job stays advisory until Docker generator lands)
- session-state.json gets re-modified by hooks during/after handoff — gitignored in parent, tracked in submodule (one final state-checkpoint commit per session expected)

## BLOCKED ON
- VPS deploy (Hetzner) — Daniel-action
- SUBMODULE_PAT — Daniel-action (gates parent CI full-gate)
- BigQuery dataset + service account — Daniel-action

## NEXT STEPS (priority order — S80)

**Immediate (top of S80 batch):**
1. **Vertex TTS generative voice pipeline** (Standard) — Gemini Council pivot. Generate audio per (text, intent) pair via Vertex Speech, populate voice-manifest with `ai:*` lineIds. Replaces manual recording for AI dialogue.
2. **Customize-panel a11y** (Standard) — design authenticated WebSocket test fixture, then add a11y scan for the customize modal inside game2d.html.

**Short-term:**
3. **Embedding-based intent normalization** (Standard) — k-NN over LLM-emitted intent labels for cluster-collapse. Improves manifest hit rate.
4. **VPS Node 20 upgrade verification** (Micro, blocked on VPS deploy) — when VPS lands, confirm Node version >=20 matches package.json engines pin.

**Medium-term:**
5. **Linux baseline generation for visual gate** (Standard) — Docker-based snapshot generator so Pass C-2 ratchets from advisory to fail-on-diff.
6. **color-contrast a11y fix on landing.html** (Micro) + tighten axe ratchet to serious-fail.

## CHANGED FILES (this session)

Submodule (Game/founding-realm):
- package.json (engines pin) +3
- public/js/ui/dialogue-panel.js (v1 fallback removed) -45 +12
- public/assets/audio/npc-voices/voice-manifest.json (schemaNote)
- scripts/build-voice-manifest.js (schemaNote)
- src/modules/npc/ai-line-id.ts (NEW) +60
- src/modules/npc/ai-brain.ts (emit_dialogue) +40
- src/networking/handlers/crafting.ts (lineId thread) +20
- tests/simulation.test.ts (+20 P2 + 3 P1 assertions)
- tests/a11y/game2d.spec.ts (NEW) +110
- tests/visual/festival.screenshot.spec.ts (NEW) +50
- tests/visual/game2d.screenshot.spec.ts (NEW) +60
- playwright.config.ts (live-server array)
- .github/workflows/ci.yml (Pass B-2 + C-2 docs)
- .gitignore (visual snapshots)

Parent (Legacy of the Realm):
- 5 submodule pointer bumps (P5, P1, P2, P3, P4)
- 1 final state-checkpoint bump
- .claude/session-summary.md
- boot-snapshot.md (regenerated)
- HANDOFF_2026_04_27_SESSION79.md (this file)

## SESSION PIPELINE REPORT
Pipeline: Session PDCA v2 | Priorities: 5/5 complete | ~87.5K/150K (YELLOW)
- P5  Resend + Node engine pin    — completed — ~5K  — 9e93b0e/124e091 — SHIP
- P1  v1 voice fallback removed   — completed — ~6K  — c1945bc/0709bd0 — SHIP
- P2  AI lineId tool-calling      — completed — ~25K — c45cbcd/fac153f — SHIP
- P3  CI Pass B-2 a11y            — completed — ~18K — 47c4c2d/2a7c72c — SHIP (scope-amended)
- P4  CI Pass C-2 visual matrix   — completed — ~20K — b383614/9c7bb0a — SHIP

## REFLEXION ENTRIES (this session — full set in reflexion_log.md)
- SESSION #worked: Batch PDR → Council → Battle Ledger → sequential exec stayed coherent across PC restart
- SESSION #worked: Audit-before-delete (P1) pattern — explicit gate as first sub-task for any "remove X" priority
- P2 #worked: emit_dialogue tool-call is provider-agnostic (no Anthropic SDK lock-in)
- P3 #scope: file existence verification before scoping flows from boot snapshots
- P4 #worked: Playwright `devices` API > arbitrary viewport sizes
- SESSION #council: 71% disruption adoption rate; 0 vetoes
- SESSION #fix: PC restart → bash CWD doesn't persist; always pwd or absolute paths

## CARRY-FORWARD PRIORITIES
None — 5/5 complete. S80 will draft fresh batch from boot-snapshot Next Steps.

═══════════════════════════════════════════════════════════
