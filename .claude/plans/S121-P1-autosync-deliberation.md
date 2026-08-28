# S121-P1 — AutoSync: A.0 State-Discovery + Council + PRIME-AUDIT
Session: S121 | Status: IN-PROGRESS (awaiting owner approval)

## A.0 STATE-DISCOVERY (Rule 21) — every claim probed, not assumed

| # | Claim (from S120 plan / boot snapshot) | Verdict | Evidence |
|---|---|---|---|
| 1 | `push()` called from exactly TWO sites, both Restart.ts | CONFIRMED | Restart.ts:63, :73 — only `.push()` hits in src/ |
| 2 | Nothing uploads during play | CONFIRMED | no other caller exists |
| 3 | Baseline green: 3,155 assertions | CONFIRMED | `npm test` -> "3155 assertions, 0 failed" |
| 4 | Typecheck green | CONFIRMED | `tsc --noEmit` clean |
| 5 | NINE guards, not twelve | CONFIRMED | package.json `check` = realm:build + 9 `check:*` |
| 6 | Docker leaks lotr-pg-test containers | CLEAN NOW | `docker ps -a` -> none present |
| 7 | SaveStore may never import RemoteSave | TRUE, **BUT UNGUARDED** | law is a header comment (Restart.ts:33-36); boundary-check.ts enforces ONLY the frozen-build freeze line |
| 8 | "a local save on every step" | CONFIRMED + QUANTIFIED | ParcelScene.ts:2093 (step), :2047 (turn); STEP_MS=190 -> **5.26 saves/s, 316/min** |
| 9 | sendBeacon usable for flush | **REFUTED** | token is an `authorization` header (RemoteSave.ts post()); sendBeacon cannot set headers. Must use `fetch keepalive` |
| 10 | save size vs transport caps | MEASURED | fresh save = **830 B**; server ceiling 256 KB; keepalive cap 64 KB -> 79x headroom today, ceiling mismatch is real |
| 11 | injectable-clock idiom exists | CONFIRMED | Handlers.ts:65 `now: () => number` "so a test can pin time without sleeping" |
| 12 | sentinel guard exists | CONFIRMED | `saveStore.hasPlayed` (SaveStore.ts:794) |
| 13 | a UI surface for sync exists | **REFUTED — none exists** | Journal account page shows username only (Journal.ts:607) |
| 14 | reusable notice band exists | CONFIRMED | Journal.ts:629-634 (`acctConfirm` band at H-36) |

## DELTA vs THE PRE-TAKEN PLAN (surfaced BEFORE approval, per Rule 21)

**DELTA-1 — the specified debounce cannot work.** Plan says "push ~5 s after the last local write."
At 5.26 writes/sec a pure trailing debounce is reset 5x/second and NEVER fires while the player walks.
The plan's own negative test ("count /api/save over 60 s of walking, assert a handful not hundreds")
would PASS WITH ZERO — a test that cannot fail (repo tag: #i-wrote-a-test-that-could-not-fail).
FIX: add a MAX_WAIT ceiling (~30 s). 316 writes/min -> 2 pushes/min.

**DELTA-2 — autosync ACTIVATES a latent last-write-wins path. (THE BIG ONE.)**
main.ts:200-202, on divergence, calls `keepLocal(upstream.revision)` — which sets this device's
revision to the SERVER'S CURRENT one (RemoteSave.ts:411-413). Today that is inert because nothing
pushes. With autosync: boot diverges -> keepLocal(N) -> player takes ONE step -> push built on N ->
server CAS MATCHES -> accepted -> **the other device's world is silently destroyed.**
Autosync as planned turns a benign standoff into exactly the last-write-wins that push()'s own
header forbids. This is a bigger trap than the `stale` trap the plan named.

**DELTA-3 — the two-tab hazard is structural.** `#state` is read ONCE at module construction
(RemoteSave.ts:229) and never re-read. Two tabs share one SYNC_KEY but diverge IN MEMORY, so the
second tab pushes a revision correct at ITS page load and now behind -> guaranteed 409.

## COUNCIL (3-way, Standard tier) — Grok ANALYST + Gemini AUDITOR

CONVERGED, both models independently:
- C1 HIGH: permanent-disarm-on-stale + multi-tab = one tab bricked, no recovery path.
- C2 HIGH: "surface the conflict" is not a design. Needs an explicit resolution choice
  (keep local / take remote), else the player is stranded.
- C3 MED: the node test harness cannot simulate pagehide/bfcache/multi-tab; those tests would be
  partly self-confirming.

GROK ONLY:
- `visibilitychange:hidden` fires on every alt-tab/minimize -> push spam. VALID: gate flush on dirty.
- in-flight guard under-specified: if state changes mid-push, must re-arm and send the LATEST.
- keepalive with non-simple headers is throttled on some browsers. Partially valid.
- suggests polling instead of the onSave observer. **REJECTED** — 5 no-op calls/sec is negligible,
  and polling would both miss the last-write timing and wake when idle.

## PRIME-AUDIT (Rule 20) — adversarial pass on the Council itself

- **Gemini's mechanism was WRONG.** It claimed push() updates revision in memory but "does NOT write
  to localStorage". FALSE: RemoteSave.ts:437 calls `writeSync`. The CONCLUSION survives via a
  different route (the read-once `#state` cache, DELTA-3). Right answer, wrong reason — logged so it
  is not propagated as fact.
- **Not rubber-stamped:** Grok's polling suggestion rejected with reasoning (above).
- **Runtime-verifiability:** the debounce/CAS/outcome logic IS unit-testable with an injected clock.
  pagehide/keepalive/bfcache and true multi-tab are NOT — that limit is stated in the PDR rather
  than hidden behind a green test run. Static parse != runtime validation.
- **Consensus masking disagreement:** none found; both models attacked the same two points.

---

# RESEARCH PASS (owner-directed, S121) — "how do the best games make this flawless?"

Owner paused the PDR and asked for research before choosing. Below = MY OWN primary-source reads.
Seven-track research workflow + recon verify pass still in flight; fold in when they land.

## R1. BROWSER EXIT — the truth, from the spec, not folklore
- **visibilitychange -> hidden is the last reliably observable moment.** pagehide is next-best.
  beforeunload/unload are NOT reliably fired, especially on mobile.
  https://developer.chrome.com/docs/web-platform/page-lifecycle-api
  https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event
  => use BOTH, primary = visibilitychange:hidden. Gate on dirty (alt-tab fires it constantly).
- **fetch keepalive cap = 64 KiB, summed across ALL inflight keepalive bytes per fetch group** —
  not per-request. Exceeding it returns a GENERIC network error indistinguishable from any other.
  https://github.com/whatwg/fetch/pull/419  https://github.com/whatwg/fetch/issues/1816
  => in our post(), that lands in catch -> null -> isOutage -> "offline", i.e. SILENT.
     Measured headroom: 830 B of 65,536 = 79x. Fine today; assert it so it stays fine.
- sendBeacon remains impossible: the token is an `authorization` header.

## R2. iOS SAFARI DELETES localStorage — THE ARGUMENT FOR THIS WHOLE PRIORITY
Safari ITP erases ALL script-writable storage (localStorage, IndexedDB, SessionStorage, service
workers) after **7 days of Safari use without interaction with the site**. Since iOS 13.4/Safari 13.1.
  https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
  https://support.didomi.io/apple-adds-a-7-day-cap-on-all-script-writable-storage
=> A player who plays on an iPhone and returns in 8 days has NO WORLD LEFT. Cloud save is not a
   convenience; on iOS it is the ONLY durable storage. Exception: home-screen web apps get their
   own counter. This materially raises the value of S121-P1.

## R3. THE CLOSEST TWIN GETS IT WRONG — Melvor Idle (localStorage + optional cloud)
Cloud sync happens essentially **on launch only**; players are told to hit "force save" before
closing; a new local character can OVERWRITE the cloud save. Steady stream of complaints.
  https://steamcommunity.com/app/1267910/discussions/0/591759644586721795/
  https://github.com/MelvorIdle/melvoridle.github.io/issues/1523
=> This is EXACTLY our current bug plus a silent-overwrite hazard. Strong negative example: do not
   ship "syncs at launch, force-save by hand".

## R4. REAL AUTOSAVE CADENCE — we were about to be 30x more aggressive than shipped games
| Game | Setting | Default |
|---|---|---|
| ARK: Survival Evolved | AutoSavePeriodMinutes | **15 min** |
| Rust | server.saveinterval | **600 s** (10 min) |
| Project Zomboid | SaveWorldEveryMinutes | **0** = no timed save; save on quit/unload |
  https://scalacube.com/help/gameservers/ark/how-to-change-ark-save-interval
  https://shockbyte.com/help/knowledgebase/articles/how-to-change-how-often-your-rust-server-saves
  https://theindiestone.com/forums/index.php?/topic/44163-change-saveworldeveryminutes-default-to-a-reasonable-interval/
=> Dedicated servers persist world state every 10-15 MINUTES, and PZ defaults to "only on exit".
   The trade-off they discuss is save-induced stalls. Our proposed 30 s ceiling is already far more
   aggressive than any of them. This is an empirical anchor for the cadence decision.

## R5. MMOs: PREVENT, not merge — but the lock has a real cost
WoW does not merge divergent saves; the character is LOCKED by the world server. An unclean logout
leaves a ghost session and the player meets "a character with that name already exists"; the lock
clears on a timeout of roughly 30 minutes, or by logging into another character on the realm.
  https://us.forums.blizzard.com/en/wow/t/unable-to-log-in-a-character-with-that-name-already-exist/1498325
=> Confirms the hypothesis (PREVENT beats MERGE) AND names its price: a stale lock is its own
   infamous failure. Any lock we adopt needs a TTL and a self-service way out.

## R6. GOOGLE PLAY GAMES — the documented conflict API, and it prefers asking
Resolution policies: MANUAL (return the conflict to the app), MOST_RECENTLY_MODIFIED,
LONGEST_PLAYTIME (ties -> last known good), LAST_KNOWN_GOOD, HIGHEST_PROGRESS. Google's guidance:
usually the user decides; present a UI to choose.
  https://developers.google.com/games/services/android/savedgames
  https://developers.google.com/android/games_v1/reference/com/google/android/gms/games/snapshot/Snapshots
=> Note what makes MANUAL usable: the snapshot carries METADATA (playtime, description, timestamp,
   cover image) so the choice is informed, not a coin flip. Our save has updatedAt and a character
   sheet — enough to describe both sides honestly.

## R7. SINGLE-SESSION ON A STATELESS BACKEND — the token-version pattern
An integer stamped on the account and carried in the token; validation rejects any token whose
version is behind. Standard technique for invalidating older sessions without server-side session
state — which is exactly our shape (stateless Worker + Postgres, no socket).
  https://www.technetexperts.com/jwt-token-versioning-stale-data/
  https://skycloak.io/blog/jwt-token-lifecycle-management-expiration-refresh-revocation-strategies/
=> Gives us MMO-style "one active session" semantics without a persistent connection.

---

# RECON + ADVERSARIAL VERIFY (10 agents, 0 errors) — CORRECTIONS TO THE RECORD

## Corrections to boot-snapshot.md / the recorded gate figures

**X1. The NINE-guard COUNT is right; the boot snapshot's REASON for it is WRONG.**
Snapshot says "the other 3 PASS lines are from `realm:build`". `tools/realm-build.ts` contains
ZERO "PASS" strings (grep + full read; it prints `realm.db:`, `by layer:`, `needs_resample:`).
The 3 extra PASS lines come from **`prebuild` -> `npm run admin`** (npm fires prebuild as a
lifecycle hook before build): `world-index: PASS`, `tile-library: PASS`, `explorer: PASS`.
So a full `npm run build` prints **12 PASS = 9 guards + 3 generators**. The "12" is real; the
attribution was wrong. (Guard #9 = `site-check.ts`, runs only under `npm run site`.)

**X2. "3,155 assertions" is ONE SUITE, not the suite total.**
3,155 is `save-migration` alone. Measured across all six legs of `npm test`:
surfaces 13 + box 25 + accounts 58 + stats 65 + save-migration 3,155 = **3,316**, plus
evidence-check's 12 refusals + 1 control = 3,329. Nothing sums or enforces the tally, and
`.github/workflows/rebuild-ci.yml:99-100` misattributes the per-suite numbers (it is self-refuting:
line 110 says account-rules is 58 while line 100 pairs 65 with it). Quote the number as
"3,155 (save-migration)" or use 3,316 — do not call 3,155 the total.

## Empirically settled (an agent created the file, ran the guards, deleted it)

**X3. `src/core/AutoSync.ts` importing BOTH SaveStore.ts and RemoteSave.ts PASSES everything.**
`check:boundary` -> `boundary: 33 source files scanned` + `import boundary: PASS`;
`check:surfaces` PASS; `tsc --noEmit` exit 0. Same import shape as Restart.ts:38-39.
Trap: boundary Pass 1 matches LITERAL TEXT, so any specifier merely CONTAINING `../src/` is
flagged regardless of where it resolves. Use `./SaveStore.ts` / `./RemoteSave.ts`.

**X4. No guard defends SaveStore -> RemoteSave.** Confirmed twice, independently. It is a
convention held only by comments. (Candidate carry-forward: give it a guard.)

## THE TEST DESIGN IS CONSTRAINED HARDER THAN I THOUGHT

**X5. `BASE = '/api'` is RELATIVE, so under Node `fetch('/api/x')` THROWS "Failed to parse URL".**
There is no degraded real-fetch path. Faking `globalThis.fetch` is MANDATORY for any RemoteSave or
AutoSync test, not optional.

**X6. The failure is SILENT and will eat a badly written test.** `post()` and `get()` both
`catch { return null; }` (RemoteSave.ts:177-179, :190-192) -> a fetch-fake mistake surfaces as a
normal `offline` outcome, NOT as a thrown error. Assertions MUST target the returned
Outcome/PushOutcome union, never `rejects`.

**X7. The fetch seam is module-private.** `post()`/`get()` are module-level functions and
`class RemoteSave` is NOT exported (only the `remoteSave` singleton is). There is no constructor or
instance injection point. The ONLY seam is monkeypatching `globalThis.fetch` BEFORE a cache-busted
dynamic import. That idiom already exists: `installStorage()` + `await import(... '?case=' + N)` in
`tools/save-migration.test.ts` (used twice: ~138-142 and ~418-420). Reuse it; do not invent one.

**X8. There is not one `setTimeout`/`setInterval`/`requestAnimationFrame` in all of `src/`.**
(grep exit 1.) Timing today is Phaser's `time.delayedCall` (10 sites in ParcelScene, 1 in Interact).
AutoSync must stay Phaser-free, so an INJECTED scheduler is not a nicety - it is the only way to
add a timer without either importing Phaser into core or hard-coding a global.

## NEW HAZARDS THE PLAN DID NOT NAME

**X9. SIGN-OUT ARMS THE DEBOUNCE AND THEN DESTROYS THE PAGE.**
`saveStore.signOut()` calls `this.save()` (SaveStore.ts:1042) and `Journal.ts:1166` calls
`location.reload()` on the very next statement. A save-write-driven debounce is therefore armed BY
the sign-out itself, immediately before teardown -> `pagehide` -> flush. Must be handled explicitly.

**X10. `Journal.say()` DRAWS NOTHING ON THE ACCOUNT PAGE.** `this.notice` is rendered only inside
`drawKeysPage` (Journal.ts:504-513). The account page's band is a separate thing driven by
`acctConfirm` (:627). So "surface it with say()" would be invisible - the exact class of bug S120
already paid for ("a label computed for four pages and printed on one").

**X11. The conflict message is ALREADY DUPLICATED** - `AccountRules.ts:190` and a hard-coded copy at
`RemoteSave.ts:444`. Two edit sites for one player-facing string.

**X12. keepalive 64 KiB vs SAVE_MAX_BYTES 256 KiB IS "two places deriving one number"** - the repo's
own standing law (Restart.ts:28-31). A payload between 64 KiB and 256 KiB is accepted by ordinary
push() and silently refused by the browser on the flush path. Derive one ceiling, or assert the gap.

**X13. ResumeGate does NOT reload the page** (only `finish()` -> `resolve()`); only the two
`Journal.ts` paths (:1166 sign-out, :1184 restart) tear the page down. A pagehide flush does not
fire on the ResumeGate restart path.

**X14. "Wire after openGate() because signedIn is false until then" is FALSE for returning players.**
`#state` is read from localStorage at module construction (RemoteSave.ts:229), so `signedIn` is
already true before `openGate()` runs - which is exactly why `AuthGate.ts:172` short-circuits. The
conclusion (wire after the gate) survives, but only for the fresh-login case.

**X15. Four modules import the singleton**, not three: Restart.ts:39, AuthGate.ts:38,
ResumeGate.ts:46, and **main.ts:32** (the boot pull path - the one most likely to race a debounce).

## HOUSEKEEPING DONE THIS SESSION
- A probe agent left an untracked `src/core/AutoSync.ts` guard-fixture (65 B, broken import) in the
  tree. Caught by the adversarial verifier. Confirmed gone; tree re-verified clean.
- `rebuild/src/art/world-index.json` churned (exactly 1 line, mtime only, no content change) because
  a probe ran the build. Reverted. This is CF-S120-WORLD-INDEX-MTIME-CHURN behaving as documented.
- Docker: no `lotr-pg-test-*` containers leaked.

---

# SCOPE AMENDMENT (Rule 16) — OWNER REFRAME: A LIVING, MULTI-SERVER, TICKING WORLD

Owner, verbatim: "this game will have multiple servers, this is just the first one and its real time
(time is ticking) like in real multiplayer games... so when a user logs in and out it saves his
progress but the world keeps living... need to make sure that it is logical, consistent and coherent
with this"

This is a MATERIAL scope change and it lands BEFORE any code was written. Good timing: it changes
the recommendation rather than invalidating shipped work.

## THE CENTRAL CONSEQUENCE

**S121-P1 as planned would entrench the wrong ownership model.** The plan is "upload the whole save
blob". But the blob mixes PLAYER state with WORLD state, and in a living shared world the world half
is NOT the player's to carry. Autosyncing the blob makes every player the author of their own
private copy of a world that is supposed to be shared and ticking.

The codebase ALREADY KNOWS THIS. SaveStore.ts:246-247, verbatim:
    /** WORLD state. See WorldItems — this is the half a server takes over. */
    world: WorldItems;
and WorldItems' own header (SaveStore.ts:204-214), verbatim:
    "A bottle on the cellar ledge is not MY bottle — in a multiplayer world two players look at the
     same shelf and must see the same thing. So what has been taken from a container, and what is
     lying on the floor, is WORLD state and belongs to the server the day there is one. What is in
     my hands is PLAYER state and stays mine. Folding the two together would work perfectly today
     and make multiplayer a rewrite."
The author called this exact shot. The day has arrived.

## COHERENCE DEFECT 1 — `worldFlags` IS MISNAMED, AND THE NAME IS A LOADED GUN

Measured: the ONLY keys ever written to worldFlags in the whole of src/ are:
    era          ('2026' | otherwise 1601)
    intro.seen   (true once the arrival film has played)
Both are PER-PLAYER NARRATIVE PROGRESS, not world state.

If a future session moves `worldFlags` server-side BECAUSE THE NAME SAYS WORLD, the game breaks in a
specific and humiliating way: every player shares one `intro.seen`, so the second player to register
never sees the arrival film; and every player shares one `era`, so logging in yanks strangers
between centuries. Rename or re-home it BEFORE anything reads the name as a spec.

Correct split as it stands today:
    PLAYER : position, carry, sketchbook, keymap, handedness, character, account, era, intro.seen
    WORLD  : world.taken (container -> count removed), world.dropped ("parcel:x,y" -> item)

## COHERENCE DEFECT 2 — TWO CENTURIES ON ONE PIECE OF GROUND

`era` is per-player and the same land exists as TWO parcels (zone1 = 1601, zone1_2026 = modern;
ONE GENERATOR emits both — architecture fact #1). So two players can stand on the same tile in
different centuries. Any presence/visibility/world-state scoping MUST be keyed by (shard, era, parcel),
never by parcel alone, or 1601 players will see ghosts from 2026 and share a shelf across 425 years.

## COHERENCE DEFECT 3 — `world.dropped` HAS NO DECAY AND GROWS FOREVER

`dropped` is "parcel:x,y" -> item tile name, with no expiry of any kind. Single-player, bounded by
one person's patience. In a shared living world it is an unbounded, permanently-growing, shared map
— the exact problem Ultima Online and EverQuest solved with item decay, and Rust/ARK with decay
timers. It also collides with SAVE_MAX_BYTES (256 KiB) eventually. Needs a decay/eviction policy
BEFORE the map is shared, not after.

## COHERENCE DEFECT 4 — GLOBAL USERNAME UNIQUENESS vs MULTIPLE SERVERS

`schema.sql` enforces GLOBAL case-insensitive uniqueness on player.username. With multiple realms
the near-universal industry model is per-realm character names over a global ACCOUNT. Decide this
before the first extra server exists — WoW's connected-realm name-collision fallout is the cautionary
tale. Cheap now, migration-with-forced-renames later.

## COHERENCE DEFECT 5 — THE SERVER MODELS NO WORLD AT ALL
`schema.sql` has exactly two tables, `player` and `save` (one blob per player, PK player_id). There
is no world table, no realm/shard column, no clock, no tick. And its own header states the current
philosophy plainly: "The client is authoritative offline and syncs a whole v6 blob." That sentence is
the thing the reframe retires: a client cannot be authoritative over a world it shares.

## WHAT IS NOW THE OPEN QUESTION (research in flight, wf_757dcb77-cdd)
Whether a living world needs a RUNNING LOOP at all, or whether world time can be a PURE FUNCTION of
a timestamp computed on read (EVE-style "trains whether you are logged in or not"). If the latter,
a stateless Worker can host a ticking world with NO always-on process — which would make the whole
thing dramatically cheaper and simpler. This is the crux and it decides the architecture.

---

# THE DECIDING FACT — PRODUCTION IS SWITCHED OFF (verified first-hand, 2026-08-28)

    curl https://legacyoftherealm.com/           -> HTTP 200   (site is live)
    curl .../api/load  -H "authorization: ..."   -> HTTP 503   {"error":"not-configured"}
    curl -X POST .../api/register                -> HTTP 503   {"error":"not-configured"}

`worker.ts` `configuration()` returns 503 when DATABASE_URL is unset or SESSION_SECRET fails.

CONSEQUENCES, and they reorder the whole session:
 - ZERO accounts exist. The `save` table has NEVER held a row.
 - `remoteSave.signedIn` is false for every human alive -> push() returns 'signed-out' and cannot
   upload even from the two Restart.ts call sites.
 - So "nothing uploads during play" is UNDERSTATED: nothing uploads EVER, the only upload path is
   the erase-my-world button, and the database it would upload to is not attached.
 - **My own PDR had the order wrong.** I ranked autosync P1 and Neon P2. But autosync cannot be
   verified end-to-end without the database, so P2 GATES P1. Correcting this openly.
 - **There is no data to protect.** Every schema decision is free RIGHT NOW and becomes a migration
   the moment the first real player registers.

# THE ONE PLAN (supersedes the earlier draft PDR)

## P0 — OWNER, ~60 seconds + one $5/mo decision. Everything is downstream of this.
Neon pooled string for the EXISTING project `legacy-of-the-realm` into `legacy_realm_db.pooled` in
the vault (NOT into chat). Then agent-side: apply schema, `wrangler secret put DATABASE_URL` piped
from the vault, FRESH 32-byte SESSION_SECRET (never vercel.jwt_secret).
THE $5 IS LOAD-BEARING, MEASURED: PBKDF2 x100,000 ~= 29 ms vs Workers **Free = 10 ms CPU/request**.
Login FAILS on Free once a database exists. Either take Workers Paid or weaken real people's
password hashing. Recommend Paid.

## P1 — `realm_id` IN THE PRIMARY KEY. Three lines. The ONLY irreversible-if-skipped item.
`save.player_id UUID PRIMARY KEY` -> `PRIMARY KEY (player_id, realm_id)`, default `'chazeuil-i'`.
Route becomes a PATH segment `/api/realm/:realmId/save` (a missing path segment 404s loudly; a
missing body field corrupts silently). Backfill cost TODAY: **zero rows**. After the first
registration: a migration with live players on it. This is the entire content of "multiple servers,
this is just the first one" for the next year, and it costs three lines while the table is empty.
Also decide now: character names per-realm over a global ACCOUNT (today username is GLOBALLY unique).

## P2 — THE ACTUAL BUG: flush-on-hide + a debounced push. ~30 lines, touches no schema.
`visibilitychange -> hidden` PRIMARY (Chrome's Page Lifecycle guidance: the last reliably observable
moment), `pagehide` as backup, NEVER `unload`/`beforeunload` (not fired on mobile tab-close).
`fetch(..., {keepalive:true})` — sendBeacon is impossible, the token is an `authorization` header.
Debounce QUIET + a MAX_WAIT ceiling (a pure trailing debounce is reset 5.26x/sec and never fires
while walking; the originally planned negative test would have PASSED WITH ZERO).
Guard the payload at 64 KiB AT THE FLUSH SITE — SAVE_MAX_BYTES is 256 KiB, 4x the keepalive cap, and
over it the browser returns a generic network error that post() reads as "offline". Silent.
Cadence anchor, measured from shipped games: ARK 15 min, Rust 600 s, PZ 0 (exit only). Anything in
the tens of seconds is already far more aggressive than the genre.

## P3 — THE WORLD CLOCK AS A PURE FUNCTION. **This IS "the world keeps living."**
One immutable `realm.epoch` column + `realmClock(serverNow)`. Day/night, restock windows, decay
horizons, a festival countdown — every one of them `f(epoch, now)` evaluated ON READ. Identical for
every viewer, zero stored state, zero Durable Object, zero alarm, zero tick, zero cost.
Server STAMPS time on every response; never trust `Date.now()` (player-controlled). Anchor the
client on (serverNow, performance.now()) — monotonic.
FFXIV is the best-attested precedent: 1 Eorzean hour = 175 s, day = 4200 s, weather hashed from the
epoch with no server contact. Proposal: 1 realm hour = 180 s -> 20x -> a realm day = 72 minutes, so
a player logging in each evening sees a different sky.
While here: make `zone1_2026` READ-ONLY (no takes, no drops). It is a tourist view of the same
ground; that halves the world-write surface by fiat and makes the era-in-the-key problem trivial.

## P4 — RENAME THE LIE, EXPAND-ONLY.
Add `progress` alongside `worldFlags`; read `progress ?? worldFlags`; contract later on telemetry,
never on a date (cached browser bundles are stale producers you cannot force to upgrade).
`era` and `intro.seen` are per-player progress living in a field named after the world.
State the rule in one sentence so it cannot be half-applied: **`era` is player-owned AND world-keyed**
— it stays in the player save, and it must appear in every world key `(realm, parcel, era)`.

## P5 — DEFER the world table and the Durable Object until two humans have actually stood in the
same parcel. Zero accounts exist; contention is zero and stays zero until P0 lands AND two people
are in one cellar within seconds. When that day comes, do the cheap thing first: per-character
("multi-tap") containers for ordinary foraging, realm-authoritative rows only for scarce or
ceremonial objects. And give `world.dropped` a decay policy BEFORE it is shared — it is an
unbounded, permanently-growing map today, which is what UO/EverQuest invented item decay to solve.

# PRIME-AUDIT ON THE CRITICS (Rule 20 — do not rubber-stamp the reviewer either)
- **REJECTED, manufactured bug:** the applicability critic's A2.3 claims `dropped[key] = item`
  "overwrites unconditionally" at SaveStore.ts:1331/:1386 and is a data-loss/grief primitive. FALSE.
  Both sites are guarded by `if (this.itemAt(parcel,x,y) !== undefined) return null;`, and :1355 is a
  comment proving the author already knew. The only unguarded write is the deliberate SWAP. Verified
  by reading all 8 `dropped[` sites.
- **SOURCING CAVEAT that must not propagate:** large parts of the MMO sweep quote TrinityCore /
  AzerothCore / HeavenMS — FAN EMULATORS — as if they were Blizzard/Nexon mechanism. "WoW saves every
  90 s", the MapleStory `loggedin` column, the 30-minute character lock: all emulator config or
  forum-sourced. The SHAPE (prevent, don't merge) survives; the NUMBERS do not.
- **CONTRADICTION resolved:** one track called `world.taken`'s delta shape correct because
  "increments commute". Wrong. Increments commute against ONE shared counter; two per-player blobs
  each holding taken:2 against a 4-bottle ledge are two independent views, and the ledge serves
  eight. The delta shape is right for a PLAYER document and wrong the instant the container is shared.
- **Accepted and load-bearing:** the production probe. Six research tracks reasoned as if the save
  path were live. It is 503. That is a Rule-21 state-discovery failure repeated six times, and it is
  the reason this plan is ordered the way it is.
