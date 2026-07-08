# Boot Snapshot (auto-generated at handoff)
Generated: 2026-07-08 | Session: S97 (un-park mega-session — audit + fix-all + research + roadmap)

## Next Steps

Project is **UN-PARKED and healthy** — site live (local + public 200), combat fixed, durability
hardened. Full detail in HANDOFF_2026_07_08_S97.md + AUDIT_S97.md + RESEARCH_S97.md (submodule).

**Daniel action items (not code — do these first when you return):**
1. `git push` BOTH repos (operator-gated; 8 submodule commits + 2 parent commits are LOCAL only).
   Pushing turns CI green + activates the new uptime-monitor workflow + removes the leaked default
   admin creds from the public parent repo's HEAD.
2. **Rotate `ADMIN_PASS`** (old value burned — in git history) + re-run `scripts/install-server-autostart.ps1`
   from an **ELEVATED** PowerShell (applies the OPS-01 15-min re-arm trigger to the live task — the
   non-elevated re-run got Access-Denied).
3. Decide whether to purge the old default creds from the PUBLIC parent-repo history (BFG/filter-repo
   + force-push) — the string is out of HEAD but still in history.
4. **Manual playtest the B-01 combat fix** (the one thing only you can verify): click a wolf near the
   gate → FIGHT → expect a real VICTORY/DEFEAT result, NOT a "queued → Action Complete" no-op.

**Next build work — new S97 roadmap (BACKLOG.md top section is the source of truth):**
- **T0 durability capstone** (do first): off-box SQLite+Litestream replication, `/health/deep` + a
  push-alerting monitor (UptimeRobot), backup-restore drill. Finish making the world un-loseable.
- **T1 vision engine** (biggest gap): the "place is real" reveal mechanic — shareable "Royal Summons
  to Chazeuil" artifact (S), staged reveal via hidden `realm_curious` quality (M), per-player legend
  sheet → festival persona (M), achievements → real festival perks (M).
- **T2 retention** (cheap): daily roulette (S), action-point return clock (M), <30s onboarding (M).
- **T3 AI-NPC**: anachronism guardrail (S) + prompt-cache (S) first; depth later.
- **T4 emergent-sim depth**: CK3 stress, Norland relationship web, DF rumor feed.

## Blockers
- **git push** is operator-gated — all S97 work is committed locally, not on origin.
- VPS deploy (Hetzner) + Stripe account remain Daniel-gated (ticket /checkout stays 503 until Stripe).

## Pending Backlog
See BACKLOG.md "S97 RE-PRIORITIZED ROADMAP" (top) for the tiered order. Audit residuals routed there:
B-04/B-05 quest reachability (HIGH), B-02/B-07/B-09, C4/C5/C6, D2/D5-proxy/D6, DUR-06/07, OPS-04.

## Recent Reflexion (last 2 sessions)

### 2026-07-08 — Session 97 — Un-park mega-session (audit + fix-all + research + roadmap)
- P0 durability-parity: parked-but-live needs active-ops durability rigor; fix-one-forget-sibling +
  no monitoring = 5.5-week silent 502.
- P1 months-mis-chased-bug: "fighting doesn't work" was an action-dispatch split-brain (handler never
  ran), not the combat-feedback bug 6 sessions assumed.
- P2 guard-beats-audit: a boot-time completeness invariant caught 14 no-op actions the static audit missed.
- SESSION s97-meta: 45 findings → 22 fixed + 7 truth-ups + 15 routed; ~1070 tests green; NOT pushed.

### 2026-05-28 — Session 96 — Parked-site maintenance (CI fix + reboot-survival + Node-24 actions)
- P1 ci-audit-gate-split-by-exposure; P2 test-the-actual-failover + ps51-ascii-only; P3 verify-action-
  runtime-before-bump; SESSION s96-meta: emails stopped, reboot-survival added, all Actions Node-24.
