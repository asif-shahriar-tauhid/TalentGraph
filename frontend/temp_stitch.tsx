<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Subscriptions &amp; Payments • TalentGraph Admin</title>
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "on-secondary-container": "#b5b4be",
            "secondary-container": "#46464f",
            "surface-container": "#201f21",
            "on-surface-variant": "#dec0b3",
            "surface": "#131315",
            "primary": "#ffb691",
            "surface-alternate-light": "#F8FAFC",
            "surface-selected-light": "#FFF1E8",
            "primary-fixed-dim": "#ffb691",
            "on-secondary-fixed": "#1a1b23",
            "inverse-on-surface": "#313032",
            "on-error-container": "#ffdad6",
            "surface-bright": "#39393b",
            "border-subtle-dark": "#3F3F46",
            "status-error-light": "#DC2626",
            "secondary-fixed": "#e3e1ec",
            "brand-hover-light": "#B94F0B",
            "surface-canvas-dark": "#0D0D0F",
            "surface-tint": "#ffb691",
            "surface-container-low": "#1b1b1d",
            "tertiary-container": "#2797e2",
            "text-primary-light": "#18181B",
            "on-tertiary-container": "#002c48",
            "text-secondary-dark": "#A1A1AA",
            "tertiary-fixed-dim": "#95ccff",
            "status-success-light": "#15803D",
            "status-warning-dark": "#F59E0B",
            "on-error": "#690005",
            "surface-container-high": "#2a2a2c",
            "secondary-fixed-dim": "#c7c5d0",
            "status-success-dark": "#22C55E",
            "outline-variant": "#574238",
            "on-secondary-fixed-variant": "#46464f",
            "surface-variant": "#353437",
            "on-secondary": "#2f3038",
            "on-background": "#e5e1e4",
            "brand-hover-dark": "#E47735",
            "tertiary": "#95ccff",
            "on-primary": "#552000",
            "error": "#ffb4ab",
            "error-container": "#93000a",
            "on-primary-fixed": "#341100",
            "surface-canvas-light": "#FFFFFF",
            "on-primary-container": "#4b1b00",
            "on-surface": "#e5e1e4",
            "tertiary-fixed": "#cee5ff",
            "on-tertiary-fixed-variant": "#004a75",
            "on-tertiary-fixed": "#001d32",
            "surface-selected-dark": "#252528",
            "inverse-primary": "#9f4200",
            "surface-container-lowest": "#0e0e10",
            "background": "#131315",
            "border-subtle-light": "#E4E4E7",
            "status-error-dark": "#E5484D",
            "surface-elevated-dark": "#19191C",
            "on-primary-fixed-variant": "#793100",
            "secondary": "#c7c5d0",
            "inverse-surface": "#e5e1e4",
            "status-warning-light": "#B45309",
            "primary-fixed": "#ffdbcb",
            "surface-container-highest": "#353437",
            "cta-text": "#18181B",
            "text-secondary-light": "#71717A",
            "on-tertiary": "#003353",
            "surface-elevated-light": "#FFFFFF",
            "primary-container": "#e56f27",
            "text-primary-dark": "#F5F5F5",
            "outline": "#a68b7f",
            "surface-dim": "#131315",
            /* Operational Palette tokens */
            "tg-bg": "#0E0E11",
            "tg-sidebar": "#121215",
            "tg-sidebar-border": "#222226",
            "tg-panel": "#151518",
            "tg-panel-border": "#25252A",
            "tg-inset": "#17171B",
            "tg-inset-border": "#27272C",
            "tg-input": "#161619",
            "tg-tile": "#1F1F24",
            "tg-tile-border": "#2B2B32",
            "tg-accent": "#D4621A",
            "tg-accent-hover": "#BF5313",
            "tg-brand": "#E56218"
          },
          fontFamily: {
            "display-lg-mobile": ["Inter"],
            "label-sm": ["Inter"],
            "headline-md": ["Inter"],
            "body-lg": ["Inter"],
            "title-sm": ["Inter"],
            "code-provenance": ["JetBrains Mono", "monospace"],
            "body-sm": ["Inter"],
            "headline-lg": ["Inter"],
            "body-md": ["Inter"],
            "display-lg": ["Inter"],
            "label-md": ["Inter"],
            "headline-lg-mobile": ["Inter"]
          },
          fontSize: {
            "display-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "700" }],
            "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "500" }],
            "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
            "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
            "code-provenance": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
            "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
            "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
            "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
            "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
            "label-md": ["13px", { lineHeight: "18px", fontWeight: "500" }],
            "headline-lg-mobile": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }]
          }
        }
      }
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      font-size: 18px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }
    .custom-scroll::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: #121215;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #27272C;
      border-radius: 4px;
    }
    .custom-scroll::-webkit-scrollbar-thumb:hover {
      background: #3F3F46;
    }
  </style>
</head>
<body class="bg-[#0E0E11] text-[#D4D4D8] font-body-md text-body-md antialiased min-h-screen flex selection:bg-[#D4621A] selection:text-white">
<!-- ==================== FIXED OPERATIONAL SIDEBAR (256px) ==================== -->
<aside class="w-[256px] min-w-[256px] h-screen fixed inset-y-0 left-0 bg-[#121215] border-r border-[#222226] flex flex-col justify-between z-40 select-none">
<!-- Top Identity & Navigation Area -->
<div class="flex flex-col overflow-y-auto custom-scroll">
<!-- Monogram & Identity Header -->
<div class="p-4 pb-3 flex items-center gap-3 border-b border-[#1E1E22]">
<div class="w-10 h-10 rounded-full bg-[#E56218] flex items-center justify-center text-white font-bold text-[15px] tracking-tight shrink-0 shadow-inner">
          TG
        </div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-2">
<span class="text-white font-title-sm text-title-sm tracking-tight truncate">TalentGraph</span>
<span class="text-[10px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-[#2A2A2E] text-[#B3B3B3] border border-[#3A3A40] tracking-wider leading-none">ADMIN</span>
</div>
<span class="text-[11px] text-[#71717A] tracking-normal truncate">Operational control</span>
</div>
</div>
<!-- Inset Policy Banner -->
<div class="p-3">
<div class="bg-[#17171B] border border-[#27272C] rounded-lg p-2.5 flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span>
</span>
<span class="text-label-sm font-label-sm text-[#A1A1AA]">Governance policy</span>
</div>
<span class="text-[10px] font-medium font-code-provenance px-2 py-0.5 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">
            Enforced
          </span>
</div>
</div>
<!-- Operational Nav Items -->
<nav class="px-2 py-1 space-y-1">
<a class="flex items-center justify-between px-3 py-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181D] transition-colors group" href="#operational-queue">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#D4D4D8]">dashboard</span>
<span class="text-body-md font-body-md font-medium">Operational Queue</span>
</div>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181D] transition-colors group" href="#company-verification">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#D4D4D8]">verified_user</span>
<span class="text-body-md font-body-md font-medium">Company Verification</span>
</div>
<span class="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#1E1E23] text-[#A1A1AA] border border-[#2B2B32]">3</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181D] transition-colors group" href="#user-directory">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#D4D4D8]">group</span>
<span class="text-body-md font-body-md font-medium">User Directory</span>
</div>
<span class="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#1E1E23] text-[#A1A1AA] border border-[#2B2B32]">1,482</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181D] transition-colors group" href="#jobs-moderation">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#D4D4D8]">work</span>
<span class="text-body-md font-body-md font-medium">Jobs Moderation</span>
</div>
<span class="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#1E1E23] text-[#A1A1AA] border border-[#2B2B32]">28</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181D] transition-colors group" href="#integrity-cases">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#F87171]">gavel</span>
<span class="text-body-md font-body-md font-medium">Integrity Cases</span>
</div>
<span class="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#2E181D] text-[#F87171] border border-[#482026]">2 flagged</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181D] transition-colors group" href="#worker-telemetry">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#D4D4D8]">monitor_heart</span>
<span class="text-body-md font-body-md font-medium">Worker Telemetry</span>
</div>
<span class="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#1E1E23] text-[#A1A1AA] border border-[#2B2B32]">99.8%</span>
</a>
<!-- ACTIVE NAV: BDT Subscriptions -->
<a class="flex items-center justify-between px-3 py-2 rounded-md bg-[#D4621A] text-white shadow-sm font-semibold transition-all" href="/admin/subscriptions-payments">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-white">payments</span>
<span class="text-body-md font-body-md">BDT Subscriptions</span>
</div>
<span class="text-[11px] font-code-provenance px-2 py-0.5 rounded bg-[#BF5313] text-white border border-[#E47735] font-semibold">
            ৳34.5k
          </span>
</a>
</nav>
</div>
<!-- Bottom Operator Identity Profile & Signout -->
<div class="border-t border-[#232328] p-3 bg-[#121215]">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-8 h-8 rounded-full bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#D4621A] font-semibold text-xs shrink-0">
            TC
          </div>
<div class="flex flex-col min-w-0">
<span class="text-white text-body-sm font-body-sm font-medium truncate">Tanvir Chowdhury</span>
<span class="text-[11px] text-[#71717A] font-mono truncate">Platform Admin #01</span>
</div>
</div>
<button aria-label="Sign out" class="w-7 h-7 rounded flex items-center justify-center text-[#71717A] hover:text-white hover:bg-[#1A1A20] transition-colors" title="Sign out" type="button">
<span class="material-symbols-outlined text-[17px]">logout</span>
</button>
</div>
</div>
</aside>
<!-- ==================== MAIN CONTENT WRAPPER (Offset 256px) ==================== -->
<main class="ml-[256px] flex-1 min-w-0 flex flex-col bg-[#0E0E11]">
<!-- TOP HEADER -->
<header class="sticky top-0 z-30 bg-[#0E0E11]/95 backdrop-blur-sm border-b border-[#222226] px-8 py-4 flex items-center justify-between">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1.5 text-code-provenance font-code-provenance text-[#71717A] uppercase">
<span class="">ADMIN</span>
<span class="text-[#3F3F46]">/</span>
<span class="text-[#D4621A] font-semibold">SUBSCRIPTIONS &amp; PAYMENTS</span>
<span class="text-[#4ADE80] font-bold">●</span>
</div>
<h1 class="text-headline-md font-headline-md text-white tracking-tight">
          Subscriptions &amp; Payment Webhooks
        </h1>

</div>
<!-- Header Operational Controls -->
<div class="flex items-center gap-2">
<button aria-label="Search records" class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors" title="Search records" type="button">
<span class="material-symbols-outlined">search</span>
</button>
<button aria-label="Export audit report" class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors" title="Export report" type="button">
<span class="material-symbols-outlined">download</span>
</button>
<button aria-label="Toggle visual theme" class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors" title="Toggle theme" type="button">
<span class="material-symbols-outlined">dark_mode</span>
</button>
</div>
</header>
<!-- WORKSPACE CANVAS CONTAINER -->
<div class="px-8 py-6 space-y-6 max-w-[1440px] w-full">
<!-- 4-COLUMN KPI METRIC CARDS -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Metric 1: Monthly Verified Revenue -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-colors hover:border-[#3F3F46]">
<div class="flex items-center justify-between pb-2">
<span class="text-label-md font-label-md text-[#A1A1AA]">Monthly Verified Revenue</span>
<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C] font-medium">
              Settled 100%
            </span>
</div>
<div class="mt-1">
<span class="text-headline-lg font-headline-lg text-white font-bold tracking-tight">৳34,500</span>
</div>
<div class="mt-2.5 pt-2 border-t border-[#1F1F24] flex items-center gap-1.5 text-body-sm font-body-sm text-[#71717A]">
<span class="material-symbols-outlined text-[15px] text-[#4ADE80]">verified</span>
<span class="">30D Webhook settled</span>
</div>
</div>
<!-- Metric 2: Active Paid Entitlements -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-colors hover:border-[#3F3F46]">
<div class="flex items-center justify-between pb-2">
<span class="text-label-md font-label-md text-[#A1A1AA]">Active Paid Entitlements</span>
<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2A2A2E] text-[#B3B3B3] border border-[#3A3A40] font-medium">
              Active
            </span>
</div>
<div class="mt-1">
<span class="text-headline-lg font-headline-lg text-white font-bold tracking-tight">17</span>
</div>
<div class="mt-2.5 pt-2 border-t border-[#1F1F24] flex items-center gap-1.5 text-body-sm font-body-sm text-[#71717A]">
<span class="material-symbols-outlined text-[15px] text-[#D4621A]">view_agenda</span>
<span class="truncate">11 Starter • 4 Growth • 2 Per-Job</span>
</div>
</div>
<!-- Metric 3: Webhook Reconciliations -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-colors hover:border-[#3F3F46]">
<div class="flex items-center justify-between pb-2">
<span class="text-label-md font-label-md text-[#A1A1AA]">Webhook Reconciliations</span>
<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C] font-medium">
              Signed
            </span>
</div>
<div class="mt-1">
<span class="text-headline-lg font-headline-lg text-white font-bold tracking-tight">148</span>
</div>
<div class="mt-2.5 pt-2 border-t border-[#1F1F24] flex items-center gap-1.5 text-body-sm font-body-sm text-[#71717A]">
<span class="material-symbols-outlined text-[15px] text-[#4ADE80]">key</span>
<span class="truncate font-mono text-[11px]">Idempotent SHA-256 signatures</span>
</div>
</div>
<!-- Metric 4: Payment Webhook Exceptions -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-colors hover:border-[#3F3F46]">
<div class="flex items-center justify-between pb-2">
<span class="text-label-md font-label-md text-[#A1A1AA]">Webhook Exceptions</span>

</div>
<div class="mt-1">
<span class="text-headline-lg font-headline-lg text-[#F87171] font-bold tracking-tight">1</span>
</div>
<div class="mt-2.5 pt-2 border-t border-[#1F1F24] flex items-center gap-1.5 text-body-sm font-body-sm text-[#71717A]">
<span class="material-symbols-outlined text-[15px] text-[#E5933A]">sync_problem</span>
<span class="truncate">bKash Merchant IPN 504 timeout</span>
</div>
</div>
</section>
<!-- AUDIT & RECONCILIATION DOSSIER DOCK (3-Column Technical Layout) -->
<section class="bg-[#151518] border border-[#25252A] rounded-xl p-5 shadow-sm">
<div class="flex items-center justify-between pb-4 border-b border-[#25252A]">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#D4621A]">
<span class="material-symbols-outlined text-[14px]">fact_check</span>
</div>
<h2 class="text-title-sm font-title-sm text-white">Active Audit &amp; Webhook Reconciliation Dossier</h2>
<span class="font-mono text-label-sm font-label-sm text-[#A1A1AA] bg-[#17171B] border border-[#27272C] px-2 py-0.5 rounded">
              Ref: #TX-BDT-8891
            </span>
</div>
<div class="flex items-center gap-2">
<span class="text-body-sm font-body-sm text-[#71717A]">Lock state:</span>
<span class="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">
              Idempotent Acquired
            </span>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
<!-- Col 1: Selected Transaction Dossier (4 cols) -->
<div class="lg:col-span-4 bg-[#17171B] border border-[#27272C] rounded-lg p-4 flex flex-col justify-between">
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm uppercase tracking-wider text-[#71717A]">Target Subscriber</span>
<span class="text-xs font-mono text-[#D4621A]">TigerIT Bangladesh Ltd.</span>
</div>
<div class="p-2.5 rounded bg-[#121215] border border-[#222226] space-y-1.5 font-mono text-xs">
<div class="flex justify-between text-[#A1A1AA]">
<span class="">Gateway Ref:</span>
<span class="text-white">BKASH-IPN-994102</span>
</div>
<div class="flex justify-between text-[#A1A1AA]">
<span class="">Verification:</span>
<span class="text-[#4ADE80]">HMAC-SHA256 MATCH</span>
</div>
<div class="flex justify-between text-[#A1A1AA]">
<span class="">IPN Nonce:</span>
<span class="text-[#A1A1AA] truncate max-w-[150px]">9f8a32b04c81...</span>
</div>
</div>
<!-- Proofline Connector Motif -->
<div class="relative pl-4 space-y-2 border-l border-[#3F3F46] my-2 text-xs">
<div class="relative">
<span class="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[#4ADE80]"></span>
<span class="text-[#D4D4D8] font-medium">Claim Pill:</span>
<span class="text-[#A1A1AA]"> Recruiter Growth Tier</span>
</div>
<div class="relative">
<span class="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[#D4621A]"></span>
<span class="text-[#D4D4D8] font-medium">Stem Provenance:</span>
<span class="text-[#A1A1AA]"> IPN Hook @ 2025-05-18 14:22:04</span>
</div>
</div>
<div class="p-2.5 rounded bg-[#151518] border border-[#27272C] text-[11px] text-[#A1A1AA] leading-relaxed">
<span class="text-[#D4621A] font-semibold">Section 2 &amp; 14 Policy Guarantee:</span>
                Payment Authenticity Mandate: Redirect URLs never prove payment. Subscriptions are activated exclusively via cryptographic webhook confirmation with idempotent replay protection.
              </div>
</div>
<div class="mt-3 pt-2 border-t border-[#222226] flex items-center justify-between text-body-sm font-body-sm text-[#71717A]">
<span class="">Audit state: Ground Truth</span>
<span class="material-symbols-outlined text-[#4ADE80] text-[16px]">lock</span>
</div>
</div>
<!-- Col 2: Entitlement Allocation Matrix (4 cols) -->
<div class="lg:col-span-4 bg-[#17171B] border border-[#27272C] rounded-lg p-4 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between pb-2 border-b border-[#222226]">
<span class="text-label-sm font-label-sm uppercase tracking-wider text-[#71717A]">Entitlement Allocation Matrix</span>
<span class="text-xs font-mono text-[#4ADE80]">Allocated 30D</span>
</div>
<div class="space-y-2.5 mt-3 text-xs">
<div class="flex items-center justify-between p-2 rounded bg-[#121215] border border-[#222226]">
<span class="text-[#A1A1AA]">Active Job Postings Quota</span>
<span class="font-mono text-white font-semibold">2 Active Jobs Allowed</span>
</div>
<div class="flex items-center justify-between p-2 rounded bg-[#121215] border border-[#222226]">
<span class="text-[#A1A1AA]">Code Assessment Access</span>
<span class="font-mono text-[#4ADE80]">Unlimited Verified</span>
</div>
<div class="flex items-center justify-between p-2 rounded bg-[#121215] border border-[#222226]">
<span class="text-[#A1A1AA]">Company Credential Badge</span>
<span class="font-mono text-white">Tier-1 Bangladesh Gov-Reg</span>
</div>
</div>
<!-- Telemetry / Event Log Inset -->
<div class="mt-3">
<span class="text-[11px] font-mono text-[#71717A] uppercase">BullMQ Webhook Event Log:</span>
<div class="mt-1 p-2 rounded bg-[#121215] border border-[#222226] font-mono text-[10px] text-[#A1A1AA] space-y-1">
<div class="text-[#4ADE80]">[JOB:queue-ipn-bkash:ok] 200 OK (latency: 18ms)</div>
<div class="">[AUTH:hmac] SHA-256 integrity match verified</div>
<div class="">[SYNC:redis] Entitlement flag synced to TigerIT #ORG-481</div>
</div>
</div>
</div>
<div class="mt-3 pt-2 border-t border-[#222226] flex items-center justify-between text-body-sm font-body-sm text-[#71717A]">
<span class="">Next Renewal Date: 2025-06-18</span>
<span class="font-mono text-xs text-[#A1A1AA]">Auto-Debit Active</span>
</div>
</div>
<!-- Col 3: Forensic Entitlement Operations (4 cols) -->
<div class="lg:col-span-4 bg-[#17171B] border border-[#27272C] rounded-lg p-4 flex flex-col justify-between">
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm uppercase tracking-wider text-[#71717A]">Forensic Operations</span>
<span class="text-[10px] font-mono text-[#E5933A] bg-[#2C2114] px-1.5 py-0.5 rounded border border-[#44301B]">ISO-27001 AUDIT</span>
</div>
<div class="space-y-1">
<label class="text-label-sm font-label-sm text-[#A1A1AA]" for="audit-justification">Mandatory Audit Justification Log</label>
<textarea class="w-full text-xs font-mono bg-[#161619] border border-[#27272C] rounded-md text-white p-2.5 focus:border-[#D4621A] focus:ring-1 focus:ring-[#D4621A] outline-none placeholder-[#71717A]" id="audit-justification" placeholder="Input administrative justification for entitlement mutation..." rows="3"></textarea>
<span class="text-[10px] text-[#71717A]">Required for manual override, refund or IPN redelivery.</span>
</div>
<div class="grid grid-cols-2 gap-2 pt-1">
<button class="px-2.5 py-1.5 rounded-md bg-[#161619] border border-[#27272C] text-[#D4D4D8] hover:text-white hover:border-[#3F3F46] text-xs font-medium transition-colors flex items-center justify-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[14px]">forward_to_inbox</span>
                  Resend IPN Webhook
                </button>
<button class="px-2.5 py-1.5 rounded-md bg-[#2E181D] border border-[#482026] text-[#F87171] hover:bg-[#3D1E25] text-xs font-medium transition-colors flex items-center justify-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[14px]">cancel</span>
                  Cancel Entitlement
                </button>
</div>
</div>
<div class="mt-4 pt-3 border-t border-[#222226]">
<button class="w-full py-2.5 px-3 rounded-lg bg-[#D4621A] hover:bg-[#BF5313] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm" type="button">
<span class="material-symbols-outlined text-[16px]">task_alt</span>
                Commit Entitlement &amp; Reconcile Webhook
              </button>
</div>
</div>
</div>
</section>
<!-- FULL-WIDTH TRANSACTION & WEBHOOK AUDIT TABLE -->
<section class="bg-[#151518] border border-[#25252A] rounded-xl overflow-hidden shadow-sm">
<!-- Filter Tabs & Actions Bar -->
<div class="border-b border-[#25252A] p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
<!-- Segmented Filter Tabs -->
<div class="flex items-center gap-1 overflow-x-auto custom-scroll pb-1 xl:pb-0">
<button class="px-3 py-1.5 rounded-md bg-[#D4621A] text-white text-xs font-medium flex items-center gap-1.5 shrink-0 shadow-sm" type="button">
<span class="">All Transactions</span>
<span class="font-mono bg-[#BF5313] px-1.5 py-0.2 rounded text-[10px]">24</span>
</button>
<button class="px-3 py-1.5 rounded-md bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors" type="button">
<span class="">Recruiter Starter (৳2,000)</span>
<span class="font-mono text-[#D4D4D8] bg-[#1F1F24] px-1.5 py-0.2 rounded text-[10px]">11</span>
</button>
<button class="px-3 py-1.5 rounded-md bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors" type="button">
<span class="">Recruiter Growth (৳5,000)</span>
<span class="font-mono text-[#D4D4D8] bg-[#1F1F24] px-1.5 py-0.2 rounded text-[10px]">4</span>
</button>
<button class="px-3 py-1.5 rounded-md bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors" type="button">
<span class="">Pay Per Job (৳2,500)</span>
<span class="font-mono text-[#D4D4D8] bg-[#1F1F24] px-1.5 py-0.2 rounded text-[10px]">2</span>
</button>
<button class="px-3 py-1.5 rounded-md bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors" type="button">
<span class="">Candidate Premium (৳299)</span>
<span class="font-mono text-[#D4D4D8] bg-[#1F1F24] px-1.5 py-0.2 rounded text-[10px]">6</span>
</button>
<button class="px-3 py-1.5 rounded-md bg-[#161619] border border-[#27272C] text-[#E5933A] hover:text-white hover:border-[#44301B] text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors" type="button">
<span class="">Pending / Retriable</span>
<span class="font-mono text-[#E5933A] bg-[#2C2114] px-1.5 py-0.2 rounded text-[10px]">1</span>
</button>
</div>
<!-- Gateway Selector & Refresh -->
<div class="flex items-center gap-2.5 shrink-0">
<div class="relative">
<select class="bg-[#161619] border border-[#27272C] rounded-lg text-xs text-[#D4D4D8] px-3 py-1.5 pr-8 focus:border-[#D4621A] focus:ring-0 outline-none cursor-pointer">
<option>All Gateways (bKash, Nagad, SSLCommerz)</option>
<option>bKash Merchant IPN</option>
<option>Nagad Gateway Webhook</option>
<option>SSLCommerz Settlement</option>
</select>
</div>
<button class="px-2.5 py-1.5 rounded-lg bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors flex items-center gap-1 text-xs" title="Refresh records" type="button">
<span class="material-symbols-outlined text-[15px]">refresh</span>
<span class="">Sync</span>
</button>
</div>
</div>
<!-- Operational Tabular View -->
<div class="overflow-x-auto custom-scroll">
<table class="w-full text-left border-collapse">
<thead>
<tr class="border-b border-[#25252A] bg-[#121215]/80 text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
<th class="py-3 px-4 font-medium">TRANSACTION ID &amp; ATTEMPT</th>
<th class="py-3 px-4 font-medium">SUBSCRIBER &amp; ENTITY</th>
<th class="py-3 px-4 font-medium">PLAN &amp; CADENCE</th>
<th class="py-3 px-4 font-medium text-right">BDT AMOUNT</th>
<th class="py-3 px-4 font-medium">WEBHOOK SIGNATURE &amp; TIMESTAMP</th>
<th class="py-3 px-4 font-medium text-center">ENTITLEMENT STATE</th>
<th class="py-3 px-4 font-medium text-right">ACTIONS</th>
</tr>
</thead>
<tbody class="divide-y divide-[#222226] text-xs">
<!-- Row 1: Sadia Rahman (TigerIT) - Selected -->
<tr class="bg-[#252528] hover:bg-[#2A2A2E] transition-colors">
<td class="py-3.5 px-4 font-mono">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#4ADE80]"></span>
<span class="text-white font-semibold">TX-BDT-8891</span>
</div>
<span class="text-[10px] text-[#71717A] ml-4 font-mono">Attempt 1/1 • bKash</span>
</td>
<td class="py-3.5 px-4">
<div class="font-medium text-white">Sadia Rahman</div>
<div class="text-[11px] text-[#A1A1AA] truncate">TigerIT Bangladesh Ltd.</div>
</td>
<td class="py-3.5 px-4">
<span class="font-medium text-[#D4D4D8]">Recruiter Growth</span>
<div class="text-[11px] text-[#71717A]">Monthly recurring (30D)</div>
</td>
<td class="py-3.5 px-4 text-right font-mono text-white font-semibold">
                  ৳5,000
                </td>
<td class="py-3.5 px-4">
<div class="flex items-center gap-1.5 font-mono text-[11px] text-[#4ADE80]">
<span class="material-symbols-outlined text-[13px]">verified</span>
<span class="">HMAC-SHA256 Valid</span>
</div>
<div class="text-[10px] text-[#71717A] font-mono">2 min ago (14:22:04 BDT)</div>
</td>
<td class="py-3.5 px-4 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C] font-mono text-[11px] font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
                    Active Entitlement
                  </span>
</td>
<td class="py-3.5 px-4 text-right space-x-1">
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Inspect
                  </button>
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Receipt
                  </button>
</td>
</tr>
<!-- Row 2: Nabila Zahan (Brain Station 23) -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-4 font-mono">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#4ADE80]"></span>
<span class="text-white font-semibold">TX-BDT-8884</span>
</div>
<span class="text-[10px] text-[#71717A] ml-4 font-mono">Attempt 1/1 • Nagad</span>
</td>
<td class="py-3.5 px-4">
<div class="font-medium text-white">Nabila Zahan</div>
<div class="text-[11px] text-[#A1A1AA] truncate">Brain Station 23</div>
</td>
<td class="py-3.5 px-4">
<span class="font-medium text-[#D4D4D8]">Recruiter Starter</span>
<div class="text-[11px] text-[#71717A]">Monthly recurring (30D)</div>
</td>
<td class="py-3.5 px-4 text-right font-mono text-white font-semibold">
                  ৳2,000
                </td>
<td class="py-3.5 px-4">
<div class="flex items-center gap-1.5 font-mono text-[11px] text-[#4ADE80]">
<span class="material-symbols-outlined text-[13px]">verified</span>
<span class="">HMAC-SHA256 Valid</span>
</div>
<div class="text-[10px] text-[#71717A] font-mono">18 min ago (14:06:12 BDT)</div>
</td>
<td class="py-3.5 px-4 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C] font-mono text-[11px] font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
                    Active Entitlement
                  </span>
</td>
<td class="py-3.5 px-4 text-right space-x-1">
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Inspect
                  </button>
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Receipt
                  </button>
</td>
</tr>
<!-- Row 3: Farhan Ahmed (Therap) -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-4 font-mono">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#4ADE80]"></span>
<span class="text-white font-semibold">TX-BDT-8879</span>
</div>
<span class="text-[10px] text-[#71717A] ml-4 font-mono">Attempt 1/1 • bKash</span>
</td>
<td class="py-3.5 px-4">
<div class="font-medium text-white">Farhan Ahmed</div>
<div class="text-[11px] text-[#A1A1AA] truncate">Therap (BD) Ltd.</div>
</td>
<td class="py-3.5 px-4">
<span class="font-medium text-[#D4D4D8]">Pay Per Job</span>
<div class="text-[11px] text-[#71717A]">2-Month Slot Limit</div>
</td>
<td class="py-3.5 px-4 text-right font-mono text-white font-semibold">
                  ৳2,500
                </td>
<td class="py-3.5 px-4">
<div class="flex items-center gap-1.5 font-mono text-[11px] text-[#4ADE80]">
<span class="material-symbols-outlined text-[13px]">verified</span>
<span class="">HMAC-SHA256 Valid</span>
</div>
<div class="text-[10px] text-[#71717A] font-mono">1h ago (13:24:50 BDT)</div>
</td>
<td class="py-3.5 px-4 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C] font-mono text-[11px] font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
                    Active Entitlement
                  </span>
</td>
<td class="py-3.5 px-4 text-right space-x-1">
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Inspect
                  </button>
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Receipt
                  </button>
</td>
</tr>
<!-- Row 4: Shakil Mahmud (Candidate Premium) -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-4 font-mono">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#4ADE80]"></span>
<span class="text-white font-semibold">TX-BDT-8862</span>
</div>
<span class="text-[10px] text-[#71717A] ml-4 font-mono">Attempt 1/1 • SSLCommerz</span>
</td>
<td class="py-3.5 px-4">
<div class="font-medium text-white">Shakil Mahmud</div>
<div class="text-[11px] text-[#A1A1AA] font-mono">@shakil-crawler</div>
</td>
<td class="py-3.5 px-4">
<span class="font-medium text-[#D4D4D8]">Candidate Premium</span>
<div class="text-[11px] text-[#71717A]">Monthly recurring (30D)</div>
</td>
<td class="py-3.5 px-4 text-right font-mono text-white font-semibold">
                  ৳299
                </td>
<td class="py-3.5 px-4">
<div class="flex items-center gap-1.5 font-mono text-[11px] text-[#4ADE80]">
<span class="material-symbols-outlined text-[13px]">verified</span>
<span class="">HMAC-SHA256 Valid</span>
</div>
<div class="text-[10px] text-[#71717A] font-mono">3h ago (11:15:33 BDT)</div>
</td>
<td class="py-3.5 px-4 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C] font-mono text-[11px] font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
                    Active Entitlement
                  </span>
</td>
<td class="py-3.5 px-4 text-right space-x-1">
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Inspect
                  </button>
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] text-[11px] font-medium transition-colors" type="button">
                    Receipt
                  </button>
</td>
</tr>
<!-- Row 5: Apex Global Tech - Timeout Warning -->
<tr class="bg-[#1A1617] hover:bg-[#201B1C] transition-colors">
<td class="py-3.5 px-4 font-mono">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#E5933A]"></span>
<span class="text-white font-semibold">TX-BDT-8850</span>
</div>
<span class="text-[10px] text-[#E5933A] ml-4 font-mono">Attempt 2/3 • bKash IPN</span>
</td>
<td class="py-3.5 px-4">
<div class="font-medium text-white">Apex Global Tech</div>
<div class="text-[11px] text-[#A1A1AA] truncate">Junior Full Stack Opening</div>
</td>
<td class="py-3.5 px-4">
<span class="font-medium text-[#D4D4D8]">Recruiter Starter</span>
<div class="text-[11px] text-[#71717A]">Monthly recurring (30D)</div>
</td>
<td class="py-3.5 px-4 text-right font-mono text-white font-semibold">
                  ৳2,000
                </td>
<td class="py-3.5 px-4">
<div class="flex items-center gap-1.5 font-mono text-[11px] text-[#E5933A]">
<span class="material-symbols-outlined text-[13px]">warning</span>
<span class="">Webhook Timeout (Retrying 2/3)</span>
</div>
<div class="text-[10px] text-[#71717A] font-mono">Gateway responded HTTP 504</div>
</td>
<td class="py-3.5 px-4 text-center">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2C2114] text-[#E5933A] border border-[#44301B] font-mono text-[11px] font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#E5933A]"></span>
                    Pending Re-verification
                  </span>
</td>
<td class="py-3.5 px-4 text-right">
<button class="px-2.5 py-1 rounded bg-[#2C2114] border border-[#44301B] text-[#E5933A] hover:bg-[#382B1C] text-[11px] font-medium transition-colors inline-flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[12px]">replay</span>
                    Re-check Webhook
                  </button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Pagination / Status Bar -->
<div class="border-t border-[#25252A] p-3 bg-[#121215] flex flex-col sm:flex-row items-center justify-between text-body-sm font-body-sm text-[#71717A] gap-2">
<div class="flex items-center gap-2">
<span class="font-mono text-xs text-[#A1A1AA]">Showing 5 of 24 recorded transactions</span>
<span class="text-[#3F3F46]">•</span>
<span class="text-[11px] text-[#4ADE80]">Real-time BullMQ connection active</span>
</div>
<div class="flex items-center gap-1">
<button class="px-2.5 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white disabled:opacity-40 text-xs font-mono" disabled="" type="button">Prev</button>
<span class="px-2 text-xs font-mono text-white">1</span>
<button class="px-2.5 py-1 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white text-xs font-mono" type="button">Next</button>
</div>
</div>
</section>
</div>
<!-- OPERATIONAL GOVERNANCE FOOTER -->
<footer class="mt-auto border-t border-[#1C1C20] py-4 px-8 bg-[#0E0E11] flex flex-col md:flex-row justify-between items-center text-[11px] text-[#71717A] gap-2">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-[#D4621A]"></span>
<span class="">TalentGraph governance shell</span>
<span class="text-[#3F3F46]">•</span>
<span class="">All financial reconciliations are audited with cryptographic SHA-256 integrity</span>
</div>
<div>
<span class="">Need payment gateway diagnostic support?</span>
<a class="text-[#D4621A] hover:underline ml-1 font-medium" href="#contact-billing">Contact platform billing ops</a>
</div>
</footer>
</main>


</body></html>