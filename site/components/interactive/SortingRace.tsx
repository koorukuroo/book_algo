"use client";
import { useEffect, useRef, useState } from "react";

type Algo = "bubble" | "merge";

function makeArr(n: number) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

// Deterministic identity sequence for SSR — replaced on mount.
function makeIdentityArr(n: number) {
  return Array.from({ length: n }, (_, i) => 10 + (i * 80) / Math.max(1, n - 1));
}

async function bubbleSteps(arr: number[], cb: (a: number[], i: number, j: number) => Promise<void>) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      // Each iteration is one comparison.
      const swapped = a[j] > a[j + 1];
      if (swapped) [a[j], a[j + 1]] = [a[j + 1], a[j]];
      await cb([...a], j, j + 1);
    }
  }
}

async function mergeSteps(arr: number[], cb: (a: number[], i: number, j: number) => Promise<void>) {
  const a = [...arr];
  async function merge(l: number, m: number, r: number) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      // One comparison between left[i] and right[j].
      if (left[i] <= right[j]) a[k++] = left[i++];
      else a[k++] = right[j++];
      await cb([...a], k - 1, k - 1);
    }
    while (i < left.length) { a[k++] = left[i++]; }
    while (j < right.length) { a[k++] = right[j++]; }
  }
  async function ms(l: number, r: number) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await ms(l, m);
      await ms(m + 1, r);
      await merge(l, m, r);
    }
  }
  await ms(0, a.length - 1);
}

function Bars({ arr, hl }: { arr: number[]; hl: [number, number] }) {
  return (
    <div className="flex items-end gap-0.5 h-32">
      {arr.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t transition-all ${
            i === hl[0] || i === hl[1]
              ? "bg-[var(--color-accent)]"
              : "bg-[var(--color-sky)]"
          }`}
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  );
}

export function SortingRace() {
  const [n] = useState(20);
  const initial = useRef<number[]>(makeIdentityArr(20));
  const [bubbleArr, setBubbleArr] = useState<number[]>(initial.current);
  const [mergeArr, setMergeArr] = useState<number[]>(initial.current);
  useEffect(() => {
    const fresh = makeArr(20);
    initial.current = fresh;
    setBubbleArr(fresh);
    setMergeArr(fresh);
  }, []);
  const [bubbleHl, setBubbleHl] = useState<[number, number]>([-1, -1]);
  const [mergeHl, setMergeHl] = useState<[number, number]>([-1, -1]);
  const [bubbleOps, setBubbleOps] = useState(0);
  const [mergeOps, setMergeOps] = useState(0);
  const [running, setRunning] = useState(false);

  const reset = () => {
    const fresh = makeArr(n);
    initial.current = fresh;
    setBubbleArr(fresh);
    setMergeArr(fresh);
    setBubbleHl([-1, -1]);
    setMergeHl([-1, -1]);
    setBubbleOps(0);
    setMergeOps(0);
  };

  const start = async () => {
    if (running) return;
    setRunning(true);
    setBubbleOps(0);
    setMergeOps(0);
    const fresh = [...initial.current];
    setBubbleArr(fresh);
    setMergeArr(fresh);
    let bOps = 0, mOps = 0;
    const wait = () => new Promise<void>((r) => setTimeout(r, 60));
    await Promise.all([
      bubbleSteps(fresh, async (a, i, j) => {
        bOps++;
        setBubbleOps(bOps);
        setBubbleArr(a);
        setBubbleHl([i, j]);
        await wait();
      }),
      mergeSteps(fresh, async (a, i, j) => {
        mOps++;
        setMergeOps(mOps);
        setMergeArr(a);
        setMergeHl([i, j]);
        await wait();
      }),
    ]);
    setBubbleHl([-1, -1]);
    setMergeHl([-1, -1]);
    setRunning(false);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h3 className="font-display text-2xl">🏁 정렬 알고리즘 레이스</h3>
        <p className="text-sm text-[var(--color-muted)]">
          {n}개 숫자 — <strong>비교 횟수</strong>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-display">Bubble Sort · O(n²)</p>
            <span className="num-badge text-2xl font-bold text-[var(--color-accent)]">
              {bubbleOps}
            </span>
          </div>
          <Bars arr={bubbleArr} hl={bubbleHl} />
          <p className="text-xs text-[var(--color-muted)] mt-2">
            인접한 두 개를 비교해서 교환. 작지만 모든 쌍을 확인해야 함.
          </p>
        </div>
        <div className="bg-[var(--color-bg-soft)] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-display">Mergesort · O(n log n)</p>
            <span className="num-badge text-2xl font-bold text-[var(--color-mint)]">
              {mergeOps}
            </span>
          </div>
          <Bars arr={mergeArr} hl={mergeHl} />
          <p className="text-xs text-[var(--color-muted)] mt-2">
            반으로 쪼개고, 정렬된 더미를 합친다. 분할정복.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={running}
          className="px-5 py-2 rounded-full bg-[var(--color-sky)] text-white font-display hover:opacity-90 transition disabled:opacity-50"
        >
          {running ? "정렬 중..." : "▶ 시작"}
        </button>
        <button
          onClick={reset}
          disabled={running}
          className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display hover:border-[var(--color-sky)] transition disabled:opacity-50"
        >
          🔄 새 데이터
        </button>
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 데이터가 두 배가 되면 Bubble Sort는 4배 느려지지만, Mergesort는 약 2.2배만
        느려집니다. 인구조사급 데이터에서 차이는 수억 번의 작업으로 벌어집니다.
      </p>
    </div>
  );
}
