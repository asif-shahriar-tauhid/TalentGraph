import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, "No file uploaded.");
  }

  const userId = req.user!.userId;
  const result = await UserService.uploadProfileImage(req.file.buffer, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile image updated successfully.",
    data: result,
  });
});

const deleteProfileImage = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await UserService.deleteProfileImage(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile image deleted successfully.",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await UserService.updateProfile(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully.",
    data: result,
  });
});

const getMyPersonalData = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await UserService.getMyPersonalData(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Personal data retrieved successfully.",
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await UserService.deleteMyAccount(userId, req.body);

  const clearCookieOptions = {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
    path: "/",
  };
  res.clearCookie("accessToken", { ...clearCookieOptions, httpOnly: false });
  res.clearCookie("refreshToken", { ...clearCookieOptions, httpOnly: true });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account deleted successfully.",
    data: result,
  });
});

const createSubRecruiter = catchAsync(async (req: Request, res: Response) => {
  const recruiterUserId = req.user!.userId;
  const result = await UserService.createSubRecruiter(recruiterUserId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Sub-recruiter account created successfully.",
    data: result,
  });
});

const getMySubRecruiters = catchAsync(async (req: Request, res: Response) => {
  const recruiterUserId = req.user!.userId;
  const result = await UserService.getMySubRecruiters(recruiterUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sub-recruiters fetched successfully.",
    data: result,
  });
});

const removeSubRecruiter = catchAsync(async (req: Request, res: Response) => {
  const recruiterUserId = req.user!.userId;
  const { id } = req.params;
  const result = await UserService.removeSubRecruiter(recruiterUserId, id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sub-recruiter removed successfully.",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully.",
    data: result.users,
    meta: result.meta,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully.",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminUserId = req.user!.userId;
  const result = await UserService.updateUserStatus(
    id as string,
    req.body,
    adminUserId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully.",
    data: result,
  });
});

const updateAssessmentBan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminUserId = req.user!.userId;
  const result = await UserService.updateAssessmentBan(
    id as string,
    req.body,
    adminUserId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Candidate assessment ban status updated successfully.",
    data: result,
  });
});

const softDeleteUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminUserId = req.user!.userId;
  const result = await UserService.softDeleteUserByAdmin(id as string, adminUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User soft-deleted successfully.",
    data: result,
  });
});

const restoreUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.restoreUserByAdmin(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User account restored successfully.",
    data: result,
  });
});

export const UserController = {
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
