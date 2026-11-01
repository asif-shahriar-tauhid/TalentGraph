# AI Work Audit — TalentGraph Mobile (auth slice)
Date: 2026-10-30 · Author: Claude (claude.ai chat) · For: teammates and their AI agents (Kilo Code or other)
Status: **planning/handoff only. No Flutter code was written. Nothing in this pack was run against Flutter, a device, or the real backend.** Sections 1–9 describe the first three rounds; **§10 supersedes them where they conflict.**

## 0. Instructions to the next AI (read first)
- Treat this file as a decision log + provenance record, NOT as a spec. Specs: `docs/spec/auth-scope.md`, `docs/design/tokens.md`, `docs/api/auth-contract.md`.
- Anything marked ASSUMED or UNVERIFIED must be checked before relying on it.
- Current mission: authentication only. Backend/web are frozen. Start with `docs/tasks/T00-probe-backend.md`.
- Do not "improve" scope. If a rule here conflicts with the owner's newest message, the owner wins; record the change under §7.

## 1. Owner requests, in order
1. (Turn 1) (a) define a file-management structure for the `MobileApp` folder so Kilo Code works cheaply and well; (b) explain how to get Stitch designs into Figma and distill the specs for Kilo; (c) create the Kilo files for the **authorization part only**.
2. (Turn 2) Shared `auth.api.ts` and asked what to change.
3. (Turn 3) (a) Ignore backend-change advice: build the mobile app only, make it work with the backend as it works now, "work with the first response"; (b) sort the full Stitch download (HTML + PNG for all screens) into the MobileApp folder; keep working on auth only; (c) make this chat an audit for a teammate's AI; explain how Kilo operates on the same basis.
Interpretation note: "first response" was read as *the first real response from the live backend*, so T00 probes it and treats it as authoritative. If the owner meant something else, correct §7.

## 2. Inputs reviewed
| File | Read fully? | Notes |
|---|---|---|
| `talentgraph_mobile_app_source_of_truth_v1_0.md` | yes | Mobile scope, screens A01–A10/J/N/T/S, tokens, text-overflow rules, TBDs |
| `talentgraph_mobile_design_direction_design.md` (mobile DESIGN.md) | yes (in context) | Tokens, Evidence Trail motif, components |
| `TalentGraph_STITCH_SOURCE_OF_TRUTH_v1_3.md` | partly: headings, auth/GitHub/stack/API/TBD sections (lines ~64–98, 130–141, 375–470) | Not every page-by-page website section was read |
| `AGENTS.md`, `DESIGN.md` (frontend) | AGENTS.md fully; DESIGN.md diffed + headings | **Finding: frontend `DESIGN.md` is a near-duplicate of `AGENTS.md` (same content, whitespace differences), not a token file.** |
| `README.md` (frontend) | yes | Default create-next-app README; no info |
| Screenshot | seen | VS Code explorer: `TalentGraph/{Backend, frontend/{public, src/{api/{auth.api.ts,index.ts}, app, asset, components, hooks, lib, providers, types, validation}, proxy.ts, …}, MobileApp}` |
| `auth.api.ts` | yes | Endpoints in contract §1. Imports `@/types`, `@/lib/apiClient` — **not provided** |
| Stitch export (all screens) | **NOT received** | Owner says it is downloaded; never uploaded to this chat. Sorting script provided instead |
| Backend code, `@/types`, `apiClient` | **NOT seen** | All response shapes are unknown until T00 |

## 3. Web research done (2 searches, standard mode)
- Kilo Code docs: `AGENTS.md` at project root auto-loaded (uppercase `AGENTS.md` preferred; nested ones supported; write-protected); `.kilocode/rules/*.md` loaded (newer docs describe `.kilo/rules` + `kilo.jsonc` `instructions`, with `.kilocode/rules` still backward compatible); `.kilocodeignore` uses gitignore syntax; memory bank is deprecated in favor of AGENTS.md. Source pages: docs.kilo.ai / kilo.ai custom-rules and agents-md.
- Stitch → Figma: sources describe a one-click export (paste Ctrl/Cmd+V into Figma, "editable layers") that may not work with every Stitch model, and a fallback: download code zip → `html.to.design` Figma plugin. **Not tested by me; menu names may differ in the owner's Stitch version.**
- Not researched: current Flutter/pub.dev package versions, `flutter_web_auth_2` behavior, GitHub OAuth redirect rules. Statements about them are from memory = UNVERIFIED.

## 4. Decisions and rationale
| # | Decision | Why | Confidence |
|---|---|---|---|
| D1 | Always-loaded context kept tiny: `AGENTS.md` (~55 lines) + 3 short rules; everything else in `docs/` loaded only when a task names it | Rules files load on every message → token cost | High (design), loading behavior per Kilo docs |
| D2 | `.kilocodeignore` hides full archival specs, HTML exports, `_other/` screens | Prevent accidental large reads | High |
| D3 | One task file per session (T00–T07) with Read/Do/Don't/Accept | Reproducible, small context, verifiable | High |
| D4 | Mobile `AGENTS.md` is NEW and mobile-specific; frontend AGENTS.md NOT copied | Frontend one assumes Next.js, 1440px breakpoints; also says website dark-mandatory while Stitch SoT v1.3 says website defaults to System (conflict, owner to resolve for web) | High |
| D5 | Stack = spec stack (Flutter, Riverpod, Dio, GoRouter, Secure Storage). Added `shared_preferences` (theme) and `flutter_web_auth_2` (browser hop) — **pending owner approval (Q8)** | Spec doesn't name a theme-persistence or OAuth-browser package | Medium |
| D6 | No code generation (freezed/json_serializable/riverpod_generator) in the slice | Fewer moving parts and tokens | Medium (preference) |
| D7 | Dark default, never System; light hand-tuned; tokens exactly per mobile DESIGN.md | Owner-locked | High |
| D8 | Contract rewritten twice: first a PKCE + backend-mediated PROPOSAL (turn 1, with invented endpoints — superseded), then confirmed endpoints from `auth.api.ts`, then (turn 3) "backend frozen" with T00 probe | Owner's later instruction supersedes; the early proposal must not be used | High |
| D9 | No resend-verification UI | `auth.api.ts` has no such endpoint | High |
| D10 | OAuth return capture is UNDECIDED: depends on the `redirect_uri` the backend returns. With an HTTPS web redirect the app cannot read the code without an Android App Link on the web domain or a dev-only WebView interception → owner decision (Q10) | Honest limit of "no backend/web changes" | Medium — GitHub redirect-URI rules from memory, verify |
| D11 | Sign-out UI not built (Q1); repository exposes `signOut()` for 401 handling | Spec forbids a settings tab; where it lives is undecided | High |
| D12 | Post-auth shell is a placeholder with exactly Jobs, Assessments, Notifications | Spec nav rule; needed as landing | High |

## 5. Discrepancies and risks found
1. Frontend `DESIGN.md` ≈ `AGENTS.md` duplicate (see §2).
2. Light-mode canvas differs: mobile `#FAFAFA` vs frontend AGENTS `#FFFFFF`. Mobile follows mobile DESIGN.md.
3. Tab label: Stitch SoT says "Assessment"; mobile SoT says "Assessments". Pack uses **Assessments**.
4. Web theme default: AGENTS.md says Dark mandatory; Stitch SoT §4 says System default. Web issue, not mobile.
5. `refresh-token` takes an optional body token → web likely uses cookies; mobile needs tokens in JSON/Bearer. Unverified.
6. Email verification link targets the website; mobile can only re-check `/auth/me`.
7. `ApiResponse`, `User`, `AuthResponseData`, `GithubAuthPayload` shapes unknown.
8. Spec TBDs (per-question timeout, resume, result release, question bounds) are outside auth; do not invent.

## 6. What was produced and how it was checked
| Artifact | Check performed |
|---|---|
| `AGENTS.md`, `.kilocodeignore`, `.kilocode/rules/*` | Written; not loaded in Kilo (not tested that Kilo picks them up) |
| `docs/spec/auth-scope.md`, `design/tokens.md` | Hand-distilled from the specs; spot-compared against sources, no automated check |
| `docs/api/auth-contract.md` | From `auth.api.ts` text only |
| `tasks/T00–T07` | Not executed |
| `tools/sort_stitch_export.py` | Ran on a **synthetic** folder (folder-per-screen with `screen.png`/`code.html`): classified auth vs `_other` as intended. **Real Stitch export layout untested** → use dry-run first |
| `tools/probe_auth.py` | Syntax-checked; ran against a local fake server: printed shapes/redirect_uri correctly. **Not run against the real backend** |
| Flutter code | none written; no Flutter SDK in the sandbox |
Process incident: one early shell script failed (brace expansion under `sh`) and was redone; one test hung on a background server and was rerun with timeouts. No effect on deliverables.

## 7. Change log of owner decisions (append below)
- 2026-10-30 Backend and web frozen; mobile adapts; probe first. Auth-only scope continues. Stitch export to be sorted by script.

## 8. Suggested next steps for the teammate's AI
1. Owner runs `tools/sort_stitch_export.py` → review `docs/design/screens/INDEX.md`.
2. Run T00 (probe) → resolve Q9/Q10 with the owner.
3. T01 → T07 in order, one per session, quoting real command output in each report.
4. Open items: Q1–Q10 in `docs/decisions/open-questions.md`.

## 9. How Kilo uses this pack ("same basis")
Auto-loaded each session: `AGENTS.md` (+ `.kilocode/rules/*.md`). Optional per task: files named in the task (attach with `@/docs/tasks/T0x-….md`). Hidden: patterns in `.kilocodeignore`. This audit is read only on request ("read @/docs/AUDIT.md and continue from §8"). `AGENTS.md` is write-protected in Kilo, so edits to it need the owner's approval — change mission/boundaries by hand. If rules aren't picked up in the owner's Kilo version, add a `kilo.jsonc` with `{"instructions": [".kilocode/rules/*.md"]}` (per newer Kilo docs; verify).

## 10. Update (rounds 4–6, 2026-10-31) — supersedes earlier items

### 10.1 New inputs reviewed
| Input | Result |
|---|---|
| Backend: `app.ts`, auth + user module files, `checkAuth`, `githubAuth`, `sendResponse`, `globalErrorHandler`, `config/index.ts` | Read fully. Base path `/api/v1`; tokens returned in JSON body AND cookies; `checkAuth` accepts Bearer; envelope and error shape known; callback URL = env `GITHUB_CALLBACK_URL` (value NOT provided) |
| `user.prisma` | Read. **Conflicts with the auth code** (has `passwordHash`, `githubToken`; code uses `password`, `status`, `name`, `emailVerified`, `imageUrl`, …). Treated as stale; `/auth/me` shape must be confirmed by T00 |
| Project tree (2 files) | Read. Shows MobileApp already contains pack v1 + the Stitch export at `docs/design/screens/stitch_talentgraph_candidate_mobile_app/`, 66 dirs/129 files; frontend has **no GitHub callback route** (only login/register/account-verify/forgot/reset pages) |
| Unknown files in MobileApp root: `mobile_agent_guidelines.md`, `mobile_design_guidelines.md`, `mobile_feature_architecture_spec.md`, `developer_setup_guide.md` | **Not written by this pack and NOT read.** Declared non-authoritative in AGENTS.md until reviewed (Q14) |
| Stitch `evidence_trail/DESIGN.md` | Not read (not uploaded). Archived; `tokens.md` stays authoritative |

### 10.2 Owner decisions
App scheme `talentgraph`, Android id `com.groupf.talentgraph`; `shared_preferences` + `flutter_web_auth_2` approved; **email verification dropped (GitHub-only)**; backend frozen; owner described the callback as "a web link … for the app to connect" (interpreted as an https URL; actual value requested, Q12).

### 10.3 Corrections to earlier statements
- D9/D8/contract §3–4 (resend/verify UI, PKCE, `/auth/refresh`) are obsolete. Verification screen A03 is dropped; backend stores GitHub users as verified.
- Earlier text "never an embedded WebView" is relaxed to: allowed only on the single OAuth-capture screen under strategy A, pending Q11. Reason: with a frozen backend and an https callback, the app can only read the one-time code by intercepting the navigation (or via an App Link, which needs a web-side file). GitHub's acceptance of embedded-WebView OAuth and `flutter_web_auth_2` https behavior are UNVERIFIED (from memory).
- My earlier claim that GitHub login "returns the role" was incomplete: the backend matches existing users by githubId OR email, so Recruiter/Admin accounts can come back → role check is mandatory.
- Unresolved risk: `logout` does not revoke tokens (cookies only); device-side token deletion is the only sign-out.

### 10.4 New decisions
| # | Decision | Confidence |
|---|---|---|
| D13 | Capture strategy A (WebView interception) default; B (App Link) for release; decided finally in T00/Q11 | Medium |
| D14 | Rewritten sorter groups the real Stitch names into auth / jobs (incl. application_*) / assessments / notifications; archives skill_percentiles (SkillGraph-like), untitled prototypes, email_verification, Stitch design-system file; keeps variants as v1..vN until approved | High (tested on a replica of the real tree) |
| D15 | Added states: accountUnavailable (403), accessDenied (role≠CANDIDATE), GitHub-without-email hint | High (from backend code) |
| D16 | `.kilocodeignore` hides raw export, `html/`, `_archive/`, project_structure.txt | High |
| D17 | Project name `talentgraph` with `--org com.groupf` yields id `com.groupf.talentgraph` (replaces `talentgraph_mobile` in v1 T01) | High |

### 10.5 Checks performed this round
- `sort_stitch_export.py` v2: dry-run/apply on a synthetic replica built from the real folder list: 65 screens → assessments 21, jobs 24, notifications 6, auth 6, archive 8; variants/themes parsed; jobs_discovery_2 flagged "no PNG". Not run on the owner's real files.
- Real export folders `assessments ` / `notifications ` appear with trailing spaces in the tree (possibly a display artifact); script aborts with a clear message if they exist.
- Not verified: Flutter anything; GitHub redirect behavior; live backend.

### 10.6 Next steps for the teammate's AI
Resolve Q11–Q17, run T00, then T01→T07 one per session. Do not start other segments until the mission line in AGENTS.md is changed by the owner.
