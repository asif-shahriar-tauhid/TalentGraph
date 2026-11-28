import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/core/data/repositories.dart';
import 'package:talentgraph/core/domain/tg_enums.dart';
import 'package:talentgraph/core/domain/tg_models.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_view_models.dart';
import 'package:talentgraph/shared/widgets/tg_app_bar.dart';

class AppliedJobsScreen extends ConsumerStatefulWidget {
  const AppliedJobsScreen({super.key});

  @override
  ConsumerState<AppliedJobsScreen> createState() => _AppliedJobsScreenState();
}

class _AppliedJobsScreenState extends ConsumerState<AppliedJobsScreen> {
  final bool _previewEmpty = false;
  AppliedJobsFilter _filter = AppliedJobsFilter.all;

  String _formatDate(DateTime d) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return 'Applied ${months[d.month - 1]} ${d.day}, ${d.year}';
  }

  AppliedJobStatus _mapStatus(ApplicationStatus s) {
    switch (s) {
      case ApplicationStatus.applied:
      case ApplicationStatus.assessmentPending:
      case ApplicationStatus.underReview:
        return AppliedJobStatus.inProgress;
      case ApplicationStatus.shortlisted:
      case ApplicationStatus.interview:
      case ApplicationStatus.rejected:
      case ApplicationStatus.withdrawn:
        return AppliedJobStatus.evaluated;
    }
  }

  AppliedJobItem _map(ApplicationModel m) {
    return AppliedJobItem(
      id: m.id,
      companyName: m.companyName,
      isVerified: m.isVerifiedCompany,
      jobTitle: m.jobTitle,
      location: m.location,
      isRemote: m.location.toLowerCase().contains('remote'),
      employmentType: m.jobType,
      appliedDateLabel: _formatDate(m.appliedAt),
      status: _mapStatus(m.status),
    );
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final repo = ref.watch(applicationsRepositoryProvider);
    return Scaffold(
      backgroundColor: palette.background,
      appBar: const TgAppBar(),
      body: FutureBuilder<List<ApplicationModel>>(
        future: repo.listApplications(),
        builder: (context, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(color: palette.accent),
            );
          }
          if (snap.hasError) {
            return Center(
              child: Text(
                'Failed to load',
                style: TextStyle(color: palette.textMuted),
              ),
            );
          }
          final apps = _previewEmpty ? <ApplicationModel>[] : (snap.data ?? []);
          final items = apps.map(_map).toList();
          final filtered =
              items.where((it) {
                switch (_filter) {
                  case AppliedJobsFilter.all:
                    return true;
                  case AppliedJobsFilter.inProgress:
                    return it.status == AppliedJobStatus.inProgress;
                  case AppliedJobsFilter.evaluated:
                    return it.status == AppliedJobStatus.evaluated;
                }
              }).toList();

          final allCount = items.length;
          final inProgressCount =
              items
                  .where((i) => i.status == AppliedJobStatus.inProgress)
                  .length;
          final evaluatedCount =
              items.where((i) => i.status == AppliedJobStatus.evaluated).length;

          return SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
            child: Align(
              alignment: Alignment.topCenter,
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 720),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Applied Jobs',
                      style: TextStyle(
                        color: palette.textPrimary,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Track your active applications and skill percentile standing.',
                      style: TextStyle(color: palette.textMuted, fontSize: 13),
                    ),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 8,
                      children: [
                        _chip(
                          palette,
                          AppliedJobsFilter.all,
                          'All ($allCount)',
                        ),
                        _chip(
                          palette,
                          AppliedJobsFilter.inProgress,
                          'In Progress ($inProgressCount)',
                        ),
                        _chip(
                          palette,
                          AppliedJobsFilter.evaluated,
                          'Evaluated ($evaluatedCount)',
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    if (items.isEmpty)
                      Center(
                        child: Text(
                          'No applications yet',
                          style: TextStyle(color: palette.textMuted),
                        ),
                      )
                    else if (filtered.isEmpty)
                      Center(
                        child: Text(
                          'No matches for this filter',
                          style: TextStyle(color: palette.textMuted),
                        ),
                      )
                    else
                      ...filtered.map((it) => _card(palette, it)),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _chip(TalentGraphPalette palette, AppliedJobsFilter f, String label) {
    final selected = _filter == f;
    return GestureDetector(
      onTap: () => setState(() => _filter = f),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
        decoration: BoxDecoration(
          color: selected ? palette.accentTint : palette.surface,
          border: Border.all(
            color: selected ? palette.accentBorder : palette.border,
          ),
          borderRadius: BorderRadius.circular(999),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? palette.accentSoftText : palette.textSecondary,
            fontWeight: selected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Widget _card(TalentGraphPalette palette, AppliedJobItem it) {
    final isInProgress = it.status == AppliedJobStatus.inProgress;
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
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
                child: Row(
                  children: [
                    Flexible(
                      child: Text(
                        it.companyName,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: palette.textSecondary,
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    if (it.isVerified) ...[
                      const SizedBox(width: 4),
                      Icon(
                        Icons.verified_rounded,
                        size: 15,
                        color: palette.accent,
                      ),
                    ],
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  color:
                      isInProgress ? palette.warningTint : palette.successTint,
                  border: Border.all(
                    color:
                        isInProgress
                            ? palette.warningBorder
                            : palette.successBorder,
                  ),
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
                    Text(
                      it.status.label,
                      style: TextStyle(
                        color: isInProgress ? palette.warning : palette.success,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            it.jobTitle,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              Icon(
                it.isRemote ? Icons.public_rounded : Icons.location_on_outlined,
                size: 14,
                color: palette.textMuted,
              ),
              const SizedBox(width: 4),
              Text(
                it.location,
                style: TextStyle(color: palette.textMuted, fontSize: 12.5),
              ),
              const SizedBox(width: 6),
              Text('·', style: TextStyle(color: palette.textMuted)),
              const SizedBox(width: 6),
              Text(
                it.employmentType,
                style: TextStyle(color: palette.textMuted, fontSize: 12.5),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Divider(color: palette.subtleBorder, height: 1),
          const SizedBox(height: 8),
          Row(
            children: [
              Text(
                it.appliedDateLabel,
                style: TextStyle(
                  color: palette.dateHighlight,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const Spacer(),
              GestureDetector(
                onTap: () => context.push('/applied-jobs/${it.id}/percentiles'),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: palette.accentTint,
                    border: Border.all(color: palette.accentBorder),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'See Percentile',
                        style: TextStyle(
                          color: palette.accentSoftText,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(
                        Icons.arrow_forward_rounded,
                        size: 15,
                        color: palette.accentSoftText,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
