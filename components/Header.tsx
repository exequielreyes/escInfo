"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";
import Container from "./Container";

export default function Header({ nombre }: { nombre: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-medium text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-teal-600 font-mono text-sm text-white">
            &lt;/&gt;
          </span>
          <span>{nombre}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 font-mono text-sm transition-colors ${
                  active
                    ? "text-teal-400"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {active ? <span className="text-teal-600">./</span> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded text-white md:hidden"
        >
          <span className="font-mono text-lg">{open ? "×" : "≡"}</span>
        </button>
      </Container>

      {open && (
        <nav className="border-t border-white/10 bg-ink-900 md:hidden">
          <Container className="flex flex-col py-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-mono text-sm text-white/85"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
