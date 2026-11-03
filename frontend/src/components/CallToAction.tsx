import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate mx-4 my-16 overflow-hidden rounded-3xl border border-[#3F3F46]/80 bg-[#0D0D0F] px-6 py-14 sm:mx-6 sm:px-10 md:my-20 md:px-14 md:py-16 lg:mx-8"
      id="cta-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(ellipse_at_100%_50%,rgba(212,98,26,0.28),transparent_68%)]"
      />
      <div className="relative max-w-2xl">
        <h2
          className="text-3xl font-medium leading-tight tracking-tight text-[#F5F5F5] sm:text-4xl md:text-5xl"
          id="final-cta-title"
        >
          Ready to move beyond{" "}
          <span className="italic text-[#D4621A]">unverified CV claims?</span>
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
          Connect candidate experience with selected repository evidence and
          technical assessments to make job fit more transparent.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#D4621A] px-6 py-3 text-sm font-semibold text-[#18181B] transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735]"
            href="/register"
          >
            Create an account
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#3F3F46] bg-[#19191C]/80 px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition-colors hover:bg-[#252528] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735]"
            href="/pricing"
          >
            <BriefcaseBusiness aria-hidden="true" className="size-4 text-[#A1A1AA]" />
            Explore recruiter plans
          </Link>
        </div>
      </div>
    </section>
  );
}
