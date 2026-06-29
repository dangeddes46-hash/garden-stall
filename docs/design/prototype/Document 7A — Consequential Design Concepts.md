# THE GARDEN STALL
## Document 7A — Consequential Design Concepts

**Working Title:** The Garden Stall  
**Document Type:** Consequential Design Notes / Carry-Forward Decisions  
**Status:** Draft 001  
**Purpose:** Capture important design concepts that emerged while preparing Document 8, especially ideas that affect earlier documents, future specifications, and prototype structure.

---

# 1. Purpose of This Document

This document records design decisions and consequential ideas that emerged after Document 7 was drafted.

Some of these ideas refine or slightly correct the Prototype 0.1 structure. Others introduce future systems that should not be fully specified yet, but must be preserved so they are not lost.

This document is not a replacement for Document 7.

It is a carry-forward note that should inform:

- Document 8 — Wholesaler Interface Specification
- Document 9 — Display and Merchandising Specification
- Document 10 — Economy, Pricing and Stock Condition Specification
- future staff, supplier, storage, progression, and skill-tree documents

---

# 2. Revised Daily Flow

Document 7 described the prototype day in a workable form, but the preferred structure is now slightly different.

The day should flow like this:

1. Day begins
2. Player visits wholesaler to collect yesterday evening’s order
3. Weather and conditions are revealed
4. Player chooses where to trade
5. Player chooses what stock to load into the van from available stock
6. Player travels to chosen location
7. Travel time slightly reduces available trading time
8. Player sets up display
9. Trading phase occurs
10. Day trade summary appears
11. Player places evening wholesale order
12. Day ends

This means that ordering stock is not an instant pre-trade action. It is a forward-planning action.

The player orders in the evening for collection the following morning.

This creates a stronger commercial rhythm:

> Sell today, learn from today, order for tomorrow.

It also allows the player to choose the next day’s trading location after seeing weather and stock condition, rather than being locked into a location before the day begins.

---

# 3. Weather Before Location Choice

The player should see weather or daily conditions before choosing the trading location.

This lets the player make informed choices such as:

- avoid exposed locations in rain
- choose sunny locations for outdoor colour
- avoid long travel if the day is already poor
- pick covered/sheltered locations for delicate stock
- choose locations based on expected browsing time and weather comfort

Weather should not be overcomplicated in Prototype 0.1, but the daily structure should leave room for it.

---

# 4. Travel Time as a Location Trade-Off

Different locations should have different travel times.

Travel time should slightly reduce available trading time.

This creates another trade-off when choosing where to sell.

Example:

- Market Square: short travel, normal trading time
- Village Green: medium travel, slightly reduced trading time
- Station Corner: short/medium travel, high footfall but brisk customers
- Later specialist events: longer travel, higher risk/reward

Travel time should be a light modifier, not a logistics simulator.

The player should feel:

> “That location may be better, but it costs more of the day to get there.”

---

# 5. Unsold Stock Persists

Stock that does not sell does not vanish.

Unsold stock remains owned by the player and can be sold on later days.

However, it may suffer condition loss from:

- age
- transit
- being displayed
- being stored
- poor care
- seasonal decline
- being past flowering peak

This is essential to the game.

The player is not simply buying stock for one abstract sales attempt. They are managing a small pool of living stock across days.

This supports:

- reduced section decisions
- stock loadout decisions
- cash tied up in unsold stock
- pressure to sell through
- value recovery from older plants
- care and storage decisions
- eventual need for better facilities

---

# 6. Home Stock Storage

The player should have a home stock area, initially represented as basic back-garden or yard storage.

This is the player’s “unit stock” area.

It holds stock not currently loaded into the van.

## 6.1 Initial Home Storage

Prototype assumption:

- home storage capacity is larger than van storage
- suggested size: approximately double van capacity
- stock in home storage can still degrade, but less from travel/display exposure
- stock must be selected and loaded into the van before each trading day

Example:

- Van storage: 12 stock slots
- Home storage: 24 stock slots

This means the player may own more plants than they can take to a location.

That creates an important decision:

> “What do I load today?”

---

# 7. Future Home Facility Upgrades

Home storage begins as basic back-garden storage.

Later progression may add:

- covered rack
- cold frame
- mini greenhouse
- propagator
- potting bench
- nursery area
- improved watering setup
- shade cover
- heated protection
- stock labelling/storage system

These upgrades should not be active in Prototype 0.1.

However, the prototype should be structured so that future home facilities can naturally improve:

- stock capacity
- degradation rate
- recovery from tired condition
- ability to hold fragile stock
- ability to prepare higher-value stock
- eventual propagation or nursery mechanics, if added later

Important boundary:

> Home facilities should support the stock-and-sell loop. They should not turn the game into a nursery simulator too early.

---

# 8. Wholesaler Structure

The first wholesaler should be bland, generic, and slightly soulless.

This suits the starting fantasy.

The player begins with access to a basic commercial supplier, not a charming specialist nursery.

Possible tone:

- plain trade website
- functional layout
- little personality
- stock photos
- big red SOLD OUT overlays
- blunt batch notes
- occasional attention-grabbing offers

The player should feel that this is a practical wholesale source, not a boutique plant world.

---

# 9. Future Supplier Progression

Later suppliers should unlock over time.

Suppliers may become more specialised and more characterful.

Possible later suppliers:

- houseplant specialist
- bonsai supplier
- exotic/tropical plant supplier
- bedding mega-supplier
- herb and edible plant grower
- local nursery
- premium perennial nursery
- rare bulb supplier
- sundries and pots wholesaler
- eco/wildlife plant supplier

Each supplier may differ by:

- stock range
- price
- quality
- trustworthiness
- reliability
- batch notes
- availability
- minimum order
- delivery/collection rules
- special offers
- refund/replacement policy
- reputation requirement

This creates a future progression track without requiring the prototype to include multiple suppliers.

---

# 10. Supplier Trustworthiness

Different vendors should have different trustworthiness.

The first generic supplier is a baseline supplier.

Later suppliers can be more or less reliable.

Trustworthiness may affect:

- accuracy of condition notes
- fairness of special offers
- frequency of poor batches
- likelihood of misleading “bargains”
- consistency of restocks
- accuracy of popularity claims
- hidden quality modifiers

A premium specialist may be expensive but honest.

A bargain supplier may be cheap but risky.

A flashy online supplier may exaggerate trends.

This gives the wholesaler system personality and decision depth later.

---

# 11. Wholesale Order Fee

The wholesaler should apply a small fee for orders under a threshold.

Example:

- Orders under £50: £5 handling/collection fee
- Orders £50 or more: no fee

Exact values to be tuned.

This encourages:

- higher turnover
- planning larger orders
- selling through stock
- reaching a satisfying order threshold
- thinking commercially about cash tied up in stock

It should not be punishing in the opening tutorial.

Day 1 may waive the fee or explain it gently.

---

# 12. Order Threshold Achievement

The first time the player places an order above the fee-free threshold, the game should acknowledge it.

Possible achievement:

> **Proper Trade Order**  
> Place a wholesale order large enough to avoid the small-order handling fee.

This encourages the player to see higher turnover as a milestone.

It gives a small sense of becoming a real trader rather than someone buying tiny amounts.

---

# 13. Wholesaler Stock Refresh

For Prototype 0.1, wholesaler stock should refresh daily only.

The stock list should be stable once shown.

No rerolling by reopening the browser.

This makes the system fair and learnable.

Future expansions can model more intricate restock logic, but Prototype 0.1 should keep this simple.

Stock availability should slowly expand as the player progresses.

Progression may increase:

- available quantity
- number of stock lines
- quality of stock
- supplier trust
- supplier categories
- specialist stock access

---

# 14. Sold Out Presentation

Sold-out items should remain visible on the wholesaler website.

They should look like real online shop listings.

Preferred presentation:

- product image still visible
- strong red **SOLD OUT** or **OUT OF STOCK** overlay across the image
- purchase button disabled
- optional note such as “Expected soon” or “No restock date”
- filter option later to hide out-of-stock items

This helps the player learn what exists in the wider game while still being constrained.

It also makes the wholesaler feel like an internet browser experience rather than a clean abstract game shop.

---

# 15. Day 1 Scripted Wholesaler Visit

The first wholesaler visit should be deliberately scripted.

Most items are visible but sold out.

Only a few strong first-choice items are available.

Recommended Day 1 available stock:

1. Tomato Plants
2. Strawberry Plants
3. Busy Lizzies
4. Potted Lilies

This creates a guided first buy without a heavy tutorial.

The player is forced toward reasonable spring best sellers.

This also establishes the idea that the wholesaler does not always have everything.

---

# 16. Special Offers

After Day 2 or Day 3, the basic supplier should begin showing attention-grabbing offers.

Example label:

> **SPECIAL OFFER!!!**

These offers are not always good.

Baseline rule:

- 80% of special offers are genuinely around 20% cheaper
- 20% of special offers are actually poor-value, approximately 50% more expensive than normal

The exact numbers should be tuned.

The purpose is to teach the player not to trust promotional framing blindly.

Special offers should still show enough information for judgement:

- wholesale price
- suggested retail
- margin rating
- batch condition
- supplier note
- quantity
- stock risk

Poor-value special offers should be discoverable by attentive players.

The game should not lie in a way that feels unfair. It should model retail/wholesale promotional noise.

---

# 17. Listing Ratings

At first, wholesaler listings should show a simple **Margin** rating.

Example values:

- Poor
- Fair
- Good
- Excellent
- Risky

Later, additional ratings may unlock or appear.

Future ratings:

- Fragility
- Longevity
- Trendiness
- Demand Reliability
- Batch Quality
- Storage Risk
- Display Appeal

These ratings can support progression, skill tree unlocks, supplier trust differences, and player expertise.

---

# 18. Location Fit Hints

Wholesaler listings may include rough location-fit hints.

These should help the player begin to infer customer profiles.

Example:

**Petunias**

> Popular with traditional outdoor shoppers. Often performs well at Village Green.

This does not mean “old people love petunias” should be stated crudely in the UI, but the system can encode that:

- petunias appeal to traditional gardeners
- Village Green has more traditional gardeners
- therefore petunias often sell well at Village Green

This gives the player a meta-learning path:

> Plants sell because certain customer types like them, and locations contain different mixes of those customers.

---

# 19. Customer Profile Inference

Location fit hints should teach broad customer patterns.

The player should gradually learn ideas such as:

- traditional gardeners buy familiar bedding and patio plants
- flat/balcony growers buy compact edible or indoor-suitable stock
- gift buyers care about immediate visual condition
- bargain hunters accept tired stock if priced honestly
- kitchen buyers respond to herbs, tomatoes, strawberries, compost, and pots
- fast urban locations reward compact, clear, giftable stock

These should be inferred through:

- wholesaler hints
- sales feedback
- reviews
- special requests
- location reports
- plant card notes
- skill-tree unlocks

---

# 20. Skill Tree Concept

The player should eventually have a skill tree or knowledge progression system.

This was not in earlier core documents, but it fits strongly with the stock-and-sell concept.

The skill tree should not make the player magically better at plant care.

It should primarily unlock better information, better interpretation, and better business judgement.

Possible categories:

## Market Knowledge

- better demand hints
- clearer location fit
- visible customer profile trends
- improved sales forecasts
- trend reports

## Plant Knowledge

- more detailed plant tags
- fragility/longevity ratings
- better care warnings
- safer recommendation hints
- seasonality clarity

## Merchandising

- display score breakdown
- colour harmony hints
- empty-slot warnings
- improved feature display effects

## Supplier Sense

- spot poor-value offers
- reveal supplier trust rating
- better batch quality predictions
- compare normal price history

## Customer Reading

- clearer special request clues
- reveal hidden needs after failed request
- improved returning customer notes

---

# 21. Skill Tree Gating

Skill progression should be gated by practical achievements.

Examples:

- sell 20 petunias
- complete 5 gift requests
- sell 10 tomato plants
- successfully clear 10 reduced plants
- achieve 3 strong Village Green days
- place 3 fee-free wholesale orders
- complete 5 grow-your-own requests
- avoid 3 unsuitable recommendations
- maintain full display through a whole trading day

These achievements grant XP or unlock nodes.

This makes knowledge progression feel earned through trading experience.

Example:

> Sell 20 petunias → unlock “Traditional Bedding Insight”  
> Effect: future listings show stronger hints about traditional gardener appeal.

---

# 22. Skill Tree and Difficulty

The skill tree can help support different difficulty levels.

Relaxed mode:

- more hints available early
- cheaper skill unlocks
- clearer request clues

Standard mode:

- normal progression

Expert mode:

- fewer default hints
- more insight gated behind achievements
- stricter customer/reputation feedback

This allows the same underlying systems to support both accessible and more knowledge-heavy play.

---

# 23. Sundries Tab

Sundries should appear on the same wholesaler website but under a separate tab.

Prototype tabs:

- Plants
- Sundries

Later tabs may include:

- Pots
- Compost & Growing Media
- Feeds
- Tools
- Display Supplies
- Seasonal
- Clearance
- Specialist

Prototype sundries:

- Multipurpose Compost Bag
- Machine-Made Terracotta Pot

Later sundries:

- nicer pots
- terracotta bowls
- hanging baskets
- potting grit
- feed
- labels
- watering equipment
- tools
- display crates
- compost types

Sundries should support plant sales, not replace them as the main game.

---

# 24. Correction to Earlier Documents

Document 7 remains useful, but the following points should be treated as updated:

## Updated Daily Flow

Earlier implication:

- choose location
- browse wholesaler
- buy stock
- trade

Updated structure:

- collect previous order
- see day conditions/weather
- choose location
- load van from home stock
- travel
- trade
- day summary
- place evening order for tomorrow

## Updated Storage Model

Earlier implication:

- stock is mostly in van/display

Updated structure:

- player has home stock storage
- van capacity is smaller than total owned stock capacity
- daily loadout is a meaningful choice

## Updated Wholesaler Timing

Earlier implication:

- stock buying is immediate before trading

Updated structure:

- order after trading
- collect next morning

Document 8 should use the updated structure.

Document 6 may later need a Revision B to reflect the updated daily flow.

---

# 25. Prototype Impact

These concepts affect Prototype 0.1 as follows:

## Must Include in Prototype 0.1

- evening order for next-day collection
- morning collection
- weather/conditions shown before location choice, even if simple
- choice of location after stock collection
- home storage larger than van storage
- loadout choice before travel
- daily fixed wholesaler stock list
- visible sold-out listings
- scripted Day 1 availability
- small-order fee or at least visible threshold
- basic margin rating
- plants and sundries tabs
- special offers after Day 2 or 3
- dev overlay to test all of this

## Can Be Light in Prototype 0.1

- weather effects
- travel time effects
- home storage degradation
- supplier trustworthiness
- poor-value special offers
- skill tree

## Should Be Deferred

- multiple suppliers
- full skill tree
- greenhouse/propagator/nursery upgrades
- advanced stock forecasting
- detailed supplier reliability
- advanced trendiness ratings
- specialist plant suppliers

---

# 26. Design Value of These Changes

These changes strengthen The Garden Stall in several ways.

## Better Retail Rhythm

Ordering after the day’s trading makes the business feel more real.

The player uses the day’s feedback to decide tomorrow’s stock.

## Better Stock Persistence

Unsold stock becomes part of the ongoing puzzle.

The player owns living stock, not one-day sales tickets.

## Better Strategic Choice

Home storage and van loadout mean the player chooses what to risk taking each day.

## Better Supplier Identity

The wholesaler becomes a system with personality, not just a shop menu.

## Better Long-Term Progression

Suppliers, storage, ratings, and skill-tree hints give the game future growth paths without bloating Prototype 0.1.

## Better Learning

Location fit hints and skill unlocks help the player infer relationships between plants, customers, and locations.

---

# 27. Recommended Next Step

Proceed with:

## Document 8 — Wholesaler Interface Specification

Document 8 should use the decisions in this 7A note as current design truth.

It should define:

- prototype wholesaler name/tone
- order timing
- collection flow
- daily stock refresh
- sold-out presentation
- small-order fee
- order threshold achievement
- stock listing format
- plant/sundry tabs
- Day 1 scripted list
- special offer behaviour
- margin/risk ratings
- future supplier unlock structure
- connection to home storage and van loadout
- developer overlay controls for wholesaler testing

Document 6 and Document 7 may later receive revisions to fully align with this updated daily structure.
