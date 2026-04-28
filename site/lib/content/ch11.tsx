import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { VickreyAuction } from "@/components/interactive/VickreyAuction";
import { Webtoon } from "@/components/Webtoon";

export function ch11() {
  return (
    <>
      <Section eyebrow="훅 — 거울의 방">
        <Lead>
          영화 〈프린세스 브라이드〉의 명장면. <em>"현명한 자라면 자기 잔에 독을
          넣을 거야, 왜냐하면 큰 바보만이 받은 잔을 마시니까. 그러나 그가 그렇게
          생각할 줄 안다면 나도 자기 잔에 독을 넣을 거고…"</em> 무한 재귀의 코미디.
        </Lead>
        <Lead>
          이 무한 재귀가 게임이론의 본질입니다 — <span className="marker-plum font-bold">
          내 행동이 너의 행동에 달렸고, 너의 행동이 내 행동에 달렸을 때.</span>{" "}
          그리고 컴퓨터 과학이 가르쳐주는 것은: <em>이 재귀를 직접 풀려고 하지 말고,
          게임 자체를 바꿔라.</em>
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch11.jpg"
        caption="끝없는 재귀의 늪에서 빠져나오는 길 — 전략이 아니라 게임을 바꿔라."
      />

      <Section eyebrow="핵심 개념" title="Nash 균형 — 그러나 찾을 수 있는가?">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          1951년 John Nash가 모든 2인 게임에 균형이 적어도 하나 존재함을 증명(1994년
          노벨 경제학상). 가위바위보의 균형은 1/3-1/3-1/3 무작위 선택. 그러나
          Christos Papadimitriou 등이 2005~2008년에 충격적인 결과를 증명했습니다 —
          <strong>균형을 찾는 것 자체가 계산적으로 난해(intractable)</strong>합니다.
        </p>
        <Quote source="Kamal Jain (eBay 전 연구이사)">
          당신의 노트북이 균형을 못 찾는다면, 시장도 못 찾는다.
        </Quote>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch11.jpg"
        caption="메커니즘 디자인 — 죄수의 딜레마에 외부 규칙(보복·보상)을 더해 균형을 협력으로 옮긴다."
      />

      <Section eyebrow="직접 해보기" title="비크리 경매 vs 일반 경매">
        <VickreyAuction />
      </Section>

      <Section eyebrow="가장 중요한 통찰" title="메커니즘 디자인 — 게임을 바꿔라">
        <Callout variant="key">
          <em>"역(逆) 게임이론"</em>이라 불립니다. 원하는 행동이 나오도록 규칙을
          설계합니다. 결과를 더 나쁘게 만드는 "보복"을 추가해 균형 자체를 옮깁니다.
        </Callout>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          죄수의 딜레마에서 "배신"이 지배 전략입니다. 그러나 Godfather가{" "}
          <strong>밀고자에게 사형을 내건다</strong>는 추가 규칙 하나가 게임 구조를
          바꿉니다. 이제 협력이 균형이 됩니다.
        </p>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch11.jpg"
        caption="무제한 휴가의 함정 — 모두가 눈치 보다가 결국 0일이 균형이 된다(바닥 경쟁)."
      />

      <Section eyebrow="공유지의 비극과 휴가의 바닥 경쟁">
        <StoryCard who="휴가 일수의 바닥 경쟁">
          <p className="mb-2">
            미국 평균 직장인은 부여받은 휴가의 절반만 쓰고,{" "}
            <strong className="num-badge text-[var(--color-accent)]">15%</strong>는 한
            번도 안 씁니다. Bay Area의 "무제한 휴가" 정책은 게임이론적으로 재앙입니다.
          </p>
          <p className="text-sm italic">
            Travis CI CEO Mathias Meyer: "사람들은 자신이 휴가를 가장 많이 쓰는 사람으로
            보일까봐 망설인다. 바닥으로의 경주다."
          </p>
        </StoryCard>

        <StoryCard who="Evernote CEO Phil Libin">
          <p>
            휴가 가는 직원에게 1,000달러 현금 지급 — 그러나 메커니즘 디자인 관점에서는
            무의미합니다. <strong>강제 최소 휴가일 의무화(채찍)</strong>가 더
            효과적입니다.
          </p>
        </StoryCard>

        <StoryCard who="2014년 추수감사절 영업">
          <p>
            Macy's, Target은 전년보다 2시간 빨리 개점, Kmart는 추수감사절 아침
            6시부터 <strong>42시간 연속 영업</strong>. 누구도 멈출 수 없는 균형 —
            바닥으로의 경주.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="정보 폭포의 위험">
        <StoryCard who="The Making of a Fly" when="2011년 4월, Amazon">
          <p>
            발달생물학 교과서가 무려{" "}
            <strong className="num-badge text-[var(--color-accent)]">$23,698,655.93</strong>
            (+ 배송비 3.99달러)에 책정. 두 판매자가 알고리즘으로 서로의 가격을
            0.99830배와 1.27059배로 자동 조정하면서 무한 폭주한 결과.
          </p>
        </StoryCard>

        <StoryCard who="2010년 5월 6일 Flash Crash">
          <p>
            분 단위로 S&P 500 종목들이 주당 10만 달러 폭등 또는 0.01달러 폭락.{" "}
            <strong className="num-badge text-[var(--color-accent)]">1조 달러</strong>{" "}
            가치가 순식간에 증발. CNBC의 Jim Cramer가 라이브로 "이건 실제 가격이 아닐
            거다, 그냥 P&G 사라!"고 외친 순간이, 사적 정보(분기 보고서)가 공적 정보
            (거래소 시세)에 맞선 순간이었습니다.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="감정 = 자연의 메커니즘 디자인">
        <StoryCard who="Robert Frank의 분노 이론">
          <p className="mb-2">
            부당하게 진공청소기가 고장 났다고 10분 동안 온라인 악평을 남기는 사람.
            편의점에서 노인 지갑을 훔치는 도둑을 몸으로 막는 여성. 둘 다{" "}
            <strong>"비자발적 이타심"</strong>입니다.
          </p>
          <p className="text-sm italic">
            진화가 외부 권위 없이 메커니즘 디자인을 한 결과가 감정입니다. "사랑은
            조직범죄와 같다 — 결혼이라는 죄수의 딜레마의 게임 구조를 모두에게 최선인
            균형으로 바꿔준다."
          </p>
        </StoryCard>
      </Section>

      <Quote source="Ice-T">
        플레이어가 아니라 게임을 미워하라.
      </Quote>

      <Quote source="챕터 결언">
        정직이 지배 전략인 게임을 찾아라. 그리고 그저 자기 자신이 돼라.
      </Quote>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>👥 <strong>그룹 의사결정:</strong> 상대 마음 읽지 말고 게임이 정직을 지배전략으로 만드는 구조를 찾아라.</li>
          <li>💕 <strong>장기 관계:</strong> 계약(법)이 아니라 사랑(비자발적 감정)이 균형을 옮긴다. "행복은 자물쇠다."</li>
          <li>🏢 <strong>회사 정책:</strong> 추첨이나 보너스보다 강제 최소 휴가가 효과적.</li>
          <li>📈 <strong>투자/소비:</strong> 공적 정보가 사적 정보를 능가해 보일 때 의심하라.</li>
        </ul>
      </Section>
    </>
  );
}
