# Garden Stall Prototype 0.1

Browser prototype for The Garden Stall.

Current version: `0.1.7-display-zones`

Current implemented slice:

- Vite + React + JavaScript app shell
- static data foundation
- phase loop skeleton
- Day 0 wholesaler order
- Day 1 morning collection
- tray-grid batch profiles: 2x3, 4x6, 3x5, feature pot groups, and sundry packs
- collection creates one stock batch per physical tray, not one merged batch per species/order line
- feature/loose potted plants are split into individual stock batches for individual watering and movement
- each tray/pot contains per-plant health records
- tray condition and moisture are calculated from the active plants inside that tray
- van capacity model: 6 tray spaces plus 6 loose/feature potted plants
- loading and display movement work one tray/pot batch at a time
- home, van, display, reduced, and request lists group by plant species and expand into individual trays/pots
- species groups with fewer than 5 batches open by default; 5 or more start closed
- visible stock watering is now per tray/pot, not global
- repeated watering can set plants to `waterlogged`; waterlogging has no gameplay effect yet
- basic home stock / van loadout flow
- location, route, display, trading, and daily summary screens
- display zones: Front Table, Floor / Crates, Feature Spot, and Reduced Area
- zone capacity enforcement per area
- van stock can be placed directly into a chosen display zone
- visible stock can be moved between display zones
- display score and customer scoring now consider zone fit
- reduced stock can return to a selected display zone or van during the trading day
- unsold van/display/reduced stock is packed back home at end of day
- passive customer wave simulation
- progressive wave-by-wave moisture/condition ticks during trading
- current stall remains visible during trading so drying can be checked before end of day
- special request generation and scored recommendations
- end-of-day condition wrap-up based on display exposure, moisture, plant risk, and weather stress
- trading log with sales, revenue, missed demand, request outcomes, recommendation reasons, sale zone, progressive condition changes, and packdown count
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

- waterlogged effect on condition/sales
- detailed weekly summary
- full notebook unlocking
- staff pressure metrics
- final art and visual direction

No backend, save/load, TypeScript, drag-and-drop, staff system, or final art dependency has been added.
