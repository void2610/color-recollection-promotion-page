"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SHOTS = [
  { src: "/screenshots/title.jpg", alt: "タイトル画面" },
  { src: "/screenshots/novel.jpg", alt: "ノベルパート" },
  { src: "/screenshots/ehon.jpg", alt: "絵本パート" },
  { src: "/screenshots/taylor.jpg", alt: "ノベルパート (テイラー)" },
  { src: "/screenshots/select.jpg", alt: "依頼書選択画面" },
  { src: "/screenshots/request.jpg", alt: "依頼書の詳細" },
  { src: "/screenshots/craft.jpg", alt: "制作パート" },
  { src: "/screenshots/cutin.jpg", alt: "イベントシーン" },
];

const AUTO_ADVANCE_MS = 4500;
const COUNT = SHOTS.length;
// 無限ループ用に3周分並べ、中央の周からスタートする
const TRACK = [...SHOTS, ...SHOTS, ...SHOTS];

export function ScreenshotCarousel() {
  const [index, setIndex] = useState(COUNT);
  const [animated, setAnimated] = useState(true);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  // 0 = 開いた直後 (ズームフェード) / ±1 = 前後切り替え (スライド)
  const [zoomDir, setZoomDir] = useState(0);

  // スライド中に重ねて表示する旧画像
  const [leaving, setLeaving] = useState<number | null>(null);

  const zoomStep = useCallback(
    (delta: 1 | -1) => {
      if (zoomed === null) return;
      setZoomDir(delta);
      setLeaving(zoomed);
      setZoomed((zoomed + delta + COUNT) % COUNT);
    },
    [zoomed],
  );

  useEffect(() => {
    if (leaving === null) return;
    const timer = setTimeout(() => setLeaving(null), 400);
    return () => clearTimeout(timer);
  }, [leaving]);

  const closeZoom = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setZoomed(null);
      setClosing(false);
    }, 250);
  }, []);

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
    if (zoomed !== null) return;
    const timer = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [go, index, zoomed]);

  // 拡大表示中は Esc で閉じ、背面のスクロールを止める
  useEffect(() => {
    if (zoomed === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
      if (e.key === "ArrowRight") zoomStep(1);
      if (e.key === "ArrowLeft") zoomStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed, closeZoom, zoomStep]);

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
              <button
                type="button"
                onClick={() => {
                  setZoomDir(0);
                  setZoomed(i % COUNT);
                }}
                aria-label={`${shot.alt}を拡大表示`}
                className="block w-full cursor-zoom-in"
              >
                <Image
                  src={shot.src}
                  alt={`${shot.alt}のスクリーンショット`}
                  width={1600}
                  height={900}
                  className="h-auto w-full border border-nine-pale shadow-[0_2px_12px_rgba(45,42,110,0.12)] transition-opacity hover:opacity-85"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="前のスクリーンショット"
        className="absolute top-1/2 -left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-nine-blue shadow-[0_2px_8px_rgba(45,42,110,0.2)] transition-colors hover:bg-nine-blue hover:text-white"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="次のスクリーンショット"
        className="absolute top-1/2 -right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-nine-blue shadow-[0_2px_8px_rgba(45,42,110,0.2)] transition-colors hover:bg-nine-blue hover:text-white"
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
            className={`h-2.5 w-2.5 rotate-45 border border-nine-blue transition-colors ${i === ((index % COUNT) + COUNT) % COUNT ? "grad-primary border-0" : "bg-white hover:bg-nine-pale"}`}
          />
        ))}
      </div>

      {zoomed !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${SHOTS[zoomed].alt}の拡大表示`}
          onClick={closeZoom}
          className={`lightbox-overlay ${closing ? "is-closing" : ""} fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-[#302030]/80 p-6 backdrop-blur-sm`}
        >
          {leaving !== null && (
            <figure
              key={`leaving-${leaving}`}
              aria-hidden
              className={`${zoomDir === 1 ? "lightbox-slide-out-left" : "lightbox-slide-out-right"} pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6`}
            >
              <Image
                src={SHOTS[leaving].src}
                alt=""
                width={1600}
                height={900}
                className="max-h-[82vh] w-auto max-w-[90vw] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              />
              <figcaption className="mt-3 text-center font-oswald text-sm tracking-[0.2em] text-white">
                {SHOTS[leaving].alt}（{leaving + 1} / {COUNT}）
              </figcaption>
            </figure>
          )}
          <figure
            key={zoomed}
            onClick={(e) => e.stopPropagation()}
            className={`${zoomDir === 0 ? "lightbox-figure" : zoomDir === 1 ? "lightbox-slide-next" : "lightbox-slide-prev"} cursor-default`}
          >
            <Image
              src={SHOTS[zoomed].src}
              alt={`${SHOTS[zoomed].alt}のスクリーンショット`}
              width={1600}
              height={900}
              className="max-h-[82vh] w-auto max-w-[90vw] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            />
            <figcaption className="mt-3 text-center font-oswald text-sm tracking-[0.2em] text-white">
              {SHOTS[zoomed].alt}（{zoomed + 1} / {COUNT}）
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              zoomStep(-1);
            }}
            aria-label="前の画像"
            className="absolute top-1/2 left-6 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-nine-blue transition-colors hover:bg-nine-blue hover:text-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              zoomStep(1);
            }}
            aria-label="次の画像"
            className="absolute top-1/2 right-6 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-nine-blue transition-colors hover:bg-nine-blue hover:text-white"
          >
            ›
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeZoom();
            }}
            aria-label="閉じる"
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center bg-white/90 text-xl text-nine-blue transition-colors hover:bg-nine-blue hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
