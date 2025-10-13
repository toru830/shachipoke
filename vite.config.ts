import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/shachipoke/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'シャチポケ - 社畜育成ゲーム',
        short_name: 'シャチポケ',
        description: '社畜キャラクターを育成するゲーム',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
      }
    })
  ],
})

