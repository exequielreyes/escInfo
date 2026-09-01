-- Ejecutar este script una sola vez en la base de datos (ver README, sección "Base de datos").

CREATE TABLE IF NOT EXISTS site_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  nombre TEXT NOT NULL,
  institucion TEXT NOT NULL,
  eslogan TEXT NOT NULL,
  descripcion_corta TEXT NOT NULL,
  mision TEXT NOT NULL,
  vision TEXT NOT NULL,
  contacto_email TEXT NOT NULL,
  contacto_telefono TEXT NOT NULL,
  contacto_direccion TEXT NOT NULL,
  contacto_horario TEXT NOT NULL,
  CONSTRAINT site_config_single_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS cursos (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  nivel TEXT NOT NULL,
  modalidad TEXT NOT NULL,
  duracion TEXT NOT NULL,
  inicio TEXT NOT NULL,
  cupos TEXT NOT NULL,
  resumen TEXT NOT NULL,
  resena JSONB NOT NULL DEFAULT '[]',
  temario JSONB NOT NULL DEFAULT '[]',
  destinatarios TEXT NOT NULL,
  formulario_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS noticias (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  fecha TEXT NOT NULL,
  categoria TEXT NOT NULL,
  resumen TEXT NOT NULL,
  contenido JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  fecha TEXT NOT NULL,
  modalidad TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  rol TEXT NOT NULL,
  enlace TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS logros (
  id SERIAL PRIMARY KEY,
  anio TEXT NOT NULL,
  titulo TEXT NOT NULL,
  detalle TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS estadisticas (
  id SERIAL PRIMARY KEY,
  numero TEXT NOT NULL,
  etiqueta TEXT NOT NULL,
  orden INTEGER NOT NULL DEFAULT 0
);
