import { notFound } from "next/navigation";
import { getEventoById } from "@/lib/db";
import EventoForm from "@/components/admin/EventoForm";
import { editarEventoAction, borrarEventoAction } from "../../actions";

export default async function EditarEventoPage({ params }: { params: { id: string } }) {
  const evento = await getEventoById(Number(params.id));
  if (!evento) notFound();

  const actionConId = editarEventoAction.bind(null, evento.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// editar evento</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">{evento.titulo}</h1>
        </div>
        <form action={borrarEventoAction.bind(null, evento.id)}>
          <button className="rounded border border-coral/30 px-3 py-1.5 font-mono text-xs text-coral hover:bg-coral/10">
            borrar evento
          </button>
        </form>
      </div>
      <div className="mt-8">
        <EventoForm evento={evento} action={actionConId} submitLabel="Guardar cambios" />
      </div>
    </div>
  );
}
