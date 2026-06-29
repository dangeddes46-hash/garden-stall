# THE GARDEN STALL

## Document 3 — Plant Schema and Tag Bible

**Working Title:** The Garden Stall
**Document Type:** Content Schema / Tag Bible
**Status:** Draft 001
**Purpose:** Define how plant content is structured, tagged, priced, displayed, and used by customer, location, wholesaler, care, and sales systems.

---

# 1. Purpose of This Document

The Garden Stall depends on plant content being consistent.

Plants are not just decorative entries. They are the core stock objects used by the game’s selling, display, pricing, wholesaler, customer request, location demand, care, degradation, and reputation systems.

This document defines:

* what data every plant needs
* which tags are allowed
* what each tag means
* how tags should be used
* how plants connect to customer needs
* how plants connect to locations
* how plants connect to display
* how plants connect to wholesaler listings
* how plants degrade, peak, and enter the reduced section

The goal is to make plant content usable by the game, not merely botanically descriptive.

---

# 2. Core Principle

Plant entries should be **retail-useful before botanically complete**.

The player is buying and selling potted stock from a mobile stall. The plant data model should prioritise:

* who wants this plant
* when it sells well
* where it sells well
* how it looks on display
* how much it costs
* how much it can sell for
* how quickly it declines
* what customer needs it satisfies
* what common mistakes it helps teach

The game should respect real plant knowledge, but only include detail that supports stock judgement, display, customer matching, or light care pressure.

---

# 3. Plant Entry Structure

Each plant should be written as a structured content entry.

A plant entry should contain the following sections:

1. Identity
2. Category
3. Core Tags
4. Growing Condition Tags
5. Customer Need Tags
6. Visual Display Tags
7. Seasonality
8. Retail Data
9. Display Data
10. Care and Degradation Data
11. Customer Matching Notes
12. Wholesaler Notes
13. Request Hook Notes
14. Content Notes

---

# 4. Plant Schema

## 4.1 Identity Fields

Every plant requires:

**Plant ID**
A stable internal identifier.

Example:

`lavender_hidcote`

**Display Name**
The name shown to the player.

Example:

`Lavender 'Hidcote'`

**Common Name**
The ordinary plant name.

Example:

`Lavender`

**Botanical Name**
Optional in early prototype, but useful for authenticity.

Example:

`Lavandula angustifolia 'Hidcote'`

**Short Description**
One or two player-facing sentences.

Example:

> A compact lavender with purple flowers and a strong summer scent. Popular with bees, gift buyers, and sunny-garden customers.

**Icon / Art Reference**
Reference for visual asset or placeholder.

Example:

`purple compact flowering shrublet, silver foliage, summer scent`

---

## 4.2 Category Fields

Each plant should have one primary category and may have secondary categories.

### Primary Category

Choose one:

* houseplant
* herb
* vegetable
* bedding
* perennial
* shrub
* climber
* bulb
* grass
* fern
* succulent
* aquatic
* tree
* fruit
* seasonal-gift

For Prototype 0.1, avoid aquatic, tree, and large shrub stock unless deliberately included as special-case stock.

### Secondary Categories

Optional, choose as needed:

* edible
* flowering
* foliage
* scented
* wildlife
* container
* hanging
* trailing
* compact
* statement
* beginner
* specialist

Example:

Lavender might be:

* Primary Category: perennial
* Secondary Categories: flowering, scented, wildlife, container, beginner

---

# 5. Tag Principles

Tags must be controlled.

Content writers should not invent new tags casually.

Tags are used by:

* customer matching
* passive browsing logic
* special request scoring
* display scoring
* wholesaler filtering
* location demand
* pricing modifiers
* difficulty settings
* tutorials and hints

A tag should only exist if it has gameplay use.

---

## 5.1 Tag Rules

Use one standard tag, not variants.

Correct:

* pollinator-friendly

Incorrect:

* bee-friendly
* bees
* good for bees
* pollinator
* wildlife nectar plant

If a new tag seems necessary, it should be added to the Tag Bible before being used in plant content.

---

## 5.2 Tag Strength

Some tags may be stronger than others.

Use three levels where helpful:

* strong
* normal
* weak

Example:

Lavender:

* full-sun: strong
* drought-tolerant: strong
* scented: strong
* pollinator-friendly: strong
* container-suitable: normal
* gift: weak/normal depending on condition and flowering state

This helps distinguish plants that technically match from plants that are excellent matches.

---

# 6. Category Tags

Category tags describe what kind of plant/stock item this is.

## Allowed Category Tags

### houseplant

Indoor plant sold primarily for inside the home.

Examples:

* spider plant
* peace lily
* pothos
* snake plant
* monstera

### herb

Edible aromatic plant usually sold for kitchen, patio, or garden use.

Examples:

* basil
* rosemary
* mint
* thyme
* parsley

### vegetable

Edible crop plant, usually seedling or young plant.

Examples:

* tomato seedling
* chilli plant
* lettuce tray
* courgette seedling

### bedding

Seasonal flowering plant commonly used for pots, borders, baskets, and temporary colour.

Examples:

* petunia
* marigold
* pansy
* begonia
* primrose

### perennial

Outdoor plant expected to return year after year.

Examples:

* salvia
* nepeta
* echinacea
* heuchera
* hosta

### shrub

Woody outdoor plant.

Examples:

* hydrangea
* lavender, if treated as small shrub stock
* rosemary, if sold as woody patio shrub
* skimmia

### climber

Plant sold for vertical growth.

Examples:

* clematis
* jasmine
* honeysuckle
* ivy

### bulb

Bulb-based seasonal pot or dry bulb stock.

Examples:

* tulip pot
* daffodil pot
* hyacinth pot
* amaryllis

### fern

Fern stock, often shade or indoor-oriented depending on species.

Examples:

* Boston fern
* hardy fern
* maidenhair fern

### succulent

Low-water fleshy plant.

Examples:

* aloe vera
* echeveria
* sedum
* jade plant

### fruit

Fruit-bearing plant.

Examples:

* strawberry plant
* blueberry bush
* raspberry cane

### seasonal-gift

Plant mainly sold as a ready-made seasonal gift.

Examples:

* poinsettia
* cyclamen
* hyacinth bowl
* amaryllis

---

# 7. Growing Condition Tags

Growing condition tags describe where a plant will succeed.

These are central to customer request matching.

---

## 7.1 Light Tags

Choose one or more if appropriate.

### full-sun

Needs or strongly prefers full sun.

Examples:

* lavender
* rosemary
* thyme
* petunia
* salvia

### part-shade

Can grow with some sun and some shade.

Examples:

* heuchera
* hydrangea
* begonia
* primrose

### shade

Suitable for low-light outdoor shade or indoor shade depending on context.

Examples:

* hosta
* fern
* ivy
* peace lily, for indoor low light

### bright-indirect-light

Indoor bright but not harsh direct sun.

Examples:

* monstera
* pothos
* peace lily
* spider plant

### low-indoor-light

Tolerates lower indoor light.

Examples:

* snake plant
* peace lily
* pothos

---

## 7.2 Water and Drought Tags

### drought-tolerant

Handles dry conditions once established or requires less frequent watering.

Examples:

* lavender
* rosemary
* thyme
* sedum
* snake plant
* aloe

### moisture-loving

Prefers consistent moisture.

Examples:

* fern
* hosta
* hydrangea
* basil

### average-water

No strong special water identity.

Use when useful internally, but avoid showing too often to the player.

### dislikes-wet-feet

Does not like sitting in wet soil.

Examples:

* lavender
* rosemary
* succulents

---

## 7.3 Space and Container Tags

### container-suitable

Good for pots, patios, balconies, or front steps.

Examples:

* lavender
* herbs
* pelargonium
* pansy
* compact salvia

### hanging-suitable

Good for hanging baskets or trailing displays.

Examples:

* trailing petunia
* ivy
* lobelia
* fuchsia

### small-space

Good for flats, balconies, windowsills, or small gardens.

Examples:

* herbs
* succulents
* spider plant
* compact bedding

### needs-space

Likely to become too large for small pots or cramped locations.

Examples:

* hydrangea
* climber
* large shrub
* monstera, eventually

---

## 7.4 Difficulty and Resilience Tags

### beginner-friendly

Forgiving plant suitable for inexperienced customers.

Examples:

* spider plant
* snake plant
* pothos
* lavender
* marigold

### low-maintenance

Requires little routine care.

Examples:

* snake plant
* sedum
* rosemary
* lavender

### fussy

Requires more precise conditions or care.

Examples:

* maidenhair fern
* basil in hot conditions
* some orchids
* carnivorous plants, if included

### hardy

Outdoor plant that tolerates ordinary UK cold.

Examples:

* hosta
* hardy fern
* lavender
* heuchera

### frost-tender

Damaged by frost.

Examples:

* basil
* pelargonium
* many bedding plants
* tender houseplants

### short-season

Has a limited selling window.

Examples:

* tulip pot
* daffodil pot
* bedding tray near end of season

---

# 8. Customer Need Tags

Customer need tags describe why someone wants the plant.

These are often more important than botanical category.

---

## 8.1 Use-Based Tags

### gift

Good as a present, especially if attractive now.

Examples:

* orchid
* cyclamen
* peace lily
* flowering bulb pot
* attractive lavender in flower

### housewarming

Good for a new home gift.

Examples:

* peace lily
* snake plant
* spider plant
* pothos

### office-desk

Small, tidy, indoor, low care.

Examples:

* small succulent
* snake plant
* pothos cutting pot
* mini peace lily

### front-door

Good for doorstep pots or entrances.

Examples:

* lavender
* bay, if included
* pansy
* cyclamen
* small conifer, if included

### patio

Good for containers and outdoor sitting areas.

Examples:

* herbs
* lavender
* pelargonium
* salvia
* strawberry

### balcony

Good for container growing, often small-space and wind/sun tolerant depending on request.

Examples:

* herbs
* lavender
* trailing plants
* compact tomatoes

### kitchen-use

Edible or useful for cooking.

Examples:

* basil
* rosemary
* thyme
* parsley
* mint

### child-friendly

Suitable for family-friendly gardening. Avoid plants with obvious toxicity, thorns, or irritation concerns.

Examples:

* marigold
* sunflower seedling
* strawberry
* spider plant

### pet-safe

Suitable where pets may chew or interact. Use carefully and only when reasonably accurate.

Examples:

* spider plant
* certain herbs
* some ferns

Do not tag a plant as pet-safe unless confidently intended.

### wildlife-interest

General wildlife appeal.

Examples:

* lavender
* foxglove
* nepeta
* salvia
* scabious

### pollinator-friendly

Strong nectar/pollen appeal for bees, butterflies, hoverflies, or similar.

Examples:

* lavender
* salvia
* nepeta
* verbena
* scabious
* foxglove

### privacy-screen

Useful for screening, climbing, or covering.

Examples:

* ivy
* clematis
* jasmine
* bamboo, if included

---

## 8.2 Emotional and Style Tags

### cheerful

Bright, colourful, friendly.

Examples:

* marigold
* geranium/pelargonium
* pansy
* primrose

### elegant

Refined, understated, giftable.

Examples:

* orchid
* peace lily
* white cyclamen

### nostalgic

Traditional, familiar, garden-memory plants.

Examples:

* hydrangea
* lavender
* geranium/pelargonium
* sweet pea
* rose, if included

### cottage-style

Traditional informal garden feel.

Examples:

* lavender
* foxglove
* nepeta
* salvia
* hollyhock, if included

### modern-style

Architectural or clean contemporary look.

Examples:

* snake plant
* monstera
* succulent
* ornamental grass

### wild-style

Naturalistic or pollinator meadow feel.

Examples:

* verbena
* scabious
* foxglove
* echinacea
* nepeta

### tropical-style

Lush, bold foliage.

Examples:

* monstera
* calathea
* banana plant, if included
* canna, if included

---

# 9. Visual Display Tags

Visual tags support display scoring, colour harmony, furniture bonuses, and customer attraction.

---

## 9.1 Colour Tags

Use only visible dominant retail colour.

Allowed colour tags:

* red
* orange
* yellow
* blue
* purple
* pink
* white
* cream
* green
* silver
* variegated
* mixed-colour

Rules:

* Use flower colour when flowers are the main selling feature.
* Use foliage colour when foliage is the main selling feature.
* Use `mixed-colour` for trays or plants sold in varied colours.
* Do not over-tag every possible colour a variety might have unless that colour is visible in the sold batch.

Examples:

Lavender:

* purple
* silver

Peace lily:

* white
* green

Marigold:

* orange
* yellow

Pansy tray:

* mixed-colour

---

## 9.2 Shape and Habit Tags

### upright

Vertical shape.

Examples:

* lavender
* rosemary
* salvia
* snake plant

### trailing

Spills over pot or basket.

Examples:

* ivy
* trailing petunia
* lobelia

### mounding

Rounded, soft shape.

Examples:

* pansy
* begonia
* petunia

### rosette

Central symmetrical form.

Examples:

* echeveria
* primrose, depending on depiction

### architectural

Strong structure or bold shape.

Examples:

* snake plant
* monstera
* ornamental grass

### airy

Loose, tall, open, movement-heavy.

Examples:

* verbena bonariensis
* gaura, if included
* some grasses

### compact

Small and neat.

Examples:

* mini herbs
* compact lavender
* small succulents

### large-impact

Draws attention or occupies significant visual space.

Examples:

* hydrangea in flower
* monstera
* large hanging basket

---

## 9.3 Display Role Tags

### front-table-star

Strong enough to be featured prominently.

Examples:

* flowering lavender
* hydrangea in bloom
* colourful cyclamen
* orchid

### filler

Useful to complete trays or add mass.

Examples:

* bedding plants
* small herbs
* pansies

### height-builder

Adds height to a display.

Examples:

* foxglove
* salvia
* rosemary
* tall grasses

### edge-softener

Good for edges, trailing, or softening display shape.

Examples:

* ivy
* trailing lobelia
* trailing petunia

### scent-draw

Can attract attention through scent.

Examples:

* lavender
* rosemary
* mint
* sweet pea, if included

### impulse-buy

Likely to sell because it looks immediately attractive or charming.

Examples:

* flowering bulb pot
* mini succulent
* bright bedding
* small gift plant

### reduced-friendly

Can still sell plausibly when past peak or slightly tired.

Examples:

* herbs
* perennials
* hardy plants
* bulbs after flowering, to bargain gardeners

### display-risk

Can make the stall look messy quickly if neglected, leggy, or past peak.

Examples:

* basil
* petunia
* flowering bulbs after bloom
* thirsty bedding

---

# 10. Seasonality Tags

Seasonality should be simple and sales-focused.

---

## 10.1 Seasonal Interest Tags

Allowed tags:

* spring-interest
* summer-interest
* autumn-interest
* winter-interest

These indicate when the plant has strong retail appeal.

Examples:

Daffodil pot:

* spring-interest

Lavender:

* summer-interest

Cyclamen:

* autumn-interest
* winter-interest, depending type

Pansy:

* spring-interest
* autumn-interest

---

## 10.2 Peak and Decline Fields

Each plant should define:

**Peak Selling Window**

When the plant sells best.

Example:

`late spring to midsummer`

**Peak Visual State**

What makes it attractive.

Example:

`in bud or flower`

**Decline Trigger**

What makes it harder to sell.

Examples:

* flowers finished
* leaves yellowing
* leggy growth
* out of season
* weather too hot/cold
* too many similar plants in stock

**Reduced Threshold**

When it should be considered for the reduced section.

Examples:

* after flowering
* after 2 days thirsty
* after 3 unsold days during peak
* when condition falls below 60

**Unsellable Threshold**

When it should be discarded/composted.

Examples:

* dead
* badly wilted
* broken
* diseased-looking
* fully collapsed

---

# 11. Retail Data

Retail data determines economy and pricing.

Every plant stock item should define:

**Wholesale Unit Type**

Examples:

* single plant
* tray of 6
* tray of 10
* mixed tray
* hanging basket
* planted pot
* bulb bowl

**Wholesale Cost**

Cost to player.

**Suggested Retail Price**

Default sensible price per unit.

**Minimum Sensible Price**

Lowest normal sale price before reduced stock.

**Premium Tolerance**

How well the plant tolerates being priced above normal.

Values:

* low
* medium
* high

**Price Sensitivity**

How much customers resist high prices.

Values:

* low
* medium
* high

**Expected Margin**

Approximate profitability.

Values:

* poor
* fair
* good
* excellent

**Demand Reliability**

How consistently it sells.

Values:

* niche
* seasonal
* steady
* strong

**Stock Risk**

How risky it is to hold unsold.

Values:

* low
* medium
* high

---

## 11.1 Retail Interpretation Examples

### Cheap Bedding Plant

* low wholesale cost
* moderate retail price
* high impulse appeal
* medium/high degradation risk
* low premium tolerance
* strong seasonal demand

### Lavender

* moderate wholesale cost
* good retail price
* strong summer demand
* good gift/wildlife appeal
* moderate premium tolerance if in flower
* low care risk

### Specialist Houseplant

* higher wholesale cost
* higher retail price
* niche demand
* high premium tolerance in urban locations
* may require more careful matching

### Bulb Pot

* strong peak demand
* strong gift appeal
* sharp decline after flowering
* high stock timing risk

---

# 12. Display Data

Each plant should define how it behaves on the stall.

Fields:

**Display Footprint**

Values:

* tiny
* small
* medium
* large
* hanging
* tall
* tray

**Preferred Display Zones**

Examples:

* front table
* crate stack
* tiered shelf
* hanging rail
* herb rack
* reduced basket
* shade shelf
* feature stand

**Display Strength**

Values:

* low
* medium
* high

**Colour Harmony Notes**

Examples:

* pairs well with silver foliage and purple flowers
* useful warm-colour filler
* strong white contrast plant
* mixed tray can disrupt strict colour themes

**Display Weakness**

Examples:

* looks messy if leggy
* leaves wilt visibly
* flowers drop after peak
* large leaves dominate small displays

**Furniture Synergies**

Examples:

* wooden crates boost rustic/cottage/herb appeal
* tiered shelves boost small houseplants
* hanging rail required for hanging stock
* shade awning protects indoor foliage at sunny locations

---

# 13. Care and Degradation Data

Care should remain light.

Each plant should define:

**Care Difficulty**

* easy
* normal
* demanding

**Watering Need**

* low
* medium
* high

**Tidying Need**

* low
* medium
* high

**Deadheading / Pruning Benefit**

* none
* minor
* useful
* important

**Degradation Speed**

* slow
* normal
* fast

**Visible Decline Type**

Examples:

* wilts
* droops
* yellows
* drops flowers
* becomes leggy
* browns at edges
* finishes flowering

**Recoverability**

* recovers fully
* recovers partially
* does not recover well

**Care Notes**

Short player-facing note.

Example:

> Keep watered in hot weather. Looks tired quickly if allowed to wilt.

---

## 13.1 Condition States

Plants should use simple condition states.

### Excellent

Fresh, attractive, strong sale chance.

### Good

Normal saleable condition.

### Tired

Still saleable but less attractive. May need watering, tidying, or discounting.

### Past Peak

Not necessarily unhealthy, but less visually desirable. Often suitable for reduced section.

### Reduced

Marked down to clear.

### Unsellable

Dead, collapsed, or too poor to sell.

---

# 14. Customer Matching

Customer matching should score plants based on tags, price, display, condition, and context.

A plant may be:

* excellent match
* good match
* acceptable match
* poor match
* unsuitable

---

## 14.1 Matching Factors

### Need Match

Does the plant satisfy the customer’s stated need?

Example:

Customer wants shade plant.

Strong matches:

* fern
* hosta
* peace lily, if indoor context

Poor matches:

* lavender
* rosemary

### Context Match

Does the plant suit the location/use?

Example:

Customer has sunny balcony.

Good:

* lavender
* rosemary
* thyme
* sedum

Poor:

* hosta
* fern
* moisture-loving bedding

### Price Match

Is the plant within budget?

### Condition Match

Does the plant look good enough for this customer?

Gift buyers care strongly about condition. Bargain hunters care less.

### Display Influence

Plants in strong display positions should be more likely to sell passively.

### Customer Knowledge

Experienced gardeners may accept past-peak perennials if reduced. Gift buyers may not.

---

## 14.2 Wrong but Sellable

The game may allow wrong-but-profitable sales, but it should recognise them.

Example:

A customer wants a pretty plant for a dark hallway. The player sells lavender because it is flowering and expensive.

Possible result:

* customer buys if persuasion/display/price works
* short-term profit
* later weaker review or no return
* possible feedback: “The lavender did not last indoors.”

This should be used carefully. The game’s moral centre should favour suitable recommendations.

---

# 15. Special Request Hooks

Plant entries should include request hooks where useful.

These help generate special request content.

Hook types:

## Layperson Description Hook

How a customer might describe it without knowing the name.

Example hydrangea:

> “Big round blue or pink flower heads, like pom-poms.”

Example lavender:

> “That purple plant that smells like summer.”

Example snake plant:

> “Tall stiff leaves, like green swords.”

## Common Misuse Hook

Where customers often want to put it wrongly.

Example lavender:

> Asked for dark indoor gift; actually needs sun/outdoor.

Example basil:

> Asked for low-maintenance sunny holiday balcony; actually thirsty and short-lived if neglected.

## Companion Hook

Plants it pairs well with.

Example lavender:

* salvia
* thyme
* rosemary
* nepeta

## Gift Hook

When it works as a present.

Example peace lily:

* housewarming
* office gift
* low-light indoor gift

## Seasonal Hook

When it becomes especially relevant.

Example hyacinth pot:

* spring gift
* strong scent
* sharp decline after flowers finish

---

# 16. Wholesaler Listing Schema

The wholesaler should sell stock batches, not abstract plants.

A wholesaler listing may differ from the base plant entry.

Example:

Base plant:

`Lavender 'Hidcote'`

Wholesaler batch:

`Tray of 6 Lavender 'Hidcote' — buds just colouring`

Batch-specific fields:

* batch ID
* plant ID
* quantity
* wholesale price
* condition
* flowering stage
* season quality
* discount status
* supplier note
* stock risk modifier
* visual appeal modifier
* expected margin modifier

---

## 16.1 Wholesaler Condition Labels

Allowed labels:

### Fresh Batch

Good quality, normal price.

### Budding

Not fully showy yet, but good upcoming value.

### In Flower

High immediate appeal, strong display value.

### Slightly Leggy

Cheaper, but lower display quality.

### Past Best Soon

Risky bargain; needs fast sale.

### Mixed Quality

Some good, some tired. Cheap but labour/display risk.

### Limited Batch

Scarce or desirable.

### Supplier Special

Discounted or unusual offer.

---

## 16.2 Wholesaler Note Style

Supplier notes should feel like simplified trade descriptions.

Examples:

> Good compact batch. Buds just starting to show colour.

> Cheap because slightly leggy. Still fine for bargain trays.

> Excellent colour this week. Strong front-table stock.

> Needs quick sale. Flowers near finish.

> Reliable herb tray. Good for farmers’ market or sunny weekend trade.

> Attractive but thirsty. Do not overbuy before hot weather.

---

# 17. Prototype 0.1 Starter Tag Set

Prototype 0.1 should use a limited, controlled tag set.

Do not use the full possible tag list immediately.

---

## 17.1 Recommended Prototype Categories

* houseplant
* herb
* bedding
* perennial
* shrub
* bulb
* fern
* succulent

---

## 17.2 Recommended Prototype Growing Tags

* full-sun
* part-shade
* shade
* bright-indirect-light
* low-indoor-light
* drought-tolerant
* moisture-loving
* container-suitable
* small-space
* beginner-friendly
* low-maintenance
* fussy
* hardy
* frost-tender
* short-season

---

## 17.3 Recommended Prototype Customer Tags

* gift
* office-desk
* front-door
* patio
* balcony
* kitchen-use
* child-friendly
* pet-safe
* wildlife-interest
* pollinator-friendly
* cheerful
* elegant
* nostalgic
* cottage-style
* modern-style
* wild-style

---

## 17.4 Recommended Prototype Display Tags

* red
* orange
* yellow
* blue
* purple
* pink
* white
* green
* silver
* variegated
* mixed-colour
* upright
* trailing
* mounding
* architectural
* compact
* large-impact
* front-table-star
* filler
* height-builder
* edge-softener
* scent-draw
* impulse-buy
* reduced-friendly
* display-risk

---

# 18. Prototype 0.1 Suggested Plant List

The first plant list should be small enough to tune.

Recommended 25 starter plants:

## Houseplants

1. Spider Plant
2. Peace Lily
3. Snake Plant
4. Pothos
5. Monstera
6. Aloe Vera

## Herbs / Edibles

7. Basil
8. Mint
9. Rosemary
10. Thyme
11. Parsley
12. Strawberry Plant

## Bedding / Seasonal Colour

13. Marigold
14. Petunia
15. Pansy
16. Begonia
17. Primrose
18. Pelargonium

## Perennials / Outdoor Garden

19. Lavender
20. Salvia
21. Nepeta
22. Hosta
23. Heuchera

## Seasonal / Bulbs / Gifts

24. Daffodil Pot
25. Hyacinth Pot

This list gives enough coverage for:

* indoor vs outdoor
* sun vs shade
* dry vs moist
* gifts
* herbs
* pollinator requests
* beginner requests
* colour display
* reduced stock
* seasonal/past-peak decisions

---

# 19. Example Plant Entries

The following examples show how plant data should be written.

---

## 19.1 Lavender 'Hidcote'

**Plant ID:** `lavender_hidcote`
**Display Name:** Lavender 'Hidcote'
**Common Name:** Lavender
**Botanical Name:** `Lavandula angustifolia 'Hidcote'`

**Short Description:**
A compact lavender with purple summer flowers, silver foliage, and a strong scent. Excellent for sunny pots, pollinators, and cottage-style displays.

**Primary Category:** perennial
**Secondary Categories:** flowering, scented, wildlife, container, beginner

**Core Tags:**

* outdoor
* flowering
* scented
* pollinator-friendly
* container-suitable
* beginner-friendly
* low-maintenance

**Growing Tags:**

* full-sun: strong
* drought-tolerant: strong
* dislikes-wet-feet: strong
* hardy: normal

**Customer Need Tags:**

* patio
* front-door
* wildlife-interest
* pollinator-friendly
* cottage-style
* nostalgic
* gift: weak/normal when in flower

**Visual Tags:**

* purple
* silver
* upright
* compact
* scent-draw
* front-table-star when in flower
* height-builder
* reduced-friendly

**Seasonality:**

* summer-interest
* Peak Selling Window: late spring to midsummer
* Peak Visual State: bud or flower
* Decline Trigger: out of flower, woody/tired appearance
* Reduced Threshold: after flowering or if display quality drops
* Unsellable Threshold: dead, brittle, badly dried out

**Retail Data:**

* Wholesale Unit Type: tray of 6
* Wholesale Cost: medium
* Suggested Retail Price: medium
* Premium Tolerance: medium
* Price Sensitivity: medium
* Expected Margin: good
* Demand Reliability: strong in summer
* Stock Risk: low/medium

**Display Data:**

* Display Footprint: medium
* Preferred Zones: front table, wooden crates, feature stand
* Display Strength: high in flower
* Colour Harmony Notes: works well with purple, blue, pink, white, and silver schemes
* Display Weakness: less attractive after flowering
* Furniture Synergies: wooden crates, chalkboard sign, cottage/wildlife display

**Care Data:**

* Care Difficulty: easy
* Watering Need: low
* Tidying Need: low
* Deadheading Benefit: minor
* Degradation Speed: slow
* Visible Decline Type: dries, loses flower colour
* Recoverability: partial
* Care Note: Do not overwater. Best sold while buds or flowers are visible.

**Customer Matching Notes:**
Excellent for sunny, dry, pollinator, scented, front-door, and beginner requests. Poor for shade, indoor, wet ground, or dark hallway requests.

**Layperson Description Hooks:**

* “The purple one that smells like summer.”
* “A bee plant for a sunny pot.”

**Common Misuse Hook:**
Customers may ask for it indoors because it smells nice. Redirect to outdoor sunny use.

**Wholesaler Note Example:**

> Compact batch, buds just colouring. Strong summer seller for sunny displays and pollinator requests.

---

## 19.2 Peace Lily

**Plant ID:** `peace_lily`
**Display Name:** Peace Lily
**Common Name:** Peace Lily
**Botanical Name:** `Spathiphyllum`

**Short Description:**
A glossy green houseplant with elegant white flowers. Popular as a gift and forgiving enough for many indoor customers.

**Primary Category:** houseplant
**Secondary Categories:** flowering, foliage, gift, beginner

**Core Tags:**

* indoor
* houseplant
* flowering
* foliage
* gift
* beginner-friendly

**Growing Tags:**

* bright-indirect-light: strong
* low-indoor-light: normal
* moisture-loving: normal
* fussy: weak

**Customer Need Tags:**

* housewarming
* office-desk, if small size
* gift
* elegant
* low-indoor-light
* beginner-friendly

**Visual Tags:**

* white
* green
* upright
* elegant
* front-table-star
* impulse-buy

**Seasonality:**

* spring-interest
* summer-interest
* autumn-interest
* winter-interest
* Peak Selling Window: year-round, stronger around gift periods
* Peak Visual State: clean leaves and visible white spathes
* Decline Trigger: drooping, browning flower, dusty/tired leaves
* Reduced Threshold: flower browning or drooping condition
* Unsellable Threshold: collapsed, badly browned, root-stressed

**Retail Data:**

* Wholesale Unit Type: single plant or tray of 4
* Wholesale Cost: medium
* Suggested Retail Price: medium/high
* Premium Tolerance: medium
* Price Sensitivity: medium
* Expected Margin: good
* Demand Reliability: steady
* Stock Risk: medium

**Display Data:**

* Display Footprint: medium
* Preferred Zones: tiered shelf, shade shelf, front table, indoor display
* Display Strength: high if flowering
* Colour Harmony Notes: useful white contrast and clean green foliage
* Display Weakness: droops visibly when thirsty
* Furniture Synergies: tiered shelves, shaded awning, gift display

**Care Data:**

* Care Difficulty: easy/normal
* Watering Need: medium
* Tidying Need: medium
* Deadheading Benefit: useful
* Degradation Speed: normal
* Visible Decline Type: droops, browns at flower edges
* Recoverability: recovers partially/fully from light droop
* Care Note: Keep evenly moist and away from harsh direct sun.

**Customer Matching Notes:**
Good for indoor, gift, office, housewarming, elegant, and lower-light requests. Avoid for pet-safe requests unless the game deliberately handles toxicity warnings; peace lilies are not safe for chewing pets.

**Layperson Description Hooks:**

* “White flowers and shiny dark leaves.”
* “Something calm-looking for a flat.”

**Common Misuse Hook:**
Can be requested by pet owners. Should trigger warning/redirect if pet-safe matters.

**Wholesaler Note Example:**

> Clean batch with several flowers showing. Reliable gift stock for indoor customers.

---

## 19.3 Basil

**Plant ID:** `basil`
**Display Name:** Basil
**Common Name:** Basil
**Botanical Name:** `Ocimum basilicum`

**Short Description:**
A fragrant kitchen herb with bright green leaves. Sells well to cooks and summer shoppers, but wilts quickly if neglected.

**Primary Category:** herb
**Secondary Categories:** edible, scented, kitchen-use

**Core Tags:**

* herb
* edible
* kitchen-use
* scented
* container-suitable

**Growing Tags:**

* full-sun: normal
* bright-indirect-light: normal
* moisture-loving: normal
* frost-tender: strong
* fussy: normal

**Customer Need Tags:**

* kitchen-use
* patio
* balcony
* small-space
* cheerful
* gift: weak

**Visual Tags:**

* green
* compact
* scent-draw
* filler
* display-risk
* impulse-buy

**Seasonality:**

* summer-interest
* Peak Selling Window: late spring to summer
* Peak Visual State: fresh leafy growth
* Decline Trigger: wilting, yellowing, legginess, cold weather
* Reduced Threshold: first visible tiredness or leggy growth
* Unsellable Threshold: badly wilted/collapsed

**Retail Data:**

* Wholesale Unit Type: tray of 6 or 10
* Wholesale Cost: low
* Suggested Retail Price: low/medium
* Premium Tolerance: low
* Price Sensitivity: high
* Expected Margin: fair/good
* Demand Reliability: seasonal
* Stock Risk: high

**Display Data:**

* Display Footprint: small
* Preferred Zones: herb rack, wooden crate, front table
* Display Strength: medium when fresh
* Colour Harmony Notes: useful fresh green filler
* Display Weakness: looks tired quickly when thirsty
* Furniture Synergies: herb rack, wooden crate, farmers’ market display

**Care Data:**

* Care Difficulty: demanding for retail holding
* Watering Need: high
* Tidying Need: medium
* Deadheading Benefit: useful if flowering
* Degradation Speed: fast
* Visible Decline Type: wilts, yellows, becomes leggy
* Recoverability: partial
* Care Note: Keep watered and sell quickly. Poor stock to neglect.

**Customer Matching Notes:**
Excellent for kitchen, herb, summer, and small-space requests. Bad for low-maintenance, drought-tolerant, holiday-proof, or cold-weather outdoor requests.

**Layperson Description Hooks:**

* “Something for pasta.”
* “A kitchen herb that smells amazing.”

**Common Misuse Hook:**
Customers may think it is easy and permanent. It is better treated as useful, seasonal, and slightly needy.

**Wholesaler Note Example:**

> Fresh leafy tray. Good margin if sold quickly, but wilts fast in warm weather.

---

# 20. Invalid Tagging Examples

The following should be avoided.

## 20.1 Duplicate Meaning Tags

Bad:

* bee-friendly
* pollinator
* good-for-bees
* wildlife-flower

Correct:

* pollinator-friendly

---

## 20.2 Vague Tags

Bad:

* nice
* pretty
* popular
* useful
* garden
* plant

Tags must connect to a system.

Better:

* gift
* impulse-buy
* cheerful
* low-maintenance
* container-suitable

---

## 20.3 Over-Tagging

Bad lavender tags:

* indoor
* shade
* moisture-loving
* tropical-style
* pet-safe
* office-desk

Even if someone might buy lavender as a gift, it does not suit all gift contexts.

Use tags honestly.

---

## 20.4 Botanical Accuracy With No Gameplay Use

Bad:

* lamiaceae
* opposite-leaved
* square-stemmed
* calcareous-soil-tolerant

These may be true, but they are not needed unless the game later introduces expert-level request modes.

---

# 21. Content Creation Rules

When creating a new plant entry:

1. Start with the retail role.
2. Assign one primary category.
3. Add only necessary secondary categories.
4. Add growing condition tags.
5. Add customer need tags.
6. Add display tags.
7. Define seasonality.
8. Define retail risk and price behaviour.
9. Define care/degradation in simple terms.
10. Add at least one customer request hook.
11. Add a wholesaler note example.
12. Check against invalid tag rules.

A plant is not ready for content use until it can answer:

* Who wants this?
* Where does it sell?
* When does it sell?
* What does it look good with?
* What condition makes it less saleable?
* What customer request could it solve?
* What customer request would it be bad for?

---

# 22. Priority for Next Design Work

This document enables the next major specifications:

1. Customer and Request System
2. Location Specification
3. Vertical Slice Content Plan
4. Wholesaler Interface Specification
5. Display System Specification

The most urgent next document is:

## Document 4 — Customer and Request System

Reason:

The plant tags now need to be connected to customer behaviour, passive browsing, special requests, reputation, and sales conversion.
