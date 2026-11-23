export type JobWizardSkillDraft = {
  name: string;
  required: boolean;
  weight: number;
  minimum: number;
};

export type JobWizardQuestionDraft = {
  title: string;
  skill: string;
  seconds: number;
};

export type JobWizardDraft = {
  skills: JobWizardSkillDraft[];
  questions: JobWizardQuestionDraft[];
};

const STORAGE_KEY = "talentgraph-recruiter-job-wizard-draft-v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSkillDraft(value: unknown): value is JobWizardSkillDraft {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.required === "boolean" &&
    typeof value.weight === "number" &&
    Number.isFinite(value.weight) &&
    typeof value.minimum === "number" &&
    Number.isFinite(value.minimum)
  );
}

function isQuestionDraft(value: unknown): value is JobWizardQuestionDraft {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.skill === "string" &&
    typeof value.seconds === "number" &&
    Number.isFinite(value.seconds)
  );
}

function isJobWizardDraft(value: unknown): value is JobWizardDraft {
  return (
    isRecord(value) &&
    Array.isArray(value.skills) &&
    value.skills.every(isSkillDraft) &&
    Array.isArray(value.questions) &&
    value.questions.every(isQuestionDraft)
  );
}

export function saveJobWizardDraft(draft: JobWizardDraft) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function loadJobWizardDraft(): JobWizardDraft | null {
  const saved = window.sessionStorage.getItem(STORAGE_KEY);
  if (saved === null) return null;

  const parsed: unknown = JSON.parse(saved);
  if (!isJobWizardDraft(parsed)) {
    throw new Error("The saved job wizard draft has an invalid format.");
  }
  return parsed;
}

export function clearJobWizardDraft() {
  window.sessionStorage.removeItem(STORAGE_KEY);
}
