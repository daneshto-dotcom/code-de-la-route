# Boot Snapshot (auto-generated at handoff)
Generated: 2026-07-09 | Session: S98 (durability capstone + begin vision funnel)

## Next Steps
S98 shipped 4/4 priorities — **pushed, CI-green in both repos, and deployed live** (game server cold-started; `/health/deep` returns 200 local + public). Next session = **S99** off the S97 roadmap (BACKLOG.md + submodule session-state `campaign` block):
1. **T0.4** — SqlitePersistence adapter (better-sqlite3, WAL + synchronous=FULL) behind the existing PersistenceAdapter interface + **Litestream** streaming the WAL off-box to R2/B2. Full-tier PDR. **Daniel-gated** on open-Q #B/#D.
2. **DUR-06** — make SAVE_DIR env-driven + one-time stopped-server migration of `save/` OUT of the OneDrive tree. **Daniel-gated** on open-Q #C (path).
3. **T0.3** — backup-restore drill (boot a throwaway from latest backup → hit /health/deep → alert if not restorable). Depends on S98's /health/deep (done).
4. **T1.2 (M-half)** — realm_curious accumulator + earlier "sealed letter" beat + **lower B53 reveal thresholds** (HONOR>40 + 50 lifetime actions) so testers can actually REACH the reveal in the hype window (currently unreachable → P3/P4 only unit-tested, not yet live-playtestable end-to-end).

## Blockers
- **Daniel decisions gate S99** (answer any time): #B object store R2-vs-B2 + bucket name/region · #C off-OneDrive save path (rec `C:\ProgramData\LegacyOfTheRealm\save`) · #D confirm Litestream · #E S100 perk model (which achievements → which real perks, redemption model, signing secret).
- **Daniel playtest** (post-deploy, only he can do): create a Knight → fight a wolf (verify S97 B-01 combat gives real VICTORY, not "Action Complete"); run `__previewRoyalSummons()` in the browser console to visually confirm the summons render (the one thing S98 couldn't auto-verify — browser tooling was flaky).

## Pending Backlog
See `Game/founding-realm/BACKLOG.md` "S97 RE-PRIORITIZED ROADMAP". Residuals still open (routed to later tiers): B-04/B-05 quest reachability (HIGH, S100) · B-07 morale on live paths · B-09 quest-pool prune · B-02 log rejections · D2 JWT session-version · D6 admin SSE token-in-URL · C4/C5/C6 client polish · T2 retention · T3.1/T3.2 AI-NPC · T4 emergent-sim depth.

## Recent Reflexion (last 2 sessions)
### 2026-07-09 — S98: durability + vision funnel
- heartbeat-PRESENCE (not staleness) is the crash-loop signal; detect before overwrite; corrupt-tolerant counter.
- verify the persistence HOOK not just the save (ticket save belongs at the webhook grant, not /checkout).
- name the proxy before picking the header (Cloudflare Tunnel → trust loopback + CF-Connecting-IP; empirical, not guessed).
- apply reward extras at the EFFECTIVE reward (choice vs template), split flags/title/chronicle by data-ownership, leave deniers/rep untouched.
- immutable addEntry() return must be assigned (latent chronicle-drop bug fixed in-pass).
- gate + allowlist distributable artifacts (persona allowlist + date-gate on the shareable summons).

### 2026-07-08 — S97: un-park mega-session
- 45-finding audit → 22 fixed; combat B-01 root cause (action-dispatch split-brain); durability core; 31-thread research + roadmap. (Full detail in .handoff-archive/HANDOFF_2026_07_08_S97.md.)
