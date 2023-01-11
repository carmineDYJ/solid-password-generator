import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [solidPlugin(), Unocss({ rules: [['index-bg-color', { 'background-color': '#1a2a3a' }]] })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
