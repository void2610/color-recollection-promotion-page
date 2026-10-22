"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { KEY_VISUALS } from "@/data/site";

// 静的生成したページでも訪問ごとに変わるよう、抽選はクライアントでページ読み込みごとに 1 回だけ行う
const pickedIndex = Math.floor(Math.random() * KEY_VISUALS.length);
const subscribe = () => () => {};

// ヒーローの KV (背後のぼかし + 左側の本体)。サーバー描画とハイドレーション中は抽選結果の不一致を避けて画像を出さない
export function HeroKeyVisual() {
  const index = useSyncExternalStore(
    subscribe,
    () => pickedIndex,
    () => null,
  );
  const src = index === null ? null : KEY_VISUALS[index];

  return (
    <>
      {/* ヒーロー全体の背後に KV をぼかして敷く (ヒーローと一緒にスクロールして消える) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {src && (
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-30 blur-md saturate-[0.8]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf5f9]/40 via-[#faf5f9]/70 to-[#faf5f9]/40" />
      </div>
      <div className="absolute inset-y-0 left-0 w-full lg:w-[62%]">
        {src && (
          <Image
            src={src}
            alt=""
            fill
            fetchPriority="high"
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="translate-y-10 object-cover object-[52%_center] opacity-40 lg:object-[75%_center] lg:opacity-100"
            style={{
              maskImage:
                "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to bottom, transparent, black 8%, black 60%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        )}
      </div>
    </>
  );
}
