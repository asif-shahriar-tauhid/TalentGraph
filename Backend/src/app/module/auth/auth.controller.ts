import type { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
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

const githubAuthRedirectCallback = catchAsync(async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  const state = req.query.state as string | undefined;
  const error = req.query.error as string | undefined;

  const isMobileCodeFlow = state === "mobile_code";
  const isMobileTokenFlow =
    state === "mobile" || Boolean(state?.startsWith("talentgraph://"));

  if (error || !code) {
    const errorMsg = encodeURIComponent(error || "github_authorization_cancelled");
    if (isMobileCodeFlow || isMobileTokenFlow) {
      res.redirect(`${config.mobile_callback_url}?error=${errorMsg}`);
      return;
    }
    res.redirect(`${config.frontend_url}/login?error=${errorMsg}`);
    return;
  }

  // Option A for Flutter: pass the raw OAuth code back to the mobile app via deep link
  // so Flutter can call POST /api/v1/auth/github itself.
  if (isMobileCodeFlow) {
    res.redirect(
      `${config.mobile_callback_url}?code=${encodeURIComponent(code)}`,
    );
    return;
  }

  try {
    const result = await AuthService.githubAuthCallback({ code });
    setAuthCookies(res, result.accessToken, result.refreshToken);

    // Option B for Flutter: backend exchanges the code and sends tokens via deep link.
    if (isMobileTokenFlow) {
      const params = new URLSearchParams({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        role: result.user.role,
      });
      res.redirect(`${config.mobile_callback_url}?${params.toString()}`);
      return;
    }

    const roleDashboard =
      result.user.role === "SYSTEM_ADMIN"
        ? "/admin"
        : result.user.role === "RECRUITER" || result.user.role === "SUB_RECRUITER"
          ? "/recruiter"
          : "/candidate";

    const isSafeStatePath =
      state &&
      state.startsWith("/") &&
      !state.startsWith("//") &&
      !state.startsWith("/login") &&
      !state.startsWith("/register");

    const targetPath = isSafeStatePath ? state : roleDashboard;
    res.redirect(`${config.frontend_url}${targetPath}`);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "github_authentication_failed";
    if (isMobileTokenFlow) {
      res.redirect(
        `${config.mobile_callback_url}?error=${encodeURIComponent(message)}`,
      );
      return;
    }
    res.redirect(
      `${config.frontend_url}/login?error=${encodeURIComponent(message)}`,
    );
  }
});

const connectGithubAccount = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.connectGithubAccount(
    req.user as unknown as IRequestUser,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GitHub account connected successfully.",
    data: result,
  });
});

const disconnectGithubAccount = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.disconnectGithubAccount(
    req.user as unknown as IRequestUser,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GitHub account disconnected successfully.",
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
  githubAuthRedirectCallback,
  connectGithubAccount,
  disconnectGithubAccount,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  logout,
  getMe,
};
