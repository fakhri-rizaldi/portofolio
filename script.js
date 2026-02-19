// Theme Toggle Logic
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

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
                badge.className = 'text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md';
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
});
