import 'package:flutter/material.dart';

/// Centralized Dark & Light color tokens for TalentGraph screens.
/// Map these properties to your app's `TgColors` theme class during integration.
@immutable
class TalentGraphPalette {
  const TalentGraphPalette({
    required this.background,
    required this.surface,
    required this.surfaceElevated,
    required this.border,
    required this.subtleBorder,
    required this.textPrimary,
    required this.textSecondary,
    required this.textMuted,
    required this.accent,
    required this.accentSoftText,
    required this.accentTint,
    required this.accentBorder,
    required this.dateHighlight,
    required this.success,
    required this.successTint,
    required this.successBorder,
    required this.warning,
    required this.warningTint,
    required this.warningBorder,
    required this.progressTrack,
    required this.noteIconTint,
  });

  final Color background;
  final Color surface;
  final Color surfaceElevated;
  final Color border;
  final Color subtleBorder;
  final Color textPrimary;
  final Color textSecondary;
  final Color textMuted;
  final Color accent;
  final Color accentSoftText;
  final Color accentTint;
  final Color accentBorder;
  final Color dateHighlight;
  final Color success;
  final Color successTint;
  final Color successBorder;
  final Color warning;
  final Color warningTint;
  final Color warningBorder;
  final Color progressTrack;
  final Color noteIconTint;

  static const TalentGraphPalette dark = TalentGraphPalette(
    background: Color(0xFF0E0E10),
    surface: Color(0xFF17171A),
    surfaceElevated: Color(0xFF202024),
    border: Color(0xFF2B2B30),
    subtleBorder: Color(0xFF232328),
    textPrimary: Color(0xFFF4F4F6),
    textSecondary: Color(0xFFD4D4D8),
    textMuted: Color(0xFF8E8E95),
    accent: Color(0xFFF97316),
    accentSoftText: Color(0xFFFB923C),
    accentTint: Color(0xFF261A11),
    accentBorder: Color(0xFF5E3719),
    dateHighlight: Color(0xFFD4A373),
    success: Color(0xFF34D399),
    successTint: Color(0xFF10281E),
    successBorder: Color(0xFF1E4B37),
    warning: Color(0xFFF59E0B),
    warningTint: Color(0xFF261E11),
    warningBorder: Color(0xFF4D3B19),
    progressTrack: Color(0xFF27272C),
    noteIconTint: Color(0xFFA78BFA),
  );

  static const TalentGraphPalette light = TalentGraphPalette(
    background: Color(0xFFF8F9FA),
    surface: Color(0xFFFFFFFF),
    surfaceElevated: Color(0xFFF1F3F5),
    border: Color(0xFFE2E8F0),
    subtleBorder: Color(0xFFEDF2F7),
    textPrimary: Color(0xFF111827),
    textSecondary: Color(0xFF374151),
    textMuted: Color(0xFF6B7280),
    accent: Color(0xFFEA580C),
    accentSoftText: Color(0xFFC2410C),
    accentTint: Color(0xFFFFF7ED),
    accentBorder: Color(0xFFFED7AA),
    dateHighlight: Color(0xFF9A6B3B),
    success: Color(0xFF059669),
    successTint: Color(0xFFECFDF5),
    successBorder: Color(0xFFA7F3D0),
    warning: Color(0xFFD97706),
    warningTint: Color(0xFFFFFBEB),
    warningBorder: Color(0xFFFDE68A),
    progressTrack: Color(0xFFE5E7EB),
    noteIconTint: Color(0xFF7C3AED),
  );

  static TalentGraphPalette of(BuildContext context) {
    return Theme.of(context).brightness == Brightness.dark ? dark : light;
  }
}
