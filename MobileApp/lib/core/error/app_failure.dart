import 'dart:core';

sealed class AppFailure {
  const AppFailure();

  String get message;
}

class AppFailureCanceled extends AppFailure {
  const AppFailureCanceled();
  @override
  String get message => 'Sign-in was cancelled.';
}

class AppFailureDenied extends AppFailure {
  const AppFailureDenied();
  @override
  String get message => 'Access denied by GitHub.';
}

class AppFailureExpired extends AppFailure {
  const AppFailureExpired();
  @override
  String get message => 'Session expired. Please sign in again.';
}

class AppFailureFailed extends AppFailure {
  const AppFailureFailed();
  @override
  String get message =>
      'Sign-in failed. Check your GitHub account has a verified email.';
}

class AppFailureAccountUnavailable extends AppFailure {
  const AppFailureAccountUnavailable();
  @override
  String get message => 'This account can\'t sign in.';
}

class AppFailureAccessDenied extends AppFailure {
  const AppFailureAccessDenied();
  @override
  String get message => 'Access denied. Candidate accounts only.';
}

class AppFailureServer extends AppFailure {
  const AppFailureServer();
  @override
  String get message => 'Server error. Please try again later.';
}

class AppFailureNetwork extends AppFailure {
  const AppFailureNetwork();
  @override
  String get message => 'No internet connection. Please try again.';
}

class AppFailureUnauthorized extends AppFailure {
  const AppFailureUnauthorized();
  @override
  String get message => 'Session expired. Please sign in again.';
}
