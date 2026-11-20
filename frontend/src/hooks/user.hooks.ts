import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubRecruiter,
  deleteMyAccount,
  deleteProfileImage,
  getAllUsers,
  getMyPersonalData,
  getMySubRecruiters,
  getUserById,
  removeSubRecruiter,
  restoreUserByAdmin,
  softDeleteUserByAdmin,
  updateAssessmentBan,
  updateProfile,
  updateUserStatus,
  uploadProfileImage,
} from "@/api/user.api";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { clearClientAuthCookie } from "@/lib/authUtils";
import type {
  CreateSubRecruiterPayload,
  DeleteMyAccountPayload,
  UpdateAssessmentBanPayload,
  UpdateProfilePayload,
  UpdateUserStatusPayload,
  UserFilterParams,
} from "@/types";

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      gooeyToast.success("Avatar Updated", {
        description: response.message || "Profile image updated successfully.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Upload Failed", {
        description:
          err?.data?.message || err?.message || "Could not upload image.",
      });
    },
  });
};

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProfileImage(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      gooeyToast.success("Avatar Removed", {
        description: response.message || "Profile image removed.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Remove Failed", {
        description:
          err?.data?.message || err?.message || "Could not remove image.",
      });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      gooeyToast.success("Profile Saved", {
        description: response.message || "Your profile name has been updated.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Update Failed", {
        description:
          err?.data?.message || err?.message || "Could not update profile.",
      });
    },
  });
};

export const useGetMyPersonalData = (enabled = true) => {
  return useQuery({
    queryKey: ["my-personal-data"],
    queryFn: () => getMyPersonalData(),
    enabled,
  });
};

export const useDeleteMyAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: DeleteMyAccountPayload) => deleteMyAccount(payload),
    onSuccess: (response) => {
      clearClientAuthCookie();
      queryClient.clear();
      gooeyToast.success("Account Deleted", {
        description:
          response.message || "Your account has been permanently deactivated.",
      });
      if (typeof window !== "undefined") {
        window.location.assign("/login");
      }
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Deletion Failed", {
        description:
          err?.data?.message || err?.message || "Could not delete account.",
      });
    },
  });
};

export const useGetMySubRecruiters = (enabled = true) => {
  return useQuery({
    queryKey: ["sub-recruiters"],
    queryFn: () => getMySubRecruiters(),
    enabled,
    retry: false,
  });
};

export const useCreateSubRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubRecruiterPayload) =>
      createSubRecruiter(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["sub-recruiters"] });
      gooeyToast.success("Sub-Recruiter Invited", {
        description:
          response.message || "Sub-recruiter account provisioned successfully.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Invitation Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not provision sub-recruiter account.",
      });
    },
  });
};

export const useRemoveSubRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subRecruiterId: string) => removeSubRecruiter(subRecruiterId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["sub-recruiters"] });
      gooeyToast.success("Sub-Recruiter Removed", {
        description:
          response.message || "Sub-recruiter removed from your company.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Removal Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not remove sub-recruiter.",
      });
    },
  });
};

export const useGetAllUsers = (filters?: UserFilterParams, enabled = true) => {
  return useQuery({
    queryKey: ["admin-users", filters ?? {}],
    queryFn: () => getAllUsers(filters),
    enabled,
  });
};

export const useGetUserById = (id?: string | null) => {
  return useQuery({
    queryKey: ["admin-user", id],
    queryFn: () => getUserById(id!),
    enabled: Boolean(id),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateUserStatusPayload;
    }) => updateUserStatus(id, payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-user", variables.id],
      });
      gooeyToast.success("Account Updated", {
        description:
          response.message || "User governance status updated successfully.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Update Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not update user status or role.",
      });
    },
  });
};

export const useUpdateAssessmentBan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAssessmentBanPayload;
    }) => updateAssessmentBan(id, payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-user", variables.id],
      });
      gooeyToast.success("Assessment Standing Updated", {
        description:
          response.message ||
          "Candidate assessment ban status updated with audit log.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Action Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not update assessment ban status.",
      });
    },
  });
};

export const useSoftDeleteUserByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => softDeleteUserByAdmin(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
      gooeyToast.success("Account Deactivated", {
        description: response.message || "User account soft-deleted.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Delete Failed", {
        description:
          err?.data?.message || err?.message || "Could not soft-delete user.",
      });
    },
  });
};

export const useRestoreUserByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restoreUserByAdmin(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
      gooeyToast.success("Account Restored", {
        description: response.message || "User account restored to ACTIVE.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Restore Failed", {
        description:
          err?.data?.message || err?.message || "Could not restore user.",
      });
    },
  });
};
