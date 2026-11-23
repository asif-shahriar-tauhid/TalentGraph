import type { AuthProvider, Role, UserStatus } from "../../../generated/prisma/client";

export interface IUpdateProfilePayload {
  name?: string;
}

export interface IUpdateUserStatusPayload {
  status?: UserStatus;
  role?: Exclude<Role, "SYSTEM_ADMIN">;
}

export interface IUpdateAssessmentBanPayload {
  isAssessmentBanned: boolean;
  reason: string;
}

export interface ICreateSubRecruiterPayload {
  name: string;
  email: string;
  temporaryPassword: string;
}

export interface IDeleteMyAccountPayload {
  reason?: string;
}

export interface IUserFilterRequest {
  role?: Role;
  status?: UserStatus;
  authProvider?: AuthProvider;
  isAssessmentBanned?: string; // "true" | "false" from req.query
  emailVerified?: string;      // "true" | "false" from req.query
  includeDeleted?: string;     // "true" | "false" from req.query
  searchTerm?: string;
  page?: string | number;
  limit?: string | number;
  sortBy?: "createdAt" | "updatedAt" | "name" | "email";
  sortOrder?: "asc" | "desc";
}
