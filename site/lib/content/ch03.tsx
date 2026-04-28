import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { SortingRace } from "@/components/interactive/SortingRace";
import { Webtoon } from "@/components/Webtoon";

export function ch03() {
  return (
    <>
      <Section eyebrow="훅 — 양말 사건">
        <Lead>
          MIT 학부생 시절 <strong>Danny Hillis</strong>의 룸메이트는 빨래 통에서
          양말을 두 개씩 무작위로 꺼내, 짝이 안 맞으면 다시 던져 넣는 방식을 썼습니다.
          10쌍이라면 첫 짝까지 평균 19번, 두 번째 짝까지 17번 더, 총{" "}
          <strong>110번</strong>. Hillis는 "기숙사 방 변경을 신청하고 싶었다"고
          회고합니다.
        </Lead>
        <Lead>
          심지어 튜링상 수상자 <strong>Ron Rivest</strong>도 인정합니다 —{" "}
          <em>"Socks confound me!"</em>(양말은 날 혼란스럽게 한다). 인터뷰 당시 그는
          샌들을 신고 있었다고요.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch03.jpg"
        caption="양말 짝 찾기에 절망한 룸메이트 — 빨래 빈도를 늘리는 게 더 빠르다."
      />

      <Section eyebrow="컴퓨터 과학의 첫 가르침" title="Scale Hurts (규모는 아프다)">
        <Callout variant="warn">
          일반 비즈니스의 "규모의 경제" 직관과 정반대로, 정렬에서는{" "}
          <strong>두 배가 네 배가 됩니다</strong>. 그래서 컴퓨터 과학자가 거꾸로 말합니다 —
          <em>"정렬할 가치가 없는 것을 정렬하지 마라."</em>
        </Callout>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          <Stat value="O(1)" label="상수" description="카디널 측정. 마라톤 순위." color="mint" />
          <Stat value="O(n)" label="선형" description="버킷 정렬. 토너먼트." color="sky" />
          <Stat value="O(n log n)" label="이론적 한계" description="Mergesort. 비교 정렬의 끝." color="plum" />
          <Stat value="O(n²)" label="이차" description="Bubble Sort. n=100일 때 100×100=10,000번." color="accent" />
        </div>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch03.jpg"
        caption="Mergesort의 분할정복 — 반으로 쪼개고, 정렬된 더미를 지퍼처럼 합친다. O(n log n)."
      />

      <Section eyebrow="직접 해보기" title="정렬 알고리즘 레이스">
        <SortingRace />
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch03.jpg"
        caption="Lewis Carroll(Dodgson)의 발견 — 진짜 2등이 2등 메달을 받을 확률은 16/31."
      />

      <Section eyebrow="대중 정치인의 등장">
        <StoryCard who="버락 오바마" when="2007 구글 방문">
          <p>
            Eric Schmidt가 농담으로 "백만 개 32비트 정수를 정렬하는 가장 좋은 방법은?"이라고
            묻자, 오바마는 즉답: <strong>"Bubble Sort는 잘못된 방법이겠지요."</strong>{" "}
            구글 직원들의 환호를 받았습니다.
          </p>
        </StoryCard>

        <StoryCard who="Charles Dodgson (Lewis Carroll)" when="1883">
          <p className="mb-2">
            《이상한 나라의 앨리스》의 작가는 옥스퍼드 수학 강사이기도 했습니다. 한 잔디
            테니스 선수가 "제가 아는 열등한 선수가 2등 메달을 받았다"고 한탄한 데서
            영감을 받아 토너먼트를 분석했죠.
          </p>
          <p className="text-sm">
            결론: Single Elimination(단일 패자전)에서{" "}
            <strong>진짜 2등이 2등 메달을 받을 확률은 16/31</strong>에 불과.
            "은메달은 거짓말이다."
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="실제 정렬 챔피언십">
        <StoryCard who="Preston Sort Center · King County Library" when="워싱턴주">
          <p>
            2011, 2013 National Library Sorting Champion. <strong>분당 167권</strong>,
            일 8.5만 권을 96개 빈에 분류합니다. NYPL과 매년 챔피언십을 다투는데,
            2014년 NYPL의 Salvatore Magaddino 답변: "Fuhgeddaboutit"(킹카운티 우리 못 이겨).
          </p>
        </StoryCard>

        <StoryCard who="Jordan Ho (UC Berkeley 화학 전공)">
          <p>
            150권의 책을 40분 미만에 정렬. 그의 전략: "3500대 책이 많다는 걸 알아.
            3500 미만을 먼저 분류하고, 3500-3599 분리, 더 세밀히 3510s, 3520s..."{" "}
            — 정확한 <strong>Bucket Sort 후 Insertion Sort</strong>.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="가장 깊은 통찰" title="Race vs Fight">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          마카크 원숭이 무리는 위계가 명확할 때 폭력이 줄어듭니다(Jessica Flack의 연구).
          닭 무리도 마찬가지인데, 부리를 자르는(debeaking) "친절한" 처치는 정렬 메커니즘을
          제거해 오히려 공격성을 키웁니다.
        </p>
        <Callout variant="key">
          인간 사회의 위대한 발명은 <strong>ordinal에서 cardinal로의 도약</strong>입니다.
          돈, 나이, GDP — 이 카디널 척도들 덕분에 매번 군사 충돌이나 협상으로 정렬할
          필요 없이, 이미 "정렬된" 상태로 사회가 돌아갑니다.
        </Callout>
        <Quote source="챕터 결언">
          매일의 쥐 경주를 한탄하지만, 그것이 싸움이 아니라 '경주'라는 점이야말로
          우리를 원숭이, 닭, 그리고 쥐와 구분 짓는 핵심이다.
        </Quote>
      </Section>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>📚 <strong>책장 정렬:</strong> 알파벳순 정렬은 거의 시간낭비. 검색이 더 빠르다.</li>
          <li>📧 <strong>이메일 폴더링:</strong> 대부분 시간낭비 — 그냥 검색하라.</li>
          <li>🧦 <strong>양말 정리:</strong> 빨래 빈도를 늘려라. 14일→13일이면 28번 적게 꺼낸다.</li>
          <li>🏆 <strong>스포츠:</strong> 진짜 1등을 가리기보다 시즌 내내 긴장을 유지하기 위해 일부러 비효율적 토너먼트를 사용한다.</li>
        </ul>
      </Section>
    </>
  );
}
