import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { MonteCarloPi } from "@/components/interactive/MonteCarloPi";
import { Webtoon } from "@/components/Webtoon";

export function ch09() {
  return (
    <>
      <Section eyebrow="훅 — 솔리테어를 두는 수학자">
        <Lead>
          폴란드 출신 맨해튼 프로젝트 수학자 Stanislaw Ulam은 뇌염에 걸려 응급 뇌수술을
          받고 회복 중이었습니다. 너무 지루해서 솔리테어를 두다가 문득 자문합니다 —
          <em>"이긴 게임의 비율은 얼마나 될까?"</em>
        </Lead>
        <Lead>
          가능한 셔플은 <strong>80 unvigintillion</strong>(80자리 숫자). 모든 경우를
          분석할 순 없습니다. 그래서 그는 통찰을 얻습니다 —{" "}
          <span className="marker font-bold">"실제로 게임을 많이 해보고 성공 비율을
          보면 된다."</span>
        </Lead>
        <Lead>
          이것이 <em>몬테카를로 방법(Monte Carlo Method)</em>입니다. 동료 Nicholas
          Metropolis가 모나코의 카지노 이름을 따 명명했습니다.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch09.jpg"
        caption="병상에서 솔리테어를 두던 Ulam의 깨달음 — 표본 추출이 모든 경우를 대신한다."
      />

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch09.jpg"
        caption="시뮬레이티드 어닐링 — 처음엔 뜨겁게 무작위 탐색, 점점 식히며 좋은 답에 수렴."
      />

      <Section eyebrow="직접 해보기" title="몬테카를로 π 추정">
        <MonteCarloPi />
      </Section>

      <Section eyebrow="놀라운 알고리즘들">
        <StoryCard who="Miller-Rabin Primality Test">
          <p className="mb-2">
            큰 숫자가 소수인지 어떻게 빨리 확인할까요? Gary Miller가 발견한 식 —
            n이 소수면 어떤 x를 넣어도 참, 비소수면 일부 x가 거짓('witness'). Michael
            Rabin이 증명했습니다 — 비소수일 때 거짓을 안 주는 x는 전체의 1/4 이하.
          </p>
          <p className="text-sm">
            무작위 x를 10번 검사하면 오류 확률 ≤ 1/4¹⁰ = 1/100만. 현대 암호 시스템은{" "}
            <strong className="num-badge">40번</strong> 적용해 false positive율을{" "}
            <strong className="num-badge text-[var(--color-accent)]">10⁻²⁴</strong>로
            만듭니다. 신용카드 결제, HTTPS 모두 뒤에서 이게 돌고 있습니다.
          </p>
        </StoryCard>

        <StoryCard who="한밤중 전화" when="1975년 MIT">
          <p>
            안식년 중 Rabin은 Vaughan Pratt이 Hanukkah 파티 중 자정에 전화로
            <em>"2^400 − 593이 소수다"</em>라고 알려옵니다. <em>"내 머리카락이
            곤두섰다. 믿을 수 없었다."</em> 비결정론적 알고리즘이 결정론적
            알고리즘으로는 풀리지 않던 문제를 푼 순간이었습니다.
          </p>
        </StoryCard>

        <StoryCard who="Bloom Filter">
          <p>
            Burton H. Bloom의 확률적 자료구조. URL 같은 거대 집합의 멤버십 검사에서
            1~2% 오류를 허용하면 시간·공간을 극적으로 절약. Google 같은 검색엔진의
            URL 중복 검사, 악성 사이트 차단, 비트코인 등에 사용됩니다.
          </p>
        </StoryCard>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch09.jpg"
        caption="로브스터 통발 = 국소 최대 — 빠져나오려면 역설적으로 안쪽으로 더 들어가야 한다."
      />

      <Section eyebrow="국소 최대에서 탈출하기" title="Hill Climbing → Simulated Annealing">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          현재 답을 약간씩 변경해 더 나은 방향으로 가는 <strong>Hill Climbing</strong>은
          단순합니다. 하지만 'local maximum'(국소 최대)에 갇힐 위험이 있습니다 —
          로브스터 통발 같은 죽음의 함정.
        </p>
        <Callout variant="key" title="Simulated Annealing (시뮬레이티드 어닐링)">
          1980년대 초 IBM의 Scott Kirkpatrick이 발견. 처음에는 '뜨겁게'(완전 무작위
          시작) → 점점 '냉각'(채택 임계값을 점점 높임) → 마지막에 hill climbing으로
          수렴. 〈Science〉 논문 인용 횟수{" "}
          <strong className="num-badge">32,000회</strong>.
        </Callout>
      </Section>

      <Section eyebrow="진화의 무작위성">
        <StoryCard who="Salvador Luria · 슬롯머신" when="1943">
          <p>
            노벨상 수상자가 된 그가 인디애나 대학 컨트리클럽 댄스에서 동료의 슬롯머신을
            보다가 "잭팟!"을 보고, 박테리아 항바이러스 내성이 (1) 바이러스 노출에
            대한 반응이냐, (2) 무작위 돌연변이의 결과냐를 가릴 실험을 떠올렸습니다.
          </p>
          <p className="mt-2 text-sm">
            만약 (2)라면 가계도 위쪽에서 돌연변이가 일어났을 때 그 후손 전체가 내성을
            갖는 '<strong>잭팟</strong>' 패턴이 나와야 합니다. 결과 — Jackpot.
            진화의 무작위성과 발견의 무작위성이 동시에 작동한 사례입니다.
          </p>
        </StoryCard>

        <StoryCard who="Brian Eno & Peter Schmidt · Oblique Strategies">
          <p>
            창작 막힘을 푸는 무작위 카드 덱.{" "}
            <em>"스튜디오 한가운데 있을 때 가장 명백한 것을 잊는다. 카드는 프레임 밖으로
            던져준다."</em>
          </p>
        </StoryCard>

        <StoryCard who="The Dice Man" when="1971">
          <p>
            Luke Rhinehart(본명 George Cockcroft)의 컬트 소설. 모든 결정을 주사위로 한다.
            작가 본인도 한때 가족과 지중해 보트에서 'dicing' 생활을 하다가, 어닐링이
            식어 뉴욕 주의 한 호수에 정착했습니다. 80대가 된 그는 〈가디언〉에 말합니다:{" "}
            <em>"행복한 곳에 도착했으면 더 흔드는 건 어리석다."</em>
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="The Dice Man의 3가지 교훈">
        <div className="grid md:grid-cols-3 gap-3">
          <Stat value="1" label="Hill Climbing" description="좋은 아이디어는 항상 따르라." color="mint" />
          <Stat value="2" label="Metropolis" description="나쁜 아이디어를 따를 확률은 그 나쁨에 반비례." color="sky" />
          <Stat value="3" label="Simulated Annealing" description="인생 초반엔 무작위성을 front-load, 점점 줄여가라." color="accent" />
        </div>
      </Section>

      <Quote source="Richard Kenney">
        강이 굽이치는 까닭은 생각을 못 하기 때문이다.
      </Quote>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>🎨 <strong>창의성 막힘:</strong> Wikipedia 무작위 문서, of-the-month 클럽 — 일부러 외부 무작위성을 주입하라.</li>
          <li>🏛️ <strong>공공정책 평가:</strong> 평균도 일화도 부족하다. 무작위 표본 인터뷰가 가장 풍부한 정보를 준다.</li>
          <li>👥 <strong>인생 의사결정:</strong> 청년기엔 던져라(front-load), 만족스러운 곳에서는 흔들지 마라.</li>
          <li>🔥 <strong>자기 자신을 단조하라:</strong> Temper yourself — literally.</li>
        </ul>
      </Section>
    </>
  );
}
