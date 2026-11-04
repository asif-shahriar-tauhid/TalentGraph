"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Code2,
  Eye,
  EyeOff,
  GitBranch,
  Globe,
  KeyRound,
  LockKeyhole,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getGithubAuthUrl } from "@/api/auth.api";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { useRegister } from "@/hooks/auth.hooks";
import { useTheme } from "@/providers/themeProvider";
import { RegisterZodSchema } from "@/validation";

type SignupRole = "CANDIDATE" | "RECRUITER";

export default function SignupPage() {
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { mutate: register, isPending: isRegistering } = useRegister();
  const [role, setRole] = useState<SignupRole>("CANDIDATE");
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
  const inputClassName =
    "h-11 w-full rounded-lg border border-[#E4E4E7] bg-white pl-10 pr-3 text-sm text-[#18181B] placeholder:text-[#71717A] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#D4621A] dark:border-[#3F3F46] dark:bg-[#0D0D0F] dark:text-[#F5F5F5] dark:placeholder:text-[#A1A1AA]";
  const iconClassName =
    "pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#71717A] dark:text-[#A1A1AA]";

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
      <header className="sticky top-0 z-20 w-full border-b border-[#E4E4E7] bg-white/90 backdrop-blur-md dark:border-[#3F3F46] dark:bg-[#0D0D0F]/90">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            aria-label="TalentGraph home"
            className="rounded text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E47735]"
            href="/"
          >
            TalentGraph
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 text-sm text-[#71717A] md:flex dark:text-[#A1A1AA]"
          >
            <Link className="transition-colors hover:text-[#D4621A]" href="/#roles">
              For teams
            </Link>
            <Link
              className="transition-colors hover:text-[#D4621A]"
              href="/#evidence"
            >
              Methodology
            </Link>
            <Link
              className="transition-colors hover:text-[#D4621A]"
              href="/pricing"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="text-sm font-medium text-[#71717A] transition-colors hover:text-[#D4621A] dark:text-[#A1A1AA]"
              href="/login"
            >
              Sign in
            </Link>
            <button
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              className="flex size-9 items-center justify-center rounded-lg border border-[#E4E4E7] bg-white text-[#71717A] transition-colors hover:text-[#D4621A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] dark:border-[#3F3F46] dark:bg-[#19191C] dark:text-[#A1A1AA]"
              onClick={toggleTheme}
              type="button"
            >
              {resolvedTheme === "dark" ? (
                <Sun aria-hidden="true" className="size-4" />
              ) : (
                <Moon aria-hidden="true" className="size-4" />
              )}
            </button>
            <Link
              className="hidden rounded-lg bg-[#D4621A] px-4 py-2 text-sm font-semibold text-[#18181B] transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] sm:inline-flex"
              href="#register-core"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main
        className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 md:py-12 lg:px-8"
        id="register-core"
      >
        <div className="mb-8 flex flex-col gap-5 border-b border-[#E4E4E7] pb-7 sm:mb-10 sm:pb-8 md:flex-row md:items-end md:justify-between dark:border-[#3F3F46]">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4621A]">
              Create your account
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Build your verifiable SkillGraph
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#71717A] sm:text-base dark:text-[#A1A1AA]">
              Candidates connect with GitHub. Recruiters create a workspace
              account and verify their email before company review.
            </p>
          </div>
          <Link
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#71717A] transition-colors hover:text-[#D4621A] dark:text-[#A1A1AA]"
            href="/login"
          >
            Already have an account?
            <span className="font-semibold text-[#D4621A]">Sign in</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
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
                I’m a candidate
                <span className="hidden sm:inline"> (developer)</span>
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
                I’m a recruiter
                <span className="hidden sm:inline"> / employer</span>
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
                    disabled={isPending}
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
                    {isGithubLoading
                      ? "Connecting to GitHub…"
                      : "Continue with GitHub"}
                    {!isGithubLoading && (
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
                  <span className="inline-flex items-center gap-2 rounded-md border border-[#3F3F46] bg-[#F4F4F5] px-2.5 py-1.5 text-xs font-medium text-[#18181B] dark:bg-[#252528] dark:text-[#F5F5F5]">
                    <Building2 aria-hidden="true" className="size-4" />
                    Employer onboarding
                  </span>
                  <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                    Email verification required
                  </span>
                </div>

                <form className="space-y-4" onSubmit={handleRecruiterSignup}>
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium"
                      htmlFor="signup-name"
                    >
                      Full name
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
                        placeholder="Your full name"
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

                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium"
                      htmlFor="signup-email"
                    >
                      Work email
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
                        Use the email address where you can receive a
                        verification code.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
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

                    <div>
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-confirm-password"
                      >
                        Confirm password
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-company"
                      >
                        Company name
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

                    <div>
                      <label
                        className="mb-1.5 block text-sm font-medium"
                        htmlFor="signup-website"
                      >
                        Official website
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

                  <p className="text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    These company details are for the signup interface only and
                    are not submitted by the current registration API.
                  </p>

                  <div className="rounded-lg border border-[#3F3F46] bg-[#F8FAFC] p-3.5 text-xs leading-relaxed text-[#71717A] dark:bg-[#0D0D0F] dark:text-[#A1A1AA]">
                    <div className="flex items-start gap-2.5">
                      <Building2
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-[#F59E0B]"
                      />
                      <p>
                        Creating an account does not verify your company or
                        authorize job posting. Company legitimacy and recruiter
                        affiliation must be reviewed before roles can be posted.
                      </p>
                    </div>
                  </div>

                  <button
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#D4621A] px-4 py-3 text-sm font-semibold text-[#18181B] transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isPending}
                    type="submit"
                  >
                    {isRegistering ? (
                      <span
                        aria-hidden="true"
                        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : (
                      <ArrowRight aria-hidden="true" className="size-4" />
                    )}
                    {isRegistering
                      ? "Creating account…"
                      : "Continue to email verification"}
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
            className="rounded-xl border border-[#E4E4E7] bg-white p-5 sm:p-7 lg:col-span-5 dark:border-[#3F3F46] dark:bg-[#19191C]"
          >
            <div className="mb-5 border-b border-[#E4E4E7] pb-4 dark:border-[#3F3F46]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">The Proofline Engine</h2>
                <span className="rounded border border-[#D4621A]/30 bg-[#D4621A]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#9A4514] dark:text-[#F0A374]">
                  Evidence lineage
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                A clear path from a skill claim to supporting evidence and
                human review.
              </p>
            </div>

            <ol className="space-y-5">
              <li className="flex gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#E4E4E7] bg-[#F8FAFC] text-[#D4621A] dark:border-[#3F3F46] dark:bg-[#0D0D0F]">
                  <GitBranch aria-hidden="true" className="size-[18px]" />
                </span>
                <div className="min-w-0 pb-1">
                  <h3 className="text-sm font-semibold">
                    1. Connect a CV and selected repositories
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Candidates choose which repository evidence to connect.
                  </p>
                </div>
              </li>
              <li className="flex gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#E4E4E7] bg-[#F8FAFC] text-[#22C55E] dark:border-[#3F3F46] dark:bg-[#0D0D0F]">
                  <Code2 aria-hidden="true" className="size-[18px]" />
                </span>
                <div className="min-w-0 pb-1">
                  <h3 className="text-sm font-semibold">
                    2. Ground analysis in code evidence
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Analysis links skills to inspectable source and repository
                    context.
                  </p>
                </div>
              </li>
              <li className="flex gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#E4E4E7] bg-[#F8FAFC] text-[#F59E0B] dark:border-[#3F3F46] dark:bg-[#0D0D0F]">
                  <ShieldCheck aria-hidden="true" className="size-[18px]" />
                </span>
                <div className="min-w-0 pb-1">
                  <h3 className="text-sm font-semibold">
                    3. Add technical assessment evidence
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Assessments provide another source for understanding
                    demonstrated skills.
                  </p>
                </div>
              </li>
              <li className="flex gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#D4621A]/30 bg-[#D4621A]/10 text-[#D4621A]">
                  <CheckCircle2 aria-hidden="true" className="size-[18px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">
                    4. Explain the job match
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                    Recruiters can review evidence and criteria; people make
                    hiring decisions.
                  </p>
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
