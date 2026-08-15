// ページ遷移のたびに再マウントされ、白フラッシュ → 本文フェードインの演出を掛ける
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div aria-hidden className="page-flash fixed inset-0 z-50 bg-white" />
      <div className="page-enter flex flex-1 flex-col">{children}</div>
    </div>
  );
}
