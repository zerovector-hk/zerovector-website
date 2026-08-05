# ZEROVECTOR 官网 v2（RegTech 品牌重构版）

基于 **Astro 7** 的静态站点，按《UI 整体方案 v1.0》（`../docs/design/ui-redesign-proposal-v1.html`）实现。

## 当前状态：P1 —— 三语新首页

- `/` 繁体中文（默认）· `/cn/` 简体中文 · `/en/` English
- Logo 方向 A（ORIGIN 原点基准），Hero 文案 H-1「讓虛擬資產，經得起審視。」
- 已实现板块：导航 / Hero / 信任条 / 核心服务（含公共部门「仅限港·陆」标注）/ 产品（Sealr 最新状态）/ 技术与方法 / 服务范围声明 / 关于与联络 / 页脚
- 已按方案移除：合作伙伴板块、追回流程叙事、粒子动效、Font Awesome
- 字体全部自托管（@fontsource，内地可正常加载），无 Google Fonts 外链
- SEO：三语 hreflang、canonical、Organization JSON-LD、语义化标签

## 本地开发

```bash
cd site-v2
npm install
npm run dev      # http://localhost:4321
npm run build    # 产出 dist/
npm run preview  # 预览构建产物
```

## 目录结构

```
site-v2/
├── astro.config.mjs        # site: https://zerovector.hk
├── public/
│   ├── favicon.svg         # 新 favicon（深蓝底 + 原点标）
│   └── brand/              # Logo A 资产（深浅底 mark / 组合标）
├── src/
│   ├── styles/global.css   # 设计令牌 + 全部组件样式（唯一样式来源）
│   ├── content/            # 三语文案（zh-tw / zh-cn / en，单源结构）
│   ├── layouts/Base.astro  # head/SEO/导航/页脚
│   ├── components/Home.astro
│   └── pages/              # index + cn/ + en/
└── _deploy/github-pages.yml  # 上线切换用的 Actions 工作流（P3 再启用）
```

## 待办（P2 / P3）

- P2：服务四条线详情页、产品页、`/insights/`（研究与洞察）、咨询表单页、法务页换肤
- P3：`_deploy/github-pages.yml` 移入 `.github/workflows/`，Pages Source 切为 GitHub Actions；
  旧页面 301 映射（`recovery.html → /services/investigations/` 等）；更新 `sitemap.xml`、`llms.txt`、`og-card`
- 文案口径：`†` 标注的数据上线前需创始人确认（见方案第 10 节决策项 3/5）

## 规范

新增任何文案，先对照方案第 08 节「新旧措辞对照表」：不出现「追回 / 案件提交 / 黑客」等旧词；
涉及政府与执法机构的内容必须带「仅限香港特别行政区及中国内地」限定。
