import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      // any request that starts with /api will be forwarded
      '/api': {
        target: 'https://itask-6w1n.onrender.com',
        // target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
