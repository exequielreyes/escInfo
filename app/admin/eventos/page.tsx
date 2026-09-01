import Link from "next/link";
import { getEventos } from "@/lib/db";
import { borrarEventoAction } from "./actions";

export default async function AdminEventosPage() {
  const eventos = await getEventos();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// eventos</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
            Eventos ({eventos.length})
          </h1>
        </div>
        <Link
          href="/admin/eventos/nuevo"
          className="rounded bg-teal-600 px-4 py-2 font-mono text-sm text-white hover:bg-teal-400"
        >
          + nuevo evento
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {eventos.length === 0 && (
          <p className="text-sm text-slate-500">Todavía no hay eventos cargados.</p>
        )}
        {eventos.map((e) => (
          <div
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-display text-base font-medium text-ink-900">{e.titulo}</p>
              <p className="font-mono text-xs text-slate-500">
                {e.tipo} · {e.fecha} · {e.modalidad}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/eventos/${e.id}/editar`}
                className="rounded border border-slate-200 px-3 py-1.5 font-mono text-xs text-ink-900 hover:border-teal-400"
              >
                editar
              </Link>
              <form action={borrarEventoAction.bind(null, e.id)}>
                <button className="rounded border border-coral/30 px-3 py-1.5 font-mono text-xs text-coral hover:bg-coral/10">
                  borrar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
