# Manual Auth Test Script

Run on a physical device or emulator. All checks must pass before sign-off.

## Environment
- Android emulator or physical device, API 21+
- App installed fresh (no prior data)
- Backend running at default base URL `http://10.0.2.2:5000/api/v1`

## Test Cases

| # | Scenario | Steps | Expected Result | Pass/Fail |
|---|----------|-------|-----------------|-----------|
| 1 | Fresh install → dark theme | Uninstall app, install, launch | Dark theme active, WelcomeScreen shows "Continue with GitHub" button, no spinner | |
| 2 | WelcomeScreen AppearanceToggle | Tap toggle on WelcomeScreen | Theme switches to light, toggle text/icon updates | |
| 3 | Theme persists across restart | Switch to light, kill app, reopen | Light theme still active | |
| 4 | Sign-in success | Tap "Continue with GitHub", complete OAuth in system browser | Redirect to /oauth-status showing success state, then to /jobs shell | |
| 5 | Sign-in cancel | Tap "Continue with GitHub", cancel in GitHub dialog | Redirect to /oauth-status showing "Sign-in cancelled" notice | |
| 6 | Sign-in deny | Tap "Continue with GitHub", deny permissions | Redirect to /oauth-status showing access denied message | |
| 7 | Airplane mode | Enable airplane mode, tap "Continue with GitHub" | Error shown, no crash, tokens not written | |
| 8 | Kill app + reopen (session restore) | Complete sign-in, kill app, reopen | App restores signed-in session, shows /jobs shell | |
| 9 | Expired token | Manually expire token (or wait), reopen app | /auth/me returns 401, refresh attempted, if refresh fails → signed out | |
| 10 | Non-candidate account | Sign in with GitHub account whose role != CANDIDATE | Redirect to /oauth-status showing access-denied (wrong role) | |
| 11 | Blocked account (403) | Sign in with blocked/deleted account | Redirect to /oauth-status showing blocked/deleted message | |
| 12 | GitHub account without email | Sign in with GitHub account that has no public email | Sign-in fails or proceeds without email (per backend contract) | |
| 13 | Back to Welcome from OAuthStatus | On OAuthStatusScreen with notice, tap "Back to Welcome" | Notice cleared, navigates to /welcome, sign-in button shown | |
| 14 | Retry with GitHub | On OAuthStatusScreen (cancelled), tap "Retry with GitHub" | New OAuth flow starts, fresh state param | |
| 15 | Dark mode default | First launch, no stored preference | Dark theme active (not system, not light) | |

## Acceptance
- Every row above executed and result recorded
- Any untested item listed with reason
- No crashes, no token leakage in logs/UI, no WebView used for OAuth
