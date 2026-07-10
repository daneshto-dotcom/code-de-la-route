# Boot Snapshot (auto-generated at handoff)
Generated: 2026-07-10 | Session: S99 (durability off-OneDrive + SQLite + reveal reachability)

## Next Steps
S99 shipped **5/5 code priorities AND deployed them live** (save migrated off OneDrive to
`C:\ProgramData\LegacyOfTheRealm\save`; local + public `/health/deep` = 200; both repos pushed +
CI-clean). Next session = **S100** off the campaign (submodule `session-state.json` `campaign` block):
1. **T1.3** — legend sheet (shareable stat/achievement card, next funnel piece after the Royal Summons).
2. **T1.4** — real perks (QR redemption) — needs Daniel's perk model (open Q #E).
3. **B-04 / B-05** — quest reachability (HIGH residuals from the S97 audit).
4. **D2 / D6** — admin auth (JWT session-version; SSE token-in-URL).
5. **Carry-forwards from S99**: wire **Litestream→R2** once Daniel provides the R2 token (adapter +
   `litestream.yml` are staged; flip `PERSISTENCE=sqlite` after); add the **sealed-letter** reveal beat
   (needs Festival-Authentic-Voice review); optional: archive/remove the stale OneDrive `save/` originals.

## Blockers
- **Daniel-gated**: R2 bucket + S3 API token (activates Litestream off-box replication) · perk model / redemption / signing-secret (T1.4).
- **Playtest (only Daniel)**: Knight → fight a wolf (verify S97 B-01 real VICTORY); run `__previewRoyalSummons()` in the browser console.
- **Elevation**: disabling the `LegacyOfTheRealm-GameServer` scheduled task needs an elevated shell (`schtasks /Change` = Access denied from a normal shell; `/Run` works).

## Pending Backlog
See `Game/founding-realm/BACKLOG.md` "S97 RE-PRIORITIZED ROADMAP". Open residuals: B-04/B-05 quest
reachability (HIGH, S100) · B-07 morale on live paths · B-09 quest-pool prune · D2 JWT session-version ·
D6 admin SSE token-in-URL · C4/C5/C6 client polish · T2 retention · T3.1/T3.2 AI-NPC · T4 emergent-sim depth.

## Recent Reflexion (last 2 sessions)
### 2026-07-10 — S99: durability off-OneDrive + SQLite + reveal reachability
- read the env before naming the landmine (PERSISTENCE=json → PG never contacted; 28P01 was the verifier's own probe).
- one app-root anchor for a path default, never per-file __dirname (else a fresh-world-seed trap).
- lazy-require native addons inside the ctor so the fallback catch can catch; cutover bootstrap must reuse the full recovery chain.
- a restore drill must fingerprint (currentYear/tickCount >=) not just liveness, else it false-passes on a fresh seed.
- derive the chain gate from persisted completedTemplateIds, not an ephemeral Map (restart-brick); enumerate chains before drop-vs-reconstruct.
### 2026-07-09 — S98: durability capstone + begin vision funnel
- heartbeat PRESENCE (not staleness) is the crash-loop signal; detect before overwrite; corrupt-tolerant counter.
- verify the persistence HOOK not just the save (ticket save belongs at the webhook grant).
- name the proxy before picking the header (Cloudflare Tunnel → trust loopback + CF-Connecting-IP).
