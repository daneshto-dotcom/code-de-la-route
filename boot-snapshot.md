# Boot Snapshot (auto-generated at handoff)
Generated: 2026-09-04 | Session: S128 | submodule 7f2b917 | clean, pushed, LIVE

## READ THIS FIRST
**THE POND IS BUILT, WALKABLE AND LIVE.** `zone-2-pond` (29×38 at 2 m = 58×76 m, 509 walkable
tiles) ships in the bundle serving legacyoftherealm.com, reachable on foot from `zone-2-road`,
with a minimap at 5 px/tile — the same legibility zone-1 ships, which is the prediction
`DEC-S127-GRID` rested on. Two of zone 2's three parcels are now walkable.

  Game/founding-realm/rebuild/tools/build-zone2.py     paint_pond — the map source
  Game/founding-realm/rebuild/tools/build-atlas.py     the five pond tiles, at the END of the list
  HANDOFF_2026_09_04_S128.md                           the full story

## Next Steps
1. **`zone-2-head` (20×33) — the last parcel of zone 2.** Its ART IS ALREADY DRAWN: the five
   pond tiles cover the shallow inflow, the dam and the little fishery. It needs ONE ruling,
   his, open since S127 — is the quest pocket inside the polygon he traced? Three frames were
   sent; he asked *"which pocket?"*. The perimeter budget says NO: 28 m of spare boundary
   against the 40–60 m a finger to the wall and back would cost. When it lands, open
   `zone-2-pond`'s row-0 hedge lid at cols 2–3 and add the warp pair — the same operation S128
   performed on `zone-2-road`, and **the border guard will hold you to it**.
2. **`CF-S128-LUT-COLLISION-DROUGHT-FOLIAGE-DRY` — a LIVE shipping bug, and an ART call.**
   `#2B2D23` is DROUGHT[3] *and* FOLIAGE_DRY[2] with different night inks; the LUT is keyed on
   the day colour and written last-write-wins, so DROUGHT's darkest ink renders as
   FOLIAGE_DRY's after dark. The shared day ink is DELIBERATE — era twins, 0.00 on purpose — so
   this is his call, not a repair: accept one night ink, or un-share the day colour. Excused by
   name in `KNOWN_LUT_COLLISIONS` meanwhile, and R11 fails if a listed collision stops colliding.
3. **`CF-S128-EDGE-BLOCKS-THE-MONITOR` — the site is live and STILL unwatched.** `/health` was
   built this session and answers 200 correctly, but Cloudflare refuses the probe with **403**
   from GitHub Actions runner IPs, so it never reaches the Worker. I verified `/health` from
   this machine — a residential IP the edge does not challenge — and armed a schedule that runs
   from a datacenter range it does. It opened a false outage issue on a healthy site; the
   schedule is re-parked and the issue is closed with the diagnosis. **Needs a Cloudflare WAF
   skip rule for `/health` (dashboard, so his), then a manual run to confirm, then re-arm.**
4. **`CF-S122-PRESENCE-IS-UNAUTHENTICATED`** — MEDIUM-HIGH, live in production, untouched by
   S128. The presence WebSocket accepts anyone; no session token is checked.
5. **`CF-S127-HARVEST-UNVERIFIED`** — 40 candidates from five agents across S110–S126,
   including corrections to entries that are actively WRONG. All 30 verifiers were killed by a
   spend limit. Replays from cache.
6. Two cheap improvements, both recorded: `CF-S128-ARBORETUM-IS-PLANTED-BY-ARITHMETIC` (the
   trees are a modulo lattice, and he ruled "scenery with **good variety**") and
   `CF-S128-POND-SHAPE-IS-INVENTED-WITHIN-A-MEASURED-FRAME` (the outline is authored inside a
   measured frame — needs the satellite registration, not a ruling).

## Blockers
- **`zone-2-head`** — his ruling on the quest pocket. Everything else in zone 2 is art.
- `CF-S107-KEY-EXPOSURE` (HIGH, since S107) and `CF-S123-CF-TOKEN-EXPOSED-IN-TRANSCRIPT`
  (HIGH) — rotation, owner only, neither has moved.
- `CF-S115-SUBMODULE-STATE-SHADOW` (HIGH) — needs his go.

## THE GATE IS NOW 16 GUARDS, NOT 14
S128 added two, and moved rules that had never run in a build:
- **`check:atlas`** — the sheet holds its own tiles, in BOTH directions. An *over*-sized sheet
  is silent: palette-check skips empty regions while tile-library and provenance-report size
  their pages off `atlas.rows`.
- **`check:night-palette`** — R6–R12, extracted from `night.test.ts`, which runs under
  `npm test` only. Until S128 **no colour-distance rule in this repo ran in the build at all**,
  and `palette-check.ts` has never contained one — every threshold in it is a cardinality.
- **`reach-check` gained the border audit** (`CF-S127-NO-GUARD-ON-WALKABLE-BORDER`, closed).
  Containment is not connectivity: a hole at the map edge is perfectly REACHABLE, so the flood
  fill structurally cannot see it.

## BEFORE SIZING ANY PARCEL — three budgets now
- A scrolling parcel needs **≥ 20 cols AND ≥ 18 rows**, or it shows sky (`ParcelScene:624`, an AND).
- **≤ 42 rows** to keep zone-1's 5 px/tile MAP page.
- The atlas sheet grows automatically, but `tile()` is **FROZEN** once it is sized — register
  new tiles ABOVE the `rows = ...` line in `build()` or it raises by name.

## LAST STEP OF BOOT — ASK THE DATABASE BEFORE YOU START (his instruction, S127)
  cd Game/founding-realm/rebuild && npm run know -- <your task terms>
**110 entries** + 169 realm records. It paid three times in S128: the border guard's two
required refinements came out of the finding verbatim; the duckweed observation gave the water
palette its three measured hexes; and `OBS-S126-GREEN-BAND-IS-THE-WATERLINE` is why the herb
margin traces the shore instead of being a straight column.

## Rules S128 paid for
A PLANT-THE-FAULT RUN THAT REPORTS PASS TELLS YOU NOTHING unless the fault you planted is the
one the guard is for — two of my first four plants reported MISSED and both were the TEST.
A DISTANCE TO A NEIGHBOUR IS NOT A NUMBER, IT IS A MINIMUM OVER PAIRS. A TEXTURE IS NOT A
DRAWING — anything you can name in a tile becomes a pattern once it repeats; draw grain, not
objects, and a uniform scatter is not organic. WHEN A GATE GOES RED AT CLOSE, SORT THE FAILURES
BY WHY FIRST — ten hard failures, not one of them false when written. WHEN YOU ARM AN ALARM,
VERIFY THE MECHANISM YOU RELY ON, while the evidence still says failure. And the shell has
MIXED LINE ENDINGS: git stores LF, autocrlf expands to CRLF, so multi-line anchors written with
\n do not match on disk — normalise to LF, patch, write LF.

## Gate at close
`npm run check` **16 guards** · `npm test` 16 suites · `npm run check:site` · MCV
`hard_fail=0 warn=0` (45 files, 0 UNBOUND). All exit 0.
Deploy is AUTOMATIC on push to `master` touching `rebuild/**`, and it ships the assets **and**
the Worker (`npx wrangler@4 deploy`) — ~2.5 min push-to-live, measured.
Verify by HASHING the live bundle: `e8ff7dbc21955e5d`, byte-identical, contains `zone-2-pond`.
`/health` returns **200** and is correct — but the site is **STILL NOT WATCHED**. The monitor's
probe is refused by Cloudflare's edge with **403** from GitHub Actions runner IPs, so the
schedule was re-parked and the false outage issue closed. See `CF-S128-EDGE-BLOCKS-THE-MONITOR`
— it needs a WAF skip rule for `/health`, which is dashboard access and therefore his.
