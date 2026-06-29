# THE GARDEN STALL
## Document 10 — Economy, Pricing and Stock Condition Specification

**Working Title:** The Garden Stall  
**Document Type:** Economy / Pricing / Stock Condition / Cost Pressure Specification  
**Status:** Draft 001  
**Purpose:** Define the early economy, starting cash, operating costs, fuel/travel model, pitch fees, order fees, pricing bands, margins, reduced stock, stock condition, moisture, degradation, storage effects, and prototype economy targets.

---

# 1. Purpose of This Document

This document defines the money and condition-pressure systems for The Garden Stall.

The Garden Stall is cosy in tone, but it should not be frictionless.

The player is running a small side-hustle business using real labour and perishable living stock. The game should model financial pressure from the beginning.

The player should feel:

> “I need this stock to sell, and I need to make better decisions tomorrow.”

The economy should create pressure through:

- tight starting cash
- stock bought in bulk
- customers buying individual units
- order fees
- fuel costs
- pitch fees
- unsold stock tying up cash
- living stock condition decline
- reduced-price recovery
- different margins by plant type
- van/display/home storage choices
- location distance and trading opportunity trade-offs

The game should avoid heavy accounting, tax, loans, or survival simulation in Prototype 0.1.

---

# 2. Core Economic Principle

The Garden Stall economy is based on turnover.

The player makes money by buying common, cheap, high-turnover stock and selling it efficiently before it declines.

Profit should come from:

- buying sensible stock
- matching stock to locations
- setting fair prices
- keeping display attractive
- selling through trays
- reducing tired plants before they become unsellable
- controlling operating costs
- avoiding cash trapped in slow stock
- learning which plants deserve space and money

The early economy should be challenging but recoverable.

The player can make mistakes, but the prototype should not hard-fail them quickly.

---

# 3. Starting Cash

Prototype 0.1 starting cash:

> **£80**

This is the baseline value.

The amount is intentionally tight.

It should allow:

- one meaningful first wholesale order
- some cash left for fuel/pitch costs
- limited ability to recover from a poor first day
- strong pressure to sell stock rather than hoard it

The dev overlay should allow testing alternative starting cash values:

- £60 harsh test
- £80 baseline
- £100 forgiving test

But the design target is:

> £80 baseline.

---

# 4. No Personal Living Costs in Prototype

Prototype 0.1 should not include rent, food, household bills, debt, insurance, tax, or personal living costs.

The only active costs should be business operation costs:

- stock purchases
- fuel
- wholesale order fee
- pitch/stall fees

Reason:

The first prototype should test the retail stock loop, not survival accounting.

Later versions may explore broader business pressure, but Prototype 0.1 should remain focused.

---

# 5. Core Business Costs

Prototype 0.1 includes three operating cost categories.

## 5.1 Fuel

Fuel is paid daily based on the route travelled.

Daily route:

> Home → Wholesaler → Stall Location → Home

Fuel cost depends on distance.

Prototype fuel cost target:

> £5–£20 per day

Most starter days should be nearer the low end.

Fuel creates a light but meaningful location choice.

## 5.2 Wholesale Order Fee

A fee applies to small orders.

Prototype rule:

> Orders under £100 include a £5 handling/order fee.  
> Orders of £100 or more are fee-free.

This threshold is intentionally aspirational early.

The player may not hit it in the first week, but it establishes a future goal.

## 5.3 Pitch / Stall Fee

Some locations charge a pitch fee.

Prototype pitch fee range:

> £0–£20

Most starter pitch fees should be under £5.

Some locations are free but may have weaker footfall, weaker customer fit, or less prestige.

Pitch fees should make location choice feel commercial without overwhelming stock decisions.

---

# 6. No VAT / Sales Tax

Prototype 0.1 should not include VAT, sales tax, income tax, corporation tax, or any other tax modelling.

These would add accounting friction without improving the core loop.

The displayed economy should remain clear:

> Cash in, costs out, stock value at risk.

---

# 7. Fuel and Distance Model

The game should include a very simple schematic distance model.

It does not need real-world geography.

The player’s daily travel route is:

1. Home
2. Wholesaler
3. Chosen stall location
4. Home

The player always starts at Home and visits the wholesaler first to collect the previous evening’s order.

Then they choose the trading location.

Then they return Home after trading.

## 7.1 Schematic Map

Prototype 0.1 should include a simple schematic map showing:

- Home
- County Plant Wholesale
- Market Square
- Village Green
- Station Corner

Later maps may add:

- Farmers’ Market
- Office Courtyard
- Garden Event
- Suburban School Fair
- Car Boot Sale
- Specialist Plant Fair
- premium locations
- distant suppliers

The map does not need precise streets. It should communicate relative distance and travel cost.

## 7.2 Suggested Prototype Distances

Example schematic values:

| Route Segment | Distance Band | Fuel Cost |
|---|---:|---:|
| Home → County Plant Wholesale | Short | £3 |
| County Plant Wholesale → Market Square | Short | £2 |
| County Plant Wholesale → Village Green | Medium | £5 |
| County Plant Wholesale → Station Corner | Short | £3 |
| Market Square → Home | Short | £3 |
| Village Green → Home | Medium | £6 |
| Station Corner → Home | Short | £4 |

Example total daily fuel:

| Trading Location | Route | Fuel Cost |
|---|---|---:|
| Market Square | Home → WS → Market → Home | £8 |
| Village Green | Home → WS → Village → Home | £14 |
| Station Corner | Home → WS → Station → Home | £10 |

These are placeholders for testing.

Fuel target range:

- close/simple day: £5–£8
- normal starter day: £8–£12
- further/better day: £12–£20

## 7.3 Fuel and Travel Time

Prototype 0.1 should primarily use fuel as the cost signal.

Travel time should be noted as a future goal.

Later versions may model both:

- fuel cost
- reduced open-shop time from longer travel

For now, fuel is enough.

---

# 8. Pitch Fee Model

Pitch fees should vary by location.

Some locations are free.

Some locations charge a small amount.

A few better or more formal locations may charge more.

## 8.1 Prototype Pitch Fee Examples

| Location | Pitch Fee | Notes |
|---|---:|---|
| Market Square | £5 | Reliable, mixed, accessible |
| Village Green | £0–£4 | Community feel, outdoor gardeners, lower formal cost |
| Station Corner | £8 | Better passing trade, sharper gift/commuter opportunity |

Alternative values can be tested.

## 8.2 Fee Philosophy

Pitch fees should create trade-offs.

A higher fee may be worth paying if:

- footfall is stronger
- customer fit is better
- price tolerance is higher
- stock is well matched
- weather favours the pitch
- the player needs faster turnover

A free pitch should not automatically be best.

A paid pitch should not automatically be better.

---

# 9. Wholesale Order Fee

The wholesaler charges a small fee for orders below the threshold.

## 9.1 Prototype Rule

- Orders under £100: £5 fee
- Orders £100 or more: no fee

This is a long-term turnover goal rather than an immediate Day 1 target.

## 9.2 Player Feedback

Checkout should show:

> Order total: £63  
> Handling fee: £5  
> Fee-free threshold: £100  
> Add £37 more to avoid the fee.

If order is fee-free:

> Order total: £104  
> Handling fee: £0  
> Fee-free order achieved.

## 9.3 Achievement

First fee-free order should unlock an achievement or milestone.

Possible achievement:

> **Proper Trade Order**  
> Place a wholesale order large enough to avoid the small-order handling fee.

This marks the player’s transition from very small buying to stronger turnover.

---

# 10. Pricing Model

Prototype 0.1 uses price bands shown as exact prices.

The player does not type exact prices manually in the prototype.

## 10.1 Pricing Bands

Each stock line can be priced as:

- Bargain
- Normal
- Premium
- Reduced

The UI should show exact displayed prices.

Example:

**Tomato Plant**

- Bargain: £2.50
- Normal: £3.50
- Premium: £4.50
- Reduced: £1.75

The player chooses the band.

Customers see the price.

## 10.2 Later Pricing

Later builds may allow:

- exact manual prices
- multi-buy offers
- “3 for £9”
- category offers
- clearance bundles
- loyalty discounts
- location-specific pricing
- staff-suggested pricing

Do not include these in Prototype 0.1.

---

# 11. Price Effects

Pricing affects:

- sale chance
- customer satisfaction
- perceived value
- reputation, if repeated
- sell-through speed
- reduced stock clearance
- premium opportunity

## 11.1 Bargain

Effects:

- higher sale chance
- lower margin
- useful for fast turnover
- attracts bargain hunters
- may lower perceived premium value if overused

## 11.2 Normal

Effects:

- safest default
- fair satisfaction
- reliable sales if stock/location/display match
- good baseline for tuning

## 11.3 Premium

Effects:

- lower sale chance unless justified
- higher margin if sold
- requires strong display, condition, demand, or location
- may annoy customers if used on common/tired stock

## 11.4 Reduced

Effects:

- significantly higher chance to clear tired/past-peak stock
- lower margin or possible small loss
- protects reputation by being honest
- attracts bargain hunters
- reduces display/reputation penalty when placed correctly

## 11.5 Repeated Poor Pricing

One overpriced item should not ruin reputation.

Repeated poor pricing may cause:

- lower customer satisfaction
- reviews mentioning poor value
- reduced repeat interest
- lower conversion at that location
- weaker trust in special recommendations

The game should teach:

> Price matters, but value is contextual.

---

# 12. Reduced Pricing

Prototype rule:

> Reduced price is approximately 50% of Normal price.

This is readable and familiar.

Examples:

| Item | Normal | Reduced |
|---|---:|---:|
| Busy Lizzie | £2.00 | £1.00 |
| Tomato Plant | £3.50 | £1.75 |
| Strawberry Plant | £4.00 | £2.00 |
| Potted Lily | £6.50 | £3.25 |

Later builds may add:

- light reduction
- deep clearance
- manager’s special
- multi-buy clearance
- end-of-day discounts

Prototype should use a simple half-price model.

---

# 13. Margin Philosophy

Margins vary strongly by item type.

The game should not use one universal markup.

## 13.1 Low-Margin Items

Examples:

- compost
- basic terracotta pots
- cheap sundries
- some common bedding

Characteristics:

- useful add-ons
- non-perishable or slower risk
- low profit per unit
- support larger sales
- tie up space and cash

## 13.2 Medium-Margin Items

Examples:

- tomatoes
- strawberries
- common bedding
- herbs
- pelargoniums
- petunias

Characteristics:

- everyday trade stock
- reliable turnover
- some care/degradation risk
- main early business engine

## 13.3 High-Margin Items

Examples:

- potted lilies
- strong gift stock
- near-peak high-impact plants
- later specialist stock

Characteristics:

- strong profit if sold
- higher condition/peak risk
- may require better location/display
- can become poor value quickly if missed

## 13.4 Difficult Stock

Some stock has higher margin because it is harder to handle.

Difficulty may come from:

- short selling window
- fragility
- watering need
- seasonality
- display requirements
- customer specificity
- trend volatility
- storage problems

The player should learn:

> High margin often means higher risk.

---

# 14. Prototype Price Examples

All values are placeholders for tuning.

## 14.1 Tomato Plants

Batch:

- Tray of 15 medium plants

Wholesale:

- £30

Cost per unit:

- £2.00

Prices:

- Bargain: £2.50
- Normal: £3.50
- Premium: £4.50
- Reduced: £1.75

Role:

- reliable medium-margin grow-your-own stock

## 14.2 Strawberry Plants

Batch:

- Tray of 15 medium plants

Wholesale:

- £37.50

Cost per unit:

- £2.50

Prices:

- Bargain: £3.00
- Normal: £4.00
- Premium: £5.00
- Reduced: £2.00

Role:

- reliable family/patio stock

## 14.3 Busy Lizzies

Batch:

- Tray of 24 small plants

Wholesale:

- £24

Cost per unit:

- £1.00

Prices:

- Bargain: £1.50
- Normal: £2.00
- Premium: £2.50
- Reduced: £1.00

Role:

- cheap bright bedding, fast turnover

## 14.4 Potted Lilies

Batch:

- Group of 4 feature pots

Wholesale:

- £16

Cost per unit:

- £4.00

Prices:

- Bargain: £5.00
- Normal: £6.50
- Premium: £8.00
- Reduced: £3.25

Role:

- high-impact, high-margin, short-window gift stock

## 14.5 Compost Bags

Batch:

- 3 bags

Wholesale:

- £9

Cost per unit:

- £3.00

Prices:

- Bargain: £4.00
- Normal: £5.00
- Premium: £6.00
- Reduced: not normally applicable

Role:

- low-margin practical add-on, non-perishable

## 14.6 Machine-Made Terracotta Pots

Batch:

- pack of 6

Wholesale:

- £9

Cost per unit:

- £1.50

Prices:

- Bargain: £2.00
- Normal: £3.00
- Premium: £4.00
- Reduced: not normally applicable

Role:

- low/medium-margin add-on, non-perishable

---

# 15. Condition Model

Plant condition is separate from moisture and special flags.

Core plant condition describes the plant’s saleable quality.

## 15.1 Plant Condition States

- Excellent
- Good
- Tired
- Past Peak
- Unsellable

## 15.2 Reduced Is Not a Condition

Reduced is a pricing/display status, not biological condition.

A plant can be:

- Good + Reduced
- Tired + Reduced
- Past Peak + Reduced

Reduced means the player has honestly marked the plant down.

## 15.3 Condition Meaning

### Excellent

Fresh, strong, attractive stock.

Best for premium pricing and gift/display sales.

### Good

Normal healthy saleable stock.

Best for normal pricing.

### Tired

Still sellable, but visibly weaker.

May need watering, tidying, deadheading, or reduction.

### Past Peak

Still possibly sellable if discounted or matched to practical/bargain customers.

Poor for gifts and premium display.

### Unsellable

Should be discarded/composted.

Cannot reasonably be sold without severe reputation damage.

---

# 16. Moisture Model

Moisture is tracked separately from plant condition.

A plant can be in good condition but becoming dry.

A plant can also be tired but properly watered.

## 16.1 Moisture States

- Waterlogged
- Watered
- Damp
- Dry
- Bone Dry

## 16.2 Ideal Moisture

For most plants:

> Watered is peak.

Damp is acceptable but a warning zone.

Dry is damaging for most plants.

Bone Dry is serious damage for almost all plants.

Waterlogged can damage many plants, especially if repeated.

## 16.3 Moisture Meanings

### Watered

Best state for most stock.

Improves appearance and prevents dry stress.

### Damp

Acceptable.

The plant is not yet suffering, but may need attention soon.

### Dry

Harmful for most plants.

May add a Dry flag or contribute to condition decline if not corrected.

### Bone Dry

Serious stress.

May quickly cause condition loss.

Very bad for herbs, bedding, and thirsty plants.

### Waterlogged

Too wet.

Most plants can tolerate a short mistake, but consecutive waterlogged states may cause damage.

Some plants are more vulnerable than others.

---

# 17. Moisture Versus Dry Flag

Moisture state and Dry flag are related but not identical.

A pot may be Dry without the plant yet visibly showing a Dry flag.

The Dry flag appears when dryness has begun to affect appearance or condition.

Example:

- Good condition + Dry moisture: warning
- Good condition + Dry flag: visible stress
- Tired condition + Bone Dry: serious decline risk

This allows the game to warn before damage becomes visible.

---

# 18. Condition Flags

Flags describe additional traits or temporary states.

Possible flags:

- Dry
- Leggy
- In Bud
- Flowering
- Past Flower
- Mixed Quality
- Reduced
- Fragile
- Recently Watered
- Recently Tidied
- Recently Deadheaded
- Needs Deadheading
- Short Window
- Waterlogged Risk
- Pet Warning, where needed

Flags should explain why stock behaves differently without bloating the main condition scale.

Example:

> Potted Lily — Good / Flowering / Short Window  
> Busy Lizzies — Good / Dry  
> Petunias — Tired / Needs Deadheading  
> Basil — Good / Fragile

---

# 19. Stock Age

Each batch tracks age in days.

This age is mostly hidden.

The player sees age through readable labels such as:

- Fresh batch
- Yesterday’s stock
- Older stock
- Near peak
- Past peak soon
- Needs moving
- Clearance risk

The game uses hidden age to drive:

- degradation
- flowering peak
- sell-by pressure
- supplier batch notes
- reduced suggestions
- weekly reports

Do not show raw “age: 3 days” in the normal UI unless later difficulty settings support it.

---

# 20. Degradation Overview

Stock degradation should be noticeable and challenging.

Prototype target:

> Meaningful, but not brutal.

The player should need to care about watering, display, and selling through stock.

But a single missed action should not instantly destroy good stock unless the plant is inherently fragile.

## 20.1 Degradation Drivers

Condition may decline due to:

- age
- dryness
- bone dryness
- repeated waterlogging
- being displayed
- being transported
- being stored in van
- being stored at home
- being past flowering peak
- poor weather exposure
- lack of deadheading
- poor handling/consolidation, later
- special supplier batch quality

---

# 21. Storage-Based Degradation

Stock degrades differently depending on where it is.

## 21.1 Displayed Stock

Highest degradation pressure.

Reasons:

- exposed to sun/wind/weather
- customers handle or disturb it
- it dries faster
- flowers fade visibly
- display gaps make it look worse

Displayed stock needs the most care.

## 21.2 Floor Stock

Displayed, but lower presentation value.

Floor stock may be:

- more exposed
- more likely to look rough
- less visually protected
- good for lilies/sundries
- poor for delicate small plants

## 21.3 Van Stock

Moderate degradation.

Reasons:

- loaded and transported
- may be dark/warm/cramped
- available for restocking
- less exposed than display

Van stock should not be safe forever.

## 21.4 Home Stock

Light degradation.

Assumption:

> Stock kept at home arrives back the next morning watered, but older.

This means home stock is safer than van/display stock, but not frozen in time.

Home storage degradation is mostly age-based in Prototype 0.1.

Future home upgrades can improve this.

---

# 22. Watering Rules

Watering has two effects.

## 22.1 Immediate Effect

Watering changes moisture toward Watered.

It prevents imminent dryness damage.

In Prototype 0.1, watering should not instantly restore biological condition.

A Tired plant does not immediately become Good just because it was watered.

## 22.2 Recovery Over Time

If a plant is kept at a good moisture level above Dry for a day, it may recover one condition level, within limits.

Example:

- Tired → Good, if recoverable and kept watered
- Good stays Good
- Past Peak does not become Good simply through watering
- Flowering-window decline cannot be undone by water
- badly damaged or unsellable stock cannot be restored by water

This creates a difference between quick action and sustained care.

## 22.3 Plant-Specific Recovery

Some plants recover better from dryness than others.

Examples:

- basil may visibly perk up from timely watering
- busy lizzies recover if caught early
- lilies past flowering peak do not become fresh again
- compost and pots do not use moisture
- drought-tolerant plants care less about Dry

---

# 23. Tidying and Deadheading Rules

Tidying and deadheading improve perceived display quality more than biological condition.

## 23.1 Tidying

Effects:

- improves tray neatness
- improves display score
- reduces gappy appearance
- improves perceived stock quality
- may improve customer confidence

Does not:

- restore age
- undo past peak
- remove serious condition damage
- make dry plants watered

## 23.2 Deadheading

Effects:

- removes spent flowers
- improves visible display
- reduces “Needs Deadheading” penalty
- may slow further appearance decline
- may support continued sale of older flowering stock

Does not:

- reset flowering window
- make past-peak stock fresh again
- fully restore condition

This distinction is important:

> Tidying makes stock look cared for. It does not make old stock new.

---

# 24. Reduced Stock

Reduced stock is the preferred recovery path for tired stock.

The game should encourage reduction before discard.

The optimal player should usually reduce stock rather than throw it away.

## 24.1 When to Reduce

Reduce stock when:

- it is Tired and unlikely to sell at normal price
- it is Past Peak
- it has a short remaining sale window
- it is visually hurting the main display
- it is tying up space/cash
- it is useful to bargain hunters
- it is still honest to sell

## 24.2 Reduced Effects

Reduced stock:

- sells faster to bargain hunters
- can recover some value
- protects reputation through honest pricing
- lowers margin
- is less attractive in main display
- works best in a dedicated reduced area

## 24.3 Reduction as Skill

A strong player reduces early enough to recover value.

A weak player waits until stock becomes unsellable.

This should be part of the challenge.

---

# 25. Discarding Stock

The player can discard/compost unsellable stock.

Prototype rule:

> Discarding has no cash cost.

The punishment is already:

- lost wholesale cost
- lost potential revenue
- wasted space/time
- possible bad display/reputation if it was shown too long

Discarding should be a cleanup action, not another financial burden.

---

# 26. Unsold Stock at Day End

Unsold stock returns automatically to home stock at the end of the day.

The next morning, the player’s van selection is preloaded with everything that was unsold the previous night.

This means:

- the game remembers yesterday’s loadout
- the player can quickly continue if desired
- the player can adjust the van loadout after seeing weather/conditions
- unsold stock persists
- home storage remains the central inventory pool

Prototype rule:

> Unsold stock returns home automatically, and yesterday’s unsold loadout is preselected for tomorrow unless changed.

---

# 27. Mixed Stock Cost Tracking

When compatible trays are consolidated or mixed, purchase cost should be tracked by average unit cost.

Example:

- 10 petunias at £1.00 cost each
- 5 petunias at £1.20 cost each

Average cost after consolidation:

> £1.07 per unit

This keeps margin reporting usable without requiring exact batch-by-batch tracking in the UI.

For mixed trays containing different plant types, the system should track each plant type internally, but display a simplified average margin or mixed-tray summary.

---

# 28. Cash-Poor State

There should be no instant game over in Prototype 0.1.

If the player runs out of cash:

- they cannot place new orders
- they must sell existing stock
- they may choose free/cheap locations
- they may reduce old stock
- they may discard unsellable stock
- they may use dev overlay in testing

This is a soft fail state.

The game should create tension without ending abruptly.

Possible message:

> You do not have enough cash to order new stock. Sell what you have, clear reduced plants, or choose a cheaper pitch tomorrow.

---

# 29. Weekly Economy Target

The early business should be able to pay meaningfully if played well.

The game is framed as a side hustle, but it uses full-time hours.

Even with a modest setup, a strong player should be moving toward meaningful weekly earnings.

Prototype target:

> A strong early week should be capable of around £300 gross working profit before later-life/business overheads are modelled.

Because Prototype 0.1 lasts only seven trading days and begins with very small cash, this may be represented as:

- cash on hand
- stock value still owned
- week profit estimate
- growth trajectory

## 29.1 Recommended Week-End Categories

Starting cash:

> £80

End-of-week evaluation should consider cash plus remaining saleable stock.

### Strong Week

- clear cash growth
- very little unsellable stock
- high sell-through
- good use of reduced stock
- location choices matched stock
- trajectory suggests around £300/week potential once scaled slightly

### Average Week

- survived financially
- some cash growth or stable cash
- useful remaining stock
- some reduced stock
- some missed demand
- business viable but not yet strongly paying

### Poor Week

- cash-poor
- too much tied-up stock
- reduced stock handled late
- some unsellable stock
- still recoverable through existing stock sales

## 29.2 Suggested Numeric Targets

Because the starting setup is very small, do not judge only cash.

Use:

> Cash + estimated saleable stock value - outstanding expected costs

Suggested prototype week-end signals:

| Performance | Cash on Hand | Saleable Stock Value | Interpretation |
|---|---:|---:|---|
| Strong | £140–£220 | £80–£160 | Strong side-hustle trajectory |
| Average | £70–£140 | £40–£120 | Viable but constrained |
| Poor | £0–£70 | £0–£100 | Recoverable but weak |

These are tuning values.

The key target is not exact money yet. It is whether the player can see how turnover could become a £300/week small business with more capital, stock, display capacity, and staff/tools.

---

# 30. Wastage Target

Optimal play should keep wastage low.

The game should prefer:

> reduce before discard.

## 30.1 Good Play

Good play results in:

- few or no discarded plants
- some reduced sales
- little unsellable stock
- good timing of reductions
- strong sell-through

## 30.2 Average Play

Average play may include:

- several reduced plants
- one or two unsellable losses
- gappy trays
- a few missed watering/deadheading moments

## 30.3 Poor Play

Poor play may include:

- too much old stock
- delayed reductions
- dry plants
- unsellable stock
- low cash and poor display

Wastage should exist, but the player should understand why it happened.

---

# 31. Stock Value Reporting

The end-of-day and weekly reports should distinguish:

- cash
- stock bought
- stock sold
- stock still owned
- reduced stock
- unsellable stock
- estimated saleable stock value
- realised profit
- potential lost value

This prevents the player from misreading a cash-poor day as failure if they still own strong saleable stock.

Example:

> Cash: £62  
> Saleable stock value: approximately £84  
> Reduced stock value: approximately £16  
> Unsellable losses today: £4 wholesale cost

This supports the side-hustle business fantasy.

---

# 32. Daily Report Economy Fields

The day summary should show:

- sales revenue
- fuel cost
- pitch fee
- stock sold by type
- reduced stock sold
- unsold stock
- stock condition changes
- discarded/unsellable stock
- estimated stock value remaining
- cash available before evening order
- suggested restock notes
- evening order cost and fee after ordering

Example:

> Sales: £88  
> Fuel: £10  
> Pitch fee: £5  
> Day operating profit before new stock: £73  
> Reduced stock sold: £9  
> Stock still owned: approx. £64 saleable value  
> Unsellable loss: £0  
> Cash before order: £102

---

# 33. Customer Price Tolerance

Customer willingness to buy depends on price, but also context.

Factors:

- customer archetype
- plant desirability
- location
- display quality
- plant condition
- price band
- reputation
- special request urgency
- gift suitability
- stock scarcity
- reduced honesty

Examples:

## Bargain Hunter

- likes Reduced/Bargain
- dislikes Premium
- accepts Tired if honestly reduced

## Gift Buyer

- accepts Premium if display and condition are strong
- dislikes Tired/Reduced
- may ignore bargain if it feels unsuitable as gift

## Traditional Gardener

- likes fair Normal pricing
- may buy multiples of familiar bedding
- dislikes overpriced common plants

## Flat / Balcony Grower

- pays more for compact, suitable, clear stock
- values pot/compost pairing

## Herb / Kitchen Buyer

- responds to useful add-ons
- dislikes poor herb condition
- may buy multiple herbs

Price tolerance should not be a simple global percentage.

---

# 34. Stock Condition and Sale Chance

Condition affects sale chance.

General rule:

| Condition | Sale Effect |
|---|---|
| Excellent | strong boost |
| Good | normal |
| Tired | penalty unless reduced or practical customer |
| Past Peak | strong penalty unless bargain/customer fit |
| Unsellable | should not sell |

Moisture and flags modify this.

Examples:

- Good + Dry: slight warning/penalty
- Tired + Dry: stronger penalty
- Good + Flowering: gift/display boost
- Past Peak + Reduced: bargain path
- Leggy + Premium: poor value signal

---

# 35. Prototype Degradation Examples

## 35.1 Basil

Traits:

- fragile
- thirsty
- strong kitchen appeal
- recovers if caught early

Rules:

- Dry quickly
- Bone Dry can drop condition rapidly
- Watering prevents decline
- kept watered for a day may recover Tired → Good
- poor for long storage

## 35.2 Busy Lizzies

Traits:

- colourful bedding
- thirsty
- good cheap turnover

Rules:

- Display dries faster in sun
- Dry causes attractiveness penalty
- watering prevents decline
- deadheading/tidying helps display

## 35.3 Potted Lilies

Traits:

- high-impact
- high-margin
- short window
- giftable
- safety warning context

Rules:

- condition tied heavily to flowering stage
- Watering prevents stress but does not reset peak
- Past Peak should be reduced quickly
- strong gift penalty if tired/past peak

## 35.4 Tomatoes

Traits:

- grow-your-own
- medium risk
- good urban/village demand

Rules:

- tolerates slight aging
- Dry hurts display and beginner confidence
- pairs with compost/pots
- Good/Normal pricing sells reliably in right locations

## 35.5 Compost

Traits:

- non-perishable
- low margin
- add-on
- bulky

Rules:

- no biological degradation
- occupies space
- sells best with edible plants/pots
- poor display attractiveness

---

# 36. Developer Overlay Requirements

The developer overlay should include economy and condition controls.

Required controls:

- set starting cash
- add cash
- remove cash
- set fuel cost
- set pitch fee
- set order fee
- set fee-free threshold
- toggle order fee
- set price band
- force sale
- force no-sale
- reveal customer price tolerance
- reveal sale score
- reveal margin calculation
- reveal average unit cost
- reveal remaining stock value
- set plant condition
- set moisture state
- add/remove flags
- set stock age
- toggle degradation
- force overnight degradation
- force watering recovery
- set home/van/display degradation multipliers
- simulate trading day
- simulate full week
- export economy log
- export wastage report
- show route/fuel calculation
- override fuel distance band

These controls are important because the economy will need heavy tuning.

---

# 37. Prototype Required Features

Prototype 0.1 should include:

- £80 starting cash
- stock bought in trays/batches
- customers buying individual units
- fuel cost based on schematic route
- simple schematic map
- order fee under £100
- pitch fees from £0–£20
- price bands shown as exact prices
- reduced as half normal price
- no VAT/tax
- no personal costs
- no hard game over
- cash-poor soft fail state
- persistent unsold stock
- stock age tracking hidden from player
- condition states
- moisture states
- condition flags
- storage-based degradation
- watering as prevention plus next-day limited recovery
- tidying/deadheading as perceived quality/display improvements
- automatic return of unsold stock to home
- preloaded next-day van selection from previous unsold stock
- average unit cost for consolidated stock
- daily economy report
- weekly economy report
- developer overlay economy controls

---

# 38. Prototype Exclusions

Prototype 0.1 should not include:

- VAT
- tax
- loans
- debt
- personal living costs
- insurance
- rent
- vehicle maintenance
- staff wages
- exact manual pricing
- multi-buy offers
- advanced price history
- supplier credit accounts
- spoilage insurance
- refund/returns system
- complex fuel simulation
- real map routing
- deep weather economy
- detailed greenhouse/home facility upgrades
- composting economy
- propagation economy

These can be considered later if needed.

---

# 39. Economy Success Criteria

The economy succeeds if:

- starting cash feels tight
- stock choices matter
- fuel and pitch fees influence location choice
- the player understands why they made or lost money
- reduced stock is useful and often optimal
- discarding stock feels like a failure but not a catastrophe
- lilies feel high-margin but time-sensitive
- sundries feel low-margin but useful
- common bedding feels like core turnover
- cash-poor play is recoverable
- week-end results point toward meaningful side-hustle earnings
- the player wants to improve turnover next week

The economy fails if:

- money is too comfortable
- all stock has similar margin
- fees feel arbitrary
- fuel costs dominate stock decisions
- stock degradation feels unfair
- reduced stock is pointless
- discard is more attractive than reduction
- price bands do not matter
- daily report does not explain outcomes
- weekly results do not feel connected to decisions

---

# 40. Recommended Next Document

The next document should be:

## Document 11 — Staff Pressure and Progression Specification

Reason:

Documents 7–10 now define the prototype loop, wholesaler, display labour, and economy pressure. Staff should not be active in Prototype 0.1, but the game should create pressure that explains why staff will matter later.

Document 11 should define:

- when staff become available
- what pressure staff relieve
- staff roles
- staff learning
- staff wages
- staff morale
- why staff may leave
- how staff interact with watering, restocking, customers, and display
- why hiring too early may be economically invalid
- how Day 7 of Prototype 0.1 hints at future staff need

Alternative next document:

## Document 11 — Prototype 0.1 Build Brief

If implementation is approaching, a build brief may come before the staff document.

---

# 41. Final Economy Definition

The Garden Stall economy is a tight, turnover-driven small-trader economy.

The player starts with £80, buys stock in bulk, sells individual plants, pays fuel based on a simple Home → Wholesaler → Stall → Home route, pays occasional pitch fees, and pays a small order fee for wholesale orders under £100. Stock persists if unsold, ages across days, and must be reduced before it becomes worthless. Watering, tidying, deadheading, storage, display exposure, and location choices all affect how much value the player can recover from living stock.

The economy should be clear enough to understand, but sharp enough to make the player care.

The core question is:

> “Can I keep enough stock moving, in good enough condition, at good enough margins, to turn rough little trading days into a real weekly income?”
