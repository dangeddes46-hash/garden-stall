# THE GARDEN STALL
## Document 6 — Core Loop Specification

**Working Title:** The Garden Stall  
**Document Type:** Gameplay Loop / Daily Flow Specification  
**Status:** Draft 001  
**Purpose:** Define how one playable day works, how the major systems connect, and what the player does from planning through trading, closing, feedback, and progression.

---

# 1. Purpose of This Document

This document defines the core playable loop of **The Garden Stall**.

Earlier documents established the project identity, plant schema, customer system, and location system. This document connects those pieces into a practical day-to-day structure.

It explains:

- what the player does before a trading day
- how location choice affects planning
- how the wholesaler interface fits into stock buying
- how display setup works
- how pricing works
- how the trading phase unfolds
- how passive browsing customers buy
- how special requests interrupt or enrich the day
- how light care actions create pressure
- how reduced stock is managed
- how the day ends
- how feedback teaches the player
- how money, reputation, staff, and upgrades progress the stall

The core loop must prove the game’s central fantasy:

> Buy the right living stock, display it well, sell it to the right people, and grow a scruffy little mobile stall into a trusted local plant business.

---

# 2. Core Loop Summary

A standard day in The Garden Stall follows this structure:

1. Review yesterday’s results
2. Choose today’s or tomorrow’s trading location
3. Browse the wholesaler website
4. Buy stock
5. Review current stock condition
6. Set prices
7. Arrange the display
8. Assign staff tasks, if staff exist
9. Open the stall
10. Serve the trading day
11. Handle passive browsing customers
12. Complete occasional special requests
13. Perform light care and display actions during quiet moments
14. Close the stall
15. Resolve stock condition, sales, reputation, reviews, staff XP, and progression
16. Prepare for the next day

This can be shortened in later game with automation, saved display layouts, staff delegation, repeat orders, and improved vehicles.

The early game should make the player perform most steps manually so they understand the business.

---

# 3. Design Principle

The loop should feel **busy but readable**.

The player should usually have several useful things they could do, but not so many that the game becomes stressful or opaque.

Every step should connect to one of the core pillars:

- stock judgement
- location planning
- plant suitability
- display quality
- pricing
- living-stock pressure
- customer satisfaction
- reputation growth
- stall progression

Plant care actions should support the retail loop, not replace it.

The loop should not become a full horticultural maintenance simulator.

---

# 4. Loop Phases

The day is divided into five major phases:

1. **Review Phase**
2. **Planning Phase**
3. **Setup Phase**
4. **Trading Phase**
5. **Closing Phase**

Each phase has a clear purpose.

---

## 4.1 Review Phase

The player sees what happened after the previous trading day.

Purpose:

- teach the player what worked
- highlight missed demand
- show stock condition changes
- reveal reviews/reputation changes
- encourage better planning

Outputs:

- sales summary
- profit/loss
- best-selling plants
- unsold stock
- missed customer demand
- display feedback
- special request outcomes
- plant condition changes
- reduced stock warnings
- staff performance
- reputation/review changes

The Review Phase should answer:

> “Why did yesterday go the way it did?”

---

## 4.2 Planning Phase

The player prepares for the next trading day.

Purpose:

- choose location
- understand expected demand
- browse wholesaler stock
- buy suitable plants
- plan pricing and display
- decide how much risk to take

Key questions:

- Where am I trading?
- Who is likely to shop there?
- What plants do I already have?
- What plants should I order?
- What stock is close to decline?
- What should be reduced?
- What should be featured?
- Can I handle this workload alone?

---

## 4.3 Setup Phase

The player arranges the stall before opening.

Purpose:

- turn inventory into a selling display
- set prices
- position stock by visibility and customer appeal
- create display themes
- manage reduced section
- prepare staff assignments

Key questions:

- What goes on the front table?
- What goes in crates, shelves, racks, or hanging spaces?
- Which plants are featured?
- Are there empty display slots?
- Are tired plants hidden, tidied, or reduced?
- Is the display right for this location?

---

## 4.4 Trading Phase

The stall is open.

Purpose:

- customers browse
- passive sales occur
- special requests appear
- player performs light care and display actions
- staff assist, if available
- the display changes as plants sell or decline

Key questions:

- Do customers find what they want?
- Are prices acceptable?
- Is the display holding up?
- Should I restock empty slots?
- Should I reduce tired plants?
- Which special requests deserve attention?
- Am I falling behind on care or service?

---

## 4.5 Closing Phase

The trading day ends.

Purpose:

- resolve final sales and customer satisfaction
- update stock condition
- apply degradation
- calculate money and reputation
- assign staff XP
- trigger reviews and unlocks
- prepare for next planning phase

Key questions:

- What sold and why?
- What failed to sell and why?
- What is now tired, past peak, reduced, or unsellable?
- Did reputation improve?
- Did staff learn or become dissatisfied?
- What should I do differently tomorrow?

---

# 5. Review Phase Specification

The Review Phase may occur at the start of the next day or immediately after closing the previous day.

For Prototype 0.1, it can appear as an end-of-day report.

---

## 5.1 Required Review Sections

### Money Summary

Shows:

- total sales
- stock cost already sunk or newly counted
- stall fee
- wages, if staff exist
- profit/loss
- available cash

Example:

> Sales: £146  
> Stall fee: £12  
> Wages: £0  
> Day profit: £134  
> Cash available: £238

Prototype can simplify cost accounting if needed.

---

### Sales Summary

Shows:

- plants sold
- quantity sold
- average price
- best sellers
- poor sellers

Example:

> Best seller: Lavender — 5 sold  
> Strong demand: herbs and cheerful bedding  
> Weak seller: Peace Lily — high interest, low conversion due to price

---

### Missed Demand

Shows what customers wanted but could not find.

Examples:

> Several customers asked about herbs, but you had none.

> Two shoppers wanted shade plants. Only one hosta was available and it sold early.

> Station customers looked for desk plants, but the display was mostly outdoor stock.

This section is essential because it teaches the player how to improve.

---

### Display Feedback

Shows how arrangement affected sales.

Examples:

> The lavender and salvia front display drew people in.

> Empty slots on the front table made the stall look picked over by lunchtime.

> The reduced basket sold well but was too close to the gift display.

---

### Stock Condition Report

Shows stock that changed condition.

Examples:

> Basil tray: Good → Tired  
> Hyacinth pots: In Flower → Past Peak  
> Petunias: Tired → Reduced recommended  
> Peace Lily: Excellent → Good

---

### Special Request Outcomes

Shows active customer moments and results.

Examples:

> Completed: Bee-friendly doorstep pot — excellent match. Reputation +.

> Partial success: Dark hallway plant — acceptable, but customer wanted lower maintenance.

> Failed: Gift under budget — customer disliked the tired plant condition.

---

### Reviews and Reputation

Shows any customer reviews and reputation movement.

Examples:

> “They made me a lovely bee-friendly pot and explained why the plants worked together.”

> Village Green reputation increased to Trusted.

---

### Staff Report

Only appears when staff exist.

Shows:

- tasks performed
- XP gained
- morale
- wage satisfaction
- level changes
- mistakes or successes

Example:

> Maya watered 18 plants, helped 4 customers, and gained Display XP. She feels underpaid for her new level.

---

# 6. Planning Phase Specification

The Planning Phase is where the player makes the most strategic decisions.

It should feel like preparing for a market day.

---

## 6.1 Location Choice

The player selects a trading location.

Each location card should show:

- location name
- stall fee
- expected footfall
- pace
- likely customer types
- demand hints
- display hints
- price tolerance
- local reputation
- weather/exposure note, if used
- special event note, if any

Example:

**Village Green**

- Stall fee: Low
- Footfall: Medium
- Pace: Relaxed
- Likely customers: traditional gardeners, pollinator gardeners, new gardeners
- Demand hints: bedding, perennials, front-door pots, wildlife plants
- Display hint: cottage, rustic, colourful, seasonal
- Risk: Low/medium

The player should not see exact formulas, but should have enough information to plan intelligently.

---

## 6.2 Current Stock Review

The player reviews remaining stock before ordering.

Stock view should show:

- plant name
- quantity
- condition
- current price
- suggested price
- tags
- season status
- care warning
- display role
- reduced recommendation
- days/turns near decline, if used

Example:

**Basil**

- Quantity: 4
- Condition: Tired
- Current price: £3
- Suggested: Reduce or water before sale
- Warning: Wilts quickly
- Tags: herb, kitchen-use, moisture-loving, display-risk

This reminds the player that unsold stock carries consequences.

---

## 6.3 Wholesaler Browsing

The wholesaler should feel like browsing a simplified trade website.

The player sees available batches, not abstract plant names.

Each listing should include:

- plant name
- batch type
- quantity
- wholesale cost
- suggested retail
- condition
- seasonal appeal
- demand hints
- care risk
- display notes
- supplier note

Example:

**Tray of 6 Lavender 'Hidcote' — Buds Just Colouring**

- Wholesale: £12
- Suggested retail: £4 each
- Season: Strong summer seller
- Condition: Budding
- Care: Low
- Tags: full-sun, drought-tolerant, scented, pollinator-friendly
- Supplier note: “Compact batch. Good for sunny displays and bee-friendly requests.”

The player should be able to filter or sort by:

- category
- price
- season
- location demand
- indoor/outdoor
- gift
- pollinator-friendly
- herb
- houseplant
- care difficulty
- bargain/supplier special

Prototype 0.1 can use a small fixed list.

---

## 6.4 Stock Buying

The player chooses what to order.

Buying decisions should involve trade-offs:

- safe sellers vs risky bargains
- high-margin stock vs reliable turnover
- seasonal peaks vs long shelf life
- gift/display appeal vs care risk
- matching tomorrow’s location vs building general inventory
- buying enough vs overstocking

The game should make overbuying possible but not instantly catastrophic.

---

## 6.5 Pricing Preparation

The player can set prices before trading.

Pricing options may be:

- bargain
- normal
- premium
- reduced
- custom price, if the game uses exact prices

For early prototype, preset pricing bands may be easier than exact price entry.

Example:

**Lavender**

- Cost basis: £2 per plant
- Suggested retail: £4
- Bargain: £3
- Normal: £4
- Premium: £5
- Reduced: £2

Pricing affects:

- passive browsing conversion
- customer satisfaction
- reputation
- bargain interest
- premium perception
- stock clearance

High prices should work best when supported by:

- strong display
- strong location fit
- excellent condition
- high demand
- premium customer type
- good reputation

---

## 6.6 Reduced Stock Decisions

During planning, the game should suggest plants that may belong in the reduced section.

Reasons:

- past peak
- tired condition
- awkward leftovers
- out of season
- too many unsold days
- display quality low
- needing to clear space

Player choices:

- keep at full price
- reduce price
- tidy/water and try again
- move to reduced section
- discard/compost if unsellable

Reduced stock should be useful, not shameful.

But too much reduced stock or badly placed reduced stock should hurt display quality.

---

## 6.7 Staff Assignment

If staff exist, the Planning Phase includes staff task assignment.

Possible tasks:

- water stock
- tidy display
- manage reduced section
- assist customers
- handle till/sales
- restock empty slots
- improve front display
- help with special requests

Staff should reduce workload and improve consistency.

A larger business should become difficult to run alone, making staff feel naturally valuable.

Prototype 0.1 excludes staff, but the loop should leave space for them.

---

# 7. Setup Phase Specification

The Setup Phase turns stock into a stall.

This is where the player arranges the display.

---

## 7.1 Display Zones

The stall should use defined display areas rather than freeform placement.

Starter display zones may include:

- front table
- side table
- wooden crate area
- reduced basket
- van storage

Later upgrades may add:

- tiered shelves
- hanging rail
- herb rack
- shade shelf
- feature stand
- awning display
- seasonal display area

Each display zone has:

- slot count
- accepted plant sizes/types
- visibility rating
- style bonus
- protection bonus
- location synergy
- display penalty if empty or messy

---

## 7.2 Starter Display Example

Initial ugly van + trestle table setup:

### Front Table

- 6 small/medium plant slots
- high visibility
- strong impulse-buy effect
- empty slots visibly hurt display

### Side Table

- 4 plant slots
- medium visibility
- useful overflow
- lower impulse effect

### Reduced Basket

- 4 reduced-stock slots
- attracts bargain hunters
- contained reduced stock hurts display less
- too full may make stall look tired

### Van Storage

- holds extra stock
- not visible to passive browsing
- can be used to refill sold slots
- stock still degrades lightly

This gives a simple but meaningful display puzzle.

---

## 7.3 Display Actions

Setup actions may include:

- place plant
- move plant
- remove plant
- group plants
- feature plant/category
- set price label
- move to reduced
- consolidate trays
- tidy display
- restock from van
- save layout, later feature

The player should be able to quickly auto-fill or manually adjust.

---

## 7.4 Display Scoring

Display quality should affect passive browsing sales.

Possible scoring areas:

### Fullness

Empty slots reduce appeal.

### Health

Tired or past-peak plants reduce appeal, especially in prominent slots.

### Colour Harmony

Compatible colours improve visual draw.

### Theme Clarity

A clear display theme boosts relevant customer interest.

Examples:

- pollinator display
- herb crate
- gift shelf
- low-maintenance houseplant stand
- front-door pot display

### Location Fit

Displays that suit the location perform better.

Example:

- rustic herb crate at Farmers’ Market
- tidy houseplant shelf at Station Corner
- cottage-style pollinator table at Village Green

### Furniture Synergy

Certain furniture boosts certain plant types.

Examples:

- wooden crates + herbs/cottage plants
- tiered shelves + houseplants
- hanging rail + trailing plants
- chalkboard sign + featured category

---

## 7.5 Display Feedback

The game should describe display quality in readable language.

Examples:

> The front table looks full and colourful.

> The herb crate gives the stall a practical market feel.

> The reduced basket is useful, but it is starting to dominate the display.

> The houseplants look exposed in this sunny pitch.

> The purple and silver plants work well together.

The player should understand the display without needing exact numerical scores, though a simplified rating could be shown.

---

# 8. Trading Phase Specification

The Trading Phase is the active open-stall part of the day.

Time may pass in a compressed sequence, customer waves, or event cards.

Prototype 0.1 can use turn-like customer waves rather than real-time simulation.

---

## 8.1 Trading Phase Structure

A trading day may be divided into time blocks:

1. Morning
2. Midday
3. Afternoon
4. Closing rush, optional

Each block can generate:

- passive customers
- special request chance
- display changes
- care prompts
- restock opportunities
- weather or event modifiers, if used

A block structure keeps the game readable and allows the player to act between waves.

---

## 8.2 Passive Customer Flow

Passive customers arrive based on:

- location footfall
- time of day
- reputation
- weather/event modifiers
- display attractiveness
- staff assistance

They evaluate visible stock.

They may:

- buy
- browse and leave
- comment on missing stock
- hesitate due to price
- ignore poor displays
- notice reduced stock
- trigger a special request

The player does not manually serve every passive customer.

---

## 8.3 Passive Sale Logic

A passive sale should consider:

- customer archetype
- customer intent
- plant tags
- price
- plant condition
- display zone
- display quality
- location demand
- season
- reputation
- staff support

Simplified flow:

1. Customer is generated from location weighting.
2. Customer receives an intent.
3. Customer scans visible plants.
4. Game scores candidate plants.
5. Customer buys best acceptable match, or leaves.
6. Feedback may be generated if no good match exists.

---

## 8.4 Special Request Flow

Special requests interrupt the passive rhythm.

A request flow may be:

1. Customer approaches.
2. Customer gives a spoken request.
3. Player reviews stock and possible recommendations.
4. Player selects plant or plant combination.
5. Player may select advice line, if implemented.
6. Customer reacts.
7. Sale/reputation/review outcome resolves.

Special requests should be short but satisfying.

They should not feel like long dialogue trees unless deliberately expanded later.

---

## 8.5 Special Request Availability

The player should usually recommend from current visible stock, van stock, or known stock.

Possible modes:

### Strict Stock Mode

Player can only sell what they have.

If they know the right answer but do not stock it, they may say so and gain a small trust reward.

Example:

> “That sounds like a hydrangea. I don’t have one today, but I can look for them next week.”

### Knowledge Mode

Player can identify/advice even without stock.

This can still improve reputation.

### Order-Later Mode

Later feature: take request/order for future stock.

Prototype can use Strict Stock Mode plus honest advice.

---

## 8.6 Midday Player Actions

Between customer waves, the player may take limited actions.

Possible actions:

- water visible plants
- tidy a display zone
- restock empty slot
- move tired stock to reduced
- adjust price
- consolidate trays
- feature a new plant
- ask staff to handle task
- ignore and continue

Actions may cost time or action points.

This creates light pressure without becoming frantic.

---

## 8.7 Action Pressure

The player should not be able to do everything perfectly once the stall grows.

Pressure sources:

- more stock
- larger displays
- high footfall
- fast-paced locations
- thirsty plants
- special requests
- empty slots after sales
- staff absence
- tired reduced stock

This naturally leads to:

- better tools
- better furniture
- better planning
- hiring staff
- specialising stock
- choosing manageable locations

---

# 9. Care and Maintenance Within the Loop

Care is a side pressure.

It exists to support the stock-and-sell loop.

---

## 9.1 Care Actions

Prototype care actions:

### Water

Improves or maintains condition for thirsty plants.

Best for:

- herbs
- bedding
- moisture-loving plants
- plants in sunny/exposed locations

### Tidy

Improves display quality and condition perception.

Best for:

- gift plants
- houseplants
- bedding
- plants with visible mess

### Deadhead / Prune

Extends display appeal for flowering plants.

Best for:

- bedding
- pelargonium
- petunia
- flowering perennials

### Consolidate

Combines partial trays or fills gaps.

Best for:

- keeping display full
- reducing empty slot penalties
- improving presentation

### Reduce

Marks tired/past-peak plants for clearance.

Best for:

- stock near decline
- practical customers
- clearing space

---

## 9.2 Care Should Not Include Initially

Avoid early systems for:

- fertilising
- soil pH
- repotting
- pest diagnosis
- disease treatment
- propagation
- exact watering amounts
- compost recipes
- greenhouse management

These may be thematically related but do not belong in the core loop unless later proven necessary.

---

## 9.3 Care Feedback

Care actions should have visible, simple results.

Examples:

> Basil perked up after watering.

> The front table looks tidier.

> Deadheading improved the petunias’ display value.

> Consolidating trays filled two empty front-table slots.

> The tired hyacinths look more honest in the reduced basket.

The player should feel care actions improve sales readiness, not simulate plant biology in detail.

---

# 10. Reduced Section Loop

The reduced section is a core retail feature.

It gives the player a way to recover value from declining stock.

---

## 10.1 Reasons to Reduce Stock

- past flowering peak
- tired but recoverable
- awkward leftover quantity
- out of season
- low demand at full price
- display no longer benefits from it
- too much stock needs clearing
- quality lower than expected

---

## 10.2 Reduced Section Effects

Positive:

- attracts bargain hunters
- clears stock
- recovers some money
- creates honest retail feel
- can improve reputation with practical customers
- prevents poor-condition plants from damaging main displays

Negative:

- lowers margin
- too much reduced stock makes stall look tired
- poor reduced stock can still disappoint
- gift buyers may avoid reduced sections
- premium locations may penalise obvious clearance clutter

---

## 10.3 Reduced Section Feedback

Examples:

> The reduced basket cleared three tired herbs.

> Bargain hunters liked the honesty of the marked-down perennials.

> The reduced section was too prominent for Station Corner gift buyers.

> Past-peak bulbs sold once discounted.

The reduced section should create decisions, not simply punishment.

---

# 11. End-of-Day Resolution

At closing, the game resolves all unsettled systems.

---

## 11.1 Sales Resolution

Calculate:

- total revenue
- units sold
- price achieved
- discounts/reductions
- stall fee
- wages
- net result

---

## 11.2 Stock Resolution

Each remaining plant may change condition based on:

- current condition
- plant degradation speed
- watering/care received
- location exposure
- season
- whether displayed or stored
- whether it is past peak

Condition transitions:

- Excellent → Good
- Good → Tired
- Tired → Past Peak
- Past Peak → Reduced recommended
- Reduced → Unsellable
- Tired → Good, if watered/tidied and recoverable

Not every plant changes every day. Degradation should be noticeable but not brutally fast except for risky stock like basil or short-peak bulbs.

---

## 11.3 Reputation Resolution

Reputation changes based on:

- customer satisfaction
- special request outcomes
- stock suitability
- pricing fairness
- display quality
- review generation
- honest advice
- misleading sales
- local location performance

Reputation should usually move gradually.

---

## 11.4 Review Generation

Reviews may be generated by:

- delighted customers
- failed special requests
- strong display days
- repeated good performance
- returning customers
- notable mistakes

Reviews should be readable and useful.

Examples:

> “Beautiful little stall today. The purple flowers by the front smelled amazing.”

> “Good bargains, but a few things looked close to finished.”

> “They told me not to buy the wrong plant for my hallway. I appreciated that.”

---

## 11.5 Staff Resolution

When staff exist:

- assign XP
- check level ups
- update morale
- check pay satisfaction
- note fatigue or workload
- trigger staff comments

Example:

> Maya levelled up in Display. She now improves colour-themed displays more effectively.

> Tom feels his wage is low for the amount of customer work he is doing.

Staff systems should not appear in Prototype 0.1, but the loop should support them later.

---

# 12. Progression Loop

The daily loop feeds broader progression.

---

## 12.1 Money Progression

Money allows:

- buying more stock
- taking better pitches
- buying furniture
- upgrading vehicle/storage
- hiring staff
- paying wages
- accessing better suppliers
- taking calculated risks

Money should matter but not dominate the cosy tone.

---

## 12.2 Reputation Progression

Reputation unlocks:

- new locations
- better customers
- stronger footfall
- event invitations
- improved price tolerance
- staff applicants
- rare supplier access
- returning customers
- special story moments

Reputation should often feel more emotionally important than cash.

---

## 12.3 Upgrade Progression

Upgrades improve the loop.

Examples:

### Display Upgrades

- more slots
- better visibility
- style bonuses
- reduced section containment

### Tool Upgrades

- faster watering
- better tidying
- less degradation
- quicker setup

### Vehicle Upgrades

- more storage
- better pitch access
- stronger identity
- improved customer attraction

### Staff Upgrades

- more automation
- higher consistency
- more time for special requests
- improved display/sales/care

---

# 13. Player Information Flow

The loop depends on the player receiving enough information.

The player should know:

- what locations tend to want
- what plants are good for
- what stock condition means
- what prices are sensible
- why customers bought or did not buy
- when display helped or hurt
- when stock should be reduced
- what staff did
- what to improve tomorrow

Avoid hiding too much.

Mystery can exist in special requests, but sales logic should be learnable.

---

# 14. Prototype 0.1 Core Loop

Prototype 0.1 should implement a simplified version.

---

## 14.1 Prototype Scope

Duration:

- 7 trading days

Locations:

- Market Square
- Village Green
- Station Corner

Plants:

- 20 to 30 starter plants

Customers:

- 5 to 6 archetypes

Special Requests:

- 10 to 15 templates

Systems:

- location choice
- wholesaler stock buying
- current stock review
- display zones
- pricing bands
- passive browsing sales
- special requests
- water/tidy/consolidate/reduce
- condition degradation
- reduced section
- end-of-day report
- money
- simple reputation

Excluded:

- staff
- full seasonal calendar
- complex weather
- advanced upgrades
- rare suppliers
- detailed narrative
- pest/disease
- propagation
- deep relationships

---

## 14.2 Prototype Day Flow

Prototype day:

1. Choose location
2. Review current stock
3. Browse small wholesaler list
4. Buy stock
5. Set prices
6. Arrange display slots
7. Open stall
8. Resolve morning customer wave
9. Player takes one or more care/display actions
10. Resolve midday customer wave
11. Handle special request, if generated
12. Player takes one or more care/display actions
13. Resolve afternoon customer wave
14. Close stall
15. Show end-of-day report
16. Update stock, money, and reputation

This structure avoids real-time complexity while preserving the feeling of a trading day.

---

## 14.3 Prototype Success Criteria

Prototype 0.1 succeeds if the player:

- understands why location matters
- changes stock choices based on location
- sees display affect sales
- understands why customers buy or leave
- enjoys special requests
- notices plant condition without feeling punished
- uses the reduced section strategically
- wants to improve the stall
- wants to play another day with a better plan

The key emotional test:

> “I know what I’ll do differently tomorrow.”

---

# 15. Future Expansion Points

Once the core loop works, the game can expand through:

- staff
- more locations
- larger plant catalogue
- better wholesalers
- seasonal calendar
- event days
- returning customers
- more display furniture
- saved display layouts
- vehicle upgrades
- difficulty settings
- rare plants
- advanced special requests
- local story arcs

Expansion should only be added if the core loop remains readable.

---

# 16. Loop Risks

## Risk 1: Too Many Steps Before Trading

If planning becomes slow, the player may feel blocked from the fun.

Mitigation:

- allow default prices
- allow auto-fill display
- allow repeat orders
- provide clear location hints
- introduce systems gradually

---

## Risk 2: Passive Sales Feel Random

If customers buy invisibly, the player may not understand outcomes.

Mitigation:

- strong feedback lines
- clear missed demand
- visible display effects
- simple customer comments
- readable end-of-day report

---

## Risk 3: Care Becomes Chore Work

If care actions dominate, the game drifts away from stock-and-sell.

Mitigation:

- keep care simple
- make care visibly improve retail readiness
- allow staff/tools to reduce care later
- avoid detailed plant simulation

---

## Risk 4: Display Becomes Fiddly

If arrangement is too granular, setup may become tedious.

Mitigation:

- use slots/zones
- allow auto-arrange
- use broad scoring
- provide display feedback rather than demanding perfection

---

## Risk 5: Pricing Becomes Spreadsheet-Like

If pricing is too exact, the cosy tone may suffer.

Mitigation:

- use pricing bands initially
- show suggested prices
- give feedback on price acceptance
- reserve exact custom pricing for later or optional expert mode

---

## Risk 6: The Day Has No Tension

If everything can be done perfectly, staff/upgrades lose purpose.

Mitigation:

- limited actions during trading
- high-footfall locations create busyness
- stock condition declines gently
- bigger displays require more care
- staff become useful as scale increases

---

# 17. Recommended Interface Screens

The core loop implies the following screens:

1. End-of-Day Report
2. Location Selection
3. Current Stock
4. Wholesaler Website
5. Pricing
6. Display Setup
7. Trading Day View
8. Special Request Panel
9. Stock Condition / Reduced Section
10. Reputation and Reviews
11. Upgrades
12. Staff, later

Prototype 0.1 can combine several screens to reduce implementation scope.

---

# 18. Current One-Day Example

The player chooses **Village Green**.

Location hints suggest:

- traditional gardeners
- pollinator customers
- outdoor colour
- front-door pots
- cottage-style display

The player checks stock:

- 2 tired basil
- 3 good pansies
- 1 peace lily
- 4 lavender
- no herbs except basil

At the wholesaler, they buy:

- tray of 6 salvia
- tray of 6 thyme
- tray of 6 marigolds
- skip a risky batch of past-peak petunias

Setup:

- lavender and salvia on front table
- thyme in wooden crate
- pansies fill colour gaps
- basil moved to reduced basket
- peace lily kept in van storage because it is a poor location fit

Trading:

- pollinator customers buy lavender and salvia
- a kitchen buyer takes thyme
- a gift buyer ignores the reduced basil
- special request: “Can you make a bee-friendly doorstep pot?”
- player recommends lavender + thyme + salvia
- customer is delighted

Closing:

- good profit
- Village Green reputation increases
- basil becomes nearly unsellable
- report says: “Strong pollinator display. Several customers still asked for bedding variety.”
- player decides to order more cheerful bedding tomorrow

The player has learned something actionable.

---

# 19. Final Loop Definition

The Garden Stall’s core loop is:

> Choose a pitch, buy living stock, arrange it beautifully, price it sensibly, sell through browsing and recommendation, manage decline honestly, learn from customer feedback, and improve the stall for tomorrow.

The loop should always lead the player back to one question:

> “What should I stock, display, and do differently tomorrow?”
