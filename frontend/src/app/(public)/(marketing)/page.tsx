import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Code2,
  FileSearch,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/asset/svg/GithubIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border/80">
        <div className="mx-auto max-w-5xl text-center space-y-6">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1 text-xs border-primary/30 bg-primary/10 text-primary"
            >
              <Sparkles className="size-3.5" />
              <span>Evidence-Based Technical Recruitment</span>
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground font-sans">
            “Don’t just claim a skill.{" "}
            <span className="text-primary underline decoration-primary/40 underline-offset-8">
              Prove it.
            </span>”
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            TalentGraph connects candidate CV claims with verified GitHub repository code,
            syntax-grounded evidence, and objective technical assessments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              size="lg"
              variant="default"
              render={<Link href="/login" />}
              nativeButton={false}
              className="w-full sm:w-auto gap-2.5 font-bold"
            >
              <GithubIcon className="size-5" />
              <span>Candidate GitHub Sign In</span>
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/register" />}
              nativeButton={false}
              className="w-full sm:w-auto font-semibold"
            >
              Recruiter Registration
            </Button>
          </div>
        </div>
      </section>

      {/* Role Cards (Candidate vs Recruiter) */}
      <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border/80 bg-secondary/30">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Built for Developers and Technical Hiring Teams
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Moving recruitment from &ldquo;What does the resume claim?&rdquo; to &ldquo;What can the candidate demonstrate with verifiable code?&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Candidate Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-8 flex flex-col justify-between shadow-xs space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Code2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">For Candidates</h3>
                    <p className="text-xs text-muted-foreground">Prove your engineering ability</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-muted-foreground pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Connect selected GitHub repositories and verify genuine coding contributions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Generate an evidence-backed SkillGraph showcasing normalized skill mastery.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Take timed mobile technical assessments with integrity assurance.</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="default"
                render={<Link href="/login" />}
                nativeButton={false}
                className="w-full justify-center gap-2"
              >
                <span>Enter Candidate Portal</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>

            {/* Recruiter Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-8 flex flex-col justify-between shadow-xs space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">For Recruiters</h3>
                    <p className="text-xs text-muted-foreground">Screen talent with verifiable evidence</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-muted-foreground pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Define weighted skill requirements and rank applicants objectively.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Inspect code evidence snippets directly linked to source repositories.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Eliminate screening guesswork without relying on ungrounded AI hallucination.</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                render={<Link href="/register" />}
                nativeButton={false}
                className="w-full justify-center gap-2"
              >
                <span>Enter Recruiter Portal</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
}
