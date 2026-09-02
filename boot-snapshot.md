# Boot Snapshot (auto-generated at handoff)
Generated: 2026-09-02 | Session: S125 | parent 5406faf | submodule a434cf9

## READ THIS FIRST — WHAT CHANGED UNDER YOU

**THE MAP LOOKS 1601 NOW, AND WHILE LOOKING AT IT THE PAGE TURNED OUT TO BE
BROKEN.** `Journal.update()` ended in the HOW TO PLAY card animation behind a
DENYLIST naming one page. SERVER arrived at S122 and MAP at S123 and neither was
added to it, so both spent every frame with another page's diagram drawn over
them — and on the MAP page that clear also **erased the player marker in the
same tick that drew it**. The one thing the map exists to say. Measured: 13
animation ticks per 200 ms on `map` and `server`, identical to `play`, 0 on the
three pages whose blocks return. Fixed to an ALLOWLIST (`page !== 'play'`), and
guard #8 extended to model `update()` — it had documented that exact blind spot
in its own header five sessions earlier.

**FOUR CARRIED "FACTS" DID NOT SURVIVE THEIR FIRST PROBE.** This is the headline
of the session, more than the map:

| carried as fact | measured |
|---|---|
| "no save test loads twice" | S124 added one; the gap was that it covered ONE field |
| "`world.dropped` is unbounded" | keyed by TILE — max one per tile, and the game holds **4 takeable items** |
| "the domaine map needs parcel origins authored" | the game contains **one piece of ground**, 0.30% of a measured 34.54 ha |
| "CF-S122-NO-HEARTBEAT is open" | fully implemented on both ends — **my probe was a grep truncated by `head -10`** |

**A ROUND TRIP IS NOW A PROPERTY, NOT AN ASSERTION.** `load -> save -> load` must
be a fixed point at every schema version. Proven twice: the S124 line restored
fails it at all nine versions, and the same class planted in `sketchbook` —
a field with no dedicated assertion — **passed the 3,215-assertion suite clean**
and failed the new one everywhere. That is the coverage it adds.

**THE KNOWLEDGE BASE WAS LYING.** Five findings were closed work still marked
OPEN. All five verified against the code and closed with evidence; one marked
PARTIAL rather than rounded up. `npm run know` is the documented first stop, so
it is only worth what it costs to be wrong once.

**I SHIPPED A DOUBLE-COUNT AND THE OWNER CAUGHT IT WITH A PLAIN QUESTION.**
"What is that 20x18 parcel?" — `parcel001` carries a `RETIRED` field saying
ZONE-1 absorbed it at S106 and `build-zone1.py` splices its rows into zone-1 at
BUILD TIME. Its tiles were already counted. **Do not delete parcel001** — it is a
live build input and the record of the layout he approved at S105.

## NEXT SESSION IS ZONE 2 — AND IT NEEDS THE WHOLE WINDOW
**READ `Game/founding-realm/rebuild/docs/S126-ZONE2-SURVEY-INPUTS.md` FIRST.**
Two walks, two phones each, ~180 degrees, identified by the LAST DIGITS of each
filename:

    first video   LEFT = ...4941    RIGHT = ...4942
    second video  LEFT = ...0759    RIGHT = ...0800

> **Get that pair backwards and the zone is MIRRORED — and it will look
> completely coherent while doing it**, because both halves are real footage of
> the same ground. There is no internal contradiction to catch it later. And
> "higher number = right" is a coincidence of two samples, not a convention.

Full HD, heavy; he was still uploading at close and hands over the folder at the
start of the session. Read the two streams IN PARALLEL, and **transcribe the
audio as a primary source** — he narrates boundaries, how the zones connect, and
future plans while walking. `docs/S109-SITE-TRUTH.md` is the template, and it
opens "ANALYSIS ONLY. Nothing in this document has been built."

## OWNER RULINGS THIS SESSION — do not re-litigate these
- **DEC-S125-1 — zone by zone, and NO full estate map.** *"i dont want to give
  you the full estate map so we dont make confusions."* Do not ask for it and do
  not reconstruct zone positions from the cadastre.
- **DEC-S125-2 — the 1601 map frame is accepted as shipped, "for now".**
- **DEC-S125-3 — the standing blockers are PARKED, not closed.** Stop surfacing
  them every close. Severities stay as they are.
- **DEC-S125-4 — NOTHING DECAYS.** Time decay would brick the game: `key_iron` is
  one of the four items in the world and zone-1's storehouse is
  `opensWith: key_iron`, with no second key. Breakage, not decay, is the design
  for when it ever matters — and it already exists in the fiction.
- **DEC-S125-5 —** the zone-2 survey inputs above.

## BLOCKED ON HIM — ONE ITEM, AND IT IS THIRTY SECONDS
**Sign in once at legacyoftherealm.com.** It settles whether Cloudflare Workers
needs the $5/mo Paid plan: PBKDF2 runs 100,000 iterations (~29 ms) against a
**10 ms Free CPU cap**, so only *login* and *register* would fail. Saving and
loading are unaffected. **This is NOT the Neon spend** — different vendor, and
Neon is done (proven: `/api/realm/chazeuil-i/load` answers 401 `no-token`, which
requires DATABASE_URL set and SESSION_SECRET valid). An agent must not type a
password, so it cannot be settled from here.

Everything else is parked by DEC-S125-3.

## WORTH AN HOUR BEFORE ZONE 2 — CF-S109, his own request
*"a system... that doesnt have me send you screenshots 100 times per session...
maybe have a library of all the tiles we've designed."* Council on it was
promised "next session, after part 3" and never ran. Zone 2 is exactly the work
that spends those round-trips. Two of three pieces exist —
`docs/tile-library.html`, `docs/explorer.html`. The missing one is
click-a-tile-and-it-reports-its-coords.

## GATE
`npm run typecheck` · `npm test` (**16 suites**) · `npm run check` (**12 guards**)
· `npm run ci:status` · `npm run site` · `npm run know` · `npm run scan:secrets`
Deploy is AUTOMATIC on push to master touching `rebuild/**`. NEVER `pages deploy`.

## RULES THAT COST REAL TIME THIS SESSION
1. **PROSE IS NOT A VERIFICATION ARRAY.** I wrote long `check_method` narratives
   for five priorities and zero typed assertions. The Stop gate blocked with
   hard_fail=10. Write `verification[]` AT EACH PRIORITY'S CLOSE, not the
   session's — the completion protocol orders it that way for a reason.
2. **A TRUNCATED GREP IS A LYING INPUT.** `grep -i ... | head -10` matched
   "shipping" and "mapping" and I recorded a shipped feature as missing. Same
   class as RES-S123-GUARD-LYING-INPUT, committed by someone who had read it
   that morning.
3. **DISCOVERY WITHOUT COMPREHENSION.** Replacing a hand-written list with disk
   discovery was right and not sufficient — it read directory NAMES, and the
   answer was inside the FILE.
4. **DO NOT QUOTE DEAD CODE VERBATIM IN A COMMENT.** My comment explaining a
   removed line reproduced it exactly, which defeated the `file_lacks` assertion
   guarding against its return.
5. **VERIFY THE ARTIFACT, dev server stopped.** The bundle guard failed at boot
   over a 361 s stale `dist/`; production was fine because CI rebuilds on push.
6. This shell **TRUNCATES long commands** and **eats backslashes** in quoted
   heredocs (`${...}` survives). Write files in chunks; build regex backslashes
   in python via `chr(92)`.
7. **Python's `/tmp` and git-bash's `/tmp` are different directories.** Pass
   absolute Windows paths between them, or use the scratchpad.
8. **END EVERY COMMAND AT THE PROJECT ROOT**, or the close gate globs the wrong
   directory (CF-S117, confirmed a fourth time).

## RECENT REFLEXION
`.claude/reflexion_log.md` — S125 block at the top (7 entries), then S124.
50 entries total, at the cap.
