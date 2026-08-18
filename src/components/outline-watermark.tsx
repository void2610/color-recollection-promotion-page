import { useId } from "react";

// 輪郭だけの透かし文字。text-stroke だと字画の重なり部分の内部線が出るため、
// 同じ文字のベタ塗りでマスクして輪郭の外側半分だけを残す
export function OutlineWatermark({
  text,
  className = "",
  align = "center",
  opacity = 0.3,
}: {
  text: string;
  // 位置・サイズ (font-size で文字サイズ、height で svg の高さ) を Tailwind クラスで指定
  className?: string;
  align?: "center" | "end";
  opacity?: number;
}) {
  const maskId = useId();
  const x = align === "center" ? "50%" : "100%";
  const anchor = align === "center" ? "middle" : "end";
  return (
    <svg
      aria-hidden
      className={`pointer-events-none overflow-visible font-display font-bold select-none ${className}`}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect x="-50%" y="-50%" width="200%" height="200%" fill="white" />
          <text x={x} y="50%" dominantBaseline="central" textAnchor={anchor} fill="black">
            {text}
          </text>
        </mask>
      </defs>
      <text
        x={x}
        y="50%"
        dominantBaseline="central"
        textAnchor={anchor}
        fill="none"
        stroke={`rgba(139, 96, 138, ${opacity})`}
        strokeWidth="2"
        mask={`url(#${maskId})`}
      >
        {text}
      </text>
    </svg>
  );
}
