import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { SchedulingDemo } from "@/components/interactive/SchedulingDemo";
import { Webtoon } from "@/components/Webtoon";

export function ch05() {
  return (
    <>
      <Section eyebrow="훅 — 너무 바쁘다는 착각">
        <Lead>
          하루가 부족합니다. 할 일이 산더미인데, 시작도 못 했고, 밤에는 이메일
          답장만 하다 끝납니다. 그런데 만약 — <span className="marker-plum font-bold">
          "미루기"가 게으름이 아니라 잘못된 문제에 대한 최적해</span>라면요?
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch05.jpg"
        caption="할 일 5개 앞에서 — 마감? 짧은 것부터? 무엇을 최적화하느냐가 답을 바꾼다."
      />

      <Section eyebrow="첫 가르침" title="어떤 지표를 최적화할지부터 정하라">
        <Callout variant="key">
          같은 일도 어떤 기준(최대 지연 / 완료 개수 / 합계 시간)으로 최적화하느냐에 따라
          최적 알고리즘이 완전히 달라집니다. <em>"한 시계 = 시간을 아는 사람,
          두 시계 = 모르는 사람"</em>이라는 격언처럼.
        </Callout>
        <div className="grid sm:grid-cols-2 gap-3 my-6">
          <Stat value="EDD" label="Earliest Due Date" description="마감 빠른 것부터. 최대 지연을 최소화. 작업 시간은 무시." color="plum" />
          <Stat value="SPT" label="Shortest Processing Time" description="짧은 것부터. 완료 시간 합 최소화. 'GTD의 2분 규칙'과 일치." color="mint" />
          <Stat value="WSPT" label="가중 SPT" description="중요도/시간 비율이 높은 것부터. '2배 오래 걸리면 2배 중요해야 우선'." color="sky" />
          <Stat value="Moore" label="지각 개수 최소화" description="EDD로 가다가 못 맞추면 가장 큰 작업을 빼라." color="accent" />
        </div>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch05.jpg"
        caption="EDD vs SPT — 같은 5개 작업도 무엇을 최적화하느냐에 따라 답이 완전히 달라진다."
      />

      <Section eyebrow="직접 해보기" title="알고리즘 비교">
        <SchedulingDemo />
      </Section>

      <Section eyebrow="화성에서 발견된 우선순위 역전">
        <StoryCard who="Mars Pathfinder" when="1997 여름">
          <p className="mb-2">
            1.5억 달러짜리 화성 탐사선이 시속 16,000마일로 3억 9백만 마일을 날아 화성에
            착륙. 그런데 가장 우선순위 높은 "정보 버스" 작업을 무시하고 중간 순위 작업만
            처리하다 시스템 재시작 — <strong>거의 하루치 작업 손실</strong>.
          </p>
          <p className="text-sm">
            원인: <em>priority inversion</em>. 저순위 작업이 자원을 잡고 있는 동안 고순위
            작업이 막혀 있고, 중간 순위 작업이 대신 실행되는 현상. JPL 팀이 우선순위
            상속(priority inheritance) 패치를 수백만 마일 떨어진 탐사선에 전송했습니다.
          </p>
          <p className="text-sm text-[var(--color-muted)] mt-2 italic">
            아이러니: 소프트웨어 팀장 Glenn Reeves는 "마감 압박" 때문에 이 버그
            수정이 "낮은 우선순위로 분류"됐다고 인정. 문제의 원인이 문제 자체와 같았다.
          </p>
        </StoryCard>

        <StoryCard who="Mitch Hedberg의 카지노 일화">
          <p className="italic">
            "내가 카지노에서 가만히 있는데, 어떤 사람이 와서 '여기 비켜요, 비상구
            막고 있어요'라고 했다. 마치 불이 나도 내가 안 도망갈 거라는 듯이. 만약
            내가 가연성이고 다리가 있다면, 절대 비상구를 막고 있는 게 아니야."
          </p>
          <p className="mt-2 text-sm">
            평소엔 "loitering"이 저순위지만 불이 나면 즉각 고순위로 승격됩니다 —
            <strong>우선순위 상속</strong>의 일상 사례.
          </p>
        </StoryCard>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch05.jpg"
        caption="크누스의 일괄 처리 — 이메일은 6개월에 한 번, TeX 버그는 7년에 한 번."
      />

      <Section eyebrow="컨텍스트 스위치의 함정">
        <Callout variant="warn" title="저글링과 스래싱">
          공 한 개를 더 던지면 한 개만 떨어지는 게 아니라 <strong>전부</strong>{" "}
          떨어집니다. Peter Denning이 1960년대 발견한 <em>스래싱(thrashing)</em> —
          작업이 너무 많으면 시스템이 절벽에서 떨어지듯 무너집니다.
        </Callout>
        <StoryCard who="Donald Knuth · 일괄 처리 라이프스타일">
          <p>
            전설의 프로그래머 Knuth: <em>"나는 한 번에 하나만 한다."</em> 1990년부터
            이메일 주소 없음. <strong>2014년 1월 1일 시작</strong>해 지난 6년간
            보고된 모든 TeX 버그를 한 번에 수정하는 "TeX Tuneup"을 진행했습니다.
            보고서 끝맺음: <em>"Stay tuned for The TeX Tuneup of 2021!"</em> 우편물은
            3개월마다, 팩스는 6개월마다 검토.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="반전적 통찰" title="미래 무지의 축복">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          모든 작업의 시작 시점과 길이를 미리 알면 NP-hard. 그런데 모르면 단순한 탐욕
          알고리즘으로 최적을 달성할 수 있습니다.
        </p>
        <Quote source="컴퓨터 과학의 격언">
          미래가 흐릴 때 필요한 건 캘린더가 아니라 할 일 목록이다.
        </Quote>
      </Section>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>🥬 <strong>CSA 농산물:</strong> 가장 빨리 상하는 것부터(EDD). 다 못 먹을 거면 가장 큰 수박을 포기(Moore).</li>
          <li>💰 <strong>빚 갚기:</strong> 총 부담 줄이려면 이자율 높은 것부터(Avalanche). 개수 줄이려면 작은 것부터(Snowball).</li>
          <li>🍅 <strong>포모도로:</strong> 25분 단위로 한 작업 집중. 인터럽트 한꺼번에 처리.</li>
          <li>📨 <strong>이메일/청구서:</strong> 매일이 아니라 매주 1일에 몰아서.</li>
        </ul>
      </Section>
    </>
  );
}
