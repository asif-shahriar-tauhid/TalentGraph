"use client";

import {
  Bell,
  Briefcase,
  FileText,
  LayoutDashboard,
  Network,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layouts/dashboard";

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      userRole="CANDIDATE"
      roleTitle="Candidate Workspace"
      roleBadge="Developer"
      roleBadgeClassName="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      footerNote="Evidence-Based Developer Portal"
      footerSecurityText="Monthly GitHub Sync Quota: Active"
      navGroups={[
        {
          title: "My Portfolio",
          items: [
            {
              label: "Overview",
              href: "/candidate",
              icon: LayoutDashboard,
              isActive: (path) => path === "/candidate",
            },
            {
              label: "My Profile",
              href: "/candidate/profile",
              icon: User,
              isActive: (path) => path.startsWith("/candidate/profile"),
            },
            {
              label: "SkillGraph",
              href: "/candidate/skillgraph",
              icon: Network,
              isActive: (path) => path.startsWith("/candidate/skillgraph"),
            },
          ],
        },
        {
          title: "Opportunities",
          items: [
            {
              label: "Explore Jobs",
              href: "/candidate/jobs",
              icon: Briefcase,
              isActive: (path) => path.startsWith("/candidate/jobs"),
            },
            {
              label: "My Applications",
              href: "/candidate/applications",
              icon: FileText,
              isActive: (path) => path.startsWith("/candidate/applications"),
            },
            {
              label: "Assessment Center",
              href: "/candidate/assessments",
              icon: ShieldCheck,
              isActive: (path) => path.startsWith("/candidate/assessments"),
            },
          ],
        },
        {
          title: "Account",
          items: [
            {
              label: "Notifications",
              href: "/candidate/notifications",
              icon: Bell,
              isActive: (path) => path.startsWith("/candidate/notifications"),
            },
            {
              label: "Settings",
              href: "/candidate/settings",
              icon: Settings,
              isActive: (path) => path.startsWith("/candidate/settings"),
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
