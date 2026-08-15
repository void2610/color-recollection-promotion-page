"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SHOTS = [
  { src: "/screenshots/title.jpg", alt: "タイトル画面" },
  { src: "/screenshots/novel.jpg", alt: "ノベルパート" },
  { src: "/screenshots/ehon.jpg", alt: "絵本パート" },
  { src: "/screenshots/taylor.jpg", alt: "ノベルパート (テイラー)" },
  { src: "/screenshots/select.jpg", alt: "依頼書選択画面" },
];

const AUTO_ADVANCE_MS = 4500;

export function ScreenshotCarousel() {
  const [index, setIndex] = useState(0);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SHOTS.length) % SHOTS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [go, index]);

  return (
    <div className="relative">
      <div className="overflow-hidden border border-nine-pale shadow-[0_2px_12px_rgba(0,71,137,0.12)]">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SHOTS.map((shot) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={`${shot.alt}のスクリーンショット`}
              width={1600}
              height={900}
              className="h-auto w-full shrink-0"
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="前のスクリーンショット"
        className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/80 text-nine-blue transition-colors hover:bg-nine-blue hover:text-white"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="次のスクリーンショット"
        className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/80 text-nine-blue transition-colors hover:bg-nine-blue hover:text-white"
      >
        ›
      </button>

      <div className="mt-4 flex justify-center gap-3">
        {SHOTS.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}枚目を表示`}
            className={`h-2.5 w-2.5 rotate-45 border border-nine-blue transition-colors ${i === index ? "bg-nine-blue" : "bg-white hover:bg-nine-pale"}`}
          />
        ))}
      </div>
    </div>
  );
}
