import Link from "next/link";
import { chapters } from "@/lib/chapters";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] border-b border-[var(--color-line)]">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl tracking-tight flex items-center gap-2">
          <span className="text-2xl">📐</span>
          <span>알고리즘, 인생을 계산하다</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {chapters.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/chapters/${c.slug}`}
              className="px-2 py-1 rounded-md hover:bg-[var(--color-bg-soft)] transition"
              title={c.titleKo}
            >
              <span className="num-badge text-[var(--color-muted)] mr-1">{c.num.toString().padStart(2, "0")}</span>
              {c.titleKo}
            </Link>
          ))}
          <Link href="/#chapters" className="px-2 py-1 rounded-md hover:bg-[var(--color-bg-soft)] transition text-[var(--color-muted)]">
            ⋯ 더보기
          </Link>
          <Link
            href="/meeting"
            className="ml-2 px-3 py-1.5 rounded-full bg-[var(--color-accent)] text-white font-display hover:opacity-90 transition shadow-sm"
          >
            🧡 5월 모임
          </Link>
        </nav>
      </div>
    </header>
  );
}
