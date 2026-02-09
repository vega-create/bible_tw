
// scripts/generate-sitemap.js
// 自動掃描所有文章，產生 sitemap.xml
// 用法：node scripts/generate-sitemap.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://bible.freshblogs.cc';

// 靜態頁面（手動維護）
const staticPages = [
  { path: '/', priority: '1.0' },
  { path: '/category/daily-devotion/', priority: '0.8' },
  { path: '/category/bible-study/', priority: '0.8' },
  { path: '/category/faq/', priority: '0.8' },
  { path: '/tools/daily-verse/', priority: '0.7' },
  { path: '/about/', priority: '0.5' },
];

// 掃描所有文章
function getPosts() {
  const postsDir = path.join(ROOT, 'src', 'content', 'posts');
  if (!fs.existsSync(postsDir)) {
    console.log('⚠️  Posts directory not found:', postsDir);
    return [];
  }

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const posts = [];

  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/, '');
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    
    // 從 frontmatter 抓 publishDate
    const dateMatch = content.match(/publishDate:\s*["']?(\d{4}-\d{2}-\d{2})/);
    const lastmod = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

    posts.push({
      path: `/posts/${slug}/`,
      lastmod,
      priority: '0.6',
    });
  }

  return posts;
}

// 產生 XML
function generateSitemap(pages) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of pages) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${page.lastmod || today}</lastmod>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

// 執行
const posts = getPosts();
const allPages = [
  ...staticPages.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
  ...posts,
];

const sitemap = generateSitemap(allPages);
const outputPath = path.join(ROOT, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Sitemap generated: ${allPages.length} URLs`);
console.log(`   - ${staticPages.length} static pages`);
console.log(`   - ${posts.length} posts`);
console.log(`   → ${outputPath}`);
