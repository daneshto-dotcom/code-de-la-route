# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-29 | Session: S121

## READ THIS FIRST - WHAT CHANGED UNDER YOU

**THE SERVER IS ON.** For this entire project /api answered 503 not-configured. It does not any
more. Neon PG 18.6 is attached, secrets are on the Worker, and a REAL PERSON has registered and
played: account "dfsfsdfsd", world in the database at revision 3. Anything in an older handoff
saying "no database exists" or "the client is authoritative offline" is now WRONG.

**THE $5/mo WORKERS DECISION IS RETIRED, NOT PENDING.** Three handoffs called it load-bearing:
PBKDF2 x100,000 measured ~29 ms against a 10 ms Free CPU limit, so login "must fail" once a
database existed. It registers in ~310 ms on the apex, repeatedly, no CPU refusal. Stop carrying it.

**SAVES ARE PER-REALM.** `save` is keyed (player_id, realm_id); the realm is a PATH segment,
/api/realm/<realmId>/save. The realm-less spelling is GONE, not aliased. Realms are declared rows
with an immutable epoch, so a typo in a URL cannot bring a world into existence.

**THE WORLD KEEPS TIME AND NOTHING RUNS TO DO IT.** realmTime(epoch, serverNow) is pure: 3 real
minutes per realm hour, a realm day is 72 real minutes. No tick, no loop, no alarm, no Durable
Object. Night is a PALETTE SWAP (NightPalette.ts) applied by a GLSL pipeline over a 120 s ramp.

## RULES THAT COST REAL TIME TO LEARN

1. **S11.0** he directs every step. **S13.1** ship something visible and SHOW it.
2. **VERIFY THE ARTIFACT, NOT THE SOURCE.** The browser serves dist/main.js. Rebuild before you
   test, or you test the old code.
3. **BIND TO THE CLAIM, NOT TODAY'S CODE SHAPE.** S121 caught itself pinning
   `SAVE_SCHEMA_VERSION = 9` - exactly what CF-S114-MCV-VERSION-ASSERTION-CLASS forbids, now on
   its fourth appearance. Assert the migration BRANCH, never the number.
4. **NEW S121 - MEASURE THROUGH THE TRANSIENT.** A pixel reading said night made the world
   BRIGHTER. The camera fade was mid-run at 42% and both grabs sat on a rising ramp. Settle the
   frame first; a reading taken during a transient measures the transient.
5. **NEW S121 - WHEN TWO PLACES COMPUTE ONE NUMBER, ONE MUST BE THE DEFINITION.** The LUT builder
   used `v >> 2`, the shader `floor(v/255*63+0.5)`. 48 of 103 colours silently went unmapped while
   every summary metric still looked healthy.
6. **NEW S121 - A METRIC CAN BE GAMED INTO ABSURDITY.** An automatic palette-separation pass turned
   a black car orange and gave an NPC green skin, both numerically valid. The principled fix was
   one line: people do not dim.
7. **THE PANE DOES NOT RUN rAF.** Real-time waits render nothing - step the loop by hand
   (`__realm.loop.step(16)`). `__night` and `__cues` are localhost-only hooks for driving the sky
   and the sounds. A truthy `window.game` is NOT proof the game booted.

## TESTING / GATE
`npm run typecheck` - `npm test` (**3,966** assertions, 11 suites) - `npm run build` (**9 guards**;
12 PASS lines total, the other 3 come from prebuild -> npm run admin, NOT realm:build) -
`npm run test:db` (**99**, needs Docker) - `npm run site` - `npm run scan:secrets`

**Deploy:** `npm run site`, then `npx wrangler@4 versions upload` for a preview URL, verify, then
`deploy`. NEVER `pages deploy` - it is a Worker. Byte-compare the served bundle afterwards.

## NEXT STEPS
1. **CF-S121-TESTS-ARE-NEVER-TYPECHECKED (MEDIUM, new, PROVEN).** tsconfig includes only
   `src/**/*`, so ZERO test files are typechecked. Demonstrated: a deliberate type error in a test
   file gave tsc 0 errors and the suite still said PASS. "Typecheck clean" has never covered a
   single assertion. Expect a backlog across 11 suites - its own priority, not a drive-by.
2. **CF-S119-SAVE-DIVERGENCE is REFUSED, not resolved.** A diverged boot latches autosync OFF
   (`autoSync.markDiverged()`) so it cannot clobber the other device - but the player has no way
   to CHOOSE. The primitives exist: pull() + adoptRemote() / keepLocal(). ~60 lines on the
   account page, and it closes a carry-forward open since S119.
3. **Shared, contended world state** - another player taking the last bottle while you are away.
   Deliberately deferred: no users until two people stand in one cellar. When it comes, do the
   cheap thing first (per-character containers), and give `world.dropped` a DECAY POLICY before it
   is shared - it is an unbounded, permanently growing map today.
4. **Ambient day/night MUSIC.** He has tracks from the old build. Only the TRANSITION cues were
   built (Ambience.ts: tritone+owl for dusk, major triad+birds for dawn). The sustained beds are
   not wired, by his instruction.
5. Small: `CF-S117-BOX-FIVE-OPTIONS` (4-option ceiling, ~3 lines) - world-index content hashes
   (the mtimes are load-bearing for staleness-check, so do not just delete them) - `Input.ts` four
   unused exports - dev-api container reaper (reap on STARTUP, not on exit).

## BLOCKED ON HIM
- **CF-S107-KEY-EXPOSURE** - HIGH, open since S107. An exposed key does not expire on its own.
- **`www.` is 404** - one zone Redirect Rule, 301 to apex. NEVER a second Worker route:
  localStorage is per-origin and a route would FORK the save. PROBED: neither vault token can do
  it (rulesets 10000 / 7003). He said "late on" at S121 - do not re-probe it.
- **CF-S115-SUBMODULE-STATE-SHADOW** - HIGH. Deleting inside a submodule needs his go.
- **The constitution is STALE** - blocks the /handoff CLOSE gate until re-stamped (GOV-28.1).

## PENDING BACKLOG
- [ ] Higher-res Chateau photos (needs source files from Daniel)
- [ ] fog-strip.webp integration (generated in S51, not wired to map edges)
- [ ] Fallback sprite improvement (deferred — rare edge case)
- [ ] Sprite atlas packing (deferred — 27 PNGs manageable)
- [ ] **S74 deferred**: apple-touch-icon-180.png asset file (link tag + manifest ref already in place; falls back to webp logo until PNG generated)
- [ ] **S74 deferred**: 12-screenshot viewport matrix (iPhone SE/iPhone 15 Pro/Pixel 7/desktop × 3 flows) — S79 P4 + S80 P3 shipped 13 baselines (fest
- [ ] **S74 deferred**: Veo cutscene prototype (Gemini ANALYZE rec — untapped tool opportunity)
- [ ] **S74 deferred**: T14 runtime event sim — current test asserts debounce code presence via file content, not live visualViewport event dispatch (
- [ ] **S75 protocol**: Full-file diffs in CHECK prompts (current partial-snippet pattern caused 44% false-positive rate)
- [ ] **S75 protocol**: Convergence scan in PDR R1 (when Grok + Gemini independently agree on architecture, surface explicitly)
- [ ] **S80 deferred**: TTS pipeline end-to-end manual QA against real LLM emit (`scripts/tts-synthesize.js` is mocked in tests; first AI-dialogue-pla
- [ ] **Sentinel-25 HIGH**: Inventory UI — sidebar tab works; filtering / sorting affordances missing
(26 unchecked items total in BACKLOG.md)

## RECENT REFLEXION - S121 tags (full text in .claude/reflexion_log.md, 47 entries)
- #six-research-tracks-reasoned-about-a-server-that-was-switched-off
- #the-blocker-i-carried-for-a-session-did-not-exist
- #applied-is-not-the-same-as-matches
- #the-plan-was-pre-taken-and-one-parameter-of-it-was-measurably-wrong
- #the-test-found-the-bug-that-reading-had-walked-past-twice
- #i-rejected-a-bug-the-reviewer-invented
- #the-owner-reframed-and-it-changed-the-answer-not-just-the-scope
- #a-credential-went-into-chat-because-i-asked-for-it-in-the-same-breath-as-the-file
- #the-name-said-world-and-the-contents-said-player
- #a-grep-for-literal-calls-missed-the-dynamic-one
- #the-failing-test-might-mean-the-data-is-gone
- #the-optimiser-satisfied-the-metric-and-produced-green-skin
- #the-principled-fix-was-smaller-than-the-numeric-one
- #it-looked-like-it-worked-and-half-the-palette-was-untouched
- #i-measured-a-fade-and-nearly-reported-it-as-the-feature
- #i-read-a-truthy-global-as-proof-and-it-was-a-pane-artifact
- #the-author-said-the-player-holds-no-decisions-and-it-held-three
