"use client";

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Code2,
  FileText,
  History,
  LockKeyhole,
  Moon,
  Plus,
  Save,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "@/providers/themeProvider";

type SkillDraft = {
  name: string;
  required: boolean;
  weight: number;
  minimum: number;
};

type QuestionDraft = {
  title: string;
  skill: string;
  seconds: number;
};

type JobWizardViewProps = {
  jobId?: string;
};

const skillColors = ["#34D399", "#22D3EE", "#F97316", "#C084FC"];
const cardClass =
  "min-w-0 rounded-xl border border-[#1F242D] bg-[#121417] p-4 sm:p-5";
const insetClass =
  "min-w-0 rounded-lg border border-[#272C34] bg-[#171A1F] p-3 sm:p-4";
const inputClass =
  "h-9 min-w-0 rounded-md border border-[#30343C] bg-[#111316] px-2.5 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]";
const quietButtonClass =
  "inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#30343C] bg-[#191C21] px-3 py-1.5 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#242830]";

const stepNames = [
  "Basics & Role Setup",
  "Requirements & Taxonomy",
  "Deterministic Weighting",
  "Assessment Protocol",
  "Preview & Publish",
] as const;

function formatOneDecimal(value: number) {
  return (Math.round(value * 10) / 10).toFixed(1);
}

function StepCard({
  step,
  activeStep,
  completed,
  onSelect,
}: {
  step: number;
  activeStep: number;
  completed: boolean;
  onSelect: (step: number) => void;
}) {
  const active = step === activeStep;
  const locked = step === 5;
  const statusText = locked
    ? "Locked"
    : active
      ? "ACTIVE STEP"
      : completed
        ? "Completed"
        : step < 3
          ? "Pending"
          : "Upcoming";
  const statusClass = completed
    ? "text-emerald-400"
    : active
      ? "text-[#F97316]"
      : "text-[#858A94]";

  return (
    <button
      type="button"
      disabled={locked}
      onClick={() => onSelect(step)}
      aria-current={active ? "step" : undefined}
      aria-label={`Step ${step}: ${stepNames[step - 1]}${locked ? ", locked" : ""}`}
      className={`flex min-w-0 items-center gap-3 rounded-lg border p-2.5 text-left transition-colors ${
        active
          ? "border-2 border-[#F97316] bg-[#202126]"
          : completed
            ? "border-[#214833] bg-[#12251B]/60"
            : locked
              ? "cursor-not-allowed border-[#252930] bg-[#171A1F]/60"
              : "border-[#30343C] bg-[#171A1F] hover:border-[#555B65]"
      }`}
    >
      <span
        className={`flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${
          completed
            ? "border-[#214833] bg-[#12251B] text-emerald-400"
            : active
              ? "border-[#F97316] bg-[#F97316] text-white"
              : "border-[#3B4049] bg-[#22262D] text-[#A1A1AA]"
        }`}
      >
        {completed ? (
          <Check className="size-4" />
        ) : locked ? (
          <LockKeyhole className="size-3.5" />
        ) : (
          String(step).padStart(2, "0")
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <span className={`font-mono text-[10px] font-semibold ${statusClass}`}>
            {active ? statusText : `STEP ${String(step).padStart(2, "0")}`}
          </span>
          {active && step === 3 ? (
            <span className="rounded bg-[#3A2114] px-1.5 py-0.5 font-mono text-[9px] text-[#FDBA74]">
              100% Sum Mode
            </span>
          ) : (
            <span className={`text-[10px] ${statusClass}`}>{statusText}</span>
          )}
        </span>
        <span
          className={`mt-0.5 block break-words text-xs font-medium ${
            active ? "text-white" : locked ? "text-[#858A94]" : "text-[#D4D4D8]"
          }`}
        >
          {stepNames[step - 1]}
        </span>
      </span>
    </button>
  );
}

function SectionHeading({
  tag,
  title,
  subtitle,
  trailing,
}: {
  tag: string;
  title: string;
  subtitle: string;
  trailing: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 border-b border-[#252930] pb-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="rounded border border-[#633314] bg-[#2A1B11] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#FDBA74]">
            {tag}
          </span>
          <h2 className="break-words text-base font-semibold text-white">
            {title}
          </h2>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[#A1A1AA]">
          {subtitle}
        </p>
      </div>
      <div className="shrink-0">{trailing}</div>
    </div>
  );
}

export default function JobWizardView({ jobId }: JobWizardViewProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [activeStep, setActiveStep] = useState(3);
  const [skills, setSkills] = useState<SkillDraft[]>([]);
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);
  const [saved, setSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const allocatedWeight = skills.reduce((total, skill) => total + skill.weight, 0);
  const validWeights =
    skills.length > 0 && Math.round(allocatedWeight * 10) === 1000;
  const totalPoints = questions.length * 20;
  const totalSeconds = questions.reduce(
    (total, question) => total + question.seconds,
    0,
  );
  const durationMinutes = Math.ceil(totalSeconds / 60);
  const checks = [
    { label: "Company Legitimacy Verified", passed: false },
    { label: "Recruiter Affiliated", passed: false },
    {
      label: "Active Publishing Quota (0/5 in use)",
      passed: false,
    },
    { label: "Skill Weights Sum Exactly 100.0%", passed: validWeights },
    {
      label: "Assessment Protocol Timers Consistent",
      passed:
        questions.length > 0 &&
        questions.every(
          (question) =>
            Number.isFinite(question.seconds) && question.seconds > 0,
        ),
    },
  ];
  const passedChecks = checks.filter((check) => check.passed).length;
  const canPublish = passedChecks === checks.length;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const selectStep = (step: number) => {
    if (step === 5) {
      setStatusMessage("Complete every pre-flight check to unlock publishing.");
      return;
    }
    setActiveStep(step);
    const targetByStep: Record<number, string> = {
      1: "step-01-recap",
      2: "step-02-recap",
      3: "skill-weight-matrix",
      4: "assessment-protocol",
    };
    window.requestAnimationFrame(() => scrollTo(targetByStep[step]));
  };

  const saveDraft = () => {
    setSaved(true);
    setStatusMessage("Draft saved in this session.");
  };

  const resetDraft = () => {
    setSkills([]);
    setQuestions([]);
    setActiveStep(3);
    setSaved(false);
    setStatusMessage("Wizard draft reset to its empty initial state.");
    scrollTo("skill-weight-matrix");
  };

  const addSkill = () => {
    setSkills((current) => [
      ...current,
      { name: "", required: true, weight: 0, minimum: 0 },
    ]);
    setSaved(false);
    setStatusMessage("Added an empty skill weight row.");
  };

  const updateSkill = (index: number, patch: Partial<SkillDraft>) => {
    setSkills((current) =>
      current.map((skill, currentIndex) =>
        currentIndex === index ? { ...skill, ...patch } : skill,
      ),
    );
    setSaved(false);
  };

  const removeSkill = (index: number) => {
    setSkills((current) => current.filter((_, currentIndex) => currentIndex !== index));
    setSaved(false);
    setStatusMessage("Removed the skill row.");
  };

  const normalizeWeights = () => {
    if (skills.length === 0) {
      setStatusMessage("Add a skill before normalizing weights.");
      return;
    }
    const tenthsPerSkill = Math.floor(1000 / skills.length);
    const remainingTenths = 1000 - tenthsPerSkill * skills.length;
    setSkills((current) =>
      current.map((skill, index) => ({
        ...skill,
        weight: (tenthsPerSkill + (index < remainingTenths ? 1 : 0)) / 10,
      })),
    );
    setSaved(false);
    setStatusMessage("Skill weights were normalized to exactly 100.0%.");
  };

  const addQuestion = () => {
    setQuestions((current) => [
      ...current,
      { title: "", skill: "", seconds: 60 },
    ]);
    setSaved(false);
    setStatusMessage("Added an assessment question with a 60-second timer.");
  };

  const updateQuestion = (index: number, patch: Partial<QuestionDraft>) => {
    setQuestions((current) =>
      current.map((question, currentIndex) =>
        currentIndex === index ? { ...question, ...patch } : question,
      ),
    );
    setSaved(false);
  };

  const removeQuestion = (index: number) => {
    setQuestions((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
    setSaved(false);
    setStatusMessage("Removed the assessment question.");
  };

  const handleContinue = () => {
    if (!canPublish) {
      setStatusMessage(
        `${passedChecks} of 5 pre-flight checks passed. Complete the remaining checks before preview and publish.`,
      );
      return;
    }
    setActiveStep(5);
  };

  return (
    <div className="-m-4 min-w-0 bg-[#0B0C0E] text-[#E4E4E7] sm:-m-6 lg:-m-8">
      <header className="sticky top-0 z-20 border-b border-[#1F242D] bg-[#121417]/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-wide text-[#858A94]">
              <span>RECRUITER</span>
              <span>/</span>
              <span>JOBS</span>
              <span>/</span>
              <span className="text-[#F97316]">
                {jobId ? "EDIT JOB WIZARD" : "NEW JOB WIZARD"}
              </span>
              <span>•</span>
              <span className="text-emerald-400">VERSION_V1.3_STRICT</span>
            </div>
            <h1 className="mt-1 break-words text-xl font-semibold tracking-tight text-white">
              {jobId ? "Edit Job Opening" : "Create New Job Opening"}
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-[#858A94]">
              Configure role specifications, deterministic weights, and timed
              mobile assessment protocol.
            </p>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span
              aria-live="polite"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#214833] bg-[#12251B] px-2 py-1 font-mono text-[10px] text-emerald-400"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
              {saved ? "Saved this session" : "Not saved yet"}
            </span>
            <button type="button" onClick={saveDraft} className={quietButtonClass}>
              <Save className="size-4 shrink-0 text-[#A1A1AA]" />
              <span>Save Draft</span>
            </button>
            <Link href="/recruiter/jobs" className={quietButtonClass}>
              <span>Exit Wizard</span>
            </Link>
            <button
              type="button"
              title="Search documentation"
              aria-label="Search documentation"
              onClick={() =>
                setStatusMessage("Documentation search is not configured.")
              }
              className="flex size-9 items-center justify-center rounded-md text-[#A1A1AA] hover:bg-[#20242B] hover:text-white"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              title="History / Reset"
              aria-label="History / Reset wizard"
              onClick={resetDraft}
              className="flex size-9 items-center justify-center rounded-md text-[#A1A1AA] hover:bg-[#20242B] hover:text-white"
            >
              <History className="size-4" />
            </button>
            <button
              type="button"
              title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="flex size-9 items-center justify-center rounded-md text-[#A1A1AA] hover:bg-[#20242B] hover:text-white"
            >
              {resolvedTheme === "dark" ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
            </button>
          </div>
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

      <main className="mx-auto w-full max-w-[1440px] space-y-5 p-4 pb-8 sm:p-6 sm:pb-8">
        <section className={`${cardClass} p-3 sm:p-4`} aria-label="Wizard steps">
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {stepNames.map((_, index) => {
              const step = index + 1;
              return (
                <StepCard
                  key={step}
                  step={step}
                  activeStep={activeStep}
                  completed={false}
                  onSelect={selectStep}
                />
              );
            })}
          </div>
        </section>

        <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-5 xl:col-span-8">
            <section id="skill-weight-matrix" className={cardClass}>
              <SectionHeading
                tag="SECTION 6.4 D4"
                title="Deterministic Skill Weight Matrix"
                subtitle="Assign deterministic weights to required and preferred skills. Sum must equal exactly 100.0%. No black-box AI guessing."
                trailing={
                  <span
                    className="inline-flex max-w-full items-center gap-2 rounded-lg border border-[#214833] bg-[#12251B] px-3 py-1.5 font-mono text-[11px] font-semibold text-emerald-400"
                  >
                    <CheckCircle2 className="size-4 shrink-0" />
                    <span className="break-words">
                      {validWeights
                        ? "100.0% VALID (Sum = 1.00)"
                        : `${formatOneDecimal(allocatedWeight)}% ALLOCATED (Target = 100.0%)`}
                    </span>
                  </span>
                }
              />

              <div className="mt-4 space-y-2">
                <div className="flex min-w-0 flex-col gap-1 font-mono text-[10px] sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[#858A94]">
                    PROPORTIONAL WEIGHT ALLOCATION
                  </span>
                  <span className="break-words text-white">
                    Σ = 100% (Strict Calibration)
                  </span>
                </div>
                <div
                  aria-label={`Skill weights allocated: ${formatOneDecimal(allocatedWeight)} percent`}
                  className="flex h-3.5 min-w-0 overflow-hidden rounded-md border border-[#30343C] bg-[#171A1F]"
                >
                  {skills.map((skill, index) => (
                    <span
                      key={`allocation-${index}`}
                      title={`${skill.name || `Skill ${index + 1}`}: ${formatOneDecimal(skill.weight)}%`}
                      className="flex h-full min-w-0 items-center justify-center overflow-hidden text-[8px] font-semibold text-black"
                      style={{
                        width: `${Math.min(Math.max(skill.weight, 0), 100)}%`,
                        backgroundColor: skillColors[index % skillColors.length],
                      }}
                    >
                      {skill.weight >= 12 ? `${formatOneDecimal(skill.weight)}%` : ""}
                    </span>
                  ))}
                </div>
                {skills.length > 0 ? (
                  <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-2 pt-1 font-mono text-[10px] text-[#A1A1AA]">
                    {skills.map((skill, index) => (
                      <span
                        key={`legend-${index}`}
                        className="flex min-w-0 items-center gap-1.5"
                      >
                        <span
                          className="size-2.5 shrink-0 rounded-sm"
                          style={{
                            backgroundColor:
                              skillColors[index % skillColors.length],
                          }}
                        />
                        <span className="break-words">
                          {skill.name || `Skill ${index + 1}`} (
                          {formatOneDecimal(skill.weight)}%)
                        </span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#858A94]">
                    No skills added. Add a skill from the job specification to
                    begin allocating weights.
                  </p>
                )}
              </div>

              <div className="mt-4 space-y-3">
                {skills.map((skill, index) => (
                  <div
                    key={`skill-${index}`}
                    className="min-w-0 space-y-3 rounded-lg border border-[#272C34] bg-[#171A1F] p-3 transition-colors hover:border-[#3B4049] sm:p-4"
                  >
                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              skillColors[index % skillColors.length],
                          }}
                        />
                        <input
                          id={`skill-name-${index}`}
                          aria-label={`Skill name ${index + 1}`}
                          value={skill.name}
                          onChange={(event) =>
                            updateSkill(index, { name: event.target.value })
                          }
                          placeholder="Skill name"
                          className={`${inputClass} w-full flex-1 sm:max-w-64`}
                        />
                        <button
                          type="button"
                          aria-pressed={skill.required}
                          onClick={() =>
                            updateSkill(index, { required: !skill.required })
                          }
                          className={`rounded border px-2 py-1 font-mono text-[10px] ${
                            skill.required
                              ? "border-[#214833] bg-[#12251B] text-emerald-400"
                              : "border-[#30343C] bg-[#20242B] text-[#B3B7BF]"
                          }`}
                        >
                          {skill.required ? "Required" : "Preferred"}
                        </button>
                        <span className="whitespace-nowrap font-mono text-[10px] text-[#858A94]">
                          #SKILL-{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2 self-start rounded-md border border-[#30343C] bg-[#111316] px-2 py-1">
                        <label
                          htmlFor={`skill-weight-${index}`}
                          className="whitespace-nowrap font-mono text-[10px] text-[#858A94]"
                        >
                          Weight:
                        </label>
                        <input
                          id={`skill-weight-${index}`}
                          type="number"
                          min={0}
                          max={100}
                          step={0.1}
                          value={skill.weight}
                          onChange={(event) =>
                            updateSkill(index, {
                              weight: Math.min(
                                100,
                                Math.max(0, Number(event.target.value) || 0),
                              ),
                            })
                          }
                          className="w-14 min-w-0 border-0 bg-transparent p-0 text-right font-mono text-sm font-semibold text-white outline-none"
                        />
                        <span className="font-mono text-xs text-white">%</span>
                        <button
                          type="button"
                          aria-label={`Remove skill ${index + 1}`}
                          onClick={() => removeSkill(index)}
                          className="rounded p-1 text-[#858A94] hover:text-red-400"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid min-w-0 grid-cols-1 items-center gap-3 md:grid-cols-12">
                      <div className="min-w-0 md:col-span-7">
                        <input
                          id={`skill-weight-range-${index}`}
                          aria-label={`Weight for skill ${index + 1}`}
                          type="range"
                          min={0}
                          max={100}
                          step={0.1}
                          value={skill.weight}
                          onChange={(event) =>
                            updateSkill(index, {
                              weight: Number(event.target.value),
                            })
                          }
                          className="h-1.5 w-full cursor-pointer accent-[#F97316]"
                          style={{
                            accentColor: skillColors[index % skillColors.length],
                          }}
                        />
                      </div>
                      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 md:col-span-5">
                        <label
                          htmlFor={`skill-minimum-${index}`}
                          className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] text-[#A1A1AA]"
                        >
                          <span className="whitespace-nowrap">Min Qualifying:</span>
                          <input
                            id={`skill-minimum-${index}`}
                            type="range"
                            min={0}
                            max={100}
                            value={skill.minimum}
                            onChange={(event) =>
                              updateSkill(index, {
                                minimum: Number(event.target.value),
                              })
                            }
                            className="w-20 accent-[#F97316]"
                          />
                          <span className="whitespace-nowrap text-white">
                            {skill.minimum}/100
                          </span>
                        </label>
                        <span className="inline-flex max-w-full items-center gap-1 rounded border border-[#214833] bg-[#12251B] px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                          <Code2 className="size-3.5 shrink-0" />
                          <span>AST Commit Check</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex min-w-0 items-start gap-2 border-t border-[#252930] pt-2 font-mono text-[10px] leading-relaxed text-[#858A94]">
                      <SlidersHorizontal className="mt-0.5 size-3.5 shrink-0 text-[#A1A1AA]" />
                      <span className="break-words">
                        Proofline Rule: Candidate claim substantiated via
                        verifiable evidence.
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex min-w-0 flex-col gap-3 border-t border-[#252930] pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={addSkill}
                  className={quietButtonClass}
                >
                  <Plus className="size-4 shrink-0" />
                  <span>+ Add Extracted Skill from Job Spec</span>
                </button>
                <button
                  type="button"
                  onClick={normalizeWeights}
                  className="inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#30343C] bg-[#171A1F] px-3 py-1.5 font-mono text-xs font-medium text-[#FDBA74] hover:bg-[#20242B]"
                >
                  <SlidersHorizontal className="size-4 shrink-0" />
                  <span>Re-normalize to 100%</span>
                </button>
              </div>
            </section>

            <section id="assessment-protocol" className={cardClass}>
              <SectionHeading
                tag="SECTION 7 & 8"
                title="Assessment Protocol: Mobile Timed Sandbox"
                subtitle="Recruiter configures question count and time limits. Timed exam is taken exclusively on the Candidate Mobile App. Exactly 5 front-camera snapshots are fixed by platform integrity rules."
                trailing={
                  <span className="inline-flex max-w-full items-center gap-2 rounded-lg border border-[#633314] bg-[#2A1B11] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#FDBA74]">
                    <Camera className="size-4 shrink-0" />
                    <span className="break-words">5 Camera Snapshots Fixed</span>
                  </span>
                }
              />

              <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                <div className={`${insetClass} space-y-1.5`}>
                  <span className="font-mono text-[10px] text-[#858A94]">
                    TOTAL QUESTIONS
                  </span>
                  <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                    <span className="text-xl font-semibold text-white">
                      {questions.length}{" "}
                      {questions.length === 1 ? "Question" : "Questions"}
                    </span>
                    <span className="rounded border border-[#214833] bg-[#12251B] px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                      {totalPoints} Total Pts
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#858A94]">
                    Auto-gradable code sandbox &amp; conceptual diagnostics.
                  </p>
                </div>
                <div className={`${insetClass} space-y-1.5`}>
                  <span className="font-mono text-[10px] text-[#858A94]">
                    ASSESSMENT DURATION
                  </span>
                  <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                    <span className="text-xl font-semibold text-white">
                      {durationMinutes}{" "}
                      {durationMinutes === 1 ? "Minute" : "Minutes"}
                    </span>
                    <span className="rounded border border-[#30343C] bg-[#20242B] px-2 py-0.5 font-mono text-[10px] text-[#B3B7BF]">
                      {questions.length
                        ? `${Math.round(totalSeconds / questions.length)}s`
                        : "0s"}{" "}
                      / Question
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#858A94]">
                    Standardized mobile strict anti-cheating window.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="break-words font-mono text-[10px] tracking-wider text-[#858A94]">
                  PROGRAMMED QUESTION SEQUENCE &amp; INDIVIDUAL TIMERS
                </h3>
                {questions.length === 0 ? (
                  <div className={`${insetClass} flex min-w-0 flex-col items-start gap-3`}>
                    <p className="text-xs text-[#A1A1AA]">
                      No assessment questions are programmed yet.
                    </p>
                    <button
                      type="button"
                      onClick={addQuestion}
                      className={quietButtonClass}
                    >
                      <Plus className="size-4 shrink-0" />
                      <span>+ Add Assessment Question</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {questions.map((question, index) => (
                      <div
                        key={`question-${index}`}
                        className="flex min-w-0 flex-col gap-3 rounded-lg border border-[#272C34] bg-[#171A1F] p-3 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded bg-[#252930] font-mono text-[10px] font-semibold text-white">
                            Q{index + 1}
                          </span>
                          <div className="grid min-w-0 flex-1 grid-cols-1 gap-2">
                            <input
                              id={`question-title-${index}`}
                              aria-label={`Question ${index + 1} title`}
                              value={question.title}
                              onChange={(event) =>
                                updateQuestion(index, {
                                  title: event.target.value,
                                })
                              }
                              placeholder="Question title"
                              className={`${inputClass} w-full`}
                            />
                            <input
                              id={`question-skill-${index}`}
                              aria-label={`Question ${index + 1} linked skill`}
                              value={question.skill}
                              onChange={(event) =>
                                updateQuestion(index, {
                                  skill: event.target.value,
                                })
                              }
                              placeholder="Linked skill or competency"
                              className={`${inputClass} w-full`}
                            />
                          </div>
                        </div>
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <input
                            id={`question-timer-${index}`}
                            aria-label={`Question ${index + 1} timer in seconds`}
                            type="number"
                            min={1}
                            value={question.seconds}
                            onChange={(event) =>
                              updateQuestion(index, {
                                seconds: Number(event.target.value) || 0,
                              })
                            }
                            className="w-16 rounded border border-[#30343C] bg-[#111316] px-2 py-1 font-mono text-[10px] text-[#A1A1AA]"
                          />
                          <span className="whitespace-nowrap rounded border border-[#30343C] bg-[#111316] px-2 py-1 font-mono text-[10px] text-[#A1A1AA]">
                            {question.seconds}s Timer
                          </span>
                          <span className="whitespace-nowrap rounded border border-[#214833] bg-[#12251B] px-2 py-1 font-mono text-[10px] font-semibold text-emerald-400">
                            20 pts
                          </span>
                          <button
                            type="button"
                            aria-label={`Remove question ${index + 1}`}
                            onClick={() => removeQuestion(index)}
                            className="rounded p-1 text-[#858A94] hover:text-red-400"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addQuestion}
                      className={quietButtonClass}
                    >
                      <Plus className="size-4 shrink-0" />
                      <span>+ Add Assessment Question</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 flex min-w-0 items-start gap-3 rounded-lg border border-[#30343C] bg-[#171A1F] p-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#F97316]" />
                <p className="text-xs leading-relaxed text-[#A1A1AA]">
                  <strong className="font-semibold text-white">
                    Platform Integrity Protocol:
                  </strong>{" "}
                  5 front-camera snapshot captures occur randomly across the
                  mobile attempt. Any proctoring anomalies are queued for human
                  recruiter review during{" "}
                  <span className="font-mono text-white">Assessment Review</span>.
                  TalentGraph AI strictly never auto-disqualifies applicants.
                </p>
              </div>
            </section>
          </div>

          <aside className="flex min-w-0 flex-col gap-5 xl:col-span-4">
            <section id="step-01-recap" className={cardClass}>
              <div className="flex min-w-0 items-center justify-between gap-3 border-b border-[#252930] pb-3">
                <span className="font-mono text-[10px] text-[#858A94]">
                  STEP 01 RECAP
                </span>
                <button
                  type="button"
                  onClick={() => selectStep(1)}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#F97316] hover:underline"
                >
                  <span>Edit Basics</span>
                  <FileText className="size-3.5" />
                </button>
              </div>
              <div className="mt-3">
                <span className="inline-block max-w-full break-words rounded bg-[#20242B] px-2 py-1 font-mono text-[10px] text-[#B3B7BF]">
                  {jobId ? `#JOB-${jobId}` : "#JOB-UNASSIGNED"} • Unassigned Unit
                </span>
                <h3 className="mt-2 break-words text-base font-semibold text-white">
                  Untitled Role
                </h3>
              </div>
              <dl className="mt-4 space-y-2 text-xs">
                {[
                  ["Location", "Not set"],
                  ["Employment", "Not set"],
                  ["Experience Level", "Not set"],
                  ["Application Deadline", "Not set"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex min-w-0 flex-wrap items-center justify-between gap-1"
                  >
                    <dt className="text-[#858A94]">{label}:</dt>
                    <dd className="break-words text-right font-medium text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="step-02-recap" className={cardClass}>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#252930] pb-3">
                <span className="font-mono text-[10px] text-[#858A94]">
                  STEP 02 RECAP • TAXONOMY
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  Ready for Scan
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#A1A1AA]">
                Scanned from raw job description markdown. Normalized to
                canonical technical skill taxonomy:
              </p>
              <div className="mt-3 min-h-10 rounded-md border border-[#272C34] bg-[#171A1F] p-2">
                <p className="text-xs text-[#858A94]">
                  No canonical skills have been scanned.
                </p>
              </div>
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-[#858A94]">
                0 canonical technical skills retained; 0 generic buzzwords
                eliminated
              </p>
            </section>

            <section className={cardClass}>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#252930] pb-3">
                <span className="font-mono text-[10px] text-[#858A94]">
                  PLATFORM PRE-FLIGHT
                </span>
                <span className="rounded border border-[#214833] bg-[#12251B] px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                  {passedChecks} / 5 PASSED
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-xs">
                {checks.map((check) => (
                  <li
                    key={check.label}
                    className={`flex min-w-0 items-start gap-2 ${
                      check.passed ? "text-white" : "text-[#858A94]"
                    }`}
                  >
                    {check.passed ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#71717A]" />
                    )}
                    <span className="break-words">{check.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={cardClass}>
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded bg-[#3A2114] font-mono text-xs font-bold text-[#F97316]">
                  fx
                </span>
                <h2 className="break-words font-mono text-[10px] font-semibold text-white">
                  DETERMINISTIC RANKING FORMULA
                </h2>
              </div>
              <div className="mt-3 break-words rounded-md border border-[#252930] bg-[#0F1114] p-3 font-mono text-[10px] leading-relaxed text-[#FDBA74]">
                <p>
                  Contribution(c, s) = W(s) × [ Score(c, s) / MaxScore(s) ]
                </p>
                <p className="mt-2">TotalScore(c) = Σ Contribution(c, s)</p>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-[#858A94]">
                Applicant rankings strictly follow closed-form arithmetic. Zero
                opaque AI ranking scoring or hidden weighting.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <div className="sticky bottom-0 z-20 border-t border-[#252930] bg-[#121417]/95 px-4 py-3 shadow-2xl backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <span className="text-xs font-semibold text-white">
              Step {activeStep} of 5 • {activeStep === 3 ? "Skill Weights & Assessment Protocol" : stepNames[activeStep - 1]}
            </span>
            <span className="font-mono text-[10px] text-[#858A94]">
              {saved ? "Saved this session" : "Not saved yet"}
            </span>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => selectStep(Math.max(1, activeStep - 1))}
              className={quietButtonClass}
            >
              <ArrowLeft className="size-4 shrink-0" />
              <span>
                Back: {activeStep > 1 ? stepNames[activeStep - 2] : "Jobs"}
              </span>
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className={quietButtonClass}
            >
              <Save className="size-4 shrink-0" />
              <span>Save Draft</span>
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex min-h-9 min-w-0 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-4 py-2 text-xs font-semibold text-[#17120F] transition-colors hover:bg-[#FB923C]"
            >
              <span className="break-words">
                Continue to Step 5: Preview &amp; Publish
              </span>
              <ArrowRight className="size-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#1F242D] bg-[#0E1013] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-3 font-mono text-[10px] text-[#858A94] md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="break-words">
              TalentGraph Recruiter Shell • Cryptographic draft versioning
              active (#DRAFT-UNASSIGNED)
            </span>
          </div>
          <a
            href="#"
            className="min-w-0 break-words text-[#F97316] hover:underline"
          >
            Need assistance with skill weight formulas? Contact technical
            recruiter support
          </a>
        </div>
      </footer>
    </div>
  );
}
