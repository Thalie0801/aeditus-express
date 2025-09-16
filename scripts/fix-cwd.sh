#!/usr/bin/env bash
set -euo pipefail
# Si le cwd est invalide (uv_cwd), on saute au HOME ou /
pwd >/dev/null 2>&1 || cd ~ || cd /
echo "CWD=$(pwd)"

# Option: revenir dans le repo si présent
if ! [ -d ".git" ]; then
  [ -d "$HOME/work/aeditus-express/.git" ] && cd "$HOME/work/aeditus-express"
fi

# Activer pnpm proprement
if command -v corepack >/dev/null 2>&1; then
  corepack enable || true
  corepack prepare pnpm@latest --activate || true
fi

pnpm -v || true
echo "OK."
