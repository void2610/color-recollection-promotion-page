"use client";

import { useEffect, useState } from "react";

// ヒーロー下端の Scroll 指示。少しでもスクロールしたらフェードアウトする
export function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-oswald text-xs tracking-[0.3em] text-nine-blue">Scroll</span>
      <span aria-hidden className="scroll-line relative block h-14 w-px bg-nine-blue/20" />
    </div>
  );
}
