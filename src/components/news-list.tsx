"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/data/news";

// ニュース一覧。クリックで詳細をモーダル表示する
export function NewsList({ items }: { items: NewsItem[] }) {
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 250);
  };

  // モーダル表示中は Esc で閉じ、背面のスクロールを止める
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={`${item.date}-${item.title}`} className="nine-hairline">
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="flex w-full cursor-pointer flex-wrap items-center gap-4 py-5 text-left transition-colors hover:bg-nine-pale/40"
            >
              <time className="font-oswald text-sm tracking-[0.1em] text-nine-blue">
                {item.date.replaceAll("-", ".")}
              </time>
              <span className="grad-primary w-20 py-0.5 text-center text-xs text-white">{item.category}</span>
              <span className="text-sm">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={close}
          className={`lightbox-overlay ${closing ? "is-closing" : ""} fixed inset-0 z-[90] flex items-center justify-center bg-[#302030]/80 p-6 backdrop-blur-sm`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lightbox-panel relative w-full max-w-xl bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          >
            <span aria-hidden className="sparkle absolute -top-3 -left-3 text-xl">
              ✦
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <time className="font-oswald text-sm tracking-[0.1em] text-nine-blue">
                {selected.date.replaceAll("-", ".")}
              </time>
              <span className="grad-primary w-20 py-0.5 text-center text-xs text-white">
                {selected.category}
              </span>
            </div>
            <h3 className="nine-hairline mt-4 pb-3 text-xl font-bold text-nine-blue">
              {selected.title}
            </h3>
            <div className="font-mincho mt-4 space-y-4 leading-loose text-[#333]/80">
              {selected.body ?? <p>詳細は続報をお待ちください。</p>}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="閉じる"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center text-xl text-nine-blue transition-colors hover:bg-nine-pale"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
