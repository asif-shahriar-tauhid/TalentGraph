import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full overflow-hidden bg-[#D4621A] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:gap-12">
          <div className="min-w-0">
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Let&apos;s design what&apos;s next.
            </h2>
            <Link
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#18181B] transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="mailto:team@talentgraph.io"
            >
              Contact us
            </Link>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 content-start gap-x-6 gap-y-4 text-sm font-medium"
          >
            <Link
              className="transition-colors hover:text-white/75 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/#about"
            >
              About us
            </Link>
            <Link
              className="transition-colors hover:text-white/75 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="transition-colors hover:text-white/75 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/terms"
            >
              Legal Notice
            </Link>
            <Link
              className="inline-flex items-center gap-1 transition-colors hover:text-white/75 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="mailto:team@talentgraph.io"
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </nav>

          <address className="flex min-w-0 flex-col gap-3 text-sm not-italic">
            <p className="inline-flex items-center gap-2 font-semibold">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              Dhaka, Bangladesh
            </p>
          </address>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="w-full overflow-hidden px-1 text-center text-5xl font-black uppercase leading-none tracking-tighter text-white sm:px-4 sm:text-8xl md:text-[120px]"
      >
        TALENTGRAPH
      </div>

      <div className="mt-6 border-t border-white/25 px-4 py-4 text-center text-xs text-white/85 sm:px-6 lg:px-8">
        © {currentYear} TalentGraph. All rights reserved.
      </div>
    </footer>
  );
}
