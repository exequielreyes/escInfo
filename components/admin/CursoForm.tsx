"use client";

import { useState } from "react";
import type { Curso } from "@/lib/types";
import { paragraphsToText, temarioToText } from "@/lib/parse";

export default function CursoForm({
  curso,
  action,
  submitLabel,
}: {
  curso?: Curso;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const [titulo, setTitulo] = useState(curso?.titulo ?? "");

  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Campo label="Título del curso">
        <input
          name="titulo"
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="input"
        />
      </Campo>

      <Campo
        label="Identificador de URL (slug)"
        ayuda="Se genera solo a partir del título si lo dejás vacío. Usalo si querés mantener la misma URL de un curso existente."
      >
        <input name="slug" defaultValue={curso?.slug ?? ""} className="input" placeholder={titulo} />
      </Campo>

      <div className="grid gap-6 sm:grid-cols-3">
        <Campo label="Categoría">
          <input
            name="categoria"
            required
            defaultValue={curso?.categoria ?? ""}
            className="input"
            placeholder="Desarrollo, Datos, Redes..."
          />
        </Campo>
        <Campo label="Nivel">
          <select name="nivel" defaultValue={curso?.nivel ?? "Inicial"} className="input">
            <option value="Inicial">Inicial</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </Campo>
        <Campo label="Modalidad">
          <select name="modalidad" defaultValue={curso?.modalidad ?? "Presencial"} className="input">
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </Campo>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Campo label="Duración">
          <input name="duracion" required defaultValue={curso?.duracion ?? ""} className="input" />
        </Campo>
        <Campo label="Fecha de inicio">
          <input name="inicio" required defaultValue={curso?.inicio ?? ""} className="input" />
        </Campo>
        <Campo label="Cupos">
          <input name="cupos" required defaultValue={curso?.cupos ?? ""} className="input" />
        </Campo>
      </div>

      <Campo label="Resumen breve (aparece en la tarjeta del curso)">
        <textarea
          name="resumen"
          required
          rows={2}
          defaultValue={curso?.resumen ?? ""}
          className="input"
        />
      </Campo>

      <Campo
        label="Reseña"
        ayuda="Un párrafo por bloque, dejando una línea en blanco entre cada uno."
      >
        <textarea
          name="resena"
          required
          rows={6}
          defaultValue={curso ? paragraphsToText(curso.resena) : ""}
          className="input font-mono text-sm"
          placeholder={"Primer párrafo de la reseña.\n\nSegundo párrafo de la reseña."}
        />
      </Campo>

      <Campo
        label="Temario"
        ayuda='Escribí el nombre de cada unidad y, debajo, cada contenido en una línea que empiece con "-". Separá las unidades con una línea en blanco.'
      >
        <textarea
          name="temario"
          required
          rows={10}
          defaultValue={curso ? temarioToText(curso.temario) : ""}
          className="input font-mono text-sm"
          placeholder={
            "Unidad 1 — Introducción\n- Primer contenido\n- Segundo contenido\n\nUnidad 2 — Práctica\n- Otro contenido"
          }
        />
      </Campo>

      <Campo label="Destinatarios">
        <textarea
          name="destinatarios"
          required
          rows={2}
          defaultValue={curso?.destinatarios ?? ""}
          className="input"
        />
      </Campo>

      <Campo
        label="Enlace de inscripción (formulario de Google)"
        ayuda="Pegá acá el link para 'Enviar' de tu Google Form."
      >
        <input
          name="formulario_url"
          required
          type="url"
          defaultValue={curso?.formulario_url ?? ""}
          className="input"
          placeholder="https://forms.gle/..."
        />
      </Campo>

      <button type="submit" className="rounded bg-teal-600 px-5 py-3 font-mono text-sm text-white hover:bg-teal-400">
        {submitLabel}
      </button>
    </form>
  );
}

function Campo({
  label,
  ayuda,
  children,
}: {
  label: string;
  ayuda?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-mono text-xs text-slate-500">{label}</label>
      <div className="mt-1">{children}</div>
      {ayuda && <p className="mt-1 text-xs text-slate-400">{ayuda}</p>}
    </div>
  );
}
