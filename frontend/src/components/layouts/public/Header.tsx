"use client";

import { ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Logo from "@/asset/svg/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { getRoleDashboardUrl } from "@/lib/authUtils";
import { useAuth } from "@/providers/authProvider";

export function Header() {
  const { isAuthenticated, role } = useAuth();
  const dashboardUrl = getRoleDashboardUrl(role);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
          <Link
            href="/#features"
            className="hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#roles"
            className="hover:text-foreground transition-colors"
          >
            For Candidates
          </Link>
          <Link
            href="/#roles"
            className="hover:text-foreground transition-colors"
          >
            For Recruiters
          </Link>
          <Link
            href="/#evidence"
            className="hover:text-foreground transition-colors"
          >
            Evidence Engine
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isAuthenticated ? (
            <Button
              size="sm"
              variant="default"
              render={<Link href={dashboardUrl} />}
              nativeButton={false}
              className="gap-2"
            >
              <LayoutDashboard className="size-3.5" />
              <span>Go to Dashboard</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                render={<Link href="/login" />}
                nativeButton={false}
                className="text-xs font-semibold"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                variant="default"
                render={<Link href="/register" />}
                nativeButton={false}
                className="gap-1.5 text-xs font-semibold"
              >
                <span>Get Started</span>
                <ArrowRight className="size-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
