# Current Status — The Garden Stall

## Phase

Prototype 0.1 implementation has begun from B-001.

## Current Milestone

`v0.1-first-code-pass`

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

The first B-001 implementation target has been started in `/prototype/`.

Implemented:

- Vite + React + JavaScript app shell
- static data modules for plants, locations, supplier listings, customer archetypes, customer seeds, special requests, notebook discoveries, and first-week script
- reducer-based phase loop skeleton
- Day 0 County Plant Wholesale order flow
- Day 1 morning collection flow that converts pending orders into home stock batches
- basic location, van loadout, route, display, trading, and daily summary placeholder screens
- debug/admin panel with cash tools, phase jump, next-day jump, reset, JSON export, and Markdown report export

Still placeholder:

- passive customer simulation
- special request scoring
- display scoring and proper zone capacity enforcement
- condition degradation
- detailed daily and weekly summaries
- notebook unlock behaviour
- staff pressure metrics
- final artwork and visual polish

## Current Priority

Run the `/prototype/` app locally, confirm the first pass loads, and then implement the next narrow target: display zone capacity/scoring plus passive customer wave simulation.

## Recommended Next Actions

1. Run `cd prototype && npm install && npm run dev` locally.
2. Confirm Day 0 order → Day 1 collection → weather → location → van loadout → route → display → trading placeholder → daily summary works.
3. Fix any local runtime issues found by Vite.
4. Implement display zone capacity and readable display score.
5. Implement passive customer wave simulation before special request scoring.

## Known Risks

- This code pass has not yet been run in a local Vite environment by the Builder window.
- Scope is large for a first prototype.
- Real-time trading should be implemented as a testable wave/timer system first, with pauseable menus and strong debug controls.
- Display must remain tray/slot based and not become pixel-placement.
- Daily and weekly summaries must explain outcomes clearly or the loop will feel opaque.
- Art direction must not delay systems testing.
- Repository must remain source of truth to avoid chat-memory drift.
