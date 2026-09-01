import Link from "next/link";
import { Curso } from "@/lib/types";

const nivelColor: Record<Curso["nivel"], string> = {
  Inicial: "bg-teal-50 text-teal-700",
  Intermedio: "bg-amber-100 text-amber-600",
  Avanzado: "bg-ink-50 text-ink-700",
};

export default function CourseCard({ curso }: { curso: Curso }) {
  return (
    <Link
      href={`/cursos/${curso.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-600/5"
    >
      <div className="border-b border-slate-200 bg-ink-50/60 px-4 py-2 font-mono text-xs text-slate-500">
        // cursos/{curso.slug}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded px-2 py-0.5 font-mono text-xs ${nivelColor[curso.nivel]}`}>
            {curso.nivel}
          </span>
          <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
            {curso.modalidad}
          </span>
        </div>
        <h3 className="font-display text-lg font-medium text-ink-900 group-hover:text-teal-700">
          {curso.titulo}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
          {curso.resumen}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-xs text-slate-500">
          <span>{curso.duracion}</span>
          <span className="text-teal-600 group-hover:underline">ver temario →</span>
        </div>
      </div>
    </Link>
  );
}
