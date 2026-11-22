import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/app/theme/theme_controller.dart';

class AppearanceToggle extends ConsumerWidget {
  const AppearanceToggle({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeControllerProvider);
    final isDark = themeMode == ThemeMode.dark;
    final nextAction = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    final icon = isDark ? Icons.light_mode : Icons.dark_mode;

    return IconButton(
      icon: Icon(icon),
      tooltip: nextAction,
      onPressed: () => ref.read(themeControllerProvider.notifier).toggle(),
    );
  }
}
