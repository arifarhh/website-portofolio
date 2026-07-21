// --- Fungsi Rendering Dinamis ---
function renderSkills() {
    const container = document.getElementById('skills-grid');

    // Gandakan array skills agar putaran marquee terlihat menyambung tanpa batas
    const doubleSkills = [...portfolioData.skills, ...portfolioData.skills];

    const skillsHTML = doubleSkills.map(skill => `
        <div class="flex-shrink-0 w-36 bg-white border border-slate-150 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center cursor-pointer">
            <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl mb-4 ${skill.color}">
                <i class="${skill.icon}"></i>
            </div>
            <h4 class="font-semibold text-slate-800 text-sm font-display">${skill.name}</h4>
        </div>
    `).join('');

    // Ubah pembungkus utama (hilangkan layout grid, ganti dengan overflow-hidden)
    container.className = "overflow-hidden relative w-full py-4";

    // Masukkan ke dalam div .marquee-track beserta jarak antar card (gap-6)
    container.innerHTML = `
        <div class="marquee-track gap-6">
            ${skillsHTML}
        </div>
    `;
}

// State untuk melacak apakah semua proyek ditampilkan
let isShowingAllProjects = false;
let isShowingAllOrganizations = false; 

function renderProjects() {
    const container = document.getElementById('projects-grid');
    const btnShowMore = document.getElementById('btn-show-more');
    
    // Tentukan jumlah maksimal yang tampil di awal (misal: 2 proyek)
    const initialCount = 2;
    
    // Potong array data berdasarkan state
    const projectsToShow = isShowingAllProjects 
        ? portfolioData.projects 
        : portfolioData.projects.slice(0, initialCount);

    // Set layout dasar grid 12 kolom untuk Bento UI
    container.className = "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8";

    container.innerHTML = projectsToShow.map((proj, index) => {
        // Logika Asimetris (Bento Grid):
        // Jika index genap (0, 2, 4): pakai 7 kolom (lebih lebar)
        // Jika index ganjil (1, 3, 5): pakai 5 kolom (lebih sempit)
        // Kita juga bisa membuat pola selang-seling yang lebih kompleks dengan modulo 4
        let colSpan = index % 4 === 0 || index % 4 === 3 
            ? "md:col-span-7" 
            : "md:col-span-5";

        return `
        <a href="pages/project-detail.html?id=${proj.id}" class="${colSpan} gsap-stagger-card bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-shadow duration-300 flex flex-col h-full group cursor-pointer">
            <div class="h-48 bg-gradient-to-tr from-premiumBlue-900 to-premiumBlue-500 p-6 flex flex-col justify-between relative overflow-hidden text-white">
                <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-lg"></div>
                <span class="px-3 py-1 rounded-full bg-white/20 text-white font-medium text-xs backdrop-blur-md self-start">Project</span>
                <div class="text-4xl opacity-80"><i class="fa-solid fa-layer-group"></i></div>
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold font-display text-premiumBlue-900 mb-2 group-hover:text-premiumBlue-700 transition-colors">${proj.title}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed mb-6">${proj.description}</p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${proj.tags.map(t => `<span class="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600 font-medium text-xs">${t}</span>`).join('')}
                    </div>
                    <div class="inline-flex items-center gap-2 text-premiumBlue-600 group-hover:text-premiumBlue-800 font-semibold text-sm transition-colors">
                        Lihat Detail <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </a>
        `;
    }).join('');

    // Update tampilan tombol
    if (btnShowMore) {
        if (isShowingAllProjects) {
            btnShowMore.innerHTML = `Tampilkan Lebih Sedikit <i class="fa-solid fa-chevron-up"></i>`;
        } else {
            btnShowMore.innerHTML = `Lihat Semua Proyek <i class="fa-solid fa-chevron-down"></i>`;
        }
        
        // Sembunyikan tombol jika total proyek memang sedikit (kurang dari initialCount)
        if (portfolioData.projects.length <= initialCount) {
            btnShowMore.style.display = 'none';
        }
    }

    // Refresh ScrollTrigger karena tinggi DOM berubah
    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 100);
    }
}

// Fungsi yang dipanggil saat tombol di-klik
function toggleProjects() {
    isShowingAllProjects = !isShowingAllProjects;
    
    // Render ulang kontennya
    renderProjects();
    
    // Jalankan ulang animasi masuk perlahan agar terlihat interaktif
    if (typeof gsap !== 'undefined') {
        gsap.fromTo("#projects-grid .gsap-stagger-card", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", clearProps: "all" }
        );
    }
}

function toggleOrganizations() {
    isShowingAllOrganizations = !isShowingAllOrganizations;
    
    // Render ulang kontennya
    renderOrganizations();
    
    // Jalankan ulang animasi masuk perlahan agar terlihat interaktif
    if (typeof gsap !== 'undefined') {
        gsap.fromTo("#organizations-grid .gsap-stagger-card", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", clearProps: "all" }
        );
    }
}

function renderOrganizations() {
    const container = document.getElementById('organizations-grid');
    const btnShowMore = document.getElementById('btn-show-more-orgs');

    if (!container) return;
    
    // Tentukan jumlah yang ingin ditampilkan di awal
    const initialCount = 2;
    
    // Logika pemotongan data
    const orgsToShow = isShowingAllOrganizations 
        ? portfolioData.organizations 
        : portfolioData.organizations.slice(0, initialCount);

    // Satu kartu per baris agar pengalaman organisasi tersusun memanjang ke bawah.
    container.className = 'space-y-6';
    container.innerHTML = orgsToShow.map(org => `
        <article class="gsap-stagger-card relative overflow-hidden rounded-2xl border border-slate-150 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-premiumBlue-500 to-premiumBlue-900"></div>
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div class="min-w-0">
                    <h3 class="font-display text-xl font-bold text-premiumBlue-900">${org.role}</h3>
                    <h4 class="mt-1 text-sm font-semibold text-slate-500">${org.entity}</h4>
                </div>
                <span class="w-fit shrink-0 rounded-full border border-premiumBlue-100 bg-premiumBlue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-premiumBlue-600">${org.period}</span>
            </div>
            <p class="mt-5 max-w-3xl text-sm leading-relaxed text-slate-500">${org.description}</p>
        </article>
    `).join('');

    // Update teks tombol
    if (btnShowMore) {
        btnShowMore.innerHTML = isShowingAllOrganizations 
            ? `Tampilkan Lebih Sedikit <i class="fa-solid fa-chevron-up"></i>` 
            : `Lihat Semua Organisasi <i class="fa-solid fa-chevron-down"></i>`;
        
        // Sembunyikan tombol jika data tidak mencukupi
        btnShowMore.style.display = (portfolioData.organizations.length <= initialCount) ? 'none' : 'block';
    }

    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 100);
    }
}

// --- Fungsi Menyalin ke Clipboard dengan UI Toast ---
function copyToClipboard(text) {
    // fallback support iFrame
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Memunculkan Toast cantik
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.innerText = `Email ${text} berhasil disalin!`;
    
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}

// --- Menu Mobile Drawer Control ---
function initMobileMenu() {
    const btnOpen = document.getElementById('mobile-menu-btn');
    const btnClose = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        drawer.classList.toggle('translate-x-full');
    }

    btnOpen.addEventListener('click', toggleMenu);
    btnClose.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', toggleMenu));
}


