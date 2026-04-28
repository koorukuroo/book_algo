"use client";
import { useEffect, useState } from "react";

type Event = { day: number; type: "try" | "fail" | "success" };
type Strategy = "linear" | "exponential";

const SUCCESS_RATE = 0.25;

export function ExponentialBackoff() {
  const [events, setEvents] = useState<Event[]>([]);
  const [day, setDay] = useState(0);
  const [strategy, setStrategy] = useState<Strategy>("exponential");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setDay((d) => d + 1);
    }, 400);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    setEvents((prev) => {
      const fails = prev.filter((e) => e.type === "fail").length;
      const lastTry = prev.filter((e) => e.type === "try").slice(-1)[0]?.day ?? -1;
      const wait = strategy === "linear" ? 1 : Math.pow(2, fails);
      // First-time bootstrap: prev empty → try on day 0.
      const ready = prev.length === 0 || day - lastTry >= wait;
      if (!ready) return prev;
      // Each try: SUCCESS_RATE chance of success regardless of attempt #.
      if (Math.random() < SUCCESS_RATE) {
        setRunning(false);
        return [...prev, { day, type: "try" }, { day, type: "success" }];
      }
      return [...prev, { day, type: "try" }, { day, type: "fail" }];
    });
  }, [day, running, strategy]);

  const reset = () => {
    setEvents([]);
    setDay(0);
    setRunning(false);
  };

  const fails = events.filter((e) => e.type === "fail").length;
  const tries = events.filter((e) => e.type === "try").length;
  const successDay = events.find((e) => e.type === "success")?.day;
  // Friendship cost: per-attempt social load. Linear is cheaper per attempt
  // but accumulates fast; exponential spaces them out.
  const socialCost = tries * (strategy === "linear" ? 3 : 1);

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">📡 지수적 백오프 시뮬레이션</h3>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        약속을 자꾸 어기는 친구에게 언제 다시 연락할까요? 각 재시도의 성공
        확률은 {Math.round(SUCCESS_RATE * 100)}%로 같고, <strong>전략에 따라
        재시도 간격이 달라집니다.</strong>
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => {
            setStrategy("linear");
            reset();
          }}
          className={`p-3 rounded-xl border-2 ${
            strategy === "linear"
              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
              : "border-[var(--color-line)]"
          }`}
        >
          <p className="font-display text-sm">매일 시도 (선형)</p>
          <p className="text-xs text-[var(--color-muted)]">상대를 지치게 함</p>
        </button>
        <button
          onClick={() => {
            setStrategy("exponential");
            reset();
          }}
          className={`p-3 rounded-xl border-2 ${
            strategy === "exponential"
              ? "border-[var(--color-sun)] bg-[var(--color-sun-soft)]"
              : "border-[var(--color-line)]"
          }`}
        >
          <p className="font-display text-sm">2배씩 늘림 (지수적)</p>
          <p className="text-xs text-[var(--color-muted)]">우아하게 양보</p>
        </button>
      </div>

      <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4 mb-4 min-h-[120px]">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          하루 #{day}
        </p>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: Math.max(day, 30) }).map((_, i) => {
            const tryEvent = events.find((e) => e.day === i && e.type === "try");
            const failEvent = events.find((e) => e.day === i && e.type === "fail");
            const successEvent = events.find((e) => e.day === i && e.type === "success");
            return (
              <div
                key={i}
                className={`w-5 h-5 rounded text-[9px] flex items-center justify-center ${
                  successEvent
                    ? "bg-[var(--color-mint)] text-white"
                    : failEvent
                    ? "bg-[var(--color-accent)] text-white"
                    : tryEvent
                    ? "bg-[var(--color-sun)]"
                    : "bg-[var(--color-line)]/30"
                }`}
                title={`Day ${i}`}
              >
                {successEvent ? "✓" : failEvent ? "✗" : tryEvent ? "?" : ""}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">시도 횟수</p>
          <p className="num-badge text-xl font-bold">{tries}</p>
        </div>
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">실패 횟수</p>
          <p className="num-badge text-xl font-bold">{fails}</p>
        </div>
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">다음 대기</p>
          <p className="num-badge text-xl font-bold">
            {strategy === "linear" ? "1" : Math.pow(2, fails)}일
          </p>
        </div>
        <div
          className={`rounded-xl p-3 ${
            socialCost > 12
              ? "bg-[var(--color-accent-soft)]"
              : "bg-[var(--color-mint-soft)]"
          }`}
        >
          <p className="text-xs text-[var(--color-muted)]">관계 부담</p>
          <p
            className={`num-badge text-xl font-bold ${
              socialCost > 12 ? "text-[var(--color-accent)]" : "text-[var(--color-mint)]"
            }`}
          >
            {socialCost}
          </p>
        </div>
      </div>

      {successDay !== undefined && (
        <div className="bg-[var(--color-mint-soft)] rounded-xl p-3 mb-4 text-sm">
          🎉 Day {successDay}에 성공! 시도 {tries}번, 관계 부담{" "}
          <strong>{socialCost}</strong>.
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-2 rounded-full bg-[var(--color-sun)] text-[var(--color-ink)] text-sm font-display"
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

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 선형 전략은 시계상 더 빨리 성공할 수 있지만 시도마다 관계 부담이 누적됩니다.
        지수적 백오프는 시간이 더 걸려도 부담을 낮춰 — "유한한 인내, 무한한 자비"를
        가능케 합니다. ALOHAnet(1971), TCP, Hawaii의 HOPE 보호관찰 프로그램까지.
      </p>
    </div>
  );
}
