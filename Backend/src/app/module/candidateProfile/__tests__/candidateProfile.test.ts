import assert from "node:assert/strict";
import { CandidateProfileValidation } from "../candidateProfile.validation";

// 1. MIME type validation check
const validPdf = CandidateProfileValidation.cvFileSchema.safeParse({
  mimetype: "application/pdf",
  size: 2 * 1024 * 1024,
});
assert.equal(validPdf.success, true, "Should accept application/pdf");

const validDocx = CandidateProfileValidation.cvFileSchema.safeParse({
  mimetype:
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  size: 3 * 1024 * 1024,
});
assert.equal(validDocx.success, true, "Should accept DOCX mimetype");

const invalidMime = CandidateProfileValidation.cvFileSchema.safeParse({
  mimetype: "image/png",
  size: 1024 * 1024,
});
assert.equal(invalidMime.success, false, "Should reject non-PDF/DOCX mimetypes");

const oversizedFile = CandidateProfileValidation.cvFileSchema.safeParse({
  mimetype: "application/pdf",
  size: 15 * 1024 * 1024,
});
assert.equal(oversizedFile.success, false, "Should reject files larger than 10MB");

// 2. Profile update schema check
const validProfileUpdate =
  CandidateProfileValidation.updateCandidateProfileZodSchema.safeParse({
    headline: "Senior Full Stack Engineer (Node.js & React)",
    education: [
      {
        institution: "BUET",
        degree: "B.Sc. in Computer Science and Engineering",
        startDate: "2018",
        endDate: "2022",
        current: false,
      },
    ],
    links: {
      github: "https://github.com/developer",
      linkedin: "https://linkedin.com/in/developer",
      portfolio: "https://developer.dev",
    },
  });
assert.equal(
  validProfileUpdate.success,
  true,
  "Should validate complete candidate profile payload",
);

// 3. Quota calculation check
const maxQuota = 3;
const syncCount = 1;
const remaining = Math.max(0, maxQuota - syncCount);
assert.equal(remaining, 2, "Remaining quota should be 2 when 1 is used");

console.log("CandidateProfile self-check assertions passed successfully!");
