import { getSiteConfig } from "@/lib/db";
import { actualizarSitioAction } from "./actions";

export default async function AdminSitioPage() {
  const config = await getSiteConfig();

  return (
    <div>
      <p className="eyebrow">// datos del sitio</p>
      <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
        Información general
      </h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">
        Estos datos aparecen en el inicio, en "Quiénes somos" y en el pie de página.
      </p>

      <form action={actualizarSitioAction} className="mt-8 max-w-2xl space-y-6">
        <Campo label="Nombre de la escuela">
          <input name="nombre" required defaultValue={config.nombre} className="input" />
        </Campo>
        <Campo label="Nombre completo de la institución">
          <input name="institucion" required defaultValue={config.institucion} className="input" />
        </Campo>
        <Campo label="Eslogan (frase principal del inicio)">
          <input name="eslogan" required defaultValue={config.eslogan} className="input" />
        </Campo>
        <Campo label="Descripción corta">
          <textarea
            name="descripcion_corta"
            required
            rows={2}
            defaultValue={config.descripcion_corta}
            className="input"
          />
        </Campo>
        <Campo label="Misión">
          <textarea name="mision" required rows={3} defaultValue={config.mision} className="input" />
        </Campo>
        <Campo label="Visión">
          <textarea name="vision" required rows={3} defaultValue={config.vision} className="input" />
        </Campo>

        <div className="grid gap-6 sm:grid-cols-2">
          <Campo label="Email de contacto">
            <input
              name="contacto_email"
              required
              type="email"
              defaultValue={config.contacto_email}
              className="input"
            />
          </Campo>
          <Campo label="Teléfono">
            <input name="contacto_telefono" required defaultValue={config.contacto_telefono} className="input" />
          </Campo>
        </div>
        <Campo label="Dirección">
          <input name="contacto_direccion" required defaultValue={config.contacto_direccion} className="input" />
        </Campo>
        <Campo label="Horario de atención">
          <input name="contacto_horario" required defaultValue={config.contacto_horario} className="input" />
        </Campo>

        <button
          type="submit"
          className="rounded bg-teal-600 px-5 py-3 font-mono text-sm text-white hover:bg-teal-400"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-xs text-slate-500">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
