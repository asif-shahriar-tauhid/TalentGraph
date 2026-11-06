"use client";

import Link from "next/link";
import {
  Activity,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Code2,
  Download,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Users,
  UserRoundSearch,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { User, UserRole } from "@/types/auth.types";
import { useAuth } from "@/providers/authProvider";
import { useTheme } from "@/providers/themeProvider";

type DirectoryTab = "all" | "candidates" | "recruiters";
type AccountState = "all" | User["status"];

const directoryUsers: User[] = [];

const navigationItems = [
  { label: "Operational Queue", href: "/admin", icon: LayoutDashboard },
  { label: "Company Verification", href: "/admin/company-verification", icon: Building2 },
  { label: "User Directory", href: "/admin/user-directory", icon: Users },
  { label: "Jobs Moderation", href: "/admin#moderation", icon: Code2 },
  { label: "Integrity Cases", href: "/admin#integrity", icon: ShieldAlert },
  { label: "Worker Telemetry", href: "/admin#telemetry", icon: Activity },
  { label: "BDT Subscriptions", href: "/admin#subscriptions", icon: CircleHelp },
];

function isRecruiter(role: UserRole) {
  return role === "RECRUITER" || role === "SUB_RECRUITER";
}

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "CANDIDATE":
      return "Candidate";
    case "SUB_RECRUITER":
      return "Sub-recruiter";
    case "RECRUITER":
      return "Recruiter";
    case "SYSTEM_ADMIN":
      return "System admin";
    case "ADMIN":
      return "Admin";
  }
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function formatDate(value?: string) {
  if (!value) return "Not recorded";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not recorded"
    : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

function accountStateLabel(status: User["status"]) {
  switch (status) {
    case "ACTIVE":
      return "Active";
    case "BLOCKED":
      return "Blocked";
    case "DELETED":
      return "Deleted";
  }
}

function accountStateClass(status: User["status"]) {
  switch (status) {
    case "ACTIVE":
      return "border-[#1A3D2C] bg-[#13281E] text-[#4ADE80]";
    case "BLOCKED":
      return "border-[#482026] bg-[#2E181D] text-[#F87171]";
    case "DELETED":
      return "border-[#3A3A40] bg-[#2A2A2E] text-[#B3B3B3]";
  }
}

export default function UserDirectoryPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<DirectoryTab>("all");
  const [accountState, setAccountState] = useState<AccountState>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, logout, logoutPending, isLoading: isAuthLoading } = useAuth();
  const { toggleTheme } = useTheme();
  const shellUser = user ?? { name: "Administrator", role: "ADMIN" as const };
  const isPreviewSession = !user;

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return directoryUsers.filter((directoryUser) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "candidates" && directoryUser.role === "CANDIDATE") ||
        (activeTab === "recruiters" && isRecruiter(directoryUser.role));
      const matchesState =
        accountState === "all" || directoryUser.status === accountState;
      const matchesSearch =
        query.length === 0 ||
        `${directoryUser.id} ${directoryUser.name} ${directoryUser.email}`
          .toLowerCase()
          .includes(query);

      return matchesTab && matchesState && matchesSearch;
    });
  }, [activeTab, accountState, searchTerm]);

  const totalAccounts = directoryUsers.length;
  const candidateCount = directoryUsers.filter(
    (directoryUser) => directoryUser.role === "CANDIDATE",
  ).length;
  const recruiterCount = directoryUsers.filter((directoryUser) =>
    isRecruiter(directoryUser.role),
  ).length;
  const verifiedGithubCount = directoryUsers.filter(
    (directoryUser) => directoryUser.authProvider === "GITHUB",
  ).length;
  const flaggedCount = directoryUsers.filter(
    (directoryUser) => directoryUser.status === "BLOCKED",
  ).length;

  const exportDirectory = () => {
    const rows = [
      ["User ID", "Name", "Email", "Role", "Auth provider", "Status", "Joined"],
      ...filteredUsers.map((directoryUser) => [
        directoryUser.id,
        directoryUser.name,
        directoryUser.email,
        getRoleLabel(directoryUser.role),
        directoryUser.authProvider,
        accountStateLabel(directoryUser.status),
        directoryUser.createdAt ?? "",
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
    link.download = "talentgraph-user-directory.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const resetFilters = () => {
    setActiveTab("all");
    setAccountState("all");
    setSearchTerm("");
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#0D0D0F] text-[#D4D4D8] selection:bg-[#D4621A] selection:text-white">
      <aside
        className={`sticky top-0 z-40 flex h-screen shrink-0 flex-col justify-between border-r border-[#222226] bg-[#121215] p-2 md:p-3 transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-16 md:w-64"
        }`}
      >
        <div className="flex min-h-0 flex-col gap-5">
          <div
            className={`flex h-12 items-center ${
              isSidebarCollapsed
                ? "justify-center"
                : "justify-center gap-2 px-0 md:justify-between md:px-1"
            }`}
          >
            <Link
              aria-label="TalentGraph admin home"
              className={`flex min-w-0 items-center gap-2.5 ${
                isSidebarCollapsed ? "hidden" : "hidden md:flex"
              }`}
              href="/admin"
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
            <button
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`rounded-lg p-1.5 text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white ${
                isSidebarCollapsed ? "mx-auto" : ""
              }`}
              onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              type="button"
            >
              {isSidebarCollapsed ? (
                <ChevronRight aria-hidden="true" className="size-4" />
              ) : (
                <ChevronLeft aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>

          <nav aria-label="Admin navigation" className="min-h-0 space-y-1 overflow-y-auto">
            {navigationItems.map(({ label, href, icon: Icon }) => {
              const isActive = label === "User Directory";
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    isSidebarCollapsed
                      ? "justify-center px-0"
                      : "justify-center px-0 md:justify-start md:px-3"
                  } ${
                    isActive
                      ? "bg-[#D4621A] text-white"
                      : "text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-white"
                  }`}
                  href={href}
                  key={label}
                  title={label}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {!isSidebarCollapsed && (
                    <span className="hidden truncate md:inline">{label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={`border-t border-[#232328] pt-3 ${isSidebarCollapsed ? "text-center" : ""}`}>
          <div
            className={`mb-3 flex items-center ${
              isSidebarCollapsed
                ? "justify-center"
                : "justify-center gap-2.5 px-0 md:justify-start md:px-1"
            }`}
            title={
              isSidebarCollapsed
                ? `${shellUser.name}${isPreviewSession ? " (preview session)" : ""}`
                : undefined
            }
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2B2B32] bg-[#202024] text-xs font-semibold text-white">
              {getInitials(shellUser.name)}
            </span>
            {!isSidebarCollapsed && (
              <span className="hidden min-w-0 md:block">
                <span className="block truncate text-xs font-medium text-white">
                  {shellUser.name}
                </span>
                <span className="block truncate font-mono text-[10px] text-[#71717A]">
                  {isPreviewSession
                    ? isAuthLoading
                      ? "Loading admin session..."
                      : "ADMIN · UI preview"
                    : shellUser.role}
                </span>
              </span>
            )}
          </div>
          <button
            aria-label={isPreviewSession ? "Sign out unavailable in preview" : "Sign out"}
            className={`flex w-full items-center justify-center gap-2 rounded-lg border border-[#27272C] py-2 text-xs text-[#A1A1AA] transition-colors hover:border-[#482026] hover:bg-[#2E181D] hover:text-[#F87171] disabled:opacity-50 ${
              isSidebarCollapsed ? "px-0" : "px-0 md:px-3"
            }`}
            disabled={logoutPending || isPreviewSession}
            onClick={() => logout()}
            title={isSidebarCollapsed ? "Sign out" : undefined}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-3.5" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 w-full flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-[#222227] bg-[#0D0D0F]/95 px-4 py-4 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex min-w-0 items-start gap-3">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                <span>Admin</span>
                <span aria-hidden="true">/</span>
                <span className="font-semibold text-[#D4621A]">User Directory</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                User Directory &amp; Account Governance
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Focus user search"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={() => searchInputRef.current?.focus()}
              title="Quick search"
              type="button"
            >
              <Search aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Download user directory CSV"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={exportDirectory}
              title="Download directory"
              type="button"
            >
              <Download aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Toggle theme"
              className="flex size-9 items-center justify-center rounded-lg border border-[#27272C] bg-[#161619] text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
              onClick={toggleTheme}
              title="Toggle theme"
              type="button"
            >
              <Sun aria-hidden="true" className="size-4" />
            </button>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 p-4 md:p-6">
          <section aria-label="Account metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Accounts",
                value: totalAccounts,
                detail: `${candidateCount} candidates · ${recruiterCount} recruiters`,
                icon: Users,
                iconClass: "text-[#A1A1AA]",
              },
              {
                label: "GitHub OAuth Verified",
                value: verifiedGithubCount,
                detail: "Accounts connected with GitHub",
                icon: CheckCircle2,
                iconClass: "text-[#4ADE80]",
              },
              {
                label: "Enterprise Recruiters",
                value: recruiterCount,
                detail: "Recruiter accounts",
                icon: Building2,
                iconClass: "text-[#A1A1AA]",
              },
              {
                label: "Flagged",
                value: flaggedCount,
                detail: "Blocked accounts",
                icon: ShieldAlert,
                iconClass: "text-[#E5933A]",
              },
            ].map(({ label, value, detail, icon: Icon, iconClass }) => (
              <article
                className="flex min-h-32 flex-col justify-between rounded-xl border border-[#25252A] bg-[#151518] p-4"
                key={label}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#A1A1AA]">{label}</p>
                    <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-white">
                      {value}
                    </p>
                  </div>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#2B2B32] bg-[#1F1F24]">
                    <Icon aria-hidden="true" className={`size-4 ${iconClass}`} />
                  </span>
                </div>
                <p className="mt-3 border-t border-[#222227] pt-3 text-[11px] text-[#71717A]">
                  {detail}
                </p>
              </article>
            ))}
          </section>

          <section aria-label="User directory" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#25252A] bg-[#151518] p-3 lg:flex-row lg:items-center lg:justify-between">
              <div
                aria-label="Filter by account type"
                className="flex w-fit max-w-full flex-wrap items-center gap-1 rounded-lg border border-[#222227] bg-[#101013] p-1"
                role="tablist"
              >
                {[
                  { id: "all", label: "All Accounts", count: totalAccounts },
                  { id: "candidates", label: "Candidates", count: candidateCount },
                  { id: "recruiters", label: "Recruiters", count: recruiterCount },
                ].map((tab) => (
                  <button
                    aria-selected={activeTab === tab.id}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#25252A] text-white"
                        : "text-[#A1A1AA] hover:text-white"
                    }`}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as DirectoryTab)}
                    role="tab"
                    type="button"
                  >
                    {tab.label}
                    <span className="ml-1 font-mono text-[10px] text-[#71717A]">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                  <Search
                    aria-hidden="true"
                    className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]"
                  />
                  <input
                    aria-label="Search users"
                    className="h-9 w-full rounded-lg border border-[#27272C] bg-[#161619] py-2 pl-8 pr-3 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#D4621A] focus:ring-1 focus:ring-[#D4621A]"
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search name, email or ID"
                    ref={searchInputRef}
                    type="search"
                    value={searchTerm}
                  />
                </label>
                <label className="relative sm:w-36">
                  <span className="sr-only">Filter by account state</span>
                  <select
                    className="h-9 w-full appearance-none rounded-lg border border-[#27272C] bg-[#161619] px-2.5 pr-8 text-xs text-[#D4D4D8] outline-none focus:border-[#D4621A]"
                    onChange={(event) =>
                      setAccountState(event.target.value as AccountState)
                    }
                    value={accountState}
                  >
                    <option value="all">All States</option>
                    <option value="ACTIVE">Active</option>
                    <option value="BLOCKED">Blocked</option>
                    <option value="DELETED">Deleted</option>
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#71717A]"
                  />
                </label>
                <button
                  className="h-9 rounded-lg border border-[#27272C] bg-[#161619] px-3 text-xs text-[#A1A1AA] transition-colors hover:bg-[#202024] hover:text-white"
                  onClick={resetFilters}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#25252A] bg-[#151518]">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[780px] border-collapse text-left text-xs">
                  <thead className="bg-[#121215] text-[10px] uppercase tracking-wider text-[#71717A]">
                    <tr className="border-b border-[#222227]">
                      <th className="px-4 py-3 font-semibold">User Identity</th>
                      <th className="px-4 py-3 font-semibold">Role &amp; Auth</th>
                      <th className="px-4 py-3 font-semibold">Affiliation / Repos</th>
                      <th className="px-4 py-3 font-semibold">Governance Status</th>
                      <th className="px-4 py-3 text-right font-semibold">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222227]">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td className="px-4 py-14 text-center" colSpan={5}>
                          <div className="mx-auto flex max-w-md flex-col items-center">
                            {directoryUsers.length === 0 ? (
                              <>
                                <span className="mb-3 flex size-11 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#A1A1AA]">
                                  <UserRoundSearch aria-hidden="true" className="size-5" />
                                </span>
                                <h2 className="text-sm font-semibold text-white">
                                  No accounts registered yet
                                </h2>
                                <p className="mt-1 text-xs leading-5 text-[#71717A]">
                                  Newly onboarded candidates and recruiters will appear here.
                                </p>
                              </>
                            ) : (
                              <>
                                <span className="mb-3 flex size-11 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#A1A1AA]">
                                  <FileSearch aria-hidden="true" className="size-5" />
                                </span>
                                <h2 className="text-sm font-semibold text-white">
                                  No accounts match these filters
                                </h2>
                                <p className="mt-1 text-xs text-[#71717A]">
                                  Try a different search or reset your filters.
                                </p>
                                <button
                                  className="mt-3 text-xs font-medium text-[#D4621A] hover:text-[#E47735]"
                                  onClick={resetFilters}
                                  type="button"
                                >
                                  Clear filters
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((directoryUser) => (
                        <tr
                          aria-selected={selectedUser?.id === directoryUser.id}
                          className={`cursor-pointer transition-colors hover:bg-[#1A1A1E] ${
                            selectedUser?.id === directoryUser.id
                              ? "border-l-2 border-l-[#D4621A] bg-[#1B1B1F]"
                              : ""
                          }`}
                          key={directoryUser.id}
                          onClick={() => setSelectedUser(directoryUser)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setSelectedUser(directoryUser);
                            }
                          }}
                          tabIndex={0}
                        >
                          <td className="px-4 py-3.5">
                            <div className="flex min-w-0 items-center gap-2.5">
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[10px] font-bold text-[#A1A1AA]">
                                {getInitials(directoryUser.name)}
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate font-medium text-white">
                                  {directoryUser.name}
                                </span>
                                <span className="block truncate font-mono text-[10px] text-[#71717A]">
                                  {directoryUser.email}
                                </span>
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="block text-[#D4D4D8]">
                              {getRoleLabel(directoryUser.role)}
                            </span>
                            <span className="mt-1 block font-mono text-[10px] text-[#71717A]">
                              {directoryUser.authProvider === "GITHUB"
                                ? "GitHub OAuth"
                                : directoryUser.authProvider}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-[#71717A]">
                            Not available
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-flex rounded border px-2 py-0.5 text-[10px] ${accountStateClass(directoryUser.status)}`}
                            >
                              {accountStateLabel(directoryUser.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono text-[10px] text-[#71717A]">
                            Not recorded
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-2 border-t border-[#222227] px-4 py-3 text-[11px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  {filteredUsers.length === 0
                    ? "Showing 0 of 0 accounts"
                    : `Showing ${filteredUsers.length} of ${totalAccounts} accounts`}
                </span>
                <span className="font-mono">Directory records only</span>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="inspector-heading"
            className="rounded-xl border border-[#25252A] bg-[#151518] p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222227] pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#D4621A]" />
                <h2
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D4621A]"
                  id="inspector-heading"
                >
                  User Inspector
                </h2>
              </div>
              {selectedUser && (
                <button
                  aria-label="Clear selected user"
                  className="rounded p-1 text-[#71717A] hover:bg-[#202024] hover:text-white"
                  onClick={() => setSelectedUser(null)}
                  type="button"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
            </div>

            {!selectedUser ? (
              <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
                <span className="mb-3 flex size-10 items-center justify-center rounded-full border border-[#2B2B32] bg-[#1F1F24] text-[#71717A]">
                  <Search aria-hidden="true" className="size-4" />
                </span>
                <p className="max-w-lg text-sm text-[#A1A1AA]">
                  Select a user row from the directory to inspect account governance and security status
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 pt-4 xl:grid-cols-3">
                <div className="space-y-4 xl:col-span-1">
                  <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[#27272C] bg-[#17171B] p-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4621A]/20 text-sm font-bold text-[#E47735]">
                      {getInitials(selectedUser.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {selectedUser.name}
                      </p>
                      <p className="truncate font-mono text-[11px] text-[#71717A]">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#222227] bg-[#121215] p-3">
                    <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                      Identity &amp; Authentication
                    </h3>
                    <dl className="space-y-2.5 text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#71717A]">User ID</dt>
                        <dd className="max-w-[65%] break-all text-right font-mono text-[#D4D4D8]">
                          {selectedUser.id}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#71717A]">Role</dt>
                        <dd className="text-right text-[#D4D4D8]">
                          {getRoleLabel(selectedUser.role)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#71717A]">Provider</dt>
                        <dd className="text-right text-[#D4D4D8]">
                          {selectedUser.authProvider}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#71717A]">Joined</dt>
                        <dd className="text-right text-[#D4D4D8]">
                          {formatDate(selectedUser.createdAt)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-4 xl:col-span-2">
                  <div className="rounded-lg border border-[#222227] bg-[#121215] p-3">
                    <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                      Governance &amp; Security Status
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-[#222227] bg-[#17171B] p-3">
                        <p className="text-[11px] text-[#71717A]">Account state</p>
                        <span
                          className={`mt-2 inline-flex rounded border px-2 py-0.5 text-[10px] ${accountStateClass(selectedUser.status)}`}
                        >
                          {accountStateLabel(selectedUser.status)}
                        </span>
                      </div>
                      <div className="rounded-lg border border-[#222227] bg-[#17171B] p-3">
                        <p className="text-[11px] text-[#71717A]">Email verification</p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#D4D4D8]">
                          {selectedUser.emailVerified ? (
                            <CheckCircle2 aria-hidden="true" className="size-3.5 text-[#4ADE80]" />
                          ) : (
                            <ShieldAlert aria-hidden="true" className="size-3.5 text-[#E5933A]" />
                          )}
                          {selectedUser.emailVerified ? "Verified" : "Not verified"}
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#222227] bg-[#17171B] p-3">
                        <p className="text-[11px] text-[#71717A]">Created</p>
                        <p className="mt-2 text-xs text-[#D4D4D8]">
                          {formatDate(selectedUser.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg border border-[#27272C] bg-[#17171B] p-3 text-[11px] leading-relaxed text-[#71717A]">
                    <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#A1A1AA]" />
                    <p>
                      <strong className="font-medium text-[#D4D4D8]">
                        Privacy safeguards:
                      </strong>{" "}
                      Sensitive profile documents and authentication credentials are not exposed in the directory inspector.
                    </p>
                  </div>
                  <p className="text-[11px] text-[#71717A]">
                    Affiliation, repository, last-active, and account action details are not available from the current directory data.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <footer className="mt-auto flex flex-col gap-2 border-t border-[#1C1C20] px-4 py-4 text-[10px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#71717A]" />
            TalentGraph governance shell
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Need help? Contact platform security
          </span>
        </footer>
      </main>
    </div>
  );
}