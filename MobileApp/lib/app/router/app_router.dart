import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/domain/user.dart';
import 'package:talentgraph/features/auth/presentation/auth_controller.dart';
import 'package:talentgraph/features/auth/presentation/auth_strings.dart';
import 'package:talentgraph/features/applications/presentation/applied_jobs_screen.dart';
import 'package:talentgraph/features/applications/presentation/skill_percentiles_screen.dart';
import 'package:talentgraph/features/shell/shell.dart';
import 'package:talentgraph/shared/widgets/primary_button.dart';
import 'package:talentgraph/shared/widgets/theme_toggle.dart';
import 'package:talentgraph/features/shell/job_detail_screen.dart';
import 'package:talentgraph/features/applications/presentation/review_application_screen.dart';
/// Notifier that GoRouter listens to for re-evaluating redirects
/// when auth state changes (cached session, fresh sign-in, sign-out).
class _AuthRefreshListenable extends Listenable {
  final _listeners = <VoidCallback>{};

  @override
  void addListener(VoidCallback listener) {
    _listeners.add(listener);
  }

  @override
  void removeListener(VoidCallback listener) {
    _listeners.remove(listener);
  }

  void notify() {
    for (final listener in _listeners.toList()) {
      listener();
    }
  }
}

final _authRefresh = _AuthRefreshListenable();

/// Redirect target for the given auth state and current location.
/// Returns `null` when no redirect is needed.
String? redirectFor(String currentLocation, AuthState authState) {
  final loggingIn =
      currentLocation == '/welcome' ||
          currentLocation == '/oauth' ||
          currentLocation == '/oauth-status';

  switch (authState) {
    case AuthBootstrapping():
      return loggingIn ? null : '/welcome';
    case AuthSignedOut():
      if (authState.notice != null) {
        return currentLocation == '/oauth-status' ? null : '/oauth-status';
      }
      return loggingIn ? null : '/welcome';
    case AuthSigningIn():
      return null;
    case AuthSignedIn():
      return loggingIn ? '/jobs' : null;
  }
}

final goRouterProvider = Provider<GoRouter>((ref) {
  // Re-create GoRouter when auth state changes so redirect re-evaluates.
  ref.watch(authControllerProvider);

  // Notify GoRouter's refreshListenable so redirect re-evaluates
  // even without a full GoRouter re-creation (e.g. cached session resolved,
  // OAuth completed, sign-out).
  ref.listen(authControllerProvider, (previous, next) {
    _authRefresh.notify();
  });

  return GoRouter(
    initialLocation: '/welcome',
    refreshListenable: _authRefresh,
    redirect: (context, state) {
      final authState = ref.read(authControllerProvider);
      return redirectFor(state.matchedLocation, authState);
    },
    routes: [
      GoRoute(
        path: '/welcome',
        builder: (context, state) => const WelcomeScreen(),
      ),
      GoRoute(
        path: '/oauth',
        builder: (context, state) => const OAuthCaptureScreen(),
      ),
      GoRoute(
        path: '/oauth-status',
        builder: (context, state) => const OAuthStatusScreen(),
      ),
      GoRoute(
        path: '/jobs',
        builder: (context, state) => const ShellScreen(tabIndex: 0),
      ),
      GoRoute(
        path: '/jobs/:id',
        builder: (context, state) =>
            JobDetailScreen(jobId: state.pathParameters['id']!),
      ),
      GoRoute(
        path: '/jobs/:id/apply',
        builder: (context, state) =>
            ReviewApplicationScreen(jobId: state.pathParameters['id']!),
      ),
      GoRoute(
        path: '/assessments',
        builder: (context, state) => const ShellScreen(tabIndex: 1),
      ),
      GoRoute(
        path: '/notifications',
        builder: (context, state) => const ShellScreen(tabIndex: 2),
      ),
      GoRoute(
        path: '/applied-jobs',
        builder: (context, state) => const AppliedJobsScreen(),
      ),
      GoRoute(
        path: '/applied-jobs/:id/percentiles',
        builder: (context, state) =>
            SkillPercentilesScreen(applicationId: state.pathParameters['id']!),
      ),
    ],
  );
});

class WelcomeScreen extends ConsumerWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    debugPrint('>>> 3. WelcomeScreen build | authState=$authState');
    final controller = ref.read(authControllerProvider.notifier);
    final tokens = Theme.of(context).extension<TgColors>()!;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Fixed header (code.html <header>)
            _buildHeader(context, tokens),
            // Scrollable main content (code.html <main class="pt-20">)
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.only(top: 80), // pt-20
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 320),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Badge + headline + subtitle
                        ..._buildBadgeAndHeadline(tokens),
                        const SizedBox(height: 32),
                        _buildAuthControl(context, ref, authState, controller),
                        const SizedBox(height: 12),
                        ..._buildPermissionsNote(tokens),
                        const SizedBox(height: 32),
                        ..._buildStepsSection(context, tokens),
                        const SizedBox(height: 24),
                        ..._buildAccordion(tokens),
                        const SizedBox(height: 24),
                        ..._buildFooter(tokens),
                        const SizedBox(height: 48), // pb-space-xl
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, TgColors tokens) {
    return Container(
      height: 104,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: tokens.canvas.withValues(alpha: 0.85),
        border: Border(
          bottom: BorderSide(
            color: tokens.border.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: tokens.brand,
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.4),
                      blurRadius: 4,
                      offset: const Offset(0, 1),
                    ),
                  ],
                ),
                child: Center(
                  child: Text(
                    'TG',
                    style: TextStyle(
                      color: tokens.onPrimary,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ),
              Text(
                'TalentGraph',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: tokens.text,
                  height: 1.25,
                ),
              ),
              Text(
                'Candidate Portal',
                style: TextStyle(fontSize: 12, color: tokens.textSecondary),
              ),
            ],
          ),
          const Spacer(),
          const AppearanceToggle(),
        ],
      ),
    );
  }

  List<Widget> _buildBadgeAndHeadline(TgColors tokens) {
    return [
      Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: tokens.surface,
          border: Border.all(
            color: tokens.border.withValues(alpha: 0.3),
            width: 1,
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 6,
              height: 6,
              decoration: BoxDecoration(
                color: tokens.brand,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 6),
            Flexible(
              child: Text(
                AuthStrings.directTechnicalHiring,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: tokens.text,
                ),
              ),
            ),
          ],
        ),
      ),
      const SizedBox(height: 12),
      SizedBox(
        width: double.infinity,
        child: Text(
          'Prove your skills. Find your next technical role.',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.bold,
            color: tokens.text,
            height: 1.25,
          ),
        ),
      ),
      const SizedBox(height: 8),
      Text(
        'Discover technical opportunities and demonstrate your skills through focused assessments.',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 14,
          color: tokens.textSecondary,
          height: 1.5,
        ),
      ),
    ];
  }

  List<Widget> _buildPermissionsNote(TgColors tokens) {
    return [
      Text(
        'Your account permissions and data access are handled transparently.',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 12,
          color: tokens.textSecondary,
          height: 1.5,
        ),
      ),
    ];
  }

  List<Widget> _buildStepsSection(BuildContext context, TgColors tokens) {
    return [
      Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.25),
              blurRadius: 4,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'How TalentGraph works',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: tokens.text,
              ),
            ),
            const SizedBox(height: 10),
            _buildStepItem(
              context,
              tokens,
              '01 · Discover Jobs',
              'Explore relevant technical opportunities.',
            ),
            _buildStepItem(
              context,
              tokens,
              '02 · Apply for Roles',
              'Review job requirements and submit applications.',
            ),
            _buildStepItem(
              context,
              tokens,
              '03 · Demonstrate Your Skills',
              'Complete scheduled technical assessments on mobile.',
            ),
          ],
        ),
      ),
    ];
  }

  Widget _buildStepItem(
      BuildContext context,
      TgColors tokens,
      String step,
      String desc,
      ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 16,
            height: 16,
            decoration: BoxDecoration(
              color: tokens.surface,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: SizedBox(
                width: 8,
                height: 8,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: tokens.brand,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text.rich(
                  TextSpan(
                    children: [
                      TextSpan(
                        text: step,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: tokens.text,
                        ),
                      ),
                      TextSpan(
                        text: ' $desc',
                        style: TextStyle(
                          fontSize: 12,
                          color: tokens.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildAccordion(TgColors tokens) {
    return [_buildWhyGitHubAccordion(tokens)];
  }

  Widget _buildWhyGitHubAccordion(TgColors tokens) {
    return ExpansionTile(
      backgroundColor: tokens.surfaceContainer,
      collapsedBackgroundColor: tokens.surfaceContainer,
      tilePadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      shape: const Border(),
      title: Row(
        children: [
          Icon(Icons.terminal, size: 18, color: tokens.brand),
          const SizedBox(width: 6),
          Expanded(
            child: Text(
              AuthStrings.whyGitHubRequired,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: tokens.text,
              ),
            ),
          ),
          const SizedBox(width: 6),
          Icon(Icons.expand_more, size: 18, color: tokens.textSecondary),
        ],
      ),
      children: [
        Container(
          padding: const EdgeInsets.only(
            top: 8,
            left: 12,
            right: 12,
            bottom: 4,
          ),
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(
                color: tokens.border.withValues(alpha: 0.2),
                width: 1,
              ),
            ),
          ),
          child: Text(
            AuthStrings.whyGitHubDesc,
            style: TextStyle(
              fontSize: 12,
              color: tokens.textSecondary,
              height: 1.5,
            ),
          ),
        ),
      ],
    );
  }

  List<Widget> _buildFooter(TgColors tokens) {
    return [
      Text(
        'Privacy Policy   •   Candidate Terms',
        style: TextStyle(fontSize: 12, color: tokens.textSecondary),
      ),
    ];
  }

  Widget _buildAuthControl(
      BuildContext context,
      WidgetRef ref,
      AuthState authState,
      AuthController controller,
      ) {
    switch (authState) {
      case AuthBootstrapping():
        return const Center(
          child: SizedBox(
            height: 20,
            width: 20,
            child: CircularProgressIndicator(strokeWidth: 2),
          ),
        );
      case AuthSignedOut():
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (authState.notice != null) ...[
              Text(
                authState.notice!,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14,
                  color: Theme.of(context).extension<TgColors>()!.textSecondary,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 16),
            ],
            PrimaryButton(
              label: AuthStrings.continueWithGitHub,
              leading: const Icon(Icons.login, size: 20),
              trailing: const Icon(Icons.arrow_forward, size: 18),
              onPressed: () => controller.signIn(),
            ),
            if (kDebugMode) ...[
              const SizedBox(height: 8),
              OutlinedButton(
                onPressed: () {
                  controller.setStateForTesting(
                    const AuthSignedIn(
                      TalentGraphUser(
                        id: 'debug_1',
                        name: 'Debug User',
                        email: 'debug@example.com',
                        role: 'CANDIDATE',
                        status: 'ACTIVE',
                        imageUrl: null,
                      ),
                    ),
                  );
                },
                child: const Text(AuthStrings.devBypassJobs),
              ),
            ],
          ],
        );
      case AuthSigningIn():
        return PrimaryButton(
          label: AuthStrings.signingIn,
          loading: true,
          onPressed: null,
        );
      case AuthSignedIn():
        return const SizedBox.shrink();
    }
  }
}

class OAuthCaptureScreen extends ConsumerWidget {
  const OAuthCaptureScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    final controller = ref.read(authControllerProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('TalentGraph'),
        actions: [const AppearanceToggle()],
      ),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 320),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.link_off, size: 48),
              const SizedBox(height: 16),
              const Text(
                'Connecting to GitHub…',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              const Text(
                'Your GitHub connection is being established.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: Colors.grey),
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: PrimaryButton(
                  label: 'Retry',
                  onPressed: () => controller.signIn(),
                  loading: authState is AuthSigningIn,
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }
}

class OAuthStatusScreen extends ConsumerWidget {
  const OAuthStatusScreen({super.key, this.onHelpCenterTap});

  final VoidCallback? onHelpCenterTap;

  static const String kCandidateHelpCenterRoute = '/candidate-help-center';

  void _handleHelpCenterTap(BuildContext context) {
    if (onHelpCenterTap != null) {
      onHelpCenterTap!();
      return;
    }
    showDialog<void>(
      context: context,
      builder:
          (dialogContext) => AlertDialog(
        title: const Text('Need help?'),
        content: const Text(AuthStrings.helpSupportDialogMessage),
        actions: [
          TextButton(
            onPressed: () {
              Clipboard.setData(
                const ClipboardData(text: 'talentgraph@gmail.com'),
              );
              Navigator.of(dialogContext).pop();
            },
            child: const Text('Copy Email'),
          ),
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    final controller = ref.read(authControllerProvider.notifier);
    final tokens = Theme.of(context).extension<TgColors>()!;

    final String notice;
    if (authState is AuthSignedOut && authState.notice != null) {
      notice = authState.notice!;
    } else {
      notice = AuthStrings.stateMismatch;
    }

    final title = AuthStrings.titleForNotice(notice);

    return Scaffold(
      body: Column(
        children: [
          // Custom header (code.html <header>) — distinct from welcome screen header
          _buildOAuthHeader(context, tokens),
          // Scrollable body
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.only(top: 72),
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  maxWidth: 320,
                  minHeight: MediaQuery.of(context).size.height - 72,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // Circular badge with link_off icon
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: tokens.surfaceContainer,
                        border: Border.all(color: tokens.border, width: 1),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.link_off,
                        size: 24,
                        color: tokens.brand,
                      ),
                    ),
                    const SizedBox(height: 12),
                    // Status pill: Connection Paused
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: tokens.surfaceContainer,
                        border: Border.all(color: tokens.border, width: 1),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: 6,
                            height: 6,
                            decoration: BoxDecoration(
                              color: tokens.brand,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Flexible(
                            child: Text(
                              AuthStrings.connectionPaused,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w500,
                                color: tokens.textSecondary,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Title
                    Text(
                      title,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    // Description / notice
                    Text(
                      AuthStrings.descriptionForNotice(notice),
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 14,
                        color: tokens.textSecondary,
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Accordion: Why does TalentGraph use GitHub?
                    _buildWhyGitHubAccordionCancelled(tokens),
                    const SizedBox(height: 24),
                    // Retry with GitHub button
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: PrimaryButton(
                        label: AuthStrings.retryWithGitHub,
                        leading: const Icon(Icons.login, size: 20),
                        trailing: const Icon(Icons.arrow_forward, size: 18),
                        onPressed:
                            () =>
                            ref
                                .read(authControllerProvider.notifier)
                                .signIn(),
                      ),
                    ),
                    const SizedBox(height: 12),
                    // Back to Welcome button (outline style)
                    OutlinedButton(
                      onPressed: () {
                        controller.resetToSignedOut();
                        context.go('/welcome');
                      },
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size(double.infinity, 48),
                        side: BorderSide(color: tokens.border, width: 1),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.max,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.arrow_back, size: 18),
                          const SizedBox(width: 6),
                          Flexible(
                            child: Text(
                              AuthStrings.backToWelcome,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Footer help link
                    GestureDetector(
                      onTap: () => _handleHelpCenterTap(context),
                      child: RichText(
                        text: TextSpan(
                          style: TextStyle(
                            fontSize: 12,
                            color: tokens.textSecondary,
                          ),
                          children: [
                            TextSpan(text: AuthStrings.footerHelpPrefix),
                            TextSpan(
                              text: AuthStrings.footerHelpLink,
                              style: TextStyle(
                                color: tokens.brand,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOAuthHeader(BuildContext context, TgColors tokens) {
    return Container(
      height: 104,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: tokens.canvas.withValues(alpha: 0.85),
        border: Border(
          bottom: BorderSide(
            color: tokens.border.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'TalentGraph',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 2),
              Text(
                'Find your next technical role',
                style: TextStyle(fontSize: 12, color: tokens.textSecondary),
              ),
            ],
          ),
          const Spacer(),
          const AppearanceToggle(),
        ],
      ),
    );
  }

  Widget _buildWhyGitHubAccordionCancelled(TgColors tokens) {
    return ExpansionTile(
      backgroundColor: tokens.surfaceContainer,
      collapsedBackgroundColor: tokens.surfaceContainer,
      tilePadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      shape: const Border(),
      title: Row(
        children: [
          Icon(Icons.help_outline, size: 18, color: tokens.brand),
          const SizedBox(width: 6),
          Expanded(
            child: Text(
              AuthStrings.whyGitHubRequiredCancelled,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: tokens.text,
              ),
            ),
          ),
        ],
      ),
      children: [
        Container(
          padding: const EdgeInsets.only(
            top: 8,
            left: 12,
            right: 12,
            bottom: 4,
          ),
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(
                color: tokens.border.withValues(alpha: 0.2),
                width: 1,
              ),
            ),
          ),
          child: Text(
            AuthStrings.whyGitHubDescCancelled,
            style: TextStyle(
              fontSize: 12,
              color: tokens.textSecondary,
              height: 1.5,
            ),
          ),
        ),
      ],
    );
  }
}