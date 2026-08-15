import Link from "next/link";

// 9-nine 準拠: 濃紺矩形 + Oswald 書体 + 右へ伸びる飾り線
export function ViewMore({ href, label = "VIEW MORE" }: { href: string; label?: string }) {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href={href}
        className="group relative block h-16 w-[260px] bg-nine-blue text-center font-oswald text-sm leading-[64px] tracking-[0.1em] text-white transition-colors hover:bg-nine-blue-hover"
      >
        {label}
        <span className="absolute top-1/2 -right-[50px] h-px w-20 bg-nine-blue transition-all group-hover:-right-[60px]" />
      </Link>
    </div>
  );
}
