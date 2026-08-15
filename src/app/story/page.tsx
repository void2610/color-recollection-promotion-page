import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "ストーリー",
  description: "カラーリコレクションのストーリーと世界観",
};

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading en="Story" ja="ストーリー" />
      <div className="space-y-4 leading-loose text-foreground-600">
        <p>
          自立駆動型アンドロイド【自動人形（オートマタ）】が、家電のように大量生産・販売されるようになった近未来のフランス。
        </p>
        <p>
          人々は次第に、機械に「心」を求め始めた。しかし量産型のオートマタに、それは実現できない。客の特殊なニーズに合わせてオートマタをオーダーメイドで製造する職人が各地に現れ、人々は彼らを【仕立て屋（テイラー）】と呼んだ。
        </p>
        <p>
          辺境の工房で、祖父クロードの跡を継いだ若き仕立て屋――テイラー。助手のキイとふたり、静かな日々を送っていたある日、一通の【修正依頼】のメールが届く。
        </p>
        <p>
          持ち込まれたのは、それぞれの事情を抱えた自動人形たち。彼らと対話し、報告書を書き、その運命を決めるのはあなただ。
        </p>
        <p className="font-semibold text-foreground">
          家族のような役割をロボットに求めたとき、どこまで人間と同等に扱うべきなのか――ゆっくりと考えを深めていく、チルな時間をあなたに。
        </p>
      </div>

      <div className="mt-16">
        <SectionHeading en="World" ja="世界観キーワード" />
        <dl className="space-y-8">
          <KeywordItem
            term="仕立て屋（テイラー）"
            description="オートマタをオーダーメイドで製造する職人の呼び名。依頼主の愛着や、特定の欠落を埋めるために、外見から人格まで一点物として仕立てる。"
          />
          <KeywordItem
            term="オーダーメイドのオートマタ"
            description="工場製と違い、学習や成長を伴う仮想人格を持つ。食事を摂り、環境によって独自の進化を起こすこともある。定期的な経過観察やメンテナンスが必要。"
          />
          <KeywordItem
            term="修正依頼"
            description="所有者がオートマタの「不具合」の修正を仕立て屋に依頼すること。だがその不具合は、本当に直すべきものなのだろうか。"
          />
          <KeywordItem
            term="フェード現象"
            description="オーダーメイドのオートマタが、環境による独自進化の果てに起こすという現象。物語の中心に横たわる謎。"
          />
        </dl>
      </div>
    </main>
  );
}

function KeywordItem({ term, description }: { term: string; description: string }) {
  return (
    <div>
      <dt className="text-lg font-bold">{term}</dt>
      <dd className="mt-2 leading-relaxed text-foreground-600">{description}</dd>
    </div>
  );
}
