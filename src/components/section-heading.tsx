// 英字大見出し (ロゴと同じ藍→青紫グラデーション文字) + 日本語小見出し
export function SectionHeading({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="mb-10 flex items-center">
      <p className="text-grad-primary font-display text-5xl font-semibold tracking-[0.075em] sm:text-6xl">
        {en}
      </p>
      <p className="ml-5 text-sm font-medium tracking-[0.05em] text-nine-blue">{ja}</p>
    </div>
  );
}
