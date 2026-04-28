"use client";
import { useState } from "react";

type Mode = "normal" | "copernican" | "power" | "erlang";

const SCENARIOS: Record<
  Mode,
  {
    title: string;
    short: string;
    emoji: string;
    describe: string;
    unit: string;
    sliderMin: number;
    sliderMax: number;
    defaultObserved: number;
    predict: (x: number) => number;
    explain: (x: number, p: number) => string;
  }
> = {
  normal: {
    title: "사람의 수명 (정규분포)",
    short: "정규",
    emoji: "👤",
    describe: "평균 76세 ± 16. 평균에 가까워질수록 곧 끝남.",
    unit: "세",
    sliderMin: 1,
    sliderMax: 97,
    defaultObserved: 40,
    // Posterior mean for a Gaussian-prior+observation model with prior
    // mean μ=76, prior σ=16 — closed form yields predicted ≈ μ + (x-μ)·k
    // for old ages (right tail). Smooth across all x.
    predict: (age) => {
      const mu = 76;
      const cap = 98;
      // Continuous: predicted = max(prior mean, current age + tapered residual).
      // Crossover at age ≈ 58, smooth from there to the cap.
      const survivor = age + Math.max(2, (cap - age) * 0.45);
      return Math.min(cap, Math.max(mu, survivor));
    },
    explain: (age, p) =>
      `${age}세인 사람은 약 ${p.toFixed(0)}세까지 살 것으로 예측됩니다. 정규분포는 평균(76세)을 중심으로 종형이라, 평균을 넘긴 후엔 매년 조금씩만 더 기대할 수 있습니다.`,
  },
  copernican: {
    title: "수명을 모르는 모든 것 (코페르니쿠스)",
    short: "×2",
    emoji: "🧱",
    describe: "정보가 없을 때의 무정보 prior. 지금까지의 시간 ×2.",
    unit: "년",
    sliderMin: 1,
    sliderMax: 100,
    defaultObserved: 8,
    // Gott's Copernican principle: total ≈ 2x → remaining ≈ x.
    predict: (now) => now * 2,
    explain: (now, p) =>
      `${now}년 된 것은 총 약 ${p}년까지 갈 것으로 예측됩니다(앞으로 약 ${(p - now).toFixed(0)}년 더). Gott이 1969년 베를린 장벽 앞에서 떠올린 무정보 prior — 8년 된 장벽은 약 16년까지 갈 것이라 예측했고, 실제로 28년까지 갔습니다.`,
  },
  power: {
    title: "영화 흥행 (멱법칙)",
    short: "멱법칙",
    emoji: "🎬",
    describe: "오래 갈수록 더 오래 간다. ×1.4 곱셈 규칙.",
    unit: "$M",
    sliderMin: 1,
    sliderMax: 200,
    defaultObserved: 6,
    predict: (now) => now * 1.4,
    explain: (now, p) =>
      `현재까지 $${now}M 벌었으면 총 $${p.toFixed(1)}M까지 갈 것으로 예측됩니다. 멱법칙에서는 오래 지속될수록 미래 기대치가 함께 늘어납니다.`,
  },
  erlang: {
    title: "도박/방사성붕괴 (얼랑·메모리리스)",
    short: "얼랑",
    emoji: "🎲",
    describe: "메모리리스. 과거가 미래에 영향 없음.",
    unit: "판",
    sliderMin: 0,
    sliderMax: 50,
    defaultObserved: 3,
    // Pure exponential / Erlang-1 → constant residual lifetime regardless
    // of how long it has already lasted.
    predict: () => 5,
    explain: (now, p) =>
      `이미 ${now}판 했어도 앞으로 약 ${p}판 더 갈 것으로 예측됩니다. 얼랑 분포(메모리리스)는 "한 판만 더!"가 영원히 반복되는 이유입니다 — 도박이 중독적인 까닭.`,
  },
};

export function BayesPredictor() {
  const [mode, setMode] = useState<Mode>("normal");
  const [observed, setObserved] = useState(SCENARIOS.normal.defaultObserved);

  const s = SCENARIOS[mode];
  const predicted = s.predict(observed);

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">🔮 분포별 예측 규칙</h3>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        같은 "지금까지 X" 정보로도 분포 종류에 따라 예측이 완전히 달라집니다.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {(Object.keys(SCENARIOS) as Mode[]).map((k) => (
          <button
            key={k}
            onClick={() => {
              setMode(k);
              setObserved(SCENARIOS[k].defaultObserved);
            }}
            className={`p-3 rounded-xl border-2 transition ${
              mode === k
                ? "border-[var(--color-sky)] bg-[var(--color-sky-soft)]"
                : "border-[var(--color-line)] bg-white hover:border-[var(--color-sky)]"
            }`}
          >
            <div className="text-2xl mb-1">{SCENARIOS[k].emoji}</div>
            <div className="text-xs font-display">{SCENARIOS[k].short}</div>
          </button>
        ))}
      </div>

      <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4 mb-4">
        <p className="text-xs text-[var(--color-muted)] mb-2 font-mono uppercase tracking-wider">
          시나리오: {s.title}
        </p>
        <p className="text-sm">{s.describe}</p>
      </div>

      <div className="mb-6">
        <label className="text-sm text-[var(--color-muted)]">
          현재 관측값:{" "}
          <strong className="num-badge text-base text-[var(--color-ink)]">
            {observed}
          </strong>{" "}
          {s.unit}
        </label>
        <input
          type="range"
          min={s.sliderMin}
          max={s.sliderMax}
          value={observed}
          onChange={(e) => setObserved(+e.target.value)}
          className="w-full mt-2 accent-[var(--color-sky)]"
        />
      </div>

      <div className="bg-gradient-to-br from-[var(--color-sky-soft)] to-[var(--color-bg)] rounded-2xl p-5 border-2 border-[var(--color-sky)]/30">
        <p className="text-xs text-[var(--color-muted)] mb-1">예측</p>
        <p className="num-badge text-4xl font-bold text-[var(--color-sky)] mb-2">
          {predicted.toFixed(1)}{" "}
          <span className="text-base font-normal text-[var(--color-muted)]">
            {mode === "erlang" ? `${s.unit} 더` : `${s.unit}까지`}
          </span>
        </p>
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
          {s.explain(observed, predicted)}
        </p>
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 좋은 예측은 좋은 사전 분포(prior)를 요구합니다. 영화 흥행을 정규분포로
        착각하면 오버 평가, 사람 수명을 멱법칙으로 착각하면 비현실적 결과가 나옵니다.
      </p>
    </div>
  );
}
