"use client";

import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Download,
  Fingerprint,
  Info,
  KeyRound,
  LockKeyhole,
  Moon,
  Palette,
  Search,
  ShieldCheck,
  Sun,
  Trash2,
  Upload,
  UserRound,
  Users,
  Webhook,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useState,
} from "react";
import { useChangePassword } from "@/hooks";
import { useTheme, type Theme } from "@/providers/themeProvider";

type ProfileDraft = {
  legalName: string;
  designation: string;
  email: string;
  phone: string;
  timezone: string;
};

type NotificationKey =
  | "applications"
  | "assessments"
  | "integrity"
  | "offers"
  | "digest";

const initialProfile: ProfileDraft = {
  legalName: "",
  designation: "",
  email: "",
  phone: "",
  timezone: "Asia/Dhaka (BST, UTC+6)",
};

const settingsSections = [
  { id: "profile-identity", label: "Profile & Identity", icon: Fingerprint },
  { id: "company-affiliation", label: "Company Affiliation", icon: Users },
  {
    id: "authentication-security",
    label: "Authentication & Security",
    icon: ShieldCheck,
  },
  {
    id: "notifications-alerts",
    label: "Notifications & Alerts",
    icon: Bell,
  },
  { id: "appearance-audit", label: "Appearance & Audit", icon: Palette },
] as const;

const notificationOptions: {
  key: NotificationKey;
  title: string;
  description: string;
}[] = [
  {
    key: "applications",
    title: "Candidate applications",
    description: "Instant email alert when a high-match candidate applies.",
  },
  {
    key: "assessments",
    title: "Assessment completions",
    description: "Notification when an assessment finishes auto-grading.",
  },
  {
    key: "integrity",
    title: "Integrity & anomaly flags",
    description: "Alerts for integrity and anomaly events.",
  },
  {
    key: "offers",
    title: "Offer status updates",
    description: "Updates on candidate counter-proposals or acceptance.",
  },
  {
    key: "digest",
    title: "Weekly pipeline digest",
    description: "A weekly summary of your hiring pipeline.",
  },
];

const themeOptions: {
  theme: Theme;
  title: string;
  caption: string;
  icon: typeof Moon;
}[] = [
  { theme: "dark", title: "Dark mode", caption: "Selected", icon: Moon },
  { theme: "light", title: "Light mode", caption: "Available", icon: Sun },
  {
    theme: "system",
    title: "System Auto-detect",
    caption: "Sync with OS",
    icon: Palette,
  },
];

const cardClass =
  "min-w-0 rounded-xl border border-[#1F242D] bg-[#121417] p-4 shadow-sm sm:p-5";
const insetClass =
  "min-w-0 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3 sm:p-4";
const fieldClass =
  "h-10 w-full min-w-0 rounded-lg border border-[#1F242D] bg-[#16191D] px-3 text-sm text-[#F4F4F5] placeholder:text-[#71717A] outline-none transition focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]";
const mutedClass = "text-xs leading-relaxed text-[#858A94]";

function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "orange";
}) {
  const toneClass =
    tone === "green"
      ? "border-[#214833] bg-[#12251B] text-[#4ADE80]"
      : tone === "orange"
        ? "border-[#633314] bg-[#2A1B11] text-[#FB923C]"
        : "border-[#30343C] bg-[#191C21] text-[#A1A1AA]";

  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 break-words rounded border px-2 py-1 text-[11px] font-medium ${toneClass}`}
    >
      {children}
    </span>
  );
}

function CardHeading({
  icon: Icon,
  title,
  subtitle,
  trailing,
}: {
  icon: typeof Fingerprint;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 border-b border-[#252930] pb-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-5 shrink-0 text-[#F97316]" />
          <h2 className="break-words text-base font-semibold text-white">
            {title}
          </h2>
        </div>
        {subtitle && <p className={`${mutedClass} mt-1`}>{subtitle}</p>}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

function Field({
  label,
  marker,
  helper,
  children,
}: {
  label: string;
  marker?: ReactNode;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <span className="text-xs font-medium text-[#D4D4D8]">{label}</span>
        {marker}
      </div>
      {children}
      {helper && <p className={mutedClass}>{helper}</p>}
    </div>
  );
}

function SectionTab({
  id,
  label,
  icon: Icon,
  active,
  badge,
  statusDot,
  onSelect,
}: {
  id: string;
  label: string;
  icon: typeof Fingerprint;
  active: boolean;
  badge?: string;
  statusDot?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-current={active ? "location" : undefined}
      className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-md border-b-2 px-2 py-3 text-left text-xs font-semibold transition-colors lg:w-auto lg:justify-start lg:px-3 ${
        active
          ? "border-[#F97316] bg-[#191A1E] text-white"
          : "border-transparent text-[#A1A1AA] hover:border-[#3B4049] hover:text-white"
      }`}
    >
      <Icon className="size-4 shrink-0 text-[#F97316]" />
      <span className="whitespace-nowrap">{label}</span>
      {badge && (
        <span className="shrink-0 whitespace-nowrap rounded bg-[#20242B] px-1.5 py-0.5 font-mono text-[10px] text-[#B3B7BF]">
          {badge}
        </span>
      )}
      {statusDot && (
        <span
          aria-label="Security enforced"
          className="size-1.5 shrink-0 rounded-full bg-emerald-400"
        />
      )}
    </button>
  );
}

export default function RecruiterSettingsView() {
  const { theme, setTheme } = useTheme();
  const changePassword = useChangePassword();
  const [profile, setProfile] = useState<ProfileDraft>(initialProfile);
  const [savedProfile, setSavedProfile] =
    useState<ProfileDraft>(initialProfile);
  const [avatarName, setAvatarName] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState<
    Record<NotificationKey, boolean>
  >({
    applications: true,
    assessments: true,
    integrity: true,
    offers: true,
    digest: false,
  });
  const [activeSection, setActiveSection] = useState("profile-identity");
  const [search, setSearch] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const updateProfileField = (
    field: keyof ProfileDraft,
    value: string,
  ) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setProfileError("");
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleProfileSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile.legalName.trim()) {
      setProfileError("Enter your full legal name before saving.");
      return;
    }
    setSavedProfile(profile);
    setProfileError("");
    setStatusMessage("Profile draft saved for this session.");
  };

  const handleDiscard = () => {
    setProfile(savedProfile);
    setProfileError("");
    setStatusMessage("Unsaved profile changes were discarded.");
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarName(file.name);
      setStatusMessage(`Selected avatar file: ${file.name}`);
    }
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText("Unassigned");
      setStatusMessage("Copied key status: Unassigned.");
    } catch {
      setStatusMessage("Clipboard access is unavailable in this browser.");
    }
  };

  const handleExport = () => {
    const data = {
      profile,
      organization: "Unassigned",
      cryptographicKey: "Not provisioned",
      notificationPreferences: notifications,
      theme,
    };
    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "talentgraph-recruiter-settings.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage("Settings export downloaded.");
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedSearch = search.trim().toLowerCase();
    const matchingSection = settingsSections.find((section) =>
      section.label.toLowerCase().includes(normalizedSearch),
    );
    if (matchingSection) {
      scrollToSection(matchingSection.id);
      setStatusMessage(`Showing ${matchingSection.label}.`);
    } else {
      setStatusMessage(
        normalizedSearch
          ? "No settings section matches that search."
          : "Enter a section name to search settings.",
      );
    }
  };

  const handlePasswordUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordError("Complete all password fields.");
      return;
    }
    if (passwords.next.length < 12) {
      setPasswordError("Your new password must be at least 12 characters.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordError("The new password and confirmation do not match.");
      return;
    }
    setPasswordError("");
    changePassword.mutate(
      { oldPassword: passwords.current, newPassword: passwords.next },
      {
        onSuccess: () => {
          setPasswords({ current: "", next: "", confirm: "" });
          setStatusMessage("Password updated successfully.");
        },
      },
    );
  };

  const initials =
    profile.legalName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "--";

  return (
    <div className="-m-4 min-w-0 bg-[#0B0C0E] text-[#E4E4E7] sm:-m-6 lg:-m-8">
      <header className="border-b border-[#1F242D] bg-[#121417]/95 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-wide text-[#858A94]">
              <span>RECRUITER</span>
              <span>/</span>
              <span>SETTINGS</span>
              <span>/</span>
              <span className="font-semibold text-[#F97316]">
                ACCOUNT &amp; PREFERENCES
              </span>
            </div>
            <h1 className="mt-1 break-words text-xl font-semibold tracking-tight text-white">
              Recruiter settings
            </h1>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <form
              onSubmit={handleSearch}
              className="relative min-w-[min(100%,240px)] flex-1 sm:flex-none"
            >
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#858A94]" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search configuration, tokens, logs..."
                aria-label="Search configuration, tokens, and logs"
                className="h-9 w-full rounded-lg border border-[#1F242D] bg-[#0B0C0E] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#71717A] focus:border-[#F97316]"
              />
            </form>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#1F242D] bg-[#191C21] px-3 text-xs font-medium text-white hover:bg-[#242830]"
            >
              <Download className="size-4" />
              <span>Export</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("profile-identity")}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#F97316] px-3 text-xs font-semibold text-[#17120F] hover:bg-[#FB923C]"
            >
              <Zap className="size-4" />
              <span>Quick actions</span>
            </button>
            <button
              type="button"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => scrollToSection("notifications-alerts")}
              className="flex size-9 items-center justify-center rounded-lg border border-[#1F242D] bg-[#191C21] text-[#A1A1AA] hover:text-white"
            >
              <Bell className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Recruiter account profile"
              title="Unconfigured recruiter"
              onClick={() => scrollToSection("profile-identity")}
              className="flex size-9 items-center justify-center rounded-full border border-[#30343C] bg-[#22262D] text-xs font-semibold text-white"
            >
              {initials}
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-[#1F242D] bg-[#0E1013] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-wide text-[#858A94]">
                <span>RECRUITER</span>
                <span>/</span>
                <span>SETTINGS</span>
                <span>/</span>
                <span className="font-semibold text-[#F97316]">
                  ACCOUNT &amp; PREFERENCES
                </span>
              </div>
              <p className="mt-1 max-w-3xl text-xs leading-relaxed text-[#858A94]">
                Manage authorized recruiter identity, enterprise company
                affiliation, security credentials, and alert routing.
              </p>
            </div>
            <StatusPill tone="green">
              <span className="size-2 shrink-0 rounded-full bg-emerald-400" />
              <span>Ledger Ready: Unlinked</span>
            </StatusPill>
          </div>

          <nav
            aria-label="Recruiter settings sections"
            className="mt-4 grid min-w-0 grid-cols-1 gap-2 border-b border-[#252930] pb-2 sm:grid-cols-2 lg:flex lg:flex-wrap"
          >
            {settingsSections.map((section) => (
              <SectionTab
                key={section.id}
                {...section}
                active={activeSection === section.id}
                badge={
                  section.id === "company-affiliation" ? "Unassigned" : undefined
                }
                statusDot={section.id === "authentication-security"}
                onSelect={scrollToSection}
              />
            ))}
          </nav>
          {statusMessage && (
            <p className="mt-3 break-words text-xs text-[#FDBA74]" role="status">
              {statusMessage}
            </p>
          )}
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-5 xl:col-span-8">
            <section id="profile-identity" className={cardClass}>
              <CardHeading
                icon={Fingerprint}
                title="Recruiter profile"
                subtitle="Authorized platform identity used for signing offer letters and candidate evaluations."
                trailing={<StatusPill tone="orange">Authority Pending</StatusPill>}
              />

              <div className={`${insetClass} mt-4 flex flex-col gap-4 sm:flex-row sm:items-center`}>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-sm font-bold text-white">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="break-words text-sm font-semibold text-white">
                      {profile.legalName.trim() || "Unconfigured Recruiter"}
                    </span>
                    <span className="break-all rounded border border-[#30343C] bg-[#111316] px-2 py-0.5 font-mono text-[11px] text-[#A1A1AA]">
                      #TG-USR-UNASSIGNED
                    </span>
                    <StatusPill>Cert Pending</StatusPill>
                  </div>
                  <p className={`${mutedClass} mt-1`}>
                    Avatar displays on candidate portal, evaluation signoffs,
                    and offer packages. PNG or JPG up to 2MB.
                  </p>
                  {avatarName && (
                    <p className="mt-1 break-all font-mono text-[10px] text-[#FDBA74]">
                      Selected file: {avatarName}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <label className="relative inline-flex h-8 cursor-pointer items-center gap-1.5 overflow-hidden rounded-md border border-[#30343C] bg-[#191C21] px-3 text-xs font-medium text-[#D4D4D8] hover:bg-[#242830]">
                    <Upload className="size-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      aria-label="Upload recruiter avatar"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </label>
                  <button
                    type="button"
                    aria-label="Delete selected avatar"
                    title="Delete selected avatar"
                    onClick={() => {
                      setAvatarName("");
                      setStatusMessage("Selected avatar was removed.");
                    }}
                    className="flex size-8 items-center justify-center rounded-md border border-[#30343C] bg-[#191C21] text-[#A1A1AA] hover:border-red-900 hover:text-red-400"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleProfileSave} className="mt-5">
                <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Full Legal Name"
                    marker={<span className="font-mono text-[10px] text-[#858A94]">REQUIRED</span>}
                    helper="Matches verified government credentials for automated NDA execution."
                  >
                    <input
                      required
                      value={profile.legalName}
                      onChange={(event) =>
                        updateProfileField("legalName", event.target.value)
                      }
                      placeholder="Enter your full legal name"
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    label="Professional Designation"
                    marker={<span className="font-mono text-[10px] text-[#858A94]">PUBLIC</span>}
                    helper="Visible on candidate invitation dispatches and public job listings."
                  >
                    <input
                      value={profile.designation}
                      onChange={(event) =>
                        updateProfileField("designation", event.target.value)
                      }
                      placeholder="Enter your designation"
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    label="Work Email"
                    marker={<StatusPill>SSO / Unverified</StatusPill>}
                    helper="Managed via enterprise Single Sign-On (SSO / SAML 2.0)."
                  >
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(event) =>
                        updateProfileField("email", event.target.value)
                      }
                      placeholder="name@company.com"
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    label="Phone Number"
                    marker={<span className="font-mono text-[10px] text-[#858A94]">OUT-OF-BAND</span>}
                    helper="Used strictly for out-of-band 2FA escalation and critical alert triggers."
                  >
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(event) =>
                        updateProfileField("phone", event.target.value)
                      }
                      placeholder="Enter a phone number"
                      className={fieldClass}
                    />
                  </Field>
                  <Field
                    label="Timezone"
                    helper="Sets timeline anchors for candidate interview availability schedules."
                  >
                    <div className="relative min-w-0">
                      <select
                        value={profile.timezone}
                        onChange={(event) =>
                          updateProfileField("timezone", event.target.value)
                        }
                        className={`${fieldClass} appearance-none pr-9`}
                      >
                        <option>Asia/Dhaka (BST, UTC+6)</option>
                        <option>Asia/Singapore (SGT, UTC+8)</option>
                        <option>Europe/London (GMT/BST, UTC+0/+1)</option>
                        <option>America/New_York (EST/EDT, UTC-5/-4)</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#858A94]" />
                    </div>
                  </Field>
                  <Field
                    label="Cryptographic Key ID"
                    marker={<span className="font-mono text-[10px] text-[#F97316]">IMMUTABLE</span>}
                    helper="Appended to evaluation attestations on the talent governance ledger."
                  >
                    <div className="relative min-w-0">
                      <input
                        readOnly
                        value="Unassigned"
                        aria-label="Cryptographic key ID"
                        className={`${fieldClass} bg-[#171A1F] pr-10 font-mono text-xs text-[#A1A1AA]`}
                      />
                      <button
                        type="button"
                        onClick={handleCopyKey}
                        title="Copy key status"
                        aria-label="Copy key status"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#858A94] hover:text-white"
                      >
                        <Copy className="size-4" />
                      </button>
                    </div>
                  </Field>
                </div>
                {profileError && (
                  <p className="mt-3 text-xs text-red-400" role="alert">
                    {profileError}
                  </p>
                )}
                <div className="mt-5 flex min-w-0 flex-col gap-3 border-t border-[#252930] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="break-words font-mono text-[11px] text-[#858A94]">
                    Last profile sync: Never synced
                  </p>
                  <div className="flex min-w-0 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleDiscard}
                      className="min-h-9 rounded-lg border border-[#30343C] bg-[#191C21] px-3 text-xs font-medium text-[#D4D4D8] hover:bg-[#242830]"
                    >
                      Discard changes
                    </button>
                    <button
                      type="submit"
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[#F97316] px-3 text-xs font-semibold text-[#17120F] hover:bg-[#FB923C]"
                    >
                      <Check className="size-4" />
                      <span>Save profile changes</span>
                    </button>
                  </div>
                </div>
              </form>
            </section>

            <section id="company-affiliation" className={cardClass}>
              <CardHeading
                icon={Users}
                title="Organization membership"
                subtitle="Corporate entity linkage and verified recruiter issuance privileges."
                trailing={
                  <span className="max-w-full break-words rounded border border-[#30343C] bg-[#191C21] px-2.5 py-1 font-mono text-[11px] text-[#A1A1AA]">
                    Enterprise Tenant ID: Unassigned
                  </span>
                }
              />
              <div className={`${insetClass} mt-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#30343C] bg-[#20242B] font-semibold text-white">
                    --
                  </div>
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="break-words text-sm font-semibold text-white">
                        No Organization Linked
                      </span>
                      <StatusPill>DNS Unverified</StatusPill>
                    </div>
                    <p className={`${mutedClass} mt-1 break-words`}>
                      Corporate Domain: — • DNS TXT Pending • Root Tenant
                    </p>
                  </div>
                </div>
                <Link
                  href="/recruiter/company"
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#FB923C] hover:text-[#FDBA74]"
                >
                  <span>View company profile</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  {
                    title: "RECRUITER RELATIONSHIP",
                    value: "Not linked",
                    detail: "No verified company affiliation",
                    footer: "Verification pending",
                  },
                  {
                    title: "COMPANY LEGITIMACY",
                    value: "Not verified",
                    detail: "Organization record unavailable",
                    footer: "No registry evidence",
                  },
                  {
                    title: "PUBLISHING CLEARANCE",
                    value: "Not provisioned",
                    detail: "Issuer privileges unavailable",
                    footer: "No active clearance",
                  },
                ].map((item) => (
                  <div key={item.title} className={`${insetClass} flex flex-col justify-between gap-3`}>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="break-words font-mono text-[10px] uppercase tracking-wider text-[#858A94]">
                        {item.title}
                      </span>
                      <span className="break-words text-sm font-medium text-white">
                        {item.value}
                      </span>
                      <span className={mutedClass}>{item.detail}</span>
                    </div>
                    <div className="border-t border-[#252930] pt-2 font-mono text-[10px] text-[#A1A1AA]">
                      {item.footer}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex min-w-0 flex-col gap-2 rounded-lg border border-[#1F242D] bg-[#171A1F] p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-2">
                  <Info className="mt-0.5 size-4 shrink-0 text-[#858A94]" />
                  <span className={mutedClass}>
                    To request relocation to a secondary company entity or
                    branch, submit a clearance ticket.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setStatusMessage(
                      "Affiliation transfer requires enterprise provisioning.",
                    )
                  }
                  className="shrink-0 text-left text-xs font-semibold text-[#FB923C] hover:text-[#FDBA74]"
                >
                  Request affiliation transfer →
                </button>
              </div>
            </section>

            <section id="authentication-security" className={cardClass}>
              <CardHeading
                icon={LockKeyhole}
                title="Security credentials"
                subtitle="Manage operator password entropy and session revocation controls."
                trailing={
                  <StatusPill tone="green">
                    <LockKeyhole className="size-3.5" />
                    <span>2FA Enforced via TOTP</span>
                  </StatusPill>
                }
              />
              <form onSubmit={handlePasswordUpdate} className="mt-4">
                <h3 className="text-sm font-medium text-white">
                  Change Master Password
                </h3>
                <div className="mt-3 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                  <Field label="Current Password">
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={passwords.current}
                      onChange={(event) =>
                        setPasswords((current) => ({
                          ...current,
                          current: event.target.value,
                        }))
                      }
                      placeholder="Enter current password"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="New Password">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={passwords.next}
                      onChange={(event) =>
                        setPasswords((current) => ({
                          ...current,
                          next: event.target.value,
                        }))
                      }
                      placeholder="Min. 12 characters"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Confirm New Password">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={passwords.confirm}
                      onChange={(event) =>
                        setPasswords((current) => ({
                          ...current,
                          confirm: event.target.value,
                        }))
                      }
                      placeholder="Repeat new password"
                      className={fieldClass}
                    />
                  </Field>
                </div>
                {passwordError && (
                  <p className="mt-3 text-xs text-red-400" role="alert">
                    {passwordError}
                  </p>
                )}
                <div className="mt-3 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className={`${mutedClass} min-w-0`}>
                    Must be at least 12 characters with symbol, lowercase,
                    uppercase, and cryptographic entropy check.
                  </p>
                  <button
                    type="submit"
                    disabled={changePassword.isPending}
                    className="min-h-8 shrink-0 rounded-lg border border-[#30343C] bg-[#191C21] px-3 text-xs font-medium text-[#D4D4D8] hover:bg-[#242830] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {changePassword.isPending
                      ? "Updating..."
                      : "Update password"}
                  </button>
                </div>
              </form>

              <div className="mt-6 border-t border-[#252930] pt-5">
                <div className="mb-3 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      Active Recruiter Sessions
                    </h3>
                    <StatusPill>0 Devices Registered</StatusPill>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setStatusMessage("There are no other sessions to revoke.")
                    }
                    className="self-start rounded border border-[#30343C] bg-[#191C21] px-2.5 py-1.5 text-[11px] text-[#D4D4D8] hover:bg-[#242830] sm:self-auto"
                  >
                    Revoke all other sessions
                  </button>
                </div>
                <div className={`${insetClass} flex min-w-0 items-center gap-3`}>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#30343C] bg-[#20242B]">
                    <UserRound className="size-4 text-[#858A94]" />
                  </div>
                  <p className={mutedClass}>
                    No active recruiter sessions are registered.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="flex min-w-0 flex-col gap-5 xl:col-span-4">
            <section id="notifications-alerts" className={cardClass}>
              <CardHeading
                icon={Bell}
                title="Operational notifications"
                trailing={<StatusPill tone="green">Live Dispatch</StatusPill>}
              />
              <div className="mt-3 divide-y divide-[#252930]">
                {notificationOptions.map((option) => (
                  <div
                    key={option.key}
                    className="flex min-w-0 items-start justify-between gap-3 py-3"
                  >
                    <div className="min-w-0">
                      <span className="block break-words text-xs font-medium text-white">
                        {option.title}
                      </span>
                      <span className={`${mutedClass} mt-1 block`}>
                        {option.description}
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={notifications[option.key]}
                      aria-label={option.title}
                      onClick={() =>
                        setNotifications((current) => ({
                          ...current,
                          [option.key]: !current[option.key],
                        }))
                      }
                      className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                        notifications[option.key]
                          ? "bg-[#F97316]"
                          : "bg-[#30343C]"
                      }`}
                    >
                      <span
                        className={`size-4 rounded-full bg-white shadow-sm transition-transform ${
                          notifications[option.key]
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className={`${insetClass} mt-3 flex min-w-0 flex-col gap-2`}>
                <span className="break-words font-mono text-[10px] uppercase tracking-wider text-[#858A94]">
                  PRIMARY ALERT DESTINATIONS
                </span>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-1 font-mono text-[11px]">
                  <span className="text-[#D4D4D8]">Work Email:</span>
                  <span className="break-words text-[#A1A1AA]">
                    Not configured
                  </span>
                </div>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-1 font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1 text-[#D4D4D8]">
                    <Webhook className="size-3.5" />
                    Slack Webhook:
                  </span>
                  <span className="break-words text-[#A1A1AA]">
                    Not connected
                  </span>
                </div>
              </div>
            </section>

            <section id="appearance-audit" className={cardClass}>
              <CardHeading
                icon={Palette}
                title="Interface appearance"
                subtitle="Per v1.3 specification, dark mode is active by default across website shells."
              />
              <div className="mt-4 flex min-w-0 flex-col gap-1.5 rounded-lg border border-[#30343C] bg-[#191C21] p-1">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = theme === option.theme;

                  return (
                    <button
                      key={option.theme}
                      type="button"
                      onClick={() => {
                        setTheme(option.theme);
                        setStatusMessage(`${option.title} selected.`);
                      }}
                      aria-pressed={selected}
                      className={`flex min-w-0 items-center justify-between gap-2 rounded-md border p-2 text-left transition-colors ${
                        selected
                          ? "border-[#F97316] bg-[#121417] text-white"
                          : "border-transparent text-[#A1A1AA] hover:bg-[#20242B]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Icon className="size-4 shrink-0 text-[#F97316]" />
                        <span className="break-words text-xs font-medium">
                          {option.title}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 break-words font-mono text-[10px] ${
                          selected ? "text-[#FB923C]" : "text-[#858A94]"
                        }`}
                      >
                        {selected ? "Selected" : option.caption}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className={`${insetClass} mt-3 flex min-w-0 items-start gap-2`}>
                <Info className="mt-0.5 size-4 shrink-0 text-[#F97316]" />
                <p className={mutedClass}>
                  Theme controls are mirrored in the global header for
                  immediate hotkey flipping (
                  <span className="font-mono text-[#D4D4D8]">Alt + T</span>).
                </p>
              </div>
            </section>

            <section className={cardClass}>
              <CardHeading
                icon={KeyRound}
                title="Cryptographic governance"
                trailing={<StatusPill tone="green">Enforced</StatusPill>}
              />
              <div className="mt-4 flex min-w-0 flex-col gap-2.5">
                <div className={`${insetClass} flex flex-col gap-1`}>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#858A94]">
                    SIGNING PROTOCOL
                  </span>
                  <span className="break-words font-mono text-xs font-semibold text-white">
                    SHA-256 + Ed25519
                  </span>
                </div>
                <div className={`${insetClass} flex flex-col gap-1`}>
                  <span className="break-words font-mono text-[10px] uppercase tracking-wider text-[#858A94]">
                    PUBLIC VERIFICATION FINGERPRINT
                  </span>
                  <span className="break-all font-mono text-[11px] text-[#A1A1AA]">
                    Not provisioned
                  </span>
                </div>
                <div className="grid min-w-0 grid-cols-2 gap-2">
                  <div className={`${insetClass} flex min-w-0 flex-col gap-1`}>
                    <span className="break-words font-mono text-[10px] uppercase tracking-wider text-[#858A94]">
                      OFFERS SEALED
                    </span>
                    <span className="text-xl font-bold text-white">0</span>
                  </div>
                  <div className={`${insetClass} flex min-w-0 flex-col gap-1`}>
                    <span className="break-words font-mono text-[10px] uppercase tracking-wider text-[#858A94]">
                      LEDGER AUDIT
                    </span>
                    <span className="break-words font-mono text-xs font-semibold text-[#F97316]">
                      UNLINKED
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex min-w-0 items-start gap-2 text-[#858A94]">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span className={mutedClass}>
                  All setting updates are logged in the immutable platform
                  security ledger.
                </span>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <footer className="border-t border-[#1F242D] bg-[#0E1013] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-3 text-xs text-[#858A94] md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <span className="break-words">
              TalentGraph Recruiter Settings • All setting modifications require
              authenticated session token and are cryptographically audited.
            </span>
          </div>
          <a
            href="mailto:governance@talentgraph.com"
            className="flex min-w-0 items-start gap-1.5 text-[#FB923C] hover:text-[#FDBA74]"
          >
            <KeyRound className="mt-0.5 size-4 shrink-0" />
            <span className="break-words">
              Need enterprise provisioning? Contact platform governance
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
