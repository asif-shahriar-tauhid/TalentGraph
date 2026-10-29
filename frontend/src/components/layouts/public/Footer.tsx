import Link from "next/link";
import Logo from "@/asset/svg/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-card py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <Logo size={28} />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              AI-assisted, evidence-based technical recruitment platform.
              Bridging candidate code, verified GitHub repositories, and
              transparent job fit.
            </p>
            <p className="text-xs font-semibold text-primary">
              “Don’t just claim a skill. Prove it.”
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Candidate Portal
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  GitHub Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate"
                  className="hover:text-primary transition-colors"
                >
                  SkillGraph Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate"
                  className="hover:text-primary transition-colors"
                >
                  Assessment Center
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Recruiter & Enterprise
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/register"
                  className="hover:text-primary transition-colors"
                >
                  Recruiter Onboarding
                </Link>
              </li>
              <li>
                <Link
                  href="/recruiter"
                  className="hover:text-primary transition-colors"
                >
                  Applicant Pipeline
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-primary transition-colors"
                >
                  System Admin Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-border/60 pt-6 text-[11px] text-muted-foreground gap-4">
          <p>© {currentYear} TalentGraph. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="opacity-80">
              Evidence-grounded hiring • Dual Theme (Light & Dark)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
