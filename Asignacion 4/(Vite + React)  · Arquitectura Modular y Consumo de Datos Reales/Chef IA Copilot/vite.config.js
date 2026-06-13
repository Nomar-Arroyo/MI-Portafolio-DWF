import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' asegura que los assets carguen correctamente desde el subdominio de GitHub Pages.
  // Si tu repositorio se llama "que-cocino-hoy-app", cámbialo a: '/que-cocino-hoy-app/'
  base: '/tu-nombre-de-repositorio/',
});