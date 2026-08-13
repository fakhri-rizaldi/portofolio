// Theme Toggle Logic
function toggleTheme() {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        root.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

window.toggleTheme = toggleTheme;

// Language Switcher Logic
let currentLang = localStorage.lang || 'id';

function switchLanguage(lang) {
    if (!portfolioData || !portfolioData[lang]) return;
    currentLang = lang;
    localStorage.lang = lang;

    const d = portfolioData[lang];

    // Update active button state
    const btnId = document.getElementById('lang-btn-id');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnId && btnEn) {
        if (lang === 'id') {
            btnId.className = 'px-2 py-0.5 text-xs font-mono rounded transition-colors font-bold';
            btnId.style.background = 'var(--signal-amber)';
            btnId.style.color = 'var(--bg-base)';
            btnEn.className = 'px-2 py-0.5 text-xs font-mono rounded transition-colors';
            btnEn.style.background = 'transparent';
            btnEn.style.color = 'var(--ink-secondary)';
        } else {
            btnEn.className = 'px-2 py-0.5 text-xs font-mono rounded transition-colors font-bold';
            btnEn.style.background = 'var(--signal-amber)';
            btnEn.style.color = 'var(--bg-base)';
            btnId.className = 'px-2 py-0.5 text-xs font-mono rounded transition-colors';
            btnId.style.background = 'transparent';
            btnId.style.color = 'var(--ink-secondary)';
        }
    }

    // Hero Text
    const statusEl = document.getElementById('heroStatus');
    const nameEl = document.getElementById('heroName');
    const titleEl = document.getElementById('heroTitle');
    const summaryEl = document.getElementById('heroSummary');
    const greetingEl = document.querySelector('[data-i18n="hero.greeting"]');

    if (statusEl) statusEl.innerText = d.profile.status;
    if (nameEl) nameEl.innerText = d.profile.name;
    if (titleEl) titleEl.innerText = d.profile.title;
    if (summaryEl) summaryEl.innerText = d.profile.summary;
    if (greetingEl) greetingEl.innerText = lang === 'en' ? 'Hello, I am' : 'Halo, saya';

    // CV Download Button & Link
    const cvBtn = document.getElementById('cvDownloadBtn');
    const cvBtnText = document.getElementById('cvBtnText');
    if (cvBtn) {
        cvBtn.href = d.profile.cv_file;
        cvBtn.setAttribute('download', d.profile.cv_file);
    }
    if (cvBtnText) cvBtnText.innerText = d.profile.cv_label;

    // Action Buttons
    const sayHelloText = document.getElementById('sayHelloText');
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    if (sayHelloText) sayHelloText.innerText = d.labels.say_hello;
    if (viewProjectsBtn) viewProjectsBtn.innerText = d.labels.view_projects;

    // Navigation Labels
    document.querySelectorAll('[data-i18n^="nav."]').forEach(el => {
        const key = el.getAttribute('data-i18n').replace('nav.', '');
        if (d.labels[key]) el.innerText = d.labels[key];
    });

    // Update Projects Grid
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && d.projects) {
        projectsGrid.innerHTML = d.projects.map((project, idx) => `
            <div onclick="openProjectModal(${idx})"
                 onkeydown="if(event.key==='Enter'||event.key===' '){openProjectModal(${idx})}"
                 tabindex="0" role="button"
                 aria-label="${lang === 'en' ? 'View project details' : 'Lihat detail proyek'} ${project.title}"
                 class="card-base cursor-pointer group flex flex-col">
                <div class="h-44 relative overflow-hidden" style="border-radius:10px 10px 0 0">
                    ${project.preview_image ? `<img src="${project.preview_image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">` : `<div class="absolute inset-0" style="background:var(--hairline)"></div>`}
                    <div class="absolute inset-0" style="background:linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)"></div>
                    <h3 class="absolute bottom-3 left-4 right-4 font-display text-display-m text-white leading-tight">${project.title}</h3>
                </div>
                <div class="p-5 flex flex-col flex-1">
                    <p class="text-body line-clamp-3 mb-4 flex-1" style="color:var(--ink-secondary)">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.tech_stack.map(tech => `<span class="badge">${tech}</span>`).join('')}
                    </div>
                    <span class="font-mono text-label flex items-center gap-1 transition-colors duration-150" style="color:var(--ink-secondary)">
                        ${lang === 'en' ? 'View Details' : 'Lihat Detail'}
                        <svg class="w-3 h-3 transition-transform duration-150 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </span>
                </div>
            </div>
        `).join('');
    }

    // Update Timeline (Experience & Education)
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer && d.experience && d.education) {
        const timeline = [];
        d.experience.forEach(e => {
            timeline.push({
                period: e.period,
                title: e.role,
                subtitle: e.company,
                description: e.description,
                type: e.type || 'experience'
            });
        });
        d.education.forEach(e => {
            timeline.push({
                period: e.period,
                title: e.degree,
                subtitle: e.institution,
                description: e.description || '',
                type: 'education'
            });
        });
        timeline.sort((a, b) => {
            const yB = (b.period.match(/\d{4}/) || [0])[0];
            const yA = (a.period.match(/\d{4}/) || [0])[0];
            return yB - yA;
        });

        timelineContainer.innerHTML = timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            const content = `
                <div class="card-base p-6 inline-block text-left w-full">
                    <span class="font-mono text-label uppercase" style="color:var(--signal-amber)">${item.period}</span>
                    <h3 class="font-display text-display-m mt-2 mb-1" style="color:var(--ink-primary)">${item.title}</h3>
                    <p class="font-mono text-label mb-3" style="color:var(--ink-secondary)">${item.subtitle}</p>
                    ${item.description ? `<p class="text-body" style="color:var(--ink-secondary)">${item.description}</p>` : ''}
                    <span class="badge mt-4">${item.type}</span>
                </div>
            `;

            return `
                <div class="relative flex flex-col md:flex-row md:items-start gap-0 md:gap-8 group">
                    <div class="hidden md:block md:w-1/2 ${isLeft ? 'pr-10 text-right' : ''}">
                        ${isLeft ? content : ''}
                    </div>
                    <div class="absolute left-[7px] md:left-1/2 top-6 -translate-x-1/2 z-10 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-125"
                         style="background:var(--bg-surface); border-color:var(--signal-amber)"></div>
                    <div class="pl-8 md:pl-0 md:w-1/2 ${!isLeft ? 'md:pl-10' : ''}">
                        <div class="md:hidden mb-4">${content}</div>
                        ${!isLeft ? `<div class="hidden md:block">${content}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update global projectsData for modal
    window.projectsData = d.projects;
}

window.switchLanguage = switchLanguage;

// Project Modal Logic
let currentProject = null;
let currentSlideIndex = 0;

function openProjectModal(index) {
    // projectsData must be defined in the main HTML file before this script runs
    if (typeof projectsData === 'undefined') {
        console.error('projectsData is not defined');
        return;
    }

    currentProject = projectsData[index];
    currentSlideIndex = 0;
    const modal = document.getElementById('projectModal');

    // Populate Text Data
    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDescription');
    const linkBtn = document.getElementById('modalLink');
    const tagsContainer = document.getElementById('modalTags');

    if (titleEl) titleEl.innerText = currentProject.title;
    if (descEl) descEl.innerText = currentProject.description;

    // Update link
    if (linkBtn) {
        if (currentProject.link && currentProject.link !== '#') {
            linkBtn.href = currentProject.link;
            linkBtn.innerHTML = `${currentLang === 'en' ? 'Visit Website' : 'Kunjungi Website'} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`;
            linkBtn.classList.remove('hidden');
        } else {
            linkBtn.classList.add('hidden');
        }
    }

    // Populate Tags
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        if (currentProject.tech_stack) {
            currentProject.tech_stack.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.innerText = tech;
                tagsContainer.appendChild(badge);
            });
        }
    }

    // Setup Carousel
    setupCarousel();

    // Show Modal
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function setupCarousel() {
    if (!currentProject) return;

    const hasScreenshots = currentProject.screenshots && currentProject.screenshots.length > 0;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navContainer = document.getElementById('modalGalleryNav');
    const imgElement = document.getElementById('modalImage');

    if (hasScreenshots) {
        // Show first image
        updateSlideImage();

        if (currentProject.screenshots.length > 1) {
            // Show controls
            if (prevBtn) prevBtn.classList.remove('hidden');
            if (nextBtn) nextBtn.classList.remove('hidden');
            if (navContainer) {
                navContainer.classList.remove('hidden');
                // Generate Dots
                navContainer.innerHTML = '';
                currentProject.screenshots.forEach((_, idx) => {
                    const dot = document.createElement('button');
                    dot.className = `w-2 h-2 rounded-full transition-all ${idx === 0 ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`;
                    dot.onclick = () => {
                        currentSlideIndex = idx;
                        updateSlideImage();
                    };
                    navContainer.appendChild(dot);
                });
            }
        } else {
            // Hide controls if only 1 image
            if (prevBtn) prevBtn.classList.add('hidden');
            if (nextBtn) nextBtn.classList.add('hidden');
            if (navContainer) navContainer.classList.add('hidden');
        }
    } else {
        // Fallback image
        if (imgElement) {
            imgElement.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentProject.title) + '&background=random&size=512';
        }
        if (prevBtn) prevBtn.classList.add('hidden');
        if (nextBtn) nextBtn.classList.add('hidden');
        if (navContainer) navContainer.classList.add('hidden');
    }
}

function changeSlide(direction) {
    if (!currentProject || !currentProject.screenshots) return;
    const total = currentProject.screenshots.length;
    currentSlideIndex = (currentSlideIndex + direction + total) % total;
    updateSlideImage();
}

function updateSlideImage() {
    const imgElement = document.getElementById('modalImage');
    const navContainer = document.getElementById('modalGalleryNav');

    if (!imgElement || !currentProject.screenshots) return;

    // Fade out
    imgElement.style.opacity = '0';

    setTimeout(() => {
        if (currentProject && currentProject.screenshots) {
            imgElement.src = currentProject.screenshots[currentSlideIndex];
            imgElement.style.opacity = '1';
        }
    }, 150); // Short delay for fade effect

    // Update Dots
    if (navContainer && navContainer.children.length > 0) {
        Array.from(navContainer.children).forEach((dot, idx) => {
            dot.className = `w-2 h-2 rounded-full transition-all ${idx === currentSlideIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`;
        });
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // Keyboard Navigation
    document.addEventListener('keydown', function (event) {
        const modal = document.getElementById('projectModal');
        // Only run logic if modal exists
        if (!modal) return;

        if (event.key === "Escape") {
            closeProjectModal();
        }

        // Arrow keys for carousel
        if (!modal.classList.contains('hidden')) {
            if (event.key === "ArrowLeft") changeSlide(-1);
            if (event.key === "ArrowRight") changeSlide(1);
        }
    });

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }

    // Initialize Language
    if (typeof switchLanguage === 'function') {
        switchLanguage(currentLang);
    }
});
