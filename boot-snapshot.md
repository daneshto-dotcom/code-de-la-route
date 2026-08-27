# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-26 | Session: S119

## READ THIS FIRST — THE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER install without his go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.
4. **S115** — report between steps; do not stop between them.
5. **S116/S117** — LOOK AT IT. An unmeasured read of a rendered frame was wrong EIGHT times running.
6. **S118** — MEASURED IS NOT THE SAME AS CORRECT. Ask what a thing is FOR before optimising a property of it.
7. **S119, NEW — THE INSTRUMENT IS SOMETIMES THE PRIORITY.** Three "bugs" this session were the harness, not
   the game: `document.hidden` freezes RAF, the frame counter sticks, and scene ops queue for a frame that
   never comes. `main.ts` now exposes `__realm` ON LOCALHOST ONLY. Step the loop by hand:
   `const g=window.__realm; let t=performance.now(); for(let i=0;i<20;i++){t+=16.67; g.step(t,16.67);}`
   then read scene/frame state back.
   **THE GAME CAN BE PHOTOGRAPHED — S120 CORRECTS THIS RULE.** `canvas.toDataURL()` WORKS: nothing ever
   swaps the buffer, so the back buffer still holds the render (`tools/shoot.ts` header explains it).
   Only the pane's `computer{screenshot}` fails, and it fails for DOM too. `npm run shoot` + the page-side
   driver made 89 frames in S116-S118 and 16 more in S120. S119 shot NOTHING: the instrument existed,
   worked, and went unused for two days of building. Do not re-derive "it cannot be seen" from this rule.
   **THE KEY TRAP, now listed in the driver header itself (S120 audit):** an event built from `{code}` alone
   reports `e.key === ''`. Phaser dispatches on `keyCode` so game actions work, but any handler reading
   `e.key` (Creation's name field) is unreachable. Set `key` explicitly or you cannot type.

## WHERE THE GAME IS NOW
**LIVE: https://legacyoftherealm.com** (Cloudflare Worker, apex route attached by hand — 200, all 15 files).
`www.` is still **404** — the fix is a zone Redirect Rule (`Hostname equals www...` -> 301 -> apex), NOT a
second Worker route: localStorage is per-origin, so a route would FORK the save.

**Accounts work.** Four endpoints against Postgres, 80 assertions. The client is wired: auto sign-in on a live
token, else the login form; then **continue where you left off / start new game**; then the strong-hand window;
then the game. A fresh browser signing in INHERITS the world.

**Characters exist.** 90 variants + legacy in ONE 9.7 KB sheet, because the palette seam sits on the 8x8 region
boundary at y=8 (head band above, garment below) — how GBC OBJ hardware worked. Six-page creation wizard,
seven stats, level/XP, a top-left name/class strip, and the Journal's fourth page as the character sheet.

## WHAT IS BLOCKED ON DANIEL, IN ORDER
1. **LOOK AT IT.** Nothing built in S119 was seen by a human. Every visual claim is a state or frame-index
   reading. Open the URL, or `npm run dev:api` and play it. This is the §13.1 debt.
2. **The Neon connection string** — `legacy_realm_db.pooled` still reads `PASTE_..._HERE`. Until then the API
   runs only locally against a throwaway Docker Postgres, so saves do not really follow you between devices.
3. **`www.` 404** — one Redirect Rule, ~3 minutes, no DNS write. Click path in HANDOFF_S119.
4. **`CF-S107-KEY-EXPOSURE`** — rotate the keys. Open since S107. HIGH.
5. **P4 ART — still his.** Three provisional item sprites (bottle_empty, bottle_water, key_iron).
6. **The gate's lower half: open bars or solid panel?** One photograph. **A tape measure for STO-1.**
   **Dael's tutorial role** (open since S110).

## ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits zone1 AND zone1_2026.
2. **PLAYER STATE AND WORLD STATE ARE SEPARATE.** `carry` is yours; `world.taken` is the world's.
3. **A HAND HOLDS EXACTLY ONE THING — a LAW.** Only the PACK stacks.
4. **NO UI ART IN THE ATLAS.** All chrome is runtime Graphics + 11px text.
5. **MIGRATION BRANCHES DO NOT CHAIN.** Every `if (version === N)` returns a COMPLETE SaveData. **SAVE IS v8.**
   A missing branch does not fail loudly — it falls through to `fresh()` and BLANKS THE WORLD. S119 nearly
   shipped exactly that for v7, and the suite would have passed because its version list was a literal.
6. **A SCENE MAY OWN MORE THAN ONE SURFACE.** Guard #8 asserts the redraw clears all of them. An `Image` is
   NOT part of the Graphics surface — hide it by hand (the Journal's character doll).
7. **TWO PLACES DERIVING ONE NUMBER IS A BUG WITH A DELAY FUSE.** Six sightings in S119 alone.
8. **THE JOURNAL HAS FOUR PAGES** — `keys -> play -> account -> character`, cycled with `1`/`2`. **A NEW PAGE
   GOES ON THE END.** Inserting one before ACCOUNT hid RESTART and he noticed within minutes.
9. **SIGN OUT AND RESTART ARE DIFFERENT VERBS.** `Restart.ts` owns "start a new game" for BOTH doors and it
   PUBLISHES the erase — a local-only reset is resurrected by the next `pull()`.
10. **`Input.ts`, `BoxLayout.ts`, `AccountRules.ts`, `Stats.ts`, `Character.ts` MUST STAY PHASER-FREE.**
11. **PHASER REUSES A SCENE INSTANCE ACROSS RESTARTS.** Reset per-run state in `init()`/`preload()`.
12. **A DEPLOY IS AN ALLOWLIST, NEVER A DIRECTORY.** Guard #9, two nets. Still 15 files.
13. **`SPRITE` BANKS ARE 3 OPAQUE PER 8x8 REGION**, not per sheet. Five inks fit one figure ONLY because of the
    y=8 seam. `build-player.py` asserts the seam in Python before a PNG exists.
14. **THE OPTION LISTS ARE DECLARED TWICE** (build-player.py + Character.ts) and the generator REFUSES TO BUILD
    if they disagree — because `variantRow()` falls back to the legacy figure, so a drift would be SILENT.
15. **`wrangler.toml` HAS NO `routes` KEY, ON PURPOSE.** Adding one arms a destructive `PUT /routes` that would
    delete the apex route Daniel attached by hand.
16. **THE SERVER MUST SHIP BEFORE THE CLIENT** on any save-version bump: `checkSavePayload` refuses anything
    above its own constant, and both sides re-export `SaveVersion.ts`.

## Testing / gate
`npm run build` (**9 guards**) · `npm run typecheck` · `npm test` (13 + 25 + 58 + 65 + 65 + **3,155**) ·
`npm run test:db` (**80**, needs Docker) · `npm run site` (build + guard #9) · `npm run scan:secrets`

## Dev server
`npm run dev:api` — the game AND `/api/*` on one port, the real `Handlers.ts` against a throwaway Docker
Postgres. The HTTP shell is NOT the Worker's; that is the one unproven part. Port from `$SESSION_PORT`.

## Next Steps
1. **SHOW HIM THE GAME.** Nothing built in S119 has been seen by a human. This is the §13.1 debt and it is
   first for that reason.
2. **The Neon string**, then point the harness at it — `dev-api` already honours `LOTR_TEST_DATABASE_URL`
   with no code change, so the same 80 assertions run against the real database.
3. **`www.` Redirect Rule** — one owner action; literal click path in HANDOFF_S119.
4. **`CF-S119-CREDENTIAL-IN-SAVE-BLOB`** — the PBKDF2 hash rides inside the save JSON and is stored twice.
   Needs its own approval: it touches credential handling and the save shape.
5. **`CF-S118-DEPLOY-DOC-SAYS-PAGES`** — `deploy-site.yml` still runs `wrangler pages deploy` against a
   WORKER. 16 false statements are mapped across three files and the correct design is written, unshipped.
6. **The hand-key tap fires on RELEASE** — located at `ParcelScene.ts:1100`, ~8 lines, key-repeat storm
   empirically ruled out. Cheap, felt, and still not done.
7. **The roadmap** — 19 phases, S119->S173:
   https://claude.ai/code/artifact/c46b36d5-2c33-4479-a9c3-6de5f37fbbd4
   P0 is still OPEN; he is extending it directly, part by part.

## Blockers
- A human looking at the game. The Neon connection string. The `www.` rule. Key rotation.
- A photograph of the gate's lower half. A tape measure for STO-1. Dael's tutorial role.

## Pending Backlog
- [ ] **P4 art — HIS CALL.** Three provisional item sprites remain.
- [ ] CF-S119-CREDENTIAL-IN-SAVE-BLOB · CF-S119-SAVE-DIVERGENCE · CF-S119-WORKER-SHELL-UNPROVEN
- [ ] CF-S118-DEPLOY-DOC-SAYS-PAGES · CF-S118-BOX-BODY-PAGING · CF-S118-SURFACE-GUARD-NAME-COUPLED
- [ ] CF-S118-SHOOT-SINK-LEAK · CF-S117-SKETCHBOOK-VIEWER (§9.3's reward layer: a save slot and no viewer)
- [ ] CF-S117-BOX-FIVE-OPTIONS — `offerHandVerbs` is EXACTLY at the 4-option ceiling; a 5th overflows unguarded
- [ ] CF-S107-KEY-EXPOSURE (HIGH, since S107)
- [ ] CF-S115-SUBMODULE-STATE-SHADOW · CF-S116-FIND-CLAUDE-DIR-SUBMODULE · CF-S117-CLOSE-GATE-HANDOFF-GLOB
      (all in `~/.claude`, 8 projects, SYNC-BRAIN Tier 0/1 — each needs its own amendment)
- [ ] The hand-key tap still fires on RELEASE, not press
- [ ] #37 damage/fire/liquid · stats feeding `throwRange()` — RECORDED, DELIBERATELY NOT DESIGNED

## Recent Reflexion (`.claude/reflexion_log.md` — 37 entries; the S114 block was pruned at close)
- **#the-only-reason-i-found-any-of-this-was-that-he-said-see-it-work-first**
- **#the-instrument-was-the-deliverable**
- **#the-type-system-caught-six-of-seven-and-the-seventh-was-the-dangerous-one**
- **#a-duplicate-that-fails-loudly-is-a-copy-a-duplicate-that-falls-back-is-a-trap**
- **#one-page-further-away-is-the-same-as-absent**
- **#i-moved-my-own-assertion-one-priority-later** · **#the-count-that-named-no-true-number**
