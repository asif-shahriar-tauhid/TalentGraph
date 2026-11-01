# T01 — Scaffold Flutter project
Read: `AGENTS.md` only.
Do:
1. In `MobileApp/` run `flutter create . --org com.groupf --project-name talentgraph --platforms=android` (skip if a project exists). Verify `applicationId` is exactly `com.groupf.talentgraph`.
2. `flutter pub add flutter_riverpod dio go_router flutter_secure_storage shared_preferences flutter_web_auth_2`. Add `webview_flutter` ONLY if Q11 = approved. Set minSdk to what `flutter_secure_storage` documents.
3. Android: DEBUG-only cleartext allowance for `10.0.2.2`/`localhost` (debug network-security-config); release must stay HTTPS-only. `INTERNET` permission in main manifest.
4. `analysis_options.yaml`: flutter_lints + strict-casts/inference/raw-types.
5. Folder skeleton per AGENTS.md; Inter font assets (ask owner for files if absent). `lib/main.dart`: `ProviderScope` → blank `Scaffold`.
Don't: screens, themes, networking.
Accept: `flutter pub get`, `flutter analyze`, `flutter test` run clean; app launches to a blank screen on an emulator.
