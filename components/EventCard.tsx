import Link from "next/link";
import { Evento } from "@/lib/types";

const tipoColor: Record<Evento["tipo"], string> = {
  Seminario: "text-teal-600 bg-teal-50",
  Webinar: "text-amber-600 bg-amber-100",
  Congreso: "text-coral bg-coral/10",
};

export default function EventCard({ evento }: { evento: Evento }) {
  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`rounded px-2 py-0.5 font-mono text-xs ${tipoColor[evento.tipo]}`}>
          {evento.tipo}
        </span>
        <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
          {evento.modalidad}
        </span>
      </div>
      <h3 className="font-display text-lg font-medium text-ink-900">{evento.titulo}</h3>
      <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-500 line-clamp-3">
        {evento.descripcion}
      </p>
      <div className="mt-4 flex flex-col gap-4 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between font-mono text-xs text-slate-500">
          <span>{evento.fecha}</span>
          <span>{evento.rol}</span>
        </div>
        <Link 
          href={`/eventos/${evento.slug}`}
          className="text-center rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          Leer más
        </Link>
      </div>
    </article>
  );
}
