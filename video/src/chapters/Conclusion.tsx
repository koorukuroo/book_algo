import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/conclusion.json";
import subs from "../subtitles-conclusion.json";

const SCENES = computeScenes("conclusion", narration as Narration);
const COLOR = "mint" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Conclusion"
    titleKo="결론"
    subtitle="계산적 친절"
    emoji="🌱 Computational Kindness"
    color={COLOR}
  />
);

const Lesson = () => (
  <SlideConcept
    eyebrow="11개 챕터의 결론"
    title="최적을 추구하는 것 자체가 비용"
    highlight="비용"
    color={COLOR}
    visual={{
      kind: "comparison",
      left: { label: "함정", emoji: "🎯", title: "완벽한 답 추구", sub: "끝없는 분석과 망설임" },
      right: { label: "지혜", emoji: "✨", title: "충분히 좋은 답", sub: "빠르게 찾고 실행한다" },
    }}
  />
);

const Kindness = () => (
  <SlideConcept
    eyebrow="이 책의 가장 따뜻한 통찰"
    title="다른 사람의 인지 부담을 줄여라"
    highlight="인지 부담을 줄여라"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "✗", title: "메뉴 골라줘", sub: "상대에게 부담을 떠넘김" },
        { tag: "✓", title: "이거 추천해", sub: "결정의 무게를 가볍게" },
        { tag: "✓", title: "A 또는 B 어때?", sub: "두 개의 선택지로 빠른 결정" },
      ],
    }}
    footer="작은 배려가 큰 효율을 만든다"
  />
);

const Wisdom = () => (
  <SlideConcept
    eyebrow="알고리즘의 본질"
    title="결정의 무게를 함께 지는 것"
    highlight="함께 지는 것"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "🤝",
      caption: "37% 규칙이 답을 줘도 결단은 우리가 한다 — 알고리즘은 좋은 동반자",
    }}
  />
);

const Outro = () => (
  <SlideOutro
    quote="인생은 알고리즘이 아닙니다. 그러나 알고리즘은 인생을 더 잘 살게 합니다."
    quoteHighlight="더 잘 살게"
    subtitle="함께한 여정에 감사드립니다."
    nextLabel="이제 여러분의 이야기를 시작하세요 ✨"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  lesson: Lesson,
  kindness: Kindness,
  wisdom: Wisdom,
  outro: Outro,
};

export const Conclusion = () => (
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
