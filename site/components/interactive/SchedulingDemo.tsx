"use client";
import { useState } from "react";

type Task = {
  id: number;
  name: string;
  emoji: string;
  duration: number;
  due: number;
  weight: number;
};

const TASKS: Task[] = [
  { id: 1, name: "이메일 답장", emoji: "📧", duration: 1, due: 6, weight: 1 },
  { id: 2, name: "보고서 작성", emoji: "📝", duration: 4, due: 8, weight: 5 },
  { id: 3, name: "회의 준비", emoji: "🗣️", duration: 2, due: 3, weight: 4 },
  { id: 4, name: "청구서", emoji: "💸", duration: 1, due: 10, weight: 2 },
  { id: 5, name: "친구 답장", emoji: "💌", duration: 1, due: 12, weight: 1 },
];

type Algorithm = "fcfs" | "edd" | "spt" | "wspt";

function order(tasks: Task[], algo: Algorithm) {
  const a = [...tasks];
  switch (algo) {
    case "fcfs":
      return a;
    case "edd":
      return a.sort((x, y) => x.due - y.due);
    case "spt":
      return a.sort((x, y) => x.duration - y.duration);
    case "wspt":
      return a.sort((x, y) => y.weight / y.duration - x.weight / x.duration);
  }
}

function metrics(scheduled: Task[]) {
  let t = 0;
  let maxLate = 0;
  let lateCount = 0;
  let sumComplete = 0;
  let weightedComplete = 0;
  for (const task of scheduled) {
    t += task.duration;
    sumComplete += t;
    weightedComplete += t * task.weight;
    const late = Math.max(0, t - task.due);
    if (late > 0) lateCount++;
    maxLate = Math.max(maxLate, late);
  }
  return { maxLate, lateCount, sumComplete, weightedComplete, total: t };
}

const ALGOS: { key: Algorithm; label: string; goal: string }[] = [
  { key: "fcfs", label: "FCFS (선착순)", goal: "기본값" },
  { key: "edd", label: "EDD (마감 빠른 것부터)", goal: "최대 지연 최소화" },
  { key: "spt", label: "SPT (짧은 것부터)", goal: "완료 시간 합 최소화" },
  { key: "wspt", label: "WSPT (밀도 높은 것부터)", goal: "가중치 고려" },
];

export function SchedulingDemo() {
  const [algo, setAlgo] = useState<Algorithm>("edd");
  const scheduled = order(TASKS, algo);
  const m = metrics(scheduled);

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">⏱️ 스케줄링 알고리즘 비교</h3>
      </div>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        같은 5개 작업도 어떤 지표를 최적화하느냐에 따라 처리 순서가 완전히
        달라집니다. 알고리즘을 바꿔보세요.
      </p>

      <div className="grid sm:grid-cols-2 gap-2 mb-6">
        {ALGOS.map((a) => (
          <button
            key={a.key}
            onClick={() => setAlgo(a.key)}
            className={`text-left p-3 rounded-xl border-2 transition ${
              algo === a.key
                ? "border-[var(--color-plum)] bg-[var(--color-plum-soft)]"
                : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]"
            }`}
          >
            <p className="font-display text-sm">{a.label}</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">{a.goal}</p>
          </button>
        ))}
      </div>

      {/* Gantt */}
      <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4 mb-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-3">
          처리 순서 ({m.total}시간)
        </p>
        <div className="flex h-12 gap-0.5">
          {(() => {
            let t = 0;
            return scheduled.map((task) => {
              const start = t;
              t += task.duration;
              const late = t > task.due;
              return (
                <div
                  key={task.id}
                  style={{ flex: task.duration }}
                  className={`rounded flex flex-col items-center justify-center text-xs px-1 ${
                    late
                      ? "bg-[var(--color-accent)] text-white"
                      : "bg-[var(--color-plum)] text-white"
                  }`}
                  title={`${task.name} · ${start}h–${t}h · 마감 ${task.due}h`}
                >
                  <span className="text-base">{task.emoji}</span>
                  <span className="text-[10px] truncate w-full text-center">
                    {task.duration}h
                  </span>
                </div>
              );
            });
          })()}
        </div>
        <div className="flex gap-3 text-[10px] text-[var(--color-muted)] mt-2">
          <span>
            <span className="inline-block w-3 h-3 bg-[var(--color-plum)] rounded mr-1"></span>
            정시
          </span>
          <span>
            <span className="inline-block w-3 h-3 bg-[var(--color-accent)] rounded mr-1"></span>
            지각
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div
          className={`rounded-xl p-3 ${
            algo === "edd"
              ? "bg-[var(--color-plum-soft)] ring-2 ring-[var(--color-plum)]"
              : "bg-[var(--color-bg-soft)]"
          }`}
        >
          <p className="text-xs text-[var(--color-muted)]">최대 지연 (EDD)</p>
          <p className="num-badge text-2xl font-bold">{m.maxLate}h</p>
        </div>
        <div className="bg-[var(--color-bg-soft)] rounded-xl p-3">
          <p className="text-xs text-[var(--color-muted)]">지각 작업 수</p>
          <p className="num-badge text-2xl font-bold">{m.lateCount}</p>
        </div>
        <div
          className={`rounded-xl p-3 ${
            algo === "spt"
              ? "bg-[var(--color-plum-soft)] ring-2 ring-[var(--color-plum)]"
              : "bg-[var(--color-bg-soft)]"
          }`}
        >
          <p className="text-xs text-[var(--color-muted)]">완료 시간 합 (SPT)</p>
          <p className="num-badge text-2xl font-bold">{m.sumComplete}h</p>
        </div>
        <div
          className={`rounded-xl p-3 ${
            algo === "wspt"
              ? "bg-[var(--color-plum-soft)] ring-2 ring-[var(--color-plum)]"
              : "bg-[var(--color-bg-soft)]"
          }`}
        >
          <p className="text-xs text-[var(--color-muted)]">가중 완료 합 (WSPT)</p>
          <p className="num-badge text-2xl font-bold">{m.weightedComplete}</p>
        </div>
      </div>

      <p className="text-xs text-[var(--color-muted)] leading-relaxed">
        💡 EDD는 최대 지연을 줄이고, SPT는 완료 합을 줄입니다. WSPT는 중요도까지
        고려합니다. <strong>먼저 어떤 지표를 최적화할지 정하라</strong>는 것이
        스케줄링의 첫 가르침입니다.
      </p>
    </div>
  );
}
