# Garden Stall Prototype 0.1

Browser prototype for The Garden Stall.

Current version: `0.1.24-daily-weekly-continuity`

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
- Van capacity model: 6 tray spaces plus 6 loose/feature potted plants.
- Manual load, unload, display placement, reduced-area, pricing, and watering controls.
- Autoload varied van convenience button.
- Autodisplay varied stall convenience button.
- Autoload uses variety first, then older home stock, with round-robin plant-line selection.
- Autodisplay uses variety first, then newer van stock, and favours high-potential/showy/giftable/potted stock for stronger display positions.
- Display zones: Front Table, Floor / Crates, Feature Spot, and Reduced Area.
- Compact van and display slot schematics showing occupied slots and plant counts.
- Tray/pot health records, condition, moisture, and per-batch pricing.
- Progressive condition pressure during trading and end-of-day condition wrap-up.
- Trading day checkpoint clock with manual, paused, fast, and debug modes.
- Auto-advance pauses while a special request is active.
- Reducer guard prevents extra customer waves after the trading clock is complete.
- Passive customer simulation, missed-demand notes, sale reasons, price notes, and display scoring.
- Special request generation and scored recommendations.
- Daily reports with sales, money, blockers, leftovers, request results, pricing, condition notes, notebook discoveries, and next-order guidance.
- Week-to-date stats now accumulate across completed days.
- Daily Summary now shows a compact Week so far section.
- Day 7 now routes safely to a minimal Weekly Summary instead of an ordinary evening order.
- Canonical Markdown/JSON debug exports in `prototype/src/systems/reportSystem.js`.
- Notebook discovery/readable feedback layer.
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

Then open the local Vite URL shown in the terminal.

After pulling changes, restart Vite if it was already running.

## Current limitations

Still placeholder / deliberately not added yet:

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
