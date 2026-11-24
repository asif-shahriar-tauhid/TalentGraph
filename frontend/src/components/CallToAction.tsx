import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="bg-[#0B0C0E] px-4 pt-4 pb-5 sm:px-6 lg:px-8 lg:pt-5 lg:pb-6"
      id="cta-section"
    >
      <div className="relative isolate mx-auto min-w-0 max-w-[1440px] overflow-hidden rounded-2xl border border-white/10 bg-[#090A0C] px-7 py-6 lg:px-10 lg:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 flex items-stretch gap-2 overflow-hidden sm:gap-4"
        >
          <span className="w-10 rounded-xl bg-gradient-to-r from-transparent via-[#9A4215]/45 to-[#D96B27]/90 sm:w-16" />
          <span className="w-14 rounded-xl bg-gradient-to-r from-transparent via-[#9A4215]/45 to-[#D96B27]/90 sm:w-24" />
          <span className="w-20 rounded-xl bg-gradient-to-r from-transparent via-[#9A4215]/45 to-[#D96B27]/90 sm:w-36" />
          <span className="w-28 rounded-xl bg-gradient-to-r from-transparent via-[#9A4215]/45 to-[#D96B27]/90 sm:w-48" />
          <span className="w-36 rounded-xl bg-gradient-to-r from-transparent via-[#9A4215]/45 to-[#D96B27]/90 sm:w-64" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2
            className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-white lg:text-[38px]"
            id="final-cta-title"
          >
            Ready to move beyond
            <span className="block font-serif italic text-[#FDBA74]">
              unverified CV claims?
            </span>
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-300 lg:text-[15px]">
            Join engineering leaders and software developers relying on
            verifiable commits, AST syntax analysis, and grounded technical
            proof without black-box scores.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F97316] px-6 py-3 text-base font-semibold text-[#17120F] shadow-lg shadow-[#F97316]/25 transition-colors hover:bg-[#FB923C]"
              href="/register"
            >
              Create Candidate Account
              <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#121417] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1A1D22]"
              href="/pricing"
            >
              <BriefcaseBusiness aria-hidden="true" className="size-5 shrink-0" />
              Post Verified Jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
