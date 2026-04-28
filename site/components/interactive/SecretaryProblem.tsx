"use client";
import { useEffect, useMemo, useState } from "react";

type Run = {
  applicants: number[]; // scores 1..n shuffled
  picked: number | null; // index picked
  best: number; // index of true best
};

function makeRun(n: number): Run {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return { applicants: arr, picked: null, best: arr.indexOf(n) };
}

// Deterministic initial run so SSR and first client render match
function makeIdentity(n: number): Run {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  return { applicants: arr, picked: null, best: arr.indexOf(n) };
}

function simulate(n: number, lookFraction: number, trials: number) {
  let success = 0;
  for (let t = 0; t < trials; t++) {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const lookN = Math.max(1, Math.floor(n * lookFraction));
    const benchmark = Math.max(...arr.slice(0, lookN));
    let picked = -1;
    for (let i = lookN; i < n; i++) {
      if (arr[i] > benchmark) {
        picked = i;
        break;
      }
    }
    if (picked === -1) picked = n - 1;
    if (arr[picked] === n) success++;
  }
  return success / trials;
}

export function SecretaryProblem() {
  const [n, setN] = useState(20);
  const [lookPct, setLookPct] = useState(37);
  const [run, setRun] = useState<Run>(() => makeIdentity(20));
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setRun(makeRun(n));
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lookN = Math.max(1, Math.floor((n * lookPct) / 100));
  const benchmark =
    run.applicants.length >= lookN
      ? Math.max(...run.applicants.slice(0, lookN))
      : 0;

  // Determine pick
  const picked = useMemo(() => {
    for (let i = lookN; i < run.applicants.length; i++) {
      if (run.applicants[i] > benchmark) return i;
    }
    return run.applicants.length - 1;
  }, [run, lookN, benchmark]);

  const isBest = run.applicants[picked] === n;

  const winRate = useMemo(() => {
    if (!mounted) return 0;
    return simulate(n, lookPct / 100, 2000);
  }, [n, lookPct, mounted]);

  const reshuffle = () => setRun(makeRun(n));

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h3 className="font-display text-2xl">🚦 비서 문제 시뮬레이터</h3>
        <p className="text-sm text-[var(--color-muted)]">
          {n}명 중 1등을 뽑을 확률
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-sm text-[var(--color-muted)]">지원자 수</label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="range"
              min={5}
              max={50}
              value={n}
              onChange={(e) => {
                const v = +e.target.value;
                setN(v);
                setRun(makeRun(v));
              }}
              className="flex-1 accent-[var(--color-accent)]"
            />
            <span className="num-badge text-xl font-bold w-12 text-right">{n}</span>
          </div>
        </div>
        <div>
          <label className="text-sm text-[var(--color-muted)]">
            관찰(Look) 비율
          </label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="range"
              min={0}
              max={95}
              value={lookPct}
              onChange={(e) => setLookPct(+e.target.value)}
              className="flex-1 accent-[var(--color-accent)]"
            />
            <span className="num-badge text-xl font-bold w-14 text-right">
              {lookPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {run.applicants.map((score, i) => {
            const inLook = i < lookN;
            const isPicked = i === picked;
            const isBeforePick = i < picked;
            const cls = isPicked
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] scale-110 ring-4 ring-[var(--color-accent)]/30"
              : inLook
              ? "bg-[var(--color-bg-soft)] border-[var(--color-line)] text-[var(--color-muted)]"
              : isBeforePick
              ? "bg-white border-[var(--color-line)] text-[var(--color-muted)] line-through opacity-50"
              : "bg-white border-[var(--color-line)] text-[var(--color-muted)] opacity-30";
            return (
              <div
                key={i}
                className={`relative w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 flex items-center justify-center text-xs font-mono font-bold transition-all ${cls}`}
                title={`#${i + 1} 점수 ${score}`}
              >
                {score}
                {score === n && (
                  <span className="absolute -top-2 -right-2 text-base">⭐</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <span className="inline-block w-3 h-3 rounded bg-[var(--color-bg-soft)] border-2 border-[var(--color-line)]"></span>
          <span>관찰 단계 ({lookN}명)</span>
          <span className="inline-block w-3 h-3 rounded bg-[var(--color-accent)] ml-3"></span>
          <span>채용</span>
          <span className="ml-3">⭐ 진짜 1등</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">관찰 후 기준점</p>
          <p className="num-badge text-2xl font-bold">{benchmark}</p>
        </div>
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">실제 채용한 점수</p>
          <p
            className={`num-badge text-2xl font-bold ${
              isBest ? "text-[var(--color-mint)]" : "text-[var(--color-accent)]"
            }`}
          >
            {run.applicants[picked]} {isBest ? "🎯" : ""}
          </p>
        </div>
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3 col-span-2 md:col-span-1">
          <p className="text-xs text-[var(--color-muted)]">
            이 비율의 1등 적중률 (2000회 시뮬)
          </p>
          <p className="num-badge text-2xl font-bold text-[var(--color-accent)]">
            {mounted ? `${(winRate * 100).toFixed(1)}%` : "—"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={reshuffle}
          className="px-4 py-2 rounded-full bg-[var(--color-accent)] text-white text-sm font-display hover:opacity-90 transition"
        >
          🔄 다시 섞기
        </button>
        <button
          onClick={() => setLookPct(37)}
          className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display hover:border-[var(--color-accent)] transition"
        >
          37%로 맞추기
        </button>
        <button
          onClick={() => setLookPct(10)}
          className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display hover:border-[var(--color-accent)] transition"
        >
          너무 일찍 (10%)
        </button>
        <button
          onClick={() => setLookPct(70)}
          className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display hover:border-[var(--color-accent)] transition"
        >
          너무 늦게 (70%)
        </button>
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 슬라이더를 조절해 보세요. 관찰 비율이 <strong>37%</strong>에 가까울수록
        성공률이 가장 높아집니다. 너무 일찍 결정하면 충분한 정보가 없고, 너무
        늦게까지 관찰하면 좋은 후보를 이미 놓쳐버립니다.
      </p>
    </div>
  );
}
