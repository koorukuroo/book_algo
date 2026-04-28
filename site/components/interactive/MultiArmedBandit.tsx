"use client";
import { useMemo, useState } from "react";

const RESTAURANTS = [
  { name: "단골 김밥집", emoji: "🍙", trueP: 0.7 },
  { name: "새 태국 식당", emoji: "🍜", trueP: 0.85 },
  { name: "동네 분식", emoji: "🥟", trueP: 0.4 },
  { name: "고급 양식", emoji: "🍝", trueP: 0.55 },
];

type Stat = { tries: number; wins: number };

// UCB1 score per arm. For untried arms, score = +∞ (force exploration).
function ucb1(stats: Stat[], totalTries: number) {
  return stats.map((s) => {
    if (s.tries === 0) return Infinity;
    const mean = s.wins / s.tries;
    const bonus = Math.sqrt((2 * Math.log(Math.max(1, totalTries))) / s.tries);
    return mean + bonus;
  });
}

export function MultiArmedBandit() {
  const [stats, setStats] = useState<Stat[]>(
    RESTAURANTS.map(() => ({ tries: 0, wins: 0 }))
  );
  const [history, setHistory] = useState<{ idx: number; win: boolean }[]>([]);

  const totalTries = stats.reduce((s, x) => s + x.tries, 0);
  const totalWins = stats.reduce((s, x) => s + x.wins, 0);

  // UCB1 recommendation for the next pick.
  const ucbScores = useMemo(() => ucb1(stats, totalTries), [stats, totalTries]);
  const ucbPick = useMemo(() => {
    let best = 0;
    for (let i = 1; i < ucbScores.length; i++) {
      if (ucbScores[i] > ucbScores[best]) best = i;
    }
    return best;
  }, [ucbScores]);

  const tryIt = (idx: number) => {
    const win = Math.random() < RESTAURANTS[idx].trueP;
    setStats((prev) =>
      prev.map((s, i) =>
        i === idx ? { tries: s.tries + 1, wins: s.wins + (win ? 1 : 0) } : s
      )
    );
    setHistory((h) => [...h.slice(-19), { idx, win }]);
  };

  const tryUcb = () => tryIt(ucbPick);

  const reset = () => {
    setStats(RESTAURANTS.map(() => ({ tries: 0, wins: 0 })));
    setHistory([]);
  };

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h3 className="font-display text-2xl">🎰 식당 고르기 — UCB1 vs 직감</h3>
        <p className="text-sm text-[var(--color-muted)]">
          총 {totalTries}번 · 만족 {totalWins}번
        </p>
      </div>

      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        4개 식당의 실제 만족 확률은 숨겨져 있습니다. 직접 골라보거나, <strong>UCB1
        알고리즘</strong>의 추천을 따라가 보세요. UCB1은 "관측된 평균 + 불확실성
        보너스"가 가장 큰 식당을 고릅니다 — <em>불확실성 앞에서의 낙관주의</em>.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {RESTAURANTS.map((r, i) => {
          const s = stats[i];
          const winRate = s.tries > 0 ? s.wins / s.tries : 0;
          const score = ucbScores[i];
          const isUcbPick = i === ucbPick;
          return (
            <button
              key={i}
              onClick={() => tryIt(i)}
              className={`rounded-2xl border-2 p-4 hover:shadow-md transition text-left ${
                isUcbPick
                  ? "border-[var(--color-mint)] bg-[var(--color-mint-soft)]/40"
                  : "border-[var(--color-line)] bg-white hover:border-[var(--color-mint)]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{r.emoji}</span>
                <span className="text-xs text-[var(--color-muted)] font-mono">
                  {s.tries}회
                </span>
              </div>
              <p className="font-display text-base mb-2">
                {r.name}
                {isUcbPick && (
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-mint)] text-white">
                    UCB 추천
                  </span>
                )}
              </p>
              <div className="h-2 bg-[var(--color-bg-soft)] rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-[var(--color-mint)] transition-all"
                  style={{ width: `${winRate * 100}%` }}
                />
              </div>
              <p className="text-xs text-[var(--color-muted)] flex items-center justify-between">
                <span>
                  관측{" "}
                  <span className="num-badge font-bold">
                    {s.tries > 0 ? `${Math.round(winRate * 100)}%` : "—"}
                  </span>
                </span>
                <span>
                  UCB1{" "}
                  <span className="num-badge font-bold">
                    {Number.isFinite(score) ? score.toFixed(2) : "∞"}
                  </span>
                </span>
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-[var(--color-bg-soft)] rounded-xl p-4 mb-4">
        <p className="text-xs text-[var(--color-muted)] mb-2 font-mono uppercase tracking-wider">
          최근 결과 (좌→우)
        </p>
        <div className="flex flex-wrap gap-1">
          {history.length === 0 && (
            <p className="text-sm text-[var(--color-muted)]">
              식당을 클릭해 시작하세요
            </p>
          )}
          {history.map((h, i) => (
            <span
              key={i}
              className={`w-7 h-7 rounded flex items-center justify-center text-xs ${
                h.win
                  ? "bg-[var(--color-mint-soft)] text-[var(--color-mint)]"
                  : "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
              }`}
            >
              {RESTAURANTS[h.idx].emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={tryUcb}
          className="px-4 py-2 rounded-full bg-[var(--color-mint)] text-white text-sm font-display hover:opacity-90 transition"
        >
          🤖 UCB1 추천 따르기
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display hover:border-[var(--color-mint)] transition"
        >
          🔄 다시 시작
        </button>
        {totalTries >= 20 && (
          <details className="text-sm">
            <summary className="cursor-pointer px-4 py-2 rounded-full bg-[var(--color-sun-soft)] font-display">
              🎁 정답 보기
            </summary>
            <div className="mt-3 p-3 bg-[var(--color-sun-soft)] rounded-xl text-xs">
              {RESTAURANTS.map((r, i) => (
                <p key={i}>
                  {r.emoji} {r.name}: 실제 {Math.round(r.trueP * 100)}%
                </p>
              ))}
            </div>
          </details>
        )}
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 다중 슬롯머신 문제(Multi-Armed Bandit). UCB1은 시도 횟수가 적은
        식당일수록 보너스를 더 줘서 자동으로 explore하다가, 표본이 쌓이면
        보너스가 줄어 자연스레 exploit으로 전환합니다. 후회(regret)는 로그적으로만
        늘어나는 것이 보장됩니다.
      </p>
    </div>
  );
}
