export default {
  lang: 'zh-TW',
  htmlLang: 'zh-TW',
  path: '/',
  meta: {
    title: 'ZEROVECTOR — 香港虛擬資產監管科技 | 區塊鏈分析 · 法律諮詢 · 資產安全',
    description:
      'ZEROVECTOR 是總部位於香港的虛擬資產監管科技（RegTech）企業，提供區塊鏈分析與調查、數字資產法律諮詢、錢包與資產安全方案，以及可供司法程序使用的數字取證與專家報告。',
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
    lead: 'ZEROVECTOR 以區塊鏈分析、法律諮詢與資產安全三大能力，為企業、個人與公共機構提供以證據標準構建的專業技術服務。',
    cta1: '預約諮詢評估',
    cta2: '了解我們的服務',
    artCaption: 'tx-graph · attribution path',
  },
  trust: [
    { num: '100+', label: '公鏈與資產覆蓋 †' },
    { num: '法庭級', label: '取證報告標準' },
    { num: '7×24', label: '安全事件響應' },
    { num: '可複核', label: '分析方法論' },
  ],
  services: {
    eyebrow: 'Services',
    title: '核心服務',
    sub: '從鏈上分析、法律諮詢到資產安全與取證，以可複核的專業方法交付。',
    items: [
      {
        icon: 'graph',
        title: '鏈上分析與調查',
        desc: '交易圖譜分析、資金流向研判與風險歸因，以可複核的方法論支持盡職調查、事件響應與爭議處理。',
      },
      {
        icon: 'scale',
        title: '數字資產法律諮詢',
        desc: '圍繞數字資產的持有、處置與爭議場景提供合規評估與技術支持，並與律師團隊協作，準備法律程序所需的意見與證據材料。',
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
    eyebrow: 'Products',
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
    eyebrow: 'Methodology',
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
    eyebrow: 'About',
    title: '關於 ZEROVECTOR',
    body: [
      'ZEROVECTOR LIMITED 是總部位於香港的虛擬資產監管科技（RegTech）企業，專注區塊鏈分析、數字資產法律諮詢、資產安全與數字取證，將技術創新與法律專業相結合。',
      '「零向量」是坐標系的原點——一切度量由此出發。我們致力於為虛擬資產世界提供一個中立、可驗證的專業參照系：讓每一筆鏈上活動都能被專業地分析、合規地處理、以證據標準呈現。',
    ],
    facts: [
      { b: 'ZEROVECTOR LIMITED', s: '香港註冊' },
      { b: '監管科技 RegTech', s: '行業定位' },
      { b: '繁中 · 简中 · EN', s: '三語服務' },
      { b: 'zerovector.hk', s: '官方網站' },
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
    tagline: '總部位於香港的虛擬資產監管科技企業：區塊鏈分析 · 法律諮詢 · 資產安全。',
    cols: [
      {
        title: '服務',
        links: [
          { text: '鏈上分析與調查', href: '#services' },
          { text: '數字資產法律諮詢', href: '#services' },
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
    statsNote: '† 覆蓋範圍等能力數據以正式委託與服務協議載明口徑為準。',
    legal: [
      { text: '法律聲明', href: '/legal.html' },
      { text: '私隱政策', href: '/privacy.html' },
      { text: '服務條款', href: '/terms.html' },
    ],
    copyright: 'ZEROVECTOR LIMITED · 香港 · 版權所有',
  },
};
