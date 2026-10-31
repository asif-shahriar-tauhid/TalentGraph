# AGENTS.md — TalentGraph Mobile (Flutter, Candidate-only)

## Current mission
Build **only the authentication slice**: GitHub OAuth sign-in → session → gated placeholder shell. GitHub-only: **no email/password, no email verification screens.**
Everything else (jobs, applications, assessments, notifications) is OUT OF SCOPE until the owner edits this line.
App id `com.groupf.talentgraph` · URL scheme `talentgraph` · Android first.

## Read order (keep context small)
1. This file. 2. The current task `docs/tasks/T0x-*.md` (it names the extra files). 3. Only if the task says so: `docs/spec/auth-scope.md`, `docs/api/auth-contract.md`, `docs/api/observed-responses.md`, `docs/design/tokens.md`, `docs/design/screens/INDEX.md` + ONE png at a time from `docs/design/screens/auth/`.
Never open: `docs/design/screens/stitch_*` (raw export), `**/html/`, `_archive/`, `docs/spec/mobile-source-of-truth.md`, `docs/design/DESIGN.md` — unless a task or an unresolved conflict requires it.
Onboarding/audit only: `docs/AUDIT.md`.
Root files `mobile_agent_guidelines.md`, `mobile_design_guidelines.md`, `mobile_feature_architecture_spec.md`, `developer_setup_guide.md` were NOT written for this pack and are NOT authoritative; on any conflict this file and the task win. Report conflicts, don't resolve silently.

## Hard boundaries (never break)
- Candidate-only. No Recruiter/Admin entry, no role picker, no email/password form.
- Sign-in = GitHub OAuth. Capture strategy is fixed by `docs/api/auth-contract.md` §2. An in-app WebView is allowed ONLY inside the single OAuth-capture screen under strategy A, only after owner approval (Q11), never for other content.
- Tokens only in `flutter_secure_storage`. Never log, print or display them. Never display server `stack`/`error` fields.
- Post-auth shell bottom nav = exactly Jobs, Assessments, Notifications (placeholders). No Home/Profile/Settings/Billing/SkillGraph/Applications.
- Dark mode = first-launch default (never System). Light is a designed palette.
- Backend and web app are FROZEN. Never propose or require changes to them. Blocked → record in `docs/api/observed-responses.md` and ask.
- No invented endpoints, fields, policies, scores or copy claims. Don't parse server message strings for logic (use HTTP status + our own copy).
- Backend is authoritative: after sign-in the app requires `role == CANDIDATE`; any other role → access-denied, tokens discarded.

## Stack (fixed)
Flutter/Dart, Material 3, `flutter_riverpod`, `dio`, `go_router`, `flutter_secure_storage`. Approved additions: `shared_preferences` (theme only), `flutter_web_auth_2`. Pending Q11: `webview_flutter`. Versions via `flutter pub add`; no pinning from memory. No code generation in this slice.

## Folder map (create only what the task needs)
```
lib/ main.dart · app/ (app, router, theme/) · core/ (config, network, storage, error, util)
     features/auth/ (data · domain · presentation) · features/shell/ · shared/widgets/
test/ mirrors lib/        docs/ specs+design+tasks (not shipped)        tools/ helper scripts (humans run)
```

## Working rules
- One task file per session; verify before the next. Plan ≤10 lines, small diffs, never reprint whole files.
- Don't re-read files you just wrote; don't scan the repo. No hex colors outside `app/theme/`.
- Strings in `features/auth/presentation/auth_strings.dart`.
- Commands: `flutter pub get` · `dart format .` · `flutter analyze` · `flutter test`. Never claim a check passed unless you ran it.

## Final report (≤15 lines)
Done · Files changed · Checks actually run + result · Open questions hit · Next task.
