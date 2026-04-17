# Boot Snapshot (auto-generated at handoff)
Generated: 2026-04-16 | Session: S71

## Next Steps
1. Selectively cherry-pick additions from `origin/dn-branch-1` into main (festival .docx, game design docs, Music Integration mp3s, estate-map-kit, founding-realm submodule) WITHOUT the stale code deletions (-31K lines questions.json, -17K questions.js)
2. `git submodule add -b master https://github.com/daneshto-dotcom/founding-realm.git Game/founding-realm` on main once integration strategy is decided
3. DB migrations 007: add `xp` (character) + `npc_giver_id` (quest) columns + persist in postgres.ts save path (read-side defaults already shipped)
4. Cinzel self-host (WOFF2 + @font-face for `public/festival.html`) — 3 families × multi-weight
5. Tier 3 #15 Mobile viewport optimization — 80%+ traffic mobile (handoff-recommended)
6. Tier 3 #18 Monitoring & Observability (Prometheus + Grafana) — blocked on VPS
7. Cloudflare nameserver action-required alert — check and resolve
8. VPS deploy on Hetzner — blocked on Daniel

## Blockers
- VPS deploy (Daniel: Hetzner provision)
- Real-world attendance verification (blocked on VPS + Stripe account)
- Admin/GM tooling v2 + Monitoring (blocked on VPS)

## Pending Backlog (founding-realm)
**Tier 3 — Platform & Operations:**
- [ ] #15 Mobile Viewport Optimization — canvas scaling, touch events, PWA wrapper (L)
- [ ] #16 Admin/GM Tooling v2 — blocked on VPS (M)
- [x] #17 CI/CD Pipeline — **SHIPPED S71** (GitHub Actions green)
- [ ] #18 Monitoring & Observability — Prometheus + Grafana, blocked on VPS (M)

**Tier 4 — Depth & Polish:**
- [ ] #19 Reputation-gated cosmetics & titles (M)
- [ ] #20 Advanced crafting & masterworks (M)
- [ ] #21 Player event calendar + Chronicle integration (M)
- [ ] #22 Character customization (M)
- [ ] #23 NPC TTS dialogue via Chirp 3 HD (S)

**Tier 5 — Growth & Scale (post-launch):**
- [ ] #24 Referral rewards (S)
- [ ] #25 Cosmetic monetization (M)
- [ ] #26 Player-generated quests/bounties (XL)
- [ ] #27 Spectator mode / streaming (M)
- [ ] #28 Cross-platform save sync (M)

**Non-batch inherited:**
- [ ] Higher-res Chateau photos (needs source files from Daniel)
- [ ] fog-strip.webp integration (generated S51, not wired to map edges)
- [ ] Fallback sprite improvement (deferred — rare edge case)
- [ ] Sprite atlas packing (deferred — 27 PNGs manageable)
- [ ] Cinzel self-hosted (deferred S71 — budget-conscious)

## Recent Reflexion (last 2 sessions)

### 2026-04-16 Session 71 (git reconciliation + founding-realm CI)
- P0 #worked: Parent repo main was "ahead 2, behind 62" vs origin. RALPH:HUNT confirmed ZERO file overlap. Clean `git merge origin/main --no-ff` succeeded. Commit ee913c8. Pushed.
- P0 #critical: `gitbutler/workspace` (a434363) is a superseded `dn-branch-1` integration with **destructive diff vs main**: -31635 lines questions.json, -17334 lines questions.js, deletes vocab-data.js/app.js/challenges.js/build scripts/package.json. DO NOT merge this into main.
- P0 #worked: Pushed `dn-branch-1` to origin so festival/game/music/map-kit assets are preserved on remote. GitHub offered PR link for future selective integration.
- P0 #learned: GitButler virtual_branches.toml was EMPTY. "workspace" is dormant; GitButler UI resyncs on next open.
- P0 #learned: founding-realm submodule not tracked on main — future session can add cleanly via `git submodule add`.
- P1 #worked: Founding-realm CI (.github/workflows/ci.yml) Node 22 + canvas apt deps + tsc + test + esbuild. First run GREEN 1m17s.
- P1 #critical: RALPH:HUNT found 3 TS errors hidden by ts-node --transpile-only — (a) GameAction union missing EMOTE despite social.ts handleEmote dead code, (b) Character.xp required but loadCharacters doesn't load it, (c) Quest.npcGiverId required but loadQuests doesn't load. Fixed with defaults; flagged TODO(migrations-007).
- P2 #worked: `npm audit fix` — 0 vulnerabilities.
- P2 #deferred: Cinzel self-host non-trivial (WOFF2 subsetting, preload hints, multi-weight).
- SESSION #meta: Handoff prompt referenced founding-realm not parent — BACKLOG.md lives in Game/founding-realm/BACKLOG.md.
- SESSION #gate: User approved batch mid-RALPH:HUNT ("approved this batch. get cooking") — proceeded pragmatically with safe subset.

### 2026-04-11 Session 58
- P1 #worked: Ring buffer cap at 2000 in economy/index.ts — single line after push(), aligned with persistence slice-1000.
- P2 #learned: Existing server-side validation was far more comprehensive than the backlog audit suggested. Movement, combat, gather, craft all already validated server-side.
- P2 #worked: Routing gamble loss through processTransaction() closes audit trail gap.
- P2 #worked: Per-IP WS connection limit + per-connection message frequency cap at gateway level.
- P3 #worked: JWT ephemeral dev secret via crypto.randomBytes — no hardcoded fallback, no env var needed for dev, hard exit in prod.
- P3 #worked: getJwtSecret() export so in-memory-auth shares the same secret instance.
- P3 #learned: CSP hash migration infeasible in one pass — 6+ HTML files with inline scripts.
- P4 #worked: JSON-line telemetry with daily rotation + event bus wiring = zero external deps.
- SESSION #meta: 4/4 in ~43K tokens. Codebase exploration before each priority consistently saved tokens.
