import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { MultiArmedBandit } from "@/components/interactive/MultiArmedBandit";
import { Webtoon } from "@/components/Webtoon";

export function ch02() {
  return (
    <>
      <Section eyebrow="훅 — 인생의 영원한 딜레마">
        <Lead>
          단골 김밥집 vs 새로 생긴 태국 식당. 오랜 친구 vs 새로 만난 지인.
          좋아하는 노래 vs 막 발매된 신곡. 이 모든 결정은 같은 구조입니다 —{" "}
          <span className="marker-mint font-bold">탐색(explore)할 것인가, 활용(exploit)할 것인가?</span>
        </Lead>
        <Lead>
          컴퓨터 과학자들은 이 문제를 <em>다중 슬롯머신 문제(Multi-Armed Bandit)</em>라
          부릅니다. 슬롯머신을 "one-armed bandit"(한 팔의 강도)이라 부르는 데서
          유래했죠. 2차 대전 중 연합군 분석가들은 이 문제가 너무 시간을 잡아먹어서
          "독일에 떨어뜨려 지적 사보타주를 일으키자"는 농담까지 했다고 합니다.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch02.jpg"
        caption="단골 김밥집 vs 새 태국식당 — 답은 '얼마나 더 머물 건지'에 달려 있다."
      />

      <Section eyebrow="핵심 통찰" title="Interval이 전략을 결정한다">
        <Callout variant="key" title="모든 것은 '남은 시간'에 달렸다">
          새로운 도시에 막 도착했다면 explore. 곧 떠날 거라면 exploit. 같은 결정도{" "}
          <strong>남은 시간(interval)</strong>이 짧으냐 기냐에 따라 답이 완전히 달라집니다.
        </Callout>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          이 통찰은 노화의 "비밀"도 풀어줍니다. 스탠퍼드의 Laura Carstensen은
          노인의 사회적 네트워크 축소를 무능력이 아닌 <strong>합리적 선택</strong>으로
          설명합니다. 청년은 책 저자나 새 친구를 선호하고, 노인은 가족과 30분 보내기를
          선호합니다. 그러나 청년에게 "곧 다른 도시로 이사한다"고 가정하면 가족을
          선호하고, 노인에게 "20년 더 살 수 있는 의학 발견이 있다"고 가정하면
          청년처럼 행동합니다. <em>나이가 아니라 interval이 결정합니다.</em>
        </p>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch02.jpg"
        caption="Win-Stay, Lose-Shift — 이긴 슬롯머신은 그대로, 진 머신은 옮긴다. 미지엔 보너스(Gittins 0.7029)."
      />

      <Section eyebrow="직접 해보기" title="식당 고르기 게임">
        <MultiArmedBandit />
      </Section>

      <Section eyebrow="알고리즘의 진화">
        <div className="space-y-4">
          <StoryCard who="Win-Stay, Lose-Shift" when="1952, Herbert Robbins">
            <p>
              가장 단순한 규칙 — 이기면 계속, 지면 다른 머신으로. 우연보다는 확실히
              낫습니다. "Stay on a winner" 원칙은 거의 모든 최적 전략의 일부입니다.
            </p>
          </StoryCard>

          <StoryCard who="Gittins Index" when="1970년대">
            <p className="mb-2">
              영국 Unilever가 John Gittins에게 약품 시험 최적화를 의뢰하면서 탄생했습니다.
              각 머신마다{" "}
              <em>"이 머신을 영원히 안 당기는 대신 받을 만한 보장된 보상"</em>(뇌물!)을
              계산해 가장 높은 인덱스를 가진 머신을 선택합니다.
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              놀라운 사실: <strong>0-0 기록</strong>(완전히 모르는 머신)의 인덱스가{" "}
              <span className="num-badge font-bold">0.7029</span>로, 7/10 성공한 머신(0.6300)보다도
              높습니다. 미지에는 가치가 있습니다.
            </p>
          </StoryCard>

          <StoryCard who="UCB · 불확실성 앞에서의 낙관주의">
            <p>
              "Upper Confidence Bound" — 신뢰구간의{" "}
              <strong>상한선이 가장 높은</strong> 옵션을 선택. "잘 모르겠지만 어쩌면
              최고일 수도?"라는 기대감이 새로움에 보너스를 줍니다.
            </p>
          </StoryCard>
        </div>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch02.jpg"
        caption="베조스의 후회 최소화 — 80세의 나로 시간여행해서 결정하라."
      />

      <Section eyebrow="A/B 테스트의 현장">
        <StoryCard who="Dan Siroker · 오바마 캠페인" when="2007년">
          <p className="mb-2">
            구글 PM이었던 Siroker는 휴직하고 오바마 캠프에 합류, 후원 페이지를
            A/B 테스트했습니다. 결과:
          </p>
          <ul className="text-sm space-y-1 my-2 ml-4 list-disc">
            <li>첫 방문자 → "DONATE AND GET A GIFT"가 최고</li>
            <li>뉴스레터 구독자 → "PLEASE DONATE" (죄책감 자극)</li>
            <li>기존 기부자 → "CONTRIBUTE" (이미 donate했으니까)</li>
            <li>흑백 가족사진이 모든 영상/사진을 압도</li>
          </ul>
          <p className="text-sm">
            결과: <strong className="num-badge text-[var(--color-mint)]">$5,700만</strong>{" "}
            추가 모금. Siroker는 후에 Optimizely를 공동 창업합니다.
          </p>
        </StoryCard>

        <StoryCard who="Jeff Bezos · 후회 최소화 프레임워크">
          <p>
            D. E. Shaw에서 안정적 직장을 그만두고 Amazon 창업을 결심한 이유:{" "}
            <em>"80세의 나로 시간 여행해서 후회를 최소화하라."</em> 시도하지 않은
            것은 평생 나를 괴롭깁니다.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="윤리적 시험" title="ECMO와 적응형 임상시험">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          1970년대 Robert Bartlett이 개발한 신생아 호흡부전 치료법 ECMO. 1982-84년
          미시간대 연구는 Marvin Zelen의 <em>"Play the winner"</em> 적응형 알고리즘을 사용했습니다 —
          성공한 치료의 공을 모자에 추가하는 방식.
        </p>
        <ul className="text-sm leading-relaxed space-y-1 mb-4">
          <li>한 명만 기존 치료받고 사망</li>
          <li>11명 연속 ECMO 받고 모두 생존</li>
          <li>8명 추가 ECMO도 모두 생존</li>
          <li>기존 치료 2명은 모두 사망</li>
        </ul>
        <Callout variant="warn">
          영국의 전통 RCT(무작위 통제 시험)에서는 ECMO 그룹이 24명 더 살았습니다.
          "기존 시험 방식이 비윤리적이었다"는 지적이 나오는 이유입니다.
        </Callout>
      </Section>

      <Section eyebrow="후회의 수학">
        <Stat
          value="O(log n)"
          label="후회 최소화 한계"
          description="Lai-Robbins(1985): 후회는 절대 줄지 않지만, 최적 전략은 후회의 증가율이 로그 함수로 가장 느립니다. 첫 10번의 실수 = 다음 90번 = 그 다음 900번."
          color="mint"
        />
      </Section>

      <Quote source="챕터 결언">
        탐색 그 자체에 가치가 있다. 불안한 세계에서 살려면 자신 안에도 어떤
        불안함이 필요하다.
      </Quote>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>🍽️ <strong>식당 선택:</strong> 새 도시 도착 직후엔 explore, 떠나기 전엔 exploit.</li>
          <li>👶 <strong>양육:</strong> 아이의 산만함과 호기심은 결함이 아니라 탐색 단계의 합리적 행동.</li>
          <li>🎬 <strong>영화/책:</strong> 청년기 다양하게, 노년기 의미 있는 소수에 집중.</li>
          <li>💼 <strong>창업:</strong> Bezos의 "80세 후회 최소화"를 자문해 보라.</li>
        </ul>
      </Section>
    </>
  );
}
