import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
//import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/TBW/' : './',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    //analyzer()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    manifest: true
  },
})
