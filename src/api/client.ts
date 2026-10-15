import axios from 'axios'

// Cliente HTTP central: la cookie de sesión viaja gracias a withCredentials.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  withCredentials: true,
})
