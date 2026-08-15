import Link from "next/link";

// ゲームのタイトルボタン再現: グラデーションバー + 四隅のキラキラ
export function ViewMore({ href, label = "VIEW MORE" }: { href: string; label?: string }) {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href={href}
        className="group grad-primary relative block h-16 w-[260px] text-center font-oswald text-sm leading-[64px] tracking-[0.1em] text-white transition-[filter] hover:brightness-125"
      >
        {label}
        <span aria-hidden className="sparkle absolute -top-2 -left-2 text-lg">
          ✦
        </span>
        <span aria-hidden className="sparkle absolute -right-2 -bottom-3 text-lg">
          ✦
        </span>
        <span className="absolute top-1/2 -right-[50px] h-px w-20 bg-gradient-to-r from-[#7a63c4] via-[#f2b1d8] to-[#8ad4e8] transition-all group-hover:-right-[60px]" />
      </Link>
    </div>
  );
}
