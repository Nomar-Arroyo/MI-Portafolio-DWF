import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Descomenta la siguiente línea y reemplaza con el nombre de tu repo si subes a GitHub Pages:
  // base: '/nombre-de-tu-repositorio/',
})