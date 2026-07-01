# Changelog — The Garden Stall

## 2026-07-01 — Notebook feedback

Added a first-pass notebook feedback system so the prototype can explain what the player learned from actual trading outcomes.

Added:

- `prototype/src/systems/notebookSystem.js`
- first-pass discovery rules for display zones, pricing, drying, requests, and missed demand
- side-panel Notebook grouped by category
- new notebook feedback section in the daily summary
- notebook entries in Markdown debug reports

Changed:

- Current version is now `0.1.9-notebook-feedback`.
- Ending the trading day now builds a daily report, evaluates it for discoveries, and stores only newly unlocked notebook entries.
- Daily summary shows new notebook entries and why they unlocked.
- Header status now shows notebook entry count instead of stock batch count.
- Notebook discoveries are readable feedback only for now; they do not yet unlock skills or bonuses.

Still not added:

- waterlogged gameplay penalties/effects
- detailed weekly summary
- notebook skill bonuses
- staff implementation
- final art dependency

## 2026-07-01 — Pricing controls

Added per-tray/per-pot price bands so merchandising decisions now include both placement and price.

Added:

- `prototype/src/systems/pricingSystem.js`
- base retail price tracking on new stock batches
- tray-card price controls for Bargain, Normal, Premium, and Reduced
- pricing notes in the daily summary

Changed:

- Current version is now `0.1.8-pricing-controls`.
- Price band changes update each batch's current unit retail price from its base retail price.
- Passive customer scoring now considers price sensitivity.
- Bargain pricing helps value-sensitive buyers.
- Premium pricing can discourage price-sensitive buyers.
- Reduced pricing is tied into clearance/bargain behaviour.
- Passive sales now record price band and unit price.
- Special-request sales now use the per-plant sale helper and record price band/unit price.
- Markdown debug reports include pricing information.

Still not added:

- waterlogged gameplay penalties/effects
- detailed weekly summary
- full notebook unlock behaviour
- staff implementation
- final art dependency

## 2026-07-01 — Display zones

Reworked display setup from one broad display area into explicit merchandising zones.

Changed:

- Current version became `0.1.7-display-zones`.
- Added Front Table, Floor / Crates, Feature Spot, and Reduced Area as display zones.
- Each zone has its own capacity.
- Van stock can be placed directly into a selected zone.
- Visible stock can move between display zones.
- Display score considers zone fit as well as fullness, colour, giftability, tired stock, and reduced-stock pressure.
- Customer passive-wave scoring considers zone fit for each candidate batch.
- Trading log records the sale zone for bought stock.
- Reduced stock can return to a selected display zone or van during trading-day setup.
- Display zone is included in Markdown debug reports.

Still not added:

- pricing controls
- waterlogged gameplay penalties/effects
- detailed weekly summary
- full notebook unlock behaviour
- staff implementation
- final art dependency

## 2026-06-29 — Tray health expanders and individual watering

Reworked the stock UI and health model after playtest feedback showed that identical trays cannot safely stack because each tray develops its own health profile.

Added:

- `prototype/src/systems/healthProfileSystem.js`
- small prototype version tag in the top header
- per-plant health records inside each new tray/pot batch

Changed:

- Current version is now `0.1.6-tray-health-expanders`.
- Plant species no longer stack into one action row.
- Stock lists now group by species and expand into individual tray/pot cards.
- Species groups with fewer than 5 batches open by default.
- Species groups with 5 or more batches start closed.
- Each tray/pot card shows its own average condition and moisture.
- Tray average condition/moisture is calculated from active plant records inside that tray.
- Sales mark individual plant records sold before recalculating the tray average.
- Feature/loose potted plants are split into individual stock batches during collection.
- Watering is per tray/pot, not global visible-stock watering.
- Watering the same tray/pot again can set active plants to `waterlogged`.
- `waterlogged` status is recorded but does not have a negative gameplay effect yet.
- The Current Stall panel is visible during trading so progressive drying can be checked before end-of-day.

Still not added:

- waterlogged gameplay penalties/effects
- full zone-specific placement
- full notebook unlock behaviour
- staff implementation
- final art dependency

## 2026-06-29 — Stacked stock lists and progressive drying

Improved stock presentation and moved condition pressure from a single end-of-day surprise into visible trading-wave ticks.

Added:

- `prototype/src/systems/stockGroupingSystem.js`

Changed:

- Matching physical tray batches now stack into one visible row in home stock, van stock, display stock, reduced stock, and special request recommendation lists.
- Stacked stock rows still preserve the underlying one-tray-per-record model.
- `Load one`, `Unload one`, `Display one`, `Reduce one`, and `Recommend one` move or use one physical tray from the stack.
- Simulating a customer wave now applies a light moisture/condition tick after the sales pass.
- Wave condition changes appear directly in the trading log.
- End-of-day condition pressure remains as a smaller wrap-up and packdown step.
- Condition reports now include timing such as `wave-1` or `end-of-day`.

Still not added:

- full zone-specific placement
- full notebook unlock behaviour
- staff implementation
- final art dependency

## 2026-06-29 — Tray atomicity, packdown, and tomato drying fix

Corrected stock handling so physical trays are the atomic unit for collection, loading, display, and end-of-day carryover.

Changed:

- Collection now creates one stock batch per physical tray, rather than merging multiple trays of the same species into one batch.
- Ordering three tomato trays now creates three separate tomato tray batches.
- Loading to van now moves one physical tray batch at a time.
- Placing on display now moves one physical tray batch at a time.
- Display capacity now naturally counts each physical tray batch as one display slot.
- Unsold van/display/reduced stock is automatically packed back to home stock at end of day.
- Daily report now records how many unsold tray batches were packed home.
- Tomato/moderate-moisture drying pressure has been increased so a day on display is visible.
- Condition pressure still applies before packdown, so stock carries changed moisture/condition into the next day instead of disappearing.

Still not added:

- full zone-specific placement
- full notebook unlock behaviour
- staff implementation
- final art dependency

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
