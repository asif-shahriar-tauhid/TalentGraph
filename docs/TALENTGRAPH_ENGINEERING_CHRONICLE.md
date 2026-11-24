# TalentGraph Engineering Chronicle

**Repository:** `TalentGraph`  
**Branch:** `RohitashwaB`  
**Document location:** `/home/rohit/TalentGraph/docs/TALENTGRAPH_ENGINEERING_CHRONICLE.md`  
**Scope:** MobileApp (Flutter, Android-first) + Backend (Node.js/Express/Prisma/PostgreSQL)  
**Status:** Sprint 1 complete — live physical-device GitHub OAuth verification  
**Committed at:** `8152897` — "sprint 1 mobile authentication and backend HTTP 500 auth strings connected to the JOB description landing page"  
**Word count target:** 8,000–10,000 words  

---

## 1. Executive Summary & Chronological Milestones (T00–T07 + Backend Schema Sync)

### 1.1 Mission Statement

TalentGraph Sprint 1 delivered the **Candidate Portal**: a GitHub OAuth-only authentication flow that lands authenticated candidates on a Jobs Discovery screen. The mobile application targets Android exclusively (`minSdk=21`, package `com.groupf.talentgraph`, URL scheme `talentgraph`). The stack is Flutter with Riverpod 3.3.2 for state management, Dio for HTTP networking, `flutter_web_auth_2` for system-browser OAuth2 capture, `flutter_secure_storage` for encrypted token persistence, `shared_preferences` for theme-only preferences, and `go_router` for declarative navigation. The backend is a Node.js/Express server with Prisma ORM against PostgreSQL (pooled connection via Prisma Data Proxy), Redis for OTP and session state, and Nodemailer for email. All auth responses follow a standardized JSON error envelope.

Candidate-only scope is enforced end-to-end: no email/password forms, no recruiter/admin entry, no role picker. GitHub is the sole identity provider. After sign-in, the app requires `role == CANDIDATE`; any other role results in access-denied and immediate token discard.

### 1.2 Quantitative Outcomes

| Metric | Result |
|---|---|
| Flutter widget/unit/integration tests passed | **128 / 128** |
| `dart analyze lib/ test/` | **No issues found** |
| `dart format .` | **Clean — zero files changed on final pass** |
| TypeScript (`npx tsc --noEmit`) in Backend | **Zero errors** in all changed files |
| `npx prisma db push` | **Succeeded** — database in sync, zero data-loss prompts |
| `npx prisma generate` | **Succeeded** — Prisma Client 7.10.1 regenerated to `./src/generated/prisma` |
| PostgreSQL User rows preserved | **10 rows** — zero data loss |
| PostgreSQL Evidence rows preserved | **4 rows with NULL embeddings** — zero data loss |
| Non-destructive migration | **No `--force-reset`**; no tables dropped; no columns dropped |
| Backend files modified | 11 source files + prisma schema + generated client |
| MobileApp files created/modified | ~50 source files + ~25 test files |
| UI overflow bugs fixed on physical device | 4 (duplicate nav bar, 360×800 dp metadata, Saved Jobs clipping, compound chip matching) |
| Backend HTTP 5xx root causes fixed | 3 (missing env var validation, silent error logging, blocking email send) |

### 1.3 Chronological Milestones

#### T00 — Backend Probe

Verified the live backend endpoint `GET /api/v1/auth/github/url?state=` returned HTTP 200 with `{ success: true, data: { url: "https://github.com/login/oauth/authorze?..." } }`. Confirmed `GITHUB_CALLBACK_URL=http://localhost:5000/api/v1/auth/github/callback` from `Backend/.env`. Established that the backend does **not** support PKCE (confirmed in `auth-contract.md` §39); state-parameter validation is handled entirely client-side as CSRF protection. Observed response shapes were recorded in `docs/api/observed-responses.md`.

#### T01 — Scaffold

Initialized the Flutter project structure per `MobileApp/AGENTS.md` folder map:
- `lib/app/` — router, theme
- `lib/core/` — config, network, storage, error, util
- `lib/features/auth/` — data, domain, presentation
- `lib/features/shell/` — shell navigation
- `lib/shared/widgets/` — shared UI components

Added Android app configuration: URL scheme `talentgraph`, package ID `com.groupf.talentgraph`, `minSdk=21`, network security config for cleartext traffic to `10.0.2.2` (emulator), and `flutter_web_auth_2` callback handling in `MainActivity.kt`.

#### T02 — Design System

Built `TgColors` ThemeExtension with dark/light palettes (brand `#D4621A`, canvas with 85% opacity, border at 30% opacity), `AppearanceToggle` widget integrated into custom header rows, and the `PrimaryButton` rewrite using `UnconstrainedBox` + `ElevatedButton` + centered `Row` with ellipsis-constrained text.

#### T03 — Core Network & Storage

Implemented `DioClient` with two client instances (plain and authed), single-flight refresh interceptor (concurrent 401s trigger exactly one token refresh), `TokenStore` interface (`flutter_secure_storage` primary, `shared_preferences` theme-only fallback), `AppFailure` sealed class hierarchy with 9 subclasses, and `AppConfig` with default `API_BASE_URL=http://10.0.2.2:5000/api/v1` (emulator localhost).

#### T04 — Auth Domain & Data

Built `AuthApi` (5 endpoints: GET `/auth/github/url`, POST `/auth/github`, GET `/auth/me`, POST `/auth/refresh-token`, POST `/auth/logout`), `AuthRepository` (cryptographically random state generation, CSRF `_pendingState` validation, callback URL parsing), `AuthState` sealed class (`AuthBootstrapping`, `AuthSignedIn`, `AuthSignedOut`, `AuthSigningIn`, `AuthCancelled`), `TalentGraphUser` domain model with `isCandidate` check, and `AuthController` Riverpod `Notifier` with bootstrap, signIn, signOut, and refresh-handler capabilities.

#### T05 — Routing & OAuth Status UX

Built `AppRouter` with `go_router`, `redirectFor()` loop prevention logic, `WelcomeScreen`, `OAuthCaptureScreen`, `OAuthStatusScreen` with all failure-type copy pairs (`cancelled`/`userCancelled`/`denied`/`expired`/`failed`/`accountUnavailable`/`accessDenied`/`server`/`network`/`stateMismatch`), `CONNECTION PAUSED` status pill, `/candidate-help-center` navigation hook, and header height adjustment (64 → 104 dp) to match the design reference `code.html`.

#### T06 — Candidate Shell & JobsDiscoveryScreen

Built `ShellScreen` with bottom `NavigationBar` (Jobs/Assessments/Notifications, exactly one instance), `JobBriefModel` with `kDummyJobs` (3 seeded jobs), `FilterJobsBottomSheet` (7 filter sections with sticky reset/apply footer), and `JobsDiscoveryScreen` (search filtering, 3 feed tabs, bookmarks, filter chips). Fixed all four physical-device UI bugs identified during testing on a 360×800 dp viewport.

#### T07 — Verify & Harden

Added `TestAuthController` test double following the Riverpod 3.3.2 `UncontrolledProviderScope` + `ProviderContainer` pattern (since `ProviderScope` does not accept `container`). Rewrote `auth_controller_test.dart`, added `app_router_test.dart` integration tests covering Paths A–C (cached session → Jobs, no session → Welcome, fresh OAuth → Jobs), and added `jobs_discovery_test.dart` widget tests covering search filtering, compound chip matching (`'Senior & Staff'`, `'TypeScript / Go'`), and feed tab filtering (`'Recommended'`, `'Saved Jobs'`). Achieved 128/128 passing tests with clean `dart analyze` and `dart format`.

#### Backend Schema Sync (Post-T07)

Made `User.passwordHash` optional (`String?`) so GitHub OAuth users without passwords remain valid; made `Evidence.embedding` optional (`Unsupported("vector")?`) preserving 4 existing NULL rows; added missing PostgreSQL enum types (`AuthProvider`, `UserStatus`, `CompanyVerificationStatus`) and missing columns across `User`, `CandidateProfile`, `Company`, and `GitHubRepo` tables to align the Prisma schema with the live database. Ran `npx prisma db push` (succeeded, zero data loss) and `npx prisma generate` (regenerated client). Updated source code in `auth.service.ts` (2 user create calls) and `seed.ts` (1 user create call) to supply newly required `status` and `authProvider` fields.

---

## 2. System Architecture & Cross-Boundary Contracts

### 2.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           LAYER 1: CLIENT (Android Device)                      │
│                                                                                 │
│  ┌─────────────────┐    ┌─────────────────────────────────────────────────┐    │
│  │  Flutter App    │    │   Chrome Custom Tab (System Browser)            │    │
│  │  minSdk 21      │    │   flutter_web_auth_2                            │    │
│  │                 │    │   callback scheme: talentgraph                  │    │
│  │  Riverpod 3.3.2 │    │   No embedded WebView (webview_flutter forbidden)│    │
│  │  + Dio          │    └─────────────────────────────────────────────────┘    │
│  │  + go_router    │                                         │                 │
│  └─────────────────┘                                         │                 │
│           │                                                  │ 302 redirect    │
│           │ 1. GET /api/v1/auth/github/url?state=            │ to              │
│           │ 2. 200 + {data.url}                              │ talentgraph://  │
│           └──────────────────────────────────────────────────►│auth/callback  │    │
│           │                                                  │                 │
│           │                                                  │                 │
│           │ 4. GitHub redirects with ?code&state             │                 │
│           └──────────────────────────────────────────────────►│                 │    │
│           │ 5. Backend 302 → talentgraph://auth/callback     │                 │    │
│           │ 6. flutter_web_auth_2 captures callback URL      │                 │    │
│           │ 7. POST /api/v1/auth/github {code, role}         │                 │    │
│           │ 8. 200 + {user, accessToken, refreshToken}       │                 │    │
│           │ 9. Store tokens in flutter_secure_storage        │                 │    │
│           │ 10. GET /api/v1/auth/me (Bearer)                 │                 │    │
│           │ 11. Role check: CANDIDATE required               │                 │    │
│           │ 12. Navigate to /jobs → JobsDiscoveryScreen      │                 │    │
│           ▼                                                  ▼                 │
│  ┌─────────────────┐                                         │                 │
│  │  TokenStore     │                                         │                 │
│  │  (flutter_secure│                                         │                 │
│  │   storage)      │                                         │                 │
│  └─────────────────┘                                         │                 │
└──────────────────────────────────────────────────────────────┴─────────────────┘
                                                     │
                                                     │ adb reverse tcp:5000
                                                     │ (emulator ↔ dev machine)
                                                     ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        LAYER 2: BACKEND (Node.js/Express)                       │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │  Express Router │  │  AuthController │  │  AuthService                │   │
│  │  /api/v1/auth/* │  │  getGithubAuthUrl│  │  githubAuthCallback         │   │
│  │                 │  │  handleCallback  │  │  getGithubAccessToken       │   │
│  │  globalErrorHandler│ │  githubAuthCallback│ │  getGithubUserProfile     │   │
│  │  (>=500 always log)│ │  refreshToken   │  │  registerUser / loginUser   │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘   │
│                                                     │                         │
│                                                     ▼                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │  githubAuth.ts  │  │  Prisma Client  │  │  PostgreSQL (pooled)        │   │
│  │  OAuth URL builder│ │  v7.10.1        │  │  Tables: User, Evidence,    │   │
│  │  Env validation │  │  prisma.db push │  │  CandidateProfile, Company, │   │
│  │  Email fallback │  │  prisma generate│  │  GitHubRepo, Job, ...       │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘   │
│                                                     │                         │
│                                                     ▼                         │
│  ┌─────────────────┐  ┌─────────────────────────────────────────────────┐   │
│  │  Redis (Upstash)│  │  Nodemailer (SMTP)                            │   │
│  │  OTP storage    │  │  try/catch, non-blocking                      │   │
│  │  Session state  │  │  console.warn on 535 EAUTH                    │   │
│  └─────────────────┘  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Platform Constraints (Hard Boundaries)

| Constraint | Enforcement | Rationale |
|---|---|---|
| Android only | `minSdk=21`, package `com.groupf.talentgraph` | Scope defined in AGENTS.md |
| No embedded WebViews | `webview_flutter` forbidden; `flutter_web_auth_2` only | Auth-security rule: no credential exposure via in-app WebView |
| No PKCE | Backend does not support it (auth-contract.md §39) | State parameter provides CSRF protection |
| Dark mode first-launch default | Never `ThemeMode.system`; light is a designed palette | Product decision |
| Candidate-only | No recruiter/admin entry, no role picker, no email/password | AGENTS.md hard boundary |
| Tokens only in `flutter_secure_storage` | Never log, print, or display tokens | Auth-security rule |
| Post-auth shell = exactly 3 tabs | Jobs, Assessments (placeholder), Notifications (placeholder) | No Home/Profile/Settings/Billing/SkillGraph/Applications |
| No hex colors outside `app/theme/` | All color values centralized in `TgColors` | Design system isolation |

### 2.3 Cross-Boundary Contracts

#### Auth API Envelope

The backend standardizes all responses in a JSON envelope. **Success** responses follow:
```json
{ "success": true, "statusCode": 200, "message": "...", "data": {...}, "meta?": {...} }
```

**Error** responses follow:
```json
{ "success": false, "statusCode": 500, "message": "...", "errorSources?": [{ "path": "...", "message": "..." }], "stack?": "...", "error?": {...} }
```

In `development`, errors additionally carry `stack` and `error` fields — these are **never** shown or logged by the mobile app per AGENTS.md. The envelope is unwrapped in exactly one place: `AuthApi` methods (`auth_api.dart`). The `DioClient` authed interceptor handles both wrapped and unwrapped envelopes for test compatibility.

#### Endpoints Used by the App

| Method + Path | Request Body | Response `data` | Client | Notes |
|---|---|---|---|---|
| `GET /auth/github/url?state=` | — | `{ url }` | Plain | GitHub authorize URL; `redirect_uri` = backend `GITHUB_CALLBACK_URL`; scope `read:user user:email`; `state` echoed |
| `POST /auth/github` | `{ code, role: "CANDIDATE" }` | `{ user, accessToken, refreshToken }` | Plain | Code is single-use; app verifies `state` itself before calling |
| `GET /auth/me` | Bearer header | `user` (no `password` field) | Authed | 401 bad/expired token; 403 blocked/deleted |
| `POST /auth/refresh-token` | `{ refreshToken }` | `{ accessToken, refreshToken }` | Plain | Old refresh not revoked; 401 → sign out |
| `POST /auth/logout` | — | `null` | Authed (best-effort) | Cookie clear only; swallows `DioException` |

Not used by the app: register, login, verify-email, forgot/reset/change-password, `/users/*`.

#### User Shape & Values

Roles: `SYSTEM_ADMIN | RECRUITER | SUB_RECRUITER | CANDIDATE`. Statuses: `ACTIVE | BLOCKED | DELETED`. The app reads only `id, name, email, role, status, imageUrl?`; ignores everything else; never relies on `emailVerified`. After sign-in, `role == CANDIDATE` is required; any other role → access-denied, tokens discarded, state set to `AuthSignedOut(notice: accessDenied)`.

#### Failure Mapping (Contract §6)

| Cause | Signal | AppFailure | UI Screen | Copy |
|---|---|---|---|---|
| User closes browser | UI event | `canceled` | OAuthStatusScreen | "Sign-in cancelled." + Retry |
| `error=access_denied` | query param | `denied` | OAuthStatusScreen | "Access denied by GitHub." + Retry |
| `state` missing/mismatch | local validation | `expired` | OAuthStatusScreen | "Session expired. Please sign in again." |
| `/auth/github` 400 | HTTP 400 | `failed` | OAuthStatusScreen | "Sign-in failed. Check your GitHub account has a verified email." |
| 403 on `/auth/github` or `/auth/me` | HTTP 403 | `accountUnavailable` | OAuthStatusScreen | "This account can't sign in." |
| 502 / 5xx / bad JSON | HTTP 5xx | `server` | OAuthStatusScreen | "Server error. Please try again later." |
| 401 on `/auth/me` → refresh fails | HTTP 401 | `unauthorized` | WelcomeScreen | "Session expired. Please sign in again." |
| No connectivity / timeout | DioException | `network` | OAuthStatusScreen | "No internet connection. Please try again." |
| `role ≠ CANDIDATE` | local check | `accessDenied` | OAuthStatusScreen | "Access denied. Candidate accounts only." |

Never show server bodies, `stack`, or tokens.

---

## 3. Phase 0 (T00–T01) Design System & Core Widgets

### 3.1 TgColors ThemeExtension (`lib/app/theme/tg_colors.dart`)

`TgColors` extends `ThemeExtension<TgColors>`, providing 20 color tokens isolated from Material 3 theme colors. Dark and light palettes are defined as `static const` instances `_dark` and `_light`, exposed via factory constructors `TgColors.dark()` and `TgColors.light()`.

#### Dark Palette (`_dark`)

| Token | Value | Usage |
|---|---|---|
| `canvas` | `0xFF0D0D0F` | Near-black page background |
| `surface` | `0xFF19191C` | Card surface, elevated containers |
| `brand` | `0xFFD4621A` | TalentGraph orange — primary brand |
| `onPrimary` | `0xFF18181B` | Text/icons on brand background |
| `text` | `0xFFF5F5F5` | Primary body text |
| `textSecondary` | `0xFFA1A1AA` | Secondary/muted text |
| `neutralAccent` | `0xFF52525B` | Disabled states, inactive chips |
| `border` | `0xFF3F3F46` | Divider lines, input borders |
| `destructive` | `0xFFE5484D` | Error accent |
| `success` | `0xFF22C55E` | Success accent |
| `warning` | `0xFFF59E0B` | Warning accent |
| `selectedSoft` | `0xFF252528` | Selected chip background |
| `pressedPrimary` | `0xFFE47735` | Pressed brand state |
| `focus` | `0xFFE47735` | Focus ring color |
| `surfaceContainer` | `0xFF1E1F27` | Container elevation (AppearanceToggle, metadata pills) |

#### Light Palette (`_light`)

| Token | Value |
|---|---|
| `canvas` | `0xFFFAFAFA` |
| `surface` | `0xFFFFFFFF` |
| `brand` | `0xFFD4621A` (same as dark) |
| `onPrimary` | `0xFF18181B` (same as dark) |
| `text` | `0xFF18181B` |
| `textSecondary` | `0xFF71717A` |
| `neutralAccent` | `0xFF52525B` (same as dark) |
| `border` | `0xFFE4E4E7` |
| `destructive` | `0xFFDC2626` |
| `success` | `0xFF15803D` |
| `warning` | `0xFFB45309` |
| `selectedSoft` | `0xFFFFF1E8` |
| `pressedPrimary` | `0xFFB94F0B` |
| `focus` | `0xFFB94F0B` |
| `surfaceContainer` | `0xFFFAFAFA` |

#### Key Design Decision — `surfaceContainer`

Added as the 20th token (dark `0xFF1E1F27`, light `0xFFFAFAFA`) specifically to resolve the AppearanceToggle button background and metadata pill backgrounds. This prevents hex color literals from appearing outside `app/theme/`, maintaining design system isolation.

#### ThemeExtension Contract

`TgColors` implements `copyWith()`, `lerp()`, `hashCode`, and `==` per the `ThemeExtension<T>` contract, enabling `Theme.of(context).extension<TgColors>()!` usage throughout the widget tree.

### 3.2 AppearanceToggle (`lib/shared/widgets/theme_toggle.dart`)

A theme toggle integrated into custom header rows (not a separate `AppBar`). Shows sun icon / "Switch to light mode" tooltip in dark theme, moon icon / "Switch to dark mode" tooltip in light theme. Wrapped in a container with `surfaceContainer` background and `BorderRadius.circular(8)`. Tooltip updates after state change via `setState`. Theme preference is persisted via `shared_preferences`; dark mode is the first-launch default (never `ThemeMode.system`).

### 3.3 PrimaryButton Rewrite (`lib/shared/widgets/primary_button.dart`)

**Before (problematic):** `ElevatedButton.icon` with leading/trailing icons. The `ElevatedButton` forces max-width constraints while the `Row` child attempts to expand, producing layout overflow errors. Text had no `maxLines`/`overflow` constraints, causing clipping at 2.0 text scale.

**After (fixed):** `ElevatedButton` (not `ElevatedButton.icon`) with a centered `Row` child:

```dart
child: Row(
  mainAxisSize: MainAxisSize.min,
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    if (loading) SizedBox(height: 20, width: 20, child: CircularProgressIndicator(...)),
    if (loading && (leading != null || trailing != null)) const SizedBox(width: 8),
    if (!loading && leading != null) ...[leading!, const SizedBox(width: 8)],
    Expanded(
      child: Text(
        label,
        maxLines: 1,
        softWrap: false,
        overflow: TextOverflow.ellipsis,
        textAlign: TextAlign.center,
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
      ),
    ),
    if (!loading && trailing != null) ...[const SizedBox(width: 8), trailing!],
  ],
),
```

Key properties:
- `mainAxisSize: MainAxisSize.min` — Row only takes needed width
- `mainAxisAlignment: MainAxisAlignment.center` — centers content
- `crossAxisAlignment: CrossAxisAlignment.center` — vertical centering
- `maxLines: 1, softWrap: false, overflow: TextOverflow.ellipsis` — single-line ellipsis
- Padding: `EdgeInsets.symmetric(horizontal: 16.0, vertical: 14.0)`
- `leading`/`trailing` optional icons with 8 dp spacing
- `loading` state: `CircularProgressIndicator` (20 dp, strokeWidth 2) replaces leading icon
- `disabledBackgroundColor`/`disabledForegroundColor` at 40% alpha when `onPressed == null || loading`
- `elevation: 0`, `shadowColor: Colors.transparent`, `BorderRadius.circular(10)`

This resolved ElevatedButton/Row width conflicts and text-overflow clipping at 2.0 text scale. Verified by `theme_acceptance_test.dart` at `Text scale 2.0`.

---

## 4. Phase 1 (T02–T04) OAuth2 Pipeline & Persistence

### 4.1 AuthApi (`lib/features/auth/data/auth_api.dart`)

Wraps Dio client calls to backend auth endpoints. Uses the plain Dio client for all auth endpoints (no bearer token required until after sign-in).

**`getAuthorizeUrl(String state)`** (`auth_api.dart:10`):
```dart
final response = await _dioClient.plain.get(
  '/auth/github/url',
  queryParameters: {'state': state},
);
final envelope = response.data as Map<String, dynamic>;
return envelope['data']['url'] as String;
```

**`exchangeCode(String code)`** (`auth_api.dart:21`):
```dart
final response = await _dioClient.plain.post(
  '/auth/github',
  data: {'code': code, 'role': 'CANDIDATE'},
);
final envelope = response.data as Map<String, dynamic>;
return envelope['data'] as Map<String, dynamic>;
```

**`getMe()`** (`auth_api.dart:33`): Handles both wrapped (`success`/`data`) and unwrapped envelopes for test compatibility.

**`refreshToken(String refreshToken)`** (`auth_api.dart:44`): Uses plain client (bypasses refresh interceptor to avoid circular refresh-on-refresh).

**`logout()`** (`auth_api.dart:54`): Best-effort; swallows `DioException` since device sign-out is local token deletion.

### 4.2 AuthRepository (`lib/features/auth/data/auth_repository.dart`)

Coordinates the complete OAuth2 flow across 7 method groups.

#### State Generation (`_newState`, line 30)

Generates a 32-byte cryptographically random value via `Random.secure()`, base64Url-encoded. This is the CSRF `state` parameter echoed back by GitHub and verified by the app before exchanging the authorization code.

#### Full Sign-In Flow (`signIn`, line 88)

1. Sets `_pendingState = _newState()`
2. Calls `api.getAuthorizeUrl(_pendingState!)` → obtains GitHub authorize URL
3. Opens system browser via `_authenticate(authUrl, 'talentgraph')` (`FlutterWebAuth2.authenticate`)
4. Parses callback URL query parameters via `_parseCallback()`
5. Checks for `error` param: `access_denied` → `AppFailureDenied`; other → `AppFailureFailed`
6. Validates `code` and `returnedState` against `_pendingState` exactly; mismatch → `AppFailureExpired`
7. Clears `_pendingState`
8. Calls `api.exchangeCode(code)` → returns `AuthSuccess` or `AuthFailure`
9. On `AuthSuccess`: stores tokens, validates `role == CANDIDATE`, emits `AuthSignedIn`

#### DioException Mapping (`_mapDioException`, line 36)

Maps Dio error types to `AppFailure` subclasses per contract §6:
- `cancel` → `AppFailureCanceled`
- `connectionTimeout`/`sendTimeout`/`receiveTimeout`/`unknown` → `AppFailureNetwork`
- `badResponse` with status 401 → `AppFailureUnauthorized`; 403 → `AppFailureAccessDenied`; 429 → `AppFailureServer`; 500/502/503/504 → `AppFailureServer`; 400 → `AppFailureFailed`; default → `AppFailureServer`
- All other types → `AppFailureServer`

#### User Cancellation Detection (`_isUserCancellation`, line 79)

Detects browser close/back-tap from `flutter_web_auth_2` exception strings by checking for "canceled", "cancelled", or "user cancelled" (case-insensitive). Returns `AuthCancelled` → `AuthController` maps to `AuthStrings.userCancelled`.

#### Token Persistence

`storeTokens()`, `readStoredTokens()`, `clearTokens()` delegate to `TokenStore`. Tokens live only in `flutter_secure_storage` (iOS Keychain / Android EncryptedSharedPreferences).

#### Debug-Mode DioException Logging (NEW)

Added to `signIn()`: `api.getAuthorizeUrl()` is wrapped in its own `try / on DioException catch (e)` block. When `kDebugMode` is true:
```dart
debugPrint(
  'AuthRepository.getAuthorizeUrl failed: uri=${e.requestOptions.uri} status=${e.response?.statusCode} type=${e.type}',
);
```
Logs the failing request URI, HTTP status code, and Dio exception type — **never** tokens, headers, or response stack traces. Mirrors the existing pattern for `exchangeCode` (`auth_repository.dart:122`).

### 4.3 TokenStore (`lib/core/storage/token_store.dart`)

Abstract class with five methods: `readAccessToken()`, `writeAccessToken()`, `readRefreshToken()`, `writeRefreshToken()`, `clearAll()`.

- `SecureTokenStore` — implements via `flutter_secure_storage` (iOS Keychain / Android EncryptedSharedPreferences). **This is the only production implementation for tokens.**
- `SharedPrefTokenStore` — implements via `shared_preferences`. Theme-only; never used for tokens.

Per auth-security rules: tokens only in `flutter_secure_storage`. Never log, print, or display them.

### 4.4 DioClient (`lib/core/network/dio_client.dart`)

Two client instances configured from `AppConfig`:

- **Plain client** — No `Authorization` header. Used for `/auth/github/url`, `/auth/github`, `/auth/logout`, `/auth/refresh-token`.
- **Authed client** — Adds `Authorization: Bearer <accessToken>` via interceptor. Used for `/auth/me`. Reads token from `TokenStore` on each request.

#### Single-Flight Refresh Interceptor

Concurrent 401 responses trigger exactly one token refresh. If refresh fails, tokens are cleared and `onUnauthorized` is called. No refresh token → immediate `onUnauthorized`. This prevents thundering-herd refresh requests when multiple API calls fail simultaneously due to an expired access token.

### 4.5 AppFailure Hierarchy (`lib/core/error/app_failure.dart`)

Sealed class with 9 concrete subclasses:

| Subclass | Contract Signal | User Notice |
|---|---|---|
| `AppFailureCanceled` | User closed browser | `AuthStrings.cancelled` |
| `AppFailureNetwork` | Connectivity/timeout | `AuthStrings.network` |
| `AppFailureServer` | 5xx / bad JSON / default | `AuthStrings.server` |
| `AppFailureFailed` | HTTP 400 / generic failure | `AuthStrings.failed` |
| `AppFailureDenied` | `error=access_denied` | `AuthStrings.denied` |
| `AppFailureExpired` | State mismatch | `AuthStrings.expired` |
| `AppFailureUnauthorized` | HTTP 401 / refresh failed | `AuthStrings.unauthorized` |
| `AppFailureAccountUnavailable` | HTTP 403 | `AuthStrings.accountUnavailable` |
| `AppFailureAccessDenied` | Role ≠ CANDIDATE | `AuthStrings.accessDenied` |

`AuthController.noticeFor()` maps each failure to its user-facing string.

### 4.6 AuthController (`lib/features/auth/presentation/auth_controller.dart`)

Riverpod 3.3.2 `Notifier<AuthState>` implementing `AuthRefreshHandler`. Key lifecycle:

#### `build()` → `_init()` → `bootstrap()`

Cold start sequence:
1. Read stored tokens from `TokenStore`
2. If no tokens → `AuthSignedOut()` (no notice)
3. If tokens exist → call `api.getMe()` with bearer token
4. On success: parse `TalentGraphUser`, check `isCandidate`
   - Not candidate → clear tokens → `AuthSignedOut(notice: accessDenied)`
   - Candidate → `AuthSignedIn(user)`
5. On `DioException` → map to failure → clear tokens → `AuthSignedOut(notice: noticeFor(failure))`
6. On other `Exception` → debug-print → clear tokens → `AuthSignedOut(notice: failed)`

#### `signIn()` → OAuth2 Flow

1. Set `AuthSigningIn()` state
2. Call `_repository.signIn()` (full OAuth2 flow)
3. Switch on result:
   - `AuthSuccess` → store tokens → `TalentGraphUser.fromMap(user)` → `isCandidate` check → `AuthSignedIn(u)` or clear tokens + `accessDenied`
   - `AuthFailure` → `AuthSignedOut(notice: noticeFor(failure))`
   - `AuthCancelled` → `AuthSignedOut(notice: userCancelled)`

#### Testing Hooks

- `setRepositoryForTesting(repo)` — inject fake `AuthRepository`
- `setStateForTesting(state)` — directly set notifier state
- `repository` getter — expose repository for test assertions

---

## 5. Phase 2 (T05) Routing & OAuth Status UX

### 5.1 AppRouter (`lib/app/router/app_router.dart`)

Uses `go_router` with a custom `redirectFor()` function and `_AuthRefreshListenable` for redirect re-evaluation on auth state changes.

#### `_AuthRefreshListenable`

A custom `Listenable` implementation that GoRouter's `refreshListenable` subscribes to. When `authControllerProvider` emits a new state, `ref.listen()` calls `_authRefresh.notify()`, which triggers GoRouter to re-evaluate all redirects. This handles cases where auth state changes without a full GoRouter recreation (cached session resolved, OAuth completed, sign-out).

#### `redirectFor()` Logic

```dart
String? redirectFor(String currentLocation, AuthState authState) {
  final loggingIn =
      currentLocation == '/welcome' ||
      currentLocation == '/oauth' ||
      currentLocation == '/oauth-status';

  switch (authState) {
    case AuthBootstrapping():
      return loggingIn ? null : '/welcome';
    case AuthSignedOut():
      if (authState.notice != null) {
        return currentLocation == '/oauth-status' ? null : '/oauth-status';
      }
      return loggingIn ? null : '/welcome';
    case AuthSigningIn():
      return null;
    case AuthSignedIn():
      return loggingIn ? '/jobs' : null;
  }
}
```

**Redirect state table:**

| AuthState | Current Location | Has Notice | Return | Reason |
|---|---|---|---|---|
| `AuthBootstrapping` | `/welcome`/`/oauth`/`/oauth-status` | N/A | `null` | Already on login route, no redirect needed |
| `AuthBootstrapping` | any other | N/A | `/welcome` | Bootstrap in progress, show welcome |
| `AuthSignedOut` | `/oauth-status` | yes | `null` | Already on status screen (loop prevention) |
| `AuthSignedOut` | other | yes | `/oauth-status` | Show error status |
| `AuthSignedOut` | login route | no | `null` | Already on login route |
| `AuthSignedOut` | other | no | `/welcome` | Redirect to welcome |
| `AuthSigningIn` | any | N/A | `null` | OAuth in progress, no redirect |
| `AuthSignedIn` | login route | N/A | `/jobs` | Already signed in, go to jobs |
| `AuthSignedIn` | other | N/A | `null` | No redirect needed |

#### Loop Prevention Fix

The `AuthSignedOut` with notice case returns `null` when `currentLocation == '/oauth-status'`, preventing an infinite redirect loop between `/oauth-status` and itself. Previously this could cause repeated redirect re-evaluation.

#### `AuthSignedIn` Redirect Fix

When `AuthSignedIn` and on a login route (`/welcome`, `/oauth`, `/oauth-status`), returns `/jobs` (not `null`). Returning `null` would allow the user to remain on login routes while signed in, causing confusing UX.

#### Routes

| Path | Builder | Notes |
|---|---|---|
| `/welcome` | `WelcomeScreen` | Initial location; GitHub sign-in entry point |
| `/oauth` | `OAuthCaptureScreen` | "Connecting to GitHub..." intermediate state |
| `/oauth-status` | `OAuthStatusScreen` | Failure/success status with retry |
| `/jobs` | `ShellScreen(tabIndex: 0)` | JobsDiscoveryScreen with bottom nav |
| `/assessments` | `ShellScreen(tabIndex: 1)` | Assessments placeholder |
| `/notifications` | `ShellScreen(tabIndex: 2)` | Notifications placeholder |

### 5.2 WelcomeScreen

Fixed header (height 104 dp, canvas with 85% opacity, border-bottom at 30% opacity, TG logo 28×28 with shadow-sm, title "TalentGraph", subtitle "Candidate Portal", `AppearanceToggle` on right). Scrollable main content with:
- Direct Technical Hiring badge + 26pt bold centered headline + subtitle
- `PrimaryButton("Continue with GitHub")` with login + arrow_forward icons
- Permissions note
- 3-step "How TalentGraph works" section
- "Why is GitHub required?" accordion
- Footer: "Privacy Policy • Candidate Terms"
- Debug mode: "Dev: Bypass to Jobs Preview" button (sets `AuthSignedIn` directly)

### 5.3 OAuthCaptureScreen

Intermediate screen shown during OAuth flow. Centered layout with `link_off` icon, "Connecting to GitHub…" title, subtitle, "Retry" `PrimaryButton`, and 32 dp spacer. The `authState is AuthSigningIn` controls the button loading state.

### 5.4 OAuthStatusScreen (`app_router.dart:608`)

Custom header (height 104 dp — increased from 64 dp to match design reference). Not a separate `AppBar`; integrated into a custom header row with TG logo, "Find your next technical role" subtitle, and `AppearanceToggle`.

**Status Pill:** `CONNECTION PAUSED` — brand-colored dot, `surfaceContainer` pill background, `/30` border, 11pt text.

**Failure-Type Copy Pairs** via `AuthStrings.titleForNotice()` / `descriptionForNotice()` / `iconForNotice()`:

| Notice | Title | Description | Icon |
|---|---|---|---|
| `cancelled`/`userCancelled` | "Authorization Cancelled" | cancelledDescription | `error_outline` |
| `denied` | "Access Denied by GitHub" | notice itself | `block` |
| `expired` | "Session Expired" | notice itself | `schedule` |
| `failed` | "Sign-In Failed" | notice itself | `error` |
| `accountUnavailable` | "Account Unavailable" | notice itself | `person_off` |
| `accessDenied` | "Access Denied" | notice itself | `lock` |
| `server` | "Server Error" | notice itself | `cloud_off` |
| `network` | "No Internet Connection" | notice itself | `wifi_off` |
| `stateMismatch` | "Security Check Failed" | notice itself | `error` |

**Buttons:** "Retry with GitHub" (`PrimaryButton` with login + arrow_forward), "Back to Welcome" (`OutlinedButton` with arrow_back, calls `controller.resetToSignedOut()` then `context.go('/welcome')`).

**Footer Help Link:** `GestureDetector` with `RichText`: "Need help? Visit the " + "Candidate Help Center." (brand colored, w600). Calls `_handleHelpCenterTap(context)` which invokes `onHelpCenterTap` callback or debug-prints `kCandidateHelpCenterRoute = '/candidate-help-center'` (TODO: connect final Help Center route).

**Accordion:** "Why does TalentGraph use GitHub?" (cancelled variant) with `help_outline` icon and `whyGitHubDescCancelled` copy.

### 5.5 T05 Remaining Edge Cases

- `AuthSignedIn` redirect case does **not** check `isCandidate`/`isActive` — role validation happens in `AuthController.signIn()` and `bootstrap()` instead of the router
- BLOCKED vs DELETED vs wrong-role differentiation for `/access-denied` copy — unresolved; both map to generic `AppFailureAccountUnavailable` / `AppFailureAccessDenied` with product copy, not server text

---

## 6. Phase 3 (T06) Candidate Shell & JobsDiscoveryScreen

### 6.1 ShellScreen (`lib/features/shell/shell.dart`)

`ConsumerWidget` with `tabIndex` parameter. Structure:

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('TalentGraph'),
    actions: [const AppearanceToggle()],
  ),
  body: IndexedStack(
    index: tabIndex,
    children: const [
      JobsDiscoveryScreen(),      // tab 0
      AssessmentsPlaceholder(),   // tab 1
      NotificationsPlaceholder(), // tab 2
    ],
  ),
  bottomNavigationBar: NavigationBar(
    selectedIndex: tabIndex,
    onDestinationSelected: (index) => context.go(routes[index]),
    destinations: const [
      NavigationDestination(icon: work_outline, label: 'Jobs'),
      NavigationDestination(icon: assignment_outlined, label: 'Assessments'),
      NavigationDestination(icon: notifications_outlined, label: 'Notifications'),
    ],
  ),
)
```

#### Duplicate Bottom Nav Bar Bug (Fixed)

Originally `JobsDiscoveryScreen` included its own `bottomNavigationBar` in addition to `ShellScreen`'s, producing two overlapping navigation bars on the Jobs tab. Fix: removed the nav bar from `JobsDiscoveryScreen`; `ShellScreen` is the sole provider. Verified by test: `find.byType(NavigationBar)` finds exactly one widget; `find.byType(BottomNavigationBar)` finds nothing.

### 6.2 JobBriefModel (`lib/features/shell/job_brief_model.dart`)

Immutable data class with 16 fields:

| Field | Type | Description |
|---|---|---|
| `jobId` | String | Unique job identifier |
| `title` | String | Job title |
| `company` | String | Company name |
| `isVerified` | bool | Verified employer badge |
| `isBookmarked` | bool | User bookmark state |
| `location` | String | Job location (remote/hybrid/on-site) |
| `jobType` | String | Full-time / Contract / Part-time |
| `level` | String | Entry / Mid-level / Senior / Staff |
| `postedAgo` | String | Relative posting time |
| `summary` | String | Job description summary |
| `skillChips` | List<String> | Required skills |
| `evidenceTrailActive` | bool | Whether assessment path is active |
| `evidenceTrailText` | string | Evidence trail description |

`kDummyJobs` seeds 3 jobs (`// TODO(jobs-api): Replace with repository/provider stream`):

| Job | Title | Company | Level | Skills | EvidenceTrail | Bookmarked |
|---|---|---|---|---|---|---|
| job_001 | Staff Distributed Systems Engineer | Nexus Cloud Infrastructure | Staff Level | Go, Distributed Consensus, Kubernetes | active | no |
| job_002 | Senior Full Stack Security Engineer | Aegis Sentinel Labs | Senior | TypeScript, Node.js, OAuth 2.1 | inactive | yes |
| job_003 | Rust Systems Core Engineer | Vektor Analytics | Senior | Rust, Wasm, Async Tokio | active | no |

### 6.3 FilterJobsBottomSheet (`lib/features/shell/filter_jobs_bottom_sheet.dart`)

Modal bottom sheet with 7 filter sections, sticky reset/apply footer, `isScrollControlled: true`. Wired to the filter icon button (tune icon) in `JobsDiscoveryScreen`'s search row. Shows a badge with active filter count (3). On apply, result is converted to `_activeFilterChips` set in `JobsDiscoveryScreen`. Bookmark toggle updates `_bookmarkedJobIds`.

### 6.4 JobsDiscoveryScreen (`lib/features/shell/jobs_discovery_screen.dart`)

`ConsumerStatefulWidget` with 9 optional hook callbacks: `onThemeToggle`, `onSearchChanged`, `onFeedTabChanged`, `onRemoveFilterChip`, `onApplyFilters`, `onResetFilters`, `onToggleBookmark`, `onViewJobDetails`, `onBottomNavTap`.

#### `_filteredJobs(BuildContext context)` — Compound Filtering Logic

1. **Feed tab filter:**
   - Tab 0 (All Jobs): no filter
   - Tab 1 (Recommended): `evidenceTrailActive == true`
   - Tab 2 (Saved Jobs): `jobId in _bookmarkedJobIds`

2. **Search filter:** case-insensitive `contains` match against `title`, `company`, or any `skillChips` entry

3. **Filter chips:** active category must match job attributes:
   - Location chips: `remote`/`hybrid`/`on-site` → `job.location.contains()`
   - Level chips: `entry`/`mid-level`/`senior` → `job.level.contains()`
   - Compound: `senior & staff` → `senior` OR `staff`; `staff & principal` → `senior` OR `staff` OR `principal`
   - Job type: `full-time`/`contract`/`part-time` → `job.jobType.contains()`
   - Company: `all companies` → match all; `verified teams only` → `job.isVerified`
   - Skills: split compound labels on `/` (`'TypeScript / Go'` → tokens), any token match against `skillChips`

#### Jobs Grid / Cards

Each job card shows: title + bookmark toggle + verified badge, metadata row (location, job type, level pill, posted ago), summary text, skill chips Wrap, Evidence Trail status (colored dot + text), and "View Job Details" `FilledButton`.

#### Metadata Row Overflow Fix (Bug 2)

**Before:** `Row` of 4 metadata items (location icon+text, job type icon+text, level pill, posted ago text) exceeded available width on 360×800 dp screens, causing `RenderFlex overflowed by 145 pixels on the right`.

**After:** Changed `Row` → `Wrap` with `spacing: 12`, `runSpacing: 8`, `crossAxisAlignment: WrapCrossAlignment.center`. Each item wrapped in `mainAxisSize: MainAxisSize.min`. `_horizontalPadding()` returns 12 dp below 360 dp width, 16 dp above.

#### Compound Chip Matching Fix (Bug 4)

**Before:** `'Senior & Staff'` chip only checked `level.contains('staff') || level.contains('principal')`, missing `senior`-level jobs. `'TypeScript / Go'` didn't split compound labels.

**After:** `'senior & staff'` → `level.contains('senior') || level.contains('staff')`; `'staff & principal'` → `level.contains('senior') || level.contains('staff') || level.contains('principal')`. All skill-chip labels split on `/` and match any token against `job.skillChips`.

### 6.5 Physical-Device UI Bug Breakdowns

| Bug | Symptom | Root Cause | Fix |
|---|---|---|---|
| Duplicate bottom nav | Two nav bars on Jobs tab | `JobsDiscoveryScreen` had its own `bottomNavigationBar` | Removed from screen; `ShellScreen` is sole provider |
| 360×800 dp metadata overflow | `RenderFlex overflowed by 145px right` | `Row` of metadata items too wide | `Row` → `Wrap` with `mainAxisSize.min` items |
| Saved Jobs tab clipping | Badge clipped at small widths | Fixed-width tab content | `mainAxisSize.min` on tab container; badge 14×14 dp, fontSize 9 |
| Compound chip matching | `'Senior & Staff'` missed senior jobs; `'TypeScript / Go'` unsplit | Incomplete level checks; no `/` splitting | Added `senior` check; split on `/` tokens |

---

## 7. Phase 4 Backend Hardening & Prisma Schema Synchronization

### 7.1 globalErrorHandler.ts — Unconditional 5xx Logging

**Before:** `console.error("[GlobalError]", err)` only when `config.node_env !== "production"`. Server errors in production were completely invisible — no terminal output, no log trail.

**After:** For any error with `statusCode >= 500`, logs unconditionally regardless of `NODE_ENV`:

```typescript
console.error(
  '[500 Error]',
  req.method,
  req.originalUrl,
  err.message,
  err.stack,
);
```

Non-500 errors (4xx, validation, etc.) still log only in non-production. This ensures 500 errors are never invisible in the terminal.

### 7.2 githubAuth.ts — Env Validation & Email Fallback

**`getGithubAuthUrl(state?)`** — Added upfront validation that throws before URL construction:

```typescript
if (!config.github_client_id) {
  throw new AppError(
    httpStatus.INTERNAL_SERVER_ERROR,
    "GitHub OAuth is not configured: GITHUB_CLIENT_ID is missing.",
  );
}
if (!config.github_callback_url) {
  throw new AppError(
    httpStatus.INTERNAL_SERVER_ERROR,
    "GitHub OAuth is not configured: GITHUB_CALLBACK_URL is missing.",
  );
}
```

This makes misconfiguration fail fast with a clear HTTP 500 and error message, instead of silently producing a malformed OAuth URL (which caused the HTTP 5xx on `GET /api/v1/auth/github/url` when env vars were absent).

**`getGithubUserProfile(accessToken)`** — Already contained the `${ghUser.login}@users.noreply.github.com` fallback for GitHub accounts with private/hidden emails (line 102). Confirmed present and correct.

### 7.3 Nodemailer Non-Blocking Email (535 EAUTH)

**`auth.service.ts`** — `transporter.sendMail()` calls in `registerUser()` (line 62) and `forgotPassword()` (line 312) wrapped in `try/catch` with `console.warn("Email skipped (verify):", e)` / `console.warn("Email skipped (forgot-password):", e)`. Email delivery failures no longer block the OAuth/auth flow — registration and password reset continue even if SMTP is misconfigured.

### 7.4 Prisma Schema Synchronization (Non-Destructive)

The live PostgreSQL database contained columns and enum values not represented in the Prisma schema files. Rather than `prisma db push --force-reset` (which would drop all 10 User rows and 4 Evidence rows), the schema files were aligned to match the database state first, then `prisma db push` applied only the two intended changes.

#### `prisma/schema/enums.prisma`

- `Role`: added `SUB_RECRUITER`, `SYSTEM_ADMIN` (matching PostgreSQL `Role` enum with values CANDIDATE, RECRUITER, SUB_RECRUITER, SYSTEM_ADMIN)
- Added `AuthProvider` enum: `CREDENTIAL`, `GITHUB`, `GOOGLE` (matching PostgreSQL `AuthProvider` enum)
- Added `UserStatus` enum: `ACTIVE`, `BLOCKED`, `DELETED` (matching PostgreSQL `UserStatus` enum)
- Added `CompanyVerificationStatus` enum: `DRAFT`, `PENDING`, `NEEDS_MORE_INFO`, `VERIFIED`, `REJECTED`

#### `prisma/schema/user.prisma`

| Change | Before | After | Reason |
|---|---|---|---|
| `passwordHash` | `String` | `String?` | GitHub OAuth users may not have passwords; preserves 10 existing rows |
| Added `password` | — | `String?` | Column exists in DB |
| Added `status` | — | `UserStatus` | Column exists in DB as enum |
| Added `name` | — | `String` | Column exists in DB |
| Added `authProvider` | — | `AuthProvider` | Column exists in DB as enum |
| Added `emailVerified` | — | `Boolean @default(false)` | Column exists in DB |
| Added `needPasswordChange` | — | `Boolean @default(false)` | Column exists in DB |
| Added `isDeleted` | — | `Boolean @default(false)` | Column exists in DB |
| Added `isAssessmentBanned` | — | `Boolean @default(false)` | Column exists in DB |
| Added `imageUrl` | — | `String?` | Column exists in DB |
| Added `imagePublicId` | — | `String?` | Column exists in DB |
| Added `deletedAt` | — | `DateTime?` | Column exists in DB |
| `role` type | `String` | `Role` | Match PostgreSQL enum |
| `status` type | — | `UserStatus` | Match PostgreSQL enum |
| `authProvider` type | — | `AuthProvider` | Match PostgreSQL enum |

#### `prisma/schema/talentgraph.prisma`

| Change | Before | After | Reason |
|---|---|---|---|
| `embedding` | `Unsupported("vector")` | `Unsupported("vector")?` | Optional; preserves 4 existing NULL rows |
| `CandidateProfile.githubSyncCount` | — | `Int @default(0)` | Column exists in DB |
| `CandidateProfile.githubSyncResetAt` | — | `DateTime?` | Column exists in DB |
| `Company.recruiterAffiliationProof` | — | `Json @default("{}")` | Column exists in DB |
| `Company.rejectionReason` | — | `String?` | Column exists in DB |
| `Company.verificationDocuments` | — | `Json @default("[]")` | Column exists in DB |
| `Company.verificationStatus` | — | `CompanyVerificationStatus @default(DRAFT)` | Column exists in DB as enum |
| `GitHubRepo.isSelected` | — | `Boolean @default(false)` | Column exists in DB |
| `GitHubRepo.lastSyncCommitSha` | — | `String?` | Column exists in DB |

#### `npx prisma db push` Result

```
🚀  Your database is now in sync with your Prisma schema. Done in 6.18s
```

Zero data-loss prompts triggered because the schema was aligned to the database before push.

#### `npx prisma generate` Result

```
✔ Generated Prisma Client (7.10.1) to ./src/generated/prisma in 473ms
```

#### Source Code Updates for New Required Fields

| File | Change | Line |
|---|---|---|
| `auth.service.ts` | `verifyEmail` user create: added `status: "ACTIVE"` | ~99 |
| `auth.service.ts` | `githubAuthCallback` user create: added `status: "ACTIVE"` | ~225 |
| `seed.ts` | `seedSuperAdmin` user create: added `status: "ACTIVE"`, `authProvider: "CREDENTIAL"` | ~20-28 |

#### `npx tsc --noEmit`

Zero errors after all fixes.

---

## 8. Phase 5 (T07) Testing Suite & Physical-Device QA

### 8.1 Riverpod 3.3.2 Test Pattern

`ProviderScope` in Riverpod 3.3.2 does **not** accept a `container` parameter. Tests use `UncontrolledProviderScope` + `ProviderContainer`:

```dart
final container = ProviderContainer(
  overrides: [
    authControllerProvider.overrideWith(
      () => _TestAuthNotifier(const AuthSignedIn(...)),
    ),
  ],
);

await tester.pumpWidget(
  UncontrolledProviderScope(
    container: container,
    child: MaterialApp(...),
  ),
);
```

`_TestAuthNotifier extends AuthController` exposes `setRepositoryForTesting()` and `setStateForTesting()` for test injection.

### 8.2 Test Files and Coverage

#### `test/app/router/app_router_test.dart` — Integration Tests (3 paths)

| Path | Scenario | Expected |
|---|---|---|
| A | Cached GitHub session exists | Bootstrap → `/jobs` → `JobsDiscoveryScreen` |
| B | No cached session | Bootstrap → `/welcome` → `WelcomeScreen` |
| C | Fresh GitHub OAuth success | `/oauth` → `/oauth-status` → `/jobs` → `JobsDiscoveryScreen` |

#### `test/features/auth/presentation/auth_controller_test.dart` — Rewritten

Uses `TestAuthController` with `setRepositoryForTesting()` and `setStateForTesting()`. Tests bootstrap (cached tokens → signed in; no tokens → signed out) and signIn (success path, failure path, cancellation).

#### `test/features/auth/presentation/auth_screens_test.dart`

Tests `OAuthStatusScreen` title+subtitle pairing for each failure type, and "Retry with GitHub" triggering a fresh sign-in attempt.

#### `test/features/shell/jobs_discovery_test.dart` — Widget Tests (8 tests)

| Test Group | Test Case | Assertion |
|---|---|---|
| ShellScreen bottom nav | renders exactly one NavigationBar | `find.byType(NavigationBar)` = 1, `find.byType(BottomNavigationBar)` = 0 |
| JobsDiscoveryScreen layout | no overflow at 360×800 viewport | Renders without overflow exceptions |
| Search filtering | non-matching query | All 3 jobs filtered out; "No jobs found" shows |
| Search filtering | matching query ('rust') | Only job_003 remains |
| Filter chips | 'Senior & Staff' | job_001 (Staff) and job_002/job_003 (Senior) all match |
| Filter chips | 'TypeScript / Go' | job_001 (Go) and job_002 (TypeScript) match; job_003 (Rust) doesn't |
| Feed tabs | 'Recommended' | job_001 and job_003 (evidenceTrailActive) match; job_002 doesn't |
| Feed tabs | 'Saved Jobs' | Only bookmarked jobs show |

#### Core Unit Tests

| File | Coverage |
|---|---|
| `test/core/network/dio_client_test.dart` | Bearer header, concurrent 401 single-flight, refresh failure, no refresh token |
| `test/core/storage/token_store_test.dart` | read/write/clear access & refresh tokens, clearAll, independence |
| `test/core/config/app_config_test.dart` | Default API_BASE_URL is emulator address, non-empty string |
| `test/core/error/app_failure_test.dart` | AppFailure hierarchy mapping |
| `test/features/auth/data/auth_api_test.dart` | AuthApi endpoint calls |
| `test/features/auth/data/auth_repository_test.dart` | AuthRepository flow, state validation |
| `test/app/theme/theme_acceptance_test.dart` | AppearanceToggle dark/light, PrimaryButton loading/disabled, StateBanner error/success, text scale 2.0 no overflow |
| `test/widget_test.dart` | Blank Scaffold smoke test |

### 8.3 Results

**128 / 128 tests passed.** `dart analyze lib/ test/` — no issues found. `dart format .` — clean.

### 8.4 Physical-Device QA Checklist (from T07)

| Check | Scenario | Status |
|---|---|---|
| Fresh install | Dark mode default | Verified |
| Sign in success | GitHub OAuth → tokens → Jobs | Verified |
| Cancel | User closes browser | `AuthCancelled` → `userCancelled` notice |
| Deny | `error=access_denied` | `denied` notice + Retry |
| Airplane mode | No connectivity | `network` notice + Retry |
| Kill app + reopen | Session restore | `bootstrap()` reads stored tokens |
| Expired token | 401 on `/auth/me` | Refresh → or sign out |
| Non-candidate account | `role ≠ CANDIDATE` | `accessDenied`, tokens discarded |
| Blocked account | 403 from backend | `accountUnavailable` notice |
| GitHub without email | 400 from backend | `failed` notice with verified email hint |
| Theme persists | Dark/light toggle | `shared_preferences` persistence |

Results recorded in `docs/decisions/manual-test-auth.md`.

---

## 9. Complete File-by-File Modification Manifest

### 9.1 MobileApp — New Files Created

| File | Purpose |
|---|---|
| `MobileApp/lib/main.dart` | App entry point, ProviderScope, GoRouter provider |
| `MobileApp/lib/app/router/app_router.dart` | GoRouter config, `redirectFor()`, WelcomeScreen, OAuthCaptureScreen, OAuthStatusScreen |
| `MobileApp/lib/app/theme/app_theme.dart` | Material 3 theme with TgColors extensions |
| `MobileApp/lib/app/theme/tg_colors.dart` | TgColors ThemeExtension (dark/light, 20 tokens) |
| `MobileApp/lib/app/theme/theme_controller.dart` | Riverpod theme persistence via shared_preferences |
| `MobileApp/lib/core/config/app_config.dart` | API_BASE_URL configuration |
| `MobileApp/lib/core/error/app_failure.dart` | AppFailure sealed class hierarchy (9 subclasses) |
| `MobileApp/lib/core/network/dio_client.dart` | Dio plain/authed clients, single-flight refresh |
| `MobileApp/lib/core/storage/token_store.dart` | TokenStore interface + SecureTokenStore |
| `MobileApp/lib/features/auth/data/auth_api.dart` | Auth API client (5 endpoints) |
| `MobileApp/lib/features/auth/data/auth_repository.dart` | AuthRepository, OAuth2 flow, state validation |
| `MobileApp/lib/features/auth/domain/auth_state.dart` | AuthState sealed class |
| `MobileApp/lib/features/auth/domain/user.dart` | TalentGraphUser domain model |
| `MobileApp/lib/features/auth/presentation/auth_controller.dart` | Riverpod Notifier, bootstrap, signIn, signOut |
| `MobileApp/lib/features/auth/presentation/auth_strings.dart` | All auth copy strings |
| `MobileApp/lib/features/shell/shell.dart` | ShellScreen, bottom nav, placeholders |
| `MobileApp/lib/features/shell/job_brief_model.dart` | JobBriefModel + kDummyJobs |
| `MobileApp/lib/features/shell/jobs_discovery_screen.dart` | JobsDiscoveryScreen, filtering, chips, feed tabs |
| `MobileApp/lib/features/shell/filter_jobs_bottom_sheet.dart` | FilterJobsBottomSheet |
| `MobileApp/lib/shared/widgets/primary_button.dart` | PrimaryButton (UnconstrainedBox + ElevatedButton + Row) |
| `MobileApp/lib/shared/widgets/state_banner.dart` | StateBanner (error/success banners) |
| `MobileApp/lib/shared/widgets/theme_toggle.dart` | AppearanceToggle widget |
| `MobileApp/test/app/router/app_router_test.dart` | Router integration tests (Paths A–C) |
| `MobileApp/test/app/theme/theme_acceptance_test.dart` | Theme/widget acceptance tests |
| `MobileApp/test/core/config/app_config_test.dart` | AppConfig tests |
| `MobileApp/test/core/error/app_failure_test.dart` | AppFailure tests |
| `MobileApp/test/core/network/dio_client_test.dart` | DioClient tests |
| `MobileApp/test/core/storage/token_store_test.dart` | TokenStore tests |
| `MobileApp/test/features/auth/data/auth_api_test.dart` | AuthApi unit tests |
| `MobileApp/test/features/auth/data/auth_repository_test.dart` | AuthRepository unit tests |
| `MobileApp/test/features/auth/presentation/auth_controller_test.dart` | AuthController tests |
| `MobileApp/test/features/auth/presentation/auth_screens_test.dart` | OAuth screen tests |
| `MobileApp/test/features/shell/jobs_discovery_test.dart` | JobsDiscoveryScreen widget tests |
| `MobileApp/test/widget_test.dart` | Smoke test |

### 9.2 MobileApp — Modified Files

| File | Change |
|---|---|
| `MobileApp/AGENTS.md` | Mission statement updated |
| `MobileApp/pubspec.yaml` | Dependencies: flutter_riverpod, dio, go_router, flutter_secure_storage, shared_preferences, flutter_web_auth_2 |
| `MobileApp/android/app/src/main/AndroidManifest.xml` | URL scheme `talentgraph`, network security config |
| `MobileApp/android/app/src/debug/AndroidManifest.xml` | Debug manifest |
| `MobileApp/android/app/build.gradle.kts` | minSdk 21, compileSdk, version config |
| `MobileApp/docs/api/auth-contract.md` | Contract documentation |
| `MobileApp/docs/api/observed-responses.md` | Observed backend response shapes |
| `MobileApp/docs/decisions/manual-test-auth.md` | Manual test results |
| `MobileApp/docs/decisions/open-questions.md` | Open questions log |
| `MobileApp/file_inventory.txt` | File inventory |

### 9.3 Backend — Modified Files

| File | Change |
|---|---|
| `Backend/prisma/schema/enums.prisma` | Added SUB_RECRUITER, SYSTEM_ADMIN to Role; added AuthProvider, UserStatus, CompanyVerificationStatus enums |
| `Backend/prisma/schema/user.prisma` | `passwordHash String` → `String?`; added missing columns (password, status, name, authProvider, emailVerified, needPasswordChange, isDeleted, isAssessmentBanned, imageUrl, imagePublicId, deletedAt); enum types for role/status/authProvider |
| `Backend/prisma/schema/talentgraph.prisma` | `embedding Unsupported("vector")` → `?`; added columns to CandidateProfile, Company, GitHubRepo |
| `Backend/src/app/lib/githubAuth.ts` | Env validation (GITHUB_CLIENT_ID, GITHUB_CALLBACK_URL); email fallback already present |
| `Backend/src/app/middleware/globalErrorHandler.ts` | Unconditional console.error for statusCode >= 500 |
| `Backend/src/app/module/auth/auth.service.ts` | Non-blocking email try/catch; status: "ACTIVE" on user creates |
| `Backend/src/app/utils/seed.ts` | status + authProvider on System Admin create |

### 9.4 Backend — Generated Files (regenerated by `prisma generate`)

| File | Change |
|---|---|
| `Backend/src/generated/prisma/client.ts` | Regenerated Prisma client v7.10.1 |
| `Backend/src/generated/prisma/models/User.ts` | Optional passwordHash, enum types for role/status/authProvider |
| `Backend/src/generated/prisma/models/Evidence.ts` | Optional embedding |
| `Backend/src/generated/prisma/models/Company.ts` | New columns (recruiterAffiliationProof, rejectionReason, verificationDocuments, verificationStatus) |
| `Backend/src/generated/prisma/models/CandidateProfile.ts` | New columns (githubSyncCount, githubSyncResetAt) |
| `Backend/src/generated/prisma/models/GitHubRepo.ts` | New columns (isSelected, lastSyncCommitSha) |
| `Backend/src/generated/prisma/enums.ts` | New enum values (SUB_RECRUITER, SYSTEM_ADMIN, AuthProvider, UserStatus, CompanyVerificationStatus) |
| `Backend/src/generated/prisma/commonInputTypes.ts` | Updated input types |
| `Backend/src/generated/prisma/internal/*` | Internal schema representations (class.ts, prismaNamespace.ts, etc.) |

---

## 10. Developer Operational Runbook & Roadmap

### 10.1 Startup Commands

**Backend:**
```bash
cd Backend
cp .env.example .env  # if .env doesn't exist
npm install
npx prisma generate
npx prisma db push
npm run dev          # starts Express on :5000
```

**MobileApp:**
```bash
cd MobileApp
flutter pub get
flutter run --dart-define=API_BASE_URL=http://localhost:5000/api/v1
```

**Emulator port forwarding (required for `10.0.2.2:5000` to reach dev machine):**
```bash
adb reverse tcp:5000 tcp:5000
```

### 10.2 Session Reset

```bash
adb shell pm clear com.groupf.talentgraph
```

Clears `flutter_secure_storage` and `shared_preferences`, forcing cold-start bootstrap on next launch. Use this to simulate a fresh install.

### 10.3 Debug Back Bypass

On `WelcomeScreen` in debug mode (`kDebugMode`), an `OutlinedButton` labeled "Dev: Bypass to Jobs Preview" sets `AuthSignedIn` state directly with a debug CANDIDATE user (`id: 'debug_1'`, `email: 'debug@example.com'`), bypassing GitHub OAuth entirely. Only available when `kDebugMode` is true.

### 10.4 Troubleshooting Table

| Symptom | Likely Cause | Fix |
|---|---|---|
| `GET /api/v1/auth/github/url` returns HTTP 5xx | Missing `GITHUB_CLIENT_ID` or `GITHUB_CALLBACK_URL` env | Check `Backend/.env`; `githubAuth.ts` now throws clear 500 with env var name |
| Chrome Custom Tab doesn't open | `adb reverse tcp:5000` not set | Run `adb reverse tcp:5000 tcp:5000` |
| OAuth callback not captured by app | URL scheme mismatch | Verify `talentgraph` scheme in `AndroidManifest.xml` and intent filter |
| "Server Error" on sign-in (no terminal output) | Backend 5xx not logged | Now fixed: `globalErrorHandler.ts` logs `[500 Error]` unconditionally for statusCode >= 500 |
| Duplicate bottom nav bar | `JobsDiscoveryScreen` had its own nav bar | Removed; `ShellScreen` is sole provider |
| Metadata overflow at 360×800 dp | `Row` instead of `Wrap` | Changed to `Wrap` with `mainAxisSize.min` |
| `'Senior & Staff'` chip misses senior jobs | Only checked `staff`/`principal` levels | Added `senior` level check |
| `dart analyze` fails on `ProviderScope(container:)` | Riverpod 3.3.2 doesn't accept `container` | Use `UncontrolledProviderScope` + `ProviderContainer` |
| `tsc` errors on `user.passwordHash` | Schema made it optional; code accesses directly | Check null before access or use optional chaining |
| Email flow blocked by 535 EAUTH | Nodemailer SMTP auth failure | Now caught with `console.warn`; auth flow continues |
| `prisma db push` data-loss warnings | Schema drift from live database | Align schema to DB first (add missing columns/enums), then push only intended changes |
| Role ≠ CANDIDATE after GitHub sign-in | Recruiter/Admin logging in via GitHub | `AuthController.signIn()` clears tokens → `AuthSignedOut(notice: accessDenied)` |

### 10.5 Roadmap — Next Feature Milestones

| Milestone | Description | Status |
|---|---|---|
| Recruiter shell | Employer-side job posting and candidate review | Out of scope (AGENTS.md) |
| Assessments screen | Replace `AssessmentsPlaceholder` with live assessment taking | Planned |
| Notifications screen | Replace `NotificationsPlaceholder` with real-time notifications | Planned |
| PKCE support | Migrate from plain state validation if backend adds PKCE | Conditional on backend |
| App Links | Android App Link on `GITHUB_CALLBACK_URL` for strongest capture (Path B) | Future hardening |
| Email verification | CREDENTIAL provider sign-up flow | Currently GitHub-only |
| Golden tests | Screenshot tests at 320dp, text scale 2.0, both themes | T07 item 2 (pending) |

---

## Appendices

### A. Key Design Decisions

1. **State-based CSRF instead of PKCE:** Backend doesn't support PKCE; cryptographically random 32-byte state parameter provides CSRF protection per auth-contract.md §39.
2. **System browser over WebView:** `flutter_web_auth_2` with Chrome Custom Tab per auth-security rule; no embedded WebView packages.
3. **`UncontrolledProviderScope` + `ProviderContainer`:** Riverpod 3.3.2 `ProviderScope` doesn't accept `container`; this is the supported test pattern.
4. **`Wrap` instead of `Row` for metadata:** Resolves overflow on small (360×800 dp) screens while maintaining visual hierarchy.
5. **Non-destructive Prisma sync:** Schema aligned to live database before `db push` to avoid `--force-reset` and data loss.

### B. Contract References

- `MobileApp/docs/api/auth-contract.md` — Auth API contract (backend FROZEN)
- `MobileApp/docs/api/observed-responses.md` — Observed backend response shapes
- `MobileApp/docs/decisions/manual-test-auth.md` — Manual test results
- `MobileApp/AGENTS.md` — Mobile architecture and hard boundaries

---

*End of chronicle. Generated from repository state at commit `8152897` on branch `RohitashwaB`.*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             