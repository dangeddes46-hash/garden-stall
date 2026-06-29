# THE GARDEN STALL

## Document 4 — Customer and Request System

**Working Title:** The Garden Stall
**Document Type:** Customer Behaviour / Request Design / Sales Matching
**Status:** Draft 001
**Purpose:** Define how customers are generated, how they browse, how they decide what to buy, how special requests work, and how customer satisfaction affects reputation and progression.

---

# 1. Purpose of This Document

The Garden Stall is a stock-and-sell game built around plant suitability, display, location, price, and customer needs.

This document defines the customer system.

It explains:

* how customers are created
* how locations shape customer mix
* how passive browsing works
* how plants are matched to customer needs
* how special requests work
* how price, display, condition, and reputation affect sales
* how customer satisfaction creates reviews, profile, and repeat business
* how customer difficulty can scale over time

The goal is to make customers feel alive and varied without requiring every shopper to become a full dialogue scene.

Most customers should browse and buy passively. A smaller number should create focused recommendation challenges.

---

# 2. Core Principle

Customers should have **needs**, not just wallets.

A customer is not simply “a buyer who may purchase a random plant.” They arrive with some combination of:

* purpose
* location context
* budget
* taste
* gardening knowledge
* patience
* plant constraints
* price sensitivity
* impulse tendency
* review influence

The player succeeds by stocking and displaying plants that match the kinds of people likely to visit a location.

The ideal customer system should make the player think:

> “Who is coming here today, and what will they actually want?”

---

# 3. Customer System Overview

There are two main customer types:

## 3.1 Passive Browsing Customers

These are the majority of customers.

They arrive, browse the stall, evaluate visible plants, and may buy without direct player involvement.

Their behaviour is influenced by:

* location
* stock tags
* plant prices
* display quality
* plant condition
* stall reputation
* staff support
* seasonal demand
* reduced section appeal

Passive browsing customers create the sense of a living trading day.

---

## 3.2 Special Request Customers

Approximately one in ten customers should create a special request.

These customers ask the player for help.

They may need the player to:

* identify a plant from a layperson’s description
* recommend something for specific conditions
* build a companion pot
* choose a gift
* solve a problem
* redirect them from a poor choice
* find a plant they would not discover through browsing

Special requests are the game’s main active recommendation moments.

They should be memorable, lightly educational, and reputation-building.

---

# 4. Customer Data Structure

Each customer instance should be generated from a customer archetype, modified by location, season, event, and progression.

---

## 4.1 Customer Archetype Fields

Each customer archetype should define:

**Archetype ID**
Stable internal identifier.

Example:

`new_gardener`

**Display Name**
Player-facing type name, if shown.

Example:

`New Gardener`

**Short Description**
One-sentence design description.

Example:

> Wants forgiving plants and clear advice. Easily put off by fussy or expensive stock.

**Common Locations**
Locations where this customer often appears.

**Budget Range**
Approximate spending range.

**Price Sensitivity**
How strongly high prices affect purchase chance.

Values:

* low
* medium
* high

**Patience**
How long they will browse or wait.

Values:

* low
* medium
* high

**Gardening Knowledge**
How much they already know.

Values:

* none
* basic
* moderate
* expert

**Preferred Tags**
Tags they are likely to want.

**Disliked Tags**
Tags they tend to avoid.

**Common Needs**
Typical request categories.

**Impulse Buy Chance**
How likely they are to buy something attractive even if it was not their original goal.

Values:

* low
* medium
* high

**Reduced Section Interest**
How likely they are to browse reduced stock.

Values:

* none
* low
* medium
* high

**Special Request Chance Modifier**
Whether they are more or less likely than average to trigger a request.

**Review Influence**
How much their satisfaction affects reputation/profile.

Values:

* low
* medium
* high

**Return Chance**
Likelihood of becoming a repeat customer after good service.

---

# 5. Core Customer Archetypes

Prototype 0.1 should use a small set of clear archetypes.

Recommended starter archetypes:

1. New Gardener
2. Flat Dweller
3. Gift Buyer
4. Pollinator Gardener
5. Busy Professional
6. Traditional Gardener
7. Bargain Hunter
8. Herb / Kitchen Buyer

Only 5-6 need to be active in the first prototype, but the full design can support more.

---

# 6. Prototype Archetype Definitions

## 6.1 New Gardener

**Archetype ID:** `new_gardener`

**Description:**
A beginner who wants plants that will survive. Often nervous about making the wrong choice.

**Common Locations:**
Market Square, Village Green, Farmers’ Market, Station Corner

**Budget Range:**
Low to medium

**Price Sensitivity:**
Medium

**Patience:**
Medium

**Gardening Knowledge:**
None/basic

**Preferred Tags:**

* beginner-friendly
* low-maintenance
* container-suitable
* small-space
* cheerful
* hardy

**Disliked Tags:**

* fussy
* high-maintenance
* expensive
* short-season
* display-risk

**Common Needs:**

* “I kill everything.”
* “I want something easy.”
* “I have a small garden.”
* “I need something for a pot.”
* “What should I start with?”

**Impulse Buy Chance:**
Medium

**Reduced Section Interest:**
Medium

**Special Request Chance Modifier:**
Medium/high

**Review Influence:**
Medium

**Return Chance:**
High if helped successfully.

**Good Matches:**

* spider plant
* snake plant
* pothos
* lavender
* marigold
* rosemary
* thyme
* pansy

**Poor Matches:**

* basil, if framed as low-maintenance
* maidenhair fern
* short-peak bulbs after flowering
* fussy houseplants

---

## 6.2 Flat Dweller

**Archetype ID:** `flat_dweller`

**Description:**
Lives in a flat or small space. Often wants indoor plants, balcony plants, or compact gifts.

**Common Locations:**
Station Corner, Market Square, University Street, City Square

**Budget Range:**
Low to medium/high depending on location

**Price Sensitivity:**
Medium

**Patience:**
Low/medium

**Gardening Knowledge:**
None/basic/moderate

**Preferred Tags:**

* houseplant
* small-space
* office-desk
* balcony
* low-indoor-light
* bright-indirect-light
* low-maintenance
* modern-style
* gift

**Disliked Tags:**

* needs-space
* large outdoor shrub
* full-sun only, unless balcony context
* heavy/tricky garden plants

**Common Needs:**

* “Something for my flat.”
* “Something for my desk.”
* “Something for a dark hallway.”
* “Something for a sunny windowsill.”
* “Something for a balcony.”

**Impulse Buy Chance:**
Medium/high for attractive small stock

**Reduced Section Interest:**
Low/medium

**Special Request Chance Modifier:**
Medium

**Review Influence:**
Medium

**Return Chance:**
Medium/high

**Good Matches:**

* peace lily
* snake plant
* pothos
* spider plant
* aloe vera
* small succulents
* herbs for balcony/windowsill

**Poor Matches:**

* hydrangea
* large perennials
* outdoor-only bedding without outdoor space
* plants unsafe for pets when pet context is present

---

## 6.3 Gift Buyer

**Archetype ID:** `gift_buyer`

**Description:**
Wants something attractive now. Often has a deadline, limited plant knowledge, and cares strongly about presentation.

**Common Locations:**
Station Corner, Market Square, Village Green, seasonal events

**Budget Range:**
Medium to high

**Price Sensitivity:**
Low/medium

**Patience:**
Low

**Gardening Knowledge:**
None/basic

**Preferred Tags:**

* gift
* cheerful
* elegant
* flowering
* front-table-star
* impulse-buy
* low-maintenance
* attractive-now

**Disliked Tags:**

* tired
* past-peak
* reduced
* fussy
* plain foliage, unless elegant
* awkward care needs

**Common Needs:**

* “I need something that looks nice today.”
* “It’s for my mum.”
* “Something cheerful.”
* “Something that looks like I made an effort.”
* “Something under £15.”

**Impulse Buy Chance:**
High

**Reduced Section Interest:**
Low

**Special Request Chance Modifier:**
High

**Review Influence:**
Medium/high

**Return Chance:**
Medium

**Good Matches:**

* peace lily
* cyclamen
* hyacinth pot
* daffodil pot in flower
* flowering lavender
* pelargonium
* pansy bowl
* orchid, if included

**Poor Matches:**

* tired herbs
* post-flowering bulbs
* reduced plants
* fussy plants without context
* non-flowering plain stock unless customer asks for indoor foliage

---

## 6.4 Pollinator Gardener

**Archetype ID:** `pollinator_gardener`

**Description:**
Wants plants that genuinely help bees, butterflies, hoverflies, or other wildlife.

**Common Locations:**
Village Green, Farmers’ Market, Garden Open Day, Market Square

**Budget Range:**
Medium

**Price Sensitivity:**
Medium

**Patience:**
High

**Gardening Knowledge:**
Basic/moderate

**Preferred Tags:**

* pollinator-friendly
* wildlife-interest
* cottage-style
* wild-style
* outdoor
* hardy
* flowering
* scented
* full-sun

**Disliked Tags:**

* sterile-looking
* purely decorative
* short-season with little wildlife value
* unsuitable for outdoor conditions
* over-priced common stock

**Common Needs:**

* “I want more bees.”
* “What actually helps pollinators?”
* “Something for a sunny border.”
* “Something wildlife-friendly for a pot.”
* “I want flowers that insects will use.”

**Impulse Buy Chance:**
Medium

**Reduced Section Interest:**
Medium/high for hardy perennials

**Special Request Chance Modifier:**
Medium/high

**Review Influence:**
High

**Return Chance:**
High

**Good Matches:**

* lavender
* salvia
* nepeta
* scabious
* verbena
* thyme
* foxglove, if included
* echinacea, if included

**Poor Matches:**

* purely ornamental bedding with low pollinator value
* indoor houseplants
* plants unsuitable for their stated conditions
* artificial-looking gift stock

---

## 6.5 Busy Professional

**Archetype ID:** `busy_professional`

**Description:**
Wants something stylish, low-effort, and unlikely to die immediately. Often short on time.

**Common Locations:**
Station Corner, City Square, Market Square

**Budget Range:**
Medium/high

**Price Sensitivity:**
Low/medium

**Patience:**
Low

**Gardening Knowledge:**
None/basic

**Preferred Tags:**

* low-maintenance
* beginner-friendly
* modern-style
* houseplant
* office-desk
* drought-tolerant
* small-space
* elegant

**Disliked Tags:**

* fussy
* moisture-loving
* high watering need
* messy
* short-season
* needs frequent deadheading

**Common Needs:**

* “Something I can forget about a bit.”
* “Something for the office.”
* “Something smart-looking.”
* “Something that won’t mind me being away.”
* “Low effort, please.”

**Impulse Buy Chance:**
Medium/high

**Reduced Section Interest:**
Low

**Special Request Chance Modifier:**
Medium

**Review Influence:**
Medium

**Return Chance:**
Medium

**Good Matches:**

* snake plant
* pothos
* aloe vera
* spider plant
* rosemary, for outdoor sunny pot
* lavender, for outdoor sunny pot
* succulent

**Poor Matches:**

* basil
* maidenhair fern
* thirsty bedding
* short-season bulbs
* plants requiring regular deadheading

---

## 6.6 Traditional Gardener

**Archetype ID:** `traditional_gardener`

**Description:**
Knows familiar garden plants and likes reliable seasonal stock. Often values good condition, fair pricing, and recognisable varieties.

**Common Locations:**
Village Green, Market Square, Garden Open Day

**Budget Range:**
Low to medium/high

**Price Sensitivity:**
Medium/high

**Patience:**
High

**Gardening Knowledge:**
Moderate

**Preferred Tags:**

* bedding
* perennial
* cottage-style
* nostalgic
* hardy
* flowering
* front-door
* container-suitable
* cheerful

**Disliked Tags:**

* overpriced common plants
* poor condition
* trendy but impractical plants
* weak-looking stock
* badly arranged displays

**Common Needs:**

* “Have you got any good bedding?”
* “I need something for tubs.”
* “What have you got for a border?”
* “Anything decent for the front step?”
* “That looks a bit leggy, doesn’t it?”

**Impulse Buy Chance:**
Medium

**Reduced Section Interest:**
High if plant is recoverable

**Special Request Chance Modifier:**
Medium

**Review Influence:**
Medium/high

**Return Chance:**
High

**Good Matches:**

* pansy
* primrose
* pelargonium
* lavender
* salvia
* heuchera
* hosta
* hydrangea, if included

**Poor Matches:**

* overpriced tired bedding
* delicate houseplants
* plants without clear outdoor purpose
* stock past selling condition unless reduced fairly

---

## 6.7 Bargain Hunter

**Archetype ID:** `bargain_hunter`

**Description:**
Looks for value, reduced stock, and recoverable plants. Less concerned with perfect display, more concerned with price.

**Common Locations:**
Market Square, Farmers’ Market, Village Green

**Budget Range:**
Low

**Price Sensitivity:**
High

**Patience:**
Medium/high

**Gardening Knowledge:**
Basic/moderate

**Preferred Tags:**

* reduced
* reduced-friendly
* hardy
* perennial
* herb
* recoverable
* bargain
* useful

**Disliked Tags:**

* premium
* expensive
* overpackaged gift plants
* fussy plants
* unrecoverable tired stock

**Common Needs:**

* “Anything going cheap?”
* “That one just needs a drink, doesn’t it?”
* “I’ll take it if you can do a deal.”
* “Any reduced perennials?”
* “I don’t mind if it’s finished flowering.”

**Impulse Buy Chance:**
High in reduced section

**Reduced Section Interest:**
Very high

**Special Request Chance Modifier:**
Low/medium

**Review Influence:**
Low/medium

**Return Chance:**
High if bargains are good

**Good Matches:**

* past-peak bulbs at reduced price
* tired but recoverable herbs
* hardy perennials
* lavender after flowering
* slightly leggy bedding at discount

**Poor Matches:**

* full-price gift stock
* expensive houseplants
* genuinely unsellable plants
* plants that will not recover

---

## 6.8 Herb / Kitchen Buyer

**Archetype ID:** `kitchen_buyer`

**Description:**
Wants edible, useful, fragrant plants for cooking, windowsills, patios, or small outdoor spaces.

**Common Locations:**
Farmers’ Market, Market Square, Village Green

**Budget Range:**
Low/medium

**Price Sensitivity:**
Medium/high

**Patience:**
Medium

**Gardening Knowledge:**
Basic/moderate

**Preferred Tags:**

* herb
* edible
* kitchen-use
* scented
* patio
* balcony
* container-suitable
* small-space

**Disliked Tags:**

* purely decorative
* fussy without payoff
* expensive
* tired/yellowing herbs
* non-edible stock when they asked for cooking

**Common Needs:**

* “Something for cooking.”
* “Herbs for the kitchen.”
* “Something for a sunny windowsill.”
* “Mint for drinks.”
* “Rosemary for potatoes.”

**Impulse Buy Chance:**
Medium

**Reduced Section Interest:**
Medium if herbs are still usable

**Special Request Chance Modifier:**
Medium

**Review Influence:**
Medium

**Return Chance:**
High if stock is fresh

**Good Matches:**

* basil
* mint
* rosemary
* thyme
* parsley
* strawberry plant
* chilli plant, if included

**Poor Matches:**

* non-edible flowers
* tired basil
* decorative houseplants
* toxic plants presented as kitchen-friendly

---

# 7. Location and Customer Generation

Each location should define customer archetype weightings.

Example:

## Market Square

* New Gardener: medium
* Gift Buyer: medium
* Traditional Gardener: medium
* Bargain Hunter: medium
* Flat Dweller: low
* Pollinator Gardener: low/medium
* Kitchen Buyer: medium

## Village Green

* Traditional Gardener: high
* Pollinator Gardener: medium/high
* New Gardener: medium
* Gift Buyer: medium
* Bargain Hunter: medium
* Flat Dweller: low
* Busy Professional: low

## Station Corner

* Flat Dweller: high
* Busy Professional: high
* Gift Buyer: high
* New Gardener: low/medium
* Bargain Hunter: low
* Traditional Gardener: low
* Pollinator Gardener: low

This means the same stock can perform very differently depending on where the player trades.

---

# 8. Customer Intent

Each customer should have a current intent.

Intent determines what they are trying to buy today.

Examples:

* buy-gift
* buy-houseplant
* buy-herb
* buy-bedding
* buy-pollinator-plant
* buy-shade-plant
* buy-sunny-pot-plant
* browse-bargains
* impulse-browse
* solve-specific-problem
* identify-remembered-plant
* build-companion-pot

Passive customers mostly use simple intents.

Special request customers use more specific intents.

---

# 9. Passive Browsing System

Passive browsing is the default selling mode.

A passive customer enters the stall, checks available displayed stock, and may buy if suitable plants are found.

---

## 9.1 Passive Browsing Inputs

Passive sale chance should consider:

### Customer Need Match

Do displayed plants match the customer’s intent and preferred tags?

### Display Visibility

Is the plant in a visible or suitable display zone?

### Display Quality

Is the surrounding display tidy, full, attractive, and coherent?

### Plant Condition

Is the plant healthy, tired, past peak, reduced, or unsellable?

### Price Acceptability

Is the price within the customer’s budget and tolerance?

### Location Fit

Is this plant expected or desirable at this location?

### Season Fit

Is the plant in season or currently visually appealing?

### Reputation

Does the stall’s profile make customers more willing to buy?

### Staff Support

Are staff helping customers, keeping displays tidy, or improving patience?

---

## 9.2 Passive Browsing Output

Each passive customer may:

* buy one plant
* buy multiple related plants
* browse and leave satisfied but without buying
* browse and leave disappointed
* generate feedback
* notice a missing stock category
* be converted into a special request, rarely

---

## 9.3 Passive Sale Scoring

Each candidate plant receives a suitability score.

Suggested broad scoring:

### Excellent Match

Strong need match, good condition, fair price, good display, season/location appropriate.

High sale chance.

### Good Match

Meets main need with minor weakness.

Moderate/high sale chance.

### Acceptable Match

Could work, but not ideal.

Moderate/low sale chance.

### Poor Match

Mismatch on key need, price, or condition.

Low sale chance.

### Unsuitable

Contradicts important need.

No sale unless customer is misled or the game allows wrong-but-sellable outcomes.

---

## 9.4 Passive Browsing Feedback

Because passive systems can feel opaque, the game must provide readable feedback.

Feedback should appear during the day or in the end-of-day report.

Examples:

* “Several customers looked for herbs today, but you had none.”
* “The lavender display drew people in from the street.”
* “The peace lilies attracted attention, but the price felt high for this location.”
* “Two customers wanted shade plants; the hostas sold quickly.”
* “The reduced tray sold well, but made the front table look a little tired.”
* “Gift buyers ignored the tired hyacinths.”
* “Office workers liked the snake plants near the till.”
* “Traditional gardeners noticed the petunias were getting leggy.”

This feedback teaches the player how demand, display, and pricing work.

---

# 10. Special Request System

Special requests are active customer challenges.

They should be less frequent than passive browsing but more memorable.

Approximate target:

* 1 special request per 10 customers
* or 1-3 per trading day depending on footfall, difficulty, and pacing

Special requests should not interrupt constantly. They should feel like small moments of attention inside a busy retail day.

---

## 10.1 Special Request Trigger Factors

Special request chance may increase with:

* higher footfall
* stronger reputation
* specialist locations
* certain customer archetypes
* staff availability
* story events
* higher difficulty levels
* location profile growth

Special request chance may decrease with:

* low reputation
* very poor display
* overwhelmed staff/player
* low footfall
* early tutorial stage

---

## 10.2 Special Request Categories

### 10.2.1 Identification Request

Customer describes a plant informally.

Example:

> “My neighbour had this bush with huge blue pom-pom flowers. Do you know what it was?”

The player must identify or suggest the correct plant.

Likely answer:

* hydrangea

Skills tested:

* plant recognition
* layperson description interpretation
* customer memory matching

---

### 10.2.2 Suitability Request

Customer has a site or lifestyle constraint.

Example:

> “I have a sunny balcony and I forget to water. What won’t immediately die?”

Good matches:

* lavender
* rosemary
* thyme
* aloe, if indoor/sheltered
* sedum, if included

Skills tested:

* condition matching
* care difficulty
* customer lifestyle
* avoiding bad fits

---

### 10.2.3 Gift Request

Customer needs a plant for someone else.

Example:

> “I need something cheerful for my aunt. She likes colour but not fuss.”

Good matches:

* flowering but easy-care stock
* peace lily
* cyclamen
* pelargonium
* pansy pot
* lavender in flower

Skills tested:

* visual appeal
* care suitability
* budget
* condition

---

### 10.2.4 Companion Pot Request

Customer wants a group of plants that work together.

Example:

> “Can you put together a bee-friendly pot for a sunny doorstep?”

Good match should consider:

* compatible light needs
* compatible water needs
* visual harmony
* shared purpose
* container suitability
* season

Skills tested:

* combination building
* display thinking
* horticultural compatibility

---

### 10.2.5 Correction Request

Customer asks for something unsuitable.

Example:

> “I want lavender for my dark bathroom.”

The player can:

* sell the wrong plant
* refuse/redirect
* suggest a better alternative

Good alternatives:

* peace lily
* pothos
* snake plant, depending exact light and style need

Skills tested:

* honesty
* suitability
* reputation over short-term profit

---

### 10.2.6 Budget Request

Customer has a strict price limit.

Example:

> “I need something nice under £8.”

Good match depends on:

* price
* condition
* display
* gift suitability
* value perception

Skills tested:

* pricing
* reduced section use
* value judgment

---

### 10.2.7 Style Request

Customer wants a visual or emotional style.

Example:

> “I want something cottagey and soft, not too modern.”

Good matches:

* lavender
* nepeta
* salvia
* foxglove, if included
* pansies, depending context

Skills tested:

* style tags
* display identity
* plant personality

---

### 10.2.8 Safety Request

Customer has pets or children.

Example:

> “I need something for my flat, but my cat chews leaves.”

Good matches require pet-safe tags or warning/redirect.

Skills tested:

* avoiding unsafe recommendations
* plant suitability
* trust-building

Safety requests should be used carefully and only where plant data supports them.

---

# 11. Special Request Structure

Each special request template should include:

**Request ID**
Stable internal identifier.

**Request Category**
Identification, suitability, gift, companion, correction, budget, style, safety.

**Customer Archetypes**
Who can ask it.

**Location Suitability**
Where it commonly appears.

**Opening Line**
Customer’s spoken request.

**Hidden Need Tags**
The actual tags needed for success.

**Visible Clues**
What the customer tells the player.

**Budget**
Optional.

**Hard Constraints**
Must not be violated.

Example:

* pet-safe
* indoor
* shade
* under £10

**Soft Preferences**
Improve satisfaction but not mandatory.

Example:

* cheerful
* flowering
* low-maintenance

**Excellent Matches**
Plants or tag combinations that strongly solve the request.

**Good Matches**
Acceptable answers.

**Poor Matches**
Plants that partially fit but have flaws.

**Bad Matches**
Unsuitable recommendations.

**Success Response**
Customer reaction for excellent/good match.

**Partial Success Response**
Customer reaction for acceptable match.

**Failure Response**
Customer reaction for poor/bad match.

**Reputation Effect**
Positive/neutral/negative.

**Review Hook**
Possible review line.

---

# 12. Special Request Scoring

Special requests should not require one exact answer unless the request is explicitly identification-based.

Most requests should allow several solutions.

---

## 12.1 Suggested Scoring Components

### Hard Constraint Score

Must satisfy essential requirements.

Example:

* indoor
* pet-safe
* full-sun
* under budget
* container-suitable

If a hard constraint is violated, result should usually be poor or failed.

### Need Match Score

How well the plant matches the main need.

### Care Match Score

Does the plant suit the customer’s skill/lifestyle?

### Visual Match Score

Does it look appropriate for the request?

### Price Match Score

Is it affordable and fairly priced?

### Condition Score

Is it fresh enough, especially for gifts?

### Advice Score

If the game includes advice choices, did the player explain care/use correctly?

### Bonus Match Score

Extra tags that delight the customer.

Example:

A bee-friendly plant that is also scented and in flower may score higher.

---

## 12.2 Result Levels

### Excellent

Customer is delighted. Strong review/reputation gain.

### Good

Customer is happy. Normal positive effect.

### Acceptable

Customer buys but response is mild. Small or no reputation change.

### Poor

Customer may decline or buy reluctantly. No reputation gain or minor loss.

### Bad

Customer is clearly dissatisfied. Possible negative review, especially if advice was misleading.

---

# 13. Advice and Recommendation

The game may include advice as part of special requests.

The player might choose:

* plant
* price
* care advice
* placement advice
* companion plant
* warning or redirect

Advice should be simple and readable.

Examples:

For lavender:

* “Keep it outside in sun and don’t overwater.”
* “This won’t be happy in a dark hallway.”
* “Trim lightly after flowering.”

For peace lily:

* “Keep it indoors, out of harsh sun.”
* “It will droop when it needs water.”
* “Not a good choice if pets chew leaves.”

Advice can affect satisfaction, especially for safety and correction requests.

---

# 14. Wrong-but-Sellable Outcomes

The game may allow the player to sell something unsuitable.

This creates interesting moral/commercial choices.

Example:

A customer wants something for a dark bathroom. The player sells lavender because it looks good today.

Short-term result:

* customer may buy
* player earns money

Long-term result:

* customer may not return
* review may be weaker
* reputation may suffer
* later feedback: “It didn’t last where I put it.”

The game should not be preachy, but it should reward good advice.

The ideal long-term strategy should be:

> Sell plants that suit people, not just plants that move stock.

---

# 15. Customer Satisfaction

Each sale or interaction should generate satisfaction.

Satisfaction is affected by:

* plant suitability
* price fairness
* plant condition
* display attractiveness
* customer service
* advice quality
* whether expectations were met
* whether the customer felt understood
* staff support
* reputation expectation

---

## 15.1 Satisfaction Levels

### Delighted

Excellent match. Strong chance of positive review, return visit, and word-of-mouth.

### Happy

Good match. Normal positive outcome.

### Neutral

Acceptable transaction. Little reputation effect.

### Disappointed

Weak match, high price, poor condition, or poor advice. Minor negative effect.

### Misled

Customer was sold something unsuitable despite clear need. Stronger negative effect, often delayed.

---

# 16. Reviews and Reputation

Reputation should grow through repeated good performance.

Reviews are both reward and feedback.

---

## 16.1 Reputation Sources

Positive reputation may come from:

* successful special requests
* good passive sales satisfaction
* attractive displays
* fair pricing
* healthy stock
* good reduced-section value
* returning customers
* staff excellence
* location-specific performance

Negative reputation may come from:

* poor plant suitability
* tired stock sold as full price
* misleading advice
* messy displays
* too much overpriced stock
* staff neglect
* repeated failure at special requests

---

## 16.2 Review Examples

Positive:

> “Lovely little stall. Helped me find something for my dark flat.”

> “The lavender display smelled amazing.”

> “They knew exactly what plant I meant from my terrible description.”

> “My mum loved the pot they put together.”

> “Good advice, fair price, and the plant is still alive.”

Neutral/mixed:

> “Nice stall, but a few gaps on the table.”

> “Some good bargains, though a few plants looked tired.”

> “Good selection, but not much for shady gardens today.”

Negative:

> “The plant looked lovely but didn’t suit where I needed it.”

> “Too expensive for the quality.”

> “Asked for something easy and got something fussy.”

Reviews should teach without sounding mechanical.

---

# 17. Returning Customers

Some customers may return after successful interactions.

Returning customers help create warmth and continuity.

Possible return events:

* customer reports plant success
* customer asks for a follow-up plant
* customer brings a friend
* customer leaves a stronger review
* customer becomes a regular
* customer asks a harder request later

Examples:

> “That snake plant you sold me is somehow still alive, so I trust you.”

> “The bees loved that salvia. What else should I add?”

> “My mum liked the pot. Can you make another, but brighter?”

Returning customers should be more likely after:

* excellent special request outcomes
* honest correction
* good advice
* strong location reputation

---

# 18. Customer Difficulty Progression

Customer difficulty should rise gradually.

---

## 18.1 Early Game Customers

Early customers should have simple, readable needs.

Examples:

* “Something easy.”
* “Something for indoors.”
* “Something for bees.”
* “Something colourful.”
* “Something for cooking.”

Plants should have clear tags and obvious matches.

---

## 18.2 Mid Game Customers

Mid game customers combine two or three needs.

Examples:

* “Something for a sunny balcony that I won’t have to water constantly.”
* “A gift that is pretty but safe around children.”
* “A bee-friendly pot that looks good in purple and white.”

---

## 18.3 Late Game Customers

Late game customers may involve subtle or specialist knowledge.

Examples:

* “I want something like lavender, but for a slightly shadier spot.”
* “I want a pot that looks good now and still has interest later.”
* “My neighbour had something with blue pom-pom flowers and big leaves.”
* “I need something dramatic but not toxic to my cat.”

Difficulty can increase through:

* less explicit tags
* more constraints
* higher expectations
* specialist locations
* less forgiving reviews
* rare plants
* more expensive stock decisions

---

# 19. Difficulty Modes

Difficulty modes may adjust customer behaviour.

## Relaxed

* clearer customer clues
* more visible tags
* forgiving satisfaction scoring
* lower negative review impact
* slower plant degradation
* more patience

## Standard

* balanced clues, satisfaction, and consequences

## Expert

* fewer explicit hints
* more subtle requests
* stricter condition/suitability scoring
* higher customer knowledge
* more price sensitivity
* sharper reputation consequences

Expert mode should test plant knowledge more strongly, but the core game should remain accessible.

---

# 20. Customer Feedback Lines

Customer feedback should appear in three places:

1. During browsing
2. During special requests
3. End-of-day report/reviews

---

## 20.1 Browsing Feedback Examples

No matching stock:

> “A few people asked about herbs, but you had none today.”

High price:

> “Several customers liked the peace lilies, but hesitated at the price.”

Good display:

> “The purple-and-silver front table pulled people in.”

Poor condition:

> “Gift buyers avoided the tired hyacinths.”

Reduced success:

> “The reduced basket was popular with practical gardeners.”

Location mismatch:

> “Station shoppers mostly ignored the outdoor perennials.”

---

## 20.2 Special Request Feedback Examples

Excellent match:

> “That sounds perfect. I would never have known what to pick.”

Good match:

> “Yes, that should work nicely. Thank you.”

Acceptable match:

> “I’ll give it a try.”

Poor match:

> “Hmm. I’m not sure that’s quite what I need.”

Correction success:

> “Thanks for being honest. I’d rather get the right thing.”

Misled/delayed:

> “That plant didn’t really survive where I put it.”

---

# 21. Staff and Customers

Staff can affect customer behaviour.

Possible staff effects:

## Sales Assistant

* improves passive conversion
* increases customer patience
* gives better browsing feedback
* helps with gift buyers

## Gardener / Plant Expert

* improves special request success hints
* catches unsuitable recommendations
* improves customer trust
* reduces bad advice outcomes

## Display Assistant

* improves display score
* keeps shelves tidy during trading
* reduces penalty from empty slots
* helps impulse sales

## Junior Helper

* waters/tidies stock
* modestly improves browsing experience
* gains experience over time

Staff should support customer satisfaction without replacing the player’s best judgement entirely.

---

# 22. Customer Request Template Examples

## 22.1 Dark Hallway Plant

**Request ID:** `dark_hallway_indoor`

**Category:** Suitability

**Customer Archetypes:** Flat Dweller, New Gardener, Busy Professional

**Opening Line:**

> “I need something for a hallway. It does not get much light, and I’m not brilliant with plants.”

**Hidden Need Tags:**

* indoor
* low-indoor-light
* beginner-friendly
* low-maintenance

**Hard Constraints:**

* indoor
* tolerates low light

**Soft Preferences:**

* low-maintenance
* attractive foliage
* medium/low price

**Excellent Matches:**

* snake plant
* pothos

**Good Matches:**

* peace lily, if pet safety is not an issue
* spider plant, if light is not extremely low

**Poor Matches:**

* basil
* lavender
* petunia
* most outdoor bedding

**Success Response:**

> “That sounds ideal. I like that it won’t punish me immediately.”

**Review Hook:**

> “Helped me find something for a dark hallway instead of just selling me the prettiest one.”

---

## 22.2 Bee-Friendly Doorstep Pot

**Request ID:** `bee_friendly_doorstep_pot`

**Category:** Companion Pot

**Customer Archetypes:** Pollinator Gardener, New Gardener, Traditional Gardener

**Opening Line:**

> “Can you help me put together a pot for my front step? I’d like something bees will actually use.”

**Hidden Need Tags:**

* pollinator-friendly
* container-suitable
* outdoor
* flowering
* compatible light/water needs

**Hard Constraints:**

* container-suitable
* outdoor
* pollinator-friendly

**Soft Preferences:**

* cheerful
* scented
* colour harmony
* low-maintenance

**Excellent Matches:**

* lavender + thyme + salvia
* nepeta + lavender + scabious, if available
* salvia + thyme + trailing pollinator plant, if available

**Good Matches:**

* lavender alone
* salvia alone
* nepeta alone

**Poor Matches:**

* sterile bedding with low pollinator value
* indoor houseplants
* shade plants for sunny doorstep

**Success Response:**

> “That looks lovely — and useful, not just decorative.”

**Review Hook:**

> “Made me a bee-friendly doorstep pot and explained why the plants worked together.”

---

## 22.3 Blue Pom-Pom Shrub

**Request ID:** `blue_pompom_shrub`

**Category:** Identification

**Customer Archetypes:** Traditional Gardener, New Gardener, Gift Buyer

**Opening Line:**

> “My neighbour used to have this bush with big round blue flowers, like pom-poms. Any idea what that was?”

**Hidden Answer:**

* hydrangea

**Visible Clues:**

* bush
* big round flowers
* blue
* neighbour’s garden
* nostalgic memory

**Hard Constraints:**

* identify hydrangea or offer close explanation

**Excellent Match:**

* hydrangea in stock
* hydrangea recommended with care note

**Good Match:**

* identify hydrangea even if not in stock, suggest when to look for it

**Poor Matches:**

* lavender
* salvia
* pansy
* petunia

**Success Response:**

> “Hydrangea! That’s it. I knew I’d recognise the name.”

**Review Hook:**

> “They knew the plant I meant from a terrible description.”

---

## 22.4 Low-Effort Sunny Balcony

**Request ID:** `low_effort_sunny_balcony`

**Category:** Suitability

**Customer Archetypes:** Flat Dweller, Busy Professional, New Gardener

**Opening Line:**

> “I’ve got a sunny balcony, but I’m away a lot. Is there anything that won’t sulk immediately?”

**Hidden Need Tags:**

* balcony
* full-sun
* drought-tolerant
* low-maintenance
* container-suitable

**Hard Constraints:**

* container-suitable
* tolerates sun
* not high watering need

**Soft Preferences:**

* attractive
* scented
* edible/useful
* beginner-friendly

**Excellent Matches:**

* lavender
* rosemary
* thyme
* sedum, if included

**Good Matches:**

* aloe, if sheltered/indoor context is clarified
* hardy drought-tolerant herbs

**Poor Matches:**

* basil
* fern
* hosta
* moisture-loving bedding
* peace lily

**Success Response:**

> “Perfect. I wanted something that could cope with my level of neglect.”

**Review Hook:**

> “Recommended plants for my sunny balcony that might actually survive me.”

---

## 22.5 Cheerful Gift Under Budget

**Request ID:** `cheerful_gift_under_budget`

**Category:** Gift / Budget

**Customer Archetypes:** Gift Buyer, New Gardener, Busy Professional

**Opening Line:**

> “I need something cheerful, but I’ve only got about twelve pounds.”

**Hidden Need Tags:**

* gift
* cheerful
* attractive-now
* within-budget

**Hard Constraints:**

* price within budget
* presentable condition

**Soft Preferences:**

* flowering
* low-maintenance
* nice display/pot
* easy care

**Excellent Matches:**

* flowering cyclamen
* hyacinth pot in flower
* cheerful pansy pot
* small peace lily
* pelargonium in flower

**Good Matches:**

* marigold pot
* primrose pot
* attractive small houseplant

**Poor Matches:**

* tired reduced plant
* plain herb, unless customer likes cooking
* past-peak bulb
* expensive specialist plant

**Success Response:**

> “That’s lovely. Looks much more thoughtful than the price.”

**Review Hook:**

> “Found me a really nice gift without pushing the expensive stuff.”

---

## 22.6 Pet-Safe Flat Plant

**Request ID:** `pet_safe_flat_plant`

**Category:** Safety / Suitability

**Customer Archetypes:** Flat Dweller, New Gardener, Busy Professional

**Opening Line:**

> “I want a plant for my flat, but my cat chews anything green. What’s safest?”

**Hidden Need Tags:**

* indoor
* pet-safe
* low-maintenance

**Hard Constraints:**

* must be pet-safe or include warning/redirect
* indoor suitable

**Soft Preferences:**

* small-space
* beginner-friendly
* attractive foliage

**Excellent Matches:**

* spider plant, if tagged pet-safe
* other deliberately confirmed pet-safe houseplants

**Good Match:**

* recommend waiting for safer stock if no pet-safe option is available

**Poor Matches:**

* peace lily
* pothos
* aloe vera
* many toxic houseplants

**Success Response:**

> “Thank you. I’d much rather know than just buy the prettiest one.”

**Failure Response:**

> “Oh — I thought that one was safe. That’s worrying.”

**Review Hook:**

> “They warned me away from plants that would not suit my cat.”

---

# 23. Prototype 0.1 Customer Scope

Prototype 0.1 should include:

## Active Archetypes

* New Gardener
* Flat Dweller
* Gift Buyer
* Pollinator Gardener
* Busy Professional
* Traditional Gardener

Optional if scope allows:

* Bargain Hunter
* Herb / Kitchen Buyer

## Passive Browsing

Must include:

* customer generation by location
* basic customer intents
* plant matching by tags
* price acceptance
* display influence
* condition influence
* end-of-day feedback

## Special Requests

Start with 10-15 templates.

Required categories:

* suitability
* gift
* identification
* companion pot
* correction
* budget

Safety requests should only be included if plant data has reliable safety tags.

---

# 24. Success Criteria

The customer system succeeds if:

* locations feel different because different customers appear
* stock choice matters before the trading day begins
* passive browsing feels readable rather than random
* display affects customer behaviour visibly
* special requests feel like satisfying recommendation moments
* players learn plant suitability through play
* good advice feels more rewarding than dumping bad stock
* reviews provide useful feedback
* customers create emotional warmth without overwhelming the selling loop

The player should finish a day thinking:

> “I know why that sold, I know why that did not sell, and I have a better plan for tomorrow.”

---

# 25. Recommended Next Document

The next document should be:

## Document 5 — Location Specification

Reason:

The customer system depends heavily on location profiles. Locations determine which customer archetypes appear, what stock is likely to sell, what display styles matter, and what kinds of special requests are likely to occur.

Document 5 should define:

* location data fields
* starter locations
* customer weighting
* demand tags
* footfall
* stall fees
* price tolerance
* display expectations
* special request likelihood
* unlock conditions
* event/location modifiers
