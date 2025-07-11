import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
      "/api":
      {
        target: "http://localhost:4000",
      }

    },
    optimizeDeps: {
         include: ['source-map-js'],
          include: ['socket.io-client'], // Ensure socket.io-client is included
 // Include specific modules if needed
       },

  }
})


