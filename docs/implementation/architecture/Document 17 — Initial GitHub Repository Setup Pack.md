# THE GARDEN STALL
## Document 17 — Initial GitHub Repository Setup Pack

**Working Title:** The Garden Stall  
**Document Type:** Repository Setup Pack / PowerShell Workflow / Initial Codex Filing Guide  
**Status:** Draft 001  
**Purpose:** Provide a practical, PowerShell-first setup plan for creating the initial Garden Stall GitHub repository, filing Documents 1–16, creating the root Codex files, creating the folder structure, committing the initial project Codex, and preparing the repo for future specialist windows and prototype development.

---

# 1. Purpose of This Document

This document is the practical setup pack for moving The Garden Stall from ChatGPT workshop documents into a GitHub repository.

The project now has enough foundational material to justify a permanent Codex.

This document defines:

- recommended repository name
- folder structure
- initial document filing plan
- root files to create
- PowerShell-first setup workflow
- CMD fallback notes
- first commit plan
- first milestone tag
- initial Reading Pack
- setup checklist
- future specialist prompt language

The goal is to make repository setup as simple and automated as possible.

Daniel prefers PowerShell where possible, or CMD if needed.

The workflow should minimise confusing manual Git steps.

---

# 2. Core Principle

The repository becomes the permanent Codex.

ChatGPT conversations remain workshops.

Accepted repository documents become the source of truth.

Every future project window should begin by reading the relevant repository documents.

Core instruction:

> Before beginning, review the current repository documents relevant to your area. The repository is the current source of truth.

---

# 3. Recommended Repository Name

Recommended repository name:

```text
garden-stall
```

Alternative:

```text
the-garden-stall
```

Recommendation:

> Use `garden-stall`.

Reasons:

- short
- clear
- lowercase
- repo-friendly
- easy to type
- not tied to final marketing title if that changes later

---

# 4. Initial Milestone

The first repository milestone should be:

```text
v0.1-docs-foundation
```

Meaning:

> The Garden Stall has a permanent GitHub Codex containing the accepted foundation documents, root index/status files, Reading Pack, and initial folder structure.

This milestone does not mean the playable prototype exists.

It means the project has moved from workshop-only into version-controlled canon.

---

# 5. Local Folder Recommendation

Recommended local folder name:

```text
garden-stall
```

Example Windows location:

```text
C:\Projects\garden-stall
```

or:

```text
C:\Users\<YourName>\Documents\GitHub\garden-stall
```

Choose whichever location is easiest to find.

Avoid putting the repo inside a temporary Downloads folder.

---

# 6. GitHub Setup Order

Recommended setup order:

1. Create empty GitHub repository named `garden-stall`.
2. Create local folder.
3. Add repo folder structure.
4. Add root Codex files.
5. Copy Documents 1–16 into correct folders.
6. Create Reading Pack.
7. Run Git initialisation.
8. Commit.
9. Add remote.
10. Push.
11. Verify on GitHub.
12. Tag `v0.1-docs-foundation`.

This document provides PowerShell commands for most of this.

---

# 7. Required Root Files

The repository should contain these root files:

```text
README.md
PROJECT_INDEX.md
CURRENT_STATUS.md
CHANGELOG.md
```

These are the top-level navigation and status files.

They must be kept current.

---

# 8. Required Review File

The repository should contain:

```text
/docs/reviews/Reading-Pack.md
```

This file lists exact paths for project roles and avoids relying on repository search.

---

# 9. Required Folder Structure

Initial structure:

```text
garden-stall/
├─ README.md
├─ PROJECT_INDEX.md
├─ CURRENT_STATUS.md
├─ CHANGELOG.md
├─ docs/
│  ├─ design/
│  │  ├─ core/
│  │  ├─ systems/
│  │  ├─ prototype/
│  │  └─ future/
│  ├─ artwork/
│  │  ├─ visual-bible/
│  │  ├─ prompts/
│  │  ├─ mockups/
│  │  ├─ references/
│  │  └─ assets/
│  ├─ implementation/
│  │  ├─ build-briefs/
│  │  ├─ data-schemas/
│  │  ├─ architecture/
│  │  └─ handoffs/
│  ├─ playtests/
│  │  ├─ reports/
│  │  ├─ raw-exports/
│  │  └─ summaries/
│  ├─ reviews/
│  │  ├─ decision-reports/
│  │  └─ specialist-reviews/
│  └─ archive/
│     ├─ superseded/
│     ├─ drafts/
│     └─ experiments/
├─ prototype/
│  ├─ src/
│  ├─ public/
│  ├─ data/
│  └─ README.md
└─ tools/
   ├─ powershell/
   ├─ cmd/
   └─ README.md
```

---

# 10. Document Filing Plan

Documents 1–16 should be filed as follows.

## 10.1 Core Design

Folder:

```text
/docs/design/core/
```

Files:

```text
Document 1 — Pre-Production Foundation Brief.md
Document 2 — Core Vision Brief.md
Document 6 — Core Loop Specification.md
```

## 10.2 System Design

Folder:

```text
/docs/design/systems/
```

Files:

```text
Document 3 — Plant Schema and Tag Bible.md
Document 4 — Customer and Request System.md
Document 5 — Location Specification.md
Document 8 — Wholesaler Interface Specification.md
Document 9 — Display and Merchandising Specification.md
Document 10 — Economy, Pricing and Stock Condition Specification.md
Document 11 — Staff Pressure and Progression Specification.md
Document 12 — Player Knowledge, Notebook and Skill Tree Specification.md
```

## 10.3 Prototype Design

Folder:

```text
/docs/design/prototype/
```

Files:

```text
Document 7 — Prototype 0.1 Vertical Slice Content Plan.md
Document 7A — Consequential Design Concepts.md
Document 13 — Prototype 0.1 Build Brief.md
```

## 10.4 Repository / Workflow

Folder:

```text
/docs/implementation/architecture/
```

File:

```text
Document 14 — Repository and Codex Structure.md
```

## 10.5 Artwork

Folder:

```text
/docs/artwork/visual-bible/
```

File:

```text
Document 15 — Art Direction and Visual Bible Starter Brief.md
```

## 10.6 Data Schema

Folder:

```text
/docs/implementation/data-schemas/
```

File:

```text
Document 16 — Data Schema Specification.md
```

## 10.7 Build Brief Copy

Folder:

```text
/docs/implementation/build-briefs/
```

File:

```text
Document 13 — Prototype 0.1 Build Brief.md
```

This may be a copy of the design/prototype version at first. Later it may become an implementation-specific revision.

---

# 11. PowerShell Setup Script

Create this script in:

```text
/tools/powershell/setup-repo-folders.ps1
```

Suggested script content:

```powershell
# The Garden Stall — Repository Folder Setup
# Run from the repository root.

$dirs = @(
    "docs/design/core",
    "docs/design/systems",
    "docs/design/prototype",
    "docs/design/future",
    "docs/artwork/visual-bible",
    "docs/artwork/prompts",
    "docs/artwork/mockups",
    "docs/artwork/references",
    "docs/artwork/assets",
    "docs/implementation/build-briefs",
    "docs/implementation/data-schemas",
    "docs/implementation/architecture",
    "docs/implementation/handoffs",
    "docs/playtests/reports",
    "docs/playtests/raw-exports",
    "docs/playtests/summaries",
    "docs/reviews/decision-reports",
    "docs/reviews/specialist-reviews",
    "docs/archive/superseded",
    "docs/archive/drafts",
    "docs/archive/experiments",
    "prototype/src",
    "prototype/public",
    "prototype/data",
    "tools/powershell",
    "tools/cmd"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# Placeholder files keep empty folders visible in Git.
$keepFiles = @(
    "docs/design/future/.gitkeep",
    "docs/artwork/prompts/.gitkeep",
    "docs/artwork/mockups/.gitkeep",
    "docs/artwork/references/.gitkeep",
    "docs/artwork/assets/.gitkeep",
    "docs/implementation/handoffs/.gitkeep",
    "docs/playtests/reports/.gitkeep",
    "docs/playtests/raw-exports/.gitkeep",
    "docs/playtests/summaries/.gitkeep",
    "docs/reviews/decision-reports/.gitkeep",
    "docs/reviews/specialist-reviews/.gitkeep",
    "docs/archive/superseded/.gitkeep",
    "docs/archive/drafts/.gitkeep",
    "docs/archive/experiments/.gitkeep",
    "prototype/src/.gitkeep",
    "prototype/public/.gitkeep",
    "prototype/data/.gitkeep",
    "tools/cmd/.gitkeep"
)

foreach ($file in $keepFiles) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host "Garden Stall repository folders created."
```

---

# 12. CMD Fallback Folder Setup

If PowerShell is awkward, this CMD fallback can create the main folders.

```cmd
mkdir docs\design\core
mkdir docs\design\systems
mkdir docs\design\prototype
mkdir docs\design\future
mkdir docs\artwork\visual-bible
mkdir docs\artwork\prompts
mkdir docs\artwork\mockups
mkdir docs\artwork\references
mkdir docs\artwork\assets
mkdir docs\implementation\build-briefs
mkdir docs\implementation\data-schemas
mkdir docs\implementation\architecture
mkdir docs\implementation\handoffs
mkdir docs\playtests\reports
mkdir docs\playtests\raw-exports
mkdir docs\playtests\summaries
mkdir docs\reviews\decision-reports
mkdir docs\reviews\specialist-reviews
mkdir docs\archive\superseded
mkdir docs\archive\drafts
mkdir docs\archive\experiments
mkdir prototype\src
mkdir prototype\public
mkdir prototype\data
mkdir tools\powershell
mkdir tools\cmd
```

PowerShell is preferred.

---

# 13. Root README Draft

Create:

```text
README.md
```

Suggested initial content:

```md
# The Garden Stall

**The Garden Stall** is a cosy-but-commercial plant stall game about buying cheap spring stock, setting up a rough mobile stall, selling to local customers, learning plant retail, and gradually turning a side hustle into something beautiful.

ChatGPT conversations are used as workshops. This GitHub repository is the permanent Codex and source of truth.

## Current Phase

Pre-production / Prototype 0.1 specification.

## Current Milestone

`v0.1-docs-foundation`

## Prototype 0.1 Goal

Build a browser-based, seven-day playable slice where the player:

- orders stock from a wholesaler
- collects stock each morning
- chooses a trading location
- loads the van
- sets up a display
- trades in real time
- manages plant condition
- handles customer requests
- learns through notebook discoveries
- reaches a weekly summary with debug/playtest export

## Repository Principles

- Accepted Markdown documents are canon.
- ChatGPT conversations are workshops.
- Every specialist should read the relevant repository documents before starting.
- Use the Reading Pack for exact document paths.
- Do not rely on chat memory where repository documents exist.

## Key Files

- `PROJECT_INDEX.md`
- `CURRENT_STATUS.md`
- `CHANGELOG.md`
- `docs/reviews/Reading-Pack.md`
```

---

# 14. CURRENT_STATUS Draft

Create:

```text
CURRENT_STATUS.md
```

Suggested initial content:

```md
# Current Status — The Garden Stall

## Phase

Pre-production moving into repository setup.

## Current Milestone

`v0.1-docs-foundation`

## Current Source of Truth

The GitHub repository is the permanent Codex once Documents 1–17 are filed.

## Accepted Foundation Documents

Documents 1–16 define:

- project vision
- plant schema
- customer/request system
- locations
- core loop
- prototype content plan
- daily-flow corrections
- wholesaler interface
- display and merchandising
- economy and stock condition
- staff pressure
- notebook and skill tree
- prototype build brief
- repository/codex structure
- visual bible starter brief
- data schema

## Current Priority

Set up repository, file accepted documents, create root index/status/changelog/Reading Pack, then prepare for prototype build.

## Recommended Next Actions

1. Create GitHub repository `garden-stall`.
2. File Documents 1–17.
3. Create root docs.
4. Create Reading Pack.
5. Commit and push initial Codex.
6. Tag `v0.1-docs-foundation`.
7. Prepare first implementation task from Document 13 and Document 16.

## Known Risks

- Scope is large for a first prototype.
- Real-time trading needs strong debug/simulation controls.
- Art direction must not delay systems testing.
- Repository must become source of truth quickly to avoid chat-memory drift.
```

---

# 15. CHANGELOG Draft

Create:

```text
CHANGELOG.md
```

Suggested initial content:

```md
# Changelog — The Garden Stall

## 2026-06-29 — v0.1-docs-foundation

Initial foundation Codex prepared for GitHub filing.

Added foundational document set:

- Document 1 — Pre-Production Foundation Brief
- Document 2 — Core Vision Brief
- Document 3 — Plant Schema and Tag Bible
- Document 4 — Customer and Request System
- Document 5 — Location Specification
- Document 6 — Core Loop Specification
- Document 7 — Prototype 0.1 Vertical Slice Content Plan
- Document 7A — Consequential Design Concepts
- Document 8 — Wholesaler Interface Specification
- Document 9 — Display and Merchandising Specification
- Document 10 — Economy, Pricing and Stock Condition Specification
- Document 11 — Staff Pressure and Progression Specification
- Document 12 — Player Knowledge, Notebook and Skill Tree Specification
- Document 13 — Prototype 0.1 Build Brief
- Document 14 — Repository and Codex Structure
- Document 15 — Art Direction and Visual Bible Starter Brief
- Document 16 — Data Schema Specification
- Document 17 — Initial GitHub Repository Setup Pack

Established repository workflow principles:

- ChatGPT conversations are workshops.
- GitHub is the permanent Codex.
- Repository documents are the source of truth.
- Reading Packs should provide exact document paths.
- Codex reconciles reviews before Builder implementation.
```

---

# 16. PROJECT_INDEX Draft

Create:

```text
PROJECT_INDEX.md
```

Suggested initial content:

```md
# Project Index — The Garden Stall

This index lists the current accepted project documents.

## Core Design

| Document | Path | Status | Purpose |
|---|---|---|---|
| Document 1 | `/docs/design/core/Document 1 — Pre-Production Foundation Brief.md` | Accepted Draft | Initial foundation brief |
| Document 2 | `/docs/design/core/Document 2 — Core Vision Brief.md` | Accepted Draft | Core game identity and vision |
| Document 6 | `/docs/design/core/Document 6 — Core Loop Specification.md` | Accepted Draft | Main daily and weekly gameplay loop |

## System Design

| Document | Path | Status | Purpose |
|---|---|---|---|
| Document 3 | `/docs/design/systems/Document 3 — Plant Schema and Tag Bible.md` | Accepted Draft | Plant data, tags, and stock logic |
| Document 4 | `/docs/design/systems/Document 4 — Customer and Request System.md` | Accepted Draft | Customers, archetypes, requests |
| Document 5 | `/docs/design/systems/Document 5 — Location Specification.md` | Accepted Draft | Locations and trading sites |
| Document 8 | `/docs/design/systems/Document 8 — Wholesaler Interface Specification.md` | Accepted Draft | Supplier and ordering interface |
| Document 9 | `/docs/design/systems/Document 9 — Display and Merchandising Specification.md` | Accepted Draft | Stall display and tray management |
| Document 10 | `/docs/design/systems/Document 10 — Economy, Pricing and Stock Condition Specification.md` | Accepted Draft | Cash, fees, pricing, degradation |
| Document 11 | `/docs/design/systems/Document 11 — Staff Pressure and Progression Specification.md` | Accepted Draft | Future staff pressure and progression |
| Document 12 | `/docs/design/systems/Document 12 — Player Knowledge, Notebook and Skill Tree Specification.md` | Accepted Draft | Notebook, discoveries, skill unlocks |

## Prototype Design

| Document | Path | Status | Purpose |
|---|---|---|---|
| Document 7 | `/docs/design/prototype/Document 7 — Prototype 0.1 Vertical Slice Content Plan.md` | Accepted Draft | Prototype content plan |
| Document 7A | `/docs/design/prototype/Document 7A — Consequential Design Concepts.md` | Accepted Draft | Corrected consequential flow/design concepts |
| Document 13 | `/docs/design/prototype/Document 13 — Prototype 0.1 Build Brief.md` | Accepted Draft | First playable prototype build brief |

## Implementation

| Document | Path | Status | Purpose |
|---|---|---|---|
| Document 13 | `/docs/implementation/build-briefs/Document 13 — Prototype 0.1 Build Brief.md` | Accepted Draft | Implementation-facing copy of build brief |
| Document 14 | `/docs/implementation/architecture/Document 14 — Repository and Codex Structure.md` | Accepted Draft | Repository workflow and Codex structure |
| Document 16 | `/docs/implementation/data-schemas/Document 16 — Data Schema Specification.md` | Accepted Draft | Prototype data model |
| Document 17 | `/docs/implementation/architecture/Document 17 — Initial GitHub Repository Setup Pack.md` | Accepted Draft | Repository setup workflow |

## Artwork

| Document | Path | Status | Purpose |
|---|---|---|---|
| Document 15 | `/docs/artwork/visual-bible/Document 15 — Art Direction and Visual Bible Starter Brief.md` | Accepted Draft | Initial visual bible and artist brief |
```

---

# 17. Reading Pack Draft

Create:

```text
/docs/reviews/Reading-Pack.md
```

Suggested initial content:

```md
# Reading Pack — The Garden Stall

The repository is the current source of truth.

Before beginning any substantial task, review the documents relevant to your area.

Do not rely on chat memory where repository documents exist.

---

## Codex / Archivist Window

Required:

- `/README.md`
- `/PROJECT_INDEX.md`
- `/CURRENT_STATUS.md`
- `/CHANGELOG.md`
- `/docs/implementation/architecture/Document 14 — Repository and Codex Structure.md`
- `/docs/implementation/architecture/Document 17 — Initial GitHub Repository Setup Pack.md`

Purpose:

- maintain repository structure
- update indexes/status/changelog
- file documents
- create review packs
- produce decision reports
- prevent drift

---

## Graphics / Artist Window

Required:

- `/docs/design/core/Document 2 — Core Vision Brief.md`
- `/docs/design/prototype/Document 7 — Prototype 0.1 Vertical Slice Content Plan.md`
- `/docs/design/systems/Document 9 — Display and Merchandising Specification.md`
- `/docs/design/prototype/Document 13 — Prototype 0.1 Build Brief.md`
- `/docs/artwork/visual-bible/Document 15 — Art Direction and Visual Bible Starter Brief.md`

Purpose:

- visual bible
- background style
- stall mockups
- plant hero shots
- customer card style
- UI visual direction

---

## Main Design / Build Window

Required:

- `/docs/design/core/Document 6 — Core Loop Specification.md`
- `/docs/design/prototype/Document 7A — Consequential Design Concepts.md`
- `/docs/design/systems/Document 8 — Wholesaler Interface Specification.md`
- `/docs/design/systems/Document 9 — Display and Merchandising Specification.md`
- `/docs/design/systems/Document 10 — Economy, Pricing and Stock Condition Specification.md`
- `/docs/design/systems/Document 12 — Player Knowledge, Notebook and Skill Tree Specification.md`
- `/docs/design/prototype/Document 13 — Prototype 0.1 Build Brief.md`
- `/docs/implementation/data-schemas/Document 16 — Data Schema Specification.md`

Purpose:

- prototype build interpretation
- mechanics continuation
- implementation briefs
- playtest interpretation

---

## Builder / Implementation Pass

Required:

- `/docs/design/prototype/Document 13 — Prototype 0.1 Build Brief.md`
- `/docs/implementation/build-briefs/Document 13 — Prototype 0.1 Build Brief.md`
- `/docs/implementation/data-schemas/Document 16 — Data Schema Specification.md`
- `/CURRENT_STATUS.md`

Optional:

- `/docs/design/systems/Document 8 — Wholesaler Interface Specification.md`
- `/docs/design/systems/Document 9 — Display and Merchandising Specification.md`
- `/docs/design/systems/Document 10 — Economy, Pricing and Stock Condition Specification.md`
- `/docs/design/systems/Document 12 — Player Knowledge, Notebook and Skill Tree Specification.md`

Instruction:

Implement only accepted scope. Do not redesign systems unless explicitly instructed.
```

---

# 18. PowerShell Initial Git Commands

Once files are placed in the local repo folder, use PowerShell.

From inside the repo folder:

```powershell
git init
git status
git add .
git commit -m "Add Garden Stall foundation Codex"
git branch -M main
git remote add origin <REPOSITORY_URL>
git push -u origin main
git tag v0.1-docs-foundation
git push origin v0.1-docs-foundation
```

Replace:

```text
<REPOSITORY_URL>
```

with the GitHub repo URL.

Example:

```text
https://github.com/<username>/garden-stall.git
```

If `origin` already exists:

```powershell
git remote set-url origin <REPOSITORY_URL>
git push -u origin main
```

---

# 19. One-Block PowerShell Push Template

When the repository URL is known, Daniel should be given one copy-paste block like this:

```powershell
git init
git add .
git commit -m "Add Garden Stall foundation Codex"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/garden-stall.git
git push -u origin main
git tag v0.1-docs-foundation
git push origin v0.1-docs-foundation
git status
```

If already initialised:

```powershell
git status
git add .
git commit -m "Update Garden Stall Codex"
git push
git status
```

The helper should avoid giving scattered Git fragments if one clear block will do.

---

# 20. CMD Git Push Fallback

CMD version:

```cmd
git init
git add .
git commit -m "Add Garden Stall foundation Codex"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/garden-stall.git
git push -u origin main
git tag v0.1-docs-foundation
git push origin v0.1-docs-foundation
git status
```

PowerShell remains preferred.

---

# 21. Repository Verification Checklist

After pushing, check GitHub in browser.

Verify:

- README appears on repo front page
- PROJECT_INDEX exists
- CURRENT_STATUS exists
- CHANGELOG exists
- docs folder exists
- Reading-Pack exists
- Documents 1–17 are filed
- Document 13 exists in both prototype design and implementation build-brief folders
- Document 15 exists under artwork/visual-bible
- Document 16 exists under implementation/data-schemas
- tools folder exists
- prototype folder exists
- tag `v0.1-docs-foundation` exists

---

# 22. Initial Commit Message

Recommended first commit message:

```text
Add Garden Stall foundation Codex
```

Alternative:

```text
Create Garden Stall repository foundation
```

Recommendation:

> `Add Garden Stall foundation Codex`

---

# 23. First Tag

Recommended tag:

```text
v0.1-docs-foundation
```

Tag meaning:

> First repository milestone containing accepted foundation documents and Codex structure.

---

# 24. Future Branch Names

Suggested early branch names:

```text
docs/art-direction-starter
docs/data-schema-revision
feature/prototype-0-1-scaffold
feature/wholesaler-interface
feature/display-minigame
feature/realtime-trading-loop
feature/debug-export
feature/notebook-discoveries
```

Keep branch names readable.

---

# 25. First Implementation Branch

When coding begins, recommended first branch:

```text
feature/prototype-0-1-scaffold
```

Scope:

- create browser app scaffold
- load static data
- basic phase flow
- debug overlay shell
- placeholder UI panels
- no full gameplay yet

Do not start with art polish.

Do not start with every system.

Start with structure.

---

# 26. First Builder Prompt Header

When sending the first prototype build task to Builder, use:

```text
THE GARDEN STALL PROJECT

Before beginning:

Review the current repository documents relevant to your area.

The repository is the current source of truth.

Use the Reading Pack for exact document paths.

Do not rely on chat memory where repository documents exist.

Your task is to implement only the accepted scope in the current Build Brief and Data Schema. Do not redesign systems unless explicitly instructed.
```

Then include the exact required files from the Reading Pack.

---

# 27. First Artist Prompt Header

When opening the Artist window, use:

```text
THE GARDEN STALL PROJECT

Before beginning:

Review the current repository documents relevant to your area.

The repository is the current source of truth.

Use the Reading Pack for exact document paths.

Your task is to develop visual direction and mockups from the accepted Visual Bible. Do not drift into a different aesthetic unless clearly labelled as an experiment.
```

Required first art files:

- Core Vision Brief
- Display and Merchandising Specification
- Prototype 0.1 Build Brief
- Art Direction and Visual Bible Starter Brief

---

# 28. First Codex Prompt Header

When opening the Codex / Archivist window, use:

```text
THE GARDEN STALL PROJECT

Before beginning:

Review the current repository documents relevant to your area.

The repository is the current source of truth.

Use the Reading Pack for exact document paths.

Your task is to preserve accepted canon, update indexes/status/changelog, create reading packs, archive reviews, and reconcile specialist feedback before implementation.
```

---

# 29. First Repository Risks

Main risks during setup:

## 29.1 File Misplacement

Documents may be filed into the wrong folders.

Mitigation:

- use the filing plan in this document
- update PROJECT_INDEX after filing

## 29.2 Markdown Problems

Files may not be true Markdown.

Mitigation:

- use plain `.md`
- do not rename Word documents as Markdown

## 29.3 Git Confusion

Git remote/branch commands may confuse setup.

Mitigation:

- use PowerShell copy-paste blocks
- ask for the repo URL before generating final commands
- use simple main branch first

## 29.4 Drift

Future windows may rely on memory.

Mitigation:

- use Reading Pack
- standard prompt header
- repo source-of-truth rule

## 29.5 Premature Code Complexity

Builder may try to build everything at once.

Mitigation:

- use Document 13 and Document 16
- start with scaffold branch
- maintain accepted scope

---

# 30. Setup Completion Definition

Repository setup is complete when:

- GitHub repo exists
- folder structure exists
- root docs exist
- Documents 1–17 are filed
- Reading Pack exists
- PROJECT_INDEX links all current docs
- CURRENT_STATUS reflects current phase
- CHANGELOG has initial milestone
- initial commit is pushed
- tag `v0.1-docs-foundation` is pushed
- Daniel can open the repo and navigate it
- future project prompts can refer to repository documents

---

# 31. Recommended Immediate Next Step

After this document:

1. Create/download all current Markdown files into one local folder.
2. Create GitHub repo `garden-stall`.
3. Use PowerShell to create repo folders.
4. File Documents 1–17.
5. Create root docs from this setup pack.
6. Commit and push.

Once the repository URL and local folder are known, generate a final one-block PowerShell command set tailored to Daniel’s machine.

---

# 32. Final Setup Definition

Document 17 turns The Garden Stall into a repo-ready project.

The project should now move from a sequence of ChatGPT workshop documents into a permanent GitHub Codex. The repository should contain the accepted foundation docs, root navigation files, a Reading Pack, implementation folders, artwork folders, playtest folders, archive folders, PowerShell helper scripts, and a clear first milestone tag. Future work should read from the repo first, update the repo when decisions are accepted, and avoid memory-only canon.

The setup question is:

> “Can Daniel create the repo, push the Codex, and give any future project window exact files to read without confusion?”
