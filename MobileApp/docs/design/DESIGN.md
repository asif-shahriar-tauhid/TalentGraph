# TalentGraph Mobile — DESIGN.md

> Portable visual-system brief for Stitch. This file is a design reference, not an implementation guarantee. The companion product document, **TalentGraph_Mobile_App_Source_of_Truth_v1.0.md**, controls product scope and behavior whenever there is any conflict.

## Product and platform

- **Product:** TalentGraph — evidence-based technical recruitment.
- **Platform:** Candidate-only mobile app; mobile-first, Android/Flutter + Material 3-style interaction patterns.
- **Primary feeling:** calm, precise, trustworthy, focused, human, and unmistakably evidence-led.
- **Core visual concept:** **Evidence Trail** — a restrained visual language of small nodes, thin connector rails, and clear progress cues that helps people understand a journey from a job to an application to an assessment. This is a visual metaphor only; it must not create new product features or imply scores that do not exist.
- **Reference viewport:** Design the initial composition for approximately 393 × 852 px, but reflow cleanly at 320–360 px widths, landscape/short screens, larger system text, and keyboard-open states.
- **Default appearance:** Dark mode on first launch. Light mode is a complete alternative. Do not default to System mode.

## Visual principles

1. **Proof-led, not dashboard-led.** Prioritize the job, next action, assessment state, or notification. Avoid grids of equal-sized metric cards and generic admin-dashboard patterns.
2. **One obvious primary action per screen.** Secondary actions remain visually quieter and do not compete with the main CTA.
3. **A recognizable “Evidence Trail.”** In relevant contexts only, use a small orange node with a fine connector/left rail, understated step markers, or a short progress track. Use it for status/context, not fabricated analytics or an imaginary SkillGraph.
4. **Useful asymmetry.** Use clear editorial hierarchy and grouped information rather than repeating identical cards. Keep alignment and spacing consistent.
5. **Orange has meaning.** Reserve the brand accent for the primary CTA, selected destination, focus/active feedback, and a small number of evidence/progress cues. Do not color every icon, divider, and card orange.
6. **The assessment is a focus environment.** Remove general navigation during the active attempt. Keep the question and answer interaction central, with clearly separated timers and minimal chrome.
7. **Familiar controls; distinctive composition.** Do not make core navigation, filters, buttons, timers, or answer controls experimental or ambiguous.
8. **No invented richness.** Never add fake statistics, match percentages, candidate scores, rankings, testimonials, logos, or unverified verification claims.

## Color tokens

Use these exact values. The dark and light versions must be designed intentionally; do not create Light mode by simply inverting Dark mode.

| Token / role | Dark (default) | Light |
|---|---|---|
| Canvas / app background | `#0D0D0F` | `#FAFAFA` |
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
| Pressed primary reference | `#E47735` | `#B94F0B` |
| Text on brand CTA | `#18181B` | `#18181B` |
| Focus indicator | `#E47735` | `#B94F0B` |

### Color usage rules

- Use the Canvas for the screen background and Elevated Surface for meaningful cards/sheets. Border and spacing—not heavy shadows—should establish grouping.
- Use `#D4621A` primarily for high-value action/selection. Brand buttons use `#18181B` text in both themes.
- Semantic colors always appear with a label and/or meaningful icon. Never use color alone for success, warning, error, or assessment urgency.
- Keep disabled controls visibly disabled without making essential text unreadable.
- Review text contrast and interactive focus in both themes; target WCAG AA-style readable contrast.

## Typography

- Use **Inter** or a visually close sans-serif.
- Use an explicit hierarchy: page title, section title, body, metadata/helper text.
- Suggested mobile scale: page title 24–28 sp; section title 18–20 sp; body 14–16 sp; metadata/helper 12–14 sp. Do not shrink body text to fix overflow.
- Prefer sentence case, concise labels, short paragraphs, and specific action copy.
- Timers use tabular/stable-width numerals where available to prevent layout shift.

## Spacing, shape, and elevation

- Base spacing rhythm: 8 dp; smaller internal steps may use 4 dp.
- Typical card corner radius: 8–12 dp. Inputs and buttons should have consistent, slightly smaller radii than large sheets.
- Use subtle 1 dp borders. Avoid dense shadows, large gradients, glowing edges, glassmorphism, and decorative background blobs.
- Use comfortable touch targets (aim for at least 44–48 dp where practical).
- Respect the status bar, display cutouts, bottom gesture/navigation area, and keyboard insets.

## Shared app shell and navigation

- Only three persistent bottom destinations: **Jobs**, **Assessments**, and **Notifications**.
- A compact top app bar may contain the TalentGraph mark/wordmark, screen title as appropriate, and a quiet sun/moon appearance control on eligible non-assessment screens.
- Do not create Home, Dashboard, Profile, SkillGraph, Applications, Settings, Billing, Recruiter, or Admin destinations.
- Hide bottom navigation during the active timed assessment. Do not place a normal app-wide theme toggle inside the timed question view.
- Use familiar icons with text labels. Avoid icon-only ambiguous primary actions.

## Signature components

### Role Brief card

A job card should read like a concise role brief—not a generic ecommerce or admin tile:

- Role title first, allowed to wrap across lines.
- Company name and verified-company indicator only when the backend says verified.
- One compact metadata row, with metadata wrapping/reflowing rather than clipping.
- A small set of skill chips that wrap naturally to additional lines.
- Save/bookmark control with an accessible label.
- One clear route into job details; do not fabricate match scores or job statistics.

### Evidence Trail marker

- Use an understated orange node and thin connector rail on application/assessment status or process-related contexts.
- Never imply extra steps, assessments, verification, or quantitative evidence beyond actual product data.
- Prefer text labels such as “Invitation received,” “Submitted,” “Result pending,” or the actual backend-provided state rather than unexplained color dots.

### Assessment focus frame

- Preflight is a deliberate checkpoint with rules, question count, overall duration, camera permission explanation, and a clear Start action.
- Active assessment shows one question at a time, `Question i of N`, per-question timer, overall timer, points available, supported answer control, and progress. Timers must be labeled and distinct.
- Keep action placement stable across questions. Long prompts and answer text may scroll, but never cover timers or submit/navigation controls.
- No chart, SkillGraph, dashboard summaries, unrelated links, decorative illustration, visible countdown to camera snapshots, or recruiter tools during an attempt.

### Status and feedback

- Use inline status rows, compact banners, confirmation dialogs, empty states, and retry patterns that match the same component language.
- Distinguish `Submitted`, `Result pending`, and `Integrity review pending` when each state is returned/allowed by the backend.
- Camera or network issues are technical states for review—not automatic cheating verdicts.

## Mandatory text and layout integrity

**No text may overflow its parent, card, control, modal, or screen.** Apply this to every screen and theme, including populated data and error states.

1. Dynamic text containers must grow with their content; never use a fixed height that clips a title, label, prompt, error, or paragraph.
2. Wrap long job titles, company names, notification summaries, button labels, chips, emails, URLs, and unbroken identifiers safely.
3. Skill chips wrap onto subsequent lines. They must never force horizontal scrolling of the whole screen.
4. Do not ellipsize essential instructions, assessment questions, validation errors, legal/rule text, or primary action labels. Only truncate intentionally abbreviated previews, with a way to inspect the full content where needed.
5. Long job descriptions, notifications, rules, and questions use the correct scroll area. Scrolling content must not cover fixed timers, important CTAs, bottom navigation, or system insets.
6. At 320–360 px widths, reflow metadata rows vertically instead of squeezing labels.
7. A long CTA label must wrap or be given enough width; it must not be clipped or extend beyond the button.
8. Dialog/sheet buttons must remain visible and reachable with the keyboard open. If the available height is short, make the dialog content scrollable while preserving the action area.
9. Show the full assessment question. Use internal question scrolling if needed; do not scale the text down to fit a fixed card.
10. Include a final overflow audit of long titles, long company names, five or more skill chips, long questions, long error messages, and large text scale.

## Interaction and motion

- Use subtle, purposeful pressed/selected states and short state transitions; avoid ornamental animation.
- Loading should preserve structure with skeletons or inline progress, not a blank screen.
- Disable duplicate submit taps during an in-flight submission and reflect pending state.
- Ask confirmation before consequential early assessment submission. Do not confirm routine navigation unnecessarily.
- Theme preference is locally remembered. Changing theme must preserve layout, current location, and form state.
- Treat Stitch screens/prototypes as design representations; backend-authoritative behavior still requires implementation.

## Content and trust rules

- Candidate-only mobile app. Candidate sign-in uses GitHub OAuth; no Candidate email/password form, Recruiter/Admin selector, or role switch.
- The app uses already-stored candidate profile/CV data for an application. If a saved CV is missing, direct the candidate to the website rather than building a mobile CV manager.
- GitHub connection management and GitHub sync are website-only.
- Timed assessment is mobile-only. Exactly five random front-camera snapshot opportunities per attempt are fixed, regardless of question count. Never reveal their schedule.
- Per-question timeout, interruption/resume behavior, and result-release rules contain TBDs in the product specification. Show a neutral, honest state; do not invent policy.
- Overall timeout auto-submits. Voluntary early submission requires confirmation.
- Never label camera permission denial, a missed capture, app backgrounding, or network failure as proof of cheating.
- Never show other candidates' names, private scores, rankings, assessment images, or recruiter-only reviewer notes.
- Billing, checkout, payment, profile/CV management, SkillGraph, settings, and full application tracking are website-only.

## Screen patterns covered

Use this design system for: GitHub welcome/sign-in and auth status; Jobs discovery/search/filter/saved states; Job details; application review and server-confirmed outcome; Assessment Center; assessment preflight; active question; early-submit dialog; assessment submitted/result-pending; assessment unavailable/interrupted; Notifications; and honest handoff states for website-only destinations.

## Explicitly avoid

- Generic “SaaS dashboard” with a row of stat tiles.
- Glowing orange borders, neon accents, excessive gradients, glassmorphism, or heavy drop shadows.
- Huge hero art that pushes useful content below the fold.
- Repeated identical cards with no hierarchy.
- Tiny gray body text or icon-only primary controls.
- Fixed-height cards that clip variable content.
- Horizontal overflow used to hide poor responsive layout.
- Fake match percentages, scores, applicant counts, customer logos, or unsupported “verified” claims.
- Extra features invented to make screens feel complete.
