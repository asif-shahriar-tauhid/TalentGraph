import { z } from "zod";

export const ALLOWED_CV_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const cvFileSchema = z.object({
  mimetype: z.string().refine(
    (type) => (ALLOWED_CV_MIME_TYPES as readonly string[]).includes(type),
    {
      message:
        "Invalid file format. Only PDF (.pdf) and DOCX (.docx) documents are allowed.",
    },
  ),
  size: z
    .number()
    .max(10 * 1024 * 1024, "CV file size cannot exceed 10MB (10,485,760 bytes)."),
});

const educationItemSchema = z
  .object({
    institution: z.string().trim().min(1, "Institution name is required"),
    degree: z.string().trim().optional(),
    fieldOfStudy: z.string().trim().optional(),
    startDate: z.string().trim().optional(),
    endDate: z.string().trim().optional(),
    current: z.boolean().optional(),
    description: z.string().trim().max(1000).optional(),
  })
  .passthrough();

const updateCandidateProfileZodSchema = z.object({
  headline: z
    .string()
    .trim()
    .max(250, "Headline cannot exceed 250 characters")
    .optional(),
  education: z.array(educationItemSchema).optional(),
  links: z.record(z.string(), z.string().trim()).optional(),
});

export const CandidateProfileValidation = {
  ALLOWED_CV_MIME_TYPES,
  cvFileSchema,
  updateCandidateProfileZodSchema,
};
