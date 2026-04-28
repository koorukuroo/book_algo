export function Questions({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="my-12">
      <header className="mb-6 flex items-baseline gap-3">
        <span className="text-3xl">💭</span>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-[var(--color-muted)] mb-1">
            Reflection
          </p>
          <h2 className="font-display text-3xl md:text-4xl">고민해 볼 질문들</h2>
        </div>
      </header>
      <p className="text-sm text-[var(--color-muted)] mb-6 leading-relaxed">
        정답이 정해져 있지 않은 열린 질문입니다. 혼자 생각해 보거나, 가까운 사람과
        함께 이야기 나눠 보세요.
      </p>
      <ol className="space-y-4">
        {items.map((q, i) => (
          <li
            key={i}
            className="rounded-2xl border-2 border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-accent)]/40 hover:-translate-y-0.5 transition"
          >
            <div className="flex gap-4">
              <span className="num-badge text-3xl font-bold text-[var(--color-accent)] leading-none mt-1 shrink-0">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <p className="text-[var(--color-ink)] leading-relaxed">{q}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
