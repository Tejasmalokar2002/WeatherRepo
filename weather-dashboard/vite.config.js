import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/WeatherRepo/', // Replace with your repository name
  plugins: [react()],
})
