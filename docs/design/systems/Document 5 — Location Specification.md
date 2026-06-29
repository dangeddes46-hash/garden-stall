# THE GARDEN STALL

## Document 5 — Location Specification

**Working Title:** The Garden Stall
**Document Type:** Location System / Trading Site Design
**Status:** Draft 001
**Purpose:** Define how trading locations shape customer mix, plant demand, footfall, stall fees, display expectations, price tolerance, special requests, and progression.

---

# 1. Purpose of This Document

Locations are one of the main strategic systems in The Garden Stall.

The player does not simply choose a pretty backdrop. They choose where to trade, and that choice should shape the entire day.

A location determines:

* who visits
* how many customers arrive
* what customers want
* how much they can spend
* how patient they are
* what displays attract them
* what plants sell well
* what plants are ignored
* what special requests are likely
* how much the stall costs to operate there
* how reputation grows in that area

The player should learn to think:

> “This stock is not good or bad in isolation. It is good or bad for tomorrow’s location.”

---

# 2. Core Principle

Each location should create a distinct retail puzzle.

A location is defined by the relationship between:

* customer profile
* plant demand
* budget
* display expectations
* footfall
* stall fee
* pace
* risk
* reward

The same van, plants, prices, and display may perform differently in different locations.

Example:

A tray of peace lilies may sell well at the Station Corner because commuters and flat-dwellers want tidy indoor gifts. The same tray may perform poorly at the Village Green if most shoppers are looking for bedding plants, pollinator perennials, and outdoor pots.

A lavender display may be excellent at the Village Green, decent at the Market Square, and largely ignored at the Station Corner unless gift buyers are present.

---

# 3. Location Data Structure

Each location should be defined as a structured content entry.

Every location should contain the following fields:

1. Location ID
2. Display Name
3. Short Description
4. Unlock Status
5. Stall Fee
6. Footfall
7. Customer Archetype Weights
8. Demand Tags
9. Price Tolerance
10. Pace / Patience Profile
11. Display Expectations
12. Display Bonuses
13. Display Penalties
14. Seasonal Modifiers
15. Weather / Exposure Modifiers
16. Special Request Profile
17. Reputation Behaviour
18. Upgrade / Vehicle Requirements
19. Event Hooks
20. Feedback Lines

---

# 4. Location Schema

## 4.1 Identity Fields

**Location ID**
Stable internal identifier.

Example:

`market_square`

**Display Name**
Player-facing location name.

Example:

`Market Square`

**Short Description**
One or two sentences describing the trading feel.

Example:

> A reliable mixed trading spot with steady footfall, casual browsers, gift buyers, and practical shoppers. A good place to learn what sells.

**Visual Brief**
Optional description for artists/interface.

Example:

> Cobbled town square, market stalls, benches, hanging baskets, buskers, passing shoppers, council planters, morning bustle.

---

## 4.2 Unlock Fields

**Unlock Status**

Values:

* starting
* early unlock
* mid-game unlock
* late-game unlock
* event-only
* seasonal-only

**Unlock Requirement**

Examples:

* available from start
* reach 3-star local reputation
* complete 5 successful gift requests
* own upgraded display furniture
* pay seasonal pitch deposit
* receive invitation after strong reviews

**Lock Reason Text**

Player-facing explanation before unlock.

Example:

> The Garden Open Day committee wants to see a stronger reputation before offering you a pitch.

---

## 4.3 Economic Fields

**Stall Fee**

Values may be:

* free
* low
* medium
* high
* premium
* event fee

**Expected Revenue Potential**

Values:

* low
* steady
* good
* high
* volatile

**Risk Level**

Values:

* low
* medium
* high

**Why Risk Exists**

Examples:

* high stall fee
* demanding customers
* narrow demand
* weather exposure
* low patience
* specialist expectations
* stock must be very fresh

---

## 4.4 Footfall Fields

**Base Footfall**

Values:

* low
* medium
* high
* very high

**Footfall Type**

Values:

* slow browsers
* quick passers-by
* purposeful shoppers
* event crowd
* regular locals
* mixed public

**Peak Time**

Optional.

Examples:

* morning
* lunchtime
* after work
* weekend afternoon
* all day

**Pace**

Values:

* relaxed
* normal
* brisk
* hectic

Pace affects how much time the player has to handle maintenance or special requests during trading.

---

## 4.5 Customer Archetype Weights

Each location defines which customer types are likely to appear.

Use simple weighting values:

* none
* low
* medium
* high
* very high

Example:

Market Square:

* New Gardener: medium
* Gift Buyer: medium
* Traditional Gardener: medium
* Bargain Hunter: medium
* Herb / Kitchen Buyer: medium
* Flat Dweller: low
* Busy Professional: low
* Pollinator Gardener: low/medium

These weights feed passive browsing and special request generation.

---

## 4.6 Demand Tags

Each location should have plant demand tags.

These are the plant/customer tags more likely to sell there.

Example demand tags:

* gift
* houseplant
* herb
* kitchen-use
* bedding
* cheerful
* pollinator-friendly
* cottage-style
* low-maintenance
* office-desk
* balcony
* front-door
* container-suitable
* reduced-friendly
* modern-style
* nostalgic

Demand tags should not guarantee sales. They should increase the chance that matching stock performs well.

---

## 4.7 Price Tolerance

Each location should define how customers respond to price.

**Average Price Tolerance**

Values:

* low
* medium
* high

**Premium Acceptance**

Values:

* poor
* moderate
* good
* strong

**Bargain Sensitivity**

Values:

* low
* medium
* high

Examples:

Station Corner may have moderate/high premium acceptance for tidy gifts and office plants, but low patience.

Farmers’ Market may have lower premium tolerance but strong loyalty if stock is practical and fair.

Garden Open Day may support higher prices for specialist or high-quality plants, but customers judge quality carefully.

---

## 4.8 Display Expectations

Locations should affect how display quality is judged.

**Display Standard**

Values:

* forgiving
* normal
* high
* specialist

**Preferred Display Styles**

Examples:

* rustic
* colourful
* modern
* practical
* gift-focused
* wildlife-themed
* traditional
* seasonal

**Display Bonuses**

Examples:

* rustic wooden crates improve herb/wildlife sales
* clean tiered shelves improve houseplant sales
* colour-themed front table improves gift sales
* pollinator display improves wildlife customer interest
* reduced basket performs well with bargain-heavy location

**Display Penalties**

Examples:

* messy reduced stock hurts gift locations
* empty slots reduce high-footfall browsing
* tired plants strongly hurt premium/event locations
* overly modern display may underperform at traditional village site

---

## 4.9 Weather / Exposure Fields

Locations may have different exposure.

**Exposure Type**

Values:

* sheltered
* sunny
* windy
* shaded
* exposed
* indoor/covered
* mixed

**Exposure Effects**

Examples:

* sunny location increases appeal of outdoor/summer stock
* sunny location increases degradation for thirsty plants
* shaded location protects houseplants and foliage
* windy location penalises tall unstable displays
* exposed location makes awnings valuable
* covered market protects delicate stock

Weather should not dominate Prototype 0.1, but location exposure can create simple stock/display decisions.

---

## 4.10 Special Request Profile

Each location should affect which special requests appear.

Fields:

**Special Request Rate**

Values:

* low
* medium
* high

**Common Request Categories**

Examples:

* gift
* suitability
* identification
* companion pot
* budget
* correction
* safety
* style

**Request Difficulty**

Values:

* easy
* normal
* mixed
* specialist

Example:

Station Corner:

* high gift requests
* indoor suitability requests
* low-patience budget requests
* lower identification requests

Village Green:

* traditional plant identification
* companion pots
* outdoor suitability
* pollinator requests

Garden Open Day:

* specialist requests
* plant identification
* style matching
* advanced companion planting

---

## 4.11 Reputation Behaviour

Each location should have its own local reputation value or profile.

Fields:

**Local Reputation**

The player’s standing at this location.

**Reputation Gain Speed**

Values:

* slow
* normal
* fast

**Review Influence**

Values:

* low
* medium
* high

**Word-of-Mouth Spread**

How much success at this location affects other locations.

Values:

* local-only
* nearby
* broad

Example:

A strong day at the Village Green may improve reputation with traditional gardeners and unlock Garden Open Day invitations.

A strong day at Station Corner may improve profile with office workers and flat-dwellers.

---

# 5. Location Selection Interface

Before a trading day, the player should choose a location from a clear selection screen.

Each location card should show enough information for planning.

Recommended location card fields:

* location name
* short description
* stall fee
* expected footfall
* likely customers
* demand hints
* display hint
* risk level
* weather/exposure hint
* local reputation
* special event notes, if any

Example:

**Village Green**

* Stall fee: Low
* Footfall: Medium
* Likely customers: traditional gardeners, new gardeners, pollinator gardeners
* Demand hints: bedding, cottage flowers, pollinator plants, front-door pots
* Display hint: colourful, tidy, seasonal displays do well
* Risk: Low/medium
* Local reputation: 2 stars

The player should not see exact formulas, but should have enough information to make an informed stock choice.

---

# 6. Starter Location Set

Prototype 0.1 should include three starter locations:

1. Market Square
2. Village Green
3. Station Corner

These three create clear contrast:

* Market Square: balanced mixed trade
* Village Green: outdoor/traditional/garden-focused trade
* Station Corner: fast urban indoor/gift trade

Together they test whether stock, display, and customer mix meaningfully change by location.

---

# 7. Prototype Location 1 — Market Square

## 7.1 Identity

**Location ID:** `market_square`

**Display Name:** Market Square

**Unlock Status:** Starting location

**Short Description:**
A reliable mixed trading spot in the middle of town. Casual shoppers, practical buyers, bargain hunters, and gift customers pass through all day.

**Visual Brief:**
Town square with mixed stalls, benches, passing shoppers, council planters, bus stop nearby, stone paving, morning market bustle.

---

## 7.2 Economic Profile

**Stall Fee:** Low
**Expected Revenue Potential:** Steady
**Risk Level:** Low
**Why Risk Exists:** Mixed demand can be hard to read, but footfall is forgiving.

Market Square is the safest starter location. It should rarely produce a disastrous day unless the player stocks very poorly or prices badly.

---

## 7.3 Footfall Profile

**Base Footfall:** Medium
**Footfall Type:** Mixed public
**Peak Time:** Late morning / lunchtime
**Pace:** Normal

There is enough time for a few care/display actions during quiet moments.

---

## 7.4 Customer Archetype Weights

* New Gardener: medium
* Gift Buyer: medium
* Traditional Gardener: medium
* Bargain Hunter: medium
* Herb / Kitchen Buyer: medium
* Flat Dweller: low/medium
* Busy Professional: low
* Pollinator Gardener: low/medium

Market Square should feel broad and slightly unpredictable.

---

## 7.5 Demand Tags

Strong:

* gift
* cheerful
* herb
* kitchen-use
* bedding
* container-suitable
* beginner-friendly
* impulse-buy

Moderate:

* houseplant
* pollinator-friendly
* front-door
* low-maintenance
* reduced-friendly
* cottage-style

Weak:

* specialist
* expensive rare stock
* advanced companion planting

---

## 7.6 Price Profile

**Average Price Tolerance:** Medium
**Premium Acceptance:** Moderate
**Bargain Sensitivity:** Medium/high

Market Square can support fair normal pricing. Overpriced common stock should underperform.

---

## 7.7 Display Profile

**Display Standard:** Normal
**Preferred Styles:**

* colourful
* approachable
* mixed but tidy
* seasonal
* practical

**Display Bonuses:**

* full front table improves impulse buys
* colourful bedding display improves browsing
* herb crate improves kitchen buyer sales
* clear reduced basket attracts bargain hunters
* small gift section helps casual buyers

**Display Penalties:**

* empty slots reduce casual browsing
* tired plants reduce gift sales
* too much reduced stock can make stall look low quality

---

## 7.8 Exposure

**Exposure Type:** Mixed / lightly exposed
**Exposure Effects:**

* no major prototype penalty
* sunny days may favour outdoor colour and herbs
* thirsty plants may need attention in warm conditions

---

## 7.9 Special Request Profile

**Special Request Rate:** Medium
**Request Difficulty:** Easy/normal

Common categories:

* gift
* budget
* beginner suitability
* herbs/kitchen use
* simple identification
* cheerful plant requests

Example requests:

* “Something cheerful under twelve pounds.”
* “I want to start with herbs. What is easiest?”
* “Something for a pot by the front door.”
* “Do you have anything good for bees?”

---

## 7.10 Reputation Behaviour

**Reputation Gain Speed:** Normal
**Review Influence:** Medium
**Word-of-Mouth Spread:** Broad starter area

Market Square reputation should help unlock early opportunities because it is visible to a wide mix of customers.

---

## 7.11 Feedback Lines

Positive:

> “The market crowd liked having a bit of everything to browse.”

> “Your herb crate did steady business through lunchtime.”

> “The cheerful front table helped draw in casual shoppers.”

Negative/missed demand:

> “Several shoppers asked about herbs, but the stall had none.”

> “Gift buyers noticed the tired plants on the main table.”

> “Common bedding sold slowly at premium prices.”

---

# 8. Prototype Location 2 — Village Green

## 8.1 Identity

**Location ID:** `village_green`

**Display Name:** Village Green

**Unlock Status:** Starting location

**Short Description:**
A slower, garden-focused pitch near cottages, dog walkers, benches, and weekend events. Traditional gardeners, pollinator enthusiasts, and new garden owners browse carefully.

**Visual Brief:**
Grass green, old trees, village noticeboard, cottages, church wall, benches, hanging baskets, community feel.

---

## 8.2 Economic Profile

**Stall Fee:** Low
**Expected Revenue Potential:** Good if stocked correctly
**Risk Level:** Low/medium
**Why Risk Exists:** Customers are more garden-focused and may judge poor stock or unsuitable plants.

Village Green rewards good outdoor stock choices.

---

## 8.3 Footfall Profile

**Base Footfall:** Medium
**Footfall Type:** Slow browsers / regular locals
**Peak Time:** Weekend morning / afternoon
**Pace:** Relaxed

Customers take longer to browse and are more likely to notice display details.

---

## 8.4 Customer Archetype Weights

* Traditional Gardener: high
* Pollinator Gardener: medium/high
* New Gardener: medium
* Gift Buyer: medium
* Bargain Hunter: medium
* Herb / Kitchen Buyer: low/medium
* Flat Dweller: low
* Busy Professional: low

---

## 8.5 Demand Tags

Strong:

* bedding
* perennial
* pollinator-friendly
* wildlife-interest
* cottage-style
* nostalgic
* front-door
* container-suitable
* hardy
* cheerful

Moderate:

* herb
* scented
* low-maintenance
* reduced-friendly
* companion-pot
* gift

Weak:

* office-desk
* modern-style
* tropical-style
* specialist houseplant
* purely indoor stock

---

## 8.6 Price Profile

**Average Price Tolerance:** Medium
**Premium Acceptance:** Moderate for quality outdoor stock
**Bargain Sensitivity:** Medium/high

Traditional gardeners will pay for healthy, useful plants, but resist overpriced common stock.

---

## 8.7 Display Profile

**Display Standard:** Normal/high
**Preferred Styles:**

* cottage
* seasonal
* colourful
* wildlife-themed
* rustic
* traditional

**Display Bonuses:**

* pollinator-themed displays perform well
* lavender/salvia/nepeta style combinations attract attention
* wooden crates improve rustic charm
* front-door pot displays boost container sales
* reduced perennials appeal to practical gardeners

**Display Penalties:**

* messy or leggy bedding is noticed
* too many plain houseplants underperform
* empty gaps hurt the impression of abundance
* modern/minimal display may feel cold here

---

## 8.8 Exposure

**Exposure Type:** Sunny / open
**Exposure Effects:**

* outdoor flowering stock looks appropriate
* sun-loving plants feel natural here
* thirsty bedding may require care
* shade-sensitive stock should not dominate

---

## 8.9 Special Request Profile

**Special Request Rate:** Medium/high
**Request Difficulty:** Normal

Common categories:

* pollinator suitability
* companion pot
* traditional plant identification
* front-door pots
* outdoor beginner advice
* bargain/reduced judgement

Example requests:

* “Can you make me a bee-friendly doorstep pot?”
* “What would work in a sunny border?”
* “My neighbour had a bush with blue pom-pom flowers.”
* “I need bedding for tubs, but nothing too fussy.”
* “Is that reduced lavender still worth planting?”

---

## 8.10 Reputation Behaviour

**Reputation Gain Speed:** Normal
**Review Influence:** Medium/high
**Word-of-Mouth Spread:** Nearby garden-focused locations

Good performance here should help unlock:

* Garden Open Day
* village fair pitch
* stronger traditional gardener reputation
* better pollinator/wildlife customer profile

---

## 8.11 Feedback Lines

Positive:

> “The village crowd responded well to the cottage-style display.”

> “Pollinator plants sold strongly from the sunny front table.”

> “Traditional gardeners appreciated the fair pricing on healthy bedding.”

Negative/missed demand:

> “Several customers wanted outdoor colour, but the stall leaned too heavily on houseplants.”

> “The petunias looked a little leggy for this crowd.”

> “A few shoppers asked about bee-friendly plants and left without buying.”

---

# 9. Prototype Location 3 — Station Corner

## 9.1 Identity

**Location ID:** `station_corner`

**Display Name:** Station Corner

**Unlock Status:** Starting location or early unlock

**Short Description:**
A busy urban pitch near commuters, office workers, and flat-dwellers. Customers have less time, but attractive indoor plants and quick gifts can sell well.

**Visual Brief:**
Pavement pitch near station entrance, coffee kiosk, office workers, bikes, railings, small planters, traffic, quick lunchtime movement.

---

## 9.2 Economic Profile

**Stall Fee:** Medium
**Expected Revenue Potential:** Good/high with right stock
**Risk Level:** Medium
**Why Risk Exists:** Customers are quick and selective. Wrong stock can be ignored despite high footfall.

Station Corner is a higher-paced location that rewards compact, attractive, easy-to-understand stock.

---

## 9.3 Footfall Profile

**Base Footfall:** High
**Footfall Type:** Quick passers-by
**Peak Time:** Morning commute, lunchtime, after work
**Pace:** Brisk

The player has less time for manual care during trading. Strong setup matters more.

---

## 9.4 Customer Archetype Weights

* Flat Dweller: high
* Busy Professional: high
* Gift Buyer: high
* New Gardener: low/medium
* Herb / Kitchen Buyer: low/medium
* Bargain Hunter: low
* Traditional Gardener: low
* Pollinator Gardener: low

---

## 9.5 Demand Tags

Strong:

* houseplant
* gift
* office-desk
* low-maintenance
* modern-style
* small-space
* low-indoor-light
* bright-indirect-light
* elegant
* impulse-buy

Moderate:

* balcony
* kitchen-use
* cheerful
* beginner-friendly
* compact
* premium-presented stock

Weak:

* bedding
* large outdoor perennials
* pollinator-friendly
* cottage-style
* reduced-friendly
* large shrubs
* specialist outdoor stock

---

## 9.6 Price Profile

**Average Price Tolerance:** Medium/high
**Premium Acceptance:** Good for attractive, tidy, giftable stock
**Bargain Sensitivity:** Low/medium

Station shoppers may pay for convenience and presentation, but they will not spend long evaluating poor displays.

---

## 9.7 Display Profile

**Display Standard:** High for front-facing stock
**Preferred Styles:**

* tidy
* compact
* modern
* giftable
* clear
* easy to browse quickly

**Display Bonuses:**

* tiered shelves boost houseplant visibility
* clean gift display improves impulse sales
* small labelled plants perform well
* attractive front-table-star plants draw commuters in
* modern-style plants gain appeal
* strong signage helps quick decisions

**Display Penalties:**

* clutter hurts sales
* too much reduced stock looks unprofessional
* outdoor bedding is often ignored
* tired plants strongly reduce gift conversion
* slow-to-understand displays underperform

---

## 9.8 Exposure

**Exposure Type:** Urban / partly exposed
**Exposure Effects:**

* wind may penalise tall/light displays later
* shade/awning can protect indoor stock
* compact shelving performs well
* houseplants may need protection from harsh sun/cold in advanced versions

Prototype 0.1 can treat this mostly as display flavour, with minor penalties for inappropriate exposed houseplant displays if desired.

---

## 9.9 Special Request Profile

**Special Request Rate:** Medium
**Request Difficulty:** Easy/normal, low patience

Common categories:

* indoor suitability
* gift
* low-maintenance
* office plant
* dark hallway plant
* budget gift
* safety/pet request, if supported

Example requests:

* “Something for my desk that won’t need much.”
* “I need a quick gift that looks nice.”
* “Something for a dark hallway.”
* “I’m away a lot. What won’t die?”
* “Do you have anything small for a flat?”

---

## 9.10 Reputation Behaviour

**Reputation Gain Speed:** Fast if performance is strong
**Review Influence:** Medium
**Word-of-Mouth Spread:** Urban/flat-dweller/customer convenience profile

Good performance here should help unlock:

* office courtyard pitch
* city square
* better houseplant supplier
* commuter regulars
* premium gift stock demand

---

## 9.11 Feedback Lines

Positive:

> “Commuters responded well to the tidy houseplant display.”

> “Small low-maintenance plants sold quickly at lunchtime.”

> “The clean gift section made quick decisions easier.”

Negative/missed demand:

> “Plenty of people passed by, but the outdoor bedding did not catch them.”

> “Several office workers looked at the snake plants, but the shelf was hard to browse.”

> “Gift buyers avoided the tired stock near the front.”

---

# 10. Early Unlock Locations

After the starter set, the game can add more specialised locations.

Recommended early unlocks:

1. Farmers’ Market
2. School Fair
3. Office Courtyard
4. Garden Open Day

These locations should test more focused stock planning.

---

# 11. Early Unlock Location — Farmers’ Market

## 11.1 Identity

**Location ID:** `farmers_market`

**Display Name:** Farmers’ Market

**Unlock Status:** Early unlock

**Unlock Requirement:**
Achieve modest reputation at Market Square or complete several herb/kitchen sales.

**Short Description:**
A practical, food-focused market with eco-minded shoppers, cooks, allotment growers, and bargain-conscious regulars.

---

## 11.2 Economic Profile

**Stall Fee:** Medium
**Expected Revenue Potential:** Good
**Risk Level:** Medium
**Why Risk Exists:** Customers are practical and price-aware. Decorative stock may underperform.

---

## 11.3 Customer Weights

* Herb / Kitchen Buyer: high
* Pollinator Gardener: medium
* New Gardener: medium
* Bargain Hunter: medium
* Traditional Gardener: medium
* Gift Buyer: low/medium
* Flat Dweller: low
* Busy Professional: low

---

## 11.4 Demand Tags

Strong:

* herb
* kitchen-use
* edible
* vegetable
* wildlife-interest
* pollinator-friendly
* container-suitable
* practical
* low-maintenance

Moderate:

* cottage-style
* patio
* balcony
* reduced-friendly
* hardy
* beginner-friendly

Weak:

* purely decorative
* modern-style
* office-desk
* expensive gift stock
* tropical houseplants

---

## 11.5 Display Profile

Preferred:

* rustic
* practical
* abundant
* labelled
* edible/useful
* wildlife-friendly

Bonuses:

* herb racks perform strongly
* wooden crates improve appeal
* clear labels improve trust
* edible companion displays sell well

Penalties:

* over-styled luxury displays may feel wrong
* tired herbs are noticed quickly
* high prices face resistance

---

## 11.6 Special Requests

Common:

* herb combinations
* kitchen windowsill advice
* pollinator-edible pot
* beginner veg/herb request
* reduced but recoverable stock judgement

Examples:

> “What herbs would you put together for cooking?”

> “I want something useful, not just pretty.”

> “Can I grow this on a sunny kitchen windowsill?”

---

# 12. Early Unlock Location — School Fair

## 12.1 Identity

**Location ID:** `school_fair`

**Display Name:** School Fair

**Unlock Status:** Event-only / early unlock

**Unlock Requirement:**
Invitation after local reputation grows.

**Short Description:**
A family event with parents, children, gift buyers, small budgets, and cheerful impulse sales.

---

## 12.2 Economic Profile

**Stall Fee:** Low/event donation
**Expected Revenue Potential:** Medium
**Risk Level:** Low/medium
**Why Risk Exists:** Budgets are smaller, but footfall and impulse buys are good.

---

## 12.3 Customer Weights

* Gift Buyer: high
* New Gardener: high
* Bargain Hunter: medium
* Traditional Gardener: low/medium
* Herb / Kitchen Buyer: low
* Flat Dweller: low
* Busy Professional: low
* Pollinator Gardener: low/medium

---

## 12.4 Demand Tags

Strong:

* cheerful
* child-friendly
* beginner-friendly
* gift
* low-price
* colourful
* impulse-buy
* small-space

Moderate:

* herb
* pollinator-friendly
* front-door
* container-suitable
* easy-care

Weak:

* expensive
* fussy
* specialist
* large plants
* subtle foliage-only stock

---

## 12.5 Display Profile

Preferred:

* colourful
* friendly
* clear
* low-price visible
* safe/family-oriented

Bonuses:

* bright front display
* small labelled plants
* child-friendly stock
* cheerful gift pots
* simple “easy plants” section

Penalties:

* toxic/safety-mismatched recommendations
* high prices
* tired reduced stock near children/family display
* dull green-only display

---

## 12.6 Special Requests

Common:

* child-friendly plant
* gift under budget
* beginner plant
* cheerful front-step pot
* “my child wants to grow something”

Examples:

> “My daughter wants something she can look after herself.”

> “Something cheap and cheerful for a teacher?”

---

# 13. Early Unlock Location — Office Courtyard

## 13.1 Identity

**Location ID:** `office_courtyard`

**Display Name:** Office Courtyard

**Unlock Status:** Early/mid unlock

**Unlock Requirement:**
Strong Station Corner reputation or several successful office/flat requests.

**Short Description:**
A lunchtime pitch serving office workers, reception areas, desk plants, gifts, and low-maintenance indoor stock.

---

## 13.2 Economic Profile

**Stall Fee:** Medium/high
**Expected Revenue Potential:** High with correct stock
**Risk Level:** Medium/high
**Why Risk Exists:** Narrow demand and high expectations. Poor stock fit performs badly.

---

## 13.3 Customer Weights

* Busy Professional: very high
* Flat Dweller: high
* Gift Buyer: medium/high
* New Gardener: low/medium
* Herb / Kitchen Buyer: low
* Traditional Gardener: none/low
* Pollinator Gardener: none/low
* Bargain Hunter: low

---

## 13.4 Demand Tags

Strong:

* office-desk
* houseplant
* low-maintenance
* modern-style
* elegant
* gift
* small-space
* low-indoor-light
* bright-indirect-light

Moderate:

* premium
* housewarming
* compact
* stylish
* beginner-friendly

Weak:

* bedding
* herbs
* pollinator-friendly
* cottage-style
* large outdoor plants
* reduced stock

---

## 13.5 Display Profile

Preferred:

* clean
* modern
* tidy
* compact
* premium
* well-labelled

Bonuses:

* tiered houseplant shelves
* modern display furniture
* clean signage
* office plant bundles
* gift wrapping, if added later

Penalties:

* messy display
* rustic clutter
* too much reduced stock
* outdoor-heavy stock
* tired foliage

---

## 13.6 Special Requests

Common:

* office desk plant
* low-light plant
* “I travel a lot”
* reception gift
* plant for meeting room
* pet-safe flat plant, if supported

Examples:

> “Something for my desk that won’t mind weekends.”

> “Our reception area needs something smart but easy.”

---

# 14. Early Unlock Location — Garden Open Day

## 14.1 Identity

**Location ID:** `garden_open_day`

**Display Name:** Garden Open Day

**Unlock Status:** Mid-game / event-only

**Unlock Requirement:**
Strong Village Green reputation, several successful pollinator/traditional requests, or invitation from local customer.

**Short Description:**
A more demanding garden-focused event where experienced gardeners browse carefully and expect healthy, interesting, well-presented stock.

---

## 14.2 Economic Profile

**Stall Fee:** High/event fee
**Expected Revenue Potential:** High
**Risk Level:** High
**Why Risk Exists:** Customers are knowledgeable and display expectations are high.

---

## 14.3 Customer Weights

* Traditional Gardener: high
* Pollinator Gardener: high
* New Gardener: medium
* Bargain Hunter: medium
* Gift Buyer: medium
* Herb / Kitchen Buyer: low/medium
* Flat Dweller: low
* Busy Professional: low

---

## 14.4 Demand Tags

Strong:

* perennial
* pollinator-friendly
* wildlife-interest
* cottage-style
* wild-style
* hardy
* unusual
* quality
* companion-pot
* seasonal-interest

Moderate:

* bedding
* herb
* front-door
* nostalgic
* scented
* reduced-friendly, if genuinely recoverable

Weak:

* generic houseplant
* cheap gift-only stock
* poor-condition bedding
* office-desk
* modern-style, unless specialist display

---

## 14.5 Display Profile

Preferred:

* abundant
* healthy
* well-labelled
* themed
* seasonal
* wildlife/cottage/naturalistic
* high-quality

Bonuses:

* themed displays strongly rewarded
* plant labels improve trust
* companion planting displays perform well
* high-quality perennials support premium pricing
* rare/specialist stock gets attention

Penalties:

* poor condition strongly punished
* weak labelling hurts specialist customers
* random mixed display underperforms
* tired plants must be honestly reduced

---

## 14.6 Special Requests

Common:

* identification
* companion planting
* pollinator planning
* border gaps
* seasonal continuity
* unusual alternative plants
* correction requests

Examples:

> “I want something like lavender, but for a spot that gets a little less sun.”

> “Can you suggest three plants that will keep the bees coming after spring?”

> “I need something to soften the edge of a sunny border.”

---

# 15. Location Events

Locations can occasionally have event modifiers.

Events should be simple and sales-focused.

Examples:

## Sunny Weekend

Effects:

* outdoor stock demand up
* footfall up at village/farmers locations
* watering pressure up
* drought-tolerant plants more attractive

## Last-Minute Gift Rush

Effects:

* gift buyers up
* flowering/presentable stock sells better
* tired stock penalised more

## Herb Week

Effects:

* herbs and edible plants demand up
* Farmers’ Market performs strongly
* fresh herb condition matters

## Pollinator Talk Nearby

Effects:

* pollinator-friendly demand up
* wildlife-interest requests up
* Village Green/Garden Open Day benefit

## Rainy Morning

Effects:

* footfall down in exposed locations
* covered/sheltered locations improve
* indoor/houseplant browsing relatively stronger

Prototype 0.1 may include no events or only one simple scripted event.

---

# 16. Location Reputation

Locations should track local reputation.

Local reputation can affect:

* footfall
* special request rate
* trust in recommendations
* premium price tolerance
* review frequency
* returning customers
* unlocks
* event invitations

Possible location reputation levels:

## Unknown

Few customers know the stall.

## Noticed

Some regulars recognise it.

## Trusted

Customers come expecting decent advice.

## Local Favourite

Strong footfall and positive word of mouth.

## Destination Stall

Customers visit specifically because of the stall.

Reputation should grow through:

* successful special requests
* good stock matching
* strong displays
* fair prices
* healthy stock
* repeat customers
* positive reviews

Reputation should fall slowly, not abruptly, unless the player repeatedly misleads customers or sells poor stock at high prices.

---

# 17. Location Feedback

After each trading day, the game should explain how location affected results.

Feedback categories:

## Stock Fit

> “This location wanted outdoor colour today. Your bedding and lavender sold well.”

## Missing Demand

> “Several shoppers asked about houseplants, but you brought mostly herbs.”

## Display Fit

> “The rustic herb crates suited the farmers’ market.”

## Price Fit

> “The village crowd liked the plants but resisted premium prices on common bedding.”

## Condition Fit

> “Gift buyers avoided the tired hyacinths.”

## Reputation Fit

> “Your good advice at the Village Green is starting to bring people back.”

This feedback is important because it teaches the player how locations work.

---

# 18. Location Difficulty Progression

Locations should gradually become more specialised and demanding.

## Starter Locations

* forgiving
* broad demand
* low or medium fees
* simple customer requests
* obvious stock fit

Examples:

* Market Square
* Village Green
* Station Corner

## Early Unlocks

* more focused demand
* stronger display preferences
* clearer risk/reward
* more distinct customer groups

Examples:

* Farmers’ Market
* School Fair
* Office Courtyard

## Mid/Late Locations

* higher fees
* specialist customers
* stricter display expectations
* more complex special requests
* stronger reputation rewards

Examples:

* Garden Open Day
* City Design Market
* Botanical Society Fair
* Wedding Venue Pop-Up
* Premium Homeware Store Collaboration

The game should not simply make later locations “better.” They should be more specialised, riskier, and more profitable if approached well.

---

# 19. Difficulty Modes and Locations

Difficulty settings may alter location behaviour.

## Relaxed

* clearer demand hints
* lower stall fees
* broader acceptable stock
* less punishing price mismatch
* lower display penalties
* easier reputation recovery

## Standard

* balanced behaviour

## Expert

* less explicit demand information
* stricter customer expectations
* higher stall fees
* stronger penalties for poor stock fit
* more specialist special requests
* more price sensitivity

Expert difficulty should make locations feel more realistic and demanding, but not arbitrary.

---

# 20. Location Content Creation Rules

When creating a new location, answer:

1. Who comes here?
2. What are they trying to buy?
3. What stock sells unusually well here?
4. What stock underperforms here?
5. What display style fits?
6. What display style feels wrong?
7. How expensive is the pitch?
8. What is the risk?
9. What special requests happen here?
10. What reputation does this location unlock?
11. What does the player learn by trading here?
12. Why would the player choose this location over another?

A location is not ready if it only has:

* a name
* a visual theme
* generic footfall
* generic demand

It must create different decisions.

---

# 21. Prototype 0.1 Location Requirements

Prototype 0.1 should include:

## Required Locations

1. Market Square
2. Village Green
3. Station Corner

## Required Location Differences

Market Square must test:

* mixed stock
* general footfall
* balanced pricing
* broad feedback

Village Green must test:

* outdoor plants
* traditional gardeners
* pollinator demand
* cottage/seasonal display

Station Corner must test:

* houseplants
* gifts
* fast customers
* compact/tidy display
* higher premium tolerance for suitable stock

## Required Shared Systems

Each location must affect:

* customer archetype weights
* passive browsing demand
* special request types
* price tolerance
* display scoring
* end-of-day feedback

## Optional Prototype Systems

The following can be light or absent in Prototype 0.1:

* weather
* events
* local reputation unlocks
* vehicle restrictions
* advanced display style scoring

---

# 22. Example Location Card Text

## Market Square

**Reliable mixed trade.**
A busy town pitch with casual shoppers, practical buyers, gift hunters, and bargain browsers.

* Stall fee: Low
* Footfall: Medium
* Pace: Normal
* Likely customers: mixed public, new gardeners, gift buyers, bargain hunters
* Demand hints: herbs, cheerful bedding, gifts, beginner plants
* Display hint: colourful and approachable
* Risk: Low

---

## Village Green

**Garden-focused local trade.**
A slower, more traditional pitch where outdoor colour, pollinator plants, and tidy seasonal displays do well.

* Stall fee: Low
* Footfall: Medium
* Pace: Relaxed
* Likely customers: traditional gardeners, pollinator gardeners, new gardeners
* Demand hints: bedding, perennials, front-door pots, wildlife plants
* Display hint: cottage, rustic, colourful, seasonal
* Risk: Low/medium

---

## Station Corner

**Fast urban footfall.**
A brisk commuter pitch where compact houseplants, quick gifts, and low-maintenance indoor stock can sell well.

* Stall fee: Medium
* Footfall: High
* Pace: Brisk
* Likely customers: flat-dwellers, office workers, gift buyers
* Demand hints: houseplants, desk plants, gifts, low-maintenance stock
* Display hint: tidy, compact, modern, easy to browse
* Risk: Medium

---

# 23. Success Criteria

The location system succeeds if:

* each location feels commercially different
* players change stock plans based on location
* players change display plans based on location
* passive browsing results make sense
* missed demand teaches future planning
* special requests feel location-appropriate
* local reputation feels meaningful
* later locations create new puzzles rather than just bigger profits

The player should think:

> “I have good plants, but are they good plants for this pitch?”

---

# 24. Recommended Next Document

The next document should be:

## Document 2 — Core Loop Specification

Reason:

Documents 3, 4, and 5 now define plants, customers, and locations. The next step is to describe exactly how these systems come together across one playable day.

Document 2 should define:

* evening/planning phase
* location choice
* wholesaler browsing
* stock buying
* display setup
* pricing
* trading phase
* passive browsing
* special requests
* light care actions
* reduced section use
* end-of-day resolution
* feedback and progression
