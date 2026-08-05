import { defineConfig } from 'astro/config';

// ZEROVECTOR website v2 — static output for GitHub Pages
export default defineConfig({
  site: 'https://zerovector.hk',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // inline ALL page CSS: kills the render-blocking stylesheet request,
    // which on slow GitHub Pages routes left the page blank/frozen-looking
    inlineStylesheets: 'always',
  },
});
