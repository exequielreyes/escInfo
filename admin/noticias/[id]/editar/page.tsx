import { notFound } from "next/navigation";
import { getNoticiaById } from "@/lib/db";
import NoticiaForm from "@/components/admin/NoticiaForm";
import { editarNoticiaAction, borrarNoticiaAction } from "../../actions";

export default async function EditarNoticiaPage({ params }: { params: { id: string } }) {
  const noticia = await getNoticiaById(Number(params.id));
  if (!noticia) notFound();

  const actionConId = editarNoticiaAction.bind(null, noticia.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// editar noticia</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">{noticia.titulo}</h1>
        </div>
        <form action={borrarNoticiaAction.bind(null, noticia.id)}>
          <button className="rounded border border-coral/30 px-3 py-1.5 font-mono text-xs text-coral hover:bg-coral/10">
            borrar noticia
          </button>
        </form>
      </div>
      <div className="mt-8">
        <NoticiaForm noticia={noticia} action={actionConId} submitLabel="Guardar cambios" />
      </div>
    </div>
  );
}
