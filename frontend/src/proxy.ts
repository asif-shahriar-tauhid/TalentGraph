import { type NextRequest, NextResponse } from "next/server";
import {
  decodeJwtPayload,
  getRoleDashboardUrl,
  resolvePostAuthUrl,
} from "@/lib/authUtils";

const AUTH_PAGES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/account-verify",
];

const ROLE_PREFIX_MAP: Array<{ prefix: string; roles: string[] }> = [
  { prefix: "/candidate", roles: ["CANDIDATE"] },
  { prefix: "/recruiter", roles: ["RECRUITER", "SUB_RECRUITER"] },
  { prefix: "/admin", roles: ["SYSTEM_ADMIN", "ADMIN"] },
];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const decoded = decodeJwtPayload(token);

  const isExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : false;
  const validRole = !isExpired && decoded?.role ? decoded.role : null;
  const isAuthenticated = Boolean(validRole);

  const isAuthPage = AUTH_PAGES.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`),
  );

  // 1. Authenticated users visiting auth pages are redirected to their dashboard
  if (isAuthPage && isAuthenticated && validRole) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const targetUrl = resolvePostAuthUrl({
      userRole: validRole,
      redirectUrl: redirectParam,
    });
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // 2. Role-based prefix protection
  for (const { prefix, roles } of ROLE_PREFIX_MAP) {
    if (pathname.startsWith(prefix)) {
      if (!isAuthenticated || !validRole) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", `${pathname}${search}`);
        return NextResponse.redirect(loginUrl);
      }

      const roleMatches = roles.includes(validRole.toUpperCase());
      if (!roleMatches) {
        const properUrl = getRoleDashboardUrl(validRole);
        return NextResponse.redirect(new URL(properUrl, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const middleware = proxy;
export default proxy;

export const config = {
  matcher: [
    "/candidate/:path*",
    "/recruiter/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/account-verify",
  ],
};
