# Deployment Playbook

This environment cannot reach GitHub over HTTPS or SSH (see `REMOTE_DIAGNOSTICS.md` for the command output). To ship UI updates regardless of that limitation, run the deployment flow from a workstation that **can** reach GitHub. The steps below assume you have permission to push to `toru830/shachipoke` and that GitHub Pages is already configured for the `main` branch.

## Prerequisites

1. Install **Node.js 18+** and **npm**.
2. Install **git** and authenticate with GitHub (via SSH key or HTTPS token).
3. Clone `https://github.com/toru830/shachipoke.git` locally or use an existing clone.
4. Copy the `changes.patch` file from this repository (or download it from the PR artifacts) into the root of your local clone. The patch contains the UI, shop, and formation updates requested earlier.

## One-time setup

If you plan to reuse the helper script:

```bash
chmod +x scripts/manual-deploy.sh
```

## Updating the site

### Option A: Guided script

Run the helper script from the repository root. It applies the patch (if present), installs dependencies, builds the project, commits, and pushes.

```bash
./scripts/manual-deploy.sh
```

Environment variables you can override:

| Variable | Purpose | Default |
|----------|---------|---------|
| `REPO_URL` | Target repository remote | `https://github.com/toru830/shachipoke.git` |
| `BRANCH` | Branch to push | `main` |
| `COMMIT_MESSAGE` | Commit message used when staging changes | `Apply UI layout changes as requested` |
| `PATCH_FILE` | Patch file to apply before building | `changes.patch` |

> **Note:** The script will warn (not abort) if network requests fail, so you can re-run it after fixing connectivity.

### Option B: Manual steps

1. Ensure the `origin` remote points at `https://github.com/toru830/shachipoke.git`:
   ```bash
   git remote set-url origin https://github.com/toru830/shachipoke.git
   git remote -v
   ```
2. Fetch and check out `main`:
   ```bash
   git fetch origin main
   git checkout main
   git pull --rebase origin main
   ```
3. Apply the patch with the latest UI/layout changes (skip if already merged):
   ```bash
   git apply --check changes.patch
   git apply changes.patch
   ```
4. Install dependencies and build the production bundle:
   ```bash
   npm ci  # or npm install if package-lock.json has changed
   npm run build
   ```
5. Stage, commit, and push:
   ```bash
   git add -A
   git commit -m "Apply UI layout changes as requested"
   git push origin main
   ```
6. Monitor GitHub Actions: confirm the Pages workflow runs to completion.
7. After deployment finishes, hard-refresh https://shachipoke.syachiku-life.com/ or open it in a private window to bypass caches.

## Troubleshooting

- If `git push` fails with authentication errors, generate a new Personal Access Token (PAT) and use it with HTTPS, or configure SSH keys.
- If GitHub Pages still serves the old bundle, check the `dist/index.html` that was deployed—ensure it references the latest hashed assets produced by `npm run build`.
- Clear the browser cache or append a cache-busting query string (e.g., `?t=$(date +%s)`) when verifying the live site.

By following the script or manual steps from a network-enabled environment, the requested UI changes will reach GitHub and trigger the GitHub Pages deployment pipeline.
