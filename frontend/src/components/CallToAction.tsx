import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden border-y border-zinc-800 bg-[#0D0D0F] px-4 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20"
      id="cta-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 flex items-end gap-2 sm:gap-4"
      >
        <span className="h-16 w-5 rounded-t-full bg-gradient-to-t from-[#D4621A]/10 to-[#F28A4D]/50 shadow-[0_0_36px_rgba(212,98,26,0.24)] sm:h-28 sm:w-8" />
        <span className="h-24 w-5 rounded-t-full bg-gradient-to-t from-[#D4621A]/10 to-[#F28A4D]/70 shadow-[0_0_42px_rgba(212,98,26,0.32)] sm:h-40 sm:w-8" />
        <span className="h-32 w-5 rounded-t-full bg-gradient-to-t from-[#D4621A]/15 to-[#FF9A5E]/80 shadow-[0_0_50px_rgba(212,98,26,0.4)] sm:h-52 sm:w-8" />
        <span className="h-20 w-5 rounded-t-full bg-gradient-to-t from-[#D4621A]/10 to-[#F28A4D]/60 shadow-[0_0_40px_rgba(212,98,26,0.28)] sm:h-36 sm:w-8" />
        <span className="h-28 w-5 rounded-t-full bg-gradient-to-t from-[#D4621A]/10 to-[#FF9A5E]/75 shadow-[0_0_46px_rgba(212,98,26,0.36)] sm:h-48 sm:w-8" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2
            className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            id="final-cta-title"
          >
            Ready to move beyond{" "}
            <span className="italic text-[#F28A4D]">unverified CV claims?</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Connect candidate experience with selected repository evidence and
            technical assessments to make job fit more transparent.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#18181B] transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/register"
            >
              Create an account
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/60 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/pricing"
            >
              <BriefcaseBusiness aria-hidden="true" className="size-4" />
              Explore recruiter plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
