import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';
import 'package:talentgraph/core/data/repositories.dart';
import 'package:talentgraph/core/domain/tg_models.dart';

final jobDetailProvider =
FutureProvider.autoDispose.family<JobDetailModel?, String>((ref, jobId) {
  return ref.watch(jobsRepositoryProvider).getJobDetail(jobId);
});

class JobDetailScreen extends ConsumerWidget {
  const JobDetailScreen({super.key, required this.jobId});

  final String jobId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tokens = Theme.of(context).extension<TgColors>()!;
    final detailAsync = ref.watch(jobDetailProvider(jobId));

    return Scaffold(
      backgroundColor: tokens.canvas,
      body: SafeArea(
        child: detailAsync.when(
          loading: () => Center(
            child: CircularProgressIndicator(color: tokens.brand),
          ),
          error: (error, _) => _ErrorState(
            tokens: tokens,
            onBack: () => _goBack(context),
            onRetry: () => ref.invalidate(jobDetailProvider(jobId)),
          ),
          data: (job) {
            if (job == null) {
              return _NotFoundState(
                tokens: tokens,
                onBack: () => _goBack(context),
              );
            }

            return Column(
              children: [
                _TopActionRow(
                  tokens: tokens,
                  isBookmarked: job.isBookmarked,
                  onBack: () => _goBack(context),
                  onToggleBookmark: () async {
                    await ref
                        .read(jobsRepositoryProvider)
                        .toggleBookmark(job.jobId);
                    ref.invalidate(jobDetailProvider(jobId));
                    if (!context.mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          job.isBookmarked
                              ? 'Removed from saved jobs'
                              : 'Saved to your jobs',
                        ),
                        duration: const Duration(seconds: 2),
                      ),
                    );
                  },
                  onShare: () async {
                    final shareText =
                        '${job.title} at ${job.company} (${job.location}) — TalentGraph';
                    await Clipboard.setData(ClipboardData(text: shareText));
                    if (!context.mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Job details copied to clipboard'),
                        duration: const Duration(seconds: 2),
                      ),
                    );
                  },
                ),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(16, 4, 16, 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _HeroCard(tokens: tokens, job: job),
                        const SizedBox(height: 14),
                        _AccentSectionCard(
                          tokens: tokens,
                          title: 'Mission & Scope',
                          child: Text(
                            job.missionAndScope,
                            style: TextStyle(
                              fontSize: 13.5,
                              height: 1.55,
                              color: tokens.textSecondary,
                            ),
                          ),
                        ),
                        const SizedBox(height: 14),
                        _AccentSectionCard(
                          tokens: tokens,
                          title: 'Responsibilities',
                          child: Column(
                            children: job.responsibilities
                                .map(
                                  (item) => Padding(
                                padding: const EdgeInsets.only(bottom: 10),
                                child: Row(
                                  crossAxisAlignment:
                                  CrossAxisAlignment.start,
                                  children: [
                                    Padding(
                                      padding:
                                      const EdgeInsets.only(top: 6),
                                      child: Container(
                                        width: 5,
                                        height: 5,
                                        decoration: BoxDecoration(
                                          color: tokens.brand,
                                          shape: BoxShape.circle,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 10),
                                    Expanded(
                                      child: Text(
                                        item,
                                        style: TextStyle(
                                          fontSize: 13.5,
                                          height: 1.5,
                                          color: tokens.textSecondary,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            )
                                .toList(),
                          ),
                        ),
                        const SizedBox(height: 14),
                        _RoleRequirementsCard(tokens: tokens, job: job),
                        const SizedBox(height: 14),
                        _EvaluationCard(tokens: tokens, job: job),
                      ],
                    ),
                  ),
                ),
                _ApplyBottomBar(
                  tokens: tokens,
                  onApply: () => context.push('/jobs/${job.jobId}/apply'),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  void _goBack(BuildContext context) {
    if (context.canPop()) {
      context.pop();
    } else {
      context.go('/jobs');
    }
  }
}

class _TopActionRow extends StatelessWidget {
  const _TopActionRow({
    required this.tokens,
    required this.isBookmarked,
    required this.onBack,
    required this.onToggleBookmark,
    required this.onShare,
  });

  final TgColors tokens;
  final bool isBookmarked;
  final VoidCallback onBack;
  final VoidCallback onToggleBookmark;
  final VoidCallback onShare;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 8),
      child: Row(
        children: [
          InkWell(
            onTap: onBack,
            borderRadius: BorderRadius.circular(8),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: tokens.surface,
                border: Border.all(color: tokens.border),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.arrow_back, size: 16, color: tokens.text),
                  const SizedBox(width: 6),
                  Text(
                    'Back to Jobs',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: tokens.text,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const Spacer(),
          _SquareActionButton(
            tokens: tokens,
            icon: isBookmarked ? Icons.bookmark : Icons.bookmark_border,
            iconColor: isBookmarked ? tokens.brand : tokens.text,
            tooltip: isBookmarked ? 'Remove Bookmark' : 'Bookmark Job',
            onTap: onToggleBookmark,
          ),
          const SizedBox(width: 8),
          _SquareActionButton(
            tokens: tokens,
            icon: Icons.share_outlined,
            iconColor: tokens.text,
            tooltip: 'Share Job',
            onTap: onShare,
          ),
        ],
      ),
    );
  }
}

class _SquareActionButton extends StatelessWidget {
  const _SquareActionButton({
    required this.tokens,
    required this.icon,
    required this.iconColor,
    required this.tooltip,
    required this.onTap,
  });

  final TgColors tokens;
  final IconData icon;
  final Color iconColor;
  final String tooltip;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: tooltip,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: tokens.surface,
            border: Border.all(color: tokens.border),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, size: 18, color: iconColor),
        ),
      ),
    );
  }
}

class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.tokens, required this.job});

  final TgColors tokens;
  final JobDetailModel job;

  String _initials(String name) {
    final parts = name.trim().split(RegExp(r'\s+')).where((p) => p.isNotEmpty);
    if (parts.isEmpty) return 'TG';
    if (parts.length == 1) {
      return parts.first.substring(0, parts.first.length.clamp(1, 2)).toUpperCase();
    }
    return '${parts.first[0]}${parts.elementAt(1)[0]}'.toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: tokens.surfaceContainer,
                  border: Border.all(color: tokens.border),
                  borderRadius: BorderRadius.circular(8),
                ),
                alignment: Alignment.center,
                child: Text(
                  _initials(job.company),
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: tokens.text,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Flexible(
                child: Text(
                  job.company,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w600,
                    color: tokens.text,
                  ),
                ),
              ),
              if (job.isVerified) ...[
                const SizedBox(width: 8),
                Container(
                  width: 18,
                  height: 18,
                  decoration: BoxDecoration(
                    color: tokens.success.withValues(alpha: 0.16),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.check,
                    size: 12,
                    color: tokens.success,
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 12),
          Text(
            job.title,
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w700,
              height: 1.25,
              color: tokens.text,
            ),
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _PillBadge(
                tokens: tokens,
                icon: Icons.public,
                label: job.location,
              ),
              _PillBadge(
                tokens: tokens,
                icon: Icons.schedule,
                label: job.jobType,
              ),
              _PillBadge(
                tokens: tokens,
                icon: Icons.workspace_premium_outlined,
                label: job.level,
              ),
              _PillBadge(
                tokens: tokens,
                icon: Icons.event_available_outlined,
                label: 'Closes ${_formatShortDate(job.closesAt)}',
                accentColor: tokens.success,
              ),
              _PillBadge(
                tokens: tokens,
                icon: Icons.calendar_today_outlined,
                label: 'Posted ${_formatShortDate(job.postedAt)}',
                accentColor: const Color(0xFF3B82F6),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _PillBadge extends StatelessWidget {
  const _PillBadge({
    required this.tokens,
    required this.icon,
    required this.label,
    this.accentColor,
  });

  final TgColors tokens;
  final IconData icon;
  final String label;
  final Color? accentColor;

  @override
  Widget build(BuildContext context) {
    final tint = accentColor ?? tokens.textSecondary;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer,
        border: Border.all(color: tokens.border),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: tint),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              fontSize: 11.5,
              fontWeight: FontWeight.w500,
              color: accentColor == null ? tokens.textSecondary : tokens.text,
            ),
          ),
        ],
      ),
    );
  }
}

class _AccentSectionCard extends StatelessWidget {
  const _AccentSectionCard({
    required this.tokens,
    required this.title,
    required this.child,
  });

  final TgColors tokens;
  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 3,
                height: 16,
                decoration: BoxDecoration(
                  color: tokens.brand,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: tokens.text,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _RoleRequirementsCard extends StatelessWidget {
  const _RoleRequirementsCard({required this.tokens, required this.job});

  final TgColors tokens;
  final JobDetailModel job;

  @override
  Widget build(BuildContext context) {
    final requiredSkills =
    job.skillRequirements.where((s) => !s.isPreferred).toList();
    final preferredSkills =
    job.skillRequirements.where((s) => s.isPreferred).toList();

    return _AccentSectionCard(
      tokens: tokens,
      title: 'Role Requirements',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (requiredSkills.isNotEmpty) ...[
            Row(
              children: [
                Text(
                  'REQUIRED SKILLS',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.4,
                    color: tokens.brand,
                  ),
                ),
                const Spacer(),
                Text(
                  'Expected day one',
                  style: TextStyle(
                    fontSize: 11,
                    color: tokens.textSecondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: requiredSkills
                  .map(
                    (s) => Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 5,
                  ),
                  decoration: BoxDecoration(
                    color: tokens.brand.withValues(alpha: 0.14),
                    border: Border.all(
                      color: tokens.brand.withValues(alpha: 0.35),
                    ),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    s.skillName,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: tokens.text,
                    ),
                  ),
                ),
              )
                  .toList(),
            ),
            const SizedBox(height: 16),
          ],
          if (preferredSkills.isNotEmpty) ...[
            Row(
              children: [
                const Text(
                  'PREFERRED SKILLS',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.4,
                    color: Color(0xFF60A5FA),
                  ),
                ),
                const Spacer(),
                Text(
                  'Breadth across & depth',
                  style: TextStyle(
                    fontSize: 11,
                    color: tokens.textSecondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: preferredSkills
                  .map(
                    (s) => Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 5,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFF3B82F6).withValues(alpha: 0.14),
                    border: Border.all(
                      color: const Color(0xFF3B82F6).withValues(alpha: 0.35),
                    ),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    s.skillName,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: tokens.text,
                    ),
                  ),
                ),
              )
                  .toList(),
            ),
            const SizedBox(height: 16),
          ],
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: tokens.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Eligibility & Prerequisites',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: tokens.text,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  job.eligibilityNotes,
                  style: TextStyle(
                    fontSize: 12.5,
                    height: 1.5,
                    color: tokens.textSecondary,
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

class _EvaluationCard extends StatelessWidget {
  const _EvaluationCard({required this.tokens, required this.job});

  final TgColors tokens;
  final JobDetailModel job;

  static const _barColors = [
    Color(0xFFF97316),
    Color(0xFF3B82F6),
    Color(0xFF10B981),
    Color(0xFFA855F7),
    Color(0xFFF59E0B),
  ];

  @override
  Widget build(BuildContext context) {
    final skills = job.skillRequirements;
    final totalWeight = skills.fold<int>(0, (sum, item) => sum + item.weight);

    return _AccentSectionCard(
      tokens: tokens,
      title: 'How This Role is Evaluated',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: tokens.border),
            ),
            child: Column(
              children: [
                for (var i = 0; i < skills.length; i++) ...[
                  _EvaluationSkillBar(
                    tokens: tokens,
                    skillName: skills[i].skillName,
                    weight: skills[i].weight,
                    barColor: _barColors[i % _barColors.length],
                  ),
                  if (i < skills.length - 1) const SizedBox(height: 12),
                ],
                if (skills.isNotEmpty) ...[
                  const SizedBox(height: 14),
                  Divider(color: tokens.border, height: 1),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Text(
                        'Total Evaluation Weight',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: tokens.text,
                        ),
                      ),
                      const Spacer(),
                      Text(
                        '$totalWeight%',
                        style: TextStyle(
                          fontSize: 13.5,
                          fontWeight: FontWeight.w700,
                          color: tokens.brand,
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(height: 12),
          Text.rich(
            TextSpan(
              style: TextStyle(
                fontSize: 11.5,
                height: 1.45,
                color: tokens.textSecondary,
              ),
              children: [
                TextSpan(
                  text: 'Evaluation note: ',
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color: tokens.text,
                  ),
                ),
                const TextSpan(
                  text:
                  'Skill weights represent evaluation proportion across submitted evidence and technical assessment; candidate match metrics are calculated post-submission.',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _EvaluationSkillBar extends StatelessWidget {
  const _EvaluationSkillBar({
    required this.tokens,
    required this.skillName,
    required this.weight,
    required this.barColor,
  });

  final TgColors tokens;
  final String skillName;
  final int weight;
  final Color barColor;

  @override
  Widget build(BuildContext context) {
    final ratio = (weight.clamp(0, 100)) / 100.0;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                skillName,
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w500,
                  color: tokens.text,
                ),
              ),
            ),
            Text(
              '$weight%',
              style: TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w700,
                color: barColor,
              ),
            ),
          ],
        ),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: ratio,
            minHeight: 6,
            backgroundColor: tokens.surface,
            valueColor: AlwaysStoppedAnimation<Color>(barColor),
          ),
        ),
      ],
    );
  }
}

class _ApplyBottomBar extends StatelessWidget {
  const _ApplyBottomBar({
    required this.tokens,
    required this.onApply,
  });

  final TgColors tokens;
  final VoidCallback onApply;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 14),
      decoration: BoxDecoration(
        color: tokens.canvas,
        border: Border(top: BorderSide(color: tokens.border)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: double.infinity,
            height: 46,
            child: FilledButton(
              onPressed: onApply,
              style: FilledButton.styleFrom(
                backgroundColor: tokens.brand,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Apply with Saved CV & Profile',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                  ),
                  SizedBox(width: 8),
                  Icon(Icons.arrow_forward, size: 18),
                ],
              ),
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'One-click apply with your saved profile',
            style: TextStyle(fontSize: 11, color: tokens.textSecondary),
          ),
        ],
      ),
    );
  }
}

class _ErrorState extends StatelessWidget {
  const _ErrorState({
    required this.tokens,
    required this.onBack,
    required this.onRetry,
  });

  final TgColors tokens;
  final VoidCallback onBack;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.error_outline, size: 48, color: tokens.destructive),
            const SizedBox(height: 12),
            Text(
              'Could not load job details',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: tokens.text,
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                OutlinedButton(onPressed: onBack, child: const Text('Back')),
                const SizedBox(width: 12),
                FilledButton(onPressed: onRetry, child: const Text('Retry')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _NotFoundState extends StatelessWidget {
  const _NotFoundState({required this.tokens, required this.onBack});

  final TgColors tokens;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.work_off_outlined, size: 48, color: tokens.textSecondary),
            const SizedBox(height: 12),
            Text(
              'Job not found',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: tokens.text,
              ),
            ),
            const SizedBox(height: 16),
            FilledButton(
              onPressed: onBack,
              child: const Text('Back to Jobs'),
            ),
          ],
        ),
      ),
    );
  }
}

String _formatShortDate(DateTime date) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return '${months[date.month - 1]} ${date.day}, ${date.year}';
}