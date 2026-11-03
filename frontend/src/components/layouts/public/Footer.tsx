import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-[#D4621A]/30 bg-[#0D0D0F] pb-0 pt-10 text-[#F5F5F5] sm:pt-12">
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Let’s design what’s next.
            </h2>
            <Link
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D4621A] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#18181B] transition-colors hover:bg-[#E47735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E47735]"
              href="mailto:team@talentgraph.io"
            >
              <Mail aria-hidden="true" className="size-4" />
              Contact us
            </Link>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start gap-3 text-sm font-medium md:col-span-3 lg:col-span-4"
          >
            <Link
              className="transition-colors hover:text-[#E47735]"
              href="/#about"
            >
              About us
            </Link>
            <Link
              className="transition-colors hover:text-[#E47735]"
              href="/privacy"
            >
              Privacy policy
            </Link>
            <Link
              className="transition-colors hover:text-[#E47735]"
              href="/terms"
            >
              Legal notice
            </Link>
            <Link
              className="inline-flex items-center gap-1 transition-colors hover:text-[#E47735]"
              href="mailto:team@talentgraph.io"
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm text-[#A1A1AA] md:col-span-3 md:text-right">
            <Link
              className="font-semibold text-[#F5F5F5] transition-colors hover:text-[#E47735]"
              href="/"
            >
              TalentGraph
            </Link>
            <p>Evidence-grounded technical recruitment.</p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mt-4 select-none overflow-hidden text-center text-[15.5vw] font-black uppercase leading-[0.74] tracking-tighter text-[#F5F5F5]/10"
      >
        TalentGraph
      </div>
      <div className="relative z-10 border-t border-[#3F3F46]/70 px-4 py-4 text-center text-xs text-[#A1A1AA] sm:px-6 lg:px-8">
        © {currentYear} TalentGraph. All rights reserved.
      </div>
    </footer>
  );
}
