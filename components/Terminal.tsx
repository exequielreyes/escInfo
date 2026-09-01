export default function Terminal({ mision }: { mision: string }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-[#0A0F1A] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-400/70" />
        <span className="ml-3 font-mono text-xs text-white/40">
          escuela@informatica: ~/mision.txt
        </span>
      </div>
      <div className="space-y-2 px-5 py-6 font-mono text-[13px] leading-relaxed text-teal-100 sm:text-sm">
        <p className="text-white/40">$ cat mision.txt</p>
        <p className="text-white/90">{mision}</p>
        <p className="mt-4 text-white/40">$ ls cursos/ --activos</p>
        <p className="text-white/70">
          programacion-web-full-stack/ ciencia-de-datos-con-python/
          ciberseguridad-fundamentos/ ...
        </p>
        <p className="mt-4 flex items-center gap-1 text-white/40">
          $<span className="h-4 w-2 animate-blink bg-teal-400" aria-hidden />
        </p>
      </div>
    </div>
  );
}
