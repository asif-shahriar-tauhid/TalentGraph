<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Company Verification Queue | TalentGraph Admin</title>
<!-- Material Symbols Outlined font -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Inter font -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "surface-elevated-dark": "#19191C",
            "surface-variant": "#353437",
            "brand-hover-light": "#B94F0B",
            "primary-container": "#e56f27",
            "inverse-on-surface": "#313032",
            "surface-container": "#201f21",
            "text-secondary-dark": "#A1A1AA",
            "tertiary-container": "#2797e2",
            "error-container": "#93000a",
            "on-primary": "#552000",
            "on-tertiary-fixed": "#001d32",
            "tertiary-fixed-dim": "#95ccff",
            "brand-hover-dark": "#E47735",
            "surface": "#131315",
            "on-surface": "#e5e1e4",
            "background": "#131315",
            "surface-canvas-dark": "#0D0D0F",
            "surface-elevated-light": "#FFFFFF",
            "inverse-primary": "#9f4200",
            "secondary": "#c7c5d0",
            "surface-container-highest": "#353437",
            "primary-fixed-dim": "#ffb691",
            "on-error": "#690005",
            "tertiary": "#95ccff",
            "outline-variant": "#574238",
            "status-error-dark": "#E5484D",
            "secondary-container": "#46464f",
            "on-tertiary-fixed-variant": "#004a75",
            "error": "#ffb4ab",
            "status-success-light": "#15803D",
            "inverse-surface": "#e5e1e4",
            "status-warning-dark": "#F59E0B",
            "border-subtle-dark": "#3F3F46",
            "text-secondary-light": "#71717A",
            "surface-container-low": "#1b1b1d",
            "on-error-container": "#ffdad6",
            "border-subtle-light": "#E4E4E7",
            "status-warning-light": "#B45309",
            "surface-tint": "#ffb691",
            "status-error-light": "#DC2626",
            "on-tertiary-container": "#002c48",
            "surface-bright": "#39393b",
            "surface-selected-dark": "#252528",
            "surface-dim": "#131315",
            "secondary-fixed": "#e3e1ec",
            "on-tertiary": "#003353",
            "on-secondary-fixed": "#1a1b23",
            "on-primary-container": "#4b1b00",
            "on-surface-variant": "#dec0b3",
            "primary-fixed": "#ffdbcb",
            "status-success-dark": "#22C55E",
            "surface-canvas-light": "#FFFFFF",
            "outline": "#a68b7f",
            "cta-text": "#18181B",
            "tertiary-fixed": "#cee5ff",
            "text-primary-light": "#18181B",
            "primary": "#ffb691",
            "surface-alternate-light": "#F8FAFC",
            "text-primary-dark": "#F5F5F5",
            "on-secondary-fixed-variant": "#46464f",
            "surface-container-high": "#2a2a2c",
            "on-secondary": "#2f3038",
            "on-primary-fixed": "#341100",
            "secondary-fixed-dim": "#c7c5d0",
            "on-background": "#e5e1e4",
            "surface-container-lowest": "#0e0e10",
            "on-secondary-container": "#b5b4be",
            "on-primary-fixed-variant": "#793100",
            "surface-selected-light": "#FFF1E8",
            /* Direct Admin Spec Color Extensions */
            "admin-bg": "#0E0E11",
            "admin-sidebar": "#121215",
            "admin-sidebar-border": "#222226",
            "admin-card": "#151518",
            "admin-card-border": "#25252A",
            "admin-inset": "#17171B",
            "admin-inset-border": "#27272C",
            "admin-input": "#161619",
            "admin-icon-tile": "#1F1F24",
            "admin-icon-border": "#2B2B32",
            "admin-hover": "#1A1A1E",
            "admin-hover-btn": "#202024",
            "admin-primary": "#D4621A",
            "admin-primary-hover": "#BF5313",
            "admin-logo": "#E56218",
            "admin-divider": "#222227",
            "admin-divider-footer": "#1C1C20",
            "admin-divider-sb": "#232328",
            "admin-badge-neutral-bg": "#2A2A2E",
            "admin-badge-neutral-text": "#B3B3B3",
            "admin-status-succ-bg": "#13281E",
            "admin-status-succ-border": "#1A3D2C",
            "admin-status-succ-text": "#4ADE80",
            "admin-status-warn-bg": "#2C2114",
            "admin-status-warn-border": "#44301B",
            "admin-status-warn-text": "#E5933A",
            "admin-status-dang-bg": "#2E181D",
            "admin-status-dang-border": "#482026",
            "admin-status-dang-text": "#F87171",
            "admin-text-body": "#D4D4D8",
            "admin-text-secondary": "#A1A1AA",
            "admin-text-muted": "#71717A",
            "admin-text-disabled": "#52525B"
          },
          fontFamily: {
            "sans": ["Inter", "sans-serif"],
            "mono": ["JetBrains Mono", "monospace"],
            "headline-md": ["Inter"],
            "title-sm": ["Inter"],
            "body-lg": ["Inter"],
            "headline-lg": ["Inter"],
            "display-lg": ["Inter"],
            "code-provenance": ["Inter"],
            "label-sm": ["Inter"],
            "display-lg-mobile": ["Inter"],
            "body-sm": ["Inter"],
            "label-md": ["Inter"],
            "headline-lg-mobile": ["Inter"],
            "body-md": ["Inter"]
          },
          fontSize: {
            "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
            "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
            "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
            "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
            "code-provenance": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
            "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "500" }],
            "display-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "700" }],
            "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
            "label-md": ["13px", { lineHeight: "18px", fontWeight: "500" }],
            "headline-lg-mobile": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }]
          }
        }
      }
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      vertical-align: middle;
      display: inline-block;
      line-height: 1;
    }
    /* Technical Proofline Stem rules */
    .proofline-stem-vertical {
      position: relative;
    }
    .proofline-stem-vertical::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 28px;
      bottom: -12px;
      width: 1.5px;
      background-color: #27272C;
    }
    .proofline-stem-vertical:last-child::before {
      display: none;
    }
  </style>
</head>
<body class="bg-admin-bg text-admin-text-body font-sans antialiased min-h-screen flex selection:bg-admin-primary selection:text-white">
<!-- ADMIN SIDEBAR (256px Fixed) -->
<aside class="w-[256px] min-w-[256px] bg-admin-sidebar border-r border-admin-sidebar-border h-screen sticky top-0 flex flex-col justify-between z-40 select-none">
<div class="flex flex-col">
<!-- Sidebar Top: Brand & Monogram -->
<div class="px-4 py-4 flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-admin-logo flex items-center justify-center text-white font-bold text-sm tracking-tight flex-shrink-0">
          TG
        </div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1.5">
<span class="text-white text-[14px] font-semibold tracking-tight truncate">TalentGraph</span>
<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-admin-badge-neutral-bg text-admin-badge-neutral-text font-medium leading-none">ADMIN</span>
</div>
<span class="text-admin-text-muted text-[11px] leading-tight">Operational control</span>
</div>
</div>
<!-- Inset Policy Banner -->

<!-- Navigation Links Group -->
<nav class="px-2 space-y-1">
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-admin-text-secondary hover:text-white hover:bg-admin-hover transition-colors duration-150" href="#operational-queue">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px] text-admin-text-disabled" data-icon="dashboard">dashboard</span>
<span class="">Operational Queue</span>
</div>
</a>
<!-- ACTIVE ITEM: Company Verification -->
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-medium bg-admin-primary text-white shadow-sm transition-colors duration-150" href="/admin/company-verification">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px] text-white" data-icon="domain_verification">domain_verification</span>
<span class="">Company Verification</span>
</div>
<span class="font-mono text-[11px] bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full">3</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-admin-text-secondary hover:text-white hover:bg-admin-hover transition-colors duration-150" href="#users">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px] text-admin-text-disabled" data-icon="group">group</span>
<span class="">User Directory</span>
</div>
<span class="font-mono text-[11px] text-admin-text-muted">1,482</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-admin-text-secondary hover:text-white hover:bg-admin-hover transition-colors duration-150" href="#jobs-moderation">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px] text-admin-text-disabled" data-icon="work">work</span>
<span class="">Jobs Moderation</span>
</div>
<span class="font-mono text-[11px] text-admin-text-muted">28</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-admin-text-secondary hover:text-white hover:bg-admin-hover transition-colors duration-150" href="#integrity-cases">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px] text-admin-text-disabled" data-icon="shield_with_heart">shield_with_heart</span>
<span class="">Integrity Cases</span>
</div>
<span class="font-mono text-[11px] bg-admin-status-dang-bg text-admin-status-dang-text border border-admin-status-dang-border px-1.5 py-0.5 rounded">2 flagged</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-admin-text-secondary hover:text-white hover:bg-admin-hover transition-colors duration-150" href="#worker-telemetry">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px] text-admin-text-disabled" data-icon="monitoring">monitoring</span>
<span class="">Worker Telemetry</span>
</div>
<span class="font-mono text-[11px] text-admin-status-succ-text font-medium">99.8%</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-admin-text-secondary hover:text-white hover:bg-admin-hover transition-colors duration-150" href="#subscriptions">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-[18px] text-admin-text-disabled" data-icon="account_balance_wallet">account_balance_wallet</span>
<span class="">BDT Subscriptions</span>
</div>
<span class="font-mono text-[11px] text-admin-text-body font-medium">৳34.5k</span>
</a>
</nav>
</div>
<!-- Sidebar Bottom: Admin Operator -->
<div class="border-t border-admin-divider-sb p-3 bg-admin-sidebar">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-8 h-8 rounded-full bg-[#27272B] border border-[#3A3A40] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            TC
          </div>
<div class="flex flex-col min-w-0">
<span class="text-white text-[13px] font-semibold leading-tight truncate">Tanvir Chowdhury</span>
<span class="text-admin-text-muted text-[10px] font-mono leading-tight truncate">Platform Admin #01</span>
</div>
</div>
<button aria-label="Sign out" class="p-1.5 text-admin-text-disabled hover:text-white hover:bg-admin-hover rounded transition-colors duration-150 flex-shrink-0" type="button">
<span class="material-symbols-outlined text-[18px]" data-icon="logout">logout</span>
</button>
</div>
</div>
</aside>
<!-- MAIN VIEWPORT CONTAINER -->
<div class="flex-1 flex flex-col min-w-0">
<main class="flex-1 px-8 py-7 bg-admin-bg max-w-[1440px] w-full mx-auto">
<!-- TOP HEADER & TOOLBAR -->
<header class="flex flex-col gap-4 mb-6">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<!-- Title & Breadcrumbs -->
<div class="flex flex-col gap-1.5">
<div class="flex items-center gap-2.5">
<span class="text-[11px] font-mono tracking-wider text-admin-text-muted font-medium">ADMIN / VERIFICATION QUEUE</span>

</div>
<h1 class="text-white font-headline-lg text-headline-lg tracking-tight">Company Verification Queue</h1>

</div>
<!-- Actions & Search Right Cluster -->
<div class="flex items-center flex-wrap gap-2"><button aria-label="Search" title="Search" class="w-8 h-8 bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border rounded-[8px] flex items-center justify-center text-admin-text-secondary hover:text-white transition-colors flex-shrink-0" type="button"><span class="material-symbols-outlined text-[18px]" data-icon="search">search</span></button><button aria-label="Export Audit Log" title="Export Audit Log" class="w-8 h-8 bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border rounded-[8px] flex items-center justify-center text-admin-text-secondary hover:text-white transition-colors flex-shrink-0" type="button"><span class="material-symbols-outlined text-[18px]" data-icon="file_download">file_download</span></button><button aria-label="Toggle dark mode" title="Toggle dark mode" class="w-8 h-8 bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border rounded-[8px] flex items-center justify-center text-admin-text-secondary hover:text-white transition-colors flex-shrink-0" type="button"><span class="material-symbols-outlined text-[18px]" data-icon="dark_mode">dark_mode</span></button></div>
</div>
<!-- Filter Sub-bar & Live Engine Status -->

</header>
<!-- 4-COLUMN KPI METRIC CARDS -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
<!-- Metric 1: Pending Dual-Check -->
<div class="bg-admin-card border border-admin-card-border rounded-[12px] p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<span class="text-admin-text-secondary text-[12px] font-medium">Pending Dual-Check</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="text-white font-mono text-[28px] font-semibold leading-tight">3</span>
<span class="text-admin-text-muted text-[12px]">companies</span>
</div>
</div>
<div class="w-9 h-9 rounded-[8px] bg-admin-icon-tile border border-admin-icon-border flex items-center justify-center text-admin-status-warn-text">
<span class="material-symbols-outlined text-[20px]" data-icon="hourglass_top">hourglass_top</span>
</div>
</div>
<div class="mt-4 pt-3 border-t border-admin-divider flex items-center justify-between">
<span class="text-[11px] text-admin-text-muted">Avg triage SLA 4.2h remaining</span>
<span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-admin-status-warn-bg text-admin-status-warn-text border border-admin-status-warn-border">Active SLA</span>
</div>
</div>
<!-- Metric 2: Legitimacy Approved -->
<div class="bg-admin-card border border-admin-card-border rounded-[12px] p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<span class="text-admin-text-secondary text-[12px] font-medium">Legitimacy Approved</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="text-white font-mono text-[28px] font-semibold leading-tight">2 / 3</span>
<span class="text-admin-text-muted text-[12px]">in queue</span>
</div>
</div>
<div class="w-9 h-9 rounded-[8px] bg-admin-icon-tile border border-admin-icon-border flex items-center justify-center text-admin-status-succ-text">
<span class="material-symbols-outlined text-[20px]" data-icon="check_circle">check_circle</span>
</div>
</div>
<div class="mt-4 pt-3 border-t border-admin-divider flex items-center justify-between">
<span class="text-[11px] text-admin-text-muted">RJSC &amp; Trade License</span>
<span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-admin-status-succ-bg text-admin-status-succ-text border border-admin-status-succ-border">Verified by registry</span>
</div>
</div>
<!-- Metric 3: Affiliation Blocked -->
<div class="bg-admin-card border border-admin-card-border rounded-[12px] p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<span class="text-admin-text-secondary text-[12px] font-medium">Affiliation Blocked</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="text-white font-mono text-[28px] font-semibold leading-tight">1</span>
<span class="text-admin-text-muted text-[12px]">dossier held</span>
</div>
</div>
<div class="w-9 h-9 rounded-[8px] bg-admin-icon-tile border border-admin-icon-border flex items-center justify-center text-admin-status-warn-text">
<span class="material-symbols-outlined text-[20px]" data-icon="shield">shield</span>
</div>
</div>
<div class="mt-4 pt-3 border-t border-admin-divider flex items-center justify-between">
<span class="text-[11px] text-admin-text-muted">Corporate authority</span>
<span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-admin-status-warn-bg text-admin-status-warn-text border border-admin-status-warn-border">Awaiting deed / auth letter</span>
</div>
</div>
<!-- Metric 4: Startup Alternative Path -->
<div class="bg-admin-card border border-admin-card-border rounded-[12px] p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<span class="text-admin-text-secondary text-[12px] font-medium">Startup Alternative Path</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="text-white font-mono text-[28px] font-semibold leading-tight">1</span>
<span class="text-admin-text-muted text-[12px]">manual review</span>
</div>
</div>
<div class="w-9 h-9 rounded-[8px] bg-admin-icon-tile border border-admin-icon-border flex items-center justify-center text-admin-text-secondary">
<span class="material-symbols-outlined text-[20px]" data-icon="hub">hub</span>
</div>
</div>
<div class="mt-4 pt-3 border-t border-admin-divider flex items-center justify-between">
<span class="text-[11px] text-admin-text-muted">Generic domain policy</span>
<span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-admin-badge-neutral-bg text-admin-badge-neutral-text border border-[#3A3A40]">Sec 10 compliant</span>
</div>
</div>
</section>
<!-- MAIN WORKSPACE: 8/4 SPLIT -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<!-- LEFT COLUMN (8 Columns): Pending Triage Dossiers -->
<div class="lg:col-span-8 space-y-4">
<div class="flex items-center justify-between px-1">
<div class="flex items-center gap-2">
<h2 class="text-white font-title-sm text-title-sm">Pending Triage Dossiers (3)</h2>
<span class="w-1.5 h-1.5 rounded-full bg-admin-primary"></span>
</div>
<span class="font-mono text-[11px] text-admin-text-muted tracking-wider">SLA: SORTED BY ARRIVAL</span>
</div>
<!-- DOSSIER CARD 1: FOCUSED ACTIVE DOSSIER -->
<div class="bg-admin-card border-2 border-admin-primary rounded-[12px] p-5 shadow-lg relative overflow-hidden">
<!-- Active Indicator Flag -->
<div class="absolute top-0 right-0 bg-admin-primary text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-bl">
              SELECTED FOR AUDIT
            </div>
<!-- Header Info -->
<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
<div>
<div class="flex items-center gap-2.5 flex-wrap">
<h3 class="text-white text-[18px] font-semibold tracking-tight">Therap (BD) Ltd.</h3>
<span class="font-mono text-[11px] px-2 py-0.5 rounded bg-admin-inset text-admin-text-secondary border border-admin-inset-border flex items-center gap-1">
<span class="material-symbols-outlined text-[13px]" data-icon="language">language</span>
                    therapservices.net
                  </span>
<span class="text-[11px] px-2 py-0.5 rounded bg-[#1C2029] text-[#70A8FF] border border-[#273B5E] font-medium">
                    Recruiter Starter (৳2,000/mo webhook confirmed)
                  </span>
</div>
<div class="flex items-center gap-2 mt-1.5 text-[12px] text-admin-text-secondary">
<span class="text-white font-medium">Farhan Ahmed</span>
<span class="">(Lead Tech Recruiter)</span>
<span class="text-admin-text-disabled">•</span>
<span class="font-mono text-admin-text-muted">Today, 11:20 AM (Asia/Dhaka)</span>
</div>
</div>
</div>
<!-- PROOFLINE DUAL-CHECK VISUAL PIPELINE -->
<div class="space-y-3 bg-admin-inset border border-admin-inset-border rounded-[8px] p-4 mb-4">
<!-- Check 1: Enterprise Legitimacy -->
<div class="proofline-stem-vertical flex items-start gap-3">
<div class="w-7 h-7 rounded-full bg-admin-status-succ-bg border border-admin-status-succ-border flex items-center justify-center text-admin-status-succ-text flex-shrink-0 z-10">
<span class="material-symbols-outlined text-[16px]" data-icon="check">check</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between gap-2 flex-wrap mb-1">
<span class="text-white text-[13px] font-semibold">Check 1: Enterprise Legitimacy</span>
<span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-admin-status-succ-bg text-admin-status-succ-text border border-admin-status-succ-border font-medium">
                      PASSED REGISTRY
                    </span>
</div>
<div class="flex flex-wrap gap-2 text-[11px]">
<span class="font-mono px-2 py-0.5 rounded bg-admin-card border border-admin-card-border text-admin-text-body flex items-center gap-1">
<span class="material-symbols-outlined text-[13px] text-admin-status-succ-text" data-icon="verified">verified</span>
                      Trade License 2026 (#TR-88219)
                    </span>
<span class="font-mono px-2 py-0.5 rounded bg-admin-card border border-admin-card-border text-admin-text-body flex items-center gap-1">
<span class="material-symbols-outlined text-[13px] text-admin-status-succ-text" data-icon="corporate_fare">corporate_fare</span>
                      RJSC Incorporation CERTIFIED
                    </span>
</div>
</div>
</div>
<!-- Check 2: Recruiter Authority & Affiliation -->
<div class="proofline-stem-vertical flex items-start gap-3">
<div class="w-7 h-7 rounded-full bg-admin-status-warn-bg border border-admin-status-warn-border flex items-center justify-center text-admin-status-warn-text flex-shrink-0 z-10">
<span class="material-symbols-outlined text-[16px]" data-icon="hourglass_empty">hourglass_empty</span>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between gap-2 flex-wrap mb-1">
<span class="text-white text-[13px] font-semibold">Check 2: Recruiter Authority &amp; Affiliation</span>
<span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-admin-status-warn-bg text-admin-status-warn-text border border-admin-status-warn-border font-medium">
                      AUTHORIZATION PENDING
                    </span>
</div>
<div class="flex flex-wrap gap-2 text-[11px]">
<span class="font-mono px-2 py-0.5 rounded bg-admin-card border border-admin-card-border text-admin-text-body flex items-center gap-1">
<span class="material-symbols-outlined text-[13px] text-admin-status-succ-text" data-icon="mark_email_read">mark_email_read</span>
                      Corporate Email Auth CONFIRMED (farhan@therapservices.net)
                    </span>
<span class="font-mono px-2 py-0.5 rounded bg-admin-card border border-admin-status-warn-border text-admin-status-warn-text flex items-center gap-1">
<span class="material-symbols-outlined text-[13px]" data-icon="pending">pending</span>
                      Authorization Letter: Pending Admin Sign-Off
                    </span>
</div>
</div>
</div>
<!-- BullMQ DNS TXT Proofline Chip -->
<div class="pt-2 border-t border-admin-divider flex items-center justify-between text-[11px] text-admin-text-muted">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[14px] text-admin-status-succ-text" data-icon="terminal">terminal</span>
<span class="font-mono">BullMQ DNS TXT Proofline verified: <code class="text-admin-text-secondary">_talentgraph-challenge=77f201d4a8</code></span>
</div>
<span class="font-mono text-admin-status-succ-text">Direct Match</span>
</div>
</div>
<!-- Triage Actions -->
<div class="flex items-center justify-end gap-2.5 pt-1">
<button class="px-3.5 py-2 rounded-[8px] bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border text-admin-text-body text-[13px] font-medium transition-colors" type="button">
                Request Evidence
              </button>
<button class="px-3.5 py-2 rounded-[8px] bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border text-admin-text-body text-[13px] font-medium transition-colors" type="button">
                Inspect Documents
              </button>
<button class="px-4 py-2 rounded-[8px] bg-admin-primary hover:bg-admin-primary-hover text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5 shadow-sm" type="button">
<span class="material-symbols-outlined text-[16px]" data-icon="lock_open">lock_open</span>
<span class="">Approve Both &amp; Unlock</span>
</button>
</div>
</div>
<!-- DOSSIER CARD 2 -->
<div class="bg-admin-card border border-admin-card-border rounded-[12px] p-5 transition-colors hover:border-[#333338]">
<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
<div>
<div class="flex items-center gap-2.5 flex-wrap">
<h3 class="text-white text-[16px] font-semibold tracking-tight">TigerIT Bangladesh Ltd.</h3>
<span class="font-mono text-[11px] px-2 py-0.5 rounded bg-admin-inset text-admin-text-secondary border border-admin-inset-border">
                    tigerit.com
                  </span>
<span class="text-[11px] px-2 py-0.5 rounded bg-[#1C2029] text-[#70A8FF] border border-[#273B5E] font-medium">
                    Recruiter Growth (৳5,000/mo webhook confirmed)
                  </span>
</div>
<div class="flex items-center gap-2 mt-1 text-[12px] text-admin-text-secondary">
<span class="text-white font-medium">Sadia Rahman</span>
<span class="">(VP Engineering &amp; Talent)</span>
<span class="text-admin-text-disabled">•</span>
<span class="font-mono text-admin-text-muted">Yesterday, 4:45 PM</span>
</div>
</div>
</div>
<!-- Checks Overview Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-[12px]">
<div class="p-2.5 rounded-[8px] bg-admin-inset border border-admin-card-border flex items-center justify-between">
<span class="text-admin-text-secondary">Check 1: Enterprise Legitimacy</span>
<span class="font-mono text-[11px] px-2 py-0.5 rounded bg-admin-status-warn-bg text-admin-status-warn-text border border-admin-status-warn-border">
                  RJSC PENDING
                </span>
</div>
<div class="p-2.5 rounded-[8px] bg-admin-inset border border-admin-card-border flex items-center justify-between">
<span class="text-admin-text-secondary">Check 2: Recruiter Authority</span>
<span class="font-mono text-[11px] px-2 py-0.5 rounded bg-admin-status-succ-bg text-admin-status-succ-text border border-admin-status-succ-border">
                  CLEAR
                </span>
</div>
</div>
<!-- Actions -->
<div class="flex items-center justify-between pt-1">
<span class="text-[11px] font-mono text-admin-text-muted">Missing certified RJSC Form XII filing copy</span>
<div class="flex items-center gap-2">
<button class="px-3 py-1.5 rounded-[8px] bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border text-admin-text-body text-[12px] font-medium transition-colors" type="button">
                  Request More Info
                </button>
<button class="px-3.5 py-1.5 rounded-[8px] bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border text-white text-[12px] font-medium transition-colors" type="button">
                  Review Artifacts
                </button>
</div>
</div>
</div>
<!-- DOSSIER CARD 3: STARTUP EXCEPTION PATH -->
<div class="bg-admin-card border border-admin-card-border rounded-[12px] p-5 transition-colors hover:border-[#333338]">
<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
<div>
<div class="flex items-center gap-2.5 flex-wrap">
<h3 class="text-white text-[16px] font-semibold tracking-tight">NeuralByte Labs</h3>
<span class="font-mono text-[11px] px-2 py-0.5 rounded bg-admin-inset text-admin-status-warn-text border border-admin-status-warn-border flex items-center gap-1">
<span class="material-symbols-outlined text-[13px]" data-icon="warning">warning</span>
                    neuralbyte.io (founder@gmail.com)
                  </span>
<span class="text-[11px] px-2 py-0.5 rounded bg-[#2A2A2E] text-admin-badge-neutral-text border border-[#3A3A40] font-mono font-medium">
                    Sec 10 Startup Exception Packet
                  </span>
</div>
<div class="flex items-center gap-2 mt-1 text-[12px] text-admin-text-secondary">
<span class="text-white font-medium">Tanvir Kabir</span>
<span class="">(Co-founder)</span>
<span class="text-admin-text-disabled">•</span>
<span class="font-mono text-admin-text-muted">Today, 09:10 AM</span>
</div>
</div>
</div>
<!-- Checks breakdown -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-[12px]">
<div class="p-2.5 rounded-[8px] bg-admin-inset border border-admin-card-border flex items-center justify-between">
<span class="text-admin-text-secondary">Check 1: Legitimacy</span>
<span class="font-mono text-[11px] px-2 py-0.5 rounded bg-admin-status-warn-bg text-admin-status-warn-text border border-admin-status-warn-border">
                  STARTUP DEED PROVIDED
                </span>
</div>
<div class="p-2.5 rounded-[8px] bg-admin-inset border border-admin-card-border flex items-center justify-between">
<span class="text-admin-text-secondary">Check 2: Recruiter Authority</span>
<span class="font-mono text-[11px] px-2 py-0.5 rounded bg-admin-badge-neutral-bg text-admin-badge-neutral-text border border-[#3A3A40]">
                  GENERIC DOMAIN EXCEPTION
                </span>
</div>
</div>
<!-- Action -->
<div class="flex items-center justify-between pt-1">
<span class="text-[11px] text-admin-text-muted">Requires 2-admin dual sign-off under Sec 10.4 Startup Exemption policy</span>
<button class="px-3.5 py-1.5 rounded-[8px] bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border text-white text-[12px] font-medium transition-colors" type="button">
                Triage Startup Packet
              </button>
</div>
</div>
</div>
<!-- RIGHT COLUMN (4 Columns): DUAL AUDIT INSPECTOR -->
<div class="lg:col-span-4 sticky top-6">
<div class="bg-admin-card border border-admin-card-border rounded-[12px] p-5 shadow-md flex flex-col gap-5">
<!-- Inspector Header -->
<div class="flex items-start justify-between border-b border-admin-divider pb-3">
<div>
<span class="text-[11px] font-mono tracking-wider text-admin-primary font-semibold">DUAL AUDIT INSPECTOR</span>
<h2 class="text-white text-[15px] font-semibold mt-0.5">#TR-89214: Therap (BD) Ltd.</h2>
</div>
<span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-admin-status-warn-bg text-admin-status-warn-text border border-admin-status-warn-border font-medium">
                1 of 2 Approved
              </span>
</div>
<!-- Submitted Verification Artifacts -->
<div class="space-y-2.5">
<div class="flex items-center justify-between">
<span class="text-[12px] font-medium text-white">Submitted Verification Artifacts</span>
<span class="text-[11px] font-mono text-admin-text-muted">3 files</span>
</div>
<!-- Artifact Item 1 -->
<div class="p-2.5 rounded-[8px] bg-admin-inset border border-admin-inset-border flex items-center justify-between text-[12px]">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-7 h-7 rounded bg-admin-icon-tile border border-admin-icon-border flex items-center justify-center text-admin-status-succ-text flex-shrink-0">
<span class="material-symbols-outlined text-[16px]" data-icon="description">description</span>
</div>
<div class="flex flex-col min-w-0">
<span class="text-white text-[12px] font-medium truncate">trade_license_dhaka_north_2026.pdf</span>
<span class="font-mono text-[10px] text-admin-text-muted">2.1 MB • SHA-256 Hash Verified</span>
</div>
</div>
<button aria-label="Inspect Trade License PDF" class="p-1 text-admin-text-secondary hover:text-white hover:bg-admin-hover rounded transition-colors flex-shrink-0" type="button">
<span class="material-symbols-outlined text-[16px]" data-icon="visibility">visibility</span>
</button>
</div>
<!-- Artifact Item 2 -->
<div class="p-2.5 rounded-[8px] bg-admin-inset border border-admin-inset-border flex items-center justify-between text-[12px]">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-7 h-7 rounded bg-admin-icon-tile border border-admin-icon-border flex items-center justify-center text-admin-status-succ-text flex-shrink-0">
<span class="material-symbols-outlined text-[16px]" data-icon="verified_user">verified_user</span>
</div>
<div class="flex flex-col min-w-0">
<span class="text-white text-[12px] font-medium truncate">rjsc_incorporation_certificate_c4482.pdf</span>
<span class="font-mono text-[10px] text-admin-text-muted">3.4 MB • RJSC API Direct Match</span>
</div>
</div>
<button aria-label="Inspect RJSC Certificate PDF" class="p-1 text-admin-text-secondary hover:text-white hover:bg-admin-hover rounded transition-colors flex-shrink-0" type="button">
<span class="material-symbols-outlined text-[16px]" data-icon="visibility">visibility</span>
</button>
</div>
<!-- Artifact Item 3 -->
<div class="p-2.5 rounded-[8px] bg-admin-inset border border-admin-status-warn-border flex items-center justify-between text-[12px]">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-7 h-7 rounded bg-admin-status-warn-bg border border-admin-status-warn-border flex items-center justify-center text-admin-status-warn-text flex-shrink-0">
<span class="material-symbols-outlined text-[16px]" data-icon="history_edu">history_edu</span>
</div>
<div class="flex flex-col min-w-0">
<span class="text-white text-[12px] font-medium truncate">board_authorization_farhan_ahmed.pdf</span>
<span class="font-mono text-[10px] text-admin-status-warn-text">1.2 MB • Pending Sign-Off</span>
</div>
</div>
<button aria-label="Inspect Authorization PDF" class="p-1 text-admin-text-secondary hover:text-white hover:bg-admin-hover rounded transition-colors flex-shrink-0" type="button">
<span class="material-symbols-outlined text-[16px]" data-icon="visibility">visibility</span>
</button>
</div>
</div>
<!-- Mandatory Dual-Check Signoff Controls -->
<div class="space-y-3 pt-2 border-t border-admin-divider">
<span class="text-[12px] font-medium text-white block">Mandatory Dual-Check Signoff</span>
<!-- Item 1 (Checked) -->
<label class="flex items-start gap-2.5 p-2.5 rounded-[8px] bg-admin-inset border border-admin-inset-border cursor-pointer hover:bg-admin-hover transition-colors">
<input checked="" class="mt-0.5 rounded border-admin-inset-border bg-admin-input text-admin-primary focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox">
<div class="flex flex-col">
<span class="text-white text-[12px] font-medium leading-tight">1. Enterprise Legal Entity Verified</span>
<span class="text-admin-text-muted text-[11px] mt-0.5">RJSC &amp; Trade License matched with certified government records.</span>
</div>
</label>
<!-- Item 2 (Unchecked) -->
<label class="flex items-start gap-2.5 p-2.5 rounded-[8px] bg-admin-inset border border-admin-status-warn-border cursor-pointer hover:bg-admin-hover transition-colors">
<input class="mt-0.5 rounded border-admin-inset-border bg-admin-input text-admin-primary focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox">
<div class="flex flex-col">
<span class="text-white text-[12px] font-medium leading-tight">2. Recruiter Affiliation Legally Established</span>
<span class="text-admin-text-muted text-[11px] mt-0.5">Confirmed corporate domain DNS handshake OR certified company letter.</span>
</div>
</label>
</div>
<!-- Audit Trail Rationale -->
<div class="space-y-1.5 pt-1">
<label class="text-[12px] font-medium text-white flex items-center justify-between" for="audit-rationale">
<span class="">Audit Trail Rationale</span>
<span class="text-[10px] text-admin-text-muted font-mono">Mandatory under ISO-27001</span>
</label>
<textarea class="w-full text-[12px] bg-admin-input text-admin-text-body placeholder-admin-text-muted border border-admin-inset-border rounded-[8px] p-2.5 focus:outline-none focus:border-admin-primary resize-none transition-colors" id="audit-rationale" placeholder="Enter justification for manual signoff or evidence request..." rows="3"></textarea>
</div>
<!-- Dual Action Bar -->
<div class="grid grid-cols-2 gap-2 pt-2 border-t border-admin-divider">
<button class="py-2.5 px-3 bg-admin-input hover:bg-admin-hover-btn border border-admin-inset-border text-admin-text-body rounded-[8px] text-[12px] font-medium transition-colors" type="button">
                Request Clarification
              </button>
<button class="py-2.5 px-3 bg-admin-primary hover:bg-admin-primary-hover text-white rounded-[8px] text-[12px] font-semibold transition-colors shadow-sm text-center" type="button">
                Commit Verification Decision
              </button>
</div>
</div>
</div>
</section>
</main>
<!-- ADMIN FOOTER -->
<footer class="border-t border-admin-divider-footer bg-admin-sidebar py-3 px-8 text-[11px] text-admin-text-muted flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1440px] w-full mx-auto">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-admin-status-succ-text"></span>
<span class="">TalentGraph governance shell • All actions are audited with cryptographic SHA-256 integrity</span>
</div>
<div class="flex items-center gap-1.5 hover:text-admin-text-secondary transition-colors cursor-pointer">
<span class="material-symbols-outlined text-[14px]" data-icon="lock">lock</span>
<span class="">Need help? Contact platform security</span>
</div>
</footer>
</div>




</body></html>