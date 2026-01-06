import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        immersive: resolve(__dirname, 'index-immersive.html'),
        'immersive-v1': resolve(__dirname, 'index-immersive-v1.html'),
        'immersive-v2': resolve(__dirname, 'index-immersive-v2.html'),
        'immersive-v3': resolve(__dirname, 'index-immersive-v3.html'),
        'immersive-v4': resolve(__dirname, 'index-immersive-v4.html'),
        'immersive-v5': resolve(__dirname, 'index-immersive-v5.html'),
        'immersive-v6': resolve(__dirname, 'index-immersive-v6.html'),
        'immersive-v7': resolve(__dirname, 'index-immersive-v7.html'),
        'immersive-v8': resolve(__dirname, 'index-immersive-v8.html'),
        'immersive-v9': resolve(__dirname, 'index-immersive-v9.html'),
        'immersive-v10': resolve(__dirname, 'index-immersive-v10.html'),
        'immersive-master': resolve(__dirname, 'index-immersive-master.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: '/index-immersive-master.html',
  },
});
