'use client';

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  BriefcaseBusiness,
  Building2,
  Check,
  Clock3,
  Code2,
  Database,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Moon,
  PauseCircle,
  Play,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Users,
  Wallet,
  Workflow,
  XCircle,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

type QueueGroup = "ast" | "cv" | "github" | "assessment" | "dlq";
type QueueFilter = "all" | QueueGroup;

interface WorkerQueue {
  id: string;
  name: string;
  cluster: string;
  pipeline: string;
  description: string;
  group: QueueGroup;
  active: number;
  concurrency: number;
  latency: number;
  p95: number;
  retries: number;
  recovery: string;
  health: string;
}

const workerQueues: WorkerQueue[] = [];

const navigationItems = [
  { label: "Operational Queue", href: "/admin", icon: LayoutDashboard },
  { label: "Company Verification", href: "/admin/company-verification", icon: Building2 },
  { label: "User Directory", href: "/admin/user-directory", icon: Users },
  { label: "Jobs Moderation", href: "/admin/jobs-moderation", icon: BriefcaseBusiness },
  { label: "Integrity Cases", href: "/admin/integrity-cases", icon: ShieldAlert },
  { label: "Worker Telemetry", href: "/admin/worker-telemetry", icon: Activity },
  { label: "BDT Subscriptions", href: "/admin#subscriptions", icon: Wallet },
];

const queueTabs: { id: QueueFilter; label: string }[] = [
  { id: "all", label: "All Queues" },
  { id: "ast", label: "AST Code Analysis" },
  { id: "cv", label: "CV Parsing & OCR" },
  { id: "github", label: "GitHub Sync Daemon" },
  { id: "assessment", label: "Assessment Telemetry" },
  { id: "dlq", label: "Dead-Letter Queue" },
];

const metrics = [
  { label: "Active BullMQ Workers", value: "0", detail: "No connected worker processes", icon: Workflow },
  { label: "Task Ingestion Throughput", value: "0/m", detail: "No ingestion events received", icon: Activity },
  { label: "Median Job Latency (P50)", value: "0ms", detail: "No completed jobs to measure", icon: Clock3 },
  { label: "Dead-Letter / Retriable Queue", value: "0", detail: "No retry or dead-letter records", icon: AlertTriangle },
];

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();
}

export default function WorkerTelemetryPage() {
  const [queueFilter, setQueueFilter] = useState<QueueFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedQueue, setSelectedQueue] = useState<WorkerQueue | null>(null);
  const [justification, setJustification] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { user, logout, logoutPending, isLoading } = useAuth();
  const { toggleTheme, resolvedTheme } = useTheme();
  const shellUser = user ?? { name: "Administrator", role: "ADMIN" as const };
  const isPreviewSession = !user;

  const filteredQueues = useMemo(() => {
    const query = search.trim().toLowerCase();
    return workerQueues.filter((queue) => {
      const matchesFilter = queueFilter === "all" || queue.group === queueFilter;
      const matchesSearch =
        !query ||
        `${queue.name} ${queue.cluster} ${queue.pipeline} ${queue.description}`
          .toLowerCase()
          .includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [queueFilter, search]);

  const exportQueues = () => {
    const content = filteredQueues.map((queue) => JSON.stringify(queue)).join("\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "application/x-ndjson" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "talentgraph-worker-telemetry.jsonl";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const resetFilters = () => {
    setQueueFilter("all");
    setSearch("");
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#0D0D0F] text-[#D4D4D8] selection:bg-[#D4621A]/30 selection:text-white">
      <aside
        className="sticky top-0 z-40 flex h-screen flex-shrink-0 flex-col justify-between border-r border-[#222226] bg-[#121215] p-2 transition-all duration-300 w-16 md:w-64 md:p-3"
      >
        <div className="flex min-h-0 flex-col gap-5">
          <div className="flex h-12 items-center justify-center md:justify-start md:px-1">
            <Link
              aria-label="TalentGraph home"
              className="flex min-w-0 cursor-pointer items-center justify-center gap-2.5 transition-opacity hover:opacity-80 md:justify-start"
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

          <nav aria-label="Admin navigation" className="min-h-0 space-y-1 overflow-y-auto">
            {navigationItems.map(({ label, href, icon: Icon }) => {
              const active = label === "Worker Telemetry";
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-center gap-3 rounded-lg px-0 py-2.5 text-[13px] font-medium transition-colors md:justify-start md:px-3 ${
                    active
                      ? "bg-[#D4621A] text-white"
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
                    <span className="hidden rounded bg-black/20 px-1.5 py-0.5 font-mono text-[9px] text-white/90 md:inline">
                      99.8%
                    </span>
                  )}
                  {active && (
                    <span className="sr-only">99.8% health</span>
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
                {isPreviewSession
                  ? isLoading
                    ? "Loading admin session..."
                    : "ADMIN · UI preview"
                  : shellUser.role}
              </span>
            </span>
          </div>
          <button
            aria-label={isPreviewSession ? "Sign out unavailable in preview" : "Sign out"}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#27272C] py-2 text-xs text-[#A1A1AA] transition-colors hover:border-[#482026] hover:bg-[#2E181D] hover:text-[#F87171] disabled:opacity-50 md:px-3"
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

      <div className="flex min-w-0 w-full flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-[#222227] bg-[#0D0D0F]/95 px-4 py-4 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
              <span>Admin</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#D4621A]">Worker Telemetry</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Worker Telemetry &amp; Background Ingestion
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Focus worker queue search"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={() => searchRef.current?.focus()}
              title="Search telemetry buffer"
              type="button"
            >
              <Search aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Export worker telemetry JSONL"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={exportQueues}
              title="Export ingestion metrics"
              type="button"
            >
              <ArrowDownToLine aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
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
            aria-label="Worker telemetry metrics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {metrics.map(({ label, value, detail, icon: Icon }) => (
              <article
                className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4"
                key={label}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-[#A1A1AA]">{label}</p>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24] text-[#D4621A]">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                </div>
                <p className="my-2 font-mono text-2xl font-bold tracking-tight text-white">
                  {value}
                </p>
                <p className="border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">
                  {detail}
                </p>
              </article>
            ))}
          </section>

          <section
            aria-label="Worker queues"
            className="min-w-0 overflow-hidden rounded-xl border border-[#25252A] bg-[#151518]"
          >
            <div className="flex flex-col gap-3 border-b border-[#222227] p-3 lg:flex-row lg:items-center lg:justify-between lg:p-4">
              <div
                aria-label="Filter worker queues"
                className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:pb-0"
                role="tablist"
              >
                {queueTabs.map(({ id, label }) => (
                  <button
                    aria-selected={queueFilter === id}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors sm:text-xs ${
                      queueFilter === id
                        ? "bg-[#D4621A] text-white shadow-sm"
                        : "border border-[#27272C] bg-[#161619] text-[#A1A1AA] hover:bg-[#202024] hover:text-white"
                    }`}
                    key={id}
                    onClick={() => setQueueFilter(id)}
                    role="tab"
                    type="button"
                  >
                    {label}
                    <span className="ml-1 font-mono text-[10px] opacity-75">
                      {workerQueues.filter(
                        (queue) => id === "all" || queue.group === id,
                      ).length}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
                <label className="relative min-w-0 flex-1 sm:w-48 sm:flex-none">
                  <span className="sr-only">Search worker queues</span>
                  <Search
                    aria-hidden="true"
                    className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]"
                  />
                  <input
                    className="h-9 w-full rounded-lg border border-[#27272C] bg-[#161619] py-2 pl-8 pr-3 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A]"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search queues"
                    ref={searchRef}
                    type="search"
                    value={search}
                  />
                </label>
                <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] text-[#71717A]">
                  <span className="size-1.5 rounded-full bg-[#71717A]" />
                  Live socket: awaiting connection
                </span>
                <button
                  className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs font-medium text-[#71717A] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled
                  title="Unavailable until a Redis cluster is connected"
                  type="button"
                >
                  <RefreshCw aria-hidden="true" className="size-3.5" />
                  Sync redis cluster
                </button>
                <button
                  className="h-9 rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs text-[#A1A1AA] hover:text-white"
                  onClick={resetFilters}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="w-full min-w-0 overflow-x-auto">
              <table className="w-full min-w-[1120px] border-collapse text-left text-xs">
                <thead className="bg-[#121215]/70 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                  <tr className="border-b border-[#222227]">
                    <th className="px-4 py-3 font-medium">Queue Name &amp; Cluster</th>
                    <th className="px-4 py-3 font-medium">Job Type &amp; Pipeline</th>
                    <th className="px-4 py-3 font-medium">Active / Concurrency</th>
                    <th className="px-4 py-3 font-medium">Latency / P95</th>
                    <th className="px-4 py-3 font-medium">Recovery / Retries</th>
                    <th className="px-4 py-3 font-medium">Health &amp; Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222227]">
                  {filteredQueues.length === 0 ? (
                    <tr>
                      <td className="px-4 py-16 text-center" colSpan={7}>
                        <div className="mx-auto flex max-w-md flex-col items-center">
                          <span className="mb-3 flex size-11 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#A1A1AA]">
                            <Database aria-hidden="true" className="size-5" />
                          </span>
                          <h2 className="text-sm font-semibold text-white">
                            {workerQueues.length === 0
                              ? "No background ingestion queues connected"
                              : "No queues match these filters"}
                          </h2>
                          <p className="mt-1 text-xs leading-5 text-[#71717A]">
                            {workerQueues.length === 0
                              ? "BullMQ workers and pipeline stats will stream live here."
                              : "Try another search or reset your filters."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredQueues.map((queue) => (
                      <tr
                        aria-selected={selectedQueue?.id === queue.id}
                        className={`cursor-pointer transition-colors hover:bg-[#1A1A1E] ${
                          selectedQueue?.id === queue.id
                            ? "border-l-2 border-l-[#D4621A] bg-[#1A1A1E]"
                            : ""
                        }`}
                        key={queue.id}
                        onClick={() => setSelectedQueue(queue)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedQueue(queue);
                          }
                        }}
                        tabIndex={0}
                      >
                        <td className="px-4 py-3.5">
                          <span className="block font-mono font-semibold text-white">
                            {queue.name}
                          </span>
                          <span className="text-[10px] text-[#71717A]">
                            Cluster: {queue.cluster}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="block font-medium text-white">{queue.pipeline}</span>
                          <span className="text-[10px] text-[#A1A1AA]">
                            {queue.description}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[#D4D4D8]">
                          <span className="font-semibold text-white">{queue.active} Active</span>
                          <span className="text-[10px] text-[#71717A]">
                            {" "}/ {queue.concurrency} Concurrency
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-white">
                          {queue.latency}ms
                          <span className="text-[10px] text-[#71717A]">
                            {" "}(P95: {queue.p95}ms)
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[#A1A1AA]">
                          {queue.recovery} · {queue.retries} retries
                        </td>
                        <td className="px-4 py-3.5 text-[#A1A1AA]">{queue.health}</td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            aria-label={`Inspect ${queue.name}`}
                            className="inline-flex size-8 items-center justify-center rounded border border-[#2B2B32] bg-[#1F1F24] text-white hover:border-[#D4621A]"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedQueue(queue);
                            }}
                            type="button"
                          >
                            <FileSearch aria-hidden="true" className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-2 border-t border-[#222227] bg-[#121215]/30 px-4 py-3 font-mono text-[10px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {filteredQueues.length} of {workerQueues.length} connected queues
              </span>
              <span>Telemetry sync unavailable · Redis not connected</span>
            </div>
          </section>

          <section
            aria-label="Worker queue inspector"
            className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3"
          >
            {!selectedQueue && (
              <div className="lg:col-span-3 rounded-xl border border-[#25252A] bg-[#151518] px-4 py-4 text-center">
                <p className="text-sm text-[#A1A1AA]">
                  Select a worker queue from the table above to inspect queue dossier and run telemetry controls
                </p>
              </div>
            )}

            <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#25252A] bg-[#151518] p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[#222227] pb-2.5">
                  <div className="flex items-center gap-2">
                    <Database aria-hidden="true" className="size-4 text-[#D4621A]" />
                    <h2 className="text-sm font-semibold text-white">Target Queue Dossier</h2>
                  </div>
                  <span className="rounded border border-[#1A3D2C] bg-[#13281E] px-1.5 py-0.5 font-mono text-[9px] text-[#4ADE80]">
                    Active Focus
                  </span>
                </div>
                <dl className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <dt className="text-[#71717A]">Queue Ref</dt>
                    <dd className="break-all text-right font-mono text-[10px] text-[#A1A1AA]">
                      {selectedQueue?.id ?? "Awaiting queue selection"}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <dt className="text-[#71717A]">Execution Stack</dt>
                    <dd className="text-right font-mono text-[10px] text-[#A1A1AA]">
                      {selectedQueue ? "BullMQ · Redis" : "Awaiting worker telemetry"}
                    </dd>
                  </div>
                </dl>
                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-[#71717A]">Memory Footprint</span>
                    <span className="font-mono text-[#A1A1AA]">
                      {selectedQueue ? "Awaiting worker telemetry" : "0 MB · no worker connected"}
                    </span>
                  </div>
                  <div
                    aria-label="Memory footprint unavailable until a worker connects"
                    className="h-2 overflow-hidden rounded-full border border-[#2C2C32] bg-[#1C1C20]"
                    role="img"
                  >
                    <div className="h-full w-0 bg-[#D4621A]" />
                  </div>
                </div>
                <div className="rounded-lg border border-[#27272C] bg-[#17171B] p-3">
                  <h3 className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold text-[#D4621A]">
                    <ShieldCheck aria-hidden="true" className="size-3.5" />
                    Ingestion Rule Guarantee (Section 11 &amp; 14)
                  </h3>
                  <p className="text-[10px] leading-4 text-[#A1A1AA]">
                    Least-privilege processing; raw repository code must not execute in worker memory. Enforce isolated analysis, SHA-256 fingerprinting, and safe retry semantics.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[#222227] pt-3 font-mono text-[9px] text-[#71717A]">
                <span className="flex items-center gap-1">
                  <Check aria-hidden="true" className={`size-3 ${selectedQueue ? "text-[#4ADE80]" : "text-[#71717A]"}`} />
                  {selectedQueue ? "Queue details loaded" : "Awaiting selection"}
                </span>
                <span>Policy Spec v1.3</span>
              </div>
            </section>

            <section className="flex flex-col gap-3 rounded-xl border border-[#25252A] bg-[#151518] p-4">
              <div className="flex items-center justify-between gap-2 border-b border-[#222227] pb-2.5">
                <div className="flex items-center gap-2">
                  <Activity aria-hidden="true" className="size-4 text-[#D4621A]" />
                  <h2 className="text-sm font-semibold text-white">Live Telemetry &amp; Spikes</h2>
                </div>
                <span className="font-mono text-[9px] text-[#71717A]">
                  {selectedQueue ? "Awaiting events" : "Preview · awaiting data"}
                </span>
              </div>
              <div
                aria-label="Illustrative telemetry spike histogram; live measurements will appear when a worker connects"
                className="rounded-lg border border-[#25252A] bg-[#121215] p-3"
              >
                <div className="mb-2 flex items-center justify-between text-[9px] font-mono text-[#71717A]">
                  <span>Throughput · last 6 hours</span>
                  <span>Peak view</span>
                </div>
                <div className="flex h-20 items-end justify-between gap-2 border-b border-[#222227] pb-1.5">
                  {[36, 52, 72, 48, 32, 60].map((height, index) => (
                    <div className="flex h-full flex-1 items-end justify-center" key={height}>
                      <div
                        className={`w-5 max-w-full rounded-t-[2px] ${index === 2 ? "bg-[#E56218]" : "bg-[#D4621A]/60"}`}
                        style={{ height: `${height}px` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-2 pt-1.5 text-[9px] font-mono text-[#71717A]">
                  <span>10:00</span>
                  <span>11:00</span>
                  <span className="text-[#D4621A]">12:00 peak</span>
                  <span>13:00</span>
                  <span>14:00</span>
                  <span>Now</span>
                </div>
                {!selectedQueue && (
                  <p className="mt-2 text-[9px] text-[#71717A]">
                    Illustrative preview only; no live telemetry is connected.
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 border-y border-[#222227] py-3 text-center">
                {[
                  ["Active Jobs", selectedQueue ? String(selectedQueue.active) : "0"],
                  ["Median Latency", selectedQueue ? `${selectedQueue.latency}ms` : "0ms"],
                  ["Retriable", selectedQueue ? String(selectedQueue.retries) : "0"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="block text-[9px] uppercase text-[#71717A]">{label}</span>
                    <span className="font-mono text-sm font-semibold text-[#A1A1AA]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div
                aria-label="Worker event stream"
                className="min-h-20 overflow-x-auto rounded-lg border border-[#25252A] bg-[#121215] p-2 font-mono text-[10px] text-[#A1A1AA]"
              >
                <p className="mb-1 text-[#71717A]">{"//"} Event stream · awaiting connection</p>
                <p className="whitespace-nowrap text-[#4ADE80]">
                  {">"} [bullmq:job_completed] awaiting live payload
                </p>
                <p className="mt-1 whitespace-nowrap">
                  {">"} [bullmq:quota_check] awaiting live payload
                </p>
              </div>
            </section>

            <section className="flex flex-col justify-between gap-3 rounded-xl border border-[#25252A] bg-[#151518] p-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222227] pb-2.5">
                  <div className="flex items-center gap-2">
                    <Code2 aria-hidden="true" className="size-4 text-[#D4621A]" />
                    <h2 className="text-sm font-semibold text-white">
                      Forensic Operations &amp; Retry
                    </h2>
                  </div>
                  <span className="font-mono text-[9px] text-[#A1A1AA]">ISO-27001 Audited</span>
                </div>
                <div>
                  <label
                    className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-medium text-[#A1A1AA]"
                    htmlFor="telemetry-justification"
                  >
                    <span>Audit Justification Note</span>
                    <span className="text-[#71717A]">Required for execution</span>
                  </label>
                  <textarea
                    className="min-h-24 w-full resize-y rounded-lg border border-[#27272C] bg-[#161619] p-2.5 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!selectedQueue}
                    id="telemetry-justification"
                    onChange={(event) => setJustification(event.target.value)}
                    placeholder="Provide a reason for queue operations or safe retry..."
                    required
                    value={justification}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#27272C] bg-[#161619] px-2 text-[10px] font-medium text-[#A1A1AA] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!selectedQueue || !justification.trim()}
                    type="button"
                  >
                    <PauseCircle aria-hidden="true" className="size-3.5" />
                    Pause Queue
                  </button>
                  <button
                    className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#27272C] bg-[#161619] px-2 text-[10px] font-medium text-[#A1A1AA] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!selectedQueue || !justification.trim()}
                    type="button"
                  >
                    <XCircle aria-hidden="true" className="size-3.5" />
                    Flush DLQ Cache
                  </button>
                </div>
              </div>
              <button
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#D4621A] px-3 text-center text-xs font-semibold text-white transition-colors hover:bg-[#BF5313] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!selectedQueue || !justification.trim()}
                type="button"
              >
                <Play aria-hidden="true" className="size-3.5" />
                Commit Telemetry Action &amp; Retry Safe Job
              </button>
            </section>
          </section>
        </main>

        <footer className="mt-auto flex flex-col gap-2 border-t border-[#1C1C20] px-4 py-4 text-[10px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#71717A]" />
            TalentGraph governance shell · Worker telemetry actions are audited
          </span>
          <span className="flex items-center gap-1.5">
            <Code2 aria-hidden="true" className="size-3.5" />
            Need cluster diagnostics? Contact platform DevOps
          </span>
        </footer>
      </div>
    </div>
  );
}
