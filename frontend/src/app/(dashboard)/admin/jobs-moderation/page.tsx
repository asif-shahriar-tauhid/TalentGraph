'use client';

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  Ban,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileCheck2,
  FileSearch,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

type ModerationTab = "all" | "reports" | "verification" | "suspended";
type ViolationType = "all" | "weight" | "entity" | "spam" | "other";

interface ModerationJob {
  id: string;
  title: string;
  company: string;
  postedBy: string;
  email: string;
  violationType: Exclude<ViolationType, "all">;
  reason: string;
  status: string;
  description?: string;
}

const moderationQueue: ModerationJob[] = [];

const navigationItems = [
  { label: "Operational Queue", href: "/admin", icon: LayoutDashboard },
  { label: "Company Verification", href: "/admin/company-verification", icon: Building2 },
  { label: "User Directory", href: "/admin/user-directory", icon: Users },
  { label: "Jobs Moderation", href: "/admin/jobs-moderation", icon: BriefcaseBusiness },
  { label: "Integrity Cases", href: "/admin#integrity", icon: ShieldAlert },
  { label: "Worker Telemetry", href: "/admin#telemetry", icon: Activity },
  { label: "BDT Subscriptions", href: "/admin#subscriptions", icon: Wallet },
];

const violationOptions: { value: ViolationType; label: string }[] = [
  { value: "all", label: "All Violation Types" },
  { value: "weight", label: "Weight Calibration Failures" },
  { value: "entity", label: "Unregistered Entity" },
  { value: "spam", label: "External Fee Link / Spam" },
  { value: "other", label: "Other Policy Reports" },
];

const moderationTabs: { id: ModerationTab; label: string }[] = [
  { id: "all", label: "All Flagged" },
  { id: "reports", label: "Policy Reports" },
  { id: "verification", label: "Pending Co. Verification" },
  { id: "suspended", label: "Suspended" },
];

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export default function JobsModerationPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<ModerationTab>("all");
  const [violationType, setViolationType] = useState<ViolationType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<ModerationJob | null>(null);
  const [auditJustification, setAuditJustification] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, logout, logoutPending, isLoading: isAuthLoading } = useAuth();
  const { toggleTheme } = useTheme();
  const shellUser = user ?? { name: "Administrator", role: "ADMIN" as const };
  const isPreviewSession = !user;

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return moderationQueue.filter((job) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "reports" &&
          ["weight", "spam", "other"].includes(job.violationType)) ||
        (activeTab === "verification" && job.violationType === "entity") ||
        (activeTab === "suspended" && job.status.toLowerCase() === "suspended");
      const matchesViolation =
        violationType === "all" || job.violationType === violationType;
      const matchesSearch =
        query.length === 0 ||
        `${job.id} ${job.title} ${job.company} ${job.postedBy} ${job.email}`
          .toLowerCase()
          .includes(query);

      return matchesTab && matchesViolation && matchesSearch;
    });
  }, [activeTab, searchTerm, violationType]);

  const downloadQueue = () => {
    const rows = [
      ["Job ID", "Job title", "Company", "Posted by", "Email", "Flag type", "Reason", "Status"],
      ...filteredJobs.map((job) => [
        job.id,
        job.title,
        job.company,
        job.postedBy,
        job.email,
        job.violationType,
        job.reason,
        job.status,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "talentgraph-moderation-queue.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const resetFilters = () => {
    setActiveTab("all");
    setViolationType("all");
    setSearchTerm("");
  };

  const metrics = [
    {
      label: "Total Open Postings",
      value: "0",
      detail: "No open postings recorded",
      icon: BriefcaseBusiness,
      iconClass: "text-[#A1A1AA]",
    },
    {
      label: "Reported & Flagged",
      value: "0",
      detail: "No active reports",
      icon: AlertTriangle,
      iconClass: "text-[#E5933A]",
    },
    {
      label: "Unverified Company Drafts",
      value: "0",
      detail: "No drafts awaiting verification",
      icon: Building2,
      iconClass: "text-[#A1A1AA]",
    },
    {
      label: "Moderation Queue TAT",
      value: "0h / --",
      detail: "No review turnaround available",
      icon: Activity,
      iconClass: "text-[#A1A1AA]",
    },
  ];

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#0D0D0F] text-[#D4D4D8] selection:bg-[#D4621A]/30 selection:text-white">
      <aside
        className={`sticky top-0 z-40 flex h-screen flex-shrink-0 flex-col justify-between border-r border-[#222226] bg-[#121215] p-2 transition-all duration-300 md:p-3 ${
          isSidebarCollapsed ? "w-16" : "w-16 md:w-64"
        }`}
      >
        <div className="flex min-h-0 flex-col gap-5">
          <div
            className={`flex items-center ${
              isSidebarCollapsed
                ? "h-auto flex-col gap-1"
                : "h-12 justify-center md:justify-between md:gap-2 md:px-1"
            }`}
          >
            <Link
              aria-label="TalentGraph admin home"
              className="flex min-w-0 cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-80"
              href="/"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D4621A] text-sm font-bold text-white">
                TG
              </span>
              <span
                className={`min-w-0 ${
                  isSidebarCollapsed ? "hidden" : "hidden md:block"
                }`}
              >
                <span className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white">
                  TalentGraph
                  <span className="rounded bg-[#2A2A2E] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#B3B3B3]">
                    ADMIN
                  </span>
                </span>
                <span className="block text-[10px] text-[#71717A]">
                  Operational control
                </span>
              </span>
            </Link>
            <button
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`hidden rounded-lg p-1.5 text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white md:block ${
                isSidebarCollapsed ? "mx-auto" : ""
              }`}
              onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              type="button"
            >
              {isSidebarCollapsed ? (
                <ChevronRight aria-hidden="true" className="size-4" />
              ) : (
                <ChevronLeft aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>

          <nav aria-label="Admin navigation" className="min-h-0 space-y-1 overflow-y-auto">
            {navigationItems.map(({ label, href, icon: Icon }) => {
              const isActive = label === "Jobs Moderation";
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    isSidebarCollapsed
                      ? "justify-center px-0"
                      : "justify-center px-0 md:justify-start md:px-3"
                  } ${
                    isActive
                      ? "bg-[#D4621A] text-white"
                      : "text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white"
                  }`}
                  href={href}
                  key={label}
                  title={label}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {!isSidebarCollapsed && (
                    <span className="hidden truncate md:inline">{label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-[#232328] pt-3">
          <div
            className={`mb-3 flex items-center ${
              isSidebarCollapsed
                ? "justify-center"
                : "justify-center gap-2.5 md:justify-start md:px-1"
            }`}
            title={
              isSidebarCollapsed
                ? `${shellUser.name}${isPreviewSession ? " (preview session)" : ""}`
                : undefined
            }
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2B2B32] bg-[#202024] text-xs font-semibold text-white">
              {getInitials(shellUser.name)}
            </span>
            {!isSidebarCollapsed && (
              <span className="hidden min-w-0 md:block">
                <span className="block truncate text-xs font-medium text-white">
                  {shellUser.name}
                </span>
                <span className="block truncate font-mono text-[10px] text-[#71717A]">
                  {isPreviewSession
                    ? isAuthLoading
                      ? "Loading admin session..."
                      : "ADMIN · UI preview"
                    : shellUser.role}
                </span>
              </span>
            )}
          </div>
          <button
            aria-label={isPreviewSession ? "Sign out unavailable in preview" : "Sign out"}
            className={`flex w-full items-center justify-center gap-2 rounded-lg border border-[#27272C] py-2 text-xs text-[#A1A1AA] transition-colors hover:border-[#482026] hover:bg-[#2E181D] hover:text-[#F87171] disabled:opacity-50 ${
              isSidebarCollapsed ? "px-0" : "px-0 md:px-3"
            }`}
            disabled={logoutPending || isPreviewSession}
            onClick={() => logout()}
            title={isSidebarCollapsed ? "Sign out" : undefined}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-3.5" />
            {!isSidebarCollapsed && (
              <span className="hidden md:inline">Sign Out</span>
            )}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 w-full flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-[#222227] bg-[#0D0D0F]/95 px-4 py-4 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
              <span>Admin</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#D4621A]">Jobs Moderation</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Job Postings &amp; Content Moderation
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Focus moderation search"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={() => searchInputRef.current?.focus()}
              title="Quick search"
              type="button"
            >
              <Search aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Download moderation queue CSV"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={downloadQueue}
              title="Download moderation queue"
              type="button"
            >
              <ArrowDownToLine aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Toggle theme"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={toggleTheme}
              title="Toggle theme"
              type="button"
            >
              <Sun aria-hidden="true" className="size-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
          <section
            aria-label="Moderation metrics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {metrics.map(({ label, value, detail, icon: Icon, iconClass }) => (
              <article
                className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4"
                key={label}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#A1A1AA]">{label}</p>
                    <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-white">
                      {value}
                    </p>
                  </div>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24]">
                    <Icon aria-hidden="true" className={`size-4 ${iconClass}`} />
                  </span>
                </div>
                <p className="mt-3 border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">
                  {detail}
                </p>
              </article>
            ))}
          </section>

          <section aria-label="Moderation queue" className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#25252A] bg-[#151518] p-3 lg:flex-row lg:items-center lg:justify-between">
              <div
                aria-label="Filter moderation queue"
                className="flex max-w-full flex-wrap items-center gap-1"
                role="tablist"
              >
                {moderationTabs.map(({ id, label }) => (
                  <button
                    aria-selected={activeTab === id}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === id
                        ? "border border-[#2B2B32] bg-[#1F1F24] text-white"
                        : "text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white"
                    }`}
                    key={id}
                    onClick={() => setActiveTab(id)}
                    role="tab"
                    type="button"
                  >
                    {label}
                    <span className="ml-1 font-mono text-[10px] text-[#71717A]">0</span>
                  </button>
                ))}
              </div>

              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                  <Search
                    aria-hidden="true"
                    className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]"
                  />
                  <input
                    aria-label="Search moderation queue"
                    className="h-9 w-full rounded-lg border border-[#27272C] bg-[#161619] py-2 pl-8 pr-3 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A] focus:ring-1 focus:ring-[#D4621A]"
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search jobs or entities"
                    ref={searchInputRef}
                    type="search"
                    value={searchTerm}
                  />
                </label>
                <label className="relative sm:w-52">
                  <span className="sr-only">Filter by violation type</span>
                  <select
                    className="h-9 w-full appearance-none rounded-lg border border-[#27272C] bg-[#161619] px-2.5 pr-8 text-xs text-[#D4D4D8] outline-none focus:border-[#D4621A]"
                    onChange={(event) =>
                      setViolationType(event.target.value as ViolationType)
                    }
                    value={violationType}
                  >
                    {violationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]"
                  />
                </label>
                <button
                  className="h-9 rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
                  onClick={resetFilters}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-[#25252A] bg-[#151518]">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left text-xs">
                  <thead className="bg-[#121215] text-[10px] uppercase tracking-wider text-[#71717A]">
                    <tr className="border-b border-[#222227]">
                      <th className="px-4 py-3 font-semibold">Job Details &amp; Entity</th>
                      <th className="px-3 py-3 font-semibold">Posted By &amp; Auth</th>
                      <th className="px-3 py-3 font-semibold">Flag Type / Reason</th>
                      <th className="px-3 py-3 font-semibold">Q/A &amp; Status</th>
                      <th className="px-4 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222227]">
                    {filteredJobs.length === 0 ? (
                      <tr>
                        <td className="px-4 py-14 text-center" colSpan={5}>
                          <div className="mx-auto flex max-w-md flex-col items-center">
                            <span className="mb-3 flex size-11 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#A1A1AA]">
                              <FileSearch aria-hidden="true" className="size-5" />
                            </span>
                            <h2 className="text-sm font-semibold text-white">
                              {moderationQueue.length === 0
                                ? "No pending job postings in moderation queue"
                                : "No postings match these filters"}
                            </h2>
                            <p className="mt-1 text-xs leading-5 text-[#71717A]">
                              {moderationQueue.length === 0
                                ? "Newly flagged or submitted job postings will appear here for audit."
                                : "Try a different search or reset your filters."}
                            </p>
                            {moderationQueue.length > 0 && (
                              <button
                                className="mt-3 text-xs font-medium text-[#D4621A] hover:text-[#E47735]"
                                onClick={resetFilters}
                                type="button"
                              >
                                Clear filters
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((job) => (
                        <tr
                          aria-selected={selectedJob?.id === job.id}
                          className={`cursor-pointer transition-colors hover:bg-[#1A1A1E] ${
                            selectedJob?.id === job.id
                              ? "border-l-2 border-l-[#D4621A] bg-[#1B1B1F]"
                              : ""
                          }`}
                          key={job.id}
                          onClick={() => setSelectedJob(job)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setSelectedJob(job);
                            }
                          }}
                          tabIndex={0}
                        >
                          <td className="px-4 py-3.5">
                            <span className="block font-medium text-white">{job.title}</span>
                            <span className="mt-1 flex items-center gap-1.5 text-[10px] text-[#A1A1AA]">
                              <span>{job.company}</span>
                              <Building2 aria-hidden="true" className="size-3.5 text-[#71717A]" />
                            </span>
                          </td>
                          <td className="px-3 py-3.5">
                            <span className="block text-[#D4D4D8]">{job.postedBy}</span>
                            <span className="mt-1 block break-all font-mono text-[10px] text-[#71717A]">
                              {job.email}
                            </span>
                          </td>
                          <td className="px-3 py-3.5">
                            <span className="block text-[#E5933A]">{job.violationType}</span>
                            <span className="mt-1 block text-[10px] text-[#A1A1AA]">
                              {job.reason}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-[#A1A1AA]">{job.status}</td>
                          <td className="px-4 py-3.5 text-right">
                            <button
                              aria-label={`Inspect ${job.title}`}
                              className="inline-flex size-8 items-center justify-center rounded border border-[#2B2B32] bg-[#1F1F24] text-white hover:border-[#D4621A]"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedJob(job);
                              }}
                              type="button"
                            >
                              <FileSearch aria-hidden="true" className="size-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-2 border-t border-[#222227] px-4 py-3 text-[11px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Showing {filteredJobs.length} of {moderationQueue.length} postings
                </span>
                <span className="font-mono">Moderation queue records only</span>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="job-inspector-heading"
            className="rounded-xl border border-[#25252A] bg-[#151518] p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222227] pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#D4621A]" />
                <h2
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D4621A]"
                  id="job-inspector-heading"
                >
                  Job Inspector
                </h2>
              </div>
              {selectedJob && (
                <button
                  aria-label="Clear selected posting"
                  className="rounded p-1 text-[#71717A] hover:bg-[#202024] hover:text-white"
                  onClick={() => {
                    setSelectedJob(null);
                    setAuditJustification("");
                  }}
                  type="button"
                >
                  <span aria-hidden="true" className="text-lg leading-none">×</span>
                </button>
              )}
            </div>

            {!selectedJob && (
              <div className="flex min-h-32 flex-col items-center justify-center px-4 text-center">
                <span className="mb-3 flex size-10 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#71717A]">
                  <Search aria-hidden="true" className="size-4" />
                </span>
                <p className="max-w-2xl text-sm text-[#A1A1AA]">
                  Select a job posting from the queue above to review compliance checks and record moderation audit decision
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 pt-4 xl:grid-cols-3">
              <div className="space-y-4">
                <section className="rounded-lg border border-[#222227] bg-[#121215] p-3">
                  <h3 className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                    <FileText aria-hidden="true" className="size-3.5" />
                    Preview Posting
                  </h3>
                  {selectedJob ? (
                    <>
                      <p className="text-sm font-semibold text-white">{selectedJob.title}</p>
                      <p className="mt-1 text-xs text-[#A1A1AA]">{selectedJob.company}</p>
                      <p className="mt-3 whitespace-pre-wrap text-xs leading-5 text-[#A1A1AA]">
                        {selectedJob.description || "No posting description provided."}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-[#71717A]">
                      Posting preview will be available after selecting a queue item.
                    </p>
                  )}
                </section>
                <section className="rounded-lg border border-[#222227] bg-[#121215] p-3">
                  <h3 className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                    <Activity aria-hidden="true" className="size-3.5" />
                    Audit History
                  </h3>
                  <p className="text-xs text-[#71717A]">
                    {selectedJob
                      ? "No audit history is available for this posting."
                      : "Audit history will appear when a posting is selected."}
                  </p>
                </section>
              </div>

              <div className="space-y-4 xl:col-span-2">
                <section className="rounded-lg border border-[#222227] bg-[#121215] p-3">
                  <h3 className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                    <FileCheck2 aria-hidden="true" className="size-3.5" />
                    Automated Compliance Checks
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Company verification", icon: Building2 },
                      { label: "Posting policy review", icon: FileCheck2 },
                      { label: "Compensation & requirements", icon: CheckCircle2 },
                      { label: "External links & contact details", icon: Code2 },
                    ].map(({ label, icon: Icon }) => (
                      <div
                        className="flex items-center gap-2 rounded-lg border border-[#222227] bg-[#17171B] p-3"
                        key={label}
                      >
                        <Icon aria-hidden="true" className="size-4 shrink-0 text-[#71717A]" />
                        <span className="text-xs text-[#A1A1AA]">{label}</span>
                        <span className="ml-auto text-[10px] text-[#71717A]">
                          {selectedJob ? "Review required" : "Awaiting posting"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[#222227] bg-[#121215] p-3">
                  <label
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-[#71717A]"
                    htmlFor="audit-justification"
                  >
                    Audit Trail Justification
                  </label>
                  <textarea
                    className="min-h-24 w-full resize-y rounded-lg border border-[#27272C] bg-[#161619] p-3 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!selectedJob}
                    id="audit-justification"
                    onChange={(event) => setAuditJustification(event.target.value)}
                    placeholder="Enter the rationale for this moderation decision..."
                    value={auditJustification}
                  />
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                    <button
                      className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#202024] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!selectedJob || !auditJustification.trim()}
                      type="button"
                    >
                      <FileCheck2 aria-hidden="true" className="size-3.5" />
                      Request Revision
                    </button>
                    <button
                      className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#482026] bg-[#2E181D] px-3 text-xs font-medium text-[#F87171] transition-colors hover:bg-[#3A1D23] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!selectedJob || !auditJustification.trim()}
                      type="button"
                    >
                      <Ban aria-hidden="true" className="size-3.5" />
                      Suspend Posting
                    </button>
                    <button
                      className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-[#D4621A] px-3 text-xs font-semibold text-[#18181B] transition-colors hover:bg-[#E47735] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!selectedJob || !auditJustification.trim()}
                      type="button"
                    >
                      <Check aria-hidden="true" className="size-3.5" />
                      Commit Moderation Decision
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-auto flex flex-col gap-2 border-t border-[#1C1C20] px-4 py-4 text-[10px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#71717A]" />
            TalentGraph moderation workspace
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Need help? Contact platform security
          </span>
        </footer>
      </div>
    </div>
  );
}