import { defineConfig } from 'astro/config';

// ZEROVECTOR website v2 — static output for GitHub Pages
export default defineConfig({
  site: 'https://zerovector.hk',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
