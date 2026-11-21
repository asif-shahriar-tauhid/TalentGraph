"use client";

import {
  ArrowDownToLine,
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  FileCode2,
  Flag,
  GitCommitHorizontal,
  History,
  Info,
  Mail,
  Search,
  Settings2,
  ShieldCheck,
  Terminal,
  Users,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";

export interface PipelineCandidate {
  id: string;
  name: string;
  handle: string;
  rank: number;
  role: string;
  experience: string;
  location: string;
  score: number;
  repository: string;
  commitCount: number;
  astCoverage: string;
  artifactSummary: string;
  commitSha: string;
  sourceRange: string;
  interviewFocusAreas: Array<{ title: string; detail: string }>;
  biometricsAuthenticated: boolean;
  sandboxTimerCompliant: boolean;
}

export interface InterviewPanelist {
  id: string;
  name: string;
  title: string;
  organization: string;
  assignment: string;
}

export interface GroundTruthPrompt {
  id: string;
  candidateHandle: string;
  source: string;
  question: string;
  target: string;
}

export interface HiringPipelineData {
  jobStatus: string;
  targetRole: string;
  location: string;
  deterministicPoolCount: number;
  stageCounts: {
    underReview: number;
    shortlisted: number;
    technical: number;
    finalDecision: number;
  };
  advancementCandidates: PipelineCandidate[];
  panelists: InterviewPanelist[];
  prompts: GroundTruthPrompt[];
  zeroBlackBoxRankingGuaranteed: boolean;
}

interface HiringPipelineViewProps {
  data?: HiringPipelineData;
  onAdvanceCandidates?: (candidateIds: string[]) => void;
}

export const INITIAL_HIRING_PIPELINE_DATA: HiringPipelineData = {
  jobStatus: "Awaiting Role",
  targetRole: "No Active Role Selected",
  location: "Awaiting location",
  deterministicPoolCount: 0,
  stageCounts: {
    underReview: 0,
    shortlisted: 0,
    technical: 0,
    finalDecision: 0,
  },
  advancementCandidates: [],
  panelists: [],
  prompts: [],
  zeroBlackBoxRankingGuaranteed: false,
};

const VERIFICATION_PROTOCOLS = [
  {
    id: "proofline",
    label:
      "Live Proofline AST deep-dive: Candidates walk through authenticated code commit line ranges live",
  },
  {
    id: "whiteboard",
    label:
      "Deterministic Whiteboard challenge: Raft snapshotting under partial net split",
  },
  {
    id: "tamper-recorder",
    label:
      "Audio/Screen sandbox tamper recorder active (Biometric consensus guarantee)",
  },
] as const;

const panelClass =
  "min-w-0 rounded-xl border border-[#1F242D] bg-[#121417] p-5";

function downloadPipelineSpec(
  data: HiringPipelineData,
  enabledProtocols: Record<string, boolean>,
  assessmentWindow: string,
  slotDuration: number,
  executionMode: string,
) {
  const rows = [
    ["Hiring Pipeline Specification"],
    ["Target Role", data.targetRole],
    ["Location", data.location],
    ["Job Status", data.jobStatus],
    ["Deterministic Pool", `${data.deterministicPoolCount} Profiles Scored`],
    [],
    ["Stage", "Candidate Count"],
    ["Under Review", String(data.stageCounts.underReview)],
    ["Shortlisted", String(data.stageCounts.shortlisted)],
    ["Technical Stage", String(data.stageCounts.technical)],
    ["Final Decision & Offer", String(data.stageCounts.finalDecision)],
    [],
    ["Technical Interview Protocol", "Enabled"],
    ...VERIFICATION_PROTOCOLS.map((protocol) => [
      protocol.label,
      enabledProtocols[protocol.id] ? "Yes" : "No",
    ]),
    ["Target Assessment Window", assessmentWindow || "Not selected"],
    ["Slot Duration (minutes)", String(slotDuration)],
    ["Execution Pipeline", executionMode],
    [],
    ["Candidate", "Handle", "Score", "Repository", "Commit SHA"],
    ...data.advancementCandidates.map((candidate) => [
      candidate.name,
      candidate.handle,
      candidate.score.toFixed(2),
      candidate.repository,
      candidate.commitSha,
    ]),
  ];
  const csv = rows
    .map((row) =>
      row.map((value) => `"${(value ?? "").replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "hiring-pipeline-spec.csv";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function candidateInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function HiringPipelineView({
  data = INITIAL_HIRING_PIPELINE_DATA,
  onAdvanceCandidates,
}: HiringPipelineViewProps) {
  const [query, setQuery] = useState("");
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [selectedPanelistIds, setSelectedPanelistIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [enabledProtocols, setEnabledProtocols] = useState<
    Record<string, boolean>
  >(() => Object.fromEntries(VERIFICATION_PROTOCOLS.map(({ id }) => [id, true])));
  const [assessmentWindow, setAssessmentWindow] = useState("");
  const [slotDuration, setSlotDuration] = useState(75);
  const [executionMode, setExecutionMode] = useState("Parallel Round-Robin");
  const [draftSaved, setDraftSaved] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  const filteredCandidates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.advancementCandidates.filter((candidate) =>
      [
        candidate.name,
        candidate.handle,
        candidate.repository,
        candidate.commitSha,
      ].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [data.advancementCandidates, query]);
  const selectedCandidates = data.advancementCandidates.filter((candidate) =>
    selectedCandidateIds.has(candidate.id),
  );
  const selectedPanelistCount = selectedPanelistIds.size;
  const verificationGates = [
    {
      label: "Deterministic Score > 85% Cutoff",
      detail:
        selectedCandidates.length > 0 &&
        selectedCandidates.every((candidate) => candidate.score > 85)
          ? "Selected candidate scores satisfy the deterministic threshold."
          : "Awaiting selected candidates with scores above the threshold.",
      satisfied:
        selectedCandidates.length > 0 &&
        selectedCandidates.every((candidate) => candidate.score > 85),
    },
    {
      label: "Biometric Snapshots Authenticated",
      detail:
        selectedCandidates.length > 0 &&
        selectedCandidates.every((candidate) => candidate.biometricsAuthenticated)
          ? "Selected candidate biometric snapshots are authenticated."
          : "Awaiting authenticated biometric snapshots.",
      satisfied:
        selectedCandidates.length > 0 &&
        selectedCandidates.every((candidate) => candidate.biometricsAuthenticated),
    },
    {
      label: "Mobile Sandbox Timer Compliance",
      detail:
        selectedCandidates.length > 0 &&
        selectedCandidates.every((candidate) => candidate.sandboxTimerCompliant)
          ? "Selected candidates passed mobile sandbox timer compliance."
          : "Awaiting sandbox timer compliance data.",
      satisfied:
        selectedCandidates.length > 0 &&
        selectedCandidates.every((candidate) => candidate.sandboxTimerCompliant),
    },
    {
      label: "Zero Black-Box Ranking Guarantee",
      detail: data.zeroBlackBoxRankingGuaranteed
        ? "Candidate scores are backed by deterministic ranking evidence."
        : "Deterministic ranking verification is pending.",
      satisfied:
        selectedCandidates.length > 0 && data.zeroBlackBoxRankingGuaranteed,
    },
  ];
  const satisfiedGateCount = verificationGates.filter(
    (gate) => gate.satisfied,
  ).length;
  const canAdvance =
    selectedCandidates.length > 0 &&
    satisfiedGateCount === verificationGates.length &&
    onAdvanceCandidates !== undefined;

  function resetView() {
    setQuery("");
    setSelectedCandidateIds(new Set());
    setSelectedPanelistIds(new Set());
    setEnabledProtocols(
      Object.fromEntries(VERIFICATION_PROTOCOLS.map(({ id }) => [id, true])),
    );
    setAssessmentWindow("");
    setSlotDuration(75);
    setExecutionMode("Parallel Round-Robin");
    setDraftSaved(false);
    setCopiedPromptId(null);
    setCopyError(null);
  }

  function toggleCandidate(candidateId: string) {
    setSelectedCandidateIds((current) => {
      const next = new Set(current);
      if (next.has(candidateId)) next.delete(candidateId);
      else next.add(candidateId);
      return next;
    });
  }

  function togglePanelist(panelistId: string) {
    setSelectedPanelistIds((current) => {
      const next = new Set(current);
      if (next.has(panelistId)) next.delete(panelistId);
      else next.add(panelistId);
      return next;
    });
  }

  function copyPrompt(prompt: GroundTruthPrompt) {
    setCopyError(null);
    if (!navigator.clipboard) {
      setCopyError("Clipboard access is unavailable in this browser.");
      return;
    }
    void navigator.clipboard
      .writeText(prompt.question)
      .then(() => setCopiedPromptId(prompt.id))
      .catch(() => setCopyError("Unable to copy this interview prompt."));
  }

  return (
    <div className="flex min-h-full w-full min-w-0 flex-col bg-[#0B0C0E] text-[#D4D4D8]">
      <header className="sticky top-0 z-20 border-b border-[#1F242D] bg-[#121417]/95 px-4 py-4 backdrop-blur sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#A1A1AA]"
            >
              <span>RECRUITER</span>
              <span aria-hidden="true">/</span>
              <span>HIRING PIPELINE</span>
              <span className="text-[#71717A]">·</span>
              <span className="break-words font-semibold text-white">
                TECHNICAL STAGE ADVANCEMENT
              </span>
            </nav>
            <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-white sm:text-2xl">
              Hiring Pipeline
            </h1>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <span
              className={`inline-flex min-h-9 flex-wrap items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-xs font-medium ${
                data.jobStatus === "Active"
                  ? "border-[#1A3D2C] bg-[#13281E] text-[#4ADE80]"
                  : "border-[#2C2C32] bg-[#1C1C20] text-[#A1A1AA]"
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  data.jobStatus === "Active"
                    ? "bg-[#4ADE80]"
                    : "bg-[#71717A]"
                }`}
              />
              {data.jobStatus}
            </span>
            <label className="relative w-full min-w-0 sm:w-56">
              <Search
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 size-[15px] -translate-y-1/2 text-[#71717A]"
              />
              <input
                aria-label="Filter candidates or SHA"
                className="h-9 w-full rounded border border-[#27272C] bg-[#161619] py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter candidates or SHA..."
                type="search"
                value={query}
              />
            </label>
            <button
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded border border-[#27272C] bg-[#161619] px-3 text-xs font-medium text-white transition-colors hover:bg-[#202024]"
              onClick={() =>
                downloadPipelineSpec(
                  data,
                  enabledProtocols,
                  assessmentWindow,
                  slotDuration,
                  executionMode,
                )
              }
              type="button"
            >
              <ArrowDownToLine aria-hidden="true" className="size-[15px]" />
              Export Pipeline Spec
            </button>
            <button
              aria-label="Reset pipeline view"
              className="inline-flex size-9 items-center justify-center rounded border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:text-white"
              onClick={resetView}
              title="Reset pipeline view"
              type="button"
            >
              <History aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#27272C] pt-3 text-xs text-[#A1A1AA] sm:gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#71717A]">Target Role:</span>
              <span className="break-words font-medium text-white">
                {data.targetRole}
              </span>
            </div>
            <span aria-hidden="true" className="size-1 rounded-full bg-[#3F3F46]" />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#71717A]">Location:</span>
              <span className="break-words font-medium text-white">
                {data.location}
              </span>
            </div>
            <span aria-hidden="true" className="size-1 rounded-full bg-[#3F3F46]" />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#71717A]">Deterministic Pool:</span>
              <span className="font-mono font-semibold text-white">
                {data.deterministicPoolCount} Profiles Scored
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="px-4 pb-2 pt-6 sm:px-8">
        <div className="rounded-xl border border-[#2C2C32] bg-[#1C1C20] p-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <StageCard
              description={`${data.stageCounts.underReview} candidates processed`}
              label="Under Review"
              status={data.stageCounts.underReview > 0 ? "Passed" : "Awaiting"}
              tone={data.stageCounts.underReview > 0 ? "complete" : "pending"}
            />
            <StageCard
              description={`${data.stageCounts.shortlisted} candidates >85% threshold`}
              label="Shortlisted"
              status={data.stageCounts.shortlisted > 0 ? "Verified" : "Awaiting"}
              tone={data.stageCounts.shortlisted > 0 ? "complete" : "pending"}
            />
            <StageCard
              description={`${data.stageCounts.technical} candidates advancing now`}
              label="Technical Stage"
              status="ACTIVE"
              tone="active"
            />
            <StageCard
              description={`${data.stageCounts.finalDecision} candidates in stage`}
              label="Final Decision & Offer"
              status="Pending"
              tone="pending"
            />
          </div>
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-6 p-4 lg:grid-cols-12 lg:p-8">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <section aria-labelledby="advancement-dossier-title">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-2 sm:gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#F97316]"
                />
                <h2
                  className="text-base font-semibold tracking-tight text-white"
                  id="advancement-dossier-title"
                >
                  Active Advancement Dossier (
                  {data.advancementCandidates.length} Candidates)
                </h2>
              </div>
              <p className="text-xs font-mono text-[#A1A1AA]">
                Deterministic Threshold:{" "}
                <strong className="text-white">≥ 85.00%</strong>
              </p>
            </div>
            <div className="mt-4 flex min-w-0 flex-col gap-4">
              {filteredCandidates.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#2C2C32] bg-[#121417] px-4 py-10 text-center">
                  <Users
                    aria-hidden="true"
                    className="mx-auto size-7 text-[#71717A]"
                  />
                  <p className="mt-2 text-sm font-medium text-white">
                    {data.advancementCandidates.length === 0
                      ? "No candidates ready for advancement"
                      : "No candidates match this search"}
                  </p>
                  <p className="mx-auto mt-1 max-w-xl break-words text-xs leading-relaxed text-[#71717A]">
                    Candidates will appear here after deterministic scoring,
                    biometric verification, and sandbox compliance checks.
                  </p>
                </div>
              ) : (
                filteredCandidates.map((candidate) => (
                  <CandidateDossierCard
                    candidate={candidate}
                    key={candidate.id}
                    onToggle={() => toggleCandidate(candidate.id)}
                    selected={selectedCandidateIds.has(candidate.id)}
                  />
                ))
              )}
            </div>
          </section>

          <section
            aria-labelledby="protocol-configuration-title"
            className={`${panelClass} space-y-5`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-3 sm:gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Settings2
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#F97316]"
                />
                <h2
                  className="text-base font-semibold text-white"
                  id="protocol-configuration-title"
                >
                  Technical Interview Protocol Configuration
                </h2>
              </div>
              <span className="rounded border border-[#27272C] bg-[#17171B] px-2.5 py-1 font-mono text-xs text-[#A1A1AA]">
                Timezone: Asia/Dhaka (BST, UTC+6)
              </span>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
              <section className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-medium text-white">
                    Assigned Technical Interview Panelists
                  </h3>
                  <span className="text-[11px] text-[#71717A]">
                    {selectedPanelistCount} Panelists Selected
                  </span>
                </div>
                <div className="min-w-0 space-y-2 rounded-lg border border-[#27272C] bg-[#17171B] p-2.5">
                  {data.panelists.length === 0 ? (
                    <p className="break-words rounded border border-dashed border-[#2C2C32] bg-[#131316] p-3 text-xs text-[#71717A]">
                      No interview panelists available.
                    </p>
                  ) : (
                    data.panelists.map((panelist) => (
                      <label
                        className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded border border-[#27272C] bg-[#131316] p-2 text-xs"
                        key={panelist.id}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <input
                            checked={selectedPanelistIds.has(panelist.id)}
                            className="shrink-0 rounded border-[#3F3F46] bg-[#161619] text-[#F97316] focus:ring-[#F97316]"
                            onChange={() => togglePanelist(panelist.id)}
                            type="checkbox"
                          />
                          <span className="flex size-6 shrink-0 items-center justify-center rounded bg-[#2A2A30] font-mono text-[10px] text-white">
                            {candidateInitials(panelist.name)}
                          </span>
                          <span className="min-w-0">
                            <span className="block break-words font-medium text-white">
                              {panelist.name}
                            </span>
                            <span className="block break-words text-[10px] text-[#A1A1AA]">
                              {panelist.title} · {panelist.organization}
                            </span>
                          </span>
                        </span>
                        <span className="rounded bg-[#1C1C20] px-1.5 py-0.5 font-mono text-[10px] text-[#A1A1AA]">
                          {panelist.assignment}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </section>

              <section className="min-w-0 space-y-1.5">
                <h3 className="text-xs font-medium text-white">
                  Verification Protocol &amp; Scope
                </h3>
                <div className="min-w-0 space-y-2 rounded-lg border border-[#27272C] bg-[#17171B] p-2.5 text-xs">
                  {VERIFICATION_PROTOCOLS.map((protocol) => (
                    <label
                      className="flex min-w-0 cursor-pointer items-start gap-2.5 p-1"
                      key={protocol.id}
                    >
                      <input
                        checked={enabledProtocols[protocol.id] ?? false}
                        className="mt-0.5 shrink-0 rounded border-[#3F3F46] bg-[#161619] text-[#F97316] focus:ring-[#F97316]"
                        onChange={(event) => {
                          setDraftSaved(false);
                          setEnabledProtocols((current) => ({
                            ...current,
                            [protocol.id]: event.target.checked,
                          }));
                        }}
                        type="checkbox"
                      />
                      <span className="break-words text-[#D4D4D8]">
                        {protocol.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-3 pt-2 md:grid-cols-3">
              <label className="min-w-0 text-[11px] font-medium text-[#A1A1AA]">
                Target Assessment Window
                <span className="mt-1 flex min-h-9 min-w-0 items-center gap-2 rounded border border-[#27272C] bg-[#161619] px-3 py-2 text-xs text-white">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#71717A]"
                  />
                  <input
                    aria-label="Target assessment window"
                    className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none"
                    onChange={(event) => {
                      setAssessmentWindow(event.target.value);
                      setDraftSaved(false);
                    }}
                    type="date"
                    value={assessmentWindow}
                  />
                </span>
              </label>
              <label className="min-w-0 text-[11px] font-medium text-[#A1A1AA]">
                Slot Duration
                <span className="mt-1 flex min-h-9 min-w-0 items-center gap-2 rounded border border-[#27272C] bg-[#161619] px-3 py-2 text-xs text-white">
                  <Clock3
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#71717A]"
                  />
                  <select
                    aria-label="Slot duration"
                    className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none"
                    onChange={(event) => {
                      setSlotDuration(Number(event.target.value));
                      setDraftSaved(false);
                    }}
                    value={slotDuration}
                  >
                    <option value={45}>45 Minutes per Candidate</option>
                    <option value={60}>60 Minutes per Candidate</option>
                    <option value={75}>75 Minutes per Candidate</option>
                    <option value={90}>90 Minutes per Candidate</option>
                  </select>
                </span>
              </label>
              <label className="min-w-0 text-[11px] font-medium text-[#A1A1AA]">
                Execution Pipeline
                <span className="mt-1 flex min-h-9 min-w-0 items-center gap-2 rounded border border-[#27272C] bg-[#161619] px-3 py-2 text-xs text-[#F97316]">
                  <Workflow
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#F97316]"
                  />
                  <select
                    aria-label="Execution pipeline"
                    className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none"
                    onChange={(event) => {
                      setExecutionMode(event.target.value);
                      setDraftSaved(false);
                    }}
                    value={executionMode}
                  >
                    <option>Parallel Round-Robin</option>
                    <option>Sequential Panel</option>
                  </select>
                </span>
              </label>
            </div>

            <div className="min-w-0 space-y-2 rounded-lg border border-[#27272C] bg-[#17171B] p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-white">
                  <Mail
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#F97316]"
                  />
                  Candidate Dispatch Preview: &quot;Technical Stage Invitation —
                  Proofline Architecture Review&quot;
                </span>
                <span className="rounded bg-[#202026] px-2 py-0.5 font-mono text-[10px] text-[#A1A1AA]">
                  Automated Dispatch
                </span>
              </div>
              <p className="break-words text-xs leading-relaxed text-[#A1A1AA]">
                &quot;Hello{" "}
                <span className="font-mono text-white">[Candidate Name]</span>,
                based on your verified code provenance in{" "}
                <span className="font-mono text-white">[Repository ID]</span>,
                you have been advanced to the Technical Deep-Dive round for{" "}
                <span className="font-semibold text-white">[Target Role]</span>.
                Please select your {slotDuration}-minute live review slot...&quot;
              </p>
              <div className="flex flex-wrap items-start gap-2 rounded border border-[#44301B] bg-[#2C2114] p-2 text-[11px] text-[#E5933A]">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 size-[15px] shrink-0"
                />
                <p className="min-w-0 break-words">
                  Ground-Truth Privacy Anchor: Candidates will never see private
                  peer rankings or score distributions. Only their individual
                  verified code proofs and assessment milestones are exposed.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="flex min-w-0 flex-col gap-5 lg:col-span-4">
          <section
            aria-labelledby="transition-verification-title"
            className={`${panelClass} space-y-4`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-2 sm:gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#4ADE80]"
                />
                <h2
                  className="text-sm font-semibold text-white"
                  id="transition-verification-title"
                >
                  Stage Transition Verification
                </h2>
              </div>
              <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#4ADE80]">
                {satisfiedGateCount} / 4 SATISFIED
              </span>
            </div>
            <div className="space-y-3">
              {verificationGates.map((gate) => (
                <div className="flex min-w-0 items-start gap-2.5 text-xs" key={gate.label}>
                  <span
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${
                      gate.satisfied
                        ? "border-[#1A3D2C] bg-[#13281E] text-[#4ADE80]"
                        : "border-[#2C2C32] bg-[#1C1C20] text-[#71717A]"
                    }`}
                  >
                    {gate.satisfied ? (
                      <Check aria-hidden="true" className="size-3" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="break-words font-medium text-white">
                      {gate.label}
                    </p>
                    <p className="mt-0.5 break-words text-[11px] text-[#A1A1AA]">
                      {gate.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="rag-prompts-title"
            className={`${panelClass} space-y-4`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-2 sm:gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <BrainCircuit
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#F97316]"
                />
                <h2
                  className="text-sm font-semibold text-white"
                  id="rag-prompts-title"
                >
                  RAG Ground-Truth Interview Prompts
                </h2>
              </div>
              <span className="rounded border border-[#27272C] bg-[#17171B] px-1.5 py-0.5 font-mono text-[10px] text-[#A1A1AA]">
                Code-Sourced
              </span>
            </div>
            <p className="break-words text-xs leading-relaxed text-[#A1A1AA]">
              Deterministic prompts auto-generated strictly from candidates&apos;
              validated GitHub AST syntax nodes:
            </p>
            {data.prompts.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-[#2C2C32] bg-[#17171B] px-3 py-8 text-center">
                <FileCode2
                  aria-hidden="true"
                  className="size-6 text-[#71717A]"
                />
                <p className="rounded border border-[#222227] bg-[#0B0C0E] px-3 py-2 font-mono text-xs text-white">
                  Awaiting verified AST provenance
                </p>
                <p className="max-w-sm break-words text-[11px] leading-relaxed text-[#71717A]">
                  Deterministic AST prompts will auto-generate once candidates
                  reach Technical Stage.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.prompts.map((prompt, index) => (
                  <article
                    className="min-w-0 space-y-1.5 rounded-lg border border-[#27272C] bg-[#17171B] p-3"
                    key={prompt.id}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-semibold text-[#F97316]">
                        QUESTION {index + 1} · {prompt.candidateHandle}
                      </span>
                      <span className="break-all font-mono text-[10px] text-[#71717A]">
                        {prompt.source}
                      </span>
                    </div>
                    <p className="break-words rounded border border-[#222227] bg-[#0B0C0E] p-2 font-mono text-xs leading-relaxed text-white">
                      {prompt.question}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-[#71717A]">
                      <span className="break-words">
                        Target: {prompt.target}
                      </span>
                      <button
                        className="inline-flex items-center gap-1 text-[#F97316] hover:underline"
                        onClick={() => copyPrompt(prompt)}
                        type="button"
                      >
                        <Copy aria-hidden="true" className="size-3" />
                        {copiedPromptId === prompt.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </article>
                ))}
                {copyError && (
                  <p
                    aria-live="polite"
                    className="break-words text-xs text-[#E5933A]"
                  >
                    {copyError}
                  </p>
                )}
              </div>
            )}
          </section>

          <section
            aria-labelledby="orchestration-title"
            className={`${panelClass} space-y-4`}
          >
            <h2
              className="text-sm font-semibold text-white"
              id="orchestration-title"
            >
              Orchestration Execution
            </h2>
            <div className="space-y-2.5">
              <button
                className="flex w-full flex-wrap items-center justify-center gap-2 rounded-lg bg-[#F97316] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!canAdvance}
                onClick={() =>
                  onAdvanceCandidates?.(
                    selectedCandidates.map((candidate) => candidate.id),
                  )
                }
                type="button"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
                Confirm &amp; Advance {selectedCandidates.length} Candidates to
                Technical Stage
              </button>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#27272C] bg-[#161619] px-4 py-2 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#202026]"
                onClick={() => setDraftSaved(true)}
                type="button"
              >
                <History
                  aria-hidden="true"
                  className="size-4 text-[#71717A]"
                />
                {draftSaved ? "Draft Protocol Saved" : "Save as Draft Protocol"}
              </button>
            </div>
            <div className="border-t border-[#1F242D] pt-3">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#71717A]">
                <span>Cryptographic Ledger Commit:</span>
                <span className="flex items-center gap-1 text-[#4ADE80]">
                  <span className="size-1.5 rounded-full bg-[#4ADE80]" />
                  {data.advancementCandidates.length > 0
                    ? "Ready to Sign"
                    : "Awaiting Candidates"}
                </span>
              </div>
              <div className="break-all rounded border border-[#222227] bg-[#0B0C0E] p-2 font-mono text-[11px] text-[#A1A1AA]">
                SHA-256:{" "}
                <span className="text-white">
                  {data.advancementCandidates.length > 0
                    ? "Pending recruiter confirmation"
                    : "Awaiting ledger signature"}
                </span>
              </div>
              <p className="mt-1.5 break-words text-[10px] leading-normal text-[#71717A]">
                Advancement actions are immutably signed to ensure deterministic
                accountability and recruiter audit trail integrity.
              </p>
            </div>
          </section>
        </aside>
      </section>

      <footer className="mt-auto border-t border-[#1F242D] bg-[#101013] px-4 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#71717A] sm:gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <span className="size-2 rounded-full bg-[#F97316]" />
            <span className="text-[#D4D4D8]">
              TalentGraph Ground Truth Protocol
            </span>
            <span>•</span>
            <span>Cryptographic Transition Record SHA-256</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] sm:gap-4">
            <span>Proofline Spec v1.3</span>
            <span>•</span>
            <span>Recruiter SLA Support</span>
            <span>•</span>
            <span>
              © 2026 TalentGraph Inc. Ground truth recruitment. All rights
              reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface StageCardProps {
  label: string;
  status: string;
  description: string;
  tone: "complete" | "active" | "pending";
}

function StageCard({
  label,
  status,
  description,
  tone,
}: StageCardProps) {
  const styles = {
    complete:
      "border-[#1F242D] bg-[#121417] text-[#4ADE80] opacity-90",
    active: "border-2 border-[#F97316] bg-[#251811] text-white shadow-sm",
    pending: "border-[#2C2C32] bg-[#121417]/60 text-[#71717A]",
  }[tone];

  return (
    <article
      className={`flex min-w-0 items-start gap-3 rounded-lg border p-2.5 ${styles}`}
    >
      <span
        className={`flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold ${
          tone === "complete"
            ? "border-[#1A3D2C] bg-[#13281E]"
            : tone === "active"
              ? "border-[#F97316] bg-[#F97316]"
              : "border-[#2C2C32] bg-[#1C1C20]"
        }`}
      >
        {tone === "complete" ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          ["Under Review", "Shortlisted", "Technical Stage", "Final Decision & Offer"].indexOf(
            label,
          ) + 1
        )}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="break-words text-xs font-semibold">{label}</h3>
          <span
            className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
              tone === "active"
                ? "bg-[#F97316] font-bold text-white"
                : tone === "complete"
                  ? "text-[#4ADE80]"
                  : "text-[#71717A]"
            }`}
          >
            {status}
          </span>
        </div>
        <p
          className={`mt-0.5 break-words text-[11px] ${
            tone === "active" ? "font-medium text-[#F97316]" : "text-[#A1A1AA]"
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

interface CandidateDossierCardProps {
  candidate: PipelineCandidate;
  selected: boolean;
  onToggle: () => void;
}

function CandidateDossierCard({
  candidate,
  selected,
  onToggle,
}: CandidateDossierCardProps) {
  return (
    <article className="relative min-w-0 rounded-xl border border-[#1F242D] bg-[#121417] p-5 transition-colors hover:border-[#3A3A42]">
      <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-[#F97316] via-[#ffb691] to-transparent opacity-80" />
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#2F2F36] bg-[#1F1F24] font-mono text-sm font-bold text-white">
            {candidateInitials(candidate.name)}
          </span>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h3 className="break-words text-base font-bold text-white">
                {candidate.name}
              </h3>
              <span className="break-all rounded border border-[#27272C] bg-[#17171B] px-2 py-0.5 font-mono text-xs text-[#A1A1AA]">
                {candidate.handle}
              </span>
              <span className="rounded border border-[#F97316]/40 bg-[#251811] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#F97316]">
                Rank #{candidate.rank}
              </span>
            </div>
            <p className="mt-0.5 break-words text-xs text-[#A1A1AA]">
              {candidate.role} · {candidate.experience} · {candidate.location}
            </p>
          </div>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:justify-start">
          <span className="flex flex-wrap items-center gap-1.5 rounded border border-[#1A3D2C] bg-[#13281E] px-2.5 py-1">
            <span className="font-mono text-xs font-semibold text-[#4ADE80]">
              {candidate.score.toFixed(2)} / 100
            </span>
            <span className="text-[10px] text-[#A1A1AA]">Match</span>
          </span>
          <span className="flex flex-wrap items-center gap-1 text-[11px] font-medium text-[#4ADE80]">
            <CheckCircle2 aria-hidden="true" className="size-3.5 shrink-0" />
            Ready for Technical Interview
          </span>
        </div>
      </div>

      <div className="mt-4 min-w-0 rounded-lg border border-[#27272C] bg-[#17171B]/70 p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#A1A1AA]">
            <Terminal
              aria-hidden="true"
              className="size-[15px] shrink-0 text-[#F97316]"
            />
            Primary Ground Truth Verification Artifacts
          </span>
          <span className="font-mono text-[11px] text-[#71717A]">
            {candidate.commitCount} Commits Indexed
          </span>
        </div>
        <div className="flex min-w-0 flex-wrap gap-2 text-[11px]">
          <span className="flex min-w-0 flex-wrap items-center gap-1.5 rounded border border-[#27272C] bg-[#0B0C0E] px-2.5 py-1 font-mono text-[#D4D4D8]">
            <span className="text-[#71717A]">Repo:</span>
            <span className="break-all font-medium text-white">
              {candidate.repository}
            </span>
            <span className="break-all text-[#F97316]">
              {candidate.sourceRange}
            </span>
          </span>
          <span className="flex min-w-0 flex-wrap items-center gap-1.5 rounded border border-[#27272C] bg-[#0B0C0E] px-2.5 py-1 font-mono text-[#D4D4D8]">
            <span className="text-[#71717A]">AST Coverage:</span>
            <span className="break-words text-[#4ADE80]">
              {candidate.astCoverage} {candidate.artifactSummary}
            </span>
          </span>
          <span className="flex min-w-0 flex-wrap items-center gap-1.5 rounded border border-[#27272C] bg-[#0B0C0E] px-2.5 py-1 font-mono text-[#D4D4D8]">
            <GitCommitHorizontal
              aria-hidden="true"
              className="size-3.5 text-[#71717A]"
            />
            <span className="text-[#71717A]">Commit SHA:</span>
            <span className="break-all text-[#F97316]">
              {candidate.commitSha}
            </span>
          </span>
        </div>
        <div className="mt-3 rounded-md border border-[#3E2517] bg-[#1F1713] p-2.5">
          <div className="mb-1 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#F97316]">
            <Flag aria-hidden="true" className="size-[15px]" />
            Deterministic Interview Focus Areas (Proofline Gaps &amp; Edge Cases)
          </div>
          <ul className="list-inside list-disc space-y-1 text-xs text-[#D4D4D8]">
            {candidate.interviewFocusAreas.map((area) => (
              <li className="break-words" key={area.title}>
                <span className="font-medium text-white">{area.title}:</span>{" "}
                {area.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <label className="mt-4 flex cursor-pointer flex-wrap items-center gap-2 text-xs font-medium text-white">
        <input
          checked={selected}
          className="rounded border-[#3F3F46] bg-[#161619] text-[#F97316] focus:ring-[#F97316]"
          onChange={onToggle}
          type="checkbox"
        />
        Select candidate for technical stage advancement
      </label>
    </article>
  );
}
