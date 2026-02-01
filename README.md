# 🌐 網站核心模板

一個基於 Astro 的 SEO 優化內容網站模板，專為 AdSense 收益和問句式 SEO 設計。

## ✨ 特色

- 🚀 **極速載入** - Astro 靜態輸出，100% HTML
- 🔍 **SEO 優化** - 自動 Meta、Open Graph、Schema 標記
- 💰 **AdSense 整合** - 多版位廣告元件
- 📊 **Analytics** - GA4 追蹤整合
- 📑 **自動目錄** - 文章 TOC 自動生成
- ❓ **FAQ Schema** - 結構化問答資料
- 🎨 **Tailwind CSS** - 快速客製化樣式
- 📱 **響應式設計** - 完美支援手機
- 🛠 **互動工具** - 今日經文、禱告產生器等

## 🚀 快速開始

```bash
# 1. 複製模板
gh repo create my-site --template username/site-template

# 2. 進入專案
cd my-site

# 3. 安裝依賴
npm install

# 4. 修改設定
# 編輯 site.config.ts（網站名稱、AdSense ID、GA4 ID 等）

# 5. 啟動開發
npm run dev

# 6. 部署到 Vercel
vercel --prod
```

## 📁 目錄結構

```
site-template/
├── src/
│   ├── components/          # 可重用元件
│   │   ├── SEO.astro        # SEO Meta 標籤
│   │   ├── AdSense.astro    # 廣告元件
│   │   ├── Analytics.astro  # GA4 追蹤
│   │   ├── TableOfContents.astro  # 文章目錄
│   │   ├── FAQSchema.astro  # FAQ 結構化資料
│   │   ├── Header.astro     # 網站頭部
│   │   ├── Footer.astro     # 網站底部
│   │   ├── ShareButtons.astro    # 分享按鈕
│   │   └── RelatedPosts.astro    # 相關文章
│   │
│   ├── layouts/             # 頁面版型
│   │   ├── BaseLayout.astro      # 基礎版型
│   │   └── ArticleLayout.astro   # 文章版型
│   │
│   ├── pages/               # 網站頁面
│   │   ├── index.astro      # 首頁
│   │   ├── posts/[slug].astro    # 文章頁
│   │   ├── category/[category].astro  # 分類頁
│   │   └── tools/           # 工具頁面
│   │
│   ├── content/             # 內容
│   │   ├── config.ts        # 內容設定
│   │   └── posts/           # Markdown 文章
│   │
│   └── styles/
│       └── global.css       # 全域樣式
│
├── public/                  # 靜態檔案
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
│
├── scripts/                 # 自動化腳本
├── site.config.ts          # ⭐ 網站核心設定
├── astro.config.mjs        # Astro 設定
├── tailwind.config.js      # Tailwind 設定
└── package.json
```

## ⚙️ 網站設定

編輯 `site.config.ts` 來客製化你的網站：

```typescript
export const siteConfig = {
  // 基本資訊
  name: "你的網站名稱",
  description: "網站描述",
  url: "https://你的網域",
  
  // AdSense
  adsense: {
    clientId: "ca-pub-XXXXXXXX",  // 你的 AdSense ID
    slots: { ... }
  },
  
  // Analytics
  analytics: {
    measurementId: "G-XXXXXXXX",  // 你的 GA4 ID
  },
  
  // 分類
  categories: [ ... ],
  
  // 社群連結
  social: { ... },
};
```

## 📝 新增文章

在 `src/content/posts/` 建立 Markdown 檔案：

```markdown
---
title: "如何開始讀聖經？初學者指南"
description: "想開始讀聖經卻不知從何下手？這篇完整指南教你..."
publishDate: 2025-01-31
category: "bible-study"
tags: ["讀經", "初學者", "聖經"]
image: "/images/posts/read-bible.jpg"
featured: true
faqs:
  - question: "讀聖經要從哪裡開始？"
    answer: "建議從新約的約翰福音開始..."
  - question: "每天要讀多少？"
    answer: "初學者建議每天讀一章..."
---

## 為什麼要讀聖經？

文章內容...

## 從哪裡開始？

文章內容...
```

### 文章結構建議

1. **標題 H1** - 問句形式
2. **目錄** - 自動生成
3. **故事開頭** - 100-150 字
4. **直接回答** - 50-80 字
5. **H2 段落** - 各 200-300 字
6. **FAQ** - 3-5 個問答
7. **結語** - 呼籲行動

## 🛠 開發指令

```bash
npm run dev      # 開發模式 (localhost:4321)
npm run build    # 建置生產版本
npm run preview  # 預覽建置結果
```

## 🚀 部署

### Vercel（推薦）

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 設定 Google Search Console

1. 進入 [Google Search Console](https://search.google.com/search-console)
2. 新增網站資源
3. 驗證擁有權
4. 提交 Sitemap：`https://你的網域/sitemap-index.xml`

## 📄 授權

MIT License
