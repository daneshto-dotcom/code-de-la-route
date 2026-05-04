# Boot Snapshot (auto-generated at handoff)
Generated: 2026-05-04 | Session: S85 → S86

## Next Steps
1. Cloudflare Pages static deploy — needs scope decision first (festival.html + landing.html have backend API deps; pure-static won't work without VPS or Workers proxy)
2. Studio voice A/B subjective evaluation (user-action) — Daniel listens to Varenne `_studio.mp3` vs `.mp3` via `?tts_tier=chirp3hd` on game2d.html
3. Mobile baselines fail-on-diff (BACKLOG #32) — Council D14 callback ~2026-05-28 (24d out, can defer)
4. Embedding-based intent normalization (BACKLOG #31) — needs ~30d ai:* traffic + GCS migration (#blocked)
5. Pull a fresh BACKLOG row from Tier 3/4 (e.g., #20 Advanced Crafting, #21 Player Event Calendar) if no preference

## Blockers (Daniel-action)
- VPS deploy (Hetzner) — gates production
- GCS bucket + SA per `docs/GCS_SETUP.md` — gates ai:* audio upload
- SUBMODULE_PAT — gates parent CI full-gate
- BigQuery dataset + SA — gates CI metrics full mode

## Pending Backlog
- #1 VPS Production Deploy + HTTPS — M (Daniel: Hetzner)
- #9 Real-World Attendance Verification — M (VPS + Stripe)
- #16 Admin/GM Tooling v2 — M (VPS deploy)
- #18 Monitoring & Observability — M (VPS deploy)
- #20 Advanced Crafting & Masterworks — M
- #21 Player Event Calendar + Chronicle Integration — M
- #31 Embedding-based intent normalization — M (S81 P2 + 30d traffic)
- #32 Mobile baselines fail-on-diff — XS (callback ~2026-05-28)

## Recent Reflexion (last 2 sessions, in submodule reflexion_log.md)

### S85 — Mobile Customize-panel a11y unblock (BACKLOG #34) — 1/1 SHIP
- Path A-Lite scope amendment cut implementation from Council-approved ~25 LOC native <details>+APG accordion to ~11 LOC pure-CSS `order:-1` reorder
- REAL root cause hidden until debug spec: tutorial-overlay (#tutorial-overlay from tutorial.js initTutorial) intercepts #sidebar-toggle clicks; sidebar stays in offscreen translateX(-100%) state. Fix: bypass Playwright UI click; call `window.toggleMobileSidebar()` directly via page.evaluate
- CSS specificity gotcha: `[data-panel="character"]` (0,0,1,0) lost to `.tab-panel.active` (0,0,2,0) — raised selector to `.tab-panel.active[data-panel="character"]`
- Bundle 287.0KB → 287.0KB (zero delta — pure CSS + test code). 36/36 a11y GREEN (was 31 + 5 SKIP). Visual baselines did NOT need regen (login overlay captured, sidebar offscreen)
- Council 1-round Standard, 9 decisions, ~$0.11 spend, 0 vetoes

### S84 — BACKLOG carry-forward — visual workflow git-lfs + auth-flake playbook + reflexion log repair — 3/3 SHIP
- Carry-forward batches cost ~$0 in LLM spend (Micro deliberation waived per Rule 17)
- Two-pass workflow approach surfaced second infra defect cleanly via scope-amendment ceremony
- Playwright Jammy ships without git-lfs AND without build-essential — both needed for serious Node projects
- Auth-flake watchdog as observability-only middleware: no behavior risk, collects data for next recurrence
- Raw-byte inspection (od + Node script) beat encoding-rewrite assumption — single 0x00 was the entire problem
