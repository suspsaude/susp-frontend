import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_HOST = 'http://app:8000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_HOST,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
