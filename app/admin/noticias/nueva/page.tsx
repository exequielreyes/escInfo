import NoticiaForm from "@/components/admin/NoticiaForm";
import { crearNoticiaAction } from "../actions";

export default function NuevaNoticiaPage() {
  return (
    <div>
      <p className="eyebrow">// nueva noticia</p>
      <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">Cargar una noticia</h1>
      <div className="mt-8">
        <NoticiaForm action={crearNoticiaAction} submitLabel="Publicar noticia" />
      </div>
    </div>
  );
}
