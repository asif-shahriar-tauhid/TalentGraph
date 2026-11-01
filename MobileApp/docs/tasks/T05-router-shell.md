# T05 — Router and placeholder shell
Read: `docs/spec/auth-scope.md`.
Do:
1. `app/router.dart`: `/welcome`, `/oauth` (capture screen), `/oauth-status`, `/jobs`, `/assessments`, `/notifications`. One `redirect` driven by auth state (booting → splash; unauthenticated/accountUnavailable/accessDenied → welcome or status; authenticated → /jobs). No email-verification route.
2. Android intent-filter for `talentgraph://…` or an App Link ONLY if contract §5 chose C or B. Strategy A needs none.
3. `features/shell/`: `NavigationBar` with exactly Jobs, Assessments, Notifications + text labels; placeholder bodies ("Coming in a later build", no fake data); app bar with `ThemeToggle`.
Accept: tests per redirect case; unauthenticated users can't reach shell routes; back after sign-in doesn't return to welcome; exactly 3 destinations.
