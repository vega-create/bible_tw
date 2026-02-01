/**
 * 批量產文腳本
 * 
 * 使用方式：
 * node scripts/generate-article.js --topic "禱告" --count 5
 * node scripts/generate-article.js --file keywords.csv
 */

const fs = require('fs');
const path = require('path');

// 文章模板
const articleTemplate = (data) => `---
title: "${data.title}"
description: "${data.description}"
publishDate: "${data.publishDate}"
category: "${data.category}"
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
image: "${data.image}"
imageAlt: "${data.imageAlt}"
faq:
${data.faq.map(f => `  - question: "${f.question}"
    answer: "${f.answer}"`).join('\n')}
---

${data.storyOpening}

**${data.directAnswer}**

${data.content}

## 常見問題 FAQ

${data.faq.map(f => `### ${f.question}

${f.answer}`).join('\n\n')}

## 結語

${data.conclusion}
`;

// 從命令行參數解析
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    options[key] = args[i + 1];
  }
  
  return options;
}

// 產生文章資料（實際使用時會呼叫 AI API）
function generateArticleData(keyword, category) {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    title: keyword,
    description: `深入探討「${keyword}」這個問題，提供實用的解答與建議。`,
    publishDate: today,
    category: category || 'faq',
    tags: ['信仰問答', '基督徒生活'],
    image: '/images/posts/default.jpg',
    imageAlt: keyword,
    storyOpening: `許多人都有這樣的疑問：「${keyword}」如果你也正在思考這個問題，這篇文章會幫助你找到答案。`,
    directAnswer: '這個問題的答案需要從聖經的角度來理解。讓我們一起來探討。',
    content: `## 從聖經的角度理解

這是文章的主要內容區塊，會由 AI 根據問句關鍵字產生。

## 實際應用

提供讀者具體的行動建議。

## 相關經文

引用相關的聖經經文支持論點。`,
    faq: [
      { question: '相關問題 1？', answer: '回答 1' },
      { question: '相關問題 2？', answer: '回答 2' },
      { question: '相關問題 3？', answer: '回答 3' },
    ],
    conclusion: '希望這篇文章對你有幫助。如果還有其他問題，歡迎留言討論！',
  };
}

// 產生文章檔案
function generateArticle(keyword, category) {
  const data = generateArticleData(keyword, category);
  const content = articleTemplate(data);
  
  // 產生檔案名稱 (slug)
  const slug = keyword
    .toLowerCase()
    .replace(/？/g, '')
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const filePath = path.join(__dirname, '..', 'src', 'content', 'posts', `${slug}.md`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 已產生: ${slug}.md`);
  
  return filePath;
}

// 主程式
async function main() {
  const options = parseArgs();
  
  if (options.topic && options.count) {
    // 單一主題批量產生
    console.log(`\n🚀 開始產生 ${options.count} 篇「${options.topic}」相關文章...\n`);
    
    // 實際使用時，這裡會呼叫 AI 產生多個問句
    const keywords = [
      `${options.topic}是什麼？`,
      `為什麼要${options.topic}？`,
      `如何${options.topic}？`,
      `${options.topic}有什麼好處？`,
      `${options.topic}的方法有哪些？`,
    ].slice(0, parseInt(options.count));
    
    keywords.forEach(keyword => {
      generateArticle(keyword, options.category || 'faq');
    });
    
  } else if (options.file) {
    // 從 CSV 批量產生
    console.log(`\n🚀 從 ${options.file} 批量產生文章...\n`);
    
    const csvContent = fs.readFileSync(options.file, 'utf8');
    const lines = csvContent.trim().split('\n').slice(1); // 跳過標題列
    
    lines.forEach(line => {
      const [keyword, category] = line.split(',').map(s => s.trim());
      if (keyword) {
        generateArticle(keyword, category);
      }
    });
    
  } else {
    console.log(`
使用方式：
  node generate-article.js --topic "禱告" --count 5 [--category prayer]
  node generate-article.js --file keywords.csv

CSV 格式：
  keyword,category
  如何禱告？,prayer
  什麼是三位一體？,bible-study
    `);
  }
  
  console.log('\n✨ 完成！\n');
}

main();
