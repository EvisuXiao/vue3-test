import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '~comp/': `${path.resolve(__dirname, 'src')}/components/`,
      '~types/': `${path.resolve(__dirname, 'src')}/types/`,
      '~view/': `${path.resolve(__dirname, 'src')}/views/`
    }
  },
  optimizeDeps: {
    include: ['lodash']
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  ]
})
