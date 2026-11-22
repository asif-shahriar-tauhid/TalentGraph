import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/core/network/dio_client.dart';
import 'package:talentgraph/core/storage/token_store.dart';

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
  FakeAuthRefreshHandler({this.accessTokenValue = 'stored-access'});

  String? accessTokenValue;
  int unauthorizedCallCount = 0;

  @override
  Future<String?> get accessToken => Future.value(accessTokenValue);

  @override
  Future<void> onUnauthorized() async {
    unauthorizedCallCount++;
  }
}

Response _mockSuccessResponse(RequestOptions options) => Response(
  data: {
    'success': true,
    'statusCode': 200,
    'message': 'ok',
    'data': {'accessToken': 'new-access', 'refreshToken': 'new-refresh'},
  },
  requestOptions: options,
  statusCode: 200,
);

Response _mock401Response(RequestOptions options) => Response(
  data: {
    'success': false,
    'statusCode': 401,
    'message': 'invalid refresh token',
  },
  requestOptions: options,
  statusCode: 401,
);

void main() {
  group('DioClient', () {
    late FakeTokenStore tokenStore;
    late FakeAuthRefreshHandler refreshHandler;
    late DioClient client;

    setUp(() {
      tokenStore = FakeTokenStore();
      refreshHandler = FakeAuthRefreshHandler();
      client = DioClient(
        tokenStore: tokenStore,
        refreshHandler: refreshHandler,
      );
    });

    test('Bearer header attached by authed interceptor', () async {
      String? capturedAuth;

      client.authed.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            capturedAuth = options.headers['Authorization'] as String?;
            return handler.next(options);
          },
        ),
      );

      try {
        await client.authed.get('/test');
      } on DioException {
        // Expected: no real server, but header was attached before dispatch
      }
      expect(capturedAuth, 'Bearer stored-access');
    });

    test('concurrent 401s trigger exactly one refresh', () async {
      await tokenStore.writeRefreshToken('refresh-token');

      int refreshCallCount = 0;
      client.plain.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            refreshCallCount++;
            return handler.resolve(_mockSuccessResponse(options));
          },
        ),
      );

      await Future.wait([
        client.performSingleFlightRefresh(),
        client.performSingleFlightRefresh(),
      ]);

      expect(refreshCallCount, 1);
      expect(await tokenStore.readAccessToken(), 'new-access');
      expect(await tokenStore.readRefreshToken(), 'new-refresh');
    });

    test('refresh failure clears tokens and calls onUnauthorized', () async {
      await tokenStore.writeRefreshToken('bad-refresh');

      client.plain.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            return handler.resolve(_mock401Response(options));
          },
        ),
      );

      await client.performSingleFlightRefresh();

      expect(await tokenStore.readAccessToken(), isNull);
      expect(await tokenStore.readRefreshToken(), isNull);
      expect(refreshHandler.unauthorizedCallCount, 1);
    });

    test('no refresh token triggers onUnauthorized', () async {
      // No refresh token stored
      await client.performSingleFlightRefresh();

      expect(refreshHandler.unauthorizedCallCount, 1);
    });

    test('single-flight waits for first refresh', () async {
      await tokenStore.writeRefreshToken('refresh-token');

      int refreshCallCount = 0;
      client.plain.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) {
            refreshCallCount++;
            return handler.resolve(_mockSuccessResponse(options));
          },
        ),
      );

      await Future.wait([
        client.performSingleFlightRefresh(),
        client.performSingleFlightRefresh(),
        client.performSingleFlightRefresh(),
      ]);

      expect(refreshCallCount, 1);
      expect(await tokenStore.readAccessToken(), 'new-access');
    });
  });
}
