═══════════════════════════════════════════════════════════
HANDOFF SUMMARY — Legacy of the Realm (Founding Realm)
Generated: 2026-09-02
Session: S125 — the 1601 map treatment, and four carried "facts" that did not survive their first probe
═══════════════════════════════════════════════════════════

## PROJECT
- Working dir: C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm
- Parent `main` @ 5406faf | Submodule `Game/founding-realm` `master` @ a434cf9 — clean, pushed, remotes agree
- Stack: TypeScript + Phaser 3 (GBC-style 320x288, 4-colour ramps), Cloudflare Worker + Durable Objects, Neon Postgres
- Live: legacyoftherealm.com — deploy is AUTOMATIC on push to master touching `rebuild/**`

## CURRENT STATE
- typecheck clean · **16 test suites** (save-migration 3,215 assertions) · **12 guards** PASS
- site PASS (20 files, nothing outside the allowlist) · knowledge 83 entries · gitleaks: no leaks
- CI green on all 4 workflows, both repos · MCV **hard_fail=0 warn=0**, 127 typed assertions, 0 unbound
- API confirmed live: `GET /api/realm/chazeuil-i/load` -> 401 `no-token`

## SESSION COST
Model routing data unavailable — statusline.pid was stale from session start (8,532,786 s), so
real-context-tokens.py had no live source. Reported as unavailable rather than estimated.
External API: Grok 1 call, Gemini 1 call (the P1 design Council). Cumulative: ~/.claude/usage-log.csv

## THIS SESSION'S WORK
**P1 — the map reads as 1601.** New `src/core/MapFrame.ts` returns the period furniture as DATA
(rects + labels, no Phaser import), so `tools/map-frame.test.ts` asserts by arithmetic over every
shipped parcel that not one rectangle or letter lands on the capture. Double rule at the page edge,
fleur-de-lys for north, legend, scale bar in TOISES. Cartouche one corner, scale the other.
A 3-way Council killed three parts of my design: metres on the bar (post-1790s, anachronistic — a
test now fails on the string), ornamented corners (Victorian pastiche, unfittable in the 4 px margin
three parcels leave), and a compass rose (mud at this size; the French convention is the lys). Both
models also advised deferring the feature — rejected, he ranked it first. Photographed at two
geometries. `zone-1-2026` correctly gets none of it.
**AND A SHIPPED DEFECT FOUND BY LOOKING:** `Journal.update()` ended in the PLAY card animation behind
a DENYLIST. SERVER (S122) and MAP (S123) were never added to it, so both drew it over themselves every
frame — and on MAP the clear erased the player marker in the same tick that drew it. Measured 13
ticks/200 ms on `map` and `server`, 0 on the guarded pages. Fixed to an allowlist; guard #8 extended
to model `update()`, whose header had described that blind spot five sessions earlier.

**P2 — `tools/save-roundtrip.test.ts` (90 assertions).** `load -> save -> load` as a fixed point at
every schema version, fields compared against a blank load rather than a maintained list. Proven
twice: the S124 line restored fails all nine versions; the same class planted in `sketchbook` passed
the 3,215-assertion suite CLEAN and failed this one everywhere.

**P3 — `tools/save-ceiling.test.ts`.** `world.dropped` is NOT unbounded: keyed by tile, one entry per
tile, and a drop onto an occupied tile is refused before it is written. 2,768 tiles / ~88 KiB worst
case — 168 KiB under the server cap, over the 64 KiB keepalive cap at 75% of the world.

**P4 — the knowledge base reconciled against the tree.** Five findings closed with evidence
(NO-HEARTBEAT, BUNDLE-INPUTS-HARDCODED, EVIDENCE-FRESHNESS-TAUTOLOGY, DIST-COMIC-UNCHECKED,
TESTS-ARE-NEVER-TYPECHECKED). SCENE-SURFACE-BLIND-SPOTS marked PARTIAL, not rounded up — its
unparseable-signature half is fixed (the guard printed "SKIPPED — paints incrementally" and exited 0
when a redraw existed that it could not parse; it now FAILS), its local-const half is not.

**P5 — `docs/S125-DOMAINE-ALTITUDE.md`.** Analysis only. 23 cadastral parcels, 345,392 m2 = 34.54 ha,
902 x 559 m. Parcel 217 computes to 1,022 m2 — the same figure S109 reached by a separate projection,
so the two agree and the anchor is sound. **The game contains 0.30% of the domaine.** Nothing invented.

**P6 (added mid-session under its own micro PDR) — my own double-count.** P3 counted `parcel001`'s 360
tiles as extra ground; its `RETIRED` field says ZONE-1 absorbed it at S106 and `build-zone1.py` splices
its rows into zone-1 at build time. Already counted. Corrected to 2,768. The test now reads each
parcel's RETIRED marker and PRINTS what it excluded. Archived S121-P1 with a table of what landed, and
logged zone 2's survey inputs.

## OPEN ISSUES
- **CF-S117-CLOSE-GATE-HANDOFF-GLOB (MED, 4th confirmation).** The shared close gate globs
  `HANDOFF_S*.md`; this project names handoffs `HANDOFF_<date>_S<N>.md`, so the real handoff is
  structurally invisible to it. WORKED AROUND AGAIN: `HANDOFF_S125.md` is a twin under the matching
  name. Shared by 8 projects — needs its own session (Rule 16).
- **CF-S122-SCENE-SURFACE-BLIND-SPOTS** — half fixed, half open (local-const surfaces).
- **CF-S109-WORLDBUILD-SYSTEM** — his own request; Council was promised and never ran. Newly relevant:
  zone 2 is exactly the work that spends screenshot round-trips.
- The staleness guard is mtime-based, so planting faults on parcel files trips it over content that is
  byte-identical to HEAD. Remedy: `npm run worldindex && npm run library && npm run explorer`.

## BLOCKED ON
**One item, thirty seconds: sign in once at legacyoftherealm.com.** It settles whether Cloudflare
Workers needs the $5/mo Paid plan — PBKDF2 100,000 iterations (~29 ms) against a 10 ms Free CPU cap,
so only login/register would fail. **NOT the Neon spend** — different vendor; Neon is done and proven.
An agent must not type a password, so it cannot be settled from here.
Everything else is PARKED by DEC-S125-3 (the Cloudflare token, the .env keys, www, the submodule
deletion, the AD03 archives). Parked is not closed; severities stand.

## NEXT STEPS (priority order)
1. **ZONE 2 — needs the whole window.** Read `rebuild/docs/S126-ZONE2-SURVEY-INPUTS.md` FIRST.
   first video LEFT=...4941 RIGHT=...4942, second LEFT=...0759 RIGHT=...0800. Getting the pair
   backwards MIRRORS the zone and looks completely coherent while doing it. Read the streams in
   PARALLEL and transcribe the audio as a primary source. Survey and propose; build nothing until he
   rules. Template: `docs/S109-SITE-TRUTH.md` ("ANALYSIS ONLY").
2. Consider **CF-S109** (click-a-tile -> coords) as the first hour of zone 2 rather than mid-way.
3. `CF-S117-MCV-PARTIAL-STATUS-HIDES-BINDINGS` — verifier false-green, shared, own session.
4. `world.dropped` breakage design — only when the item count makes it matter (DEC-S125-4).

## OWNER RULINGS THIS SESSION (do not re-litigate)
DEC-S125-1 zone by zone, NO full estate map · DEC-S125-2 the map frame is accepted "for now" ·
DEC-S125-3 the standing blockers are parked, not closed · DEC-S125-4 nothing decays (time decay
would brick the game: `key_iron` is 1 of 4 items and the storehouse is `opensWith: key_iron`) ·
DEC-S125-5 the zone-2 survey inputs.

## CHANGED FILES (submodule)
 src/core/MapFrame.ts 402++ (new) · tools/map-frame.test.ts 243++ (new)
 tools/save-roundtrip.test.ts 232++ (new) · tools/save-ceiling.test.ts ~180++ (new)
 docs/S125-DOMAINE-ALTITUDE.md 118++ (new) · docs/S126-ZONE2-SURVEY-INPUTS.md 85++ (new)
 src/core/Journal.ts ~90+- · tools/scene-surface-check.ts ~95+-
 src/core/Minimap.ts · tools/build-minimaps.py · src/art/minimaps.json · package.json
 knowledge/{findings,resolutions,facts,decisions}.json · src/art/world-index.json · docs/*.html

## SESSION PIPELINE REPORT
Pipeline: Session PDCA v2 | **6/6 complete** | MCV hard_fail=0 | 127 assertions, 0 unbound
- P1 the 1601 map frame + the animation leak — completed — 2f4956b / 0abcba0
- P2 the round-trip property — completed — e9bce8e / 99366a1
- P3 the measured save ceiling — completed — 16a5208 / 270d171
- P4 the knowledge base reconciled — completed — 0836b07 / 0e25688
- P5 the domaine altitude, measured — completed — 6e774ae / 2e49ace
- P6 the double-count + two stale docs — completed — a434cf9 / 5406faf

## REFLEXION ENTRIES (this session)
- P0 #denylist-rots-allowlist-does-not · P1 #test-the-class-not-the-bug
- P2 #a-truncated-grep-is-a-lying-input · P3 #verify-the-close-not-the-claim
- P4 #the-carried-blocker-was-never-probed · P5 #discovery-without-comprehension
- SESSION #prose-is-not-a-verification-array — five priorities recorded as narrative with zero typed
  assertions; the Stop gate blocked at hard_fail=10, and the assertions I then wrote caught four
  things reading had not, including my own comment quoting the line it was meant to forbid.

## CARRY-FORWARD PRIORITIES
None incomplete. Zone 2 is next session's work, not a carry-forward — its inputs arrive with him.

═══════════════════════════════════════════════════════════
