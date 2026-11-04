"use client";

import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Eye,
  FileCheck2,
  FileText,
  Globe2,
  Hourglass,
  LayoutDashboard,
  Lock,
  LogOut,
  MailCheck,
  Search,
  Shield,
  ShieldCheck,
  Terminal,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { useState, useSyncExternalStore } from "react";

type StatusTone = "success" | "warning" | "danger" | "neutral" | "blue";

const toneClasses: Record<StatusTone, string> = {
  success: "border-[#1A3D2C] bg-[#13281E] text-[#4ADE80]",
  warning: "border-[#44301B] bg-[#2C2114] text-[#E5933A]",
  danger: "border-[#482026] bg-[#2E181D] text-[#F87171]",
  neutral: "border-[#3A3A40] bg-[#2A2A2E] text-[#B3B3B3]",
  blue: "border-[#273B5E] bg-[#1C2029] text-[#70A8FF]",
};

function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return (
    <span
      className={`inline-flex max-w-full items-center whitespace-normal break-words rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium leading-4 ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

function CheckBadge({
  children,
  tone = "success",
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return (
    <span
      className={`inline-flex max-w-full flex-wrap items-center gap-1 break-words rounded border px-2 py-0.5 font-mono text-[10px] leading-4 ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

const metrics = [
  {
    title: "Pending Dual-Check",
    value: "3",
    suffix: "companies",
    icon: Hourglass,
    iconTone: "text-[#E5933A]",
    note: "Avg triage SLA 4.2h remaining",
    pill: "Active SLA",
    pillTone: "warning" as const,
  },
  {
    title: "Legitimacy Approved",
    value: "2 / 3",
    suffix: "in queue",
    icon: CheckCircle2,
    iconTone: "text-[#4ADE80]",
    note: "RJSC & Trade License",
    pill: "Verified by registry",
    pillTone: "success" as const,
  },
  {
    title: "Affiliation Blocked",
    value: "1",
    suffix: "dossier held",
    icon: Shield,
    iconTone: "text-[#E5933A]",
    note: "Corporate authority",
    pill: "Awaiting deed / auth letter",
    pillTone: "warning" as const,
  },
  {
    title: "Startup Alternative Path",
    value: "1",
    suffix: "manual review",
    icon: Workflow,
    iconTone: "text-[#A1A1AA]",
    note: "Generic domain policy",
    pill: "Sec 10 compliant",
    pillTone: "neutral" as const,
  },
];

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon;

  return (
    <article className="flex min-h-[148px] flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">{metric.title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-[28px] font-semibold leading-tight text-white">
              {metric.value}
            </span>
            <span className="text-xs text-[#71717A]">{metric.suffix}</span>
          </div>
        </div>
        <span className="flex size-9 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24]">
          <Icon aria-hidden="true" className={`size-5 ${metric.iconTone}`} />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#222227] pt-3">
        <span className="text-[11px] text-[#71717A]">{metric.note}</span>
        <StatusPill tone={metric.pillTone}>{metric.pill}</StatusPill>
      </div>
    </article>
  );
}

function CompanyMeta({
  company,
  domain,
  plan,
  name,
  role,
  submitted,
  domainWarning = false,
  startup = false,
}: {
  company: string;
  domain: string;
  plan: string;
  name: string;
  role: string;
  submitted: string;
  domainWarning?: boolean;
  startup?: boolean;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-base font-semibold tracking-tight text-white">
            {company}
          </h3>
          <span
            className={`inline-flex max-w-full flex-wrap items-center gap-1 break-all rounded border px-2 py-0.5 font-mono text-[11px] ${
              domainWarning
                ? "border-[#44301B] bg-[#17171B] text-[#E5933A]"
                : "border-[#27272C] bg-[#17171B] text-[#A1A1AA]"
            }`}
          >
            {domainWarning ? (
              <AlertTriangle aria-hidden="true" className="size-3" />
            ) : (
              <Globe2 aria-hidden="true" className="size-3" />
            )}
            {domain}
          </span>
          <span
            className={`max-w-full break-words rounded border px-2 py-0.5 text-[11px] font-medium ${
              startup
                ? "border-[#3A3A40] bg-[#2A2A2E] font-mono text-[#B3B3B3]"
                : toneClasses.blue
            }`}
          >
            {plan}
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#A1A1AA]">
          <span className="font-medium text-white">{name}</span>
          <span>({role})</span>
          <span className="text-[#52525B]">•</span>
          <span className="font-mono text-[11px] text-[#71717A]">{submitted}</span>
        </div>
      </div>
    </div>
  );
}

const navItems = [
  { label: "Operational Queue", icon: LayoutDashboard, href: "/admin" },
  {
    label: "Company Verification",
    icon: Building2,
    href: "/admin/company-verification",
    active: true,
    badge: "3",
  },
  { label: "User Directory", icon: Users, href: "#users", count: "1,482" },
  { label: "Jobs Moderation", icon: ClipboardCheck, href: "#jobs-moderation", count: "28" },
  {
    label: "Integrity Cases",
    icon: ShieldCheck,
    href: "#integrity-cases",
    flag: "2 flagged",
  },
  { label: "Worker Telemetry", icon: Activity, href: "#worker-telemetry", health: "99.8%" },
  { label: "BDT Subscriptions", icon: Wallet, href: "#subscriptions", count: "৳34.5k" },
];

const artifacts = [
  {
    file: "trade_license_dhaka_north_2026.pdf",
    detail: "2.1 MB • SHA-256 Hash Verified",
    icon: FileText,
    tone: "success" as const,
    ariaLabel: "Inspect Trade License PDF",
  },
  {
    file: "rjsc_incorporation_certificate_c4482.pdf",
    detail: "3.4 MB • RJSC API Direct Match",
    icon: BadgeCheck,
    tone: "success" as const,
    ariaLabel: "Inspect RJSC Certificate PDF",
  },
  {
    file: "board_authorization_farhan_ahmed.pdf",
    detail: "1.2 MB • Pending Sign-Off",
    icon: FileCheck2,
    tone: "warning" as const,
    ariaLabel: "Inspect Authorization PDF",
  },
];

const smallScreenQuery = "(max-width: 1023px)";

function subscribeToSmallScreen(callback: () => void) {
  const mediaQuery = window.matchMedia(smallScreenQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSmallScreenSnapshot() {
  return window.matchMedia(smallScreenQuery).matches;
}

export default function CompanyVerificationPage() {
  const isSmallScreen = useSyncExternalStore(
    subscribeToSmallScreen,
    getSmallScreenSnapshot,
    () => false,
  );
  const [collapsedOverride, setCollapsedOverride] = useState<boolean | null>(null);
  const isCollapsed = collapsedOverride ?? isSmallScreen;
  const [legalEntityVerified, setLegalEntityVerified] = useState(true);
  const [recruiterAffiliationVerified, setRecruiterAffiliationVerified] =
    useState(false);
  const [rationale, setRationale] = useState("");

  return (
    <div className="flex min-h-screen w-full min-w-0 overflow-hidden bg-[#0D0D0F] font-sans text-[#D4D4D8] selection:bg-[#D4621A] selection:text-white">
      <aside
        className={`sticky top-0 flex h-screen flex-shrink-0 flex-col justify-between border-r border-[#222226] bg-[#121215] transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div>
          <div
            className={`flex py-3 ${
              isCollapsed
                ? "flex-col items-center gap-3 px-2"
                : "flex-col items-stretch gap-3 px-4"
            }`}
          >
            <button
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`flex size-8 items-center justify-center rounded-md text-[#A1A1AA] transition-colors hover:bg-[#1A1A1E] hover:text-white ${
                isCollapsed ? "self-center" : "self-end"
              }`}
              onClick={() => setCollapsedOverride(!isCollapsed)}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              type="button"
            >
              {isCollapsed ? (
                <ChevronRight aria-hidden="true" className="size-4" />
              ) : (
                <ChevronLeft aria-hidden="true" className="size-4" />
              )}
            </button>
            <div
              className={`flex min-w-0 items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E56218] text-sm font-bold tracking-tight text-white">
                TG
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold tracking-tight text-white">
                      TalentGraph
                    </span>
                    <span className="rounded bg-[#2A2A2E] px-1.5 py-0.5 font-mono text-[10px] font-medium leading-none text-[#B3B3B3]">
                      ADMIN
                    </span>
                  </div>
                  <span className="text-[11px] leading-tight text-[#71717A]">
                    Operational control
                  </span>
                </div>
              )}
            </div>
          </div>

          <nav aria-label="Admin navigation" className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  aria-current={item.active ? "page" : undefined}
                  aria-label={isCollapsed ? item.label : undefined}
                  className={`flex items-center rounded-lg py-2 text-[13px] transition-colors ${
                    isCollapsed
                      ? "justify-center px-0"
                      : "justify-between px-3"
                  } ${
                    item.active
                      ? "bg-[#D4621A] font-medium text-white shadow-sm"
                      : "text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white"
                  }`}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span
                    className={`flex min-w-0 items-center ${
                      isCollapsed ? "justify-center" : "gap-2.5"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`size-[18px] shrink-0 ${
                        item.active ? "text-white" : "text-[#52525B]"
                      }`}
                    />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </span>
                  {!isCollapsed && item.badge && (
                    <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                  {!isCollapsed && item.count && (
                    <span className="shrink-0 font-mono text-[11px] text-[#71717A]">
                      {item.count}
                    </span>
                  )}
                  {!isCollapsed && item.flag && (
                    <StatusPill tone="danger">{item.flag}</StatusPill>
                  )}
                  {!isCollapsed && item.health && (
                    <span className="shrink-0 font-mono text-[11px] font-medium text-[#4ADE80]">
                      {item.health}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        <div
          className={`border-t border-[#232328] bg-[#121215] p-3 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <div
            className={`flex items-center gap-2 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!isCollapsed && (
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#3A3A40] bg-[#27272B] text-xs font-semibold text-white">
                  TC
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[13px] font-semibold leading-tight text-white">
                    Tanvir Chowdhury
                  </span>
                  <span className="truncate font-mono text-[10px] leading-tight text-[#71717A]">
                    Platform Admin #01
                  </span>
                </div>
              </div>
            )}
            <button
              aria-label="Sign out"
              className="flex size-8 shrink-0 items-center justify-center rounded text-[#52525B] transition-colors hover:bg-[#1A1A1E] hover:text-white"
              title="Sign out"
              type="button"
            >
              <LogOut aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <main className="flex-1 min-w-0 w-full p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1440px] min-w-0">
          <header className="mb-6 flex min-w-0 flex-col gap-4">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-medium tracking-wider text-[#71717A]">
                  ADMIN / VERIFICATION QUEUE
                </span>
                <h1 className="text-[25px] font-semibold tracking-tight text-white sm:text-[28px]">
                  Company Verification Queue
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  aria-label="Search"
                  className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
                  type="button"
                >
                  <Search aria-hidden="true" className="size-[18px]" />
                </button>
                <button
                  aria-label="Export Audit Log"
                  className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
                  type="button"
                >
                  <ArrowDownToLine aria-hidden="true" className="size-[18px]" />
                </button>
                <button
                  aria-label="Dark mode enabled"
                  className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA]"
                  type="button"
                >
                  <span className="size-3 rounded-full bg-[#D4621A]" />
                </button>
              </div>
            </div>
          </header>

          <section
            aria-label="Verification queue metrics"
            className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {metrics.map((metric) => (
              <MetricCard key={metric.title} metric={metric} />
            ))}
          </section>

          <section className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-3">
            <div className="min-w-0 space-y-4 xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-white">
                    Pending Triage Dossiers (3)
                  </h2>
                  <span className="size-1.5 rounded-full bg-[#D4621A]" />
                </div>
                <span className="font-mono text-[11px] tracking-wider text-[#71717A]">
                  SLA: SORTED BY ARRIVAL
                </span>
              </div>

              <article className="relative overflow-hidden rounded-xl border-2 border-[#D4621A] bg-[#151518] p-4 pt-8 shadow-lg sm:p-5 sm:pt-8">
                <div className="absolute right-0 top-0 rounded-bl bg-[#D4621A] px-3 py-0.5 font-mono text-[10px] font-bold text-white">
                  SELECTED FOR AUDIT
                </div>
                <CompanyMeta
                  company="Therap (BD) Ltd."
                  domain="therapservices.net"
                  name="Farhan Ahmed"
                  plan="Recruiter Starter (৳2,000/mo webhook confirmed)"
                  role="Lead Tech Recruiter"
                  submitted="Today, 11:20 AM (Asia/Dhaka)"
                />

                <div className="mb-4 space-y-3 rounded-lg border border-[#27272C] bg-[#17171B] p-4">
                  <div className="relative flex items-start gap-3 after:absolute after:bottom-[-12px] after:left-[13px] after:top-7 after:w-px after:bg-[#27272C]">
                    <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-[#1A3D2C] bg-[#13281E] text-[#4ADE80]">
                      <Check aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold text-white">
                          Check 1: Enterprise Legitimacy
                        </span>
                        <StatusPill tone="success">PASSED REGISTRY</StatusPill>
                      </div>
                      <div className="flex min-w-0 flex-wrap gap-2">
                        <CheckBadge>
                          <BadgeCheck aria-hidden="true" className="size-3.5 text-[#4ADE80]" />
                          Trade License 2026 (#TR-88219)
                        </CheckBadge>
                        <CheckBadge>
                          <Building2 aria-hidden="true" className="size-3.5 text-[#4ADE80]" />
                          RJSC Incorporation CERTIFIED
                        </CheckBadge>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-3">
                    <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-[#44301B] bg-[#2C2114] text-[#E5933A]">
                      <Hourglass aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold text-white">
                          Check 2: Recruiter Authority &amp; Affiliation
                        </span>
                        <StatusPill tone="warning">AUTHORIZATION PENDING</StatusPill>
                      </div>
                      <div className="flex min-w-0 flex-wrap gap-2">
                        <CheckBadge>
                          <MailCheck aria-hidden="true" className="size-3.5 text-[#4ADE80]" />
                          Corporate Email Auth CONFIRMED (farhan@therapservices.net)
                        </CheckBadge>
                        <CheckBadge tone="warning">
                          <Hourglass aria-hidden="true" className="size-3.5" />
                          Authorization Letter: Pending Admin Sign-Off
                        </CheckBadge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#222227] pt-2 text-[11px] text-[#71717A]">
                    <span className="flex min-w-0 flex-wrap items-center gap-2 break-words font-mono">
                      <Terminal aria-hidden="true" className="size-3.5 shrink-0 text-[#4ADE80]" />
                      BullMQ DNS TXT Proofline verified:
                      <code className="break-all text-[#A1A1AA]">_talentgraph-challenge=77f201d4a8</code>
                    </span>
                    <span className="font-mono text-[#4ADE80]">Direct Match</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                  <button
                    className="rounded-lg border border-[#27272C] bg-[#161619] px-3.5 py-2 text-[13px] font-medium text-[#D4D4D8] transition-colors hover:bg-[#202024]"
                    type="button"
                  >
                    Request Evidence
                  </button>
                  <button
                    className="rounded-lg border border-[#27272C] bg-[#161619] px-3.5 py-2 text-[13px] font-medium text-[#D4D4D8] transition-colors hover:bg-[#202024]"
                    type="button"
                  >
                    Inspect Documents
                  </button>
                  <button
                    className="flex items-center gap-1.5 rounded-lg bg-[#D4621A] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#BF5313]"
                    type="button"
                  >
                    <Lock aria-hidden="true" className="size-4" />
                    Approve Both &amp; Unlock
                  </button>
                </div>
              </article>

              <article className="rounded-xl border border-[#25252A] bg-[#151518] p-4 transition-colors hover:border-[#333338] sm:p-5">
                <CompanyMeta
                  company="TigerIT Bangladesh Ltd."
                  domain="tigerit.com"
                  name="Sadia Rahman"
                  plan="Recruiter Growth (৳5,000/mo webhook confirmed)"
                  role="VP Engineering & Talent"
                  submitted="Yesterday, 4:45 PM"
                />
                <div className="mb-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-[#25252A] bg-[#17171B] p-2.5">
                    <span className="text-[#A1A1AA]">Check 1: Enterprise Legitimacy</span>
                    <StatusPill tone="warning">RJSC PENDING</StatusPill>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-[#25252A] bg-[#17171B] p-2.5">
                    <span className="text-[#A1A1AA]">Check 2: Recruiter Authority</span>
                    <StatusPill tone="success">CLEAR</StatusPill>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-mono text-[11px] text-[#71717A]">
                    Missing certified RJSC Form XII filing copy
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      className="rounded-lg border border-[#27272C] bg-[#161619] px-3 py-1.5 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#202024]"
                      type="button"
                    >
                      Request More Info
                    </button>
                    <button
                      className="rounded-lg border border-[#27272C] bg-[#161619] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#202024]"
                      type="button"
                    >
                      Review Artifacts
                    </button>
                  </div>
                </div>
              </article>

              <article className="rounded-xl border border-[#25252A] bg-[#151518] p-4 transition-colors hover:border-[#333338] sm:p-5">
                <CompanyMeta
                  company="NeuralByte Labs"
                  domain="neuralbyte.io (founder@gmail.com)"
                  domainWarning
                  name="Tanvir Kabir"
                  plan="Sec 10 Startup Exception Packet"
                  role="Co-founder"
                  startup
                  submitted="Today, 09:10 AM"
                />
                <div className="mb-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-[#25252A] bg-[#17171B] p-2.5">
                    <span className="text-[#A1A1AA]">Check 1: Legitimacy</span>
                    <StatusPill tone="warning">STARTUP DEED PROVIDED</StatusPill>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-[#25252A] bg-[#17171B] p-2.5">
                    <span className="text-[#A1A1AA]">Check 2: Recruiter Authority</span>
                    <StatusPill tone="neutral">GENERIC DOMAIN EXCEPTION</StatusPill>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[11px] text-[#71717A]">
                    Requires 2-admin dual sign-off under Sec 10.4 Startup Exemption policy
                  </span>
                  <button
                    className="shrink-0 rounded-lg border border-[#27272C] bg-[#161619] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#202024]"
                    type="button"
                  >
                    Triage Startup Packet
                  </button>
                </div>
              </article>
            </div>

            <aside className="min-w-0 xl:sticky xl:top-6 xl:col-span-1">
              <div className="flex flex-col gap-5 rounded-xl border border-[#25252A] bg-[#151518] p-4 shadow-md sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#222227] pb-3">
                  <div>
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#D4621A]">
                      DUAL AUDIT INSPECTOR
                    </span>
                    <h2 className="mt-0.5 text-[15px] font-semibold text-white">
                      #TR-89214: Therap (BD) Ltd.
                    </h2>
                  </div>
                  <StatusPill tone="warning">1 of 2 Approved</StatusPill>
                </div>

                <section aria-labelledby="artifacts-heading" className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 id="artifacts-heading" className="text-xs font-medium text-white">
                      Submitted Verification Artifacts
                    </h3>
                    <span className="font-mono text-[11px] text-[#71717A]">3 files</span>
                  </div>
                  {artifacts.map((artifact) => {
                    const Icon = artifact.icon;
                    return (
                      <div
                        key={artifact.file}
                        className={`flex items-center justify-between gap-2 rounded-lg border bg-[#17171B] p-2.5 text-xs ${
                          artifact.tone === "warning"
                            ? "border-[#44301B]"
                            : "border-[#27272C]"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={`flex size-7 shrink-0 items-center justify-center rounded border ${
                              artifact.tone === "warning"
                                ? "border-[#44301B] bg-[#2C2114] text-[#E5933A]"
                                : "border-[#2B2B32] bg-[#1F1F24] text-[#4ADE80]"
                            }`}
                          >
                            <Icon aria-hidden="true" className="size-4" />
                          </span>
                          <span className="flex min-w-0 flex-col">
                            <span className="truncate text-xs font-medium text-white">
                              {artifact.file}
                            </span>
                            <span
                              className={`font-mono text-[10px] ${
                                artifact.tone === "warning"
                                  ? "text-[#E5933A]"
                                  : "text-[#71717A]"
                              }`}
                            >
                              {artifact.detail}
                            </span>
                          </span>
                        </div>
                        <button
                          aria-label={artifact.ariaLabel}
                          className="flex size-7 shrink-0 items-center justify-center rounded text-[#A1A1AA] transition-colors hover:bg-[#1A1A1E] hover:text-white"
                          type="button"
                        >
                          <Eye aria-hidden="true" className="size-4" />
                        </button>
                      </div>
                    );
                  })}
                </section>

                <section
                  aria-labelledby="signoff-heading"
                  className="space-y-3 border-t border-[#222227] pt-4"
                >
                  <h3 id="signoff-heading" className="text-xs font-medium text-white">
                    Mandatory Dual-Check Signoff
                  </h3>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#27272C] bg-[#17171B] p-2.5 transition-colors hover:bg-[#1A1A1E]">
                    <input
                      checked={legalEntityVerified}
                      className="mt-0.5 size-4 rounded border-[#3F3F46] bg-[#161619] accent-[#D4621A] focus:ring-0 focus:ring-offset-0"
                      onChange={(event) => setLegalEntityVerified(event.target.checked)}
                      type="checkbox"
                    />
                    <span className="flex flex-col">
                      <span className="text-xs font-medium leading-tight text-white">
                        1. Enterprise Legal Entity Verified
                      </span>
                      <span className="mt-0.5 text-[11px] text-[#71717A]">
                        RJSC &amp; Trade License matched with certified government records.
                      </span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#44301B] bg-[#17171B] p-2.5 transition-colors hover:bg-[#1A1A1E]">
                    <input
                      checked={recruiterAffiliationVerified}
                      className="mt-0.5 size-4 rounded border-[#3F3F46] bg-[#161619] accent-[#D4621A] focus:ring-0 focus:ring-offset-0"
                      onChange={(event) =>
                        setRecruiterAffiliationVerified(event.target.checked)
                      }
                      type="checkbox"
                    />
                    <span className="flex flex-col">
                      <span className="text-xs font-medium leading-tight text-white">
                        2. Recruiter Affiliation Legally Established
                      </span>
                      <span className="mt-0.5 text-[11px] text-[#71717A]">
                        Confirmed corporate domain DNS handshake OR certified company letter.
                      </span>
                    </span>
                  </label>
                </section>

                <div className="space-y-1.5">
                  <label
                    className="flex items-center justify-between gap-2 text-xs font-medium text-white"
                    htmlFor="audit-rationale"
                  >
                    <span>Audit Trail Rationale</span>
                    <span className="font-mono text-[10px] text-[#71717A]">
                      Mandatory under ISO-27001
                    </span>
                  </label>
                  <textarea
                    className="w-full resize-none rounded-lg border border-[#27272C] bg-[#161619] p-2.5 text-xs text-[#D4D4D8] placeholder:text-[#71717A] focus:border-[#D4621A] focus:outline-none"
                    id="audit-rationale"
                    onChange={(event) => setRationale(event.target.value)}
                    placeholder="Enter justification for manual signoff or evidence request..."
                    rows={3}
                    value={rationale}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 border-t border-[#222227] pt-4 sm:grid-cols-2">
                  <button
                    className="rounded-lg border border-[#27272C] bg-[#161619] px-3 py-2.5 text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#202024]"
                    type="button"
                  >
                    Request Clarification
                  </button>
                  <button
                    className="rounded-lg bg-[#D4621A] px-3 py-2.5 text-center text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#BF5313]"
                    type="button"
                  >
                    Commit Verification Decision
                  </button>
                </div>
              </div>
            </aside>
          </section>
          </div>
        </main>

        <footer className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-2 border-t border-[#1C1C20] bg-[#121215] px-4 py-3 text-center text-[11px] text-[#71717A] sm:text-left">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#4ADE80]" />
            <span className="min-w-0 break-words">
              TalentGraph governance shell • All actions are audited with cryptographic
              SHA-256 integrity
            </span>
          </div>
          <a
            className="flex flex-wrap items-center justify-center gap-1.5 transition-colors hover:text-[#A1A1AA]"
            href="mailto:security@talentgraph.example"
          >
            <Lock aria-hidden="true" className="size-3.5" />
            Need help? Contact platform security
            <CircleHelp aria-hidden="true" className="size-3.5" />
          </a>
        </footer>
      </div>
    </div>
  );
}