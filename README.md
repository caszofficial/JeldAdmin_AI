# JELD Admin Console

SPA de administración de **JELD GROUP** (React + Vite + TypeScript + Tailwind).
Consume la API REST desplegada en `https://management-backend-fawn.vercel.app`.

## Comandos

```bash
npm install
npm run dev      # desarrollo → http://localhost:5173
npm run build    # producción
npm run lint     # linting
```

## API y sesión

La app **nunca** llama al backend por su dominio: siempre usa rutas relativas `/api`.
En desarrollo, Vite reenvía `/api` al backend desplegado (proxy en `vite.config.ts`),
de modo que para el navegador todo es **mismo origen** y la cookie de sesión
(`session_id`, httpOnly) viaja como *first-party*.

Esto es obligatorio: si el frontend llamara al backend cross-site, el navegador
bloquearía la cookie `SameSite=Lax` y todo `POST/PATCH/DELETE` devolvería **401**.
Por eso `VITE_API_URL` en `.env` es **solo el destino del proxy**, no la URL que usa
el navegador.

> En producción, el hosting del frontend debe reenviar `/api` al backend
> (mismo origen). No apuntes el frontend desplegado al backend por su dominio.

## Estado

- Login con sesión por cookie (`POST /auth/login`, `GET /auth/me`).
- Layout del panel: sidebar + header + `PageContainer`.
- **Listings**: lista en tarjetas (imagen + título), detalle con toda la info, crear, editar y eliminar.
- **Airbnb / Properties**: lista en tarjetas (imagen + título + rating + precio/noche), detalle completo, crear, editar y eliminar.
- Pendientes: Servicios y Perfil.
