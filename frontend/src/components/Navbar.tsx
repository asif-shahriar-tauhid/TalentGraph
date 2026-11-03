"use client";

import { ArrowRight, LayoutDashboard, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { getRoleDashboardUrl } from "@/lib/authUtils";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

export function Navbar() {
  const { isAuthenticated, role } = useAuth();
  const dashboardUrl = getRoleDashboardUrl(role);
  const { resolvedTheme, toggleTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E4E7] bg-white/90 backdrop-blur-md dark:border-[#3F3F46]/70 dark:bg-[#0D0D0F]/90">
      <div className="mx-auto grid h-16 w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-sm font-medium text-[#71717A] md:flex dark:text-[#A1A1AA]"
        >
          <Link
            href="/pricing"
            className="transition-colors hover:text-[#18181B] dark:hover:text-[#F5F5F5]"
          >
            Pricing
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-[#18181B] dark:hover:text-[#F5F5F5]"
          >
            Methodology
          </Link>
        </nav>

        <Link
          aria-label="TalentGraph home"
          className="rounded-lg px-2 py-1 text-lg font-medium tracking-tight text-[#18181B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] dark:text-[#F5F5F5]"
          href="/"
        >
          TalentGraph
        </Link>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            className="hidden text-sm font-medium text-[#71717A] transition-colors hover:text-[#18181B] lg:inline dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
            href="/#about"
          >
            About
          </Link>
          <button
            aria-label={`Switch to ${nextTheme} mode`}
            className="flex size-9 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#71717A] transition-colors hover:text-[#18181B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] dark:border-[#3F3F46] dark:bg-[#19191C] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
            onClick={toggleTheme}
            title={`Switch to ${nextTheme} mode`}
            type="button"
          >
            {resolvedTheme === "dark" ? (
              <Sun aria-hidden="true" className="size-4" />
            ) : (
              <Moon aria-hidden="true" className="size-4" />
            )}
          </button>

          {isAuthenticated ? (
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-[#D4621A] px-4 py-2 text-sm font-semibold text-[#18181B] transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735]"
              href={dashboardUrl}
            >
              <LayoutDashboard aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Go to Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </Link>
          ) : (
            <>
              <Link
                className="rounded-full px-2 py-1 text-sm font-medium text-[#71717A] transition-colors hover:text-[#18181B] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
                href="/login"
              >
                Sign in
              </Link>
              <Link
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D4621A] px-4 py-2 text-sm font-semibold text-[#18181B] transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735]"
                href="/register"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
