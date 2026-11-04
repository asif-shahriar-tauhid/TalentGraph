"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  LayoutGrid,
  LogOut,
  Search,
  ShieldCheck,
  ShieldAlert,
  Sun,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

type ThroughputRange = "7D" | "30D" | "90D";

const throughput = {
  "7D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    approved: [25, 32, 28, 44, 37, 49, 54],
    flagged: [8, 12, 10, 14, 9, 16, 12],
    approvedTotal: 239,
    flaggedTotal: 27,
  },
  "30D": {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    approved: [28, 35, 31, 46, 42, 51, 58],
    flagged: [9, 11, 8, 15, 12, 10, 14],
    approvedTotal: 1_042,
    flaggedTotal: 118,
  },
  "90D": {
    labels: ["Aug 1", "Aug 15", "Sep 1", "Sep 15", "Oct 1", "Oct 15", "Oct 31"],
    approved: [24, 33, 40, 35, 47, 52, 59],
    flagged: [7, 13, 11, 16, 10, 14, 12],
    approvedTotal: 3_186,
    flaggedTotal: 342,
  },
} satisfies Record<
  ThroughputRange,
  {
    labels: string[];
    approved: number[];
    flagged: number[];
    approvedTotal: number;
    flaggedTotal: number;
  }
>;

const auditEvents = [
  {
    title: "Company #8821 verified",
    time: "2 min ago",
    icon: Check,
    tone: "success",
  },
  {
    title: "Integrity case INT-204 flagged",
    time: "18 min ago",
    icon: ShieldAlert,
    tone: "danger",
  },
  {
    title: "Payment webhook reconciled",
    time: "41 min ago",
    icon: WalletCards,
    tone: "warning",
  },
] as const;

const queueComposition = [
  { label: "Company checks", percent: 38, color: "bg-[#D4621A]" },
  { label: "Integrity review", percent: 22, color: "bg-rose-500" },
  { label: "Job moderation", percent: 28, color: "bg-amber-400" },
  { label: "Payments", percent: 12, color: "bg-emerald-400" },
];

function makeLinePath(values: number[]) {
  return values
    .map((value, index) => {
      const x = 26 + (index * 648) / (values.length - 1);
      const y = 12 + ((60 - value) / 60) * 132;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export default function AdminDashboardPage() {
  const [range, setRange] = useState<ThroughputRange>("7D");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { logout, logoutPending } = useAuth();
  const { toggleTheme } = useTheme();

  const chartData = throughput[range];
  const filteredEvents = useMemo(
    () =>
      auditEvents.filter((event) =>
        `${event.title} ${event.time}`
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()),
      ),
    [searchTerm],
  );

  const exportAuditEvents = () => {
    const csvRows = [
      ["Event", "Time"],
      ...auditEvents.map((event) => [event.title, event.time]),
    ];
    const csv = csvRows
      .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "talentgraph-audit-events.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const sidebarNavigation = [
    { label: "Operational Queue", href: "#operational-queue", icon: LayoutGrid, active: true },
    { label: "Company Verification", href: "#verification", icon: ShieldCheck, badge: "3" },
    { label: "User Directory", href: "#users", icon: Users, badge: "1,482" },
    { label: "Jobs Moderation", href: "#moderation", icon: BriefcaseBusiness, badge: "28" },
    { label: "Integrity Cases", href: "#integrity", icon: ShieldAlert, badge: "2 flagged", badgeClassName: "text-rose-400" },
    { label: "Worker Telemetry", href: "#telemetry", icon: Zap, badge: "99.8%", badgeClassName: "text-emerald-400" },
    { label: "BDT Subscriptions", href: "#subscriptions", icon: CreditCard, badge: "৳34.5k" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0D0D0F] text-[#A1A1AA]">
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-[#222226] bg-[#121215] p-4 max-md:w-16 max-md:px-2">
        <div className="space-y-5">
          <div className="flex items-center gap-3 px-1 max-md:justify-center max-md:px-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E56218] text-sm font-bold tracking-tight text-white shadow-md">
              TG
            </div>
            <div className="min-w-0 max-md:hidden">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold tracking-wide text-white">
                  TalentGraph
                </span>
                <span className="rounded bg-[#2a2a2e] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#b3b3b3]">
                  ADMIN
                </span>
              </div>
              <div className="text-[11px] text-[#71717A]">
                Operational control
              </div>
            </div>
          </div>

          <nav aria-label="Admin navigation" className="space-y-1 text-sm font-medium">
            {sidebarNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 transition max-md:justify-center max-md:px-2 ${
                    item.active
                      ? "bg-[#D4621A] text-white shadow-sm"
                      : "text-zinc-400 hover:bg-[#1a1a1e] hover:text-white"
                  }`}
                  href={item.href}
                  key={item.label}
                  title={item.label}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon
                      aria-hidden="true"
                      className={`size-4 shrink-0 ${
                        item.active ? "text-white" : "text-zinc-400"
                      }`}
                    />
                    <span className="truncate text-[13px] max-md:hidden">
                      {item.label}
                    </span>
                  </span>
                  {item.badge && (
                    <span
                      className={`shrink-0 font-mono text-xs max-md:hidden ${
                        item.badgeClassName ?? "text-zinc-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-[#232328] pt-4">
          <div className="flex min-w-0 items-center gap-2.5 overflow-hidden max-md:justify-center">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#3A3A40] bg-[#27272B] text-xs font-semibold text-zinc-300">
              TC
            </div>
            <div className="truncate max-md:hidden">
              <div className="truncate text-[13px] font-semibold leading-tight text-white">
                Tanvir Chowdhury
              </div>
              <div className="text-[10px] leading-tight text-[#71717A]">
                Platform Admin #01
              </div>
            </div>
          </div>
          <button
            aria-label="Sign out"
            className="shrink-0 p-1 text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={logoutPending}
            onClick={logout}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-4" />
          </button>
        </div>
      </aside>

      <main
        className="min-h-screen min-w-0 flex-1 overflow-y-auto bg-[#0D0D0F] px-5 py-6 sm:px-8 sm:py-7"
        id="operational-queue"
      >
      <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 border-b border-[#222226] pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[11px] tracking-wider text-[#71717A]">
            <span>ADMIN</span>
            <span>/</span>
            <span className="font-semibold text-[#A1A1AA]">OVERVIEW</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Operational governance
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {searchOpen && (
            <label className="flex h-9 items-center gap-2 rounded-lg border border-[#27272C] bg-[#161619] px-3">
              <Search aria-hidden="true" className="size-4 text-[#71717A]" />
              <input
                autoFocus
                className="w-40 bg-transparent text-xs text-white outline-none placeholder:text-[#71717A] sm:w-52"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search audit events"
                value={searchTerm}
              />
            </label>
          )}
          <button
            aria-label={searchOpen ? "Close audit search" : "Search audit events"}
            className="flex size-8 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition hover:bg-[#202024] hover:text-white"
            onClick={() => {
              setSearchOpen((open) => !open);
              setSearchTerm("");
            }}
            type="button"
          >
            <Search aria-hidden="true" className="size-4" />
          </button>
          <button
            aria-label="Export audit events"
            className="flex size-8 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition hover:bg-[#202024] hover:text-white"
            onClick={exportAuditEvents}
            title="Export audit events"
            type="button"
          >
            <ArrowDownToLine aria-hidden="true" className="size-3.5" />
          </button>
          <button
            aria-label="Toggle display theme"
            className="flex size-8 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-zinc-400 transition hover:bg-[#202024] hover:text-white"
            onClick={toggleTheme}
            title="Toggle display theme"
            type="button"
          >
            <Sun aria-hidden="true" className="size-4" />
          </button>
        </div>
      </header>

      <section
        aria-label="Operational metrics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {[
          {
            label: "Company verification",
            value: "3",
            detail: "Pending approvals",
            status: "Dual check",
            icon: FileText,
            statusClass: "border-[#44301B] bg-[#2C2114] text-[#E5933A]",
          },
          {
            label: "Integrity flags",
            value: "2",
            detail: "Active flagged cases",
            status: "Human review",
            icon: ShieldAlert,
            statusClass: "border-[#482026] bg-[#2E181D] text-[#F87171]",
          },
          {
            label: "Background ingestion",
            value: "18",
            detail: "Jobs active / 1 retry",
            status: "BullMQ live",
            icon: Zap,
            statusClass: "border-[#1A3D2C] bg-[#13281E] text-[#4ADE80]",
          },
          {
            label: "Webhook revenue",
            value: "৳34,500",
            detail: "Verified BDT this month",
            status: "+18.4%",
            icon: CreditCard,
            statusClass: "border-[#1A3D2C] bg-[#13281E] text-[#4ADE80]",
          },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              className="flex flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4"
              key={metric.label}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-zinc-400">
                  {metric.label}
                </span>
                <div className="flex size-7 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24] text-zinc-400">
                  <Icon aria-hidden="true" className="size-3.5" />
                </div>
              </div>
              <div className="my-2 text-2xl font-bold tracking-tight text-white">
                {metric.value}
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-[#222227] pt-2">
                <span className="text-[11px] text-zinc-400">{metric.detail}</span>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${metric.statusClass}`}
                >
                  {metric.status}
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <article className="flex flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-5 xl:col-span-8">
          <div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-white">
                  Review throughput
                </h2>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Approvals and integrity flags processed by day
                </p>
              </div>
              <div
                aria-label="Throughput date range"
                className="flex items-center gap-1 rounded-lg border border-[#2c2c32] bg-[#1c1c20] p-1"
                role="group"
              >
                {(["7D", "30D", "90D"] as const).map((option) => (
                  <button
                    aria-pressed={range === option}
                    className={`rounded px-2.5 py-1 text-[11px] font-medium transition ${
                      range === option
                        ? "bg-[#D4621A] font-semibold text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    key={option}
                    onClick={() => setRange(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="relative pl-9">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between pb-1 font-mono text-[10px] text-zinc-500">
                  {[60, 45, 30, 15, 0].map((tick) => (
                    <span key={tick}>{tick}</span>
                  ))}
                </div>
                <svg
                  aria-label={`Review throughput for the last ${range}`}
                  className="h-44 w-full overflow-visible"
                  preserveAspectRatio="none"
                  role="img"
                  viewBox="0 0 700 160"
                >
                  {[12, 45, 78, 111, 144].map((y, index) => (
                    <line
                      key={y}
                      stroke={index === 4 ? "#2a2a30" : "#25252a"}
                      strokeDasharray={index === 4 ? undefined : "4 5"}
                      strokeWidth="1"
                      x1="26"
                      x2="674"
                      y1={y}
                      y2={y}
                    />
                  ))}
                  <path
                    d={makeLinePath(chartData.approved)}
                    fill="none"
                    stroke="#E56218"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <path
                    d={makeLinePath(chartData.flagged)}
                    fill="none"
                    stroke="#F43F5E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  {chartData.approved.map((value, index) => {
                    const x = 26 + (index * 648) / (chartData.approved.length - 1);
                    const y = 12 + ((60 - value) / 60) * 132;
                    return (
                      <circle
                        cx={x}
                        cy={y}
                        fill="#151518"
                        key={`${range}-approved-${index}`}
                        r="3"
                        stroke="#E56218"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="ml-9 flex justify-between pr-1 pt-2 font-mono text-[10px] text-zinc-500">
                {chartData.labels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#222227] pt-4 text-xs">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#E56218]" />
                <span className="text-zinc-400">Approved</span>
                <span className="font-semibold text-white">
                  {chartData.approvedTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-rose-500" />
                <span className="text-zinc-400">Flagged</span>
                <span className="font-semibold text-white">
                  {chartData.flaggedTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span>12.8% vs previous period</span>
            </div>
          </div>
        </article>

        <article className="flex flex-col rounded-xl border border-[#25252A] bg-[#151518] p-5 xl:col-span-4">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-white">
              Queue composition
            </h2>
            <p className="mt-0.5 text-xs text-zinc-400">
              Open work by operational queue
            </p>
          </div>
          <div
            aria-label="Queue distribution"
            className="mt-6 flex h-2 overflow-hidden rounded-full bg-[#25252A]"
            role="img"
          >
            {queueComposition.map((queue) => (
              <span
                className={queue.color}
                key={queue.label}
                style={{ width: `${queue.percent}%` }}
                title={`${queue.label}: ${queue.percent}%`}
              />
            ))}
          </div>
          <div className="my-auto space-y-4 py-5">
            {queueComposition.map((queue) => (
              <div
                className="flex items-center justify-between text-xs"
                key={queue.label}
              >
                <span className="text-zinc-300">{queue.label}</span>
                <span className="font-mono text-[13px] text-zinc-400">
                  {queue.percent}%
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <article className="flex flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-5 xl:col-span-7">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-white">
                  Worker health
                </h2>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Real-time background processing
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1A3D2C] bg-[#13281E] px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                99.8% uptime
              </span>
            </div>
            <div className="mt-6 mb-5 grid grid-cols-3 gap-4">
              {[
                { value: "18", label: "Active jobs" },
                { value: "420ms", label: "Median latency" },
                { value: "1", label: "Retriable job", highlight: true },
              ].map((metric) => (
                <div key={metric.label}>
                  <div
                    className={`text-2xl font-bold tracking-tight ${
                      metric.highlight ? "text-[#E5933A]" : "text-white"
                    }`}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-[#222227] pt-4">
            <div
              aria-label="Recent worker activity"
              className="flex h-14 w-44 items-end gap-2"
              role="img"
            >
              {[50, 40, 65, 85, 55, 80].map((height, index) => (
                <span
                  className="w-4 rounded-t-sm bg-[#D4621A]"
                  key={index}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </article>

        <article
          className="flex flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-5 xl:col-span-5"
          id="audit-events"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-white">
              Recent audit events
            </h2>
            <p className="mt-0.5 text-xs text-zinc-400">
              Latest governance activity
            </p>
          </div>
          <div className="my-3 space-y-2">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const Icon = event.icon;
                const toneClasses = {
                  success: "border-[#1A3D2C] bg-[#13281E] text-emerald-400",
                  danger: "border-[#482026] bg-[#2E181D] text-rose-400",
                  warning: "border-[#442B1A] bg-[#2B1D14] text-[#E5933A]",
                }[event.tone];
                return (
                  <a
                    className="group flex items-center justify-between rounded-lg p-2 transition hover:bg-[#1a1a1e]"
                    href="#audit-events"
                    key={event.title}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${toneClasses}`}
                      >
                        <Icon aria-hidden="true" className="size-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white transition group-hover:text-[#E5933A]">
                          {event.title}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {event.time}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 text-zinc-600 transition group-hover:text-zinc-400"
                    />
                  </a>
                );
              })
            ) : (
              <p className="py-5 text-center text-xs text-zinc-500">
                No audit events match “{searchTerm}”.
              </p>
            )}
          </div>
        </article>
      </section>

      <footer className="flex flex-col items-center justify-between gap-2 border-t border-[#1C1C20] pt-4 text-[11px] text-zinc-500 sm:flex-row">
        <div className="flex items-center gap-1.5">
          <span>TalentGraph governance shell</span>
          <span>•</span>
          <span>All actions are audited</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleHelp aria-hidden="true" className="size-3.5" />
          <span>Need help? Contact platform security</span>
          <BadgeCheck aria-hidden="true" className="ml-1 size-3.5" />
        </div>
      </footer>
      </div>
      </main>
    </div>
  );
}
