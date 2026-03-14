// ===== ZEROVECTOR Lightweight Language Switcher =====
// Standalone script for pages that don't use the full app.js

(function () {
    const STORAGE_KEY = 'zv-lang';

    const translations = {
        'zh-TW': {
            langText: '簡中',
            // Nav
            backToMain: '返回主站',
            // Page header
            pageTitle: '提交案件',
            pageSubtitle: '填寫以下資料，我們將在 24 小時內與您聯繫',
            // Form sections
            basicInfo: '基本資料',
            caseInfo: '案件資料',
            // Labels
            labelName: '您的姓名 *',
            labelEmail: '聯絡郵箱 *',
            labelPhone: '聯絡電話',
            labelType: '受害類型 *',
            labelAmount: '涉案金額（USD）',
            labelChain: '涉案鏈（可多選）',
            labelPolice: '是否已向警方報案？',
            labelDescription: '事件經過 *',
            labelTransaction: '涉案地址或交易 Hash',
            // Placeholders
            phName: '請輸入您的姓名',
            phEmail: '請輸入您的電子郵件',
            phPhone: '選填，方便我們電話聯繫',
            phAmount: '例：50000',
            phDescription: '請詳細描述事件經過、時間線、涉案金額、受害過程等關鍵信息...',
            phTransaction: '0x1234...\nTxHash: 0xabcd...\n（可填寫多個地址或交易哈希）',
            // Options
            typeSelect: '請選擇受害類型',
            typeScam: '詐騙（Scam）',
            typeHack: '被盜（Hack）',
            typeRug: 'Rug Pull',
            typeExchange: '交易所凍結',
            typeOther: '其他',
            policeSelect: '請選擇',
            policeYes: '是',
            policeNo: '否',
            policePending: '準備中',
            // Chains
            chainEth: 'Ethereum (ETH)',
            chainBsc: 'BSC / BNB Chain',
            chainSol: 'Solana (SOL)',
            chainTron: 'TRON (TRX)',
            chainBtc: 'Bitcoin (BTC)',
            chainOther: '其他',
            // Submit
            submitBtn: '提交案件',
            submitting: '提交中...',
            // Success
            successTitle: '案件已提交',
            successMsg: '您的案件申請已成功送出。我們已為您生成案件編號：',
            successEmail: '確認信息將發送至',
            successNote: '我們的專業團隊將在 24 小時內通過郵件聯繫您，評估案件並制定追回方案。',
            newCase: '提交新案件',
        },
        'zh-CN': {
            langText: 'EN',
            backToMain: '返回主站',
            pageTitle: '提交案件',
            pageSubtitle: '填写以下资料，我们将在 24 小时内与您联系',
            basicInfo: '基本资料',
            caseInfo: '案件资料',
            labelName: '您的姓名 *',
            labelEmail: '联系邮箱 *',
            labelPhone: '联系电话',
            labelType: '受害类型 *',
            labelAmount: '涉案金额（USD）',
            labelChain: '涉案链（可多选）',
            labelPolice: '是否已向警方报案？',
            labelDescription: '事件经过 *',
            labelTransaction: '涉案地址或交易 Hash',
            phName: '请输入您的姓名',
            phEmail: '请输入您的电子邮件',
            phPhone: '选填，方便我们电话联系',
            phAmount: '例：50000',
            phDescription: '请详细描述事件经过、时间线、涉案金额、受害过程等关键信息...',
            phTransaction: '0x1234...\nTxHash: 0xabcd...\n（可填写多个地址或交易哈希）',
            typeSelect: '请选择受害类型',
            typeScam: '诈骗（Scam）',
            typeHack: '被盗（Hack）',
            typeRug: 'Rug Pull',
            typeExchange: '交易所冻结',
            typeOther: '其他',
            policeSelect: '请选择',
            policeYes: '是',
            policeNo: '否',
            policePending: '准备中',
            chainEth: 'Ethereum (ETH)',
            chainBsc: 'BSC / BNB Chain',
            chainSol: 'Solana (SOL)',
            chainTron: 'TRON (TRX)',
            chainBtc: 'Bitcoin (BTC)',
            chainOther: '其他',
            submitBtn: '提交案件',
            submitting: '提交中...',
            successTitle: '案件已提交',
            successMsg: '您的案件申请已成功送出。我们已为您生成案件编号：',
            successEmail: '确认信息将发送至',
            successNote: '我们的专业团队将在 24 小时内通过邮件联系您，评估案件并制定追回方案。',
            newCase: '提交新案件',
        },
        'en': {
            langText: '中文',
            backToMain: 'Back',
            pageTitle: 'Submit a Case',
            pageSubtitle: 'Fill in the details below and we will contact you within 24 hours',
            basicInfo: 'Basic Information',
            caseInfo: 'Case Details',
            labelName: 'Your Name *',
            labelEmail: 'Contact Email *',
            labelPhone: 'Phone Number',
            labelType: 'Incident Type *',
            labelAmount: 'Amount Involved (USD)',
            labelChain: 'Blockchain(s) Involved',
            labelPolice: 'Have you filed a police report?',
            labelDescription: 'Incident Description *',
            labelTransaction: 'Transaction Hash / Address',
            phName: 'Enter your full name',
            phEmail: 'Enter your email address',
            phPhone: 'Optional, for phone follow-up',
            phAmount: 'e.g. 50000',
            phDescription: 'Please describe the incident in detail: timeline, amount, how it happened...',
            phTransaction: '0x1234...\nTxHash: 0xabcd...\n(Multiple addresses or hashes accepted)',
            typeSelect: 'Select incident type',
            typeScam: 'Scam / Fraud',
            typeHack: 'Hack / Theft',
            typeRug: 'Rug Pull',
            typeExchange: 'Exchange Freeze',
            typeOther: 'Other',
            policeSelect: 'Select',
            policeYes: 'Yes',
            policeNo: 'No',
            policePending: 'In Progress',
            chainEth: 'Ethereum (ETH)',
            chainBsc: 'BSC / BNB Chain',
            chainSol: 'Solana (SOL)',
            chainTron: 'TRON (TRX)',
            chainBtc: 'Bitcoin (BTC)',
            chainOther: 'Other',
            submitBtn: 'Submit Case',
            submitting: 'Submitting...',
            successTitle: 'Case Submitted',
            successMsg: 'Your case has been submitted. Your case number is:',
            successEmail: 'Confirmation will be sent to',
            successNote: 'Our team will contact you within 24 hours to assess your case and develop a recovery plan.',
            newCase: 'Submit Another Case',
        }
    };

    let currentLang = localStorage.getItem(STORAGE_KEY) || 'zh-TW';

    function applyLang(lang) {
        const t = translations[lang];
        if (!t) return;
        currentLang = lang;

        // Update lang button
        const langTextEl = document.getElementById('langText');
        if (langTextEl) langTextEl.textContent = t.langText;

        // Update document lang attribute
        document.documentElement.lang = lang;

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) el.textContent = t[key];
        });

        // Update all data-i18n-placeholder elements
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
        });
    }

    function toggleLang() {
        let next;
        if (currentLang === 'zh-TW') next = 'zh-CN';
        else if (currentLang === 'zh-CN') next = 'en';
        else next = 'zh-TW';
        localStorage.setItem(STORAGE_KEY, next);
        applyLang(next);
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Apply language on load
        applyLang(currentLang);

        // Bind toggle button
        const btn = document.getElementById('langToggle');
        if (btn) btn.addEventListener('click', toggleLang);

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });
        }

        // Set current year
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
})();
