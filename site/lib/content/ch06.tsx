import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { BayesPredictor } from "@/components/interactive/BayesPredictor";
import { Webtoon } from "@/components/Webtoon";

export function ch06() {
  return (
    <>
      <Section eyebrow="훅 — 베를린 장벽에 선 청년">
        <Lead>
          1969년, 프린스턴 천체물리학 박사 진학을 앞둔 J. Richard Gott III가
          유럽을 여행하다 베를린 장벽 앞에 섭니다. <em>"이게 얼마나 더 갈까?"</em>{" "}
          그가 도출한 답은 충격적으로 단순했습니다 —{" "}
          <span className="marker-sky font-bold">8년</span>. 장벽이 8년 됐으니까요.
        </Lead>
        <Lead>
          실제로 베를린 장벽은 1989년까지 <strong>20년 더</strong> 갔습니다. Gott의
          예측은 빗나갔지만, 그 추론은 〈Nature〉에 게재되어 통계학에 큰 파장을
          일으켰죠. 90세 노인이 180세까지 산다고? 6세 아이가 12세에 죽는다고?
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch06.jpg"
        caption="베를린 장벽 앞 청년의 코페르니쿠스 추론 — 단 하나의 관측으로도 예측은 가능하다."
      />

      <Section eyebrow="핵심 통찰" title="분포의 모양이 인생을 좌우한다">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          답은 <strong>분포의 종류</strong>에 있습니다. 같은 "지금까지 X" 정보로도,
          분포가 정규/멱법칙/얼랑이냐에 따라 예측 규칙이 다릅니다.
        </p>
        <div className="grid md:grid-cols-3 gap-4 my-6">
          <Stat value="평균 규칙" label="정규 분포" description="평균 근처에 답이 있다. 인간 수명, 영화 러닝타임." color="sky" />
          <Stat value="×1.4 ~ ×2" label="멱법칙" description="오래 갈수록 더 오래 간다. 영화 흥행, 도시 인구, 부, 시(詩)." color="plum" />
          <Stat value="고정" label="얼랑 분포" description="과거가 미래에 영향 없음. 도박, 방사성 붕괴." color="accent" />
        </div>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch06.jpg"
        caption="베이즈 정리 — 사전 분포(Prior) × 우도(Likelihood) = 사후 분포(Posterior)."
      />

      <Section eyebrow="직접 해보기" title="분포별 예측 시뮬레이터">
        <BayesPredictor />
      </Section>

      <Section eyebrow="핵심 인물">
        <StoryCard who="Reverend Thomas Bayes" when="1701~1761">
          <p>
            영국 장로교 목사. 베이즈 정리는 그가 죽은 뒤 친구 Richard Price가
            미발표 논문 더미에서 발견한 한 편입니다. 살아 있는 동안 한 번도
            발표하지 않은 정리가 통계학을 바꿨습니다.
          </p>
        </StoryCard>

        <StoryCard who="Pierre-Simon Laplace" when="1749 노르망디">
          <p>
            아버지가 사제가 되길 원했지만 종교를 완전히 버린 수학자. 1774년 베이즈를
            모른 채 독립적으로 같은 문제를 풀었습니다.{" "}
            <strong>Laplace의 후속 법칙: (w+1)/(n+2)</strong>. 한 번 시도해 한 번
            성공하면 다음 성공 확률은 2/3, 3번 시도해 3번 성공하면 4/5.
          </p>
        </StoryCard>

        <StoryCard who="세계대전 중 독일 탱크 추정" when="2차 대전">
          <p>
            연합군이 포획한 탱크의 일련번호로 독일 월간 생산량을 베이지안 추정했습니다.
            결과: <strong className="num-badge">매월 246대</strong>. 항공 정찰은{" "}
            <span className="num-badge">1,400대</span>로 추정. 종전 후 독일 기록을
            확인했더니 — <strong className="num-badge text-[var(--color-mint)]">245대</strong>.
            베이지안의 압승.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="긴 꼬리에 살아남기">
        <StoryCard who="Stephen Jay Gould" when="하버드 생물학자">
          <p>
            자기 형태의 암 환자가 진단 후 <strong>8개월 내 절반 사망</strong>한다는
            통계를 봅니다. 그러나 분포가 우측으로 길게 늘어진 멱법칙임을 알고 안도하죠.
            <em>"내가 그 긴 꼬리에 있지 못할 이유가 없다."</em> 실제로 진단 후{" "}
            <strong>20년 더</strong> 살았습니다.
          </p>
        </StoryCard>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch06.jpg"
        caption="마시멜로 테스트의 재해석 — 약속을 어긴 어른 앞에서 즉시 먹는 것이 합리적이다."
      />

      <Section eyebrow="마시멜로 테스트의 재해석">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          1970년대 Walter Mischel의 스탠퍼드 마시멜로 테스트. 기다린 아이들이 SAT
          성공 등에서 우월하다는 결과는 <strong>의지력</strong>의 우화로 알려졌습니다.
          그런데 로체스터 대학 후속 연구가 충격을 안깁니다.
        </p>
        <Callout variant="key" title="환경의 신뢰성에 대한 베이지안 학습">
          마시멜로 테스트 <em>전에</em> 어른이 약속을 어기는 그룹의 아이들은 마시멜로를
          더 일찍 먹었습니다. 의지박약이 아닙니다 — 멱법칙적 환경(어른이 언제 올지 모름)에서
          자란 아이는 곱셈 규칙으로 <strong>"더 기다리면 더 오래 기다려야 한다"</strong>고
          합리적으로 판단한 것입니다. 자기 통제는 부모의 일관성에 기반합니다.
        </Callout>
      </Section>

      <Section eyebrow="미디어 시대의 함정">
        <Quote source="Wittgenstein">
          같은 신문을 여러 부 사서 거기 적힌 게 사실인지 확인하려는 사람처럼.
        </Quote>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          1990년대 미국 살인율은 <strong className="num-badge text-[var(--color-mint)]">20% 감소</strong>했지만,
          뉴스의 총기 폭력 보도는 <strong className="num-badge text-[var(--color-accent)]">600% 증가</strong>했습니다.
          2000년 이후 미국 상업 비행 사고 사망자는 카네기홀의 절반이 안 되지만, 같은
          기간 자동차 사고 사망자는 와이오밍 인구 전체보다 많습니다.
        </p>
        <Callout variant="tip">
          <strong>좋은 베이지안이 되려면 사전 분포를 보호해야 합니다.</strong>{" "}
          역설적이지만 그건 뉴스를 끄는 것을 의미할 수 있습니다.
        </Callout>
      </Section>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>🚌 <strong>버스 정류장:</strong> 다른 사람이 7분 기다렸다면? 시간표 모르면 7분 더.</li>
          <li>💑 <strong>연애 한 달째:</strong> 한 달 더 갈 가능성. 결혼식에 데려가는 건 시기상조.</li>
          <li>🚧 <strong>"무사고 7일" 표지판:</strong> 짧은 일이 아니면 멀리하라.</li>
          <li>🎬 <strong>영화 흥행 예측:</strong> 첫날 매출 × 1.4.</li>
          <li>👶 <strong>양육:</strong> 약속을 일관되게 지켜 아이의 사전 분포를 형성하라.</li>
        </ul>
      </Section>
    </>
  );
}
