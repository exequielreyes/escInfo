export function textToParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function paragraphsToText(paragraphs: string[]): string {
  return (paragraphs ?? []).join("\n\n");
}

export type TemarioUnidad = { unidad: string; contenidos: string[] };

export function textToTemario(text: string): TemarioUnidad[] {
  const bloques = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return bloques.map((bloque) => {
    const lineas = bloque.split("\n").map((l) => l.trim());
    const [unidad, ...resto] = lineas;
    const contenidos = resto
      .map((l) => l.replace(/^-\s*/, "").trim())
      .filter(Boolean);
    return { unidad, contenidos };
  });
}

export function temarioToText(temario: TemarioUnidad[]): string {
  return (temario ?? [])
    .map((u) => `${u.unidad}\n${u.contenidos.map((c) => `- ${c}`).join("\n")}`)
    .join("\n\n");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
