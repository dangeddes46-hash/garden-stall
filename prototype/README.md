# Garden Stall Prototype 0.1

Browser prototype for The Garden Stall.

Current version: `0.1.16-app-split`

Current implemented slice:

- Vite + React + JavaScript app shell
- `App.jsx` has been split into smaller screen/component files so future UI work can be edited safely
- shared UI helpers live in `prototype/src/components/ui.jsx`
- stock list, tray row, price, display-zone, and reduced-area controls live in `prototype/src/components/StockLists.jsx`
- setup flow screens live in `prototype/src/screens/SetupScreens.jsx`
- trading screen lives in `prototype/src/screens/TradingScreen.jsx`
- daily summary screen lives in `prototype/src/screens/DailySummary.jsx`
- debug overlay lives in `prototype/src/components/DebugOverlay.jsx`
- phase routing lives in `prototype/src/screens/PhaseRenderer.jsx`
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
- pricing bands have been tuned to be less binary: bargain/reduced are less overpowering and premium is less punitive when stock is strong
- trading logs include sale price band, unit price, score, and clearer reason text
- missed-demand notes include the closest match and the score gap where useful
- daily report captures an unsold stock summary before packdown
- daily report captures next-order guidance built from leftovers, missed demand, pricing shape, and condition risk
- Daily Summary now has direct What Did Not Sell and Next Order Guidance sections
- Daily Summary headline note includes top unsold stock highlights and the first next-order clue
- Markdown debug report includes dedicated What Did Not Sell and Next Order Guidance sections
- first-pass notebook discovery system
- notebook entries unlock from observed daily outcomes
- notebook entries currently cover display zones, pricing, drying, requests, and missed demand
- side-panel notebook groups discoveries by category
- daily summary answers what sold, money earned, blockers, condition changes, notebook learning, and what to try tomorrow
- Markdown debug export includes notebook entries and a daily review section
- van capacity model: 6 tray spaces plus 6 loose/feature potted plants
- van load buttons disable with player-facing capacity reasons when the relevant space is full
- display zone cards show full zones and placement buttons disable before blocked debug spam is produced
- loading and display movement work one tray/pot batch at a time
- home, van, display, reduced, and request lists group by plant species and expand into individual trays/pots
- species groups with fewer than 5 batches open by default; 5 or more start closed
- visible stock watering is now per tray/pot, not global
- repeated watering can set plants to `waterlogged`, shown to players as overwatered
- overwatered visible stock carries a light end-of-day condition risk if left on display and a very small sales-score penalty
- condition pressure thresholds have been lightly softened after local smoke-test feedback
- basic home stock / van loadout flow
- location, route, display, trading, and daily summary screens
- display zones: Front Table, Floor / Crates, Feature Spot, and Reduced Area
- zone capacity enforcement per area
- van stock can be placed directly into a chosen display zone
- visible stock can be moved between display zones
- display score and customer scoring now consider zone fit
- reduced-area scoring is a little less severe, so one or two clearance batches do not overwhelm the stall story
- display notes now give slightly clearer advice for gappy, tired, or over-reduced displays
- reduced stock can return to a selected display zone or van during the trading day
- unsold van/display/reduced stock is packed back home at end of day
- passive customer wave simulation
- progressive wave-by-wave moisture/condition ticks during trading
- condition events are compressed into player-facing summaries while raw per-batch detail remains in JSON and detailed debug reports
- practical onboarding copy added to the opening order, van loadout, display setup, trading day, and daily summary screens
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

On Windows, `npm.cmd install` and `npm.cmd run dev` are also valid.

Then open the local Vite URL shown in the terminal.

After pulling changes, restart Vite if it was already running.

## Current limitations

This is not yet the full Prototype 0.1 gameplay loop.

Still placeholder:

- detailed weekly summary
- notebook entries are readable feedback only, not skill bonuses yet
- staff pressure metrics
- final art and visual polish

No backend, save/load, TypeScript, drag-and-drop, staff system, or final art dependency has been added.
