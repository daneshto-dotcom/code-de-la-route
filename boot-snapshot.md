# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-12 | Session: S103 (THE PLAN IS FINISHED — 3/3 shipped)

## Next Steps
1. **Ask Daniel for the entrance photographs.** He promised them for 2026-08-12 and everything visual waits on them: the palettes come off his real stone, slate and oak, and they place the gate correctly. This is step one of the session, not a background task.
2. **Read `BRAIN/architecture/ACTIVE_PLAN_realm_rebuild.md`** (Founder DNA repo) — §0 tells you how to start. **§3 (scale locked at 2 m/tile) and §9 (game mechanics) are the two sections that decide what you build.** Then `Game/founding-realm/archive/INDEX.md`, but check the **cut list §9.7 first** — most of the parts bin stays buried forever.
3. **Build parcel-001 — the 600 m² entrance** (§7, marked ← NEXT). Daniel's own scope: red-gravel forecourt *outside* the gate · the heavy main gate · the small worker's side gate · the drive in · wall on the right · guardian's house + little garden on the left. Walkable player, grid-locked 16 px, per-tile collision. **No NPCs.**
4. **Scaffold `rebuild/` alongside it** (§6): own package/tsconfig, import boundary against the frozen `src/`, `palette.ts`, the build-time palette guard, `ParcelScene`, and the **single versioned save store — mandatory from parcel-001**, or the eventual account retrofit becomes bigger than the whole build.
5. Present a PDR, get Daniel's go, build, screenshot, run the **LOVE gate**. Nothing advances on less than LOVE. Then parcel-002, **the bell** — the first consequential interaction, taught with zero text.

## Blockers
- **Waiting on Daniel: the entrance photographs** (promised 2026-08-12).
- **Waiting on Daniel: §9.10 RISK-1 — time to funnel.** Both external reviewers independently found that the Unveiling (the only mechanic that does marketing work) sits inside the château while all 12 planned parcels cover the approach. `REAL_FESTIVAL_DATE` is still unknown and everything depends on it. His four levers are in §9.10. **Do not pick one for him.**
- **Cloudflare:** unresolved whether any mail comes from there. Daniel to forward one email. Do not touch his Cloudflare account without it.
- Site stays OFFLINE by design. Break-glass in `archive/state-snapshot/README.md`.

## Fixed this session (do not re-investigate)
- The daily "site is down" email is dead. It was **our own** `uptime-monitor.yml` — not GitHub, not Cloudflare — a 15-min cron against a site we deliberately took dark.
- `ci.yml` is parked too: it guards the **frozen** build, so `npm audit` failed on every push forever as new CVEs landed on dead dependencies.
- ⚠️ **Asymmetry that matters:** the uptime watchdog **MUST be re-armed** in the same commit that brings the rebuild online. `ci.yml` must **NOT** be re-armed — the rebuild gets a fresh workflow written against `rebuild/`. Both are recorded in ACTIVE_PLAN §8.
- All three submodule workflows are now `workflow_dispatch`-only. The parent repo's three (deploy, propagation-check, submodule-bump-gate) were **deliberately left armed** — verified green, they email nothing.

## Things a fresh session will otherwise get wrong
- **`estate-map-kit/hotspots.json` is WRONG** — Daniel found three errors (the château, the potager, the "entrance"). Cadastral *geometry* is authoritative; its *names* are not. Never cite a hotspot name as truth.
- **Geography is corrected parcel by parcel, as we build** (Daniel's rule). Do NOT go off and "fix the map."
- **Building numbers are Daniel's:** #13 = guardian's house (on the gate), #5 = the smithy, #41/#38/#32 = small connected outbuildings. Everything else nearby = village neighbours, not the estate.
- **Parcels 007–012 are PROVISIONAL** — the Council invented a woodshed, a cliff and a stable block that may not exist.
- **The 666 m drive is NOT built 1:1** — that's 17 screens of gravel. Topology true, distances edited (§2).

## Pending Backlog
- Parked in `archive/decisions/`: QR perks T1.4 · S101 16-item chain/trigger ledger · breadth-module deepening (Grok) · gameplay-video capture (Gemini).
- Owner-gated: `REAL_FESTIVAL_DATE` · Litestream→R2 token · voice reviews (DEED_PHRASES + chain heralds).
- Cosmetic: a `.gitleaksignore` allowlist for two `gateway.ts` env-var false positives.

## Recent Reflexion (last 2 sessions)
- **S103:** the-alarm-was-ours-probe-the-repo-before-blaming-the-vendor; adversarial-check-is-worth-it-even-when-most-findings-die; **grep-your-own-draft-for-facts-the-owner-never-said**; **keep-the-conclusion-name-the-fabricated-evidence**; **a-completed-priority-with-no-assertions-looks-exactly-like-a-fabricated-one**; silence-the-failing-alarm-not-the-passing-one. Meta: the owner narrowed my proposals three times and was right every time — my drift was always toward MORE, which is exactly what killed the previous build.
- **S102:** scope-owner-decisions-before-Council; mechanical-coverage-gate-survives-agent-death-by-spend-limit; mcv-schema-not-fabrication; scheduled-task-stop-orphans-process. Rebuild pivot: 3/3 shipped.
