import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/core/network/dio_client.dart';
import 'package:talentgraph/core/storage/token_store.dart';
import 'package:talentgraph/features/auth/data/auth_api.dart';

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

void main() {
  group('AuthApi', () {
    late FakeTokenStore tokenStore;
    late DioClient dioClient;
    late AuthApi api;

    setUp(() {
      tokenStore = FakeTokenStore();
      dioClient = DioClient(
        tokenStore: tokenStore,
        refreshHandler: FakeAuthRefreshHandler(),
      );
      api = AuthApi(dioClient);
    });

    test('getAuthorizeUrl calls GET /auth/github/url with state', () async {
      dioClient.plain.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            expect(options.method, 'GET');
            expect(options.path, '/auth/github/url');
            expect(options.queryParameters['state'], 'test-state-123');
            return handler.resolve(
              Response(
                data: {
                  'success': true,
                  'statusCode': 200,
                  'message': 'ok',
                  'data': {
                    'url': 'https://github.com/login/oauth/authorize?...',
                  },
                },
                requestOptions: options,
                statusCode: 200,
              ),
            );
          },
        ),
      );

      final url = await api.getAuthorizeUrl('test-state-123');
      expect(url, 'https://github.com/login/oauth/authorize?...');
    });

    test('exchangeCode calls POST /auth/github with code and role', () async {
      dioClient.plain.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            expect(options.method, 'POST');
            expect(options.path, '/auth/github');
            expect(options.data['code'], 'auth-code-456');
            expect(options.data['role'], 'CANDIDATE');
            return handler.resolve(
              Response(
                data: {
                  'success': true,
                  'statusCode': 200,
                  'message': 'ok',
                  'data': {
                    'user': {
                      'id': '1',
                      'name': 'Test',
                      'email': 't@e.com',
                      'role': 'CANDIDATE',
                      'status': 'ACTIVE',
                    },
                    'accessToken': 'at-123',
                    'refreshToken': 'rt-456',
                  },
                },
                requestOptions: options,
                statusCode: 200,
              ),
            );
          },
        ),
      );

      final data = await api.exchangeCode('auth-code-456');
      expect(data['accessToken'], 'at-123');
      expect(data['refreshToken'], 'rt-456');
      expect(data['user']['role'], 'CANDIDATE');
    });

    test('getMe calls GET /auth/me on authed client', () async {
      dioClient.authed.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            expect(options.method, 'GET');
            expect(options.path, '/auth/me');
            expect(options.headers['Authorization'], 'Bearer token-abc');
            return handler.resolve(
              Response(
                data: {
                  'success': true,
                  'statusCode': 200,
                  'message': 'ok',
                  'data': {
                    'id': '1',
                    'name': 'Test',
                    'email': 't@e.com',
                    'role': 'CANDIDATE',
                    'status': 'ACTIVE',
                  },
                },
                requestOptions: options,
                statusCode: 200,
              ),
            );
          },
        ),
      );

      // Manually trigger the Bearer header by calling with a token
      // The interceptor in DioClient attaches the token from refreshHandler.accessToken
      // Our fake returns null, so we need to set it
      // Actually, let's just verify the path and method
      final data = await api.getMe();
      expect(data['id'], '1');
    });

    test(
      'refreshToken calls POST /auth/refresh-token on plain client',
      () async {
        dioClient.plain.interceptors.add(
          InterceptorsWrapper(
            onRequest: (options, handler) {
              expect(options.method, 'POST');
              expect(options.path, '/auth/refresh-token');
              expect(options.data['refreshToken'], 'rt-456');
              return handler.resolve(
                Response(
                  data: {
                    'success': true,
                    'statusCode': 200,
                    'message': 'ok',
                    'data': {'accessToken': 'at-new', 'refreshToken': 'rt-new'},
                  },
                  requestOptions: options,
                  statusCode: 200,
                ),
              );
            },
          ),
        );

        final data = await api.refreshToken('rt-456');
        expect(data['accessToken'], 'at-new');
        expect(data['refreshToken'], 'rt-new');
      },
    );

    test('logout calls POST /auth/logout and swallows errors', () async {
      dioClient.authed.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            expect(options.method, 'POST');
            expect(options.path, '/auth/logout');
            return handler.resolve(
              Response(data: null, requestOptions: options, statusCode: 200),
            );
          },
        ),
      );

      await api.logout(); // should not throw
    });
  });
}

class FakeAuthRefreshHandler implements AuthRefreshHandler {
  @override
  Future<String?> get accessToken => Future.value('token-abc');

  @override
  Future<void> onUnauthorized() async {}
}
