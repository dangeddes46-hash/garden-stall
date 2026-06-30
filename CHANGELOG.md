# Changelog — The Garden Stall

## 2026-06-29 — Condition pressure and watering

Advanced the Prototype 0.1 trading loop with visible-stock watering and end-of-day condition pressure.

Added:

- `prototype/src/systems/conditionSystem.js`
- condition log state in `prototype/src/state/initialState.js`
- condition-pressure actions in `prototype/src/state/reducer.js`

Changed:

- Display setup and trading now include a `Water visible stock` action.
- Visible/reduced stock can dry out based on weather drying modifier, display exposure, and plant moisture profile.
- Fragile/thirsty stock can degrade at end of day when exposed, dry, or under medium display stress.
- End-of-day condition events are recorded in daily reports.
- Daily summary now lists condition and moisture changes.
- Debug JSON and Markdown exports now include condition events.

Still not added:

- full zone-specific placement
- full notebook unlock behaviour
- staff implementation
- final art dependency

## 2026-06-29 — Special requests and reduced-stock return fix

Advanced the Prototype 0.1 trading loop with special request scoring and corrected reduced-stock routing.

Added:

- `prototype/src/systems/requestSystem.js`
- special request state in `prototype/src/state/initialState.js`
- special request actions in `prototype/src/state/reducer.js`
- special request UI in `prototype/src/App.jsx`

Changed:

- Reduced stock can now return only to the main display or the van during trading-day setup.
- The old reduced-stock `Return home` option was removed because it wrongly made stock unavailable for the current trading day.
- Special requests can be generated during trading.
- Visible display/reduced stock can be recommended to the active request customer.
- Request outcomes now score as excellent, good, acceptable, poor, or bad.
- Request results include revenue, reason text, warning context where relevant, and queued notebook reward notes.
- Daily summary now includes passive sales and request count/revenue.
- Debug JSON and Markdown exports now include request state and request log.

Still not added:

- condition degradation
- full zone-specific placement
- full notebook unlock behaviour
- staff implementation
- final art dependency

## 2026-06-29 — Tray batches, display score, and passive waves

Advanced the Prototype 0.1 implementation from the first shell into the next narrow gameplay pass.

Added:

- `prototype/src/data/trayProfiles.js`
- `prototype/src/systems/displaySystem.js`
- `prototype/src/systems/customerSystem.js`

Changed:

- Supplier listings now use physical tray/grid batch profiles rather than arbitrary prototype quantities.
- Batch profiles include 2x3 trays, 4x6 trays, 3x5 trays, feature pot groups, and sundry packs.
- Most starter bedding/grow-your-own lines now use 4x6 trays where appropriate.
- Stock batches now carry batch label, batch type, and load type through from wholesaler to collection.
- Van loadout continues to use tray spaces plus feature potted capacity.
- Display setup now has total display slot capacity enforcement.
- Display setup now produces a simple display score and rating.
- Trading now has passive customer waves with sales, revenue, missed demand, and a visible trading log.
- Daily summary now reports passive wave sales, missed demand, and revenue.

Still not added:

- special request scoring
- condition degradation
- full zone-specific placement
- notebook unlock behaviour
- staff implementation
- final art dependency

## 2026-06-29 — Van capacity correction

Adjusted the prototype van loadout model after first local smoke test feedback.

Changed:

- Added `prototype/src/data/vanCapacity.js`
- Updated `prototype/src/systems/stockSystem.js`
- Updated `prototype/src/state/reducer.js`
- Updated `prototype/src/App.jsx`

Van capacity now uses:

- 6 tray spaces
- 6 loose/feature potted plants

This replaces the first-pass behaviour where the van counted individual plant units, causing one tray of six plants to consume six capacity.

## 2026-06-29 — First Prototype 0.1 code pass

Started implementation from B-001 in `/prototype/`.

Added:

- Vite + React + JavaScript app shell
- `prototype/package.json`
- `prototype/index.html`
- `prototype/src/main.jsx`
- `prototype/src/App.jsx`
- `prototype/src/styles.css`
- static data modules for constants, plants, locations, supplier listings, customer archetypes, customer seeds, special requests, notebook discoveries, and first-week script
- reducer-based initial state and phase flow
- order, stock, and report helper systems
- Day 0 wholesaler order flow
- Day 1 collection flow
- placeholder screens for weather, location, van loadout, route, display setup, trading, and daily summary
- debug/admin reset, phase jump, cash tools, next-day jump, JSON export, and Markdown report export

Updated:

- `prototype/README.md`
- `CURRENT_STATUS.md`

No backend, save/load, TypeScript, drag-and-drop display, staff implementation, or final art dependency was added.

## 2026-06-29 — B-001 implementation plan filed

Added approved Builder implementation reference:

- B-001 — Prototype 0.1 Implementation Plan
- Path: `/docs/implementation/build-plans/B-001 — Prototype 0.1 Implementation Plan.md`

Updated:

- PROJECT_INDEX
- CURRENT_STATUS

B-001 defines the practical first-build plan for the smallest playable Prototype 0.1 implementation, including app structure, data modules, screens, systems, debug/admin controls, simplifications, risks, and build order.

## 2026-06-29 — Foundation document filing update

Added uploaded foundation documents to the repository filing plan:

- Document 1 — Pre-Production Foundation Brief
- Document 2 — Core Vision Brief
- Document 3 — Plant Schema and Tag Bible
- Document 4 — Customer and Request System
- Document 5 — Location Specification

Updated:

- PROJECT_INDEX
- CURRENT_STATUS

Documents 1–17 are now filed or ready for filing.

## 2026-06-29 — v0.1-docs-foundation

Initial foundation Codex prepared for GitHub filing.

Added foundational document set:

- Document 1 — Pre-Production Foundation Brief
- Document 2 — Core Vision Brief
- Document 3 — Plant Schema and Tag Bible
- Document 4 — Customer and Request System
- Document 5 — Location Specification
- Document 6 — Core Loop Specification
- Document 7 — Prototype 0.1 Vertical Slice Content Plan
- Document 7A — Consequential Design Concepts
- Document 8 — Wholesaler Interface Specification
- Document 9 — Display and Merchandising Specification
- Document 10 — Economy, Pricing and Stock Condition Specification
- Document 11 — Staff Pressure and Progression Specification
- Document 12 — Player Knowledge, Notebook and Skill Tree Specification
- Document 13 — Prototype 0.1 Build Brief
- Document 14 — Repository and Codex Structure
- Document 15 — Art Direction and Visual Bible Starter Brief
- Document 16 — Data Schema Specification
- Document 17 — Initial GitHub Repository Setup Pack

Established repository workflow principles:

- ChatGPT conversations are workshops.
- GitHub is the permanent Codex.
- Repository documents are the source of truth.
- Reading Packs should provide exact document paths.
- Codex reconciles reviews before Builder implementation.
