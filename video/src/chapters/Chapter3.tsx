import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { SlideTitle } from "../scenes/kit/SlideTitle";
import { SlideHook } from "../scenes/kit/SlideHook";
import { SlideConcept } from "../scenes/kit/SlideConcept";
import { SlideOutro } from "../scenes/kit/SlideOutro";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch03.json";
import subs from "../subtitles-ch03.json";

const SCENES = computeScenes("ch03", narration as Narration);
const COLOR = "sky" as const;

const Title = () => (
  <SlideTitle
    chapterLabel="Chapter 03 · Sorting"
    titleKo="정렬"
    subtitle="질서를 만드는 법"
    emoji="📚 Big-O · O(n log n)"
    color={COLOR}
  />
);

const Hook = () => (
  <SlideHook
    imageSrc="images/webtoons-v/ch03.jpg"
    eyebrow="MIT · 1970년대"
    bodyLines={[
      "대니 힐리스의 룸메이트는 양말 두 개를 무작위로 꺼내 짝이 안 맞으면 다시 던져 넣었습니다.",
      "10쌍이라면 무려 110번. 비효율의 극치.",
    ]}
    punch="정렬엔 깊은 통찰이 숨어 있습니다"
    color={COLOR}
  />
);

const BigO = () => (
  <SlideConcept
    eyebrow="규모는 아프다"
    title="Scale Hurts"
    color={COLOR}
    visual={{
      kind: "table",
      columns: ["알고리즘", "복잡도"],
      rows: [
        { left: "Bubble Sort", right: "O(n²)" },
        { left: "Insertion Sort", right: "O(n²)" },
        { left: "Mergesort · 1945", right: "O(n log n)", highlight: true },
        { left: "Bucket Sort", right: "O(n)" },
      ],
    }}
    footer="인구조사급 데이터: 3억 번 패스 → 29번 (Mergesort)"
  />
);

const Tournament = () => (
  <SlideConcept
    eyebrow="1883 · Lewis Carroll"
    title="은메달은 거짓말이다"
    highlight="거짓말"
    color={COLOR}
    visual={{
      kind: "bigNumber",
      number: "16",
      suffix: "/31",
      caption: "단판 토너먼트에서 진짜 2등이 2등 메달 받을 확률",
    }}
    footer="단판 토너먼트는 우승자만 안다 — 4등까지 정확할 확률은 12:1로 불리"
  />
);

const DontSort = () => (
  <SlideConcept
    eyebrow="컴퓨터 과학자의 충격적 결론"
    title="정렬할 가치가 없는 것은 정렬하지 마라"
    highlight="정렬하지 마라"
    color={COLOR}
    visual={{
      kind: "list",
      items: [
        { tag: "✗ 낭비", title: "검색 안 할 것을 정렬", sub: "완전한 시간 낭비" },
        { tag: "△ 비효율", title: "정렬 안 한 것을 검색", sub: "그저 비효율적일 뿐" },
        { tag: "✓ 지혜", title: "어수선함에 베팅", sub: "Err on the side of messiness" },
      ],
    }}
  />
);

const Outro = () => (
  <SlideOutro
    quote="우리를 원숭이와 닭과 구분 짓는 것은, 싸움이 아니라 경주라는 점이다."
    quoteHighlight="경주"
    subtitle="위계는 사실 정보의 위계입니다."
    nextLabel="다음: 🗄️ 캐싱 — 잊어버려도 괜찮아"
    color={COLOR}
  />
);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: Title,
  hook: Hook,
  bigO: BigO,
  tournament: Tournament,
  dontSort: DontSort,
  outro: Outro,
};

export const Chapter3 = () => (
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
