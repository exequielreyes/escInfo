import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getEventoBySlug, getSiteConfig } from "@/lib/db";
import { Evento } from "@/lib/types";

export const revalidate = 30;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const [evento, config] = await Promise.all([
    getEventoBySlug(params.slug),
    getSiteConfig(),
  ]);
  return { title: evento ? `${evento.titulo} — ${config.nombre}` : config.nombre };
}

const tipoColor: Record<Evento["tipo"], string> = {
  Seminario: "text-teal-600 bg-teal-50",
  Webinar: "text-amber-600 bg-amber-100",
  Congreso: "text-coral bg-coral/10",
};

export default async function EventoDetallePage({ params }: { params: { slug: string } }) {
  const evento = await getEventoBySlug(params.slug);
  if (!evento) notFound();

  return (
    <>
      <section className="bg-ink-900 py-14">
        <Container>
          <Link href="/eventos" className="font-mono text-xs text-white/50 hover:text-white">
            ← volver a eventos
          </Link>
          <p className="eyebrow mt-5 text-teal-400">// eventos/{evento.slug}</p>
          <h1 className="mt-3 font-display text-3xl font-medium text-white sm:text-4xl">
            {evento.titulo}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            <span className="rounded bg-white/10 px-2 py-1 text-white/80">{evento.tipo}</span>
            <span className="rounded bg-white/10 px-2 py-1 text-white/80">{evento.modalidad}</span>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="eyebrow">// descripción</p>
            <div className="prose-custom mt-3 space-y-3 leading-relaxed text-slate-500 whitespace-pre-line">
              {evento.descripcion}
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-slate-200 bg-paper p-6 lg:sticky lg:top-24">
            <p className="eyebrow">// datos del evento</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Fecha</dt>
                <dd className="text-right font-medium text-ink-900">{evento.fecha}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Modalidad</dt>
                <dd className="text-right font-medium text-ink-900">{evento.modalidad}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Rol</dt>
                <dd className="text-right font-medium text-ink-900">{evento.rol}</dd>
              </div>
            </dl>

            {evento.enlace && (
              <a
                href={evento.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded bg-teal-600 px-5 py-3 text-center font-mono text-sm text-white transition-colors hover:bg-teal-400"
              >
                Más información
              </a>
            )}
          </aside>
        </Container>
      </section>
    </>
  );
}
