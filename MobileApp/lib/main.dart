import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/app/router/app_router.dart';
import 'package:talentgraph/app/theme/app_theme.dart';
import 'package:talentgraph/app/theme/theme_controller.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final container = ProviderContainer();

  final themeController = container.read(themeControllerProvider.notifier);
  await themeController.init();

  runApp(UncontrolledProviderScope(container: container, child: const MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final goRouter = ref.watch(goRouterProvider);
    final themeMode = ref.watch(themeControllerProvider);

    return MaterialApp.router(
      routerConfig: goRouter,
      title: 'TalentGraph',
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: themeMode,
      themeAnimationDuration: Duration.zero,
    );
  }
}
