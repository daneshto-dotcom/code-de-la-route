# Boot Snapshot (auto-generated at handoff)
Generated: 2026-04-27 | Session: S79

## Next Steps (S80)
1. **Vertex TTS generative voice pipeline** (Gemini Council pivot — supersedes manual recording). Standard tier. Generates audio per (text, intent) pair to GCS, populates voice-manifest with `ai:*` lineId entries.
2. **Customize-panel a11y** — needs authenticated WebSocket fixture in game2d state. Standard. Tracked from S79 P3 scope amendment.
3. **Embedding-based intent normalization** (Grok R1 alt) — k-NN over LLM-emitted intent labels for cluster-collapse. Standard.
4. **VPS Node 20 upgrade** — verify VPS Node version when VPS lands. P5's pre-flight gate was deferred (no VPS yet).
5. **Linux baseline generation for visual gate** — Docker-based generator so Pass C-2 can ratchet from advisory to fail-on-diff.
6. **color-contrast a11y fix on landing.html** — known SERIOUS issue, deferred follow-up (a11y ratchet tightening in same session).

## Blockers (Daniel-action)
- VPS deploy (Hetzner) — gates Node-floor verification + production
- SUBMODULE_PAT — gates parent CI full-gate
- BigQuery dataset + service account — gates metrics full-mode

## Pending Backlog (LATER tier, in BACKLOG.md)
- [ ] #16 Admin/GM Tooling v2 (BLOCKED: VPS deploy)
- [ ] #18 Monitoring & Observability (BLOCKED: VPS deploy)
- [ ] #20 Advanced Crafting & Masterworks
- [ ] #21 Player Event Calendar + Chronicle Integration
- [ ] #24 Referral Rewards (post-launch)
- [ ] #25 Cosmetic Monetization (post-launch)
- [ ] #26 Player-Generated Quests/Bounties (post-launch)
- [ ] #27 Spectator Mode / Streaming (post-launch)
- [ ] #28 Cross-Platform Save Sync (post-launch)

## Recent Reflexion (last 2 sessions)

### S79 (2026-04-27)
- SESSION #worked: Batch PDR → 2-round Council → Battle Ledger → sequential P5→P1→P2→P3→P4 stayed coherent across PC restart
- SESSION #worked: Audit-before-delete (P1) revealed dead code more thoroughly than greenfield design. Pattern: "remove X" priorities should always have an explicit audit gate
- P1 #worked: v1 text-hash voice fallback fully excised. Bundle -0.4kb. Tests 588/588. lookupVoiceFile is now O(1)
- P2 #worked: AI lineId via emit_dialogue tool-call. base62(SHA256(text+intent))[:12]. Free-form labels per Council C1
- P2 #council: Triumvirate CHECK both PASS — Gemini 5/5/5/5, Grok PASS with 4 polish concerns addressed
- P3 #scope: customize.html doesn't exist (panel inside game2d.html). Substituted admin.html. Customize panel a11y deferred to S80
- P4 #worked: Visual baselines via Playwright `devices` API. 9 new baselines. Snapshots gitignored
- SESSION #council: Domain-weighted voting resolved 4/5 contested decisions; 71% disruption adoption rate; 0 vetoes
- SESSION #fix: PC restart → bash CWD doesn't persist. Always pwd before submodule commands
- SESSION #meta: 5/5 SHIP. 87.5K/150K (YELLOW). $0.13 LLM. 625 tests GREEN. Submodule c4281d2, parent 991e138

### S79-pre (2026-04-26)
- SESSION #gotcha: save/festival.json on OneDrive — restores stale cloud version after unclean shutdown. Server crashed on every reboot
- SESSION #fix: festival.ts load() null-byte strip + try-catch self-heal. Server starts cleanly with corrupt festival.json. 97badaf
- SESSION #meta: 3 reboots, 1 fix, 585/585 tests, game UP, login verified

## Key Facts for S80
- Game server: `npm run server` from `Game/founding-realm/` — port 3000 (fixed)
- Login: `daneshto@gmail.com / AdminLogin01!`
- Admin URL: http://localhost:3000/admin.html
- Tests: `npx ts-node --transpile-only tests/simulation.test.ts` (608 baseline at S79 close)
- A11y: `npx playwright test tests/a11y --project=chromium-desktop` (4 specs)
- Visual: `npx playwright test tests/visual --project=chromium-desktop` (13 specs, snapshots gitignored)
- Bundle: `npm run bundle` (285.5KB, gate <300KB)
- Credentials: BRAIN/infrastructure/CREDENTIALS_VAULT.json (Tier 0)
- AI lineId helper: `Game/founding-realm/src/modules/npc/ai-line-id.ts` (S79 P2)
- Voice manifest entries for AI lines: pending S80 TTS pipeline (will populate `ai:*` lineIds)
