# Text & layout integrity (owner-locked: no text may overflow)

- Dynamic text wraps. No fixed `height` on containers holding text; use `minHeight` constraints.
- No `maxLines`/ellipsis on titles, errors, instructions, rules or button labels (only deliberate previews with a way to see the full text).
- Text in rows → `Expanded`/`Flexible`. Chips/metadata → `Wrap`. Long emails/URLs/IDs must not widen the screen.
- Screens: `SafeArea` + scroll view; primary CTA stays reachable with the keyboard open.
- Never override or clamp `textScaler`. Must survive 2.0× text scale and 320dp width.
- Buttons use `minimumSize`, never a fixed size; long labels wrap.
- Dialogs/sheets: scrollable content, always-visible action row.
- Loading/error/denied/offline states meet the same layout standard as the happy path, in BOTH themes.
