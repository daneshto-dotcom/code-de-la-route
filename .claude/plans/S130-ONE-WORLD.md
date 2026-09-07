# ONE WORLD MAP — S130

**Owner, twice, and the second time unambiguous:**
> "instead of the flash quick transition i want no transition at all. the camera should
> move with the player you understand?? one world map!!"

He is right and my first two attempts answered smaller questions. Removing the fade made
the SEAMS continuous. He wants the WORLD to be one — one coordinate space, one camera
that never stops following, no swap of any kind outdoors.

## Measured starting state
- Every parcel is its own Phaser scene with its own origin, so tile (2,15) exists three times.
- Tiles are `this.add.image()` per tile per layer — NOT a Phaser tilemap.
  zone-1 1820 · zone-2-road 1498 · zone-2-pond 1356 = **4674 image objects** outdoors.
- The drive leaves zone-1 at columns 14,15 and arrives in zone-2-road at 2,3
  (FACT-S130-THE-ZONE-1-SEAM-IS-12-TILES-OUT). road ↔ pond already align at 2,3.

## The world, derived from the seams (not chosen)
Joining each parcel to its neighbour at the drive, then normalising so nothing is negative:

| parcel | origin (x,y) | occupies |
|---|---|---|
| zone-2-pond | 12, 0 | x 12..40, y 0..37 |
| zone-2-road | 12, 38 | x 12..31, y 38..75 |
| zone-1 | 0, 76 | x 0..27, y 76..113 |

**World: 41 × 114 tiles (656 × 1824 px).** 2926 of those 4674 cells are covered by a
parcel; **1748 are void** and must be filled or the camera will show blank beside the
drive — that is the real cost of a narrow parcel at an offset origin, and it is what the
S130 viewport-fit guard measures.

## Three things this makes WORSE, stated before starting
1. **The MAP page.** `min(300//41, 210//114, 16) = 1 px/tile`. zone-1 ships at 5, and
   FACT-S127 names 1 px/tile as the failure mode. A 41×114 world cannot use the current
   whole-parcel minimap. **This is the one decision that is his.**
2. **Presence interest management.** Rooms are keyed `realm:parcel`. One outdoor scene
   means one room for the whole outdoors, so a step at the pond becomes news at the gate —
   throwing away what made presence nearly free. Fix: key the room on a REGION derived
   from world position (a coarse grid), which is better than parcels were.
3. **Performance is UNMEASURABLE HERE.** ~7–8k static images in one scene. Phaser culls
   off-camera, so this is probably fine, but `requestAnimationFrame` never fires in this
   environment (the whole reason tools/shoot.ts exists), so I cannot read a real frame
   rate. He can, and that is the honest division of labour.

## Order
- **P3 (now)** — world coordinates as DATA + a guard that fails when a seam does not line
  up. No behaviour change, no downside, needed by everything below, and it is the guard
  that would have caught the 12-tile bug before it shipped.
- **P4** — one outdoor scene at those origins; void filled with unwalkable zone-3 canopy;
  camera bounds = the world; outdoor warps deleted. Interior doors keep their fade.
- **later** — save migration to world coordinates, presence region keys, the MAP page.
