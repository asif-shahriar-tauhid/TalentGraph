export type UserRole =
  | "CANDIDATE"
  | "RECRUITER"
  | "SUB_RECRUITER"
  | "SYSTEM_ADMIN"
  | "ADMIN";

export type SubscriptionTier = "FREE" | "PRO" | "TEAM" | "PREMIUM";

export type CompanyVerificationStatus =
  | "DRAFT"
  | "PENDING"
  | "NEEDS_MORE_INFO"
  | "VERIFIED"
  | "REJECTED";

export interface CandidateProfileSummary {
  id: string;
  userId?: string;
  name?: string;
  headline: string;
  education?: unknown;
  links?: Record<string, string>;
  cvUrl?: string;
  subscriptionTier: SubscriptionTier;
  githubSyncCount: number;
  githubSyncResetAt?: string | null;
  _count?: {
    skills: number;
    githubRepos: number;
    applications: number;
  };
}

export interface CompanySummary {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  verificationStatus: CompanyVerificationStatus;
  rejectionReason?: string | null;
  subscriptionTier: SubscriptionTier;
}

export interface RecruiterProfileSummary {
  id: string;
  userId?: string;
  companyId: string;
  name?: string;
  company?: CompanySummary | null;
  _count?: {
    jobs: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  emailVerified: boolean;
  needPasswordChange?: boolean;
  githubId?: string | null;
  imageUrl?: string;
  imagePublicId?: string;
  authProvider: "CREDENTIAL" | "GITHUB" | "GOOGLE";
  isAssessmentBanned?: boolean;
  isGithubConnected?: boolean;
  isDeleted?: boolean;
  deletedAt?: string | null;
  candidateProfile?: CandidateProfileSummary | null;
  recruiterProfile?: RecruiterProfileSummary | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "RECRUITER" | "SUB_RECRUITER" | "CANDIDATE";
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface GithubAuthPayload {
  code: string;
  role?: "RECRUITER" | "SUB_RECRUITER" | "CANDIDATE";
}

export interface ConnectGithubPayload {
  code: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  otp: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
