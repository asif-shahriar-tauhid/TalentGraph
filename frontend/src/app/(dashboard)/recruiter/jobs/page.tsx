"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  History,
  Info,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type JobStatus = "Active" | "Draft" | "Pending Verification" | "Closed";
type StatusFilter = "All Jobs" | JobStatus;
type JobLevel = "Entry" | "Mid" | "Senior" | "Lead";
type JobSort = "Latest Activity" | "Oldest Activity";
type SkillWeight = { skill: string; weight: number };

export interface JobPostingItem {
  id: string;
  title: string;
  department: string;
  level: JobLevel;
  skills: [SkillWeight, SkillWeight, SkillWeight];
  status: JobStatus;
  candidateCount: number;
  inQueue: number;
  flaggedAssessments: number;
  createdAt: number;
  assessmentProtocol: string;
}

interface JobAuditEvent {
  id: string;
  title: string;
  detail: string;
  timestamp: number;
  status: JobStatus;
}

export interface JobManagementData {
  activeJobLimit: number;
  companyAccreditation: "Unverified" | "Pending" | "Verified";
  recruiterAffiliation: "Unverified" | "Pending" | "Verified";
  jobs: JobPostingItem[];
  auditEvents: JobAuditEvent[];
}

const INITIAL_JOB_MANAGEMENT_DATA: JobManagementData = {
  activeJobLimit: 5,
  companyAccreditation: "Unverified",
  recruiterAffiliation: "Unverified",
  jobs: [],
  auditEvents: [],
};

const STATUS_FILTERS: Array<{ label: string; value: StatusFilter }> = [
  { label: "All Jobs", value: "All Jobs" },
  { label: "Active", value: "Active" },
  { label: "Drafts", value: "Draft" },
  { label: "Pending Verification", value: "Pending Verification" },
  { label: "Closed", value: "Closed" },
];
const SKILL_COLORS = ["#F97316", "#2797E2", "#4ADE80"];
const panelClass =
  "min-w-0 rounded-xl border border-border bg-card p-4 dark:border-[#25252A] dark:bg-[#151518] sm:p-5";
const quietButtonClass =
  "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const inputClass =
  "min-h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const STATUS_STYLES: Record<JobStatus, string> = {
  Active:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-[#1A3D2C] dark:bg-[#13281E] dark:text-emerald-300",
  Draft: "border-border bg-secondary text-muted-foreground",
  "Pending Verification":
    "border-amber-300/60 bg-amber-50 text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200",
  Closed: "border-border bg-secondary text-muted-foreground",
};

function downloadCsv(filename: string, rows: string[][]) {
  const contents = rows
    .map((row) =>
      row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", contents], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function formatRelativeTime(timestamp: number) {
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60_000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function countForStatus(jobs: JobPostingItem[], status: StatusFilter) {
  return status === "All Jobs"
    ? jobs.length
    : jobs.filter((job) => job.status === status).length;
}

export default function RecruiterJobsPage() {
  const [data, setData] =
    useState<JobManagementData>(INITIAL_JOB_MANAGEMENT_DATA);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Jobs");
  const [departmentFilter, setDepartmentFilter] = useState("All Engineering");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [sort, setSort] = useState<JobSort>("Latest Activity");
  const [createOpen, setCreateOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");

  const activeJobs = data.jobs.filter((job) => job.status === "Active").length;
  const activeCandidates = data.jobs
    .filter((job) => job.status === "Active")
    .reduce((total, job) => total + job.candidateCount, 0);
  const candidatesInQueue = data.jobs
    .filter((job) => job.status === "Active")
    .reduce((total, job) => total + job.inQueue, 0);
  const pendingAudits = data.jobs.reduce(
    (total, job) => total + job.flaggedAssessments,
    0,
  );
  const slotsRemaining = Math.max(data.activeJobLimit - activeJobs, 0);
  const canPublish =
    data.companyAccreditation === "Verified" &&
    data.recruiterAffiliation === "Verified";
  const normalizedSearch = search.trim().toLowerCase();

  const departmentOptions = useMemo(
    () => [...new Set(data.jobs.map((job) => job.department))].sort(),
    [data.jobs],
  );

  const filteredJobs = useMemo(
    () =>
      data.jobs
        .filter((job) => {
          const matchesQuery =
            !normalizedSearch ||
            [
              job.title,
              job.id,
              job.department,
              job.level,
              job.status,
              ...job.skills.map((skill) => skill.skill),
            ]
              .join(" ")
              .toLowerCase()
              .includes(normalizedSearch);
          const matchesStatus =
            statusFilter === "All Jobs" || job.status === statusFilter;
          const matchesDepartment =
            departmentFilter === "All Engineering" ||
            job.department === departmentFilter;
          const matchesLevel =
            levelFilter === "All Levels" || job.level === levelFilter;
          return (
            matchesQuery &&
            matchesStatus &&
            matchesDepartment &&
            matchesLevel
          );
        })
        .sort((a, b) =>
          sort === "Latest Activity"
            ? b.createdAt - a.createdAt
            : a.createdAt - b.createdAt,
        ),
    [
      data.jobs,
      departmentFilter,
      levelFilter,
      normalizedSearch,
      sort,
      statusFilter,
    ],
  );

  const createJob = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const department = String(formData.get("department") ?? "").trim();
    const level = String(formData.get("level") ?? "Mid") as JobLevel;
    const skills: [SkillWeight, SkillWeight, SkillWeight] = [
      {
        skill: String(formData.get("skill1") ?? "").trim(),
        weight: Number(formData.get("weight1")),
      },
      {
        skill: String(formData.get("skill2") ?? "").trim(),
        weight: Number(formData.get("weight2")),
      },
      {
        skill: String(formData.get("skill3") ?? "").trim(),
        weight: Number(formData.get("weight3")),
      },
    ];
    const requestedStatus = String(formData.get("status") ?? "Draft") as
      | "Draft"
      | "Active";
    const weightTotal = skills.reduce((total, skill) => total + skill.weight, 0);

    if (!title || !department || skills.some((skill) => !skill.skill)) {
      setFormError("Complete the role details and all three skill names.");
      return;
    }
    if (
      skills.some(
        (skill) =>
          !Number.isInteger(skill.weight) ||
          skill.weight < 0 ||
          skill.weight > 100,
      ) ||
      weightTotal !== 100
    ) {
      setFormError(`Skill weights must total exactly 100%. Current total: ${weightTotal}%.`);
      return;
    }

    const activeCount = data.jobs.filter(
      (job) => job.status === "Active",
    ).length;
    if (requestedStatus === "Active" && canPublish && activeCount >= data.activeJobLimit) {
      setFormError(
        `All ${data.activeJobLimit} active job slots are in use. Upgrade capacity to publish another role.`,
      );
      return;
    }

    const newId = `JOB-TG-${String(901 + data.jobs.length).padStart(3, "0")}`;
    const actualStatus: JobStatus =
      requestedStatus === "Active" && !canPublish
        ? "Pending Verification"
        : requestedStatus;
    const now = Date.now();
    const job: JobPostingItem = {
      id: newId,
      title,
      department,
      level,
      skills,
      status: actualStatus,
      candidateCount: 0,
      inQueue: 0,
      flaggedAssessments: 0,
      createdAt: now,
      assessmentProtocol: "Not configured",
    };
    const auditEvent: JobAuditEvent = {
      id: `${newId}-${now}`,
      title:
        actualStatus === "Active"
          ? `${newId} published`
          : actualStatus === "Pending Verification"
            ? `${newId} submitted for verification`
            : `${newId} saved as draft`,
      detail: `${title} · Skill weights validated at 100%`,
      timestamp: now,
      status: actualStatus,
    };

    setData((current) => ({
      ...current,
      jobs: [job, ...current.jobs],
      auditEvents: [auditEvent, ...current.auditEvents],
    }));
    setStatusFilter("All Jobs");
    setDepartmentFilter("All Engineering");
    setLevelFilter("All Levels");
    setSearch("");
    setCreateOpen(false);
    setNotice(
      requestedStatus === "Active" && !canPublish
        ? "Role saved as Pending Verification. Company and recruiter affiliation reviews must both pass before publishing."
        : `Job ${newId} ${actualStatus === "Active" ? "published" : "saved as draft"}.`,
    );
    event.currentTarget.reset();
  };

  const attemptPublish = (jobId: string) => {
    if (!canPublish) {
      setNotice(
        "Publishing is unavailable until both company and recruiter affiliation verification pass.",
      );
      return;
    }
    if (activeJobs >= data.activeJobLimit) {
      setNotice("All active job slots are in use. Upgrade capacity to publish.");
      return;
    }
    setData((current) => ({
      ...current,
      jobs: current.jobs.map((job) =>
        job.id === jobId ? { ...job, status: "Active" } : job,
      ),
      auditEvents: [
        {
          id: `${jobId}-${Date.now()}-published`,
          title: `${jobId} published`,
          detail: "Draft published after verification",
          timestamp: Date.now(),
          status: "Active",
        },
        ...current.auditEvents,
      ],
    }));
    setNotice(`${jobId} published.`);
  };

  const exportJobs = () =>
    downloadCsv("recruiter-job-postings.csv", [
      [
        "Job ID",
        "Title",
        "Department",
        "Level",
        "Skills and weights",
        "Candidates",
        "Status",
      ],
      ...filteredJobs.map((job) => [
        job.id,
        job.title,
        job.department,
        job.level,
        job.skills
          .map((skill) => `${skill.skill}: ${skill.weight}%`)
          .join("; "),
        String(job.candidateCount),
        job.status,
      ]),
    ]);

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1440px] space-y-6">
      <header className="sticky top-0 z-20 -mx-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>RECRUITER</span>
              <span aria-hidden="true">/</span>
              <span>Job Postings</span>
              <span className="ml-0.5 size-1.5 rounded-full bg-[#F97316]" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
              Job Postings &amp; Deterministic Quotas
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Manage role templates, validated skill weights, and publishing
              capacity.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
            <label className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
              <Search
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground"
              />
              <span className="sr-only">Filter jobs, skills, or status</span>
              <input
                className={`${inputClass} min-h-9 pl-9 pr-3`}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Filter jobs, skills, or status..."
                type="search"
                value={search}
              />
            </label>
            <button
              className={quietButtonClass}
              onClick={exportJobs}
              type="button"
            >
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              Export
            </button>
            <button
              aria-label="Create job"
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#F97316] px-3.5 text-[13px] font-semibold text-[#18181B] transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => {
                setFormError("");
                setCreateOpen(true);
              }}
              type="button"
            >
              <Plus aria-hidden="true" className="size-[18px]" />
              <span className="sm:sr-only">Create Job</span>
            </button>
            <button
              aria-expanded={settingsOpen}
              aria-label="Job management settings"
              className="flex size-9 items-center justify-center self-end rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:self-auto"
              onClick={() => setSettingsOpen((open) => !open)}
              title="Job management settings"
              type="button"
            >
              <Settings2 aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
        {settingsOpen && (
          <div className="mt-3 flex flex-col gap-2 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-start gap-2">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              Weights must total exactly 100%. Publishing requires verified
              company legitimacy and recruiter affiliation.
            </span>
            <Link
              className="shrink-0 font-medium text-[#F97316] hover:underline"
              href="/recruiter/company"
            >
              Company verification
              <ArrowRight aria-hidden="true" className="ml-1 inline size-3.5" />
            </Link>
          </div>
        )}
      </header>

      <div className="min-w-0 space-y-6">
        <section
          aria-label="Job management metrics"
          className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <MetricCard
            label="Active Postings"
            value={`${activeJobs} / ${data.activeJobLimit} Slots`}
            detail="Recruiter Growth Tier • Quota OK"
            badge={`${slotsRemaining} Available`}
            Icon={BriefcaseBusiness}
            tone="brand"
          />
          <MetricCard
            label="Total Active Candidates"
            value={String(activeCandidates)}
            detail={
              `${candidatesInQueue} In Queue · ${
                data.jobs.filter((job) => job.status === "Active").length
                  ? `${data.jobs.filter((job) => job.status === "Active").length} published roles`
                  : "No published roles yet"
              }`
            }
            badge="0.0% WoW"
            Icon={Users}
            tone="neutral"
          />
          <MetricCard
            label="Pending Assessment Audits"
            value={`${pendingAudits} Flagged`}
            detail={pendingAudits ? "Snapshot review required" : "No audits pending"}
            badge="SLA 4h"
            Icon={ShieldCheck}
            tone="warning"
          />
          <MetricCard
            label="Weight Calibration State"
            value="100.0% Strict"
            detail="All weight sums validated"
            badge="Ready"
            Icon={Calculator}
            tone="success"
          />
        </section>

        <section className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#F97316]/30 bg-[#F97316]/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#F97316]/25 bg-[#F97316]/10 text-[#F97316]">
              <BriefcaseBusiness aria-hidden="true" className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Recruiter Growth Plan active: {activeJobs} of{" "}
                {data.activeJobLimit} active job slots utilized.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Company accreditation and recruiter affiliation must both pass
                review before a role can be published.
              </p>
            </div>
          </div>
          <Link
            className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 self-start rounded-lg border border-[#F97316]/40 px-3 text-xs font-semibold text-[#F97316] transition-colors hover:bg-[#F97316]/10 sm:self-auto"
            href="/recruiter/billing"
          >
            Upgrade Capacity
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </section>

        <section className={`${panelClass} space-y-4`}>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div
              aria-label="Filter jobs by status"
              className="flex min-w-0 gap-1 overflow-x-auto pb-1"
              role="tablist"
            >
              {STATUS_FILTERS.map(({ label, value }) => (
                <button
                  aria-selected={statusFilter === value}
                  className={`inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    statusFilter === value
                      ? "bg-[#F97316] text-[#18181B]"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  key={value}
                  onClick={() => setStatusFilter(value)}
                  role="tab"
                  type="button"
                >
                  {label}
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                      statusFilter === value
                        ? "bg-black/10"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {countForStatus(data.jobs, value)}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-3 xl:w-auto">
              <SelectFilter
                ariaLabel="Filter by department"
                Icon={SlidersHorizontal}
                onChange={setDepartmentFilter}
                value={departmentFilter}
              >
                <option>All Engineering</option>
                {departmentOptions.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </SelectFilter>
              <SelectFilter
                ariaLabel="Filter by level"
                onChange={setLevelFilter}
                value={levelFilter}
              >
                <option>All Levels</option>
                <option>Entry</option>
                <option>Mid</option>
                <option>Senior</option>
                <option>Lead</option>
              </SelectFilter>
              <SelectFilter
                ariaLabel="Sort jobs"
                onChange={(value) => setSort(value as JobSort)}
                value={sort}
              >
                <option>Latest Activity</option>
                <option>Oldest Activity</option>
              </SelectFilter>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-lg border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-secondary/40 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3">Job Title &amp; ID</th>
                    <th className="px-4 py-3">Deterministic Skill Weights</th>
                    <th className="px-4 py-3">Candidates &amp; Stage</th>
                    <th className="px-4 py-3">Assessment Protocol</th>
                    <th className="px-4 py-3">Status &amp; Deadline</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/80 text-[12px]">
                  {filteredJobs.map((job) => (
                    <JobRow
                      job={job}
                      key={job.id}
                      onPublish={() => attemptPublish(job.id)}
                      onStatus={setNotice}
                    />
                  ))}
                  {filteredJobs.length === 0 && (
                    <tr>
                      <td className="px-4 py-12 text-center" colSpan={6}>
                        {data.jobs.length === 0 ? (
                          <div className="mx-auto flex max-w-lg flex-col items-center">
                            <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground">
                              <BriefcaseBusiness
                                aria-hidden="true"
                                className="size-5"
                              />
                            </span>
                            <h2 className="mt-3 text-sm font-semibold text-foreground">
                              No job postings created yet
                            </h2>
                            <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
                              Create your first role template with deterministic
                              skill weights (Σ = 1.00) to begin evaluating
                              candidates.
                            </p>
                            <button
                              className="mt-4 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#F97316] px-3.5 text-xs font-semibold text-[#18181B] hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              onClick={() => setCreateOpen(true)}
                              type="button"
                            >
                              <Plus aria-hidden="true" className="size-4" />
                              Create First Job
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              No job postings match these filters
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Change the search term or filters to see other roles.
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center justify-between gap-3 border-t border-border bg-secondary/20 p-3 text-[11px] text-muted-foreground sm:flex-row">
              <p className="flex flex-wrap items-center justify-center gap-2 font-mono">
                <span>
                  Showing {filteredJobs.length} of {data.jobs.length} registered
                  role templates
                </span>
                <span aria-hidden="true">•</span>
                <span className="text-[#F97316]">
                  All weight equations sum to 1.00
                </span>
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  className="rounded border border-border px-2.5 py-1 text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
                  disabled
                  type="button"
                >
                  Previous
                </button>
                <span className="px-1 font-mono text-foreground">Page 1 of 1</span>
                <button
                  className="rounded border border-border px-2.5 py-1 text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
                  disabled
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-12">
          <div className={`${panelClass} space-y-5 xl:col-span-7`}>
            <div className="flex flex-col gap-2 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <Calculator
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#F97316]"
                />
                <h2 className="text-sm font-semibold text-foreground">
                  Active Weight Matrix &amp; Evaluation
                </h2>
              </div>
              <span className="w-fit rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                Deterministic evaluator
              </span>
            </div>
            <div className="space-y-2 rounded-lg border border-border bg-secondary/40 p-4 font-mono text-xs">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Deterministic contribution math
              </p>
              <p className="overflow-x-auto rounded border border-border bg-background p-3 text-foreground">
                <span className="text-[#F97316]">Contribution</span>(candidate,
                skill) = <span className="text-emerald-500">SkillWeight</span> ×
                (CandidateSkillScore / HighestEligibleScore)
              </p>
              <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
                Each role uses explicit, validated weights. Match results support
                human review and do not make hiring decisions.
              </p>
            </div>
            {data.jobs.length === 0 ? (
              <EmptyPanel
                title="No active weight matrix"
                detail="Create a role template to review its validated skill weights and evaluation configuration."
              />
            ) : (
              <div className="space-y-3">
                {data.jobs.map((job) => (
                  <WeightMatrix key={job.id} job={job} />
                ))}
              </div>
            )}
            <div className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
              />
              AI may support evidence-grounded explanations. Hiring decisions
              remain human-owned; automated auto-rejections are not permitted.
            </div>
          </div>

          <div className={`${panelClass} space-y-4 xl:col-span-5`}>
            <div className="flex flex-col gap-2 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <History
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#F97316]"
                />
                <h2 className="text-sm font-semibold text-foreground">
                  Recent Job &amp; Publishing Audit
                </h2>
              </div>
              <span className="w-fit font-mono text-[10px] text-muted-foreground">
                Audit history
              </span>
            </div>
            {data.auditEvents.length === 0 ? (
              <EmptyPanel
                title="No job or publishing activity yet"
                detail="Job creation and publishing actions will appear here with their current status."
              />
            ) : (
              <ol className="space-y-4">
                {data.auditEvents.map((event) => (
                  <li className="flex min-w-0 items-start gap-3" key={event.id}>
                    <span
                      className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border ${STATUS_STYLES[event.status]}`}
                    >
                      {event.status === "Active" ? (
                        <BadgeCheck aria-hidden="true" className="size-3.5" />
                      ) : (
                        <Clock3 aria-hidden="true" className="size-3.5" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-xs font-medium text-foreground">
                        {event.title}
                      </p>
                      <p className="mt-1 break-words text-[11px] text-muted-foreground">
                        {event.detail}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                        {formatRelativeTime(event.timestamp)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            <div className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <FileCheck2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              Locally recorded preview activity is not a backend audit record.
            </div>
          </div>
        </section>
      </div>

      {createOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/65 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCreateOpen(false);
          }}
        >
          <section
            aria-labelledby="create-job-title"
            aria-modal="true"
            className="my-auto w-full max-w-2xl rounded-xl border border-border bg-card shadow-xl"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div>
                <h2
                  className="text-base font-semibold text-foreground"
                  id="create-job-title"
                >
                  Create job posting
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Define a role and calibrate three skills to a strict 100% total.
                </p>
              </div>
              <button
                aria-label="Close create job form"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setCreateOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <form className="space-y-5 p-5" onSubmit={createJob}>
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  id="job-title"
                  label="Job title"
                  name="title"
                  placeholder="e.g., Backend Systems Engineer"
                />
                <FormField
                  id="job-department"
                  label="Department"
                  name="department"
                  placeholder="e.g., Platform Engineering"
                />
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    htmlFor="job-level"
                  >
                    Level
                  </label>
                  <select
                    className={inputClass}
                    defaultValue="Mid"
                    id="job-level"
                    name="level"
                  >
                    <option>Entry</option>
                    <option>Mid</option>
                    <option>Senior</option>
                    <option>Lead</option>
                  </select>
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    htmlFor="job-status"
                  >
                    Initial status
                  </label>
                  <select
                    className={inputClass}
                    defaultValue="Draft"
                    id="job-status"
                    name="status"
                  >
                    <option>Draft</option>
                    <option>Active</option>
                  </select>
                </div>
              </div>

              <fieldset className="min-w-0 space-y-3 rounded-lg border border-border bg-secondary/30 p-4">
                <legend className="px-1 text-xs font-semibold text-foreground">
                  Deterministic skill weights (Σ = 1.00)
                </legend>
                <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
                  <SkillField
                    id="skill-one"
                    label="Skill 1"
                    name="skill1"
                    weightName="weight1"
                    defaultWeight={50}
                  />
                  <SkillField
                    id="skill-two"
                    label="Skill 2"
                    name="skill2"
                    weightName="weight2"
                    defaultWeight={30}
                  />
                  <SkillField
                    id="skill-three"
                    label="Skill 3"
                    name="skill3"
                    weightName="weight3"
                    defaultWeight={20}
                  />
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Each weight must be a whole percentage from 0 to 100. The three
                  weights must total exactly 100%.
                </p>
              </fieldset>

              {!canPublish && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-300/50 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  Company and recruiter affiliation are not verified. Choosing
                  Active will save this role as Pending Verification; it will not
                  be published or consume an active slot.
                </div>
              )}
              {formError && (
                <p
                  aria-live="assertive"
                  className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive"
                >
                  {formError}
                </p>
              )}
              <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
                <button
                  className={quietButtonClass}
                  onClick={() => setCreateOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#F97316] px-4 text-xs font-semibold text-[#18181B] hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  type="submit"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  Create Job
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {notice && (
        <div
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-2 rounded-lg border border-border bg-card p-3 text-xs text-foreground shadow-lg"
        >
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          <span>{notice}</span>
          <button
            aria-label="Dismiss notification"
            className="ml-auto shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => setNotice("")}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  badge,
  Icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  badge: string;
  Icon: LucideIcon;
  tone: "brand" | "neutral" | "warning" | "success";
}) {
  const iconTone = {
    brand:
      "border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316]",
    neutral: "border-border bg-secondary text-muted-foreground",
    warning:
      "border-amber-300/60 bg-amber-50 text-amber-700 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-300",
    success:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-[#1A3D2C] dark:bg-[#13281E] dark:text-emerald-300",
  }[tone];
  const badgeTone =
    tone === "success"
      ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-[#1A3D2C] dark:bg-[#13281E] dark:text-emerald-300"
      : tone === "brand"
        ? "border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316]"
        : tone === "warning"
          ? "border-amber-300/60 bg-amber-50 text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200"
          : "border-border bg-secondary text-muted-foreground";
  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/80 dark:border-[#25252A] dark:bg-[#151518]">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-xs font-medium text-muted-foreground">{label}</h2>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-md border ${iconTone}`}
        >
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </div>
      <p className="break-words text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
        {value}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2">
        <span className="text-[11px] text-muted-foreground">{detail}</span>
        <span
          className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${badgeTone}`}
        >
          {badge}
        </span>
      </div>
    </article>
  );
}

function SelectFilter({
  ariaLabel,
  children,
  Icon,
  onChange,
  value,
}: {
  ariaLabel: string;
  children: ReactNode;
  Icon?: LucideIcon;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="relative flex min-w-0 items-center">
      {Icon && (
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground"
        />
      )}
      <select
        aria-label={ariaLabel}
        className={`min-h-9 w-full appearance-none rounded-lg border border-border bg-background py-2 pr-8 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          Icon ? "pl-8" : "pl-3"
        }`}
        onChange={(event) => onChange(event.currentTarget.value)}
        value={value}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 size-3.5 text-muted-foreground"
      />
    </label>
  );
}

function JobRow({
  job,
  onPublish,
  onStatus,
}: {
  job: JobPostingItem;
  onPublish: () => void;
  onStatus: (message: string) => void;
}) {
  const applicantHref = `/recruiter/applicants?jobId=${encodeURIComponent(job.id)}`;
  const actionLabel =
    job.status === "Active"
      ? "Inspect Applicants"
      : job.status === "Draft"
        ? "Edit / Publish"
        : "View Status";
  return (
    <tr className="transition-colors hover:bg-secondary/40">
      <td className="max-w-[260px] px-4 py-3.5 align-top">
        <p className="break-words font-semibold text-foreground">{job.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono">
            #{job.id}
          </span>
          <span>
            {job.department} • {job.level}
          </span>
        </div>
      </td>
      <td className="min-w-[220px] px-4 py-3.5 align-top">
        <div className="flex flex-wrap items-center gap-1.5">
          {job.skills.map((skill, index) => (
            <span
              className="rounded border border-border bg-secondary/70 px-2 py-0.5 font-mono text-[10px]"
              key={`${skill.skill}-${index}`}
              style={{ color: SKILL_COLORS[index] }}
            >
              {skill.skill}: {skill.weight}%
            </span>
          ))}
          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
            Σ = 1.00
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5 align-top">
        <p
          className={
            job.candidateCount
              ? "font-semibold text-foreground"
              : "text-muted-foreground"
          }
        >
          {job.candidateCount} Candidates
        </p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">
          {job.inQueue} In Review • 0 Shortlisted • 0 Interview
        </p>
      </td>
      <td className="px-4 py-3.5 align-top">
        <p className="flex items-center gap-1.5 text-xs font-medium text-foreground">
          {job.assessmentProtocol === "Not configured" ? (
            <Clock3
              aria-hidden="true"
              className="size-3.5 shrink-0 text-amber-500"
            />
          ) : (
            <ShieldCheck
              aria-hidden="true"
              className="size-3.5 shrink-0 text-emerald-500"
            />
          )}
          {job.assessmentProtocol}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Configure assessment after role setup
        </p>
      </td>
      <td className="px-4 py-3.5 align-top">
        <span
          className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[job.status]}`}
        >
          {job.status === "Active" ? (
            <BadgeCheck aria-hidden="true" className="size-3" />
          ) : (
            <Clock3 aria-hidden="true" className="size-3" />
          )}
          {job.status}
        </span>
        <p className="mt-1.5 text-[10px] text-muted-foreground">
          {job.status === "Pending Verification"
            ? "Company review required"
            : job.status === "Active"
              ? "No deadline set"
              : "Not published"}
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-right align-top">
        {job.status === "Active" ? (
          <Link
            className="inline-flex min-h-8 items-center justify-center rounded-md border border-border bg-background px-2.5 text-[10px] font-medium text-foreground hover:bg-secondary"
            href={applicantHref}
          >
            {actionLabel}
          </Link>
        ) : job.status === "Draft" ? (
          <button
            className="inline-flex min-h-8 items-center justify-center rounded-md border border-border bg-background px-2.5 text-[10px] font-medium text-foreground hover:bg-secondary"
            onClick={onPublish}
            type="button"
          >
            {actionLabel}
          </button>
        ) : (
          <button
            className="inline-flex min-h-8 items-center justify-center rounded-md border border-border bg-background px-2.5 text-[10px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            onClick={() =>
              onStatus(
                job.status === "Pending Verification"
                  ? "Company and recruiter affiliation reviews must both pass before publishing."
                  : `This role is ${job.status.toLowerCase()}.`,
              )
            }
            type="button"
          >
            {actionLabel}
          </button>
        )}
      </td>
    </tr>
  );
}

function WeightMatrix({ job }: { job: JobPostingItem }) {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-secondary/30 p-3.5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="break-words text-xs font-medium text-foreground">
          {job.title}
        </p>
        <span className="shrink-0 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
          Σ = 100% (Strict)
        </span>
      </div>
      <div
        aria-label={`Skill weight distribution for ${job.title}`}
        className="flex h-2.5 overflow-hidden rounded-full border border-border bg-background"
      >
        {job.skills.map((skill, index) => (
          <span
            key={`${skill.skill}-${index}`}
            style={{
              backgroundColor: SKILL_COLORS[index],
              width: `${skill.weight}%`,
            }}
            title={`${skill.skill}: ${skill.weight}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {job.skills.map((skill, index) => (
          <span
            className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
            key={`${skill.skill}-${index}`}
          >
            <span
              className="size-2 shrink-0 rounded-sm"
              style={{ backgroundColor: SKILL_COLORS[index] }}
            />
            {skill.skill} — <strong>{skill.weight}%</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function EmptyPanel({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border px-4 py-7 text-center">
      <CircleHelp
        aria-hidden="true"
        className="mx-auto size-5 text-muted-foreground"
      />
      <p className="mt-2 text-xs font-medium text-foreground">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-[11px] leading-relaxed text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

function FormField({
  id,
  label,
  name,
  placeholder,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="min-w-0">
      <label
        className="mb-1.5 block text-xs font-medium text-muted-foreground"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={inputClass}
        id={id}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

function SkillField({
  id,
  label,
  name,
  weightName,
  defaultWeight,
}: {
  id: string;
  label: string;
  name: string;
  weightName: string;
  defaultWeight: number;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label
        className="block text-[11px] font-medium text-muted-foreground"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={inputClass}
        id={id}
        name={name}
        placeholder="Skill name"
        required
      />
      <label className="sr-only" htmlFor={`${id}-weight`}>
        {label} weight percentage
      </label>
      <div className="relative">
        <input
          className={`${inputClass} pr-8 font-mono`}
          defaultValue={defaultWeight}
          id={`${id}-weight`}
          max={100}
          min={0}
          name={weightName}
          required
          type="number"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          %
        </span>
      </div>
    </div>
  );
}
