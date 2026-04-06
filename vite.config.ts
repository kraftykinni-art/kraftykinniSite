import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'generate-route-htmls',
        closeBundle() {
          const routes = [
            'corporate-art-workshops',
            'school-workshops',
            'about',
            'workshops/lippan-art',
            'workshops/mandala-art',
            'workshops/tie-and-dye',
            'workshops/boho-canvas',
            'workshops/bottle-lamp-art',
            'workshops/clay-art',
            'workshops/glass-painting',
            'workshops/texture-art',
            'workshops/block-printing',
            'workshops/tote-bag-painting',
            'workshops/trinket-tray',
            'workshops/mdf-fridge-magnet',
            'workshops/canvas-pouch',
            'workshops-in-delhi',
            'workshops-in-gurgaon',
            'workshops-in-noida',
          ];
          routes.forEach(route => {
            const dir = resolve(__dirname, 'dist', route);
            mkdirSync(dir, { recursive: true });
            copyFileSync(
              resolve(__dirname, 'dist/index.html'),
              resolve(__dirname, `dist/${route}/index.html`)
            );
          });
          console.log('✅ Generated HTML files for all 19 routes');
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion-vendor': ['motion'],
            'ui-vendor': ['lucide-react'],
          },
        },
      },
      assetsInlineLimit: 4096,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});