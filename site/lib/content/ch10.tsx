import { Section, Lead, Callout, Quote, Stat, StoryCard } from "@/components/Section";
import { ExponentialBackoff } from "@/components/interactive/ExponentialBackoff";
import { Webtoon } from "@/components/Webtoon";

export function ch10() {
  return (
    <>
      <Section eyebrow="훅 — 첫 메시지들">
        <Lead>
          1969년 10월 29일, UCLA의 Charley Kline은 Stanford의 Bill Duvall에게
          ARPANET을 통해 "login"이라는 메시지를 보내려 했습니다. 그러나 받은 메시지는{" "}
          <span className="marker font-bold">"lo"</span>까지였고, 그 다음 시스템이
          멈췄습니다 — 인터넷의 첫 메시지였죠.
        </Lead>
        <Lead>
          1992년 12월 3일 첫 SMS는 "Merry Christmas"였습니다. 1973년 4월 3일, 모토로라의
          Martin Cooper는 6번가에서 AT&T의 라이벌 Joel Engel에게 첫 휴대전화 통화를
          걸었습니다. <em>"기억하세요? 우리는 셀룰러로 통화하고 있어요."</em>
        </Lead>
      </Section>

      <Webtoon
        src="/images/webtoons/ch10.jpg"
        caption="약속을 자꾸 어기는 친구 — 1주, 2주, 4주… 유한한 인내, 무한한 자비."
      />

      <Section eyebrow="핵심 통찰" title="연결은 합의된 환상">
        <Callout variant="key">
          메시지는 100% 도달하지 않습니다. TCP는 <strong>3중 핸드셰이크</strong>로
          "이 정도면 됐다"고 판단합니다. 비잔틴 장군 문제처럼 100% 확인은 불가능합니다.
        </Callout>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          넷플릭스 스트리밍의 경우 2014년 하반기 피크타임 업스트림 트래픽의 약{" "}
          <strong className="num-badge">10%</strong>가 ACK 패킷이라는 사실은
          "일방향 전송"조차 사실은 양방향임을 보여줍니다. 우리가 "연결되어 있다"고
          느끼는 것은 끊임없는 ACK 교환의 결과입니다.
        </p>
      </Section>

      <Section eyebrow="알고리즘 1" title="Exponential Backoff">
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
          충돌 시 재시도 간격을 두 배씩 늘리는 알고리즘. 1차 실패 시 1~2턴 후 재시도,
          2차 실패 시 1~4턴, 3차 실패 시 1~8턴... <strong>"유한한 인내, 무한한
          자비"</strong>를 가능케 합니다. 절대 완전히 포기하지 않으면서도 무리하지
          않습니다.
        </p>
        <p className="text-sm text-[var(--color-muted)]">
          1971년 ALOHAnet에 처음 적용, 1980년대 TCP에 통합.
        </p>
      </Section>

      <Webtoon
        orientation="horizontal"
        src="/images/webtoons-h/ch10.jpg"
        caption="AIMD 톱니파 — 정상이면 +1씩 천천히 늘리고, 충돌하면 절반으로 줄인다."
      />

      <Section eyebrow="직접 해보기" title="지수적 백오프 시뮬레이션">
        <ExponentialBackoff />
      </Section>

      <Section eyebrow="알고리즘 2" title="AIMD — TCP 톱니파">
        <Callout variant="warn">
          <strong>+1 증가, ÷2 감소 (Additive Increase, Multiplicative Decrease).</strong>{" "}
          패킷 ACK가 정상 도착하면 +1씩 늘리고, 드롭되면 절반으로 줄인다. 이로 인해
          대역폭이 톱니파 형태를 띱니다.
        </Callout>
        <p className="text-sm text-[var(--color-muted)]">
          1986년 LBL-UC Berkeley 회선이 32,000 bps에서 갑자기 40 bps로{" "}
          <strong>1000배 폭락</strong>한 사건을 Van Jacobson과 Michael Karels가
          추적해 만들어낸 알고리즘입니다.
        </p>
      </Section>

      <Webtoon
        orientation="vertical"
        src="/images/webtoons-v/ch10.jpg"
        caption="크레페 줄의 비극 — 보이지 않는 두 번째 큐(버퍼블로트)가 모든 걸 망친다."
      />

      <Section eyebrow="실생활 사례" title="ALOHAnet의 후예">
        <StoryCard who="HOPE 프로그램" when="호놀룰루">
          <p className="mb-2">
            ALOHAnet의 발상지 호놀룰루에서 Steven Alm 판사가 시작한 보호관찰 실험.
            기존엔 위반을 12번이고 봐주다가 갑자기 수년형을 내리는 패턴이었습니다.
            HOPE는 <strong>첫 위반 즉시 단 1일 구금</strong>, 위반이 누적될수록
            처벌을 점진적으로 늘렸습니다.
          </p>
          <p className="text-sm">
            결과 (5년 추적): 새로운 범죄로 체포될 확률{" "}
            <strong className="num-badge text-[var(--color-mint)]">절반</strong>,
            약물 사용률{" "}
            <strong className="num-badge text-[var(--color-mint)]">72% 감소</strong>.
            17개 주가 도입했습니다. — 지수적 백오프의 사회적 적용.
          </p>
        </StoryCard>

        <StoryCard who="개미의 TCP" when="2012">
          <p>
            Stanford 생태학자 Deborah Gordon과 컴퓨터과학자 Balaji Prabhakar의 발견:
            개미 군집이 인간 이전 수백만 년 전부터 TCP 흐름 제어와 거의 동일한
            알고리즘으로 먹이 채집을 조율하고 있었습니다.
          </p>
        </StoryCard>

        <StoryCard who="Cinco de Mayo 크레페" when="저자 Tom의 일화">
          <p>
            저자 Tom의 딸이 초콜릿 바나나 크레페를 사기 위해 줄 서서 20분, 주문 후
            또 40분을 기다렸습니다. 보이지 않는 두 번째 큐가 진짜 문제였죠 —
            <strong>버퍼블로트(bufferbloat)</strong>의 일상 사례.
          </p>
        </StoryCard>
      </Section>

      <Quote source="Jim Gettys">
        엔지니어는 시간을 일급 시민으로 대해야 한다.
      </Quote>

      <Quote source="챕터 결언">
        문제는 우리가 항상 연결되어 있다는 게 아니다. 우리는 그렇지 않다. 문제는
        우리가 항상 버퍼링되어 있다는 것이다.
      </Quote>

      <Section eyebrow="Ilunga — 세계에서 가장 번역하기 어려운 단어">
        <p className="text-[var(--color-ink-soft)] leading-relaxed">
          BBC가 선정한 세계에서 가장 번역하기 어려운 단어 — 콩고 츠루바어의{" "}
          <strong>"Ilunga"</strong>: <em>"처음엔 용서하고, 두 번째도 참고, 세 번째는
          절대 안 되는 사람"</em>. 지수적 백오프가 가능케 하는 정확한 인간 감정입니다.
        </p>
      </Section>

      <Section eyebrow="실생활 적용">
        <ul className="space-y-3">
          <li>📵 <strong>약속 펑크 친구:</strong> 1주, 2주, 4주, 8주 간격으로 다시 제안. 빈도는 0에 수렴하지만 영원히 포기하지 않는다.</li>
          <li>📈 <strong>회사 승진:</strong> 피터의 법칙(모두가 자기 무능 단계까지 승진해 멈춘다) 대안 — AIMD식 "한 단계 승진 또는 강등".</li>
          <li>🚌 <strong>버스 도착 정보판:</strong> "10분 남음"이라고 한 번만 알려주면, 사용자는 한 번만 결정하고 시선을 뗀다.</li>
          <li>📧 <strong>이메일 부담:</strong> 의도적 테일 드롭 — 휴가 자동 답신을 "받지 않습니다"로 바꾸기.</li>
        </ul>
      </Section>
    </>
  );
}
