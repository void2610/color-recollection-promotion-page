import Link from "next/link";

export function ViewMore({ href, label = "VIEW MORE" }: { href: string; label?: string }) {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href={href}
        className="group border-grad-primary flex h-12 w-[220px] items-center justify-center gap-3 border font-oswald text-sm tracking-[0.2em] text-nine-blue transition-colors hover:bg-white/50"
      >
        {label}
        <span aria-hidden className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
          →
        </span>
      </Link>
    </div>
  );
}
