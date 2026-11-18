export interface ISelectRepoInput {
  repoName: string;
  repoUrl: string;
  isSelected: boolean;
  stargazers?: number;
  languages?: Record<string, unknown>;
  dependencies?: Record<string, unknown>;
  lastCommitAt?: string | Date;
}

export interface ISelectRepositoriesPayload {
  repositories: ISelectRepoInput[];
}

export interface IGitHubRepoResponse {
  id?: string;
  repoName: string;
  repoUrl: string;
  isSelected: boolean;
  languages?: unknown;
  dependencies?: unknown;
  stargazers: number;
  lastCommitAt?: Date | string | null;
  lastSyncCommitSha?: string | null;
}

export interface ISyncStatusResponse {
  quota: string;
  quotaDetails: {
    total: number;
    used: number;
    remaining: number;
    resetAt: Date | null;
  };
  nextMonthlyResetAt: Date | null;
  activeJob: {
    jobId: string;
    type: string;
    status: string;
    errorSummary: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
