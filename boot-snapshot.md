# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-29 | Session: S122

## READ THIS FIRST — WHAT CHANGED UNDER YOU

**THE DEPLOY PIPELINE WORKS.** For this project's entire history CI had never deployed
the site — 26 runs, zero reaching `wrangler deploy`. It deploys now. The owner set
CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID on 2026-08-29 and **every push to master
touching `rebuild/**` now goes straight to production**, by his explicit choice over the
"versions upload → verify → deploy" ceremony. Any doc saying the deploy has never run,
or that the vault token is dead, is WRONG — retractions are now inline at those sites.

**MULTIPLAYER EXISTS AND IS LIVE.** One Durable Object per (realm, parcel), hibernating.
PROVEN IN PRODUCTION: two WebSocket clients on wss://legacyoftherealm.com saw each other
join, walk and leave (521 ms connect). `/api/realm/<realm>/presence` answers 426 to a
non-upgrade request. Any doc saying "the rebuild has no realtime code at all" is stale.

**TWO GATES TURNED OUT NOT TO BE GATES, both proven by planting a fault:**
1. `npm run check` had NO typecheck step. A planted type error gave tsc 1 error and
   check exit 0. Twenty sessions of handoffs cited that chain as the gate. FIXED.
2. `tools/` was never typechecked at all (S121's finding) — 79 errors when switched on.
   FIXED, with `check:typecheck-coverage` as guard #10.

**PRESENCE IS UNAUTHENTICATED.** Anyone can open a socket to a room with no account and
no token, watch who is where, and inject a fake player into every real player's screen.
Shipped today. It was never a decision — see CF-S122-PRESENCE-IS-UNAUTHENTICATED.

## GATE
`npm run typecheck` · `npm test` (**13 suites, 4,090 assertions**) · `npm run check`
(**10 guards, now typechecks first**) · `npm run ci:status` · `npm run site` ·
`npm run scan:secrets` · `npm run test:db` (99, needs Docker)
Deploy is automatic on push. NEVER `pages deploy` — it is a Worker.

## NEXT STEPS
1. **CF-S122-PRESENCE-IS-UNAUTHENTICATED (MEDIUM-HIGH, owner decision).** Require the
   existing bearer token on the presence upgrade and take the name from the account —
   that also kills name spoofing. The UX cost is that an unauthenticated visitor could
   no longer see the courtyard populated. His call, not a session's.
2. **Presence hardening, four carries:** `hello` is O(N) and unrate-limited; peers past
   the 64th are permanently invisible to a joiner (not merely truncated);
   `webSocketClose` never completes the handshake (risk of a permanent ghost player);
   no heartbeat, so an idle drop makes the whole room flicker and re-identify.
3. **Guard gaps found by the close-out audit** — bundle-check's INPUTS omits `zone1_2026`
   which IS bundled; `dist/comic` ships unchecked; evidence-check's freshness assertion
   compares the artifact with itself because `realm:build` runs first.
4. **CF-S122-JOURNAL-MAP-TAB** — owner asked for a MAP tab / hotkey M, MapleStory-style,
   zone dot + zoom to the whole domaine. NOTE: the tab strip is FULL. `journal-strip.test.ts`
   will FAIL when you add a sixth tab; that is deliberate, and the fix is a label budget.
5. **Server-wide roster.** The SERVER tab honestly says "WHO IS IN THIS PARCEL" because
   presence is per-parcel. A real roster needs one lobby object everyone also joins.
6. **Deferred by the owner:** item spawn/despawn contention research ("worth a research"),
   and `world.dropped` still has no decay policy.

## BLOCKED ON HIM
- **CF-S107-KEY-EXPOSURE (HIGH, open since S107)** — rotate the Anthropic + GCP keys in
  `.env`. An exposed key does not expire on its own.
- **CF-S115-SUBMODULE-STATE-SHADOW (HIGH)** — deleting inside a submodule needs his go.
- **www. is still 404** — one zone Redirect Rule, 301 to apex. Do NOT re-probe; neither
  vault token can do it (rulesets 10000 / 7003) and he said "late on" at S121.

## RULES THAT COST REAL TIME
1. **S11.0** he directs every step. **S13.1** ship something visible and SHOW it.
2. **VERIFY THE ARTIFACT, NOT THE SOURCE** — and note `npm run dev` runs esbuild in WATCH
   mode, which rewrites `dist/main.js` UNMINIFIED on every edit. It sat at 7.1 MB against
   the 1.47 MB that ships, and the guard chain was green over it for a whole session.
   bundle-check now catches that. Stop the dev server before measuring anything.
3. **BIND TO THE CLAIM, NOT THE SPELLING.** Four assertions broke this session on
   legitimate growth. The counter-example matters: the `routes` tripwire in wrangler.toml
   is deliberately over-broad, because that key can take the live domain down. Blast
   radius decides tightness, not consistency.
4. **RETRACT AT THE CLAIM, NOT DOWNSTREAM OF IT.** Four docs carried both the correction
   and the uncorrected original, with the stale copy in the header a session reads first.
5. **A dynamic import defeats a literal grep** — twice this session.
6. **Node's strip-only mode rejects TypeScript parameter properties.** esbuild bundles
   them happily, so the bundle works and no test can import the file.
