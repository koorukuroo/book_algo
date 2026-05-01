import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch10.json";
import subs from "../subtitles-ch10.json";

const SCENES = computeScenes("ch10", narration as Narration);
const COLOR = "sky" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 10 · Networking"
    titleKo="네트워킹"
    subtitle="함께 일하는 법"
    emoji="📡 ALOHA · TCP · AIMD"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch10.jpg"
    eyebrow="1971 · 하와이대 ALOHAnet"
    bodyLines={[
      "약속을 자꾸 어기는 친구에게 언제 다시 연락해야 할까요?",
      "노먼 에이브람슨은 같은 문제를 무선 네트워크에서 풀었습니다.",
    ]}
    punch="알로하넷의 탄생"
    color={COLOR}
  />
);

const Backoff = () => (
  <SlideConcept
    eyebrow="Exponential Backoff"
    title="실패할수록 두 배씩 기다려라"
    highlight="두 배씩"
    color={COLOR}
    visual={{
      kind: "table",
      columns: ["실패 횟수", "대기 시간"],
      rows: [
        { left: "1회", right: "1" },
        { left: "2회", right: "2" },
        { left: "3회", right: "4" },
        { left: "n회", right: "2ⁿ", highlight: true },
      ],
    }}
    footer="인터넷, 와이파이, 블루투스 — 유한한 인내, 무한한 자비"
  />
);

const Tcp = () => (
  <SlideConcept
    eyebrow="TCP · 1980s"
    title="잘 되면 천천히, 막히면 절반으로"
    highlight="절반으로"
    color={COLOR}
    visual={{
      kind: "comparison",
      left: { label: "Additive Increase", emoji: "📈", title: "+1, +1, +1", sub: "잘 되면 조금씩 더 빨리" },
      right: { label: "Multiplicative Decrease", emoji: "📉", title: "÷2", sub: "막히면 절반으로 확 줄여라" },
    }}
    footer="도로의 차 흐름, 전기 사용량, 회사의 매출 목표 — 모두 같은 패턴"
  />
);

const Buffer = () => (
  <SlideConcept
    eyebrow="Bufferbloat · Jim Gettys 2010s"
    title="너무 큰 버퍼는 독이다"
    highlight="독이다"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "🐢",
      caption: "데이터를 끝없이 쌓아두면 응답 시간이 폭발한다",
    }}
    footer="모든 일정을 받아들이면 어느 것도 제때 끝낼 수 없다 — 가끔은 버려야 흐름이 산다"
  />
);

const Outro = () => (
  <SlideOutro
    quote="네트워킹은 거리의 문제가 아니라 흐름의 문제."
    quoteHighlight="흐름의 문제"
    subtitle="가끔은 양보하고, 가끔은 버리세요."
    nextLabel="다음: 🎮 게임 이론 — 합리성의 한계"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  backoff: Backoff,
  tcp: Tcp,
  buffer: Buffer,
  outro: Outro,
};

export const Chapter10 = () => (
  <AbsoluteFill style={{ backgroundColor: theme.bg, fontFamily: fonts.body, color: theme.ink }}>
    {Object.entries(SCENES).map(([id, s]) => {
      const Comp = SCENE_COMPONENTS[id];
      if (!Comp) return null;
      return (
        <Sequence key={id} from={s.from} durationInFrames={s.duration}>
          <Comp />
          <Audio src={staticFile(s.audio)} />
        </Sequence>
      );
    })}
    <Img
      src={staticFile("images/coredot-logo.png")}
      style={{ position: "absolute", top: 40, right: 48, width: 140, height: "auto", opacity: 0.85 }}
    />
    <Subtitles cues={subs.cues} />
  </AbsoluteFill>
);
