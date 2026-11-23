import 'package:flutter/material.dart';

class TgColors extends ThemeExtension<TgColors> {
  const TgColors({
    required this.canvas,
    required this.surface,
    required this.brand,
    required this.onPrimary,
    required this.text,
    required this.textSecondary,
    required this.neutralAccent,
    required this.border,
    required this.destructive,
    required this.success,
    required this.warning,
    required this.selectedSoft,
    required this.pressedPrimary,
    required this.focus,
    required this.surfaceContainer,
  });

  final Color canvas;
  final Color surface;
  final Color brand;
  final Color onPrimary;
  final Color text;
  final Color textSecondary;
  final Color neutralAccent;
  final Color border;
  final Color destructive;
  final Color success;
  final Color warning;
  final Color selectedSoft;
  final Color pressedPrimary;
  final Color focus;
  final Color surfaceContainer;

  static const _dark = TgColors(
    canvas: Color(0xFF0D0D0F),
    surface: Color(0xFF19191C),
    brand: Color(0xFFD4621A),
    onPrimary: Color(0xFF18181B),
    text: Color(0xFFF5F5F5),
    textSecondary: Color(0xFFA1A1AA),
    neutralAccent: Color(0xFF52525B),
    border: Color(0xFF3F3F46),
    destructive: Color(0xFFE5484D),
    success: Color(0xFF22C55E),
    warning: Color(0xFFF59E0B),
    selectedSoft: Color(0xFF252528),
    pressedPrimary: Color(0xFFE47735),
    focus: Color(0xFFE47735),
    surfaceContainer: Color(0xFF1E1F27),
  );

  static const _light = TgColors(
    canvas: Color(0xFFFAFAFA),
    surface: Color(0xFFFFFFFF),
    brand: Color(0xFFD4621A),
    onPrimary: Color(0xFF18181B),
    text: Color(0xFF18181B),
    textSecondary: Color(0xFF71717A),
    neutralAccent: Color(0xFF52525B),
    border: Color(0xFFE4E4E7),
    destructive: Color(0xFFDC2626),
    success: Color(0xFF15803D),
    warning: Color(0xFFB45309),
    selectedSoft: Color(0xFFFFF1E8),
    pressedPrimary: Color(0xFFB94F0B),
    focus: Color(0xFFB94F0B),
    surfaceContainer: Color(0xFFFAFAFA),
  );

  factory TgColors.dark() => _dark;
  factory TgColors.light() => _light;

  @override
  TgColors copyWith({
    Color? canvas,
    Color? surface,
    Color? brand,
    Color? onPrimary,
    Color? text,
    Color? textSecondary,
    Color? neutralAccent,
    Color? border,
    Color? destructive,
    Color? success,
    Color? warning,
    Color? selectedSoft,
    Color? pressedPrimary,
    Color? focus,
    Color? surfaceContainer,
  }) {
    return TgColors(
      canvas: canvas ?? this.canvas,
      surface: surface ?? this.surface,
      brand: brand ?? this.brand,
      onPrimary: onPrimary ?? this.onPrimary,
      text: text ?? this.text,
      textSecondary: textSecondary ?? this.textSecondary,
      neutralAccent: neutralAccent ?? this.neutralAccent,
      border: border ?? this.border,
      destructive: destructive ?? this.destructive,
      success: success ?? this.success,
      warning: warning ?? this.warning,
      selectedSoft: selectedSoft ?? this.selectedSoft,
      pressedPrimary: pressedPrimary ?? this.pressedPrimary,
      focus: focus ?? this.focus,
      surfaceContainer: surfaceContainer ?? this.surfaceContainer,
    );
  }

  @override
  TgColors lerp(ThemeExtension<TgColors>? other, double t) {
    if (other is! TgColors) return this;
    return TgColors(
      canvas: Color.lerp(canvas, other.canvas, t)!,
      surface: Color.lerp(surface, other.surface, t)!,
      brand: Color.lerp(brand, other.brand, t)!,
      onPrimary: Color.lerp(onPrimary, other.onPrimary, t)!,
      text: Color.lerp(text, other.text, t)!,
      textSecondary: Color.lerp(textSecondary, other.textSecondary, t)!,
      neutralAccent: Color.lerp(neutralAccent, other.neutralAccent, t)!,
      border: Color.lerp(border, other.border, t)!,
      destructive: Color.lerp(destructive, other.destructive, t)!,
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
      selectedSoft: Color.lerp(selectedSoft, other.selectedSoft, t)!,
      pressedPrimary: Color.lerp(pressedPrimary, other.pressedPrimary, t)!,
      focus: Color.lerp(focus, other.focus, t)!,
      surfaceContainer:
          Color.lerp(surfaceContainer, other.surfaceContainer, t)!,
    );
  }

  @override
  int get hashCode => Object.hashAll([
    canvas,
    surface,
    brand,
    onPrimary,
    text,
    textSecondary,
    neutralAccent,
    border,
    destructive,
    success,
    warning,
    selectedSoft,
    pressedPrimary,
    focus,
    surfaceContainer,
  ]);

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is TgColors &&
        canvas == other.canvas &&
        surface == other.surface &&
        brand == other.brand &&
        onPrimary == other.onPrimary &&
        text == other.text &&
        textSecondary == other.textSecondary &&
        neutralAccent == other.neutralAccent &&
        border == other.border &&
        destructive == other.destructive &&
        success == other.success &&
        warning == other.warning &&
        selectedSoft == other.selectedSoft &&
        pressedPrimary == other.pressedPrimary &&
        focus == other.focus &&
        surfaceContainer == other.surfaceContainer;
  }
}
