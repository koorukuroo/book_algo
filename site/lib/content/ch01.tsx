import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { SecretaryProblem } from "@/components/interactive/SecretaryProblem";
import { Webtoon } from "@/components/Webtoon";

export function ch01() {
  return (
    <>
      <Section eyebrow="훅 — 일상의 딜레마">
        <Lead>
          샌프란시스코에서 아파트를 구한다고 상상해 보세요. 매물은 분 단위로 사라지고,
          공개 하우스는 사람으로 미어터집니다. 보면 즉시 결정해야 합니다 —{" "}
          <span className="marker font-bold">계약하든가, 영영 떠나든가</span>. 이런 상황에서
          몇 군데를 봐야 충분할까요? 너무 일찍 정하면 더 좋은 곳을 놓치고, 너무 오래
          보면 좋은 매물은 이미 다른 사람 손에 넘어갑니다.
        </Lead>
        <Lead>
          1960년 2월, <strong>마틴 가드너</strong>가 〈사이언티픽 아메리칸〉 칼럼에
          소개하면서 유명해진 이 문제는 컴퓨터 과학에서 <em>비서 문제(Secretary
          Problem)</em>라 부르며, 정확한 답이 존재합니다.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch01.jpg"
        caption="아파트 보러 다니는 한 청년 — 처음엔 관찰만, 37% 시점부터는 즉시 결단."
      />

      <Section eyebrow="핵심 알고리즘" title="37% 규칙 — Look-Then-Leap">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          답은 우아하게 두 단계로 나뉩니다:
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="rounded-2xl bg-[var(--color-accent-soft)] p-5 border-2 border-[var(--color-accent)]/30">
            <p className="font-display text-lg mb-2">1단계 · 관찰 (Look)</p>
            <p className="text-sm leading-relaxed">
              전체 후보의 처음 <strong>37%</strong>를 본다. 누구도 채용하지 않는다.
              그저 <em>기준점</em>만 머리에 새긴다.
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--color-mint-soft)] p-5 border-2 border-[var(--color-mint)]/30">
            <p className="font-display text-lg mb-2">2단계 · 도약 (Leap)</p>
            <p className="text-sm leading-relaxed">
              그 이후 본 사람 중 <strong>지금까지의 모든 후보보다 나은 첫 번째</strong>를
              만나는 즉시 결정한다.
            </p>
          </div>
        </div>
        <Callout variant="key" title="왜 하필 37%인가?">
          정확한 비율은 <strong>1/e ≈ 36.79%</strong>입니다(자연상수 e의 역수).
          신기한 대칭이 있습니다 — 이 전략으로 1등을 뽑을 확률 또한 약 37%.
          후보가 100명이든, 100만 명이든 성공률은 변하지 않습니다.
        </Callout>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch01.jpg"
        caption="Look-Then-Leap의 두 단계 — 처음 37%는 기준점만 잡고, 그 후 첫 번째 갱신에 즉시 결단."
      />

      <Section eyebrow="직접 해보기" title="시뮬레이터">
        <SecretaryProblem />
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch01.jpg"
        caption="케플러의 결혼 탐색(1611) — 11명을 보고 5번째에게 돌아간 천문학자."
      />

      <Section eyebrow="흥미로운 사례" title="실제로 이 방법을 쓴 사람들">
        <StoryCard who="요하네스 케플러" when="1611년">
          <p className="mb-2">
            천문학자 케플러는 첫 부인 사망 후 11명의 여성을 후보로 물색합니다.
            4번째 후보(키 크고 운동선수 같은 몸매)에게 끌렸지만 멈추지 않았고,
            5번째에서도 마음을 빼앗겼지만 또 멈추지 않았습니다. 11명까지 모두 본
            뒤 결국 <strong>5번째 여성에게 돌아가</strong> 결혼합니다. 그녀는 그를
            6명의 자녀와 함께 행복하게 만들었습니다.
          </p>
          <p className="text-sm text-[var(--color-muted)] italic">
            "다른 수많은 욕망들이 결코 충족될 수 없음을 깨닫는 것 외에, 내 불안한
            마음이 운명에 만족할 다른 방법은 없었던가?" — 케플러의 일기
          </p>
        </StoryCard>

        <StoryCard who="Michael Trick (카네기 멜런)" when="대학원 시절">
          <p>
            운영연구학 교수 Michael Trick은 18~40세를 탐색 기간으로 가정해 37%
            규칙으로 <strong>26.1세</strong>를 도출했습니다. 정확히 그 나이에
            만난 여성에게 청혼했지만 — <em>거절</em>당했습니다. 후일 독일의 한
            술집에서 만난 여성과 3주 만에 동거, 6년 후 결혼했죠. "수학이 모든 걸
            결정해 주지는 않습니다."
          </p>
        </StoryCard>

        <StoryCard who="비밀스러운 비서 문제의 기원">
          <p>
            저자들이 추적한 결과: <strong>Merrill Flood</strong>가 1958년 처음
            발견했고, "traveling salesman problem"이라는 명칭의 창시자이기도
            합니다. 그는 또 "software"라는 단어도 만든 것으로 추정되는 인물.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="변형들" title="조건이 바뀌면 답도 바뀐다">
        <div className="grid md:grid-cols-2 gap-4">
          <Stat
            value="58%"
            label="객관적 점수가 있을 때"
            description="후보를 백분위로 평가할 수 있다면 관찰 단계가 아예 필요 없어지고, 임계값 규칙으로 충분합니다. 성공률 58%로 도약."
            color="mint"
          />
          <Stat
            value="61%"
            label="회상이 가능할 때"
            description="이전 거절한 후보를 다시 부를 수 있다면 61% 시점까지 관찰. 이 경우 망설임은 도덕적 결함이 아니라 최적 전략입니다."
            color="sky"
          />
          <Stat
            value="25%"
            label="거절당할 가능성 50%일 때"
            description="상대도 거절할 수 있다면 25% 시점부터 빨리, 자주 청혼하라."
            color="plum"
          />
          <Stat
            value="(1-p)/p"
            label="도둑 문제"
            description="매번 잡힐 확률 p로 이익이 누적된다면, 최적 강도 횟수 = (1-p)/p. 90% 성공률이면 9번 후 은퇴, 50%면 1번만."
            color="accent"
          />
        </div>
      </Section>

      <Quote source="챕터 결언">
        망설임도 행동과 똑같이 되돌릴 수 없다. 우리는 진정 이 길을 단 한 번만
        지나간다.
      </Quote>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-2xl">🏠</span>
            <span>
              <strong>아파트:</strong> 한 달간 본다면 처음 11일은 정보 수집, 그
              이후 더 좋은 곳을 만나면 즉시 계약.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">💑</span>
            <span>
              <strong>연애:</strong> 18~40세를 탐색 기간으로 보면{" "}
              <strong>26.1세</strong>부터 결단 모드.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <span>
              <strong>집 매각:</strong> 임계값을 정하고 변동 없이 유지. 거절한
              오퍼가 다시 와도 절대 받지 마라.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🅿️</span>
            <span>
              <strong>주차:</strong> 점유율이 99%면 목적지에서 1/4마일 떨어진
              곳부터 빈자리를 잡아라.
            </span>
          </li>
        </ul>
      </Section>
    </>
  );
}
