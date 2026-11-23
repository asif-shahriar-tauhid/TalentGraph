import 'dart:async';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/core/config/app_config.dart';
import 'package:talentgraph/core/storage/token_store.dart';

// Status code → AppFailure mapping per docs/api/auth-contract.md §6.
// The backend error envelope carries no semantic code — only HTTP status — so
// this mapping is the single source of truth. Observed facts (observed-responses.md)
// win over any proposal; the controller relies on distinguishing these.
//
//  401   → unauthorized        (on /auth/me: triggers refresh; if refresh fails → clear tokens)
//  403   → accessDenied        (role ≠ CANDIDATE) / accountUnavailable (blocked/deleted)
//  429   → server              (rate-limited; no dedicated failure type exists)
//  5xx   → server
//  400   → failed              (mapped by caller based on endpoint context)
//  timeout/no connection → network
//  DioException.cancel → canceled
//
// DioClient itself only handles 401 (single-flight refresh). All other status
// codes are mapped to AppFailure by the auth controller in T04.

abstract class AuthRefreshHandler {
  Future<String?> get accessToken;
  Future<void> onUnauthorized();
}

class DioClient {
  DioClient({required this.tokenStore, required this.refreshHandler}) {
    _setupPlain();
    _setupAuthed();
  }

  final TokenStore tokenStore;
  final AuthRefreshHandler refreshHandler;

  final Dio plain = Dio();
  final Dio authed = Dio();

  bool _refreshing = false;
  Completer<void>? _refreshCompleter;

  void _setupPlain() {
    plain.options
      ..baseUrl = AppConfig.apiBaseUrl
      ..connectTimeout = const Duration(seconds: 10)
      ..receiveTimeout = const Duration(seconds: 10)
      ..sendTimeout = const Duration(seconds: 10)
      ..headers = {'Accept': 'application/json'};

    plain.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          _logRequest(options);
          return handler.next(options);
        },
      ),
    );
  }

  void _setupAuthed() {
    authed.options
      ..baseUrl = AppConfig.apiBaseUrl
      ..connectTimeout = const Duration(seconds: 10)
      ..receiveTimeout = const Duration(seconds: 10)
      ..sendTimeout = const Duration(seconds: 10)
      ..headers = {'Accept': 'application/json'};

    authed.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          _logRequest(options);
          final token = await refreshHandler.accessToken;
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onResponse: (response, handler) {
          _unwrapResponse(response, handler);
        },
        onError: (error, handler) async {
          await _handleAuthedError(error, handler);
        },
      ),
    );
  }

  void _logRequest(RequestOptions options) {
    final headers = Map<String, dynamic>.from(options.headers);
    headers.remove('Authorization');
  }

  void _unwrapResponse(Response response, ResponseInterceptorHandler handler) {
    final data = response.data;
    if (data is Map<String, dynamic> &&
        data['success'] == true &&
        data.containsKey('data')) {
      return handler.resolve(
        Response(
          data: data['data'],
          requestOptions: response.requestOptions,
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          headers: response.headers,
        ),
      );
    }
    return handler.next(response);
  }

  Future<void> _handleAuthedError(
    DioException error,
    ErrorInterceptorHandler handler,
  ) async {
    final response = error.response;
    if (response == null) {
      return handler.next(error);
    }

    final statusCode = response.statusCode ?? 0;

    if (statusCode == 401) {
      await performSingleFlightRefresh();
      final newToken = await refreshHandler.accessToken;
      if (newToken != null) {
        final opts = error.requestOptions;
        opts.headers['Authorization'] = 'Bearer $newToken';
        try {
          final retry = await authed.fetch(opts);
          return handler.resolve(retry);
        } catch (e) {
          return handler.next(e as DioException);
        }
      } else {
        await refreshHandler.onUnauthorized();
        return handler.next(error);
      }
    }

    return handler.next(error);
  }

  Future<void> performSingleFlightRefresh() async {
    if (_refreshing) {
      await _refreshCompleter?.future;
      return;
    }

    _refreshing = true;
    _refreshCompleter = Completer<void>();
    try {
      final refreshToken = await tokenStore.readRefreshToken();
      if (refreshToken == null) {
        await refreshHandler.onUnauthorized();
        return;
      }

      try {
        final response = await plain.post(
          '/auth/refresh-token',
          data: {'refreshToken': refreshToken},
        );
        final envelope = response.data as Map<String, dynamic>;
        final responseData = envelope['data'] as Map<String, dynamic>;
        final accessToken = responseData['accessToken'] as String?;
        final newRefreshToken = responseData['refreshToken'] as String?;

        if (accessToken != null) {
          await tokenStore.writeAccessToken(accessToken);
        }
        if (newRefreshToken != null) {
          await tokenStore.writeRefreshToken(newRefreshToken);
        }
      } catch (_) {
        await tokenStore.clearAll();
        await refreshHandler.onUnauthorized();
      }
    } finally {
      _refreshing = false;
      _refreshCompleter?.complete();
      _refreshCompleter = null;
    }
  }
}

final dioClientProvider = Provider<DioClient>((ref) {
  throw UnimplementedError(
    'dioClientProvider must be overridden with a real TokenStore and AuthRefreshHandler',
  );
});
