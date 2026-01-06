import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
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
    open: '/index-immersive-master.html',
  },
});
