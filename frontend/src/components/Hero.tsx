import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

const profileCards = [
  {
    name: "Maya Chen",
    role: "Senior iOS Engineer",
    initials: "MC",
    avatar: "from-rose-400 to-orange-300",
    quote: "I build polished apps with SwiftUI and a11y at the core.",
  },
  {
    name: "Ravi Patel",
    role: "Lead Rust Developer",
    initials: "RP",
    avatar: "from-cyan-400 to-blue-500",
    quote: "My systems work is right there in the source and tests.",
  },
  {
    name: "Amara Okafor",
    role: "Staff Product Engineer",
    initials: "AO",
    avatar: "from-violet-400 to-fuchsia-500",
    quote: "I can connect every claim to work I actually shipped.",
  },
  {
    name: "Leo Andersson",
    role: "Platform Engineer",
    initials: "LA",
    avatar: "from-emerald-400 to-teal-500",
    quote: "The evidence reflects how I solve real engineering problems.",
  },
  {
    name: "Sofia Alvarez",
    role: "Machine Learning Engineer",
    initials: "SA",
    avatar: "from-amber-300 to-orange-500",
    quote: "A clear signal is better than another keyword on a CV.",
  },
  {
    name: "Noah Williams",
    role: "Frontend Architect",
    initials: "NW",
    avatar: "from-sky-400 to-indigo-500",
    quote: "Let the quality of the work speak for itself.",
  },
];

function ProfileCard({
  name,
  role,
  initials,
  avatar,
  quote,
}: (typeof profileCards)[number]) {
  return (
    <article className="min-w-0 rounded-xl border border-zinc-800 bg-[#121215]/90 p-3 text-left text-xs shadow-xl backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatar} text-[10px] font-bold text-white ring-2 ring-white/10`}
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-zinc-100">{name}</p>
          <p className="truncate text-[10px] text-zinc-400">{role}</p>
        </div>
        <BadgeCheck
          aria-label="Verified profile"
          className="size-4 shrink-0 text-emerald-400"
        />
      </div>
      <p className="mt-2 leading-relaxed text-zinc-300">&ldquo;{quote}&rdquo;</p>
    </article>
  );
}

export function Hero() {
  const leftCards = profileCards.slice(0, 3);
  const rightCards = profileCards.slice(3);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col items-center overflow-hidden border-b border-zinc-800 bg-[#0D0D0F] px-3 py-12 text-center sm:px-6 sm:py-16"
      id="about"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_42%,rgba(212,98,26,0.14),transparent_58%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-8">
        <div
          aria-label="Three illustrative verified candidate profiles"
          className="order-2 grid grid-cols-1 gap-2 text-left sm:grid-cols-3 lg:order-none lg:grid-cols-1 lg:gap-4"
        >
          {leftCards.map((card) => (
            <ProfileCard key={card.name} {...card} />
          ))}
        </div>

        <div className="order-1 mx-auto flex w-full max-w-3xl flex-col items-center lg:order-none">
          <p className="mb-4 inline-flex max-w-full items-center rounded-full border border-[#D4621A]/30 bg-[#D4621A]/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#F0A374] sm:mb-6 sm:px-3.5 sm:text-xs">
            Evidence-based technical recruitment
          </p>

          <h1
            className="text-[clamp(2rem,8vw,3rem)] font-medium leading-tight tracking-tight text-[#F5F5F5] sm:text-5xl md:text-6xl md:leading-[1.12]"
            id="hero-title"
          >
            Don&apos;t just claim a skill.{" "}
            <span className="font-normal italic text-[#D4621A]">Prove it.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#A1A1AA] sm:mt-6 sm:text-base md:text-lg">
            TalentGraph connects candidate claims with CV, selected GitHub
            repositories, and technical assessment evidence—delivering
            transparent, verifiable job fit without black-box scores.
          </p>

          <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
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
        </div>

        <div
          aria-label="Three illustrative verified candidate profiles"
          className="order-3 grid grid-cols-1 gap-2 text-left sm:grid-cols-3 lg:order-none lg:grid-cols-1 lg:gap-4"
        >
          {rightCards.map((card) => (
            <ProfileCard key={card.name} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
