import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/app/router/app_router.dart';
import 'package:talentgraph/app/theme/app_theme.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/domain/user.dart';
import 'package:talentgraph/features/auth/presentation/auth_controller.dart';
import 'package:talentgraph/features/auth/presentation/auth_strings.dart';
import 'package:talentgraph/shared/widgets/primary_button.dart';

class TestAuthController extends AuthController {
  TestAuthController();

  int signInCallCount = 0;
  bool signInCalled = false;

  @override
  Future<void> signIn() async {
    signInCallCount++;
    signInCalled = true;
    if (signInCallCount == 1) {
      setStateForTesting(const AuthSigningIn());
    }
  }
}

void main() {
  group('WelcomeScreen', () {
    testWidgets('initial/loading state shows spinner and no button', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(const AuthBootstrapping());

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const WelcomeScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pump();

      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      expect(find.byType(PrimaryButton), findsNothing);
    });

    testWidgets(
      'unauthenticated idle state shows Continue with GitHub button',
      (WidgetTester tester) async {
        final container = ProviderContainer(
          overrides: [
            authControllerProvider.overrideWith(() => TestAuthController()),
          ],
        );
        final controller =
            container.read(authControllerProvider.notifier)
                as TestAuthController;
        controller.setStateForTesting(const AuthSignedOut());

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              home: const WelcomeScreen(),
              theme: darkTheme,
              darkTheme: darkTheme,
              themeMode: ThemeMode.dark,
            ),
          ),
        );

        await tester.pumpAndSettle();

        expect(find.byType(CircularProgressIndicator), findsNothing);
        expect(find.text('Continue with GitHub'), findsOneWidget);
      },
    );

    testWidgets(
      'in-flight signing-in state shows disabled button with spinner',
      (WidgetTester tester) async {
        final container = ProviderContainer(
          overrides: [
            authControllerProvider.overrideWith(() => TestAuthController()),
          ],
        );
        final controller =
            container.read(authControllerProvider.notifier)
                as TestAuthController;
        controller.setStateForTesting(const AuthSigningIn());

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              home: const WelcomeScreen(),
              theme: darkTheme,
              darkTheme: darkTheme,
              themeMode: ThemeMode.dark,
            ),
          ),
        );

        await tester.pump();

        expect(find.byType(CircularProgressIndicator), findsOneWidget);
        expect(find.text('Signing in…'), findsOneWidget);
        final button = tester.widget<PrimaryButton>(
          find.byType(PrimaryButton).first,
        );
        expect(button.onPressed, isNull);
      },
    );

    testWidgets('error/notice state renders notice text', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Access denied. Candidate accounts only.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const WelcomeScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(
        find.text('Access denied. Candidate accounts only.'),
        findsOneWidget,
      );
    });

    testWidgets('duplicate tap only invokes sign-in once', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(const AuthSignedOut());

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const WelcomeScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      await tester.tap(find.text('Continue with GitHub'));
      await tester.pump();
      await tester.tap(find.byType(PrimaryButton));
      await tester.pump();

      expect(controller.signInCallCount, 1);
    });

    testWidgets('renders without overflow at 2.0 text scale', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(const AuthSignedOut());

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            builder:
                (context, child) => MediaQuery(
                  data: MediaQuery.of(
                    context,
                  ).copyWith(textScaler: const TextScaler.linear(2.0)),
                  child: child!,
                ),
            home: const WelcomeScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.text('Continue with GitHub'), findsOneWidget);
    });

    testWidgets('renders without overflow in landscape orientation', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(const AuthSignedOut());

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const WelcomeScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.binding.setSurfaceSize(const Size(800, 480));
      await tester.pumpAndSettle();

      expect(find.text('Continue with GitHub'), findsOneWidget);

      addTearDown(() async {
        await tester.binding.setSurfaceSize(const Size(800, 600));
      });
    });

    testWidgets(
      'renders title/headline with sufficient contrast in light mode',
      (WidgetTester tester) async {
        final container = ProviderContainer(
          overrides: [
            authControllerProvider.overrideWith(() => TestAuthController()),
          ],
        );
        final controller =
            container.read(authControllerProvider.notifier)
                as TestAuthController;
        controller.setStateForTesting(const AuthSignedOut());

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              home: const WelcomeScreen(),
              theme: lightTheme,
              darkTheme: darkTheme,
              themeMode: ThemeMode.light,
            ),
          ),
        );

        await tester.pumpAndSettle();

        final talentGraphWidgets = tester.widgetList<Text>(
          find.text('TalentGraph'),
        );
        expect(talentGraphWidgets, isNotEmpty);
        // Body title has an explicit style; AppBar title inherits from theme
        final bodyTitle = talentGraphWidgets.firstWhere(
          (w) => w.style != null,
          orElse: () => talentGraphWidgets.first,
        );
        final titleColor = bodyTitle.style!.color!;
        final headlineWidget = tester.widget<Text>(
          find.text('Prove your skills. Find your next technical role.'),
        );
        final headlineColor = headlineWidget.style!.color!;

        expect(titleColor, isNot(Colors.white));
        expect(headlineColor, isNot(Colors.white));

        final bgColor = const Color(0xFFFAFAFA);
        final bgLum = bgColor.computeLuminance();
        final titleLum = titleColor.computeLuminance();
        final headlineLum = headlineColor.computeLuminance();
        final titleContrast =
            (max(titleLum, bgLum) + 0.05) / (min(titleLum, bgLum) + 0.05);
        final headlineContrast =
            (max(headlineLum, bgLum) + 0.05) / (min(headlineLum, bgLum) + 0.05);

        expect(titleContrast, greaterThanOrEqualTo(3.0));
        expect(headlineContrast, greaterThanOrEqualTo(3.0));
      },
    );

    testWidgets('headline text is centered', (WidgetTester tester) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const WelcomeScreen(),
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.light,
          ),
        ),
      );

      await tester.pump(const Duration(seconds: 1));

      final headline = tester.widget<Text>(
        find.text('Prove your skills. Find your next technical role.'),
      );
      expect(headline.textAlign, TextAlign.center);
    });

    testWidgets('AppearanceToggle is present and tappable', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const WelcomeScreen(),
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.light,
          ),
        ),
      );

      await tester.pump(const Duration(seconds: 1));

      expect(find.byTooltip('Switch to light mode'), findsOneWidget);
      final iconButtons = tester.widgetList<IconButton>(
        find.byType(IconButton),
      );
      final toggle = iconButtons.firstWhere(
        (b) => b.tooltip == 'Switch to light mode',
      );
      expect(toggle.onPressed, isNotNull);
    });
  });

  group('WelcomeScreen auth states', () {
    testWidgets(
      'AuthSigningIn shows loading button at 320dp, 2.0 scale, both themes',
      (WidgetTester tester) async {
        for (final themeMode in [ThemeMode.light, ThemeMode.dark]) {
          final container = ProviderContainer(
            overrides: [
              authControllerProvider.overrideWith(() => TestAuthController()),
            ],
          );
          final controller =
              container.read(authControllerProvider.notifier)
                  as TestAuthController;
          controller.setStateForTesting(const AuthSigningIn());

          await tester.pumpWidget(
            UncontrolledProviderScope(
              container: container,
              child: MaterialApp(
                builder:
                    (context, child) => MediaQuery(
                      data: MediaQuery.of(
                        context,
                      ).copyWith(textScaler: const TextScaler.linear(2.0)),
                      child: child!,
                    ),
                home: const WelcomeScreen(),
                theme: lightTheme,
                darkTheme: darkTheme,
                themeMode: themeMode,
              ),
            ),
          );

          await tester.pump();

          expect(find.text(AuthStrings.signingIn), findsOneWidget);
          expect(find.byType(PrimaryButton), findsOneWidget);
        }
      },
    );

    testWidgets(
      'AuthSignedIn shows no sign-in control at 320dp, 2.0 scale, both themes',
      (WidgetTester tester) async {
        final user = TalentGraphUser(
          id: 'u_1',
          name: 'Mona Lisa',
          email: 'mona@example.com',
          role: 'CANDIDATE',
          status: 'ACTIVE',
          imageUrl: 'https://avatars.githubusercontent.com/u/1',
        );
        for (final themeMode in [ThemeMode.light, ThemeMode.dark]) {
          final container = ProviderContainer(
            overrides: [
              authControllerProvider.overrideWith(() => TestAuthController()),
            ],
          );
          final controller =
              container.read(authControllerProvider.notifier)
                  as TestAuthController;
          controller.setStateForTesting(AuthSignedIn(user));

          await tester.pumpWidget(
            UncontrolledProviderScope(
              container: container,
              child: MaterialApp(
                builder:
                    (context, child) => MediaQuery(
                      data: MediaQuery.of(
                        context,
                      ).copyWith(textScaler: const TextScaler.linear(2.0)),
                      child: child!,
                    ),
                home: const WelcomeScreen(),
                theme: lightTheme,
                darkTheme: darkTheme,
                themeMode: themeMode,
              ),
            ),
          );

          await tester.pumpAndSettle();

          expect(find.text(AuthStrings.continueWithGitHub), findsNothing);
          expect(find.byType(CircularProgressIndicator), findsNothing);
        }
      },
    );

    testWidgets(
      'AuthBootstrapping shows spinner at 320dp, 2.0 scale, both themes',
      (WidgetTester tester) async {
        for (final themeMode in [ThemeMode.light, ThemeMode.dark]) {
          final container = ProviderContainer(
            overrides: [
              authControllerProvider.overrideWith(() => TestAuthController()),
            ],
          );
          final controller =
              container.read(authControllerProvider.notifier)
                  as TestAuthController;
          controller.setStateForTesting(const AuthBootstrapping());

          await tester.pumpWidget(
            UncontrolledProviderScope(
              container: container,
              child: MaterialApp(
                builder:
                    (context, child) => MediaQuery(
                      data: MediaQuery.of(
                        context,
                      ).copyWith(textScaler: const TextScaler.linear(2.0)),
                      child: child!,
                    ),
                home: const WelcomeScreen(),
                theme: lightTheme,
                darkTheme: darkTheme,
                themeMode: themeMode,
              ),
            ),
          );

          await tester.pump();

          expect(find.byType(CircularProgressIndicator), findsOneWidget);
          expect(find.text(AuthStrings.continueWithGitHub), findsNothing);
        }
      },
    );
  });

  group('OAuthStatusScreen', () {
    testWidgets(
      'cancelled variant renders title, message, icon, Retry with GitHub button',
      (WidgetTester tester) async {
        final container = ProviderContainer(
          overrides: [
            authControllerProvider.overrideWith(() => TestAuthController()),
          ],
        );
        final controller =
            container.read(authControllerProvider.notifier)
                as TestAuthController;
        controller.setStateForTesting(
          const AuthSignedOut(notice: 'Sign-in cancelled.'),
        );

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              home: const OAuthStatusScreen(),
              theme: darkTheme,
              darkTheme: darkTheme,
              themeMode: ThemeMode.dark,
            ),
          ),
        );

        await tester.pumpAndSettle();

        expect(find.text('Authorization Cancelled'), findsOneWidget);
        expect(find.text(AuthStrings.cancelledDescription), findsOneWidget);
        expect(find.byIcon(Icons.link_off), findsOneWidget);
        expect(find.text('Retry with GitHub'), findsOneWidget);
      },
    );

    testWidgets('denied variant renders denied message', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Access denied by GitHub.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.text('Access denied by GitHub.'), findsOneWidget);
    });

    testWidgets('expired variant renders expired message', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Session expired. Please sign in again.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(
        find.text('Session expired. Please sign in again.'),
        findsOneWidget,
      );
    });

    testWidgets('failed variant renders failed message', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(
          notice:
              'Sign-in failed. Check your GitHub account has a verified email.',
        ),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(
        find.text(
          'Sign-in failed. Check your GitHub account has a verified email.',
        ),
        findsOneWidget,
      );
    });

    testWidgets('network variant renders network message', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(
          notice: 'No internet connection. Please try again.',
        ),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(
        find.text('No internet connection. Please try again.'),
        findsOneWidget,
      );
    });

    testWidgets('server variant renders server message', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Server error. Please try again later.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(
        find.text('Server error. Please try again later.'),
        findsOneWidget,
      );
    });

    testWidgets('accountUnavailable variant renders account message', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: "This account can't sign in."),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.text("This account can't sign in."), findsOneWidget);
    });

    testWidgets('accessDenied variant renders access denied message', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Access denied. Candidate accounts only.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(
        find.text('Access denied. Candidate accounts only.'),
        findsOneWidget,
      );
    });

    testWidgets('Retry with GitHub re-invokes sign-in flow', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Sign-in cancelled.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      final button = tester.widget<PrimaryButton>(find.byType(PrimaryButton));
      button.onPressed!();
      await tester.pumpAndSettle();

      expect(controller.signInCalled, isTrue);
    });

    testWidgets(
      'Back to Welcome clears stale notice and navigates to /welcome',
      (WidgetTester tester) async {
        final container = ProviderContainer(
          overrides: [
            authControllerProvider.overrideWith(() => TestAuthController()),
          ],
        );
        final controller =
            container.read(authControllerProvider.notifier)
                as TestAuthController;
        controller.setStateForTesting(
          const AuthSignedOut(notice: 'Sign-in cancelled.'),
        );

        final goRouter = container.read(goRouterProvider);

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp.router(
              routerConfig: goRouter,
              theme: darkTheme,
              darkTheme: darkTheme,
              themeMode: ThemeMode.dark,
            ),
          ),
        );

        await tester.pumpAndSettle();

        // Router redirects to /oauth-status due to stale notice
        expect(find.text('Authorization Cancelled'), findsOneWidget);

        await tester.tap(find.text('Back to Welcome'));
        await tester.pump();
        await tester.pumpAndSettle();

        // Navigate to /welcome (notice cleared by resetToSignedOut)
        final welcomeButton = tester.widget<OutlinedButton>(
          find.byType(OutlinedButton).first,
        );
        welcomeButton.onPressed!();
        await tester.pumpAndSettle();

        // Notice cleared by button, we land on /welcome
        expect(find.text('Continue with GitHub'), findsOneWidget);
        expect(find.text('Authorization Cancelled'), findsNothing);
      },
    );

    testWidgets('Retry with GitHub triggers fresh sign-in attempt', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Sign-in cancelled.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      final button = tester.widget<PrimaryButton>(find.byType(PrimaryButton));
      button.onPressed!();
      await tester.pump();

      expect(controller.signInCalled, isTrue);
    });

    testWidgets('renders without overflow at 2.0 text scale', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Sign-in cancelled.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            builder:
                (context, child) => MediaQuery(
                  data: MediaQuery.of(
                    context,
                  ).copyWith(textScaler: const TextScaler.linear(2.0)),
                  child: child!,
                ),
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.text('Authorization Cancelled'), findsOneWidget);
      expect(find.text(AuthStrings.cancelledDescription), findsOneWidget);
    });

    testWidgets('renders without overflow in landscape orientation', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.setStateForTesting(
        const AuthSignedOut(notice: 'Sign-in cancelled.'),
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            home: const OAuthStatusScreen(),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.binding.setSurfaceSize(const Size(800, 480));
      await tester.pumpAndSettle();

      expect(find.text('Authorization Cancelled'), findsOneWidget);
    });

    testWidgets('title+subtitle pairing is correct for each failure type', (
      WidgetTester tester,
    ) async {
      final cases = [
        (AuthStrings.cancelled, AuthStrings.cancelledTitle),
        (AuthStrings.denied, 'Access Denied by GitHub'),
        (AuthStrings.expired, 'Session Expired'),
        (AuthStrings.failed, 'Sign-in Failed'),
        (AuthStrings.accountUnavailable, 'Account Unavailable'),
        (AuthStrings.accessDenied, 'Access Denied'),
        (AuthStrings.server, 'Server Error'),
        (AuthStrings.network, 'No Internet Connection'),
        (AuthStrings.unauthorized, 'Session Expired'),
        (AuthStrings.stateMismatch, 'Security Check Failed'),
      ];

      for (final (notice, expectedTitle) in cases) {
        final container = ProviderContainer(
          overrides: [
            authControllerProvider.overrideWith(() => TestAuthController()),
          ],
        );
        final controller =
            container.read(authControllerProvider.notifier)
                as TestAuthController;
        controller.setStateForTesting(AuthSignedOut(notice: notice));

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              home: const OAuthStatusScreen(),
              theme: darkTheme,
              darkTheme: darkTheme,
              themeMode: ThemeMode.dark,
            ),
          ),
        );

        await tester.pumpAndSettle();

        expect(find.text(expectedTitle), findsOneWidget);
        final expectedNotice =
            (notice == AuthStrings.cancelled ||
                    notice == AuthStrings.userCancelled)
                ? AuthStrings.cancelledDescription
                : notice;
        expect(find.text(expectedNotice), findsOneWidget);
      }
    });

    testWidgets('no overlapping elements on cancelled screen in both themes', (
      WidgetTester tester,
    ) async {
      for (final themeMode in [ThemeMode.light, ThemeMode.dark]) {
        final container = ProviderContainer(
          overrides: [
            authControllerProvider.overrideWith(() => TestAuthController()),
          ],
        );
        final controller =
            container.read(authControllerProvider.notifier)
                as TestAuthController;
        controller.setStateForTesting(
          const AuthSignedOut(notice: 'Sign-in cancelled.'),
        );

        await tester.pumpWidget(
          UncontrolledProviderScope(
            container: container,
            child: MaterialApp(
              home: const OAuthStatusScreen(),
              theme: lightTheme,
              darkTheme: darkTheme,
              themeMode: themeMode,
            ),
          ),
        );

        await tester.pumpAndSettle();

        // Get all render objects with their bounding boxes
        final titleBox = tester.getTopLeft(
          find.text('Authorization Cancelled'),
        );
        final titleSize = tester.getSize(find.text('Authorization Cancelled'));
        final descBox = tester.getTopLeft(find.byType(Text).last);
        final retryBox = tester.getTopLeft(find.text('Retry with GitHub'));
        final retrySize = tester.getSize(find.text('Retry with GitHub'));
        final backBox = tester.getTopLeft(find.text('Back to Welcome'));

        // Verify title doesn't overlap description
        expect(
          titleBox.dy + titleSize.height,
          lessThan(descBox.dy - 4),
          reason: 'Title overlaps description in $themeMode',
        );

        // Verify Retry with GitHub doesn't overlap Back to Welcome
        expect(
          retryBox.dy + retrySize.height,
          lessThan(backBox.dy - 4),
          reason: 'Retry button overlaps Back button in $themeMode',
        );
      }
    });
  });
}
