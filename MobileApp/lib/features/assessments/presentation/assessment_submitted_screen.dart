import 'package:flutter/material.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';

enum SubmissionStageState { completed, queued, pending }

@immutable
class SubmissionStageItem {
  const SubmissionStageItem({
    required this.stepNumber,
    required this.title,
    required this.statusLabel,
    required this.state,
  });

  final int stepNumber;
  final String title;
  final String statusLabel;
  final SubmissionStageState state;
}

@immutable
class SubmissionReceiptDetail {
  const SubmissionReceiptDetail({required this.label, required this.value});

  final String label;
  final String value;
}

@immutable
class AssessmentSubmittedData {
  const AssessmentSubmittedData({
    required this.assessmentId,
    required this.bannerTitle,
    required this.bannerSubtitle,
    required this.companyName,
    required this.isCompanyVerified,
    required this.roleTitle,
    required this.submittedAtLabel,
    required this.stages,
    required this.processingNotice,
    required this.receiptTitle,
    required this.receiptDetails,
  });

  final String assessmentId;
  final String bannerTitle;
  final String bannerSubtitle;
  final String companyName;
  final bool isCompanyVerified;
  final String roleTitle;
  final String submittedAtLabel;
  final List<SubmissionStageItem> stages;
  final String processingNotice;
  final String receiptTitle;
  final List<SubmissionReceiptDetail> receiptDetails;
}

/// Sample data matching the TalentGraph Assessment Submitted screen.
abstract final class TalentGraphSubmittedSampleData {
  static const AssessmentSubmittedData sample = AssessmentSubmittedData(
    assessmentId: 'assess-1',
    bannerTitle: 'Assessment Submitted',
    bannerSubtitle:
        'Your assessment submission has been successfully received.',
    companyName: 'Aether Telemetry Systems',
    isCompanyVerified: true,
    roleTitle: 'Staff Distributed Systems Engineer - High Throughput Telemetry',
    submittedAtLabel: 'Oct 29, 2026 · 14:38 UTC',
    stages: [
      SubmissionStageItem(
        stepNumber: 1,
        title: 'Submission Received',
        statusLabel: 'Completed',
        state: SubmissionStageState.completed,
      ),
      SubmissionStageItem(
        stepNumber: 2,
        title: 'Integrity Review',
        statusLabel: 'Queued',
        state: SubmissionStageState.queued,
      ),
      SubmissionStageItem(
        stepNumber: 3,
        title: 'Result Release',
        statusLabel: 'Pending',
        state: SubmissionStageState.pending,
      ),
    ],
    processingNotice:
        'Your submission is being processed. You will be notified when there is an update.',
    receiptTitle: 'Submission Receipt & Technical Details',
    receiptDetails: [
      SubmissionReceiptDetail(
        label: 'Receipt Reference',
        value: 'RCPT-8820-RAFT-941',
      ),
      SubmissionReceiptDetail(
        label: 'Prompts Answered',
        value: '7 of 7 Submitted',
      ),
      SubmissionReceiptDetail(
        label: 'Session Duration',
        value: '38m 14s / 45m 00s',
      ),
      SubmissionReceiptDetail(
        label: 'Telemetry & Audio Sync',
        value: 'Verified & Uploaded',
      ),
    ],
  );
}

class AssessmentSubmittedScreen extends StatelessWidget {
  const AssessmentSubmittedScreen({
    super.key,
    this.data = TalentGraphSubmittedSampleData.sample,
    this.onBackToAssessments,
    this.onReturnToJobsDiscovery,
    this.appBar,
  });

  final AssessmentSubmittedData data;
  final VoidCallback? onBackToAssessments;
  final VoidCallback? onReturnToJobsDiscovery;

  /// Plug in your shared `TgAppBar` here.
  final PreferredSizeWidget? appBar;

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

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

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
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 28),
              children: [
                _SubmissionSuccessBannerCard(
                  title: data.bannerTitle,
                  subtitle: data.bannerSubtitle,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 12),
                _SubmittedRoleSummaryCard(
                  companyName: data.companyName,
                  isVerified: data.isCompanyVerified,
                  roleTitle: data.roleTitle,
                  submittedAtLabel: data.submittedAtLabel,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 12),
                _SubmissionStatusTimelineCard(
                  stages: data.stages,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 12),
                _ProcessingInfoBanner(
                  message: data.processingNotice,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 12),
                _SubmissionReceiptAccordion(
                  title: data.receiptTitle,
                  details: data.receiptDetails,
                  palette: palette,
                ),
                const SizedBox(height: 18),
                _PrimarySubmittedButton(
                  icon: Icons.assignment_turned_in_outlined,
                  label: 'Back to Assessments',
                  onPressed: () => _handleBackToAssessments(context),
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 10),
                _SecondarySubmittedButton(
                  icon: Icons.work_outline_rounded,
                  label: 'Return to Jobs Discovery',
                  onPressed: () => _handleReturnToJobs(context),
                  palette: palette,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _SubmissionSuccessBannerCard extends StatelessWidget {
  const _SubmissionSuccessBannerCard({
    required this.title,
    required this.subtitle,
    required this.palette,
    required this.isDark,
  });

  final String title;
  final String subtitle;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final successColor =
        isDark ? const Color(0xFF34D399) : const Color(0xFF059669);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: successColor,
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.check_rounded,
              size: 20,
              color: isDark ? const Color(0xFF0A1F16) : Colors.white,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    color: palette.textPrimary,
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.3,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: TextStyle(
                    color: palette.textMuted,
                    fontSize: 13,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SubmittedRoleSummaryCard extends StatelessWidget {
  const _SubmittedRoleSummaryCard({
    required this.companyName,
    required this.isVerified,
    required this.roleTitle,
    required this.submittedAtLabel,
    required this.palette,
    required this.isDark,
  });

  final String companyName;
  final bool isVerified;
  final String roleTitle;
  final String submittedAtLabel;
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
              if (isVerified) ...[
                Icon(Icons.verified_rounded, size: 14.5, color: verifiedColor),
                const SizedBox(width: 6),
              ],
              Expanded(
                child: Text(
                  companyName,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: palette.textSecondary,
                    fontSize: 12.5,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            roleTitle,
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 16,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.2,
              height: 1.35,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                Icons.access_time_rounded,
                size: 14,
                color: palette.textMuted,
              ),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  submittedAtLabel,
                  style: TextStyle(color: palette.textMuted, fontSize: 12),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SubmissionStatusTimelineCard extends StatelessWidget {
  const _SubmissionStatusTimelineCard({
    required this.stages,
    required this.palette,
    required this.isDark,
  });

  final List<SubmissionStageItem> stages;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
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
            children: [
              Expanded(
                child: Text(
                  'SUBMISSION STATUS',
                  style: TextStyle(
                    color: palette.textSecondary,
                    fontSize: 11.5,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.7,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '${stages.length} Stages',
                style: TextStyle(
                  color: palette.textMuted,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          for (var i = 0; i < stages.length; i++)
            _SubmissionStageRow(
              stage: stages[i],
              isLast: i == stages.length - 1,
              palette: palette,
              isDark: isDark,
            ),
        ],
      ),
    );
  }
}

class _SubmissionStageRow extends StatelessWidget {
  const _SubmissionStageRow({
    required this.stage,
    required this.isLast,
    required this.palette,
    required this.isDark,
  });

  final SubmissionStageItem stage;
  final bool isLast;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final successColor =
        isDark ? const Color(0xFF34D399) : const Color(0xFF059669);
    final successTint = successColor.withAlpha(isDark ? 30 : 24);
    final successBorder = successColor.withAlpha(isDark ? 95 : 85);

    final warningColor =
        isDark ? const Color(0xFFF59E0B) : const Color(0xFFD97706);
    final warningTint = warningColor.withAlpha(isDark ? 30 : 24);
    final warningBorder = warningColor.withAlpha(isDark ? 95 : 85);

    final Color indicatorColor;
    final Color badgeForeground;
    final Color badgeBackground;
    final Color badgeBorder;
    final Color titleColor;

    switch (stage.state) {
      case SubmissionStageState.completed:
        indicatorColor = successColor;
        badgeForeground = successColor;
        badgeBackground = successTint;
        badgeBorder = successBorder;
        titleColor = palette.textPrimary;
      case SubmissionStageState.queued:
        indicatorColor = warningColor;
        badgeForeground = warningColor;
        badgeBackground = warningTint;
        badgeBorder = warningBorder;
        titleColor = palette.textPrimary;
      case SubmissionStageState.pending:
        indicatorColor = palette.textMuted;
        badgeForeground = palette.textMuted;
        badgeBackground = palette.surfaceElevated;
        badgeBorder = palette.border;
        titleColor = palette.textMuted;
    }

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SizedBox(
            width: 18,
            child: Column(
              children: [
                const SizedBox(height: 4),
                if (stage.state == SubmissionStageState.completed)
                  Icon(
                    Icons.check_circle_rounded,
                    size: 16,
                    color: indicatorColor,
                  )
                else
                  Container(
                    width: 16,
                    height: 16,
                    alignment: Alignment.center,
                    child: Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: indicatorColor,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 1.5,
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      color:
                          stage.state == SubmissionStageState.completed
                              ? successBorder
                              : palette.border,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(bottom: isLast ? 2 : 16),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    child: Text(
                      '${stage.stepNumber}. ${stage.title}',
                      style: TextStyle(
                        color: titleColor,
                        fontSize: 13.5,
                        fontWeight:
                            stage.state == SubmissionStageState.pending
                                ? FontWeight.w500
                                : FontWeight.w600,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 3.5,
                    ),
                    decoration: BoxDecoration(
                      color: badgeBackground,
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: badgeBorder, width: 1),
                    ),
                    child: Text(
                      stage.statusLabel,
                      style: TextStyle(
                        color: badgeForeground,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ProcessingInfoBanner extends StatelessWidget {
  const _ProcessingInfoBanner({
    required this.message,
    required this.palette,
    required this.isDark,
  });

  final String message;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final softAccentColor = palette.accent.withAlpha(isDark ? 215 : 230);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: palette.surfaceElevated,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: palette.border, width: 1),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 1),
            child: Icon(
              Icons.info_outline_rounded,
              size: 16,
              color: softAccentColor,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                color: palette.textSecondary,
                fontSize: 12.5,
                height: 1.45,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SubmissionReceiptAccordion extends StatefulWidget {
  const _SubmissionReceiptAccordion({
    required this.title,
    required this.details,
    required this.palette,
  });

  final String title;
  final List<SubmissionReceiptDetail> details;
  final TalentGraphPalette palette;

  @override
  State<_SubmissionReceiptAccordion> createState() =>
      _SubmissionReceiptAccordionState();
}

class _SubmissionReceiptAccordionState
    extends State<_SubmissionReceiptAccordion> {
  bool _isExpanded = false;

  @override
  Widget build(BuildContext context) {
    final palette = widget.palette;

    return Container(
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Material(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            child: InkWell(
              onTap: () => setState(() => _isExpanded = !_isExpanded),
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 14,
                  vertical: 14,
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.receipt_long_outlined,
                      size: 16,
                      color: palette.textMuted,
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        widget.title,
                        style: TextStyle(
                          color: palette.textPrimary,
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    AnimatedRotation(
                      turns: _isExpanded ? 0.5 : 0.0,
                      duration: const Duration(milliseconds: 180),
                      child: Icon(
                        Icons.keyboard_arrow_down_rounded,
                        size: 20,
                        color: palette.textMuted,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          AnimatedCrossFade(
            firstChild: const SizedBox(width: double.infinity, height: 0),
            secondChild: Padding(
              padding: const EdgeInsets.fromLTRB(14, 0, 14, 14),
              child: Column(
                children: [
                  Divider(height: 1, thickness: 1, color: palette.subtleBorder),
                  const SizedBox(height: 12),
                  for (var i = 0; i < widget.details.length; i++) ...[
                    if (i > 0) const SizedBox(height: 8),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Text(
                            widget.details[i].label,
                            style: TextStyle(
                              color: palette.textMuted,
                              fontSize: 12,
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Flexible(
                          child: Text(
                            widget.details[i].value,
                            textAlign: TextAlign.right,
                            style: TextStyle(
                              color: palette.textSecondary,
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
            crossFadeState:
                _isExpanded
                    ? CrossFadeState.showSecond
                    : CrossFadeState.showFirst,
            duration: const Duration(milliseconds: 180),
          ),
        ],
      ),
    );
  }
}

class _PrimarySubmittedButton extends StatelessWidget {
  const _PrimarySubmittedButton({
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

class _SecondarySubmittedButton extends StatelessWidget {
  const _SecondarySubmittedButton({
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
