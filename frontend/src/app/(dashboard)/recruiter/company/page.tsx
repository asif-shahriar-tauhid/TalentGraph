"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  BadgeCheck,
  Building2,
  Check,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileText,
  Fingerprint,
  History,
  Info,
  LockKeyhole,
  Mail,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Upload,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

type AccreditationStatus =
  | "Unverified"
  | "Pending"
  | "Needs More Information"
  | "Verified"
  | "Rejected";
type MemberRole = "Primary Admin" | "Full Access" | "Job Post & Review";
type MemberStatus = "Pending" | "Active";

interface CompanyEntity {
  legalName: string;
  website: string;
  industry: string;
  registrationReference: string;
  headquarters: string;
  description: string;
}

interface CompanyMember {
  id: string;
  name: string;
  email: string;
  title: string;
  role: MemberRole;
  status: MemberStatus;
}

interface CompanyAttachment {
  id: string;
  label: string;
  fileName: string | null;
  status: "Pending Verification";
}

interface CompanyAuditEvent {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "neutral" | "warning" | "success";
}

interface CompanyProfileData {
  accreditationStatus: AccreditationStatus;
  activeJobs: number;
  jobLimit: number;
  trustScore: number;
  entity: CompanyEntity;
  members: CompanyMember[];
  attachments: CompanyAttachment[];
  auditEvents: CompanyAuditEvent[];
}

const INITIAL_COMPANY_DATA: CompanyProfileData = {
  accreditationStatus: "Unverified",
  activeJobs: 0,
  jobLimit: 5,
  trustScore: 0,
  entity: {
    legalName: "",
    website: "",
    industry: "",
    registrationReference: "",
    headquarters: "",
    description: "",
  },
  members: [],
  attachments: [
    {
      id: "trade-license",
      label: "Trade License",
      fileName: null,
      status: "Pending Verification",
    },
    {
      id: "tin-certificate",
      label: "TIN Certificate",
      fileName: null,
      status: "Pending Verification",
    },
    {
      id: "authorization-letter",
      label: "Authorization Letter",
      fileName: null,
      status: "Pending Verification",
    },
  ],
  auditEvents: [],
};

const profileFields: Array<{
  key: keyof CompanyEntity;
  label: string;
  placeholder: string;
  className?: string;
  multiline?: boolean;
}> = [
  {
    key: "legalName",
    label: "Company Legal Name",
    placeholder: "Enter registered company legal name",
  },
  {
    key: "website",
    label: "Official Domain & Website",
    placeholder: "https://yourcompany.com",
    className: "font-mono",
  },
  {
    key: "industry",
    label: "Industry & Sector",
    placeholder: "e.g., Distributed Systems & Cloud",
  },
  {
    key: "registrationReference",
    label: "Trade License / Incorporation Ref",
    placeholder: "RJSC Reg / TIN Reference",
    className: "font-mono",
  },
  {
    key: "headquarters",
    label: "Corporate Headquarters",
    placeholder: "Enter corporate headquarters address",
  },
  {
    key: "description",
    label: "Business Description / Engineering Focus",
    placeholder:
      "Describe your organization and the engineering work candidates may contribute to.",
    multiline: true,
  },
];

const panelClass =
  "min-w-0 rounded-xl border border-border bg-card p-4 dark:border-[#25252A] dark:bg-[#121417] sm:p-5";
const fieldClass =
  "min-h-10 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const buttonSecondaryClass =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function matchesFilter(query: string, ...values: Array<string | number | null>) {
  const term = query.trim().toLowerCase();
  return (
    !term ||
    values.some((value) => String(value ?? "").toLowerCase().includes(term))
  );
}

function downloadProfile(data: CompanyProfileData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "company-profile.json";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

export default function RecruiterCompanyPage() {
  const [company, setCompany] =
    useState<CompanyProfileData>(INITIAL_COMPANY_DATA);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);
  const [domainMessage, setDomainMessage] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteMessage, setInviteMessage] = useState("");
  const [securityInfoOpen, setSecurityInfoOpen] = useState(false);
  const query = search.trim().toLowerCase();

  const visibleMetrics = useMemo(
    () =>
      [
        {
          id: "accreditation",
          title: "Accreditation Status",
          value: company.accreditationStatus,
          detail: "Verification required",
          badge: "Pending Setup",
          Icon: ShieldCheck,
          tone: "warning" as const,
        },
        {
          id: "capacity",
          title: "Publishing Capacity",
          value: `${company.activeJobs} / ${company.jobLimit} Slots`,
          detail: "No active job postings",
          badge: `${Math.max(company.jobLimit - company.activeJobs, 0)} Slots Available`,
          Icon: Building2,
          tone: "neutral" as const,
        },
        {
          id: "affiliations",
          title: "Recruiter Affiliations",
          value: `${company.members.length} Members`,
          detail: "Company team",
          badge: "Awaiting Affiliations",
          Icon: Users,
          tone: "neutral" as const,
        },
        {
          id: "trust",
          title: "Trust & Proof Score",
          value: `${company.trustScore.toFixed(1)}%`,
          detail: "No audit data yet",
          badge: "Awaiting Audit",
          Icon: Fingerprint,
          tone: "neutral" as const,
        },
      ].filter((metric) =>
        matchesFilter(
          query,
          metric.title,
          metric.value,
          metric.detail,
          metric.badge,
        ),
      ),
    [company, query],
  );

  const visibleFields = profileFields.filter((field) =>
    matchesFilter(query, field.label, field.placeholder, company.entity[field.key]),
  );
  const visibleAttachments = company.attachments.filter((attachment) =>
    matchesFilter(
      query,
      attachment.label,
      attachment.fileName,
      attachment.status,
    ),
  );
  const visibleMembers = company.members.filter((member) =>
    matchesFilter(query, member.name, member.email, member.title, member.role, member.status),
  );
  const visibleAuditEvents = company.auditEvents.filter((event) =>
    matchesFilter(query, event.title, event.detail, event.time),
  );

  const showEntityPanel = matchesFilter(
    query,
    "Entity Dossier & Official Information",
    "IMMUTABLE REGISTRATION",
    ...profileFields.flatMap((field) => [
      field.label,
      field.placeholder,
      company.entity[field.key],
    ]),
  );
  const showTeamPanel = matchesFilter(
    query,
    "Authorized Team & Recruiter Affiliations",
    "Invite Recruiter",
    "company-domain email",
    ...company.members.flatMap((member) => [
      member.name,
      member.email,
      member.title,
      member.role,
      member.status,
    ]),
  );
  const showCompliancePanel = matchesFilter(
    query,
    "Compliance Dossier",
    "Dual-Check Verification Architecture",
    "Company Legitimacy",
    "Recruiter Affiliation",
    "Immutable Record",
    ...company.attachments.flatMap((attachment) => [
      attachment.label,
      attachment.fileName,
      attachment.status,
    ]),
  );
  const showAuditPanel = matchesFilter(
    query,
    "Governance & Audit Trail",
    "SHA-256 LEDGER",
    "Audit trail synchronized with ground truth",
    ...company.auditEvents.flatMap((event) => [event.title, event.detail, event.time]),
  );

  const updateEntity = <K extends keyof CompanyEntity>(
    key: K,
    value: CompanyEntity[K],
  ) => {
    setCompany((current) => ({
      ...current,
      entity: { ...current.entity, [key]: value },
    }));
    setSaved(false);
  };

  const saveChanges = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    setDomainMessage("");
  };

  const reverifyDomain = () => {
    setDomainMessage(
      company.entity.website.trim()
        ? "Domain verification is pending a secure server-side check."
        : "Add an official website before requesting domain verification.",
    );
  };

  const attachFile = (attachmentId: string, file: File | undefined) => {
    if (!file) return;
    setCompany((current) => ({
      ...current,
      attachments: current.attachments.map((attachment) =>
        attachment.id === attachmentId
          ? { ...attachment, fileName: file.name }
          : attachment,
      ),
    }));
  };

  const inviteRecruiter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const role = String(formData.get("role") ?? "Job Post & Review") as MemberRole;
    if (!name || !email || !title) return;

    const member: CompanyMember = {
      id: `${Date.now()}-${email.toLowerCase()}`,
      name,
      email,
      title,
      role,
      status: "Pending",
    };
    setCompany((current) => ({
      ...current,
      members: [...current.members, member],
    }));
    setInviteOpen(false);
    setInviteMessage(
      "Recruiter added as pending. Affiliation review and invitation delivery require the connected backend.",
    );
    event.currentTarget.reset();
  };

  const renderField = (field: (typeof profileFields)[number]) => {
    if (!matchesFilter(query, field.label, field.placeholder, company.entity[field.key])) {
      return null;
    }

    const inputId = `company-${field.key}`;
    return (
      <div className="min-w-0" key={field.key}>
        <label
          className="mb-1.5 block text-xs font-medium text-muted-foreground"
          htmlFor={inputId}
        >
          {field.label}
        </label>
        {field.key === "website" && (
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-mono text-amber-700 dark:text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-500" />
            DNS verification pending
          </div>
        )}
        {field.multiline ? (
          <textarea
            className={`${fieldClass} min-h-24 resize-y leading-relaxed`}
            id={inputId}
            onChange={(event) => updateEntity(field.key, event.currentTarget.value)}
            placeholder={field.placeholder}
            rows={3}
            value={company.entity[field.key]}
          />
        ) : (
          <input
            className={`${fieldClass} ${field.className ?? ""}`}
            id={inputId}
            onChange={(event) => updateEntity(field.key, event.currentTarget.value)}
            placeholder={field.placeholder}
            type={field.key === "website" ? "url" : "text"}
            value={company.entity[field.key]}
          />
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1440px] space-y-6">
      <header className="sticky top-0 z-20 -mx-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>Recruiter</span>
              <span aria-hidden="true">/</span>
              <span>Company Profile</span>
              <span className="text-[#F97316]">•</span>
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
              Company Profile &amp; Accreditation
            </h1>
          </div>

          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
            <label className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
              <Search
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground"
              />
              <span className="sr-only">Filter fields or records</span>
              <input
                className="min-h-9 w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Filter fields or records..."
                type="search"
                value={search}
              />
            </label>
            <button
              className={buttonSecondaryClass}
              onClick={() => downloadProfile(company)}
              type="button"
            >
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              Export Profile
            </button>
            <button
              aria-expanded={securityInfoOpen}
              aria-label="Accreditation security information"
              className="flex size-9 items-center justify-center self-end rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:self-auto"
              onClick={() => setSecurityInfoOpen((open) => !open)}
              title="Accreditation security information"
              type="button"
            >
              <ShieldCheck aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
        {securityInfoOpen && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-secondary/60 p-3 text-xs text-muted-foreground">
            <LockKeyhole aria-hidden="true" className="size-4 shrink-0" />
            Company legitimacy and recruiter affiliation are reviewed separately.
            No verification is implied until both checks are completed.
          </div>
        )}
      </header>

      <div className="min-w-0 space-y-6">
        <section
          aria-label="Company accreditation overview"
          className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {visibleMetrics.map((metric) => (
            <MetricCard key={metric.id} {...metric} />
          ))}
          {visibleMetrics.length === 0 && query && (
            <p className="col-span-full rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
              No company overview cards match “{search}”.
            </p>
          )}
        </section>

        <section
          aria-label="Company profile and verification"
          className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-12"
        >
          <div className="min-w-0 space-y-6 xl:col-span-8">
            {showEntityPanel && (
              <section className={`${panelClass} space-y-5`}>
                <PanelHeading
                  Icon={Building2}
                  title="Entity Dossier & Official Information"
                  meta="IMMUTABLE REGISTRATION • RJSC #2"
                />
                <form className="space-y-4" onSubmit={saveChanges}>
                  <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                    {visibleFields
                      .filter(
                        (field) =>
                          field.key === "legalName" || field.key === "website",
                      )
                      .map(renderField)}
                  </div>
                  <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                    {visibleFields
                      .filter(
                        (field) =>
                          field.key === "industry" ||
                          field.key === "registrationReference",
                      )
                      .map(renderField)}
                  </div>
                  {visibleFields
                    .filter((field) => field.key === "headquarters")
                    .map(renderField)}
                  {visibleFields
                    .filter((field) => field.key === "description")
                    .map(renderField)}
                  {visibleFields.length === 0 && query && (
                    <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                      No company fields match “{search}”.
                    </p>
                  )}
                  {matchesFilter(
                    query,
                    "Business Description / Engineering Focus",
                  ) && (
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      This context helps authorized recruiters understand the
                      company’s engineering focus. It does not determine candidate
                      suitability.
                    </p>
                  )}
                  <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <button
                        className={buttonSecondaryClass}
                        onClick={reverifyDomain}
                        type="button"
                      >
                        <RefreshCw aria-hidden="true" className="size-4" />
                        Re-verify Domain
                      </button>
                      {domainMessage && (
                        <p aria-live="polite" className="mt-2 text-xs text-muted-foreground">
                          {domainMessage}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      {saved && (
                        <span
                          aria-live="polite"
                          className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400"
                        >
                          <Check aria-hidden="true" className="size-4" />
                          Changes saved locally
                        </span>
                      )}
                      <button
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-5 py-2 text-[13px] font-semibold text-[#18181B] transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        type="submit"
                      >
                        <Save aria-hidden="true" className="size-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            )}

            {showTeamPanel && (
              <section className={`${panelClass} space-y-4`}>
                <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Users
                        aria-hidden="true"
                        className="size-5 shrink-0 text-[#F97316]"
                      />
                      <h2 className="text-base font-bold tracking-tight text-foreground">
                        Authorized Team &amp; Recruiter Affiliations
                      </h2>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Recruiter-company affiliation is reviewed separately from
                      company legitimacy.
                    </p>
                  </div>
                  <button
                    className="inline-flex min-h-9 items-center justify-center gap-1.5 self-start rounded-lg border border-[#F97316] px-3 text-xs font-semibold text-[#F97316] transition-colors hover:bg-[#F97316] hover:text-[#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:self-auto"
                    onClick={() => {
                      setInviteMessage("");
                      setInviteOpen(true);
                    }}
                    type="button"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                    Invite Recruiter
                  </button>
                </div>

                <div className="flex items-start gap-2 rounded-lg border border-border bg-secondary/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
                  <Info
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                  />
                  <span>
                    Company-domain email is preferred, but email domain alone does
                    not establish affiliation. Alternate authorization evidence can
                    be reviewed.
                  </span>
                </div>

                <div className="space-y-3">
                  {visibleMembers.map((member) => (
                    <MemberRow key={member.id} member={member} />
                  ))}
                  {visibleMembers.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
                      <UserRound
                        aria-hidden="true"
                        className="mx-auto size-5 text-muted-foreground"
                      />
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {company.members.length === 0
                          ? "No affiliated recruiters added yet"
                          : "No recruiters match this filter"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Invite a recruiter to begin affiliation review.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {!showEntityPanel && !showTeamPanel && query && (
              <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No company profile sections match “{search}”.
              </p>
            )}
          </div>

          <div className="min-w-0 space-y-6 xl:col-span-4">
            {showCompliancePanel && (
              <section className={`${panelClass} flex flex-col gap-5`}>
                <PanelHeading
                  Icon={ShieldCheck}
                  title="Compliance Dossier"
                  badge="Dual-Check"
                />

                <div className="space-y-3.5 rounded-lg border border-border bg-secondary/40 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Dual-Check Verification Architecture
                  </p>
                  <VerificationCheck
                    number="1."
                    title="Company Legitimacy"
                    description="Company details and official evidence are awaiting review."
                  />
                  <VerificationCheck
                    number="2."
                    title="Recruiter Affiliation"
                    description="Recruiter authorization evidence is awaiting review."
                    last
                  />
                </div>

                <div className="space-y-2.5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Official Verified Attachments
                  </p>
                  <div className="space-y-2">
                    {visibleAttachments.map((attachment) => (
                      <AttachmentRow
                        attachment={attachment}
                        key={attachment.id}
                        onFileChange={(file) =>
                          attachFile(attachment.id, file)
                        }
                      />
                    ))}
                    {visibleAttachments.length === 0 && query && (
                      <p className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
                        No attachments match “{search}”.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-lg border border-amber-300/50 bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-900 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200">
                  <AlertTriangle
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <p>
                    <span className="font-semibold">Immutable Record:</span>{" "}
                    Verification decisions and evidence references are retained for
                    audit. Changes may require a new review.
                  </p>
                </div>
              </section>
            )}

            {showAuditPanel && (
              <section className={`${panelClass} flex flex-col gap-5`}>
                <PanelHeading
                  Icon={History}
                  title="Governance & Audit Trail"
                  meta="SHA-256 LEDGER"
                />
                {visibleAuditEvents.length > 0 ? (
                  <ol className="space-y-4">
                    {visibleAuditEvents.map((event) => (
                      <AuditEvent event={event} key={event.id} />
                    ))}
                  </ol>
                ) : (
                  <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
                    <Clock3
                      aria-hidden="true"
                      className="mx-auto size-5 text-muted-foreground"
                    />
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {company.auditEvents.length === 0
                        ? "No governance or audit events yet"
                        : "No audit events match this filter"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Events will appear after a verification or governance action.
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-secondary/40 p-3">
                  <span className="flex min-w-0 items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="size-2 shrink-0 rounded-full bg-amber-500" />
                    Audit trail synchronized with ground truth when connected
                  </span>
                  <span className="shrink-0 rounded border border-amber-300/60 px-1.5 py-0.5 font-mono text-[10px] text-amber-700 dark:border-amber-700 dark:text-amber-300">
                    Awaiting connection
                  </span>
                </div>
              </section>
            )}

            {!showCompliancePanel && !showAuditPanel && query && (
              <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No compliance or audit sections match “{search}”.
              </p>
            )}
          </div>
        </section>

        <footer className="flex flex-col items-start justify-between gap-2 border-t border-border py-4 text-[11px] text-muted-foreground sm:flex-row sm:items-center">
          <span>
            Company accreditation and recruiter affiliation are separate review
            checks.
          </span>
          <span className="inline-flex items-center gap-1">
            <CircleHelp aria-hidden="true" className="size-3.5" />
            Need verification support? Contact platform compliance.
          </span>
        </footer>
      </div>

      {inviteOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setInviteOpen(false);
          }}
        >
          <section
            aria-labelledby="invite-recruiter-title"
            aria-modal="true"
            className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-xl"
            role="dialog"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2
                  className="text-base font-semibold text-foreground"
                  id="invite-recruiter-title"
                >
                  Invite recruiter
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Added members remain pending until affiliation review.
                </p>
              </div>
              <button
                aria-label="Close invite form"
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setInviteOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={inviteRecruiter}>
              <InviteField id="invite-name" label="Recruiter name" name="name" />
              <InviteField
                id="invite-email"
                label="Email address"
                name="email"
                type="email"
              />
              <InviteField
                id="invite-title"
                label="Job title"
                name="title"
                placeholder="e.g., Technical Recruiter"
              />
              <div>
                <label
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  htmlFor="invite-role"
                >
                  Access role
                </label>
                <select
                  className={fieldClass}
                  defaultValue="Job Post & Review"
                  id="invite-role"
                  name="role"
                >
                  <option>Primary Admin</option>
                  <option>Full Access</option>
                  <option>Job Post &amp; Review</option>
                </select>
              </div>
              {inviteMessage && (
                <p aria-live="polite" className="text-xs text-muted-foreground">
                  {inviteMessage}
                </p>
              )}
              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <button
                  className={buttonSecondaryClass}
                  onClick={() => setInviteOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-[#F97316] px-3.5 text-xs font-semibold text-[#18181B] hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  type="submit"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Add pending recruiter
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {inviteMessage && !inviteOpen && (
        <div
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-border bg-card p-3 text-xs text-foreground shadow-lg"
        >
          {inviteMessage}
        </div>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  detail,
  badge,
  Icon,
  tone,
}: {
  id: string;
  title: string;
  value: string;
  detail: string;
  badge: string;
  Icon: LucideIcon;
  tone: "warning" | "neutral";
}) {
  const iconClasses =
    tone === "warning"
      ? "border-amber-300/60 bg-amber-50 text-amber-700 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-300"
      : "border-border bg-secondary text-muted-foreground";
  const badgeClasses =
    tone === "warning"
      ? "border-amber-300/60 bg-amber-50 text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200"
      : "border-border bg-secondary text-muted-foreground";

  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/80 dark:border-[#25252A] dark:bg-[#121417]">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-xs font-medium text-muted-foreground">{title}</h2>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-md border ${iconClasses}`}
        >
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </div>
      <p className="break-words text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
        {value}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 dark:border-[#222226]">
        <span className="text-[11px] text-muted-foreground">{detail}</span>
        <span
          className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${badgeClasses}`}
        >
          {badge}
        </span>
      </div>
    </article>
  );
}

function PanelHeading({
  Icon,
  title,
  meta,
  badge,
}: {
  Icon: LucideIcon;
  title: string;
  meta?: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-2">
        <Icon aria-hidden="true" className="size-5 shrink-0 text-[#F97316]" />
        <h2 className="text-base font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      {meta && (
        <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
          {meta}
        </span>
      )}
      {badge && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded border border-amber-300/60 bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200">
          <span className="size-1.5 rounded-full bg-amber-500" />
          {badge}
        </span>
      )}
    </div>
  );
}

function VerificationCheck({
  number,
  title,
  description,
  last = false,
}: {
  number: string;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "border-b border-border pb-3"}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-foreground">
          {number} {title}
        </h3>
        <PendingBadge />
      </div>
      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function PendingBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-amber-300/60 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200">
      <Clock3 aria-hidden="true" className="size-3" />
      Pending Verification
    </span>
  );
}

function AttachmentRow({
  attachment,
  onFileChange,
}: {
  attachment: CompanyAttachment;
  onFileChange: (file: File | undefined) => void;
}) {
  const inputId = `attachment-${attachment.id}`;
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-background/60 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-2">
        <FileText
          aria-hidden="true"
          className="mt-0.5 size-[18px] shrink-0 text-[#F97316]"
        />
        <div className="min-w-0">
          <p className="break-words text-xs font-medium text-foreground">
            {attachment.label}
          </p>
          <p className="mt-0.5 break-all font-mono text-[10px] text-muted-foreground">
            {attachment.fileName ?? "No document attached"}
          </p>
          <div className="mt-1">
            <PendingBadge />
          </div>
        </div>
      </div>
      <input
        accept=".pdf,.png,.jpg,.jpeg"
        className="sr-only"
        id={inputId}
        onChange={(event) => onFileChange(event.currentTarget.files?.[0])}
        type="file"
      />
      <label
        className="inline-flex min-h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-lg border border-border px-2.5 text-[11px] font-medium text-foreground transition-colors hover:bg-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring sm:self-auto"
        htmlFor={inputId}
      >
        {attachment.fileName ? (
          <FileCheck2 aria-hidden="true" className="size-3.5" />
        ) : (
          <Upload aria-hidden="true" className="size-3.5" />
        )}
        {attachment.fileName ? "Replace" : "Attach"}
      </label>
    </div>
  );
}

function MemberRow({ member }: { member: CompanyMember }) {
  const statusClass =
    member.status === "Active"
      ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-[#1A3D2C] dark:bg-[#13281E] dark:text-emerald-300"
      : "border-amber-300/60 bg-amber-50 text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200";
  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-bold text-foreground">
          {getInitials(member.name)}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[13px] font-semibold text-foreground">
              {member.name}
            </p>
            <span className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {member.role}
            </span>
          </div>
          <p className="mt-0.5 break-all font-mono text-[11px] text-muted-foreground">
            {member.email} · {member.title}
          </p>
        </div>
      </div>
      <span
        className={`inline-flex w-fit shrink-0 items-center gap-1 rounded border px-2 py-0.5 font-mono text-[10px] ${statusClass}`}
      >
        {member.status === "Active" ? (
          <BadgeCheck aria-hidden="true" className="size-3" />
        ) : (
          <Clock3 aria-hidden="true" className="size-3" />
        )}
        {member.status}
      </span>
    </article>
  );
}

function AuditEvent({ event }: { event: CompanyAuditEvent }) {
  const iconClasses = {
    neutral: "border-border bg-secondary text-muted-foreground",
    warning:
      "border-amber-300/60 bg-amber-50 text-amber-800 dark:border-[#44301B] dark:bg-[#2C2114] dark:text-amber-200",
    success:
      "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-[#1A3D2C] dark:bg-[#13281E] dark:text-emerald-300",
  }[event.tone];
  return (
    <li className="relative flex min-w-0 items-start gap-3">
      <span
        className={`relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border ${iconClasses}`}
      >
        <History aria-hidden="true" className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="break-words text-xs font-semibold text-foreground">
          {event.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[11px] text-muted-foreground">
            {event.detail}
          </span>
          <time className="font-mono text-[10px] text-muted-foreground">
            {event.time}
          </time>
        </div>
      </div>
    </li>
  );
}

function InviteField({
  id,
  label,
  name,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "email";
}) {
  return (
    <div>
      <label
        className="mb-1.5 block text-xs font-medium text-muted-foreground"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        autoComplete={name === "email" ? "email" : "off"}
        className={fieldClass}
        id={id}
        name={name}
        placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
        required
        type={type}
      />
    </div>
  );
}
