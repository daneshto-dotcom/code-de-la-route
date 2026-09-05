# S129 BATCH PDR — Full tier

Owner selected four items (AskUserQuestion, S129 boot). Rulings taken: LUT collision =
"leave it excused for now" (no-op, recorded). Quest pocket = "show me the frames again"
(frames sent; zone-2-head gated on his letter).

## COUNCIL — 3-way, round 1 (Claude proposal / Grok ANALYST / Gemini AUDITOR)

My proposal was: token via `Sec-WebSocket-Protocol`, verified at the Worker, playerId
passed inward to the DO as a trusted header, `hello` keeps supplying name/level.

### CONVERGED — both models, independently
1. **The transport premise was WRONG.** I argued the subprotocol header is safer than a
   query string. Both refute it: Cloudflare logs the full URL *and* the
   `sec-websocket-protocol` header on the upgrade request. Transport is not the lever.
2. **TTL is the lever.** A 30-day bearer token in either place is a durable credential in
   logs. Grok: exposure window 300 s vs 2 600 000 s.
3. **Plant the exact fault.** Assert the no-credential connection is REFUSED, and assert a
   `hello` carrying a different playerId is IGNORED.

### DISAGREED — and this is the decision
- **Grok:** short-lived single-use ticket in the query string, flatly better.
- **Gemini:** a ticket "violates the no-DB constraint" — single-use needs somewhere to live.

**SYNTHESIS (mine, and neither model stated it):** make the ticket **stateless** — an HMAC
over `(playerId, realm, parcel, nonce, exp+120s)`. Short TTL without single-use needs NO
storage, so it keeps the documented "presence touches no database" constraint AND collapses
the exposure window from 30 days to 2 minutes. Scoping it to realm+parcel also stops a
captured ticket being useful anywhere else. This resolves the split rather than picking a side.

### GEMINI-UNIQUE — the finding that changes the plan
4. **A one-shot deploy BRICKS live presence.** One `wrangler deploy` ships the assets and
   the Worker together. Browsers holding a cached `main.js` connect with no credential, get
   401, and presence stays broken until a hard refresh. **Mitigation: two-phase rollout** —
   phase 1 accepts both and counts the unauthenticated, phase 2 makes it mandatory.
5. **Fan-out DoS.** An authenticated attacker opens thousands of sockets, each instantiating
   a DO, against free-plan limits.

### GROK-UNIQUE
6. **`ws.protocol` is readable by any same-origin script after connect** — an XSS reads the
   token straight out of the subprotocol. A specific argument against the transport I chose.
7. **Close code 1006.** A 401 upgrade reaches the browser as a generic error; the client
   cannot tell "session expired" from "presence is off". Needs a distinguishable path.
8. **Threat-model calibration:** on the free plan the billing angle is thin. Accepted — the
   real harm here is impersonation and griefing, not spend. Scope is set by that, not by DoS.

## PRIME-AUDIT (Rule 20)
- **Rubber-stamped:** both accepted "verify at Worker, pass playerId inward by header"
  without challenge. Checked independently: a DO is not publicly addressable and is reachable
  only through a binding, so a header set by the Worker cannot be forged by a client. Sound.
- **Consensus masking disagreement:** ticket-vs-subprotocol was a REAL split, reported as a
  split above, not as convergence.
- **Runtime-verifiability (boot-then-smoke):** finding #4 is exactly this class — the design
  static-parses fine and breaks on `wrangler deploy`. It is in the plan, not in a comment.
- **Still open after synthesis:** name/level/class remain client-asserted. NOT claimed as
  fixed; lands as a named finding (see P1 scope).

## PRIORITIES

### P1 — CF-S122: authenticate presence + lobby  [Standard->Full, security, LIVE]
- Stateless scoped ticket: `POST /api/realm/<r>/presence-ticket` (Bearer-authed, reuses
  verifyToken) mints HMAC over (playerId, realm, parcel, nonce, exp = now+120s).
- Worker verifies the ticket on the upgrade, BEFORE any DO is instantiated. Same for LOBBY
  (same hole, same fix — Gemini (e)).
- Verified playerId passed inward on the Worker->DO fetch as a trusted header; DO takes
  identity from that header ONLY and ignores any client-supplied id.
- **Two-phase rollout.** Phase 1: accept both, count unauthenticated. Phase 2 (a later
  session, after the count reaches zero): mandatory. Phase 2 is NOT claimed this session.
- Remaining, recorded not hidden: `CF-S129-PRESENCE-NAME-IS-CLIENT-ASSERTED`.
- Tests: no-credential REFUSED; wrong-parcel ticket refused; expired ticket refused; `hello`
  with a foreign playerId IGNORED. Plant each fault before trusting the guard.

### P2 — CF-S128-ARBORETUM-IS-PLANTED-BY-ARITHMETIC  [Micro, art]
Break the `%3`/`%2` lattice with the deterministic walk `paint_pond` uses; add a second crown
tile. Honour DEC-S127 "scenery with good variety" — variety half, interactables stay out.

### P3 — CF-S128-POND-SHAPE-IS-INVENTED-WITHIN-A-MEASURED-FRAME  [Micro-Standard]
Register the pond outline against the satellite rather than authoring inside a measured frame.

### P4 — CF-S127-HARVEST-UNVERIFIED  [Standard]
40 candidate entries from five agents, S110-S126, including corrections to entries that are
actively wrong. Verify then write. Last attempt's 30 verifiers died to a spend limit — so
verify in BATCHES and commit each batch, per Rule 0 (commit frequency, not stopping early).

### P5 — zone-2-head (20x33)  [GATED on his letter]
Frames sent. On his answer: build the parcel, then open zone-2-pond row-0 hedge at cols 2-3
and add the warp pair. The S128 border guard will hold me to it.

## TESTING
`npm run check` (16 guards) + `npm test` (16 suites) + `npm run check:site` green after EVERY
priority, committed and pushed individually. Deploy verified by HASHING the live bundle.

## ROLLBACK
Each priority is its own commit. P1 phase 1 is additive-only (accepts both), so it cannot
break a cached client; that is the entire reason it is split.

## OWNER-VISIBLE RISK
P1 is bigger than "add a token" because the Council found the live-client hazard. I am
shipping phase 1 only. Anyone reading "presence is authenticated" should read it as
"presence CAN be authenticated and counts who is not" until phase 2 lands.
