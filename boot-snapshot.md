# Boot Snapshot (auto-generated at handoff)
Generated: 2026-09-03 | Session: S127 | parent 34a21fb | submodule 436785f | clean, pushed, LIVE

## READ THIS FIRST
**ZONE 2 IS WALKABLE.** `zone-2-road` (20×38 at 2 m) is built and live in production; the drive
leaves zone 1 through an opened hedge lid and was walked end to end in the running game. Two
parcels remain declared-but-not-built. He answered all seven outstanding rulings.

  Game/founding-realm/rebuild/docs/S127-ZONE2-DECISIONS-PUT-TO-OWNER.md   (his rulings + what shipped)
  Game/founding-realm/rebuild/tools/build-zone2.py                        (PARCELS table = the grid)

## Next Steps
1. **`zone-2-pond` (29×38) — the big one.** Blocked on ART, not on a decision. Needs: a rip-rap
   rim in both orientations (+ a corner), open water, a water edge, the wetland margin, and a
   `step_v` for the gap that descends eastward. **The WATER palette is already settled and
   verified** — day `#D8DC60 #A8B848 #5C7040 #2A3A2A`, night `#9CAE96 #6A8280 #42565C #232F36`
   (`FACT-S127-ZONE2-WATER-PALETTE`, and `tools/water-palette-probe.ts` re-checks it against the
   real modules). Add `WATER` to `src/palette.ts` AND a night ramp to `src/core/NightPalette.ts` —
   nothing asserts a BG palette has one, so a missing ramp silently fails to dim.
   His rulings that shape it: both pond gaps walkable with different roles (deep = the boat,
   shallow = the fishery, and NO crossing at the empty end); the SE boundary is the FENCE with the
   wall outside; the pond's far bank is IN; **the arboretum is SCENERY** — no interactables, which
   overruled the recommendation.
2. **`zone-2-head` (20×33)** — the shallow inflow, the breached dam, the little fishery, the NE
   extremity. Still needs ONE ruling: whether the quest pocket sits inside the polygon he traced.
   Three frames were sent; he asked "which pocket?" and has not answered. The perimeter budget says
   it does NOT fit (only 28 m of spare boundary; a finger to the wall and back costs 40–60 m).
3. **`CF-S127-LIVE-AND-UNWATCHED`** — the site is live and nothing watches it. Do NOT just
   uncomment the cron: `/health` returns 404 because the Worker only handles `/api/*`. Two changes,
   ONE commit — add a `/health` that does not touch the database, then arm the schedule.
4. **`CF-S122-PRESENCE-IS-UNAUTHENTICATED`** — MEDIUM-HIGH, live in production. The presence
   WebSocket accepts anyone; no session token is checked.
5. **The 40 unverified harvest candidates** (`CF-S127-HARVEST-UNVERIFIED`). Five agents produced
   them across S110–S126, including corrections to entries that are actively WRONG — `DEC-S125-5`'s
   mapping contradicts `DEC-S126-6`, four `CF-S122-*` findings are recorded open but are fixed, two
   decisions have empty `verbatim` fields where his words exist. All 30 verifiers were killed by a
   spend limit, so NONE was written. Journal: `subagents/workflows/wf_50e2bfa9-c03/journal.jsonl`.
6. **Three guard holes found this session, all recorded, none fixed:**
   `CF-S127-NO-GUARD-ON-WALKABLE-BORDER` (containment ≠ connectivity — reach-check structurally
   cannot see a border hole), `CF-S127-NO-GUARD-ON-PARCEL-VIEWPORT-FIT`, `CF-S127-NIGHT-GUARD-HOLES`
   (the distance rules run under `npm test`, NOT `npm run check`).

## Blockers
- **`zone-2-head`** — his ruling on the quest pocket's position. Everything else in zone 2 is art.
- `CF-S107-KEY-EXPOSURE` (HIGH, since S107) — .env rotation, owner only.
- `CF-S123-CF-TOKEN-EXPOSED-IN-TRANSCRIPT` (HIGH) — needs rotation, owner only.
- `CF-S115-SUBMODULE-STATE-SHADOW` (HIGH) — untracked `.claude/` inside the submodule; needs his go.

## Pending Backlog
No `BACKLOG.md` at this project root — priorities come from `.claude/session-state.json` and the
carry-forwards above. 32 open findings; query them with `npm run know -- --open`.

## LAST STEP OF BOOT — ASK THE DATABASE BEFORE YOU START (owner instruction, S127)
Two stores, **100 knowledge entries** + 167 realm records, queryable in half a second. AFTER the
handoff and BEFORE any work:

    cd Game/founding-realm/rebuild
    npm run know -- <the terms of your actual task>
    npm run know -- --open

Flags: bare terms search; `--open` for what is outstanding; `--kind decision` for his rulings;
`--id <ID>` for one entry in full.

**S127 is why this line exists, and it paid twice in one session.** The zone-2 grid turned on a
constraint no survey document had — `FACT-MINIMAP` + `FACT-PAGE-BUDGET` cap a parcel at 42 rows if
it is to keep zone-1's shipped 5 px/tile MAP page; `npm run know -- minimap` returns it first. The
same session then lost time TWICE to a shell failure `RES-S123-WINDOWS-SHELL-EATS-DOLLAR-BRACE`
already answered: long heredocs are unreliable on this shell — use the Write tool for scripts.

Protocol, including what to ADD at close: `Game/founding-realm/CLAUDE.md` → WORLD DATABASE.

## Two engine budgets discovered S127 — check these BEFORE sizing any new parcel
- **A scrolling parcel needs ≥ 20 cols AND ≥ 18 rows.** `ParcelScene:624` decides the camera with
  an AND (`worldW <= 320 && worldH <= 288`), so a parcel narrower than the viewport but taller than
  it takes the scrolling branch and shows sky down one side. `build-zone2.py` asserts this.
- **≤ 42 rows** to keep zone-1's 5 px/tile MAP page. Over 210 rows: no minimap, build still passes.

## Gate
`npm run check` 14 guards · `npm test` 16 suites · `npm run test:survey` 42 assertions ·
`npm run check:site` · `npm run scan:secrets` · `verify-session-claims.py`. All exit 0 at close.
**Deploy is AUTOMATIC on every push to `master` touching `rebuild/**`** — no preview step.
Verify it landed by HASHING the live bundle, not by reading a green CI tick:
`curl -s https://legacyoftherealm.com/dist/main.js | sha256sum` vs `dist/main.js`.

## Rules that cost time this session
LONG HEREDOCS FAIL ON THIS SHELL — use Write for scripts, and end every command at the project
root. THE WRITE THAT FLIPS A STATUS TO COMPLETED MUST CARRY ITS ASSERTIONS IN THE SAME WRITE.
WHEN PINNING A SOURCE LINE, PIN THE HALF THAT CANNOT MOVE — a span has two ends and usually only
one is load-bearing. A GUARD THRESHOLD IS A FLOOR TO CLEAR, NOT A SCORE TO MAXIMISE. CHECK
INHERITED ARITHMETIC AGAINST THE CODE BEFORE REPEATING IT. AND LOOK AT THE RENDERED FRAME — every
guard here reads map data; the camera composes it, and only a frame shows that.

## Recent Reflexion (last 2 sessions)
See `.claude/reflexion_log.md` — the S127 block is at the top (10 entries), then S126 (14).
34 entries total, under the 50 cap.
