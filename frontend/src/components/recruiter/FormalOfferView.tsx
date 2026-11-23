"use client";

import {
  BadgeCheck,
  Bookmark,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Code2,
  FileCheck2,
  FileDown,
  Fingerprint,
  Flag,
  LockKeyhole,
  MapPin,
  MoreVertical,
  Search,
  Send,
  ShieldCheck,
  Timer,
  TrendingUp,
  Upload,
  UserRound,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useState } from "react";

interface FormalOfferViewProps {
  jobId?: string;
}

const panelClass =
  "min-w-0 rounded-xl border border-[#1F242D] bg-[#121417]";
const insetClass =
  "min-w-0 rounded-lg border border-[#1F242D] bg-[#171A1F]";
const monoClass = "font-mono [font-variant-numeric:tabular-nums]";

function getAmount(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}

function formatBdt(amount: number) {
  return `৳${new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount))}`;
}

function createPdf(lines: string[]) {
  const printableLines = lines.map((line) =>
    line
      .replace(/৳/g, "BDT ")
      .replace(/—/g, "-")
      .replace(/·/g, "|")
      .replace(/[^\x20-\x7E]/g, " ")
      .replace(/([\\()])/g, "\\$1"),
  );
  const stream = [
    "BT",
    "/F1 10 Tf",
    "50 780 Td",
    "14 TL",
    ...printableLines.map((line) => `(${line}) Tj\nT*`),
    "ET",
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  let document = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(document.length);
    document += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const crossReferenceOffset = document.length;
  document += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index < offsets.length; index += 1) {
    document += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${crossReferenceOffset}\n%%EOF`;
  return new Blob([document], { type: "application/pdf" });
}

export default function FormalOfferView({ jobId }: FormalOfferViewProps) {
  const [search, setSearch] = useState("");
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [monthlyBaseDraft, setMonthlyBaseDraft] = useState("0");
  const [festivalBonusesDraft, setFestivalBonusesDraft] = useState("0");
  const [stewardshipDraft, setStewardshipDraft] = useState("0");
  const [esopUnitsDraft, setEsopUnitsDraft] = useState("0");
  const [grantValueDraft, setGrantValueDraft] = useState("0");
  const [cliffMonthsDraft, setCliffMonthsDraft] = useState("0");
  const [expectedStartDate, setExpectedStartDate] = useState("");
  const [offerExpiryDate, setOfferExpiryDate] = useState("");
  const [workArrangement, setWorkArrangement] = useState("");
  const [probationPeriod, setProbationPeriod] = useState("");
  const [actionFeedback, setActionFeedback] = useState("");

  const monthlyBase = getAmount(monthlyBaseDraft);
  const annualFestivalBonuses = getAmount(festivalBonusesDraft);
  const monthlyStewardship = getAmount(stewardshipDraft);
  const esopUnits = Math.floor(getAmount(esopUnitsDraft));
  const cliffMonths = Math.floor(getAmount(cliffMonthsDraft));
  const probationMonths = getAmount(probationPeriod);
  const annualBase = monthlyBase * 12;
  const annualStewardship = monthlyStewardship * 12;
  const annualTotal =
    annualBase + annualFestivalBonuses + annualStewardship;
  const monthlyAverage = annualTotal / 12;
  const baseRatio = annualTotal ? (annualBase / annualTotal) * 100 : 0;
  const festivalRatio = annualTotal
    ? (annualFestivalBonuses / annualTotal) * 100
    : 0;
  const stewardshipRatio = annualTotal
    ? (annualStewardship / annualTotal) * 100
    : 0;

  const offerLines = [
    "TalentGraph Formal Offer Draft",
    `Requisition: ${jobId || "Unassigned"}`,
    "Candidate: No Candidate Selected",
    `Total Guaranteed Annual Cash: ${formatBdt(annualTotal)} BDT / year`,
    `Monthly Gross Base Salary: ${formatBdt(monthlyBase)} / mo`,
    `Annual Festival Bonuses: ${formatBdt(annualFestivalBonuses)} / yr`,
    `Technical Stewardship Allowance: ${formatBdt(monthlyStewardship)} / mo`,
    `ESOP Units: ${esopUnits}`,
    `Estimated Grant Value: ${formatBdt(getAmount(grantValueDraft))}`,
    `Expected Start Date: ${expectedStartDate || "Not Set"}`,
    `Offer Validity Expiry: ${offerExpiryDate || "-"}`,
    `Work Arrangement: ${workArrangement || "Unassigned"}`,
    `Probation Period: ${probationMonths ? `${probationMonths} months` : "Not Configured"}`,
    "Governance: 0-of-5 Mandatory Sign-offs Confirmed",
  ];

  const downloadOfferPack = () => {
    const url = URL.createObjectURL(createPdf(offerLines));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "formal-offer-draft.pdf";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setActionFeedback("Zero-data formal offer draft pack downloaded.");
  };

  const saveDraft = () => {
    try {
      window.localStorage.setItem(
        `talentgraph-formal-offer-draft-${jobId || "unassigned"}`,
        JSON.stringify({
          monthlyBaseDraft,
          festivalBonusesDraft,
          stewardshipDraft,
          esopUnitsDraft,
          grantValueDraft,
          cliffMonthsDraft,
          expectedStartDate,
          offerExpiryDate,
          workArrangement,
          probationPeriod,
        }),
      );
      setActionFeedback("Offer draft saved locally on this device.");
    } catch (error: unknown) {
      const details =
        error instanceof Error ? ` ${error.message}` : " Please try again.";
      setActionFeedback(`Could not save the offer draft.${details}`);
    }
  };

  const showRequisitionDetails = () => {
    setMoreOptionsOpen(false);
    setActionFeedback(
      jobId
        ? `Requisition ${jobId} has no loaded role or candidate data.`
        : "No requisition is assigned to this offer draft.",
    );
  };

  return (
    <div className="min-w-0 space-y-5 bg-[#0B0C0E] text-[#D4D4D8]">
      <header className="grid min-w-0 grid-cols-1 gap-4 border-b border-[#1F242D] pb-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
        <div className="min-w-0">
          <nav
            aria-label="Breadcrumb"
            className={`${monoClass} flex min-w-0 flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#71717A]`}
          >
            <span>RECRUITER</span>
            <span aria-hidden="true" className="text-[#3A3A42]">/</span>
            <span>JOBS</span>
            <span aria-hidden="true" className="text-[#3A3A42]">/</span>
            <span className="break-words font-semibold text-white">
              #UNASSIGNED
            </span>
            <span aria-hidden="true" className="text-[#3A3A42]">/</span>
            <span>PIPELINE</span>
            <span aria-hidden="true" className="text-[#3A3A42]">/</span>
            <span className="break-words font-semibold text-[#F97316]">
              FINAL DECISION &amp; FORMAL OFFER
            </span>
          </nav>
          <h1 className="mt-1 break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
            Formal offer formulation
          </h1>
          <p className="mt-1 max-w-3xl break-words text-xs leading-relaxed text-[#71717A] sm:text-[13px]">
            Review compensation structures, statutory compliance, and
            cryptographic governance sign-offs before dispatch.
          </p>
        </div>
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 xl:flex xl:flex-nowrap">
          <label className="relative min-w-0 xl:w-64 xl:flex-none">
            <Search
              aria-hidden="true"
              className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#71717A]"
            />
            <input
              aria-label="Search candidate artifacts"
              className="h-9 w-full min-w-0 rounded-lg border border-[#1F242D] bg-[#121417] py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search candidate artifacts..."
              type="search"
              value={search}
            />
          </label>
          <button
            aria-label="Export formal offer draft"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#1F242D] bg-[#121417] text-[#A1A1AA] transition-colors hover:bg-[#1A1E24] hover:text-white"
            onClick={downloadOfferPack}
            type="button"
          >
            <Upload aria-hidden="true" className="size-4" />
          </button>
          <div className="relative">
            <button
              aria-expanded={moreOptionsOpen}
              aria-label="More offer options"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#1F242D] bg-[#121417] text-[#A1A1AA] transition-colors hover:bg-[#1A1E24] hover:text-white"
              onClick={() => setMoreOptionsOpen((open) => !open)}
              type="button"
            >
              <MoreVertical aria-hidden="true" className="size-4" />
            </button>
            {moreOptionsOpen && (
              <div className="absolute right-0 top-11 z-10 min-w-48 rounded-lg border border-[#1F242D] bg-[#121417] p-1 shadow-xl">
                <button
                  className="w-full rounded px-3 py-2 text-left text-xs text-[#D4D4D8] hover:bg-[#1A1E24]"
                  onClick={showRequisitionDetails}
                  type="button"
                >
                  View requisition details
                </button>
              </div>
            )}
            {search.trim() && (
              <p className="break-words text-xs text-[#71717A]" role="status">
                No candidate artifacts match “{search.trim()}”.
              </p>
            )}
          </div>
        </div>
      </header>

      {actionFeedback && (
        <div
          className="min-w-0 break-words rounded-lg border border-[#303640] bg-[#121417] px-3 py-2 text-xs text-[#D4D4D8]"
          role="status"
        >
          {actionFeedback}
        </div>
      )}

      <section
        aria-label="Requisition status and pipeline"
        className="min-w-0 rounded-lg border border-[#1F242D] bg-[#121417] p-3 sm:p-4"
      >
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-[#1F242D] pb-3">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
            <span className={`${monoClass} rounded bg-[#1A1E24] px-2 py-1 text-white`}>
              REQ: {jobId || "Unassigned"}
            </span>
            <span className="text-[#52525B]">•</span>
            <span className="break-words font-medium text-[#D4D4D8]">
              No Active Role Selected
            </span>
            <span className="text-[#52525B]">•</span>
            <span className="break-words text-[#A1A1AA]">
              Department / Unit Unassigned
            </span>
          </div>
          <span className="inline-flex max-w-full items-center gap-1.5 rounded border border-[#44301B] bg-[#2C2114] px-2 py-1 text-[10px] font-medium text-[#E5933A]">
            <Clock3 aria-hidden="true" className="size-3 shrink-0" />
            <span className="break-words">Stage 4 Awaiting Candidate</span>
          </span>
        </div>

        <div className="mt-3 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              stage: "STAGE 1: Technical Screening",
              detail: "Pending",
              icon: ShieldCheck,
              style: "border-[#1F242D] bg-[#0F1114] text-[#A1A1AA]",
            },
            {
              stage: "STAGE 2: DETERMINISTIC",
              detail: "0.0%",
              icon: Code2,
              style: "border-[#1F242D] bg-[#0F1114] text-[#A1A1AA]",
            },
            {
              stage: "STAGE 3: ASSESSMENT",
              detail: "0/100 · 0/0 Biometrics",
              icon: Fingerprint,
              style: "border-[#1F242D] bg-[#0F1114] text-[#A1A1AA]",
            },
            {
              stage: "STAGE 4: ACTIVE",
              detail: "Formal Offer Formulation",
              icon: FileCheck2,
              style: "border-[#F97316]/50 bg-[#F97316]/10 text-[#F97316]",
            },
          ].map(({ stage, detail, icon: Icon, style }, index) => (
            <div
              className={`flex min-w-0 items-center gap-2.5 rounded-md border p-2 ${style}`}
              key={stage}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${
                  index === 3
                    ? "border-[#F97316]/50 bg-[#F97316] text-white"
                    : "border-[#303640] bg-[#171A1F] text-[#71717A]"
                }`}
              >
                <Icon aria-hidden="true" className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="break-words text-[10px] font-mono uppercase leading-snug">
                  {stage}
                </p>
                <p className="mt-0.5 break-words text-xs font-medium text-white">
                  {detail}
                </p>
              </div>
              <span
                className={`${monoClass} max-w-24 shrink-0 break-words rounded border border-[#303640] bg-[#171A1F] px-1.5 py-0.5 text-center text-[9px] text-[#A1A1AA]`}
              >
                {index === 3 ? "Awaiting Draft" : index === 0 ? "Pending" : detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Candidate and metric summary"
        className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <article className={`${panelClass} flex flex-col justify-between gap-3 p-4`}>
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-xs font-bold text-[#F97316]">
              --
            </div>
            <div className="min-w-0">
              <h2 className="break-words text-sm font-bold text-white">
                No Candidate Selected
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-[#71717A]">
                <MapPin aria-hidden="true" className="size-3 shrink-0" />
                <span>Location: —</span>
                <span aria-hidden="true">·</span>
                <span>Work mode: —</span>
              </p>
            </div>
          </div>
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-[#1F242D] pt-2.5">
            <span className="text-[11px] text-[#71717A]">Standing</span>
            <span className="rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#A1A1AA]">
              Standing: Unranked
            </span>
          </div>
        </article>
        <article className={`${panelClass} flex flex-col justify-between gap-2 p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-[#A1A1AA]">Deterministic match</span>
            <span className="rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#A1A1AA]">
              No Score
            </span>
          </div>
          <p className={`${monoClass} break-words text-2xl font-bold text-white`}>
            0.00 <span className="text-xs font-normal text-[#71717A]">/ 100</span>
          </p>
          <p className="text-[11px] text-[#71717A]">Weights sum 0%</p>
        </article>
        <article className={`${panelClass} flex flex-col justify-between gap-2 p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-[#A1A1AA]">Code volume</span>
            <span className="rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#A1A1AA]">
              Awaiting provenance
            </span>
          </div>
          <p className={`${monoClass} break-words text-2xl font-bold text-white`}>
            0 <span className="text-xs font-normal text-[#71717A]">lines</span>
          </p>
          <p className="text-[11px] text-[#71717A]">0 audited repos</p>
        </article>
        <article className={`${panelClass} flex flex-col justify-between gap-2 p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-[#A1A1AA]">Biometric exam</span>
            <span className="rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#A1A1AA]">
              0 anomalies
            </span>
          </div>
          <p className={`${monoClass} break-words text-2xl font-bold text-white`}>
            0 <span className="text-xs font-normal text-[#71717A]">/ 100</span>
          </p>
          <p className="text-[11px] text-[#71717A]">0 anomalies</p>
        </article>
      </section>

      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-8">
          <section className={`${panelClass} flex flex-col gap-4 p-4 sm:p-5`}>
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-[#1F242D] pb-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Wallet aria-hidden="true" className="size-5 shrink-0 text-[#F97316]" />
                <div className="min-w-0">
                  <h2 className="break-words text-sm font-bold text-white">
                    Compensation Structure (BDT)
                  </h2>
                  <p className="mt-1 break-words text-[11px] text-[#71717A]">
                    Bangladeshi Taka (৳ BDT) · Compensation details are not configured.
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-400">
                  <BadgeCheck aria-hidden="true" className="size-3.5" />
                  Pre-approved Bracket
                </span>
                <button
                  aria-expanded={calculatorOpen}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded border border-[#303640] bg-[#171A1F] px-2.5 py-1 text-[10px] text-[#D4D4D8] transition-colors hover:border-[#F97316]/50"
                  onClick={() => setCalculatorOpen((open) => !open)}
                  type="button"
                >
                  <CircleDollarSign aria-hidden="true" className="size-3.5" />
                  {calculatorOpen ? "Close Draft Calculator" : "Open Draft Calculator"}
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-3 transition-transform ${calculatorOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>

            <div className={`${insetClass} flex min-w-0 flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center`}>
              <div className="min-w-0">
                <span className={`${monoClass} break-words text-[10px] uppercase tracking-wider text-[#71717A]`}>
                  Total Guaranteed Annual Cash
                </span>
                <div className="mt-1 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className={`${monoClass} break-words text-2xl font-bold tracking-tight text-white sm:text-[28px]`}>
                    {formatBdt(annualTotal)}
                  </span>
                  <span className={`${monoClass} text-xs text-[#71717A]`}>
                    BDT / year
                  </span>
                </div>
                <p className="mt-1 break-words text-[11px] text-[#71717A]">
                  Net approximate monthly take-home with statutory deductions:{" "}
                  {formatBdt(monthlyAverage)} / mo
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-1 sm:items-end">
                <span className={`${monoClass} break-words rounded border border-[#F97316]/30 bg-[#F97316]/10 px-3 py-1 text-xs font-semibold text-[#F97316]`}>
                  {formatBdt(monthlyAverage)} / mo avg
                </span>
                <span className="break-words text-[10px] text-[#71717A]">
                  Includes configured festival distributions
                </span>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2 pt-1">
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 text-[11px] text-[#71717A]">
                <span className="font-medium text-[#A1A1AA]">
                  Annual Composition Ratio
                </span>
                <span className={`${monoClass} break-words`}>
                  Base ({baseRatio.toFixed(0)}%) • Festival ({festivalRatio.toFixed(0)}%) •
                  Stewardship ({stewardshipRatio.toFixed(0)}%)
                </span>
              </div>
              <div
                aria-label={`Annual composition: Base ${baseRatio.toFixed(0)}%, Festival ${festivalRatio.toFixed(0)}%, Stewardship ${stewardshipRatio.toFixed(0)}%`}
                className="flex h-2.5 min-w-0 overflow-hidden rounded-full bg-[#1F242D]"
                role="img"
              >
                <div
                  className="h-full bg-[#F97316]"
                  style={{ width: `${baseRatio}%` }}
                />
                <div
                  className="h-full bg-cyan-500"
                  style={{ width: `${festivalRatio}%` }}
                />
                <div
                  className="h-full bg-emerald-400"
                  style={{ width: `${stewardshipRatio}%` }}
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2 pt-1">
              <div className={`${insetClass} flex min-w-0 flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between`}>
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-[#F97316]" />
                  <div className="min-w-0">
                    <p className="break-words text-[13px] font-semibold text-white">
                      Monthly Gross Base Salary
                    </p>
                    <p className="mt-1 break-words text-[11px] text-[#71717A]">
                      Paid monthly via institutional bank transfer
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:justify-end">
                  {calculatorOpen && (
                    <label className="flex min-w-0 items-center gap-1 text-[10px] text-[#71717A]">
                      <span>BDT / mo</span>
                      <input
                        aria-label="Monthly gross base salary"
                        className={`${monoClass} h-8 w-28 rounded border border-[#303640] bg-[#0B0C0E] px-2 text-right text-xs text-white focus:border-[#F97316] focus:outline-none`}
                        min="0"
                        onChange={(event) => setMonthlyBaseDraft(event.target.value)}
                        step="1000"
                        type="number"
                        value={monthlyBaseDraft}
                      />
                    </label>
                  )}
                  <div className={`${monoClass} min-w-0 text-right text-xs font-bold text-white`}>
                    <p className="break-words">
                      {formatBdt(monthlyBase)}{" "}
                      <span className="text-[10px] font-normal text-[#71717A]">/ mo</span>
                    </p>
                    <p className="mt-1 break-words text-[10px] font-normal text-[#71717A]">
                      {formatBdt(annualBase)} / yr
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${insetClass} flex min-w-0 flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between`}>
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-cyan-500" />
                  <div className="min-w-0">
                    <p className="break-words text-[13px] font-semibold text-white">
                      Annual Festival Bonuses (2x)
                    </p>
                    <p className="mt-1 break-words text-[11px] text-[#71717A]">
                      Festival distributions are not configured
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:justify-end">
                  {calculatorOpen && (
                    <label className="flex min-w-0 items-center gap-1 text-[10px] text-[#71717A]">
                      <span>BDT / yr</span>
                      <input
                        aria-label="Annual festival bonuses"
                        className={`${monoClass} h-8 w-28 rounded border border-[#303640] bg-[#0B0C0E] px-2 text-right text-xs text-white focus:border-[#F97316] focus:outline-none`}
                        min="0"
                        onChange={(event) =>
                          setFestivalBonusesDraft(event.target.value)
                        }
                        step="1000"
                        type="number"
                        value={festivalBonusesDraft}
                      />
                    </label>
                  )}
                  <div className={`${monoClass} min-w-0 text-right text-xs font-bold text-white`}>
                    <p className="break-words">
                      {formatBdt(annualFestivalBonuses / 12)}{" "}
                      <span className="text-[10px] font-normal text-[#71717A]">/ mo</span>
                    </p>
                    <p className="mt-1 break-words text-[10px] font-normal text-[#71717A]">
                      {formatBdt(annualFestivalBonuses)} / yr
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${insetClass} flex min-w-0 flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between`}>
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-emerald-400" />
                  <div className="min-w-0">
                    <p className="break-words text-[13px] font-semibold text-white">
                      Technical Stewardship &amp; Architecture Allowance
                    </p>
                    <p className="mt-1 break-words text-[11px] text-[#71717A]">
                      Technical leadership allowance not configured
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:justify-end">
                  {calculatorOpen && (
                    <label className="flex min-w-0 items-center gap-1 text-[10px] text-[#71717A]">
                      <span>BDT / mo</span>
                      <input
                        aria-label="Monthly technical stewardship allowance"
                        className={`${monoClass} h-8 w-28 rounded border border-[#303640] bg-[#0B0C0E] px-2 text-right text-xs text-white focus:border-[#F97316] focus:outline-none`}
                        min="0"
                        onChange={(event) => setStewardshipDraft(event.target.value)}
                        step="1000"
                        type="number"
                        value={stewardshipDraft}
                      />
                    </label>
                  )}
                  <div className={`${monoClass} min-w-0 text-right text-xs font-bold text-white`}>
                    <p className="break-words">
                      {formatBdt(monthlyStewardship)}{" "}
                      <span className="text-[10px] font-normal text-[#71717A]">/ mo</span>
                    </p>
                    <p className="mt-1 break-words text-[10px] font-normal text-[#71717A]">
                      {formatBdt(annualStewardship)} / yr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`${panelClass} flex flex-col gap-4 p-4 sm:p-5`}>
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <TrendingUp aria-hidden="true" className="size-5 shrink-0 text-[#F97316]" />
                <div className="min-w-0">
                  <h2 className="break-words text-sm font-bold text-white">
                    ESOP &amp; Long-Term Equity Incentive
                  </h2>
                  <p className="mt-1 break-words text-[11px] text-[#71717A]">
                    Series A Employee Stock Option Pool (Unassigned HoldCo)
                  </p>
                </div>
              </div>
              <span className={`${monoClass} rounded border border-[#303640] bg-[#1A1E24] px-2 py-1 text-[10px] text-[#A1A1AA]`}>
                Class B Ordinary
              </span>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
              <div className={`${insetClass} flex min-w-0 flex-col gap-1 p-3`}>
                <span className="break-words text-[11px] text-[#71717A]">
                  Total ESOP Pool Grant
                </span>
                {calculatorOpen ? (
                  <input
                    aria-label="Total ESOP pool grant"
                    className={`${monoClass} h-9 min-w-0 rounded border border-[#303640] bg-[#0B0C0E] px-2 text-lg font-bold text-white focus:border-[#F97316] focus:outline-none`}
                    min="0"
                    onChange={(event) => setEsopUnitsDraft(event.target.value)}
                    step="1"
                    type="number"
                    value={esopUnitsDraft}
                  />
                ) : (
                  <span className={`${monoClass} break-words text-xl font-bold text-white`}>
                    {esopUnits}
                  </span>
                )}
                <span className="break-words text-[11px] text-[#71717A]">
                  Option Units (0.000%)
                </span>
              </div>
              <div className={`${insetClass} flex min-w-0 flex-col gap-1 p-3`}>
                <span className="break-words text-[11px] text-[#71717A]">
                  Estimated Grant Value
                </span>
                {calculatorOpen ? (
                  <label className="flex min-w-0 items-center gap-1">
                    <span className={`${monoClass} text-sm text-[#E5933A]`}>৳</span>
                    <input
                      aria-label="Estimated ESOP grant value in BDT"
                      className={`${monoClass} h-9 min-w-0 w-full rounded border border-[#303640] bg-[#0B0C0E] px-2 text-lg font-bold text-[#E5933A] focus:border-[#F97316] focus:outline-none`}
                      min="0"
                      onChange={(event) => setGrantValueDraft(event.target.value)}
                      step="1000"
                      type="number"
                      value={grantValueDraft}
                    />
                  </label>
                ) : (
                  <span className={`${monoClass} break-words text-xl font-bold text-[#E5933A]`}>
                    {formatBdt(getAmount(grantValueDraft))}
                  </span>
                )}
                <span className="break-words text-[11px] text-[#71717A]">
                  Valuation not configured
                </span>
              </div>
              <div className={`${insetClass} flex min-w-0 flex-col gap-1 p-3`}>
                <span className="break-words text-[11px] text-[#71717A]">
                  Cliff Period
                </span>
                {calculatorOpen ? (
                  <input
                    aria-label="ESOP cliff period in months"
                    className={`${monoClass} h-9 min-w-0 rounded border border-[#303640] bg-[#0B0C0E] px-2 text-lg font-bold text-emerald-400 focus:border-[#F97316] focus:outline-none`}
                    min="0"
                    onChange={(event) => setCliffMonthsDraft(event.target.value)}
                    step="1"
                    type="number"
                    value={cliffMonthsDraft}
                  />
                ) : (
                  <span className={`${monoClass} break-words text-xl font-bold text-emerald-400`}>
                    {cliffMonths} Months
                  </span>
                )}
                <span className="break-words text-[11px] text-[#71717A]">
                  Cliff terms not configured
                </span>
              </div>
            </div>

            <div className={`${insetClass} flex min-w-0 flex-col gap-4 p-4`}>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                <span className="break-words text-xs font-semibold text-white">
                  Standard 4-Year Linear Vesting Schedule
                </span>
                <span className="max-w-full break-words rounded border border-[#44301B] bg-[#2C2114] px-2 py-1 text-[10px] font-medium text-[#E5933A]">
                  Single-Trigger 50% Acceleration on M&amp;A
                </span>
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    year: "Yr 1 Cliff",
                    vesting: "25%",
                    textColor: "text-[#F97316]",
                    dotColor: "bg-[#F97316]",
                  },
                  {
                    year: "Yr 2",
                    vesting: "50%",
                    textColor: "text-[#A1A1AA]",
                    dotColor: "bg-[#71717A]",
                  },
                  {
                    year: "Yr 3",
                    vesting: "75%",
                    textColor: "text-[#A1A1AA]",
                    dotColor: "bg-[#71717A]",
                  },
                  {
                    year: "Yr 4",
                    vesting: "100%",
                    textColor: "text-emerald-400",
                    dotColor: "bg-emerald-400",
                  },
                ].map(({ year, vesting, textColor, dotColor }) => (
                  <div className="flex min-w-0 flex-col items-center gap-2" key={year}>
                    <span className="h-1 w-full rounded-full bg-[#303640]" />
                    <span className={`size-3.5 shrink-0 rounded-full border-2 border-[#171A1F] ${dotColor}`} />
                    <span className={`${monoClass} break-words text-center text-[10px] ${textColor}`}>
                      {year} ({vesting})
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid min-w-0 grid-cols-1 gap-2 border-t border-[#1F242D] pt-3 text-[11px] text-[#A1A1AA] sm:grid-cols-2">
                <div className="flex min-w-0 items-start gap-1.5">
                  <Timer aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-[#71717A]" />
                  <span className="min-w-0 break-words">
                    Post-Termination Exercise: <strong className="text-white">—</strong>
                  </span>
                </div>
                <div className="flex min-w-0 items-start gap-1.5">
                  <Clock3 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-[#71717A]" />
                  <span className="min-w-0 break-words">
                    Monthly Accrual:{" "}
                    <strong className={`${monoClass} text-white`}>0 units / mo</strong>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className={`${panelClass} flex flex-col gap-4 p-4 sm:p-5`}>
            <div className="flex min-w-0 items-start gap-2.5 border-b border-[#1F242D] pb-3">
              <Building2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#F97316]" />
              <div className="min-w-0">
                <h2 className="break-words text-sm font-bold text-white">
                  Statutory Contract Terms &amp; Conditions
                </h2>
                <p className="mt-1 break-words text-[11px] text-[#71717A]">
                  Bangladesh Labor Act 2006 compliant customized tech covenant
                </p>
              </div>
            </div>
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex min-w-0 flex-col gap-1.5">
                <span className="break-words text-xs font-medium text-[#D4D4D8]">
                  Expected Start Date
                </span>
                <span className="relative min-w-0">
                  <input
                    aria-label="Expected start date"
                    className={`${monoClass} h-9 w-full min-w-0 rounded-lg border border-[#1F242D] bg-[#0B0C0E] px-3 pr-9 text-xs text-white focus:border-[#F97316] focus:outline-none`}
                    onChange={(event) => setExpectedStartDate(event.target.value)}
                    type="date"
                    value={expectedStartDate}
                  />
                  <CalendarDays
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#71717A]"
                  />
                </span>
                <span className="break-words text-[10px] text-[#71717A]">
                  {expectedStartDate || "Not Set"}
                </span>
              </label>
              <label className="flex min-w-0 flex-col gap-1.5">
                <span className="break-words text-xs font-medium text-[#D4D4D8]">
                  Offer Validity Expiry
                </span>
                <span className="relative min-w-0">
                  <input
                    aria-label="Offer validity expiry"
                    className={`${monoClass} h-9 w-full min-w-0 rounded-lg border border-[#1F242D] bg-[#0B0C0E] px-3 pr-9 text-xs text-white focus:border-[#F97316] focus:outline-none`}
                    onChange={(event) => setOfferExpiryDate(event.target.value)}
                    type="date"
                    value={offerExpiryDate}
                  />
                  <CalendarDays
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#71717A]"
                  />
                </span>
                <span className="break-words text-[10px] text-[#71717A]">
                  {offerExpiryDate || "—"}
                </span>
              </label>
              <label className="flex min-w-0 flex-col gap-1.5">
                <span className="break-words text-xs font-medium text-[#D4D4D8]">
                  Work Arrangement &amp; Location
                </span>
                <span className="flex min-w-0 items-center gap-2 rounded-lg border border-[#1F242D] bg-[#0B0C0E] px-3 py-2">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-[#F97316]" />
                  <select
                    aria-label="Work arrangement and location"
                    className="min-w-0 flex-1 bg-transparent text-xs text-white focus:outline-none"
                    onChange={(event) => setWorkArrangement(event.target.value)}
                    value={workArrangement}
                  >
                    <option className="bg-[#121417]" value="">
                      Unassigned
                    </option>
                    <option className="bg-[#121417]" value="On-site">
                      On-site
                    </option>
                    <option className="bg-[#121417]" value="Hybrid">
                      Hybrid
                    </option>
                    <option className="bg-[#121417]" value="Remote">
                      Remote
                    </option>
                  </select>
                </span>
                <span className="break-words text-[10px] text-[#71717A]">
                  Location details not configured
                </span>
              </label>
              <label className="flex min-w-0 flex-col gap-1.5">
                <span className="break-words text-xs font-medium text-[#D4D4D8]">
                  Probation Period
                </span>
                <span className="flex min-w-0 items-center gap-2 rounded-lg border border-[#1F242D] bg-[#0B0C0E] px-3 py-2">
                  <Clock3 aria-hidden="true" className="size-4 shrink-0 text-emerald-400" />
                  <input
                    aria-label="Probation period in months"
                    className={`${monoClass} min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-[#71717A] focus:outline-none`}
                    min="0"
                    onChange={(event) => setProbationPeriod(event.target.value)}
                    placeholder="Not Configured"
                    type="number"
                    value={probationPeriod}
                  />
                  <span className="shrink-0 text-[10px] text-[#71717A]">months</span>
                </span>
                <span className="break-words text-[10px] text-[#71717A]">
                  {probationMonths ? `${probationMonths} Months` : "Not Configured"}
                </span>
              </label>
            </div>
          </section>
        </div>

        <aside className="flex min-w-0 flex-col gap-5 lg:col-span-4">
          <section className={`${panelClass} flex min-w-0 flex-col gap-3.5 p-4 sm:p-5`}>
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-3">
              <div className="flex min-w-0 items-center gap-2">
                <ShieldCheck aria-hidden="true" className="size-5 shrink-0 text-emerald-400" />
                <div className="min-w-0">
                  <h2 className="break-words text-sm font-bold text-white">
                    Governance &amp; Authorization
                  </h2>
                  <p className="mt-1 break-words text-[11px] text-[#71717A]">
                    0-of-5 Mandatory Sign-offs Confirmed
                  </p>
                </div>
              </div>
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full bg-[#E5933A]"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              {[
                {
                  title: "Executive Sign-off",
                  detail: "Awaiting executive authorization",
                  icon: UserRound,
                  meta: "RSA-4096 Pending",
                },
                {
                  title: "Recruiter Sign-off",
                  detail: "Awaiting recruiter authorization",
                  icon: UsersRound,
                  meta: "RSA-4096 Pending",
                },
                {
                  title: "Finance & Compensation",
                  detail: "Awaiting compensation review",
                  icon: CircleDollarSign,
                  meta: "Ledger ID: —",
                },
                {
                  title: "Candidate Proofline Hash",
                  detail: "Awaiting verified candidate evidence",
                  icon: Fingerprint,
                  meta: "Ledger ID: — · 0 AST lines",
                },
                {
                  title: "Proctor Integrity Audit",
                  detail: "Awaiting assessment data",
                  icon: FileCheck2,
                  meta: "0 anomalies · Awaiting Sign-off",
                },
              ].map(({ title, detail, icon: Icon, meta }) => (
                <div
                  className={`${insetClass} flex min-w-0 items-start gap-2.5 p-2.5`}
                  key={title}
                >
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#E5933A]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-start justify-between gap-1.5">
                      <p className="min-w-0 break-words text-xs font-semibold text-white">
                        {title}
                      </p>
                      <span className="shrink-0 rounded border border-[#44301B] bg-[#2C2114] px-1.5 py-0.5 text-[9px] font-medium text-[#E5933A]">
                        Pending
                      </span>
                    </div>
                    <p className="mt-1 break-words text-[10px] text-[#71717A]">
                      {detail}
                    </p>
                    <p className={`${monoClass} mt-1 break-words text-[9px] text-[#A1A1AA]`}>
                      {meta}
                    </p>
                    <p className="mt-0.5 break-words text-[9px] text-[#71717A]">
                      Awaiting Sign-off
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={`${panelClass} flex min-w-0 flex-col gap-3.5 p-4 sm:p-5`}>
            <div className="flex min-w-0 items-start gap-2">
              <Send aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#F97316]" />
              <div className="min-w-0">
                <h2 className="break-words text-sm font-bold text-white">
                  Dispatch Execution
                </h2>
                <p className="mt-1 break-words text-[11px] leading-relaxed text-[#71717A]">
                  Prepare an encrypted invitation and employment covenant after a
                  candidate is selected and all required sign-offs are complete.
                </p>
              </div>
            </div>
            <button
              className="inline-flex min-h-10 w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-[#EA580C]"
              onClick={() =>
                setActionFeedback(
                  "Formal offer cannot be dispatched: select a candidate and complete all 5 mandatory sign-offs first.",
                )
              }
              type="button"
            >
              <Send aria-hidden="true" className="size-4 shrink-0" />
              <span className="break-words">
                Approve &amp; Dispatch Formal Offer
              </span>
            </button>
            <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                className="inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#1F242D] bg-[#171A1F] px-2 py-2 text-center text-[11px] font-medium text-white transition-colors hover:bg-[#1A1E24]"
                onClick={downloadOfferPack}
                type="button"
              >
                <FileDown aria-hidden="true" className="size-3.5 shrink-0 text-[#A1A1AA]" />
                <span className="break-words">Draft Pack (PDF)</span>
              </button>
              <button
                className="inline-flex min-h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#1F242D] bg-[#171A1F] px-2 py-2 text-center text-[11px] font-medium text-white transition-colors hover:bg-[#1A1E24]"
                onClick={saveDraft}
                type="button"
              >
                <Bookmark aria-hidden="true" className="size-3.5 shrink-0 text-[#A1A1AA]" />
                <span className="break-words">Save as Draft</span>
              </button>
            </div>
            <button
              className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded py-1 text-center text-[11px] text-[#A1A1AA] transition-colors hover:text-[#F87171]"
              onClick={() =>
                setActionFeedback(
                  "Escalation noted locally. Compensation committee routing is not configured.",
                )
              }
              type="button"
            >
              <Flag aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="break-words">
                Escalate Terms to Compensation Committee
              </span>
            </button>
            <div className="flex min-w-0 items-start gap-1.5 border-t border-[#1F242D] pt-3 text-[10px] leading-relaxed text-[#71717A]">
              <LockKeyhole aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              <p className="min-w-0 break-words">
                Dispatch remains unavailable until required candidate and
                governance evidence is present. Hiring decisions remain with
                human recruiters.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
