import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final themeControllerProvider = NotifierProvider<ThemeController, ThemeMode>(
  ThemeController.new,
);

class ThemeController extends Notifier<ThemeMode> {
  static const _prefsKey = 'theme_mode';
  SharedPreferences? _prefs;

  @override
  ThemeMode build() => ThemeMode.dark;

  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
    final isDark = _prefs!.getBool(_prefsKey) ?? true;
    state = isDark ? ThemeMode.dark : ThemeMode.light;
  }

  Future<void> toggle() async {
    _prefs ??= await SharedPreferences.getInstance();
    final next = state == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    state = next;
    await _prefs!.setBool(_prefsKey, state == ThemeMode.dark);
  }

  bool get isDark => state == ThemeMode.dark;
}
