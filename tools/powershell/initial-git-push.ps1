# The Garden Stall — Initial Git Push
# Run from D:\Projects\garden-stall after the repo files are in place.

Set-Location "D:\Projects\garden-stall"

git init
git status
git add .
git commit -m "Add Garden Stall foundation Codex"
git branch -M main
git remote add origin https://github.com/dangeddes46-hash/garden-stall.git
git push -u origin main
git tag v0.1-docs-foundation
git push origin v0.1-docs-foundation
git status
