"use client";

import { ArrowRight, ChevronDown, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRoleDashboardUrl } from "@/lib/authUtils";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

const leftLinks = [
  { label: "Industries", href: "/#roles", dropdown: true },
  { label: "Resources", href: "/#evidence", dropdown: true },
  { label: "Pricing", href: "/pricing", dropdown: false },
  { label: "Methodology", href: "/#evidence", dropdown: false },
];

export function LandingNavbar() {
  const { isAuthenticated, role } = useAuth();
  const dashboardUrl = getRoleDashboardUrl(role);
  const { resolvedTheme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#08090A]/95 text-sm text-zinc-300 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-y-2 px-4 py-2 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-8">
        <nav
          aria-label="Primary navigation"
          className="order-2 flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:order-1 lg:justify-start lg:gap-x-5"
        >
          {leftLinks.map(({ label, href, dropdown }) => (
            <Link
              className="inline-flex min-w-0 items-center gap-1 break-words py-1 font-medium transition-colors hover:text-white"
              href={href}
              key={label}
            >
              {label}
              {dropdown && (
                <ChevronDown aria-hidden="true" className="size-3.5 shrink-0" />
              )}
            </Link>
          ))}
        </nav>

        <Link
          aria-label="TalentGraph home"
          className="order-1 justify-self-center text-lg font-bold tracking-tight text-white lg:order-2"
          href="/"
        >
          TalentGraph
        </Link>

        <div className="order-3 flex min-w-0 flex-wrap items-center justify-center gap-2 lg:justify-end">
          <Link
            className="rounded-lg px-2 py-1.5 font-medium transition-colors hover:text-white"
            href="/#about"
          >
            About
          </Link>
          <Link
            className="rounded-lg px-2 py-1.5 font-medium transition-colors hover:text-white"
            href={
              isAuthenticated
                ? dashboardUrl
                : pathname === "/login"
                  ? "/register"
                  : "/login"
            }
          >
            {isAuthenticated ? "Dashboard" : "Sign in"}
          </Link>
          <button
            aria-label={`Switch to ${nextTheme} mode`}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#121417] text-zinc-300 transition-colors hover:text-white"
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
          <Link
            className="inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#F97316] px-4 py-2 font-semibold text-[#17120F] transition-colors hover:bg-[#FB923C]"
            href="/register"
          >
            Get Started
            <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        </div>
      </div>
    </header>
  );
}
