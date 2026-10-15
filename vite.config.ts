import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const DEFAULT_API_URL = 'https://management-backend-fawn.vercel.app'

// El navegador siempre llama a la API por `/api` (mismo origen que la app) y el
// proxy la reenvia al backend. Asi la cookie de sesion es first-party y el
// navegador no la bloquea por ser cross-site. VITE_API_URL solo define el destino.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const apiTarget = env.VITE_API_URL || DEFAULT_API_URL

  const proxy = {
    '/api': {
      target: apiTarget,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      proxy,
    },
    // `npm run preview` sirve el build de produccion con el mismo proxy.
    preview: {
      port: 4173,
      proxy,
    },
  }
})
