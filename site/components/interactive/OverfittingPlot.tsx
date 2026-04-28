"use client";
import { useMemo, useState } from "react";

// Ground-truth function used to generate noisy training points and clean
// held-out test points. We expose only the "training" set on the plot.
const TRUE_FN = (x: number) => 0.5 + 0.3 * Math.sin(x * Math.PI * 1.6);

// Deterministic pseudo-noise so SSR & client first render match.
function noise(i: number) {
  return Math.sin(i * 7) * 0.18 + Math.cos(i * 13) * 0.12;
}

const TRAIN = Array.from({ length: 8 }, (_, i) => {
  const x = (i + 0.5) / 8;
  return { x, y: TRUE_FN(x) + noise(i) };
});

// Held-out grid for test error.
const TEST = Array.from({ length: 30 }, (_, i) => {
  const x = (i + 0.5) / 30;
  return { x, y: TRUE_FN(x) };
});

// Polynomial fit via normal equations + Gaussian elimination.
function polyfit(deg: number) {
  const n = TRAIN.length;
  const X: number[][] = TRAIN.map((p) =>
    Array.from({ length: deg + 1 }, (_, k) => Math.pow(p.x, k))
  );
  const Y = TRAIN.map((p) => p.y);
  const A: number[][] = Array.from({ length: deg + 1 }, () => Array(deg + 1).fill(0));
  const B: number[] = Array(deg + 1).fill(0);
  for (let i = 0; i <= deg; i++) {
    for (let j = 0; j <= deg; j++) {
      let s = 0;
      for (let k = 0; k < n; k++) s += X[k][i] * X[k][j];
      A[i][j] = s;
    }
    let s = 0;
    for (let k = 0; k < n; k++) s += X[k][i] * Y[k];
    B[i] = s;
  }
  const m = deg + 1;
  for (let i = 0; i < m; i++) {
    let max = Math.abs(A[i][i]);
    let pivot = i;
    for (let k = i + 1; k < m; k++) {
      if (Math.abs(A[k][i]) > max) {
        max = Math.abs(A[k][i]);
        pivot = k;
      }
    }
    [A[i], A[pivot]] = [A[pivot], A[i]];
    [B[i], B[pivot]] = [B[pivot], B[i]];
    for (let k = i + 1; k < m; k++) {
      const factor = A[k][i] / (A[i][i] || 1e-12);
      for (let j = i; j < m; j++) A[k][j] -= factor * A[i][j];
      B[k] -= factor * B[i];
    }
  }
  const c = Array(m).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    let s = B[i];
    for (let j = i + 1; j < m; j++) s -= A[i][j] * c[j];
    c[i] = s / (A[i][i] || 1e-12);
  }
  return c;
}

function evalPoly(c: number[], x: number) {
  return c.reduce((s, v, i) => s + v * Math.pow(x, i), 0);
}

// Plot constants. y is rendered linearly across [Y_MIN, Y_MAX] so high-degree
// fits actually show their wiggle (without clipping the tale).
const W = 480;
const H = 240;
const P = 28;
const Y_MIN = -0.6;
const Y_MAX = 1.6;
const px = (x: number) => P + x * (W - 2 * P);
const py = (y: number) => H - P - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - 2 * P);

export function OverfittingPlot() {
  const [deg, setDeg] = useState(2);
  const coeffs = useMemo(() => polyfit(deg), [deg]);

  const path = useMemo(() => {
    const segs: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = i / 200;
      const yRaw = evalPoly(coeffs, x);
      // Clamp only for SVG bounds, not so tightly that wiggles disappear.
      const y = Math.max(Y_MIN, Math.min(Y_MAX, yRaw));
      segs.push(`${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(y).toFixed(1)}`);
    }
    return segs.join(" ");
  }, [coeffs]);

  const errors = useMemo(() => {
    const trainSE = TRAIN.reduce((s, p) => s + Math.pow(evalPoly(coeffs, p.x) - p.y, 2), 0);
    const testSE = TEST.reduce((s, p) => s + Math.pow(evalPoly(coeffs, p.x) - p.y, 2), 0);
    return {
      train: Math.sqrt(trainSE / TRAIN.length),
      test: Math.sqrt(testSE / TEST.length),
    };
  }, [coeffs]);

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">🎯 과적합 시각화</h3>
        <p className="text-sm text-[var(--color-muted)]">차수 {deg}</p>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        같은 8개 학습 점에 다항식의 차수를 높여가며 맞춰봅니다. 차수가 높을수록
        학습 점은 더 잘 통과하지만, 학습 점 사이에선 제멋대로 출렁여 <strong>새
        데이터(테스트 점)</strong>에 대한 오차가 커집니다.
      </p>

      <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4 mb-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Axes */}
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#e8dccb" strokeWidth={1} />
          <line x1={P} y1={P} x2={P} y2={H - P} stroke="#e8dccb" strokeWidth={1} />
          {/* True function (light) */}
          <path
            d={(() => {
              const segs: string[] = [];
              for (let i = 0; i <= 200; i++) {
                const x = i / 200;
                const y = TRUE_FN(x);
                segs.push(`${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(y).toFixed(1)}`);
              }
              return segs.join(" ");
            })()}
            fill="none"
            stroke="var(--color-mint)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            opacity={0.5}
          />
          {/* Fit curve */}
          <path d={path} fill="none" stroke="var(--color-accent)" strokeWidth={3} strokeLinecap="round" />
          {/* Test points (held-out) */}
          {TEST.map((p, i) => (
            <circle
              key={`test-${i}`}
              cx={px(p.x)}
              cy={py(p.y)}
              r={2}
              fill="var(--color-mint)"
              opacity={0.5}
            />
          ))}
          {/* Train points */}
          {TRAIN.map((p, i) => (
            <circle
              key={`train-${i}`}
              cx={px(p.x)}
              cy={py(p.y)}
              r={6}
              fill="var(--color-plum)"
              stroke="white"
              strokeWidth={2}
            />
          ))}
        </svg>
        <div className="flex flex-wrap gap-3 text-[10px] text-[var(--color-muted)] mt-2">
          <span>
            <span className="inline-block w-3 h-3 rounded-full bg-[var(--color-plum)] mr-1 align-middle" />
            학습 점 (노이즈 포함)
          </span>
          <span>
            <span className="inline-block w-3 h-3 rounded-full bg-[var(--color-mint)] mr-1 align-middle opacity-60" />
            테스트 점 (참값)
          </span>
          <span>
            <span className="inline-block w-3 h-1 bg-[var(--color-mint)] mr-1 align-middle opacity-60" />
            진짜 곡선
          </span>
          <span>
            <span className="inline-block w-3 h-1 bg-[var(--color-accent)] mr-1 align-middle" />
            모델 예측
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[var(--color-mint-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">학습 오차 (RMSE)</p>
          <p className="num-badge text-2xl font-bold text-[var(--color-mint)]">
            {errors.train.toFixed(3)}
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">차수↑ ⇒ 거의 0</p>
        </div>
        <div
          className={`rounded-xl p-3 ${
            errors.test > 0.3
              ? "bg-[var(--color-accent-soft)]"
              : "bg-[var(--color-bg-soft)]"
          }`}
        >
          <p className="text-xs text-[var(--color-muted)]">테스트 오차 (RMSE)</p>
          <p
            className={`num-badge text-2xl font-bold ${
              errors.test > 0.3
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-ink)]"
            }`}
          >
            {errors.test.toFixed(3)}
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">
            차수가 너무 높으면 폭발
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm text-[var(--color-muted)]">모델 복잡도 (차수)</label>
        <input
          type="range"
          min={1}
          max={7}
          value={deg}
          onChange={(e) => setDeg(+e.target.value)}
          className="w-full mt-2 accent-[var(--color-accent)]"
        />
        <div className="flex justify-between text-xs text-[var(--color-muted)]">
          <span>단순</span>
          <span>복잡 (과적합)</span>
        </div>
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 학습 오차가 줄어도 테스트 오차가 커지는 순간이 과적합입니다. 다윈은 결혼
        결정 노트를 한 페이지 안에서 끝냈습니다 — 그것이 바로 정규화입니다.
      </p>
    </div>
  );
}
