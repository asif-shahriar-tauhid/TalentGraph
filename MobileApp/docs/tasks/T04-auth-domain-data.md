# T04 — Auth domain + data + session controller
Read: `docs/api/auth-contract.md` (all), `docs/spec/auth-scope.md` (Flow, State model).
Do:
1. `domain/`: `AuthUser(id,name,email,role,status,imageUrl?)`, `AuthRepository` (`signInWithGitHub`, `restoreSession`, `signOut`). No verification methods.
2. `data/`: `AuthApi` (Dio); `OAuthCapture` interface returning `(code,state)` or a failure; implementation = strategy chosen in contract §5 (A: single WebView screen with `NavigationDelegate` that CANCELS navigation to the callback URL and reads query; B/C only if T00 chose them). Generate random `state`, verify on return. `AuthRepositoryImpl`: url → capture → `POST /auth/github {code, role:"CANDIDATE"}` → `GET /auth/me` → role check → store tokens.
3. `presentation/auth_controller.dart`: `AsyncNotifier` with the state model. Boot: restore → `/auth/me` (one refresh on 401). Network failure with stored tokens → keep session ("reconnecting"), never silently sign out. 403 → `accountUnavailable`. role ≠ CANDIDATE → `accessDenied`, clear tokens.
4. `signOut()`: clear tokens locally; best-effort `POST /auth/logout` (ignore errors).
Accept: tests (fake API/capture) for success, canceled, denied, state mismatch, 400, 403, 502, network, role≠CANDIDATE, boot-offline, double-tap (single flight), no secrets logged.
