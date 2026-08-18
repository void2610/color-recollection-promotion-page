"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const FADE_IN_MS = 400;
const FADE_OUT_MS = 1100;

// サイト内リンクを横取りし、白へのフェードイン → 遷移 → フェードアウトを行う
export function TransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const navigating = useRef(false);

  // リンククリックを捕まえて、白で覆ってから遷移する
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) return;

      // Next.js の Link より先に受け取るため capture 段階で止める
      e.preventDefault();
      e.stopPropagation();
      navigating.current = true;
      setPhase("in");
      setTimeout(() => router.push(href), FADE_IN_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // 新ページ到着で白を抜く (ブラウザバック等、覆っていない遷移では何もしない)
  useEffect(() => {
    if (!navigating.current) return;
    navigating.current = false;
    setPhase("out");
    const timer = setTimeout(() => setPhase("idle"), FADE_OUT_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[95] bg-white transition-opacity ease-out ${
        phase === "in"
          ? "pointer-events-auto opacity-100 duration-[400ms]"
          : phase === "out"
            ? "pointer-events-none opacity-0 duration-[1100ms]"
            : "pointer-events-none opacity-0 transition-none"
      }`}
    />
  );
}
