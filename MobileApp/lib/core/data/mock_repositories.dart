import 'package:talentgraph/core/data/repositories.dart';
import 'package:talentgraph/core/domain/tg_enums.dart';
import 'package:talentgraph/core/domain/tg_models.dart';
import 'package:talentgraph/features/shell/job_brief_model.dart';

class MockJobsRepository implements JobsRepository {
  final List<JobBriefModel> _jobs = List.of(kDummyJobs);
  @override
  Future<List<JobBriefModel>> listJobs() async => List.of(_jobs);
  @override
  Future<void> toggleBookmark(String jobId) async {
    final i = _jobs.indexWhere((j) => j.jobId == jobId);
    if (i < 0) return;
    final j = _jobs[i];
    _jobs[i] = JobBriefModel(
      jobId: j.jobId,
      title: j.title,
      company: j.company,
      isVerified: j.isVerified,
      isBookmarked: !j.isBookmarked,
      location: j.location,
      jobType: j.jobType,
      level: j.level,
      postedAgo: j.postedAgo,
      summary: j.summary,
      skillChips: j.skillChips,
      evidenceTrailActive: j.evidenceTrailActive,
      evidenceTrailText: j.evidenceTrailText,
    );
  }

  @override
  Future<JobDetailModel?> getJobDetail(String jobId) async {
    final i = _jobs.indexWhere((j) => j.jobId == jobId);
    if (i < 0) return null;
    final j = _jobs[i];

    final skills =
        j.skillChips.isNotEmpty
            ? j.skillChips
            : const [
              'System Design',
              'Backend Architecture',
              'Distributed Systems',
            ];

    final requirements = List<JobSkillRequirementModel>.generate(
      skills.length,
      (idx) {
        final isPreferred = idx >= 3;
        final weight = switch (idx) {
          0 => 40,
          1 => 30,
          2 => 20,
          _ => 10,
        };
        return JobSkillRequirementModel(
          id: '${j.jobId}_skill_$idx',
          skillName: skills[idx],
          weight: weight,
          minThreshold: isPreferred ? 60 : 75,
          isPreferred: isPreferred,
        );
      },
    );

    final now = DateTime.now();
    return JobDetailModel(
      jobId: j.jobId,
      title: j.title,
      company: j.company,
      isVerified: j.isVerified,
      isBookmarked: j.isBookmarked,
      location: j.location,
      jobType: j.jobType,
      level: j.level,
      postedAgo: j.postedAgo,
      summary: j.summary,
      skillChips: j.skillChips,
      evidenceTrailActive: j.evidenceTrailActive,
      evidenceTrailText: j.evidenceTrailText,
      missionAndScope:
          '${j.company} is hiring a ${j.title} to own mission-critical technical architecture and production reliability. ${j.summary}',
      responsibilities: [
        'Design, build, and operate fault-tolerant services with clear latency and reliability SLOs.',
        'Collaborate directly with engineering leads on system architecture, code reviews, and technical roadmaps.',
        'Drive automated testing, observability, and performance profiling across core ${skills.first} workloads.',
        'Mentor peers through structured engineering reviews and transparent technical documentation.',
      ],
      eligibilityNotes:
          'Open to candidates who can collaborate across ${j.location} hours. Evaluation is based on objective technical evidence and weighted skill thresholds rather than keyword screening.',
      postedAt: now.subtract(const Duration(days: 3)),
      closesAt: now.add(const Duration(days: 21)),
      skillRequirements: requirements,
    );
  }
}

class MockApplicationsRepository implements ApplicationsRepository {
  final List<ApplicationModel> _apps = [
    ApplicationModel(
      id: 'app_001',
      referenceCode: 'REF-1001',
      jobId: 'job_001',
      jobTitle: 'Staff Distributed Systems Engineer',
      companyName: 'Nexus Cloud Infrastructure',
      isVerifiedCompany: true,
      location: 'Remote (US / EU)',
      jobType: 'Full-time',
      status: ApplicationStatus.underReview,
      appliedAt: DateTime(2026, 1, 10),
      cvFileName: 'resume.pdf',
      cvFileSizeLabel: '240 KB',
      matchScore: 88,
      hasEnoughCohortData: true,
      percentiles: const [
        SkillPercentileModel(
          skillName: 'Go',
          percentile: 92,
          eligibleCohortSize: 50,
          minCohortRequired: 10,
        ),
      ],
    ),
    ApplicationModel(
      id: 'app_002',
      referenceCode: 'REF-1002',
      jobId: 'job_002',
      jobTitle: 'Lead Platform Reliability Architect',
      companyName: 'Chronos Distributed Labs',
      isVerifiedCompany: true,
      location: 'San Francisco, CA (Hybrid)',
      jobType: 'Full-time',
      status: ApplicationStatus.shortlisted,
      appliedAt: DateTime(2026, 1, 5),
      cvFileName: 'resume.pdf',
      cvFileSizeLabel: '240 KB',
      matchScore: 91,
      hasEnoughCohortData: true,
      percentiles: const [
        SkillPercentileModel(
          skillName: 'Go',
          percentile: 88,
          eligibleCohortSize: 50,
          minCohortRequired: 10,
        ),
        SkillPercentileModel(
          skillName: 'Distributed Systems',
          percentile: 82,
          eligibleCohortSize: 50,
          minCohortRequired: 10,
        ),
        SkillPercentileModel(
          skillName: 'Concurrency',
          percentile: 74,
          eligibleCohortSize: 50,
          minCohortRequired: 10,
        ),
        SkillPercentileModel(
          skillName: 'Kubernetes',
          percentile: 61,
          eligibleCohortSize: 50,
          minCohortRequired: 10,
        ),
      ],
    ),
  ];
  @override
  Future<List<ApplicationModel>> listApplications() async => List.of(_apps);
  @override
  Future<ApplicationModel?> getApplication(String id) async {
    try {
      return _apps.firstWhere((a) => a.id == id);
    } catch (_) {
      return null;
    }
  }
}

class MockAssessmentsRepository implements AssessmentsRepository {
  @override
  Future<List<AssessmentInvitationModel>> listInvitations() async => const [];
}

class MockNotificationsRepository implements NotificationsRepository {
  final List<NotificationItemModel> _items = [
    NotificationItemModel(
      id: 'notif-1',
      type: NotificationType.assessmentAnnounced,
      title: 'Assessment Scheduled',
      companyName: 'Aether Telemetry Systems',
      roleTitle: 'Staff Distributed Systems Engineer',
      message: '',
      scheduleLabel: 'Thursday, Oct 29, 2026 · 14:00 UTC',
      isRead: false,
      createdAt: DateTime.now().subtract(const Duration(minutes: 15)),
      invitationId: null,
      applicationId: 'app_001',
    ),
    NotificationItemModel(
      id: 'notif-2',
      type: NotificationType.interviewInvitationEmail,
      title: 'Interview Invitation',
      companyName: 'Prisma Cloud Systems',
      roleTitle: 'Senior Rust Backend Engineer',
      message:
          'You have received an interview invitation. Check your email for details.',
      scheduleLabel: '',
      isRead: false,
      createdAt: DateTime.now().subtract(const Duration(hours: 2)),
      invitationId: null,
      applicationId: 'app_002',
    ),
    NotificationItemModel(
      id: 'notif-3',
      type: NotificationType.interviewInvitationEmail,
      title: 'Interview Invitation',
      companyName: 'Nexus Global Infrastructure',
      roleTitle: 'Lead Site Reliability Engineer',
      message:
          'You have received an interview invitation. Check your email for details.',
      scheduleLabel: '',
      isRead: true,
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
      invitationId: null,
      applicationId: 'app_002',
    ),
    NotificationItemModel(
      id: 'notif-4',
      type: NotificationType.assessmentAnnounced,
      title: 'Assessment Scheduled',
      companyName: 'Crucible Data',
      roleTitle: 'Senior Infrastructure Engineer - Storage Engine',
      message: '',
      scheduleLabel: 'Assessment: 15 November 2026 · 10:00 AM UTC',
      isRead: true,
      createdAt: DateTime.now().subtract(const Duration(days: 4)),
      invitationId: null,
      applicationId: null,
    ),
  ];
  @override
  Future<List<NotificationItemModel>> listNotifications() async =>
      List.of(_items);
  @override
  Future<void> markRead(String id) async {
    final i = _items.indexWhere((n) => n.id == id);
    if (i < 0) return;
    _items[i] = NotificationItemModel(
      id: _items[i].id,
      type: _items[i].type,
      title: _items[i].title,
      companyName: _items[i].companyName,
      roleTitle: _items[i].roleTitle,
      message: _items[i].message,
      scheduleLabel: _items[i].scheduleLabel,
      isRead: true,
      createdAt: _items[i].createdAt,
      invitationId: _items[i].invitationId,
      applicationId: _items[i].applicationId,
    );
  }

  @override
  Future<void> markAllRead() async {
    for (var i = 0; i < _items.length; i++) {
      final n = _items[i];
      _items[i] = NotificationItemModel(
        id: n.id,
        type: n.type,
        title: n.title,
        companyName: n.companyName,
        roleTitle: n.roleTitle,
        message: n.message,
        scheduleLabel: n.scheduleLabel,
        isRead: true,
        createdAt: n.createdAt,
        invitationId: n.invitationId,
        applicationId: n.applicationId,
      );
    }
  }
}
