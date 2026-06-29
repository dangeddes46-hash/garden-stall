# THE GARDEN STALL
## Document 9 — Display and Merchandising Specification

**Working Title:** The Garden Stall  
**Document Type:** Display System / Merchandising / Stall Labour Specification  
**Status:** Draft 001  
**Purpose:** Define how stock becomes visible, attractive, and sellable display; how trays, pots, floor space, consolidation, tidying, furniture, degradation, and merchandising choices create the core labour minigame.

---

# 1. Purpose of This Document

This document defines the display and merchandising system for The Garden Stall.

Display is not cosmetic. It is one of the central gameplay systems.

The player does not simply own stock and wait for customers. The player must turn stock into an attractive, legible, sellable stall display.

Display affects:

- passive browsing sales
- impulse buys
- perceived value
- customer trust
- special request options
- stock visibility
- stock condition
- location fit
- reputation
- labour pressure
- furniture and upgrade value

The display system is also a key source of daily labour.

The player should regularly need to:

- place trays
- rearrange trays
- tidy trays
- consolidate trays
- clear empty trays
- bring new trays from the van
- decide what deserves table space
- decide what can sit on the floor
- reduce tired plants
- keep the stall looking full
- manage degraded stock before it damages attractiveness

The core display question is:

> “How do I turn limited table space, mixed stock, and living plants into the most attractive and profitable stall I can manage?”

---

# 2. Core Principle

Display is the minigame.

The player’s labour is not placing every individual plant by hand. The player makes retail decisions at tray, pot, and display-zone level.

The avatar carries out the work.

The player chooses actions such as:

- place this tray on the front table
- move this tray to the side table
- return this tray to the van
- consolidate these two trays
- tidy this tray
- water this tray
- deadhead this tray
- move this tired stock to reduced
- bring a fresh tray from the van
- clear this empty tray

Each action takes in-game time.

The game should feel hands-on and practical without becoming fiddly pixel-placement.

---

# 3. Display Model Overview

The prototype uses a hybrid tray/slot system.

## 3.1 Display Is Zone-Based

The stall has display zones:

- trestle table
- floor space
- reduced area
- van storage
- later shelves/racking
- later specialised furniture

Each zone has limited capacity and different sales value.

## 3.2 Stock Arrives in Batches

The wholesaler sells stock in trays, packs, lots, and larger pots.

Examples:

- tray of 24 small bedding plants
- tray of 15 medium plants
- tray of 6 larger plants
- tray of 4 lilies
- pack of terracotta pots
- bags of compost

## 3.3 Customers Usually Buy Individual Units

Customers normally buy individual plants or sundry units.

Examples:

- one tomato plant
- three busy lizzies
- two strawberry plants
- one lily
- one bag of compost
- one terracotta pot

Occasionally, customers may buy a whole tray or a large quantity, especially later.

## 3.4 Trays Remain Display Objects

A tray remains one display object, but it tracks fullness.

Example:

> Busy Lizzie Tray — 10/24 remaining

As plants sell, the tray becomes visually gappier.

Gappy trays reduce display attractiveness unless tidied or consolidated.

---

# 4. Stock Unit Definitions

The game should distinguish between:

## 4.1 Stock Batch

The unit bought from the wholesaler.

Examples:

- Tray of 24 Busy Lizzies
- Tray of 15 Tomato Plants
- Tray of 6 Potted Lilies
- Pack of 6 Terracotta Pots
- 3 Bags of Compost

## 4.2 Sellable Unit

The unit a customer buys.

Examples:

- 1 Busy Lizzie
- 1 Tomato Plant
- 1 Potted Lily
- 1 Terracotta Pot
- 1 Compost Bag

## 4.3 Display Object

The object occupying display space.

Examples:

- one tray of busy lizzies
- one mixed tray of 9cm bedding
- one lily floor group
- one pot stack
- one compost floor stack
- one reduced tray

This distinction is important because the player buys in bulk, sells individually, and displays in tray/pot groups.

---

# 5. Tray Sizes

Wholesaler trays are standardised by physical tray footprint, but different plant types contain different quantities.

For prototype and early game, all standard trays occupy the same table footprint.

However, the number of plants in a tray depends on plant size.

## 5.1 Prototype Tray Formats

### Small Pot Tray

Grid:

> 4 × 6

Total:

> 24 plants

Used for:

- busy lizzies
- pansies
- violas
- primroses
- marigolds
- small bedding
- small herbs, if sold this way

### Medium Pot Tray

Grid:

> 3 × 5

Total:

> 15 plants

Used for:

- tomato plants
- strawberry plants
- petunias
- begonias
- pelargoniums
- fuchsias
- larger herbs

### Large Pot Tray

Grid:

> 2 × 3

Total:

> 6 plants

Used for:

- larger patio plants
- hostas
- larger perennials
- more substantial bedding/patio pots

### Extra-Large / Feature Pot Group

Total:

> 4 plants, or fewer

Used for:

- potted lilies
- larger hostas
- statement pots
- later shrubs or premium plants

These may not fit on early trestle tables and may need floor space.

---

# 6. Prototype Large Pots

Prototype 0.1 should include only two larger pot stock types.

Recommended:

1. Potted Lilies
2. Hostas, if included in a later prototype range

If Hostas are not in Prototype 0.1’s starter 25, then the display framework should still reserve the category for later.

For the current Prototype 0.1 list, Potted Lilies are the main larger pot example.

Lilies should often be displayed on floor space because:

- they are tall
- they have high visual impact
- they do not fit comfortably on basic trestle tables
- they sell strongly when near flower
- they have higher margin than basic bedding

---

# 7. Display Zones

Prototype 0.1 begins with rough, limited display areas.

The start should feel properly rough.

The player has an ugly transit-style van, basic trestle table, cheap trays, floor space, and improvised labels.

Charm comes later.

---

## 7.1 Trestle Table

The initial trestle table is the main high-value display area.

Properties:

- limited tray spaces
- high visibility
- strong effect on passive browsing
- best for colourful bedding, herbs, tomatoes, strawberries, and featured trays
- empty spaces hurt attractiveness
- degraded plants on the table heavily hurt attractiveness

Suggested capacity:

> 4 standard tray spaces

This is deliberately tight.

The table should not hold everything. The player must choose what earns table space.

---

## 7.2 Floor Space

Floor space is the lowest-value display area.

Properties:

- low display bonus
- lower browsing attractiveness
- useful for bulky or tall items
- useful for sundries
- useful for lilies or larger pots
- does not make plants look premium
- can look rough or car-boot-like if overused

Allowed floor stock:

- compost bags
- terracotta pots
- potted lilies
- large/tall pots
- future large perennials/shrubs
- overflow reduced trays, if player accepts penalty

Sundries can only live on floor space in the prototype.

This makes sundries practical but unattractive.

---

## 7.3 Reduced Area

The reduced area begins as a rough reduced tray or basket.

Properties:

- contains tired/past-peak stock
- reduces reputation penalty from poor stock by making discount honest
- attracts bargain hunters
- has lower display value
- too much reduced stock makes stall look tired
- reduced stock placed outside the reduced area creates stronger attractiveness penalty

The reduced area is useful but should not dominate the stall.

---

## 7.4 Van Storage

The van holds more stock than the display area.

Properties:

- not visible to passive browsing customers
- available for restocking during the day
- available for special requests if the player opens the stock menu
- stock in van may degrade lightly through transit and storage
- returning stock to van takes time
- bringing stock from van takes time

Van stock is not display stock.

Customers cannot passively buy what they cannot see.

---

## 7.5 Home Stock

Home stock is not available during trading.

It holds stock not loaded into the van.

Properties:

- larger than van storage
- initially basic back-garden/yard storage
- stock may degrade with age but less than displayed/travelled stock
- future upgrades may improve it

Home stock is outside the active display system during trading.

---

# 8. Display Visibility Rules

Customer visibility is simple:

## 8.1 Visible to Passive Customers

- trestle table
- floor display
- reduced area
- later shelves/racks
- later feature stands

## 8.2 Not Visible to Passive Customers

- van storage
- home stock
- stock not loaded
- unplaced stock

## 8.3 Available for Special Requests

During a special request, the player may access:

- visible display stock
- van stock

The game may pause while the player opens the van stock menu.

The player cannot access home stock during a trading day.

---

# 9. Trading Pause for Stock Menu

Opening the van/restock/display action menu during trading should pause the game.

This prevents display work from becoming twitchy real-time stress.

The player makes a decision.

The avatar then spends in-game time carrying it out.

This supports the intended rhythm:

> Think, choose, commit time.

Not:

> Frantically drag tiny pots around while customers vanish.

---

# 10. Manual Display Actions

The player manually chooses display actions, but does not manually drag every individual plant.

The interface should allow:

## 10.1 Place Tray

Move a tray from van storage to a display zone.

Costs time.

## 10.2 Move Tray

Move a tray from one display zone to another.

Costs time.

## 10.3 Return Tray to Van

Remove a tray from display and put it in van storage.

Costs time.

## 10.4 Clear Empty Tray

Remove an empty tray from display.

Costs time, or may be quick.

## 10.5 Consolidate Trays

Combine compatible partial trays.

Costs time.

Frees display space.

May affect display attractiveness.

## 10.6 Tidy Tray

Rearrange remaining plants into a denser, more uniform display.

Costs time.

Improves appearance.

## 10.7 Water Tray

Water plants in a tray or zone.

Costs time.

Prevents or partially reverses degradation.

## 10.8 Deadhead / Prune Tray

Remove spent flowers or untidy growth.

Costs time.

Improves attractiveness and slows display decline.

## 10.9 Move to Reduced

Mark plants/tray as reduced and move to reduced area, if space exists.

Costs time.

## 10.10 Reprice Tray

Adjust price band or sale label.

Costs time lightly or can be instant in setup.

---

# 11. Tray Fullness

Trays track how full they are.

A tray has:

- maximum capacity
- current quantity
- fullness percentage
- visual state

Example:

> Pansy Tray — 24/24 — Full  
> Pansy Tray — 14/24 — Gappy  
> Pansy Tray — 6/24 — Sparse  
> Pansy Tray — 0/24 — Empty tray

## 11.1 Fullness States

### Full

80–100% full.

Looks good.

### Part Full

50–79% full.

Still acceptable.

### Gappy

25–49% full.

Noticeably picked over.

Display penalty applies.

### Sparse

1–24% full.

Strong display penalty unless tidied, consolidated, or reduced.

### Empty

No sellable plants remain.

Must be cleared or used for consolidation.

## 11.2 Fullness Penalties

Gappy and sparse trays reduce attractiveness, especially on high-value display areas.

The front table should be sensitive to gaps.

The floor is less sensitive because expectations are lower.

---

# 12. Tidying

Tidying is a display action.

It means the avatar rearranges remaining plants into a denser, more uniform pattern.

Tidying can:

- reduce gappy appearance
- improve display score
- make partial trays more acceptable
- make cheap stock look more cared for
- delay reputation/display penalty

Tidying cannot:

- restore missing stock
- fully replace consolidation
- make degraded plants healthy
- create a premium display from poor stock

Example:

> A tray with 11/24 pansies can be tidied so it looks like a compact half-tray instead of scattered gaps.

Tidying is especially useful when the player lacks compatible trays to consolidate.

---

# 13. Consolidation

Consolidation is a core labour action.

It allows the player to combine partial trays to free display space and improve fullness.

This is one of the main display minigame mechanics.

## 13.1 Same-Plant Consolidation

Example:

- Busy Lizzie Tray A: 9/24
- Busy Lizzie Tray B: 11/24

Consolidate into:

- Busy Lizzie Tray: 20/24
- Empty tray freed

Benefits:

- frees one display space
- improves display fullness
- allows another tray to be brought from van
- makes stall look less picked over

Costs:

- avatar time
- possible minor handling stress for fragile stock, if later modelled

## 13.2 Mixed Compatible Consolidation

The player may consolidate different plants if they share compatible pot size/tray format.

Example:

- 9cm Busy Lizzies
- 9cm Begonias
- 9cm Petunias

These can be consolidated into one mixed 9cm bedding tray.

Effects:

- frees display space
- may reduce visual neatness
- may create a cheerful mixed display
- may create a less attractive/random display depending pairing
- may unlock knowledge if the pairing proves commercially or horticulturally strong

## 13.3 Mixed Consolidation Rule

Mixed consolidation is usually slightly less attractive than a uniform tray.

Reason:

- it can look less tidy
- colours and forms may clash
- customer expectations may be less clear
- price labels may be less clear

However, certain pairings or combinations should sell especially well.

These special combinations can become player discoveries.

---

# 14. Special Pairings

Some mixed displays should be genuinely good.

Special pairings should be based on:

- real-world gardener favourites
- common retail combinations
- companion planting
- compatible growing conditions
- known useful pairings
- attractive display combinations
- customer-recognisable themes

When a special pairing performs well, it may unlock:

- skill tree progress
- player notebook/codex entry
- future display hint
- wholesaler/location insight
- improved special request option

## 14.1 Pairing Discovery

Example flow:

1. Player consolidates compatible plants into a mixed display.
2. The display sells unusually well or satisfies a special request.
3. Game reveals a knowledge item.

Example:

> Notebook unlocked: Tomato + Basil  
> Customers like buying these together, and they share a familiar kitchen-garden association.

## 14.2 Pairing Types

### Retail Favourite Pairing

Plants commonly bought together.

Example:

- tomato + basil
- strawberry + terracotta pot
- pansy + primrose for spring colour
- petunia + lobelia for baskets

### Companion Planting Pairing

Based on real or commonly believed beneficial combinations.

Example:

- tomato + basil
- tomato + marigold
- strawberries + thyme, if supported later

### Display Harmony Pairing

Visually strong pair.

Example:

- purple petunia + white lobelia
- red pelargonium + silver foliage, later
- pansy + viola mixed colour spring tray

### Use-Case Pairing

Plants and sundries solving a customer need.

Example:

- tomato + pot + compost
- strawberry + pot
- lily + simple pot cover later
- bedding + terracotta pot

## 14.3 Prototype Pairing Examples

Prototype should include a small number of pairings.

Recommended:

1. Tomato + Basil
2. Tomato + Marigold
3. Strawberry + Terracotta Pot
4. Petunia + Lobelia
5. Pansy + Primrose
6. Busy Lizzie + Begonia for part-shade colour
7. Lily + Terracotta Pot, as gift presentation if suitable
8. Tomato + Compost
9. Strawberry + Compost
10. Herb Tray Mix: Basil + Parsley + Mint, with caution that mint should be potted separately in advice text

These do not all need full mechanical implementation in Prototype 0.1. They can appear first through special requests and notebook unlocks.

---

# 15. Companion and Bundle Displays

Prototype 0.1 should not include a full bundle management system.

However, it should support companion/bundle logic in special requests and simple display bonuses.

## 15.1 Prototype Approach

- special requests may ask for combinations
- display feedback may notice strong pairings
- add-on sales may occur when plants and sundries are both loaded/displayed
- notebook entries may unlock after successful pairings

## 15.2 Later Expansion

Later builds may allow:

- named bundles
- “3 for £9, any 9cm pot”
- basket kits
- grow-your-own kits
- gift pot sets
- companion planter displays
- saved bundle recipes
- staff-created bundles

---

# 16. Mixed Colour Trays

Cheap mixed-colour trays should have context-sensitive effects.

## 16.1 Where Mixed Colour Works

Mixed colour should help:

- cheerful market displays
- school fair displays
- bargain bedding sections
- front-step colour requests
- beginner bedding requests
- spring displays where abundance matters

## 16.2 Where Mixed Colour Hurts

Mixed colour may hurt:

- premium displays
- tidy modern displays
- colour-themed feature displays
- office/gift locations
- specialist garden events
- elegant or restrained palettes

## 16.3 Prototype Rule

For Prototype 0.1:

- mixed colour gives a small “cheerful” bonus
- mixed colour gives a small “untidy/refined display” penalty in locations that prefer clean presentation
- mixed trays do not help overall display quality automatically
- mixed trays are useful but not always optimal

This keeps mixed stock commercially plausible without making it universally best.

---

# 17. Colour and Style System

Prototype colour scoring should be simple.

The underlying design may support deeper colour logic later, but Prototype 0.1 should use broad categories.

## 17.1 Prototype Colour Logic

Displays may receive simple bonuses for:

- cheerful mixed spring colour
- warm colour grouping
- cool colour grouping
- purple/white grouping
- red/pink grouping
- green/herb practical grouping
- single featured colour on a small display

Displays may receive penalties for:

- random clash in premium locations
- dull display in gift/impulse locations
- too much mixed colour in tidy urban locations
- tired flowers breaking colour appeal

## 17.2 Future Depth

Later display scoring may consider:

- colour wheel harmony
- contrast
- height layering
- texture
- foliage/flower balance
- repeated colour accents
- seasonal palettes
- furniture colour/material
- decoration style
- customer demographic preference

The system should be designed with room for depth, but the prototype should stay readable.

---

# 18. Display Score

The game should use a broad display rating plus descriptive feedback.

Avoid exact numbers in the normal UI.

## 18.1 Display Rating Values

Suggested values:

- Poor
- Patchy
- Acceptable
- Good
- Strong
- Excellent

## 18.2 Display Feedback Examples

> The front table looks full and colourful.

> The busy lizzie tray is starting to look gappy.

> The floor lilies are catching attention, even though the setup still looks rough.

> The reduced tray is useful, but it is too prominent for gift buyers.

> The mixed bedding tray looks cheerful, but not especially tidy.

> The tomato and basil pairing drew interest from grow-your-own customers.

## 18.3 Hidden Score Components

Hidden scoring may include:

- fullness
- condition
- colour/style
- location fit
- furniture bonus
- tray neatness
- reduced stock penalty
- floor-space penalty
- pairing bonus
- sundry clutter penalty
- signage/label bonus, later

The player receives broad feedback, not spreadsheet detail.

---

# 19. Empty Gaps

Empty spaces matter.

A picked-over stall sells worse.

## 19.1 Empty Display Space Effects

Empty slots may:

- reduce browsing conversion
- reduce impulse buys
- make the stall look unsuccessful
- reduce perceived freshness
- increase negative display feedback
- make certain customers leave faster

## 19.2 Severity

Empty gaps should be meaningful but not frantic.

Prototype rule:

- empty front table spaces create clear penalty
- empty floor spaces create little or no penalty
- empty reduced space is not a penalty
- empty shelf spaces later may depend on furniture type

This keeps restocking important without making it a real-time chore.

---

# 20. Restocking During Trading

The player can restock during the trading day from van stock.

Opening the stock/display menu pauses the game.

Restocking is allowed between customer waves or during quiet moments.

Restocking costs time.

Possible restock actions:

- bring tray from van
- swap tray with van tray
- top up display from compatible van tray
- return low-value display stock to van
- replace empty tray
- bring lilies or pots to floor space
- bring sundries to floor space

Restocking cannot pull from home stock.

---

# 21. Display Degradation During Trading

Displays degrade lightly during the day.

Causes:

- sales create gaps
- customers disturb trays
- plants dry out
- flowers fade
- older plants need deadheading
- trays look messy
- reduced stock becomes more visible
- floor space becomes cluttered

This degradation creates mid-day decisions.

It should not dominate the game.

The player should feel:

> “I should tidy that tray before the afternoon rush.”

Not:

> “I am constantly fighting the interface.”

---

# 22. Plant Condition and Attractiveness

Degraded plants heavily penalise attractiveness.

Condition states affect display:

## Excellent

Strong display value.

## Good

Normal saleable display.

## Tired

Noticeable penalty, especially on front table or gift display.

## Past Peak

Strong penalty unless reduced honestly or sold to practical gardeners.

## Reduced

Lower visual value but acceptable in reduced area.

## Unsellable

Should not be displayed.

Displaying unsellable stock should create a severe reputation and attractiveness penalty if allowed at all.

---

# 23. Care Actions and Display

Care actions support display quality.

## 23.1 Water

Prevents dry-looking decline.

Important for:

- busy lizzies
- basil
- petunias
- fuchsias
- lettuce
- bedding in sun

## 23.2 Deadhead

Improves older flowering trays.

Important for:

- pansies
- petunias
- pelargoniums
- fuchsias
- busy lizzies

## 23.3 Tidy

Improves tray neatness and fullness perception.

Important for:

- partial trays
- mixed trays
- front table displays

## 23.4 Consolidate

Frees tray space and restores full-looking displays.

Important for:

- bedding
- herbs
- small pot stock
- high-turnover days

---

# 24. Reduced Stock Placement

Reduced stock can be placed in the dedicated reduced area or elsewhere.

## 24.1 Dedicated Reduced Area

Benefits:

- honest presentation
- lower reputation penalty
- attracts bargain hunters
- contains visual damage
- keeps main display cleaner

Costs:

- lower margin
- uses reduced capacity
- too much reduced stock still makes stall look tired

## 24.2 Reduced Stock in Main Display

Allowed, but risky.

Effects:

- may sell faster due to visibility
- may damage display attractiveness
- may repel gift buyers
- may lower perceived stock quality
- may create poor reviews if not clearly marked

This gives the player tactical flexibility.

---

# 25. Sundries Display

Sundries have special display rules.

## 25.1 Basic Sundries

Prototype basic sundries:

- multipurpose compost
- machine-made terracotta pots

Basic sundries:

- are non-perishable
- have small margins
- take space
- support add-on sales
- cannot be displayed attractively in the prototype
- live on floor space only

Compost should usually sit on the floor or beside/under the table.

Terracotta pots can sit on the floor and may pair with plants, but receive no early display bonus.

## 25.2 Sundries and Add-On Sales

Sundries sell best when paired with relevant plants.

Examples:

- tomatoes + compost
- strawberries + compost
- herbs + terracotta pot
- bedding + terracotta pot
- lily + pot presentation, if appropriate

## 25.3 Later Premium Sundries

Later sundries may provide display or category bonuses.

Examples:

- nice garden tools
- gloves
- bonsai shears
- decorative pot sets
- labels
- baskets
- watering cans
- ceramic pots
- premium compost brands

Example future effect:

> Bonsai shear set displayed near bonsai stock increases bonsai customer interest.

This should be a later merchandising depth layer.

---

# 26. Furniture and Decoration

Furniture and decoration are major long-term depth systems.

They should affect both:

1. what can be displayed
2. how well it sells

## 26.1 Furniture Grants Permissions

Examples:

- hanging rail allows hanging baskets
- tiered shelf allows layered small pots
- tall rack allows multiple shelf heights
- shade shelf protects delicate foliage
- herb rack improves herb display
- pot stand displays pots better

## 26.2 Furniture Grants Bonuses

Examples:

- wooden crates improve rustic/herb/cottage appeal
- tiered shelves improve visibility of small pots
- chalkboard improves featured category sales
- neat shelf improves urban/office display
- awning reduces weather/display degradation
- nice tablecloth improves gift display

Furniture is both functional and commercial.

---

# 27. Early Upgrade: Adjustable Shelf Rack

A common early upgrade should be an ugly but practical adjustable shelf rack.

Description:

> A basic adjustable metal/wire shelving rack on four casters, with upright posts and shelves that can be fixed at different heights.

Possible real-world reference category:

- adjustable wire shelving
- greenhouse staging
- shop display racking
- mobile shelving rack

Design role:

- ugly but useful
- maximises space
- supports layered display
- allows shelf-height decisions
- improves capacity before the stall becomes charming
- works well for cheap high-turnover stock
- may reduce charm/style score in prettier locations

## 27.1 Rack Mechanics

The rack may have:

- four vertical posts
- multiple shelf height positions
- adjustable shelves
- caster base
- limited weight per shelf
- height clearance rules

## 27.2 Shelf Height Logic

Plant height and shape affect what fits.

Examples:

- small bedding trays fit on low-clearance shelves
- herbs fit on medium shelves
- lilies require tall clearance or floor space
- trailing plants need edge or hanging space
- compost is too bulky and stays on floor

The prototype does not need full rack implementation, but the display framework should anticipate it.

---

# 28. Plant Height and Shape

Plant height and shape should matter, but Prototype 0.1 can keep it simple.

## 28.1 Prototype Display Roles

Use broad roles:

- tray-filler
- compact
- upright
- tall
- trailing
- bulky
- feature-pot
- sundry

Examples:

- pansies: tray-filler
- busy lizzies: tray-filler
- tomatoes: upright
- strawberries: compact
- lobelia: trailing
- lilies: tall / feature-pot
- compost: bulky / sundry
- terracotta pots: sundry / stackable

## 28.2 Future Display Geometry

Later systems can consider:

- shelf height
- plant height
- trailing over edges
- tall plants blocking small plants
- layered visibility
- back/front placement
- vertical rhythm
- shape contrast
- foliage/flower texture

This is part of the intended endgame merchandising depth.

---

# 29. Labels and Signage

Prototype 0.1 should keep signage minimal.

## 29.1 Prototype Signage

Include:

- basic price labels
- reduced label/sign

Do not include yet:

- chalkboard featured category
- 3-for offers
- handwritten promotional signs
- brand signage
- plant care labels
- premium display cards

## 29.2 Later Signage

Later builds may include:

- chalkboard signs
- “3 for £9, any 9cm pot”
- “Tomatoes today”
- “Bee-friendly plants”
- “Easy plants”
- “Reduced”
- “Grown locally”
- “Great for shade”
- “Pet-safe options”
- gift tags
- care cards

Signage should eventually become part of merchandising and skill expression.

---

# 30. Location-Specific Display Preferences

Locations should reward different display styles.

## 30.1 Market Square

Likes:

- colourful
- full
- approachable
- bargain-visible
- mixed practical/gift stock

Penalises:

- empty front table
- confusing layout
- very tired stock
- overpriced common plants

## 30.2 Village Green

Likes:

- traditional
- cottage
- seasonal
- outdoor colour
- bedding
- lilies in flower
- practical grow-your-own
- rustic crates later

Penalises:

- overly modern style
- poor-condition bedding
- too much indoor/urban stock
- random mixed displays if not cheerful

## 30.3 Station Corner

Likes:

- tidy
- compact
- giftable
- quick-to-read
- high-impact lilies
- small pots
- clean floor display

Penalises:

- clutter
- bulky compost focus
- gappy trays
- tired reduced stock near the front
- outdoor-only stock dominating

## 30.4 Farmers’ Market Later

Likes:

- practical
- labelled
- edible
- herbs
- tomatoes
- strawberries
- compost/pots
- rustic abundance

Penalises:

- purely decorative stock
- high prices
- tired herbs
- over-styled luxury display

## 30.5 Office Courtyard Later

Likes:

- modern
- tidy
- compact
- giftable
- houseplant-heavy
- clean shelving

Penalises:

- rough floor clutter
- compost bags
- rustic mess
- reduced stock
- outdoor bedding dominance

---

# 31. Reputation and Display

Poor display affects both sales and reputation.

## 31.1 Sales Effects

Display strongly affects:

- browsing conversion
- impulse buys
- gift sales
- premium price tolerance
- special request confidence

## 31.2 Reputation Effects

Display can slightly affect reputation and reviews.

Examples:

Positive:

> The stall always looks full and cared for.

> Lovely colourful display today.

Negative:

> A few plants looked tired.

> The table looked picked over by lunchtime.

> Good bargains, but not the prettiest setup.

Reputation penalties should be light unless poor display is repeated or extreme.

---

# 32. Starter Display Aesthetic

The starting display should be properly rough.

Not cute from the start.

Initial materials:

- ugly transit-style van
- folding trestle table
- cheap black/plastic nursery trays
- floor stacks
- rough reduced basket
- handwritten price labels
- no branded signage
- no tablecloth
- no decorative crates
- no charming awning
- no nice shelves

The charm comes from:

- plants
- colour
- player effort
- gradual upgrades
- better display choices
- earned decorations

This supports progression.

The first display should feel like:

> A rough little plant stall that could become something.

Not:

> A finished cosy boutique.

---

# 33. Prototype Display Loop

The prototype display loop should work as follows:

1. Player loads van from home stock.
2. Player arrives at location.
3. Player places trays/pots/sundries into display zones.
4. Trading begins.
5. Customers buy individual plants.
6. Trays become gappier.
7. Plants become dry/tired if ignored.
8. Player pauses to choose actions.
9. Avatar waters, tidies, consolidates, restocks, or reduces.
10. Display score updates.
11. Sales respond to display state.
12. Unsold stock returns to van/home at close.
13. Stock condition updates.

This loop makes display labour central to selling.

---

# 34. Prototype Required Features

Prototype 0.1 should include:

- trestle table with limited tray spaces
- floor space
- reduced area
- van storage
- tray fullness
- tray tidying
- tray consolidation
- move tray to/from van
- restock from van during paused menu
- plant condition effect on attractiveness
- empty space penalty
- simple colour/style feedback
- simple location display preferences
- basic price labels
- reduced labels
- basic sundry floor rules
- lilies as floor-friendly high-margin feature pots
- special request pairings
- display rating plus descriptive feedback

---

# 35. Prototype Exclusions

Prototype 0.1 should not include:

- full adjustable shelf rack mechanics
- deep colour wheel scoring
- full bundle system
- multi-buy offers such as “3 for £9”
- chalkboard signs
- decorative furniture bonuses
- premium sundry display bonuses
- staff display automation
- saved layouts
- advanced shelf-height optimisation
- hanging baskets
- complex lighting/shade display effects
- exact individual plant placement

These can come later.

---

# 36. Future Expansion

Later display expansions may include:

- adjustable shelving racks
- wooden crates
- tiered displays
- hanging rails
- herb racks
- shade shelving
- awnings
- chalkboard signs
- tablecloths
- branded signage
- decorative pots
- staff-assisted merchandising
- saved display layouts
- bundle displays
- multi-buy offers
- seasonal display themes
- premium gift displays
- bonsai/exotic specialist displays
- advanced colour and height scoring
- display competitions or events

The display system should be deep enough to support long-term optimisation.

---

# 37. Display Success Criteria

The display system succeeds if:

- the player cares what is visible
- the player notices when trays become gappy
- consolidation feels useful
- clearing a tray feels satisfying
- bringing a fresh tray from the van feels like a good decision
- degraded plants visibly hurt attractiveness
- reduced stock placement matters
- floor lilies feel like a good rough early-game tactic
- sundries are useful but visually awkward
- locations reward different display styles
- furniture upgrades feel valuable
- the player starts rough and earns charm over time

The system fails if:

- display is purely cosmetic
- the player ignores tray fullness
- consolidation is not worth doing
- all display zones feel the same
- floor space is as good as table space
- degraded plants do not matter
- restocking is too frantic
- arranging stock becomes fiddly rather than strategic
- the starting stall feels too polished

---

# 38. Recommended Next Document

The next document should be:

## Document 10 — Economy, Pricing and Stock Condition Specification

Reason:

Display now defines how stock is made visible and attractive. The next major system is how stock converts into money, how pricing bands work, how stock degrades, and how the economy creates pressure.

Document 10 should define:

- starting cash
- wholesale costs
- retail price bands
- margin targets
- customer price tolerance
- reduced pricing
- stock condition transitions
- perishability
- degradation from age/transit/display
- home vs van vs display storage effects
- daily and weekly economy targets
- small-order fee integration
- developer overlay economy controls

---

# 39. Final Display Definition

The display system is the practical merchandising minigame at the heart of The Garden Stall.

Stock arrives in trays and batches, customers buy individual units, and the player must keep limited display space full, tidy, attractive, and commercially appropriate. Trays become gappy as plants sell. Plants degrade if ignored. Consolidating trays frees space. Tidying improves presentation. The van holds more stock than the table, but only displayed stock sells passively. Floor space is rough and low-value, but useful for lilies and sundries. Reduced stock can recover value but must be presented honestly. Furniture later expands both capacity and strategy.

The core question is:

> “What should be on show, how good does it look, and what labour is worth spending to keep it selling?”
