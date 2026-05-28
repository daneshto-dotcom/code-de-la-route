# Boot Snapshot (auto-generated at handoff)
Generated: 2026-05-28 | Session: S96

## Next Steps

Project remains **PARKED** (Daniel's explicit intent — un-park when he has time). Site is live AND now reboot-survivable. When un-parking:

1. **5-min verify-on-wake** — open [docs/UNPARK_S95.md](Game/founding-realm/docs/UNPARK_S95.md) and follow §1-§5 (site curl, admin Bug Review tab, F1 telemetry harvest, S91-S93 verify, tsc + sim).
2. **Triage tester signal** — admin Bug Review → submission filter → Bloody's bug report + screenshot at `Game/founding-realm/data/feedback-screenshots/1778002270025_9d8d1cac017d.jpg`.
3. **Rotate admin password** — `ADMIN_PASS` old value in git history at `010a1eb`. Edit `.env` + restart server (`gateway.ts:535` idempotent seedAdmin).
4. **[S96 carry — LOW] One real reboot test** — auto-start task `LegacyOfTheRealm-GameServer` verified by cold-start kill-test (200 in ~4s) but NOT by an actual reboot. Do one real reboot to confirm the AtLogOn trigger fires end-to-end.
5. **[S96 carry — MED, optional] Auto-start log-off resilience** — task is AtLogOn (covers reboot via AutoAdminLogon=1, NOT a manual log-off). If wanted, upgrade the game server to a true Windows service (nssm) like cloudflared. See session-state `s96_carry_forward`.
6. **Pick BACKLOG BLOCKERS** — B4-spot (Varenne + 2 first-quest NPCs at Commons coords), B7 (combat post-result screen, RE-BLOCKED by F1). Tier carry: HYPERTROPHY refactor+test trio (gateway.ts, festival-admin.ts, emergent-templates.ts — S94 deferred).
7. **Quarterly recheck** — Pass 3 audit ~1-2 months past S95; the 2 `tmp` dev-only audit exceptions have `next_review: 2026-08-28` (security-exceptions.json).

## Blockers
- **Daniel verify-on-wake** for S91-S93 (F1-F4 + PvE failure flash). USER-ACTION.
- **VPS deploy** (BACKLOG BLOCKED #1) — Hetzner VPS provision. Daniel.
- **Stripe account** (BACKLOG BLOCKED #9) — required for ticket /checkout to leave dev 503.

## Resolved this session (S96) — no longer action items
- npm audit-gate failures (~20 RUN FAILED emails) → FIXED (qs patched via npm audit fix + 2 `tmp` dev-only exceptions documented).
- Node 20 GitHub Actions deprecation → FIXED (all actions bumped to Node-24 majors, both repos; annotation gone).
- Game-server reboot survival → ADDED (logon scheduled task + idempotent launcher; cold-start verified).

## Pending Backlog
- [ ] B4-spot Varenne + 2 first-quest NPCs at fixed Commons coords with glow ring (BLOCKER)
- [ ] B7 Combat post-result screen — gold/honor/morale rewards visible (RE-BLOCKED by F1)
- [ ] R1 Quest compass / map markers; R2 building-interaction affordance; R3 map brightness/fog; R4 reputation panel (ROUGH)
- [ ] Sentinel-25 HIGH: Inventory UI filtering/sorting; MED: player death/succession loop, mobile game-client <480px
- [ ] Sentinel-25 LOW: economy graphs, player profile pages, property/housing, law system, Git LFS migration (~68MB MP3)
- [ ] S74 deferred: apple-touch-icon-180.png, 12-shot viewport matrix, Veo cutscene prototype, T14 runtime event sim
- [ ] S75 protocol: full-file diffs in CHECK prompts; convergence scan in PDR R1
- [ ] S80 deferred: TTS pipeline end-to-end manual QA against real LLM emit

## Recent Reflexion (last 2 sessions)

### 2026-05-28 — Session 96 — Parked-site maintenance (CI fix + reboot-survival + Node-24 actions)
- P1 #pattern-ci-audit-gate-split-by-exposure: split a failing npm-audit gate by real exposure — fix runtime deps (qs), exception dev/CI-only deps (tmp). audit-check.js matches advisory_id as STRING.
- P1 #pattern-dry-run-before-fix-vs-exception: `npm audit fix --dry-run` + `npm ls` before deciding made the hybrid split obvious.
- P2 #pattern-test-the-actual-failover: validate reboot-survival by killing :3000 and proving the task restarts it (200 in ~4s), not just "task registered."
- P2 #pattern-ps51-ascii-only-scripts: PS 5.1 reads BOM-less files as cp1252 — keep .ps1 pure ASCII (em-dash broke the parse).
- P3 #pattern-verify-action-runtime-before-bump: `gh api releases/latest` + action.yml `runs.using` to confirm node24; grep run annotations to confirm the deprecation is gone.
- P4 #pattern-flush-state-before-check: commit bookkeeping (with [ci skip]) before CHECK so it can assert "tree clean."
- SESSION #s96-meta: 4 priorities (2 user-approved scope amendments). Emails stopped, reboot-survival added, all Actions on Node-24, CHECK PASS. ~$0 LLM (1 Grok call). PARKED.

### 2026-05-27 — Session 95 — Autonomous park-track resume batch
- SESSION #s95-meta: 6 priorities autonomous (server restart + P1-P5). -2,179 LOC dead code, +395 LOC. 775 tests GREEN. End-of-session audit caught a password leak + hallucinated filename. ~$0 LLM. Site parked + live.
- (full S95 entries in Game/founding-realm/reflexion_log.md)
