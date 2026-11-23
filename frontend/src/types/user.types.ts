import type { User, UserRole } from "./auth.types";

export interface UpdateProfilePayload {
  name?: string;
}

export interface UpdateUserStatusPayload {
  status?: "ACTIVE" | "BLOCKED" | "DELETED";
  role?: "RECRUITER" | "SUB_RECRUITER" | "CANDIDATE";
}

export interface UpdateAssessmentBanPayload {
  isAssessmentBanned: boolean;
  reason: string;
}

export interface CreateSubRecruiterPayload {
  name: string;
  email: string;
  temporaryPassword: string;
}

export interface DeleteMyAccountPayload {
  reason?: string;
}

export interface UserFilterParams {
  role?: Exclude<UserRole, "ADMIN">;
  status?: "ACTIVE" | "BLOCKED" | "DELETED";
  authProvider?: "CREDENTIAL" | "GITHUB" | "GOOGLE";
  isAssessmentBanned?: "true" | "false";
  emailVerified?: "true" | "false";
  includeDeleted?: "true" | "false";
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "name" | "email";
  sortOrder?: "asc" | "desc";
}

export interface NotificationItem {
  id: string;
  userId: string;
  category: string;
  title: string;
  message: string;
  targetUrl?: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface PersonalDataExport extends User {
  notifications?: NotificationItem[];
}
