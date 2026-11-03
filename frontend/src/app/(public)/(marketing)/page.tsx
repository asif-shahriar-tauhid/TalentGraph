import { FileSearch, Network, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/asset/svg/GithubIcon";
import { CallToAction } from "@/components/CallToAction";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />

      {/* Evidence Engine Section */}
      <section id="evidence" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border/80">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              The 4-Pillar Evidence Engine
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every job fit recommendation on TalentGraph is grounded in inspectable evidence artifacts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <GithubIcon className="size-5" />
              </div>
              <h4 className="text-sm font-bold text-foreground">1. Repository Sync</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Incremental snapshots of selected repositories, analyzing languages, dependencies, and commit frequency.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <FileSearch className="size-5" />
              </div>
              <h4 className="text-sm font-bold text-foreground">2. Code Evidence</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Extracted AST syntax traces matching real-world framework implementation patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="size-5" />
              </div>
              <h4 className="text-sm font-bold text-foreground">3. Assessments</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Timed mobile assessments with proctoring snapshots, evaluated with human-in-the-loop integrity audits.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Network className="size-5" />
              </div>
              <h4 className="text-sm font-bold text-foreground">4. SkillGraph</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transparent multi-node graph displaying percentile scores and actionable growth recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </div>
  );
}
