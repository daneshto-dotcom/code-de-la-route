# S125 BATCH PDR — Full tier
Session: S125 | Status: APPROVED BY OWNER (pre-approved, autonomous run)
Parent at open: 00150e0 | submodule 7644461 | working tree clean

## APPROVAL PROVENANCE (verbatim, in chat, this session)
> "i actually need to go so i pre-approve the pdr and will answer all the
> questions when i get back ... Do everything that you know is already in
> priority backlog/project roadmap as well as anything you added to top
> priorities/carry-forwards in the previous sessions that we already know needs
> to be done. Autonomous run and full session top priority batch APPROVED!"

Also, from the same session, before he left:
> "Present full current top priority batch pdr after full methodical and
> complete session boot. any questions you have for me, or need my ruling,
> directions or approvals for anything ask when you present the pdr."

So: the batch below is approved; the QUESTIONS are collected in this file and in
the closing summary rather than blocking, and no priority whose correctness
depends on an unanswered ruling is executed. `DO NOT close the session.`

## OBJECTIVE
Ship the owner's rank-1 visible item (the map reads as 1601), then close the
class of defect that erased every player's progress in S123 - not the instance,
which S124 already fixed, but the CLASS - and clear the known, unblocked
carry-forwards. Fabricate nothing that needs his ruling; write the ruling down
instead.

## A.0 STATE-DISCOVERY (Rule 21) - every claim probed at boot, not assumed
| # | Claim carried in from the handoff | Verdict | Evidence |
|---|---|---|---|
| 1 | Working tree clean, S124 pushed | CONFIRMED | `git status` empty at 00150e0 |
| 2 | Typecheck green | CONFIRMED | `tsc --noEmit` clean, 0 errors |
| 3 | 13 test suites green | CONFIRMED | `npm test` ran to `journal-strip: PASS` |
| 4 | 12 guards green | **REFUTED** | `npm run check` -> **bundle guard FAIL** |
| 5 | CI green | CONFIRMED | both repos, 4 workflows, ok 3d ago |
| 6 | "no save test loads twice" | **REFUTED** | save-migration.test.ts:1465-1475 DOES round-trip - S124 added it with the fix. One field, one version. The GAP is that it is not systematic. |
| 7 | S121 autosync still unbuilt | **REFUTED** | `src/core/AutoSync.ts` exists; `test:autosync` in the suite. The plan's P2 landed. |
| 8 | CF-S122-NO-HEARTBEAT open | CONFIRMED | zero hits for `setWebSocketAutoResponse` in `deploy/` or `src/` |
| 9 | `world.dropped` has no decay | CONFIRMED | zero hits for `decay` in SaveStore.ts |
| 10 | Scale data for a map scale bar exists | CONFIRMED | every `map.json` carries `screen.metresPerTile` (zone1 = 2, interiors = 1) |
| 11 | The 1601 palette can ship without a new colour | CONFIRMED | declared UI ramp is already parchment/iron-gall: `#F5ECD9 #D8C7A4 #6B5A45 #221C16` (src/palette.ts:289) vs the archive's measured `#DCC9AB` / `#41382E` |
| 12 | Migration branches 1..8 all present | CONFIRMED | eight `if (version === N)` branches, current = 9 |
| 13 | KB entry CF-S122-BUNDLE-INPUTS-HARDCODED still OPEN | **REFUTED** | S123 fixed it via esbuild `metafile` (RES-S123-GUARD-LYING-INPUT). The KB is stale and `know` is the boot tool. |
| 14 | A domaine altitude is buildable | **REFUTED - see P5** | five parcel dirs exist but they are ONE piece of ground plus one building's three floors. There is no second surveyed zone to put a second dot on. |

### DELTA-1 (found at boot, fixed first): the local bundle is stale.
`bundle guard: FAIL - src/core/SaveStore.ts is 361s newer than the bundle`.
`dist/` is gitignored, and CI rebuilds from source on push, so **production is
correct** - the S124 close verified the live bundle carries the repair, and
ci:status is green. The damage is local only, and it is exactly the trap the
handoff names: any artifact I verify this session against `dist/` would be a
lie. Rebuilt before anything else, and re-verified after.

## CURRENT STATE
- The MAP tab shipped in S123 and is deliberately unstyled. `Journal.drawMapPage`
  draws a title, a 1px hairline `strokeRect`, the baked capture, and two footer
  lines. The owner's words: "we will later make it look more ancient." He
  rejected four stylised proposals because they redrew the capture as an
  illustration. The capture itself is `tools/build-minimaps.py` output, a NEAREST
  downscale of the real render at a WHOLE number of pixels per tile.
- The save layer was silently resetting every player until S124. The instance is
  fixed and covered. The class - a derived or default value spread over a stored
  one, invisible until the SECOND load - has no systematic net under it.
- Presence: an idle socket reaped by an intermediary clears the entire peer map
  and everyone reappears under new connection ids. Reads as a teleport.
- The knowledge base (`npm run know`) is the documented first stop before
  spending an hour on anything, and it currently reports at least one resolved
  finding as OPEN.

## SCOPE (5 priorities)

### P1 - THE MAP LOOKS 1601 (owner rank 1, VISIBLE)
Style the FRAME, never the capture. New `src/core/MapFrame.ts` holding pure,
testable layout functions plus the draw calls; `Journal.drawMapPage` calls them.
  1. A drawn border with corner pieces, in the declared UI ramp, outside the
     capture's rect - the capture's origin and pixel size are UNCHANGED, because
     `mapOrigin` feeds the marker arithmetic and moving it moves the player.
  2. A cartouche carrying the parcel's own title, read from the manifest as
     today, so a second spelling of the place cannot appear.
  3. A compass rose - north is up, which is what `build-minimaps.py` bakes.
  4. A scale bar in TOISES and metres, computed from `screen.metresPerTile`.
     A toise is 1.949 m; it is the unit a 1601 estate would be measured in and
     the archive's own plates use it. Never invented: the metres come from the
     parcel data, the toise conversion is a documented constant.
  5. The page stays honest in its two failure states (no map / would not load).
LAW: the capture is blitted unmodified. No tint, no overlay, no filter, no
scaling. If the frame cannot fit around it inside the page body, the FRAME
gives way, not the map.

### P2 - THE SAVE LAYER CANNOT SILENTLY RESET YOU AGAIN (the CLASS, not the bug)
  1. **Idempotence property test.** For every schema version 1..9 and for a
     populated fixture, assert `migrate(migrate(x))` deep-equals `migrate(x)`.
     This is the generic form of the S124 bug: the first load was right and the
     second was not. It would have caught it with no knowledge of `progress`.
  2. **Round-trip-through-storage property test.** save -> read back -> save ->
     read back, asserting every top-level field survives BOTH loads, for every
     version. "A round trip is not a load" - so this does two.
  3. **Branch-completeness guard.** Assert every version in 1..CURRENT-1 has a
     `version === N` branch that returns a NON-fresh save for a populated input.
     The chain's own comments record that a missing branch has already shipped
     once and is silent total data loss.
  4. **Audit every `coerce*` for the same class** - a default overwriting a
     stored value - and record the result, defect or clean, in the KB.
  5. PLANT THE FAULT: each new test is shown to FAIL against a deliberately
     reintroduced defect before it is accepted. A guard never shown red proves
     nothing.

### P3 - THE ROOM STOPS FLICKERING (CF-S122-NO-HEARTBEAT)
A standing player sends nothing. When an intermediary reaps the idle socket,
`onclose` clears the ENTIRE peer map; on reconnect the Durable Object mints a
NEW connection id, so everyone reappears under new ids and any open click-sheet
closes. Fix: Cloudflare's `setWebSocketAutoResponse` ping/pong so an idle socket
is never idle on the wire, applied to both the parcel room and the lobby.
Verified by test, and the no-locations guarantee is re-asserted afterwards.

### P4 - THE KNOWLEDGE BASE STOPS LYING
`npm run know` is the documented first stop, and it reports at least one finding
as OPEN that S123 closed. Reconcile every OPEN entry against the tree, close what
is fixed with its resolving commit, and add this session's findings. The KB is
only worth the trust it earns on the first wrong answer.

### P5 - THE DOMAINE ALTITUDE: THE REAL BLOCKER, WRITTEN DOWN (no art, no data invented)
His ask had two altitudes and only the parcel shipped. Every prior write-up says
the blocker is "no inter-parcel layout has been authored". Probing it at boot
says something else and worse: **there is only one piece of ground.** zone1 and
zone1_2026 are the same 28x38 parcel in two centuries; bld1ground / bld1cellar /
bld1attic are three floors of one building standing in it. A domaine map today
would carry exactly one dot. Authoring "parcel origins in a metre frame" cannot
be done for parcels that do not exist, and inventing where the other zones of a
real 35-hectare estate sit is precisely the failure this project has a standing
rule against. So P5 ships the survey, the recommendation and the question - and
no geometry. See QUESTIONS Q1.

## NO CHANGES TO
- `tools/build-minimaps.py` and the captures it bakes. The map picture is not
  touched by any part of this batch.
- The declared palettes in `src/palette.ts`. P1 uses the existing UI ramp; a new
  colour would fail the palette guard and would be a design decision, not a
  frame.
- `docs/estate-archive/**` - reference only. Nothing there ships (guard #9).
- Save schema version. Nothing in P2 changes what is stored; it only proves what
  is stored survives being read.
- `world.dropped` behaviour. A decay policy deletes players' items and needs his
  ruling. See QUESTIONS Q2.
- Anything on the BLOCKED ON HIM list: the Cloudflare token, the .env keys, the
  www redirect, the submodule deletion, the AD03 archives.

## RISK ASSESSMENT
| Risk | Mitigation |
|---|---|
| The frame moves the capture, so the marker points at the wrong tile | `mapOrigin` and `meta.w/h` are asserted unchanged by test; the marker arithmetic is already pure and covered |
| The frame is another stylisation he rejects | It is drawn strictly AROUND the capture in the existing ramp; the capture is byte-identical. Reversible in one commit, and screenshotted for his verdict |
| The Journal tab strip or page body cannot take the extra chrome | `journal-strip` test is part of the gate and already models the shipped layout; the frame yields to the map if space is short |
| Drawing on the wrong Journal surface re-opens the two-session `anim`-cleared bug | Frame is CHROME (drawn on redraw), marker stays on `anim`. Stated in the file header and asserted |
| A property test that passes vacuously | Every new assertion is shown FAILING against a planted defect first |
| Heartbeat changes break presence | `test:presence` (279 assertions) is the net; the no-locations structural guarantee is re-asserted |

## TESTING PLAN
Per priority: typecheck, the suite, the 12 guards, and a PLANTED FAULT for every
new assertion. Session gate before close: `npm run typecheck` and `npm test` and
`npm run check` and `npm run ci:status` and `npm run site` and
`npm run scan:secrets` and `npm run know`. The bundle is rebuilt FIRST so every
artifact claim afterwards is made against the real artifact, and re-verified at
the end with the dev server stopped.
P1 additionally: a captured PNG of the framed page, produced headlessly through
the capture bridge, so he can look at it rather than read about it.

## TOOL TRIAGE
- Visual output needed? **YES** - P1 is a visual change and must be seen, not
  described. Produced by the project's own capture bridge against the real
  build, not by an image model. Generating art here would be the exact
  substitution he rejected four times.
- Research / external data? **NO** - the estate archive, the site truth doc and
  the knowledge base were all opened in S123/S124 and hold what P1 needs. The
  standing rule is to check what we already have before commissioning research.
- Artifact delivery needed? **NO** - the deliverable is the running game plus a
  handoff in the repo. A closing summary is written into the session for him.

DIFFERENTIAL_TEST_REQUIRED: **false** - no `lib/`, no `hooks/`, no router, no
LLM-prompt construction, and no schema migration is authored. P2 tests the
existing migration chain without changing it.

HOT_PATH_REFACTOR: **false** - same scope reasoning. P2 is additive test
coverage over an unchanged chain; P3 is a transport keepalive behind an existing
tested surface.

ESTIMATED TOKENS: ~90K across five priorities (Full tier).
MODEL: strongest pinned.

## QUESTIONS FOR THE OWNER (answer when back; nothing waits on them)
**Q1 - The domaine altitude.** You asked for two altitudes: the parcel, and the
whole domaine with a dot per zone. The parcel shipped. The second one has no
content yet - the game contains ONE piece of ground (the entrance parcel, in two
centuries) plus the guardian's house on it. A domaine map today shows one dot.
Which do you want:
  (a) Build the domaine view now anyway, as a period estate plan of the real
      35 ha with the built zone marked and the rest shown as surveyed-but-empty
      ground. Honest, and it makes the scale of the project visible.
  (b) Wait until a second zone is built, and spend this effort on building it.
  (c) Tell me the layout - which zones exist and roughly where - and I will
      author the metre frame from your description plus the cadastre.
My recommendation is (c) then (a): the estate is real and you know it; ten
minutes of you naming the zones unblocks a year of map work.

**Q2 - Dropped items and decay.** `world.dropped` grows forever and nothing ever
removes an entry. Every long-lived world game solved this with decay. Any policy
I choose deletes something a player left on the ground, so I have not chosen
one. Options: (a) items dropped by a player vanish after N realm-days, (b) a cap
per parcel with oldest-first eviction, (c) nothing decays, ever, and the estate
slowly fills with pots. What is the rule?

**Q3 - The map's frame.** P1 gives you a frame, a cartouche, a compass and a
scale bar in toises, around an untouched capture. If any of it reads as
"drawing of the place" rather than "the place", say which part and it comes off.

**Q4 - Still blocked on you** (unchanged, listed so they do not go quiet):
rotate the exposed Cloudflare token (CF-S123, HIGH); rotate the .env keys
(CF-S107, HIGH, open since S107); the one zone Redirect Rule for www; the
submodule deletion go-ahead (CF-S115); the AD03 archive session, which needs a
human with a browser; and one human action - log in at legacyoftherealm.com and
press M - so the map can finally be photographed running.

## GATE
APPROVED BY OWNER IN CHAT, VERBATIM ABOVE. Executing autonomously.
Session stays OPEN by his instruction.
