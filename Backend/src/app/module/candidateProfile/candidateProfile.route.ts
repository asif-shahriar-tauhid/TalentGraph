import { Router } from "express";
import { upload } from "../../lib/multer";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { CandidateProfileController } from "./candidateProfile.controller";
import { CandidateProfileValidation } from "./candidateProfile.validation";

const router = Router();

router.get(
  "/profile",
  auth("CANDIDATE"),
  CandidateProfileController.getCandidateProfile,
);

router.patch(
  "/profile",
  auth("CANDIDATE"),
  validateRequest(CandidateProfileValidation.updateCandidateProfileZodSchema),
  CandidateProfileController.updateCandidateProfile,
);

router.post(
  "/cv/upload",
  auth("CANDIDATE"),
  upload.single("cv"),
  CandidateProfileController.uploadCV,
);

router.get(
  "/cv/status",
  auth("CANDIDATE"),
  CandidateProfileController.getCVStatus,
);

router.get(
  "/cv/parsed",
  auth("CANDIDATE"),
  CandidateProfileController.getParsedCV,
);

export const CandidateProfileRoutes = router;
