# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-12 | Session: S105

## READ THIS FIRST — THE WORKING AGREEMENT (constitutional, §11.0)
**Daniel directs every step of this build.** Execute his instruction as given,
matching what he said and how he said it. You MAY offer archived assets (the 10
prebuilt NPCs + their TTS voices, story chains, items, systems) when a stage
calls for them — **but NEVER add them without his explicit go.** Offering is not
permission. Creativity serves his instruction; it does not redirect it.

## SECOND — THE DATABASE IS NOW THE SOURCE OF TRUTH
`Game/founding-realm/rebuild/realm/` holds every fact the game depends on, in
five layers that each cite the one below (media → observation → entity →
decision → artifact). **If a fact is not in there, it is not real.**
- `npm run realm:why <ID>` walks any fact down to a video file and a timestamp.
- `npm run check` blocks the build on schema, referential integrity, layer
  ordering, mandatory geometry, and any `measured` claim that cites no frame.
- Doctrine: `rebuild/realm/README.md`. Survey: `rebuild/docs/SITE-SURVEY-zone1.md`.

**Numbering is ours now (Daniel, S105).** `ZONE-1` the starting zone, `BLD-1` the
guardian's house, `BLD-2` the smithy. The old `#13/#5/#41/#38/#32` are DROPPED.
`BLD-3` (the pavilion) is a placeholder and **needs Daniel's name and number**.

## Next Steps
1. **Confirm the PENDING close-chain commit + push** — see Blockers. Gitleaks is
   already run and clean.
2. **Await Daniel's instruction.** His stated forecourt sequence (§11.6): skin it
   as **2026** → **guardsman NPC** on the RIGHT of the gate → **class
   conversation** → **cinematic** → the 1601 swap.
3. **Ask him three things:** what `BLD-3` is and its number; the **original 1783
   gate plans**; and a **tape measure** for the cellar vault, its oak lintel and
   the 2.1 m boundary wall (all three are currently estimates).
4. **Redraw the gate on his go.** `FEA-GATE-MAIN` holds the full form description
   and both positions — shut and open — so it can be animated from evidence.
5. Parcel-002 (the bell) is still `← NEXT` in §7, but §11/§12 may re-order the
   roadmap. **Daniel decides — do not assume.**

## Blockers
- **A close-chain commit is PENDING operator confirmation** (GOV-28 human-gates
  it). Uncommitted: `.claude/session-state.json`, `.claude/verify-watch-roots.json`,
  `rebuild/docs/SITE-SURVEY-zone1.md`, `rebuild/tools/realm-check.ts`,
  `HANDOFF_2026_08_12_S105.md`, this file.
- **The old smithy access is in NONE of the seven videos** — Daniel is sending
  that footage separately. Do not infer it.
- `IMG_8865` missing from the sequence 8861→8864, gap, 8866→8867.
- Long-standing, still open: `REAL_FESTIVAL_DATE` (§9.10 RISK-1) and whether any
  mail comes from Cloudflare.

## Pending Backlog
- 4 materials + `BLD-3` carry `needs_resample: true` (the brick cornice and the
  cellar's brick arch both landed on shadow or whitewash; the vault plaster is
  torch-lit; the cement floor; BLD-3's footprint is estimated).
- The gate anachronism is **flagged once and CLOSED as owner-directed**
  (`DEC-GATE-1783`). Both Council models called 1783-in-1601 a real error; the
  dissent and the defensible alternative are recorded. **Do not re-raise.**
- `palette.ts` deliberately untouched — measured colour has exactly one home.
- Stale `.claude/session-state.json.lockdir.zombie.*` dirs in both repos.
  Gitignored and harmless; the destructive-command guardrail blocks automated
  removal, correctly.

## Traps this session fell into — do not repeat
- **Write session state to the PROJECT ROOT `.claude/session-state.json`.** The
  submodule has its own copy which the hooks and MCV do NOT read. S105 wrote the
  PDR gate to the wrong one and only the MCV stop hook caught it.
- **Pass `encoding='utf-8'` explicitly to python file IO.** A maintenance script
  read the new record files as cp1252 and mojibaked every em-dash minutes after
  they were authored.
- **Hand CHECK reviewers the source file, not a prose summary.** 3 of 5 defects
  reported this session were artefacts of the summary, not real holes.

## Recent Reflexion (last 2 sessions)

## 2026-08-12 — Session S105: the 7 videos mined, the realm database built, and the corrections driven into the world

- P1 #pattern-draw-the-box-dont-infer-it — Three palette passes produced confident nonsense — dark-green 'painted iron', blue 'roof tile', dark-green 'sunlit grass' — because I inferred crop coordinates from a downscaled overview and was ~5% off vertically. Reading the numbers taught me nothing; the swatch always looked like *a* colour. The fix was to DRAW the sample rectangle onto the source frame and look at it. The offset was obvious in one glance. S104 learned 'verify the crop, not just the cluster'; this is the same lesson one level deeper — verify the crop's POSITION, visually, on the image, not by re-deriving the arithmetic.

- P1 #pattern-dominant-returns-the-background-for-thin-things — k-means 'dominant cluster' is wrong by construction for thin elements. Between the bars of an iron railing, most pixels are the dark foliage BEHIND the railing, so the dominant colour of a correctly-placed crop was still not the railing. Painted iron came out #253021, a dark green. Materials need a per-material pick strategy — lightest cluster for thin bright elements, warmest for brick against mortar, darkest for beams against plaster — not one global rule.

- P1 #pattern-backlight-is-not-colour-evidence — I read the gate's ironwork as black, then as white, then finally as pale grey-green. The first two came from the backlit clip where the gate is pure silhouette. A silhouette carries PROFILE information at high confidence and COLOUR information at none, and I was treating one clip as authoritative for both. Front-lit media is the arbiter for colour; the record now names which clip settles which property.

- P2 #pattern-a-guard-that-never-failed-is-not-a-guard — The realm validator passed on first run over 110 hand-authored records. That is exactly when a guard is least trustworthy — passing proves nothing about blocking. I injected 7 deliberate violations (missing geometry, dangling ref, upward-pointing source, bad material ref, duplicate id, measured-without-frame, inference-without-basis) and confirmed 10 errors and exit 1. Static parse is not runtime validation; the test that matters is the failing one.

- P2 #pattern-my-own-tooling-corrupted-the-data-i-was-protecting — To test the validator I round-tripped the JSON through python — and json.load(open(p)) on Windows reads as cp1252, so every em-dash became mojibake in the files I had just written as the project's source of truth. The guard did not catch it because encoding was not one of its rules. Two lessons: always pass encoding='utf-8' explicitly on Windows, and the thing most likely to corrupt a canonical store is the maintenance script, not the author.

- P2 #pattern-resolve-council-splits-on-a-checkable-fact — Council genuinely disagreed: Grok said the brick dentil cornice is post-1601 and should be stripped; Gemini said decorative brique-et-pierre is a hallmark of the style that followed the 1593 rebuild and is a crucial DATING feature for 1601. The tempting move is to average or to defer. Instead I resolved it on a date that can be checked — that fashion belongs to Henri IV's reign, 1589–1610, which contains 1601 — and recorded the dissent with the condition that would flip it. Averaging two architectural claims produces a building that existed in no century.

- SESSION #pattern-refuse-to-duplicate-even-when-it-is-the-obvious-move — Having measured 25 colours, the obvious next step was to add them to palette.ts. I did not. The S104 reflexion records that duplicated palettes drifted within minutes, and the structural fix was to give colour one home. Measurements now live in the database with provenance; converting them into 4-colour GBC palettes is a separate art step that costs a real trade (parcel-001 is already at 8/8 background palettes). Restraint here was the higher-quality choice, and it is only visible as a non-action.

- SESSION #s105-meta — Daniel redirected the session twice mid-turn — dropping the building numbers for his own scheme, then asking for the database and clarifying what he meant by the 2026 AI stack. Both landed while tools were still running. The right response was to record the ruling immediately and let it reshape the deliverables, not to finish the original plan first. His clarification also asked for judgement, not compliance: he listed twenty stack items and said some are not needed, which is an invitation to say NO to specific ones. Naming fine-tuning, distillation and synthetic data as actively wrong for this project was more useful than adopting them.

- P3 #pattern-a-data-only-session-is-a-failed-session — I shipped two priorities of survey and database and called it done. Daniel: 'if we have done work. produced new pallets. and did so much of other things,. why didnt we implement it in the game? i want small improvements EVERY session!' He was right and the correction is now constitutional (ACTIVE_PLAN 13.1). Data work that never reaches the screen is invisible to the person paying for it. Plan the visible change FIRST, not as the leftover.

- P3 #pattern-the-owner-found-the-bug-i-rendered-twice — Daniel spotted the inverted hipped roof — 'the triangles of the roof are pointing th wrong way' — in a screenshot I had generated and looked at twice without seeing it. I had even DESCRIBED the roof as a pyramid while reading the real photos. The fix was one boolean swap. I was reading renders for 'does it look like a game' rather than 'is this geometry physically possible'. Ask of every render: could this object stand up in the real world?

- P3 #pattern-a-measured-colour-still-needs-the-right-ramp-step — I put the measured render #86867A on the BASE step and the wall came out grey concrete. The measurement was the dominant of a region that included shade, so on a sunlit wall it belongs as the SHADE step with lighter values above it. A measurement is a fact about a REGION UNDER PARTICULAR LIGHT, not a fact about the material. Placing it in the ramp is a second, separate judgement — and getting it wrong looks exactly like getting the measurement wrong.

- P3 #pattern-my-own-comment-broke-my-own-assertion — I added a file_lacks assertion binding the roof fix, then wrote an explanatory comment that quoted the buggy line verbatim — so the assertion failed on my own documentation. MCV caught it. Worth keeping because the instinct to document the old behaviour is correct; quoting it verbatim in a file under a lacks-assertion is not. Describe the old behaviour, do not paste it.
## 2026-08-12 — Session S104: first game code — parcel-001 built from Daniel's photographs, then reshaped twice by his corrections (3 priorities, all shipped)

- P1 #pattern-verify-the-crop-not-just-the-cluster: k-means over a named photo region returns a confident colour even when the crop landed on sky or shadow instead of the material. Six of 26 regions were wrong on the first pass and would have shipped into palette.ts unnoticed. Rendering each crop NEXT TO its extracted swatch and reading that sheet caught every one. Extract-then-verify-visually, never extract-then-trust.

- P1 #pattern-a-clean-test-on-the-wrong-question-refutes-nothing: to find which parcel-217 edge was the public road I tested which edges had no neighbouring parcel. It ran clean and gave a confident answer — but the kit holds ONLY the 23 estate parcels, so every estate-boundary edge looks "free". The test was well-formed and measured the wrong thing. Nearly baked a 46-49 degree skew into the tile grid. Ask what the data set EXCLUDES before trusting an absence. Recurred later the same session: a least-squares circle fit to the "forecourt curve" scored 8.6x better than a straight line and was still fitted to the wrong edge (the backs of the houses) — refuted only by drawing it on an orthophoto. A good fit to the wrong feature is the most convincing kind of wrong.

- P2 #pattern-the-guard-caught-what-discipline-would-not-have: palettes were duplicated between palette.ts and build-atlas.py. I retuned STONE in one and not the other within minutes of writing both. The build-time guard caught it by decoding actual pixels. Fix was structural, not vigilance: the atlas builder now PARSES palette.ts. A guard that checks the artefact beats a rule that asks humans to keep two copies honest.

- P3 #pattern-hardware-limits-produce-better-art-than-taste-does: the 8-background-palette GBC limit failed parcel-001 at 9. The fix — drawing the cellar void in BRICK's darkest instead of adding IRON for one tile — lost nothing visible and removed a whole palette. The constraint made the decision I would have argued about.

- P3 #pattern-input-nuance-is-a-real-bug-not-a-feel-issue: turn-in-place was implemented as "any direction press needs a 60ms hold", which made every tap a no-op and looked like broken keyboard input. Crystal only turns without moving when the direction CHANGES; pressing the way you already face walks immediately. Cost a full debugging detour into Phaser focus and key mapping before the logic itself was the culprit.

- P3 #pattern-repeated-tiles-amplify-per-tile-noise: three separate art defects this session were one lesson — a texture baked into a tile becomes a PATTERN once the tile repeats. Two rut lines per road tile read as a ploughed field; a wandering crack per render tile read as regular white slashes down the facade; alternating tree/hedge tiles read as a checkerboard. At 16px, per-tile detail must be either invariant or map-placed, never "random" inside a tile that tiles.

- SESSION #pattern-owner-correction-beat-my-inference-every-time: four times the owner's direct knowledge beat careful derivation — the forecourt is a half-circle (I had a box); the road is its edge and off-limits (I had made it walkable); the gate is 1783 and unchanged so there is NO 1601 divergence (I had reasoned my way to oak leaves); and his Google Maps traces confirmed the smithy I identified. Derivation is for what the owner cannot see — occluded geometry, measurements, cross-checks. For intent and for history, ASK FIRST.

- SESSION #s104-meta: owner delivered the blocking asset mid-turn and pre-approved the batch. Right move was to finish the A.0 probes already in flight, then let the photographs re-scope everything. The cadastre INDEPENDENTLY confirmed the plan's building claims to ~1% and the photo walk order matched the measured bearings — two unrelated sources agreeing is far stronger evidence than either alone, and it is why the unresolvable #13/#5 building numbers did not block the build. Session ended with Daniel taking direct design authority (§11.0 THE WORKING AGREEMENT): he directs every step, Claude may OFFER archived assets, never adds without a go.

═══════════════════════════════════════════════════════════
S105 LATE-SESSION UPDATE — read this over the sections above
═══════════════════════════════════════════════════════════

## THE LOVE-IT GATE IS NOW CONSTITUTIONAL (ACTIVE_PLAN §13.1)
**Every session must ship something VISIBLE in the game or the project, and show
it to Daniel for approval BEFORE closing.** S105 failed this at first pass — two
priorities of survey and database with zero art — and was corrected inside the
session on his instruction: *"i want small improvements EVERY session!"*
Plan the visible change from the start. Do not repeat that mistake.

## BLD-3 NEVER EXISTED — ZONE-1 HAS TWO BUILDINGS
I recorded a third building, "the pavilion", from footage of a steeply-hipped
roof with an apex finial. **It is the hipped END of BLD-1 seen nearly end-on** —
the roof is continuous. A hipped end viewed end-on is geometrically
indistinguishable from a pyramidal pavilion in one frame, and I compounded it by
attaching those photos to a real but unphotographed cadastral footprint
(buildings.geojson idx 147, 5.7 × 5.8 m) that S104 had measured 11 m north.
BLD-3 is deleted, its features re-parented onto BLD-1. See `DEC-TWO-BUILDINGS-ONLY`.

Also corrected, all on Daniel's word:
- **BLD-2 the smithy now has a RED CORRUGATED METAL roof.** The red plane behind
  BLD-1 in the footage is the smithy's own modern roof, not a lean-to.
- **The red-roofed house is a NEIGHBOUR, outside the property.** Never estate
  fabric, never enterable.
- **The small iron gate is BLD-1's GARDEN gate, and it opens onto the forecourt** —
  so the guardian's garden is reachable from the player's starting ground.

## P3 — THE CORRECTIONS WENT INTO THE WORLD (approved)
- **Inverted hipped roof FIXED.** Daniel spotted it: *"the triangles of the roof
  are pointing th wrong way."* `draw_roof_hip` had the branches reversed, making
  the hip full-width at the ridge and vanishing at the eaves. A hip widens as it
  descends; the cut-away corner belongs at the top.
- **ROOF re-anchored to the measured `#845F59`**; the stills pass had run salmon.
- **RENDER re-anchored to `#86867A`, as the SHADE step** — a first attempt put it
  as the base and the wall read as grey concrete.
- **Red-brick dentil cornice drawn** as 3 courses with proud alternating dentils,
  in the existing BRICK palette so it costs no palette slot.
- Palette guard still PASS at 8/8. Verified live at localhost:20694, zero console
  errors. **Daniel: "good i see it looks better now."**

## NEXT SESSION — DANIEL'S ORDER (ACTIVE_PLAN §13.2)
1. **Enlarge ZONE-1 and let the player WALK THROUGH THE GATE** and explore the
   whole starting zone with everything in it.
   **EXPLICITLY DEFERRED: no tutorial, no time-travel cinematic, no guardsman, no
   class conversation, no festival ticket.** §11.6's forecourt sequence is
   postponed, not cancelled. **No play mechanics.** Walking and looking only.
2. Then the interiors and gardens: inside the guardian's house, its **attic** and
   its **cellar**; the **garden in front of it**; the **smithy**; everything else
   standing in the zone.
3. Then simple mechanics. Step by step.

## STATE AT CLOSE
- 3/3 priorities complete. MCV **exit 0** (0 UNBOUND, 21 files bound). Gitleaks
  **no leaks**. All guards PASS, tsc 0, realm **114 records / 260 edges**.
- Preview server stopped, port released.
- **A close-chain commit is still PENDING operator confirmation.**
