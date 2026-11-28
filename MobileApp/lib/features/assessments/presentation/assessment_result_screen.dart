import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';

@immutable
class SkillBreakdownItem {
  const SkillBreakdownItem({
    required this.skillName,
    required this.earnedPoints,
    required this.maxPoints,
    required this.percentageLabel,
    required this.summary,
  });

  final String skillName;
  final int earnedPoints;
  final int maxPoints;
  final String percentageLabel;
  final String summary;
}

@immutable
class EvidenceTrailEntry {
  const EvidenceTrailEntry({
    required this.title,
    required this.statusLabel,
    required this.isHighlightedStatus,
    this.subtitle,
  });

  final String title;
  final String statusLabel;
  final bool isHighlightedStatus;
  final String? subtitle;
}

@immutable
class PromptPerformanceItem {
  const PromptPerformanceItem({
    required this.code,
    required this.title,
    required this.earnedPoints,
    required this.maxPoints,
  });

  final String code;
  final String title;
  final int earnedPoints;
  final int maxPoints;
}

@immutable
class AssessmentResultData {
  const AssessmentResultData({
    required this.assessmentId,
    required this.jobId,
    required this.referenceCode,
    required this.companyName,
    required this.isCompanyVerified,
    required this.cohortLabel,
    required this.roleTitle,
    required this.earnedScore,
    required this.maxScore,
    required this.calculatedYieldLabel,
    required this.calibrationNote,
    required this.skillBreakdown,
    required this.evidenceTrail,
    required this.promptPerformances,
    required this.submissionDigest,
    required this.calibrationModel,
  });

  final String assessmentId;
  final String jobId;
  final String referenceCode;
  final String companyName;
  final bool isCompanyVerified;
  final String cohortLabel;
  final String roleTitle;
  final int earnedScore;
  final int maxScore;
  final String calculatedYieldLabel;
  final String calibrationNote;
  final List<SkillBreakdownItem> skillBreakdown;
  final List<EvidenceTrailEntry> evidenceTrail;
  final List<PromptPerformanceItem> promptPerformances;
  final String submissionDigest;
  final String calibrationModel;

  AssessmentResultData copyWith({
    String? assessmentId,
    String? jobId,
    String? referenceCode,
    String? companyName,
    String? roleTitle,
  }) {
    return AssessmentResultData(
      assessmentId: assessmentId ?? this.assessmentId,
      jobId: jobId ?? this.jobId,
      referenceCode: referenceCode ?? this.referenceCode,
      companyName: companyName ?? this.companyName,
      isCompanyVerified: isCompanyVerified,
      cohortLabel: cohortLabel,
      roleTitle: roleTitle ?? this.roleTitle,
      earnedScore: earnedScore,
      maxScore: maxScore,
      calculatedYieldLabel: calculatedYieldLabel,
      calibrationNote: calibrationNote,
      skillBreakdown: skillBreakdown,
      evidenceTrail: evidenceTrail,
      promptPerformances: promptPerformances,
      submissionDigest: submissionDigest,
      calibrationModel: calibrationModel,
    );
  }
}

abstract final class TalentGraphAssessmentResultSampleData {
  static const AssessmentResultData sample = AssessmentResultData(
    assessmentId: 'assess-0',
    jobId: 'job-1',
    referenceCode: '#TG-8492',
    companyName: 'AETHER TELEMETRY SYSTEM',
    isCompanyVerified: true,
    cohortLabel: 'Cohort A · Oct 2026',
    roleTitle: 'Staff Distributed Systems Engineer - High Throughput Telemetry',
    earnedScore: 118,
    maxScore: 140,
    calculatedYieldLabel: '84.3%',
    calibrationNote:
    'Calibrated against Staff benchmark criteria across 7 technical prompts.',
    skillBreakdown: [
      SkillBreakdownItem(
        skillName: 'Distributed Consensus',
        earnedPoints: 36,
        maxPoints: 40,
        percentageLabel: '90%',
        summary:
        'Strong performance in quorum handling and leader election.',
      ),
      SkillBreakdownItem(
        skillName: 'Storage Engine Internals',
        earnedPoints: 30,
        maxPoints: 35,
        percentageLabel: '85.7%',
        summary:
        'Solid grasp of write-ahead logging and compaction trade-offs.',
      ),
      SkillBreakdownItem(
        skillName: 'Concurrent Data Structures',
        earnedPoints: 28,
        maxPoints: 35,
        percentageLabel: '80%',
        summary:
        'Effective synchronization and lock-free primitive design.',
      ),
      SkillBreakdownItem(
        skillName: 'Network I/O & Backpressure',
        earnedPoints: 24,
        maxPoints: 30,
        percentageLabel: '80%',
        summary:
        'Good mitigation strategies for tail latency and flow control.',
      ),
    ],
    evidenceTrail: [
      EvidenceTrailEntry(
        title: 'Attempt Submitted & Sealed',
        statusLabel: 'Oct 29, 14:48 UTC',
        isHighlightedStatus: false,
      ),
      EvidenceTrailEntry(
        title: 'Environmental Integrity Review',
        statusLabel: 'Completed',
        isHighlightedStatus: true,
        subtitle: '5 of 5 Snapshots Verified',
      ),
      EvidenceTrailEntry(
        title: 'Score & Feedback Release',
        statusLabel: 'Nov 02',
        isHighlightedStatus: false,
        subtitle: 'Authorized for Hiring Committee',
      ),
    ],
    promptPerformances: [
      PromptPerformanceItem(
        code: 'Q1',
        title: 'Cluster Quorum & Partition',
        earnedPoints: 20,
        maxPoints: 20,
      ),
      PromptPerformanceItem(
        code: 'Q2',
        title: 'Zero-Copy Serialization',
        earnedPoints: 16,
        maxPoints: 20,
      ),
      PromptPerformanceItem(
        code: 'Q3',
        title: 'Raft Majority Quorum',
        earnedPoints: 20,
        maxPoints: 20,
      ),
      PromptPerformanceItem(
        code: 'Q4',
        title: 'Log Compaction & Snapshot',
        earnedPoints: 18,
        maxPoints: 20,
      ),
      PromptPerformanceItem(
        code: 'Q5',
        title: 'Lock-Free Ring Buffer',
        earnedPoints: 15,
        maxPoints: 20,
      ),
      PromptPerformanceItem(
        code: 'Q6',
        title: 'Cross-Region Resilience',
        earnedPoints: 15,
        maxPoints: 20,
      ),
      PromptPerformanceItem(
        code: 'Q7',
        title: 'Backpressure & Flow Control',
        earnedPoints: 14,
        maxPoints: 20,
      ),
    ],
    submissionDigest: 'sha256:9f84c2e1d84b3a10...7b04a1',
    calibrationModel: 'Staff-DistSys-v2.4 (2026-Q4)',
  );
}

class AssessmentResultScreen extends StatefulWidget {
  const AssessmentResultScreen({
    super.key,
    this.data = TalentGraphAssessmentResultSampleData.sample,
    this.onBackToAssessments,
    this.onViewRelatedJob,
  });

  final AssessmentResultData data;
  final VoidCallback? onBackToAssessments;
  final VoidCallback? onViewRelatedJob;

  @override
  State<AssessmentResultScreen> createState() => _AssessmentResultScreenState();
}

class _AssessmentResultScreenState extends State<AssessmentResultScreen> {
  bool _promptExpanded = true;
  bool _verificationExpanded = false;

  void _handleBack() {
    if (widget.onBackToAssessments != null) {
      widget.onBackToAssessments!();
      return;
    }
    Navigator.of(context).maybePop();
  }

  void _handleViewJob() {
    if (widget.onViewRelatedJob != null) {
      widget.onViewRelatedJob!();
      return;
    }
    Navigator.of(context).pop();
    context.push('/jobs/${widget.data.jobId}');
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final data = widget.data;

    return Scaffold(
      backgroundColor: palette.background,
      body: SafeArea(
        child: Align(
          alignment: Alignment.topCenter,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: Column(
              children: [
                _ResultTopBar(
                  palette: palette,
                  onBack: _handleBack,
                ),
                Expanded(
                  child: ListView(
                    physics: const AlwaysScrollableScrollPhysics(
                      parent: BouncingScrollPhysics(),
                    ),
                    padding: const EdgeInsets.fromLTRB(16, 4, 16, 28),
                    children: [
                      _ScoreSummaryCard(palette: palette, data: data),
                      const SizedBox(height: 14),
                      _SkillBreakdownCard(
                        palette: palette,
                        skills: data.skillBreakdown,
                      ),
                      const SizedBox(height: 14),
                      _EvidenceTrailCard(
                        palette: palette,
                        entries: data.evidenceTrail,
                      ),
                      const SizedBox(height: 14),
                      _PromptPerformanceCard(
                        palette: palette,
                        prompts: data.promptPerformances,
                        expanded: _promptExpanded,
                        onToggle: () => setState(
                              () => _promptExpanded = !_promptExpanded,
                        ),
                      ),
                      const SizedBox(height: 14),
                      _TechnicalVerificationCard(
                        palette: palette,
                        data: data,
                        expanded: _verificationExpanded,
                        onToggle: () => setState(
                              () => _verificationExpanded = !_verificationExpanded,
                        ),
                      ),
                      const SizedBox(height: 20),
                      SizedBox(
                        width: double.infinity,
                        height: 48,
                        child: FilledButton(
                          onPressed: _handleBack,
                          style: FilledButton.styleFrom(
                            backgroundColor: palette.accent,
                            foregroundColor: const Color(0xFF0E0E10),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.arrow_back, size: 17),
                              SizedBox(width: 8),
                              Text(
                                'Back to Assessments',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 10),
                      SizedBox(
                        width: double.infinity,
                        height: 48,
                        child: OutlinedButton(
                          onPressed: _handleViewJob,
                          style: OutlinedButton.styleFrom(
                            backgroundColor: palette.surface,
                            foregroundColor: palette.textPrimary,
                            side: BorderSide(color: palette.border, width: 1),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.open_in_new_rounded,
                                size: 16,
                                color: palette.textSecondary,
                              ),
                              const SizedBox(width: 8),
                              const Text(
                                'View Related Job',
                                style: TextStyle(
                                  fontSize: 13.5,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
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

class _ResultTopBar extends StatelessWidget {
  const _ResultTopBar({
    required this.palette,
    required this.onBack,
  });

  final TalentGraphPalette palette;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
      child: Row(
        children: [
          InkWell(
            onTap: onBack,
            borderRadius: BorderRadius.circular(8),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.arrow_back,
                    size: 16,
                    color: palette.textSecondary,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    'Assessments',
                    style: TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.w500,
                      color: palette.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            decoration: BoxDecoration(
              color: palette.successTint,
              border: Border.all(color: palette.successBorder, width: 1),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 6,
                  height: 6,
                  decoration: BoxDecoration(
                    color: palette.success,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  'Result Authorized',
                  style: TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w600,
                    color: palette.success,
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

class _ScoreSummaryCard extends StatelessWidget {
  const _ScoreSummaryCard({
    required this.palette,
    required this.data,
  });

  final TalentGraphPalette palette;
  final AssessmentResultData data;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
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
                child: Row(
                  children: [
                    Flexible(
                      child: Text(
                        data.companyName.toUpperCase(),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 11.5,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.4,
                          color: palette.textMuted,
                        ),
                      ),
                    ),
                    if (data.isCompanyVerified) ...[
                      const SizedBox(width: 5),
                      const Icon(
                        Icons.verified,
                        size: 14,
                        color: Color(0xFF38BDF8),
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Text(
                data.cohortLabel,
                style: TextStyle(
                  fontSize: 11.5,
                  color: palette.textMuted,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            data.roleTitle,
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w700,
              height: 1.3,
              letterSpacing: -0.2,
              color: palette.textPrimary,
            ),
          ),
          const SizedBox(height: 18),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'TOTAL SCORE',
                      style: TextStyle(
                        fontSize: 10.5,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.5,
                        color: palette.textMuted,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.baseline,
                      textBaseline: TextBaseline.alphabetic,
                      children: [
                        Text(
                          '${data.earnedScore}',
                          style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w800,
                            letterSpacing: -0.6,
                            height: 1.05,
                            color: palette.textPrimary,
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '/ ${data.maxScore} pts',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: palette.textMuted,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    'CALCULATED YIELD',
                    style: TextStyle(
                      fontSize: 10.5,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.5,
                      color: palette.textMuted,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    data.calculatedYieldLabel,
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.w800,
                      letterSpacing: -0.6,
                      height: 1.05,
                      color: palette.accent,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 14),
          Divider(color: palette.subtleBorder, height: 1),
          const SizedBox(height: 12),
          Text(
            data.calibrationNote,
            style: TextStyle(
              fontSize: 12,
              height: 1.4,
              color: palette.textMuted,
            ),
          ),
        ],
      ),
    );
  }
}

class _SkillBreakdownCard extends StatelessWidget {
  const _SkillBreakdownCard({
    required this.palette,
    required this.skills,
  });

  final TalentGraphPalette palette;
  final List<SkillBreakdownItem> skills;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
            child: Row(
              children: [
                Text(
                  'AUTHORIZED SKILL BREAKDOWN',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.5,
                    color: palette.textMuted,
                  ),
                ),
                const Spacer(),
                Text(
                  '${skills.length} Vectors',
                  style: TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w500,
                    color: palette.textMuted,
                  ),
                ),
              ],
            ),
          ),
          Divider(color: palette.subtleBorder, height: 1),
          for (var i = 0; i < skills.length; i++) ...[
            if (i > 0) Divider(color: palette.subtleBorder, height: 1),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Text(
                          skills[i].skillName,
                          style: TextStyle(
                            fontSize: 13.5,
                            fontWeight: FontWeight.w700,
                            color: palette.textPrimary,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '${skills[i].earnedPoints} / ${skills[i].maxPoints}  ·  ${skills[i].percentageLabel}',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: palette.accent,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    skills[i].summary,
                    style: TextStyle(
                      fontSize: 12,
                      height: 1.4,
                      color: palette.textMuted,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _EvidenceTrailCard extends StatelessWidget {
  const _EvidenceTrailCard({
    required this.palette,
    required this.entries,
  });

  final TalentGraphPalette palette;
  final List<EvidenceTrailEntry> entries;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
            child: Row(
              children: [
                Text(
                  'EVIDENCE TRAIL',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.5,
                    color: palette.textMuted,
                  ),
                ),
                const Spacer(),
                Icon(
                  Icons.check_circle_outline,
                  size: 14,
                  color: palette.success,
                ),
                const SizedBox(width: 4),
                Text(
                  '${entries.length} of ${entries.length} Verified',
                  style: TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w600,
                    color: palette.success,
                  ),
                ),
              ],
            ),
          ),
          Divider(color: palette.subtleBorder, height: 1),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                for (var i = 0; i < entries.length; i++)
                  IntrinsicHeight(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Column(
                          children: [
                            Icon(
                              Icons.check_circle,
                              size: 16,
                              color: palette.success,
                            ),
                            if (i < entries.length - 1)
                              Expanded(
                                child: Container(
                                  width: 1.5,
                                  margin:
                                  const EdgeInsets.symmetric(vertical: 3),
                                  color: palette.successBorder,
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Padding(
                            padding: EdgeInsets.only(
                              bottom: i < entries.length - 1 ? 14 : 0,
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Expanded(
                                      child: Text(
                                        entries[i].title,
                                        style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.w600,
                                          color: palette.textPrimary,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      entries[i].statusLabel,
                                      style: TextStyle(
                                        fontSize: 11.5,
                                        fontWeight:
                                        entries[i].isHighlightedStatus
                                            ? FontWeight.w600
                                            : FontWeight.w400,
                                        color: entries[i].isHighlightedStatus
                                            ? palette.success
                                            : palette.textMuted,
                                      ),
                                    ),
                                  ],
                                ),
                                if (entries[i].subtitle != null) ...[
                                  const SizedBox(height: 3),
                                  Text(
                                    entries[i].subtitle!,
                                    style: TextStyle(
                                      fontSize: 11.5,
                                      color: palette.textMuted,
                                    ),
                                  ),
                                ],
                              ],
                            ),
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
}

class _PromptPerformanceCard extends StatelessWidget {
  const _PromptPerformanceCard({
    required this.palette,
    required this.prompts,
    required this.expanded,
    required this.onToggle,
  });

  final TalentGraphPalette palette;
  final List<PromptPerformanceItem> prompts;
  final bool expanded;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        children: [
          InkWell(
            onTap: onToggle,
            borderRadius: BorderRadius.circular(14),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
              child: Row(
                children: [
                  Text(
                    'PROMPT PERFORMANCE · ${prompts.length} QUESTIONS',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 0.5,
                      color: palette.textMuted,
                    ),
                  ),
                  const Spacer(),
                  Icon(
                    expanded
                        ? Icons.keyboard_arrow_up_rounded
                        : Icons.keyboard_arrow_down_rounded,
                    size: 18,
                    color: palette.textMuted,
                  ),
                ],
              ),
            ),
          ),
          if (expanded) ...[
            Divider(color: palette.subtleBorder, height: 1),
            for (var i = 0; i < prompts.length; i++) ...[
              if (i > 0) Divider(color: palette.subtleBorder, height: 1),
              Padding(
                padding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    Text(
                      prompts[i].code,
                      style: TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w700,
                        color: palette.accent,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Text(
                        '·',
                        style: TextStyle(
                          fontSize: 12.5,
                          color: palette.textMuted,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Text(
                        prompts[i].title,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 12.5,
                          fontWeight: FontWeight.w500,
                          color: palette.textSecondary,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '${prompts[i].earnedPoints}/${prompts[i].maxPoints}',
                      style: TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w700,
                        color: palette.textPrimary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ],
      ),
    );
  }
}

class _TechnicalVerificationCard extends StatelessWidget {
  const _TechnicalVerificationCard({
    required this.palette,
    required this.data,
    required this.expanded,
    required this.onToggle,
  });

  final TalentGraphPalette palette;
  final AssessmentResultData data;
  final bool expanded;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        children: [
          InkWell(
            onTap: onToggle,
            borderRadius: BorderRadius.circular(14),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
              child: Row(
                children: [
                  Icon(
                    Icons.lock_outline_rounded,
                    size: 15,
                    color: palette.textMuted,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Technical Verification · View Details',
                      style: TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w500,
                        color: palette.textSecondary,
                      ),
                    ),
                  ),
                  Icon(
                    expanded
                        ? Icons.keyboard_arrow_up_rounded
                        : Icons.keyboard_arrow_down_rounded,
                    size: 18,
                    color: palette.textMuted,
                  ),
                ],
              ),
            ),
          ),
          if (expanded) ...[
            Divider(color: palette.subtleBorder, height: 1),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _VerificationMetaRow(
                    palette: palette,
                    label: 'Reference ID',
                    value: data.referenceCode,
                  ),
                  const SizedBox(height: 10),
                  _VerificationMetaRow(
                    palette: palette,
                    label: 'Submission Digest',
                    value: data.submissionDigest,
                  ),
                  const SizedBox(height: 10),
                  _VerificationMetaRow(
                    palette: palette,
                    label: 'Calibration Model',
                    value: data.calibrationModel,
                  ),
                  const SizedBox(height: 10),
                  _VerificationMetaRow(
                    palette: palette,
                    label: 'Proctoring Integrity',
                    value: 'Verified · Zero Anomalies',
                    valueColor: palette.success,
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _VerificationMetaRow extends StatelessWidget {
  const _VerificationMetaRow({
    required this.palette,
    required this.label,
    required this.value,
    this.valueColor,
  });

  final TalentGraphPalette palette;
  final String label;
  final String value;
  final Color? valueColor;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: palette.textMuted,
          ),
        ),
        const Spacer(),
        Flexible(
          child: Text(
            value,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: valueColor ?? palette.textPrimary,
            ),
          ),
        ),
      ],
    );
  }
}