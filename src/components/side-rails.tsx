import { GithubIcon, XIcon } from "@/components/brand-icons";
import { SITE } from "@/data/site";

// 9-nine 準拠: スクロールに追従しない左右の固定レール (左: 縦書きキャプション / 右: SNS)
export function SideRails() {
  return (
    <>
      <p
        className="fixed top-40 left-16 z-30 hidden font-display text-sm tracking-[0.5em] text-nine-blue lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        OFFICIAL SITE
      </p>

      <div className="fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span
          className="font-display text-xs tracking-[0.4em] text-nine-blue"
          style={{ writingMode: "vertical-rl" }}
        >
          OFFICIAL SNS
        </span>
        <span aria-hidden className="h-10 w-px bg-nine-blue/40" />
        <a
          href={SITE.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="flex h-9 w-9 rotate-45 items-center justify-center border border-nine-blue bg-white text-nine-blue transition-colors hover:bg-nine-blue hover:text-white"
        >
          <span className="-rotate-45">
            <XIcon size={15} />
          </span>
        </a>
        <a
          href={SITE.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-9 w-9 rotate-45 items-center justify-center border border-nine-blue bg-white text-nine-blue transition-colors hover:bg-nine-blue hover:text-white"
        >
          <span className="-rotate-45">
            <GithubIcon size={15} />
          </span>
        </a>
      </div>
    </>
  );
}
