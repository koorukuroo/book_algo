import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch08.json";
import subs from "../subtitles-ch08.json";

const SCENES = computeScenes("ch08", narration as Narration);
const COLOR = "plum" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 08 · Relaxation"
    titleKo="완화"
    subtitle="풀 수 없는 문제를 푸는 법"
    emoji="🎒 Continuous · Lagrangian"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch08.jpg"
    eyebrow="NP-hard 문제"
    bodyLines={[
      "10명의 친구를 세 도시에 나눠 배정할 조합은 5만 9천 가지.",
      "도시가 늘어나면 폭발합니다.",
    ]}
    punch="천재적인 지름길은 완벽함을 포기하는 것"
    color={COLOR}
  />
);

const Continuous = () => (
  <SlideConcept
    eyebrow="첫 번째 도구"
    title="연속 완화 — 0과 1 사이로 풀어라"
    highlight="0과 1 사이"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "이산", title: "간다 / 안 간다", sub: "정수 제약 — 풀이 폭발" },
        { tag: "완화", title: "0.0 ~ 1.0", sub: "연속 변수로 풀고 정수로 반올림" },
        { tag: "결과", title: "충분히 좋은 답", sub: "배낭·외판원 모두 풀이가 단순해진다" },
      ],
    }}
  />
);

const Lagrange = () => (
  <SlideConcept
    eyebrow="두 번째 도구"
    title="라그랑주 완화 — 룰을 가격으로"
    highlight="가격으로"
    color={COLOR}
    visual={{
      kind: "comparison",
      left: { label: "절대 룰", emoji: "🚫", title: "안 된다", sub: "협상 불가, 풀이 어려움" },
      right: { label: "가격", emoji: "💰", title: "더 든다", sub: "협상 가능, 갑자기 풀린다" },
    }}
    footer="무거우면 비싸진다, 늦으면 벌금이다 — 일상에도 똑같이 작동"
  />
);

const Tsp = () => (
  <SlideConcept
    eyebrow="외판원 문제 (TSP)"
    title="천재적 지름길은 점점 더 멀리 간다"
    color={COLOR}
    visual={{
      kind: "table",
      columns: ["연도", "풀린 도시 수"],
      rows: [
        { left: "1954 · RAND 손계산", right: "49" },
        { left: "1980", right: "318" },
        { left: "1998", right: "13,509" },
        { left: "현재", right: "85,900", highlight: true },
      ],
    }}
  />
);

const Outro = () => (
  <SlideOutro
    quote="완벽한 답을 찾을 수 없을 때, 충분히 좋은 답을 빠르게."
    quoteHighlight="충분히 좋은 답"
    subtitle="이것이 지혜입니다."
    nextLabel="다음: 🎲 무작위 — 우연이 만드는 답"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  continuous: Continuous,
  lagrange: Lagrange,
  tsp: Tsp,
  outro: Outro,
};

export const Chapter8 = () => (
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
