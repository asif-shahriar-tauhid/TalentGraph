<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>TalentGraph Admin - Operational Governance</title>
<!-- Tailwind CSS CDN with forms and container queries -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Inter Google Font -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
<!-- Tailwind Custom Config -->
<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          colors: {
            brand: {
              orange: '#D4621A',
              hover: '#bf5313',
              dark: '#0D0D0F',
              card: '#18181B',
              surface: '#131315',
              border: '#2A2A2E',
            }
          }
        }
      }
    }
  </script>
<!-- Typography & Base Custom CSS -->
<style data-purpose="base-styling">
    body {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    /* Scrollbar styling for smooth dashboard UX */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  </style>
</head>
<body class="bg-[#0e0e11] text-[#A1A1AA] min-h-screen flex transition-colors duration-200">
<!-- BEGIN: LeftSidebar -->
<aside class="w-64 flex-shrink-0 bg-[#121215] border-r border-[#222226] flex flex-col justify-between p-4 min-h-screen" data-purpose="admin-navigation-sidebar">
<div class="space-y-5">
<!-- Brand & Status Monogram -->
<div class="flex items-center space-x-3 px-1">
<div class="w-10 h-10 rounded-full bg-[#E56218] text-white flex items-center justify-center font-bold text-sm tracking-tight flex-shrink-0 shadow-md">
          TG
        </div>
<div>
<div class="flex items-center space-x-1.5">
<span class="text-white font-semibold text-sm tracking-wide">TalentGraph</span>
<span class="text-[9px] bg-[#2a2a2e] text-[#b3b3b3] font-bold px-1.5 py-0.5 rounded uppercase">ADMIN</span>
</div>
<div class="text-[11px] text-[#71717A]">Operational control</div>
</div>
</div>
<!-- Governance Policy Banner -->

<!-- Navigation Links Menu -->
<nav class="space-y-1 text-sm font-medium">
<!-- Active Nav Item -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#D4621A] text-white font-medium shadow-sm transition" href="#operational-queue">
<div class="flex items-center space-x-3">
<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-[13px]">Operational Queue</span>
</div>
</a>
<!-- Company Verification -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a1a1e] transition" href="#verification">
<div class="flex items-center space-x-3">
<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-[13px]">Company Verification</span>
</div>
<span class="text-xs text-zinc-400 font-mono">3</span>
</a>
<!-- User Directory -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a1a1e] transition" href="#users">
<div class="flex items-center space-x-3">
<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-[13px]">User Directory</span>
</div>
<span class="text-xs text-zinc-400 font-mono">1,482</span>
</a>
<!-- Jobs Moderation -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a1a1e] transition" href="#moderation">
<div class="flex items-center space-x-3">
<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-[13px]">Jobs Moderation</span>
</div>
<span class="text-xs text-zinc-400 font-mono">28</span>
</a>
<!-- Integrity Cases -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a1a1e] transition" href="#integrity">
<div class="flex items-center space-x-3">
<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-[13px]">Integrity Cases</span>
</div>
<span class="text-[11px] font-medium text-rose-400">2 flagged</span>
</a>
<!-- Worker Telemetry -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a1a1e] transition" href="#telemetry">
<div class="flex items-center space-x-3">
<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-[13px]">Worker Telemetry</span>
</div>
<span class="text-xs font-mono text-emerald-400">99.8%</span>
</a>
<!-- BDT Subscriptions -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a1a1e] transition" href="#subscriptions">
<div class="flex items-center space-x-3">
<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="text-[13px]">BDT Subscriptions</span>
</div>
<span class="text-xs font-mono text-zinc-400">৳34.5k</span>
</a>
</nav>
</div>
<!-- Bottom Operator Account Profile -->
<div class="pt-4 border-t border-[#232328] flex items-center justify-between">
<div class="flex items-center space-x-2.5 overflow-hidden">
<div class="w-8 h-8 rounded-full bg-[#27272B] text-zinc-300 font-semibold text-xs flex items-center justify-center border border-[#3A3A40] flex-shrink-0">
          TC
        </div>
<div class="truncate">
<div class="text-[13px] font-semibold text-white leading-tight truncate">Tanvir Chowdhury</div>
<div class="text-[10px] text-[#71717A] leading-tight">Platform Admin #01</div>
</div>
</div>
<button aria-label="Sign out" class="text-zinc-500 hover:text-white transition p-1" type="button">
<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</aside>
<!-- END: LeftSidebar -->
<!-- BEGIN: MainContentArea -->
<main class="flex-1 flex flex-col overflow-y-auto px-8 py-7 bg-[#0e0e11]" data-purpose="governance-main-view">
<!-- Header: Title, Breadcrumbs and Controls -->
<header class="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4">
<div>
<!-- Breadcrumb -->
<div class="flex items-center space-x-2 text-[11px] font-mono tracking-wider uppercase text-[#71717A] mb-1">
<span class="">ADMIN</span>
<span class="">/</span>
<span class="text-[#A1A1AA] font-semibold">OVERVIEW</span>
</div>
<!-- Title and Description -->
<h1 class="text-2xl font-bold text-white tracking-tight">Operational governance</h1>

</div>
<!-- Action items: Search, Export, Mode toggle -->
<div class="flex items-center space-x-3">
<!-- Search bar -->
<button aria-label="Search queue" class="w-8 h-8 rounded-lg bg-[#161619] border border-[#27272C] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#202024] transition" type="button">
<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<!-- Export Action Button -->
<button class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#161619] border border-[#27272C] text-xs text-zinc-300 hover:text-white hover:bg-[#202024] transition font-medium" type="button">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

</button>
<!-- Theme Toggle Button -->
<button aria-label="Toggle display theme" class="p-1.5 rounded-lg bg-[#161619] border border-[#27272C] text-zinc-400 hover:text-white hover:bg-[#202024] transition" id="themeToggleBtn" type="button">
<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</header>
<!-- BEGIN: TopMetricCards -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" data-purpose="top-kpi-metrics">
<!-- Card 1: Company verification -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-xs font-medium text-zinc-400">Company verification</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-zinc-400">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<div class="my-2">
<span class="text-2xl font-bold text-white tracking-tight">3</span>
</div>
<div class="flex items-center justify-between text-xs pt-1 border-t border-[#222227]">
<span class="text-[11px] text-zinc-400">Pending approvals</span>
<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#2C2114] text-[#E5933A] border border-[#44301B]">Dual check</span>
</div>
</div>
<!-- Card 2: Integrity flags -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-xs font-medium text-zinc-400">Integrity flags</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-zinc-400">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<div class="my-2">
<span class="text-2xl font-bold text-white tracking-tight">2</span>
</div>
<div class="flex items-center justify-between text-xs pt-1 border-t border-[#222227]">
<span class="text-[11px] text-zinc-400">Active flagged cases</span>
<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#2E181D] text-[#F87171] border border-[#482026]">Human review</span>
</div>
</div>
<!-- Card 3: Background ingestion -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-xs font-medium text-zinc-400">Background ingestion</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-zinc-400">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<div class="my-2">
<span class="text-2xl font-bold text-white tracking-tight">18</span>
</div>
<div class="flex items-center justify-between text-xs pt-1 border-t border-[#222227]">
<span class="text-[11px] text-zinc-400">Jobs active / 1 retry</span>
<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">BullMQ live</span>
</div>
</div>
<!-- Card 4: Webhook revenue -->
<div class="bg-[#151518] border border-[#25252A] rounded-xl p-4 flex flex-col justify-between">
<div class="flex items-start justify-between">
<span class="text-xs font-medium text-zinc-400">Webhook revenue</span>
<div class="w-7 h-7 rounded-lg bg-[#1F1F24] border border-[#2B2B32] flex items-center justify-center text-zinc-400">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
<div class="my-2">
<span class="text-2xl font-bold text-white tracking-tight">৳34,500</span>
</div>
<div class="flex items-center justify-between text-xs pt-1 border-t border-[#222227]">
<span class="text-[11px] text-zinc-400">Verified BDT this month</span>
<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#13281E] text-[#4ADE80] border border-[#1A3D2C]">+18.4%</span>
</div>
</div>
</section>
<!-- END: TopMetricCards -->
<!-- BEGIN: MiddleThroughputAndQueue -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6" data-purpose="charts-and-composition">
<!-- Left: Review Throughput Line Chart Area (approx 65%) -->
<div class="lg:col-span-8 bg-[#151518] border border-[#25252A] rounded-xl p-5 flex flex-col justify-between">
<div>
<!-- Header and Range Filters -->
<div class="flex items-start justify-between mb-2">
<div>
<h2 class="text-sm font-semibold text-white tracking-tight">Review throughput</h2>
<p class="text-xs text-zinc-400 mt-0.5">Approvals and integrity flags processed by day</p>
</div>
<!-- Range Selection Pills -->
<div class="flex items-center space-x-1 bg-[#1c1c20] p-1 rounded-lg border border-[#2c2c32] text-xs">
<button class="px-2.5 py-0.5 rounded font-semibold text-white bg-[#D4621A] text-[11px] shadow-sm" type="button">7D</button>
<button class="px-2 py-0.5 rounded font-medium text-zinc-400 hover:text-white text-[11px] transition" type="button">30D</button>
<button class="px-2 py-0.5 rounded font-medium text-zinc-400 hover:text-white text-[11px] transition" type="button">90D</button>
</div>
</div>
<!-- Chart Visual Container with Y-Axis gridlines and Day labels -->
<div class="mt-6 mb-2 relative">
<div class="h-44 w-full flex flex-col justify-between text-[11px] text-zinc-500 font-mono">
<!-- Grid line 60 -->
<div class="flex items-center w-full">
<span class="w-8">60</span>
<div class="flex-1 border-b border-[#25252a]/70 border-dashed"></div>
</div>
<!-- Grid line 45 -->
<div class="flex items-center w-full">
<span class="w-8">45</span>
<div class="flex-1 border-b border-[#25252a]/70 border-dashed"></div>
</div>
<!-- Grid line 30 -->
<div class="flex items-center w-full">
<span class="w-8">30</span>
<div class="flex-1 border-b border-[#25252a]/70 border-dashed"></div>
</div>
<!-- Grid line 15 -->
<div class="flex items-center w-full">
<span class="w-8">15</span>
<div class="flex-1 border-b border-[#25252a]/70 border-dashed"></div>
</div>
<!-- Grid line 0 -->
<div class="flex items-center w-full">
<span class="w-8">0</span>
<div class="flex-1 border-b border-[#2a2a30]"></div>
</div>
</div>
<!-- Chart Horizontal Day Labels -->
<div class="flex justify-between pl-8 pr-2 pt-2 text-[11px] text-zinc-500 font-mono">
<span class="">Mon</span>
<span class="">Tue</span>
<span class="">Wed</span>
<span class="">Thu</span>
<span class="">Fri</span>
<span class="">Sat</span>
<span class="">Sun</span>
</div>
</div>
</div>
<!-- Legend and summary stats -->
<div class="flex flex-wrap items-center justify-between pt-4 border-t border-[#222227] text-xs">
<div class="flex items-center space-x-5">
<div class="flex items-center space-x-1.5">
<span class="w-2 h-2 rounded-full bg-[#E56218]"></span>
<span class="text-zinc-400">Approved</span>
<span class="text-white font-semibold">239</span>
</div>
<div class="flex items-center space-x-1.5">
<span class="w-2 h-2 rounded-full bg-[#F43F5E]"></span>
<span class="text-zinc-400">Flagged</span>
<span class="text-white font-semibold">27</span>
</div>
</div>
<!-- Growth Indicator -->
<div class="flex items-center space-x-1 text-emerald-400 font-medium text-xs mt-2 sm:mt-0">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
<path d="M7 17l9.2-9.2M17 17V7H7" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="">12.8% vs previous period</span>
</div>
</div>
</div>
<!-- Right: Queue Composition (approx 35%) -->
<div class="lg:col-span-4 bg-[#151518] border border-[#25252A] rounded-xl p-5 flex flex-col justify-between">
<div>
<h2 class="text-sm font-semibold text-white tracking-tight">Queue composition</h2>
<p class="text-xs text-zinc-400 mt-0.5">Open work by operational queue</p>
</div>
<!-- Breakdown List Items -->
<div class="space-y-4 my-auto py-5">
<!-- Item 1 -->
<div class="flex items-center justify-between text-xs">
<span class="text-zinc-300 font-normal">Company checks</span>
<span class="text-zinc-400 font-mono text-[13px]">38%</span>
</div>
<!-- Item 2 -->
<div class="flex items-center justify-between text-xs">
<span class="text-zinc-300 font-normal">Integrity review</span>
<span class="text-zinc-400 font-mono text-[13px]">22%</span>
</div>
<!-- Item 3 -->
<div class="flex items-center justify-between text-xs">
<span class="text-zinc-300 font-normal">Job moderation</span>
<span class="text-zinc-400 font-mono text-[13px]">28%</span>
</div>
<!-- Item 4 -->
<div class="flex items-center justify-between text-xs">
<span class="text-zinc-300 font-normal">Payments</span>
<span class="text-zinc-400 font-mono text-[13px]">12%</span>
</div>
</div>
<!-- Spacer container bottom -->
<div class="pt-2"></div>
</div>
</section>
<!-- END: MiddleThroughputAndQueue -->
<!-- BEGIN: BottomWorkerAndAudit -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8" data-purpose="worker-telemetry-and-audit-events">
<!-- Left: Worker Health -->
<div class="lg:col-span-7 bg-[#151518] border border-[#25252A] rounded-xl p-5 flex flex-col justify-between">
<div>
<div class="flex items-start justify-between">
<div>
<h2 class="text-sm font-semibold text-white tracking-tight">Worker health</h2>
<p class="text-xs text-zinc-400 mt-0.5">Real-time background processing</p>
</div>
<!-- Uptime Pill -->
<span class="inline-flex items-center text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#13281E] text-emerald-400 border border-[#1A3D2C]">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
              99.8% uptime
            </span>
</div>
<!-- 3 Key Metric Values -->
<div class="grid grid-cols-3 gap-4 mt-6 mb-5">
<div>
<div class="text-2xl font-bold text-white tracking-tight">18</div>
<div class="text-[11px] text-zinc-400 mt-0.5">Active jobs</div>
</div>
<div>
<div class="text-2xl font-bold text-white tracking-tight">420ms</div>
<div class="text-[11px] text-zinc-400 mt-0.5">Median latency</div>
</div>
<div>
<div class="text-2xl font-bold text-[#E5933A] tracking-tight">1</div>
<div class="text-[11px] text-zinc-400 mt-0.5">Retriable job</div>
</div>
</div>
</div>
<!-- Mini Bar Chart showing 6 vertical rounded bars -->
<div class="pt-4 border-t border-[#222227]">
<div class="flex items-end space-x-2 h-14 w-44">
<div class="w-4 bg-[#D4621A] rounded-t-sm h-[50%] transition-all duration-300"></div>
<div class="w-4 bg-[#D4621A] rounded-t-sm h-[40%] transition-all duration-300"></div>
<div class="w-4 bg-[#D4621A] rounded-t-sm h-[65%] transition-all duration-300"></div>
<div class="w-4 bg-[#D4621A] rounded-t-sm h-[85%] transition-all duration-300"></div>
<div class="w-4 bg-[#D4621A] rounded-t-sm h-[55%] transition-all duration-300"></div>
<div class="w-4 bg-[#D4621A] rounded-t-sm h-[80%] transition-all duration-300"></div>
</div>
</div>
</div>
<!-- Right: Recent Audit Events -->
<div class="lg:col-span-5 bg-[#151518] border border-[#25252A] rounded-xl p-5 flex flex-col justify-between">
<div>
<h2 class="text-sm font-semibold text-white tracking-tight">Recent audit events</h2>
<p class="text-xs text-zinc-400 mt-0.5">Latest governance activity</p>
</div>
<!-- Event Rows with Chevron -->
<div class="space-y-3.5 my-3">
<!-- Event 1: Company verification -->
<a class="group flex items-center justify-between p-1.5 rounded-lg hover:bg-[#1a1a1e] transition" href="#event-1">
<div class="flex items-center space-x-3">
<div class="w-7 h-7 rounded-full bg-[#13281E] border border-[#1A3D2C] flex items-center justify-center text-emerald-400 flex-shrink-0">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div>
<div class="text-xs font-medium text-white group-hover:text-emerald-300 transition">Company #8821 verified</div>
<div class="text-[10px] text-zinc-500">2 min ago</div>
</div>
</div>
<svg class="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</a>
<!-- Event 2: Integrity case -->
<a class="group flex items-center justify-between p-1.5 rounded-lg hover:bg-[#1a1a1e] transition" href="#event-2">
<div class="flex items-center space-x-3">
<div class="w-7 h-7 rounded-full bg-[#2E181D] border border-[#482026] flex items-center justify-center text-rose-400 flex-shrink-0">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div>
<div class="text-xs font-medium text-white group-hover:text-rose-300 transition">Integrity case INT-204 flagged</div>
<div class="text-[10px] text-zinc-500">18 min ago</div>
</div>
</div>
<svg class="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</a>
<!-- Event 3: Payment webhook -->
<a class="group flex items-center justify-between p-1.5 rounded-lg hover:bg-[#1a1a1e] transition" href="#event-3">
<div class="flex items-center space-x-3">
<div class="w-7 h-7 rounded-full bg-[#2B1D14] border border-[#442B1A] flex items-center justify-center text-[#E5933A] flex-shrink-0">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div>
<div class="text-xs font-medium text-white group-hover:text-amber-200 transition">Payment webhook reconciled</div>
<div class="text-[10px] text-zinc-500">41 min ago</div>
</div>
</div>
<svg class="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</a>
</div>
<div class="pt-1"></div>
</div>
</section>
<!-- END: BottomWorkerAndAudit -->
<!-- BEGIN: OperationalFooter -->
<footer class="mt-auto pt-4 border-t border-[#1C1C20] flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-2" data-purpose="governance-footer">
<div class="flex items-center space-x-1.5">
<span class="">TalentGraph governance shell</span>
<span class="">•</span>
<span class="">All actions are audited</span>
</div>
<div class="flex items-center space-x-2">
<svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<span class="hover:text-zinc-300 transition cursor-pointer">Need help? Contact platform security</span>
<svg class="w-3.5 h-3.5 text-zinc-500 ml-1 hover:text-zinc-300 cursor-pointer" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</footer>
<!-- END: OperationalFooter -->
</main>
<!-- END: MainContentArea -->
<!-- Interactivity Theme Toggle Script -->
<script data-purpose="theme-toggle">
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    themeToggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
  </script>


</body></html>