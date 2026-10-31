# TalentGraph Mobile App — Source of Truth

**Version:** 1.0  
**Prepared:** 23 October 2026  
**Product:** TalentGraph — AI-assisted, evidence-based technical recruitment  
**Basis:** *TalentGraph Full Product, Website, Mobile App & Backend Specification v1.3* (19 October 2026), plus the project owner's explicit mobile UI requirements in this conversation.  
**Status:** Design hand-off specification. This file defines the approved mobile-app scope and the constraints a UI generator must preserve. It is not proof that the app or every backend feature has been implemented.

---

## 1. Why this document exists

This is the single reference for designing the **TalentGraph Candidate mobile app** in Stitch. Read it before generating screens. Keep product behavior and permissions intact; create a distinctive, connected mobile experience rather than a collection of generic SaaS templates.

The mobile app's promise is to make three candidate tasks simple and dependable:

1. Discover suitable open technical roles and understand a role before applying.
2. Complete an invited assessment in a focused, mobile-only environment.
3. Stay informed through notifications that stay synchronized with the website.

The app should feel calm, precise, trustworthy, and recognizably TalentGraph. It should not feel like a shrunk desktop dashboard.

## 2. Requirement authority and labels

Use these labels when interpreting this file:

- **LOCKED — PRODUCT:** A behavior or scope boundary from the consolidated product specification. Do not change it in a visual redesign.
- **LOCKED — OWNER:** An explicit design requirement from the project owner, including dark mode as the default and no text overflow.
- **DESIGN DIRECTION:** A proposed visual or interaction treatment. Use it to make the interface distinctive without adding product capability.
- **TBD / CONFIRM BEFORE IMPLEMENTATION:** A behavior the product specification has not finalized. Show the state honestly; do not invent a backend decision.

If a decorative idea conflicts with a locked product rule, the product rule wins. Do not invent routes, scores, data, policies, prices, verification claims, or assessment behavior to make a mockup look complete.

## 3. Mobile app scope

### 3.1 Included in the Candidate mobile app

- Candidate account access using **GitHub OAuth**.
- Required email-verification states where applicable to account/assessment policy.
- Job discovery, search, supported filters, job details, and saving/bookmarking jobs.
- Job application submission using the **already-saved CV/profile snapshot** available to the candidate.
- Assessment Center: invitations, deadlines, instructions, eligibility/status, and results only when released.
- Actual timed assessment, which can start and run **only in the mobile app**.
- Front-camera permission and exactly five random snapshot-capture opportunities during an assessment attempt, subject to device permission/availability.
- Notifications synchronized with the shared backend across website and mobile.
- A Dark/Light appearance switch. Dark is the first-launch default.

### 3.2 Explicitly outside mobile scope

Do **not** create any of these as mobile pages, tabs, dashboard cards, or hidden routes:

- Recruiter or Admin sign-in, dashboards, controls, or role switching.
- Full candidate profile editing or onboarding workspace.
- CV library/management, full CV replacement workflow, or CV parsing management.
- GitHub connection management, repository selection, or GitHub sync controls.
- SkillGraph/radar chart, full evidence explorer, skill-improvement workspace, or skill-percentile comparison.
- Full My Applications tracking workspace or a general application-history dashboard. A mobile notification may show the relevant context, but broader tracking belongs on the website.
- Candidate settings workspace, account-management screens, or a general-purpose settings tab.
- Subscription, plan status, billing, checkout, payment sheets, or card entry. **All purchases and billing are website-only.**
- A website-based timed test, website question-answering flow, or website snapshot capture.

If a mobile action depends on website-only profile/CV management, show clear guidance to continue on the TalentGraph website. Do not silently recreate the website-only feature inside the app.

## 4. Information architecture and navigation

### 4.1 Main app navigation

Use a compact bottom navigation with exactly three primary destinations:

1. **Jobs** — discover, search, filter, save, inspect and apply to jobs.
2. **Assessments** — see invitations, instructions, deadlines, status and released results; open an eligible assessment.
3. **Notifications** — read, filter and mark notifications as read.

The timed assessment is a focused full-screen flow, not a normal tab. Hide the regular bottom navigation during the active attempt so it cannot distract from or accidentally interrupt the assessment. Respect device safe areas.

Do not add Home, Dashboard, Profile, SkillGraph, Applications, Settings, Billing, or Recruiter tabs.

### 4.2 Required screen inventory

| ID | Screen / state | Purpose and required behavior |
|---|---|---|
| A01 | Welcome / GitHub sign-in | Explain the product briefly; Candidate sign-in continues through GitHub OAuth. No Candidate email/password form and no Recruiter/Admin selector. |
| A02 | GitHub authorization / return states | Show loading, success, denied, canceled, or failed connection states. Never expose tokens. |
| A03 | Email verification state | Explain verification status or next step where required. Support invalid/expired link and resend-throttled states if the flow exposes them. |
| J01 | Jobs discovery | Search by job title, company or skill. Provide All Jobs, Recommended and Saved Jobs views; supported filters; clear/reset filters; concise results. |
| J02 | Job details | Full role description, responsibilities, required/preferred skills, eligibility, verified company indicator, location/work arrangement, type/level, deadline, save action and application CTA. |
| J03 | Application review | Show the selected saved CV/profile snapshot and the information that will be submitted. Do not create a mobile CV manager or profile editor. |
| J04 | Application confirmation / failure | On success, show a clear confirmation and any backend-provided application reference/status. Handle closed job, passed deadline, already-applied, missing saved CV, upload/API/server failure without fake success. |
| A04 | Assessment Center | Assessment cards with job/company, invitation date, deadline, configured total question count, overall duration and status. Instructions and released result/feedback where permitted. |
| A05 | Assessment preflight | Confirm job, question count, overall duration, rules, camera permission rationale, identity prerequisites and an unmistakable Start Assessment action. Explain that starting begins a timed attempt. |
| A06 | Active assessment question | One question at a time; question number out of configured total (1–N); per-question timer; overall timer; answer control appropriate to the returned question type; points available; progress indicator. |
| A07 | Assessment time-expired / interruption state | Explain expired question/overall time or connectivity/camera issue. Follow the approved backend policy; do not invent offline/resume guarantees. Overall timeout auto-submits. |
| A08 | Submit confirmation | Before voluntary early submission, summarize that submission ends editing and ask for confirmation. Prevent duplicate submissions visually and rely on server-side protection. |
| A09 | Assessment submitted | Confirm the attempt was submitted. Distinguish submitted, result pending, and integrity review pending. Show score only when the backend's result-release policy allows it. |
| A10 | Assessment unavailable | Explain states such as expired invitation, already-submitted attempt, not eligible, or unavailable attempt using the backend reason. Never show a fake Start button as available. |
| N01 | Notifications list | Shared backend notifications, timestamp, title, concise summary, read/unread state, category filters and Mark all read. |
| N02 | Notification destination handling | Open supported job or assessment destinations. For website-only details, give an honest website handoff; do not imply a full application-tracking module exists in mobile. |
| T01 | Dark/Light appearance control | A small, discoverable appearance toggle in the app bar on appropriate non-assessment screens and on sign-in. Persist the user's selection locally on this device. Do not create a settings workspace. |
| S01 | Global state patterns | Loading/skeleton, empty, no search results, offline/reconnecting, permission denied, access denied, server error, retry and success states as applicable to the above screens. |

This inventory is deliberately limited to mobile scope. Do not add extra pages just because Stitch usually creates them.

## 5. Screen behavior details

### 5.1 GitHub sign-in

- Candidate sign-in is GitHub OAuth only. Never show Candidate email/password fields.
- The app is Candidate-only; never show a role dropdown, Recruiter link, or Admin link.
- Explain why GitHub access is requested. Repository access for evidence analysis requires separate explicit consent; signing in must not imply unlimited repository access.
- Show clear loading, canceled, denied, network-failed and retry states.
- Do not display access tokens or sensitive authorization values.
- Do not claim account verification succeeded until the backend confirms it.

### 5.2 Jobs discovery

- Search supports title, company and skill.
- Views: All Jobs, Recommended, Saved Jobs.
- Filters may include job type, experience level, location/work arrangement, required skills, company and posted date, matching backend capability.
- Job cards include only available data: title, verified-company badge, location/work arrangement, type/level, key skill chips, posting date and concise role summary.
- Recommended jobs use stored candidate/profile/evidence data. Never invent a percentage match or score when the API does not provide one.
- Only active, non-expired and publication-approved jobs are available to apply to.
- Provide clear states for no jobs, no filter matches, network failure, job closed and save/unsave failure.
- The primary action on a job card is to view the role; save/bookmark is secondary.

### 5.3 Job details and application

- Keep the role's most decision-relevant information easy to scan before the user applies.
- Show verified status only when supplied by the platform. A badge is not a guarantee about every aspect of a company.
- The app submits an application using the candidate's existing saved CV/profile snapshot. Profile/CV editing and management remain website-only.
- Before final submission, show which saved CV/profile snapshot is being used and a short review of the submitted information when available.
- If the required saved CV/profile is missing, guide the candidate to the website to complete it. Do not show a fabricated upload manager or pretend the application was submitted.
- Prevent duplicate active applications unless the backend policy explicitly permits re-application.
- Preserve the submitted CV version/reference: later profile edits must not silently change the submitted application record.
- Treat application creation as successful only after server confirmation. Provide a distinct success state and recoverable error state.

### 5.4 Assessment Center

- Show each assessment's relationship to the job/company, invitation/deadline, configured question count, overall duration and actual status.
- The Assessment Center may display instructions and released results, but it must not contain an active timer or answer-entry flow.
- Use distinct labels for invited, eligible, in progress, submitted, expired, result pending and result released only when those states exist in backend data.
- The entry point to an actual attempt opens the mobile-only preflight flow.
- If a web invitation opens on a device with the app installed, deep-link to the correct assessment. If the app is not installed, provide an honest app-install/QR/browser guidance state; never fall back to a website exam.

### 5.5 Timed assessment

**The timed assessment is the highest-priority mobile experience. It must be distraction-minimizing, legible, stable under long text, and clear about time.**

#### Preflight

- Display job title, configured total question count, configured overall duration, rules, camera permission explanation, identity prerequisites and Start confirmation.
- Ask for camera permission in context with a plain-language explanation. Do not request it on every app launch without a product need.
- Explain that a small number of front-camera snapshots may be captured for later human review. Do not promise that camera/device failure will be treated as cheating; it must not be an automatic cheating verdict.
- Do not start a timer until the actual assessment starts according to backend flow.

#### Active question screen

- Render one question at a time. The configured count is variable: show `Question i of N`, never hard-code five questions.
- Show both per-question and overall remaining time as applicable. Give them clear labels; do not rely on color alone to communicate urgency.
- Show points available for the current question, progress through configured questions, and the answer control that matches the supported question type returned by the service.
- Keep the question and answer input visually dominant. Avoid decorative charts, large illustrations, unrelated navigation, or nonessential cards during an attempt.
- Keep key controls stable in position as questions change; long prompts and answers must scroll without covering timers, inputs or buttons.
- Keep timer digits stable in width where possible, so a ticking timer does not cause layout shifts.
- Ask for confirmation before a voluntary early submit. After submission or overall timeout, disable further editing.
- The backend is authoritative for timing and attempt state. The UI must not imply that a client-side timer alone decides the final result.

#### Snapshot rules

- **Exactly five random front-camera snapshot-capture opportunities per attempt**, regardless of the recruiter-configured question count. This is fixed and cannot be changed by question count or recruiter settings.
- Capture opportunities are spread across the configured attempt duration according to backend policy. Do not reveal future snapshot times or add a visible countdown to the next snapshot.
- If camera permission is denied, the camera is unavailable, or a capture is missed, show a neutral technical/permission state where appropriate and record the event according to the backend contract.
- A missed snapshot, camera error, app-background event or network failure is an event for review—not proof of cheating. Never render “Cheater detected” or automatically disqualify the candidate based on such an event.
- The candidate-facing assessment screen does not display private reviewer tools or other candidates' data.

#### Timeouts, network and completion

- **Overall timeout:** auto-submit at total-duration expiry and prevent further edits.
- **Per-question timeout:** the current source specification recommends locking/recording the current response as unanswered if appropriate and advancing. Confirm this policy before implementation; do not silently choose a conflicting behavior.
- **Network loss / resume:** exact offline, local answer preservation, reconnect and resume policy remains to be defined. Design an honest reconnect/error state without promising that an attempt can always resume or that answers are always preserved offline. Do not instruct users to restart the attempt unless the backend explicitly requires it.
- **Result release:** result visibility policy is TBD. Show “Submitted”, “Result pending”, or “Under review” only when supported by current state. A completed submission does not automatically mean a score is released or an integrity review is finished.
- Technical failures must not be presented as a confirmed violation or automatic disqualification.

### 5.6 Notifications

- Notifications come from shared backend records; read/unread changes should sync between website and mobile.
- Include title, short summary, timestamp, category and read/unread state where present.
- Support All, Unread, Applications, Assessments, SkillGraph/GitHub and Account categories only as available in the notification API.
- Provide per-item Mark read and Mark all read. Communicate loading, success and failure.
- Open the corresponding supported mobile destination when available. For website-only content, state that it must be opened on the website instead of creating an unapproved mobile feature.
- Notification copy must not expose recruiter-only private notes, hidden scores, private peer data, tokens or assessment snapshot images.

## 6. Visual identity and theme system

### 6.1 Visual design direction

**Design direction: “Evidence Trail” — calm, focused, proof-led.** This is a visual metaphor, not a new feature.

Build a distinctive visual language around the product idea that a candidate's claims connect to evidence and hiring steps:

- Use restrained orange connector lines, tiny nodes, progress rails or timeline markers in relevant places (for example, application/assessment status). Use them as visual navigation cues—not as a fake skill graph or score visualization.
- Job cards should feel like compact role briefs: strong role title, company trust indicator, a few wrapping skill chips, practical job metadata and one clear next action. Avoid generic piles of equal-sized stat cards.
- Assessment preflight should feel like a deliberate checkpoint; active assessment should become a quiet “focus mode” with only task-critical information.
- Notifications should read like a clean activity stream with clear hierarchy and restrained category indicators.
- Use asymmetric hierarchy and meaningful whitespace where it improves scanning, while keeping components aligned and repeatable. Avoid routine template layouts, oversized hero illustrations, decorative gradients, glassmorphism, glowing borders, excessive shadows and needless animation.
- Keep orange meaningful: primary action, selected/focus/connection cue—not every icon, card and divider.
- Do not invent percentages, charts, logos, testimonials, job statistics or evidence claims to make the design feel rich.

This direction must remain coherent across every screen. Unique does not mean unfamiliar: common controls should remain easy to understand.

### 6.2 Dark mode is the default

**LOCKED — OWNER:** The first launch must use Dark mode by default. The user can switch between Dark and Light. Do not default to System mode or force Light mode.

- Keep the appearance toggle easy to discover but visually quiet (sun/moon control or a compact Dark/Light menu).
- Persist the chosen theme locally on the device. Theme selection is not a reason to add a full Settings page.
- Apply theme tokens consistently to navigation, job cards, chips, fields, dividers, dialogs, bottom sheets, timers, error/loading/empty states and notifications.
- Do not implement theme by merely inverting colors. Check surface separation, text contrast and semantic colors in both modes.

### 6.3 Color tokens

Use the master specification's paired palette. Mobile may apply these tokens to Flutter/Material 3-style components without expanding website scope.

| Token | Dark (default) | Light |
|---|---|---|
| Background | `#0D0D0F` | `#FAFAFA` |
| Elevated surface / card | `#19191C` | `#FFFFFF` |
| Brand / primary | `#D4621A` | `#D4621A` |
| Primary text | `#F5F5F5` | `#18181B` |
| Secondary text | `#A1A1AA` | `#71717A` |
| Neutral accent | `#52525B` | `#52525B` |
| Border / divider | `#3F3F46` | `#E4E4E7` |
| Destructive | `#E5484D` | `#DC2626` |
| Success | `#22C55E` | `#15803D` |
| Warning | `#F59E0B` | `#B45309` |
| Selected / soft surface | `#252528` | `#FFF1E8` |
| Primary pressed/hover reference | `#E47735` | `#B94F0B` |
| Text on brand CTA | `#18181B` | `#18181B` |
| Focus indicator | `#E47735` | `#B94F0B` |

Mobile has no mouse hover, so use appropriate pressed/active feedback rather than drawing hover states as if it were a desktop site. Keep sufficient contrast and visible focus where keyboard/navigation focus applies. Pair semantic colors with text, icons or shapes; never communicate status by color alone.

### 6.4 Typography, shape and spacing

- Use Inter or a clear equivalent sans-serif.
- Use an 8 dp spacing rhythm as a base; cards generally have 8–12 dp corner radius and subtle borders.
- Use a clear type hierarchy: page title, section label, main body, metadata and helper text must be visibly distinct.
- Keep essential body copy comfortably readable. Do not shrink text aggressively to fit a layout.
- Use icons consistently; add labels for unfamiliar or consequential actions.
- Avoid excessive gradients, shadows, decorative chart elements and repeated oversized cards.

## 7. Mandatory layout and text-overflow rules

**LOCKED — OWNER:** No text may visually escape its card, box, divider, modal, screen, or viewport. No overlapping labels, clipped controls, broken chips or content hidden under the bottom navigation.

These rules apply to every generated screen, including error messages, dialogs, long job titles and assessment questions:

1. **Wrap by default.** Titles, company names, descriptions, notification copy, form labels and button labels must wrap when needed. Use ellipsis only for intentionally abbreviated preview text, never to hide essential instructions or assessment questions.
2. **No fixed-height text containers.** Let cards, list rows, dialogs and content sections grow with their content. Use fixed dimensions only for controls whose content is reliably bounded, such as a standard icon button.
3. **Long tokens must break safely.** Long URLs, IDs, emails, unbroken strings and unusually long words must not force horizontal overflow. Wrap or present a deliberate, readable truncation with a way to inspect the full value where required.
4. **Skill chips wrap onto another line.** Never let tags overflow the card or compress into unreadable text.
5. **Scrollable long content.** Long job descriptions, assessment prompts, legal/rule text and notification detail must scroll within the intended page area. Do not allow them to cover the CTA, timers or navigation.
6. **Preserve question text.** Never truncate an assessment question or answer option merely to fit above the fold. Make the content area scroll while keeping essential timer/progress and answer/submit controls reachable.
7. **Safe areas and keyboard.** Respect top/bottom insets, device cutouts and the on-screen keyboard. Inputs and their validation messages must remain visible when the keyboard opens. Sticky bottom CTAs must not overlap with the keyboard or system gesture area.
8. **Responsive widths.** Design and test narrow Android/iOS screens, at minimum around 320, 360 and 390 logical pixels. Do not assume all phones have the same aspect ratio.
9. **Text scaling.** Allow larger system font settings without clipping, hiding essential content or breaking buttons. Reflow layouts rather than forcing all text into one line.
10. **Buttons and touch targets.** Keep interactive targets comfortably tappable (aim for at least 48 × 48 dp where practical). Long button labels should wrap or cause the layout to reflow; never bleed into neighboring controls.
11. **No forced horizontal scrolling** for ordinary page content. If a data pattern truly requires horizontal movement, replace it with a mobile-friendly stacked layout where possible.
12. **No hidden overflow at component boundaries.** A clipped decoration may be intentional; clipped text, input value, error text, labels or assessment content is never acceptable.
13. **Card consistency.** Cards in the same list should align, but must be allowed to grow when content length differs. Do not enforce equal fixed heights for variable copy.
14. **Status spacing.** Long status labels such as “Awaiting result release” or “Camera permission unavailable” must wrap and remain paired with an explanatory label/icon.
15. **Validate after content insertion.** Do not judge layout only with short placeholder strings; test realistic long titles, multi-line requirements, long company names, long notification summaries and the longest assessment prompt supplied by the test data.

If there is a conflict between a compact visual and legible content, choose legible content and a scroll/reflow strategy.

## 8. Accessibility and understandable states

- Aim for WCAG AA-style text contrast across both themes.
- Do not use color alone for status, timers or validation. Add meaningful labels/icons and text.
- Use descriptive control labels, clear focus states and sensible reading order.
- Make timers readable without color cues alone; urgency can use wording/icon/state changes as appropriate.
- Show progress/loading states when requests take time, and prevent duplicate submit taps while processing.
- Every important flow needs relevant loading, success, empty, error, retry and unavailable states. Do not draw a failure as a success state.
- Confirmation is needed for consequential actions such as submitting an assessment early; routine navigation should not have unnecessary confirmation dialogs.
- Preserve user-entered data after ordinary validation errors whenever the backend/flow permits it.
- Do not claim a match guarantees an interview or job. Do not state that missing evidence proves a candidate lacks a skill.

## 9. Shared data, security and privacy constraints

- Website and mobile use the same backend application, assessment and notification records. A successful change to read state should be reflected across platforms.
- All access control is enforced by the backend. Hiding a control is not authorization.
- A candidate can see their own permitted data only. Never show other applicants' names, private scores or ranking lists.
- Do not put private CV contents, assessment snapshots, OAuth tokens or sensitive reviewer notes into ordinary notifications.
- Assessment snapshots are private, authorized evidence for human review. Do not show recruiter review tools in the candidate app.
- AI supports evidence-based evaluation; it does not make a final cheating determination or hiring decision.
- A camera/app/network event is evidence requiring context and human review, not a verdict.
- Never fabricate application or assessment status. Use backend-provided state; otherwise show a neutral unknown/loading/error state.

## 10. Interaction and transition map

Use these core paths to keep the experience connected:

### Sign-in
`Welcome → Continue with GitHub → OAuth status/callback → email verification state if required → Jobs`

### Find and apply
`Jobs → Search / filter / save → Job details → Review saved CV/profile snapshot → Submit → Server-confirmed success or recoverable error`

### Assessment
`Assessments → Invitation details/instructions → Preflight and camera explanation → Start → One-question-at-a-time flow → Voluntary confirmation or overall-time auto-submit → Submitted state → Result only when released`

### Notifications
`Notifications → Filter/read state → Open supported job or assessment destination / honest website handoff for a website-only destination`

Do not create a separate mobile dashboard as a gateway to these tasks. A signed-in candidate should be able to land directly on Jobs, while assessment/notification links should deep-link to the relevant screen when available.

## 11. Empty, error and edge-case checklist

Design appropriate screens or component states for all applicable cases:

- GitHub OAuth canceled, denied, failed or network unavailable.
- Email verification pending, expired or failed where relevant.
- No jobs, no Recommended jobs, no Saved Jobs and no search/filter results.
- Job closed, deadline passed, company/job no longer available or application already submitted.
- Saved CV/profile missing; show website guidance instead of an invented mobile CV manager.
- Application submission pending, succeeded, timed out or failed.
- No assessment invitations, assessment expired, ineligible, already submitted or unavailable.
- Camera permission not granted, camera unavailable or snapshot capture missed.
- Per-question timer expiry; overall timer expiry and auto-submit.
- Network disconnected/reconnecting during assessment; exact resume behavior remains TBD.
- Submit request pending, duplicate tap blocked, submission failed or submitted confirmation.
- Result pending release; result released; integrity review pending if applicable.
- No notifications, unread filter empty, mark-read failure and stale/closed destination.
- Dark and Light theme for every state—not only the happy-path screen.

Do not add an edge-case route unless needed; many states can appear as well-designed banners, dialogs or inline messages on the existing screen.

## 12. Stitch generation guardrails

When this file is supplied to Stitch, the instructions must require all of the following:

- Read and follow this source of truth before generating any UI.
- Generate the connected mobile app, not a promotional landing page and not the website.
- Generate only the listed mobile routes and states; do not invent profile, SkillGraph, billing, settings, Recruiter or Admin screens.
- Use the TalentGraph “Evidence Trail” direction consistently without copying a generic dashboard template.
- Default to Dark mode; provide a complete Light alternative with the exact palette tokens in this file.
- Keep bottom navigation limited to Jobs, Assessments and Notifications; use a dedicated full-screen assessment flow.
- Use realistic but clearly fictional sample content only where sample data is needed, and never fabricate scores, analytics, claims or backend status.
- Follow every layout/text-overflow rule in Section 7. Long content must wrap, reflow or scroll—never spill out of a box or screen.
- Preserve the assessment's variable question count and per-question/overall timer distinction. Exactly five random snapshot opportunities are fixed, independent of question count; do not reveal their schedule or treat technical failures as cheating.
- Show only score/results that are allowed by the result-release policy; do not invent the TBD policy.
- Include realistic loading, empty, error, unavailable, permission-denied, submit-pending and success states for key flows.
- Keep components, spacing, typography, navigation, status labels and controls consistent across all screens.
- Do not omit screens in the required inventory just because the first generation is limited; generate and review in manageable batches.

## 13. Acceptance checklist for the generated design

A design is not ready for implementation hand-off until each applicable item below passes:

### Scope and navigation
- [ ] Candidate-only GitHub OAuth access; no Recruiter/Admin mobile entry.
- [ ] Bottom navigation has Jobs, Assessments and Notifications only.
- [ ] Profile/CV management, GitHub sync, SkillGraph, settings, application-history workspace and billing are not implemented as mobile features.
- [ ] Timed assessment begins only in mobile and runs as a focused full-screen flow.
- [ ] Deep links and notification destinations lead to valid mobile screens or explain a website handoff.

### Themes and visual consistency
- [ ] Dark is the first-launch default.
- [ ] Light mode uses the paired palette, not inverted dark colors.
- [ ] Theme choice remains consistent across dialogs, cards, navigation, forms, errors, loading/empty states and the assessment.
- [ ] Orange is used deliberately and status meaning does not depend on color alone.
- [ ] The Evidence Trail visual motif is consistent and does not add fake score/graph functionality.

### Assessment correctness
- [ ] Question count is variable and displayed as `i of N`.
- [ ] Per-question timer and overall timer are clearly distinct.
- [ ] Current question, points available, progress and supported answer control are visible.
- [ ] There are exactly five random snapshot opportunities per attempt, independent of question count; the schedule is not exposed.
- [ ] Overall timeout auto-submits; voluntary early submit asks for confirmation.
- [ ] Camera/network events do not automatically label the candidate as cheating.
- [ ] Results appear only when released; submitted/result-pending/review-pending are distinct states.
- [ ] Unconfirmed timeout and reconnect/resume behaviors are not invented as final policy.

### Layout quality
- [ ] No text, labels, chips, buttons, timers or inputs overflow their containers.
- [ ] Long job titles, company names, summaries, links, validation errors and assessment prompts wrap/reflow/scroll correctly.
- [ ] No fixed-height dynamic text boxes clip content.
- [ ] Keyboard, safe-area insets and bottom navigation do not cover fields or actions.
- [ ] Narrow widths and larger font scales remain usable.
- [ ] Empty/error/loading/retry/success states have the same layout quality as populated states.

### Trust and data
- [ ] No fabricated scores, job statistics, verification claims or results.
- [ ] Application success is shown only after server confirmation.
- [ ] Candidate private data and recruiter-only review content are not exposed in notifications or general app screens.
- [ ] Website-only tasks are redirected honestly rather than silently recreated in mobile.

---

## 14. Source crosswalk and known TBDs

This mobile specification extracts and narrows the following areas of the master product specification: locked platform boundaries; the shared design palette and global UX rules; Candidate mobile routes; Candidate job discovery/details/application behavior; Assessment Center and mobile-only timed assessment; notifications; assessment configuration and snapshots; security/privacy; and acceptance criteria.

Items that remain TBD in the master specification and must not be guessed in the UI include:

- Exact minimum/maximum question-count bounds.
- Final per-question timer-expiry behavior (lock unanswered response and advance is a recommendation to confirm).
- Offline answer persistence, assessment interruption and resume policy.
- Exact assessment result-release policy.
- Any result/integrity review states not yet exposed by the backend contract.

**Final principle:** make TalentGraph distinctive through clear evidence-led hierarchy, purposeful transitions, strong assessment focus and flawless small-screen layout—not through extra features or decoration.
