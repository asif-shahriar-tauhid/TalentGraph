import type { Prisma } from "../../../generated/prisma/client";
import httpStatus from "http-status";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
  ICandidateProfileResponse,
  IUpdateCandidateProfilePayload,
} from "./candidateProfile.interface";

const getCandidateProfile = async (
  userId: string,
): Promise<ICandidateProfileResponse> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      candidateProfile: {
        include: {
          skills: {
            include: {
              skill: true,
              evidence: true,
            },
          },
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
      data: {
        userId: user.id,
        name: user.name,
      },
      include: {
        skills: {
          include: {
            skill: true,
            evidence: true,
          },
        },
      },
    });
  }

  const syncQuota = {
    total: 3,
    used: profile.githubSyncCount,
    remaining: Math.max(0, 3 - profile.githubSyncCount),
    resetAt: profile.githubSyncResetAt,
  };

  const verifiedSkills = profile.skills.map((s) => ({
    id: s.skillId,
    name: s.skill.name,
    category: s.skill.category,
    overallScore: s.overallScore,
    evidenceCount: s.evidence.length,
  }));

  return {
    id: profile.id,
    userId: user.id,
    name: profile.name || user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    headline: profile.headline,
    education: profile.education,
    links: profile.links,
    cvUrl: profile.cvUrl,
    subscriptionTier: profile.subscriptionTier,
    syncQuota,
    verifiedSkills,
  };
};

const updateCandidateProfile = async (
  userId: string,
  payload: IUpdateCandidateProfilePayload,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, isDeleted: true },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate not found.");
  }

  const existingProfile = await prisma.candidateProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    await prisma.candidateProfile.create({
      data: {
        userId,
        name: user.name,
      },
    });
  }

  const updatedProfile = await prisma.candidateProfile.update({
    where: { userId },
    data: {
      ...(payload.headline !== undefined ? { headline: payload.headline } : {}),
      ...(payload.education !== undefined
        ? { education: payload.education as unknown as Prisma.InputJsonValue }
        : {}),
      ...(payload.links !== undefined
        ? { links: payload.links as unknown as Prisma.InputJsonValue }
        : {}),
    },
    include: {
      skills: {
        include: {
          skill: true,
          evidence: true,
        },
      },
    },
  });

  const syncQuota = {
    total: 3,
    used: updatedProfile.githubSyncCount,
    remaining: Math.max(0, 3 - updatedProfile.githubSyncCount),
    resetAt: updatedProfile.githubSyncResetAt,
  };

  const verifiedSkills = updatedProfile.skills.map((s) => ({
    id: s.skillId,
    name: s.skill.name,
    category: s.skill.category,
    overallScore: s.overallScore,
    evidenceCount: s.evidence.length,
  }));

  return {
    id: updatedProfile.id,
    userId,
    name: updatedProfile.name,
    headline: updatedProfile.headline,
    education: updatedProfile.education,
    links: updatedProfile.links,
    cvUrl: updatedProfile.cvUrl,
    subscriptionTier: updatedProfile.subscriptionTier,
    syncQuota,
    verifiedSkills,
  };
};

const uploadCV = async (userId: string, file: Express.Multer.File) => {
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
      data: {
        userId: user.id,
        name: user.name,
      },
    });
  }

  const uploadResult = await uploadToCloudinary(file.buffer, "candidate_cvs", {
    resource_type: "auto",
  });

  const updatedProfile = await prisma.candidateProfile.update({
    where: { id: profile.id },
    data: { cvUrl: uploadResult.secure_url },
  });

  // shortcut: BackgroundJob stored in DB without queue worker trigger, upgrade when n8n/BullMQ consumer is hooked up
  const backgroundJob = await prisma.backgroundJob.create({
    data: {
      type: "CV_PARSING",
      status: "PENDING",
      correlationId: updatedProfile.id,
      payload: {
        candidateId: updatedProfile.id,
        userId: user.id,
        cvUrl: uploadResult.secure_url,
        cvPublicId: uploadResult.public_id,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
      },
    },
  });

  return {
    cvUrl: uploadResult.secure_url,
    jobId: backgroundJob.id,
    status: backgroundJob.status,
  };
};

const getCVStatus = async (userId: string) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found.");
  }

  const latestJob = await prisma.backgroundJob.findFirst({
    where: {
      type: "CV_PARSING",
      correlationId: profile.id,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!latestJob) {
    return {
      jobId: null,
      status: "NOT_UPLOADED",
      cvUrl: profile.cvUrl || null,
      errorSummary: null,
      createdAt: null,
      updatedAt: null,
    };
  }

  return {
    jobId: latestJob.id,
    status: latestJob.status,
    cvUrl: profile.cvUrl,
    errorSummary: latestJob.errorSummary,
    createdAt: latestJob.createdAt,
    updatedAt: latestJob.updatedAt,
  };
};

const getParsedCV = async (userId: string) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: { userId },
    include: {
      skills: {
        include: {
          skill: true,
          evidence: true,
        },
      },
    },
  });

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found.");
  }

  const latestJob = await prisma.backgroundJob.findFirst({
    where: {
      type: "CV_PARSING",
      correlationId: profile.id,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!latestJob) {
    throw new AppError(httpStatus.NOT_FOUND, "No CV has been uploaded yet.");
  }

  if (latestJob.status === "PENDING" || latestJob.status === "PROCESSING") {
    return {
      status: latestJob.status,
      message: "CV parsing is currently in progress. Please check back shortly.",
      parsedData: null,
    };
  }

  if (latestJob.status === "FAILED") {
    return {
      status: latestJob.status,
      message:
        latestJob.errorSummary || "CV parsing failed. Please re-upload your CV.",
      parsedData: null,
    };
  }

  const payload = (latestJob.payload || {}) as Record<string, unknown>;
  const parsedData = (payload.parsedData || {
    skills:
      payload.skills ||
      profile.skills.map((s) => ({
        name: s.skill.name,
        category: s.skill.category,
        score: s.overallScore,
      })),
    experience: payload.experience || [],
    education: payload.education || profile.education,
    projects: payload.projects || [],
  }) as Record<string, unknown>;

  return {
    status: latestJob.status,
    parsedData,
  };
};

export const CandidateProfileService = {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCV,
  getCVStatus,
  getParsedCV,
};
