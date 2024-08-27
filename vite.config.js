import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Habilita el acceso en la red local
    port: 3000,  // Puedes cambiar el puerto si lo prefieres
  },
})
