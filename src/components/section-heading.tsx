// 9-nine 準拠: 英字大見出し (Cormorant) + 日本語小見出しの横並び
export function SectionHeading({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="mb-10 flex items-center">
      <p className="font-display text-5xl font-semibold tracking-[0.075em] text-nine-blue sm:text-6xl">
        {en}
      </p>
      <p className="ml-5 text-sm font-medium tracking-[0.05em] text-nine-blue">{ja}</p>
    </div>
  );
}
