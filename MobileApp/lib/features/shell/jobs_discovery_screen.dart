import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';
import 'package:talentgraph/features/shell/filter_jobs_bottom_sheet.dart';
import 'package:talentgraph/features/shell/job_brief_model.dart';

class JobsDiscoveryScreen extends ConsumerStatefulWidget {
  const JobsDiscoveryScreen({
    super.key,
    this.onThemeToggle,
    this.onSearchChanged,
    this.onFeedTabChanged,
    this.onRemoveFilterChip,
    this.onApplyFilters,
    this.onResetFilters,
    this.onToggleBookmark,
    this.onViewJobDetails,
    this.onBottomNavTap,
  });

  final VoidCallback? onThemeToggle;
  final ValueChanged<String>? onSearchChanged;
  final ValueChanged<int>? onFeedTabChanged;
  final ValueChanged<String>? onRemoveFilterChip;
  final ValueChanged<Map<String, Set<String>>>? onApplyFilters;
  final VoidCallback? onResetFilters;
  final ValueChanged<String>? onToggleBookmark;
  final ValueChanged<String>? onViewJobDetails;
  final ValueChanged<int>? onBottomNavTap;

  @override
  ConsumerState<JobsDiscoveryScreen> createState() =>
      _JobsDiscoveryScreenState();
}

class _JobsDiscoveryScreenState extends ConsumerState<JobsDiscoveryScreen> {
  String _searchQuery = '';
  final Set<String> _activeFilterChips = {};
  int _selectedFeedTab = 0; // 0 = All Jobs, 1 = Recommended, 2 = Saved Jobs
  final Set<String> _bookmarkedJobIds = {};

  List<JobBriefModel> _filteredJobs(BuildContext context) {
    return kDummyJobs.where((job) {
      // Feed tab filter
      if (_selectedFeedTab == 1) {
        // Recommended: evidence trail active
        if (!job.evidenceTrailActive) return false;
      } else if (_selectedFeedTab == 2) {
        // Saved Jobs: bookmarked
        if (!_bookmarkedJobIds.contains(job.jobId)) return false;
      }

      // Search filter: match title, company, or skill chips (case-insensitive)
      if (_searchQuery.isNotEmpty) {
        final q = _searchQuery.toLowerCase();
        final matchesTitle = job.title.toLowerCase().contains(q);
        final matchesCompany = job.company.toLowerCase().contains(q);
        final matchesSkills = job.skillChips.any(
          (chip) => chip.toLowerCase().contains(q),
        );
        if (!matchesTitle && !matchesCompany && !matchesSkills) {
          return false;
        }
      }

      // Filter chips: active filter categories must match job attributes
      if (_activeFilterChips.isNotEmpty) {
        final matchesChip = _activeFilterChips.any((chip) {
          final c = chip.toLowerCase();
          if (c == 'remote') {
            return job.location.toLowerCase().contains('remote');
          }
          if (c == 'hybrid') {
            return job.location.toLowerCase().contains('hybrid');
          }
          if (c == 'on-site') {
            return job.location.toLowerCase().contains('on-site');
          }
          if (c == 'entry') {
            return job.level.toLowerCase().contains('entry');
          }
          if (c == 'mid-level') {
            return job.level.toLowerCase().contains('mid');
          }
          if (c == 'senior') {
            return job.level.toLowerCase().contains('senior');
          }
          if (c == 'senior & staff') {
            return job.level.toLowerCase().contains('senior') ||
                job.level.toLowerCase().contains('staff');
          }
          if (c == 'staff & principal') {
            return job.level.toLowerCase().contains('senior') ||
                job.level.toLowerCase().contains('staff') ||
                job.level.toLowerCase().contains('principal');
          }
          if (c == 'full-time') {
            return job.jobType.toLowerCase().contains('full');
          }
          if (c == 'contract') {
            return job.jobType.toLowerCase().contains('contract');
          }
          if (c == 'part-time') {
            return job.jobType.toLowerCase().contains('part');
          }
          if (c == 'all companies') return true;
          if (c == 'verified teams only') return job.isVerified;
          // Required skills chips: split compound labels on '/'
          final skillTokens = c.split('/').map((s) => s.trim());
          if (skillTokens.any(
            (token) =>
                job.skillChips.any((s) => s.toLowerCase().contains(token)),
          )) {
            return true;
          }
          return false;
        });
        if (!matchesChip) return false;
      }

      return true;
    }).toList();
  }

  Widget _buildEmptyState(BuildContext context, TgColors tokens) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search_off, size: 64, color: tokens.textSecondary),
          const SizedBox(height: 16),
          Text(
            'No jobs found',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: tokens.text,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Try adjusting your search or filters',
            style: TextStyle(fontSize: 14, color: tokens.textSecondary),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<TgColors>()!;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final filteredJobs = _filteredJobs(context);

    return Scaffold(
      backgroundColor: tokens.canvas,
      body: Column(
        children: [
          // Top App Bar (fixed, 64dp + status bar safe area)
          _buildAppBar(context, tokens, isDark),
          // Scrollable body
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.only(
                left: _horizontalPadding(context),
                right: _horizontalPadding(context),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 16),
                  // Discovery header & controls
                  _buildDiscoveryHeader(tokens),
                  const SizedBox(height: 16),
                  // Search row
                  _buildSearchRow(context, tokens),
                  const SizedBox(height: 16),
                  // Feed view segmented tabs
                  _buildFeedTabs(context, tokens),
                  const SizedBox(height: 16),
                  // Horizontal active filter chips
                  _buildActiveFilterChips(context, tokens),
                  const SizedBox(height: 24),
                  // Role brief cards or empty state
                  if (filteredJobs.isEmpty) ...[
                    _buildEmptyState(context, tokens),
                    const SizedBox(height: 24),
                  ] else ...[
                    ...List.generate(filteredJobs.length, (index) {
                      final job = filteredJobs[index];
                      return _buildJobCard(context, tokens, job);
                    }),
                    const SizedBox(height: 24),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppBar(BuildContext context, TgColors tokens, bool isDark) {
    return SafeArea(
      child: Container(
        height: 64,
        padding: EdgeInsets.symmetric(horizontal: _horizontalPadding(context)),
        decoration: BoxDecoration(
          color: tokens.canvas,
          border: Border(bottom: BorderSide(color: tokens.border, width: 1)),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'TalentGraph',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: tokens.text,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Find your next technical role',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w400,
                      color: tokens.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            IconButton(
              icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
              tooltip: isDark ? 'Switch to light mode' : 'Switch to dark mode',
              onPressed: widget.onThemeToggle,
              constraints: const BoxConstraints.tightFor(width: 48, height: 48),
              style: IconButton.styleFrom(
                backgroundColor: tokens.surfaceContainer,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDiscoveryHeader(TgColors tokens) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Find your next role',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: tokens.text,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          '38 verified opportunities',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            color: tokens.textSecondary,
          ),
        ),
      ],
    );
  }

  Widget _buildSearchRow(BuildContext context, TgColors tokens) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            onChanged: (value) {
              setState(() => _searchQuery = value);
              widget.onSearchChanged?.call(value);
            },
            style: TextStyle(fontSize: 14, color: tokens.text),
            decoration: InputDecoration(
              hintText: 'Search by title, company, or skill...',
              hintStyle: TextStyle(fontSize: 14, color: tokens.textSecondary),
              prefixIcon: const Icon(Icons.search, size: 20),
              suffixIcon: IconButton(
                icon: const Icon(Icons.cancel, size: 20),
                onPressed: () {},
                constraints: const BoxConstraints.tightFor(
                  width: 32,
                  height: 32,
                ),
              ),
              filled: true,
              fillColor: tokens.surface,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: tokens.border, width: 1),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: tokens.border, width: 1),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: tokens.focus, width: 1.5),
              ),
            ),
          ),
        ),
        const SizedBox(width: 8),
        SizedBox(
          width: 48,
          child: Stack(
            children: [
              FilledButton(
                onPressed: () async {
                  final initialFilters = <String, Set<String>>{};
                  for (final chip in _activeFilterChips) {
                    final parts = chip.split(': ');
                    if (parts.length == 2) {
                      initialFilters.putIfAbsent(parts[0], () => {});
                      initialFilters[parts[0]]!.add(parts[1]);
                    }
                  }
                  final result =
                      await showModalBottomSheet<Map<String, Set<String>>>(
                        context: context,
                        isScrollControlled: true,
                        backgroundColor: Colors.transparent,
                        builder:
                            (context) => FilterJobsBottomSheet(
                              activeFilters: initialFilters,
                              onRemoveFilterChip: (_) {},
                              onApplyFilters: (filters) {},
                              onResetFilters: () {},
                            ),
                      );
                  if (result != null && mounted) {
                    setState(() {
                      _activeFilterChips.clear();
                      result.forEach((category, values) {
                        for (final v in values) {
                          _activeFilterChips.add('$category: $v');
                        }
                      });
                    });
                  }
                },
                style: FilledButton.styleFrom(
                  backgroundColor: tokens.brand,
                  foregroundColor: tokens.onPrimary,
                  minimumSize: const Size(48, 48),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Icon(Icons.tune, size: 20),
              ),
              Positioned(
                right: 4,
                top: 4,
                child: Container(
                  width: 16,
                  height: 16,
                  decoration: BoxDecoration(
                    color: tokens.destructive,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: tokens.canvas, width: 1),
                  ),
                  child: Center(
                    child: Text(
                      '3',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: tokens.onPrimary,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildFeedTabs(BuildContext context, TgColors tokens) {
    final tabs = const ['All Jobs', 'Recommended', 'Saved Jobs'];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 36,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: tabs.length,
            itemBuilder: (context, index) {
              final isActive = index == _selectedFeedTab;
              return GestureDetector(
                onTap: () => setState(() => _selectedFeedTab = index),
                child: Container(
                  margin: const EdgeInsets.only(right: 10),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color:
                        isActive ? tokens.surfaceContainer : Colors.transparent,
                    border: Border(
                      bottom: BorderSide(
                        color: isActive ? tokens.brand : Colors.transparent,
                        width: 6,
                      ),
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        tabs[index],
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: isActive ? tokens.text : tokens.textSecondary,
                        ),
                      ),
                      if (index == 2) ...[
                        const SizedBox(width: 6),
                        Container(
                          width: 14,
                          height: 14,
                          decoration: BoxDecoration(
                            color: tokens.brand,
                            borderRadius: BorderRadius.circular(7),
                          ),
                          child: Center(
                            child: Text(
                              '${_bookmarkedJobIds.length}',
                              style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w600,
                                color: tokens.onPrimary,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildActiveFilterChips(BuildContext context, TgColors tokens) {
    final activeChips = const ['Remote', 'Senior & Staff', 'TypeScript / Go'];
    final inactiveChips = const ['Full-time', 'All Filters'];
    final allChips = <String>[];
    allChips.addAll(activeChips);
    allChips.addAll(inactiveChips);

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children:
            allChips.map((chip) {
              final isActive = _activeFilterChips.contains(chip);
              return _buildFilterChip(context, tokens, chip, isActive);
            }).toList(),
      ),
    );
  }

  Widget _buildFilterChip(
    BuildContext context,
    TgColors tokens,
    String label,
    bool isActive,
  ) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        label: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w500,
            color: isActive ? tokens.onPrimary : tokens.textSecondary,
          ),
        ),
        selected: isActive,
        onSelected: (_) {
          setState(() {
            if (isActive) {
              _activeFilterChips.remove(label);
            } else {
              _activeFilterChips.add(label);
            }
          });
          widget.onApplyFilters?.call(
            Map.fromEntries(
              _activeFilterChips.map((chip) => MapEntry(chip, {chip})),
            ),
          );
        },
        backgroundColor: tokens.surfaceContainer,
        selectedColor: tokens.brand,
        side: BorderSide(
          color: isActive ? tokens.brand : tokens.border,
          width: 1,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        padding: EdgeInsets.zero,
        labelPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        materialTapTargetSize: MaterialTapTargetSize.padded,
      ),
    );
  }

  Widget _buildJobCard(
    BuildContext context,
    TgColors tokens,
    JobBriefModel job,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.border, width: 1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Row: title + bookmark + verified badge
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            job.title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: tokens.text,
                            ),
                          ),
                          if (job.isVerified) ...[
                            const SizedBox(height: 6),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Container(
                                  width: 14,
                                  height: 14,
                                  decoration: BoxDecoration(
                                    color: tokens.success,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Icon(
                                    Icons.verified,
                                    size: 10,
                                    color: tokens.onPrimary,
                                  ),
                                ),
                                const SizedBox(width: 6),
                                Expanded(
                                  child: Text(
                                    job.company,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w600,
                                      color: tokens.text,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ] else ...[
                            Text(
                              job.company,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                                color: tokens.text,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          if (_bookmarkedJobIds.contains(job.jobId)) {
                            _bookmarkedJobIds.remove(job.jobId);
                          } else {
                            _bookmarkedJobIds.add(job.jobId);
                          }
                        });
                        widget.onToggleBookmark?.call(job.jobId);
                      },
                      child: SizedBox(
                        width: 48,
                        height: 48,
                        child: Icon(
                          _bookmarkedJobIds.contains(job.jobId)
                              ? Icons.bookmark
                              : Icons.bookmark_border,
                          color:
                              _bookmarkedJobIds.contains(job.jobId)
                                  ? tokens.brand
                                  : tokens.textSecondary,
                          size: 24,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                // Metadata row
                Wrap(
                  spacing: 12,
                  runSpacing: 8,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.public,
                          size: 14,
                          color: tokens.textSecondary,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          job.location,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w400,
                            color: tokens.textSecondary,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.schedule,
                          size: 14,
                          color: tokens.textSecondary,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          job.jobType,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w400,
                            color: tokens.textSecondary,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: tokens.surfaceContainer,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        job.level,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w500,
                          color: tokens.textSecondary,
                        ),
                      ),
                    ),
                    Text(
                      job.postedAgo,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: tokens.textSecondary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                // Summary
                Text(
                  job.summary,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: tokens.text,
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 12),
                // Skill chips
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children:
                      job.skillChips.map((chip) {
                        return Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 6,
                          ),
                          decoration: BoxDecoration(
                            color: tokens.surfaceContainer,
                            border: Border.all(color: tokens.border, width: 1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            chip,
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                              color: tokens.textSecondary,
                            ),
                          ),
                        );
                      }).toList(),
                ),
                const SizedBox(height: 16),
                // Evidence Trail status
                Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color:
                            job.evidenceTrailActive
                                ? tokens.brand
                                : tokens.textSecondary,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        job.evidenceTrailText,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color:
                              job.evidenceTrailActive
                                  ? tokens.brand
                                  : tokens.textSecondary,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                // CTA button
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: FilledButton(
                    onPressed: () => widget.onViewJobDetails?.call(job.jobId),
                    style: FilledButton.styleFrom(
                      backgroundColor: tokens.brand,
                      foregroundColor: tokens.onPrimary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'View Job Details',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(width: 6),
                        Icon(Icons.arrow_forward, size: 16),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  double _horizontalPadding(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return width < 360 ? 12.0 : 16.0;
  }
}
