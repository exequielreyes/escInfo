import { notFound } from "next/navigation";
import { getLogroById } from "@/lib/db";
import LogroForm from "@/components/admin/LogroForm";
import { editarLogroAction, borrarLogroAction } from "../../actions";

export default async function EditarLogroPage({ params }: { params: { id: string } }) {
  const logro = await getLogroById(Number(params.id));
  if (!logro) notFound();

  const actionConId = editarLogroAction.bind(null, logro.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">// editar logro</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">{logro.titulo}</h1>
        </div>
        <form action={borrarLogroAction.bind(null, logro.id)}>
          <button className="rounded border border-coral/30 px-3 py-1.5 font-mono text-xs text-coral hover:bg-coral/10">
            borrar logro
          </button>
        </form>
      </div>
      <div className="mt-8">
        <LogroForm logro={logro} action={actionConId} submitLabel="Guardar cambios" />
      </div>
    </div>
  );
}
