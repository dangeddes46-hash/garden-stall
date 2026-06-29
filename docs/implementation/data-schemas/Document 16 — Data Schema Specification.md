# THE GARDEN STALL
## Document 16 — Data Schema Specification

**Working Title:** The Garden Stall  
**Document Type:** Data Schema / Prototype Data Model / Implementation Foundation  
**Status:** Draft 001  
**Purpose:** Define the core data structures required for Prototype 0.1, including plants, stock batches, trays, display zones, customers, locations, suppliers, requests, orders, sales, notebook entries, discoveries, skill unlocks, staff-pressure metrics, playtest reports, and debug exports.

---

# 1. Purpose of This Document

This document defines the first practical data model for The Garden Stall.

The previous documents describe the game design. This document translates that design into structured data that can be used by a prototype builder.

The goal is not to create a perfect final database.

The goal is to define a clean, readable, JSON-friendly data structure for Prototype 0.1.

Prototype 0.1 should be able to run mostly from structured data rather than hardcoded logic.

The core schema principle is:

> The game should be easy to tune by editing data.

---

# 2. Scope

This document covers data structures for:

- game state
- plants
- plant tags
- stock batches
- stock units
- trays
- display zones
- locations
- route and fuel costs
- suppliers
- wholesaler listings
- orders
- pricing
- customers
- customer quirks
- special requests
- sales
- stock condition
- moisture
- flags
- notebook entries
- discoveries
- skill gates
- Ask a Follow-Up
- staff pressure metrics
- daily reports
- weekly reports
- playtest reports
- debug exports

This document does not define final production code architecture.

It should support a browser-based Prototype 0.1.

---

# 3. Data Format Recommendation

Prototype 0.1 should use JSON-style data.

Recommended:

- static game data in `.json` files
- runtime state in JavaScript objects
- exportable debug state as JSON
- readable playtest summary as Markdown or plain text

Possible data folder:

```text
/prototype/data/
├─ plants.json
├─ locations.json
├─ suppliers.json
├─ requests.json
├─ customer-archetypes.json
├─ customer-quirks.json
├─ skills.json
├─ discovery-rules.json
└─ prototype-week-script.json
```

Runtime state may be generated from these files.

---

# 4. ID Naming Rules

Every major entity should have a stable ID.

Use lowercase kebab-case.

Examples:

```text
plant-tomato
plant-strawberry
location-village-green
supplier-county-plant-wholesale
request-vague-perfect-plant
skill-ask-follow-up
customer-archetype-gift-buyer
```

Rules:

- IDs should not change once saved in data.
- Display names may change.
- IDs should be human-readable.
- Avoid spaces in IDs.
- Avoid relying on array order.

---

# 5. Global Game State

The game state represents the current run.

Example:

```json
{
  "runId": "run-2026-06-29-001",
  "prototypeVersion": "0.1",
  "randomSeed": "garden-001",
  "currentDay": 3,
  "currentPhase": "trading",
  "cash": 64.5,
  "startingCash": 80,
  "time": {
    "daySegment": "afternoon",
    "currentMinute": 315,
    "timeScale": 1,
    "isPaused": false
  },
  "selectedLocationId": "location-market-square",
  "currentWeatherId": "weather-mild-spring",
  "inventory": {},
  "display": {},
  "customers": {},
  "notebook": {},
  "logs": {},
  "debug": {}
}
```

`currentPhase` values may include:

- day0-order
- morning-collection
- weather
- location-selection
- van-loadout
- route-confirmation
- display-setup
- trading
- daily-summary
- evening-order
- weekly-summary
- freeplay
- debug

---

# 6. Plant Schema

Plants define the underlying product type.

A plant is not the same as a stock batch.

Example:

```json
{
  "id": "plant-tomato",
  "displayName": "Tomato Plants",
  "category": "grow-your-own",
  "subCategory": "edible",
  "liveViewAssetId": "asset-tray-tomato",
  "heroAssetId": "asset-hero-tomato",
  "defaultTrayFormat": "medium-pot-tray",
  "defaultUnitsPerBatch": 15,
  "defaultWholesaleBatchCost": 30,
  "basePrices": {
    "bargain": 2.5,
    "normal": 3.5,
    "premium": 4.5,
    "reduced": 1.75
  },
  "tags": [
    "edible",
    "sun",
    "patio",
    "beginner-friendly",
    "grow-your-own"
  ],
  "displayRole": "upright-practical",
  "heightClass": "upright",
  "moistureProfile": "moderate",
  "fragility": "medium",
  "longevity": "medium",
  "marginProfile": "medium",
  "conditionRisk": "moderate",
  "notes": {
    "basic": "Reliable grow-your-own starter stock.",
    "care": "Needs sun and regular watering.",
    "retail": "Pairs well with basil, marigolds, compost, and pots."
  },
  "prototypeIncluded": true
}
```

---

# 7. Plant Categories

Recommended plant categories:

- grow-your-own
- herb
- bedding
- seasonal-colour
- gift
- sundry
- houseplant, later
- perennial, later
- shrub, later
- specialist, later

Prototype 0.1 categories:

- grow-your-own
- herb
- bedding
- seasonal-colour
- gift
- sundry

---

# 8. Plant Tags

Tags are used for matching plants to customers, locations, requests, displays, and notebook discoveries.

Example tags:

```json
[
  "edible",
  "flowering",
  "sun",
  "shade",
  "part-shade",
  "patio",
  "balcony",
  "beginner-friendly",
  "giftable",
  "traditional",
  "colourful",
  "spring",
  "thirsty",
  "fragile",
  "short-window",
  "low-margin",
  "high-margin",
  "add-on",
  "bulky",
  "pet-warning"
]
```

Tags should be broad and playable.

Avoid excessive botanical detail.

---

# 9. Tray Format Schema

Tray formats define physical display footprint and unit count.

Example:

```json
{
  "id": "medium-pot-tray",
  "displayName": "Medium Pot Tray",
  "footprint": {
    "widthSlots": 1,
    "heightSlots": 1
  },
  "gridDescription": "3x5",
  "defaultUnitCapacity": 15,
  "compatiblePlantSizeClasses": [
    "medium-pot",
    "upright"
  ],
  "canMixPlants": true,
  "notes": "Used for tomatoes, strawberries, petunias, begonias, pelargoniums, fuchsias, and larger herbs."
}
```

Required tray formats:

- small-pot-tray
- medium-pot-tray
- large-pot-tray
- feature-pot-group
- sundry-stack

---

# 10. Stock Batch Schema

A stock batch represents stock purchased from the wholesaler.

Example:

```json
{
  "id": "batch-00042",
  "plantId": "plant-tomato",
  "supplierId": "supplier-county-plant-wholesale",
  "purchaseDay": 2,
  "unitsPurchased": 15,
  "unitsRemaining": 12,
  "batchCost": 30,
  "averageUnitCost": 2,
  "startingCondition": "good",
  "currentCondition": "good",
  "moisture": "watered",
  "flags": [
    "in-bud"
  ],
  "ageDays": 1,
  "locationState": "home",
  "reduced": false,
  "priceBand": "normal",
  "sourceListingId": "listing-day2-tomato",
  "history": []
}
```

A batch should track:

- plant type
- supplier
- cost
- units
- condition
- moisture
- flags
- age
- current location
- price band
- reduced status
- history

---

# 11. Stock Location State

Stock can exist in several places.

Allowed values:

- home
- van
- display
- reduced-area
- sold
- discarded

Example:

```json
"locationState": "van"
```

Stock may also reference a display zone or tray if placed.

---

# 12. Condition Values

Core condition values:

```json
[
  "excellent",
  "good",
  "tired",
  "past-peak",
  "unsellable"
]
```

Condition is biological/commercial quality.

It is separate from moisture and flags.

---

# 13. Moisture Values

Moisture values:

```json
[
  "waterlogged",
  "watered",
  "damp",
  "dry",
  "bone-dry"
]
```

Moisture is tracked separately from condition.

A plant may be Good but Dry.

A plant may be Tired but Watered.

---

# 14. Stock Flags

Flags describe additional state.

Prototype flags:

```json
[
  "dry",
  "leggy",
  "in-bud",
  "flowering",
  "past-flower",
  "mixed-quality",
  "reduced",
  "fragile",
  "recently-watered",
  "recently-tidied",
  "recently-deadheaded",
  "needs-deadheading",
  "short-window",
  "waterlogged-risk",
  "pet-warning"
]
```

Flags should be additive.

They should not replace the condition or moisture scales.

---

# 15. Display Zone Schema

Display zones define where stock can be placed during trading.

Example:

```json
{
  "id": "zone-front-table",
  "displayName": "Front Trestle Table",
  "zoneType": "table",
  "capacityTraySlots": 4,
  "allowedTrayFormats": [
    "small-pot-tray",
    "medium-pot-tray"
  ],
  "displayValue": "high",
  "conditionPenaltyMultiplier": 1.5,
  "emptyPenalty": "high",
  "notes": "Best display zone. Empty or tired trays are very visible."
}
```

Required prototype display zones:

- front-table
- floor-space
- reduced-area
- van-storage
- home-stock

---

# 16. Display Instance Schema

The runtime display state tracks what is currently placed.

Example:

```json
{
  "displayId": "display-day3-market-square",
  "locationId": "location-market-square",
  "zones": {
    "zone-front-table": {
      "items": [
        {
          "displayItemId": "display-item-001",
          "stockBatchIds": ["batch-00042"],
          "trayFormatId": "medium-pot-tray",
          "unitsDisplayed": 12,
          "fullnessState": "part-full",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ]
    }
  },
  "displayRating": "good",
  "displayNotes": []
}
```

Display state must track:

- what stock is visible
- which zone it occupies
- how full each tray is
- where it is placed
- display rating
- active notes/warnings

---

# 17. Tray Fullness Values

Tray fullness states:

```json
[
  "full",
  "part-full",
  "gappy",
  "sparse",
  "empty"
]
```

Suggested thresholds:

- full: 80–100%
- part-full: 50–79%
- gappy: 25–49%
- sparse: 1–24%
- empty: 0%

---

# 18. Location Schema

Locations define trading sites.

Example:

```json
{
  "id": "location-village-green",
  "displayName": "Village Green",
  "prototypeIncluded": true,
  "pitchFee": 4,
  "fuelRouteCost": 14,
  "footfallProfile": "steady",
  "pace": "calm",
  "customerArchetypeWeights": {
    "traditional-gardener": 0.35,
    "new-gardener": 0.2,
    "gift-buyer": 0.15,
    "bargain-hunter": 0.15,
    "herb-kitchen-buyer": 0.1,
    "flat-balcony-grower": 0.05
  },
  "preferredTags": [
    "traditional",
    "bedding",
    "spring",
    "grow-your-own",
    "colourful"
  ],
  "weakTags": [
    "urban-gift",
    "high-price"
  ],
  "displayPreferences": {
    "likes": [
      "full-trays",
      "seasonal-colour",
      "traditional-layout"
    ],
    "dislikes": [
      "messy-reduced-front",
      "overpriced-common-stock"
    ]
  },
  "backgroundAssetId": "bg-village-green",
  "notes": {
    "basic": "Traditional outdoor gardeners and familiar spring colour.",
    "unlockable": []
  }
}
```

Prototype locations:

- location-market-square
- location-village-green
- location-station-corner

Future visual benchmark:

- location-soho-night-market

---

# 19. Route / Fuel Schema

Fuel can be stored as route segments or location total.

Prototype can use simple location total.

Example simple model:

```json
{
  "locationId": "location-station-corner",
  "route": [
    "home",
    "supplier-county-plant-wholesale",
    "location-station-corner",
    "home"
  ],
  "fuelCost": 10,
  "distanceBand": "short-urban",
  "notes": "Short but urban stop-start route."
}
```

Later route segment model:

```json
{
  "segmentId": "route-home-to-wholesaler",
  "from": "home",
  "to": "supplier-county-plant-wholesale",
  "fuelCost": 3,
  "distanceBand": "short"
}
```

Prototype 0.1 can use the simple model.

---

# 20. Supplier Schema

Supplier data defines wholesaler behaviour.

Example:

```json
{
  "id": "supplier-county-plant-wholesale",
  "displayName": "County Plant Wholesale",
  "supplierType": "general-trade",
  "orderFee": 5,
  "feeFreeThreshold": 100,
  "dailyRefresh": true,
  "trustworthiness": "mixed",
  "visualStyle": "bland-trade-website",
  "availableTabs": [
    "plants",
    "sundries",
    "special-offers"
  ],
  "notes": {
    "basic": "Generic trade supplier with frequent sold-out lines.",
    "warning": "Special offers are usually good, but not always."
  }
}
```

Prototype supplier:

- supplier-county-plant-wholesale

---

# 21. Wholesaler Listing Schema

Listings are daily buyable offers.

Example:

```json
{
  "id": "listing-day3-busy-lizzies",
  "dayAvailable": 3,
  "supplierId": "supplier-county-plant-wholesale",
  "plantId": "plant-busy-lizzie",
  "batchType": "tray",
  "quantity": 24,
  "wholesalePrice": 24,
  "suggestedRetailNormal": 2,
  "marginRating": "good",
  "condition": "good",
  "availability": "available",
  "categoryTags": [
    "bedding",
    "colourful",
    "shade"
  ],
  "supplierNote": "Bright spring colour. Good for shady doorsteps.",
  "locationFitHints": [
    "Village Green",
    "Market Square"
  ],
  "specialOffer": false,
  "trueValueRating": "fair"
}
```

Availability values:

- available
- limited
- sold-out

Margin ratings:

- poor
- fair
- good
- excellent
- risky

Batch conditions:

- fresh-batch
- budding
- in-flower
- slightly-leggy
- mixed-quality
- past-best-soon
- clearance
- sold-out

---

# 22. Order Schema

Orders represent evening wholesaler orders.

Example:

```json
{
  "orderId": "order-day3-evening",
  "dayPlaced": 3,
  "supplierId": "supplier-county-plant-wholesale",
  "collectionDay": 4,
  "items": [
    {
      "listingId": "listing-day3-busy-lizzies",
      "plantId": "plant-busy-lizzie",
      "quantityBatches": 1,
      "units": 24,
      "cost": 24
    }
  ],
  "subtotal": 76,
  "orderFee": 5,
  "total": 81,
  "feeFreeThreshold": 100,
  "cashAfterOrder": 18
}
```

Orders should become stock batches on collection.

---

# 23. Pricing Schema

Each plant has base price bands.

Runtime stock can override the chosen price band.

Example:

```json
{
  "plantId": "plant-potted-lily",
  "basePrices": {
    "bargain": 5,
    "normal": 6.5,
    "premium": 8,
    "reduced": 3.25
  },
  "defaultPriceBand": "normal"
}
```

Allowed price bands:

- bargain
- normal
- premium
- reduced

Reduced is usually approximately half normal.

---

# 24. Customer Archetype Schema

Customer archetypes define broad patterns.

Example:

```json
{
  "id": "customer-archetype-gift-buyer",
  "displayName": "Gift Buyer",
  "priceTolerance": "medium-high",
  "patience": "medium",
  "preferredTags": [
    "giftable",
    "flowering",
    "excellent-condition",
    "attractive-display"
  ],
  "dislikedTags": [
    "tired",
    "past-peak",
    "messy-reduced"
  ],
  "commonLocations": [
    "location-market-square",
    "location-station-corner"
  ],
  "requestStyle": "specific-but-time-pressed",
  "notes": "May pay premium for strong condition and presentation."
}
```

Prototype archetypes:

- new-gardener
- flat-balcony-grower
- gift-buyer
- traditional-gardener
- herb-kitchen-buyer
- bargain-hunter

---

# 25. Individual Customer Schema

Each run generates finite individual customers.

Example:

```json
{
  "id": "customer-0007",
  "displayName": "Mrs. Hanley",
  "archetypeId": "customer-archetype-traditional-gardener",
  "secondaryArchetypeIds": [
    "customer-archetype-bargain-hunter"
  ],
  "homeContext": {
    "hasGarden": true,
    "hasBalcony": false,
    "light": "part-shade",
    "hasPets": false
  },
  "preferences": {
    "likedTags": [
      "purple",
      "traditional",
      "spring-colour"
    ],
    "dislikedTags": [
      "strong-scent"
    ],
    "budgetRange": "low-medium"
  },
  "quirks": [
    "likes-purple",
    "vague-describer"
  ],
  "memory": {
    "knownToPlayer": false,
    "previousPurchases": [],
    "satisfaction": 0,
    "trust": 0,
    "knownFacts": []
  }
}
```

Not every customer needs quirks.

8–10 of the initial 30 should have simple quirks.

---

# 26. Customer Quirk Schema

Quirks define individual detail.

Example:

```json
{
  "id": "quirk-has-cats",
  "displayName": "Has cats",
  "hiddenByDefault": true,
  "relevantTags": [
    "pet-warning",
    "giftable"
  ],
  "requestClues": [
    "It's for my sister's flat — she's got cats everywhere."
  ],
  "effects": {
    "avoidPlantTags": [
      "pet-warning"
    ]
  },
  "notebookNote": "Avoid recommending lilies to this customer unless a clear warning is given."
}
```

Possible quirks:

- has-cats
- shady-doorstep
- loves-purple
- buys-for-child
- bargain-first
- vague-describer
- herb-cook
- dislikes-strong-scent
- forgets-plant-names
- hurry-gift-buyer

---

# 27. Special Request Schema

Special requests define customer interaction events.

Example:

```json
{
  "id": "request-vague-perfect-plant",
  "displayName": "Vague Customer Perfect Plant",
  "requestText": "I need something nice for outside.",
  "eligibleArchetypes": [
    "customer-archetype-new-gardener",
    "customer-archetype-traditional-gardener"
  ],
  "requiredKnownFacts": [],
  "hiddenNeedTags": [
    "outdoor",
    "colourful"
  ],
  "possibleFollowUps": [
    {
      "id": "followup-sun-or-shade",
      "question": "Is it sunny or shady?",
      "reveals": {
        "light": "part-shade",
        "additionalNeedTags": [
          "part-shade"
        ]
      }
    },
    {
      "id": "followup-pot-or-border",
      "question": "Is it for a pot or a border?",
      "reveals": {
        "containerUse": "pot",
        "additionalNeedTags": [
          "patio"
        ]
      }
    }
  ],
  "goodPlantIds": [
    "plant-busy-lizzie",
    "plant-begonia"
  ],
  "acceptablePlantIds": [
    "plant-primrose",
    "plant-pansy"
  ],
  "badPlantIds": [
    "plant-tomato"
  ],
  "perfectPlantIds": [
    "plant-busy-lizzie"
  ],
  "successRewards": {
    "notebookDiscoveryIds": [
      "discovery-vague-customer-followup"
    ],
    "skillUnlockIds": [
      "skill-ask-follow-up"
    ],
    "xp": 1
  }
}
```

Prototype requires ten request templates.

---

# 28. Follow-Up Question Schema

Follow-ups are part of special requests.

Example:

```json
{
  "id": "followup-has-pets",
  "question": "Is it going to a home with pets?",
  "reveals": {
    "hasPets": true,
    "avoidTags": [
      "pet-warning"
    ]
  },
  "customerMemoryFact": "has-pets"
}
```

Prototype unlock:

- skill-ask-follow-up

Until unlocked, follow-up options may be hidden or disabled.

---

# 29. Sale Event Schema

A sale event records a purchase.

Example:

```json
{
  "saleId": "sale-day3-0009",
  "day": 3,
  "timeMinute": 224,
  "customerId": "customer-0007",
  "customerArchetypeId": "customer-archetype-traditional-gardener",
  "items": [
    {
      "plantId": "plant-tomato",
      "stockBatchId": "batch-00042",
      "quantity": 2,
      "unitPrice": 3.5,
      "priceBand": "normal",
      "unitCost": 2
    }
  ],
  "totalRevenue": 7,
  "estimatedGrossProfit": 3,
  "locationId": "location-village-green",
  "displayRatingAtSale": "good",
  "requestId": null,
  "satisfactionDelta": 1,
  "notes": [
    "Matched traditional gardener demand."
  ]
}
```

Sales should feed:

- cash
- inventory
- notebook
- customer memory
- daily report
- weekly report
- discovery rules

---

# 30. Customer Browse Event Schema

Not every customer buys.

Browse events help debug why.

Example:

```json
{
  "eventId": "browse-day4-0012",
  "day": 4,
  "timeMinute": 145,
  "customerId": "customer-0011",
  "locationId": "location-station-corner",
  "visibleStockSummary": {
    "giftableCount": 2,
    "reducedCount": 5,
    "gappyTrayCount": 2
  },
  "result": "no-sale",
  "reasonTags": [
    "no-suitable-stock",
    "display-too-gappy"
  ],
  "debugSaleScore": 42
}
```

This is important for playtest reports and tuning.

---

# 31. Notebook Entry Schema

Notebook entries record learned knowledge.

Example:

```json
{
  "id": "notebook-plant-tomato",
  "entryType": "plant",
  "subjectId": "plant-tomato",
  "title": "Tomato Plants",
  "unlockState": "basic",
  "sections": {
    "basic": "Reliable grow-your-own starter stock.",
    "salesNotes": [
      "Sold well to grow-your-own customers at Village Green."
    ],
    "pairings": [
      "Tomato + Basil"
    ],
    "mistakes": []
  },
  "lastUpdatedDay": 3,
  "newSinceViewed": true
}
```

Entry types:

- plant
- customer-archetype
- individual-customer
- location
- supplier
- pairing
- mistake
- skill
- staff-pressure
- business-note

---

# 32. Discovery Rule Schema

Discovery rules define when notebook entries or skills unlock.

Example:

```json
{
  "id": "discovery-tomato-basil-pairing",
  "displayName": "Kitchen Starter Pairing",
  "trigger": {
    "type": "sale-combo",
    "plantIds": [
      "plant-tomato",
      "plant-basil"
    ],
    "customerNeedTags": [
      "grow-your-own",
      "kitchen"
    ]
  },
  "effects": {
    "notebookEntryIds": [
      "notebook-pairing-tomato-basil"
    ],
    "xp": 1
  },
  "message": "Pairing discovered: Tomato and basil work well for sunny kitchen growers."
}
```

Discovery trigger types may include:

- sale-combo
- perfect-request
- failed-request
- location-success
- reduced-recovery
- supplier-offer-spotted
- display-maintained
- customer-returned-happy
- stock-loss

---

# 33. Skill Schema

Skills define player progression.

Example:

```json
{
  "id": "skill-ask-follow-up",
  "displayName": "Ask a Follow-Up",
  "skillType": "special-unlock",
  "branch": "customer-reading",
  "visibleInTree": false,
  "unlockCondition": {
    "type": "perfect-request",
    "requestId": "request-vague-perfect-plant"
  },
  "xpCost": 0,
  "effects": {
    "allowFollowUpQuestions": true,
    "maxFollowUpsPerRequest": 1
  },
  "unlockMessage": "Some customers do not know how to ask for what they need. You can now ask one extra question during vague requests."
}
```

Skill types:

- tree-node
- special-unlock
- passive-bonus
- information-unlock

Prototype should include Ask a Follow-Up.

Full skill tree can remain mostly unimplemented.

---

# 34. Skill Gate Progress Schema

Track progress toward unlocks.

Example:

```json
{
  "skillId": "skill-tray-discipline",
  "gateProgress": {
    "requiredType": "display-good-full-day",
    "requiredCount": 1,
    "currentCount": 0,
    "completed": false
  },
  "unlocked": false,
  "purchased": false
}
```

Prototype can track some gates even if the full skill tree is hidden.

---

# 35. Staff Pressure Metric Schema

Staff are not active in Prototype 0.1, but pressure should be tracked.

Example:

```json
{
  "day": 5,
  "metrics": {
    "dryTrayEvents": 4,
    "boneDryEvents": 1,
    "gappyTrayMinutes": 38,
    "missedRestockOpportunities": 3,
    "missedCustomers": 2,
    "requestConflictEvents": 1,
    "lateReductionEvents": 2
  },
  "suggestedFutureRole": "display-helper",
  "summary": "A display helper could have kept the front table fuller during the afternoon rush."
}
```

Suggested future role values:

- care-helper
- display-helper
- sales-helper
- plant-knowledge-helper
- back-of-house-helper
- none

---

# 36. Daily Report Schema

Daily reports summarise outcomes.

Example:

```json
{
  "day": 3,
  "locationId": "location-market-square",
  "startingCash": 42,
  "endingCashBeforeOrder": 101,
  "salesRevenue": 88,
  "fuelCost": 8,
  "pitchFee": 5,
  "stockSold": [
    {
      "plantId": "plant-tomato",
      "quantity": 5,
      "revenue": 17.5
    }
  ],
  "reducedStockSold": 3,
  "unsellableLossCost": 0,
  "stockRemainingValueEstimate": 64,
  "notebookUpdates": [
    "notebook-pairing-strawberry-pot"
  ],
  "discoveries": [
    "discovery-strawberry-pot"
  ],
  "staffPressure": {},
  "debugWarnings": []
}
```

Reports should be usable both for UI and export.

---

# 37. Weekly Report Schema

Weekly reports summarise the prototype run.

Example:

```json
{
  "runId": "run-2026-06-29-001",
  "prototypeVersion": "0.1",
  "daysCompleted": 7,
  "startingCash": 80,
  "endingCash": 156,
  "salesRevenue": 522,
  "wholesaleSpend": 312,
  "fuelCosts": 72,
  "pitchFees": 26,
  "orderFees": 25,
  "estimatedSaleableStockValue": 96,
  "reducedStockValue": 18,
  "unsellableLossCost": 12,
  "bestSellingPlants": [],
  "worstSellingPlants": [],
  "locationsSummary": [],
  "customersSummary": [],
  "knowledgeGained": [],
  "staffPressureSummary": {},
  "debugInterventions": [],
  "playtestNotes": []
}
```

Weekly report tabs can read from this data.

---

# 38. Debug State Schema

Debug export should include the full game state.

Example top-level export:

```json
{
  "exportType": "debug-state",
  "exportVersion": "0.1",
  "createdAt": "2026-06-29T12:00:00",
  "gameState": {},
  "staticDataVersions": {
    "plants": "0.1",
    "locations": "0.1",
    "suppliers": "0.1",
    "requests": "0.1"
  },
  "logs": {
    "sales": [],
    "customers": [],
    "stock": [],
    "requests": [],
    "notebook": [],
    "debugActions": []
  }
}
```

The export should be machine-readable.

---

# 39. Playtest Report Schema

Playtest report should be readable and structured.

Example:

```json
{
  "reportId": "playtest-001",
  "runId": "run-2026-06-29-001",
  "prototypeVersion": "0.1",
  "testerName": "Daniel",
  "summary": {
    "completedWeek": true,
    "endingCash": 156,
    "majorIssue": "Stock degradation may be too gentle.",
    "overallResult": "Loop understood."
  },
  "metrics": {},
  "knowledgeGained": [],
  "balanceWarnings": [],
  "debugInterventions": [],
  "generatedMarkdown": "# Playtest 001..."
}
```

The game should export:

- JSON debug report
- Markdown/text readable report

---

# 40. Prototype Week Script Schema

The first week should be controlled with some variation.

Example:

```json
{
  "day": 3,
  "wholesalerAvailability": [
    "plant-basil",
    "plant-mint",
    "plant-parsley"
  ],
  "specialOfferIds": [
    "listing-day3-special-busy-lizzies"
  ],
  "requestPoolIds": [
    "request-tomato-starter",
    "request-cheerful-gift"
  ],
  "weatherId": "weather-mild-spring",
  "pressureLevel": "medium",
  "tutorialHints": [
    "special-offer-intro"
  ]
}
```

Prototype week days:

- Day 0: opening order
- Day 1: simple selling
- Day 2: sundries and spring colour
- Day 3: special offer and moisture pressure
- Day 4: pairing and vague customer
- Day 5: higher customer pressure
- Day 6: bad offer or stronger location lesson
- Day 7: final pressure and weekly report

---

# 41. Weather Schema

Weather can be simple in Prototype 0.1.

Example:

```json
{
  "id": "weather-mild-spring",
  "displayName": "Mild Spring Day",
  "effects": {
    "footfallMultiplier": 1,
    "dryingMultiplier": 1,
    "giftBuyerMultiplier": 1
  },
  "description": "A mild, usable trading day."
}
```

Prototype weather types:

- mild-spring
- sunny
- grey-cool
- light-rain
- windy

Weather should affect:

- footfall
- drying
- customer mood
- display stress

Keep it light.

---

# 42. Asset Reference Schema

Art assets should be referenced by ID.

Example:

```json
{
  "id": "bg-village-green",
  "assetType": "background",
  "path": "assets/backgrounds/village-green.png",
  "status": "placeholder",
  "notes": "English church garden tea-time mood."
}
```

Asset types:

- background
- live-plant-tray
- plant-hero
- vehicle
- furniture
- customer-silhouette
- customer-card
- ui-panel
- icon
- ambient-animation

Prototype can use placeholders.

---

# 43. Admin Action Log Schema

Admin/debug interventions should be logged.

Example:

```json
{
  "actionId": "debug-action-0042",
  "day": 4,
  "timeMinute": 210,
  "actionType": "force-special-request",
  "details": {
    "requestId": "request-vague-perfect-plant"
  }
}
```

Debug actions should appear in playtest reports so balance results are not misread.

---

# 44. Data Validation Rules

Prototype should validate basic data integrity.

Required checks:

- every plant ID referenced by stock exists
- every customer archetype exists
- every request good/bad plant ID exists
- every location ID exists
- every listing references valid supplier and plant
- every skill references valid gate/discovery where applicable
- every notebook subject exists or is a freeform lesson
- no negative stock units
- no negative cash unless explicitly allowed
- displayed units cannot exceed owned units
- sold units cannot exceed stock units
- moisture and condition values use allowed enums
- price band uses allowed enum

Validation can be simple console warnings in Prototype 0.1.

---

# 45. Recommended File Structure

Recommended prototype data structure:

```text
/prototype/data/
├─ core/
│  ├─ enums.json
│  └─ prototype-settings.json
├─ plants/
│  ├─ plants.json
│  ├─ plant-tags.json
│  └─ tray-formats.json
├─ locations/
│  ├─ locations.json
│  ├─ routes.json
│  └─ weather.json
├─ suppliers/
│  ├─ suppliers.json
│  └─ week-listings.json
├─ customers/
│  ├─ archetypes.json
│  ├─ quirks.json
│  └─ generated-customer-seeds.json
├─ requests/
│  └─ special-requests.json
├─ progression/
│  ├─ notebook-templates.json
│  ├─ discovery-rules.json
│  └─ skills.json
└─ prototype-week-script.json
```

For a first simple build, these can be combined into fewer files.

But the schema should support separation.

---

# 46. Prototype Required Data

Prototype 0.1 must include at minimum:

- 25 plant definitions
- 5 tray/display formats
- 3 location definitions
- 1 supplier definition
- 7-day wholesaler listing script
- route/fuel data for 3 locations
- 6 customer archetypes
- 30 generated customers
- 8–10 quirks
- 10 special request templates
- Ask a Follow-Up skill
- at least 3 discovery rules
- at least 1 mistake lesson rule
- display zones
- weather definitions
- report/export structures
- debug action log

---

# 47. Prototype Exclusions

Prototype 0.1 does not need data schemas for:

- full staff hiring
- full year calendar
- multiple suppliers
- greenhouse upgrades
- propagation
- exact manual pricing
- full skill tree
- loans/debt/tax
- complex animation states
- advanced route planning
- save/load migration
- permanent account data

Leave room for them, but do not implement them yet.

---

# 48. Builder Guidance

Builder should treat this document as the first data model, not final law.

If implementation reveals that a structure needs to change, Builder should:

1. document the issue
2. propose the smallest useful schema change
3. avoid redesigning gameplay silently
4. update the schema document after acceptance
5. keep debug export aligned with runtime state

The goal is clarity and tunability.

---

# 49. Success Criteria

The schema succeeds if:

- the prototype can load plants from data
- stock batches can be created from orders
- customers can be generated and remembered
- locations can influence sales
- display state can be represented clearly
- sale events can be logged
- notebook discoveries can trigger from events
- Ask a Follow-Up can unlock and function
- daily and weekly reports can be generated
- debug exports can reconstruct what happened
- balance tuning can happen mostly through data

The schema fails if:

- too much is hardcoded
- events cannot explain outcomes
- stock state becomes ambiguous
- customer memory cannot be exported
- notebook discoveries cannot be traced
- display state cannot be debugged
- playtest reports lack enough data to interpret the run

---

# 50. Recommended Next Document

The next document should be:

## Document 17 — Initial GitHub Repository Setup Pack

Purpose:

- create root README
- create PROJECT_INDEX
- create CURRENT_STATUS
- create CHANGELOG
- create Reading Pack
- create folder structure
- provide PowerShell setup commands
- provide CMD fallback
- define initial commit steps
- prepare Documents 1–16 for filing

This will turn the design set into a repo-ready Codex.

---

# 51. Final Data Definition

The Garden Stall should be data-driven from the first playable prototype.

Plants, stock, customers, locations, suppliers, requests, displays, notebook discoveries, skill unlocks, reports, and debug exports should all have clear structured representations. The data model should stay simple enough for Prototype 0.1, but robust enough that playtest results can be explained and tuning can happen without rewriting core logic.

The core data question is:

> “Can the prototype explain why today’s stall behaved the way it did?”
