import crypto from "crypto";
import path from "path";
import bcrypt from "bcryptjs";
import ejs from "ejs";
import httpStatus from "http-status";
import config from "../../config";
import { githubAuth } from "../../lib/githubAuth";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import { redisClient } from "../../lib/redis";
import { AppError } from "../../utils/AppError";
import { jwtUtils } from "../../utils/jwt";
import type {
  IChangePasswordPayload,
  IForgotPasswordPayload,
  IGithubAuthPayload,
  ILoginUserPayload,
  IRegisterUserPayload,
  IRequestUser,
  IResetPasswordPayload,
  IVerifyEmailPayload,
} from "./auth.interface";

const OTP_EXPIRY_SECONDS = 5 * 60; // 5 minutes

const registerUser = async (payload: IRegisterUserPayload) => {
  const email = payload.email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);
  const otp = crypto.randomInt(100000, 999999).toString();

  const otpKey = `registration-otp:${email}`;
  const dataKey = `registration-data:${email}`;

  await redisClient.set(otpKey, otp, { EX: OTP_EXPIRY_SECONDS });
  await redisClient.set(
    dataKey,
    JSON.stringify({
      name: payload.name,
      email,
      password: hashedPassword,
      role: payload.role || "RECRUITER",
    }),
    { EX: OTP_EXPIRY_SECONDS },
  );

  const templatePath = path.join(process.cwd(), "src/app/templates/registrationOTP.ejs");
  const html = await ejs.renderFile(templatePath, {
    otpValue: otp,
    APP_NAME: "TalentGraph",
    USER_NAME: payload.name,
    EXPIRY_MINUTES: OTP_EXPIRY_SECONDS / 60,
    CURRENT_YEAR: new Date().getFullYear(),
  });

  await transporter.sendMail({
    from: config.email_sender,
    to: email,
    subject: "Verify Your Email - TalentGraph",
    html,
  });
};

const verifyEmail = async (payload: IVerifyEmailPayload) => {
  const email = payload.email.trim().toLowerCase();
  const otpKey = `registration-otp:${email}`;
  const dataKey = `registration-data:${email}`;

  const storedOtp = await redisClient.get(otpKey);
  if (!storedOtp || storedOtp !== payload.otp) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid or expired verification OTP.");
  }

  const pendingDataStr = await redisClient.get(dataKey);
  if (!pendingDataStr) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Registration session expired. Please register again.",
    );
  }

  const pendingData = JSON.parse(pendingDataStr);

  const newUser = await prisma.user.create({
    data: {
      name: pendingData.name,
      email: pendingData.email,
      password: pendingData.password,
      role: pendingData.role,
      emailVerified: true,
      authProvider: "CREDENTIAL",
    },
  });

  await redisClient.del([otpKey, dataKey]);

  const jwtPayload = {
    userId: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  const { password: _, githubToken: _gh, ...userData } = newUser;
  return { user: userData, accessToken, refreshToken };
};

const loginUser = async (payload: ILoginUserPayload) => {
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password.");
  }

  if (user.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account has been blocked.");
  }

  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(httpStatus.FORBIDDEN, "Account no longer exists.");
  }

  if (!user.password && user.githubId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This account was created with GitHub. Please log in using GitHub.",
    );
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password as string);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password.");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  const { password: _, githubToken: _gh, ...userData } = user;
  return { user: userData, accessToken, refreshToken };
};

const githubAuthCallback = async (payload: IGithubAuthPayload) => {
  const ghAccessToken = await githubAuth.getGithubAccessToken(payload.code);
  const ghProfile = await githubAuth.getGithubUserProfile(ghAccessToken);

  let user = await prisma.user.findFirst({
    where: {
      OR: [{ githubId: ghProfile.id }, { email: ghProfile.email }],
    },
  });

  if (user) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        githubId: user.githubId || ghProfile.id,
        githubToken: ghAccessToken,
        imageUrl: user.imageUrl || ghProfile.avatarUrl,
      },
    });

    if (user.status === "BLOCKED") {
      throw new AppError(httpStatus.FORBIDDEN, "Your account has been blocked.");
    }
    if (user.isDeleted || user.status === "DELETED") {
      throw new AppError(httpStatus.FORBIDDEN, "Account no longer exists.");
    }
  } else {
    user = await prisma.user.create({
      data: {
        name: ghProfile.name,
        email: ghProfile.email,
        githubId: ghProfile.id,
        githubToken: ghAccessToken,
        imageUrl: ghProfile.avatarUrl,
        authProvider: "GITHUB",
        emailVerified: true,
        role: payload.role || "CANDIDATE",
      },
    });
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  const { password: _, githubToken: _gh, ...userData } = user;
  return { user: userData, accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing.");
  }

  const verified = jwtUtils.verifyToken(token, config.jwt_refresh_secret);
  if (!verified.success || !verified.data) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired refresh token.");
  }

  const { userId } = verified.data;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.status !== "ACTIVE" || user.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User account is inactive or not found.");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );
  const newRefreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  return { accessToken, refreshToken: newRefreshToken };
};

const forgotPassword = async (payload: IForgotPasswordPayload) => {
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.isDeleted || user.status === "BLOCKED") {
    throw new AppError(httpStatus.NOT_FOUND, "No active user found with this email.");
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpKey = `forgot-password-otp:${email}`;
  await redisClient.set(otpKey, otp, { EX: OTP_EXPIRY_SECONDS });

  const templatePath = path.join(process.cwd(), "src/app/templates/forgot-password.ejs");
  const html = await ejs.renderFile(templatePath, {
    otp,
    USER_NAME: user.name,
    APP_NAME: "TalentGraph",
    EXPIRY_MINUTES: OTP_EXPIRY_SECONDS / 60,
    CURRENT_YEAR: new Date().getFullYear(),
  });

  await transporter.sendMail({
    from: config.email_sender,
    to: email,
    subject: "Reset Your Password - OTP Code",
    html,
  });
};

const resetPassword = async (payload: IResetPasswordPayload) => {
  const email = payload.email.trim().toLowerCase();
  const otpKey = `forgot-password-otp:${email}`;
  const storedOtp = await redisClient.get(otpKey);

  if (!storedOtp || storedOtp !== payload.otp) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid or expired OTP code.");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, config.bcrypt_salt_rounds);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword, needPasswordChange: false },
  });

  await redisClient.del(otpKey);
};

const changePassword = async (requestUser: IRequestUser, payload: IChangePasswordPayload) => {
  const user = await prisma.user.findUnique({ where: { id: requestUser.userId } });

  if (!user || !user.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot change password for this account.");
  }

  const isPasswordValid = await bcrypt.compare(payload.oldPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect old password.");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, config.bcrypt_salt_rounds);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, needPasswordChange: false },
  });
};

const getMe = async (requestUser: IRequestUser) => {
  const user = await prisma.user.findUnique({
    where: { id: requestUser.userId },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User profile not found.");
  }

  const { password: _, githubToken: _gh, ...userData } = user;
  return userData;
};

export const AuthService = {
  registerUser,
  verifyEmail,
  loginUser,
  githubAuthCallback,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
};
