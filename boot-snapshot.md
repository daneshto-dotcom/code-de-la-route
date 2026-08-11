# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-11 | Session: S103 (THE PLAN IS FINISHED — 2/2 shipped)

## Next Steps
1. **The plan is now complete enough to build from.** Read `BRAIN/architecture/ACTIVE_PLAN_realm_rebuild.md` (Founder DNA repo) — §0 tells you how to start. **§3 (scale locked at 2 m/tile) and §9 (game mechanics) are the two sections that decide what you build.** Then `Game/founding-realm/archive/INDEX.md`, but check the **cut list §9.7 first** — most of the parts bin stays buried.
2. **Did Daniel send the entrance photographs?** He promised them for 2026-08-12. They are the art gate's input — palettes come off the real stone and oak, and they place the gate correctly. Ask for them if they haven't arrived; most visual work waits on them.
3. **Parcel-001 — the 600 m² entrance** (§7, marked ← NEXT). Daniel's scope: red-gravel forecourt *outside* the gate · heavy main gate · small worker's side gate · the drive in · wall on the right · guardian's house + little garden on the left. Walkable player, grid-locked 16 px, collision. **No NPCs.**
4. Alongside it, the minimal `rebuild/` scaffold (§6): own package/tsconfig, import boundary, `palette.ts`, the build-time palette guard, `ParcelScene`, and the **single versioned save store — mandatory from parcel-001**, or the eventual account retrofit becomes bigger than the whole build.
5. Present a PDR, get Daniel's go, build it, screenshot it, run the **LOVE gate**. Nothing advances on less than LOVE.

## Blockers
- **Waiting on Daniel: the entrance photographs** (promised 2026-08-12).
- **Waiting on Daniel: §9.10 RISK-1, time to funnel.** Both external reviewers independently found that the Unveiling — the only mechanic doing marketing work — sits inside the château while all 12 planned parcels cover the approach. `REAL_FESTIVAL_DATE` is still unknown and everything depends on it. His four levers are in §9.10. **Do not pick one for him.**
- **`ci.yml` fails on every push** (npm audit vs the frozen build's dep tree; not our doing). Recommendation on the table: park it like the uptime monitor. Needs his go.
- Site stays OFFLINE by design. Break-glass in `archive/state-snapshot/README.md`.

## Fixed this session
- The daily "site is down" email is dead. It was **our own** `uptime-monitor.yml`, not GitHub and not Cloudflare — a 15-min cron against a site we deliberately took dark. Cron parked, manual button kept, issues closed, re-arm recorded as a launch-checklist item in §8.

## Things a fresh session will otherwise get wrong
- **`estate-map-kit/hotspots.json` is WRONG** — Daniel found three errors (the château, the potager, the "entrance"). Cadastral *geometry* is authoritative; its *names* are not. Never cite a hotspot name as truth.
- **Geography is corrected parcel by parcel, as we build** (Daniel's rule). Do NOT go off and "fix the map."
- **Building numbers are Daniel's:** #13 = guardian's house (on the gate), #5 = the smithy, #41/#38/#32 = small connected outbuildings. Everything else nearby = village neighbours, not the estate.
- **Parcels 007–012 are PROVISIONAL** — the Council invented a woodshed, a cliff and a stable block that may not exist.

## Recent Reflexion (last 2 sessions)
- **S103:** the-alarm-was-ours-probe-the-repo-before-blaming-the-vendor; adversarial-check-is-worth-it-even-when-most-findings-die; **grep-your-own-draft-for-facts-the-owner-never-said**; **keep-the-conclusion-name-the-fabricated-evidence**. Meta: the owner narrowed my proposals three times and was right every time — my drift was always toward MORE, which is exactly what killed the previous build.
- **S102:** scope-owner-decisions-before-Council; mechanical-coverage-gate-survives-agent-death-by-spend-limit; mcv-schema-not-fabrication; scheduled-task-stop-orphans-process. Rebuild pivot: 3/3 shipped.
