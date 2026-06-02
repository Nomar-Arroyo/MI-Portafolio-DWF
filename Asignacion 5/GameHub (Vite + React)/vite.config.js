import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Usamos rutas relativas para que funcione correctamente en subcarpetas de GitHub Pages
  base: './', 
  build: {
    // Compila un nivel hacia afuera para dejar los archivos en la raíz del repositorio
    outDir: '../dist',
    // Limpia la carpeta dist antes de cada nueva compilación de producción
    emptyOutDir: true,
  },
})