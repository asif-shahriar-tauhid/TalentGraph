import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "@/asset/svg/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Auth Topbar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-border/80 px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
        </Link>
        <ThemeToggle />
      </header>

      {/* Auth Main Card Viewport */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-black tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
            {children}
          </div>

          <div className="text-center text-[11px] text-muted-foreground">
            Evidence-Based Technical Recruitment • TalentGraph
          </div>
        </div>
      </main>
    </div>
  );
}
