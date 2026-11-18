import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import config from "../../config";
import { deleteFromCloudinary, uploadToCloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
  ICreateSubRecruiterPayload,
  IDeleteMyAccountPayload,
  IUpdateAssessmentBanPayload,
  IUpdateProfilePayload,
  IUpdateUserStatusPayload,
  IUserFilterRequest,
} from "./user.interface";

const sanitizeUser = <
  T extends { password?: unknown; githubToken?: unknown; githubId?: string | null },
>(
  user: T,
) => {
  const { password: _password, githubToken, ...safeUser } = user;
  return {
    ...safeUser,
    isGithubConnected: Boolean(user.githubId && githubToken),
  };
};

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, imagePublicId: true, imageUrl: true, isDeleted: true },
  });

  if (!currentUser || currentUser.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const uploadResult = await uploadToCloudinary(buffer, "profile_images");

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    },
  });

  if (currentUser.imagePublicId) {
    await deleteFromCloudinary(currentUser.imagePublicId);
  }

  return sanitizeUser(updatedUser);
};

const deleteProfileImage = async (userId: string) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, imagePublicId: true, imageUrl: true, isDeleted: true },
  });

  if (!currentUser || currentUser.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (!currentUser.imageUrl && !currentUser.imagePublicId) {
    throw new AppError(httpStatus.BAD_REQUEST, "No profile image to remove.");
  }

  if (currentUser.imagePublicId) {
    await deleteFromCloudinary(currentUser.imagePublicId);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      imageUrl: "",
      imagePublicId: "",
    },
  });

  return sanitizeUser(updatedUser);
};

const updateProfile = async (userId: string, payload: IUpdateProfilePayload) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      candidateProfile: { select: { id: true } },
      recruiterProfile: { select: { id: true } },
    },
  });

  if (!currentUser || currentUser.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.name && currentUser.candidateProfile
        ? {
            candidateProfile: {
              update: { name: payload.name },
            },
          }
        : {}),
      ...(payload.name && currentUser.recruiterProfile
        ? {
            recruiterProfile: {
              update: { name: payload.name },
            },
          }
        : {}),
    },
    include: {
      candidateProfile: true,
      recruiterProfile: {
        include: { company: true },
      },
    },
  });

  return sanitizeUser(updatedUser);
};

const getMyPersonalData = async (userId: string) => {
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
          githubRepos: true,
          applications: {
            include: {
              job: {
                select: {
                  id: true,
                  title: true,
                  companyId: true,
                },
              },
            },
          },
          subscriptions: true,
          transactions: true,
        },
      },
      recruiterProfile: {
        include: {
          company: true,
          jobs: {
            select: {
              id: true,
              title: true,
              status: true,
              createdAt: true,
            },
          },
        },
      },
      notifications: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return sanitizeUser(user);
};

const deleteMyAccount = async (userId: string, payload?: IDeleteMyAccountPayload) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.role === "SYSTEM_ADMIN") {
    throw new AppError(httpStatus.FORBIDDEN, "System Admin accounts cannot be self-deleted.");
  }

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: userId },
      data: {
        isDeleted: true,
        status: "DELETED",
        deletedAt: new Date(),
        githubToken: null,
      },
    });

    await tx.notification.create({
      data: {
        userId,
        category: "ACCOUNT_DELETION",
        title: "Account Deletion Processed",
        message: payload?.reason
          ? `Account deleted by user. Reason: ${payload.reason}`
          : "Account deleted by user request.",
      },
    });

    return updated;
  });

  return { id: user.id, status: "DELETED", deletedAt: updatedUser.deletedAt };
};

const createSubRecruiter = async (
  recruiterUserId: string,
  payload: ICreateSubRecruiterPayload,
) => {
  const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where: { userId: recruiterUserId },
    include: { company: true },
  });

  if (!recruiterProfile || !recruiterProfile.companyId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You must create and link a company profile before adding sub-recruiters.",
    );
  }

  const email = payload.email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "A user with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(
    payload.temporaryPassword,
    config.bcrypt_salt_rounds,
  );

  const subRecruiter = await prisma.user.create({
    data: {
      name: payload.name.trim(),
      email,
      password: hashedPassword,
      role: "SUB_RECRUITER",
      status: "ACTIVE",
      authProvider: "CREDENTIAL",
      emailVerified: true,
      needPasswordChange: true,
      recruiterProfile: {
        create: {
          name: payload.name.trim(),
          companyId: recruiterProfile.companyId,
        },
      },
      notifications: {
        create: {
          category: "ONBOARDING",
          title: `Invited to ${recruiterProfile.company.name}`,
          message:
            "You have been added as a Sub-Recruiter. Please change your temporary password upon first login.",
        },
      },
    },
    include: {
      recruiterProfile: {
        include: { company: true },
      },
    },
  });

  return sanitizeUser(subRecruiter);
};

const getMySubRecruiters = async (recruiterUserId: string) => {
  const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where: { userId: recruiterUserId },
  });

  if (!recruiterProfile) {
    throw new AppError(httpStatus.BAD_REQUEST, "Recruiter company profile not found.");
  }

  const subRecruiters = await prisma.user.findMany({
    where: {
      role: "SUB_RECRUITER",
      isDeleted: false,
      recruiterProfile: { companyId: recruiterProfile.companyId },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      imageUrl: true,
      needPasswordChange: true,
      createdAt: true,
      updatedAt: true,
      recruiterProfile: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return subRecruiters;
};

const removeSubRecruiter = async (
  recruiterUserId: string,
  subRecruiterUserId: string,
) => {
  const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where: { userId: recruiterUserId },
  });

  if (!recruiterProfile) {
    throw new AppError(httpStatus.BAD_REQUEST, "Recruiter company profile not found.");
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: subRecruiterUserId },
    include: { recruiterProfile: true },
  });

  if (
    !targetUser ||
    targetUser.isDeleted ||
    targetUser.role !== "SUB_RECRUITER" ||
    targetUser.recruiterProfile?.companyId !== recruiterProfile.companyId
  ) {
    throw new AppError(httpStatus.NOT_FOUND, "Sub-recruiter not found in your company.");
  }

  const updatedSubRecruiter = await prisma.user.update({
    where: { id: subRecruiterUserId },
    data: {
      status: "DELETED",
      isDeleted: true,
      deletedAt: new Date(),
      githubToken: null,
    },
    include: {
      recruiterProfile: true,
    },
  });

  return sanitizeUser(updatedSubRecruiter);
};

const getAllUsers = async (filters: IUserFilterRequest) => {
  const page = Math.max(1, Number(filters.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(filters.limit) || 10));
  const skip = (page - 1) * limit;

  const andConditions: any[] = [];

  if (filters.status === "DELETED") {
    andConditions.push({
      OR: [{ status: "DELETED" }, { isDeleted: true }],
    });
  } else if (filters.includeDeleted === "true") {
    if (filters.status) {
      andConditions.push({ status: filters.status });
    }
  } else {
    andConditions.push({ isDeleted: false });
    if (filters.status) {
      andConditions.push({ status: filters.status });
    }
  }

  if (filters.role) {
    andConditions.push({ role: filters.role });
  }

  if (filters.authProvider) {
    andConditions.push({ authProvider: filters.authProvider });
  }

  if (filters.isAssessmentBanned === "true") {
    andConditions.push({ isAssessmentBanned: true });
  } else if (filters.isAssessmentBanned === "false") {
    andConditions.push({ isAssessmentBanned: false });
  }

  if (filters.emailVerified === "true") {
    andConditions.push({ emailVerified: true });
  } else if (filters.emailVerified === "false") {
    andConditions.push({ emailVerified: false });
  }

  if (filters.searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: filters.searchTerm, mode: "insensitive" } },
        { email: { contains: filters.searchTerm, mode: "insensitive" } },
      ],
    });
  }

  const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};

  const validSortFields = ["createdAt", "updatedAt", "name", "email"];
  const sortBy = validSortFields.includes(filters.sortBy as string)
    ? (filters.sortBy as string)
    : "createdAt";
  const sortOrder = filters.sortOrder === "asc" ? "asc" : "desc";

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        needPasswordChange: true,
        imageUrl: true,
        authProvider: true,
        isAssessmentBanned: true,
        isDeleted: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
        candidateProfile: {
          select: {
            id: true,
            headline: true,
            subscriptionTier: true,
            githubSyncCount: true,
          },
        },
        recruiterProfile: {
          select: {
            id: true,
            companyId: true,
            company: {
              select: {
                id: true,
                name: true,
                verificationStatus: true,
                subscriptionTier: true,
              },
            },
          },
        },
      },
    }),
    prisma.user.count({ where: whereCondition }),
  ]);

  return {
    users,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      candidateProfile: {
        include: {
          _count: {
            select: {
              skills: true,
              githubRepos: true,
              applications: true,
            },
          },
        },
      },
      recruiterProfile: {
        include: {
          company: true,
          _count: {
            select: {
              jobs: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return sanitizeUser(user);
};

const updateUserStatus = async (
  id: string,
  payload: IUpdateUserStatusPayload,
  adminUserId: string,
) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.id === adminUserId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You cannot change your own account status or role.",
    );
  }

  if (user.role === "SYSTEM_ADMIN") {
    throw new AppError(httpStatus.FORBIDDEN, "System Admin accounts cannot be modified.");
  }

  const dataToUpdate: any = {};

  if (payload.role) {
    dataToUpdate.role = payload.role;
  }

  if (payload.status) {
    dataToUpdate.status = payload.status;
    if (payload.status === "DELETED") {
      dataToUpdate.isDeleted = true;
      dataToUpdate.deletedAt = new Date();
      dataToUpdate.githubToken = null;
    } else if (payload.status === "ACTIVE" || payload.status === "BLOCKED") {
      dataToUpdate.isDeleted = false;
      dataToUpdate.deletedAt = null;
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...dataToUpdate,
      notifications: {
        create: {
          category: "ACCOUNT_STATUS",
          title: "Account Status Updated",
          message: `Your account details were updated by an administrator: ${
            payload.status ? `Status: ${payload.status}` : ""
          } ${payload.role ? `Role: ${payload.role}` : ""}`.trim(),
        },
      },
    },
    include: {
      candidateProfile: true,
      recruiterProfile: {
        include: { company: true },
      },
    },
  });

  return sanitizeUser(updatedUser);
};

const updateAssessmentBan = async (
  id: string,
  payload: IUpdateAssessmentBanPayload,
  adminUserId: string,
) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.role !== "CANDIDATE") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Assessment bans only apply to candidate accounts.",
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      isAssessmentBanned: payload.isAssessmentBanned,
      notifications: {
        create: {
          category: "ASSESSMENT_INTEGRITY",
          title: payload.isAssessmentBanned
            ? "Assessment Access Permanently Restricted"
            : "Assessment Access Restored",
          message: `Admin (${adminUserId}) updated assessment ban status to ${
            payload.isAssessmentBanned ? "BANNED" : "ACTIVE"
          }. Reason: ${payload.reason}`,
        },
      },
    },
    include: {
      candidateProfile: true,
    },
  });

  return sanitizeUser(updatedUser);
};

const softDeleteUserByAdmin = async (id: string, adminUserId: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (user.id === adminUserId || user.role === "SYSTEM_ADMIN") {
    throw new AppError(httpStatus.FORBIDDEN, "Cannot delete a System Admin account.");
  }

  if (user.isDeleted && user.status === "DELETED") {
    throw new AppError(httpStatus.BAD_REQUEST, "User account is already deleted.");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
      status: "DELETED",
      deletedAt: new Date(),
      githubToken: null,
    },
  });

  return sanitizeUser(updatedUser);
};

const restoreUserByAdmin = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (!user.isDeleted && user.status !== "DELETED") {
    throw new AppError(httpStatus.BAD_REQUEST, "User account is not deleted.");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      isDeleted: false,
      status: "ACTIVE",
      deletedAt: null,
    },
  });

  return sanitizeUser(updatedUser);
};

export const UserService = {
  uploadProfileImage,
  deleteProfileImage,
  updateProfile,
  getMyPersonalData,
  deleteMyAccount,
  createSubRecruiter,
  getMySubRecruiters,
  removeSubRecruiter,
  getAllUsers,
  getUserById,
  updateUserStatus,
  updateAssessmentBan,
  softDeleteUserByAdmin,
  restoreUserByAdmin,
};
