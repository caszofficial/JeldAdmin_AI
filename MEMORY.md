# MEMORY.md Jeld Admin Console

Memoria del proyecto Jeld Admin console entre sesiones. Maximo 50 lineas: resume o elimina lo que ya no aporte.

## Estado actual

- Frontend en `C:\Users\user\Desktop\panel javier solo ia` (Vite 8 + React 19 + TS 6 + Tailwind 4).
- API: **desplegada** en https://management-backend-fawn.vercel.app (ya NO se usa la local). Configurada en `.env` (`VITE_API_URL`).
- Listo: Login, AuthContext, ProtectedRoute, Layout (Sidebar + Header), PageContainer, Dashboard.
- **Listings completo**: lista (tarjetas con imagen + titulo), detalle (galeria, precios, habitaciones, baños, area, descripcion, enlace), crear, editar y eliminar.
- `npm run build` y `npm run lint` en verde.
- Ramas: `main` (mergeada) y `feature/listings` (en desarrollo, sin push aun).

## Decisiones Importantes (y porque)

- Precios y `sizeSqm` llegan como **string** (Decimal de Prisma) y pueden venir en `0` o `null`: se formatean con `Intl es-CO` y se ocultan si no hay valor (`src/lib/format.ts`).
- Las descripciones vienen en Markdown simple: se limpian a texto plano en `cleanDescription` (sin agregar dependencias).
- Formulario de listings compartido en `ListingForm.tsx` (lo usan crear y editar) para no duplicar codigo.
- `media[]` se edita como textarea (una URL por linea) por ser simple y mobile first.
- Lista de listings en grid responsive (`sm:2`, `lg:3`, `xl:4`) con `ListingCard` separado.

## Aprendizajes y errores a evitar

- `verbatimModuleSyntax` + `erasableSyntaxOnly`: usar siempre `import type` en imports de tipos.
- oxlint avisa por `setState` dentro de `useEffect`: para resetear estado de un componente al cambiar de item, usar `key` en vez de un effect.
- Ediciones secuenciales de `App.tsx` (ruta antes que import) generan un error transitorio de HMR; se resuelve al guardar el import.
- CORS del backend desplegado ya permite `http://localhost:5173` con credenciales (`ACAO` + `ACAC: true`).

## Proximos pasos

- CRUD de Servicios (misma estructura que Listings).
- Properties (Airbnb) y Perfil (`PATCH /users/me`), luego Exchange rates para mostrar COP.
