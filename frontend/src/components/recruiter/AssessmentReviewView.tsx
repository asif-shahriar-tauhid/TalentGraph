"use client";

import {
  Activity,
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileCode2,
  Gavel,
  History,
  Settings,
  ShieldCheck,
  Timer,
  UserRound,
} from "lucide-react";
import { useState } from "react";

export interface BiometricFrame {
  frameNumber: number;
  timestamp: string | null;
  matchPercentage: number | null;
  poseLabel: string | null;
  status: "matched" | "review" | "awaiting";
}

export interface QuestionProofItem {
  id: string;
  prompt: string;
  points: number;
  maxPoints: number;
  status: "correct" | "partial" | "incorrect" | "awaiting";
  submittedAnswer: string;
  analyzerNote: string;
}

export interface AuditEventItem {
  id: string;
  time: string;
  title: string;
  detail: string;
  status: "neutral" | "verified" | "action";
}

export interface AssessmentReviewData {
  assessmentId: string | null;
  candidateName: string;
  candidateHandle: string;
  roleApplied: string;
  sandboxVersion: string;
  score: number;
  questionsPassed: number;
  questionCount: number;
  sandboxDurationSeconds: number | null;
  startedTime: string;
  completedTime: string;
  deviceHardware: string;
  configSnapshot: string;
  biometricIntervals: string;
  frames: BiometricFrame[];
  auditNote: string;
  questions: QuestionProofItem[];
  totalPoints: number;
  totalPossiblePoints: number;
  integrityVerdict: string;
  timeline: AuditEventItem[];
}

export type HumanIntegrityDecision =
  | "no-violation"
  | "suspicious-behavior"
  | "cheating-violation";

export interface AssessmentDecisionSubmission {
  assessmentId: string;
  decision: HumanIntegrityDecision;
  notes: string;
}

interface AssessmentReviewViewProps {
  data?: AssessmentReviewData;
  onConfirmDecision?: (submission: AssessmentDecisionSubmission) => void;
  onSaveDraft?: (submission: AssessmentDecisionSubmission) => void;
}

export const INITIAL_ASSESSMENT_REVIEW_DATA: AssessmentReviewData = {
  assessmentId: null,
  candidateName: "No Assessment Selected",
  candidateHandle: "@unassigned",
  roleApplied: "Awaiting candidate sandbox submission",
  sandboxVersion: "Sandbox v1.4.2 (Android 14)",
  score: 0,
  questionsPassed: 0,
  questionCount: 0,
  sandboxDurationSeconds: null,
  startedTime: "--",
  completedTime: "--",
  deviceHardware: "--",
  configSnapshot: "--",
  biometricIntervals: "Awaiting camera frames",
  frames: Array.from({ length: 5 }, (_, index): BiometricFrame => ({
    frameNumber: index + 1,
    timestamp: null,
    matchPercentage: null,
    poseLabel: null,
    status: "awaiting",
  })),
  auditNote:
    "Camera snapshots will populate automatically once a proctored sandbox session is submitted.",
  questions: [],
  totalPoints: 0,
  totalPossiblePoints: 100,
  integrityVerdict: "Awaiting Audit",
  timeline: [],
};

const panelClass =
  "min-w-0 rounded-[12px] border border-[#25252A] bg-[#121417] p-5";
const quietButtonClass =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-[8px] border border-[#27272C] bg-[#161619] px-3 text-xs font-medium text-[#D4D4D8] transition-colors hover:border-[#3F3F46] hover:bg-[#202024] disabled:cursor-not-allowed disabled:opacity-50";

function formatDuration(seconds: number | null) {
  if (seconds === null) return "0m 00s";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
}

function frameStatusLabel(status: BiometricFrame["status"]) {
  if (status === "matched") return "Matched";
  if (status === "review") return "Review";
  return "Awaiting Frame";
}

function questionStatusLabel(status: QuestionProofItem["status"]) {
  if (status === "correct") return "Correct";
  if (status === "partial") return "Partially Correct";
  if (status === "incorrect") return "Incorrect";
  return "Awaiting Review";
}

function exportAssessmentCsv(data: AssessmentReviewData) {
  const rows: string[][] = [
    ["Assessment ID", data.assessmentId ?? "Awaiting Assessment"],
    ["Candidate", data.candidateName],
    ["Score", `${data.score} / 100`],
    [],
    ["Question", "Points", "Maximum Points", "Status", "Submitted Answer"],
    ...data.questions.map((question) => [
      question.prompt,
      String(question.points),
      String(question.maxPoints),
      questionStatusLabel(question.status),
      question.submittedAnswer,
    ]),
    [],
    ["Audit Event", "Time", "Detail"],
    ...data.timeline.map((event) => [event.title, event.time, event.detail]),
  ];
  const contents = rows
    .map((row) =>
      row.map((value) => `"${(value ?? "").replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", contents], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "assessment-review.csv";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function AssessmentReviewView({
  data = INITIAL_ASSESSMENT_REVIEW_DATA,
  onConfirmDecision,
  onSaveDraft,
}: AssessmentReviewViewProps) {
  const [query, setQuery] = useState("");
  const [decision, setDecision] = useState<HumanIntegrityDecision | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const isAssessmentActive = data.assessmentId !== null;
  const capturedFrames = data.frames.filter(
    (frame) => frame.status !== "awaiting",
  ).length;
  const allFramesMatched =
    data.frames.length > 0 &&
    capturedFrames === data.frames.length &&
    data.frames.every((frame) => frame.status === "matched");
  const normalizedQuery = query.trim().toLowerCase();
  const questions = data.questions.filter((question) =>
    [
      question.id,
      question.prompt,
      question.submittedAnswer,
      question.analyzerNote,
    ].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
  const events = data.timeline.filter((event) =>
    [event.time, event.title, event.detail].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
  const submission =
    decision && data.assessmentId
      ? {
          assessmentId: data.assessmentId,
          decision,
          notes: reviewerNotes.trim(),
        }
      : null;

  return (
    <div className="min-w-0 w-full bg-[#0B0C0E] text-[#D4D4D8]">
      <header className="sticky top-0 z-20 border-b border-[#222226] bg-[#121417]/95 px-4 py-4 backdrop-blur sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
            >
              <span>Recruiter</span>
              <span aria-hidden="true">/</span>
              <span>Assessments</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#F97316]">Review</span>
              <span className="text-[#3F3F46]">•</span>
            </nav>
            <h1 className="mt-1 text-[22px] font-bold tracking-tight text-white sm:text-2xl">
              Assessment Review &amp; Biometric Audit
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-[#A1A1AA]">
              Human-in-the-loop integrity review for candidate responses and
              proctored sandbox submissions.
            </p>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <label className="relative w-full min-w-0 sm:w-64">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717A]">
                <Activity aria-hidden="true" className="size-4" />
              </span>
              <input
                aria-label="Filter telemetry or query"
                className="min-h-9 w-full rounded-[8px] border border-[#27272C] bg-[#161619] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-[#71717A] transition-colors focus:border-[#F97316] focus:outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter telemetry or query..."
                type="search"
                value={query}
              />
            </label>
            <button
              aria-label="Export assessment review"
              className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#27272C] bg-[#161619] text-white transition-colors hover:bg-[#202024]"
              onClick={() => exportAssessmentCsv(data)}
              title="Export assessment review"
              type="button"
            >
              <Download aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Review settings"
              className="inline-flex size-9 items-center justify-center rounded-[8px] border border-[#27272C] bg-[#161619] text-white transition-colors hover:bg-[#202024]"
              title="Review settings"
              type="button"
            >
              <Settings aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-8">
        <section
          aria-label="Assessment summary"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <h2 className="text-xs font-medium text-[#A1A1AA]">
                Assessment Score
              </h2>
              <span className="flex size-8 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] text-[#F97316]">
                <FileCode2 aria-hidden="true" className="size-[18px]" />
              </span>
            </div>
            <p className="mb-2 font-mono text-2xl font-bold text-white">
              {data.score}{" "}
              <span className="text-sm font-normal text-[#71717A]">/ 100</span>
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222227] pt-2 text-[11px]">
              <span className="text-[#71717A]">
                {data.questionsPassed} of {data.questionCount} questions
              </span>
              <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-1.5 py-0.5 font-medium text-[#A1A1AA]">
                {isAssessmentActive ? "Auto-Graded" : "Awaiting Attempt"}
              </span>
            </div>
          </article>

          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <h2 className="text-xs font-medium text-[#A1A1AA]">
                Sandbox Time
              </h2>
              <span className="flex size-8 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] text-[#95CCFF]">
                <Timer aria-hidden="true" className="size-[18px]" />
              </span>
            </div>
            <p className="mb-2 font-mono text-2xl font-bold text-white">
              {formatDuration(data.sandboxDurationSeconds)}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222227] pt-2 text-[11px]">
              <span className="text-[#71717A]">
                Limit: 5m 00s (Asia/Dhaka)
              </span>
              <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-1.5 py-0.5 font-medium text-[#A1A1AA]">
                {isAssessmentActive ? "Under Limit" : "No Session"}
              </span>
            </div>
          </article>

          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <h2 className="text-xs font-medium text-[#A1A1AA]">
                Biometric Snapshots
              </h2>
              <span className="flex size-8 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] text-[#E5933A]">
                <Camera aria-hidden="true" className="size-[18px]" />
              </span>
            </div>
            <p className="mb-2 font-mono text-2xl font-bold text-white">
              {capturedFrames}{" "}
              <span className="text-sm font-normal text-[#71717A]">
                / 5 Captured
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222227] pt-2 text-[11px]">
              <span className="text-[#71717A]">
                {capturedFrames === 0
                  ? "Awaiting camera frames"
                  : data.biometricIntervals}
              </span>
              <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-1.5 py-0.5 font-medium text-[#A1A1AA]">
                {allFramesMatched ? "Face Verified" : "Pending"}
              </span>
            </div>
          </article>

          <article className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#25252A] bg-[#121417] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <h2 className="text-xs font-medium text-[#A1A1AA]">
                Integrity Verdict
              </h2>
              <span className="flex size-8 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] text-[#E5933A]">
                <ShieldCheck aria-hidden="true" className="size-[18px]" />
              </span>
            </div>
            <p className="mb-2 break-words text-lg font-bold text-white">
              {data.integrityVerdict}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222227] pt-2 text-[11px]">
              <span className="text-[#71717A]">No automatic AI ban</span>
              <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-1.5 py-0.5 font-medium text-[#A1A1AA]">
                {isAssessmentActive ? "Action Required" : "Standby"}
              </span>
            </div>
          </article>
        </section>

        <section className="grid min-w-0 grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="flex min-w-0 flex-col gap-6 xl:col-span-8">
            <section
              aria-label="Candidate and session metadata"
              className={panelClass}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222227] pb-4 sm:gap-3">
                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[8px] border border-[#2B2B32] bg-[#1F1F24] font-mono text-sm font-bold text-white">
                    {isAssessmentActive ? (
                      data.candidateName
                        .split(/\s+/)
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    ) : (
                      <UserRound aria-hidden="true" className="size-5" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-white">
                        {data.candidateName}
                      </h2>
                      <span className="font-mono text-xs text-[#71717A]">
                        {data.candidateHandle}
                      </span>
                      <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 text-[10px] font-medium text-[#4ADE80]">
                        Candidate
                      </span>
                    </div>
                    <p className="mt-0.5 break-words text-xs text-[#A1A1AA]">
                      Role Applied: {data.roleApplied}
                    </p>
                  </div>
                </div>
                <span className="rounded border border-[#27272C] bg-[#17171B] px-2 py-1 font-mono text-[11px] text-[#71717A]">
                  {data.sandboxVersion}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 text-xs">
                {[
                  ["Started Time", data.startedTime],
                  ["Completed Time", data.completedTime],
                  ["Device Hardware", data.deviceHardware],
                  ["Config Snapshot", data.configSnapshot],
                ].map(([label, value]) => (
                  <div className="min-w-0" key={label}>
                    <p className="text-[11px] text-[#71717A]">{label}</p>
                    <p
                      className={`mt-0.5 break-words font-mono ${
                        label === "Config Snapshot"
                          ? "text-[#F97316]"
                          : "text-white"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="biometric-validation-title"
              className={panelClass}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222227] pb-4 sm:gap-3">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h2
                    className="text-sm font-semibold tracking-tight text-white"
                    id="biometric-validation-title"
                  >
                    Biometric Presence Validation
                  </h2>
                  <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-1.5 py-0.5 font-mono text-[10px] text-[#B3B3B3]">
                    {capturedFrames} Captures
                  </span>
                </div>
                <span className="flex flex-wrap items-center gap-1 rounded border border-[#2B2B32] bg-[#1F1F24] px-2 py-0.5 text-[11px] font-medium text-[#A1A1AA]">
                  {allFramesMatched ? (
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-[13px] text-[#4ADE80]"
                    />
                  ) : (
                    <Clock3
                      aria-hidden="true"
                      className="size-[13px] text-[#71717A]"
                    />
                  )}
                  {allFramesMatched ? "All 5 Match Preflight Face" : "Awaiting Captures"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
                {data.frames.map((frame) => (
                  <article
                    className="flex min-w-0 flex-col rounded-[8px] border border-[#27272C] bg-[#17171B] p-2"
                    key={frame.frameNumber}
                  >
                    <div className="mb-2 flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-[6px] border border-[#2B2B32] bg-[#1F1F24] p-2 text-center">
                      <Camera
                        aria-hidden="true"
                        className="size-7 text-[#71717A]"
                      />
                      <span className="font-mono text-[9px] text-[#71717A]">
                        FRAME #{String(frame.frameNumber).padStart(3, "0")}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-1 font-mono text-[11px]">
                      <span className="font-medium text-white">
                        {frame.timestamp ?? "--"}
                      </span>
                      <span className="text-[#4ADE80]">
                        {frame.matchPercentage === null
                          ? "--"
                          : `${frame.matchPercentage.toFixed(1)}%`}
                      </span>
                    </div>
                    <p className="mt-1 break-words text-[10px] text-[#71717A]">
                      {frame.poseLabel ?? "Awaiting pose"}
                    </p>
                    <span
                      className={`mt-1 rounded py-0.5 text-center font-mono text-[9px] ${
                        frame.status === "matched"
                          ? "bg-[#13281E] text-[#4ADE80]"
                          : frame.status === "review"
                            ? "bg-[#2C2114] text-[#E5933A]"
                            : "bg-[#1F1F24] text-[#A1A1AA]"
                      }`}
                    >
                      {frameStatusLabel(frame.status)}
                    </span>
                  </article>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-start gap-2.5 rounded-[8px] border border-[#27272C] bg-[#17171B] p-2.5 text-xs text-[#A1A1AA] sm:gap-3">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-[18px] shrink-0 text-[#4ADE80]"
                />
                <p className="min-w-0 break-words">
                  <strong className="font-medium text-white">Audit note:</strong>{" "}
                  {data.auditNote}
                </p>
              </div>
            </section>

            <section
              aria-labelledby="technical-proofline-title"
              className={panelClass}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222227] pb-4 sm:gap-3">
                <div className="min-w-0">
                  <h2
                    className="text-sm font-semibold tracking-tight text-white"
                    id="technical-proofline-title"
                  >
                    Technical Response Proofline ({data.questionCount} Questions)
                  </h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#71717A]">
                    Exact candidate runtime responses, timing metrics, and
                    compiler/rubric validation outcomes.
                  </p>
                </div>
                <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-0.5 font-mono text-xs text-[#4ADE80]">
                  {data.totalPoints} / {data.totalPossiblePoints} Total Points
                </span>
              </div>
              <div className="flex flex-col gap-4 pt-4">
                {questions.length === 0 ? (
                  <div className="rounded-[8px] border border-dashed border-[#27272C] bg-[#17171B] px-4 py-8 text-center">
                    <FileCode2
                      aria-hidden="true"
                      className="mx-auto size-6 text-[#71717A]"
                    />
                    <p className="mt-2 text-xs font-medium text-[#A1A1AA]">
                      {data.questions.length === 0
                        ? "No technical responses recorded yet"
                        : "No matching technical responses"}
                    </p>
                  </div>
                ) : (
                  questions.map((question, index) => (
                    <article
                      className="flex min-w-0 flex-col gap-2 rounded-[8px] border border-[#27272C] bg-[#17171B] p-3.5"
                      key={question.id}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-white">
                            {question.id || `Q${index + 1}`}
                          </span>
                          <span className="break-words text-xs font-medium text-white">
                            {question.prompt}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                          <span className="font-semibold text-[#4ADE80]">
                            {question.points} / {question.maxPoints} pts
                          </span>
                          <span className="rounded border border-[#2B2B32] bg-[#1F1F24] px-1.5 py-0.5 text-[10px] text-[#A1A1AA]">
                            {questionStatusLabel(question.status)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-1 flex min-w-0 flex-col gap-1 border-l border-[#3F3F46] pl-2 text-xs">
                        <p className="font-mono text-[11px] text-[#71717A]">
                          Submitted Answer:
                        </p>
                        <pre className="whitespace-pre-wrap break-words rounded border border-[#222226] bg-[#0B0C0E] p-2 font-mono text-xs text-white">
                          {question.submittedAnswer || "--"}
                        </pre>
                        <p className="mt-1 flex flex-wrap items-start gap-2 text-[11px] text-[#A1A1AA]">
                          {question.status === "partial" ? (
                            <AlertTriangle
                              aria-hidden="true"
                              className="mt-0.5 size-[13px] shrink-0 text-[#E5933A]"
                            />
                          ) : (
                            <Check
                              aria-hidden="true"
                              className="mt-0.5 size-[13px] shrink-0 text-[#4ADE80]"
                            />
                          )}
                          <span className="min-w-0 break-words">
                            {question.analyzerNote}
                          </span>
                        </p>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="flex min-w-0 flex-col gap-6 xl:col-span-4">
            <section
              aria-labelledby="human-verdict-title"
              className={panelClass}
            >
              <div className="border-b border-[#222227] pb-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Gavel
                    aria-hidden="true"
                    className="size-5 shrink-0 text-[#F97316]"
                  />
                  <h2
                    className="text-sm font-semibold tracking-tight text-white"
                    id="human-verdict-title"
                  >
                    Human Integrity Verdict (Mandatory)
                  </h2>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#A1A1AA]">
                  Platform policy: AI and camera snapshots are clues only.
                  Cheating verdicts and candidate bans require explicit human
                  confirmation with reason.
                </p>
              </div>
              <fieldset className="flex min-w-0 flex-col gap-2.5 pt-4">
                <legend className="mb-2 text-xs font-medium text-white">
                  Select a human review decision
                </legend>
                {[
                  {
                    value: "no-violation" as const,
                    title: "No Violation",
                    detail:
                      "Ratify the score and advance the candidate to the next stage.",
                  },
                  {
                    value: "suspicious-behavior" as const,
                    title: "Flag Suspicious Behavior",
                    detail: "Request a secondary proctor re-audit before decision.",
                  },
                  {
                    value: "cheating-violation" as const,
                    title: "Confirmed Cheating Violation",
                    detail:
                      "Trigger formal candidate notice with an immutable audit trail.",
                  },
                ].map((option) => (
                  <label
                    className={`flex min-w-0 cursor-pointer items-start gap-3 rounded-[8px] border p-3 transition-colors ${
                      decision === option.value
                        ? "border-[#F97316] bg-[#17171B]"
                        : "border-[#27272C] bg-[#17171B] hover:border-[#3A3A40]"
                    }`}
                    key={option.value}
                  >
                    <input
                      checked={decision === option.value}
                      className="mt-0.5 shrink-0 border-[#3F3F46] bg-[#0B0C0E] text-[#F97316] focus:ring-0 focus:ring-offset-0"
                      name="assessment-verdict"
                      onChange={() => setDecision(option.value)}
                      type="radio"
                      value={option.value}
                    />
                    <span className="flex min-w-0 flex-col">
                      <span
                        className={`text-xs font-semibold ${
                          option.value === "cheating-violation"
                            ? "text-[#F87171]"
                            : "text-white"
                        }`}
                      >
                        {option.title}
                      </span>
                      <span className="mt-0.5 break-words text-[11px] text-[#A1A1AA]">
                        {option.detail}
                      </span>
                    </span>
                  </label>
                ))}
              </fieldset>
              <div className="mt-4 flex min-w-0 flex-col gap-1.5">
                <label
                  className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-white"
                  htmlFor="reviewer-notes"
                >
                  <span>Reviewer Notes &amp; Justification</span>
                  <span className="font-mono text-[11px] text-[#71717A]">
                    Required for log
                  </span>
                </label>
                <textarea
                  className="w-full resize-y rounded-[8px] border border-[#27272C] bg-[#161619] p-2.5 text-xs leading-relaxed text-[#D4D4D8] placeholder:text-[#71717A] transition-colors focus:border-[#F97316] focus:outline-none"
                  id="reviewer-notes"
                  onChange={(event) => setReviewerNotes(event.target.value)}
                  placeholder="Document the evidence and reasoning behind your decision."
                  required
                  rows={4}
                  value={reviewerNotes}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-[#222227] pt-4">
                <button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#F97316] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={
                    !isAssessmentActive ||
                    !submission ||
                    !reviewerNotes.trim() ||
                    !onConfirmDecision
                  }
                  onClick={() => {
                    if (submission) onConfirmDecision?.(submission);
                  }}
                  type="button"
                >
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                  Confirm Decision &amp; Ratify Score
                </button>
                <button
                  className="w-full rounded-[8px] border border-[#27272C] bg-[#161619] px-4 py-2 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#202024] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!isAssessmentActive || !submission || !onSaveDraft}
                  onClick={() => {
                    if (submission) onSaveDraft?.(submission);
                  }}
                  type="button"
                >
                  Save Draft Review
                </button>
              </div>
            </section>

            <section
              aria-labelledby="audit-timeline-title"
              className={panelClass}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222227] pb-3 sm:gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <History
                    aria-hidden="true"
                    className="size-[18px] shrink-0 text-[#A1A1AA]"
                  />
                  <h2
                    className="text-xs font-semibold uppercase tracking-tight text-white"
                    id="audit-timeline-title"
                  >
                    Audit Timeline (BST)
                  </h2>
                </div>
                <span className="font-mono text-[10px] text-[#71717A]">
                  {data.timeline.length} Events Logged
                </span>
              </div>
              {events.length === 0 ? (
                <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
                  <Clock3
                    aria-hidden="true"
                    className="size-6 text-[#71717A]"
                  />
                  <p className="text-xs font-medium text-[#A1A1AA]">
                    {data.timeline.length === 0
                      ? "No audit events logged yet"
                      : "No matching audit events"}
                  </p>
                </div>
              ) : (
                <ol className="relative ml-2 flex min-w-0 flex-col gap-4 border-l border-[#27272C] pl-4 pt-4">
                  {events.map((event) => (
                    <li className="relative flex min-w-0 flex-col gap-0.5" key={event.id}>
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[21px] top-1 size-2.5 rounded-full border border-[#121417] ${
                          event.status === "verified"
                            ? "bg-[#4ADE80]"
                            : event.status === "action"
                              ? "bg-[#F97316]"
                              : "bg-[#3F3F46]"
                        }`}
                      />
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <time className="font-mono text-[11px] text-[#A1A1AA]">
                          {event.time}
                        </time>
                        <span className="break-words text-xs font-medium text-white">
                          {event.title}
                        </span>
                      </div>
                      <p className="break-words text-[11px] text-[#71717A]">
                        {event.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>
        </section>
      </div>

      <footer className="border-t border-[#1C1C20] bg-[#0B0C0E] px-4 py-4 text-[11px] text-[#71717A] sm:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#4ADE80]" />
            <span>
              TalentGraph Ground Truth Protocol • Audit Hash:{" "}
              <span className="font-mono text-[#A1A1AA]">
                {data.configSnapshot}
              </span>{" "}
              • All actions are audited
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>Recruiter SLA Support</span>
            <span>•</span>
            <span className="font-mono">Proofline Spec v1.3</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
