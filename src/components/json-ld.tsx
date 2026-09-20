// 構造化データ (JSON-LD) を <script> で埋め込む。
// JSON.stringify は HTML をエスケープしないので、閉じタグ注入を防ぐため
// データ中の小なり記号をユニコード表記に置き換えてから流し込む (XSS 対策)
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
