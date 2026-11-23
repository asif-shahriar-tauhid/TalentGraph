import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCandidateCVStatus,
  getCandidateParsedCV,
  getCandidateProfile,
  getGithubPublicRepos,
  getGithubSyncStatus,
  selectGithubRepositories,
  syncGithubRepositories,
  updateCandidateProfile,
  uploadCandidateCV,
} from "@/api/candidate.api";
import { gooeyToast } from "@/components/ui/goey-toaster";
import type {
  SelectRepositoriesPayload,
  UpdateCandidateProfilePayload,
} from "@/types";

export const useCandidateProfile = (enabled = true) => {
  return useQuery({
    queryKey: ["candidate-profile"],
    queryFn: () => getCandidateProfile(),
    enabled,
  });
};

export const useUpdateCandidateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCandidateProfilePayload) =>
      updateCandidateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      gooeyToast.success("Profile Updated", {
        description:
          response.message || "Your candidate profile changes have been saved.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Update Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not update candidate profile.",
      });
    },
  });
};

export const useUploadCandidateCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadCandidateCV(file),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-cv-status"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-cv-parsed"] });
      gooeyToast.success("CV Uploaded", {
        description:
          response.message || "Your CV was uploaded and queued for parsing.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("CV Upload Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Only PDF and DOCX files up to 10MB are allowed.",
      });
    },
  });
};

export const useCandidateCVStatus = (enabled = true) => {
  return useQuery({
    queryKey: ["candidate-cv-status"],
    queryFn: () => getCandidateCVStatus(),
    enabled,
    retry: false,
  });
};

export const useCandidateParsedCV = (enabled = false) => {
  return useQuery({
    queryKey: ["candidate-cv-parsed"],
    queryFn: () => getCandidateParsedCV(),
    enabled,
    retry: false,
  });
};

export const useGithubPublicRepos = (enabled = true) => {
  return useQuery({
    queryKey: ["github-repos"],
    queryFn: () => getGithubPublicRepos(),
    enabled,
  });
};

export const useSelectGithubRepos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SelectRepositoriesPayload) =>
      selectGithubRepositories(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["github-repos"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      gooeyToast.success("Repositories Updated", {
        description:
          response.message ||
          "Selected repositories saved for evidence ingestion.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Selection Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not save repository selection.",
      });
    },
  });
};

export const useSyncGithubRepos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => syncGithubRepositories(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["github-sync-status"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      queryClient.invalidateQueries({ queryKey: ["github-repos"] });
      gooeyToast.success("GitHub Sync Initiated", {
        description:
          response?.data?.message ||
          response.message ||
          "Repository evidence extraction queued.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Sync Blocked", {
        description:
          err?.data?.message ||
          err?.message ||
          "Select at least one repository or check your monthly sync quota.",
      });
    },
  });
};

export const useGithubSyncStatus = (enabled = true) => {
  return useQuery({
    queryKey: ["github-sync-status"],
    queryFn: () => getGithubSyncStatus(),
    enabled,
  });
};
