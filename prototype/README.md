# Garden Stall Prototype 0.1

Browser prototype for The Garden Stall.

Current implemented slice:

- Vite + React + JavaScript app shell
- static data foundation
- phase loop skeleton
- Day 0 wholesaler order
- Day 1 morning collection
- tray-grid batch profiles: 2x3, 4x6, 3x5, feature pot groups, and sundry packs
- van capacity model: 6 tray spaces plus 6 loose/feature potted plants
- basic home stock / van loadout flow
- location, route, display, trading, and daily summary screens
- display slot capacity enforcement
- simple display score and display rating
- reduced stock returns only to display or van during the trading day
- passive customer wave simulation
- special request generation and scored recommendations
- trading log with sales, revenue, missed demand, request outcomes, and recommendation reasons
- debug reset, phase jump, cash tools, next-day jump, JSON export, and Markdown report export

## Run locally

From the repository root:

```bash
cd prototype
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

After pulling changes, restart Vite if it was already running.

## Current limitations

This is not yet the full Prototype 0.1 gameplay loop.

Still placeholder:

- condition degradation
- full zone-specific display placement
- detailed weekly summary
- full notebook unlocking
- staff pressure metrics
- final art and visual direction

No backend, save/load, TypeScript, drag-and-drop, staff system, or final art dependency has been added.
