import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch11.json";
import subs from "../subtitles-ch11.json";

const SCENES = computeScenes("ch11", narration as Narration);
const COLOR = "accent" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 11 · Game Theory"
    titleKo="게임 이론"
    subtitle="합리성의 한계"
    emoji="🎮 Vickrey · Nash"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch11.jpg"
    eyebrow="합리성의 거울방"
    bodyLines={[
      "내가 합리적이려면 상대가 합리적이어야 하고, 상대가 합리적이려면 또 내가 합리적이어야 합니다.",
      "이 무한한 거울방 속에서 어떻게 결정해야 할까요?",
    ]}
    punch="게임 이론은 이 질문에서 태어났습니다"
    color={COLOR}
  />
);

const Vickrey = () => (
  <SlideConcept
    eyebrow="Vickrey · 1961"
    title="2위 가격 경매 — 정직이 지배전략"
    highlight="정직"
    color={COLOR}
    visual={{
      kind: "comparison",
      left: { label: "First-Price", emoji: "💸", title: "최고가 지불", sub: "거짓말이 이득 — 깎아서 입찰" },
      right: { label: "Vickrey", emoji: "🪙", title: "2위 가격 지불", sub: "진짜 가치 그대로 — 거짓말 무의미" },
    }}
    footer="작은 변화가 모든 것을 바꾼다 — 메커니즘 디자인의 시작"
  />
);

const Nash = () => (
  <SlideConcept
    eyebrow="Nash · 1950"
    title="합리성이 만드는 함정"
    highlight="함정"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "균형", title: "내쉬 균형의 존재", sub: "22살 박사논문 — 모두가 자기 최선만 고려한 상태" },
        { tag: "주의", title: "사회 최적 ≠ 균형", sub: "죄수의 딜레마가 그 증거" },
        { tag: "결과", title: "모두에게 손해", sub: "각자 합리적인데 모두 손해를 본다" },
      ],
    }}
  />
);

const Kindness = () => (
  <SlideConcept
    eyebrow="함정에서 빠져나오기"
    title="계산적 친절 — 정보를 줄여라"
    highlight="계산적 친절"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "✗", title: "어디 갈래?", sub: "상대의 인지 부담 폭발" },
        { tag: "✓", title: "A 또는 B", sub: "선택지 제시 — 모두가 빠르게 결정" },
        { tag: "결과", title: "모두 더 합리적", sub: "작은 결정이 큰 효율을 만든다" },
      ],
    }}
  />
);

const Outro = () => (
  <SlideOutro
    quote="좋은 메커니즘은 모두를 자연스럽게 정직하게 만듭니다."
    quoteHighlight="자연스럽게 정직하게"
    subtitle="최선을 강요하지 마세요."
    nextLabel="마지막: 🌱 결론 — 계산적 친절"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  vickrey: Vickrey,
  nash: Nash,
  kindness: Kindness,
  outro: Outro,
};

export const Chapter11 = () => (
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
