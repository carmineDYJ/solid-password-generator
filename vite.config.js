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
        ['font-main-size', { 'font-size': '20px' }],
        [
          'checkbox',
          {
            position: 'relative',
            width: '20px',
            height: '20px',
            'border-radius': '5px',
            border: '2px solid #dddddd',
            cursor: 'pointer',
          },
        ],
        [
          'checked',
          {
            position: 'absolute',
            top: '5px',
            left: '2px',
            content: '',
            width: '12px',
            border: '2px solid #dddddd',
            height: '4px',
            'border-top': 'none',
            'border-right': 'none',
            transform: 'rotate(-45deg)',
          },
        ],
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
