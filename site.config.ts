// ====================================
// 網站核心設定檔 - 複製後只需修改這裡
// ====================================

export const siteConfig = {
  // 基本資訊
  name: "聖經靈修網",
  description: "每日靈修、聖經導讀、信仰問答",
  url: "https://bible.freshblogs.cc",
  author: "Bible Blog",
  language: "zh-TW",

  // SEO 設定
  seo: {
    titleTemplate: "%s | 聖經靈修網",
    defaultTitle: "聖經靈修網 - 每日靈修與聖經導讀",
    defaultDescription: "提供每日靈修、聖經經文解釋、信仰問答，幫助你更認識神的話語。",
    defaultImage: "/images/og-default.jpg",
  },

  // Google AdSense
  adsense: {
    enabled: true,
    autoAds: true,
    clientId: "ca-pub-3493526929407874",
    slots: {
      header: "1234567890",
      inArticle1: "2345678901",
      inArticle2: "3456789012",
      multiplex: "4567890123",
    },
  },

  // Google Analytics
  analytics: {
    enabled: false,
    measurementId: "G-XXXXXXXXXX",
  },

  // 文章分類（只保留三個）
  categories: [
    { slug: "daily-devotion", name: "每日靈修", description: "每天的靈修短文" },
    { slug: "bible-study", name: "聖經導讀", description: "深入理解聖經" },
    { slug: "faq", name: "信仰問答", description: "常見問題解答" },
  ],

  // 導航選單
  navigation: [
    { name: "首頁", href: "/" },
    { name: "每日靈修", href: "/category/daily-devotion" },
    { name: "聖經導讀", href: "/category/bible-study" },
    { name: "信仰問答", href: "/category/faq" },
    { name: "今日經文", href: "/tools/daily-verse" },
    { name: "關於我們", href: "/about" },
  ],

  // 頁尾連結
  footerLinks: [
    { name: "隱私權政策", href: "/privacy" },
    { name: "使用條款", href: "/terms" },
  ],

  // 社群連結（暫不使用）
  social: {},
};

export default siteConfig;