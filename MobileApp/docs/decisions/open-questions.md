# Open questions (tick + date when answered)
## Answered (owner, 2026-10-31)
- [x] App scheme `talentgraph`, Android id `com.groupf.talentgraph` (Q5)
- [x] `shared_preferences` + `flutter_web_auth_2` approved (Q8)
- [x] Email verification dropped; GitHub-only (Q2/A03)

## Answered (derived from backend code + .env, 2026-11-21)
- [x] Q4 Backend TTLs: **access = 1d, refresh = 7d** (confirmed from `JWT_ACCESS_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` in `.env` and config/index.ts defaults). Kilo: use these as the documented values; refresh once on 401, sign out if refresh also 401s.
- [x] Q11 OAuth capture strategy: **Path 1 (System Browser + Custom Scheme) chosen** — adheres strictly to the auth-security rule ("never use an embedded WebView"). Uses `flutter_web_auth_2` with `callbackUrlScheme: "talentgraph"`. The backend route `GET /api/v1/auth/github/callback` executes an HTTP 302 redirect to `talentgraph://auth/callback?${query}`, smoothly handing control from Chrome Custom Tabs back to Flutter. No `webview_flutter` or embedded WebView screens in the app.
- [x] Q12 `GITHUB_CALLBACK_URL` value: `http://localhost:5000/api/v1/auth/github/callback` (read from `Backend/.env`). This is the redirect_uri embedded in the GitHub authorize URL. It is NOT a custom scheme → strategy A (see Q11).
- [x] Q13 `user.prisma` conflict: the uploaded `user.prisma` is **stale**. The authoritative shape comes from the generated Prisma client (`src/generated/prisma/models/User.ts`) and from `GET /auth/me` observed in T00. The app model reads only `id, name, email, role, status, imageUrl?` per contract §3 — no change needed to app code.

## Open (still need owner input)
- [ ] Q1 Sign-out: spec forbids a Settings tab. Where does it live? Until answered: not built; `signOut()` exists for 401 handling only.
- [ ] Q3 Non-candidate account after GitHub sign-in → "access denied + discard tokens". Confirm exact UI copy.
- [ ] Q6 Terms/Privacy URLs for A01 (omit links until provided).
- [ ] Q7 Minimum Android SDK / target devices.
- [ ] Q14 Review `mobile_agent_guidelines.md`, `mobile_design_guidelines.md`, `mobile_feature_architecture_spec.md`, `developer_setup_guide.md`: who wrote them, do they conflict with AGENTS.md?
- [ ] Q15 Approve one Stitch variant (v1/v2/v3) per screen in `docs/design/screens/INDEX.md`.
- [ ] Q16 `assessment_result_*` screens exist but result release is TBD in the spec — keep or archive?
- [ ] Q17 Rename folders with trailing spaces (`assessments `, `notifications `) in `docs/design/screens/`.

- [ ] Q18 PKCE not supported by backend (contract line 39). Auth code is single-use (contract §2) but code TTL is not stated. State is 256-bit unguessable (Random.secure(), 32 bytes). Exposure: race to redeem the code after GitHub redirect before the legitimate app does. Accepted risk — backend-side gap; app cannot fix without PKCE support. Confirm code short-lived status with owner.
