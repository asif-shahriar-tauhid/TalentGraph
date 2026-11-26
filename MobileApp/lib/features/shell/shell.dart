import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';
import 'package:talentgraph/features/auth/domain/auth_state.dart';
import 'package:talentgraph/features/auth/domain/user.dart';
import 'package:talentgraph/features/auth/presentation/auth_controller.dart';
import 'package:talentgraph/features/shell/jobs_discovery_screen.dart';
import 'package:talentgraph/shared/widgets/theme_toggle.dart';

class ShellScreen extends ConsumerWidget {
  const ShellScreen({super.key, required this.tabIndex});

  final int tabIndex;

  static const MethodChannel _lifecycleChannel = MethodChannel(
    'com.groupf.talentgraph/app_lifecycle',
  );

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    final TalentGraphUser? user =
    authState is AuthSignedIn ? authState.user : null;

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
        appBar: AppBar(
          title: const Text('TalentGraph'),
          actions: [
            const AppearanceToggle(),
            const SizedBox(width: 4),
            _ProfileAvatarButton(user: user),
            const SizedBox(width: 12),
          ],
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
      ),
    );
  }
}

class _ProfileAvatarButton extends StatelessWidget {
  const _ProfileAvatarButton({required this.user});

  final TalentGraphUser? user;

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<TgColors>()!;
    final name = (user?.name ?? '').trim();
    final imageUrl = (user?.imageUrl ?? '').trim();
    final initial = name.isNotEmpty ? name[0].toUpperCase() : '';

    return Tooltip(
      message: 'Account',
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: () => _showAccountSheet(context, user),
        child: Container(
          width: 34,
          height: 34,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: tokens.surfaceContainer,
            border: Border.all(color: tokens.border, width: 1),
          ),
          child: ClipOval(
            child:
            imageUrl.isNotEmpty
                ? Image.network(
              imageUrl,
              fit: BoxFit.cover,
              errorBuilder:
                  (_, __, ___) => _buildFallback(tokens, initial),
            )
                : _buildFallback(tokens, initial),
          ),
        ),
      ),
    );
  }

  Widget _buildFallback(TgColors tokens, String initial) {
    if (initial.isNotEmpty) {
      return Center(
        child: Text(
          initial,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: tokens.brand,
          ),
        ),
      );
    }
    return Icon(Icons.person_outline, size: 18, color: tokens.text);
  }

  void _showAccountSheet(BuildContext context, TalentGraphUser? user) {
    showModalBottomSheet<void>(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (_) => _AccountSheet(user: user),
    );
  }
}

class _AccountSheet extends ConsumerStatefulWidget {
  const _AccountSheet({required this.user});

  final TalentGraphUser? user;

  @override
  ConsumerState<_AccountSheet> createState() => _AccountSheetState();
}

class _AccountSheetState extends ConsumerState<_AccountSheet> {
  bool _signingOut = false;

  Future<void> _handleSignOut() async {
    if (_signingOut) return;
    setState(() => _signingOut = true);

    Navigator.of(context).pop();
    await ref.read(authControllerProvider.notifier).signOut();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<TgColors>()!;
    final name = (widget.user?.name ?? '').trim();
    final email = (widget.user?.email ?? '').trim();
    final imageUrl = (widget.user?.imageUrl ?? '').trim();
    final initial = name.isNotEmpty ? name[0].toUpperCase() : 'C';

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 36,
              height: 4,
              decoration: BoxDecoration(
                color: tokens.border,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                CircleAvatar(
                  radius: 24,
                  backgroundColor: tokens.surfaceContainer,
                  backgroundImage:
                  imageUrl.isNotEmpty ? NetworkImage(imageUrl) : null,
                  child:
                  imageUrl.isEmpty
                      ? Text(
                    initial,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: tokens.brand,
                    ),
                  )
                      : null,
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name.isNotEmpty ? name : 'Candidate',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: tokens.text,
                        ),
                      ),
                      if (email.isNotEmpty) ...[
                        const SizedBox(height: 2),
                        Text(
                          email,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 13,
                            color: tokens.textSecondary,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: tokens.surfaceContainer,
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: tokens.border),
                  ),
                  child: Text(
                    'CANDIDATE',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: tokens.brand,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Divider(height: 1),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              height: 46,
              child: OutlinedButton.icon(
                onPressed: _signingOut ? null : _handleSignOut,
                style: OutlinedButton.styleFrom(
                  foregroundColor: Theme.of(context).colorScheme.error,
                  side: BorderSide(
                    color: Theme.of(
                      context,
                    ).colorScheme.error.withValues(alpha: 0.5),
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                icon: const Icon(Icons.logout, size: 18),
                label: const Text(
                  'Log out',
                  style: TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
            ),
          ],
        ),
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