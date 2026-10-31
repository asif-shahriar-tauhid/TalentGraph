# T02 — Design system + theme toggle
Read: `docs/design/tokens.md`.
Do:
1. `app/theme/tg_colors.dart` (`ThemeExtension<TgColors>` incl. lerp/copyWith), `app_theme.dart` with hand-tuned `darkTheme` and `lightTheme` (Material 3, Inter, 8–12dp radii, 1dp borders, 48dp min buttons, visible focus color).
2. `theme_controller.dart`: Riverpod `Notifier<ThemeMode>`; default **dark** when nothing stored; persisted in `shared_preferences`; read before first frame to avoid flash. Never `ThemeMode.system`.
3. `shared/widgets/theme_toggle.dart`: sun/moon icon button, tooltip + semantics = next action.
4. `shared/widgets/primary_button.dart` (loading + disabled states, label wraps) and `state_banner.dart` (icon + text; kinds: info, success, warning, error).
Accept: widget tests — first launch is dark; toggle flips and persists across restart; both themes render buttons/banners with token colors; text scale 2.0 no overflow.
