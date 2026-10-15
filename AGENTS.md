# AGENTS.md — JELD Admin Console

-Panel de administración de JELD GROUP: una SPA en React que consume una API REST propia
y permite hacer CRUD de las entidades de negocio (servicios, propiedades, etc).

## Stack

-React(Vite).
-Typescript.
-Tailwind.

Solo tienes permitido agregar librerias de iconos si lo consideras necesario para adaptarte al estilo de https://berrydashboard.com/.

El frontend no tiene lógica de negocio ni base de datos: todo vive en la API.
La API que se usa es la desplegada: https://management-backend-fawn.vercel.app (ya no se conecta al backend local).

## Convenciones

-Los nombres de los archivos siempre en ingles buscando la mejor traduccion de las entidades pero todo el contenido de lo que crees debe ser si o si en español.
-Codigo simple, nombres descriptivos y comentarios solo donde haga falta.
-Diseño limpio y responsive, todas las vistas de la app deben poderse ver bien desde el movil.

## Estilo (Tailwind)

-Vamos a seguir el estilo tratando de seguir al maximo https://berrydashboard.com/ para que quede lo mas similiar posible, con las entidades en el sidebar y que contengan iconos que sean similares a lo que se busca.
-El estilo busca un poco de lujo y luxury sin salirse a lo extravagante y siguiendo al maximo el estandar de https://berrydashboard.com/.
-Todo utilizando siempre tailwind.
-Siguiendo buenas practicas.
-Haciendo enfasis en mobile first.
-En `grid`, declara siempre la columna base (`grid grid-cols-1 gap-8 lg:grid-cols-2`). Si omites las columnas en movil, Tailwind no aplica `minmax(0,1fr)` y un hijo ancho (p. ej. una tira de miniaturas con `overflow-x-auto`) desborda la pantalla.

## Forma de trabajar

-Haz solo lo que se te pide no hagas ni escribas codigo de mas.
-Cambios pequeños y enfocados, no reescribas lo que ya funciona.
-Compomentes ordenados sin bloques de codigo super extensos, separa solo lo necesario.
-Nunca agregues dependencias nuevas y menos sin consultar y mostrarme.
-Trabajaras en el repo de https://github.com/caszofficial/JeldAdmin_AI.git.
-Al terminar has un resumen de lo que cambiaste y cualquier decision que deba revisar y actualiza AGENTS.md y MEMORY.md en caso de ser necesario.

## Notas tecnicas (implementacion)

-Scaffold: Vite 8 + React 19 + TypeScript 6. Estilos con Tailwind 4 via el plugin `@tailwindcss/vite`; los tokens (colores primary/gold, fuente) se definen en `src/index.css` con `@theme`.
-Iconos: `lucide-react` (unica dependencia extra permitida).
-Peticiones: instancia unica de axios en `src/api/client.ts` con `withCredentials: true` y `baseURL = '/api'`.
-Sesion: el navegador SIEMPRE llama a `/api` (mismo origen) para que la cookie `session_id` sea **first-party**. Vite la reenvia al backend con `server.proxy`/`preview.proxy` usando `VITE_API_URL` como destino. NUNCA llamar al backend cross-site (otro dominio): el navegador bloquea la cookie y todo `POST/PATCH/DELETE` responde 401. En produccion, el hosting del frontend debe reenviar `/api` al backend.
-Un modulo por entidad en `src/api` (peticiones), `src/types` (tipos) y `src/pages/<Entidad>/` (`<Entidad>.tsx`, `Create<Entidad>.tsx`, `<Entidad>Detail.tsx`).
-`tsconfig.app.json` usa `verbatimModuleSyntax` y `erasableSyntaxOnly`: usar `import type` en imports de solo tipos.
-Frontend en `:5173` (`npm run dev`) y `:4173` (`npm run preview`); ambos sirven `/api` via proxy al backend desplegado, asi que en desarrollo no aplica CORS ni el bloqueo de cookies cross-site.

## Memoria

-Al empezar lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
-Al terminar una tarea actualizalo: estado actual, decisiones importantes con su porque y errores a evitar.
-Mantenlo breve: Maximo 50 lineas, resume o elimina lo que ya no aporte.
-Si algo se convierte en una regla permanente propon moverlo a `AGENTS.md` en lugar de dejarlo en la memoria.
-No guardes nunca datos sensibles.
