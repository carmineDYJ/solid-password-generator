import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      rules: [
        ['index-bg-color', { 'background-color': '#1a2a3a' }],
        ['main-bg-color', { 'background-color': '#4a5a6a' }],
        ['center', { 'margin-inline': 'auto' }],
      ],
      theme: {
        colors: {
          title: '#4a5a6a',
          main: '#dddddd',
        },
        breakpoints: {
          sm: '0px',
          md: '650px',
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
