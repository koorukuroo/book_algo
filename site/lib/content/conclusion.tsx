import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { Webtoon } from "@/components/Webtoon";

export function conclusion() {
  return (
    <>
      <Section eyebrow="훅 — 인터뷰 일정 잡기 역설">
        <Lead>
          저자들이 책을 위해 인터뷰 시간을 잡을 때, 한 가지 사실을 발견했습니다 —
          <span className="marker-mint font-bold">"다음 화요일 1~2시 어떠세요?"</span>가
          <em>"편한 시간 알려주세요"</em>보다 응답률이 높았습니다.
        </Lead>
        <Lead>
          이상해 보이지만 컴퓨터 과학으로는 명백합니다. 후자는 <em>검색(search)</em>,
          전자는 <em>검증(verification)</em>. 둘 사이에는 거대한 복잡성 차이가 있습니다.
          노래를 듣고 알아보는 건 쉽지만, 즉석에서 작곡하는 건 훨씬 어렵습니다.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/conclusion.jpg"
        caption="“편할 때 알려줘”가 아니라 “화요일 1시 어때?” — 진짜 배려는 인지 부담을 줄여주는 것."
      />

      <Section eyebrow="새로운 미덕" title="Computational Kindness — 계산적 친절">
        <Callout variant="key">
          좋은 알고리즘의 암묵적 지령은 <strong>"사고의 노동을 최소화하라"</strong>입니다.
          타인이 풀어야 할 인지 문제의 비용을 줄여주는 것 — 이것이 진짜 배려입니다.
        </Callout>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          겸손하게 자기 선호를 숨기는 전통적 예의는 사실 인지 부담을 떠넘기는 행위입니다.
          진짜 친절은 명확하게 한두 옵션을 제시하는 것입니다.
        </p>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/conclusion.jpg"
        caption="검색(작곡) vs 검증(노래 알아맞히기) — 사이엔 거대한 복잡도 차이가 있다."
      />

      <Section eyebrow="세 가지 지혜">
        <div className="grid md:grid-cols-3 gap-4">
          <Stat
            value="①"
            label="알고리즘은 직접 이식 가능"
            description="컴퓨터 과학의 검증된 알고리즘은 인간 문제에 그대로 적용된다."
            color="accent"
          />
          <Stat
            value="②"
            label="과정 ≠ 결과"
            description="좋은 알고리즘을 따랐다면, 결과가 나빠도 자책하지 마라."
            color="mint"
          />
          <Stat
            value="③"
            label="다루기 쉬운 문제 선택"
            description="풀 수 있는 문제와 풀 수 없는 문제를 구분하라."
            color="sky"
          />
        </div>
      </Section>

      <Section eyebrow="흥미로운 사례">
        <StoryCard who="Brian의 스페인 여행">
          <p>
            친구 둘과 일정을 즉흥적으로 짜다가 투우 관람을 못 가게 됐을 때, 서로
            위로하다 보니 <strong>셋 다 처음부터 가고 싶지 않았다</strong>는 사실이
            드러났습니다. 각자 상대의 추정 열정 수준을 따라가다 만들어진 거짓 합의.
          </p>
        </StoryCard>

        <StoryCard who="Jeffrey Shallit의 18센트 동전 연구" when="2003, 워털루대">
          <p>
            미국 동전 체계에 어떤 새 동전을 추가하면 평균 동전 수가 가장 적어지는가?
            답은 <strong>18센트 동전</strong>. 그러나 그러면 거스름 계산이 외판원
            문제만큼 어려워집니다. 계산적 친절을 고려하면 차라리 2센트나 3센트 동전이
            낫습니다.
          </p>
        </StoryCard>

        <StoryCard who="펭귄 기부 실험">
          <p>
            사람들은 펭귄 8,000마리보다 한 마리를 살리는 데 평균적으로 더 많이
            기부합니다. 또 테러로 죽을 가능성을 (테러 포함 모든 사인보다) 더
            걱정합니다 — 제약이 명확한 문제를 인간 정신은 선호합니다.
          </p>
        </StoryCard>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/conclusion.jpg"
        caption="펭귄 8,000마리 vs 한 마리 — 인지 부담이 적을 때 사람들은 더 쉽게 행동한다."
      />

      <Section eyebrow="공공 디자인 = 윤리">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          한 줄로 늘어선 주차장 vs 격자형 주차장. 한 줄짜리(나선형 입체주차장처럼)는
          첫 빈자리에 그냥 대면 끝 — 계산 부담 0. 격자형은 매 순간 "지금 댈까, 더
          갈까"의 게임이론적 결정.
        </p>
        <Callout variant="tip">
          버스 도착 정보판은 <em>운임 보조금 못지않게</em> 승객을 늘립니다 —
          <strong>인지 보조금(cognitive subsidy)</strong>. 시간·돈뿐 아니라 인지
          자원도 자원이라 인식할 때, 도시·건축·UX는 친절해집니다.
        </Callout>
      </Section>

      <Quote source="Bertrand Russell">
        객관적으로 옳은 행위는 가장 운 좋을 가능성이 큰 행위다. 이를 가장 지혜로운
        행위라 부르겠다.
      </Quote>

      <Quote source="챕터 결언">
        운은 바라되, 지혜는 추구하라. 계산적 스토아주의(Computational Stoicism).
      </Quote>

      <Quote source="Merrill Flood (책의 에피그래프)">
        기계가 우리의 지적 부담을 덜어주면, 인류는 마침내 함께 잘 사는 법을 배울
        시간과 동기를 갖게 될 것이다.
      </Quote>

      <Section eyebrow="실생활 적용 — 새로운 예의">
        <ul className="space-y-3">
          <li>🍽️ <strong>저녁 식사:</strong> "난 아무거나 좋아"가 아니라 "난 X에 끌려, 너는?"</li>
          <li>📅 <strong>회의 일정:</strong> 두세 개 구체 시간을 제시하라.</li>
          <li>🏗️ <strong>공공 디자인:</strong> 사용자의 인지 자원을 자원으로 인식하라.</li>
          <li>🤝 <strong>자기 자신에게:</strong> 실패한 결과 때문에 자책하지 마라. 좋은 과정이 곧 합리성이다.</li>
        </ul>
      </Section>
    </>
  );
}
