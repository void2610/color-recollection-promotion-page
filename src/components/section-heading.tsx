// 英字大見出し (ロゴと同じ藍→青紫グラデーション文字) + 日本語小見出し
// center: hirahirahihiru.com 準拠の中央寄せ・字間広めの見出し
export function SectionHeading({
  en,
  ja,
  align = "left",
}: {
  en: string;
  ja: string;
  align?: "left" | "center";
}) {
  if (align === "center") {
    return (
      <div className="mb-12 flex flex-col items-center text-center">
        <p className="text-grad-primary font-display text-5xl font-semibold tracking-[0.3em] sm:text-6xl">
          {en}
        </p>
        <p className="mt-2 flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-nine-blue">
          <span aria-hidden className="sparkle text-sm">✦</span>
          {ja}
          <span aria-hidden className="sparkle text-sm">✦</span>
        </p>
      </div>
    );
  }
  return (
    <div className="mb-10 flex items-center">
      <p className="text-grad-primary font-display text-5xl font-semibold tracking-[0.075em] sm:text-6xl">
        {en}
      </p>
      <p className="ml-5 text-sm font-medium tracking-[0.05em] text-nine-blue">{ja}</p>
    </div>
  );
}
