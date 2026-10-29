import { ofetch } from "ofetch";
import { getClientAuthToken } from "./authUtils";

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

const apiClient = ofetch.create({
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

export default apiClient;
