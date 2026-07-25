import Link from "next/link";
import Container from "@/components/Container";
import Terminal from "@/components/Terminal";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import CourseCard from "@/components/CourseCard";
import EventCard from "@/components/EventCard";
import NewsCard from "@/components/NewsCard";
import {
  getSiteConfig,
  getEstadisticas,
  getLogros,
  getCursos,
  getEventos,
  getNoticias,
} from "@/lib/db";

export const revalidate = 30;

export default async function HomePage() {
  const [config, estadisticas, logros, cursos, eventos, noticias] = await Promise.all([
    getSiteConfig(),
    getEstadisticas(),
    getLogros(),
    getCursos(),
    getEventos(),
    getNoticias(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-900">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" aria-hidden />
        <Container className="relative grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="eyebrow text-teal-400">// {config.institucion}</p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
              {config.eslogan}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              {config.descripcion_corta}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cursos"
                className="rounded bg-teal-600 px-5 py-3 font-mono text-sm text-white transition-colors hover:bg-teal-400"
              >
                Ver cursos disponibles
              </Link>
              <Link
                href="/nosotros"
                className="rounded border border-white/20 px-5 py-3 font-mono text-sm text-white/85 transition-colors hover:border-white/40"
              >
                Quiénes somos
              </Link>
            </div>
          </div>
          <Terminal mision={config.mision} />
        </Container>
      </section>

      {/* ESTADISTICAS */}
      <section className="bg-ink-700">
        <Container className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          {estadisticas.map((e) => (
            <StatCard key={e.id} numero={e.numero} etiqueta={e.etiqueta} />
          ))}
        </Container>
      </section>

      {/* LOGROS INSTITUCIONALES */}
      <section className="bg-paper py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="// logros institucionales"
              title="Lo que construimos en los últimos años"
              description="Un recorrido por reconocimientos, acreditaciones y vínculos que fortalecen la formación de nuestros estudiantes."
            />
            <Link
              href="/nosotros"
              className="font-mono text-sm text-teal-600 hover:underline md:mb-1"
            >
              ver historia completa →
            </Link>
          </div>

          <ol className="mt-10 space-y-6 border-l border-slate-200 pl-6">
            {logros.slice(0, 3).map((logro) => (
              <li key={logro.id} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-teal-600" />
                <p className="font-mono text-xs text-teal-600">{logro.anio}</p>
                <h3 className="mt-1 font-display text-lg font-medium text-ink-900">
                  {logro.titulo}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
                  {logro.detalle}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CURSOS DESTACADOS */}
      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="// cursos disponibles"
              title="Elegí tu próximo trayecto formativo"
              description="Cada curso incluye reseña, temario detallado e inscripción online."
            />
            <Link href="/cursos" className="font-mono text-sm text-teal-600 hover:underline md:mb-1">
              ver todos los cursos →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.slice(0, 3).map((curso) => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
            {cursos.length === 0 && (
              <p className="text-sm text-slate-500">Todavía no hay cursos publicados.</p>
            )}
          </div>
        </Container>
      </section>

      {/* EVENTOS */}
      <section className="bg-paper py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="// seminarios, webinars y congresos"
              title="Actividad académica reciente"
              description="Encuentros que organizamos y espacios en los que participamos junto a otras instituciones."
            />
            <Link href="/eventos" className="font-mono text-sm text-teal-600 hover:underline md:mb-1">
              ver todos los eventos →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventos.slice(0, 3).map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
            {eventos.length === 0 && (
              <p className="text-sm text-slate-500">Todavía no hay eventos publicados.</p>
            )}
          </div>
        </Container>
      </section>

      {/* NOTICIAS */}
      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="// noticias" title="Últimas novedades de la escuela" />
            <Link href="/noticias" className="font-mono text-sm text-teal-600 hover:underline md:mb-1">
              ver todas las noticias →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.slice(0, 3).map((n) => (
              <NewsCard key={n.id} noticia={n} />
            ))}
            {noticias.length === 0 && (
              <p className="text-sm text-slate-500">Todavía no hay noticias publicadas.</p>
            )}
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ink-900 py-16">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
            ¿Listo para empezar tu formación?
          </h2>
          <p className="max-w-md text-sm text-white/70">
            Las inscripciones para el próximo cuatrimestre ya están abiertas. Los cupos son limitados.
          </p>
          <Link
            href="/cursos"
            className="rounded bg-teal-600 px-6 py-3 font-mono text-sm text-white transition-colors hover:bg-teal-400"
          >
            Ver cursos e inscribirme
          </Link>
        </Container>
      </section>
    </>
  );
}
