import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch06.json";
import subs from "../subtitles-ch06.json";

const SCENES = computeScenes("ch06", narration as Narration);
const COLOR = "sky" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 06 · Bayes Rule"
    titleKo="베이즈 규칙"
    subtitle="작은 정보로 큰 예측을"
    emoji="🔮 Prior · Posterior"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch06.jpg"
    eyebrow="1969 · 베를린 장벽 앞"
    bodyLines={[
      "22살의 리처드 곳은 자문했습니다 — 이 장벽은 얼마나 더 갈까.",
      "정보는 단 하나, 지금까지 8년 됐다는 것.",
    ]}
    punch="이 작은 정보로 충분히 답할 수 있을까요?"
    color={COLOR}
  />
);

const Copernicus = () => (
  <SlideConcept
    eyebrow="코페르니쿠스 원리"
    title="지금까지 X 시간 → 앞으로 X만큼 더"
    highlight="X만큼 더"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "8",
      suffix: "년 → 8년+",
      caption: "정보가 전혀 없을 때의 무정보 prior · 베를린 장벽은 실제 28년까지 갔다",
    }}
  />
);

const Priors = () => (
  <SlideConcept
    eyebrow="Prior가 모든 것을 결정한다"
    title="분포에 따라 예측이 완전히 달라진다"
    highlight="완전히 달라진다"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "정규분포", title: "사람의 수명", sub: "평균에 가까울수록 곧 끝남" },
        { tag: "멱법칙", title: "영화 흥행", sub: "오래 갈수록 더 오래 간다" },
        { tag: "메모리리스", title: "도박/방사성", sub: "한 판만 더가 영원히 반복" },
      ],
    }}
    footer="좋은 예측은 좋은 prior에서 나옵니다"
  />
);

const Small = () => (
  <SlideConcept
    eyebrow="Laplace · 1812"
    title="작은 표본의 비밀"
    highlight="작은 표본"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "62",
      suffix: "/61",
      caption: "100번 중 60번 성공의 진짜 추정값 ≈ 60.78% (계승 법칙)",
    }}
    footer="한 번도 안 해본 일은 50대 50으로 시작 — 작은 정보로도 합리적 추론 가능"
  />
);

const Outro = () => (
  <SlideOutro
    quote="데이터가 말해주지 않는 것은 prior가 채웁니다."
    quoteHighlight="prior가 채웁니다"
    subtitle="좋은 가정은 좋은 답을 만듭니다."
    nextLabel="다음: 🎯 과적합 — 너무 잘 맞히려는 함정"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  copernicus: Copernicus,
  priors: Priors,
  small: Small,
  outro: Outro,
};

export const Chapter6 = () => (
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
