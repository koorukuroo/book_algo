import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5월 모임 발제문 — 알고리즘과 인간의 선택",
  description:
    "효율의 시대, 우리는 무엇을 골라야 하나. 『알고리즘, 인생을 계산하다』를 함께 읽기 위한 5월 모임 발제문.",
};

const featured = [
  {
    num: "01",
    slug: "optimal-stopping",
    titleKo: "37% 규칙 — '충분히 봤다'는 어디인가",
    image: "/images/webtoons/ch01.jpg",
    accent: "accent" as const,
    body: (
      <>
        <p>
          이 책이 가장 먼저 던지는 그림은 의외로 <strong>케플러의 일기</strong>
          입니다. 17세기 천문학자 요하네스 케플러는 두 번째 결혼을 앞두고
          11명의 후보를 두고 2년을 고민합니다. 4번째 후보가 가장 마음에
          들었지만 더 봐야 할 것 같아 미루었지요. 결국 그는 5번째 후보
          Susanna에게로 돌아옵니다.
        </p>
        <p>
          책은 이 일을 비효율이라고 비판하지 않습니다. 다만 수학이 알려주는
          정답을 슬쩍 곁에 놓습니다 —{" "}
          <span className="marker font-bold">
            처음 37%는 보고, 그 다음 가장 좋은 후보를 잡으라
          </span>
          는 규칙. 그러면 묻고 싶어집니다. 이렇게 깔끔한 답이 있는데, 우리는
          왜 여전히 망설일까요?
        </p>
      </>
    ),
  },
  {
    num: "02",
    slug: "explore-exploit",
    titleKo: "탐색과 활용 — 단골이냐, 새 가게냐",
    image: "/images/webtoons/ch02.jpg",
    accent: "mint" as const,
    body: (
      <>
        <p>
          식당 앞에서 우리는 매번 같은 질문을 마주합니다. 익숙한 단골 김밥집인가,
          새로 생긴 태국 식당인가. 책은 이를{" "}
          <em>다중 슬롯머신 문제(multi-armed bandit)</em>라고 부르며
          결정적인 통찰을 줍니다 — 답은{" "}
          <span className="marker-mint font-bold">
            "앞으로 얼마나 더 이 동네에 살지"
          </span>
          에 따라 달라진다는 것.
        </p>
        <p>
          이 통찰을 인생 곡선에 대보면 어떨까요. 노년이 되어 새 친구보다
          오래된 친구가 소중해지는 이유, 청년기에 우리가 그토록 헤매는 이유 —
          알고리즘은 이를 비합리가 아니라 <strong>남은 시간에 맞춘 합리</strong>
          라고 이름 붙여 줍니다.
        </p>
      </>
    ),
  },
  {
    num: "03",
    slug: "overfitting",
    titleKo: "과적합 — 덜 생각해야 할 때도 있다",
    image: "/images/webtoons/ch07.jpg",
    accent: "plum" as const,
    body: (
      <>
        <p>
          다윈은 결혼 결정을 앞두고 종이에 찬반을 적기 시작했습니다. 그러나
          항목을 늘릴수록 결정은 더 흐려졌고, 결국 한 페이지에서 멈춥니다.
          <em>"결혼하라. 끝."</em> 노벨상 경제학자 해리 마코위츠는 자신의
          자산을 50:50으로 단순 분산했습니다. 자기가 만든 정교한 포트폴리오
          이론을 따르지 않고요.
        </p>
        <p>
          더 많은 변수, 더 많은 데이터, 더 많은 고려사항이 항상 더 나은 결정을
          만들지는 않습니다. 때로는 <strong>단순한 규칙이 복잡한 모델보다
          견고합니다</strong>. 효율의 시대에 가장 어색하게 들리는 말이지요 —{" "}
          <span className="marker font-bold">"덜 생각하세요."</span>
        </p>
      </>
    ),
  },
  {
    num: "04",
    slug: "randomness",
    titleKo: "무작위성 — 막혔을 때는 일부러 흔들어라",
    image: "/images/webtoons/ch09.jpg",
    accent: "sun" as const,
    body: (
      <>
        <p>
          수학자 스타니스와프 울람이 1940년대 병상에서 솔리테어를 두며
          떠올린 생각이 <em>몬테카를로 방법</em>의 시작이었습니다. 모든
          경우를 분석할 수 없다면, <strong>그냥 많이 해 보면 어떨까</strong>.
          책은 이 발상을 일상으로 끌어옵니다 — 어디서 살지, 무엇을 먹을지,
          인생 결정에서 막혔을 때 가끔은 동전을 던지는 게 답이라고.
        </p>
        <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 py-1 italic text-[var(--color-ink-soft)] mt-3">
          이성을 포기하라는 말이 아닙니다. 이성이 끝까지 갔을 때
          무작위가 가장 강력한 도구가 된다는 뜻입니다.
        </blockquote>
      </>
    ),
  },
];

export default function ScriptPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-accent-soft)] via-[var(--color-bg)] to-[var(--color-mint-soft)] paper-grain" />
        <div className="max-w-3xl mx-auto px-5 pt-16 pb-12 md:pt-20">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
            5월 모임 · 발제문
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
            효율의 그늘에서,
            <br />
            <span className="text-[var(--color-accent)]">알고리즘</span>과{" "}
            <span className="text-[var(--color-mint)]">인간</span>의 선택
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink-soft)] mb-3">
            『알고리즘, 인생을 계산하다』를 함께 읽기 전에
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            글 · 김경훈 (AI 시대의 인간 파트너)
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/meeting"
              className="text-sm font-display px-4 py-2 rounded-full bg-white border-2 border-[var(--color-line)] hover:border-[var(--color-accent)] transition"
            >
              ← 5월 모임 페이지로
            </Link>
            <a
              href="#mission-link"
              className="text-sm font-display px-4 py-2 rounded-full bg-[var(--color-ink)] text-white hover:opacity-90 transition"
            >
              체험 미션과의 연결 ↓
            </a>
          </div>
        </div>
      </section>

      {/* Opening */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5 prose-ko">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            들어가며
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            알고리즘은 이미 우리 안에 있다
          </h2>
          <div className="space-y-5 text-[var(--color-ink-soft)] leading-relaxed text-lg">
            <p>
              오늘 아침, 점심 메뉴 추천을 받지 않고 식사를 결정한 분이
              계신가요? 출근길에 지도 앱을 한 번도 켜지 않은 분은요? 우리는
              깨어 있는 거의 모든 순간 알고리즘과 함께 있습니다. 무엇을 볼지,
              무엇을 살지, 누구와 만날지, 어디로 갈지 — 사실상 일상 전부가
              알고리즘적 추천 위에서 흘러갑니다.
            </p>
            <p>
              브라이언 크리스천과 톰 그리피스의{" "}
              <strong>『알고리즘, 인생을 계산하다』(2016)</strong>는 이 풍경을
              두 가지 눈으로 봅니다. 한쪽 눈은 <em>컴퓨터 과학자의 눈</em>
              입니다. 결혼 상대를 고르는 일은 비서 문제(secretary problem)의
              사촌이고, 양말 짝을 맞추는 일은 정렬 알고리즘의 친척입니다.
              다른 한쪽 눈은 <em>인간의 눈</em>입니다. 똑같은 문제 앞에서
              우리는 단지 효율만이 아니라 후회와 미련, 망설임과 직관을 끌고
              들어갑니다.
            </p>
            <p>
              이 책의 미덕은 두 시선을 함부로 합치지 않는다는 데 있습니다.{" "}
              <span className="marker-mint font-bold">
                "수학은 이렇게 말합니다. 그런데 당신은 어떻게 살고 싶나요?"
              </span>{" "}
              이 질문이 11개 챕터 내내 부드럽게 흐릅니다. 발제문은 그 질문이
              가장 잘 들리는 네 개의 챕터를 먼저 함께 걸어보고, 책의 끝에서
              다시 만나는 자리를 향해 가려 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Four featured chapters */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-line)] py-16">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            친절하게 닮은 것들
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-2">
            책이 열어 보이는 풍경
          </h2>
          <p className="text-[var(--color-ink-soft)] mb-10 leading-relaxed">
            11개 챕터 가운데 5월의 키워드와 가장 가깝게 닿아 있는 네 곳을
            먼저 짚어봅니다.
          </p>

          <div className="space-y-12">
            {featured.map((c, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <article
                  key={c.slug}
                  className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start"
                >
                  <div
                    className={`${
                      reverse ? "md:order-2" : ""
                    } relative aspect-square rounded-3xl overflow-hidden border-2 border-[var(--color-ink)] shadow-[6px_6px_0_var(--color-ink)]`}
                  >
                    <Image
                      src={c.image}
                      alt={c.titleKo}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-2">
                      Chapter {c.num}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl mb-4 leading-snug">
                      {c.titleKo}
                    </h3>
                    <div className="space-y-4 text-[var(--color-ink-soft)] leading-relaxed">
                      {c.body}
                    </div>
                    <Link
                      href={`/chapters/${c.slug}`}
                      className="inline-flex items-center gap-2 mt-5 text-sm font-display text-[var(--color-accent)] hover:underline"
                    >
                      이 챕터 자세히 읽기 →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The shadow side */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5 prose-ko">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            그러나
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            마음 한구석이 허전한 이유
          </h2>

          <div className="space-y-6 text-[var(--color-ink-soft)] leading-relaxed text-lg">
            <p>
              여기서부터 책의 두 번째 시선이 열립니다. 도입에서 우리가 던졌던
              질문이 다시 돌아오는 자리이지요.
            </p>

            <blockquote className="border-l-4 border-[var(--color-accent)] pl-5 py-2 my-4 text-[var(--color-ink)] italic">
              효율적인 선택이 곧 행복한 선택일까요?
            </blockquote>

            <p>
              37% 규칙을 따라 결혼한다면 우리는 더 행복할까요? Gittins 인덱스로
              친구를 사귄다면 우정은 더 깊어질까요? 책은 답하지 않습니다.
              다만 한 가지 사실을 가만히 지적합니다 —{" "}
              <span className="marker font-bold">
                알고리즘은 "어떤 지표를 최적화할지"는 알려주지 않는다
              </span>
              는 것. (
              <Link
                href="/chapters/scheduling"
                className="text-[var(--color-accent)] underline-offset-4 hover:underline"
              >
                5장 스케줄링
              </Link>
              이 정확히 이 이야기입니다.)
            </p>

            <p>
              마감을 최적화할까, 완료 개수를 최적화할까, 합계 시간을
              최적화할까. 이 선택은 수학이 아니라 <strong>삶의 방향</strong>의
              문제입니다. 알고리즘은 우리가 그 방향을 정한 다음에야 일을
              시작할 수 있습니다.
            </p>

            <blockquote className="border-l-4 border-[var(--color-mint)] pl-5 py-2 my-4 text-[var(--color-ink)] italic">
              우리가 '숫자'와 '확률'로 설명되는 존재가 되어갈 때, 마음
              한구석이 허전한 이유는 무엇일까요?
            </blockquote>

            <p>
              추천 알고리즘은 우리의 클릭, 체류 시간, 다시 본 횟수, 검색어로
              우리를 그립니다. 이 그림은 정확합니다. 그러나 정확한 만큼 —
              그것은{" "}
              <strong>우리가 측정될 수 있도록 행동한 흔적</strong>일 뿐입니다.
              측정되지 않은 자리, 더듬거리며 실수했던 자리, 일부러 비효율적이었던
              자리, 누구에게도 보여주지 않았던 자리는 거기에 없습니다.
            </p>

            <p className="text-xl md:text-2xl font-display text-center text-[var(--color-ink)] my-8 leading-snug">
              알고리즘이 보는 우리는<br />
              늘 우리보다 조금 작습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Mission link */}
      <section
        id="mission-link"
        className="bg-[var(--color-accent-soft)] border-y-2 border-[var(--color-accent)]/30 py-16"
      >
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">
            체험 미션과의 연결
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            나를 점수로 설명하기
          </h2>
          <div className="space-y-5 text-[var(--color-ink-soft)] leading-relaxed text-lg">
            <p>
              이번 모임의 체험 미션은 그래서 작은 실험입니다. 나의 이력과
              취향을 카테고리별로 점수화해{" "}
              <span className="marker font-bold">'알고리즘적 인간 프로필'</span>
              을 한 장 만들어 보세요.
            </p>
            <p>
              만들어 보면 두 가지를 동시에 느끼게 됩니다.
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3 items-start">
                <span className="num-badge text-[var(--color-accent)] font-bold shrink-0 pt-1">
                  ✓
                </span>
                <span>
                  <strong>"이 정도면 나의 70%는 잡히는 것 같다"</strong>는
                  안도와
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="num-badge text-[var(--color-accent)] font-bold shrink-0 pt-1">
                  ✗
                </span>
                <span>
                  <strong>
                    "그런데 나머지 30%는 점수로 적기 정말 어렵다"
                  </strong>
                  는 불편.
                </span>
              </li>
            </ul>
            <p>
              그 30%가 어디인지를 들여다보는 것이 이 미션의 핵심입니다. 그
              자리가, 알고리즘이 결코 가져갈 수 없는{" "}
              <span className="marker-mint font-bold">
                우리의 주도권이 머무는 자리
              </span>
              이기 때문입니다.
            </p>
          </div>
          <Link
            href="/meeting#mission"
            className="inline-block mt-8 text-sm font-display px-5 py-2.5 rounded-full bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition"
          >
            미션 가이드 4단계 보기 →
          </Link>
        </div>
      </section>

      {/* Discussion seeds */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            함께 나눌 질문들
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">
            5월의 모임에서
          </h2>
          <p className="text-[var(--color-ink-soft)] mb-8 leading-relaxed">
            정답이 정해져 있지 않은 질문들입니다. 한 가지만 골라 깊이
            생각해 와도 좋습니다.
          </p>
          <ul className="space-y-3">
            {[
              "당신이 가장 자주 알고리즘에 의존하는 결정은 무엇인가요? 그 의존이 합리적인지, 아니면 단지 편해서 그런지 구분할 수 있나요?",
              "효율적이지 않지만 행복했던 선택을 떠올려 보세요. 그 결정에는 어떤 '인간적인 것'이 있었나요?",
              "이 책에서 가장 위로가 되었던 챕터는 무엇이었나요? 위로받았다는 것은 그 챕터가 어떤 자책을 풀어주었기 때문일 텐데, 그 자책의 정체는 무엇이었나요?",
              "알고리즘이 추천해 준 것을 따랐을 때 후회한 경험이 있나요? 그 후회의 본질은 '잘못된 추천'이었나요, 아니면 '내 결정권의 양도'였나요?",
              "당신을 점수로 설명할 수 있다면 가장 핵심적인 변수는 무엇일까요? 그 변수가 진짜 당신의 본질을 잡고 있나요?",
            ].map((q, i) => (
              <li
                key={i}
                className="rounded-2xl border-2 border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-accent)]/40 transition"
              >
                <div className="flex gap-4">
                  <span className="num-badge text-2xl font-bold text-[var(--color-accent)] shrink-0">
                    Q{i + 1}
                  </span>
                  <p className="text-[var(--color-ink)] leading-relaxed">{q}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[var(--color-bg-soft)] border-t border-[var(--color-line)] py-16">
        <div className="max-w-3xl mx-auto px-5 prose-ko">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            닫으며
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            알고리즘 뒤에 사람이 있다
          </h2>
          <div className="space-y-5 text-[var(--color-ink-soft)] leading-relaxed text-lg">
            <p>
              이 책의 마지막 장은{" "}
              <Link
                href="/chapters/computational-kindness"
                className="text-[var(--color-accent)] underline-offset-4 hover:underline"
              >
                <em>"계산적 친절(Computational Kindness)"</em>
              </Link>
              입니다. 좋은 알고리즘은 결과를 빨리 내는 알고리즘이 아니라,{" "}
              <span className="marker font-bold">
                상대방의 사고 노동을 줄여주는 알고리즘
              </span>
              이라는 것이지요. <em>"편한 시간 알려줘"</em>가 아니라{" "}
              <em>"화요일 1시 어때?"</em>라고 묻는 것.
            </p>
            <p>
              이 마지막 장은 책 전체를 다시 읽게 만듭니다. 우리가 알고리즘에서
              배워야 하는 것은 빠른 정답이 아니라,{" "}
              <strong>타인을 향한 사려 깊은 구조</strong>일 수도 있다는 것.
              알고리즘과 인간의 선택은 대립 관계가 아닐 수도 있습니다.{" "}
              <span className="marker-mint font-bold">
                좋은 알고리즘 뒤에는 늘, 그것을 만든 사람의 친절이 있습니다.
              </span>
            </p>
            <p>
              5월의 우리 모임이 그런 시간이었으면 좋겠습니다. 빠른 답을 찾는
              시간이 아니라, 우리 각자의 사려 깊은 질문을 함께 꺼내어 보는
              시간.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-line)] text-center">
            <p className="text-lg md:text-xl font-display leading-snug mb-3">
              "정답보다 질문을 좋아하는 분들과 함께하고 싶습니다."
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              — AI 시대의 인간 · 김경훈
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/meeting"
                className="px-5 py-2.5 rounded-full bg-white border-2 border-[var(--color-line)] font-display text-sm hover:border-[var(--color-accent)] transition"
              >
                ← 5월 모임 페이지
              </Link>
              <Link
                href="/#chapters"
                className="px-5 py-2.5 rounded-full bg-[var(--color-ink)] text-white font-display text-sm hover:opacity-90 transition"
              >
                📖 11개 챕터 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
