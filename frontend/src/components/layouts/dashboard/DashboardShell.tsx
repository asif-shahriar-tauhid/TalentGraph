"use client";

import { useState } from "react";
import { RoleGuard } from "@/components/common/RoleGuard";
import type { UserRole } from "@/types/auth.types";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import type { DashboardShellProps } from "./dashboard.types";

export function DashboardShell({
  userRole,
  roleTitle,
  roleBadge,
  roleBadgeClassName,
  footerNote,
  footerSecurityText,
  navGroups,
  children,
}: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Allow related sub-roles (e.g. SUB_RECRUITER for RECRUITER, ADMIN for SYSTEM_ADMIN)
  const allowedRoles: UserRole[] =
    userRole === "RECRUITER"
      ? ["RECRUITER", "SUB_RECRUITER"]
      : userRole === "ADMIN" || userRole === "SYSTEM_ADMIN"
        ? ["SYSTEM_ADMIN", "ADMIN"]
        : [userRole as UserRole];

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar
          roleTitle={roleTitle}
          roleBadge={roleBadge}
          roleBadgeClassName={roleBadgeClassName}
          navGroups={navGroups}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          footerNote={footerNote}
          footerSecurityText={footerSecurityText}
        />

        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <DashboardHeader
            roleTitle={roleTitle}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
