# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-20 | Session: S115

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## FOURTH RULE, EARNED AT S115
**REPORT BETWEEN STEPS; DO NOT STOP BETWEEN STEPS.** PDRs-one-at-a-time is a sound DEFAULT and
becomes an obstruction the moment Daniel overrides it. He approved a four-priority batch and
execution still halted after P1 to ask about ordering: *"why are you stopping each priority! I said
i approved full session priority batch so get cooking on att of them and i will check ur work at
the end!!!"* When he has approved a batch, run the batch.

## WHERE THE GAME IS NOW
The arrival runs (2026 → Dael → film → 1601). **The input model is now discoverable and
reconfigurable.** ESC opens the JOURNAL: one page lists every key with two slots each and lets you
change them, the other teaches five mechanics with animated diagrams. A new player is asked ONE
question — right- or left-handed — and the throw knows which hand forever. Aiming has its own key
and accepts the mouse. Save schema is **v6**.

## THE INPUT MODEL — NOW A TABLE IN THE SAVE, NOT LITERALS IN SCENES
| Action | Default | Tier |
|---|---|---|
| `walkUp/Down/Left/Right` | arrows + WASD | — |
| `engage` | `ENTER` / `F` | **ENGAGE** — reach *into* the world: Take · Knock · Unlock · Talk · Fill · Look |
| `handLeft` / `handRight` | `1`/`NUM1`, `2`/`NUM2` | **HANDS** — act *with* what you hold: Place · Spill · Strike · Ingest |
| `aim` | `E` / `G` | **NEW at S115.** Hold it; steer with arrows, WASD or the mouse; release throws |
| `pack` | `I` / `TAB` | SUBSCREEN |
| `menu` | `ESC` | **FIXED, un-rebindable BY CONSTRUCTION** |

- **EXACTLY TWO SLOTS PER ACTION.** `Binding = [string, string | null]` — the asymmetry IS the rule
  that a primary always exists. Never widen this to an array.
- **`BINDABLE_KEYS` is a WHITELIST.** No Ctrl/Alt/Meta (Ctrl+W closes the tab), no function keys
  (F5 reloads), no BACKSPACE, no ESC. Fails closed: a key nobody considered is not offered.
- **AIM HAS NO HOLD THRESHOLD.** The 220 ms delay only ever existed to tell a tap from a hold on the
  *shared* hand key. `SPLIT_HOLD_MS` (the pack) is now the ONLY home of the 220 ms idiom, so the old
  "change one, change both" law no longer binds aiming.
- **`Input.ts` MUST STAY PHASER-FREE.** SaveStore imports it and SaveStore is tested HEADLESS;
  importing Phaser there kills the suite on `window is not defined` before its first assertion.
  `InputMap.ts` is the only place the two meet.

## EIGHT ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits BOTH zone1 and zone1_2026. Never hand-edit either.
2. **PLAYER STATE AND WORLD STATE ARE SEPARATE.** `carry` is yours; `world.taken`/`world.dropped` belong to the world.
3. **A HAND HOLDS EXACTLY ONE THING — a LAW.** Items.ts law 1: stacking hands would force a stack to split mid-FILL. **Only the PACK stacks.**
4. **NO UI ART IN THE ATLAS.** `evidence-check` fails any tile no live map places. All chrome is runtime Graphics + the 11px bitmap text.
5. **THE PLAYER SHEET IS 3 COLOURS.** An item can never be drawn INTO `player.png`; it is composited beside it.
6. **A TAKE CAN NEVER BE REFUSED** (ground swaps when full); a CONTAINER declines dim, and that check is tile-aware (`canTake`).
7. **DERIVED ARTIFACTS MUST PROVE THEIR OWN FRESHNESS.** `check:stale` is guard #7.
8. **MIGRATION BRANCHES DO NOT CHAIN (new, S115).** Every `if (version === N)` returns a COMPLETE
   SaveData stamped current and jumps straight to now. Add a field and **all six return sites** must
   carry it, or an old save migrates forward stamped v6 with the field missing. S114 shipped exactly
   that gap into the v3 branch.

## ASSERT THE BRANCH, NEVER THE VERSION NUMBER — FOURTH BREAK
`assert(version === 5)` failed **122 times** on a correct bump. Worse than noisy: `version` was the
module's own exported constant, so it compared a constant to a literal — it could never catch a bug
and could only ever break on a bump. It now asserts that migration STAMPS the current version.
A sibling test had also silently stopped testing its own name ("an already-v5 save passes through
untouched" was feeding a v5 save to a v6 build). **Four MCV assertions were superseded this session
for the same reason — always a needle pinned to a value a correct change was going to move.**

## THE TESTING HARNESS — THE BOOT ADVICE ALONE IS NOT ENOUGH
The pane often does not composite, so rAF never fires while `actualFps` lies about 60.
- `game.step()` is necessary but NOT sufficient: pump every live tween by hand or `moving` never clears.
- **`sys.sceneUpdate` is cached at boot** — patch via `scene.events.on(UPDATE)`.
- **A synthetic `KeyboardEvent` reports `keyCode: 0`** and Phaser dispatches on `keyCode`. Force it.
- **A rebind capture reads `ev.code`**, so a synthetic event needs `code` too (`{code:'KeyQ'}`).
- **Phaser's MouseManager binds `mousemove`, NOT `pointermove`.** Dispatching the wrong type reads (0,0) forever.
- **Input is QUEUED and flushed inside the step.** Dispatch, THEN step, or the pointer never updates.
- **THE INSTRUMENT DEGRADES WITH USE.** Reload before each scenario; make an INSTRUMENT_CHECK the first assertion.
- **AND IT DEGRADES TOWARD REASSURANCE (new, S115).** A listener-count probe returned a comforting
  `0` because it sampled the wrong scene, and nearly buried a real finding. Prove the counter can
  MOVE (add a probe handler, watch it change, remove it) before trusting a flat line.
- **"THE TEST FAILED" ≠ "THE CODE IS WRONG" (new, S115).** Two reported failures this session were
  harness artifacts; a frame-by-frame trace showed the code correct from frame 0. Trace before fixing.
```js
window.step=(ms)=>{const dt=16.666;for(let e=0;e<ms;e+=dt){T+=dt;g.loop.delta=dt;g.loop.time=T;g.step(T,dt);
  for(const sc of g.scene.scenes){if(!sc.scene.isActive())continue;for(const t of sc.tweens.getTweens())t.update(dt);}}};
```

## Next Steps
1. **LOOK AT THE JOURNAL — the one thing S115 could not verify.** The Browser pane does not
   composite here, so `computer{screenshot}` times out and **no human has seen the diagrams**. Text
   and structure were verified by reading every Text object drawn; composition was not. Open the
   Browser pane, `npm run dev`, press ESC.
2. **A drop-from-pack verb** — the last dim-Take corner (carried from S114).
3. **Where the key really lives** — Daniel's call (*"make it hard to find later or make it into a quest"*).
4. **`CF-S115-SUBMODULE-STATE-SHADOW`** — an untracked `.claude/` in the submodule shadows the real
   state dir whenever cwd drifts into `Game/founding-realm/**`. Hooks are writing there. Needs an amendment.
5. **STO-1's interior** — the door opens onto darkness until someone measures it.
6. Sketchbook API is still dead code (0 callers). Wake it or delete it.
7. `bottle_empty` / `bottle_water` / `key_iron` are PROVISIONAL art, first in the redraw queue.
8. The hand-key tap still fires on RELEASE. With the hold gone, firing on press is a one-line
   change — deliberately not taken, because it is a feel change nobody asked for.

## Blockers
- **`CF-S107-KEY-EXPOSURE` — rotate the `.env` keys. Open since S107. HIGH.** Owner-only.
- **The gate's lower half: open bars or solid panel?** ONE photograph settles it.
- **Backlog #29, the film** — parked; the direction is stills, not video.
- **Dael's tutorial role** — unanswered since S110.
- The N7 is ONE TILE wide; two lanes means growing a map shared with 1601.
- Verb-menu ceiling past ~8 entries: recorded, not solved (menus cap at 4).

## Pending Backlog
- [ ] #29 — the arrival film as a frame-by-frame story (PARKED on the owner's call)
- [ ] #36 — item system: **a drop-from-pack verb is the last open piece**
- [ ] #37 — damage, fire, and what a liquid does. **RECORDED, DELIBERATELY NOT DESIGNED**
- [ ] **Character stats (new, S115): STR/DEX and item weight feeding `throwRange()`. RECORDED,
      DELIBERATELY NOT DESIGNED** — the seam exists and takes one argument it does not yet use.
- [ ] CF-S110-FILM-REROLLS — four weak shots + the gate question
- [ ] CF-S107-KEY-EXPOSURE — rotate the `.env` keys
- [ ] CF-S115-SUBMODULE-STATE-SHADOW — the shadow `.claude/` in the submodule
- [ ] Sketchbook API still dead code (0 callers)

## Recent Reflexion (S115)
- **#the-instrument-lied-in-the-comforting-direction** — a probe returned 0 listeners because it
  sampled the wrong scene, and nearly refuted a real finding. S114 said the instrument DEGRADES;
  S115 adds that it degrades toward REASSURANCE. Prove the counter can move before trusting a zero.
- **#the-quality-lens-rubber-stamped-the-riskiest-item-twice** — 5/5/5 in PLAN with no challenges,
  5/5/5/5 in CHECK with no findings, on code containing two real defects. **When a lens returns
  nothing twice on the riskiest item, treat the SILENCE as the finding.**
- **#my-own-fix-introduced-the-bug-the-suite-caught** — the de-collision fix conflated "secondary
  absent" with "secondary cleared", silently undoing a rebind on next boot. Fixing a finding is a
  code change and deserves the same suspicion as the code that caused it.
- **#four-breaks-means-the-assertion-was-never-testing-anything** — `assert(version === 5)` compared
  a constant to a literal. A test that only ever fails when you are right is an anti-test.
- **#the-owner-removes-the-ambiguity-the-council-decorates-it** — three seats converged on "active
  hand + 1/2 switches"; he asked one question at character creation instead. A Council converges on
  the most SYMMETRICAL arrangement of the parts on the table, and symmetry is not simplicity.
- **#a-race-with-the-browser-is-not-winnable-so-do-not-enter-it** — Phaser's window listener is
  registered at boot and a later one fires AFTER it, so `preventDefault` cannot win. The cure was a
  state one: drain the pending edges once the gesture resolves.
- **#compare-against-the-last-frame-not-the-first** — "has the mouse moved since aiming began" was
  true forever once it had moved, so no key could win the aim back. Any predicate containing "since"
  needs its anchor named out loud.
- **#the-test-failed-is-not-the-code-is-wrong** — two reported failures were harness artifacts; I was
  one step from "fixing" correct code. Trace first.
- **#i-stopped-when-he-had-already-said-go** — halted after P1 of an approved four-priority batch.
  Report between steps; do not stop between steps.
