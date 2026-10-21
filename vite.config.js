import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from a subpath (e.g. /ASTRUXIO/).
// Set BASE_PATH when building for that subpath; leave unset for local dev
// and for user sites or custom domains served from the domain root.
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
