import 'package:dio/dio.dart';
import 'package:talentgraph/core/network/dio_client.dart';

class AuthApi {
  AuthApi(this._dioClient);

  final DioClient _dioClient;

  /// GET /auth/github/url?state= — returns the GitHub authorize URL.
  Future<String> getAuthorizeUrl(String state) async {
    final response = await _dioClient.plain.get(
      '/auth/github/url',
      queryParameters: {'state': state},
    );
    final envelope = response.data as Map<String, dynamic>;
    return envelope['data']['url'] as String;
  }

  /// POST /auth/github — exchanges code for {user, accessToken, refreshToken}.
  /// No bearer token — plain client bypasses the refresh interceptor.
  Future<Map<String, dynamic>> exchangeCode(String code) async {
    final response = await _dioClient.plain.post(
      '/auth/github',
      data: {'code': code, 'role': 'CANDIDATE'},
    );
    final envelope = response.data as Map<String, dynamic>;
    return envelope['data'] as Map<String, dynamic>;
  }

  /// GET /auth/me — returns the current user. Requires bearer token.
  /// Authed client unwraps the envelope via Dio interceptor; handle both
  /// wrapped and unwrapped for test compatibility.
  Future<Map<String, dynamic>> getMe() async {
    final response = await _dioClient.authed.get('/auth/me');
    final data = response.data as Map<String, dynamic>;
    if (data['success'] != null && data['data'] != null) {
      return data['data'] as Map<String, dynamic>;
    }
    return data;
  }

  /// POST /auth/refresh-token — returns {accessToken, refreshToken}.
  /// Plain client bypasses the refresh interceptor (single-flight handled by caller).
  Future<Map<String, dynamic>> refreshToken(String refreshToken) async {
    final response = await _dioClient.plain.post(
      '/auth/refresh-token',
      data: {'refreshToken': refreshToken},
    );
    final envelope = response.data as Map<String, dynamic>;
    return envelope['data'] as Map<String, dynamic>;
  }

  /// POST /auth/logout — best-effort server-side cookie clear.
  Future<void> logout() async {
    try {
      await _dioClient.authed.post('/auth/logout');
    } on DioException {
      // Best-effort only — device sign-out is local token deletion.
    }
  }
}
