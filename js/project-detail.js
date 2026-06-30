// --- Project Detail Page Logic ---

// Get project ID from URL parameter
function getProjectIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Find project by ID
function findProjectById(id) {
    return portfolioData.projects.find(proj => proj.id === id);
}

// Render project detail
function renderProjectDetail() {
    const projectId = getProjectIdFromURL();
    const project = findProjectById(projectId);

    const loadingEl = document.getElementById('loading');
    const detailEl = document.getElementById('project-detail');
    const errorEl = document.getElementById('error');

    if (!project) {
        loadingEl.classList.add('hidden');
        errorEl.classList.remove('hidden');
        return;
    }

    // Populate data
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-short-desc').textContent = project.shortDesc;
    document.getElementById('project-image').src = project.image;
    document.getElementById('project-image').alt = project.title;
    document.getElementById('project-full-desc').innerHTML = project.fullDescription
        .split('\n')
        .map(para => `<p>${para}</p>`)
        .join('');
    
    document.getElementById('project-status').textContent = project.status;
    document.getElementById('project-duration').textContent = project.duration;
    document.getElementById('project-team').textContent = project.teamSize;

    // Render features
    const featuresHtml = project.features
        .map(feature => `
            <li class="flex gap-3 items-start">
                <span class="text-premiumBlue-500 mt-1"><i class="fa-solid fa-check"></i></span>
                <span class="text-slate-600">${feature}</span>
            </li>
        `)
        .join('');
    document.getElementById('project-features').innerHTML = featuresHtml;

    // Render tags
    const tagsHtml = project.tags
        .map(tag => `<span class="px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 font-medium text-sm">${tag}</span>`)
        .join('');
    document.getElementById('project-tags').innerHTML = tagsHtml;

    // Render links
    const linksHtml = project.links
        .map(link => `
            <a href="${link.url}" target="_blank" class="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-premiumBlue-50 border border-slate-200 hover:border-premiumBlue-300 transition-colors group">
                <i class="fa-solid ${link.icon} text-premiumBlue-600 group-hover:text-premiumBlue-700"></i>
                <span class="text-slate-700 group-hover:text-premiumBlue-700 font-semibold text-sm">${link.title}</span>
                <i class="fa-solid fa-arrow-up-right ml-auto text-slate-400 group-hover:text-premiumBlue-600 text-xs"></i>
            </a>
        `)
        .join('');
    document.getElementById('project-links').innerHTML = linksHtml;

    // Render related projects
    const relatedProjects = portfolioData.projects
        .filter(p => p.id !== projectId)
        .slice(0, 2);
    
    const relatedHtml = relatedProjects
        .map(proj => `
            <a href="project-detail.html?id=${proj.id}" class="group bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full">
                <div class="h-40 bg-gradient-to-tr from-premiumBlue-900 to-premiumBlue-500 p-6 flex flex-col justify-between relative overflow-hidden text-white">
                    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-lg"></div>
                    <span class="px-3 py-1 rounded-full bg-white/20 text-white font-medium text-xs backdrop-blur-md self-start">Project</span>
                    <div class="text-3xl opacity-80"><i class="fa-solid fa-layer-group"></i></div>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold font-display text-premiumBlue-900 mb-2">${proj.title}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed line-clamp-2">${proj.description}</p>
                    <div class="mt-4 text-premiumBlue-600 font-semibold text-sm group-hover:text-premiumBlue-800 transition-colors">
                        Lihat Proyek <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </a>
        `)
        .join('');
    document.getElementById('related-projects').innerHTML = relatedHtml;

    // Update page title
    document.title = `${project.title} | Farhah`;

    // Hide loading, show content
    loadingEl.classList.add('hidden');
    detailEl.classList.remove('hidden');

    // Add entrance animation
    gsap.from("#project-detail", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
    });
}

// Tunggu data dimuat, kemudian render
window.onload = async function () {
    await loadPortfolioData();
    renderProjectDetail();
};
