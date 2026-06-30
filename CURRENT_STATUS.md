# Current Status — The Garden Stall

## Phase

Prototype 0.1 implementation is active from B-001.

## Current Milestone

`v0.1-stacked-progressive-trading`

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
- reducer-based phase loop skeleton
- Day 0 County Plant Wholesale order flow
- Day 1 morning collection flow that converts pending orders into home stock tray batches
- physical tray-grid batch profiles: 2x3, 4x6, 3x5, feature pot groups, and sundry packs
- collection now creates one stock batch per physical tray, not one merged batch per species/order line
- van capacity model: 6 tray spaces plus 6 loose/feature potted plants
- loading and display movement now operate one physical tray batch at a time
- home, van, display, reduced, and request recommendation lists visually stack matching tray batches
- stacked stock buttons move or recommend one physical tray from the stack
- location, van loadout, route, display, trading, and daily summary screens
- display slot capacity enforcement per tray batch
- simple display score and display rating
- reduced stock can now return only to display or van during trading-day setup
- unsold van/display/reduced stock is automatically packed back home at end of day
- passive customer wave simulation with sales, revenue, missed demand, and trading log
- progressive wave-by-wave moisture/condition pressure during trading
- special request generation and scored recommendations against visible stock
- request log with outcome, revenue, reason, warning context, and queued notebook reward notes
- visible-stock watering action during display setup and trading
- end-of-day condition wrap-up based on display exposure, moisture, plant risk, and weather stress
- condition change reporting in trading log, daily summary, JSON export, and Markdown debug report
- debug/admin panel with cash tools, phase jump, next-day jump, reset, JSON export, and Markdown report export

Still placeholder:

- full zone-specific display placement
- detailed weekly summary
- full notebook unlock behaviour
- staff pressure metrics
- final artwork and visual polish

## Current Priority

Run the `/prototype/` app locally after pulling latest changes, confirm stacked stock movement and progressive drying behave sensibly, then implement full zone-specific display placement as the next narrow target.

## Recommended Next Actions

1. Run `git pull`, then `cd prototype && npm run dev` locally.
2. Reset the prototype from the debug panel.
3. Order multiple matching tomato trays and collect them.
4. Confirm matching tomato trays stack into one home-stock line.
5. Press `Load one` repeatedly and confirm each click moves one tray to the van.
6. Press `Display one` repeatedly and confirm each click moves one tray to display while consuming one slot.
7. Simulate several customer waves without watering and confirm moisture changes appear during wave logs.
8. Water visible stock mid-trading and confirm later waves behave differently.
9. Implement full zone-specific display placement next.

## Known Risks

- This latest code pass has not yet been run in a local Vite environment by the Builder window.
- Batch wholesale costs are rough estimates after moving to larger physical tray quantities.
- Passive customer scoring is deliberately simple and may need quick tuning.
- Special request scoring currently uses known good/acceptable/poor/bad plant lists, not deeper explanation logic.
- Progressive condition pressure is intentionally readable and deterministic; it may need tuning after local playtest.
- Display placement is still zone-light: it enforces total display slots but does not yet assign stock to individual front table/floor/reduced zones.
- Real-time trading should remain a testable wave/timer system first, with pauseable menus and strong debug controls.
- Daily and weekly summaries must explain outcomes clearly or the loop will feel opaque.
- Art direction must not delay systems testing.
- Repository must remain source of truth to avoid chat-memory drift.
