# THE GARDEN STALL
## Document 13 — Prototype 0.1 Build Brief

**Working Title:** The Garden Stall  
**Document Type:** Implementation Brief / Prototype Scope / Build Target  
**Status:** Draft 001  
**Purpose:** Compress the current design documents into a practical build target for Prototype 0.1, defining the required screens, systems, content, debug tools, end-state reports, exclusions, and acceptance criteria.

---

# 1. Purpose of This Document

This document defines the first playable build target for **The Garden Stall**.

The previous documents describe the game’s vision and systems. This document turns those systems into a practical prototype brief.

Prototype 0.1 should prove the core play experience:

> Order cheap spring stock, collect it, choose a location, load the van, set up a rough display, sell in real time, maintain trays, handle customer requests, reduce tired stock, learn from outcomes, and review the week.

This is not the full game.

It is a working vertical slice.

The build should be simple enough to implement and test, but complete enough to answer whether the core loop is fun.

---

# 2. Intended Use

This document should be usable by:

- the designer
- a future human developer
- an AI coding assistant
- a future artist
- a future repository/codex maintainer
- playtesters
- the project owner

It should lean toward implementation.

It should be practical and checklist-friendly.

The goal is not to restate every design detail from Documents 1–12. The goal is to define what must be built first.

---

# 3. Project Path After This Document

Once this core document set is complete, the intended next step is to set up a GitHub repository for the project.

The repository should eventually include:

- project codex
- design documents
- build briefs
- data schemas
- prototype source code
- art direction
- asset references
- playtest reports
- debug exports
- version history

The future team may include:

- project/codex owner
- gameplay/prototype builder
- artist / visual bible role
- possibly separate UI/UX support later

This build brief should help form the first repository milestone.

---

# 4. Prototype Format

Prototype 0.1 should be:

> Browser-based clickable playable prototype.

Recommended technical shape:

- HTML/CSS/JavaScript or React/Vite-style browser app
- local runtime
- simple in-memory state for first version
- no backend required for Prototype 0.1
- no account/login
- no cloud save
- no online features

The purpose is fast iteration.

The prototype should be easy to run, reset, inspect, and rebalance.

---

# 5. Save System

Prototype 0.1 does not require a persistent save/load system.

Reason:

- too many values will change during early development
- save compatibility will be fragile
- the first prototype is a short test slice
- debug/export tools matter more than saving

Later versions may add local browser save.

Prototype 0.1 should instead include:

- reset playtest button
- debug export button
- playtest report generation
- dev/admin controls to skip, simulate, or manipulate state

---

# 6. Visual Fidelity

Prototype 0.1 should use a light visual prototype style.

It should not be pure greybox.

It should have enough visual identity to test:

- stall layout
- tray fullness
- display appeal
- floor versus table space
- stock condition
- sold-out wholesaler cards
- customer request panels
- notebook discoveries
- weekly report tabs

However, most art can be simple, provisional, or icon-like.

## 6.1 Beautified Standalone Elements

Some standalone elements may be beautified early to explore visual direction.

Examples:

- background scene
- opening screen
- stall backdrop
- wholesaler website header
- weekly report background
- prototype title card

These can be more polished than the rest of the prototype.

This allows the project to explore mood and art style without blocking systems work.

## 6.2 Intended Art Direction

Early visual target:

> Cartoon-drawn, adult storybook warmth, with a gentle Studio Ghibli-like atmosphere, but grounded in rough UK plant retail.

Important distinction:

- not childish
- not twee from the start
- not polished boutique fantasy
- not photorealistic
- not sterile UI simulation

The starting stall should still feel rough:

- ugly van
- folding trestle table
- plastic trays
- handwritten labels
- floor stacks
- practical mess

The charm should emerge through plants, colour, light, and gradual improvement.

## 6.3 Art Tool Note

For early exploration, ChatGPT image generation is likely sufficient for concept mockups and art-direction tests.

Before production assets are locked, the project should compare current specialist image tools and workflows.

This should be handled in a later **Art Direction / Visual Bible** document, not in Prototype 0.1 Build Brief.

---

# 7. Core Prototype Structure

Prototype 0.1 covers:

> 7 trading days.

The structure is:

1. Day 0 evening opening order
2. Day 1 collection and first trading day
3. Days 2–6 expanding stock, requests, and pressure
4. Day 7 final trading day
5. Weekly summary and prototype completion
6. Optional freeplay/continue after completion
7. Reset/export/report options

---

# 8. Day 0 Opening

The prototype should begin with a **Day 0 evening order**.

This preserves the correct daily rhythm.

Day 0 teaches:

- the player orders stock for the next day
- the wholesaler is limited
- stock is bought in batches
- most stock is sold out
- cash is tight
- tomorrow begins with collection

## 8.1 Day 0 Available Stock

Only four stock lines are available:

1. Tomato Plants
2. Strawberry Plants
3. Busy Lizzies
4. Potted Lilies

Most other visible stock is marked:

> SOLD OUT / OUT OF STOCK

The first order should be guided without heavy tutorial text.

## 8.2 Day 0 Starting Cash

Starting cash:

> £80

The player should be able to buy meaningful stock but not feel rich.

---

# 9. Daily Flow

Each trading day follows this structure:

1. Morning collection from wholesaler
2. Stock enters home inventory
3. Weather/day conditions shown
4. Player chooses trading location
5. Player reviews preloaded van selection from previous unsold stock
6. Player adjusts van loadout
7. Route/fuel cost confirmed
8. Player arrives at location
9. Player sets up display
10. Real-time trading begins
11. Player may pause/open action menus
12. Customers browse and buy
13. Special requests may appear
14. Player waters/tidies/consolidates/restocks/reduces
15. Trading day ends
16. Daily summary shown
17. Notebook/discovery updates shown
18. Player places evening wholesaler order
19. Day ends

---

# 10. Real-Time Trading Requirement

Prototype 0.1 should use real-time trading from the start.

However, it must be controllable and testable.

## 10.1 Real-Time Play

During trading:

- customers arrive over time
- customers browse visible stock
- trays become gappy as stock sells
- plants may dry or decline
- special requests appear
- player actions consume in-game time
- display quality changes during the day

## 10.2 Paused Menus

Opening major decision menus should pause the game.

Paused menus include:

- van/restock menu
- display action menu
- pricing menu
- special request decision menu
- notebook, if needed
- debug/admin overlay

The intended rhythm is:

> Real-time pressure, but thoughtful decisions.

## 10.3 Admin Simulation Controls

Admin controls must allow:

- simulate an hour
- simulate a full day
- skip to next phase
- pause/resume time
- adjust time speed
- force customer wave
- force special request
- force sale/no sale
- force degradation event

These controls are mandatory because real-time tuning will be difficult without them.

---

# 11. Prototype End State

At the end of Day 7, the prototype should show a weekly summary.

After the weekly summary, the prototype should allow:

- prototype complete screen
- optional freeplay/continue
- reset playtest button
- debug export button
- automatically generated playtest report

Recommended end behaviour:

> Present the weekly summary as the formal end of Prototype 0.1, then allow optional freeplay continuation for testing.

---

# 12. Weekly Summary

The weekly summary should use tabs.

Required tabs:

1. Profit / Loss
2. Sales
3. Stock and Wastage
4. Locations
5. Customers
6. Knowledge Gained
7. Staff Pressure
8. Debug / Export, if admin mode enabled

## 12.1 Profit / Loss Tab

Shows:

- starting cash
- ending cash
- sales revenue
- wholesale spend
- fuel costs
- pitch fees
- order fees
- estimated saleable stock value
- reduced stock value
- unsellable losses
- net week result

## 12.2 Sales Tab

Shows:

- best-selling stock
- worst-selling stock
- units sold
- reduced units sold
- average price band success
- high-margin successes
- missed sales reasons

## 12.3 Stock and Wastage Tab

Shows:

- stock remaining
- stock condition summary
- discarded/unsellable stock
- reduced stock recovery
- dry/bone-dry events
- stock that should have been reduced earlier

## 12.4 Locations Tab

Shows:

- days traded per location
- location profitability
- fuel/pitch cost impact
- customer mix
- best stock per location
- missed demand by location

## 12.5 Customers Tab

Shows:

- archetypes encountered
- special requests
- successful recommendations
- failed recommendations
- notable individual customers
- returning customers
- customer quirks discovered

## 12.6 Knowledge Gained Tab

Shows:

- notebook updates
- plant discoveries
- pairing discoveries
- mistake lessons
- location insights
- unlocked skill/special unlocks
- Ask a Follow-Up status

## 12.7 Staff Pressure Tab

Shows:

- dry trays caused by lack of time
- gappy trays left too long
- missed restock opportunities
- missed customer opportunities
- request pressure
- whether future staff would help
- which role would have helped most

## 12.8 Debug / Export Tab

Visible only in admin mode.

Shows:

- state export
- economy log
- sales log
- customer log
- stock condition log
- request log
- notebook/discovery log
- balance warnings
- playtest report generation

---

# 13. Reset Playtest Button

Prototype 0.1 must include a reset playtest button.

This should:

- clear the current run
- generate or reset customer pool
- reset stock/cash/day state
- return to Day 0
- optionally preserve debug settings
- generate a playtest report before reset, if requested

Button text:

> Reset Playtest

The reset button should be easy to access in admin/debug mode.

For normal testers, it may appear after weekly summary.

---

# 14. Automatic Playtest Report

The reset playtest button should be able to generate an automatic playtest report.

This report should summarise:

- run ID
- date/time
- prototype version
- starting cash
- ending cash
- total revenue
- total costs
- total stock bought
- total stock sold
- stock lost/unsellable
- reduced stock sold
- best stock
- worst stock
- locations used
- customer archetypes encountered
- special requests generated
- request success/failure
- notebook discoveries
- skill unlocks
- staff pressure indicators
- major debug interventions
- balance warnings

The report should be exportable as text or JSON.

Purpose:

> Make every test run useful, even if the player resets immediately afterward.

---

# 15. Debug Export Button

Prototype 0.1 must include a debug export button.

This should export machine-readable state.

Suggested formats:

- JSON for detailed debug state
- Markdown or text summary for readable report

Debug export should include:

- full game state
- day number
- cash
- stock inventory
- stock condition/moisture/flags
- home stock
- van stock
- display state
- customer pool
- customer memories
- location stats
- sales log
- requests log
- discoveries
- skill flags
- debug settings
- random seed, if used

Button text:

> Debug Export

This is mandatory for early balancing and bug reports.

---

# 16. Required Prototype Locations

Prototype 0.1 includes three locations:

1. Market Square
2. Village Green
3. Station Corner

## 16.1 Market Square

Role:

- balanced starter pitch
- mixed demand
- reliable but not specialised

## 16.2 Village Green

Role:

- traditional/outdoor gardener pitch
- familiar bedding and grow-your-own stock
- cheap/free pitch potential
- medium fuel

## 16.3 Station Corner

Role:

- urban, quick, compact/giftable stock
- higher pitch/fuel pressure
- better for lilies and quick visual sales
- less good for bulky compost focus

---

# 17. Required Prototype Stock

Prototype 0.1 uses the 25 starter stock list from Document 7.

## 17.1 Starter 25

### Grow-Your-Own / Edible

1. Tomato Plants
2. Strawberry Plants
3. Chilli Plants
4. Lettuce Seedlings
5. Basil
6. Mint
7. Parsley
8. Rosemary

### Cheap Spring / Early Bedding

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

### Seasonal Gift / Colour

21. Potted Lilies
22. Daffodil Pots
23. Hyacinth Pots

### Basic Sundries

24. Multipurpose Compost Bag
25. Machine-Made Terracotta Pot

## 17.2 Day 0 Available Stock

First order availability:

- Tomato Plants
- Strawberry Plants
- Busy Lizzies
- Potted Lilies

Everything else appears sold out.

## 17.3 Day 2 Additions

Day 2 should introduce:

- Pansies
- Primroses
- Compost
- Terracotta Pots

Exact stock availability may vary, but the Day 2 expansion should introduce basic sundries and spring colour.

---

# 18. Required Customer System

Prototype 0.1 requires a small generated customer pool.

## 18.1 Customer Pool

Recommended:

> 30 generated customers total.

Each customer has:

- name or identifier
- archetype weighting
- simple preference profile
- possible quirk
- memory fields
- satisfaction history

## 18.2 Customer Archetypes

Required archetypes:

1. New Gardener
2. Flat / Balcony Grower
3. Gift Buyer
4. Traditional Gardener
5. Herb / Kitchen Buyer
6. Bargain Hunter

## 18.3 Customer Quirks

8–10 customers should have simple quirks.

Examples:

- has cats
- shady doorstep
- loves purple
- buys for child
- always wants bargains
- vague describer
- likes herbs
- dislikes strong scent
- forgets plant names
- buys gifts in a hurry

Not every customer needs a quirk.

---

# 19. Required Special Requests

Prototype 0.1 requires:

> 10 special request templates.

## 19.1 Required Request Coverage

The ten requests should cover:

- vague request
- gift request
- grow-your-own request
- balcony/patio request
- shade/part-shade request
- budget request
- add-on/sundry request
- pairing request
- safety/honesty request
- reduced/bargain request

## 19.2 Recommended Request List

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

The final request should be capable of unlocking:

> Ask a Follow-Up

---

# 20. Required Wholesaler Features

Prototype 0.1 requires:

- County Plant Wholesale
- Day 0 scripted first order
- daily stock refresh
- visible sold-out listings
- red SOLD OUT / OUT OF STOCK overlay
- plants tab
- sundries tab
- special offers from Day 3 onward
- order fee under £100
- batch-based listings
- broad margin rating
- simple location-fit hints
- checkout screen
- next-day collection
- admin controls for stock manipulation

---

# 21. Required Display Features

Prototype 0.1 requires:

- rough starting stall
- trestle table
- floor space
- reduced area
- van storage
- home stock
- tray objects
- tray fullness
- gappy tray penalty
- tidy tray action
- consolidate trays action
- water action
- deadhead/prune action
- move tray to/from van
- restock from van
- reduced placement
- floor-only sundries
- lilies as high-margin floor-friendly feature stock
- display rating
- descriptive display feedback

---

# 22. Required Economy Features

Prototype 0.1 requires:

- £80 starting cash
- stock bought in batches
- customers buy individual units
- fuel cost from schematic route
- pitch fees
- £5 order fee under £100
- price bands shown as exact prices
- bargain / normal / premium / reduced
- reduced at around half normal
- no VAT
- no personal costs
- no hard game over
- cash-poor soft fail state
- end-of-day economy report
- weekly economy report

---

# 23. Required Stock Condition Features

Prototype 0.1 requires:

## 23.1 Condition States

- Excellent
- Good
- Tired
- Past Peak
- Unsellable

## 23.2 Moisture States

- Waterlogged
- Watered
- Damp
- Dry
- Bone Dry

## 23.3 Flags

At minimum:

- Dry
- In Bud
- Flowering
- Past Flower
- Needs Deadheading
- Reduced
- Short Window
- Leggy

## 23.4 Storage Effects

- display stock degrades fastest
- van stock degrades moderately
- home stock degrades lightly with age
- watered stock may recover one level next day within limits
- past-peak flowering decline cannot be undone by watering

---

# 24. Required Notebook / Knowledge Features

Prototype 0.1 requires a light notebook layer.

Required features:

- basic plant pages
- basic location pages
- customer archetype notes
- individual customer memory for generated pool
- at least 3 discovery entries
- at least 1 mistake lesson
- at least 1 pairing discovery
- end-of-day notebook updates
- end-of-week learning summary
- Ask a Follow-Up special unlock

Do not implement the full skill tree yet.

---

# 25. Required Staff Features

Prototype 0.1 does not include active staff hiring.

Required staff-related features:

- workload pressure tracking
- Day 7 staff pressure summary
- hints about future staff usefulness
- no staff UI
- no wages
- no hiring

Track pressures such as:

- dry trays due to lack of time
- gappy trays left too long
- missed restock opportunities
- missed customers
- request conflicts

---

# 26. Required Admin / Debug Overlay

The admin/debug overlay is mandatory.

It should include controls for:

## 26.1 Time

- pause/resume
- set speed
- simulate hour
- simulate day
- skip to phase
- force day end

## 26.2 Economy

- add/remove cash
- set fuel cost
- set pitch fee
- set order fee
- toggle order fee
- force sale
- force no-sale
- reveal sale score

## 26.3 Stock

- add stock
- remove stock
- set condition
- set moisture
- add/remove flags
- set age
- toggle degradation
- force degradation

## 26.4 Wholesaler

- force availability
- force sold out
- force special offer
- force bad special offer
- set order threshold
- reveal true margins

## 26.5 Customers

- force customer
- force archetype
- force special request
- reveal customer preferences
- reveal customer quirks
- edit satisfaction

## 26.6 Notebook / Skills

- unlock notebook entry
- force discovery
- unlock Ask a Follow-Up
- reset discoveries
- reveal hidden tags

## 26.7 Export

- generate playtest report
- debug export
- copy JSON state
- copy markdown summary

---

# 27. Prototype Screens

Required screens/panels:

1. Title / Start Prototype
2. Day 0 Wholesaler Order
3. Morning Collection
4. Weather / Day Conditions
5. Location Selection
6. Home Stock / Van Loadout
7. Route / Fuel Confirmation
8. Display Setup
9. Trading Day View
10. Customer / Special Request Panel
11. Display Action Menu
12. Stock / Van Restock Menu
13. Pricing Panel
14. Daily Summary
15. Evening Wholesaler Order
16. Notebook
17. Weekly Summary
18. Admin / Debug Overlay
19. Playtest Report / Export Panel

Some screens can be combined if the implementation remains clear.

---

# 28. Suggested First-Week Script

The prototype should not be fully random.

It should use a controlled first-week structure with variation.

## Day 0

- first wholesaler order
- four available stock lines
- most stock sold out

## Day 1

- collect first order
- introduce location choice
- simple sales
- one optional request
- low degradation

## Day 2

- introduce basic sundries and spring colour
- add compost/pots
- simple add-on opportunity

## Day 3

- introduce special offer
- introduce more noticeable moisture/care pressure
- first real reduced-stock opportunity

## Day 4

- introduce pairing/discovery opportunity
- possible vague customer

## Day 5

- increase customer pressure
- trays become gappy faster
- staff pressure metrics begin to show

## Day 6

- stronger request/reputation/knowledge feedback
- possible bad special offer
- location fit becomes clearer

## Day 7

- final test day
- pressure peaks but remains manageable
- weekly report generated

---

# 29. Prototype Exclusions

Prototype 0.1 should not include:

- full save/load
- backend/server
- accounts
- full art production
- full skill tree
- active staff hiring
- multiple suppliers
- advanced supplier reputation
- greenhouse/home upgrades
- propagation
- pests/disease
- advanced weather simulation
- full seasonal calendar
- full year progression
- manual exact pricing
- multi-buy offers
- full bundle system
- complex route planning
- loans/debt/tax
- permanent shop premises
- deep relationship system
- complex animation requirements

---

# 30. Acceptance Criteria

Prototype 0.1 is acceptable if a tester can:

- start a new run
- place the Day 0 first order
- collect stock on Day 1
- choose a location
- load the van
- set up a display
- open for real-time trading
- see customers browse and buy
- respond to at least some special requests
- pause and perform display actions
- water/tidy/consolidate/restock/reduce
- see stock condition and moisture matter
- see tray fullness matter
- see money change clearly
- place evening orders
- complete seven trading days
- view weekly summary tabs
- unlock or see Ask a Follow-Up
- generate a playtest report
- export debug state
- reset the prototype

The prototype should be judged by learning and decision clarity more than polish.

---

# 31. Primary Playtest Questions

Prototype 0.1 should answer:

1. Does buying stock for tomorrow feel good?
2. Does the Day 0/Day 1 rhythm make sense?
3. Does real-time trading feel exciting rather than stressful?
4. Does pausing for decisions keep it manageable?
5. Does display labour feel like the right minigame?
6. Does tray consolidation feel satisfying?
7. Does stock condition feel fair?
8. Does reduced stock feel useful?
9. Does the economy feel tight but recoverable?
10. Do locations feel different?
11. Do customers feel readable?
12. Do special requests add pleasure rather than interruption?
13. Does Ask a Follow-Up feel like a meaningful unlock?
14. Does the notebook feel useful?
15. Does the player understand what they would do better next week?
16. Does the player begin to feel why staff will eventually matter?

---

# 32. Prototype Success Definition

Prototype 0.1 succeeds if the tester finishes the week thinking:

> “I understand the loop, I made mistakes, I learned things, and I want to try another week with a better plan.”

It fails if:

- the trading day feels random
- the display system feels cosmetic
- real-time pressure feels unmanageable
- the player cannot see why sales happened
- stock degradation feels unfair
- economy pressure feels arbitrary
- special requests feel annoying
- the weekly report does not teach anything
- the player does not care what stock they order next

---

# 33. Recommended Next Documents

After this build brief, the next useful documents are:

## Document 14 — Repository and Codex Structure

Purpose:

- define GitHub folder structure
- define document locations
- define versioning
- define build folders
- define art folders
- define playtest report storage
- define naming conventions

## Document 15 — Art Direction and Visual Bible Starter Brief

Purpose:

- define visual style
- define starter stall look
- define UI mood
- define background approach
- define plant card/icon style
- define art workflow
- compare image-generation/art package options

## Document 16 — Data Schema Specification

Purpose:

- define JSON/data structures for plants, stock batches, customers, locations, suppliers, requests, displays, notebook entries, and reports

The most practical next step before coding is likely Document 14, then Document 16.

---

# 34. Final Prototype Definition

Prototype 0.1 is a browser-based, lightly visual, real-time, seven-day trading slice.

It begins with a Day 0 evening wholesale order and ends with a Day 7 weekly summary. The player starts with £80, orders from a bland supplier, collects stock each morning, chooses where to trade, loads the van, arranges a rough display, sells to generated customers, maintains trays, handles ten possible special requests, manages living-stock condition, uses reduced pricing, learns through a notebook, and receives a full weekly report.

The build must include admin simulation controls, a reset playtest button, automatic playtest report generation, and debug export.

The prototype’s core question is:

> “Is this rough little plant stall already fun before the full game exists?”
