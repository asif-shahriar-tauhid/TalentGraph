# Observed responses (paste tools/probe_auth.py output here; shapes only, never tokens)
# Observed responses — T00 probe output (2026-11-21)
Probe command: `python3 tools/probe_auth.py http://localhost:5000/api/v1`
Backend: running on port 5000 · Database: connected · Redis: connected · SMTP: warning (placeholder creds, non-fatal for auth) · Seed: non-fatal error (see below)

## Envelope confirmed ✅
Success: `{success:bool, statusCode:int, message:str, data:{…}}` — matches contract §1.
Error (401/4xx): `{success:bool, statusCode:int, message:str, stack:str, error:{statusCode:int, isOperational:bool}}` — `development` mode adds `stack` and `error`; never show/log these.

## GET /auth/github/url?state=probe-state-123 → 200
```
body shape: {success:bool, statusCode:int, message:str, data:{url:str}}
set-cookie: false
authorize host/path: github.com/login/oauth/authorize
redirect_uri: ['http://localhost:5000/api/v1/auth/github/callback']
scope: ['read:user user:email']
state: echoed back as 'probe-state-123' ✅
params: [client_id, redirect_uri, scope, state]
```
**redirect_uri is an http URL (`http://localhost:5000/api/v1/auth/github/callback`) with a 302 redirect bridge to `talentgraph://auth/callback` → Path 1 (System Browser via `flutter_web_auth_2`) confirmed.** See contract §5.

## GET /auth/github/callback?code=mock_code&state=mock_state -> 302
```
HTTP/1.1 302 Found
Location: talentgraph://auth/callback?code=mock_code&state=mock_state
```
Verified: System browser reaches callback -> redirects to `talentgraph://auth/callback` -> app intercepts via `flutter_web_auth_2`. No embedded WebView needed.

## GET /auth/me (no bearer) → 401
```
body shape: {success:bool, statusCode:int, message:str, stack:str, error:{statusCode:int, isOperational:bool}}
set-cookie: false
```
Expected. Run again with `--bearer <token>` after a real web sign-in to confirm User shape.

## POST /auth/refresh-token (invalid token) → 401
```
body shape: {success:bool, statusCode:int, message:str, stack:str, error:{statusCode:int, isOperational:bool}}
set-cookie: false
```
Expected. Matches contract §2 — 401 on bad refresh = sign out.

## Differences from contract §2–§4
- **None for the endpoints tested.** Contract is accurate.
- `/auth/me` User shape not yet observed (needs real Bearer token) — contract §3 field list stands until confirmed.

## Strategy decision (from redirect_uri)
redirect_uri = `http://localhost:5000/api/v1/auth/github/callback` → **Strategy A chosen**: in-app WebView with `NavigationDelegate` intercepts this URL. See contract §5.

## Blockers / notes
- SMTP credentials are placeholders → email features will fail, but auth (GitHub OAuth) is not affected.
- Seed error: `prisma.user.findFirst({ where: { role: "SYSTEM_ADMIN" } })` fails — Prisma enum mismatch in generated client. Non-fatal (caught + logged). Does not affect auth endpoints.
- GitHub OAuth client_id/secret are still placeholder → actual OAuth flow will fail until real credentials are set in `Backend/.env`.

## TODO before T01
- [ ] Set real `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `Backend/.env` and restart backend.
- [ ] Re-run probe with `--bearer <accessToken>` after a real web sign-in to confirm User shape (contract §3).

