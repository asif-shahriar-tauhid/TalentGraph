'use client';

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Database,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Moon,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Users,
  Wallet,
  Webhook,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

type Gateway = "all" | "bKash" | "Nagad" | "SSLCommerz";
type PlanFilter = "all" | "Recruiter Starter" | "Recruiter Growth";

interface PaymentTransaction {
  id: string;
  attempt: string;
  gateway: Exclude<Gateway, "all">;
  subscriber: string;
  entity: string;
  plan: string;
  cadence: string;
  amount: number;
  signature: "valid" | "invalid" | "pending";
  timestamp: string;
  entitlement: "active" | "pending" | "cancelled";
  gatewayRef: string;
  ipnNonce: string;
  provenance: string;
}

const transactions: PaymentTransaction[] = [];

const navigationItems = [
  { label: "Operational Queue", href: "/admin", icon: LayoutDashboard },
  { label: "Company Verification", href: "/admin/company-verification", icon: ShieldCheck },
  { label: "User Directory", href: "/admin/user-directory", icon: Users },
  { label: "Jobs Moderation", href: "/admin/jobs-moderation", icon: BriefcaseBusiness },
  { label: "Integrity Cases", href: "/admin/integrity-cases", icon: ShieldAlert },
  { label: "Worker Telemetry", href: "/admin/worker-telemetry", icon: Activity },
  { label: "BDT Subscriptions", href: "/admin/bdt-subscriptions", icon: Wallet },
];

const tableHeaders = [
  "Transaction ID & Attempt",
  "Subscriber & Entity",
  "Plan & Cadence",
  "BDT Amount",
  "Webhook Signature & Timestamp",
  "Entitlement State",
  "Actions",
];

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function signatureLabel(signature: PaymentTransaction["signature"]) {
  switch (signature) {
    case "valid":
      return "HMAC-SHA256 Valid";
    case "invalid":
      return "HMAC-SHA256 Invalid";
    case "pending":
      return "Verification Pending";
  }
}

function entitlementLabel(entitlement: PaymentTransaction["entitlement"]) {
  switch (entitlement) {
    case "active":
      return "Active Entitlement";
    case "pending":
      return "Pending Re-verification";
    case "cancelled":
      return "Cancelled";
  }
}

export default function BdtSubscriptionsPage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<PaymentTransaction | null>(null);
  const [planFilter, setPlanFilter] = useState<PlanFilter>("all");
  const [gateway, setGateway] = useState<Gateway>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [justification, setJustification] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, logout, logoutPending } = useAuth();
  const { toggleTheme, resolvedTheme } = useTheme();
  const shellUser = user ?? { name: "Administrator" };
  const isPreviewSession = !user;

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesPlan =
        planFilter === "all" || transaction.plan === planFilter;
      const matchesGateway =
        gateway === "all" || transaction.gateway === gateway;
      const matchesSearch =
        query.length === 0 ||
        `${transaction.id} ${transaction.subscriber} ${transaction.entity} ${transaction.plan} ${transaction.gateway}`
          .toLowerCase()
          .includes(query);
      return matchesPlan && matchesGateway && matchesSearch;
    });
  }, [gateway, planFilter, searchTerm]);

  const exportTransactions = () => {
    const rows = [
      tableHeaders,
      ...filteredTransactions.map((transaction) => [
        transaction.id,
        transaction.subscriber,
        transaction.entity,
        transaction.plan,
        transaction.cadence,
        String(transaction.amount),
        transaction.gateway,
        signatureLabel(transaction.signature),
        transaction.timestamp,
        entitlementLabel(transaction.entitlement),
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "talentgraph-payment-transactions.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const focusSearch = () => {
    setSearchOpen(true);
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const hasJustification = justification.trim().length > 0;

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#0D0D0F] text-[#D4D4D8] selection:bg-[#D4621A]/30 selection:text-white">
      <aside className="sticky top-0 z-40 flex h-screen flex-shrink-0 transition-all duration-300 w-16 md:w-64 flex-col justify-between border-r border-[#222226] bg-[#121215] p-2 md:p-3">
        <div className="flex min-h-0 flex-col gap-5">
          <div className="flex h-12 items-center justify-center md:justify-start md:px-1">
            <Link
              aria-label="TalentGraph home"
              className="flex min-w-0 items-center justify-center gap-2.5 transition-opacity hover:opacity-80 md:justify-start"
              href="/"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D4621A] text-sm font-bold text-white">
                TG
              </span>
              <span className="hidden min-w-0 md:block">
                <span className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white">
                  TalentGraph
                  <span className="rounded bg-[#2A2A2E] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#B3B3B3]">
                    ADMIN
                  </span>
                </span>
                <span className="block text-[10px] text-[#71717A]">
                  Operational control
                </span>
              </span>
            </Link>
          </div>

          <div className="rounded-lg border border-[#27272C] bg-[#17171B] p-2.5">
            <div className="flex items-center justify-center gap-2 md:justify-between">
              <span className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#4ADE80]" />
                </span>
                <span className="hidden md:inline">Governance policy</span>
              </span>
              <span className="hidden rounded border border-[#1A3D2C] bg-[#13281E] px-2 py-0.5 font-mono text-[9px] text-[#4ADE80] md:inline">
                Enforced
              </span>
            </div>
          </div>

          <nav
            aria-label="Admin navigation"
            className="min-h-0 space-y-1 overflow-y-auto"
          >
            {navigationItems.map(({ label, href, icon: Icon }) => {
              const active = label === "BDT Subscriptions";
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-center gap-3 rounded-lg px-0 py-2.5 text-[13px] font-medium transition-colors md:justify-start md:px-3 ${
                    active
                      ? "bg-[#D4621A] text-white shadow-sm"
                      : "text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white"
                  }`}
                  href={href}
                  key={label}
                  title={label}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span className="hidden min-w-0 flex-1 truncate md:inline">
                    {label}
                  </span>
                  {active && (
                    <>
                      <span className="hidden shrink-0 rounded border border-[#E47735] bg-[#BF5313] px-1.5 py-0.5 font-mono text-[9px] text-white md:inline">
                        ৳34.5k
                      </span>
                      <span className="sr-only">৳34.5k</span>
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-[#232328] pt-3">
          <div
            className="mb-3 flex items-center justify-center gap-2.5 md:justify-start md:px-1"
            title={`${shellUser.name}${isPreviewSession ? " (preview session)" : ""}`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2B2B32] bg-[#202024] text-xs font-semibold text-white">
              {initials(shellUser.name)}
            </span>
            <span className="hidden min-w-0 md:block">
              <span className="block truncate text-xs font-medium text-white">
                {shellUser.name}
              </span>
              <span className="block truncate font-mono text-[10px] text-[#71717A]">
                {isPreviewSession ? "ADMIN · UI preview" : user.role}
              </span>
            </span>
          </div>
          <button
            aria-label={isPreviewSession ? "Sign out unavailable in preview" : "Sign out"}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#27272C] py-2 text-xs text-[#A1A1AA] transition-colors hover:border-[#482026] hover:bg-[#2E181D] hover:text-[#F87171] disabled:cursor-not-allowed disabled:opacity-50 md:px-3"
            disabled={logoutPending || isPreviewSession}
            onClick={() => logout()}
            title="Sign out"
            type="button"
          >
            <LogOut aria-hidden="true" className="size-3.5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-col gap-3 border-b border-[#222226] bg-[#0D0D0F]/95 px-4 py-4 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
              <span>Admin</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#D4621A]">
                Subscriptions &amp; Payments
              </span>
              <span aria-label="Governance policy enforced" className="text-[#4ADE80]">
                ●
              </span>
              <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 text-[9px] font-medium tracking-normal text-[#4ADE80]">
                Policy enforced
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
              Subscriptions &amp; Payment Webhooks
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {searchOpen && (
              <label className="relative min-w-0 flex-1 lg:w-56 lg:flex-none">
                <span className="sr-only">Search payment transactions</span>
                <Search
                  aria-hidden="true"
                  className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]"
                />
                <input
                  className="h-9 w-full rounded-lg border border-[#27272C] bg-[#161619] py-2 pl-8 pr-8 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A]"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search transactions"
                  ref={searchInputRef}
                  type="search"
                  value={searchTerm}
                />
                <button
                  aria-label="Close search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                  }}
                  type="button"
                >
                  <X aria-hidden="true" className="size-3.5" />
                </button>
              </label>
            )}
            <button
              aria-label="Search records"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={focusSearch}
              title="Search records"
              type="button"
            >
              <Search aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Export payment audit report"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={exportTransactions}
              title="Export payment audit report"
              type="button"
            >
              <ArrowDownToLine aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={toggleTheme}
              title="Toggle theme"
              type="button"
            >
              {resolvedTheme === "dark" ? (
                <Sun aria-hidden="true" className="size-4" />
              ) : (
                <Moon aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-1 flex-col gap-5 p-4 md:p-6 lg:p-8">
          <section
            aria-label="Subscription and payment metrics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <article className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-[#A1A1AA]">
                  Monthly Verified Revenue
                </p>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24] text-[#D4621A]">
                  <CircleDollarSign aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="my-2 font-mono text-2xl font-bold tracking-tight text-white">
                ৳0
              </p>
              <p className="flex items-center justify-between border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">
                <span>No verified revenue recorded</span>
                <span className="font-mono">--</span>
              </p>
            </article>
            <article className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-[#A1A1AA]">
                  Active Paid Entitlements
                </p>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24] text-[#D4621A]">
                  <BadgeCheck aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="my-2 font-mono text-2xl font-bold tracking-tight text-white">
                0
              </p>
              <p className="border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">
                No paid entitlements recorded
              </p>
            </article>
            <article className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-[#A1A1AA]">
                  Webhook Reconciliations
                </p>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24] text-[#D4621A]">
                  <Webhook aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="my-2 font-mono text-2xl font-bold tracking-tight text-white">
                0
              </p>
              <p className="border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">
                No webhook events reconciled
              </p>
            </article>
            <article className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-[#A1A1AA]">
                  Webhook Exceptions
                </p>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24] text-[#D4621A]">
                  <AlertTriangle aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="my-2 font-mono text-2xl font-bold tracking-tight text-white">
                0
              </p>
              <p className="border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">
                No webhook exceptions recorded
              </p>
            </article>
          </section>

          <section
            aria-label="Active audit and webhook reconciliation dossier"
            className="min-w-0 rounded-xl border border-[#25252A] bg-[#151518] p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-3 border-b border-[#25252A] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded border border-[#2B2B32] bg-[#1F1F24] text-[#D4621A]">
                  <FileSearch aria-hidden="true" className="size-4" />
                </span>
                <h2 className="text-sm font-semibold text-white sm:text-base">
                  Active Audit &amp; Webhook Reconciliation Dossier
                </h2>
              </div>
              {selectedTransaction && (
                <span className="w-fit rounded border border-[#27272C] bg-[#17171B] px-2 py-1 font-mono text-[10px] text-[#A1A1AA]">
                  Ref: #{selectedTransaction.id}
                </span>
              )}
            </div>

            {selectedTransaction ? (
              <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
                <article className="flex min-w-0 flex-col justify-between rounded-lg border border-[#27272C] bg-[#17171B] p-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#71717A]">
                        Target Subscriber
                      </h3>
                      <span className="text-xs font-mono text-[#D4621A]">
                        {selectedTransaction.subscriber}
                      </span>
                    </div>
                    <dl className="space-y-2 rounded border border-[#222226] bg-[#121215] p-3 font-mono text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#A1A1AA]">Gateway Ref:</dt>
                        <dd className="text-right text-white">
                          {selectedTransaction.gatewayRef}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#A1A1AA]">Verification:</dt>
                        <dd
                          className={
                            selectedTransaction.signature === "valid"
                              ? "text-right text-[#4ADE80]"
                              : "text-right text-[#E5933A]"
                          }
                        >
                          {signatureLabel(selectedTransaction.signature)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#A1A1AA]">IPN Nonce:</dt>
                        <dd className="max-w-[60%] truncate text-right text-[#D4D4D8]">
                          {selectedTransaction.ipnNonce}
                        </dd>
                      </div>
                    </dl>
                    <div className="space-y-2 border-l border-[#3F3F46] pl-4 text-xs">
                      <p>
                        <span className="font-medium text-[#D4D4D8]">Plan:</span>
                        <span className="text-[#A1A1AA]">
                          {" "}{selectedTransaction.plan}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium text-[#D4D4D8]">
                          Stem Provenance:
                        </span>
                        <span className="text-[#A1A1AA]">
                          {" "}{selectedTransaction.provenance}
                        </span>
                      </p>
                    </div>
                    <p className="rounded border border-[#27272C] bg-[#151518] p-2.5 text-[11px] leading-relaxed text-[#A1A1AA]">
                      <span className="font-semibold text-[#D4621A]">
                        Payment authenticity mandate:
                      </span>{" "}
                      Entitlements are activated exclusively by verified,
                      idempotent payment webhooks.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#222226] pt-2 text-[11px] text-[#71717A]">
                    <span>Audit state: Ground Truth</span>
                    <ShieldCheck aria-label="Audited" className="size-4 text-[#4ADE80]" />
                  </div>
                </article>

                <article className="flex min-w-0 flex-col justify-between rounded-lg border border-[#27272C] bg-[#17171B] p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-[#222226] pb-2">
                      <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#71717A]">
                        Entitlement Allocation Matrix
                      </h3>
                      <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 font-mono text-[10px] text-[#4ADE80]">
                        {entitlementLabel(selectedTransaction.entitlement)}
                      </span>
                    </div>
                    <dl className="mt-3 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#222226] bg-[#121215] p-2">
                        <dt className="text-[#A1A1AA]">Active Job Postings quota</dt>
                        <dd className="font-mono text-white">Not recorded</dd>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#222226] bg-[#121215] p-2">
                        <dt className="text-[#A1A1AA]">Code Assessment Access</dt>
                        <dd className="font-mono text-[#A1A1AA]">Not recorded</dd>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-[#222226] bg-[#121215] p-2">
                        <dt className="text-[#A1A1AA]">Company Credential Badge</dt>
                        <dd className="font-mono text-[#A1A1AA]">Not recorded</dd>
                      </div>
                    </dl>
                    <div className="mt-3">
                      <p className="font-mono text-[10px] uppercase text-[#71717A]">
                        BullMQ Webhook Event Log
                      </p>
                      <div className="mt-1 rounded border border-[#222226] bg-[#121215] p-2 font-mono text-[10px] text-[#A1A1AA]">
                        <p className="text-[#4ADE80]">
                          [PAYMENT:{selectedTransaction.gateway}:received]
                        </p>
                        <p>[AUTH:hmac] {signatureLabel(selectedTransaction.signature)}</p>
                        <p>[ENTITLEMENT] Awaiting reconciliation</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-[#222226] pt-2 text-[11px] text-[#71717A]">
                    Entitlement details are pending verified plan metadata.
                  </div>
                </article>

                <article className="flex min-w-0 flex-col justify-between rounded-lg border border-[#27272C] bg-[#17171B] p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#71717A]">
                        Forensic Operations
                      </h3>
                      <span className="rounded border border-[#44301B] bg-[#2C2114] px-1.5 py-0.5 font-mono text-[9px] text-[#E5933A]">
                        ISO-27001 AUDIT
                      </span>
                    </div>
                    <div className="space-y-1">
                      <label
                        className="text-[11px] text-[#A1A1AA]"
                        htmlFor="audit-justification"
                      >
                        Mandatory Audit Justification Log
                      </label>
                      <textarea
                        className="w-full rounded-md border border-[#27272C] bg-[#161619] p-2.5 font-mono text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A]"
                        id="audit-justification"
                        onChange={(event) => setJustification(event.target.value)}
                        placeholder="Input administrative justification for entitlement mutation..."
                        rows={3}
                        value={justification}
                      />
                      <p className="text-[10px] text-[#71717A]">
                        Required for manual override, refund, or IPN redelivery.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
                      <button
                        className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#27272C] bg-[#161619] px-2.5 py-2 text-xs font-medium text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!hasJustification}
                        title="Enter an audit justification to enable"
                        type="button"
                      >
                        <RefreshCw aria-hidden="true" className="size-3.5" />
                        Resend IPN Webhook
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#482026] bg-[#2E181D] px-2.5 py-2 text-xs font-medium text-[#F87171] transition-colors hover:bg-[#3D1E25] disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!hasJustification}
                        title="Enter an audit justification to enable"
                        type="button"
                      >
                        <X aria-hidden="true" className="size-3.5" />
                        Cancel Entitlement
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-[#222226] pt-3">
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4621A] px-3 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-[#BF5313] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!hasJustification}
                      title="Enter an audit justification to enable"
                      type="button"
                    >
                      <CheckCircle2 aria-hidden="true" className="size-4" />
                      Commit Entitlement &amp; Reconcile Webhook
                    </button>
                  </div>
                </article>
              </div>
            ) : (
              <div className="mt-4 flex min-h-28 items-center justify-center rounded-lg border border-dashed border-[#2B2B32] bg-[#121215]/60 px-4 py-6 text-center">
                <p className="max-w-2xl text-sm leading-6 text-[#A1A1AA]">
                  Select a payment transaction from the log below to view
                  entitlement matrix and trigger manual webhook reconciliation
                </p>
              </div>
            )}
          </section>

          <section
            aria-label="Transaction and webhook audit log"
            className="min-w-0 overflow-hidden rounded-xl border border-[#25252A] bg-[#151518] shadow-sm"
          >
            <div className="flex flex-col gap-4 border-b border-[#25252A] p-3 sm:p-4 xl:flex-row xl:items-center xl:justify-between">
              <div
                aria-label="Filter payment transactions"
                className="flex min-w-0 gap-1 overflow-x-auto pb-1"
                role="tablist"
              >
                {(
                  [
                    ["all", "All Transactions"],
                    ["Recruiter Starter", "Recruiter Starter"],
                    ["Recruiter Growth", "Recruiter Growth"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    aria-selected={planFilter === id}
                    className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      planFilter === id
                        ? "bg-[#D4621A] text-white shadow-sm"
                        : "border border-[#27272C] bg-[#161619] text-[#A1A1AA] hover:border-[#3F3F46] hover:text-white"
                    }`}
                    key={id}
                    onClick={() => setPlanFilter(id)}
                    role="tab"
                    type="button"
                  >
                    {label}
                    <span className="ml-1.5 font-mono text-[10px] opacity-75">
                      {transactions.filter(
                        (transaction) =>
                          id === "all" || transaction.plan === id,
                      ).length}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="sr-only" htmlFor="gateway-filter">
                  Filter by payment gateway
                </label>
                <select
                  className="h-9 min-w-0 flex-1 cursor-pointer rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs text-[#D4D4D8] outline-none focus:border-[#D4621A] sm:flex-none"
                  id="gateway-filter"
                  onChange={(event) => setGateway(event.target.value as Gateway)}
                  value={gateway}
                >
                  <option value="all">All Gateways</option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="SSLCommerz">SSLCommerz</option>
                </select>
                <button
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  disabled
                  title="Unavailable until a payment event source is connected"
                  type="button"
                >
                  <RefreshCw aria-hidden="true" className="size-3.5" />
                  Sync
                </button>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[1120px] border-collapse text-left text-xs">
                <thead className="bg-[#121215]/80 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                  <tr className="border-b border-[#25252A]">
                    {tableHeaders.map((header, index) => (
                      <th
                        className={`px-4 py-3 font-medium ${
                          index === 3 || index === 6 ? "text-right" : ""
                        } ${index === 5 ? "text-center" : ""}`}
                        key={header}
                        scope="col"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222226]">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td className="px-4 py-16 text-center" colSpan={7}>
                        <div className="mx-auto flex max-w-md flex-col items-center">
                          <span className="mb-3 flex size-11 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#A1A1AA]">
                            <Database aria-hidden="true" className="size-5" />
                          </span>
                          <h3 className="text-sm font-semibold text-white">
                            No payment transactions or webhook events logged
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-[#71717A]">
                            bKash, Nagad, and SSLCommerz payment webhooks will
                            stream here
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <tr
                        aria-selected={selectedTransaction?.id === transaction.id}
                        className={`cursor-pointer transition-colors hover:bg-[#1A1A1E] ${
                          selectedTransaction?.id === transaction.id
                            ? "border-l-2 border-l-[#D4621A] bg-[#1A1A1E]"
                            : ""
                        }`}
                        key={transaction.id}
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <td className="whitespace-nowrap px-4 py-3.5 font-mono">
                          <span className="block font-semibold text-white">
                            {transaction.id}
                          </span>
                          <span className="text-[10px] text-[#71717A]">
                            Attempt {transaction.attempt} · {transaction.gateway}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="block font-medium text-white">
                            {transaction.subscriber}
                          </span>
                          <span className="text-[11px] text-[#A1A1AA]">
                            {transaction.entity}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="block font-medium text-[#D4D4D8]">
                            {transaction.plan}
                          </span>
                          <span className="text-[11px] text-[#71717A]">
                            {transaction.cadence}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-right font-mono font-semibold text-white">
                          ৳{transaction.amount.toLocaleString("en-BD")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          <span
                            className={`flex items-center gap-1.5 font-mono text-[11px] ${
                              transaction.signature === "valid"
                                ? "text-[#4ADE80]"
                                : "text-[#E5933A]"
                            }`}
                          >
                            {transaction.signature === "valid" ? (
                              <CheckCircle2 aria-hidden="true" className="size-3.5" />
                            ) : (
                              <AlertTriangle aria-hidden="true" className="size-3.5" />
                            )}
                            {signatureLabel(transaction.signature)}
                          </span>
                          <span className="font-mono text-[10px] text-[#71717A]">
                            {transaction.timestamp}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-center">
                          <span className="inline-flex items-center gap-1 rounded border border-[#1A3D2C] bg-[#13281E] px-2.5 py-1 font-mono text-[10px] text-[#4ADE80]">
                            {entitlementLabel(transaction.entitlement)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              className="rounded border border-[#27272C] bg-[#161619] px-2 py-1 text-[11px] text-[#A1A1AA] hover:text-white"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedTransaction(transaction);
                              }}
                              type="button"
                            >
                              Inspect
                            </button>
                            <button
                              className="rounded border border-[#27272C] bg-[#161619] px-2 py-1 text-[11px] text-[#A1A1AA] hover:text-white"
                              onClick={(event) => event.stopPropagation()}
                              type="button"
                            >
                              Receipt
                            </button>
                            <button
                              className="inline-flex items-center gap-1 rounded border border-[#44301B] bg-[#2C2114] px-2 py-1 text-[11px] text-[#E5933A] hover:bg-[#382B1C]"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedTransaction(transaction);
                              }}
                              type="button"
                            >
                              <RefreshCw aria-hidden="true" className="size-3" />
                              Re-check Webhook
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-2 border-t border-[#25252A] bg-[#121215] px-4 py-3 font-mono text-[10px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {filteredTransactions.length} of {transactions.length} recorded transactions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#71717A]" />
                Webhook stream awaiting events
              </span>
            </div>
          </section>
        </main>

        <footer className="mt-auto flex flex-col gap-2 border-t border-[#1C1C20] bg-[#0D0D0F] px-4 py-4 text-[11px] text-[#71717A] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#D4621A]" />
            <span>TalentGraph governance shell</span>
            <span aria-hidden="true" className="text-[#3F3F46]">•</span>
            <span>
              Financial reconciliations are audited with cryptographic
              SHA-256 integrity
            </span>
          </div>
          <div>
            Need payment gateway diagnostic support?
            <a
              className="ml-1 font-medium text-[#D4621A] hover:underline"
              href="mailto:billing-ops@talentgraph.com"
            >
              Contact platform billing ops
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}