# Auth API contract (mobile) — backend FROZEN
Derived from backend code: `auth.route/controller/service/validation`, `checkAuth`, `githubAuth`, `globalErrorHandler`, `sendResponse`, `config/index.ts`. T00 verifies it against the live server; observed facts win.
`{BASE}` = `http://10.0.2.2:<port>/api/v1` on the Android emulator (`localhost` from the dev machine). Override with `--dart-define=API_BASE_URL=…`.

## 1. Envelope
Success `{success:true, statusCode, message, data, meta?}`. Error `{success:false, statusCode, message, errorSources?:[{path,message}]}`. In `development` errors also carry `stack` and `error` → never show or log them. Unwrap the envelope in ONE place.

## 2. Endpoints the app uses
| Method + path | Request | Response `data` | Notes |
|---|---|---|---|
| GET `/auth/github/url?state=` | — | `{url}` | GitHub authorize URL: `redirect_uri` = backend `GITHUB_CALLBACK_URL`, scope `read:user user:email`, `state` echoed |
| POST `/auth/github` | `{code, role:"CANDIDATE"}` | `{user, accessToken, refreshToken}` | No `state` field → the app must verify state itself. Code is single-use. |
| GET `/auth/me` | Bearer | `user` (no password) | 401 bad/expired token · 403 blocked/deleted |
| POST `/auth/refresh-token` | `{refreshToken}` in body | `{accessToken, refreshToken}` | New pair; old refresh NOT revoked. 401 → sign out |
| POST `/auth/logout` | — | null | Only clears cookies. Sign-out on device = delete tokens; optionally call it best-effort |
Not used: register, login, verify-email, forgot/reset/change-password, `/users/*`.
Auth header: `Authorization: Bearer <accessToken>` (server reads cookie first, then Bearer; the app has no cookie jar — don't add one). TTLs default access 1d / refresh 7d (env can change).

## 3. User shape and values
Role: `SYSTEM_ADMIN | RECRUITER | SUB_RECRUITER | CANDIDATE`. Status: `ACTIVE | BLOCKED | DELETED`.
Code references user fields `id, name, email, role, status, emailVerified, imageUrl, authProvider, githubId, createdAt, updatedAt`. **The uploaded `user.prisma` (passwordHash, githubToken, no status/name) does not match this code → treat it as stale; confirm via `/auth/me` in T00.** App model reads only `id, name, email, role, status, imageUrl?`; ignores everything else; never relies on `emailVerified`.

## 4. Server behaviors that shape the app
- GitHub sign-in matches an existing user by `githubId` OR `email`, so a Recruiter/Admin may come back with their role → app requires `role == CANDIDATE`, else access-denied + discard tokens.
- New GitHub users are created as CANDIDATE, `emailVerified=true` (we also send `role:"CANDIDATE"` explicitly).
- Blocked/deleted → 403. GitHub account without any email → 400. GitHub unreachable → 502. Reused/invalid code → 400. Don't parse message strings.

## 5. Sign-in flow and capture strategy
1. App makes a random `state`, calls `GET /auth/github/url?state=…`, gets `data.url`.
2. User signs in on GitHub; GitHub redirects to `GITHUB_CALLBACK_URL` (T00 prints it) with `?code&state` (or `?error=access_denied`).
3. App must READ `code`+`state` from that redirect BEFORE any web page consumes the code, verify `state`, then `POST /auth/github`, then `GET /auth/me`, role check, store tokens, go to Jobs.
Capture strategies (no backend change either way):
| | How | Needs | Trade-off |
|---|---|---|---|
| **A (default for dev/MVP)** | In-app WebView on a dedicated screen; `NavigationDelegate` cancels the navigation to the callback URL and reads `code`/`state` | `webview_flutter` (Q11) | Works for https or localhost callbacks, zero web/server change. Embedded browser: no shared GitHub session/passkeys; weaker than system browser. |
| **B (release hardening)** | System browser/Custom Tab + Android App Link on the callback URL | `assetlinks.json` hosted on the callback's domain + signing-cert SHA-256 + intent filter (a web static file, owner decision) | Strongest; app opens before the page loads |
| C | Custom scheme `talentgraph://…` | Only if `GITHUB_CALLBACK_URL` already is one | Not expected |
T00 decides C vs A/B from the observed `redirect_uri`. Choose A unless the owner chose B. Put the choice behind an `OAuthCapture` interface so B can replace A later.
No PKCE (backend doesn't support it).

## 6. Failure mapping
| Cause | Signal | AppFailure | UI |
|---|---|---|---|
| user closes WebView/browser | UI event | canceled | A02 cancelled (Stitch has it) + Retry |
| `error=access_denied` in return | query | denied | A02 denied + Retry |
| `state` missing/mismatch | local | expired | A02 failed + Retry |
| `/auth/github` 400 | status | failed | A02 failed; generic hint: check GitHub account has a verified email |
| `/auth/github` or `/auth/me` 403 | status | accountUnavailable | "This account can't sign in" + support wording from spec, no server text |
| 502 / 5xx / bad JSON | status | server | A02/S01 server + Retry |
| 401 on `/auth/me` → refresh fails | status | unauthorized | clear tokens → Welcome |
| no connectivity / timeout | exception | network | A02/S01 network + Retry (stored session kept on cold start) |
| role ≠ CANDIDATE | local | accessDenied | access-denied state, no role switch |
Never show server bodies, `stack`, or tokens.

## 7. Owner TODOs
- [ ] Send the value of `GITHUB_CALLBACK_URL` (not a secret) or run T00.
- [ ] Answer Q11 (WebView strategy A now, App Link B later?).
