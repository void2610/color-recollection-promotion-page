"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, SITE } from "@/data/site";

// 9-nine 準拠: 中央寄せ・EN 大 + JA 小の2段ナビ
export function SiteNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-40 bg-white">
      <div className="mx-auto flex h-[120px] max-w-6xl items-center justify-between px-6 sm:justify-center">
        <Link href="/" className="sm:hidden">
          <span className="font-display text-2xl font-bold text-nine-blue">
            {SITE.titleEn}
          </span>
        </Link>

        <nav className="hidden sm:block">
          <ul className="flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative flex h-[120px] flex-col items-center justify-center px-6 text-nine-blue"
                  >
                    <span
                      className={`absolute top-3 left-1/2 h-8 w-px -translate-x-1/2 bg-nine-blue/60 transition-transform origin-top ${isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`}
                    />
                    <span className="font-display text-base tracking-[0.1em]">
                      {item.en}
                    </span>
                    <span className="mt-1 text-[10px] tracking-[0.2em] text-nine-blue/70">
                      {item.ja}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span className={`h-0.5 w-6 bg-nine-blue transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-nine-blue ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-nine-blue transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="absolute inset-x-0 top-[120px] border-t border-nine-pale bg-white shadow-lg sm:hidden">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="nine-hairline">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-baseline gap-3 px-6 py-4 text-nine-blue"
                >
                  <span className="font-display text-lg tracking-[0.1em]">{item.en}</span>
                  <span className="text-xs tracking-[0.2em] text-nine-blue/70">{item.ja}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
