import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import { getCursos, getSiteConfig } from "@/lib/db";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return { title: `Cursos — ${config.nombre}` };
}

export const revalidate = 30;

export default async function CursosPage() {
  const cursos = await getCursos();

  return (
    <>
      <section className="bg-ink-900 py-16">
        <Container>
          <SectionHeading
            eyebrow="// cursos disponibles"
            title="Todos los cursos y trayectos"
            description="Hacé clic en un curso para ver su reseña completa, el temario y el formulario de inscripción."
            light
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.map((curso) => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
            {cursos.length === 0 && (
              <p className="text-sm text-slate-500">Todavía no hay cursos publicados.</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
