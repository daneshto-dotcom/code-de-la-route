# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-19 | Session: S113

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## WHERE THE GAME IS NOW
The arrival runs (2026 → Dael → film → 1601), and **the item system is complete end to end.**
You can search a shelf, carry things in two hands and a 3×3 pack, fill a bottle at the basin,
drink it, pour it out, throw it and hear it shatter — and find an iron key that opens the store
door for good. The cutscene now skips on the FIRST viewing.

## THE INPUT MODEL — BUILT, AND THE TIERS ARE LOAD-BEARING
| Key | Tier | Verbs |
|---|---|---|
| `F` / `Enter` | **ENGAGE** — reach *into* the world | Take · Knock · Unlock · Talk · **Fill** · Look |
| `1` / `2` (+numpad) | **HANDS** — act *with* what you hold | **Place** · Spill · Strike · Throw · Ingest |
| `I` / `TAB` | **SUBSCREEN** | 3×3 grid + two hand slots |

- **TAP vs HOLD on a hand key:** tap acts on the tile you face; hold 220 ms raises a sight, arrows
  aim it (Manhattan ≤ 4), release throws. **Sight on your own tile = cancel.**
- S113 caught FILL and PLACE on the WRONG tiers and moved them. Do not let them drift back.
- **DO NOT BIND `Ctrl` or `Alt`** — browser game. Bind with `kb.addKey`, never `keyboard.on`:
  addKey registers a capture, and a capture is the only thing here that calls preventDefault.

## SIX ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits BOTH zone1 and zone1_2026. Never hand-edit either.
2. **PLAYER STATE AND WORLD STATE ARE SEPARATE.** `carry` (hands+pack) is yours; `world.taken`/`world.dropped`
   belong to the world and to the server the day there is one. Folding them = multiplayer rewrite.
3. **NO UI ART IN THE ATLAS.** `evidence-check` fails any tile no live map places, and menus reach the
   world through none of its routes. Chrome is Graphics on the DECLARED UI ramp; the doll is a
   `player.png` frame; items are composited atlas frames.
4. **THE PLAYER SHEET IS 3 COLOURS.** A green bottle can never be drawn into `player.png`.
5. **A TAKE CAN NEVER BE REFUSED** (ground swaps when full); a CONTAINER declines dim instead.
6. **DROPPED ITEMS BLOCK**, and `create()` throws on an unwalkable warp — `canPlaceAt` refuses doorways.

## THE TESTING HARNESS — THE BOOT ADVICE ALONE IS NOT ENOUGH
The pane often does not composite, so rAF never fires while `actualFps` lies about 60.
`game.step()` is necessary but **not sufficient**:
- Phaser 3.90's **TweenManager keeps its own wall-clock** and ignores step()'s delta — pump every
  live tween by hand or `moving` never clears.
- **`sys.sceneUpdate` is cached at boot** — patching `scene.update` on the prototype fires never.
  Instrument via `scene.events.on(UPDATE)`.
```js
window.step=(ms)=>{const dt=16.666;for(let e=0;e<ms;e+=dt){T+=dt;g.loop.delta=dt;g.loop.time=T;g.step(T,dt);
  for(const sc of g.scene.scenes){if(!sc.scene.isActive())continue;for(const t of sc.tweens.getTweens())t.update(dt);}}};
```

## Next Steps
1. **CF-S109-WORLDBUILD-SYSTEM** — tile inspector + tile library. Daniel sequenced **Council** on this
   after Part 3; Part 3 closed in S110 and it is now the oldest open item. Needs a PDR.
2. **WHERE THE KEY REALLY LIVES** — Daniel's call: *"make it hard to find the key later or make it
   into a quest."* It sits provisionally at the back of the cellar's west ledge, flagged in
   `build-cellar.py`. Moving it is a one-line change to `holds`.
3. **STO-1's INTERIOR** — the door now opens onto darkness because `FEA-STORAGE-HOUSES` records that
   its "dimensions still want a tape measure". One measurement unblocks a real room.
4. **Backlog #29 — the film**, still parked on Daniel's call ("we WILL rework it later"); the
   direction is stills, not video. `CF-S110-FILM-REROLLS` carries the four weak shots.
5. **A DROP-FROM-PACK VERB.** With 11 slots full and a container in front, Take draws dim. Recoverable
   (place from a hand onto the ground), so not a soft-lock — but the pack is its obvious home.

## Blockers
- **`CF-S107-KEY-EXPOSURE` — rotate the `.env` keys.** Open since S107.
- **The gate's lower half: OPEN BARS or SOLID PANEL?** The record never says; the film is internally
  inconsistent. One photograph settles it permanently.
- **Dael's tutorial role** — unanswered since S110.
- The N7 is ONE TILE wide; two lanes means growing a map shared with 1601.
- Verb-menu ceiling past ~8 entries: recorded, not solved (menus currently cap at 4).

## Pending Backlog
- [ ] #29 — the arrival film reworked as a frame-by-frame story (PARKED on the owner's call)
- [ ] CF-S109-WORLDBUILD-SYSTEM — tile inspector + tile library (Council-sequenced, now due)
- [ ] CF-S110-FILM-REROLLS — four weak shots + the gate question
- [ ] CF-S107-KEY-EXPOSURE — rotate the `.env` keys
- [ ] Sketchbook API still dead code (0 callers); Gemini's proposal was to wake it on first pickup
- [ ] `bottle_empty` / `bottle_water` / `key_iron` are all PROVISIONAL art, first to redraw

## Recent Reflexion (S113)
- **S113-1** The harness lied before the code did: Phaser's TweenManager ignores step()'s delta and
  `sys.sceneUpdate` is cached at boot. A harness that lies is worse than none — it produces confident numbers.
- **S113-2** I reported a finding from a counter that had never incremented. Prove the instrument moves first.
- **S113-4** Records outrank the plan: "the key opens the two locked doors" met an owner ruling and an
  unmeasured interior. Rescoping on evidence and saying so beats delivering the sentence.
- **S113-8** Prose is not verification. 20 of my `verification[]` entries were accurate sentences that
  bound to nothing on disk. Typed assertions or it did not happen.
- **S113-10** Implement the recorded model, not the convenient one — FILL and PLACE had both drifted
  onto the wrong tier, each by a locally reasonable choice nobody decided.
