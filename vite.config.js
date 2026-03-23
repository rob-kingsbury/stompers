import { defineConfig } from 'vite';
import { resolve } from 'path';

// Dev: `npm run dev` serves .html files via Vite (needed for ESM bare imports)
// Production: .php files served by Apache use the built assets from dist/
// The .html files are Vite entry points; .php files are the canonical source (DRY via includes/)

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        tour: resolve(__dirname, 'tour.html'),
        story: resolve(__dirname, 'story.html'),
        epk: resolve(__dirname, 'epk.html'),
        merch: resolve(__dirname, 'merch.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    open: '/index.html',
  },
});
