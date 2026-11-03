<!DOCTYPE html><html class="dark" lang="en" style="width: 1280px; height: 993px; overflow: hidden; position: relative;"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>TalentGraph — Access Ground Truth | Role-Aware Login</title>
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "border-subtle-light": "#E4E4E7",
            "status-warning-light": "#B45309",
            "text-primary-light": "#18181B",
            "outline": "#a68b7f",
            "inverse-primary": "#9f4200",
            "on-tertiary-fixed": "#001d32",
            "inverse-surface": "#e5e1e4",
            "on-secondary-fixed-variant": "#46464f",
            "background": "#131315",
            "surface-canvas-dark": "#0D0D0F",
            "surface-elevated-dark": "#19191C",
            "surface-container-low": "#1b1b1d",
            "surface-container-highest": "#353437",
            "status-success-light": "#15803D",
            "secondary-container": "#46464f",
            "surface-alternate-light": "#F8FAFC",
            "surface-bright": "#39393b",
            "surface-container": "#201f21",
            "secondary-fixed-dim": "#c7c5d0",
            "brand-hover-light": "#B94F0B",
            "on-background": "#e5e1e4",
            "border-subtle-dark": "#3F3F46",
            "tertiary-fixed": "#cee5ff",
            "on-primary-container": "#4b1b00",
            "tertiary-container": "#2797e2",
            "on-secondary-fixed": "#1a1b23",
            "surface-container-high": "#2a2a2c",
            "surface-dim": "#131315",
            "outline-variant": "#574238",
            "on-surface-variant": "#dec0b3",
            "on-error-container": "#ffdad6",
            "surface-variant": "#353437",
            "on-tertiary-container": "#002c48",
            "text-secondary-dark": "#A1A1AA",
            "status-error-light": "#DC2626",
            "surface-elevated-light": "#FFFFFF",
            "secondary-fixed": "#e3e1ec",
            "surface-tint": "#ffb691",
            "surface-selected-light": "#FFF1E8",
            "inverse-on-surface": "#313032",
            "error": "#ffb4ab",
            "on-primary": "#552000",
            "text-primary-dark": "#F5F5F5",
            "on-secondary-container": "#b5b4be",
            "on-tertiary-fixed-variant": "#004a75",
            "on-surface": "#e5e1e4",
            "primary-container": "#e56f27",
            "primary-fixed-dim": "#ffb691",
            "surface": "#131315",
            "text-secondary-light": "#71717A",
            "on-error": "#690005",
            "status-warning-dark": "#F59E0B",
            "on-primary-fixed": "#341100",
            "primary-fixed": "#ffdbcb",
            "on-secondary": "#2f3038",
            "tertiary-fixed-dim": "#95ccff",
            "brand-hover-dark": "#E47735",
            "surface-container-lowest": "#0e0e10",
            "tertiary": "#95ccff",
            "secondary": "#c7c5d0",
            "error-container": "#93000a",
            "surface-canvas-light": "#FFFFFF",
            "cta-text": "#18181B",
            "on-tertiary": "#003353",
            "surface-selected-dark": "#252528",
            "primary": "#ffb691",
            "status-error-dark": "#E5484D",
            "status-success-dark": "#22C55E",
            "on-primary-fixed-variant": "#793100"
          },
          borderRadius: {
            DEFAULT: "0.25rem",
            lg: "0.5rem",
            xl: "0.75rem",
            full: "9999px"
          },
          spacing: {
            "space-xs": "0.25rem",
            "space-sm": "0.5rem",
            "space-md": "1rem",
            "space-lg": "1.5rem",
            "space-xl": "2rem",
            "gutter": "1rem",
            "gutter-desktop": "1.5rem",
            "margin": "1rem",
            "margin-desktop": "2rem"
          },
          fontFamily: {
            "headline-lg-mobile": ["Inter", "sans-serif"],
            "code-provenance": ["JetBrains Mono", "monospace"],
            "display-lg": ["Inter", "sans-serif"],
            "label-sm": ["Inter", "sans-serif"],
            "title-sm": ["Inter", "sans-serif"],
            "headline-lg": ["Inter", "sans-serif"],
            "body-sm": ["Inter", "sans-serif"],
            "body-lg": ["Inter", "sans-serif"],
            "body-md": ["Inter", "sans-serif"],
            "display-lg-mobile": ["Inter", "sans-serif"],
            "headline-md": ["Inter", "sans-serif"],
            "label-md": ["Inter", "sans-serif"]
          },
          fontSize: {
            "headline-lg-mobile": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "code-provenance": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
            "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
            "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "500" }],
            "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
            "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
            "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
            "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
            "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
            "display-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "700" }],
            "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "label-md": ["13px", { lineHeight: "18px", fontWeight: "500" }]
          }
        }
      }
    };
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
    .proofline-node {
      position: relative;
    }
    .proofline-node::after {
      content: '';
      position: absolute;
      left: 11px;
      top: 24px;
      bottom: -16px;
      width: 1.5px;
      background-color: #3F3F46;
    }
    .proofline-node:last-child::after {
      display: none;
    }
    .monumental-text {
      font-size: clamp(3rem, 13vw, 11rem);
      line-height: 0.85;
      letter-spacing: -0.04em;
    }
  </style>
</head>
<body class="bg-[#FAFAFA] dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-200 antialiased min-h-screen flex flex-col font-body-md text-body-md selection:bg-primary-container selection:text-cta-text">
<!-- ========================================================================= -->
<!-- REPLICATED EXACT LANDING PAGE HEADER (SCREEN_5) WITH SIGN UP / REGISTER SWAP -->
<!-- ========================================================================= -->
<header class="sticky top-0 z-50 w-full bg-surface-canvas-light dark:bg-surface-canvas-dark border-b border-border-subtle-light dark:border-border-subtle-dark transition-colors">
<div class="max-w-[1440px] mx-auto h-16 px-gutter md:px-gutter-desktop flex items-center justify-between">
<!-- Left: Navigation Links & Dropdowns -->
<nav class="hidden lg:flex items-center space-x-6 text-label-md font-label-md">
<div class="relative group cursor-pointer">
<button aria-expanded="false" class="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" type="button">
<span class="">Industries</span>
<span class="text-[10px] transform group-hover:rotate-180 transition-transform">▾</span>
</button>
<div class="absolute top-full left-0 mt-2 w-48 bg-surface-elevated-light dark:bg-surface-elevated-dark border border-border-subtle-light dark:border-border-subtle-dark rounded-lg p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
<a class="block px-3 py-2 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark hover:text-text-primary-light dark:hover:text-text-primary-dark rounded" href="#">High-Frequency Fintech</a>
<a class="block px-3 py-2 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark hover:text-text-primary-light dark:hover:text-text-primary-dark rounded" href="#">Distributed Infrastructure</a>
<a class="block px-3 py-2 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark hover:text-text-primary-light dark:hover:text-text-primary-dark rounded" href="#">Machine Learning Systems</a>
</div>
</div>
<div class="relative group cursor-pointer">
<button aria-expanded="false" class="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" type="button">
<span class="">Resources</span>
<span class="text-[10px] transform group-hover:rotate-180 transition-transform">▾</span>
</button>
<div class="absolute top-full left-0 mt-2 w-52 bg-surface-elevated-light dark:bg-surface-elevated-dark border border-border-subtle-light dark:border-border-subtle-dark rounded-lg p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
<a class="block px-3 py-2 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark hover:text-text-primary-light dark:hover:text-text-primary-dark rounded" href="#">AST Proofline Whitepaper</a>
<a class="block px-3 py-2 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark hover:text-text-primary-light dark:hover:text-text-primary-dark rounded" href="#">Benchmark Suite v2.4</a>
<a class="block px-3 py-2 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark hover:text-text-primary-light dark:hover:text-text-primary-dark rounded" href="#">Recruiter Compliance Guide</a>
</div>
</div>
<a class="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">Pricing</a>
<a class="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">Methodology</a>
</nav>
<!-- Center: TalentGraph Brand Wordmark (Clean typography, no dot) -->
<div class="flex items-center">
<a class="text-headline-md font-headline-md tracking-tight text-text-primary-light dark:text-text-primary-dark flex items-center font-bold" href="#">
          TalentGraph
        </a>
</div>
<!-- Right: About, Register / Sign up Link (swapped from Sign In), Theme Toggle, and Primary CTA -->
<div class="flex items-center space-x-4 md:space-x-5">
<a class="hidden sm:inline-block text-label-md font-label-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">
          About
        </a>
<!-- Replaced "Sign in" with explicit "Register / Sign up" link -->
<a class="text-label-md font-label-md text-primary-container dark:text-primary font-medium hover:underline transition-colors flex items-center gap-1" href="/register">
<span class="">Sign up</span>
<span class="hidden sm:inline">/ Register</span>
</a>
<!-- Theme Toggle Button -->
<button aria-label="Toggle theme" class="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark border border-border-subtle-light dark:border-border-subtle-dark bg-white dark:bg-surface-elevated-dark shadow-xs transition-colors" id="theme-toggle-btn">
<span class="material-symbols-outlined text-[18px] dark:hidden" data-icon="dark_mode">dark_mode</span>
<span class="material-symbols-outlined text-[18px] hidden dark:inline" data-icon="light_mode">light_mode</span>
</button>
<a class="bg-primary-container hover:bg-brand-hover-dark text-white font-title-sm text-body-sm px-4 py-2 rounded-lg font-semibold transition-all shadow-sm" href="#auth-card">
          Get Started
        </a>
</div>
</div>
</header>
<!-- ========================================================================= -->
<!-- MAIN AUTH WORKSPACE -->
<!-- ========================================================================= -->
<main class="flex-1 w-full max-w-[1440px] mx-auto px-gutter md:px-gutter-desktop py-8 md:py-12 flex flex-col items-center justify-center">
<!-- SIMULATION STATE SWITCHER BAR -->
<section class="w-full max-w-xl mb-6 bg-white dark:bg-surface-elevated-dark border border-border-subtle-light dark:border-border-subtle-dark rounded-xl p-2 shadow-xs transition-colors">
<div class="flex items-center justify-between px-2 pb-2 mb-2 border-b border-border-subtle-light dark:border-border-subtle-dark">
<div class="flex items-center gap-1.5 text-label-sm font-label-sm text-text-secondary-light dark:text-text-secondary-dark">
<span class="material-symbols-outlined text-[15px] text-primary-container dark:text-primary" data-icon="terminal">terminal</span>
<span class="">Simulation State Control (Playbook B2)</span>
</div>

</div>
<div class="grid grid-cols-2 sm:grid-cols-5 gap-1 text-center font-code-provenance text-[11px]">
<button class="sim-btn py-1.5 px-2 rounded font-medium bg-primary-container text-white transition-colors" data-state="default" onclick="setSimState('default')" type="button">
          Default
        </button>
<button class="sim-btn py-1.5 px-2 rounded font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark transition-colors" data-state="oauth_cancelled" onclick="setSimState('oauth_cancelled')" type="button">
          OAuth Cancel
        </button>
<button class="sim-btn py-1.5 px-2 rounded font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark transition-colors" data-state="invalid_recruiter" onclick="setSimState('invalid_recruiter')" type="button">
          Invalid Workspace
        </button>
<button class="sim-btn py-1.5 px-2 rounded font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark transition-colors" data-state="unverified_email" onclick="setSimState('unverified_email')" type="button">
          Unverified Email
        </button>
<button class="sim-btn py-1.5 px-2 rounded font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark transition-colors" data-state="loading_state" onclick="setSimState('loading_state')" type="button">
          Loading
        </button>
</div>
</section>
<!-- LIVE STATE NOTIFICATION BANNER -->
<div class="w-full max-w-xl mb-4 hidden" id="simAlertContainer"></div>
<!-- MAIN LOGIN CARD -->
<div class="w-full max-w-xl bg-white dark:bg-surface-elevated-dark border border-border-subtle-light dark:border-border-subtle-dark rounded-2xl shadow-sm dark:shadow-xl overflow-hidden transition-all" id="auth-card">
<!-- Top Tactical Proofline Rail -->
<div class="h-1 w-full bg-gradient-to-r from-border-subtle-light dark:from-border-subtle-dark via-primary-container to-border-subtle-light dark:to-border-subtle-dark"></div>
<div class="p-6 md:p-8 flex flex-col">
<!-- Header & Identity -->
<div class="mb-6">
<div class="flex items-center justify-between mb-2">


</div>
<h1 class="text-headline-lg font-headline-lg text-text-primary-light dark:text-text-primary-dark tracking-tight font-bold">
            Access Ground Truth
          </h1>
<p class="text-body-md font-body-md text-text-secondary-light dark:text-text-secondary-dark mt-1">
            Evidence-substantiated engineering profiles &amp; hiring intelligence.
          </p>
</div>
<!-- Trust Notice Card: Server-Enforced Role Separation -->

<!-- ========================================================================= -->
<!-- SECTION 1: CANDIDATE SIGN IN (TOP ROLE PATH) -->
<!-- ========================================================================= -->
<div class="relative bg-surface-alternate-light dark:bg-surface-canvas-dark p-5 rounded-xl border border-border-subtle-light dark:border-border-subtle-dark mb-6 transition-colors">
<div class="flex items-center justify-between mb-3">
<div class="flex items-center gap-2">
<span class="text-label-md font-label-md font-semibold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wide">Candidate Access</span>
<span class="font-code-provenance text-[11px] text-text-secondary-light dark:text-text-secondary-dark">(Developer / Engineer)</span>
</div>

</div>
<!-- Primary GitHub Auth Action Button -->
<button class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-white hover:bg-gray-100 text-[#18181B] dark:bg-[#24292F] dark:hover:bg-[#1B1F23] dark:text-white font-medium text-body-md transition-all shadow-xs active:scale-[0.99] border border-border-subtle-light dark:border-border-subtle-dark focus:ring-2 focus:ring-primary-container focus:outline-none" id="githubAuthBtn" type="button">
<!-- GitHub Octocat SVG -->
<svg aria-hidden="true" class="w-5 h-5 fill-current text-[#18181B] dark:text-white" viewBox="0 0 24 24">
<path clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill-rule="evenodd"></path>
</svg>
<span class="font-semibold text-text-primary-light dark:text-white" id="githubBtnText">Continue with GitHub</span>
</button>
<!-- Candidate Explanatory Microcopy & Proofline Provenance -->
<div class="mt-3.5 space-y-2">
<div class="flex items-start gap-2 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark">
<span class="material-symbols-outlined text-[16px] text-status-success-light dark:text-status-success-dark shrink-0 mt-0.5" data-icon="lock_open_right">lock_open_right</span>
<span class="">Candidates authenticate strictly via GitHub OAuth. Read-only least-privilege repository consent.</span>
</div>
<div class="flex items-center justify-between text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark pt-1 border-t border-border-subtle-light dark:border-border-subtle-dark">


</div>
</div>
</div>
<!-- DIVIDER WITH MINIMAL LINEAR PROOFLINE -->
<div class="relative flex items-center justify-center my-2 mb-6">
<div aria-hidden="true" class="absolute inset-0 flex items-center">
<div class="w-full border-t border-border-subtle-light dark:border-border-subtle-dark"></div>
</div>
<div class="relative px-3 bg-white dark:bg-surface-elevated-dark text-label-sm font-label-sm font-code-provenance text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider transition-colors">
            or recruiter workspace login
          </div>
</div>
<!-- ========================================================================= -->
<!-- SECTION 2: RECRUITER WORKSPACE SIGN IN -->
<!-- ========================================================================= -->
<form class="space-y-4" id="recruiterForm" onsubmit="handleRecruiterSubmit(event)">
<!-- Workspace Email Input -->
<div>
<div class="flex items-center justify-between mb-1.5">
<label class="block text-label-md font-label-md text-text-primary-light dark:text-text-primary-dark font-medium" for="workspaceEmail">
                Workspace Email
              </label>

</div>
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary-light dark:text-text-secondary-dark">
<span class="material-symbols-outlined text-[18px]" data-icon="business">business</span>
</div>
<input class="w-full h-10 pl-10 pr-3 bg-white dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark border border-border-subtle-light dark:border-border-subtle-dark rounded-lg text-body-md font-body-md placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all dark:border-status-error-dark" id="workspaceEmail" name="email" placeholder="name@company.com" required="" type="email">
</div>
<p class="mt-1.5 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1" id="emailHelperText"><span class="material-symbols-outlined text-[14px]">info</span><span class="">Company domain required for verified team workspaces. Personal webmails rejected.</span></p>
</div>
<!-- Password Input -->
<div>
<div class="flex items-center justify-between mb-1.5">
<label class="block text-label-md font-label-md text-text-primary-light dark:text-text-primary-dark font-medium" for="workspacePassword">
                Password
              </label>
<a class="text-label-sm font-label-sm text-primary-container dark:text-primary hover:underline transition-colors font-medium" href="#">
                Forgot password?
              </a>
</div>
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary-light dark:text-text-secondary-dark">
<span class="material-symbols-outlined text-[18px]" data-icon="key">key</span>
</div>
<input class="w-full h-10 pl-10 pr-10 bg-white dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark border border-border-subtle-light dark:border-border-subtle-dark rounded-lg text-body-md font-body-md placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all" id="workspacePassword" name="password" placeholder="••••••••••••" required="" type="password">
<button aria-label="Toggle password visibility" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" onclick="togglePasswordVisibility()" type="button">
<span class="material-symbols-outlined text-[18px]" data-icon="visibility" id="pwIcon">visibility</span>
</button>
</div>
</div>
<!-- Primary CTA: Recruiter Sign In -->
<div class="pt-2">
<button class="w-full h-11 bg-primary-container hover:bg-brand-hover-dark text-white font-title-sm text-body-md rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container" id="submitRecruiterBtn" type="submit">
<span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full hidden" id="recruiterBtnSpinner"></span>
<span class="" id="recruiterBtnLabel">Sign In as Recruiter</span>
<span class="material-symbols-outlined text-[18px]" data-icon="arrow_forward" id="recruiterBtnArrow">arrow_forward</span>
</button>
</div>
</form>
<!-- Bottom Link: Register Navigation -->
<div class="mt-6 pt-5 border-t border-border-subtle-light dark:border-border-subtle-dark text-center">
<p class="text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark">
            Don't have an account? 
            <a class="text-primary-container dark:text-primary font-semibold hover:underline transition-colors ml-1 inline-flex items-center gap-0.5" href="/register">
<span class="">Create an account / Register</span>
<span class="material-symbols-outlined text-[14px]" data-icon="arrow_outward">arrow_outward</span>
</a>
</p>
</div>
</div>
<!-- Card Footer Proofline Status Node -->

</div>
</main>
<!-- ========================================================================= -->
<!-- EXACT MONUMENTAL ARCHITECTURAL FOOTER (FROM SCREEN_5) -->
<!-- High-impact brand orange (#e56218 / #D4621A) with capsule bar & giant type -->
<!-- ========================================================================= -->
<!-- ========================================================================= -->
<!-- JAVASCRIPT: THEME TOGGLE, SIMULATION STATES & MICRO-INTERACTIONS -->
<!-- ========================================================================= -->
<script>
    // Robust Theme Toggle Logic with localStorage persistence
    const themeBtn = document.getElementById('theme-toggle-btn');

    function updateThemeIcon(isDark) {
      // Icon visibility is driven by Tailwind's dark:hidden and dark:inline classes on html.dark
    }

    function toggleTheme() {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Initialize Theme on Load (Defaults to dark if not set)
    (function initTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        // Fallback default: dark mode
        document.documentElement.classList.add('dark');
      }
    })();

    // Password Visibility Toggle
    function togglePasswordVisibility() {
      const pwInput = document.getElementById('workspacePassword');
      const pwIcon = document.getElementById('pwIcon');
      if (pwInput.type === 'password') {
        pwInput.type = 'text';
        pwIcon.textContent = 'visibility_off';
      } else {
        pwInput.type = 'password';
        pwIcon.textContent = 'visibility';
      }
    }

    // Interactive Simulation State Controller (Playbook B2)
    function setSimState(state) {
      // Update Button visual highlights
      document.querySelectorAll('.sim-btn').forEach(btn => {
        if (btn.getAttribute('data-state') === state) {
          btn.className = 'sim-btn py-1.5 px-2 rounded font-medium bg-primary-container text-white transition-colors';
        } else {
          btn.className = 'sim-btn py-1.5 px-2 rounded font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-selected-light dark:hover:bg-surface-selected-dark transition-colors';
        }
      });

      const alertContainer = document.getElementById('simAlertContainer');
      const submitBtn = document.getElementById('submitRecruiterBtn');
      const btnLabel = document.getElementById('recruiterBtnLabel');
      const btnSpinner = document.getElementById('recruiterBtnSpinner');
      const btnArrow = document.getElementById('recruiterBtnArrow');
      const emailInput = document.getElementById('workspaceEmail');
      const emailHelper = document.getElementById('emailHelperText');

      // Reset Defaults
      alertContainer.classList.add('hidden');
      alertContainer.innerHTML = '';
      btnSpinner.classList.add('hidden');
      btnArrow.classList.remove('hidden');
      btnLabel.textContent = 'Sign In as Recruiter';
      submitBtn.disabled = false;
      emailInput.classList.remove('border-status-error-dark', 'focus:ring-status-error-dark', 'border-status-error-light');
      emailHelper.className = 'mt-1.5 text-body-sm font-body-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1';
      emailHelper.innerHTML = `<span class="material-symbols-outlined text-[14px]">info</span><span>Company domain required for verified team workspaces. Personal webmails rejected.</span>`;

      switch (state) {
        case 'oauth_cancelled':
          alertContainer.classList.remove('hidden');
          alertContainer.innerHTML = `
            <div class="p-3.5 bg-amber-50 dark:bg-status-warning-dark/15 border border-amber-300 dark:border-status-warning-dark/40 rounded-xl flex items-start gap-3 transition-colors">
              <span class="material-symbols-outlined text-amber-700 dark:text-status-warning-dark text-[20px] shrink-0 mt-0.5" data-icon="warning">warning</span>
              <div class="text-body-sm font-body-sm">
                <p class="font-semibold text-amber-900 dark:text-status-warning-dark">GitHub OAuth Cancelled by User</p>
                <p class="text-amber-800 dark:text-text-secondary-dark mt-0.5">Authentication handshake terminated. No permissions or tokens were stored. You can retry anytime.</p>
              </div>
            </div>`;
          break;

        case 'invalid_recruiter':
          alertContainer.classList.remove('hidden');
          alertContainer.innerHTML = `
            <div class="p-3.5 bg-red-50 dark:bg-status-error-dark/15 border border-red-300 dark:border-status-error-dark/40 rounded-xl flex items-start gap-3 transition-colors">
              <span class="material-symbols-outlined text-status-error-light dark:text-status-error-dark text-[20px] shrink-0 mt-0.5" data-icon="error">error</span>
              <div class="text-body-sm font-body-sm">
                <p class="font-semibold text-red-900 dark:text-status-error-dark">Workspace Authentication Failed</p>
                <p class="text-red-800 dark:text-text-secondary-dark mt-0.5">Domain record was not found or password does not match recruiter credentials for this AST workspace.</p>
              </div>
            </div>`;
          emailInput.classList.add('border-status-error-light', 'dark:border-status-error-dark');
          break;

        case 'unverified_email':
          alertContainer.classList.remove('hidden');
          alertContainer.innerHTML = `
            <div class="p-3.5 bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/40 rounded-xl flex items-start gap-3 transition-colors">
              <span class="material-symbols-outlined text-amber-700 dark:text-status-warning-dark text-[20px] shrink-0 mt-0.5" data-icon="mark_email_unread">mark_email_unread</span>
              <div class="text-body-sm font-body-sm">
                <p class="font-semibold text-amber-900 dark:text-status-warning-dark">Domain Verification Pending</p>
                <p class="text-amber-800 dark:text-text-secondary-dark mt-0.5">Please confirm your institutional SSO magic link sent to your workspace inbox before accessing candidate Prooflines.</p>
              </div>
            </div>`;
          emailHelper.className = 'mt-1.5 text-body-sm font-body-sm text-status-warning-light dark:text-status-warning-dark flex items-center gap-1';
          emailHelper.innerHTML = `<span class="material-symbols-outlined text-[14px]">pending</span><span>Verification link sent. Awaiting DNS confirmation.</span>`;
          break;

        case 'loading_state':
          btnSpinner.classList.remove('hidden');
          btnArrow.classList.add('hidden');
          btnLabel.textContent = 'Verifying Credentials...';
          submitBtn.disabled = true;
          break;

        case 'default':
        default:
          break;
      }
    }

    // Handle Mock Recruiter Submit
    function handleRecruiterSubmit(e) {
      e.preventDefault();
      setSimState('loading_state');
      setTimeout(() => {
        setSimState('invalid_recruiter');
      }, 1200);
    }

    // GitHub Button Mock Click
    document.getElementById('githubAuthBtn').addEventListener('click', () => {
      const btnText = document.getElementById('githubBtnText');
      const originalText = btnText.textContent;
      btnText.textContent = 'Connecting to GitHub...';
      setTimeout(() => {
        btnText.textContent = originalText;
        setSimState('oauth_cancelled');
      }, 1000);
    });
  </script>


<div id="snapdom-sandbox" data-snapdom-sandbox="true" aria-hidden="true" style="position: absolute; left: -9999px; top: -9999px; width: 0px; height: 0px; overflow: hidden;"></div></body></html>