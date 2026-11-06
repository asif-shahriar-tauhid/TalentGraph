<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>TalentGraph — Admin Integrity Cases &amp; Assessment Audit</title>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Inter Google Font -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "on-tertiary-container": "#002c48",
            "error-container": "#93000a",
            "status-error-light": "#DC2626",
            "border-subtle-light": "#E4E4E7",
            "secondary": "#c7c5d0",
            "outline-variant": "#574238",
            "inverse-on-surface": "#313032",
            "surface-elevated-dark": "#19191C",
            "on-secondary-fixed": "#1a1b23",
            "surface-variant": "#353437",
            "on-primary-container": "#4b1b00",
            "on-error-container": "#ffdad6",
            "cta-text": "#18181B",
            "secondary-container": "#46464f",
            "text-primary-light": "#18181B",
            "tertiary-fixed": "#cee5ff",
            "brand-hover-dark": "#E47735",
            "surface-container-highest": "#353437",
            "on-tertiary-fixed": "#001d32",
            "surface-container-low": "#1b1b1d",
            "surface-selected-light": "#FFF1E8",
            "primary": "#ffb691",
            "surface-canvas-dark": "#0D0D0F",
            "outline": "#a68b7f",
            "secondary-fixed-dim": "#c7c5d0",
            "on-secondary": "#2f3038",
            "status-warning-dark": "#F59E0B",
            "status-success-dark": "#22C55E",
            "on-tertiary": "#003353",
            "surface-selected-dark": "#252528",
            "inverse-primary": "#9f4200",
            "surface-canvas-light": "#FFFFFF",
            "on-primary": "#552000",
            "primary-container": "#e56f27",
            "text-secondary-dark": "#A1A1AA",
            "on-primary-fixed-variant": "#793100",
            "border-subtle-dark": "#3F3F46",
            "tertiary-container": "#2797e2",
            "surface-container": "#201f21",
            "on-primary-fixed": "#341100",
            "background": "#131315",
            "status-warning-light": "#B45309",
            "surface-dim": "#131315",
            "surface": "#131315",
            "on-surface": "#e5e1e4",
            "error": "#ffb4ab",
            "status-error-dark": "#E5484D",
            "primary-fixed": "#ffdbcb",
            "surface-container-lowest": "#0e0e10",
            "secondary-fixed": "#e3e1ec",
            "on-background": "#e5e1e4",
            "on-tertiary-fixed-variant": "#004a75",
            "tertiary-fixed-dim": "#95ccff",
            "surface-alternate-light": "#F8FAFC",
            "on-secondary-fixed-variant": "#46464f",
            "on-surface-variant": "#dec0b3",
            "tertiary": "#95ccff",
            "status-success-light": "#15803D",
            "on-secondary-container": "#b5b4be",
            "surface-bright": "#39393b",
            "on-error": "#690005",
            "surface-container-high": "#2a2a2c",
            "primary-fixed-dim": "#ffb691",
            "surface-tint": "#ffb691",
            "surface-elevated-light": "#FFFFFF",
            "text-secondary-light": "#71717A",
            "text-primary-dark": "#F5F5F5",
            "brand-hover-light": "#B94F0B",
            "inverse-surface": "#e5e1e4"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "gutter": "1rem",
            "margin": "1rem",
            "space-xs": "0.25rem",
            "space-md": "1rem",
            "gutter-desktop": "1.5rem",
            "space-sm": "0.5rem",
            "space-lg": "1.5rem",
            "space-xl": "2rem",
            "margin-desktop": "2rem"
          },
          "fontFamily": {
            "label-md": ["Inter"],
            "label-sm": ["Inter"],
            "display-lg-mobile": ["Inter"],
            "body-md": ["Inter"],
            "display-lg": ["Inter"],
            "headline-md": ["Inter"],
            "title-sm": ["Inter"],
            "body-lg": ["Inter"],
            "headline-lg-mobile": ["Inter"],
            "headline-lg": ["Inter"],
            "body-sm": ["Inter"],
            "code-provenance": ["Inter"]
          },
          "fontSize": {
            "label-md": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }],
            "display-lg-mobile": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.015em", "fontWeight": "700" }],
            "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
            "headline-md": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "title-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "headline-lg-mobile": ["22px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "headline-lg": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
            "body-sm": ["12px", { "lineHeight": "16px", "fontWeight": "400" }],
            "code-provenance": ["12px", { "lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500" }]
          }
        },
      },
    }
  </script>
<style>
    body {
      background-color: #0E0E11;
      color: #F5F5F5;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 20px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }
    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0E0E11;
    }
    ::-webkit-scrollbar-thumb {
      background: #25252A;
      border-radius: 3px;
    }
  </style>
</head>
<body class="bg-[#0E0E11] text-text-primary-dark font-body-md text-body-md min-h-screen flex flex-col md:flex-row antialiased selection:bg-primary-container selection:text-cta-text">
<!-- ========================================================================= -->
<!-- 2. SIDEBAR (fixed 256px wide, #121215, border-r #222226) -->
<!-- ========================================================================= -->
<aside class="w-full md:w-[256px] md:min-h-screen bg-[#121215] border-r border-[#222226] flex flex-col justify-between shrink-0 select-none z-40">
<!-- Top Part -->
<div class="flex flex-col">
<!-- Brand & Tenant header -->
<div class="h-16 px-space-md flex items-center gap-space-sm border-b border-[#222226]">
<div class="w-10 h-10 rounded-full bg-[#E56218] flex items-center justify-center text-white font-headline-md text-headline-md tracking-tight shrink-0 shadow-inner">
          TG
        </div>
<div class="flex flex-col justify-center overflow-hidden">
<div class="flex items-center gap-1.5">
<span class="font-title-sm text-title-sm text-text-primary-dark tracking-tight truncate leading-none">TalentGraph</span>
<span class="text-[9px] font-bold tracking-wider px-1 py-0.5 rounded bg-[#2A2A2E] text-[#B3B3B3] leading-none uppercase">ADMIN</span>
</div>
<span class="text-[11px] text-[#71717A] font-body-sm leading-tight mt-1 truncate">Operational control</span>
</div>
</div>
<!-- Inset Policy Banner -->
<div class="p-space-sm">

</div>
<!-- Navigation Rail -->
<nav class="px-space-xs py-1 space-y-0.5">
<!-- 1. Operational Queue -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#1A1A1E] transition-colors" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[19px] text-[#A1A1AA]" data-icon="grid_view">grid_view</span>
<span class="font-label-md text-label-md">Operational Queue</span>
</div>
</a>
<!-- 2. Company Verification -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#1A1A1E] transition-colors" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[19px] text-[#A1A1AA]" data-icon="verified_user">verified_user</span>
<span class="font-label-md text-label-md">Company Verification</span>
</div>
<span class="text-[11px] text-[#71717A] font-code-provenance">3</span>
</a>
<!-- 3. User Directory -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#1A1A1E] transition-colors" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[19px] text-[#A1A1AA]" data-icon="group">group</span>
<span class="font-label-md text-label-md">User Directory</span>
</div>
<span class="text-[11px] text-[#71717A] font-code-provenance">1,482</span>
</a>
<!-- 4. Jobs Moderation -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#1A1A1E] transition-colors" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[19px] text-[#A1A1AA]" data-icon="business_center">business_center</span>
<span class="font-label-md text-label-md">Jobs Moderation</span>
</div>
<span class="text-[11px] text-[#71717A] font-code-provenance">28</span>
</a>
<!-- 5. Integrity Cases (ACTIVE ITEM) -->
<a aria-current="page" class="flex items-center justify-between px-3 py-2 rounded-lg bg-[#D4621A] text-white shadow-sm transition-all" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[19px] text-white" data-icon="warning">warning</span>
<span class="font-label-md text-label-md font-semibold">Integrity Cases</span>
</div>
<span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#2E181D] text-[#F87171] border border-[#482026]">
            2 flagged
          </span>
</a>
<!-- 6. Worker Telemetry -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#1A1A1E] transition-colors" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[19px] text-[#A1A1AA]" data-icon="ssid_chart">ssid_chart</span>
<span class="font-label-md text-label-md">Worker Telemetry</span>
</div>
<span class="text-[11px] text-[#4ADE80] font-semibold">99.8%</span>
</a>
<!-- 7. BDT Subscriptions -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#1A1A1E] transition-colors" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[19px] text-[#A1A1AA]" data-icon="account_balance_wallet">account_balance_wallet</span>
<span class="font-label-md text-label-md">BDT Subscriptions</span>
</div>
<span class="text-[11px] text-[#71717A] font-code-provenance">৳34.5k</span>
</a>
</nav>
</div>
<!-- Bottom Admin Identity -->
<div class="p-space-sm border-t border-[#232328]">
<div class="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#1A1A1E] transition-colors">
<div class="flex items-center gap-2.5 overflow-hidden">
<div class="w-8 h-8 rounded-full bg-[#27272B] flex items-center justify-center text-xs font-semibold text-text-primary-dark shrink-0 border border-[#3F3F46]">
            TC
          </div>
<div class="flex flex-col truncate">
<span class="text-[13px] font-semibold text-text-primary-dark leading-tight truncate">Tanvir Chowdhury</span>
<span class="text-[10px] text-[#71717A] font-code-provenance leading-tight">Platform Admin #01</span>
</div>
</div>
<button aria-label="Sign out" class="w-7 h-7 flex items-center justify-center text-[#71717A] hover:text-text-primary-dark transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]" data-icon="logout">logout</span>
</button>
</div>
</div>
</aside>
<!-- ========================================================================= -->
<!-- MAIN OPERATIONAL VIEWPORT -->
<!-- ========================================================================= -->
<main class="flex-1 flex flex-col min-w-0 bg-[#0E0E11] overflow-y-auto">
<!-- 3. PAGE HEADER -->
<header class="px-space-md md:px-space-lg py-4 border-b border-[#222226] bg-[#0E0E11]/80 backdrop-blur sticky top-0 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div>
<div class="flex items-center gap-2 text-[11px] font-code-provenance text-[#71717A] uppercase tracking-wider mb-1">
<span class="">ADMIN</span>
<span class="">/</span>
<span class="text-text-secondary-dark">INTEGRITY &amp; AUDIT</span>
<span class="w-1.5 h-1.5 rounded-full bg-[#D4621A] inline-block"></span>
</div>
<h1 class="font-headline-lg text-headline-lg text-text-primary-dark tracking-tight leading-none mb-1">
          Integrity Cases &amp; Assessment Audit
        </h1>

</div>
<!-- Right 32x32 Action Group -->
<div class="flex items-center gap-2 shrink-0">
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#202024] transition-colors" title="Search queue" type="button">
<span class="material-symbols-outlined text-[17px]" data-icon="search">search</span>
</button>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#202024] transition-colors" title="Download Audit CSV" type="button">
<span class="material-symbols-outlined text-[17px]" data-icon="download">download</span>
</button>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-text-secondary-dark hover:text-text-primary-dark hover:bg-[#202024] transition-colors" title="Toggle Theme" type="button">
<span class="material-symbols-outlined text-[17px]" data-icon="dark_mode">dark_mode</span>
</button>
</div>
</header>
<!-- CONTENT BODY (Fluid 12-col container capped at 1440px) -->
<div class="w-full max-w-[1440px] mx-auto px-space-md md:px-space-lg py-5 space-y-5 flex-1">
<!-- ========================================================================= -->
<!-- 4. 4-COLUMN KPI ROW -->
<!-- ========================================================================= -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
<!-- KPI 1: Active Integrity Cases -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-all">
<div class="flex items-start justify-between">
<span class="font-body-sm text-body-sm text-text-secondary-dark">Active Integrity Cases</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#F87171]">
<span class="material-symbols-outlined text-[16px]" data-icon="report">report</span>
</div>
</div>
<div class="mt-2 mb-3">
<span class="text-3xl font-bold tracking-tight text-white font-code-provenance">2</span>
</div>
<div class="pt-2 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">Under human investigation</span>

</div>
</div>
<!-- KPI 2: Proctored Assessments -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-all">
<div class="flex items-start justify-between">
<span class="font-body-sm text-body-sm text-text-secondary-dark">Proctored Assessments (30D)</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-text-secondary-dark">
<span class="material-symbols-outlined text-[16px]" data-icon="fact_check">fact_check</span>
</div>
</div>
<div class="mt-2 mb-3">
<span class="text-3xl font-bold tracking-tight text-white font-code-provenance">614</span>
</div>
<div class="pt-2 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">5-snapshot random sampling</span>

</div>
</div>
<!-- KPI 3: Confirmed Violations -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-all">
<div class="flex items-start justify-between">
<span class="font-body-sm text-body-sm text-text-secondary-dark">Confirmed Violations (30D)</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#E5933A]">
<span class="material-symbols-outlined text-[16px]" data-icon="gavel">gavel</span>
</div>
</div>
<div class="mt-2 mb-3">
<span class="text-3xl font-bold tracking-tight text-white font-code-provenance">1</span>
</div>
<div class="pt-2 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">Human signed-off bans</span>

</div>
</div>
<!-- KPI 4: Snapshot Capture Success -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between transition-all">
<div class="flex items-start justify-between">
<span class="font-body-sm text-body-sm text-text-secondary-dark">Snapshot Capture Success</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#4ADE80]">
<span class="material-symbols-outlined text-[16px]" data-icon="videocam">videocam</span>
</div>
</div>
<div class="mt-2 mb-3">
<span class="text-3xl font-bold tracking-tight text-white font-code-provenance">98.4%</span>
</div>
<div class="pt-2 border-t border-[#222227] flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">Mobile camera permission rate</span>

</div>
</div>
</section>
<!-- ========================================================================= -->
<!-- 5. FULL-WIDTH CASES QUEUE & AUDIT TABLE -->
<!-- ========================================================================= -->
<section class="bg-[#151518] border border-[#25252A] rounded-xl overflow-hidden flex flex-col">
<!-- Tabs & Filters Row -->
<div class="px-4 py-3 border-b border-[#222227] flex flex-wrap items-center justify-between gap-3">
<!-- Segmented Filter Tabs -->
<div class="flex items-center gap-1 overflow-x-auto py-0.5">
<button class="px-3 py-1.5 rounded-lg bg-[#D4621A] text-white font-label-sm text-label-sm font-semibold tracking-wide whitespace-nowrap" type="button">
              All Flagged (2)
            </button>
<button class="px-3 py-1.5 rounded-lg text-text-secondary-dark hover:text-white hover:bg-[#1A1A1E] font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
              Under Investigation (2)
            </button>
<button class="px-3 py-1.5 rounded-lg text-text-secondary-dark hover:text-white hover:bg-[#1A1A1E] font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
              Cleared (38)
            </button>
<button class="px-3 py-1.5 rounded-lg text-text-secondary-dark hover:text-white hover:bg-[#1A1A1E] font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
              Confirmed Violation (1)
            </button>
<button class="px-3 py-1.5 rounded-lg text-text-secondary-dark hover:text-white hover:bg-[#1A1A1E] font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
              Camera Telemetry (5)
            </button>
</div>
<!-- Controls -->
<div class="flex items-center gap-2 shrink-0">
<div class="relative">
<select class="bg-[#161619] border border-[#27272C] rounded-lg text-[12px] text-text-secondary-dark py-1.5 pl-3 pr-8 focus:border-[#D4621A] focus:outline-none focus:ring-1 focus:ring-[#D4621A] appearance-none cursor-pointer">
<option>Filter: Anomaly Type (All)</option>
<option>Face Disparity</option>
<option>Multi-Person</option>
<option>Camera Blackout</option>
<option>Blur Threshold</option>
</select>
<span class="material-symbols-outlined text-[16px] text-[#71717A] absolute right-2 top-2 pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-text-secondary-dark hover:text-text-primary-dark transition-colors" title="Refresh Table" type="button">
<span class="material-symbols-outlined text-[16px]" data-icon="refresh">refresh</span>
</button>
</div>
</div>
<!-- Table Container -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse text-body-sm">
<thead>
<tr class="border-b border-[#222227] bg-[#121215]/50 text-[11px] font-label-sm text-[#71717A] tracking-wider uppercase">
<th class="py-3 px-4 font-medium">Case ID &amp; Attempt</th>
<th class="py-3 px-4 font-medium">Candidate &amp; Role</th>
<th class="py-3 px-4 font-medium">Recruiter &amp; Company</th>
<th class="py-3 px-4 font-medium">Detected Anomaly / Reason</th>
<th class="py-3 px-4 font-medium">Snapshot Telemetry (5 Slots)</th>
<th class="py-3 px-4 font-medium">SLA &amp; Status</th>
<th class="py-3 px-4 font-medium text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-[#222227]">
<!-- ROW 1 (SELECTED ROW) -->
<tr class="bg-[#252528] border-l-2 border-[#D4621A] transition-colors">
<td class="py-3.5 px-4 font-code-provenance">
<div class="font-semibold text-text-primary-dark">#INT-204</div>
<div class="text-[11px] text-[#71717A]">Attempt #ATT-9812</div>
</td>
<td class="py-3.5 px-4">
<div class="font-semibold text-text-primary-dark">Shakil Mahmud</div>
<div class="text-[11px] text-[#A1A1AA] flex items-center gap-1 font-code-provenance">
<span class="text-[#D4621A]">@shakil-crawler</span> • Senior ML Engineer
                  </div>
</td>
<td class="py-3.5 px-4">
<div class="text-text-primary-dark font-medium">Sadia Rahman</div>
<div class="text-[11px] text-[#71717A]">TigerIT Bangladesh Ltd.</div>
</td>
<td class="py-3.5 px-4 max-w-[260px]">
<div class="text-text-primary-dark font-medium flex items-center gap-1.5 text-xs text-[#F87171]">
<span class="material-symbols-outlined text-[15px]" data-icon="face">face</span>
                    Secondary Face Detected
                  </div>
<div class="text-[11px] text-[#A1A1AA] truncate mt-0.5">
                    Snapshot #3 &amp; #4 (Confidence 91.2%)
                  </div>
</td>
<td class="py-3.5 px-4">
<!-- 5 Snapshot Badges -->
<div class="flex items-center gap-1">
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">1: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">2: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#2E181D] text-[#F87171] border border-[#482026] font-semibold">3: Flag</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#2E181D] text-[#F87171] border border-[#482026] font-semibold">4: Flag</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">5: Pass</span>
</div>
</td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2C2114] text-[#E5933A] border border-[#44301B] text-[11px] font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#E5933A]"></span>
                    Under Review
                  </span>
</td>
<td class="py-3.5 px-4 text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2 py-1 rounded bg-[#D4621A] text-white text-[11px] font-medium hover:bg-[#BF5313] transition-colors" type="button">
                      Inspect
                    </button>
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#B3B3B3] text-[11px] hover:text-white transition-colors" type="button">
                      Clear
                    </button>
</div>
</td>
</tr>
<!-- ROW 2 -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-4 font-code-provenance">
<div class="font-semibold text-text-primary-dark">#INT-205</div>
<div class="text-[11px] text-[#71717A]">Attempt #ATT-9840</div>
</td>
<td class="py-3.5 px-4">
<div class="font-semibold text-text-primary-dark">Tanvir Hasan</div>
<div class="text-[11px] text-[#A1A1AA] flex items-center gap-1 font-code-provenance">
<span class="text-text-secondary-dark">@tanvir-ml</span> • Backend Engineer (Go)
                  </div>
</td>
<td class="py-3.5 px-4">
<div class="text-text-primary-dark font-medium">Farhan Ahmed</div>
<div class="text-[11px] text-[#71717A]">Therap BD Ltd.</div>
</td>
<td class="py-3.5 px-4 max-w-[260px]">
<div class="text-text-primary-dark font-medium flex items-center gap-1.5 text-xs text-[#E5933A]">
<span class="material-symbols-outlined text-[15px]" data-icon="videocam_off">videocam_off</span>
                    Camera Blackout Event
                  </div>
<div class="text-[11px] text-[#71717A] truncate mt-0.5">
                    Snapshot #2 packet drop (resumed 4s)
                  </div>
</td>
<td class="py-3.5 px-4">
<div class="flex items-center gap-1">
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">1: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#2A2A2E] text-[#B3B3B3] border border-[#3F3F46]">2: Drop</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">3: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">4: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">5: Pass</span>
</div>
</td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2A2A2E] text-[#B3B3B3] border border-[#3F3F46] text-[11px] font-medium">
                    Technical Triage
                  </span>
</td>
<td class="py-3.5 px-4 text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#B3B3B3] text-[11px] hover:text-white transition-colors" type="button">
                      Inspect
                    </button>
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#B3B3B3] text-[11px] hover:text-white transition-colors" type="button">
                      Clear
                    </button>
</div>
</td>
</tr>
<!-- ROW 3 -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-4 font-code-provenance">
<div class="font-semibold text-text-primary-dark">#INT-198</div>
<div class="text-[11px] text-[#71717A]">Attempt #ATT-9710</div>
</td>
<td class="py-3.5 px-4">
<div class="font-semibold text-text-primary-dark">Arif Rahman</div>
<div class="text-[11px] text-[#A1A1AA] flex items-center gap-1 font-code-provenance">
                    Distributed Systems Lead
                  </div>
</td>
<td class="py-3.5 px-4">
<div class="text-text-primary-dark font-medium">Nabila Zahan</div>
<div class="text-[11px] text-[#71717A]">Brain Station 23</div>
</td>
<td class="py-3.5 px-4 max-w-[260px]">
<div class="text-text-primary-dark font-medium flex items-center gap-1.5 text-xs text-[#4ADE80]">
<span class="material-symbols-outlined text-[15px]" data-icon="check_circle">check_circle</span>
                    Routine Proctoring
                  </div>
<div class="text-[11px] text-[#71717A] truncate mt-0.5">
                    Continuous face detection verified
                  </div>
</td>
<td class="py-3.5 px-4">
<div class="flex items-center gap-1">
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">1: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">2: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">3: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">4: Pass</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-code-provenance bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">5: Pass</span>
</div>
</td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C] text-[11px] font-medium">
                    Cleared
                  </span>
</td>
<td class="py-3.5 px-4 text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#B3B3B3] text-[11px] hover:text-white transition-colors" type="button">
                      Logs
                    </button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Pagination Footer -->
<div class="px-4 py-2.5 border-t border-[#222227] bg-[#121215]/30 flex items-center justify-between text-[11px] text-[#71717A]">
<div class="flex items-center gap-2">
<span class="">Rows per page: <span class="text-text-primary-dark font-medium">25</span></span>
<span class="text-[#3F3F46]">|</span>
<span class="">Showing 1-3 of 2 active cases</span>
</div>
<div class="flex items-center gap-1">
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#71717A] disabled:opacity-40" disabled="" type="button">Previous</button>
<button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-text-primary-dark hover:bg-[#202024]" type="button">Next</button>
</div>
</div>
</section>
<!-- ========================================================================= -->
<!-- 6. FULL-WIDTH LIVE CONTEXT INSPECTOR DOCK (3 balanced columns) -->
<!-- ========================================================================= -->
<section class="bg-[#151518] border border-[#25252A] rounded-xl overflow-hidden flex flex-col">
<!-- Inspector Header -->
<div class="px-4 py-3 border-b border-[#222227] bg-[#17171B] flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#D4621A] inline-block animate-ping"></span>
<span class="font-code-provenance text-[12px] font-semibold tracking-wide text-text-primary-dark">
              #CASE-INT-204 LIVE AUDIT CONTEXT • ATTEMPT #ATT-9812 • TIMED ASSESSMENT (5 QUESTIONS / 5 MINUTES)
            </span>
</div>
<div class="text-[11px] font-code-provenance text-[#71717A] flex items-center gap-2">
<span class="material-symbols-outlined text-[15px]" data-icon="lock">lock</span>
            Auditor Session: TC-01 (Strict Isolation)
          </div>
</div>
<!-- 3-Column Technical Grid -->
<div class="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#222227]">
<!-- COLUMN 1: Candidate & Assessment Provenance -->
<div class="p-4 space-y-4 flex flex-col justify-between">
<div class="space-y-3">
<div class="flex items-center justify-between pb-2 border-b border-[#222227]">
<span class="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">Candidate &amp; Assessment Provenance</span>
<span class="text-[10px] font-code-provenance px-1.5 py-0.5 rounded bg-[#17171B] border border-[#27272C] text-[#A1A1AA]">ID: USR-4912</span>
</div>
<!-- Identity Block -->
<div class="bg-[#17171B] border border-[#27272C] rounded-lg p-3 space-y-2">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#D4621A] font-bold text-sm">
                    SM
                  </div>
<div>
<h3 class="text-sm font-semibold text-text-primary-dark">Shakil Mahmud</h3>
<p class="text-[11px] text-[#A1A1AA] font-code-provenance">Candidate @shakil-crawler</p>
</div>
</div>
<!-- Proofline connector for role & company -->
<div class="pt-2 text-xs space-y-1">
<div class="flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">Target Role</span>
<span class="text-text-primary-dark font-medium">Lead Distributed Systems Engineer</span>
</div>
<div class="flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">Target Employer</span>
<span class="text-text-primary-dark font-medium">TigerIT Bangladesh Ltd.</span>
</div>
<div class="flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">Session App Build</span>
<span class="text-[#A1A1AA] font-code-provenance">Mobile Android v2.4.1 (Build 412)</span>
</div>
<div class="flex items-center justify-between text-[11px]">
<span class="text-[#71717A]">Execution Time</span>
<span class="text-[#A1A1AA] font-code-provenance">14:20:11 UTC → 14:25:04 UTC</span>
</div>
</div>
</div>
</div>
<!-- Section 14 Guardrail -->
<div class="p-3 rounded-lg bg-[#17171B] border border-[#27272C] border-l-2 border-l-[#D4621A] space-y-1 mt-auto">
<div class="flex items-center gap-1.5 text-[11px] font-semibold text-[#D4621A]">
<span class="material-symbols-outlined text-[15px]" data-icon="policy">policy</span>
                Section 14 Governance Guardrail
              </div>
<p class="text-[11px] text-[#A1A1AA] leading-relaxed">
                Zero Autonomous Banning Guarantee — AI algorithms flag perceptual anomalies; only authenticated human recruiters or platform admins may commit an integrity violation.
              </p>
</div>
</div>
<!-- COLUMN 2: 5-Snapshot Proctoring Trail & Event Timeline -->
<div class="p-4 space-y-4">
<div class="flex items-center justify-between pb-2 border-b border-[#222227]">
<span class="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">5-Snapshot Proctoring Trail</span>
<span class="text-[11px] text-[#F87171] font-semibold">2 Anomalies Detected</span>
</div>
<!-- 5 Snapshot Tiles Grid -->
<div class="grid grid-cols-5 gap-1.5">
<!-- Snapshot 1 -->
<div class="bg-[#17171B] border border-[#27272C] rounded-lg p-1.5 flex flex-col items-center text-center">
<div class="w-full h-14 bg-[#1F1F24] rounded flex flex-col items-center justify-center text-[#4ADE80] mb-1 relative overflow-hidden">
<span class="material-symbols-outlined text-[20px]" data-icon="face">face</span>
<span class="text-[8px] font-code-provenance text-[#A1A1AA] mt-0.5">0:45</span>
</div>
<span class="text-[9px] font-code-provenance text-[#4ADE80] font-semibold">Pass</span>
<span class="text-[8px] text-[#71717A] leading-tight truncate w-full">Gaze 98%</span>
</div>
<!-- Snapshot 2 -->
<div class="bg-[#17171B] border border-[#27272C] rounded-lg p-1.5 flex flex-col items-center text-center">
<div class="w-full h-14 bg-[#1F1F24] rounded flex flex-col items-center justify-center text-[#4ADE80] mb-1 relative overflow-hidden">
<span class="material-symbols-outlined text-[20px]" data-icon="face">face</span>
<span class="text-[8px] font-code-provenance text-[#A1A1AA] mt-0.5">1:30</span>
</div>
<span class="text-[9px] font-code-provenance text-[#4ADE80] font-semibold">Pass</span>
<span class="text-[8px] text-[#71717A] leading-tight truncate w-full">Aligned</span>
</div>
<!-- Snapshot 3 (FLAGGED) -->
<div class="bg-[#2E181D] border border-[#482026] rounded-lg p-1.5 flex flex-col items-center text-center ring-1 ring-[#F87171]">
<div class="w-full h-14 bg-[#231418] rounded flex flex-col items-center justify-center text-[#F87171] mb-1 relative overflow-hidden">
<span class="material-symbols-outlined text-[20px]" data-icon="group">group</span>
<span class="text-[8px] font-code-provenance text-[#F87171] mt-0.5">2:45</span>
</div>
<span class="text-[9px] font-code-provenance text-[#F87171] font-bold">Flagged</span>
<span class="text-[8px] text-[#F87171] leading-tight truncate w-full">+1 Face</span>
</div>
<!-- Snapshot 4 (FLAGGED) -->
<div class="bg-[#2E181D] border border-[#482026] rounded-lg p-1.5 flex flex-col items-center text-center ring-1 ring-[#F87171]">
<div class="w-full h-14 bg-[#231418] rounded flex flex-col items-center justify-center text-[#F87171] mb-1 relative overflow-hidden">
<span class="material-symbols-outlined text-[20px]" data-icon="group">group</span>
<span class="text-[8px] font-code-provenance text-[#F87171] mt-0.5">3:50</span>
</div>
<span class="text-[9px] font-code-provenance text-[#F87171] font-bold">Flagged</span>
<span class="text-[8px] text-[#F87171] leading-tight truncate w-full">Dual Face</span>
</div>
<!-- Snapshot 5 -->
<div class="bg-[#17171B] border border-[#27272C] rounded-lg p-1.5 flex flex-col items-center text-center">
<div class="w-full h-14 bg-[#1F1F24] rounded flex flex-col items-center justify-center text-[#4ADE80] mb-1 relative overflow-hidden">
<span class="material-symbols-outlined text-[20px]" data-icon="face">face</span>
<span class="text-[8px] font-code-provenance text-[#A1A1AA] mt-0.5">4:40</span>
</div>
<span class="text-[9px] font-code-provenance text-[#4ADE80] font-semibold">Pass</span>
<span class="text-[8px] text-[#71717A] leading-tight truncate w-full">Single Face</span>
</div>
</div>
<!-- Forensic Timeline & Sensor Logs -->
<div class="bg-[#17171B] border border-[#27272C] rounded-lg p-3 space-y-2">
<span class="text-[11px] font-medium text-[#71717A] block">Session Device Sensor Feed</span>
<div class="grid grid-cols-3 gap-2 text-center">
<div class="p-2 rounded bg-[#151518] border border-[#222227]">
<span class="text-[10px] text-[#71717A] block">App Blur Events</span>
<span class="text-xs font-semibold text-[#4ADE80] font-code-provenance">0</span>
</div>
<div class="p-2 rounded bg-[#151518] border border-[#222227]">
<span class="text-[10px] text-[#71717A] block">Device Switches</span>
<span class="text-xs font-semibold text-[#4ADE80] font-code-provenance">0</span>
</div>
<div class="p-2 rounded bg-[#151518] border border-[#222227]">
<span class="text-[10px] text-[#71717A] block">Net Drops</span>
<span class="text-xs font-semibold text-[#4ADE80] font-code-provenance">0</span>
</div>
</div>
<div class="text-[11px] text-[#A1A1AA] bg-[#121215] p-2 rounded font-code-provenance border border-[#222227] leading-tight">
<span class="text-[#F87171] font-semibold">[Telemetry Alert]</span> Bounding box delta: Secondary human countenance recognized at (X:412, Y:128) during question #3 (Distributed Consensuses).
              </div>
</div>
</div>
<!-- COLUMN 3: Forensic Audit Decision & Action Suite -->
<div class="p-4 space-y-3 flex flex-col justify-between">
<div class="space-y-2.5">
<div class="flex items-center justify-between pb-2 border-b border-[#222227]">
<span class="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">Forensic Audit Decision Suite</span>
<span class="text-[10px] text-[#E5933A] font-medium">Pending Decision</span>
</div>
<!-- Mandatory Audit Trail Textarea -->
<div class="space-y-1">
<label class="text-[11px] font-medium text-text-secondary-dark flex items-center justify-between" for="audit-justification">
<span class="">Mandatory Justification Log</span>
<span class="text-[10px] text-[#71717A] font-code-provenance">ISO-27001 AUDIT</span>
</label>
<textarea class="w-full bg-[#161619] border border-[#27272C] rounded-lg p-2.5 text-xs text-text-primary-dark placeholder-[#71717A] focus:border-[#D4621A] focus:outline-none focus:ring-1 focus:ring-[#D4621A] resize-none" id="audit-justification" placeholder="Enter justification for integrity review decision (required under ISO-27001 audit)..." rows="3"></textarea>
</div>
<!-- Action buttons -->
<div class="grid grid-cols-2 gap-2 pt-1">
<button class="px-2.5 py-2 rounded-lg bg-[#161619] border border-[#27272C] hover:bg-[#202024] text-[11px] font-medium text-text-primary-dark transition-colors" type="button">
                  Mark No Violation
                </button>
<button class="px-2.5 py-2 rounded-lg bg-[#161619] border border-[#27272C] hover:bg-[#202024] text-[11px] font-medium text-text-primary-dark transition-colors" type="button">
                  Request Retake
                </button>
</div>
<!-- Destructive Action -->
<button class="w-full px-3 py-2 rounded-lg bg-[#2E181D] border border-[#482026] hover:bg-[#3D1D24] text-[11px] font-semibold text-[#F87171] flex items-center justify-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[15px]" data-icon="block">block</span>
                Confirm Violation &amp; Trigger Assessment Ban
              </button>
</div>
<!-- Primary Commit Action -->
<button class="w-full mt-2 px-4 py-2.5 rounded-lg bg-[#D4621A] hover:bg-[#BF5313] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]" data-icon="lock_clock">lock_clock</span>
              Commit Integrity Audit Decision
            </button>
</div>
</div>
</section>
</div>
<!-- ========================================================================= -->
<!-- 7. FOOTER (Shared Footprint Logic & Ground Truth Spec) -->
<!-- ========================================================================= -->
<footer class="mt-auto border-t border-[#1C1C20] bg-[#121215] py-3.5 px-space-md md:px-space-lg text-[11px] text-[#71717A] flex flex-col sm:flex-row items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
<span class="">TalentGraph governance shell • All audit decisions are cryptographically signed with SHA-256 integrity</span>
</div>
<div class="flex items-center gap-4">
<a class="hover:text-text-primary-dark transition-colors flex items-center gap-1" href="#">
<span class="material-symbols-outlined text-[14px]" data-icon="key">key</span>
          Need forensic review support? Contact platform security
        </a>
</div>
</footer>
</main>


</body></html>