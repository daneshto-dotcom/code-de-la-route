# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-14 | Session: S107

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it every session. The gate is reached when the ZONE is finished, not once per session (his S106 ruling). An unfinished zone is in progress, not a miss.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** S106 drew a tunnel because the cellar's far end is never lit — a fact about the CAMERA turned into architecture. S107 deleted that tile.

## THE ONE LESSON S107 PAID FOR TWICE
**The database already contained THREE of his four layout corrections, in plain prose.** `OBS-BOUNDARY-WALL` said the wall runs "between the grass field and the smithy"; `FEA-GRASS-FIELD` said the field is "MOWN and OPEN — usable ground"; `OBS-ROAD-BOUNDARY` said the frontage is a plinth "carrying a pale wrought-iron railing with spear finials". The build contradicted all three because the fills were authored before the records existed and never revisited.
**Before laying out any region, read every record that names it and check the layout against the SENTENCES, not just the coordinates.**

## SIX BLOCKING GUARDS — `npm run check` (in `rebuild/`)
boundary · palette (8-palette GBC limit) · reach (flood-fill playability) · realm (schema + provenance) · **evidence (S107)** · **bundle (S107)**
- **evidence-check** — every tile declares what it derives from; `tile()` takes claims as a REQUIRED parameter, so "forgot to annotate" is not a possible state. Proven to block on 11 planted violations (`npm run test:evidence`).
- **bundle-check** — fails when `dist/main.js` is older than the atlas/maps/palette. Added because S107 shipped a scrambled zone: tile indices are POSITIONAL, so inserting one tile renumbered everything after it while five guards stayed green.

## VERIFY IN THE BROWSER, NOT IN A RENDER
S107's worst moment: rebuilt everything, ran green guards, sent Daniel a Python-rendered PNG as proof, never loaded the game. He opened a scrambled zone. **A render comes from the same sources the guards check — it can only confirm what they already said.** Proof must come from the surface he actually looks at.

## WHERE THE WORK IS
`npm run dev` in `Game/founding-realm/rebuild` (launch config `rebuild`, port 20694). Scenes: `zone-1` (28×32 scrolling) and `bld1-cellar`. Walk through the main gate; the brick arch behind the house goes underground.

## ZONE-1 AS IT NOW STANDS (all four S107 corrections applied)
- **house | FIELD | WALL | smithy** — the 553 m² field is OPEN and walkable; the smithy sits beyond the wall and is NOT part of the guardian's court.
- **The guardian's garden**, 5×3 metatiles = 60 m², immediately inside the little gate, no walls around it, its gate up beside the house.
- **The road frontage is a railing** on a low rubble plinth, not a solid wall — new `road_railing` tile, costing no palette slot (plinth STONE / bars RENDER per 8×8 quadrant).
- Walkable ground **1340 m²**, 22 landmarks, 84 tiles, 132 claims.

## NEXT STEPS
1. **Ask him what to correct next.** Four corrections came in two rounds this session; assume more. Do not guess.
2. **Then the interiors (§13.2 step 2)** — BLD-1's ground floor is FOUR rooms (`OBS-S106-BLD1-ROOMS`; today's three is modern demolition), one shared chimney, attic, bathroom. Frames f_036–f_041, f_040 chimneypiece, f_045 bathroom. **The smithy interior stays CLOSED (§11.3).**
3. **Then simple mechanics (§13.2 step 3)** — not before.

## BLOCKERS — OWNER DECISIONS (8 carry-forwards, none are defects)
- **`CF-S107-KEY-EXPOSURE`** — ROTATE the Anthropic + GCP keys in `Game/founding-realm/.env`. They were printed into the S107 transcript by a `gitleaks --no-git` run without `--redact`. **Nothing was ever committed** — verified four ways (`.env` never tracked, no real-length key in any commit, gitleaks clean over 484+290 commits).
- **`CF-S107-PUBLIC-PAGES`** — the parent repo is PUBLIC and `deploy.yml` publishes `path:'.'` to GitHub Pages on every push, serving `.handoff-archive/` and `.claude/`. `ACTIVE_PLAN §8` records the site as "fully offline" and never mentions Pages. `CREDENTIALS.md` is gitignored and NOT served.
- **`CF-S107-IRON-PALETTE-REFUTED`** — the IRON palette is anchored on the DARK gate reading; `MAT-IRON-RAILING` says `#918C83` pale grey-green and calls the dark readings refuted. Would visibly change the gate. OFFER only.
- **`CF-S107-PALETTE-BACKFILL`** — 9 of 11 palettes have empty `derivedFrom`, so the colour check cannot reach them. The S104 photo-pass hexes live only as prose in `palette.ts`.
- **`CF-S107-RECORD-GAPS`** — the gate postern and the smith's door have no record; enumerated in `KNOWN_RECORD_GAPS`. The list must shrink, never grow.
- **`CF-S107-OBSERVED-GRADE`** — 88 of 132 claims are `observed`, which asserts little. Grok's fix (require the most specific leaf record) is mechanisable.
- **`CF-S106-FRONTAGE-WALL`** — partly resolved by the railing; the tall-rendered-wall reading may apply to a different stretch.
- **`CF-S106-OFFERED-NOT-BUILT`** — well · mounting block · wheel-guard stones · bread oven · cement water tank · chimney smoke · redrawing the gate from the real 1783 ironwork.

## STILL WANTED FROM DANIEL
A tape measure (cellar vault, oak lintel, 2.1 m wall, storage houses are ALL estimates — four sessions running) · the old smithy access (behind bamboo in every frame) · `IMG_8865` · **the 1783 gate plans** · BLD-3's name and number · more videos, promised.

## TRAPS — DO NOT REPEAT
- **Never `git add -A` here.** S107 did, and swept transient `.claude/session-state.json.tmp.*` lock artifacts into BOTH repos — the public one included. Untracked and gitignored now, but stage explicit paths.
- **A control that cannot fail is not a test.** Three times in S107: a synthetic `sk-ant` key tested against a `^claude-` regex; AWS's canonical `EXAMPLE` keys, which gitleaks stopwords by design; a `^[0-9]+$` regex written for an advisory NUMBER when the captured secret was the dotted KEY PATH. State what result would prove the thing BROKEN before running it.
- **Read what the tool captured, not what you assume it captured.**
- **Legend glyphs collide silently** — a dict literal overwrites. S107's railing used `"T"`, already `grass_tall`; the splice assertion caught it.
- **Populate `verification[]` in the SAME edit that sets `status: completed`.** MCV hard-failed at S107 close with three empty arrays despite S106 having discovered that exact mechanism.
- **Maps are GENERATED** — `tools/build-zone1.py` / `build-cellar.py` are the source. Never hand-edit `map.json`.
- Session state lives in the PROJECT ROOT `.claude/`. Python file IO always `encoding='utf-8'`.

## STATE AT CLOSE
- **5/5 priorities complete.** Six guards PASS, `tsc` 0, evidence self-test 11/11.
- **MCV: 33 assertions, 0 UNBOUND, hard_fail=0, exit 0.**
- Both repos **0 ahead / 0 behind**; parent `9ee7f52`, submodule `cff52d0`.
- Context at close: **~630K / 1M (63% YELLOW)**.
- Preview server left RUNNING on 20694.

## RECENT REFLEXION (last 2 sessions)
See `.claude/reflexion_log.md` — S107 (21 entries) and S106 (12) are the top two blocks, newest-first. S106's block was recovered during this handoff: it had been hand-appended to the bottom of the file, so a position-based prune removed it. The prune is now by DATE, not position.
