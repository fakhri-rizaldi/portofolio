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
