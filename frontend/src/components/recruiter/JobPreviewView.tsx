"use client";

import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Eye,
  History,
  LockKeyhole,
  Moon,
  Rocket,
  Save,
  Search,
  ShieldCheck,
  Smartphone,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "@/providers/themeProvider";
import {
  clearJobWizardDraft,
  loadJobWizardDraft,
  saveJobWizardDraft,
  type JobWizardDraft,
} from "./jobWizardDraft";

type ProjectionMode = "candidate" | "raw";

const emptyDraft: JobWizardDraft = { skills: [], questions: [] };
const panelClass =
  "min-w-0 rounded-xl border border-[#1F242D] bg-[#121417] p-4 shadow-sm sm:p-6";
const insetClass =
  "min-w-0 rounded-lg border border-[#272C34] bg-[#171A1F] p-3";
const previousSteps = [
  "Basics & Role Scope",
  "Requirements & Taxonomy",
  "Deterministic Weights",
  "Assessment Protocol",
] as const;

function PreviewStepper() {
  return (
    <nav
      aria-label="Job wizard steps"
      className={`${panelClass} grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5`}
    >
      {previousSteps.map((step, index) => (
        <Link
          key={step}
          href="/recruiter/jobs/new"
          className="flex min-w-0 items-center gap-2.5 rounded-lg border border-[#252930] bg-[#0F1114] p-2 text-left hover:border-[#3B4049]"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#214833] bg-[#12251B] text-emerald-400">
            <Check className="size-3.5" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[9px] uppercase text-[#858A94]">
              Step {String(index + 1).padStart(2, "0")}
            </span>
            <span className="block break-words text-[11px] font-medium text-[#D4D4D8]">
              {step}
            </span>
          </span>
        </Link>
      ))}
      <div
        aria-current="step"
        className="flex min-w-0 items-center gap-2.5 rounded-lg border border-[#F97316] bg-[#241911] p-2 text-left"
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F97316] font-mono text-[10px] font-bold text-white">
          05
        </span>
        <span className="min-w-0">
          <span className="flex min-w-0 flex-wrap items-center gap-1">
            <span className="font-mono text-[9px] font-semibold uppercase text-[#FB923C]">
              Active
            </span>
            <span className="rounded bg-[#3A2114] px-1 py-0.5 font-mono text-[8px] text-[#FDBA74]">
              Publish Gate
            </span>
          </span>
          <span className="mt-0.5 block break-words text-[11px] font-semibold text-white">
            Preview &amp; Publish
          </span>
        </span>
      </div>
    </nav>
  );
}

function StatusBadge({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "amber" | "neutral";
}) {
  const classes =
    tone === "green"
      ? "border-[#214833] bg-[#12251B] text-emerald-400"
      : tone === "amber"
        ? "border-[#633314] bg-[#2A1B11] text-[#FDBA74]"
        : "border-[#30343C] bg-[#20242B] text-[#B3B7BF]";
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded border px-2 py-1 font-mono text-[10px] font-medium ${classes}`}
    >
      {children}
    </span>
  );
}

export default function JobPreviewView() {
  const { resolvedTheme, setTheme } = useTheme();
  const [draft, setDraft] = useState<JobWizardDraft>(emptyDraft);
  const [projection, setProjection] = useState<ProjectionMode>("candidate");
  const [saved, setSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) {
        return;
      }

      try {
        const loadedDraft = loadJobWizardDraft();
        if (loadedDraft) {
          setDraft(loadedDraft);
          setSaved(true);
        }
      } catch {
        setStatusMessage("The saved wizard draft could not be loaded.");
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const allocatedWeight = draft.skills.reduce(
    (total, skill) => total + skill.weight,
    0,
  );
  const totalPoints = draft.questions.length * 20;
  const totalSeconds = draft.questions.reduce(
    (total, question) => total + question.seconds,
    0,
  );
  const weightsValid =
    draft.skills.length > 0 && Math.round(allocatedWeight * 10) === 1000;
  const timersValid =
    draft.questions.length > 0 &&
    draft.questions.every(
      (question) =>
        Number.isFinite(question.seconds) && question.seconds > 0,
    );
  const validations = [
    {
      label: "Company Legitimacy Verified",
      detail: "Organization verification is not configured.",
      passed: false,
    },
    {
      label: "Recruiter Affiliation Active",
      detail: "Recruiter affiliation is not configured.",
      passed: false,
    },
    {
      label: "Plan Quota Available",
      detail: "0/5 active job slots used; 5 available",
      passed: false,
    },
    {
      label: "Deterministic Skill Weights Sum",
      detail: `${allocatedWeight.toFixed(1)}% Allocated (Requires 100.0%)`,
      passed: weightsValid,
    },
    {
      label: "Assessment Timers & Point Matrix Synced",
      detail: `${draft.questions.length} Qs • ${totalSeconds}s • ${totalPoints} Pts calibrated`,
      passed: timersValid,
    },
    {
      label: "Fair Hiring & Anti-Bias Mandate",
      detail: "Cryptographic blind rating ready",
      passed: false,
    },
  ];
  const passedCount = validations.filter((validation) => validation.passed).length;
  const rawSpec = {
    specId: "TG-SPEC-UNASSIGNED",
    jobId: "JOB-UNASSIGNED",
    organization: {
      name: "Unconfigured Organization",
      verification: "Pending",
      division: "Unassigned",
    },
    role: {
      title: "Untitled Role Opening",
      department: "Unassigned Department",
      employment: "Not set",
      experience: "Not set",
      location: "Not set",
      deadline: null,
      compensation: "Not configured",
    },
    skills: draft.skills.map((skill) => ({
      name: skill.name,
      requirement: skill.required ? "Required" : "Preferred",
      weightPercent: skill.weight,
      minimumQualifyingScore: skill.minimum,
    })),
    totalWeightPercent: allocatedWeight,
    assessment: {
      questions: draft.questions.map((question) => ({
        title: question.title,
        skill: question.skill,
        timerSeconds: question.seconds,
        points: 20,
      })),
      questionCount: draft.questions.length,
      durationSeconds: totalSeconds,
      totalPoints,
      requiredCameraSnapshots: 5,
    },
    integrity: {
      publishingStatus: "Not published",
      sha256: "Pending publication snapshot hash",
      revision: 0,
    },
  };

  const saveDraft = () => {
    try {
      saveJobWizardDraft(draft);
      setSaved(true);
      setStatusMessage("Draft saved in this browser session.");
    } catch {
      setSaved(false);
      setStatusMessage("The draft could not be saved in this browser session.");
    }
  };

  const resetDraft = () => {
    try {
      clearJobWizardDraft();
      setDraft(emptyDraft);
      setSaved(false);
      setProjection("candidate");
      setStatusMessage("Preview reset to its zero-data state.");
    } catch {
      setStatusMessage("The saved draft could not be removed from this session.");
    }
  };

  const handlePublish = () => {
    setPublishDialogOpen(true);
  };

  const confirmPublish = () => {
    setPublishDialogOpen(false);
    setStatusMessage(
      passedCount === validations.length
        ? "Network publication is not configured in this environment."
        : `Publication is blocked: ${passedCount} of 6 pre-flight checks passed.`,
    );
  };

  return (
    <div className="-m-4 min-w-0 bg-[#0B0C0E] text-[#E4E4E7] sm:-m-6 lg:-m-8">
      <header className="sticky top-0 z-30 border-b border-[#1F242D] bg-[#121417]/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-[#858A94]">
            <span>RECRUITER</span>
            <span>/</span>
            <span>JOBS</span>
            <span>/</span>
            <span className="rounded border border-[#633314] bg-[#2A1B11] px-1.5 py-0.5 text-[#FDBA74]">
              NEW JOB WIZARD • STEP_05_FINAL_GATE
            </span>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#214833] bg-[#12251B] px-2 py-1 font-mono text-[10px] text-emerald-400">
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
              {saved ? "Saved this session" : "Not saved yet"}
            </span>
            <button type="button" onClick={saveDraft} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#30343C] bg-[#191C21] px-3 text-xs font-medium text-[#D4D4D8] hover:bg-[#242830]">
              <Save className="size-4" />
              <span>Save Draft</span>
            </button>
            <Link
              href="/recruiter/jobs"
              className="inline-flex h-8 items-center rounded-lg px-3 text-xs font-medium text-[#A1A1AA] hover:bg-[#20242B] hover:text-white"
            >
              Exit Wizard
            </Link>
            <button
              type="button"
              aria-label="Search documentation"
              title="Search documentation"
              onClick={() =>
                setStatusMessage("Documentation search is not configured.")
              }
              className="flex size-8 items-center justify-center rounded-md border border-[#30343C] bg-[#191C21] text-[#A1A1AA] hover:text-white"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              aria-label="History / Reset preview"
              title="History / Reset"
              onClick={resetDraft}
              className="flex size-8 items-center justify-center rounded-md border border-[#30343C] bg-[#191C21] text-[#A1A1AA] hover:text-white"
            >
              <History className="size-4" />
            </button>
            <button
              type="button"
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="flex size-8 items-center justify-center rounded-md border border-[#30343C] bg-[#191C21] text-[#A1A1AA] hover:text-white"
            >
              {resolvedTheme === "dark" ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
            </button>
          </div>
        </div>
        <div className="mx-auto mt-3 flex max-w-[1440px] min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="break-words text-2xl font-bold tracking-tight text-white">
              Preview &amp; Publish Job Opening
            </h1>
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-[#A1A1AA]">
              Inspect candidate-facing role presentation, verify cryptographic
              skill weight equations, and execute final network publication.
            </p>
          </div>
          <span className="max-w-full break-all rounded border border-[#30343C] bg-[#191C21] px-2.5 py-1 font-mono text-[10px] text-[#A1A1AA]">
            SPEC ID: #TG-SPEC-UNASSIGNED
          </span>
        </div>
        {statusMessage && (
          <p
            role="status"
            className="mx-auto mt-2 max-w-[1440px] break-words text-xs text-[#FDBA74]"
          >
            {statusMessage}
          </p>
        )}
      </header>

      <main className="mx-auto w-full max-w-[1440px] space-y-5 p-4 pb-44 sm:p-6 sm:pb-44 lg:pb-28">
        <PreviewStepper />

        <section className={`${panelClass} flex min-w-0 flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between`}>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <Eye className="size-4 shrink-0 text-[#F97316]" />
            <span className="text-xs font-medium text-[#D4D4D8]">
              Live Rendering Projection:
            </span>
            <span className="break-all font-mono text-[10px] text-[#858A94]">
              /candidate/jobs/unassigned
            </span>
          </div>
          <div
            role="group"
            aria-label="Preview projection"
            className="flex min-w-0 flex-wrap items-center gap-1 rounded-lg border border-[#30343C] bg-[#0F1114] p-1"
          >
            <button
              type="button"
              aria-pressed={projection === "candidate"}
              onClick={() => setProjection("candidate")}
              className={`inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded px-2.5 py-2 text-xs ${
                projection === "candidate"
                  ? "bg-[#292D33] font-semibold text-white"
                  : "text-[#858A94] hover:text-white"
              }`}
            >
              <Smartphone className="size-4 shrink-0" />
              <span className="break-words">Candidate View (Public Portal)</span>
            </button>
            <button
              type="button"
              aria-pressed={projection === "raw"}
              onClick={() => setProjection("raw")}
              className={`inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded px-2.5 py-2 text-xs ${
                projection === "raw"
                  ? "bg-[#292D33] font-semibold text-white"
                  : "text-[#858A94] hover:text-white"
              }`}
            >
              <Code2 className="size-4 shrink-0" />
              <span className="break-words">Raw Spec (JSON/Audit)</span>
            </button>
          </div>
        </section>

        {projection === "raw" ? (
          <section className={`${panelClass} space-y-5`}>
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#252930] pb-3">
              <h2 className="text-sm font-semibold text-white">
                Raw Specification &amp; Audit View
              </h2>
              <StatusBadge tone="neutral">JSON • Unpublished</StatusBadge>
            </div>
            <pre className="max-w-full whitespace-pre-wrap break-all rounded-lg border border-[#272C34] bg-[#0F1114] p-4 font-mono text-[11px] leading-relaxed text-[#FDBA74]">
              {JSON.stringify(rawSpec, null, 2)}
            </pre>
          </section>
        ) : (
          <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-12">
            <div className="min-w-0 space-y-5 xl:col-span-8">
              <article className="min-w-0 overflow-hidden rounded-xl border border-[#1F242D] bg-[#121417] shadow-md">
                <div className="border-b border-[#252930] bg-gradient-to-b from-[#181A1F] to-[#121417] p-4 sm:p-6">
                  <div className="mb-4 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F97316] text-base font-bold tracking-tight text-white shadow-md">
                        --
                      </div>
                      <div className="min-w-0">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="break-words text-sm font-semibold text-white">
                            Unconfigured Organization
                          </span>
                          <StatusBadge>Verification Pending</StatusBadge>
                        </div>
                        <p className="mt-1 break-words font-mono text-[10px] text-[#858A94]">
                          Division Unassigned • Location: Not set
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0 rounded-lg border border-[#30343C] bg-[#171A1F] px-3 py-2 sm:text-right">
                      <p className="font-mono text-[9px] uppercase text-[#858A94]">
                        APPLICATION WINDOW
                      </p>
                      <p className="mt-1 flex flex-wrap items-center gap-1 font-mono text-[10px] font-semibold text-[#FDBA74] sm:justify-end">
                        <Clock3 className="size-3.5 shrink-0" />
                        <span>Deadline Not Set (0 Days Remaining)</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 min-w-0">
                    <p className="mb-1 flex min-w-0 flex-wrap items-center gap-2 font-mono text-[10px] text-[#858A94]">
                      <span>#JOB-UNASSIGNED</span>
                      <span>•</span>
                      <span>Unassigned Department</span>
                    </p>
                    <h2 className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                      Untitled Role Opening
                    </h2>
                    <div className="mt-3 flex min-w-0 flex-wrap gap-2 text-[10px]">
                      {[
                        "Employment: Not set",
                        "Experience: Not set",
                        "Location: Not set",
                      ].map((item) => (
                        <span
                          key={item}
                          className="max-w-full break-words rounded border border-[#30343C] bg-[#1C1F24] px-2.5 py-1 text-[#D4D4D8]"
                        >
                          {item}
                        </span>
                      ))}
                      <span className="max-w-full break-words rounded border border-[#214833] bg-[#12251B] px-2.5 py-1 font-mono text-emerald-400">
                        ৳ Compensation Not Configured
                      </span>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 space-y-5 p-4 sm:p-6">
                  <section>
                    <h3 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#858A94]">
                      ROLE CONTEXT &amp; SCOPE
                    </h3>
                    <p className="text-xs leading-relaxed text-[#D4D4D8]">
                      Role context and architectural scope have not been
                      configured yet. Complete Step 01 &amp; Step 02 in the Job
                      Wizard to populate candidate-facing responsibilities.
                    </p>
                    <div className="mt-3 grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2">
                      {[
                        "Primary engineering ownership deliverable pending configuration.",
                        "Deterministic proofline & verification benchmark pending configuration.",
                      ].map((highlight) => (
                        <div
                          key={highlight}
                          className={`${insetClass} flex min-w-0 items-start gap-2 text-xs leading-relaxed text-[#A1A1AA]`}
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                          <span className="break-words">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="border-t border-[#252930] pt-5">
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="break-words font-mono text-[10px] font-semibold uppercase tracking-wider text-[#858A94]">
                          DETERMINISTIC SKILL WEIGHTS &amp; PROOFLINE STANDARDS
                        </h3>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#A1A1AA]">
                          Candidate qualification is strictly evaluated via
                          cryptographically verified artifacts and objective
                          test benchmarks.
                        </p>
                      </div>
                      <StatusBadge>
                        Sum: {allocatedWeight.toFixed(1)}% / Target 100.0%
                      </StatusBadge>
                    </div>
                    {draft.skills.length === 0 ? (
                      <div className={`${insetClass} mt-3 text-xs leading-relaxed text-[#A1A1AA]`}>
                        No skills weighted yet. Configure deterministic skill
                        weights in Step 03 to preview candidate evaluation
                        bars.
                      </div>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {draft.skills.map((skill, index) => (
                          <div
                            key={`preview-skill-${index}`}
                            className={`${insetClass} space-y-2`}
                          >
                            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                              <span className="break-words text-xs font-semibold text-white">
                                {skill.name || `Unconfigured Skill ${index + 1}`}
                              </span>
                              <span className="rounded border border-[#633314] bg-[#2A1B11] px-1.5 py-0.5 font-mono text-[10px] text-[#FDBA74]">
                                Weight: {skill.weight.toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-[#0F1114]">
                              <div
                                className="h-full rounded-full bg-[#F97316]"
                                style={{
                                  width: `${Math.min(Math.max(skill.weight, 0), 100)}%`,
                                }}
                              />
                            </div>
                            <div className="flex min-w-0 flex-wrap items-start gap-2 border-l-2 border-[#3B4049] pl-2 font-mono text-[10px] text-[#A1A1AA]">
                              <Code2 className="mt-0.5 size-3.5 shrink-0" />
                              <span>
                                Proofline Verification: Minimum qualifying score{" "}
                                {skill.minimum}/100 •{" "}
                                {skill.required ? "Required" : "Preferred"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  <section className={`${insetClass} flex min-w-0 items-start gap-3`}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#633314] bg-[#2A1B11] text-[#FDBA74]">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <h3 className="break-words text-xs font-semibold text-white">
                          Automated TalentGraph Sandbox Assessment Required
                        </h3>
                        <StatusBadge>Free for All Candidates</StatusBadge>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">
                        This role requires a timed mobile sandbox assessment on
                        the TalentGraph Candidate App with 5 random front-camera
                        snapshot checks. Results are cryptographically signed
                        and immediately computed against role weights.
                      </p>
                      <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-[#858A94]">
                        <span>{totalSeconds}s Countdown</span>
                        <span>•</span>
                        <span>{totalPoints} Maximum Points</span>
                        <span>•</span>
                        <span>Snapshot Verification: On</span>
                      </div>
                    </div>
                  </section>

                  <section className={`${insetClass} flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
                    <div className="min-w-0">
                      <span className="block text-xs font-medium text-white">
                        Ready to simulate candidate pipeline?
                      </span>
                      <span className="mt-1 block text-[11px] text-[#858A94]">
                        This button is displayed on candidate mobile &amp; web
                        portals.
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled
                      className="inline-flex min-h-9 shrink-0 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-[#272B31] px-4 text-xs font-semibold text-[#858A94]"
                    >
                      <span>Apply with SkillGraph</span>
                      <span className="rounded bg-[#1C1F24] px-1.5 py-0.5 font-mono text-[9px]">
                        Preview Only
                      </span>
                    </button>
                  </section>
                </div>
              </article>
            </div>

            <aside className="min-w-0 space-y-5 xl:col-span-4">
              <section className={`${panelClass} space-y-5`}>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#252930] pb-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                    <h2 className="break-words font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                      PRE-FLIGHT GATE VALIDATION
                    </h2>
                  </div>
                  <StatusBadge>{passedCount} / 6 Passed</StatusBadge>
                </div>
                <ul className="space-y-3">
                  {validations.map((validation) => (
                    <li
                      key={validation.label}
                      className="flex min-w-0 items-start gap-2.5"
                    >
                      <span
                        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
                          validation.passed
                            ? "border-[#214833] bg-[#12251B] text-emerald-400"
                            : "border-[#30343C] bg-[#1C1F24] text-[#858A94]"
                        }`}
                      >
                        <Check className="size-3" />
                      </span>
                      <span className="min-w-0">
                        <span className="block break-words text-xs font-medium text-white">
                          {validation.label}
                        </span>
                        <span
                          className={`mt-0.5 block break-words font-mono text-[9px] leading-relaxed ${
                            validation.passed
                              ? "text-emerald-400"
                              : "text-[#858A94]"
                          }`}
                        >
                          {validation.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={`${panelClass} space-y-5`}>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#252930] pb-3">
                  <h2 className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                    <BriefcaseBusiness className="size-4 shrink-0 text-[#FDBA74]" />
                    <span>QUOTA IMPACT</span>
                  </h2>
                  <StatusBadge tone="amber">Unassigned Plan</StatusBadge>
                </div>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[#A1A1AA]">Active Subscription:</span>
                  <span className="break-words text-right font-medium text-white">
                    Not Configured (৳0/mo)
                  </span>
                </div>
                <div className="pt-1">
                  <div className="mb-1.5 flex min-w-0 flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-[#858A94]">Slot Consumption:</span>
                    <span className="text-[#FDBA74]">0/5 → 0/5 slots</span>
                  </div>
                  <div
                    aria-label="Job slot consumption: 0 of 5"
                    className="flex h-2 overflow-hidden rounded-full bg-[#272B31]"
                  >
                    <span className="h-full w-0 bg-emerald-400" />
                    <span className="h-full w-0 bg-[#F97316]" />
                    <span className="h-full flex-1 bg-[#272B31]" />
                  </div>
                  <div className="mt-1 flex min-w-0 flex-wrap items-center justify-between gap-1 font-mono text-[9px] text-[#858A94]">
                    <span>0 Active</span>
                    <span className="text-[#FDBA74]">+0 Publishing</span>
                    <span>5 Remaining</span>
                  </div>
                </div>
                <div className={`${insetClass} flex min-w-0 items-start gap-2 text-[11px] leading-relaxed text-[#A1A1AA]`}>
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  <span>
                    Immediate broadcast to verified candidates with zero
                    algorithmic black-box bias.
                  </span>
                </div>
              </section>

              <section className={`${panelClass} space-y-5`}>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#252930] pb-3">
                  <h2 className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                    <LockKeyhole className="size-4 shrink-0 text-[#A1A1AA]" />
                    <span>IMMUTABLE VERSIONING</span>
                  </h2>
                  <StatusBadge tone="neutral">REV-0</StatusBadge>
                </div>
                <p className="text-xs leading-relaxed text-[#A1A1AA]">
                  Upon publication, this specification snapshot is
                  cryptographically frozen. Skill criteria and assessment
                  parameters are locked to prevent mid-pipeline evaluation
                  drifts.
                </p>
                <div className="break-words rounded border border-[#30343C] bg-[#0F1114] p-2.5 font-mono text-[10px] leading-relaxed text-[#858A94]">
                  <span className="font-semibold text-[#F97316]">SHA-256:</span>{" "}
                  Pending publication snapshot hash
                </div>
              </section>
            </aside>
          </div>
        )}
        <footer className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#1F242D] pt-5 pb-4 font-mono text-xs text-zinc-300 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-white">
              TalentGraph Ground Truth Protocol
            </span>
            <span>• Cryptographic SHA-256 Integrity Verified</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <a href="#proofline-spec" className="hover:text-white">
              Proofline Spec
            </a>
            <span>•</span>
            <a href="#deterministic-scoring" className="hover:text-white">
              Deterministic Scoring Policy
            </a>
            <span>•</span>
            <a href="#recruiter-sla" className="hover:text-white">
              Recruiter SLA
            </a>
            <span>•</span>
            <span>© 2026 TalentGraph Inc.</span>
          </div>
        </footer>
      </main>

      <aside
        aria-label="Publish action bar"
        className="sticky bottom-0 z-40 border-t border-[#252930] bg-[#121417]/95 p-4 shadow-2xl backdrop-blur sm:px-6"
      >
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <BadgeCheck className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="break-words font-mono text-[10px] font-bold uppercase text-white">
                  Step 5 of 5 • Final Publish Gate
                </span>
                <StatusBadge>{passedCount} / 6 Passed</StatusBadge>
              </div>
              <p className="mt-1 break-words text-[10px] text-[#A1A1AA]">
                Validate all 6 pre-flight criteria against RJSC and TalentGraph
                Core Ledger before publication.
              </p>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 items-center gap-2.5 sm:flex sm:flex-wrap lg:w-auto">
            <Link
              href="/recruiter/jobs/new"
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#30343C] bg-[#191C21] px-3 text-xs font-semibold text-[#D4D4D8] hover:bg-[#242830]"
            >
              <ArrowLeft className="size-4 shrink-0" />
              <span>Back to Step 4: Assessment</span>
            </Link>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#30343C] bg-[#191C21] px-3 text-xs font-semibold text-[#D4D4D8] hover:bg-[#242830]"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="inline-flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-4 text-xs font-bold text-[#17120F] shadow-lg shadow-[#F97316]/15 hover:bg-[#FB923C]"
            >
              <Rocket className="size-4 shrink-0" />
              <span className="break-words">Publish Job Opening to Network →</span>
            </button>
          </div>
        </div>
      </aside>

      {publishDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="publish-dialog-title"
            className="w-full max-w-md rounded-xl border border-[#252930] bg-[#121417] p-5 shadow-2xl sm:p-6"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-[#633314] bg-[#2A1B11] text-[#F97316]">
              <Rocket className="size-6" />
            </div>
            <h2
              id="publish-dialog-title"
              className="text-lg font-bold text-white"
            >
              Execute Network Publication?
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">
              You are about to publish{" "}
              <strong className="text-white">Untitled Role Opening</strong>{" "}
              (#JOB-UNASSIGNED) for Unconfigured Organization.
            </p>
            <div className="my-4 space-y-2 rounded-lg border border-[#30343C] bg-[#0F1114] p-3 font-mono text-[10px]">
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 text-[#A1A1AA]">
                <span>Plan Quota Deduction:</span>
                <span className="text-white">1 Active Job Slot</span>
              </div>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 text-[#A1A1AA]">
                <span>Skill Weights Hash:</span>
                <span className={weightsValid ? "text-emerald-400" : "text-[#FDBA74]"}>
                  {weightsValid
                    ? "VALIDATED (100.0%)"
                    : `NOT VALIDATED (${allocatedWeight.toFixed(1)}%)`}
                </span>
              </div>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 text-[#A1A1AA]">
                <span>Sandbox Mode:</span>
                <span className="text-[#FDBA74]">Publication unavailable</span>
              </div>
            </div>
            <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPublishDialogOpen(false)}
                className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#30343C] bg-[#191C21] px-4 text-xs font-semibold text-[#D4D4D8] hover:bg-[#242830]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmPublish}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#F97316] px-4 text-xs font-bold text-[#17120F] hover:bg-[#FB923C]"
              >
                <span>Confirm &amp; Broadcast</span>
                <Check className="size-4" />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
