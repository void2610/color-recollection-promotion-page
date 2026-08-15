// ページ遷移のたびに再マウントされ、本文のフェードイン演出を掛ける
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter flex flex-1 flex-col">{children}</div>;
}
