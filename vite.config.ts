import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['url', 'preferredLanguage', 'baseLocale']
    }),
    sveltekit()
  ],
  server: {
    port: 3000,
    allowedHosts: ['vytrvalec.local'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      }
    },
  },
});
