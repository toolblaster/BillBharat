document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a, .nav-cta a, .floating-cta');
    const yearEl = document.getElementById('year');
    const floatingCta = document.querySelector('.floating-cta');

    // Update footer year
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Smooth scroll helper
    const smoothScrollTo = (hash) => {
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Handle navigation toggle for mobile
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
        });
    }

    // Smooth scrolling for anchor links
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const hash = link.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                event.preventDefault();
                smoothScrollTo(hash);
                body.classList.remove('nav-open');
            }
        });
    });

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('in-view'));
    }

    // Sticky navigation shadow toggle
    const handleNavState = () => {
        if (!nav) return;
        if (window.scrollY > 12) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Floating CTA visibility
    const handleFloatingCta = () => {
        if (!floatingCta) return;
        if (window.scrollY > 240) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', () => {
        handleNavState();
        handleFloatingCta();
    });

    handleNavState();
    handleFloatingCta();
});
