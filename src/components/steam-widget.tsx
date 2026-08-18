// Steam ストアウィジェットの埋め込み (お知らせ本文などに置く)
export function SteamWidget({ appId }: { appId: string }) {
  return (
    <iframe
      src={`https://store.steampowered.com/widget/${appId}/`}
      title="Steam ストアページ"
      loading="lazy"
      className="mt-6 block h-[190px] w-full border-0"
    />
  );
}
