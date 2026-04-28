import Link from "next/link";
import Image from "next/image";
import { Chapter, colorClass } from "@/lib/chapters";

export function ChapterCard({ chapter, priority = false }: { chapter: Chapter; priority?: boolean }) {
  const c = colorClass[chapter.color];
  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className={`group relative overflow-hidden rounded-3xl border-2 border-[var(--color-line)] hover:${c.border} bg-white transition-all hover:-translate-y-1 hover:shadow-xl shadow-sm`}
    >
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${c.gradient}`}>
        <Image
          src={chapter.hero}
          alt={chapter.titleKo}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`num-badge ${c.bg} text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow`}>
            {chapter.num.toString().padStart(2, "0")}
          </span>
          <span className="text-2xl drop-shadow-sm">{chapter.emoji}</span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-mono mb-1">
          {chapter.titleEn}
        </p>
        <h3 className="font-display text-2xl mb-2">{chapter.titleKo}</h3>
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-3 mb-3">
          {chapter.oneLiner}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-line)]">
          <span className={`num-badge text-2xl font-bold ${c.text}`}>
            {chapter.keyNumber}
          </span>
          <span className={`text-sm ${c.text} group-hover:translate-x-1 transition-transform`}>
            읽어보기 →
          </span>
        </div>
      </div>
    </Link>
  );
}
