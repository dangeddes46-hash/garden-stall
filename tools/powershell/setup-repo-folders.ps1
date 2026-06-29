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
