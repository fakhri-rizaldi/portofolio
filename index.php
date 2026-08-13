<?php
$data = require 'data.php';
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $data['profile']['name'] ?> - <?= $data['profile']['title'] ?></title>
    <meta name="description" content="<?= htmlspecialchars($data['profile']['summary']) ?>">
    <meta name="keywords" content="<?= $data['profile']['name'] ?>, Portfolio, PHP, Tailwind CSS, Web Developer, Freelance">
    <meta name="author" content="<?= $data['profile']['name'] ?>">
    <!-- Google Site Verification Placeholder -->
    <meta name="google-site-verification" content="h3iSBQ1Ajgq7hU09gvD5ASXdI09d-XhUN4dwmfMRl_I" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {





                        /* styleguide tokens — dark mode as default */
                        base: '#14131F',
                        surface: '#1C1B2E',
                        hairline: '#2E2C42',
                        'signal-amber': '#FFB648',
                        'trace-teal': '#3FBFAD',
                        ink: { primary: '#F2EFE9', secondary: '#A6A2B8' },
                        /* light mode overrides applied via CSS variables later (Fase 3) */
                        /* keep legacy aliases so existing markup doesn't break yet */
                        primary: '#FFB648',
                        dark: '#1C1B2E',
                        darker: '#14131F',
                        card: '#1C1B2E',
                    },
                    fontFamily: {


                        sans: ['IBM Plex Sans', 'sans-serif'],
                        display: ['IBM Plex Sans Condensed', 'sans-serif'],
                        mono: ['IBM Plex Mono', 'monospace'],
                    },
                    fontSize: {
                        'display-xl': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
                        'display-l': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
                        'display-m': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
                        'body': ['1rem', { lineHeight: '1.65' }],
                        'label': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
                    },
                    borderRadius: {
                        'card': '10px',
                        'btn': '6px',
                    },
                }
            }
        }
    </script>

    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Condensed:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <script>
        // Check local storage or system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

    </script>
    <!-- ponytail: AOS dropped (Fase 4) — add Intersection Observer scroll-reveal if needed later -->

    <style>
        /* ── Color tokens via CSS variables (light = default, dark = override) ── */
        :root {
            --bg-base: #F5F3ED;
            --bg-surface: #FFFFFF;
            --ink-primary: #1B1A2E;
            --ink-secondary: #5C5871;
            --hairline: #DEDAD0;
            --signal-amber: #C97A1A;
            --trace-teal: #1E8A7B;
        }
        .dark {
            --bg-base: #14131F;
            --bg-surface: #1C1B2E;
            --ink-primary: #F2EFE9;
            --ink-secondary: #A6A2B8;
            --hairline: #2E2C42;
            --signal-amber: #FFB648;
            --trace-teal: #3FBFAD;
        }

        body { font-family: 'IBM Plex Sans', sans-serif; overflow-x: hidden; background: var(--bg-base); color: var(--ink-primary); }
        html { scroll-behavior: smooth; }

        /* ── Keyframe: trace-draw (signature motion) ── */
        @keyframes trace-draw {
            from { stroke-dashoffset: var(--dash-length, 1000); }
            to   { stroke-dashoffset: 0; }
        }
        @keyframes card-trace {
            from { width: 0; }
            to   { width: 100%; }
        }
        @keyframes signal-float {
            0%, 100% { transform: translate3d(0, 0, 0); opacity: .42; }
            50% { transform: translate3d(0, -10px, 0); opacity: .7; }
        }
        @keyframes signal-scan {
            from { transform: translateX(-35%); }
            to { transform: translateX(135%); }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
        }

        .hero-signal path { pathLength: 1; stroke-dasharray: 1; stroke-dashoffset: 1; }
        .hero-motion-grid {
            background-image: linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: radial-gradient(circle at 62% 45%, black 0 34%, transparent 68%);
            opacity: .34;
            animation: signal-float 8s ease-in-out infinite;
        }
        .hero-motion-scan {
            background: linear-gradient(90deg, transparent, var(--trace-teal), transparent);
            opacity: .22;
            animation: signal-scan 5.5s linear infinite;
        }

        /* ── Component: Buttons ── */
        .btn-primary {
            display: inline-flex; align-items: center; gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--signal-amber); color: var(--bg-base);
            font-family: 'IBM Plex Sans', sans-serif; font-weight: 600;
            border-radius: 6px; border: none; cursor: pointer;
            transition: background 200ms ease-in-out, transform 200ms ease-in-out;
        }
        .btn-primary:hover {
            filter: brightness(0.9); transform: translateY(-2px);
        }
        .btn-primary:focus-visible {
            outline: 2px solid var(--signal-amber); outline-offset: 2px;
        }

        .btn-secondary {
            display: inline-flex; align-items: center; gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: transparent; color: var(--ink-primary);
            font-family: 'IBM Plex Sans', sans-serif; font-weight: 600;
            border: 1px solid var(--hairline); border-radius: 6px; cursor: pointer;
            transition: border-color 200ms ease-in-out, transform 200ms ease-in-out;
        }
        .btn-secondary:hover {
            border-color: var(--signal-amber); transform: translateY(-2px);
        }
        .btn-secondary:focus-visible {
            outline: 2px solid var(--signal-amber); outline-offset: 2px;
        }

        /* ── Component: Badge / Tag ── */
        .badge {
            display: inline-block;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.75rem; font-weight: 500;
            text-transform: uppercase; letter-spacing: 0.04em;
            padding: 0.2rem 0.6rem;
            border: 1px solid var(--hairline); border-radius: 4px;
            background: transparent; color: var(--ink-secondary);
            transition: border-color 200ms ease-in-out, color 200ms ease-in-out;
        }
        .badge:hover, .badge-active {
            border-color: var(--trace-teal); color: var(--trace-teal);
        }

        /* ── Component: Card Base ── */
        .card-base {
            background: var(--bg-surface);
            border: 1px solid var(--hairline);
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            transition: transform 250ms ease-in-out, box-shadow 250ms ease-in-out;
        }
        .card-base::before {
            content: '';
            position: absolute; top: 0; left: 0;
            height: 2px; width: 0;
            background: var(--signal-amber);
            transition: width 300ms ease-out;
        }
        .card-base:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .card-base:hover::before {
            width: 100%;
        }

        /* ── Component: Section Header (axis-tick) ── */
        .section-header {
            display: flex; align-items: center; gap: 1rem;
            margin-bottom: 3rem;
        }
        .section-header__label {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.8125rem; font-weight: 500;
            letter-spacing: 0.06em; text-transform: uppercase;
            color: var(--ink-secondary); white-space: nowrap;
        }
        .section-header__line {
            flex: 1; height: 1px;
            background: var(--hairline);
            position: relative;
        }
        /* axis ticks */
        .section-header__line::before,
        .section-header__line::after {
            content: ''; position: absolute; top: -3px;
            width: 1px; height: 7px; background: var(--hairline);
        }
        .section-header__line::before { left: 20%; }
        .section-header__line::after  { left: 60%; }
        /* ── Responsive display scale ── */
        .text-display-xl { font-size: 2.25rem; }
        @media (min-width: 768px) { .text-display-xl { font-size: 3.5rem; } }

        /* ── Focus ring: signal-amber for all interactive elements ── */
        :focus-visible {
            outline: 2px solid var(--signal-amber);
            outline-offset: 2px;
        }

        /* ── Selection color ── */
        ::selection { background: var(--signal-amber); color: var(--bg-base); }
    </style>
</head>
<body class="antialiased transition-colors duration-300" style="background:var(--bg-base); color:var(--ink-primary)">

    <!-- Navigation -->
    <nav class="fixed w-full z-50 transition-colors duration-300" style="background:var(--bg-base); border-bottom:1px solid var(--hairline)">
        <div class="max-w-[1200px] mx-auto px-6 md:px-12">
            <div class="flex items-center justify-between h-14">

                <!-- Desktop links -->
                <div class="hidden md:flex items-center gap-8">
                    <?php foreach(['about'=>'About','interests'=>'Interests','projects'=>'Projects','contact'=>'Contact'] as $id=>$label): ?>
                    <a href="#<?= $id ?>" class="font-mono text-label uppercase tracking-widest transition-colors duration-150"
                       style="color:var(--ink-secondary)"
                       onmouseover="this.style.color='var(--signal-amber)'"
                       onmouseout="this.style.color='var(--ink-secondary)'"><?= $label ?></a>
                    <?php endforeach; ?>
                </div>

                <!-- Right: theme toggle + hamburger -->
                <div class="flex items-center gap-4 ml-auto">
                    <!-- Theme toggle: icon button -->
                        <button id="themeToggle" type="button" aria-label="Toggle theme"
                            class="w-8 h-8 flex items-center justify-center rounded-btn transition-colors duration-150 focus-visible:outline focus-visible:outline-2"
                            style="border:1px solid var(--hairline); color:var(--ink-secondary)"
                            onmouseover="this.style.borderColor='var(--signal-amber)'"
                            onmouseout="this.style.borderColor='var(--hairline)'">
                        <!-- Sun (shown in dark mode) -->
                        <svg class="w-4 h-4 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <!-- Moon (shown in light mode) -->
                        <svg class="w-4 h-4 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                        </svg>
                    </button>

                    <button type="button" onclick="this.setAttribute('aria-expanded', document.getElementById('mobile-menu').classList.toggle('hidden') ? 'false' : 'true')"
                            class="md:hidden w-8 h-8 flex items-center justify-center rounded-btn"
                            style="border:1px solid var(--hairline); color:var(--ink-secondary)"
                            aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
        <div class="hidden md:hidden" id="mobile-menu" style="border-top:1px solid var(--hairline); background:var(--bg-base)">
            <div class="px-6 py-4 flex flex-col gap-4">
                <?php foreach(['about'=>'About','interests'=>'Interests','projects'=>'Projects','contact'=>'Contact'] as $id=>$label): ?>
                <a href="#<?= $id ?>" onclick="document.getElementById('mobile-menu').classList.add('hidden')"
                   class="font-mono text-label uppercase tracking-widest"
                   style="color:var(--ink-secondary)"><?= $label ?></a>
                <?php endforeach; ?>
            </div>
        </div>
    </nav>

    <section id="about" class="min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-0 md:pb-0 relative overflow-hidden" style="background:var(--bg-base)">

        <div class="hero-motion-grid absolute inset-0 pointer-events-none z-0"></div>
        <div class="hero-motion-scan absolute top-0 bottom-0 left-0 w-1/3 pointer-events-none z-0"></div>

        <!-- SVG Signal Line — signature element, spans full width -->
        <svg class="hero-signal absolute top-[38%] left-0 w-full h-24 pointer-events-none z-0" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
            <path
                d="M0,40 Q50,40 100,40 T200,40 T250,10 T300,70 T350,30 T400,50 T450,40 T500,40 T600,40 T700,40 T750,15 T800,65 T850,35 T900,45 T950,40 T1000,40 T1100,40 T1200,40"
                fill="none" stroke="var(--signal-amber)" stroke-width="2" stroke-linecap="round"
                style="--dash-length:1"
                class="animate-[trace-draw_1.5s_ease-out_0.3s_forwards]" />
            <!-- faint duplicate for glow -->
            <path
                d="M0,40 Q50,40 100,40 T200,40 T250,10 T300,70 T350,30 T400,50 T450,40 T500,40 T600,40 T700,40 T750,15 T800,65 T850,35 T900,45 T950,40 T1000,40 T1100,40 T1200,40"
                fill="none" stroke="var(--signal-amber)" stroke-width="6" stroke-linecap="round" opacity="0.12"
                style="--dash-length:1"
                class="animate-[trace-draw_1.5s_ease-out_0.3s_forwards]" />
        </svg>

        <div class="max-w-[1200px] mx-auto px-6 md:px-12 w-full z-10">

            <!-- Eyebrow -->
            <span class="badge badge-active mb-6 inline-block">Status: Open for Work</span>

            <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-16">

                <!-- Text Content (Left) -->
                <div class="flex-1 order-2 md:order-1">
                    <p class="font-mono text-label uppercase mb-3" style="color:var(--ink-secondary)">Halo, saya</p>

                    <h1 class="font-display text-display-xl tracking-tight mb-2" style="color:var(--ink-primary)">
                        <?= $data['profile']['name'] ?><span style="color:var(--signal-amber)">.</span>
                    </h1>

                    <p class="font-display text-display-m mb-8" style="color:var(--ink-secondary)">
                        <?= $data['profile']['title'] ?>
                    </p>

                    <p class="text-body max-w-xl mb-10 leading-relaxed" style="color:var(--ink-secondary)">
                        <?= $data['profile']['summary'] ?>
                    </p>

                    <div class="flex flex-wrap gap-3">
                        <a href="#contact" class="btn-primary">
                            Get in Touch
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                        <a href="#projects" class="btn-secondary">Lihat Proyek</a>
                        <a href="Muhammad Fakhri_Rizaldi_Resume.pdf" download class="btn-secondary">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Unduh CV
                        </a>
                    </div>
                </div>

                <!-- Photo (Right) -->
                <div class="flex-shrink-0 order-1 md:order-2">
                    <div class="relative w-64 h-64 md:w-80 md:h-80">
                        <div class="w-full h-full rounded-card overflow-hidden" style="border:1px solid var(--hairline)">
                            <img class="w-full h-full object-cover" 
                                 src="assets/profile.jpeg" 
                                 alt="Foto <?= $data['profile']['name'] ?>">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Scroll indicator -->
        <div class="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer p-2 z-20"
             onclick="document.getElementById('about').nextElementSibling.scrollIntoView({behavior: 'smooth'})"
             aria-hidden="true">
            <svg class="w-5 h-5 transition-colors" style="color:var(--ink-secondary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
        </div>

    </section>

    <!-- Timeline: Experience + Education (combined, sorted by period desc) -->
    <?php
        $timeline = [];
        foreach ($data['experience'] as $e) {
            $timeline[] = [
                'period'      => $e['period'],
                'title'       => $e['role'],
                'subtitle'    => $e['company'],
                'description' => $e['description'],
                'type'        => $e['type'] ?? 'experience',
            ];
        }
        foreach ($data['education'] as $e) {
            $timeline[] = [
                'period'      => $e['period'],
                'title'       => $e['degree'],
                'subtitle'    => $e['institution'],
                'description' => $e['description'] ?? '',
                'type'        => 'education',
            ];
        }
        // sort descending by the first 4-digit year found in period
        usort($timeline, function($a, $b) {
            preg_match('/\d{4}/', $b['period'], $mb);
            preg_match('/\d{4}/', $a['period'], $ma);
            return ($mb[0] ?? 0) <=> ($ma[0] ?? 0);
        });
    ?>
    <section id="experience" class="py-24 relative transition-colors duration-300" style="background:var(--bg-surface)">
        <div class="max-w-[1200px] mx-auto px-6 md:px-12">

            <div class="section-header">
                <span class="section-header__label">Sect / Journey</span>
                <div class="section-header__line"></div>
            </div>

            <!-- vertical timeline -->
            <div class="relative">
                <!-- spine -->
                <div class="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px" style="background:var(--hairline); transform:translateX(-50%)"></div>

                <div class="space-y-10">
                <?php foreach ($timeline as $i => $item): ?>
                    <div class="relative flex flex-col md:flex-row md:items-start gap-0 md:gap-8 group">

                        <?php $isLeft = ($i % 2 === 0); ?>

                        <!-- Left slot (desktop: content or spacer) -->
                        <div class="hidden md:block md:w-1/2 <?= $isLeft ? 'pr-10 text-right' : '' ?>">
                            <?php if ($isLeft): ?>
                            <div class="card-base p-6 inline-block text-left w-full">
                                <span class="font-mono text-label uppercase" style="color:var(--signal-amber)"><?= htmlspecialchars($item['period']) ?></span>
                                <h3 class="font-display text-display-m mt-2 mb-1" style="color:var(--ink-primary)"><?= htmlspecialchars($item['title']) ?></h3>
                                <p class="font-mono text-label mb-3" style="color:var(--ink-secondary)"><?= htmlspecialchars($item['subtitle']) ?></p>
                                <?php if ($item['description']): ?>
                                <p class="text-body" style="color:var(--ink-secondary)"><?= htmlspecialchars($item['description']) ?></p>
                                <?php endif; ?>
                                <span class="badge mt-4"><?= htmlspecialchars($item['type']) ?></span>
                            </div>
                            <?php endif; ?>
                        </div>

                        <!-- Dot -->
                        <div class="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full flex-shrink-0 z-10 transition-transform duration-200 group-hover:scale-125"
                             style="background:var(--signal-amber); border:3px solid var(--bg-surface); transform:translateX(-50%)"></div>

                        <!-- Right slot (desktop: content or spacer; mobile: always content) -->
                        <div class="pl-8 md:pl-0 md:w-1/2 <?= !$isLeft ? 'md:pl-10' : '' ?>">
                            <?php if (!$isLeft): ?>
                            <div class="card-base p-6">
                                <span class="font-mono text-label uppercase" style="color:var(--signal-amber)"><?= htmlspecialchars($item['period']) ?></span>
                                <h3 class="font-display text-display-m mt-2 mb-1" style="color:var(--ink-primary)"><?= htmlspecialchars($item['title']) ?></h3>
                                <p class="font-mono text-label mb-3" style="color:var(--ink-secondary)"><?= htmlspecialchars($item['subtitle']) ?></p>
                                <?php if ($item['description']): ?>
                                <p class="text-body" style="color:var(--ink-secondary)"><?= htmlspecialchars($item['description']) ?></p>
                                <?php endif; ?>
                                <span class="badge mt-4"><?= htmlspecialchars($item['type']) ?></span>
                            </div>
                            <?php else: ?>
                            <!-- mobile: show card here too (hidden on md+) -->
                            <div class="card-base p-6 md:hidden">
                                <span class="font-mono text-label uppercase" style="color:var(--signal-amber)"><?= htmlspecialchars($item['period']) ?></span>
                                <h3 class="font-display text-display-m mt-2 mb-1" style="color:var(--ink-primary)"><?= htmlspecialchars($item['title']) ?></h3>
                                <p class="font-mono text-label mb-3" style="color:var(--ink-secondary)"><?= htmlspecialchars($item['subtitle']) ?></p>
                                <?php if ($item['description']): ?>
                                <p class="text-body" style="color:var(--ink-secondary)"><?= htmlspecialchars($item['description']) ?></p>
                                <?php endif; ?>
                                <span class="badge mt-4"><?= htmlspecialchars($item['type']) ?></span>
                            </div>
                            <?php endif; ?>
                        </div>

                    </div>
                <?php endforeach; ?>
                </div>
            </div>

        </div>
    </section>
    <section id="interests" class="py-24 relative overflow-hidden transition-colors duration-300" style="background:var(--bg-base)">
        <div class="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">

            <div class="section-header">
                <span class="section-header__label">Sect / Interests</span>
                <div class="section-header__line"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <?php foreach ($data['career_interests'] as $index => $interest): ?>
                <div class="card-base p-8 flex flex-col justify-between group">
                    <!-- Icon -->
                    <div class="mb-6">
                        <div class="w-10 h-10 flex items-center justify-center rounded-btn" style="border:1px solid var(--hairline)">
                            <?php if($interest['icon'] == 'science'): ?>
                                <svg class="w-5 h-5" style="color:var(--signal-amber)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            <?php elseif($interest['icon'] == 'ml'): ?>
                                <svg class="w-5 h-5" style="color:var(--signal-amber)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
                                </svg>
                            <?php else: ?>
                                <svg class="w-5 h-5" style="color:var(--trace-teal)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                </svg>
                            <?php endif; ?>
                        </div>
                    </div>

                    <h3 class="font-display text-display-m mb-3" style="color:var(--ink-primary)">
                        <?= $interest['title'] ?>
                    </h3>
                    <p class="text-body leading-relaxed mb-6" style="color:var(--ink-secondary)">
                        <?= $interest['description'] ?>
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mt-auto">
                        <?php foreach($interest['tags'] as $tag): ?>
                            <span class="badge"><?= $tag ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 transition-colors duration-300" style="background:var(--bg-base); border-top:1px solid var(--hairline)">
        <div class="max-w-[1200px] mx-auto px-6 md:px-12">

            <div class="section-header">
                <span class="section-header__label">Sect / Skills</span>
                <div class="section-header__line"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                <!-- Technical Skills -->
                <div>
                    <p class="font-mono text-label uppercase mb-8" style="color:var(--ink-secondary)">Technical</p>
                    <div class="flex flex-wrap gap-4">
                        <?php foreach ($data['skills'] as $skill): ?>
                        <div class="card-base flex flex-col items-center justify-center w-28 h-28 p-4 group">
                            <img src="<?= $skill['logo'] ?>" alt="<?= $skill['name'] ?>" class="h-10 w-10 mb-2 grayscale group-hover:grayscale-0 transition-all duration-200">
                            <span class="font-mono text-label text-center" style="color:var(--ink-secondary)"><?= $skill['name'] ?></span>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Editing Skills -->
                <div>
                    <p class="font-mono text-label uppercase mb-8" style="color:var(--ink-secondary)">Design & Editing</p>
                    <div class="flex flex-wrap gap-4">
                        <?php foreach ($data['editing_skills'] as $skill): ?>
                        <div class="card-base flex flex-col items-center justify-center w-28 h-28 p-4 group">
                            <img src="<?= $skill['logo'] ?>" alt="<?= $skill['name'] ?>" class="h-10 w-10 mb-2 grayscale group-hover:grayscale-0 transition-all duration-200">
                            <span class="font-mono text-label text-center" style="color:var(--ink-secondary)"><?= $skill['name'] ?></span>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-24 transition-colors duration-300" style="background:var(--bg-surface)">
        <div class="max-w-[1200px] mx-auto px-6 md:px-12">

            <div class="section-header">
                <span class="section-header__label">Sect / Projects</span>
                <div class="section-header__line"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($data['projects'] as $index => $project): ?>
                <div onclick="openProjectModal(<?= $index ?>)"
                     onkeydown="if(event.key==='Enter'||event.key===' '){openProjectModal(<?= $index ?>)}"
                     tabindex="0" role="button"
                     aria-label="Lihat detail proyek <?= htmlspecialchars($project['title']) ?>"
                     class="card-base cursor-pointer group flex flex-col">
                    <!-- Preview Image -->
                    <div class="h-44 relative overflow-hidden" style="border-radius:10px 10px 0 0">
                        <?php if (isset($project['preview_image'])): ?>
                            <img src="<?= $project['preview_image'] ?>" alt="<?= $project['title'] ?>" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                        <?php else: ?>
                            <div class="absolute inset-0" style="background:var(--hairline)"></div>
                        <?php endif; ?>
                        <!-- simple dark scrim, no heavy gradient -->
                        <div class="absolute inset-0" style="background:linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)"></div>
                        <h3 class="absolute bottom-3 left-4 right-4 font-display text-display-m text-white leading-tight"><?= $project['title'] ?></h3>
                    </div>

                    <div class="p-5 flex flex-col flex-1">
                        <p class="text-body line-clamp-3 mb-4 flex-1" style="color:var(--ink-secondary)"><?= $project['description'] ?></p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <?php foreach ($project['tech_stack'] as $tech): ?>
                                <span class="badge"><?= $tech ?></span>
                            <?php endforeach; ?>
                        </div>

                        <span class="font-mono text-label flex items-center gap-1 transition-colors duration-150" style="color:var(--ink-secondary)">
                            Lihat Detail
                            <svg class="w-3 h-3 transition-transform duration-150 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </span>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Project Modal -->
    <div id="projectModal" class="fixed inset-0 z-[60] hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen p-4">
            <!-- Backdrop: solid overlay, no blur -->
            <div class="fixed inset-0" style="background:rgba(0,0,0,0.72)" aria-hidden="true" onclick="closeProjectModal()"></div>

            <!-- Modal Panel -->
            <div class="relative w-full max-w-4xl flex flex-col md:flex-row max-h-[88vh] overflow-hidden"
                 style="background:var(--bg-surface); border:1px solid var(--hairline); border-radius:10px">

                <!-- Close Button -->
                <button onclick="closeProjectModal()"
                        class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-btn transition-colors duration-150 focus-visible:outline focus-visible:outline-2"
                        style="border:1px solid var(--hairline); color:var(--ink-secondary); background:var(--bg-surface)"
                        aria-label="Close modal">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

                <!-- Image Gallery (Left) -->
                <div class="w-full md:w-1/2 relative h-56 md:h-auto group flex items-center justify-center overflow-hidden"
                     style="background:var(--bg-base)">
                    <img id="modalImage" src="" alt="Project Screenshot" class="w-full h-full object-cover transition-opacity duration-200">

                    <!-- Carousel Controls -->
                    <button id="prevBtn" onclick="changeSlide(-1)"
                            class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-btn opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-150"
                            style="background:var(--bg-surface); border:1px solid var(--hairline); color:var(--ink-primary)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button id="nextBtn" onclick="changeSlide(1)"
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-btn opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-150"
                            style="background:var(--bg-surface); border:1px solid var(--hairline); color:var(--ink-primary)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>

                    <!-- Dots -->
                    <div id="modalGalleryNav" class="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5"></div>
                </div>

                <!-- Content (Right) -->
                <div class="w-full md:w-1/2 p-7 flex flex-col overflow-y-auto">
                    <h3 id="modalTitle" class="font-display text-display-m mb-2" style="color:var(--ink-primary)">Project Title</h3>
                    <div id="modalTags" class="flex flex-wrap gap-2 mb-5"></div>

                    <p id="modalDescription" class="text-body leading-relaxed flex-1" style="color:var(--ink-secondary)">
                        Project description goes here...
                    </p>

                    <div class="mt-6 pt-5" style="border-top:1px solid var(--hairline)">
                        <a id="modalLink" href="#" target="_blank" class="btn-primary w-full justify-center">
                            Kunjungi Website
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pass PHP data to JS -->
    <script>
        const projectsData = <?= json_encode($data['projects']) ?>;
    </script>
    <script src="script.js"></script>

    <!-- Contact Section -->
    <section id="contact" class="py-24 transition-colors duration-300" style="background:var(--bg-base); border-top:1px solid var(--hairline)">
        <div class="max-w-[1200px] mx-auto px-6 md:px-12">

            <div class="section-header">
                <span class="section-header__label">Sect / Contact</span>
                <div class="section-header__line"></div>
            </div>

            <div class="max-w-xl">
                <h2 class="font-display text-display-l mb-4" style="color:var(--ink-primary)">Let's Work Together</h2>
                <p class="text-body mb-8" style="color:var(--ink-secondary)">
                    Saat ini saya tersedia untuk pekerjaan freelance dan terbuka untuk peluang baru.
                    Jika Anda memiliki proyek yang membutuhkan sentuhan kreatif, beri tahu saya.
                </p>

                <div class="flex flex-wrap gap-3 mb-12">
                    <a href="mailto:<?= $data['profile']['email'] ?>" class="btn-primary">
                        Say Hello
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>
                </div>

                <div class="flex gap-4">
                    <?php foreach ($data['profile']['socials'] as $platform => $link): ?>
                    <a href="<?= $link ?>" target="_blank" rel="noopener"
                       class="w-10 h-10 flex items-center justify-center rounded-btn transition-colors duration-150 focus-visible:outline focus-visible:outline-2"
                       style="border:1px solid var(--hairline); color:var(--ink-secondary)"
                       onmouseover="this.style.borderColor='var(--signal-amber)';this.style.color='var(--signal-amber)'"
                       onmouseout="this.style.borderColor='var(--hairline)';this.style.color='var(--ink-secondary)'">
                        <span class="sr-only"><?= ucfirst($platform) ?></span>
                        <?php if ($platform === 'linkedin'): ?>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"/></svg>
                        <?php elseif ($platform === 'instagram'): ?>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>
                        <?php endif; ?>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>

            <footer class="mt-20 pt-8" style="border-top:1px solid var(--hairline)">
                <p class="font-mono text-label" style="color:var(--ink-secondary)">&copy; <?= date('Y') ?> <?= $data['profile']['name'] ?>. All rights reserved.</p>
            </footer>
        </div>
    </section>
</body>
</html>
