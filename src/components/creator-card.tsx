import Image from "next/image";
import { GithubIcon, XIcon } from "@/components/brand-icons";
import type { Creator } from "@/data/creators";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-6">
      {creator.icon ? (
        <Image
          src={creator.icon}
          alt={`${creator.name} のアイコン`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border border-foreground/10 object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/10 bg-foreground/10 text-2xl font-bold text-foreground-500"
        >
          {creator.name.charAt(0)}
        </div>
      )}
      <h3 className="mt-4 text-xl font-bold">{creator.name}</h3>
      <ul className="mt-1 text-sm text-foreground-500">
        {creator.roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4">
        {creator.x && (
          <a
            href={creator.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${creator.name} の X (Twitter)`}
            className="text-foreground-500 transition-colors hover:text-foreground"
          >
            <XIcon />
          </a>
        )}
        {creator.github && (
          <a
            href={creator.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${creator.name} の GitHub`}
            className="text-foreground-500 transition-colors hover:text-foreground"
          >
            <GithubIcon />
          </a>
        )}
      </div>
    </div>
  );
}
