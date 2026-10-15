# AGENTS.md — JELD Admin Console

-Panel de administración de JELD GROUP: una SPA en React que consume una API REST propia
y permite hacer CRUD de las entidades de negocio (servicios, propiedades, etc).

## Stack

-React(Vite).
-Typescript.
-Tailwind.

Solo tienes permitido agregar librerias de iconos si lo consideras necesario para adaptarte al estilo de https://berrydashboard.com/.

El frontend no tiene lógica de negocio ni base de datos: todo vive en la API.
Que en este caso se encuentra en C:\Users\user\Desktop\Javier\Vitrina main\management-backend.

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

## Forma de trabajar

-Haz solo lo que se te pide no hagas ni escribas codigo de mas.
-Cambios pequeños y enfocados, no reescribas lo que ya funciona.
-Compomentes ordenados sin bloques de codigo super extensos, separa solo lo necesario.
-Nunca agregues dependencias nuevas y menos sin consultar y mostrarme.
-Trabajaras en el repo de https://github.com/caszofficial/JeldAdmin_AI.git.
-Al terminar has un resumen de lo que cambiaste y cualquier decision que deba revisar y actualiza AGENTS.md y MEMORY.md en caso de ser necesario.

## Memoria

-Al empezar lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
-Al terminar una tarea actualizalo: estado actual, decisiones importantes con su porque y errores a evitar.
-Mantenlo breve: Maximo 50 lineas, resume o elimina lo que ya no aporte.
-Si algo se convierte en una regla permanente propon moverlo a `AGENTS.md` en lugar de dejarlo en la memoria.
-No guardes nunca datos sensibles.
