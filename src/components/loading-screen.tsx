"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LOGO_FADE_MS = 1800;
const OVERLAY_FADE_MS = 700;
const LOGO_MOVE_MS = 1100;

type Phase = "show" | "fade" | "move" | "done";

// 初回ロード時に画面全体を覆うロード画面。トップでは中央のロゴがヒーローのロゴの位置へ移動し、着地と同時に本物と入れ替わる
export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("show");
  const [flight, setFlight] = useState<string>();
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let doneTimer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      const transform = flightTransform(logoRef.current);
      if (transform) {
        setFlight(transform);
        setPhase("move");
        doneTimer = setTimeout(() => setPhase("done"), LOGO_MOVE_MS);
      } else {
        setPhase("fade");
        doneTimer = setTimeout(() => setPhase("done"), OVERLAY_FADE_MS);
      }
    }, LOGO_FADE_MS);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      data-loading-phase={phase}
      className={`fixed inset-0 z-[100] flex items-center justify-center ${
        phase === "move"
          ? "pointer-events-none bg-white/0 transition-[background-color] ease-in-out"
          : `bg-white transition-opacity duration-700 ${phase === "fade" ? "opacity-0" : "opacity-100"}`
      }`}
      style={phase === "move" ? { transitionDuration: `${LOGO_MOVE_MS}ms` } : undefined}
    >
      <div
        ref={logoRef}
        className="w-[70vw] max-w-[433px] transition-transform ease-in-out"
        style={{ transform: flight, transitionDuration: `${LOGO_MOVE_MS}ms` }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={1600}
          height={398}
          priority
          className="loading-logo h-auto w-full"
        />
      </div>
    </div>
  );
}

// ヒーローのロゴへ重ねる transform。移動先が無い・画面外・動きを減らす設定のときは null (フェードで消す)
function flightTransform(logo: HTMLElement | null) {
  const target = document.querySelector("[data-hero-logo]");
  if (!logo || !target || matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const from = logo.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (to.width === 0 || to.bottom < 0 || to.top > window.innerHeight) return null;
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${to.width / from.width})`;
}
