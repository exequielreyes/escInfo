import { notFound } from "next/navigation";
import { getCursoById } from "@/lib/db";
import CursoForm from "@/components/admin/CursoForm";
import { editarCursoAction, borrarCursoAction } from "../../actions";

export default async function EditarCursoPage({ params }: { params: { id: string } }) {
  const curso = await getCursoById(Number(params.id));
  if (!curso) notFound();

  const actionConId = editarCursoAction.bind(null, curso.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// editar curso</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">{curso.titulo}</h1>
        </div>
        <form action={borrarCursoAction.bind(null, curso.id)}>
          <button className="rounded border border-coral/30 px-3 py-1.5 font-mono text-xs text-coral hover:bg-coral/10">
            borrar curso
          </button>
        </form>
      </div>
      <div className="mt-8">
        <CursoForm curso={curso} action={actionConId} submitLabel="Guardar cambios" />
      </div>
    </div>
  );
}
