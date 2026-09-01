import CursoForm from "@/components/admin/CursoForm";
import { crearCursoAction } from "../actions";

export default function NuevoCursoPage() {
  return (
    <div>
      <p className="eyebrow">// nuevo curso</p>
      <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">Cargar un curso</h1>
      <div className="mt-8">
        <CursoForm action={crearCursoAction} submitLabel="Publicar curso" />
      </div>
    </div>
  );
}
