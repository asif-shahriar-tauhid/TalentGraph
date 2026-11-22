import 'package:talentgraph/features/auth/domain/user.dart';

sealed class AuthState {
  const AuthState();
}

class AuthBootstrapping extends AuthState {
  const AuthBootstrapping() : super();
}

class AuthSignedOut extends AuthState {
  const AuthSignedOut({this.notice}) : super();

  final String? notice;
}

class AuthSigningIn extends AuthState {
  const AuthSigningIn() : super();
}

class AuthSignedIn extends AuthState {
  const AuthSignedIn(this.user) : super();

  final TalentGraphUser user;
}
