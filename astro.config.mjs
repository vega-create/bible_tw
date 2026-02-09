import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://bible.freshblogs.cc',
  integrations: [tailwind(), react()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
