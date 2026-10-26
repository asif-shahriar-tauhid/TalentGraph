import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization);

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not logged in. Please log in to access this resource.",
      );
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success || !verifiedToken.data) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired access token.");
    }

    const { userId } = verifiedToken.data as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User account does not exist.");
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Forbidden: You do not have permission to access this resource.",
      );
    }

    if (user.status === "BLOCKED") {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Your account has been blocked. Please contact support.",
      );
    }

    if (user.isDeleted || user.status === "DELETED") {
      throw new AppError(httpStatus.FORBIDDEN, "This account has been deleted.");
    }

    req.user = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  });
};
