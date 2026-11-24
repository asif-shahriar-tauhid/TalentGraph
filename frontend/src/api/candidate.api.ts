import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CandidateProfileResponse,
  CVParsedResponse,
  CVStatusResponse,
  CVUploadResponse,
  GitHubRepoItem,
  GitHubSyncResponse,
  GitHubSyncStatusResponse,
  SelectRepositoriesPayload,
  UpdateCandidateProfilePayload,
} from "@/types";

export const getCandidateProfile = async (): Promise<
  ApiResponse<CandidateProfileResponse>
> => {
  return apiClient("/candidate/profile", {
    method: "GET",
  });
};

export const updateCandidateProfile = async (
  payload: UpdateCandidateProfilePayload,
): Promise<ApiResponse<CandidateProfileResponse>> => {
  return apiClient("/candidate/profile", {
    method: "PATCH",
    body: payload,
  });
};

export const uploadCandidateCV = async (
  file: File,
): Promise<ApiResponse<CVUploadResponse>> => {
  const formData = new FormData();
  formData.append("cv", file);
  return apiClient("/candidate/cv/upload", {
    method: "POST",
    body: formData,
  });
};

export const getCandidateCVStatus = async (): Promise<
  ApiResponse<CVStatusResponse>
> => {
  return apiClient("/candidate/cv/status", {
    method: "GET",
  });
};

export const getCandidateParsedCV = async (): Promise<
  ApiResponse<CVParsedResponse>
> => {
  return apiClient("/candidate/cv/parsed", {
    method: "GET",
  });
};

export const getGithubPublicRepos = async (): Promise<
  ApiResponse<GitHubRepoItem[]>
> => {
  return apiClient("/candidate/github/repos", {
    method: "GET",
  });
};

export const selectGithubRepositories = async (
  payload: SelectRepositoriesPayload,
): Promise<ApiResponse<GitHubRepoItem[]>> => {
  return apiClient("/candidate/github/repos/select", {
    method: "POST",
    body: payload,
  });
};

export const syncGithubRepositories = async (): Promise<
  ApiResponse<GitHubSyncResponse>
> => {
  return apiClient("/candidate/github/sync", {
    method: "POST",
  });
};

export const getGithubSyncStatus = async (): Promise<
  ApiResponse<GitHubSyncStatusResponse>
> => {
  return apiClient("/candidate/github/sync/status", {
    method: "GET",
  });
};
