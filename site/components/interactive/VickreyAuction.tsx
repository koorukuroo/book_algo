"use client";
import { useMemo, useState } from "react";

const BIDDERS = [
  { name: "지원 (AI)", trueValue: 50, emoji: "🧑" },
  { name: "민서 (AI)", trueValue: 70, emoji: "👩" },
  { name: "준호 (AI)", trueValue: 80, emoji: "🧒" },
];

type Mode = "first" | "second";
type AiStrategy = "truthful" | "shaved";

const MY_VALUE = 75;

export function VickreyAuction() {
  const [myBid, setMyBid] = useState(75);
  const [mode, setMode] = useState<Mode>("second");
  const [aiStrategy, setAiStrategy] = useState<AiStrategy>("truthful");

  const aiBids = useMemo(() => {
    return BIDDERS.map((b) => ({
      ...b,
      bid:
        aiStrategy === "truthful"
          ? b.trueValue
          : Math.max(0, b.trueValue - Math.floor(b.trueValue * 0.15)),
    }));
  }, [aiStrategy]);

  const allBids = [
    { name: "나", bid: myBid, trueValue: MY_VALUE, emoji: "⭐" },
    ...aiBids,
  ];

  const sorted = [...allBids].sort((a, b) => b.bid - a.bid);
  const winner = sorted[0];
  const price = mode === "first" ? sorted[0].bid : sorted[1].bid;
  const myPayoff = winner.name === "나" ? MY_VALUE - price : 0;
  const maxBid = Math.max(120, ...allBids.map((b) => b.bid));

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">🪙 비크리 경매 vs 일반 경매</h3>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        당신에게 이 물건의 가치는 <strong>{MY_VALUE}</strong>입니다. 얼마를 입찰해야
        할까요? 두 경매 방식과, 상대(AI)의 두 전략을 비교해 보세요.
      </p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          onClick={() => setMode("first")}
          className={`p-3 rounded-xl border-2 ${
            mode === "first"
              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
              : "border-[var(--color-line)]"
          }`}
        >
          <p className="font-display text-sm">First-Price</p>
          <p className="text-xs text-[var(--color-muted)]">최고가가 그대로 지불</p>
        </button>
        <button
          onClick={() => setMode("second")}
          className={`p-3 rounded-xl border-2 ${
            mode === "second"
              ? "border-[var(--color-plum)] bg-[var(--color-plum-soft)]"
              : "border-[var(--color-line)]"
          }`}
        >
          <p className="font-display text-sm">Vickrey (2위 가격)</p>
          <p className="text-xs text-[var(--color-muted)]">정직이 지배전략</p>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={() => setAiStrategy("truthful")}
          className={`p-2 rounded-xl border-2 text-xs ${
            aiStrategy === "truthful"
              ? "border-[var(--color-mint)] bg-[var(--color-mint-soft)]"
              : "border-[var(--color-line)]"
          }`}
        >
          <p className="font-display">AI: 정직 입찰</p>
          <p className="text-[10px] text-[var(--color-muted)]">진짜 가치 그대로</p>
        </button>
        <button
          onClick={() => setAiStrategy("shaved")}
          className={`p-2 rounded-xl border-2 text-xs ${
            aiStrategy === "shaved"
              ? "border-[var(--color-sun)] bg-[var(--color-sun-soft)]"
              : "border-[var(--color-line)]"
          }`}
        >
          <p className="font-display">AI: 15% 깎기</p>
          <p className="text-[10px] text-[var(--color-muted)]">전략적 거짓말</p>
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm text-[var(--color-muted)]">
          나의 입찰가 (실제 가치 = {MY_VALUE})
        </label>
        <input
          type="range"
          min={0}
          max={120}
          value={myBid}
          onChange={(e) => setMyBid(+e.target.value)}
          className="w-full mt-1 accent-[var(--color-plum)]"
        />
        <p className="num-badge text-xl font-bold">{myBid}</p>
      </div>

      <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4 mb-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          입찰 결과
        </p>
        <div className="space-y-2">
          {sorted.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-2xl">{b.emoji}</span>
              <span className="font-display flex-1">
                {b.name}{" "}
                <span className="text-xs text-[var(--color-muted)]">
                  (가치 {b.trueValue})
                </span>
              </span>
              <div className="flex-1 h-3 bg-white rounded-full overflow-hidden border border-[var(--color-line)]">
                <div
                  className={`h-full ${
                    i === 0
                      ? "bg-[var(--color-mint)]"
                      : i === 1 && mode === "second"
                      ? "bg-[var(--color-plum)]"
                      : "bg-[var(--color-line)]"
                  }`}
                  style={{ width: `${(b.bid / maxBid) * 100}%` }}
                />
              </div>
              <span className="num-badge w-12 text-right font-bold">{b.bid}</span>
              {i === 0 && <span className="text-xs">🏆</span>}
              {i === 1 && mode === "second" && (
                <span className="text-xs">💰</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`rounded-xl p-4 ${
          winner.name === "나"
            ? myPayoff > 0
              ? "bg-[var(--color-mint-soft)]"
              : "bg-[var(--color-accent-soft)]"
            : "bg-[var(--color-bg-soft)]"
        }`}
      >
        <p className="text-sm">
          <strong>{winner.name}</strong>이 낙찰. 지불 가격{" "}
          <span className="num-badge font-bold">{price}</span>.
          {winner.name === "나" && (
            <>
              {" "}
              내 순이득:{" "}
              <span
                className={`num-badge font-bold ${
                  myPayoff > 0
                    ? "text-[var(--color-mint)]"
                    : "text-[var(--color-accent)]"
                }`}
              >
                {myPayoff > 0 ? "+" : ""}
                {myPayoff}
              </span>{" "}
              {myPayoff < 0 && "(승자의 저주!)"}
            </>
          )}
        </p>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-2">
        <button
          onClick={() => setMyBid(MY_VALUE)}
          className="px-3 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-xs font-display hover:border-[var(--color-plum)] transition"
        >
          정직 입찰 ({MY_VALUE})
        </button>
        <button
          onClick={() => setMyBid(MY_VALUE + 15)}
          className="px-3 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-xs font-display hover:border-[var(--color-accent)] transition"
        >
          욕심 입찰 ({MY_VALUE + 15})
        </button>
      </div>

      <div className="mt-4 text-xs text-[var(--color-muted)] leading-relaxed">
        <p className="mb-1">
          💡 First-Price에서는 진짜 가치보다 적게 입찰해야 이득이 나기 쉽습니다(전략적
          거짓말). 하지만 Vickrey에서는 진짜 가치 그대로 입찰하는 게 항상 최선입니다 —
          이게 <strong>지배 전략(dominant strategy)</strong>입니다.
        </p>
        <p>
          → Vickrey + AI 정직 모드에서 입찰가를 75 위/아래로 움직여 보세요. 75를
          벗어나면 손해 보거나 이득 기회를 잃습니다.
        </p>
      </div>
    </div>
  );
}
