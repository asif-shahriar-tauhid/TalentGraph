import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (zodSchema: ZodTypeAny) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await zodSchema.safeParseAsync(req.body ?? {});

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;
    next();
  });
};
