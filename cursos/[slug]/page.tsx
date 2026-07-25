import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getCursoBySlug, getSiteConfig } from "@/lib/db";

export const revalidate = 30;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const [curso, config] = await Promise.all([
    getCursoBySlug(params.slug),
    getSiteConfig(),
  ]);
  return { title: curso ? `${curso.titulo} — ${config.nombre}` : config.nombre };
}

export default async function CursoDetallePage({ params }: { params: { slug: string } }) {
  const curso = await getCursoBySlug(params.slug);
  if (!curso) notFound();

  return (
    <>
      <section className="bg-ink-900 py-14">
        <Container>
          <Link href="/cursos" className="font-mono text-xs text-white/50 hover:text-white">
            ← volver a cursos
          </Link>
          <p className="eyebrow mt-5 text-teal-400">// cursos/{curso.slug}</p>
          <h1 className="mt-3 font-display text-3xl font-medium text-white sm:text-4xl">
            {curso.titulo}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            <span className="rounded bg-white/10 px-2 py-1 text-white/80">{curso.categoria}</span>
            <span className="rounded bg-white/10 px-2 py-1 text-white/80">{curso.nivel}</span>
            <span className="rounded bg-white/10 px-2 py-1 text-white/80">{curso.modalidad}</span>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="eyebrow">// reseña</p>
            <div className="prose-custom mt-3 space-y-3 leading-relaxed text-slate-500">
              {curso.resena.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <p className="eyebrow mt-10">// temario</p>
            <div className="mt-4 space-y-6">
              {curso.temario.map((bloque, i) => (
                <div key={i} className="rounded-lg border border-slate-200 p-5">
                  <h3 className="font-display text-base font-medium text-ink-900">
                    {bloque.unidad}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {bloque.contenidos.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-slate-500">
                        <span className="mt-0.5 font-mono text-teal-600">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="eyebrow mt-10">// destinatarios</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">{curso.destinatarios}</p>
          </div>

          <aside className="h-fit rounded-lg border border-slate-200 bg-paper p-6 lg:sticky lg:top-24">
            <p className="eyebrow">// datos del curso</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Duración</dt>
                <dd className="text-right font-medium text-ink-900">{curso.duracion}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Inicio</dt>
                <dd className="text-right font-medium text-ink-900">{curso.inicio}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Cupos</dt>
                <dd className="text-right font-medium text-ink-900">{curso.cupos}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Modalidad</dt>
                <dd className="text-right font-medium text-ink-900">{curso.modalidad}</dd>
              </div>
            </dl>

            <a
              href={curso.formulario_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded bg-teal-600 px-5 py-3 text-center font-mono text-sm text-white transition-colors hover:bg-teal-400"
            >
              Inscribirme al curso
            </a>
            <p className="mt-3 text-center text-xs text-slate-500">
              La inscripción se completa en un formulario de Google.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
