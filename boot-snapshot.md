# Boot Snapshot (auto-generated at handoff)
Generated: 2026-05-27 | Session: S95

## Next Steps

When Daniel un-parks (no fixed date — project remains in park-track per his explicit intent):

1. **5-min verify-on-wake** — open [docs/UNPARK_S95.md](Game/founding-realm/docs/UNPARK_S95.md) and follow §1-§5 (site curl, admin Bug Review tab, F1 telemetry harvest, S91-S93 verify-on-wake, tsc + sim).
2. **Triage tester signal** — admin Bug Review → submission filter → review Bloody's bug report + screenshot at `Game/founding-realm/data/feedback-screenshots/1778002270025_9d8d1cac017d.jpg`.
3. **Rotate admin password** — `ADMIN_PASS` was inlined in `docs/UNPARK_S95.md` at commit `010a1eb` for ~30 min before S95 audit caught it. Old value in git history. Procedure: edit `.env` `ADMIN_PASS=` + restart server (`gateway.ts:535` idempotent seedAdmin).
4. **Patch npm vulnerabilities** — `npm audit` regressed S94→S95 (4 LOW dev-only → 7 total incl. 1 HIGH `tmp` GHSA-52f5-9888). New CVEs landed during park-hiatus, not S95-introduced. Defer `npm audit fix` or selective upgrade.
5. **Pick BACKLOG BLOCKERS** — currently: **B4-spot** (Varenne + 2 first-quest NPCs spawned at fixed Commons coords, full chain validate), **B7** (combat post-result screen, RE-BLOCKED by F1). Tier carry-forward: HYPERTROPHY refactor+test trio (gateway.ts, festival-admin.ts, emergent-templates.ts — S94 audit deferred).
6. **Quarterly recheck** — `@lhci/cli` chain LOW vulns; Pass 3 audit in 1-2 months past S95.

## Blockers

- **Daniel verify-on-wake** for S91-S93 (F1-F4 + PvE failure flash). USER-ACTION.
- **VPS deploy** (BACKLOG BLOCKED #1) — Hetzner VPS provision. Daniel.
- **Stripe account** (BACKLOG BLOCKED #9) — required for ticket /checkout to leave dev 503.

## Pending Backlog

From `Game/founding-realm/BACKLOG.md` BLOCKERS + ROUGH + LATER tiers (open items only):

- [ ] B4-spot Varenne + 2 first-quest NPCs spawned at fixed Commons coords with glow ring (BLOCKER)
- [ ] B7 Combat post-result screen — gold/honor/morale rewards visible (RE-BLOCKED by F1)
- [ ] R1 Quest compass / map markers (ROUGH)
- [ ] R2 Building-interaction affordance — hover tooltip, enter to open recipe / quest / market (ROUGH)
- [ ] R3 Map ambient brightness +30%, fog reveal radius ×2 (ROUGH)
- [ ] R4 Reputation panel surfaced in sidebar (ROUGH)
- [ ] R5 Toast notification dismiss + state-awareness (ROUGH)
- [ ] R6 Visual feedback on every action (ROUGH)
- [ ] R7 Mobile UX redesign for first-quest flow (BLOCKED on S88 P1)
- [ ] R8 Manual playtest as CHECK-phase gate per priority (PROTOCOL)
- [ ] D1 Wire remaining 7 NPC dialogue trees (DEEPEN)
- [ ] D2 First 2-3 IRONWORKS / BLACKSMITHIAN recipes (DEEPEN)
- [ ] D3 Enemy variety (DEEPEN)
- [ ] D4 Honor-rank visible progression (DEEPEN)
- [ ] D5 Veo cutscene prototype (DEEPEN)
- [ ] D6 Building interior tile variation (DEEPEN)
- [ ] D7 apple-touch-icon-180.png asset (DEEPEN)
- [ ] D8 #26 Player-Generated Quests/Bounties (DEEPEN → LATER)
- [ ] 16 Admin/GM Tooling v2 (LATER, blocked on VPS)
- [ ] 18 Monitoring & Observability Prom+Grafana (LATER, blocked on VPS)
- [ ] 24 Referral Rewards (LATER, pre-launch)
- [ ] 25 Cosmetic Monetization (LATER, festival ticket pipeline)
- [ ] 27 Spectator Mode / Streaming (LATER, after PvP validates)
- [ ] 28 Cross-Platform Save Sync (LATER, Firebase Auth)
- [ ] 31 Embedding-based intent normalization (LATER, wait for ai:* traffic)
- [ ] 35 Sprite atlas packing (LATER, 27 PNGs manageable)
- [ ] S74 deferred apple-touch-icon-180.png (non-batch)
- [ ] S74 deferred 12-screenshot viewport matrix (3 flows × 4 devices) (non-batch)
- [ ] S74 deferred Veo cutscene prototype (non-batch)
- [ ] S74 deferred T14 runtime event sim (non-batch)
- [ ] S75 protocol Full-file diffs in CHECK prompts (non-batch)
- [ ] S75 protocol Convergence scan in PDR R1 (non-batch)
- [ ] S80 deferred TTS pipeline end-to-end manual QA (non-batch)
- [ ] Sentinel-25 HIGH Inventory UI filter/sort (S95 P2 carry-forward)
- [ ] Sentinel-25 MED Player death and succession (S95 P2 carry-forward)
- [ ] Sentinel-25 MED Mobile game-client responsiveness (S95 P2 carry-forward)
- [ ] Sentinel-25 LOW Economy dashboard graphs (S95 P2 carry-forward)
- [ ] Sentinel-25 LOW Player profile pages (S95 P2 carry-forward)
- [ ] Sentinel-25 LOW Property/housing system (S95 P2 carry-forward)
- [ ] Sentinel-25 LOW Law system (S95 P2 carry-forward)
- [ ] Sentinel-25 LOW Git LFS migration (S95 P2 carry-forward)
- [ ] Higher-res Chateau photos (Daniel-blocked)
- [ ] fog-strip.webp integration to map edges (S51 carry)
- [ ] Fallback sprite improvement (deferred)
- [ ] Sprite atlas packing (27 PNGs, deferred)

## Recent Reflexion (last 2 sessions)

### 2026-05-27 — Session 95 — Autonomous park-track resume batch (Daniel asleep)

- P0 #pattern-restart-as-priority: server-DOWN-tunnel-RUNNING produces tester 5xx that localhost probes alone miss
- P1 #pattern-audit-recommendation-already-done: re-verify Pass-2 claims before executing remediation
- P1 #pattern-deletion-is-cheap-when-reversible: git revert is the un-park escape hatch
- P2 #pattern-banner-not-delete: gravestone the legacy doc, don't delete
- P3 #pattern-organic-telemetry-beats-staged-qa: 22 days of real signal > 3 minutes of staged QA
- P4 #pattern-dogfood-from-the-data: harvest findings drive dashboard ergonomics
- P4 #pattern-skip-preview-when-server-runs-fixed-port: bypass preview_start for fixed-port servers in submodules
- P5 #pattern-park-doc-is-the-deliverable: vague handoff fails the un-park test
- AUDIT #pattern-end-of-session-audit-catches-leaks: Rule 22 audit caught password leak + hallucinated filename
- SESSION #s95-meta: 6 priorities, −2,179 LOC, +395 LOC, 775 tests GREEN, ~$0 LLM, 9 commits sub + 2 parent

### 2026-05-21 — Session 94 — S94 audit (Council-Synthesized Pass 1 + Pass 2) + remediation

- S94-AUDIT #audit-protocol: knip without entry-point config produces noise (157→5 FPs after config)
- S94-REMEDIATION #pass-2-reveals: Pass-2 can reclassify Pass-1 (tick-loop wasn't HYPERTROPHY, it's DEAD)
- S94-REMEDIATION #bash #windows-cwd: bash CWD sticky + parent has nested CNC package.json → pollution risk
- S94-REMEDIATION #scope: every priority pivot gets its own scope amendment block
- S94-REMEDIATION #design-default: defensible defaults + commit-message-flag saves round-trip tokens
- SESSION #pdca: integrity-warning protocol satisfied for all completed priorities
