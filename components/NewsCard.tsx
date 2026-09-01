import Link from "next/link";
import { Noticia } from "@/lib/types";

export default function NewsCard({ noticia }: { noticia: Noticia }) {
  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-teal-400"
    >
      <div className="mb-3 flex items-center gap-2 font-mono text-xs text-slate-500">
        <span className="text-teal-600">{noticia.categoria}</span>
        <span>·</span>
        <span>{noticia.fecha}</span>
      </div>
      <h3 className="font-display text-lg font-medium text-ink-900 group-hover:text-teal-700">
        {noticia.titulo}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{noticia.resumen}</p>
      <span className="mt-4 font-mono text-xs text-teal-600 group-hover:underline">
        leer más →
      </span>
    </Link>
  );
}
