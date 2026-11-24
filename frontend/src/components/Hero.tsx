import { ArrowRight, BadgeCheck, ChevronDown } from "lucide-react";
import Link from "next/link";

const proofCards = [
  {
    name: "Arif Rahman",
    role: "Senior Go Engineer",
    initials: "AR",
    avatar: "bg-[#F97316]",
    quote: "Where is the commit proof for high-throughput concurrency?",
    position: "top-[6%] left-[3%] xl:left-[6%]",
  },
  {
    name: "Sarah Jenkins",
    role: "Lead Tech Recruiter",
    initials: "SJ",
    avatar: "bg-[#818CF8]",
    quote: "How do custom deterministic skill weights total 100%?",
    position: "top-[6%] right-[3%] xl:right-[6%]",
  },
  {
    name: "Nusrat Jahan",
    role: "Full-Stack Dev",
    initials: "NJ",
    avatar: "bg-[#EC4899]",
    quote: "Verified AST syntax analysis & zero black-box scoring.",
    position: "top-[38%] left-[1.5%] xl:left-[3%]",
  },
  {
    name: "Zack Kass",
    role: "VP of Engineering",
    initials: "ZK",
    avatar: "bg-[#A855F7]",
    quote: "Show exact commit permalinks and AST line ranges.",
    position: "top-[38%] right-[1.5%] xl:right-[3%]",
  },
  {
    name: "Tanvir Hasan",
    role: "ML Systems Engineer",
    initials: "TH",
    avatar: "bg-[#14B8A6]",
    quote: "Which PyTorch repo benchmarks match the senior job weight?",
    position: "bottom-[12%] left-[4%] xl:left-[7%]",
  },
  {
    name: "Dr. Elisa Song",
    role: "CTO, CloudScale",
    initials: "ES",
    avatar: "bg-[#3B82F6]",
    quote: "How do mobile proctoring snapshots ensure human integrity?",
    position: "bottom-[12%] right-[4%] xl:right-[7%]",
  },
] as const;

function ProofCard({ card }: { card: (typeof proofCards)[number] }) {
  return (
    <article className="min-w-0 rounded-2xl border border-white/10 bg-[#111215]/95 p-3 text-left shadow-2xl backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className={`flex size-8 shrink-0 items-center justify-center rounded-full ${card.avatar} text-xs font-bold text-white`}
        >
          {card.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            <span className="break-words text-xs font-semibold text-white">{card.name}</span>
            <BadgeCheck aria-label="Verified" className="size-3.5 shrink-0 text-sky-400" />
          </div>
          <p className="break-words text-[11px] text-zinc-400">{card.role}</p>
        </div>
      </div>
      <p className="mt-2 break-words text-[13px] leading-snug text-zinc-300">
        &ldquo;{card.quote}&rdquo;
      </p>
    </article>
  );
}

export function Hero() {
  return (
    <div className="contents">
      <section
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden bg-[#08090A] px-4 py-4 text-center text-white sm:px-6 lg:h-[calc(100dvh_-_var(--landing-navbar-height))] lg:min-h-0 lg:max-h-[calc(100dvh_-_var(--landing-navbar-height))] lg:px-8"
        id="about"
      >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_42%,rgba(249,115,22,0.12),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[17%] top-[23%] -z-10 size-40 rounded-full bg-orange-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[53%] -z-10 size-52 rounded-full bg-violet-500/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[12%] left-[42%] -z-10 size-36 rounded-full bg-sky-500/5 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center">
        <div className="relative z-20 mx-auto flex w-full max-w-[520px] flex-col items-center px-4 text-center xl:max-w-[580px]">
          <p className="mb-5 inline-flex max-w-full items-center rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#FDBA74]">
            Evidence-based technical recruitment
          </p>
          <h1
            className="font-serif text-[clamp(2.5rem,3.8vw,3.5rem)] font-medium leading-[1.03] tracking-tight text-white"
            id="hero-title"
          >
            <span className="block">Don&rsquo;t just claim a skill.</span>
            <span className="block font-serif italic text-[#FDBA74]">Prove it.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-full text-base leading-relaxed text-zinc-300 sm:text-lg">
            TalentGraph connects candidate claims with CV, selected GitHub
            repositories, and technical assessment evidence&mdash;delivering
            transparent, verifiable job fit without black-box scores.
          </p>
          <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-base font-semibold text-[#17120F] shadow-lg shadow-[#F97316]/20 transition-colors hover:bg-[#FB923C]"
              href="/register"
            >
              Get Started
              <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-[#121417] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1A1D22]"
              href="#evidence"
            >
              See How It Works
            </Link>
          </div>
        </div>

        <div
          aria-label="Verified proof conversations"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <div
            aria-hidden="true"
            className="absolute left-[12%] top-[25%] h-36 w-[min(22rem,30%)] rotate-[-5deg] rounded-2xl border border-white/10 bg-[#111215]/40 opacity-30 blur-sm"
          />
          <div
            aria-hidden="true"
            className="absolute right-[13%] top-[35%] h-36 w-[min(22rem,30%)] rotate-[4deg] rounded-2xl border border-white/10 bg-[#111215]/40 opacity-25 blur-sm"
          />
          <div
            aria-hidden="true"
            className="absolute left-[34%] top-[78%] h-36 w-[min(22rem,30%)] rotate-[-2deg] rounded-2xl border border-white/10 bg-[#111215]/35 opacity-20 blur-sm"
          />
          {proofCards.map((card) => (
            <div
              className={`absolute w-[225px] xl:w-[255px] ${card.position}`}
              key={card.name}
            >
              <ProofCard card={card} />
            </div>
          ))}
        </div>
      </div>

      <Link
        className="mx-auto inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-zinc-400 transition-colors hover:text-white"
        href="#evidence"
      >
        EXPLORE PROVENANCE METHODOLOGY
        <ChevronDown aria-hidden="true" className="size-4 animate-bounce" />
      </Link>
      </section>
      <div className="grid min-w-0 grid-cols-1 gap-3 bg-[#08090A] px-4 pb-8 text-left sm:px-6 lg:hidden">
        {proofCards.map((card) => (
          <ProofCard card={card} key={card.name} />
        ))}
      </div>
    </div>
  );
}
