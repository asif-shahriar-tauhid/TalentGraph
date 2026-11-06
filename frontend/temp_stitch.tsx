<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>TalentGraph Admin - User Directory &amp; Account Governance</title>
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
            "on-primary-container": "#4b1b00",
            "primary-fixed": "#ffdbcb",
            "outline": "#a68b7f",
            "on-primary": "#552000",
            "status-success-light": "#15803D",
            "text-secondary-dark": "#A1A1AA",
            "on-tertiary": "#003353",
            "background": "#131315",
            "tertiary-container": "#2797e2",
            "surface-container-highest": "#353437",
            "surface-container": "#201f21",
            "text-secondary-light": "#71717A",
            "surface-tint": "#ffb691",
            "error-container": "#93000a",
            "surface": "#131315",
            "border-subtle-dark": "#3F3F46",
            "surface-dim": "#131315",
            "status-success-dark": "#22C55E",
            "surface-container-low": "#1b1b1d",
            "surface-bright": "#39393b",
            "secondary-fixed-dim": "#c7c5d0",
            "on-tertiary-fixed-variant": "#004a75",
            "surface-alternate-light": "#F8FAFC",
            "surface-selected-light": "#FFF1E8",
            "tertiary-fixed-dim": "#95ccff",
            "surface-selected-dark": "#252528",
            "secondary": "#c7c5d0",
            "secondary-container": "#46464f",
            "status-error-dark": "#E5484D",
            "tertiary": "#95ccff",
            "secondary-fixed": "#e3e1ec",
            "on-secondary-fixed": "#1a1b23",
            "inverse-primary": "#9f4200",
            "on-background": "#e5e1e4",
            "error": "#ffb4ab",
            "surface-container-lowest": "#0e0e10",
            "surface-elevated-dark": "#19191C",
            "on-tertiary-container": "#002c48",
            "surface-canvas-light": "#FFFFFF",
            "on-surface-variant": "#dec0b3",
            "text-primary-light": "#18181B",
            "status-warning-dark": "#F59E0B",
            "on-error": "#690005",
            "text-primary-dark": "#F5F5F5",
            "surface-variant": "#353437",
            "on-tertiary-fixed": "#001d32",
            "primary-container": "#e56f27",
            "cta-text": "#18181B",
            "status-error-light": "#DC2626",
            "on-secondary-fixed-variant": "#46464f",
            "brand-hover-dark": "#E47735",
            "on-surface": "#e5e1e4",
            "primary": "#ffb691",
            "on-secondary": "#2f3038",
            "inverse-on-surface": "#313032",
            "status-warning-light": "#B45309",
            "surface-elevated-light": "#FFFFFF",
            "surface-canvas-dark": "#0D0D0F",
            "on-secondary-container": "#b5b4be",
            "inverse-surface": "#e5e1e4",
            "border-subtle-light": "#E4E4E7",
            "brand-hover-light": "#B94F0B",
            "on-primary-fixed": "#341100",
            "tertiary-fixed": "#cee5ff",
            "surface-container-high": "#2a2a2c",
            "outline-variant": "#574238",
            "on-error-container": "#ffdad6",
            "primary-fixed-dim": "#ffb691",
            "on-primary-fixed-variant": "#793100"
          },
          borderRadius: {
            DEFAULT: "0.25rem",
            lg: "0.5rem",
            xl: "0.75rem",
            full: "9999px"
          },
          spacing: {
            "space-xl": "2rem",
            "space-md": "1rem",
            "gutter": "1rem",
            "margin-desktop": "2rem",
            "space-sm": "0.5rem",
            "space-xs": "0.25rem",
            "gutter-desktop": "1.5rem",
            "margin": "1rem",
            "space-lg": "1.5rem"
          },
          fontFamily: {
            "body-sm": ["Inter"],
            "body-lg": ["Inter"],
            "headline-md": ["Inter"],
            "display-lg": ["Inter"],
            "code-provenance": ["JetBrains Mono", "monospace"],
            "headline-lg-mobile": ["Inter"],
            "headline-lg": ["Inter"],
            "title-sm": ["Inter"],
            "body-md": ["Inter"],
            "label-sm": ["Inter"],
            "label-md": ["Inter"],
            "display-lg-mobile": ["Inter"]
          },
          fontSize: {
            "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
            "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
            "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
            "code-provenance": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
            "headline-lg-mobile": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
            "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
            "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
            "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "500" }],
            "label-md": ["13px", { lineHeight: "18px", fontWeight: "500" }],
            "display-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "700" }]
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
      display: inline-block;
      vertical-align: middle;
    }
    .custom-scroll::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: #0E0E11;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #25252A;
      border-radius: 4px;
    }
    .custom-scroll::-webkit-scrollbar-thumb:hover {
      background: #3F3F46;
    }
  </style>
</head>
<body class="bg-[#0E0E11] text-[#D4D4D8] font-body-md text-body-md min-h-screen flex selection:bg-[#D4621A] selection:text-white">
<!-- ==================== SIDEBAR RAIL (256px Fixed) ==================== -->
<aside class="w-64 min-w-[256px] max-w-[256px] bg-[#121215] border-r border-[#222226] flex flex-col justify-between h-screen sticky top-0 p-4 select-none z-40">
<div class="flex flex-col gap-4">
<!-- Top Brand Anchor -->
<div class="flex items-center gap-3 px-1 pt-1">
<div class="w-10 h-10 rounded-full bg-[#E56218] flex items-center justify-center font-headline-md text-headline-md text-white font-bold tracking-tight shadow-sm">
          TG
        </div>
<div class="flex flex-col">
<div class="flex items-center gap-1.5">
<span class="font-headline-md text-sm font-semibold text-white tracking-tight leading-none">TalentGraph</span>
<span class="text-[10px] font-medium tracking-wider bg-[#2A2A2E] text-[#B3B3B3] px-1.5 py-0.5 rounded leading-none">ADMIN</span>
</div>
<span class="font-label-sm text-[11px] text-[#71717A] mt-1 leading-none">Operational control</span>
</div>
</div>
<!-- Governance Policy Inset Banner -->

<!-- Primary Navigation Links -->
<nav class="flex flex-col gap-1 mt-1">
<!-- Operational Queue -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-[#F5F5F5] transition-colors duration-150" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px]">grid_view</span>
<span class="font-label-md text-label-md font-medium">Operational Queue</span>
</div>
</a>
<!-- Company Verification -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-[#F5F5F5] transition-colors duration-150" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px]">verified_user</span>
<span class="font-label-md text-label-md font-medium">Company Verification</span>
</div>
<span class="font-code-provenance text-xs text-[#71717A]">3</span>
</a>
<!-- User Directory (ACTIVE ITEM) -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg bg-[#D4621A] text-white shadow-sm font-medium" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px]">group</span>
<span class="font-label-md text-label-md font-medium text-white">User Directory</span>
</div>
<span class="font-code-provenance text-xs font-semibold bg-white/20 px-1.5 py-0.5 rounded text-white">1,482</span>
</a>
<!-- Jobs Moderation -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-[#F5F5F5] transition-colors duration-150" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px]">business_center</span>
<span class="font-label-md text-label-md font-medium">Jobs Moderation</span>
</div>
<span class="font-code-provenance text-xs text-[#71717A]">28</span>
</a>
<!-- Integrity Cases -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-[#F5F5F5] transition-colors duration-150" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px]">warning</span>
<span class="font-label-md text-label-md font-medium">Integrity Cases</span>
</div>
<span class="font-code-provenance text-[11px] text-[#F87171] bg-[#2E181D] border border-[#482026] px-1.5 py-0.5 rounded">2 flagged</span>
</a>
<!-- Worker Telemetry -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-[#F5F5F5] transition-colors duration-150" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px]">query_stats</span>
<span class="font-label-md text-label-md font-medium">Worker Telemetry</span>
</div>
<span class="font-code-provenance text-[11px] text-[#4ADE80] bg-[#13281E] border border-[#1A3D2C] px-1.5 py-0.5 rounded">99.8%</span>
</a>
<!-- BDT Subscriptions -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[#A1A1AA] hover:bg-[#1A1A1E] hover:text-[#F5F5F5] transition-colors duration-150" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px]">account_balance_wallet</span>
<span class="font-label-md text-label-md font-medium">BDT Subscriptions</span>
</div>
<span class="font-code-provenance text-xs text-[#71717A]">৳34.5k</span>
</a>
</nav>
</div>
<!-- Sidebar Bottom Admin Profile -->
<div class="border-t border-[#232328] pt-3 flex items-center justify-between">
<div class="flex items-center gap-2.5 overflow-hidden">
<div class="w-8 h-8 rounded-full bg-[#202024] border border-[#2B2B32] text-xs font-semibold text-[#F5F5F5] flex items-center justify-center shrink-0">
          TC
        </div>
<div class="flex flex-col truncate">
<span class="text-xs font-medium text-white truncate">Tanvir Chowdhury</span>
<span class="text-[10px] text-[#71717A] truncate font-code-provenance">Platform Admin #01</span>
</div>
</div>
<button class="p-1.5 text-[#71717A] hover:text-white hover:bg-[#1A1A1E] rounded-md transition-colors" title="Sign out">
<span class="material-symbols-outlined text-[18px]">logout</span>
</button>
</div>
</aside>
<!-- ==================== MAIN CONTENT WRAPPER ==================== -->
<main class="flex-1 flex flex-col min-w-0 bg-[#0E0E11] overflow-y-auto custom-scroll">
<!-- Top Header Bar -->
<header class="px-8 py-5 border-b border-[#222227] flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-[#0E0E11]/95 backdrop-blur-sm z-30">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="font-code-provenance text-[11px] uppercase tracking-wider text-[#71717A]">ADMIN</span>
<span class="text-[11px] text-[#3F3F46]">/</span>
<span class="font-code-provenance text-[11px] uppercase tracking-wider text-[#D4621A] font-semibold">USER DIRECTORY</span>
</div>
<h1 class="font-headline-lg text-2xl font-bold text-white tracking-tight">User Directory &amp; Account Governance</h1>

</div>
<!-- Action Cluster -->
<div class="flex items-center gap-2 shrink-0">
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#202024] transition-colors" title="Quick Search">
<span class="material-symbols-outlined text-[16px]">search</span>
</button>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#202024] transition-colors" title="Export Audit Log">
<span class="material-symbols-outlined text-[16px]">download</span>
</button>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#202024] transition-colors" title="Toggle Theme">
<span class="material-symbols-outlined text-[16px]">dark_mode</span>
</button>
</div>
</header>
<div class="p-8 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
<!-- ==================== 4-COLUMN KPI ROW ==================== -->
<section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
<!-- KPI 1 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-2">
<span class="font-label-sm text-xs text-[#A1A1AA]">Total Accounts</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#A1A1AA]">
<span class="material-symbols-outlined text-[15px]">group</span>
</div>
</div>
<div class="font-code-provenance text-2xl font-bold text-white tracking-tight">1,482</div>
</div>
<div class="pt-3 mt-3 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A] font-body-sm">1,328 Candidates • 154 Recruiters</span>

</div>
</div>
<!-- KPI 2 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-2">
<span class="font-label-sm text-xs text-[#A1A1AA]">GitHub OAuth Verified</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#4ADE80]">
<span class="material-symbols-outlined text-[15px]">verified</span>
</div>
</div>
<div class="font-code-provenance text-2xl font-bold text-white tracking-tight">1,328</div>
</div>
<div class="pt-3 mt-3 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A] font-body-sm">100% Candidate Auth via GitHub</span>

</div>
</div>
<!-- KPI 3 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-2">
<span class="font-label-sm text-xs text-[#A1A1AA]">Enterprise Recruiters</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#A1A1AA]">
<span class="material-symbols-outlined text-[15px]">domain</span>
</div>
</div>
<div class="font-code-provenance text-2xl font-bold text-white tracking-tight">154</div>
</div>
<div class="pt-3 mt-3 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A] font-body-sm">48 Verified • 3 Pending Dual-Check</span>

</div>
</div>
<!-- KPI 4 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-2">
<span class="font-label-sm text-xs text-[#A1A1AA]">Flagged &amp; Restricted</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#E5933A]">
<span class="material-symbols-outlined text-[15px]">shield_with_heart</span>
</div>
</div>
<div class="font-code-provenance text-2xl font-bold text-white tracking-tight">4</div>
</div>
<div class="pt-3 mt-3 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A] font-body-sm">2 Under Integrity Audit • 2 Rate-Limited</span>

</div>
</div>
</section>
<!-- ==================== MAIN SPLIT SECTION ==================== -->
<section class="flex flex-col gap-6">
<!-- TABLE VIEW (Full Width) -->
<div class="w-full flex flex-col gap-4">
<!-- Filters & Segmented Controls Bar -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
<!-- Tabs -->
<div class="flex items-center bg-[#101013] border border-[#222227] p-1 rounded-lg gap-1">
<button class="px-2.5 py-1 text-xs font-medium rounded-md bg-[#25252A] text-white">
                All Accounts <span class="text-[#71717A] font-code-provenance text-[11px] ml-1">1,482</span>
</button>
<button class="px-2.5 py-1 text-xs font-medium rounded-md text-[#A1A1AA] hover:text-white transition-colors">
                Candidates (GitHub) <span class="text-[#71717A] font-code-provenance text-[11px] ml-1">1,328</span>
</button>
<button class="px-2.5 py-1 text-xs font-medium rounded-md text-[#A1A1AA] hover:text-white transition-colors">
                Recruiters <span class="text-[#71717A] font-code-provenance text-[11px] ml-1">154</span>
</button>
</div>
<!-- Filters cluster -->
<div class="flex items-center gap-2">
<select class="bg-[#161619] border border-[#27272C] text-xs text-[#D4D4D8] rounded-lg px-2.5 py-1.5 h-8 focus:outline-none focus:border-[#D4621A]">
<option>All States</option>
<option>Pending</option>
<option>OAuth Verified</option>
<option>Suspended</option>
</select>
<select class="bg-[#161619] border border-[#27272C] text-xs text-[#D4D4D8] rounded-lg px-2.5 py-1.5 h-8 focus:outline-none focus:border-[#D4621A]">
<option>All Entities</option>
<option>Therap (BD)</option>
<option>TigerIT</option>
<option>Brain Station 23</option>
</select>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#71717A] hover:text-white transition-colors" title="Reset Filters">
<span class="material-symbols-outlined text-[16px]">restart_alt</span>
</button>
</div>
</div>
<!-- Table Container -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl overflow-hidden shadow-sm">
<div class="overflow-x-auto">
<table class="w-full text-left text-xs border-collapse">
<thead>
<tr class="border-b border-[#222227] bg-[#121215] text-[#71717A] font-label-sm uppercase tracking-wider text-[11px]">
<th class="py-3 px-3 w-10 text-center">
<input class="rounded bg-[#161619] border-[#27272C] text-[#D4621A] focus:ring-0 focus:ring-offset-0" type="checkbox">
</th>
<th class="py-3 px-3 font-semibold">User Identity</th>
<th class="py-3 px-3 font-semibold">Role &amp; Auth</th>
<th class="py-3 px-3 font-semibold">Affiliation / Repos</th>
<th class="py-3 px-3 font-semibold">Governance Status</th>
<th class="py-3 px-3 font-semibold text-right">Last Active</th>
</tr>
</thead>
<tbody class="divide-y divide-[#222227] font-body-sm text-[12px]">
<!-- ROW 1 (SELECTED / INSPECTED) -->
<tr class="bg-[#1B1B1F] border-l-4 border-l-[#D4621A] transition-colors cursor-pointer">
<td class="py-3.5 px-3 text-center">
<input checked="" class="rounded bg-[#161619] border-[#27272C] text-[#D4621A] focus:ring-0 focus:ring-offset-0" type="checkbox">
</td>
<td class="py-3.5 px-3">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-full bg-[#E56218]/20 text-[#E56218] border border-[#E56218]/40 flex items-center justify-center font-bold text-xs">
                          FA
                        </div>
<div class="flex flex-col">
<span class="font-medium text-white">Farhan Ahmed</span>
<span class="text-[#71717A] font-code-provenance text-[11px]">farhan@therapservices.net</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#2A2A2E] text-[#B3B3B3]">
<span class="material-symbols-outlined text-[13px]">domain</span> Recruiter
                      </span>
</td>
<td class="py-3.5 px-3">
<div class="flex flex-col">
<span class="text-[#D4D4D8]">Therap (BD) Ltd.</span>
<span class="text-[#71717A] font-code-provenance text-[10px]">Org ID: #TH-902</span>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#2C2114] text-[#E5933A] border border-[#44301B]">
<span class="w-1.5 h-1.5 rounded-full bg-[#E5933A]"></span> Pending Affiliation
                      </span>
</td>
<td class="py-3.5 px-3 text-right font-code-provenance text-[#71717A]">14 min ago</td>
</tr>
<!-- ROW 2 -->
<tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer">
<td class="py-3.5 px-3 text-center">
<input class="rounded bg-[#161619] border-[#27272C] text-[#D4621A] focus:ring-0 focus:ring-offset-0" type="checkbox">
</td>
<td class="py-3.5 px-3">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-full bg-[#1F1F24] border border-[#2B2B32] text-[#A1A1AA] flex items-center justify-center font-bold text-xs">
                          AR
                        </div>
<div class="flex flex-col">
<span class="font-medium text-white">Arif Rahman</span>
<span class="text-[#71717A] font-code-provenance text-[11px]">@arif-dev</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#1F2937] text-[#9CA3AF]">
<span class="material-symbols-outlined text-[13px]">code</span> Candidate (GH)
                      </span>
</td>
<td class="py-3.5 px-3">
<div class="flex items-center gap-1.5 text-[#A1A1AA]">
<span class="font-code-provenance text-[11px]">3 Repos</span>
<span class="text-[#3F3F46]">•</span>
<span class="text-[#71717A] text-[11px]">14 verified PRs</span>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span> OAuth Verified
                      </span>
</td>
<td class="py-3.5 px-3 text-right font-code-provenance text-[#71717A]">Today 11:20 AM</td>
</tr>
<!-- ROW 3 -->
<tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer">
<td class="py-3.5 px-3 text-center">
<input class="rounded bg-[#161619] border-[#27272C] text-[#D4621A] focus:ring-0 focus:ring-offset-0" type="checkbox">
</td>
<td class="py-3.5 px-3">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-full bg-[#1F1F24] border border-[#2B2B32] text-[#A1A1AA] flex items-center justify-center font-bold text-xs">
                          SR
                        </div>
<div class="flex flex-col">
<span class="font-medium text-white">Sadia Rahman</span>
<span class="text-[#71717A] font-code-provenance text-[11px]">sadia@tigerit.com</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#2A2A2E] text-[#B3B3B3]">
<span class="material-symbols-outlined text-[13px]">domain</span> Recruiter
                      </span>
</td>
<td class="py-3.5 px-3">
<span class="text-[#D4D4D8]">TigerIT Bangladesh Talent Lead</span>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span> Dual-Check Approved
                      </span>
</td>
<td class="py-3.5 px-3 text-right font-code-provenance text-[#71717A]">Yesterday</td>
</tr>
<!-- ROW 4 -->
<tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer">
<td class="py-3.5 px-3 text-center">
<input class="rounded bg-[#161619] border-[#27272C] text-[#D4621A] focus:ring-0 focus:ring-offset-0" type="checkbox">
</td>
<td class="py-3.5 px-3">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-full bg-[#1F1F24] border border-[#2B2B32] text-[#A1A1AA] flex items-center justify-center font-bold text-xs">
                          TH
                        </div>
<div class="flex flex-col">
<span class="font-medium text-white">Tanvir Hasan</span>
<span class="text-[#71717A] font-code-provenance text-[11px]">@tanvir-ml</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#1F2937] text-[#9CA3AF]">
<span class="material-symbols-outlined text-[13px]">code</span> Candidate (GH)
                      </span>
</td>
<td class="py-3.5 px-3">
<span class="text-[#A1A1AA] font-code-provenance text-[11px]">5 Repos • PyTorch / FastAPI</span>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#2A2A2E] text-[#B3B3B3]">
                        Sync Quota: 2/3 Used
                      </span>
</td>
<td class="py-3.5 px-3 text-right font-code-provenance text-[#71717A]">19 Oct 2026</td>
</tr>
<!-- ROW 5 -->
<tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer">
<td class="py-3.5 px-3 text-center">
<input class="rounded bg-[#161619] border-[#27272C] text-[#D4621A] focus:ring-0 focus:ring-offset-0" type="checkbox">
</td>
<td class="py-3.5 px-3">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-full bg-[#2E181D] border border-[#482026] text-[#F87171] flex items-center justify-center font-bold text-xs">
                          SM
                        </div>
<div class="flex flex-col">
<span class="font-medium text-white">Shakil Mahmud</span>
<span class="text-[#71717A] font-code-provenance text-[11px]">@shakil-crawler</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#1F2937] text-[#9CA3AF]">
<span class="material-symbols-outlined text-[13px]">code</span> Candidate (GH)
                      </span>
</td>
<td class="py-3.5 px-3">
<span class="text-[#F87171] font-code-provenance text-[11px]">Fork Sync Bot • Spoofer Flag</span>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#2E181D] text-[#F87171] border border-[#482026]">
<span class="w-1.5 h-1.5 rounded-full bg-[#F87171]"></span> Suspended (Audit)
                      </span>
</td>
<td class="py-3.5 px-3 text-right font-code-provenance text-[#71717A]">3 days ago</td>
</tr>
<!-- ROW 6 -->
<tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer">
<td class="py-3.5 px-3 text-center">
<input class="rounded bg-[#161619] border-[#27272C] text-[#D4621A] focus:ring-0 focus:ring-offset-0" type="checkbox">
</td>
<td class="py-3.5 px-3">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-full bg-[#1F1F24] border border-[#2B2B32] text-[#A1A1AA] flex items-center justify-center font-bold text-xs">
                          NZ
                        </div>
<div class="flex flex-col">
<span class="font-medium text-white">Nabila Zahan</span>
<span class="text-[#71717A] font-code-provenance text-[11px]">nabila@brainstation23.com</span>
</div>
</div>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#2A2A2E] text-[#B3B3B3]">
<span class="material-symbols-outlined text-[13px]">domain</span> Recruiter
                      </span>
</td>
<td class="py-3.5 px-3">
<span class="text-[#D4D4D8]">Brain Station 23 Sr. Tech Recruiter</span>
</td>
<td class="py-3.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span> Dual-Check Approved
                      </span>
</td>
<td class="py-3.5 px-3 text-right font-code-provenance text-[#71717A]">4 days ago</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Footer Pagination -->
<div class="border-t border-[#222227] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A]">
<div class="flex items-center gap-2">
<span class="">Rows per page:</span>
<select class="bg-[#161619] border border-[#27272C] text-[#D4D4D8] rounded px-1.5 py-0.5 text-xs focus:outline-none">
<option>25</option>
<option>50</option>
<option>100</option>
</select>
<span class="ml-2 font-code-provenance">Showing 1-25 of 1,482</span>
</div>
<div class="flex items-center gap-3">
<span class="font-code-provenance">Page 1 of 60</span>
<div class="flex items-center gap-1">
<button class="px-2 py-1 bg-[#161619] border border-[#27272C] rounded text-[#71717A] cursor-not-allowed">Previous</button>
<button class="px-2 py-1 bg-[#161619] border border-[#27272C] rounded text-white hover:bg-[#202024]">Next</button>
</div>
</div>
</div>
</div>
</div>
<!-- INSPECTOR PANEL (Relocated Below Table, Full Width Grid Layout) -->
<div class="w-full bg-[#151518] border border-[#25252A] rounded-xl p-5 flex flex-col gap-5">
<!-- Inspector Header Tag -->
<div class="flex items-center justify-between border-b border-[#222227] pb-3">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#D4621A]"></span>
<span class="font-code-provenance text-[11px] font-semibold text-[#D4621A] tracking-wider uppercase">INSPECTOR #TG-USR-89214 LIVE CONTEXT</span>
</div>
<button class="text-[#71717A] hover:text-white" title="Close / Minimize">
<span class="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
<!-- Multi-column Body -->
<div class="flex flex-col gap-6 w-full divide-y divide-[#222227]">
<!-- Section 1: User Identity, Profile Overview, and Role Boundaries & Permissions -->
<div class="flex flex-col gap-4">
<!-- Target Profile Header -->
<div class="flex items-start gap-3 bg-[#17171B] border border-[#27272C] p-3.5 rounded-lg">
<div class="w-10 h-10 rounded-full bg-[#E56218] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              FA
            </div>
<div class="flex flex-col flex-1 min-w-0">
<div class="flex items-center justify-between gap-1">
<span class="text-sm font-semibold text-white truncate">Farhan Ahmed</span>
<span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">
<span class="material-symbols-outlined text-[10px]">check_circle</span> Verified
                </span>
</div>
<span class="text-xs text-[#71717A] font-code-provenance truncate">farhan@therapservices.net</span>
<div class="mt-2 pt-2 border-t border-[#232328] flex items-center justify-between text-[11px]">
<span class="text-[#A1A1AA]">Role: <span class="text-white font-medium">Enterprise Recruiter</span></span>
<a class="text-[#D4621A] hover:underline flex items-center gap-0.5 font-medium" href="#">
                  Therap (BD) Ltd. <span class="material-symbols-outlined text-[12px]">open_in_new</span>
</a>
</div>
</div>
</div>
<!-- Section: Role Boundaries & Permissions -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">ROLE BOUNDARIES &amp; PERMISSIONS</span>
<span class="text-[10px] font-code-provenance text-[#4ADE80]">SEC-ISOLATION: PASS</span>
</div>
<div class="bg-[#121215] border border-[#222227] rounded-lg p-3 flex flex-col gap-2.5 text-xs">
<div class="flex items-center justify-between">
<span class="text-[#71717A]">Candidate Privileges:</span>
<span class="font-code-provenance text-[#D4D4D8]">NONE (Strict isolation)</span>
</div>
<div class="flex items-center justify-between">
<span class="text-[#71717A]">Job Publishing:</span>
<span class="font-code-provenance text-[#E5933A] bg-[#2C2114] px-1 rounded">Blocked (Signoff pending)</span>
</div>
<div class="flex items-center justify-between">
<span class="text-[#71717A]">Subscription Plan:</span>
<span class="font-code-provenance text-[#4ADE80]">Starter (৳2k/mo) • Webhook OK</span>
</div>
<div class="flex items-center justify-between">
<span class="text-[#71717A]">Audit Trail Logged:</span>
<span class="font-code-provenance text-[#A1A1AA]">42 Events</span>
</div>
</div>
</div>
</div>

<!-- Section 2: Security & Account State Controls & Privacy Safeguards -->
<div class="pt-6 flex flex-col gap-4">
<div class="flex flex-col gap-2">
<span class="font-label-sm text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">SECURITY &amp; ACCOUNT STATE</span>
<div class="flex flex-col gap-2">
<label class="text-[11px] text-[#A1A1AA]">Modify Account State:</label>
<select class="bg-[#161619] border border-[#27272C] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#D4621A] w-full">
<option>Active (Standard Session)</option>
<option>Pending Corporate Signoff (Current)</option>
<option>Suspend Account &amp; Revoke Tokens</option>
<option>Force Multi-Factor Re-authentication</option>
</select>
<div class="grid grid-cols-2 gap-2 mt-1">
<button class="bg-[#161619] border border-[#27272C] hover:bg-[#202024] text-xs text-[#D4D4D8] rounded-lg py-1.5 px-2 flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[14px]">key_off</span>
<span class="">Revoke Sessions</span>
</button>
<button class="bg-[#161619] border border-[#27272C] hover:bg-[#202024] text-xs text-[#D4D4D8] rounded-lg py-1.5 px-2 flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[14px]">folder_shared</span>
<span class="">User Dossier</span>
</button>
</div>
</div>
</div>
<!-- Privacy Safeguards Inset Callout -->
<div class="bg-[#17171B] border border-[#27272C] rounded-lg p-2.5 flex items-start gap-2 text-[11px] leading-relaxed text-[#71717A]">
<span class="material-symbols-outlined text-[16px] text-[#A1A1AA] shrink-0 mt-0.5">security</span>
<p class="">
<strong class="text-[#D4D4D8] font-medium">Section 14 Privacy Safeguards:</strong> Raw candidate CVs, source tokens, and camera assessment snapshots are strictly restricted from general directory inspection.
</p>
</div>
</div>

<!-- Section 3: Audit Rationale (Mandatory) & Commit Action -->
<div class="pt-6 flex flex-col gap-2.5">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">AUDIT RATIONALE (MANDATORY)</span>
<span class="text-[10px] text-[#E5933A] font-code-provenance">*Required</span>
</div>
<textarea class="w-full bg-[#161619] border border-[#27272C] rounded-lg text-xs p-2.5 text-white placeholder-[#71717A] focus:outline-none focus:border-[#D4621A] resize-none" placeholder="Enter justification for manual override, unblocking, or privilege modification..." rows="3"></textarea>
<button class="w-full bg-[#D4621A] hover:bg-[#E47735] text-[#18181B] font-semibold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm">
<span class="material-symbols-outlined text-[16px]">verified</span>
<span class="">Log Admin Action &amp; Commit</span>
</button>
</div>
</div>
</div>
</section>
</div>
<!-- ==================== FOOTER ==================== -->
<footer class="mt-auto border-t border-[#1C1C20] px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#71717A]">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-[#71717A]"></span>
<span class="">TalentGraph governance shell • All actions are audited with cryptographic SHA-256 integrity</span>
</div>
<div class="flex items-center gap-1.5 text-[#A1A1AA] hover:text-white cursor-pointer transition-colors">
<span class="material-symbols-outlined text-[14px]">shield</span>
<span class="">Need help? Contact platform security</span>
</div>
</footer>
</main>


</body></html>