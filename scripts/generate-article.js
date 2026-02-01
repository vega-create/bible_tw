/**
 * SEO 文章批量產生器
 * 
 * 使用方式：
 * node scripts/generate-article.js "如何禱告？"
 * node scripts/generate-article.js --category faq --batch "問題1" "問題2"
 * node scripts/generate-article.js --file keywords.csv
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// 台灣常見名字列表
const NAMES = [
  '志豪', '怡君', '建宏', '淑芬', '俊傑', '雅琪', '宗翰', '佳穎',
  '柏翰', '詩涵', '冠廷', '欣怡', '家豪', '雅雯', '承恩', '筱婷',
  '宏仁', '美玲', '彥廷', '思妤', '育誠', '佩珊', '哲瑋', '曉萱',
  '信宏', '惠婷', '威廷', '雅芳', '嘉豪', '靜宜'
];

// 圖片搜尋關鍵字列表（隨機選擇避免重複）
const IMAGE_QUERIES = [
  'bible book reading',
  'christian prayer hands',
  'church light window',
  'cross sunset sky',
  'peaceful nature morning',
  'candle light prayer',
  'open bible pages',
  'worship hands raised',
  'sunrise hope nature',
  'person thinking peaceful',
  'family praying together',
  'bible study group',
  'quiet meditation nature',
  'light through clouds',
  'peaceful lake reflection',
];

// 隨機選取
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// 檢查 API Key
if (!OPENAI_API_KEY) {
  console.error('❌ 請在 .env 設定 OPENAI_API_KEY');
  process.exit(1);
}

// ===== 產生單篇文章 =====
async function generateArticle(keyword, index = 0, total = 1, forceCategory = null) {
  console.log(`\n[${index + 1}/${total}] 🚀 產生文章：${keyword}`);

  try {
    console.log('  📝 產生內容中...');
    const article = await generateContent(keyword, forceCategory);

    console.log('  🖼️ 搜尋圖片中...');
    const imageUrl = await fetchImage();

    const markdown = createMarkdown(article, imageUrl);
    const slug = createSlug(keyword);
    const filePath = path.join(__dirname, '..', 'src', 'content', 'posts', `${slug}.md`);
    fs.writeFileSync(filePath, markdown, 'utf8');

    console.log(`  ✅ 完成：${slug}.md（分類：${article.category}）`);

    if (index < total - 1) {
      await sleep(2000);
    }

    return { success: true, slug };
  } catch (error) {
    console.error(`  ❌ 失敗：${error.message}`);
    return { success: false, error: error.message };
  }
}

// ===== OpenAI API =====
async function generateContent(keyword, forceCategory = null) {
  const randomName = getRandomItem(NAMES);

  const categoryInstruction = forceCategory
    ? `"category": "${forceCategory}",  // 必須使用這個分類`
    : `"category": "daily-devotion/bible-study/faq 擇一",`;

  const prompt = `你是一位專業的基督教內容作家，請針對「${keyword}」寫一篇 SEO 優化的繁體中文文章。

要求：
- 主要內容 1800 字（不含 FAQ）
- FAQ 部分額外 400-500 字（每題 100 字左右）
- 總字數約 2300 字
- 故事性開頭要有具體人物和情境
- 故事主角請使用「${randomName}」這個名字
- 不要使用小明、雅婷、瑪莉亞、約翰、大衛等常見名字
- 每個段落內容要詳細、有深度
- 引用多處相關經文
- FAQ 回答要完整詳細
- 所有內容請使用繁體中文
${forceCategory ? `- 分類必須使用「${forceCategory}」` : ''}

請用 JSON 格式輸出（注意：所有字串值都要用雙引號，字串內不能有換行）：

{
  "title": "文章標題（問句形式，10-20字）",
  "description": "150字內 Meta 描述",
  ${categoryInstruction}
  "tags": ["標籤1", "標籤2", "標籤3"],
  "storyOpening": "150-200字故事性開頭，主角是${randomName}",
  "directAnswer": "80-100字直接回答",
  "sections": [
    {"title": "標題1", "content": "300-350字內容"},
    {"title": "標題2", "content": "300-350字內容"},
    {"title": "標題3", "content": "300-350字內容"},
    {"title": "標題4", "content": "300-350字內容"}
  ],
  "bibleVerses": [
    {"text": "經文1", "reference": "出處1"},
    {"text": "經文2", "reference": "出處2"}
  ],
  "application": "200字實際應用",
  "faq": [
    {"question": "問題1？", "answer": "100字完整回答"},
    {"question": "問題2？", "answer": "100字完整回答"},
    {"question": "問題3？", "answer": "100字完整回答"},
    {"question": "問題4？", "answer": "100字完整回答"}
  ],
  "conclusion": "100字結語"
}

重要：只輸出有效的 JSON，不要有任何其他文字或 markdown 標記。`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  const content = data.choices[0].message.content;

  let cleanJson = content
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  try {
    const parsed = JSON.parse(cleanJson);
    // 強制覆蓋分類
    if (forceCategory) {
      parsed.category = forceCategory;
    }
    return parsed;
  } catch (e) {
    cleanJson = cleanJson
      .replace(/[\x00-\x1F\x7F]/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\t/g, ' ')
      .replace(/\s+/g, ' ');

    try {
      const parsed = JSON.parse(cleanJson);
      if (forceCategory) {
        parsed.category = forceCategory;
      }
      return parsed;
    } catch (e2) {
      console.log('  ⚠️ JSON 原始內容：', content.substring(0, 500));
      throw new Error('JSON 解析失敗，請重試');
    }
  }
}

// ===== Pexels API =====
async function fetchImage() {
  if (!PEXELS_API_KEY) {
    return '/images/default-post.jpg';
  }

  // 隨機選一個搜尋關鍵字
  const query = getRandomItem(IMAGE_QUERIES);

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&page=${Math.floor(Math.random() * 3) + 1}`,
      { headers: { 'Authorization': PEXELS_API_KEY } }
    );
    const data = await response.json();

    if (data.photos?.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      return data.photos[randomIndex].src.large;
    }
  } catch (error) {
    console.log('  ⚠️ 圖片抓取失敗');
  }

  return '/images/default-post.jpg';
}

// ===== 組合 Markdown =====
function createMarkdown(article, imageUrl) {
  const today = new Date().toISOString().split('T')[0];

  const verses = article.bibleVerses || [article.bibleVerse];
  const versesMarkdown = verses.map(v =>
    `> 「${v.text}」\n> \n> —— ${v.reference}`
  ).join('\n\n');

  return `---
title: "${article.title}"
description: "${article.description}"
publishDate: "${today}"
category: "${article.category}"
tags: [${article.tags.map(t => `"${t}"`).join(', ')}]
image: "${imageUrl}"
imageAlt: "${article.title}"
faq:
${article.faq.map(f => `  - question: "${f.question}"
    answer: "${f.answer}"`).join('\n')}
---

${article.storyOpening}

**${article.directAnswer}**

${article.sections.map(s => `## ${s.title}

${s.content}`).join('\n\n')}

## 相關經文

${versesMarkdown}

## 實際應用

${article.application}

## 常見問題 FAQ

${article.faq.map(f => `### ${f.question}

${f.answer}`).join('\n\n')}

## 結語

${article.conclusion}
`;
}

// ===== 工具函數 =====
function createSlug(keyword) {
  return keyword
    .toLowerCase()
    .replace(/？/g, '')
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function readKeywordsFromCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split('\n')
    .slice(1)
    .map(line => line.split(',')[0].trim())
    .filter(Boolean);
}

// ===== 主程式 =====
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📝 SEO 文章批量產生器

使用方式：
  單篇：node scripts/generate-article.js "如何禱告？"
  
  指定分類：node scripts/generate-article.js --category faq "問題"
  
  批量（指定分類）：
  node scripts/generate-article.js --category faq --batch "問題1" "問題2"
  
  CSV：node scripts/generate-article.js --file keywords.csv

分類選項：daily-devotion / bible-study / faq
    `);
    process.exit(0);
  }

  let keywords = [];
  let forceCategory = null;
  let i = 0;

  // 解析參數
  while (i < args.length) {
    if (args[i] === '--category') {
      forceCategory = args[i + 1];
      i += 2;
    } else if (args[i] === '--file') {
      keywords = readKeywordsFromCSV(args[i + 1]);
      i += 2;
    } else if (args[i] === '--batch') {
      keywords = args.slice(i + 1);
      break;
    } else {
      keywords = [args[i]];
      i++;
    }
  }

  if (keywords.length === 0) {
    console.error('❌ 請提供關鍵字');
    process.exit(1);
  }

  console.log(`\n📚 準備產生 ${keywords.length} 篇文章`);
  if (forceCategory) {
    console.log(`📁 指定分類：${forceCategory}`);
  }
  console.log('');
  keywords.forEach((k, idx) => console.log(`  ${idx + 1}. ${k}`));

  const results = [];
  for (let idx = 0; idx < keywords.length; idx++) {
    const result = await generateArticle(keywords[idx], idx, keywords.length, forceCategory);
    results.push(result);
  }

  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n========================================`);
  console.log(`✅ 成功：${success} 篇`);
  if (failed > 0) console.log(`❌ 失敗：${failed} 篇`);
  console.log(`========================================\n`);
}

main().catch(console.error);