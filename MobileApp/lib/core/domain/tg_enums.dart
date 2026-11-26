enum JobStatus { draft, active, closed, suspended }

enum ApplicationStatus {
  applied,
  assessmentPending,
  underReview,
  shortlisted,
  interview,
  rejected,
  withdrawn,
}

enum SessionStatus { scheduled, open, closed }

enum InvitationStatus { invited, submitted, expired, cancelled }

enum AttemptStatus { started, completed, reviewed }

enum SnapshotCaptureStatus { scheduled, captured, missed, failed }

enum NotificationType { assessmentAnnounced, interviewInvitationEmail }
