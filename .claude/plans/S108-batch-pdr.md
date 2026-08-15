# S108 BATCH PDR — Full tier (>30K)
Owner instruction (verbatim, 2026-08-14):
> "start working on the interior of the guardians house including the attic. study the videos
> where i walked and explained the outline of the house so you can make it as close as possible.
> the run the cheap 4. Optional/cheap: the deferred MCP server; tighten the observed grade. this
> is the main thing you will work on this session. then for the first 'mechanic' we will add
> 'interract' button like there is in pokemon. it will be 'Enter' key or 'F' ... make the
> entrance(door) to the storage house interractable ... 'storage house locked - need key' ...
> and we should also make the door to the smithy interractable. maybe something like -'Door
> Locked - knock on door?' question, with Yes/No options. for now the options will do nothing"
> "i approve full session priority batch run it thoroughly and creatively and
> mechanically/architecturally sound. in the end check your work and when im back iil test it all"

## 1. OBJECTIVE
Ship BLD-1's interior (ground floor + attic) as a walkable scene, close the two cheap
carry-forwards, and land the project's FIRST play mechanic — a Pokémon-style interact button —
on two locked doors. §13.2 step 2 and step 3, in his order.

## 2. SCOPE
**P1 — BLD-1 interior + attic.** New scenes `bld1-ground` and `bld1-attic`; new interior tiles;
warps house↔zone-1 and ground↔attic↔cellar.
**P2 — the cheap 4.** (a) MCP server over realm.db. (b) `observed`-grade tightening.
(c) record the two undocumented findings this session surfaced.
**P3 — the interact mechanic.** `Enter`/`F`, facing-based, GBC dialogue box, Yes/No prompt.
Storage-house door and smith's door become interactable.

OUT OF SCOPE: the smithy INTERIOR (§11.3 — stays closed); NPCs; the sketchbook; any quest;
making the Yes/No options do anything; key-finding.

## 3. EVIDENCE BASE (gathered this session, from the videos as instructed)
Re-extracted from source, not from prior prose:
- `IMG_8866.MOV` — 24 frames @2fps. Ground-floor sweep.
- `VID_20260813_091936.mp4` t=160–295 — 68 frames @0.5fps + 3×50 s STT segments.

What the footage gives:
- **The ground floor is an ENFILADE.** Walk frame w_026 looks straight down a line of rooms
  through successive aligned door openings to a glazed door at the far end. This is the single
  most important layout fact and it was not previously recorded.
- **Four rooms** (`OBS-S106-BLD1-ROOMS`, owner_stated). Today's three is modern demolition
  — *"we took them down cuz we're going to make a gym out of this place"*. **1601 takes FOUR.**
- **The chimneypiece** (i_006, w_052): single-slab stone mantel on stone jambs, teal-painted
  firebox, iron bar across the opening, pegs on the mantel shelf.
- **The shared chimney is PROVEN, not inferred.** A round stovepipe socket is cut into the
  chimney breast above the mantel, with the loose cast-iron stove beside it. Daniel hedged
  — *"probably a heater here connected to the main like fireplace"* — the flue socket is the
  physical confirmation. This UPGRADES his hedge from inference to observed.
- **The stair** (w_042): straight flight, pipe handrail (modern), lit by a landing window.
- **The bathroom** (w_054): green walls, white tiled splashback, wall-hung sink, shower tray.
- **Ceiling**: plafond à la française, one bay collapsed to battens and tiles (`OBS-BLD1-DECAY`).

**THE ATTIC HAS NO FOOTAGE.** Checked all seven S105 clips, both S106 videos, and the database.
`IMG_8865` — the missing clip — is the attic clip he refers to (*"over there, I already showed
you videos. That's the attic"*). It is still on the wanted list. **The attic is therefore built
by SUBTRACTION** from the hipped roof form, the dormers, the collapsed ceiling bay showing
battens and tiles, and the measured footprint — and every attic tile is graded `subtracted`,
never `observed`. This is stated to him plainly, not papered over.

## 4. THE 1601 SUBTRACTION (DEC-1601-METHOD)
STAYS: four-room enfilade plan, plafond à la française, stone chimneypiece (minus the teal
paint), thick walls with deep window reveals, the stair, door/window openings, the roof timbers.
STRIPS: yellow-ochre/maroon dado/floral frieze scheme, mint-green joinery, cement screed floors,
the cast-iron stove, the pipe handrail, the bathroom entirely (modern), wallpaper, jerrycans.

## 5. DESIGN — P3 vs §9.2 THE NO-TOAST LAW
§9.2 is constitutional and governs actions on the world: *"Text alone is never a valid response
to an action."* A locked door that only prints a line would violate it.
So each interaction carries a real effect alongside the text:
- **Sound.** A tiny GBC-authentic synth (square + noise channels, WebAudio, zero asset bytes,
  zero dependencies) — a dull rattle for the locked latch, a knock for the smithy.
- **Motion.** The door tile nudges 1 px on its axis and settles — a real sprite response.
This is also what Pokémon actually does, so it matches his ask rather than diverging from it.
Deferred deliberately: the doors do not open, no key exists, Yes/No does nothing — his words.

## 6. THE `observed` TIGHTENING — MEASURED, AND MOSTLY REFUTED
Grok's S107 proposal was "require the most specific leaf record". Measured before building:
| candidate rule | would fire on | verdict |
|---|---|---|
| cite a leaf, not a parent | **0 of 104** claims (only 3 records have children) | **DEAD** — a control that cannot fail |
| require media backing | **0 of 27** cited records (all already backed) | **DEAD** |
| require lexical topic overlap | 29 of 90 — majority legitimate (`pier_base`→`OBS-GATE-PIERS`) | **NOT BLOCKING** — precision too low; ships as a report metric only |
| **require frame-time on `observed`** | **1 of 90** — `road_railing`→`MAT-IRON-RAILING` | **SHIP** |
The one hit is not noise: `MAT-IRON-RAILING` is the record at the centre of
`CF-S107-IRON-PALETTE-REFUTED`. A rule whose only catch is the known-refuted record is pointing
at the real problem. Rule: an `observed` claim must cite a record that can point at a frame.

## 7. TESTING
- Six existing guards must stay green; the new seventh (frame-time) must be proven to block.
- `tsc --noEmit` 0. Evidence self-test 11/11 + new planted violations for the new rule.
- Reach-check must confirm every new room is reachable and the warp graph closes.
- **VERIFY IN THE BROWSER** (S107's worst moment): walk gate→house→attic→cellar and screenshot
  each, plus both interactions firing. A Python render is NOT acceptable proof.
- Bundle guard must confirm the bundle post-dates the new atlas.

## 8. RISKS
- **Tile-index renumbering** (S107's scrambled zone): inserting interior tiles renumbers the
  atlas. Mitigation: rebuild atlas → maps → bundle in order, then the bundle guard, then the eye.
- **Legend glyph collision** — a dict literal overwrites silently. Mitigation: assert on insert.
- **Scale**: interiors are 1 m/tile vs 2 m outdoors (established by the cellar). Keep it.
- **Attic invention creep** — the live risk. Mitigation: `subtracted` grade forced by the guard.
