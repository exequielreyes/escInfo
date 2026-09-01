import { sql } from "@vercel/postgres";
import type { Curso, Noticia, Evento, Logro, Estadistica, SiteConfig } from "./types";

/* ---------- CURSOS ---------- */

export async function getCursos(): Promise<Curso[]> {
  const { rows } = await sql`SELECT * FROM cursos ORDER BY id DESC`;
  return rows as unknown as Curso[];
}

export async function getCursoBySlug(slug: string): Promise<Curso | null> {
  const { rows } = await sql`SELECT * FROM cursos WHERE slug = ${slug} LIMIT 1`;
  return (rows[0] as unknown as Curso) ?? null;
}

export async function getCursoById(id: number): Promise<Curso | null> {
  const { rows } = await sql`SELECT * FROM cursos WHERE id = ${id} LIMIT 1`;
  return (rows[0] as unknown as Curso) ?? null;
}

export async function createCurso(data: Omit<Curso, "id">) {
  await sql`
    INSERT INTO cursos
      (slug, titulo, categoria, nivel, modalidad, duracion, inicio, cupos, resumen, resena, temario, destinatarios, formulario_url)
    VALUES
      (${data.slug}, ${data.titulo}, ${data.categoria}, ${data.nivel}, ${data.modalidad}, ${data.duracion}, ${data.inicio}, ${data.cupos}, ${data.resumen}, ${JSON.stringify(data.resena)}, ${JSON.stringify(data.temario)}, ${data.destinatarios}, ${data.formulario_url})
  `;
}

export async function updateCurso(id: number, data: Omit<Curso, "id">) {
  await sql`
    UPDATE cursos SET
      slug = ${data.slug},
      titulo = ${data.titulo},
      categoria = ${data.categoria},
      nivel = ${data.nivel},
      modalidad = ${data.modalidad},
      duracion = ${data.duracion},
      inicio = ${data.inicio},
      cupos = ${data.cupos},
      resumen = ${data.resumen},
      resena = ${JSON.stringify(data.resena)},
      temario = ${JSON.stringify(data.temario)},
      destinatarios = ${data.destinatarios},
      formulario_url = ${data.formulario_url}
    WHERE id = ${id}
  `;
}

export async function deleteCurso(id: number) {
  await sql`DELETE FROM cursos WHERE id = ${id}`;
}

/* ---------- NOTICIAS ---------- */

export async function getNoticias(): Promise<Noticia[]> {
  const { rows } = await sql`SELECT * FROM noticias ORDER BY id DESC`;
  return rows as unknown as Noticia[];
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const { rows } = await sql`SELECT * FROM noticias WHERE slug = ${slug} LIMIT 1`;
  return (rows[0] as unknown as Noticia) ?? null;
}

export async function getNoticiaById(id: number): Promise<Noticia | null> {
  const { rows } = await sql`SELECT * FROM noticias WHERE id = ${id} LIMIT 1`;
  return (rows[0] as unknown as Noticia) ?? null;
}

export async function createNoticia(data: Omit<Noticia, "id">) {
  await sql`
    INSERT INTO noticias (slug, titulo, fecha, categoria, resumen, contenido)
    VALUES (${data.slug}, ${data.titulo}, ${data.fecha}, ${data.categoria}, ${data.resumen}, ${JSON.stringify(data.contenido)})
  `;
}

export async function updateNoticia(id: number, data: Omit<Noticia, "id">) {
  await sql`
    UPDATE noticias SET
      slug = ${data.slug},
      titulo = ${data.titulo},
      fecha = ${data.fecha},
      categoria = ${data.categoria},
      resumen = ${data.resumen},
      contenido = ${JSON.stringify(data.contenido)}
    WHERE id = ${id}
  `;
}

export async function deleteNoticia(id: number) {
  await sql`DELETE FROM noticias WHERE id = ${id}`;
}

/* ---------- EVENTOS ---------- */

export async function getEventos(): Promise<Evento[]> {
  const { rows } = await sql`SELECT * FROM eventos ORDER BY id DESC`;
  return rows as unknown as Evento[];
}

export async function getEventoBySlug(slug: string): Promise<Evento | null> {
  const { rows } = await sql`SELECT * FROM eventos WHERE slug = ${slug} LIMIT 1`;
  return (rows[0] as unknown as Evento) ?? null;
}

export async function getEventoById(id: number): Promise<Evento | null> {
  const { rows } = await sql`SELECT * FROM eventos WHERE id = ${id} LIMIT 1`;
  return (rows[0] as unknown as Evento) ?? null;
}

export async function createEvento(data: Omit<Evento, "id">) {
  await sql`
    INSERT INTO eventos (slug, tipo, titulo, fecha, modalidad, descripcion, rol, enlace)
    VALUES (${data.slug}, ${data.tipo}, ${data.titulo}, ${data.fecha}, ${data.modalidad}, ${data.descripcion}, ${data.rol}, ${data.enlace})
  `;
}

export async function updateEvento(id: number, data: Omit<Evento, "id">) {
  await sql`
    UPDATE eventos SET
      slug = ${data.slug},
      tipo = ${data.tipo},
      titulo = ${data.titulo},
      fecha = ${data.fecha},
      modalidad = ${data.modalidad},
      descripcion = ${data.descripcion},
      rol = ${data.rol},
      enlace = ${data.enlace}
    WHERE id = ${id}
  `;
}

export async function deleteEvento(id: number) {
  await sql`DELETE FROM eventos WHERE id = ${id}`;
}

/* ---------- LOGROS ---------- */

export async function getLogros(): Promise<Logro[]> {
  const { rows } = await sql`SELECT * FROM logros ORDER BY id DESC`;
  return rows as unknown as Logro[];
}

export async function getLogroById(id: number): Promise<Logro | null> {
  const { rows } = await sql`SELECT * FROM logros WHERE id = ${id} LIMIT 1`;
  return (rows[0] as unknown as Logro) ?? null;
}

export async function createLogro(data: Omit<Logro, "id">) {
  await sql`
    INSERT INTO logros (anio, titulo, detalle)
    VALUES (${data.anio}, ${data.titulo}, ${data.detalle})
  `;
}

export async function updateLogro(id: number, data: Omit<Logro, "id">) {
  await sql`
    UPDATE logros SET anio = ${data.anio}, titulo = ${data.titulo}, detalle = ${data.detalle}
    WHERE id = ${id}
  `;
}

export async function deleteLogro(id: number) {
  await sql`DELETE FROM logros WHERE id = ${id}`;
}

/* ---------- ESTADISTICAS ---------- */

export async function getEstadisticas(): Promise<Estadistica[]> {
  const { rows } = await sql`SELECT * FROM estadisticas ORDER BY orden ASC`;
  return rows as unknown as Estadistica[];
}

export async function updateEstadistica(id: number, data: Omit<Estadistica, "id">) {
  await sql`
    UPDATE estadisticas SET numero = ${data.numero}, etiqueta = ${data.etiqueta}, orden = ${data.orden}
    WHERE id = ${id}
  `;
}

/* ---------- SITE CONFIG ---------- */

export async function getSiteConfig(): Promise<SiteConfig> {
  const { rows } = await sql`SELECT * FROM site_config WHERE id = 1 LIMIT 1`;
  return rows[0] as unknown as SiteConfig;
}

export async function updateSiteConfig(data: SiteConfig) {
  await sql`
    UPDATE site_config SET
      nombre = ${data.nombre},
      institucion = ${data.institucion},
      eslogan = ${data.eslogan},
      descripcion_corta = ${data.descripcion_corta},
      mision = ${data.mision},
      vision = ${data.vision},
      contacto_email = ${data.contacto_email},
      contacto_telefono = ${data.contacto_telefono},
      contacto_direccion = ${data.contacto_direccion},
      contacto_horario = ${data.contacto_horario}
    WHERE id = 1
  `;
}
