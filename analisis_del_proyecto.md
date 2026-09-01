# Análisis del Proyecto: Escuela de Informática Web

Este documento proporciona un análisis exhaustivo de la arquitectura, las tecnologías, la estructura y el modelo de datos del proyecto **Escuela de Informática Web**.

## 1. Descripción General
El proyecto consiste en un **sitio web institucional** para una Escuela de Informática. Su propósito es doble:
- **Sitio Público**: Mostrar información de la institución (misión, visión, contacto, logros institucionales), listar cursos, noticias y eventos (seminarios, congresos, etc.).
- **Panel de Administración (`/admin`)**: Permitir la gestión de todo el contenido dinámico del sitio (creación, edición y eliminación de cursos, noticias, eventos, logros y estadísticas), así como la configuración general de la escuela. Está pensado para usuarios sin conocimientos técnicos, impactando directamente en la base de datos sin requerir redespliegues.

## 2. Stack Tecnológico
El proyecto utiliza un conjunto moderno de herramientas basado en el ecosistema de React y Vercel:
- **Framework Principal**: Next.js 14 utilizando el nuevo **App Router** (`app/`).
- **Lenguaje**: TypeScript, asegurando tipado estático en todo el proyecto (interfaces definidas en `lib/types.ts`).
- **Estilos**: Tailwind CSS para utilidades de CSS y diseño responsive.
- **Base de Datos**: PostgreSQL, específicamente **Vercel Postgres** (configurado a través de `@vercel/postgres`).
- **Autenticación (Panel Admin)**: 
  - Manejo de JSON Web Tokens (JWT) utilizando la librería `jose`.
  - Hasheo de contraseñas usando `bcryptjs`.
  - El sistema no requiere tabla de usuarios; funciona con un único usuario administrador configurado mediante variables de entorno (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`).

## 3. Estructura de Directorios
El código fuente está muy bien organizado, dividiendo la interfaz, la lógica de administración y la capa de datos:

```text
/
├── app/                     # Rutas (App Router)
│   ├── admin/               # Panel de control protegido
│   ├── cursos/              # Listado y detalle de cursos (/cursos, /cursos/[slug])
│   ├── eventos/             # Listado de eventos
│   ├── noticias/            # Listado y detalle de noticias (/noticias, /noticias/[slug])
│   ├── nosotros/            # Sección institucional ("Quiénes somos" y Logros)
│   ├── layout.tsx           # Layout principal (Header, Footer, tipografías)
│   └── page.tsx             # Home / Landing page
├── components/              # Componentes de UI públicos (CourseCard, Header, Terminal, etc.)
│   └── admin/               # Formularios CRUD (CursoForm.tsx, NoticiaForm.tsx, etc.)
├── lib/                     # Utilidades y Lógica de Negocio
│   ├── auth.ts              # Lógica de validación de usuario administrador
│   ├── db.ts                # Consultas SQL (CRUD) e interacción con Vercel Postgres
│   ├── parse.ts             # Funciones de parseo/formateo
│   └── types.ts             # Tipos de TypeScript (Curso, Noticia, Evento, etc.)
├── sql/                     # Scripts de inicialización de Base de Datos
│   ├── schema.sql           # Creación de tablas
│   └── seed.sql             # Datos iniciales (opcional)
└── scripts/
    └── hash-password.mjs    # Utilidad CLI para generar el hash de la contraseña admin
```

## 4. Arquitectura y Patrones
- **Server Components & Server Actions**: Next.js App Router permite que los componentes se rendericen en el servidor (SSR) de forma predeterminada, comunicándose de forma segura y directa con la BD en `lib/db.ts`. Las acciones de mutación (ej. dentro de `app/admin/.../actions.ts`) probablemente aprovechan Server Actions para manejar los envíos de los formularios del panel de control sin requerir APIs tradicionales.
- **Middleware de Protección**: `middleware.ts` intercepta todas las peticiones a la ruta `/admin/*` (excepto `/admin/login`) y verifica la presencia y validez del token de sesión en las cookies (`escuela_admin_session`), redirigiendo a la pantalla de login si es inválido.
- **Campos "Ricos" Simplificados**: En lugar de depender de un editor WYSIWYG complejo en el backend que guarde HTML, campos como *reseñas*, *temarios* y *contenidos* de noticias se guardan en formato estructurado (arrays o JSONB) procesados de forma simple, permitiendo un panel más limpio e irrompible para usuarios finales.

## 5. Modelo de Datos (Esquema de Base de Datos)
El esquema (definido en `sql/schema.sql`) consta de 6 tablas clave:

1. **`site_config`**: Tabla con una única fila (controlado por `CHECK (id = 1)`) que almacena la información estática modificable de la escuela (nombre, eslogan, misión, visión, email, teléfono, dirección, horario).
2. **`cursos`**: Almacena título, slug, modalidad, cupos, fechas, URL de inscripción y campos JSONB para `resena` y `temario`.
3. **`noticias`**: Registro de artículos o avisos, con slug, título, resumen, y contenido guardado en array JSONB para párrafos.
4. **`eventos`**: Seminarios, webinars o congresos; incluye fecha, tipo, modalidad y un enlace externo.
5. **`logros`**: Hitos del año para la línea de tiempo de la página institucional.
6. **`estadisticas`**: Métricas clave a mostrar en la Home (ej. "+50 Egresados", "10 Años de historia").

## 6. Proceso de Despliegue
Está preparado para ser desplegado fácilmente en **Vercel**:
1. Conectar repositorio de GitHub a Vercel.
2. Añadir Vercel Postgres desde el panel "Storage", lo cual inyecta automáticamente variables como `POSTGRES_URL`.
3. Configurar variables `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` y `SESSION_SECRET`.
4. Ejecutar el schema desde el visor SQL de Vercel (o conectando localmente).
5. Desplegar.

## Conclusión
El proyecto **Escuela de Informática Web** es un CMS (Sistema de Gestión de Contenidos) minimalista, hecho a medida y "serverless", montado sobre una arquitectura de vanguardia (Next.js 14 App Router + Vercel Postgres). Resulta muy rápido (por el SSR y optimizaciones de Next.js) y el panel de administración autogestionado le brinda independencia al cliente final sin tener que pagar un CMS Headless de terceros.
