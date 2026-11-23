import 'dart:convert';
import 'dart:math';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'package:talentgraph/core/error/app_failure.dart';
import 'package:talentgraph/core/storage/token_store.dart';
import 'package:talentgraph/features/auth/data/auth_api.dart';

const _callbackScheme = 'talentgraph';

class AuthRepository {
  AuthRepository({
    required this.api,
    required this.tokenStore,
    Future<String> Function(String url, String scheme)? authenticate,
  }) : _authenticate = authenticate ?? _defaultAuthenticate;

  static Future<String> _defaultAuthenticate(String url, String scheme) =>
      FlutterWebAuth2.authenticate(url: url, callbackUrlScheme: scheme);

  final AuthApi api;
  final TokenStore tokenStore;
  final Future<String> Function(String url, String scheme) _authenticate;

  String? _pendingState;

  /// Generate a fresh random state for this attempt.
  String _newState() {
    final values = List<int>.generate(32, (i) => Random.secure().nextInt(256));
    return base64Url.encode(values);
  }

  /// Map a DioException to an AppFailure per contract §6.
  AppFailure _mapDioException(DioException e) {
    final statusCode = e.response?.statusCode;

    switch (e.type) {
      case DioExceptionType.cancel:
        return const AppFailureCanceled();
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.unknown:
        return const AppFailureNetwork();
      case DioExceptionType.badResponse:
        switch (statusCode) {
          case 401:
            return const AppFailureUnauthorized();
          case 403:
            return const AppFailureAccessDenied();
          case 429:
            return const AppFailureServer();
          case 500:
          case 502:
          case 503:
          case 504:
            return const AppFailureServer();
          case 400:
            return const AppFailureFailed();
          default:
            return const AppFailureServer();
        }
      default:
        return const AppFailureServer();
    }
  }

  /// Parse query parameters from the callback URL.
  Map<String, String> _parseCallback(String url) {
    final uri = Uri.parse(url);
    return {for (final e in uri.queryParameters.entries) e.key: e.value};
  }

  /// Detect explicit user cancellation from the system browser.
  /// `flutter_web_auth_2` throws an exception when the user closes the
  /// browser / taps back without completing the OAuth flow.
  bool _isUserCancellation(Object e) {
    final text = e.toString().toLowerCase();
    return text.contains('canceled') ||
        text.contains('cancelled') ||
        text.contains('user cancelled');
  }

  /// Full sign-in flow: get authorize URL → open system browser → verify state →
  /// exchange code → return {user, accessToken, refreshToken}.
  Future<AuthResult> signIn() async {
    try {
      _pendingState = _newState();

      String authUrl;
      try {
        authUrl = await api.getAuthorizeUrl(_pendingState!);
      } on DioException catch (e) {
        if (kDebugMode) {
          debugPrint(
            'AuthRepository.getAuthorizeUrl failed: uri=${e.requestOptions.uri} status=${e.response?.statusCode} type=${e.type}',
          );
        }
        return AuthFailure(_mapDioException(e));
      }

      final callbackUrl = await _authenticate(authUrl, _callbackScheme);

      final params = _parseCallback(callbackUrl);

      // GitHub may return an error directly (e.g. access_denied).
      final error = params['error'];
      if (error != null) {
        if (error == 'access_denied') {
          return const AuthFailure(AppFailureDenied());
        }
        return const AuthFailure(AppFailureFailed());
      }

      final code = params['code'];
      final returnedState = params['state'];

      // State must match exactly — reject on missing/mismatch.
      if (code == null ||
          returnedState == null ||
          returnedState != _pendingState) {
        return const AuthFailure(AppFailureExpired());
      }

      _pendingState = null;

      Map<String, dynamic> data;
      try {
        data = await api.exchangeCode(code);
      } on DioException catch (e) {
        if (kDebugMode) {
          debugPrint(
            'AuthRepository.exchangeCode HTTP ${e.response?.statusCode}',
          );
        }
        return AuthFailure(_mapDioException(e));
      }

      return AuthSuccess(
        user: data['user'] as Map<String, dynamic>,
        accessToken: data['accessToken'] as String,
        refreshToken: data['refreshToken'] as String,
      );
    } on DioException catch (e) {
      return AuthFailure(_mapDioException(e));
    } on Exception catch (e) {
      // Check if this is an explicit user cancellation from the system browser.
      if (_isUserCancellation(e)) {
        _pendingState = null;
        return const AuthCancelled();
      }
      debugPrint('AuthRepository.signIn error: ${e.runtimeType}');
      return const AuthFailure(AppFailureFailed());
    }
  }

  /// Store tokens from a successful sign-in.
  Future<void> storeTokens({
    required String accessToken,
    required String refreshToken,
  }) async {
    await tokenStore.writeAccessToken(accessToken);
    await tokenStore.writeRefreshToken(refreshToken);
  }

  /// Read stored tokens.
  Future<StoredTokens?> readStoredTokens() async {
    final access = await tokenStore.readAccessToken();
    final refresh = await tokenStore.readRefreshToken();
    if (access == null || refresh == null) return null;
    return StoredTokens(accessToken: access, refreshToken: refresh);
  }

  /// Clear all tokens (sign out).
  Future<void> clearTokens() async {
    await tokenStore.clearAll();
  }

  /// Call POST /auth/logout best-effort, then clear local tokens.
  Future<void> signOut() async {
    await api.logout();
    await tokenStore.clearAll();
  }
}

sealed class AuthResult {
  const AuthResult();
}

class AuthSuccess extends AuthResult {
  const AuthSuccess({
    required this.user,
    required this.accessToken,
    required this.refreshToken,
  }) : super();

  final Map<String, dynamic> user;
  final String accessToken;
  final String refreshToken;
}

class AuthFailure extends AuthResult {
  const AuthFailure(this.failure) : super();

  final AppFailure failure;
}

class AuthCancelled extends AuthResult {
  const AuthCancelled() : super();
}

class StoredTokens {
  const StoredTokens({required this.accessToken, required this.refreshToken});

  final String accessToken;
  final String refreshToken;
}
