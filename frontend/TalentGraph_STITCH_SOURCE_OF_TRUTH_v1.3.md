# TALENTGRAPH — STITCH SOURCE OF TRUTH

**Version:** 1.3 (Stitch-ready condensed product/UI reference; dual-theme update)  
**Updated:** 19 October 2026  
**Product:** TalentGraph — AI-assisted, evidence-based technical recruitment  
**Context:** NSU CSE327 software engineering + AI project  
**Status:** Planned specification; not every feature is implemented or verified.

> **Purpose:** Use this file as the global product context when designing TalentGraph screens in Google Stitch. Build one requested page/flow at a time, but keep every screen consistent with this file. The long-form product specification is `TalentGraph_Full_Product_and_UI_UX_Specification_v1.3.docx`; this Markdown is the compact working reference for page-by-page UI generation.

## 0. Instruction for Stitch / AI design tools

Treat this file as the current source of truth. Read it before designing. Preserve routes, roles, permissions, platform boundaries, theme tokens, approved prices, workflows and empty/error/loading states. Do not invent functionality, metrics, customer logos, plan prices, quota values, verification claims or finalized policies. When a requirement is marked **TBD** or **assumption**, do not present it as an approved fact.

When asked for a page:
1. Design **only the requested page or explicitly requested flow**, not the whole application unless asked.
2. Use the shared TalentGraph design system in either Light or Dark mode, with role-specific navigation. Support Light, Dark and System preferences on every website role.
3. Show realistic but clearly illustrative data; do not imply mock metrics are real product results. Prefer neutral placeholder data when uncertain.
4. Include the key states relevant to that page: default, loading, empty, error/retry, success, permission/quota blocked and disabled/locked states as appropriate.
5. Make visible controls meaningful and consistent with the route/action table. Do not add mobile-only functions to the website or vice versa.
6. Keep the page calm and uncluttered: one dominant action, concise copy, progressive disclosure, visible hierarchy and generous whitespace.
7. Keep reusable components and the same tokens across pages. Use responsive web layouts where the route is a website route. The Flutter mobile app is a separate, narrowly scoped experience—not a shrunken desktop portal.
8. If a new request conflicts with this file, point out the conflict and ask which decision supersedes it. Do not silently change the product rules.

## 1. Product summary

**Product promise:** “Don’t just claim a skill. Prove it.” TalentGraph connects candidate claims with CV, selected GitHub repositories and technical-assessment evidence, then explains job fit transparently.

**Problem:** CV claims are hard to verify; initial screening is slow and scattered across sources; scores can be opaque; candidates need useful, evidence-grounded skill-gap guidance.

**Vision:** Move technical hiring from “What does the CV claim?” to “What can the candidate demonstrate, and where is the evidence?”

**Initial users/market:** Bangladeshi software startups and SMEs, technical recruitment teams/agencies, students, fresh graduates and junior developers.

**Core value:**
- **Candidate:** maintain a reusable evidence-backed profile on the website, discover roles, apply, see a SkillGraph, track applications and get practical evidence-based improvement suggestions.
- **Recruiter:** define skill requirements/weights, compare ranked applicants, inspect source-linked evidence and review assessments.
- **Hiring process:** AI helps with screening and explanation; humans retain hiring and assessment-integrity decisions. TalentGraph does not guarantee employment and does not replace interviews/reference checks.

## 2. Locked platform and product rules

### Roles
- **Candidate:** public registration via GitHub OAuth. Candidate uses the full website workspace; mobile scope is deliberately limited.
- **Recruiter:** website account and recruiter portal. Email/password or the configured recruiter authentication method. Must pass company and recruiter-affiliation verification before publishing a job.
- **Admin:** website-only, provisioned by platform owner; no public admin registration.
- The backend decides role/permissions. Hiding a control in the UI is not authorization.

### Exact platform boundary

| Capability | Candidate website | Candidate mobile app | Recruiter/Admin website |
|---|---|---|---|
| Profile, CV upload/management | Yes | **No** | Authorized recruiter may view evidence for their applicants; Admin access restricted/audited |
| GitHub connection, repository selection, manual sync | Yes | **No** | No candidate sync controls |
| SkillGraph, detailed evidence, percentiles, AI improvement | Yes | **No** | Recruiter can inspect authorized candidate/job evidence |
| Find/search/filter jobs and view job details | Yes | Yes | Recruiter previews/manages own jobs; Admin moderates |
| Submit job application | Yes | Yes, using already saved profile/CV data | No candidate application submission |
| Application list/history/tracking | Yes | **No dedicated application workspace**; only submit flow/related notification destinations as supported | Applicants and pipeline for authorized jobs |
| Assessment invitations/instructions/status/released results | Yes | Yes | Configure, assign and review on website |
| Actual timed assessment | **Never** | **Yes — mobile only** | Configure/review, never take the candidate test |
| Notifications | Yes | Yes | Website notifications/activity as implemented |
| Candidate settings, profile management, SkillGraph, billing | Yes | **No** | Recruiter settings/billing and admin settings on website |
| Any checkout/payment/plan management | Website only | **No billing or subscription UI** | Website only |

**Mobile app navigation:** Jobs, Assessment, Notifications. GitHub OAuth is required to enter the Candidate app. Candidate must use the website for all other work, including profile/CV, GitHub sync, SkillGraph, full application tracking, account settings and subscriptions. Do not create a mobile dashboard/profile/settings/billing surface unless product scope is explicitly changed.

### GitHub login vs repository permission
- Candidate signs in with GitHub OAuth on website and mobile.
- Signing in is not automatic consent to analyse repositories. Ask for/confirm repository read access separately, request least-privilege scopes, and let the candidate select repositories.
- MVP recommendation: selected **public** repositories; private repository access is not assumed unless explicitly approved and consented.

### GitHub sync and cached evidence
- Manual sync may be initiated **only from the Candidate website**.
- Maximum **3 syncs per candidate account per calendar month**, including the first full sync. Quota is account-based and enforced server-side.
- Show usage `0/3`, `1/3`, `2/3` or `3/3`, plus next reset information.
- A sync checks the last successful repository snapshot/commit/metadata; fetch and analyse new/changed content incrementally where possible; save repository snapshots, normalized skills and evidence into the database.
- Job applications **must reuse stored evidence**. Never fetch the whole repository, repeat static analysis or re-run AI evidence extraction during application submission.
- Internal retry of the same sync job should be idempotent and must not consume extra quota slots. Recommended quota reset: calendar month, Asia/Dhaka timezone; exact failure-counting/reset behavior still needs confirmation.
- Never expose OAuth tokens or secret-like repository values in UI/logs.

### Assessment
- Recruiter chooses the question count, assigns a **time limit and point value to each question**, and sets/reviews the overall duration.
- Recommendation/default only: **5 questions** and **5 minutes overall**. These are not forced limits; recruiter can choose a different question count and duration.
- Exactly **5 random front-camera snapshot capture opportunities** remain fixed regardless of question count. Actual stored images can be fewer if permission/device/network capture fails; show those failures as technical states/events.
- Save an immutable versioned configuration snapshot at attempt start so later job edits do not silently alter an active attempt.
- Validate that overall duration and per-question timers are consistent. The exact timer rules still need approval; recommended behavior is to lock/advance unanswered question on per-question timeout and auto-submit on overall timeout.
- AI or a camera/app/network flag must **never declare cheating by itself**. Recruiter reviews answers, available snapshots and events and records `No Violation` or `Confirmed Violation`, with reason/audit trail. Only human-confirmed violation triggers the current future-assessment ban policy.
- The official employer-required assessment is free to candidates. Premium practice assessments, if built, are separate.

### Payments
- All purchases, checkout, subscription management and billing happen on the **website only**. Mobile app contains no billing, subscription status, checkout or payment screen.
- The backend confirms payments from a verified, signed provider webhook; redirect URL alone is not payment proof. Never store raw card details. Provider is TBD.

### Other locked rules
- Company legitimacy and recruiter affiliation are separate checks; both must pass before job publishing. Email verification alone is insufficient.
- AI can support screening/explanations but recruiter owns hiring decisions.
- Candidates never see other candidates’ identity, private score or ranking. They may see only anonymized skill percentiles for a job they applied to, if enough data exists.
- Payment never boosts candidate SkillGraph, match score, percentile or hiring rank.

## 3. Dual-theme design system (Light + Dark)

The project reference palette is the **Dark Mode palette**, not a direction to make the whole product dark-only. TalentGraph website must support **Light, Dark and System** modes across the public site, Candidate website, Recruiter portal and Admin portal. Both themes share the same brand-orange identity and semantic UI behavior. Unless the user has selected a preference, follow the operating-system theme (`System`).

### Theme tokens

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| Main background | `#FAFAFA` | `#0D0D0F` | Global page canvas |
| Elevated surface / card | `#FFFFFF` | `#19191C` | Cards, menus, dialogs, popovers |
| Brand / primary | `#D4621A` | `#D4621A` | Brand accents and primary controls |
| Primary text | `#18181B` | `#F5F5F5` | Headings and main body text |
| Secondary text | `#71717A` | `#A1A1AA` | Metadata, helper text and secondary labels |
| Neutral | `#52525B` | `#52525B` | Secondary controls and neutral indicators |
| Border / divider | `#E4E4E7` | `#3F3F46` | Card edges, inputs, table rules and separators |
| Destructive | `#DC2626` | `#E5484D` | Errors and destructive actions |
| Success | `#15803D` | `#22C55E` | Success states |
| Warning | `#B45309` | `#F59E0B` | Warnings and caution states |
| Selected / soft surface | `#FFF1E8` | `#252528` | Selected rows, active navigation and subtle panels |
| Primary hover | `#B94F0B` | `#E47735` | Hover/pressed state for orange actions |
| Text on brand CTA | `#18181B` | `#18181B` | Foreground on brand-orange CTA; verify contrast |
| Keyboard focus ring | `#B94F0B` | `#E47735` | Visible focus indication |

### Theme behavior (website)

- Provide **Light / Dark / System** selection from a sun/moon theme control in the public header and the signed-in website shell/settings. It may be a compact segmented control or menu; do not add a large settings panel just for theme.
- First visit defaults to **System**. Respect the operating system preference until the user explicitly chooses Light or Dark.
- Prevent a flash of the wrong theme on load; persist guest choice locally and signed-in preference with the user settings. Keep the selected mode consistent across all website routes and sessions where signed-in preference is available.
- Apply theme tokens to every surface: navigation, tables, inputs, menus, dialogs, charts, notifications, skeletons, loading/empty/error states, badges and disabled controls. Do not leave one page or overlay in the other theme.
- Do not create two different layouts for the two themes. Theme changes color tokens, borders, shadows and chart contrast—not information architecture, spacing, page content or interaction behavior.
- Candidate mobile app remains a separate Flutter experience. Do not assume the website's visible theme toggle or website navigation needs to be copied into mobile scope; mobile remains limited to Jobs, Assessment and Notifications.

### Visual and accessibility rules

- Use `#D4621A` as the shared brand orange. Keep primary-action foreground contrast readable; do not assume white text on orange is accessible by default. Use `#18181B` on the orange CTA as specified and validate WCAG AA contrast for text and controls. Hover tokens are theme-specific.
- Always pair status colors with a text label and/or icon; color alone must never convey an error, score, verification state or integrity decision.
- Typography: Inter or equivalent sans-serif; body text usually 14–16 px equivalent. Use an 8 px spacing rhythm, 8–12 px card radius, subtle theme-aware borders and visible keyboard focus.
- Avoid excessive shadows, gradients, ornamental animation and over-carded dashboards. Keep the interface calm, accessible and uncluttered in both themes.

**Website stack/design components:** Next.js + TypeScript + Tailwind CSS + shadcn/ui; TanStack Query for API state; React Hook Form + Zod for forms; Recharts for charts; React Flow optional for skill/evidence relationships. Implement paired theme tokens using a consistent theme strategy rather than hardcoding colors per page.

**Mobile stack:** Flutter + Dart, Material 3-style widgets, Riverpod, Dio, GoRouter, Flutter Secure Storage and camera plugin only for the assessment flow.

## 4. Global UX and navigation rules

- **Theme:** every website role supports Light, Dark and System. Theme control appears in the public header and authenticated website shell/settings; preference persists and applies to all routes/components. System is the default until the user chooses otherwise. See Section 3 for exact paired color tokens.
- Public header: logo, Home, How It Works, About, Login, Get Started. How It Works/About are landing-page sections, not standalone MVP routes.
- After login, backend-verified role routes to Candidate website dashboard, Recruiter dashboard or Admin dashboard as applicable.
- Candidate website sidebar: Dashboard, My Profile, SkillGraph, Explore Jobs, Applications, Assessment Center, Notifications, Settings, Subscription/Plans.
- Recruiter sidebar: Dashboard, Company, Jobs, Applicants/Review, Assessment Review, Pipeline, Billing/Plans, Settings.
- Admin sidebar: Dashboard, Users, Company Verification, Companies & Jobs, Integrity & Audit, System Monitoring, Payments/Subscriptions, Platform Settings.
- Clearly mark active navigation. Use breadcrumbs for nested recruiter pages. Confirm destructive/consequential actions. Preserve entered form values after validation errors.
- Calm, low-clutter screens: one main action per view, concise labels, progressive disclosure for advanced filters/evidence/assessment config, sensible defaults, clear forms, searchable lists and helpful empty states.
- Every relevant page includes loading, success, empty, error/retry and permission/quota/verification blocked states. Use real API data; never fabricate a result or score.
- Use “Not yet analyzed”, “No data yet”, “Limited evidence” or “Not demonstrated in currently connected evidence” where appropriate. Missing evidence does not prove lack of ability.

## 5. Route inventory

### Public/shared website
- `/` — landing page
- `/login` — role-aware login
- `/register` — Candidate GitHub OAuth or Recruiter registration; no Admin signup
- `/verify-email` — verification status/token
- `/forgot-password`, `/reset-password` — recruiter password recovery; Candidate credential recovery is handled by GitHub
- `/pricing` — approved plans
- `/billing` or role-specific billing — website billing/plan management
- `/billing/success`, `/billing/cancel` — feedback only; backend webhook is payment source of truth
- `/privacy`, `/terms`, `/403`, `/404`

### Candidate website
- `/candidate/dashboard`
- `/candidate/profile`
- `/candidate/skillgraph`
- `/candidate/jobs`
- `/candidate/jobs/:jobId`
- `/candidate/applications`
- `/candidate/applications/:applicationId`
- `/candidate/assessments` — info/status/instructions/results only; never the timed exam
- `/candidate/notifications`
- `/candidate/settings`
- `/candidate/subscription` or `/billing` — website only

### Candidate mobile app (only these product areas)
- GitHub OAuth sign-in/registration flow
- `/jobs` — search/filter/recommend jobs
- `/jobs/:jobId` — job detail + application submission using already saved profile/CV data
- `/assessments` — invitations, instructions, statuses and permitted results
- `/assessments/:assessmentId/start` — actual timed assessment, mobile only
- `/notifications` — list and supported notification destinations

### Recruiter website
- `/recruiter/dashboard`
- `/recruiter/company`
- `/recruiter/company/verification`
- `/recruiter/jobs`
- `/recruiter/jobs/new`
- `/recruiter/jobs/:jobId/edit`
- `/recruiter/jobs/:jobId/applicants`
- `/recruiter/jobs/:jobId/candidates/:candidateId`
- `/recruiter/assessments/:assessmentId/review`
- `/recruiter/jobs/:jobId/pipeline`
- `/recruiter/billing`
- `/recruiter/settings`

### Admin website
- `/admin/dashboard`
- `/admin/users`
- `/admin/company-verification`
- `/admin/companies-jobs`
- `/admin/integrity`
- `/admin/monitoring`
- `/admin/subscriptions-payments`
- `/admin/settings`

## 6. Page-by-page UI requirements

Design only the requested page in a prompt; this section tells you what that page must accomplish.

### 6.1 Public and account pages

**Landing `/`** — Header + hero (“Don’t just claim a skill. Prove it.”), short explanation of CV + GitHub + assessment → evidence-backed skills, four-step How It Works, candidate benefits, recruiter benefits, trust statement (AI supports; humans decide), footer/contact/privacy/terms. No fake logos, unsupported metrics, private candidate data or guaranteed hiring claims. CTAs route to `/login` and `/register`.

**Login `/login`** — Candidate “Continue with GitHub” OAuth; Recruiter configured email/password login; forgot-password link for recruiter; register link; clear auth errors. No Candidate email/password login and no role picker that grants privileges. Route by server-verified role.

**Registration `/register`** — Role choice Candidate/Recruiter only. Candidate continues via GitHub OAuth, then required consent/email verification. Recruiter fields: name, email, password/confirmation, company name, official website if any, recruiter title/relationship and verification start step. Minimal, well-validated form; registration does not verify a company.

**Email verification `/verify-email`** — Waiting/verified/expired/failure state, resend with rate limit, next step by role. Email verification never replaces company/affiliation review.

**Forgot/reset password** — Recruiter-only recovery form, generic confirmation to prevent account enumeration, short-lived single-use token, never email plain-text password. Show invalid/expired/reused token, mismatch, rate-limit and server-error states.

**Pricing/Billing** — Compare exactly approved plans/features/prices in Section 8. Checkout starts on website, server creates checkout session, provider confirms via webhook. Show pending/success/failure/cancel states from server; do not infer success from URL query parameters.

### 6.2 Candidate website pages

**Dashboard `/candidate/dashboard`** — Welcome/profile completion, CV and GitHub/sync status, SkillGraph summary, application counts/recent updates, concise recommended-job list, assessment invitation/deadline/status (test starts on mobile), evidence-based improvement hint and notification unread count. New-account state should guide next step rather than show fake scores.

**My Profile `/candidate/profile`** — Personal/academic details (name/headline/education/experience/links/skills), CV upload/manage PDF/DOCX and CV version/parsing status, GitHub OAuth/repository selection, last successful sync, project/skill evidence list, quota meter `n/3`, next reset and privacy/security shortcuts. Sync action is manual, website-only, quota-enforced and incremental. CV parsing does not consume GitHub sync quota.

**SkillGraph `/candidate/skillgraph`** — Radar chart for supported normalized 0–100 skill scores; skill list/detail; evidence coverage/quality and source anchors (repo/file/line/commit/permalink); applied-job-only skill percentile tab; evidence-grounded improvement roadmap; last-analysis/last-sync freshness. If rubric/data/cohort is missing, explain that; minimum percentile cohort is TBD. Candidate cannot see peers’ names, exact scores, CVs or rankings.

**Explore Jobs `/candidate/jobs` (web + mobile)** — Search title/company/skill; All/Recommended/Saved tabs; useful filters (type, level, location/work arrangement, skills, company, posted date); clear job cards with title, verified-company badge, location/type/deadline, skills and concise description; search/filter/pagination/no-results states. Only active, non-expired, approved postings are open for application. No fabricated match score.

**Job Details / Apply `/candidate/jobs/:jobId` (web + mobile)** — Role/company header, verification badge, location/type/level/deadline, duties, required/preferred skills and eligibility. Evidence-fit summary based on stored evidence, no guarantee. Web can select/upload CV and preview exact CV version before submit. Mobile uses already saved profile/CV data; no CV/profile management/upload UI. Submit creates a stable application record/CV snapshot; prevent duplicate active applications unless policy permits. Show confirmation, ID/time/status and errors (closed/deadline/already applied/missing CV/upload/network).

**My Applications `/candidate/applications`, `/:applicationId` (website only)** — API-backed counts, search/filter by company/job/stage, cards/table with job, company, date, stage, CV snapshot and latest update; detail timeline, permitted recruiter messages, separate assessment status and job-specific percentile link. Never expose other applicants. Withdrawal policy is TBD: do not show withdraw until defined.

**Assessment Center `/candidate/assessments` (website view)** — Invitation/job/company/deadline, configured duration/question count, instructions/integrity policy, verified-email/GitHub state, mobile-only requirements, deep link/QR fallback, history and released results. Website must never show live exam questions/timers/camera snapshot flow. Result visibility follows release policy (TBD).

**Notifications `/candidate/notifications` (web + mobile)** — Shared backend list with category, title, short summary, timestamp, read/unread and target entity. All/Unread/category filters where appropriate, per-item and mark-all-read. Navigate only to supported and authorized destination. Shared read state syncs across devices.

**Settings `/candidate/settings` (website only)** — Account/email verification, security/sessions/password if supported, GitHub disconnect/revoke, notification preferences if implemented, privacy/data access/deletion requests, retention explanations. Disconnecting GitHub is separate from deleting stored evidence. Sensitive changes may require re-authentication.

**Candidate subscription/billing (website only)** — Current plan/entitlements/transactions, Free vs Premium comparison and website checkout. No billing UI exists in mobile. Premium never changes hiring scores/ranking.

### 6.3 Candidate mobile pages

**Mobile shell:** minimal bottom navigation: Jobs, Assessment, Notifications. No candidate full dashboard, Profile, CV manager, GitHub sync, SkillGraph, Applications workspace, Settings or Billing. Use mobile-native Flutter/Material 3 layouts.

**Mobile Jobs / Job detail / Apply:** GitHub OAuth session, active jobs search/filter, job details and straightforward apply action using stored profile/CV snapshot; do not add profile editing or repository sync controls. Provide submit/loading/success/error states.

**Mobile Assessment Center:** list invitations/status/deadlines, instructions, allowed released results and entry to exact assessment. Deep link opens exact attempt. If app is missing, show install/open-app guidance or QR/browser state—never move the exam to web.

**Actual timed assessment `/assessments/:assessmentId/start`:** preflight (job, rules, question count, overall duration, camera permission and explicit start); one question per screen; visible question number/progress; per-question and overall timers; answer input matching the supported question type; five randomly scheduled snapshot opportunities; submit confirmation; timeout/connection/camera unavailable handling; submitted state. Prevent duplicate submits and reject expired/used attempts from backend. Do not display a definitive cheating verdict from camera/app signals.

**Notifications:** shared records and read state; support navigation to relevant job/application/assessment destinations without introducing a full applications workspace.

### 6.4 Recruiter website pages

**Recruiter Dashboard `/recruiter/dashboard`** — Active jobs, new applicants, pending reviews, shortlist count, recent job/application/assessment/company events, job list with deadline/status/applicant count, quick actions (Create Job, Applicants, Company Verification, Billing). If company unverified, show a clear action banner and disable publishing.

**Company Profile/Verification `/recruiter/company`, `/recruiter/company/verification`** — Company name/site/domain/location/description/logo/contact; verification evidence packet; recruiter-company relationship; status Draft/Pending/Needs More Information/Verified/Rejected, reason and resubmission flow. Save draft and submit verification. A generic email domain alone is not grounds for automatic rejection; alternate evidence process must be allowed.

**Job Management `/recruiter/jobs`** — Search/filter status/title/date; Draft/Pending Verification/Active/Closed/Archived; applicant counts, deadline, assessment setup; create/edit/preview/publish/close/actions. Drafts may exist while blocked; publish only after company and affiliation verification, validation and entitlement checks. Closing stops new applications but preserves authorized historical data.

**Create/Edit Job `/recruiter/jobs/new`, `/:jobId/edit`** — Wizard:
1. Basics: title, description, responsibilities, company/location, job type, experience level, deadline.
2. Requirements: AI-extracted required/preferred skills, recruiter edits/accepts canonical skills.
3. Weights: recruiter assigns per-skill weights (total must equal 100%) and optional minimum thresholds; preview contribution logic.
4. Assessment: choose question count (recommended 5), add/select/remove supported auto-gradable questions, set **per-question time limits and points**, set/review overall duration (recommended 5 minutes), validate timer consistency. Exactly five random snapshots remain fixed.
5. Preview/publish: candidate-facing preview, verification/plan/field validation, Save Draft and Publish.

  AI extraction results must be editable and not auto-published. Version weight/threshold/assessment configurations. Preserve unsaved-change confirmation and validation state.

**Applicants & Rankings `/recruiter/jobs/:jobId/applicants`** — Search/filter/sort table of authorized applicants: candidate summary, deterministic match score, per-skill contribution, evidence status, assessment status, stage. Side-by-side comparison if plan permits; shortlist/move-stage actions and confirmation; show pending analysis, partial evidence, no applicants and plan limits. Ranking is calculated by backend formula, not AI prose.

**Candidate Evaluation `/recruiter/jobs/:jobId/candidates/:candidateId`** — Authorized candidate/application summary, submitted CV, application timeline, overall match score, per-skill score/contribution/weight/threshold, SkillGraph evidence relationships, exact source viewer (repo/path/line/commit/permalink), and RAG questions (why match, missing evidence, interview verification). Actions: shortlist, change stage, review/request assessment, recruiter notes. AI claims link to valid evidence IDs checked by backend. Never assert authorship or skill from weak evidence.

**Assessment Review `/recruiter/assessments/:assessmentId/review`** — Candidate/job/attempt ID, started/submitted times, effective config, each question’s answer/grade/points, five expected snapshot attempts with capture times or failure events, app/background/camera/network event timeline, reviewer notes. Actions `No Violation` and `Confirmed Violation` (latter requires confirmation + reason). Snapshot links must be private, time-limited and authorized. Flags are clues, not verdicts. Store immutable/audited review decision.

**Hiring Pipeline `/recruiter/jobs/:jobId/pipeline`** — Under Review → Shortlisted → Interview → Final Decision; separate filters for Rejected/Withdrawn/Closed as supported; candidate cards/table, stage actions, next action, authorized notes/history. Assessment state and hiring stage are separate. Candidate notifications never include internal recruiter notes.

**Recruiter Billing `/recruiter/billing` and Settings `/recruiter/settings`** — Current plan/campaign and expiry, active-job/assessment/feature usage, receipts/transaction state, supported upgrade/cancel actions, profile/security/notification settings/company link. All checkout stays on website; numeric caps marked TBD remain TBD. Team/Agency, ATS/API and calendar features are stretch scope, not assumed MVP.

### 6.5 Admin website pages

**Admin Dashboard `/admin/dashboard`** — Operational overview: pending company verifications, users/companies/jobs, flagged integrity reviews, background processing failures and payment/subscription events. Use action-focused queues, not vanity metrics. Admin accounts are pre-provisioned.

**User Management `/admin/users`** — Search/filter accounts, role/status and basic timestamps, account details, suspend/restore or permitted account actions with reason/audit. Do not expose raw CVs/snapshots or unnecessary sensitive data in generic user lists. No privilege escalation without review.

**Company Verification Queue `/admin/company-verification`** — Pending queue with company/requester/date/status/missing evidence; company legitimacy evidence and recruiter affiliation evidence shown as separate checks; review history/reasons. Approve only after both checks pass; Request More Info/Reject must require reason and notify recruiter. Do not call it “government verified” unless the actual process proves that claim.

**Companies & Job Moderation `/admin/companies-jobs`** — Verified status, linked recruiters, job owner/status/moderation flags/reports; suspend/restore with confirmation, reason, audit and candidate impact notice where appropriate. Moderation must not silently alter ranking.

**Integrity & Audit `/admin/integrity`** — Assessment case queue, reviewer/decision/date, audit timeline, restricted evidence access, appeal/correction only if that workflow is defined. Admin tools are for audit, not automatic cheating accusations.

**System Monitoring `/admin/monitoring`** — Background-job queue/status, safe error summary, retries, timestamps, correlation IDs; filter failed/stuck tasks and retry only if permitted/idempotent. Never display tokens, secrets or sensitive payloads.

**Subscriptions & Payments `/admin/subscriptions-payments` and Platform Settings `/admin/settings`** — Entitlements, effective dates, provider reference, verified webhook history, payment pending/success/failure/refund states, safe retry of signed/idempotent events, approved plan settings, quotas, assessment defaults and retention settings. No manual payment-success override from a redirect; manual entitlement correction requires authorization, reason and audit. Never expose provider secrets to browser. Recruiter-specific weights remain owned by recruiters.

## 7. Pricing (approved; BDT only)

These are the **only approved prices**. Do not add an annual discount, free trial, per-seat pricing, extra tier or recruiter-free tier unless the product owner explicitly changes scope.

| Plan | Price | Approved listed features |
|---|---:|---|
| Recruiter Starter | ৳2,000/month | 2 active jobs, candidate ranking, skill weights/thresholds, evidence-linked AI explanations, basic hiring dashboard, “one assessment” (meaning TBD) |
| Recruiter Growth | ৳5,000/month | Multiple active jobs (exact cap TBD), higher assessment limits (TBD), advanced candidate comparisons, detailed SkillGraphs, enhanced reporting |
| Pay per job | ৳2,500 per job campaign, one-time; 2-month limit | One defined job opening, higher assessment limits (TBD), advanced comparisons, detailed SkillGraphs, enhanced reporting |
| Candidate Free | ৳0 | Basic SkillGraph, CV/GitHub connection on website, job discovery/applications, tracking on website, basic skill-gap insights |
| Candidate Premium | ৳299/month | Detailed skill analysis, personalized improvement roadmap, advanced practice assessments, enhanced career insights |

- Assumption needing confirmation: Growth/Pay-per-job include the core ranking, weights/thresholds, evidence explanations and hiring dashboard; Premium includes Free features.
- Core profile, job applications and job-specific percentile access stay free; official recruiter-required assessment stays free to candidate.
- Payment never improves score, percentile or hiring rank. Backend enforces entitlements; all billing is web-only.
- Growth active-job cap, Starter assessment meaning, numeric assessment allowances, Pay-per-job period start/expiry behavior, payment provider, tax/VAT/fees/discounts and plan-feature assumptions remain **TBD**.

## 8. End-to-end workflows

**Candidate onboarding → SkillGraph:** landing → Candidate GitHub OAuth → required consent/email verification → website uploads CV and candidate selects GitHub repos with consent → background CV/GitHub ingestion → evidence-linked SkillGraph appears when ready → candidate finds jobs and applies with exact saved CV snapshot.

**Recruiter onboarding:** register/verify email → enter company profile + proof → Admin separately reviews company and recruiter affiliation → while pending, create drafts but publishing is blocked → after approval, publish only if fields and plan permit.

**Job setup / ranking:** recruiter creates job → AI suggests skills → recruiter edits and weights skills (sum 100%) + optional thresholds → config saved/versioned → verified company + entitlements validated → publish → candidate applies → backend calculates deterministic match score and per-skill explanation using stored evidence → recruiter sees authorized ranked applicants.

**Assessment:** recruiter configures questions/count/timers/points/overall duration and assigns invitation → candidate reads web/mobile instructions → candidate launches assessment on mobile, grants camera permission and starts → backend snapshots effective config → mobile delivers questions/timers and five random snapshot opportunities → submit or timeout → answers/events stored → recruiter reviews evidence and records human decision → score/result releases according to policy (policy TBD).

**Percentile / improvement:** candidate has applied to job → backend compares their per-skill results with eligible cohort → if cohort under minimum, show “Not enough applicant data yet” → otherwise show anonymized skill percentile → RAG uses authorized stored evidence to explain gaps and propose concrete next actions.

**Website purchase:** user selects approved plan on website → server creates provider checkout → signed webhook confirms → server activates entitlement idempotently → website reflects state. Mobile does not expose billing/purchase functionality.

## 9. Matching, evidence and AI rules

### SkillGraph/evidence
- Each skill should link to evidence from CV, GitHub source/code/tool results and assessment where available; store analysis timestamp, repository commit/version and rubric version.
- Overall SkillGraph: radar chart + detailed skill list/evidence. The chart is not merely decoration; each skill opens its sources.
- Exact skill score combination/weights for CV vs GitHub/static analysis vs assessment is **TBD** and must be a documented, versioned rubric. Do not double-count repeated CV/GitHub claims as independent proof.
- Distinguish direct tool observations from AI interpretation; label confidence/limitations where useful.

### Deterministic job score
Recruiter chooses skill weights; weights total 100%. Optional minimum thresholds are checked before ranking. Proposed formula:

`Contribution(candidate, skill) = SkillWeight(skill) × CandidateSkillScore(candidate, skill) / HighestEligibleSkillScore(skill)`

`MatchScore(candidate) = sum of contributions across job skills`

When weights are percentage points, score is on 0–100 scale. Handle zero/missing denominator safely. Persist configuration version, thresholds, per-skill contribution and final score. Same candidate inputs, eligible cohort and configuration must produce the same result. A score is job-specific, not a universal measure of the person.

No evidence should be phrased as “Not demonstrated in currently connected evidence,” not “cannot do this skill.” If permitted, explain which threshold failed. Changing eligible cohort may change normalized scores/ranks.

### Percentiles
- Candidate percentile only for jobs they applied to; show per skill relative to eligible applicant cohort.
- Example wording: “Higher than 74% of applicants on this skill,” never “74% more skilled.”
- Never reveal peers’ names, CVs, private scores or rank positions. Minimum cohort size is TBD/configurable; below it, show unavailable/insufficient data.

### RAG / AI evidence explanations
- Authorize user and scope retrieval to current candidate/job and visible evidence before calling AI.
- Retrieve structured evidence and optional stored embeddings; pass bounded context with evidence IDs, file/path/line/commit, source type and limitations.
- Request structured output; backend validates schema, ownership, evidence IDs and source locations before rendering citations.
- Never invent file names/line numbers/commit/permalinks. If evidence is insufficient, say so.
- Do not infer guaranteed candidate authorship from commit/line counts. Do not claim tests prove no bugs/security. AI must not make final hiring or cheating decisions.
- Improvement suggestions should identify the gap, the evidence behind it, a concrete action and what future evidence would demonstrate progress. Never promise a hiring outcome.

## 10. Company verification

Company legitimacy and recruiter affiliation are separately reviewed. Sequence: Recruiter registers/confirms email → submits company details/evidence → request is Pending → Admin checks company evidence and recruiter authorization independently → Admin approves, asks for more info or rejects with reason → only after both pass can a recruiter publish (subject to plan and job validation). Generic email alone is not proof; provide manual alternatives for startups without company domains. Store reviewer, status, evidence references, reasons and timestamps. Badge means the defined TalentGraph review passed, not universal trust or government endorsement. Document types, review SLA and appeals are TBD.

## 11. Proposed technical architecture (implementation context)

- **Candidate web / Recruiter web / Admin web:** Next.js + TypeScript + Tailwind + shadcn/ui.
- **Candidate mobile:** Flutter + Dart; mobile scope described above.
- **API/backend:** Node.js + TypeScript + Express + Prisma + REST; central authentication/RBAC, profiles/evidence, GitHub sync, CV parsing, jobs, applications, scoring, RAG, assessments, verification, billing, notifications and monitoring.
- **Data:** PostgreSQL; pgvector optional for semantic retrieval; private object storage for CVs, verification files and assessment snapshots, with scoped time-limited access.
- **Background work:** n8n + job/status table; Redis/BullMQ optional. Long-running CV/GitHub ingestion, AI analysis, notifications and retries must run outside the request/response path.
- **External providers:** GitHub API/OAuth, email provider, payment provider TBD, AI provider TBD (Gemini or OpenAI behind a provider adapter). Check current cost/quotas/provider docs before implementation.
- Flow: clients → HTTPS/JSON REST API → PostgreSQL/private object storage; providers are called server-side. Clients never connect directly to database/storage credentials or expose AI/provider secrets.
- Keep deterministic matching, permission checks, payment state and final integrity decisions in backend/business logic—not only in prompts or n8n.

### GitHub evidence pipeline
1. Store GitHub provider identity and encrypted/vaulted token reference; least-privilege scope.
2. Candidate explicitly selects repos for analysis.
3. Read repo metadata, languages, README, manifests, file tree, tests/CI and selected source files; capture default branch and commit SHA.
4. Filter vendor/build/generated files, binaries/oversize assets, lockfile noise, environment/secret files; never execute arbitrary repository code on the main backend.
5. Run safe tool analysis where possible; store tool/version/status/findings.
6. AI returns structured evidence and supported locations from bounded snippets.
7. Backend validates repo/commit/path/line range and builds real source links.
8. Normalize skill aliases to canonical taxonomy and link evidence to skills.
9. Save snapshot, changed-file metadata, evidence, analysis version and job status.
10. Manual monthly sync compares snapshots and updates only changed evidence where possible; persist quota counters; retries are idempotent.

### CV pipeline
Validate PDF/DOCX type/size → private storage → background extraction → AI structured fields (skills, technology, education, experience, projects) → normalize taxonomy and source references → save parsed version/evidence → show processing status and allow candidate corrections. Uncertain extraction must never silently become verified fact. Keep submitted CV snapshots immutable.

## 12. Data model and API groups (indicative, not frozen OpenAPI)

**Core entities:** `users`, `candidate_profiles`, `recruiter_profiles`, `companies`, `company_verification_requests`, `recruiter_company_memberships`, `github_connections`, `github_sync_usage`, `repositories`, `repository_snapshots`, `source_files`, `evidence_items`, `skill_taxonomy`, `candidate_skill_results`, `jobs`, `job_skill_requirements`, `applications`, `application_cv_snapshots`, `assessment_templates`, `question_configs`, `assessment_attempts`, `answers`, `assessment_snapshots`, `integrity_events`, `integrity_reviews`, `match_results`, `skill_percentiles`, `ai_explanations`, optional `embeddings`, `notifications`, `plans`, `subscriptions`, `payment_transactions`, `webhook_events`, `background_jobs`, `audit_logs`.

**Key assessment fields:** recruiter-defined question count, per-question `time_limit_seconds` and points, overall duration, fixed snapshot count `5`, config version; attempt stores effective config snapshot, answer/submission state and timestamps.

**REST API groups:**
- `/auth` — Candidate GitHub OAuth/callback; Recruiter account/login; email verification/session/logout.
- `/candidate/profile` — profile, CV upload/select/preferences.
- `/candidate/github` — selected repos, website-initiated quota-checked incremental sync, status and evidence.
- `/candidate/skillgraph` — summaries, skill evidence, applied-job percentiles, recommendations.
- `/jobs` — open job search/details and saved jobs.
- `/applications` — submit with CV snapshot, list/detail/status, withdrawal only if policy allows.
- `/recruiter/companies`, `/recruiter/jobs`, `/recruiter/candidates` — verification, job wizard/weights/assessment config, authorized candidate evaluation, evidence/RAG/pipeline.
- `/assessments` — invitations, instructions/status/results, mobile attempt start/answers/snapshots/submit.
- `/billing`, `/webhooks/payments` — plans/checkout/entitlements and signed idempotent provider events.
- `/admin` — user, verification, moderation, integrity, payment and monitoring operations.
- `/notifications` — list/read state/preferences with role/ownership checks.

Exact methods, DTOs, pagination and OpenAPI schemas must be designed later; these are example groups, not a frozen contract.

## 13. Notifications, background tasks and reliability

**Background jobs:** CV parsing; GitHub sync/analysis; AI skill normalization; job-description skill extraction; RAG answer; application/status email; assessment invitations/deadlines/completion; payment entitlement updates; generic error handling/retry.

Every long task needs status, timestamps, retry count, safe error summary and correlation/job ID. Use bounded exponential backoff for transient provider failures and obey rate limits. Retry must not duplicate applications, payments, sync quota usage or assessment submissions. Provider downtime should not erase cached results. Never log secrets, complete CV payloads or snapshots. Keep notification read state shared across website/mobile.

## 14. Security, privacy, accessibility and quality targets

- Modern password hashing for recruiter credentials; secure session/JWT expiry/refresh; server-side RBAC/resource ownership on every endpoint; prevent IDOR.
- Private CV, verification and snapshot storage; scoped/time-limited links; check access every time; audit sensitive access/actions.
- Protect GitHub OAuth/payment secrets server-side, least-privilege scopes, encrypted transport, configured backups/retention and safe upload validation/content/size checks.
- Do not execute untrusted repository code on main app host; isolate any execution.
- Privacy/Terms explain CV/GitHub processing, code snippets sent to AI, camera snapshots, reviewer access and retention/deletion. MVP does not use NID/document verification or face recognition for identity verification.
- Accessibility: keyboard/focus, contrast, labels, status text plus color, responsive layout, readable tables.
- Proposed—not measured—quality targets: ranked list for 200 applicants under 2 seconds in defined test conditions; 50 API requests/sec under a defined load test; start application within 3 taps from job detail if profile/CV ready. Report real test results; do not claim targets were achieved unless measured.

## 15. MVP scope and build priorities

**P1 — MVP core:** GitHub Candidate auth, recruiter auth, role-based access; profile/CV pipeline; selected-repository GitHub evidence and sync cache; job creation + company verification gate; deterministic weighted ranking; application submission/tracking on website; evidence-grounded RAG; Candidate web + limited Candidate mobile; configurable assessment (count, per-question timers/points, overall time; five snapshot opportunities; mobile-only test); website-only payments if subscription scope is included; background status/retries/notifications.

**P2 — if time allows:** richer interactive SkillGraph, full snapshot/human-review tooling, detailed percentiles, company verification queue, advanced RAG recommendations, advanced filters/side-by-side comparisons and monitoring.

**P3 — stretch:** Team/Agency plans, advanced analytics, bulk invites, ATS/API integration, calendar scheduling, recruiter digests, additional practice assessment features.

Suggested 10-week path: W1 scope freeze; W2 architecture/schema/design/API contracts; W3 auth/RBAC and skeletons; W4 profile/CV/company/jobs/GitHub ingestion; W5 parsing/evidence/SkillGraph data; W6 scoring/ranking/percentiles/job apply; W7 RAG and mobile assessment timer/grading; W8 snapshots/review/verification/payment sandbox/notifications; W9 integration/privacy/load testing; W10 deploy/demo/docs/acceptance.

## 16. Decisions still TBD / assumptions (do not invent)

1. Candidate Premium numeric limits and exact entitlement details beyond listed features.
2. Starter “one assessment” scope; Growth active-job cap; higher assessment limits; exact feature gating/caps for recruiter plans.
3. Payment provider, fees, VAT/tax, refunds/discounts and the Pay-per-job 2-month start/expiry behavior.
4. Minimum applicant cohort size for percentile display.
5. Versioned skill-score rubric and component weights for CV/GitHub/tool/assessment sources.
6. GitHub quota reset/failure counting details. Recommended calendar-month Asia/Dhaka reset; first sync counts; same-job retry should not consume another slot.
7. Accepted company documents/alternatives, review service expectations and appeal rules.
8. Per-question timeout, assessment interruption/network resume, result release and retake policy. Recommendation: per-question timeout advances unanswered; overall timeout submits.
9. Application withdrawal stages; hide withdraw until policy is approved.
10. CV, evidence, snapshot and company-document retention/deletion schedule.
11. Private GitHub repositories: MVP default is selected public repositories unless explicitly approved with consent.
12. Provider choice for AI (Gemini/OpenAI) and payment; validate current docs/costs when implementation begins.

## 17. Page-specific prompt starter for Stitch

Use this starter and replace the bracketed fields each time:

> Use `TALENTGRAPH_STITCH_SOURCE_OF_TRUTH_v1.3.md` as the authoritative global context. Design **[EXACT PAGE NAME + ROUTE]** for **[CANDIDATE WEBSITE / CANDIDATE MOBILE / RECRUITER WEBSITE / ADMIN WEBSITE]** only. Purpose: **[PRIMARY USER GOAL]**. Include the specified page content, key controls and destinations, and the relevant loading/empty/error/success/blocked states from the source file. Use the TalentGraph dual-theme design system. Support Light, Dark and System modes for website pages and keep the screen correct in the selected theme. Use the orange-and-neutral tokens, accessible contrast, clear hierarchy and uncluttered layouts; do not hardcode a single theme. Reuse the global visual language without adding new features or changing navigation/permissions/platform limits. Use only approved prices and label unknown data as unavailable/TBD. Do not design other pages unless needed to show a small contextual component of this page.

## 18. Useful implementation references

- GitHub REST API Git Trees: https://docs.github.com/en/rest/git/trees
- GitHub REST API rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
- Gemini structured output: https://ai.google.dev/gemini-api/docs/structured-output
- Flutter UI: https://docs.flutter.dev/ui
- Flutter Material widgets: https://docs.flutter.dev/ui/widgets/material
- Next.js authentication: https://nextjs.org/docs/app/guides/authentication
- shadcn/ui: https://ui.shadcn.com/docs

These are implementation references, not a legal/security certification. Re-check provider and API documentation during development.
