"use client";

import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  GitBranch,
  Info,
  KeyRound,
  LockKeyhole,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getGithubAuthUrl } from "@/api/auth.api";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { useLogin } from "@/hooks/auth.hooks";
import { resolvePostAuthUrl } from "@/lib/authUtils";
import { useTheme } from "@/providers/themeProvider";
import { LoginZodSchema } from "@/validation";

export default function LoginPage() {
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isPending = isLoginPending || isGithubLoading;

  const getRedirectUrl = () => {
    if (typeof window === "undefined") return undefined;
    return new URLSearchParams(window.location.search).get("redirect") ?? undefined;
  };

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);
      const response = await getGithubAuthUrl(getRedirectUrl());
      const authorizationUrl = response?.data?.url;
      if (!authorizationUrl) {
        gooeyToast.error("Could not start GitHub sign in", {
          description: "The authorization service did not return a sign-in URL.",
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
      gooeyToast.error("GitHub sign-in failed", { description: message });
      setIsGithubLoading(false);
    }
  };

  const handleRecruiterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = LoginZodSchema.safeParse({ email: email.trim(), password });

    setEmailError("");
    setPasswordError("");
    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "email") setEmailError(issue.message);
        if (issue.path[0] === "password") setPasswordError(issue.message);
      }
      return;
    }

    login(
      { email: result.data.email, password: result.data.password },
      {
        onSuccess: (response) => {
          router.replace(
            resolvePostAuthUrl({
              accessToken: response?.data?.accessToken,
              redirectUrl: getRedirectUrl(),
            }),
          );
          router.refresh();
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
            <Link className="transition-colors hover:text-[#D4621A]" href="/#evidence">
              Methodology
            </Link>
            <Link className="transition-colors hover:text-[#D4621A]" href="/pricing">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="hidden text-sm font-medium text-[#71717A] transition-colors hover:text-[#D4621A] sm:inline dark:text-[#A1A1AA]"
              href="/register"
            >
              Sign up
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
              href="#auth-card"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 md:py-12">
        <section
          aria-labelledby="login-title"
          className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white shadow-sm dark:border-[#3F3F46] dark:bg-[#19191C] dark:shadow-xl"
          id="auth-card"
        >
          <div className="h-1 w-full bg-gradient-to-r from-[#3F3F46] via-[#D4621A] to-[#3F3F46]" />
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4621A]">
                TalentGraph access
              </p>
              <h1
                className="text-2xl font-bold tracking-tight sm:text-3xl"
                id="login-title"
              >
                Access Ground Truth
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                Evidence-substantiated engineering profiles and hiring
                intelligence.
              </p>
            </div>

            <section
              aria-labelledby="candidate-access-title"
              className="rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] p-5 dark:border-[#3F3F46] dark:bg-[#0D0D0F]"
            >
              <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h2
                  className="text-sm font-semibold uppercase tracking-wide"
                  id="candidate-access-title"
                >
                  Candidate access
                </h2>
                <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                  Developer / Engineer
                </span>
              </div>
              <button
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#E4E4E7] bg-white px-4 py-3 text-sm font-semibold transition-colors hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#3F3F46] dark:bg-[#24292F] dark:text-white dark:hover:bg-[#1B1F23]"
                disabled={isPending}
                onClick={handleGithubLogin}
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
                <span>
                  {isGithubLoading ? "Connecting to GitHub…" : "Continue with GitHub"}
                </span>
                {!isGithubLoading && (
                  <ArrowRight aria-hidden="true" className="size-4" />
                )}
              </button>

              <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                <LockKeyhole
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#22C55E]"
                />
                Candidates authenticate via GitHub OAuth and explicitly grant
                repository access.
              </p>
            </section>

            <div className="relative my-6 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 border-t border-[#E4E4E7] dark:border-[#3F3F46]"
              />
              <span className="relative bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-[#71717A] dark:bg-[#19191C] dark:text-[#A1A1AA]">
                Recruiter workspace login
              </span>
            </div>

            <form className="space-y-4" onSubmit={handleRecruiterSubmit}>
              <div>
                <label
                  className="mb-1.5 block text-sm font-medium"
                  htmlFor="workspaceEmail"
                >
                  Workspace email
                </label>
                <div className="relative">
                  <Building2
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#71717A] dark:text-[#A1A1AA]"
                  />
                  <input
                    aria-describedby={
                      emailError ? "workspaceEmailError" : "emailHelperText"
                    }
                    aria-invalid={Boolean(emailError)}
                    autoComplete="username"
                    className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-white pl-10 pr-3 text-sm text-[#18181B] placeholder:text-[#71717A] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#D4621A] dark:border-[#3F3F46] dark:bg-[#0D0D0F] dark:text-[#F5F5F5] dark:placeholder:text-[#A1A1AA]"
                    id="workspaceEmail"
                    name="email"
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
                    id="workspaceEmailError"
                  >
                    {emailError}
                  </p>
                ) : (
                  <p
                    className="mt-1.5 flex items-center gap-1.5 text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]"
                    id="emailHelperText"
                  >
                    <Info aria-hidden="true" className="size-3.5 shrink-0" />
                    Use the email associated with your recruiter account.
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label
                    className="block text-sm font-medium"
                    htmlFor="workspacePassword"
                  >
                    Password
                  </label>
                  <Link
                    className="text-xs font-medium text-[#D4621A] transition-colors hover:text-[#E47735] hover:underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <KeyRound
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#71717A] dark:text-[#A1A1AA]"
                  />
                  <input
                    aria-describedby={
                      passwordError ? "workspacePasswordError" : undefined
                    }
                    aria-invalid={Boolean(passwordError)}
                    autoComplete="current-password"
                    className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-white pl-10 pr-11 text-sm text-[#18181B] placeholder:text-[#71717A] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#D4621A] dark:border-[#3F3F46] dark:bg-[#0D0D0F] dark:text-[#F5F5F5] dark:placeholder:text-[#A1A1AA]"
                    id="workspacePassword"
                    name="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter your password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center px-3.5 text-[#71717A] transition-colors hover:text-[#18181B] focus-visible:outline-2 focus-visible:outline-[#E47735] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" className="size-[18px]" />
                    ) : (
                      <Eye aria-hidden="true" className="size-[18px]" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p
                    className="mt-1.5 text-xs text-[#DC2626] dark:text-[#E5484D]"
                    id="workspacePasswordError"
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#D4621A] px-4 py-2.5 text-sm font-semibold text-[#18181B] shadow-sm transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isPending}
                type="submit"
              >
                {isLoginPending ? (
                  <span
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                ) : (
                  <KeyRound aria-hidden="true" className="size-4" />
                )}
                {isLoginPending ? "Signing in…" : "Sign in as recruiter"}
                {!isLoginPending && (
                  <ArrowRight aria-hidden="true" className="size-4" />
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-[#E4E4E7] pt-5 text-center dark:border-[#3F3F46]">
              <p className="text-sm text-[#71717A] dark:text-[#A1A1AA]">
                Don’t have an account?{" "}
                <Link
                  className="inline-flex items-center gap-1 font-semibold text-[#D4621A] transition-colors hover:text-[#E47735] hover:underline"
                  href="/register"
                >
                  Create an account
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E4E4E7] px-4 py-4 text-center text-xs text-[#71717A] dark:border-[#3F3F46] dark:text-[#A1A1AA]">
        Evidence-based technical recruitment · TalentGraph
      </footer>
    </div>
  );
}
