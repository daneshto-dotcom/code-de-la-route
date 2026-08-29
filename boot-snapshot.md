# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-29 | Session: S124 | parent 6cf3e08 | submodule bee25eb

## READ THIS FIRST — WHAT CHANGED UNDER YOU

**A ONE-LINE SAVE BUG WAS ERASING EVERY PLAYER'S PROGRESS ON LOAD, and it was
live through the whole of S123.** `migrate()`'s current-version path spread
`splitFlags(data.worldFlags)` — which rescues `era` and `intro.seen` from where
they lived BEFORE v9 — and never read `data.progress`, where they actually live.
It returned `progress: {}` and spread that over the real one. Arrive, reload, and
you were back at the ticket gate. FIXED, plus a boot repair that rescues damaged
saves and a write guard. **Any handoff older than this is describing a game that
silently reset you.**

Two things made it unrecognisable, and both are worth carrying: "no cars" meant
`era` had been ERASED (`Traffic` only draws when `era==='2026'`), not that you
were in 1601; and "DAY 24" comes from the realm's SERVER epoch, so it reads the
same on a character made a minute ago. **When a symptom seems to prove your state
is intact, check whether it reads that state at all.**

**THE OWNER FOUND IT, NOT THE GATE.** S123 closed with 12 guards, 3,215 save
assertions and a clean MCV — over a live save-corruption bug. Nothing could have
caught it: every save test loads ONCE, and the bug lived in the second load. A
round trip is not a load.

**THE MAP EXISTS AND IT IS LIVE.** Press **M** in game, or open the Journal's sixth
tab, and you see the whole parcel from above with a blinking marker on your tile.
It is not an illustration: `tools/build-minimaps.py` bakes a NEAREST downscale of
the real render, which is the MapleStory technique. The owner rejected four
stylised proposals — "they all look like shit" — and he was right; they were
drawings of the place rather than the place. **Do not restyle the capture into an
illustration.** Period treatment goes AROUND it (frame, cartouche, scale bar).

**THE SERVER TAB NOW MEANS THE SERVER.** A second Durable Object per realm
(`RealmLobby`) that everyone joins alongside their parcel room. Proven live: two
clients, level-up self-heal, no position ever transmitted. `LobbyPeer` has no x/y/f
AT ALL — the no-locations guarantee is structural, not a rule someone can delete.

**FOUR GUARDS WERE NOT GUARDING.** `bundle-check` held a hand-written input list
that omitted a live parcel AND never covered hand-edited sources. `journal-strip`
scraped tab labels with a closed allowlist, so a sixth tab was invisible to it.
`evidence-check`'s freshness assertion compared a file with itself. And
`verify-session-claims.py` reported hard_fail=0 while silently skipping a whole
priority's assertions. All four had CORRECT LOGIC over a LYING INPUT. Fixed —
except the last, which is a shared script and needs its own session.

**THERE IS NOW A KNOWLEDGE BASE.** `npm run know -- <anything>` — 69 entries:
11 resolutions, 48 findings, 4 owner decisions verbatim, 6 facts. Before you spend
an hour on something, ask it.

**AND AN ESTATE ARCHIVE.** `docs/estate-archive/` — five georeferenced IGN mosaics
(Cassini 1764, état-major, orthophoto, cadastre) and six period plates, all keyed
to our own survey anchor. **Chazeuil is NAMED on four of them.**

## GATE
`npm run typecheck` · `npm test` (13 suites) · `npm run check` (**12 guards**) ·
`npm run ci:status` · `npm run site` · `npm run know` · `npm run scan:secrets`
Deploy is AUTOMATIC on push to master touching `rebuild/**`. NEVER `pages deploy`.

## NEXT STEPS
1. **Make the map look 1601.** Deliberately unstyled — "we will later make it look
   more ancient". Everything needed is in `docs/estate-archive/`: six plates, the
   measured palette (ink #41382E on parchment #DCC9AB, never black, never blue
   water), the sign grammar. Style the FRAME, not the capture.
2. **The domaine altitude — zoom out to the whole estate.** His original ask had
   two altitudes; only the parcel shipped. THE BLOCKER IS DATA, NOT ART: there is
   no inter-parcel world layout anywhere — no origin, no offset, only a warp graph.
   Someone must AUTHOR parcel origins in a metre frame from S109-SITE-TRUTH.
3. **Audit the save layer for the same class** — a derived value overwriting a
   stored one. And add ROUND-TRIP coverage: no save test loads twice.
4. **AD03 archives** — 3 P 3301 (1821 cadastre) and the pre-1601 terriers. Their
   site blocks non-browser requests by design; needs a human with a browser.
5. **Presence authentication** — deferred by the owner, NOT decided.
6. **CF-S117-MCV-PARTIAL-STATUS-HIDES-BINDINGS** — the verifier false-green.
   Shared across all eight projects; SYNC-BRAIN Tier 0/1, own session.
7. **Item spawn/despawn contention**, and `world.dropped` still has no decay policy.

## BLOCKED ON HIM
- **ROTATE THE EXPOSED CLOUDFLARE TOKEN (CF-S123, HIGH)** — a live cfat_ token was
  pasted into the S123 transcript. Not an outage; the stored token still works.
- **CF-S107-KEY-EXPOSURE (HIGH, since S107)** — rotate the .env keys.
- **CF-S115-SUBMODULE-STATE-SHADOW (HIGH)** — deleting inside a submodule needs go.
- **www. is still 404** — one zone Redirect Rule. Do NOT re-probe.
- **THE MAP HAS NOT BEEN PHOTOGRAPHED RUNNING.** The build opens on a login gate
  and the capture bridge would need a password typed into it. One human action.
- **ACTIVE PLAN, IN-PROGRESS:** `.claude/plans/S121-P1-autosync-deliberation.md`
  still awaits owner approval.

## RULES THAT COST REAL TIME
1. **PLANT THE FAULT.** 24 planted this session, 24 caught — including four of my
   own mistakes that reading found none of. A guard or test never shown to FAIL
   proves nothing.
2. **Check what we already have before commissioning research or proposing design.**
   An agent produced 370K tokens about the wrong Chazeuil while `realm/` said
   Bourbonnais in four files. Four map designs were rejected while `docs/renders/`
   held a perfect capture of every zone.
3. **Bind the claim, not the spelling.** Six assertions broke on legitimate growth
   this session. A chain needle bound to either END breaks when a step is inserted.
4. **VERIFY THE ARTIFACT** — and stop the dev server first. It leaves a 6.87 MB
   unminified `dist/main.js`; the bundle guard caught it again today.
5. On this workstation the shell EATS `${...}` and backslashes inside a quoted
   heredoc, and TRUNCATES long commands. Write files in chunks with `cat`.
6. Python's `/tmp` and git-bash's `/tmp` are different directories here.
