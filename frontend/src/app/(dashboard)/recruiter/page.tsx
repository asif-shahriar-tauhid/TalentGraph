"use client";

import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Code2,
  FileSearch,
  Plus,
  ShieldAlert,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authProvider";

export default function RecruiterDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Top Welcome Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground">
            Recruiter Workspace
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review ranked candidate evidence, configure skill requirements, and verify assessment integrity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="default"
            render={<Link href="/recruiter/jobs" />}
            nativeButton={false}
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            <span>Post New Job</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Active Job Postings
            </span>
            <Briefcase className="size-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">4</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Published</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            1 job closing in 5 days
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Applicants
            </span>
            <Users className="size-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">42</span>
            <span className="text-[11px] text-sky-600 font-semibold">+8 today</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            All with linked GitHub repositories
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Code Evidence Verified
            </span>
            <FileSearch className="size-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">94%</span>
            <span className="text-[11px] text-muted-foreground">Grounding rate</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Zero reliance on opaque AI scores
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Assessments Pending Review
            </span>
            <ShieldAlert className="size-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">2</span>
            <span className="text-[11px] text-muted-foreground">Awaiting audit</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Human verification required
          </p>
        </div>
      </div>

      {/* Recent Applicants Roster Table */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Top Ranked Applicants</h3>
            <p className="text-xs text-muted-foreground">
              Candidates sorted by evidence fit score for Senior Backend Engineer role
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/recruiter/applicants" />}
            nativeButton={false}
            className="text-xs gap-1.5"
          >
            <span>View All Applicants</span>
            <ArrowRight className="size-3" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4 font-bold">Candidate</th>
                <th className="py-3 px-4 font-bold">Fit Score</th>
                <th className="py-3 px-4 font-bold">Verified Skills</th>
                <th className="py-3 px-4 font-bold">GitHub Repos</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-xs">
              {[
                {
                  name: "Tanvir Rahman",
                  email: "tanvir.r@gmail.com",
                  score: "94%",
                  skills: ["TypeScript", "NestJS", "PostgreSQL"],
                  repos: "4 public repos",
                },
                {
                  name: "Farhan Ahmed",
                  email: "farhan.ahmed@outlook.com",
                  score: "89%",
                  skills: ["Go", "Docker", "Redis", "gRPC"],
                  repos: "3 public repos",
                },
                {
                  name: "Nusrat Jahan",
                  email: "nusrat.jahan@dev.io",
                  score: "86%",
                  skills: ["Node.js", "Express", "Prisma"],
                  repos: "5 public repos",
                },
              ].map((c, idx) => (
                <tr key={idx} className="hover:bg-secondary/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-foreground">
                    <div>{c.name}</div>
                    <div className="text-[11px] text-muted-foreground font-normal">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 font-bold">
                      {c.score} Match
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.skills.map((s, sIdx) => (
                        <span key={sIdx} className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                    {c.repos}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href="/recruiter/applicants" />}
                      nativeButton={false}
                      className="text-xs h-7.5"
                    >
                      Inspect Evidence
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
