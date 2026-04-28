import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { Knapsack } from "@/components/interactive/Knapsack";
import { Webtoon } from "@/components/Webtoon";

export function ch08() {
  return (
    <>
      <Section eyebrow="훅 — 결혼식 좌석 배치">
        <Lead>
          2010년, 프린스턴 화학공학 박사과정생 Meghan Bellows는 자기 결혼식 좌석
          배치에 골머리를 앓다가 갑자기 깨달았습니다 — 자기 박사 논문(단백질
          아미노산 배치)과 결혼식 좌석 문제가 1:1로 대응한다는 것을.
        </Lead>
        <Lead>
          <strong>107명, 11개 테이블</strong>. 가능한 경우의 수는 11<sup>107</sup> —{" "}
          <span className="num-badge">112자리 숫자</span>입니다. 관측 가능한 우주의
          원자 수(80자리)보다도 훨씬 큽니다. 프린스턴 컴퓨터 클러스터로 36시간을
          돌렸지만 <em>진짜 최적해는 못 찾았습니다</em>.
        </Lead>
        <Lead>
          그래도 컴퓨터는 사람이 떠올리지 못한 안을 제시했습니다 — "신부 부모를 가족
          테이블에서 빼서 오랜 친구들과 같이 앉히자". 신부 어머니가 살짝 손본 뒤
          채택됐죠. <span className="marker-plum font-bold">완벽 대신 충분히 좋은</span>
          답의 위력입니다.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch08.jpg"
        caption="결혼식 좌석 11×107 = 112자리 경우의 수 — 완벽 대신 충분히 좋은 답을 찾는다."
      />

      <Section eyebrow="핵심 통찰" title="Intractability — 어떤 문제는 그냥 어렵다">
        <Callout variant="warn">
          1960년대 Cobham–Edmonds Thesis: 다항식 시간(O(n²), O(n³)...)에 풀리면
          '효율적', 풀이가 불가능하면 'intractable'.
        </Callout>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          외판원 문제(TSP) — 모든 도시를 한 번씩 방문하는 최단 경로 — 도시가 늘면
          가능한 경로는 <strong>O(n!)</strong>. 도시 10개면 약 360만 경로. 100개면
          우주의 끝이 옵니다.
        </p>
      </Section>

      <Section eyebrow="해법 1" title="Constraint Relaxation (제약 완화)">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          외판원 문제에서 <em>"같은 도시를 두 번 방문해도 된다"</em>고 제약을 풀면
          'minimum spanning tree'가 됩니다. 진짜 최적해는 이보다 짧을 수 없으니
          <strong>하한선(lower bound)</strong>을 제공하죠. 이 방법으로 지구상 모든
          도시 TSP가 <strong className="num-badge text-[var(--color-mint)]">최적해의 0.05% 이내</strong>까지
          근사됐습니다.
        </p>
      </Section>

      <Section eyebrow="해법 2" title="Continuous Relaxation (연속 완화)">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          이산("예/아니오") 선택을 분수·확률로 바꿉니다. "편지를 1/4통, 또 다른
          사람에게 2/3통 보낸다" 같은 답을 얻은 뒤 반올림하거나 동전 던지기로
          정수화합니다. 이 방법은 <strong>최적해의 최대 2배 안</strong>에 들어옴이
          수학적으로 보장됩니다.
        </p>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch08.jpg"
        caption="Brian의 어머니 — '사실 너는 아무것도 해야 할 필요는 없어'. 라그랑지 완화의 인생 버전."
      />

      <Section eyebrow="해법 3" title="Lagrangian Relaxation — '아니면 어쩔 건데?'">
        <Callout variant="key">
          18세기 프랑스 수학자 Joseph-Louis Lagrange의 이름을 딴 기법.{" "}
          <strong>"불가능"을 단지 "비싼 페널티"로 강등</strong>시킵니다.
        </Callout>
        <StoryCard who="Brian의 어머니">
          <p>
            어린 Brian이 숙제와 잡일 불평을 늘어놓자 어머니는 말했습니다:{" "}
            <em>"사실 너는 아무것도 해야 할 필요는 없어. 선생님 말 안 들어도 되고,
            내 말도, 법도 안 지켜도 돼. 다만 그에 따른 결과를 받아들일지 결정하면 돼."</em>
            {" "}— 라그랑지 완화의 인생 버전.
          </p>
        </StoryCard>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch08.jpg"
        caption="제약 완화의 3가지 도구 — 제약·연속·라그랑지. '풀 수 없는' 문제를 '비싼' 문제로 바꿔라."
      />

      <Section eyebrow="직접 해보기" title="배낭 문제">
        <Knapsack />
      </Section>

      <Section eyebrow="역사 속의 외판원">
        <StoryCard who="Abraham Lincoln · Eighth Judicial Circuit">
          <p>
            16년간 봄가을마다 14개 카운티를 도는 순회 변호사 — 사실상 19세기판
            TSP였습니다.
          </p>
        </StoryCard>

        <StoryCard who="Michael Trick · MLB 스케줄러">
          <p>
            카네기 멜런의 그가 매년 메이저리그 야구와 NCAA 스케줄을 짭니다. 야구계
            사람들은 <em>"양키스와 메츠는 절대 같은 날 홈경기 안 한다"</em>고 믿지만,
            실제로는 시즌당 3~6번 같은 날 홈경기를 합니다. 라그랑지 완화로 일부 제약을
            페널티로 바꾸기 때문입니다.
          </p>
        </StoryCard>
      </Section>

      <Quote source="Voltaire">
        완벽은 좋은 것의 적이다.
      </Quote>

      <Quote source="Jan Karel Lenstra">
        문제가 어렵다는 것이 무시해도 된다는 뜻은 아니다. 다만 다른 신분의 적일 뿐.
        여전히 싸워야 한다.
      </Quote>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>💭 <strong>인생 계획:</strong> "두렵지 않다면 무엇을 할 것인가?", "복권에 당첨되면?", "모든 직업의 보수가 같다면?" — 이상화된 세계에서 시작점을 찾고 현실로 환원하라.</li>
          <li>📅 <strong>일정 관리:</strong> '도시 사이를 순간이동할 수 있다면 하루 1시간 미팅 8개가 한계'라는 식으로 상한선부터 잡아라.</li>
          <li>🎵 <strong>셋리스트/북투어:</strong> 통금이나 벌금을 감수할 수 있다면 그것이 합리적일 때가 있다.</li>
          <li>💉 <strong>공중보건:</strong> 분수 vaccine으로 푼 다음, 0.5 이상이면 실제 배치 또는 동전 던지기.</li>
        </ul>
      </Section>
    </>
  );
}
