import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateSubRecruiterPayload,
  DeleteMyAccountPayload,
  PersonalDataExport,
  UpdateAssessmentBanPayload,
  UpdateProfilePayload,
  UpdateUserStatusPayload,
  User,
  UserFilterParams,
} from "@/types";

export const uploadProfileImage = async (
  file: File,
): Promise<ApiResponse<User>> => {
  const formData = new FormData();
  formData.append("profileImage", file);
  return apiClient("/users/profile-image", {
    method: "PATCH",
    body: formData,
  });
};

export const deleteProfileImage = async (): Promise<ApiResponse<User>> => {
  return apiClient("/users/profile-image", {
    method: "DELETE",
  });
};

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<ApiResponse<User>> => {
  return apiClient("/users/profile", {
    method: "PATCH",
    body: payload,
  });
};

export const getMyPersonalData = async (): Promise<
  ApiResponse<PersonalDataExport>
> => {
  return apiClient("/users/me/data", {
    method: "GET",
  });
};

export const deleteMyAccount = async (
  payload?: DeleteMyAccountPayload,
): Promise<ApiResponse<{ id: string; status: string; deletedAt: string }>> => {
  return apiClient("/users/me", {
    method: "DELETE",
    body: payload ?? {},
  });
};

export const createSubRecruiter = async (
  payload: CreateSubRecruiterPayload,
): Promise<ApiResponse<User>> => {
  return apiClient("/users/sub-recruiters", {
    method: "POST",
    body: payload,
  });
};

export const getMySubRecruiters = async (): Promise<ApiResponse<User[]>> => {
  return apiClient("/users/sub-recruiters", {
    method: "GET",
  });
};

export const removeSubRecruiter = async (
  subRecruiterId: string,
): Promise<ApiResponse<User>> => {
  return apiClient(`/users/sub-recruiters/${encodeURIComponent(subRecruiterId)}`, {
    method: "DELETE",
  });
};

export const getAllUsers = async (
  filters?: UserFilterParams,
): Promise<ApiResponse<User[]>> => {
  const query: Record<string, string | number> = {};
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== "") {
        query[key] = value as string | number;
      }
    }
  }
  return apiClient("/users", {
    method: "GET",
    query,
  });
};

export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  return apiClient(`/users/${encodeURIComponent(id)}`, {
    method: "GET",
  });
};

export const updateUserStatus = async (
  id: string,
  payload: UpdateUserStatusPayload,
): Promise<ApiResponse<User>> => {
  return apiClient(`/users/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: payload,
  });
};

export const updateAssessmentBan = async (
  id: string,
  payload: UpdateAssessmentBanPayload,
): Promise<ApiResponse<User>> => {
  return apiClient(`/users/${encodeURIComponent(id)}/assessment-ban`, {
    method: "PATCH",
    body: payload,
  });
};

export const softDeleteUserByAdmin = async (
  id: string,
): Promise<ApiResponse<User>> => {
  return apiClient(`/users/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};

export const restoreUserByAdmin = async (
  id: string,
): Promise<ApiResponse<User>> => {
  return apiClient(`/users/${encodeURIComponent(id)}/restore`, {
    method: "PATCH",
  });
};
