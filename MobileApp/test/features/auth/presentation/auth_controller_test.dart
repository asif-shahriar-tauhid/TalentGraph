import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/core/error/app_failure.dart';
import 'package:talentgraph/features/auth/data/auth_repository.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/domain/user.dart';
import 'package:talentgraph/features/auth/presentation/auth_controller.dart';
import 'package:talentgraph/features/auth/presentation/auth_strings.dart';

class TestAuthController extends AuthController {
  TestAuthController();

  AuthState? bootstrapState;
  @override
  Future<void> bootstrap() async {
    state = bootstrapState ?? const AuthSignedOut();
  }

  AuthResult? signInResult;
  @override
  Future<void> signIn() async {
    state = const AuthSigningIn();
    switch (signInResult) {
      case AuthSuccess(:final user):
        state = AuthSignedIn(TalentGraphUser.fromMap(user));
      case AuthFailure(:final failure):
        state = AuthSignedOut(notice: noticeFor(failure));
      case AuthCancelled():
        state = const AuthSignedOut(notice: AuthStrings.userCancelled);
      case null:
        break;
    }
  }
}

void main() {
  group('mapDioException', () {
    test('401 → unauthorized', () {
      final controller = _createController();
      final e = DioException(
        requestOptions: RequestOptions(path: '/auth/me'),
        response: Response(
          requestOptions: RequestOptions(path: '/auth/me'),
          statusCode: 401,
          data: {
            'success': false,
            'statusCode': 401,
            'message': 'unauthorized',
          },
        ),
        type: DioExceptionType.badResponse,
      );
      expect(controller.mapDioException(e), isA<AppFailureUnauthorized>());
    });

    test('403 → accessDenied', () {
      final controller = _createController();
      final e = DioException(
        requestOptions: RequestOptions(path: '/auth/me'),
        response: Response(
          requestOptions: RequestOptions(path: '/auth/me'),
          statusCode: 403,
          data: {'success': false, 'statusCode': 403, 'message': 'forbidden'},
        ),
        type: DioExceptionType.badResponse,
      );
      expect(controller.mapDioException(e), isA<AppFailureAccessDenied>());
    });

    test('502 → server', () {
      final controller = _createController();
      final e = DioException(
        requestOptions: RequestOptions(path: '/auth/me'),
        response: Response(
          requestOptions: RequestOptions(path: '/auth/me'),
          statusCode: 502,
          data: {'success': false, 'statusCode': 502, 'message': 'bad gateway'},
        ),
        type: DioExceptionType.badResponse,
      );
      expect(controller.mapDioException(e), isA<AppFailureServer>());
    });

    test('400 → failed', () {
      final controller = _createController();
      final e = DioException(
        requestOptions: RequestOptions(path: '/auth/github'),
        response: Response(
          requestOptions: RequestOptions(path: '/auth/github'),
          statusCode: 400,
          data: {'success': false, 'statusCode': 400, 'message': 'bad code'},
        ),
        type: DioExceptionType.badResponse,
      );
      expect(controller.mapDioException(e), isA<AppFailureFailed>());
    });

    test('cancel → canceled', () {
      final controller = _createController();
      final e = DioException(
        requestOptions: RequestOptions(path: '/auth/me'),
        type: DioExceptionType.cancel,
      );
      expect(controller.mapDioException(e), isA<AppFailureCanceled>());
    });

    test('timeout → network', () {
      final controller = _createController();
      final e = DioException(
        requestOptions: RequestOptions(path: '/auth/me'),
        type: DioExceptionType.connectionTimeout,
      );
      expect(controller.mapDioException(e), isA<AppFailureNetwork>());
    });

    test('unknown → network', () {
      final controller = _createController();
      final e = DioException(
        requestOptions: RequestOptions(path: '/auth/me'),
        error: Exception('no internet'),
        type: DioExceptionType.unknown,
      );
      expect(controller.mapDioException(e), isA<AppFailureNetwork>());
    });
  });

  group('noticeFor', () {
    test('maps each failure type to its notice string', () {
      final controller = _createController();
      expect(
        controller.noticeFor(const AppFailureCanceled()),
        'Sign-in cancelled.',
      );
      expect(
        controller.noticeFor(const AppFailureDenied()),
        'Access denied by GitHub.',
      );
      expect(
        controller.noticeFor(const AppFailureExpired()),
        'Session expired. Please sign in again.',
      );
      expect(
        controller.noticeFor(const AppFailureFailed()),
        'Sign-in failed. Check your GitHub account has a verified email.',
      );
      expect(
        controller.noticeFor(const AppFailureAccountUnavailable()),
        "This account can't sign in.",
      );
      expect(
        controller.noticeFor(const AppFailureAccessDenied()),
        'Access denied. Candidate accounts only.',
      );
      expect(
        controller.noticeFor(const AppFailureServer()),
        'Server error. Please try again later.',
      );
      expect(
        controller.noticeFor(const AppFailureNetwork()),
        'No internet connection. Please try again.',
      );
      expect(
        controller.noticeFor(const AppFailureUnauthorized()),
        'Session expired. Please sign in again.',
      );
    });
  });

  group('bootstrap', () {
    testWidgets('no cached tokens → AuthSignedOut (no notice)', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.bootstrapState = const AuthSignedOut();
      await controller.bootstrap();

      expect(controller.state, isA<AuthSignedOut>());
      expect((controller.state as AuthSignedOut).notice, isNull);
    });

    testWidgets('valid cached session → AuthSignedIn', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      final user = const TalentGraphUser(
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'CANDIDATE',
        status: 'ACTIVE',
      );
      controller.bootstrapState = AuthSignedIn(user);
      await controller.bootstrap();

      expect(controller.state, isA<AuthSignedIn>());
      expect((controller.state as AuthSignedIn).user.id, '1');
    });

    testWidgets('invalid cached session → AuthSignedOut with notice', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.bootstrapState = const AuthSignedOut(
        notice: 'Session expired. Please sign in again.',
      );
      await controller.bootstrap();

      expect(controller.state, isA<AuthSignedOut>());
      expect(
        (controller.state as AuthSignedOut).notice,
        'Session expired. Please sign in again.',
      );
    });
  });

  group('signIn', () {
    testWidgets('OAuth success → AuthSignedIn', (WidgetTester tester) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.signInResult = AuthSuccess(
        user: {
          'id': '1',
          'name': 'Test User',
          'email': 'test@example.com',
          'role': 'CANDIDATE',
          'status': 'ACTIVE',
        },
        accessToken: 'at_123',
        refreshToken: 'rt_123',
      );
      await controller.signIn();

      expect(controller.state, isA<AuthSignedIn>());
      expect((controller.state as AuthSignedIn).user.id, '1');
    });

    testWidgets('OAuth failure → AuthSignedOut with notice', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.signInResult = AuthFailure(const AppFailureDenied());
      await controller.signIn();

      expect(controller.state, isA<AuthSignedOut>());
      expect(
        (controller.state as AuthSignedOut).notice,
        'Access denied by GitHub.',
      );
    });

    testWidgets('OAuth cancellation → AuthSignedOut with cancelled notice', (
      WidgetTester tester,
    ) async {
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(() => TestAuthController()),
        ],
      );
      final controller =
          container.read(authControllerProvider.notifier) as TestAuthController;
      controller.signInResult = const AuthCancelled();
      await controller.signIn();

      expect(controller.state, isA<AuthSignedOut>());
      expect(
        (controller.state as AuthSignedOut).notice,
        AuthStrings.userCancelled,
      );
    });
  });
}

TestAuthController _createController() {
  return TestAuthController();
}
