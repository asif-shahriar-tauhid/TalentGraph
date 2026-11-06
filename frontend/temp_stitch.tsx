<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>TalentGraph Admin - Worker Telemetry &amp; System Monitoring</title>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;display=swap" rel="stylesheet">
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "on-primary": "#552000",
            "surface-selected-dark": "#252528",
            "on-surface": "#e5e1e4",
            "text-secondary-dark": "#A1A1AA",
            "secondary": "#c7c5d0",
            "on-error-container": "#ffdad6",
            "cta-text": "#18181B",
            "inverse-on-surface": "#313032",
            "primary-container": "#e56f27",
            "surface-container-low": "#1b1b1d",
            "tertiary": "#95ccff",
            "status-error-dark": "#E5484D",
            "on-secondary-fixed": "#1a1b23",
            "on-secondary": "#2f3038",
            "status-error-light": "#DC2626",
            "surface-container-highest": "#353437",
            "secondary-container": "#46464f",
            "on-background": "#e5e1e4",
            "primary": "#ffb691",
            "on-tertiary-fixed": "#001d32",
            "error-container": "#93000a",
            "error": "#ffb4ab",
            "status-warning-dark": "#F59E0B",
            "tertiary-fixed": "#cee5ff",
            "on-primary-fixed-variant": "#793100",
            "border-subtle-dark": "#3F3F46",
            "primary-fixed": "#ffdbcb",
            "surface-canvas-light": "#FFFFFF",
            "on-tertiary-container": "#002c48",
            "status-success-light": "#15803D",
            "surface-alternate-light": "#F8FAFC",
            "on-tertiary-fixed-variant": "#004a75",
            "surface-tint": "#ffb691",
            "status-success-dark": "#22C55E",
            "on-primary-container": "#4b1b00",
            "surface-elevated-dark": "#19191C",
            "surface-bright": "#39393b",
            "text-primary-light": "#18181B",
            "on-tertiary": "#003353",
            "surface-container-lowest": "#0e0e10",
            "surface-container-high": "#2a2a2c",
            "surface-container": "#201f21",
            "on-secondary-container": "#b5b4be",
            "secondary-fixed": "#e3e1ec",
            "surface-dim": "#131315",
            "brand-hover-light": "#B94F0B",
            "primary-fixed-dim": "#ffb691",
            "text-primary-dark": "#F5F5F5",
            "surface-selected-light": "#FFF1E8",
            "secondary-fixed-dim": "#c7c5d0",
            "on-error": "#690005",
            "on-primary-fixed": "#341100",
            "text-secondary-light": "#71717A",
            "surface": "#131315",
            "outline-variant": "#574238",
            "tertiary-container": "#2797e2",
            "inverse-primary": "#9f4200",
            "on-surface-variant": "#dec0b3",
            "brand-hover-dark": "#E47735",
            "outline": "#a68b7f",
            "background": "#131315",
            "surface-elevated-light": "#FFFFFF",
            "tertiary-fixed-dim": "#95ccff",
            "status-warning-light": "#B45309",
            "on-secondary-fixed-variant": "#46464f",
            "inverse-surface": "#e5e1e4",
            "border-subtle-light": "#E4E4E7",
            "surface-variant": "#353437",
            "surface-canvas-dark": "#0D0D0F",
            /* Strict dashboard tokens */
            "admin-bg": "#0E0E11",
            "admin-sidebar": "#121215",
            "admin-sidebar-border": "#222226",
            "admin-card": "#151518",
            "admin-card-border": "#25252A",
            "admin-card-inset": "#17171B",
            "admin-card-inset-border": "#27272C",
            "admin-input": "#161619",
            "admin-input-border": "#27272C",
            "admin-tile": "#1F1F24",
            "admin-tile-border": "#2B2B32",
            "admin-track": "#1C1C20",
            "admin-track-border": "#2C2C32",
            "admin-hover": "#1A1A1E",
            "admin-btn-hover": "#202024",
            "admin-divider": "#222227",
            "admin-footer-divider": "#1C1C20",
            "admin-brand": "#D4621A",
            "admin-brand-hover": "#BF5313",
            "admin-brand-circle": "#E56218",
            "status-succ-text": "#4ADE80",
            "status-succ-bg": "#13281E",
            "status-succ-border": "#1A3D2C",
            "status-warn-text": "#E5933A",
            "status-warn-bg": "#2C2114",
            "status-warn-border": "#44301B",
            "status-dang-text": "#F87171",
            "status-dang-bg": "#2E181D",
            "status-dang-border": "#482026"
          },
          borderRadius: {
            DEFAULT: "0.25rem",
            lg: "0.5rem",
            xl: "0.75rem",
            full: "9999px"
          },
          spacing: {
            "margin": "1rem",
            "space-sm": "0.5rem",
            "space-xs": "0.25rem",
            "gutter-desktop": "1.5rem",
            "space-xl": "2rem",
            "space-md": "1rem",
            "margin-desktop": "2rem",
            "gutter": "1rem",
            "space-lg": "1.5rem"
          },
          fontFamily: {
            "code-provenance": ["Inter", "monospace"],
            "display-lg-mobile": ["Inter"],
            "display-lg": ["Inter"],
            "body-sm": ["Inter"],
            "headline-lg": ["Inter"],
            "title-sm": ["Inter"],
            "label-sm": ["Inter"],
            "headline-lg-mobile": ["Inter"],
            "headline-md": ["Inter"],
            "label-md": ["Inter"],
            "body-md": ["Inter"],
            "body-lg": ["Inter"]
          },
          fontSize: {
            "code-provenance": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
            "display-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "700" }],
            "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
            "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
            "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
            "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
            "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "500" }],
            "headline-lg-mobile": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "label-md": ["13px", { lineHeight: "18px", fontWeight: "500" }],
            "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
            "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }]
          }
        }
      }
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      line-height: 1;
      display: inline-block;
      vertical-align: middle;
    }
    @keyframes subtle-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .pulse-dot {
      animation: subtle-pulse 2.4s ease-in-out infinite;
    }
    /* Technical scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0E0E11;
    }
    ::-webkit-scrollbar-thumb {
      background: #27272C;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #3F3F46;
    }
  </style>
</head>
<body class="bg-[#0E0E11] text-[#D4D4D8] font-body-md text-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-white">
<!-- MASTER SHELL WRAPPER -->
<div class="flex-1 flex w-full">
<!-- 1. PERSISTENT ADMIN SIDEBAR (Strict 256px wide, SCREEN_2 / 4 / 5 identical specs) -->
<aside class="w-[256px] shrink-0 bg-[#121215] border-r border-[#222226] flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
<div class="p-space-md flex flex-col gap-space-md">
<!-- Monogram & Brand Header -->
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-[#E56218] flex items-center justify-center text-white font-bold text-base shrink-0 shadow-sm">
            TG
          </div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1.5">
<span class="text-white text-[14px] font-semibold tracking-tight">TalentGraph</span>
<span class="text-[10px] font-medium tracking-wider bg-[#222227] text-[#A1A1AA] px-1.5 py-0.5 rounded border border-[#2B2B32] uppercase">ADMIN</span>
</div>
<span class="text-[11px] text-[#71717A] tracking-tight">Operational control</span>
</div>
</div>
<!-- Governance Policy Inset Banner -->

<!-- Navigation Cluster -->
<nav class="flex flex-col gap-1 mt-1">
<!-- 1. Operational Queue -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-[#D4D4D8] hover:bg-[#1A1A1E] transition-colors group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[16px] text-[#A1A1AA] group-hover:text-white" data-icon="grid_view">grid_view</span>
<span class="">Operational Queue</span>
</div>
</a>
<!-- 2. Company Verification -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-[#D4D4D8] hover:bg-[#1A1A1E] transition-colors group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[16px] text-[#A1A1AA] group-hover:text-white" data-icon="verified_user">verified_user</span>
<span class="">Company Verification</span>
</div>
<span class="text-[11px] font-mono text-[#71717A] bg-[#17171B] px-1.5 py-0.5 rounded border border-[#27272C]">3</span>
</a>
<!-- 3. User Directory -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-[#D4D4D8] hover:bg-[#1A1A1E] transition-colors group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[16px] text-[#A1A1AA] group-hover:text-white" data-icon="group">group</span>
<span class="">User Directory</span>
</div>
<span class="text-[11px] font-mono text-[#71717A]">1,482</span>
</a>
<!-- 4. Jobs Moderation -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-[#D4D4D8] hover:bg-[#1A1A1E] transition-colors group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[16px] text-[#A1A1AA] group-hover:text-white" data-icon="work">work</span>
<span class="">Jobs Moderation</span>
</div>
<span class="text-[11px] font-mono text-[#71717A]">28</span>
</a>
<!-- 5. Integrity Cases -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-[#D4D4D8] hover:bg-[#1A1A1E] transition-colors group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[16px] text-[#A1A1AA] group-hover:text-white" data-icon="warning">warning</span>
<span class="">Integrity Cases</span>
</div>
<span class="text-[11px] text-[#F87171] font-mono bg-[#2E181D] border border-[#482026] px-1.5 py-0.5 rounded">2 flagged</span>
</a>
<!-- 6. Worker Telemetry (ACTIVE) -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-medium bg-[#D4621A] text-white shadow-sm transition-colors" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[16px] text-white" data-icon="query_stats">query_stats</span>
<span class="">Worker Telemetry</span>
</div>
<span class="text-[11px] font-mono text-white/90">99.8%</span>
</a>
<!-- 7. BDT Subscriptions -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-[#D4D4D8] hover:bg-[#1A1A1E] transition-colors group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[16px] text-[#A1A1AA] group-hover:text-white" data-icon="payments">payments</span>
<span class="">BDT Subscriptions</span>
</div>
<span class="text-[11px] font-mono text-[#71717A]">৳34.5k</span>
</a>
</nav>
</div>
<!-- Bottom Admin User Identity Section -->
<div class="p-space-md border-t border-[#232328]">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-8 h-8 rounded-full bg-[#27272B] border border-[#3A3A40] flex items-center justify-center text-xs font-semibold text-white shrink-0">
              TC
            </div>
<div class="flex flex-col min-w-0">
<span class="text-[13px] font-semibold text-white truncate">Tanvir Chowdhury</span>
<span class="text-[10px] text-[#71717A] tracking-tight">Platform Admin #01</span>
</div>
</div>
<button class="w-7 h-7 rounded-[6px] hover:bg-[#1A1A1E] text-[#71717A] hover:text-white flex items-center justify-center transition-colors" title="Sign out session">
<span class="material-symbols-outlined text-[16px]" data-icon="logout">logout</span>
</button>
</div>
</div>
</aside>
<!-- 2. MAIN OPERATIONAL CANVAS (Dense, high-clarity 12-column grid system) -->
<main class="flex-1 flex flex-col min-w-0 bg-[#0E0E11] px-gutter-desktop py-space-md overflow-x-hidden">
<!-- PAGE HEADER -->
<div class="flex flex-col md:flex-row md:items-center justify-between pb-space-md border-b border-[#222227] gap-space-sm mb-space-md">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
<span class="">ADMIN</span>
<span class="">/</span>
<span class="text-[#D4621A] font-semibold">WORKER TELEMETRY</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
</div>
<h1 class="text-headline-lg font-headline-lg text-white tracking-tight">Worker Telemetry &amp; Background Ingestion</h1>

</div>
<!-- Right Quick Action Cluster -->
<div class="flex items-center gap-2">
<!-- 32px square buttons as specified -->
<button class="w-8 h-8 rounded-[8px] bg-[#161619] border border-[#27272C] hover:bg-[#202024] hover:border-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all" title="Search Telemetry Buffer">
<span class="material-symbols-outlined text-[16px]" data-icon="search">search</span>
</button>
<button class="w-8 h-8 rounded-[8px] bg-[#161619] border border-[#27272C] hover:bg-[#202024] hover:border-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all" title="Export Ingestion Metrics (.jsonl)">
<span class="material-symbols-outlined text-[16px]" data-icon="download">download</span>
</button>
<button class="w-8 h-8 rounded-[8px] bg-[#161619] border border-[#27272C] hover:bg-[#202024] hover:border-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all" title="Toggle Surface Luminescence">
<span class="material-symbols-outlined text-[16px]" data-icon="dark_mode">dark_mode</span>
</button>
</div>
</div>
<!-- 4-COLUMN KPI ROW -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-md">
<!-- KPI 1: Active BullMQ Workers -->
<div class="bg-[#151518] border border-[#25252A] rounded-[12px] p-space-md flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-body-sm text-[#A1A1AA] font-medium">Active BullMQ Workers</span>
<div class="w-7 h-7 rounded-[8px] bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#D4621A]">
<span class="material-symbols-outlined text-[16px]" data-icon="memory">memory</span>
</div>
</div>
<div class="my-2 flex items-baseline gap-2">
<span class="text-[28px] font-bold text-white tracking-tight leading-none font-headline-lg">18</span>
<span class="text-[11px] font-medium px-2 py-0.5 rounded-[4px] bg-[#13281E] border border-[#1A3D2C] text-[#4ADE80]">Healthy</span>
</div>
<div class="text-[11px] text-[#71717A] flex items-center gap-1 font-mono">
<span class="">Across 4 worker clusters</span>
</div>
</div>
<!-- KPI 2: Task Ingestion Throughput -->
<div class="bg-[#151518] border border-[#25252A] rounded-[12px] p-space-md flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-body-sm text-[#A1A1AA] font-medium">Task Ingestion Throughput</span>
<div class="w-7 h-7 rounded-[8px] bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#D4621A]">
<span class="material-symbols-outlined text-[16px]" data-icon="speed">speed</span>
</div>
</div>
<div class="my-2 flex items-baseline gap-2">
<span class="text-[28px] font-bold text-white tracking-tight leading-none font-headline-lg">1,248<span class="text-[18px] text-[#A1A1AA] font-normal">/m</span></span>
<span class="text-[11px] font-medium px-2 py-0.5 rounded-[4px] bg-[#2A2A2E] text-[#B3B3B3]">+14.2% Peak</span>
</div>
<div class="text-[11px] text-[#71717A] truncate font-mono">
            GitHub sync, CV parser, AST
          </div>
</div>
<!-- KPI 3: Median Job Latency (P50) -->
<div class="bg-[#151518] border border-[#25252A] rounded-[12px] p-space-md flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-body-sm text-[#A1A1AA] font-medium">Median Job Latency (P50)</span>
<div class="w-7 h-7 rounded-[8px] bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#D4621A]">
<span class="material-symbols-outlined text-[16px]" data-icon="timer">timer</span>
</div>
</div>
<div class="my-2 flex items-baseline gap-2">
<span class="text-[28px] font-bold text-white tracking-tight leading-none font-headline-lg">420<span class="text-[16px] text-[#A1A1AA] font-normal">ms</span></span>
<span class="text-[11px] font-medium px-2 py-0.5 rounded-[4px] bg-[#13281E] border border-[#1A3D2C] text-[#4ADE80]">Within SLA</span>
</div>
<div class="text-[11px] text-[#71717A] font-mono">
            P95 at 840ms • P99 at 1.4s
          </div>
</div>
<!-- KPI 4: Dead-Letter / Retriable Queue -->
<div class="bg-[#151518] border border-[#25252A] rounded-[12px] p-space-md flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-body-sm text-[#A1A1AA] font-medium">Dead-Letter / Retriable Queue</span>
<div class="w-7 h-7 rounded-[8px] bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-[#E5933A]">
<span class="material-symbols-outlined text-[16px]" data-icon="sync_problem">sync_problem</span>
</div>
</div>
<div class="my-2 flex items-baseline gap-2">
<span class="text-[28px] font-bold text-white tracking-tight leading-none font-headline-lg">1</span>
<span class="text-[11px] font-medium px-2 py-0.5 rounded-[4px] bg-[#2C2114] border border-[#44301B] text-[#E5933A]">1 Retriable</span>
</div>
<div class="text-[11px] text-[#71717A] font-mono">
            Idempotent backoff (Asia/Dhaka)
          </div>
</div>
</section>
<!-- 5. FULL-WIDTH WORKER QUEUE & INGESTION STATUS TABLE -->
<section class="bg-[#151518] border border-[#25252A] rounded-[12px] flex flex-col mb-space-md overflow-hidden">
<!-- Table Control Header with Segmented Filter Tabs -->
<div class="p-space-md border-b border-[#222227] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
<div class="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
<button class="px-3 py-1.5 text-[12px] font-medium rounded-[8px] bg-[#D4621A] text-white whitespace-nowrap shadow-sm">
              All Queues (6)
            </button>
<button class="px-3 py-1.5 text-[12px] font-medium rounded-[8px] bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:bg-[#202024] whitespace-nowrap transition-colors">
              AST Code Analysis (2)
            </button>
<button class="px-3 py-1.5 text-[12px] font-medium rounded-[8px] bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:bg-[#202024] whitespace-nowrap transition-colors">
              CV Parsing &amp; OCR (1)
            </button>
<button class="px-3 py-1.5 text-[12px] font-medium rounded-[8px] bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:bg-[#202024] whitespace-nowrap transition-colors">
              GitHub Sync Daemon (1)
            </button>
<button class="px-3 py-1.5 text-[12px] font-medium rounded-[8px] bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:bg-[#202024] whitespace-nowrap transition-colors">
              Assessment Telemetry (1)
            </button>
<button class="px-3 py-1.5 text-[12px] font-medium rounded-[8px] bg-[#161619] border border-[#27272C] text-[#A1A1AA] hover:text-white hover:bg-[#202024] whitespace-nowrap transition-colors">
              Dead-Letter Queue (1)
            </button>
</div>
<!-- Secondary Filter & Auto-refresh indicator -->
<div class="flex items-center gap-3 text-xs text-[#71717A] self-end lg:self-auto">
<span class="flex items-center gap-1 font-mono">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
              Live socket: 250ms polling
            </span>
<div class="h-3 w-[1px] bg-[#222227]"></div>
<button class="text-[#D4621A] hover:text-brand-hover-dark flex items-center gap-1 text-[12px] font-medium">
<span class="material-symbols-outlined text-[14px]" data-icon="refresh">refresh</span>
              Sync redis cluster
            </button>
</div>
</div>
<!-- Structured Data Table -->
<div class="w-full overflow-x-auto">
<table class="w-full text-left text-[13px] border-collapse">
<thead>
<tr class="border-b border-[#222227] text-[#71717A] text-[11px] font-medium tracking-wider uppercase font-mono bg-[#121215]/50">
<th class="py-3 px-space-md">QUEUE NAME &amp; CLUSTER</th>
<th class="py-3 px-4">JOB TYPE &amp; PIPELINE</th>
<th class="py-3 px-4">ACTIVE / CONCURRENCY</th>
<th class="py-3 px-4">LATENCY / P95</th>
<th class="py-3 px-4">RECOVERY / RETRIES</th>
<th class="py-3 px-4">HEALTH &amp; STATUS</th>
<th class="py-3 px-space-md text-right">ACTIONS</th>
</tr>
</thead>
<tbody class="divide-y divide-[#222227] font-body-md">
<!-- Row 1: Selected / Highlighted Active AST Queue -->
<tr class="bg-[#1A1A1E] hover:bg-[#202024] transition-colors border-l-2 border-l-[#D4621A]">
<td class="py-3.5 px-space-md">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#D4621A] text-[18px]" data-icon="terminal">terminal</span>
<div class="flex flex-col">
<span class="text-white font-mono text-[12px] font-semibold">ast-syntax-analyzer-v2</span>
<span class="text-[#71717A] text-[11px] font-mono">Cluster: worker-bd-01 (Isolated AST sandbox)</span>
</div>
</div>
</td>
<td class="py-3.5 px-4 text-[#D4D4D8]">
<div class="flex flex-col">
<span class="font-medium text-white">AST Tree Extraction</span>
<span class="text-[11px] text-[#A1A1AA]">TypeScript, Go, Python Parser</span>
</div>
</td>
<td class="py-3.5 px-4 font-mono text-[#D4D4D8]">
<span class="text-white font-semibold">8 Active</span> <span class="text-[#71717A]">/ 16 Concurrency</span>
</td>
<td class="py-3.5 px-4 font-mono text-white">
                  380ms <span class="text-[#71717A] text-[11px]">(P95: 790ms)</span>
</td>
<td class="py-3.5 px-4 font-mono text-[#4ADE80]">
                  0 Retries <span class="text-[#71717A] text-[11px]">(0 Drops)</span>
</td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#13281E] border border-[#1A3D2C] text-[#4ADE80] text-[11px] font-mono font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span> Operational
                  </span>
</td>
<td class="py-3.5 px-space-md text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2.5 py-1 text-[11px] font-medium rounded-[6px] bg-[#D4621A] text-white hover:bg-brand-hover-dark transition-colors">
                      Inspect
                    </button>
<button class="w-6 h-6 rounded flex items-center justify-center text-[#71717A] hover:text-white" title="Pause worker">
<span class="material-symbols-outlined text-[15px]" data-icon="pause">pause</span>
</button>
</div>
</td>
</tr>
<!-- Row 2: CV PDF Structured OCR -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-space-md">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#A1A1AA] text-[18px]" data-icon="document_scanner">document_scanner</span>
<div class="flex flex-col">
<span class="text-white font-mono text-[12px]">cv-pdf-structured-ocr</span>
<span class="text-[#71717A] text-[11px] font-mono">Cluster: worker-bd-02 (Tesseract v5 node)</span>
</div>
</div>
</td>
<td class="py-3.5 px-4 text-[#D4D4D8]">
<div class="flex flex-col">
<span class="font-medium text-white">Semantic Entity Normalization</span>
<span class="text-[11px] text-[#A1A1AA]">Line-by-line citation mapper</span>
</div>
</td>
<td class="py-3.5 px-4 font-mono text-[#D4D4D8]">
<span class="text-white font-semibold">4 Active</span> <span class="text-[#71717A]">/ 8 Concurrency</span>
</td>
<td class="py-3.5 px-4 font-mono text-white">
                  1.2s <span class="text-[#71717A] text-[11px]">(P95: 2.1s)</span>
</td>
<td class="py-3.5 px-4 font-mono text-[#4ADE80]">
                  0 Retries <span class="text-[#71717A] text-[11px]">(0 Drops)</span>
</td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#13281E] border border-[#1A3D2C] text-[#4ADE80] text-[11px] font-mono font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span> Healthy
                  </span>
</td>
<td class="py-3.5 px-space-md text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2.5 py-1 text-[11px] font-medium rounded-[6px] bg-[#161619] border border-[#27272C] text-[#D4D4D8] hover:text-white hover:bg-[#202024] transition-colors">
                      Inspect
                    </button>
<button class="w-6 h-6 rounded flex items-center justify-center text-[#71717A] hover:text-white" title="Worker options">
<span class="material-symbols-outlined text-[15px]" data-icon="more_horiz">more_horiz</span>
</button>
</div>
</td>
</tr>
<!-- Row 3: GitHub Repo Sync Quota -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-space-md">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#A1A1AA] text-[18px]" data-icon="sync">sync</span>
<div class="flex flex-col">
<span class="text-white font-mono text-[12px]">github-repo-sync-quota</span>
<span class="text-[#71717A] text-[11px] font-mono">Cluster: worker-bd-01 (GraphQL App Auth)</span>
</div>
</div>
</td>
<td class="py-3.5 px-4 text-[#D4D4D8]">
<div class="flex flex-col">
<span class="font-medium text-white">Incremental Git Tree Delta</span>
<span class="text-[11px] text-[#A1A1AA]">SHA-256 commit tree verification</span>
</div>
</td>
<td class="py-3.5 px-4 font-mono text-[#D4D4D8]">
<span class="text-white font-semibold">3 Active</span> <span class="text-[#71717A]">/ 10 Concurrency</span>
</td>
<td class="py-3.5 px-4 font-mono text-white">
                  640ms <span class="text-[#71717A] text-[11px]">(P95: 1.1s)</span>
</td>
<td class="py-3.5 px-4 font-mono text-[#E5933A]">
                  1 Safe Retry <span class="text-[#71717A] text-[11px]">(Backoff 30s)</span>
</td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#2C2114] border border-[#44301B] text-[#E5933A] text-[11px] font-mono font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#E5933A]"></span> Retrying
                  </span>
</td>
<td class="py-3.5 px-space-md text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2.5 py-1 text-[11px] font-medium rounded-[6px] bg-[#161619] border border-[#27272C] text-[#D4D4D8] hover:text-white hover:bg-[#202024] transition-colors">
                      Inspect
                    </button>
<button class="w-6 h-6 rounded flex items-center justify-center text-[#71717A] hover:text-white" title="Worker options">
<span class="material-symbols-outlined text-[15px]" data-icon="more_horiz">more_horiz</span>
</button>
</div>
</td>
</tr>
<!-- Row 4: Assessment Telemetry -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-space-md">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#A1A1AA] text-[18px]" data-icon="network_check">network_check</span>
<div class="flex flex-col">
<span class="text-white font-mono text-[12px]">bullmq-assessment-telemetry</span>
<span class="text-[#71717A] text-[11px] font-mono">Cluster: worker-bd-03 (High-throughput socket)</span>
</div>
</div>
</td>
<td class="py-3.5 px-4 text-[#D4D4D8]">
<div class="flex flex-col">
<span class="font-medium text-white">5-Snapshot Telemetry Packets</span>
<span class="text-[11px] text-[#A1A1AA]">Browser focus loss &amp; paste detection</span>
</div>
</td>
<td class="py-3.5 px-4 font-mono text-[#D4D4D8]">
<span class="text-white font-semibold">2 Active</span> <span class="text-[#71717A]">/ 32 Concurrency</span>
</td>
<td class="py-3.5 px-4 font-mono text-white">
                  95ms <span class="text-[#71717A] text-[11px]">(P95: 140ms)</span>
</td>
<td class="py-3.5 px-4 font-mono text-[#4ADE80]">
                  0 Retries <span class="text-[#71717A] text-[11px]">(0 Drops)</span>
</td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#13281E] border border-[#1A3D2C] text-[#4ADE80] text-[11px] font-mono font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span> Operational
                  </span>
</td>
<td class="py-3.5 px-space-md text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2.5 py-1 text-[11px] font-medium rounded-[6px] bg-[#161619] border border-[#27272C] text-[#D4D4D8] hover:text-white hover:bg-[#202024] transition-colors">
                      Inspect
                    </button>
<button class="w-6 h-6 rounded flex items-center justify-center text-[#71717A] hover:text-white" title="Worker options">
<span class="material-symbols-outlined text-[15px]" data-icon="more_horiz">more_horiz</span>
</button>
</div>
</td>
</tr>
<!-- Row 5: Dead-Letter Queue (DLQ) -->
<tr class="hover:bg-[#1A1A1E] transition-colors">
<td class="py-3.5 px-space-md">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[#F87171] text-[18px]" data-icon="report">report</span>
<div class="flex flex-col">
<span class="text-white font-mono text-[12px]">dead-letter-dlq-retries</span>
<span class="text-[#71717A] text-[11px] font-mono">Cluster: worker-bd-04 (Isolation quarantine)</span>
</div>
</div>
</td>
<td class="py-3.5 px-4 text-[#D4D4D8]">
<div class="flex flex-col">
<span class="font-medium text-white">Failed Webhook Relay</span>
<span class="text-[11px] text-[#A1A1AA]">bKash Merchant IPN 504 Timeout</span>
</div>
</td>
<td class="py-3.5 px-4 font-mono text-[#D4D4D8]">
<span class="text-white font-semibold">1 Active</span> <span class="text-[#71717A]">/ 4 Concurrency</span>
</td>
<td class="py-3.5 px-4 font-mono text-white">
                  2.4s <span class="text-[#71717A] text-[11px]">(P95: 5.0s)</span>
</td>
<td class="py-3.5 px-4 font-mono text-[#F87171]">
                  Max 3 (Attempt #2)
                </td>
<td class="py-3.5 px-4">
<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#2E181D] border border-[#482026] text-[#F87171] text-[11px] font-mono font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-[#F87171]"></span> DLQ Alert
                  </span>
</td>
<td class="py-3.5 px-space-md text-right">
<div class="inline-flex items-center gap-1">
<button class="px-2.5 py-1 text-[11px] font-medium rounded-[6px] bg-[#161619] border border-[#27272C] text-[#F87171] hover:bg-[#2E181D] transition-colors">
                      DLQ Inspect
                    </button>
<button class="w-6 h-6 rounded flex items-center justify-center text-[#71717A] hover:text-white" title="Worker options">
<span class="material-symbols-outlined text-[15px]" data-icon="more_horiz">more_horiz</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Pagination & Footer Micro-status -->
<div class="py-2.5 px-space-md border-t border-[#222227] bg-[#121215]/30 flex items-center justify-between text-[11px] text-[#71717A] font-mono">
<span class="">Showing 5 of 5 configured BullMQ ingestion queues</span>
<div class="flex items-center gap-2">
<span class="">Shard: Asia-Dhaka-Primary</span>
<div class="h-2.5 w-[1px] bg-[#27272C]"></div>
<span class="text-[#4ADE80]">Telemetry sync nominal</span>
</div>
</div>
</section>
<!-- 6. FULL-WIDTH LIVE WORKER CONTEXT & AUDIT DOCK (Directly below table, 3-column dock layout) -->
<section class="grid grid-cols-1 lg:grid-cols-3 gap-space-md mb-space-md">
<!-- Column 1: Selected Queue Dossier & Engine Specs -->
<div class="bg-[#151518] border border-[#25252A] rounded-[12px] p-space-md flex flex-col justify-between">
<div class="flex flex-col gap-3">
<div class="flex items-center justify-between border-b border-[#222227] pb-2.5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[#D4621A] text-[18px]" data-icon="data_object">data_object</span>
<h3 class="text-title-sm font-title-sm text-white">Target Queue Dossier</h3>
</div>
<span class="text-[11px] font-mono text-[#4ADE80] bg-[#13281E] border border-[#1A3D2C] px-1.5 py-0.5 rounded">Active Focus</span>
</div>
<!-- Specs list -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between text-[12px]">
<span class="text-[#71717A]">Queue Ref</span>
<span class="font-mono text-white text-[11px] bg-[#17171B] border border-[#27272C] px-1.5 py-0.5 rounded">#Q-AST-8841: ast-syntax-analyzer-v2</span>
</div>
<div class="flex items-center justify-between text-[12px]">
<span class="text-[#71717A]">Execution Stack</span>
<span class="font-mono text-[#D4D4D8] text-[11px]">Node.js v20 LTS • BullMQ v5.8 • Redis 7.2</span>
</div>
<div class="flex items-center justify-between text-[12px]">
<span class="text-[#71717A]">Memory Footprint</span>
<span class="font-mono text-[#4ADE80] text-[11px]">412 MB / 1024 MB (40.2%)</span>
</div>
</div>
<!-- Ingestion Rule Guarantee Inset Callout -->
<div class="bg-[#17171B] border border-[#27272C] rounded-[8px] p-2.5 mt-1">
<div class="flex items-center gap-1.5 text-[11px] font-semibold text-[#D4621A] mb-1">
<span class="material-symbols-outlined text-[14px]" data-icon="security">security</span>
<span class="">Ingestion Rule Guarantee (Section 11 &amp; 14)</span>
</div>
<p class="text-[11px] text-[#A1A1AA] leading-relaxed">
                Least-Privilege AST analysis. Raw repository code is strictly forbidden from running in worker memory; isolated syntax-tree extraction only with SHA-256 fingerprinting.
              </p>
</div>
</div>
<!-- Proofline Provenance Stem Indicator -->
<div class="pt-3 border-t border-[#222227] flex items-center justify-between text-[11px] font-mono text-[#71717A] mt-3">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[13px] text-[#D4621A]" data-icon="verified">verified</span>
              Citations Verified
            </span>
<span class="">Policy Spec v1.3</span>
</div>
</div>
<!-- Column 2: Real-Time Performance & Queue Telemetry -->
<div class="bg-[#151518] border border-[#25252A] rounded-[12px] p-space-md flex flex-col justify-between">
<div>
<div class="flex items-center justify-between border-b border-[#222227] pb-2.5 mb-3">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[#D4621A] text-[18px]" data-icon="insights">insights</span>
<h3 class="text-title-sm font-title-sm text-white">Live Telemetry &amp; Spikes</h3>
</div>
<span class="text-[11px] font-mono text-[#71717A]">Last 6 Hours</span>
</div>
<!-- Mini bar chart representing hourly throughput spikes -->
<div class="bg-[#121215] border border-[#25252A] rounded-[8px] p-3 mb-3 flex flex-col justify-end"><div class="flex items-end justify-between h-20 gap-2 border-b border-[#222227] pb-1.5"><div class="flex flex-col items-center flex-1 h-full justify-end group"><div class="w-5 bg-[#D4621A]/70 hover:bg-[#D4621A] transition-colors rounded-t-[2px]" style="height: 36px;"></div></div><div class="flex flex-col items-center flex-1 h-full justify-end group"><div class="w-5 bg-[#D4621A]/70 hover:bg-[#D4621A] transition-colors rounded-t-[2px]" style="height: 52px;"></div></div><div class="flex flex-col items-center flex-1 h-full justify-end group"><div class="w-5 bg-[#E56218] hover:bg-brand-hover-dark transition-colors rounded-t-[2px] shadow-sm" style="height: 72px;"></div></div><div class="flex flex-col items-center flex-1 h-full justify-end group"><div class="w-5 bg-[#D4621A]/85 hover:bg-[#D4621A] transition-colors rounded-t-[2px]" style="height: 48px;"></div></div><div class="flex flex-col items-center flex-1 h-full justify-end group"><div class="w-5 bg-[#D4621A]/60 hover:bg-[#D4621A] transition-colors rounded-t-[2px]" style="height: 32px;"></div></div><div class="flex flex-col items-center flex-1 h-full justify-end group"><div class="w-5 bg-[#D4621A] hover:bg-brand-hover-dark transition-colors rounded-t-[2px]" style="height: 60px;"></div></div></div><div class="flex items-center justify-between gap-2 pt-1.5 text-[10px] font-mono"><div class="flex-1 text-center text-[#71717A]">10:00</div><div class="flex-1 text-center text-[#71717A]">11:00</div><div class="flex-1 text-center text-[#D4621A] font-semibold">12:00</div><div class="flex-1 text-center text-[#71717A]">13:00</div><div class="flex-1 text-center text-[#71717A]">14:00</div><div class="flex-1 text-center text-[#71717A]">Now</div></div></div>
<!-- Metric Trio -->
<div class="grid grid-cols-3 gap-2 py-2 border-y border-[#222227] text-center mb-3">
<div>
<span class="text-[10px] text-[#71717A] uppercase font-mono block">Active Jobs</span>
<span class="text-[16px] font-bold text-white font-mono">18</span>
</div>
<div>
<span class="text-[10px] text-[#71717A] uppercase font-mono block">Median Latency</span>
<span class="text-[16px] font-bold text-white font-mono">420ms</span>
</div>
<div>
<span class="text-[10px] text-[#71717A] uppercase font-mono block">Retriable</span>
<span class="text-[16px] font-bold text-[#E5933A] font-mono">1 Job</span>
</div>
</div>
<!-- Worker Event Log snippet -->
<div class="font-mono text-[10.5px] bg-[#121215] border border-[#25252A] rounded-[6px] p-2 flex flex-col gap-1 text-[#A1A1AA] overflow-hidden">
<div class="truncate text-[#4ADE80]">
                &gt; [BullMQ:job_completed] AST #9914 in 384ms
              </div>
<div class="truncate text-[#D4D4D8]">
                &gt; [BullMQ:quota_check] GitHub sync candidate #4912 within limit
              </div>
</div>
</div>
</div>
<!-- Column 3: Forensic Queue Operations & Manual Retry Trigger -->
<div class="bg-[#151518] border border-[#25252A] rounded-[12px] p-space-md flex flex-col justify-between">
<div class="flex flex-col gap-2.5">
<div class="flex items-center justify-between border-b border-[#222227] pb-2.5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[#D4621A] text-[18px]" data-icon="admin_panel_settings">admin_panel_settings</span>
<h3 class="text-title-sm font-title-sm text-white">Forensic Operations &amp; Retry</h3>
</div>
<span class="text-[11px] font-mono text-[#A1A1AA]">ISO-27001 Audited</span>
</div>
<!-- Mandatory Audit Justification textarea -->
<div class="flex flex-col gap-1">
<label class="text-[11px] font-medium text-[#D4D4D8] flex items-center justify-between">
<span class="">Audit Justification Note</span>
<span class="text-[#71717A] text-[10px]">Required for execution</span>
</label>
<textarea class="w-full bg-[#161619] border border-[#27272C] focus:border-[#D4621A] focus:ring-1 focus:ring-[#D4621A] rounded-[8px] text-[12px] text-white placeholder-[#71717A] p-2.5 outline-none resize-none font-body-sm transition-all" placeholder="Enter justification for worker queue pause, rate-limit adjustment, or manual DLQ retry (required under ISO-27001 audit)..." rows="3"></textarea>
</div>
<!-- Secondary Actions -->
<div class="grid grid-cols-2 gap-2 mt-1">
<button class="px-3 py-2 text-[12px] font-medium rounded-[8px] bg-[#161619] border border-[#27272C] text-[#D4D4D8] hover:text-white hover:bg-[#202024] flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[14px]" data-icon="pause_circle">pause_circle</span>
                Pause Queue
              </button>
<button class="px-3 py-2 text-[12px] font-medium rounded-[8px] bg-[#161619] border border-[#27272C] text-[#D4D4D8] hover:text-white hover:bg-[#202024] flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[14px]" data-icon="cleaning_services">cleaning_services</span>
                Flush DLQ Cache
              </button>
</div>
</div>
<!-- Solid Primary Button: Commit Telemetry Action -->
<div class="pt-3 border-t border-[#222227] mt-3">
<button class="w-full py-2.5 px-3 rounded-[8px] bg-[#D4621A] hover:bg-brand-hover-dark text-white font-medium text-[13px] flex items-center justify-center gap-2 shadow-sm transition-colors">
<span class="material-symbols-outlined text-[16px]" data-icon="replay">replay</span>
              Commit Telemetry Action &amp; Retry Safe Job
            </button>
</div>
</div>
</section>
<!-- 7. FOOTER (Strict Design Spec Tokens) -->
<footer class="mt-auto pt-3 border-t border-[#1C1C20] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#71717A] gap-2 select-none">
<div class="flex items-center gap-2">
<span class="">• TalentGraph governance shell • All worker telemetry actions are audited with cryptographic SHA-256 integrity</span>
</div>
<div class="flex items-center gap-2">
<span class="">Need cluster diagnostic support? Contact platform DevOps</span>
<span class="material-symbols-outlined text-[14px] text-[#A1A1AA]" data-icon="vpn_key">vpn_key</span>
</div>
</footer>
</main>
</div>


</body></html>