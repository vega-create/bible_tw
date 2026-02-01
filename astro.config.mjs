import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { siteConfig } from './site.config';

export default defineConfig({
  site: siteConfig.url,
  integrations: [tailwind(), react()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
