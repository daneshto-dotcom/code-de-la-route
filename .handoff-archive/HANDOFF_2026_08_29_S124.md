═══════════════════════════════════════════════════════════
HANDOFF SUMMARY — Legacy of the Realm
Generated: 2026-08-29
Session: S124 — a one-line save bug that erased every player's progress on load
═══════════════════════════════════════════════════════════

## PROJECT
- Submodule Game/founding-realm: master @ 631c1d0 · parent main, both pushed
- Live: https://legacyoftherealm.com (Cloudflare Worker — never `pages deploy`)
- S124 opened mid-close of S123, because the owner hit a live bug in the real game.

## CURRENT STATE
- typecheck 0 · npm test 13 suites · npm run check **12 guards PASS**
- save-migration: **3,215 assertions** · site PASS · MCV hard_fail=0, 0 unbound
- Deploy site + Rebuild CI green for 631c1d0; the live bundle carries the fix.

## WHAT THIS SESSION WAS
The owner: *"my character that played for a whole day now just went in the cellar
and when he went out of the cellar (its dusk now) then he got reverted back to
the start of the game."*

**ROOT CAUSE — one line.** `migrate()`'s current-version path spread
`splitFlags(data.worldFlags)`. That helper rescues `era` and `intro.seen` from
where they lived BEFORE v9. At v9 they live in `data.progress`, so it found
nothing, returned `progress: {}`, and spread that empty object over the real one.
**`data.progress` was never read.** Every load of an up-to-date save erased the
player's era and whether they had seen the arrival.

Measured, not argued:
    v9 save, progress holds era+intro.seen  ->  {}                  WIPED
    v8 save, worldFlags holds them          ->  {"era":"1601",...}  fine

The nine migration branches above it are all CORRECT — those keys really were in
`worldFlags` then. Only the already-current path was wrong.

**BOTH SIGNALS THAT MADE IT LOOK LIKE SOMETHING ELSE WERE DERIVED, NOT STORED.**
"No cars" meant `era` had been ERASED (`Traffic` only draws when `era==='2026'`),
not that he was in 1601. "DAY 24" comes from the realm's SERVER epoch, so it reads
the same on a character made a minute ago. Character, items and world flags all
survived, because only `progress` was overwritten — which made data loss look like
a teleport.

**THREE FIXES, ANSWERING THREE QUESTIONS.** (1) the cause — read `data.progress`,
merge the rescued half under it; (2) players already damaged — `repairArrival()`
runs on every load at every version and PERSISTS; (3) the state itself —
`setPosition` refuses the pre-arrival parcel once `intro.seen` is true.
`ARRIVAL_SPAWN` is now one exported constant, imported by the cinematic that
writes it and the repair that restores it, so they cannot drift.

**THE REPAIR ALONE WOULD NOT HAVE RESCUED HIM** — once progress is wiped there is
no contradiction left to detect. That is the argument for finding causes.

## OPEN ISSUES
- **The MAP has still never been photographed running.** Login gate; the capture
  bridge would need a password typed into it. One human action.
- **CF-S117-MCV-PARTIAL-STATUS-HIDES-BINDINGS (MEDIUM-HIGH)** — can produce a
  false GREEN. Shared script, SYNC-BRAIN Tier 0/1, needs its own session.
- **CF-S117-CLOSE-GATE-HANDOFF-GLOB** — TWO faults, both hit at S123's close: the
  hook globs `HANDOFF_S*.md` (this project names them `HANDOFF_<date>_S<N>.md`)
  AND it searches the last Bash call's cwd. Worked around with a twin file and by
  ending every command at the project root. `npm run know -- close gate`.
- Presence is still UNAUTHENTICATED — deferred by the owner, not decided.
- `world.dropped` has no decay policy; item contention unresearched.

## BLOCKED ON
- **CF-S123-CF-TOKEN-EXPOSED-IN-TRANSCRIPT (HIGH)** — a live `cfat_` token was
  pasted into the S123 transcript. ROTATE IT. Not an outage: the stored token was
  re-verified working by a deploy re-run.
- CF-S107-KEY-EXPOSURE (HIGH, since S107) — rotate the .env keys.
- CF-S115-SUBMODULE-STATE-SHADOW (HIGH) — deletion inside a submodule needs his go.
- www. still 404 — one zone Redirect Rule. Do NOT re-probe.
- AD03 archives — their site blocks non-browser requests by design.
- ACTIVE PLAN IN-PROGRESS: `.claude/plans/S121-P1-autosync-deliberation.md`.

## NEXT STEPS
1. **Make the map look 1601.** Style the FRAME, never the capture. Plates and the
   measured palette are in `docs/estate-archive/`.
2. **The domaine altitude.** BLOCKER IS DATA: no inter-parcel layout exists at all.
3. **Audit the save layer for the same class.** This bug was a derived value
   overwriting a stored one. Look for other spreads that clobber real data, and
   add round-trip coverage — no save test loads twice.
4. AD03 archives (human + browser).
5. Presence authentication (his call).
6. The MCV partial-status verifier bug (own session, cross-project).

## SESSION PIPELINE REPORT
Pipeline: Session PDCA v2 | Priorities: 1/1 complete
P1 the save must not contradict itself — completed — 631c1d0
Scope note: EXCEEDED the approved micro PDR by also fixing the root cause,
disclosed to the owner in the same message rather than buried.

## REFLEXION (this session)
`.claude/reflexion_log.md`, top block. The three that matter:
- **#the-symptom-that-proves-state-is-fine-may-not-read-the-state**
- **#a-round-trip-is-not-a-load** — 3,215 save assertions, none loaded twice.
- **#he-found-it-not-the-gate** — S123 closed green over a live save-corruption
  bug. A gate proves what it was built to prove and nothing else.

## CARRY-FORWARD
None incomplete.

## PASTE-READY PROMPT (next session's first message)
```
LEGACY OF THE REALM — 2026-08-29 | submodule 631c1d0 | clean, pushed, deployed

READ ONE FILE FIRST -> boot-snapshot.md.

WHAT CHANGED
1. A ONE-LINE SAVE BUG ERASED EVERY PLAYER'S PROGRESS ON LOAD. migrate()'s
   current-version path never read data.progress. Fixed, plus a boot repair for
   damaged saves and a write guard. Any handoff older than this describes a game
   that silently reset you.
2. THE MAP TAB IS LIVE. Press M. It is a NEAREST downscale of the real render
   (the MapleStory technique). Four stylised designs were rejected — style the
   FRAME, never the capture.
3. THE SERVER TAB MEANS THE SERVER — a lobby Durable Object per realm.
4. npm run know -- <anything>   71 entries. Ask it before spending an hour.
   Run it from Game/founding-realm/rebuild.
5. docs/estate-archive/ — Chazeuil is NAMED on four period plates.

WHAT TO DO NEXT
1. Make the map look 1601 — style the frame, never the capture.
2. The domaine altitude. BLOCKER IS DATA: no inter-parcel layout exists.
3. Audit the save layer for the same class — a derived value overwriting a
   stored one — and add round-trip coverage. NO save test loads twice.
4. AD03 archives (human + browser).
5. Presence auth (his call).
6. CF-S117-MCV-PARTIAL-STATUS — a verifier that can report a false GREEN.

BLOCKED ON HIM
ROTATE THE EXPOSED CLOUDFLARE TOKEN (CF-S123, HIGH) · CF-S107-KEY-EXPOSURE ·
CF-S115-SUBMODULE-STATE-SHADOW · www. Redirect Rule (do NOT re-probe) · THE MAP
IS UNPHOTOGRAPHED (login gate) · ACTIVE PLAN: S121-P1-autosync-deliberation.md

GATE: typecheck · npm test 13 suites · npm run check 12 guards · ci:status ·
site · scan:secrets · know. Deploy is AUTOMATIC on push. NEVER pages deploy.

RULES: PDCA · PDR before ANY edit · §11.0 he directs every step · §13.1 ship
VISIBLE. PLANT THE FAULT — it found THREE defective assertions of mine this
session and none were found by reading. CHECK WHAT WE ALREADY HAVE before
commissioning research or proposing design. A ROUND TRIP IS NOT A LOAD. When a
symptom seems to prove state is intact, check whether it reads that state at all.
VERIFY THE ARTIFACT — stop the dev server first. This shell EATS dollar-brace
and backslashes in quoted heredocs and TRUNCATES long commands; write files in
chunks. Python's /tmp is not git-bash's /tmp. END EVERY COMMAND AT THE PROJECT
ROOT or the close gate searches the wrong directory.
```

## NOTE ON THIS FILE'S TWIN
`HANDOFF_S124.md` is a byte-identical copy under the name the SHARED close-gate
hook globs. See CF-S117-CLOSE-GATE-HANDOFF-GLOB — `npm run know -- close gate`.
