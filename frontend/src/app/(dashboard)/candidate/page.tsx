"use client";

import {
  ArrowRight,
  FileText,
  Network,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/asset/svg/GithubIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useCandidateCVStatus,
  useCandidateProfile,
  useGithubPublicRepos,
  useGithubSyncStatus,
  useSyncGithubRepos,
} from "@/hooks";
import { useAuth } from "@/providers/authProvider";

function formatResetDate(value?: string | null) {
  if (!value) return "Resets on 1st of next month (Asia/Dhaka)";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Resets on 1st of next month (Asia/Dhaka)";
  }
  return `Resets ${new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date)}`;
}

export default function CandidateDashboardPage() {
  const { user } = useAuth();
  const { data: profileRes, isLoading: isProfileLoading } =
    useCandidateProfile(Boolean(user));
  const { data: syncStatusRes } = useGithubSyncStatus(Boolean(user));
  const { data: reposRes } = useGithubPublicRepos(Boolean(user));
  const { data: cvStatusRes } = useCandidateCVStatus(Boolean(user));
  const { mutate: triggerSync, isPending: isSyncPending } =
    useSyncGithubRepos();

  const profile = profileRes?.data;
  const syncStatus = syncStatusRes?.data;
  const repos = reposRes?.data ?? [];
  const selectedRepoCount = repos.filter((r) => r.isSelected).length;
  const cvStatus = cvStatusRes?.data;

  const quotaUsed =
    syncStatus?.quotaDetails?.used ?? profile?.syncQuota?.used ?? 0;
  const quotaTotal =
    syncStatus?.quotaDetails?.total ?? profile?.syncQuota?.total ?? 3;
  const quotaRemaining =
    syncStatus?.quotaDetails?.remaining ??
    profile?.syncQuota?.remaining ??
    Math.max(0, quotaTotal - quotaUsed);
  const quotaResetAt =
    syncStatus?.nextMonthlyResetAt ?? profile?.syncQuota?.resetAt ?? null;

  const verifiedSkills = profile?.verifiedSkills ?? [];
  const isBanned = Boolean(user?.isAssessmentBanned);

  return (
    <div className="space-y-6">
      {/* Top Welcome Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground">
            Welcome back, {profile?.name || user?.name || "Developer"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {profile?.headline ||
              "Track your verified skills, GitHub repository code evidence, and CV ingestion status."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => triggerSync()}
            disabled={isSyncPending || quotaRemaining <= 0}
            className="gap-2 text-xs font-semibold"
          >
            {isSyncPending ? (
              <Spinner className="size-3.5 text-primary" />
            ) : (
              <RefreshCw className="size-3.5 text-primary" />
            )}
            <span>
              {isSyncPending ? "Syncing..." : "Sync Repositories"}
            </span>
          </Button>
          <Button
            size="sm"
            variant="default"
            render={<Link href="/candidate/profile" />}
            nativeButton={false}
            className="gap-1.5 text-xs font-semibold"
          >
            <span>Manage Profile &amp; Evidence</span>
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
            <span className="text-2xl font-black text-foreground">
              {quotaUsed} / {quotaTotal}
            </span>
            <span className="text-[11px] text-muted-foreground">
              used this month
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            {syncStatus?.activeJob
              ? `Last sync job: ${syncStatus.activeJob.status}`
              : formatResetDate(quotaResetAt)}
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
            <span className="text-2xl font-black text-foreground">
              {isProfileLoading ? "—" : verifiedSkills.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              Active in Graph
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            {selectedRepoCount > 0
              ? `${selectedRepoCount} selected ${selectedRepoCount === 1 ? "repository" : "repositories"}`
              : "No repositories selected yet"}
          </p>
        </div>

        {/* CV & Profile Ingestion Status */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              CV Evidence Pipeline
            </span>
            <FileText className="size-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-foreground">
              {cvStatus?.status === "COMPLETED"
                ? "Verified"
                : cvStatus?.status === "PENDING" ||
                    cvStatus?.status === "PROCESSING"
                  ? "Parsing"
                  : cvStatus?.status === "FAILED"
                    ? "Failed"
                    : profile?.cvUrl
                      ? "Uploaded"
                      : "Not Uploaded"}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            {profile?.cvUrl
              ? "CV stored for deterministic matching"
              : "Upload PDF or DOCX in My Profile"}
          </p>
        </div>

        {/* Assessment Integrity */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Integrity Standing
            </span>
            {isBanned ? (
              <ShieldAlert className="size-4 text-destructive" />
            ) : (
              <ShieldCheck className="size-4 text-emerald-500" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-black ${
                isBanned ? "text-destructive" : "text-emerald-600"
              }`}
            >
              {isBanned ? "Restricted" : "Clean"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isBanned ? "Assessment ban active" : "No Violations"}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            {isBanned
              ? "Contact platform support for review"
              : "Cleared for official proctored tests"}
          </p>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: SkillGraph Preview */}
        <div className="lg:col-span-2 rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-foreground">
                SkillGraph Highlights
              </h3>
              <p className="text-xs text-muted-foreground">
                Verified technical proficiencies extracted from your CV, GitHub
                repositories, and assessments
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/candidate/profile" />}
              nativeButton={false}
              className="text-xs gap-1.5"
            >
              <span>Manage Evidence</span>
              <ArrowRight className="size-3" />
            </Button>
          </div>

          {isProfileLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Spinner className="size-5 text-primary" />
            </div>
          ) : verifiedSkills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {verifiedSkills.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-border/60 bg-secondary/30 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-foreground">
                      {item.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary font-bold text-[10px]"
                    >
                      {Math.round(item.overallScore)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Category: {item.category}</span>
                    <span className="opacity-80">
                      {item.evidenceCount}{" "}
                      {item.evidenceCount === 1 ? "source" : "sources"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-6 text-center space-y-3">
              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserCheck className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-foreground">
                  No verified skill nodes in your SkillGraph yet
                </p>
                <p className="text-[11px] text-muted-foreground max-w-md mx-auto">
                  Upload your CV and select public GitHub repositories in your
                  profile to extract evidence-grounded skill scores.
                </p>
              </div>
              <Button
                size="sm"
                variant="default"
                render={<Link href="/candidate/profile" />}
                nativeButton={false}
                className="text-xs gap-1.5"
              >
                <span>Complete Profile &amp; Evidence Setup</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Right 1 Col: Mobile App Assessment Notice */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              Mobile Technical Assessment
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Official timed assessments are taken on the{" "}
              <strong className="text-foreground">TalentGraph Mobile App</strong>{" "}
              with proctoring snapshots. Your website profile automatically
              syncs with test results.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Subscription Tier
            </span>
            <p className="text-xs font-semibold text-foreground">
              {profile?.subscriptionTier || "FREE"} Plan
            </p>
            <p className="text-[11px] text-muted-foreground">
              {user?.isGithubConnected
                ? "GitHub OAuth Connected"
                : "Connect GitHub in Profile to enable repo sync"}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            render={<Link href="/candidate/settings" />}
            nativeButton={false}
            className="w-full justify-center text-xs gap-1.5"
          >
            <span>Account &amp; Privacy Settings</span>
            <ArrowRight className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
