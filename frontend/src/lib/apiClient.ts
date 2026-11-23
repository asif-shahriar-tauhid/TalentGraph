import { type FetchOptions, type FetchRequest, ofetch } from "ofetch";
import {
  clearClientAuthCookie,
  getClientAuthToken,
  syncClientAuthCookie,
} from "./authUtils";

const getBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    // In production, route via relative "/api/v1" to leverage Next.js rewrites
    if (!isLocalhost) {
      if (
        !envUrl ||
        envUrl.includes("localhost") ||
        envUrl.includes("127.0.0.1") ||
        envUrl === "/api/v1"
      ) {
        return "/api/v1";
      }
    }
  }

  const raw = envUrl || "http://localhost:5000/api/v1";
  const clean = raw.replace(/\/+$/, "");
  return clean.endsWith("/api/v1") ? clean : `${clean}/api/v1`;
};

let refreshPromise: Promise<string | null> | null = null;

async function attemptTokenRefresh(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await ofetch<{
        success: boolean;
        data?: { accessToken?: string; refreshToken?: string };
      }>(`${getBaseUrl()}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      const newAccessToken = res?.data?.accessToken ?? null;
      if (newAccessToken) {
        syncClientAuthCookie(newAccessToken);
      }
      return newAccessToken;
    } catch {
      clearClientAuthCookie();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

const rawClient = ofetch.create({
  baseURL: getBaseUrl(),
  credentials: "include",
  onRequest({ options }) {
    const token = getClientAuthToken();
    if (token) {
      const headers = new Headers(options.headers);
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      options.headers = headers;
    }
  },
});

const apiClient = async <T = unknown>(
  request: FetchRequest,
  options?: FetchOptions<"json">,
): Promise<T> => {
  try {
    return await rawClient<T>(request, options);
  } catch (error: unknown) {
    const errObj = error as { status?: number; statusCode?: number };
    const status = errObj?.status ?? errObj?.statusCode;
    const reqStr = typeof request === "string" ? request : "";
    const isAuthEndpoint =
      reqStr.includes("/auth/login") ||
      reqStr.includes("/auth/register") ||
      reqStr.includes("/auth/refresh-token") ||
      reqStr.includes("/auth/verify-email");

    if (status === 401 && !isAuthEndpoint && typeof window !== "undefined") {
      const newAccessToken = await attemptTokenRefresh();
      if (newAccessToken) {
        const retryHeaders = new Headers(options?.headers);
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
        return await rawClient<T>(request, {
          ...options,
          headers: retryHeaders,
        });
      }
    }
    throw error;
  }
};

export default apiClient;
