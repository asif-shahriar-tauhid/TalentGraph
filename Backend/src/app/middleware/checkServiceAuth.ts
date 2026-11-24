import crypto from "crypto";
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../config";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export const checkServiceAuth = () => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const providedToken =
      (req.headers["x-service-token"] as string | undefined) ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : undefined);

    if (!providedToken || !config.service_api_key) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Missing service authentication token.",
      );
    }

    const expectedBuf = Buffer.from(config.service_api_key);
    const providedBuf = Buffer.from(providedToken);

    if (
      expectedBuf.length !== providedBuf.length ||
      !crypto.timingSafeEqual(expectedBuf, providedBuf)
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Forbidden: Invalid service authentication token.",
      );
    }

    next();
  });
};
