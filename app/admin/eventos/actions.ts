"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createEvento, updateEvento, deleteEvento as deleteEventoDb } from "@/lib/db";
import { slugify } from "@/lib/parse";

function buildEventoFromForm(formData: FormData) {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const enlace = String(formData.get("enlace") ?? "").trim();

  return {
    slug: slugInput ? slugify(slugInput) : slugify(titulo),
    tipo: String(formData.get("tipo") ?? "Seminario") as "Seminario" | "Webinar" | "Congreso",
    titulo,
    fecha: String(formData.get("fecha") ?? "").trim(),
    modalidad: String(formData.get("modalidad") ?? "Presencial") as
      | "Presencial"
      | "Virtual"
      | "Híbrido",
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    rol: String(formData.get("rol") ?? "").trim(),
    enlace: enlace || null,
  };
}

export async function crearEventoAction(formData: FormData) {
  const data = buildEventoFromForm(formData);
  await createEvento(data);
  revalidatePath("/eventos");
  revalidatePath("/");
  redirect("/admin/eventos");
}

export async function editarEventoAction(id: number, formData: FormData) {
  const data = buildEventoFromForm(formData);
  await updateEvento(id, data);
  revalidatePath("/eventos");
  revalidatePath("/");
  redirect("/admin/eventos");
}

export async function borrarEventoAction(id: number) {
  await deleteEventoDb(id);
  revalidatePath("/eventos");
  revalidatePath("/");
  redirect("/admin/eventos");
}
