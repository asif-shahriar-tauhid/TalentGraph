import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CandidateProfileService } from "./candidateProfile.service";
import { CandidateProfileValidation } from "./candidateProfile.validation";

const getCandidateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await CandidateProfileService.getCandidateProfile(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Candidate profile retrieved successfully.",
    data: result,
  });
});

const updateCandidateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await CandidateProfileService.updateCandidateProfile(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Candidate profile updated successfully.",
    data: result,
  });
});

const uploadCV = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please select a CV document to upload.");
  }

  const parseResult = CandidateProfileValidation.cvFileSchema.safeParse({
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  if (!parseResult.success) {
    const errorMessage =
      parseResult.error.issues[0]?.message || "Invalid CV file.";
    throw new AppError(httpStatus.BAD_REQUEST, errorMessage);
  }

  const userId = req.user!.userId;
  const result = await CandidateProfileService.uploadCV(userId, req.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "CV uploaded successfully. Parsing job queued.",
    data: result,
  });
});

const getCVStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await CandidateProfileService.getCVStatus(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CV parsing status retrieved successfully.",
    data: result,
  });
});

const getParsedCV = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await CandidateProfileService.getParsedCV(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parsed CV data retrieved successfully.",
    data: result,
  });
});

export const CandidateProfileController = {
  getCandidateProfile,
  updateCandidateProfile,
  uploadCV,
  getCVStatus,
  getParsedCV,
};
