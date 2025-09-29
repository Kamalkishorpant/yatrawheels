import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/shop/' : '/',
  server: {
    host: '0.0.0.0', // Accept connections from any IP address
    port: 3000,
    open: true,
    proxy: {
      '/api/odoo': {
  target: 'https://yatrawheels.odoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/odoo/, ''),
        // Ensure cookies sent by Odoo are rewritten to the dev server origin
        // so credentials: 'include' works in the browser during development.
        cookieDomainRewrite: '',
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Response:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})