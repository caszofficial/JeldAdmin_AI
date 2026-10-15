# MEMORY.md Jeld Admin Console

Memoria del proyecto Jeld Admin console entre sesiones. Maximo 50 lineas: resume o elimina lo que ya no aporte.

## Estado actual

- Frontend creado: Vite + React 19 + TypeScript + Tailwind 4 en `C:\Users\user\Desktop\panel javier solo ia`.
- Listo: Login, AuthContext (cookie), ProtectedRoute, Layout (Sidebar + Header), PageContainer, Dashboard y placeholders de Servicios/Airbnb/Listings/Perfil.
- `npm run build` y `npm run lint` en verde.
- Git iniciado con remote `origin` → https://github.com/caszofficial/JeldAdmin_AI.git (commit inicial hecho, sin push).
- Backend corriendo en `http://localhost:3000` (usa Neon) y frontend en `http://localhost:5173`.

## Decisiones Importantes (y porque)

- Tailwind 4 via `@tailwindcss/vite` + tokens en `src/index.css` (`@theme`): paleta primary (violeta) y gold para el look luxury tipo Berry.
- Iconos con `lucide-react` (unica libreria extra permitida por AGENTS).
- Axios con `withCredentials: true` y baseURL desde `VITE_API_URL` (`.env`, no sensible).
- Paleta/oro en sidebar oscuro (`bg-slate-900`), activo con `bg-primary-600`.
- API: registro/login devuelven `{ user }`; el estado de sesion va en cookie httpOnly `session_id`.
- `AuthContext` expone `user`, `loading`, `checkAuth()`, `login()`, `logout()`.

## Aprendizajes y errores a evitar

- `tsconfig.app.json` tiene `verbatimModuleSyntax` y `erasableSyntaxOnly`: usar siempre `import type` en imports de solo tipos.
- Lint (oxlint) avisa por `setState` dentro de `useEffect`; se silencia puntual en la carga inicial de sesion.
- El backend tarda unos segundos en quedar listo tras `npm run dev` (esperar antes de probar `/health`).

## Proximos pasos

- CRUD de Servicios (lista, crear, detalle/editar, eliminar) siguiendo el contrato de la API.
- Luego Properties (Airbnb), Listings, Perfil (`PATCH /users/me`) y Exchange rates.
