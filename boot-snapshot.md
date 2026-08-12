# Boot Snapshot (auto-generated at handoff)
Generated: 2026-08-12 | Session: S104

## READ THIS FIRST — THE WORKING AGREEMENT (constitutional, S104)
**Daniel directs every step of this build.** Execute his instruction as given,
matching what he said and how he said it. You MAY offer archived assets (the 10
prebuilt NPCs + their TTS voices, story chains, items, systems) when a stage
calls for them — **but NEVER add any of them without his explicit go.** Offering
is not permission. Creativity serves his instruction; it does not redirect it.
Full text: `ACTIVE_PLAN_realm_rebuild.md` §11.0.

## Next Steps
1. **Daniel provides 7 full-HD videos of the starting zone** — this is the first
   thing next session. Extract what aerials/photos cannot give:
   **wall heights and construction**, the **grass field between the guardian's
   house and the smithy** (553.09 m², fully tree-occluded from above), and
   **where the old smithy access was**.
2. Await Daniel's instruction for the next build step. His stated sequence for
   the forecourt (§11.6): skin it as **2026** → **guardsman NPC** on the RIGHT of
   the gate → **class conversation** → **cinematic** → the 1601 swap.
3. **Redraw the gate from the real 1783 ironwork** when he gives the go — the
   S104 oak-gate tiles are SUPERSEDED (§10). ⭐ Ask him for the **original 1783
   gate plans**; he has them, and they are the best art reference available.
4. Parcel-002 (the bell) is still marked `← NEXT` in §7, but §11 may re-order the
   roadmap around the threshold. **Daniel decides the order — do not assume.**

## Blockers
- None blocking. The 7 videos gate the art refinement of the starting zone but
  nothing is stalled waiting on them.
- Long-standing, still open: `REAL_FESTIVAL_DATE` (§9.10 RISK-1) and whether any
  mail comes from Cloudflare.

## Pending Backlog
- Building numbers **#13 / #5 / #41 / #38 / #32** are unresolvable — they exist
  nowhere in `buildings.geojson` (which carries NO numbering). Identification is
  currently by measured footprint + arrangement. Ask Daniel their source.
- `.gitleaksignore` allowlist for the two `gateway.ts` env-var false positives
  (frozen old build, March 2026, cosmetic).
- Benign leftovers: stale `.claude/session-state.json.lockdir.zombie.*` dirs and
  `.tmp.*` counters in both repos. Gitignored, harmless; the destructive-command
  guardrail blocked automated removal at S104 close (correctly — not approved).

## Recent Reflexion (last 2 sessions)

### 2026-08-12 — S104: first game code; parcel-001 built then reshaped twice by Daniel's corrections
- #pattern-verify-the-crop-not-just-the-cluster — k-means returns a confident colour even when the crop landed on sky. 6 of 26 regions were wrong; only a crop-vs-swatch sheet caught them.
- #pattern-a-clean-test-on-the-wrong-question-refutes-nothing — a well-formed test measured the wrong thing twice (the "free edge" road test; the 8.6x-better circle fit to the wrong edge). A good fit to the wrong feature is the most convincing kind of wrong.
- #pattern-the-guard-caught-what-discipline-would-not-have — palettes were duplicated in two files and drifted within minutes. Fixed structurally: the atlas builder now parses palette.ts.
- #pattern-hardware-limits-produce-better-art-than-taste-does — the 8-palette GBC limit forced a better decision than argument would have.
- #pattern-input-nuance-is-a-real-bug-not-a-feel-issue — turn-in-place gated on a hold timer made every tap a no-op and looked like broken input.
- #pattern-repeated-tiles-amplify-per-tile-noise — three art defects, one lesson: detail baked into a tile becomes a pattern once it repeats.
- #pattern-owner-correction-beat-my-inference-every-time — four times Daniel's direct knowledge beat derivation. Derive what he cannot see; ASK for intent and history.

### 2026-08-11 — S103: the plan finished — scale locked, mechanics authored, alarms silenced
- #empirical-refutes-plausible-criticals · #raw-code-not-abbreviations · the alarm was ours (probe the repo before blaming the vendor) · keep the conclusion, name the fabricated evidence · a completed priority with no assertions looks exactly like a fabricated one.
