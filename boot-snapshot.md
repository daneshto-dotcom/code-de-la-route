# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-22 | Session: S117

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## FOURTH RULE (S115) — REPORT BETWEEN STEPS; DO NOT STOP BETWEEN STEPS
When he has approved a batch, run the batch. Honoured this session.

## FIFTH RULE (S116) — LOOK AT IT. AN IMPRESSION IS NOT A MEASUREMENT
## SIXTH RULE, EARNED AT S117 — **NOW SEVEN FOR SEVEN**
An unmeasured read of a rendered frame has been **wrong seven consecutive times** across
S116–S117, and right zero times. The seventh: the hand question "never fired" — until I
measured `loop.frame` at 0→0 with the pane hidden, so `time.delayedCall(0)` could never
fire. Not a game fault; a frozen loop. Three others tonight: "ENTER does nothing at the gate" (Dael
was two tiles right; I was facing a wall), "the pack's left hand slot is missing" (the
doll is centred, 152..168, between labels at 150/170), "a stray mark above the footer"
(the caption's em-dash placeholder). **Do not speak an unmeasured claim about a frame,
let alone file it.** Every real defect tonight was found by a number.

## WHICH CAMERA — ASK BEFORE YOU SHOOT (S117)
`docs/SEEING-THE-GAME.md` rested on "the pane never composites". That is a CONDITION and
it flips. **rAF is suspended in a hidden tab.**

| | pane displayed | pane not displayed |
|---|---|---|
| `document.visibilityState` | `visible` | `hidden` |
| `game.loop.frame` | advances | pinned at 0 |
| `computer{screenshot}` | **WORKS — use it** | times out at 5s |
| hand-drive + `toDataURL` | risky, rAF may swap under you | **SOUND — use it** |

`clockMoves` passes in BOTH, so the existing INSTRUMENT_CHECK cannot tell them apart.
**Neither camera can photograph the cinematic** — the film is a DOM `<video>`, so
`toDataURL` returns a blank 4,074-byte frame mid-playback. Check `video.currentTime` instead.

**Run `window.audit()` at every beat of a survey** (it is written out in SEEING-THE-GAME.md).
It found the three MessageBox defects and was silent on seven other beats.

## WHERE THE GAME IS NOW
The arrival runs 2026 → Dael → film → 1601. **This session the GAME itself got looked at
for the first time**, not just the settings screens — and the very first NPC interaction
had three defects in one method. All fixed. The JOURNAL no longer paints its last diagram
over the keys page. Character creation says `LEFT / RIGHT TO CHOOSE` instead of the
baffling `LEFT / A TO CHOOSE`.

**AND THE GAME HAS A FRONT DOOR NOW.** A register/login gate (real DOM `<input>`s,
so the keyboard rises on a phone and password managers work) runs BEFORE Phaser is
constructed, then hand selection, then the 2026 arrival. Save schema **v6 → v7**
for the account. ESC → JOURNAL → ACCOUNT signs out or restarts.

**Text layout is now MEASURED everywhere it matters** — `Journal.fitLines()`,
`Subscreen.fitHint()`, and new this session `BoxLayout.layoutOptionColumn()`. Never count
characters: `FONT` is a fallback stack, so the advance is whatever the machine resolves.

## ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits BOTH zone1 and zone1_2026.
2. **PLAYER STATE AND WORLD STATE ARE SEPARATE.** `carry` is yours; `world.taken`/`world.dropped` belong to the world.
3. **A HAND HOLDS EXACTLY ONE THING — a LAW.** Only the PACK stacks.
4. **NO UI ART IN THE ATLAS.** All chrome is runtime Graphics + 11px text.
5. **MIGRATION BRANCHES DO NOT CHAIN.** Every `if (version === N)` returns a COMPLETE SaveData stamped current.
6. **A SCENE MAY OWN MORE THAN ONE GRAPHICS SURFACE** (new, S117). `Journal` owns `chrome`@10 and `anim`@20, and `redraw()` cleared only the first for two sessions. **Guard #8 `check:surfaces` now asserts every surface is cleared by the wholesale redraw** — aliases resolved, because all three scenes clear through `const g = this.chrome`.
7. **TWO PLACES DERIVING ONE NUMBER IS A BUG WITH A DELAY FUSE** (new, S117). Box geometry had two sources; `moveCursor` recomputed a pitch `show()` had just derived.
8. **THE JOURNAL HAS THREE PAGES** (new, S117). `keys -> play -> account`, cycled with `1`/`2`. Both tab labels derive from one `PAGE_TITLE` map — do not add a fourth page with a hard-coded ternary. **ACCOUNT is where sign out and restart live**, because a DOM bar in the letterbox is invisible on a full-bleed canvas and failed silently when it could not find its element.
9. **SIGN OUT AND RESTART ARE DIFFERENT VERBS.** `signOut()` clears the identity and LEAVES THE WORLD STANDING. `reset()` erases everything back to a true first run. They sit one keystroke apart, so both are labelled by consequence, and restart asks first.
10. **SAVE IS v7** (S117). `account: {username, salt, hash, iterations, createdAt, serverId} | null`. PBKDF2-SHA256 at 210k iterations via Web Crypto — a SOFT LOCK, not security: offline everything needed to verify sits in the same localStorage the player can edit.
11. **`Input.ts`, `BoxLayout.ts` and `AccountRules.ts` MUST STAY PHASER-FREE.** Headless tests import them; `Interact.ts` touches `Phaser.` seven times and dies on `window is not defined`. `AccountRules.ts` lives in `src/core/` and NOT `deploy/` because tsc rejects a cross-rootDir import that esbuild accepts — the client and the future server share ONE source of validation.

## Next Steps
1. **P4, FIRST — the art you have to choose.** `bottle_empty`, `bottle_water`, `key_iron` are provisional (confirmed in `build-atlas.py:2903, 2964, 3802`) and **the standing man reads as a bottle** — corroborated by measurement, not impression: on `p4-map-after-resume.png` the player at (160,235) and the dropped bottle at (190,185) are both small dark vertical blobs at 16px. Deferred deliberately: §11.0 says OFFER art, never install it, and you were asleep. Options to be offered, not landed.
2. **THE NEON PROJECT NOW EXISTS** — `legacy-of-the-realm`, Frankfurt, PG18, branch `production`, created by Daniel S117. **The vault block `legacy_realm_db` is written but its `pooled`/`direct` fields still hold `PASTE_..._HERE` placeholders.** Paste the connection string from the Neon dashboard (Connect) and `deploy/apply-schema.mjs` will apply `schema.sql` and PROVE it landed — it tests the version CHECK by trying to insert a blob that lies about its own version.
3. **`CF-S117-DEPLOY-HANDLERS` — still blocked on you for the Vercel half.** (a) create the Neon **database** on the paid Launch plan (NOT the CNC database) + the Vercel project with root dir `rebuild`, and set `DATABASE_URL` plus a **FRESH** `JWT_SECRET` — the vault's `vercel.jwt_secret` belongs to CNC and a shared signing key makes a token from one app valid in the other; (b) rule on Vercel Hobby's commercial-use restriction. Everything else is written: `deploy/schema.sql`, `src/core/AccountRules.ts` (55 assertions), `deploy/README.md`, `deploy/apply-schema.mjs`.
4. **PUSHED.** Both remotes were at 0 unpushed at close — S114 through S117 is all on GitHub.
5. **`CF-S116-FIND-CLAUDE-DIR-SUBMODULE`** (HIGH, still open) and its new sibling **`CF-S117-MCV-PARTIAL-STATUS-HIDES-BINDINGS`** — both in `~/.claude` shared by eight projects, so SYNC-BRAIN Tier 0/1 and their own amendment.
6. **Composition questions only you can answer:** the three interiors are letterboxed (a 14×10 room is 224×160 in a 320×288 frame, floating in black) — intended or not? The pack has ~45px of dead space between grid and footer. The five HOW-TO-PLAY diagram frames are still sparse.
7. Wake the sketchbook or leave it — `CF-S117-SKETCHBOOK-VIEWER`. **The page objection is gone**: the JOURNAL now cycles three pages, so a fourth is a small change rather than an argument. It is still the owner's call, and half-waking it (recording pages nobody can open) would build the very §9.2 violation the law forbids.

## Blockers
- **`CF-S107-KEY-EXPOSURE` — rotate the `.env` keys. Open since S107. HIGH. Owner-only.**
- **The gate's lower half: open bars or solid panel?** ONE photograph settles it, and would upgrade the film plate from "consistent with the record" to a verified likeness.
- **A tape measure for STO-1** — the door opens onto darkness until someone measures the interior.
- **Backlog #29, the film** — parked on your call; direction is stills, not video.
- **Dael's tutorial role** — unanswered since S110.
- **Where the iron key really lives** — your call ("make it hard to find later or make it into a quest").

## Pending Backlog
- [ ] #29 — the arrival film as a frame-by-frame story (PARKED on the owner's call)
- [ ] #37 — damage, fire, and what a liquid does. **RECORDED, DELIBERATELY NOT DESIGNED**
- [ ] Character stats: STR/DEX and item weight feeding `throwRange()`. **RECORDED, NOT DESIGNED**
- [ ] CF-S110-FILM-REROLLS — four weak shots + the gate question
- [ ] CF-S107-KEY-EXPOSURE — rotate the `.env` keys
- [ ] CF-S116-FIND-CLAUDE-DIR-SUBMODULE — the real fix, 8 projects
- [ ] CF-S117-DEPLOY-HANDLERS — endpoints + login screen + SaveStore wiring
- [ ] CF-S117-SKETCHBOOK-VIEWER / CF-S117-BOX-FIVE-OPTIONS / CF-S117-MCV-PARTIAL-STATUS-HIDES-BINDINGS
- [ ] The hand-key tap still fires on RELEASE, not press (a feel change nobody asked for)
- [ ] #36 item system — **COMPLETE** as of S116-P4 (drop-from-pack was the last piece)

## Recent Reflexion (S117 + S114)
Read `.claude/reflexion_log.md` — 49 entries, newest at top. **New this session:
`.claude/reflexion-archive.md`**, because the 50-entry cap was silently DELETING unique
entries while its policy claimed they survived in archived handoffs — S111's did not.
The cap now MOVES blocks to the archive instead of deleting them.

Highest-signal S117 entries:
- **#six-out-of-six-now-an-impression-of-a-ui-defect-has-never-been-right** — the base rate.
- **#the-camera-spent-a-whole-session-pointed-at-the-furniture** — a new tool gets aimed at what was most recently built, which is the least likely place for old bugs. Aim it at the oldest thing a player touches first.
- **#a-blocker-carried-for-forty-sessions-was-never-re-checked** — "VPS blocked on Daniel" was false from S78 to S117. The answer was one grep of the session archive.
- **#naming-the-cost-beats-paying-it-badly** — shipping the half that can be proven and naming the half that cannot is not less work, it is the work.
- **#i-wrote-the-anti-test-i-was-reconciling** — I wrote a brittle full-string assertion in the same session that documented why not to.
- **#the-prune-was-destroying-what-the-policy-promised-it-preserved** — take the backup BEFORE the irreversible step, and verify the claim a destructive policy rests on.

## Testing / gate
`npm run build` (8 guards) · `npm run typecheck` · `npm test` (**13 + 25 + 55 + 3,029**) · `npm run scan:secrets`
**New: `.github/workflows/rebuild-ci.yml`** runs all of it on any push touching `rebuild/**`.
`ci.yml` remains PARKED — it guards the frozen old build whose `npm audit` fails forever.

## Dev server
Port **33446** was live at close and still answering HTTP 200. To bring it back:
`node Game/founding-realm/rebuild/esbuild.config.mjs --serve --port=<port>` — or `/port` then `preview_start`.
