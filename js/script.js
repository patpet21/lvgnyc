// ===== SIDEBAR TOGGLE & COLLAPSE =====
const sidebar = document.querySelector('#sidebar');
const mainWrapper = document.querySelector('#main-wrapper');
const header = document.querySelector('#header');
const toggleBtn = document.querySelector('#toggle-sidebar');
const menuIcon = document.querySelector('#menu-icon');
const sidebarOverlay = document.querySelector('#sidebar-overlay');
const closeSidebarIcon = document.querySelector('#close-sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

console.log('Fantasy NYC Script loaded - Collapsible Sidebar Version');

// Toggle sidebar collapse (Desktop only)
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        console.log('Toggle button clicked');
        sidebar.classList.toggle('collapsed');
        mainWrapper.classList.toggle('collapsed');
        header.classList.toggle('collapsed');
    });
}

// Open/close sidebar (Mobile)
if (menuIcon) {
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Menu icon cliccato');
        if (sidebar.classList.contains('active')) {
            closeSidebarMobile();
        } else {
            openSidebarMobile();
        }
    });
}

function openSidebarMobile() {
    console.log('Sidebar mobile aperta');
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    menuIcon.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebarMobile() {
    console.log('Sidebar mobile chiusa');
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    menuIcon.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (closeSidebarIcon) {
    closeSidebarIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Close icon cliccato');
        closeSidebarMobile();
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        console.log('Overlay cliccato');
        closeSidebarMobile();
    });
}

// Click su link nella sidebar - chiude su mobile
if (sidebarLinks && sidebarLinks.length > 0) {
    sidebarLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            console.log('Link cliccato:', index, link.href);
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    closeSidebarMobile();
                }, 100);
            }
        });
    });
}

// ESC key per chiudere sidebar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
        console.log('ESC premuto - chiudo sidebar');
        closeSidebarMobile();
    }
});

// Chiudi sidebar quando si ridimensiona la finestra
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeSidebarMobile();
    }
});

// ===== SCROLL SECTIONS ACTIVE LINK =====
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.sidebar-menu a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 200;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            let currentLink = document.querySelector('.sidebar-menu a[href*="#' + id + '"]');
            if (currentLink) {
                currentLink.classList.add('active');
                currentLink.style.color = 'var(--main-color)';
            }
        }
    });

    // ===== STICKY HEADER =====
    let headerEl = document.querySelector('.header');
    if (headerEl) {
        if (window.scrollY > 100) {
            headerEl.classList.add('sticky');
        } else {
            headerEl.classList.remove('sticky');
        }
    }
};

// ===== DARK MODE =====
let darkModeIcon = document.querySelector('#darkMode-icon');

if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        console.log('Dark mode toggle');
        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');
        
        // Salva preferenza nel localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    };
}

// Carica preferenza dark mode al caricamento
window.addEventListener('DOMContentLoaded', () => {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeIcon) {
            darkModeIcon.classList.add('bx-sun');
        }
    }
});

// ===== SCROLL REVEAL =====
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    ScrollReveal().reveal('.hero-badge', { origin: 'top', duration: 800 });
    ScrollReveal().reveal('.hero-title', { origin: 'left', duration: 1000, delay: 200 });
    ScrollReveal().reveal('.hero-subtitle', { origin: 'left', duration: 1000, delay: 300 });
    ScrollReveal().reveal('.hero-stats', { origin: 'bottom', duration: 1000, delay: 400 });
    ScrollReveal().reveal('.hero-cta', { origin: 'bottom', duration: 1000, delay: 500 });
    ScrollReveal().reveal('.social-links', { origin: 'bottom', duration: 1000, delay: 600 });
    
    ScrollReveal().reveal('.section-label', { origin: 'top' });
    ScrollReveal().reveal('.section-title', { origin: 'top', delay: 200 });
    ScrollReveal().reveal('.service-card', { origin: 'bottom', interval: 100 });
    ScrollReveal().reveal('.portfolio-card', { origin: 'bottom', interval: 100 });
    ScrollReveal().reveal('.testimonial-card', { origin: 'bottom', interval: 100 });
    ScrollReveal().reveal('.about-highlights', { origin: 'bottom' });
    
    console.log('ScrollReveal inizializzato');
}

// ===== SMOOTH SCROLL LINK FIX =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero-accent');
    const scrollPosition = window.scrollY;
    
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Formspree handles everything
        console.log('Form submitted');
    });
}

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== ADD ACTIVE CLASS TO SIDEBAR LINKS =====
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-menu a').forEach(l => {
            l.style.color = 'var(--text-color)';
        });
        this.style.color = 'var(--main-color)';
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

console.log('✨ Fantasy NYC Design Loaded Successfully!');