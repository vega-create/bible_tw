
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/tools/daily-verse',
    '/category/daily-devotion',
    '/category/bible-study',
    '/category/faq',
  ];

  // Get all posts
  const posts = await import.meta.glob('../content/posts/*.md', { eager: true });
  const postSlugs = Object.keys(posts).map((path) => {
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    return `/posts/${filename}`;
  });

  const baseUrl = 'https://bible.freshblogs.cc';
  const allPages = [...staticPages, ...postSlugs];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
