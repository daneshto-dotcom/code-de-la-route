# CI health across every `daneshto-dotcom` repo — S122, 2026-08-29

Written because the owner asked, after finding nine red deploys in his GitHub
notifications that two consecutive sessions had closed without noticing.

**This is a note, not a change.** Nothing outside `founding-realm` /
`legacy-of-the-realm` was touched. Every other repo is another project's to fix;
what follows is the diagnosis so nobody has to re-derive it.

Measured with `gh run list` + `gh api .../actions/secrets` on 2026-08-29.

---

## The screenshot was already out of date — two of these fixed themselves

| Repo | In the notifications | Actually now |
|---|---|---|
| `chateau-guardian` | CI #281–#287 failed | **GREEN.** Last three runs pass; `S169 P2: CI was red…` fixed it |
| `the-spark` | Deploy to GitHub Pages #368 failed | **GREEN.** All six recent runs pass |

Worth saying plainly: red notifications are not evidence of red CI. They are
evidence of a red *run*, which may be four days and three fixes ago.

---

## Still red

### 1. `founding-realm` — Deploy site (OURS, fixed this session bar one step)

**Zero Actions secrets.** `CLOUDFLARE_API_TOKEN` was never set, so **CI has never
deployed the site — not once in 26 runs.** The live site is current only because
it is deployed by hand.

The nine red ticks are not a regression. `7961aff` (S120 P9) reversed "missing
token → `::notice::` → exit **SUCCESS**" into a red failure. The seventeen green
ticks before it were the lie; the red ones are the truth arriving late.

- **Same class as everything below?** No — this one is *config that was never done*.
- **Fixed in S122:** the gate now names **both** required secrets (it checked one
  of two); the header no longer tells you to mint the wrong token scope; and
  `npm run ci:status` puts GitHub into the session gate.
- **Owner's, and only the owner's** — a session must not hold a deploy credential:
  ```
  gh secret set CLOUDFLARE_API_TOKEN  -R daneshto-dotcom/founding-realm
  gh secret set CLOUDFLARE_ACCOUNT_ID -R daneshto-dotcom/founding-realm
  ```
  Token scope is **`Workers Scripts: Edit`** — the vault token already has it and
  has deployed the live site by hand. Account id is in the vault under
  `cloudflare.account_id`. Owner's decision, recorded: **deploy live on every push.**

### 2. `navlog-pro` — Weekly Data Refresh

```
update-airspace failed: HTTP 400 for
https://storage.googleapis.com/29f98e10-a489-4c82-ae5e-489dbcd4912f/fr_asp.geojson
```

An **external data source is returning 400** — dead bucket, rotated object, or an
expired signed URL. Five consecutive weekly runs have failed; one before them
passed, so it broke rather than never worked.

- **Same class as ours?** **Yes, in the way that matters.** Not a missing secret,
  but a scheduled job failing into nobody's inbox week after week. This is the
  exact shape of the founding-realm problem: an automated thing that stopped
  working, and no gate anywhere asks whether it still does.
- **Worse than ours in one respect:** ours failed loudly and did nothing. This one
  means the airspace data has not refreshed in five weeks, and a nav-log tool
  serving stale airspace is a *wrong answer*, not an absent one.
- **Fix:** find where that GeoJSON now lives, or pin a new source.

### 3. `aeroclub-vichy-site` — Intégration continue

```
✗ clair · ciel jour · 375px · défil. 50%    33 fragments (1 masqué)
✗ 1 fragment(s) sous le seuil, 0 indéterminé(s), sur ce qui est réellement peint.
```

A **real contrast/legibility failure** at 375 px on the light "ciel jour" theme —
one text fragment under the readability threshold. Types and build pass (`0 errors`).

- **Same class as ours?** **No, and it is the good case.** This is a guard doing
  precisely its job on a genuine regression. Nothing is broken about the CI; a
  finding is outstanding. Fix the contrast and it goes green.

---

## Green, and how they are configured

| Repo | Secrets | Deploy trigger | State |
|---|---|---|---|
| `legacy-of-the-realm` | 0 | `push` → GitHub Pages | green (Pages needs no secret) |
| `the-spark` | 0 | push → GitHub Pages | green |
| `genesis-protocol` | 0 | push + dispatch (7 workflows) | green |
| `brain-command-center` | 0 | push + PR + dispatch | green |
| `cnc-app` | **2** (`NEON_API_KEY`, `NEON_DATABASE_URL`) | push + PR + dispatch | green |
| `chateau-guardian` | 0 | push + PR | green |

**On "is it the same — deploy on every push?"** Broadly yes, and `founding-realm`
is the odd one out for a reason: everything else that deploys goes to **GitHub
Pages**, which authenticates with the built-in `GITHUB_TOKEN` and therefore needs
no configured secret. `founding-realm` deploys a **Cloudflare Worker**, which is
the only one that needs a credential — and the only one that never got it.

`cnc-app` is the sole repo with secrets configured, which is the proof that
setting them is a thing that happens here, not a thing nobody does.

---

## The parked pair inside our own repo

Not from the screenshot, found by `npm run ci:status` on its first run:

- `founding-realm :: CI` — last run **18 days** ago, red, `workflow_dispatch`-only
- `founding-realm :: Uptime Monitor` — last run **18 days** ago, red, dispatch-only

Both were parked by `ci(s103-p1)` "while the site is intentionally offline."
**The site is not offline any more** — the server came on at S121 and a real
player has registered. Uptime Monitor is parked for a reason that has expired.
Nothing will ever overwrite those red runs, so `ci:status` lists them by name
every run without failing the gate (`--strict` fails on them).

---

## The pattern under all of it

Four of nine repos had a workflow failing that nobody was watching, and in two
cases it had already been fixed without anyone updating the picture. The common
factor is not any one bug — it is that **no gate anywhere asked GitHub anything.**
Rule 22 says to re-check `gh run list` at session close; prose lost to six local
commands that print PASS. `npm run ci:status` (S122) makes it the seventh, in
this project. **The other repos have no equivalent.** Porting it is ~145 lines
and the only per-repo change is the `REPOS` list at the top.
