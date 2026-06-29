# Current Status — The Garden Stall

## Phase

Pre-production Codex foundation established; Builder implementation planning has begun.

## Current Milestone

`v0.1-prototype-planning`

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

## Current Priority

Begin Prototype 0.1 implementation from B-001, starting with the `/prototype/` app shell, static data foundation, phase loop skeleton, Day 0 wholesaler order, Day 1 collection, and debug reset/export scaffolding.

## Recommended Next Actions

1. Create the `/prototype/` Vite/React/JavaScript app shell.
2. Add initial data modules for constants, plants, locations, supplier listings, customer archetypes, requests, notebook data, and week script.
3. Implement the phase loop skeleton from Day 0 order through weekly summary.
4. Add mandatory debug/admin reset and export scaffolding early.
5. Keep all implementation within accepted Prototype 0.1 scope.

## Known Risks

- Scope is large for a first prototype.
- Real-time trading should be implemented as a testable wave/timer system first, with pauseable menus and strong debug controls.
- Display must remain tray/slot based and not become pixel-placement.
- Daily and weekly summaries must explain outcomes clearly or the loop will feel opaque.
- Art direction must not delay systems testing.
- Repository must remain source of truth to avoid chat-memory drift.
