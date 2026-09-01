import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import { getNoticias, getSiteConfig } from "@/lib/db";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return { title: `Noticias — ${config.nombre}` };
}

export const revalidate = 30;

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <>
      <section className="bg-ink-900 py-16">
        <Container>
          <SectionHeading
            eyebrow="// noticias"
            title="Novedades de la escuela"
            description="Institucionales, logros y vinculación con el sector productivo."
            light
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((n) => (
              <NewsCard key={n.id} noticia={n} />
            ))}
            {noticias.length === 0 && (
              <p className="text-sm text-slate-500">Todavía no hay noticias publicadas.</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
