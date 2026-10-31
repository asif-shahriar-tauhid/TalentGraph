---
name: Evidence Trail
colors:
  surface: '#12131a'
  surface-dim: '#12131a'
  surface-bright: '#383841'
  surface-container-lowest: '#0d0e15'
  surface-container-low: '#1a1b23'
  surface-container: '#1e1f27'
  surface-container-high: '#292931'
  surface-container-highest: '#34343c'
  on-surface: '#e3e1ec'
  on-surface-variant: '#dec0b3'
  inverse-surface: '#e3e1ec'
  inverse-on-surface: '#2f3038'
  outline: '#a68b7f'
  outline-variant: '#574238'
  surface-tint: '#ffb691'
  primary: '#ffb691'
  on-primary: '#552000'
  primary-container: '#e56f27'
  on-primary-container: '#4b1b00'
  inverse-primary: '#9f4200'
  secondary: '#c8c6c9'
  on-secondary: '#303033'
  secondary-container: '#47464a'
  on-secondary-container: '#b6b4b8'
  tertiary: '#ffb690'
  on-tertiary: '#542100'
  tertiary-container: '#df7331'
  on-tertiary-container: '#4a1c00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb691'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#793100'
  secondary-fixed: '#e4e1e5'
  secondary-fixed-dim: '#c8c6c9'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#331100'
  on-tertiary-fixed-variant: '#783200'
  background: '#0D0D0F'
  on-background: '#e3e1ec'
  surface-variant: '#34343c'
  surface-elevated: '#19191C'
  text-primary: '#F5F5F5'
  text-secondary: '#A1A1AA'
  border-divider: '#3F3F46'
  destructive: '#E5484D'
  success: '#22C55E'
  warning: '#F59E0B'
  cta-text: '#18181B'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  metadata:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  timer-display:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1rem
  margin-compact: 0.75rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system defines an honest, rigorous, and technical candidate-only mobile workspace tailored for technical evaluations and high-signal job discovery. Its core visual personality centers on the "Evidence Trail"—a restrained metaphor of fine directional rails, precise connection nodes, and editorial role briefs.

The aesthetic blends structural minimalism with editorial precision. Rather than employing generic SaaS dashboards, artificial metrics, or gamified skill radars, the interface functions as a trusted diagnostic tool. Visual ornamentation is stripped away: there are no glowing borders, no glassmorphic blurs, and no skeuomorphic gradients. The default environment is deeply focused dark mode, engineered to reduce cognitive strain during intensive timed assessments and technical screenings. Every visual element exists to establish hierarchy, communicate progress, and guarantee clarity.

## Colors

The palette establishes high semantic rigor with strict contrast boundaries. The brand orange (`#D4621A`) is an intentional signal color reserved for high-value user actions, active step progress, and primary interactive states. It must never be applied indiscriminately to decorative backdrops or card borders.

### Usage Guidelines

- **Brand Primary (`#D4621A`)**: Dedicated to primary filled buttons, key progress nodes, and active tab indicators. Buttons filled with brand primary must use `cta-text` (`#18181B`) for text and icons to guarantee maximum contrast.
- **Canvas (`#0D0D0F`) & Elevated Surface (`#19191C`)**: The screen backdrop uses the pitch-black base, while cards, modals, and bottom sheets use the elevated container tier. Grouping is created through planar contrast and 1px hairline borders (`#3F3F46`), never drop shadows.
- **Text Layers**: High-emphasis editorial titles, questions, and active labels rely on `text-primary` (`#F5F5F5`). Secondary metadata, tags, and helper copy utilize `text-secondary` (`#A1A1AA`).
- **Semantic Feedback**: System states rely on dedicated semantic tokens (`#22C55E` success, `#F59E0B` warning, `#E5484D` destructive). Semantic colors must never appear unaccompanied; they must pair with a clear label or assistive icon to preserve accessibility.

## Typography

Typography is set exclusively in **Inter** to maintain architectural clarity, neutral tone, and optimal legibility across varying pixel densities.

### Rules & Text Resilience

- **Anti-Overflow Mandate**: Text containers must grow vertically with their contents. Fixed-height text boundaries and premature clipping are prohibited.
- **Timer Numerals**: Timed assessment modules must invoke `font-variant-numeric: tabular-nums` (monospaced numbers) across all `timer-display` outputs. This prevents character width fluctuations and layout shifts during active count-downs.
- **Hierarchy Structure**: Keep copy crisp and sentence-cased. Large headings are reserved for screen titles and critical assessment prompts, transitioning gracefully to `display-lg-mobile` on viewports below 360dp.

## Layout & Spacing

Layout geometry follows an 8dp baseline grid, supported by a 4dp sub-unit for fine alignments, chip insets, and connector rail offsets.

### Viewport & Boundaries

- **Standard Grid**: Single-column fluid stack tailored for mobile viewports between 320dp and 428dp. Side padding maintains a strict 16px (`margin`), contracting to 12px (`margin-compact`) on viewports under 360dp.
- **Safe Area Insets**: Floating action docks and bottom tab bars must explicitly offset hardware chin notches and gesture bars, reserving a baseline padding of at least 16px clear of the device home indicator.
- **Touch Ergonomics**: All interactive elements (chips, check controls, button surfaces, navigation tabs) require a minimum touch target area of 48×48dp.

## Elevation & Depth

Visual depth is achieved strictly through planar stacking and hairline borders rather than heavy shadows or blurred textures.

### Layering Architecture

1. **Canvas (Base Level)**: The foundational screen surface rendered in `#0D0D0F`.
2. **Elevated Surface (Cards & Inputs)**: Rendered in `#19191C` with a crisp 1px perimeter border in `#3F3F46`. This establishes boundaries without creating muddy shadow halos.
3. **Modal Sheets & Overlays**: Modals and confirmation bottom sheets float on an elevated container layer with a flat 40% backdrop scrim (`#00000066`), framed by a 1px `#3F3F46` border.
4. **The Evidence Trail Motif**: Progress rails are rendered using a 1px or 2px vertical guide (`#3F3F46`) punctuated by a small 6px solid circular node (`#D4621A`). Completed nodes remain solid, pending nodes show as hollow outlines with a 1.5px border, and disabled tracks remain muted in `#52525B`.

## Shapes

The design system uses a balanced, controlled corner radius standard. Radii stay structured and architectural rather than hyper-rounded or bubbly.

- **Cards & Surfaces (`rounded-lg`)**: Structural elements, role brief cards, and modal sheets utilize 12px (0.75rem–1rem) rounded corners.
- **Interactive Controls & Inputs (`rounded-md`)**: Buttons, text input fields, and dialog panels use an 8px (0.5rem) radius to feel sturdy and precise.
- **Chips & Tags**: Skill tags and inline status badges utilize a compact 6px–8px radius, ensuring multi-line wrapped layouts maintain tidy grid lines without pill-shape bloat.

## Components

### Buttons
- **Primary CTA**: Filled background in `#D4621A`, text/icon in `#18181B` (`label-md`), 8px border radius, 48px minimum height. Active/pressed state uses `#E47735`.
- **Secondary / Outline**: Surface `#19191C`, border 1px solid `#3F3F46`, text `#F5F5F5`. Pressed state transitions surface to `#252528`.
- **Destructive**: Base outline with `#E5484D` border and label, or filled with `#E5484D` and white text for confirmed terminal actions.

### Role Brief Cards
- Structural layout: Role title (`headline-sm`, wrapping naturally without truncation), followed by verified company badge (inline `#22C55E` indicator paired with company name).
- Compact metadata row (`metadata`, `#A1A1AA`) displaying location, work arrangement, and timing.
- Auto-wrapping skill chips positioned at the bottom of the card with an 8px element gap (`space-xs`).
- Bounded inside `#19191C` with a 1px `#3F3F46` border and 16px internal padding.

### Chips & Badges
- **Skill Chips**: Background `#252528`, 1px border `#3F3F46`, typography `label-sm` (`#F5F5F5`). Container wraps across lines without horizontal clipping.
- **Status Badges**: Subdued semantic backgrounds (e.g. `#22C55E1A` for verified/completed) paired with an explicit semantic label and an icon. Never use standalone colored dots.

### Input Fields
- Container height 48px, background `#19191C`, border 1px solid `#3F3F46`, text `#F5F5F5`.
- Focus state applies a 1.5px outline in `#E47735` with no diffuse glow.
- Helper and validation error labels sit below the input container in `body-sm`, wrapping freely.

### Navigation Shell
- **Bottom Navigation**: Persistent bar fixed across non-assessment screens containing strictly 3 destinations: **Jobs**, **Assessments**, and **Notifications**. Background `#19191C`, 1px top border `#3F3F46`. Active tab icon and label use `#D4621A`; inactive tabs use `#A1A1AA`.
- **Assessment Workspace Isolation**: During an active question session, bottom navigation is removed entirely from the viewport hierarchy, reserving full screen real estate for the question prompt, answer controls, fixed timers, and bottom submission actions.