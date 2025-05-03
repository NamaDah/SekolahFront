import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createMPAPlugin } from 'vite-plugin-mpa'

export default defineConfig({
  plugins: [
    react(),
    createMPAPlugin()
  ]
})
