"use client";

import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpDown,
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  History,
  RefreshCw,
  Search,
  Terminal,
  Users,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";

export interface ApplicantSkillContribution {
  skill: string;
  contribution: number;
  maxContribution: number;
  color: string;
}

export interface ApplicantEvidence {
  id: string;
  title: string;
  detail: string;
  score?: number;
  status: "verified" | "pending" | "flagged";
}

export interface ApplicantItem {
  id: string;
  rank: number;
  name: string;
  handle: string;
  commitReferences: string[];
  location: string;
  score: number;
  percentile: string;
  stage: string;
  sandboxStatus: "complete" | "pending" | "flagged";
  sandboxScore: number;
  snapshotsMatched: number;
  snapshotCount: number;
  skillContributions: ApplicantSkillContribution[];
  evidence: ApplicantEvidence[];
}

export interface ApplicantsPageData {
  metrics: {
    totalApplicants: number;
    newToday: number;
    applicantsWindow: string;
    highestFit: number;
    highestFitPercentile: string;
    highestFitRank: string;
    sandboxesCompleted: number;
    sandboxTotal: number;
    investigationCases: number;
    investigationSubtitle: string;
  };
  role: {
    title: string;
    jobId: string;
    status: string;
    subtitle: string;
    weights: Array<{ skill: string; weight: number }>;
  };
  qualifiedCount: number;
  applicants: ApplicantItem[];
  ledgerProofHash: string | null;
}

export const INITIAL_APPLICANTS_DATA: ApplicantsPageData = {
  metrics: {
    totalApplicants: 0,
    newToday: 0,
    applicantsWindow: "Across 14d window",
    highestFit: 0,
    highestFitPercentile: "No Ranked Pool",
    highestFitRank: "No Rank",
    sandboxesCompleted: 0,
    sandboxTotal: 0,
    investigationCases: 0,
    investigationSubtitle: "No investigation snapshots",
  },
  role: {
    title: "No Active Role Selected",
    jobId: "No Job ID",
    status: "Awaiting role",
    subtitle:
      "Select a published job role or connect recruiter data to inspect ranked applicants",
    weights: [],
  },
  qualifiedCount: 0,
  applicants: [],
  ledgerProofHash: null,
};

interface ApplicantsRankingsViewProps {
  data?: ApplicantsPageData;
}

const panelClass =
  "min-w-0 rounded-[12px] border border-[#25252A] bg-[#121417]";
const quietButtonClass =
  "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-[8px] border border-[#27272C] bg-[#161619] px-3 text-xs font-medium text-[#D4D4D8] transition-colors hover:border-[#3F3F46] hover:text-white disabled:cursor-not-allowed disabled:opacity-50";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function downloadApplicantsCsv(applicants: ApplicantItem[]) {
  const rows = [
    ["Rank", "Name", "Handle", "Location", "Score", "Stage", "Sandbox"],
    ...applicants.map((applicant) => [
      String(applicant.rank),
      applicant.name,
      applicant.handle,
      applicant.location,
      applicant.score.toFixed(1),
      applicant.stage,
      applicant.sandboxStatus,
    ]),
  ];
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
  link.download = "applicants-rankings.csv";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function ApplicantsRankingsView({
  data = INITIAL_APPLICANTS_DATA,
}: ApplicantsRankingsViewProps) {
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [thresholdFilter, setThresholdFilter] = useState("all");
  const [sandboxFilter, setSandboxFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
    null,
  );

  const filteredApplicants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.applicants
      .filter((applicant) => {
        const matchesQuery =
          !normalizedQuery ||
          [
            applicant.name,
            applicant.handle,
            ...applicant.commitReferences,
            applicant.location,
            applicant.score.toFixed(1),
          ].some((value) => value.toLowerCase().includes(normalizedQuery));
        const matchesStage =
          stageFilter === "all" || applicant.stage === stageFilter;
        const matchesThreshold =
          thresholdFilter === "all" ||
          (thresholdFilter === "qualified" && applicant.score > 85) ||
          (thresholdFilter === "below" && applicant.score <= 85);
        const matchesSandbox =
          sandboxFilter === "all" ||
          applicant.sandboxStatus === sandboxFilter;
        return (
          matchesQuery && matchesStage && matchesThreshold && matchesSandbox
        );
      })
      .sort((left, right) =>
        sortDirection === "desc"
          ? right.score - left.score
          : left.score - right.score,
      );
  }, [
    data.applicants,
    query,
    sandboxFilter,
    sortDirection,
    stageFilter,
    thresholdFilter,
  ]);

  const selectedApplicant =
    data.applicants.find((applicant) => applicant.id === selectedApplicantId) ??
    null;
  const allVisibleSelected =
    filteredApplicants.length > 0 &&
    filteredApplicants.every((applicant) => selectedIds.has(applicant.id));

  function toggleApplicantSelection(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  }

  function resetFilters() {
    setQuery("");
    setStageFilter("all");
    setThresholdFilter("all");
    setSandboxFilter("all");
    setSortDirection("desc");
  }

  return (
    <div className="min-w-0 w-full bg-[#0B0C0E] text-[#D4D4D8]">
      <header className="sticky top-0 z-20 border-b border-[#222226] bg-[#121417]/95 px-4 py-4 backdrop-blur sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#71717A]"
            >
              <span>RECRUITER</span>
              <span aria-hidden="true">/</span>
              <span>JOBS</span>
              <span aria-hidden="true">/</span>
              <span>ALL ROLES</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#F97316]">APPLICANTS &amp; RANKINGS</span>
              <span className="text-[#3F3F46]">•</span>
            </nav>
            <h1 className="text-[22px] font-bold tracking-tight text-white sm:text-[24px]">
              Applicants &amp; Deterministic Rankings
            </h1>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <label className="relative w-full min-w-0 sm:w-64">
              <Search
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 size-[18px] -translate-y-1/2 text-[#71717A]"
              />
              <input
                className="min-h-9 w-full rounded-[8px] border border-[#27272C] bg-[#161619] py-1.5 pl-9 pr-3 text-[13px] text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none sm:w-64"
                aria-label="Filter applicants by handle, commit, or score"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by handle, commit, or score..."
                type="search"
                value={query}
              />
            </label>
            <button
              className={quietButtonClass}
              onClick={() => downloadApplicantsCsv(filteredApplicants)}
              type="button"
            >
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              Export CSV
            </button>
            <button
              aria-label="Audit history"
              className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#27272C] bg-[#161619] text-[#71717A] transition-colors hover:text-white"
              title="Audit history"
              type="button"
            >
              <History aria-hidden="true" className="size-[18px]" />
            </button>
            <button
              aria-label="Reset filters"
              className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#27272C] bg-[#161619] text-[#71717A] transition-colors hover:text-white"
              onClick={resetFilters}
              title="Reset filters"
              type="button"
            >
              <RefreshCw aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-8">
        <section
          aria-label="Applicant metrics"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="flex items-center justify-between gap-2 text-[13px] text-[#A1A1AA]">
              <h2>Total Applicants</h2>
              <span className="flex size-7 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24]">
                <Users aria-hidden="true" className="size-4" />
              </span>
            </div>
            <p className="my-2 text-[24px] font-bold tracking-tight text-white">
              {data.metrics.totalApplicants}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222226] pt-2.5 text-[11px]">
              <span className="text-[#71717A]">
                {data.metrics.applicantsWindow}
              </span>
              <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 font-medium text-[#4ADE80]">
                {data.metrics.newToday} New Today
              </span>
            </div>
          </article>

          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="flex items-center justify-between gap-2 text-[13px] text-[#A1A1AA]">
              <h2>Highest Evaluated Fit</h2>
              <span className="flex size-7 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] text-[#F97316]">
                <BadgeCheck aria-hidden="true" className="size-4" />
              </span>
            </div>
            <p className="my-2 flex items-baseline gap-1.5">
              <span className="text-[24px] font-bold tracking-tight text-white">
                {data.metrics.highestFit.toFixed(1)}
              </span>
              <span className="text-[14px] text-[#71717A]">/ 100</span>
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222226] pt-2.5 text-[11px]">
              <span className="text-[#71717A]">
                {data.metrics.highestFitPercentile}
              </span>
              <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 font-medium text-[#4ADE80]">
                {data.metrics.highestFitRank}
              </span>
            </div>
          </article>

          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="flex items-center justify-between gap-2 text-[13px] text-[#A1A1AA]">
              <h2>Mobile Sandboxes</h2>
              <span className="flex size-7 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] text-[#4ADE80]">
                <Terminal aria-hidden="true" className="size-4" />
              </span>
            </div>
            <p className="my-2 text-[24px] font-bold tracking-tight text-white">
              {data.metrics.sandboxesCompleted} / {data.metrics.sandboxTotal}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222226] pt-2.5 text-[11px]">
              <span className="text-[#71717A]">
                5m timed sandbox complete
              </span>
              <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 font-medium text-[#4ADE80]">
                {data.metrics.sandboxTotal === 0
                  ? 0
                  : Math.round(
                      (data.metrics.sandboxesCompleted /
                        data.metrics.sandboxTotal) *
                        100,
                    )}
                % Assessed
              </span>
            </div>
          </article>

          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="flex items-center justify-between gap-2 text-[13px] text-[#A1A1AA]">
              <h2>Under Investigation</h2>
              <span className="flex size-7 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] text-[#E5933A]">
                <Video aria-hidden="true" className="size-4" />
              </span>
            </div>
            <p className="my-2 text-[24px] font-bold tracking-tight text-white">
              {data.metrics.investigationCases} Cases
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222226] pt-2.5 text-[11px]">
              <span className="text-[#71717A]">
                {data.metrics.investigationSubtitle}
              </span>
              <span className="rounded border border-[#44301B] bg-[#2C2114] px-1.5 py-0.5 font-medium text-[#E5933A]">
                Review SLA &lt;4h
              </span>
            </div>
          </article>
        </section>

        <section className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-[8px] border border-[#27272C] bg-[#121417] p-3.5 sm:gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[6px] border border-[#2B2B32] bg-[#1F1F24] text-[#F97316]">
              <BriefcaseBusiness aria-hidden="true" className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[14px] font-semibold text-white">
                  {data.role.title}
                </h2>
                <span className="font-mono text-[11px] text-[#A1A1AA]">
                  {data.role.jobId}
                </span>
                <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-1.5 py-0.5 text-[10px] font-medium text-[#A1A1AA]">
                  {data.role.status}
                </span>
              </div>
              <p className="text-[12px] text-[#71717A]">
                {data.role.subtitle}
              </p>
            </div>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[11px]">
            <span className="font-mono text-[10px] uppercase text-[#71717A]">
              Deterministic Weights:
            </span>
            {data.role.weights.length > 0 ? (
              data.role.weights.map((weight, index) => (
                <span
                  className="rounded border border-[#2B2B32] bg-[#1F1F24] px-2 py-1 font-mono text-[#D4D4D8]"
                  key={weight.skill}
                >
                  {index > 0 && <span className="mr-2 text-[#71717A]">+</span>}
                  {weight.skill}{" "}
                  <strong className="text-white">
                    {weight.weight.toFixed(0)}%
                  </strong>
                </span>
              ))
            ) : (
              <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-2 py-1 font-mono text-[#A1A1AA]">
                Awaiting Role Weights
              </span>
            )}
            <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-1 font-mono font-semibold text-[#4ADE80]">
              Σ = 1.00 Ready
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-[#27272C] pt-2 font-mono text-[12px] sm:gap-4 sm:border-t-0 sm:pt-0">
            <span className="text-[#A1A1AA]">
              <strong className="font-sans text-white">
                {data.metrics.totalApplicants}
              </strong>{" "}
              Total
            </span>
            <span className="text-[#3F3F46]">•</span>
            <span className="text-[#4ADE80]">
              <strong className="font-sans text-white">
                {data.qualifiedCount}
              </strong>{" "}
              Qualified (&gt;85.0)
            </span>
          </div>
        </section>

        <section className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-[8px] border border-[#25252A] bg-[#121417] p-2.5 sm:gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <label className="flex min-h-9 items-center gap-1.5 rounded-[8px] border border-[#27272C] bg-[#161619] px-2.5 text-[12px]">
              <span className="text-[#71717A]">Stage:</span>
              <select
                aria-label="Filter by stage"
                className="max-w-40 bg-transparent font-medium text-white outline-none"
                onChange={(event) => setStageFilter(event.target.value)}
                value={stageFilter}
              >
                <option value="all">All Stages</option>
                {[...new Set(data.applicants.map((item) => item.stage))].map(
                  (stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ),
                )}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="size-4 text-[#71717A]"
              />
            </label>
            <label className="flex min-h-9 items-center gap-1.5 rounded-[8px] border border-[#27272C] bg-[#161619] px-2.5 text-[12px]">
              <span className="text-[#71717A]">Threshold:</span>
              <select
                aria-label="Filter by score threshold"
                className="max-w-40 bg-transparent font-medium text-[#4ADE80] outline-none"
                onChange={(event) => setThresholdFilter(event.target.value)}
                value={thresholdFilter}
              >
                <option value="all">Any Score</option>
                <option value="qualified">&gt;85.0</option>
                <option value="below">85.0 or below</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="size-4 text-[#71717A]"
              />
            </label>
            <label className="flex min-h-9 items-center gap-1.5 rounded-[8px] border border-[#27272C] bg-[#161619] px-2.5 text-[12px]">
              <span className="text-[#71717A]">Sandbox:</span>
              <select
                aria-label="Filter by sandbox status"
                className="max-w-40 bg-transparent font-medium text-white outline-none"
                onChange={(event) => setSandboxFilter(event.target.value)}
                value={sandboxFilter}
              >
                <option value="all">All States</option>
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="size-4 text-[#71717A]"
              />
            </label>
            <label className="flex min-h-9 items-center gap-1.5 rounded-[8px] border border-[#27272C] bg-[#161619] px-2.5 text-[12px]">
              <ArrowUpDown
                aria-hidden="true"
                className="size-4 text-[#71717A]"
              />
              <select
                aria-label="Sort applicants by deterministic match"
                className="max-w-48 bg-transparent font-medium text-white outline-none"
                onChange={(event) => {
                  const direction = event.target.value;
                  if (direction === "asc" || direction === "desc") {
                    setSortDirection(direction);
                  }
                }}
                value={sortDirection}
              >
                <option value="desc">Deterministic Match (Desc)</option>
                <option value="asc">Deterministic Match (Asc)</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="size-4 text-[#71717A]"
              />
            </label>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2 border-t border-[#27272C] pt-2 sm:gap-3 sm:border-t-0 sm:pt-0">
            <span className="px-2 text-[12px] text-[#71717A]">
              {selectedIds.size} Selected
            </span>
            <button
              className={quietButtonClass}
              disabled={selectedIds.size < 2}
              type="button"
            >
              <Users aria-hidden="true" className="size-4" />
              Compare Selected ({selectedIds.size}/3)
            </button>
            <button
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-[8px] bg-[#F97316] px-3.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={selectedIds.size === 0}
              type="button"
            >
              Advance Stage
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </section>

        <section className="grid min-w-0 grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <section
            aria-labelledby="candidate-matrix-title"
            className={`${panelClass} flex flex-col overflow-hidden xl:col-span-8`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#25252A] px-5 py-4 sm:gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Users
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#F97316]"
                />
                <div className="min-w-0">
                  <h2
                    className="text-[16px] font-semibold leading-snug text-white"
                    id="candidate-matrix-title"
                  >
                    Audited Candidate Matrix
                  </h2>
                  <p className="text-[12px] text-[#71717A]">
                    Multi-artifact verification scores with continuous commit
                    provenance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#4ADE80]" />
                <span className="font-mono text-[11px] text-[#71717A]">
                  SHA256: {data.ledgerProofHash ?? "Awaiting Ledger"}
                </span>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#25252A] bg-[#121417] font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    <th className="w-10 px-4 py-3 text-center">
                      <input
                        aria-label="Select all visible applicants"
                        checked={allVisibleSelected}
                        className="rounded border-[#3F3F46] bg-[#161619] text-[#F97316] focus:ring-0 focus:ring-offset-0"
                        onChange={() => {
                          setSelectedIds((current) => {
                            const next = new Set(current);
                            if (allVisibleSelected) {
                              filteredApplicants.forEach((applicant) =>
                                next.delete(applicant.id),
                              );
                            } else {
                              filteredApplicants
                                .filter((applicant) => !next.has(applicant.id))
                                .slice(0, Math.max(0, 3 - next.size))
                                .forEach((applicant) =>
                                  next.add(applicant.id),
                                );
                            }
                            return next;
                          });
                        }}
                        type="checkbox"
                      />
                    </th>
                    <th className="px-3 py-3">Rank</th>
                    <th className="px-3 py-3">Candidate / Provenance</th>
                    <th className="px-3 py-3 text-right">Score</th>
                    <th className="px-3 py-3">
                      Skill Weight Breakdown (100% Total)
                    </th>
                    <th className="px-3 py-3">Sandbox Snapshot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222226] text-[13px]">
                  {filteredApplicants.length === 0 ? (
                    <tr>
                      <td className="px-4 py-12 text-center" colSpan={6}>
                        <div className="mx-auto flex max-w-md flex-col items-center gap-2">
                          <Users
                            aria-hidden="true"
                            className="size-7 text-[#71717A]"
                          />
                          <p className="font-medium text-white">
                            No evaluated applicants in queue yet
                          </p>
                          <p className="text-[12px] leading-relaxed text-[#71717A]">
                            Applicants will appear here once candidates submit
                            repositories and complete proctored mobile
                            sandboxes.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredApplicants.map((applicant) => (
                      <tr
                        className="transition-colors hover:bg-[#1A1A1E]"
                        key={applicant.id}
                      >
                        <td className="px-4 py-3.5 text-center">
                          <input
                            aria-label={`Select ${applicant.name}`}
                            checked={selectedIds.has(applicant.id)}
                            className="rounded border-[#3F3F46] bg-[#161619] text-[#F97316] focus:ring-0"
                            onChange={() =>
                              toggleApplicantSelection(applicant.id)
                            }
                            type="checkbox"
                          />
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="flex size-6 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] font-mono text-[11px] font-bold text-white">
                            #{applicant.rank}
                          </span>
                        </td>
                        <td className="px-3 py-3.5">
                          <button
                            className="flex items-center gap-2.5 text-left"
                            onClick={() =>
                              setSelectedApplicantId(applicant.id)
                            }
                            type="button"
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#3F3F46] bg-[#27272B] text-[12px] font-semibold text-white">
                              {initials(applicant.name)}
                            </span>
                            <span className="flex min-w-0 flex-col">
                              <span className="font-medium text-white">
                                {applicant.name}
                              </span>
                              <span className="flex items-center gap-1.5 text-[11px] text-[#71717A]">
                                <span className="font-mono text-[#A1A1AA]">
                                  {applicant.handle}
                                </span>
                                <span>•</span>
                                <span>{applicant.location}</span>
                              </span>
                            </span>
                          </button>
                        </td>
                        <td className="px-3 py-3.5 text-right">
                          <div className="flex flex-col items-end">
                            <span className="font-mono text-[15px] font-bold text-[#4ADE80]">
                              {applicant.score.toFixed(1)}
                            </span>
                            <span className="text-[10px] text-[#71717A]">
                              {applicant.percentile}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="flex w-48 flex-col gap-1">
                            <div className="flex h-2 w-full rounded-full bg-[#252528]">
                              {applicant.skillContributions.map((skill) => (
                                <span
                                  key={skill.skill}
                                  style={{
                                    backgroundColor: skill.color,
                                    width: `${skill.contribution}%`,
                                  }}
                                  title={`${skill.skill}: ${skill.contribution}/${skill.maxContribution}`}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between gap-1 font-mono text-[10px] text-[#71717A]">
                              {applicant.skillContributions.map((skill) => (
                                <span key={skill.skill}>
                                  {skill.skill} {skill.contribution}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#4ADE80]">
                              {applicant.sandboxScore}/100
                            </span>
                            <span className="flex items-center gap-0.5 text-[11px] text-[#71717A]">
                              <Video
                                aria-hidden="true"
                                className="size-3.5 text-[#4ADE80]"
                              />
                              {applicant.snapshotsMatched}/
                              {applicant.snapshotCount}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#25252A] bg-[#121417] px-5 py-3 text-[12px] text-[#71717A]">
              <span>
                Showing{" "}
                {filteredApplicants.length === 0
                  ? "0-0 of 0"
                  : `1-${filteredApplicants.length} of ${filteredApplicants.length}`}{" "}
                applicants
              </span>
              <div className="flex items-center gap-2">
                <button
                  className={quietButtonClass}
                  disabled
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" className="size-4" />
                  Previous
                </button>
                <span className="px-2 font-mono text-white">Page 1</span>
                <button
                  className={quietButtonClass}
                  disabled
                  type="button"
                >
                  Next
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          </section>

          <div className="flex min-w-0 flex-col gap-6 xl:col-span-4">
            <section
              aria-labelledby="ranking-formula-title"
              className={`${panelClass} flex flex-col gap-3.5 p-5`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Calculator
                    aria-hidden="true"
                    className="size-[18px] shrink-0 text-[#F97316]"
                  />
                  <h2
                    className="text-[14px] font-semibold text-white"
                    id="ranking-formula-title"
                  >
                    Deterministic Ranking Formula
                  </h2>
                </div>
                <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-2 py-0.5 font-mono text-[10px] text-[#4ADE80]">
                  STRICT MODE
                </span>
              </div>
              <div className="rounded-[8px] border border-[#27272C] bg-[#17171B] p-3 font-mono text-[11px] leading-relaxed text-[#D4D4D8]">
                <p className="mb-1 text-[#71717A]">
                  {"// Mathematical definition:"}
                </p>
                <p className="break-words text-[#4ADE80]">
                  Contribution(c, s) = W(s) × [ Score(c, s) / MaxScore(s) ]
                </p>
                <p className="mt-1 font-semibold text-white">
                  TotalScore(c) = Σ Contribution(c, s)
                </p>
              </div>
              <p className="text-[12px] leading-relaxed text-[#A1A1AA]">
                Every applicant score is strictly calculated via closed-form
                summation over authenticated GitHub ASTs and proctored test
                items. Zero LLM hallucinated ranking or hidden neural weights.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222226] pt-2 font-mono text-[11px]">
                <span className="text-[#71717A]">Ledger Proof Hash:</span>
                <span className="rounded border border-[#27272C] bg-[#161619] px-2 py-0.5 text-white">
                  {data.ledgerProofHash ?? "Awaiting Ledger"}
                </span>
              </div>
            </section>

            <section
              aria-labelledby="evidence-inspector-title"
              className={`${panelClass} flex flex-col gap-4 p-5`}
            >
              <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#27272B] text-[14px] font-bold text-white">
                    {selectedApplicant ? initials(selectedApplicant.name) : "—"}
                  </span>
                  <div className="min-w-0">
                    <h2
                      className="text-[15px] font-semibold text-white"
                      id="evidence-inspector-title"
                    >
                      {selectedApplicant?.name ?? "No Candidate Selected"}
                    </h2>
                    <p className="break-words text-[12px] text-[#71717A]">
                      {selectedApplicant
                        ? `${selectedApplicant.stage} • ${selectedApplicant.handle}`
                        : "Select an applicant to inspect their verified evidence"}
                    </p>
                  </div>
                </div>
                {selectedApplicant && (
                  <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-0.5 font-mono text-[11px] font-bold text-[#4ADE80]">
                    RANK #{selectedApplicant.rank}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-[8px] border border-[#27272C] bg-[#17171B] p-3">
                <div>
                  <p className="font-mono text-[11px] uppercase text-[#71717A]">
                    Composite Verified Score
                  </p>
                  <p className="font-mono text-[20px] font-bold text-white">
                    {selectedApplicant
                      ? selectedApplicant.score.toFixed(2)
                      : "--"}{" "}
                    <span className="text-[13px] font-normal text-[#71717A]">
                      / 100
                    </span>
                  </p>
                </div>
                {selectedApplicant && (
                  <div className="text-right">
                    <p className="text-[11px] font-medium text-[#4ADE80]">
                      100% Deterministic
                    </p>
                    <p className="text-[11px] text-[#71717A]">
                      {selectedApplicant.percentile}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  Proofline Evidence Trail
                </h3>
                {selectedApplicant && selectedApplicant.evidence.length > 0 ? (
                  selectedApplicant.evidence.map((evidence, index) => (
                    <div className="flex gap-3" key={evidence.id}>
                      <div className="flex w-4 shrink-0 flex-col items-center">
                        <span
                          className={`mt-1 size-2.5 rounded-full ${
                            evidence.status === "verified"
                              ? "bg-[#4ADE80]"
                              : evidence.status === "flagged"
                                ? "bg-[#E5933A]"
                                : "bg-[#71717A]"
                          }`}
                        />
                        {index < selectedApplicant.evidence.length - 1 && (
                          <span className="my-1 w-px flex-1 bg-[#3F3F46]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 pb-3">
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[12px]">
                          <span className="font-medium text-white">
                            {evidence.title}
                          </span>
                          {evidence.score !== undefined && (
                            <span className="font-mono text-[11px] text-[#4ADE80]">
                              Score {evidence.score.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 break-words text-[10px] text-[#A1A1AA]">
                          {evidence.detail}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-2 rounded-[8px] border border-dashed border-[#27272C] px-3 py-5 text-center">
                    <FileCheck2
                      aria-hidden="true"
                      className="size-5 text-[#71717A]"
                    />
                    <p className="text-[12px] font-medium text-[#A1A1AA]">
                      {selectedApplicant
                        ? "No proofline evidence available"
                        : "No evidence to display"}
                    </p>
                    <p className="text-[11px] text-[#71717A]">
                      Evidence appears after repository and sandbox verification.
                    </p>
                  </div>
                )}
              </div>
              <button
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#F97316] py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!selectedApplicant}
                type="button"
              >
                Advance to Technical Stage
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </section>
          </div>
        </section>
      </div>
      <footer className="border-t border-[#1C1C20] bg-[#0B0C0E] px-4 py-4 text-[11px] text-[#71717A] sm:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">
              TalentGraph Ground Truth Protocol
            </span>
            <span>•</span>
            <span>
              All ranking equations strictly audited under SHA-256 cryptographic
              ledger.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>Proofline Spec v1.3</span>
            <span>Audit Ledger Explorer</span>
            <span>Recruiter SLA Support</span>
            <span className="text-[#3F3F46]">REV-4.2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
