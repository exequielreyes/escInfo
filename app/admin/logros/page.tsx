import Link from "next/link";
import { getLogros, getEstadisticas } from "@/lib/db";
import { borrarLogroAction, actualizarEstadisticasAction } from "./actions";

export default async function AdminLogrosPage() {
  const [logros, estadisticas] = await Promise.all([getLogros(), getEstadisticas()]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// logros institucionales</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
            Logros ({logros.length})
          </h1>
        </div>
        <Link
          href="/admin/logros/nuevo"
          className="rounded bg-teal-600 px-4 py-2 font-mono text-sm text-white hover:bg-teal-400"
        >
          + nuevo logro
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {logros.length === 0 && (
          <p className="text-sm text-slate-500">Todavía no hay logros cargados.</p>
        )}
        {logros.map((l) => (
          <div
            key={l.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-display text-base font-medium text-ink-900">{l.titulo}</p>
              <p className="font-mono text-xs text-slate-500">{l.anio}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/logros/${l.id}/editar`}
                className="rounded border border-slate-200 px-3 py-1.5 font-mono text-xs text-ink-900 hover:border-teal-400"
              >
                editar
              </Link>
              <form action={borrarLogroAction.bind(null, l.id)}>
                <button className="rounded border border-coral/30 px-3 py-1.5 font-mono text-xs text-coral hover:bg-coral/10">
                  borrar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-slate-200 pt-10">
        <p className="eyebrow">// estadísticas destacadas</p>
        <h2 className="mt-2 font-display text-xl font-medium text-ink-900">
          Números que se muestran en el inicio
        </h2>
        <form action={actualizarEstadisticasAction} className="mt-6 max-w-xl space-y-4">
          {estadisticas.map((e) => (
            <div key={e.id} className="grid grid-cols-[120px,1fr] gap-3">
              <input
                name={`numero-${e.id}`}
                defaultValue={e.numero}
                className="input"
                placeholder="18"
              />
              <input
                name={`etiqueta-${e.id}`}
                defaultValue={e.etiqueta}
                className="input"
                placeholder="años formando profesionales"
              />
            </div>
          ))}
          <button
            type="submit"
            className="rounded bg-teal-600 px-5 py-3 font-mono text-sm text-white hover:bg-teal-400"
          >
            Guardar estadísticas
          </button>
        </form>
      </div>
    </div>
  );
}
