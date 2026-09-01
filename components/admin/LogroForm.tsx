"use client";

import type { Logro } from "@/lib/types";

export default function LogroForm({
  logro,
  action,
  submitLabel,
}: {
  logro?: Logro;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Campo label="Año" ayuda="Ej: 2026">
        <input name="anio" required defaultValue={logro?.anio ?? ""} className="input" />
      </Campo>
      <Campo label="Título del logro">
        <input name="titulo" required defaultValue={logro?.titulo ?? ""} className="input" />
      </Campo>
      <Campo label="Detalle">
        <textarea name="detalle" required rows={4} defaultValue={logro?.detalle ?? ""} className="input" />
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
