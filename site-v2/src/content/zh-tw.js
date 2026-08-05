export default {
  lang: 'zh-TW',
  htmlLang: 'zh-TW',
  path: '/',
  meta: {
    title: 'ZEROVECTOR — 香港虛擬資產監管科技 | 區塊鏈分析 · 資產安全 · 數字取證',
    description:
      'ZEROVECTOR 是總部位於香港的虛擬資產監管科技（RegTech）企業，提供區塊鏈分析與調查、錢包與資產安全方案，以及可供司法程序使用的數字取證與專家報告。',
  },
  nav: {
    services: '服務',
    products: '產品',
    technology: '技術與方法',
    about: '關於',
    cta: '委託諮詢',
    menuLabel: '開啟選單',
  },
  hero: {
    eyebrow: '香港 · 虛擬資產監管科技',
    h1: ['讓虛擬資產，', '經得起審視。'],
    lead: 'ZEROVECTOR 以區塊鏈分析、資產安全與數字取證三大能力，為企業、個人與公共機構提供以證據標準構建的專業技術服務。',
    cta1: '預約諮詢評估',
    cta2: '了解我們的服務',
    ticker: ['正在追蹤 0x4f3a…9e2c', '第 3 跳 · 跨鏈橋轉移', '聚類歸因完成 ✓'],
    chip: '已歸因 ✓',
  },
  trust: [
    { num: '100+', label: '公鏈與資產覆蓋' },
    { num: '法庭級', label: '取證報告標準' },
    { num: '7×24', label: '安全事件響應' },
    { num: '可複核', label: '分析方法論' },
  ],
  services: {
    title: '核心服務',
    sub: '從鏈上分析、資產安全到數字取證，以可複核的專業方法交付。',
    items: [
      {
        icon: 'graph',
        title: '鏈上分析與調查',
        desc: '交易圖譜分析、資金流向研判與風險歸因，以可複核的方法論支持盡職調查、事件響應與爭議處理。',
      },
      {
        icon: 'lock',
        title: '錢包與資產安全',
        desc: '針對硬件錢包漏洞、簽名機制與私鑰管理風險，提供安全評估、應急響應與長期監控方案，覆蓋個人持有者與企業金庫。',
      },
      {
        icon: 'doc',
        title: '數字取證與專家報告',
        desc: '證據保全、鏈上取證分析與可供司法程序使用的專家報告及證人支持。',
      },
      {
        icon: 'gov',
        title: '公共部門技術支持',
        desc: '為香港特別行政區與中國內地的依法授權機構，提供技術能力建設、分析工具與案件協查支持。',
      },
    ],
  },
  products: {
    title: '產品',
    sub: '自研產品矩陣：從資產監控到鏈上情報與威脅協作。',
    items: [
      {
        name: 'Sealr',
        logo: { type: 'img', src: '/brand/products/sealr.png', fill: true },
        status: 'iOS 已上線 App Store · Android 即將推出',
        live: true,
        desc: '非託管錢包監控應用：零私鑰、只讀架構，錢包異動秒級推送，關鍵警報可穿透勿擾模式。面向冷錢包持有人、企業金庫與多簽管理者。',
        chains: 'BTC · ETH · BNB · Polygon · TRON · SOL',
        link: { text: '造訪 sealr.io', href: 'https://sealr.io' },
      },
      {
        name: 'MerkleClaw',
        logo: { type: 'img', src: '/brand/products/merkleclaw.svg' },
        desc: 'AI 驅動的鏈上情報引擎：交易圖譜構建、聚類歸因與行為建模，面向企業與機構分析團隊的桌面級分析平台。',
        link: { text: '造訪 merkleclaw.com', href: 'https://merkleclaw.com' },
      },
      {
        name: 'ThreatLedger',
        logo: { type: 'img', src: '/brand/products/threatledger.svg', fill: true },
        desc: '威脅情報協作平台：風險地址庫、事件情報與研究成果的結構化共享，連接安全研究者與機構用戶。',
        link: { text: '造訪 threatledger.net', href: 'https://threatledger.net' },
      },
    ],
  },
  tech: {
    title: '技術與方法',
    sub: '每一項結論，都以可複核的方法論支撐。',
    items: [
      { title: '交易圖譜分析', desc: '跨鏈資金流向重建與聚類歸因。' },
      { title: '行為建模', desc: '地址畫像與異常行為識別。' },
      { title: '智能合約取證', desc: '合約交互與漏洞路徑還原。' },
      { title: '證據工程', desc: '證據保全、鏈式保管與報告標準。' },
    ],
    note: '我們的分析遵循可複核原則：方法透明、過程留痕、結論可驗證，並可依需要出具符合司法程序要求的報告。',
  },
  about: {
    title: '關於 ZEROVECTOR',
    body: [
      'ZEROVECTOR 是一家專注於虛擬資產安全的監管科技（RegTech）企業，以鏈上分析、資產安全與司法級數字取證為核心能力。我們深知去中心化帶來自由，也帶來風險——在這個匿名與透明並存的鏈上世界，我們為企業、個人與公共機構提供從事前防禦、事中響應到事後取證的全周期技術支持。',
      '憑藉香港國際金融中心的戰略位置，我們深耕亞太並服務全球客戶。「零向量」是坐標系的原點——我們致力於成為虛擬資產世界中立、可驗證的專業參照系。',
    ],
    quote: '「技術為眼，證據為尺——在匿名世界重建可追責的信任。」',
    facts: [
      { b: '網路安全專家', s: '豐富的威脅情報與鏈上溯源經驗' },
      { b: '區塊鏈工程師', s: '深耕鏈上數據分析與智能合約審計，精通各類公鏈協議與 DeFi 生態' },
      { b: '合規與取證顧問', s: '精通跨境電子取證程序與證據標準，確保過程合法合規、產出符合法庭要求' },
    ],
  },
  contact: {
    title: '與我們的團隊交流',
    desc: '無論您是企業、個人，還是公共機構，歡迎聯繫我們進行初步諮詢評估。',
    emailLabel: '諮詢郵箱',
    email: 'support@zerovector.hk',
    cta: '發送諮詢郵件',
    responseNote: '一般於 1–2 個工作日內回覆',
  },
  footer: {
    tagline: '總部位於香港的虛擬資產監管科技企業：區塊鏈分析 · 資產安全 · 數字取證。',
    cols: [
      {
        title: '服務',
        links: [
          { text: '鏈上分析與調查', href: '#services' },
          { text: '錢包與資產安全', href: '#services' },
          { text: '數字取證與專家報告', href: '#services' },
          { text: '公共部門技術支持', href: '#services' },
        ],
      },
      {
        title: '產品',
        links: [
          { text: 'Sealr', href: 'https://sealr.io' },
          { text: 'MerkleClaw', href: 'https://merkleclaw.com' },
          { text: 'ThreatLedger', href: 'https://threatledger.net' },
        ],
      },
      {
        title: '公司',
        links: [
          { text: '關於我們', href: '#about' },
          { text: '委託諮詢', href: '#contact' },
        ],
      },
    ],
    complianceNote: '合規提示：本公司不經營虛擬資產交易平台，不提供交易撮合、兌換、代幣發行融資、託管或投資建議等於香港須持牌或於中國內地被法律禁止之服務。本網站內容不構成任何投資建議或投資邀約。',
    legal: [
      { text: '法律聲明', href: '/legal.html' },
      { text: '私隱政策', href: '/privacy.html' },
      { text: '服務條款', href: '/terms.html' },
    ],
    copyright: 'ZEROVECTOR LIMITED · 香港 · 版權所有',
  },
};
