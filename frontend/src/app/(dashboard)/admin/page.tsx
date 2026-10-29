"use client";

import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground">
            System Administration Desk
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Platform governance, recruiter & company verification, and proctoring integrity audits.
          </p>
        </div>

        <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive font-bold text-xs">
          Audit Logging Active
        </Badge>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Accounts
            </span>
            <Users className="size-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">1,248</span>
            <span className="text-[11px] text-emerald-600 font-semibold">+18% this month</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            892 Candidates • 356 Recruiters
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Pending Companies
            </span>
            <Building2 className="size-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">3</span>
            <span className="text-[11px] text-muted-foreground">Awaiting validation</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Cannot publish jobs until approved
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Integrity Flags
            </span>
            <ShieldAlert className="size-4 text-destructive" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-destructive">1</span>
            <span className="text-[11px] text-muted-foreground">Flagged attempt</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Multiple face detection trigger
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              System Health
            </span>
            <Activity className="size-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">99.98%</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Operational</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Postgres • Redis • Cloudinary
          </p>
        </div>
      </div>

      {/* Company Verification Queue */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Company Verification Queue</h3>
            <p className="text-xs text-muted-foreground">
              Review company legitimacy and recruiter affiliation before permitting job publishing
            </p>
          </div>
        </div>

        <div className="divide-y divide-border/40">
          {[
            {
              company: "DevCraft Technologies",
              recruiter: "Kamrul Hasan (Head of Talent)",
              domain: "devcraft.bd",
              submitted: "2 hours ago",
            },
            {
              company: "Optima Logic Limited",
              recruiter: "Mahir Faisal (Tech Lead)",
              domain: "optimalogic.io",
              submitted: "5 hours ago",
            },
          ].map((c, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{c.company}</span>
                  <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-600">
                    Pending
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recruiter: <span className="font-semibold text-foreground">{c.recruiter}</span> • Domain: {c.domain}
                </p>
                <p className="text-[11px] text-muted-foreground opacity-80">
                  Submitted {c.submitted}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs gap-1.5 text-destructive hover:bg-destructive/10">
                  <XCircle className="size-3.5" />
                  <span>Reject</span>
                </Button>
                <Button size="sm" variant="default" className="text-xs gap-1.5">
                  <CheckCircle2 className="size-3.5" />
                  <span>Verify Company</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
