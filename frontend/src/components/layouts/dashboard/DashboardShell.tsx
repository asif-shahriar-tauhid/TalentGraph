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
  alwaysVisibleSidebar = false,
  allowDevelopmentPreview,
  companyStatus,
  companyStatusVerified,
  footerNote,
  footerSecurityText,
  navGroups,
  children,
}: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Allow related sub-roles (e.g. SUB_RECRUITER for RECRUITER, ADMIN for SYSTEM_ADMIN)
  const allowedRoles: UserRole[] =
    userRole === "RECRUITER"
      ? ["RECRUITER", "SUB_RECRUITER"]
      : userRole === "ADMIN" || userRole === "SYSTEM_ADMIN"
        ? ["SYSTEM_ADMIN", "ADMIN"]
        : [userRole as UserRole];

  const shell = (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar
        roleTitle={roleTitle}
        roleBadge={roleBadge}
        roleBadgeClassName={roleBadgeClassName}
        companyStatus={companyStatus}
        companyStatusVerified={companyStatusVerified}
        alwaysVisible={alwaysVisibleSidebar}
        navGroups={navGroups}
        isOpen={alwaysVisibleSidebar ? true : isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() =>
          setIsSidebarCollapsed((collapsed) => !collapsed)
        }
        footerNote={footerNote}
        footerSecurityText={footerSecurityText}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          roleTitle={roleTitle}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          showMobileMenu={!alwaysVisibleSidebar}
        />
        <main className="min-w-0 w-full flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <RoleGuard
      allowDevelopmentPreview={
        allowDevelopmentPreview ?? userRole === "RECRUITER"
      }
      allowedRoles={allowedRoles}
    >
      {shell}
    </RoleGuard>
  );
}
