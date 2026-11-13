"use client";

import {
  Briefcase,
  Building2,
  CreditCard,
  GitBranch,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layouts/dashboard";

export default function RecruiterLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      userRole="RECRUITER"
      roleTitle="Recruiter"
      roleBadge="Preview"
      roleBadgeClassName="border-primary/30 bg-primary/10 text-primary"
      alwaysVisibleSidebar
      companyStatus="Company setup"
      companyStatusVerified={false}
      footerNote="Recruiter dashboard preview"
      footerSecurityText="Company and dashboard information is illustrative. Hiring decisions remain human-owned."
      navGroups={[
        {
          title: "Hiring desk",
          items: [
            {
              label: "Dashboard",
              href: "/recruiter/dashboard",
              icon: LayoutDashboard,
              isActive: (path) =>
                path === "/recruiter" || path === "/recruiter/dashboard",
            },
            {
              label: "Company Profile",
              href: "/recruiter/company",
              icon: Building2,
              isActive: (path) =>
                path === "/recruiter/company" ||
                path.startsWith("/recruiter/company/"),
            },
            {
              label: "Job Management",
              href: "/recruiter/jobs",
              icon: Briefcase,
              badge: "0",
              isActive: (path) => path.startsWith("/recruiter/jobs"),
            },
          ],
        },
        {
          title: "Candidate review",
          items: [
            {
              label: "Applicants & Rankings",
              href: "/recruiter/applicants",
              icon: Users,
              badge: "0",
              isActive: (path) => path.startsWith("/recruiter/applicants"),
            },
            {
              label: "Assessment Review",
              href: "/recruiter/assessments",
              icon: ShieldCheck,
              badge: "0",
              isActive: (path) => path.startsWith("/recruiter/assessments"),
            },
            {
              label: "Hiring Pipeline",
              href: "/recruiter/pipeline",
              icon: GitBranch,
              badge: "0",
              isActive: (path) => path.startsWith("/recruiter/pipeline"),
            },
          ],
        },
        {
          title: "Organization",
          items: [
            {
              label: "Billing & Plans",
              href: "/recruiter/billing",
              icon: CreditCard,
              isActive: (path) => path.startsWith("/recruiter/billing"),
            },
            {
              label: "Recruiter Settings",
              href: "/recruiter/settings",
              icon: Settings,
              isActive: (path) => path.startsWith("/recruiter/settings"),
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
