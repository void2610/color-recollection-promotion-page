export function SectionHeading({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="mb-8">
      <p className="bg-gradient-to-r from-[#00b7eb] via-[#e0218a] to-[#f5c518] bg-clip-text text-sm font-semibold uppercase tracking-[0.3em] text-transparent">
        {en}
      </p>
      <h2 className="mt-1 text-3xl font-bold">{ja}</h2>
    </div>
  );
}
