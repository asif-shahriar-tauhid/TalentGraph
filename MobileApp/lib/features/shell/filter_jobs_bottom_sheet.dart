import 'package:flutter/material.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';

class FilterJobsBottomSheet extends StatefulWidget {
  const FilterJobsBottomSheet({
    super.key,
    required this.activeFilters,
    required this.onRemoveFilterChip,
    required this.onApplyFilters,
    required this.onResetFilters,
  });

  final Map<String, Set<String>> activeFilters;
  final ValueChanged<String>? onRemoveFilterChip;
  final ValueChanged<Map<String, Set<String>>>? onApplyFilters;
  final VoidCallback? onResetFilters;

  @override
  State<FilterJobsBottomSheet> createState() => _FilterJobsBottomSheetState();
}

class _FilterJobsBottomSheetState extends State<FilterJobsBottomSheet> {
  late Map<String, Set<String>> _filters;

  static const _workArrangementOptions = ['Remote', 'Hybrid', 'On-site'];
  static const _experienceLevelOptions = [
    'Entry',
    'Mid-level',
    'Senior',
    'Staff & Principal',
  ];
  static const _jobTypeOptions = ['Full-time', 'Contract', 'Part-time'];
  static const _requiredSkillsOptions = [
    'TypeScript',
    'Go',
    'Rust',
    'Python',
    'Distributed Systems',
    'Kubernetes',
    'AWS',
  ];
  static const _companyCriteriaOptions = [
    'All Companies',
    'Verified Teams Only',
  ];
  static const _datePostedOptions = [
    'Any time',
    'Past 24h',
    'Past week',
    'Past month',
  ];

  @override
  void initState() {
    super.initState();
    _filters = Map.from(widget.activeFilters);
    _filters.updateAll((_, set) => Set.from(set));
  }

  void _toggle(String category, String value) {
    setState(() {
      final set = Set<String>.from(_filters[category] ?? {});
      if (set.contains(value)) {
        set.remove(value);
      } else {
        set.add(value);
      }
      _filters[category] = set;
    });
  }

  int _activeCount() {
    int count = 0;
    for (final set in _filters.values) {
      count += set.length;
    }
    return count;
  }

  Widget _buildSection(
    BuildContext context,
    String title,
    List<String> options,
    String category,
  ) {
    final tokens = Theme.of(context).extension<TgColors>()!;
    final selected = _filters[category] ?? {};

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: tokens.text,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children:
              options.map((option) {
                final isSelected = selected.contains(option);
                return FilterChip(
                  label: Text(
                    option,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color:
                          isSelected ? tokens.onPrimary : tokens.textSecondary,
                    ),
                  ),
                  selected: isSelected,
                  onSelected: (_) => _toggle(category, option),
                  backgroundColor: tokens.surfaceContainer,
                  selectedColor: tokens.brand,
                  checkmarkColor: tokens.onPrimary,
                  side: BorderSide(
                    color: isSelected ? tokens.brand : tokens.border,
                    width: 1,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  padding: EdgeInsets.zero,
                  labelPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 10,
                  ),
                  materialTapTargetSize: MaterialTapTargetSize.padded,
                );
              }).toList(),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<TgColors>()!;

    return DraggableScrollableSheet(
      expand: false,
      initialChildSize: 0.85,
      maxChildSize: 0.95,
      minChildSize: 0.5,
      builder: (context, scrollController) {
        return Container(
          decoration: BoxDecoration(
            color: tokens.surface,
            border: Border.all(color: tokens.border, width: 1),
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(12),
              topRight: Radius.circular(12),
            ),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const SizedBox(height: 12),
              Container(
                width: 32,
                height: 4,
                decoration: BoxDecoration(
                  color: tokens.border.withValues(alpha: 0.5),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(
                    child: Text(
                      'Filter Jobs',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: tokens.text,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: tokens.brand.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      '${_activeCount()} active',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: tokens.brand,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.of(context).pop(),
                    constraints: const BoxConstraints.tightFor(
                      width: 48,
                      height: 48,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Expanded(
                child: SingleChildScrollView(
                  controller: scrollController,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSection(
                        context,
                        'Work Arrangement',
                        _workArrangementOptions,
                        'workArrangement',
                      ),
                      const SizedBox(height: 20),
                      _buildSection(
                        context,
                        'Experience Level',
                        _experienceLevelOptions,
                        'experienceLevel',
                      ),
                      const SizedBox(height: 20),
                      _buildSection(
                        context,
                        'Job Type',
                        _jobTypeOptions,
                        'jobType',
                      ),
                      const SizedBox(height: 20),
                      _buildSection(
                        context,
                        'Required Skills',
                        _requiredSkillsOptions,
                        'requiredSkills',
                      ),
                      const SizedBox(height: 20),
                      _buildSection(
                        context,
                        'Company Criteria',
                        _companyCriteriaOptions,
                        'companyCriteria',
                      ),
                      const SizedBox(height: 20),
                      _buildSection(
                        context,
                        'Date Posted',
                        _datePostedOptions,
                        'datePosted',
                      ),
                      const SizedBox(height: 32),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () {
                        widget.onResetFilters?.call();
                        Navigator.of(context).pop();
                      },
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size(double.infinity, 48),
                        side: BorderSide(color: tokens.border, width: 1),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: Text(
                        'Reset all (${_activeCount()})',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: tokens.text,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: FilledButton(
                      onPressed: () {
                        widget.onApplyFilters?.call(_filters);
                        Navigator.of(context).pop();
                      },
                      style: FilledButton.styleFrom(
                        backgroundColor: tokens.brand,
                        foregroundColor: tokens.onPrimary,
                        minimumSize: const Size(double.infinity, 48),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: const Text(
                        'Show 38 Verified Roles →',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
            ],
          ),
        );
      },
    );
  }
}
