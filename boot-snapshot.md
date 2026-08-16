# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-16 | Session: S112

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## WHERE THE GAME IS NOW
The arrival runs (2026 → Dael → film → 1601), and as of S112 **there is one thing in the world you
can pick up.** The cellar's bottle ledge is **searchable**: face it, press `F`, take a bottle, put it
down somewhere else, and it is still there after a reload.

## THE ONE DOCUMENT THAT MATTERS
**`BRAIN/architecture/ACTIVE_PLAN_S112_ITEMS.md`** — the item/verb architecture, three Council
rounds, the input model, and every decision with its reason. **Read it before touching items.**

## THE SIX ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits BOTH zone1 and zone1_2026. Never hand-edit either.
2. **OBJECTS HAVE THEIR OWN PALETTE BANK.** Vehicles, NPCs and now ITEMS are spawned entities, never
   legend glyphs. Verified: `palette-check` counts `map.legend[ch].tile` only, so an entity costs the scene nothing.
3. **GLYPH SPACE WAS NEVER FULL.** Rows are JSON strings read one CHARACTER at a time — any BMP char is legal.
4. **§11.7 IS A TEST.** A cell-by-cell assert proves the fabric is identical across eras.
5. **THE PARCEL OWNS ITS START TILE** (S111). `hasPosition` separates a fresh save from a resumed one.
6. **PLAYER STATE AND WORLD STATE ARE SEPARATE, AND MUST STAY SO** (S112). `carried` is yours;
   `world.taken` / `world.dropped` belong to the world and to the server the day there is one.
   **Folding them together makes multiplayer a rewrite.** Item methods are COMMANDS, not mutations —
   the archived build already ships `action-sanitizer.ts`.

## TRAPS ALREADY PAID FOR
- **Dropped items BLOCK**, and `create()` throws on an unwalkable warp — so a bottle in a doorway
  would crash the next boot. `canPlaceAt` refuses doorways; items spawn AFTER warp validation.
- **A TAKE CAN NEVER BE REFUSED.** Full hands + a ground item = swap. Containers decline dim instead.
- **DO NOT BIND `Ctrl` OR `Alt`** — browser game. `Ctrl+W` closes the tab. `SPACE` needs `preventDefault()`.

## TWO TOOLS THAT CHANGE HOW YOU WORK
**`npm run grid` — USE IT EVERY TIME HE SENDS A SCREENSHOT.** Never estimate a tile index.

**The Browser pane is often NOT compositing**, so rAF never fires and `update()`, the Clock and
tweens never advance — while `game.loop.actualFps` reports a **default** 60. **Check
`game.loop.frame`: if it is 0, nothing has stepped.** Drive it yourself:
```js
let T=1000; const step=(ms)=>{const dt=16.666; for(let e=0;e<ms;e+=dt){T+=dt; game.step(T,dt);}};
```

## THE INPUT MODEL — DECIDED, NOT YET BUILT
`F`/`Enter` = ENGAGE (reach into the world) · `1`/`2` = HANDS (act with what you hold) · `I` = subscreen.
**Inverse operations never share a key** — that is why the one-button model was rejected.
**Tap** a hand key = strike/place; **hold** = a reticle appears, arrows choose the target tile, release to throw.
`F` acts instantly when safe and reversible; it **always asks before anything irreversible**.

**THE CRYSTAL TEST for every future mechanic:** *can it be said in tiles, facing, one button, and a box?*
Crystal is the grammar, not the ceiling. Refuse analog movement, mouse aiming, HUD bars, hitbox combat, zoom.

## NEXT PHASES
**B** — 3×3 grid + two hands + the mini sprite that visibly holds the assigned item.
**C** — the verb engine (properties, three laws, FILL/SPILL/INGEST/THROW).
**D** — **the key opens the two doors** the game has advertised since S109. Question → Tool → Revelation.

## BLOCKERS / OPEN
- ⛑ **16 commits unpushed on the parent, 15 on the submodule.** The remote is REACHABLE (credential
  healthy), so this is a real backlog, not a dead token. Push is operator-confirmed — ask Daniel.
- **THE CUTSCENE ALREADY SKIPS — but only on a REWATCH.** `Cinematic.ts` gates it on
  `intro.seen === true`, from a unanimous S110 Council call. Daniel asked for it to be skippable
  (S112); the change is small but it REVERSES a logged decision, so it needs saying in the PDR.
  Backlog #30.
- **The bottle tile is PROVISIONAL** (`craft()`): the survey observed the LEDGE's function, not a bottle.
- **ROTATE the `.env` keys** — `CF-S107-KEY-EXPOSURE`, open since S107.
- **The film is PARKED and rejected again** — S112: *"it looks super shitting and we WILL rework it
  later! maybe try an image generating story not a full movie, just frame after frame short storyline."*
- The sketchbook API is still dead code — Gemini's proposal is to wake it on the FIRST pickup.
- Verb-menu ceiling past ~8 entries: recorded, not solved.
- `CF-S109-WORLDBUILD-SYSTEM` — tile inspector + tile library.
- The N7 is ONE TILE wide; two lanes means growing a map shared with 1601.
- Dael's tutorial role — unanswered since S110.

## HOW TO RUN IT — POWERSHELL, NOT BASH
```powershell
cd "C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm\Game\founding-realm\rebuild"; npm run dev
```
Port **20694**. The bottles are in the cellar — stand under the **west** end of the top-wall ledge and press `F`.

## RECENT REFLEXION (S112, 6 entries)
- **S112-1** He designed his way out of a closed option set I presented. Three choices invites picking one; the better answer can be outside the set.
- **S112-2** The defect lived BETWEEN two functions that were each correct alone. Only a round trip through the running game found it.
- **S112-3** One word — "multiplayer" — was architecture in disguise.
- **S112-4** My one-button model optimised for elegance; the player needs predictability.
- **S112-5** The Council's best output was a contradiction, resolved on an axis neither had named.
- **S112-6** A guard's own comments wrote the rule for extending it.
