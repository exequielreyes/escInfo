export type Curso = {
  id: number;
  slug: string;
  titulo: string;
  categoria: string;
  nivel: "Inicial" | "Intermedio" | "Avanzado";
  modalidad: "Presencial" | "Virtual" | "Híbrido";
  duracion: string;
  inicio: string;
  cupos: string;
  resumen: string;
  resena: string[];
  temario: { unidad: string; contenidos: string[] }[];
  destinatarios: string;
  formulario_url: string;
};

export type Noticia = {
  id: number;
  slug: string;
  titulo: string;
  fecha: string;
  categoria: string;
  resumen: string;
  contenido: string[];
};

export type Evento = {
  id: number;
  slug: string;
  tipo: "Seminario" | "Webinar" | "Congreso";
  titulo: string;
  fecha: string;
  modalidad: "Presencial" | "Virtual" | "Híbrido";
  descripcion: string;
  rol: string;
  enlace: string | null;
};

export type Logro = {
  id: number;
  anio: string;
  titulo: string;
  detalle: string;
};

export type Estadistica = {
  id: number;
  numero: string;
  etiqueta: string;
  orden: number;
};

export type SiteConfig = {
  nombre: string;
  institucion: string;
  eslogan: string;
  descripcion_corta: string;
  mision: string;
  vision: string;
  contacto_email: string;
  contacto_telefono: string;
  contacto_direccion: string;
  contacto_horario: string;
};
