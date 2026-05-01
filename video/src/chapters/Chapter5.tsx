import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch05.json";
import subs from "../subtitles-ch05.json";

const SCENES = computeScenes("ch05", narration as Narration);
const COLOR = "plum" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 05 · Scheduling"
    titleKo="스케줄링"
    subtitle="무엇을 먼저 할까"
    emoji="⏱️ EDD · SPT · WSPT"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch05.jpg"
    eyebrow="할 일 다섯 개"
    bodyLines={[
      "어떤 것부터 처리해야 할까요?",
      "답은 무엇을 최적화하느냐에 달려 있습니다.",
    ]}
    punch="지표가 다르면, 순서가 다르다"
    color={COLOR}
  />
);

const Edd = () => (
  <SlideConcept
    eyebrow="단순한 규칙들"
    title="먼저 무엇을 최적화할지 정하라"
    highlight="무엇을 최적화할지"
    color={COLOR}
    visual={{
      kind: "table",
      columns: ["알고리즘", "최적화 대상"],
      rows: [
        { left: "FCFS", right: "선착순" },
        { left: "EDD · 1955", right: "최대 지연 ↓", highlight: true },
        { left: "SPT · 1956", right: "완료 시간 합 ↓", highlight: true },
        { left: "WSPT", right: "가중 완료 합 ↓" },
      ],
    }}
    footer="공장·콜센터·운영체제·인생 — 이 단순한 규칙들이 지배합니다"
  />
);

const Priority = () => (
  <SlideConcept
    eyebrow="1997 · 화성 탐사선 Pathfinder"
    title="우선순위 인버전을 조심하라"
    highlight="우선순위 인버전"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "문제", title: "낮은 작업이 높은 작업을 막는 사태", sub: "Pathfinder가 화성에서 위기에 빠진 이유" },
        { tag: "해법", title: "우선순위 상속", sub: "막힌 작업의 자원 보유자에게 임시로 우선권" },
      ],
    }}
  />
);

const Thrashing = () => (
  <SlideConcept
    eyebrow="너무 자주 전환하면"
    title="쓰래싱 — 어느 것도 끝나지 않는다"
    highlight="쓰래싱"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "0",
      caption: "이메일 답장 → 회의 → 보고서 → 이메일… 완료된 일",
    }}
    footer="컴퓨터도 인터럽트를 가끔 무시합니다 — 우리도 응답하지 않을 권리가 필요합니다"
  />
);

const Outro = () => (
  <SlideOutro
    quote="완벽한 스케줄을 추구하기보다, 단순함을 택하라."
    quoteHighlight="단순함"
    subtitle="무엇을 최적화할지 먼저 정하고, 그에 맞춰 단순하게."
    nextLabel="다음: 🔮 베이즈 — 작은 정보로 큰 예측을"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  edd: Edd,
  priority: Priority,
  thrashing: Thrashing,
  outro: Outro,
};

export const Chapter5 = () => (
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
