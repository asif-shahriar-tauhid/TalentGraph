# Open questions (tick + date when answered)
## Answered (owner, 2026-10-31)
- [x] App scheme `talentgraph`, Android id `com.groupf.talentgraph` (Q5)
- [x] `shared_preferences` + `flutter_web_auth_2` approved (Q8)
- [x] Email verification dropped; GitHub-only (Q2/A03)
## Open
- [ ] Q1 Sign-out: spec forbids a Settings tab. Where does it live? Until answered: not built; `signOut()` exists for 401 handling.
- [ ] Q3 Non-candidate account after GitHub sign-in → "access denied + discard tokens". Confirm wording.
- [ ] Q4 Backend TTLs are env-driven (default 1d/7d). Confirm actual values in your env.
- [ ] Q6 Terms/Privacy URLs for A01 (omit links until provided).
- [ ] Q7 Minimum Android SDK / devices.
- [ ] Q11 OAuth capture: approve strategy A (`webview_flutter`, in-app WebView on one screen) now, B (App Link) before release?
- [ ] Q12 Value of `GITHUB_CALLBACK_URL` (the frontend tree shows no dedicated GitHub-callback route; probably a page like `/login`).
- [ ] Q13 `user.prisma` upload conflicts with the auth code (see contract §3). Which is current?
- [ ] Q14 Review `mobile_agent_guidelines.md`, `mobile_design_guidelines.md`, `mobile_feature_architecture_spec.md`, `developer_setup_guide.md`: who wrote them, do they conflict with AGENTS.md?
- [ ] Q15 Approve one Stitch variant (v1/v2/v3) per screen in `docs/design/screens/INDEX.md`.
- [ ] Q16 `assessment_result_*` screens exist but result release is TBD in the spec — keep or archive?
- [ ] Q17 Rename folders with trailing spaces (`assessments `, `notifications `) in `docs/design/screens/`.
