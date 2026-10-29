import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  forgotPassword,
  getMe,
  githubAuth,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "@/api/auth.api";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { clearClientAuthCookie, syncClientAuthCookie } from "@/lib/authUtils";
import type {
  GithubAuthPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/types";

export const useGetME = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (response) => {
      if (response?.data?.accessToken) {
        syncClientAuthCookie(response.data.accessToken);
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      gooeyToast.success("Welcome back!", {
        description: response.message || "Successfully authenticated.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Authentication Failed", {
        description:
          err?.data?.message || err?.message || "Invalid credentials provided.",
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (response) => {
      gooeyToast.success("Verification Code Sent", {
        description:
          response.message ||
          "Please check your email for the 6-digit verification code.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Registration Failed", {
        description:
          err?.data?.message || err?.message || "Unable to register account.",
      });
    },
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyEmailPayload) => verifyEmail(payload),
    onSuccess: (response) => {
      if (response?.data?.accessToken) {
        syncClientAuthCookie(response.data.accessToken);
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      gooeyToast.success("Account Verified!", {
        description: response.message || "Welcome to TalentGraph.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Verification Failed", {
        description:
          err?.data?.message || err?.message || "Invalid or expired OTP code.",
      });
    },
  });
};

export const useGithubAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GithubAuthPayload) => githubAuth(payload),
    onSuccess: (response) => {
      if (response?.data?.accessToken) {
        syncClientAuthCookie(response.data.accessToken);
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      gooeyToast.success("GitHub Connected", {
        description: response.message || "Authentication successful.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("GitHub Auth Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not authenticate with GitHub.",
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearClientAuthCookie();
      queryClient.clear();
      gooeyToast.success("Signed Out", {
        description: "You have been logged out securely.",
      });
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
    onError: () => {
      clearClientAuthCookie();
      queryClient.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: (response) => {
      gooeyToast.success("Reset Code Sent", {
        description:
          response.message || "If this account exists, an OTP was dispatched.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Request Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Could not process password reset request.",
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: (response) => {
      gooeyToast.success("Password Updated", {
        description:
          response.message || "Your password was successfully reset. You may now log in.",
      });
    },
    onError: (error: unknown) => {
      const err = error as { data?: { message?: string }; message?: string };
      gooeyToast.error("Reset Failed", {
        description:
          err?.data?.message ||
          err?.message ||
          "Invalid code or password requirements not met.",
      });
    },
  });
};
