import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";
import { getSiteConfig, getLogros, getEstadisticas } from "@/lib/db";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return { title: `Quiénes somos — ${config.nombre}` };
}

export const revalidate = 30;

export default async function NosotrosPage() {
  const [config, logros, estadisticas] = await Promise.all([
    getSiteConfig(),
    getLogros(),
    getEstadisticas(),
  ]);

  return (
    <>
      <section className="bg-ink-900 py-16">
        <Container>
          <SectionHeading eyebrow="// quiénes somos" title="La escuela" light />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">// misión</p>
            <p className="mt-3 leading-relaxed text-slate-500">{config.mision}</p>
          </div>
          <div>
            <p className="eyebrow">// visión</p>
            <p className="mt-3 leading-relaxed text-slate-500">{config.vision}</p>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container>
          <p className="eyebrow">// cómo trabajamos</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {site.valores.map((v) => (
              <div key={v.titulo} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-display text-lg font-medium text-ink-900">{v.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.detalle}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-700 py-16">
        <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {estadisticas.map((e) => (
            <div key={e.id} className="border-l-2 border-teal-600 pl-4">
              <p className="font-display text-3xl font-medium text-white">{e.numero}</p>
              <p className="mt-1 text-sm text-white/60">{e.etiqueta}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="// logros institucionales"
            title="Nuestra trayectoria"
            description="Un registro de acreditaciones, reconocimientos y vínculos que consolidaron el crecimiento de la escuela."
          />

          <ol className="mt-10 space-y-8 border-l border-slate-200 pl-6">
            {logros.map((logro) => (
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
            {logros.length === 0 && (
              <p className="text-sm text-slate-500">Todavía no hay logros cargados.</p>
            )}
          </ol>
        </Container>
      </section>
    </>
  );
}
