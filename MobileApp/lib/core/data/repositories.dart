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

final useMockApiProvider = Provider<bool>(
  (ref) => true,
  name: "useMockApiProvider",
);
final jobsRepositoryProvider = Provider<JobsRepository>((ref) {
  ref.keepAlive();
  return MockJobsRepository();
});
final applicationsRepositoryProvider = Provider<ApplicationsRepository>((ref) {
  ref.keepAlive();
  return MockApplicationsRepository();
});
final assessmentsRepositoryProvider = Provider<AssessmentsRepository>((ref) {
  ref.keepAlive();
  return MockAssessmentsRepository();
});
final notificationsRepositoryProvider = Provider<NotificationsRepository>((
  ref,
) {
  ref.keepAlive();
  return MockNotificationsRepository();
});
