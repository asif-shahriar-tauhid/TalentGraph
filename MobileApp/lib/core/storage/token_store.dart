import 'package:flutter_secure_storage/flutter_secure_storage.dart';

abstract class TokenStore {
  Future<String?> readAccessToken();
  Future<void> writeAccessToken(String token);
  Future<void> deleteAccessToken();
  Future<String?> readRefreshToken();
  Future<void> writeRefreshToken(String token);
  Future<void> deleteRefreshToken();
  Future<void> clearAll();
}

class SecureTokenStore implements TokenStore {
  SecureTokenStore({required this.storage});

  final FlutterSecureStorage storage;

  static const _accessKey = 'access_token';
  static const _refreshKey = 'refresh_token';

  @override
  Future<String?> readAccessToken() => storage.read(key: _accessKey);

  @override
  Future<void> writeAccessToken(String token) =>
      storage.write(key: _accessKey, value: token);

  @override
  Future<void> deleteAccessToken() => storage.delete(key: _accessKey);

  @override
  Future<String?> readRefreshToken() => storage.read(key: _refreshKey);

  @override
  Future<void> writeRefreshToken(String token) =>
      storage.write(key: _refreshKey, value: token);

  @override
  Future<void> deleteRefreshToken() => storage.delete(key: _refreshKey);

  @override
  Future<void> clearAll() async {
    await deleteAccessToken();
    await deleteRefreshToken();
  }
}
