# Escuela de Informática — sitio web

Sitio institucional construido con **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS**,
con un **panel de administración** (`/admin`) para que alguien sin conocimientos técnicos pueda
cargar cursos, noticias, eventos y logros, y ver los cambios reflejados en la página en segundos.

El contenido se guarda en una base de datos **Postgres provista por Vercel** (el mismo lugar donde
vas a desplegar el sitio), así que no hace falta crear cuentas en otros servicios.

## Qué incluye

- **Sitio público**: inicio, quiénes somos, cursos (listado + detalle con reseña, temario e
  inscripción vía Google Forms), eventos (seminarios/webinars/congresos) y noticias.
- **Panel `/admin`**: login con usuario y contraseña, y formularios para crear, editar y borrar
  cursos, noticias, eventos y logros, además de editar los datos generales del sitio (nombre,
  misión, visión, contacto) y las estadísticas del inicio.

## 1. Correr el proyecto en tu computadora

Necesitás [Node.js](https://nodejs.org/) 18 o superior.

```bash
cd escuela-informatica-web
npm install
```

Después seguí el paso 2 (base de datos) antes de levantar el servidor, porque el sitio necesita
conectarse a Postgres incluso en desarrollo.

## 2. Crear la base de datos (Vercel Postgres)

1. Subí este proyecto a un repositorio de GitHub (lo vas a necesitar para el paso 4 igual).
2. Entrá a [vercel.com](https://vercel.com), creá una cuenta si no tenés, e importá el repositorio
   como un nuevo proyecto (podés hacer el deploy primero y configurar la base después, es el mismo
   panel).
3. Dentro del proyecto en Vercel, andá a la pestaña **Storage → Create Database → Postgres**
   (Vercel Postgres, basado en Neon). Elegí un nombre y la región más cercana.
4. Al crearla, Vercel te ofrece **conectarla al proyecto**: aceptá. Esto agrega automáticamente las
   variables `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, etc. a tu proyecto en Vercel.
5. Para trabajar en tu computadora, instalá la CLI de Vercel una vez (`npm i -g vercel`), corré
   `vercel link` dentro de la carpeta del proyecto (para asociarlo) y después:
   ```bash
   vercel env pull .env.local
   ```
   Esto descarga las variables de la base de datos a un archivo `.env.local` local.
6. Corré el esquema de tablas una sola vez. La forma más simple es abrir la pestaña **Storage → tu
   base → Query** en Vercel y pegar el contenido de `sql/schema.sql`, ejecutarlo, y después pegar y
   ejecutar `sql/seed.sql` (esto último es opcional: carga contenido de ejemplo que después podés
   editar o borrar desde `/admin`).

## 3. Configurar el usuario del panel de administración

El panel tiene un único usuario administrador, definido por variables de entorno (no hace falta
una base de usuarios).

1. Generá el hash de tu contraseña:
   ```bash
   node scripts/hash-password.mjs "TuContraseñaSegura"
   ```
   Esto imprime una línea `ADMIN_PASSWORD_HASH=...`.
2. Completá en tu `.env.local` (y más adelante en Vercel, ver paso 4):
   ```
   ADMIN_EMAIL="admin@escuelainformatica.edu.ar"
   ADMIN_PASSWORD_HASH="(el valor generado en el paso anterior)"
   SESSION_SECRET="(cualquier texto largo y aleatorio, por ejemplo 40 caracteres al azar)"
   ```

Podés ver `.env.local.example` como referencia de todas las variables necesarias.

## 4. Correr el proyecto localmente

```bash
npm run dev
```

Abrí `http://localhost:3000` para el sitio público y `http://localhost:3000/admin` para el panel
(usá el email y la contraseña que configuraste en el paso 3).

## 5. Desplegar en Vercel

Si ya conectaste el repositorio y la base de datos en el paso 2, solo falta:

1. En el proyecto de Vercel, andá a **Settings → Environment Variables** y agregá `ADMIN_EMAIL`,
   `ADMIN_PASSWORD_HASH` y `SESSION_SECRET` (las de Postgres ya deberían estar, agregadas
   automáticamente al conectar la base).
2. Hacé clic en **Deploy** (o esperá el deploy automático si ya hiciste push a la rama principal).
3. Entrá a `https://tu-proyecto.vercel.app/admin` con tu usuario para empezar a cargar contenido.

Cada `git push` a la rama principal vuelve a desplegar el sitio automáticamente. Los cambios que
hagas desde `/admin` se reflejan sin necesidad de un nuevo deploy (se guardan directo en la base de
datos).

## 6. Cómo usar el panel de administración

Entrando a `/admin` vas a ver un panel con accesos a:

| Sección | Qué se puede hacer |
|---|---|
| **Cursos** | Crear, editar y borrar cursos. Cada curso tiene reseña, temario, datos (duración, inicio, cupos) y el enlace al formulario de Google para inscribirse. |
| **Noticias** | Crear, editar y borrar noticias, con resumen y contenido completo. |
| **Eventos** | Cargar seminarios, webinars y congresos, con tipo, modalidad, fecha y rol de la escuela. |
| **Logros** | Cargar la línea de tiempo de logros institucionales, y editar las 4 estadísticas del inicio (años, egresados, etc.). |
| **Datos del sitio** | Editar nombre, eslogan, misión, visión y datos de contacto. |

### Sobre la reseña y el temario de los cursos

Para no depender de un editor de texto enriquecido, la reseña y el temario se cargan como texto
simple con una convención sencilla, explicada en cada campo del formulario:

- **Reseña**: un párrafo por bloque, separando cada uno con una línea en blanco.
- **Temario**: el nombre de la unidad en una línea, y debajo cada contenido en una línea que
  empieza con `-`. Las unidades se separan entre sí con una línea en blanco. Por ejemplo:

  ```
  Unidad 1 — Introducción
  - Primer contenido
  - Segundo contenido

  Unidad 2 — Práctica
  - Otro contenido
  ```

### Reemplazar los enlaces de inscripción (Google Forms)

Al cargar o editar un curso, el campo **"Enlace de inscripción"** es donde va el link de tu
formulario de Google (el que te da el botón "Enviar" → ícono de enlace en Google Forms).

## 7. Estructura del proyecto

```
app/
  layout.tsx                 → estructura general (trae el nombre del sitio desde la base)
  page.tsx                    → inicio
  nosotros/page.tsx            → quiénes somos + logros
  cursos/page.tsx               → listado de cursos
  cursos/[slug]/page.tsx        → detalle de un curso
  eventos/page.tsx              → seminarios, webinars, congresos
  noticias/page.tsx             → listado de noticias
  noticias/[slug]/page.tsx      → detalle de una noticia
  admin/                        → panel de administración (protegido por middleware.ts)
components/                     → piezas de UI del sitio público
components/admin/                → formularios del panel
lib/db.ts                        → todas las consultas a la base de datos
lib/auth.ts                      → login del panel (usuario único vía variables de entorno)
lib/types.ts                     → tipos compartidos (Curso, Noticia, Evento, Logro...)
sql/schema.sql                   → creación de tablas (ejecutar una sola vez)
sql/seed.sql                     → contenido de ejemplo (opcional)
scripts/hash-password.mjs        → genera el hash de la contraseña del panel
```

## 8. Identidad visual

- **Tipografías**: Space Grotesk (títulos), IBM Plex Sans (texto), IBM Plex Mono (datos, etiquetas).
- **Colores**: azul tinta (`ink`) para secciones oscuras, verde azulado (`teal`) como color de
  acción, ámbar y coral como acentos puntuales.
- El hero simula una terminal mostrando la misión de la escuela.

Podés ajustar colores y tipografías en `tailwind.config.ts` y `app/layout.tsx`.
