// --- Animasi GSAP & ScrollTrigger Berkinerja Tinggi ---
let animationCtx;

function initGsapAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Penggunaan gsap.context() adalah kunci penting optimasi manajemen memori
    animationCtx = gsap.context(() => {
        
        // Animasi Reveal Dasar pada Scroll & load pertama
        gsap.from(".gsap-reveal", {
            y: 35,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Animasi Stagger pada Card Skills saat masuk viewport
        // Animasi Muncul untuk Wadah Marquee Skills
        gsap.from("#skills-grid", {
            scrollTrigger: {
                trigger: "#skills-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            clearProps: "all"
        });

        // Animasi Stagger pada Project Cards
        gsap.from("#projects-grid .gsap-stagger-card", {
            scrollTrigger: {
                trigger: "#projects-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Animasi Berurutan untuk Timeline Organisasi
        gsap.from(".gsap-timeline-item", {
            scrollTrigger: {
                trigger: "#organizations-timeline",
                start: "top 75%",
            },
            x: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        });

    });

    // Animasi Stagger pada Project Cards
        gsap.fromTo("#projects-grid .gsap-stagger-card", 
            { 
                y: 50, 
                opacity: 0 
            },
            {
                scrollTrigger: {
                    trigger: "#projects-grid",
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "transform,opacity" // Penting! Membersihkan style inline agar tidak macet
            }
        );
}
