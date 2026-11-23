import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_test/flutter_test.dart';
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

void main() {
  group('TokenStore interface', () {
    late FakeTokenStore store;

    setUp(() {
      store = FakeTokenStore();
    });

    test('read/write/clear access token', () async {
      expect(await store.readAccessToken(), isNull);

      await store.writeAccessToken('access-123');
      expect(await store.readAccessToken(), 'access-123');

      await store.deleteAccessToken();
      expect(await store.readAccessToken(), isNull);
    });

    test('read/write/clear refresh token', () async {
      expect(await store.readRefreshToken(), isNull);

      await store.writeRefreshToken('refresh-456');
      expect(await store.readRefreshToken(), 'refresh-456');

      await store.deleteRefreshToken();
      expect(await store.readRefreshToken(), isNull);
    });

    test('clearAll removes both tokens', () async {
      await store.writeAccessToken('access-123');
      await store.writeRefreshToken('refresh-456');

      await store.clearAll();

      expect(await store.readAccessToken(), isNull);
      expect(await store.readRefreshToken(), isNull);
    });

    test('access and refresh tokens are independent', () async {
      await store.writeAccessToken('access-only');
      expect(await store.readAccessToken(), 'access-only');
      expect(await store.readRefreshToken(), isNull);

      await store.deleteAccessToken();
      expect(await store.readAccessToken(), isNull);
    });
  });

  group('SecureTokenStore', () {
    test('can be constructed with FlutterSecureStorage', () {
      final store = SecureTokenStore(storage: FlutterSecureStorage());
      expect(store, isA<TokenStore>());
    });
  });
}
