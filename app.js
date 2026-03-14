// ===== ZEROVECTOR Web3 Professional JavaScript =====

// ===== Canvas Particle Network Animation =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80;
const connectionDistance = 120;
const mouse = { x: null, y: null, radius: 150 };

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse movement
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.2;
            this.vy -= Math.sin(angle) * force * 0.2;
        }

        // Limit velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 2) {
            this.vx = (this.vx / speed) * 2;
            this.vy = (this.vy / speed) * 2;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Draw connections
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                const opacity = (1 - distance / connectionDistance) * 0.3;
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
}

animate();

// ===== Language Toggle =====
let currentLang = 'zh';

const translations = {
    zh: {
        langText: 'EN',
        // Products section
        products: {
            title: '产品矩阵',
            subtitle: '三大核心产品 · 全方位守护',
            sealr: {
                name: 'Sealr',
                tagline: 'Web3资产监控终端',
                description: '下一代 Web3 原生只读资产监控 iOS App，非托管、零私钥',
                features: [
                    '多链资产聚合监控',
                    '毫秒级交易推送',
                    '智能风险预警',
                    '生物识别锁定'
                ],
                tags: ['iOS App', '免费/Pro'],
                btnText: '前往官网'
            },
            ctis: {
                name: 'ZeroVector CTIS',
                tagline: '加密货币威胁情报系统',
                description: '专业级加密货币威胁情报分析与犯罪追踪平台（面向执法机构）',
                features: [
                    '地址风险评估与AI研判',
                    '案件全生命周期管理',
                    '多部门协同办案',
                    'UTXO关联分析'
                ],
                tags: ['企业级', '执法专用']
            },
            threat: {
                name: 'CryptoThreat Intelligence',
                tagline: '链上威胁情报社区',
                description: 'AI驱动的虚拟货币威胁分析与情报共享社区平台',
                features: [
                    '实时链上监控',
                    '智能合约安全扫描',
                    '黑客画像系统',
                    '攻击图谱分析'
                ],
                tags: ['社区', '情报共享']
            }
        }
    },
    en: {
        langText: '中文',
        // Products section
        products: {
            title: 'Our Products',
            subtitle: 'Three Core Products · Comprehensive Protection',
            sealr: {
                name: 'Sealr',
                tagline: 'Web3 Asset Monitor Terminal',
                description: 'Next-gen Web3 native read-only asset monitoring iOS App, non-custodial, zero private keys',
                features: [
                    'Multi-chain Asset Aggregation',
                    'Millisecond Transaction Push',
                    'Smart Risk Alerts',
                    'Biometric Lock'
                ],
                tags: ['iOS App', 'Free/Pro'],
                btnText: 'Visit Website'
            },
            ctis: {
                name: 'ZeroVector CTIS',
                tagline: 'Crypto Threat Intelligence System',
                description: 'Professional crypto threat intelligence analysis and crime tracking platform (for law enforcement)',
                features: [
                    'Address Risk & AI Analysis',
                    'Full Case Lifecycle Management',
                    'Multi-department Collaboration',
                    'UTXO Correlation Analysis'
                ],
                tags: ['Enterprise', 'Law Enforcement']
            },
            threat: {
                name: 'CryptoThreat Intelligence',
                tagline: 'On-chain Threat Intel Community',
                description: 'AI-driven crypto threat analysis and intelligence sharing community platform',
                features: [
                    'Real-time Chain Monitor',
                    'Smart Contract Scanner',
                    'Hacker Profiles',
                    'Attack Atlas Analysis'
                ],
                tags: ['Community', 'Intel Sharing']
            }
        }
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    document.getElementById('langText').textContent = translations[currentLang].langText;

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(element => {
        const value = element.getAttribute(`data-${currentLang}`);

        if (element.tagName === 'OPTION') {
            element.textContent = value;
        } else if (element.tagName === 'TEXTAREA' && element.hasAttribute(`data-${currentLang}-placeholder`)) {
            element.setAttribute('placeholder', element.getAttribute(`data-${currentLang}-placeholder`));
        } else if (element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', value);
        } else {
            element.textContent = value;
        }
    });

    document.documentElement.lang = currentLang === 'zh' ? 'zh-HK' : 'en';
}

document.getElementById('langToggle').addEventListener('click', toggleLanguage);

// ===== Mobile Menu Toggle =====
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

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll to Top Button =====
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

// ===== Number Counter Animation =====
function animateCounter(element, target, duration = 2000, decimals = 0) {
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const current = target * easeOutQuad;

        if (decimals > 0) {
            element.textContent = current.toFixed(decimals);
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (decimals > 0) {
                element.textContent = target.toFixed(decimals);
            } else {
                element.textContent = target;
            }
        }
    }

    update();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');

            // Animate each stat number
            const statNumbers = document.querySelectorAll('.stat-number[data-target]');
            statNumbers.forEach((numberEl, index) => {
                const target = parseFloat(numberEl.getAttribute('data-target'));
                const hasDecimal = target % 1 !== 0;

                setTimeout(() => {
                    animateCounter(numberEl, target, 2000, hasDecimal ? 1 : 0);
                }, index * 100);
            });
        }
    });
}, { threshold: 0.3 });

// Observe the stats container
const statsContainer = document.querySelector('#home .grid');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// ===== Scroll-triggered Fade-in Animations =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(element => {
    fadeObserver.observe(element);
});

// ===== Active Navigation Highlighting =====
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
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#00d4ff';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = currentLang === 'zh'
        ? '<i class="fas fa-check mr-2"></i>提交成功！'
        : '<i class="fas fa-check mr-2"></i>Submitted Successfully!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    submitBtn.disabled = true;

    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);

    console.log('Form submitted - Data would be sent to server');
});

// ===== Set Current Year in Footer =====
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    }

    lastScroll = currentScroll;
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial navigation highlight
    highlightNavigation();

    // Console branding
    console.log('%c🔒 ZEROVECTOR', 'font-size: 24px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);');
    console.log('%c链上资产，我们守护 | Blockchain Asset Protection', 'font-size: 14px; color: #9ca3af;');
    console.log('%c🌐 zerovector.hk', 'font-size: 12px; color: #6b7280;');

    // Performance monitoring
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        if (pageLoadTime > 0) {
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }
    }
});

// ===== Prevent context menu on production (optional security) =====
// Uncomment if needed for production
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ===== Service Worker for PWA (optional) =====
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js').catch(err => {
    //     console.log('Service Worker registration failed:', err);
    // });
}
