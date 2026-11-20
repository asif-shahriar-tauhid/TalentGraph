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
import { useAuth } from "@/providers/authProvider";

export default function RecruiterLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const linkedCompany = user?.recruiterProfile?.company;
  const companyStatus = linkedCompany?.name || "Unassigned";
  const companyStatusVerified =
    linkedCompany?.verificationStatus === "VERIFIED";
  const roleBadge =
    user?.role === "SUB_RECRUITER" ? "SUB-RECRUITER" : "RECRUITER";

  return (
    <DashboardShell
      userRole="RECRUITER"
      roleTitle="Recruiter"
      roleBadge={roleBadge}
      roleBadgeClassName="border-primary/30 bg-primary/10 text-primary"
      alwaysVisibleSidebar
      allowDevelopmentPreview
      companyStatus={companyStatus}
      companyStatusVerified={companyStatusVerified}
      footerNote="Recruiter workspace"
      footerSecurityText="Hiring decisions remain human-owned."
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
              isActive: (path) =>
                path === "/recruiter/jobs" ||
                (path.startsWith("/recruiter/jobs/") &&
                  !path.endsWith("/applicants")),
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
              isActive: (path) =>
                path === "/recruiter/applicants" ||
                (path.startsWith("/recruiter/jobs/") &&
                  path.endsWith("/applicants")),
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
