# THE GARDEN STALL
## Document 8 — Wholesaler Interface Specification

**Working Title:** The Garden Stall  
**Document Type:** Interface Specification / Supplier System / Stock Ordering  
**Status:** Draft 001  
**Purpose:** Define how the wholesaler website, stock ordering, collection, supplier availability, special offers, sold-out listings, sundries, and future supplier progression work.

---

# 1. Purpose of This Document

This document defines the wholesaler system for The Garden Stall.

The wholesaler is one of the most important player-facing systems in the game. It is where the player makes the stock decisions that shape tomorrow’s trading day.

The wholesaler must feel like browsing a simplified trade website, not like opening a generic game shop.

It should support:

- forward planning
- daily stock decisions
- supplier scarcity
- tempting bargains
- occasional bad offers
- sold-out frustration
- stock quality judgement
- price/margin judgement
- plant and sundry ordering
- future supplier progression

The wholesaler is where the player asks:

> “What can I get for tomorrow, what can I afford, and what do I think I can sell?”

---

# 2. Core Principle

The wholesaler is not a perfect catalogue.

It is a commercial supply channel.

That means:

- stock changes daily
- some items are sold out
- quantities are limited
- condition varies
- some batches are better than others
- special offers are not always good deals
- the supplier has its own reliability and personality
- the player must learn what is worth buying

The wholesaler should create stock judgement, not simply provide unlimited access to every plant.

---

# 3. Prototype Supplier Identity

Prototype 0.1 uses one basic supplier.

This first supplier should feel bland, functional, and slightly soulless.

It is not a charming local nursery. It is a practical online trade supplier.

Possible working name:

> **County Plant Wholesale**

Alternative names:

- Midlands Plant Wholesale
- TradePlant Direct
- County Horticultural Supplies
- Greenline Trade Supply
- PlantStock UK

Recommended prototype name:

> **County Plant Wholesale**

Tone:

- functional
- bland
- commercial
- cheap-looking trade website
- stock-photo presentation
- short blunt notes
- big red sold-out overlays
- attention-grabbing special offers
- no cosy personality

The starting supplier should contrast with later specialist suppliers.

---

# 4. Future Supplier Progression

Later in the game, the player may unlock additional suppliers.

These suppliers should be more specialised and more characterful.

Possible future supplier types:

## Houseplant Specialist

- indoor foliage
- trendy plants
- higher price
- better urban/flat stock
- more fragile stock
- stronger trendiness ratings

## Bonsai Supplier

- small specialist stock
- high value
- slower sales
- expert customers
- high care/fragility risk

## Exotic / Tropical Supplier

- dramatic plants
- high visual appeal
- high fragility
- strong urban/gift potential
- poor cold tolerance

## Bedding Mega-Supplier

- cheap trays
- bulk seasonal stock
- strong availability
- variable quality
- low margins but high turnover

## Local Nursery

- reliable quality
- honest notes
- medium pricing
- good perennials/herbs
- better trustworthiness

## Premium Perennial Nursery

- higher quality
- higher price
- experienced customers
- garden-event stock
- lower stock risk if matched well

## Sundries Supplier

- pots
- compost
- feeds
- tools
- labels
- baskets
- display materials

Prototype 0.1 should not implement multiple suppliers, but the wholesaler system should be built so they can be added later.

---

# 5. Supplier Trustworthiness

Each supplier should eventually have a trustworthiness profile.

Prototype 0.1 can assume the first supplier has baseline trustworthiness.

Trustworthiness may affect:

- accuracy of condition notes
- fairness of special offers
- frequency of poor-value promotions
- likelihood of hidden quality problems
- consistency of restock
- reliability of popularity claims
- clarity of batch descriptions

Supplier trustworthiness values:

- low
- medium
- high
- specialist

Example future supplier behaviours:

## Reliable Local Nursery

- honest notes
- fewer fake bargains
- better condition accuracy
- moderate prices

## Bargain Mega-Supplier

- cheap stock
- frequent mixed quality
- more misleading special offers
- volatile availability

## Trendy Online Supplier

- strong marketing
- high trend claims
- sometimes overpriced
- good rare stock access

Trustworthiness should create judgement, not random punishment.

A careful player should be able to spot risky offers.

---

# 6. Ordering Rhythm

The preferred daily rhythm is:

1. Player trades during the day
2. Day summary appears
3. Player places an evening wholesale order
4. Day ends
5. Next day begins
6. Player collects the order
7. Weather/daily conditions are revealed
8. Player chooses where to trade
9. Player loads stock into the van
10. Player travels and opens the stall

This means stock buying is forward planning.

The player does not usually buy stock instantly right before trading.

The core rhythm is:

> Sell today, learn from today, order for tomorrow.

---

# 7. Order Collection

Each morning begins with collection of yesterday evening’s wholesale order.

For Prototype 0.1, collection can be abstracted.

The player does not need to drive to the wholesaler as a separate playable scene.

Possible presentation:

> Morning collection complete. Your County Plant Wholesale order is now in home stock.

The order enters the player’s home stock area.

From there, the player chooses what to load into the van for the trading day.

---

# 8. Home Stock and Van Loadout

The wholesaler system connects to home storage.

## 8.1 Home Stock

Home stock represents the player’s back garden, yard, or basic storage area.

Initial home stock capacity:

> Approximately double van storage.

Suggested prototype values:

- Van storage: 12 stock slots
- Home storage: 24 stock slots

Home stock may include:

- plants
- trays
- pots
- compost
- sundries

Unsold stock returns to home stock at the end of the day unless discarded, sold, or lost.

## 8.2 Van Loadout

Before choosing or travelling to a location, the player decides what to load into the van.

This creates a meaningful decision:

> “I own this stock, but what should I take today?”

Van loadout depends on:

- location
- weather
- stock condition
- display plan
- expected customers
- travel time
- storage capacity
- stock risk

This is important because the player may own more stock than can fit in the van.

---

# 9. Daily Stock Refresh

For Prototype 0.1, wholesaler stock refreshes once per day.

The list is stable once shown.

Rules:

- no rerolling by closing and reopening
- no mid-screen random changes
- no refreshing until the next ordering window
- sold-out items stay sold out that day
- limited quantities remain limited

This makes the system fair and learnable.

Future versions can model supplier restock patterns more intricately, but Prototype 0.1 should remain simple.

---

# 10. Wholesaler Website Structure

The wholesaler should look and behave like a simplified internet shop.

Recommended layout:

## Top Area

- supplier name/logo
- current day
- order deadline
- cash available
- current order total
- small-order fee status
- cart button
- delivery/collection note

## Navigation Tabs

Prototype tabs:

- Plants
- Sundries
- Special Offers
- Sold Out, optional filter rather than full tab

Later tabs:

- Bedding
- Herbs & Edibles
- Houseplants
- Perennials
- Bulbs
- Pots
- Compost & Growing Media
- Tools
- Feeds
- Clearance
- Specialist

## Main Listing Area

Product cards arranged in grid/list form.

Each card represents a stock batch.

## Side Filters

Possible filters:

- available only
- show sold out
- category
- price
- margin
- condition
- location hint
- plant type
- care risk
- special offer
- sundry

Prototype can use a simple category filter and show/hide sold-out toggle.

---

# 11. Sold-Out Presentation

Sold-out items should stay visible.

They should look like real online product listings.

Preferred presentation:

- product image remains visible
- greyed/desaturated card
- large red **SOLD OUT** or **OUT OF STOCK** overlay across the image
- disabled buy button
- optional restock note

Example restock notes:

- “Expected soon”
- “No restock date”
- “Seasonal line”
- “Check again tomorrow”
- “Supplier allocation exhausted”

This teaches the player what exists beyond current availability.

It also makes the supplier feel like a real website rather than a perfectly curated game list.

---

# 12. Stock Listing Card

Each stock listing should provide practical buying information.

## 12.1 Required Card Fields

Each product card should show:

- product image/icon
- product name
- batch type
- quantity
- wholesale price
- suggested retail price
- margin rating
- condition
- availability
- category tags
- short supplier note
- add to cart button

## 12.2 Recommended Card Example

**Tray of 6 Tomato Plants**

- Wholesale: £12
- Suggested retail: £3.50 each
- Margin: Good
- Condition: Fresh Batch
- Category: Grow-your-own / Edible
- Hints: Sunny patio, beginners, compost add-on
- Supplier note: “Reliable spring seller. Good with compost and pots.”
- Button: Add to order

## 12.3 Card Detail Expansion

Clicking a listing may show more detail:

- full tag list
- stock risk
- display notes
- location fit hints
- care warning
- expected shelf life
- batch-specific note
- previous sales notes, if skill unlocked
- supplier trust clue, if skill unlocked

Prototype can include a simple expanded panel.

---

# 13. Batch-Based Stock

The wholesaler sells batches, not abstract plant types.

Examples:

- tray of 6 tomato plants
- tray of 10 busy lizzies
- tray of 6 strawberries
- tray of 4 potted lilies
- 3 bags of multipurpose compost
- pack of 6 terracotta pots

Each batch can vary by:

- price
- quantity
- condition
- flowering stage
- special offer status
- batch quality
- urgency
- risk

This allows the same plant to appear in different forms later.

Example:

- “Tray of 10 Busy Lizzies — Fresh”
- “Tray of 10 Busy Lizzies — Slightly Tired”
- “Tray of 20 Busy Lizzies — Special Offer”
- “Mixed Busy Lizzie Tray — Colour Assorted”

---

# 14. Batch Condition Labels

Allowed prototype condition labels:

## Fresh Batch

Normal good stock.

## Budding

Not yet fully showy, but good upcoming value.

## In Flower

High immediate display and gift value.

## Slightly Leggy

Cheaper or worse display value; may need quick sale.

## Mixed Quality

Some good, some tired; higher risk.

## Past Best Soon

Needs quick sale; likely reduced if not moved fast.

## Clearance

Cheap, risky, or end-of-line.

## Sold Out

Visible but unavailable.

These labels should be understandable without horticultural expertise.

---

# 15. Margin Rating

Prototype listings show a broad margin rating.

Values:

- Poor
- Fair
- Good
- Excellent
- Risky

Margin rating is not an exact forecast.

It should consider:

- wholesale cost
- suggested retail
- typical demand
- expected wastage risk
- likely discounting
- common location fit

Example:

A cheap tray of busy lizzies may have “Good” margin.

A potted lily batch near peak may have “Risky” margin because the price is good only if sold quickly.

A special offer that is secretly overpriced may show “Poor” or “Fair” if the player has enough information unlocked, or may only be detectable by comparing prices.

---

# 16. Future Listing Ratings

Later systems may add extra ratings.

Future ratings:

## Fragility

How easily the plant declines in storage/transit/display.

Values:

- Low
- Medium
- High

## Longevity

How long the plant remains saleable.

Values:

- Short
- Medium
- Long

## Trendiness

How currently desirable the plant is.

Values:

- Low
- Medium
- High
- Fad

## Demand Reliability

How consistently it sells.

Values:

- Niche
- Seasonal
- Steady
- Strong

## Display Appeal

How much it attracts browsing attention.

Values:

- Low
- Medium
- High

These may be unlocked by skill tree progression, supplier trust, or plant familiarity.

---

# 17. Location Fit Hints

Wholesaler listings may include simple location fit hints.

These hints teach the relationship between plants, customers, and locations.

Examples:

## Petunias

> Popular with traditional outdoor shoppers. Often performs well at Village Green.

## Potted Lilies

> Strong quick gift stock. Performs well where gift buyers pass through.

## Tomato Plants

> Reliable grow-your-own stock. Good for markets and garden-focused pitches.

## Compost

> Best sold alongside edible plants, pots, and practical garden stock.

## Busy Lizzies

> Good colour for part-shade pots and front-step displays.

Location hints should not fully solve the game.

They should help the player infer:

- who likes the plant
- where those customers appear
- why the plant might sell there

Later skill-tree unlocks may improve these hints.

---

# 18. Skill Tree Link

The wholesaler interface can become more informative as the player gains experience.

The player may unlock better information through a skill tree.

Possible unlock examples:

## Market Knowledge: Bedding Basics

Unlock condition:

- sell 20 bedding plants

Effect:

- wholesaler listings show clearer hints for traditional bedding demand.

## Supplier Sense: Spot the Markup

Unlock condition:

- place 3 fee-free wholesale orders or identify 3 poor offers

Effect:

- special offer cards show a warning when price is above normal.

## Plant Knowledge: Stock Life

Unlock condition:

- sell 10 plants from the same category

Effect:

- listings show fragility and longevity ratings.

## Merchandising Insight: Display Draw

Unlock condition:

- achieve 3 high-display-score days

Effect:

- listings show display appeal.

## Local Market Read

Unlock condition:

- trade 3 successful days at a location

Effect:

- location-fit hints become more specific for that location.

This allows the player to learn through trade rather than being handed all information immediately.

---

# 19. Special Offers

From Day 3 onward, the prototype supplier may show special offers.

Special offers use attention-grabbing presentation:

- bright banner
- “SPECIAL OFFER!!!”
- “LIMITED DEAL”
- “CLEARANCE PRICE”
- “TODAY ONLY”

Important rule:

> Special offer does not always mean good value.

Baseline prototype model:

- 80% of special offers are genuinely about 20% cheaper than normal
- 20% of special offers are poor value, approximately 50% more expensive than normal

Exact numbers are tuning values.

## 19.1 Good Special Offer Example

**SPECIAL OFFER!!! Tray of 10 Petunias**

- Normal wholesale: £12
- Today: £9.60
- Condition: Fresh Batch
- Margin: Excellent
- Supplier note: “Overstocked. Good colour mix.”

This is a genuine useful deal.

## 19.2 Bad Special Offer Example

**SPECIAL OFFER!!! Tray of 6 Potted Lilies**

- Normal wholesale: £18
- Today: £27
- Condition: In Flower
- Margin: Poor/Risky
- Supplier note: “Premium seasonal colour. Strong gift line.”

This is attention-grabbing but overpriced.

The player can learn to distrust supplier hype.

## 19.3 Fairness Rule

The game should not hide all information.

Bad offers should be detectable through at least one of:

- comparing to remembered prices
- margin rating
- supplier note tone
- skill unlock
- dev overlay during testing
- later price history
- low sell-through after purchase

The player should feel tricked by marketing, not cheated by the game.

---

# 20. Small-Order Fee

The supplier should charge a small fee for orders below a threshold.

Prototype recommendation:

- Fee-free threshold: £50
- Small-order handling fee: £5
- Day 1: fee waived or explained gently

Example:

> Small-order handling fee: £5 on orders under £50.  
> Add £8 more stock to avoid the fee.

This encourages:

- turnover
- bigger planned orders
- efficient stock buying
- cashflow decisions
- the feeling of becoming a real trader

It also creates a mini-goal.

---

# 21. Fee Threshold Achievement

The first time the player places a fee-free order, the game should acknowledge it.

Possible achievement:

## Proper Trade Order

> Place a wholesale order large enough to avoid the small-order handling fee.

Reward options:

- small reputation/profile note
- small XP reward
- skill tree XP
- cosmetic badge
- no mechanical reward beyond acknowledgement

This achievement is important because it marks a shift:

> The player is no longer buying like a hobbyist. They are ordering like a trader.

---

# 22. Checkout Flow

The checkout screen should summarise the order clearly.

Fields:

- item list
- quantities
- wholesale cost
- small-order fee, if any
- total
- cash remaining after order
- expected collection day
- home stock capacity warning
- duplicate stock warning
- fragile stock warning
- sold-out warnings, if cart item became unavailable before confirm, rare
- confirmation button

Example:

> Order total: £47  
> Small-order handling fee: £5  
> Total due: £52  
> Collection: Tomorrow morning  
> Cash after order: £28

If the player is close to the fee-free threshold:

> Add £3 more stock to avoid the £5 handling fee.

This should feel like an online shopping checkout.

---

# 23. Order Timing and Deadline

Prototype can keep timing simple.

Ordering happens after the day summary.

The order is collected automatically the next morning.

Later versions may add:

- missed order deadline
- early/late collection
- same-day emergency pickup
- supplier delivery windows
- collection travel costs
- pre-orders
- backorders

Prototype should not include these.

---

# 24. First Visit Script

The first wholesaler visit should be scripted.

The player should see a broad website, but most items are sold out.

## 24.1 Day 1 Available Items

Available:

1. Tomato Plants — tray of 6
2. Strawberry Plants — tray of 6
3. Busy Lizzies — tray of 10
4. Potted Lilies — tray of 4

Optional:

5. Multipurpose Compost — 3 bags, if the opening needs a sundry example

Recommended first version:

> Keep the first visit to four available plant lines.

This makes the first order focused.

## 24.2 Day 1 Sold-Out Items

Visible as sold out:

- Pansies
- Violas
- Primroses
- Bellis Daisies
- Wallflowers
- Marigolds
- Petunias
- Begonias
- Lobelia
- Pelargoniums
- Fuchsias
- Basil
- Mint
- Parsley
- Rosemary
- Daffodil Pots
- Hyacinth Pots
- Compost
- Terracotta Pots

This gives a sense of the full world without overwhelming the first purchase.

## 24.3 Day 1 Teaching Goals

Day 1 teaches:

- wholesaler listings are batch-based
- some stock is unavailable
- stock costs meaningful cash
- buying choices are constrained
- tomorrow’s sales begin with tonight’s order
- not all plants are equally safe or long-lived
- the player is already making commercial decisions

---

# 25. Seven-Day Wholesaler Progression

Prototype 0.1 should slowly expand availability.

## Day 1

Available:

- tomatoes
- strawberries
- busy lizzies
- potted lilies

Purpose:

- guided first stock

## Day 2

Add some cheap spring colour:

- pansies
- primroses
- compost
- terracotta pots

Purpose:

- introduce sundries and front-step colour

## Day 3

Add herbs and first special offer:

- basil
- mint
- parsley
- special offer item

Purpose:

- introduce care risk and promotional judgement

## Day 4

Add basket/container plants:

- petunias
- lobelia
- begonias

Purpose:

- introduce display combinations and trailing/filler roles

## Day 5

Add traditional patio plants:

- pelargoniums
- fuchsias
- marigolds

Purpose:

- expand bedding choice and location fit

## Day 6

Add clearance/past-peak stock:

- discounted primroses
- lilies near finish
- leggy petunias

Purpose:

- teach bargain judgement and reduced planning

## Day 7

Show broad prototype range:

- most prototype stock has a chance to appear
- quantities remain limited
- special offer appears
- some key lines are sold out

Purpose:

- end-of-week strategic test

This is a tuning framework, not a fixed script for all playthroughs.

---

# 26. Sundries Tab

The wholesaler has a separate Sundries tab.

Prototype sundries:

1. Multipurpose Compost Bag
2. Machine-Made Terracotta Pot

## 26.1 Multipurpose Compost

Role:

- practical add-on
- supports tomatoes, strawberries, herbs, and pots
- sells better at market/village locations
- low visual appeal
- takes storage space

Listing example:

**Multipurpose Compost — 3 Bag Lot**

- Wholesale: £9
- Suggested retail: £5 each
- Margin: Fair
- Condition: N/A
- Hint: Best sold with tomatoes, strawberries, and pots.
- Supplier note: “Basic multi-purpose. Cheap and practical.”

## 26.2 Machine-Made Terracotta Pot

Role:

- simple add-on
- supports companion pot/gift/patio requests
- useful with tomatoes, strawberries, herbs, and bedding
- basic and cheap

Listing example:

**Machine-Made Terracotta Pots — Pack of 6**

- Wholesale: £9
- Suggested retail: £3 each
- Margin: Good
- Condition: N/A
- Hint: Useful add-on for patio and gift plant sales.
- Supplier note: “Plain standard pot. Nothing fancy.”

Sundries do not degrade, but they take space and tie up cash.

---

# 27. Stock Persistence and Condition

Ordered stock enters home stock.

Stock remains until:

- sold
- discarded
- becomes unsellable
- used in a bundle
- converted to reduced stock
- possibly returned/refunded in later systems

Unsold stock degrades through:

- age
- poor care
- transit
- display exposure
- season/flowering decline

For Prototype 0.1, home stock degradation should be light.

Displayed stock and travelled stock may degrade slightly more.

This supports:

- loadout decisions
- reduced section
- overbuying consequences
- future storage upgrades

---

# 28. Home Storage Capacity Warnings

The checkout should warn if the order exceeds home storage capacity.

Possible warning:

> This order will exceed your home stock space. You must clear or discard stock before collecting.

Prototype options:

## Strict Mode

Player cannot place order beyond capacity.

## Soft Mode

Player can exceed capacity but stock suffers extra degradation.

Recommendation for Prototype 0.1:

> Use Strict Mode.

It is clearer and easier to test.

Later upgrades may allow overflow with penalties.

---

# 29. Van Loadout Connection

After morning collection and weather reveal, the player loads the van.

The wholesaler does not directly load the van.

Flow:

1. Order collected into home stock.
2. Player sees home stock.
3. Player sees van capacity.
4. Player sees chosen or possible location/weather.
5. Player selects loadout.
6. Player travels and opens stall.

This is a separate system but must be supported by wholesaler data.

Each stock batch should track:

- quantity owned
- condition
- source supplier
- purchase price
- age
- batch notes
- current recommended retail
- whether loaded
- whether stored

---

# 30. Developer Overlay Requirements

The developer overlay should include wholesaler controls.

Required testing tools:

- force stock availability
- force sold out
- force Day 1 scripted list
- force special offer
- force bad special offer
- set supplier trustworthiness
- set order fee threshold
- toggle small-order fee
- add/remove cash
- reveal true normal wholesale price
- reveal whether special offer is good or bad
- reveal hidden margin calculation
- generate random daily stock
- repeat previous stock day
- skip to next ordering window
- add selected stock directly to home storage
- clear home stock
- set home storage capacity
- set van capacity

This is essential for tuning.

---

# 31. Prototype UI Text Style

The first supplier’s text should be blunt and commercial.

Examples:

> “Standard mixed colour. Good retail line.”

> “Limited allocation. No backorders.”

> “Good margin if moved quickly.”

> “Slightly leggy. Priced accordingly.”

> “Seasonal colour. Popular line.”

> “Supplier special. Today only.”

> “No current stock.”

Avoid overly cosy descriptions for the first supplier.

Later suppliers can have more voice.

---

# 32. Example Prototype Listings

## 32.1 Tomato Plants

**Tray of 6 Tomato Plants**

- Wholesale: £12
- Suggested retail: £3.50 each
- Margin: Good
- Condition: Fresh Batch
- Category: Grow-your-own
- Location hint: Good for markets, village pitches, and practical urban growers.
- Supplier note: “Reliable spring seller. Works well with compost and pots.”

## 32.2 Strawberry Plants

**Tray of 6 Strawberry Plants**

- Wholesale: £15
- Suggested retail: £4 each
- Margin: Good
- Condition: Fresh Batch
- Category: Fruit / Patio
- Location hint: Good family-friendly stock. Sells well to beginners and patio growers.
- Supplier note: “Good spring line. Compact plants.”

## 32.3 Busy Lizzies

**Tray of 10 Busy Lizzies**

- Wholesale: £10
- Suggested retail: £2 each
- Margin: Good
- Condition: Fresh Batch
- Category: Bedding
- Location hint: Useful for front-step colour and part-shade customers.
- Supplier note: “Mixed colours. Keep watered.”

## 32.4 Potted Lilies

**Tray of 4 Potted Lilies**

- Wholesale: £16
- Suggested retail: £6.50 each
- Margin: Risky
- Condition: In Bud
- Category: Gift / Seasonal Colour
- Location hint: Strong gift appeal where customers want instant impact.
- Supplier note: “Good visual stock. Sell before flowers finish.”

## 32.5 Petunia Special Offer

**SPECIAL OFFER!!! Tray of 10 Petunias**

- Wholesale: £9.60
- Suggested retail: £2.50 each
- Margin: Excellent
- Condition: Fresh Batch
- Category: Bedding / Basket
- Location hint: Good for traditional outdoor shoppers and colourful displays.
- Supplier note: “Overstock. Strong colour mix.”

## 32.6 Bad Special Offer Example

**SPECIAL OFFER!!! Premium Lily Batch**

- Wholesale: £27
- Suggested retail: £6.50 each
- Margin: Poor
- Condition: In Flower
- Category: Gift / Seasonal Colour
- Location hint: Gift appeal, but short selling window.
- Supplier note: “Premium seasonal line. Strong display impact.”

This is deliberately suspicious if the player notices price/margin mismatch.

---

# 33. Wholesaler Success Criteria

The wholesaler system succeeds if:

- the player enjoys browsing stock
- sold-out items create desire rather than frustration
- stock scarcity creates planning
- buying decisions feel commercial
- special offers create judgement
- bad offers feel fair and detectable
- margin ratings help without solving everything
- location hints teach customer/location relationships
- sundries support plant sales
- the first visit guides without feeling like a hard tutorial
- the player looks forward to seeing tomorrow’s stock list
- the wholesaler feels like an internet trade website

The system fails if:

- buying is obvious
- every item is always available
- the player ignores supplier notes
- special offers are random punishment
- the website feels like a generic shop menu
- sold-out listings feel pointless
- the player cannot understand why stock was good or bad
- stock buying does not connect to location, display, or customer demand

---

# 34. Open Questions for Later

The following should be resolved in later documents:

1. Should suppliers have ratings visible to the player?
2. Can the player return/refund bad stock?
3. Can the player reserve sold-out stock?
4. Can the player pre-order seasonal lines?
5. Can suppliers contact the player with offers?
6. Can reputation unlock better wholesale prices?
7. Can the player negotiate?
8. Can the player collect from different suppliers on the same morning?
9. Do distant suppliers increase travel time or reduce trading time?
10. Can some suppliers deliver directly to home storage?
11. Can the player compare price history?
12. Can staff handle ordering later?

Do not answer these in Prototype 0.1 unless required.

---

# 35. Recommended Next Document

The next document should be:

## Document 9 — Display and Merchandising Specification

Reason:

The wholesaler defines what stock the player can buy. The display system defines how that stock becomes attractive and saleable.

Document 9 should define:

- display zones
- slot rules
- tray consolidation
- display fullness
- colour harmony
- plant height/shape roles
- furniture bonuses
- reduced section placement
- location-specific display preferences
- display scoring
- display feedback
- prototype starter stall layout
- future furniture/upgrades

---

# 36. Final Wholesaler Definition

The wholesaler is a simplified trade website where the player orders tomorrow’s stock after each trading day.

It should feel practical, constrained, and commercial. The first supplier is bland and functional, with limited quantities, visible sold-out listings, occasional special offers, plant and sundry tabs, margin ratings, and simple location-fit hints. Stock is ordered in the evening, collected the next morning into home storage, then selectively loaded into the van after the player sees the day’s conditions and chooses a trading location.

The wholesaler’s core question is:

> “What should I risk my cash on tonight, hoping I can sell it tomorrow?”
