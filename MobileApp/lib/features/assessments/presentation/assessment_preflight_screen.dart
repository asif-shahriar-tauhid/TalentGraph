import 'package:flutter/material.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';
import 'package:talentgraph/shared/widgets/tg_app_bar.dart';
import 'package:talentgraph/features/assessments/presentation/active_assessment_screen.dart';
@immutable
class AssessmentPreflightData {
  const AssessmentPreflightData({
    required this.assessmentId,
    required this.sessionStatusLabel,
    required this.isSessionOpen,
    required this.companyName,
    required this.isVerifiedOrg,
    required this.roleTitle,
    required this.timezoneLabel,
    required this.scheduledDateLabel,
    required this.scheduledTimeSubLabel,
    required this.scheduleHelperText,
    required this.questionCount,
    required this.questionCategoryLabel,
    required this.durationMinutes,
    required this.durationLimitLabel,
    required this.timerNoticeText,
    required this.cameraStatusLabel,
    required this.isCameraReady,
    required this.cameraPrimaryNotice,
    required this.cameraSecondaryNotice,
    required this.microphoneStatusLabel,
    required this.isMicrophoneReady,
    required this.microphonePrimaryNotice,
    required this.microphoneSecondaryNotice,
    required this.consentStatement,
    required this.footerIsolationNotice,
  });

  final String assessmentId;
  final String sessionStatusLabel;
  final bool isSessionOpen;
  final String companyName;
  final bool isVerifiedOrg;
  final String roleTitle;
  final String timezoneLabel;
  final String scheduledDateLabel;
  final String scheduledTimeSubLabel;
  final String scheduleHelperText;
  final int questionCount;
  final String questionCategoryLabel;
  final int durationMinutes;
  final String durationLimitLabel;
  final String timerNoticeText;
  final String cameraStatusLabel;
  final bool isCameraReady;
  final String cameraPrimaryNotice;
  final String cameraSecondaryNotice;
  final String microphoneStatusLabel;
  final bool isMicrophoneReady;
  final String microphonePrimaryNotice;
  final String microphoneSecondaryNotice;
  final String consentStatement;
  final String footerIsolationNotice;

  AssessmentPreflightData copyWith({
    String? assessmentId,
    String? companyName,
    String? roleTitle,
  }) {
    return AssessmentPreflightData(
      assessmentId: assessmentId ?? this.assessmentId,
      sessionStatusLabel: sessionStatusLabel,
      isSessionOpen: isSessionOpen,
      companyName: companyName ?? this.companyName,
      isVerifiedOrg: isVerifiedOrg,
      roleTitle: roleTitle ?? this.roleTitle,
      timezoneLabel: timezoneLabel,
      scheduledDateLabel: scheduledDateLabel,
      scheduledTimeSubLabel: scheduledTimeSubLabel,
      scheduleHelperText: scheduleHelperText,
      questionCount: questionCount,
      questionCategoryLabel: questionCategoryLabel,
      durationMinutes: durationMinutes,
      durationLimitLabel: durationLimitLabel,
      timerNoticeText: timerNoticeText,
      cameraStatusLabel: cameraStatusLabel,
      isCameraReady: isCameraReady,
      cameraPrimaryNotice: cameraPrimaryNotice,
      cameraSecondaryNotice: cameraSecondaryNotice,
      microphoneStatusLabel: microphoneStatusLabel,
      isMicrophoneReady: isMicrophoneReady,
      microphonePrimaryNotice: microphonePrimaryNotice,
      microphoneSecondaryNotice: microphoneSecondaryNotice,
      consentStatement: consentStatement,
      footerIsolationNotice: footerIsolationNotice,
    );
  }
}

abstract final class TalentGraphPreflightSampleData {
  static const AssessmentPreflightData sample = AssessmentPreflightData(
    assessmentId: 'assess-1',
    sessionStatusLabel: 'Session Open',
    isSessionOpen: true,
    companyName: 'Aether Telemetry Systems',
    isVerifiedOrg: true,
    roleTitle: 'Staff Distributed Systems Engineer - High Throughput Telemetry',
    timezoneLabel: 'UTC+00',
    scheduledDateLabel: 'Thursday, Oct 29, 2026',
    scheduledTimeSubLabel: '14:00 UTC · Synchronous Cohort',
    scheduleHelperText:
    'All candidates assigned to this assessment share the same scheduled start time.',
    questionCount: 7,
    questionCategoryLabel: 'Technical & Architecture',
    durationMinutes: 45,
    durationLimitLabel: 'Total Cohort Limit',
    timerNoticeText:
    'Your assessment timer starts when you enter the active assessment. When the overall time limit expires, your assessment is automatically submitted.',
    cameraStatusLabel: 'Camera Ready',
    isCameraReady: true,
    cameraPrimaryNotice:
    'Exactly five randomly timed front-camera snapshot opportunities may occur during your assessment. These snapshots are collected for later human review.',
    cameraSecondaryNotice:
    'Snapshots are not automatic proof of misconduct. Camera or network issues must not automatically disqualify a candidate.',
    microphoneStatusLabel: 'Microphone Ready',
    isMicrophoneReady: true,
    microphonePrimaryNotice:
    "Voice recording will also be collected during your technical assessment for the assessment's stated review purpose.",
    microphoneSecondaryNotice:
    'Microphone permission is required before entry. Audio recording only initiates inside the active assessment; no audio is recorded on this preflight screen.',
    consentStatement:
    'I have reviewed the assessment instructions and understand and consent to the collection of front-camera snapshots and voice recordings during my assessment for the stated review purpose.',
    footerIsolationNotice:
    'Starting enters isolated assessment mode. Timers initiate upon entry.',
  );
}

class AssessmentPreflightScreen extends StatefulWidget {
  const AssessmentPreflightScreen({
    super.key,
    this.data = TalentGraphPreflightSampleData.sample,
    this.onStartAssessment,
    this.appBar = const TgAppBar(),
    this.onBackToAssessments,
  });

  final AssessmentPreflightData data;
  final VoidCallback? onStartAssessment;
  final PreferredSizeWidget? appBar;
  final VoidCallback? onBackToAssessments;

  @override
  State<AssessmentPreflightScreen> createState() =>
      _AssessmentPreflightScreenState();
}

class _AssessmentPreflightScreenState extends State<AssessmentPreflightScreen> {
  bool _isConsentChecked = false;

  void _handleStart() {
    if (widget.onStartAssessment != null) {
      widget.onStartAssessment!();
      return;
    }
    Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (_) => ActiveAssessmentScreen(data: widget.data),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final data = widget.data;
    final canStart =
        _isConsentChecked && data.isCameraReady && data.isMicrophoneReady;

    return Scaffold(
      backgroundColor: palette.background,
      appBar: widget.appBar,
      body: SafeArea(
        top: widget.appBar == null,
        child: Align(
          alignment: Alignment.topCenter,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: ListView(
              physics: const AlwaysScrollableScrollPhysics(
                parent: BouncingScrollPhysics(),
              ),
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 28),
              children: [
                _PreflightTopNavigationRow(
                  sessionLabel: data.sessionStatusLabel,
                  isSessionOpen: data.isSessionOpen,
                  onBack: widget.onBackToAssessments ??
                          () => Navigator.of(context).maybePop(),
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 8,
                  runSpacing: 6,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    Text(
                      data.companyName,
                      style: TextStyle(
                        color: palette.textMuted,
                        fontSize: 12.5,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    if (data.isVerifiedOrg) _VerifiedOrgBadge(isDark: isDark),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  data.roleTitle,
                  style: TextStyle(
                    color: palette.textPrimary,
                    fontSize: 19,
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.3,
                    height: 1.3,
                  ),
                ),
                const SizedBox(height: 20),
                _SectionHeadingRow(
                  title: 'Assessment Schedule',
                  indicatorColor: palette.accent,
                  trailing: Container(
                    padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: palette.surfaceElevated,
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: palette.border, width: 1),
                    ),
                    child: Text(
                      data.timezoneLabel,
                      style: TextStyle(
                        color: palette.textMuted,
                        fontSize: 10.5,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.4,
                      ),
                    ),
                  ),
                  palette: palette,
                ),
                const SizedBox(height: 10),
                _ScheduleSummaryCard(
                  dateLabel: data.scheduledDateLabel,
                  timeSubLabel: data.scheduledTimeSubLabel,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 10),
                Text(
                  data.scheduleHelperText,
                  style: TextStyle(
                    color: palette.textMuted,
                    fontSize: 12,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 16),
                IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Expanded(
                        child: _PreflightMetricCard(
                          valueText: '${data.questionCount}',
                          unitText: 'Questions',
                          subtitle: data.questionCategoryLabel,
                          palette: palette,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _PreflightMetricCard(
                          valueText: '${data.durationMinutes}',
                          unitText: 'Minutes',
                          subtitle: data.durationLimitLabel,
                          palette: palette,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),
                _TimerWarningBanner(
                  message: data.timerNoticeText,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 22),
                _SectionHeadingRow(
                  title: 'Camera & Voice Recording',
                  indicatorColor: _PreflightAccents.cyan(isDark),
                  palette: palette,
                ),
                const SizedBox(height: 12),
                _HardwareCheckCard(
                  icon: Icons.photo_camera_front_outlined,
                  title: 'Front-camera snapshots',
                  statusLabel: data.cameraStatusLabel,
                  statusForeground: _PreflightAccents.cyan(isDark),
                  statusBackground: _PreflightAccents.cyanTint(isDark),
                  statusBorder: _PreflightAccents.cyanBorder(isDark),
                  primaryBody: data.cameraPrimaryNotice,
                  secondaryBody: data.cameraSecondaryNotice,
                  palette: palette,
                ),
                const SizedBox(height: 12),
                _HardwareCheckCard(
                  icon: Icons.mic_none_rounded,
                  title: 'Voice recording',
                  statusLabel: data.microphoneStatusLabel,
                  statusForeground: _PreflightAccents.purple(isDark),
                  statusBackground: _PreflightAccents.purpleTint(isDark),
                  statusBorder: _PreflightAccents.purpleBorder(isDark),
                  primaryBody: data.microphonePrimaryNotice,
                  secondaryBody: data.microphoneSecondaryNotice,
                  palette: palette,
                ),
                const SizedBox(height: 16),
                _ConsentCheckboxCard(
                  isChecked: _isConsentChecked,
                  statement: data.consentStatement,
                  onChanged: (value) {
                    setState(() => _isConsentChecked = value);
                  },
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 16),
                _StartAssessmentButton(
                  enabled: canStart,
                  onPressed: _handleStart,
                  palette: palette,
                  isDark: isDark,
                ),
                const SizedBox(height: 12),
                Text(
                  data.footerIsolationNotice,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: palette.textMuted,
                    fontSize: 11.5,
                    height: 1.4,
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

class _PreflightTopNavigationRow extends StatelessWidget {
  const _PreflightTopNavigationRow({
    required this.sessionLabel,
    required this.isSessionOpen,
    required this.onBack,
    required this.palette,
    required this.isDark,
  });

  final String sessionLabel;
  final bool isSessionOpen;
  final VoidCallback onBack;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final badgeFg = isSessionOpen
        ? _PreflightAccents.success(isDark)
        : _PreflightAccents.warning(isDark);
    final badgeBg = isSessionOpen
        ? _PreflightAccents.successTint(isDark)
        : _PreflightAccents.warningTint(isDark);
    final badgeBorder = isSessionOpen
        ? _PreflightAccents.successBorder(isDark)
        : _PreflightAccents.warningBorder(isDark);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Align(
            alignment: Alignment.centerLeft,
            child: InkWell(
              onTap: onBack,
              borderRadius: BorderRadius.circular(6),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      Icons.arrow_back_rounded,
                      size: 15,
                      color: palette.textMuted,
                    ),
                    const SizedBox(width: 6),
                    Flexible(
                      child: Text(
                        'Back to Assessments',
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
              ),
            ),
          ),
        ),
        const SizedBox(width: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4.5),
          decoration: BoxDecoration(
            color: badgeBg,
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: badgeBorder, width: 1),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 6,
                height: 6,
                decoration: BoxDecoration(
                  color: badgeFg,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 6),
              Text(
                sessionLabel,
                style: TextStyle(
                  color: badgeFg,
                  fontSize: 11.5,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _VerifiedOrgBadge extends StatelessWidget {
  const _VerifiedOrgBadge({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final fg = _PreflightAccents.success(isDark);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2.5),
      decoration: BoxDecoration(
        color: _PreflightAccents.successTint(isDark),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(
          color: _PreflightAccents.successBorder(isDark),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.verified_rounded,
            size: 12,
            color: fg,
          ),
          const SizedBox(width: 4),
          Text(
            'Verified Org',
            style: TextStyle(
              color: fg,
              fontSize: 11,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionHeadingRow extends StatelessWidget {
  const _SectionHeadingRow({
    required this.title,
    required this.indicatorColor,
    required this.palette,
    this.trailing,
  });

  final String title;
  final Color indicatorColor;
  final TalentGraphPalette palette;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: 3,
          height: 14,
          decoration: BoxDecoration(
            color: indicatorColor,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            title,
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 14,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.1,
            ),
          ),
        ),
        if (trailing != null) ...[
          const SizedBox(width: 8),
          trailing!,
        ],
      ],
    );
  }
}

class _ScheduleSummaryCard extends StatelessWidget {
  const _ScheduleSummaryCard({
    required this.dateLabel,
    required this.timeSubLabel,
    required this.palette,
    required this.isDark,
  });

  final String dateLabel;
  final String timeSubLabel;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              color: _PreflightAccents.accentTint(isDark),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: _PreflightAccents.accentBorder(isDark),
                width: 1,
              ),
            ),
            child: Icon(
              Icons.calendar_today_outlined,
              size: 17,
              color: palette.accentSoftText,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  dateLabel,
                  style: TextStyle(
                    color: palette.textPrimary,
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  timeSubLabel,
                  style: TextStyle(
                    color: palette.textMuted,
                    fontSize: 12,
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

class _PreflightMetricCard extends StatelessWidget {
  const _PreflightMetricCard({
    required this.valueText,
    required this.unitText,
    required this.subtitle,
    required this.palette,
  });

  final String valueText;
  final String unitText;
  final String subtitle;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Wrap(
            spacing: 5,
            runSpacing: 2,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Text(
                valueText,
                style: TextStyle(
                  color: palette.textPrimary,
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
              Text(
                unitText,
                style: TextStyle(
                  color: palette.accentSoftText,
                  fontSize: 13.5,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            subtitle,
            style: TextStyle(
              color: palette.textMuted,
              fontSize: 11.5,
            ),
          ),
        ],
      ),
    );
  }
}

class _TimerWarningBanner extends StatelessWidget {
  const _TimerWarningBanner({
    required this.message,
    required this.palette,
    required this.isDark,
  });

  final String message;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: _PreflightAccents.accentTint(isDark),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _PreflightAccents.accentBorder(isDark),
          width: 1,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 1),
            child: Icon(
              Icons.timer_outlined,
              size: 16,
              color: palette.accentSoftText,
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

class _HardwareCheckCard extends StatelessWidget {
  const _HardwareCheckCard({
    required this.icon,
    required this.title,
    required this.statusLabel,
    required this.statusForeground,
    required this.statusBackground,
    required this.statusBorder,
    required this.primaryBody,
    required this.secondaryBody,
    required this.palette,
  });

  final IconData icon;
  final String title;
  final String statusLabel;
  final Color statusForeground;
  final Color statusBackground;
  final Color statusBorder;
  final String primaryBody;
  final String secondaryBody;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 16,
                color: palette.textSecondary,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    color: palette.textPrimary,
                    fontSize: 13.5,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
                decoration: BoxDecoration(
                  color: statusBackground,
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(color: statusBorder, width: 1),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 5.5,
                      height: 5.5,
                      decoration: BoxDecoration(
                        color: statusForeground,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 5),
                    Text(
                      statusLabel,
                      style: TextStyle(
                        color: statusForeground,
                        fontSize: 10.5,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            primaryBody,
            style: TextStyle(
              color: palette.textSecondary,
              fontSize: 12.5,
              height: 1.45,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            secondaryBody,
            style: TextStyle(
              color: palette.textMuted,
              fontSize: 12,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _ConsentCheckboxCard extends StatelessWidget {
  const _ConsentCheckboxCard({
    required this.isChecked,
    required this.statement,
    required this.onChanged,
    required this.palette,
    required this.isDark,
  });

  final bool isChecked;
  final String statement;
  final ValueChanged<bool> onChanged;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: palette.surface,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: () => onChanged(!isChecked),
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isChecked
                  ? _PreflightAccents.accentBorder(isDark)
                  : palette.subtleBorder,
              width: 1,
            ),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 2),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 160),
                  width: 20,
                  height: 20,
                  decoration: BoxDecoration(
                    color: isChecked ? palette.accent : palette.surfaceElevated,
                    borderRadius: BorderRadius.circular(5),
                    border: Border.all(
                      color: isChecked ? palette.accent : palette.border,
                      width: 1.2,
                    ),
                  ),
                  child: isChecked
                      ? Icon(
                    Icons.check_rounded,
                    size: 14,
                    color: isDark
                        ? const Color(0xFF111827)
                        : Colors.white,
                  )
                      : null,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  statement,
                  style: TextStyle(
                    color: palette.textSecondary,
                    fontSize: 12.5,
                    height: 1.45,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _StartAssessmentButton extends StatelessWidget {
  const _StartAssessmentButton({
    required this.enabled,
    required this.onPressed,
    required this.palette,
    required this.isDark,
  });

  final bool enabled;
  final VoidCallback onPressed;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final backgroundColor = enabled
        ? palette.accent
        : (isDark ? const Color(0xFF7C3F17) : const Color(0xFFFED7AA));
    final foregroundColor = enabled
        ? (isDark ? const Color(0xFF14110F) : Colors.white)
        : (isDark ? const Color(0xFF1F1610) : const Color(0xFF9A3412));

    return SizedBox(
      width: double.infinity,
      height: 48,
      child: Material(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(10),
        child: InkWell(
          onTap: enabled ? onPressed : null,
          borderRadius: BorderRadius.circular(10),
          child: Center(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Start Assessment',
                  style: TextStyle(
                    color: foregroundColor,
                    fontSize: 14.5,
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.1,
                  ),
                ),
                const SizedBox(width: 8),
                Icon(
                  Icons.arrow_forward_rounded,
                  size: 17,
                  color: foregroundColor,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Semantic colors scoped to the preflight screen.
abstract final class _PreflightAccents {
  static Color success(bool isDark) =>
      isDark ? const Color(0xFF34D399) : const Color(0xFF059669);
  static Color successTint(bool isDark) =>
      isDark ? const Color(0xFF0D2920) : const Color(0xFFECFDF5);
  static Color successBorder(bool isDark) =>
      isDark ? const Color(0xFF1A4D3B) : const Color(0xFFA7F3D0);

  static Color warning(bool isDark) =>
      isDark ? const Color(0xFFF59E0B) : const Color(0xFFB45309);
  static Color warningTint(bool isDark) =>
      isDark ? const Color(0xFF2B1F0B) : const Color(0xFFFFFBEB);
  static Color warningBorder(bool isDark) =>
      isDark ? const Color(0xFF573C14) : const Color(0xFFFDE68A);

  static Color accentTint(bool isDark) =>
      isDark ? const Color(0xFF2B1A0E) : const Color(0xFFFFF7ED);
  static Color accentBorder(bool isDark) =>
      isDark ? const Color(0xFF5C3418) : const Color(0xFFFED7AA);

  static Color cyan(bool isDark) =>
      isDark ? const Color(0xFF38BDF8) : const Color(0xFF0284C7);
  static Color cyanTint(bool isDark) =>
      isDark ? const Color(0xFF0E2533) : const Color(0xFFF0F9FF);
  static Color cyanBorder(bool isDark) =>
      isDark ? const Color(0xFF1B455E) : const Color(0xFFBAE6FD);

  static Color purple(bool isDark) =>
      isDark ? const Color(0xFFA78BFA) : const Color(0xFF7C3AED);
  static Color purpleTint(bool isDark) =>
      isDark ? const Color(0xFF1E1933) : const Color(0xFFF5F3FF);
  static Color purpleBorder(bool isDark) =>
      isDark ? const Color(0xFF392E63) : const Color(0xFFDDD6FE);
}