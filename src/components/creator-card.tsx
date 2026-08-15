import Image from "next/image";
import { GithubIcon, XIcon } from "@/components/brand-icons";
import type { Creator } from "@/data/creators";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="relative h-full border-b-2 border-grad-primary bg-white p-6 shadow-[0_2px_12px_rgba(45,42,110,0.08)]">
      <span
        aria-hidden
        className="absolute right-0 bottom-0 h-0 w-0 border-b-8 border-l-8 border-b-nine-blue border-l-transparent"
      />
      {creator.icon ? (
        <Image
          src={creator.icon}
          alt={`${creator.name} のアイコン`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border border-nine-pale object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full bg-nine-pale text-2xl font-bold text-nine-blue"
        >
          {creator.name.charAt(0)}
        </div>
      )}
      <h3 className="mt-4 text-xl font-bold text-[#333]">{creator.name}</h3>
      <ul className="mt-1 text-sm text-nine-blue">
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
            className="text-nine-blue/70 transition-colors hover:text-nine-blue"
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
            className="text-nine-blue/70 transition-colors hover:text-nine-blue"
          >
            <GithubIcon />
          </a>
        )}
      </div>
    </div>
  );
}
