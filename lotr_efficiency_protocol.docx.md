**LEGACY OF THE REALM**  
Code Efficiency & Anti-Bloat Protocol  ·  Claude Code / Opus  
*Production Hardening  ·  Founding Realm v1  ·  March 2026*

| STACK Node.js \+ TS \+ Phaser 3 | CODEBASE 27k LOC · 81 files · 37 modules | BUILD Passing · 100/100 tests | CONSTRAINT Zero behavior change to game outputs |
| :---- | :---- | :---- | :---- |

# **1  Context and Real Goal**

| You are performing a production hardening and anti-bloat pass on a functionally complete medieval simulation game. The realm is alive — 56 characters, real economy, real laws, real succession. The goal is not elegance. The goal is: can this realm keep growing without the codebase collapsing under its own weight? |
| :---- |

Legacy of the Realm: Founding Realm is a persistent medieval simulation built on Node.js \+ TypeScript \+ Express \+ WebSocket \+ Phaser 3 with JSON file persistence. The simulation core is clean and well-designed — event bus architecture, branded type IDs, 100 passing tests. The networking and client layers are where the bloat has concentrated during rapid feature development.

Current state: \~27,000 lines across 81 source files, 37 game modules. Build passing. 100/100 simulation tests passing. Two files account for a disproportionate fraction of the complexity budget: game2d.html at 3,188 lines (entire Phaser client in one HTML file) and gateway.ts at 3,741 lines (server \+ all action handlers \+ all tick loops).

| This pass IS NOT: | This pass IS: |
| :---- | :---- |
| Rewriting systems that work because they feel messy Adding gameplay features while refactoring Optimization theater on code not proven to be a bottleneck Architectural redesign without structural justification Style cleanup divorced from correctness or performance Touching the 100-test simulation suite unless fixing a confirmed regression | Breaking up the two monoliths: game2d.html (3,188 lines) and gateway.ts (3,741 lines) Completing the gateway handler refactor already in progress (7/47 done — finish it) Enforcing the established event-bus module boundary — no direct module-to-module imports Eliminating untyped any fields, orphaned test data, and stale client code Preparing the persistence layer for PostgreSQL migration without breaking the game Making the codebase safe to grow into multiplayer, diplomacy, and festival systems |

# **2  Sacred Outputs — The Realm’s Invariants**

| These are the regression gates. Record output snapshots before Phase 3 begins. Any divergence after a change — even in a single gold piece or a single reputation point — triggers rollback of that specific change. |
| :---- |

| Protected system | What must remain identical |
| :---- | :---- |
| **Simulation test suite (100/100)** | All 100 tests across 9 suites must remain green after every phase. This is the non-negotiable regression gate. |
| **Combat calculations** | Equipment bonus wiring (calculateCombatPower), morale modifiers (getMoraleCombatMod, getMoraleLaborMod, getMoraleSocialMod), law-banned-zone enforcement. Results must be byte-identical to pre-refactor. |
| **Economy / transaction pipeline** | processTransaction(), balance updates (BOTH gameState.balances.set AND characters.set — the critical pattern from the handoff), event sourcing log. Never break the dual-write. |
| **Succession / inheritance flow** | Death → processInheritance (50% to treasury) → InheritanceCache → property/equipment transfer → heritageRepMultiplier. This is irreversible in-game. |
| **Law effects engine** | computeLawEffects() aggregation, application in combat / labor / trade / reputation / hunger. Recomputed after tickPolitics(). |
| **Achievement triggers (all 46\)** | All 46 triggers, including combat tracking, seasonal flags, and wealth thresholds. checkPlayerAchievements() must fire after every action. |
| **Save / load persistence** | realm.json round-trip for equipment, inventories, properties (\_characterEquipment, \_inventories, \_properties). Both periodic (30s) and shutdown saves. |
| **WebSocket message protocol** | All client–server message types. Any change to a message schema is a breaking change for connected clients. Version or flag explicitly. |
| **Morale integration** | All combat power, reputation gains, and labor wages go through morale modifiers. Default \~60 (NEUTRAL) \= 1.0×. Do not bypass. |

*Practical gate: before Phase 3, run the full 100-test suite and record results. Run a live 5-minute simulation on the game server and capture: transaction totals, combat outcomes for 10 representative fights, morale modifier values for 5 characters, and achievement progress for 3 characters. Re-run after each phase. Any divergence \= rollback.*

# **3  Bloat Taxonomy — What the Realm Is Carrying**

Not all debt is equal. The two monolith files are the dominant problem. Everything else is secondary.

|  | Type | Priority | What this looks like in Legacy of the Realm |
| ----- | :---- | ----- | :---- |
| **A** | **Monolith files** | **CRITICAL** | game2d.html at 3,188 lines and gateway.ts at 3,741 lines. Each is a single-file system doing the work of 10–20 focused modules. The gateway refactor is already started — only 7/47 handlers extracted. |
| **B** | **Dead / stale code** | **HIGH** | game.html (text client) explicitly marked stale in handoff. 56 orphaned test characters with no cleanup mechanism. Stale code paths for systems superseded by newer implementations. |
| **C** | **Untyped fields** | **HIGH** | PlayerActionState.\_consecutiveWins and \_minHungerThisSeason typed as any. Branded type safety is a core design principle of this codebase — any leakage undermines it. |
| **D** | **Architecture boundary leaks** | **HIGH** | README mandates modules communicate only through the event bus. Any direct module-to-module import is a violation. The gateway file likely contains logic that belongs in domain modules. |
| **E** | **Security / WebSocket gaps** | **HIGH** | No WebSocket maxPayload limit (DoS vector). No proper session tokens (uses playerId). Admin routes: basic auth only, no CSRF/rate-limiting. These are not just debt — they are attack surfaces. |
| **F** | **Persistence fragility** | **MEDIUM** | Single JSON file (realm.json) for all game state. No transactions, no partial writes, no query capability. PostgreSQL migration is in next steps — the adapter abstraction already exists. |
| **G** | **Client bundle bloat** | **MEDIUM** | All Phaser 3 rendering, input handling, UI panels, chat, WebSocket, and game state mirroring are in one 3,188-line HTML file with an inline \<script\> tag. No code splitting, no lazy loading. |
| **H** | **NPC AI dependency** | **MEDIUM** | NPC AI requires ANTHROPIC\_API\_KEY or claude CLI — falls back to static dialogue. This external dependency should be optional and gracefully degraded, not a startup requirement. |
| **I** | **Operational overhead** | **LOW** | Cloudflare tunnel requires manual start (second terminal). No process manager (pm2 or equivalent). Admin dashboard missing property/equipment/morale views documented in next steps. |
| **J** | **Test coverage gaps** | **LOW** | 100 tests cover the simulation core well. The gateway action handlers, WebSocket protocol, and client state sync have no automated test coverage. As the handler refactor progresses, tests must be added. |

# **4  Domain Boundaries — The Realm’s Architecture Law**

| The README already defines this law: modules communicate ONLY through the event bus. No direct module imports. This is the most important architectural rule in the codebase. This phase finds every violation and fixes it. |
| :---- |

| Layer / file | What it owns | Hard boundary (what it must NOT do) |
| :---- | :---- | :---- |
| **src/types/index.ts** | All enums, interfaces, branded type IDs. Single source of truth for type definitions. | No logic, no imports from other modules. Types only. |
| **src/core/events.ts** | Typed event bus with logging. Module communication backbone. | Never call other modules directly. Publish events only. |
| **src/core/simulation.ts** | GameState, orchestrator, high-level action coordination. | No rendering, no WebSocket protocol, no HTTP routing. |
| **src/modules/\*/index.ts** | Each module owns its domain: time, economy, character, household, reputation, settlement, guild, quest, chronicle, world, equipment, property, morale, politics, combat, crafting, npc, achievements. | Modules NEVER import other modules. All cross-module communication through events.ts ONLY. |
| **src/persistence/index.ts** | Abstract PersistenceAdapter interface \+ current JSON adapter. | No game logic. No module imports. Save and load only. PostgreSQL adapter slots in here. |
| **src/networking/gateway.ts** | WebSocket server, session management, tick loop orchestration. | Action handler logic must NOT live here long-term. Delegates to handlers/. No game calculations inline. |
| **src/networking/handlers/** | One file per action domain: movement, economy, combat, trading, crafting, social, property, equipment, admin. | Handlers call simulation/module functions only. No direct gameState mutation outside canonical patterns. |
| **public/game2d.html** | Phaser 3 renderer, camera, scene management, WebSocket client. | NO game logic. NO state mutation decisions. Client renders what the server says. Client never decides outcomes. |
| **public/game2d.html (UI)** | HUD panels, sidebars, menus, chat, notification system. | Should be split from renderer. Each UI panel is a candidate for its own JS module loaded by game2d.html. |
| **tests/simulation.test.ts** | 100 tests across 9 suites covering all simulation modules. | Tests must not import from networking/ or public/. Simulation layer is transport-agnostic. |

## **Specific violations to scan for**

* Any module in src/modules/ importing from another module in src/modules/ (must go through events)

* Any game calculation (damage formula, morale modifier, law effect) defined inside gateway.ts or a handler file instead of the owning module

* Any balance update that only writes to gameState.balances without also updating characters.set — the critical dual-write pattern

* Any client-side (game2d.html) code that makes a game outcome decision rather than simply rendering server state

* Any persistence code that calls module functions directly instead of writing/reading plain state objects

# **5  The Eight Permanent Anti-Bloat Rules**

These rules are permanent. They are enforced via ESLint, CI gates, and code review conventions added in Phase 8\. They exist to prevent the realm’s codebase from re-accumulating the same debt as it grows toward multiplayer, diplomacy, and festival systems.

| Rule | Name | Principle | Enforcement action |
| ----- | :---- | :---- | :---- |
| **Rule 1** | **No cross-module direct imports** | Modules communicate exclusively through the event bus. One violation breaks the anti-corruption boundary for the entire module system. | Grep src/modules/ for import.\*modules/. Every hit is a violation. |
| **Rule 2** | **No game logic in the gateway** | gateway.ts orchestrates and delegates. It does not calculate damage, apply morale, or aggregate law effects. Those belong in their owning modules. | Any function in gateway.ts longer than 20 lines that contains game math is a candidate for extraction. |
| **Rule 3** | **No action handler in the gateway switch** | The handler refactor is in progress (7/47 done). Every remaining case in processGameAction must be extracted to handlers/. The switch becomes a pure delegation table. | One handler file per domain. Register via registerHandlers(). Import in handlers/index.ts. Remove the case from gateway.ts. |
| **Rule 4** | **No untyped any in game state** | Branded types are a first-class design principle of this codebase. any fields in PlayerActionState (\_consecutiveWins, \_minHungerThisSeason) undermine the entire type safety model. | Add proper interfaces. No suppressions. Fix the types. |
| **Rule 5** | **No single-file client** | game2d.html at 3,188 lines cannot be effectively reasoned about, tested, or maintained. UI panels, WebSocket client, renderer, and input must be separated into loadable JS modules. | Refactor in stages. Start with the most isolated UI panel. Keep each split shippable. |
| **Rule 6** | **No silent gameplay regressions** | 100 tests are the baseline. The simulation core is protected. As handlers are extracted, tests for the networking layer must be added. Coverage cannot shrink. | Add one handler test file per extracted handler domain before merging that extraction. |
| **Rule 7** | **No unbounded WebSocket payloads** | No maxPayload means a single malformed or oversized message can crash the server. With a live persistent world, a server crash is a live game incident. | Add maxPayload: 64 \* 1024 (64KB) to the WebSocket server options. Log and reject oversized messages. |
| **Rule 8** | **No playerId as session token** | Using playerId directly as a session token means any client that guesses or knows another player’s ID can impersonate them. This is a security architecture issue, not just technical debt. | Issue signed session tokens on connect. Validate server-side on every action. Do not expose playerId in client-visible URLs or logs. |

# **6  The Eight-Phase Protocol — Order of Operations**

| Execute in strict order. Do not begin Phase 3 (dead code removal) before Phase 2 (baseline) is recorded. Do not begin Phase 5 (handler refactor) before Phase 3 is complete. Never mix phase work in a single commit. |
| :---- |

| PHASE 0 | Preparation — Lock the Realm  (1 day) |
| :---: | :---- |

* Feature freeze: no new gameplay systems, no new action handlers, no new NPC behaviours. Only this protocol until it is complete.

* Create a dedicated Git branch: git checkout \-b polish/anti-bloat-v1. All protocol work lives here.

* Run full test suite: npx ts-node \--transpile-only tests/simulation.test.ts. Confirm 100/100. Record runtime. This is the golden baseline.

* Start the game server. Connect a client. Run a live 5-minute simulation. Capture snapshots of: 5 character balance totals, 3 combat outcomes (attacker, defender, result, damage), 3 morale values, achievement progress counts.

* Record build metrics: npm run build time, dev server startup time, game2d.html file size, gateway.ts line count.

* Confirm working tree is clean. All changes from the previous session are committed (handoff confirms this: a5d680c is clean).

| PHASE 1 | Inventory Everything  (1 day) |
| :---: | :---- |

Build a complete map before deleting or moving anything. The inventory is your working document for Phases 3–5.

| Category | What to list and flag |
| :---- | :---- |
| **Action handlers in gateway.ts** | List all 47 cases in processGameAction switch. Mark: extracted (7), not extracted (40). Group by domain: movement, economy, combat, trading, crafting, social, property, equipment, guild, admin. |
| **game2d.html sections** | Map the 3,188-line file into logical regions: Phaser scene setup, renderer, camera, input handlers, WebSocket client, each UI panel (sidebar, interaction menu, trade dialog, duel popup, achievement display, property UI). Estimate line count per region. |
| **Module event bus usage** | For each module in src/modules/, list: events it publishes, events it subscribes to, and any direct imports from other modules (violations). |
| **Dead / stale files** | game.html (text client — confirmed stale). Any other files not reachable from gateway.ts or game2d.html entrypoints. |
| **Orphaned test characters** | 56 confirmed. Document how they were created (test sessions) and confirm there is no clean mechanism. This is cleanup scope for Phase 3\. |
| **Untyped fields** | PlayerActionState.\_consecutiveWins and \_minHungerThisSeason. Any other any assertions in the codebase: grep for ': any' and 'as any'. |
| **WebSocket message types** | List every client→server and server→client message type. This is the protocol inventory needed before any refactor of gateway.ts. |
| **Environment variables** | Document every env var (.env): ADMIN\_PASS, ANTHROPIC\_API\_KEY, tunnel token. Flag any with no current consumer or no documentation. |
| **npm dependencies** | List all dependencies in package.json. Flag any used only in development, any used for trivial tasks, any outdated. |
| **Open issues from handoff** | Formally triage the known issues: camera black screen, NPC pathfinding, trading UI requestedItems gap, WebSocket security, orphaned characters. Assign each to a protocol phase or defer list. |

| PHASE 2 | Baseline Metrics  (half day) |
| :---: | :---- |

Record before touching a single file. You cannot improve what you have not measured.

| Metric | How to measure | Target after protocol |
| :---- | :---- | :---- |
| **TypeScript build time** | time npm run build | Reduce ≥15% |
| **Test suite runtime** | time npx ts-node \--transpile-only tests/simulation.test.ts | Hold at 100/100. Reduce runtime if possible. |
| **Dev server startup** | time npm run server (until first WebSocket ready log) | Reduce ≥20% |
| **gateway.ts line count** | wc \-l src/networking/gateway.ts | Target: \<1,000 lines after full handler extraction |
| **game2d.html line count** | wc \-l public/game2d.html | Target: \<800 lines (renderer only) after UI extraction |
| **processGameAction line count** | Manual — count lines in the function | Target: \<200 lines (pure delegation table) |
| **WebSocket message roundtrip** | Client-side: time from action send to state update receipt | Hold or improve |
| **Save file size** | ls \-lh save/realm.json | Baseline — no regression after persistence prep work |
| **Memory at steady state** | process.memoryUsage() after 5 min warm-up | Baseline — identify if leaks exist |

| PHASE 3 | Remove Dead Weight  (1–2 days) |
| :---: | :---- |

| Highest ROI phase. Clean deletion of confirmed dead code. Git preserves everything. Be ruthless about stale files and orphaned data. |
| :---- |

**Confirmed dead code — delete these first**

* game.html — explicitly confirmed stale in handoff. Text client is not canonical. Delete the file and remove any server route that serves it.

* 56 orphaned test characters — add an admin endpoint DELETE /admin/characters/orphaned that removes characters with no associated session in the last 30 days. Run it. Confirm save file shrinks.

* Any commented-out code blocks throughout the codebase. Delete all of them. Git history is the archive.

* Stale TODO comments where the work is done (e.g. TODOs about systems now implemented). Any remaining TODO must reference a GitHub issue number.

**Detection tools for non-obvious dead code**

* ts-prune: npx ts-prune — finds exported symbols with no importer. Every hit in src/ is a candidate for deletion.

* TypeScript: tsc \--noUnusedLocals \--noUnusedParameters — fix or justify every warning.

* ESLint no-unused-vars — run with strict config on the full src/ tree.

* Manual: grep for imports of game.html, any legacy client references, or any reference to the text client in server routing.

**Safe deletion protocol**

*Comment out in one commit — run 100 tests — run live simulation snapshot — compare to baseline — then delete in the next commit. Never comment-out and delete in the same commit.*

| PHASE 4 | Fix Types and Module Boundaries  (1–2 days) |
| :---: | :---- |

**4A  Fix untyped any fields**

* PlayerActionState.\_consecutiveWins: type is number. Add to the interface in src/types/index.ts.

* PlayerActionState.\_minHungerThisSeason: type is number. Add to the interface.

* Grep for ': any' and 'as any' across all src/ files. Document each. Fix or add // eslint-disable-next-line with a justification comment for any that genuinely need dynamic typing.

* Confirm branded type IDs (CharacterId, HouseholdId, etc.) are used consistently. Any place a raw string is used where a branded ID should be is a type gap.

**4B  Enforce event bus boundaries**

* Grep src/modules/ for import.\*from.\*modules/ (cross-module direct imports). Any hit is a boundary violation.

* For each violation: identify what data the import was providing, add the appropriate event to events.ts, make the consumer subscribe to the event, remove the direct import.

* Add ESLint rule: no import from src/modules/ within another src/modules/ subdirectory. Fail CI on violation.

* Audit gateway.ts for any inline game calculations that belong in a module. Combat formulas, morale math, law effect lookups — these should call module functions, not reimplement them.

**4C  Enforce critical balance dual-write pattern**

* Search for every place character.balance is modified in the codebase.

* Every modification must write to BOTH gameState.balances.set(charId, newBal) AND gameState.characters.set(charId, { ...char, balance: newBal }).

* Add a helper function updateCharacterBalance(gameState, charId, newBal) that enforces the dual-write. Replace every manual dual-write with the helper.

* Add a test that verifies balances Map and characters Map are always in sync after any transaction.

| PHASE 5 | Complete the Gateway Handler Refactor  (3–4 days, highest structural impact) |
| :---: | :---- |

| This is the most impactful structural change. processGameAction() is currently \~1,200 lines with 47 cases — only 7 extracted. Finishing this refactor makes the gateway readable, testable, and safe to modify. Do not rush it. One domain at a time. |
| :---- |

**Handler extraction protocol (already established — follow it exactly)**

* Create a new file in src/networking/handlers/ named for the action domain (e.g. combat.ts, economy.ts, movement.ts).

* Import registerHandlers from ./registry. Export handler functions. Call registerHandlers({ ACTION\_TYPE: handlerFn }) at module level.

* Add import './yourhandler' to handlers/index.ts.

* Remove the old case from the processGameAction switch in gateway.ts.

* Run 100 tests. Run live simulation snapshot. Compare to baseline. Only proceed to next domain if baseline matches.

**Extraction order by domain (40 remaining)**

| Order | Handler domain | Est. cases | Notes |
| ----- | :---- | ----- | :---- |
| **1** | **Movement (MOVE, TRAVEL, FAST\_TRAVEL)** | 3–4 | Lowest risk. No economy, no combat. Good first extraction after equipment (already done). |
| **2** | **Economy (BUY\_FROM\_NPC, SELL\_TO\_NPC, LABOR, GATHER)** | 4–6 | Touches balance dual-write. Test balance sync assertion after each handler. |
| **3** | **Combat (FIGHT\_PVE, TOURNAMENT, DUEL\_ACCEPT)** | 3 | All go through calculateCombatPower() and morale mods. Most safety-critical extraction. |
| **4** | **Trading (SEND\_TRADE\_OFFER, ACCEPT/REJECT\_TRADE)** | 3 | Note: requestedItems selection is incomplete — fix the logic as part of this extraction. |
| **5** | **Crafting (CRAFT\_ITEM, recipe resolution)** | 2–3 | Touches inventory. Confirm inventory validation is in crafting module, not inline. |
| **6** | **Social (CHAT, EMOTE, EARN\_REPUTATION variants)** | 4–5 | Morale social mod applied here. Confirm getMoraleSocialMod() is called, not bypassed. |
| **7** | **Guild (JOIN/LEAVE/FOUND\_GUILD, dues, ranks)** | 4–6 | Check dissolution logic stays in guild module, not duplicated in handler. |
| **8** | **Settlement (FOUND\_SETTLEMENT, BUILD\_STRUCTURE)** | 2–3 | Touches tier growth and chronicle. Confirm events are published, not inline logic. |
| **9** | **Character lifecycle (RETIRE, character creation flow)** | 2–3 | Succession flow is safety-critical. Confirm processInheritance() is called correctly. |
| **10** | **Admin (admin-only endpoints, debug actions)** | 3–5 | Extract last. Lowest player impact. Add CSRF protection during extraction. |

*After all 40 extractions: processGameAction should be a pure delegation table — the registry lookup, a fallthrough log for unknown actions, and nothing else. Target: under 200 lines.*

| PHASE 6 | Break Up the Client Monolith  (3–4 days) |
| :---: | :---- |

| game2d.html at 3,188 lines in a single inline \<script\> tag is the frontend equivalent of gateway.ts before the refactor. It cannot be tested, cannot be lazy-loaded, and cannot be reasoned about in isolation. Split it into focused JS modules. |
| :---- |

**Splitting strategy**

* The HTML file should remain as the Phaser scene host and script loader. All logic moves to ES modules loaded via \<script type="module"\> or bundled by a lightweight build step.

* Identify the most isolated region from the Phase 1 inventory. Start there. Keep every split individually shippable and test the live game after each split.

**Recommended split order**

| Split | Module | Est. lines | Rationale |
| ----- | :---- | ----- | :---- |
| **1** | **public/js/ws-client.ts** | 200–300 | WebSocket client: connect, send, receive, message dispatch. Zero Phaser dependency. Easiest to isolate and test independently. |
| **2** | **public/js/ui/sidebar.ts** | 300–400 | Character sidebar: stats, equipment, morale bar, achievement progress, retire button. Self-contained UI panel. |
| **3** | **public/js/ui/chat.ts** | 150–200 | Chat panel: message log, input, send. No game state dependency beyond rendering received messages. |
| **4** | **public/js/ui/trade-dialog.ts** | 200–300 | Trade offer dialog. Fix requestedItems selection as part of this extraction. Add proper item picker. |
| **5** | **public/js/ui/notifications.ts** | 100–150 | Duel challenge popup, incoming trade notification. Event-driven UI component. |
| **6** | **public/js/ui/menus.ts** | 300–400 | Interaction menu, action buttons, property UI, equipment section. Largest UI region. |
| **7** | **public/js/game-state.ts** | 150–200 | Client-side state mirror: characters map, own character, zone data. Single source of truth for client state. |
| **8** | **public/js/renderer.ts** | 400–600 | Phaser scene setup, camera, zone rendering, NPC sprites, animation. The true renderer — what remains in game2d.html after all other splits. |

After all splits: game2d.html should be a thin host file that sets up the Phaser canvas, loads modules, and contains no inline business logic. Target: under 200 lines of HTML \+ module loader configuration.

| PHASE 7 | Security & Persistence Hardening  (1–2 days) |
| :---: | :---- |

These are not cosmetic improvements. They are the minimum viable security posture for a live game server with real player data and a live game world.

**7A  WebSocket security**

* Add maxPayload: 64 \* 1024 to the WebSocket server constructor options. Log oversized message attempts with the connection’s IP. Close the connection.

* Issue signed session tokens (JWT or HMAC-signed opaque tokens) on connection. Store token → playerId mapping server-side. Validate on every action. Stop trusting the playerId field from the client.

* Admin routes: add rate limiting (express-rate-limit) and CSRF token validation. Basic auth alone is insufficient for production admin endpoints.

* Confirm ADMIN\_PASS is not the default adminlogin2026 in production. Add a startup assertion that fails loudly if the default password is detected in a non-development environment.

**7B  Persistence preparation for PostgreSQL migration**

* The PersistenceAdapter abstraction already exists. Add a PostgresPersistence class that implements the same interface. Do NOT migrate data yet — only implement the class and verify it satisfies the TypeScript interface.

* Identify all places where game code reads from save/realm.json directly (bypassing the adapter). All reads and writes must go through the PersistenceAdapter interface. No direct file system access outside persistence/index.ts.

* Add a periodic consistency check: after every save, load the saved state and verify a sample of character balances match the in-memory state. Log any divergence. This catches silent corruption before PostgreSQL migration.

* Document the full GameState shape as a TypeScript interface (it likely already exists — confirm it is complete and matches the actual save file structure including the newer \_characterEquipment, \_inventories, \_properties fields).

| PHASE 8 | Lock Standards to Prevent Re-Bloat  (1 day) |
| :---: | :---- |

The realm grows. Diplomacy, festivals, multiple servers, a Godot client — all of these are in the roadmap. The guardrails installed here must hold as each new system is added.

**CI gates to add**

* TypeScript strict: true in tsconfig.json. No implicit any. No unused locals. Fix all current violations before enabling.

* ESLint import boundary rule: no import from src/modules/X within src/modules/Y (X ≠ Y). Fail build on violation.

* Test count gate: fail CI if test count drops below 100\. Adding new systems must include tests.

* Line count advisory: log a warning if gateway.ts exceeds 500 lines or game2d.html exceeds 300 lines. These are the re-bloat early warning signals.

* npm audit on CI: fail on high-severity vulnerabilities.

**Code conventions to document and enforce**

* Every new action handler goes in src/networking/handlers/ with its own file. No new cases in gateway.ts switch. Ever.

* Every new UI component goes in public/js/ui/ as its own module. No new inline logic in game2d.html.

* Every new cross-module communication goes through events.ts. If the event type does not exist, add it there first.

* Every new character state field gets a branded type or an explicit type annotation. No any. No object.

* Every new gameplay system gets at least 3 tests in simulation.test.ts before the PR merges.

# **7  Platform-Specific Cleanup Targets**

These are the highest-impact targets specific to Legacy of the Realm. Treat each as a mandatory inspection item during the phase it belongs to.

| gateway.ts — processGameAction() switch | Priority: CRITICAL |
| :---- | :---: |

Currently \~1,200 lines. 40 cases not yet extracted. This single function is the highest-risk file in the codebase for merge conflicts, regression introduction, and reasoning failure. The refactor infrastructure is already built and proven with 7 extractions.

* Count exact remaining cases before starting Phase 5\.

* Extract in domain groups (combat together, economy together) not one-by-one randomly.

* After each domain extraction: grep for any reference to the extracted action types still in gateway.ts. There should be none.

* After full extraction: gateway.ts should contain: WebSocket setup, session management, tick loop orchestration, registry.getHandler() call, and fallthrough logging. Nothing else.

| game2d.html — client monolith | Priority: CRITICAL |
| :---- | :---: |

3,188 lines. Single inline \<script\> tag. No module boundaries, no testability, no lazy loading. The Phaser renderer, WebSocket client, game state mirror, and every UI panel are entangled. This is the frontend equivalent of the gateway problem.

* Map the file into regions before splitting (Phase 1 inventory).

* Start with ws-client.ts — zero Phaser dependency, easiest to extract and verify.

* Fix the known requestedItems trade dialog bug during the trade-dialog.ts extraction.

* Confirm the client never makes game outcome decisions after splitting — it only renders server state.

| Balance dual-write pattern | Priority: HIGH |
| :---- | :---: |

The handoff explicitly flags this as a critical pattern: ALWAYS update BOTH gameState.balances.set() AND gameState.characters.set(). A single missed write creates state desync that corrupts the economy silently. Extracting handlers without a helper function that enforces this is dangerous.

* Before Phase 5, add the updateCharacterBalance(gameState, charId, newBal) helper.

* Grep for '.balance \=' and 'balances.set' across all handler files. Every occurrence must use the helper.

* Add a test: run 10 transactions, then compare every entry in balances Map against the corresponding character.balance in characters Map. They must match.

| Morale modifier bypass risk | Priority: HIGH |
| :---- | :---: |

Three morale functions gate all combat, labor, and social actions: getMoraleCombatMod(), getMoraleLaborMod(), getMoraleSocialMod(). During handler extraction, there is risk of a new handler reimplementing the action without calling these functions, silently breaking morale integration.

* Before extracting combat handlers: add assertions in getMoraleCombatMod() that log a warning if called with an undefined or default morale value.

* After extracting each combat/labor/social handler: run a simulation with an extreme morale character (max and min) and verify outcomes differ proportionally.

* Add a test: character at EUPHORIC morale vs DESPAIR morale in combat — outcomes must differ by the documented modifier range (0.4×–1.15×).

| Succession / inheritance flow | Priority: HIGH |
| :---- | :---: |

The inheritance flow is the most complex stateful sequence in the game: death → processInheritance → InheritanceCache → new character creation → cache resolution. It is irreversible in-game. A bug here permanently alters a player’s dynasty.

* Add a dedicated succession test: create character, accumulate properties/equipment, trigger death, confirm InheritanceCache populated, create new character, confirm inheritance resolved, confirm cache cleared.

* Verify 50% balance-to-treasury rule is enforced in the test.

* During Phase 5 character lifecycle handler extraction: run the succession test before and after. Results must be identical.

| NPC AI external dependency | Priority: MEDIUM |
| :---- | :---: |

NPC AI requires ANTHROPIC\_API\_KEY or claude CLI at startup. The fallback to static dialogue is not well-documented or tested. As the game grows to more characters and zones, this external dependency becomes a reliability risk.

* Add a clear startup log: NPC\_AI\_MODE=claude|static depending on whether the API key is detected.

* Add a test: run NPC AI in static mode explicitly and confirm dialogue fallback produces valid NPC responses.

* Document the static dialogue pool. Confirm it is large enough to not feel repetitive for the 56 current characters.

# **8  Tooling Reference**

All tools available via npx without global installation. Run them in the polish/anti-bloat-v1 branch.

| Tool | Category | Command | Use in protocol |
| :---- | :---- | :---- | :---- |
| **ts-prune** | Dead export detection | npx ts-prune | Phase 3: finds exported symbols with no importer in the project. |
| **TypeScript strict** | Type safety enforcement | tsc \--noUnusedLocals \--noUnusedParameters | Phase 4: find all unused variables and parameters. |
| **ESLint no-unused-vars** | Dead variable detection | eslint src/ \--rule no-unused-vars:error | Phase 3: find declared-but-never-used variables. |
| **depcheck** | Unused dependency detection | npx depcheck | Phase 3/5: find packages in package.json never imported. |
| **eslint-plugin-boundaries** | Import boundary enforcement | eslint \--rule boundaries/... | Phase 8: fail CI on cross-module direct imports. |
| **cloc** | Line count by file/language | npx cloc src/ public/ | Phase 1/2: inventory and baseline. Track LOC reduction per phase. |
| **grep (boundary audit)** | Cross-module import scan | grep \-r 'from.\*modules/' src/modules/ | Phase 4: find every direct module-to-module import violation. |
| **grep (balance audit)** | Dual-write pattern check | grep \-rn '\\.balance \=' src/ | Phase 4/5: find every place balance is set — must use helper. |
| **npm audit** | Dependency vulnerability scan | npm audit | Phase 7/8: security pass before hardening. |
| **Artillery** | WebSocket load testing | artillery quick \--count 20 \<ws-url\> | Phase 2: baseline WebSocket message roundtrip latency. |

# **9  Deliverables and Working Style**

| You are a principal engineer performing a production hardening pass on a live medieval simulation with real player legacies. Be ruthless but surgical. Prefer subtraction over abstraction. The realm’s world state must never be compromised by a refactor. |
| :---- |

## **Deliverables in order**

| \# | Deliverable | Definition of done |
| ----- | :---- | :---- |
| **1** | **Codebase health report** | Gateway line count, game2d.html line count, untyped fields, boundary violations, dead files, dependency risks. Table format with severity. |
| **2** | **Full structured inventory** | All 47 handler cases mapped and grouped. game2d.html regions mapped with line counts. Module event map. All items from Phase 1\. |
| **3** | **Baseline metrics report** | All Phase 2 metrics recorded before any change. Kept as regression baseline for all subsequent phases. |
| **4** | **Phase 3: dead code removed** | game.html deleted. Orphaned characters removed. Commented code deleted. 100/100 tests still passing. |
| **5** | **Phase 4: types and boundaries fixed** | No any fields in PlayerActionState. No cross-module direct imports. Balance dual-write helper added and applied. |
| **6** | **Phase 5: handler refactor complete** | All 40 remaining cases extracted. processGameAction ≤ 200 lines. Each extraction verified against live simulation baseline. |
| **7** | **Phase 6: client split complete** | game2d.html ≤ 200 lines. All 8 JS modules extracted. Trade dialog requestedItems bug fixed. Live game functions identically. |
| **8** | **Phase 7: security \+ persistence** | maxPayload set. Session tokens implemented. Admin rate limiting added. PostgresPersistence class implemented (not yet migrated). |
| **9** | **Phase 8: guardrails installed** | ESLint boundary rules enforced. TypeScript strict mode. Line count advisory warnings. Test count gate on CI. |
| **10** | **Final summary report** | LOC before/after. Handlers extracted count. Files deleted. Bugs fixed (including requestedItems). Regression verification: 100/100 tests, live simulation snapshot match. |

## **Working style rules**

* After each domain extraction (Phase 5): commit with message refactor(handlers): extract \[domain\] handlers — then run the 100 tests before starting the next domain.

* After each client module split (Phase 6): connect a live browser client and verify the affected UI panel works end-to-end before the next split.

* Never drift into feature work. The requestedItems trade dialog fix is the only feature-adjacent change permitted — it is explicitly included because it occurs naturally during the trade-dialog.ts extraction.

* When uncertain whether something is safe to delete: comment out in one commit, run tests and live snapshot, then delete in the next. No speculation.

* Treat realm.json as sacred during this protocol. No changes to save file structure without a corresponding migration and load test.

| Expected outcome: gateway.ts from 3,741 lines to under 1,000. game2d.html from 3,188 lines to under 200\. 100/100 tests still passing. Zero behavior changes to any player-visible game output. The realm grows its next chapter on a clean foundation. |
| :---- |

