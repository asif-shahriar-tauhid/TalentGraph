import { z } from "zod";

const updateProfileZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .optional(),
});

const updateUserStatusZodSchema = z
  .object({
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]).optional(),
    role: z.enum(["RECRUITER", "SUB_RECRUITER", "CANDIDATE"]).optional(),
  })
  .refine((data) => data.status !== undefined || data.role !== undefined, {
    message: "At least one of 'status' or 'role' must be provided.",
  });

const updateAssessmentBanZodSchema = z.object({
  isAssessmentBanned: z.boolean(),
  reason: z
    .string()
    .trim()
    .min(5, "Audit reason must be at least 5 characters")
    .max(500, "Audit reason cannot exceed 500 characters"),
});

const createSubRecruiterZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters"),
  email: z.string().trim().email("Invalid email address"),
  temporaryPassword: z
    .string()
    .min(8, "Temporary password must be at least 8 characters")
    .max(64, "Temporary password cannot exceed 64 characters"),
});

const deleteMyAccountZodSchema = z.object({
  reason: z
    .string()
    .trim()
    .max(500, "Reason cannot exceed 500 characters")
    .optional(),
});

export const UserValidation = {
  updateProfileZodSchema,
  updateUserStatusZodSchema,
  updateAssessmentBanZodSchema,
  createSubRecruiterZodSchema,
  deleteMyAccountZodSchema,
};
