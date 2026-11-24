import { Router } from "express";
import { upload } from "../../lib/multer";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = Router();

// ─── 1. Self-Service Authenticated User Routes ───────────────────────────────
router.patch(
  "/profile-image",
  auth(),
  upload.single("profileImage"),
  UserController.uploadProfileImage,
);

router.delete(
  "/profile-image",
  auth(),
  UserController.deleteProfileImage,
);

router.patch(
  "/profile",
  auth(),
  validateRequest(UserValidation.updateProfileZodSchema),
  UserController.updateProfile,
);

router.get(
  "/me/data",
  auth(),
  UserController.getMyPersonalData,
);

router.delete(
  "/me",
  auth("CANDIDATE", "RECRUITER", "SUB_RECRUITER"),
  validateRequest(UserValidation.deleteMyAccountZodSchema),
  UserController.deleteMyAccount,
);

// ─── 2. Recruiter Sub-Recruiter Management Routes ────────────────────────────
router.post(
  "/sub-recruiters",
  auth("RECRUITER"),
  validateRequest(UserValidation.createSubRecruiterZodSchema),
  UserController.createSubRecruiter,
);

router.get(
  "/sub-recruiters",
  auth("RECRUITER"),
  UserController.getMySubRecruiters,
);

router.delete(
  "/sub-recruiters/:id",
  auth("RECRUITER"),
  UserController.removeSubRecruiter,
);

// ─── 3. System Admin User Governance Routes ──────────────────────────────────
router.get(
  "/",
  auth("SYSTEM_ADMIN"),
  UserController.getAllUsers,
);

router.get(
  "/:id",
  auth("SYSTEM_ADMIN"),
  UserController.getUserById,
);

router.patch(
  "/:id/status",
  auth("SYSTEM_ADMIN"),
  validateRequest(UserValidation.updateUserStatusZodSchema),
  UserController.updateUserStatus,
);

router.patch(
  "/:id/assessment-ban",
  auth("SYSTEM_ADMIN"),
  validateRequest(UserValidation.updateAssessmentBanZodSchema),
  UserController.updateAssessmentBan,
);

router.delete(
  "/:id",
  auth("SYSTEM_ADMIN"),
  UserController.softDeleteUserByAdmin,
);

router.patch(
  "/:id/restore",
  auth("SYSTEM_ADMIN"),
  UserController.restoreUserByAdmin,
);

export const UserRoutes = router;
