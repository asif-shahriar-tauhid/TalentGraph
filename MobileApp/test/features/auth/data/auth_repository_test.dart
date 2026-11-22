import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/core/error/app_failure.dart';
import 'package:talentgraph/core/network/dio_client.dart';
import 'package:talentgraph/core/storage/token_store.dart';
import 'package:talentgraph/features/auth/data/auth_api.dart';
import 'package:talentgraph/features/auth/data/auth_repository.dart';

class FakeTokenStore implements TokenStore {
  final Map<String, String> _store = {};

  @override
  Future<String?> readAccessToken() async => _store['access_token'];

  @override
  Future<void> writeAccessToken(String token) async {
    _store['access_token'] = token;
  }

  @override
  Future<void> deleteAccessToken() async {
    _store.remove('access_token');
  }

  @override
  Future<String?> readRefreshToken() async => _store['refresh_token'];

  @override
  Future<void> writeRefreshToken(String token) async {
    _store['refresh_token'] = token;
  }

  @override
  Future<void> deleteRefreshToken() async {
    _store.remove('refresh_token');
  }

  @override
  Future<void> clearAll() async {
    _store.clear();
  }
}

class FakeAuthRefreshHandler implements AuthRefreshHandler {
  @override
  Future<String?> get accessToken => Future.value(null);

  @override
  Future<void> onUnauthorized() async {}
}

class FakeAuthApi implements AuthApi {
  FakeAuthApi({
    this.authorizeUrl,
    this.getMeResult,
    this.getMeError,
    this.refreshTokenResult,
  });

  final String? authorizeUrl;
  final Map<String, dynamic>? getMeResult;
  final DioException? getMeError;
  final Map<String, dynamic>? refreshTokenResult;

  Map<String, dynamic>? exchangeCodeResult;
  DioException? exchangeCodeError;

  int getAuthorizeUrlCallCount = 0;
  int exchangeCodeCallCount = 0;
  String? lastCode;
  String? lastState;

  @override
  Future<String> getAuthorizeUrl(String state) async {
    getAuthorizeUrlCallCount++;
    lastState = state;
    return authorizeUrl ??
        'https://github.com/login/oauth/authorize?state=$state';
  }

  @override
  Future<Map<String, dynamic>> exchangeCode(String code) async {
    exchangeCodeCallCount++;
    lastCode = code;
    if (exchangeCodeError != null) throw exchangeCodeError!;
    return exchangeCodeResult ?? {};
  }

  @override
  Future<Map<String, dynamic>> getMe() async {
    if (getMeError != null) throw getMeError!;
    return getMeResult ?? {};
  }

  @override
  Future<Map<String, dynamic>> refreshToken(String refreshToken) async {
    return refreshTokenResult ?? {};
  }

  @override
  Future<void> logout() async {}
}

void main() {
  group('AuthRepository', () {
    late FakeTokenStore tokenStore;
    late FakeAuthApi fakeApi;
    late AuthRepository repository;

    setUp(() {
      tokenStore = FakeTokenStore();
      fakeApi = FakeAuthApi();
      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate:
            (url, scheme) async =>
                'talentgraph://auth/callback?code=auth-code&state=stored-state',
      );
    });

    test('generates fresh state and passes it to getAuthorizeUrl', () async {
      fakeApi.exchangeCodeResult = {
        'user': {
          'id': '1',
          'name': 'Test',
          'email': 't@e.com',
          'role': 'CANDIDATE',
          'status': 'ACTIVE',
        },
        'accessToken': 'at-123',
        'refreshToken': 'rt-456',
      };
      // Use a fake authenticate that captures the state from the URL
      String? capturedStateFromUrl;
      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate: (url, scheme) async {
          final uri = Uri.parse(url);
          capturedStateFromUrl = uri.queryParameters['state'];
          return 'talentgraph://auth/callback?code=code&state=$capturedStateFromUrl';
        },
      );

      await repository.signIn();

      expect(fakeApi.getAuthorizeUrlCallCount, 1);
      expect(capturedStateFromUrl, isNotNull);
      expect(capturedStateFromUrl, fakeApi.lastState);
      expect(capturedStateFromUrl, isNotEmpty);
    });

    test('state mismatch returns AppFailureExpired', () async {
      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate:
            (url, scheme) async =>
                'talentgraph://auth/callback?code=code&state=wrong-state',
      );

      final result = await repository.signIn();

      expect(result, isA<AuthFailure>());
      expect((result as AuthFailure).failure, isA<AppFailureExpired>());
    });

    test('missing state returns AppFailureExpired', () async {
      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate:
            (url, scheme) async => 'talentgraph://auth/callback?code=code',
      );

      final result = await repository.signIn();

      expect(result, isA<AuthFailure>());
      expect((result as AuthFailure).failure, isA<AppFailureExpired>());
    });

    test('error=access_denied returns AppFailureDenied', () async {
      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate:
            (url, scheme) async =>
                'talentgraph://auth/callback?error=access_denied',
      );

      final result = await repository.signIn();

      expect(result, isA<AuthFailure>());
      expect((result as AuthFailure).failure, isA<AppFailureDenied>());
    });

    test('user cancel returns AuthCancelled', () async {
      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate: (url, scheme) async {
          throw Exception('authentication cancelled');
        },
      );

      final result = await repository.signIn();

      expect(result, isA<AuthCancelled>());
    });

    test('successful exchange returns AuthSuccess', () async {
      fakeApi.exchangeCodeResult = {
        'user': {
          'id': '1',
          'name': 'Test',
          'email': 't@e.com',
          'role': 'CANDIDATE',
          'status': 'ACTIVE',
        },
        'accessToken': 'at-123',
        'refreshToken': 'rt-456',
      };

      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate:
            (url, scheme) async =>
                'talentgraph://auth/callback?code=auth-code&state=stored-state',
      );

      // Override to return matching state
      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate: (url, scheme) async {
          // Extract state from the authorize URL and echo it back
          final uri = Uri.parse(url);
          final state = uri.queryParameters['state'] ?? '';
          return 'talentgraph://auth/callback?code=auth-code&state=$state';
        },
      );

      final result = await repository.signIn();

      expect(result, isA<AuthSuccess>());
      final success = result as AuthSuccess;
      expect(success.accessToken, 'at-123');
      expect(success.refreshToken, 'rt-456');
      expect(fakeApi.lastCode, 'auth-code');
    });

    test('exchangeCode 400 maps to AppFailureFailed', () async {
      fakeApi.exchangeCodeError = DioException(
        requestOptions: RequestOptions(path: '/auth/github'),
        response: Response(
          requestOptions: RequestOptions(path: '/auth/github'),
          statusCode: 400,
          data: {'success': false, 'statusCode': 400, 'message': 'bad code'},
        ),
        type: DioExceptionType.badResponse,
      );

      repository = AuthRepository(
        api: fakeApi,
        tokenStore: tokenStore,
        authenticate: (url, scheme) async {
          final uri = Uri.parse(url);
          final state = uri.queryParameters['state'] ?? '';
          return 'talentgraph://auth/callback?code=bad-code&state=$state';
        },
      );

      final result = await repository.signIn();

      expect(result, isA<AuthFailure>());
      expect((result as AuthFailure).failure, isA<AppFailureFailed>());
    });
  });

  group('StoredTokens', () {
    test('holds access and refresh tokens', () {
      const tokens = StoredTokens(accessToken: 'at', refreshToken: 'rt');
      expect(tokens.accessToken, 'at');
      expect(tokens.refreshToken, 'rt');
    });
  });
}
