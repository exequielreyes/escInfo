"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const links = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/cursos", label: "Cursos" },
  { href: "/admin/noticias", label: "Noticias" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/logros", label: "Logros" },
  { href: "/admin/sitio", label: "Datos del sitio" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-paper">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-slate-200 bg-ink-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/admin" className="font-display text-lg text-white">
            Panel de administración
          </Link>
          <form action="/admin/logout" method="post">
            <button className="font-mono text-xs text-white/60 hover:text-white">
              cerrar sesión
            </button>
          </form>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 pb-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded px-3 py-1.5 font-mono text-xs ${
                pathname === l.href
                  ? "bg-teal-600 text-white"
                  : "text-white/70 hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
