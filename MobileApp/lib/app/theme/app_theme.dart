import 'package:flutter/material.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';

final ThemeData darkTheme = _buildTheme(TgColors.dark(), Brightness.dark);
final ThemeData lightTheme = _buildTheme(TgColors.light(), Brightness.light);

ThemeData _buildTheme(TgColors tokens, Brightness brightness) {
  final ColorScheme colorScheme = ColorScheme(
    brightness: brightness,
    primary: tokens.brand,
    onPrimary: tokens.onPrimary,
    primaryContainer: tokens.selectedSoft,
    onPrimaryContainer: tokens.brand,
    secondary: tokens.neutralAccent,
    onSecondary: tokens.text,
    secondaryContainer: tokens.surface,
    onSecondaryContainer: tokens.text,
    surface: tokens.surface,
    onSurface: tokens.text,
    surfaceContainerHighest: tokens.border,
    error: tokens.destructive,
    onError: tokens.onPrimary,
    outline: tokens.border,
    outlineVariant: tokens.border,
    inverseSurface: tokens.text,
    inversePrimary: tokens.onPrimary,
    surfaceTint: Colors.transparent,
  );

  return ThemeData(
    useMaterial3: true,
    colorScheme: colorScheme,
    scaffoldBackgroundColor: tokens.canvas,
    extensions: [tokens],
    fontFamily: 'Inter',
    textTheme: TextTheme(
      displayLarge: TextStyle(
        fontSize: 26,
        fontWeight: FontWeight.w600,
        color: tokens.text,
        letterSpacing: -0.5,
      ),
      displayMedium: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: tokens.text,
      ),
      titleLarge: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: tokens.text,
      ),
      titleMedium: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.w500,
        color: tokens.text,
      ),
      bodyLarge: TextStyle(fontSize: 16, color: tokens.text, height: 1.5),
      bodyMedium: TextStyle(fontSize: 14, color: tokens.text, height: 1.5),
      labelLarge: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: tokens.text,
      ),
      labelMedium: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: tokens.textSecondary,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: tokens.brand,
        foregroundColor: tokens.onPrimary,
        minimumSize: const Size(double.infinity, 48),
        elevation: 0,
        shadowColor: Colors.transparent,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        padding: const EdgeInsets.symmetric(vertical: 12),
        textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: tokens.text,
        side: BorderSide(color: tokens.border, width: 1),
        minimumSize: const Size(double.infinity, 48),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        padding: const EdgeInsets.symmetric(vertical: 12),
        textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: tokens.brand,
        foregroundColor: tokens.onPrimary,
        minimumSize: const Size(double.infinity, 48),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        padding: const EdgeInsets.symmetric(vertical: 12),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: tokens.surface,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: tokens.border, width: 1),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: tokens.border, width: 1),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: tokens.focus, width: 1),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: tokens.destructive, width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: tokens.destructive, width: 1),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
      hintStyle: TextStyle(color: tokens.textSecondary, fontSize: 14),
    ),
    cardTheme: CardTheme(
      color: tokens.surface,
      elevation: 0,
      shadowColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: BorderSide(color: tokens.border, width: 1),
      ),
      margin: EdgeInsets.zero,
    ),
    dividerTheme: DividerThemeData(
      color: tokens.border,
      thickness: 1,
      space: 1,
    ),
    progressIndicatorTheme: ProgressIndicatorThemeData(color: tokens.brand),
    switchTheme: SwitchThemeData(
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) return tokens.brand;
        return tokens.border;
      }),
      trackColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) return tokens.focus;
        return tokens.border;
      }),
    ),
    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) return tokens.brand;
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(tokens.onPrimary),
      side: BorderSide(color: tokens.border, width: 1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
    ),
    radioTheme: RadioThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) return tokens.brand;
        return tokens.border;
      }),
    ),
    tooltipTheme: TooltipThemeData(
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.border, width: 1),
        borderRadius: BorderRadius.circular(6),
      ),
      textStyle: TextStyle(color: tokens.text, fontSize: 12),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: tokens.brand,
      foregroundColor: tokens.onPrimary,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: tokens.surface,
      selectedItemColor: tokens.brand,
      unselectedItemColor: tokens.textSecondary,
      type: BottomNavigationBarType.fixed,
      elevation: 0,
      selectedLabelStyle: const TextStyle(fontSize: 12),
      unselectedLabelStyle: const TextStyle(fontSize: 12),
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: tokens.canvas,
      foregroundColor: tokens.text,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: tokens.text,
      ),
      iconTheme: IconThemeData(color: tokens.text),
    ),
  );
}
