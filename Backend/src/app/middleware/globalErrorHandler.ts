import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";
import config from "../config";
import { AppError } from "../utils/AppError";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = err.message || "Internal Server Error";
  let errorSources: Array<{ path: string | number; message: string }> = [];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
    errorSources = err.issues.map((issue) => ({
      path: String(issue.path[issue.path.length - 1] ?? ""),
      message: issue.message,
    }));
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Incorrect field types or missing required fields in database query.";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.CONFLICT;
      const target = (err.meta?.target as string[]) || [];
      message = `Duplicate key error: Field (${target.join(", ")}) already exists.`;
    } else if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST;
      message = "Foreign key constraint failed.";
    } else if (err.code === "P2025") {
      statusCode = httpStatus.NOT_FOUND;
      message = "Record not found.";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      message = "Database authentication failed. Please check credentials.";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus.SERVICE_UNAVAILABLE;
      message = "Cannot reach database server. Please check connectivity.";
    }
  } else if (err?.name === "JsonWebTokenError") {
    statusCode = httpStatus.UNAUTHORIZED;
    message = "Invalid token. Please authenticate.";
  } else if (err?.name === "TokenExpiredError") {
    statusCode = httpStatus.UNAUTHORIZED;
    message = "Token has expired. Please log in again.";
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSources: errorSources.length > 0 ? errorSources : undefined,
    stack: config.node_env === "development" ? err.stack : undefined,
    error: config.node_env === "development" ? err : undefined,
  });
};
