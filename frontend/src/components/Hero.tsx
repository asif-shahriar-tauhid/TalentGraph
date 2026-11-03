import {
  ArrowRight,
  ChevronDown,
  FileText,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const evidenceSources = [
  {
    icon: FileText,
    title: "CV claims",
    description: "Skills grounded in candidate experience",
  },
  {
    icon: GitBranch,
    title: "Repository evidence",
    description: "Selected work with inspectable source",
  },
  {
    icon: ShieldCheck,
    title: "Technical assessment",
    description: "Assessment evidence with human oversight",
  },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden border-b border-[#3F3F46]/70 bg-white px-4 py-20 text-center sm:px-6 lg:px-8 dark:bg-[#0D0D0F]"
      id="hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_42%,rgba(212,98,26,0.10),transparent_58%)] dark:bg-[radial-gradient(ellipse_at_50%_42%,rgba(212,98,26,0.12),transparent_58%)]"
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4621A]/30 bg-[#D4621A]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#9A4514] dark:text-[#F0A374]">
          Evidence-based technical recruitment
        </p>

        <h1
          className="max-w-3xl text-4xl font-medium tracking-tight text-[#18181B] sm:text-5xl md:text-6xl md:leading-[1.12] dark:text-[#F5F5F5]"
          id="hero-title"
        >
          Don’t just claim a skill.
          <br className="hidden sm:inline" />{" "}
          <span className="font-normal italic text-[#D4621A]">Prove it.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#71717A] sm:text-lg dark:text-[#A1A1AA]">
          TalentGraph connects candidate claims with CV, selected GitHub
          repositories, and technical assessment evidence—delivering
          transparent, verifiable job fit without black-box scores.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#D4621A] px-6 py-3 text-sm font-semibold text-[#18181B] shadow-lg shadow-[#D4621A]/20 transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735]"
            href="/register"
          >
            Get Started
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white/80 px-6 py-3 text-sm font-semibold text-[#18181B] transition-colors hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735] dark:border-[#3F3F46] dark:bg-[#19191C]/80 dark:text-[#F5F5F5] dark:hover:bg-[#252528]"
            href="#evidence"
          >
            See How It Works
          </Link>
        </div>

        <ul
          aria-label="Evidence used to explain job fit"
          className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3"
        >
          {evidenceSources.map(({ icon: Icon, title, description }) => (
            <li
              className="flex items-start gap-3 rounded-2xl border border-[#E4E4E7]/80 bg-white/80 p-4 shadow-sm dark:border-[#3F3F46]/70 dark:bg-[#19191C]/75"
              key={title}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#D4621A]/20 bg-[#D4621A]/10 text-[#D4621A]">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[#18181B] dark:text-[#F5F5F5]">
                  {title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                  {description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        aria-label="Explore the evidence engine"
        className="mt-12 inline-flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wide text-[#71717A] transition-colors hover:text-[#D4621A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E47735] dark:text-[#A1A1AA]"
        href="#evidence"
      >
        Explore the evidence
        <ChevronDown aria-hidden="true" className="size-5 text-[#D4621A]" />
      </Link>
    </section>
  );
}
