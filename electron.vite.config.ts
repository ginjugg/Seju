import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
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
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '/img': resolve('resources/public/img'),
        '@resources': resolve('resources'),
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})