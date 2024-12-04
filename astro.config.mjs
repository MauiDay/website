// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  base: '/', // Once DNS is in place, empty this.
  site: 'https://www.mauiday.net',
  integrations: [tailwind(), sitemap()]
});
