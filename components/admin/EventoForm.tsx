"use client";

import type { Evento } from "@/lib/types";

export default function EventoForm({
  evento,
  action,
  submitLabel,
}: {
  evento?: Evento;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Campo label="Título">
        <input name="titulo" required defaultValue={evento?.titulo ?? ""} className="input" />
      </Campo>

      <Campo
        label="Identificador de URL (slug)"
        ayuda="Se genera solo a partir del título si lo dejás vacío."
      >
        <input name="slug" defaultValue={evento?.slug ?? ""} className="input" />
      </Campo>

      <div className="grid gap-6 sm:grid-cols-3">
        <Campo label="Tipo">
          <select name="tipo" defaultValue={evento?.tipo ?? "Seminario"} className="input">
            <option value="Seminario">Seminario</option>
            <option value="Webinar">Webinar</option>
            <option value="Congreso">Congreso</option>
          </select>
        </Campo>
        <Campo label="Modalidad">
          <select name="modalidad" defaultValue={evento?.modalidad ?? "Presencial"} className="input">
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </Campo>
        <Campo label="Fecha" ayuda="Ej: 14 de agosto de 2026">
          <input name="fecha" required defaultValue={evento?.fecha ?? ""} className="input" />
        </Campo>
      </div>

      <Campo label="Descripción">
        <textarea
          name="descripcion"
          required
          rows={4}
          defaultValue={evento?.descripcion ?? ""}
          className="input"
        />
      </Campo>

      <Campo label="Rol de la escuela" ayuda='Ej: "Organizado por la Escuela de Informática" o "Participación con ponencia propia"'>
        <input name="rol" required defaultValue={evento?.rol ?? ""} className="input" />
      </Campo>

      <Campo label="Enlace (opcional)" ayuda="Link a más información, transmisión o inscripción, si corresponde.">
        <input name="enlace" type="url" defaultValue={evento?.enlace ?? ""} className="input" />
      </Campo>

      <button type="submit" className="rounded bg-teal-600 px-5 py-3 font-mono text-sm text-white hover:bg-teal-400">
        {submitLabel}
      </button>
    </form>
  );
}

function Campo({ label, ayuda, children }: { label: string; ayuda?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-xs text-slate-500">{label}</label>
      <div className="mt-1">{children}</div>
      {ayuda && <p className="mt-1 text-xs text-slate-400">{ayuda}</p>}
    </div>
  );
}
