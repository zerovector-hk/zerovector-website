// Language Toggle
let currentLang = 'zh';

const translations = {
    zh: {
        langText: 'EN',
        addressDisplay: 'addressZh'
    },
    en: {
        langText: '中文',
        addressDisplay: 'addressEn'
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';

    // Update language button text
    document.getElementById('langText').textContent = translations[currentLang].langText;

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(element => {
        if (element.tagName === 'OPTION') {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        } else if (element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', element.getAttribute(`data-${currentLang}`));
        } else {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        }
    });

    // Update address display
    document.getElementById('addressZh').classList.toggle('hidden');
    document.getElementById('addressEn').classList.toggle('hidden');

    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'zh' ? 'zh-HK' : 'en';
}

// Language Toggle Button Event
document.getElementById('langToggle').addEventListener('click', toggleLanguage);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = currentLang === 'zh'
        ? '<i class="fas fa-check mr-2"></i>发送成功！'
        : '<i class="fas fa-check mr-2"></i>Sent Successfully!';
    submitBtn.classList.add('bg-green-500');
    submitBtn.disabled = true;

    // Reset form after 2 seconds
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.classList.remove('bg-green-500');
        submitBtn.disabled = false;
    }, 2000);

    // In production, you would send this to your backend
    console.log('Form submitted:', Object.fromEntries(formData));
});

// Set Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-cyan-400');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-cyan-400');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statCards = entry.target.querySelectorAll('.stat-card');

            setTimeout(() => {
                statCards.forEach((card, index) => {
                    const number = card.querySelector('.text-4xl');
                    if (number) {
                        const text = number.textContent;
                        if (text.includes('B+')) {
                            animateCounter(number, 10);
                            setTimeout(() => {
                                number.textContent = '10B+';
                            }, 2000);
                        } else if (text.includes('50+')) {
                            animateCounter(number, 50);
                            setTimeout(() => {
                                number.textContent = '50+';
                            }, 2000);
                        } else if (text.includes('24/7')) {
                            number.textContent = '24/7';
                        } else if (text.includes('98%')) {
                            animateCounter(number, 98);
                            setTimeout(() => {
                                number.textContent = '98%';
                            }, 2000);
                        }
                    }
                });
            }, 300);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('#home .grid');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// Typing Effect for Hero Title (Optional Enhancement)
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Prevent form submission on Enter key in text inputs (except textarea)
document.querySelectorAll('.form-input:not(textarea)').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            // Don't add loading state for anchor links
            return;
        }

        const original = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' +
                        (currentLang === 'zh' ? '加载中...' : 'Loading...');
        this.style.pointerEvents = 'none';

        setTimeout(() => {
            this.innerHTML = original;
            this.style.pointerEvents = 'auto';
        }, 1500);
    });
});

// Easter egg: Konami code for fun effect
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Prefetch images on hover
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
            const prefetch = document.createElement('link');
            prefetch.rel = 'prefetch';
            prefetch.href = href;
            document.head.appendChild(prefetch);
        }
    });
});

// Console message for developers
console.log('%c🔒 ZEROVECTOR LIMITED', 'font-size: 20px; font-weight: bold; color: #22d3ee;');
console.log('%c专业区块链安全技术服务', 'font-size: 14px; color: #9ca3af;');
console.log('%cWebsite: zerovector.hk', 'font-size: 12px; color: #6b7280;');

// Service Worker Registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js').then(reg => {
    //     console.log('Service Worker registered:', reg);
    // }).catch(err => {
    //     console.log('Service Worker registration failed:', err);
    // });
}

// Performance monitoring
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in to hero elements
    setTimeout(() => {
        document.querySelector('#home .animate-fade-in')?.classList.add('visible');
    }, 100);

    // Trigger initial navigation highlight
    highlightNavigation();
});
