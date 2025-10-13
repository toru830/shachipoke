import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    'crypto': {},
  },
  resolve: {
    alias: {
      'crypto': 'crypto-browserify',
    },
  },
})
