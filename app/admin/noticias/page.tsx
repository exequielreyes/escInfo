import Link from "next/link";
import { getNoticias } from "@/lib/db";
import { borrarNoticiaAction } from "./actions";

export default async function AdminNoticiasPage() {
  const noticias = await getNoticias();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// noticias</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
            Noticias ({noticias.length})
          </h1>
        </div>
        <Link
          href="/admin/noticias/nueva"
          className="rounded bg-teal-600 px-4 py-2 font-mono text-sm text-white hover:bg-teal-400"
        >
          + nueva noticia
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {noticias.length === 0 && (
          <p className="text-sm text-slate-500">Todavía no hay noticias cargadas.</p>
        )}
        {noticias.map((n) => (
          <div
            key={n.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-display text-base font-medium text-ink-900">{n.titulo}</p>
              <p className="font-mono text-xs text-slate-500">
                {n.fecha} · {n.categoria}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/noticias/${n.id}/editar`}
                className="rounded border border-slate-200 px-3 py-1.5 font-mono text-xs text-ink-900 hover:border-teal-400"
              >
                editar
              </Link>
              <form action={borrarNoticiaAction.bind(null, n.id)}>
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
