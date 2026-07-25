import EventoForm from "@/components/admin/EventoForm";
import { crearEventoAction } from "../actions";

export default function NuevoEventoPage() {
  return (
    <div>
      <p className="eyebrow">// nuevo evento</p>
      <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">Cargar un evento</h1>
      <div className="mt-8">
        <EventoForm action={crearEventoAction} submitLabel="Publicar evento" />
      </div>
    </div>
  );
}
