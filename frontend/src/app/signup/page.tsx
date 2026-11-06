"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleDot,
  Code2,
  Eye,
  EyeOff,
  GitBranch,
  Globe,
  Info,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getGithubAuthUrl } from "@/api/auth.api";
import { Navbar } from "@/components/Navbar";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { useRegister } from "@/hooks/auth.hooks";
import { RegisterZodSchema } from "@/validation";

type SignupRole = "CANDIDATE" | "RECRUITER";
const simulationStates = [
  "Default (Candidate)",
  "Recruiter Form",
  "OAuth Denied",
  "Email Verification Sent",
  "Loading",
] as const;

type SimulationState = (typeof simulationStates)[number];

export default function SignupPage() {
  const router = useRouter();
  const { mutate: register, isPending: isRegistering } = useRegister();
  const [role, setRole] = useState<SignupRole>("RECRUITER");
  const [simulationState, setSimulationState] =
    useState<SimulationState>("Recruiter Form");
  const [simulationMessage, setSimulationMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const isPending = isRegistering || isGithubLoading;
  const isSimulatedLoading = simulationState === "Loading";
  const inputClassName =
    "h-11 w-full rounded-lg border border-[#E4E4E7] bg-white pl-10 pr-3 text-sm text-[#18181B] placeholder:text-[#71717A] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#D4621A] dark:border-[#3F3F46] dark:bg-[#0D0D0F] dark:text-[#F5F5F5] dark:placeholder:text-[#A1A1AA]";
  const iconClassName =
    "pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#71717A] dark:text-[#A1A1AA]";

  const selectSimulationState = (state: SimulationState) => {
    setSimulationState(state);
    setRole(state === "Default (Candidate)" || state === "OAuth Denied"
      ? "CANDIDATE"
      : "RECRUITER");
    setSimulationMessage(
      state === "OAuth Denied"
        ? "Simulation only: GitHub authorization was denied."
        : state === "Email Verification Sent"
          ? "Simulation only: this preview represents the email verification sent state."
          : "",
    );
  };

  const validateRegistration = () => {
    const result = RegisterZodSchema.safeParse({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    });

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "name") setNameError(issue.message);
        if (issue.path[0] === "email") setEmailError(issue.message);
        if (issue.path[0] === "password") setPasswordError(issue.message);
      }
      return null;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return null;
    }

    return result.data;
  };

  const handleGithubSignup = async () => {
    if (simulationState === "OAuth Denied") {
      setSimulationMessage("Simulation only: GitHub authorization was denied.");
      return;
    }

    if (!acceptedTerms) {
      setConsentError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setConsentError("");
    try {
      setIsGithubLoading(true);
      const response = await getGithubAuthUrl("/candidate");
      const authorizationUrl = response?.data?.url;
      if (!authorizationUrl) {
        gooeyToast.error("Could not start GitHub sign up", {
          description: "The authorization service did not return a sign-up URL.",
        });
        setIsGithubLoading(false);
        return;
      }
      window.location.assign(authorizationUrl);
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
          ? error.message
          : "Please try again.";
      gooeyToast.error("GitHub sign-up failed", { description: message });
      setIsGithubLoading(false);
    }
  };

  const handleRecruiterSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSimulatedLoading) return;
    if (simulationState === "Email Verification Sent") {
      setSimulationMessage(
        "Simulation only: this preview represents the email verification sent state.",
      );
      return;
    }
    if (!acceptedTerms) {
      setConsentError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setConsentError("");
    const values = validateRegistration();
    if (!values) return;

    register(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "RECRUITER",
      },
      {
        onSuccess: () => {
          router.push(`/account-verify?email=${encodeURIComponent(values.email)}`);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#18181B] antialiased selection:bg-[#D4621A]/30 dark:bg-[#0D0D0F] dark:text-[#F5F5F5]">
      <Navbar />

      <section
        aria-label="Simulation State Control (Playbook B3)"
        className="mx-auto mt-4 flex w-full max-w-[1440px] flex-col gap-3 px-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-wide text-zinc-300 sm:text-xs">
            <CircleDot aria-hidden="true" className="size-4 text-emerald-400" />
            SIMULATION STATE CONTROL (PLAYBOOK B3)
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-300 sm:text-xs">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
            ENV: STAGING
          </span>
        </div>
        <div
          aria-label="Simulation states"
          className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2"
        >
          {simulationStates.map((state) => {
            const isSelected = simulationState === state;
            return (
              <button
                aria-pressed={isSelected}
                className={`min-h-8 rounded-full border px-2.5 py-1 text-[10px] font-medium leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] sm:px-3 sm:text-xs ${
                  isSelected
                    ? "border-[#D4621A] bg-[#D4621A] text-white"
                    : "border-zinc-700 bg-[#19191C] text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
                key={state}
                onClick={() => selectSimulationState(state)}
                type="button"
              >
                {state}
              </button>
            );
          })}
        </div>
      </section>
      {simulationMessage && (
        <p
          aria-live="polite"
          className="mx-3 mt-3 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs text-orange-200 sm:mx-6 lg:mx-auto lg:w-full lg:max-w-[1376px]"
        >
          {simulationMessage}
        </p>
      )}

      <main
        className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 md:py-12 lg:px-8"
        id="register-core"
      >
        <div className="mb-8 flex flex-col gap-5 border-b border-[#E4E4E7] pb-7 sm:mb-10 sm:pb-8 md:flex-row md:items-end md:justify-between dark:border-[#3F3F46]">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4621A]">
              Create your account
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Build Your Verifiable SkillGraph
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#71717A] sm:text-base dark:text-[#A1A1AA]">
              Authenticate once with your primary GitHub profile. No passwords
              required, zero noise.
            </p>
          </div>
          <div className="w-fit max-w-full rounded-xl border border-zinc-800 bg-[#121215] px-3 py-2.5 text-xs font-medium leading-relaxed text-zinc-200 sm:px-4 sm:text-sm">
            Candidate Free: ৳0
            <span className="mx-1.5 text-zinc-500">|</span>
            Recruiter Starter from ৳2,000/mo
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <section
            aria-label="Registration forms"
            className="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-sm sm:p-7 lg:col-span-7 dark:border-[#3F3F46] dark:bg-[#19191C]"
          >
            <div
              aria-label="Choose account type"
              className="mb-6 flex border-b border-[#E4E4E7] dark:border-[#3F3F46]"
              role="tablist"
            >
              <button
                aria-controls="candidate-panel"
                aria-selected={role === "CANDIDATE"}
                className={`flex-1 border-b-2 px-2 pb-3 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#E47735] ${
                  role === "CANDIDATE"
                    ? "border-[#D4621A] text-[#18181B] dark:text-[#F5F5F5]"
                    : "border-transparent text-[#71717A] hover:text-[#18181B] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
                }`}
                id="candidate-tab"
                onClick={() => setRole("CANDIDATE")}
                role="tab"
                type="button"
              >
                I&apos;m a Candidate (Developer)
              </button>
              <button
                aria-controls="recruiter-panel"
                aria-selected={role === "RECRUITER"}
                className={`flex-1 border-b-2 px-2 pb-3 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#E47735] ${
                  role === "RECRUITER"
                    ? "border-[#D4621A] text-[#18181B] dark:text-[#F5F5F5]"
                    : "border-transparent text-[#71717A] hover:text-[#18181B] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
                }`}
                id="recruiter-tab"
                onClick={() => setRole("RECRUITER")}
                role="tab"
                type="button"
              >
                I&apos;m a Technical Recruiter / Employer
              </button>
            </div>

            {role === "CANDIDATE" ? (
              <div
                aria-labelledby="candidate-tab"
                className="space-y-5"
                id="candidate-panel"
                role="tabpanel"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-md border border-[#D4621A]/30 bg-[#D4621A]/10 px-2.5 py-1.5 text-xs font-medium text-[#9A4514] dark:text-[#F0A374]">
                    <CheckCircle2 aria-hidden="true" className="size-4" />
                    Evidence-first portfolio
                  </span>
                  <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                    Sign in with GitHub
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    className="flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#30363D] bg-[#24292F] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1F23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isPending || isSimulatedLoading}
                    onClick={handleGithubSignup}
                    type="button"
                  >
                    {isGithubLoading ? (
                      <span
                        aria-hidden="true"
                        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : (
                      <GitBranch aria-hidden="true" className="size-5" />
                    )}
                    {isGithubLoading || isSimulatedLoading
                      ? "Connecting to GitHub…"
                      : "Continue with GitHub"}
                    {!isGithubLoading && !isSimulatedLoading && (
                      <ArrowRight aria-hidden="true" className="size-4" />
                    )}
                  </button>
                  <p className="text-center text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Candidates authenticate with GitHub. Repository analysis
                    permissions are requested explicitly for selected
                    repositories.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-[#E4E4E7] bg-[#F8FAFC] p-4 dark:border-[#3F3F46] dark:bg-[#0D0D0F]">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#D4621A]"
                  />
                  <div>
                    <h2 className="text-sm font-semibold">Read-only safety</h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                      TalentGraph does not request private SSH keys or perform
                      repository write operations.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-[#3F3F46] bg-[#0D0D0F] p-4 font-mono text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-[#F5F5F5]">
                      EVIDENCE INTAKE
                    </span>
                    <span className="text-[#22C55E]">EXPLAINABLE</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-[#A1A1AA]">
                    Skills connect to evidence from a CV, selected repositories,
                    and technical assessments. Hiring decisions remain human.
                  </p>
                </div>
              </div>
            ) : (
              <div
                aria-labelledby="recruiter-tab"
                className="space-y-5"
                id="recruiter-panel"
                role="tabpanel"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md border border-[#D4621A]/30 bg-[#D4621A]/10 px-2.5 py-1.5 text-xs font-medium text-[#9A4514] dark:text-[#F0A374]">
                    <Building2 aria-hidden="true" className="size-4" />
                      Employer Onboarding
                  </span>
                  <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                      Requires Business Email
                  </span>
                </div>

                <form className="space-y-4" onSubmit={handleRecruiterSignup}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="min-w-0">
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-name"
                      >
                        Full Name
                    </label>
                    <div className="relative">
                      <UserRound aria-hidden="true" className={iconClassName} />
                      <input
                        aria-describedby={nameError ? "signup-name-error" : undefined}
                        aria-invalid={Boolean(nameError)}
                        autoComplete="name"
                        className={inputClassName}
                        id="signup-name"
                        maxLength={60}
                        onChange={(event) => {
                          setName(event.target.value);
                          setNameError("");
                        }}
                        placeholder="Dr. Sarah Connor"
                        required
                        value={name}
                      />
                    </div>
                    {nameError && (
                      <p
                        className="mt-1.5 text-xs text-[#DC2626] dark:text-[#E5484D]"
                        id="signup-name-error"
                      >
                        {nameError}
                      </p>
                    )}
                  </div>

                  <div className="min-w-0">
                    <label
                      className="mb-1.5 block text-sm font-medium"
                      htmlFor="signup-email"
                    >
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail aria-hidden="true" className={iconClassName} />
                      <input
                        aria-describedby={
                          emailError ? "signup-email-error" : undefined
                        }
                        aria-invalid={Boolean(emailError)}
                        autoComplete="email"
                        className={inputClassName}
                        id="signup-email"
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setEmailError("");
                        }}
                        placeholder="name@company.com"
                        required
                        type="email"
                        value={email}
                      />
                    </div>
                    {emailError ? (
                      <p
                        className="mt-1.5 text-xs text-[#DC2626] dark:text-[#E5484D]"
                        id="signup-email-error"
                      >
                        {emailError}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                        Company domain required for verified team workspaces.
                      </p>
                    )}
                  </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="min-w-0">
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-password"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <KeyRound aria-hidden="true" className={iconClassName} />
                        <input
                          aria-describedby={
                            passwordError ? "signup-password-error" : undefined
                          }
                          aria-invalid={Boolean(passwordError)}
                          autoComplete="new-password"
                          className={`${inputClassName} pr-11`}
                          id="signup-password"
                          onChange={(event) => {
                            setPassword(event.target.value);
                            setPasswordError("");
                          }}
                          placeholder="Create a password"
                          required
                          type={showPassword ? "text" : "password"}
                          value={password}
                        />
                        <button
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-[#71717A] hover:text-[#18181B] focus-visible:outline-2 focus-visible:outline-[#E47735] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
                          onClick={() =>
                            setShowPassword((isVisible) => !isVisible)
                          }
                          type="button"
                        >
                          {showPassword ? (
                            <EyeOff aria-hidden="true" className="size-4" />
                          ) : (
                            <Eye aria-hidden="true" className="size-4" />
                          )}
                        </button>
                      </div>
                      {passwordError ? (
                        <p
                          className="mt-1.5 text-xs text-[#DC2626] dark:text-[#E5484D]"
                          id="signup-password-error"
                        >
                          {passwordError}
                        </p>
                      ) : (
                        <p className="mt-1.5 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                          At least 8 characters, including upper- and lowercase,
                          a number, and a symbol.
                        </p>
                      )}
                    </div>

                    <div className="min-w-0">
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-confirm-password"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          aria-hidden="true"
                          className={iconClassName}
                        />
                        <input
                          aria-describedby={
                            confirmPasswordError
                              ? "signup-confirm-password-error"
                              : undefined
                          }
                          aria-invalid={Boolean(confirmPasswordError)}
                          autoComplete="new-password"
                          className={`${inputClassName} pr-11`}
                          id="signup-confirm-password"
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);
                            setConfirmPasswordError("");
                          }}
                          placeholder="Re-enter password"
                          required
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                        />
                        <button
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirmation password"
                              : "Show confirmation password"
                          }
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-[#71717A] hover:text-[#18181B] focus-visible:outline-2 focus-visible:outline-[#E47735] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
                          onClick={() =>
                            setShowConfirmPassword((isVisible) => !isVisible)
                          }
                          type="button"
                        >
                          {showConfirmPassword ? (
                            <EyeOff aria-hidden="true" className="size-4" />
                          ) : (
                            <Eye aria-hidden="true" className="size-4" />
                          )}
                        </button>
                      </div>
                      {confirmPasswordError && (
                        <p
                          className="mt-1.5 text-xs text-[#DC2626] dark:text-[#E5484D]"
                          id="signup-confirm-password-error"
                        >
                          {confirmPasswordError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="min-w-0">
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-company"
                      >
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 aria-hidden="true" className={iconClassName} />
                        <input
                          autoComplete="organization"
                          className={inputClassName}
                          id="signup-company"
                          name="companyName"
                          placeholder="Acme Systems Corp"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-website"
                      >
                        Official Website
                      </label>
                      <div className="relative">
                        <Globe aria-hidden="true" className={iconClassName} />
                        <input
                          autoComplete="url"
                          className={inputClassName}
                          id="signup-website"
                          name="website"
                          placeholder="https://acmesystems.io"
                          type="url"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium"
                      htmlFor="signup-recruiter-title"
                    >
                      Recruiter Title / Role
                    </label>
                    <div className="relative">
                      <UserRound aria-hidden="true" className={iconClassName} />
                      <input
                        autoComplete="organization-title"
                        className={inputClassName}
                        id="signup-recruiter-title"
                        name="recruiterTitle"
                        placeholder="VP of Talent & Engineering Systems"
                        type="text"
                      />
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Company name, website, and recruiter title are collected for
                    the interface but are not submitted by the current
                    registration API.
                  </p>

                  <div className="rounded-lg border border-[#3F3F46] bg-[#121215] p-3.5 text-xs leading-relaxed text-zinc-300">
                    <div className="flex items-start gap-2.5">
                      <Info
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-[#D4621A]"
                      />
                      <p>
                        Mandatory policy note: Creating an account does not
                        automatically verify your company or authorize job
                        publishing. Company legitimacy and recruiter
                        affiliation must be verified prior to posting jobs.
                      </p>
                    </div>
                  </div>

                  <button
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D4621A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b85215] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isPending || isSimulatedLoading}
                    type="submit"
                  >
                    {isRegistering || isSimulatedLoading ? (
                      <span
                        aria-hidden="true"
                        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : null}
                    {isRegistering || isSimulatedLoading
                      ? "Creating account…"
                      : "Continue to Company Verification"}
                    {!isRegistering && !isSimulatedLoading && (
                      <ArrowRight aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </form>
              </div>
            )}

            <div className="mt-6 border-t border-[#E4E4E7] pt-5 dark:border-[#3F3F46]">
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                <input
                  checked={acceptedTerms}
                  className="mt-0.5 size-4 shrink-0 rounded border-[#3F3F46] accent-[#D4621A] focus:ring-2 focus:ring-[#D4621A]"
                  onChange={(event) => {
                    setAcceptedTerms(event.target.checked);
                    setConsentError("");
                  }}
                  type="checkbox"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    className="font-medium text-[#18181B] underline hover:text-[#D4621A] dark:text-[#F5F5F5]"
                    href="/terms"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="font-medium text-[#18181B] underline hover:text-[#D4621A] dark:text-[#F5F5F5]"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                  . Repository access is configured separately and explicitly.
                </span>
              </label>
              {consentError && (
                <p className="mt-2 text-xs text-[#DC2626] dark:text-[#E5484D]">
                  {consentError}
                </p>
              )}
            </div>

            <div className="mt-5 text-center text-xs text-[#71717A] dark:text-[#A1A1AA]">
              Already have an account?{" "}
              <Link
                className="font-semibold text-[#D4621A] transition-colors hover:text-[#E47735] hover:underline"
                href="/login"
              >
                Sign in
              </Link>
            </div>
          </section>

          <aside
            aria-label="How TalentGraph grounds evidence"
            className="min-w-0 rounded-xl border border-[#E4E4E7] bg-white p-5 sm:p-7 lg:col-span-5 dark:border-[#3F3F46] dark:bg-[#19191C]"
          >
            <div className="mb-5 border-b border-[#E4E4E7] pb-4 dark:border-[#3F3F46]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">The Proofline Engine</h2>
                <span className="rounded border border-[#D4621A]/30 bg-[#D4621A]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#9A4514] dark:text-[#F0A374]">
                  Deterministic Lineage
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                Every candidate capability is anchored by traceable provenance
                markers from connected sources to human review.
              </p>
              <p className="mt-2 text-[10px] leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                Example markers only. Values below are illustrative and are not
                live candidate analysis results.
              </p>
            </div>

            <ol className="relative space-y-5 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:border-l before:border-zinc-700">
              <li className="relative flex min-w-0 gap-3.5">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-orange-500/40 bg-[#19191C] text-[#D4621A]">
                  <GitBranch aria-hidden="true" className="size-[18px]" />
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#D4621A] text-[9px] font-bold text-white">1</span>
                </span>
                <div className="min-w-0 flex-1 pb-1">
                  <h3 className="text-xs font-semibold sm:text-sm">
                    1. Connect CV &amp; Repos (OAuth / PDF)
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Connect a candidate-provided CV and explicitly selected
                    repositories.
                  </p>
                  <span className="mt-2 inline-flex max-w-full break-all rounded-md border border-zinc-700 bg-[#0D0D0F] px-2 py-1 font-mono text-[10px] text-zinc-300">
                    &lt;&gt; github.com/profile @ commit-hash
                  </span>
                </div>
              </li>
              <li className="relative flex min-w-0 gap-3.5">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-[#19191C] text-emerald-400">
                  <Code2 aria-hidden="true" className="size-[18px]" />
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">2</span>
                </span>
                <div className="min-w-0 flex-1 pb-1">
                  <h3 className="text-xs font-semibold sm:text-sm">
                    2. Grounded Static AST Analysis (Active AST)
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Static analysis connects skill signals to inspectable source
                    context.
                  </p>
                  <span className="mt-2 inline-flex max-w-full break-words rounded-md border border-emerald-700/50 bg-emerald-950/30 px-2 py-1 text-[10px] font-medium text-emerald-300">
                    ✓ AST verified: 84.2% Author Dominance
                  </span>
                </div>
              </li>
              <li className="relative flex min-w-0 gap-3.5">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-[#19191C] text-amber-400">
                  <ShieldCheck aria-hidden="true" className="size-[18px]" />
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white">3</span>
                </span>
                <div className="min-w-0 flex-1 pb-1">
                  <h3 className="text-xs font-semibold sm:text-sm">
                    3. Timed Mobile Assessment (Verified)
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    A separate timed assessment contributes another reviewable
                    evidence source.
                  </p>
                  <span className="mt-2 inline-flex max-w-full break-words rounded-md border border-amber-700/50 bg-amber-950/30 px-2 py-1 text-[10px] font-medium text-amber-300">
                    📊 Benchmark: 94th Pctl Distributed Systems
                  </span>
                </div>
              </li>
              <li className="relative flex min-w-0 gap-3.5">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-[#D4621A]/40 bg-[#19191C] text-[#D4621A]">
                  <CheckCircle2 aria-hidden="true" className="size-[18px]" />
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#D4621A] text-[9px] font-bold text-white">4</span>
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold sm:text-sm">
                    4. Deterministic Match (Decision)
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Hiring teams review supporting evidence and make the final
                    decision.
                  </p>
                  <span className="mt-2 inline-flex max-w-full break-words rounded-md border border-[#D4621A]/40 bg-[#D4621A]/10 px-2 py-1 text-[10px] font-medium text-[#F0A374]">
                    Proofline Complete: Zero Unsubstantiated Claims
                  </span>
                </div>
              </li>
            </ol>

            <div className="mt-7 flex items-start gap-2.5 border-t border-[#E4E4E7] pt-4 text-xs leading-relaxed text-[#71717A] dark:border-[#3F3F46] dark:text-[#A1A1AA]">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-[#D4621A]"
              />
              TalentGraph supports screening and explanation. Hiring decisions
              remain human.
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-[#E4E4E7] px-4 py-4 text-center text-xs text-[#71717A] dark:border-[#3F3F46] dark:text-[#A1A1AA]">
        Evidence-based technical recruitment · TalentGraph
      </footer>
    </div>
  );
}
