# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-27 | Session: S120

## READ THIS FIRST — THE CONSTITUTIONAL RULES
1. **THE WORKING AGREEMENT (§11.0).** Daniel directs every step. OFFER archived assets; NEVER install without his go.
2. **THE LOVE-IT GATE (§13.1).** Ship something visible and SHOW it.
3. **SUBTRACT, DON'T INVENT (`DEC-1601-METHOD`).** Absence of footage is never filled with invention.
4. **S115** — report between steps; do not stop between them.
5. **S116/S117** — LOOK AT IT. An unmeasured read of a rendered frame was wrong eight times running.
6. **S118** — MEASURED IS NOT THE SAME AS CORRECT. Ask what a thing is FOR before optimising a property of it.
7. **S119 — THE INSTRUMENT IS SOMETIMES THE PRIORITY.** `__realm` exists on localhost; step the loop by hand.
   **THE GAME CAN BE PHOTOGRAPHED.** `canvas.toDataURL()` works — nothing swaps the buffer, so the back
   buffer still holds the render (`tools/shoot.ts`). Only the pane's `computer{screenshot}` fails, for DOM
   too. 105 frames exist in `docs/shots/`. Do NOT re-derive "it cannot be seen".
8. **S120, NEW — A NEEDLE MUST BE A SHAPE ONLY CODE CAN HAVE.** Four MCV failures this session came from
   assertions written against what I MEANT to write rather than what the file says: a comment quoting the
   phrase asserted absent (x2), an invented assertion type (x2), and a needle broken by the file's own
   80-column wrapping. The verifier knows ONLY: file_exists, file_absent, file_contains, file_lacks,
   grep_count, json_field, syntax_ok, nonce_match. And bind to the CLAIM, not to today's code shape — an
   assertion anchored to `handSince` died when that dead field was correctly deleted.

## WHERE THE GAME IS NOW
**LIVE AND CORRECT AT https://legacyoftherealm.com** — deployed 6x this session with the vault's
Cloudflare token via `wrangler deploy` (NOT `pages deploy`; it is a Worker). Apex bundle byte-identical
to the local build, verified each time. `www.` is still **404** — one zone Redirect Rule, 301 to apex,
NEVER a second Worker route (localStorage is per-origin and a route would FORK the save).

Everything from S119 is finally reachable by a real player: the six-page creation wizard, the character
sheet, the Journal's four tabs, accounts with offline fallback. S120 fixed what looking at it revealed.

## THE TWO DOCUMENTS THAT MAKE THE NEXT SESSION CHEAP — READ BOTH BEFORE PLANNING
1. **`Game/founding-realm/BACKLOG.md` → section "NEXT SESSIONS — PLANNED, WITH IMPLEMENTATION NOTES".**
   S121-P1/P2/P3 and S122 with files named, design decisions ALREADY TAKEN, the trap in each, and the
   test that proves it. Do not re-plan these.
2. **`Game/founding-realm/rebuild/deploy/RESEARCH-multiplayer.md`** — 317 lines, 10 sources, the platform
   reading already done. **Do NOT repeat it.** Key verified facts so they are never re-derived:
   SQLite-backed Durable Objects ARE on the Workers **Free** plan (100,000 req/day, 13,000 GB-s/day);
   a connection = 1 request; incoming messages bill **20:1**; **outgoing messages are FREE**; hibernating
   objects are not billed for duration. Netcode answer: send the STEP, not the position (Westward's
   shipped pattern) — the game is tile-locked so interpolation/prediction/rollback are NOT needed.

## NEXT STEPS
1. **S121-P1 — close `CF-S120-NOTHING-PUSHES-DURING-PLAY`.** `push()` is called from TWO sites, both in
   `Restart.ts`; nothing uploads during play. Measured with a control: player walked (15,35)->(15,32),
   local save written, ZERO `/api` calls. Decision pre-taken: debounce ~5 s after the last local write +
   flush on `pagehide`/`visibilitychange`. THE TRAP: `push()` returns `stale` and is deliberately NOT
   retried — an autosave meeting a second device must SURFACE the conflict, not clobber.
2. **S121-P2 — Neon + secrets (BLOCKED ON OWNER).** He pastes the pooled string for the EXISTING Neon
   project `legacy-of-the-realm` into `legacy_realm_db.pooled` in the vault — not into chat. Then schema,
   `wrangler secret put DATABASE_URL` piped from the vault, a FRESH 32-byte `SESSION_SECRET` (never
   `vercel.jwt_secret`). **$5/mo decision is load-bearing:** Free is 10 ms CPU/invocation and PBKDF2
   x100,000 measures ~29 ms, so login FAILS on Free once a database exists.
3. **S121-P3 — the Durable Object spike.** One DO, one parcel, two tabs, a moving square. It must produce
   TWO NUMBERS: the per-DO memory class, and whether a Free DO carries a per-invocation CPU cap. **If it
   produces a feature instead of numbers, it failed.**
4. **S122 — presence design PDR**, only after 1 and 3.
5. Small and queued: world-index churn -> content HASHES (the mtimes are load-bearing for
   `staleness-check`, so do not just delete them); `CF-S117-BOX-FIVE-OPTIONS` (4-option ceiling, ~3 lines);
   `Input.ts`'s four unused exported helpers; `CF-S120-DEV-API-LEAKS-A-POSTGRES-PER-RUN` (reap on STARTUP).

## BLOCKERS (owner only)
- **Neon pooled connection string** — into the vault, not chat. The project already exists.
- **The $5/mo Workers decision** — or accept weaker password hashing for real people.
- **`www.` 404** — a dashboard Redirect Rule. PROBED: neither vault token can do it (`rulesets` returns
  10000 with the Workers token, 7003 with the DNS token). Genuinely his click.
- **`CF-S107-KEY-EXPOSURE`** — HIGH, open since S107. Rotate.

## ARCHITECTURE FACTS THAT WILL BITE YOU
1. **ONE GENERATOR, TWO CENTURIES.** `build-zone1.py` emits zone1 AND zone1_2026.
2. **PLAYER STATE AND WORLD STATE ARE SEPARATE.** `carry` is yours; `world.taken` is the world's.
3. **A HAND HOLDS EXACTLY ONE THING — a LAW.** Only the PACK stacks.
4. **NO UI ART IN THE ATLAS.** All chrome is runtime Graphics + 11px text.
5. **MIGRATION BRANCHES DO NOT CHAIN.** Every `if (version === N)` returns a COMPLETE SaveData. **SAVE IS
   v8.** A missing branch falls through to `fresh()` and BLANKS THE WORLD.
6. **A SCENE MAY OWN MORE THAN ONE SURFACE.** An `Image` is NOT part of the Graphics surface.
7. **TWO PLACES DERIVING ONE NUMBER IS A BUG WITH A DELAY FUSE.**
8. **THE JOURNAL HAS FOUR PAGES** — keys → play → account → character. **A NEW PAGE GOES ON THE END, AND
   NEEDS A BRANCH IN `update()` TOO** — S119 added `character` to the tab order and not to `update()`, so
   another page's animation drew through it for a whole session. The tab strip is now FOCUSABLE (`onTabs`).
9. **SIGN OUT AND RESTART ARE DIFFERENT VERBS.** `Restart.ts` PUBLISHES the erase.
10. **`Input.ts`, `BoxLayout.ts`, `AccountRules.ts`, `Stats.ts`, `Character.ts` MUST STAY PHASER-FREE.**
11. **PHASER REUSES A SCENE INSTANCE ACROSS RESTARTS.** Reset per-run state in `init()`/`preload()`.
12. **A DEPLOY IS AN ALLOWLIST, NEVER A DIRECTORY.** Guard #9. Still 15 files.
13. **`SPRITE` BANKS ARE 3 OPAQUE PER 8x8 REGION.** The y=8 seam is why 5 inks fit one figure.
14. **THE OPTION LISTS ARE DECLARED TWICE** and the generator REFUSES TO BUILD if they disagree.
15. **`wrangler.toml` HAS NO `routes` KEY, ON PURPOSE.** Adding one arms a destructive `PUT /routes` that
    would delete the apex route Daniel attached by hand. This is why `wrangler deploy` is safe.
16. **THE SERVER MUST SHIP BEFORE THE CLIENT** on any save-version bump. One `SaveVersion.ts`, re-exported.
17. **NEW S120 — THE CREDENTIAL NEVER LEAVES THE DEVICE.** `forTransport()` strips `account` from what is
    pushed, from what `adoptRemote()` installs, AND from BOTH sides of `pull()`'s `matchesLocal` compare —
    miss that third caller and the compare can never match, killing the branch silently.
18. **NEW S120 — AN OUTAGE IS NOT A REFUSAL.** A 5xx or `not-configured` means offline (fall through to
    local play); a 4xx still refuses. Getting this wrong locked EVERY new player out of the game entirely.
19. **NEW S120 — UNKNOWN `/api` ROUTES 404 BEFORE THE CONFIG CHECK.** Otherwise, with no database, every
    bogus path answered `503 not-configured`, which `isOutage()` reads as OFFLINE — a client bug would
    degrade silently instead of failing loudly.

## TESTING / GATE
`npm run typecheck` · `npm test` (**3,155** assertions) · `npm run build` (**9** guards — 8 print
"X guard: PASS", `check:boundary` prints "import boundary: PASS"; the other 3 PASS lines are from
`realm:build`, so "12 guards" is WRONG) · `npm run test:db` (**80**, needs Docker) · `npm run site`
(guard #9) · `npm run scan:secrets`

**Deploy:** `npm run site` then `CLOUDFLARE_API_TOKEN` from the vault (never echoed) + `npx wrangler@4
deploy`. Verify by fetching the apex bundle back and byte-comparing to `rebuild/site/dist/main.js`.

**Dev server:** `preview_start {name:"dev-api"}` — needs Docker. **Check
`docker ps --filter name=lotr-pg-test` at close**: it leaks one container per run.

## Pending Backlog
- [ ] CF-S120-NAME-ENTER-SKIPS-PATH-PAGE
- [ ] CF-S120-NAME-F-TYPES-NOT-CONTINUE
- [ ] CF-S120-JOURNAL-CHARACTER-ANIM-LEAK
- [ ] CF-S120-HUD-NO-PLATE-CONTRAST
- [ ] CF-S120-WORLD-INDEX-MTIME-CHURN
- [ ] CF-S120-NOTHING-PUSHES-DURING-PLAY
- [ ] CF-S120-DEV-API-LEAKS-A-POSTGRES-PER-RUN

## Recent Reflexion — S120 tags (full text in `.claude/reflexion_log.md`, 40 entries)
- **#the-instrument-existed-and-nobody-ran-it**
- **#the-footer-was-the-spec-and-both-keys-broke-it**
- **#i-was-wrong-twice-and-measurement-caught-both**
- **#a-guard-that-passes-after-the-bug-happens**
- **#the-comment-was-the-risk-not-the-code**
- **#my-own-green-verdict-was-confounded**
- **#the-browser-serves-the-bundle-not-the-source**
- **#i-invented-a-vocabulary-and-called-it-verification**
- **#green-is-not-deployed**
- **#i-reported-an-absence-i-had-not-actually-searched-for**
- **#the-error-message-said-safe-while-it-locked-the-door**
- **#my-verdict-string-said-still-blocked-about-a-working-deploy**
- **#it-was-drawn-as-a-button-and-was-not-one**
- **#a-label-computed-for-four-pages-and-printed-on-one**
- **#i-wrote-a-test-that-could-not-fail**
- **#the-cure-was-already-in-the-repo-with-a-comment-about-this-bug**
- **#my-test-data-was-invalid-and-it-looked-like-a-regression**
- **#i-probed-the-two-i-could-not-do-before-saying-i-could-not**
- **#the-fix-that-made-it-pure-also-made-it-a-trap**
- **#sanitise-the-offer-not-the-rule**
- **#a-game-set-in-france-needs-its-accents-tested**
- **#the-stale-row-was-the-before-picture**
- **#the-feature-was-half-wired-and-the-comment-admitted-it**
- **#a-skip-that-reports-success**
- **#chosen-for-slack-not-for-fitting**
- **#i-told-him-a-platform-limit-from-memory-and-it-was-wrong**
- **#the-cleanup-step-found-the-bug-the-work-never-would**
- **#i-narrated-a-diagnosis-one-line-before-checking-it**
- **#eleven-priorities-and-the-forward-plan-was-the-deliverable**
