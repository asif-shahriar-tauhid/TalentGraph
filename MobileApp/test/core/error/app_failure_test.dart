import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/core/error/app_failure.dart';

void main() {
  group('AppFailure', () {
    test('canceled message', () {
      const failure = AppFailureCanceled();
      expect(failure.message, 'Sign-in was cancelled.');
    });

    test('denied message', () {
      const failure = AppFailureDenied();
      expect(failure.message, 'Access denied by GitHub.');
    });

    test('expired message', () {
      const failure = AppFailureExpired();
      expect(failure.message, 'Session expired. Please sign in again.');
    });

    test('failed message', () {
      const failure = AppFailureFailed();
      expect(
        failure.message,
        'Sign-in failed. Check your GitHub account has a verified email.',
      );
    });

    test('accountUnavailable message', () {
      const failure = AppFailureAccountUnavailable();
      expect(failure.message, "This account can't sign in.");
    });

    test('accessDenied message', () {
      const failure = AppFailureAccessDenied();
      expect(failure.message, 'Access denied. Candidate accounts only.');
    });

    test('server message', () {
      const failure = AppFailureServer();
      expect(failure.message, 'Server error. Please try again later.');
    });

    test('network message', () {
      const failure = AppFailureNetwork();
      expect(failure.message, 'No internet connection. Please try again.');
    });

    test('unauthorized message', () {
      const failure = AppFailureUnauthorized();
      expect(failure.message, 'Session expired. Please sign in again.');
    });

    test('failures are distinct types', () {
      expect(AppFailureCanceled(), isNot(AppFailureDenied()));
      expect(AppFailureServer(), isNot(AppFailureNetwork()));
      expect(AppFailureUnauthorized(), isNot(AppFailureAccessDenied()));
    });
  });
}
