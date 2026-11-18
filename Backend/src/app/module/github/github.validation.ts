import { z } from "zod";

const repoItemSchema = z.object({
  repoName: z.string().trim().min(1, "Repository name is required"),
  repoUrl: z.string().trim().url("Valid repository URL is required"),
  isSelected: z.boolean(),
  stargazers: z.number().int().nonnegative().optional().default(0),
  languages: z.record(z.string(), z.any()).optional().default({}),
  dependencies: z.record(z.string(), z.any()).optional().default({}),
  lastCommitAt: z.string().optional().or(z.date().optional()),
});

const selectRepositoriesZodSchema = z
  .object({
    repositories: z
      .array(repoItemSchema)
      .min(1, "At least one repository must be selected or provided."),
  })
  .or(
    repoItemSchema.transform((item) => ({
      repositories: [item],
    })),
  );

export const GithubValidation = {
  selectRepositoriesZodSchema,
};
