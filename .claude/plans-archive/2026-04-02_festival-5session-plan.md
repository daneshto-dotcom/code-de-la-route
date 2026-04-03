STATUS: IN-PROGRESS (Sessions 30-32 complete, Sessions 33-34 remain)

# Festival System — 5-Session Implementation Plan (Sessions 30–34)

## Context

The online game (Founding Realm) is the hype machine for a REAL 10-day immersive medieval festival at Chateau de Chazeuil, France. We need:
1. **Festival Admin Page** — internal "Realm Brain" for Daniel to manage all festival planning (16 data tables, admin-only)
2. **Festival Database Backend** — separate JSON persistence + admin API endpoints
3. **Festival Public Page** — enriched marketing/hype page from 15 blueprint docs

All built on the existing Express/TypeScript/JWT stack. No new frameworks. Festival data is separate from game data (`save/festival.json` vs `save/realm.json`).

---

## SESSION 30 (Current): Open Issues + Festival Foundation

### Phase 1: Fix Open Issues (~30 min)
- **Handoff cleanup**: Move sessions 1–17 handoffs to `docs/handoffs/`, keep 18–29 in root
- **npm audit**: Run audit, document findings (don't force-upgrade)
- **Server restart**: Verify `localhost:3000/health` responds OK

### Phase 2: Festival Types
**New file: `src/types/festival.ts`**
- Branded ID types: `FestivalParticipantId`, `FestivalCharacterId`, `FestivalQuestId`, etc.
- Enums: `LifecycleStage`, `QuestStatus`, `VolunteerTier`, `PermitStatus`, `IncidentSeverity`
- 16 data interfaces matching the Realm Brain schema (Participant, Character, ReputationEvent, Faction, Quest, NPC, EconomyTransaction, Asset, Costume, Zone, BudgetItem, Permit, Partnership, LoreEntry, Volunteer, Incident)
- `FestivalState` container with Maps + arrays + metadata

### Phase 3: Festival Persistence
**New file: `src/persistence/festival.ts`**
- Follow `src/persistence/index.ts` pattern (atomic write: .tmp → rename)
- `FestivalJSONPersistence` class, path: `./save/festival.json`
- Serialize/deserialize Maps ↔ plain objects

### Phase 4: Festival Admin API (4 core tables)
**New file: `src/networking/festival-admin.ts`**
- Reuse `requireAdmin` from admin.ts
- CRUD for: Participants, Characters, Quests, Zones
- `GET /api/admin/festival/stats` — dashboard summary counts
- Pattern: `createFestivalAdminRouter(auth, getFestivalState, saveFestival)`

### Phase 5: Gateway Integration
**Modify: `src/networking/gateway.ts`** (~15 lines)
- Import + instantiate `FestivalJSONPersistence`
- Load festival state on startup
- Mount festival admin router at `/api/admin/festival`
- Add festival save to periodic save interval + shutdown

**Modify: `src/networking/routes.ts`**
- Add `GET /festival-admin` → serve `public/festival-admin.html`

### Phase 6: Skeleton Admin Page + Zone Seed
**New file: `public/festival-admin.html`** — Login panel + Dashboard tab + Participants tab
**New file: `src/seed/festival-seed.ts`** — Pre-populate 18 zones from blueprint data

### Deliverables:
- [ ] Handoff files cleaned up
- [ ] `src/types/festival.ts` (16 interfaces)
- [ ] `src/persistence/festival.ts`
- [ ] `src/networking/festival-admin.ts` (4 CRUD groups)
- [ ] Gateway integration
- [ ] `festival-admin.html` skeleton (2 tabs)
- [ ] Zone seed data

---

## SESSION 31: Festival Admin Core

### Phase 1: Extract Shared Admin Middleware
**New file: `src/networking/middleware/admin-auth.ts`**
- Extract `requireAdmin`, `adminRateLimit`, `validateOrigin` from `admin.ts`
- Both `admin.ts` and `festival-admin.ts` import from shared module

### Phase 2: Expand API to All 16 Tables
**Modify: `src/networking/festival-admin.ts`**
- CRUD for remaining 12 tables: Guilds, NPCs, Volunteers, Assets, Costumes, Budget, Permits, Partnerships, Incidents, Lore, Economy Transactions, Factions
- Specialized endpoints: `lifecycle-summary`, `budget/summary`, `volunteers/skills-matrix`

### Phase 3: Build 5 Core Admin Tabs
**Modify: `public/festival-admin.html`**
- Dashboard (live counts + recent activity)
- Participants (full CRUD + lifecycle stage filter)
- Characters (in-world festival characters)
- Quests (status workflow: draft → active → completed)
- Zones (card grid with capacity/infrastructure)
- JS architecture: `fetchApi()` helper, `switchTab()`, CSS-only modals

### Deliverables:
- [ ] Shared middleware module
- [ ] All 16 CRUD API groups
- [ ] 5 working admin tabs

---

## SESSION 32: Festival Admin Expanded

### Phase 1: Remaining 10 Admin Tabs
**Modify: `public/festival-admin.html`**
- Guilds (18 guild cards with profiles)
- Economy (token supply calculator + budget tracker)
- Volunteers (pipeline + skills matrix)
- Assets/Costumes (combined, condition tracking)
- Schedule (10-day grid view)
- Legal/Permits (status badges, deadline alerts)
- Partnerships (pipeline stage tracking)
- Incidents (safety log with severity)
- Lore/Chronicle (canon management)
- NPCs (profiles + who-plays-them links)

### Phase 2: Enhanced Dashboard
- Aggregated stats across all tables
- Recent activity feed
- Upcoming deadlines (permits, budgets)

### Phase 3: Cross-Table Search
- `GET /api/admin/festival/search?q=term` — search across all tables

### Deliverables:
- [ ] All 15 admin tabs operational
- [ ] Live dashboard with aggregated stats
- [ ] Cross-table search

---

## SESSION 33: Festival Public Page + Game-Festival Bridge

### Phase 1: Content Enrichment
**Modify: `public/festival.html`**
- Add sections: Daily Rhythm, Food & Drink, Music & Entertainment, Safety & Comfort, FAQ
- Expand zone descriptions from 8 → 18 zones
- Deepen class descriptions with progression paths
- Add economy explanation (3-tier currency, sinks, redemption)
- Add timeline (pre-pilot → pilot → Year 1)

### Phase 2: Remove Auth Gate
- Festival info page becomes fully public (marketing/hype page)
- Festival-admin remains admin-only

### Phase 3: Game-Festival Bridge
- Narrative section: "The place is REAL" reveal
- Shared world connections: same zones, NPCs, guilds, economy, Chronicle
- Tease digital↔physical character sync concept

### Phase 4: SEO + Social
- Enhanced OG tags, Twitter Cards
- JSON-LD Event schema markup

### Deliverables:
- [ ] Rich public festival page (no auth gate)
- [ ] Game-festival bridge narrative
- [ ] SEO metadata
- [ ] Dual-entry landing page updated

---

## SESSION 34: Polish, Testing, Deploy

### Phase 1: Mobile Responsiveness
- Test both pages at 768px, 480px, 360px breakpoints
- Fix layout issues, touch targets

### Phase 2: Input Validation
- All POST/PUT endpoints: required fields, email format, enum values, length limits
- Sanitize HTML in text fields

### Phase 3: Export/Import
- `GET /api/admin/festival/export` — full state JSON download
- `POST /api/admin/festival/import` — restore from backup

### Phase 4: Test Suite
**New file: `tests/festival.test.ts`**
- Persistence round-trip (serialize → deserialize)
- CRUD operations for each table
- Auth middleware (reject unauthenticated)
- Validation (reject bad input)

### Phase 5: Production Deploy
- TypeScript 0 errors, esbuild 0 warnings
- All tests passing
- Server restart + Cloudflare tunnel
- Verify live endpoints

### Deliverables:
- [ ] Mobile-responsive pages
- [ ] Validated API endpoints
- [ ] Export/import functionality
- [ ] Test suite
- [ ] Production deployment

---

## File Manifest

| File | Session | Action |
|------|---------|--------|
| `src/types/festival.ts` | 30 | Create |
| `src/persistence/festival.ts` | 30 | Create |
| `src/networking/festival-admin.ts` | 30–31 | Create + Expand |
| `src/seed/festival-seed.ts` | 30 | Create |
| `public/festival-admin.html` | 30–32 | Create + Expand |
| `src/networking/middleware/admin-auth.ts` | 31 | Create |
| `tests/festival.test.ts` | 34 | Create |
| `docs/handoffs/` | 30 | Create directory |
| `src/networking/gateway.ts` | 30 | Modify (~15 lines) |
| `src/networking/routes.ts` | 30, 33 | Modify |
| `src/networking/admin.ts` | 31 | Modify (extract middleware) |
| `public/festival.html` | 33 | Modify (enrich content) |
| `public/landing.html` | 33 | Modify (dual entry) |

## Verification
- Server starts clean on port 3000
- `/health` returns OK
- `/festival` serves public page
- `/festival-admin` serves admin page (requires JWT)
- All `/api/admin/festival/*` endpoints require admin JWT
- `save/festival.json` persists correctly
- All existing game tests (158) still pass
- New festival tests pass
- esbuild produces valid bundle
