# Auth scope (distilled) — TalentGraph Mobile
Sources: Mobile SoT v1.0, Stitch SoT v1.3, backend code, owner decisions (see AUDIT §10). LOCKED unless marked.

## In scope
| ID | Screen | Must have | Stitch PNG (auth/) |
|---|---|---|---|
| A01 | Welcome / GitHub sign-in | Short product line; one primary "Continue with GitHub"; why GitHub is requested; sign-in ≠ repository access (separate explicit consent later); theme toggle | `candidate_welcome_sign_in__dark|light__v1` |
| A02 | OAuth status | loading · cancelled · denied · failed · network · server · **accountUnavailable (blocked/deleted)** · **accessDenied (non-candidate)**; each with Retry/Back to sign in | `github_connection_cancelled__*__v1..3` (variants unreviewed); other states built from spec with the same components |
| T01 | Theme toggle | Sun/moon in app bar; dark default, persisted, no settings page | — |
| S01 | Boot/offline | Skeleton while restoring session; offline-with-stored-session = "reconnecting", not signed out | — |
| — | Landing | Placeholder shell, tabs Jobs/Assessments/Notifications only; land on Jobs | — |

## DROPPED (owner): email verification screen (A03) and any email/password UI. GitHub users are stored as verified by the backend.

## Locked rules
Candidate-only; GitHub OAuth only; no role selector; tokens in secure storage and never shown; backend decides authorization; neutral recoverable errors; dark default (not System); layout identical across themes.

## Flow
`Welcome → Continue with GitHub → capture (contract §5) → POST /auth/github → GET /auth/me → role==CANDIDATE? → Jobs`
Cold start: restore tokens → `/auth/me` (refresh once on 401) → Jobs | Welcome.

## State model
`booting · unauthenticated · authenticating · authenticated(user) · accountUnavailable · accessDenied · error(AppFailure)`

## Not in this slice
Jobs, applications, assessments, camera, notifications logic, profile/CV, settings, billing, sign-out UI (Q1).
