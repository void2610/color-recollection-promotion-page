// 背景のホログラム破片柄 (継ぎ目なくタイルできる SVG) を生成する: node scripts/holo-shards.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const TILE = 720;
const COUNT = 64;

// 固定シードで毎回同じ柄にする (差分を出さないため)
let seed = 20261012;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

// --grad-holo と同じ 4 色。破片ごとに向きと並びを変えて、1 枚の中を虹色が流れるように見せる
const HOLO = ["#5fcdf2", "#9d84ec", "#f27fc8", "#f8c66f"];
const GRADIENTS = Array.from({ length: 8 }, (_, i) => {
  const angle = rand() * Math.PI;
  const x = Math.cos(angle) / 2;
  const y = Math.sin(angle) / 2;
  const start = Math.floor(rand() * HOLO.length);
  const colors = [0, 1, 2].map((k) => HOLO[(start + k) % HOLO.length]);
  const stops = colors.map((c, k) => `<stop offset="${k / 2}" stop-color="${c}"/>`).join("");
  return `<linearGradient id="g${i}" x1="${0.5 - x}" y1="${0.5 - y}" x2="${0.5 + x}" y2="${0.5 + y}">${stops}</linearGradient>`;
});

// 割れたフィルムの破片: 3〜4 角の尖った多角形を細長く伸ばして回転させる
function shard() {
  const size = 7 + Math.pow(rand(), 2.2) * 34;
  const stretch = 1 + rand() * 1.6;
  const rot = rand() * Math.PI;
  const sides = rand() < 0.45 ? 3 : 4;
  const points = Array.from({ length: sides }, (_, k) => {
    const a = ((k + rand() * 0.6) / sides) * Math.PI * 2;
    const r = size * (0.55 + rand() * 0.45);
    const px = Math.cos(a) * r * stretch;
    const py = Math.sin(a) * r;
    return [px * Math.cos(rot) - py * Math.sin(rot), px * Math.sin(rot) + py * Math.cos(rot)];
  });
  return { x: rand() * TILE, y: rand() * TILE, points, size, gradient: Math.floor(rand() * GRADIENTS.length), opacity: rand() };
}

const shards = Array.from({ length: COUNT }, shard);

function render(opacityOf) {
  const polys = [];
  for (const s of shards) {
    // タイル端をまたぐ破片は反対側にも置いて継ぎ目を消す
    for (const dx of [-TILE, 0, TILE])
      for (const dy of [-TILE, 0, TILE]) {
        const cx = s.x + dx;
        const cy = s.y + dy;
        if (cx < -s.size * 3 || cx > TILE + s.size * 3 || cy < -s.size * 3 || cy > TILE + s.size * 3) continue;
        const pts = s.points.map(([px, py]) => `${(cx + px).toFixed(1)},${(cy + py).toFixed(1)}`).join(" ");
        polys.push(`<polygon points="${pts}" fill="url(#g${s.gradient})" fill-opacity="${opacityOf(s).toFixed(2)}"/>`);
      }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}" viewBox="0 0 ${TILE} ${TILE}"><defs>${GRADIENTS.join("")}</defs>${polys.join("")}</svg>\n`;
}

mkdirSync("public/patterns", { recursive: true });
writeFileSync("public/patterns/holo-shards.svg", render((s) => 0.1 + s.opacity * 0.18));
