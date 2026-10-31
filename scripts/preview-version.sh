#!/usr/bin/env bash
# Preview any archived version locally without touching your working tree.
# Usage: scripts/preview-version.sh archive/v3-record-space [port]
set -euo pipefail
ref="${1:?usage: preview-version.sh <branch, e.g. archive/v3-record-space> [port]}"
port="${2:-4321}"
dir=".versions/${ref//\//_}"
git fetch -q origin "$ref"
rm -rf "$dir"; git worktree prune
git worktree add -q --detach "$dir" "origin/$ref"
cd "$dir" && npm ci --silent && npm run build --silent
echo "Previewing $ref at http://localhost:$port/portfolio/ (Ctrl+C to stop)"
exec npx astro preview --port "$port"
