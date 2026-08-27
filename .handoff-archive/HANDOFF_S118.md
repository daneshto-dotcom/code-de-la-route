═══════════════════════════════════════════════════════════
HANDOFF — Legacy of the Realm
Generated: 2026-08-22 | Session: **S118 — THE GAME GREW A FRONT DOOR THAT OPENS
ONTO A COMIC BOOK**
(3 priorities + one owner-found defect. All complete. All pushed.)
═══════════════════════════════════════════════════════════

## THE THREE THINGS THAT MATTER WHEN YOU WAKE UP

## THE GAME IS LIVE. THIS IS THE FIRST TIME IT HAS EVER BEEN ON THE INTERNET.

    https://legacy-of-the-realm.saras-fdtta.workers.dev

Deployed as a **Cloudflare Worker with static assets** (not Pages), named
`legacy-of-the-realm`, 15 files. VERIFIED by request, not by assumption:

| | |
|---|---|
| `index.html` | 200 · 6,374 bytes · correct `<title>` + the ENTER THE REALM card |
| `dist/main.js` | 200 · 1,423,515 bytes |
| `dist/art/atlas.png` | 200 · 18,309 bytes |
| `dist/comic/page-01-the-queue.png` | 200 · 2,496 bytes |

The URL is public ("Anyone with this URL can visit"), so it is shareable as-is.
Development Mode being on is irrelevant — it bypasses cache, it never blocks
visitors, and it self-expires in 3 hours.

### `legacyoftherealm.com` IS STILL 502, AND THE FIX IS "ADD ROUTE", NOT "ADD DOMAIN"

**Add Domain fails** with: *"Hostname 'legacyoftherealm.com' already has externally
managed DNS records (A, CNAME, etc). Delete them first."* That is the old dead-tunnel
record from 2026-07-17 still sitting on the root.

**Do NOT delete DNS records to clear it.** The domain carries live inbound email:

    legacyoftherealm.com  MX 10  inbound-smtp.eu-west-1.amazonaws.com

Deleting the wrong row while clearing the way takes email down with the tunnel.

**Use `+ Add Route` instead** — a Worker Route binds to an EXISTING proxied DNS
record, and the root is already proxied (it resolves to Cloudflare anycast
`188.114.96.2/97.2`). The Worker then intercepts before Cloudflare ever tries the dead
origin, so the 502 cannot occur and nothing in DNS is touched:

    legacyoftherealm.com/*          zone: legacyoftherealm.com
    www.legacyoftherealm.com/*      (optional, www is proxied too)

Only if Add Route refuses: DNS -> Records -> delete **only** the ROOT record of type
`A`/`AAAA`/`CNAME` (the tunnel one, likely a CNAME to `...cfargotunnel.com`) and
**never** the `MX` or any `TXT`.

---

**2. The arrival is a comic book.** Eight pages. The AI film is gone. 37.4 MB → **26 KB**.

**3. Your chat-bubble defect is fixed**, and measured: Dael's line wraps to 4, the
body ran to y=286, the box's inner edge was 282 — **+4px overflow**. `BOX_H` is now
the *sum of what has to fit* rather than a magic 56, so the box cannot be too short
for its own contents. After: **−2px, i.e. 2px of clearance.**

---

## PROJECT
- Parent `main` @ `HEAD` · submodule `master` @ `ac1ae1e`  (exact SHAs in `.claude/session-state.json`)
- **EVERYTHING IS PUSHED.** Both `rev-list --count origin/…` = **0**.
- Build **9 checks** · `tsc` clean · tests **13 + 25 + 55 + 3,029** · gitleaks clean (588 commits)
- **NEW: guard #9 `check:site`** and **guard #10 `check:comic`**, both negative-tested
- Context at close: ~420K / 1M (42% GREEN)

---

## THE ONE THING I GOT WRONG THAT IS WORTH YOUR TIME

I built the cutscene twice.

**Attempt 1** composed every panel out of the game's own atlas tiles, with the
protagonist being `player.png` itself. The reasoning was airtight: the AI film's
worst failure was the protagonist drifting between shots, and if he *is* the same
bytes in every panel then drift is impossible by construction. It also meant the
gate in the comic was the gate in the game, tile for tile, so nothing could be
invented — the film's gap list admits *"shot 8's crenellated tower is invented."*

You looked at it and said: *"it looks like a part of the game. its not correct."*

You were right, and the interesting part is **why no amount of measuring would have
caught it.** A cutscene's job is to read as a *different medium* from the game. I had
optimised the one property that guaranteed it would read as the *same* one. Every
other defect this session fell to a number. This one could only be found by a person
looking at it — which is exactly what §13.1 is for, and it is now the seventh rule in
the boot snapshot: **measured is not the same as correct.**

**Attempt 1 is committed, not deleted** (`46f91f5`) — partly as the record, partly
because you noted the paged text-and-picture machinery is *"usefull nevetheless for
later purposes."* It is the right shape for quest windows.

---

## WHAT THE COMIC IS

Eight pages, authored pixel by pixel — **not generated.** §3's standing rule is *no
AI-generated core art*, and BACKLOG row 29's ruling was *CHANGE THE TECHNIQUE, DO NOT
RE-PROMPT*, because S110 proved a seed plate fixes architecture and can never fix
faces.

| | |
|---|---|
| **Panels** | several to a page, varied sizes, ink gutters, 2px borders |
| **Bright ink** | 8 new four-step banks in `palette.ts` — paper white, hard black, hot sun, print blue, saturated green |
| **Halftone** | ben-day dots; the one texture that says *printed* more than any draughtsmanship |
| **The crop** | low angle on the gate, a close-up of a gauntlet and an open palm, a figure tiny against a huge gate — none of which a top-down camera can do |
| **Motion** | speed lines, radial bursts, and one `RIIIP` in a hand-authored 5×7 face |
| **Silhouette** | the load-bearing choice |

**Silhouette deletes the problem that killed the film** rather than managing it. The
film's own gap #10: *"face-level identity across all 8 clips is NOT verified and I do
not claim it."* A silhouette has no face to keep consistent — while S110's production
rule 2 still carries the identity: *"a bold non-facial identifier… the silhouette
carries the identity where the face cannot."* His is a hat and one hot red scarf, in
every page.

Drawn at **160×144 and scaled 2× nearest**, which is what *"somewhat pixelated"*
buys: every mark is at least two device pixels.

**Page 7 is silent** — one wordless page at the threshold. The film spent one second
of true digital silence there; the comic spends a whole page.

**`COMIC` is deliberately NOT in `MASTER_COLORS`.** Every world palette is anchored on
a measurement of a real place and is muted because the place is. Printing inks are
not. So a tile painted in comic ink **fails `check:palette`** — the cutscene may
borrow the world's colours; the world can never borrow the cutscene's.

---

## THE PRIORITIES

**P1 — A DEPLOY IS AN ALLOWLIST, NEVER A DIRECTORY** (`52d4dbe`, `bb82aa2`).
The obvious move — point a host at `rebuild/` — would have published
`docs/SITE-SURVEY-*.md`, `docs/S109-SITE-TRUTH.md` and `realm/*.json`: **measured
cadastral geometry of a real place where a real family lives**, plus a 10.9 MB
sourcemap. The repo is **private**, so that is a first disclosure, not a
re-publication. It took an `ls` to notice.

`build-site.mjs` copies from a named allowlist; **guard #9** does not trust it and
applies two independent nets — set equality, plus a deny list that knows the *names*
of what must never ship. The second earns its keep: an extra file reported as
"unexpected" gets added to the allowlist by someone in a hurry; reported as *"this is
survey data about a real family's home"*, it does not.

48 MB of `dist/` → **6 files, 1505 KB**. Negative-tested five ways.

**P2 — THE COMIC** (`46f91f5` attempt 1, `79afb24` attempt 2). Above.

**P3 — THE DEPLOY, AS FAR AS IT HONESTLY GOES** (`4e30bdb`).
Probed rather than inherited, because this project once carried a deploy blocker for
forty sessions on repetition alone:

| Probe | Result |
|---|---|
| `legacyoftherealm.com` | **ALIVE** on Cloudflare · 188.114.96.2/97.2 · `Server: cloudflare` · CF-RAY …-CDG |
| the 502 | the tunnel **you** switched off 2026-07-17 (S102) — which even predicted this confusion in writing |
| vault Workers token | **REJECTED** — `{"code":1000,"message":"Invalid API Token"}` |
| `wrangler whoami` | not authenticated, no stored OAuth |
| vault DNS key | legacy Global-key shape; untested — the sandbox refused a credential in an auth header, correctly |

So the last mile is yours, which is the right shape: a session should not hold a
deploy credential, and I must not create accounts or type passwords. **The deliverable
was to make your action as small as possible.** Route A needs no token at all.

**`deploy-site.yml` has never run and says so in its own header.** Everything before
the deploy step is verified; the `wrangler pages deploy` line is documented-interface
and unproven. S117 shipped a workflow whose first step would have failed every run —
that lesson doesn't make an unrunnable step runnable, it makes *saying so* mandatory.

**AMENDMENT — the chat bubble** (`86fadda`). Your defect, measured and fixed above.
And a fifth line can no longer clip in silence: `Interact.show` counts the wrapped
lines *after* the real font has wrapped the real string — the only place that can
know — and `console.error`s if the body exceeds what the box promises. Not a throw: a
clipped descender must never stop a player mid-conversation.

---

## FOUR DEFECTS FOUND BY LOOKING, AND ONE I CAUSED

- **`PIL.rectangle(fill=None)` is not a no-op — it paints WHITE.** I wrote it as a
  placeholder meaning "leave the gateway empty". The every-pixel-is-a-declared-ink
  assertion found `#FFFFFF` on all four pages that open the gate.
- **The open gate read as two bare posts.** A swung-open leaf needs a top rail to say
  the bars are one object, finials to echo the shut gate, and real width.
- **Figures read as scarecrows** — an 8.8u hat brim over a 3.2u head, arms as level
  bars. Brim to 2.6u, arms tapered and angled down.
- **A session-fatal freeze**, found by running the cutscene *twice* in one page:
  Phaser reuses the scene instance, so `done` survived the first `finish()`,
  `update()` returned on its first line, and ENTER and ESC were both dead — the
  player frozen on page 1 for ever. **Reachable today** via JOURNAL → ACCOUNT →
  RESTART, which replays the arrival with no reload.
- **And one regression that was mine.** Page 3's caption clipped, so I made the line
  count *derived* from box height instead of a hardcoded 2 — the correct fix, the same
  one your chat bubble had just taught me. It turned every other page's `h=34` box
  into `floor(18/12)` = **one** line, and **six of eight captions came back
  ellipsised.** I fixed one page and broke six. A derived quantity is only as good as
  its inputs. Guard #10 now asserts caption fit at a pessimistic 7px/glyph against
  the 6.03px measured here, and shrinking a box back to 34px reproduces the exact
  failure and names the remedy.

---

## AND THE RULE 22 AUDIT EARNED ITS PLACE

The mandated end-of-session runtime audit found that **`Rebuild CI` had been red
since S117** — every push, while every handoff said "build PASSING · 8/8 guards".
It passes on this machine and only fails on the runner, which is exactly the gap
Rule 22 exists to close.

**It was never art drift.** All 17 reported files differed in **size only**
(`atlas.png` 18309 -> 20021, `player.png` 445 -> 469) — the signature of a
different PNG encoder. Confirmed: the job pins `Pillow>=10,<12`, this machine runs
Pillow 12+. Same pixels, different zlib stream.

A byte comparison of a **compressed** file asserts the compressor as well as the
content — the same class as CF-S114-MCV-VERSION-ASSERTION-CLASS, and the same shape
as the full-string `scripts.test` equality this repo broke for itself two sessions
ago. The step now decodes each PNG and compares **pixels** against `git show HEAD:`
(61 of 61 identical locally), and if the art ever genuinely drifts it reports how
many pixels moved in which file. Pinning Pillow would also have gone green and is
worse — it keeps the assertion bound to an encoder for ever.

**Two runs green, verified by the runner rather than by my reasoning about it.**
`Deploy site` is green as well, skipping cleanly for want of a token — so the skip
path is proven even though the deploy path cannot be.

## BLOCKED ON YOU
1. **Three clicks** — `GOING-LIVE.md`. Then you can play it on your phone.
2. **A Pages-scoped Cloudflare token**, if you want the automatic route. The vault's
   is dead *and* wrong-scoped.
3. **The Neon string** — `legacy_realm_db.pooled` still reads `PASTE_…_HERE`. Until
   then: saves are per-device, and offline sign-out offers REGISTER not LOGIN
   (the hash lives with the account, so clearing it removes the only thing to check).
4. **`CF-S107-KEY-EXPOSURE`** — and this session made it worse: reading the vault
   printed the Cloudflare tokens into a transcript.
5. **P4, the art.** Still offered, never installed. The player-sprite finding is
   measured and sharp: `down0` has **two** distinct silhouette widths across 13 inked
   rows, and its shoulders (w8) are **exactly** its head's width — no shoulder line at
   all. `player.hold` proves the cure. The comic's crowd figures were built on it.
6. **The gate's lower half: open bars or solid panel?** One photograph.
7. **Dael's tutorial role** (open since S110) · a tape measure for STO-1 · where the
   iron key lives.

## SESSION PIPELINE REPORT
Pipeline: Session PDCA v2 | **3 of 3 complete + 1 amendment** | context ~420K/1M (42% GREEN)
- Council: **0 external calls.** Deliberation was waived on the user path — he closed
  the design space by direct instruction and §11.0 forbids re-litigating design he has
  directed. CHECK ran as the browser verification of every priority.
- **14 commits, all pushed.** Two remotes at zero. CI green for the first time since S117.
- **MCV reconciled at close: 717 pass / 0 fail / 0 UNBOUND, exit 0.**
- Reflexion: **10 new entries.** Backup taken *before* the write, per S117's lesson.

## PROMOTION CANDIDATES (advisory — never auto-codified)
- **`ASK-WHAT-IT-IS-FOR`** — the session's own lesson, and new. Before optimising a
  property, check it is the property that matters. Measured ≠ correct.
- **`PROBE-THE-CREDENTIAL`** — a token in a vault is not a working token. Ninety
  seconds of probing changed this whole deliverable.
- **`RE-VERIFY-INHERITED-BLOCKERS`** — second session running.
- **`PROBE-BEFORE-ADOPT`** — sixth session running, still uncodified.

═══════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════

## WHAT TO DO NEXT

**1. THE GAME IS ALREADY LIVE** at https://legacy-of-the-realm.saras-fdtta.workers.dev — deployed as a Worker, all assets
verified 200. What remains is pointing the domain at it with **Add Route**
(`legacyoftherealm.com/*`), NOT Add Domain. See the top of this file for why, and for
the MX record you must not delete.

**Workers & Pages is an ACCOUNT-level page, not a domain-level one.** Inside the
`legacyoftherealm.com` zone the sidebar only shows *Workers Routes*, which is a
different feature. Go straight here:

    https://dash.cloudflare.com/?to=/:account/workers-and-pages

Create → **Pages** → **Upload assets** → name it `legacy-of-the-realm` → drag the
`site` FOLDER on → Deploy. Open the `*.pages.dev` URL and check the game loads
BEFORE attaching the domain. Then Custom domains → `legacyoftherealm.com`;
Cloudflare will offer to replace the old record still aimed at the dead tunnel —
say yes, that record IS the 502.

**2. Then the database.** Paste the Neon pooled string into
`legacy_realm_db.pooled` in the vault. Until then saves are per-device and offline
sign-out offers REGISTER instead of LOGIN.

**3. P4 art is still yours** — the player sprite has no shoulder line (measured:
`down0` has two distinct silhouette widths across 13 inked rows, shoulders exactly
as wide as the head). Offered, never installed.

**4. `CF-S107-KEY-EXPOSURE`** — rotate the keys. S118 made it worse by printing the
Cloudflare tokens into a transcript.

---

## Handoff Prompt — paste into the next session

Continuing **Legacy of the Realm** after S118. Read `boot-snapshot.md` first — it
carries the constitutional rules, the seventh rule earned at S118 (*measured is not
the same as correct*), 16 architecture facts, and the MCV reconciliation.

**S118 shipped:** a deployable `site/` folder (15 files, 1.5 MB) behind guard #9;
the arrival rebuilt as an **8-page comic book** behind guard #10 (37.4 MB → 26 KB);
the deploy wiring; Daniel's chat-bubble fix (`BOX_H` is derived now); and a CI
repair — `Rebuild CI` had been red since S117 because a byte comparison of
compressed PNGs was asserting the Pillow version alongside the pixels.

**FIRST, ASK HIM: did the Cloudflare Pages upload work?** As of S118 close
`legacyoftherealm.com` had never been deployed — the 502 is the July tunnel, not a
regression. If it is live, the next thing is `CF-S117-DEPLOY-HANDLERS` (four auth
endpoints + SaveStore wiring), which needs the Neon string.

**Also open:** P4 art (his call); `CF-S107-KEY-EXPOSURE`;
`CF-S118-RUN-MCV-BEFORE-THE-STOP-HOOK-DOES` — run `verify-session-claims.py` at
each priority boundary and write `verification[]` as **typed assertions, never
prose**. S118 got that wrong twelve times and the stop hook caught it.

═══════════════════════════════════════════════════════════
