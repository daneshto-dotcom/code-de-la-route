═══════════════════════════════════════════════════════════
HANDOFF SUMMARY — Legacy of the Realm
Generated: 2026-08-29
Session: S123 — presence hardened, four guards that were not guards, the map he
actually asked for, a knowledge base, and an estate archive
═══════════════════════════════════════════════════════════

## PROJECT
- Working dir: C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm
- Parent: main @ 6cf3e08 · Submodule Game/founding-realm: master @ bee25eb
- Stack: TypeScript / Phaser 3 / Cloudflare Worker + Durable Objects / Neon / esbuild
- Live: https://legacyoftherealm.com (Worker, NOT Pages — never `pages deploy`)

## CURRENT STATE
- typecheck 0 · npm test 13 suites 0 failed · npm run check **12 guards PASS** (was 10)
- npm run site PASS — 20 files, nothing outside the allowlist · scan:secrets clean
- MCV: hard_fail=0, 105 files bound, 0 UNBOUND
- CI green for every commit; both repos pushed, 0 unpushed, credential healthy
- Live-verified: `/dist/main.js` byte-identical to local; all 5 minimaps 200; lobby 426

## SESSION COST
- 662 messages, single tier (claude-opus-5) all session — ALWAYS-STRONGEST honoured
- Output 1,048,550 · cache creation 1,726,240 · cache read 291,307,907
- Context at close: 749,685 / 1,000,000 (75.0% YELLOW; stop threshold is 900K)

## THIS SESSION'S WORK
**P1 — Presence hardening (c1eb22f).** Four live bugs: `hello` was O(room) and
unrate-limited and silently rewrote identity with no self-heal; peers past the 64th
were PERMANENTLY invisible (a cap on what you are TOLD about, while the room kept
sending deltas for people you were never told about); `webSocketClose` never
completed the handshake (permanent-ghost risk, and ghosts would fill MAX_ROOM);
no heartbeat. The decisive move was not the fixes — it was building a harness that
EXECUTES the Durable Object. 94 → 279 assertions.

**P2 — Three guards repaired (4d1d388).** bundle-check's input list had drifted in
TWO directions (omitted a live parcel; never covered hand-edited sources) — replaced
by esbuild's own metafile, 7 → 41 inputs. dist/comic brought under the byte mirror,
both directions. evidence-check's freshness claim made TRUE by asking before
realm:build rather than after.

**P3a — Label budget + a blind guard (7ea8332).** CHARACTER→CHAR, ACCOUNT→ACC as the
owner chose. The strip guard that was supposed to stop a sixth tab was BLIND to one;
demonstrated before fixing.

**P3b — The MAP tab (e8071a3).** Owner rejected all four designs. Rebuilt to his
spec: `tools/build-minimaps.py` bakes a NEAREST downscale of the real render;
whole-pixel tile scale so the marker is exact; M bound outside the action layer.

**P4 — Server-wide roster (4ce4928).** `RealmLobby`, one DO per realm. `RealmSocket`
extracted so two clients share one lifecycle instead of two copies. Section 15
stopped grepping and started driving.

**P5 — Knowledge base (bee25eb).** 69 entries, `npm run know`, guard #12.

**P6a/P6b — Estate archive (3bf8bdd, bee25eb).** Five georeferenced IGN mosaics and
six period plates on our own survey anchor. **Chazeuil is named on four plates.**

## OPEN ISSUES
- **THE MAP HAS NOT BEEN PHOTOGRAPHED RUNNING.** Login gate; capture bridge would
  need a password typed into it. One human action. Asset verified by eye instead.
- **CF-S117-MCV-PARTIAL-STATUS-HIDES-BINDINGS (MEDIUM-HIGH, upgraded).** Produced a
  false GREEN this session. Shared script, SYNC-BRAIN Tier 0/1, needs its own session.
- Presence is still UNAUTHENTICATED — deferred by the owner, not decided.
- `world.dropped` has no decay policy; item spawn/despawn contention unresearched.

## BLOCKED ON
- CF-S107-KEY-EXPOSURE (HIGH, since S107) — rotate the .env keys.
- CF-S115-SUBMODULE-STATE-SHADOW (HIGH) — deletion inside a submodule needs his go.
- www. still 404 — one zone Redirect Rule. Do NOT re-probe.
- AD03 archives — their site blocks non-browser requests by design.
- ACTIVE PLAN IN-PROGRESS: `.claude/plans/S121-P1-autosync-deliberation.md`.

## NEXT STEPS
1. Make the map look 1601 — style the FRAME, never the capture.
2. The domaine altitude. Blocker is DATA: no inter-parcel layout exists at all.
3. AD03 archives (human + browser).
4. Presence authentication (his call).
5. The MCV partial-status verifier bug (own session, cross-project).
6. Item contention + `world.dropped` decay.

## SESSION PIPELINE REPORT
Pipeline: Session PDCA v2 | Priorities: 8/8 complete | 750K/1000K (YELLOW)
P1 presence hardening — completed — c1eb22f
P2 guard gaps — completed — 4d1d388
P3a label budget + blind guard — completed — 7ea8332
P3b the MAP tab — completed — e8071a3
P4 server-wide roster — completed — 4ce4928
P5 knowledge base — completed — bee25eb
P6a estate archive (IGN) — completed — 3bf8bdd
P6b period plates — completed — bee25eb

## REFLEXION (this session)
See `.claude/reflexion_log.md` — 9 entries at the top. The two that matter most:
- **#the-discipline-caught-me-four-times** — 24 faults planted, 24 caught, including
  four of my own mistakes that reading found none of.
- **#the-owner-is-the-fastest-correction-loop** — he caught the wrong commune and
  four bad designs in one line each; both answers were already inside the project.

## CARRY-FORWARD
None incomplete. Everything approved this session shipped, was verified, and is live.

## PASTE-READY PROMPT (next session's first message)
```
LEGACY OF THE REALM — 2026-08-29 | parent 30ae1b0 | submodule bee25eb | clean, pushed

READ ONE FILE FIRST → boot-snapshot.md (79 lines, leads with what changed).

FIVE THINGS THAT INVALIDATE OLDER HANDOFFS
1. THE MAP EXISTS AND IS LIVE. Press M. It is a NEAREST downscale of the real
   render (the MapleStory technique), not an illustration. Four stylised designs
   were rejected. DO NOT restyle the capture; style the FRAME around it.
2. THE SERVER TAB MEANS THE SERVER — a lobby Durable Object per realm. The
   no-locations guarantee is STRUCTURAL: LobbyPeer has no x/y/f at all.
3. FOUR GUARDS WERE NOT GUARDING — correct logic over a lying input, every one
   cited in a handoff as the protection. Three fixed; the fourth is a shared
   script that produces a FALSE GREEN and needs its own session.
4. `npm run know -- <anything>` — 69 entries. Ask it before spending an hour.
5. docs/estate-archive/ — Chazeuil is NAMED on four period plates.

WHAT TO DO NEXT
1. Make the map look 1601. Style the frame, never the capture.
2. The domaine altitude. BLOCKER IS DATA: no inter-parcel layout exists at all.
3. AD03 archives — needs a human with a browser.
4. Presence authentication — his call, deferred not decided.
5. CF-S117-MCV-PARTIAL-STATUS — the false-green verifier. Cross-project.

BLOCKED ON HIM
CF-S107-KEY-EXPOSURE (HIGH) · CF-S115-SUBMODULE-STATE-SHADOW (HIGH) · www.
Redirect Rule (do NOT re-probe) · THE MAP IS UNPHOTOGRAPHED (login gate) ·
ACTIVE PLAN IN-PROGRESS: .claude/plans/S121-P1-autosync-deliberation.md

GATE: typecheck · npm test 13 suites · npm run check 12 guards · ci:status ·
site · scan:secrets · know. Deploy is AUTOMATIC on push. NEVER `pages deploy`.

RULES: PDCA · PDR before ANY edit · §11.0 he directs every step · §13.1 ship
VISIBLE. PLANT THE FAULT (24/24 this session; it found four of my own mistakes).
CHECK WHAT WE ALREADY HAVE before commissioning research or proposing design.
Bind the claim, not the spelling. VERIFY THE ARTIFACT — stop the dev server
first. This shell EATS ${...} and backslashes in quoted heredocs and TRUNCATES
long commands. Python's /tmp is not git-bash's /tmp here.
```

## NOTE ON THIS FILE'S TWIN
`HANDOFF_S123.md` at the root is a byte-identical copy under the name the SHARED
close-gate hook globs (`HANDOFF_S*.md`). This project names handoffs
`HANDOFF_<date>_S<N>.md`, which that glob cannot match — CF-S117-CLOSE-GATE-
HANDOFF-GLOB, confirmed for the third time this session. S103, S115 and S118 have
the same twin for the same reason. The archived copy in `.handoff-archive/` uses
the project's own naming and is the canonical one.
