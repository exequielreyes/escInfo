import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { getEventos, getSiteConfig } from "@/lib/db";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return { title: `Eventos — ${config.nombre}` };
}

export const revalidate = 30;

export default async function EventosPage() {
  const eventos = await getEventos();

  return (
    <>
      <section className="bg-ink-900 py-16">
        <Container>
          <SectionHeading
            eyebrow="// seminarios, webinars y congresos"
            title="Actividad académica"
            description="Encuentros organizados por la escuela y participaciones en congresos y jornadas junto a otras instituciones."
            light
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
            {eventos.length === 0 && (
              <p className="text-sm text-slate-500">Todavía no hay eventos publicados.</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
