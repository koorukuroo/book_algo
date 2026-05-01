import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch09.json";
import subs from "../subtitles-ch09.json";

const SCENES = computeScenes("ch09", narration as Narration);
const COLOR = "mint" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 09 · Randomness"
    titleKo="무작위"
    subtitle="우연이 만드는 답"
    emoji="🎲 Monte Carlo · Annealing"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch09.jpg"
    eyebrow="1946 · Stanislaw Ulam"
    bodyLines={[
      "수학자 울람은 솔리테어를 두며 자문했습니다.",
      "이 게임이 풀릴 확률은 얼마일까. 모든 경우를 분석하기엔 너무 많았죠.",
    ]}
    punch="그냥 무작위로 1000번 해보면 어떨까?"
    color={COLOR}
  />
);

const MonteCarlo = () => (
  <SlideConcept
    eyebrow="몬테카를로 방법의 탄생"
    title="분석하지 말고 표본을 추출하라"
    highlight="표본을 추출"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "π",
      caption: "정사각형에 점을 뿌려 원에 들어간 비율 — 표본이 늘면 정확해진다",
    }}
    footer="핵분열 시뮬레이션, 영화 그래픽, 금융 예측 — 무작위가 가장 강력한 도구"
  />
);

const Primality = () => (
  <SlideConcept
    eyebrow="Miller-Rabin · 1976"
    title="무작위로 소수 판별 — RSA의 기반"
    highlight="무작위"
    color={COLOR}
    visual={{
      kind: "table",
      columns: ["반복 횟수", "확실성"],
      rows: [
        { left: "1번", right: "75%" },
        { left: "10번", right: "99.9999%" },
        { left: "50번", right: "1조분의 1 오류", highlight: true },
      ],
    }}
    footer="정확성보다 빠른 추정이 더 가치 있을 때가 있다"
  />
);

const Annealing = () => (
  <SlideConcept
    eyebrow="Kirkpatrick · 1983"
    title="시뮬레이티드 어닐링"
    highlight="어닐링"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "Hot", title: "처음엔 뜨겁게", sub: "무작위로 크게 흔들리며 탐색" },
        { tag: "Cool", title: "점점 식히며", sub: "좋은 답에 머무르게 한다" },
        { tag: "Trick", title: "더 나쁜 답도 수용", sub: "그래야 더 좋은 답에 도달한다" },
      ],
    }}
    footer="인생에서도 가끔은 멀리 돌아가는 것이 답입니다"
  />
);

const Outro = () => (
  <SlideOutro
    quote="정확함을 포기하면 빠름을 얻고, 빠름을 포기하면 무작위를 얻는다."
    quoteHighlight="무작위"
    nextLabel="다음: 📡 네트워킹 — 함께 일하는 법"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  montecarlo: MonteCarlo,
  primality: Primality,
  annealing: Annealing,
  outro: Outro,
};

export const Chapter9 = () => (
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
