import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/mapserver/web/',
  build: {
    outDir: '../public/mapserver/web/',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        "index": resolve(__dirname, 'index.html'),
        "40x": resolve(__dirname, '40x.html'),
        "50x": resolve(__dirname, '50x.html'),
      },
    },
  },
  root: resolve(__dirname),
  server: {
    port: 8080,
    hot: true
  },
})