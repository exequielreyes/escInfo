"use client";

import type { Noticia } from "@/lib/types";
import { paragraphsToText } from "@/lib/parse";

export default function NoticiaForm({
  noticia,
  action,
  submitLabel,
}: {
  noticia?: Noticia;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Campo label="Título">
        <input name="titulo" required defaultValue={noticia?.titulo ?? ""} className="input" />
      </Campo>

      <Campo
        label="Identificador de URL (slug)"
        ayuda="Se genera solo a partir del título si lo dejás vacío."
      >
        <input name="slug" defaultValue={noticia?.slug ?? ""} className="input" />
      </Campo>

      <div className="grid gap-6 sm:grid-cols-2">
        <Campo label="Fecha" ayuda="Como querés que se muestre, por ejemplo: 20 de julio de 2026">
          <input name="fecha" required defaultValue={noticia?.fecha ?? ""} className="input" />
        </Campo>
        <Campo label="Categoría" ayuda="Por ejemplo: Institucional, Logros, Vinculación">
          <input name="categoria" required defaultValue={noticia?.categoria ?? ""} className="input" />
        </Campo>
      </div>

      <Campo label="Resumen breve (aparece en la tarjeta de la noticia)">
        <textarea name="resumen" required rows={2} defaultValue={noticia?.resumen ?? ""} className="input" />
      </Campo>

      <Campo
        label="Contenido completo"
        ayuda="Un párrafo por bloque, dejando una línea en blanco entre cada uno."
      >
        <textarea
          name="contenido"
          required
          rows={10}
          defaultValue={noticia ? paragraphsToText(noticia.contenido) : ""}
          className="input font-mono text-sm"
          placeholder={"Primer párrafo.\n\nSegundo párrafo."}
        />
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
