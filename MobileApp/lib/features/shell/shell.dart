import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/features/shell/jobs_discovery_screen.dart';
import 'package:talentgraph/shared/widgets/theme_toggle.dart';

class ShellScreen extends ConsumerWidget {
  const ShellScreen({super.key, required this.tabIndex});

  final int tabIndex;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TalentGraph'),
        actions: [const AppearanceToggle()],
      ),
      body: IndexedStack(
        index: tabIndex,
        children: const [
          JobsDiscoveryScreen(),
          AssessmentsPlaceholder(),
          NotificationsPlaceholder(),
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
    );
  }
}

class AssessmentsPlaceholder extends StatelessWidget {
  const AssessmentsPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Assessments — coming in a later build'));
  }
}

class NotificationsPlaceholder extends StatelessWidget {
  const NotificationsPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Notifications — coming in a later build'));
  }
}
