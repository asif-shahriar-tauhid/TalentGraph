export type UserRole =
  | "CANDIDATE"
  | "RECRUITER"
  | "SUB_RECRUITER"
  | "SYSTEM_ADMIN"
  | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  emailVerified: boolean;
  imageUrl?: string;
  authProvider: "CREDENTIAL" | "GITHUB" | "GOOGLE";
  createdAt?: string;
  updatedAt?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "RECRUITER" | "SUB_RECRUITER" | "CANDIDATE";
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface GithubAuthPayload {
  code: string;
  role?: "RECRUITER" | "SUB_RECRUITER" | "CANDIDATE";
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  otp: string;
}
