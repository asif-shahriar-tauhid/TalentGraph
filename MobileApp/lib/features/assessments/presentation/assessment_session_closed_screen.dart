import 'package:flutter/material.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';

@immutable
class AssessmentSessionClosedData {
  const AssessmentSessionClosedData({
    required this.assessmentId,
    required this.title,
    required this.subtitle,
    required this.companyName,
    required this.isCompanyVerified,
    required this.roleTitle,
    required this.sessionTimeLabel,
    required this.scopeLabel,
    required this.supportNotice,
    this.coordinatorEmail = 'recruiting@aethertelemetry.io',
  });

  final String assessmentId;
  final String title;
  final String subtitle;
  final String companyName;
  final bool isCompanyVerified;
  final String roleTitle;
  final String sessionTimeLabel;
  final String scopeLabel;
  final String supportNotice;
  final String coordinatorEmail;
}

/// Sample data matching the TalentGraph Assessment Session Closed screen.
abstract final class TalentGraphSessionClosedSampleData {
  static const AssessmentSessionClosedData sample = AssessmentSessionClosedData(
    assessmentId: 'assess-1',
    title: 'Assessment Session Closed',
    subtitle:
        'The scheduled assessment session has ended. New attempts cannot be initiated.',
    companyName: 'Aether Telemetry Systems',
    isCompanyVerified: true,
    roleTitle: 'Staff Distributed Systems Engineer - High Throughput Telemetry',
    sessionTimeLabel: 'Oct 29, 2026 · 14:00 UTC',
    scopeLabel: '7 Technical Prompts · 45 min',
    supportNotice:
        'Need assistance or have scheduling questions? Contact the recruiting coordinator.',
  );
}

class AssessmentSessionClosedScreen extends StatelessWidget {
  const AssessmentSessionClosedScreen({
    super.key,
    this.data = TalentGraphSessionClosedSampleData.sample,
    this.onBackToAssessments,
    this.onReturnToJobsDiscovery,
    this.appBar,
    this.onContactCoordinator,
  });

  final AssessmentSessionClosedData data;
  final VoidCallback? onBackToAssessments;
  final VoidCallback? onReturnToJobsDiscovery;

  /// Plug in your shared `TgAppBar` here.
  final PreferredSizeWidget? appBar;
  final VoidCallback? onContactCoordinator;

  void _handleBackToAssessments(BuildContext context) {
    if (onBackToAssessments != null) {
      onBackToAssessments!();
      return;
    }
    Navigator.of(context).maybePop();
  }

  void _handleReturnToJobs(BuildContext context) {
    if (onReturnToJobsDiscovery != null) {
      onReturnToJobsDiscovery!();
      return;
    }
    Navigator.of(context).popUntil((route) => route.isFirst);
  }

  void _handleContactCoordinator(BuildContext context) {
    if (onContactCoordinator != null) {
      onContactCoordinator!();
      return;
    }
    final palette = TalentGraphPalette.of(context);
    showDialog<void>(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          backgroundColor: palette.surface,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
            side: BorderSide(color: palette.subtleBorder, width: 1),
          ),
          title: Text(
            'Recruiting Coordinator',
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 16.5,
              fontWeight: FontWeight.w700,
            ),
          ),
          content: Text(
            'For rescheduling or technical assistance with ${data.companyName}, reach out to:\n\n${data.coordinatorEmail}',
            style: TextStyle(
              color: palette.textSecondary,
              fontSize: 13,
              height: 1.45,
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(),
              child: Text(
                'Close',
                style: TextStyle(
                  color: palette.accent,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final softAccentIconColor = palette.accent.withAlpha(isDark ? 215 : 230);

    return Scaffold(
      backgroundColor: palette.background,
      appBar: appBar,
      body: SafeArea(
        top: appBar == null,
        child: Align(
          alignment: Alignment.topCenter,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 640),
            child: ListView(
              physics: const AlwaysScrollableScrollPhysics(
                parent: BouncingScrollPhysics(),
              ),
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 28),
              children: [
                Align(
                  alignment: Alignment.centerLeft,
                  child: InkWell(
                    onTap: () => _handleBackToAssessments(context),
                    borderRadius: BorderRadius.circular(6),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 2,
                        vertical: 4,
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.arrow_back_rounded,
                            size: 16,
                            color: palette.textSecondary,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            'Assessments',
                            style: TextStyle(
                              color: palette.textSecondary,
                              fontSize: 13.5,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 22),
                Center(
                  child: Container(
                    width: 52,
                    height: 52,
                    decoration: BoxDecoration(
                      color: palette.surfaceElevated,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: palette.border, width: 1),
                    ),
                    child: Icon(
                      Icons.event_busy_outlined,
                      size: 24,
                      color: softAccentIconColor,
                    ),
                  ),
                ),
                const SizedBox(height: 18),
                Text(
                  data.title,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: palette.textPrimary,
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.4,
                  ),
                ),
                const SizedBox(height: 8),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Text(
                    data.subtitle,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: palette.textMuted,
                      fontSize: 13.5,
                      height: 1.45,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                _ClosedSessionSummaryCard(
                  data: data,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 22),
                _PrimarySessionButton(
                  icon: Icons.assignment_turned_in_outlined,
                  label: 'Back to Assessments',
                  onPressed: () => _handleBackToAssessments(context),
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 12),
                _SecondarySessionButton(
                  icon: Icons.explore_outlined,
                  label: 'Return to Jobs Discovery',
                  onPressed: () => _handleReturnToJobs(context),
                  palette: palette,
                ),
                const SizedBox(height: 22),
                Center(
                  child: InkWell(
                    onTap: () => _handleContactCoordinator(context),
                    borderRadius: BorderRadius.circular(8),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      child: Text(
                        data.supportNotice,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: palette.textMuted,
                          fontSize: 12,
                          height: 1.45,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ClosedSessionSummaryCard extends StatelessWidget {
  const _ClosedSessionSummaryCard({
    required this.data,
    required this.palette,
    required this.isDark,
  });

  final AssessmentSessionClosedData data;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final verifiedColor =
        isDark ? const Color(0xFF34D399) : const Color(0xFF059669);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              if (data.isCompanyVerified) ...[
                Icon(Icons.verified_outlined, size: 14, color: verifiedColor),
                const SizedBox(width: 6),
              ],
              Expanded(
                child: Text(
                  data.companyName,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: palette.textMuted,
                    fontSize: 12.5,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            data.roleTitle,
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 16,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.2,
              height: 1.35,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 14),
            child: Divider(
              height: 1,
              thickness: 1,
              color: palette.subtleBorder,
            ),
          ),
          _SessionDetailRow(
            icon: Icons.event_note_outlined,
            label: 'Session',
            value: data.sessionTimeLabel,
            palette: palette,
          ),
          const SizedBox(height: 10),
          _SessionDetailRow(
            icon: Icons.timer_outlined,
            label: 'Scope',
            value: data.scopeLabel,
            palette: palette,
          ),
        ],
      ),
    );
  }
}

class _SessionDetailRow extends StatelessWidget {
  const _SessionDetailRow({
    required this.icon,
    required this.label,
    required this.value,
    required this.palette,
  });

  final IconData icon;
  final String label;
  final String value;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 15, color: palette.textMuted),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(
                color: palette.textMuted,
                fontSize: 12.5,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 12.5,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }
}

class _PrimarySessionButton extends StatelessWidget {
  const _PrimarySessionButton({
    required this.icon,
    required this.label,
    required this.onPressed,
    required this.palette,
    required this.isDark,
  });

  final IconData icon;
  final String label;
  final VoidCallback onPressed;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final foreground = isDark ? const Color(0xFF14110F) : Colors.white;

    return SizedBox(
      width: double.infinity,
      height: 48,
      child: Material(
        color: palette.accent,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(12),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 17, color: foreground),
              const SizedBox(width: 8),
              Text(
                label,
                style: TextStyle(
                  color: foreground,
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.1,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SecondarySessionButton extends StatelessWidget {
  const _SecondarySessionButton({
    required this.icon,
    required this.label,
    required this.onPressed,
    required this.palette,
  });

  final IconData icon;
  final String label;
  final VoidCallback onPressed;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 48,
      child: Material(
        color: palette.surfaceElevated,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(12),
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: palette.border, width: 1),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, size: 17, color: palette.textSecondary),
                const SizedBox(width: 8),
                Text(
                  label,
                  style: TextStyle(
                    color: palette.textPrimary,
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.1,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
