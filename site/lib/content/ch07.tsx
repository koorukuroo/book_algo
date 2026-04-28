import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { OverfittingPlot } from "@/components/interactive/OverfittingPlot";
import { Webtoon } from "@/components/Webtoon";

export function ch07() {
  return (
    <>
      <Section eyebrow="훅 — 다윈의 결혼 노트">
        <Lead>
          1838년, 찰스 다윈은 사촌 Emma Wedgwood에게 청혼할지 고민하며 종이에 찬반을
          적었습니다. 찬성: 자녀, 동반자, "음악과 여성 수다의 매력". 반대: "끔찍한
          시간 손실", 친척 방문의 부담, 책 살 돈이 줄어듦. 결국 그는 결정합니다 —{" "}
          <span className="marker-mint font-bold">"Marry — Marry — Marry Q.E.D."</span>
        </Lead>
        <Lead>
          이 일화의 가장 중요한 디테일: 다윈은 일기장 <strong>한 페이지 안에서</strong>{" "}
          끝냈습니다. 페이지에 정규화한 셈이죠. 더 길어졌다면 그는 결정을 내리지
          못했을 것입니다.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch07.jpg"
        caption="다윈의 결혼 결정 — 종이가 길어질수록 답은 흐려진다. 한 페이지에서 끝내라."
      />

      <Section eyebrow="핵심 개념" title="Overfitting — 너무 잘 맞는 게 문제">
        <Callout variant="warn">
          모델 복잡도가 높아질수록 학습 데이터를 완벽히 맞추지만, 노이즈까지
          학습해 새로운 데이터의 예측은 오히려 나빠집니다.
        </Callout>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          독일의 결혼 만족도 연구가 좋은 예입니다. 9요인 모델은 모든 데이터 점을
          완벽히 통과하지만, "결혼 직전 비참함, 첫 몇 달 후 급격한 행복도 상승,
          10년 후 절벽 같은 추락" 같은 비현실적 예측을 내놓습니다. 2요인 모델이
          오히려 미래를 더 잘 예측했습니다.
        </p>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch07.jpg"
        caption="과적합 vs 단순 모델 — 학습 점은 완벽히 통과하지만 새 데이터엔 빗나가는 함정."
      />

      <Section eyebrow="직접 해보기" title="과적합 시각화">
        <OverfittingPlot />
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch07.jpg"
        caption="펜싱 'flick'의 함정 — 점수계 도입 후 진짜 검술을 잃은 선수들."
      />

      <Section eyebrow="현실의 과적합 사례">
        <StoryCard who="Harry Markowitz · 노벨상 경제학자">
          <p>
            현대 포트폴리오 이론(MPT)으로 1990년 노벨상을 받은 그가 정작 자기
            연금은 <strong>주식과 채권에 50:50</strong>으로 분배했습니다. 이유:{" "}
            <em>"주식이 폭락했을 때 모두 주식이었거나, 폭등했을 때 한 푼도 없었을
            때의 후회를 최소화하고 싶었다."</em>
          </p>
        </StoryCard>

        <StoryCard who="펜싱 종목의 변화" when="저자 Tom의 사례">
          <p>
            전자 점수계 도입 이후 선수들이 칼끝 버튼을 살짝 휘둘러 점수를 따는 'flick'
            기술에 과적합되어, 실제 결투에서는 쓸모없는 동작을 하게 됐습니다.
          </p>
        </StoryCard>

        <StoryCard who="법 집행관의 'Training Scars'">
          <p className="mb-2">
            사격 훈련에서 탄피를 주머니에 넣는 습관이 굳어 실제 총격전 중에도 탄피를
            줍다 사망한 경관들 사례. FBI는 "두 발 쏘고 자동으로 권총집에 넣는" 훈련
            패턴 때문에 표적 명중 여부와 무관하게 권총을 집어넣는 사례를 발견했습니다.
          </p>
          <p className="text-sm italic">
            한 경관은 가해자 손에서 총을 빼앗은 후, 훈련에서 그랬던 것처럼 자동으로
            다시 돌려주기도 했습니다.
          </p>
        </StoryCard>

        <StoryCard who="Tom의 첫 강의">
          <p>
            첫 학기에 강의 1시간당 <strong>10시간 이상</strong> 준비. 두 번째 학기엔
            시간이 부족해 걱정했지만 학생 평가는 <em>더 좋았습니다</em>. 본인 취향을
            학생 취향의 대리 지표(proxy)로 삼아 과적합한 것이 원인이었죠.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="해법" title="Lasso · Cross-Validation · Early Stopping">
        <div className="space-y-3">
          <div className="rounded-2xl bg-[var(--color-mint-soft)] p-4 border-2 border-[var(--color-mint)]/30">
            <p className="font-display mb-1">Lasso (1996, Tibshirani)</p>
            <p className="text-sm">
              모델의 복잡도(가중치 절댓값의 합)에 페널티를 추가. 영향이 작은 요인의
              가중치를 0으로 끌어내려 자동으로 단순화합니다.
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--color-sky-soft)] p-4 border-2 border-[var(--color-sky)]/30">
            <p className="font-display mb-1">Cross-Validation</p>
            <p className="text-sm">
              데이터의 일부를 일부러 빼두고('홀드아웃'), 나머지로만 학습한 뒤 빼둔
              데이터로 검증. "시험을 위한 공부"를 잡아냅니다.
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--color-sun-soft)] p-4 border-2 border-[var(--color-sun)]/30">
            <p className="font-display mb-1">Early Stopping</p>
            <p className="text-sm">
              모델이 너무 복잡해지기 전에 학습을 일찍 멈추기. 다윈이 한 페이지 안에서
              결정을 내린 것과 같은 원리.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="자연의 페널티">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          인간 두뇌는 하루 총 칼로리의 약 <strong className="num-badge">1/5(20%)</strong>를
          소비합니다. 이는 복잡도에 대한 진화적 페널티의 증거이기도 합니다. 신진대사·시간·기억·언어가
          모두 자연적 Lasso로 작동합니다.
        </p>
      </Section>

      <Quote source="Avinash Kaushik (Google)">
        친구가 페이지뷰로 측정하게 두지 마라. 절대로.
      </Quote>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>💍 <strong>큰 결정:</strong> 처음 떠오르는 2~3개 요인이 본질. 그 이후는 과적합 가능성.</li>
          <li>📈 <strong>자산 운용:</strong> 확신 낮을 때는 50:50 같은 단순 분배가 합리적.</li>
          <li>📊 <strong>회사 KPI:</strong> 측정 지표 자체가 목적이 되면 본질을 놓친다.</li>
          <li>🎨 <strong>기획·디자인:</strong> 초기 브레인스토밍은 굵은 샤피 마커로. 정밀한 펜이 너무 일찍 디테일을 잡는다.</li>
        </ul>
      </Section>
    </>
  );
}
