import 'package:flutter/material.dart';

class AuthStrings {
  static const String continueWithGitHub = 'Continue with GitHub';
  static const String signingIn = 'Signing in…';
  static const String cancelled = 'Sign-in cancelled.';
  static const String cancelledTitle = 'Authorization Cancelled';
  static const String denied = 'Access denied by GitHub.';
  static const String expired = 'Session expired. Please sign in again.';
  static const String failed =
      'Sign-in failed. Check your GitHub account has a verified email.';
  static const String accountUnavailable = 'This account can\'t sign in.';
  static const String accessDenied = 'Access denied. Candidate accounts only.';
  static const String server = 'Server error. Please try again later.';
  static const String network = 'No internet connection. Please try again.';
  static const String unauthorized = 'Session expired. Please sign in again.';
  static const String stateMismatch =
      'Security check failed. Please try signing in again.';
  static const String userCancelled = 'Sign-in was cancelled.';

  static const String devBypassJobs = 'Dev: Bypass to Jobs Preview';

  static const String directTechnicalHiring = 'Direct Technical Hiring';
  static const String permissionsNote =
      'Your account permissions and data access are handled transparently.';
  static const String howTalentGraphWorks = 'How TalentGraph works';
  static const String step1Title = 'Discover Jobs';
  static const String step1Desc = 'Explore relevant technical opportunities.';
  static const String step2Title = 'Apply for Roles';
  static const String step2Desc =
      'Review job requirements and submit applications.';
  static const String step3Title = 'Demonstrate Your Skills';
  static const String step3Desc =
      'Complete scheduled technical assessments on mobile.';
  static const String whyGitHubRequired = 'Why is GitHub required?';
  static const String whyGitHubDesc =
      'Engineering roles require concrete implementation proof. Linking GitHub helps corroborate development activity and codebase ownership with transparent, read-only permissions.';
  // Cancelled screen accordion copy (different from welcome screen)
  static const String whyGitHubRequiredCancelled =
      'Why does TalentGraph use GitHub?';
  static const String whyGitHubDescCancelled =
      'TalentGraph uses public GitHub activity to corroborate technical skills objectively and match you with relevant roles.';
  static const String connectionPaused = 'CONNECTION PAUSED';
  static const String retryWithGitHub = 'Retry with GitHub';
  static const String backToWelcome = 'Back to Welcome';
  static const String footerHelpPrefix = 'Need help? Visit the ';
  static const String footerHelpLink = 'Candidate Help Center.';
  static const String privacyPolicy = 'Privacy Policy';
  static const String candidateTerms = 'Candidate Terms';

  static const String cancelledDescription =
      'Your GitHub connection was not completed. You can try again whenever you\'re ready.';

  static String titleForNotice(String notice) {
    switch (notice) {
      case cancelled:
        return cancelledTitle;
      case userCancelled:
        return cancelledTitle;
      case denied:
        return 'Access Denied by GitHub';
      case expired:
        return 'Session Expired';
      case failed:
        return 'Sign-in Failed';
      case accountUnavailable:
        return 'Account Unavailable';
      case accessDenied:
        return 'Access Denied';
      case server:
        return 'Server Error';
      case network:
        return 'No Internet Connection';
      case stateMismatch:
        return 'Security Check Failed';
      default:
        return 'Something went wrong';
    }
  }

  static String descriptionForNotice(String notice) {
    switch (notice) {
      case cancelled:
      case userCancelled:
        return cancelledDescription;
      default:
        return notice;
    }
  }

  static IconData iconForNotice(String notice) {
    switch (notice) {
      case cancelled:
        return Icons.error_outline;
      case denied:
        return Icons.block;
      case expired:
        return Icons.schedule;
      case failed:
        return Icons.error;
      case accountUnavailable:
        return Icons.person_off;
      case accessDenied:
        return Icons.lock;
      case server:
        return Icons.cloud_off;
      case network:
        return Icons.wifi_off;
      case stateMismatch:
        return Icons.error;
      default:
        return Icons.error;
    }
  }
}
