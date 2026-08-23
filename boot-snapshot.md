# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-22 | Session: S118

## READ THIS FIRST — THREE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER add them without his explicit go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.

## FOURTH RULE (S115) — REPORT BETWEEN STEPS; DO NOT STOP BETWEEN STEPS
## FIFTH RULE (S116) — LOOK AT IT. AN IMPRESSION IS NOT A MEASUREMENT
## SIXTH RULE (S117) — **NOW EIGHT FOR EIGHT.** An unmeasured read of a rendered
frame has been wrong eight consecutive times and right zero. The eighth: "the
open-gate overlay isn't landing" — a pixel diff of the 32×32 gate region says
**148 pixels differ**. It was landing; it is subtle at 1× where the gate is two tiles.

## SEVENTH RULE, EARNED AT S118 — **MEASURED IS NOT THE SAME AS CORRECT**
The sixth rule is about DEFECTS. It says nothing about whether the right THING was
built, and I had started treating "measured" as a synonym for "right".

I built the cutscene from the game's own atlas tiles *specifically* so the
protagonist could not drift — he IS `player.png`, the same bytes every panel, so the
AI film's worst failure was impossible by construction. Airtight, and wrong: **"it
looks like a part of the game. its not correct."** A cutscene's job is to read as a
DIFFERENT MEDIUM, and I had optimised the one property guaranteeing it would read as
the same one. No number would ever have said so. Only him looking at it.

**Ask what the thing is FOR before optimising a property of it.**

## WHERE THE GAME IS NOW
The arrival runs 2026 → Dael → **an eight-page COMIC BOOK** → 1601. **The AI film is
gone.** Bright printing inks, panels with ink gutters, halftone, radial bursts, speed
lines, a `RIIIP` in hand-authored 5×7 lettering, and every figure in silhouette.
37.4 MB became **26 KB**.

**AND THERE IS A DEPLOYABLE FOLDER.** `npm run site` writes `rebuild/site` — **15
files, ~1.5 MB** — guarded by an allowlist. Served flat and played from registration
through the comic into 1601. **NOTHING HAS EVER BEEN UPLOADED** — the game has never
been on the internet, and the 502 is the July tunnel, not a regression.

**TWO INSTRUCTIONS S118 GOT WRONG IN ITS OWN HANDOFF, both corrected:**
- `npm run site --prefix <relative-path>` FAILS from anywhere but the repo root.
  `cd` to `Game/founding-realm/rebuild` first.
- **Workers & Pages is an ACCOUNT-level page.** Inside a zone the sidebar only shows
  *Workers Routes*, a different feature. Direct link:
  `dash.cloudflare.com/?to=/:account/workers-and-pages`

Both cost the owner real time on an account with 2% weekly quota left. **An
instruction handed to a human is a deliverable and needs the same literal-correctness
check as code.**

## WHAT IS BLOCKED ON DANIEL, IN ORDER
1. **THREE CLICKS AND THE GAME IS LIVE.** `rebuild/deploy/GOING-LIVE.md` has them.
   `npm run site`, drag `rebuild/site` onto Cloudflare Pages, attach the domain.
   The 502 on `legacyoftherealm.com` is the tunnel he switched off on 2026-07-17 —
   the domain is alive on Cloudflare and DNS is already in the zone.
2. **The vault's Cloudflare token is DEAD** — Cloudflare returns
   `{"code":1000,"message":"Invalid API Token"}`. It is also the wrong scope
   (`Workers Scripts: Edit`). A Pages-scoped token turns on the automatic route.
3. **The Neon connection string** — `legacy_realm_db.pooled` still reads
   `PASTE_POOLED_CONNECTION_STRING_HERE`. Until then saves are per-device and
   offline sign-out offers REGISTER not LOGIN.
4. **`CF-S107-KEY-EXPOSURE`** — and S118 made it worse: reading the vault printed
   the Cloudflare tokens into a session transcript.
5. **P4, THE ART, STILL DEFERRED AND STILL HIS.** Three provisional item sprites,
   and the player sprite: measured, `down0` has **two** distinct silhouette widths
   across 13 inked rows and its shoulders (w8) are **exactly** its head's width — no
   shoulder line at all, which is why he reads as a hat on a sack. `player.hold`
   proves the cure: arms give it a third width class and it reads instantly. The
   comic's crowd figures were built with 5+ widths on that finding.
6. **The gate's lower half: open bars or solid panel?** One photograph.
7. **A tape measure for STO-1.** **Dael's tutorial role** (open since S110).
   **Where the iron key lives.**

## ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits zone1 AND zone1_2026.
2. **PLAYER STATE AND WORLD STATE ARE SEPARATE.** `carry` is yours; `world.taken` is the world's.
3. **A HAND HOLDS EXACTLY ONE THING — a LAW.** Only the PACK stacks.
4. **NO UI ART IN THE ATLAS.** All chrome is runtime Graphics + 11px text.
5. **MIGRATION BRANCHES DO NOT CHAIN.** Every `if (version === N)` returns a COMPLETE SaveData.
6. **A SCENE MAY OWN MORE THAN ONE GRAPHICS SURFACE.** Guard #8 asserts the wholesale redraw clears all of them.
7. **TWO PLACES DERIVING ONE NUMBER IS A BUG WITH A DELAY FUSE.**
8. **THE JOURNAL HAS THREE PAGES** — `keys → play → account`, cycled with `1`/`2`.
9. **SIGN OUT AND RESTART ARE DIFFERENT VERBS**, and RESTART replays the arrival **with no page reload** — which is how S118 found a scene freeze.
10. **SAVE IS v7.** PBKDF2-SHA256 at 210k via Web Crypto — a SOFT LOCK, not security.
11. **`Input.ts`, `BoxLayout.ts`, `AccountRules.ts` MUST STAY PHASER-FREE.** Headless tests import them.
12. **PHASER REUSES A SCENE INSTANCE ACROSS RESTARTS** (new, S118). A class field
    initialiser is per-CONSTRUCTION, not per-run. `done` survived a `finish()`,
    `update()` returned on its first line, ENTER and ESC were both dead, and the
    player sat on page 1 for ever. **Reset per-run state in `preload()`.**
13. **A DEPLOY IS AN ALLOWLIST, NEVER A DIRECTORY** (new, S118). `rebuild/` holds
    `docs/SITE-SURVEY-*.md` and `realm/*.json` — measured cadastral geometry of a
    real family's home — and the repo is PRIVATE, so serving that folder is a first
    disclosure, not a re-publication. Guard #9 has two independent nets.
14. **`COMIC` IS NOT IN `MASTER_COLORS`, ON PURPOSE** (new, S118). World palettes are
    anchored on measurements and are muted because the place is; printing inks are
    not. A tile painted in comic ink FAILS `check:palette`. The cutscene may borrow
    the world's colours; the world can never borrow the cutscene's.
15. **`BOX_H` IS DERIVED** (new, S118): `BODY_TOP_PAD + LINE_PITCH*MAX_BODY_LINES + PAD`.
    Phaser Text height is **exactly 12 × lines** at 11px, measured. Raise
    MAX_BODY_LINES and the box and the option column both follow.
16. **`PIL.rectangle(fill=None)` PAINTS WHITE** (new, S118). Not a no-op. The
    every-pixel-is-a-declared-ink assertion caught `#FFFFFF` on four pages.

## CI IS GREEN AGAIN — AND HAD BEEN RED SINCE S117
`Rebuild CI` failed on every push from S117 to S118 while handoffs reported "build
PASSING". Found by S118's Rule 22 audit. **It was never art drift:** all 17 files
differed in SIZE ONLY (`atlas.png` 18309 -> 20021), because the job pins
`Pillow>=10,<12` and this machine runs Pillow 12+. A byte comparison of a
COMPRESSED file asserts the compressor as well as the content. The step now
DECODES the PNGs and compares pixels — 61 of 61 pixel-identical — and two runs are
green. `Deploy site` is green too, skipping cleanly for want of a token.

**The lesson generalises and this repo keeps relearning it:** never bind an
assertion to a value a correct change will move. Same class as
CF-S114-MCV-VERSION-ASSERTION-CLASS and the full-string `scripts.test` equality.

## Testing / gate
`npm run build` (**9 checks** — boundary, palette, reach, realm, evidence, surfaces,
**comic (NEW #10)**, staleness, bundle) · `npm run typecheck` · `npm test`
(**13 + 25 + 55 + 3,029**) · `npm run scan:secrets` (clean, 588 commits) ·
**`npm run site`** (build + **guard #9**, negative-tested 5 ways)

## Dev server
`npm run site` then a static server on `rebuild/site` — `.claude/launch.json` has a
**`site-preview`** entry. **Careful: `npm run site` deletes and recreates `site/`,
which kills a server pointed at it** (`CF-S118-SITE-BUILD-KILLS-PREVIEW`).

## MCV RECONCILED AT CLOSE — and 12 of the 63 failures were mine
The stop-hook gate hard-failed. **Class 1, mine:** every S118 `verification[]` entry
was `{file, claim}` PROSE, so the verifier reported `unknown assertion type: None`
and marked all three priorities WEAK. That is S114's #prose-is-not-verification,
reproduced in a session whose own boot snapshot cites it approvingly. Replaced with
**63 typed assertions**. **Class 2:** S110-P4 / S113-P2 needles bound the DOM
`<video>` film, correctly gone — REBOUND to durable invariants (the arrival scene and
its hand-off contract; ESC-skips-on-first-view). Third appearance of
CF-S114-MCV-VERSION-ASSERTION-CLASS. **Class 3:** `site/**` is a derived gitignored
build product → added to `ignore_globs` beside the existing `rebuild/dist/*`.
**After: 717 pass / 0 fail / 0 UNBOUND, exit 0.**

**RUN `python ~/.claude/scripts/verify-session-claims.py` AT EACH PRIORITY BOUNDARY**,
not at close — a gate firing reactively is what the INTEGRITY-WARNING PROTOCOL exists
to prevent. And `~/.claude/scripts/verification-skeleton.py` exists; I never opened it.

## Recent Reflexion — read `.claude/reflexion_log.md`, 13 new entries
- **#consistency-was-the-wrong-axis-and-nothing-i-could-measure-would-have-said-so** — the session's lesson.
- **#a-derived-quantity-is-only-as-good-as-its-inputs** — I fixed one caption and broke six with the *correct* fix.
- **#the-deploy-was-never-blocked-on-a-vps-and-tonight-it-was-not-blocked-on-a-token-either** — probe the credential before designing around having one.
- **#phaser-reuses-the-scene-instance-so-a-class-field-runs-once**
- **#the-guard-caught-what-the-eye-called-fine-twice**
- **#i-contaminated-his-browser-for-the-third-session-running** — writing the lesson down is demonstrably not the fix.

## Pending Backlog
- [ ] **#29 the arrival film — SUPERSEDED. It is a comic now.** Close the row.
- [ ] **P4 art — FIRST ITEM, and it is his call** (see WHAT IS BLOCKED, item 5)
- [ ] CF-S117-DEPLOY-HANDLERS — four endpoints + SaveStore wiring. Blocked on the Neon string.
- [ ] CF-S118-BOX-BODY-PAGING · CF-S118-SURFACE-GUARD-NAME-COUPLED · CF-S118-DEPLOY-UNVERIFIED
- [ ] CF-S118-SHOOT-SINK-LEAK · CF-S118-SITE-BUILD-KILLS-PREVIEW
- [ ] CF-S116-FIND-CLAUDE-DIR-SUBMODULE · CF-S117-MCV-PARTIAL-STATUS-HIDES-BINDINGS (both in `~/.claude`, 8 projects, SYNC-BRAIN Tier 0/1)
- [ ] CF-S107-KEY-EXPOSURE — now also the Cloudflare tokens
- [ ] #37 damage/fire/liquid · character stats feeding `throwRange()` — RECORDED, DELIBERATELY NOT DESIGNED
- [ ] CF-S117-SKETCHBOOK-VIEWER · CF-S117-BOX-FIVE-OPTIONS
- [ ] The hand-key tap still fires on RELEASE, not press
- [ ] Interiors are letterboxed; the pack has ~45px dead space; diagram frames are sparse — composition, and his

## Where the comic lives
`tools/build-comic.py` → `src/art/comic/page-*.png` + `story.json`. **Never edit a
page PNG** — change the storyboard and re-run. `src/core/Cinematic.ts` pages it;
attempt 1 (tile-composed, rejected) is preserved at commit **46f91f5** because he
noted the paged text-and-picture machinery is *"usefull nevetheless for later
purposes"* for quest windows.
