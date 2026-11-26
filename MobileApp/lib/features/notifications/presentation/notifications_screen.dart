import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/core/data/repositories.dart';
import 'package:talentgraph/core/domain/tg_enums.dart' as domain;
import 'package:talentgraph/features/applications/presentation/talent_graph_palette.dart';
import 'package:talentgraph/features/applications/presentation/talent_graph_view_models.dart';

class NotificationsScreen extends ConsumerStatefulWidget {
  const NotificationsScreen({super.key});

  @override
  ConsumerState<NotificationsScreen> createState() =>
      _NotificationsScreenState();
}

class _NotificationsScreenState extends ConsumerState<NotificationsScreen> {
  List<TalentNotificationItem> _items = [];
  bool _loading = true;
  String? _error;

  String _timeAgo(DateTime d) {
    final diff = DateTime.now().difference(d);
    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }

  bool _isToday(DateTime d) {
    final now = DateTime.now();
    return d.year == now.year && d.month == now.month && d.day == now.day;
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final repo = ref.read(notificationsRepositoryProvider);
      final models = await repo.listNotifications();
      final mapped = models.map((m) {
        final type = m.type == domain.NotificationType.assessmentAnnounced
            ? NotificationType.assessmentScheduled
            : NotificationType.interviewInvitation;
        final section = _isToday(m.createdAt)
            ? NotificationSection.today
            : NotificationSection.earlier;
        return TalentNotificationItem(
          id: m.id,
          type: type,
          section: section,
          companyName: m.companyName,
          roleTitle: m.roleTitle,
          timeAgoLabel: _timeAgo(m.createdAt),
          isUnread: !m.isRead,
          scheduleLabel: m.scheduleLabel.isNotEmpty ? m.scheduleLabel : null,
          messageBody: m.message.isNotEmpty ? m.message : null,
        );
      }).toList();
      if (!mounted) return;
      setState(() {
        _items = mapped;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = 'Failed to load';
        _loading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  int get _unreadCount => _items.where((i) => i.isUnread).length;

  Future<void> _markAllRead() async {
    final repo = ref.read(notificationsRepositoryProvider);
    await repo.markAllRead();
    if (!mounted) return;
    setState(() {
      _items = _items.map((i) => i.copyWith(isUnread: false)).toList();
    });
  }

  Future<void> _markRead(String id) async {
    final repo = ref.read(notificationsRepositoryProvider);
    await repo.markRead(id);
    if (!mounted) return;
    setState(() {
      _items = _items
          .map((i) => i.id == id ? i.copyWith(isUnread: false) : i)
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    final palette = TalentGraphPalette.of(context);
    return Scaffold(
      backgroundColor: palette.background,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _load,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
            child: Align(
              alignment: Alignment.topCenter,
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 720),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Row(
                            children: [
                              Flexible(
                                child: Text(
                                  'Notifications',
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    color: palette.textPrimary,
                                    fontSize: 24,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ),
                              if (_unreadCount > 0) ...[
                                const SizedBox(width: 8),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 8,
                                    vertical: 2,
                                  ),
                                  decoration: BoxDecoration(
                                    color: palette.accent,
                                    borderRadius: BorderRadius.circular(999),
                                  ),
                                  child: Text(
                                    '$_unreadCount new',
                                    style: const TextStyle(
                                      color: Color(0xFF111827),
                                      fontSize: 12,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        TextButton.icon(
                          onPressed: _unreadCount == 0 ? null : _markAllRead,
                          icon: Icon(
                            Icons.done_all_rounded,
                            size: 16,
                            color: _unreadCount == 0
                                ? palette.textMuted
                                : palette.accentSoftText,
                          ),
                          label: Text(
                            'Mark all read',
                            style: TextStyle(
                              color: _unreadCount == 0
                                  ? palette.textMuted
                                  : palette.accentSoftText,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    if (_loading)
                      Center(
                        child: CircularProgressIndicator(color: palette.accent),
                      )
                    else if (_error != null)
                      Center(
                        child: Text(
                          _error!,
                          style: TextStyle(color: palette.textMuted),
                        ),
                      )
                    else if (_items.isEmpty)
                        Center(
                          child: Text(
                            'All caught up',
                            style: TextStyle(color: palette.textMuted),
                          ),
                        )
                      else ...[
                          ..._section(palette, NotificationSection.today),
                          ..._section(palette, NotificationSection.earlier),
                        ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _section(
      TalentGraphPalette palette,
      NotificationSection section,
      ) {
    final items = _items.where((i) => i.section == section).toList();
    if (items.isEmpty) return [];
    return [
      Padding(
        padding: const EdgeInsets.only(bottom: 8, top: 4),
        child: Text(
          section.headerTitle,
          style: TextStyle(
            color: palette.textMuted,
            fontSize: 11.5,
            fontWeight: FontWeight.w700,
            letterSpacing: 0.8,
          ),
        ),
      ),
      ...items.map((it) => _card(palette, it)),
    ];
  }

  Widget _card(TalentGraphPalette palette, TalentNotificationItem it) {
    final unread = it.isUnread;
    return GestureDetector(
      onTap: () async {
        if (unread) await _markRead(it.id);
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: palette.surface,
          border: Border.all(color: palette.subtleBorder),
          borderRadius: BorderRadius.circular(14),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: palette.surfaceElevated,
                    border: Border.all(color: palette.border),
                    borderRadius: BorderRadius.circular(9),
                  ),
                  child: Icon(
                    it.type == NotificationType.assessmentScheduled
                        ? Icons.event_note_outlined
                        : Icons.mail_outline_rounded,
                    color: unread
                        ? palette.accentSoftText
                        : palette.textSecondary,
                    size: 18,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Flexible(
                            child: Text(
                              it.type.label,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                color: unread
                                    ? palette.accentSoftText
                                    : palette.textMuted,
                                fontSize: 12.5,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            it.timeAgoLabel,
                            style: TextStyle(
                              color: palette.textMuted,
                              fontSize: 12,
                            ),
                          ),
                          if (unread) ...[
                            const SizedBox(width: 6),
                            Container(
                              width: 7,
                              height: 7,
                              decoration: BoxDecoration(
                                color: palette.accent,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ],
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        it.companyName,
                        style: TextStyle(
                          color: palette.textPrimary,
                          fontSize: 15.5,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        it.roleTitle,
                        style: TextStyle(
                          color: palette.textMuted,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(height: 6),
                      if (it.type == NotificationType.assessmentScheduled &&
                          it.scheduleLabel != null)
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(top: 2),
                              child: Icon(
                                Icons.access_time_rounded,
                                size: 14,
                                color: palette.textMuted,
                              ),
                            ),
                            const SizedBox(width: 4),
                            Expanded(
                              child: Text(
                                it.scheduleLabel!,
                                style: TextStyle(
                                  color: palette.textMuted,
                                  fontSize: 12.5,
                                ),
                              ),
                            ),
                          ],
                        )
                      else if (it.messageBody != null)
                        Text(
                          it.messageBody!,
                          style: TextStyle(
                            color: palette.textMuted,
                            fontSize: 12.5,
                          ),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}