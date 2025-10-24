# Remote Connectivity Diagnostics

Commands executed to validate GitHub remote access from the current environment:

```bash
git remote -v
git ls-remote origin
git remote set-url origin git@github.com:toru830/shachipoke.git
git ls-remote origin
```

Observed results:

- `git remote -v` confirms the `origin` remote is configured for `https://github.com/toru830/shachipoke.git`.
- `git ls-remote origin` over HTTPS fails with `CONNECT tunnel failed, response 403`, indicating the outbound proxy is blocking HTTPS tunneling.
- Switching to the SSH URL and re-running `git ls-remote origin` fails with `Network is unreachable` for `github.com:22`, showing SSH egress is also blocked.

Until outbound access is restored, pushes from this environment cannot reach GitHub regardless of remote URL format or credentials.
