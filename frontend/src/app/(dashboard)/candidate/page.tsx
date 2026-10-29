"use client";

import {
  ArrowRight,
  Briefcase,
  Code2,
  FileCheck2,
  Network,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/asset/svg/GithubIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authProvider";

export default function CandidateDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Top Welcome Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground">
            Welcome back, {user?.name || "Developer"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track your verified skills, GitHub repository code evidence, and job applications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 text-xs font-semibold"
          >
            <RefreshCw className="size-3.5 text-primary" />
            <span>Sync Repositories</span>
          </Button>
          <Button
            size="sm"
            variant="default"
            render={<Link href="/candidate/jobs" />}
            nativeButton={false}
            className="gap-1.5 text-xs font-semibold"
          >
            <span>Explore Jobs</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sync Quota */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              GitHub Sync Quota
            </span>
            <GithubIcon className="size-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">1 / 3</span>
            <span className="text-[11px] text-muted-foreground">used this month</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Resets on 1st of next month
          </p>
        </div>

        {/* Verified Skills */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Verified Skills
            </span>
            <Network className="size-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">14</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Active in Graph</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Evidence grounded across 6 repositories
          </p>
        </div>

        {/* Active Applications */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Applications
            </span>
            <Briefcase className="size-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">3</span>
            <span className="text-[11px] text-sky-600 font-semibold">In Review</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            1 assessment invitation received
          </p>
        </div>

        {/* Assessment Integrity */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Integrity Standing
            </span>
            <ShieldCheck className="size-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">Clean</span>
            <span className="text-[11px] text-muted-foreground">No Violations</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Cleared for official proctored tests
          </p>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: SkillGraph Preview */}
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-foreground">SkillGraph Highlights</h3>
              <p className="text-xs text-muted-foreground">
                Top verified technical proficiencies extracted from your commit history
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/candidate/skillgraph" />}
              nativeButton={false}
              className="text-xs gap-1.5"
            >
              <span>View Full Graph</span>
              <ArrowRight className="size-3" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { skill: "TypeScript & Node.js", score: "92%", level: "Top 8%", repos: "3 repos" },
              { skill: "PostgreSQL & Prisma", score: "88%", level: "Top 12%", repos: "2 repos" },
              { skill: "React & Next.js", score: "95%", level: "Top 5%", repos: "4 repos" },
              { skill: "REST API Architecture", score: "84%", level: "Top 15%", repos: "3 repos" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/60 bg-secondary/30 p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{item.skill}</span>
                  <Badge variant="outline" className="border-primary/30 text-primary font-bold text-[10px]">
                    {item.score}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Percentile: {item.level}</span>
                  <span className="opacity-80">{item.repos}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Mobile App Assessment Notice */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Mobile Technical Assessment</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Official timed assessments are taken on the **TalentGraph Mobile App** with proctoring snapshots. Your website profile automatically syncs with test results.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Pending Assessment
            </span>
            <p className="text-xs font-semibold text-foreground">
              Full-Stack Developer Screening Test
            </p>
            <p className="text-[11px] text-muted-foreground">
              5 Questions • 5 Minutes • Camera proctored
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            render={<Link href="/candidate/assessments" />}
            nativeButton={false}
            className="w-full justify-center text-xs gap-1.5"
          >
            <span>Assessment Instructions</span>
            <ArrowRight className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
