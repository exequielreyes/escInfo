export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-teal-400" : ""}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-3xl font-medium sm:text-4xl ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 leading-relaxed ${light ? "text-white/70" : "text-slate-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
