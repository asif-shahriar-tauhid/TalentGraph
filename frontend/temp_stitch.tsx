<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>TalentGraph Admin - Job Postings &amp; Content Moderation</title>
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "surface-selected-light": "#FFF1E8",
            "surface-bright": "#39393b",
            "on-surface-variant": "#dec0b3",
            "text-secondary-dark": "#A1A1AA",
            "brand-hover-dark": "#E47735",
            "primary-fixed": "#ffdbcb",
            "surface-variant": "#353437",
            "status-error-dark": "#E5484D",
            "secondary": "#c7c5d0",
            "on-surface": "#e5e1e4",
            "on-error": "#690005",
            "tertiary": "#95ccff",
            "surface": "#131315",
            "tertiary-fixed-dim": "#95ccff",
            "on-primary": "#552000",
            "on-tertiary-fixed-variant": "#004a75",
            "status-warning-light": "#B45309",
            "tertiary-container": "#2797e2",
            "on-secondary": "#2f3038",
            "border-subtle-light": "#E4E4E7",
            "surface-tint": "#ffb691",
            "surface-elevated-light": "#FFFFFF",
            "surface-container-low": "#1b1b1d",
            "outline-variant": "#574238",
            "text-primary-light": "#18181B",
            "on-primary-fixed": "#341100",
            "surface-container-highest": "#353437",
            "on-error-container": "#ffdad6",
            "surface-dim": "#131315",
            "on-tertiary-fixed": "#001d32",
            "tertiary-fixed": "#cee5ff",
            "on-tertiary-container": "#002c48",
            "error-container": "#93000a",
            "secondary-fixed": "#e3e1ec",
            "status-success-light": "#15803D",
            "background": "#131315",
            "on-tertiary": "#003353",
            "brand-hover-light": "#B94F0B",
            "cta-text": "#18181B",
            "status-success-dark": "#22C55E",
            "surface-elevated-dark": "#19191C",
            "status-warning-dark": "#F59E0B",
            "inverse-primary": "#9f4200",
            "outline": "#a68b7f",
            "inverse-surface": "#e5e1e4",
            "border-subtle-dark": "#3F3F46",
            "surface-container": "#201f21",
            "secondary-container": "#46464f",
            "primary-fixed-dim": "#ffb691",
            "on-primary-fixed-variant": "#793100",
            "text-secondary-light": "#71717A",
            "surface-selected-dark": "#252528",
            "surface-container-lowest": "#0e0e10",
            "text-primary-dark": "#F5F5F5",
            "on-secondary-fixed": "#1a1b23",
            "on-secondary-fixed-variant": "#46464f",
            "secondary-fixed-dim": "#c7c5d0",
            "on-primary-container": "#4b1b00",
            "surface-container-high": "#2a2a2c",
            "surface-canvas-light": "#FFFFFF",
            "primary-container": "#e56f27",
            "inverse-on-surface": "#313032",
            "on-background": "#e5e1e4",
            "error": "#ffb4ab",
            "on-secondary-container": "#b5b4be",
            "status-error-light": "#DC2626",
            "surface-alternate-light": "#F8FAFC",
            "primary": "#ffb691",
            "surface-canvas-dark": "#0D0D0F",
            /* Stitch & Admin custom palette overrides */
            "tg-bg": "#0E0E11",
            "tg-sidebar": "#121215",
            "tg-sidebar-border": "#222226",
            "tg-card": "#151518",
            "tg-card-border": "#25252A",
            "tg-inset": "#17171B",
            "tg-inset-border": "#27272C",
            "tg-brand": "#D4621A",
            "tg-brand-hover": "#BF5313",
            "tg-monogram": "#E56218"
          },
          borderRadius: {
            DEFAULT: "0.25rem",
            lg: "0.5rem",
            xl: "0.75rem",
            full: "9999px"
          },
          spacing: {
            "space-xl": "2rem",
            "space-sm": "0.5rem",
            "gutter": "1rem",
            "gutter-desktop": "1.5rem",
            "space-lg": "1.5rem",
            "margin-desktop": "2rem",
            "margin": "1rem",
            "space-md": "1rem",
            "space-xs": "0.25rem"
          },
          fontFamily: {
            "headline-lg": ["Inter"],
            "display-lg": ["Inter"],
            "display-lg-mobile": ["Inter"],
            "label-md": ["Inter"],
            "code-provenance": ["Inter"],
            "body-sm": ["Inter"],
            "headline-md": ["Inter"],
            "body-md": ["Inter"],
            "headline-lg-mobile": ["Inter"],
            "label-sm": ["Inter"],
            "title-sm": ["Inter"],
            "body-lg": ["Inter"]
          },
          fontSize: {
            "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
            "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
            "display-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "700" }],
            "label-md": ["13px", { lineHeight: "18px", fontWeight: "500" }],
            "code-provenance": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
            "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
            "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
            "headline-lg-mobile": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "500" }],
            "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
            "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }]
          }
        }
      }
    };
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      line-height: 1;
      display: inline-block;
      vertical-align: middle;
      font-size: 18px;
    }
    body {
      background-color: #0E0E11;
      color: #D4D4D8;
      font-family: 'Inter', sans-serif;
    }
    /* Proofline Custom Connector */
    .proofline-stem {
      width: 1.5px;
      background-color: #27272C;
    }
  </style>
</head>
<body class="bg-[#0E0E11] text-[#D4D4D8] antialiased flex min-h-screen overflow-x-hidden selection:bg-[#D4621A]/30 selection:text-white">
<!-- ==================== FIXED SIDEBAR (256px) ==================== -->
<aside class="w-64 min-w-[256px] bg-[#121215] border-r border-[#222226] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-40">
<div>
<!-- Brand & Entity Header -->
<div class="p-4 flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-[#E56218] text-white flex items-center justify-center font-bold text-base tracking-tight shrink-0 shadow-none">
          TG
        </div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-2">
<span class="text-white text-[14px] font-semibold tracking-tight truncate">TalentGraph</span>
<span class="text-[10px] font-medium tracking-wide bg-[#2A2A2E] text-[#B3B3B3] px-1.5 py-0.5 rounded text-center">ADMIN</span>
</div>
<span class="text-[11px] text-[#71717A] tracking-normal font-normal">Operational control</span>
</div>
</div>
<!-- Inset Governance Policy Banner -->
<div class="px-3.5 mb-3">

</div>
<!-- Navigation Menu -->
<nav class="px-2 space-y-1">
<!-- Item 1: Operational Queue -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#17171B] transition-colors group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#FFFFFF] text-[18px]">dashboard</span>
<span class="">Operational Queue</span>
</div>
</a>
<!-- Item 2: Company Verification -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#17171B] transition-colors group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#FFFFFF] text-[18px]">verified_user</span>
<span class="">Company Verification</span>
</div>
<span class="text-[11px] font-mono text-[#71717A] bg-[#1A1A1E] px-1.5 py-0.5 rounded border border-[#25252A]">3</span>
</a>
<!-- Item 3: User Directory -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#17171B] transition-colors group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#FFFFFF] text-[18px]">group</span>
<span class="">User Directory</span>
</div>
<span class="text-[11px] font-mono text-[#71717A]">1,482</span>
</a>
<!-- Item 4: Jobs Moderation (ACTIVE) -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium bg-[#D4621A] text-[#FFFFFF] shadow-sm" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-white text-[18px]">work</span>
<span class="font-medium text-white">Jobs Moderation</span>
</div>
<span class="text-[11px] font-mono font-semibold text-white bg-black/20 px-1.5 py-0.5 rounded">28</span>
</a>
<!-- Item 5: Integrity Cases -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#17171B] transition-colors group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#FFFFFF] text-[18px]">warning</span>
<span class="">Integrity Cases</span>
</div>
<span class="text-[11px] font-mono text-[#F87171] bg-[#2E181D] border border-[#482026] px-1.5 py-0.5 rounded font-medium">2 flagged</span>
</a>
<!-- Item 6: Worker Telemetry -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#17171B] transition-colors group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#FFFFFF] text-[18px]">show_chart</span>
<span class="">Worker Telemetry</span>
</div>
<span class="text-[11px] font-mono text-[#4ADE80]">99.8%</span>
</a>
<!-- Item 7: BDT Subscriptions -->
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#17171B] transition-colors group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#71717A] group-hover:text-[#FFFFFF] text-[18px]">account_balance_wallet</span>
<span class="">BDT Subscriptions</span>
</div>
<span class="text-[11px] font-mono text-[#71717A]">৳34.5k</span>
</a>
</nav>
</div>
<!-- Admin User Footer in Sidebar -->
<div class="p-3 border-t border-[#232328] bg-[#121215]">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-8 h-8 rounded bg-[#27272B] border border-[#3A3A40] flex items-center justify-center text-[12px] font-semibold text-[#D4D4D8] shrink-0">
            TC
          </div>
<div class="flex flex-col min-w-0">
<span class="text-[12px] font-semibold text-white truncate leading-tight">Tanvir Chowdhury</span>
<span class="text-[11px] text-[#71717A] truncate font-mono">Platform Admin #01</span>
</div>
</div>
<button aria-label="Sign out" class="w-8 h-8 flex items-center justify-center rounded-lg text-[#71717A] hover:text-white hover:bg-[#17171B] transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">logout</span>
</button>
</div>
</div>
</aside>
<!-- ==================== MAIN APPLICATION CANVAS ==================== -->
<div class="flex-1 flex flex-col min-w-0 bg-[#0E0E11]">
<!-- Top Status / Announcement Bar (Proofline spec) -->
<header class="h-16 border-b border-[#222226] bg-[#0E0E11] px-6 flex items-center justify-between sticky top-0 z-30">
<div class="flex flex-col">
<div class="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#71717A]">
<span class="">ADMIN</span>
<span class="">/</span>
<span class="text-[#D4621A] font-medium">JOBS MODERATION</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-[#3F3F46] mx-1"></span>

</div>
<h1 class="text-white text-[18px] font-semibold tracking-tight">Job Postings &amp; Content Moderation</h1>
</div>
<!-- Action Cluster -->
<div class="flex items-center gap-2">
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors" title="Quick Search" type="button">
<span class="material-symbols-outlined text-[17px]">search</span>
</button>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors" title="Export Ledger" type="button">
<span class="material-symbols-outlined text-[17px]">download</span>
</button>
<button class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors" title="Theme Mode Toggle" type="button">
<span class="material-symbols-outlined text-[17px]">dark_mode</span>
</button>
</div>
</header>
<!-- Subheader Note -->

<!-- Scrollable Workspace Body -->
<main class="flex-1 p-6 space-y-6 max-w-[1600px] w-full mx-auto">
<!-- ==================== 4-COLUMN KPI ROW ==================== -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Card 1 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-center justify-between mb-2">
<span class="text-[12px] font-medium text-[#A1A1AA]">Total Open Postings</span>

</div>
<div class="flex items-baseline gap-2 mb-1">
<span class="text-[28px] font-bold text-white tracking-tight font-headline-lg">184</span>
</div>
<p class="text-[11px] text-[#71717A] truncate">
<span class="text-[#D4D4D8] font-medium">156</span> Active • <span class="text-[#E5933A] font-medium">28</span> Under Moderation
          </p>
</div>
<!-- Card 2 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-center justify-between mb-2">
<span class="text-[12px] font-medium text-[#A1A1AA]">Reported &amp; Flagged</span>

</div>
<div class="flex items-baseline gap-2 mb-1">
<span class="text-[28px] font-bold text-[#F87171] tracking-tight font-headline-lg">6</span>
</div>
<p class="text-[11px] text-[#71717A] truncate">
            4 Spam/Ghost • 2 Weight Imbalance
          </p>
</div>
<!-- Card 3 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-center justify-between mb-2">
<span class="text-[12px] font-medium text-[#A1A1AA]">Unverified Company Drafts</span>

</div>
<div class="flex items-baseline gap-2 mb-1">
<span class="text-[28px] font-bold text-white tracking-tight font-headline-lg">14</span>
</div>
<p class="text-[11px] text-[#71717A] truncate">
            Publish blocked until RJSC/Affiliation clears
          </p>
</div>
<!-- Card 4 -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-center justify-between mb-2">
<span class="text-[12px] font-medium text-[#A1A1AA]">Moderation Queue TAT</span>

</div>
<div class="flex items-baseline gap-2 mb-1">
<span class="text-[28px] font-bold text-white tracking-tight font-headline-lg font-mono">1.8h</span>
</div>
<p class="text-[11px] text-[#71717A] truncate">
            Avg review turnaround • BullMQ clean
          </p>
</div>
</section>
<!-- ==================== SPLIT MAIN CONTENT (8/4 LAYOUT) ==================== -->
<div class="flex flex-col gap-6 w-full"><section class="w-full space-y-4"><div class="bg-[#151518] border border-[#25252A] rounded-xl overflow-hidden flex flex-col"><div class="p-3 border-b border-[#25252A] flex flex-wrap items-center justify-between gap-3 bg-[#131316]"><div class="flex items-center gap-1"><button class="px-3 py-1.5 text-[12px] font-medium bg-[#1F1F24] text-white border border-[#2B2B32] rounded-md transition-colors" type="button">All Flagged <span class="ml-1 text-[11px] font-mono text-[#D4621A]">28</span></button><button class="px-3 py-1.5 text-[12px] font-medium text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1E] rounded-md transition-colors" type="button">Policy Reports <span class="ml-1 text-[11px] font-mono text-[#71717A]">6</span></button><button class="px-3 py-1.5 text-[12px] font-medium text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1E] rounded-md transition-colors" type="button">Pending Co. Verification <span class="ml-1 text-[11px] font-mono text-[#71717A]">14</span></button><button class="px-3 py-1.5 text-[12px] font-medium text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1E] rounded-md transition-colors" type="button">Suspended <span class="ml-1 text-[11px] font-mono text-[#71717A]">8</span></button></div><div class="flex items-center gap-2"><div class="relative"><select aria-label="Filter by violation type" class="bg-[#161619] border border-[#27272C] text-[#D4D4D8] text-[12px] rounded-md px-2.5 py-1.5 pr-7 focus:ring-1 focus:ring-[#D4621A] focus:border-[#D4621A] outline-none"><option>All Violation Types</option><option>Weight Calibration Failures</option><option>Unregistered Entity</option><option>External Fee Link / Spam</option></select></div><button class="w-8 h-8 rounded-md bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46]" title="Refresh list" type="button"><span class="material-symbols-outlined text-[16px]">refresh</span></button></div></div><div class="overflow-x-auto"><table class="w-full text-left border-collapse text-[12px]"><thead><tr class="border-b border-[#25252A] bg-[#121215] text-[#71717A] font-mono uppercase text-[11px]"><th class="py-3 px-4 font-medium">Job Details &amp; Entity</th><th class="py-3 px-3 font-medium">Posted By &amp; Role</th><th class="py-3 px-3 font-medium">Flag Type / Reason</th><th class="py-3 px-3 font-medium">SLA &amp; Status</th><th class="py-3 px-4 font-medium text-right">Actions</th></tr></thead><tbody class="divide-y divide-[#222226]"><tr class="bg-[#252528] border-l-2 border-l-[#D4621A] hover:bg-[#252528] transition-colors cursor-pointer"><td class="py-3.5 px-4"><div class="flex flex-col"><div class="flex items-center gap-1.5"><span class="font-semibold text-white text-[13px]">Lead Distributed Systems Engineer</span><span class="text-[10px] font-mono text-[#D4621A] bg-[#2C2114] px-1 py-0.5 rounded border border-[#44301B]">ACTIVE</span></div><div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#A1A1AA]"><span class="">TigerIT Bangladesh Ltd.</span><span class="inline-flex items-center text-[#4ADE80]" title="RJSC Verified Company"><span class="material-symbols-outlined text-[14px]">check_circle</span></span><span class="text-[#71717A] font-mono">• Mohakhali DOHS, Dhaka</span></div></div></td><td class="py-3.5 px-3"><div class="flex flex-col"><span class="text-[#D4D4D8] font-medium">Sadia Rahman</span><span class="text-[11px] font-mono text-[#71717A]">sadia@tigerit.com</span></div></td><td class="py-3.5 px-3"><div class="flex flex-col gap-1"><span class="text-[#E5933A] text-[11px] font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">tune</span>Weight Calibration Audit</span><span class="text-[10px] font-mono text-[#A1A1AA]">Go 60% / Kafka 40% / 0% Assess</span></div></td><td class="py-3.5 px-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#2C2114] border border-[#44301B] text-[#E5933A]">Under Audit</span></td><td class="py-3.5 px-4 text-right"><div class="flex items-center justify-end gap-1.5"><button class="w-7 h-7 rounded bg-[#1F1F24] border border-[#2B2B32] text-white flex items-center justify-center hover:border-[#D4621A]" title="Inspect Posting" type="button"><span class="material-symbols-outlined text-[15px]">visibility</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#F87171] flex items-center justify-center hover:bg-[#2E181D]" title="Quick Suspend" type="button"><span class="material-symbols-outlined text-[15px]">block</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#4ADE80] flex items-center justify-center hover:bg-[#13281E]" title="Clear &amp; Approve" type="button"><span class="material-symbols-outlined text-[15px]">check</span></button></div></td></tr><tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer"><td class="py-3.5 px-4"><div class="flex flex-col"><span class="font-medium text-white text-[13px]">Junior Full Stack Developer</span><div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#A1A1AA]"><span class="">Apex Global Tech</span><span class="inline-flex items-center text-[#F87171]" title="Unregistered Company"><span class="material-symbols-outlined text-[14px]">cancel</span></span><span class="text-[#F87171] font-mono text-[10px] bg-[#2E181D] px-1 rounded">Unregistered</span></div></div></td><td class="py-3.5 px-3"><div class="flex flex-col"><span class="text-[#D4D4D8]">hr@apexconsulting-bd.xyz</span><span class="text-[11px] font-mono text-[#F87171]">Free Mail Domain Flag</span></div></td><td class="py-3.5 px-3"><div class="flex flex-col gap-0.5"><span class="text-[#F87171] text-[11px] font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">domain_disabled</span>Unverified Entity</span><span class="text-[10px] text-[#71717A]">Blocked from public feed</span></div></td><td class="py-3.5 px-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#2E181D] border border-[#482026] text-[#F87171]">Publish Blocked</span></td><td class="py-3.5 px-4 text-right"><div class="flex items-center justify-end gap-1.5"><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] flex items-center justify-center hover:text-white" title="Inspect Posting" type="button"><span class="material-symbols-outlined text-[15px]">visibility</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#F87171] flex items-center justify-center hover:bg-[#2E181D]" title="Quick Suspend" type="button"><span class="material-symbols-outlined text-[15px]">block</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#4ADE80] flex items-center justify-center hover:bg-[#13281E]" title="Clear &amp; Approve" type="button"><span class="material-symbols-outlined text-[15px]">check</span></button></div></td></tr><tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer"><td class="py-3.5 px-4"><div class="flex flex-col"><span class="font-medium text-white text-[13px]">Senior Machine Learning Architect</span><div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#A1A1AA]"><span class="">Brain Station 23</span><span class="inline-flex items-center text-[#4ADE80]" title="RJSC Verified Company"><span class="material-symbols-outlined text-[14px]">check_circle</span></span><span class="text-[#71717A] font-mono">• Hatirjheel, Dhaka</span></div></div></td><td class="py-3.5 px-3"><div class="flex flex-col"><span class="text-[#D4D4D8] font-medium">Nabila Zahan</span><span class="text-[11px] font-mono text-[#71717A]">talent@brainstation-23.com</span></div></td><td class="py-3.5 px-3"><div class="flex flex-col gap-0.5"><span class="text-[#F87171] text-[11px] font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">flag</span>Policy Report (2 users)</span><span class="text-[10px] text-[#71717A]">Vague compensation &amp; external fee link</span></div></td><td class="py-3.5 px-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#2E181D] border border-[#482026] text-[#F87171]">Action Required</span></td><td class="py-3.5 px-4 text-right"><div class="flex items-center justify-end gap-1.5"><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] flex items-center justify-center hover:text-white" title="Inspect Posting" type="button"><span class="material-symbols-outlined text-[15px]">visibility</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#F87171] flex items-center justify-center hover:bg-[#2E181D]" title="Quick Suspend" type="button"><span class="material-symbols-outlined text-[15px]">block</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#4ADE80] flex items-center justify-center hover:bg-[#13281E]" title="Clear &amp; Approve" type="button"><span class="material-symbols-outlined text-[15px]">check</span></button></div></td></tr><tr class="hover:bg-[#1A1A1E] transition-colors cursor-pointer"><td class="py-3.5 px-4"><div class="flex flex-col"><span class="font-medium text-white text-[13px]">Backend Software Engineer (Node/Postgres)</span><div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#A1A1AA]"><span class="">Therap (BD) Ltd.</span><span class="inline-flex items-center text-[#4ADE80]" title="RJSC Verified Company"><span class="material-symbols-outlined text-[14px]">check_circle</span></span><span class="text-[#71717A] font-mono">• Banani, Dhaka</span></div></div></td><td class="py-3.5 px-3"><div class="flex flex-col"><span class="text-[#D4D4D8] font-medium">Farhan Ahmed</span><span class="text-[11px] font-mono text-[#71717A]">fahmed@therapbd.com</span></div></td><td class="py-3.5 px-3"><div class="flex flex-col gap-0.5"><span class="text-[#4ADE80] text-[11px] font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">verified</span>Routine Ingestion Check</span><span class="text-[10px] text-[#71717A]">Automated heuristics passed</span></div></td><td class="py-3.5 px-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#13281E] border border-[#1A3D2C] text-[#4ADE80]">Cleared • Active</span></td><td class="py-3.5 px-4 text-right"><div class="flex items-center justify-end gap-1.5"><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#A1A1AA] flex items-center justify-center hover:text-white" title="Inspect Posting" type="button"><span class="material-symbols-outlined text-[15px]">visibility</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#F87171] flex items-center justify-center hover:bg-[#2E181D]" title="Quick Suspend" type="button"><span class="material-symbols-outlined text-[15px]">block</span></button><button class="w-7 h-7 rounded bg-[#161619] border border-[#27272C] text-[#4ADE80] flex items-center justify-center hover:bg-[#13281E]" title="Clear &amp; Approve" type="button"><span class="material-symbols-outlined text-[15px]">check</span></button></div></td></tr></tbody></table></div><div class="p-3 border-t border-[#25252A] bg-[#121215] flex flex-wrap items-center justify-between text-[11px] text-[#71717A] font-mono gap-2"><div class="flex items-center gap-4"><span class="">Rows per page: <strong class="text-white">25</strong></span><span class="">Showing 1-4 of 28 postings</span></div><div class="flex items-center gap-2"><span class="">Page 1 of 2</span><div class="flex items-center gap-1"><button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#52525B] cursor-not-allowed" disabled="" type="button">Previous</button><button class="px-2 py-1 rounded bg-[#161619] border border-[#27272C] text-[#D4D4D8] hover:text-white hover:border-[#3F3F46]" type="button">Next</button></div></div></div></div></section><section class="w-full bg-[#151518] border border-[#25252A] rounded-xl p-5 space-y-5"><div class="border-b border-[#25252A] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3"><div class="flex flex-col"><div class="flex items-center gap-2 mb-1"><span class="text-[11px] font-mono text-[#D4621A] bg-[#2C2114] px-2 py-0.5 rounded border border-[#44301B]">#MOD-JB-9021</span><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#2C2114] border border-[#44301B] text-[#E5933A]">Under Audit</span><span class="text-[11px] text-[#71717A] ml-2">Posted 4 hours ago via Recruiter Workspace</span></div><h2 class="text-white text-[17px] font-bold tracking-tight">Lead Distributed Systems Engineer</h2></div><div class="flex items-center gap-2"><button class="px-3 py-1.5 rounded-lg bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white text-[12px] font-medium transition-colors flex items-center gap-1.5" type="button"><span class="material-symbols-outlined text-[15px]">visibility</span>Preview Posting</button><button class="px-3 py-1.5 rounded-lg bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white text-[12px] font-medium transition-colors flex items-center gap-1.5" type="button"><span class="material-symbols-outlined text-[15px]">history</span>Audit History</button></div></div><div class="flex flex-col gap-6 w-full"><div class="w-full space-y-4"><div class="bg-[#17171B] border border-[#27272C] rounded-lg p-3 space-y-2 text-[12px]"><div class="flex justify-between items-center"><span class="text-[#71717A]">Company</span><span class="text-white font-medium flex items-center gap-1">TigerIT Bangladesh Ltd.<span class="material-symbols-outlined text-[#4ADE80] text-[13px]">verified</span></span></div><div class="flex justify-between items-center"><span class="text-[#71717A]">RJSC Reg No.</span><span class="font-mono text-[#A1A1AA] text-[11px]">C-55201/2004</span></div><div class="flex justify-between items-center"><span class="text-[#71717A]">Recruiter</span><span class="text-white font-medium">Sadia Rahman</span></div><div class="flex justify-between items-center"><span class="text-[#71717A]">Corporate Email</span><span class="font-mono text-[#4ADE80] text-[11px]">sadia@tigerit.com (Matched)</span></div></div><div class="bg-[#121215] border border-[#232328] rounded-lg p-3 text-[11px] text-[#71717A] leading-relaxed"><span class="text-white font-medium block mb-0.5">Algorithm Neutrality Guarantee</span>Moderation decisions do not recalculate candidate ranking indices. Suspending unpublishes the vacancy while preserving applicant submission trails.</div></div><div class="w-full space-y-3"><span class="text-[11px] font-mono uppercase tracking-wider text-[#71717A]">Automated Compliance Checks</span><div class="border border-[#25252A] rounded-lg p-3 bg-[#131316] space-y-1"><div class="flex items-center justify-between"><span class="text-[12px] font-medium text-white flex items-center gap-1.5"><span class="material-symbols-outlined text-[#4ADE80] text-[16px]">check_circle</span>Company Gate Status</span><span class="text-[10px] font-mono text-[#4ADE80] bg-[#13281E] px-1.5 py-0.5 rounded border border-[#1A3D2C]">PASSED</span></div><p class="text-[11px] text-[#71717A]">Enterprise legitimacy cleared against national corporate registry.</p></div><div class="border border-[#44301B] rounded-lg p-3 bg-[#1E1712] space-y-1.5"><div class="flex items-center justify-between"><span class="text-[12px] font-medium text-[#E5933A] flex items-center gap-1.5"><span class="material-symbols-outlined text-[#E5933A] text-[16px]">warning</span>Skill Weights Calibration</span><span class="text-[10px] font-mono text-[#E5933A] bg-[#2C2114] px-1.5 py-0.5 rounded border border-[#44301B]">FLAGGED</span></div><p class="text-[11px] text-[#D4D4D8] leading-tight">Recruiter weights sum to 100% (Go 60%, Kafka 40%), but omits mandatory Assessment verification gate (Spec Section 2).</p><div class="font-mono text-[10px] text-[#A1A1AA] bg-[#151518] p-1.5 rounded border border-[#27272C]">Proofline Err: require_proofline_assessment_node == true</div></div><div class="border border-[#25252A] rounded-lg p-3 bg-[#131316] space-y-1"><div class="flex items-center justify-between"><span class="text-[12px] font-medium text-white flex items-center gap-1.5"><span class="material-symbols-outlined text-[#4ADE80] text-[16px]">check_circle</span>Content &amp; Fee Scan</span><span class="text-[10px] font-mono text-[#4ADE80] bg-[#13281E] px-1.5 py-0.5 rounded border border-[#1A3D2C]">PASSED</span></div><p class="text-[11px] text-[#71717A]">No pay-to-apply claims, external fees, or scam phrasing detected.</p></div></div><div class="w-full space-y-3"><label class="block text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA]" for="audit-justification">Audit Trail Justification <span class="text-[#F87171]">*</span></label><textarea class="w-full bg-[#161619] border border-[#27272C] rounded-lg p-2.5 text-[12px] text-white placeholder-[#52525B] focus:ring-1 focus:ring-[#D4621A] focus:border-[#D4621A] outline-none resize-none font-sans" id="audit-justification" placeholder="Enter justification for moderation decision (required under ISO-27001 audit)..." rows="3"></textarea><div class="grid grid-cols-2 gap-2"><button class="px-3 py-2 rounded-lg bg-[#161619] border border-[#27272C] text-[#D4D4D8] text-[12px] font-medium hover:text-white hover:border-[#3F3F46] transition-colors flex items-center justify-center gap-1.5" type="button"><span class="material-symbols-outlined text-[15px]">edit_note</span>Request Revision</button><button class="px-3 py-2 rounded-lg bg-[#2E181D] border border-[#482026] text-[#F87171] text-[12px] font-medium hover:bg-[#3d1e25] transition-colors flex items-center justify-center gap-1.5" type="button"><span class="material-symbols-outlined text-[15px]">block</span>Suspend Posting</button></div><button class="w-full py-2.5 px-4 rounded-lg bg-[#D4621A] hover:bg-[#BF5313] text-white text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-none" type="button"><span class="material-symbols-outlined text-[16px]">lock</span>Commit Moderation Decision</button></div></div></section></div>
</main>
<!-- ==================== PLATFORM GOVERNANCE FOOTER ==================== -->
<footer class="mt-auto border-t border-[#1C1C20] bg-[#0E0E11] px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#71717A] gap-2">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-[#D4621A]"></span>
<span class="">TalentGraph governance shell • All moderation actions are audited with cryptographic SHA-256 integrity</span>
</div>
<div class="flex items-center gap-4">
<a class="hover:text-[#D4D4D8] transition-colors flex items-center gap-1" href="#">
<span class="material-symbols-outlined text-[14px]">vpn_key</span>
<span class="">Contact platform security</span>
</a>


</div>
</footer>
</div>


</body></html>