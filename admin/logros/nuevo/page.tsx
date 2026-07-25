import LogroForm from "@/components/admin/LogroForm";
import { crearLogroAction } from "../actions";

export default function NuevoLogroPage() {
  return (
    <div>
      <p className="eyebrow">// nuevo logro</p>
      <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">Cargar un logro</h1>
      <div className="mt-8">
        <LogroForm action={crearLogroAction} submitLabel="Publicar logro" />
      </div>
    </div>
  );
}
