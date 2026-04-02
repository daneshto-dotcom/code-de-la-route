STATUS: COMPLETED
# Session 25 Plan: Bug Fix + 5 Visual/UX Priorities

## Context
legacyoftherealm.com tunnel is live. The game has 158/158 tests, 165.2KB bundle, and 23 features from session 24. The handoff identified 5 visual/UX priorities as next steps. Additionally, a `gameScene is not defined` ReferenceError breaks mobile buttons and the "Full Menu" sidebar button.

## Execution Order
Bug Fix → P1 (Sprites) → P2 (Combat UI) → P3 (Lighting) → P4 (Tilemap) → P5 (Mobile)

---

## Bug Fix: `gameScene is not defined`

**Root cause:** `game2d.html` onclick handlers (lines 511, 556-559) reference `gameScene` as a global, but it's module-scoped in `game-state.js`. Never exposed on `window`.

**Fix:** In `public/js/renderer.js:103`, after `setGameScene(this)`, add `window.gameScene = this;`

**Files:** `public/js/renderer.js`

---

## P1: Character Sprite Overhaul

**Goal:** Make 9 classes visually distinct by silhouette, not just color.

**File:** `scripts/generate-placeholder-assets.js`

**Changes:**
1. Extend class trait objects (line ~1708) with body parameters: `torsoWidth`, `bodyHeight`, `legLength`, `headSize`, plus class-specific flags (`crouched`, `portly`, `widerStance`, `tallStance`, `apron`, `quiver`)
2. Modify `drawHumanoid()` (line ~1232) to read body params instead of hardcoded proportions
3. Add class-specific detail renderers: Knight wider stance + pauldrons, Rogue crouched + hood, Monk flowing robe, Noble tall + cape, Merchant portly + round head, Artisan apron + tool, Ranger quiver, Peasant thin baseline
4. Apply same parameterization to `drawAttack()`, `drawGather()`, `drawDeath()`, `drawCast()`, `drawHitReact()`
5. Run generator, verify PNGs

**Verification:** `node scripts/generate-placeholder-assets.js` → visually inspect 9 class PNGs → `npm run bundle` → load game, confirm sprites render

---

## P2: Multi-Round Combat UI

**Goal:** Build client-side duel UI for the existing best-of-3 system.

**New file:** `public/js/ui/duel-ui.js`
- `showDuelStanceSelector(options)` — 3-round stance+ability picker with RPS diagram
- `showDuelRoundResult(roundData)` — sequential round reveal with animation (1.5s between)
- `showDuelFinalResult(duelResult)` — victory/defeat banner with score and stake outcome

**Modify:**
- `public/js/ui/menus.js` — route accept through stance selector before sending DUEL_ACCEPT
- `public/js/main.js` — add `DUEL_ROUND_RESULT` handler (currently unhandled), buffer rounds, feed to duel-ui
- `public/game2d.html` — add duel UI container div + CSS (round cards, stance buttons color-coded, power bars, flip animations)
- `public/js/main.js` — update duel challenge initiation to route through stance selector

**Verification:** Two browser tabs, challenge duel from one → stance selection appears → accept from other → rounds reveal sequentially → final result with stake transfer

---

## P3: Dynamic Lighting — Wire to World State

**Goal:** Connect lighting to weather + add moon phase.

**Modify:**
- `public/js/day-night.js` — add `calculateMoonPhase(gameDayCount)` (30-day lunar cycle, 8 phases), integrate moon brightness modifier into night alpha. Add weather integration: rain +0.08 alpha, storm +0.15, fog +0.10, cloudy +0.04
- `public/js/lighting.js` — weather-aware torch/player lights: storm reduces radius 30%, rain 15%, fog diffuses (larger radius, lower intensity)
- `public/js/ui/sidebar.js` — moon phase icon in time display

**Verification:** Set game time to night via server, verify moon affects brightness. Trigger weather events, confirm lighting responds.

---

## P4: Tilemap Artistry

**Goal:** Better buildings, zone-specific ground, animated water.

**File:** `scripts/generate-placeholder-assets.js`

**Changes:**
1. Rewrite building tile painters: `paintStoneWall` (mortar lines, block variation), `paintWoodWall` (grain, knots, planks), `paintDoor` (planks, studs, handle), `paintRoof` (shingle pattern), `paintTimberFrame` (cross-beams, plaster fill)
2. Add zone-specific ground tiles in unused tileset slots: cobblestone, vineyard soil, sandy ground, market floor, worn stone
3. Add 3 water animation frame tiles with shifted ripple positions
4. Wire animated water in `public/js/renderer.js` (tile index cycling in update loop)
5. Update `public/assets/maps/estate.json` to use new tiles in appropriate zones

**Verification:** Run generator → inspect tileset.png → load game → verify buildings look detailed, water animates, zones have distinct ground

---

## P5: Mobile Responsiveness

**Goal:** Polish mobile UX for real-device testing.

**Modify:**
- `public/game2d.html` — sidebar swipe-to-open gesture (touchstart on left edge → swipe right), auto-close sidebar on canvas tap, increase touch target sizes to 44px minimum
- `public/js/main.js` — joystick dead zone increase, long-press-to-interact on NPCs, haptic feedback (`navigator.vibrate`)
- `public/js/renderer.js` — verify Phaser canvas resizes on orientation change

**Verification:** Chrome DevTools mobile emulation (iPhone SE 375px, iPad 768px, landscape), test joystick, sidebar toggle, duel UI at mobile sizes

---

## Build & Test After All Changes
1. `npm run bundle` — verify esbuild succeeds
2. `npx ts-node --transpile-only tests/simulation.test.ts` — 158/158 pass
3. Server restart → load game2d.html → visual inspection
4. Bundle size check (target: <200KB with all new features)
