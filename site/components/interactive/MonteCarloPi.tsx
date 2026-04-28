"use client";
import { useEffect, useRef, useState } from "react";

const RENDER_CAP = 1500;

export function MonteCarloPi() {
  // Cumulative counts (never truncated) drive the π estimate.
  const [total, setTotal] = useState(0);
  const [inside, setInside] = useState(0);
  // Visual buffer — last RENDER_CAP points only.
  const [points, setPoints] = useState<{ x: number; y: number; inside: boolean }[]>([]);
  const [running, setRunning] = useState(false);
  const idRef = useRef<number | null>(null);

  const piEst = total > 0 ? (4 * inside) / total : 0;

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const batch = Array.from({ length: 25 }, () => {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        return { x, y, inside: x * x + y * y <= 1 };
      });
      const newInside = batch.filter((p) => p.inside).length;
      setTotal((t) => t + batch.length);
      setInside((c) => c + newInside);
      setPoints((prev) => [...prev, ...batch].slice(-RENDER_CAP));
      idRef.current = requestAnimationFrame(tick);
    };
    idRef.current = requestAnimationFrame(tick);
    return () => {
      if (idRef.current) cancelAnimationFrame(idRef.current);
    };
  }, [running]);

  const reset = () => {
    setPoints([]);
    setTotal(0);
    setInside(0);
    setRunning(false);
  };

  const W = 280;
  const cx = (x: number) => W / 2 + (x * W) / 2;
  const cy = (y: number) => W / 2 - (y * W) / 2;

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">🎲 몬테카를로 π 추정</h3>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        무작위 점을 뿌려서 원 안에 들어간 비율로 π를 추정합니다. Stanislaw
        Ulam이 솔리테어를 두며 떠올린 아이디어입니다.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <svg viewBox={`0 0 ${W} ${W}`} className="w-full max-w-[280px] h-auto">
            <rect x={0} y={0} width={W} height={W} fill="var(--color-bg-soft)" rx={12} />
            <circle cx={W / 2} cy={W / 2} r={W / 2} fill="white" stroke="var(--color-accent)" strokeWidth={2} />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={cx(p.x)}
                cy={cy(p.y)}
                r={1.5}
                fill={p.inside ? "var(--color-mint)" : "var(--color-accent)"}
                opacity={0.6}
              />
            ))}
          </svg>
        </div>
        <div>
          <div className="space-y-3 mb-4">
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
              <p className="text-xs text-[var(--color-muted)]">총 점 (누적)</p>
              <p className="num-badge text-xl font-bold">{total.toLocaleString()}</p>
            </div>
            <div className="bg-[var(--color-mint-soft)] rounded-xl p-3">
              <p className="text-xs text-[var(--color-muted)]">원 안</p>
              <p className="num-badge text-xl font-bold text-[var(--color-mint)]">
                {inside.toLocaleString()}
              </p>
            </div>
            <div className="bg-[var(--color-accent-soft)] rounded-xl p-3">
              <p className="text-xs text-[var(--color-muted)]">π 추정값</p>
              <p className="num-badge text-3xl font-bold text-[var(--color-accent)]">
                {piEst.toFixed(4)}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">
                실제 π = 3.14159... · 오차{" "}
                {total > 0 ? ((piEst - Math.PI).toFixed(4)) : "—"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="px-4 py-2 rounded-full bg-[var(--color-accent)] text-white text-sm font-display"
            >
              {running ? "⏸ 정지" : "▶ 시작"}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display"
            >
              🔄 초기화
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 가능성 공간을 모두 분석하지 말고 직접 표본 추출하라. 핵분열 시뮬레이션부터
        암호 시스템까지 무작위는 강력한 도구입니다. (오차는 √N으로 수렴 — 표본을
        4배 늘리면 오차는 절반.)
      </p>
    </div>
  );
}
