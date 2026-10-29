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
      roleTitle="Recruiter Desk"
      roleBadge="Hiring Team"
      roleBadgeClassName="border-primary/30 bg-primary/10 text-primary"
      footerNote="Verified Technical Hiring Portal"
      footerSecurityText="Human-in-the-Loop Integrity Verification"
      navGroups={[
        {
          title: "Hiring Desk",
          items: [
            {
              label: "Overview",
              href: "/recruiter",
              icon: LayoutDashboard,
              isActive: (path) => path === "/recruiter",
            },
            {
              label: "Company Profile",
              href: "/recruiter/company",
              icon: Building2,
              isActive: (path) => path.startsWith("/recruiter/company"),
            },
            {
              label: "Job Openings",
              href: "/recruiter/jobs",
              icon: Briefcase,
              isActive: (path) => path.startsWith("/recruiter/jobs"),
            },
          ],
        },
        {
          title: "Candidate Review",
          items: [
            {
              label: "Applicants & Code",
              href: "/recruiter/applicants",
              icon: Users,
              isActive: (path) => path.startsWith("/recruiter/applicants"),
            },
            {
              label: "Assessment Review",
              href: "/recruiter/assessments",
              icon: ShieldCheck,
              isActive: (path) => path.startsWith("/recruiter/assessments"),
            },
            {
              label: "Hiring Pipeline",
              href: "/recruiter/pipeline",
              icon: GitBranch,
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
              label: "Settings",
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
