# COUNCIL S115 — ESC→JOURNAL, REBINDABLE KEYS, AND THE THROW

Full tier · 2 rounds · quality gate PASS · signals fired: `novel_mechanism`,
`external_user_facing`, `irreversible`
Seats: Claude/Prime-Architect (`claude-fable-5`), Grok/Disruptor
(`grok-4.20-0309-reasoning`), Gemini/Quality-Auditor (`gemini-2.5-pro`)

## PHASE A.0 — STATE DISCOVERY (Rule 21)

Seven probes, all measured before the PDR was locked. Full record:
`scratchpad/a0-findings-s115.md`. Headline: **mouse aiming is safe.** At a forced
3× CSS blow-up over the 320×288 backing store, CSS(480,432)→logical(160,144),
CSS(24,24)→(8,8), CSS(816,240)→(272,80) — exact at all three, with
`worldX === pointer.x + camera.scrollX` holding throughout. S114's Council had
refused an in-game inspector on pointer-arithmetic grounds; that refusal was
correct for its case (a hand-rolled SVG overlay on a static page with nothing
maintaining the transform) and does **not** transfer to the running game, where
Phaser's ScaleManager maintains it.

## BATTLE LEDGER — 12 decisions

| # | Decision | Resolution |
|---|---|---|
| 1 | Settings: new scene vs tabs on Subscreen | **REFUTED BY PROBE** → new scene, using Subscreen's own pause/resume pattern |
| 2 | ESC opens the Journal from where? | **CLAUDE SELF-CORRECTED** → map only; ESC already means close/cancel-split in the pack |
| 3 | Binding storage shape | **CONCEDED → GROK**: exactly two slots, never open arrays |
| 4 | Directions in the keymap? | **SYNTHESIS**: bindable in the table, resolved as one vector poll |
| 5 | How-to-play text source | **UNANIMOUS**: generated from the live keymap, so it cannot lie after a rebind |
| 6 | Sparse vs full keymap in the save | **OVERRULED BY PROJECT LAW**: full table (S114 "dullest possible migration") |
| 7 | Which hand throws | **OVERRULED BY THE OWNER** → handedness at creation, dominant hand first |
| 8 | "Tier enforcement" on rebind | **REJECTED** as a category error; tier is a property of the action |
| 9 | F1 as a settings fallback | **REJECTED**; excluding ESC by construction removes the failure it guards |
| 10 | Teach by text or animated diagram | **ADOPTED → GEMINI**, prototype-first |
| 11 | Prototype in Google Slides | **INSTINCT ADOPTED, MECHANISM REJECTED** → prototype in the engine |
| 12 | Rename SETTINGS → JOURNAL | **ESCALATED → OWNER CHOSE JOURNAL** |

Vetoes: none used; both external seats carry +1.0 into the next tie.

## PRIME-AUDIT (Rule 20) — four findings

1. **Gemini rubber-stamped the riskiest item.** S1 — a 31-site refactor in a
   1661-LOC file — scored 5/5/5 with zero challenges while his whole budget went
   to S2. The batch's highest-blast-radius change was its least-reviewed.
2. **CURSOR-SNAP, named by no model.** "Last input wins" plus a mouse means
   holding AIM would jump the reticle from the tile in front to wherever the
   cursor happens to rest. The mouse must only take over *after real movement*.
   Same shape as S114's `#a-cancel-that-instantly-undoes-itself`.
3. **Consensus masked a dropped requirement.** Both models accepted the movement
   freeze in silence. It is the acknowledged cost of the spec the owner chose,
   not an oversight — recorded so it is never mistaken for a bug.
4. **S2's quality is unprovable by reading.** Screenshots are a hard gate,
   because Gemini's own S114 defect was precisely a claim about appearance.

## THE OWNER BEAT THE COUNCIL, AGAIN

All three seats converged on "the active hand throws, `1`/`2` switch it".
Daniel replaced it with one question at character creation — right- or
left-handed — and the dominant hand throws first. **Zero new keys**, and it
plants a seed for stats and quests. Verbatim: *"BOOM - less keys same mechanics,
one simple question."*

This is the third owner-over-Council correction in two sessions (S114: the
one-hand render, and the law nobody in the room had read). The pattern is stable
enough to name: **a Council converges on the most symmetrical design, and
symmetry is not the same as simplicity.** The owner optimises for fewer moving
parts; the models optimise for consistency among the parts already proposed.
