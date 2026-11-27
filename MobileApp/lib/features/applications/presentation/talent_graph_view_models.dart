import 'package:flutter/foundation.dart';

enum AppliedJobStatus {
  inProgress,
  evaluated,
}

enum AppliedJobsFilter {
  all,
  inProgress,
  evaluated,
}

extension AppliedJobStatusX on AppliedJobStatus {
  String get label {
    switch (this) {
      case AppliedJobStatus.inProgress:
        return 'In Progress';
      case AppliedJobStatus.evaluated:
        return 'Evaluated';
    }
  }
}

@immutable
class AppliedJobItem {
  const AppliedJobItem({
    required this.id,
    required this.companyName,
    required this.isVerified,
    required this.jobTitle,
    required this.location,
    required this.isRemote,
    required this.employmentType,
    required this.appliedDateLabel,
    required this.status,
  });

  final String id;
  final String companyName;
  final bool isVerified;
  final String jobTitle;
  final String location;
  final bool isRemote;
  final String employmentType;
  final String appliedDateLabel;
  final AppliedJobStatus status;
}

@immutable
class SkillPercentileItem {
  const SkillPercentileItem({
    required this.skillName,
    required this.percentile,
    this.maxScore = 100,
    this.caption = 'Performance relative to applicant pool',
  });

  final String skillName;
  final int percentile;
  final int maxScore;
  final String caption;

  double get progress => (percentile.clamp(0, maxScore)) / maxScore;

  String get ordinalLabel {
    final value = percentile.abs();
    final mod100 = value % 100;
    if (mod100 >= 11 && mod100 <= 13) {
      return '${percentile}th';
    }
    switch (value % 10) {
      case 1:
        return '${percentile}st';
      case 2:
        return '${percentile}nd';
      case 3:
        return '${percentile}rd';
      default:
        return '${percentile}th';
    }
  }
}

@immutable
class SkillPercentilesData {
  const SkillPercentilesData({
    required this.roleTitle,
    required this.companyName,
    required this.isCompanyVerified,
    required this.poolStatusLabel,
    required this.submittedMetaLabel,
    required this.previewNoticeLabel,
    required this.infoTitle,
    required this.infoPrimaryBody,
    required this.infoSecondaryBody,
    required this.skills,
    required this.footerDisclaimer,
  });

  final String roleTitle;
  final String companyName;
  final bool isCompanyVerified;
  final String poolStatusLabel;
  final String submittedMetaLabel;
  final String previewNoticeLabel;
  final String infoTitle;
  final String infoPrimaryBody;
  final String infoSecondaryBody;
  final List<SkillPercentileItem> skills;
  final String footerDisclaimer;
}

abstract final class TalentGraphSampleData {
  static const List<AppliedJobItem> appliedJobs = [
    AppliedJobItem(
      id: 'job-1',
      companyName: 'Aether Telemetry Systems',
      isVerified: true,
      jobTitle: 'Staff Distributed Systems Engineer',
      location: 'Remote (US/EU)',
      isRemote: true,
      employmentType: 'Full-time',
      appliedDateLabel: 'Applied Oct 24, 2026',
      status: AppliedJobStatus.inProgress,
    ),
    AppliedJobItem(
      id: 'job-2',
      companyName: 'Chronos Distributed Labs',
      isVerified: true,
      jobTitle: 'Lead Platform Reliability Architect',
      location: 'San Francisco, CA (Hybrid)',
      isRemote: false,
      employmentType: 'Full-time',
      appliedDateLabel: 'Applied Oct 19, 2026',
      status: AppliedJobStatus.evaluated,
    ),
    AppliedJobItem(
      id: 'job-3',
      companyName: 'Helios Consensus Corp',
      isVerified: false,
      jobTitle: 'Senior Backend Consensus Engineer',
      location: 'Remote',
      isRemote: true,
      employmentType: 'Contract',
      appliedDateLabel: 'Applied Oct 12, 2026',
      status: AppliedJobStatus.inProgress,
    ),
  ];

  static const SkillPercentilesData skillPercentiles = SkillPercentilesData(
    roleTitle: 'Staff Distributed Systems Engineer - High Throughput Telemetry',
    companyName: 'Aether Telemetry Systems',
    isCompanyVerified: true,
    poolStatusLabel: 'Active Pool',
    submittedMetaLabel: 'Submitted Oct 24, 2026 · REF-TG-8842-DS',
    previewNoticeLabel: 'Illustrative sample data — Non-live preview',
    infoTitle: 'WHAT DO THESE PERCENTILES MEAN?',
    infoPrimaryBody:
        'Each percentile shows the percentage of eligible applicants you performed better than on that skill. Relative comparison, not a hiring guarantee.',
    infoSecondaryBody:
        "Other applicants' individual scores and identities remain strictly confidential.",
    skills: [
      SkillPercentileItem(skillName: 'Go (Golang)', percentile: 88),
      SkillPercentileItem(
        skillName: 'Distributed Systems & Consensus',
        percentile: 82,
      ),
      SkillPercentileItem(
        skillName: 'High-Throughput Concurrency',
        percentile: 74,
      ),
      SkillPercentileItem(
        skillName: 'Kubernetes & Orchestration',
        percentile: 61,
      ),
    ],
    footerDisclaimer: 'This does not disqualify your application.',
  );
}

enum NotificationType {
  assessmentScheduled,
  interviewInvitation,
}

extension NotificationTypeX on NotificationType {
  String get label {
    switch (this) {
      case NotificationType.assessmentScheduled:
        return 'Assessment Scheduled';
      case NotificationType.interviewInvitation:
        return 'Interview Invitation';
    }
  }
}

enum NotificationSection {
  today,
  earlier,
}

extension NotificationSectionX on NotificationSection {
  String get headerTitle {
    switch (this) {
      case NotificationSection.today:
        return 'TODAY';
      case NotificationSection.earlier:
        return 'EARLIER';
    }
  }
}

@immutable
class TalentNotificationItem {
  const TalentNotificationItem({
    required this.id,
    required this.type,
    required this.section,
    required this.companyName,
    required this.roleTitle,
    required this.timeAgoLabel,
    required this.isUnread,
    this.scheduleLabel,
    this.messageBody,
  });

  final String id;
  final NotificationType type;
  final NotificationSection section;
  final String companyName;
  final String roleTitle;
  final String timeAgoLabel;
  final bool isUnread;
  final String? scheduleLabel;
  final String? messageBody;

  TalentNotificationItem copyWith({bool? isUnread}) {
    return TalentNotificationItem(
      id: id,
      type: type,
      section: section,
      companyName: companyName,
      roleTitle: roleTitle,
      timeAgoLabel: timeAgoLabel,
      isUnread: isUnread ?? this.isUnread,
      scheduleLabel: scheduleLabel,
      messageBody: messageBody,
    );
  }
}

abstract final class TalentGraphNotificationsSampleData {
  static const List<TalentNotificationItem> items = [
    TalentNotificationItem(
      id: 'notif-1',
      type: NotificationType.assessmentScheduled,
      section: NotificationSection.today,
      companyName: 'Aether Telemetry Systems',
      roleTitle: 'Staff Distributed Systems Engineer',
      timeAgoLabel: '2h ago',
      isUnread: true,
      scheduleLabel: 'Tomorrow at 10:00 AM',
    ),
    TalentNotificationItem(
      id: 'notif-2',
      type: NotificationType.interviewInvitation,
      section: NotificationSection.today,
      companyName: 'Prisma Cloud Systems',
      roleTitle: 'Senior Platform Engineer',
      timeAgoLabel: '5h ago',
      isUnread: true,
      messageBody: 'You have been invited to an interview.',
    ),
    TalentNotificationItem(
      id: 'notif-3',
      type: NotificationType.assessmentScheduled,
      section: NotificationSection.earlier,
      companyName: 'Nexus Global Infrastructure',
      roleTitle: 'Lead Reliability Architect',
      timeAgoLabel: '1d ago',
      isUnread: false,
    ),
    TalentNotificationItem(
      id: 'notif-4',
      type: NotificationType.interviewInvitation,
      section: NotificationSection.earlier,
      companyName: 'Crucible Data',
      roleTitle: 'Backend Consensus Engineer',
      timeAgoLabel: '2d ago',
      isUnread: false,
    ),
  ];
}
