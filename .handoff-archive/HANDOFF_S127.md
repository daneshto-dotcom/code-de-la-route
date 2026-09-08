═══════════════════════════════════════════════════════════
HANDOFF SUMMARY — Legacy of the Realm
Generated: 2026-09-03
Session: S127 — the database became a protocol, and zone 2 became walkable
═══════════════════════════════════════════════════════════

## PROJECT
- Working directory: `C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm`
- Git: parent `main` @ `34a21fb` · submodule `Game/founding-realm` `master` @ `c5349df` — both clean, 0 unpushed
- Tech: TypeScript + Phaser 3.90 + Cloudflare Worker + Neon PG · Python tile generators
- Session diff (submodule): 29 files, +3821 / −1091

## CURRENT STATE
- Gates: `npm run check` (14 guards), `npm test` (16 suites), `test:survey` (42 assertions), `check:site`, `scan:secrets`, `verify-session-claims.py` — **all exit 0**
- Deployment: **LIVE** at legacyoftherealm.com. Live `dist/main.js` sha256 `362751a948a285ca`, byte-identical to local. CI 4/4 green. Deploy is automatic on push to `master` touching `rebuild/**`.
- World: 6 live parcels, 3528 cells, **0 open border tiles**
- Database: `realm/` 167 records (was 136) · `knowledge/` 100 entries (was 83)

## SESSION COST
- Model split: 3 opus / 0 sonnet / 0 haiku (tracker undercounts; effectively all-Opus by ALWAYS-STRONGEST)
- Context at close: **965,445 / 1,000,000 (96.5% RED)** — above the 900K threshold; he called the close correctly
- Cumulative log: `~/.claude/usage-log.csv`

## THIS SESSION'S WORK
**The database (his instruction, mid-session).** He pointed at `realm/` and `knowledge/` and the store immediately settled a question four survey documents (3600 lines) had missed. Consulting it is now the LAST step of boot and contributing is part of close — written into `Game/founding-realm/CLAUDE.md` beside the store, not into the shared handoff skill (per `RES-S123-CLOSE-GATE-GLOB`). Every command in that protocol was run before being written. `realm/` had **stopped at S109 — 17 sessions**; the four zone-2 videos (23.74 GiB) were not recorded at all. Now hashed and probed: 47 seconds, which retired the standing note that two of the four could not be recorded honestly.

**Phase 6 — the zone-2 record set.** 24 records. Six `DEC-S126-*` with his literal words (R10 refuses `owner_stated` without a verbatim); `DEC-S126-6` had none on disk and was recovered from the S126 transcript, **hedge intact** — "yes i think they are inverted". Plus `DEC-BRAMBLE-PENETRABLE` and `DEC-POND-IS-FULL-WATER`, two amendments the build needed. `ZONE-2` + 15 observations. Corrected `ZONE-1`'s `tile_grid` — 20×18 since S105, actually parcel001's retired figure.

**His seven rulings, taken live.** Grid → three parcels. Save census → fix it. Pond gaps → both, different roles. SE boundary → the fence. Second bank → in. Arboretum → **SCENERY** (overruled the recommendation). Artifact → a **dig**, gated shovel → torch → the zone-1 storehouse, and the guardsmen don't know what they're looking for. All recorded with verbatim; the quest chain is **not built**.

**The save-ceiling census, on his go.** `everyTileKey()` counted every cell; `canPlaceAt` refuses non-walkable and warp tiles. 2768 counted vs 1015 droppable — **63% overstated**. Narrowed to the engine's own rule. Verified by **planting the fault** (a 90×100 all-walkable parcel failed all three ceilings; removing it returned green). Worst case 91.2 → 32.6 KiB, and the keepalive risk the file tracked is **retired**, not reduced.

**ZONE 2 IS WALKABLE.** `zone-2-road` 20×38, **zero new art** (21 glyphs, all in the atlas, checked at build time). The join opens the hedge lid at cols 14–15 only and adds the first non-door warp out of zone 1. **Walked end to end in the running game** — (2,30)→(2,37), the warp fired, the save landed `zone-1 @ 14,1`. The parcel's draw cross-checks the generator exactly: 820 ground+over and 314 canopy images vs 608+212 and 314 glyphs. `PARCELS` in `build-zone2.py` IS the grid decision — no dimensions elsewhere.

**Two engine budgets nobody knew.** (1) A scrolling parcel needs **≥ 20 cols and ≥ 18 rows** — at 16 cols the parcel rendered a 64 px band of sky, because `ParcelScene:624` uses an AND and a narrow-but-tall parcel takes the scrolling branch with bounds too small. **14 guards and 16 suites all passed over it**; only looking at the frame found it. (2) The MAP page caps a parcel at **42 rows**.

**Coherence pass.** An **edge audit** (walkable border tiles that aren't warps) found **four** across three parcels, from three causes: the opened lid propagating into the warp-less 2026 twin; an S109 off-by-one dropping a closing scrub off the last column, unseen for 18 sessions; and the new verge at the bottom row. All closed — **0 open border tiles world-wide**. `reach-check` structurally cannot see these: it asks whether the player can *reach* everywhere they should, and a border hole is reachable. Containment ≠ connectivity.

## OPEN ISSUES
- **[STEP 5 — UNCOMMITTED FILE IN THE PARENT REPO, BY DESIGN]** `BRAIN/architecture/ACTIVE_PLAN_realm_rebuild.md` is modified and **left uncommitted**. It lives in the **Founder DNA parent repo**, and this skill's scope guard (Rule 12 / STEP 1.1.A) forbids a child-project session committing there. The edits are correct and wanted — §8 still claimed the site was taken *fully offline* and told a future session to re-arm the uptime watchdog "in the same commit that brings the rebuild online" (that commit happened without it), and §7's parcel roadmap did not record that the zone track superseded it at `DEC-S125-1`. **Remediation:** commit it from a Founder DNA **root** session, or explicitly authorise a cross-scope commit. Until then the change is on disk only and a `git checkout` in the parent would discard it.
- `CF-S127-LIVE-AND-UNWATCHED` (MEDIUM) — site live, monitor parked, and `/health` returns 404. **Do not just arm the cron**: two changes, one commit.
- `CF-S127-NO-GUARD-ON-WALKABLE-BORDER` (MEDIUM) — no guard finds border holes; spec + fault-plant recorded.
- `CF-S127-NO-GUARD-ON-PARCEL-VIEWPORT-FIT` (MEDIUM) — the viewport rule is asserted only inside `build-zone2.py`.
- `CF-S127-NIGHT-GUARD-HOLES` (MEDIUM) — palette distance rules run under `npm test`, **not** `npm run check`; nothing asserts a BG palette has a night ramp.
- `CF-S127-ZONE-GRID-UNCHECKED` (LOW-MED) — nothing compares a zone's `tile_grid` to the map implementing it.
- `CF-S127-HARVEST-UNVERIFIED` (MEDIUM) — 40 candidates + corrections to WRONG stored entries; all 30 verifiers killed by a spend limit, so none written.
- `CF-S122-PRESENCE-IS-UNAUTHENTICATED` (MED-HIGH) — live in production, no session token checked.
- 32 open findings total: `npm run know -- --open`.

## BLOCKED ON
- **`zone-2-head`** — his ruling on whether the quest pocket sits inside the traced polygon. Frames sent; he asked "which pocket?" and has not answered.
- `CF-S107-KEY-EXPOSURE` + `CF-S123-CF-TOKEN-EXPOSED-IN-TRANSCRIPT` (both HIGH) — rotation, owner only.
- `CF-S115-SUBMODULE-STATE-SHADOW` (HIGH) — untracked `.claude/` in the submodule; needs his go.

## NEXT STEPS
See `boot-snapshot.md` — 6 prioritised items. **Immediate:** `zone-2-pond` (29×38), blocked on ART not decisions; the WATER palette is settled and verified, so it is a tile-drawing job. **Then:** `zone-2-head` once he rules on the pocket. **Also:** the `/health` route + monitor, and re-run the harvest verify phase (replays from cache).

## SESSION PIPELINE REPORT
Pipeline: Session PDCA v2 | Priorities: **8/9 complete, 1 blocked** | context 965K/1M (RED)
- P1 database harvest — completed — `34a21fb`/`c5349df`
- P2 boot+close protocol — completed
- P3 seven rulings put to him — completed
- P4 zone-2 record set — completed
- P5 pond rim art — **blocked** (art, + the pocket ruling)
- P5a WATER palette — completed
- P6 the join — completed
- P7 `build-zone2.py` + `zone-2-road` — completed
- P8 coherence pass / edge audit — completed

## REFLEXION ENTRIES
10 entries, in `.claude/reflexion_log.md` (S127 block at top). Headlines: `#ask-the-database-before-you-start` · `#validate-the-instrument-before-the-result` · `#a-threshold-is-a-floor-not-a-score` · `#i-closed-two-priorities-on-prose` · `#check-the-inherited-arithmetic` · `#the-guard-was-right-and-i-was-the-bug` · `#dont-arm-a-watchdog-that-barks-at-a-healthy-door` · `#r8-earned-its-keep` · `#the-guards-read-data-the-camera-composes-it` · `#containment-is-not-connectivity`

## CARRY-FORWARD PRIORITIES
1. **`zone-2-pond`** — not started. Needs new art; palette settled. No PDR needed (pre-approved batch).
2. **`zone-2-head`** — blocked on his pocket ruling.
3. **`CF-S127-HARVEST-UNVERIFIED`** — re-run the verify phase; harvest agents replay from cache.

═══════════════════════════════════════════════════════════
