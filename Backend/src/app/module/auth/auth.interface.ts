import type { Role } from "../../../generated/prisma/client";

export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface IVerifyEmailPayload {
  email: string;
  otp: string;
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IGithubAuthPayload {
  code: string;
  role?: Role;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  newPassword: string;
  otp: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IRequestUser {
  userId: string;
  email: string;
  name: string;
  role: Role;
}
