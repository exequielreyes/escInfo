import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <Container className="text-center">
        <p className="font-mono text-sm text-teal-600">error 404</p>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink-900">
          No encontramos esta página
        </h1>
        <p className="mt-3 text-slate-500">
          Puede que el contenido se haya movido o ya no esté disponible.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-teal-600 px-5 py-3 font-mono text-sm text-white hover:bg-teal-400"
        >
          Volver al inicio
        </Link>
      </Container>
    </section>
  );
}
