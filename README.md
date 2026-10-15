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

La URL de la API se configura en `.env` (`VITE_API_URL`).

## Estado

- Login con sesión por cookie (`POST /auth/login`, `GET /auth/me`).
- Layout del panel: sidebar + header + `PageContainer`.
- **Listings**: lista en tarjetas (imagen + título), detalle con toda la info, crear, editar y eliminar.
- Pendientes: Servicios, Airbnb/Properties y Perfil.
