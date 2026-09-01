import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getNoticiaBySlug, getSiteConfig } from "@/lib/db";

export const revalidate = 30;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const [noticia, config] = await Promise.all([
    getNoticiaBySlug(params.slug),
    getSiteConfig(),
  ]);
  return { title: noticia ? `${noticia.titulo} — ${config.nombre}` : config.nombre };
}

export default async function NoticiaDetallePage({ params }: { params: { slug: string } }) {
  const noticia = await getNoticiaBySlug(params.slug);
  if (!noticia) notFound();

  return (
    <section className="bg-white py-14">
      <Container className="max-w-2xl">
        <Link href="/noticias" className="font-mono text-xs text-slate-500 hover:text-teal-600">
          ← volver a noticias
        </Link>
        <div className="mt-5 flex items-center gap-2 font-mono text-xs text-slate-500">
          <span className="text-teal-600">{noticia.categoria}</span>
          <span>·</span>
          <span>{noticia.fecha}</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink-900">{noticia.titulo}</h1>
        <div className="prose-custom mt-8 space-y-4 leading-relaxed text-slate-500">
          {noticia.contenido.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
