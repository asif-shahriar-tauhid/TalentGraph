import type { SubscriptionTier } from "../../../generated/prisma/client";

export interface IEducationItem {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  [key: string]: unknown;
}

export interface IUpdateCandidateProfilePayload {
  headline?: string;
  education?: IEducationItem[];
  links?: Record<string, string>;
}

export interface ISyncQuota {
  total: number;
  used: number;
  remaining: number;
  resetAt: Date | null;
}

export interface IVerifiedSkillSummary {
  id: string;
  name: string;
  category: string;
  overallScore: number;
  evidenceCount: number;
}

export interface ICandidateProfileResponse {
  id: string;
  userId: string;
  name: string;
  email: string;
  imageUrl: string;
  headline: string;
  education: unknown;
  links: unknown;
  cvUrl: string;
  subscriptionTier: SubscriptionTier;
  syncQuota: ISyncQuota;
  verifiedSkills: IVerifiedSkillSummary[];
}

export interface ICVParsedData {
  skills?: Array<{ name: string; category?: string; score?: number }>;
  experience?: Array<Record<string, unknown>>;
  education?: Array<Record<string, unknown>>;
  projects?: Array<Record<string, unknown>>;
  [key: string]: unknown;
}
