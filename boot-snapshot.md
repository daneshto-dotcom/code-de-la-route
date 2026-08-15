# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-15 | Session: S110

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## WHERE THE GAME IS NOW
**The arrival runs end to end.** A new player boots into **2026** outside a shut gate with traffic
on the N7, talks to **Captain Dael**, buys a ticket, watches a 45 s film, and lands in **1601**.
Verified from a wiped save as one continuous run. Five priorities complete and bound.

## THE FOUR ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits BOTH `zone1/map.json` and
   `zone1_2026/map.json`. **Never hand-edit either.** One correction lands in both.
2. **OBJECTS HAVE THEIR OWN PALETTE BANK.** Vehicles and NPCs are spawned ENTITIES, not legend
   glyphs, so their palettes cost the scene nothing. This is the only reason the 2026 map fits in 8
   and the only reason Dael has skin. **Never put a person or vehicle in a legend.**
3. **GLYPH SPACE WAS NEVER FULL.** S109's blocker was true only of printable ASCII. Rows are JSON
   strings read one CHARACTER at a time — any BMP char is legal (`Π` `≈` `≡`). Constraint gone.
4. **§11.7 IS A TEST.** A cell-by-cell assert proves the fabric is identical across eras. Touching a
   fabric palette requires citing the authorising row in `ERA_AUTHORITY`.

## THE ONE TOOL THAT CHANGES HOW YOU WORK
**`npm run grid` — USE IT EVERY TIME HE SENDS A SCREENSHOT.** Never estimate a tile index.

## NEXT SESSION — HIS EXPLICIT INSTRUCTION
> *"i will start a new session next and start correcting everything step by step until we LOVE IT"*

**He wants MECHANICS and the overall state of the game. Not the film.** Expect a long correction
run. That IS the working mode — the deliverable is the process as much as the game.

## OPEN DECISION HE HAS NOT ANSWERED
He wants archived **Captain Dael + his voice** (`en-US-Chirp3-HD-Fenrir`, 15 dialogue lines) as the
ticket vendor/captain who **gives the tutorial tour inside the festival**. He earlier chose
"Showman outside, Dael inside." **Unanswered: does Dael MOVE off the 2026 gate entirely, or stay
AND do the tour?** This is a Rule-16 amendment — needs an NPC sprite system, the TTS pipeline (the
game has ZERO audio files by design), and a guided tutorial mechanic.

## WHAT DID NOT LAND (40/51 audited)
- Road signs (N7/A79/INRAE/Route de la Ronde) — **colours were never photographed**, the one real dependency
- Wire fencing · concrete blocks · corrugated metal roof — on the survey's list, not drawn
- Final-frame == game-first-frame assert (§3.6 wanted a machine check; eyeball-only)
- The motto card — *"A Realm to Enter. A Legacy to Forge."* exists verbatim on the live site
- Class / name / stats window — deferred by him

## THE FILM — PARKED, ACCEPTED AS REFERENCE ONLY
> *"it looks like ai slop with faces mingles. the ticket vendor goign through his own boot ... but
> its fine for reference for now"*

The master-plate method fixed ARCHITECTURE (pier caps 8/8, ironwork 6/6, nothing modern through the
gateway) but did NOT fix **faces** or **solidity**. Those look like Veo limits a seed plate cannot
reach — a third pass with the same method would likely fail the same way. If revisited, change
TECHNIQUE (shorter shots, faces further from camera, backs not fronts), don't re-prompt.

## BLOCKERS
- **ROTATE the `.env` keys** (`CF-S107-KEY-EXPOSURE`, open since S107). Transcript exposure only.
- **The attic is built on zero footage** — `IMG_8865` never delivered.
- Still wanted: a tape measure · the 1783 gate plans · old smithy access · **a photograph of the real gate**
  (every likeness in the film is derived from prose and UNVERIFIED).
- `CF-S109-WORLDBUILD-SYSTEM` — tile inspector + tile library. His sequencing was Council **after**
  Part 3. Part 3 is now done, so this is due.
- Parked at his instruction: the smithy roof, the NE corner of the court.

## HOW TO RUN IT — POWERSHELL, NOT BASH
`&&` is invalid in Windows PowerShell 5.1. Use `;` and an absolute path:
```powershell
cd "C:\Users\onesh\OneDrive\Desktop\Claude\Founder DNA\Extension Projects\Legacy of the Realm\Game\founding-realm\rebuild"; npm run dev
```
Serves on **8080**. Volume up — the road makes engine noise now.

## RECENT REFLEXION (S110, 12 entries)
The load-bearing ones:
- **S110-1** The guards caught three defects I had already looked at and accepted. A constraint that
  refuses you is sometimes telling you the answer.
- **S110-2** I shut the gate and forgot the postern — S109-8 verbatim, one session later.
- **S110-3** Every vehicle drove backwards and I could not see it. Found by auditing the LOG, not the screen.
- **S110-4** The "grey ghost" was architectural, not artistic.
- **S110-6** Two of the film's worst defects traced to omissions in MY spec wording.
- **S110-8** The era-flag bug was invisible to every component test; only the end-to-end run found it.
- **S110-9** I marked a priority complete for a deliverable the owner then rejected.
