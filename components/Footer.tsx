import Link from "next/link";
import { site } from "@/data/site";
import type { SiteConfig } from "@/lib/types";
import Container from "./Container";

export default function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t border-white/10 bg-ink-900 text-white/70">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-white">{config.nombre}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            {config.descripcion_corta}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">// navegación</p>
          <ul className="space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">// contacto</p>
          <ul className="space-y-2 text-sm">
            <li>{config.contacto_email}</li>
            <li>{config.contacto_telefono}</li>
            <li>{config.contacto_direccion}</li>
            <li>{config.contacto_horario}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {config.institucion}</p>
          <p className="font-mono">hecho con Next.js + Tailwind</p>
        </Container>
      </div>
    </footer>
  );
}
