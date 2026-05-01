import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch07.json";
import subs from "../subtitles-ch07.json";

const SCENES = computeScenes("ch07", narration as Narration);
const COLOR = "accent" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 07 · Overfitting"
    titleKo="과적합"
    subtitle="너무 잘 맞히려는 함정"
    emoji="🎯 Regularization"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch07.jpg"
    eyebrow="8개의 학습 점"
    bodyLines={[
      "직선은 너무 단순하고, 7차 다항식은 모든 점을 완벽하게 통과합니다.",
      "어느 쪽이 더 나은 모델일까요?",
    ]}
    punch="놀랍게도 답은 단순한 직선 쪽입니다"
    color={COLOR}
  />
);

const Overfit = () => (
  <SlideConcept
    eyebrow="복잡한 모델의 함정"
    title="노이즈까지 외워버린다"
    highlight="노이즈까지"
    color={COLOR}
    visual={{
      kind: "comparison",
      left: { label: "학습 데이터", emoji: "✅", title: "완벽 통과", sub: "모든 점을 정확히 맞힘" },
      right: { label: "새 데이터", emoji: "❌", title: "완전 빗나감", sub: "사이에서는 제멋대로 출렁" },
    }}
    footer="데이터가 적을수록, 진짜 신호보다 노이즈를 외울 위험이 커진다"
  />
);

const Regularize = () => (
  <SlideConcept
    eyebrow="Tibshirani · 1996"
    title="복잡성에 페널티를 매겨라"
    highlight="페널티"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "통계", title: "Lasso 회귀", sub: "강제로 단순함을 추구하는 정규화" },
        { tag: "일상", title: "늦지 않게 결정", sub: "너무 많이 고민하지 마라" },
        { tag: "원리", title: "단순성 = 견고함", sub: "의사결정에서도 똑같이 작동" },
      ],
    }}
  />
);

const EarlyStop = () => (
  <SlideConcept
    eyebrow="또 다른 해법"
    title="일찍 멈추기 — Early Stopping"
    highlight="일찍 멈추기"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "군대", title: "훈련 기간 한정", sub: "더 가르치면 오히려 망가진다" },
        { tag: "회사", title: "시제품 출시 시기", sub: "완벽보다 빠른 출시" },
        { tag: "Gladwell", title: "첫인상의 정확성", sub: "짧은 관찰이 더 정확할 때가 있다" },
      ],
    }}
  />
);

const Outro = () => (
  <SlideOutro
    quote="단순함은 게으름이 아니라 견고함입니다."
    quoteHighlight="견고함"
    subtitle="너무 잘하려 하지 마세요."
    nextLabel="다음: 🎒 완화 — 풀 수 없는 문제를 푸는 법"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  overfit: Overfit,
  regularize: Regularize,
  earlystop: EarlyStop,
  outro: Outro,
};

export const Chapter7 = () => (
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
