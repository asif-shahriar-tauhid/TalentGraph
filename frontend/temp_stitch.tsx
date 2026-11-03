<!DOCTYPE html><html class="dark" lang="en" style="width: 1280px; height: 1021px; overflow: hidden; position: relative;"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>TalentGraph — Ground Truth Role-Based Registration</title>
<!-- Google Fonts: Inter -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet">
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Tailwind CSS v3 with Forms & Container Plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "border-subtle-light": "#E4E4E7",
            "surface-canvas-dark": "#0D0D0F",
            "outline": "#a68b7f",
            "surface-alternate-light": "#F8FAFC",
            "on-background": "#e5e1e4",
            "on-secondary-fixed-variant": "#46464f",
            "primary-fixed": "#ffdbcb",
            "outline-variant": "#574238",
            "primary-container": "#e56f27",
            "secondary-fixed-dim": "#c7c5d0",
            "surface-container-highest": "#353437",
            "status-warning-dark": "#F59E0B",
            "surface-elevated-dark": "#19191C",
            "tertiary-fixed": "#cee5ff",
            "inverse-on-surface": "#313032",
            "surface-container-low": "#1b1b1d",
            "tertiary": "#95ccff",
            "surface-elevated-light": "#FFFFFF",
            "surface-container-high": "#2a2a2c",
            "inverse-surface": "#e5e1e4",
            "status-success-light": "#15803D",
            "on-tertiary-fixed": "#001d32",
            "surface-canvas-light": "#FFFFFF",
            "text-primary-light": "#18181B",
            "inverse-primary": "#9f4200",
            "primary": "#ffb691",
            "on-surface": "#e5e1e4",
            "surface-selected-light": "#FFF1E8",
            "error": "#ffb4ab",
            "surface-bright": "#39393b",
            "tertiary-fixed-dim": "#95ccff",
            "surface-variant": "#353437",
            "secondary-container": "#46464f",
            "on-error-container": "#ffdad6",
            "surface": "#131315",
            "on-surface-variant": "#dec0b3",
            "on-primary-fixed": "#341100",
            "text-secondary-dark": "#A1A1AA",
            "border-subtle-dark": "#3F3F46",
            "primary-fixed-dim": "#ffb691",
            "on-secondary-container": "#b5b4be",
            "brand-hover-dark": "#E47735",
            "surface-selected-dark": "#252528",
            "surface-container-lowest": "#0e0e10",
            "tertiary-container": "#2797e2",
            "on-primary-fixed-variant": "#793100",
            "status-warning-light": "#B45309",
            "on-secondary-fixed": "#1a1b23",
            "on-primary-container": "#4b1b00",
            "surface-container": "#201f21",
            "text-primary-dark": "#F5F5F5",
            "error-container": "#93000a",
            "secondary": "#c7c5d0",
            "cta-text": "#18181B",
            "brand-hover-light": "#B94F0B",
            "secondary-fixed": "#e3e1ec",
            "on-secondary": "#2f3038",
            "status-error-dark": "#E5484D",
            "surface-dim": "#131315",
            "background": "#131315",
            "on-tertiary": "#003353",
            "on-tertiary-fixed-variant": "#004a75",
            "on-error": "#690005",
            "status-error-light": "#DC2626",
            "on-tertiary-container": "#002c48",
            "on-primary": "#552000",
            "status-success-dark": "#22C55E",
            "text-secondary-light": "#71717A",
            "surface-tint": "#ffb691"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "space-lg": "1.5rem",
            "margin": "1rem",
            "space-md": "1rem",
            "gutter-desktop": "1.5rem",
            "space-xl": "2rem",
            "margin-desktop": "2rem",
            "space-xs": "0.25rem",
            "gutter": "1rem",
            "space-sm": "0.5rem"
          },
          "fontFamily": {
            "headline-lg": ["Inter", "sans-serif"],
            "headline-md": ["Inter", "sans-serif"],
            "display-lg-mobile": ["Inter", "sans-serif"],
            "display-lg": ["Inter", "sans-serif"],
            "headline-lg-mobile": ["Inter", "sans-serif"],
            "title-sm": ["Inter", "sans-serif"],
            "label-md": ["Inter", "sans-serif"],
            "code-provenance": ["JetBrains Mono", "monospace"],
            "body-md": ["Inter", "sans-serif"],
            "body-sm": ["Inter", "sans-serif"],
            "label-sm": ["Inter", "sans-serif"],
            "body-lg": ["Inter", "sans-serif"]
          },
          "fontSize": {
            "headline-lg": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
            "headline-md": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "display-lg-mobile": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.015em", "fontWeight": "700" }],
            "display-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
            "headline-lg-mobile": ["22px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "title-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "label-md": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "code-provenance": ["12px", { "lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500" }],
            "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "body-sm": ["12px", { "lineHeight": "16px", "fontWeight": "400" }],
            "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }],
            "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
          }
        }
      }
    }
  </script>
<style>
    /* Provenance grid backdrop & crisp typography */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
    .proofline-stem {
      position: relative;
    }
    .proofline-stem::before {
      content: '';
      position: absolute;
      left: 19px;
      top: 36px;
      bottom: -16px;
      width: 1.5px;
      background-color: #3F3F46;
    }
    .dark .proofline-stem::before {
      background-color: #3F3F46;
    }
    html:not(.dark) .proofline-stem::before {
      background-color: #E4E4E7;
    }
    .proofline-stem:last-child::before {
      display: none;
    }
  </style>
</head>
<body class="bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-200 antialiased min-h-screen flex flex-col font-body-md">
<!-- TOP APP BAR -->
<header class="sticky top-0 z-50 w-full bg-surface-canvas-light dark:bg-surface-canvas-dark border-b border-border-subtle-light dark:border-border-subtle-dark transition-colors">
<div class="max-w-[1440px] mx-auto h-16 px-gutter md:px-gutter-desktop flex items-center justify-between">
<!-- Left cluster: Dropdowns & Links -->
<div class="flex items-center gap-6">
<nav class="hidden lg:flex items-center gap-5 font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark">
<button class="flex items-center gap-1 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors">
            Industries <span class="text-[10px]">▾</span>
</button>
<button class="flex items-center gap-1 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors">
            Resources <span class="text-[10px]">▾</span>
</button>
<a class="hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">Pricing</a>
<a class="hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">Methodology</a>
</nav>
</div>
<!-- Center Brand Identity -->
<a class="flex items-center gap-2" href="#">
<span class="font-headline-md text-headline-md tracking-tight font-bold text-text-primary-light dark:text-text-primary-dark">TalentGraph</span>
</a>
<!-- Right cluster: Nav Actions & Theme Switcher -->
<div class="flex items-center gap-4">
<a class="hidden sm:inline-block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">About</a>
<a class="font-label-md text-label-md text-text-primary-light dark:text-text-primary-dark hover:text-primary-container dark:hover:text-primary transition-colors font-medium" href="/login">Sign in</a>
<!-- Theme Toggle -->
<button aria-label="Toggle Theme" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-elevated-light dark:bg-surface-elevated-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" id="themeToggleBtn" title="Toggle Theme" type="button">
<span class="material-symbols-outlined text-[18px]" id="themeIcon">dark_mode</span>
<span class="hidden sm:inline text-label-sm font-label-sm" id="themeText">Dark</span>
</button>
<a class="px-3.5 py-2 rounded-lg bg-primary-container hover:bg-brand-hover-dark text-cta-text font-label-md text-label-md font-semibold transition-colors duration-150 shadow-none" href="#register-core">
          Get Started
        </a>
</div>
</div>
</header>
<!-- SIMULATION STATE CONTROL (PLAYBOOK B3) -->
<aside aria-label="Protocol Simulation Controls" class="w-full bg-[#141416] border-b border-border-subtle-dark text-text-primary-dark py-2 px-gutter md:px-gutter-desktop">
<div class="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-label-sm font-label-sm">
<div class="flex items-center gap-2">
<span class="flex h-2 w-2 rounded-full bg-status-success-dark"></span>
<span class="text-text-secondary-dark uppercase font-code-provenance text-code-provenance tracking-wider">Simulation State Control (Playbook B3)</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-text-secondary-dark font-code-provenance text-[10px]">ENV: STAGING</span>
</div>
<!-- State Pills -->
<div class="flex items-center gap-1.5 overflow-x-auto py-0.5" id="simControls">
<button class="sim-pill px-2.5 py-1 rounded border border-border-subtle-dark text-text-secondary-dark hover:text-text-primary-dark font-label-sm transition-colors" data-state="candidate" onclick="setSimState('candidate')" type="button">
          Default (Candidate)
        </button>
<button class="sim-pill px-2.5 py-1 rounded border border-primary-container bg-surface-selected-dark text-primary-container font-label-sm transition-colors" data-state="recruiter" onclick="setSimState('recruiter')" type="button">
          Recruiter Form
        </button>
<button class="sim-pill px-2.5 py-1 rounded border border-border-subtle-dark text-text-secondary-dark hover:text-text-primary-dark font-label-sm transition-colors" data-state="denied" onclick="setSimState('denied')" type="button">
          OAuth Denied
        </button>
<button class="sim-pill px-2.5 py-1 rounded border border-border-subtle-dark text-text-secondary-dark hover:text-text-primary-dark font-label-sm transition-colors" data-state="sent" onclick="setSimState('sent')" type="button">
          Email Verification Sent
        </button>
<button class="sim-pill px-2.5 py-1 rounded border border-border-subtle-dark text-text-secondary-dark hover:text-text-primary-dark font-label-sm transition-colors" data-state="loading" onclick="setSimState('loading')" type="button">
          Loading
        </button>
</div>
</div>
</aside>
<!-- MAIN REGISTRATION CANVAS -->
<main class="flex-1 w-full max-w-[1440px] mx-auto px-gutter md:px-gutter-desktop py-space-xl" id="register-core">
<!-- HERO / INTAKE HEADER -->
<div class="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle-light dark:border-border-subtle-dark pb-8">
<div>
<div class="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-3">


</div>
<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary-light dark:text-text-primary-dark tracking-tight">
          Build Your Verifiable SkillGraph
        </h1>
<p class="mt-2 text-text-secondary-light dark:text-text-secondary-dark font-body-lg text-body-lg max-w-2xl">
          Authenticate once with your primary GitHub profile. No passwords required, zero noise.
        </p>
</div>
<!-- Pricing / Entitlement banner -->
<div class="self-center md:self-auto px-4 py-2.5 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-elevated-light dark:bg-surface-elevated-dark font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark">
<span class="text-status-success-dark font-semibold">Candidate Free: ৳0</span>
<span class="mx-2 text-border-subtle-dark">|</span>
<span class="">Recruiter Starter from <span class="text-text-primary-light dark:text-text-primary-dark font-medium">৳2,000/mo</span></span>
</div>
</div>
<!-- SIMULATION ALERT BANNERS (Conditionally Shown) -->
<div class="mb-8 p-4 rounded-lg bg-status-error-dark/10 border border-status-error-dark text-text-primary-dark flex items-start gap-3 hidden" id="simAlertDenied">
<span class="material-symbols-outlined text-status-error-dark text-[22px]">error</span>
<div>
<h4 class="font-title-sm text-title-sm text-status-error-dark">GitHub OAuth Authorization Denied (Err: 403_SCOPE_REFUSED)</h4>
<p class="font-body-sm text-body-sm text-text-secondary-dark mt-0.5">
          User declined read-only identity scope. TalentGraph cannot generate AST verified profiles without verified public handle tokens. Please retry authentication.
        </p>
</div>
</div>
<div class="mb-8 p-4 rounded-lg bg-status-success-dark/10 border border-status-success-dark text-text-primary-dark flex items-start gap-3 hidden" id="simAlertSent">
<span class="material-symbols-outlined text-status-success-dark text-[22px]">mark_email_read</span>
<div>
<h4 class="font-title-sm text-title-sm text-status-success-dark">Verification Dispatch Broadcasted</h4>
<p class="font-body-sm text-body-sm text-text-secondary-dark mt-0.5">
          Confirmation handshake link dispatched to <strong class="text-text-primary-dark">engineering-lead@company.com</strong>. Valid for 15 minutes under Proofline Intake Spec.
        </p>
</div>
</div>
<!-- WORKSPACE 2-COLUMN GRID -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<!-- LEFT COLUMN: REGISTRATION WORKSPACE (Cols 7) -->
<section aria-label="Registration Forms" class="lg:col-span-7 rounded-xl border border-border-subtle-light dark:border-border-subtle-dark bg-surface-elevated-light dark:bg-surface-elevated-dark p-6 md:p-8">
<!-- ROLE PICKER TABS -->
<div class="flex border-b border-border-subtle-light dark:border-border-subtle-dark mb-6">
<button class="flex-1 pb-3 text-center font-label-md text-label-md font-medium border-b-2 border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" id="tabCandidateBtn" onclick="switchRole('candidate')" type="button">
            I'm a Candidate (Developer)
          </button>
<button class="flex-1 pb-3 text-center font-label-md text-label-md font-semibold border-b-2 border-primary-container text-text-primary-light dark:text-text-primary-dark transition-colors" id="tabRecruiterBtn" onclick="switchRole('recruiter')" type="button">
            I'm a Technical Recruiter / Employer
          </button>
</div>
<!-- CANDIDATE VIEW -->
<div class="space-y-6 hidden" id="candidateFormPanel">
<div class="flex items-center justify-between">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-selected-light dark:bg-surface-selected-dark border border-primary-container text-primary-container font-code-provenance text-code-provenance">
<span class="material-symbols-outlined text-[16px]">verified</span> Evidence-First Portfolio
            </span>
<span class="text-text-secondary-light dark:text-text-secondary-dark text-label-sm font-label-sm">No resume upload needed</span>
</div>
<!-- OAuth Action -->
<div class="space-y-3">
<button class="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-lg bg-[#24292F] hover:bg-[#1a1e22] text-white font-headline-md text-[15px] font-semibold transition-colors duration-150 border border-[#30363D]" id="githubAuthBtn" onclick="triggerGithubMock()" type="button">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
        </svg>
        <span class="">Continue with GitHub OAuth</span></button>
<p class="text-center text-text-secondary-light dark:text-text-secondary-dark font-body-sm text-body-sm">
              We sync author identities, semantic pull-request history, and commit line distributions.
            </p>
</div>
<!-- Read-Only Safety Guarantee Box -->
<div class="rounded-lg p-4 bg-surface-alternate-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark flex items-start gap-3">
<span class="material-symbols-outlined text-primary-container text-[20px] mt-0.5">shield</span>
<div>
<h4 class="font-title-sm text-title-sm text-text-primary-light dark:text-text-primary-dark">Read-Only Safety Guarantee</h4>
<p class="mt-1 font-body-sm text-body-sm text-text-secondary-light dark:text-text-secondary-dark">
                Authentication is strictly read-only for public identity tokens. We never request private SSH keys or execute push operations.
              </p>
</div>
</div>
<!-- Consent Agreement -->
<div class="pt-2">
<label class="flex items-start gap-3 cursor-pointer select-none">
<input checked="" class="mt-1 h-4 w-4 rounded border-border-subtle-dark text-primary-container focus:ring-primary-container focus:ring-offset-0 bg-surface-canvas-dark" type="checkbox">
<span class="font-body-sm text-body-sm text-text-secondary-light dark:text-text-secondary-dark">
                I agree to the <a class="text-text-primary-light dark:text-text-primary-dark underline hover:text-primary-container" href="#">Terms of Service</a> and <a class="text-text-primary-light dark:text-text-primary-dark underline hover:text-primary-container" href="#">Privacy Policy</a>. I understand that GitHub OAuth grants basic profile access, while repository analysis consent (3 syncs/month limit) is configured explicitly per selected repo.
              </span>
</label>
</div>
<!-- Spec Compliance Box -->
<div class="p-4 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-container-low dark:bg-surface-container-lowest font-code-provenance text-code-provenance">
<div class="flex items-center justify-between text-text-secondary-light dark:text-text-secondary-dark mb-1">
<span class="font-semibold text-text-primary-light dark:text-text-primary-dark">GROUND TRUTH INTAKE SPEC v1.3 COMPLIANT</span>
<span class="text-status-success-dark">PASS</span>
</div>
<p class="text-text-secondary-light dark:text-text-secondary-dark text-[11px] leading-relaxed">
              Zero black-box ranking, zero CV extrapolation without AST commit confirmation. All evidence ties back to reproducible SHA keys.
            </p>
</div>
</div>
<!-- RECRUITER VIEW (Form) -->
<div class="space-y-5" id="recruiterFormPanel">
<div class="flex items-center justify-between">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-text-secondary-dark border border-border-subtle-dark font-code-provenance text-code-provenance">
<span class="material-symbols-outlined text-[16px]">corporate_fare</span> Employer Onboarding
            </span>
<span class="text-text-secondary-light dark:text-text-secondary-dark text-label-sm font-label-sm">Requires Business Email</span>
</div>
<form class="space-y-4" id="recruiterForm" onsubmit="event.preventDefault(); triggerRecruiterSubmit();">
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label class="block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Full Name</label>
<input class="w-full h-10 px-3 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors" placeholder="Dr. Sarah Connor" required="" type="text">
</div>
<div>
<label class="block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Work Email</label>
<input class="w-full h-10 px-3 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors" placeholder="name@company.com" required="" type="email">
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label class="block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Password</label>
<input class="w-full h-10 px-3 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors" placeholder="••••••••••••" required="" type="password">
</div>
<div>
<label class="block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Confirm Password</label>
<input class="w-full h-10 px-3 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors" placeholder="••••••••••••" required="" type="password">
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label class="block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Company Name</label>
<input class="w-full h-10 px-3 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors" placeholder="Acme Systems Corp" required="" type="text">
</div>
<div>
<label class="block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Official Website</label>
<input class="w-full h-10 px-3 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors" placeholder="https://acmesystems.io" required="" type="url">
</div>
</div>
<div>
<label class="block font-label-md text-label-md text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Recruiter Title / Role</label>
<input class="w-full h-10 px-3 rounded-lg border border-border-subtle-light dark:border-border-subtle-dark bg-surface-canvas-light dark:bg-surface-canvas-dark text-text-primary-light dark:text-text-primary-dark font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors" placeholder="VP of Talent &amp; Engineering Systems" required="" type="text">
</div>
<!-- Mandatory Policy Note -->
<div class="p-3.5 rounded-lg bg-surface-alternate-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark text-text-secondary-light dark:text-text-secondary-dark font-body-sm text-body-sm flex gap-2.5">
<span class="material-symbols-outlined text-status-warning-dark text-[18px] shrink-0">info</span>
<span class="">
<strong>Mandatory policy note:</strong> Creating an account does not automatically verify your company or authorize job publishing. Company legitimacy and recruiter affiliation must be verified prior to posting jobs.
              </span>
</div>
<button class="w-full py-3 px-4 rounded-lg bg-primary-container hover:bg-brand-hover-dark text-cta-text font-label-md text-label-md font-semibold transition-colors duration-150 flex items-center justify-center gap-2" type="submit">
<span class="">Continue to Company Verification</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</form>
</div>
</section>
<!-- RIGHT COLUMN: THE PROOFLINE ENGINE (Cols 5) -->
<section aria-label="Proofline Engine Lineage" class="lg:col-span-5 rounded-xl border border-border-subtle-light dark:border-border-subtle-dark bg-surface-elevated-light dark:bg-surface-elevated-dark p-6 md:p-8 flex flex-col justify-between">
<div>
<!-- Panel Header -->
<div class="flex items-center justify-between pb-4 border-b border-border-subtle-light dark:border-border-subtle-dark mb-5">
<div>
<div class="flex items-center gap-2">
<h3 class="font-headline-md text-headline-md text-text-primary-light dark:text-text-primary-dark">The Proofline Engine</h3>

</div>
<p class="font-body-sm text-body-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Every candidate capability is anchored by traceable provenance markers. We convert ambiguous resumes into mathematically verifiable proof.
              </p>
</div>
<span class="hidden sm:inline-flex px-2 py-1 rounded bg-primary-container/10 border border-primary-container/30 text-primary-container font-code-provenance text-[11px] font-semibold uppercase">
              Deterministic Lineage
            </span>
</div>
<!-- PROOFLINE CONNECTOR STEPS -->
<div class="space-y-6 pt-2">
<!-- Step 1 -->
<div class="proofline-stem flex items-start gap-3.5">
<div class="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-canvas-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark text-primary-container">
<span class="material-symbols-outlined text-[18px]">account_tree</span>
</div>
<div class="flex-1 pb-1">
<div class="flex items-center justify-between">
<h4 class="font-title-sm text-title-sm text-text-primary-light dark:text-text-primary-dark">1. Connect CV &amp; Repos (OAuth / PDF)</h4>
</div>
<p class="font-body-sm text-body-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                  Candidate authenticates repository identities.
                </p>
<div class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-canvas-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark text-text-secondary-light dark:text-text-secondary-dark font-code-provenance text-[11px]">
<span class="material-symbols-outlined text-[14px]">code</span>
<span class="">github.com/profile @ commit-hash</span>
</div>
</div>
</div>
<!-- Step 2 -->
<div class="proofline-stem flex items-start gap-3.5">
<div class="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-canvas-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark text-status-success-dark">
<span class="material-symbols-outlined text-[18px]">memory</span>
</div>
<div class="flex-1 pb-1">
<div class="flex items-center justify-between">
<h4 class="font-title-sm text-title-sm text-text-primary-light dark:text-text-primary-dark">2. Grounded Static AST Analysis (Active AST)</h4>
</div>
<p class="font-body-sm text-body-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                  Abstract Syntax Tree decomposition computes cyclomatic complexity, ownership ratios, and code hygiene.
                </p>
<div class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-status-success-dark/10 border border-status-success-dark/30 text-status-success-dark font-code-provenance text-[11px]">
<span class="material-symbols-outlined text-[14px]">check_circle</span>
<span class="">AST verified: 84.2% Author Dominance</span>
</div>
</div>
</div>
<!-- Step 3 -->
<div class="proofline-stem flex items-start gap-3.5">
<div class="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-canvas-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark text-status-warning-dark">
<span class="material-symbols-outlined text-[18px]">speed</span>
</div>
<div class="flex-1 pb-1">
<div class="flex items-center justify-between">
<h4 class="font-title-sm text-title-sm text-text-primary-light dark:text-text-primary-dark">3. Timed Mobile Assessment (Verified)</h4>
</div>
<p class="font-body-sm text-body-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                  Rapid, unskewed technical benchmarks validate practical instincts without synthetic AI assistance.
                </p>
<div class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-canvas-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark text-text-secondary-light dark:text-text-secondary-dark font-code-provenance text-[11px]">
<span class="material-symbols-outlined text-[14px]">analytics</span>
<span class="">Benchmark: 94th Pctl Distributed Systems</span>
</div>
</div>
</div>
<!-- Step 4 -->
<div class="proofline-stem flex items-start gap-3.5">
<div class="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-canvas-light dark:bg-surface-canvas-dark border border-border-subtle-light dark:border-border-subtle-dark text-primary-container">
<span class="material-symbols-outlined text-[18px]">handshake</span>
</div>
<div class="flex-1">
<div class="flex items-center justify-between">
<h4 class="font-title-sm text-title-sm text-text-primary-light dark:text-text-primary-dark">4. Deterministic Match (Decision)</h4>
</div>
<p class="font-body-sm text-body-sm text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                  High-confidence engineering hiring where candidates skip generic screenings directly to team syncs.
                </p>
<div class="mt-2 inline-block px-3 py-1.5 rounded-lg border border-primary-container bg-surface-selected-light dark:bg-surface-selected-dark text-primary-container font-code-provenance text-[11px] font-medium">
                  Proofline Complete: Zero Unsubstantiated Claims
                </div>
</div>
</div>
</div>
</div>
<!-- Panel Footer Security Note -->
<div class="mt-8 pt-4 border-t border-border-subtle-light dark:border-border-subtle-dark grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-secondary-light dark:text-text-secondary-dark font-code-provenance text-code-provenance">


</div>
</section>
</div>
</main>
<!-- MONUMENTAL ARCHITECTURAL FOOTER -->

<!-- INTERACTIVITY & DUAL THEME CONTROLLER -->
<script>
    // 1. Theme Controller (Dark default, pure dark/light swap)
    const htmlElem = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    function updateThemeUI(isDark) {
      if (isDark) {
        htmlElem.classList.add('dark');
        themeIcon.textContent = 'dark_mode';
        if (themeText) themeText.textContent = 'Dark';
      } else {
        htmlElem.classList.remove('dark');
        themeIcon.textContent = 'light_mode';
        if (themeText) themeText.textContent = 'Light';
      }
    }

    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlElem.classList.contains('dark');
      updateThemeUI(!isDark);
    });

    // 2. Role Selector Switcher
    const candidateTab = document.getElementById('tabCandidateBtn');
    const recruiterTab = document.getElementById('tabRecruiterBtn');
    const candidatePanel = document.getElementById('candidateFormPanel');
    const recruiterPanel = document.getElementById('recruiterFormPanel');

    function switchRole(role) {
      if (role === 'candidate') {
        candidateTab.className = "flex-1 pb-3 text-center font-label-md text-label-md font-semibold border-b-2 border-primary-container text-text-primary-light dark:text-text-primary-dark transition-colors";
        recruiterTab.className = "flex-1 pb-3 text-center font-label-md text-label-md font-medium border-b-2 border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors";
        candidatePanel.classList.remove('hidden');
        recruiterPanel.classList.add('hidden');
      } else {
        recruiterTab.className = "flex-1 pb-3 text-center font-label-md text-label-md font-semibold border-b-2 border-primary-container text-text-primary-light dark:text-text-primary-dark transition-colors";
        candidateTab.className = "flex-1 pb-3 text-center font-label-md text-label-md font-medium border-b-2 border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors";
        recruiterPanel.classList.remove('hidden');
        candidatePanel.classList.add('hidden');
      }
    }

    // 3. Simulation State Control
    const alertDenied = document.getElementById('simAlertDenied');
    const alertSent = document.getElementById('simAlertSent');
    const githubAuthBtn = document.getElementById('githubAuthBtn');

    function setSimState(state) {
      // update pill highlight
      const pills = document.querySelectorAll('.sim-pill');
      pills.forEach(pill => {
        if (pill.getAttribute('data-state') === state) {
          pill.className = "sim-pill px-2.5 py-1 rounded border border-primary-container bg-surface-selected-dark text-primary-container font-label-sm transition-colors";
        } else {
          pill.className = "sim-pill px-2.5 py-1 rounded border border-border-subtle-dark text-text-secondary-dark hover:text-text-primary-dark font-label-sm transition-colors";
        }
      });

      // Hide conditional alerts
      alertDenied.classList.add('hidden');
      alertSent.classList.add('hidden');
      githubAuthBtn.innerHTML = `
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
        </svg>
        <span>Continue with GitHub OAuth</span>`;

      if (state === 'candidate') {
        switchRole('candidate');
      } else if (state === 'recruiter') {
        switchRole('recruiter');
      } else if (state === 'denied') {
        switchRole('candidate');
        alertDenied.classList.remove('hidden');
      } else if (state === 'sent') {
        switchRole('recruiter');
        alertSent.classList.remove('hidden');
      } else if (state === 'loading') {
        switchRole('candidate');
        githubAuthBtn.innerHTML = `
          <span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
          <span>Handshaking with GitHub Identity Vault...</span>`;
      }
    }

    function triggerGithubMock() {
      setSimState('loading');
      setTimeout(() => {
        alertSent.classList.remove('hidden');
        alertSent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1000);
    }

    function triggerRecruiterSubmit() {
      setSimState('sent');
      alertSent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  </script>


<div id="snapdom-sandbox" data-snapdom-sandbox="true" aria-hidden="true" style="position: absolute; left: -9999px; top: -9999px; width: 0px; height: 0px; overflow: hidden;"></div></body></html>