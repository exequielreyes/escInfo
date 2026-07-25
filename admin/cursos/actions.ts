"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createCurso,
  updateCurso,
  deleteCurso as deleteCursoDb,
} from "@/lib/db";
import { textToParagraphs, textToTemario, slugify } from "@/lib/parse";

function buildCursoFromForm(formData: FormData) {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  return {
    slug: slugInput ? slugify(slugInput) : slugify(titulo),
    titulo,
    categoria: String(formData.get("categoria") ?? "").trim(),
    nivel: String(formData.get("nivel") ?? "Inicial") as "Inicial" | "Intermedio" | "Avanzado",
    modalidad: String(formData.get("modalidad") ?? "Presencial") as
      | "Presencial"
      | "Virtual"
      | "Híbrido",
    duracion: String(formData.get("duracion") ?? "").trim(),
    inicio: String(formData.get("inicio") ?? "").trim(),
    cupos: String(formData.get("cupos") ?? "").trim(),
    resumen: String(formData.get("resumen") ?? "").trim(),
    resena: textToParagraphs(String(formData.get("resena") ?? "")),
    temario: textToTemario(String(formData.get("temario") ?? "")),
    destinatarios: String(formData.get("destinatarios") ?? "").trim(),
    formulario_url: String(formData.get("formulario_url") ?? "").trim(),
  };
}

export async function crearCursoAction(formData: FormData) {
  const data = buildCursoFromForm(formData);
  await createCurso(data);
  revalidatePath("/cursos");
  revalidatePath("/");
  redirect("/admin/cursos");
}

export async function editarCursoAction(id: number, formData: FormData) {
  const data = buildCursoFromForm(formData);
  await updateCurso(id, data);
  revalidatePath("/cursos");
  revalidatePath(`/cursos/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/cursos");
}

export async function borrarCursoAction(id: number) {
  await deleteCursoDb(id);
  revalidatePath("/cursos");
  revalidatePath("/");
  redirect("/admin/cursos");
}
