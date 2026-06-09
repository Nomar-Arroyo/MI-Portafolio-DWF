import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Abre el servidor de desarrollo en el puerto 3000
    open: true   // Abre automáticamente el navegador al ejecutar npm run dev
  }
});