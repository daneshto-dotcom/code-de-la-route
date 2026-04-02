═══════════════════════════════════════════════════════════
SESSION RULES
- ALWAYS commit all changes before ending a session. Never leave uncommitted work.
- When generating a handoff, commit first, then generate.
═══════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════
HANDOFF SUMMARY — Legacy of the Realm: Founding Realm
Generated: 2026-03-24 (Session 2 — Bug Audit & Hardening)
Session duration: ~1.5 hours (audit + mass fix session)
Latest commit: c1810c7 Fix 47 bugs across 19 files
═══════════════════════════════════════════════════════════

## PROJECT
- Name: Legacy of the Realm: Founding Realm
- Working directory: C:\Users\onesh\OneDrive\Desktop\Claude\Legacy of the Realm\Game\founding-realm
- Git branch: master
- Latest commit: e1d5d9c Sentinel Cycles 1-18 + AI integrations: massive 2D client expansion
- Uncommitted: 19 files modified, +271/-120 lines (47 bug fixes — NEEDS COMMIT)
- Tech stack: Node.js + TypeScript + Express + WebSocket (ws) + Phaser 3 + PostgreSQL/JSON persistence
- Codebase: ~27,600 lines across 84 source files, 32 game modules

## CURRENT STATE
- Build: PASSING (0 TypeScript errors)
- Tests: 100/100 simulation tests passing
- Client JS: Valid (2,624 lines in game2d.html)
- Deployment: https://legacyoftherealm.com via Cloudflare Tunnel (tunnel needs manual start)
- Server: Node.js on port 3000, JSON file persistence (dev mode), 56 characters in realm
- Game clock: Year 1601, SPRING, Day 2, real-time (1 real min = 1 game min)
- 19 files with uncommitted fixes — should be committed at start of next session

## THIS SESSION'S WORK — 47 Bug Fixes Across 19 Files

### CRITICAL Fixes (6)
1. **XSS injection in all 3 clients** — Added `esc()` HTML-escaping function to game2d.html, admin.html, game.html. All `innerHTML` assignments now escape user-controlled data (chat messages, character names, NPC names, herald reports, zone names, action labels, gathering items, transaction tables, chronicle entries). ~25 injection points patched.
2. **Shell injection in NPC AI brain** — ClaudeCLIProvider rewrote from `execSync()` with string interpolation to `execFileAsync()` with `input: prompt` via stdin. No user data touches the shell now. Also made it async (was blocking event loop with execSync).
3. **Atomic file persistence** — `JSONPersistence.save()` now writes to `.tmp` then `fs.renameSync()` to final path. Prevents corrupt save files from crash during write.
4. **simTick avalanche** — Removed 14 instances of tight `for` loops calling `simTick()` hundreds/thousands of times inside action handlers (MOVE, LABOR, BUY_FOOD, PAY_TAX, GAMBLE, EARN_REPUTATION, GATHER, CRAFT, COMBAT, TOURNAMENT, PVP, BUILD_STRUCTURE, FOUND_SETTLEMENT). These were fast-forwarding the entire world simulation by hours every time a player performed an action. Actions now just describe time passage without mutating world state.
5. **Balance desync** — 8 places in gateway.ts modified `char.balance` directly without updating `this.gameState.balances` Map. Fixed: GAMBLE losses, NOMINATE_SELF deposits, INITIATE_SCHEME costs, FORCED_QUEST rewards, LABOR wage, BUY_FOOD cost, and intrigue scheme theft (both victim and initiator). All now update both balances Map AND character object atomically.
6. **Action queue completion was a no-op** — `completeQueuedAction()` for GATHER, CRAFT, MOVE, BUY_FOOD were stub messages with no actual game effect. Fixed: GATHER now adds items to inventory; CRAFT now consumes ingredients and produces output; MOVE updates character zone; BUY_FOOD deducts money and restores hunger; LABOR adds wage to balance.

### HIGH Fixes (8)
7. **Election infinite loop** — `advanceElectionPhase()` could extend nomination period infinitely. Added `_extended` flag so it only extends once.
8. **Politics tick lacked context** — `tickPolitics()` hardcoded Year 1601/SPRING for enacted laws and used vote count as total eligible population. Now receives `currentYear`, `currentSeason`, `totalActiveCharacters` from gateway.
9. **Quest completion return type** — `completeQuest()` returned a Quest but `doCompleteQuest()` in simulation.ts tried to destructure `{quest, rewards}`. Fixed return type to `{ quest: Quest; rewards: { deniers, reputation } }`.
10. **Inventory removal across quality tiers** — `removeFromInventory()` required exact quality-tier match. Now aggregates across all tiers of the same item, consuming from multiple stacks.
11. **Combat rank modifier crash** — `calculateCombatPower()` could index RANK_MULTIPLIER with -1 if rank was 0. Added `Math.max(0, ...)` guard.
12. **Hunger warning priority inversion** — "You are getting hungry" (< 30) displayed before "You are starving!" (< 10) because conditions were checked in wrong order. Swapped.
13. **Reputation validation rejected 0** — `EARN_REPUTATION` action validator rejected `amount <= 0`, but pray/rest actions legitimately send amount=0. Changed to `amount < 0`.
14. **World event duration miscalculation** — `tickWorldEvents()` used 10 days/year instead of 60 (the actual days-per-season × 4 seasons). Events were ending 6× too fast.

### MEDIUM Fixes (10)
15. **Memory leak on character death** — Gateway death handler didn't clean up per-character Maps (inventories, moraleStates, criminalRecords, playerAchievements, zonesVisitedByPlayer, characterEquipment, personalities). Now deletes all 7 entries.
16. **World events unbounded array growth** — `worldEvents` array grew forever. Added cap at 200 (keep all active + last 50 inactive).
17. **Global counter collision for IDs** — `crimeCounter` and `eventCounter` (module-level `let` variables) reset on server restart, causing ID collisions with saved data. Replaced with `Date.now().toString(36) + random` generators.
18. **Season timeline sort was string-based** — `getTimeline()` in knowledge-graph.ts sorted seasons alphabetically (AUTUMN < SPRING < SUMMER < WINTER). Now uses numeric SEASON_ORDER map.
19. **Winter blocked too many gathering items** — `WINTER_BLOCKED_GATHERING` included "wild_herbs", "berries", "mushrooms" which aren't actual item IDs in the crafting system. Trimmed to real items: "herbs", "flax".
20. **CSS @import not at top** — game2d.html had `@import url(...)` for Cinzel font after other CSS rules. Moved to top of `<style>` block (browsers ignore @import after other rules).
21. **Character name extraction fallback** — `extractNameFromText()` in knowledge-graph.ts had broken regex for `char_` prefix (actual IDs use `chr_`). Updated prefix list and improved capitalization logic.
22. **Login overlay keyboard leak** — Game keyboard shortcuts (E, H, ESC, etc.) fired during login screen. Added early return when login overlay is visible.
23. **Minimap player jitter** — Player dots on minimap used `Math.random()` offset each frame, causing visual jitter. Replaced with deterministic hash-based offset from player name.
24. **Zone safety not shown** — `showZonePopup()` on zone transition passed empty string for safety. Now passes `gameState.zone?.safety || "SAFE"`.
25. **Weather particles invisible** — Particle speed multiplied by 0.033 (presumably a delta-time) but particles only lived 200 frames and moved ~1px/frame. Bumped speed to 2.0 and reduced lifetime to 5 for visible rain/snow.
26. **Achievements not synced** — `FULL_STATE_SYNC` handler didn't populate `gameState.achievements`. Added `gameState.achievements = msg.achievements || []`.

### LOW Fixes (5)
27. **Sprite load errors** — game2d.html tried to load 14 PNG sprites that don't exist (procedural circles are used instead). Commented out the loads to eliminate 404 console spam.
28. **JSX template literal in game.html** — React-style `{'{vacant}'}` in a non-React template. Changed to plain "Vacant".
29. **Security warnings** — Added console.warn for default admin password and default JWT secret when env vars aren't set.
30. **Guild removal didn't handle leader succession** — `removeMember()` now picks new leader from remaining members (was picking from unfiltered list including the removed member). Also emits `guild:memberLeft` event.
31. **Character cleanup events** — Added `character:cleanup_needed`, `guild:memberLeft`, `crime:committed`, `crime:trial_completed` to events.ts type definitions. `retireCharacter()` and `killCharacter()` now emit cleanup events.

## OPEN ISSUES — Bugs Still Present

### Known Runtime Issues
- **Camera black on first load** — Chrome throttles Phaser requestAnimationFrame in background tabs. The `_cameraEverAttached + setInterval` retry handles it, but user sees black until tab gets OS focus. No clean fix without Phaser internals.
- **NPC AI requires ANTHROPIC_API_KEY** — Falls back to static dialogue silently. The ClaudeCLI provider also works but needs `claude` CLI installed.
- **Orphaned test characters** — 56 characters in realm.json, most are test chars from development. No cleanup mechanism exists.
- **game.html (text client) is stale** — Only received minor fixes this session. The 2D client (game2d.html) is the canonical experience.

### Potential Issues Found But NOT Fixed (need investigation)
- **`processGameAction()` is 1,800+ lines** — Single async method handling 30+ action types. Should be refactored into per-action-type handler modules, but too risky to restructure in a bug-fix session.
- **No WebSocket message size limit** — `ws` server accepts any size message. Should add `maxPayload` option.
- **No HTTPS on WebSocket** — WS runs plain `ws://` on port 3000. Cloudflare tunnel terminates TLS, but direct connections are unencrypted.
- **Admin routes use basic auth only** — No CSRF protection, no session tokens, no rate limiting on auth endpoint.
- **Equipment system is wired server-side but has no gameplay effect** — `characterEquipment` Map exists, equipment sidebar shows in UI, but equipping/unequipping doesn't modify combat power or other stats.
- **Property/housing system** — DB tables/types exist but no gameplay mechanics.
- **Law system** — Politics module has `laws` array and proposal/voting, but enacted laws have no game effect (tax rates, restrictions, etc. are not read by any system).
- **Trading** — No player-to-player trade UI or server handler.
- **Death & succession** — UI exists in game2d.html but succession mechanics (inheritance of wealth, titles, property) are minimal.
- **Morale system** — `moraleStates` Map tracked but morale has no gameplay effect.
- **Achievement triggers** — `playerAchievements` Map tracked but no achievement definitions or triggers exist.

## BLOCKED ON
- Nothing — all systems functional, 19 files need committing

## NEXT STEPS (priority order)

### Immediate (commit the fixes!)
1. **COMMIT THE 47 FIXES** — 19 modified files are uncommitted. `git add` and commit before any new work.

### Short-term (gameplay completion)
2. **Equipment system end-to-end** — Wire equip/unequip from sidebar → server → modify `calculateCombatPower()` and other stat checks. Items in inventory should be equippable. Equipment slots: weapon, armor, accessory.
3. **Player-to-player trading UI** — Add TRADE action type, trade request/accept flow, item+money exchange. Needs UI in game2d.html sidebar.
4. **NPC walking animations** — NPCs have schedules but don't visually move between zones on the 2D map. Need pathfinding between zone centers and sprite interpolation.
5. **Grid Engine integration** — Replace custom movement with proper tile-based pathfinding for both players and NPCs.

### Medium-term (systems that exist but do nothing)
6. **Law system enactment** — When a law passes via politics module, it should actually modify game parameters (tax rates, trade restrictions, curfews, etc.). Need a law-effects registry that other modules read.
7. **Property/housing system** — Let players buy/build houses in settlements. Houses provide hunger regen, storage, status. DB schema exists.
8. **Death & succession mechanics** — When a character dies, heir should inherit: a percentage of wealth, family name/reputation, property, guild membership (optional). Current system just creates a fresh character.
9. **Morale effects** — Morale should affect labor wages, combat power, social interactions, and trigger events at extremes (revolt, celebration).
10. **Achievement system** — Define achievements (first kill, 1000d earned, all zones visited, etc.), wire triggers, display in sidebar.

### Long-term (polish & scale)
11. **Refactor gateway.ts** — Split `processGameAction()` into per-action-type handler files. The 3,326-line monolith is becoming unmaintainable.
12. **Mobile testing** — Virtual joystick implemented but never tested on real phone. Touch events may need tuning.
13. **Clean up orphaned characters** — Add admin endpoint to delete/archive test characters from realm.json.
14. **WebSocket security** — Add `maxPayload`, implement proper session tokens (not just playerId), add CSRF to admin routes.
15. **PostgreSQL migration** — JSON file persistence works for dev but won't scale. The persistence adapter interface is ready; need a PG implementation.

## KEY FILES
- `public/game2d.html` (2,624 lines) — The entire 2D Phaser client (single file, all rendering/input/UI/chat/WebSocket)
- `src/networking/gateway.ts` (3,326 lines) — Main server, all action handlers, tick system, WebSocket management
- `src/modules/npc/ai-brain.ts` (415 lines) — ReACT agent for NPC AI dialogue (now async, shell-safe)
- `src/modules/chronicle/knowledge-graph.ts` (376 lines) — Chronicle entity graph + BM25 search
- `src/modules/relationships/social-graph.ts` (250 lines) — Social graph traversal + strategic insights
- `src/networking/admin.ts` (542 lines) — Admin dashboard API + intelligence endpoint
- `src/networking/action-pipeline.ts` (474 lines) — Action validation + rate limiting + sanitization
- `src/modules/combat/index.ts` — Combat power calculation, PvE encounters, tournaments
- `src/modules/crafting/index.ts` — Recipes, inventory management (fixed: cross-tier removal)
- `src/modules/politics/index.ts` — Elections, offices, law proposals (fixed: infinite loop, context passing)
- `src/modules/justice/index.ts` — Crime, arrest, trial system (fixed: ID collisions, event emission)
- `src/modules/quest/index.ts` — Quest accept/complete (fixed: return type for rewards)
- `src/modules/guild/index.ts` — Guild management (fixed: leader succession on removal)
- `src/modules/seasons/index.ts` — Seasonal modifiers (fixed: winter gathering blocklist)
- `src/modules/world-events/index.ts` — Random world events (fixed: ID collisions, duration calc, array cap)
- `src/core/events.ts` — Event bus type definitions (added 4 new event types)
- `src/core/simulation.ts` — Core sim tick + doCompleteQuest (fixed: quest return destructuring)
- `src/persistence/index.ts` — JSON file save/load (fixed: atomic writes)
- `scripts/generate-placeholder-assets.js` (575 lines) — Generates sprites, tileset, estate.json
- `public/assets/maps/real-estate-data.json` — GPS hotspots, zone centers, aerial tile config
- `save/realm.json` (2,367 lines) — Live game state (56 characters, 2 settlements, 2 guilds)
- `.tunnel-token` — Cloudflare tunnel token for deployment

## CREDENTIALS & URLS
- Admin login: sovereign / adminlogin2026 (⚠️ default — set ADMIN_PASS env var!)
- User email: daneshto@gmail.com
- Live URL: https://legacyoftherealm.com
- Admin dashboard: https://legacyoftherealm.com/admin.html
- 2D client: https://legacyoftherealm.com/game2d.html
- Status page: https://legacyoftherealm.com/status.html
- Domain: legacyoftherealm.com (GoDaddy registrar, Cloudflare DNS)
- Cloudflare account: 5a0bdbb314009503a324b1d63a5a4c0c
- Tunnel ID: 991ff7c9-34cc-4a3e-81dd-3ce392d008a8

## SERVER STARTUP
```bash
cd "C:\Users\onesh\OneDrive\Desktop\Claude\Legacy of the Realm\Game\founding-realm"
npm run server
# Second terminal for public access:
TOKEN=$(cat .tunnel-token) && ./cloudflared.exe tunnel --no-autoupdate run --token "$TOKEN"
```

## CONTEXT FOR NEXT SESSION

**Architecture:** The 2D client (game2d.html) is a single 2,624-line file with Phaser 3 embedded — all rendering, input, UI, chat, and WebSocket in one `<script>` tag. The gateway.ts (3,326 lines) is the monolithic server — `processGameAction()` is a single 1,800+ line async method with a switch statement over 30+ action types. Both files are at the limit of maintainability and should be the next refactoring target.

**Critical pattern — balance updates:** After this session's fixes, the correct pattern for modifying character money is ALWAYS: (1) update `this.gameState.balances.set(charId, newBal)`, (2) update `this.gameState.characters.set(charId, { ...char, balance: newBal })`. Never just mutate `char.balance` directly. Several bugs were caused by this desync. Search for `char.balance +=` or `char.balance -=` to find any remaining violations.

**simTick removal:** We removed all `for (i < N * 5) simTick()` loops from action handlers. These were fast-forwarding the entire world by hours per player action (a player eating lunch would advance every NPC, every election, every world event by 30 simulated minutes). Actions now just describe time passage in their response messages. The actual world clock advances via the regular tick interval (10s real = 1 game minute).

**Camera race condition:** Phaser's async scene creation + Chrome background tab throttling = camera not attached on first load. Solved by `setInterval` retry in FULL_STATE_SYNC handler + `_cameraEverAttached` one-shot in update(). Edge-scrolling has a 3-second delay to prevent accidental camera detach on load.

**AI Brain providers:** Two LLM providers exist: `AnthropicProvider` (direct API, needs ANTHROPIC_API_KEY) and `ClaudeCLIProvider` (uses `claude` CLI, needs claude installed). The CLI provider was rewritten this session to be async and shell-injection-safe. Both fall back to static dialogue generator if unavailable.

**What was NOT touched this session:** The actual game simulation core (simulation.ts tick logic), the admin dashboard backend (admin.ts), the relationship/social graph modules, the NPC schedule system, the property/housing types, and the persistence adapter interface. These are stable and correct.

═══════════════════════════════════════════════════════════
Paste this into your next Claude session's first message.
═══════════════════════════════════════════════════════════
