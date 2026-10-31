# Design tokens (from DESIGN.md, mobile) — use exactly

| Role | Dark (default) | Light |
|---|---|---|
| canvas | #0D0D0F | #FAFAFA |
| surface (cards/sheets) | #19191C | #FFFFFF |
| brand / primary | #D4621A | #D4621A |
| onPrimary (text on CTA) | #18181B | #18181B |
| text | #F5F5F5 | #18181B |
| textSecondary | #A1A1AA | #71717A |
| neutralAccent | #52525B | #52525B |
| border | #3F3F46 | #E4E4E7 |
| destructive | #E5484D | #DC2626 |
| success | #22C55E | #15803D |
| warning | #F59E0B | #B45309 |
| selected / soft | #252528 | #FFF1E8 |
| pressedPrimary | #E47735 | #B94F0B |
| focus | #E47735 | #B94F0B |

## Flutter mapping
- `ColorScheme`: primary=brand, onPrimary=onPrimary, surface=surface, onSurface=text, error=destructive, outline=border, scaffoldBackground=canvas.
- Non-standard roles (success, warning, selected, textSecondary, pressedPrimary, focus) → `ThemeExtension<TgColors>`.
- Build two hand-tuned `ThemeData` (dark, light). Never derive light by inverting dark.

## Type & shape
Inter (bundle as asset; no runtime fetch). Page title 24–28sp · section 18–20 · body 14–16 · helper 12–14. Tabular figures for timers (later).
Spacing base 8dp (4dp inner). Card radius 8–12; inputs/buttons slightly smaller. 1dp borders, no heavy shadows/gradients/glow/glass.
Tap targets ≥48dp. Orange only for primary CTA, selection, focus, tiny evidence cues.
Evidence Trail motif on auth: optional single small orange node + thin rail on A02 progress. Keep it restrained.
