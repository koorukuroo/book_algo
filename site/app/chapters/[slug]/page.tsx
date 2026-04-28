import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, conclusionChapter, colorClass } from "@/lib/chapters";
import { chapterContent } from "@/lib/content";
import { chapterQuestions } from "@/lib/questions";
import { Questions } from "@/components/Questions";

const allChapters = [...chapters, conclusionChapter];

export function generateStaticParams() {
  return allChapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/chapters/[slug]">
): Promise<{ title: string; description: string }> {
  const { slug } = await props.params;
  const c = allChapters.find((x) => x.slug === slug);
  if (!c) return { title: "Not found", description: "" };
  return {
    title: `${c.titleKo} · 알고리즘, 인생을 계산하다`,
    description: c.oneLiner,
  };
}

export default async function ChapterPage(props: PageProps<"/chapters/[slug]">) {
  const { slug } = await props.params;
  const c = allChapters.find((x) => x.slug === slug);
  if (!c) notFound();

  const Content = chapterContent[c.slug];
  const color = colorClass[c.color];

  // Find prev / next
  const idx = allChapters.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? allChapters[idx - 1] : null;
  const next = idx < allChapters.length - 1 ? allChapters[idx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${color.gradient}`}>
        <div className="absolute inset-0 -z-10 paper-grain" />
        <div className="max-w-5xl mx-auto px-5 pt-12 pb-10 md:pt-20 md:pb-16">
          <Link
            href="/#chapters"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition mb-8"
          >
            ← 모든 챕터
          </Link>
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`num-badge ${color.bg} text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow`}
                >
                  {c.num.toString().padStart(2, "0")}
                </span>
                <span className="text-3xl">{c.emoji}</span>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  {c.titleEn} · {c.subtitleEn}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-tight mb-3">
                {c.titleKo}
              </h1>
              <p className="font-display text-2xl md:text-3xl text-[var(--color-ink-soft)] mb-4">
                {c.subtitleKo}
              </p>
              <p className="text-lg leading-relaxed text-[var(--color-ink-soft)] max-w-2xl">
                {c.blurb}
              </p>
            </div>
            <div className={`rounded-2xl ${color.bgSoft} border-2 ${color.border}/30 p-5 text-center md:min-w-[200px]`}>
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">
                Key Number
              </p>
              <p className={`num-badge text-4xl font-bold ${color.text}`}>
                {c.keyNumber}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-1">{c.keyNumberLabel}</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-[16/8] md:aspect-[16/6] max-w-5xl mx-auto rounded-t-3xl overflow-hidden shadow-2xl">
          <Image
            src={c.hero}
            alt={c.titleKo}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-5 py-12 prose-ko">
        <Content />
        <Questions items={chapterQuestions[c.slug] ?? []} />
      </article>

      {/* Prev / Next nav */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-bg-soft)] py-10">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/chapters/${prev.slug}`}
              className="group rounded-2xl border-2 border-[var(--color-line)] bg-white p-5 hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-1">
                ← 이전 · Ch {prev.num.toString().padStart(2, "0")}
              </p>
              <p className="font-display text-xl">
                {prev.emoji} {prev.titleKo}
              </p>
              <p className="text-sm text-[var(--color-muted)] mt-1 line-clamp-1">
                {prev.oneLiner}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/chapters/${next.slug}`}
              className="group rounded-2xl border-2 border-[var(--color-line)] bg-white p-5 hover:-translate-y-0.5 hover:shadow-md transition text-right"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-1">
                다음 · Ch {next.num.toString().padStart(2, "0")} →
              </p>
              <p className="font-display text-xl">
                {next.titleKo} {next.emoji}
              </p>
              <p className="text-sm text-[var(--color-muted)] mt-1 line-clamp-1">
                {next.oneLiner}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </>
  );
}
