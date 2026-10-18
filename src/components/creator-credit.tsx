import Image from "next/image";
import { GithubIcon, XIcon } from "@/components/brand-icons";
import type { Creator } from "@/data/creators";

function handleOf(url: string) {
  return url.replace(/\/+$/, "").split("/").pop() ?? url;
}

// 商業ノベルゲームのスタッフ表記 (FGO・ATRI) 準拠: ◆役職 + 大きな名前、罫線区切り。アイコンとアカウントを添える
export function CreatorCredit({ creator }: { creator: Creator }) {
  const links = [
    creator.x && { href: creator.x, label: `@${handleOf(creator.x)}`, icon: <XIcon size={12} />, name: "X (Twitter)" },
    creator.github && { href: creator.github, label: handleOf(creator.github), icon: <GithubIcon size={12} />, name: "GitHub" },
  ].filter((link) => !!link);

  return (
    <div className="nine-hairline flex items-center gap-5 py-7">
      <div className="grad-holo h-16 w-16 shrink-0 rounded-full p-[2px]">
        {creator.icon ? (
          <Image
            src={creator.icon}
            alt={`${creator.name} のアイコン`}
            width={64}
            height={64}
            className="h-full w-full rounded-full bg-white object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center rounded-full bg-nine-pale text-xl font-bold text-nine-blue"
          >
            {creator.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="flex items-center gap-2 text-xs tracking-[0.15em] text-nine-blue">
          <span
            aria-hidden
            className="grad-primary h-2.5 w-2.5 shrink-0"
            style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
          />
          <span>
            {creator.roles.map((role, i) => (
              <span key={role}>
                {i > 0 && " / "}
                <span className="whitespace-nowrap">{role}</span>
              </span>
            ))}
          </span>
        </p>
        <h3 className="mt-1.5 text-3xl font-bold tracking-[0.06em] break-words text-[#333]">{creator.name}</h3>
        {links.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${creator.name} の ${link.name}`}
                  className="inline-flex items-center gap-1.5 font-oswald text-xs tracking-[0.05em] text-nine-blue/80 transition-opacity hover:opacity-60"
                >
                  {link.icon}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
