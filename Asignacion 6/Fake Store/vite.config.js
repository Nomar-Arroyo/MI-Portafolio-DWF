import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ajusta './' para rutas relativas, permitiendo que corra correctamente en subcarpetas de GitHub Pages
  base: './', 
});