import 'dart:async';

import 'package:flutter/material.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';
import 'package:talentgraph/features/assessments/presentation/assessment_preflight_screen.dart';
import 'package:talentgraph/features/assessments/presentation/assessment_submitted_screen.dart';

@immutable
class AssessmentOption {
  const AssessmentOption({
    required this.id,
    required this.labelLetter,
    required this.text,
  });

  final String id;
  final String labelLetter;
  final String text;
}

@immutable
class ActiveAssessmentQuestionData {
  const ActiveAssessmentQuestionData({
    required this.assessmentCode,
    required this.questionRemaining,
    required this.assessmentRemaining,
    required this.isCameraEnabled,
    required this.isVoiceRecordingActive,
    required this.currentQuestionNumber,
    required this.totalQuestions,
    required this.points,
    required this.topicLabel,
    required this.questionTitle,
    required this.scenarioPrompt,
    required this.options,
  });

  final String assessmentCode;
  final Duration questionRemaining;
  final Duration assessmentRemaining;
  final bool isCameraEnabled;
  final bool isVoiceRecordingActive;
  final int currentQuestionNumber;
  final int totalQuestions;
  final int points;
  final String topicLabel;
  final String questionTitle;
  final String scenarioPrompt;
  final List<AssessmentOption> options;
}

abstract final class TalentGraphActiveAssessmentSampleData {
  static const ActiveAssessmentQuestionData
  question3 = ActiveAssessmentQuestionData(
    assessmentCode: 'ID: 8820-RAFT',
    questionRemaining: Duration(minutes: 4, seconds: 16),
    assessmentRemaining: Duration(minutes: 32, seconds: 45),
    isCameraEnabled: true,
    isVoiceRecordingActive: true,
    currentQuestionNumber: 3,
    totalQuestions: 7,
    points: 20,
    topicLabel: 'Distributed Consensus & Raft Log Replication',
    questionTitle: 'State Resolution Post-Partition in Raft Majority Quorum',
    scenarioPrompt:
        'In a Raft consensus cluster consisting of 5 nodes, Node A (Leader) successfully writes entry #104 to its local log and receives network acknowledgments from Node B and Node C before experiencing an unrecoverable network partition that isolates Node A and Node B into a minority partition.',
    options: [
      AssessmentOption(
        id: 'opt-a',
        labelLetter: 'A',
        text:
            'Entry #104 is committed and preserved because Node C already acknowledged receipt to the prior leader before the partition occurred.',
      ),
      AssessmentOption(
        id: 'opt-b',
        labelLetter: 'B',
        text:
            'Entry #104 is committed in the cluster state machine because 3 out of 5 nodes (A, B, C) persisted the entry to disk, meeting the strict quorum threshold (N/2 + 1).',
      ),
      AssessmentOption(
        id: 'opt-c',
        labelLetter: 'C',
        text:
            'Entry #104 is overwritten and discarded by the new majority leader because entry #104 was never committed in the term of the new leader.',
      ),
      AssessmentOption(
        id: 'opt-d',
        labelLetter: 'D',
        text:
            'The majority partition halts log execution and enters an unrecoverable deadlock state until Node A reconnects and syncs term indices.',
      ),
    ],
  );
}

class ActiveAssessmentScreen extends StatefulWidget {
  const ActiveAssessmentScreen({
    super.key,
    this.data,
    this.question = TalentGraphActiveAssessmentSampleData.question3,
    this.nextButtonLabel = 'Save & Next Question',
  });

  /// Preflight context passed from AssessmentPreflightScreen (optional).
  final AssessmentPreflightData? data;
  final ActiveAssessmentQuestionData question;
  final String nextButtonLabel;

  @override
  State<ActiveAssessmentScreen> createState() => _ActiveAssessmentScreenState();
}

class _ActiveAssessmentScreenState extends State<ActiveAssessmentScreen>
    with WidgetsBindingObserver {
  late DateTime _questionEndsAt;
  late DateTime _assessmentEndsAt;
  late int _questionSecondsLeft;
  late int _assessmentSecondsLeft;

  Timer? _timer;
  String? _selectedOptionId;
  bool _isDialogOpen = false;
  bool _hasSubmitted = false;

  bool get _isQuestionExpired => _questionSecondsLeft <= 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    final now = DateTime.now();
    _questionEndsAt = now.add(widget.question.questionRemaining);
    _assessmentEndsAt = now.add(widget.question.assessmentRemaining);
    _questionSecondsLeft = widget.question.questionRemaining.inSeconds.clamp(
      0,
      359999,
    );
    _assessmentSecondsLeft = widget.question.assessmentRemaining.inSeconds
        .clamp(0, 359999);
    _startTimers();
  }

  @override
  void didUpdateWidget(covariant ActiveAssessmentScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.question != widget.question) {
      final now = DateTime.now();
      _selectedOptionId = null;
      _questionEndsAt = now.add(widget.question.questionRemaining);
      _questionSecondsLeft = widget.question.questionRemaining.inSeconds.clamp(
        0,
        359999,
      );

      if (oldWidget.question.assessmentRemaining !=
          widget.question.assessmentRemaining) {
        _assessmentEndsAt = now.add(widget.question.assessmentRemaining);
        _assessmentSecondsLeft = widget.question.assessmentRemaining.inSeconds
            .clamp(0, 359999);
      }
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _syncTimers();
    }
  }

  void _startTimers() {
    _timer?.cancel();
    // 500ms tick prevents skipped seconds from timer drift,
    // while setState only triggers when the displayed second changes.
    _timer = Timer.periodic(const Duration(milliseconds: 500), (_) {
      _syncTimers();
    });
  }

  int _remainingSecondsUntil(DateTime target, DateTime now) {
    final diffMs = target.difference(now).inMilliseconds;
    if (diffMs <= 0) return 0;
    return (diffMs / 1000).ceil().clamp(0, 359999);
  }

  void _syncTimers() {
    if (!mounted || _hasSubmitted) {
      _timer?.cancel();
      return;
    }

    final now = DateTime.now();
    final nextAssessment = _remainingSecondsUntil(_assessmentEndsAt, now);
    final nextQuestion = _remainingSecondsUntil(_questionEndsAt, now);

    if (nextAssessment <= 0) {
      _timer?.cancel();
      if (_questionSecondsLeft != 0 || _assessmentSecondsLeft != 0) {
        setState(() {
          _questionSecondsLeft = 0;
          _assessmentSecondsLeft = 0;
        });
      }
      _navigateToSubmittedScreen(wasEarlyExit: false, wasAutoSubmitted: true);
      return;
    }

    if (nextQuestion != _questionSecondsLeft ||
        nextAssessment != _assessmentSecondsLeft) {
      setState(() {
        _questionSecondsLeft = nextQuestion;
        _assessmentSecondsLeft = nextAssessment;
      });
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _timer?.cancel();
    super.dispose();
  }

  String _formatMmSs(int totalSeconds) {
    final safe = totalSeconds.clamp(0, 359999);
    final minutes = (safe ~/ 60).toString().padLeft(2, '0');
    final seconds = (safe % 60).toString().padLeft(2, '0');
    return '$minutes:$seconds';
  }

  AssessmentOption? get _selectedOption {
    if (_selectedOptionId == null) return null;
    for (final option in widget.question.options) {
      if (option.id == _selectedOptionId) return option;
    }
    return null;
  }

  void _navigateToSubmittedScreen({
    required bool wasEarlyExit,
    required bool wasAutoSubmitted,
  }) {
    if (_hasSubmitted || !mounted) return;
    _hasSubmitted = true;
    _timer?.cancel();

    // If a confirmation dialog is open during auto-submit, close it first.
    if (_isDialogOpen) {
      _isDialogOpen = false;
      Navigator.of(context, rootNavigator: true).pop();
    }

    // NOTE: তোমার AssessmentSubmittedScreen-এর constructor-এ কোনো parameter
    // (যেমন data, assessmentCode, wasEarlyExit ইত্যাদি) থাকলে এখান থেকে পাস করে দিও।
    Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (_) => const AssessmentSubmittedScreen(),
      ),
    );
  }

  Future<void> _showEarlySubmitDialog() async {
    if (_isDialogOpen || _hasSubmitted) return;

    final palette = TalentGraphPalette.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final dangerColor =
        isDark ? const Color(0xFFF87171) : const Color(0xFFDC2626);

    _isDialogOpen = true;
    bool? shouldExit;
    try {
      shouldExit = await showDialog<bool>(
        context: context,
        barrierDismissible: false,
        builder: (dialogContext) {
          return AlertDialog(
            backgroundColor: palette.surface,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
              side: BorderSide(color: palette.subtleBorder, width: 1),
            ),
            titlePadding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
            contentPadding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
            actionsPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            title: Row(
              children: [
                Icon(Icons.warning_amber_rounded, size: 20, color: dangerColor),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Early Submit & Exit?',
                    style: TextStyle(
                      color: palette.textPrimary,
                      fontSize: 16.5,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
            content: Text(
              'You still have ${_formatMmSs(_assessmentSecondsLeft)} remaining on this assessment. Once you exit early, your current responses will be finalized and you cannot resume.',
              style: TextStyle(
                color: palette.textSecondary,
                fontSize: 13,
                height: 1.45,
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogContext).pop(false),
                child: Text(
                  'Continue',
                  style: TextStyle(
                    color: palette.textSecondary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              FilledButton(
                style: FilledButton.styleFrom(
                  backgroundColor: dangerColor,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                onPressed: () => Navigator.of(dialogContext).pop(true),
                child: const Text(
                  'Confirm Early Submit',
                  style: TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
            ],
          );
        },
      );
    } finally {
      _isDialogOpen = false;
    }

    if (shouldExit == true && mounted) {
      _navigateToSubmittedScreen(wasEarlyExit: true, wasAutoSubmitted: false);
    }
  }

  Future<void> _handleSaveAndNext() async {
    if (_isDialogOpen || _hasSubmitted) return;

    final palette = TalentGraphPalette.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final selected = _selectedOption;

    if (selected == null && !_isQuestionExpired) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(
          SnackBar(
            content: Text(
              'Please select an option before continuing.',
              style: TextStyle(
                color: palette.textPrimary,
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
            behavior: SnackBarBehavior.floating,
            backgroundColor: palette.surfaceElevated,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
              side: BorderSide(color: palette.border, width: 1),
            ),
            duration: const Duration(seconds: 2),
          ),
        );
      return;
    }

    final dialogMessage =
        selected != null
            ? 'You selected Option ${selected.labelLetter}. Submit this demo assessment now?'
            : 'Time for this question expired with no option selected. Submit this demo assessment now?';

    _isDialogOpen = true;
    bool? confirmed;
    try {
      confirmed = await showDialog<bool>(
        context: context,
        builder: (dialogContext) {
          return AlertDialog(
            backgroundColor: palette.surface,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
              side: BorderSide(color: palette.subtleBorder, width: 1),
            ),
            titlePadding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
            contentPadding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
            actionsPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            title: Text(
              'Submit Demo Answer?',
              style: TextStyle(
                color: palette.textPrimary,
                fontSize: 16.5,
                fontWeight: FontWeight.w700,
              ),
            ),
            content: Text(
              dialogMessage,
              style: TextStyle(
                color: palette.textSecondary,
                fontSize: 13,
                height: 1.45,
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogContext).pop(false),
                child: Text(
                  'Review',
                  style: TextStyle(
                    color: palette.textSecondary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              FilledButton(
                style: FilledButton.styleFrom(
                  backgroundColor: palette.accent,
                  foregroundColor:
                      isDark ? const Color(0xFF14110F) : Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                onPressed: () => Navigator.of(dialogContext).pop(true),
                child: const Text(
                  'Submit Assessment',
                  style: TextStyle(fontWeight: FontWeight.w700),
                ),
              ),
            ],
          );
        },
      );
    } finally {
      _isDialogOpen = false;
    }

    if (confirmed == true && mounted) {
      _navigateToSubmittedScreen(wasEarlyExit: false, wasAutoSubmitted: false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final q = widget.question;
    final warningRed =
        isDark ? const Color(0xFFF87171) : const Color(0xFFDC2626);

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) {
        if (didPop) return;
        _showEarlySubmitDialog();
      },
      child: Scaffold(
        backgroundColor: palette.background,
        body: SafeArea(
          bottom: false,
          child: Column(
            children: [
              _AssessmentTopHeader(
                assessmentCode: q.assessmentCode,
                palette: palette,
              ),
              Expanded(
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
                        _AssessmentTimersRow(
                          questionTimeText: _formatMmSs(_questionSecondsLeft),
                          assessmentTimeText: _formatMmSs(
                            _assessmentSecondsLeft,
                          ),
                          isQuestionLow: _questionSecondsLeft <= 60,
                          isAssessmentLow: _assessmentSecondsLeft <= 300,
                          palette: palette,
                          isDark: isDark,
                        ),
                        const SizedBox(height: 12),
                        _ProctoringStatusBar(
                          isCameraEnabled: q.isCameraEnabled,
                          isVoiceRecordingActive: q.isVoiceRecordingActive,
                          palette: palette,
                        ),
                        const SizedBox(height: 12),
                        Divider(
                          height: 1,
                          thickness: 1,
                          color: palette.subtleBorder,
                        ),
                        const SizedBox(height: 14),
                        _QuestionProgressHeader(
                          currentNumber: q.currentQuestionNumber,
                          totalQuestions: q.totalQuestions,
                          points: q.points,
                          palette: palette,
                        ),
                        const SizedBox(height: 10),
                        _SegmentedQuestionProgressBar(
                          currentStep: q.currentQuestionNumber,
                          totalSteps: q.totalQuestions,
                          palette: palette,
                        ),
                        const SizedBox(height: 12),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 10,
                              vertical: 5,
                            ),
                            decoration: BoxDecoration(
                              color: palette.surfaceElevated,
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(
                                color: palette.border,
                                width: 1,
                              ),
                            ),
                            child: Text(
                              q.topicLabel,
                              style: TextStyle(
                                color: palette.textMuted,
                                fontSize: 11.5,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 14),
                        _QuestionPromptCard(
                          title: q.questionTitle,
                          scenarioPrompt: q.scenarioPrompt,
                          palette: palette,
                        ),
                        if (_isQuestionExpired) ...[
                          const SizedBox(height: 12),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 10,
                            ),
                            decoration: BoxDecoration(
                              color: warningRed.withAlpha(isDark ? 28 : 18),
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: warningRed.withAlpha(isDark ? 110 : 90),
                                width: 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                Icon(
                                  Icons.lock_clock_outlined,
                                  size: 16,
                                  color: warningRed,
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    'Question time expired. Options are locked — proceed to continue.',
                                    style: TextStyle(
                                      color: warningRed,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      height: 1.35,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                        const SizedBox(height: 14),
                        for (var i = 0; i < q.options.length; i++) ...[
                          if (i > 0) const SizedBox(height: 10),
                          _AssessmentOptionCard(
                            option: q.options[i],
                            isSelected: _selectedOptionId == q.options[i].id,
                            isLocked: _isQuestionExpired,
                            onTap: () {
                              if (_isQuestionExpired) return;
                              setState(() {
                                _selectedOptionId = q.options[i].id;
                              });
                            },
                            palette: palette,
                            isDark: isDark,
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              ),
              _AssessmentBottomActionBar(
                nextButtonLabel: widget.nextButtonLabel,
                onEarlySubmit: _showEarlySubmitDialog,
                onSaveAndNext: _handleSaveAndNext,
                palette: palette,
                isDark: isDark,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _AssessmentTopHeader extends StatelessWidget {
  const _AssessmentTopHeader({
    required this.assessmentCode,
    required this.palette,
  });

  final String assessmentCode;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
      decoration: BoxDecoration(
        color: palette.background,
        border: Border(
          bottom: BorderSide(color: palette.subtleBorder, width: 1),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              'TECHNICAL ASSESSMENT',
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: palette.textMuted,
                fontSize: 11.5,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.7,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Text(
            assessmentCode,
            style: TextStyle(
              color: palette.textMuted,
              fontSize: 11.5,
              fontWeight: FontWeight.w500,
              letterSpacing: 0.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _AssessmentTimersRow extends StatelessWidget {
  const _AssessmentTimersRow({
    required this.questionTimeText,
    required this.assessmentTimeText,
    required this.isQuestionLow,
    required this.isAssessmentLow,
    required this.palette,
    required this.isDark,
  });

  final String questionTimeText;
  final String assessmentTimeText;
  final bool isQuestionLow;
  final bool isAssessmentLow;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final warningRed =
        isDark ? const Color(0xFFF87171) : const Color(0xFFDC2626);

    return Row(
      children: [
        Expanded(
          child: _TimerBox(
            icon: Icons.timer_outlined,
            iconColor: isQuestionLow ? warningRed : palette.accent,
            timeColor: isQuestionLow ? warningRed : palette.textPrimary,
            label: 'QUESTION TIME',
            timeText: questionTimeText,
            palette: palette,
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: _TimerBox(
            icon: Icons.hourglass_bottom_rounded,
            iconColor: isAssessmentLow ? warningRed : palette.textSecondary,
            timeColor: isAssessmentLow ? warningRed : palette.textPrimary,
            label: 'ASSESSMENT TIME',
            timeText: assessmentTimeText,
            palette: palette,
          ),
        ),
      ],
    );
  }
}

class _TimerBox extends StatelessWidget {
  const _TimerBox({
    required this.icon,
    required this.iconColor,
    required this.timeColor,
    required this.label,
    required this.timeText,
    required this.palette,
  });

  final IconData icon;
  final Color iconColor;
  final Color timeColor;
  final String label;
  final String timeText;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: palette.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: palette.subtleBorder, width: 1),
      ),
      child: Row(
        children: [
          Icon(icon, size: 17, color: iconColor),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: palette.textMuted,
                    fontSize: 9.5,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  timeText,
                  style: TextStyle(
                    color: timeColor,
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    fontFeatures: const [FontFeature.tabularFigures()],
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

class _ProctoringStatusBar extends StatelessWidget {
  const _ProctoringStatusBar({
    required this.isCameraEnabled,
    required this.isVoiceRecordingActive,
    required this.palette,
  });

  final bool isCameraEnabled;
  final bool isVoiceRecordingActive;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    const liveRecordingRed = Color(0xFFEF4444);

    return Wrap(
      spacing: 12,
      runSpacing: 6,
      alignment: WrapAlignment.spaceBetween,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.photo_camera_front_outlined,
              size: 14,
              color: palette.textMuted,
            ),
            const SizedBox(width: 6),
            Text(
              isCameraEnabled
                  ? 'Camera snapshots enabled'
                  : 'Camera snapshots paused',
              style: TextStyle(color: palette.textMuted, fontSize: 11.5),
            ),
          ],
        ),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 6.5,
              height: 6.5,
              decoration: BoxDecoration(
                color:
                    isVoiceRecordingActive
                        ? liveRecordingRed
                        : palette.textMuted,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 5),
            Icon(
              Icons.mic_none_rounded,
              size: 14,
              color: palette.textSecondary,
            ),
            const SizedBox(width: 4),
            Text(
              isVoiceRecordingActive
                  ? 'Voice recording active'
                  : 'Voice recording idle',
              style: TextStyle(color: palette.textSecondary, fontSize: 11.5),
            ),
          ],
        ),
      ],
    );
  }
}

class _QuestionProgressHeader extends StatelessWidget {
  const _QuestionProgressHeader({
    required this.currentNumber,
    required this.totalQuestions,
    required this.points,
    required this.palette,
  });

  final int currentNumber;
  final int totalQuestions;
  final int points;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Text(
            'Question $currentNumber of $totalQuestions',
            style: TextStyle(
              color: palette.accent,
              fontSize: 16.5,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.2,
            ),
          ),
        ),
        const SizedBox(width: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4.5),
          decoration: BoxDecoration(
            color: palette.surfaceElevated,
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: palette.border, width: 1),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.stars_outlined,
                size: 13.5,
                color: palette.textSecondary,
              ),
              const SizedBox(width: 5),
              Text(
                '$points Points',
                style: TextStyle(
                  color: palette.textSecondary,
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

class _SegmentedQuestionProgressBar extends StatelessWidget {
  const _SegmentedQuestionProgressBar({
    required this.currentStep,
    required this.totalSteps,
    required this.palette,
  });

  final int currentStep;
  final int totalSteps;
  final TalentGraphPalette palette;

  @override
  Widget build(BuildContext context) {
    final safeTotal = totalSteps <= 0 ? 1 : totalSteps;

    return Row(
      children: [
        for (var i = 0; i < safeTotal; i++) ...[
          if (i > 0) const SizedBox(width: 5),
          Expanded(
            child: Container(
              height: 4,
              decoration: BoxDecoration(
                color: i < currentStep ? palette.accent : palette.border,
                borderRadius: BorderRadius.circular(999),
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _QuestionPromptCard extends StatelessWidget {
  const _QuestionPromptCard({
    required this.title,
    required this.scenarioPrompt,
    required this.palette,
  });

  final String title;
  final String scenarioPrompt;
  final TalentGraphPalette palette;

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
          Text(
            title,
            style: TextStyle(
              color: palette.textPrimary,
              fontSize: 16.5,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.2,
              height: 1.35,
            ),
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: palette.background,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: palette.subtleBorder, width: 1),
            ),
            child: Text(
              scenarioPrompt,
              style: TextStyle(
                color: palette.textSecondary,
                fontSize: 13,
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _AssessmentOptionCard extends StatefulWidget {
  const _AssessmentOptionCard({
    required this.option,
    required this.isSelected,
    required this.isLocked,
    required this.onTap,
    required this.palette,
    required this.isDark,
  });

  final AssessmentOption option;
  final bool isSelected;
  final bool isLocked;
  final VoidCallback onTap;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  State<_AssessmentOptionCard> createState() => _AssessmentOptionCardState();
}

class _AssessmentOptionCardState extends State<_AssessmentOptionCard> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  void didUpdateWidget(covariant _AssessmentOptionCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isLocked && !oldWidget.isLocked) {
      _isHovered = false;
      _isPressed = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    final palette = widget.palette;
    final isDark = widget.isDark;
    final isSelected = widget.isSelected;
    final isLocked = widget.isLocked;
    final isHovered = !isLocked && _isHovered;
    final isPressed = !isLocked && _isPressed;
    final isElevated = isSelected || isHovered;

    final selectedFill = Color.alphaBlend(
      palette.accent.withAlpha(isDark ? 34 : 22),
      palette.surface,
    );
    final hoverFill = Color.alphaBlend(
      palette.accent.withAlpha(isDark ? 18 : 12),
      palette.surface,
    );

    final bgColor =
        isSelected ? selectedFill : (isHovered ? hoverFill : palette.surface);

    final borderColor =
        isSelected
            ? palette.accent
            : (isHovered
                ? palette.accent.withAlpha(isDark ? 140 : 120)
                : palette.subtleBorder);

    final double translateY =
        isPressed || isLocked
            ? 0.0
            : (isSelected ? -2.0 : (isHovered ? -1.5 : 0.0));

    return Opacity(
      opacity: isLocked && !isSelected ? 0.6 : 1.0,
      child: MouseRegion(
        cursor: isLocked ? SystemMouseCursors.basic : SystemMouseCursors.click,
        onEnter: (_) {
          if (!isLocked) setState(() => _isHovered = true);
        },
        onExit: (_) {
          if (_isHovered) setState(() => _isHovered = false);
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          curve: Curves.easeOutCubic,
          transform: Matrix4.translationValues(0, translateY, 0),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: borderColor, width: isSelected ? 1.5 : 1),
            boxShadow:
                isElevated && !isLocked
                    ? [
                      BoxShadow(
                        color: palette.accent.withAlpha(
                          isSelected ? (isDark ? 48 : 34) : (isDark ? 24 : 18),
                        ),
                        blurRadius: isSelected ? 14 : 8,
                        offset: Offset(0, isSelected ? 4 : 2),
                      ),
                    ]
                    : const [],
          ),
          child: Material(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            child: InkWell(
              onTap: isLocked ? null : widget.onTap,
              onHighlightChanged:
                  isLocked
                      ? null
                      : (pressed) {
                        setState(() => _isPressed = pressed);
                      },
              splashColor: palette.accent.withAlpha(32),
              highlightColor: palette.accent.withAlpha(18),
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AnimatedContainer(
                      duration: const Duration(milliseconds: 180),
                      curve: Curves.easeOutCubic,
                      width: 28,
                      height: 28,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color:
                            isSelected
                                ? palette.accent
                                : (isHovered
                                    ? palette.accent.withAlpha(isDark ? 45 : 30)
                                    : palette.surfaceElevated),
                        shape: BoxShape.circle,
                        border: Border.all(
                          color:
                              isSelected || isHovered
                                  ? palette.accent
                                  : palette.border,
                          width: 1,
                        ),
                      ),
                      child: Text(
                        widget.option.labelLetter,
                        style: TextStyle(
                          color:
                              isSelected
                                  ? (isDark
                                      ? const Color(0xFF111827)
                                      : Colors.white)
                                  : (isHovered
                                      ? palette.accent
                                      : palette.textSecondary),
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(top: 3),
                        child: Text(
                          widget.option.text,
                          style: TextStyle(
                            color:
                                isSelected || isHovered
                                    ? palette.textPrimary
                                    : palette.textSecondary,
                            fontSize: 13,
                            fontWeight:
                                isSelected ? FontWeight.w500 : FontWeight.w400,
                            height: 1.45,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _AssessmentBottomActionBar extends StatelessWidget {
  const _AssessmentBottomActionBar({
    required this.nextButtonLabel,
    required this.onEarlySubmit,
    required this.onSaveAndNext,
    required this.palette,
    required this.isDark,
  });

  final String nextButtonLabel;
  final VoidCallback onEarlySubmit;
  final VoidCallback onSaveAndNext;
  final TalentGraphPalette palette;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.paddingOf(context).bottom;
    final primaryTextColor = isDark ? const Color(0xFF14110F) : Colors.white;

    return Container(
      padding: EdgeInsets.fromLTRB(16, 12, 16, 12 + bottomInset),
      decoration: BoxDecoration(
        color: palette.background,
        border: Border(top: BorderSide(color: palette.subtleBorder, width: 1)),
      ),
      child: Align(
        alignment: Alignment.center,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: Row(
            children: [
              ConstrainedBox(
                constraints: const BoxConstraints(minHeight: 46),
                child: Material(
                  color: palette.surfaceElevated,
                  borderRadius: BorderRadius.circular(10),
                  child: InkWell(
                    onTap: onEarlySubmit,
                    borderRadius: BorderRadius.circular(10),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 11,
                      ),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: palette.border, width: 1),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.exit_to_app_rounded,
                            size: 16,
                            color: palette.textSecondary,
                          ),
                          const SizedBox(width: 7),
                          Text(
                            'Early Submit',
                            style: TextStyle(
                              color: palette.textSecondary,
                              fontSize: 13,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(minHeight: 46),
                  child: Material(
                    color: palette.accent,
                    borderRadius: BorderRadius.circular(10),
                    child: InkWell(
                      onTap: onSaveAndNext,
                      borderRadius: BorderRadius.circular(10),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 11,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Flexible(
                              child: Text(
                                nextButtonLabel,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(
                                  color: primaryTextColor,
                                  fontSize: 13.5,
                                  fontWeight: FontWeight.w700,
                                  letterSpacing: -0.1,
                                ),
                              ),
                            ),
                            const SizedBox(width: 6),
                            Icon(
                              Icons.arrow_forward_rounded,
                              size: 16,
                              color: primaryTextColor,
                            ),
                          ],
                        ),
                      ),
                    ),
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
