# The Garden Stall — Home Hub Structure Lock 001

Status: Proposed canon / structure lock
Purpose: Define the first stable structure for the home hub scene before visual anchor work.

---

## 1. Core concept

The Home Hub is the player’s warm evening cottage scene.

It is the between-day parent screen from which the player prepares tomorrow’s trading day.

The player uses natural objects in the room to access game systems:

* PC / Webternet for supplier ordering
* wall map for route planning
* files/papers for summaries and records
* wall calendar for season/day context
* cottage stairs / bedroom direction to end the day
* cat as the first flavour interaction

The hub should feel like a lived-in, slightly messy, warm UK cottage workspace rather than a sterile menu.

---

## 2. Time-of-day

Initial hub art target:

```text
Evening, around 6–7pm UK time.
```

Later, the room may support lighting/state variants such as darker bedtime state, but not required for the first anchor.

---

## 3. Alpha functional hotspots

These are available from the start.

### PC / Webternet

Purpose:

* supplier ordering
* later: Vanmart, reclamation yard, other online/trade sources

Visual state:

* PC is **on** if supplier order is not complete
* PC is **off** once supplier order is complete

Meaning:

```text
PC on = you still need to sort supplier/web tasks.
PC off = supplier order is done for tomorrow.
```

The PC can open a browser-style interface, but the browser is not the whole hub.

---

### Wall map

Purpose:

* opens route planner map

Initial route planner:

* six stylised locations
* three town-area locations
* one outskirts location
* two further rural locations
* choose one trading destination for the day
* show simple travel time/cost
* no multi-route system for now

Visual state:

* map is **crooked** if route is not set
* map is **straightened** once route is set

Meaning:

```text
Crooked map = route planning still needs attention.
Straight map = route has been chosen.
```

---

### Files / messy papers by PC

Purpose:

* summaries
* reports
* review menus
* maybe notebook-adjacent admin

Design preference:

* reports and summaries should feel like messy papers/files, not just another PC browser tab

This keeps the game warmer and less “everything is computer menu.”

---

### Wall calendar

Purpose:

* displays season/day context
* does not need to link to a full menu at first

Visual state:

* present from the start
* somewhat dynamic
* shows current season/time structure

Initial seasonal idea:

```text
Spring trading year.
Player trades Friday, Saturday, Sunday each week/season unit.
```

Open question:

* exact number of playable trading days in a season/year still needs design lock

The calendar is important enough to render from the start even if it is not fully interactive.

---

### Cottage stairs / bedroom direction

Purpose:

* end the evening / begin next day

Visual form:

* hint of stairs in the cottage corner
* bedroom is upstairs, not visible as a full bed object in the room

Begin-next-day rule:

```text
Going to bed checks:
1. supplier order made?
2. route set?

If either is missing, prompt the player before ending the evening.
```

---

## 4. First flavour hotspot

### Cat

Purpose:

* first graphical/audio quirk test
* charm interaction
* validates overlay animation approach

Starting behaviour:

* clickable cat twitches tail / purrs / small reaction

Ready-for-bed behaviour:

Once supplier order and route are both complete:

```text
The cat gets up, stretches, meows, crosses the room, and walks through the slightly ajar door toward the cottage stairs.
```

This becomes a warm bedtime readiness signifier.

Cat is an overlay from the start.

---

## 5. Base room elements

The base room should include:

* warm cottage interior
* desk / PC
* wall map
* wall calendar
* files/papers near PC
* visible window
* hint of stairs/door/cottage corner
* general cottage cuteness
* lived-in clutter
* enough empty/structured areas for future overlays

The base room should **not** include the future systems as built objects yet.

---

## 6. Overlays from the start

These are present as overlay/state elements immediately:

* cat
* wall calendar

Possibly also:

* PC on/off state
* map crooked/straight state

These can be implemented as overlay or state-swapped elements depending on art/technical convenience.

---

## 7. Future unlock overlays

These are not initially present as working systems.

They may appear later as unlock overlays:

* greenhouse / polytunnel visible through window or outside
* propagator
* shed
* companion planting / potting screen access
* vehicle/van key area once vehicle upgrade systems exist
* awards / wall decorations / certificates / achievement clutter
* bookshelf / plant books / reference area
* radio
* phone
* tool/potting bench elements

Important distinction:

* awards/decor may appear as progression dressing
* greenhouse, propagator, shed, vehicle, companion planting are whole future screens/systems

---

## 8. Pending-action visual language

The room should quietly communicate evening prep state.

Initial rules:

```text
Supplier order needed:
PC is on / active.

Supplier order complete:
PC is off.

Route needed:
Wall map is crooked.

Route complete:
Wall map is straight.

Ready for bed:
Cat performs bedtime cue and heads toward stairs.
```

Future rules:

* unlocks may sparkle gently
* pending items may use subtle glow/highlight
* hover/cursor labels can improve clarity

---

## 9. Hotspot readability

Readability may differ by platform.

For PC:

* cursor change
* subtle highlight
* optional tooltip/label

For Android/mobile:

* clearer press/highlight zones likely required

First anchor may lean slightly obvious rather than hidden.

A later button/menu setting could show hotspot labels.

Design goal:

```text
Charming, but not a Where’s-Wally puzzle.
```

---

## 10. Persistent status

Minimal status should be visible without opening submenus.

Suggested:

* cash in top corner
* route status communicated by wall map
* order status communicated by PC state
* day/week/season communicated by calendar

Future:

* weather
* reviews
* unlock notices
* event hints

---

## 11. Other candidate room systems

### Phone

Later use:

* rare ringing events
* higher-level tips
* customer requests
* review/messages
* occasional narrative/event prompts

Should not ring constantly.

---

### Van keys / vehicle corner

Later use:

* vehicle info
* vehicle upgrades
* van capacity
* maintenance

Unlocked with next vehicle / vehicle system.

---

### Radio

Later use:

* weather
* local gossip
* event hints
* ambient flavour

---

### Bookshelf / plant books

Later use:

* plant library
* unlocked notes
* companion planting knowledge

---

### Awards / wall decorations

Later use:

* achievements
* reputation milestones
* visual progression

These can appear as environmental dressing rather than as a major system.

---

### Propagator / greenhouse / shed / vehicle / companion planting

These are future screen-access systems.

They should not be bundled into the initial hub implementation beyond possible locked/absent overlay planning.

---

## 12. Navigation parent rule

The Home Hub is the parent navigation state.

Examples:

```text
Click PC -> Webternet / suppliers -> close/back returns to Home Hub
Click map -> route planner -> close/back returns to Home Hub
Click files -> reports/summaries -> close/back returns to Home Hub
Click stairs when ready -> next day begins
```

---

## 13. Current open design questions

### Season length

Need to define:

* how many trading days are in Spring
* whether the player trades Friday/Saturday/Sunday only
* whether weekdays are skipped automatically
* how many weekends make a season
* what the calendar displays during prototype

Current leaning:

```text
Spring-only prototype.
Trade Friday, Saturday, Sunday.
```

Possible first alpha answer:

```text
One Spring month = 4 weekends = 12 trading days.
```

But this is not locked yet.

---

### Calendar behaviour

Need to define whether calendar is:

* purely display
* clickable for schedule
* seasonal progress tracker
* event preview

First anchor:

```text
Display only is acceptable.
```

---

### Files/papers scope

Need to define what files open first:

* weekly summary
* daily reports
* notebook
* finance summary
* debug/export?
* all of the above?

First implementation should probably open:

```text
Reports / summaries.
```

---

### Route planner details

Need to define the six initial locations.

Known structure:

* 3 town
* 1 outskirts
* 2 rural/further

Names/details can be locked later.

---

### Ready-for-bed prompting

Need to define exact prompt if:

* route not set
* supplier order not placed
* both missing

Suggested:

```text
You have not chosen tomorrow’s route yet.
You have not placed a supplier order for tomorrow.
Go anyway / stay and prepare.
```

---

## 14. Art direction implication

The first art task should not be “paint all final systems.”

It should be:

```text
Home Hub Anchor Pack 001
```

Purpose:

* establish room composition
* show functional hotspot placement
* establish overlay logic
* test cat as first quirk overlay
* leave space for future unlock overlays

Deliverables should include:

1. base room composition
2. hotspot/callout version
3. overlay/state notes for PC, map, calendar, cat
4. optional rough phone/desk/files details
5. not final polished production art yet

---

# Summary lock

The Home Hub is a warm evening cottage workspace and the parent navigation screen for between-day play.

Core alpha objects:

* PC / Webternet
* wall map
* files/papers
* wall calendar
* stairs/bedtime route
* cat

Core prep logic:

* PC on/off indicates supplier order state
* map crooked/straight indicates route state
* cat bedtime cue indicates ready for next day
* stairs/bedtime begins next day after checking order and route

Future systems appear as unlock overlays rather than cluttering the base scene from day one.
