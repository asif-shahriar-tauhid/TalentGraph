import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:talentgraph/core/domain/tg_models.dart';
import 'package:talentgraph/core/data/mock_repositories.dart';
import 'package:talentgraph/features/shell/job_brief_model.dart';

abstract class JobsRepository {
  Future<List<JobBriefModel>> listJobs();
  Future<JobDetailModel?> getJobDetail(String jobId);
  Future<void> toggleBookmark(String jobId);
}

abstract class ApplicationsRepository {
  Future<List<ApplicationModel>> listApplications();
  Future<ApplicationModel?> getApplication(String id);
}

abstract class AssessmentsRepository {
  Future<List<AssessmentInvitationModel>> listInvitations();
}

abstract class NotificationsRepository {
  Future<List<NotificationItemModel>> listNotifications();
  Future<void> markRead(String id);
  Future<void> markAllRead();
}

final useMockApiProvider = Provider<bool>((ref) => true);
final jobsRepositoryProvider = Provider<JobsRepository>((ref) {
  return MockJobsRepository();
});
final applicationsRepositoryProvider = Provider<ApplicationsRepository>((ref) {
  return MockApplicationsRepository();
});
final assessmentsRepositoryProvider = Provider<AssessmentsRepository>((ref) {
  return MockAssessmentsRepository();
});
final notificationsRepositoryProvider = Provider<NotificationsRepository>((ref) {
  return MockNotificationsRepository();
});
