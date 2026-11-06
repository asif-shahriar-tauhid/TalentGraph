import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Code2,
  FileCode2,
  LockKeyhole,
  Network,
  ShieldCheck,
  Smartphone,
  Terminal,
  Users,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Connect CV & Repositories",
    description:
      "Start with your experience and connect the repositories you choose to share. TalentGraph organizes your stated skills alongside source-linked engineering work.",
    tags: ["Your CV", "Selected repositories", "You control access"],
    preview: "sync",
  },
  {
    number: "02",
    title: "Transparent Evidence Analysis",
    description:
      "Relevant code patterns and implementation signatures are surfaced with their source context, so candidates and recruiters can inspect what supports a skill.",
    tags: ["AST signatures", "Source references", "Inspectable signals"],
    preview: "analysis",
  },
  {
    number: "03",
    title: "Apply & Take Mobile Assessment",
    description:
      "Apply to a role and complete its technical assessment in the mobile companion. Assessment signals add context for human review rather than making an automatic verdict.",
    tags: ["Role-specific", "Mobile-first", "Human-reviewed"],
    preview: "assessment",
  },
  {
    number: "04",
    title: "Deterministic Weighted Match",
    description:
      "Recruiters define explicit skill weights. The resulting match is repeatable and explainable, with each contribution traceable to its evidence.",
    tags: ["Weights total 100%", "Repeatable results", "Evidence-linked"],
    preview: "match",
  },
] as const;

const candidateBenefits = [
  "Build an evidence-backed profile you can reuse when applying.",
  "Choose which repositories to connect and share.",
  "See how your demonstrated skills map to role requirements.",
];

const recruiterBenefits = [
  "Set transparent, role-specific skill weights.",
  "Inspect source-linked evidence behind candidate claims.",
  "Review assessment signals with human context.",
];

const screeningPrinciples = [
  {
    title: "Strict Data Privacy",
    description: "Candidates choose the repositories and profile details they share.",
    status: "PRIVATE BY DESIGN",
    color: "green",
    icon: LockKeyhole,
  },
  {
    title: "No Room-Cheating",
    description: "Assessment integrity signals support a fair human review.",
    status: "HUMAN REVIEW",
    color: "orange",
    icon: ShieldCheck,
  },
  {
    title: "Verified Employers Only",
    description: "Employer affiliation is reviewed before recruiter access.",
    status: "VERIFIED",
    color: "emerald",
    icon: Building2,
  },
  {
    title: "Human Integrity Audit",
    description: "No integrity signal alone becomes an automatic verdict.",
    status: "PEOPLE FIRST",
    color: "blue",
    icon: Users,
  },
] as const;

function StepPreview({ type }: { type: (typeof steps)[number]["preview"] }) {
  if (type === "sync") {
    return (
      <div className="rounded-xl border border-zinc-800 bg-[#09090B] p-4 font-mono text-xs shadow-inner sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="flex items-center gap-2 text-zinc-300">
            <Terminal aria-hidden="true" className="size-4 text-orange-400" />
            Repository sync
          </span>
          <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">
            COMPLETE
          </span>
        </div>
        <div className="space-y-3 text-zinc-400">
          <p><span className="text-emerald-400">✓</span> talentgraph/mobile-app</p>
          <p><span className="text-emerald-400">✓</span> talentgraph/api-service</p>
          <p><span className="text-emerald-400">✓</span> talentgraph/design-system</p>
          <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3 text-[10px] text-zinc-500">
            <span>3 selected repositories</span>
            <span>Read-only access</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "analysis") {
    return (
      <div className="rounded-xl border border-zinc-800 bg-[#09090B] p-4 shadow-inner sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="flex items-center gap-2 text-xs font-medium text-zinc-300">
            <FileCode2 aria-hidden="true" className="size-4 text-violet-400" />
            AST signature analysis
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            ANALYSIS READY
          </span>
        </div>
        <div className="space-y-2.5 font-mono text-[10px] sm:text-xs">
          <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
            <span className="text-zinc-300">async error handling</span>
            <span className="text-emerald-400">3 source refs</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
            <span className="text-zinc-300">dependency injection</span>
            <span className="text-emerald-400">2 source refs</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
            <span className="text-zinc-300">test coverage patterns</span>
            <span className="text-emerald-400">5 source refs</span>
          </div>
        </div>
        <p className="mt-3 text-[10px] leading-relaxed text-zinc-500">
          Signals link to inspectable code context; they are not an automated skill verdict.
        </p>
      </div>
    );
  }

  if (type === "assessment") {
    return (
      <div className="rounded-xl border border-zinc-800 bg-[#09090B] p-4 shadow-inner sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="flex items-center gap-2 text-xs font-medium text-zinc-300">
            <Smartphone aria-hidden="true" className="size-4 text-sky-400" />
            Mobile assessment matrix
          </span>
          <span className="text-[10px] text-zinc-500">ROLE: IOS ENGINEER</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-3 text-[10px] sm:text-xs">
          <span className="text-zinc-500">Competency</span>
          <span className="text-zinc-500">Assessment</span>
          <span className="text-zinc-500">Review</span>
          <span className="text-zinc-300">Swift concurrency</span>
          <span className="text-zinc-400">Complete</span>
          <CheckCircle2 aria-label="Ready for review" className="size-4 text-emerald-400" />
          <span className="text-zinc-300">App architecture</span>
          <span className="text-zinc-400">Complete</span>
          <CheckCircle2 aria-label="Ready for review" className="size-4 text-emerald-400" />
          <span className="text-zinc-300">Testing strategy</span>
          <span className="text-zinc-400">Complete</span>
          <CheckCircle2 aria-label="Ready for review" className="size-4 text-emerald-400" />
        </div>
        <p className="mt-4 border-t border-zinc-800 pt-3 text-[10px] text-zinc-500">
          Assessment results are reviewed by people, with relevant context.
        </p>
      </div>
    );
  }

  const weights = [
    { label: "Repository evidence", value: "35%", width: "w-[35%]", color: "bg-orange-400" },
    { label: "Technical assessment", value: "30%", width: "w-[30%]", color: "bg-violet-400" },
    { label: "Role skills", value: "25%", width: "w-[25%]", color: "bg-sky-400" },
    { label: "Experience", value: "10%", width: "w-[10%]", color: "bg-emerald-400" },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#09090B] p-4 shadow-inner sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
        <span className="flex items-center gap-2 text-xs font-medium text-zinc-300">
          <Network aria-hidden="true" className="size-4 text-orange-400" />
          Weighted match breakdown
        </span>
        <span className="text-[10px] text-zinc-500">ILLUSTRATIVE</span>
      </div>
      <div className="space-y-3">
        {weights.map(({ label, value, width, color }) => (
          <div className="grid grid-cols-[minmax(0,1fr)_2rem] items-center gap-3" key={label}>
            <div>
              <div className="mb-1.5 flex justify-between text-[10px] text-zinc-400">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-800">
                <div className={`h-full rounded-full ${width} ${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-zinc-800 pt-4">
        <span className="text-[10px] text-zinc-500">DETERMINISTIC ROLE MATCH</span>
        <span className="text-2xl font-semibold tracking-tight text-white">
          92.4<span className="text-sm text-zinc-500">/100</span>
        </span>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <div className="bg-[#0D0D0F] text-white">
      <section
        aria-labelledby="features-title"
        className="border-b border-zinc-800 px-3 py-14 sm:px-6 sm:py-20 lg:px-8"
        id="evidence"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto mb-10 max-w-3xl space-y-3 text-center sm:mb-14">
            <p className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-orange-300 sm:text-xs">
              EVIDENCE - BASED MATCHING TECHNOLOGY
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight text-white sm:text-4xl"
              id="features-title"
            >
              Four Steps to Absolute Provenance
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Connect candidate claims to inspectable sources, thoughtful review,
              and transparent skill context.
            </p>
          </header>

          <div className="space-y-4 sm:space-y-5">
            {steps.map(({ number, title, description, tags, preview }) => (
              <article
                className="grid min-w-0 gap-6 rounded-2xl border border-zinc-800 bg-[#121215] p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:p-8"
                key={number}
              >
                <div className="flex min-w-0 flex-col">
                  <span className="mb-4 inline-flex w-fit items-center rounded-md border border-orange-500/25 bg-orange-500/10 px-2.5 py-1 font-mono text-xs font-semibold tracking-wider text-orange-300">
                    #{number}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                    {description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-zinc-300 sm:text-xs"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <StepPreview type={preview} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="audiences-title"
        className="border-b border-zinc-800 px-3 py-14 sm:px-6 sm:py-20 lg:px-8"
        id="roles"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
              One evidence graph. Two perspectives.
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight text-white sm:text-4xl"
              id="audiences-title"
            >
              Built for Two Rigorous Audiences
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
              Give candidates a fair way to prove their skills and recruiters
              clearer, inspectable evidence for every hiring decision.
            </p>
          </header>

          <div className="grid gap-5 lg:grid-cols-2">
            <AudienceCard
              title="For Candidates"
              subtitle="Make your engineering work speak for itself."
              action="Build Candidate SkillGraph"
              href="/register"
              icon={Code2}
              benefits={candidateBenefits}
              accent="emerald"
            />
            <AudienceCard
              title="For Recruiters"
              subtitle="Make role fit transparent, consistent, and explainable."
              action="View Recruiter Plans"
              href="/pricing"
              icon={Users}
              benefits={recruiterBenefits}
              accent="orange"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="screening-title"
        className="px-3 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
              Transparent by design
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight text-white sm:text-4xl"
              id="screening-title"
            >
              AI supports screening. People make decisions.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
              Technology organizes evidence and highlights relevant context. It
              does not secretly reject candidates or replace human judgment.
            </p>
          </header>

          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    Explainable decisions
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    Zero Black-Box Rejections
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                No hidden score makes a hiring decision. Every signal can be
                traced to its source and reviewed by a person.
              </p>
              <div className="mt-5 rounded-xl border border-zinc-800 bg-[#09090B] p-4 font-mono text-[10px] leading-relaxed sm:text-xs">
                <p className="text-zinc-500">{"// Evidence stays inspectable"}</p>
                <p className="mt-2 text-zinc-300">
                  <span className="text-violet-400">match</span>.explain()
                </p>
                <p className="mt-1 text-emerald-400">
                  &rarr; criteria + weights + source evidence
                </p>
                <p className="mt-1 text-zinc-500">
                  &rarr; recruiter review required
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300">
                  <Network aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-300">
                    Transparent, repeatable fit
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    Deterministic Matching
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Explicit role weights show how each evidence category
                contributes. Change the criteria and the result updates
                predictably.
              </p>
              <div className="mt-5 space-y-3 rounded-xl border border-zinc-800 bg-[#09090B] p-4">
                <MetricBar label="Repository evidence" value="35%" color="bg-orange-400" width="w-[35%]" />
                <MetricBar label="Technical assessment" value="30%" color="bg-violet-400" width="w-[30%]" />
                <MetricBar label="Role skills" value="25%" color="bg-sky-400" width="w-[25%]" />
                <MetricBar label="Experience" value="10%" color="bg-emerald-400" width="w-[10%]" />
                <div className="flex justify-between border-t border-zinc-800 pt-3 text-[10px] text-zinc-500">
                  <span>ROLE CRITERIA TOTAL</span>
                  <span className="font-semibold text-zinc-200">100%</span>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {screeningPrinciples.map(({ title, description, status, color, icon: Icon }) => {
              const palette = {
                green: "border-green-500/30 bg-green-500/10 text-green-400",
                emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                orange: "border-orange-500/30 bg-orange-500/10 text-orange-300",
                blue: "border-sky-500/30 bg-sky-500/10 text-sky-300",
              }[color];

              return (
                <article
                  className="rounded-xl border border-zinc-800 bg-[#121215] p-4"
                  key={title}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className={`rounded-full border px-2 py-1 text-[9px] font-semibold tracking-wide ${palette}`}>
                      {status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function AudienceCard({
  title,
  subtitle,
  action,
  href,
  icon: Icon,
  benefits,
  accent,
}: {
  title: string;
  subtitle: string;
  action: string;
  href: string;
  icon: typeof Code2;
  benefits: string[];
  accent: "emerald" | "orange";
}) {
  const isCandidate = accent === "emerald";
  const accentText = isCandidate ? "text-emerald-400" : "text-orange-300";
  const accentBorder = isCandidate ? "border-emerald-500/30" : "border-orange-500/30";
  const accentBg = isCandidate ? "bg-emerald-500/10" : "bg-orange-500/10";
  const buttonClass = isCandidate
    ? "bg-emerald-500 text-[#08130E] hover:bg-emerald-400"
    : "bg-[#D4621A] text-white hover:bg-[#E47735]";

  return (
    <article className={`flex h-full flex-col rounded-2xl border ${accentBorder} bg-[#121215] p-5 sm:p-7`}>
      <div className="flex items-start gap-4 border-b border-zinc-800 pb-5">
        <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${accentBorder} ${accentBg} ${accentText}`}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>
      </div>
      <ul className="flex-1 space-y-4 py-5">
        {benefits.map((benefit) => (
          <li className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300" key={benefit}>
            <Check aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${accentText}`} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <Link
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${buttonClass}`}
        href={href}
      >
        {action}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

function MetricBar({
  label,
  value,
  color,
  width,
}: {
  label: string;
  value: string;
  color: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[10px] text-zinc-400">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-800">
        <div className={`h-full rounded-full ${width} ${color}`} />
      </div>
    </div>
  );
}
