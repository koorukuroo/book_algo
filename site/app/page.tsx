import Image from "next/image";
import Link from "next/link";
import { ChapterCard } from "@/components/ChapterCard";
import { chapters, conclusionChapter } from "@/lib/chapters";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-accent-soft)] via-[var(--color-bg)] to-[var(--color-mint-soft)] paper-grain" />
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
                Brian Christian · Tom Griffiths · 2016
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-6">
                알고리즘,
                <br />
                <span className="text-[var(--color-accent)]">인생을</span>{" "}
                <span className="text-[var(--color-mint)]">계산</span>하다
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink-soft)] mb-6">
                매일 마주하는 결정들 — 어떤 식당을 갈까, 누구와 결혼할까, 이메일을
                폴더링할까, 아니면 그냥 검색에 맡길까. 컴퓨터 과학은 이미 50년 전부터
                이 문제들과 씨름해 왔습니다.{" "}
                <span className="marker font-bold">
                  검증된 알고리즘이 곧 인생의 지혜
                </span>
                가 됩니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#chapters"
                  className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-display hover:opacity-90 transition shadow-md"
                >
                  📖 11개 챕터 둘러보기
                </Link>
                <Link
                  href="/meeting"
                  className="px-6 py-3 rounded-full bg-white border-2 border-[var(--color-accent)]/40 font-display hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]/40 transition"
                >
                  🧡 5월 모임 안내 →
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-square">
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 bg-white">
                <Image
                  src="/images/chapters/ch01.jpg"
                  alt="알고리즘으로 인생을 계산하다"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-[var(--color-line)] -rotate-3">
                <p className="text-xs text-[var(--color-muted)]">예: 비서 문제</p>
                <p className="num-badge text-3xl font-bold text-[var(--color-accent)]">
                  37%
                </p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-[var(--color-line)] rotate-6">
                <p className="text-xs text-[var(--color-muted)]">탐색→결단</p>
                <p className="font-display text-base">Look-Then-Leap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why this book */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-line)] py-16">
        <div className="max-w-4xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            왜 이 책인가
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            인간은 비합리적이지 않습니다 — <br />
            그저 어려운 문제를 풀고 있을 뿐.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-[var(--color-ink-soft)] leading-relaxed">
            <p>
              행동경제학은 인간을 "결함 많은 합리적 의사결정자"로 그려왔습니다. 이 책은
              그 시각을 뒤집습니다 — 우리의 직관과 휴리스틱은 본질적으로 어려운 계산
              문제에 대한 합리적 적응이라는 것입니다.
            </p>
            <p>
              컴퓨터 과학자가 매일 풀어 온 문제들 — 메모리 캐싱, 작업 스케줄링, 네트워크
              혼잡 제어 — 는 인간의 일상과 똑같은 구조를 가집니다. 그들의 해법이 곧 우리
              삶에 적용 가능한 알고리즘입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Five meta principles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            책 전체를 관통하는 5가지
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-8">메타 원칙</h2>
          <div className="grid md:grid-cols-5 gap-3">
            {[
              { num: "01", title: "과정 > 결과", desc: "좋은 알고리즘을 따랐다면 자책하지 마라." },
              { num: "02", title: "Interval이 핵심", desc: "남은 시간이 전략을 결정한다." },
              { num: "03", title: "덜 = 더 많이", desc: "단순한 모델이 더 견고하다." },
              { num: "04", title: "불확실성 수용", desc: "무작위·근사·완화는 도구다." },
              { num: "05", title: "게임을 바꿔라", desc: "전략 대신 규칙을 바꿔라." },
            ].map((p) => (
              <div
                key={p.num}
                className="rounded-2xl bg-white border-2 border-[var(--color-line)] p-5"
              >
                <p className="num-badge text-2xl font-bold text-[var(--color-accent)] mb-1">
                  {p.num}
                </p>
                <p className="font-display text-lg mb-1">{p.title}</p>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters grid */}
      <section id="chapters" className="py-16 bg-[var(--color-bg-soft)] border-y border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            11개 챕터 + 결론
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-2">
            어떤 알고리즘부터 만나볼까요?
          </h2>
          <p className="text-[var(--color-ink-soft)] mb-10">
            각 챕터는 직접 시뮬레이션해 볼 수 있는 인터랙티브 데모를 포함합니다.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((c, i) => (
              <ChapterCard key={c.slug} chapter={c} priority={i < 3} />
            ))}
            <ChapterCard chapter={conclusionChapter} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-2xl md:text-3xl font-display leading-snug mb-6">
            “이것들은 합리적일 수 없을 때의 양보가 아니다.{" "}
            <span className="text-[var(--color-accent)]">이것이 바로 합리성이다.</span>”
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            — Brian Christian & Tom Griffiths
          </p>
        </div>
      </section>
    </>
  );
}
