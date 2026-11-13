"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  CircleHelp,
  Download,
  History,
  Info,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Timeframe = "7D" | "30D" | "90D";
type EventTone = "warning" | "success" | "neutral";
type JobWindow = "All" | "ClosingSoon";

interface RecruiterDashboardMetric {
  value: number;
  description: string;
  badge: string;
}

interface ThroughputSeries {
  labels: string[];
  approved: number[];
  flagged: number[];
  approvedTotal: number;
  flaggedTotal: number;
}

interface PipelineStage {
  id: string;
  label: string;
  count: number;
  color: string;
}

interface JobOpening {
  id: string;
  title: string;
  skills: string[];
  applicants: number;
  daysRemaining: number;
  status: "Active";
}

interface HiringEvent {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: EventTone;
  Icon: LucideIcon;
}

export interface RecruiterDashboardData {
  activeJobs: RecruiterDashboardMetric;
  newApplicants: RecruiterDashboardMetric;
  pendingReviews: RecruiterDashboardMetric;
  shortlistedTalent: RecruiterDashboardMetric;
  throughput: Record<Timeframe, ThroughputSeries>;
  pipeline: PipelineStage[];
  jobOpenings: JobOpening[];
  hiringEvents: HiringEvent[];
}

const EMPTY_LABELS: Record<Timeframe, string[]> = {
  "7D": ["6d ago", "5d ago", "4d ago", "3d ago", "2d ago", "Yesterday", "Today"],
  "30D": ["30d ago", "25d ago", "20d ago", "15d ago", "10d ago", "5d ago", "Today"],
  "90D": ["90d ago", "75d ago", "60d ago", "45d ago", "30d ago", "15d ago", "Today"],
};

const emptySeries = (timeframe: Timeframe): ThroughputSeries => ({
  labels: EMPTY_LABELS[timeframe],
  approved: Array.from({ length: 7 }, () => 0),
  flagged: Array.from({ length: 7 }, () => 0),
  approvedTotal: 0,
  flaggedTotal: 0,
});

const INITIAL_EMPTY_DATA: RecruiterDashboardData = {
  activeJobs: {
    value: 0,
    description: "0 of 5 allocated",
    badge: "5 Slots Available",
  },
  newApplicants: {
    value: 0,
    description: "Awaiting job postings",
    badge: "0.0% WoW",
  },
  pendingReviews: {
    value: 0,
    description: "Human integrity queue",
    badge: "Review SLA 4h",
  },
  shortlistedTalent: {
    value: 0,
    description: "Deterministic match",
    badge: "0 In Pipeline",
  },
  throughput: {
    "7D": emptySeries("7D"),
    "30D": emptySeries("30D"),
    "90D": emptySeries("90D"),
  },
  pipeline: [
    { id: "review", label: "Under Review", count: 0, color: "#E5933A" },
    { id: "shortlisted", label: "Shortlisted", count: 0, color: "#4ADE80" },
    {
      id: "interview",
      label: "Technical Interview",
      count: 0,
      color: "#95CCFF",
    },
    {
      id: "decision",
      label: "Final Offer Decision",
      count: 0,
      color: "#D4621A",
    },
  ],
  jobOpenings: [],
  hiringEvents: [],
};

const chartX = [70, 170, 270, 370, 470, 570, 670];
const chartY = [20, 60, 100, 140, 148];
const panelClass =
  "min-w-0 rounded-xl border border-border bg-card p-4 dark:border-[#25252A] dark:bg-[#151518] sm:p-5";
const quietButtonClass =
  "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function chartPolyline(values: number[]) {
  return values
    .map((value, index) => {
      const y = 148 - (value / 40) * 128;
      return `${chartX[index]},${y}`;
    })
    .join(" ");
}

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

export default function RecruiterDashboardPage() {
  const [data] = useState<RecruiterDashboardData>(INITIAL_EMPTY_DATA);
  const [timeframe, setTimeframe] = useState<Timeframe>("7D");
  const [search, setSearch] = useState("");
  const [jobWindow, setJobWindow] = useState<JobWindow>("All");
  const chart = data.throughput[timeframe];
  const normalizedSearch = search.trim().toLowerCase();
  const pipelineTotal = data.pipeline.reduce((total, stage) => total + stage.count, 0);
  const hasThroughputData =
    chart.approvedTotal > 0 ||
    chart.flaggedTotal > 0 ||
    chart.approved.some((value) => value > 0) ||
    chart.flagged.some((value) => value > 0);

  const filteredJobs = useMemo(
    () =>
      data.jobOpenings.filter((job) => {
        const matchesSearch =
          !normalizedSearch ||
          `${job.title} ${job.skills.join(" ")}`
            .toLowerCase()
            .includes(normalizedSearch);
        const matchesWindow =
          jobWindow === "All" || job.daysRemaining <= 14;
        return matchesSearch && matchesWindow;
      }),
    [data.jobOpenings, jobWindow, normalizedSearch],
  );

  const filteredEvents = useMemo(
    () =>
      data.hiringEvents.filter((event) =>
        `${event.title} ${event.detail}`
          .toLowerCase()
          .includes(normalizedSearch),
      ),
    [data.hiringEvents, normalizedSearch],
  );

  const resetFilters = () => {
    setSearch("");
    setJobWindow("All");
    setTimeframe("7D");
  };

  const exportJobs = () =>
    downloadCsv("recruiter-job-openings.csv", [
      ["Role", "Skills and weights", "Applicants", "Days remaining", "Status"],
      ...filteredJobs.map((job) => [
        job.title,
        job.skills.join("; "),
        String(job.applicants),
        String(job.daysRemaining),
        job.status,
      ]),
    ]);

  const exportEvents = () =>
    downloadCsv("recruiter-hiring-events.csv", [
      ["Event", "Details", "Time"],
      ...filteredEvents.map((event) => [event.title, event.detail, event.time]),
    ]);

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1440px] space-y-6">
      <header className="sticky top-0 z-20 -mx-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>Recruiter</span>
              <span aria-hidden="true">/</span>
              <span>Overview</span>
              <span className="ml-0.5 size-1.5 rounded-full bg-[#D4621A]" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
              Recruitment Operations &amp; Pipeline
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              No recruiter data connected yet. Dashboard metrics populate when jobs
              and candidates are connected.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
            <label className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
              <Search
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground"
              />
              <span className="sr-only">Search jobs and candidates</span>
              <input
                className="h-9 w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-[#161619]"
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Search jobs or candidates..."
                type="search"
                value={search}
              />
            </label>
            <Link
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/recruiter/jobs/new"
            >
              <Plus aria-hidden="true" className="size-[18px]" />
              Post New Job
            </Link>
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                aria-label="Export filtered job openings to CSV"
                className="flex size-9 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground dark:bg-[#161619]"
                onClick={exportJobs}
                title="Export filtered job openings to CSV"
                type="button"
              >
                <Download aria-hidden="true" className="size-[18px]" />
              </button>
              <button
                aria-label="Reset dashboard filters"
                className="flex size-9 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground dark:bg-[#161619]"
                onClick={resetFilters}
                title="Reset dashboard filters"
                type="button"
              >
                <RefreshCw aria-hidden="true" className="size-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="min-w-0 space-y-6">
        <section
          aria-label="Recruiter operational metrics"
          className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <MetricCard
            label="Active Jobs"
            metric={data.activeJobs}
            Icon={BriefcaseBusiness}
            iconTone="brand"
            badgeTone="success"
          />
          <MetricCard
            label="New Applicants"
            metric={data.newApplicants}
            Icon={Users}
            iconTone="neutral"
            badgeTone="neutral"
          />
          <MetricCard
            label="Pending Reviews"
            metric={data.pendingReviews}
            Icon={ShieldCheck}
            iconTone="warning"
            badgeTone="neutral"
          />
          <MetricCard
            label="Shortlisted Talent"
            metric={data.shortlistedTalent}
            Icon={UserRoundCheck}
            iconTone="success"
            badgeTone="neutral"
          />
        </section>

        <section
          aria-label="Hiring throughput and pipeline composition"
          className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-12"
        >
          <div className={`${panelClass} flex flex-col justify-between xl:col-span-8`}>
            <div className="flex flex-col justify-between gap-3 pb-4 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  Candidate Evaluation Throughput
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Applications ingested and deterministic match scores calculated
                </p>
              </div>
              <div
                aria-label="Chart timeframe"
                className="inline-flex shrink-0 self-start rounded-lg border border-border bg-secondary p-0.5 font-mono text-xs dark:border-[#2C2C32] dark:bg-[#1C1C20]"
                role="group"
              >
                {(["7D", "30D", "90D"] as const).map((range) => (
                  <button
                    aria-pressed={timeframe === range}
                    className={`min-h-8 rounded-md px-2.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      timeframe === range
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    key={range}
                    onClick={() => setTimeframe(range)}
                    type="button"
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative my-1 h-44 w-full min-w-0">
              <ThroughputChart
                data={chart}
                timeframe={timeframe}
                isEmpty={!hasThroughputData}
              />
              {!hasThroughputData && (
                <p className="pointer-events-none absolute inset-x-10 top-1/2 -translate-y-1/2 text-center text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                  No evaluation telemetry yet — metrics will populate automatically
                  once jobs &amp; candidates are connected.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs dark:border-[#222227]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <LegendItem
                  color="#E56218"
                  label="Approved & Ranked"
                  value={chart.approvedTotal}
                />
                <LegendItem
                  color="#F43F5E"
                  label="Flagged for Review"
                  value={chart.flaggedTotal}
                  line
                />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                No trend data
              </span>
            </div>
          </div>

          <div className={`${panelClass} flex flex-col justify-between xl:col-span-4`}>
            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Pipeline Composition
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Candidates by hiring funnel stage
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {pipelineTotal} total
                </span>
              </div>
              {pipelineTotal === 0 && (
                <p className="mt-5 text-xs text-muted-foreground">
                  Pipeline stages will appear when candidates enter the hiring
                  process.
                </p>
              )}
              <div className="mt-5 space-y-3.5">
                {data.pipeline.map((stage) => {
                  const percentage =
                    pipelineTotal > 0
                      ? Math.round((stage.count / pipelineTotal) * 100)
                      : 0;
                  return (
                    <div key={stage.id}>
                      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                        <span className="flex min-w-0 items-center gap-1.5 font-medium text-foreground">
                          <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: stage.color }}
                          />
                          {stage.label}
                        </span>
                        <span className="shrink-0 font-mono text-[11px]">
                          <span className="font-semibold text-foreground">
                            {percentage}%
                          </span>
                          <span className="ml-1 text-muted-foreground">
                            ({stage.count})
                          </span>
                        </span>
                      </div>
                      <div
                        aria-label={`${stage.label}: ${percentage}% (${stage.count})`}
                        aria-valuemax={100}
                        aria-valuemin={0}
                        aria-valuenow={percentage}
                        className="h-1.5 w-full overflow-hidden rounded-full bg-secondary dark:bg-[#1C1C20]"
                        role="progressbar"
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: stage.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-secondary/60 p-2.5 dark:border-[#27272C] dark:bg-[#17171B]">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              />
              <p className="text-[11px] leading-tight text-muted-foreground">
                Deterministic weights re-rank candidate pools when assessment
                evidence is updated.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label="Active jobs and recent hiring events"
          className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-12"
        >
          <div className={`${panelClass} flex flex-col justify-between xl:col-span-7`}>
            <div className="min-w-0">
              <div className="flex flex-col gap-3 border-b border-border pb-3 dark:border-[#222227] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Active Job Openings
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Deterministic skill weighting &amp; applicant queues
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="sr-only" htmlFor="job-window">
                    Filter job openings by closing window
                  </label>
                  <select
                    className="h-8 rounded-md border border-input bg-card px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-[#161619]"
                    id="job-window"
                    onChange={(event) =>
                      setJobWindow(
                        event.currentTarget.value === "ClosingSoon"
                          ? "ClosingSoon"
                          : "All",
                      )
                    }
                    value={jobWindow}
                  >
                    <option value="All">All open jobs</option>
                    <option value="ClosingSoon">Closing in 14 days</option>
                  </select>
                  <Link
                    className="inline-flex min-h-8 items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href="/recruiter/jobs"
                  >
                    View all ({data.jobOpenings.length})
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-muted-foreground dark:border-[#222227]">
                        <th className="py-2.5 pr-2 font-medium">Role &amp; Weights</th>
                        <th className="px-3 py-2.5 text-center font-medium">
                          Applicants
                        </th>
                        <th className="px-3 py-2.5 text-right font-medium">
                          Window
                        </th>
                        <th className="py-2.5 pl-3 text-right font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border dark:divide-[#222227]">
                      {filteredJobs.map((job) => (
                        <tr
                          className="transition-colors hover:bg-secondary/60 dark:hover:bg-[#1A1A1E]"
                          key={job.id}
                        >
                          <td className="py-3 pr-2">
                            <div className="flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                              <span>{job.title}</span>
                              <span
                                aria-label="Active"
                                className="size-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-[#4ADE80]"
                              />
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                              {job.skills.map((skill) => (
                                <span
                                  className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 dark:border-[#27272C] dark:bg-[#17171B]"
                                  key={skill}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center align-middle">
                            <span className="font-mono text-[13px] font-semibold text-foreground">
                              {job.applicants}
                            </span>
                            <span className="block text-[10px] text-muted-foreground">
                              in queue
                            </span>
                          </td>
                          <td className="px-3 py-3 text-right align-middle font-mono text-[11px] text-muted-foreground">
                            {job.daysRemaining}d left
                          </td>
                          <td className="py-3 pl-3 text-right align-middle">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                className={quietButtonClass}
                                href="/recruiter/jobs"
                              >
                                Inspect
                              </Link>
                              <Link
                                aria-label={`Edit ${job.title} weights`}
                                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                href="/recruiter/jobs"
                                title="Edit weights"
                              >
                                <SlidersHorizontal
                                  aria-hidden="true"
                                  className="size-4"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <BriefcaseBusiness
                    aria-hidden="true"
                    className="mx-auto size-5 text-muted-foreground"
                  />
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {data.jobOpenings.length === 0
                      ? "No active job postings yet"
                      : "No matching job openings"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {data.jobOpenings.length === 0
                      ? "Create a job to start receiving applications."
                      : "Try another search term or clear the current filters."}
                  </p>
                  {data.jobOpenings.length === 0 ? (
                    <Link
                      className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      href="/recruiter/jobs/new"
                    >
                      <Plus aria-hidden="true" className="size-4" />
                      Create a job
                    </Link>
                  ) : (
                    <button
                      className="mt-3 text-xs font-medium text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={resetFilters}
                      type="button"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground dark:border-[#222227]">
              <span className="font-mono">Config: deterministic_evaluator_v1.3</span>
              <span className="text-foreground">
                Weight totals validate when requirements are added.
              </span>
            </div>
          </div>

          <div className={`${panelClass} flex flex-col justify-between xl:col-span-5`}>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3 dark:border-[#222227]">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Recent Hiring &amp; Assessment Events
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Hiring activity and integrity updates
                  </p>
                </div>
                <History
                  aria-hidden="true"
                  className="size-[18px] shrink-0 text-muted-foreground"
                />
              </div>

              {filteredEvents.length > 0 ? (
                <div className="divide-y divide-border dark:divide-[#222227]">
                  {filteredEvents.map((event) => (
                    <EventRow event={event} key={event.id} />
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-xs text-muted-foreground">
                  {data.hiringEvents.length === 0
                    ? "Hiring and assessment events will appear here."
                    : "No hiring events match this search."}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 dark:border-[#222227]">
              <span className="font-mono text-[11px] text-muted-foreground">
                Audit trail
              </span>
              <button
                className="inline-flex min-h-8 items-center gap-1 text-[11px] font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={exportEvents}
                type="button"
              >
                <Download aria-hidden="true" className="size-3.5" />
                Export Audit Trail
              </button>
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-start justify-between gap-2 border-t border-border py-4 text-[11px] text-muted-foreground dark:border-[#1C1C20] sm:flex-row sm:items-center">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-[#4ADE80]" />
            TalentGraph recruiter shell · Hiring decisions remain human-owned
          </span>
          <span className="inline-flex items-center gap-1">
            <CircleHelp aria-hidden="true" className="size-3.5" />
            Need help with verification or weights? Contact recruiter support.
          </span>
        </footer>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  metric,
  Icon,
  iconTone,
  badgeTone,
}: {
  label: string;
  metric: RecruiterDashboardMetric;
  Icon: LucideIcon;
  iconTone: "brand" | "success" | "warning" | "neutral";
  badgeTone: "success" | "neutral";
}) {
  const iconToneClass = {
    brand: "text-[#D4621A]",
    success: "text-emerald-700 dark:text-[#4ADE80]",
    warning: "text-amber-700 dark:text-[#E5933A]",
    neutral: "text-muted-foreground",
  }[iconTone];
  const badgeToneClass = {
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-[#1A3D2C] dark:bg-[#13281E] dark:text-[#4ADE80]",
    neutral: "border-border bg-secondary text-muted-foreground",
  }[badgeTone];

  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-4 dark:border-[#25252A] dark:bg-[#151518]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="block text-xs font-medium text-muted-foreground">
            {label}
          </h2>
          <p className="mt-1 font-mono text-2xl font-bold leading-none tracking-tight text-foreground">
            {metric.value}
          </p>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary dark:border-[#2B2B32] dark:bg-[#1F1F24]">
          <Icon aria-hidden="true" className={`size-[18px] ${iconToneClass}`} />
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-[11px] dark:border-[#222227]">
        <span className="text-muted-foreground">{metric.description}</span>
        <span
          className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${badgeToneClass}`}
        >
          {metric.badge}
        </span>
      </div>
    </article>
  );
}

function ThroughputChart({
  data,
  timeframe,
  isEmpty,
}: {
  data: ThroughputSeries;
  timeframe: Timeframe;
  isEmpty: boolean;
}) {
  return (
    <svg
      aria-label={`Candidate evaluation throughput for the last ${timeframe}`}
      className="size-full overflow-visible"
      preserveAspectRatio="none"
      role="img"
      viewBox="0 0 760 176"
    >
      {chartY.slice(0, 4).map((y, index) => (
        <g key={y}>
          <line
            className="stroke-border dark:stroke-[#25252A]"
            stroke="#E4E4E7"
            strokeDasharray="3,3"
            strokeWidth="1"
            x1="40"
            x2="750"
            y1={y}
            y2={y}
          />
          <text
            fill="#71717A"
            fontFamily="monospace"
            fontSize="10"
            textAnchor="end"
            x="32"
            y={y + 4}
          >
            {40 - index * 10}
          </text>
        </g>
      ))}
      <line
        className="dark:stroke-[#2A2A30]"
        stroke="#E4E4E7"
        strokeWidth="1.5"
        x1="40"
        x2="750"
        y1="148"
        y2="148"
      />
      <text
        fill="#71717A"
        fontFamily="monospace"
        fontSize="10"
        textAnchor="end"
        x="32"
        y="152"
      >
        0
      </text>
      <polyline
        fill="none"
        points={chartPolyline(data.approved)}
        stroke="#E56218"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <polyline
        fill="none"
        points={chartPolyline(data.flagged)}
        stroke="#F43F5E"
        strokeDasharray="2,2"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      {data.labels.map((label, index) => (
        <text
          fill="#71717A"
          fontFamily="monospace"
          fontSize="10"
          key={label}
          textAnchor="middle"
          x={chartX[index]}
          y="166"
        >
          {label}
        </text>
      ))}
      {isEmpty && (
        <title>
          No evaluation telemetry yet. Approved and flagged counts are zero.
        </title>
      )}
    </svg>
  );
}

function LegendItem({
  color,
  label,
  value,
  line = false,
}: {
  color: string;
  label: string;
  value: number;
  line?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className={`inline-block ${line ? "h-0.5 w-2.5" : "size-2.5 rounded-full"}`}
        style={{ backgroundColor: color }}
      />
      <span className="text-foreground">{label}:</span>
      <span className="font-mono font-medium text-foreground">{value}</span>
    </span>
  );
}

function EventRow({ event }: { event: HiringEvent }) {
  const toneClass = {
    warning:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-[#E5933A]",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-[#1A3D2C] dark:bg-[#13281E] dark:text-[#4ADE80]",
    neutral:
      "border-border bg-secondary text-muted-foreground dark:border-[#2B2B32] dark:bg-[#1F1F24] dark:text-[#A1A1AA]",
  }[event.tone];
  const Icon = event.Icon;

  return (
    <article className="group -mx-2 flex items-start gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-secondary/60 dark:hover:bg-[#1A1A1E]">
      <span
        className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border ${toneClass}`}
      >
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium leading-snug text-foreground">
          {event.title}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-muted-foreground">
          <span>{event.detail}</span>
          <span aria-hidden="true">·</span>
          <time className="font-mono">{event.time}</time>
        </p>
      </div>
      <ChevronRight
        aria-hidden="true"
        className="mt-1 size-4 shrink-0 text-[#52525B] transition-colors group-hover:text-foreground"
      />
    </article>
  );
}
