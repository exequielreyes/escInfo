export default function StatCard({ numero, etiqueta }: { numero: string; etiqueta: string }) {
  return (
    <div className="border-l-2 border-teal-600 pl-4">
      <p className="font-display text-3xl font-medium text-white sm:text-4xl">{numero}</p>
      <p className="mt-1 text-sm text-white/60">{etiqueta}</p>
    </div>
  );
}
