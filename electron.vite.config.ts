import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  main: {
    base: resolve('./testmain/'),
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    base: resolve('./preload/'),
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '/img': resolve('resources/public/img'),
        '@': resolve('src/renderer/src')
      }
    },
  },
  renderer: {
    base: resolve('./testrenderer/'),
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '/img': resolve('resources/public/img'),
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})