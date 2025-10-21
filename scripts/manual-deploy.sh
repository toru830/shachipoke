#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/toru830/shachipoke.git}"
BRANCH="${BRANCH:-main}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-Apply UI layout changes as requested}"
PATCH_FILE="${PATCH_FILE:-changes.patch}"

if [[ ! -d .git ]]; then
  echo "This script must be executed from the root of a cloned git repository." >&2
  exit 1
fi

if ! git remote | grep -qx "origin"; then
  git remote add origin "${REPO_URL}"
  echo "Configured origin remote: ${REPO_URL}"
else
  git remote set-url origin "${REPO_URL}"
  echo "Updated origin remote: ${REPO_URL}"
fi

git fetch origin "${BRANCH}" || echo "Warning: unable to fetch ${BRANCH}; continuing with local branch."

git checkout -B "${BRANCH}" "origin/${BRANCH}" 2>/dev/null || git checkout -B "${BRANCH}"

git pull --rebase origin "${BRANCH}" || echo "Warning: pull failed; verify network connectivity and rerun." >&2

if [[ -f "${PATCH_FILE}" ]]; then
  echo "Applying ${PATCH_FILE}..."
  git apply --check "${PATCH_FILE}"
  git apply "${PATCH_FILE}"
fi

if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

npm run build

git add -A

if git diff --cached --quiet; then
  echo "No staged changes to commit." >&2
else
  git commit -m "${COMMIT_MESSAGE}"
fi

git push origin "${BRANCH}"

echo "Deployment push complete. Verify GitHub Actions for build/deploy status."
