import { z } from "zod";

const updateProfileZodSchema = z.object({
  name: z.string().min(2).max(60).optional(),
});

const updateUserStatusZodSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]).optional(),
  role: z.enum(["SYSTEM_ADMIN", "RECRUITER", "SUB_RECRUITER", "CANDIDATE"]).optional(),
});

export const UserValidation = {
  updateProfileZodSchema,
  updateUserStatusZodSchema,
};
