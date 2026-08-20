# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-20 | Session: S114

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## WHERE THE GAME IS NOW
The arrival runs (2026 → Dael → film → 1601). The item system is complete and now
**legible**: what you hold is drawn **in both hands** on the map, the pack **stacks**
with a count, and holding `Enter` on a stack **splits** it. Save schema is **v5**.
Two browsable admin pages exist — a clickable parcel explorer and a 174-tile library.

## THE INPUT MODEL — BUILT, AND THE TIERS ARE LOAD-BEARING
| Key | Tier | Verbs |
|---|---|---|
| `F` / `Enter` | **ENGAGE** — reach *into* the world | Take · Knock · Unlock · Talk · **Fill** · Look |
| `1` / `2` (+numpad) | **HANDS** — act *with* what you hold | **Place** · Spill · Strike · Throw · Ingest |
| `I` / `TAB` | **SUBSCREEN** | 3×3 pack + two hand slots |

- **TAP vs HOLD is the ONE modifier idiom.** Hold `1`/`2` 220 ms on the map → throw sight,
  arrows aim (Manhattan ≤ 4), release throws; sight on your own tile cancels. Hold
  `Enter`/`F` 220 ms in the pack → split. `SPLIT_HOLD_MS` and `AIM_HOLD_MS` are both 220
  **on purpose** — same gesture, two places. Change one, change both.
- **DO NOT BIND `Ctrl` or `Alt`** — browser game. Bind with `kb.addKey`, never `keyboard.on`.
- FILL is ENGAGE, PLACE is HANDS. S113 caught both on the wrong tier. Do not let them drift.

## SEVEN ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits BOTH zone1 and zone1_2026. Never hand-edit either.
2. **PLAYER STATE AND WORLD STATE ARE SEPARATE.** `carry` is yours; `world.taken`/`world.dropped`
   belong to the world and to the server the day there is one. Folding them = multiplayer rewrite.
3. **A HAND HOLDS EXACTLY ONE THING — a LAW, not an oversight.** Stacking the hands collides with
   Items.ts law 1 (a vessel takes the nature of what fills it): filling three empties at the basin
   would have to split a stack mid-verb. Capping the hand is why FILL/SPILL/DRINK/THROW/PLACE were
   untouched by S114. **Only the PACK stacks.**
4. **NO UI ART IN THE ATLAS.** `evidence-check` fails any tile no live map places. Chrome is Graphics
   on the DECLARED UI ramp; the doll is a `player.png` frame; items are composited atlas frames.
5. **THE PLAYER SHEET IS 3 COLOURS** — a green bottle can never be drawn INTO `player.png`. It CAN be
   composited beside it, which is how both hands now show on the map. The limit forbids drawing *into*.
6. **A TAKE CAN NEVER BE REFUSED** (ground swaps when full); a CONTAINER declines dim instead — and
   that check is now **tile-aware** (`canTake`), because a full pack still has room in a matching stack.
7. **DERIVED ARTIFACTS MUST PROVE THEIR OWN FRESHNESS.** S107 (stale bundle) and S108 (stale dist/art)
   each cost a session. `check:stale` is guard #7: world-index + both HTML pages + every render carry
   the atlas hash and their inputs' mtimes.

## THE TESTING HARNESS — THE BOOT ADVICE ALONE IS NOT ENOUGH
The pane often does not composite, so rAF never fires while `actualFps` lies about 60.
- `game.step()` is necessary but NOT sufficient: Phaser 3.90's **TweenManager keeps its own
  wall-clock** — pump every live tween by hand or `moving` never clears.
- **`sys.sceneUpdate` is cached at boot** — patch via `scene.events.on(UPDATE)`, not the prototype.
- **A synthetic `KeyboardEvent` reports `keyCode: 0`** and Phaser dispatches on `keyCode`. Force it
  with `Object.defineProperty(ev,'keyCode',{get:()=>N})`.
- **THE INSTRUMENT DEGRADES WITH USE (new, S114).** After enough synthetic dispatches in one page,
  arrows and Enter stop registering while Escape still works — and one such reading looked exactly
  like a bug in my own code. **Reload before each scenario and make an INSTRUMENT_CHECK the first
  assertion.** Once at the start is not enough.
```js
window.step=(ms)=>{const dt=16.666;for(let e=0;e<ms;e+=dt){T+=dt;g.loop.delta=dt;g.loop.time=T;g.step(T,dt);
  for(const sc of g.scene.scenes){if(!sc.scene.isActive())continue;for(const t of sc.tweens.getTweens())t.update(dt);}}};
```

## Next Steps
1. **NEXT BATCH IS DRAFTED AND AWAITING ONE ANSWER — ESC→SETTINGS + THROW REDESIGN.** Daniel's words:
   *"add ESC so that you can click on SETTING and learn about the key bindings and other mechanics
   and stuff so that players can change the keys to their likings and learn how to do stuff, because
   as of now i dont know how to throw the bottle or to hit with it or anything else"* and *"you hold
   an item with any of your hands. then you click a hotkey and have a highlighted tile square that
   you can move with your keys to chose which tile to throw to or even click on it with the mouse,
   that way you can walk and throw at the same time."*
   **BLOCKED ON HIS CHOICE:** "move it with your keys" and "walk and throw at the same time" collide —
   arrows cannot move both the player and the reticle. Three options were put to him: (a) **mouse aims,
   arrows walk** (recommended), (b) arrows aim, movement frozen (today's behaviour, just toggled),
   (c) reticle sticks to a tile and you walk freely. He has not answered yet. **Ask first, then build.**
   Rebinding is the big piece: keys are hardcoded `kb.addKey(K.ENTER)` and must move into a keymap in
   the save + a binding layer. Est. 50–70K, Full tier, Council mandatory.
2. **WHERE THE KEY REALLY LIVES** — Daniel's call (*"make it hard to find later or make it into a
   quest"*). Provisional at the back of the cellar's west ledge; one line in `build-cellar.py`.
3. **STO-1's interior** — the door opens onto darkness until someone takes a tape measure to it.
4. **Sketchbook API is still dead code** (0 callers) — wake it on first pickup, or delete it.
5. **`bottle_empty` / `bottle_water` / `key_iron` are PROVISIONAL art**, first in the queue to redraw.

## Blockers
- **`CF-S107-KEY-EXPOSURE` — rotate the `.env` keys. Open since S107. HIGH.** Owner-only.
- **The gate's lower half: open bars or solid panel?** The record never says; the film is internally
  inconsistent. ONE photograph settles it permanently.
- **Backlog #29, the film** — parked on his call; the direction is stills, not video.
- **Dael's tutorial role** — unanswered since S110.
- The N7 is ONE TILE wide; two lanes means growing a map shared with 1601.
- Verb-menu ceiling past ~8 entries: recorded, not solved (menus cap at 4).

## Pending Backlog
- [ ] #29 — the arrival film reworked as a frame-by-frame story (PARKED on the owner's call)
- [ ] #36 — item system: stacking done; **the map-sprite half is DONE**; a drop-from-pack verb is still open
- [ ] #37 — damage, fire, and what a liquid does. **RECORDED, DELIBERATELY NOT DESIGNED** on his instruction
- [ ] CF-S110-FILM-REROLLS — four weak shots + the gate question
- [ ] CF-S107-KEY-EXPOSURE — rotate the `.env` keys
- [ ] CF-S114-TOKEN-INSTRUMENT — `real-context-tokens.py` read ANOTHER project's transcript
- [ ] CF-S114-MCV-VERSION-ASSERTION-CLASS — stop asserting version numbers, assert the branch
- [ ] Sketchbook API still dead code (0 callers)

## Recent Reflexion (S114)
- **#i-quoted-the-lesson-and-then-broke-it** — the close gate hard-failed with all three priorities
  UNCOVERED: zero typed assertions. I had written long, accurate `check_method` PROSE, which binds to
  nothing. Earlier in the SAME session I quoted S113's #prose-is-not-verification approvingly. Knowing
  a rule and citing it is not the same as having a step that executes it. **Author `verification[]` in
  the same write that sets status=completed — there is no later.**
- **#a-council-opinion-about-looks-is-a-hypothesis** — I shipped the held item drawing only the ACTIVE
  hand on Gemini's advice that two 16px items would be a smear. Daniel found it in minutes. A Council
  opinion about how something will LOOK is a hypothesis; the only instrument is someone looking.
- **#the-law-nobody-in-the-room-named** — Council debated hand-stacking on symmetry grounds. The answer
  was in Items.ts law 1, which neither model had read. The project's recorded laws outrank both models.
- **#a-cancel-that-instantly-undoes-itself** — ESC cancelled a split and the next frame re-opened it,
  because the key was still down and every open-condition was still true. Static reading cannot catch
  it. A HOLD IS ONE GESTURE: once resolved, it stays resolved until the key comes up.
- **#assert-the-invariant-not-the-current-value** — two assertions bound `SAVE_SCHEMA_VERSION = 4` and
  went red on a correct bump, the THIRD time that assertion broke for that reason. When a correct
  change breaks an old assertion three times, the assertion is wrong.
- **#the-instrument-degrades-with-use** — synthetic keyboard dispatch stops working part-way through a
  page's life. Reload per scenario; INSTRUMENT_CHECK first.
- **#dullest-possible-migration** — the tempting v4→v5 merges adjacent identical slots. Identical
  totals, and wrong: it makes migration a REARRANGEMENT that must decide which slot survives.
  One-to-one cannot be wrong. Also: `load()` migrates in MEMORY and does not persist until the first
  write, so the original v4 save survives the session as a safety net.
