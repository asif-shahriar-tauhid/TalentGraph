import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { UserRoutes } from "./app/module/user/user.route";

const app: Application = express();

app.use(
  cors({
    origin: config.frontend_url,
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

// Error Handling Middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
