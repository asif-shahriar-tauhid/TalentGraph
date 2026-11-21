"use client";

import {
  ArrowUpRight,
  Building2,
  Check,
  CreditCard,
  Download,
  FileText,
  LockKeyhole,
  PlusCircle,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

type Plan = {
  id: string;
  name: string;
  badge: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
};

type BillingProfile = {
  entityName: string;
  taxId: string;
  billingEmail: string;
  paymentPreference: string;
};

type Dialog = "billing" | "security" | "enterprise" | null;

const plans: Plan[] = [
  {
    id: "starter",
    name: "Recruiter Starter",
    badge: "BASIC",
    price: "৳2,000",
    cadence: "/month",
    description: "Foundational hiring tools for small engineering pods.",
    features: [
      "2 active concurrent job openings",
      "Deterministic candidate ranking",
      "Skill weights & thresholds",
      "Evidence-linked AI explanations",
      "Basic hiring dashboard",
      "One assessment workflow",
    ],
  },
  {
    id: "growth",
    name: "Recruiter Growth",
    badge: "GROWTH",
    price: "৳5,000",
    cadence: "/month",
    description: "High-throughput evaluation for scaling technical teams.",
    features: [
      "Up to 5 concurrent active jobs",
      "25 candidate assessments / cycle",
      "Advanced comparison matrix & drawers",
      "Deep AST code inspection",
      "Priority SLA technical support",
    ],
  },
  {
    id: "campaign",
    name: "Pay Per Job Campaign",
    badge: "ON-DEMAND",
    price: "৳2,500",
    cadence: "/opening",
    description: "One-time hiring bursts without long-term commitment.",
    features: [
      "Single defined job requisition",
      "2-month active slot limit",
      "Full candidate ranking access",
      "AST evidence viewer included",
      "Candidate comparison matrix",
    ],
  },
];

const panelClass =
  "min-w-0 rounded-xl border border-[#1F242D] bg-[#121417]";
const monoClass = "font-mono [font-variant-numeric:tabular-nums]";

const usageMetrics = [
  { label: "Active Published Jobs", detail: "No active tier pool" },
  { label: "Candidate Assessments", detail: "No active tier pool" },
  { label: "RAG AST Provenance Inquiries", detail: "No active tier pool" },
  { label: "AI Code Citation Lookups", detail: "No active tier pool" },
];

export default function RecruiterBillingPage() {
  const [query, setQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [dialog, setDialog] = useState<Dialog>(null);
  const [billingProfile, setBillingProfile] = useState<BillingProfile | null>(
    null,
  );
  const [entityName, setEntityName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [paymentPreference, setPaymentPreference] = useState("none");
  const [notice, setNotice] = useState("");

  const visiblePlans = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return plans;
    return plans.filter((plan) =>
      [plan.name, plan.badge, plan.price, ...plan.features]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const openBillingDialog = () => {
    setEntityName(billingProfile?.entityName ?? "");
    setTaxId(billingProfile?.taxId ?? "");
    setBillingEmail(billingProfile?.billingEmail ?? "");
    setPaymentPreference(billingProfile?.paymentPreference ?? "none");
    setDialog("billing");
  };

  const saveBillingProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEntityName = entityName.trim();
    if (!trimmedEntityName) return;
    setBillingProfile({
      entityName: trimmedEntityName,
      taxId: taxId.trim(),
      billingEmail: billingEmail.trim(),
      paymentPreference,
    });
    setDialog(null);
    setNotice(
      "Billing profile saved locally. Payer verification and payment setup are still pending.",
    );
  };

  const choosePlan = (planId: string) => {
    setSelectedPlan((currentPlan) =>
      currentPlan === planId ? null : planId,
    );
    setNotice("");
  };

  const selectedPlanName = plans.find(
    (plan) => plan.id === selectedPlan,
  )?.name;

  return (
    <div className="-m-4 min-w-0 space-y-6 bg-[#0B0C0E] p-4 text-[#D4D4D8] sm:-m-6 sm:p-6 lg:-m-8 lg:p-8">
      <header className="sticky top-0 z-20 -mx-4 -mt-4 border-b border-[#1F242D] bg-[#0B0C0E]/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:-mt-6 sm:px-6 lg:-mx-8 lg:-mt-8 lg:px-8">
        <div className="mx-auto flex min-w-0 max-w-[1440px] flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div className="min-w-0">
            <div className={`${monoClass} mb-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] uppercase tracking-wider text-[#71717A] sm:text-[11px]`}>
              <span>RECRUITER</span>
              <span className="text-[#3F3F46]">/</span>
              <span>BILLING &amp; PLANS</span>
              <span className="text-[#3F3F46]">/</span>
              <span className="break-words text-[#D4D4D8]">
                SUBSCRIPTION MANAGEMENT
              </span>
            </div>
            <h1 className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
              Billing &amp; Subscription Management
            </h1>
            <p className="mt-1 break-words text-xs leading-relaxed text-[#A1A1AA]">
              Manage operational hiring plans, active job entitlements,
              assessment allowances, and verified BDT invoice history.
            </p>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <div className="relative min-w-0 w-full sm:flex-1 sm:w-auto xl:w-64">
              <Search
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#71717A]"
              />
              <input
                className="h-9 w-full rounded-lg border border-[#1F242D] bg-[#121417] py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search invoices, plans, refs..."
                type="search"
                value={query}
              />
            </div>
            <button
              className="inline-flex min-h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-[#1F242D] bg-[#121417] px-3 text-xs font-medium text-white transition-colors hover:bg-[#1A1E24] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              disabled
              title="A tax statement will be available after a verified transaction."
              type="button"
            >
              <Download aria-hidden="true" className="size-4 shrink-0 text-[#A1A1AA]" />
              <span className="break-words">Download Tax Statement</span>
            </button>
            <button
              aria-label="Payment Security & Webhooks"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#1F242D] bg-[#121417] text-[#A1A1AA] transition-colors hover:bg-[#1A1E24] hover:text-white"
              onClick={() => setDialog("security")}
              title="Payment Security & Webhooks"
              type="button"
            >
              <ShieldCheck aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] min-w-0 space-y-6">
        {notice && (
          <div
            className="flex min-w-0 flex-wrap items-start justify-between gap-2 rounded-lg border border-[#1F242D] bg-[#121417] p-3 text-xs leading-relaxed text-[#D4D4D8]"
            role="status"
          >
            <span className="min-w-0 break-words">{notice}</span>
            <button
              aria-label="Dismiss message"
              className="shrink-0 rounded p-0.5 text-[#A1A1AA] hover:text-white"
              onClick={() => setNotice("")}
              type="button"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}

        <section
          aria-label="Billing summary"
          className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <article className={`${panelClass} flex flex-col justify-between p-4`}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#A1A1AA]">
                Active Subscription Tier
              </span>
              <span className={`${monoClass} rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#B3B8C2]`}>
                Unassigned
              </span>
            </div>
            <div>
              <p className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                No Active Plan
              </p>
              <p className="mt-1 text-[11px] text-[#71717A]">
                Select a plan below to activate
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#1F242D] pt-2.5 text-[11px] text-[#A1A1AA]">
              <span>Monthly BDT subscription</span>
              <span className={`${monoClass} text-white`}>৳0 / mo</span>
            </div>
          </article>

          <article className={`${panelClass} flex flex-col justify-between p-4`}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#A1A1AA]">
                BDT Invoiced This Month
              </span>
              <span className={`${monoClass} rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#B3B8C2]`}>
                No Charges
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">৳0</p>
              <p className="mt-1 text-[11px] text-[#71717A]">
                No active billing cycle
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#1F242D] pt-2.5 text-[11px] text-[#A1A1AA]">
              <span>Next invoice charge</span>
              <span className={`${monoClass} text-white`}>—</span>
            </div>
          </article>

          <article className={`${panelClass} flex flex-col justify-between p-4`}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#A1A1AA]">
                Active Job Slots
              </span>
              <span className={`${monoClass} rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#B3B8C2]`}>
                0% Allocated
              </span>
            </div>
            <div>
              <p className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                0 / 0 In Use
              </p>
              <p className="mt-1 text-[11px] text-[#71717A]">
                No active requisitions
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#1F242D] pt-2.5 text-[11px] text-[#A1A1AA]">
              <span>Available openings</span>
              <span className={`${monoClass} text-[#4ADE80]`}>0 Slots Ready</span>
            </div>
          </article>

          <article className={`${panelClass} flex flex-col justify-between p-4`}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#A1A1AA]">
                Assessment Quota
              </span>
              <span className={`${monoClass} rounded border border-[#303640] bg-[#1A1E24] px-2 py-0.5 text-[10px] text-[#B3B8C2]`}>
                0% Utilized
              </span>
            </div>
            <div>
              <p className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                0 / 0 Attempts
              </p>
              <p className="mt-1 break-words text-[11px] text-[#71717A]">
                0 Remaining in Current Billing Cycle
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#1F242D] pt-2.5 text-[11px] text-[#A1A1AA]">
              <span>Cycle reset date</span>
              <span className={`${monoClass} text-white`}>—</span>
            </div>
          </article>
        </section>

        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="min-w-0 space-y-6 lg:col-span-8">
            <section className={`${panelClass} p-4 sm:p-5`}>
              <div className="flex min-w-0 flex-col gap-3 border-b border-[#1F242D] pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="break-words text-base font-bold tracking-tight text-white">
                    Operational Hiring Plans &amp; Entitlements
                  </h2>
                  <p className="mt-1 break-words text-xs leading-relaxed text-[#A1A1AA]">
                    Tailored for engineering teams requiring ground truth code
                    evaluation and AST audits.
                  </p>
                </div>
                <button
                  className="inline-flex min-h-8 max-w-full shrink-0 flex-wrap items-center justify-center gap-1.5 self-start rounded-lg border border-[#1F242D] bg-[#121417] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1A1E24] sm:self-auto"
                  onClick={() => {
                    setSelectedPlan("campaign");
                    setNotice(
                      "Pay Per Job Campaign selected for setup. No job slot or charge has been activated.",
                    );
                  }}
                  type="button"
                >
                  <PlusCircle aria-hidden="true" className="size-4 shrink-0 text-[#A1A1AA]" />
                  <span className="break-words">Add-on Job Slot (৳2,500)</span>
                </button>
              </div>

              <div className="mt-4 flex min-w-0 items-start gap-3 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-[#F97316]"
                />
                <div className="min-w-0 text-xs">
                  <span className="mb-0.5 block break-words font-semibold text-white">
                    Strict Meritocracy Standard
                  </span>
                  <p className="break-words leading-relaxed text-[#A1A1AA]">
                    Plan upgrades expand concurrent job and candidate
                    evaluation capacity. Subscriptions never alter candidate
                    match scores, AST rankings, or integrity reviews.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
                {visiblePlans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;
                  const isGrowthPlan = plan.id === "growth";
                  return (
                    <article
                      className={`relative flex min-w-0 flex-col justify-between rounded-lg border bg-[#171A1F] p-4 ${
                        isGrowthPlan
                          ? "border-2 border-[#F97316]"
                          : "border-[#1F242D]"
                      }`}
                      key={plan.id}
                    >
                      {isGrowthPlan && (
                        <span className={`${monoClass} absolute -top-3 right-3 rounded bg-[#F97316] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white`}>
                          Recommended
                        </span>
                      )}
                      <div className="min-w-0">
                        <div className="mb-2 flex min-w-0 flex-wrap items-center justify-between gap-2">
                          <h3 className="min-w-0 break-words text-xs font-semibold text-white">
                            {plan.name}
                          </h3>
                          <span className={`${monoClass} shrink-0 rounded bg-[#242831] px-1.5 py-0.5 text-[9px] text-[#B3B8C2]`}>
                            {plan.badge}
                          </span>
                        </div>
                        <p className={`${monoClass} break-words text-xl font-bold text-white`}>
                          {plan.price}
                          <span className="font-sans text-xs font-normal text-[#71717A]">
                            {plan.cadence}
                          </span>
                        </p>
                        <p className="mt-1 break-words text-[11px] leading-relaxed text-[#A1A1AA]">
                          {plan.description}
                        </p>
                        <ul className="mt-4 space-y-2 text-xs text-[#D4D4D8]">
                          {plan.features.map((feature) => (
                            <li
                              className="flex min-w-0 items-start gap-2"
                              key={feature}
                            >
                              <Check
                                aria-hidden="true"
                                className="mt-0.5 size-4 shrink-0 text-[#4ADE80]"
                              />
                              <span className="min-w-0 break-words">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-5 border-t border-[#1F242D] pt-3">
                        <button
                          aria-pressed={isSelected}
                          className={`w-full rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                            isSelected
                              ? "border-[#F97316] bg-[#F97316]/15 text-[#FDBA74]"
                              : "border-[#303640] bg-[#121417] text-[#D4D4D8] hover:border-[#F97316]/70 hover:text-white"
                          }`}
                          onClick={() => choosePlan(plan.id)}
                          type="button"
                        >
                          {isSelected ? "Selected for setup" : "Select this plan"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {visiblePlans.length === 0 && (
                <p className="mt-5 rounded-lg border border-[#1F242D] bg-[#171A1F] p-4 text-center text-xs leading-relaxed text-[#A1A1AA]">
                  No plans match “{query}”.
                </p>
              )}
              {selectedPlanName && (
                <div className="mt-4 flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-lg border border-[#3A2A1D] bg-[#211910] p-3">
                  <p className="min-w-0 break-words text-xs leading-relaxed text-[#F4D6BF]">
                    <span className="font-semibold">{selectedPlanName}</span>{" "}
                    selected for setup. This does not activate a plan or create
                    a charge.
                  </p>
                  <button
                    className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-lg bg-[#F97316] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#EA580C]"
                    onClick={openBillingDialog}
                    type="button"
                  >
                    Continue to billing details
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </button>
                </div>
              )}
            </section>

            <section className={`${panelClass} overflow-hidden`}>
              <div className="flex min-w-0 flex-col justify-between gap-3 border-b border-[#1F242D] p-4 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <h2 className="break-words text-base font-bold tracking-tight text-white">
                    Transaction &amp; BDT Invoice History
                  </h2>
                  <p className="mt-1 break-words text-xs leading-relaxed text-[#A1A1AA]">
                    Auditable, cryptographically verified BDT billing records
                    linked to Bangladesh corporate accounts.
                  </p>
                </div>
                <span className={`${monoClass} break-words text-xs text-[#71717A]`}>
                  BST Timezone (UTC+6)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1F242D] bg-[#0F1114] font-medium text-[#71717A]">
                      <th className="px-4 py-3">Invoice ID</th>
                      <th className="px-4 py-3">Date (BST)</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Method &amp; Webhook Reference</th>
                      <th className="px-4 py-3 text-right">Amount (BDT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-8 text-center" colSpan={5}>
                        <div className="mx-auto flex max-w-xl flex-col items-center gap-2">
                          <FileText
                            aria-hidden="true"
                            className="size-5 text-[#71717A]"
                          />
                          <p className="break-words text-xs font-semibold text-[#D4D4D8]">
                            No BDT invoices recorded yet.
                          </p>
                          <p className="break-words text-xs leading-relaxed text-[#71717A]">
                            Verified transactions will appear here once a plan
                            or job slot is activated.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="min-w-0 space-y-6 lg:col-span-4">
            <section className={`${panelClass} min-w-0 space-y-4 p-4 sm:p-5`}>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-3">
                <h2 className="break-words text-sm font-bold tracking-tight text-white">
                  Corporate Billing Profile
                </h2>
                <span className={`${monoClass} rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-0.5 text-[10px] text-[#4ADE80]`}>
                  SECURE
                </span>
              </div>
              <div className="rounded-lg border border-[#1F242D] bg-[#171A1F] p-3">
                <span className={`${monoClass} block break-words text-[10px] uppercase tracking-wider text-[#71717A]`}>
                  Verified Payer Entity
                </span>
                <p className="mt-1 break-words text-sm font-semibold text-white">
                  {billingProfile?.entityName ?? "Not Configured"}
                </p>
                <p className={`${monoClass} mt-1 break-words text-xs text-[#A1A1AA]`}>
                  BIN / Tax ID:{" "}
                  {billingProfile?.taxId || "Pending verification"}
                </p>
                {billingProfile?.billingEmail && (
                  <p className="mt-1 break-words text-xs text-[#A1A1AA]">
                    Billing email: {billingProfile.billingEmail}
                  </p>
                )}
                {billingProfile && (
                  <p className="mt-2 text-[10px] font-medium text-[#E5933A]">
                    Configured · Verification pending
                  </p>
                )}
              </div>
              <div className="min-w-0 space-y-2">
                <span className={`${monoClass} block break-words text-[10px] uppercase tracking-wider text-[#71717A]`}>
                  Primary Payment Instrument
                </span>
                <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded border border-[#303640] bg-[#1F242D] text-white">
                    <CreditCard aria-hidden="true" className="size-4" />
                  </div>
                  <p className="min-w-0 break-words text-xs font-semibold text-white">
                    No payment method linked
                  </p>
                </div>
                {billingProfile?.paymentPreference &&
                  billingProfile.paymentPreference !== "none" && (
                    <p className="break-words text-[11px] leading-relaxed text-[#A1A1AA]">
                      Invoicing preference:{" "}
                      {billingProfile.paymentPreference}
                    </p>
                  )}
              </div>
              <div className="min-w-0 space-y-2">
                <span className={`${monoClass} block break-words text-[10px] uppercase tracking-wider text-[#71717A]`}>
                  Backup Invoicing Protocol
                </span>
                <div className="flex min-w-0 items-start gap-3 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3">
                  <Building2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#A1A1AA]"
                  />
                  <div className="min-w-0 text-xs">
                    <span className="block break-words font-medium text-white">
                      Bangladesh Bank BEFTN / RTGS
                    </span>
                    <span className="mt-0.5 block break-words text-[11px] text-[#71717A]">
                      Direct automated corporate clearing
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-[#1F242D] bg-[#171A1F] p-3 text-xs leading-relaxed text-[#A1A1AA]">
                <div className="mb-1 flex min-w-0 items-center gap-1.5 font-medium text-white">
                  <LockKeyhole
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#F97316]"
                  />
                  <span className="break-words">Server-Authoritative Billing</span>
                </div>
                Payments are validated exclusively via cryptographic, signed
                webhook notifications. Client return URLs never confirm
                payment.
              </div>
              <button
                className="w-full rounded-lg border border-[#1F242D] bg-[#171A1F] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#20242B]"
                onClick={openBillingDialog}
                type="button"
              >
                Update Billing Details
              </button>
            </section>

            <section className={`${panelClass} min-w-0 space-y-4 p-4 sm:p-5`}>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[#1F242D] pb-3">
                <div className="min-w-0">
                  <h2 className="break-words text-sm font-bold tracking-tight text-white">
                    Usage &amp; Entitlement Governance
                  </h2>
                  <p className="mt-1 break-words text-[11px] text-[#71717A]">
                    Strict capacity limits enforcement
                  </p>
                </div>
                <span className={`${monoClass} rounded bg-[#242831] px-2 py-0.5 text-[10px] text-[#B3B8C2]`}>
                  CYCLE 00
                </span>
              </div>
              <div className="space-y-4">
                {usageMetrics.map((metric) => (
                  <div className="min-w-0 space-y-1.5" key={metric.label}>
                    <div className="flex min-w-0 flex-wrap items-center justify-between gap-1 text-xs">
                      <span className="min-w-0 break-words font-medium text-white">
                        {metric.label}
                      </span>
                      <span className={`${monoClass} text-white`}>
                        0 / 0 <span className="text-[#71717A]">(0%)</span>
                      </span>
                    </div>
                    <div
                      aria-label={`${metric.label}: 0 / 0 (0%)`}
                      className="h-2 w-full overflow-hidden rounded-full border border-[#1F242D] bg-[#1A1E24]"
                      role="progressbar"
                      aria-valuemax={0}
                      aria-valuemin={0}
                      aria-valuenow={0}
                    >
                      <div className="h-full w-0 rounded-full bg-[#F97316]" />
                    </div>
                    <div className="flex min-w-0 flex-wrap justify-between gap-x-2 gap-y-1 text-[10px] text-[#71717A]">
                      <span className="break-words">{metric.detail}</span>
                      <span className={`${monoClass} break-words`}>
                        Hard limit: 0
                      </span>
                    </div>
                    <p className={`${monoClass} break-words text-[10px] text-[#71717A]`}>
                      Reset: —
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-[#1F242D] pt-4">
                <button
                  className="w-full rounded-lg bg-[#F97316] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#EA580C]"
                  onClick={() => setDialog("enterprise")}
                  type="button"
                >
                  Request Custom Enterprise Quota
                </button>
                <button
                  className="w-full rounded-lg border border-[#1F242D] bg-[#171A1F] px-3 py-2 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#20242B] hover:text-white"
                  onClick={openBillingDialog}
                  type="button"
                >
                  Add Payment Method
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <footer className="border-t border-[#1F242D] px-1 py-4 text-center text-[10px] leading-relaxed text-[#71717A] sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-2 sm:text-left">
        <span className="break-words">
          TalentGraph Ground Truth Protocol · Billing ledger is empty ·
          Subscriptions are governed by web-only checkout
        </span>
        <span className={`${monoClass} mt-1 block break-words sm:mt-0`}>
          Bangladesh Bank Compliant (BDT) · Recruiter Billing SLA
        </span>
      </footer>

      {dialog && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setDialog(null);
          }}
        >
          <section
            aria-labelledby="billing-dialog-title"
            aria-modal="true"
            className="my-auto w-full max-w-lg rounded-xl border border-[#1F242D] bg-[#121417] p-5 shadow-2xl"
            role="dialog"
          >
            <div className="mb-4 flex min-w-0 items-start justify-between gap-3 border-b border-[#1F242D] pb-3">
              <div className="min-w-0">
                <h2
                  className="break-words text-base font-bold text-white"
                  id="billing-dialog-title"
                >
                  {dialog === "billing"
                    ? "Billing Details"
                    : dialog === "security"
                      ? "Payment Security & Webhooks"
                      : "Enterprise Quota Request"}
                </h2>
                <p className="mt-1 break-words text-xs leading-relaxed text-[#A1A1AA]">
                  {dialog === "billing"
                    ? "Configure payer details for a future verified billing setup."
                    : dialog === "security"
                      ? "Payment status is confirmed only by server-verified signed webhooks."
                      : "Custom quota requests require a configured organization contact."}
                </p>
              </div>
              <button
                aria-label="Close dialog"
                className="shrink-0 rounded p-1 text-[#A1A1AA] hover:text-white"
                onClick={() => setDialog(null)}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            {dialog === "billing" ? (
              <form className="space-y-4" onSubmit={saveBillingProfile}>
                <label className="block space-y-1.5 text-xs font-medium text-[#D4D4D8]">
                  <span>Payer entity name</span>
                  <input
                    autoComplete="organization"
                    className="h-9 w-full rounded-lg border border-[#303640] bg-[#0B0C0E] px-3 text-sm text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                    onChange={(event) => setEntityName(event.target.value)}
                    placeholder="Legal company name"
                    required
                    value={entityName}
                  />
                </label>
                <label className="block space-y-1.5 text-xs font-medium text-[#D4D4D8]">
                  <span>BIN / Tax ID</span>
                  <input
                    autoComplete="off"
                    className="h-9 w-full rounded-lg border border-[#303640] bg-[#0B0C0E] px-3 text-sm text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                    onChange={(event) => setTaxId(event.target.value)}
                    placeholder="Enter tax identifier"
                    value={taxId}
                  />
                </label>
                <label className="block space-y-1.5 text-xs font-medium text-[#D4D4D8]">
                  <span>Billing contact email</span>
                  <input
                    autoComplete="email"
                    className="h-9 w-full rounded-lg border border-[#303640] bg-[#0B0C0E] px-3 text-sm text-white placeholder:text-[#71717A] focus:border-[#F97316] focus:outline-none"
                    onChange={(event) => setBillingEmail(event.target.value)}
                    placeholder="name@company.com"
                    type="email"
                    value={billingEmail}
                  />
                </label>
                <label className="block space-y-1.5 text-xs font-medium text-[#D4D4D8]">
                  <span>Invoicing preference</span>
                  <select
                    className="h-9 w-full rounded-lg border border-[#303640] bg-[#0B0C0E] px-3 text-sm text-white focus:border-[#F97316] focus:outline-none"
                    onChange={(event) => setPaymentPreference(event.target.value)}
                    value={paymentPreference}
                  >
                    <option value="none">No preference selected</option>
                    <option value="Bangladesh Bank BEFTN / RTGS">
                      Bangladesh Bank BEFTN / RTGS
                    </option>
                    <option value="Hosted card checkout">
                      Hosted card checkout (not linked)
                    </option>
                  </select>
                </label>
                <p className="break-words text-[11px] leading-relaxed text-[#A1A1AA]">
                  Saving these details does not verify the payer, link a payment
                  instrument, activate a plan, or create a charge.
                </p>
                <div className="flex flex-wrap justify-end gap-2 pt-1">
                  <button
                    className="min-h-9 rounded-lg border border-[#303640] px-3 py-2 text-xs font-medium text-[#D4D4D8] hover:bg-[#1A1E24]"
                    onClick={() => setDialog(null)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="min-h-9 rounded-lg bg-[#F97316] px-3 py-2 text-xs font-semibold text-white hover:bg-[#EA580C]"
                    type="submit"
                  >
                    Save Billing Details
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex min-w-0 items-start gap-3 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3 text-xs leading-relaxed text-[#D4D4D8]">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#4ADE80]"
                  />
                  <p className="min-w-0 break-words">
                    Client return URLs cannot confirm payment. A signed
                    server-side webhook is required before billing records,
                    entitlements, or verification status can change.
                  </p>
                </div>
                {dialog === "enterprise" && (
                  <p className="break-words text-xs leading-relaxed text-[#A1A1AA]">
                    {billingProfile?.billingEmail
                      ? `Request contact: ${billingProfile.billingEmail}. No request has been submitted.`
                      : "Configure a billing contact email before submitting a quota request. No request has been submitted."}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    className="min-h-9 rounded-lg border border-[#303640] px-3 py-2 text-xs font-medium text-[#D4D4D8] hover:bg-[#1A1E24]"
                    onClick={() => setDialog(null)}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
