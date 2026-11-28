import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/features/assessments/presentation/assessment_center_screen.dart';
import 'package:talentgraph/features/notifications/presentation/notifications_screen.dart';
import 'package:talentgraph/features/shell/jobs_discovery_screen.dart';
import 'package:talentgraph/shared/widgets/tg_app_bar.dart';

class ShellScreen extends ConsumerWidget {
  const ShellScreen({super.key, required this.tabIndex});

  final int tabIndex;

  static const MethodChannel _lifecycleChannel = MethodChannel(
    'com.groupf.talentgraph/app_lifecycle',
  );

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;
        if (tabIndex != 0) {
          context.go('/jobs');
          return;
        }
        try {
          await _lifecycleChannel.invokeMethod('moveTaskToBack');
        } on MissingPluginException {
          // Channel unavailable (e.g. widget tests) — ignore.
        }
      },
      child: Scaffold(
        appBar: const TgAppBar(),
        body: IndexedStack(
          index: tabIndex,
          children: const [
            RepaintBoundary(child: JobsDiscoveryScreen()),
            RepaintBoundary(child: AssessmentCenterScreen()),
            RepaintBoundary(child: NotificationsScreen()),
          ],
        ),
        bottomNavigationBar: NavigationBar(
          selectedIndex: tabIndex,
          onDestinationSelected: (index) {
            final routes = ['/jobs', '/assessments', '/notifications'];
            context.go(routes[index]);
          },
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.work_outline),
              selectedIcon: Icon(Icons.work),
              label: 'Jobs',
            ),
            NavigationDestination(
              icon: Icon(Icons.assignment_outlined),
              selectedIcon: Icon(Icons.assignment),
              label: 'Assessments',
            ),
            NavigationDestination(
              icon: Icon(Icons.notifications_outlined),
              selectedIcon: Icon(Icons.notifications),
              label: 'Notifications',
            ),
          ],
        ),
      ),
    );
  }
}
