"use server";

import { revalidatePath } from "next/cache";
import { updateSiteConfig } from "@/lib/db";

export async function actualizarSitioAction(formData: FormData) {
  await updateSiteConfig({
    nombre: String(formData.get("nombre") ?? "").trim(),
    institucion: String(formData.get("institucion") ?? "").trim(),
    eslogan: String(formData.get("eslogan") ?? "").trim(),
    descripcion_corta: String(formData.get("descripcion_corta") ?? "").trim(),
    mision: String(formData.get("mision") ?? "").trim(),
    vision: String(formData.get("vision") ?? "").trim(),
    contacto_email: String(formData.get("contacto_email") ?? "").trim(),
    contacto_telefono: String(formData.get("contacto_telefono") ?? "").trim(),
    contacto_direccion: String(formData.get("contacto_direccion") ?? "").trim(),
    contacto_horario: String(formData.get("contacto_horario") ?? "").trim(),
  });

  revalidatePath("/");
  revalidatePath("/nosotros");
}
