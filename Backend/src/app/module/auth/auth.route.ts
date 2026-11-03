import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.RegisterZodSchema),
  AuthController.registerUser,
);

router.post(
  "/verify-email",
  validateRequest(AuthValidation.VerifyEmailZodSchema),
  AuthController.verifyEmail,
);

router.post(
  "/login",
  validateRequest(AuthValidation.LoginZodSchema),
  AuthController.loginUser,
);

router.get("/github/url", AuthController.getGithubAuthUrl);

router.get("/github/callback", AuthController.githubAuthRedirectCallback);

router.post(
  "/github",
  validateRequest(AuthValidation.GithubAuthZodSchema),
  AuthController.githubAuthCallback,
);

router.post(
  "/github/connect",
  auth("CANDIDATE"),
  validateRequest(AuthValidation.ConnectGithubZodSchema),
  AuthController.connectGithubAccount,
);

router.delete(
  "/github/disconnect",
  auth("CANDIDATE"),
  AuthController.disconnectGithubAccount,
);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/forgot-password",
  validateRequest(AuthValidation.ForgotPasswordZodSchema),
  AuthController.forgotPassword,
);

router.post(
  "/reset-password",
  validateRequest(AuthValidation.ResetPasswordZodSchema),
  AuthController.resetPassword,
);

router.post(
  "/change-password",
  auth(),
  validateRequest(AuthValidation.ChangePasswordZodSchema),
  AuthController.changePassword,
);

router.post("/logout", AuthController.logout);

router.get("/me", auth(), AuthController.getMe);

export const AuthRoutes = router;
