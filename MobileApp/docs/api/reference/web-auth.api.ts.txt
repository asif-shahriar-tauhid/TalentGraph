import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  AuthResponseData,
  GithubAuthPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  User,
  VerifyEmailPayload,
} from "@/types";

export const login = async (
  payload: LoginPayload,
): Promise<ApiResponse<AuthResponseData>> => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const register = async (
  payload: RegisterPayload,
): Promise<ApiResponse<null>> => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const verifyEmail = async (
  payload: VerifyEmailPayload,
): Promise<ApiResponse<AuthResponseData>> => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const getMe = async (): Promise<ApiResponse<User>> => {
  return apiClient("/auth/me", {
    method: "GET",
  });
};

export const logout = async (): Promise<ApiResponse<null>> => {
  return apiClient("/auth/logout", {
    method: "POST",
  });
};

export const refreshToken = async (token?: string): Promise<
  ApiResponse<{ accessToken: string; refreshToken: string }>
> => {
  return apiClient("/auth/refresh-token", {
    method: "POST",
    body: token ? { refreshToken: token } : undefined,
  });
};

export const forgotPassword = async (
  email: string,
): Promise<ApiResponse<null>> => {
  return apiClient("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<ApiResponse<null>> => {
  return apiClient("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
};

export const getGithubAuthUrl = async (
  state?: string,
): Promise<ApiResponse<{ url: string }>> => {
  return apiClient("/auth/github/url", {
    method: "GET",
    query: state ? { state } : undefined,
  });
};

export const githubAuth = async (
  payload: GithubAuthPayload,
): Promise<ApiResponse<AuthResponseData>> => {
  return apiClient("/auth/github", {
    method: "POST",
    body: payload,
  });
};
