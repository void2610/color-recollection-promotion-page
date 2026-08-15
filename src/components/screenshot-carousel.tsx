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
const COUNT = SHOTS.length;
// 無限ループ用に3周分並べ、中央の周からスタートする
const TRACK = [...SHOTS, ...SHOTS, ...SHOTS];

export function ScreenshotCarousel() {
  const [index, setIndex] = useState(COUNT);
  const [animated, setAnimated] = useState(true);

  const go = useCallback((delta: number) => {
    setAnimated(true);
    setIndex((i) => i + delta);
  }, []);

  // 端の周に入ったら、アニメーションなしで中央の周へ巻き戻す
  const handleTransitionEnd = () => {
    setIndex((i) => {
      if (i >= COUNT * 2 || i < COUNT) {
        setAnimated(false);
        return COUNT + ((i % COUNT) + COUNT) % COUNT;
      }
      return i;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [go, index]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className={`flex ${animated ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
          style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {TRACK.map((shot, i) => (
            <div key={`${shot.src}-${i}`} className="w-1/3 shrink-0 px-2">
              <Image
                src={shot.src}
                alt={`${shot.alt}のスクリーンショット`}
                width={1600}
                height={900}
                className="h-auto w-full border border-nine-pale shadow-[0_2px_12px_rgba(0,71,137,0.12)]"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="前のスクリーンショット"
        className="absolute top-1/2 -left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-nine-blue shadow-[0_2px_8px_rgba(0,71,137,0.2)] transition-colors hover:bg-nine-blue hover:text-white"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="次のスクリーンショット"
        className="absolute top-1/2 -right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-nine-blue shadow-[0_2px_8px_rgba(0,71,137,0.2)] transition-colors hover:bg-nine-blue hover:text-white"
      >
        ›
      </button>

      <div className="mt-4 flex justify-center gap-3">
        {SHOTS.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => {
              setAnimated(true);
              setIndex(COUNT + i);
            }}
            aria-label={`${i + 1}枚目を表示`}
            className={`h-2.5 w-2.5 rotate-45 border border-nine-blue transition-colors ${i === ((index % COUNT) + COUNT) % COUNT ? "bg-nine-blue" : "bg-white hover:bg-nine-pale"}`}
          />
        ))}
      </div>
    </div>
  );
}
