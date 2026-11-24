import Link from "next/link";
import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-[#E85D04] pt-7 pb-0 text-white lg:pt-8">
      <div className="mx-auto mb-4 grid max-w-[1440px] grid-cols-1 gap-8 px-4 sm:px-6 lg:mb-5 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-8 lg:px-8">
        <div className="min-w-0">
          <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Let&apos;s design what&apos;s next.
          </h2>
          <Link
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-white/85"
            href="mailto:team@talentgraph.io"
          >
            Contact us
          </Link>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex min-w-0 flex-col items-start space-y-1.5 text-base font-bold"
        >
          <Link className="break-words transition-opacity hover:opacity-75" href="/#about">
            About us
          </Link>
          <Link className="break-words transition-opacity hover:opacity-75" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="break-words transition-opacity hover:opacity-75" href="/terms">
            Legal Notice
          </Link>
          <Link
            className="break-words transition-opacity hover:opacity-75"
            href="mailto:team@talentgraph.io"
          >
            Get in touch
          </Link>
        </nav>

        <div className="grid min-w-0 grid-cols-1 gap-5 text-right sm:grid-cols-2 lg:justify-self-end">
          <address className="flex min-w-0 flex-col space-y-1.5 text-sm not-italic">
            <p className="inline-flex min-w-0 flex-wrap items-center justify-end gap-2 font-bold">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              Dhaka, Bangladesh
            </p>
            <p>+880 1700 000000</p>
            <p>1212 Gulshan</p>
          </address>
          <address className="flex min-w-0 flex-col space-y-1.5 text-sm not-italic">
            <p className="inline-flex min-w-0 flex-wrap items-center justify-end gap-2 font-bold">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              Paris, France
            </p>
            <p>+33 0763858388</p>
            <p>75008 Madeleine</p>
          </address>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="w-full select-none bg-gradient-to-b from-white to-zinc-200 bg-clip-text pt-1 text-center text-[11.5vw] font-black uppercase leading-[0.8] tracking-tighter text-transparent lg:text-[12vw]"
      >
        TALENTGRAPH
      </div>
    </footer>
  );
}
