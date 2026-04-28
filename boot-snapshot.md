# Boot Snapshot (auto-generated at handoff)
Generated: 2026-04-28 | Session: S80

## Next Steps (S81)
1. **Audio quality upgrade** (Standard, S81 P0 — Council D2) — Re-synthesize all 30 static + AI lines at Studio voice tier OR commission Vertex AI Custom Voice for top 5 NPCs (~$1K+ training cost; Daniel approval required). Brand-quality follow-on for the festival hype-machine positioning.
2. **GCS migration for `ai:*` audio** (Standard, S81 P0 — Council D1) — Migrate `ai_*.mp3` files from git tracking to `gs://legacy-of-the-realm-audio` bucket. Manifest schema already supports `url` field for both rel-path AND `gs://` URLs; deployment work only.
3. **Embedding-based intent normalization** (Standard, S79 R1 alt) — k-NN over LLM-emitted intent labels for cluster-collapse; prevents queue bloat at scale.
4. **Customize-panel a11y** (Standard, deferred S79 P3) — Design authenticated WebSocket fixture; add a11y scan for the customize modal inside game2d.html.
5. **Mobile baselines fail-on-diff** (Micro, Council D14 callback) — Tighten iPhone 13 + iPad Pro 11 visual baselines from advisory to fail-on-diff after 30 days desktop-chrome stability.
6. **Broader a11y audit** (Standard, Council D13 callback) — Focus order, ARIA, keyboard nav across all 6 HTML pages (festival, festival-fr, festival-admin, etc.).
7. **VPS Node 20 verification** (Micro — blocked on Daniel's Hetzner deploy).

## Blockers (Daniel-action)
- VPS deploy (Hetzner) — gates Node-floor verification + production
- SUBMODULE_PAT — gates parent CI full-gate
- BigQuery dataset + service account — gates metrics full-mode
- GOOGLE_CLOUD_API_KEY in `.env` (vault has it; Daniel populates `.env` from vault per pre-flight protocol)

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

### S80 (2026-04-28)
- P1 #worked: Council D3 SQLite (`better-sqlite3` INSERT OR IGNORE + WAL) eliminated Windows file-race surface vs JSONL appendFileSync. Bootstrap-from-manifest-as-completed made dedup architecturally clean.
- P1 #worked: Council D7 cost analysis ($1.20/mo forecast, lifetime ceiling $6.36) closed the egregious quota gap Grok flagged. "Cost is negligible" claims need real numbers.
- P1 #fix: Cloud TTS REST without SDK — 50+ transitive deps avoided. Raw fetch + base64 = 60 lines.
- P2 #worked: Council D8 conditional decision tree (probe-then-tighten) > punting. Run the test, observe behavior, THEN commit to the decision.
- P2 #scope: Research-agent enumeration missed footer color violation (#3a3a32 → 1.74:1). Lesson: when ratchet-tightening, ALWAYS run the test first to discover violations.
- P3 #worked: Linux Docker baselines determinism is REAL — 3 consecutive runs produced bit-identical PNGs (sha256 diff = 0). Council D5 worry that "Docker is theater" was empirically wrong on `mcr.microsoft.com/playwright:v1.59.1-jammy`.
- P3 #fix: Container's Node 24 has no better-sqlite3 v11 prebuilt → `npm ci --ignore-scripts` (visual tests don't use SQLite). Also: MSYS_NO_PATHCONV=1 + `//app` workdir to defeat Git Bash path translation.
- P3 #fix: `npx playwright` resolved to `/root/.npm/_npx/...` instead of /app/node_modules. Fix: invoke `./node_modules/.bin/playwright` directly.
- SESSION #council: 87.5% disruption adoption (14/16 decisions revised); 0 vetoes; 0 SPLIT. Full-tier 2-round + quality gate + PRIME-AUDIT caught 2 real gaps (R14 mobile rot, R15 CI determinism).
- SESSION #meta: 3/3 SHIP. ~125K UI tokens (YELLOW). $0.07 LLM Council. 633 tests GREEN. Bundle 285.5kb. Submodule 8f94892, parent f2b54f9.

### S79 (2026-04-27)
- SESSION #worked: Batch PDR → 2-round Council → Battle Ledger → sequential P5→P1→P2→P3→P4 stayed coherent across PC restart
- SESSION #worked: Audit-before-delete (P1) revealed dead code more thoroughly than greenfield design. Pattern: "remove X" priorities should always have an explicit audit gate
- P2 #worked: AI lineId via emit_dialogue tool-call. base62(SHA256(text+intent))[:12]. Free-form labels per Council C1
- P3 #scope: customize.html doesn't exist (panel inside game2d.html). Substituted admin.html. Customize panel a11y deferred to S80
- P4 #worked: Visual baselines via Playwright `devices` API. 9 new baselines. Snapshots gitignored
- SESSION #council: Domain-weighted voting resolved 4/5 contested decisions; 71% disruption adoption rate; 0 vetoes
- SESSION #fix: PC restart → bash CWD doesn't persist. Always pwd before submodule commands
- SESSION #meta: 5/5 SHIP. 87.5K/150K (YELLOW). $0.13 LLM. 625 tests GREEN. Submodule c4281d2, parent 991e138

## Key Facts for S81
- Game server: `npm run server` from `Game/founding-realm/` — port 3000 (fixed)
- Login: `daneshto@gmail.com / AdminLogin01!`
- Admin URL: http://localhost:3000/admin.html
- Tests: `npx ts-node --transpile-only tests/simulation.test.ts` (608) + `npm run test:tts` (8) + `npx playwright test tests/a11y` (4) + `tests/visual` (13) = **633 baseline at S80 close**
- Bundle: `npm run bundle` (285.5KB, gate <300KB)
- TTS pipeline: `npm run tts:synthesize` (drains queue) + `npm run tts:queue:status` (CI gate)
- Visual baseline regen: `bash scripts/regen-visual-baselines.sh` (Docker required) OR trigger `.github/workflows/visual-baseline.yml` workflow_dispatch
- Credentials: BRAIN/infrastructure/CREDENTIALS_VAULT.json (Tier 0); GOOGLE_CLOUD_API_KEY in `google_cloud_api` block
- AI lineId helper: `Game/founding-realm/src/modules/npc/ai-line-id.ts` (S79 P2)
- TTS queue: `Game/founding-realm/src/modules/npc/tts-queue.ts` (S80 P1, better-sqlite3, WAL mode)
- TTS voice config: `Game/founding-realm/src/modules/npc/npc-tts-config.ts` (S80 P1, per-NPC + neural2 fallback)
- Pass C-2 visual gate: NOW STRICT (continue-on-error: false) — desktop-chrome enforcement; mobile advisory until S81
