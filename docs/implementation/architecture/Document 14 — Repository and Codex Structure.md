# THE GARDEN STALL
## Document 14 — Repository and Codex Structure

**Working Title:** The Garden Stall  
**Document Type:** Repository Specification / Codex Governance / Workflow Standard  
**Status:** Draft 001  
**Purpose:** Define the GitHub repository structure, Codex workflow, document filing rules, team roles, review process, branch policy, automation preferences, and source-of-truth principles for The Garden Stall.

---

# 1. Purpose of This Document

This document defines how The Garden Stall project should be organised once it moves into GitHub.

The project has now produced a substantial foundational design set. ChatGPT conversations have been useful as workshops, but they should not remain the permanent source of truth.

The repository should become the project’s permanent Codex as early as possible.

The core principle is:

> ChatGPT conversations are workshops. GitHub is the permanent Codex.

Once documents are accepted and filed in the repository, future work should begin by reading the relevant repository documents rather than relying on memory or older chat context.

This document adapts the successful Hothouse GitHub workflow for The Garden Stall.

---

# 2. Core Repository Principle

The Garden Stall repository should be:

- the single source of truth
- easy to navigate
- plain Markdown-first
- friendly to humans
- friendly to AI collaborators
- resistant to drift
- clear about accepted canon versus drafts
- suitable for design, art, implementation, and playtest work
- structured enough to scale without becoming bureaucratic

The repository should not be a dumping ground.

It should be curated.

---

# 3. Source of Truth Rule

Once the repository exists:

> The repository takes precedence over chat memory.

This means:

- accepted Markdown files in the repo are canon
- chat discussions are workshops until filed
- AI collaborators should not rely only on memory
- every substantial task should begin by reviewing relevant repo docs
- old chat notes should not override accepted repository documents
- if the repo and memory disagree, use the repo unless Daniel explicitly says otherwise

Every specialist prompt should include:

> Before beginning, review the current repository documents relevant to your area. The repository is the current source of truth.

---

# 4. Working Team Structure

The project should use three primary working roles.

These may be separate ChatGPT windows, specialist assistants, or eventually human collaborators.

## 4.1 Codex / Archivist Window

Owns:

- repository structure
- document filing
- indexes
- current status
- changelog
- naming conventions
- reading packs
- review archive
- decision reports
- release notes
- accepted/draft/archive separation
- drift prevention

Primary responsibility:

> Keep the permanent Codex organised, current, and trustworthy.

## 4.2 Graphics / Artist Window

Owns:

- visual style
- image prompts
- mockups
- visual consistency
- art direction
- asset concepts
- UI look and feel
- plant/display/background style
- visual bible
- production image workflow recommendations

Primary responsibility:

> Develop and protect the visual identity of The Garden Stall.

## 4.3 Main Design / Build Window

Owns:

- gameplay design
- mechanics
- build briefs
- prototype specification
- implementation interpretation
- playtest interpretation
- day-to-day project direction
- design corrections
- Builder handoff prompts

Primary responsibility:

> Turn the game concept into playable systems and implementation-ready instructions.

---

# 5. Role Coordination Principle

All project windows must read from the same repository.

They should not maintain separate private canons.

The Codex / Archivist window should reconcile specialist outputs before implementation.

Recommended flow:

1. Main design prepares or updates a design brief.
2. Artist or specialist reviews their relevant area.
3. Codex files accepted documents and archives review notes.
4. Codex produces a decision report if multiple reviews conflict.
5. Builder receives one consolidated action list.
6. Repository status and changelog are updated.

Avoid giving Builder multiple conflicting review lists.

---

# 6. Minimum Repository Documents

The repository should maintain these root/core documents:

- `README.md`
- `PROJECT_INDEX.md`
- `CURRENT_STATUS.md`
- `CHANGELOG.md`
- `/docs/reviews/Reading-Pack.md`

These files should be kept current.

## 6.1 README.md

Purpose:

- explain what The Garden Stall is
- explain repository purpose
- list current project phase
- link to key documents
- explain how to use the repo
- provide quick start instructions for future build

## 6.2 PROJECT_INDEX.md

Purpose:

- master index of all accepted documents
- organised by folder/category
- includes document status
- includes short descriptions
- includes links/paths
- helps AI windows find exact files

## 6.3 CURRENT_STATUS.md

Purpose:

- current phase
- latest accepted milestone
- active tasks
- pending decisions
- next recommended actions
- current build/prototype status
- known risks

## 6.4 CHANGELOG.md

Purpose:

- chronological record of accepted changes
- document additions
- major decisions
- build milestones
- version tags
- review outcomes

## 6.5 Reading-Pack.md

Purpose:

- exact document paths for each specialist to read before starting
- avoids relying on repository search alone
- updated before review cycles and major work passes

---

# 7. Recommended Folder Structure

Recommended initial repository structure:

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
│  │  ├─ Reading-Pack.md
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

The exact code structure may change once implementation begins, but the document structure should be stable.

---

# 8. Document Categories

## 8.1 `/docs/design/core/`

Contains foundational project documents.

Examples:

- vision
- pre-production brief
- core loop
- foundational principles
- game identity

## 8.2 `/docs/design/systems/`

Contains system specifications.

Examples:

- plant schema
- customer system
- location system
- wholesaler
- display
- economy
- staff
- notebook/skill tree

## 8.3 `/docs/design/prototype/`

Contains prototype-specific documents.

Examples:

- vertical slice plan
- build brief
- prototype scope
- prototype acceptance criteria

## 8.4 `/docs/design/future/`

Contains accepted future-facing design notes that are not part of the current prototype.

Examples:

- later suppliers
- greenhouse upgrades
- advanced staff
- full seasonal year
- deeper art/commercial expansion

## 8.5 `/docs/artwork/`

Contains art direction, prompts, visual bible, references, and generated/accepted asset notes.

Do not rely on chat images alone once visual decisions are accepted.

## 8.6 `/docs/implementation/`

Contains build briefs, architecture, data schemas, and implementation handoffs.

Builder should primarily receive documents from here.

## 8.7 `/docs/playtests/`

Contains playtest reports, exported debug data, weekly summaries, and human interpretation notes.

## 8.8 `/docs/reviews/`

Contains reading packs, specialist reviews, and Codex decision reports.

## 8.9 `/docs/archive/`

Contains superseded versions, rejected ideas, old drafts, and experiments.

Archived material is not canon unless explicitly restored.

---

# 9. Initial Document Filing Plan

The current document set should be filed into the repository.

Recommended initial filing:

## `/docs/design/core/`

- `Document 1 — Pre-Production Foundation Brief.md`
- `Document 2 — Core Vision Brief.md`
- `Document 6 — Core Loop Specification.md`

## `/docs/design/systems/`

- `Document 3 — Plant Schema and Tag Bible.md`
- `Document 4 — Customer and Request System.md`
- `Document 5 — Location Specification.md`
- `Document 8 — Wholesaler Interface Specification.md`
- `Document 9 — Display and Merchandising Specification.md`
- `Document 10 — Economy, Pricing and Stock Condition Specification.md`
- `Document 11 — Staff Pressure and Progression Specification.md`
- `Document 12 — Player Knowledge, Notebook and Skill Tree Specification.md`

## `/docs/design/prototype/`

- `Document 7 — Prototype 0.1 Vertical Slice Content Plan.md`
- `Document 7A — Consequential Design Concepts.md`
- `Document 13 — Prototype 0.1 Build Brief.md`

## `/docs/implementation/build-briefs/`

A copy or later implementation-adapted version of:

- `Document 13 — Prototype 0.1 Build Brief.md`

## `/docs/reviews/`

- `Reading-Pack.md`

This structure keeps design readable while separating prototype scope from long-term systems.

---

# 10. Naming Conventions

Documents should use readable names and remain true Markdown.

Rules:

- use `.md` only for real plain Markdown files
- do not rename `.docx` as `.md`
- preserve document numbers while the project is in early pre-production
- keep the em dash naming convention for consistency
- avoid duplicate names
- include status inside each document
- update index when adding documents

Example format:

```text
Document 14 — Repository and Codex Structure.md
```

Avoid:

```text
Document14-final-final.md
repo notes new.md
Document 14.md.docx renamed as .md
```

---

# 11. Accepted Canon Versus Drafts

The repository must separate accepted documents from draft or experimental material.

## 11.1 Accepted Canon

Accepted documents live in their appropriate active folder.

Examples:

- `/docs/design/core/`
- `/docs/design/systems/`
- `/docs/design/prototype/`
- `/docs/implementation/`

## 11.2 Drafts

Drafts should live in:

- `/docs/archive/drafts/`

or in a dedicated branch until accepted.

## 11.3 Experiments

Experiments should live in:

- `/docs/archive/experiments/`

Examples:

- alternative economy models
- rejected visual style tests
- unused plant list variants
- speculative mechanics

## 11.4 Superseded Versions

Superseded documents should move to:

- `/docs/archive/superseded/`

The active canon folder should contain the current accepted version only.

---

# 12. Review Workflow

The Hothouse lesson applies directly:

> Let specialists review, but let Codex reconcile the reviews before implementation.

## 12.1 Review Cycle

Recommended review cycle:

1. Codex prepares Reading Pack.
2. Specialist windows review assigned documents.
3. Reviews are saved under `/docs/reviews/specialist-reviews/`.
4. Codex compares reviews.
5. Codex creates Decision Report.
6. Accepted changes are filed into design/implementation docs.
7. Builder receives one consolidated action list.

## 12.2 Decision Reports

Decision reports should include:

- review sources
- agreements
- conflicts
- accepted changes
- rejected changes
- open questions
- implementation actions
- files to update

Decision reports live in:

- `/docs/reviews/decision-reports/`

---

# 13. Reading Pack Workflow

Do not rely on repository search alone.

Every major task should have a Reading Pack listing exact paths.

The Reading Pack should include:

- task purpose
- required files
- optional context files
- current status
- known conflicts
- output expected
- role-specific instructions

Example:

```md
# Reading Pack — Prototype 0.1 Build Pass

## Required
- /docs/design/prototype/Document 13 — Prototype 0.1 Build Brief.md
- /docs/design/systems/Document 8 — Wholesaler Interface Specification.md
- /docs/design/systems/Document 9 — Display and Merchandising Specification.md
- /docs/design/systems/Document 10 — Economy, Pricing and Stock Condition Specification.md

## Optional
- /docs/design/core/Document 2 — Core Vision Brief.md
- /docs/design/systems/Document 12 — Player Knowledge, Notebook and Skill Tree Specification.md
```

Specialist prompts should refer to this Reading Pack.

---

# 14. Branching Policy

Use simple GitHub branching.

## 14.1 Main Branch

`main` contains accepted current canon and stable prototype code.

Do not commit experimental work directly to `main` unless the project is still in a very early manual setup state.

## 14.2 Feature Branches

Use feature branches for bold implementation passes or major document rewrites.

Examples:

```text
feature/prototype-0-1-core-loop
feature/wholesaler-interface
feature/display-minigame
feature/art-direction-starter
docs/repository-setup
docs/prototype-build-brief
```

## 14.3 Review Before Merge

Before merging a feature branch:

- run or inspect prototype if code changed
- update relevant docs
- update PROJECT_INDEX
- update CURRENT_STATUS
- update CHANGELOG
- create review/decision note if needed

---

# 15. Versioning

Use simple versioning.

Suggested early project versioning:

- `v0.1-docs-foundation`
- `v0.2-prototype-brief`
- `v0.3-prototype-scaffold`
- `v0.4-first-playable`
- `v0.5-playtest-ready`

For the playable prototype itself:

- `Prototype 0.1`
- `Prototype 0.1A`
- `Prototype 0.1B`
- `Prototype 0.2`

Keep names understandable.

Avoid elaborate semantic versioning until the project needs it.

---

# 16. Changelog Rules

`CHANGELOG.md` should be updated whenever:

- a document is added
- a document is accepted
- a document is superseded
- a major design decision is made
- a prototype version changes
- a playtest cycle completes
- a review decision report is filed
- a branch is merged

Each entry should include:

- date
- change summary
- documents affected
- version/tag, if relevant
- decision/report link, if relevant

---

# 17. Current Status Rules

`CURRENT_STATUS.md` should answer:

- What phase is the project in?
- What is accepted?
- What is being worked on now?
- What is blocked?
- What is next?
- What files should new collaborators read first?
- What version/prototype is current?
- What major risks are known?

This file should be short enough to actually read.

It is the project dashboard.

---

# 18. Project Index Rules

`PROJECT_INDEX.md` should include:

- all accepted docs
- document number
- filename
- folder path
- status
- short description
- owner/role, if known
- last updated date, if maintained

Example row:

| Document | Path | Status | Purpose |
|---|---|---|---|
| Document 13 | `/docs/design/prototype/Document 13 — Prototype 0.1 Build Brief.md` | Accepted Draft | Defines first playable prototype scope |

This file is especially important for AI collaborators.

---

# 19. Playtest Report Storage

Playtest outputs should be saved in the repo.

Recommended locations:

## Raw debug exports

```text
/docs/playtests/raw-exports/
```

## Human-readable playtest reports

```text
/docs/playtests/reports/
```

## Summary/decision reports

```text
/docs/playtests/summaries/
```

Naming example:

```text
Playtest 001 — Prototype 0.1 — Daniel Solo Run.md
Playtest 001 — Debug Export.json
Playtest Summary 001 — Key Findings.md
```

The automatic playtest report from Prototype 0.1 should be easy to copy into these folders.

---

# 20. Art Repository Rules

Artwork should be handled carefully.

Do not mix accepted art, exploratory prompts, and random experiments.

Suggested art folders:

```text
/docs/artwork/visual-bible/
/docs/artwork/prompts/
/docs/artwork/mockups/
/docs/artwork/references/
/docs/artwork/assets/
```

## 20.1 Visual Bible

Accepted style decisions.

Examples:

- colour palette
- line style
- UI mood
- stall look
- plant illustration approach
- customer art direction
- background style
- icon style

## 20.2 Prompts

Prompts used to generate art.

These should be saved so accepted visuals can be reproduced or iterated.

## 20.3 Mockups

Exploratory or accepted mockup descriptions.

## 20.4 References

Non-generated references, inspiration notes, and style comparisons.

## 20.5 Assets

Accepted asset notes, links, filenames, or future production outputs.

Do not rely on chat image history alone.

---

# 21. Art Package / Image Tool Recommendation Process

The project currently expects to use AI image generation for early art exploration.

ChatGPT image generation is likely sufficient for:

- early style tests
- concept mockups
- background mood pieces
- UI visual exploration
- prompt iteration
- communicating art direction

However, before production art is locked, the project should compare available tools.

A later document should evaluate options such as:

- ChatGPT image generation
- Midjourney
- Stable Diffusion / local workflows
- Adobe Firefly
- Krita/Photoshop assisted paintover
- human artist refinement
- hybrid AI concept plus manual cleanup

The recommendation should consider:

- consistency
- editability
- character consistency
- UI asset suitability
- licensing/commercial safety
- ability to iterate from accepted mockups
- cost
- ease of use
- Daniel’s familiarity and workflow comfort

For now:

> Use ChatGPT image generation for early exploration, but do not treat tool choice as locked.

This belongs properly in Document 15 — Art Direction and Visual Bible Starter Brief.

---

# 22. Automation Preference

Daniel prefers PowerShell where possible, or CMD, for GitHub/repository pushing and setup.

The process should be as automated and copy-pasteable as possible.

The project should avoid asking Daniel to manually perform many confusing Git steps.

Repository setup should provide:

- PowerShell-first commands
- CMD fallback where useful
- clear one-block copy/paste commands
- minimal branching complexity at first
- simple explanations
- commands that create folders automatically
- commands that copy documents into correct locations if possible
- commands that initialise Git
- commands that commit and push
- commands that can be rerun safely where practical

Future setup scripts should live in:

```text
/tools/powershell/
/tools/cmd/
```

---

# 23. PowerShell Setup Script Recommendation

The repository should eventually include a PowerShell helper script.

Example location:

```text
/tools/powershell/setup-repo-folders.ps1
```

Purpose:

- create folder structure
- create placeholder README files
- verify expected directories
- optionally copy accepted docs into correct folders
- print next Git commands

Example command style:

```powershell
New-Item -ItemType Directory -Force -Path "docs/design/core"
New-Item -ItemType Directory -Force -Path "docs/design/systems"
New-Item -ItemType Directory -Force -Path "docs/design/prototype"
New-Item -ItemType Directory -Force -Path "docs/artwork/visual-bible"
New-Item -ItemType Directory -Force -Path "docs/implementation/build-briefs"
New-Item -ItemType Directory -Force -Path "docs/playtests/reports"
New-Item -ItemType Directory -Force -Path "docs/reviews/decision-reports"
New-Item -ItemType Directory -Force -Path "docs/archive/superseded"
```

The actual setup script should be produced when the repository is ready to be created.

---

# 24. PowerShell Git Push Workflow

When the repository is created, provide Daniel with a simple PowerShell workflow.

Example shape:

```powershell
git status
git add .
git commit -m "Add Garden Stall foundation documents"
git branch -M main
git remote add origin <REPOSITORY_URL>
git push -u origin main
```

If a remote already exists, use:

```powershell
git remote set-url origin <REPOSITORY_URL>
git push -u origin main
```

The actual commands should be generated only when the repository URL and local folder are known.

Important:

> Do not make Daniel assemble Git commands from fragments if one clear block can be provided.

---

# 25. Repository Setup Checklist

When ready to create the repo:

1. Choose repository name.
2. Create GitHub repository.
3. Create local folder.
4. Add folder structure.
5. Add root docs.
6. File accepted Markdown documents.
7. Create PROJECT_INDEX.
8. Create CURRENT_STATUS.
9. Create CHANGELOG.
10. Create Reading-Pack.
11. Commit initial Codex.
12. Push to GitHub.
13. Verify files in browser.
14. Tag first documentation milestone.
15. Update next-task prompt to use repository source-of-truth language.

Suggested repository name:

```text
garden-stall
```

Alternative:

```text
the-garden-stall
```

Recommended:

> `garden-stall`

It is short, clear, and repo-friendly.

---

# 26. Initial Repository Milestone

Suggested first repo milestone:

## `v0.1-docs-foundation`

Includes:

- Documents 1–14
- README
- PROJECT_INDEX
- CURRENT_STATUS
- CHANGELOG
- Reading Pack
- folder structure

This milestone marks:

> The Garden Stall now has a permanent Codex.

---

# 27. Initial Reading Pack

The first Reading Pack should support three roles.

## 27.1 Codex / Archivist Reading Pack

Required:

- README.md
- PROJECT_INDEX.md
- CURRENT_STATUS.md
- CHANGELOG.md
- Document 14 — Repository and Codex Structure.md
- Document 13 — Prototype 0.1 Build Brief.md

Purpose:

- maintain repo
- file docs
- update indexes
- prepare decision reports

## 27.2 Graphics / Artist Reading Pack

Required:

- Document 2 — Core Vision Brief.md
- Document 7 — Prototype 0.1 Vertical Slice Content Plan.md
- Document 9 — Display and Merchandising Specification.md
- Document 13 — Prototype 0.1 Build Brief.md
- future Document 15 — Art Direction and Visual Bible Starter Brief.md

Purpose:

- visual style
- prototype look
- stall/background/mockups
- visual bible

## 27.3 Main Design / Build Reading Pack

Required:

- Document 6 — Core Loop Specification.md
- Document 7A — Consequential Design Concepts.md
- Document 8 — Wholesaler Interface Specification.md
- Document 9 — Display and Merchandising Specification.md
- Document 10 — Economy, Pricing and Stock Condition Specification.md
- Document 12 — Player Knowledge, Notebook and Skill Tree Specification.md
- Document 13 — Prototype 0.1 Build Brief.md

Purpose:

- design continuation
- prototype build
- mechanics implementation
- playtest interpretation

---

# 28. Standard Prompt Header

Future specialist prompts should use this header:

```text
THE GARDEN STALL PROJECT

Before beginning:

Review the current repository documents relevant to your area.

The repository is the current source of truth.

Use the Reading Pack for exact document paths.

Do not rely on chat memory where repository documents exist.
```

For Builder:

```text
Your task is to implement only the accepted action list from the current Build Brief / Decision Report. Do not redesign systems unless explicitly instructed.
```

For Artist:

```text
Your task is to follow the accepted Visual Bible and current art brief. Do not drift into a different aesthetic without flagging it as an experiment.
```

For Codex:

```text
Your task is to preserve accepted canon, update indexes/status/changelog, and reconcile specialist reviews before implementation.
```

---

# 29. Drift Prevention Rules

To prevent drift:

- accepted docs must be filed promptly
- new work starts from repo docs
- Reading Pack paths must be explicit
- decisions should be recorded in CHANGELOG
- superseded docs should be archived
- major corrections should produce revision notes
- Builder should receive one action list
- art experiments should not overwrite visual canon
- playtest findings should be interpreted before changing systems
- memory-only decisions should be filed before being treated as canon

---

# 30. Handling Revisions

When a document needs revision:

1. Create a new draft or branch.
2. Identify what changed.
3. Note which earlier docs are affected.
4. Update the active document.
5. Move old version to archive/superseded if necessary.
6. Update PROJECT_INDEX.
7. Update CHANGELOG.
8. Update CURRENT_STATUS if the change affects current work.

Naming may use:

```text
Document 10 — Economy, Pricing and Stock Condition Specification.md
```

as the active file, with superseded versions archived as:

```text
Document 10 — Economy, Pricing and Stock Condition Specification — Superseded 2026-06-29.md
```

Avoid multiple active competing versions.

---

# 31. Implementation Handoff Rule

Implementation handoffs should be consolidated.

Builder should not be given:

- raw specialist review A
- raw specialist review B
- raw specialist review C
- old chat notes
- unresolved design debate

Builder should receive:

- current build brief
- current data schema
- one accepted action list
- relevant Reading Pack
- known exclusions
- acceptance criteria

This was a key Hothouse lesson and should be adopted from the start.

---

# 32. Playtest Workflow

Prototype playtests should follow a repeatable pattern.

1. Run prototype.
2. Export debug report.
3. Generate automatic playtest report.
4. Save raw export in `/docs/playtests/raw-exports/`.
5. Save readable report in `/docs/playtests/reports/`.
6. Main design interprets findings.
7. Codex files summary.
8. Accepted changes go into a Decision Report.
9. Builder receives consolidated action list.

Playtest reports should answer:

- Did the player understand the loop?
- What choices felt good?
- What confused them?
- Did display matter?
- Did stock condition feel fair?
- Did economy feel tight but recoverable?
- Did special requests help?
- Did the notebook feel useful?
- Did the week summary teach anything?
- What should change before next build?

---

# 33. Data Schema Planning

A future data schema document is required before implementation becomes complex.

Recommended:

## Document 16 — Data Schema Specification

Should define:

- plants
- stock batches
- trays
- display zones
- customers
- customer memories
- locations
- suppliers
- special requests
- orders
- sales logs
- notebook entries
- discoveries
- skills
- staff pressure metrics
- playtest exports

This should likely come before serious coding.

---

# 34. Current Recommended Next Steps

After Document 14:

1. Create Document 15 — Art Direction and Visual Bible Starter Brief.
2. Create Document 16 — Data Schema Specification.
3. Create initial GitHub repository.
4. File Documents 1–16.
5. Create root repo docs.
6. Create Reading Pack.
7. Create first implementation-ready build task.

Alternative:

If repo setup is urgent, create repository immediately after Document 14 and add Documents 15–16 afterward.

Recommended:

> Finish Document 15 and Document 16 first, then set up the repository with a stronger initial Codex.

---

# 35. Final Repository Definition

The Garden Stall repository should become the permanent Codex for the project.

ChatGPT remains the workshop, but GitHub becomes the record. The repo should clearly separate accepted design, implementation briefs, artwork, reviews, playtests, and archive material. It should maintain README, PROJECT_INDEX, CURRENT_STATUS, CHANGELOG, and a Reading Pack. Specialist windows should read exact paths from the repo before working. Codex should reconcile reviews before Builder acts. PowerShell-first automation should make setup, folder creation, committing, and pushing as simple as possible for Daniel.

The core repository question is:

> “Can any collaborator open this repo, read the right files, and understand what The Garden Stall currently is?”
