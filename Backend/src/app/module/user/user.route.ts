import { Router } from "express";
import { upload } from "../../lib/multer";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = Router();

router.patch(
  "/profile-image",
  auth(),
  upload.single("profileImage"),
  UserController.uploadProfileImage,
);

router.patch(
  "/profile",
  auth(),
  validateRequest(UserValidation.updateProfileZodSchema),
  UserController.updateProfile,
);

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

export const UserRoutes = router;
