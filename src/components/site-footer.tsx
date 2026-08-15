import Link from "next/link";
import { GithubIcon, XIcon } from "@/components/brand-icons";
import { CIRCLE_NAME } from "@/data/creators";
import { NAV_ITEMS, SITE } from "@/data/site";

// 9-nine 準拠: 濃紺 + 菱形柄 + ドット状上端 + ナビ再掲 + ダイヤ型 SHARE アイコン
export function SiteFooter() {
  return (
    <footer className="relative">
      <div className="grad-footer text-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <nav className="border-l border-white/60 pl-8">
            <ul className="flex flex-wrap gap-x-10 gap-y-3 pt-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-display text-base tracking-[0.15em] text-white/90 transition-colors hover:text-white"
                  >
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
              <span className="font-display text-sm tracking-[0.2em]">SHARE</span>
              <a
                href={SITE.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-11 w-11 rotate-45 items-center justify-center bg-white text-nine-blue transition-colors hover:bg-nine-pale"
              >
                <span className="-rotate-45">
                  <XIcon size={18} />
                </span>
              </a>
              <a
                href={SITE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 rotate-45 items-center justify-center bg-white text-nine-blue transition-colors hover:bg-nine-pale"
              >
                <span className="-rotate-45">
                  <GithubIcon size={18} />
                </span>
              </a>
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
