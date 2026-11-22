import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:talentgraph/app/theme/app_theme.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';
import 'package:talentgraph/app/theme/theme_controller.dart';
import 'package:talentgraph/shared/widgets/primary_button.dart';
import 'package:talentgraph/shared/widgets/state_banner.dart';
import 'package:talentgraph/shared/widgets/theme_toggle.dart';

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  group('ThemeController', () {
    test('defaults to dark when nothing stored', () async {
      final container = ProviderContainer();
      final controller = container.read(themeControllerProvider.notifier);
      await controller.init();
      expect(controller.state, ThemeMode.dark);
      expect(controller.isDark, isTrue);
    });

    test('toggle switches to light', () async {
      final container = ProviderContainer();
      final controller = container.read(themeControllerProvider.notifier);
      await controller.init();
      await controller.toggle();
      expect(controller.state, ThemeMode.light);
      expect(controller.isDark, isFalse);
    });

    test('toggle switches back to dark', () async {
      final container = ProviderContainer();
      final controller = container.read(themeControllerProvider.notifier);
      await controller.init();
      await controller.toggle();
      await controller.toggle();
      expect(controller.state, ThemeMode.dark);
    });

    test('persists light mode across restart', () async {
      final container = ProviderContainer();
      final controller = container.read(themeControllerProvider.notifier);
      await controller.init();
      await controller.toggle();
      expect(controller.state, ThemeMode.light);

      final container2 = ProviderContainer();
      final controller2 = container2.read(themeControllerProvider.notifier);
      await controller2.init();
      expect(controller2.state, ThemeMode.light);
      expect(controller2.isDark, isFalse);
    });

    test('persists dark mode across restart', () async {
      final container = ProviderContainer();
      final controller = container.read(themeControllerProvider.notifier);
      await controller.init();
      expect(controller.state, ThemeMode.dark);

      final container2 = ProviderContainer();
      final controller2 = container2.read(themeControllerProvider.notifier);
      await controller2.init();
      expect(controller2.state, ThemeMode.dark);
    });
  });

  group('ThemeData', () {
    test('darkTheme scaffold background is canvas', () {
      expect(darkTheme.scaffoldBackgroundColor, const Color(0xFF0D0D0F));
    });

    test('lightTheme scaffold background is canvas', () {
      expect(lightTheme.scaffoldBackgroundColor, const Color(0xFFFAFAFA));
    });

    test('darkTheme primary is brand orange', () {
      expect(darkTheme.colorScheme.primary, const Color(0xFFD4621A));
    });

    test('lightTheme primary is brand orange', () {
      expect(lightTheme.colorScheme.primary, const Color(0xFFD4621A));
    });

    test('darkTheme extension tokens match spec', () {
      final tokens = darkTheme.extension<TgColors>()!;
      expect(tokens.canvas, const Color(0xFF0D0D0F));
      expect(tokens.surface, const Color(0xFF19191C));
      expect(tokens.text, const Color(0xFFF5F5F5));
      expect(tokens.border, const Color(0xFF3F3F46));
      expect(tokens.destructive, const Color(0xFFE5484D));
      expect(tokens.success, const Color(0xFF22C55E));
      expect(tokens.warning, const Color(0xFFF59E0B));
      expect(tokens.focus, const Color(0xFFE47735));
    });

    test('lightTheme extension tokens match spec', () {
      final tokens = lightTheme.extension<TgColors>()!;
      expect(tokens.canvas, const Color(0xFFFAFAFA));
      expect(tokens.surface, const Color(0xFFFFFFFF));
      expect(tokens.text, const Color(0xFF18181B));
      expect(tokens.border, const Color(0xFFE4E4E7));
      expect(tokens.destructive, const Color(0xFFDC2626));
      expect(tokens.success, const Color(0xFF15803D));
      expect(tokens.warning, const Color(0xFFB45309));
      expect(tokens.focus, const Color(0xFFB94F0B));
    });
  });

  group('AppearanceToggle widget', () {
    testWidgets('shows sun icon and "Switch to light mode" when dark', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            home: Scaffold(body: const AppearanceToggle()),
          ),
        ),
      );
      expect(find.byIcon(Icons.light_mode), findsOneWidget);
      expect(find.byTooltip('Switch to light mode'), findsOneWidget);
    });

    testWidgets('toggles tooltip after state change', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            home: Scaffold(body: const AppearanceToggle()),
          ),
        ),
      );
      expect(find.byTooltip('Switch to light mode'), findsOneWidget);
      await tester.tap(find.byType(IconButton));
      await tester.pump();
      expect(find.byTooltip('Switch to dark mode'), findsOneWidget);
    });
  });

  group('PrimaryButton widget', () {
    testWidgets('renders ElevatedButton in dark theme', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: Scaffold(
              body: PrimaryButton(label: 'Sign in', onPressed: () {}),
            ),
          ),
        ),
      );
      expect(find.byType(ElevatedButton), findsOneWidget);
    });

    testWidgets('shows loading indicator when loading', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            home: Scaffold(
              body: PrimaryButton(label: 'Loading', loading: true),
            ),
          ),
        ),
      );
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

    testWidgets('is disabled when onPressed is null', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            home: Scaffold(body: PrimaryButton(label: 'Disabled')),
          ),
        ),
      );
      final button = find.byType(ElevatedButton).first;
      expect(tester.widget<ElevatedButton>(button).onPressed, isNull);
    });
  });

  group('StateBanner widget', () {
    testWidgets('renders error banner with error icon', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            home: Scaffold(
              body: StateBanner(
                kind: StateBannerKind.error,
                text: 'Error occurred',
              ),
            ),
          ),
        ),
      );
      expect(find.text('Error occurred'), findsOneWidget);
      expect(find.byIcon(Icons.error_outline), findsOneWidget);
    });

    testWidgets('renders success banner with check icon', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            home: Scaffold(
              body: StateBanner(kind: StateBannerKind.success, text: 'Success'),
            ),
          ),
        ),
      );
      expect(find.text('Success'), findsOneWidget);
      expect(find.byIcon(Icons.check_circle_outline), findsOneWidget);
    });
  });

  group('Text scale 2.0 no overflow', () {
    testWidgets('primary button renders at 2.0 text scale', (
      WidgetTester tester,
    ) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(
            theme: darkTheme,
            builder:
                (context, child) => MediaQuery(
                  data: MediaQuery.of(
                    context,
                  ).copyWith(textScaler: TextScaler.linear(2.0)),
                  child: child!,
                ),
            home: Scaffold(
              body: PrimaryButton(
                label: 'Sign in with GitHub',
                onPressed: () {},
              ),
            ),
          ),
        ),
      );
      expect(find.byType(PrimaryButton), findsOneWidget);
    });
  });
}
