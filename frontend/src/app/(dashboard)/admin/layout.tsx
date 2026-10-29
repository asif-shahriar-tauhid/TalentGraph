"use client";

import {
  Activity,
  Building2,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layouts/dashboard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      userRole="SYSTEM_ADMIN"
      roleTitle="System Admin Desk"
      roleBadge="Platform Owner"
      roleBadgeClassName="border-destructive/30 bg-destructive/10 text-destructive"
      footerNote="Platform Governance & Auditing"
      footerSecurityText="Security Clearance Level 4 • System Wide Logs"
      navGroups={[
        {
          title: "Governance",
          items: [
            {
              label: "Overview",
              href: "/admin",
              icon: LayoutDashboard,
              isActive: (path) => path === "/admin",
            },
            {
              label: "User Governance",
              href: "/admin/users",
              icon: Users,
              isActive: (path) => path.startsWith("/admin/users"),
            },
            {
              label: "Company Verifications",
              href: "/admin/companies",
              icon: Building2,
              isActive: (path) => path.startsWith("/admin/companies"),
            },
          ],
        },
        {
          title: "Audit & Integrity",
          items: [
            {
              label: "Integrity Logs",
              href: "/admin/integrity",
              icon: ShieldAlert,
              isActive: (path) => path.startsWith("/admin/integrity"),
            },
            {
              label: "System Monitoring",
              href: "/admin/monitoring",
              icon: Activity,
              isActive: (path) => path.startsWith("/admin/monitoring"),
            },
          ],
        },
        {
          title: "Platform",
          items: [
            {
              label: "Platform Settings",
              href: "/admin/settings",
              icon: Settings,
              isActive: (path) => path.startsWith("/admin/settings"),
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
