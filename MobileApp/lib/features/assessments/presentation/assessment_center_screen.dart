import 'package:flutter/material.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';
import 'package:talentgraph/features/assessments/presentation/assessment_preflight_screen.dart';
import 'package:talentgraph/features/assessments/presentation/assessment_result_screen.dart';

enum AssessmentStatus {
  scheduled,
  decisionPending,
  resultPublished,
}

@immutable
class AssessmentCenterItem {
  const AssessmentCenterItem({
    required this.id,
    required this.referenceCode,
    required this.companyName,
    required this.roleTitle,
    required this.status,
    this.scheduledLabel,
    this.resultSummaryLabel,
    this.jobId = 'job-1',
  });

  final String id;
  final String referenceCode;
  final String companyName;
  final String roleTitle;
  final AssessmentStatus status;
  final String? scheduledLabel;
  final String? resultSummaryLabel;
  final String jobId;

  bool get isScheduled => status == AssessmentStatus.scheduled;
  bool get isResultPublished => status == AssessmentStatus.resultPublished;
  bool get isInteractive => isScheduled || isResultPublished;
}

abstract final class TalentGraphAssessmentsSampleData {
  static const List<AssessmentCenterItem> items = [
    AssessmentCenterItem(
      id: 'assess-0',
      referenceCode: 'ID: #TG-8492',
      companyName: 'Aether Telemetry Systems',
      roleTitle:
      'Staff Distributed Systems Engineer - High Throughput Telemetry',
      status: AssessmentStatus.resultPublished,
      resultSummaryLabel: 'Score: 118/140 (84.3%)',
      jobId: 'job-1',
    ),
    AssessmentCenterItem(
      id: 'assess-1',
      referenceCode: 'ID: #TG-8105',
      companyName: 'Hyperion Stream Systems',
      roleTitle: 'Principal Event Streaming & Consensus Engineer',
      status: AssessmentStatus.scheduled,
      scheduledLabel: 'Assessment: Thursday, Oct 29, 2026 at 14:00 UTC',
      jobId: 'job-2',
    ),
    AssessmentCenterItem(
      id: 'assess-2',
      referenceCode: 'ID: #TG-7210',
      companyName: 'Prisma Cloud Systems',
      roleTitle: 'Senior Rust Backend Engineer',
      status: AssessmentStatus.decisionPending,
    ),
    AssessmentCenterItem(
      id: 'assess-3',
      referenceCode: 'ID: #TG-6031',
      companyName: 'Nexus Global Infrastructure',
      roleTitle: 'Lead Site Reliability Engineer',
      status: AssessmentStatus.decisionPending,
    ),
    AssessmentCenterItem(
      id: 'assess-4',
      referenceCode: 'ID: #TG-5198',
      companyName: 'Crucible Data',
      roleTitle: 'Senior Infrastructure Engineer - Storage Engine',
      status: AssessmentStatus.decisionPending,
    ),
    AssessmentCenterItem(
      id: 'assess-5',
      referenceCode: 'ID: #TG-4804',
      companyName: 'Veritas Labs',
      roleTitle: 'Staff Cryptographic Protocols Researcher',
      status: AssessmentStatus.decisionPending,
    ),
  ];
}

class AssessmentCenterScreen extends StatelessWidget {
  const AssessmentCenterScreen({
    super.key,
    this.assessments = TalentGraphAssessmentsSampleData.items,
    this.onAssessmentTap,
    this.appBar,
    this.portalBadgeLabel = 'Candidate Portal',
  });

  final List<AssessmentCenterItem> assessments;
  final ValueChanged<AssessmentCenterItem>? onAssessmentTap;
  final PreferredSizeWidget? appBar;
  final String portalBadgeLabel;

  void _handleTap(BuildContext context, AssessmentCenterItem item) {
    if (onAssessmentTap != null) {
      onAssessmentTap!(item);
      return;
    }

    if (item.isResultPublished) {
      final resultData = TalentGraphAssessmentResultSampleData.sample.copyWith(
        assessmentId: item.id,
        jobId: item.jobId,
        referenceCode: item.referenceCode.replaceFirst('ID: ', ''),
        companyName: item.companyName.toUpperCase(),
        roleTitle: item.roleTitle,
      );
      Navigator.of(context, rootNavigator: true).push(
        MaterialPageRoute<void>(
          builder: (_) => AssessmentResultScreen(data: resultData),
        ),
      );
      return;
    }

    final preflightData = TalentGraphPreflightSampleData.sample.copyWith(
      assessmentId: item.id,
      companyName: item.companyName,
      roleTitle: item.roleTitle,
    );
    Navigator.of(context, rootNavigator: true).push(
      MaterialPageRoute<void>(
        builder: (_) => AssessmentPreflightScreen(data: preflightData),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);

    return Scaffold(
      backgroundColor: palette.background,
      appBar: appBar,
      body: SafeArea(
        top: appBar == null,
        child: Align(
          alignment: Alignment.topCenter,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: ListView(
              physics: const AlwaysScrollableScrollPhysics(
                parent: BouncingScrollPhysics(),
              ),
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 24),
              children: [
                _AssessmentCenterHeader(
                  portalBadgeLabel: portalBadgeLabel,
                  palette: palette,
                ),
                const SizedBox(height: 6),
                Text(
                  'Track assessment status for your applied roles.',
                  style: TextStyle(
                    color: palette.textMuted,
                    fontSize: 13.5,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const SizedBox(height: 18),
                if (assessments.isEmpty)
                  _EmptyAssessmentsState(palette: palette)
                else
                  for (var i = 0; i < assessments.length; i++) ...[
                    if (i > 0) const SizedBox(height: 12),
                    AssessmentCard(
                      item: assessments[i],
                      onTap: assessments[i].isInteractive
                          ? () => _handleTap(context, assessments[i])
                          : null,
                    ),
                  ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _AssessmentCenterHeader extends StatelessWidget {
  const _AssessmentCenterHeader({
    required this.portalBadgeLabel,
    required this.palette,
  });

  final String portalBadgeLabel;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: palette.accent,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 10),
              Flexible(
                child: Text(
                  'Assessment Center',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: palette.textPrimary,
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.4,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(width: 10),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4.5),
          decoration: BoxDecoration(
            color: palette.surfaceElevated,
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: palette.border, width: 1),
          ),
          child: Text(
            portalBadgeLabel,
            style: TextStyle(
              color: palette.textMuted,
              fontSize: 11.5,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ],
    );
  }
}

class AssessmentCard extends StatelessWidget {
  const AssessmentCard({
    super.key,
    required this.item,
    this.onTap,
  });

  final AssessmentCenterItem item;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final isScheduled = item.isScheduled;
    final isResultPublished = item.isResultPublished;
    final scheduledColor = Theme.of(context).brightness == Brightness.dark
        ? const Color(0xFFF59E0B)
        : const Color(0xFFB45309);

    return Material(
      color: palette.surface,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: isResultPublished
                  ? palette.successBorder
                  : palette.subtleBorder,
              width: 1,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    child: Text(
                      item.companyName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: palette.textSecondary,
                        fontSize: 12.5,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    item.referenceCode,
                    style: TextStyle(
                      color: palette.textMuted,
                      fontSize: 11.5,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                item.roleTitle,
                style: TextStyle(
                  color: palette.textPrimary,
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.2,
                  height: 1.3,
                ),
              ),
              const SizedBox(height: 14),
              if (isResultPublished)
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.check_circle_outline,
                      size: 16,
                      color: palette.success,
                    ),
                    const SizedBox(width: 7),
                    Expanded(
                      child: Text(
                        item.resultSummaryLabel ?? 'Result Published',
                        style: TextStyle(
                          color: palette.success,
                          fontSize: 12.5,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 7,
                      ),
                      decoration: BoxDecoration(
                        color: palette.accent,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'View Result',
                            style: TextStyle(
                              color: Color(0xFF0E0E10),
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          SizedBox(width: 5),
                          Icon(
                            Icons.arrow_forward_rounded,
                            size: 14,
                            color: Color(0xFF0E0E10),
                          ),
                        ],
                      ),
                    ),
                  ],
                )
              else if (isScheduled)
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.event_available_outlined,
                      size: 16,
                      color: scheduledColor,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        item.scheduledLabel ?? 'Assessment scheduled',
                        style: TextStyle(
                          color: scheduledColor,
                          fontSize: 12.5,
                          fontWeight: FontWeight.w500,
                          height: 1.35,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Icon(
                      Icons.arrow_forward_rounded,
                      size: 16,
                      color: palette.textMuted,
                    ),
                  ],
                )
              else
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.access_time_rounded,
                      size: 15,
                      color: palette.textMuted,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Assessment decision pending',
                        style: TextStyle(
                          color: palette.textMuted,
                          fontSize: 12.5,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),
                  ],
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _EmptyAssessmentsState extends StatelessWidget {
  const _EmptyAssessmentsState({required this.palette});

  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 36),
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.assignment_turned_in_outlined,
            size: 32,
            color: palette.textMuted,
          ),
          const SizedBox(height: 10),
          Text(
            'No assessments yet',
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 15,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Scheduled technical assessments and evaluation statuses for your applied roles will appear here.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: palette.textMuted,
              fontSize: 12.5,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}