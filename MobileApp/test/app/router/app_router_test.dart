import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/app/router/app_router.dart';
import 'package:talentgraph/app/theme/app_theme.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/domain/user.dart';
import 'package:talentgraph/features/auth/presentation/auth_controller.dart';
import 'package:talentgraph/features/auth/presentation/auth_strings.dart';
import 'package:talentgraph/features/shell/jobs_discovery_screen.dart';

class _FixedAuthNotifier extends AuthController {
  _FixedAuthNotifier(this._state);
  final AuthState _state;
  @override
  AuthState build() => _state;
}

void main() {
  group('redirectFor', () {
    group('booting state', () {
      test('redirects to /welcome when not already there', () {
        expect(redirectFor('/jobs', const AuthBootstrapping()), '/welcome');
        expect(
          redirectFor('/assessments', const AuthBootstrapping()),
          '/welcome',
        );
        expect(
          redirectFor('/notifications', const AuthBootstrapping()),
          '/welcome',
        );
      });

      test('does not redirect when already on /welcome', () {
        expect(redirectFor('/welcome', const AuthBootstrapping()), isNull);
        expect(redirectFor('/oauth', const AuthBootstrapping()), isNull);
        expect(redirectFor('/oauth-status', const AuthBootstrapping()), isNull);
      });
    });

    group('signed out (no notice)', () {
      test('redirects to /welcome when not already there', () {
        expect(redirectFor('/jobs', const AuthSignedOut()), '/welcome');
        expect(redirectFor('/assessments', const AuthSignedOut()), '/welcome');
        expect(
          redirectFor('/notifications', const AuthSignedOut()),
          '/welcome',
        );
      });

      test('does not redirect when already on /welcome', () {
        expect(redirectFor('/welcome', const AuthSignedOut()), isNull);
        expect(redirectFor('/oauth', const AuthSignedOut()), isNull);
        expect(redirectFor('/oauth-status', const AuthSignedOut()), isNull);
      });
    });

    group('signed out with notice (error states)', () {
      test('redirects to /oauth-status for cancelled', () {
        const state = AuthSignedOut(notice: 'Sign-in cancelled.');
        expect(redirectFor('/jobs', state), '/oauth-status');
        expect(redirectFor('/assessments', state), '/oauth-status');
      });

      test('redirects to /oauth-status for denied', () {
        const state = AuthSignedOut(notice: 'Access denied by GitHub.');
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status for expired', () {
        const state = AuthSignedOut(
          notice: 'Session expired. Please sign in again.',
        );
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status for failed', () {
        const state = AuthSignedOut(
          notice:
              'Sign-in failed. Check your GitHub account has a verified email.',
        );
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status for accountUnavailable', () {
        const state = AuthSignedOut(notice: "This account can't sign in.");
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status for accessDenied', () {
        const state = AuthSignedOut(
          notice: 'Access denied. Candidate accounts only.',
        );
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status for server', () {
        const state = AuthSignedOut(
          notice: 'Server error. Please try again later.',
        );
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status for network', () {
        const state = AuthSignedOut(
          notice: 'No internet connection. Please try again.',
        );
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status for unauthorized', () {
        const state = AuthSignedOut(
          notice: 'Session expired. Please sign in again.',
        );
        expect(redirectFor('/jobs', state), '/oauth-status');
      });

      test('redirects to /oauth-status when on welcome/oauth with notice', () {
        const state = AuthSignedOut(notice: 'Sign-in cancelled.');
        expect(redirectFor('/welcome', state), '/oauth-status');
        expect(redirectFor('/oauth', state), '/oauth-status');
      });

      test('does not redirect when already on /oauth-status with notice', () {
        const state = AuthSignedOut(notice: 'Sign-in cancelled.');
        expect(redirectFor('/oauth-status', state), isNull);
      });
    });

    group('signing in state', () {
      test('never redirects (stays in place)', () {
        expect(redirectFor('/welcome', const AuthSigningIn()), isNull);
        expect(redirectFor('/jobs', const AuthSigningIn()), isNull);
        expect(redirectFor('/oauth-status', const AuthSigningIn()), isNull);
      });
    });

    group('signed in state', () {
      test('redirects to /jobs from login pages', () {
        final user = const TalentGraphUser(
          id: '1',
          name: 'Test',
          email: 't@e.com',
          role: 'CANDIDATE',
          status: 'ACTIVE',
        );
        expect(redirectFor('/welcome', AuthSignedIn(user)), '/jobs');
        expect(redirectFor('/oauth', AuthSignedIn(user)), '/jobs');
        expect(redirectFor('/oauth-status', AuthSignedIn(user)), '/jobs');
      });

      test('does not redirect when already on shell routes', () {
        final user = const TalentGraphUser(
          id: '1',
          name: 'Test',
          email: 't@e.com',
          role: 'CANDIDATE',
          status: 'ACTIVE',
        );
        expect(redirectFor('/jobs', AuthSignedIn(user)), isNull);
        expect(redirectFor('/assessments', AuthSignedIn(user)), isNull);
        expect(redirectFor('/notifications', AuthSignedIn(user)), isNull);
      });

      test('BLOCKED/DELETED status redirects to /oauth-status', () {
        // AuthState doesn't have a separate blocked state — it collapses to
        // AuthSignedOut(notice: ...) via the controller's /auth/me handling.
        // This test documents the expected behavior: any signed-in user that
        // fails the candidate/active check ends up as AuthSignedOut with a
        // notice, which redirects to /oauth-status.
        final blockedState = const AuthSignedOut(
          notice: 'This account can\'t sign in.',
        );
        expect(redirectFor('/jobs', blockedState), '/oauth-status');

        final deniedState = const AuthSignedOut(
          notice: 'Access denied. Candidate accounts only.',
        );
        expect(redirectFor('/jobs', deniedState), '/oauth-status');
      });
    });
  });

  group('router integration', () {
    final testUser = TalentGraphUser(
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'CANDIDATE',
      status: 'ACTIVE',
    );

    testWidgets('Path A: cached GitHub session → JobsDiscoveryScreen', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _FixedAuthNotifier(AuthSignedIn(testUser)),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp.router(
            routerConfig: container.read(goRouterProvider),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.byType(JobsDiscoveryScreen), findsOneWidget);
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
      expect(find.text('Nexus Cloud Infrastructure'), findsOneWidget);
    });

    testWidgets('Path B: no cached session → Auth screen (WelcomeScreen)', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _FixedAuthNotifier(const AuthSignedOut()),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp.router(
            routerConfig: container.read(goRouterProvider),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.byType(WelcomeScreen), findsOneWidget);
      expect(find.text('Continue with GitHub'), findsOneWidget);
    });

    testWidgets('Fresh GitHub OAuth success → JobsDiscoveryScreen', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _FixedAuthNotifier(AuthSignedIn(testUser)),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp.router(
            routerConfig: container.read(goRouterProvider),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.byType(JobsDiscoveryScreen), findsOneWidget);
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
    });

    testWidgets('Explicit GitHub OAuth cancellation → Auth Cancelled screen', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _FixedAuthNotifier(
              const AuthSignedOut(notice: AuthStrings.userCancelled),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp.router(
            routerConfig: container.read(goRouterProvider),
            theme: darkTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.byType(OAuthStatusScreen), findsOneWidget);
      expect(find.text('Authorization Cancelled'), findsOneWidget);
      expect(find.text('Continue with GitHub'), findsNothing);
    });
  });
}
