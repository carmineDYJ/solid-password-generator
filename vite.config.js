import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Unocss from 'unocss/vite'
import { unocssRules } from './src/modules/unocssRules'

export default defineConfig({
  plugins: [solidPlugin(), Unocss({ rules: unocssRules })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
