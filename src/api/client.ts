import axios from 'axios'

// Cliente HTTP central. El navegador siempre usa un origen propio (`/api`) para que
// la cookie de sesión sea first-party: en desarrollo Vite reenvía `/api` al backend
// y en producción lo hace el hosting del frontend. `withCredentials` mantiene el
// envío de cookies explícito.
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})
