# Garden Stall Prototype 0.1

Browser prototype for The Garden Stall.

Current version: `0.1.25-stock-handling-summary-readability`

## Current implemented slice

The playable prototype loop is:

```text
order -> collect -> load -> display -> trade -> report -> order again
```

Implemented:

- Vite + React + JavaScript app shell.
- Reducer-based phase loop.
- Day 0 / evening wholesale order flow.
- Morning collection flow that converts pending orders into physical tray/pot stock batches.
- Home stock, van stock, display stock, reduced stock, sold stock, and packed-home leftovers.
- Van capacity model: 6 tray spaces, 6 feature-pot spaces, and 3 sundry spaces.
- Potted lilies use grouped feature-pot capacity: 1-3 lilies use 1 feature space, 4-6 use 2.
- Sundries use their own van bay; compost bags and terracotta pot packs do not consume tray or feature-pot space.
- Manual load, unload, display placement, reduced-area, pricing, watering, and compatible tray consolidation controls.
- Autoload varied van convenience button.
- Autodisplay varied stall convenience button.
- Display zones: Front Table, Floor / Crates, Feature Spot, and Reduced Area.
- Compact van and display slot schematics showing occupied slots and plant counts.
- Tray/pot health records, condition, moisture, and per-batch pricing.
- Progressive condition pressure during trading and end-of-day condition wrap-up.
- Passive customer simulation, missed-demand notes, sale reasons, price notes, and display scoring.
- Daily reports with sales, money, blockers, condition-aware leftovers, request results, pricing, notebook discoveries, and next-order guidance.
- Week-to-date stats and minimal Weekly Summary.
- Markdown/JSON debug exports with Daily Review, Week So Far, Seven-Day Breakdown, Weekly Accounting, Stock Summary, and raw Stock Batches.
- Headless reducer/system smoke test via `npm run smoke`.

## Run locally

From the repository root:

```bash
cd prototype
npm install
npm run smoke
npm run dev
```

On Windows, `npm.cmd install`, `npm.cmd run smoke`, and `npm.cmd run dev` are also valid.

After pulling changes, restart Vite if it was already running.

## Current limitations

Still placeholder / deliberately not added yet:

- broad margin rebalance
- broad demand rebalance
- staff implementation
- upgrades
- save/load
- drag-and-drop display
- final art integration
- new plant systems
- new locations
- complex weekly scoring or rewards
- browser-driven automated UI tests

No backend, save/load, TypeScript, drag-and-drop, staff system, or final art dependency has been added.
