import 'package:flutter/material.dart';
import 'package:talentgraph/app/theme/tg_colors.dart';

enum StateBannerKind { info, success, warning, error }

class StateBanner extends StatelessWidget {
  const StateBanner({super.key, required this.kind, required this.text});

  final StateBannerKind kind;
  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = Theme.of(context).extension<TgColors>()!;
    final color = _colorFor(kind, tokens);
    final icon = _iconFor(kind);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        border: Border.all(color: color, width: 1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                color: color,
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Color _colorFor(StateBannerKind kind, TgColors tokens) {
    switch (kind) {
      case StateBannerKind.info:
        return tokens.brand;
      case StateBannerKind.success:
        return tokens.success;
      case StateBannerKind.warning:
        return tokens.warning;
      case StateBannerKind.error:
        return tokens.destructive;
    }
  }

  IconData _iconFor(StateBannerKind kind) {
    switch (kind) {
      case StateBannerKind.info:
        return Icons.info_outline;
      case StateBannerKind.success:
        return Icons.check_circle_outline;
      case StateBannerKind.warning:
        return Icons.warning_outlined;
      case StateBannerKind.error:
        return Icons.error_outline;
    }
  }
}
