# Boot Snapshot (auto-generated at handoff)
Generated: 2026-07-18 | Session: S102 (REBUILD PIVOT — plan + archive + site offline)

## Next Steps
1. **S103 = the rebuild begins at the domaine gate.** Read `BRAIN/architecture/ACTIVE_PLAN_realm_rebuild.md` (Founder DNA repo) — it is the cold-boot source of truth (§0 tells you exactly how to start). Then read `Game/founding-realm/archive/INDEX.md` (the parts bin).
2. **Parcel 0 (S103 opener):** Imagen concept boards for the gate scene (GBC/Crystal, 1601 stone/oak) — **reviewed live WITH Daniel** (no-unverified-art rule); pick the master GBC palettes with him; confirm the World Skeleton compass (§2).
3. **Parcel-001:** the gate scene itself — oak doors + iron banding + stone wall + threshold, walkable 16×16 grid-locked player. Build → screenshot → Daniel's LOVE gate → commit+tag `parcel-001`.
4. Scaffold `Game/founding-realm/rebuild/` per ACTIVE_PLAN §6 (own package.json/tsconfig, import boundary, palette.ts + build-time palette guard, ParcelScene base) — minimal, client-only, no server yet.
5. ⚠️ Before any multi-agent workflow: check `claude.ai/admin-settings/usage` — the org monthly Anthropic spend limit was HIT in S102 (blocked the archive agents; finished in main loop). Solo main-loop work is fine.

## Blockers
- None blocking the rebuild. Site is intentionally OFFLINE (P3, done) — legacyoftherealm.com returns Cloudflare 502; restart/break-glass in `Game/founding-realm/archive/state-snapshot/README.md`.
- Optional (owner): to make the domain return NXDOMAIN instead of 502, remove the tunnel CNAME/DNS in the Cloudflare dashboard. Not needed — game is fully down either way.

## Pending Backlog (parked by the pivot — in archive/decisions/)
- QR perks T1.4 (A.0 dossier preserved; E4/scarcity/QR-MVP owner decisions still open).
- S101 16-item chain/trigger carry-forward ledger (buff applier, offline-duel credit, Messenger turn-in, chain HUD…).
- Breadth-module deep-entry-at-pull-time (Grok CHECK); gameplay-video capture while old build restartable (Gemini CHECK).
- Voice reviews (DEED_PHRASES + S101 chain heralds), REAL_FESTIVAL_DATE, Litestream→R2 — all owner-gated, revisit at rebuild deploy.

## Recent Reflexion (last 2 sessions)
- **S102:** scope-owner-decisions-before-Council; mechanical-coverage-gate-survives-agent-death-by-spend-limit; mcv-schema-not-fabrication; scheduled-task-stop-orphans-process-+-tunnel-hides-second-instance. Rebuild pivot: 3/3 shipped, survived 2 spend-limit interruptions, MCV reconciled to exit 0.
- **S101:** live-smoke-catches-what-unit-tests-cannot; adversarial-check-earns-cost-when-findings-flip-design; map-vs-emit-vs-listener-audit-before-reviving-dead-events. B-05 NPC chains + P5 plumbing shipped + deployed live.
