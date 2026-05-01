import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch04.json";
import subs from "../subtitles-ch04.json";

const SCENES = computeScenes("ch04", narration as Narration);
const COLOR = "sun" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 04 · Caching"
    titleKo="캐싱"
    subtitle="잊어버려도 괜찮아"
    emoji="🗄️ LRU · Belady"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch04.jpg"
    eyebrow="가까이 둘까, 멀리 둘까"
    bodyLines={[
      "옷장에는 자주 입는 옷만, 안 입는 옷은 지하 창고로.",
      "컴퓨터 메모리도 똑같습니다 — 가장 빠른 메모리는 작고, 큰 메모리는 느립니다.",
    ]}
    punch="무엇을 가까이 둘지가 캐싱의 전부"
    color={COLOR}
  />
);

const Lru = () => (
  <SlideConcept
    eyebrow="Belady · 1965"
    title="가장 오래 안 쓴 것을 버려라"
    highlight="LRU"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "이상", title: "Belady 최적", sub: "가장 늦게 쓸 것을 버리기 — 미래를 알아야 함" },
        { tag: "현실", title: "LRU", sub: "가장 오래 안 쓴 것을 버리기 — 거의 모든 캐시가 사용" },
        { tag: "결과", title: "옷장이 작을수록", sub: "LRU의 가치가 빛납니다" },
      ],
    }}
  />
);

const Memory = () => (
  <SlideConcept
    eyebrow="Anderson & Schooler 연구"
    title="망각은 결함이 아니라 통계적 추론"
    highlight="통계적 추론"
    color={COLOR}
    visual={{
      kind: "comparison",
      left: { label: "노화의 진실", emoji: "🧠", title: "저장은 더 잘", sub: "정보가 너무 많아 검색이 느려질 뿐" },
      right: { label: "최적성 증명", emoji: "📊", title: "통계적 최적", sub: "인간 기억은 이미 정답을 알고 있다" },
    }}
  />
);

const Filing = () => (
  <SlideConcept
    eyebrow="Yamazaki · 1986"
    title="어수선한 책상이 가장 효율적이다"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "📚",
      caption: "자주 쓰는 종이가 자연스럽게 위로 올라온다 · Self-organizing LRU",
    }}
    footer="가장 최근에 본 서류를 맨 앞으로 — 무질서해 보이지만 LRU의 완벽한 구현"
  />
);

const Outro = () => (
  <SlideOutro
    quote="좋은 캐시는 잊는 것을 잘하는 캐시입니다."
    quoteHighlight="잊는 것을 잘하는"
    subtitle="잊어버리는 것을 두려워하지 마세요."
    nextLabel="다음: ⏱️ 스케줄링 — 무엇을 먼저 할까"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  lru: Lru,
  memory: Memory,
  filing: Filing,
  outro: Outro,
};

export const Chapter4 = () => (
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
