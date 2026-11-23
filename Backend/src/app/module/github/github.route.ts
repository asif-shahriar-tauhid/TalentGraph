import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { GithubController } from "./github.controller";
import { GithubValidation } from "./github.validation";

const router = Router();

router.get("/repos", auth("CANDIDATE"), GithubController.getPublicRepositories);

router.post(
  "/repos/select",
  auth("CANDIDATE"),
  validateRequest(GithubValidation.selectRepositoriesZodSchema),
  GithubController.selectRepositories,
);

router.post("/sync", auth("CANDIDATE"), GithubController.syncRepositories);

router.get("/sync/status", auth("CANDIDATE"), GithubController.getSyncStatus);

export const GithubRoutes = router;
