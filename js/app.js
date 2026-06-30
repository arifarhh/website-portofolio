// --- Bootstrapping Utama Halaman ---

window.onload = async function () {
    // Load data dari JSON
    await loadPortfolioData();

    // Render HTML Dinamis
    renderSkills();
    renderProjects();
    renderOrganizations();

    // Inisialisasi Mobile Menu
    initMobileMenu();

    // Inisialisasi GSAP
    initGsapAnimations();

    // TAMBAHKAN BARIS INI: Beritahu GSAP untuk kalkulasi ulang ukuran halaman
    ScrollTrigger.refresh(); 

    console.log('✅ Halaman berhasil dimuat');
};

// Menghindari kebocoran memori (memory leak) jika user meninggalkan halaman
window.onunload = function () {
    if (animationCtx) animationCtx.revert();
};
