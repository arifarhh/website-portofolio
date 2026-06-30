// --- Database Portofolio Dinamis (Skill tetap di sini, Projects & Organizations dari JSON) ---
const portfolioData = {
    skills: [
        { name: 'HTML5', icon: 'fa-brands fa-html5', color: 'text-orange-500' },
        { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: 'text-blue-500' },
        { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'text-yellow-500' },
        { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: 'text-cyan-400' },
        { name: 'Vue.js', icon: 'fa-brands fa-vuejs', color: 'text-emerald-500' },
        { name: 'GSAP', icon: 'fa-solid fa-wand-magic-sparkles', color: 'text-premiumBlue-500' },
        { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-600' },
        { name: 'Git & GitHub', icon: 'fa-brands fa-github', color: 'text-slate-800' }
    ],
    projects: [],
    organizations: []
};

// --- Fungsi untuk detect path relative ke folder data ---
function getDataPath(filename) {
    // Detect apakah halaman di folder pages atau root
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../data/' : 'data/';
    return basePath + filename;
}

// --- Fungsi Load Data dari JSON ---
async function loadPortfolioData() {
    try {
        // Fetch kedua file secara paralel
        const [projectsRes, orgsRes] = await Promise.all([
            fetch(getDataPath('projects.json')),
            fetch(getDataPath('organizations.json'))
        ]);

        // Parse JSON secara paralel
        const [projectsData, orgsData] = await Promise.all([
            projectsRes.json(),
            orgsRes.json()
        ]);

        portfolioData.projects = projectsData.projects;
        portfolioData.organizations = orgsData.organizations;

        console.log('✅ Portfolio data loaded successfully');
    } catch (error) {
        console.error('❌ Error loading portfolio data:', error);
    }
}
