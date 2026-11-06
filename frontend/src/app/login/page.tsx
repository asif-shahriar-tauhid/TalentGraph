"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getGithubAuthUrl } from "@/api/auth.api";
import { GithubIcon } from "@/asset/svg/GithubIcon";
import { Navbar } from "@/components/Navbar";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { useLogin } from "@/hooks/auth.hooks";
import { resolvePostAuthUrl } from "@/lib/authUtils";
import { LoginZodSchema } from "@/validation";

const simulationStates = [
  "Default",
  "OAuth Cancel",
  "Invalid Workspace",
  "Unverified Email",
  "Loading",
] as const;

type SimulationState = (typeof simulationStates)[number];

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [simulationState, setSimulationState] =
    useState<SimulationState>("Default");
  const [simulationMessage, setSimulationMessage] = useState("");

  const isPending = isLoginPending || isGithubLoading;
  const isSimulatedLoading = simulationState === "Loading";

  const getRedirectUrl = () => {
    if (typeof window === "undefined") return undefined;
    return new URLSearchParams(window.location.search).get("redirect") ?? undefined;
  };

  const selectSimulationState = (state: SimulationState) => {
    setSimulationState(state);
    setEmailError("");
    setPasswordError("");
    setSimulationMessage("");
  };

  const handleGithubLogin = async () => {
    if (simulationState === "OAuth Cancel") {
      setSimulationMessage("Simulation: GitHub authorization was canceled.");
      return;
    }

    try {
      setIsGithubLoading(true);
      const response = await getGithubAuthUrl(getRedirectUrl());
      const authorizationUrl = response?.data?.url;
      if (!authorizationUrl) {
        gooeyToast.error("Could not start GitHub sign in", {
          description: "The authorization service did not return a sign-in URL.",
        });
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
    } finally {
      setIsGithubLoading(false);
    }
  };

  const handleRecruiterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    setSimulationMessage("");

    if (isSimulatedLoading) return;
    if (simulationState === "Invalid Workspace") {
      setEmailError("This email is not a valid company workspace.");
      return;
    }
    if (simulationState === "Unverified Email") {
      setSimulationMessage(
        "Simulation: verify your email before accessing this workspace.",
      );
      return;
    }

    const result = LoginZodSchema.safeParse({ email: email.trim(), password });
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
    <div className="flex min-h-screen flex-col justify-between bg-[#0D0D0F] px-3 py-4 text-zinc-100 antialiased selection:bg-[#D4621A]/30 sm:px-6">
      <Navbar variant="dark" />

      <main className="flex flex-1 items-center justify-center py-6 sm:py-10">
        <div className="w-full max-w-lg min-w-0">
          <section
            aria-labelledby="simulation-title"
            className="mx-auto mb-6 w-full max-w-lg rounded-xl border border-zinc-800 bg-[#121215] p-3"
          >
            <div className="mb-3 flex min-w-0 items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-300">
                <SlidersHorizontal aria-hidden="true" className="size-4" />
              </span>
              <h2
                className="min-w-0 text-xs font-semibold text-zinc-100 sm:text-sm"
                id="simulation-title"
              >
                Simulation State Control (Playbook B2)
              </h2>
            </div>
            <div
              aria-label="Simulation states"
              className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-5"
            >
              {simulationStates.map((state) => {
                const isSelected = simulationState === state;
                return (
                  <button
                    aria-pressed={isSelected}
                    className={`min-w-0 rounded-full border px-2 py-1.5 text-[10px] font-medium leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 sm:text-xs ${
                      isSelected
                        ? "border-[#D4621A] bg-[#D4621A] text-white shadow"
                        : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
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

          <section
            aria-labelledby="login-title"
            className="mx-auto w-full max-w-lg min-w-0 rounded-2xl border border-zinc-800 bg-[#121215]/90 p-6 shadow-2xl sm:p-8"
            id="auth-card"
          >
            <div className="mb-6 min-w-0">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4621A]">
                TalentGraph access
              </p>
              <h1
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                id="login-title"
              >
                Access Ground Truth
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Evidence-substantiated engineering profiles &amp; hiring
                intelligence.
              </p>
            </div>

            <section
              aria-labelledby="candidate-access-title"
              className="rounded-xl border border-zinc-800 bg-[#0D0D0F] p-4 sm:p-5"
            >
              <h2
                className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-200 sm:text-sm"
                id="candidate-access-title"
              >
                CANDIDATE ACCESS (Developer / Engineer)
              </h2>
              <button
                className="flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-[#19191C] px-3 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3 sm:px-4"
                disabled={isPending || isSimulatedLoading}
                onClick={handleGithubLogin}
                type="button"
              >
                {isGithubLoading ? (
                  <span
                    aria-hidden="true"
                    className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                ) : (
                  <GithubIcon aria-hidden="true" className="size-4 shrink-0" />
                )}
                <span className="truncate">
                  {isGithubLoading ? "Connecting to GitHub…" : "Continue with GitHub"}
                </span>
              </button>

              <p className="mt-3 flex items-start gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/30 p-2.5 text-xs leading-relaxed text-emerald-400">
                <LockKeyhole
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>
                  Candidates authenticate strictly via GitHub OAuth. Read-only
                  least-privilege repository consent.
                </span>
              </p>
            </section>

            {simulationMessage && (
              <p
                aria-live="polite"
                className="mt-4 rounded-lg border border-orange-500/30 bg-orange-500/10 p-2.5 text-xs leading-relaxed text-orange-200"
              >
                {simulationMessage}
              </p>
            )}

            <div className="relative my-6 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 border-t border-zinc-800"
              />
              <span className="relative max-w-[90%] bg-[#121215] px-3 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-400 sm:text-[11px]">
                OR RECRUITER WORKSPACE LOGIN
              </span>
            </div>

            <form className="space-y-4" onSubmit={handleRecruiterSubmit}>
              <div className="min-w-0">
                <label
                  className="mb-1.5 block text-sm font-medium text-zinc-200"
                  htmlFor="workspaceEmail"
                >
                  Workspace Email
                </label>
                <div className="relative">
                  <Building2
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    aria-describedby={
                      emailError ? "workspaceEmailError" : "emailHelperText"
                    }
                    aria-invalid={Boolean(emailError)}
                    autoComplete="username"
                    className="h-11 w-full min-w-0 rounded-lg border border-zinc-700 bg-[#0D0D0F] pl-10 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#D4621A] focus:outline-none focus:ring-1 focus:ring-[#D4621A]"
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
                    className="mt-1.5 text-xs text-red-400"
                    id="workspaceEmailError"
                  >
                    {emailError}
                  </p>
                ) : (
                  <p
                    className="mt-1.5 text-xs leading-relaxed text-zinc-500"
                    id="emailHelperText"
                  >
                    Company domain required for verified team workspaces.
                    Personal webmails rejected.
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label
                    className="block text-sm font-medium text-zinc-200"
                    htmlFor="workspacePassword"
                  >
                    Password
                  </label>
                  <Link
                    className="shrink-0 text-xs font-medium text-orange-400 transition-colors hover:text-orange-300 hover:underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <KeyRound
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    aria-describedby={
                      passwordError ? "workspacePasswordError" : undefined
                    }
                    aria-invalid={Boolean(passwordError)}
                    autoComplete="current-password"
                    className="h-11 w-full min-w-0 rounded-lg border border-zinc-700 bg-[#0D0D0F] pl-10 pr-11 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#D4621A] focus:outline-none focus:ring-1 focus:ring-[#D4621A]"
                    id="workspacePassword"
                    name="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setPasswordError("");
                    }}
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center px-3.5 text-zinc-500 transition-colors hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-400"
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
                    className="mt-1.5 text-xs text-red-400"
                    id="workspacePasswordError"
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D4621A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b85215] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isPending || isSimulatedLoading}
                type="submit"
              >
                {isLoginPending || isSimulatedLoading ? (
                  <span
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                ) : null}
                {isLoginPending || isSimulatedLoading
                  ? "Signing in…"
                  : "Sign In as Recruiter"}
                {!isLoginPending && !isSimulatedLoading && (
                  <ArrowRight aria-hidden="true" className="size-4" />
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-zinc-800 pt-5 text-center">
              <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  className="inline-flex items-center gap-1 font-semibold text-orange-400 transition-colors hover:text-orange-300 hover:underline"
                  href="/register"
                >
                  Create an account / Register
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-zinc-800 pt-4 text-center text-xs text-zinc-500">
        Evidence-based technical recruitment · TalentGraph
      </footer>
    </div>
  );
}
