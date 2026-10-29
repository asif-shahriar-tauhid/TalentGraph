import type { JWTPayload, UserRole } from "@/types/auth.types";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/account-verify",
  "/forgot-password",
  "/reset-password",
];

/**
 * Safely decodes a base64url encoded JWT payload in browser or edge environments.
 */
export function decodeJwtPayload(token?: string | null): JWTPayload | null {
  if (!token || typeof token !== "string") return null;

  try {
    let cleanToken = token.trim();
    try {
      cleanToken = decodeURIComponent(cleanToken);
    } catch {
      // Keep original if not URI-encoded
    }
    const parts = cleanToken.split(".");
    if (parts.length < 2) return null;

    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const decodedString = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );

    const parsed = JSON.parse(decodedString) as JWTPayload;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Synchronizes accessToken to document.cookie on the frontend domain so
 * Next.js proxy.ts detects the session across cross-origin deployments.
 */
export function syncClientAuthCookie(token?: string | null) {
  if (typeof document === "undefined" || !token) return;
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const secureFlag = isHttps ? "; Secure" : "";
  document.cookie = `accessToken=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax${secureFlag}`;
}

export function clearClientAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie =
    "accessToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}

export function getClientAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Maps each application role to its base portal path.
 */
export function getRoleDashboardUrl(role?: UserRole | string | null): string {
  const normalized = role?.toUpperCase();
  switch (normalized) {
    case "SYSTEM_ADMIN":
    case "ADMIN":
      return "/admin";
    case "RECRUITER":
    case "SUB_RECRUITER":
      return "/recruiter";
    case "CANDIDATE":
    default:
      return "/candidate";
  }
}

/**
 * Resolves the post-authentication redirect URL safely (prevents open redirects
 * and enforces role path boundaries).
 */
export function resolvePostAuthUrl(options: {
  accessToken?: string | null;
  userRole?: string | null;
  redirectUrl?: string | null;
}): string {
  const { accessToken, userRole, redirectUrl } = options;

  let role = userRole;
  if (!role && accessToken) {
    const decoded = decodeJwtPayload(accessToken);
    if (decoded?.role) role = decoded.role;
  }

  const defaultDashboard = getRoleDashboardUrl(role);
  if (!redirectUrl) return defaultDashboard;

  let cleanRedirect = redirectUrl.trim();
  try {
    cleanRedirect = decodeURIComponent(cleanRedirect);
  } catch {
    // preserve if malformed
  }

  if (
    cleanRedirect.startsWith("http://") ||
    cleanRedirect.startsWith("https://")
  ) {
    try {
      const parsed = new URL(cleanRedirect);
      cleanRedirect = `${parsed.pathname}${parsed.search}`;
    } catch {
      return defaultDashboard;
    }
  }

  const isSafeRelative =
    cleanRedirect.startsWith("/") &&
    !cleanRedirect.startsWith("//") &&
    !AUTH_ROUTES.some((route) => cleanRedirect.startsWith(route));

  if (!isSafeRelative) return defaultDashboard;

  const normalizedRole = role?.toUpperCase();
  if (normalizedRole === "CANDIDATE") {
    if (
      cleanRedirect.startsWith("/admin") ||
      cleanRedirect.startsWith("/recruiter")
    ) {
      return "/candidate";
    }
    return cleanRedirect;
  }

  if (normalizedRole === "RECRUITER" || normalizedRole === "SUB_RECRUITER") {
    if (cleanRedirect.startsWith("/admin")) {
      return "/recruiter";
    }
    return cleanRedirect;
  }

  return cleanRedirect;
}
