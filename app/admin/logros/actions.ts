"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createLogro,
  updateLogro,
  deleteLogro as deleteLogroDb,
  getEstadisticas,
  updateEstadistica,
} from "@/lib/db";

function buildLogroFromForm(formData: FormData) {
  return {
    anio: String(formData.get("anio") ?? "").trim(),
    titulo: String(formData.get("titulo") ?? "").trim(),
    detalle: String(formData.get("detalle") ?? "").trim(),
  };
}

export async function crearLogroAction(formData: FormData) {
  const data = buildLogroFromForm(formData);
  await createLogro(data);
  revalidatePath("/nosotros");
  revalidatePath("/");
  redirect("/admin/logros");
}

export async function editarLogroAction(id: number, formData: FormData) {
  const data = buildLogroFromForm(formData);
  await updateLogro(id, data);
  revalidatePath("/nosotros");
  revalidatePath("/");
  redirect("/admin/logros");
}

export async function borrarLogroAction(id: number) {
  await deleteLogroDb(id);
  revalidatePath("/nosotros");
  revalidatePath("/");
  redirect("/admin/logros");
}

export async function actualizarEstadisticasAction(formData: FormData) {
  const estadisticas = await getEstadisticas();

  await Promise.all(
    estadisticas.map((e) => {
      const numero = String(formData.get(`numero-${e.id}`) ?? "").trim();
      const etiqueta = String(formData.get(`etiqueta-${e.id}`) ?? "").trim();
      return updateEstadistica(e.id, { numero, etiqueta, orden: e.orden });
    })
  );

  revalidatePath("/nosotros");
  revalidatePath("/");
  redirect("/admin/logros");
}
