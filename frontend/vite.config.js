// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     headers: {
//       'Content-Security-Policy': "default-src 'self'; font-src 'self' https://fonts.gstatic.com data:;",
//     },
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['qrcode.react'],
    exclude: [] // Vous pouvez ajouter des exclusions si nécessaire
  }
})
