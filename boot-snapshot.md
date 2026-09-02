# Boot Snapshot (auto-generated at handoff)
Generated: 2026-09-02 | Session: S126 | parent 78c1c2b | submodule a3652d6

## READ THIS FIRST
Zone 2 is SURVEYED, not built. Phase 0 closed. Phases 1-7 are PRE-APPROVED by the
owner — start work after boot, no new PDR needed for them.

  Game/founding-realm/rebuild/docs/S126-ZONE2-SITE-TRUTH.md   (800 lines, the survey)
  Game/founding-realm/rebuild/docs/S126-ZONE2-OWNER-INPUTS.md (335 lines, his rulings)
  docs/survey-zone2-evidence/areas/                            (area manifests + 21 sheets)

## Next Steps  (Phases 1-7, pre-approved)
1. PHASE 1 — get his four rulings: the artifact's identity; the arboretum's role
   (place or scenery); whether both pond entrances are walkable; Cotoneaster
   toxicity vs his "some edible ones".
2. PHASE 2 — THE GRID DECISION (blocks everything). Zone 2 is 1.1442 ha = 2.69x
   all built ground. Orthogonal+straightened => ~115x25 tiles at 2 m. Choose: one
   long parcel / 2-3 sub-parcels with warps / coarser m-per-tile for the road.
3. PHASE 3 — the join. Open the hedge lid at zone-1 rows 0-1 (hedge x27 +
   wall_v x1); road exits cols 14-15. Retire the 20,0 annotation that contradicts
   the 15,2 anchor. reach-check must pass across the new warp.
4. PHASE 4 — tiles. REUSE FIRST: 9 already-drawn unplaced tiles (low_wall x3,
   step x2, grass_track x2, track_h, track_x, window_open). Net new ~7 + a road
   CORNER if bends need one. One new WATER palette — MUST clear the palette
   distance guard vs FOLIAGE or the pond reads as a dark hedge.
5. PHASE 5 — build tools/build-zone2.py on build-zone1.py's pattern. Water traced
   from the GREEN BAND waterline. Four barrier types kept distinct.
6. PHASE 6 — records: 4 MED-S126-*, the OBS-S126-* set, ZONE-2, DEC-S126-1..6.
7. PHASE 7 — engine gaps (owner PARKED): no HP, no water body type, no seasons,
   no patrolling NPCs, no reputation/theft. THE MAP SHIPS WITHOUT THEM; the quest
   and the bramble mechanic do not.

## Blockers
- PHASE 2 grid choice is the owner's and gates Phases 3-6.
- CF-S107-KEY-EXPOSURE (HIGH, open since S107) — owner-only .env key rotation.
- CF-S115-SUBMODULE-STATE-SHADOW (HIGH) — an untracked .claude/ inside
  Game/founding-realm/ shadows project state; needs owner go (deletion in a submodule).
- CF-S117-CLOSE-GATE-HANDOFF-GLOB — the shared close gate cannot see this
  project's handoff naming. Third confirmation. Worked around by a twin file.

## DECISIONS — DO NOT RE-LITIGATE
DEC-S125-1 zone by zone, no full estate map
DEC-S125-2 the 1601 map frame is accepted as shipped
DEC-S125-3 the standing blockers are PARKED
DEC-S125-4 NOTHING DECAYS
DEC-S126-1 he supplied zone 2's position + walking path himself
DEC-S126-2 ORTHOGONAL world (90 deg only); the true bearing is NOT needed
DEC-S126-3 THE ROAD IS THE ZONE 2 / ZONE 3 BOUNDARY — zone 2 is EAST of it only
DEC-S126-4 zone 1 FROZEN except the northern + far north-east boundaries
DEC-S126-5 read the narration, then ASK HIM — do not measure harder
DEC-S126-6 THE SIDE MAPPING IS INVERTED, superseding DEC-S125-5:
             ...4941 / ...0759 = RIGHT of travel (zone 2)
             ...4942 / ...0800 = LEFT of travel (zone 3)

## Footage (23.74 GB, NOT in git)
F:/zone2-footage/   the four files + maps/ (3 Google Maps captures)
F:/zone2-work/      audio, narration ledgers, areas.json, corrected/ sheets
Re-fetch: gdown against the public Drive folder. The MCP drive_list CANNOT see it
(OAuth scope is drive.file) and the API key is blocked from the Drive API.

## Recent Reflexion (last 2 sessions)
See .claude/reflexion_log.md — S126 block at top (14 entries), then S125.
Note: the S123 block (40 entries) was pruned at the 50-entry cap; it survives in
.handoff-archive/.
