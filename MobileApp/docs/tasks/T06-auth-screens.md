# T06 — Screens A01, A02 and states
Read: `docs/spec/auth-scope.md`, `docs/design/tokens.md`, `docs/design/screens/INDEX.md`, then ONLY these PNGs: `auth/candidate_welcome_sign_in__dark__v1.png` (+ light), `auth/github_connection_cancelled__dark__v1.png` (+ light). Other cancelled variants only if the owner asks. PNG = visual target; the spec wins on conflict. Never open html/.
Do:
1. A01 Welcome per scope. No email/password, no role UI, no fake logos/stats. Terms/Privacy links only if Q6 answered.
2. A02 states: loading (inline progress), cancelled (matches PNG), denied, failed, network, server, accountUnavailable, accessDenied — same components, icon + text + Retry / Back to sign in; duplicate taps disabled.
3. Capture screen (strategy A): header with Cancel (→ canceled), progress indicator, WebView fills the rest; nothing else.
4. Strings in `auth_strings.dart`.
Accept: all in dark + light; 320dp, text scale 2.0, long error string — no overflow/clipping; buttons wired; semantics labels; nothing invented.
