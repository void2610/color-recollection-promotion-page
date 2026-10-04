import { XIcon } from "@/components/brand-icons";
import { DiamondButton } from "@/components/diamond-button";
import { SITE } from "@/data/site";

// 9-nine 準拠: スクロールに追従しない左右の固定レール (左: 縦書きキャプション / 右: SNS)
export function SideRails() {
  return (
    <>
      <p
        className="fixed top-40 left-16 z-30 hidden font-display text-sm tracking-[0.5em] text-nine-blue lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        {SITE.titleEn.toUpperCase()}
      </p>

      <div className="fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span
          className="font-display text-xs tracking-[0.4em] text-nine-blue"
          style={{ writingMode: "vertical-rl" }}
        >
          {SITE.titleEn.toUpperCase()}
        </span>
        <span aria-hidden className="h-10 w-px bg-nine-blue/40" />
        <DiamondButton href={SITE.links.twitter} aria-label="X (Twitter)">
          <XIcon size={15} />
        </DiamondButton>
      </div>
    </>
  );
}
