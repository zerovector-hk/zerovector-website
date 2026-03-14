// ===== ZEROVECTOR Web3 Professional JavaScript =====

// ===== Blockchain Tracing Network Animation =====
// Wallet nodes with hex addresses + transaction edges with directional arrows
// + tracing highlight paths (ice-blue → red warning)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// ── Hex address generator ──
function randHex(n) {
    const h = '0123456789abcdef';
    let s = '';
    for (let i = 0; i < n; i++) s += h[Math.floor(Math.random() * 16)];
    return s;
}

// ── Node: wallet address ──
const NODE_COUNT = window.innerWidth < 768 ? 14 : 20;
const EDGE_DIST = window.innerWidth < 768 ? 180 : 240;
let nodes = [], edges = [], tracers = [], alertPaths = [];

class WalletNode {
    constructor(idx) {
        this.idx = idx;
        this.x = 60 + Math.random() * (canvas.width - 120);
        this.y = 60 + Math.random() * (canvas.height - 120);
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12;
        // type: 0=wallet, 1=exchange(hub), 2=flagged
        this.type = idx < 2 ? 1 : Math.random() < 0.1 ? 2 : 0;
        this.r = this.type === 1 ? 6 : this.type === 2 ? 5 : 3.5;
        this.addr = '0x' + randHex(4) + '…' + randHex(4);
        this.pulse = Math.random() * Math.PI * 2;
        this.showLabel = this.type !== 0; // only hubs/flagged show labels always
        this.labelAlpha = this.showLabel ? 0.6 : 0;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 40 || this.x > canvas.width - 40)  this.vx *= -1;
        if (this.y < 40 || this.y > canvas.height - 40) this.vy *= -1;
        this.pulse += 0.025;
        // Occasionally flash label on normal nodes
        if (!this.showLabel && Math.random() < 0.0008) {
            this.labelAlpha = 0.5;
        }
        if (this.labelAlpha > 0 && !this.showLabel) {
            this.labelAlpha -= 0.003;
        }
    }
    draw() {
        const glow = 0.7 + 0.3 * Math.sin(this.pulse);
        const isAlert = this.type === 2;
        const color = isAlert ? '255,80,68' : '0,212,255';

        // Glow ring for hub/flagged
        if (this.type !== 0) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r + 4 + 2 * Math.sin(this.pulse), 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(' + color + ',' + (0.12 * glow) + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + color + ',' + (0.7 * glow) + ')';
        ctx.fill();

        // Inner bright
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + (0.55 * glow) + ')';
        ctx.fill();

        // Address label
        if (this.labelAlpha > 0.01) {
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillStyle = 'rgba(0,212,255,' + this.labelAlpha + ')';
            ctx.textAlign = 'center';
            ctx.fillText(this.addr, this.x, this.y - this.r - 6);
        }
    }
}

// ── Edge drawing with arrow ──
function drawEdge(ax, ay, bx, by, alpha, color) {
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.strokeStyle = 'rgba(' + color + ',' + alpha + ')';
    ctx.lineWidth = 0.7;
    ctx.stroke();

    // Small directional arrow at 70% of edge
    if (alpha > 0.04) {
        const mx = ax + (bx - ax) * 0.7;
        const my = ay + (by - ay) * 0.7;
        const angle = Math.atan2(by - ay, bx - ax);
        const aLen = 5;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx - aLen * Math.cos(angle - 0.4), my - aLen * Math.sin(angle - 0.4));
        ctx.moveTo(mx, my);
        ctx.lineTo(mx - aLen * Math.cos(angle + 0.4), my - aLen * Math.sin(angle + 0.4));
        ctx.strokeStyle = 'rgba(' + color + ',' + (alpha * 1.5) + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }
}

// ── Tracer: light pulse traveling along a path ──
class Tracer {
    constructor(path, isAlert) {
        this.path = path; // array of node indices
        this.isAlert = isAlert;
        this.seg = 0;     // current segment index
        this.t = 0;       // progress within segment [0,1]
        this.speed = 0.006 + Math.random() * 0.004;
        this.done = false;
        this.tail = [];
        this.maxTail = 18;
    }
    update() {
        if (this.seg >= this.path.length - 1) { this.done = true; return; }
        this.t += this.speed;
        if (this.t >= 1) {
            this.t = 0;
            this.seg++;
            // Flash the reached node's label
            if (this.seg < this.path.length) {
                nodes[this.path[this.seg]].labelAlpha = 0.8;
            }
            if (this.seg >= this.path.length - 1) { this.done = true; return; }
        }
        const a = nodes[this.path[this.seg]];
        const b = nodes[this.path[this.seg + 1]];
        const x = a.x + (b.x - a.x) * this.t;
        const y = a.y + (b.y - a.y) * this.t;
        this.tail.push({x, y});
        if (this.tail.length > this.maxTail) this.tail.shift();
    }
    draw() {
        if (this.tail.length < 2) return;
        const color = this.isAlert ? '255,80,68' : '0,212,255';
        for (let i = 1; i < this.tail.length; i++) {
            const alpha = (i / this.tail.length) * 0.9;
            const width = (i / this.tail.length) * 2.8;
            ctx.beginPath();
            ctx.moveTo(this.tail[i-1].x, this.tail[i-1].y);
            ctx.lineTo(this.tail[i].x, this.tail[i].y);
            ctx.strokeStyle = 'rgba(' + color + ',' + alpha + ')';
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
        // Bright head
        const head = this.tail[this.tail.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.isAlert ? 'rgba(255,120,100,0.95)' : 'rgba(255,255,255,0.95)';
        ctx.fill();

        // Highlight the path edges behind the tracer
        for (let s = 0; s <= this.seg && s < this.path.length - 1; s++) {
            const a = nodes[this.path[s]];
            const b = nodes[this.path[s + 1]];
            const fade = s < this.seg ? 0.15 : 0.3;
            drawEdge(a.x, a.y, b.x, b.y, fade, color);
        }
    }
}

// ── Init network ──
function initNetwork() {
    nodes = Array.from({length: NODE_COUNT}, (_, i) => new WalletNode(i));
    edges = [];
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
window.addEventListener('resize', () => { resizeCanvas(); initNetwork(); });

// ── Random path finder (BFS-like, 3-6 hops) ──
function findRandomPath() {
    const start = Math.floor(Math.random() * nodes.length);
    const visited = new Set([start]);
    const path = [start];
    const hops = 3 + Math.floor(Math.random() * 4); // 3-6 hops
    for (let h = 0; h < hops; h++) {
        const curr = path[path.length - 1];
        const neighbors = [];
        for (const [a, b] of edges) {
            if (a === curr && !visited.has(b)) neighbors.push(b);
            if (b === curr && !visited.has(a)) neighbors.push(a);
        }
        if (neighbors.length === 0) break;
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        visited.add(next);
        path.push(next);
    }
    return path.length >= 3 ? path : null;
}

// ── Spawn tracers every 3-5 seconds ──
let spawnTimer = 0;
const SPAWN_INTERVAL = 180; // ~3 sec at 60fps

function spawnTracer() {
    const path = findRandomPath();
    if (!path) return;
    const isAlert = Math.random() < 0.25; // 25% chance of red alert trace
    tracers.push(new Tracer(path, isAlert));
    // Flash start node
    nodes[path[0]].labelAlpha = 0.9;
    if (tracers.length > 15) tracers.shift();
}

// ── Draw all static edges ──
function drawAllEdges() {
    for (const [i, j] of edges) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > EDGE_DIST * 2) continue;
        const alpha = Math.max(0, (1 - dist / (EDGE_DIST * 1.8)) * 0.08);
        drawEdge(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, alpha, '26,108,246');
    }
}

// ── Main loop ──
function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAllEdges();
    nodes.forEach(n => { n.update(); n.draw(); });

    tracers = tracers.filter(t => !t.done);
    tracers.forEach(t => { t.update(); t.draw(); });

    spawnTimer++;
    if (spawnTimer >= SPAWN_INTERVAL) {
        spawnTracer();
        spawnTimer = Math.floor(Math.random() * 60); // slight randomness
    }

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
