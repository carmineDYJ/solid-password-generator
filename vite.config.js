import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Unocss from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [presetUno(), presetAttributify({})],
      rules: [
        ['center', { 'margin-inline': 'auto' }],
        [
          'blurEffect',
          {
            background: 'linear-gradient(90deg, transparent 0%, #4a5a6a 100%)',
          },
        ],
        [
          'slide',
          {
            display: 'block',
            position: 'absolute',
            top: '6px',
            left: '0px',
            width: '100%',
            height: '12px',
            background: '#66ff99',
          },
        ],
        [
          'darkSlide',
          {
            position: 'absolute',
            top: '6px',
            left: '12px',
            width: '100%',
            height: '12px',
            background: '#1a2a3a',
          },
        ],
        [
          'thumb',
          {
            position: 'absolute',
            cursor: 'pointer',
            top: '0px',
            left: '0px',
            width: '24px',
            height: '24px',
            'border-radius': '50%',
            background: '#dddddd',
          },
        ],
        [
          'checkbox',
          {
            position: 'relative',
            width: '20px',
            height: '20px',
            'border-radius': '2px',
            border: '2px solid #66ff99',
            background: '#66ff99',
            cursor: 'pointer',
          },
        ],
        [
          'checked',
          {
            position: 'absolute',
            top: '5px',
            left: '3px',
            width: '10px',
            border: '2px solid #1a2a3a',
            height: '5px',
            'border-top': 'none',
            'border-right': 'none',
            transform: 'rotate(-45deg)',
          },
        ],
      ],
      theme: {
        colors: {
          main: '#dddddd',
          red: '#ff6666',
          orange: '#ff9966',
          yellow: '#ffff66',
          green: '#66ff99',
          smGray: '#4a5a6a',
          lgGray: '#2a3a4a',
          xlGray: '#1a2a3a',
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
