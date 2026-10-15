# MEMORY.md Jeld Admin Console

Memoria del proyecto Jeld Admin console entre sesiones. Maximo 50 lineas: resume o elimina lo que ya no aporte.

## Estado actual

- Frontend en `C:\Users\user\Desktop\panel javier solo ia` (Vite 8 + React 19 + TS 6 + Tailwind 4).
- API: **desplegada** en https://management-backend-fawn.vercel.app (ya NO se usa la local). El navegador le habla por `/api` y Vite hace de proxy (ver Decisiones).
- Listo: Login, AuthContext, ProtectedRoute, Layout (Sidebar + Header), PageContainer, Dashboard.
- **Listings completo**: lista (tarjetas con imagen + titulo), detalle (galeria, precios, habitaciones, baños, area, descripcion, enlace), crear, editar y eliminar.
- **Airbnb / Properties completo**: lista (tarjetas con imagen + titulo + rating + precio por noche), detalle (galeria, rating, precio/noche, estadia minima, habitaciones, baños, area, descripcion, enlace), crear, editar y eliminar. Rutas `/airbnb`, `/airbnb/create`, `/airbnb/:id`.
- `npm run build` y `npm run lint` en verde.
- Ramas mergeadas: `main` (listings + properties).

## Decisiones Importantes (y porque)

- **Sesion same-origin via proxy (fix del 401)**: `client.ts` usa `baseURL: '/api'` y `vite.config.ts` proxya `/api` al backend (`VITE_API_URL`). Antes el navegador llamaba directo a `vercel.app` desde `localhost:5173`: eso es **cross-site**, y la cookie `session_id` (`SameSite=Lax`, `Secure=true` en Vercel) no se envia en XHR cross-site -> `POST/PATCH/DELETE` daban 401 (login "parecia" ok porque el `user` viene en el body y los GET son publicos). Con el proxy todo es mismo origen -> cookie first-party -> funciona. **Cross-origin no es lo mismo que cross-site: los puertos no cuentan para SameSite.**
- La version anterior (`management-frontend/core-businesses`) funcionaba porque hardcodeaba `http://localhost:3000`: frontend y API en `localhost` = mismo site.
- Precios y `sizeSqm` llegan como **string** (Decimal de Prisma) y pueden venir en `0` o `null`: se formatean con `Intl es-CO` y se ocultan si no hay valor (`src/lib/format.ts`).
- Las descripciones vienen en Markdown simple: se limpian a texto plano en `cleanDescription` (sin agregar dependencias).
- Formulario de listings compartido en `ListingForm.tsx` (lo usan crear y editar) para no duplicar codigo.
- Galeria de imagenes reutilizable en `src/components/ImageGallery.tsx` (la usan Listings y Airbnb).
- `media[]` se edita como textarea (una URL por linea) por ser simple y mobile first.
- Lista de listings en grid responsive (`sm:2`, `lg:3`, `xl:4`) con `ListingCard` separado.
- Properties: `price` es por noche; `rating` (0-5) se muestra con estrella y `minStayDays` en el detalle. Archivos en `src/pages/Airbnb/` (Rentals, PropertyCard, PropertyForm, CreateRental, RentalDetail).

## Aprendizajes y errores a evitar

- `verbatimModuleSyntax` + `erasableSyntaxOnly`: usar siempre `import type` en imports de tipos.
- oxlint avisa por `setState` dentro de `useEffect`: para resetear estado de un componente al cambiar de item, usar `key` en vez de un effect.
- Ediciones secuenciales de `App.tsx` (ruta antes que import) generan un error transitorio de HMR; se resuelve al guardar el import.
- Cookie `Secure` sobre `http://localhost`: Chrome y Firefox la aceptan (localhost es origen seguro); si algun navegador la rechaza en dev, el fallback es `COOKIE_SECURE=false` en Vercel (no hace falta hoy).
- Verificado con curl via proxy: `GET /api/properties` -> 200, `GET /api/auth/me` -> 401 JSON, `POST /api/auth/login` -> 401 `INVALID_CREDENTIALS` (el backend responde y el body POST viaja bien).
- **Desborde horizontal en movil (vistas de detalle)**: `grid gap-8 lg:grid-cols-2` sin columnas base crea una pista implicita `auto` = `min-content`. La tira de miniaturas de `ImageGallery` (`overflow-x-auto`) tiene ~4300px de `min-content` (una propiedad real tiene 47 imagenes) y eso ensanchaba TODA la pista y la pagina. Se arregla declarando `grid-cols-1` (Tailwind usa `minmax(0,1fr)`); en escritorio no pasaba porque `lg:grid-cols-2` ya usa `minmax(0,1fr)`.
- Como se diagnostico: Edge headless sobre la app real midiendo `scrollWidth` vs `viewport` y los `getBoundingClientRect()` de cada elemento (antes 4348 vs 477; despues 477 vs 477).

## Proximos pasos

- CRUD de Servicios (misma estructura que Listings/Airbnb).
- Perfil (`PATCH /users/me`), luego Exchange rates para mostrar COP.
