"use client";
import { useMemo, useState } from "react";

type Item = {
  id: string;
  name: string;
  emoji: string;
  weight: number;
  value: number;
};

const ITEMS: Item[] = [
  { id: "tent", name: "텐트", emoji: "⛺", weight: 5, value: 8 },
  { id: "stove", name: "버너", emoji: "🔥", weight: 2, value: 5 },
  { id: "sleeping", name: "침낭", emoji: "🛏️", weight: 3, value: 7 },
  { id: "camera", name: "카메라", emoji: "📷", weight: 1, value: 4 },
  { id: "book", name: "책", emoji: "📚", weight: 2, value: 3 },
  { id: "guitar", name: "기타", emoji: "🎸", weight: 4, value: 6 },
  { id: "snacks", name: "간식", emoji: "🍫", weight: 1, value: 2 },
  { id: "boots", name: "등산화", emoji: "🥾", weight: 3, value: 6 },
];

// Exact 0/1 knapsack via DP.
function optimalDP(capacity: number) {
  const n = ITEMS.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w];
      if (ITEMS[i - 1].weight <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i - 1][w - ITEMS[i - 1].weight] + ITEMS[i - 1].value
        );
      }
    }
  }
  const picked = new Set<string>();
  let w = capacity;
  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      picked.add(ITEMS[i - 1].id);
      w -= ITEMS[i - 1].weight;
    }
  }
  return { value: dp[n][capacity], picked };
}

// Continuous-relaxation greedy: sort by value/weight density and pack until
// full. This is the *fractional* knapsack solution rounded down to whole
// items — the chapter's "continuous relaxation" recipe.
function greedyDensity(capacity: number) {
  const sorted = [...ITEMS].sort((a, b) => b.value / b.weight - a.value / a.weight);
  const picked = new Set<string>();
  let w = 0;
  let v = 0;
  for (const it of sorted) {
    if (w + it.weight <= capacity) {
      picked.add(it.id);
      w += it.weight;
      v += it.value;
    }
  }
  return { value: v, picked };
}

// Lagrangian relaxation: each kg of overweight costs `penalty` value points.
// Drops the hard constraint and turns it into a price.
function lagrangian(capacity: number, penalty: number) {
  // For each item, take it iff value - penalty * weight > 0.
  const picked = new Set<string>();
  let w = 0;
  let v = 0;
  for (const it of ITEMS) {
    if (it.value - penalty * it.weight > 0) {
      picked.add(it.id);
      w += it.weight;
      v += it.value;
    }
  }
  const overweight = Math.max(0, w - capacity);
  return { value: v, picked, weight: w, overweight, netValue: v - penalty * overweight };
}

export function Knapsack() {
  const [capacity, setCapacity] = useState(8);
  const [penalty, setPenalty] = useState(2);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const totals = useMemo(() => {
    let w = 0,
      v = 0;
    for (const id of selected) {
      const it = ITEMS.find((x) => x.id === id)!;
      w += it.weight;
      v += it.value;
    }
    return { w, v };
  }, [selected]);

  const opt = useMemo(() => optimalDP(capacity), [capacity]);
  const greedy = useMemo(() => greedyDensity(capacity), [capacity]);
  const lag = useMemo(() => lagrangian(capacity, penalty), [capacity, penalty]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showOptimal = () => setSelected(new Set(opt.picked));
  const showGreedy = () => setSelected(new Set(greedy.picked));
  const showLagrangian = () => setSelected(new Set(lag.picked));
  const reset = () => setSelected(new Set());

  const overweight = totals.w > capacity;
  const approxRatio = opt.value > 0 ? (greedy.value / opt.value) * 100 : 100;

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">🎒 배낭 — 정확한 답 vs 완화한 답</h3>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        용량 안에서 가치를 최대화하세요. 다음 세 가지 답을 비교해 보세요 —
        <strong> 완벽한 DP</strong>, <strong>밀도 기준 그리디(연속 완화)</strong>,
        <strong> 라그랑지 완화(무게 페널티)</strong>.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">배낭 용량</p>
          <input
            type="range"
            min={3}
            max={15}
            value={capacity}
            onChange={(e) => setCapacity(+e.target.value)}
            className="w-full accent-[var(--color-plum)]"
          />
          <p className="num-badge text-xl font-bold">{capacity}kg</p>
        </div>
        <div
          className={`rounded-xl p-3 ${
            overweight
              ? "bg-[var(--color-accent-soft)]"
              : "bg-[var(--color-bg-soft)]"
          }`}
        >
          <p className="text-xs text-[var(--color-muted)]">현재 무게</p>
          <p
            className={`num-badge text-xl font-bold ${
              overweight ? "text-[var(--color-accent)]" : ""
            }`}
          >
            {totals.w}kg {overweight && "⚠"}
          </p>
        </div>
        <div className="bg-[var(--color-plum-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">총 가치 (현재 선택)</p>
          <p
            className={`num-badge text-xl font-bold text-[var(--color-plum)] ${
              overweight ? "opacity-30 line-through" : ""
            }`}
          >
            {totals.v}점
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">
            DP 최적: {opt.value}점
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {ITEMS.map((item) => {
          const isSelected = selected.has(item.id);
          const ratio = (item.value / item.weight).toFixed(2);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`rounded-xl border-2 p-3 transition hover:-translate-y-0.5 ${
                isSelected
                  ? "border-[var(--color-plum)] bg-[var(--color-plum-soft)]"
                  : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]"
              }`}
            >
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-xs font-display">{item.name}</div>
              <div className="text-[10px] text-[var(--color-muted)] mt-1">
                {item.weight}kg / {item.value}점
              </div>
              <div className="text-[10px] text-[var(--color-muted)]">
                밀도 {ratio}
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4 mb-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
          세 가지 답 비교
        </p>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="font-display text-xs mb-1">DP (정확)</p>
            <p className="num-badge text-lg font-bold text-[var(--color-mint)]">
              {opt.value}점
            </p>
            <p className="text-[10px] text-[var(--color-muted)]">100%</p>
          </div>
          <div>
            <p className="font-display text-xs mb-1">그리디 (밀도)</p>
            <p className="num-badge text-lg font-bold text-[var(--color-plum)]">
              {greedy.value}점
            </p>
            <p className="text-[10px] text-[var(--color-muted)]">
              {approxRatio.toFixed(0)}% 근사
            </p>
          </div>
          <div>
            <p className="font-display text-xs mb-1">라그랑지</p>
            <p className="num-badge text-lg font-bold text-[var(--color-sun)]">
              {lag.value}점{lag.overweight > 0 && ` (-${penalty * lag.overweight})`}
            </p>
            <p className="text-[10px] text-[var(--color-muted)]">
              {lag.weight}kg{lag.overweight > 0 ? `, ${lag.overweight}kg 초과` : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-sun-soft)] rounded-xl p-3 mb-4">
        <label className="text-xs text-[var(--color-muted)]">
          라그랑지 페널티 (kg당 가치 차감)
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={penalty}
          onChange={(e) => setPenalty(+e.target.value)}
          className="w-full accent-[var(--color-sun)]"
        />
        <p className="num-badge text-sm font-bold">{penalty}점/kg</p>
        <p className="text-[10px] text-[var(--color-muted)] mt-1">
          페널티가 너무 작으면 무게를 어겨도 이득 → 가벼운 페널티는 합리적 무시.
          페널티가 크면 자동으로 가벼운 짐만 챙김.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={showOptimal}
          className="px-4 py-2 rounded-full bg-[var(--color-mint)] text-white text-sm font-display hover:opacity-90 transition"
        >
          🤖 DP 최적
        </button>
        <button
          onClick={showGreedy}
          className="px-4 py-2 rounded-full bg-[var(--color-plum)] text-white text-sm font-display hover:opacity-90 transition"
        >
          ⚡ 그리디 (밀도)
        </button>
        <button
          onClick={showLagrangian}
          className="px-4 py-2 rounded-full bg-[var(--color-sun)] text-[var(--color-ink)] text-sm font-display hover:opacity-90 transition"
        >
          🧮 라그랑지 적용
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display hover:border-[var(--color-plum)] transition"
        >
          🔄 초기화
        </button>
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 <strong>완화(Relaxation)의 정신</strong>: 그리디는 "분수 짐도 OK"라는
        연속 완화의 정수 반올림본, 라그랑지는 "꼭 지켜야 한다"를 "어기면 비용을
        낸다"로 강등시킵니다. 완벽한 DP는 8개 항목엔 가능하지만, 항목이 많아지면
        거의 모든 실생활 문제는 이런 완화로만 풀 수 있습니다.
      </p>
    </div>
  );
}
