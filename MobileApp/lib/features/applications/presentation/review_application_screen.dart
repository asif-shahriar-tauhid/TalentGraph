import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';
import 'package:talentgraph/core/domain/tg_models.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/presentation/auth_controller.dart';
import 'package:talentgraph/features/shell/job_detail_screen.dart';

enum _CvOption { profile, upload }

class ReviewApplicationScreen extends ConsumerStatefulWidget {
  const ReviewApplicationScreen({super.key, required this.jobId});

  final String jobId;

  @override
  ConsumerState<ReviewApplicationScreen> createState() =>
      _ReviewApplicationScreenState();
}

class _ReviewApplicationScreenState
    extends ConsumerState<ReviewApplicationScreen> {
  static const int _maxFileBytes = 5 * 1024 * 1024; // 5 MB

  _CvOption _selectedCv = _CvOption.profile;
  String? _uploadedFileName;
  String? _uploadedFileSize;
  bool _agreedToDeclaration = true;
  bool _isSubmitting = false;

  Future<void> _pickCvFile() async {
    setState(() => _selectedCv = _CvOption.upload);

    try {
      final result = await FilePicker.pickFiles(
        type: FileType.custom,
        allowedExtensions: const ['pdf', 'docx'],
      );

      if (result == null || result.files.isEmpty) return;

      final file = result.files.first;
      int? fileSize;
      if (file.path != null) {
        fileSize = await File(file.path!).length();
      }

      if (fileSize != null && fileSize > _maxFileBytes) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('File exceeds maximum allowed size of 5 MB.'),
          ),
        );
        return;
      }

      setState(() {
        _uploadedFileName = file.name;
        _uploadedFileSize =
            fileSize != null ? _formatBytes(fileSize) : 'Selected';
      });
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Could not open file picker.')),
      );
    }
  }

  Future<void> _submitApplication(JobDetailModel job) async {
    if (_isSubmitting) return;
    setState(() => _isSubmitting = true);

    await Future<void>.delayed(const Duration(milliseconds: 500));

    if (!mounted) return;
    setState(() => _isSubmitting = false);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Application submitted for ${job.title}!'),
        duration: const Duration(seconds: 2),
      ),
    );
    context.go('/jobs');
  }

  String _formatBytes(int bytes) {
    if (bytes <= 0) return '0 KB';
    const kb = 1024;
    const mb = 1024 * 1024;
    if (bytes >= mb) {
      return '${(bytes / mb).toStringAsFixed(1)} MB';
    }
    return '${(bytes / kb).round()} KB';
  }

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<TgColors>()!;
    final detailAsync = ref.watch(jobDetailProvider(widget.jobId));
    final authState = ref.watch(authControllerProvider);

    final candidateName = switch (authState) {
      AuthSignedIn(:final user) when user.name.trim().isNotEmpty => user.name,
      _ => 'Alex Chen',
    };
    final candidateEmail = switch (authState) {
      AuthSignedIn(:final user) when user.email.trim().isNotEmpty => user.email,
      _ => 'alex.chen.dev@example.com',
    };
    final githubHandle =
        candidateEmail.contains('@')
            ? candidateEmail.split('@').first.replaceAll('.', '')
            : 'alexchen-dev';
    final profileCvName =
        '${candidateName.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]+'), '_')}_cv.pdf';

    return Scaffold(
      backgroundColor: tokens.canvas,
      body: SafeArea(
        child: detailAsync.when(
          loading:
              () =>
                  Center(child: CircularProgressIndicator(color: tokens.brand)),
          error:
              (_, _) => Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Could not load application details',
                      style: TextStyle(color: tokens.text, fontSize: 15),
                    ),
                    const SizedBox(height: 12),
                    FilledButton(
                      onPressed:
                          () => ref.invalidate(jobDetailProvider(widget.jobId)),
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              ),
          data: (job) {
            if (job == null) {
              return Center(
                child: FilledButton(
                  onPressed: () => context.go('/jobs'),
                  child: const Text('Back to Jobs'),
                ),
              );
            }

            final hasValidCv =
                _selectedCv == _CvOption.profile ||
                (_selectedCv == _CvOption.upload && _uploadedFileName != null);
            final canSubmit =
                _agreedToDeclaration && hasValidCv && !_isSubmitting;

            return Column(
              children: [
                _TopReviewBar(
                  tokens: tokens,
                  onBack: () {
                    if (context.canPop()) {
                      context.pop();
                    } else {
                      context.go('/jobs/${widget.jobId}');
                    }
                  },
                ),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(16, 4, 16, 28),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Review Application',
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.w700,
                            color: tokens.text,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Review your application details and CV before submitting.',
                          style: TextStyle(
                            fontSize: 13,
                            color: tokens.textSecondary,
                          ),
                        ),
                        const SizedBox(height: 16),
                        _JobSummaryCard(tokens: tokens, job: job),
                        const SizedBox(height: 20),
                        _SectionHeaderRow(
                          tokens: tokens,
                          leftTitle: 'YOUR INFORMATION',
                          rightHint: 'From Profile',
                        ),
                        const SizedBox(height: 8),
                        _ProfileInfoCard(
                          tokens: tokens,
                          fullName: candidateName,
                          email: candidateEmail,
                          githubUrl: 'github.com/$githubHandle',
                        ),
                        const SizedBox(height: 20),
                        _SectionHeaderRow(
                          tokens: tokens,
                          leftTitle: 'CV FOR THIS APPLICATION',
                          rightHint: 'Select Option',
                          rightHintColor: tokens.brand,
                        ),
                        const SizedBox(height: 8),
                        _ProfileCvCard(
                          tokens: tokens,
                          isSelected: _selectedCv == _CvOption.profile,
                          fileName: profileCvName,
                          onTap:
                              () => setState(
                                () => _selectedCv = _CvOption.profile,
                              ),
                        ),
                        const SizedBox(height: 12),
                        _UploadCvCard(
                          tokens: tokens,
                          isSelected: _selectedCv == _CvOption.upload,
                          uploadedFileName: _uploadedFileName,
                          uploadedFileSize: _uploadedFileSize,
                          onTap: _pickCvFile,
                        ),
                        const SizedBox(height: 20),
                        _SectionHeaderRow(
                          tokens: tokens,
                          leftTitle: 'WHAT HAPPENS AFTER YOU APPLY?',
                        ),
                        const SizedBox(height: 8),
                        _NextStepsCard(tokens: tokens),
                        const SizedBox(height: 20),
                        _SectionHeaderRow(
                          tokens: tokens,
                          leftTitle: 'CANDIDATE DECLARATION',
                        ),
                        const SizedBox(height: 8),
                        _DeclarationCard(
                          tokens: tokens,
                          agreed: _agreedToDeclaration,
                          onChanged:
                              (val) =>
                                  setState(() => _agreedToDeclaration = val),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: FilledButton(
                            onPressed:
                                canSubmit
                                    ? () => _submitApplication(job)
                                    : null,
                            style: FilledButton.styleFrom(
                              backgroundColor: tokens.brand,
                              disabledBackgroundColor: tokens.brand.withValues(
                                alpha: 0.4,
                              ),
                              foregroundColor: tokens.onPrimary,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                            child:
                                _isSubmitting
                                    ? SizedBox(
                                      width: 20,
                                      height: 20,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                        color: tokens.onPrimary,
                                      ),
                                    )
                                    : const Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Icon(Icons.send_rounded, size: 17),
                                        SizedBox(width: 8),
                                        Text(
                                          'Submit Application',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.w700,
                                          ),
                                        ),
                                      ],
                                    ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}

class _TopReviewBar extends StatelessWidget {
  const _TopReviewBar({required this.tokens, required this.onBack});

  final TgColors tokens;
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
                  Icon(Icons.arrow_back, size: 16, color: tokens.textSecondary),
                  const SizedBox(width: 6),
                  Text(
                    'Back to Job',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: tokens.textSecondary,
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
              color: tokens.brand.withValues(alpha: 0.14),
              border: Border.all(color: tokens.brand.withValues(alpha: 0.45)),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              'Step 2 of 2 — Review',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: tokens.brand,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _JobSummaryCard extends StatelessWidget {
  const _JobSummaryCard({required this.tokens, required this.job});

  final TgColors tokens;
  final JobDetailModel job;

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
              Expanded(
                child: Text(
                  job.company,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w500,
                    color: tokens.textSecondary,
                  ),
                ),
              ),
              if (job.isVerified)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: tokens.success.withValues(alpha: 0.15),
                    border: Border.all(
                      color: tokens.success.withValues(alpha: 0.35),
                    ),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Verified',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: tokens.success,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(Icons.check_circle, size: 12, color: tokens.success),
                    ],
                  ),
                ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            job.title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              height: 1.3,
              color: tokens.text,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 10,
            runSpacing: 6,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              _InlineMeta(
                tokens: tokens,
                icon: Icons.public,
                text: job.location,
              ),
              Text('•', style: TextStyle(color: tokens.textSecondary)),
              _InlineMeta(
                tokens: tokens,
                icon: Icons.schedule,
                text: job.jobType,
              ),
              Text('•', style: TextStyle(color: tokens.textSecondary)),
              _InlineMeta(
                tokens: tokens,
                icon: Icons.workspace_premium_outlined,
                text: job.level,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _InlineMeta extends StatelessWidget {
  const _InlineMeta({
    required this.tokens,
    required this.icon,
    required this.text,
  });

  final TgColors tokens;
  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 13, color: tokens.textSecondary),
        const SizedBox(width: 5),
        Text(text, style: TextStyle(fontSize: 12, color: tokens.textSecondary)),
      ],
    );
  }
}

class _SectionHeaderRow extends StatelessWidget {
  const _SectionHeaderRow({
    required this.tokens,
    required this.leftTitle,
    this.rightHint,
    this.rightHintColor,
  });

  final TgColors tokens;
  final String leftTitle;
  final String? rightHint;
  final Color? rightHintColor;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          leftTitle,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w700,
            letterSpacing: 0.6,
            color: tokens.textSecondary,
          ),
        ),
        if (rightHint != null) ...[
          const Spacer(),
          Text(
            rightHint!,
            style: TextStyle(
              fontSize: 11.5,
              fontWeight: FontWeight.w500,
              color: rightHintColor ?? tokens.textSecondary,
            ),
          ),
        ],
      ],
    );
  }
}

class _ProfileInfoCard extends StatelessWidget {
  const _ProfileInfoCard({
    required this.tokens,
    required this.fullName,
    required this.email,
    required this.githubUrl,
  });

  final TgColors tokens;
  final String fullName;
  final String email;
  final String githubUrl;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          _InfoRow(
            tokens: tokens,
            icon: Icons.badge_outlined,
            label: 'Full Name',
            value: fullName,
            trailing: _VerifiedStatus(tokens: tokens),
          ),
          Divider(color: tokens.border, height: 1),
          _InfoRow(
            tokens: tokens,
            icon: Icons.mail_outline,
            label: 'Primary Email',
            value: email,
            trailing: _VerifiedStatus(tokens: tokens),
          ),
          Divider(color: tokens.border, height: 1),
          _InfoRow(
            tokens: tokens,
            icon: Icons.code_rounded,
            label: 'GitHub Profile',
            value: githubUrl,
            trailing: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: tokens.brand.withValues(alpha: 0.14),
                border: Border.all(color: tokens.brand.withValues(alpha: 0.35)),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.check, size: 12, color: tokens.brand),
                  const SizedBox(width: 4),
                  Text(
                    'Authorized',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: tokens.brand,
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

class _InfoRow extends StatelessWidget {
  const _InfoRow({
    required this.tokens,
    required this.icon,
    required this.label,
    required this.value,
    required this.trailing,
  });

  final TgColors tokens;
  final IconData icon;
  final String label;
  final String value;
  final Widget trailing;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Row(
        children: [
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: tokens.surfaceContainer,
              border: Border.all(color: tokens.border),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, size: 17, color: tokens.textSecondary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(fontSize: 11, color: tokens.textSecondary),
                ),
                const SizedBox(height: 2),
                Text(
                  value,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w600,
                    color: tokens.text,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          trailing,
        ],
      ),
    );
  }
}

class _VerifiedStatus extends StatelessWidget {
  const _VerifiedStatus({required this.tokens});

  final TgColors tokens;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.check_circle, size: 14, color: tokens.success),
        const SizedBox(width: 4),
        Text(
          'Verified',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: tokens.success,
          ),
        ),
      ],
    );
  }
}

class _RadioCircle extends StatelessWidget {
  const _RadioCircle({required this.tokens, required this.selected});

  final TgColors tokens;
  final bool selected;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 18,
      height: 18,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: selected ? tokens.brand : tokens.border,
          width: selected ? 5 : 1.5,
        ),
      ),
    );
  }
}

class _ProfileCvCard extends StatelessWidget {
  const _ProfileCvCard({
    required this.tokens,
    required this.isSelected,
    required this.fileName,
    required this.onTap,
  });

  final TgColors tokens;
  final bool isSelected;
  final String fileName;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: tokens.surface,
          border: Border.all(
            color:
                isSelected
                    ? tokens.brand.withValues(alpha: 0.7)
                    : tokens.border,
            width: isSelected ? 1.5 : 1,
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Row(
              children: [
                _RadioCircle(tokens: tokens, selected: isSelected),
                const SizedBox(width: 10),
                Text(
                  'Profile CV',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: tokens.text,
                  ),
                ),
                const Spacer(),
                if (isSelected)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 3,
                    ),
                    decoration: BoxDecoration(
                      color: tokens.brand.withValues(alpha: 0.14),
                      border: Border.all(
                        color: tokens.brand.withValues(alpha: 0.4),
                      ),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      'Active Selection',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: tokens.brand,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: tokens.surfaceContainer,
                border: Border.all(color: tokens.border),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: tokens.brand.withValues(alpha: 0.15),
                      border: Border.all(
                        color: tokens.brand.withValues(alpha: 0.35),
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(
                      Icons.description_outlined,
                      size: 20,
                      color: tokens.brand,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          fileName,
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: tokens.text,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          '248 KB  •  Updated Oct 12, 2026',
                          style: TextStyle(
                            fontSize: 11.5,
                            color: tokens.textSecondary,
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
      ),
    );
  }
}

class _UploadCvCard extends StatelessWidget {
  const _UploadCvCard({
    required this.tokens,
    required this.isSelected,
    required this.uploadedFileName,
    required this.uploadedFileSize,
    required this.onTap,
  });

  final TgColors tokens;
  final bool isSelected;
  final String? uploadedFileName;
  final String? uploadedFileSize;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: tokens.surface,
          border: Border.all(
            color:
                isSelected
                    ? tokens.brand.withValues(alpha: 0.7)
                    : tokens.border,
            width: isSelected ? 1.5 : 1,
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Row(
              children: [
                _RadioCircle(tokens: tokens, selected: isSelected),
                const SizedBox(width: 10),
                Text(
                  'Upload another CV',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: tokens.text,
                  ),
                ),
                const Spacer(),
                Text(
                  'This application only',
                  style: TextStyle(fontSize: 11.5, color: tokens.textSecondary),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
              decoration: BoxDecoration(
                color: tokens.surfaceContainer,
                border: Border.all(color: tokens.border),
                borderRadius: BorderRadius.circular(10),
              ),
              child:
                  uploadedFileName == null
                      ? Column(
                        children: [
                          Icon(
                            Icons.upload_file_outlined,
                            size: 22,
                            color: tokens.brand,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Tap to select PDF or DOCX file',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w600,
                              color: tokens.text,
                            ),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            'Maximum size 5 MB',
                            style: TextStyle(
                              fontSize: 11.5,
                              color: tokens.textSecondary,
                            ),
                          ),
                        ],
                      )
                      : Row(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              color: tokens.brand.withValues(alpha: 0.15),
                              border: Border.all(
                                color: tokens.brand.withValues(alpha: 0.35),
                              ),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Icon(
                              Icons.description_outlined,
                              size: 20,
                              color: tokens.brand,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  uploadedFileName!,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    color: tokens.text,
                                  ),
                                ),
                                const SizedBox(height: 3),
                                Text(
                                  '${uploadedFileSize ?? ''}  •  Tap to replace',
                                  style: TextStyle(
                                    fontSize: 11.5,
                                    color: tokens.textSecondary,
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
      ),
    );
  }
}

class _NextStepsCard extends StatelessWidget {
  const _NextStepsCard({required this.tokens});

  final TgColors tokens;

  static const _steps = [
    (
      Icons.sync_alt_rounded,
      'Your application status updates after the server confirms successful submission.',
    ),
    (
      Icons.event_available_outlined,
      'The company may schedule an assessment for eligible applicants.',
    ),
    (
      Icons.assignment_outlined,
      'Assessment availability and timing will appear in the Assessment Center when confirmed.',
    ),
    (
      Icons.analytics_outlined,
      'Assessment results and job-specific percentile information are shown only when the backend makes them available.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          for (var i = 0; i < _steps.length; i++) ...[
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: Icon(_steps[i].$1, size: 15, color: tokens.brand),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    _steps[i].$2,
                    style: TextStyle(
                      fontSize: 12.5,
                      height: 1.45,
                      color: tokens.textSecondary,
                    ),
                  ),
                ),
              ],
            ),
            if (i < _steps.length - 1) const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }
}

class _DeclarationCard extends StatelessWidget {
  const _DeclarationCard({
    required this.tokens,
    required this.agreed,
    required this.onChanged,
  });

  final TgColors tokens;
  final bool agreed;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => onChanged(!agreed),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: tokens.surface,
          border: Border.all(color: tokens.border),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 18,
              height: 18,
              margin: const EdgeInsets.only(top: 2),
              decoration: BoxDecoration(
                color: agreed ? tokens.brand : Colors.transparent,
                border: Border.all(
                  color: agreed ? tokens.brand : tokens.border,
                  width: 1.5,
                ),
                borderRadius: BorderRadius.circular(4),
              ),
              child:
                  agreed
                      ? Icon(Icons.check, size: 13, color: tokens.onPrimary)
                      : null,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'I confirm that the information and GitHub profile submitted with this application are accurate and represent my own work.',
                style: TextStyle(
                  fontSize: 12.5,
                  height: 1.45,
                  color: tokens.textSecondary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
