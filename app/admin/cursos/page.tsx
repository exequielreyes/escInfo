import Link from "next/link";
import { getCursos } from "@/lib/db";
import { borrarCursoAction } from "./actions";

export default async function AdminCursosPage() {
  const cursos = await getCursos();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// cursos</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
            Cursos ({cursos.length})
          </h1>
        </div>
        <Link
          href="/admin/cursos/nuevo"
          className="rounded bg-teal-600 px-4 py-2 font-mono text-sm text-white hover:bg-teal-400"
        >
          + nuevo curso
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {cursos.length === 0 && (
          <p className="text-sm text-slate-500">Todavía no hay cursos cargados.</p>
        )}
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-display text-base font-medium text-ink-900">{curso.titulo}</p>
              <p className="font-mono text-xs text-slate-500">
                /cursos/{curso.slug} · {curso.nivel} · {curso.modalidad}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/cursos/${curso.id}/editar`}
                className="rounded border border-slate-200 px-3 py-1.5 font-mono text-xs text-ink-900 hover:border-teal-400"
              >
                editar
              </Link>
              <form action={borrarCursoAction.bind(null, curso.id)}>
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
