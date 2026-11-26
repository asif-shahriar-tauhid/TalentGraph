import 'package:talentgraph/core/domain/tg_enums.dart';
import 'package:talentgraph/features/shell/job_brief_model.dart';

class JobSkillRequirementModel {
  const JobSkillRequirementModel({
    required this.id,
    required this.skillName,
    required this.weight,
    required this.minThreshold,
    required this.isPreferred,
  });

  final String id;
  final String skillName;
  final int weight;
  final int minThreshold;
  final bool isPreferred;
}

class JobDetailModel extends JobBriefModel {
  const JobDetailModel({
    required super.jobId,
    required super.title,
    required super.company,
    required super.isVerified,
    required super.isBookmarked,
    required super.location,
    required super.jobType,
    required super.level,
    required super.postedAgo,
    required super.summary,
    required super.skillChips,
    required super.evidenceTrailActive,
    required super.evidenceTrailText,
    required this.missionAndScope,
    required this.responsibilities,
    required this.eligibilityNotes,
    required this.closesAt,
    required this.postedAt,
    required this.skillRequirements,
  });

  final String missionAndScope;
  final List<String> responsibilities;
  final String eligibilityNotes;
  final DateTime closesAt;
  final DateTime postedAt;
  final List<JobSkillRequirementModel> skillRequirements;
}

class ApplicationModel {
  const ApplicationModel({
    required this.id,
    required this.referenceCode,
    required this.jobId,
    required this.jobTitle,
    required this.companyName,
    required this.isVerifiedCompany,
    required this.location,
    required this.jobType,
    required this.status,
    required this.appliedAt,
    required this.cvFileName,
    required this.cvFileSizeLabel,
    required this.matchScore,
    required this.hasEnoughCohortData,
    required this.percentiles,
  });

  final String id;
  final String referenceCode;
  final String jobId;
  final String jobTitle;
  final String companyName;
  final bool isVerifiedCompany;
  final String location;
  final String jobType;
  final ApplicationStatus status;
  final DateTime appliedAt;
  final String cvFileName;
  final String cvFileSizeLabel;
  final int matchScore;
  final bool hasEnoughCohortData;
  final List<SkillPercentileModel> percentiles;
}

class SkillPercentileModel {
  const SkillPercentileModel({
    required this.skillName,
    required this.percentile,
    required this.eligibleCohortSize,
    required this.minCohortRequired,
  });

  final String skillName;
  final int percentile;
  final int eligibleCohortSize;
  final int minCohortRequired;

  bool get isAvailable => eligibleCohortSize >= minCohortRequired;
}

class AssessmentInvitationModel {
  const AssessmentInvitationModel({
    required this.id,
    required this.applicationId,
    required this.jobCode,
    required this.jobTitle,
    required this.companyName,
    required this.isVerifiedCompany,
    required this.scheduledStartAt,
    required this.timeZone,
    required this.sessionStatus,
    required this.invitationStatus,
    required this.questionCount,
    required this.overallDurationSecs,
    required this.attemptStatus,
    required this.resultReleasedAt,
  });

  final String id;
  final String applicationId;
  final String jobCode;
  final String jobTitle;
  final String companyName;
  final bool isVerifiedCompany;
  final DateTime scheduledStartAt;
  final String timeZone;
  final SessionStatus sessionStatus;
  final InvitationStatus invitationStatus;
  final int questionCount;
  final int overallDurationSecs;
  final AttemptStatus attemptStatus;
  final DateTime? resultReleasedAt;
}

class NotificationItemModel {
  const NotificationItemModel({
    required this.id,
    required this.type,
    required this.title,
    required this.companyName,
    required this.roleTitle,
    required this.message,
    required this.scheduleLabel,
    required this.isRead,
    required this.createdAt,
    required this.invitationId,
    required this.applicationId,
  });

  final String id;
  final NotificationType type;
  final String title;
  final String companyName;
  final String roleTitle;
  final String message;
  final String scheduleLabel;
  final bool isRead;
  final DateTime createdAt;
  final String? invitationId;
  final String? applicationId;
}
