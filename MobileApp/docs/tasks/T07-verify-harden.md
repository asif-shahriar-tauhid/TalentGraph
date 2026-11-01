# T07 — Verify and harden (auth slice)
Read: `.kilocode/rules/03-definition-of-done.md`.
Do:
1. Run `dart format .`, `flutter analyze`, `flutter test`; fix real issues (no `ignore` comments to silence them).
2. Add missing widget/golden tests for each A01–A03 state at 320dp, text scale 2.0, both themes.
3. Security sweep: grep for `print(`, token logging, hex literals outside `app/theme/`, any `WebView` outside the single OAuth capture screen, `maxLines`/ellipsis on essential text, fixed heights around text.
4. Manual script for owner (write to `docs/decisions/manual-test-auth.md`): fresh install → dark; sign in success; cancel; deny; airplane mode; kill app + reopen (session restore); expired token; non-candidate account; blocked account (403); GitHub account without email; theme persists.
Accept: report lists exactly which checks were run with results, and every unverified item.
