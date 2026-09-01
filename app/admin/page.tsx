import Link from "next/link";
import { getCursos, getNoticias, getEventos, getLogros } from "@/lib/db";

export default async function AdminDashboard() {
  const [cursos, noticias, eventos, logros] = await Promise.all([
    getCursos(),
    getNoticias(),
    getEventos(),
    getLogros(),
  ]);

  const tarjetas = [
    { label: "Cursos", cantidad: cursos.length, href: "/admin/cursos" },
    { label: "Noticias", cantidad: noticias.length, href: "/admin/noticias" },
    { label: "Eventos", cantidad: eventos.length, href: "/admin/eventos" },
    { label: "Logros", cantidad: logros.length, href: "/admin/logros" },
  ];

  return (
    <div>
      <p className="eyebrow">// panel</p>
      <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
        Contenido del sitio
      </h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">
        Desde acá podés cargar, editar o borrar cursos, noticias, eventos y logros. Los
        cambios se ven reflejados en la página en pocos segundos.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tarjetas.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-teal-400"
          >
            <p className="font-display text-3xl font-medium text-ink-900">{t.cantidad}</p>
            <p className="mt-1 font-mono text-xs text-slate-500">{t.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
