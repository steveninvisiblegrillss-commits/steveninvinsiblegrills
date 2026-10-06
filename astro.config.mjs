import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// Static output, served by Cloudflare Workers static assets (see wrangler.jsonc).
export default defineConfig({
  site: 'https://www.mrrinvisiblegrillspigeonnets.in', // D15: swap when the new brand domain is registered
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [icon(), mdx(), sitemap({ filter: (p) => !p.includes('/privacy-policy/') })],
  vite: { plugins: [tailwindcss()] },
});
