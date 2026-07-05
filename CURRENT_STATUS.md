# Current Status — The Garden Stall

## Phase

Prototype 0.1 implementation is active from B-001.

## Current Milestone

`0.1.25-stock-handling-summary-readability`

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
- Van capacity: 6 tray spaces, 6 feature-pot spaces, and 3 sundry spaces.
- Potted lilies use grouped feature-pot capacity: 1-3 lilies use 1 feature space, 4-6 use 2.
- Sundries use their own van bay; compost bags and terracotta pot packs do not consume tray or feature-pot space.
- Manual stock movement, pricing, reduced-area, watering, and compatible same-plant tray consolidation.
- Consolidation controls are available for home stock, display setup, and the current stall.
- Autoload varied van convenience action.
- Autodisplay varied stall convenience action.
- Compact van and display schematics, including separate sundry bay.
- Per-batch condition, moisture, base/current retail price, price band, and rough wholesale value.
- Passive customer trading checkpoints, sale reasons, missed-demand notes, and pricing notes.
- Daily reports with sales, money, blockers, condition-aware leftovers, special requests, pricing, condition, notebook, and next-order guidance.
- Lightweight week/run stats and minimal Weekly Summary.
- Weekly Summary now includes daily breakdown and rough accounting.
- Canonical Markdown/JSON report export includes Daily Review, Week So Far, Seven-Day Breakdown, Weekly Accounting, Stock Summary, raw Stock Batches, requests, pricing, notebook, and condition sections.
- Headless reducer/system smoke test via `npm run smoke`.

## Current Priority

Use the stock-handling and report-readability layer to see what careless play is really doing before any broad economy rebalance.

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

- This build still needs Daniel's local smoke test after pull.
- The smoke test is headless and reducer/system-level, not a browser UI test.
- Broad margin and demand rebalance are deliberately not included in 0.1.25.
- Premium pricing may still sell too easily; this is now more visible in weekly accounting but not rebalanced yet.
- Staff, upgrades, save/load, drag-and-drop display, final art, new plant systems, and new locations are deliberately not added yet.
- Weekly summary is still readable-only: no scoring, achievements, staff pressure, upgrades, or progression rewards.
- Trading balance, customer scoring, pricing, and condition pressure remain first-pass and need playtest feel.
- Notebook entries are readable feedback only; they do not unlock skills or bonuses yet.
- The app remains a local browser prototype with no backend.
