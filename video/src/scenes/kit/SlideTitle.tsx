import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

export type SlideTitleProps = {
  chapterLabel: string;     // "Chapter 03 · Sorting"
  titleKo: string;          // "정렬"
  accentWord?: string;      // optional accent word inside the title
  subtitle: string;         // "질서를 만드는 법"
  emoji: string;            // "📚"
  color: "accent" | "mint" | "sky" | "sun" | "plum";
};

const COLORS: Record<SlideTitleProps["color"], { fg: string; bg: string }> = {
  accent: { fg: theme.accent, bg: theme.accentSoft },
  mint: { fg: theme.mint, bg: theme.mintSoft },
  sky: { fg: theme.sky, bg: theme.skySoft },
  sun: { fg: theme.sun, bg: theme.sunSoft },
  plum: { fg: theme.plum, bg: theme.plumSoft },
};

export const SlideTitle = ({
  chapterLabel,
  titleKo,
  accentWord,
  subtitle,
  emoji,
  color,
}: SlideTitleProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fg, bg } = COLORS[color];

  const titleScale = spring({ frame, fps, from: 0.6, to: 1, config: { damping: 12 } });
  const subOp = interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [110, 150], [0, 1], { extrapolateRight: "clamp" });

  const renderTitle = () => {
    if (!accentWord || !titleKo.includes(accentWord)) {
      return <span>{titleKo}</span>;
    }
    const [before, after] = titleKo.split(accentWord);
    return (
      <>
        {before}
        <span style={{ color: fg }}>{accentWord}</span>
        {after}
      </>
    );
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${theme.bg}, ${bg} 70%)`,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 30,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 28,
          color: theme.muted,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        {chapterLabel}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 200,
          color: theme.ink,
          lineHeight: 1,
          transform: `scale(${titleScale})`,
        }}
      >
        {renderTitle()}
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 48,
          color: theme.inkSoft,
          opacity: subOp,
          marginTop: 20,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 36,
          color: fg,
          opacity: tagOp,
          marginTop: 30,
        }}
      >
        {emoji}
      </div>
    </AbsoluteFill>
  );
};
