═══════════════════════════════════════════════════════════
LEGACY OF THE REALM — S107 boot prompt
Parent `main` @ `b8529d5` · submodule `master` @ `4f71a1e` · **NOT PUSHED**
Working dir: `C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm`
═══════════════════════════════════════════════════════════

QUICK SUMMARY
S106 opened the gate. ZONE-1 went from one 20×18 screen to a 28×32 scrolling map
(56 × 64 m), walkable ground from ~240 m² to ~1044 m², and the player can now walk
through the main gate, ring the guardian's house by a passage, and go **down into
the cellar** — the project's first interior. Daniel corrected the layout four times
from renders and Google Maps traces, and his 6m34s **narrated** walkthrough (the
first media in the project with sound) is mined into the realm database.

READ FIRST — THREE CONSTITUTIONAL RULES

1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. You may OFFER
   archived assets; you NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible every session and SHOW it
   to him before closing. **It is reached when the ZONE is finished, not once per
   session.** His ruling at the close of S106, verbatim: *"this session is not a
   'miss' we did a lot and achieved a lot. i still dont LOVE it because they is
   still a lot to do and its normal."* An unfinished zone is **in progress**, not
   a failure — do not log it as one.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** S106 broke this once — drew a
   dark tunnel off the cellar because the far end is never lit in the footage,
   turning a fact about the *camera* into a fact about the *building*. He caught it
   instantly: *"there is nothing above, you should only see the cellar itself."*

WHAT TO DO FIRST — ASK, DON'T GUESS
He has said plainly there is a lot still to correct. **Open by asking what he wants
fixed first**, then put this offer list to him. All are recorded; none is authorised:

| offer | basis |
|---|---|
| **well** (*puits*), **mounting block** (*montoir*), **wheel-guard stones** (*chasse-roues*), **bread oven** (*four à pain*) | GEMINI-AUDITOR: a 1601 court without them is architecturally incoherent. `DEC-1601-ABSENT-THINGS` rules the well "recorded, not authorised" |
| the **cement water tank** in the shared grass | his own words, t≈62 s — no position, no dimensions |
| **smoke from BLD-1's chimney** | strongest "someone lives here" signal; needs animation |
| **redraw the main gate from the real 1783 ironwork** | `FEA-GATE-MAIN` holds it shut AND open, so it can be animated from evidence. Awaiting his go since **S105** |
| the **frontage wall** as tall rendered with red tile coping | his Street View shots show this; the art draws rubble with a stone coping (`CF-S106-FRONTAGE-WALL`) |

**P5 is loaded and ready** the moment he wants interiors: BLD-1's ground floor is
**FOUR rooms** (`OBS-S106-BLD1-ROOMS`) — today's three is *modern* demolition
(*"we took them down cuz we're going to make a gym out of this place"*) — with a
heater and the main fireplace on **one shared chimney**, an attic above, and a small
bathroom. Frames f_036–f_041 give the interior, f_040 the chimneypiece, f_045 the
bathroom. **The smithy interior stays CLOSED to players** (§11.3).

FACTS THAT WILL BITE YOU

* **The maps are GENERATED.** `tools/build-zone1.py` and `tools/build-cellar.py` are
  the source; the `map.json` files are build products — **never hand-edit them**.
  This is what made four owner-driven layout rewrites routine in one session.
* **Four blocking guards**, all in `npm run check`: boundary · palette · **reach** ·
  realm. `reach-check.ts` flood-fills from the start tile, asserts landmarks the
  generator itself declares, and validates warps **across** maps. It caught five
  real defects in S106 that looking at renders never found.
* **The palette budget is per SCENE and it is full outdoors** — zone-1 sits at 8/8.
  Any new outdoor material must reuse an existing ramp. Indoors is cheap (cellar 2/8).
* **A tile has no orientation but a wall does.** Any directional tile needs one
  variant per axis, or it repeats into a ladder.
* **A forest is a mass with an edge, not a field of circles.** Round crowns tiled
  across a wood make a visible lattice; use `canopy_a/b` inside, crowns on the edge.
* **Write session state to the PROJECT ROOT `.claude/session-state.json`**, not the
  submodule's copy.
* **`encoding='utf-8'` explicitly on all Python file IO**, and never print unicode
  to a cp1252 stdout.

THE DATABASE IS THE SOURCE OF TRUTH
`Game/founding-realm/rebuild/realm/` — **126 records**. If a fact isn't there, it
isn't real. `npm run realm:why <ID>` walks any fact to a video file and a timestamp —
including now to Daniel's own spoken words (`MED-S106-WALK`).

RUNNING IT
`npm run dev` in `Game/founding-realm/rebuild`, or `preview_start` with the
`rebuild` launch config. Two scenes: **`zone-1`** (28×32, scrolling) and
**`bld1-cellar`**. Walk into the brick arch behind the guardian's house to go under.

⚠ CARRY-FORWARDS
* **`CF-S106-GITLEAKS-GATEWAY`** — 2 history + 1 live finding at
  `src/networking/gateway.ts:1366` in the **frozen old build** (March 2026).
  **Not S106's**; `.env` and `dist/` are confirmed gitignored; the line reads its key
  from `process.env` so it is *likely* a false positive. **Settle it and allowlist
  with a rationale, or rotate.** An alarm that is always on is not an alarm.
* **A tape measure**, three sessions running: the cellar vault, its oak lintel, the
  2.1 m wall and the storage houses are ALL estimates.
* Open: the **old smithy access** (behind bamboo in every frame) · **`IMG_8865`** ·
  the **1783 gate plans** he holds · `needs_resample` on 4 materials + STO-1.
* He has promised more video: *"the next videos I will start letting you explore this
  and show you how it's going to look to get to the Chateau."*

FULL HANDOFF
→ `HANDOFF_2026_08_13_S106.md` · condensed: `boot-snapshot.md` ·
survey: `rebuild/docs/SITE-SURVEY-zone1-narrated.md` ·
plan: `BRAIN/architecture/ACTIVE_PLAN_realm_rebuild.md` §12–§13

FIRST ACTION FOR S107
**Push is still pending.** Both repos are committed and clean — ask Daniel whether
to push `b8529d5` (parent) and `4f71a1e` (submodule) before starting new work.
═══════════════════════════════════════════════════════════
