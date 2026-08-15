// 9-nine のひし形装飾を画像なしで再現する回転スクエア群
export function DiaDeco({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute -z-10 ${className ?? ""}`}>
      <div className="relative h-64 w-64">
        <span className="absolute top-0 left-8 h-40 w-40 rotate-45 border border-nine-pale" />
        <span className="absolute top-20 left-0 h-24 w-24 rotate-45 bg-nine-pale/60" />
        <span className="absolute top-32 left-36 h-16 w-16 rotate-45 border border-nine-blue/20" />
      </div>
    </div>
  );
}
