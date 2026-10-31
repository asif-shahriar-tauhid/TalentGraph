# Flutter conventions (TalentGraph Mobile)

- Feature-first folders (see AGENTS.md). Layers: presentation → domain → data. Presentation never imports Dio or storage.
- State: Riverpod `Notifier` / `AsyncNotifier` written by hand. One provider per responsibility.
- Models: small immutable classes (`final` fields, `const` ctor, manual `fromJson`). Sealed classes for session/auth states.
- Errors: map every failure to `AppFailure` (network, canceled, denied, expired, server, unauthorized, unknown). UI renders from the type, never from raw exception text.
- Dio: one instance via provider; timeouts set; interceptor attaches `Authorization`; on 401 do ONE single-flight refresh, then sign out. Base URL from config only.
- Router: `go_router` with a single redirect function driven by session state. No navigation inside `build`.
- Strict analysis: `strict-casts`, `strict-inference`, `strict-raw-types`. No `dynamic`, no unexplained `!`, no `print` (use a redacting logger).
- Async UI: `if (!context.mounted) return;` after `await`. Disable buttons while a request is in flight.
- Colors/spacing/radius come from `app/theme/` (`ThemeData` + a `TgColors` `ThemeExtension`). Zero hex literals elsewhere.
- Accessibility: `tooltip`/`Semantics` on every icon-only control; theme toggle label names the NEXT action ("Switch to light mode"); 48dp tap targets; status = text + icon, never color alone.
- Tests mirror `lib/`. Prefer widget tests with fake repositories over mocking Dio internals.
