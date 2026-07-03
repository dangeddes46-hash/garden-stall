# Current Status — The Garden Stall

## Phase

Prototype 0.1 implementation is active from B-001.

## Current Milestone

`0.1.23-stability-report-consolidation`

## Current Source of Truth

The GitHub repository is the permanent Codex and source of truth.

## Current Prototype State

The Prototype 0.1 browser app lives in `/prototype/`.

The current playable loop is:

```text
order -> collect -> load -> display -> trade -> report -> order again
```

Implemented:

- Vite + React + JavaScript app shell.
- Reducer-based phase loop and split screen/component structure.
- Day 0 / evening wholesaler ordering.
- Morning collection into physical tray/pot stock batches.
- Home, van, display, reduced, sold, and packed-home stock states.
- Van capacity: 6 tray spaces plus 6 loose/feature potted plants.
- Manual stock movement, pricing, reduced-area, and watering controls.
- Autoload varied van convenience action.
- Autodisplay varied stall convenience action.
- Compact van and 15-slot display schematics.
- Display zones: Front Table, Floor / Crates, Feature Spot, and Reduced Area.
- Per-batch condition, moisture, base/current retail price, and price band.
- Passive customer trading checkpoints, sale reasons, missed-demand notes, and pricing notes.
- Trading clock modes, with auto-advance paused while a special request is active.
- Reducer guard preventing extra customer waves after packdown-ready / clock completion.
- Special request generation, scoring, revenue, and request log.
- Daily request log is treated as daily state and resets when a new order/day cycle begins.
- Daily report with sales, money, blockers, leftovers, special requests, pricing, condition, notebook, and next-order guidance.
- Canonical report export now lives in `prototype/src/systems/reportSystem.js`.
- Headless reducer/system smoke test via `npm run smoke`.
- Notebook discoveries remain readable feedback only for now.

## Current Priority

Keep the loop stable and inspectable before adding more gameplay systems.

Recommended local check:

```bash
cd prototype
npm install
npm run smoke
npm run dev
```

On Windows:

```bat
cd prototype
npm.cmd install
npm.cmd run smoke
npm.cmd run dev
```

## Known Risks / Limitations

- This build still needs Daniel's local browser smoke test after pull.
- The smoke test is headless and reducer/system-level, not a browser UI test.
- Staff, upgrades, save/load, drag-and-drop display, final art, new plant systems, and new locations are deliberately not added yet.
- Trading balance, customer scoring, pricing, and condition pressure are still first-pass and need playtest feel.
- Notebook entries are readable feedback only; they do not unlock skills or bonuses yet.
- The app remains a local browser prototype with no backend.
