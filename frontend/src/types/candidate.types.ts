import type { SubscriptionTier } from "./auth.types";

export interface EducationItem {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  [key: string]: unknown;
}

export interface UpdateCandidateProfilePayload {
  headline?: string;
  education?: EducationItem[];
  links?: Record<string, string>;
}

export interface SyncQuota {
  total: number;
  used: number;
  remaining: number;
  resetAt: string | null;
}

export interface VerifiedSkillSummary {
  id: string;
  name: string;
  category: string;
  overallScore: number;
  evidenceCount: number;
}

export interface CandidateProfileResponse {
  id: string;
  userId: string;
  name: string;
  email: string;
  imageUrl: string;
  headline: string;
  education: EducationItem[];
  links: Record<string, string>;
  cvUrl: string;
  subscriptionTier: SubscriptionTier;
  syncQuota: SyncQuota;
  verifiedSkills: VerifiedSkillSummary[];
}

export interface CVUploadResponse {
  cvUrl: string;
  jobId: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
}

export interface CVStatusResponse {
  jobId: string | null;
  status: "NOT_UPLOADED" | "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  cvUrl: string | null;
  errorSummary: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CVParsedData {
  skills?: Array<{ name: string; category?: string; score?: number }>;
  experience?: Array<Record<string, unknown>>;
  education?: Array<Record<string, unknown>>;
  projects?: Array<Record<string, unknown>>;
  [key: string]: unknown;
}

export interface CVParsedResponse {
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  message?: string;
  parsedData: CVParsedData | null;
}

export interface GitHubRepoItem {
  id?: string;
  repoName: string;
  repoUrl: string;
  isSelected: boolean;
  languages?: Record<string, unknown>;
  dependencies?: Record<string, unknown>;
  stargazers: number;
  lastCommitAt?: string | null;
  lastSyncCommitSha?: string | null;
}

export interface SelectRepoInput {
  repoName: string;
  repoUrl: string;
  isSelected: boolean;
  stargazers?: number;
  languages?: Record<string, unknown>;
  dependencies?: Record<string, unknown>;
  lastCommitAt?: string;
}

export interface SelectRepositoriesPayload {
  repositories: SelectRepoInput[];
}

export interface GitHubSyncResponse {
  message: string;
  jobId: string;
  status: string;
  quota: string;
  quotaDetails: SyncQuota;
}

export interface GitHubSyncStatusResponse {
  quota: string;
  quotaDetails: SyncQuota;
  nextMonthlyResetAt: string | null;
  activeJob: {
    jobId: string;
    type: string;
    status: string;
    errorSummary: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
}
