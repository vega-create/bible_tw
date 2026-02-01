// ====================================
// 網站核心設定檔 - 複製後只需修改這裡
// ====================================

export const siteConfig = {
  // 基本資訊
  name: "聖經靈修網",
  description: "每日靈修、聖經導讀、基督徒生活指南",
  url: "https://bible.freshblogs.cc",
  author: "Your Name",
  language: "zh-TW",

  // SEO 設定
  seo: {
    titleTemplate: "%s | 聖經靈修網",
    defaultTitle: "聖經靈修網 - 每日靈修與聖經導讀",
    defaultDescription: "提供每日靈修、聖經經文解釋、基督徒生活指南。",
    defaultImage: "/images/og-default.jpg",
  },

  // Google AdSense
  adsense: {
    enabled: false,
    clientId: "ca-pub-XXXXXXXXXXXXXXXX",
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

  // 文章分類
  categories: [
    { slug: "daily-devotion", name: "每日靈修", description: "每天的靈修短文" },
    { slug: "bible-study", name: "聖經導讀", description: "深入理解聖經" },
    { slug: "christian-life", name: "基督徒生活", description: "信仰生活應用" },
    { slug: "prayer", name: "禱告專區", description: "禱告方法與見證" },
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
    { name: "聯絡我們", href: "/contact" },
  ],

  // 社群連結
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
};

export default siteConfig;