import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Password must include at least one special character.");

const RegisterZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Invalid email address format"),
  password: passwordSchema,
  role: z.enum(["RECRUITER", "SUB_RECRUITER", "CANDIDATE"]).optional(),
});

const VerifyEmailZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

const LoginZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const GithubAuthZodSchema = z.object({
  code: z.string().min(1, "Authorization code is required"),
  role: z.enum(["RECRUITER", "SUB_RECRUITER", "CANDIDATE"]).optional(),
});

const ForgotPasswordZodSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ResetPasswordZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: passwordSchema,
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

const ChangePasswordZodSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: passwordSchema,
});

export const AuthValidation = {
  RegisterZodSchema,
  VerifyEmailZodSchema,
  LoginZodSchema,
  GithubAuthZodSchema,
  ForgotPasswordZodSchema,
  ResetPasswordZodSchema,
  ChangePasswordZodSchema,
};
