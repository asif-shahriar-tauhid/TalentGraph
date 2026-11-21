"use client";

import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Calculator,
  Clock3,
  Download,
  FileText,
  FileDown,
  Code2,
  GitCommitHorizontal,
  LockKeyhole,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Terminal,
  UserRound,
  UsersRound,
  Save,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

interface CandidateEvaluationViewProps {
  jobId?: string;
  candidateId?: string;
}

const panelClass =
  "min-w-0 rounded-xl border border-[#1F242D] bg-[#121417]";
const monoClass = "font-mono [font-variant-numeric:tabular-nums]";

const probes = [
  "Why does this candidate match the role requirements?",
  "What are potential interview verification questions?",
  "Where is the AST provenance evidence for core skills?",
];

const kpis: Array<{
  label: string;
  value: string;
  suffix: string;
  detail: string;
  status: string;
  icon: LucideIcon;
}> = [
  {
    label: "Deterministic Match",
    value: "0.00",
    suffix: "/ 100",
    detail: "Awaiting Evaluation",
    status: "No Score",
    icon: Calculator,
  },
  {
    label: "Verified AST Lines",
    value: "0",
    suffix: "Lines",
    detail: "0% Deterministic AST",
    status: "No Evidence",
    icon: LockKeyhole,
  },
  {
    label: "Timed Mobile Assessment",
    value: "0 / 100",
    suffix: "",
    detail: "0/0 Biometrics",
    status: "No Attempts",
    icon: ShieldCheck,
  },
  {
    label: "Panel Consensus",
    value: "0.0",
    suffix: "/ 100",
    detail: "Pending Panel",
    status: "No Panel",
    icon: UsersRound,
  },
];

export default function CandidateEvaluationView({
  jobId,
  candidateId,
}: CandidateEvaluationViewProps) {
  const [query, setQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [inquiryResult, setInquiryResult] = useState("");
  const [notice, setNotice] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [activeSourceSlot, setActiveSourceSlot] = useState(0);
  const [auditNotes, setAuditNotes] = useState<
    Array<{ id: number; text: string; timestamp: string }>
  >([]);

  const routeContext = useMemo(() => {
    const parts = ["RECRUITER", "JOBS"];
    if (jobId) parts.push(jobId);
    parts.push("CANDIDATE EVALUATION & EVIDENCE EXPLORER");
    if (candidateId) parts.push(candidateId);
    return parts.join(" / ");
  }, [jobId, candidateId]);

  const visibleProbes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return probes;
    return probes.filter((probe) => probe.toLowerCase().includes(normalized));
  }, [query]);

  const executeProbe = () => {
    if (!prompt.trim()) {
      setInquiryResult(
        "Enter an evidence probe or select a suggested probe before execution.",
      );
      return;
    }
    setInquiryResult(
      "No candidate evidence is loaded. This deterministic inquiry cannot synthesize a result until a candidate dossier and verified evidence sources are selected.",
    );
  };

  const saveAuditNote = () => {
    const trimmedNote = noteDraft.trim();
    if (!trimmedNote) return;
    const timestamp = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Dhaka",
      hour12: false,
    }).format(new Date());
    setAuditNotes((currentNotes) => [
      ...currentNotes,
      {
        id: Date.now(),
        text: trimmedNote,
        timestamp: `${timestamp} BST`,
      },
    ]);
    setNoteDraft("");
  };

  const exportDossier = () => {
    const dossier = [
      "TalentGraph Candidate Evaluation Dossier",
      `Job ID: ${jobId || "No Active Job"}`,
      `Candidate ID: ${candidateId || "Unassigned"}`,
      "Candidate: No Candidate Selected",
      "Integrity Audit: 0 / 0 Checks",
      "Deterministic Match: 0.00 / 100",
      "Verified AST Lines: 0",
      "Timed Mobile Assessment: 0 / 100",
      "Panel Consensus: 0.0 / 100",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([dossier], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "candidate-evaluation-dossier.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <div className="-m-4 min-w-0 space-y-5 bg-[#0B0C0E] p-4 text-[#D4D4D8] sm:-m-6 sm:p-6 lg:-m-8 lg:p-8">
      <header className="sticky top-0 z-20 -mx-4 -mt-4 border-b border-[#1F242D] bg-[#0B0C0E]/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:-mt-6 sm:px-6 lg:-mx-8 lg:-mt-8 lg:px-8">
        <div className="mx-auto flex min-w-0 max-w-[1440px] flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div className="min-w-0">
            <p className={`${monoClass} mb-1 break-words text-[10px] uppercase tracking-wider text-[#71717A] sm:text-[11px]`}>
              {routeContext}
            </p>
            <h1 className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
              Candidate Evaluation &amp; Evidence Explorer
            </h1>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <div className="relative w-full min-w-0 sm:w-64">
              <Search
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#71717A]"
              />
              <input
                aria-label="Search candidate artifacts"
                className="h-9 w-full rounded-lg border border-[#1F242D] bg-[#121417] py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search candidate artifacts..."
                type="search"
                value={query}
              />
            </div>
            <button
              className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#1F242D] bg-[#121417] px-3 text-xs font-medium text-white transition-colors hover:bg-[#1A1E24] sm:flex-none"
              onClick={exportDossier}
              type="button"
            >
              <FileDown aria-hidden="true" className="size-4 shrink-0" />
              <span className="break-words">Export Dossier</span>
            </button>
            <div
              aria-label="Candidate profile"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#303640] bg-[#1F242D] text-[#D4D4D8]"
              title="Candidate profile"
            >
              <UserRound aria-hidden="true" className="size-4" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] space-y-5">
        {notice && (
          <div
            className="rounded-lg border border-[#3A2A1D] bg-[#211910] px-3 py-2 text-xs text-[#F4D6BF]"
            role="status"
          >
            {notice}
          </div>
        )}

        <section
          aria-label="Candidate dossier"
          className={`${panelClass} grid grid-cols-1 items-start gap-5 p-4 sm:p-5 lg:grid-cols-12`}
        >
          <div className="min-w-0 lg:col-span-7">
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#303640] bg-[#1F242D] text-base font-bold text-[#D4D4D8]">
                --
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h2 className="break-words text-[20px] font-bold leading-tight tracking-tight text-white sm:text-[22px]">
                    No Candidate Selected
                  </h2>
                  <span className={`${monoClass} break-words text-[13px] text-[#A1A1AA]`}>
                    @unassigned
                  </span>
                </div>
                <p className="mt-1 break-words text-[13px] font-medium text-[#F97316]">
                  Select an applicant from Applicants &amp; Rankings to inspect
                  deterministic evidence
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`${monoClass} break-words rounded border border-[#303640] bg-[#1A1E24] px-2.5 py-1 text-[11px] font-medium text-[#A1A1AA]`}>
                {jobId ? `Job ID: ${jobId}` : "No Active Job"}
              </span>
              <span className={`${monoClass} break-words rounded-full border border-[#303640] bg-[#1A1E24] px-2.5 py-1 text-xs text-[#A1A1AA]`}>
                Rank #—
              </span>
              <span className={`${monoClass} break-words rounded-full border border-[#44301B] bg-[#2C2114] px-2.5 py-1 text-xs text-[#E5933A]`}>
                Stage: Awaiting Evaluation
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1">
                <MapPin aria-hidden="true" className="size-3.5" />
                Location: —
              </span>
              <span className="break-words">Applied: —</span>
              <span className="inline-flex min-w-0 items-center gap-1 break-words rounded border border-[#303640] bg-[#171A1F] px-2 py-0.5 font-mono text-[11px]">
                <Code2 aria-hidden="true" className="size-3.5 shrink-0" />
                No GitHub repository linked
              </span>
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3 lg:col-span-5">
            <button
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#F97316] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#EA580C]"
              onClick={() =>
                setNotice(
                  "Advance action requires a selected candidate and completed evaluation.",
                )
              }
              type="button"
            >
              <BadgeCheck aria-hidden="true" className="size-4" />
              <span className="break-words">Advance to Offer Stage</span>
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </button>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#303640] bg-[#121417] px-2.5 py-2 text-xs font-medium text-[#D4D4D8] hover:bg-[#1A1E24]"
                onClick={() =>
                  setNotice(
                    "Request a debrief after a candidate dossier is loaded.",
                  )
                }
                type="button"
              >
                <MessageSquare aria-hidden="true" className="size-3.5" />
                <span className="break-words">Request Debrief</span>
              </button>
              <button
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#5A3035] bg-[#2E181D] px-2.5 py-2 text-xs font-medium text-[#FFB4AB] hover:bg-[#3A1E24]"
                onClick={() =>
                  setNotice(
                    "Evidence rejection is unavailable until an evaluation dossier exists.",
                  )
                }
                type="button"
              >
                <Ban aria-hidden="true" className="size-3.5" />
                <span className="break-words">Reject with Evidence</span>
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#1F242D] pt-2.5">
              <span className="inline-flex min-w-0 items-center gap-1.5 break-words rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-1 font-mono text-[10px] text-[#4ADE80]">
                <ShieldCheck aria-hidden="true" className="size-3.5 shrink-0" />
                Integrity Audit: 0 / 0 Checks
              </span>
              <button
                className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-lg border border-[#303640] bg-[#121417] px-2 py-1 text-[11px] font-medium text-[#A1A1AA] hover:text-white"
                onClick={exportDossier}
                type="button"
              >
                <Download aria-hidden="true" className="size-3" />
                Proofline
              </button>
            </div>
          </div>
        </section>

        <section
          aria-label="Candidate metrics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <article
                className={`${panelClass} flex min-h-36 flex-col justify-between p-4`}
                key={kpi.label}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="break-words text-[11px] font-semibold uppercase tracking-wider text-[#A1A1AA]">
                    {kpi.label}
                  </span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#242831] text-[#A1A1AA]">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                </div>
                <p className={`${monoClass} break-words text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl`}>
                  {kpi.value}
                  {kpi.suffix && (
                    <span className="ml-1 text-xs font-normal text-[#71717A]">
                      {kpi.suffix}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1F242D] pt-2.5">
                  <span className="break-words text-[11px] text-[#71717A]">
                    {kpi.detail}
                  </span>
                  <span className={`${monoClass} rounded bg-[#242831] px-1.5 py-0.5 text-[10px] text-[#A1A1AA]`}>
                    {kpi.status}
                  </span>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-5 xl:col-span-8">
          <div className={`${panelClass} min-w-0 p-4 sm:p-5`}>
            <div className="flex min-w-0 flex-col gap-3 border-b border-[#1F242D] pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <Calculator
                    aria-hidden="true"
                    className="size-[18px] shrink-0 text-[#F97316]"
                  />
                  <h2 className="break-words text-base font-semibold text-white">
                    Deterministic Skill Breakdown &amp; Score Weighting
                  </h2>
                </div>
                <p className={`${monoClass} mt-1 break-words text-[11px] leading-relaxed text-[#A1A1AA]`}>
                  Formula: Contribution(candidate, skill) = SkillWeight ×
                  (CandidateScore / MaxCohortScore)
                </p>
              </div>
              <span className={`${monoClass} inline-flex shrink-0 items-center gap-1.5 self-start rounded border border-[#1A3D2C] bg-[#13281E] px-2.5 py-1 text-[10px] text-[#4ADE80]`}>
                <span className="size-1.5 rounded-full bg-[#4ADE80]" />
                Cohort Max: 0.0 pts
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1F242D] bg-[#0F1114] text-[#71717A]">
                    <th className="px-3 py-3 font-semibold uppercase tracking-wider">
                      Skill Area &amp; Target
                    </th>
                    <th className="px-3 py-3 text-right font-semibold uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-3 py-3 text-right font-semibold uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-3 py-3 text-right font-semibold uppercase tracking-wider">
                      Contribution
                    </th>
                    <th className="px-3 py-3 text-center font-semibold uppercase tracking-wider">
                      Threshold
                    </th>
                    <th className="px-3 py-3 font-semibold uppercase tracking-wider">
                      Provenance Anchor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-10 text-center" colSpan={6}>
                      <p className="mx-auto max-w-lg break-words leading-relaxed text-[#A1A1AA]">
                        No skill evaluation matrix loaded yet. Deterministic
                        skill weights, threshold gates, and AST provenance
                        anchors will appear once a candidate dossier is selected.
                      </p>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#303640] bg-[#1A1E24]">
                    <td className="px-3 py-3 font-semibold text-white">
                      Composite Weighted Match Total
                    </td>
                    <td className={`${monoClass} px-3 py-3 text-right text-[#A1A1AA]`}>
                      100.0%
                    </td>
                    <td className={`${monoClass} px-3 py-3 text-right text-[#A1A1AA]`}>
                      —
                    </td>
                    <td className={`${monoClass} px-3 py-3 text-right font-bold text-white`}>
                      0.00 pts
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`${monoClass} rounded border border-[#44301B] bg-[#2C2114] px-2 py-0.5 text-[10px] text-[#E5933A]`}>
                        Pending Audit
                      </span>
                    </td>
                    <td className={`${monoClass} break-words px-3 py-3 text-[#A1A1AA]`}>
                      SHA: —
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className={`${panelClass} min-w-0 p-4 sm:p-5`}>
            <div className="flex min-w-0 flex-col gap-3 border-b border-[#1F242D] pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <Terminal
                    aria-hidden="true"
                    className="size-[18px] shrink-0 text-[#F97316]"
                  />
                  <h2 className="break-words text-base font-semibold text-white">
                    Interactive Source Evidence Inspector
                  </h2>
                </div>
                <p className="mt-1 break-words text-xs leading-relaxed text-[#A1A1AA]">
                  Direct Abstract Syntax Tree syntax inspection linking code claims
                  to verified git commit logs
                </p>
              </div>
            </div>
            <div
              aria-label="Source file slots"
              className="mt-4 grid grid-cols-3 gap-1 rounded-lg border border-[#1F242D] bg-[#0F1114] p-1"
              role="tablist"
            >
              {["source_slot_1.ast", "source_slot_2.ast", "source_slot_3.ast"].map(
                (source, index) => {
                  const isActive = activeSourceSlot === index;
                  return (
                    <button
                      key={source}
                      aria-selected={isActive}
                      className={`${monoClass} flex min-w-0 items-center justify-center gap-2 rounded-md border px-2 py-2 text-[11px] transition-colors duration-200 ${
                        isActive
                          ? "border-[#F97316]/40 bg-[#F97316]/10 text-[#F97316]"
                          : "border-transparent text-[#A1A1AA] hover:bg-[#171A1F] hover:text-white"
                      }`}
                      onClick={() => setActiveSourceSlot(index)}
                      role="tab"
                      type="button"
                    >
                      <Code2 aria-hidden="true" className="size-3.5 shrink-0" />
                      <span className="truncate">{source}</span>
                    </button>
                  );
                },
              )}
            </div>
            <div className="mt-3 flex min-w-0 flex-col items-start gap-2">
              <div className={`${monoClass} flex min-w-0 flex-wrap items-center gap-2 text-[11px] text-[#A1A1AA]`}>
                <span className="inline-flex items-center gap-1.5">
                  <GitCommitHorizontal aria-hidden="true" className="size-3.5" />
                  Commit: —
                </span>
                <span aria-hidden="true">•</span>
                <span>Authored — by @unassigned</span>
                <span aria-hidden="true">•</span>
                <span>Lines 0 of 0</span>
              </div>
              <span className={`${monoClass} inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-400`}>
                <ShieldCheck aria-hidden="true" className="size-3.5" />
                Invariant: Awaiting AST Verification
              </span>
            </div>
            <div className={`${monoClass} mt-3 min-w-0 overflow-x-auto rounded-lg border border-[#1F242D] bg-[#0B0C0E] py-2 text-[12px] leading-relaxed`}>
              <div className="min-w-[700px]">
                <div className="flex items-center gap-4 px-4 py-1 text-[#A1A1AA]">
                  <span className="w-5 shrink-0 text-right text-[#52525B]">01</span>
                  <code>// Abstract Syntax Tree (AST) Ground-Truth Verification Canvas</code>
                </div>
                <div className="flex items-center gap-4 px-4 py-1 text-[#A1A1AA]">
                  <span className="w-5 shrink-0 text-right text-[#52525B]">02</span>
                  <code>// Awaiting candidate repository indexing and git commit provenance</code>
                </div>
                <div className="flex items-center gap-4 border-l-2 border-[#F97316] bg-[#F97316]/10 px-4 py-1 text-[#E4E4E7]">
                  <span className="w-5 shrink-0 text-right text-[#52525B]">03</span>
                  <code>ast.verifyInvariant(candidateRepo, commitSha)</code>
                  <span className={`${monoClass} ml-auto shrink-0 rounded-full bg-[#F97316]/15 px-2 py-0.5 text-[10px] text-[#F97316]`}>
                    AST Node: Awaiting Verification
                  </span>
                </div>
                <div className="flex items-center gap-4 px-4 py-1 text-[#A1A1AA]">
                  <span className="w-5 shrink-0 text-right text-[#52525B]">04</span>
                  <code>// Verified AST nodes will appear after repository indexing.</code>
                </div>
                <div className="flex items-center gap-4 px-4 py-1 text-[#A1A1AA]">
                  <span className="w-5 shrink-0 text-right text-[#52525B]">05</span>
                  <code>// Commit provenance will appear after candidate assignment.</code>
                </div>
                <div className="flex items-center gap-4 px-4 py-1 text-[#A1A1AA]">
                  <span className="w-5 shrink-0 text-right text-[#52525B]">06</span>
                  <code>// No source lines are available for inspection.</code>
                </div>
                <div className="flex items-center gap-4 px-4 py-1 text-[#A1A1AA]">
                  <span className="w-5 shrink-0 text-right text-[#52525B]">07</span>
                  <code>// Awaiting verified source and commit provenance.</code>
                </div>
              </div>
            </div>
          </div>
          </div>

          <aside className={`${panelClass} min-w-0 p-4 sm:p-5 xl:col-span-4`}>
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-3">
              <div className="flex min-w-0 items-center gap-2">
                <Search
                  aria-hidden="true"
                  className="size-[18px] shrink-0 text-[#F97316]"
                />
                <h2 className="break-words text-base font-semibold text-white">
                  Evidence-Grounded RAG Inquiry
                </h2>
              </div>
              <span className={`${monoClass} rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-0.5 text-[10px] text-[#4ADE80]`}>
                Strict Citations Grounding
              </span>
            </div>
            <p className="mt-3 break-words text-xs leading-relaxed text-[#A1A1AA]">
              Synthesizes exclusively from verified candidate AST nodes,
              biometric mobile logs, and CV assertions.
            </p>

            <div className="mt-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                Suggested Evidence Probes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {visibleProbes.map((probe) => (
                  <button
                    className="inline-flex max-w-full items-start gap-1 rounded-full border border-[#303640] bg-[#242831] px-2.5 py-1 text-left text-[11px] leading-relaxed text-[#D4D4D8] transition-colors hover:border-[#F97316]/60 hover:text-white"
                    key={probe}
                    onClick={() => setPrompt(probe)}
                    type="button"
                  >
                    <Search
                      aria-hidden="true"
                      className="mt-0.5 size-3 shrink-0 text-[#F97316]"
                    />
                    <span className="min-w-0 break-words">{probe}</span>
                  </button>
                ))}
              </div>
              {visibleProbes.length === 0 && (
                <p className="break-words text-xs text-[#71717A]">
                  No suggested probes match “{query}”.
                </p>
              )}
            </div>

            <div className="mt-4">
              <textarea
                aria-label="Evidence inquiry prompt"
                className="min-h-20 w-full resize-none rounded-lg border border-[#303640] bg-[#0B0C0E] p-2.5 text-xs leading-relaxed text-[#D4D4D8] placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask RAG inquiry engine across candidate audit logs..."
                rows={3}
                value={prompt}
              />
              <div className="mt-2 flex justify-end">
                <button
                  className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg bg-[#F97316] px-3 py-2 text-xs font-semibold text-white hover:bg-[#EA580C]"
                  onClick={executeProbe}
                  type="button"
                >
                  Execute Probe
                  <ArrowRight aria-hidden="true" className="size-3" />
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`${monoClass} break-words text-[10px] text-[#A1A1AA]`}>
                  Model: Tiger-RAG-v3.1 (Deterministic)
                </span>
                <span className={`${monoClass} text-[10px] text-[#4ADE80]`}>
                  Latency: —
                </span>
              </div>
              <p className="mt-3 break-words text-xs leading-relaxed text-[#D4D4D8]">
                {inquiryResult ||
                  "Awaiting candidate evidence. No deterministic inquiry output has been generated."}
              </p>
              <div className="mt-3 flex min-w-0 items-start gap-1.5 border-t border-[#1F242D] pt-3 text-[10px] leading-relaxed text-[#71717A]">
                <LockKeyhole
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0"
                />
                <span className="break-words">
                  Platform Policy: AI synthesizes verified citations only.
                  Hiring decisions remain strictly with human recruiters.
                </span>
              </div>
            </div>

            <div className={`${panelClass} mt-5 p-4 sm:p-5`}>
              <div className="flex min-w-0 items-center justify-between gap-2 border-b border-[#1F242D] pb-3">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText
                    aria-hidden="true"
                    className="size-[18px] shrink-0 text-[#F97316]"
                  />
                  <h2 className="break-words text-base font-semibold text-white">
                    Application Dossier &amp; Artifacts
                  </h2>
                </div>
                <LockKeyhole
                  aria-hidden="true"
                  className="size-[18px] shrink-0 text-[#71717A]"
                />
              </div>
              <div className="mt-3 flex min-w-0 items-start gap-3 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded bg-[#242831] text-[#71717A]">
                  <FileText aria-hidden="true" className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="break-words text-xs font-semibold text-white">
                    No application dossier uploaded yet
                  </p>
                  <p className="mt-1 break-words text-[11px] text-[#71717A]">
                    Awaiting candidate submission
                  </p>
                </div>
              </div>
              <div className="mt-3 flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-lg border border-[#1F242D] bg-[#0F1114] px-3 py-2">
                <span className={`${monoClass} min-w-0 break-words text-[11px] text-[#A1A1AA]`}>
                  Ledger Proof: —
                </span>
                <span className={`${monoClass} rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 text-[10px] text-[#4ADE80]`}>
                  Immutable
                </span>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                  Recruiter Audit Trail
                </p>
                {auditNotes.length === 0 ? (
                  <p className="break-words rounded-lg border border-[#1F242D] bg-[#171A1F] p-3 text-xs text-[#A1A1AA]">
                    No internal evaluation notes recorded yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {auditNotes.map((note) => (
                      <div
                        className="rounded-lg border border-[#1F242D] bg-[#171A1F] p-3"
                        key={note.id}
                      >
                        <div className={`${monoClass} flex min-w-0 items-center gap-1.5 break-words text-[10px] text-[#71717A]`}>
                          <Clock3 aria-hidden="true" className="size-3 shrink-0" />
                          <span className="break-words">{note.timestamp}</span>
                        </div>
                        <p className="mt-2 break-words text-xs leading-relaxed text-[#D4D4D8]">
                          {note.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <textarea
                  aria-label="Add internal evaluation note"
                  className="mt-3 min-h-20 w-full resize-none rounded-lg border border-[#303640] bg-[#0B0C0E] p-2.5 text-xs leading-relaxed text-[#D4D4D8] placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="Add internal evaluation note..."
                  rows={3}
                  value={noteDraft}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#303640] bg-[#1F242D] px-3 py-2 text-xs font-medium text-[#D4D4D8] transition-colors hover:border-[#F97316]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!noteDraft.trim()}
                    onClick={saveAuditNote}
                    type="button"
                  >
                    <Save aria-hidden="true" className="size-3.5" />
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
