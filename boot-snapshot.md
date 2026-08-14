# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-14 | Session: S108

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it. The gate is reached when the ZONE is finished, not once per session.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Modern dressing strips; absence of footage is never filled with invention.

## HOW S108 ACTUALLY WENT — READ THIS BEFORE PLANNING ANYTHING
The batch PDR was approved and shipped in about a third of the session. **The other two
thirds were ELEVEN ROUNDS of owner corrections**, each one a screenshot with marks on it,
each one taking minutes. That is the real working mode now and it is productive — the
interior is far better for it. Plan for it: keep the generators cheap to re-run, keep
`npm run check` fast, and expect to be corrected on things you were confident about.

**He said it plainly: "dont wory about 'four room count' or where the wall is supposed to
be just do as you are told. there are some architectural nuances that you do not
understand so i will just walk you step by step."** Stop surfacing design concerns he has
already parked. Build what he marks.

## THE LESSON S108 PAID FOR REPEATEDLY
**"Correct for where it used to be."** The worn path above the cellar mouth, the attic
stair head, the tree canopy over the raised store roof, a landmark stranded inside a new
lintel, three MCV assertions — every one was drawn or written correctly for a position
something no longer occupied. **Moving a feature invalidates everything positioned
relative to it.** Guards caught the machine-checkable ones; the eye caught the rest.

## WHAT IS IN THE GAME NOW
- **BLD-1's interior is walkable.** `bld1-ground` (85 m²) and `bld1-attic` (55 m²) at 1 m/tile.
- **Three ways in:** the red front door; a HIDDEN back way (walk south into the unmarked
  roof tile at zone (8,14) from the yard — no art, you have to know); and the cellar arch.
- **The first play mechanic ships.** Enter or F, acting on the tile you FACE. Storage-house
  door → "Storage house locked - need key". Smith's door → "Door Locked - knock on door?"
  with Yes/No that deliberately do nothing.
- Zone-1 338 walkable tiles, 8 warps across 4 maps, 111 tiles, 180 claims.

## SIX BLOCKING GUARDS — `npm run check` (in `rebuild/`)
boundary · palette (8-palette GBC limit) · reach · realm (127 records) · evidence · bundle
- **bundle-check now compares `dist/art` to `src/art` BYTE FOR BYTE.** Added because the
  dev server copied art ONCE at startup: the browser held an 88-frame atlas while the
  bundle indexed 104, and the whole interior drew as black with every guard green.
- **evidence-check gained an absent-media rule**: no claim may trace to footage the project
  does not hold. 12/12 planted violations refused (`npm run test:evidence`).

## TRAPS — ALL THREE BIT AGAIN THIS SESSION
- **NEVER silence a build you are about to trust.** `python tools/build-atlas.py >/dev/null 2>&1`
  hid a NameError; every guard then passed against the atlas already on disk and I reported
  a change that was never built. MCV caught it.
- **Prefer anchored edits to index-slice edits.** A slice from "stove body" to
  "draw_att_wall" swallowed `draw_int_door_back` whole.
- **Glyph collisions, THREE times.** A dict literal keeps the LAST definition. Compute free
  glyphs from the source and print a duplicate check — never pick by eye.
- **VERIFY IN THE BROWSER.** A Python render reads the same sources the guards do.
- Maps are GENERATED — never hand-edit `map.json`. `prebuild` now runs all four generators
  (build-cellar was missing; that is the SECOND time this exact gap was found by the audit).

## NEXT STEPS
1. **Ask him what to correct next.** Eleven rounds last session; assume more. Do not guess.
2. He has said he will show where the interior walls actually belong, and the ground floor
   currently reads as three spaces (west room, main room, bathroom). Parked at his instruction.
3. Only after the interior settles: simple mechanics beyond the interact button (§13.2 step 3).

## BLOCKERS — OWNER DECISIONS
- **`CF-S107-KEY-EXPOSURE`** — ROTATE the Anthropic + GCP keys in `Game/founding-realm/.env`.
  Transcript exposure only; nothing was ever committed, verified four ways. STILL OPEN.
- **`CF-S107-PUBLIC-PAGES`** — the parent repo is PUBLIC and `deploy.yml` publishes `path:'.'`
  to GitHub Pages on every push. S108 untracked `session-summary.md` and `REVIEW-PENDING.flag`
  (a `.gitignore` line had two patterns CONCATENATED, so neither was ever ignored). The
  archives are still served. His call.
- **THE ATTIC HAS NO FOOTAGE.** `IMG_8865` has never been delivered. BOTH Council reviewers
  said, independently and over two rounds, not to build it. Built on his explicit instruction
  with every tile graded and their dissent recorded verbatim. This is the largest open risk.
- `FEA-CELLAR-LINTEL` still describes an oak lintel; the tile now draws brick on his direction.
- Still wanted: **a tape measure** (5 sessions) · `IMG_8865` · the 1783 gate plans · old
  smithy access · BLD-3's name.

## STATE AT CLOSE
- **5/5 priorities complete.** Six guards PASS · `tsc` 0 · self-test 12/12.
- **MCV: 0 hard failures, 25 files bound, 0 UNBOUND.**
- Parent `47a1e05` · submodule `4eba5fa` — both pushed, 0 ahead / 0 behind. CI green.
- Context at close: **769K / 1M (77% ORANGE)**.
- Preview server RUNNING on 20694, save cleared so it starts at the gate.

## RECENT REFLEXION (last 2 sessions)
`.claude/reflexion_log.md` — S108 (17 entries) and S107 (22) are the top two blocks.
S104 and S106 were pruned by DATE to stay under the 50-entry cap; both survive in their
archived handoffs under `.handoff-archive/`.
