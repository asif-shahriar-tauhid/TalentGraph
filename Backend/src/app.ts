import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { CandidateProfileRoutes } from "./app/module/candidateProfile/candidateProfile.route";
import { GithubRoutes } from "./app/module/github/github.route";
import { UserRoutes } from "./app/module/user/user.route";

const app: Application = express();

const allowedOrigins = new Set(
  [
    ...config.frontend_url.split(",").map((url) => url.trim().replace(/\/+$/, "")),
    ...(config.node_env !== "production"
      ? ["http://localhost:3000", "http://127.0.0.1:3000"]
      : []),
  ].filter(Boolean),
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      const normalizedOrigin = origin.replace(/\/+$/, "");
      if (allowedOrigins.has(normalizedOrigin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/", (_req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "TalentGraph Backend is healthy and running.",
  });
});

// Application Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/candidate", CandidateProfileRoutes);
app.use("/api/v1/candidate/github", GithubRoutes);

// Error Handling Middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
