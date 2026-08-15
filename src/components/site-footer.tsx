import { GithubIcon, XIcon } from "@/components/brand-icons";
import { CIRCLE_NAME } from "@/data/creators";
import { SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-sm text-foreground-500">
        <div className="flex gap-6">
          <a
            href={SITE.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="transition-colors hover:text-foreground"
          >
            <XIcon />
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GithubIcon />
          </a>
        </div>
        <p>
          © 2026 {CIRCLE_NAME} — {SITE.title} ({SITE.titleEn})
        </p>
      </div>
    </footer>
  );
}
