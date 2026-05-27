import { defineConfig } from 'vite';
import { resolve } from 'path';

// Vite is a local build tool only — bundles JS/CSS for production.
// PHP files are canonical, served by Apache (XAMPP locally, WHC.ca in production).
// Run `npm run build` before deploying. includes/vite.php reads the manifest.

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'js/main.js'),
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
  },
});
