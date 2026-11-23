'use client';

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  Ban,
  BriefcaseBusiness,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileSearch,
  Fingerprint,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

type CaseStatus = "investigation" | "cleared" | "confirmed";
type AnomalyType = "face" | "multi-person" | "camera" | "blur";
type CaseTab = "all" | CaseStatus | "camera";

interface IntegrityCase {
  id: string;
  attemptId: string;
  candidate: string;
  handle: string;
  role: string;
  recruiter: string;
  company: string;
  anomalyType: AnomalyType;
  reason: string;
  status: CaseStatus;
  snapshots: string[];
}

const integrityCases: IntegrityCase[] = [];

const navigationItems = [
  { label: "Operational Queue", href: "/admin", icon: LayoutDashboard },
  { label: "Company Verification", href: "/admin/company-verification", icon: Building2 },
  { label: "User Directory", href: "/admin/user-directory", icon: Users },
  { label: "Jobs Moderation", href: "/admin/jobs-moderation", icon: BriefcaseBusiness },
  { label: "Integrity Cases", href: "/admin/integrity-cases", icon: ShieldAlert },
  { label: "Worker Telemetry", href: "/admin#telemetry", icon: Activity },
  { label: "BDT Subscriptions", href: "/admin#subscriptions", icon: Wallet },
];

const tabs: { id: CaseTab; label: string }[] = [
  { id: "all", label: "All Flagged" },
  { id: "investigation", label: "Under Investigation" },
  { id: "cleared", label: "Cleared" },
  { id: "confirmed", label: "Confirmed Violation" },
  { id: "camera", label: "Camera Telemetry" },
];

const anomalyOptions: { value: AnomalyType | "all"; label: string }[] = [
  { value: "all", label: "All Anomaly Types" },
  { value: "face", label: "Face Disparity" },
  { value: "multi-person", label: "Multi-Person" },
  { value: "camera", label: "Camera Blackout" },
  { value: "blur", label: "Blur Threshold" },
];

const metrics = [
  { label: "Active Integrity Cases", value: "0", detail: "No cases under human investigation", icon: ShieldAlert, tone: "text-[#F87171]" },
  { label: "Proctored Assessments", value: "0", detail: "No assessment snapshots recorded", icon: FileCheck2, tone: "text-[#A1A1AA]" },
  { label: "Confirmed Violations", value: "0", detail: "No human-confirmed violations", icon: Fingerprint, tone: "text-[#E5933A]" },
  { label: "Snapshot Capture Success", value: "0.0% / --", detail: "No camera capture data available", icon: Video, tone: "text-[#4ADE80]" },
];

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();
}

export default function IntegrityCasesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<CaseTab>("all");
  const [anomalyType, setAnomalyType] = useState<AnomalyType | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<IntegrityCase | null>(null);
  const [justification, setJustification] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { user, logout, logoutPending, isLoading } = useAuth();
  const { toggleTheme, resolvedTheme } = useTheme();
  const shellUser = user ?? { name: "Administrator", role: "ADMIN" as const };
  const previewSession = !user;

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();
    return integrityCases.filter((item) => {
      const tabMatch =
        activeTab === "all" ||
        (activeTab === "camera" ? item.anomalyType === "camera" : item.status === activeTab);
      const anomalyMatch = anomalyType === "all" || item.anomalyType === anomalyType;
      const searchMatch =
        !query ||
        `${item.id} ${item.attemptId} ${item.candidate} ${item.handle} ${item.company}`
          .toLowerCase()
          .includes(query);
      return tabMatch && anomalyMatch && searchMatch;
    });
  }, [activeTab, anomalyType, search]);

  const downloadAudit = () => {
    const rows = [
      ["Case ID", "Attempt ID", "Candidate", "Handle", "Role", "Recruiter", "Company", "Anomaly", "Reason", "Status"],
      ...filteredCases.map((item) => [
        item.id, item.attemptId, item.candidate, item.handle, item.role,
        item.recruiter, item.company, item.anomalyType, item.reason, item.status,
      ]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "talentgraph-integrity-audit.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#0D0D0F] text-[#D4D4D8] selection:bg-[#D4621A]/30 selection:text-white">
      <aside className={`sticky top-0 z-40 flex h-screen flex-shrink-0 flex-col justify-between border-r border-[#222226] bg-[#121215] p-2 transition-all duration-300 md:p-3 ${sidebarCollapsed ? "w-16" : "w-16 md:w-64"}`}>
        <div className="flex min-h-0 flex-col gap-5">
          <div className={`flex items-center ${sidebarCollapsed ? "h-auto flex-col gap-1" : "h-12 justify-center md:justify-between md:gap-2 md:px-1"}`}>
            <Link aria-label="TalentGraph home" className="flex min-w-0 cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-80" href="/">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D4621A] text-sm font-bold text-white">TG</span>
              <span className={`min-w-0 ${sidebarCollapsed ? "hidden" : "hidden md:block"}`}>
                <span className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white">
                  TalentGraph <span className="rounded bg-[#2A2A2E] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#B3B3B3]">ADMIN</span>
                </span>
                <span className="block text-[10px] text-[#71717A]">Operational control</span>
              </span>
            </Link>
            <button aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} className={`hidden rounded-lg p-1.5 text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white md:block ${sidebarCollapsed ? "mx-auto" : ""}`} onClick={() => setSidebarCollapsed((value) => !value)} title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} type="button">
              {sidebarCollapsed ? <ChevronRight aria-hidden="true" className="size-4" /> : <ChevronLeft aria-hidden="true" className="size-4" />}
            </button>
          </div>
          <nav aria-label="Admin navigation" className="min-h-0 space-y-1 overflow-y-auto">
            {navigationItems.map(({ label, href, icon: Icon }) => {
              const active = label === "Integrity Cases";
              return (
                <Link aria-current={active ? "page" : undefined} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${sidebarCollapsed ? "justify-center px-0" : "justify-center px-0 md:justify-start md:px-3"} ${active ? "bg-[#D4621A] text-white" : "text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white"}`} href={href} key={label} title={label}>
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {!sidebarCollapsed && <span className="hidden min-w-0 flex-1 truncate md:inline">{label}</span>}
                  {active && !sidebarCollapsed && <span className="hidden rounded-full border border-[#482026] bg-[#2E181D] px-1.5 py-0.5 text-[9px] font-semibold text-[#F87171] md:inline">0</span>}
                  {active && sidebarCollapsed && <span className="sr-only">0 flagged</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-[#232328] pt-3">
          <div className={`mb-3 flex items-center ${sidebarCollapsed ? "justify-center" : "justify-center gap-2.5 md:justify-start md:px-1"}`} title={sidebarCollapsed ? `${shellUser.name}${previewSession ? " (preview session)" : ""}` : undefined}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2B2B32] bg-[#202024] text-xs font-semibold text-white">{initials(shellUser.name)}</span>
            {!sidebarCollapsed && <span className="hidden min-w-0 md:block">
              <span className="block truncate text-xs font-medium text-white">{shellUser.name}</span>
              <span className="block truncate font-mono text-[10px] text-[#71717A]">{previewSession ? (isLoading ? "Loading admin session..." : "ADMIN · UI preview") : shellUser.role}</span>
            </span>}
          </div>
          <button aria-label={previewSession ? "Sign out unavailable in preview" : "Sign out"} className={`flex w-full items-center justify-center gap-2 rounded-lg border border-[#27272C] py-2 text-xs text-[#A1A1AA] transition-colors hover:border-[#482026] hover:bg-[#2E181D] hover:text-[#F87171] disabled:opacity-50 ${sidebarCollapsed ? "px-0" : "px-0 md:px-3"}`} disabled={logoutPending || previewSession} onClick={() => logout()} title={sidebarCollapsed ? "Sign out" : undefined} type="button">
            <LogOut aria-hidden="true" className="size-3.5" />
            {!sidebarCollapsed && <span className="hidden md:inline">Sign Out</span>}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 w-full flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-[#222227] bg-[#0D0D0F]/95 px-4 py-4 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#71717A]"><span>Admin</span><span aria-hidden="true">/</span><span className="font-semibold text-[#D4621A]">Integrity &amp; Audit</span></div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Integrity Cases &amp; Assessment Audit</h1>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Focus integrity case search" className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] hover:bg-[#202024] hover:text-white" onClick={() => searchRef.current?.focus()} title="Search queue" type="button"><Search aria-hidden="true" className="size-4" /></button>
            <button aria-label="Download integrity audit CSV" className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] hover:bg-[#202024] hover:text-white" onClick={downloadAudit} title="Download audit CSV" type="button"><ArrowDownToLine aria-hidden="true" className="size-4" /></button>
            <button aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`} className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] hover:bg-[#202024] hover:text-white" onClick={toggleTheme} title="Toggle theme" type="button">{resolvedTheme === "dark" ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}</button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-1 flex-col gap-5 p-4 md:p-6 lg:p-8">
          <section aria-label="Integrity audit metrics" className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(({ label, value, detail, icon: Icon, tone }) => (
              <article className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4" key={label}>
                <div className="flex items-start justify-between gap-3"><p className="text-xs text-[#A1A1AA]">{label}</p><span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24]"><Icon aria-hidden="true" className={`size-4 ${tone}`} /></span></div>
                <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-white">{value}</p>
                <p className="mt-3 border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">{detail}</p>
              </article>
            ))}
          </section>

          <section aria-label="Integrity case audit queue" className="min-w-0 overflow-hidden rounded-xl border border-[#25252A] bg-[#151518]">
            <div className="flex flex-col gap-3 border-b border-[#222227] px-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-4">
              <div aria-label="Filter integrity cases" className="flex max-w-full gap-1 overflow-x-auto py-0.5" role="tablist">
                {tabs.map(({ id, label }) => (
                  <button aria-selected={activeTab === id} className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:px-3 sm:text-xs ${activeTab === id ? "bg-[#D4621A] text-white" : "text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white"}`} key={id} onClick={() => setActiveTab(id)} role="tab" type="button">
                    {label}<span className="ml-1 font-mono text-[10px] opacity-75">{integrityCases.filter((item) => id === "all" || (id === "camera" ? item.anomalyType === "camera" : item.status === id)).length}</span>
                  </button>
                ))}
              </div>
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                  <Search aria-hidden="true" className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]" />
                  <input aria-label="Search integrity cases" className="h-9 w-full rounded-lg border border-[#27272C] bg-[#161619] py-2 pl-8 pr-3 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A] focus:ring-1 focus:ring-[#D4621A]" onChange={(event) => setSearch(event.target.value)} placeholder="Search cases or candidates" ref={searchRef} type="search" value={search} />
                </label>
                <label className="relative sm:w-52">
                  <span className="sr-only">Filter by anomaly type</span>
                  <select className="h-9 w-full appearance-none rounded-lg border border-[#27272C] bg-[#161619] px-2.5 pr-8 text-xs text-[#D4D4D8] outline-none focus:border-[#D4621A]" onChange={(event) => setAnomalyType(event.target.value as AnomalyType | "all")} value={anomalyType}>
                    {anomalyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]" />
                </label>
                <button className="h-9 rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs text-[#A1A1AA] hover:bg-[#202024] hover:text-white" onClick={() => { setActiveTab("all"); setAnomalyType("all"); setSearch(""); }} type="button">Reset</button>
              </div>
            </div>
            <div className="w-full min-w-0 overflow-x-auto">
              <table className="w-full min-w-[1180px] border-collapse text-left text-xs">
                <thead className="bg-[#121215]/70 text-[10px] uppercase tracking-wider text-[#71717A]"><tr className="border-b border-[#222227]">
                  <th className="px-4 py-3 font-semibold">Case ID &amp; Attempt</th><th className="px-4 py-3 font-semibold">Candidate &amp; Role</th><th className="px-4 py-3 font-semibold">Recruiter &amp; Company</th><th className="px-4 py-3 font-semibold">Detected Anomaly / Reason</th><th className="px-4 py-3 font-semibold">Snapshot Telemetry (5 Slots)</th><th className="px-4 py-3 font-semibold">SLA &amp; Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-[#222227]">
                  {filteredCases.length === 0 ? (
                    <tr><td className="px-4 py-16 text-center" colSpan={7}>
                      <div className="mx-auto flex max-w-md flex-col items-center">
                        <span className="mb-3 flex size-11 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#A1A1AA]"><FileSearch aria-hidden="true" className="size-5" /></span>
                        <h2 className="text-sm font-semibold text-white">{integrityCases.length === 0 ? "No integrity anomaly cases requiring audit" : "No cases match these filters"}</h2>
                        <p className="mt-1 text-xs leading-5 text-[#71717A]">{integrityCases.length === 0 ? "Automated flags or candidate appeals will appear here." : "Try another search or reset your filters."}</p>
                      </div>
                    </td></tr>
                  ) : filteredCases.map((item) => (
                    <tr aria-selected={selectedCase?.id === item.id} className={`cursor-pointer hover:bg-[#1A1A1E] ${selectedCase?.id === item.id ? "border-l-2 border-l-[#D4621A] bg-[#252528]" : ""}`} key={item.id} onClick={() => setSelectedCase(item)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedCase(item); } }} tabIndex={0}>
                      <td className="px-4 py-3.5 font-mono"><span className="block font-semibold text-white">{item.id}</span><span className="text-[10px] text-[#71717A]">Attempt {item.attemptId}</span></td>
                      <td className="px-4 py-3.5"><span className="block font-medium text-white">{item.candidate}</span><span className="text-[10px] text-[#A1A1AA]">{item.handle} · {item.role}</span></td>
                      <td className="px-4 py-3.5"><span className="block text-white">{item.recruiter}</span><span className="text-[10px] text-[#71717A]">{item.company}</span></td>
                      <td className="max-w-[260px] px-4 py-3.5"><span className="block font-medium text-[#E5933A]">{item.anomalyType}</span><span className="mt-0.5 block text-[10px] text-[#A1A1AA]">{item.reason}</span></td>
                      <td className="px-4 py-3.5"><div className="flex items-center gap-1">{item.snapshots.map((snapshot, index) => <span className="whitespace-nowrap rounded border border-[#27272C] bg-[#17171B] px-1.5 py-0.5 font-mono text-[9px] text-[#A1A1AA]" key={`${item.id}-${index}`}>{index + 1}: {snapshot}</span>)}</div></td>
                      <td className="px-4 py-3.5 text-[#A1A1AA]">{item.status}</td>
                      <td className="px-4 py-3.5 text-right"><button aria-label={`Inspect case ${item.id}`} className="inline-flex size-8 items-center justify-center rounded border border-[#2B2B32] bg-[#1F1F24] text-white hover:border-[#D4621A]" onClick={(event) => { event.stopPropagation(); setSelectedCase(item); }} type="button"><FileSearch aria-hidden="true" className="size-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-2 border-t border-[#222227] px-4 py-3 text-[11px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between"><span>Showing {filteredCases.length} of {integrityCases.length} cases</span><span className="font-mono">Assessment integrity audit records</span></div>
          </section>

          <section aria-labelledby="case-inspector-heading" className="min-w-0 overflow-hidden rounded-xl border border-[#25252A] bg-[#151518]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222227] bg-[#17171B] px-4 py-3">
              <div><p className="font-mono text-[10px] uppercase tracking-wider text-[#D4621A]">Forensic Audit Decision Suite</p><h2 className="mt-0.5 text-sm font-semibold text-white" id="case-inspector-heading">Case Inspector</h2></div>
              {selectedCase ? <span className="font-mono text-[10px] text-[#A1A1AA]">{selectedCase.id} · {selectedCase.attemptId}</span> : <span className="inline-flex items-center gap-1.5 text-[10px] text-[#71717A]"><ShieldCheck aria-hidden="true" className="size-3.5" />No case selected</span>}
            </div>
            {!selectedCase && <div className="border-b border-[#222227] px-4 py-7 text-center">
              <span className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#71717A]"><Search aria-hidden="true" className="size-4" /></span>
              <p className="mx-auto max-w-2xl text-sm text-[#A1A1AA]">Select an anomaly case from the audit log above to review snapshot telemetry and commit governance decision</p>
            </div>}
            <div className="grid min-w-0 grid-cols-1 divide-y divide-[#222227] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              <section className="flex flex-col gap-4 p-4">
                <h3 className="flex items-center gap-2 border-b border-[#222227] pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]"><Users aria-hidden="true" className="size-3.5" />Candidate &amp; Assessment Provenance</h3>
                <div className="rounded-lg border border-[#27272C] bg-[#17171B] p-3">
                  <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24] text-sm font-bold text-[#D4621A]">{selectedCase ? initials(selectedCase.candidate) : "—"}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{selectedCase?.candidate ?? "No candidate selected"}</p><p className="truncate font-mono text-[10px] text-[#71717A]">{selectedCase?.handle ?? "Candidate account details"}</p></div></div>
                  <dl className="mt-4 space-y-2 border-t border-[#222227] pt-3 text-[10px]">
                    {([["Target role", selectedCase?.role ?? "Awaiting case"], ["Target employer", selectedCase?.company ?? "Awaiting case"], ["Session app build", "Unavailable until case selection"], ["Execution time", "Unavailable until case selection"]] as const).map(([label, value]) => <div className="flex flex-wrap justify-between gap-2" key={label}><dt className="text-[#71717A]">{label}</dt><dd className="text-right text-[#A1A1AA]">{value}</dd></div>)}
                  </dl>
                </div>
                <div className="mt-auto rounded-lg border border-[#27272C] border-l-2 border-l-[#D4621A] bg-[#17171B] p-3"><h4 className="flex items-center gap-1.5 text-[10px] font-semibold text-[#D4621A]"><ShieldCheck aria-hidden="true" className="size-3.5" />Governance Guardrail</h4><p className="mt-1 text-[10px] leading-4 text-[#A1A1AA]">Automated signals support human review; integrity findings and assessment bans require an authorized human decision.</p></div>
              </section>
              <section className="min-w-0 space-y-4 p-4">
                <div className="flex items-center justify-between gap-2 border-b border-[#222227] pb-2"><h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]"><Camera aria-hidden="true" className="size-3.5" />5-Snapshot Proctoring Trail</h3><span className="text-[10px] text-[#71717A]">{selectedCase ? "Review required" : "No snapshot data"}</span></div>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">{Array.from({ length: 5 }, (_, index) => <div className="min-w-0 rounded-lg border border-[#27272C] bg-[#17171B] p-1.5 text-center sm:p-2" key={index}><span className="flex h-14 flex-col items-center justify-center rounded bg-[#1F1F24] text-[#71717A]"><Video aria-hidden="true" className="size-4" /><span className="mt-1 font-mono text-[8px]">Slot {index + 1}</span></span><span className="mt-1 block truncate text-[9px] text-[#71717A]">{selectedCase ? "Pending review" : "No capture"}</span></div>)}</div>
                <div className="rounded-lg border border-[#27272C] bg-[#17171B] p-3"><h4 className="mb-2 flex items-center gap-2 text-[10px] font-medium text-[#71717A]"><Activity aria-hidden="true" className="size-3.5" />Session Device Sensor Feed</h4><div className="grid grid-cols-3 gap-2">{["App blur events", "Device switches", "Network drops"].map((label) => <div className="rounded border border-[#222227] bg-[#151518] p-2 text-center" key={label}><span className="block text-[9px] text-[#71717A]">{label}</span><span className="font-mono text-xs text-[#71717A]">—</span></div>)}</div><p className="mt-2 rounded border border-[#222227] bg-[#121215] p-2 text-[10px] leading-4 text-[#71717A]">{selectedCase ? "Sensor events will be available for this assessment." : "Device and sensor telemetry will appear after selecting a case."}</p></div>
              </section>
              <section className="flex min-w-0 flex-col gap-3 p-4">
                <div className="flex items-center justify-between gap-2 border-b border-[#222227] pb-2"><h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]"><Fingerprint aria-hidden="true" className="size-3.5" />Forensic Audit Decision Suite</h3><span className="text-[10px] text-[#71717A]">{selectedCase ? "Pending decision" : "Awaiting case"}</span></div>
                <div><label className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-medium text-[#A1A1AA]" htmlFor="integrity-justification"><span>Mandatory Justification Log</span><span className="font-mono text-[#71717A]">AUDIT RECORD</span></label><textarea className="min-h-24 w-full resize-y rounded-lg border border-[#27272C] bg-[#161619] p-2.5 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A] disabled:cursor-not-allowed disabled:opacity-60" disabled={!selectedCase} id="integrity-justification" onChange={(event) => setJustification(event.target.value)} placeholder="Enter the rationale for the integrity review decision..." value={justification} /></div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#27272C] bg-[#161619] px-2.5 text-[11px] font-medium text-white hover:bg-[#202024] disabled:cursor-not-allowed disabled:opacity-50" disabled={!selectedCase || !justification.trim()} type="button"><CheckCircle2 aria-hidden="true" className="size-3.5" />Mark No Violation</button>
                  <button className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#27272C] bg-[#161619] px-2.5 text-[11px] font-medium text-white hover:bg-[#202024] disabled:cursor-not-allowed disabled:opacity-50" disabled={!selectedCase || !justification.trim()} type="button"><Clock3 aria-hidden="true" className="size-3.5" />Request Retake</button>
                </div>
                <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#482026] bg-[#2E181D] px-3 text-center text-[11px] font-semibold text-[#F87171] hover:bg-[#3D1D24] disabled:cursor-not-allowed disabled:opacity-50" disabled={!selectedCase || !justification.trim()} type="button"><Ban aria-hidden="true" className="size-3.5 shrink-0" />Confirm Violation &amp; Trigger Assessment Ban</button>
                <button className="mt-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#D4621A] px-4 text-xs font-semibold text-white hover:bg-[#BF5313] disabled:cursor-not-allowed disabled:opacity-50" disabled={!selectedCase || !justification.trim()} type="button"><Check aria-hidden="true" className="size-3.5" />Commit Integrity Audit Decision</button>
              </section>
            </div>
          </section>
        </main>
        <footer className="mt-auto flex flex-col gap-2 border-t border-[#1C1C20] bg-[#121215] px-4 py-4 text-[10px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#71717A]" />TalentGraph governance workspace</span>
          <span className="flex items-center gap-1.5"><AlertTriangle aria-hidden="true" className="size-3.5" />Integrity decisions require human review</span>
        </footer>
      </div>
    </div>
  );
}
