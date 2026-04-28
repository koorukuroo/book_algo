"use client";
import { useState } from "react";

const ITEMS = [
  { id: "a", emoji: "👕", name: "흰 셔츠" },
  { id: "b", emoji: "🧦", name: "회색 양말" },
  { id: "c", emoji: "👖", name: "청바지" },
  { id: "d", emoji: "🧥", name: "재킷" },
  { id: "e", emoji: "👟", name: "운동화" },
  { id: "f", emoji: "🎒", name: "백팩" },
  { id: "g", emoji: "🧣", name: "스카프" },
  { id: "h", emoji: "🧤", name: "장갑" },
];

const CAPACITY = 4;

type Event = { item: typeof ITEMS[number]; hit: boolean; evicted?: typeof ITEMS[number] };

export function CacheLRU() {
  const [cache, setCache] = useState<typeof ITEMS>([]);
  const [history, setHistory] = useState<Event[]>([]);

  const stats = history.reduce(
    (s, e) => ({ hit: s.hit + (e.hit ? 1 : 0), miss: s.miss + (e.hit ? 0 : 1) }),
    { hit: 0, miss: 0 }
  );

  const access = (item: typeof ITEMS[number]) => {
    const exists = cache.find((x) => x.id === item.id);
    if (exists) {
      // Move to front (most recently used)
      setCache([item, ...cache.filter((x) => x.id !== item.id)]);
      setHistory((h) => [...h, { item, hit: true }]);
      return;
    }
    let evicted: typeof ITEMS[number] | undefined;
    let next: typeof ITEMS;
    if (cache.length >= CAPACITY) {
      evicted = cache[cache.length - 1];
      next = [item, ...cache.slice(0, CAPACITY - 1)];
    } else {
      next = [item, ...cache];
    }
    setCache(next);
    setHistory((h) => [...h, { item, hit: false, evicted }]);
  };

  const reset = () => {
    setCache([]);
    setHistory([]);
  };

  return (
    <div className="rounded-3xl border-2 border-[var(--color-line)] bg-white p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="font-display text-2xl">🗄️ LRU 옷장 시뮬레이터</h3>
        <p className="text-sm text-[var(--color-muted)]">
          용량 {CAPACITY} · 히트 {stats.hit} / 미스 {stats.miss}
        </p>
      </div>

      <p className="text-sm text-[var(--color-ink-soft)] mb-6 leading-relaxed">
        옷장(가까운 캐시)에는 {CAPACITY}벌만 들어갑니다. 가장 오랫동안 안 쓴 것이
        지하 창고로 밀려납니다. 옷을 클릭해 입어보세요.
      </p>

      {/* Cache slots */}
      <div className="bg-gradient-to-r from-[var(--color-sun-soft)] to-[var(--color-bg-soft)] rounded-2xl p-4 mb-4 border-2 border-dashed border-[var(--color-sun)]/40">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          🏠 옷장 (최신 → 오래됨)
        </p>
        <div className="flex gap-2 min-h-[88px]">
          {Array.from({ length: CAPACITY }).map((_, i) => {
            const item = cache[i];
            return (
              <div
                key={i}
                className={`flex-1 rounded-xl border-2 ${
                  item
                    ? "border-[var(--color-sun)] bg-white"
                    : "border-dashed border-[var(--color-line)] bg-[var(--color-bg)]"
                } flex flex-col items-center justify-center p-2 transition`}
              >
                {item ? (
                  <>
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-[10px] text-[var(--color-muted)]">
                      {item.name}
                    </span>
                  </>
                ) : (
                  <span className="text-[var(--color-line)] text-xs">비어 있음</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* All items */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {ITEMS.map((item) => {
          const inCache = cache.find((x) => x.id === item.id);
          return (
            <button
              key={item.id}
              onClick={() => access(item)}
              className={`rounded-xl border-2 p-3 transition hover:-translate-y-0.5 ${
                inCache
                  ? "border-[var(--color-sun)] bg-[var(--color-sun-soft)]"
                  : "border-[var(--color-line)] bg-white hover:border-[var(--color-sun)]"
              }`}
            >
              <div className="text-2xl">{item.emoji}</div>
              <div className="text-[10px] text-[var(--color-muted)] mt-1">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* History */}
      <div className="bg-[var(--color-bg-soft)] rounded-xl p-3 mb-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          이력
        </p>
        {history.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">아직 입은 옷이 없습니다</p>
        ) : (
          <div className="flex flex-wrap gap-1.5 text-xs">
            {history.slice(-12).map((e, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded ${
                  e.hit
                    ? "bg-[var(--color-mint-soft)] text-[var(--color-mint)]"
                    : "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                }`}
              >
                {e.item.emoji} {e.hit ? "히트" : "미스"}
                {e.evicted && ` · ${e.evicted.emoji} 추방`}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={reset}
        className="px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] text-sm font-display hover:border-[var(--color-sun)] transition"
      >
        🔄 초기화
      </button>

      <p className="text-xs text-[var(--color-muted)] mt-4 leading-relaxed">
        💡 가장 최근에 쓴 것을 가장 가까이 둡니다(LRU). 자주 쓰는 옷은 자연스럽게
        앞에 머물고, 안 입는 옷은 밀려납니다. 책상의 종이 더미와 같은 원리입니다.
      </p>
    </div>
  );
}
