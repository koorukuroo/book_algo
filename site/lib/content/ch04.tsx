import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { CacheLRU } from "@/components/interactive/CacheLRU";
import { Webtoon } from "@/components/Webtoon";

export function ch04() {
  return (
    <>
      <Section eyebrow="훅 — 책상 위의 종이 더미">
        <Lead>
          서랍을 정리하지 못해 죄책감이 드시나요? 책상 위에 종이 더미가 쌓여 있나요?
          좋은 소식이 있습니다 — <span className="marker font-bold">그 더미가
          이미 최적의 자료 구조</span>입니다. 위에서 찾고, 위에 다시 올리는 행위는
          컴퓨터 과학에서 <em>자기 조직화 리스트(Self-Organizing List)</em>라
          부릅니다.
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch04.jpg"
        caption="책상 종이 더미를 보며 죄책감 → 깨달음 — 사실 이미 LRU였다."
      />

      <Section eyebrow="핵심 알고리즘" title="LRU — Least Recently Used">
        <Callout variant="key">
          캐시가 가득 차면, <strong>가장 오랫동안 안 쓴 것</strong>을 버려라.
          1966년 IBM의 László Bélády가 Random Eviction과 FIFO를 비교해
          LRU의 우위를 증명했습니다.
        </Callout>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          이 단순한 규칙이 <strong>시간적 지역성(temporal locality)</strong>이라는
          깊은 통찰을 활용합니다 — 한 번 쓴 정보는 곧 다시 쓸 가능성이 높다.
          1985년 Sleator와 Tarjan이 증명했습니다 — LRU는 미래를 알고 있는 최적
          알고리즘 대비 <strong>2배 이내</strong>의 시간을 보장합니다. 다른
          알고리즘은 따라올 수 없는 보장입니다.
        </p>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch04.jpg"
        caption="LRU 캐시 — 가장 오래 안 쓴 항목이 추방되고, 방금 쓴 것이 맨 앞으로 들어간다."
      />

      <Section eyebrow="직접 해보기" title="LRU 옷장 시뮬레이터">
        <CacheLRU />
      </Section>

      <Section eyebrow="László Bélády의 인생">
        <StoryCard who="László Bélády · LRU의 발견자" when="1928~">
          <p>
            헝가리 출생. 1956년 헝가리 혁명 때{" "}
            <em>"갈아입을 속옷 한 벌과 졸업장만 든 가방"</em>을 들고 독일로 탈출.
            프랑스를 거쳐 1961년 미국 IBM에 도착했을 때 "어린 아들과 주머니 속
            1,000달러뿐"이었다고 합니다. <strong>무엇을 남기고 무엇을 버릴지에
            대한 감각</strong>이 인생에서 단련된 사람이 캐시 제거 알고리즘의 권위자가
            된 아이러니한 스토리입니다.
          </p>
        </StoryCard>
      </Section>

      <Section eyebrow="현실의 캐싱">
        <div className="space-y-4">
          <StoryCard who="Akamai · 보이지 않는 제국">
            <p>
              매사추세츠 회사 Akamai가{" "}
              <strong className="num-badge text-[var(--color-sun)]">전 세계 인터넷 트래픽의 1/4</strong>를
              처리합니다. 호주에서 BBC를 보면 시드니 서버에서 데이터를 받지,
              런던까지 가지 않습니다. <em>거리는 중요하다.</em>
            </p>
          </StoryCard>

          <StoryCard who="Amazon의 '예측 배송' 특허">
            <p>
              언론은 "주문하기 전에 물건이 도착한다"고 호들갑이었지만, 실제로는
              지역 인기 상품을 미리 그 지역 창고로 옮겨두는 캐싱 전략. 개인의
              구매는 예측 못 해도 수천 명의 패턴은 예측 가능합니다.
            </p>
          </StoryCard>

          <StoryCard who="진공청소기 봉투를 소파 뒤에 두는 의사">
            <p>
              William Jones의 책 <em>Keeping Found Things Found</em>에 등장. "아이들은
              내가 미쳤다고 하지만, 청소기는 거실 카펫에 주로 쓰니, 봉투도 거실 소파
              뒤에 두는 게 합리적"이라는 의사의 사례 — <strong>지리적 캐싱</strong>의
              완벽한 예.
            </p>
          </StoryCard>

          <StoryCard who="노구치 유키오 · 도쿄대" when="1990년대 초">
            <p>
              경제학자 노구치는 모든 파일을 박스 왼쪽에 넣고, 꺼낸 파일도 다시
              왼쪽에 넣는 시스템을 고안했습니다 — <strong>LRU의 물리적 구현</strong>.
            </p>
          </StoryCard>
        </div>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch04.jpg"
        caption="할머니의 망각은 결함이 아니다 — 도서관이 너무 커진 결과일 뿐."
      />

      <Section eyebrow="가장 위대한 재해석" title="노화와 망각">
        <Quote source="Michael Ramscar">
          현재 '쇠퇴'라고 불리는 것의 상당 부분은 단순히 학습이다.
        </Quote>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          노인의 "기억력 감퇴"는 사실 실패가 아닙니다. 스마트폰 연락처 수백 명,
          페이스북 친구 수천 명, 4개 도시 거주, 30,000개 어휘 — 나이 들수록{" "}
          <strong>기억의 도서관이 커지므로</strong> 검색이 자연스럽게 느려집니다.
          이 지연(latency)은 <em>"당신이 얼마나 많이 알고 있는지에 대한 증명서"</em>입니다.
        </p>
        <Callout variant="tip">
          카네기 멜론의 John Anderson이 NYT 헤드라인, 부모가 아이에게 하는 말,
          이메일을 분석한 결과 — 한 단어가 다시 등장할 확률이 시간이 지날수록
          떨어지는 패턴이 Ebbinghaus 망각 곡선과 정확히 일치했습니다.{" "}
          <strong>뇌의 망각 곡선이 세상의 사용 빈도 곡선과 일치합니다.</strong>{" "}
          망각은 결함이 아니라 적응입니다.
        </Callout>
      </Section>

      <Quote source="William James">
        지성을 실제로 쓰는 데 있어서, 잊는 것은 기억하는 것만큼 중요한 기능이다.
      </Quote>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>👕 <strong>옷장:</strong> "지난 1년간 안 입었으면 버려라"는 LRU. FIFO("얼마나 오래 갖고 있었나")보다 우월.</li>
          <li>📁 <strong>파일 브라우저:</strong> 알파벳순 대신 "최근 사용 순(Last Opened)"으로 정렬.</li>
          <li>🏃 <strong>위치 기반 보관:</strong> 운동복은 현관 벽장에, 진공청소기 봉투는 거실에.</li>
          <li>🧠 <strong>자신에게:</strong> "brain fart"가 아니라 "cache miss"라고 부르라.</li>
        </ul>
      </Section>
    </>
  );
}
