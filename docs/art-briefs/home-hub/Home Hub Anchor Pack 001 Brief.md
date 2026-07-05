# The Garden Stall — Home Hub Anchor Pack 001 Brief

Status: Draft for review
Purpose: Translate `Home Hub Structure Lock 001` into a first visual anchor pack for the Home Hub scene.

---

## 1. Brief summary

Home Hub Anchor Pack 001 is an exploratory visual deliverable pack for the Home Hub: the warm evening cottage workspace that acts as the between-day parent screen.

This pack should establish the first stable visual composition for the room, show where the functional hotspots live, define how early state overlays are represented, and leave sensible space for future unlock overlays.

This is **not final polished production art**.

The objective is to produce visual anchors that can guide prototype implementation, mockup generation, and later art direction decisions without locking every detail too early.

---

## 2. Source document

Primary source:

```text
docs/design/home-hub/Home Hub Structure Lock 001.md
```

The structure lock defines the Home Hub as:

> a warm evening cottage workspace and the parent navigation screen for between-day play.

Core alpha objects:

* PC / Webternet
* wall map
* files/papers
* wall calendar
* stairs/bedtime route
* cat

Core prep-state logic:

* PC on/off indicates supplier order state
* map crooked/straight indicates route state
* cat bedtime cue indicates ready for next day
* stairs/bedtime begins next day after checking order and route

Future systems should appear as unlock overlays rather than cluttering the base scene from day one.

---

## 3. Visual target

The Home Hub should feel like:

```text
A lived-in, slightly messy, warm UK cottage workspace in early evening.
```

It should be cosy, practical, and personal, but not an over-polished fantasy cottage or a sterile menu room.

The player should feel:

* this is where tomorrow is prepared
* the room belongs to a small plant trader
* the workspace is warm and human
* the game systems are accessed through natural room objects
* the room can grow richer as the business grows

Initial lighting target:

```text
Evening, around 6–7pm UK time.
Warm interior light, soft outside light through the window.
```

---

## 4. Deliverable 1 — Base room composition

### Purpose

Create the first visual anchor for the Home Hub room layout.

This should establish:

* camera angle
* room composition
* major object positions
* navigational readability
* future overlay zones
* general mood

### Required base-room elements

The base composition should include:

* warm cottage interior
* desk / PC area
* wall map
* wall calendar
* files/papers near PC
* visible window
* hint of stairs / door / cottage corner
* lived-in clutter
* enough structured empty space for future overlays

### Important composition notes

The room should not become a cluttered illustration where hotspots are hard to find.

Functional objects should be visually clear from the first glance:

* the PC should read as an actionable object
* the wall map should be visible and recognisable
* the files/papers should feel separate from the PC/Webternet
* the calendar should be readable enough to signal time/season
* the stairs/bedtime direction should be clear without showing a full bedroom
* the cat should have a believable place to sit, move, and later walk toward the stairs

### Base room should not include

Do not fully build future systems into the base room yet.

Avoid adding as permanent built objects:

* fully functional greenhouse access
* active propagator system
* shed interface
* vehicle upgrade station
* companion planting screen
* full awards wall
* fully developed tool/potting bench system

These may be planned as future overlay spaces, but should not clutter the first anchor.

---

## 5. Deliverable 2 — Hotspot / callout version

### Purpose

Create a labelled version of the base composition that identifies functional hotspots and their intended interactions.

This version is for design and implementation clarity. It does not need to be player-facing.

### Required callouts

1. **PC / Webternet**
   * Opens supplier ordering.
   * Later may open Vanmart, reclamation yard, and other online/trade sources.
   * Visual state: on when supplier order is incomplete, off when complete.

2. **Wall map**
   * Opens route planner.
   * Initial planner: six stylised locations.
   * Visual state: crooked when route is unset, straight when route is chosen.

3. **Files / messy papers**
   * Opens reports, summaries, records, or notebook-adjacent admin.
   * Should not feel like just another PC browser tab.

4. **Wall calendar**
   * Displays season/day structure.
   * First anchor may be display-only.
   * Should be present from the start.

5. **Stairs / bedroom direction**
   * Ends evening and begins next day.
   * Should check supplier order and route before allowing the day to end.

6. **Cat**
   * First flavour hotspot.
   * Click interaction: twitch, purr, small reaction.
   * Ready-for-bed state: stretches, meows, crosses room, exits toward stairs.

### Readability requirement

The callout version should help answer:

```text
Can a new player understand what objects matter without turning the room into a Where's-Wally puzzle?
```

For PC play, subtle hover/readability is acceptable.

For Android/mobile, the hotspot zones may need clearer visible press states later.

---

## 6. Deliverable 3 — Overlay and state notes

### Purpose

Define which parts of the Home Hub should be base art and which should be state-swapped or overlay elements.

The goal is not to solve the full technical implementation, but to provide enough art direction for implementation planning.

---

### 6.1 PC state overlay

Required states:

```text
PC on = supplier/web tasks still need attention.
PC off = supplier order is complete for tomorrow.
```

Possible visual treatments:

* monitor glow on/off
* tiny status light
* screen content visible when active
* less glow once complete

Avoid:

* aggressive flashing
* modern sci-fi UI treatment
* making the PC dominate the warm cottage mood

---

### 6.2 Wall map state overlay

Required states:

```text
Crooked map = route planning still needs attention.
Straight map = route has been chosen.
```

Possible visual treatments:

* base map layer
* crooked rotation variant
* straightened variant
* optional pin/string/sticky-note indicator once route is set

Avoid:

* making the map too visually busy
* turning it into a full route planner inside the room scene
* losing the physical-paper feel

---

### 6.3 Calendar state overlay

Required role:

* display season/day context
* present from the start
* somewhat dynamic
* first anchor can be display-only

Possible visual treatments:

* wall calendar with current date ringed
* spring month visible
* Friday/Saturday/Sunday trade rhythm hinted if design locks that later
* small seasonal note or plant doodle

Open question to preserve:

* exact season length is not locked
* exact trading-day structure is not locked
* calendar should not overcommit to final season rules yet

Recommended first-art treatment:

```text
Readable spring calendar mood, but avoid hardcoding detailed season mathematics until design confirms them.
```

---

### 6.4 Cat overlay

Required role:

* first graphical/audio quirk test
* charm interaction
* ready-for-bed cue

Initial state:

* cat rests somewhere natural in the room
* clickable small reaction: tail twitch, purr, blink, stretch, or small meow

Ready-for-bed state:

```text
Once supplier order and route are both complete, the cat gets up, stretches, meows, crosses the room, and walks through the slightly ajar door toward the cottage stairs.
```

Art planning notes:

* cat should be an overlay from the start
* base room should leave a clear movement path from cat start position to stairs/door
* cat must not block functional hotspots
* the movement path should be charming but short
* avoid needing a complex animation set for the first test

Possible implementation-friendly states:

1. Cat idle pose
2. Cat clicked reaction pose
3. Cat stretch pose
4. Cat walking/exiting pose or simple tweened overlay
5. Cat absent/near-stairs final pose

---

## 7. Deliverable 4 — Future overlay space planning

### Purpose

Plan where later unlock overlays can appear without cluttering the base scene.

The base room should visually support future growth, but the first anchor should not pretend all future systems already exist.

### Future overlay candidates

Potential later overlays:

* greenhouse / polytunnel visible through window or outside
* propagator
* shed
* companion planting / potting screen access
* vehicle/van key area
* awards / wall decorations / certificates
* bookshelf / plant books / reference area
* radio
* phone
* tool/potting bench elements

### Space-planning requirements

The composition should reserve plausible areas for:

1. **Window/outside progression**
   * later greenhouse or polytunnel hint
   * weather/season atmosphere

2. **Desk/workspace progression**
   * papers/files growth
   * supplier/admin clutter
   * possible phone placement

3. **Wall progression**
   * awards, certificates, seasonal notes, location memorabilia
   * but keep wall map and calendar readable

4. **Reference area progression**
   * bookshelf or plant books later
   * notebook/plant knowledge expansion

5. **Vehicle/system progression**
   * possible van keys or vehicle corner later
   * should not compete with PC/map/calendar alpha objects

6. **Ambient flavour progression**
   * radio, cat items, plant cuttings, mugs, boots, seed packets, trader clutter

### Future overlay principle

Future systems should appear as earned additions, not as a fully built command centre from day one.

The room should feel capable of growing with the player.

---

## 8. Deliverable 5 — Non-production art boundary

This anchor pack is not final art.

Allowed:

* composition sketches
* rough colour mood
* callout diagrams
* state-overlay thumbnails
* layout notes
* prompt tests
* exploratory mockups
* simple paintover notes

Not required:

* final polished background
* final layered production asset
* final animation frames
* final UI implementation
* all future unlock objects
* final calendar logic
* final route-planner art
* final cat animation sheet

The correct level of polish is:

```text
Clear enough to guide the prototype and future art direction; loose enough to revise after testing.
```

---

## 9. Recommended first visual tests

### Test A — Base Room Composition Sketch

Create a warm evening cottage workspace in slight three-quarter view.

Must include:

* desk / PC
* wall map
* files/papers
* wall calendar
* visible window
* stairs/door direction
* cat idle location
* open space for future overlays

Success criteria:

* room reads immediately as between-day home hub
* objects feel natural rather than menu icons
* hotspots are visible
* future systems have plausible space

---

### Test B — Hotspot Callout Mockup

Use the base room composition and add simple labels/callouts for:

* PC / Webternet
* wall map
* files/reports
* calendar
* stairs/bedtime
* cat

Success criteria:

* callouts clarify navigation parent structure
* object roles are not ambiguous
* no hotspot feels hidden or overloaded

---

### Test C — Pending-State Overlay Sheet

Create small state examples for:

* PC on
* PC off
* map crooked
* map straight
* calendar current-day treatment
* cat idle
* cat bedtime cue direction

Success criteria:

* state changes are readable but gentle
* visual language remains cosy and grounded
* no state relies only on tiny detail

---

### Test D — Future Overlay Space Map

Create a version of the room with translucent planning zones for future systems:

* outside/window growth
* wall awards/decor
* bookshelf/reference
* desk/admin expansion
* phone/radio/van-key area
* possible potting/propagator area

Success criteria:

* future growth feels planned
* base room remains uncluttered
* alpha objects keep priority

---

## 10. Prompt strategy for mockups

Use controlled prompts that preserve the accepted Garden Stall visual identity.

Core prompt anchor:

```text
The Garden Stall, warm hand-drawn adult storybook style, grounded UK cottage workspace, cosy but practical, lived-in and slightly messy, evening around 6-7pm, soft warm interior light, not childish, not photorealistic, not glossy, not a fantasy cottage.
```

Home Hub-specific prompt elements:

```text
Between-day parent screen, small plant trader's home office, desk with old PC, wall map, wall calendar, messy files and papers, visible cottage window, hint of stairs or upstairs bedroom direction, cat resting in room, clear functional hotspots, enough empty space for future unlock overlays.
```

Negative drift guard:

```text
Avoid sterile menu room, over-polished boutique studio, magical fantasy cottage, cluttered Where's-Wally scene, flat vector mobile UI, photorealistic render, childish cartoon, fully built future systems, excessive decoration hiding hotspots.
```

Callout mockup prompt addition:

```text
Create a design callout version with simple labels and arrows showing PC/Webternet, wall map, files/reports, calendar, stairs/bedtime, cat; clear but still warm and game-like.
```

Overlay mockup prompt addition:

```text
Show gentle state overlays: PC screen on/off, crooked/straight wall map, current-day calendar mark, cat idle and cat bedtime path toward stairs; use subtle readable highlights, not aggressive flashing.
```

---

## 11. Acceptance criteria

The Home Hub Anchor Pack 001 is successful if it:

* clearly reads as a warm evening UK cottage workspace
* supports between-day parent navigation
* makes PC, map, files, calendar, stairs, and cat understandable
* keeps the PC/Webternet important but not dominant
* preserves files/papers as a warmer non-PC route to summaries
* leaves room for future systems without showing them all at once
* gives the cat a believable overlay role and movement path
* keeps pending-action states readable but gentle
* remains consistent with The Garden Stall's hand-drawn adult storybook direction
* avoids final-production overcommitment

Reject or revise if it:

* feels like a sterile menu hub
* turns into a polished lifestyle-magazine cottage
* becomes too cluttered to read
* hides functional hotspots
* makes every system a computer tab
* includes too many future unlock objects as permanent base-room clutter
* locks unresolved design questions too early
* requires complex animation before the prototype needs it

---

## 12. Immediate next action

Create **Home Hub Anchor Pack 001 — Test A: Base Room Composition Sketch**.

Do not produce final production art yet.

The first image should answer:

```text
Does this room feel like the place where I prepare tomorrow's plant stall day?
```

The second image should be the hotspot/callout version.
