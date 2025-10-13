import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/shachipoke/',
  resolve: {
    alias: {
      'crypto': 'crypto-browserify',
    },
  },
})
