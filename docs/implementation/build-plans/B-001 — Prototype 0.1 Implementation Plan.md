# B-001 — Prototype 0.1 Implementation Plan

**Project:** The Garden Stall  
**Role:** Builder / Prototype Implementation  
**Document Type:** Build-facing implementation plan  
**Status:** Approved implementation reference  
**Scope:** Prototype 0.1 only  
**Instruction:** Do not code yet. Do not file code yet.

---

## 1. Short Summary of the Accepted Game Loop

Prototype 0.1 is a seven-day playable browser slice proving the core stock-and-sell loop.

The player begins with:

- £80 cash
- no starting stock
- an ugly small van
- basic home stock storage
- limited van storage
- a rough stall display
- no staff
- one generic wholesaler: County Plant Wholesale

The intended loop is:

1. **Day 0 evening order**
   - Player visits County Plant Wholesale.
   - Only four stock lines are buyable: Tomato Plants, Strawberry Plants, Busy Lizzies, Potted Lilies.
   - Other stock appears as sold out.
   - Player places first order for collection on Day 1.

2. **Morning collection**
   - Yesterday evening’s order enters home stock.

3. **Weather / day condition reveal**
   - A simple condition card shows the day’s weather and any light modifier.

4. **Location selection**
   - Player chooses between Market Square, Village Green, and Station Corner.
   - Each location has different fee, fuel, demand, customer mix, price tolerance, and display expectations.

5. **Home stock / van loadout**
   - Player chooses what stock to take from home stock into the van.
   - Home stock is larger than van capacity.
   - Van stock is available during trading; home stock is not.

6. **Route / fuel confirmation**
   - Player confirms daily fuel cost and pitch fee before travelling.

7. **Display setup**
   - Player places trays into simple zones:
     - front table
     - floor space
     - reduced area
     - van storage
   - Display quality affects sales.

8. **Trading phase**
   - Customers arrive over time or in short simulated waves.
   - Passive customers browse visible stock.
   - Occasional special requests interrupt the day.
   - Player can pause decision menus and perform actions.

9. **Care / display actions**
   - Water
   - Tidy
   - Consolidate
   - Move to reduced
   - Reprice
   - Restock from van
   - Clear empty trays

10. **Daily summary**
   - Shows sales, costs, missed demand, display feedback, stock condition changes, notebook discoveries, and special request results.

11. **Evening wholesale order**
   - Player orders stock for the next day.
   - Stock is not instantly available.

12. **Repeat until Day 7**

13. **Weekly summary**
   - Shows performance across the week.
   - Includes profit/loss, best sellers, worst stock decision, best location, missed demand, condition losses, special request performance, notebook learning, staff pressure hints, reset, and export.

The prototype should answer:

> Is the rough little plant stall already fun before the full game exists?

---

## 2. Proposed Prototype App Structure

Use a simple Vite + React + JavaScript app under `/prototype/`.

Recommended structure:

```text
/prototype/
├─ package.json
├─ index.html
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles.css
│  ├─ data/
│  │  ├─ plants.js
│  │  ├─ locations.js
│  │  ├─ supplierListings.js
│  │  ├─ customerArchetypes.js
│  │  ├─ customerSeeds.js
│  │  ├─ specialRequests.js
│  │  ├─ notebookData.js
│  │  ├─ weekScript.js
│  │  └─ constants.js
│  ├─ state/
│  │  ├─ initialState.js
│  │  └─ reducer.js
│  ├─ systems/
│  │  ├─ phaseSystem.js
│  │  ├─ orderSystem.js
│  │  ├─ stockSystem.js
│  │  ├─ displaySystem.js
│  │  ├─ customerSystem.js
│  │  ├─ requestSystem.js
│  │  ├─ conditionSystem.js
│  │  ├─ economySystem.js
│  │  ├─ notebookSystem.js
│  │  ├─ reportSystem.js
│  │  └─ debugSystem.js
│  └─ components/
│     ├─ Layout.jsx
│     ├─ HeaderStatus.jsx
│     ├─ PhaseNav.jsx
│     ├─ TitleScreen.jsx
│     ├─ WholesalerScreen.jsx
│     ├─ CollectionScreen.jsx
│     ├─ WeatherScreen.jsx
│     ├─ LocationScreen.jsx
│     ├─ VanLoadoutScreen.jsx
│     ├─ RouteConfirmScreen.jsx
│     ├─ DisplaySetupScreen.jsx
│     ├─ TradingScreen.jsx
│     ├─ SpecialRequestPanel.jsx
│     ├─ StockPanel.jsx
│     ├─ PricingPanel.jsx
│     ├─ NotebookPanel.jsx
│     ├─ DailySummary.jsx
│     ├─ WeeklySummary.jsx
│     ├─ DebugOverlay.jsx
│     └─ ExportPanel.jsx
```

Keep the first build flat and readable. Avoid clever architecture. The priority is making the loop playable and easy to inspect.

---

## 3. Data Files / Modules to Create

For the first playable pass, use JavaScript data modules rather than splitting into many JSON files. This keeps iteration fast while still remaining data-driven.

### `constants.js`

Define core enums:

- phases
- condition states
- moisture states
- stock locations
- price bands
- display zones
- customer outcome levels
- request outcome levels

Required condition states:

- excellent
- good
- tired
- past-peak
- unsellable

Required moisture states:

- watered
- damp
- dry
- bone-dry

Waterlogged can be deferred unless easy.

Required price bands:

- bargain
- normal
- premium
- reduced

### `plants.js`

Include the 25 Prototype 0.1 stock items:

1. Tomato Plants
2. Strawberry Plants
3. Chilli Plants
4. Lettuce Seedlings
5. Basil
6. Mint
7. Parsley
8. Rosemary
9. Pansies
10. Violas
11. Primroses
12. Bellis Daisies
13. Wallflowers
14. Marigolds
15. Petunias
16. Busy Lizzies
17. Begonias
18. Lobelia
19. Pelargoniums
20. Fuchsias
21. Potted Lilies
22. Daffodil Pots
23. Hyacinth Pots
24. Multipurpose Compost Bag
25. Machine-Made Terracotta Pot

Each plant should include:

- id
- displayName
- category
- tags
- trayFormat
- batchSize
- basePrices
- conditionRisk
- moistureProfile
- displayRole
- supplierNote
- retailNote
- safetyNote, where needed
- prototypeIncluded

Do not overbuild botanical data. Keep the tags retail-useful.

### `locations.js`

Create three locations:

- Market Square
- Village Green
- Station Corner

Each should include:

- id
- displayName
- description
- pitchFee
- fuelCost
- footfall
- pace
- customerWeights
- demandTags
- weakDemandTags
- priceTolerance
- displayPreferences
- exposure
- feedbackLines

### `supplierListings.js`

Create a seven-day listing script for County Plant Wholesale.

Required:

- Day 0 available:
  - Tomato Plants
  - Strawberry Plants
  - Busy Lizzies
  - Potted Lilies

- Day 0 visible but sold out:
  - most other starter stock

- Day 2 additions:
  - Pansies
  - Primroses
  - Multipurpose Compost Bag
  - Machine-Made Terracotta Pot

- Day 3 onward:
  - introduce at least one special offer
  - introduce at least one risky or poorer-value offer
  - gradually expose more starter stock

Each listing should include:

- id
- dayAvailable
- plantId
- supplierId
- batchType
- quantity
- wholesaleCost
- suggestedRetail
- condition
- marginRating
- availability
- tags
- supplierNote
- locationFitHints
- specialOffer
- trueValueRating

### `customerArchetypes.js`

Implement six active archetypes:

- New Gardener
- Flat / Balcony Grower
- Gift Buyer
- Traditional Gardener
- Herb / Kitchen Buyer
- Bargain Hunter

Each should include:

- id
- displayName
- preferredTags
- dislikedTags
- priceSensitivity
- reducedInterest
- patience
- requestChanceModifier
- commonLocations

### `customerSeeds.js`

Create approximately 30 named or lightly named customer seeds.

Keep them simple:

- id
- displayName
- archetypeId
- optional secondaryArchetypeId
- quirks
- likedTags
- dislikedTags
- budgetBand
- memory object

At least 8–10 should have quirks such as:

- has cats
- shady doorstep
- loves purple
- buys for child
- bargain-first
- vague describer
- herb cook
- dislikes strong scent
- hurry gift buyer

### `specialRequests.js`

Create 10 special request templates:

1. Cheerful Gift Under £10
2. Tomato Starter Advice
3. Strawberry Pot for a Child
4. Sunny Balcony Edibles
5. Something for a Shady Doorstep
6. Cheap Front-Step Colour
7. Basket Plant Add-On
8. Compost or Pot Add-On
9. Lily Gift Warning
10. Vague Customer Perfect Plant

Each request should include:

- id
- displayName
- customerLine
- hiddenNeedTags
- goodPlantIds
- acceptablePlantIds
- poorPlantIds
- badPlantIds
- perfectPlantIds
- requiredWarnings
- possibleFollowUps
- outcomeText
- notebookRewards
- skillUnlocks

### `notebookData.js`

Implement a light notebook, not the full skill tree.

Required starter discoveries:

- Tomato + Basil pairing
- Strawberry + Terracotta Pot pairing
- Gift buyers dislike tired stock
- Station Corner likes compact giftable plants
- Village Green likes outdoor colour and pollinator-style stock
- Reduced section helps bargain hunters

Required unlock:

- Ask a Follow-Up

Unlock condition:

- perfect outcome on Vague Customer Perfect Plant

Effect:

- special request customer reveals one additional clue

### `weekScript.js`

Create a controlled first-week arc:

- Day 0: opening wholesaler order
- Day 1: simple selling, low degradation, one request max
- Day 2: introduce sundries and spring colour
- Day 3: introduce special offer, moisture pressure, first reduction opportunity
- Day 4: introduce pairing/discovery opportunity and possible vague customer
- Day 5: increase customer pressure and gappy tray pressure
- Day 6: stronger reputation/request feedback and possible bad offer
- Day 7: final test day and weekly report

---

## 4. Screens / Components to Implement

### 4.1 Title / Start Prototype

Purpose:

- start new run
- show current prototype version
- explain in one sentence what the player is testing

Keep it simple.

### 4.2 Wholesaler Screen

Used for Day 0 and evening orders.

Must show:

- County Plant Wholesale header
- current day
- cash
- cart total
- order fee status
- fee-free threshold
- Plants tab
- Sundries tab
- Special Offers tab from Day 3 onward
- sold-out listings visible but disabled
- add to order button
- checkout / place order button

Do not build advanced sorting. Basic filtering by tab is enough.

### 4.3 Morning Collection Screen

Purpose:

- show yesterday’s order arriving
- convert orders into owned stock batches
- place collected stock into home stock

This can be a simple confirmation screen.

### 4.4 Weather / Day Conditions Screen

Purpose:

- reveal daily condition before location choice

Use simple weather:

- Mild Spring Day
- Sunny
- Grey and Cool
- Light Rain
- Windy

Effects should be light:

- footfall modifier
- drying modifier
- display stress modifier

### 4.5 Location Selection Screen

Show three location cards:

- Market Square
- Village Green
- Station Corner

Each card should show:

- pitch fee
- fuel cost
- expected footfall
- likely customers
- demand hints
- display hints
- price tolerance
- short risk note

### 4.6 Home Stock / Van Loadout Screen

Purpose:

- move stock from home to van before trading
- enforce van capacity
- show condition and price band
- make location-fit decisions readable

Must show:

- home stock list
- van stock list
- van capacity
- stock condition
- tags or short notes
- load / unload controls

### 4.7 Route / Fuel Confirmation Screen

Purpose:

- make cost of location choice explicit

Show:

- route summary
- fuel cost
- pitch fee
- cash before / after operating costs
- confirm travel button

### 4.8 Display Setup Screen

Purpose:

- place van stock into display zones

Required zones:

- front table
- floor space
- reduced area
- van storage

Home stock is not accessible here.

Actions:

- place tray
- move tray
- return to van
- move to reduced
- set price band
- clear empty tray
- consolidate compatible trays
- tidy
- water

### 4.9 Trading Day View

Purpose:

- run the active selling phase

For the first playable pass, use a timer-backed wave model rather than a fully continuous simulation.

Recommended structure:

- Morning wave
- Midday wave
- Afternoon wave
- Closing wave, optional from Day 5 onward

Each wave generates:

- passive customers
- possible special request
- sales / no-sales
- missed demand notes
- stock moisture/condition pressure
- gappy tray pressure

The screen should show:

- current day
- location
- cash
- time segment
- visible display
- current customers / event log
- action buttons
- pause status
- next wave / simulate button, if debug enabled

### 4.10 Customer / Special Request Panel

Purpose:

- active recommendation moments

Show:

- customer line
- visible and van stock options
- suitability hints, if unlocked or debug enabled
- optional follow-up if Ask a Follow-Up is unlocked
- recommend button
- honest no-good-match response, if useful

Outcomes:

- excellent
- good
- acceptable
- poor
- bad

### 4.11 Daily Summary

Must explain:

- total revenue
- pitch/fuel/order costs
- profit/loss
- stock sold
- stock left
- reduced stock sold
- missed demand
- special request outcomes
- display feedback
- stock condition changes
- notebook updates
- staff pressure hints, if any

This is critical. The daily summary teaches the player what to do tomorrow.

### 4.12 Notebook Panel

Keep it light.

Required sections:

- Plants
- Locations
- Customers
- Pairings
- Mistakes / Lessons

The notebook can be mostly text lists for Prototype 0.1.

### 4.13 Weekly Summary

End of Day 7.

Use simple tabs or sections:

- Profit / Loss
- Sales
- Stock and Wastage
- Locations
- Customers
- Knowledge Gained
- Staff Pressure
- Debug / Export

Must include:

- total revenue
- total costs
- profit/loss
- best-selling stock
- worst stock decision
- best location
- missed demand
- stock lost/reduced
- special request performance
- reputation movement
- staff pressure hints
- what the player learned
- recommended next strategy
- continue freeplay
- reset prototype
- export report

### 4.14 Admin / Debug Overlay

Mandatory from first build.

It can be ugly.

Must include:

- advance phase
- pause / resume
- simulate customer
- simulate hour / wave
- end trading day
- jump to next day
- add cash
- remove cash
- force location
- force special request
- add stock
- set stock condition
- set stock moisture
- force degradation
- reveal sale scoring
- reveal display score
- reset prototype
- export debug state
- export playtest report

---

## 5. Systems / Functions to Implement

### 5.1 Phase System

Owns progression between phases.

Required phases:

- title
- day0-order
- morning-collection
- weather
- location-selection
- van-loadout
- route-confirmation
- display-setup
- trading
- daily-summary
- evening-order
- weekly-summary
- freeplay

Rules:

- Day 0 starts at `day0-order`.
- Day 1 starts with collection.
- Days 1–7 follow the normal day loop.
- Day 7 daily summary leads to weekly summary.

### 5.2 Order System

Responsibilities:

- build current supplier listing from week script
- add listing to cart
- calculate order subtotal
- apply order fee
- validate cash
- place order for next morning
- convert order to stock batches on collection
- mark listing availability

### 5.3 Stock System

Responsibilities:

- track owned stock batches
- track units remaining
- track location state: home, van, display, reduced-area, sold, discarded
- track price band
- track condition
- track moisture
- track flags
- apply sales
- apply reductions
- return unsold van/display stock to home at end of day
- prevent negative stock

### 5.4 Display System

Responsibilities:

- maintain display zones
- enforce zone capacity
- calculate visible stock
- calculate tray fullness
- calculate display rating
- apply empty-slot penalties
- apply tired/past-peak penalties
- apply reduced-area effects
- support tray actions

Display rating can be simple:

- poor
- basic
- decent
- good
- strong

It should produce readable feedback text, not just a number.

### 5.5 Customer System

Responsibilities:

- generate finite customer pool
- pick customers from location-weighted archetypes
- generate passive customer intent
- score visible stock
- choose sale / no sale
- create missed demand note when no good match exists
- update customer memory lightly
- log customer events

Passive sale scoring should consider:

- plant tag match
- location demand
- customer archetype
- visible display zone
- price band
- condition
- display rating
- reduced status

Keep formula simple and visible in debug mode.

### 5.6 Special Request System

Responsibilities:

- select request from daily pool
- attach customer
- evaluate player recommendation
- check stock availability
- apply sale if accepted
- score outcome
- apply reputation / notebook / skill effects
- handle Ask a Follow-Up once unlocked

### 5.7 Condition System

Responsibilities:

- degrade stock by exposure and age
- update moisture
- apply watering/tidying effects
- apply past-peak behaviour
- mark unsellable stock
- log condition changes for summaries

Initial degradation should be generous and tunable.

Priority is fairness and readability, not botanical realism.

### 5.8 Economy System

Responsibilities:

- cash changes
- stock purchase costs
- order fees
- pitch fees
- fuel costs
- sales revenue
- estimated profit/loss
- reduced stock revenue
- unsellable losses
- soft fail state if cash-poor

No tax, VAT, loans, rent, wages, debt, or detailed accounting.

### 5.9 Notebook System

Responsibilities:

- unlock basic plant pages on buying
- add discovery notes after sales/requests/mistakes
- record location insights
- unlock Ask a Follow-Up
- surface end-of-day learning updates
- feed weekly summary

### 5.10 Report / Export System

Responsibilities:

- build daily report
- build weekly report
- build debug JSON export
- build readable Markdown playtest report
- include debug interventions in export

### 5.11 Debug System

Responsibilities:

- expose state controls
- log all debug interventions
- allow quick playthrough testing
- reveal hidden score calculations
- support balance iteration

---

## 6. Debug / Admin Controls

Admin controls are not optional. They should be present before balancing starts.

Minimum controls for first playable pass:

### Phase / Time

- Advance phase
- Jump to phase
- Pause / resume
- Simulate customer
- Simulate wave / hour
- End trading day
- Jump to next day

### Economy

- Add £10
- Add £50
- Remove £10
- Toggle order fee
- Force sale
- Force no-sale
- Reveal sale score

### Stock

- Add selected stock
- Remove selected stock
- Set condition
- Set moisture
- Toggle reduced
- Force degradation
- Disable degradation

### Display

- Reveal display score
- Fill display with suggested layout
- Clear display
- Force gappy trays

### Customers

- Force archetype
- Force special request
- Reveal customer preferences
- Reveal request scoring

### Notebook / Skills

- Unlock notebook entry
- Unlock Ask a Follow-Up
- Reset discoveries

### Export

- Copy JSON state
- Copy Markdown report
- Reset prototype

---

## 7. Recommended Simplifications for First Playable Pass

These simplifications preserve the loop while keeping the build achievable.

### 7.1 Use wave-based trading with real-time flavour

The design asks for real-time trading, but first build should avoid complex continuous simulation.

Recommended compromise:

- Trading day is divided into short timed or button-advanced waves.
- Each wave represents a slice of trading time.
- Debug can simulate a wave instantly.
- Later, the wave system can be made more continuous.

This keeps trading testable.

### 7.2 Use data modules, not formal JSON files, initially

Use `.js` exported arrays/objects for speed.

Move to `.json` later if desired.

### 7.3 Use one reducer / central state

Avoid external state libraries.

A single reducer is enough for:

- phase changes
- stock movement
- sales
- reports
- debug actions

### 7.4 Use labels and simple cards instead of art

Placeholder UI should be readable:

- plant cards
- tray blocks
- condition badges
- customer cards
- supplier listing cards

No need for final art.

### 7.5 Use broad scoring, not complex formulas

Customer sale logic should be readable and debuggable.

Example:

- +3 strong tag match
- +2 location demand
- +1 good display zone
- -2 tired condition
- -2 premium price mismatch
- +2 reduced for bargain hunter

Exact values can be tuned later.

### 7.6 Start with ten special requests, not twelve

The build brief accepts ten as required.

Add more only after the first playable loop works.

### 7.7 Implement notebook as practical logs first

Notebook does not need full UI charm.

Initial version can be grouped text entries with unlock messages.

### 7.8 Staff is metrics-only

Do not implement staff hiring, staff UI, wages, or task assignment.

Only track staff-pressure metrics for the weekly summary.

### 7.9 Weather should be light

Weather should be visible and have small multipliers.

Do not build complex weather.

### 7.10 No save/load

Only reset and export.

Browser refresh losing state is acceptable for Prototype 0.1 unless Daniel later requests local persistence.

---

## 8. Risks or Ambiguities

### 8.1 Real-time trading may become the largest implementation risk

The accepted build brief asks for real-time trading, but the safest first implementation is wave/timer based with pauseable menus.

Risk:

- too much real-time work too early could delay the playable loop.

Recommendation:

- build wave/timer trading first.
- call it the Prototype 0.1 trading simulation.
- only refine toward smoother real-time once the loop is playable.

### 8.2 The 25-stock list is large for first data entry

25 stock items is manageable, but each needs useful tags, prices, risks, and notes.

Risk:

- data preparation could take longer than the UI shell.

Recommendation:

- implement all 25 definitions, but only fully tune the first 8–12 that appear in the first few days.
- mark later-week stock as provisional.

### 8.3 Display scope could expand too far

Display is central, but could easily become a drag/drop furniture system.

Risk:

- overbuilding display placement before proving sales logic.

Recommendation:

- use buttons and slot cards.
- no pixel-perfect placement.
- no drag-and-drop required for the first pass.

### 8.4 Special request scoring needs to feel fair

If request scoring is opaque, players may feel punished.

Risk:

- players do not understand why a recommendation was good or bad.

Recommendation:

- after each request, show a short reason:
  - “Good match: sunny edible plant.”
  - “Weak match: customer wanted shade.”
  - “Bad match: lilies are unsafe around cats.”

### 8.5 Economy may need fast tuning

Starting cash, pitch fees, fuel, margins, and decline rates are all provisional.

Risk:

- prototype may feel too hard, too easy, or too random.

Recommendation:

- make all economy values data-driven.
- include debug controls from the start.
- include playtest report export before serious balancing.

### 8.6 Daily summary quality is critical

The daily summary is not decoration. It teaches the player.

Risk:

- if summaries are weak, the player will not understand improvement opportunities.

Recommendation:

- implement daily reports early, even if ugly.

### 8.7 Source documents differ slightly on some display capacities

Some documents mention 6 front table slots plus side table; others favour 4 standard tray spaces on the trestle table plus floor/reduced/van.

Recommendation for first pass:

- use tray-based capacity, not individual plant slots.
- start with:
  - front table: 4 tray slots
  - floor space: 4 tray/object slots
  - reduced area: 3 tray slots
  - van storage: 12 tray/object slots
  - home stock: 24 tray/object slots

This matches the newer tray/display specification and keeps setup manageable.

---

## 9. Implementation Order

### Step 1 — Project shell

Create Vite React app in `/prototype/`.

Implement:

- App shell
- header status bar
- central phase renderer
- simple reducer
- initial state
- basic CSS

Acceptance:

- app runs with `npm install` and `npm run dev`
- can start/reset a run
- can move between placeholder phases

### Step 2 — Static data foundation

Create data modules:

- constants
- plants
- locations
- supplier listings
- customer archetypes
- requests
- notebook data
- week script

Acceptance:

- data imports cleanly
- basic validation warnings in console
- no missing plant/location/request references

### Step 3 — Phase loop skeleton

Implement full phase flow:

- Day 0 order
- Day 1 collection
- weather
- location selection
- van loadout
- route confirmation
- display setup
- trading
- daily summary
- evening order
- repeat to Day 7
- weekly summary

Acceptance:

- player can click through all seven days even before detailed simulation is complete

### Step 4 — Wholesaler and orders

Implement:

- County Plant Wholesale UI
- sold-out cards
- cart
- order fee
- place order
- next-day collection
- stock batch creation

Acceptance:

- Day 0 order works
- Day 1 collection creates home stock
- evening orders feed next morning

### Step 5 — Stock, loadout, and pricing

Implement:

- home stock
- van stock
- batch quantities
- price bands
- reduced flag
- condition/moisture badges
- load/unload controls

Acceptance:

- stock can move home → van
- prices can be changed by band
- stock state is visible and understandable

### Step 6 — Display setup

Implement:

- display zones
- place/move/return tray
- front table/floor/reduced zone capacities
- visible stock calculation
- display rating
- display feedback

Acceptance:

- display setup affects a visible display score
- display score is used later in sales

### Step 7 — Passive customer simulation

Implement:

- customer pool
- archetype/location weighting
- passive sale scoring
- sales log
- missed demand log

Acceptance:

- visible stock can sell
- location and display affect sale chance
- no-sale reasons are logged

### Step 8 — Trading phase

Implement:

- wave/timer trading
- customer events
- sale/no-sale log
- basic care pressure
- action buttons between waves
- pause behaviour for menus

Acceptance:

- a trading day can run from open to close
- player sees sales and missed demand
- display can become gappy

### Step 9 — Display actions and condition

Implement:

- water
- tidy
- consolidate
- clear empty tray
- move to reduced
- reprice
- restock from van
- end-of-day degradation

Acceptance:

- condition and moisture matter
- reduced stock can help clear tired plants
- gappy trays can be improved

### Step 10 — Special requests

Implement:

- 10 request templates
- request generation
- recommendation selection
- outcome scoring
- sale/reputation/notebook effects
- Lily Gift Warning safety/honesty handling
- Vague Customer Perfect Plant unlock path

Acceptance:

- player can complete requests
- outcomes are explained
- Ask a Follow-Up can unlock

### Step 11 — Notebook

Implement:

- plant pages unlocked by buying
- discovery entries
- mistake lessons
- location/customer notes
- Ask a Follow-Up status

Acceptance:

- daily actions produce notebook updates
- weekly summary can show knowledge gained

### Step 12 — Daily and weekly reports

Implement:

- daily summary
- weekly summary
- staff pressure metrics
- recommended next strategy
- exportable report data

Acceptance:

- Day 7 ends with useful weekly summary
- report explains what happened and why

### Step 13 — Admin/debug overlay

This should be started earlier as a minimal panel, then expanded here.

Implement full required controls and export.

Acceptance:

- tester can force situations quickly
- debug actions are logged
- JSON and Markdown exports work

### Step 14 — Light visual pass

Add readable charm without delaying systems:

- warm CSS
- simple colour-coded condition badges
- supplier website styling
- tray blocks
- customer cards
- location cards
- basic notebook styling

Acceptance:

- not final art
- readable, pleasant, and practical

---

## 10. Recommended Repository Path for B-001

Recommended path:

```text
/docs/implementation/build-plans/B-001 — Prototype 0.1 Implementation Plan.md
```

Preferred choice is `build-plans` because this is not a canon design brief. It is a practical implementation plan derived from accepted documents.

---

## 11. Document Status Recommendation

Recommended status:

> Approved implementation reference

Reason:

- B-001 interprets accepted repository documents into a practical build order.
- It should guide the Builder, but it should not override Documents 1–17.
- It contains implementation recommendations and simplifications.
- It was approved by Daniel for filing.

---

## 12. Implementation Risks or Scope Concerns

The biggest risks are:

1. **Real-time trading scope**
   - Keep first version wave/timer based and debug-friendly.

2. **Display overcomplexity**
   - Use tray slots and buttons, not drag/drop or pixel placement.

3. **Data volume**
   - Include all 25 stock definitions, but tune first-week stock first.

4. **Opaque sales logic**
   - Every sale/no-sale should generate a readable reason for debug and summaries.

5. **Weak summaries**
   - Daily and weekly reports must be built early because they teach the loop.

6. **Special request fairness**
   - Request results must explain themselves clearly.

7. **Economy balance**
   - Cash, prices, fees, and decline rates are placeholders until playtested.

8. **Notebook scope creep**
   - Keep notebook as practical discoveries and logs; do not build full skill tree.

9. **Staff scope creep**
   - Track staff pressure only. No staff hiring or wages.

10. **Art delay**
   - Use placeholders. Do not wait for finished visual assets.

---

## 13. Questions That Genuinely Block the First Playable Pass

None.

The first playable pass can proceed using the accepted repository documents and the simplifications above.

Non-blocking choices Daniel may later confirm:

1. Whether to use `/docs/implementation/build-plans/` as the new filing folder for B-series Builder plans.
2. Whether Prototype 0.1 should describe its trading as “real-time” or “wave-based trading simulation” in the UI/dev notes.
3. Whether Day 1 should force Market Square for onboarding or allow all three starter locations immediately.

Recommended defaults:

1. Use `/docs/implementation/build-plans/`.
2. Internally implement wave/timer trading; externally describe it as the first real-time trading prototype.
3. Allow all three locations from Day 1 for testing, but mark Market Square as recommended.

---

## 14. Build Readiness Statement

B-001 is sufficient to begin implementation after Daniel approval.

First implementation target:

> Create the `/prototype/` browser app shell, static data foundation, phase loop skeleton, Day 0 wholesaler order, Day 1 collection, and debug reset/export scaffolding.

Do not start coding until Daniel explicitly approves implementation.
