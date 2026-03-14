// ===== ZEROVECTOR Web3 Professional JavaScript =====

// ===== Blockchain Tracing Network Animation =====
// Visual: Wallet nodes + transaction edges + tracing particles moving along paths
const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initNetwork(); });

// ── Node: represents a wallet address ──
class WalletNode {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.18;
        this.vy = (Math.random() - 0.5) * 0.18;
        // node type: 0=normal wallet, 1=hub(exchange), 2=flagged
        this.type = Math.random() < 0.12 ? 1 : Math.random() < 0.08 ? 2 : 0;
        this.r = this.type === 1 ? 4.5 : this.type === 2 ? 3.5 : 2.5;
        this.pulse = Math.random() * Math.PI * 2; // pulse phase
        this.pulseSpeed = 0.025 + Math.random() * 0.02;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        this.pulse += this.pulseSpeed;
    }
    draw() {
        const glow = 0.7 + 0.3 * Math.sin(this.pulse);
        const color = this.type === 2 ? [255, 100, 80] : [0, 212, 255];
        const [r,g,b] = color;

        // Outer glow ring (hub nodes)
        if (this.type !== 0) {
            const pulsedR = this.r + 3 * Math.sin(this.pulse);
            ctx.beginPath();
            ctx.arc(this.x, this.y, pulsedR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.15 * glow})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Node core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.75 * glow})`;
        ctx.fill();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.6 * glow})`;
        ctx.fill();
    }
}

// ── Tracer: moves along an edge (simulates investigation tracing a transaction) ──
class Tracer {
    constructor(from, to) {
        this.from = from; this.to = to;
        this.t = 0;
        this.speed = 0.003 + Math.random() * 0.004;
        this.done = false;
        this.tail = [];
        this.maxTail = 14;
    }
    update() {
        this.t += this.speed;
        if (this.t >= 1) { this.done = true; return; }
        const x = this.from.x + (this.to.x - this.from.x) * this.t;
        const y = this.from.y + (this.to.y - this.from.y) * this.t;
        this.tail.push({x, y});
        if (this.tail.length > this.maxTail) this.tail.shift();
    }
    draw() {
        if (this.tail.length < 2) return;
        for (let i = 1; i < this.tail.length; i++) {
            const alpha = (i / this.tail.length) * 0.85;
            const width = (i / this.tail.length) * 2.5;
            ctx.beginPath();
            ctx.moveTo(this.tail[i-1].x, this.tail[i-1].y);
            ctx.lineTo(this.tail[i].x, this.tail[i].y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
        // Bright head
        const head = this.tail[this.tail.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();
    }
}

// ── Network state ──
const NODE_COUNT = window.innerWidth < 768 ? 22 : 38;
let nodes = [], edges = [], tracers = [];
const EDGE_DIST = 200;

function initNetwork() {
    nodes = Array.from({length: NODE_COUNT}, () => new WalletNode());
    edges = [];
    // Build edges: connect nodes within distance at init
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            if (Math.sqrt(dx*dx + dy*dy) < EDGE_DIST) {
                edges.push([i, j]);
            }
        }
    }
}
initNetwork();

// Spawn tracers periodically
let tracerTimer = 0;
function spawnTracer() {
    if (nodes.length < 2) return;
    const a = Math.floor(Math.random() * nodes.length);
    let b = Math.floor(Math.random() * nodes.length);
    while (b === a) b = Math.floor(Math.random() * nodes.length);
    tracers.push(new Tracer(nodes[a], nodes[b]));
    if (tracers.length > 25) tracers.shift();
}

function drawEdges() {
    for (const [i, j] of edges) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > EDGE_DIST * 1.8) continue; // skip if nodes drifted too far
        const opacity = Math.max(0, (1 - dist / (EDGE_DIST * 1.6)) * 0.12);
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(26,108,246,${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
    }
}

// ── Main animation loop ──
function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & draw edges
    drawEdges();

    // Update nodes
    nodes.forEach(n => { n.update(); n.draw(); });

    // Update tracers
    tracers = tracers.filter(t => !t.done);
    tracers.forEach(t => { t.update(); t.draw(); });

    // Spawn new tracer
    tracerTimer++;
    if (tracerTimer > 55) { spawnTracer(); tracerTimer = 0; }

    requestAnimationFrame(animate);
}
animate();

// ===== Language Toggle =====
function detectLang() {
    var saved = localStorage.getItem('zv-lang');
    if (saved) return saved;
    var bl = (navigator.language || navigator.languages && navigator.languages[0] || 'zh-TW').toLowerCase();
    if (bl.startsWith('zh-tw') || bl.startsWith('zh-hk') || bl.startsWith('zh-hant')) return 'zh-TW';
    if (bl.startsWith('zh')) return 'zh-CN';
    return 'en';
}
let currentLang = detectLang();

const translations = {
    'zh-TW': {
        langText: '簡中',
        // Products section
        products: {
            title: '產品矩陣',
            subtitle: '三大核心產品 · 全方位守護',
            sealr: {
                name: 'Sealr',
                tagline: 'Web3資產監控終端',
                description: '下一代 Web3 原生唯讀資產監控 iOS App，非託管、零私鑰',
                features: [
                    '多鏈資產聚合監控',
                    '毫秒級交易推送',
                    '智能風險預警',
                    '生物識別鎖定'
                ],
                tags: ['iOS App', '免費/Pro'],
                btnText: '前往官網'
            },
            ctis: {
                name: 'ZeroVector CTIS',
                tagline: '加密貨幣威脅情報系統',
                description: '專業級加密貨幣威脅情報分析與犯罪追蹤平台（面向執法機構）',
                features: [
                    '地址風險評估與AI研判',
                    '案件全生命週期管理',
                    '多部門協同辦案',
                    'UTXO關聯分析'
                ],
                tags: ['企業級', '執法專用']
            },
            threat: {
                name: 'CryptoThreat Intelligence',
                tagline: '鏈上威脅情報社群',
                description: 'AI驅動的虛擬貨幣威脅分析與情報共享社群平台',
                features: [
                    '實時鏈上監控',
                    '智能合約安全掃描',
                    '黑客畫像系統',
                    '攻擊圖譜分析'
                ],
                tags: ['社群', '情報共享']
            }
        }
    },
    'zh-CN': {
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
    // Cycle through languages: zh-TW -> zh-CN -> en -> zh-TW
    if (currentLang === 'zh-TW') {
        currentLang = 'zh-CN';
    } else if (currentLang === 'zh-CN') {
        currentLang = 'en';
    } else {
        currentLang = 'zh-TW';
    }

    document.getElementById('langText').textContent = translations[currentLang].langText;
    localStorage.setItem('zv-lang', currentLang);

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-zh-tw], [data-zh-cn], [data-zh], [data-en]');
    elements.forEach(element => {
        let value;

        // Try language-specific attributes first
        if (currentLang === 'zh-TW') {
            value = element.getAttribute('data-zh-tw') || element.getAttribute('data-zh');
        } else if (currentLang === 'zh-CN') {
            value = element.getAttribute('data-zh-cn') || element.getAttribute('data-zh');
        } else {
            value = element.getAttribute('data-en');
        }

        if (!value) return;

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

    // Update document language
    if (currentLang === 'zh-TW') {
        document.documentElement.lang = 'zh-TW';
    } else if (currentLang === 'zh-CN') {
        document.documentElement.lang = 'zh-CN';
    } else {
        document.documentElement.lang = 'en';
    }
}

const _langToggleEl = document.getElementById('langToggle'); if (_langToggleEl) _langToggleEl.addEventListener('click', toggleLanguage);

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
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
}

// ===== Smooth Scroll (auto nav-height offset) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
        if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
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
// ===== Nav Highlight (IntersectionObserver — accurate) =====
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink(id) {
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color = isActive ? '#00d4ff' : '';
        link.style.fontWeight = isActive ? '600' : '';
    });
}

// Observe all sections AND the #contact div
const observeTargets = document.querySelectorAll('section[id], div[id="contact"]');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActiveLink(entry.target.getAttribute('id'));
        }
    });
}, {
    rootMargin: '-88px 0px -60% 0px',  // trigger when section top enters nav-bottom zone
    threshold: 0
});

observeTargets.forEach(el => navObserver.observe(el));

// Also highlight immediately on click (before scroll settles)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.getAttribute('href').replace('#', '');
        setActiveLink(targetId);
    });
});

function highlightNavigation() {} // kept for compatibility

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) contactForm.addEventListener('submit', (e) => {
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

});

// ===== Set Current Year in Footer =====
const _yearEl = document.getElementById('currentYear'); if (_yearEl) _yearEl.textContent = new Date().getFullYear();

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
    // Apply saved language on page load (shared via localStorage across all pages)
    if (currentLang !== 'zh-TW') {
        const elements = document.querySelectorAll('[data-zh-tw], [data-zh-cn], [data-zh], [data-en]');
        elements.forEach(element => {
            let value;
            if (currentLang === 'zh-CN') {
                value = element.getAttribute('data-zh-cn') || element.getAttribute('data-zh');
            } else {
                value = element.getAttribute('data-en');
            }
            if (!value) return;
            if (element.tagName === 'OPTION') {
                element.textContent = value;
            } else if (!element.children.length || element.classList.contains('lang-text')) {
                element.textContent = value;
            } else {
                element.setAttribute('data-translated', 'true');
                element.textContent = value;
            }
        });
        const langTextEl = document.getElementById('langText');
        if (langTextEl) langTextEl.textContent = translations[currentLang].langText;
    }

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
