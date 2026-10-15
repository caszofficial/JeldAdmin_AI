# JELD Admin Console

SPA de administración de **JELD GROUP** (React + Vite + TypeScript + Tailwind).
Consume la API REST del `management-backend` (Fastify + Prisma + PostgreSQL).

## Comandos

```bash
npm install
npm run dev      # desarrollo → http://localhost:5173
npm run build    # producción
npm run lint     # linting
```

La API debe estar corriendo en `http://localhost:3000`. La URL se configura en `.env`
(`VITE_API_URL`).

## Estado

- Login con sesión por cookie (`POST /auth/login`, `GET /auth/me`).
- Layout del panel: sidebar + header + `PageContainer`.
- Dashboard y páginas placeholder de Servicios, Airbnb, Listings y Perfil.
