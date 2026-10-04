import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "outline" | "solid";
type Size = "sm" | "md";

const VARIANT: Record<Variant, string> = {
  outline: "border border-nine-blue bg-white text-nine-blue hover:bg-nine-blue hover:text-white",
  // 濃色背景 (フッター・ライトボックス) 上で使う
  solid: "bg-white text-nine-blue hover:bg-nine-pale",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type DiamondButtonProps =
  | (CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">)
  | (CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">);

// ゲーム UI 準拠の菱形アイコンボタン。中身は逆回転させて正立させる
export function DiamondButton({ variant = "outline", size = "sm", className = "", children, ...rest }: DiamondButtonProps) {
  const cls = `flex ${SIZE[size]} rotate-45 items-center justify-center transition-colors ${VARIANT[variant]} ${className}`;
  const inner = <span className="-rotate-45">{children}</span>;

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...anchor}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
