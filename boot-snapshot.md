# Boot Snapshot (auto-generated at handoff)
Generated: 2026-07-14 | Session: S101

## Next Steps
1. **S102 lead: Full T1.4 QR perks** (Full-tier, ~35K, UNBLOCKED — #E answered S100): mint/scan/redeem ledger in src/modules/perks/ + admin scanner tab + client "My Writs" QR (sealed-writ art). Catalog stub src/modules/perks/catalog.ts encodes E1 marquee+reveal-gated / E2 in-game QR + admin scan / E3 opaque one-time codes in SAVE_DIR ledger / E4 player-account binding / E5 ticket-independent. Run A.0 vs the S101 codebase first (S100/S101 both proved carry-forward maps go stale).
2. **T1.3 DEED_PHRASES voice review** (Daniel): the 40 curated 1601 phrasings in public/js/data/deed-phrases.js + the S101 chain heralds ("Word Spreads" / "A Task in Hand" in src/networking/event-subscriptions.ts) need Festival-Authentic-Voice review.
3. **Playtest (Daniel, now on LIVE)**: (a) KNIGHT class quest → fight → complete (S100 objective gate); (b) NEW S101 loop: talk to Pip → accept "Ears on the Street" → walk 5 different zones → watch progress heralds + auto-turn-in; (c) talk to any NPC twice — dialogue should begin reflecting disposition.
4. **Chain-quest carry-forwards** (bundle candidates for S102/S103, all ledgered in submodule session-state): buff-reward application system (Varenne Q2/Maren Q2 buffs silently skip), offline-duel-winner credit (needs playerId→charId map on ctx), Messenger/return-to-NPC turn-in, chain-progress HUD, defeat-keyed combat event, dwell-time tracking.
5. **BACKLOG.md hygiene**: add S101 DONE section (B-04/B-05/P5/R1-R8 now shipped) — deferred from handoff for token budget.

## Blockers
- Litestream→R2 off-box replication awaits Daniel's Cloudflare R2 bucket + S3 token (adapter + litestream.yml staged since S99).
- Festival public dates gated (REAL_FESTIVAL_DATE=null in artifact-canvas.js) until Daniel confirms.
- Daniel-only: voice reviews (deed phrases, chain heralds, sealed-letter beat) + the live playtest above.

## Pending Backlog
- [ ] Full T1.4 QR perk mint/scan/redemption ledger (S102 lead)
- [ ] T1.3 deed-phrase + S101 herald Festival-Authentic-Voice review
- [ ] Litestream→R2 wire (on token) then flip PERSISTENCE=sqlite
- [ ] Sealed-letter reveal narrative beat (voice review)
- [ ] Buff-reward application system (no applier exists; chain buffs skip)
- [ ] Offline-duel-winner chain credit + combat:resolved emit (playerId→charId map)
- [ ] GBC Crystal-reskin campaign (RATIFIED-PARKED, starts after S102 re-park)
- [ ] Admin force-spawn/world-state override tooling (BACKLOG #16 Admin/GM Tooling v2)

## Recent Reflexion (last 2 sessions)
See .claude/reflexion_log.md top two blocks (S101 + S100). S101 keys: live-smoke-catches-what-unit-tests-structurally-cannot (validator gap, dotenv→LIVE-save hazard, ENV_FILE_OVERRIDE=0 + isolation-guard pattern now MANDATORY for scratch servers), adversarial-check-earns-its-cost (1 refuted CRITICAL, 4 real fixes incl. distinct-objective mechanism), map-vs-emit-vs-listener-audit (4 failure places in dead event systems; victor-only mapping). Meta: 2 priorities shipped AND DEPLOYED (S100+S101 live together); A.0 refuted the carry-forward map 8 ways before planning.
