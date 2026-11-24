import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { GithubService } from "./github.service";

const getPublicRepositories = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const result = await GithubService.getPublicRepositories(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Public GitHub repositories retrieved successfully.",
      data: result,
    });
  },
);

const selectRepositories = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await GithubService.selectRepositories(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Repository selections updated successfully.",
    data: result,
  });
});

const syncRepositories = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await GithubService.syncRepositories(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GitHub repository sync initiated.",
    data: result,
  });
});

const getSyncStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const result = await GithubService.getSyncStatus(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GitHub repository sync status retrieved successfully.",
    data: result,
  });
});

export const GithubController = {
  getPublicRepositories,
  selectRepositories,
  syncRepositories,
  getSyncStatus,
};
