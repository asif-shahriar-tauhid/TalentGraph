import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/core/data/repositories.dart';
import 'package:talentgraph/core/domain/tg_enums.dart';
import 'package:talentgraph/core/domain/tg_models.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_view_models.dart';
import 'package:talentgraph/shared/widgets/tg_app_bar.dart';

class SkillPercentilesScreen extends ConsumerStatefulWidget {
  const SkillPercentilesScreen({super.key, required this.applicationId});

  final String applicationId;

  @override
  ConsumerState<SkillPercentilesScreen> createState() => _SkillPercentilesScreenState();
}

class _SkillPercentilesScreenState extends ConsumerState<SkillPercentilesScreen> {
  String _formatDate(DateTime d) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return 'Submitted ${months[d.month - 1]} ${d.day}, ${d.year}';
  }

  bool _isInProgress(ApplicationStatus s) {
    return s == ApplicationStatus.applied ||
        s == ApplicationStatus.assessmentPending ||
        s == ApplicationStatus.underReview;
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final repo = ref.watch(applicationsRepositoryProvider);
    return Scaffold(
      backgroundColor: palette.background,
      appBar: const TgAppBar(),
      body: FutureBuilder<ApplicationModel?>(
        future: repo.getApplication(widget.applicationId),
        builder: (context, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator(color: palette.accent));
          }
          if (snap.hasError) {
            return Center(child: Text('Failed to load', style: TextStyle(color: palette.textMuted)));
          }
          final model = snap.data;
          if (model == null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Not found', style: TextStyle(color: palette.textMuted)),
                  const SizedBox(height: 8),
                  TextButton(
                    onPressed: () {
                      if (context.canPop()) {
                        context.pop();
                      } else {
                        context.go('/applied-jobs');
                      }
                    },
                    child: const Text('Back to Applied Jobs'),
                  ),
                ],
              ),
            );
          }

          final isInProgress = _isInProgress(model.status);

          return SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
              child: Align(
                alignment: Alignment.topCenter,
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 720),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: () {
                          if (context.canPop()) {
                            context.pop();
                          } else {
                            context.go('/applied-jobs');
                          }
                        },
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.arrow_back_rounded, size: 16, color: palette.textSecondary),
                            const SizedBox(width: 4),
                            Text('Back to Applied Jobs',
                                style: TextStyle(color: palette.textSecondary, fontSize: 13.5, fontWeight: FontWeight.w500)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: palette.surface,
                          border: Border.all(color: palette.border),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Expanded(
                                  child: Text(model.companyName,
                                      style: TextStyle(color: palette.textSecondary, fontSize: 13, fontWeight: FontWeight.w600)),
                                ),
                                if (model.isVerifiedCompany)
                                  Padding(
                                    padding: const EdgeInsets.only(right: 8),
                                    child: Icon(Icons.verified_rounded, size: 15, color: palette.accent),
                                  ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: isInProgress ? palette.warningTint : palette.successTint,
                                    border: Border.all(color: isInProgress ? palette.warningBorder : palette.successBorder),
                                    borderRadius: BorderRadius.circular(999),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Container(
                                        width: 6,
                                        height: 6,
                                        decoration: BoxDecoration(
                                          color: isInProgress ? palette.warning : palette.success,
                                          shape: BoxShape.circle,
                                        ),
                                      ),
                                      const SizedBox(width: 6),
                                      Text(isInProgress ? 'In Progress' : 'Evaluated',
                                          style: TextStyle(
                                              color: isInProgress ? palette.warning : palette.success,
                                              fontSize: 12,
                                              fontWeight: FontWeight.w600)),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(model.jobTitle,
                                style: TextStyle(color: palette.textPrimary, fontSize: 19, fontWeight: FontWeight.w700)),
                            const SizedBox(height: 4),
                            Text('${_formatDate(model.appliedAt)} · ${model.referenceCode}',
                                style: TextStyle(color: palette.dateHighlight, fontSize: 12.5, fontWeight: FontWeight.w500)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                      if (isInProgress)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
                          decoration: BoxDecoration(
                            color: palette.surface,
                            border: Border.all(color: palette.warningBorder),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Column(
                            children: [
                              Container(
                                width: 56,
                                height: 56,
                                decoration: BoxDecoration(
                                  color: palette.warningTint,
                                  border: Border.all(color: palette.warningBorder),
                                  shape: BoxShape.circle,
                                ),
                                child: Icon(Icons.hourglass_top_rounded, size: 28, color: palette.warning),
                              ),
                              const SizedBox(height: 16),
                              Text('Evaluation In Progress',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(color: palette.textPrimary, fontSize: 20, fontWeight: FontWeight.w700)),
                              const SizedBox(height: 8),
                              Text(
                                'Your application is currently being reviewed. Skill percentiles are not visible while evaluation is in progress. Once the recruiter publishes the results, you will be able to view your full skill percentile breakdown here.',
                                textAlign: TextAlign.center,
                                style: TextStyle(color: palette.textSecondary, fontSize: 14, height: 1.55),
                              ),
                              const SizedBox(height: 12),
                              Text('Check back after the recruiter publishes evaluation results.',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(color: palette.textMuted, fontSize: 12.5)),
                              const SizedBox(height: 16),
                              GestureDetector(
                                onTap: () {
                                  if (context.canPop()) {
                                    context.pop();
                                  } else {
                                    context.go('/applied-jobs');
                                  }
                                },
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                                  decoration: BoxDecoration(
                                    color: palette.accentTint,
                                    border: Border.all(color: palette.accentBorder),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text('Back to Applied Jobs',
                                      style: TextStyle(color: palette.accentSoftText, fontWeight: FontWeight.w600)),
                                ),
                              ),
                            ],
                          ),
                        )
                      else ...[
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: palette.accentTint,
                            border: Border.all(color: palette.accentBorder),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Row(
                            children: [
                              Icon(Icons.insights_rounded, color: palette.accentSoftText, size: 18),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text('Rankings reflect the eligible applicant pool for this role.',
                                    style: TextStyle(color: palette.accentSoftText, fontSize: 12.5)),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: palette.surfaceElevated,
                            border: Border.all(color: palette.subtleBorder),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Icon(Icons.info_outline_rounded, size: 16, color: palette.noteIconTint),
                                  const SizedBox(width: 6),
                                  Text('WHAT DO THESE PERCENTILES MEAN?',
                                      style: TextStyle(
                                          color: palette.textSecondary,
                                          fontSize: 11.5,
                                          fontWeight: FontWeight.w700,
                                          letterSpacing: 0.6)),
                                ],
                              ),
                              const SizedBox(height: 6),
                              Text(
                                'Each percentile shows the percentage of eligible applicants you performed better than on that skill. Relative comparison, not a hiring guarantee.',
                                style: TextStyle(color: palette.textSecondary, fontSize: 13, height: 1.45),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                "Other applicants' individual scores and identities remain strictly confidential.",
                                style: TextStyle(color: palette.textMuted, fontSize: 12.5, height: 1.4),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Text('Skill Breakdown',
                                style: TextStyle(color: palette.textPrimary, fontSize: 15, fontWeight: FontWeight.w600)),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: palette.surfaceElevated,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text('${model.percentiles.length}',
                                  style: TextStyle(color: palette.textMuted, fontSize: 12)),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        if (model.percentiles.isEmpty)
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: palette.surface,
                              border: Border.all(color: palette.border),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Center(child: Text('No skill data yet', style: TextStyle(color: palette.textMuted))),
                          )
                        else
                          ...model.percentiles.map((skill) {
                            final available = skill.isAvailable && model.hasEnoughCohortData;
                            final item = SkillPercentileItem(skillName: skill.skillName, percentile: skill.percentile);
                            return Container(
                              margin: const EdgeInsets.only(bottom: 10),
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: palette.surface,
                                border: Border.all(color: palette.border),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Expanded(
                                        child: Text(skill.skillName,
                                            style: TextStyle(color: palette.textPrimary, fontSize: 14.5, fontWeight: FontWeight.w600)),
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: available
                                              ? (item.percentile >= 75 ? palette.successTint : palette.accentTint)
                                              : palette.surfaceElevated,
                                          border: Border.all(
                                              color: available
                                                  ? (item.percentile >= 75 ? palette.successBorder : palette.accentBorder)
                                                  : palette.border),
                                          borderRadius: BorderRadius.circular(6),
                                        ),
                                        child: Text(
                                          available ? '${item.ordinalLabel} percentile' : 'Pending Cohort',
                                          style: TextStyle(
                                              color: available
                                                  ? (item.percentile >= 75 ? palette.success : palette.accentSoftText)
                                                  : palette.textMuted,
                                              fontSize: 12,
                                              fontWeight: FontWeight.w600),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(999),
                                    child: LinearProgressIndicator(
                                      value: available ? item.progress : 0,
                                      minHeight: 8,
                                      backgroundColor: palette.progressTrack,
                                      color: available
                                          ? (item.percentile >= 75 ? palette.success : palette.accent)
                                          : palette.progressTrack,
                                    ),
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    available
                                        ? 'Performance relative to eligible applicant pool (${skill.eligibleCohortSize} applicants)'
                                        : 'Requires at least ${skill.minCohortRequired} eligible applicants (${skill.eligibleCohortSize}/${skill.minCohortRequired} evaluated)',
                                    style: TextStyle(color: palette.textMuted, fontSize: 12),
                                  ),
                                ],
                              ),
                            );
                          }),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.verified_user_outlined, size: 15, color: palette.textMuted),
                            const SizedBox(width: 6),
                            Text('This does not disqualify your application.',
                                style: TextStyle(color: palette.textMuted, fontSize: 12)),
                          ],
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
