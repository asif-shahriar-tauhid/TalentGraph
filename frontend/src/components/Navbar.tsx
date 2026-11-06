"use client";

import { ArrowRight, LayoutDashboard, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRoleDashboardUrl } from "@/lib/authUtils";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

const navigationItems = [
  { label: "Industries", href: "/#roles" },
  { label: "Resources", href: "/#evidence" },
  { label: "Pricing", href: "/pricing" },
  { label: "Methodology", href: "/#evidence" },
  { label: "About", href: "/#about" },
];

export function Navbar({ variant = "default" }: { variant?: "default" | "dark" }) {
  const { isAuthenticated, role } = useAuth();
  const dashboardUrl = getRoleDashboardUrl(role);
  const { resolvedTheme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const isDark = variant === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-md ${
        isDark
          ? "border-zinc-800 bg-[#0D0D0F]/95"
          : "border-[#E4E4E7] bg-white/95 dark:border-[#3F3F46]/70 dark:bg-[#0D0D0F]/95"
      }`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center px-3 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8">
        <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-2 gap-y-1 lg:contents">
          <Link
            aria-label="TalentGraph home"
            className={`shrink-0 rounded-lg py-1 text-[10px] font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] sm:text-xs md:text-sm ${
              isDark
                ? "text-zinc-100"
                : "text-[#18181B] dark:text-[#F5F5F5]"
            }`}
            href="/"
          >
            TalentGraph
          </Link>

          <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-1.5 gap-y-1 text-[10px] sm:gap-x-3 sm:gap-y-2 sm:text-xs md:text-sm lg:col-start-3 lg:row-start-1">
            <button
              aria-label={`Switch to ${nextTheme} mode`}
              className={`flex size-8 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] sm:size-9 ${
                isDark
                  ? "border-zinc-700 bg-[#19191C] text-zinc-300 hover:text-white"
                  : "border-[#E4E4E7] bg-white text-[#71717A] hover:text-[#18181B] dark:border-[#3F3F46] dark:bg-[#19191C] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
              }`}
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
                className="inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#D4621A] px-2.5 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#b85215] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] sm:min-h-9 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs md:text-sm"
                href={dashboardUrl}
              >
                <LayoutDashboard aria-hidden="true" className="size-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  className={`whitespace-nowrap rounded-full px-1.5 py-1 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] sm:px-2 ${
                    isDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-[#71717A] hover:text-[#18181B] dark:text-[#A1A1AA] dark:hover:text-[#F5F5F5]"
                  }`}
                  href={pathname === "/login" ? "/register" : "/login"}
                >
                  {pathname === "/login" ? "Sign up / Register" : "Sign In"}
                </Link>
                <Link
                  className="inline-flex min-h-8 items-center gap-1 whitespace-nowrap rounded-full bg-[#D4621A] px-2.5 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#b85215] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] sm:min-h-9 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs md:text-sm"
                  href="/register"
                >
                  Get Started
                  <ArrowRight aria-hidden="true" className="size-3.5 sm:size-4" />
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          aria-label="Main navigation"
          className={`mx-[-0.75rem] flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 px-3 pb-2 text-[10px] font-medium sm:mx-0 sm:gap-x-3 sm:gap-y-2 sm:px-0 sm:text-xs md:text-sm lg:col-start-2 lg:row-start-1 lg:mx-0 lg:justify-center lg:pb-0 ${
            isDark
              ? "text-zinc-400"
              : "text-[#71717A] dark:text-[#A1A1AA]"
          }`}
        >
          {navigationItems.map(({ label, href }) => (
            <Link
              className={`shrink-0 whitespace-nowrap rounded-sm py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] ${
                isDark
                  ? "hover:text-white"
                  : "hover:text-[#18181B] dark:hover:text-[#F5F5F5]"
              }`}
              href={href}
              key={label}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
