═══════════════════════════════════════════════════════════
HANDOFF — Legacy of the Realm
Generated: 2026-09-08 | Session S129/S130
Focus: 12 open findings closed, then THE OUTDOORS BECAME ONE MAP
═══════════════════════════════════════════════════════════

## PROJECT
- Working dir: C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm
- Parent `main` @ ab02a85 · submodule `master` @ 71daf60 · both clean, 0 unpushed
- Stack: TypeScript + Phaser 3 + Cloudflare Worker + Neon
- 26 commits this session

## CURRENT STATE
- `npm run check` 17 guards exit 0 · `npm test` 18 suites exit 0
- MCV verify-session-claims: hard_fail=0 warn=0, 85 files, 0 UNBOUND
- LIVE: dist/main.js sha256[:16] `e8ed2e27e7b4c0c9`, byte-identical to local, carries the world
- /health 200 text/plain — but the SITE IS STILL UNWATCHED (edge 403s the probe)
- knowledge store: 72 findings (42 closed / 30 open), 19 facts, 27 resolutions, 10 decisions

## THIS SESSION'S WORK

**S129 A-K — twelve confirmed findings closed.** A 29-finding triage (53 agents, adversarial
verify) produced the list. Highlights: two guards that could not see what they guarded
(viewport-fit, scene-surface locals); `npm run dev` no longer overwrites the artifact
production ships (the WRITER moved, detection was never a fix); the brittle-assertion class
guarded at the verifier itself; deploy docs that told him to create a Pages project when the
site is a Worker; the token tool that silently read another project's transcript and reported
73.6% when this session was at 59.6%.

**The reversed-burden batch.** The triage said 7 findings were already fixed. Closing a
finding wrongly HIDES a live defect, so a second batch attacked those claims instead — and
**overturned 4 of 7**, including `npm run dev` still corrupting the bundle.

**S130 P1-P2 — continuous outdoors, and a black screen.** Removing the fade exposed that
`cam.fadeIn` ran unconditionally (his "quick one but still a fade"). The cellar black screen
was a Phaser scene instance outliving its own destroyed GameObjects: `clockText` was truthy
and dead, `showClock` threw, `create()` aborted after the fade was armed. Six sibling fields
were already reset in create() and two had been missed — so the rule moved to SHUTDOWN, where
it cannot be forgotten.

**S130 P3-P5 — ONE WORLD MAP.** He asked three times; the first two answers were smaller
questions. `src/core/world-layout.json` places the three outdoor parcels on one 41x114 plane
at MEASURED origins — the only ones under which a walkable tile meets a walkable tile along
every seam. `tools/build-world.py` composites them (re-glyphing: 8 source glyphs disagreed and
2 changed WALKABILITY). `tools/world-check.ts` is guard 17. `Outdoors` replaces three scenes
in bootOrder. `World.resolveTarget()` translates old parcel ids at the one moment they are
used, so no generated file was rewritten and no save schema was bumped.

VERIFIED BY WALKING: world y=110 -> y=1, both old seams crossed, `scenes: ["outdoors"]` at
every sample, camY stepping 18 px per tile with no jump.

## OPEN ISSUES
- **CF-S130-THE-MAP-PAGE-IS-A-POSTAGE-STAMP-NOW** (MEDIUM) — 41x114 at 1 px/tile. A real
  regression, caused by the world being taller than one screen. Fix costed in the finding.
- **CF-S130-ZONE-CARD-MUST-FOLLOW-POSITION-NOT-WARPS** (MEDIUM) — the card lost its trigger.
- **CF-S130-FORMER-SEAM-ROWS-STILL-CARRY-THEIR-BORDER-WALLS** (MEDIUM, art) — hedge line.
- **CF-S122-PRESENCE-IS-UNAUTHENTICATED** — phase 1 only; unticketed sockets are ADMITTED and
  counted. Presence is not yet authenticated and must not be described as such.
- Presence rooms are keyed per parcel; with one outdoor scene that is now ONE room for the
  whole outdoors — the interest management that made presence cheap is gone. Not yet logged
  as its own finding; do it next session or key the room on a world region.
- `reflexion_entries_to_archive` still holds **129 entries from S119-S128** that those sessions
  never flushed. S130 appended and cleared only its own 11.

## BLOCKED ON
- Owner: rotate the Cloudflare token (CF-S123) + .env keys (CF-S107). He has deferred these to
  a wider security pass — private repo, accepted.
- **Together next session, at his request: the Cloudflare WAF skip rule for /health.** He asked
  to be walked through it step by step.
- His rulings: quest-pocket letter (A/B/C frames sent); the zone-2-road wood (art call); the
  pond outline (one trace in his measure tool replaces an impossible registration).

## NEXT STEPS
1. The MAP page — bake at 5 px/tile, window it with setCrop. The world's bill, and he uses it.
2. The zone card — make it position-based.
3. The hedge line at the former seams — fix in the source parcels.
4. Walk him through the Cloudflare WAF rule (he asked).
5. `zone-2-head` once he gives a letter; it now also needs a world placement.
6. Presence: region-keyed rooms, then phase 2 of the ticket.

## CHANGED FILES
26 commits; see `git -C Game/founding-realm log --oneline 4ce59a0..HEAD`.
New this session: src/core/{World,Places,world-layout.json}, src/parcels/outdoors/,
tools/{build-world.py,world-check.ts,places.test.ts,scene-restart.test.ts}.

## SESSION PIPELINE REPORT
Priorities 21 · completed 20 · 1 blocked on owner (S129-P5 zone-2-head).
Gate 17 guards · 18 suites · MCV hard_fail=0 · deploy verified by hash.

## REFLEXION (11 entries appended, log pruned 53 -> 50)
Headlines: #answer-the-question-he-asked · #a-frame-can-be-checked-a-graph-cannot ·
#verify-the-direction-that-costs-you-most · #detection-is-not-repair ·
#a-rule-at-the-scope-of-the-incident-misses-the-class · #reproduce-before-you-theorise

## CARRY-FORWARD
1. MAP page window (fix costed) 2. Position-based zone card 3. Seam hedge rows
4. zone-2-head (his letter) 5. Presence phase 2 + region rooms 6. The 5 owner items
═══════════════════════════════════════════════════════════
