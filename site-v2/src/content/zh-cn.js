export default {
  lang: 'zh-CN',
  htmlLang: 'zh-CN',
  path: '/cn/',
  meta: {
    title: 'ZEROVECTOR — 香港虚拟资产监管科技 | 区块链分析 · 资产安全 · 数字取证',
    description:
      'ZEROVECTOR 是总部位于香港的虚拟资产监管科技（RegTech）企业，提供区块链分析与调查、钱包与资产安全方案，以及可供司法程序使用的数字取证与专家报告。',
  },
  nav: {
    services: '服务',
    products: '产品',
    technology: '技术与方法',
    about: '关于',
    cta: '委托咨询',
    menuLabel: '打开菜单',
  },
  hero: {
    eyebrow: '香港 · 虚拟资产监管科技',
    h1: ['让虚拟资产，', '经得起审视。'],
    lead: 'ZEROVECTOR 以区块链分析、资产安全与数字取证三大能力，为企业、个人与公共机构提供以证据标准构建的专业技术服务。',
    cta1: '预约咨询评估',
    cta2: '了解我们的服务',
    ticker: ['正在追踪 0x4f3a…9e2c', '第 3 跳 · 跨链桥转移', '聚类归因完成 ✓'],
    chip: '已归因 ✓',
  },
  trust: [
    { num: '100+', label: '公链与资产覆盖' },
    { num: '法庭级', label: '取证报告标准' },
    { num: '7×24', label: '安全事件响应' },
    { num: '可复核', label: '分析方法论' },
  ],
  services: {
    title: '核心服务',
    sub: '从链上分析、资产安全到数字取证，以可复核的专业方法交付。',
    items: [
      {
        icon: 'graph',
        title: '链上分析与调查',
        desc: '交易图谱分析、资金流向研判与风险归因，以可复核的方法论支持尽职调查、事件响应与争议处理。',
      },
      {
        icon: 'lock',
        title: '钱包与资产安全',
        desc: '针对硬件钱包漏洞、签名机制与私钥管理风险，提供安全评估、应急响应与长期监控方案，覆盖个人持有者与企业金库。',
      },
      {
        icon: 'doc',
        title: '数字取证与专家报告',
        desc: '证据保全、链上取证分析与可供司法程序使用的专家报告及证人支持。',
      },
      {
        icon: 'gov',
        title: '公共部门技术支持',
        desc: '为香港特别行政区与中国内地的依法授权机构，提供技术能力建设、分析工具与案件协查支持。',
      },
    ],
  },
  products: {
    title: '产品',
    sub: '自研产品矩阵：从资产监控到链上情报与威胁协作。',
    items: [
      {
        name: 'Sealr',
        logo: { type: 'img', src: '/brand/products/sealr.png', fill: true },
        status: 'iOS 已上线 App Store · Android 即将推出',
        live: true,
        desc: '非托管钱包监控应用：零私钥、只读架构，钱包异动秒级推送，关键警报可穿透勿扰模式。面向冷钱包持有人、企业金库与多签管理者。',
        chains: 'BTC · ETH · BNB · Polygon · TRON · SOL',
        link: { text: '访问 sealr.io', href: 'https://sealr.io' },
      },
      {
        name: 'MerkleClaw',
        logo: { type: 'img', src: '/brand/products/merkleclaw.svg' },
        desc: 'AI 驱动的链上情报引擎：交易图谱构建、聚类归因与行为建模，面向企业与机构分析团队的桌面级分析平台。',
        link: { text: '访问 merkleclaw.com', href: 'https://merkleclaw.com' },
      },
      {
        name: 'ThreatLedger',
        logo: { type: 'img', src: '/brand/products/threatledger.svg', fill: true },
        desc: '威胁情报协作平台：风险地址库、事件情报与研究成果的结构化共享，连接安全研究者与机构用户。',
        link: { text: '访问 threatledger.net', href: 'https://threatledger.net' },
      },
    ],
  },
  tech: {
    title: '技术与方法',
    sub: '每一项结论，都以可复核的方法论支撑。',
    items: [
      { title: '交易图谱分析', desc: '跨链资金流向重建与聚类归因。' },
      { title: '行为建模', desc: '地址画像与异常行为识别。' },
      { title: '智能合约取证', desc: '合约交互与漏洞路径还原。' },
      { title: '证据工程', desc: '证据保全、链式保管与报告标准。' },
    ],
    note: '我们的分析遵循可复核原则：方法透明、过程留痕、结论可验证，并可依需要出具符合司法程序要求的报告。',
  },
  about: {
    title: '关于 ZEROVECTOR',
    body: [
      'ZEROVECTOR 是一家专注于虚拟资产安全的监管科技（RegTech）企业，以链上分析、资产安全与司法级数字取证为核心能力。我们深知去中心化带来自由，也带来风险——在这个匿名与透明并存的链上世界，我们为企业、个人与公共机构提供从事前防御、事中响应到事后取证的全周期技术支持。',
      '凭借香港国际金融中心的战略位置，我们深耕亚太并服务全球客户。“零向量”是坐标系的原点——我们致力于成为虚拟资产世界中立、可验证的专业参照系。',
    ],
    quote: '“技术为眼，证据为尺——在匿名世界重建可追责的信任。”',
  },
  contact: {
    title: '与我们的团队交流',
    desc: '无论您是企业、个人，还是公共机构，欢迎联系我们进行初步咨询评估。',
    emailLabel: '咨询邮箱',
    email: 'support@zerovector.hk',
    cta: '发送咨询邮件',
    responseNote: '一般于 1–2 个工作日内回复',
  },
  footer: {
    tagline: '总部位于香港的虚拟资产监管科技企业：区块链分析 · 资产安全 · 数字取证。',
    cols: [
      {
        title: '服务',
        links: [
          { text: '链上分析与调查', href: '#services' },
          { text: '钱包与资产安全', href: '#services' },
          { text: '数字取证与专家报告', href: '#services' },
          { text: '公共部门技术支持', href: '#services' },
        ],
      },
      {
        title: '产品',
        links: [
          { text: 'Sealr', href: 'https://sealr.io' },
          { text: 'MerkleClaw', href: 'https://merkleclaw.com' },
          { text: 'ThreatLedger', href: 'https://threatledger.net' },
        ],
      },
      {
        title: '公司',
        links: [
          { text: '关于我们', href: '#about' },
          { text: '委托咨询', href: '#contact' },
        ],
      },
    ],
    complianceNote: '合规提示：本公司不经营虚拟资产交易平台，不提供交易撮合、兑换、代币发行融资、托管或投资建议等在香港须持牌或在中国内地被法律禁止的服务。本网站内容不构成任何投资建议或投资邀约。',
    legal: [
      { text: '法律声明', href: '/cn/legal.html' },
      { text: '隐私政策', href: '/cn/privacy.html' },
      { text: '服务条款', href: '/cn/terms.html' },
    ],
    copyright: 'ZEROVECTOR LIMITED · 香港 · 版权所有',
  },
};
