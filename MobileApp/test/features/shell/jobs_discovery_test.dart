import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/app/theme/app_theme.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/domain/user.dart';
import 'package:talentgraph/features/auth/presentation/auth_controller.dart';
import 'package:talentgraph/features/shell/jobs_discovery_screen.dart';
import 'package:talentgraph/features/shell/shell.dart';

class _TestAuthNotifier extends AuthController {
  _TestAuthNotifier(this._state);
  final AuthState _state;
  @override
  AuthState build() => _state;
}

void main() {
  group('ShellScreen bottom nav', () {
    testWidgets('renders exactly one NavigationBar on Jobs tab', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const ShellScreen(tabIndex: 0),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // JobsDiscoveryScreen renders without a bottomNavigationBar
      expect(find.byType(JobsDiscoveryScreen), findsOneWidget);

      // ShellScreen provides exactly one NavigationBar
      expect(find.byType(NavigationBar), findsOneWidget);
      expect(find.byType(BottomNavigationBar), findsNothing);
    });
  });

  group('JobsDiscoveryScreen layout', () {
    testWidgets('no overflow at 360x800 viewport', (WidgetTester tester) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.binding.setSurfaceSize(const Size(360, 800));
      addTearDown(() async {
        await tester.binding.setSurfaceSize(const Size(800, 600));
      });

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const JobsDiscoveryScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.byType(JobsDiscoveryScreen), findsOneWidget);
    });
  });

  group('JobsDiscoveryScreen search filtering', () {
    testWidgets('non-matching query filters out non-matching jobs', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const JobsDiscoveryScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // All 3 dummy jobs visible initially
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
      expect(find.text('Senior Full Stack Security Engineer'), findsOneWidget);
      expect(find.text('Rust Systems Core Engineer'), findsOneWidget);

      // Type a non-matching query
      await tester.enterText(find.byType(TextField), 'zzz_nonexistent');
      await tester.pumpAndSettle();

      // All jobs filtered out
      expect(find.text('Staff Distributed Systems Engineer'), findsNothing);
      expect(find.text('Senior Full Stack Security Engineer'), findsNothing);
      expect(find.text('Rust Systems Core Engineer'), findsNothing);
      expect(find.text('No jobs found'), findsOneWidget);
    });

    testWidgets('matching query keeps matching jobs', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const JobsDiscoveryScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Search for 'rust'
      await tester.enterText(find.byType(TextField), 'rust');
      await tester.pumpAndSettle();

      // Only the Rust job remains
      expect(find.text('Staff Distributed Systems Engineer'), findsNothing);
      expect(find.text('Senior Full Stack Security Engineer'), findsNothing);
      expect(find.text('Rust Systems Core Engineer'), findsOneWidget);
    });
  });

  group('JobsDiscoveryScreen filter chips', () {
    testWidgets("'Senior & Staff' chip matches senior and staff jobs", (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const JobsDiscoveryScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // All 3 jobs visible initially
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
      expect(find.text('Senior Full Stack Security Engineer'), findsOneWidget);
      expect(find.text('Rust Systems Core Engineer'), findsOneWidget);

      // Tap 'Senior & Staff' chip
      await tester.tap(find.text('Senior & Staff').first);
      await tester.pumpAndSettle();

      // Staff Level and Senior jobs match; Rust is Senior too so matches
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
      expect(find.text('Senior Full Stack Security Engineer'), findsOneWidget);
      expect(find.text('Rust Systems Core Engineer'), findsOneWidget);
    });

    testWidgets("'TypeScript / Go' chip matches TypeScript or Go skills", (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const JobsDiscoveryScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Tap 'TypeScript / Go' chip
      await tester.tap(find.text('TypeScript / Go').first);
      await tester.pumpAndSettle();

      // Go job (job_001) and TypeScript job (job_002) match; Rust job (job_003) doesn't
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
      expect(find.text('Senior Full Stack Security Engineer'), findsOneWidget);
      expect(find.text('Rust Systems Core Engineer'), findsNothing);
    });
  });

  group('JobsDiscoveryScreen feed tabs', () {
    testWidgets("'Recommended' tab shows only evidenceTrailActive jobs", (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const JobsDiscoveryScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Tap 'Recommended' tab
      await tester.tap(find.text('Recommended').first);
      await tester.pumpAndSettle();

      // job_001 (evidenceTrailActive: true) and job_003 (evidenceTrailActive: true) match;
      // job_002 (evidenceTrailActive: false) doesn't
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
      expect(find.text('Senior Full Stack Security Engineer'), findsNothing);
      expect(find.text('Rust Systems Core Engineer'), findsOneWidget);
    });

    testWidgets("'Saved Jobs' tab shows only bookmarked jobs", (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(
            () => _TestAuthNotifier(
              const AuthSignedIn(
                TalentGraphUser(
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                  role: 'CANDIDATE',
                  status: 'ACTIVE',
                ),
              ),
            ),
          ),
        ],
      );

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp(
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: ThemeMode.dark,
            home: const JobsDiscoveryScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Bookmark job_002 (isBookmarked: true initially)
      await tester.tap(find.byIcon(Icons.bookmark_border).first);
      await tester.pumpAndSettle();

      // Tap 'Saved Jobs' tab
      await tester.tap(find.text('Saved Jobs').first);
      await tester.pumpAndSettle();

      // Only bookmarked job (job_001) shows
      expect(find.text('Staff Distributed Systems Engineer'), findsOneWidget);
      expect(find.text('Senior Full Stack Security Engineer'), findsNothing);
      expect(find.text('Rust Systems Core Engineer'), findsNothing);
    });
  });
}
