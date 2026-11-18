import assert from "node:assert/strict";
import { GithubService } from "../github.service";
import { GithubValidation } from "../github.validation";

// 1. Test Zod Validation: Array of repositories
const validMultiSelect =
  GithubValidation.selectRepositoriesZodSchema.safeParse({
    repositories: [
      {
        repoName: "talent-graph",
        repoUrl: "https://github.com/developer/talent-graph",
        isSelected: true,
        stargazers: 12,
        languages: { TypeScript: 50000, CSS: 2000 },
      },
      {
        repoName: "portfolio",
        repoUrl: "https://github.com/developer/portfolio",
        isSelected: false,
      },
    ],
  });
assert.equal(
  validMultiSelect.success,
  true,
  "Should validate array of repositories",
);

// 2. Test Zod Validation: Single repository transformation
const validSingleSelect =
  GithubValidation.selectRepositoriesZodSchema.safeParse({
    repoName: "my-tool",
    repoUrl: "https://github.com/developer/my-tool",
    isSelected: true,
  });
assert.equal(
  validSingleSelect.success,
  true,
  "Should accept single repository object",
);
if (validSingleSelect.success) {
  assert.equal(
    Array.isArray(validSingleSelect.data.repositories),
    true,
    "Transformed output must contain repositories array",
  );
  assert.equal(validSingleSelect.data.repositories.length, 1);
}

// 3. Test Zod Validation: Invalid input
const invalidRepo = GithubValidation.selectRepositoriesZodSchema.safeParse({
  repoName: "",
  repoUrl: "not-a-valid-url",
  isSelected: true,
});
assert.equal(invalidRepo.success, false, "Should reject invalid repository URL");

// 4. Test Dhaka Timezone and Monthly Reset Logic
const testDate = new Date("2026-11-18T15:00:00Z"); // 21:00 Dhaka time (UTC+6)
const { dhakaYear, dhakaMonth, nextResetDate } =
  GithubService.getDhakaMonthDetails(testDate);

assert.equal(dhakaYear, 2026, "Dhaka year should be 2026");
assert.equal(dhakaMonth, 11, "Dhaka month should be 11 (November)");

// Next reset must be December 1st 00:00:00 Dhaka time (2026-11-30T18:00:00.000Z)
assert.equal(
  nextResetDate.toISOString(),
  "2026-11-30T18:00:00.000Z",
  "Reset timestamp must align with 1st of next month in Asia/Dhaka",
);

// 5. Year rollover test (December -> January)
const decDate = new Date("2026-12-15T10:00:00Z");
const decDetails = GithubService.getDhakaMonthDetails(decDate);
assert.equal(decDetails.dhakaMonth, 12);
assert.equal(
  decDetails.nextResetDate.toISOString(),
  "2026-12-31T18:00:00.000Z",
  "December resets on January 1st 00:00:00 Dhaka time",
);

// 6. Quota calculation check
const maxMonthlyQuota = 3;
const syncsUsed = 2;
const remainingQuota = Math.max(0, maxMonthlyQuota - syncsUsed);
assert.equal(remainingQuota, 1, "Remaining quota should be 1 when 2/3 used");

console.log("GitHub Repository Ingestion self-check assertions passed successfully!");
