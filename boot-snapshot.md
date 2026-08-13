# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-13 | Session: S106

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. You may OFFER
   archived assets; you NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Every session ships something visible and shows it
   to him before closing. **S106 shipped and showed FOUR times and the gate is still
   NOT satisfied** — *"there are a lot of corrections and stuff we still need to work on!"*
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** S106 broke this in the cellar and
   he caught it in one look. Absence of evidence is not evidence of a feature.

## THE DATABASE IS THE SOURCE OF TRUTH
`Game/founding-realm/rebuild/realm/` — **126 records**. If a fact is not there, it is
not real. `npm run realm:why <ID>` walks any fact to a video file and a timestamp —
including, now, to Daniel's own spoken words (`MED-S106-WALK` is the first media in
the project with an audio track).

## FOUR GUARDS, ALL BLOCKING — `npm run check`
boundary · palette (per-scene 8-palette GBC limit, decoded from real pixels) ·
**reach (NEW in S106)** · realm. Plus `npm run typecheck`.
**reach-check** flood-fills from the start tile and asserts landmarks the map
generator itself declares — it caught five real defects in S106 that looking at
renders did not.

## WHERE THE WORK IS
`http://localhost:20694` — `npm run dev` in `rebuild/`, or `preview_start` with the
`rebuild` launch config. **Two scenes:** `zone-1` (28×32, scrolling) and
`bld1-cellar`. Walk into the brick arch behind the guardian's house to go under.

## THE MAP IS GENERATED, NOT HAND-TYPED
`tools/build-zone1.py` and `tools/build-cellar.py` are the map SOURCE; the
`map.json` files are build products — **do not hand-edit them**. This is what made
four owner-driven layout rewrites routine in one session. Same doctrine as
`tools/build-atlas.py` being the art source.

## ZONE-1 AS IT NOW STANDS (Daniel's corrections, all applied)
- **BLD-1** the guardian's house, south, fronting the road. A **passage rings it**:
  in at the small gate, along the front, down the west flank, along the back past the
  **cellar mouth** to the **storage houses**.
- **The estate wall wraps it in an upside-down L**, then runs north up the west side
  of the drive. **Behind the houses is WALL, not open space.**
- **BLD-2 the smithy is WEST and BEHIND**, turned **N–S** = 6 × 11 metatiles =
  **12.6 × 22.2 m, its real measured footprint**. CLOSED to players, permanently.
- **The shared grassland runs N–S down the EAST**, with the **waist** where the house
  complex pushes east. Forest beyond it. The gate opens; the road stays off-limits.

## NEXT STEPS
1. **Ask him what to correct first.** Do not guess — he has said there is a lot.
2. **Put the offer list to him** (all recorded, none authorised): the well / mounting
   block / wheel-guard stones / bread oven; the cement water tank; chimney smoke;
   **redrawing the main gate from the real 1783 ironwork** (awaiting his go since
   S105); and the **frontage wall** as tall rendered with red tile coping.
3. **P5 is ready when he wants interiors:** BLD-1's ground floor is **FOUR rooms**
   (today's three is modern demolition), one shared chimney, an attic, a bathroom.

## BLOCKERS
- **NOT PUSHED.** Both repos committed (parent `27ed451`, submodule `4f71a1e`); push
  is operator-confirmed per GOV-28.
- **P3 (simple mechanics) NOT STARTED** — correct, not a failure. Mechanics wait
  until the zone is right.

## PENDING BACKLOG
- **`CF-S106-GITLEAKS-GATEWAY`** — 2 history + 1 live finding at
  `src/networking/gateway.ts:1366` in the **frozen old build** (March 2026). **Not
  S106's.** `.env`/`dist/` confirmed gitignored; the line reads from `process.env`
  so it is *likely* a false positive. **Settle and allowlist with a rationale, or
  rotate.** An alarm that is always on is not an alarm.
- **`CF-S106-FRONTAGE-WALL`** · **`CF-S106-OFFERED-NOT-BUILT`** — see above.
- **A tape measure**, still, three sessions running: the cellar vault, its oak
  lintel, the 2.1 m wall, and now the storage houses are ALL estimates.
- The **old smithy access** (behind bamboo in every frame) · **`IMG_8865`** missing ·
  the **1783 gate plans** he holds · `needs_resample` on 4 materials + STO-1.

## TRAPS THIS SESSION FELL INTO — DO NOT REPEAT
- **Do not turn a fact about the CAMERA into architecture.** The cellar's far end is
  never lit, so I drew a tunnel into blackness. There is no tunnel.
- **Numeric-looking evidence is not automatically stronger evidence.** Hand-traced
  coordinates flagged APPROXIMATE outranked two plain-prose observations that were
  right. Read an item's own stated confidence first.
- **A `file_lacks` assertion cannot survive a comment that quotes the forbidden
  line.** S105 recorded this; S106 did it again. Describe, do not paste.
- **When a cure script is missing, go read the diagnostic.** MCV named a script that
  does not exist and I logged the gap as uncurable; the verifier was there all along
  and documents its own schema in its header.
- **A tile has no orientation but a wall does.** Any tile with a directional
  highlight needs one variant per axis it will be laid along.
- **A forest is a mass with an edge, not a field of circles.** Round crowns tiled
  across a wood produce a visible lattice; jittering cannot fix a silhouette problem.
- **Write session state to the PROJECT ROOT `.claude/session-state.json`** (S105 trap,
  avoided this session).
- **Pass `encoding='utf-8'` explicitly to Python file IO**, and do not print unicode
  to a cp1252 stdout (bit me once this session).

## STATE AT CLOSE
- P1 ✔ · P2 ✔ *as re-scoped* · P3 not started · P4 ✔ · **P5 opened** (interiors).
- All four guards **PASS**, `tsc` **0**, bundle built.
- **MCV: 62 assertions, 24 modified files, 0 UNBOUND, exit 0.**
- Context **~470K / 1M (≈47% GREEN)**. 11 reflexion entries archived.
- Preview server left **RUNNING on 20694** so he can keep testing.
