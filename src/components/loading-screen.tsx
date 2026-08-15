"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_FADE_MS = 1800;
const OVERLAY_FADE_MS = 700;

// 初回ロード時に画面全体を覆い、中央のロゴがふわっと現れてから消えるロード画面
export function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), LOGO_FADE_MS);
    const doneTimer = setTimeout(() => setDone(true), LOGO_FADE_MS + OVERLAY_FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={433}
        height={68}
        priority
        className="loading-logo w-[70vw] max-w-[433px]"
      />
    </div>
  );
}
