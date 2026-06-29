# THE GARDEN STALL
## Document 7 — Prototype 0.1 Vertical Slice Content Plan

**Working Title:** The Garden Stall  
**Document Type:** Prototype Scope / Vertical Slice Content Plan  
**Status:** Draft 001  
**Purpose:** Define the first playable build target for The Garden Stall: what must be included, what must be excluded, what content is required, and what the prototype must prove.

---

# 1. Purpose of This Document

This document defines **Prototype 0.1** for The Garden Stall.

The goal of Prototype 0.1 is not to represent the full game. It is to create the smallest complete playable version that can prove the core loop:

> Buy cheap seasonal stock, display it well, sell it to location-specific customers, manage light living-stock pressure, clear tired plants honestly, and learn what to do better tomorrow.

Prototype 0.1 should feel like the opening week of the real game, not a detached sandbox.

The player should begin where the final game begins:

- small amount of cash
- ugly transit-style van
- basic trestle table
- limited display space
- tight buying decisions
- cheap spring stock
- no staff
- limited wholesaler availability
- simple urban trading locations
- pressure building toward the eventual need for help

By the end of the seven-day slice, the player should not yet need staff, and probably should not be able to afford staff sustainably. However, they should begin to feel why staff will become valuable once stock volume, display space, and customer traffic increase.

---

# 2. Prototype Design Goal

Prototype 0.1 must answer one question:

> Is the core stock-and-sell loop fun before the game adds more seasons, staff, upgrades, rare plants, or story?

The prototype succeeds if the player wants to play another week because they can already see how to improve:

- better location choice
- better stock choice
- better wholesaler timing
- better display arrangement
- better pricing
- better reduced-section use
- better special request handling
- better daily preparation

It should create the thought:

> “I know what I’ll do differently tomorrow.”

---

# 3. Prototype Length

Prototype 0.1 covers:

## 7 Trading Days

This is the first unit of play.

The intended progression is:

1. **Prototype 0.1:** 7 days
2. **Later prototype:** one simplified season
3. **Later full structure:** one year and beyond

The seven-day prototype should be compact enough to build, test, and rebalance quickly.

It should be long enough to show:

- stock turnover
- overbuying consequences
- condition decline
- changing daily opportunities
- player learning
- location differences
- first signs of workload pressure

It should not yet attempt to model a full season.

---

# 4. Setting and Tone for Prototype

Prototype 0.1 assumes a broadly **UK urban gardener** setting.

The tone should be:

- small-scale
- practical
- urban/suburban
- cheap spring retail
- slightly scruffy at first
- optimistic
- grounded in recognisable UK plant-selling culture

The player is not opening a beautiful boutique yet.

The starting fantasy is closer to:

> A cheap van, a folding table, a few trays of spring plants, and the hope that you can turn today’s stock into enough cash to buy better tomorrow.

Prototype stock should feel like the kind of plants commonly seen outside supermarkets, discount stores, corner shops, car boot sales, cheap garden outlets, and early-season market stalls in March, April, and May.

This means:

- bedding plants
- plug-style trays
- tomatoes
- strawberries
- lilies
- pansies
- primroses
- busy lizzies
- geraniums/pelargoniums
- petunias
- lobelia
- begonias
- simple herbs
- compost
- cheap terracotta pots

The early game should not start with specialist perennials, rare houseplants, advanced shrubs, or expensive designer planters.

---

# 5. Challenge Level

Prototype 0.1 should model challenge from the outset.

Starting money should be tight.

The player should be able to make mistakes.

Bad choices should not instantly end the run, but should matter.

Examples of intended pressure:

- buying too much stock leaves little cash
- poor location fit slows sales
- tired plants must be reduced
- low display fullness hurts browsing
- overpricing common plants reduces turnover
- ignoring watering/tidying makes stock harder to sell
- missed demand teaches future buying choices

The economy should not be comfortable.

The player should feel:

> “I need this stock to sell.”

---

# 6. Developer Overlay

Prototype 0.1 should include a hideable **developer overlay** for testing.

This is not a player-facing feature.

It should allow rapid balancing and debugging.

## 6.1 Developer Overlay Features

Suggested options:

- toggle god mode
- add cash
- remove cash
- add stock
- clear stock
- set plant condition
- force customer type
- force special request
- force location result
- reveal customer scoring
- reveal plant match scores
- reveal display score
- reveal demand tags
- skip to next day
- repeat current day
- reset prototype
- unlock all locations
- show economy summary
- show hidden reputation values

## 6.2 Overlay Requirement

The overlay must be hideable by toggle.

It should never interfere with normal playtesting when hidden.

Purpose:

> Make balancing easy without weakening the intended player challenge.

---

# 7. Starting Player State

Prototype 0.1 should begin with a constrained setup.

## 7.1 Starting Assets

The player begins with:

- ugly transit-style van
- simple folding trestle table
- one side table or crate surface
- small reduced basket
- limited van storage
- no staff
- no upgrades
- no reputation
- basic access to one wholesaler
- tight starting cash

## 7.2 Starting Cash

Recommended starting cash:

> **£80**

This is intentionally tight.

The first forced wholesaler selection should consume a meaningful portion of this cash but leave enough for a stall fee and limited choices afterward.

If £80 proves too punishing in testing, adjust to £100.

If too forgiving, adjust to £60.

Prototype should use the dev overlay to test all three values.

## 7.3 Starting Stock

Recommended:

> No starting stock before first wholesaler visit.

The first meaningful action should be the first wholesaler browse/order.

This teaches the stock-buying loop immediately.

---

# 8. Starting Stall Layout

Prototype 0.1 uses a small slot-based display.

## 8.1 Initial Display Zones

### Front Trestle Table

- 6 visible plant slots
- high visibility
- best for impulse buys, colourful stock, and featured plants
- empty slots visibly hurt display

### Side Table / Crate Surface

- 4 visible plant slots
- medium visibility
- good for overflow, herbs, or less showy stock

### Reduced Basket

- 3 reduced-stock slots
- visible to bargain hunters
- reduced plants here hurt display less than if left on the front table
- too full or too prominent can make the stall feel tired

### Van Storage

- 12 storage slots
- not visible to passive browsing
- can hold spare trays/sundries
- stock in storage still ages, but may be less exposed than displayed stock

## 8.2 Display Implications

The player can display only a limited amount.

This creates early decisions:

- what deserves the front table?
- should all stock be visible?
- should sundries take display space?
- where should reduced stock go?
- should empty slots be filled with weaker stock or left empty?
- should fast-selling stock be held in van storage and restocked later?

---

# 9. Prototype Locations

Prototype 0.1 includes three locations.

These are the same starter locations defined in Document 5.

## 9.1 Market Square

Role:

- balanced starter location
- mixed demand
- forgiving
- useful for learning broad sales behaviour

Expected demand:

- bedding
- cheerful colour
- gifts
- herbs
- tomatoes/strawberries
- cheap useful plants
- beginner-friendly stock
- reduced bargains

## 9.2 Village Green

Role:

- outdoor/garden-focused location
- slower browsing
- more traditional plant buyers
- better for bedding, patio plants, pollinator colour, and grow-your-own stock

Expected demand:

- bedding plants
- pansies
- primroses
- pelargoniums
- tomatoes
- strawberries
- herbs
- front-door pots
- lilies
- cheerful traditional colour

## 9.3 Station Corner

Role:

- urban, fast, compact stock location
- best for quick gifts, small pots, cheap impulse buys, and flat/balcony customers

Expected demand:

- compact colourful pots
- giftable lilies
- strawberries as novelty/edible patio stock
- small herbs
- low-cost instant colour
- small terracotta pots
- compost may sell poorly here unless paired with plants

## 9.4 Location Unlocks

All three can be available from the start for testing.

If the onboarding needs more control, start with Market Square only on Day 1, then unlock Village Green and Station Corner on Day 2.

---

# 10. Prototype Plant and Sundry List

Prototype 0.1 should use a curated list of **25 stock items**.

This list should be based on cheap, high-turnover, recognisable spring stock.

The list includes both plants and basic sundries because early cheap plant retail often sells compost and simple pots alongside plants.

## 10.1 Starter 25 Stock Items

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

---

# 11. Stock Item Roles

Each item must have a clear reason to exist in the prototype.

## 11.1 Tomato Plants

Role:

- classic spring grow-your-own seller
- strong urban gardener appeal
- good for market/village locations
- common cheap impulse stock

Tags:

- edible
- grow-your-own
- container-suitable
- patio
- beginner-friendly
- full-sun
- seasonal
- useful

Risk:

- moderate watering need
- can look tired if neglected
- may sell poorly at fast gift-heavy locations

## 11.2 Strawberry Plants

Role:

- highly recognisable edible patio stock
- good for families, beginners, and impulse buyers
- strong spring appeal

Tags:

- edible
- fruit
- container-suitable
- child-friendly
- patio
- cheerful
- beginner-friendly
- gift: weak/normal

Risk:

- needs presentable foliage/flowers/fruit promise
- can look dull if displayed poorly

## 11.3 Chilli Plants

Role:

- slightly more exciting edible stock
- useful for urban gardeners and gift buyers
- good compact plant

Tags:

- edible
- kitchen-use
- patio
- sunny-windowsill
- gift: weak/normal
- small-space

Risk:

- less universal than tomato/strawberry
- needs warmth and light

## 11.4 Lettuce Seedlings

Role:

- cheap useful stock
- good for practical growers
- adds grow-your-own variety

Tags:

- edible
- beginner-friendly
- low-price
- kitchen-use
- grow-your-own

Risk:

- less visually exciting
- may need low pricing to move quickly

## 11.5 Basil

Role:

- classic herb impulse buy
- useful but fragile
- teaches care pressure

Tags:

- herb
- edible
- kitchen-use
- scented
- small-space
- display-risk

Risk:

- wilts quickly
- poor low-maintenance recommendation
- good early example of living-stock pressure

## 11.6 Mint

Role:

- easy recognisable herb
- good for drinks, pots, beginners
- strong scent

Tags:

- herb
- edible
- kitchen-use
- scented
- beginner-friendly
- container-suitable

Risk:

- should include advice that it is best kept in a pot because it spreads

## 11.7 Parsley

Role:

- useful cheap herb
- broad but not exciting
- fills practical herb demand

Tags:

- herb
- edible
- kitchen-use
- low-price
- beginner-friendly

Risk:

- low impulse appeal

## 11.8 Rosemary

Role:

- woody herb with stronger display and gift value
- good for sunny pots
- drought-tolerant option

Tags:

- herb
- edible
- scented
- full-sun
- drought-tolerant
- patio
- low-maintenance
- container-suitable

Risk:

- less suitable for shade/indoors

---

## 11.9 Pansies

Role:

- classic cool-season colour
- early spring bestseller
- easy front-table stock

Tags:

- bedding
- cheerful
- colourful
- container-suitable
- front-door
- beginner-friendly
- cool-season

Risk:

- may decline as weather warms
- can look tired if not deadheaded

## 11.10 Violas

Role:

- similar to pansies but smaller and charming
- good for pots, baskets, and cheerful budget displays

Tags:

- bedding
- cheerful
- colourful
- container-suitable
- small-space
- beginner-friendly

Risk:

- low individual value
- needs quantity to matter commercially

## 11.11 Primroses

Role:

- strong March/April instant colour
- nostalgic and cheap
- good early spring display plant

Tags:

- bedding
- cheerful
- nostalgic
- part-shade
- front-door
- gift: weak/normal
- cool-season

Risk:

- seasonal window narrows as spring moves on

## 11.12 Bellis Daisies

Role:

- cheerful early spring bedding
- good family/school fair style plant
- adds variety to pansy/primrose stock

Tags:

- bedding
- cheerful
- child-friendly
- container-suitable
- spring-interest

Risk:

- lower recognition than pansies/primroses

## 11.13 Wallflowers

Role:

- traditional spring bedding
- scent and nostalgia
- good village/traditional gardener stock

Tags:

- bedding
- scented
- nostalgic
- cottage-style
- spring-interest
- pollinator-friendly: weak/normal

Risk:

- less urban impulse appeal

## 11.14 Marigolds

Role:

- cheap bright bedding
- beginner-friendly
- later spring/summer colour
- strong car-boot/supermarket style stock

Tags:

- bedding
- cheerful
- orange
- yellow
- full-sun
- beginner-friendly
- low-price

Risk:

- may be early depending exact spring timing
- common stock resists premium pricing

## 11.15 Petunias

Role:

- classic basket/container bedding
- strong colour and impulse appeal
- teaches deadheading/tidying

Tags:

- bedding
- basket
- container-suitable
- colourful
- full-sun
- impulse-buy
- display-risk

Risk:

- thirsty
- can look messy quickly
- needs deadheading/tidying

## 11.16 Busy Lizzies

Role:

- familiar high-colour bedding plant
- useful for part-shade requests
- strong cheap seasonal seller

Tags:

- bedding
- colourful
- part-shade
- container-suitable
- cheerful
- beginner-friendly

Risk:

- watering need
- frost tender
- seasonal timing matters

## 11.17 Begonias

Role:

- reliable bedding for shade/containers
- good for customers without full sun
- broad colour appeal

Tags:

- bedding
- part-shade
- container-suitable
- cheerful
- low-maintenance: normal
- colourful

Risk:

- can look dull before flowering
- common stock

## 11.18 Lobelia

Role:

- classic basket/trailing plant
- display softener
- good add-on with basket plants

Tags:

- bedding
- trailing
- basket
- edge-softener
- blue
- white
- purple
- container-suitable

Risk:

- low individual price
- works best as companion/add-on

## 11.19 Pelargoniums

Role:

- classic geranium-style patio bedding
- strong retail recognition
- bright, drought-tolerant, good for front displays

Tags:

- bedding
- patio
- container-suitable
- cheerful
- full-sun
- drought-tolerant
- nostalgic

Risk:

- frost tender
- common stock limits premium pricing

## 11.20 Fuchsias

Role:

- basket/patio plant
- strong visual recognition
- useful for part-shade and gift/container buyers

Tags:

- bedding
- basket
- part-shade
- colourful
- trailing/upright depending batch
- nostalgic
- container-suitable

Risk:

- watering need
- can look tired if neglected

---

## 11.21 Potted Lilies

Role:

- giftable seasonal colour
- strong supermarket/corner-shop style display plant
- high visual impact
- useful special request stock

Tags:

- gift
- flowering
- fragrant, if variety
- front-table-star
- high-impact
- seasonal
- patio/indoor-temporary depending variety

Risk:

- short peak window
- pet safety warning important, especially cats
- past-peak decline hurts gift value

## 11.22 Daffodil Pots

Role:

- very early spring colour
- teaches sharp seasonal timing/past-peak behaviour

Tags:

- bulb
- spring-interest
- cheerful
- gift
- front-door
- short-season

Risk:

- quickly past peak
- likely reduced after flowering

## 11.23 Hyacinth Pots

Role:

- gift/scent stock
- strong spring impulse plant
- teaches scent and peak timing

Tags:

- bulb
- spring-interest
- scented
- gift
- colourful
- short-season
- front-table-star while in flower

Risk:

- sharp decline after flowering
- scent can be positive or negative depending customer

---

## 11.24 Multipurpose Compost Bag

Role:

- basic sundry
- add-on sale
- practical grow-your-own support
- introduces sundries section

Tags:

- sundry
- compost
- grow-your-own-support
- add-on
- practical

Risk:

- takes storage/display space
- low visual appeal
- poor gift/impulse fit
- may sell better at village/market than station

## 11.25 Machine-Made Terracotta Pot

Role:

- cheap simple pot
- add-on sale
- supports companion pot/gift/patio requests
- introduces pot upsell

Tags:

- sundry
- pot
- terracotta
- add-on
- container-support
- practical
- gift-support

Risk:

- low margin unless paired with plant
- takes space
- plain compared with later nicer pots

---

# 12. First Wholesaler Visit

The first wholesaler visit should guide the player into a good opening stock choice.

Most plants should appear as **sold out** or unavailable.

The player sees the broader wholesaler website, but can only buy a small number of obvious best sellers.

This teaches:

- availability changes
- wholesaler browsing
- stock scarcity
- good early stock choices
- buying is constrained

## 12.1 First Visit Available Stock

Recommended Day 1 available stock:

1. Tomato Plants — tray of 6
2. Strawberry Plants — tray of 6
3. Busy Lizzies — tray of 10
4. Potted Lilies — tray of 4

Optional fifth item if testing needs more choice:

5. Multipurpose Compost Bag — 3 bags

However, the cleanest first visit is:

> one tray each of tomatoes, strawberries, busy lizzies, and lilies.

## 12.2 First Visit Sold-Out Examples

Visible but sold out:

- Pansies
- Primroses
- Petunias
- Pelargoniums
- Lobelia
- Begonias
- Mint
- Basil
- Terracotta Pots
- Hyacinth Pots
- Daffodil Pots

This makes the wholesaler feel like a real supply channel rather than a perfect shop.

## 12.3 First Purchase Pressure

If starting cash is £80, example first buy:

- Tomatoes tray of 6: £12
- Strawberries tray of 6: £15
- Busy Lizzies tray of 10: £10
- Potted Lilies tray of 4: £16

Total: £53

Cash remaining: £27

This leaves enough for a stall fee and perhaps one small later purchase, but not enough to ignore risk.

Prices are placeholders and must be tuned.

---

# 13. Wholesaler Availability Across 7 Days

The wholesaler should update daily.

Not every item should be available every day.

Prototype 0.1 should include three kinds of availability:

## 13.1 Core Best Sellers

Usually available, but not always in ideal condition.

Examples:

- tomatoes
- strawberries
- pansies/violas
- busy lizzies
- petunias
- pelargoniums
- compost
- terracotta pots

## 13.2 Seasonal Short-Window Stock

Available briefly, then becomes risky or sold out.

Examples:

- daffodil pots
- hyacinth pots
- primroses
- wallflowers
- potted lilies

## 13.3 Opportunistic Bargains

Occasional cheap batches with risk.

Examples:

- slightly leggy petunias
- past-peak primroses
- mixed-quality basil
- discounted lilies near bloom finish
- overstocked lettuce seedlings

---

# 14. Prototype Customer Archetypes

Prototype 0.1 should use six active customer archetypes.

## 14.1 Active Archetypes

1. New Gardener
2. Flat / Balcony Grower
3. Gift Buyer
4. Traditional Gardener
5. Herb / Kitchen Buyer
6. Bargain Hunter

## 14.2 Deferred Archetypes

Defer until later:

- Pollinator Gardener as a full archetype
- Busy Professional as a full archetype
- Specialist Collector
- Office Buyer
- Experienced Designer
- Pet Safety Customer as common type

Pollinator demand can still appear as a request or soft tag, but the prototype’s spring cheap-stock focus should stay on common turnover stock.

---

# 15. Prototype Special Requests

Prototype 0.1 should include 12 special request templates.

These should be simple, grounded, and based on starter stock.

## 15.1 Required Request Categories

- gift
- budget
- grow-your-own
- balcony/patio
- bedding colour
- shade/part-shade
- add-on/sundry
- correction/honest advice

## 15.2 Prototype Request List

1. Cheerful Gift Under £10
2. Tomato Starter Advice
3. Strawberry Pot for a Child
4. Sunny Balcony Edibles
5. Something for a Shady Doorstep
6. Cheap Front-Step Colour
7. Basket Plant Add-On
8. Compost Add-On Sale
9. Terracotta Pot Pairing
10. Lily Gift Warning
11. Bargain Past-Peak Bulbs
12. First-Time Bedding Tray

---

## 15.3 Request Example — Cheerful Gift Under £10

**Request ID:** `cheerful_gift_under_10`

Customer line:

> “I need something cheerful, but I’ve only got about a tenner.”

Good matches:

- potted lily if priced within budget or small size
- primrose pot
- pansies
- busy lizzies in flower
- hyacinth pot if still fresh

Poor matches:

- tired herbs
- compost
- lettuce seedlings
- past-peak bulbs unless customer accepts reduced

Tests:

- gift suitability
- price
- condition
- display appeal

---

## 15.4 Request Example — Tomato Starter Advice

**Request ID:** `tomato_starter_advice`

Customer line:

> “I’ve never grown tomatoes before. Could I do one in a pot?”

Good response:

- recommend tomato plant
- pair with terracotta pot if available
- mention sunny spot and regular watering
- offer compost add-on if stocked

Good matches:

- tomato plant
- tomato + pot
- tomato + compost
- tomato + pot + compost, if budget allows

Poor matches:

- lettuce as substitute without explanation
- chilli if they asked specifically for tomatoes
- tomato sold without care note in expert scoring

Tests:

- grow-your-own
- add-on sale
- beginner advice

---

## 15.5 Request Example — Strawberry Pot for a Child

**Request ID:** `strawberry_child_pot`

Customer line:

> “My kid wants to grow something. I’d like something easy and exciting.”

Good matches:

- strawberry plant
- strawberry + terracotta pot
- strawberry + compost
- cheerful add-on if budget allows

Poor matches:

- basil, if framed as easy for child
- lily due to pet/child caution depending framing
- plain parsley unless budget is very low

Tests:

- child-friendly
- edible
- beginner
- add-on

---

## 15.6 Request Example — Lily Gift Warning

**Request ID:** `lily_gift_warning`

Customer line:

> “Those lilies look lovely. They’re for my sister — she has cats, but they’d look nice in her kitchen.”

Best outcome:

- warn customer that lilies are a bad choice around cats
- recommend a safer alternative if available
- if no safe alternative, gain trust for honesty

Good matches:

- avoid lily sale
- suggest pansies/primroses for outdoor gift if appropriate
- suggest non-toxic later stock if no current match

Bad outcome:

- sell lily without warning

Tests:

- honesty
- safety
- reputation over profit

Note:

This request should only be included if the game is prepared to handle safety warnings clearly.

---

# 16. Prototype Passive Demand

Each location should create different passive demand.

## 16.1 Market Square Demand

Strong:

- tomatoes
- strawberries
- busy lizzies
- pansies/violas
- lilies as gifts
- compost as add-on
- terracotta pots as add-on

Medium:

- herbs
- petunias
- marigolds
- pelargoniums
- primroses

Weak:

- specialist stock
- expensive premium plants

## 16.2 Village Green Demand

Strong:

- bedding
- tomatoes
- strawberries
- pelargoniums
- fuchsias
- lilies
- primroses
- wallflowers
- compost
- terracotta pots

Medium:

- herbs
- petunias
- lobelia
- begonias
- marigolds

Weak:

- urban/office stock
- plain houseplants

## 16.3 Station Corner Demand

Strong:

- potted lilies
- compact cheerful pots
- strawberries as novelty patio stock
- herbs in small pots
- terracotta pot pairings
- quick gifts

Medium:

- busy lizzies
- begonias
- small tomato plants
- pansies

Weak:

- compost bags
- large bedding trays
- low-visual utility stock
- traditional outdoor-only stock

---

# 17. Pricing Model

Prototype 0.1 uses pricing bands shown as real prices.

The player chooses:

- bargain
- normal
- premium
- reduced

The game displays exact prices.

## 17.1 Example Pricing

### Tomato Plant

- Wholesale unit: tray of 6
- Wholesale cost: £12
- Cost per plant: £2
- Bargain: £2.50
- Normal: £3.50
- Premium: £4.50
- Reduced: £1.50

### Strawberry Plant

- Wholesale unit: tray of 6
- Wholesale cost: £15
- Cost per plant: £2.50
- Bargain: £3
- Normal: £4
- Premium: £5
- Reduced: £2

### Busy Lizzie

- Wholesale unit: tray of 10
- Wholesale cost: £10
- Cost per plant: £1
- Bargain: £1.50
- Normal: £2
- Premium: £2.50
- Reduced: £1

### Potted Lily

- Wholesale unit: tray of 4
- Wholesale cost: £16
- Cost per plant: £4
- Bargain: £5
- Normal: £6.50
- Premium: £8
- Reduced: £3

### Compost Bag

- Wholesale unit: single bag
- Wholesale cost: £3
- Bargain: £4
- Normal: £5
- Premium: £6
- Reduced: £3

### Terracotta Pot

- Wholesale unit: single pot
- Wholesale cost: £1.50
- Bargain: £2
- Normal: £3
- Premium: £4
- Reduced: £1

Prices are placeholders and must be tuned through testing.

---

# 18. Stock Condition Model

Prototype 0.1 uses simple condition states.

## 18.1 Condition States

- Excellent
- Good
- Tired
- Past Peak
- Reduced
- Unsellable

## 18.2 Degradation Rules

Plants degrade based on:

- plant type
- care need
- displayed vs stored
- weather/exposure, if used lightly
- whether watered/tidied
- whether flowering window is ending

## 18.3 Fast-Risk Stock

Degrades quickly if ignored:

- basil
- petunias
- busy lizzies
- potted lilies near peak
- hyacinth pots
- lettuce seedlings

## 18.4 Slow-Risk Stock

More forgiving:

- rosemary
- mint
- strawberry plants
- pelargoniums
- terracotta pots
- compost

## 18.5 Sundry Condition

Sundries do not degrade biologically.

However, they use space.

Sundry pressure comes from:

- tied-up cash
- storage slots
- display slots
- lower visual appeal
- location mismatch

---

# 19. Care Actions

Prototype care actions:

1. Water
2. Tidy
3. Deadhead / Prune
4. Consolidate
5. Reduce

## 19.1 Water

Best for:

- basil
- lettuce
- busy lizzies
- petunias
- fuchsias
- bedding trays

Effect:

- prevents decline
- may restore Tired to Good if recoverable

## 19.2 Tidy

Best for:

- gift plants
- lilies
- bedding
- front table displays

Effect:

- improves display score
- improves condition perception

## 19.3 Deadhead / Prune

Best for:

- petunias
- pansies
- pelargoniums
- busy lizzies
- fuchsias

Effect:

- improves display value
- slows move to Past Peak

## 19.4 Consolidate

Best for:

- part-sold trays
- half-empty displays
- bedding stock

Effect:

- fills empty slots
- improves display fullness
- may free a display or storage slot

## 19.5 Reduce

Best for:

- past-peak plants
- tired plants
- slow sellers
- end-of-week clearance

Effect:

- lowers price
- increases bargain sales
- reduces reputation penalty from poor-value stock

---

# 20. Day-by-Day Prototype Arc

Prototype 0.1 should have a loose designed arc.

## Day 1 — First Stock

Focus:

- choose first location
- first wholesaler visit
- forced best-seller stock
- first display setup
- first simple sales

Recommended:

- Market Square as guided first pitch
- available stock: tomatoes, strawberries, busy lizzies, lilies
- one special request max

Learning:

- plants cost cash
- display slots are limited
- customers buy by need
- lilies sell well but carry peak/safety risk

---

## Day 2 — First Choice

Focus:

- more wholesaler stock appears
- player chooses whether to restock best sellers or diversify
- Village Green and Station Corner become clearer options

Learning:

- location demand differs
- not all stock suits all places
- display changes sales

---

## Day 3 — First Degradation

Focus:

- unsold plants begin to look tired
- reduced section becomes useful
- watering/tidying matters

Learning:

- stock is alive
- overbuying has consequences
- reduced stock can recover value

---

## Day 4 — First Specialisation

Focus:

- player can plan toward one location
- wholesaler offers a tempting bargain
- customer requests become slightly more specific

Learning:

- buying for tomorrow is better than buying randomly
- bargains carry risk

---

## Day 5 — Workload Pressure

Focus:

- more customers
- more display gaps
- more care prompts
- player begins feeling stretched

Learning:

- staff/tools will eventually matter
- bigger is not automatically easier

---

## Day 6 — Reputation Signal

Focus:

- reviews or returning customers respond to earlier choices
- good advice improves trust
- bad fit or poor stock may create negative feedback

Learning:

- reputation matters
- honest advice pays off

---

## Day 7 — End-of-Week Test

Focus:

- player has enough knowledge to plan a strong day
- pressure peaks but remains manageable
- report summarises week performance

Learning:

- core loop has been understood
- next stage should introduce season/week progression or first staff hint

End-of-week message should suggest:

> “You handled the week alone, but a busier pitch or larger display will be difficult without help.”

---

# 21. End-of-Week Evaluation

After Day 7, the prototype should show a weekly summary.

## 21.1 Weekly Summary Includes

- total sales
- total profit/loss
- best-selling stock
- worst-selling stock
- best location
- weakest location
- highest satisfaction moment
- missed demand patterns
- stock lost to decline
- reduced stock sold
- reputation change
- staff pressure hint
- recommended next focus

## 21.2 Example Weekly Feedback

> Tomatoes and strawberries sold reliably across the week, especially where customers wanted cheap grow-your-own plants.

> Potted lilies made strong gift sales, but one customer appreciated being warned about cats.

> Busy Lizzies sold well from full, colourful displays but looked tired when left unwatered.

> Compost sold best when paired with tomatoes, strawberries, or terracotta pots.

> By the end of the week, keeping the display full while watering stock began to feel difficult. More display space or a helper may soon be useful.

---

# 22. Prototype Economy Targets

The economy should be tuned so that:

- a good player ends Day 7 with clear progress but not wealth
- an average player survives but feels constrained
- a poor player loses momentum but can recover
- overbuying hurts
- reducing stock is sometimes smart
- premium pricing works only in the right conditions
- normal pricing is usually safe
- bargain pricing clears stock but slows growth

## 22.1 Suggested Cash Outcomes

Starting cash: £80

End of Week Target Ranges:

### Strong Week

- cash: £130-£170
- reputation improved
- little dead stock
- player ready for small upgrade decision

### Average Week

- cash: £80-£120
- some reputation gain
- some reduced/dead stock
- player understands improvement opportunities

### Poor Week

- cash: £30-£80
- weak reputation
- several tired/unsold plants
- still recoverable

These values are placeholders and should be tuned.

---

# 23. Prototype Upgrades

Prototype 0.1 may include upgrades only as preview or end-of-week tease.

Do not allow a large upgrade tree yet.

Possible optional end-of-week upgrade choices:

1. Better Watering Can
2. Second Trestle Table
3. Wooden Crates
4. Clear Price Labels
5. Small Chalkboard Sign

If implemented, allow only one purchase near the end of the week.

However, it is acceptable for Prototype 0.1 to exclude upgrades and simply show them as locked future progression.

---

# 24. Staff in Prototype 0.1

Staff are excluded from active Prototype 0.1 play.

However, the prototype should create pressure that explains why staff will later matter.

## 24.1 Staff Should Be Felt But Not Used

By Day 7, the player may see hints such as:

> You managed alone this week, but busier pitches will be hard without help.

> A helper could water stock while you handle customer requests.

> Larger displays will need someone to keep gaps filled.

## 24.2 Staff Not Economically Valid Yet

The player should not be expected to hire staff within the first week.

Staff should become viable later, once:

- daily sales are higher
- display size expands
- stock volume increases
- customer pace increases
- reputation unlocks busier locations

---

# 25. Prototype UI Screens

Prototype 0.1 requires the following screens or panels.

## 25.1 Required

1. Title / Start Prototype
2. Location Selection
3. Wholesaler Website
4. Current Stock
5. Pricing Panel
6. Display Setup
7. Trading Day View
8. Special Request Panel
9. Care / Action Panel
10. End-of-Day Report
11. Weekly Summary
12. Developer Overlay

## 25.2 Optional

1. Reviews screen
2. Reputation screen
3. Upgrade preview screen
4. Stock archive / plant card screen

Prototype can combine screens where useful.

---

# 26. Prototype Success Criteria

Prototype 0.1 succeeds if:

- the player understands the loop within one or two days
- location choice affects stock planning
- cheap spring stock feels commercially plausible
- first wholesaler visit feels constrained but fair
- passive browsing sales feel readable
- special requests feel satisfying and not too frequent
- display fullness and stock quality visibly affect outcomes
- reduced stock is useful
- tight starting cash creates meaningful choices
- the player begins to feel future staff pressure by Day 7
- the player wants to play the next season/week

The prototype fails if:

- the best strategy is obvious and repetitive
- care actions dominate selling
- sales feel random
- the player ignores display
- the economy is either too punishing or meaningless
- all locations feel the same
- the wholesaler feels like a generic shop
- stock decline feels unfair
- special requests require knowledge the player has not been taught

---

# 27. Explicit Exclusions

Prototype 0.1 must not include:

- staff hiring
- full seasonal calendar
- full year progression
- rare plant collecting
- houseplant specialist systems
- propagation
- pests/disease
- detailed weather
- complex events
- large upgrade tree
- relationship system
- multiple wholesalers
- loans/debt
- detailed accounting
- permanent shop premises
- advanced plant safety database
- deep companion planting system

These may belong later, but not in the first vertical slice.

---

# 28. Research and Content Basis

The prototype starter stock is based on common UK spring retail patterns:

- spring bedding and instant colour
- summer bedding beginning to appear in late spring
- grow-your-own tomatoes and strawberries
- cheap herbs
- potted bulbs and lilies as seasonal/gift stock
- basic compost and pots as add-on sundries
- discount/supermarket style high-turnover plant ranges

The emphasis is not botanical completeness.

The emphasis is recognisable cheap spring stock that can plausibly sell from a small urban mobile stall.

---

# 29. Next Required Documents

After Prototype 0.1 Content Plan, the most useful next documents are:

## Document 8 — Wholesaler Interface Specification

Purpose:

Define the exact behaviour and feel of the simplified trade website.

Must include:

- listing format
- sold-out items
- batch condition
- daily stock refresh
- supplier notes
- filtering/sorting
- first-visit guided stock
- bargain logic

## Document 9 — Display and Merchandising Specification

Purpose:

Define display zones, furniture, colour harmony, display scoring, reduced section placement, and location-specific display bonuses.

## Document 10 — Economy, Pricing and Stock Condition Specification

Purpose:

Define exact pricing bands, starting cash, margins, stock degradation, reduced pricing, and day-by-day economy targets.

---

# 30. Final Prototype Definition

Prototype 0.1 is a seven-day UK urban spring trading slice.

The player starts with £80, an ugly van, a trestle table, no stock, no staff, and access to a constrained wholesaler website. Most stock is sold out on the first visit, forcing a strong opening choice: tomatoes, strawberries, busy lizzies, and potted lilies. Over seven days, the player buys cheap high-turnover spring plants and simple sundries, chooses between three urban/suburban trading locations, arranges a small display, sets prices through bands shown as real prices, handles passive browsing customers and occasional special requests, waters/tidies/reduces living stock, and receives clear daily feedback.

The prototype should end with the player understanding the core loop and beginning to feel the pressure that will eventually justify better tools, better displays, and staff.

The core question is:

> “Can I turn cheap living stock into cash, reputation, and a better plan for tomorrow?”
