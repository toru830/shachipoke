# Remote Connectivity Diagnostics

Commands executed to validate GitHub remote access from the current environment:

```bash
git remote -v
git ls-remote origin
git remote set-url origin git@github.com:toru830/shachipoke.git
git ls-remote origin
git remote remove origin
git remote add origin https://github.com/toru830/shachipoke.git
which gh
gh --version
curl -I https://api.github.com/user
```

Observed results:

- `git remote -v` confirms the `origin` remote is configured for `https://github.com/toru830/shachipoke.git`.
- `git ls-remote origin` over HTTPS fails with `CONNECT tunnel failed, response 403`, indicating the outbound proxy is blocking HTTPS tunneling.
- Switching to the SSH URL and re-running `git ls-remote origin` fails with `Network is unreachable` for `github.com:22`, showing SSH egress is also blocked.
- Removing and re-adding the remote does not change the failure mode; connectivity remains blocked.
- The GitHub CLI (`gh`) is not installed in this environment (`which gh` returns nothing and `gh --version` reports `command not found`).
- Direct GitHub API calls via `curl` return `HTTP/1.1 403 Forbidden` with `CONNECT tunnel failed`, confirming that generic HTTPS requests to GitHub are also blocked by the proxy.

Until outbound access is restored, pushes from this environment cannot reach GitHub regardless of remote URL format, credentials, or tooling choice.
