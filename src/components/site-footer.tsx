import Link from "next/link";
import { XIcon } from "@/components/brand-icons";
import { DiamondButton } from "@/components/diamond-button";
import { CIRCLE_NAME } from "@/data/creators";
import { NAV_ITEMS, SITE } from "@/data/site";

// 9-nine 準拠: 濃紺 + ドット状上端 + ナビ再掲 + ダイヤ型 SHARE アイコン
export function SiteFooter() {
  return (
    <footer className="relative">
      <div className="grad-footer text-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <nav className="border-l border-white/60 pl-8">
            <ul className="flex flex-wrap gap-x-10 gap-y-3 pt-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative block pt-4 font-display text-base tracking-[0.15em] text-white/90 transition-colors hover:text-white"
                  >
                    {/* ヘッダーと同じ、上から伸びる縦線のホバー演出 */}
                    <span className="absolute top-0 left-1/2 h-3 w-px origin-top -translate-x-1/2 scale-y-0 bg-white/70 transition-transform duration-500 ease-out group-hover:scale-y-100" />
                    {item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-14 flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
            <div className="flex items-center gap-6">
              <span className="font-display text-3xl font-bold leading-none">
                {SITE.title}
              </span>
              <span className="font-display text-sm tracking-[0.2em] text-white/90">
                OFFICIAL SITE
              </span>
            </div>
            <div className="flex items-center gap-6 border-y border-white/60 py-5">
              <DiamondButton href={SITE.links.twitter} variant="solid" size="md" aria-label="X (Twitter)">
                <XIcon size={18} />
              </DiamondButton>
            </div>
          </div>

          <p className="mt-12 font-display text-xs tracking-[0.15em] text-white/80">
            © {CIRCLE_NAME} / {SITE.titleEn.toUpperCase()} ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
