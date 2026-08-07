import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://excel-viewer-online.github.io',
  integrations: [react()]
});
