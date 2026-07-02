# Garden Stall Prototype 0.1

Browser prototype for The Garden Stall.

Current version: `0.1.10-clarity-tuning`

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
- each stock batch stores a base retail price and current unit price
- per-tray/per-pot price bands: Bargain, Normal, Premium, Reduced
- price band changes update unit price from the batch's base retail price
- customer scoring now considers price sensitivity
- trading logs include sale price band and unit price
- daily summary includes basic pricing notes
- first-pass notebook discovery system
- notebook entries unlock from observed daily outcomes
- notebook entries currently cover display zones, pricing, drying, requests, and missed demand
- side-panel notebook groups discoveries by category
- daily summary shows new notebook entries and the reason they unlocked
- Markdown debug export includes notebook entries
- van capacity model: 6 tray spaces plus 6 loose/feature potted plants
- van load buttons now disable with player-facing capacity reasons when the relevant space is full
- display zone cards now show full zones and placement buttons disable before blocked debug spam is produced
- loading and display movement work one tray/pot batch at a time
- home, van, display, reduced, and request lists group by plant species and expand into individual trays/pots
- species groups with fewer than 5 batches open by default; 5 or more start closed
- visible stock watering is now per tray/pot, not global
- repeated watering can set plants to `waterlogged`, shown to players as overwatered
- overwatered visible stock now carries a light end-of-day condition risk if left on display
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
- condition events are compressed into player-facing summaries while raw per-batch detail remains in JSON and detailed debug reports
- current stall remains visible during trading so drying can be checked before end of day
- special request generation and scored recommendations
- special request sales now also use the per-plant sale helper
- end-of-day condition wrap-up based on display exposure, moisture, plant risk, and weather stress
- trading log with sales, revenue, missed demand, request outcomes, recommendation reasons, sale zone, price band, unit price, compressed condition notes, notebook discoveries, and packdown count
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

- detailed weekly summary
- notebook entries are readable feedback only, not skill bonuses yet
- staff pressure metrics
- final art and visual direction

No backend, save/load, TypeScript, drag-and-drop, staff system, or final art dependency has been added.
