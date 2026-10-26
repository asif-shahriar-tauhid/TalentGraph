import httpStatus from "http-status";
import { deleteFromCloudinary, uploadToCloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
  IUpdateProfilePayload,
  IUpdateUserStatusPayload,
  IUserFilterRequest,
} from "./user.interface";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { imagePublicId: true, imageUrl: true },
  });

  if (!currentUser) {
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

  const { password: _, ...userData } = updatedUser;
  return userData;
};

const updateProfile = async (userId: string, payload: IUpdateProfilePayload) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });

  const { password: _, ...userData } = updatedUser;
  return userData;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const { password: _, ...userData } = user;
  return userData;
};

const getAllUsers = async (filters: IUserFilterRequest) => {
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const whereCondition: any = {
    isDeleted: false,
  };

  if (filters.role) {
    whereCondition.role = filters.role;
  }

  if (filters.status) {
    whereCondition.status = filters.status;
  }

  if (filters.searchTerm) {
    whereCondition.OR = [
      { name: { contains: filters.searchTerm, mode: "insensitive" } },
      { email: { contains: filters.searchTerm, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        imageUrl: true,
        authProvider: true,
        createdAt: true,
        updatedAt: true,
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

const updateUserStatus = async (id: string, payload: IUpdateUserStatusPayload) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: payload,
  });

  const { password: _, ...userData } = updatedUser;
  return userData;
};

export const UserService = {
  uploadProfileImage,
  updateProfile,
  getUserById,
  getAllUsers,
  updateUserStatus,
};
