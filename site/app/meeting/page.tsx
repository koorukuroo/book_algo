import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5월 모임 — AI 시대의 인간",
  description:
    "알고리즘과 인간의 선택. Brian Christian과 Tom Griffiths의 『알고리즘, 인생을 계산하다』를 함께 읽고 나눕니다.",
};

export default function MeetingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-sun-soft)] via-[var(--color-bg)] to-[var(--color-mint-soft)] paper-grain" />
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-12 md:pt-20">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
                AI 시대의 인간 · 5월 모임
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-6">
                <span className="text-[var(--color-accent)]">알고리즘</span>과
                <br />
                <span className="text-[var(--color-mint)]">인간</span>의 선택
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink-soft)] mb-6">
                AI가 답을 내릴 때, 우리는{" "}
                <span className="marker font-bold">질문을 던집니다.</span>
                <br />
                효율이 지배하는 세상에서 잠시 멈춰 서서 '어디로 가고 있는지'를
                함께 짚어봅니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/meeting/script"
                  className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-display hover:opacity-90 transition shadow-md"
                >
                  ✍️ 발제문 읽기
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-full bg-white border-2 border-[var(--color-line)] font-display hover:border-[var(--color-accent)] transition"
                >
                  📖 챕터 둘러보기
                </Link>
                <a
                  href="#mission"
                  className="px-6 py-3 rounded-full bg-white border-2 border-[var(--color-line)] font-display hover:border-[var(--color-accent)] transition"
                >
                  체험 미션 →
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--color-ink)]">
              <Image
                src="/images/meeting/club.jpg"
                alt="북클럽 모임 분위기"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Club intro */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-line)] py-16">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            클럽 소개
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            AI가 답을 내릴 때, 우리는 질문을 던집니다
          </h2>
          <div className="space-y-5 text-[var(--color-ink-soft)] leading-relaxed">
            <p>
              AI가 대신 생각해주고 답을 내어주는 시대, 우리는 굳이 직접 생각해
              보려 합니다.
            </p>
            <p>
              안녕하세요, [AI 시대의 인간] 파트너{" "}
              <strong>김경훈</strong>입니다. 😄
            </p>
            <p>
              효율이 지배하는 세상에서 '더 빠르게' 가는 법을 가르쳐주는 곳은
              많습니다. 하지만 우리는{" "}
              <span className="marker-mint font-bold">한 달에 한 번</span>, 잠시
              멈춰 서서 '우리가 어디로 가고 있는지' 삶의 본질을 짚어보려 합니다.
            </p>
            <p>
              알고리즘이 0.1초 만에 내놓는 매끄러운 정답에 만족하시나요? 편리함이라는
              이름 아래 우리가 놓치고 있는 선택권은 무엇일까요? 이 클럽은 AI를
              '잘 쓰는 스킬'을 배우는 곳이 아니라, AI라는 거대한 파도 위에서
              휘둘리지 않고 나만의{" "}
              <span className="marker font-bold">'단단한 기준' 하나쯤</span>은
              챙겨가는 시간입니다.
            </p>
            <p>
              기술 앞에서 조금 더 차분해지고 싶은 분들, 정답보다 질문을 좋아하는
              분들과 함께하고 싶습니다.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-6">
            <p className="text-sm font-display flex items-center gap-2 mb-3">
              🧡 <strong>이런 분들을 기다립니다</strong>
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-ink)]">
              <li className="flex gap-3">
                <span>✦</span>
                <span>
                  기술 뉴스나 AI 이야기를 접할 때마다{" "}
                  <strong>흥미와 불안</strong>을 동시에 느끼는 분
                </span>
              </li>
              <li className="flex gap-3">
                <span>✦</span>
                <span>
                  정답을 배우기보다{" "}
                  <strong>나만의 생각 기준</strong>을 만들고 싶은 분
                </span>
              </li>
              <li className="flex gap-3">
                <span>✦</span>
                <span>
                  책, 대화, 그리고 직접적인 체험을 통해{" "}
                  <strong>인간의 자리</strong>를 고민하고 싶은 분
                </span>
              </li>
            </ul>
            <p className="text-xs text-[var(--color-muted)] mt-4 italic">
              기술적 지식이 없어도 괜찮습니다. 오히려 질문하기를 즐기는 분들을
              기다립니다.
            </p>
          </div>
        </div>
      </section>

      {/* May keyword */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            5월 모임 키워드
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            알고리즘과 인간의 선택
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white border-2 border-[var(--color-line)] p-6 md:p-8">
              <p className="text-3xl mb-3">🍱</p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                우리는 점심 메뉴를 고를 때도, 퇴근길 경로를 찾을 때도 알고리즘의
                도움을 받습니다. 이 책은 컴퓨터 과학의 복잡한 알고리즘이 사실은
                우리의 일상적인 고민과{" "}
                <span className="marker-mint font-bold">
                  얼마나 닮아 있는지
                </span>{" "}
                친절하게 들려줍니다.
              </p>
            </div>
            <div className="rounded-3xl bg-white border-2 border-[var(--color-line)] p-6 md:p-8">
              <p className="text-3xl mb-3">💭</p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                효율적인 선택이 곧 행복한 선택일까요? 우리가 '숫자'와 '확률'로
                설명되는 존재가 되어갈 때, 마음 한구석이 허전한 이유는 무엇일까요?
                편리함 뒤에 숨겨진 우리의{" "}
                <span className="marker font-bold">주도권</span>을 조심스럽게
                꺼내어 보려 합니다.
              </p>
            </div>
          </div>

          {/* Featured book */}
          <div className="mt-10 rounded-3xl bg-[var(--color-bg-soft)] border-2 border-[var(--color-line)] p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="text-5xl">📐</div>
              <div className="flex-1">
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-1">
                  이번 달 책
                </p>
                <h3 className="font-display text-2xl mb-1">
                  알고리즘, 인생을 계산하다
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-3">
                  Brian Christian · Tom Griffiths · 2016
                </p>
                <p className="text-sm text-[var(--color-ink-soft)] mb-4 leading-relaxed">
                  비서 문제부터 베이즈 추론, 게임이론까지 — 11개의 알고리즘을
                  통해 인간의 일상을 다시 본다.
                </p>
                <Link
                  href="/#chapters"
                  className="inline-flex items-center gap-2 text-sm font-display text-[var(--color-accent)] hover:underline"
                >
                  11개 챕터 읽으러 가기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience mission */}
      <section
        id="mission"
        className="bg-[var(--color-accent-soft)] border-y-2 border-[var(--color-accent)]/30 py-16"
      >
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">
            체험 미션
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-8">
            나를 점수로 설명하기
          </h2>
          <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[var(--color-ink)] shadow-[6px_6px_0_var(--color-ink)]">
              <Image
                src="/images/meeting/mission.jpg"
                alt="알고리즘 프로필 만들기"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg leading-relaxed text-[var(--color-ink-soft)] mb-4">
                나의 이력이나 취향을 넣어{" "}
                <span className="marker font-bold">
                  '알고리즘적 인간 프로필'
                </span>
                을 만들어 봅시다.
              </p>
              <p className="leading-relaxed text-[var(--color-ink-soft)] mb-6">
                나를 숫자와 확률로 설명할 수 있을까요? 그것이 어떤 부분을 잡아내고,
                어떤 부분을 놓치는지 직접 만들어보면서 느껴보세요. 모임 때 함께
                이야기 나눠보겠습니다.
              </p>

              <div className="rounded-2xl bg-white border-2 border-[var(--color-line)] p-5 space-y-3">
                <p className="font-display text-base mb-1">미션 가이드</p>
                <ol className="text-sm text-[var(--color-ink-soft)] space-y-2 list-none">
                  <li className="flex gap-3">
                    <span className="num-badge font-bold text-[var(--color-accent)]">
                      01
                    </span>
                    <span>
                      나를 설명하는 카테고리 5–10개를 정해 봅시다 (예: 직무·취미·가치관·라이프스타일·성격).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="num-badge font-bold text-[var(--color-accent)]">
                      02
                    </span>
                    <span>
                      각 항목에 점수(0–100)나 확률, 또는 '+/−' 같은 라벨을 붙여
                      봅니다.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="num-badge font-bold text-[var(--color-accent)]">
                      03
                    </span>
                    <span>
                      이 프로필이 '나'의 어떤 부분을 잡아내고, 어떤 부분을 빠뜨리는지
                      메모해 봅니다.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="num-badge font-bold text-[var(--color-accent)]">
                      04
                    </span>
                    <span>
                      마지막으로 — '내가 점수로 설명되기 가장 싫은 부분'은
                      무엇이었나요?
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discussion seeds — pull a few questions across chapters */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--color-muted)] mb-3">
            모임 전 함께 생각해볼 질문
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            우리가 던질 질문들
          </h2>
          <p className="text-[var(--color-ink-soft)] mb-6 leading-relaxed">
            정답이 정해져 있지 않은 질문들입니다. 한 가지만 골라 깊이 생각해 와도
            좋습니다.
          </p>
          <ul className="space-y-3">
            {[
              "AI가 0.1초 만에 내놓는 답에 우리는 무엇을 양도하고 있을까요?",
              "당신이 가장 자주 알고리즘에 의존하는 결정은 무엇인가요? 그 의존이 합리적인가요?",
              "효율적이지 않지만 행복한 선택을 한 적 있나요? 그 결정에는 어떤 '인간적인 것'이 있었나요?",
              "당신의 인생을 알고리즘으로 표현한다면 가장 중요한 변수는 무엇일까요? 그 변수가 정말 본질을 잡고 있나요?",
              "‘나를 숫자로 설명할 수 없는’ 영역이 있다면 어디인가요? 그 영역을 어떻게 지킬까요?",
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
      <section className="py-12 bg-[var(--color-bg-soft)] border-t border-[var(--color-line)]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-xl md:text-2xl font-display leading-snug mb-4">
            “정답보다 질문을 좋아하는 분들과 함께하고 싶습니다.”
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            — AI 시대의 인간 · 김경훈
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-[var(--color-ink)] text-white font-display hover:opacity-90 transition"
          >
            📖 책 콘텐츠 살펴보기
          </Link>
        </div>
      </section>
    </>
  );
}
