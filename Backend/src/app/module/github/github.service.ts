import type { Prisma } from "../../../generated/prisma/client";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
  IGitHubRepoResponse,
  ISelectRepositoriesPayload,
  ISyncStatusResponse,
} from "./github.interface";

/**
 * Calculates current Dhaka date and the next month's 1st 00:00:00 (UTC Date object).
 * Asia/Dhaka is UTC+6.
 */
export const getDhakaMonthDetails = (referenceDate = new Date()) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const parts = formatter.formatToParts(referenceDate);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  // 1st of next month in Dhaka at 00:00:00 local time (which is -6h in UTC)
  const nextResetDate = new Date(
    Date.UTC(nextYear, nextMonth - 1, 1, -6, 0, 0, 0),
  );

  return {
    dhakaYear: year,
    dhakaMonth: month,
    nextResetDate,
  };
};

const extractGithubUsername = (githubUrlOrHandle?: string): string | null => {
  if (!githubUrlOrHandle) return null;
  const trimmed = githubUrlOrHandle.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    const parts = trimmed.split("/").filter(Boolean);
    return parts[parts.length - 1] || null;
  }
  return trimmed;
};

const getPublicRepositories = async (
  userId: string,
): Promise<IGitHubRepoResponse[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      candidateProfile: {
        include: {
          githubRepos: true,
        },
      },
    },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate not found.");
  }

  let profile = user.candidateProfile;
  if (!profile) {
    profile = await prisma.candidateProfile.create({
      data: { userId: user.id, name: user.name },
      include: { githubRepos: true },
    });
  }

  const savedRepos = profile.githubRepos;
  const savedRepoMap = new Map(
    savedRepos.map((r) => [r.repoUrl.toLowerCase(), r]),
  );

  let ghUsername: string | null = null;
  if (profile.links && typeof profile.links === "object") {
    const links = profile.links as Record<string, unknown>;
    if (typeof links.github === "string") {
      ghUsername = extractGithubUsername(links.github);
    }
  }

  const token = user.githubToken || null;
  let remoteRepos: Array<{
    name: string;
    html_url: string;
    description?: string;
    language?: string;
    stargazers_count: number;
    updated_at: string;
    pushed_at?: string;
  }> = [];

  if (token || ghUsername) {
    try {
      const headers: Record<string, string> = {
        "User-Agent": "TalentGraph-Backend",
        Accept: "application/vnd.github+json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const url = token
        ? "https://api.github.com/user/repos?type=public&sort=updated&per_page=100"
        : `https://api.github.com/users/${encodeURIComponent(ghUsername!)}/repos?type=public&sort=updated&per_page=100`;

      const response = await fetch(url, { headers });
      if (response.ok) {
        remoteRepos = await response.json();
      }
    } catch {
      // Fallback to local DB records if network or rate limit blocks
    }
  }

  if (remoteRepos.length > 0) {
    return remoteRepos.map((remote) => {
      const saved = savedRepoMap.get(remote.html_url.toLowerCase());
      return {
        id: saved?.id,
        repoName: remote.name,
        repoUrl: remote.html_url,
        isSelected: saved?.isSelected ?? false,
        stargazers: remote.stargazers_count,
        languages:
          saved?.languages ??
          (remote.language ? { [remote.language]: 1 } : {}),
        dependencies: saved?.dependencies ?? {},
        lastCommitAt:
          saved?.lastCommitAt ??
          (remote.pushed_at
            ? new Date(remote.pushed_at)
            : new Date(remote.updated_at)),
        lastSyncCommitSha: saved?.lastSyncCommitSha ?? null,
      };
    });
  }

  return savedRepos.map((saved) => ({
    id: saved.id,
    repoName: saved.repoName,
    repoUrl: saved.repoUrl,
    isSelected: saved.isSelected,
    stargazers: saved.stargazers,
    languages: saved.languages,
    dependencies: saved.dependencies,
    lastCommitAt: saved.lastCommitAt,
    lastSyncCommitSha: saved.lastSyncCommitSha,
  }));
};

const selectRepositories = async (
  userId: string,
  payload: ISelectRepositoriesPayload,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { candidateProfile: true },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate not found.");
  }

  let profile = user.candidateProfile;
  if (!profile) {
    profile = await prisma.candidateProfile.create({
      data: { userId: user.id, name: user.name },
    });
  }

  const items = payload.repositories;
  const results = [];

  for (const item of items) {
    const existing = await prisma.gitHubRepo.findFirst({
      where: {
        candidateId: profile.id,
        repoUrl: item.repoUrl,
      },
    });

    if (existing) {
      const updated = await prisma.gitHubRepo.update({
        where: { id: existing.id },
        data: {
          isSelected: item.isSelected,
          ...(item.languages
            ? {
                languages:
                  item.languages as unknown as Prisma.InputJsonValue,
              }
            : {}),
          ...(item.dependencies
            ? {
                dependencies:
                  item.dependencies as unknown as Prisma.InputJsonValue,
              }
            : {}),
          ...(item.stargazers !== undefined
            ? { stargazers: item.stargazers }
            : {}),
          ...(item.lastCommitAt
            ? { lastCommitAt: new Date(item.lastCommitAt) }
            : {}),
        },
      });
      results.push(updated);
    } else {
      const created = await prisma.gitHubRepo.create({
        data: {
          candidateId: profile.id,
          repoName: item.repoName,
          repoUrl: item.repoUrl,
          isSelected: item.isSelected,
          languages: (item.languages || {}) as unknown as Prisma.InputJsonValue,
          dependencies: (item.dependencies ||
            {}) as unknown as Prisma.InputJsonValue,
          stargazers: item.stargazers || 0,
          lastCommitAt: item.lastCommitAt
            ? new Date(item.lastCommitAt)
            : new Date(),
        },
      });
      results.push(created);
    }
  }

  return results;
};

const syncRepositories = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      candidateProfile: {
        include: {
          githubRepos: true,
        },
      },
    },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate not found.");
  }

  let profile = user.candidateProfile;
  if (!profile) {
    profile = await prisma.candidateProfile.create({
      data: { userId: user.id, name: user.name },
      include: { githubRepos: true },
    });
  }

  // 1. Quota reset check (Asia/Dhaka timezone)
  const now = new Date();
  const { nextResetDate } = getDhakaMonthDetails(now);

  let currentSyncCount = profile.githubSyncCount;
  let currentResetAt = profile.githubSyncResetAt;

  if (!currentResetAt || now >= currentResetAt) {
    currentSyncCount = 0;
    currentResetAt = nextResetDate;
    await prisma.candidateProfile.update({
      where: { id: profile.id },
      data: {
        githubSyncCount: 0,
        githubSyncResetAt: nextResetDate,
      },
    });
  }

  // 2. Check if candidate has selected repositories
  const selectedRepos = profile.githubRepos.filter((r) => r.isSelected);
  if (selectedRepos.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No repositories selected. Please select at least one public repository before initiating sync.",
    );
  }

  // 3. Idempotent check: if a sync job is already pending or processing, return it without consuming extra quota
  const existingActiveJob = await prisma.backgroundJob.findFirst({
    where: {
      type: "GITHUB_SYNC",
      correlationId: profile.id,
      status: { in: ["PENDING", "PROCESSING"] },
    },
    orderBy: { createdAt: "desc" },
  });

  if (existingActiveJob) {
    return {
      message: "A repository sync job is already in progress.",
      jobId: existingActiveJob.id,
      status: existingActiveJob.status,
      quota: `${currentSyncCount}/3`,
      quotaDetails: {
        total: 3,
        used: currentSyncCount,
        remaining: Math.max(0, 3 - currentSyncCount),
        resetAt: currentResetAt,
      },
    };
  }

  // 4. Enforce quota: maximum 3 syncs per calendar month
  if (currentSyncCount >= 3) {
    throw new AppError(
      httpStatus.TOO_MANY_REQUESTS,
      `Monthly GitHub repository sync quota exceeded (3/3). Limit resets on ${currentResetAt?.toISOString()}.`,
    );
  }

  // 5. Increment quota and update profile
  const newSyncCount = currentSyncCount + 1;
  const updatedProfile = await prisma.candidateProfile.update({
    where: { id: profile.id },
    data: {
      githubSyncCount: newSyncCount,
      githubSyncResetAt: currentResetAt,
    },
  });

  // shortcut: BackgroundJob stored in DB without worker runner, upgrade when n8n/BullMQ consumer is hooked up
  const backgroundJob = await prisma.backgroundJob.create({
    data: {
      type: "GITHUB_SYNC",
      status: "PENDING",
      correlationId: profile.id,
      payload: {
        candidateId: profile.id,
        userId: user.id,
        syncCount: newSyncCount,
        selectedRepos: selectedRepos.map((r) => ({
          id: r.id,
          repoName: r.repoName,
          repoUrl: r.repoUrl,
        })),
      },
    },
  });

  return {
    message: "GitHub repository sync initiated successfully.",
    jobId: backgroundJob.id,
    status: backgroundJob.status,
    quota: `${newSyncCount}/3`,
    quotaDetails: {
      total: 3,
      used: newSyncCount,
      remaining: Math.max(0, 3 - newSyncCount),
      resetAt: updatedProfile.githubSyncResetAt,
    },
  };
};

const getSyncStatus = async (userId: string): Promise<ISyncStatusResponse> => {
  const profile = await prisma.candidateProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found.");
  }

  const now = new Date();
  const { nextResetDate } = getDhakaMonthDetails(now);

  let currentSyncCount = profile.githubSyncCount;
  let currentResetAt = profile.githubSyncResetAt;

  if (!currentResetAt || now >= currentResetAt) {
    currentSyncCount = 0;
    currentResetAt = nextResetDate;
    await prisma.candidateProfile.update({
      where: { id: profile.id },
      data: {
        githubSyncCount: 0,
        githubSyncResetAt: nextResetDate,
      },
    });
  }

  const latestJob = await prisma.backgroundJob.findFirst({
    where: {
      type: "GITHUB_SYNC",
      correlationId: profile.id,
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    quota: `${currentSyncCount}/3`,
    quotaDetails: {
      total: 3,
      used: currentSyncCount,
      remaining: Math.max(0, 3 - currentSyncCount),
      resetAt: currentResetAt,
    },
    nextMonthlyResetAt: currentResetAt,
    activeJob: latestJob
      ? {
          jobId: latestJob.id,
          type: latestJob.type,
          status: latestJob.status,
          errorSummary: latestJob.errorSummary,
          createdAt: latestJob.createdAt,
          updatedAt: latestJob.updatedAt,
        }
      : null,
  };
};

export const GithubService = {
  getDhakaMonthDetails,
  getPublicRepositories,
  selectRepositories,
  syncRepositories,
  getSyncStatus,
};
