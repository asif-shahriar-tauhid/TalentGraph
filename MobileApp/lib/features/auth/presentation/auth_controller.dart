import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/core/error/app_failure.dart';
import 'package:talentgraph/core/network/dio_client.dart';
import 'package:talentgraph/core/storage/token_store.dart';
import 'package:talentgraph/features/auth/data/auth_api.dart';
import 'package:talentgraph/features/auth/data/auth_repository.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/domain/user.dart';
import 'package:talentgraph/features/auth/presentation/auth_strings.dart';

final tokenStoreProvider = Provider<TokenStore>((ref) {
  return SecureTokenStore(storage: FlutterSecureStorage());
});

final authControllerProvider = NotifierProvider<AuthController, AuthState>(
  AuthController.new,
);

class AuthController extends Notifier<AuthState> implements AuthRefreshHandler {
  late final AuthRepository _repository;
  bool _bootstrapped = false;

  /// Exposed for testing only.
  AuthRepository get repository => _repository;

  /// Exposed for testing only.
  void setRepositoryForTesting(AuthRepository repo) {
    _repository = repo;
  }

  /// Exposed for testing only.
  void setStateForTesting(AuthState newState) {
    state = newState;
  }

  /// Clears any stale notice and returns to unauthenticated state,
  /// e.g. when the user taps "Back to welcome" from an error screen.
  void resetToSignedOut() {
    state = const AuthSignedOut();
  }

  @override
  AuthState build() {
    _init();
    return const AuthBootstrapping();
  }

  Future<void> _init() async {
    final tokenStore = ref.read(tokenStoreProvider);
    _repository = _createRepository(tokenStore);
    await bootstrap();
  }

  /// Creates the repository — overridden in tests to inject a fake API.
  AuthRepository _createRepository(TokenStore tokenStore) {
    final dioClient = DioClient(tokenStore: tokenStore, refreshHandler: this);
    return AuthRepository(api: AuthApi(dioClient), tokenStore: tokenStore);
  }

  @override
  Future<String?> get accessToken async {
    final tokens = await _repository.readStoredTokens();
    return tokens?.accessToken;
  }

  @override
  Future<void> onUnauthorized() async {
    // Refresh itself failed — force sign out, clear tokens.
    await _repository.clearTokens();
    _bootstrapped = false;
    state = const AuthSignedOut(notice: AuthStrings.unauthorized);
  }

  /// Cold start: read stored tokens, validate via /auth/me, role check.
  Future<void> bootstrap() async {
    if (_bootstrapped) return;
    _bootstrapped = true;

    final tokens = await _repository.readStoredTokens();
    if (tokens == null) {
      state = const AuthSignedOut();
      return;
    }

    try {
      final userMap = await _repository.api.getMe();
      final user = TalentGraphUser.fromMap(userMap);
      if (!user.isCandidate) {
        await _repository.clearTokens();
        state = const AuthSignedOut(notice: AuthStrings.accessDenied);
        return;
      }
      state = AuthSignedIn(user);
    } on DioException catch (e) {
      final failure = mapDioException(e);
      await _repository.clearTokens();
      state = AuthSignedOut(notice: noticeFor(failure));
    } on Exception catch (e) {
      debugPrint('AuthController.bootstrap error: ${e.runtimeType}');
      await _repository.clearTokens();
      state = const AuthSignedOut(notice: AuthStrings.failed);
    }
  }

  /// GitHub OAuth flow: authorize URL → system browser → verify state →
  /// exchange code → store tokens → role check → signed in.
  Future<void> signIn() async {
    state = const AuthSigningIn();

    final result = await _repository.signIn();

    switch (result) {
      case AuthSuccess(:final user, :final accessToken, :final refreshToken):
        await _repository.storeTokens(
          accessToken: accessToken,
          refreshToken: refreshToken,
        );
        final u = TalentGraphUser.fromMap(user);
        if (!u.isCandidate) {
          await _repository.clearTokens();
          state = const AuthSignedOut(notice: AuthStrings.accessDenied);
          return;
        }
        state = AuthSignedIn(u);
      case AuthFailure(:final failure):
        state = AuthSignedOut(notice: noticeFor(failure));
      case AuthCancelled():
        state = const AuthSignedOut(notice: AuthStrings.userCancelled);
    }
  }

  /// Sign out: best-effort server logout + local token clear.
  Future<void> signOut() async {
    await _repository.signOut();
    state = const AuthSignedOut();
  }

  /// Map a DioException to an AppFailure per contract §6.
  AppFailure mapDioException(DioException e) {
    final response = e.response;
    final statusCode = response?.statusCode;

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

  String noticeFor(AppFailure failure) {
    switch (failure) {
      case AppFailureCanceled():
        return AuthStrings.cancelled;
      case AppFailureDenied():
        return AuthStrings.denied;
      case AppFailureExpired():
        return AuthStrings.expired;
      case AppFailureFailed():
        return AuthStrings.failed;
      case AppFailureAccountUnavailable():
        return AuthStrings.accountUnavailable;
      case AppFailureAccessDenied():
        return AuthStrings.accessDenied;
      case AppFailureServer():
        return AuthStrings.server;
      case AppFailureNetwork():
        return AuthStrings.network;
      case AppFailureUnauthorized():
        return AuthStrings.unauthorized;
    }
  }
}
