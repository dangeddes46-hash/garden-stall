# Current Status — The Garden Stall

## Phase

Prototype 0.1 implementation is active from B-001.

## Current Milestone

`0.1.12-readability-numbers`

## Current Source of Truth

The GitHub repository is the permanent Codex and source of truth.

## Accepted Foundation Documents

Documents 1–17 define:

- pre-production foundation
- core vision
- plant schema
- customer/request system
- locations
- core loop
- prototype content plan
- daily-flow corrections
- wholesaler interface
- display and merchandising
- economy and stock condition
- staff pressure
- notebook and skill tree
- prototype build brief
- repository/codex structure
- visual bible starter brief
- data schema
- initial GitHub setup pack

## Approved Implementation References

- B-001 — Prototype 0.1 Implementation Plan
  - Path: `/docs/implementation/build-plans/B-001 — Prototype 0.1 Implementation Plan.md`
  - Status: Approved Implementation Reference
  - Purpose: Practical build-facing plan for the smallest playable Prototype 0.1 implementation.

## Current Prototype State

The Prototype 0.1 browser app lives in `/prototype/`.

Implemented:

- Vite + React + JavaScript app shell
- static data modules for plants, locations, supplier listings, tray profiles, customer archetypes, customer seeds, special requests, notebook discoveries, and first-week script
- small version tag in the top header, backed by `state.prototypeVersion`
- reducer-based phase loop skeleton
- Day 0 County Plant Wholesale order flow
- Day 1 morning collection flow that converts pending orders into home stock tray/pot batches
- physical tray-grid batch profiles: 2x3, 4x6, 3x5, feature pot groups, and sundry packs
- collection creates one stock batch per physical tray, not one merged batch per species/order line
- feature/loose potted plants are split into individual stock batches for individual watering and movement
- each tray/pot contains per-plant health records
- tray condition and moisture are calculated from the average active plants inside that tray
- each new stock batch stores a base retail price and current unit price
- per-tray/per-pot price bands: Bargain, Normal, Premium, Reduced
- price band changes update the current unit price from the base retail price
- pricing multipliers and customer modifiers have been lightly tuned so premium, bargain, and reduced pricing are less binary
- loading and display movement operate one physical tray/pot batch at a time
- home, van, display, reduced, and request recommendation lists group by plant species and expand into individual tray/pot cards
- species groups with fewer than 5 batches open by default; 5 or more start closed
- visible stock watering is per tray/pot, not global
- repeated watering can set plant moisture to `waterlogged`; the player-facing label is overwatered
- overwatered visible stock has a light end-of-day condition risk if left on display and a very small customer-score penalty
- condition pressure thresholds were lightly softened after successful local smoke testing
- van capacity model: 6 tray spaces plus 6 loose/feature potted plants
- van load buttons disable with clear capacity reasons when tray or feature-pot space is full
- location, van loadout, route, display, trading, and daily summary screens
- display zones: Front Table, Floor / Crates, Feature Spot, and Reduced Area
- zone capacity enforcement per area
- full display zones are labelled and placement buttons disable before debug spam is created
- onboarding copy gently explains first order mix, van capacity, display-zone roles, watering risk, and trading-day checks
- van stock can be placed directly into a selected display zone
- visible stock can move between display zones
- display score considers zone fit as well as fullness, colour, giftability, tired stock, and reduced-stock pressure
- display scoring has been lightly softened: poor displays are less punishing and one or two reduced batches are less damaging
- customer passive-wave scoring considers zone fit and price sensitivity for each candidate batch
- customer missed-demand notes now include the closest visible match and score gap where useful
- strong passive matches can sell up to 4 tray plants instead of always capping at 3
- trading log records sale zone, price band, unit price, score, and clearer reason text for bought stock
- reduced stock can return to a selected display zone or van during trading-day setup
- unsold van/display/reduced stock is automatically packed back home at end of day
- passive customer wave simulation with sales, revenue, missed demand, pricing notes, and trading log
- progressive wave-by-wave moisture/condition pressure during trading
- repeated condition events are compressed into player-facing condition notes in trading and daily summary views
- raw per-batch condition events remain in JSON export, state `conditionLog`, daily reports, and the detailed Markdown debug report section
- current stall remains visible during trading so drying can be checked before end of day
- special request generation and scored recommendations against visible stock
- special request sales now use the per-plant sale helper and record price band/unit price
- request log with outcome, revenue, reason, warning context, price info, and queued notebook reward notes
- first-pass notebook discovery system based on observed daily outcomes
- notebook discoveries for display zones, pricing, drying, requests, and missed demand
- side-panel notebook grouped by category
- daily summary answers what sold, what made money, what held sales back, condition changes, notebook learning, and what to try tomorrow
- notebook entries included in JSON and Markdown debug exports
- Markdown export includes a Daily Review section plus current state, pending orders, stock, requests, pricing, notebook, condition summary, detailed condition changes, and debug log
- end-of-day condition wrap-up based on display exposure, moisture, plant risk, and weather stress
- condition, pricing, and notebook summaries in daily report, JSON export, and Markdown debug report
- debug/admin panel with cash tools, phase jump, next-day jump, reset, JSON export, and Markdown report export

Still placeholder:

- detailed weekly summary
- notebook entries are readable feedback only, not skill bonuses yet
- staff pressure metrics
- final artwork and visual polish

## Current Priority

Run the `/prototype/` app locally after pulling latest changes and confirm the accepted smoke-test route still works with the 0.1.12 pricing/display tuning.

## Recommended Next Actions

1. Run `git pull`, then `cd prototype && npm.cmd install && npm.cmd run dev` on Windows, or `cd prototype && npm install && npm run dev` elsewhere.
2. Reset the prototype from the debug panel.
3. Order a mixed basket including one colourful/giftable line, one edible/useful line, and one possible premium candidate.
4. Place obvious matches in Front Table, Floor / Crates, and Feature Spot, then run all four waves.
5. Try one premium price on good-condition showy stock and one bargain/reduced price on weaker stock.
6. Confirm missed-demand notes now give a more useful clue than only “nothing felt right.”
7. End the day and confirm Daily Summary / Markdown export still read cleanly.
8. Watch whether the revenue feels too generous after strong matches can sell up to 4 tray plants.

## Known Risks

- This latest code pass has not yet been run in a local Vite environment by the Builder window.
- Batch wholesale costs are rough estimates after moving to larger physical tray quantities.
- Passive customer scoring is deliberately simple and may need quick tuning.
- Premium/reduced/bargain tuning is still heuristic and needs local playtest feel.
- Notebook discovery rules are deliberately simple and may need quick tuning after playtest.
- Notebook entries currently provide readable feedback only; they do not yet unlock skill bonuses.
- Special request scoring currently uses known good/acceptable/poor/bad plant lists, not deeper explanation logic.
- Progressive condition pressure has been lightly softened; it may still need tuning after local playtest.
- Overwatered stock has a light end-of-day condition risk and only a tiny customer-score penalty.
- Zone scoring is still first-pass despite the 0.1.12 softening.
- Real-time trading should remain a testable wave/timer system first, with pauseable menus and strong debug controls.
- Daily and weekly summaries must explain outcomes clearly or the loop will feel opaque.
- Art direction must not delay systems testing.
- Repository must remain source of truth to avoid chat-memory drift.
