# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-16 | Session: S111

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## WHERE THE GAME IS NOW
**The arrival is an arrival.** A new player boots into **2026** at [14,35] on the gravel with the
N7 at their back, walks **six steps** to **Captain Dael** at the shut gate, and every option he
offers now does something. Traffic runs one direction at a time and queues behind the tractor
instead of driving through it. Verified against the running game, not the source.

## THE FIVE ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits BOTH `zone1/map.json` and
   `zone1_2026/map.json`. **Never hand-edit either.** One correction lands in both.
2. **OBJECTS HAVE THEIR OWN PALETTE BANK.** Vehicles and NPCs are spawned ENTITIES, not legend
   glyphs. This is why the 2026 map fits in 8 and why Dael has skin. **Never put a person or a
   vehicle in a legend.**
3. **GLYPH SPACE WAS NEVER FULL.** Rows are JSON strings read one CHARACTER at a time — any BMP
   char is legal (`Π` `≈` `≡`).
4. **§11.7 IS A TEST.** A cell-by-cell assert proves the fabric is identical across eras. Touching a
   fabric palette requires citing the authorising row in `ERA_AUTHORITY`.
5. **THE PARCEL OWNS ITS START TILE — the save does not.** (S111.) `SaveStore.hasPosition`
   distinguishes a fresh save from a resumed one; `map.player.startTile` wins for a new player.
   The old hardcoded tile silently deleted the entire arrival for a whole session.

## TWO TOOLS THAT CHANGE HOW YOU WORK
**`npm run grid` — USE IT EVERY TIME HE SENDS A SCREENSHOT.** Never estimate a tile index.

**The Browser pane may not be compositing**, in which case rAF never fires and `update()`, the Clock
and the tweens never advance — while `game.loop.actualFps` still reports a **default** 60. Check
`game.loop.frame`: if it is 0, nothing has stepped. Drive it yourself:
```js
let T=1000; const step=(ms)=>{const dt=16.666; for(let e=0;e<ms;e+=dt){T+=dt; game.step(T,dt);}};
```

## THE AUDIT METHOD THAT FOUND EVERYTHING THIS SESSION
**Diff the artefacts that are supposed to agree.** Every S111 defect was already contradicted by
something on disk: the map declared a start tile the save overrode; `reach-check` validated a tile
the engine never used; `Traffic.ts`'s header asserted an invariant its own fleet data broke;
`build-zone1.py` said the road was one tile wide while the spawn code flipped a coin. Nothing was
missing — two sources existed, disagreed, and nothing ever compared them.

**And do not accept a measurement that cannot fail.** "0 overlaps" meant nothing until a control run
with the new rule defeated put 712 overlap-frames back.

## OPEN DECISIONS THAT ARE HIS
- **The N7 is ONE TILE wide.** A real two-lane carriageway needs two more full-width road rows =
  growing the map, which is **shared with 1601**. Not done unilaterally.
- **Dael's tutorial role** (open since S110): does he **move** off the 2026 gate and tour you in
  1601, or **stay AND** tour? Rule-16 amendment — needs NPC sprites, the TTS pipeline (zero audio
  files by design) and a guided-tutorial mechanic.

## BLOCKERS / OPEN
- **ROTATE the `.env` keys** (`CF-S107-KEY-EXPOSURE`, open since S107). Transcript exposure only.
- `CF-S109-WORLDBUILD-SYSTEM` — tile inspector + tile library. Sequenced for after Part 3; due.
- **The sketchbook is dead API** — `addSketch`/`annotate` are called from nowhere in `src/`.
- **2026 has exactly one interactable** (Dael); 1601 has two, both inert locked doors.
- Road signs (**colours were never photographed** — the one real dependency) · wire fencing ·
  concrete blocks · corrugated metal roof.
- The attic is built on zero footage (`IMG_8865` never delivered). **Still no photograph of the real gate.**
- **The film is PARKED, reference only.** If revisited, change TECHNIQUE, don't re-prompt.
- Parked at his instruction: the smithy roof, the NE corner of the court.

## HOW TO RUN IT — POWERSHELL, NOT BASH
`&&` is invalid in Windows PowerShell 5.1. Use `;` and an absolute path:
```powershell
cd "C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm\Game\founding-realm\rebuild"; npm run dev
```
Serves on **20694**. **Wipe the save** (`localStorage.clear()`) or you resume mid-map and never see
the arrival. Volume up — the road sounds as it PASSES now, not as it leaves.

## RECENT REFLEXION (S111, 6 entries)
- **S111-1** A feature can be complete in every part and absent as an experience. The arrival was
  "verified end to end" and every component worked; one number decided where the player stood.
- **S111-2** The map had been telling the truth the whole time, and so had the guard. The wrong
  answer won because nothing ever compared them.
- **S111-3** I nearly trusted `actualFps: 60`. `loop.frame` was 0. The number that could be a
  default lied; the counter that cannot be a default told the truth.
- **S111-4** A control run is worth more than a passing test.
- **S111-5** The file documented the invariant it broke. Comments rot into lies.
- **S111-6** A Stop hook told me to close with authority and a specific reason, and the reason was
  false on disk. Reading state took thirty seconds and prevented a fabricated handoff.
