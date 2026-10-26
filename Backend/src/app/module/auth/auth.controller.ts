import type { Request, Response } from "express";
import httpStatus from "http-status";
import { githubAuth } from "../../lib/githubAuth";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { IRequestUser } from "./auth.interface";
import { AuthService } from "./auth.service";

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

const registerUser = catchAsync(async (req: Request, res: Response) => {
  await AuthService.registerUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Verification OTP code sent to your email.",
    data: null,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.verifyEmail(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Email verified successfully.",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully.",
    data: result,
  });
});

const getGithubAuthUrl = catchAsync(async (req: Request, res: Response) => {
  const state = req.query.state as string | undefined;
  const url = githubAuth.getGithubAuthUrl(state);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GitHub authorization URL generated.",
    data: { url },
  });
});

const githubAuthCallback = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.githubAuthCallback(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GitHub authentication successful.",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const result = await AuthService.refreshToken(token);
  setAuthCookies(res, result.accessToken, result.refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token refreshed successfully.",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgotPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset OTP sent to your email.",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully. You can now log in.",
    data: null,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.changePassword(req.user as unknown as IRequestUser, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully.",
    data: null,
  });
});

const logout = catchAsync(async (_req: Request, res: Response) => {
  clearAuthCookies(res);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged out successfully.",
    data: null,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getMe(req.user as unknown as IRequestUser);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully.",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  verifyEmail,
  loginUser,
  getGithubAuthUrl,
  githubAuthCallback,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  logout,
  getMe,
};
