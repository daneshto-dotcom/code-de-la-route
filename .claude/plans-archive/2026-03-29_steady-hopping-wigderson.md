STATUS: COMPLETED (archived at S74 handoff — plans from S25/S29/S30)

# Session 30 Plan: Festival Landing Page + Dual-Entry Root

## Context
The game is the hype machine for an IRL 10-day medieval festival at Chateau de Chazeuil, France. Session 29 read all 15 festival blueprint documents. Now we build the festival teaser/info page and convert the root URL into a dual-entry point: "Enter the Game" (public) + "Enter the Festival" (admin-only).

## Architecture

### Current state
- `GET /` → `landing.html` (login/register + redirect to `/play2d`)
- Design system: Cinzel + Cormorant Garamond, gold `#d4a847` on dark `#060810`, glassmorphism cards
- Auth: JWT, admin role = `"admin"` or `"developer"`, stored in `localStorage` as `realm_token`

### Target state
- `GET /` → `landing.html` (modified: dual-entry with two CTAs)
- `GET /festival` → `festival.html` (new: rich festival info page, admin-gated client-side)
- `GET /play2d` → `game2d.html` (unchanged)

## Changes (3 files)

### 1. `public/festival.html` (NEW ~400 lines)
A single-page festival teaser with these sections:

**Header:** Full-width hero with logo, title "LEGACY OF THE REALM", subtitle "A Realm to Enter. A Legacy to Forge."

**Section 1: The Vision** — What this is: a persistent, immersive Renaissance kingdom festival at a real 16th-century chateau in central France. Not a show — a functioning society. 10 days. 500+ participants. Year-over-year character persistence.

**Section 2: The World** — The setting: year 1601, after the Great Troubles. A new Sovereign has claimed the chateau and issued the Proclamation of Renewal. 18 named zones across 34 hectares.

**Section 3: Choose Your Path** — 8 character classes displayed as cards: Peasant, Merchant, Artisan, Knight, Adventurer, Noble, Rogue, Clergy. Each with starting conditions and progression path.

**Section 4: The Guilds** — Brief overview of guilds and the guild system. Craft, trade, military, shadow.

**Section 5: The Economy** — Three-tier coin system (copper deniers, silver gros, gold ecus). Labor wages, market trade, guild fees, taxes. Real tokens, real transactions.

**Section 6: The Chronicle** — Everything is recorded. Every founding, death, title, guild charter. History written by those who act. Year-over-year lore accumulation.

**Section 7: The 10-Day Journey** — Timeline visual: 2 pre-arrival days → gates close → 8 nights of immersion → farewell feast → departure.

**Section 8: The Venue** — Chateau de Chazeuil, central France. 34 hectares. A real Monument Historique. (No address/GPS for security — just atmosphere.)

**Footer:** "Coming Soon" + link back to the game.

**Auth gate:** On page load, check `localStorage` for `realm_token`, verify via `fetch('/api/status')` that server is reachable, then decode JWT client-side (base64 payload) to check role. If not admin/developer, show a locked overlay: "This section is reserved for the Council. Enter the Game instead." with a link back to `/`.

**Design:** Same CSS system as landing.html — Cinzel headers, Cormorant Garamond body, gold on dark, glassmorphism cards. Add subtle scroll animations (CSS-only `@keyframes` + `IntersectionObserver`). No frameworks, no build step — pure HTML/CSS/JS like all other pages.

### 2. `public/landing.html` (MODIFY)
Convert the right panel from login-only to a dual-entry layout:

**When logged out:**
- Show login/register form (existing) with "Enter the Realm" button (unchanged)
- Below the auth card: a teaser card for the festival with a lock icon: "The Festival — Council Access Only" → links to `/festival`

**When logged in (token exists):**
- "Enter the Game" button (existing behavior → `/play2d`)
- "Enter the Festival" button → `/festival` (shown to all logged-in users; the festival page itself gates on admin role)

**Minimal changes** — add ~30 lines for the festival CTA below the auth card.

### 3. `src/networking/routes.ts` (MODIFY)
Add one route:
```typescript
router.get("/festival", (_req: Request, res: Response) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path.join(__dirname, "../../public/festival.html"));
});
```

## Content Sources (already read in session 29)
- Master Blueprint v2: festival structure, classes, economy, timeline, scale targets
- Lore Bible: world history, geography (18 zones), Noble Houses, NPCs, emotional tone
- Player Experience Trilogy: experience arc, class-specific journeys
- Core Systems Database: economy details, reputation dimensions

## What We Do NOT Build
- No server-side admin middleware for the festival page (client-side JWT check is sufficient for a teaser page)
- No database changes
- No new API endpoints
- No build step / framework — stays pure HTML/CSS/JS

## Verification
1. `npm run bundle` — confirm no build errors
2. Start server via `preview_start` (port 3000)
3. Navigate to `/` — verify dual-entry layout
4. Navigate to `/festival` without admin token — verify locked overlay
5. Login as `sovereign`/`adminlogin2026` → navigate to `/festival` — verify full page renders
6. Run tests: `npx ts-node --transpile-only tests/simulation.test.ts` — 158/158 still pass
7. `preview_screenshot` of festival page for visual proof
