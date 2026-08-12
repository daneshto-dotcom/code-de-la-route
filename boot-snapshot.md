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

### 2026-08-12 — S105: the videos mined, the database built
- #pattern-draw-the-box-dont-infer-it — three palette passes produced confident nonsense from inferred crop coordinates; drawing the box onto the frame exposed a 5 % offset instantly. Change the feedback loop, don't try harder inside it.
- #pattern-dominant-returns-the-background-for-thin-things — between railing bars, most pixels are the foliage behind; painted iron measured as dark green. Materials need per-material pick strategies.
- #pattern-backlight-is-not-colour-evidence — a silhouette carries profile at high confidence and colour at none.
- #pattern-a-guard-that-never-failed-is-not-a-guard — the validator passed first try on 110 records, which is when it is least trustworthy. 7 injected violations proved it blocks.
- #pattern-my-own-tooling-corrupted-the-data-i-was-protecting — the maintenance script, not the author, is the likeliest corruptor of a canonical store.
- #pattern-resolve-council-splits-on-a-checkable-fact — averaging two architectural datings produces a building that existed in no century.
- #pattern-refuse-to-duplicate-even-when-it-is-the-obvious-move — 25 measured colours did NOT go into palette.ts; restraint is only visible as a non-action.

### 2026-08-12 — S104: first game code; parcel-001 built then reshaped twice
- #pattern-verify-the-crop-not-just-the-cluster · #pattern-a-clean-test-on-the-wrong-question-refutes-nothing · #pattern-the-guard-caught-what-discipline-would-not-have · #pattern-hardware-limits-produce-better-art-than-taste-does · #pattern-owner-correction-beat-my-inference-every-time.


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
