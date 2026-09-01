"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createNoticia, updateNoticia, deleteNoticia as deleteNoticiaDb } from "@/lib/db";
import { textToParagraphs, slugify } from "@/lib/parse";

function buildNoticiaFromForm(formData: FormData) {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  return {
    slug: slugInput ? slugify(slugInput) : slugify(titulo),
    titulo,
    fecha: String(formData.get("fecha") ?? "").trim(),
    categoria: String(formData.get("categoria") ?? "").trim(),
    resumen: String(formData.get("resumen") ?? "").trim(),
    contenido: textToParagraphs(String(formData.get("contenido") ?? "")),
  };
}

export async function crearNoticiaAction(formData: FormData) {
  const data = buildNoticiaFromForm(formData);
  await createNoticia(data);
  revalidatePath("/noticias");
  revalidatePath("/");
  redirect("/admin/noticias");
}

export async function editarNoticiaAction(id: number, formData: FormData) {
  const data = buildNoticiaFromForm(formData);
  await updateNoticia(id, data);
  revalidatePath("/noticias");
  revalidatePath(`/noticias/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/noticias");
}

export async function borrarNoticiaAction(id: number) {
  await deleteNoticiaDb(id);
  revalidatePath("/noticias");
  revalidatePath("/");
  redirect("/admin/noticias");
}
